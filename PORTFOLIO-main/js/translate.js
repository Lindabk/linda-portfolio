// Caching for original English elements
const englishCache = {};

// Translation dictionary
const translations = {
    fr: {
        // Main Navigation
        "nav_home": "Accueil",
        "nav_about": "À propos",
        "nav_services": "Services",
        "nav_skills": "Compétences",
        "nav_projects": "Projets",
        "nav_education": "Formation",
        "nav_contact": "Contact",
        "nav_cta": "Discutons",

        // Hero
        "hero_badge": "Expertise",
        "hero_text": "Concevoir des expériences numériques intelligentes et modernes grâce aux technologies web, à l'IA et au développement créatif.",
        "btn_view_work": "Voir mes projets",
        "btn_view_cv": "Voir mon CV",

        // About Bento Grid
        "about_tagline": "Développeuse par métier, curieuse par nature",
        "about_bio": "Je suis étudiante de première année en Génie Logiciel et titulaire d'une Licence en Informatique. Je suis passionnée par le développement web, l'IA, les applications mobiles, l'UI/UX et la création de solutions de qualité. Je suis curieuse, créative et j'apprends rapidement, toujours à l'affût des technologies modernes.",
        "about_toolstack": "Outils maîtrisés",
        "about_skillstack": "Compétences clés",
        "about_skill_fs": "Développement Full Stack",
        "about_skill_ai": "Intégration de l'IA",
        "about_skill_ui": "Conception UI/UX",

        // Services
        "services_label": "Domaines d'expertise",
        "services_title": "Mes Services",
        "services_desc": "Création d'applications robustes, évolutives et esthétiques dans divers domaines.",
        "services_web_title": "Développement Web Full Stack",
        "services_web_desc": "Création d'applications web réactives et modernes, des interfaces front-end aux architectures back-end robustes.",
        "services_mobile_title": "Développement Mobile",
        "services_mobile_desc": "Développement d'applications Android natives avec Kotlin pour offrir des expériences utilisateur mobiles fluides.",
        "services_db_title": "Gestion de bases de données",
        "services_db_desc": "Conception et optimisation de bases de données relationnelles et NoSQL comme PostgreSQL, MariaDB et Firebase.",
        "services_ai_title": "IA & Automatisation",
        "services_ai_desc": "Intégration de modèles d'intelligence artificielle et création de pipelines de traitement automatique des données.",
        "services_ui_title": "Conception UI/UX",
        "services_ui_desc": "Création d'interfaces utilisateur et d'expériences belles et intuitives selon des principes de design modernes.",
        "services_ar_title": "Développement RA/3D",
        "services_ar_desc": "Création d'expériences de réalité augmentée immersives et d'environnements 3D avec Unity et Blender.",

        // Skills & Stats
        "skills_title": "Compétences & Statistiques",
        "skills_desc": "Un aperçu des technologies avec lesquelles je travaille et de mes indicateurs professionnels.",
        "skills_stat_projects": "Projets académiques",
        "skills_stat_tech": "Technologies maîtrisées",

        // Featured Projects
        "projects_title": "Projets phares",
        "projects_desc": "Une sélection de projets académiques et personnels couvrant le développement web, l'IA, les réseaux, le mobile, la science des données et la réalité augmentée.",
        "projects_cat_all": "Tous les projets",
        "projects_cat_web": "🌐 Développement Web",
        "projects_cat_ai": "🤖 IA & Données",
        "projects_cat_mobile": "📱 Mobile",
        "projects_cat_net": "🌍 Réseaux",
        "projects_cat_ar": "🕶️ RA / 3D",

        // Project details in index.html
        "project_react_django_title": "Site Web Full Stack React + Django",
        "project_react_django_desc": "Une application web full-stack complète associant un frontend React réactif à un backend REST Django sécurisé – prenant en charge l'authentification des utilisateurs, les données dynamiques et les opérations CRUD.",
        "project_gym_title": "Site Web de Gym Moderne",
        "project_gym_desc": "Un site web de gym moderne et entièrement réactif développé avec PHP, présentant des services de fitness, des abonnements, des programmes d'entraînement et une interface interactive optimisée pour tous les appareils.",
        "project_car_rent_title": "API de plateforme de location de voitures",
        "project_car_rent_desc": "Une API RESTful de niveau production pour un service de location de voitures, couvrant la gestion des stocks de véhicules, les flux de réservation, le suivi des disponibilités et l'authentification sécurisée des utilisateurs.",
        "project_weather_title": "Site météo",
        "project_weather_desc": "Une application React moderne qui intègre une API REST météo en direct pour fournir la température, l'humidité et les prévisions en temps réel via une interface propre et intuitive.",
        "project_sub_title": "Plateforme de gestion des abonnements",
        "project_sub_desc": "Une plateforme complète pour gérer les abonnements des utilisateurs, les cycles de facturation et le contrôle d'accès basé sur les rôles – alimentée par un backend Java et un frontend Angular réactif.",
        "project_travel_title": "Plateforme de voyage IA intelligente",
        "project_travel_desc": "Une plateforme intelligente de planification de voyages alimentée par un chatbot IA et un système de vision par ordinateur prenant en charge la reconnaissance faciale et le contrôle de caméra basé sur les gestes – offrant des recommandations de voyage personnalisées.",
        "project_data_title": "Nettoyage & Visualisation des données",
        "project_data_desc": "Un pipeline complet de science des données qui extrait des informations exploitables à partir des données de ventes de vélos grâce à une préparation, un nettoyage et une visualisation de données expressive.",
        "project_hadoop_title": "Hadoop MapReduce Big Data",
        "project_hadoop_desc": "Un pipeline de traitement distribué de mégadonnées exploitant Hadoop MapReduce pour analyser des ensembles de données massifs sur un cluster, atteignant un débit de calcul optimisé et une efficacité des ressources.",
        "project_banking_title": "Application UI de banque mobile",
        "project_banking_desc": "Une interface bancaire Android native haute fidélité conçue avec Kotlin – mettant l'accent sur des animations fluides, une navigation intuitive et une expérience de design mobile premium.",
        "project_net1_title": "Infrastructure réseau d'entreprise avec haute disponibilité & redondance",
        "project_net1_desc": "Conception et simulation d'une architecture réseau d'entreprise complète implémentant la segmentation VLAN, le routage inter-VLAN, EtherChannel (PAgP/LACP), la redondance STP/PVST+ et la redondance de premier saut HSRP – garantissant une connectivité tolérante aux pannes et aucun temps d'arrêt pour les serveurs DMZ critiques.",
        "project_net2_title": "Infrastructure réseau bancaire d'entreprise",
        "project_net2_desc": "Conception et simulation d'une architecture réseau d'entreprise multi-zones pour la BIAT, implémentant OSPF, RIP, les VLAN, NAT/PAT et une configuration complète de la CLI Cisco – atteignant 100% de connectivité de bout en bout réussie.",
        "project_ar_title": "Expérience automobile en RA",
        "project_ar_desc": "Une application de réalité augmentée qui superpose un modèle 3D détaillé de voiture sur le monde réel via le suivi de marqueurs Vuforia – permettant aux utilisateurs d'inspecter et d'explorer le véhicule sous tous les angles.",
        "project_museum_title": "Musée de voitures 3D",
        "project_museum_desc": "Un projet créatif 3D Blender présentant un musée automobile virtuel avec des véhicules modernes et traditionnels, une modélisation détaillée, un rendu précis et une conception de scène immersive.",
        "project_livingroom_title": "Design de salon de maison moderne",
        "project_livingroom_desc": "Un projet moderne de design d'intérieur 3D créé avec Blender, présentant un environnement de salon réaliste, la modélisation de meubles, la configuration de l'éclairage, des textures et une visualisation architecturale.",

        // Projects Page spec
        "projects_archive_title": "Tous les projets",
        "projects_archive_desc": "Une archive complète de mes travaux, des exercices académiques aux projets personnels passionnants.",
        "btn_back_home": "Retour à l'accueil",
        "btn_demo": "Démo en direct",
        "project_fileiq_title": "📚 FileIQ - Bot d'intelligence documentaire",
        "project_fileiq_desc": "Cet assistant IA basé sur Streamlit vous permet de télécharger des documents (PDF, DOCX, TXT) et d'interagir avec eux en langage naturel. Alimenté par les modèles Llama via l'API Groq et LangChain, le bot comprend intelligemment vos documents et fournit des réponses précises avec des références de source.",
        "project_pizzai_title": "🍕 PizzAi - Bot de commande de pizza IA",
        "project_pizzai_desc": "Bot de commande de pizza alimenté par l'IA construit avec Streamlit et LLaMA 3 de Groq. Le bot prend les commandes de pizza, gère la livraison ou le retrait, résume la commande et répond comme un humain. Rapide, naturel et personnalisable.",
        "project_gpa_title": "🤓 Oops my GPA! - Calculatrice de moyenne",
        "project_gpa_desc": "Oops My GPA est une application web élégante conçue pour les étudiants afin de calculer, suivre et visualiser leurs moyennes semestrielles et globales. Elle offre plusieurs modes de calcul et des fonctionnalités d'import/export.",
        "project_ysds_title": "🎓 Chatbot YSDS - Assistant d'éducation",
        "project_ysds_desc": "Il s'agit d'un chatbot IA personnalisé utilisant Streamlit et l'API Google Gemini, conçu pour fournir une assistance en temps réel sur Yashfeen Skills Development Services (YSDS).",
        "project_llama_title": "🤖 Chatbot Groq LLM Streamlit",
        "project_llama_desc": "Un chatbot IA interactif et puissant avec UI, construit à l'aide de l'API Groq et du modèle LLaMA 3.3–70B Versatile. Cette application permet des conversations intelligentes en temps réel.",
        "project_pos_title": "🍴 Système POS de restaurant APNA",
        "project_pos_desc": "Un système de point de vente (POS) simple et professionnel pour les restaurants, construit avec Streamlit. Il permet de sélectionner des éléments de menu, de générer des factures et d'appliquer des remises.",
        "project_netflix_title": "🍿 Clone de Netflix",
        "project_netflix_desc": "Une réplique visuellement superbe et réactive de la page d'accueil de Netflix. Reproduit l'interface utilisateur sombre emblématique avec carrousels, section héros et accordéon de FAQ, construite en HTML pur, CSS et JavaScript.",
        "project_amazon_title": "📦 Clone e-commerce d'Amazon",
        "project_amazon_desc": "Une réplique fonctionnelle de la plateforme d'achat Amazon. Comprend une barre de navigation robuste, des grilles de liste de produits, un panier d'achat et une disposition réactive.",
        "project_automark_title": "📝 AutoMARK - IA",
        "project_automark_desc": "Un système de notation automatisé intelligent conçu pour simplifier la vérification des examens basés sur des QCM. Accepte les corrigés et les feuilles de réponses des étudiants et génère des rapports détaillés.",
        "project_health_title": "🩺 Application HealthMate",
        "project_health_desc": "Une application complète de gestion de la santé construite avec Python et Streamlit pour suivre les dossiers des patients, analyser les données de santé et surveiller les métriques vitales.",
        "project_freshmart_title": "🏪 Système POS Fresh-Mart",
        "project_freshmart_desc": "Une solution de point de vente (POS) spécialisée pour les épiceries et les marchés de produits frais. Gère l'inventaire, calcule les totaux avec remises et génère des factures instantanées.",
        "project_bank_manage_title": "💳 Système de gestion bancaire",
        "project_bank_manage_desc": "Une simulation bancaire sécurisée et efficace construite avec Python. Gère la création de comptes, les connexions sécurisées, les dépôts, les retraits et l'historique avec stockage persistant JSON.",

        // Education timeline
        "education_title": "Formation & Certifications",
        "education_desc": "Mon parcours académique et mon apprentissage continu en génie logiciel, IA, réseaux et technologies modernes.",
        "edu_eng_title": "Études d'ingénieur — Génie Logiciel",
        "edu_eng_school": "École Supérieure Privée d'Ingénierie et de Technologie de Monastir — Tunisie",
        "edu_eng_desc": "Actuellement des études d'ingénieur en Génie Logiciel (Génie Logiciel), axées sur l'architecture logicielle, le développement full stack, les bases de données, les réseaux et les systèmes intelligents.",
        "edu_bach_title": "Licence en Informatique",
        "edu_bach_school": "Institut Supérieur d'Informatique et de Multimédia de Gabès — Tunisie",
        "edu_bach_desc": "Obtention d'une Licence en Informatique avec une expérience pratique en développement web, bases de données, applications mobiles, génie logiciel et fondamentaux de la programmation.",
        
        // Certifications
        "cert_title": "🎓 Certifications & Apprentissage en ligne",
        "cert_instructor": "Instructeur :",
        "cert_date": "Date :",
        "cert_duration": "Durée :",
        "cert_hours": "heures",
        "cert_verify": "Voir le certificat",

        // Contact
        "contact_title": "Contactez-moi",
        "contact_desc": "Prêt à donner vie à vos idées ? Créons quelque chose d'incroyable ensemble",
        "contact_hero_heading": "Construisons quelque chose d' <span class=\"gradient-text\">extraordinaire</span>",
        "contact_hero_desc": "Que vous ayez besoin d'une solution alimentée par l'IA, d'un site web moderne ou d'outils d'automatisation, je suis là pour concrétiser votre vision. Envoyez-moi un message et commençons.",
        "contact_stat_time_label": "Temps de réponse",
        "contact_stat_time_val": "Sous 24 heures",
        "contact_stat_satisfaction_label": "Satisfaction client",
        "contact_stat_ideas_label": "Idées bienvenues",
        "contact_info_title": "Informations de contact",
        "contact_info_email": "E-mail",
        "contact_info_location": "Localisation",
        "contact_info_location_val": "Tunisie, Gabès",
        "contact_follow": "Suivez-moi",

        // Form
        "contact_form_firstname": "Prénom *",
        "contact_form_lastname": "Nom *",
        "contact_form_email": "Adresse e-mail *",
        "contact_form_subject": "Sujet *",
        "contact_form_subject_select": "Sélectionnez un sujet",
        "contact_form_subject_web": "Projet de développement Web",
        "contact_form_subject_consult": "Consultation",
        "contact_form_subject_collab": "Opportunité de collaboration",
        "contact_form_subject_job": "Opportunité d'emploi",
        "contact_form_subject_other": "Autre",
        "contact_form_message": "Message *",
        "contact_form_placeholder": "Parlez-moi de votre projet...",
        "contact_form_send": "Envoyer le message",

        // Footer
        "footer_brand_desc": "Créer des expériences numériques simples et intelligentes. Concevoir des projets web et IA avec clarté.",
        "footer_links_title": "Liens rapides",
        "footer_links_home": "Accueil",
        "footer_links_about": "À propos",
        "footer_links_skills": "Compétences",
        "footer_links_projects": "Projets",
        "footer_links_contact": "Contact",
        "footer_connect_title": "Se connecter",
        "footer_copyright": "© 2026 Linda Boukhris. Tous droits réservés.",
        "footer_designed_by": "Conçu avec <span class=\"footer-heart\">❤</span> par <strong>Linda Boukhris</strong>",

        // Chatbot
        "chat_welcome": "Bonjour ! 👋 Je suis l'assistant virtuel de Linda. N'hésitez pas à me poser des questions sur ses **compétences**, ses **projets**, sa **formation** ou comment la **contacter** !",
        "chat_placeholder": "Écrivez un message...",
        "chat_tooltip": "Salut 👋 Besoin d'aide ? Demandez-moi !",
        "chat_status": "En ligne • ",

        // Services page specific
        "maintenance_badge": "Système hors ligne",
        "maintenance_title": "Maintenance <span class=\"text-gradient\">planifiée</span>",
        "maintenance_desc": "Nous mettons actuellement à niveau notre infrastructure de services d'entreprise pour vous offrir une expérience plus rapide et plus fluide. Les systèmes seront bientôt de retour en ligne.",
        "btn_return_home": "Retour à l'accueil",
        "btn_contact_support": "Contacter le support",
        "services_hero_badge": "Solutions d'entreprise",
        "services_hero_title": "Ingénierie de l' <span class=\"text-gradient\">excellence</span> numérique",
        "services_hero_subtitle": "Je m'associe à des marques ambiantes pour concevoir des systèmes d'IA intelligents, des architectures Python robustes et des expériences web de haute performance qui stimulent une croissance mesurable.",
        "services_cat_expertise": "Expertise principale",
        "services_cat_backend": "Backend & Opérations",
        "services_cat_frontend": "Frontend & E-Commerce",
        "services_sec_how": "Comment nous travaillons ensemble",
        "services_sec_how_subtitle": "Une approche transparente et jalonnée pour garantir un succès absolu.",
        "services_step1_title": "Découverte & Cadrage",
        "services_step1_desc": "Nous définissons le problème commercial exact, les exigences techniques et les indicateurs clés de performance (KPI) pour garantir la clarté avant d'écrire la moindre ligne de code.",
        "services_step2_title": "Architecture & Construction",
        "services_step2_desc": "Je conçois la solution en utilisant des frameworks modernes et évolutifs, en fournissant des mises à jour régulières et un accès aux environnements de staging.",
        "services_step3_title": "Tests & Lancement",
        "services_step3_desc": "Tests d'assurance qualité rigoureux, optimisation des performances et lancement transparent en production, garantissant aucun temps d'arrêt.",
        "services_cta_title": "Prêt à faire évoluer votre entreprise ?",
        "services_cta_desc": "J'accepte actuellement de nouveaux projets indépendants et des rôles contractuels. Discutons de votre vision.",
        "services_cta_btn_conv": "Démarrer une conversation",
        "services_cta_btn_wa": "M'écrire sur WhatsApp",
        "services_footer": "© 2026 Linda Boukhris. Tous droits réservés.",
        "services_back": "Retour au portfolio",
        
        // Page Titles
        "title_home": "Linda Boukhris | Portfolio d'étudiante en Génie Logiciel",
        "title_projects": "Tous les projets | Linda Boukhris",
        "title_services": "Services d'entreprise | Choudary Linda Boukhris"
    }
};

