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
    'https://tintim.link/whatsapp/ac8b19fb-a3a2-4fa4-a842-9f2de468631f/ab84889b-b6b8-49d8-8a4e-1fe628396bc8';

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

    /* EMQ: BEACON do clique -> /pre-lead do painel. O Tintim NAO repassa o vid do link (medido
       29/07/2026: 0 de 371 webhooks), entao o casamento e por JANELA no porteiro. O beacon grava o
       clique em nf_pre_leads com o que so o navegador tem: _fbp/_fbc (cookies do Pixel) e, no
       servidor, IP + user agent (headers). Sem isso o evento CAPI do painel sai sem esses sinais.
       sendBeacon text/plain = requisicao simples (sem preflight); fallback: fetch keepalive no-cors. */
    function cookie(n) { try { var m = document.cookie.match("(^|; )" + n + "=([^;]+)"); return m ? decodeURIComponent(m[2]) : null; } catch (e) { return null; } }
    var beaconFoi = false;
    function beaconPreLead() {
      if (beaconFoi) return; beaconFoi = true;   // 1 por pageload; cliques repetidos = mesmo vid, o porteiro dedupa
      var URL_PL = (window.LP_CONFIG || {}).NF_PRELEAD_URL || "";
      if (!URL_PL) return;
      try {
        var p = JSON.stringify({
          vid: window.LP_VISITOR_ID || null,
          fbp: cookie("_fbp"), fbc: cookie("_fbc"),
          fbclid: dados.fbclid || null, gclid: dados.gclid || null,
          utm_source: dados.utm_source || null, utm_medium: dados.utm_medium || null,
          utm_campaign: dados.utm_campaign || null, utm_term: dados.utm_term || null, utm_content: dados.utm_content || null,
          referrer: document.referrer || null, pagina_captura: location.href
        });
        if (navigator.sendBeacon && navigator.sendBeacon(URL_PL, new Blob([p], { type: "text/plain" }))) return;
        fetch(URL_PL, { method: "POST", body: p, keepalive: true, mode: "no-cors" }).catch(function () {});
      } catch (e) { /* rastreio nunca bloqueia o clique */ }
    }

    // o #wa-redirect da v2 e clicado por JS: reenriquece na hora do clique (o vid pode ter chegado depois)
    document.addEventListener("click", function (ev) {
      var a = ev.target && ev.target.closest ? ev.target.closest("a[href]") : null;
      if (!a) return;
      enriquecer(a);
      if (/tintim\.link|wa\.me|api\.whatsapp\.com/i.test(a.getAttribute("href") || "")) beaconPreLead();
    }, true);
  })();

})();
