# CLAUDE.md — Website-Projekt

## Projekt-Kontext

Dieses Verzeichnis enthält die WirkVektor-Website als statischen OnePager. Der Code liegt im Unterordner `site/`. Die inhaltliche Vorlage steht in [[Inhaltskonzept OnePager]], das Designsystem in [[DESIGN]] auf Repo-Ebene, der aktuelle Fortschritt in `PROGRESS.md`.

Ziel:

- Stabile, performante, barrierearme Website für mittelständische Entscheider.
- Sachliche, vertrauenswürdige Wirkung über strukturierte Komposition statt visuelle Effekte.
- Wirkung des Inhalts steht über visueller Verspieltheit. Keine Hype-Animationen.

## Tech-Stack

- **Runtime:** TypeScript (strict mode)
- **Bundler:** Vite
- **Scroll:** Lenis (smooth scroll) + GSAP ScrollTrigger (Parallax, Clip-Reveal, Pinning)
- **Validation:** Zod (Content-Schemas, Form-Validierung)
- **Styling:** Vanilla CSS mit CSS Custom Properties als Designtokens — kein CSS-Framework
- **Test:** Vitest mit jsdom
- **Lint/Format:** ESLint + Prettier
- **Fonts:** Hanken Grotesk (Display) + Inter (Body), aktuell via Google Fonts CDN

Diese Wahl ist bewusst minimal. Kein React, kein Framework, kein WebGL. Eine statische Site reicht für den OnePager und hält Bundle, Komplexität und Wartungslast klein.

## Projektstruktur

```
02 Projekte/WebSite aufbauen/
├── CLAUDE.md                    Diese Datei
├── PROGRESS.md                  Aktueller Stand und nächste Schritte
├── Website aufbauen.md          Projekt-Übersicht
├── Inhaltskonzept OnePager.md   Vollständiger Content, wörtlich übernommen
├── Sitemap.md                   Sektion-Struktur
├── Asset-Liste.md               Asset-Bedarf und Status
└── site/                        Code
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── .eslintrc.cjs
    ├── index.html               OnePager mit allen 11 Sektionen + Modals
    ├── public/                  favicon, fonts (wenn self-hosted)
    ├── src/
    │   ├── main.ts              Entry: orchestriert Init-Reihenfolge
    │   ├── render.ts            Content-Module ins DOM rendern
    │   ├── styles/              tokens, base, layout, components, sections
    │   ├── scroll/              lenis, scrollTrigger, themeObserver, revealOnView
    │   ├── components/          nav, modal, carousel, contactForm, bookmarkList
    │   ├── assets/              SVGs (Logo, Icons, Platzhalter)
    │   └── types/               content.ts (typed + Zod-validiert)
    └── tests/                   Vitest-Specs
```

## Claude Arbeitsregeln

Vor nicht-trivialen Änderungen:

- Erst PROGRESS.md lesen, um Stand und offene Punkte zu kennen.
- Bei Content-Änderungen den exakten Wortlaut aus [[Inhaltskonzept OnePager]] übernehmen — keine Paraphrasen.
- Bei visuellen Änderungen das Designsystem aus [[DESIGN]] respektieren — keine eigenen Farben oder Schriftgrößen.
- Bei TypeScript-Änderungen die Strict-Mode-Regeln einhalten.
- Bei neuen Komponenten prüfen, ob bestehende wiederverwendbar sind.

Beim Editieren:

- TypeScript strict — kein `any` ohne dokumentierten Grund.
- Explizite Typen für exportierte Funktionen, Content-Module, Form-Schemas.
- Validation-Fehler und Type-Errors nicht unterdrücken.
- Keine Dependencies hinzufügen, ohne zu prüfen, ob das Projekt schon eine äquivalente hat.
- Kleine, reviewbare Changes vor großen Rewrites.

## Erforderliche Befehle

