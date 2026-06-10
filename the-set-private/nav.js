/* ============================================================
   THE SET PRIVATE — nav.js
   ============================================================ */

(function () {

  /* ── Scroll shadow ──────────────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ── Active link ────────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .footer__nav a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Mobile menu ────────────────────────────────────────── */
  const hamburger = document.querySelector('.nav__hamburger');
  const overlay   = document.querySelector('.nav__overlay');
  const closeBtn  = document.querySelector('.nav__overlay-close');

  function openMenu() {
    overlay.style.display = 'flex';
    requestAnimationFrame(function () {
      overlay.classList.add('open');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    overlay.addEventListener('transitionend', function handler() {
      overlay.style.display = 'none';
      overlay.removeEventListener('transitionend', handler);
    });
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (closeBtn)  closeBtn.addEventListener('click', closeMenu);

  /* Close on overlay link click */
  if (overlay) {
    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ── Scroll fade-in (IntersectionObserver) ──────────────── */
  const fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window && fadeEls.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Contact form ───────────────────────────────────────── */
  const form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach(function (field) {
        const wrapper = field.closest('.form-field');
        if (!field.value.trim()) {
          field.classList.add('error');
          if (wrapper) wrapper.classList.add('has-error');
          valid = false;
        } else {
          field.classList.remove('error');
          if (wrapper) wrapper.classList.remove('has-error');
        }
      });

      if (valid) {
        form.style.display = 'none';
        const confirmation = document.getElementById('form-confirmation');
        if (confirmation) {
          confirmation.style.display = 'block';
        }
      }
    });

    form.querySelectorAll('[required]').forEach(function (field) {
      field.addEventListener('input', function () {
        if (field.value.trim()) {
          field.classList.remove('error');
          const wrapper = field.closest('.form-field');
          if (wrapper) wrapper.classList.remove('has-error');
        }
      });
    });
  }

}());
