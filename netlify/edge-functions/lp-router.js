// Roteamento por HOST, mesmo padrao do relampago-router do painel.
//
// PROBLEMA QUE ESTE ARQUIVO RESOLVE: o link curto (r.js) resolve slug na RAIZ do dominio
// (lp.uniqdental.com.br/<slug>). Instalar isso com um catch-all /* cru no netlify.toml faria
// TODA URL inexistente do www cair no r.js e, como slug desconhecido redireciona pra home
// (r.js:53), o 404 legitimo do site que ja converte desapareceria (viraria soft-404 pro Google).
//
// Aqui o rewrite so acontece quando o host e o lp.: o www.uniqdental.com.br passa direto,
// com 404 normal, exatamente como antes deste arquivo existir.
export default async (request, context) => {
  const host = (request.headers.get("host") || "").toLowerCase();
  const url = new URL(request.url);
  const p = url.pathname;

  // fora do lp.: nao mexe em nada (www e apex seguem intactos)
  if (!host.startsWith("lp.")) return context.next();

  // deixa passar: raiz, assets com extensao, e as rotas internas da Netlify
  const ehAsset = /\.[a-z0-9]+$/i.test(p);
  if (p === "/" || ehAsset || p.startsWith("/.netlify")) return context.next();

  // /<slug> -> a function que resolve o link, conta o clique e redireciona com as UTMs.
  // O slug vai como QUERY PARAM, nao no path: o resolveSlug do r.js (linha 35) ZERA o path
  // quando ele contem "/.netlify/functions/", entao reescrever pra /.netlify/functions/r/<slug>
  // faz o slug se perder e todo link cair na home sem UTM. Medido em producao em 29/07/2026.
  const slug = p.replace(/^\/+/, "").split("/")[0];
  return context.rewrite("/.netlify/functions/r?slug=" + encodeURIComponent(slug));
};

export const config = { path: "/*" };
