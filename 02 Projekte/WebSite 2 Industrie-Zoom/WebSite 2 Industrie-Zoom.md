---
tags: [projekt, website, marketing]
status: aktiv
date: 2026-06-11
---

# WebSite 2 Industrie-Zoom

Zweite WirkVektor-Website nach dem Vorbild von [vectrfl.com](https://www.vectrfl.com/) — eine scroll-gesteuerte Erzählung, die von der Industrieansicht ins Unternehmen hineinzoomt und dort die Automatisierung der Prozesse als Entfaltung von Wirkung inszeniert.

## Konzept

Eine gepinnte Scroll-Bühne in vier Akten, danach klassische Inhaltssektionen:

1. **Industrie** — Skyline mit Branchen (Fertigung, Logistik, Handel, Dienstleistung), das Mittelstandsgebäude in der Mitte ist als Zoom-Ziel markiert.
2. **Unternehmen** — die Kamera zoomt in das Gebäude, die Fassade weicht einem Querschnitt mit drei Etagen (Vertrieb & Auftrag, Planung & Service, Fertigung & Abwicklung).
3. **Prozesse** — die Prozesskette erscheint Station für Station als Ring: Anfrage → Angebot → Auftrag → Planung → Fertigung → Lieferung → Rechnung → Service, verbunden durch gestrichelte „manuelle" Übergaben.
4. **Wirkung** — ein KI-Hub im Zentrum verbindet sich mit allen Stationen, Impulse fließen, die manuellen Übergaben treten zurück und die Studien-Kennzahlen der ersten Website zählen hoch (+14 %, +59 %, ~55 %, ~75 %).

Alle Überschriften und Texte stammen wörtlich aus der ersten Website ([[Inhaltskonzept OnePager]] bzw. `02 Projekte/WebSite aufbauen/site/`). Farben, Typografie und Linien-Ästhetik folgen [[DESIGN]] (Dark-Theme: Navy Deep, Impact Cyan, Hanken Grotesk/Inter).

## Technik

- Statische Site ohne Build-Tooling: `site/index.html` + `styles.css` + `main.js` — direkt im Browser zu öffnen.
- Animation komplett scroll-gebunden (Scrubbing über eine sticky Bühne, 560vh): kein Timer steuert die Inszenierung; nur die Fließ-Impulse in Akt 4 laufen als CSS-Loop.
- SVG-Linien bleiben beim Kamera-Zoom haarfein (`vector-effect: non-scaling-stroke`).
- `prefers-reduced-motion` deaktiviert Loops und Hint-Animation; ohne JavaScript bleibt der Hero lesbar.
- Keine Dependencies, keine Frameworks.

## Abgrenzung zur ersten Website

Die erste Website ([[Website aufbauen]]) bleibt der seriöse OnePager mit zurückhaltender Motion. Diese zweite Site ist das erzählerische Gegenstück mit einer einzigen großen Inszenierung — gedacht als Experiment, Kampagnen-Variante oder alternative Startseite.

## Status

- 2026-06-11: Erste Version gebaut und im Browser verifiziert (vier Akte, Sektionen, Footer).
- Offen: Entscheidung, ob und wo die Variante deployt wird; Impressums-/Datenschutz-Links zeigen auf die Pfade der Hauptseite.
