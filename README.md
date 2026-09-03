# Kore.ai Frontend Clone

A pixel-faithful frontend clone of [Kore.ai](https://kore.ai) with integrated sections inspired by [xAI](https://x.ai) and [Grok Bot](https://x.ai/bot), branded with the VAIO logo.

## Features

- **Glassmorphic pill navbar** — translucent, blurs content behind it, compacts on scroll
- **Mega-menu dropdowns** — hover-triggered with animated product previews (Chat, Build, Bot, Imagine, Voice)
- **Hero section** — centered layout with ripple video background (compressed to 932 KB)
- **Artemis banner** — animated video background with overlay
- **3 product cards** — Rive animations (Pre-built Applications, Accelerators, Tailored Applications)
- **xAI Frontier Models grid** — Chat bubbles, terminal, Bot conversation, image grid, 3D voice sphere
- **Grok Bot section** — 2×2 feature grid + interactive phone mockup with switchable job roles
- **Industry carousel** — 5 tabs with peek effect, real client logos, auto-cycling
- **Analyst recognition** — tabbed panels (Gartner, Forrester, Everest)
- **Testimonials, Partners, Insights, CTA, Footer** — all with real content from kore.ai

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Semantic HTML5 |
| Styles | Vanilla CSS3 (custom properties, grid, flexbox, backdrop-filter) |
| Logic | Vanilla ES2022 JavaScript |
| Animations | CSS @keyframes + [Rive](https://rive.app) for interactive vector animations |
| Fonts | Inter, Space Grotesk, Source Code Pro (Google Fonts) |
| Build | Node.js scripts (clean-css, terser) |
| Serving | `serve` (static file server) |

**No frameworks. No bundlers. No runtime dependencies.**

## Quick Start

```bash
# Install dev dependencies
npm install

# Start dev server on http://localhost:8091
npm run dev

# Build minified assets
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

## Project Structure

```
kore-clone/
├── index.html          # Main page (all sections)
├── styles.css          # All styles (52 KB minified)
├── main.js             # All interactions (11 KB minified)
├── package.json        # Scripts and dev dependencies
├── scripts/
│   └── build.js        # CSS/JS minification pipeline
├── assets/
│   ├── hero/           # Hero video, Rive files, backgrounds
│   ├── carousel/       # Industry slide images (.avif)
│   ├── explore/        # Product tab Rive animations
│   ├── insights/       # Article thumbnails (.webp)
│   ├── logos/          # 55 client logo SVGs
│   ├── products/       # Product screenshots (.webp)
│   ├── xai/            # xAI section images
│   ├── nav/            # Social icons
│   ├── backgrounds/    # Section background images
│   ├── rive.min.js     # Self-hosted Rive SDK
│   ├── logo.svg        # Kore.ai logo
│   ├── logo-vaio.webp  # VAIO logo
│   └── favicon.png     # Favicon
├── .editorconfig
├── .prettierrc
├── eslint.config.js
├── .stylelintrc.json
└── .gitignore
```

## Performance

| Metric | Value |
|--------|-------|
| Total weight | 8.8 MB |
| Hero video | 932 KB (compressed from 14.5 MB) |
| CSS | 52 KB minified |
| JS | 11 KB minified |
| Lazy-loaded images | 156 / 158 |
| External dependencies | 1 (Google Fonts) |
| Console errors | 0 |

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

Requires `backdrop-filter` support for glassmorphic effects.

## Credits

- Design reference: [Kore.ai](https://kore.ai)
- xAI grid inspiration: [xAI](https://x.ai)
- Grok Bot section: [xAI Bot](https://x.ai/bot)
- Navbar pill style: [DeepSeek Harness](https://deepseek.com/harness/en/)
- Client logos: sourced from Kore.ai CDN
- Rive animations: sourced from Kore.ai CDN

## License

This is a frontend clone for educational/demonstration purposes. All original content, branding, and assets belong to their respective owners.
