/* config.js — UniQ Dental Studio · LP
   Só dado PUBLICO: a anon key é protegida por RLS (em touches: insert liberado, select fechado).
   Segredo (service key) NUNCA vem pra cá: vive nas env vars das Netlify Functions. */
window.LP_CONFIG = {
  SUPABASE_URL: "https://wgoactihzclgcfbjskzx.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_ppFK0xeSbiJckkWXCLJ0jQ_-kLbvLv_",
  // beacon do clique no WhatsApp -> registra o pre-lead no painel (IP/UA/fbp/fbc pro casamento e EMQ)
  NF_PRELEAD_URL: "https://painel.uniqdental.com.br/.netlify/functions/pre-lead"
};
