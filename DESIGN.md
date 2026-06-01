---
name: WirkVektor Design System
version: 2026-05-31
quelle: 02 Projekte/WebSite aufbauen/site/src/styles/tokens.css
colors:
  # Markenfarben
  navy-deep: '#0F172A'
  slate-mid: '#475569'
  slate-light: '#94A3B8'
  vector-teal: '#0D9488'
  vector-teal-bright: '#14B8A6'
  impact-cyan: '#22D3EE'
  off-white: '#F7F9FB'
  white: '#FFFFFF'
  safety-border: '#E2E8F0'
  safety-border-strong: '#CBD5E1'
  # Theme Light (Standard)
  light-bg: '#F7F9FB'
  light-bg-elevated: '#FFFFFF'
  light-fg: '#0F172A'
  light-fg-muted: '#475569'
  light-fg-subtle: '#94A3B8'
  light-border: '#E2E8F0'
  light-accent: '#0D9488'
  # Theme Dark
  dark-bg: '#0F172A'
  dark-bg-elevated: '#111E34'
  dark-fg: '#FFFFFF'
  dark-fg-muted: 'rgba(255,255,255,0.72)'
  dark-fg-subtle: 'rgba(255,255,255,0.5)'
  dark-border: 'rgba(255,255,255,0.14)'
  dark-accent: '#22D3EE'
  # Status
  error: '#B91C1C'
typography:
  font-display: Hanken Grotesk
  font-body: Inter
  weights-display: [500, 600, 700]
  weights-body: [400, 500, 600, 700]
  display-xl: clamp(3rem, 5vw + 1rem, 6rem)      # ~48–96px
  display-lg: clamp(2.25rem, 3vw + 1rem, 3.5rem) # ~36–56px
  headline-md: clamp(1.5rem, 1.2vw + 1rem, 2rem) # ~24–32px
  headline-sm: 1.5rem                             # 24px
  body-lg: 1.125rem                               # 18px
  body-md: 1rem                                   # 16px
  body-sm: 0.875rem                               # 14px
  label-caps: 0.75rem                             # 12px
  lh-display: 1.05
  lh-headline: 1.18
  lh-body: 1.55
  ls-tight: -0.02em
  ls-caps: 0.1em
radius:
  button: 4px
  input: 4px
  card: 8px
  pill: 9999px
spacing:
  baseline: 4px
  scale: [4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128]
  gutter: 24px
  margin-desktop: 80px
  margin-tablet: 40px
  margin-mobile: 20px
  container-max: 1280px
elevation:
  shadow-soft: '0px 4px 12px rgba(15,23,42,0.05)'
  shadow-medium: '0px 8px 24px rgba(15,23,42,0.08)'
motion:
  ease-out: cubic-bezier(0.22, 0.61, 0.36, 1)
  ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)
  duration-fast: 200ms
  duration-medium: 400ms
  duration-slow: 800ms
---

> Dieses Dokument beschreibt das tatsächlich auf der WirkVektor-Website (`02 Projekte/WebSite aufbauen/site`) implementierte Designsystem. Die maßgebliche Quelle der Tokens ist `src/styles/tokens.css`; dieses Dokument hält sie für alle weiteren visuellen Aufgaben (Slides, Materialien, Print) fest. Grafiken: siehe `07 Anhänge/Website Grafiken/`.

## Brand & Style
Das Designsystem ist für **WirkVektor** entwickelt — eine Beratung, die hochwertige KI mit den pragmatischen Bedürfnissen des deutschen Mittelstands verbindet. Die Markenpersönlichkeit gründet auf **Kompetenz** und **Klarheit** und verzichtet bewusst auf „KI-Hype" zugunsten einer visuellen Sprache von **Verlässlichkeit** und **gerichteter Wirkung**.

Der Stil ist **Corporate Modern mit Technical Edge**: strukturierte Layouts, großzügiger aber gezielter Weißraum, präzise Vektor-Elemente. Die Ästhetik spiegelt ein „Security-First"-Mindset über stabile Proportionen und eine geerdete Farbpalette. Wirkung des Inhalts steht über visueller Verspieltheit — keine Hype-Animationen, keine dekorativen Effekte.

## Colors

