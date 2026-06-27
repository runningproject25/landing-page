/* ============================================
   main.js — BuildWithAI (GitHub Pages ready)
   Navbar · Hamburger · Reveal · FAQ Accordion
============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. NAVBAR SCROLL ──────────────────────────
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveLink();
    }, { passive: true });

    // ── 2. HAMBURGER MENU ─────────────────────────
    const hamburger = document.getElementById('hamburger');
    const menu      = document.getElementById('menu');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        menu.classList.toggle('open');
        document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('open');
            menu?.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ── 3. ACTIVE NAV LINK ─────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) {
                current = sec.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${current}`
            );
        });
    }

    // ── 4. SCROLL REVEAL ───────────────────────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            // Stagger: delay berdasarkan urutan dalam parent
            const siblings = [...entry.target.parentElement.children]
                .filter(el => el.classList.contains('reveal'));
            const idx = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${idx * 100}ms`;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ── 5. FAQ ACCORDION ───────────────────────────
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-q');

        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Tutup semua dulu
            faqItems.forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
            });

            // Buka yang diklik (kalau belum open)
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ── 6. SMOOTH SCROLL ───────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
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

});