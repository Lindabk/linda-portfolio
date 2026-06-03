import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

start_str = '<div class="projects-grid">'
start_idx = content.find(start_str)

exp_str = '<section id="experience" class="fade-in">'
exp_idx = content.find(exp_str, start_idx)

end_str = '</section>'
end_idx = content.find(end_str, exp_idx) + len(end_str)

replacement = """<div class="projects-grid">

            <div class="project-card">
                <div class="gallery-wrapper">
                    <div class="project-gallery">
                        <div class="gallery-item emoji-cover">🌤️</div>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">Weather Website</h3>
                    <p class="project-description">
                        A modern React application integrating a weather API to display real-time temperature, humidity, and weather conditions with an intuitive user interface.
                    </p>
                    <div class="project-tech">
                        <span class="tech-badge">React</span>
                        <span class="tech-badge">REST API</span>
                        <span class="tech-badge">JavaScript</span>
                    </div>
                </div>
            </div>

            <div class="project-card">
                <div class="gallery-wrapper">
                    <div class="project-gallery">
                        <div class="gallery-item emoji-cover">📅</div>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">Subscription Management Platform</h3>
                    <p class="project-description">
                        A comprehensive platform for managing user subscriptions, billing cycles, and access control. Built with a robust Java backend and an interactive Angular frontend.
                    </p>
                    <div class="project-tech">
                        <span class="tech-badge">Angular</span>
                        <span class="tech-badge">Java</span>
                        <span class="tech-badge">PostgreSQL</span>
                    </div>
                </div>
            </div>

            <div class="project-card">
                <div class="gallery-wrapper">
                    <div class="project-gallery">
                        <div class="gallery-item emoji-cover">🏦</div>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">Mobile Banking UI App</h3>
                    <p class="project-description">
                        A high-fidelity front-end banking application interface built natively for Android, focusing on seamless user experience, smooth animations, and modern mobile design principles.
                    </p>
                    <div class="project-tech">
                        <span class="tech-badge">Android Studio</span>
                        <span class="tech-badge">Kotlin</span>
                        <span class="tech-badge">Mobile UI/UX</span>
                    </div>
                </div>
            </div>

            <div class="project-card">
                <div class="gallery-wrapper">
                    <div class="project-gallery">
                        <div class="gallery-item emoji-cover">🚗</div>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">Car Rental Platform API</h3>
                    <p class="project-description">
                        A robust RESTful API backend for a car rental service, handling vehicle inventory, user bookings, availability tracking, and authentication securely.
                    </p>
                    <div class="project-tech">
                        <span class="tech-badge">Laravel</span>
                        <span class="tech-badge">PHP</span>
                        <span class="tech-badge">MySQL</span>
                    </div>
                </div>
            </div>

            <div class="project-card">
                <div class="gallery-wrapper">
                    <div class="project-gallery">
                        <div class="gallery-item emoji-cover">📊</div>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">Data Cleaning & Visualization</h3>
                    <p class="project-description">
                        An end-to-end data science project extracting insights from bike sales data. Involves extensive data wrangling, cleaning, and creating interactive visualizations.
                    </p>
                    <div class="project-tech">
                        <span class="tech-badge">Python</span>
                        <span class="tech-badge">Pandas</span>
                        <span class="tech-badge">Matplotlib/Seaborn</span>
                    </div>
                </div>
            </div>

            <div class="project-card">
                <div class="gallery-wrapper">
                    <div class="project-gallery">
                        <div class="gallery-item emoji-cover">🕶️</div>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">AR Car Experience</h3>
                    <p class="project-description">
                        An augmented reality project that projects a highly detailed 3D car model into the real world using target markers, allowing users to inspect the car from different angles.
                    </p>
                    <div class="project-tech">
                        <span class="tech-badge">Unity</span>
                        <span class="tech-badge">Vuforia</span>
                        <span class="tech-badge">C#</span>
                    </div>
                </div>
            </div>

            <div class="project-card">
                <div class="gallery-wrapper">
                    <div class="project-gallery">
                        <div class="gallery-item emoji-cover">🌐</div>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">Full Stack React + Django Website</h3>
                    <p class="project-description">
                        A complete full-stack web application combining a responsive React frontend with a secure, scalable Django REST backend to handle user authentication and data management.
                    </p>
                    <div class="project-tech">
                        <span class="tech-badge">React</span>
                        <span class="tech-badge">Django</span>
                        <span class="tech-badge">REST API</span>
                    </div>
                </div>
            </div>

            <div class="project-card">
                <div class="gallery-wrapper">
                    <div class="project-gallery">
                        <div class="gallery-item emoji-cover">🐘</div>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">Hadoop MapReduce Big Data</h3>
                    <p class="project-description">
                        A big data processing pipeline utilizing Hadoop MapReduce to analyze massive datasets distributed across clusters, optimizing computation speed and resource utilization.
                    </p>
                    <div class="project-tech">
                        <span class="tech-badge">Hadoop</span>
                        <span class="tech-badge">MapReduce</span>
                        <span class="tech-badge">Java</span>
                    </div>
                </div>
            </div>

        </div>

        <div class="view-all-projects">
            <a href="./projects/" class="btn btn-secondary">
                View All Projects
            </a>
        </div>
    </section>"""

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + replacement + content[end_idx:]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Replaced successfully')
else:
    print('Failed to find indices', start_idx, end_idx)