### Markenfarben
| Token | Hex | Verwendung |
|---|---|---|
| **Navy Deep** | `#0F172A` | Primärfarbe: Headlines, Primary-Button, Dark-Background, Nav, Footer |
| **Slate Mid** | `#475569` | Body-Text, sekundäre Information, Icons |
| **Slate Light** | `#94A3B8` | Subtiler Text, Quellenangaben, Platzhalter |
| **Vector Teal** | `#0D9488` | Primärer Akzent — CTAs, Impact-Highlights, aktive Zustände |
| **Vector Teal Bright** | `#14B8A6` | Helle Teal-Variante für Verläufe/Hover |
| **Impact Cyan** | `#22D3EE` | Akzent im Dark-Mode (ersetzt dort Vector Teal) |
| **Off-White** | `#F7F9FB` | Light-Background |
| **White** | `#FFFFFF` | Karten, erhöhte Flächen im Light-Mode |
| **Safety Border** | `#E2E8F0` | Trennlinien, Card-Borders |
| **Safety Border Strong** | `#CBD5E1` | Kräftigere Trennlinien |
| **Error** | `#B91C1C` | Validierungsfehler in Formularen |

**Vector Teal** repräsentiert „gerichtete Wirkung" und wird sparsam für Call-to-Actions und zentrale Datenpunkte gesetzt. **Navy Deep** etabliert Autorität und Vertrauen; **Slate** liefert den professionellen, neutralen Mittelton.

## Theme-System (Light / Dark)
Die Website arbeitet mit zwei Themes, gesteuert über `data-theme` am `<body>`. Sektionen können per `data-theme` einzeln umschalten (Theme-Observer beim Scrollen). Komponenten beziehen Farben über semantische Tokens (`--bg`, `--fg`, `--accent` …), nicht über Markenfarben direkt.

| Semantisches Token | Light (`ui-light`) | Dark (`ui-dark`) |
|---|---|---|
| `--bg` | Off-White `#F7F9FB` | Navy Deep `#0F172A` |
| `--bg-elevated` | White `#FFFFFF` | `#111E34` |
| `--fg` | Navy Deep `#0F172A` | White `#FFFFFF` |
| `--fg-muted` | Slate Mid `#475569` | `rgba(255,255,255,0.72)` |
| `--fg-subtle` | Slate Light `#94A3B8` | `rgba(255,255,255,0.5)` |
| `--border` | Safety Border `#E2E8F0` | `rgba(255,255,255,0.14)` |
| `--accent` | Vector Teal `#0D9488` | Impact Cyan `#22D3EE` |

**Regel:** Im Dark-Mode wird der Akzent von Vector Teal auf Impact Cyan gewechselt, um auf dunklem Navy ausreichend Kontrast zu halten (Kontrast-Ziel 4.5:1+ in beiden Themes).

