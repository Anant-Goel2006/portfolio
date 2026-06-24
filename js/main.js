/**
 * Main.js - Core logic, navigation, and page initialization
 * 3D & Motion Portfolio Website
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Preloader
    // ==========================================
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
            }, 600);
        }, 1500);
    });

    // Fallback: hide preloader after 4 seconds no matter what
    setTimeout(() => {
        if (preloader && preloader.style.display !== 'none') {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
            }, 600);
        }
    }, 4000);

    // ==========================================
    // Mobile Navigation Toggle
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close mobile nav when a link is clicked
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // ==========================================
    // Active Nav Link on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // ==========================================
    // Showreel Video - Play on Scroll
    // ==========================================
    const showreelSection = document.getElementById('showreel');
    const showreelVideo = document.querySelector('.showreel-video video');

    if (showreelVideo && showreelSection) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    showreelVideo.play().catch(() => {});
                } else {
                    showreelVideo.pause();
                }
            });
        }, { threshold: 0.3 });

        videoObserver.observe(showreelSection);
    }

    // ==========================================
    // Contact Form Handling
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Simulate form submission
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent! ✓';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 2500);
            }, 1500);
        });
    }

    // ==========================================
    // Typed Text Effect for Hero Subtitle
    // ==========================================
    const typedElement = document.querySelector('.typed-text');
    
    if (typedElement) {
        const texts = [
            'Data Analyst',
            'Data Science Undergrad',
            'Machine Learning Enthusiast',
            'Problem Solver'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typedElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typingSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before next word
            }

            setTimeout(typeText, typingSpeed);
        }

        setTimeout(typeText, 1000);
    }

    // ==========================================
    // Counter Animation for Stats
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-count'));
                const suffix = target.getAttribute('data-suffix') || '';
                let current = 0;
                const increment = finalValue / 60;
                const duration = 2000;
                const stepTime = duration / 60;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= finalValue) {
                        current = finalValue;
                        clearInterval(counter);
                    }
                    target.textContent = Math.floor(current) + suffix;
                }, stepTime);

                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));

    // ==========================================
    // Magnetic Effect on Buttons
    // ==========================================
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
            el.style.transition = 'transform 0.4s ease';
        });

        el.addEventListener('mouseenter', () => {
            el.style.transition = 'none';
        });
    });

    // ==========================================
    // Current Year in Footer
    // ==========================================
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    console.log('🎨 Portfolio initialized successfully');
});
