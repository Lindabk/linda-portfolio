document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById('chat-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const closeBtn = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const input = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    const chatTooltip = document.getElementById('chat-tooltip');

    // --- TOOLTIP LOOP ENGINE ---
    let tooltipTimer = null;
    let hideTimer = null;
    let isUserEngaged = false; // Stops the loop if user clicks chat

    // Configuration (Milliseconds)
    const INITIAL_DELAY = 2500;   // Wait 2.5s on load
    const VISIBLE_TIME = 5000;    // Stay visible for 5s
    const COOLDOWN_TIME = 20000;  // Come back after 20s

    function triggerTooltipLoop(delay) {
        if (isUserEngaged) return; // Stop if user already clicked

        clearTimeout(tooltipTimer); // Safety clear

        tooltipTimer = setTimeout(() => {
            // Check again if chat is closed and user hasn't clicked
            if (!chatWindow.classList.contains('open') && !isUserEngaged && chatTooltip) {
                
                // A. Show Tooltip
                chatTooltip.classList.add('show');

                // B. Schedule Hide
                hideTimer = setTimeout(() => {
                    chatTooltip.classList.remove('show');
                    
                    // C. Schedule RE-APPEARANCE (Recursive Loop)
                    triggerTooltipLoop(COOLDOWN_TIME); 
                }, VISIBLE_TIME);
            }
        }, delay);
    }

    // Start the loop on load
    triggerTooltipLoop(INITIAL_DELAY);

    // 1. Toggle Window
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('open');
            // IF USER CLICKS:
            // 1. Hide tooltip immediately
            if (chatTooltip) chatTooltip.classList.remove('show');
            
            // 2. Stop the loop permanently (User has engaged)
            isUserEngaged = true;
            clearTimeout(tooltipTimer);
            clearTimeout(hideTimer);
            if (chatWindow.classList.contains('open')) {
                setTimeout(() => input.focus(), 300);
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => chatWindow.classList.remove('open'));
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // 2. Thinking Effect
    function showTyping() {
        if (typingIndicator) {
            typingIndicator.classList.remove('hidden');
            scrollToBottom();
        }
    }

    function hideTyping() {
        if (typingIndicator) typingIndicator.classList.add('hidden');
    }

    // 3. Smart Message Formatter (Regex Fix)
    function formatMessage(text) {
        let formatted = text;

        // 0. Normalize newlines (prevent huge gaps)
        formatted = formatted.replace(/\n\s*\n\s*\n/g, '\n\n');

        // A. Convert Bold (**text**) to <strong>text</strong>
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // B. Convert Markdown Links [Title](URL)
        formatted = formatted.replace(
            /\[([^\]]+)\]\(([^)]+)\)/g, 
            '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
        );

        // C. Convert Raw URLs (https://...) NOT already in tags
        // Negative lookbehind (?<!...) matches only if NOT preceded by quote, equals, or space
        // \b ensures we start at a word boundary
        formatted = formatted.replace(
            /(?<!["'= >])\b(https?:\/\/[^\s<]+)/g, 
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );

        // D. Convert Email Addresses NOT already in tags
        // Critical Fix: \b at start prevents matching substring "houdary" inside "Linda"
        // Critical Fix: > in lookbehind prevents matching text inside existing anchor tags
        formatted = formatted.replace(
            /(?<!["'= :>])\b([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
            '<a href="mailto:$1">$1</a>'
        );

        // E. Convert Bullet Points (handle *, -, and •)
        formatted = formatted.replace(/^\s*[\-\*•]\s+(.*)$/gm, '<div class="chat-list-item">• $1</div>');

        // F. Convert Newlines
        formatted = formatted.replace(/\n/g, '<br>');

        return formatted;
    }

    // 4. Standard Add Message (Instant) - For User
    function addUserMessage(text) {
        const div = document.createElement('div');
        div.classList.add('message', 'user');
        div.innerHTML = formatMessage(text);
        
        if (typingIndicator) {
            messagesContainer.insertBefore(div, typingIndicator);
        } else {
            messagesContainer.appendChild(div);
        }
        scrollToBottom();
    }

    // 5. Typewriter Effect (DOM Walker Version) - For Bot
    function typeBotMessage(text) {
        const div = document.createElement('div');
        div.classList.add('message', 'bot');
        
        if (typingIndicator) {
            messagesContainer.insertBefore(div, typingIndicator);
        } else {
            messagesContainer.appendChild(div);
        }

        // Parse HTML into a Shadow DOM / Temp div
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = formatMessage(text);
        
        // Recursive Typing Function
        function typeNode(node, targetElement) {
            return new Promise(resolve => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const textContent = node.textContent;
                    let charIndex = 0;
                    
                    function typeChar() {
                        if (charIndex < textContent.length) {
                            targetElement.append(textContent.charAt(charIndex));
                            charIndex++;
                            scrollToBottom();
                            setTimeout(typeChar, 10); // Typing Speed
                        } else {
                            resolve();
                        }
                    }
                    typeChar();
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    const element = node.cloneNode(false); // Clone tag without content
                    targetElement.appendChild(element);
                    
                    // Process children sequentially
                    Array.from(node.childNodes).reduce((promise, child) => {
                        return promise.then(() => typeNode(child, element));
                    }, Promise.resolve()).then(resolve);
                } else {
                    resolve();
                }
            });
        }

        // Start typing process
        Array.from(tempDiv.childNodes).reduce((promise, child) => {
            return promise.then(() => typeNode(child, div));
        }, Promise.resolve());
    }

    // 6. Rule-Based Chat Logic (Bilingual: EN + FR)
    function getActiveLanguage() {
        return localStorage.getItem('preferredLanguage') || 'en';
    }

    function getBotResponse(input) {
        const lowerInput = input.toLowerCase();
        const lang = getActiveLanguage();

        if (lang === 'fr') {
            return getBotResponseFR(lowerInput);
        }
        return getBotResponseEN(lowerInput);
    }

    function getBotResponseEN(lowerInput) {
        if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
            return "Hello! 👋 I'm Linda's virtual assistant. You can ask me about her **skills**, **projects**, **education**, or how to **contact** her.";
        }
        
        if (lowerInput.includes('skill') || lowerInput.includes('technolog') || lowerInput.includes('stack') || lowerInput.includes('know')) {
            return "Linda's core skills include:\n• **Languages:** Python, JavaScript, HTML5, CSS3, SQL\n• **AI/Data:** LangChain, OpenCV, Pandas, Hadoop\n• **Web:** React, Angular, Symfony, Laravel\n• **Networking:** Cisco Packet Tracer, Routing, VLANs\n\nCheck out the **Professional Skills** section for more details!";
        }
        
        if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('portfolio') || lowerInput.includes('built')) {
            return "Linda has built several amazing projects, including:\n• **Smart AI Travel Platform** (Computer Vision & AI)\n• **Enterprise Network Infrastructure** (Cisco & High Availability)\n• **Weather Website** (React)\n• **Subscription Management Platform** (Angular & Java)\n\nYou can see them all in the **Featured Projects** section!";
        }
        
        if (lowerInput.includes('education') || lowerInput.includes('study') || lowerInput.includes('university') || lowerInput.includes('degree')) {
            return "Linda is currently pursuing her **Engineering Studies in Software Engineering** at the Private Higher School of Engineering and Technology of Monastir (2026 - Present).\nShe also holds a Bachelor's Degree in Computer Science from the Higher Institute of Computer Science and Multimedia of Gabes (2022 - 2025).";
        }
        
        if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('hire') || lowerInput.includes('reach') || lowerInput.includes('whatsapp')) {
            return "You can reach Linda via:\n• **Email:** lindaboukhris01@gmail.com\n• **WhatsApp:** [Message Her](https://wa.me/21650891089)\n• **LinkedIn:** [Connect on LinkedIn](https://www.linkedin.com/in/linda-boukhris-b01a39277)\n\nOr use the contact form at the bottom of the page!";
        }
        
        if (lowerInput.includes('who are you') || lowerInput.includes('what are you') || lowerInput.includes('bot')) {
            return "I am Linda's rule-based virtual assistant! 🤖 I'm here to help you quickly find information about her portfolio.";
        }

        return "I'm not exactly sure what you mean. 😅 Try asking about Linda's **skills**, **projects**, **education**, or how to **contact** her. Or you can email her directly at lindaboukhris01@gmail.com!";
    }

    function getBotResponseFR(lowerInput) {
        if (lowerInput.includes('bonjour') || lowerInput.includes('salut') || lowerInput.includes('coucou') || lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return "Bonjour ! 👋 Je suis l'assistant virtuel de Linda. Vous pouvez me poser des questions sur ses **compétences**, ses **projets**, sa **formation** ou comment la **contacter**.";
        }

        if (lowerInput.includes('compétence') || lowerInput.includes('competence') || lowerInput.includes('skill') || lowerInput.includes('technolog') || lowerInput.includes('stack') || lowerInput.includes('outil')) {
            return "Les compétences principales de Linda incluent :\n• **Langages :** Python, JavaScript, HTML5, CSS3, SQL\n• **IA/Données :** LangChain, OpenCV, Pandas, Hadoop\n• **Web :** React, Angular, Symfony, Laravel\n• **Réseaux :** Cisco Packet Tracer, Routage, VLANs\n\nConsultez la section **Compétences** pour plus de détails !";
        }

        if (lowerInput.includes('projet') || lowerInput.includes('travail') || lowerInput.includes('portfolio') || lowerInput.includes('réalisation') || lowerInput.includes('realisation')) {
            return "Linda a réalisé plusieurs projets impressionnants, notamment :\n• **Plateforme de voyage IA intelligente** (Vision par ordinateur & IA)\n• **Infrastructure réseau d'entreprise** (Cisco & Haute disponibilité)\n• **Site météo** (React)\n• **Plateforme de gestion des abonnements** (Angular & Java)\n\nVous pouvez tous les voir dans la section **Projets phares** !";
        }

        if (lowerInput.includes('formation') || lowerInput.includes('étude') || lowerInput.includes('etude') || lowerInput.includes('université') || lowerInput.includes('universite') || lowerInput.includes('diplôme') || lowerInput.includes('diplome') || lowerInput.includes('education')) {
            return "Linda poursuit actuellement ses **études d'ingénieur en Génie Logiciel** à l'École Supérieure Privée d'Ingénierie et de Technologie de Monastir (2026 - Présent).\nElle est également titulaire d'une **Licence en Informatique** de l'Institut Supérieur d'Informatique et de Multimédia de Gabès (2022 - 2025).";
        }

        if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('mail') || lowerInput.includes('joindre') || lowerInput.includes('whatsapp') || lowerInput.includes('embauche')) {
            return "Vous pouvez contacter Linda via :\n• **Email :** lindaboukhris01@gmail.com\n• **WhatsApp :** [Lui écrire](https://wa.me/21650891089)\n• **LinkedIn :** [Se connecter](https://www.linkedin.com/in/linda-boukhris-b01a39277)\n\nOu utilisez le formulaire de contact en bas de la page !";
        }

        if (lowerInput.includes('qui es-tu') || lowerInput.includes('qui es tu') || lowerInput.includes('tu es quoi') || lowerInput.includes('bot') || lowerInput.includes('assistant')) {
            return "Je suis l'assistant virtuel de Linda ! 🤖 Je suis là pour vous aider à trouver rapidement des informations sur son portfolio.";
        }

        return "Je ne suis pas sûr de comprendre votre question. 😅 Essayez de me poser des questions sur les **compétences**, les **projets**, la **formation** de Linda ou comment la **contacter**. Vous pouvez aussi lui écrire directement à lindaboukhris01@gmail.com !";
    }

    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        addUserMessage(text);
        input.value = '';
        
        showTyping();

        // Simulate network delay (500ms to 1200ms)
        const delay = Math.floor(Math.random() * 700) + 500;
        
        setTimeout(() => {
            hideTyping();
            const response = getBotResponse(text);
            typeBotMessage(response);
        }, delay);
    }

    if (sendBtn && input) {
        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
});