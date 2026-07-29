/* =========================================================
   UniQ Dental Studio — Landing Page
   Behavior: navbar, scroll reveal, tracking, WhatsApp
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

  /* ---------- CTA click tracking (dataLayer → GTM centraliza tudo) ---------- */
  document.querySelectorAll('[data-cta]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const ctaName = btn.dataset.cta;
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

  /* ---------- NF · atribuicao: cola utm + click ids + vid no link do Tintim ----------
     POR QUE: o Tintim manda no webhook o que vier na query do link. O porteiro do painel usa
     esses campos pra casar o lead com o clique do anuncio. Sem isso a origem vira "direto".

     DECISOES DE SEGURANCA (o molde faz diferente e e mais arriscado):
     1. Parte do href QUE JA ESTA no HTML, nao de uma config. No v2.js do molde o link vem de
        CFG.TINTIM_LINK e, se a config faltar, o href vira "#" e MATA 100% da conversao.
        Aqui, se qualquer coisa falhar, o link original continua intacto.
     2. So ACRESCENTA parametros: nao troca dominio nem caminho. Os gatilhos do GTM sao
        "Click URL CONTAINS whatsapp" e "CONTAINS https://wa.me/", entao continuam valendo.
     3. Nao sobrescreve parametro que ja exista no href.
     4. Roda dentro de try/catch por link: erro em um nao afeta os outros.                     */
  (function nfAtribuicao() {
    var CHAVES = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];
    // 1o toque manda: guarda o que veio na URL e reusa nas proximas paginas da mesma sessao
    var dados = {};
    try {
      var q = new URLSearchParams(location.search), achou = false;
      CHAVES.forEach(function (k) { var v = q.get(k); if (v) { dados[k] = v; achou = true; } });
      if (achou) localStorage.setItem("nf_atrib", JSON.stringify(dados));
      else dados = JSON.parse(localStorage.getItem("nf_atrib") || "{}");
    } catch (e) { dados = {}; }

    function enriquecer(a) {
      try {
        var href = a.getAttribute("href") || "";
        if (!/tintim\.link|wa\.me|api\.whatsapp\.com/i.test(href)) return;   // so links de WhatsApp
        var u = new URL(href, location.origin);
        CHAVES.forEach(function (k) { if (dados[k] && !u.searchParams.has(k)) u.searchParams.set(k, dados[k]); });
        if (window.LP_VISITOR_ID && !u.searchParams.has("vid")) u.searchParams.set("vid", window.LP_VISITOR_ID);
        a.setAttribute("href", u.toString());
      } catch (e) { /* link intacto */ }
    }
    function aplicar() { document.querySelectorAll('a[href]').forEach(enriquecer); }
    aplicar();
    // o #wa-redirect da v2 e clicado por JS: reenriquece na hora do clique (o vid pode ter chegado depois)
    document.addEventListener("click", function (ev) {
      var a = ev.target && ev.target.closest ? ev.target.closest("a[href]") : null;
      if (a) enriquecer(a);
    }, true);
  })();

})();
