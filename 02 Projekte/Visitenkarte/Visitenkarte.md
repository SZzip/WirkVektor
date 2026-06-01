---
tags: [projekt, marketing, branding]
status: aktiv
date: 2026-06-01
---

# Visitenkarte

## Ziel

Hochwertige Visitenkarten für **WirkVektor KI Beratungsgesellschaft mbH** / Sebastian Schucht. Doppelseitig, druckfertig, voll im Markensystem (siehe `DESIGN.md`). Veredelungen wie Heißfolienprägung, Blindprägung und Spot-UV/Glanzlack sind ausdrücklich erlaubt — die Konzepte sind so angelegt, dass jede Druckerei mit den nötigen technischen Vorgaben weiterarbeiten kann.

## Personendaten

- **Firma:** WirkVektor KI Beratungsgesellschaft mbH
- **Name:** Sebastian Schucht
- **Rolle:** Geschäftsführer
- **Adresse:** Leitenstr. 18, 84048 Mainburg
- **Telefon:** +49 176 20 139 739
- **E-Mail:** sebastian.schucht@wirkvektor.de
- **Web:** wirkvektor.de

## Format

- **Querformat:** 85 × 55 mm (viewBox `0 0 850 550`)
- **Hochformat:** 55 × 85 mm (viewBox `0 0 550 850`)
- **Bleed für Druck:** +3 mm rundum (91 × 61 mm bzw. 61 × 91 mm)
- **Sicherheitsabstand:** 5 mm zu den Schnittkanten

## Die 10 Designs

| # | Name | Format | Stil-Inspiration | Veredelung-Empfehlung |
|---|---|---|---|---|
| **01** | Statement Glyph | Hochformat | Award Hospitality | Heißfolie auf Glyph (Cyan-Metallic), Blindprägung der Wortmarke auf Rückseite |
| **02** | Embossed Wordmark | Querformat | dwell well | Letterpress-Prägung (Wortmarke), Off-White Edge mit Teal-Kante (Edge-Print) |
| **03** | Tonal Sophistication | Querformat, abgerundete Ecken | TrustedOne | Spot UV auf Wortmarke + Glyph (Rückseite), Foil Cyan (Vorderseite) |
| **04** | Foil Glyph | Querformat | BoldtCast | Heißfolienprägung Cyan/Teal-Verlauf auf zentralem Glyph |
| **05** | Minimal QR | Querformat | wizible | QR-Code als vCard, Blindprägung Wortmarke auf Rückseite |
| **06** | Vertical Authority | Hochformat | eigene Variante | Heißfolie Cyan auf Box + Wortmarke, Edge-Print Teal |
| **07** | Editorial Quiet | Querformat | eigene Variante | Optional: Spot UV auf Name, blindgeprägtes Muster auf Rückseite |
| **08** | Split Identity | Querformat | eigene Variante | Vollflächiger Teal-Block, Edge-Color Teal |
| **09** | Technical Grid | Querformat | eigene Variante | Reiner Druck, optional Spot UV auf Wortmarke |
| **10** | Pure Wordmark | Querformat | eigene Variante | Spot-UV-Glanzlack auf Wortmarke (Vorderseite komplett ruhig, nur Glanz erzeugt das Statement) |

## Empfehlungen aus Designer-Sicht

**Wenn nur ein Design:** **03 Tonal Sophistication** oder **10 Pure Wordmark** — beide tragen am stärksten die WirkVektor-Werte „Klarheit, Verlässlichkeit, Kompetenz" und nutzen Veredelung intelligent statt dekorativ.

**Wenn zwei Sets gedruckt werden sollen:** **02 Embossed Wordmark** (Hauptset, Akquise) + **05 Minimal QR** (für digitale Übergabe per Scan).

**Wenn maximales Statement gewünscht:** **04 Foil Glyph** — die metallische Heißfolienprägung auf dem WV-Glyph wirkt auf Augenhöhe mit High-End-Beratungen.

## Veredelungs-Glossar (zur Bestellung bei der Druckerei)

