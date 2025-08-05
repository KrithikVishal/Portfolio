// Advanced Video-like Portfolio Animations
class PortfolioAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.createParticleSystem();
        this.initScrollAnimations();
        this.initTypingEffect();
        this.initParallaxEffects();
        this.initInteractiveElements();
        this.initLoadingScreen();
        this.initCursorEffects();
        this.initSmoothScrolling();
    }

    // Create dynamic particle system
    createParticleSystem() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        document.body.appendChild(particleContainer);

        for (let i = 0; i < 50; i++) {
            this.createParticle(particleContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: linear-gradient(45deg, #4169e1, #9370db);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.1};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 20 + 10}s linear infinite;
        `;
        container.appendChild(particle);
    }

    // Advanced scroll animations with Intersection Observer
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotateX(0deg)';
                }
            });
        }, observerOptions);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll('section, .project-card, .skill-category');
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px) rotateX(10deg)';
            element.style.transition = `all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`;
            observer.observe(element);
        });
    }

    // Advanced typing effect with cursor
    initTypingEffect() {
        const heroTitle = document.querySelector('.hero-content h1');
        if (!heroTitle) return;

        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid #4169e1';
        heroTitle.style.animation = 'blink 1s infinite';

        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                    heroTitle.style.animation = 'none';
                }, 1000);
            }
        };

        setTimeout(typeWriter, 1500);
    }

    // Parallax effects for depth
    initParallaxEffects() {
        const heroImage = document.querySelector('.hero-image img');
        if (!heroImage) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroImage.style.transform = `translateY(${rate}px) rotateY(${scrolled * 0.01}deg)`;
        });

        // Mouse parallax effect
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            heroImage.style.transform = `
                translateY(${mouseY * -20}px) 
                rotateY(${mouseX * 10}deg) 
                rotateX(${mouseY * -5}deg)
            `;
        });
    }

    // Interactive elements with advanced hover effects
    initInteractiveElements() {
        // Project cards with 3D hover effects
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.transform = `
                    translateY(-20px) 
                    scale(1.05) 
                    rotateY(${(x - rect.width / 2) * 0.01}deg) 
                    rotateX(${(y - rect.height / 2) * -0.01}deg)
                `;
                card.style.boxShadow = '0 40px 80px rgba(65, 105, 225, 0.4)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1) rotateY(0deg) rotateX(0deg)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            });
        });

        // Skill items with ripple effect
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((skill, index) => {
            skill.style.animationDelay = `${index * 0.1}s`;
            
            skill.addEventListener('mouseenter', () => {
                skill.style.transform = 'scale(1.15) translateY(-10px)';
                skill.style.boxShadow = '0 20px 40px rgba(65, 105, 225, 0.5)';
            });

            skill.addEventListener('mouseleave', () => {
                skill.style.transform = 'scale(1) translateY(0)';
                skill.style.boxShadow = 'none';
            });
        });

        // Buttons with magnetic effect
        const buttons = document.querySelectorAll('.btn, button');
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }

    // Advanced loading screen
    initLoadingScreen() {
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.innerHTML = `
            <div class="loading-content">
                <div class="spinner"></div>
                <div class="loading-text">Loading Portfolio...</div>
            </div>
        `;

        const loadingStyle = document.createElement('style');
        loadingStyle.textContent = `
            .loading {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                animation: fadeOut 1s ease-out 3s forwards;
            }
            .loading-content {
                text-align: center;
            }
            .spinner {
                width: 80px;
                height: 80px;
                border: 4px solid rgba(65, 105, 225, 0.2);
                border-top: 4px solid #4169e1;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }
            .loading-text {
                color: #b8c5d6;
                font-size: 1.2rem;
                font-weight: 500;
                animation: pulse 2s ease-in-out infinite;
            }
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    visibility: hidden;
                }
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(loadingStyle);
        document.body.appendChild(loading);

        setTimeout(() => {
            loading.remove();
        }, 3000);
    }

    // Advanced cursor effects
    initCursorEffects() {
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        const cursorFollower = document.createElement('div');
        cursorFollower.className = 'cursor-follower';

        const cursorStyle = document.createElement('style');
        cursorStyle.textContent = `
            * {
                cursor: none !important;
            }
            .custom-cursor {
                position: fixed;
                width: 20px;
                height: 20px;
                border: 2px solid #4169e1;
                border-radius: 50%;
                pointer-events: none;
                z-index: 99999;
                transition: transform 0.1s ease;
                mix-blend-mode: difference;
                transform: translate(-50%, -50%);
            }
            .cursor-follower {
                position: fixed;
                width: 8px;
                height: 8px;
                background: #9370db;
                border-radius: 50%;
                pointer-events: none;
                z-index: 99998;
                transition: transform 0.15s ease;
                mix-blend-mode: difference;
                transform: translate(-50%, -50%);
            }
            .custom-cursor.hover {
                transform: translate(-50%, -50%) scale(2);
                border-color: #9370db;
            }
            .cursor-follower.hover {
                transform: translate(-50%, -50%) scale(1.5);
            }
        `;
        document.head.appendChild(cursorStyle);
        document.body.appendChild(cursor);
        document.body.appendChild(cursorFollower);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor animation with better performance
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            followerX += (mouseX - followerX) * 0.08;
            followerY += (mouseY - followerY) * 0.08;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Enhanced hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .experience-card, .contact-card, input, textarea');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            });
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            });
        });

        // Handle cursor visibility on page load/visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cursor.style.display = 'none';
                cursorFollower.style.display = 'none';
            } else {
                cursor.style.display = 'block';
                cursorFollower.style.display = 'block';
            }
        });

        // Handle cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.display = 'block';
            cursorFollower.style.display = 'block';
        });
    }

    // Smooth scrolling with easing
    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const targetPosition = targetSection.offsetTop;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1000;
                    let start = null;

                    const animation = (currentTime) => {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const run = this.easeInOutCubic(timeElapsed, startPosition, distance, duration);
                        window.scrollTo(0, run);
                        if (timeElapsed < duration) requestAnimationFrame(animation);
                    };
                    requestAnimationFrame(animation);
                }
            });
        });
    }

    // Easing function for smooth scrolling
    easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
});

// Add CSS for additional animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }

    @keyframes morphGradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    @keyframes blink {
        0%, 50% { border-color: transparent; }
        51%, 100% { border-color: #4169e1; }
    }

    .animate-in {
        animation: fadeInUp 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px) rotateX(10deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
        }
    }
`;
document.head.appendChild(additionalStyles); 