---
tags: [projekt, website, status]
status: aktiv
erstellt: 2026-05-28
aktualisiert: 2026-05-28
projekt: "[[Website aufbauen]]"
---

# PROGRESS — Website aufbauen

## Stand 2026-05-28

OnePager-Scaffold steht. Allen 11 Sektionen aus [[Inhaltskonzept OnePager]] sind als statische Website unter `site/` umgesetzt, Texte und Headlines wörtlich übernommen, Designsystem nach [[DESIGN]] (Navy Deep, Vector Teal, Hanken Grotesk + Inter). Build und Tests sind grün, der Code liegt auf Branch `claude/website-project-folder-Qh7Tz` und im Draft-PR #5.

---

## Erledigt

### Konzept
- [x] Sitemap, Inhaltskonzept OnePager, Asset-Liste erstellt
- [x] Tonalität und Schreibstil definiert (siehe [[Schreibstil]])
- [x] Designsystem dokumentiert (siehe [[DESIGN]])

### Technisches Setup
- [x] Tech-Stack-Entscheidung: Vite + TypeScript (strict) + GSAP/ScrollTrigger + Lenis + Zod
- [x] Code-Ort: `02 Projekte/WebSite aufbauen/site/`
- [x] Projektstruktur scaffolded (siehe `site/`)
- [x] CSS-Designtokens aus [[DESIGN]] als Custom Properties
- [x] ESLint + Prettier + Vitest + TypeScript-strict konfiguriert

### Implementierung (alle 11 Sektionen)
- [x] Sektion 0 — Logo-Intro (sticky WV-Glyph mit Parallax)
- [x] Sektion 1 — Hero (Claim, Subline, 2 CTAs, Hero-Vektor-SVG, Trust-Strip)
- [x] Sektion 2 — Hebel (Headline, 3 Absätze, 2 Clip-Reveal-Bilder)
- [x] Sektion 3 — Methodik (Carousel mit 2 Slides, Parallax-Background)
- [x] Sektion 4 — Haltung (Dark, Werte-Card mit 4 Grundsätzen)
- [x] Sektion 5 — Zielgruppe (Dark, 4 Role-Cards-Grid)
- [x] Sektion 6 — Befähigung (Dark, Carousel mit 5 Slides)
- [x] Sektion 7 — Wirkung (2 Mockups, Outcome-Liste mit Merken-Funktion)
- [x] Sektion 8 — Über Sebastian (Portrait, Bio, Zitat, Mini-Links)
- [x] Sektion 9 — Closing-CTA (Dark, zentriert, 2 CTAs)
- [x] Sektion 10 — Kontakt (Direktinfos + Form mit Zod-Validation)
- [x] Sektion 11 — Footer (Dark, 4 Spalten + Bottom-Bar)

### Komponenten
- [x] Sticky Header mit Hide-on-Scroll und Bookmark-Counter
- [x] 3 Modals: Menü (full-page), Rückruf (side), Mein KI-Plan (side)
- [x] Carousel mit Touch- und Tastatur-Steuerung
- [x] Kontakt- und Callback-Form mit Zod-Schema, Field-Errors, Success-State
- [x] Bookmark-Liste mit localStorage-Persistenz
- [x] Theme-Observer für Light/Dark-Wechsel pro Sektion
- [x] Reveal-on-View mit IntersectionObserver
- [x] Parallax-Backgrounds und Clip-Reveal via GSAP/ScrollTrigger
- [x] `prefers-reduced-motion`-Handling (deaktiviert Lenis, Parallax, Reveal)

### Platzhalter-Assets (eigene SVGs im WV-Designsystem)
- [x] Hero-Vektor-Konstruktion (isometrisch, Navy + Teal, 1px-Stroke)
- [x] Sebastian-Portrait (4:5, abstrakte Komposition)
- [x] Whiteboard-Detail
- [x] Workshop-Szene
- [x] Führungssituation am Tisch
- [x] 2 Mockups: KI-Readiness-Bericht und Use-Case-Matrix
- [x] 2 Section-Backgrounds: Architektur-Linien und Glasfassade
- [x] Logo-SVGs (vollständig + Glyph-only für Mobile)
- [x] Icon-Sprite (Menu, Close, Bookmark, Phone, Arrows, External, Plus, Check)
- [x] Favicon

### Qualitätssicherung
- [x] `npm run typecheck` — grün
- [x] `npm run lint` — grün
- [x] `npm run test` — 10 von 10 Tests grün (Content-Schema-Validation, Reveal-Stubs, Hype-Wort-Check)
- [x] `npm run build` — Production-Bundle: 48 KB HTML, 23 KB CSS, 201 KB JS
- [x] `npm run dev` — Vite Dev-Server startet sauber

### Versionierung
- [x] Code commitet und gepusht auf `claude/website-project-folder-Qh7Tz`
- [x] Draft-PR #5 angelegt: https://github.com/SZzip/WirkVektor/pull/5

---

## Offen