| Effekt | Was es ist | Im Design |
|---|---|---|
| **Heißfolienprägung** (Hot Foil) | Metallische Folie wird heiß auf das Papier gepresst | Cyan/Teal-Verläufe simulieren in 03, 04, 06 |
| **Blindprägung** (Embossing) | Relief im Papier ohne Farbe — nur Tastsinn + Lichtspiel | Wortmarke / Glyph auf 02, 05 Rückseite |
| **Letterpress** (Tiefprägung) | Buchdruck mit Stempel-Vertiefung | Wortmarke auf 02 Vorderseite |
| **Spot UV / Glanzlack** | Selektiver Klarlack — gleiche Farbe, anderer Glanz | Wortmarke auf 03 Rückseite, 10 Vorderseite |
| **Edge-Print / Color Edge** | Eingefärbte Kanten der Karte | Empfohlen für 02, 03, 06, 08 (Teal/Cyan) |

## Empfohlene Spezifikationen

- **Papier:** 600 g/m² Naturpapier (z. B. Gmund Cotton Max White oder GF Smith Colorplan Ebony für Navy-only Karten), alternativ Soft-Touch-Lamination auf 350 g
- **Farbsystem:** CMYK + ggf. Pantone-Sonderfarben für exakten Markenton (Navy `#0F172A` und Teal `#0D9488` lassen sich am sichersten über Pantone definieren)
- **Druckverfahren:** Offset (ab 250 Stück) oder Letterpress (ab 100 Stück, höhere Premium-Wirkung)
- **Endformat:** 85 × 55 mm (DIN) oder 91 × 55 mm (USA), Klassik
- **Empfohlene Auflage:** Start mit 250 Stück (Akquise-Vorrat 6–9 Monate)

## Druckvorbereitung

1. Wunsch-Design auswählen
2. SVG in Affinity Designer / Illustrator öffnen
3. **Text in Pfade konvertieren** (Affinity: „Ebene → In Kurven umwandeln") — sonst greift bei der Druckerei ein Fallback-Font
4. **3 mm Bleed** hinzufügen (Hintergrundfläche verlängern)
5. CMYK-Konvertierung — empfohlene Werte:
   - Navy Deep `#0F172A` → C90 M82 Y50 K70 (oder Pantone Black 6 C)
   - Vector Teal `#0D9488` → C82 M20 Y50 K3 (oder Pantone 7716 C)
   - Impact Cyan `#22D3EE` → C70 M0 Y15 K0 (oder Pantone 305 C)
   - Off-White `#F7F9FB` → Naturweiß / unbedruckter Papierton
6. Export als **PDF/X-4** mit eingebetteten Profilen
7. Veredelungs-Maskenebenen separat exportieren (Heißfolie und Spot UV in Sonderebenen `MASK_FOIL`, `MASK_SPOTUV`)

## Empfohlene Druckereien (DE)

- **Letterpress / High-End:** Letterpress-Manufaktur, Wir machen Druck Premium
- **Heißfolie / Spot UV:** Saxoprint Premium, Diedruckerei.de Edelflächen
- **Schnelle Standard-Aufträge:** Onlineprinters.com, Flyeralarm Premium-Linie

## Dateien

```
Designs/
├── 01-statement-glyph-vorne.svg + hinten.svg      (Hochformat)
├── 02-embossed-wordmark-vorne.svg + hinten.svg    (Querformat)
├── 03-tonal-sophistication-vorne.svg + hinten.svg (Querformat, abgerundet)
├── 04-foil-glyph-vorne.svg + hinten.svg           (Querformat)
├── 05-minimal-qr-vorne.svg + hinten.svg           (Querformat)
├── 06-vertical-authority-vorne.svg + hinten.svg   (Hochformat)
├── 07-editorial-quiet-vorne.svg + hinten.svg      (Querformat)
├── 08-split-identity-vorne.svg + hinten.svg       (Querformat)
├── 09-technical-grid-vorne.svg + hinten.svg       (Querformat)
└── 10-pure-wordmark-vorne.svg + hinten.svg        (Querformat)
```

Die früheren Entwürfe `visitenkarte-vorderseite.svg` / `visitenkarte-rueckseite.svg` (v1) bleiben zunächst im Ordner — können bei Auswahl eines neuen Designs entfernt werden.
