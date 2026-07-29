/* ============================================================
   NOME DO CLIENTE · LP  ·  track.js
   ------------------------------------------------------------
   Atribuicao MULTI-TOQUE (jornada). Da um ID anonimo pro
   visitante (localStorage + cookie 1st-party) e registra 1
   "toque" por sessao no Supabase (tabela touches). Quando o
   visitante vira lead, o main.js salva o mesmo visitor_id no
   lead, e o painel junta a jornada inteira (1o, 2o, 3o toque).
   Carrega ANTES do main.js / v2.js. Expoe window.LP_VISITOR_ID.
   ============================================================ */
(function () {
  "use strict";
  var CFG = window.LP_CONFIG || {};
  var VKEY = "lp_vid", CKEY = "_lpvid";

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0, v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  function readCookie(n) {
    try { var m = document.cookie.match("(^|; )" + n + "=([^;]+)"); return m ? decodeURIComponent(m[2]) : null; }
    catch (e) { return null; }
  }
  // cookie host-only (sem atributo domain): evita rejeicao em sufixos publicos
  // (.com.br, .netlify.app). A LP e single-host, entao host-only basta.
  function writeCookie(n, v, days) {
    try {
      var d = new Date(); d.setTime(d.getTime() + days * 864e5);
      document.cookie = n + "=" + encodeURIComponent(v) + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
    } catch (e) {}
  }

  function getVisitorId() {
    var id = null;
    try { id = localStorage.getItem(VKEY); } catch (e) {}
    if (!id) id = readCookie(CKEY);
    if (!id) id = uuid();
    try { localStorage.setItem(VKEY, id); } catch (e) {}
    writeCookie(CKEY, id, 730); // ~2 anos (o Safari pode encurtar; upgrade futuro = cookie no servidor)
    return id;
  }
  window.LP_VISITOR_ID = getVisitorId();

  /* classifica a origem do toque atual: UTM da URL, senao pelo referrer */
  function currentTouch() {
    var p = new URLSearchParams(location.search);
    var t = {
      utm_source: p.get("utm_source"), utm_medium: p.get("utm_medium"),
      utm_campaign: p.get("utm_campaign"), utm_content: p.get("utm_content"),
      utm_term: p.get("utm_term"), gclid: p.get("gclid"), fbclid: p.get("fbclid"),
      referrer: document.referrer || null
    };
    if (!t.utm_source) {
      var ref = document.referrer || "", host = "";
      try { host = ref ? new URL(ref).hostname.replace(/^www\./, "") : ""; } catch (e) {}
      if (!ref || host === location.hostname) { t.utm_source = "direto"; t.utm_medium = "none"; }
      else if (/(^|\.)google\.|bing\.|yahoo\.|duckduckgo\.|ecosia\./.test(host)) { t.utm_source = host.split(".")[0]; t.utm_medium = "organic"; }
      else if (/instagram\.com/.test(host)) { t.utm_source = "instagram"; t.utm_medium = "referral"; }
      else if (/facebook\.com|(^|\.)fb\./.test(host)) { t.utm_source = "facebook"; t.utm_medium = "referral"; }
      else if (/t\.co|twitter\.com|x\.com/.test(host)) { t.utm_source = "twitter"; t.utm_medium = "referral"; }
      else if (/linkedin\./.test(host)) { t.utm_source = "linkedin"; t.utm_medium = "referral"; }
      else if (/youtube\.|youtu\.be/.test(host)) { t.utm_source = "youtube"; t.utm_medium = "referral"; }
      else { t.utm_source = host || "outro"; t.utm_medium = "referral"; }
    }
    return t;
  }

  /* grava 1 toque por SESSAO (cada visita = um toque na jornada) */
  function logTouch() {
    try { if (sessionStorage.getItem("lp_touch_logged")) return; } catch (e) {}
    var SB_URL = (CFG.SUPABASE_URL || "").replace(/\/$/, ""), SB_KEY = CFG.SUPABASE_ANON_KEY || "";
    if (!SB_URL || !SB_KEY || /XXXX/.test(SB_URL)) return;
    var t = currentTouch();
    var payload = {
      visitor_id: window.LP_VISITOR_ID,
      utm_source: t.utm_source || null, utm_medium: t.utm_medium || null, utm_campaign: t.utm_campaign || null,
      utm_content: t.utm_content || null, utm_term: t.utm_term || null,
      gclid: t.gclid || null, fbclid: t.fbclid || null,
      referrer: t.referrer, landing_page: location.pathname
    };
    // marca a sessao ANTES de enviar (otimista): evita toque duplicado por
    // recarga/bfcache ou por falha de rede reenviando a cada navegacao.
    try { sessionStorage.setItem("lp_touch_logged", "1"); } catch (e) {}
    try {
      fetch(SB_URL + "/rest/v1/touches", {
        method: "POST", keepalive: true,
        headers: { "Content-Type": "application/json", "apikey": SB_KEY, "Authorization": "Bearer " + SB_KEY, "Prefer": "return=minimal" },
        body: JSON.stringify(payload)
      }).catch(function () {});
    } catch (e) {}
  }
  logTouch();
})();
