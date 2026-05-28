---
tags: [projekt, website, sitemap]
status: aktiv
erstellt: 2026-05-28
projekt: "[[Website aufbauen]]"
---

# Sitemap — WirkVektor OnePager

> Sektions-Reihenfolge und Anker-IDs für die technische Umsetzung. Inhalte: siehe [[Inhaltskonzept OnePager]].

## Reihenfolge & Anker

| # | Sektion | Anker-ID | Theme | Aircenter-Pendant |
|---|---|---|---|---|
| 0 | Logo-Intro (Parallax) | — | light | Logo-Parallax |
| 1 | Hero | `#hero` (Top) | light | Intro |
| 2 | Hebel | `#hebel` | light | Impulse |
| 3 | Methodik | `#methodik` | light | Format |
| 4 | Haltung | `#haltung` | **dark** | Harmony |
| 5 | Zielgruppe | `#zielgruppe` | **dark** | Life |
| 6 | Befähigung | `#befaehigung` | **dark** → light | People |
| 7 | Wirkung | `#wirkung` | light → **dark** | Status |
| 8 | Über Sebastian | `#ueber` | light | (Sub-Page /about) |
| 9 | Closing-CTA | `#closing` | **dark** | — |
| 10 | Kontakt | `#kontakt` | light | — |
| 11 | Footer | — | **dark** | Footer |

**Hell/Dunkel-Rhythmus:** light → light → light → light → **dark** → **dark** → **dark/light** → **light/dark** → light → **dark** → light → **dark**.

## Navigation (sticky)

- Markenglyph **WV** + Wortmarke
- Bookmark-Icon → Modal „Mein KI-Plan"
- Telefon-Icon → Modal „Rückruf anfragen"
- Primär-Button „Erstgespräch buchen"
- Hamburger → Modal „Menü"

## Modals

| Trigger | Modal | Layout |
|---|---|---|
| Hamburger | Menü | Full-Page, dark |
| Telefon-Icon · Closing-CTA-Sekundär | Rückruf anfragen | Side rechts, light |
| Bookmark-Icon · „+ Merken" in Section 7 | Mein KI-Plan (Merkliste) | Side links, light |

## Globale Mechaniken

- **Theme-Switch-Nav:** Nav-Farben wechseln je sichtbarer Sektion (Intersection Observer)
- **Sticky-CTA mobile:** ab Scroll > Hero
- **Smooth-Scroll** mit 80px Offset
- **Scroll-Reveal:** 8px Y-Translate + Opacity, 300ms ease-out, einmalig (respektiert `prefers-reduced-motion`)
- **Parallax** auf Hintergründen, max 20svh
- **Carousels:** Section 3 (scroll-getriggert, 2 Slides) · Section 6 (cursor-gesteuert, 5 Slides) · Section 7 (vertikale Clip-Reveal, 2 Bilder)
- **Cookie-Consent-Banner** unten

## Pflicht-Unterseiten

OnePager hat keine echten Sub-Routes, aber:

- `/impressum` — Pflichtseite
- `/datenschutz` — Pflichtseite

## SEO

- Title: „WirkVektor — KI-Beratung für den Mittelstand · Strategie, Governance, Wirkung"
- Description (max 155 Zeichen): „Strukturierte KI-Einführung für mittelständische Unternehmen. Strategie, Governance und produktive Wirkung — mit messbarem Nutzen."
- OG-Image: Hero-Vektor-SVG + Claim