## Typography
**Hanken Grotesk** für Display und Headlines (sharp, „Engineering"-Charakter), **Inter** für Body und UI-Labels (hohe Lesbarkeit in professionellen Software-Kontexten). Beide aktuell via Google Fonts (`display=swap`), Self-Hosting in Phase 2 vorgesehen.

- **Schnitte:** Hanken Grotesk 500/600/700 · Inter 400/500/600/700
- **Letter-Spacing:** Headlines eng (`-0.02em`); Label-Caps weit (`0.1em`, uppercase)
- **Fluide Skala:** Display- und Headline-Größen skalieren über `clamp()` zwischen Mobile und Desktop

| Stil | Größe | Weight | Line-Height | Einsatz |
|---|---|---|---|---|
| Display XL | `clamp(3rem, 5vw+1rem, 6rem)` | 700 | 1.05 | Hero, Closing |
| Display LG | `clamp(2.25rem, 3vw+1rem, 3.5rem)` | 700 | 1.05 | Sektion-Headlines |
| Headline MD | `clamp(1.5rem, 1.2vw+1rem, 2rem)` | 600 | 1.18 | Untertitel, Modal-Titel |
| Headline SM | `1.5rem` (24px) | 600 | 1.18 | Card-Titel, Methodik-Schritte |
| Body LG | `1.125rem` (18px) | 400 | 1.55 | Einleitungen, Sublines |
| Body MD | `1rem` (16px) | 400 | 1.55 | Fließtext |
| Body SM | `0.875rem` (14px) | 400 | 1.5 | Meta, Quellen, Fehlertexte |
| Label Caps | `0.75rem` (12px) | 600 | — | Eyebrows, Tags, Form-Labels (uppercase, `0.1em`) |

## Layout & Spacing
- **Container:** voll breit (`max-width: none`); seitliche Gutter sorgen für Atemraum. Inhaltsmaß `--container-max: 1280px`.
- **Responsive Margins:** Desktop (≥1024px) 80px · Tablet (≥768px) 40px · Mobile (<768px) 20px.
- **Grids:** `.grid-2` (1→2 Spalten ab 1024px), `.grid-3` (1→2 ab 768px →3 ab 1024px), `.role-grid` (1→2→4).
- **Sektion-Padding:** `.section--lg` 96px (Mobile 64px), `.section--md` 64px (Mobile 48px) vertikal.
- **Spacing-Rhythmus:** strikt auf 4px-Baseline. Skala: 4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128px.

## Elevation & Depth
Vermeidet schwere Schatten zugunsten von **Tonal Layers** und **Low-Contrast-Outlines**:

- **Surface 0 (Background):** `--bg` (Off-White / Navy).
- **Surface 1 (Cards/Container):** `--bg-elevated` mit 1px `--border`.
- **Soft Shadow:** `0px 4px 12px rgba(15,23,42,0.05)` — nur für aktive Zustände/Dropdowns.
- **Medium Shadow:** `0px 8px 24px rgba(15,23,42,0.08)` — sparsam für hervorgehobene Elemente.

Backdrop-Blur (12px) am gescrollten Header und an Modal-Overlays (8px) erzeugt Tiefe ohne harte Schatten.

## Shapes
Weiche Rundung, professionell „boxy":

- **Buttons / Inputs:** 4px Radius
- **Cards:** 8px Radius
- **Pills / Tags / Icon-Buttons:** voll gerundet (9999px)

## Motion
Animationen unterstützen den Inhalt, sie sind nicht der Inhalt. Alle respektieren `prefers-reduced-motion: reduce` (Dauern fallen auf 0ms).

- **Easing:** `--ease-out` `cubic-bezier(0.22, 0.61, 0.36, 1)`, `--ease-in-out` `cubic-bezier(0.65, 0, 0.35, 1)`
- **Dauern:** fast 200ms · medium 400ms · slow 800ms
- **Reveal-on-View:** `[data-reveal]` blendet mit Versatz (24px translateY) ein, optional gestaffelt über `data-reveal-delay`.
- **Mechanik:** Lenis (Smooth-Scroll) + GSAP ScrollTrigger (Parallax, Clip-Reveal) + IntersectionObserver (Reveal & Theme-Wechsel). Keine Auto-Play-Carousels, keine Endlos-Loops, keine Layout-Shifts.

## Components

### Buttons
Basis: `inline-flex`, 14px/22px Padding, 4px Radius, Weight 600, 1px-Border.

- **Primary** (`.btn--primary`): Navy Deep, weißer Text. Hover `#1A253C`. Im Dark-Mode invertiert (weiß auf Navy).
- **Secondary** (`.btn--secondary`): transparent mit `--fg`-Border; Hover füllt mit `--fg`.
- **Impact** (`.btn--impact`): Vector Teal, weißer Text. Hover `#0B7E74`. Reserviert für den letzten Schritt im Funnel (z. B. „Projekt starten").
- **Ghost** (`.btn--ghost`): transparent, leichter Hover-Hintergrund.
- **Größen:** `--sm` (10/16px) · Standard · `--lg` (18/28px); `--icon` (44×44px quadratisch).
- Hover hebt um 1px an (`translateY(-1px)`); lange Labels brechen um statt Overflow.

### Cards
`--bg-elevated`, 1px `--border`, 8px Radius, 32px Padding. Varianten: `--dark` (Navy, weißer Text), `--accent` (Vector Teal, weißer Text). Card-Header nutzen Label-Caps zur Kategorisierung.

### Tags / Pills
Pill-Form, 1px-Border, Label-Caps (uppercase, `0.1em`). `--accent`-Variante in Vector Teal.

### Formulare
- Felder: 12/14px Padding, `--bg-elevated`, 1px `--border`, 4px Radius.
- **Focus:** Vector-Teal-Border + 1px Box-Shadow in Teal (signalisiert Präzision/„processing").
- **Fehler:** `#B91C1C`-Border + Shadow, Fehlertext in derselben Farbe, `aria-live`.
- Checkbox: `accent-color: var(--vector-teal)`, DSGVO-Zustimmung erforderlich.
- Erfolg: dezenter Teal-Tint-Block mit Teal-Border.

### Header / Navigation
Fixiert, transparent. Im gescrollten Zustand (`--scrolled`): halbtransparenter Background mit 12px Backdrop-Blur und unterer Border. Logo (Glyph 28px + Wortmarke), Bookmark-Button mit Zähler-Badge (Teal-Kreis), Desktop-CTA ab 1024px.

### Karussell
Track mit `transform`-Transition (800ms `ease-in-out`), Slides voll breit in Card-Optik. Navigation unten: Counter (`01 / 05`) plus Prev/Next-Icon-Buttons. Tastatur-Navigation, `aria-roledescription="Karussell"`, kein Auto-Play.

### Spezifische Sektion-Komponenten
- **Methodik-Schritte:** nummerierte Schritte, Nummer in Vector Teal (Hanken Grotesk), optionaler ausgegrauter BG (Opacity 0.4).
- **Values-Card** (Haltung): Liste mit 8×8px Teal-Quadrat-Marker, Trennlinien je Eintrag.
- **Role-Cards** (Zielgruppe): Grid bis 4 Spalten, Tag in Akzentfarbe, min-height 220px.
- **Wirkung-Stats:** große Teal-Werte (`clamp(2.5rem…3.5rem)`, Weight 700) plus 8px-Fortschrittsbalken (Vector Teal) — linear, horizontal, kein Kreis-Loader.
- **Outcome-List:** Zeilen mit Teal-Pfeil (Dark-Mode: Impact Cyan), Trennlinien.
- **Bookmark-Button:** Pill, Hover/aktiv in Teal (gefüllt bei `is-bookmarked`).
- **Modals:** seitliches Panel (max 480px) in Navy, Overlay `rgba(15,23,42,0.6)` mit 8px Blur. Menü-Modal voll breit mit großer Navigationsliste. `role="dialog"`, Escape/Overlay schließt.
- **Footer:** Navy-Background, weißer Text, 4-Spalten-Grid; Links hover in Impact Cyan.

### Technische Vektoren & Iconographie
- **Icons:** dünner 1.5px-Stroke, `currentColor`, als Inline-SVG-Sprite (Menu, Close, Bookmark, Phone, Arrows, External, Plus, Check). Größen 16/20/24px.
- **Illustrationen:** isometrische Linien-Konstruktionen mit 1px-Stroke in Navy + Vector Teal (siehe `hero-vektor.svg`). Keine „Blob"-Formen, keine organischen Verläufe — gerade Linien und Pfeile illustrieren den „Vektor"-Gedanken: Bewegung mit Richtung und Betrag.
- **Progress:** lineare, dünne Balken in Vector Teal statt zirkulärer Loader — klarer Weg von A nach B.

## Logo
Das Markenzeichen ist das **„W" mit Teal-Aufwärtspfeil** — die navyfarbenen W-Striche stehen für Struktur und Fundament, der Vector-Teal-Pfeil für gerichtete Wirkung („Vektor"). Maßgebliche Datei: `07 Anhänge/WirkVektor Logo.svg`.

- **Eine Quelldatei für alles:** Dieses Logo wird wortgetreu an allen Stellen verwendet — Website-Logo, Favicon, Anhänge-Kopien und (als PNG gerendert) in den Office-Vorlagen. Es bringt einen **weißen Hintergrund** mit und ist dadurch auf hellem wie dunklem Grund lesbar (auf Dunkel wirkt es als weiße Logo-Karte).
- **Favicon** (`favicon.svg`): identisch mit dem Logo.
- **Wortmarke:** „WirkVektor" in Hanken Grotesk (600/700), neben dem Logo oder eigenständig.
- Die Verteilung an alle Stellen erfolgt zentral über `02 Projekte/Geschäftsausstattung und Vorlagen/_build/sync_logos.py`.

## Grafiken / Assets
Alle Website-Grafiken liegen unter `07 Anhänge/Website Grafiken/` (Index dort in `README.md`). Live im Einsatz: `wirkvektor-logo.svg`, `favicon.svg`, `sebastian-schucht.png` und das Inline-Icon-Sprite. Gestaltete Kern-Illustrationen: `hero-vektor.svg`, `hebel-grafik-drehpunkt-rechts.svg`. Platzhalter-SVGs markieren Foto-/Mockup-Slots aus der [[Asset-Liste]] (Ersatz durch echte Assets in Phase 2). Das Logo-Intro nutzt einen per Canvas erzeugten Vektor-Hintergrund (kein statisches File).
