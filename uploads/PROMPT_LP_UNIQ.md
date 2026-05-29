# SPEC + PROMPT DE CODIFICAÇÃO
## Landing Page — UniQ Dental Studio

> **Documento único.** Funciona como (1) especificação técnica para validação interna do Nathan e (2) prompt completo a ser colado em ferramenta de IA com capacidade de gerar código (Claude Code, Cursor, v0, Lovable, Bolt, Replit Agent). Auto-suficiente: não exige contexto externo.

---

## METADADOS

| Campo | Valor |
|---|---|
| **Projeto** | Landing Page UniQ Dental Studio |
| **Cliente** | Dr. Rodrigo — UniQ Dental Studio, Votuporanga (SP) |
| **Responsável** | Nathan Ferreira — Especialista em Tráfego Pago |
| **Data** | 21 de maio de 2026 |
| **Versão** | 1.0 |
| **Status** | Spec finalizada — pronto para execução |
| **Metodologia** | Spec-Driven Development NF |

---

## 1. OBJETIVO

Construir uma **landing page HTML single-page** para a UniQ Dental Studio que cumpra duas funções em paralelo:

1. **Funil de tráfego pago (Meta Ads):** converter tráfego frio em leads via WhatsApp. Foco principal em implante e reabilitação oral, mas com porta aberta para qualquer tipo de consulta (limpeza, clareamento, ortodontia, restauração).
2. **SEO local avançado:** ranquear no Google para buscas regionais ("dentista em Votuporanga", "implante dentário Votuporanga", "clínica odontológica Votuporanga"), com Knowledge Graph configurado para exibir logo, endereço, horário e avaliações na pesquisa.

A LP é o ativo digital central da clínica — destino de todas as campanhas pagas e referência institucional para SEO.

---

## 2. ESCOPO

### 2.1 — O que ENTRA

- 1 landing page HTML single-page, mobile-first, totalmente responsiva
- 12 blocos sequenciais conforme item 6
- Copy persuasiva (framework PASTOR adaptado a odonto)
- SEO On-Page completo (meta tags, schema.org JSON-LD, Open Graph, sitemap, robots.txt)
- Favicon multi-tamanho de alta qualidade (16/32/192/512)
- Botão CTA dourado em **TODAS as dobras** (mínimo 9 CTAs ao longo da página)
- Botão WhatsApp flutuante fixo (canto inferior direito)
- Setup de tracking: Google Tag Manager + GA4 + Meta Pixel
- Otimização de performance (Core Web Vitals no verde)
- Identidade visual UniQ aplicada (azul marinho + dourado + tipografia premium)

### 2.2 — O que NÃO ENTRA nesta entrega

- Hospedagem e domínio (decisão e contratação do cliente)
- Configuração do Google Business Profile (entrega separada)
- Campanhas Meta Ads (dependem da LP pronta)
- Automação Make.com de qualificação de leads
- Conteúdo de blog (fase 2 de SEO long-tail)
- Antes/depois real e vídeos de depoimento (lacuna conhecida — estratégia de autoridade sem prova social visual no item 6, Bloco 10)

---

## 3. REQUISITOS TÉCNICOS

### 3.1 — Stack

