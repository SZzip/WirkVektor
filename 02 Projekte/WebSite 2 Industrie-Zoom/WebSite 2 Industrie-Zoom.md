---
tags: [projekt, website, marketing]
status: aktiv
date: 2026-06-11
---

# WebSite 2 Industrie-Zoom

Zweite WirkVektor-Website nach dem Vorbild von [vectrfl.com](https://www.vectrfl.com/) — eine scroll-gesteuerte Erzählung, die von der Industrieansicht ins Unternehmen hineinzoomt und dort die Automatisierung der Prozesse als Entfaltung von Wirkung inszeniert.

> **Für die Weiterentwicklung:** Die ausführliche technische Dokumentation (Architektur, Welt-Layout, Akt-Timing, Pitfalls, Deployment, offene Punkte) steht in der [[02 Projekte/WebSite 2 Industrie-Zoom/CLAUDE|CLAUDE.md]] dieses Ordners.

## Konzept

Eine gepinnte Scroll-Bühne als 3D-Kamerafahrt (nach dem Vorbild von vectrfl.com), die den Weg des Beraters erzählt — ein leuchtender Teal-Pfad zieht durch eine helle Low-Poly-Welt, die Kamera folgt ihm, die umliegende Szene reagiert. Danach klassische Inhaltssektionen:

1. **Ankommen** — der Berater kommt ins Unternehmen: Kamerafahrt durch eine weiße Stadt, das KMU-Gebäude ist mit Cyan-Kanten, Label und gestricheltem Ring markiert; der Pfad führt zum Eingang.
2. **Verstehen** — der Pfad zieht durch die acht Prozess-Stationen (Anfrage → Angebot → Auftrag → Planung → Fertigung → Lieferung → Rechnung → Service); passierte Stationen aktivieren sich (Cyan-Ring, Label).
3. **Umsetzen** — Kachel-Feld mit KI-Hub im Zentrum: der Hub erwacht, Verbindungslinien und Impulse fließen zu den Prozesskacheln.
4. **Wirkung** — der Pfad mündet in den großen Vektor-Pfeil (Chevron mit Cyan-Diamanten), die Studien-Kennzahlen zählen hoch (+14 %, +59 %, ~55 %, ~75 %).

Alle Überschriften und Texte stammen aus der ersten Website ([[Inhaltskonzept OnePager]] bzw. `02 Projekte/WebSite aufbauen/site/`). Farben und Typografie folgen [[DESIGN]] (Light-Theme: Off-White, Navy Deep, Vector Teal/Impact Cyan, Hanken Grotesk/Inter); Footer und Closing dunkel mit riesigem WIRKVEKTOR-Wortzug.

## Technik

- Statische Site ohne Build-Tooling: `site/index.html` + `styles.css` + `main.js`, Bibliotheken lokal unter `site/lib/` (Three.js 0.170 als ES-Modul, GSAP 3.12 + ScrollTrigger als klassische Skripte).
- Eine durchgehende Three.js-Welt entlang der x-Achse; Kamera-Keyframes und Pfad-Fortschritt werden über GSAP ScrollTrigger gescrubbt (sticky Bühne, 780vh). Der Pfad ist eine `TubeGeometry` entlang einer CatmullRom-Kurve, der Fortschritt läuft über `setDrawRange`; Anker-Punkte koppeln Pfad und Kamera-Erzählung.
- Wichtig auf hellem Hintergrund: kein Additive Blending für Glow-Effekte (weiß + Licht = unsichtbar) — stattdessen normale Alpha-Sprites und `toneMapped: false` für markenfarbtreue Pfad-/Glow-Materialien.
- `prefers-reduced-motion` stoppt alle zeitbasierten Loops (Hub-Rotation, Impulse, Puls); die Inszenierung bleibt rein scroll-gesteuert. Kennzahlen-Caveat (Studienquellen) steht in der Pakete-Sektion.

## Abgrenzung zur ersten Website

Die erste Website ([[Website aufbauen]]) bleibt der seriöse OnePager mit zurückhaltender Motion. Diese zweite Site ist das erzählerische Gegenstück mit einer einzigen großen Inszenierung — gedacht als Experiment, Kampagnen-Variante oder alternative Startseite.

## Status

- 2026-06-11: Erste Version (SVG/CSS, ohne Dependencies) gebaut und verifiziert.
- 2026-06-11: Neuaufbau als Three.js/GSAP-Kamerafahrt nach Video-Referenz der vectrfl-Scrollanimation; Erzählung umgestellt auf die Berater-Geschichte (Ankommen → Verstehen → Umsetzen → Wirkung). Alle vier Akte, Mobile und Footer im Browser verifiziert.
- 2026-06-11: **Diese Site ist jetzt die produktive Website.** Die Vorgängerversion (`02 Projekte/WebSite aufbauen/site/`, Vite/TypeScript-OnePager) wurde entfernt; der Deploy-Workflow (`.github/workflows/deploy.yml`) spiegelt diesen Ordner ohne Build-Schritt per SFTP auf Hetzner (wirkvektor.de). Impressum als statische Seite (`impressum.html`) und `.htaccess` aus der Vorgängerversion übernommen.
- Offen: Datenschutz-Seite (Link zeigt noch auf `#`); Handelsregister-/USt-ID-Angaben im Impressum folgen nach Eintragung.