// Translate the page to the target language
function translatePage(lang) {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (!key) return;

        // Cache original English contents on first visit
        if (!englishCache[key]) {
            englishCache[key] = {
                html: el.innerHTML,
                placeholder: el.getAttribute('placeholder'),
                title: el.getAttribute('title')
            };
        }

        if (lang === 'fr') {
            const trans = translations.fr[key];
            if (trans !== undefined) {
                if (typeof trans === 'string') {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        if (el.hasAttribute('placeholder')) el.setAttribute('placeholder', trans);
                    } else {
                        el.innerHTML = trans;
                    }
                } else {
                    if (trans.html) el.innerHTML = trans.html;
                    if (trans.placeholder) el.setAttribute('placeholder', trans.placeholder);
                    if (trans.title) el.setAttribute('title', trans.title);
                }
            } else {
                console.warn(`[Translate] Missing French translation for key: "${key}"`);
                // Fallback to English (already in cache or currently in DOM)
                const orig = englishCache[key];
                if (orig) {
                    if (orig.html) el.innerHTML = orig.html;
                    if (orig.placeholder) el.setAttribute('placeholder', orig.placeholder);
                    if (orig.title) el.setAttribute('title', orig.title);
                }
            }
        } else {
            // Restore English from cache
            const orig = englishCache[key];
            if (orig) {
                if (orig.html) el.innerHTML = orig.html;
                if (orig.placeholder) el.setAttribute('placeholder', orig.placeholder);
                if (orig.title) el.setAttribute('title', orig.title);
            }
        }
    });

    // Translate Document Title
    const titleKey = document.body.getAttribute('data-title-key');
    if (titleKey) {
        if (!englishCache['_document_title']) {
            englishCache['_document_title'] = document.title;
        }
        if (lang === 'fr') {
            const transTitle = translations.fr[titleKey];
            if (transTitle !== undefined) {
                document.title = transTitle;
            } else {
                console.warn(`[Translate] Missing French title translation for key: "${titleKey}"`);
                document.title = englishCache['_document_title'];
            }
        } else {
            document.title = englishCache['_document_title'];
        }
    }

    // Set page HTML lang attribute
    document.documentElement.setAttribute('lang', lang);

    // Update active class on toggle switch buttons in the UI
    document.querySelectorAll('.lang-switch').forEach(container => {
        container.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    });

    // Dispatch custom event for dynamic components (like the typing effect)
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
}

// Set up language toggle button event listeners
function initLanguageToggle() {
    // Inject events to switcher buttons dynamically (if not already handled inline)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.lang-btn');
        if (btn) {
            const lang = btn.getAttribute('data-lang');
            if (lang) {
                localStorage.setItem('preferredLanguage', lang);
                translatePage(lang);
            }
        }
    });

    // Load initial language
    const preferredLang = localStorage.getItem('preferredLanguage') || 'en';
    translatePage(preferredLang);
}

// Auto-run on DOM Content Loaded
document.addEventListener('DOMContentLoaded', initLanguageToggle);
