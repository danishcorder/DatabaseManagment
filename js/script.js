// ===========================================
// Food Delivery DBMS Project - JavaScript
// Modern 2026 Animation System & Navigation
// ===========================================

class AcademicAnimationSystem {
    constructor() {
        this.init();
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupAccessibility();
    }

    init() {
        // Initialize when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeAnimations();
            this.setupScrollProgress();
            this.setupBackToTop();
            this.setupPerformanceMonitoring();
        });
    }

    setupNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Hamburger menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger?.contains(e.target) && !navMenu?.contains(e.target)) {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
            }
        });
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll-triggered animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.getAttribute('data-animate');

                    // Apply animation based on type
                    switch(animationType) {
                        case 'fade-slide-up':
                            this.animateFadeSlideUp(element);
                            break;
                        case 'fade-slide-up-delayed':
                            this.animateFadeSlideUpDelayed(element);
                            break;
                        case 'card-entrance':
                            this.animateCardEntrance(element);
                            break;
                        case 'slide-in-left':
                            this.animateSlideInLeft(element);
                            break;
                        case 'slide-in-right':
                            this.animateSlideInRight(element);
                            break;
                        case 'scale-in':
                            this.animateScaleIn(element);
                            break;
                        case 'bounce-in':
                            this.animateBounceIn(element);
                            break;
                        case 'flip-in':
                            this.animateFlipIn(element);
                            break;
                        case 'float-up':
                            this.animateFloatUp(element);
                            break;
                        default:
                            element.classList.add('animate-visible');
                    }

                    // Remove from observation once animated
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe all elements with data-animate attributes
        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });
    }

    animateFadeSlideUp(element) {
        element.classList.add('animate-visible');
    }

    animateFadeSlideUpDelayed(element) {
        element.classList.add('animate-visible-delayed');
    }

    animateCardEntrance(element) {
        // Add staggered delay if specified
        const delay = element.getAttribute('data-delay') || '0s';
        element.style.transitionDelay = delay;
        element.classList.add('animate-visible');
    }

    animateSlideInLeft(element) {
        element.classList.add('animate-visible-left');
    }

    animateSlideInRight(element) {
        element.classList.add('animate-visible-right');
    }

    animateScaleIn(element) {
        element.classList.add('animate-visible-scale');
    }

    animateBounceIn(element) {
        element.classList.add('animate-visible-bounce');
    }

    animateFlipIn(element) {
        element.classList.add('animate-visible-flip');
    }

    animateFloatUp(element) {
        element.classList.add('animate-visible-float');
    }

    setupScrollProgress() {
        const progressBar = document.querySelector('.progress-bar');

        if (progressBar) {
            window.addEventListener('scroll', () => {
                const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                progressBar.style.width = `${scrolled}%`;
            });
        }
    }

    setupBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top');

        if (backToTopBtn) {
            // Show/hide button based on scroll position
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });

            // Smooth scroll to top
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    setupAccessibility() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Keyboard navigation enhancements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Focus management for modals/cards (if any)
        document.querySelectorAll('.team-card, .overview-card, .entity-card').forEach(card => {
            card.addEventListener('focus', () => {
                card.style.outline = '3px solid var(--primary-color)';
                card.style.outlineOffset = '2px';
            });

            card.addEventListener('blur', () => {
                card.style.outline = 'none';
            });
        });
    }

    initializeAnimations() {
        // Add loading class removal
        document.body.classList.add('loading');

        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 100);

        // Initialize any data-delay animations
        document.querySelectorAll('[data-delay]').forEach(element => {
            const delay = element.getAttribute('data-delay');
            element.style.transitionDelay = delay;
        });
    }

    setupPerformanceMonitoring() {
        // Performance monitoring for academic purposes
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
                console.log(`Page loaded in ${loadTime}ms - Food Delivery DBMS Project`);

                // Log animation performance
                if (window.performance.getEntriesByType) {
                    const navigation = window.performance.getEntriesByType('navigation')[0];
                    if (navigation) {
                        console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.navigationStart);
                        console.log('Load Complete:', navigation.loadEventEnd - navigation.navigationStart);
                    }
                }
            });
        }
    }
}