### Deployment
- [x] Deployment-Weg entschieden: **GitHub Actions** (Workflow `.github/workflows/deploy.yml`)
- [x] Recherche: KonsoleH bietet keine REST-Upload-API, ausgehender SFTP aus Cloud-Session blockiert — Actions ist nachhaltigster Weg
- [ ] **GitHub-Secrets im Repo eintragen** (Settings → Secrets and variables → Actions):
  - `SFTP_HOST` = `www639.your-server.de`
  - `SFTP_USER` = `kistiz_0`
  - `SFTP_PASSWORD` = aktuelles KonsoleH-Passwort
  - `SFTP_REMOTE_PATH` = absoluter Zielpfad auf dem Webhosting (z. B. `/public_html/` — exakter Pfad steht im KonsoleH unter „FTP/SSH-Zugang")
- [ ] Optional: GitHub-Environment `production` mit Required-Reviewer anlegen, damit Deploys eine manuelle Freigabe brauchen
- [ ] Ersten Workflow-Lauf via `workflow_dispatch` manuell auslösen und Ergebnis prüfen
- [ ] **Sicherheitspunkt:** SFTP-Passwort wurde im Chat geteilt — nach erstem Deployment im KonsoleH rotieren und in GitHub-Secret aktualisieren
- [ ] Mittelfristig: SFTP-Passwort durch SSH-Key ersetzen (KonsoleH → Public Key hinterlegen, Action auf `ssh_private_key` umstellen)
- [ ] HTTPS via Let's Encrypt im KonsoleH aktivieren (1-Klick)
- [ ] Optionale `.htaccess` für gzip, Cache-Header und HTTPS-Redirect anlegen
- [ ] Domain `wirkvektor.de` mit der Hetzner-Webhosting-Instanz verbinden (Nameserver oder A-Records)

### Echte Assets (laut [[Asset-Liste]] Phase 2 und 3)
- [ ] Sebastian Schucht — professionelles Portrait (4:5, neutral, 1000×1250)
- [ ] Foto-Shoot: Whiteboard, Workshop-Hände, Führungssituation, Schulung
- [ ] 5 Carousel-Bilder für Sektion 6 (Befähigung)
- [ ] Hochwertige Mockups: KI-Readiness-Bericht und Use-Case-Matrix als finale Bildversion
- [ ] Stock-Bilder für Section-Backgrounds (Architektur, Glas) — wenn keine Eigenproduktion
- [ ] OG-Image (1200×630) mit Hero-Vektor und Claim

### Inhaltliche Platzhalter (im HTML sichtbar markiert)
- [ ] Telefonnummer ergänzen
- [ ] Geschäftsanschrift ergänzen
- [ ] Calendly-Link einsetzen (aktuell `#` als href)
- [ ] LinkedIn-Profil-URL prüfen (aktuell `linkedin.com/in/sebastianschucht`)
- [ ] Impressum-Seite anlegen und verlinken
- [ ] Datenschutz-Seite anlegen und verlinken
- [ ] Cookie-Einstellungs-Mechanik (Phase 2)

### Backend
- [ ] Form-Endpoint einrichten (Formspree, Mailgun, oder eigener Endpoint)
- [ ] Kontakt-Form an Endpoint anschließen (aktuell nur Validation + Inline-Success)
- [ ] Callback-Form an Endpoint anschließen
- [ ] Spam-Schutz (Honeypot oder hCaptcha)

### Vor Launch
- [ ] Manuelle Browser-Verifikation: Chrome, Firefox, Safari (Desktop + iOS Safari + Android Chrome)
- [ ] Theme-Wechsel zwischen Sektionen visuell sauber
- [ ] Carousel-Touch auf Mobile funktioniert
- [ ] Form-Validation mit allen Edge-Cases (leere Felder, falsche E-Mail, DSGVO-Vergessen)
- [ ] Bookmark-Liste persistiert über Reload
- [ ] Lighthouse-Audit: a11y ≥ 95, Performance ≥ 80, SEO ≥ 95
- [ ] Analytics (Plausible, privacy-first) integrieren — Phase 2

---

## Entscheidungen

| Entscheidung | Rationale |
|---|---|
| Vite + TS + GSAP/Lenis statt WebGL | OnePager braucht kein WebGL. Vorgabe der `site/CLAUDE.md` explizit als ersetzbar markiert. |
| Code in `site/`-Unterordner des Projekts | Hält Vault und Site-Code zusammen, klar zugeordnet |
| Eigene SVG-Platzhalter statt Stock | Stock-Bilder widersprechen den Schreibstil-Regeln (keine posed office, keine fake smiles). SVGs sind im WV-Designsystem und sofort austauschbar. |
| Alle 11 Sektionen im ersten Wurf | Vollständige Story sichtbar, Iteration leichter |
| Self-hosted Google Fonts via CDN (vorerst) | Schneller Start. Self-Hosting kann in Phase 2 nachgereicht werden für DSGVO-Konformität ohne Cookie-Banner. |
| Deployment via GitHub Actions statt lokalem `deploy.sh` | KonsoleH hat keine Upload-API, ausgehender SFTP aus der Cloud-Session ist gesperrt. Actions baut nach jedem Push auf `main`, deployt via SFTP mit Repo-Secrets. Credentials liegen nicht lokal, jeder Stand ist reproduzierbar. |

---

## Nächste Schritte (priorisiert)

1. **GitHub-Secrets eintragen** (`SFTP_HOST`, `SFTP_USER`, `SFTP_PASSWORD`, `SFTP_REMOTE_PATH`)
2. **Ersten Deploy via `workflow_dispatch` auslösen** und Ergebnis unter `www639.your-server.de` prüfen
3. **Passwort rotieren** im KonsoleH und in GitHub-Secret aktualisieren
4. **Domain `wirkvektor.de` verbinden** + HTTPS via Let's Encrypt aktivieren
5. **Sebastian-Portrait** organisieren (höchste Sichtbarkeit, derzeit schwächster Platzhalter)
6. **Impressum + Datenschutz** texten — Pflicht vor Launch
7. **Form-Backend** anbinden (Formspree als schnellster Weg)
8. **Manuelle Browser-Tests** auf realen Geräten
