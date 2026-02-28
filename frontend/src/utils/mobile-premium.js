/**
 * MOBILE PREMIUM EXPERIENCE - JavaScript
 * Advanced Mobile-Specific Features & Interactions
 */

class MobilePremiumExperience {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.init();
    }

    init() {
        if (!this.isMobile) return;

        this.initScrollProgress();
        this.initScrollToTop();
        this.initLazyLoading();
        this.initRevealAnimations();
        this.initSwipeGalleries();
        this.initFloatingActionButton();
        this.initBottomSheet();
        this.initTouchFeedback();
        this.initPullToRefresh();

        console.log('🎉 Mobile Premium Experience Activated!');
    }

    /* ========================================
       1. SCROLL PROGRESS INDICATOR
       ======================================== */
    initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.prepend(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.transform = `scaleX(${scrolled / 100})`;
        });
    }

    /* ========================================
       2. SCROLL TO TOP BUTTON
       ======================================== */
    initScrollToTop() {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>';
        button.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(button);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                button.classList.add('visible');
            } else {
                button.classList.remove('visible');
            }
        });

        button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Celebration effect
            this.celebrate(button);
        });
    }

    /* ========================================
       3. LAZY LOADING WITH PROGRESSIVE REVEAL
       ======================================== */
    initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        images.forEach(img => imageObserver.observe(img));
    }

    /* ========================================
       4. REVEAL ANIMATIONS ON SCROLL
       ======================================== */
    initRevealAnimations() {
        const cards = document.querySelectorAll('.glass-vision, .glass-tile, .pricing-card, .tech-card, .vision-card');

        cards.forEach(card => {
            card.classList.add('reveal-card', 'interactive-card');
        });

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.reveal-card').forEach(el => {
            el.style.animationPlayState = 'paused';
            revealObserver.observe(el);
        });
    }

    /* ========================================
       5. SWIPEABLE GALLERIES
       ======================================== */
    initSwipeGalleries() {
        document.querySelectorAll('.tech-stack-grid, .pricing-grid, .features-grid').forEach(grid => {
            if (!this.isMobile) return;

            // Convert to swipeable gallery
            grid.classList.add('mobile-swipe-gallery');
            grid.querySelectorAll('> *').forEach(item => {
                item.classList.add('gallery-item');
            });

            // Add scroll indicators
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'gallery-dots';

            const itemCount = grid.children.length;
            for (let i = 0; i < itemCount; i++) {
                const dot = document.createElement('div');
                dot.className = 'gallery-dot';
                if (i === 0) dot.classList.add('active');
                dotsContainer.appendChild(dot);
            }

            grid.after(dotsContainer);

            // Update dots on scroll
            grid.addEventListener('scroll', () => {
                const scrollLeft = grid.scrollLeft;
                const itemWidth = grid.children[0].offsetWidth;
                const currentIndex = Math.round(scrollLeft / itemWidth);

                dotsContainer.querySelectorAll('.gallery-dot').forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            });
        });
    }

    /* ========================================
       6. FLOATING ACTION BUTTON (FAB)
       ======================================== */
    initFloatingActionButton() {
        const fab = document.createElement('button');
        fab.className = 'mobile-fab ripple-button';
        fab.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
        fab.setAttribute('aria-label', 'Quick actions');

        const fabMenu = document.createElement('div');
        fabMenu.className = 'fab-menu';
        fabMenu.innerHTML = `
            <a href="/contact" class="fab-menu-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                <span>Contact Us</span>
            </a>
            <a href="/careers" class="fab-menu-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                <span>Join Our Team</span>
            </a>
            <a href="/products" class="fab-menu-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
                <span>View Products</span>
            </a>
        `;

        document.body.appendChild(fab);
        document.body.appendChild(fabMenu);

        let fabOpen = false;
        fab.addEventListener('click', () => {
            fabOpen = !fabOpen;
            fabMenu.classList.toggle('active', fabOpen);
            fab.style.transform = fabOpen ? 'rotate(45deg)' : 'rotate(0deg)';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!fab.contains(e.target) && !fabMenu.contains(e.target)) {
                fabOpen = false;
                fabMenu.classList.remove('active');
                fab.style.transform = 'rotate(0deg)';
            }
        });
    }

    /* ========================================
       7. BOTTOM SHEET NAVIGATION
       ======================================== */
    initBottomSheet() {
        const bottomSheet = document.createElement('div');
        bottomSheet.className = 'mobile-bottom-sheet active';
        bottomSheet.innerHTML = `
            <div class="bottom-sheet-handle"></div>
            <nav class="bottom-sheet-nav">
                <a href="/" class="bottom-sheet-item ${window.location.pathname === '/' ? 'active' : ''}">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                    <span>Home</span>
                </a>
                <a href="/about" class="bottom-sheet-item ${window.location.pathname === '/about' ? 'active' : ''}">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    <span>About</span>
                </a>
                <a href="/services" class="bottom-sheet-item ${window.location.pathname === '/services' ? 'active' : ''}">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    <span>Services</span>
                </a>
                <a href="/products" class="bottom-sheet-item ${window.location.pathname === '/products' ? 'active' : ''}">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    <span>Products</span>
                </a>
            </nav>
        `;

        document.body.appendChild(bottomSheet);

        // Add padding to body for bottom sheet
        document.body.style.paddingBottom = '80px';
    }

    /* ========================================
       8. TOUCH FEEDBACK & HAPTICS
       ======================================== */
    initTouchFeedback() {
        // Add haptic class to all buttons and interactive elements
        document.querySelectorAll('button, a, .interactive-card').forEach(el => {
            el.classList.add('haptic-light', 'press-effect', 'ripple-button');

            // Visual haptic feedback
            el.addEventListener('touchstart', () => {
                if (navigator.vibrate) {
                    navigator.vibrate(10); // Light vibration if supported
                }
            });
        });
    }

    /* ========================================
       9. PULL TO REFRESH
       ======================================== */
    initPullToRefresh() {
        const refreshIndicator = document.createElement('div');
        refreshIndicator.className = 'pull-to-refresh';
        refreshIndicator.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>';
        document.body.appendChild(refreshIndicator);

        let startY = 0;
        let isPulling = false;

        window.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0) {
                startY = e.touches[0].pageY;
                isPulling = true;
            }
        });

        window.addEventListener('touchmove', (e) => {
            if (!isPulling) return;

            const currentY = e.touches[0].pageY;
            const pullDistance = currentY - startY;

            if (pullDistance > 80) {
                refreshIndicator.classList.add('active');
            }
        });

        window.addEventListener('touchend', () => {
            if (refreshIndicator.classList.contains('active')) {
                // Simulate refresh (in production, reload data)
                setTimeout(() => {
                    refreshIndicator.classList.remove('active');
                    this.celebrate(document.body);
                }, 1000);
            }
            isPulling = false;
        });
    }

    /* ========================================
       10. CELEBRATION ANIMATION
       ======================================== */
    celebrate(element) {
        element.classList.add('celebrate');
        setTimeout(() => {
            element.classList.remove('celebrate');
        }, 600);
    }
}

// Auto-initialize on mobile
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        new MobilePremiumExperience();
    });
}

export default MobilePremiumExperience;