// Enhanced Micro-Interactions Class
class MicroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupHoverEffects();
        this.setupClickEffects();
        this.setupScrollEffects();
    }

    setupHoverEffects() {
        // Enhanced team card hover effects
        document.querySelectorAll('.team-card, .overview-card, .entity-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.handleCardHover(e, card, 'enter');
            });

            card.addEventListener('mouseleave', (e) => {
                this.handleCardHover(e, card, 'leave');
            });

            card.addEventListener('mousemove', (e) => {
                this.handleCardTilt(e, card);
            });
        });

        // Button hover effects
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px) scale(1.02)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    handleCardHover(e, card, action) {
        const avatar = card.querySelector('.team-avatar img, .supervisor-avatar img, .entity-icon');
        const glow = card.querySelector('.avatar-glow, .supervisor-glow');

        if (action === 'enter') {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';

            if (avatar) {
                avatar.style.transform = 'scale(1.05)';
                avatar.style.transition = 'transform 0.3s ease';
            }

            if (glow) {
                glow.style.opacity = '1';
            }
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';

            if (avatar) {
                avatar.style.transform = 'scale(1)';
            }

            if (glow) {
                glow.style.opacity = '0';
            }
        }
    }

    handleCardTilt(e, card) {
        // 3D tilt effect for modern interactions
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `
            translateY(-8px)
            scale(1.02)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
    }

    setupClickEffects() {
        // Ripple effect for buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
        });

        // Card click feedback
        document.querySelectorAll('.team-card, .overview-card').forEach(card => {
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
            });
        });
    }

    createRippleEffect(e, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupScrollEffects() {
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                hero.style.transform = `translateY(${rate}px)`;
            });
        }

        // Dynamic navbar background on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = '';
                }
            });
        }
    }
}

// Academic Features Class
class AcademicFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.setupCodeHighlighting();
        this.setupTableInteractions();
        this.setupPrintOptimization();
        this.setupAcademicNavigation();
    }

    setupCodeHighlighting() {
        // Simple syntax highlighting for SQL keywords
        document.querySelectorAll('.code-block code').forEach(codeBlock => {
            const text = codeBlock.textContent;
            const highlighted = text
                .replace(/\b(CREATE|TABLE|PRIMARY KEY|FOREIGN KEY|REFERENCES|INSERT INTO|VALUES|SELECT|FROM|WHERE|JOIN|ON|GROUP BY|ORDER BY|UNION ALL|COUNT|SUM|AVG|LEFT JOIN)\b/g, '<span class="sql-keyword">$1</span>')
                .replace(/\b(VARCHAR|INT|DECIMAL|DATE|NOT NULL|UNIQUE|CHECK|ON DELETE CASCADE|ON UPDATE CASCADE)\b/g, '<span class="sql-keyword">$1</span>')
                .replace(/\b(USE|DESCRIBE|SHOW TABLES)\b/g, '<span class="sql-function">$1</span>')
                .replace(/'([^']*)'/g, '<span class="sql-string">$1</span>')
                .replace(/(\d+)/g, '<span class="sql-number">$1</span>')
                .replace(/(--.*$)/gm, '<span class="sql-comment">$1</span>');

            codeBlock.innerHTML = highlighted;
        });
    }

    setupTableInteractions() {
        // Enhanced table interactions for academic content
        document.querySelectorAll('.normalization-table tr').forEach(row => {
            row.addEventListener('mouseenter', () => {
                row.style.background = 'rgba(255, 107, 53, 0.1)';
                row.style.transform = 'scale(1.01)';
                row.style.transition = 'all 0.2s ease';
            });

            row.addEventListener('mouseleave', () => {
                row.style.background = '';
                row.style.transform = 'scale(1)';
            });
        });

        // Click to expand/collapse code blocks
        document.querySelectorAll('.code-block').forEach(block => {
            block.addEventListener('click', () => {
                block.classList.toggle('expanded');
            });
        });
    }

    setupPrintOptimization() {
        // Print-friendly styles
        window.addEventListener('beforeprint', () => {
            document.body.classList.add('printing');
        });

        window.addEventListener('afterprint', () => {
            document.body.classList.remove('printing');
        });
    }

    setupAcademicNavigation() {
        // Enhanced navigation for academic content
        const currentPage = window.location.pathname.split('/').pop();

        // Highlight current page in navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.debounceScroll();
        this.optimizeAnimations();
        this.setupLazyLoading();
    }

    debounceScroll() {
        // Debounce scroll events for better performance
        let scrollTimeout;
        const handleScroll = () => {
            // Scroll handling logic
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Debounced scroll actions
            }, 16); // ~60fps
        };

        window.addEventListener('scroll', handleScroll);
    }

    optimizeAnimations() {
        // Reduce animations on low-performance devices
        if ('deviceMemory' in navigator && navigator.deviceMemory < 4) {
            document.body.classList.add('reduced-animations');
        }

        // Respect user's motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }
    }

    setupLazyLoading() {
        // Lazy load images for better performance
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// CSS Animations (injected dynamically for better performance)
const injectAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        /* Print styles */
        @media print {
            .navbar, .scroll-progress, .back-to-top, .hamburger {
                display: none !important;
            }

            .team-card, .overview-card, .supervisor-card {
                break-inside: avoid;
                box-shadow: none !important;
                border: 1px solid #ccc !important;
            }

            .code-block {
                white-space: pre-wrap;
                word-wrap: break-word;
            }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
            .sql-keyword { color: #0000FF !important; }
            .sql-string { color: #008000 !important; }
            .sql-comment { color: #808080 !important; }
        }

        /* Reduced motion */
        .reduced-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Inject dynamic styles
    injectAnimationStyles();

    // Initialize all systems
    new AcademicAnimationSystem();
    new MicroInteractions();
    new AcademicFeatures();
    new PerformanceOptimizer();

    console.log('🚀 Food Delivery DBMS Project - All systems initialized successfully');
    console.log('📚 Academic Database Management System - 2026');
    console.log('👨‍🎓 Computer Science Department Project');
});