- **HTML5 semântico** (uso correto de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- **CSS3 vanilla** com variáveis CSS (custom properties) para tokens de design
- **JavaScript vanilla** — sem frameworks pesados (sem React, Vue, jQuery). Permitido usar Intersection Observer e libs leves de animação via CDN se justificável.
- **Mobile-first responsivo** — breakpoints: 480px, 768px, 1024px, 1280px
- **Sem build step obrigatório** — arquivo deve funcionar abrindo `index.html` diretamente
- **Estrutura de arquivos:**
  ```
  /uniq-lp/
    index.html
    /css/style.css
    /js/script.js
    /assets/
      dr-rodrigo-hero.png
      logo-uniq-circular-azul.png
      logo-uniq-dourado.png
      paciente-senior-confianca.png
      paciente-mulher-sorriso.png
      paciente-familia-felicidade.png
      /favicon/
        favicon.ico
        favicon-16.png
        favicon-32.png
        favicon-192.png
        favicon-512.png
        apple-touch-icon.png
        site.webmanifest
    sitemap.xml
    robots.txt
  ```

### 3.2 — Performance obrigatória

- **LCP** (Largest Contentful Paint) < 2.5s no mobile
- **CLS** (Cumulative Layout Shift) < 0.1
- **INP** (Interaction to Next Paint) < 200ms
- Imagens convertidas para **WebP** com fallback PNG
- **Lazy loading** em todas imagens abaixo da dobra (`loading="lazy"`)
- Dimensões `width` e `height` explícitas em todas imagens (evitar CLS)
- CSS crítico inline no `<head>` (above-the-fold)
- JS não-crítico com `defer` ou `async`
- Fontes Google com `display=swap`
- Sem render-blocking resources

### 3.3 — Restrições

- HTTPS obrigatório no go-live
- Sem cookies de terceiros desnecessários
- Conformidade LGPD: banner de cookies se houver tracking ativo
- Acessibilidade básica: contraste AA, alt text em todas imagens, navegação por teclado, ARIA labels em botões

---

## 4. IDENTIDADE VISUAL UNIQ

Identidade extraída da logo, da foto profissional do Dr. Rodrigo e das diretrizes da marca. Aplicar fielmente.

### 4.1 — Paleta de cores (CSS Custom Properties)

```css
:root {
  /* Cores primárias UniQ */
  --azul-marinho: #0A1F44;        /* Cor primária — backgrounds escuros, navbar, footer */
  --azul-profundo: #061530;       /* Variação mais escura — gradientes, overlays */
  --azul-medio: #1A3A6E;          /* Variação clara do azul — hover states */

  /* Acentos dourados */
  --dourado: #C9A961;             /* Acento premium — CTAs, linhas decorativas, destaques */
  --dourado-claro: #E5C880;       /* Hover de CTAs */
  --dourado-escuro: #A88B4A;      /* Sombras e bordas */

  /* Neutros */
  --branco: #FFFFFF;
  --creme: #F8F5EF;               /* Backgrounds suaves de seções alternadas */
  --cinza-bg: #FAFAFA;            /* Background neutro */
  --cinza-claro: #E2E8F0;         /* Bordas, separadores */
  --cinza-texto: #2D3748;         /* Corpo de texto principal */
  --cinza-secundario: #4A5568;    /* Subtítulos, info secundária */
  --cinza-suave: #A0AEC0;         /* Microcopy, captions */

  /* Sombras */
  --shadow-sm: 0 2px 8px rgba(10, 31, 68, 0.06);
  --shadow-md: 0 10px 30px rgba(10, 31, 68, 0.08);
  --shadow-lg: 0 20px 60px rgba(10, 31, 68, 0.12);
  --shadow-cta: 0 8px 24px rgba(201, 169, 97, 0.35);
}
```

### 4.2 — Tipografia (Google Fonts)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

| Elemento | Família | Peso | Desktop | Mobile |
|---|---|---|---|---|
| H1 (hero) | Playfair Display | 600 | 56px / line-height 1.1 | 36px |
| H2 (seção) | Playfair Display | 600 | 42px / line-height 1.2 | 28px |
| H3 (subtítulo) | Playfair Display | 500 | 28px / line-height 1.3 | 22px |
| H4 (card title) | Inter | 600 | 20px / line-height 1.4 | 18px |
| Body large | Inter | 400 | 18px / line-height 1.6 | 16px |
| Body | Inter | 400 | 16px / line-height 1.6 | 15px |
| Small | Inter | 400 | 14px | 13px |
| Botão CTA | Inter | 600 | 16px / letter-spacing 0.5px | 15px |

**Princípio tipográfico:** Playfair Display nos títulos passa autoridade premium e elegância (combina com a serif da logo UniQ). Inter no corpo garante legibilidade impecável em qualquer tamanho. Combinação clássica de mercado luxo aplicada à clínica odontológica premium.

### 4.3 — Princípios visuais

- **Espaço em branco generoso:** padding vertical entre seções: 96px desktop, 64px mobile.
- **Bordas arredondadas suaves:** `12px` em cards, `8px` em botões, `100px` em pills/badges.
- **Sombras delicadas:** usar tokens `--shadow-md` em cards de conteúdo.
- **Animações on-scroll:** fade-in + slide-up de 20px ao entrar no viewport. Use Intersection Observer nativo, sem libs externas.
- **Microinteração em CTAs:** hover com `transform: scale(1.02)` + sombra dourada intensificada + `transition: all 0.3s ease`.
- **Ícones de linha:** usar Lucide Icons via CDN ou SVG inline (`https://unpkg.com/lucide@latest`). Nunca ícones preenchidos chapados.
- **Gradientes sutis:** seções escuras usam gradiente `linear-gradient(135deg, var(--azul-profundo), var(--azul-marinho))`.

---

## 5. PERSONA E COPY GUIDELINES

### 5.1 — Persona primária: Sr. José — o adiador

- 40-65 anos, classe C+ a B-
- Perdeu dentes ou usa prótese móvel há anos
- Convive com dor cotidiana (prótese solta, não come carne, evita sorrir em foto)
- Adia por medo da cirurgia (geralmente baseado em relato de conhecido) e por achar caro
- Nível de consciência: 2-3 na escala Schwartz (consciente do problema e da solução, mas não da clínica)

### 5.2 — Persona secundária: paciente de serviço geral

- 25-55 anos, classe B-/C+
- Procura limpeza, clareamento, ortodontia, check-up
- Ticket menor, decisão mais rápida
- Nível de consciência: 2 (consciente do problema)

### 5.3 — Tom de voz

- **Direto, sem floreio.** Frases curtas. Linguagem do paciente, não de dentista.
- **Empático sem ser piegas.** Reconhecimento da dor, sem dramatização.
- **Confiante sem ser arrogante.** Autoridade técnica passada por dados, não por adjetivos.
- **Lema da marca (fio condutor):** *"Devolvemos mais que dentes. Devolvemos o prazer de sorrir, comer e falar sem incômodos."*

---

## 6. ESTRUTURA DA LANDING PAGE — BLOCO A BLOCO

### Convenção dos CTAs

**Texto visível** sempre em UPPERCASE, dourado sobre azul, ou azul sobre dourado dependendo do contexto. **Link sempre placeholder** `{{LINK_CTA_XXX}}` — o Nathan substitui pelos links rastreáveis de WhatsApp depois (a palavra-chave da plataforma de rastreamento nunca aparece no texto visível do botão).

| Bloco | Texto do botão | Placeholder do link |
|---|---|---|
| Hero | AGENDAR AVALIAÇÃO GRATUITA | `{{LINK_CTA_HERO}}` |
| Diferenciais | CONHECER A UNIQ | `{{LINK_CTA_DIFERENCIAIS}}` |
| Identificação | QUERO RESOLVER ISSO | `{{LINK_CTA_IDENTIFICACAO}}` |
| Consequência | ENTENDER MEU CASO | `{{LINK_CTA_CONSEQUENCIA}}` |
| Solução | FALAR COM A CLÍNICA | `{{LINK_CTA_SOLUCAO}}` |
| Serviços | AGENDAR CONSULTA | `{{LINK_CTA_SERVICOS}}` |
| Como Funciona | COMEÇAR AGORA | `{{LINK_CTA_COMO_FUNCIONA}}` |
| FAQ | TIRAR DÚVIDAS COM A CLÍNICA | `{{LINK_CTA_FAQ}}` |
| CTA Final | AGENDAR MINHA AVALIAÇÃO GRATUITA | `{{LINK_CTA_FINAL}}` |
| Botão Flutuante | (ícone WhatsApp + tooltip "Fale com a UniQ") | `{{LINK_CTA_FLUTUANTE}}` |

---

### Bloco 0 — NAVBAR (fixa no topo, sticky)

**Layout:** Logo à esquerda + menu central (desktop) + CTA dourado à direita.
**Comportamento:** Fica transparente ao topo da página, ganha background azul marinho com leve sombra ao rolar (`scroll > 80px`). Mobile: hamburger menu, logo centralizada, CTA visível sempre.

**Componentes:**
- **Logo:** `logo-uniq-circular-azul.png`, altura 56px desktop / 44px mobile, link para `#top`
- **Menu (âncoras):** Sobre | Serviços | Como Funciona | Dúvidas | Contato
- **CTA Navbar:** botão dourado, texto **"AGENDAR AVALIAÇÃO"**, link `{{LINK_CTA_NAVBAR}}`

---

### Bloco 1 — HERO (acima da dobra)

**Layout desktop:** Split 55/45 — texto à esquerda, foto do Dr. Rodrigo à direita.
**Layout mobile:** Texto centralizado, foto abaixo (ou ao topo, decisão visual).
**Background:** Gradiente sutil `linear-gradient(135deg, var(--azul-profundo) 0%, var(--azul-marinho) 100%)`.
**Texto:** Branco com headline em dourado para realce parcial.

**Conteúdo:**

```html
<!-- H1 -->
<h1>
  Implantes Dentários e
  <span class="dourado">Reabilitação Oral</span>
  em Votuporanga
</h1>

<!-- Subheadline -->
<p class="hero-subtitle">
  Devolvemos mais que dentes. Devolvemos o prazer de sorrir, comer e falar sem incômodos.
</p>

<!-- Descrição -->
<p class="hero-description">
  Na UniQ Dental Studio, cuidamos do seu sorriso com tecnologia de fluxo digital, tomografia 3D
  e mais de 10 anos de especialidade em implantodontia. Sua primeira avaliação é gratuita —
  e você sai dela com um plano de tratamento claro, sem surpresa.
</p>

<!-- CTA principal -->
<a href="{{LINK_CTA_HERO}}" class="btn-cta-primary" data-cta="hero">
  AGENDAR AVALIAÇÃO GRATUITA
  <svg><!-- ícone seta direita --></svg>
</a>

<!-- Selos de credibilidade -->
<ul class="hero-badges">
  <li>+10 anos de especialidade</li>
  <li>Tomografia 3D inclusa</li>
  <li>Fluxo digital completo</li>
  <li>Atendimento humanizado</li>
</ul>
```

**Imagem:** `dr-rodrigo-hero.png` — sem manipulação, manter o fundo azul marinho original que já combina com a paleta da seção.

---

### Bloco 2 — DIFERENCIAIS COM ÍCONES (4 cards)

**Layout:** 4 cards lado a lado (desktop) / 2x2 (tablet) / empilhados (mobile).
**Background:** Branco. Cards com `box-shadow: var(--shadow-md)` e `border-radius: 12px`.
**Cada card:** ícone dourado de linha (Lucide) no topo + título Inter 600 + descrição Inter 400.

**Cards:**

| Ícone Lucide | Título | Descrição |
|---|---|---|
| `scan-line` | Tomografia 3D | Diagnóstico preciso com imagem tridimensional. Você sabe exatamente o que precisa antes de qualquer procedimento. |
| `cpu` | Fluxo Digital Completo | Da avaliação à prótese: planejamento por software, modelagem digital, cirurgia guiada. Mais precisão, menos retrabalho. |
| `award` | +10 Anos de Especialidade | Equipe especializada em implantodontia e reabilitação protética. Centenas de casos resolvidos. |
| `gift` | Avaliação Gratuita | Você vem, faz a tomografia, recebe o plano de tratamento e as condições de pagamento. Sem custo, sem compromisso. |

**CTA do bloco** (centralizado abaixo dos cards):
```html
<a href="{{LINK_CTA_DIFERENCIAIS}}" class="btn-cta-secondary">CONHECER A UNIQ</a>
```

---

### Bloco 3 — IDENTIFICAÇÃO DA DOR

**Layout:** Texto centralizado, máx-width 800px. Lista de identificação com ícones de check dourados.
**Background:** `var(--creme)` (fundo creme suave).

**Conteúdo:**

```html
<h2>Você se reconhece em alguma dessas situações?</h2>

<p>
  A maioria das pessoas que chega à UniQ convive com isso há anos. Vai empurrando, adiando,
  se acostumando. Até o dia em que o desconforto vira impedimento — e o impedimento vira vergonha.
</p>

<ul class="lista-identificacao">
  <li>Sua prótese ou dentadura solta na hora de falar, comer ou rir</li>
  <li>Você cobre a boca quando sorri ou aparece em foto</li>
  <li>Evita carne, maçã, pão crocante e alimentos que sempre amou</li>
  <li>Perdeu um ou mais dentes e o espaço vazio te incomoda</li>
  <li>Já pensou em fazer implante, mas o medo da cirurgia te paralisa</li>
  <li>Conhece alguém que fez implante e deu errado — e ficou com receio</li>
</ul>

<p class="destaque-final">
  <strong>Se você marcou pelo menos uma — esta página foi feita pra você.</strong>
</p>

<a href="{{LINK_CTA_IDENTIFICACAO}}" class="btn-cta-primary">QUERO RESOLVER ISSO</a>
```

**Cada item da lista** com ícone Lucide `check-circle` em dourado no início.

---

### Bloco 4 — A CONSEQUÊNCIA DE ADIAR (urgência real)

**Layout:** Texto + ícone grande de linha (`alert-triangle` ou `clock` em dourado).
**Background:** `var(--azul-marinho)` (escuro). Texto branco. Headline em dourado.

**Conteúdo:**

```html
<h2 class="dourado">Cada mês adiado custa mais que dinheiro.</h2>

<p>
  Quando um dente é perdido, o osso onde ele estava começa a desaparecer. Silenciosamente,
  mês após mês. Quanto mais tempo passa, menos osso sobra — e menos osso significa
  tratamento mais complexo e mais caro.
</p>

<p>
  O paciente que poderia ter resolvido com um procedimento simples acaba precisando de
  enxerto ósseo e cirurgias adicionais. Adiar não é neutro. É a decisão mais cara que você
  pode tomar.
</p>

<a href="{{LINK_CTA_CONSEQUENCIA}}" class="btn-cta-dourado-sobre-azul">ENTENDER MEU CASO</a>
```

---

### Bloco 5 — A SOLUÇÃO (apresentação do tratamento)

**Layout desktop:** 2 colunas — texto à esquerda, imagem `paciente-senior-confianca.png` à direita (senhor grisalho sorridente — representa o resultado final do tratamento na persona Sr. José).
**Background:** branco.
**Conteúdo dividido em 2 sub-blocos:**

```html
<h2>A reabilitação que devolve o que você perdeu.</h2>
<p class="subtitle">Sem prótese móvel. Sem ajustes constantes. Sem desconforto.</p>

<div class="sub-bloco">
  <h3>Para quem perdeu 1 ou poucos dentes</h3>
  <p>
    O implante é uma raiz de titânio que se integra ao osso e recebe um dente novo por cima.
    Ele não cai, não solta, não precisa ser retirado. Funciona, parece e dura como um dente natural.
  </p>
</div>

<div class="sub-bloco">
  <h3>Para quem usa dentadura ou prótese móvel</h3>
  <p>
    A reabilitação com protocolo substitui a dentadura por uma prótese fixa, presa a implantes.
    Você nunca mais tira pra dormir, nunca mais tem medo de soltar no meio de uma conversa,
    nunca mais precisa de pasta adesiva. Volta a comer, falar e sorrir como antes.
  </p>
</div>

<a href="{{LINK_CTA_SOLUCAO}}" class="btn-cta-primary">FALAR COM A CLÍNICA</a>
```

---

### Bloco 6 — TODOS OS SERVIÇOS (clínica completa)

**Layout:** Grid 3x3 (desktop) / 2x4-5 (tablet) / 1 coluna (mobile). 9 cards.
**Background:** `var(--cinza-bg)`.
**Cada card:** ícone Lucide dourado + título Inter 600 + descrição de 2 linhas + microlink "Saber mais" (que abre WhatsApp).

**Cabeçalho da seção:**
```html
<h2>Atendimento odontológico completo em Votuporanga</h2>
<p class="subtitle">
  Da limpeza ao protocolo, a UniQ cuida da sua boca em todas as fases — com a mesma atenção,
  tecnologia e cuidado.
</p>
```

**Cards (ordem estratégica):**

| Ícone | Serviço | Descrição |
|---|---|---|
| `bone` | Implantes Dentários | Substituição de dentes perdidos com raízes de titânio. Estética e função de dente natural. |
| `smile` | Protocolo e Reabilitação Oral | Prótese fixa sobre implantes para quem usa dentadura. Volte a sorrir com segurança. |
| `sparkles` | Lentes de Contato Dental | Lâminas ultrafinas para um sorriso harmônico, branco e alinhado. |
| `layers` | Prótese Dentária | Próteses fixas ou removíveis personalizadas. Conforto e naturalidade. |
| `align-justify` | Ortodontia / Alinhadores | Alinhamento dentário com aparelhos modernos ou alinhadores transparentes. |
| `sun` | Clareamento Dental | Clareamento profissional seguro, com resultado visível em poucas sessões. |
| `droplet` | Limpeza e Prevenção | Profilaxia profissional para manter a saúde bucal em dia. |
| `target` | Tratamento de Canal | Endodontia precisa, com mínimo desconforto e máximo cuidado. |
| `tool` | Restaurações | Restauração estética em resina ou cerâmica, com aparência natural. |

**Cada card** com link próprio para WhatsApp (placeholder `{{LINK_CTA_SERVICO_XXX}}` — Nathan pode usar o mesmo do bloco ou diferenciar por serviço).

**CTA centralizado abaixo do grid:**
```html
<a href="{{LINK_CTA_SERVICOS}}" class="btn-cta-primary">AGENDAR CONSULTA</a>
```

---

### Bloco 7 — COMO FUNCIONA (jornada em 4 etapas)

**Layout:** Timeline horizontal desktop / vertical mobile.
**Background:** branco.
**Cada etapa:** número grande dourado (Playfair Display 64px) + título + descrição + ícone Lucide.
**Imagem ilustrativa:** `paciente-mulher-sorriso.png` ao lado da timeline (desktop) — mulher latina sorrindo em ambiente residencial, transmite naturalidade e bem-estar pós-tratamento.

**Conteúdo:**

```html
<h2>Do primeiro contato ao seu sorriso novo, em 4 etapas claras.</h2>

<ol class="timeline">
  <li>
    <span class="num">01</span>
    <h4>Avaliação gratuita com tomografia 3D</h4>
    <p>Você vem à clínica, faz o exame clínico e a tomografia. Sai com diagnóstico completo do que precisa ser feito.</p>
  </li>
  <li>
    <span class="num">02</span>
    <h4>Plano de tratamento personalizado</h4>
    <p>Apresentamos exatamente quais procedimentos serão feitos, quanto tempo leva e as condições de pagamento. Sem surpresa, sem letra miúda.</p>
  </li>
  <li>
    <span class="num">03</span>
    <h4>Tratamento com tecnologia e segurança</h4>
    <p>Procedimento conduzido com anestesia local, fluxo digital e tecnologia de ponta. Conforto e previsibilidade do começo ao fim.</p>
  </li>
  <li>
    <span class="num">04</span>
    <h4>Acompanhamento pós-tratamento</h4>
    <p>Continuamos acompanhando você no pós-tratamento. Seu sorriso novo é responsabilidade nossa por anos a fio.</p>
  </li>
</ol>

<a href="{{LINK_CTA_COMO_FUNCIONA}}" class="btn-cta-primary">COMEÇAR AGORA</a>
```

---

### Bloco 8 — DÚVIDAS FREQUENTES (FAQ accordion)

**Layout:** Accordion com clique para abrir/fechar. Pergunta em Inter 600 azul marinho + ícone `+` que vira `×` quando aberto. Resposta em Inter 400.
**Background:** `var(--creme)`.
**Importante para SEO:** marcar com schema FAQPage (item 7.4).

**Cabeçalho:**
```html
<h2>As dúvidas que todo paciente tem antes de começar.</h2>
```

**Perguntas:**

```html
<details class="faq-item">
  <summary>Dói muito?</summary>
  <p>O procedimento é feito com anestesia local. Durante a cirurgia, você não sente dor. No pós-operatório, o desconforto é leve, controlado com medicação comum, e dura poucos dias.</p>
</details>

<details class="faq-item">
  <summary>Vou ficar sem dente durante o tratamento?</summary>
  <p>Em muitos casos, é possível sair da clínica com prótese provisória no mesmo dia. Cada caso é avaliado individualmente — você vai saber exatamente como será o seu na avaliação.</p>
</details>

<details class="faq-item">
  <summary>E se o implante rejeitar?</summary>
  <p>Implantes modernos têm alta taxa de sucesso quando feitos com planejamento adequado. Com tomografia 3D e fluxo digital, conseguimos prever possíveis complicações antes da cirurgia.</p>
</details>

<details class="faq-item">
  <summary>Posso fazer mesmo com diabetes, pressão alta ou idade avançada?</summary>
  <p>Na maioria dos casos, sim. Doenças controladas geralmente não impedem o implante. A avaliação inicial vai dizer com clareza se você pode fazer e quais cuidados serão necessários.</p>
</details>

<details class="faq-item">
  <summary>Quanto custa? Tem parcelamento?</summary>
  <p>O valor depende do número de implantes e do tipo de prótese. Trabalhamos com parcelamento em até 15x no cartão e até 30x no boleto. Na avaliação, você recebe o orçamento exato e as condições.</p>
</details>

<details class="faq-item">
  <summary>Quanto tempo leva pra ficar pronto?</summary>
  <p>A cirurgia é feita em poucas sessões. A prótese definitiva é instalada após o período de cicatrização do implante no osso. Durante todo esse tempo, você fica com a prótese provisória.</p>
</details>

<a href="{{LINK_CTA_FAQ}}" class="btn-cta-primary">TIRAR DÚVIDAS COM A CLÍNICA</a>
```

---

### Bloco 9 — SOBRE A UNIQ (institucional + Dr. Rodrigo)

**Layout desktop:** 2 colunas — texto da clínica à esquerda, card vertical com foto do Dr. Rodrigo à direita.
**Background:** branco.
**Foto Dr. Rodrigo:** `dr-rodrigo-hero.png` em tamanho médio (max 400px), border-radius 12px, sombra suave.

**Conteúdo:**

```html
<h2>Conheça a UniQ Dental Studio</h2>

<p>
  A UniQ Dental Studio nasceu com um propósito claro: ajudar pessoas a recuperarem o sorriso
  e o bem-estar. Mais que dentes — devolvemos o prazer de comer, de conversar, de aparecer
  em uma foto sem hesitar.
</p>

<p>
  Localizada em Votuporanga, com mais de 10 anos de especialidade em implantodontia e
  reabilitação protética, a UniQ une tecnologia de ponta (fluxo digital, tomografia 3D,
  implantes premium) a um atendimento humanizado, onde cada paciente é ouvido antes de
  qualquer tratamento.
</p>

<p>
  Atendemos pacientes de Votuporanga e de toda a região, inclusive Cardoso, Pontes Gestal,
  Américo de Campos e cidades limítrofes.
</p>

<div class="card-dr-rodrigo">
  <img src="/assets/dr-rodrigo-hero.png" alt="Dr. Rodrigo - Especialista em Implantodontia" />
  <h4>Dr. Rodrigo</h4>
  <p class="cargo">Responsável Técnico | CRO-SP {{NUMERO_CRO}}</p>
  <p class="bio">Especialista em Implantodontia e Reabilitação Oral, com mais de 10 anos dedicados a transformar sorrisos.</p>
</div>
```

---

### Bloco 10 — PROVA SOCIAL (estratégia sem antes/depois)

**Lacuna conhecida:** A UniQ ainda não tem antes/depois, vídeos de depoimento ou prints de Google reviews estruturados. Esta seção usa 4 elementos de autoridade institucional para passar credibilidade SEM material visual ainda.

**Layout:** 3 cards de números + 1 card de garantia + selo de CRO + (futuro) Google Reviews widget.
**Background:** `var(--azul-marinho)`. Texto branco. Números em dourado gigante.

**Conteúdo:**

```html
<h2 class="branco">Por que a UniQ é a clínica certa pra você.</h2>

<!-- Cards de números (3 cards) -->
<div class="numeros-grid">
  <div class="num-card">
    <span class="num-grande dourado">+10</span>
    <p>anos de especialidade em implantodontia</p>
  </div>
  <div class="num-card">
    <span class="num-grande dourado">+ centenas</span>
    <p>de sorrisos reabilitados em Votuporanga e região</p>
  </div>
  <div class="num-card">
    <span class="num-grande dourado">100%</span>
    <p>dos casos com plano de tratamento por escrito antes de começar</p>
  </div>
</div>

<!-- Card de garantia -->
<div class="card-garantia">
  <h3>O que você leva da avaliação:</h3>
  <ul>
    <li>Diagnóstico completo do seu caso</li>
    <li>Plano de tratamento personalizado por escrito</li>
    <li>Tempo estimado de tratamento</li>
    <li>Orçamento exato com condições de pagamento</li>
    <li>Decisão de seguir ou não com a UniQ, sem custo e sem pressão</li>
  </ul>
</div>

<!-- Selo CRO -->
<div class="selo-cro">
  Dr. Rodrigo — Responsável Técnico — CRO-SP {{NUMERO_CRO}}
  <small>Compliance com o Conselho Federal de Odontologia</small>
</div>

<!-- Placeholder para Google Reviews (ativar quando GBP estiver coletando) -->
<!-- <div class="google-reviews-widget">...</div> -->
```

---

### Bloco 11 — CTA FINAL + CONTATO + MAPA

**Layout:** 2 sub-blocos empilhados.
**Sub-bloco 1:** CTA emocional centralizado, com imagem `paciente-familia-felicidade.png` de fundo (com overlay azul-marinho 60% para legibilidade) — mãe e filho rindo abraçados, ancorando emocionalmente a oferta no benefício real (voltar a sorrir com as pessoas que ama).
**Sub-bloco 2:** 2 colunas — info de contato à esquerda, Google Maps embedado à direita.

**Conteúdo:**

```html
<!-- Sub-bloco 1: CTA Final -->
<!-- IMPORTANTE: aplicar background-image: url('/assets/paciente-familia-felicidade.png') com overlay linear-gradient(rgba(10,31,68,0.7), rgba(10,31,68,0.8)) para legibilidade. Texto branco. -->
<section class="cta-final">
  <h2>Sua avaliação na UniQ é gratuita.</h2>
  <p class="subtitle">E pode ser o início da mudança que você adia há anos.</p>

  <p>
    Agende sua avaliação sem compromisso. Você vai sair da consulta sabendo:
  </p>
  <ul class="lista-oferta">
    <li>Exatamente quais procedimentos você precisa</li>
    <li>Quanto tempo dura todo o tratamento</li>
    <li>Quanto custa e como pode parcelar (até 15x no cartão e 30x no boleto)</li>
    <li>Se a UniQ é o lugar certo pra você cuidar do seu sorriso</li>
  </ul>

  <a href="{{LINK_CTA_FINAL}}" class="btn-cta-primary btn-grande">
    AGENDAR MINHA AVALIAÇÃO GRATUITA
  </a>
  <small>Atendimento de segunda a sexta. Resposta em até 1 hora no horário comercial.</small>
</section>

<!-- Sub-bloco 2: Contato + Mapa -->
<section class="contato">
  <div class="info-contato">
    <h3>UniQ Dental Studio</h3>
    <p><strong>Endereço:</strong> {{ENDERECO_COMPLETO}}</p>
    <p>Votuporanga, SP — CEP {{CEP}}</p>
    <p><strong>WhatsApp:</strong> <a href="{{LINK_CTA_CONTATO}}">{{TELEFONE_FORMATADO}}</a></p>
    <p><strong>Horário:</strong> Segunda a sexta, das {{HORA_INICIO}} às {{HORA_FIM}}h</p>
  </div>

  <div class="mapa">
    <iframe
      src="https://www.google.com/maps/embed?pb={{GOOGLE_MAPS_EMBED}}"
      width="100%"
      height="400"
      style="border:0; border-radius: 12px;"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      title="Localização UniQ Dental Studio">
    </iframe>
  </div>
</section>
```

---

### Bloco 12 — FOOTER

**Layout:** 3 colunas (desktop) / empilhado (mobile). Background `var(--azul-profundo)`. Texto branco e dourado.

```html
<footer>
  <div class="footer-grid">
    <!-- Coluna 1: Marca -->
    <div class="footer-col">
      <img src="/assets/logo-uniq-dourado.png" alt="UniQ Dental Studio" width="120" />
      <p class="lema">Devolvemos mais que dentes. Devolvemos o prazer de sorrir.</p>
      <p><small>CNPJ: {{CNPJ}}</small></p>
      <p><small>Responsável Técnico: Dr. Rodrigo — CRO-SP {{NUMERO_CRO}}</small></p>
    </div>

    <!-- Coluna 2: Contato -->
    <div class="footer-col">
      <h5>Contato</h5>
      <p>{{ENDERECO_RESUMIDO}}</p>
      <p>{{TELEFONE_FORMATADO}}</p>
      <p>{{HORARIO_RESUMIDO}}</p>
      <p>{{EMAIL_CLINICA}}</p>
    </div>

    <!-- Coluna 3: Redes sociais -->
    <div class="footer-col">
      <h5>Siga a UniQ</h5>
      <a href="{{LINK_INSTAGRAM}}" aria-label="Instagram">
        <svg><!-- ícone Instagram --></svg>
      </a>
      <a href="{{LINK_FACEBOOK}}" aria-label="Facebook">
        <svg><!-- ícone Facebook --></svg>
      </a>
      <a href="{{LINK_GOOGLE_BUSINESS}}" aria-label="Google Business">
        <svg><!-- ícone Google --></svg>
      </a>
    </div>
  </div>

  <div class="footer-bottom">
    <p>&copy; 2026 UniQ Dental Studio. Todos os direitos reservados.</p>
  </div>
</footer>
```

---

### BOTÃO FLUTUANTE DE WHATSAPP

**Comportamento:** Fixo no canto inferior direito da viewport, visível em todas as seções da página. Aparece após 300ms de carregamento com animação de bounce sutil. No hover: aumenta levemente (`scale 1.08`) e mostra tooltip "Fale com a UniQ".

**HTML:**

```html
<a href="{{LINK_CTA_FLUTUANTE}}"
   class="whatsapp-float"
   aria-label="Falar com a UniQ no WhatsApp"
   data-cta="flutuante">
  <svg viewBox="0 0 24 24" fill="currentColor">
    <!-- Ícone oficial WhatsApp -->
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
  <span class="tooltip">Fale com a UniQ</span>
</a>
```

**CSS:**

```css
.whatsapp-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 64px;
  height: 64px;
  background: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
  z-index: 9999;
  transition: all 0.3s ease;
  animation: pulse 2s infinite;
}
.whatsapp-float svg {
  width: 32px;
  height: 32px;
  color: white;
}
.whatsapp-float:hover {
  transform: scale(1.08);
  box-shadow: 0 12px 32px rgba(37, 211, 102, 0.5);
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4); }
  50% { box-shadow: 0 8px 24px rgba(37, 211, 102, 0.6), 0 0 0 12px rgba(37, 211, 102, 0.1); }
}
.tooltip {
  position: absolute;
  right: 76px;
  background: var(--azul-marinho);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(8px);
  transition: all 0.3s ease;
  pointer-events: none;
}
.whatsapp-float:hover .tooltip {
  opacity: 1;
  transform: translateX(0);
}
```

---

## 7. SEO LOCAL E TÉCNICO (configuração completa)

### 7.1 — Meta Tags (no `<head>`)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <!-- SEO básico -->
  <title>UniQ Dental Studio — Implantes Dentários em Votuporanga | Dr. Rodrigo</title>
  <meta name="description" content="Clínica odontológica em Votuporanga especializada em implantes, reabilitação oral, lentes de contato e estética dental. Avaliação gratuita com tomografia 3D.">
  <meta name="keywords" content="dentista votuporanga, implante dentário votuporanga, clínica odontológica votuporanga, lentes de contato dental, prótese dentária, reabilitação oral">
  <meta name="author" content="UniQ Dental Studio">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="https://www.uniqdentalstudio.com.br/">

  <!-- Geo tags (SEO local) -->
  <meta name="geo.region" content="BR-SP">
  <meta name="geo.placename" content="Votuporanga">
  <meta name="geo.position" content="{{LATITUDE}};{{LONGITUDE}}">
  <meta name="ICBM" content="{{LATITUDE}}, {{LONGITUDE}}">

  <!-- Open Graph (Facebook, WhatsApp, LinkedIn) -->
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:url" content="https://www.uniqdentalstudio.com.br/">
  <meta property="og:title" content="UniQ Dental Studio — Implantes Dentários em Votuporanga">
  <meta property="og:description" content="Clínica especializada em implantes e reabilitação oral em Votuporanga. Avaliação gratuita com tomografia 3D.">
  <meta property="og:image" content="https://www.uniqdentalstudio.com.br/assets/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="UniQ Dental Studio">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="UniQ Dental Studio — Implantes em Votuporanga">
  <meta name="twitter:description" content="Clínica especializada em implantes e reabilitação oral em Votuporanga. Avaliação gratuita.">
  <meta name="twitter:image" content="https://www.uniqdentalstudio.com.br/assets/og-image.png">

  <!-- Theme color (mobile browser bar) -->
  <meta name="theme-color" content="#0A1F44">
</head>
```

### 7.2 — Favicon completo (todos os tamanhos)

```html
<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/assets/favicon/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon/favicon-192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/assets/favicon/favicon-512.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png">
<link rel="manifest" href="/assets/favicon/site.webmanifest">
<meta name="msapplication-TileColor" content="#0A1F44">
<meta name="msapplication-config" content="/assets/favicon/browserconfig.xml">
```

**Instrução para gerar o favicon:** Pegue `logo-uniq-circular-azul.png` e gere todas as variações em `https://realfavicongenerator.net/` (gera o pacote completo: .ico, todos os PNGs, webmanifest, browserconfig).

**`site.webmanifest`:**
```json
{
  "name": "UniQ Dental Studio",
  "short_name": "UniQ",
  "icons": [
    { "src": "/assets/favicon/favicon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/assets/favicon/favicon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#0A1F44",
  "background_color": "#FFFFFF",
  "display": "standalone"
}
```

### 7.3 — Schema.org JSON-LD (Knowledge Graph + Rich Snippets)

**Inserir os 3 schemas dentro do `<head>` ou no final do `<body>`:**

```html
<!-- Schema 1: Organization (faz a logo aparecer no Google) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.uniqdentalstudio.com.br/#organization",
  "name": "UniQ Dental Studio",
  "alternateName": "UniQ Odontologia",
  "url": "https://www.uniqdentalstudio.com.br/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.uniqdentalstudio.com.br/assets/logo-uniq-circular-azul.png",
    "width": 512,
    "height": 512
  },
  "image": "https://www.uniqdentalstudio.com.br/assets/og-image.png",
  "description": "Clínica odontológica em Votuporanga especializada em implantes dentários e reabilitação oral.",
  "telephone": "+55-{{TELEFONE_INTERNACIONAL}}",
  "email": "{{EMAIL_CLINICA}}",
  "sameAs": [
    "{{LINK_INSTAGRAM}}",
    "{{LINK_FACEBOOK}}",
    "{{LINK_GOOGLE_BUSINESS}}"
  ]
}
</script>

<!-- Schema 2: Dentist + LocalBusiness (SEO local) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["Dentist", "LocalBusiness", "MedicalBusiness"],
  "@id": "https://www.uniqdentalstudio.com.br/#dentist",
  "name": "UniQ Dental Studio",
  "image": "https://www.uniqdentalstudio.com.br/assets/og-image.png",
  "logo": "https://www.uniqdentalstudio.com.br/assets/logo-uniq-circular-azul.png",
  "url": "https://www.uniqdentalstudio.com.br/",
  "telephone": "+55-{{TELEFONE_INTERNACIONAL}}",
  "priceRange": "$$-$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{ENDERECO_RUA}}",
    "addressLocality": "Votuporanga",
    "addressRegion": "SP",
    "postalCode": "{{CEP}}",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "{{LATITUDE}}",
    "longitude": "{{LONGITUDE}}"
  },
  "areaServed": [
    { "@type": "City", "name": "Votuporanga" },
    { "@type": "City", "name": "Cardoso" },
    { "@type": "City", "name": "Pontes Gestal" },
    { "@type": "City", "name": "Américo de Campos" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "{{HORA_INICIO}}:00",
      "closes": "{{HORA_FIM}}:00"
    }
  ],
  "medicalSpecialty": ["Implantodontia", "Reabilitação Oral", "Odontologia Estética", "Ortodontia"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços Odontológicos",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Implante Dentário" } },
      { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Protocolo / Reabilitação Oral" } },
      { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Lentes de Contato Dental" } },
      { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Prótese Dentária" } },
      { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Ortodontia" } },
      { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Clareamento Dental" } },
      { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Limpeza e Prevenção" } },
      { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Tratamento de Canal" } },
      { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Restauração Dentária" } }
    ]
  }
}
</script>

<!-- Schema 3: FAQPage (rich snippet das perguntas) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Dói muito o procedimento de implante?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O procedimento é feito com anestesia local. Durante a cirurgia, você não sente dor. No pós-operatório, o desconforto é leve, controlado com medicação comum, e dura poucos dias."
      }
    },
    {
      "@type": "Question",
      "name": "Vou ficar sem dente durante o tratamento de implante?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em muitos casos, é possível sair da clínica com prótese provisória no mesmo dia. Cada caso é avaliado individualmente."
      }
    },
    {
      "@type": "Question",
      "name": "E se o implante rejeitar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Implantes modernos têm alta taxa de sucesso quando feitos com planejamento adequado. Com tomografia 3D e fluxo digital, conseguimos prever possíveis complicações antes da cirurgia."
      }
    },
    {
      "@type": "Question",
      "name": "Posso fazer implante com diabetes, pressão alta ou idade avançada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Na maioria dos casos, sim. Doenças controladas geralmente não impedem o implante. A avaliação inicial vai dizer com clareza se você pode fazer e quais cuidados serão necessários."
      }
    },
    {
      "@type": "Question",
      "name": "Quanto custa um implante dentário? Tem parcelamento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O valor depende do número de implantes e do tipo de prótese. Parcelamento em até 15x no cartão e até 30x no boleto."
      }
    },
    {
      "@type": "Question",
      "name": "Quanto tempo leva o tratamento de implante completo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A cirurgia é feita em poucas sessões. A prótese definitiva é instalada após o período de cicatrização do implante no osso. Durante todo esse tempo, você fica com a prótese provisória."
      }
    }
  ]
}
</script>
```

### 7.4 — Sitemap.xml (raiz do site)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.uniqdentalstudio.com.br/</loc>
    <lastmod>2026-05-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 7.5 — Robots.txt (raiz do site)

```
User-agent: *
Allow: /

Sitemap: https://www.uniqdentalstudio.com.br/sitemap.xml
```

### 7.6 — Alt text obrigatório em imagens

Toda imagem precisa de alt descritivo, com keyword quando relevante:

| Imagem | Alt text |
|---|---|
| `dr-rodrigo-hero.png` | Dr. Rodrigo, especialista em implantodontia em Votuporanga, UniQ Dental Studio |
| `logo-uniq-circular-azul.png` | UniQ Dental Studio — clínica odontológica em Votuporanga |
| `paciente-senior-confianca.png` | Paciente sênior sorrindo com confiança após reabilitação oral em Votuporanga |
| `paciente-mulher-sorriso.png` | Mulher sorrindo naturalmente após tratamento odontológico na UniQ |
| `paciente-familia-felicidade.png` | Mãe e filho sorrindo juntos — bem-estar familiar pós-tratamento odontológico |

---

## 8. RASTREAMENTO E INTEGRAÇÕES

### 8.1 — Google Tag Manager (no `<head>`)

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','{{GTM_ID}}');</script>
<!-- End Google Tag Manager -->
```

**Logo após o `<body>`:**

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{GTM_ID}}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

### 8.2 — Meta Pixel (via GTM ou direto)

```html
<!-- Meta Pixel -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '{{META_PIXEL_ID}}');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id={{META_PIXEL_ID}}&ev=PageView&noscript=1"/></noscript>
```

### 8.3 — Eventos a rastrear (via JS)

Adicionar listeners em todos os CTAs:

```javascript
// script.js

