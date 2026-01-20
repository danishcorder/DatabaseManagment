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

// ===========================================
// ADVANCED 2026-LEVEL INTERACTIVE FEATURES
// ===========================================

class ParticleSystem2026 {
    constructor() {
        this.particles = [];
        this.particleCount = 50;
        this.container = document.getElementById('particles');
        this.init();
    }

    init() {
        this.createParticles();
        this.animateParticles();
        this.addMouseInteraction();
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random positioning and properties
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 15) + 's';

            // Color variation
            const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }

    animateParticles() {
        // Dynamic particle behavior
        setInterval(() => {
            this.particles.forEach(particle => {
                // Add subtle movement variations
                const currentTop = parseFloat(particle.style.top);
                particle.style.top = (currentTop + Math.sin(Date.now() * 0.001) * 0.1) + '%';
            });
        }, 100);
    }

    addMouseInteraction() {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            this.particles.forEach((particle, index) => {
                const speed = (index % 3 + 1) * 0.5;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;

                particle.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
            });
        });
    }
}

class HolographicEffects {
    constructor() {
        this.init();
    }

    init() {
        this.addHolographicCards();
        this.addDynamicLighting();
        this.addMagneticCursor();
    }

    addHolographicCards() {
        const cards = document.querySelectorAll('.team-card, .overview-card, .entity-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createHologramEffect(card, e);
            });

            card.addEventListener('mouseleave', () => {
                this.removeHologramEffect(card);
            });
        });
    }

    createHologramEffect(card, event) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Create holographic overlay
        const hologram = document.createElement('div');
        hologram.className = 'hologram-overlay';
        hologram.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg,
                rgba(255, 107, 53, 0.3) 0%,
                rgba(232, 93, 117, 0.2) 25%,
                rgba(76, 175, 80, 0.3) 50%,
                rgba(255, 107, 53, 0.2) 75%,
                rgba(232, 93, 117, 0.3) 100%);
            opacity: 0;
            animation: hologramPulse 2s ease-in-out infinite;
            pointer-events: none;
            z-index: 1;
        `;

        card.style.position = 'relative';
        card.appendChild(hologram);

        // Animate hologram appearance
        setTimeout(() => {
            hologram.style.opacity = '0.6';
        }, 50);
    }

    removeHologramEffect(card) {
        const hologram = card.querySelector('.hologram-overlay');
        if (hologram) {
            hologram.style.opacity = '0';
            setTimeout(() => hologram.remove(), 300);
        }
    }

    addDynamicLighting() {
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.team-card, .overview-card');

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const angleX = (y - centerY) / centerY;
                const angleY = (centerX - x) / centerX;

                card.style.transform = `perspective(1000px) rotateX(${angleX * 5}deg) rotateY(${angleY * 5}deg)`;
            });
        });
    }

    addMagneticCursor() {
        const magneticElements = document.querySelectorAll('.btn, .nav-link, .social-links a');

        document.addEventListener('mousemove', (e) => {
            magneticElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const distance = Math.sqrt(x * x + y * y);

                if (distance < 100) {
                    const strength = (100 - distance) / 100;
                    element.style.transform = `translate(${x * strength * 0.3}px, ${y * strength * 0.3}px)`;
                } else {
                    element.style.transform = 'translate(0, 0)';
                }
            });
        });
    }
}

class NeuralNetworkVisualization {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.nodes = [];
        this.connections = [];
        this.init();
    }

    init() {
        this.createCanvas();
        this.generateNeuralNetwork();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'neural-network';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -2;
            opacity: 0.1;
        `;

        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    generateNeuralNetwork() {
        // Create nodes (representing database entities)
        for (let i = 0; i < 15; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                connections: []
            });
        }

        // Create connections between nodes
        this.nodes.forEach((node, i) => {
            const connectionCount = Math.floor(Math.random() * 4) + 1;
            for (let j = 0; j < connectionCount; j++) {
                const targetIndex = Math.floor(Math.random() * this.nodes.length);
                if (targetIndex !== i) {
                    node.connections.push(targetIndex);
                }
            }
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update node positions
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

            // Keep within bounds
            node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            node.y = Math.max(0, Math.min(this.canvas.height, node.y));
        });

        // Draw connections
        this.ctx.strokeStyle = 'rgba(255, 107, 53, 0.3)';
        this.ctx.lineWidth = 1;

        this.nodes.forEach((node, i) => {
            node.connections.forEach(targetIndex => {
                const target = this.nodes[targetIndex];
                this.ctx.beginPath();
                this.ctx.moveTo(node.x, node.y);
                this.ctx.lineTo(target.x, target.y);
                this.ctx.stroke();
            });
        });

        // Draw nodes
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 107, 53, 0.6)';
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

class QuantumLoadingEffect {
    constructor() {
        this.isLoading = true;
        this.progress = 0;
        this.init();
    }

    init() {
        this.createLoadingOverlay();
        this.startLoadingAnimation();
    }

    createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <h2>Initializing Neural Database Interface</h2>
                <p>Connecting to quantum processors...</p>
                <div class="loading-progress">
                    <div class="progress-bar"></div>
                </div>
                <div class="loading-stats">
                    <span>Entities: 8</span>
                    <span>Relationships: 6</span>
                    <span>Normalization: 3NF</span>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        this.overlay = overlay;
    }

    startLoadingAnimation() {
        const progressBar = this.overlay.querySelector('.progress-bar');
        const stats = this.overlay.querySelectorAll('.loading-stats span');

        const interval = setInterval(() => {
            this.progress += Math.random() * 15;

            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(interval);

                // Animate stats
                stats.forEach((stat, index) => {
                    setTimeout(() => {
                        stat.style.animation = 'textGlow 0.5s ease-in-out';
                    }, index * 200);
                });

                // Hide loading screen
                setTimeout(() => {
                    this.overlay.style.animation = 'loadingFade 0.5s ease-in-out forwards';
                    setTimeout(() => {
                        this.overlay.remove();
                        this.triggerWelcomeAnimation();
                    }, 500);
                }, 1000);
            }

            progressBar.style.width = this.progress + '%';
        }, 100);
    }

    triggerWelcomeAnimation() {
        // Trigger welcome sequence
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.animation = 'welcomePulse 1s ease-in-out';
        }

        // Add quantum particles effect
        this.createQuantumParticles();
    }

    createQuantumParticles() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 4px;
                    height: 4px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    animation: quantumParticle 2s ease-out forwards;
                `;

                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';

                document.body.appendChild(particle);

                setTimeout(() => particle.remove(), 2000);
            }, i * 100);
        }
    }
}

class VoiceInteractionSystem {
    constructor() {
        this.isListening = false;
        this.recognition = null;
        this.init();
    }

    init() {
        // Check for speech recognition support
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            this.initSpeechRecognition();
            this.createVoiceButton();
        }
    }

    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            this.processVoiceCommand(command);
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.updateVoiceButton();
        };
    }

    createVoiceButton() {
        const button = document.createElement('button');
        button.id = 'voice-button';
        button.innerHTML = '<i class="fas fa-microphone"></i>';
        button.style.cssText = `
            position: fixed;
            bottom: 120px;
            right: 30px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border: none;
            color: white;
            cursor: pointer;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            transition: all 0.3s ease;
            animation: gentlePulse 3s ease-in-out infinite;
        `;

        button.addEventListener('click', () => this.toggleListening());
        document.body.appendChild(button);
        this.voiceButton = button;
    }

    toggleListening() {
        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.recognition.start();
            this.isListening = true;
            this.updateVoiceButton();
        }
    }

    updateVoiceButton() {
        if (this.isListening) {
            this.voiceButton.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
            this.voiceButton.style.animation = 'listeningPulse 1s ease-in-out infinite';
        } else {
            this.voiceButton.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
            this.voiceButton.style.animation = 'gentlePulse 3s ease-in-out infinite';
        }
    }

    processVoiceCommand(command) {
        console.log('Voice command:', command);

        // Navigate to sections
        if (command.includes('home') || command.includes('index')) {
            window.location.href = 'index.html';
        } else if (command.includes('problem')) {
            window.location.href = 'problem.html';
        } else if (command.includes('normalization')) {
            window.location.href = 'normalization.html';
        } else if (command.includes('diagram') || command.includes('er')) {
            window.location.href = 'erdiagram.html';
        } else if (command.includes('sql')) {
            window.location.href = 'sql.html';
        } else if (command.includes('conclusion')) {
            window.location.href = 'conclusion.html';
        }

        // Show message
        this.showVoiceFeedback(`Navigating to ${command}`);
    }

    showVoiceFeedback(message) {
        const feedback = document.createElement('div');
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            z-index: 1001;
            animation: fadeInOut 2s ease-in-out forwards;
        `;

        document.body.appendChild(feedback);
        setTimeout(() => feedback.remove(), 2000);
    }
}

// Enhanced CSS Animations
const injectAdvancedStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes hologramPulse {
            0%, 100% {
                opacity: 0.3;
                transform: scale(1);
            }
            50% {
                opacity: 0.8;
                transform: scale(1.05);
            }
        }

        @keyframes quantumParticle {
            0% {
                opacity: 1;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 0.8;
                transform: scale(1) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(2) rotate(360deg);
            }
        }

        @keyframes welcomePulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }

        @keyframes listeningPulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 8px 25px rgba(255, 68, 68, 0.4);
            }
            50% {
                transform: scale(1.1);
                box-shadow: 0 8px 35px rgba(255, 68, 68, 0.8);
            }
        }

        @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }

        @keyframes textGlow {
            0%, 100% { text-shadow: 0 0 10px rgba(255, 107, 53, 0.5); }
            50% { text-shadow: 0 0 20px rgba(255, 107, 53, 0.8), 0 0 30px rgba(255, 107, 53, 0.6); }
        }

        /* Advanced hover effects */
        .team-card:hover {
            filter: drop-shadow(0 20px 40px rgba(255, 107, 53, 0.3));
        }

        /* Neural network visualization */
        #neural-network {
            background: transparent;
        }
    `;
    document.head.appendChild(style);
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Inject advanced styles
    injectAnimationStyles();
    injectAdvancedStyles();

    // Initialize all systems
    new AcademicAnimationSystem();
    new MicroInteractions();
    new AcademicFeatures();
    new PerformanceOptimizer();

    // Initialize 2026-level features
    new ParticleSystem2026();
    new HolographicEffects();
    new NeuralNetworkVisualization();
    new QuantumLoadingEffect();
    new VoiceInteractionSystem();

    console.log('🚀 Food Delivery DBMS Project - All systems initialized successfully');
    console.log('🧠 Advanced 2026 Neural Interface Activated');
    console.log('🎯 Quantum Processing: Online');
    console.log('🎤 Voice Commands: Available');
    console.log('📚 Academic Database Management System - 2026');
    console.log('👨‍🎓 Computer Science Department Project - Enhanced Edition');
});
