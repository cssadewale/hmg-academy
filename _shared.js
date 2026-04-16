/* ============================================================
   HMG ACADEMY — SHARED JAVASCRIPT
   Handles: nav, scroll reveal, year, mobile menu, analytics
============================================================ */
(function () {
  'use strict';

  // ── Dynamic copyright year ──
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Hamburger / mobile nav ──
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }

  // ── Scroll reveal (staggered for grids) ──
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const parent = entry.target.parentElement;
      const siblings = parent ? Array.from(parent.children) : [];
      const idx = siblings.indexOf(entry.target);
      const isInGrid = parent && (
        parent.classList.contains('grid') ||
        parent.classList.contains('services-grid') ||
        parent.classList.contains('tools-grid') ||
        parent.classList.contains('stats-row') ||
        parent.classList.contains('cards-grid') ||
        parent.classList.contains('notes-grid')
      );
      const delay = isInGrid ? idx * 80 : 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el));

  // ── Navbar scroll shadow ──
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ── Active nav link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

})();
