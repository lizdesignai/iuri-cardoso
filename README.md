# Dr. Iuri Cardoso | Linkpage Oficial & Atendimento

Projeto autoral, autêntico e de alto padrão desenvolvido para o **Dr. Iuri Cardoso** (`@dr.iuricardoso`), Farmacêutico Esteta em Salvador - BA.

---

## 💎 Identidade & Arquitetura Visual

- **Paleta de Cores**:
  - *Midnight & Sapphire Navy*: `#05101a`, `#081d2f`, `#083959`
  - *Champagne Gold*: `#f7e7c4`, `#e4ca8b`, `#d4af37`
  - *Emerald Green (WhatsApp Presence)*: `#25d366`, `#128c7e`
  - *Soft Cyan*: `#38bdf8`
- **Textura de Fundo**:
  - `img/textura-web.webp` e `img/textura-web.jpg` (otimizadas a partir da imagem original de 19MB para menos de 650KB, garantindo carregamento ultrarrápido em dispositivos móveis e preservando o original).
- **Tipografia**:
  - *Headings*: **Cormorant Garamond** (editorial, nobreza clínica).
  - *UI & Leitura*: **Plus Jakarta Sans** (geométrica, moderna e ultra legível).

---

## 🚀 Funcionalidades Principais

1. **Pre-loader Animado em SVG Autoral**:
   - Monograma oficial estilizado em vetor SVG (`img/logo-symbol.svg`).
   - Efeito de traçado dinâmico via `stroke-dasharray` e `stroke-dashoffset` com transição suave para preenchimento dourado e fade out fluido.
2. **Google Tag Manager (GTM) Pré-Configurado**:
   - Espaços identificados no `<head>` e logo após o `<body>` em `index.html`.
   - Disparo automático de eventos no `window.dataLayer`:
     - `whatsapp_click`: Registro de intenção de agendamento com número e CTA.
     - `location_click`: Abertura de rotas no Google Maps.
     - `instagram_click`: Engajamento com a rede social.
     - `share_completed`: Compartilhamento do perfil.
     - `vcard_download_click`: Salvamento de contato.
3. **Links Oficiais**:
   - **WhatsApp Oficial**: `+55 71 98284-9694` com mensagem de agendamento pré-formatada.
   - **Localização**: `https://maps.app.goo.gl/JuvamA7zxt1qJ1FM6?g_st=ic` (Google Maps).
   - **Instagram Oficial**: `@dr.iuricardoso`.
4. **Utilitários Exclusivos**:
   - **Salvar Contato (.vcf)**: Gera dinamicamente um arquivo vCard 3.0 para adicionar o Dr. Iuri à agenda do celular com um clique.
   - **QR Code do Perfil**: Modal com leitor de câmera para exibição em recepções ou eventos.
   - **Web Share API**: Compartilhamento nativo com fallback para cópia de link e toast notification.
   - **Tilt 3D Suave**: Micro-interação responsiva em desktop com suporte a `prefers-reduced-motion`.

---

## 📁 Estrutura de Arquivos

```
iuri/
├── index.html              # Estrutura semântica HTML5 com meta tags, GTM e acessibilidade
├── style.css               # Folha de estilos com design tokens, glassmorphism e animações
├── main.js                 # Lógica do preloader, dataLayer GTM, vCard, QR Code e Share API
├── favicon.svg             # Favicon vetorial com o monograma e acabamento dourado
├── manifest.json           # Manifesto PWA para salvar o site como app na tela inicial
├── README.md               # Documentação técnica completa
└── img/
    ├── logo-symbol.svg     # Monograma vetorial SVG de alta precisão
    ├── logo-full.svg       # Logotipo completo vetorizado
    ├── Iuri logo azul .png # Logotipo original em azul
    ├── Iuri logo branca .png # Logotipo original em branco
    ├── perfil-iuri.jpg     # Foto de perfil oficial
    ├── textura.jpg         # Textura original em altíssima resolução
    ├── textura-web.webp    # Textura otimizada para web de alta performance
    └── textura-web.jpg     # Fallback JPEG da textura otimizada
```

---

## ⚙️ Como Ativar o seu Google Tag Manager (GTM)

No arquivo `index.html`, procure por `GTM-XXXXXXX` em duas posições:

1. **No `<head>` (Linhas 5-10)**:
   Substitua `'GTM-XXXXXXX'` pelo seu código de contêiner GTM real (ex: `'GTM-N8K2XYZ'`).

2. **No `<body>` (Linhas 42-45)**:
   Substitua `GTM-XXXXXXX` na tag `<noscript>` pelo mesmo código.

Pronto! Todos os eventos já estão mapeados no `main.js` e chegarão automaticamente ao Google Analytics 4 (GA4), Meta Pixel ou Google Ads via GTM.

---

## 🌐 Como Publicar

O projeto é 100% estático (HTML, CSS, JS puros), podendo ser hospedado em:
- **Vercel / Netlify**: Basta conectar o repositório ou arrastar a pasta `iuri`.
- **GitHub Pages**: Configurar para publicar a branch `main`.
- **Hospedagem Tradicional (cPanel / Hostinger / Locaweb)**: Enviar todos os arquivos para a pasta `public_html`.
