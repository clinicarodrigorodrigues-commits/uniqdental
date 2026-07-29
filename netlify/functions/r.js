/* ============================================================
   Netlify Function · redirecionador de links de atribuicao
   ------------------------------------------------------------
   /ig, /google, /bio ... -> busca o slug no Supabase, conta o
   clique e manda pra LP ja com as UTMs. O visitante ve a URL
   curta e limpa; as UTMs ficam escondidas.

   O slug e lido do caminho original (rawUrl/path), porque o
   rewrite /* do Netlify nao repassa ?slug de forma confiavel.

   Env (Netlify > Site settings > Environment variables):
     SUPABASE_URL, SUPABASE_SERVICE_KEY (secreta), LP_BASE_URL
   ============================================================ */
const SB_URL = (process.env.SUPABASE_URL || "").replace(/\/$/, "");
const SB_KEY = process.env.SUPABASE_SERVICE_KEY || "";
const LP_BASE = (process.env.LP_BASE_URL || "https://lp.SEU-DOMINIO.com").replace(/\/$/, "");

function redirect(url) {
  return { statusCode: 302, headers: { Location: url, "Cache-Control": "no-store, max-age=0" }, body: "" };
}
function buildDest(link) {
  var d = link.destino || "/";
  var base = /^https?:\/\//i.test(d) ? d : LP_BASE + (d.charAt(0) === "/" ? "" : "/") + d;
  var keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var params = [];
  keys.forEach(function (k) { if (link[k]) params.push(k + "=" + encodeURIComponent(link[k])); });
  if (!params.length) return base;
  return base + (base.indexOf("?") === -1 ? "?" : "&") + params.join("&");
}
function resolveSlug(event) {
  var q = (event.queryStringParameters && event.queryStringParameters.slug) || "";
  var path = "";
  try { path = event.rawUrl ? new URL(event.rawUrl).pathname : ""; } catch (e) { path = ""; }
  if (!path) path = event.path || "";
  if (/\/\.netlify\/functions\//.test(path)) path = ""; // ignora o proprio caminho da function
  var fromPath = path.replace(/^\/+/, "").split("/")[0];
  var raw = String(q) || fromPath || "";
  // normaliza qualquer fonte: pega so o 1o segmento (trata /ig/ e ?slug=ig/)
  return raw.split("?")[0].split("/")[0].trim().toLowerCase();
}

exports.handler = async function (event) {
  if (!SB_URL || !SB_KEY) return redirect(LP_BASE + "/");
  var slug = resolveSlug(event);
  if (!slug) return redirect(LP_BASE + "/");

  try {
    var res = await fetch(
      SB_URL + "/rest/v1/links?slug=eq." + encodeURIComponent(slug) + "&ativo=eq.true&select=*&limit=1",
      { headers: { apikey: SB_KEY, Authorization: "Bearer " + SB_KEY } }
    );
    var rows = await res.json();
    if (!Array.isArray(rows) || !rows.length) return redirect(LP_BASE + "/"); // slug desconhecido

    var link = rows[0];
    var dest = buildDest(link);

    var h = event.headers || {};
    try {
      await fetch(SB_URL + "/rest/v1/link_clicks", {
        method: "POST",
        headers: { apikey: SB_KEY, Authorization: "Bearer " + SB_KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify({
          link_id: link.id, slug: link.slug,
          referrer: h.referer || h.referrer || null,
          user_agent: h["user-agent"] || null,
          country: h["x-country"] || h["x-nf-geo-country"] || null
        })
      });
    } catch (e) {}

    return redirect(dest);
  } catch (e) {
    return redirect(LP_BASE + "/");
  }
};
