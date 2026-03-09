// Main Script
document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Close mobile menu when link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-on-scroll');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .project-card, .skill-category, .section-title, .about-content').forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s ease-out";
        observer.observe(el);
    });

    // GitHub API Integration
    const githubUsername = 'yshiwerekey'; // Assumed from email
    const repoContainer = document.getElementById('github-repos');

    if (repoContainer) {
        fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`)
            .then(response => {
                if (!response.ok) throw new Error('User not found or API limit reached');
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    repoContainer.innerHTML = '<p>No repositories found.</p>';
                    return;
                }

                repoContainer.innerHTML = data.map(repo => `
                    <div class="repo-card">
                        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                        <p>${repo.description || 'No description available.'}</p>
                        <div class="repo-stats">
                            <span><i class="fas fa-circle" style="font-size: 8px; color: ${repo.language ? '#f1e05a' : '#ccc'}"></i> ${repo.language || 'Code'}</span>
                            <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                            <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                        </div>
                    </div>
                `).join('');
            })
            .catch(err => {
                console.error('GitHub fetch error:', err);
                repoContainer.innerHTML = `
                    <div style="text-align: center; width: 100%;">
                        <p>Could not load repositories automatically (User might not exist on GitHub with this exact name).</p>
                        <a href="https://github.com/search?q=${githubUsername}" target="_blank" class="btn btn-secondary">Search on GitHub</a>
                    </div>
                `;
            });
    }

    // Chat Widget Logic
    const chatToggle = document.getElementById('chat-toggle');
    const chatBox = document.getElementById('chat-box');
    const closeChat = document.getElementById('close-chat');

    if (chatToggle && chatBox && closeChat) {
        chatToggle.addEventListener('click', () => {
            chatBox.classList.toggle('active');
            const icon = chatToggle.querySelector('i');
            if (chatBox.classList.contains('active')) {
                icon.classList.remove('fa-comment-dots');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-comment-dots');
            }
        });

        closeChat.addEventListener('click', () => {
            chatBox.classList.remove('active');
            const icon = chatToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-comment-dots');
        });
    }
});
