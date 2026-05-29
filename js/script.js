/* =========================================================
   UniQ Dental Studio — Landing Page
   Behavior: navbar, scroll reveal, FAQ, tracking, WhatsApp
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Navbar: transparent → solid on scroll (with hysteresis) ---------- */
  const navbar = document.querySelector('.navbar');
  const onScrollNav = () => {
    if (!navbar) return;
    const y = window.scrollY;
    if (y > 120) navbar.classList.add('scrolled');
    else if (y < 40) navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- Mobile menu toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Intersection Observer: reveal on scroll ---------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => el.classList.add('in'));
  }

  /* ---------- WhatsApp floating bubble: appear after 300ms ---------- */
  const wa = document.querySelector('.whatsapp-float');
  if (wa) {
    setTimeout(() => wa.classList.add('visible'), 300);
  }

  /* ---------- Social proof toast cycle ---------- */
  const toast = document.getElementById('social-toast');
  if (toast) {
    const messages = [
      { title: 'Avaliação gratuita inclui escaneamento 3D.', time: 'Em todas as primeiras consultas' },
      { title: 'Plano de tratamento entregue por escrito.', time: 'Você sabe exatamente o que será feito' },
      { title: 'Mais de 10 anos cuidando de sorrisos em Votuporanga.', time: 'Especialidade em implantodontia' },
      { title: 'Parcelamento em até 15x no cartão.', time: 'Condições apresentadas na avaliação' },
      { title: 'Atendemos Votuporanga e toda a região.', time: 'Cardoso, Pontes Gestal, Américo de Campos' },
      { title: 'Atendimento humanizado: você é ouvido antes do tratamento.', time: 'Sem pressão, sem surpresa' },
      { title: 'Resposta no WhatsApp em até 1 hora.', time: 'No horário comercial' },
    ];
    const titleEl = toast.querySelector('.toast-title');
    const timeEl = toast.querySelector('.toast-time');
    const closeBtn = toast.querySelector('.toast-close');

    let idx = Math.floor(Math.random() * messages.length);
    let dismissed = false;
    let hideTimer = null;

    const show = () => {
      if (dismissed) return;
      const m = messages[idx % messages.length];
      titleEl.textContent = m.title;
      timeEl.textContent = m.time;
      toast.classList.add('visible');
      idx++;
      hideTimer = setTimeout(hide, 6500);
    };
    const hide = () => {
      toast.classList.remove('visible');
      clearTimeout(hideTimer);
      if (!dismissed) setTimeout(show, 14000); // gap between toasts
    };

    closeBtn.addEventListener('click', () => {
      dismissed = true;
      toast.classList.remove('visible');
      clearTimeout(hideTimer);
    });

    // First appearance after user has had a moment to take in the page
    setTimeout(show, 8000);
  }

  /* ---------- CTA click tracking ---------- */
  document.querySelectorAll('[data-cta]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const ctaName = btn.dataset.cta;
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'click_whatsapp', {
          event_category: 'CTA',
          event_label: ctaName,
          cta_location: ctaName,
        });
      }
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', { content_name: ctaName });
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'cta_click', cta_location: ctaName });
    });
  });

  /* ---------- Scroll depth tracking ---------- */
  const thresholds = [25, 50, 75, 100];
  const fired = new Set();
  window.addEventListener(
    'scroll',
    () => {
      const max = document.body.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.round((window.scrollY / max) * 100);
      thresholds.forEach((t) => {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'scroll_depth', { percent: t });
          }
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: 'scroll_depth', percent: t });
        }
      });
    },
    { passive: true }
  );

  /* ---------- Smooth anchor scroll with navbar offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
