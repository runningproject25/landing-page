/* ==============================================
   main.js — BuildWithAI
   Navbar · Reveal · Portfolio Filter · Counter
=============================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ─── 1. NAVBAR SCROLL EFFECT ───────────────────
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveNavLink();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ─── 2. HAMBURGER MOBILE MENU ──────────────────
    const hamburger = document.getElementById('hamburger');
    const menu      = document.getElementById('menu');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        menu.classList.toggle('open');
        document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    // Tutup menu saat klik nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('open');
            menu?.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ─── 3. ACTIVE NAV LINK ON SCROLL ─────────────
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 100;
            if (window.scrollY >= top) current = sec.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${current}`
            );
        });
    }

    // ─── 4. SCROLL REVEAL ──────────────────────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                // Staggered delay berdasarkan posisi dalam parent
                const siblings = [...entry.target.parentElement.children]
                    .filter(el => el.classList.contains('reveal'));
                const i = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${i * 80}ms`;
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ─── 5. PORTFOLIO FILTER ───────────────────────
    const filterBtns  = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            portfolioCards.forEach(card => {
                const cat = card.dataset.category;
                const show = filter === 'all' || cat === filter;

                if (show) {
                    card.classList.remove('hidden');
                    // Re-trigger reveal
                    setTimeout(() => card.classList.add('visible'), 50);
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('visible');
                }
            });
        });
    });

    // ─── 6. COUNTER ANIMATION ──────────────────────
    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        if (isNaN(target)) return;

        // Simpan suffix (+ atau %)
        const suffix = el.textContent.replace(/[\d]/g, '').trim();
        const duration = 1600;
        const steps    = 60;
        const stepVal  = target / steps;
        let current    = 0;
        let step       = 0;

        const timer = setInterval(() => {
            step++;
            current = Math.round(stepVal * step);
            if (step >= steps) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current + suffix;
        }, duration / steps);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('.stat-num[data-target]').forEach(el => {
        counterObserver.observe(el);
    });

    // ─── 7. SMOOTH SCROLL untuk semua anchor #... ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = navbar.offsetHeight + 16;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
        });
    });

    // ─── 8. HERO VISUAL — card-chat typing effect ──
    const chatMsgs = document.querySelectorAll('.chat-msg');
    if (chatMsgs.length >= 2) {
        chatMsgs[1].style.opacity = '0';
        chatMsgs[1].style.transition = 'opacity .5s';
        setTimeout(() => {
            chatMsgs[1].style.opacity = '1';
        }, 1800);
    }

});