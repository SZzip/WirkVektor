---
tags: [projekt, marketing, branding]
status: aktiv
date: 2026-06-01
---

# Visitenkarte

## Ziel

Hochwertige Visitenkarte für Sebastian Schucht / WirkVektor. Doppelseitig, druckfertig, voll im Markensystem (siehe `DESIGN.md`).

## Format

- **Maße:** 85 × 55 mm (DE-Standard, Querformat)
- **Bleed (für Druck):** 3 mm rundum empfohlen — beim Export aus dem Druckprogramm auf 91 × 61 mm skalieren
- **Sicherheitsabstand zum Rand:** 5 mm
- **Dateien:** SVG, vektor-basiert, beliebig skalierbar

## Designkonzept

### Vorderseite (Navy Deep — Autorität, Vertrauen)
Visuelle Hauptaussage: **Der Vektor selbst.** Aus dem Ursprung (kleiner Cyan-Kreis) zieht ein dünner gerichteter Pfeil diagonal nach rechts oben zum Endpunkt-Label „WIRKUNG". Der Markenname wird damit nicht erklärt, sondern gezeigt. Subtiles Koordinatensystem (5% Opazität) im Hintergrund liefert den „Technical Edge" ohne aufdringlich zu sein.

- Großer WV-Glyph oben links (Hanken Grotesk 700)
- Eyebrow „KI · GOVERNANCE · WIRKUNG" als Kategorisierung
- Name in der unteren Hälfte (52px, dominant)
- Rolle in Slate-Ton darunter
- Cyan-Akzentlinie als „Anker" unter dem Namen

### Rückseite (Off-White — Sachlich, klar lesbar)
Klassische Kontaktseite, klar strukturiert in zwei Spalten. Vertikale Vector-Teal-Akzentleiste links als Wiedererkennungsmerkmal. Mini-Vektor unten rechts als Signatur — schließt visuell die Klammer zur Vorderseite.

- Wortmarke + Claim oben
- Kontakt-Eyebrow in Teal
- Zwei Spalten Kontaktdaten mit Label-Caps in Slate Light
- Footer-Zeile mit Positionierung

## Verwendete Markenfarben

| Farbe | Hex | Wo |
|---|---|---|
| Navy Deep | `#0F172A` | Vorderseite Hintergrund |
| Off-White | `#F7F9FB` | Rückseite Hintergrund |
| Impact Cyan | `#22D3EE` | Vorderseite Akzent (Dark-Mode-Regel) |
| Vector Teal | `#0D9488` | Rückseite Akzent (Light-Mode-Regel) |
| White / Slate Mid / Slate Light | `#FFFFFF` / `#475569` / `#94A3B8` | Typografie-Hierarchie |

## Typografie

- Headlines (Name, Wortmarke, Glyph): **Hanken Grotesk** 700
- UI-Labels / Eyebrows: **Inter** 600, Letter-Spacing weit
- Body / Kontaktdaten: **Inter** 400/500

## Offene Punkte

- [ ] Telefonnummer ergänzen (Platzhalter „+49 — bitte ergänzen" auf Rückseite)
- [ ] LinkedIn-Handle ergänzen (Platzhalter „linkedin.com/in/…")
- [ ] Druckerei wählen (Empfehlung: hochwertiges 350g Naturpapier, leicht strukturiert; alternativ Soft-Touch-Lamination für Premium-Haptik)
- [ ] Beim Druck: Fonts entweder einbetten oder vorher in Pfade konvertieren (Inkscape: „Text → In Pfad umwandeln") — sonst greift der Druckerei-Standardfont
- [ ] PDF-Export für Druck erstellen (Inkscape oder Affinity Designer öffnen → PDF X-1a oder X-4)

## Dateien

- `visitenkarte-vorderseite.svg` — Navy Hauptseite mit Name + Vektor-Grafik
- `visitenkarte-rueckseite.svg` — Off-White Kontaktseite

## Druckvorbereitung (Empfehlung)

1. SVGs in Affinity Designer / Inkscape / Illustrator öffnen
2. Text in Pfade konvertieren (sichert die Schrift beim Druck)
3. 3 mm Beschnittzugabe (Bleed) hinzufügen — Hintergrundflächen entsprechend erweitern
4. CMYK-Konvertierung (Navy `#0F172A` ≈ C90 M80 Y50 K70; Teal `#0D9488` ≈ C82 M20 Y50 K0; Cyan `#22D3EE` ≈ C70 M0 Y15 K0) — Druckerei-spezifisch prüfen
5. Export als PDF X-1a oder X-4