Aus `site/`:

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint
npm run test         # Vitest run
npm run build        # tsc + vite build
npm run dev          # Vite Dev-Server
npm run preview      # Production-Bundle lokal prüfen
```

Bevor Arbeit als erledigt gemeldet wird:

- Type-Check muss grün sein.
- Lint muss grün sein.
- Tests müssen grün sein.
- Production-Build muss durchlaufen.
- Bei Form- oder Validation-Änderungen: manuelle Verifikation im Browser.
- Übersprungene Befehle explizit mit Grund melden.

## Schreibstil im Code und in Texten

Texte für die Website folgen [[Schreibstil]]. Kernregeln:

- Sachlich, klar, vertrauenswürdig. Keine Hype-Sprache.
- Verboten: „revolutionär", „disruptiv", „bahnbrechend", „Game Changer", Alarmismus.
- Konkret und belegbar — kein Folienzauber.
- „KI" ausgeschrieben (Ausnahmen: „AI Literacy", „EU AI Act").

Der `content.test.ts` prüft die Hype-Wort-Liste automatisch — neue Inhalte dürfen den Test nicht brechen.

## Designsystem

Die Tokens stehen in `src/styles/tokens.css` und entsprechen [[DESIGN]]:

- **Navy Deep `#0F172A`** — Primärfarbe, Headlines, Primary Button, Dark Background
- **Slate Mid `#475569`** — Body-Text, sekundär
- **Vector Teal `#0D9488`** — Akzent für CTAs, Impact-Highlights
- **Impact Cyan `#22D3EE`** — Akzent im Dark-Mode
- **Off-White `#F7F9FB`** — Light Background
- **Safety Border `#E2E8F0`** — Trennlinien

Typografie:

- **Hanken Grotesk** — Display und Headlines, Letter-Spacing -0.02em
- **Inter** — Body, UI-Labels

Shape: 4px Button-Radius, 8px Card-Radius. Keine starken Schatten — Tonal Layers und 1px-Borders.

## Content-Pipeline

Modulare Content-Blöcke (Carousels, Role-Cards, Outcomes, Contact-Infos, Values) liegen in `src/types/content.ts` als typisiertes Object mit Zod-Schema und werden zur Laufzeit in `src/render.ts` ins DOM gerendert.

- Änderung von Slide-Texten, Outcomes, Role-Cards → `content.ts` editieren.
- Layout-Änderung → `index.html` + `styles/sections.css`.
- Static Page-Headlines stehen direkt in `index.html`, weil sie nur einmal vorkommen.

## Animation und Motion

Drei Mechanismen:

1. **Lenis** — Smooth Scrolling für die ganze Seite. In `src/scroll/lenis.ts`. Deaktiviert sich automatisch bei `prefers-reduced-motion`.
2. **GSAP ScrollTrigger** — Parallax (`[data-parallax="0.18"]`) und Clip-Reveal (`[data-clip-reveal]`). In `src/scroll/scrollTrigger.ts`.
3. **IntersectionObserver** — Reveal-on-View (`[data-reveal]`) und Theme-Wechsel pro Sektion (`[data-theme]`).

Regeln:

- Alle Animationen müssen `prefers-reduced-motion: reduce` respektieren.
- Keine Animationen, die Layout-Shifts verursachen.
- Keine Endlos-Loops oder Auto-Play-Carousel.
- Animationen unterstützen den Inhalt, sie sind nicht der Inhalt.

## Validierung

Alle Daten an Systemgrenzen werden mit Zod validiert:

- **Content-Module** (`src/types/content.ts`) — Schema sichert Struktur (Slide-Anzahl, Eyebrow vorhanden, IDs eindeutig).
- **Form-Eingaben** (`src/components/contactForm.ts`) — E-Mail-Format, Required-Fields, DSGVO-Checkbox.

Nicht:

- JSON-Shape ohne Validierung übernehmen.
- Unbekannte Werte direkt in DOM injizieren — alle dynamischen Strings durch `escapeHtml` in `render.ts`.

## Accessibility