// Tracking de cliques em CTA
document.querySelectorAll('[data-cta]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const ctaName = btn.dataset.cta;

    // GA4
    if (typeof gtag === 'function') {
      gtag('event', 'click_whatsapp', {
        event_category: 'CTA',
        event_label: ctaName,
        cta_location: ctaName
      });
    }

    // Meta Pixel (Lead event)
    if (typeof fbq === 'function') {
      fbq('track', 'Lead', { content_name: ctaName });
    }

    // dataLayer (GTM)
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      event: 'cta_click',
      cta_location: ctaName
    });
  });
});

// Scroll depth tracking
const scrollThresholds = [25, 50, 75, 100];
const scrolledTo = new Set();
window.addEventListener('scroll', () => {
  const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
  scrollThresholds.forEach(threshold => {
    if (scrollPercent >= threshold && !scrolledTo.has(threshold)) {
      scrolledTo.add(threshold);
      if (typeof gtag === 'function') {
        gtag('event', 'scroll_depth', { percent: threshold });
      }
    }
  });
});

// FAQ tracking
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open && typeof gtag === 'function') {
      gtag('event', 'view_faq', {
        question: item.querySelector('summary').textContent
      });
    }
  });
});
```

### 8.4 — Atributos `data-cta` obrigatórios

Cada botão CTA precisa ter `data-cta` para rastreamento granular:

```html
<a href="{{LINK_CTA_HERO}}" data-cta="hero" class="btn-cta-primary">AGENDAR AVALIAÇÃO GRATUITA</a>
<a href="{{LINK_CTA_DIFERENCIAIS}}" data-cta="diferenciais">CONHECER A UNIQ</a>
<a href="{{LINK_CTA_IDENTIFICACAO}}" data-cta="identificacao">QUERO RESOLVER ISSO</a>
<a href="{{LINK_CTA_CONSEQUENCIA}}" data-cta="consequencia">ENTENDER MEU CASO</a>
<a href="{{LINK_CTA_SOLUCAO}}" data-cta="solucao">FALAR COM A CLÍNICA</a>
<a href="{{LINK_CTA_SERVICOS}}" data-cta="servicos">AGENDAR CONSULTA</a>
<a href="{{LINK_CTA_COMO_FUNCIONA}}" data-cta="como-funciona">COMEÇAR AGORA</a>
<a href="{{LINK_CTA_FAQ}}" data-cta="faq">TIRAR DÚVIDAS COM A CLÍNICA</a>
<a href="{{LINK_CTA_FINAL}}" data-cta="final">AGENDAR MINHA AVALIAÇÃO GRATUITA</a>
<a href="{{LINK_CTA_FLUTUANTE}}" data-cta="flutuante">[botão flutuante WhatsApp]</a>
<a href="{{LINK_CTA_NAVBAR}}" data-cta="navbar">AGENDAR AVALIAÇÃO</a>
```

---

## 9. PLACEHOLDERS A SUBSTITUIR ANTES DO GO-LIVE

Todos os placeholders no formato `{{NOME}}` devem ser substituídos pelos valores reais. Lista completa:

| Placeholder | Descrição | Origem |
|---|---|---|
| `{{LINK_CTA_HERO}}` | Link rastreável do CTA do Hero | Nathan (plataforma de tracking) |
| `{{LINK_CTA_DIFERENCIAIS}}` | Link rastreável do CTA dos Diferenciais | Nathan |
| `{{LINK_CTA_IDENTIFICACAO}}` | Link rastreável do CTA da Identificação | Nathan |
| `{{LINK_CTA_CONSEQUENCIA}}` | Link rastreável do CTA da Consequência | Nathan |
| `{{LINK_CTA_SOLUCAO}}` | Link rastreável do CTA da Solução | Nathan |
| `{{LINK_CTA_SERVICOS}}` | Link rastreável do CTA dos Serviços | Nathan |
| `{{LINK_CTA_COMO_FUNCIONA}}` | Link rastreável do CTA de Como Funciona | Nathan |
| `{{LINK_CTA_FAQ}}` | Link rastreável do CTA do FAQ | Nathan |
| `{{LINK_CTA_FINAL}}` | Link rastreável do CTA Final | Nathan |
| `{{LINK_CTA_FLUTUANTE}}` | Link rastreável do botão flutuante | Nathan |
| `{{LINK_CTA_NAVBAR}}` | Link rastreável do CTA da Navbar | Nathan |
| `{{LINK_CTA_CONTATO}}` | Link rastreável do telefone no bloco contato | Nathan |
| `{{NUMERO_CRO}}` | CRO-SP do Dr. Rodrigo | Dr. Rodrigo |
| `{{ENDERECO_COMPLETO}}` | Endereço completo da clínica | Dr. Rodrigo |
| `{{ENDERECO_RUA}}` | Apenas rua e número | Dr. Rodrigo |
| `{{ENDERECO_RESUMIDO}}` | Endereço para footer (curto) | Dr. Rodrigo |
| `{{CEP}}` | CEP da clínica | Dr. Rodrigo |
| `{{LATITUDE}}` | Latitude (Google Maps) | Google Maps |
| `{{LONGITUDE}}` | Longitude (Google Maps) | Google Maps |
| `{{TELEFONE_FORMATADO}}` | Telefone formato (17) 99999-9999 | Dr. Rodrigo |
| `{{TELEFONE_INTERNACIONAL}}` | Telefone formato +5517999999999 | Dr. Rodrigo |
| `{{EMAIL_CLINICA}}` | E-mail oficial da clínica | Dr. Rodrigo |
| `{{HORA_INICIO}}` | Horário de abertura (ex: 08) | Dr. Rodrigo |
| `{{HORA_FIM}}` | Horário de fechamento (ex: 19) | Dr. Rodrigo |
| `{{HORARIO_RESUMIDO}}` | Horário formato curto pra footer | Dr. Rodrigo |
| `{{CNPJ}}` | CNPJ da clínica | Dr. Rodrigo |
| `{{GOOGLE_MAPS_EMBED}}` | ID do embed do Google Maps | Google Maps |
| `{{LINK_INSTAGRAM}}` | URL do Instagram da UniQ | Dr. Rodrigo |
| `{{LINK_FACEBOOK}}` | URL do Facebook da UniQ | Dr. Rodrigo |
| `{{LINK_GOOGLE_BUSINESS}}` | URL do Google Business Profile | Dr. Rodrigo |
| `{{GTM_ID}}` | ID do container GTM (GTM-XXXXXXX) | Nathan |
| `{{META_PIXEL_ID}}` | ID do Meta Pixel (16 dígitos) | Nathan |
| `{{GA4_ID}}` | ID GA4 (G-XXXXXXXXXX) | Nathan |

---

## 10. CRITÉRIOS DE ACEITAÇÃO

A LP só será considerada entregue quando TODOS os critérios abaixo forem atendidos:

### Visual e funcional
- [ ] Todos os 12 blocos da estrutura implementados
- [ ] Identidade visual UniQ aplicada (cores e tipografia exatas)
- [ ] 100% responsiva (testada em iPhone, Android e desktop em múltiplas resoluções)
- [ ] Animações on-scroll suaves, sem janks
- [ ] Botão CTA em cada bloco com `data-cta` correto
- [ ] Botão WhatsApp flutuante visível em toda a página

### SEO
- [ ] Meta tags completas (title, description, keywords, geo, OG, Twitter)
- [ ] Favicon multi-tamanho com `site.webmanifest` configurado
- [ ] Schema.org JSON-LD válido (Organization + Dentist + FAQPage) — validar em `validator.schema.org`
- [ ] Sitemap.xml + robots.txt na raiz
- [ ] Alt text em todas as imagens
- [ ] H1 único e com keyword + cidade
- [ ] HTTPS ativo (verificar no go-live)

### Performance (Google PageSpeed Insights)
- [ ] LCP < 2.5s mobile e desktop
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] Imagens em WebP com fallback
- [ ] Lazy loading abaixo da dobra
- [ ] CSS crítico inline above-the-fold

### Tracking
- [ ] GTM instalado e disparando
- [ ] GA4 conectado via GTM
- [ ] Meta Pixel ativo (verificar com Meta Pixel Helper)
- [ ] Evento `click_whatsapp` disparando em todos CTAs
- [ ] Evento `Lead` (Meta Pixel) disparando em todos CTAs
- [ ] Scroll depth tracking funcionando (25/50/75/100)
- [ ] dataLayer populado em cada interação

### Conteúdo
- [ ] Todos os placeholders `{{XXX}}` substituídos
- [ ] CRO do Dr. Rodrigo visível no footer e Bloco 9 (compliance)
- [ ] Nenhuma promessa absoluta na copy ("garantia 100%", "indolor", "sem riscos") — compliance CFO/CRO
- [ ] Link funcional do Google Maps com localização correta

### Acessibilidade
- [ ] Contraste mínimo AA em todos os textos
- [ ] Navegação por teclado funciona (Tab cycle)
- [ ] ARIA labels nos botões com ícones
- [ ] Imagens com alt descritivo

---

## 11. DECISÕES ABERTAS

Pontos que dependem de informações que o cliente (Dr. Rodrigo) ainda precisa fornecer:

1. **Endereço completo da clínica** + CEP + coordenadas geográficas
2. **Telefone/WhatsApp oficial** (e validar se o número usado nos Tintim é o mesmo)
3. **CRO-SP do Dr. Rodrigo** (compliance obrigatório)
4. **CNPJ da UniQ**
5. **Horário de atendimento** (segunda a sexta? Sábado? Almoço?)
6. **E-mail corporativo da clínica**
7. **Domínio definitivo** (uniqdentalstudio.com.br? outro?)
8. **Hospedagem** (Vercel, Netlify, ou hospedagem própria?)
9. **Links das redes sociais** (Instagram, Facebook, GBP)
10. **Validar compliance** dos textos do FAQ com o Dr. Rodrigo (especialmente respostas sobre taxa de sucesso, dor, contraindicações)

**Lacunas estratégicas (resolver pós go-live):**
- Coletar 3-5 antes/depois com autorização de imagem
- Gravar 3 depoimentos em vídeo de pacientes existentes
- Ativar fluxo de coleta de reviews no Google Business Profile

---

## 12. INSTRUÇÃO FINAL AO MODELO QUE VAI CODAR

Você é um desenvolvedor front-end sênior especialista em landing pages de alta conversão e SEO técnico. Construa a landing page descrita acima seguindo **rigorosamente** todos os pontos do spec:

1. Crie o `index.html` com estrutura semântica completa, todos os 12 blocos, meta tags, favicons, schema.org, GTM e Meta Pixel.
2. Crie o `style.css` usando as CSS Custom Properties definidas, mobile-first, com todas as animações e microinterações.
3. Crie o `script.js` com Intersection Observer para animações on-scroll, tracking de CTAs, scroll depth e FAQ.
4. Mantenha **todos os placeholders `{{XXX}}`** intactos — não preencher com valores fictícios.
5. Performance é prioridade: imagens otimizadas, CSS minificado opcional, JS com `defer`.
6. Acessibilidade básica garantida.
7. **NÃO usar frameworks pesados** (sem React, Vue, Tailwind). Apenas HTML + CSS + JS vanilla.
8. **Comente** seções principais do código para facilitar manutenção futura.
9. Entregue o código completo, pronto pra rodar.

**Pronto. Pode começar a codar.**

---

*Documento criado por Nathan Ferreira aplicando metodologia Spec-Driven Development NF.*
