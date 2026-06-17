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

  /* ---------- Lead modal: CTA abre formulário → envio vira lead + WhatsApp ---------- */
  const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/i6y7z6lvn03o9cwsw1e4x1iimqj8iw36';
  const WHATSAPP_URL =
    'https://tintim.link/whatsapp/ac8b19fb-a3a2-4fa4-a842-9f2de468631f/6a48a112-b0de-41d9-aee0-da2890797190';

  // captura UTMs + click IDs na chegada e guarda na sessão (sobrevive a scroll/reload)
  const TRACKING_KEYS = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid',
  ];
  (function captureTracking() {
    try {
      const p = new URLSearchParams(location.search);
      TRACKING_KEYS.forEach((k) => {
        const v = p.get(k);
        if (v) sessionStorage.setItem('uniq_' + k, v);
      });
    } catch (_) {}
  })();
  const getTracking = () => {
    const out = {};
    TRACKING_KEYS.forEach((k) => {
      let v = '';
      try { v = sessionStorage.getItem('uniq_' + k) || ''; } catch (_) {}
      out[k] = v;
    });
    return out;
  };

  const modal = document.getElementById('lead-modal');
  const leadForm = document.getElementById('lead-form');

  if (modal && leadForm) {
    let currentCta = '';
    let lastFocused = null;
    const errEl = document.getElementById('lead-error');

    const showErr = (msg) => {
      errEl.textContent = msg;
      errEl.hidden = false;
    };

    /* ---------- Máscara de telefone BR: (DD) XXXXX-XXXX ---------- */
    // Extrai só os dígitos do número, tratando o DDI (+55) sem bagunçar o DDD.
    const onlyDigitsBR = (value) => {
      let d = (value || '').replace(/\D/g, '');
      // Só remove "55" se for DDI (mais de 11 dígitos). Em 11 dígitos, "55" é DDD válido.
      if (d.length > 11 && d.startsWith('55')) d = d.slice(2);
      return d.slice(0, 11); // máximo: DDD (2) + celular (9)
    };
    const formatPhoneBR = (value) => {
      const d = onlyDigitsBR(value);
      if (d.length === 0) return '';
      if (d.length <= 2) return '(' + d;
      if (d.length <= 7) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
      return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
    };
    const telInput = document.getElementById('lead-telefone');
    if (telInput) {
      telInput.addEventListener('input', () => {
        telInput.value = formatPhoneBR(telInput.value);
      });
    }

    const openModal = (ctaName) => {
      currentCta = ctaName || 'desconhecido';
      lastFocused = document.activeElement;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      errEl.hidden = true;
      setTimeout(() => {
        const n = document.getElementById('lead-nome');
        if (n) n.focus();
      }, 60);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'form_open', cta_location: currentCta });
    };

    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    };

    // todo CTA de WhatsApp abre o formulário (sem JS, o link cai direto no WhatsApp)
    document.querySelectorAll('[data-cta]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(btn.dataset.cta);
      });
    });

    // fechar
    modal.querySelector('.lead-modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    // envio
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // honeypot anti-spam
      const hp = leadForm.querySelector('.lead-hp');
      if (hp && hp.value) return;

      const nome = leadForm.nome.value.trim();
      const telefone = leadForm.telefone.value.trim();
      const necChecked = leadForm.querySelector('input[name="necessidade"]:checked');
      const necessidade = necChecked ? necChecked.value : '';
      const digits = onlyDigitsBR(telefone); // limpo, DDD+celular (DDI tratado)

      if (nome.length < 2) {
        showErr('Por favor, digite seu nome.');
        document.getElementById('lead-nome').focus();
        return;
      }
      if (digits.length < 10) {
        showErr('Digite um telefone válido com DDD (ex: 17 99999-9999).');
        document.getElementById('lead-telefone').focus();
        return;
      }
      errEl.hidden = true;

      const payload = Object.assign(
        {
          nome: nome,
          telefone: digits,
          necessidade: necessidade || '(não informado)',
          origem_cta: currentCta,
          pagina: location.href,
          data: new Date().toISOString(),
        },
        getTracking()
      );

      // 1) envia o lead pro Make (não bloqueia o fluxo)
      if (MAKE_WEBHOOK_URL) {
        try {
          fetch(MAKE_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            keepalive: true,
          }).catch(() => {});
        } catch (_) {}
      }

      // 2) tracking — CONVERSÃO = lead gerado
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'generate_lead',
        cta_location: currentCta,
        necessidade: necessidade || '(não informado)',
      });

      // 3) abre o WhatsApp clicando no link fixo do Tintim (#wa-redirect)
      //    só aqui, no envio válido — o GTM dispara o Contact e o Tintim
      //    faz a atribuição (campanha/fbclid) neste clique
      const wa = document.getElementById('wa-redirect');
      if (wa) {
        wa.click();
      } else {
        window.open(WHATSAPP_URL, '_blank');
      }
      closeModal();
    });
  }

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
})();