Mindeststandards:

- Semantisches HTML: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`.
- Headline-Hierarchie ist eindeutig (eine `<h1>`, keine übersprungenen Stufen).
- Alle Buttons und Links haben aussagekräftige Texte oder `aria-label`.
- SVGs haben `<title>`/`<desc>` oder `aria-hidden="true"` wenn dekorativ.
- Fokus-Indikator sichtbar (`:focus-visible`).
- Modale Dialoge: `role="dialog"`, `aria-modal="true"`, Escape schließt, Klick auf Overlay schließt.
- Carousel: `aria-roledescription="Karussell"`, Tastatur-Navigation mit Pfeiltasten, `aria-hidden` auf inaktiven Slides.
- Form-Errors über `aria-live` oder direkt am Feld.
- Kontrast: Light-Mode 4.5:1+, Dark-Mode 4.5:1+ — geprüft an Headline, Body, Buttons.

Lighthouse-Ziel: a11y ≥ 95.

## Performance

Budgets:

- Initial JS-Payload nach Gzip: aktuell ~68 KB — Ziel bleibt unter 100 KB.
- Initial CSS nach Gzip: aktuell ~5 KB.
- LCP-Ziel: < 2.5 s auf 4G Mobile.
- CLS-Ziel: 0.

Praktiken:

- Keine globalen `requestAnimationFrame`-Loops außerhalb von Lenis/GSAP.
- IntersectionObserver für Reveal — kein Scroll-Listener mit hoher Frequenz.
- SVGs inline, keine separaten Image-Requests für Icons.
- Schriften via Google Fonts mit `display=swap` (Phase 2: Self-Hosting).

## Browser-Support

Validierung gegen:

- Chrome (latest)
- Firefox (latest)
- Safari (latest, Desktop und iOS)
- Android Chrome (latest)

IE 11 und ältere Versionen werden nicht unterstützt.

## Sicherheit

- Kein `eval`, kein `new Function`.
- Alle dynamischen Strings in `render.ts` durch `escapeHtml` geschleust.
- Keine Drittanbieter-Skripte ohne explizite Freigabe.
- Form-Submits: aktuell nur Client-Validierung, Backend wird in Phase 2 angebunden (Honeypot oder hCaptcha vorgesehen).
- Keine `.env`-Dateien mit Secrets im Repo.

## Deployment

Aktueller Stand (Details in PROGRESS.md):

- Ziel: Hetzner Webhosting auf `www639.your-server.de`, Domain `wirkvektor.de`.
- Build-Artefakt: `site/dist/` nach `npm run build`.
- Upload aktuell **nicht** aus der Cloud-Session möglich (Network-Policy sperrt SFTP) — entweder Policy ändern oder lokal mit `deploy.sh`.

Vor jedem Deploy:

- Tests grün
- Build grün
- Letzte Änderungen committet und gepusht

## Was nicht in dieses Projekt gehört

- WebGL, Three.js, GPU-Rendering — die Site ist statisch.
- React, Vue, Svelte oder andere SPA-Frameworks — Overkill für einen OnePager.
- Externe Tracking-Skripte (Google Analytics, Facebook Pixel) — nur Plausible oder ähnlich datenschutzfreundliche Lösungen.
- CMS-Integration — Inhalte sind im Repo, Änderungen via PR.
- Animierte Hintergründe, parallaxe Stars, autoplay-Video — passt nicht zum Schreibstil.

## Completion-Checklist

Eine Aufgabe ist nicht erledigt, bevor:

- TypeScript-Strict-Check grün ist.
- ESLint grün ist.
- Vitest-Tests grün sind.
- Production-Build grün ist.
- Bei UI-Änderungen: manuelle Browser-Prüfung dokumentiert ist.
- PROGRESS.md aktualisiert ist, wenn sich der Stand verändert hat.
- Änderungen committet und gepusht sind.
- Übersprungene Schritte explizit mit Grund gemeldet werden.
