# CLAUDE.md — Website 2 „Industrie-Zoom" (Produktiv-Website)

## Projekt-Kontext

Dieses Verzeichnis enthält die **produktive WirkVektor-Website** — eine scroll-erzählte 3D-Inszenierung nach dem Vorbild von vectrfl.com. Der Code liegt in `site/`. Die Site hat am 2026-06-11 den Vite/TypeScript-OnePager (`02 Projekte/WebSite aufbauen/site/`, aus dem Repo entfernt) als Produktiv-Website abgelöst.

**Erzählung in vier Akten entlang einer Kamerafahrt:** Ein leuchtender Teal-Pfad (der Berater) zieht durch eine helle Low-Poly-Welt:

1. **Ankommen** — Stadt mit Windrädern, Autos und Figuren; das KMU-Gebäude („Ihr Unternehmen") färbt sich beim Scrollen über eine Sättigungs-Rampe von Weiß zu Teal/Navy.
2. **Verstehen** — der Pfad läuft seitlich an acht Prozess-Stationen vorbei (Ihre Geschäftsmodelle … Ihre Ziele), passierte Stationen aktivieren sich.
3. **Umsetzen** — ein BPMN-Prozessnetz (echter Auftragsprozess, ohne Texte) um einen KI-Hub; die Knoten färben sich als Front entlang des Pfads ein.
4. **Wirkung** — das extrudierte WirkVektor-Logo (SVG → 3D) erscheint, Kennzahlen zählen hoch, der Pfad läuft sichtbar in den Nebel-Horizont weiter.

Quelldokumente: Texte aus `02 Projekte/WebSite aufbauen/Inhaltskonzept OnePager.md` und `WirkVektor.md` (Repo-Wurzel), Schreibregeln in `00 Kontext/Schreibstil.md`, Designsystem in `DESIGN.md` (Repo-Wurzel). Video-Referenz der Original-Animation: `Aufzeichnung 2026-06-11 110706.mp4` (240 MB, **nur lokal** — mp4/mov/mkv stehen in der Root-`.gitignore`).

## Tech-Stack

- **Statische Site ohne Build-Tooling** — `index.html` + `styles.css` + `main.js`, direkt deploybar.
- **Three.js 0.170** als minifiziertes ES-Modul (`lib/three.module.min.js`), aufgelöst über eine **Importmap** (`"three"` → lokale Datei).
- **SVGLoader** (`lib/SVGLoader.js`, aus three/examples) für die Logo-Extrusion; importiert `'three'`, braucht also die Importmap.
- **GSAP 3.12 + ScrollTrigger** als klassische Skripte (`lib/gsap.min.js`, `lib/ScrollTrigger.min.js`), globale `gsap`/`ScrollTrigger`.
- **Fonts:** Hanken Grotesk (Display) + Inter (Body) via Google Fonts, `display=swap`.
- Kein Framework, kein Bundler, keine weiteren Dependencies.

**⚠ Importmap-Falle:** Die Importmap MUSS im `<head>` stehen, VOR den `modulepreload`-Links. Sobald ein Modul-Load startet, ignoriert der Browser später registrierte Importmaps — `import 'three'` schlägt dann ohne klare Fehlermeldung fehl (Symptom: Loader bleibt stehen, `ScrollTrigger.getAll()` leer).

## Dateistruktur

```
02 Projekte/WebSite 2 Industrie-Zoom/
├── CLAUDE.md                       Diese Datei
├── WebSite 2 Industrie-Zoom.md     Projekt-Notiz (Konzept, Status)
├── Aufzeichnung 2026-06-11 *.mp4   Video-Referenz (nur lokal, gitignored)
└── site/                           Deploy-Artefakt (1:1 gespiegelt)
    ├── index.html                  Bühne + Sektionen + Footer, Importmap
    ├── impressum.html              Eigenständige statische Seite (noindex)
    ├── styles.css                  Alle Styles, Design-Tokens nach DESIGN.md
    ├── main.js                     Gesamte 3D-Welt + Scroll-Logik (~1100 Zeilen)
    ├── .htaccess                   HTTPS/www-Redirects, gzip, Caching (Hetzner/Apache)
    ├── wirkvektor-logo.svg         Logo: 3 Pfade (2× #0f172a, 1× #0d9488), viewBox 1448
    └── lib/                        three.module.min.js, SVGLoader.js, gsap, ScrollTrigger
```

## Architektur von main.js

Alles lebt in einer async `main()`-Funktion; darunter reine Builder-Funktionen. Es gibt **keinen Timer für die Inszenierung** — alles ist an den Scroll-Fortschritt `p` gebunden (Scrubbing, vor- und rückwärts deterministisch). Nur Ambient-Loops (Windräder, Autos, Hub-Rotation, Impulse, Puls, Diamanten) laufen über die Clock und stoppen bei `prefers-reduced-motion` (`REDUCED`).

### Scroll-Mechanik

- `.stage` ist 780vh hoch, `.stage__sticky` klebt mit 100svh. Ein einziger `ScrollTrigger` (start `top top`, end `bottom bottom`) schreibt `state.p` (0..1).
- Der rAF-Loop (`frame()`) liest `state.p` und setzt JEDEN Frame alles: Kamera, Pfad-DrawRange, Akt-Zustände, DOM-Klassen (`applyUi`). Kein Tweening von Zuständen — alles ist Funktion von `p`.

### Akt-Grenzen (`ACTS`)

| Akt | from | to | Inhalt |
|---|---|---|---|
| 1 | 0.08 | 0.30 | Stadt → KMU |
| 2 | 0.30 | 0.57 | Prozess-Stationen |
| 3 | 0.57 | 0.79 | BPMN + KI-Hub |
| 4 | 0.79 | 1.01 | Logo + Kennzahlen |

Captions/Rail schalten mit **Vorlauf 0.025** vor den Akt-Grenzen (`applyUi`), der Hero blendet bei `p > 0.05` aus. Kennzahlen zählen `p 0.82 → 0.94` (`easeOut`).

### Welt-Layout (x-Achse = Erzählrichtung)

| Zone | x-Bereich | Inhalt |
|---|---|---|
| Stadt | −50 … 46 | Gebäude-Raster (Seed `mulberry32(7)`, deterministisch), Windräder bei z < −24, KMU bei (32, 0, 0), 8×12×8 |
| Stationen | 62 … 132 | 8 Zylinder im Zickzack z = ±6, Pfad passiert bei z = ±4.4 |
| BPMN-Feld | 142 … 186 | Auftragsprozess: Start → Erfassen → XOR (Ablehnungs-Ast z=10) → Angebot → AND-Split (Parallel-Ast z=−2) → AND-Join → Zwischenereignis → Ende; Hauptlane z=4; Hub-Sockel bei (165, 0) — Mittelkorridor |z| < 2.5 freihalten |
| Logo | 215 | Extrusion, `rotation.y = −0.5`, Basis-Höhe 6.4 |
| Horizont | bis 270 | Pfad läuft in den Nebel aus |

### Berater-Pfad

- `CatmullRomCurve3` (centripetal) über `pathPoints` — Route läuft an festen Objekten **vorbei, nie hindurch** (Bogen um das KMU, seitlich an Stationen, vor dem Logo vorbei bei z ≥ 4 im Bereich x 205–225).
- Zwei `TubeGeometry`s (700 Segmente, 8 radial): `tubeDim` (Teal, Spur) + `tubeBright` (Cyan, helles Fenster ~7 % hinter der Spitze). Fortschritt über `setDrawRange` — Indizes pro Tubular-Segment = `RADIAL * 6`.
- Spitze: Glow-Sprite (`makeGlowTexture('#14b8a6')`) + `PointLight` (Teal Bright). **Türkis, nicht Cyan/Weiß.**
- **Pfad-Kamera-Kopplung:** `PATH_MAP` mappt `p` → Kurvenparameter `u` über Anker (`uOf(weltpunkt)` = Arc-Length-Locator). Die Spitze ist immer dort, wo die Kamera hinschaut. Wer Welt-Geometrie verschiebt, muss die `PATH_MAP`-Anker und `pathPoints` mitziehen.

### Kamera

- `CAM`-Keyframes (`{p, pos, tgt}`) werden über `makeCamSampler` als CatmullRom-Kurven gesampelt (stückweise über p parametrisiert, kein Stop-and-go).
- **Desktop:** FOV 40, `setViewOffset(w, h, −w/6, 0, …)` → Blickziel/Spitze liegt auf der **rechten Drittel-Linie**; UI (Rail + Captions) sitzt zentriert auf der **linken Drittel-Linie**.
- **Portrait/Mobil** (`w < 768 || w/h < 0.9`): FOV 56, Kamera blickt direkt auf die Pfad-Spitze (Blend ab p 0.05), View-Offset `(0, −h/6)` → Spitze **horizontal mittig, vertikal auf der unteren Drittel-Linie**. Flag: `state.portrait`, gesetzt in `resize()`.
- Die Sonne (DirectionalLight mit Schatten, 2048er Map, ±70-Frustum) folgt dem Blickziel, damit Schatten dort scharf sind, wo man hinschaut.

### Reaktive Elemente (alles Funktion von p bzw. u)

- **KMU:** `setSaturation(q1)` — HSL-Rampe von Weiß (s=0, l=1) zum vollen Markenton (Teal-Korpus `#14B8A6`, Navy-Dach); Marker-Ring, weiße Kanten, Label und Emissive hängen an `smeOn` (p 0.06–0.13).
- **Stationen:** Ring/Emissive beim Passieren (`u`-Schwelle pro Station, eng), **Labels mit Vorlauf** (`+0.07` auf u, also lesbar bevor die Spitze ankommt).
- **BPMN-Knoten:** Einfärbung als **Front entlang des Pfads** — `a = clamp((headPos.x − node.x + 2.5) / 5)`. Weiß → Teal per `lerpColors`, Symbolik (Gateway-Marker, Event-Ringe, Pfeilspitzen) statisch in Slate `#475569`.
- **Hub:** Emissive/Glow/Links/Impulse über `q3`; `linkTargets` sind die BPMN-Knoten mit `distHub < 12`.
- **Logo-Finale:** Einblendung über `qL = clamp((p − 0.74) / 0.07)` — **vollständig sichtbar, wenn die Spitze die halbe Strecke Diagramm→Logo geschafft hat** (p ≈ 0.81). Materialfarben kommen direkt aus den SVG-Fills (Original-Logofarben), mit `emissive` in Eigenfarbe (0.4) + `toneMapped:false` für Markentreue. Fallback: Chevron, falls das SVG nicht lädt.
- **Stadtleben:** Autos auf **kollisionsbereinigten Routen** (Pfad-Schneise ±2.6 versetzt, gegen `footprints` aus `buildCity` aufgelöst, geglättet, erneut geprüft); Routen-Enden liegen **hinter hohen Gebäuden** (Verdeckung aus Süd-Kamerasicht), damit der Loop-Sprung unsichtbar ist. Autos sind vollständig weiß; Ausrichtung über Lookahead-Punkt (fährt vorwärts in Kurven). Zehn Figuren (Architekturmodell-Stil) mit 1–2 Markenfarben-Akzenten (Krawatte, Helm, Weste, Klemmbrett, Stethoskop), abseits des Pfad-Korridors platziert.

### Render-Regeln auf hellem Hintergrund (wichtigste Pitfalls)

1. **Kein Additive Blending** — auf Off-White addiert sich nichts sichtbar (weiß bleibt weiß). Glows sind normale Alpha-Sprites.
2. **`toneMapped: false`** für alle markenfarbtreuen Materialien (Pfad, Glows, Logo, Links) — ACES-Tone-Mapping entsättigt sonst.
3. Welt-Labels sind **Canvas-Sprites** (`makeLabelSprite`); sie warten beim Start auf `document.fonts.ready` (Race mit 1,5 s Timeout). `LABEL_SCALE` (×1.65 bei Viewport < 768 px) wird **einmal beim Laden** bestimmt — kein Rebuild bei Orientierungswechsel (bewusster Trade-off).

## UI / DOM

- **Rail** (`.stage__rail`): `<ol>` mit 4 Items; die **Caption-Karten stecken in den `<li>`** und klappen zwischen den Nummern auf (max-height-Transition). Karten-Optik wie die Kennzahlen (halbtransparent, Blur, Border, 8px-Radius). Desktop zentriert auf der linken Drittel-Linie, mobil oben links.
- **Kennzahlen** (`.stage__stats`): Desktop rechts unten, mobil 2×2-Raster am unteren Rand. Werte zählen über `data-count`/`data-prefix`/`data-suffix`.
- **Ladescreen** (`.loader`): blendet nach dem **ersten gerenderten Frame** aus; Fallbacks: 6-s-Timeout, WebGL-Fehlerpfad, `<noscript>`-Style.
- **Sektionen nach der Bühne:** Haltung (4 Karten), Methodik (6 Phasen), Pakete (mit Studien-Caveat — Kennzahlen sind Studienwerte, keine Garantien!), Closing (Navy), Footer mit riesigem WIRKVEKTOR-SVG-Wortzug. Reveal via IntersectionObserver (`[data-reveal]`).
- **Barrierefreiheit:** `prefers-reduced-motion` stoppt alle Loops (Inszenierung bleibt scroll-gesteuert), Captions tragen `aria-hidden` synchron zum Zustand, ohne JavaScript bleibt der Hero lesbar und der Loader versteckt.

## Design (Kurzreferenz, maßgeblich: DESIGN.md)

- Navy Deep `#0F172A` · Slate `#475569`/`#94A3B8` · **Vector Teal `#0D9488`** (Akzent) · Teal Bright `#14B8A6` · Impact Cyan `#22D3EE` · Off-White `#F7F9FB` · Border `#E2E8F0`
- Hanken Grotesk (Display, −0.02em) / Inter (Body) · Radius 4/8px · keine schweren Schatten
- Schreibstil: sachlich, klar, keine Hype-Sprache, keine überzogenen Versprechen.

## Entwicklung & Verifikation

- **Dev-Server:** `.claude/launch.json` → Konfiguration `website2` (`npx serve -l 4173 "02 Projekte/WebSite 2 Industrie-Zoom/site"`), per `preview_start` starten.
- **Akte ansteuern:** `window.scrollTo(0, f * ScrollTrigger.getAll()[0].end)` mit f ≈ 0 (Hero), 0.2 (Akt 1), 0.45 (Akt 2), 0.7 (Akt 3), 0.93 (Akt 4). Vorher `document.documentElement.style.scrollBehavior = 'auto'` setzen (CSS-Smooth-Scroll verfälscht sonst Sprünge).
- **Eigenheiten beim Testen:** `end` hängt von der Viewport-Höhe ab (780vh-Bühne); Viewport-Resizes lösen `ScrollTrigger.refresh()` mit Scroll-Restauration aus — Positionen danach neu setzen. Mobil immer frisch laden (LABEL_SCALE).
- Nach Änderungen: alle vier Akte + Hero + Footer durchscrollen, Konsole auf Fehler prüfen, Mobile-Viewport (375×812) gegenprüfen, Desktop-Gegenprobe (Drittel-Komposition).

## Deployment

- **Workflow:** `.github/workflows/deploy.yml` — Trigger: Push auf `main` mit Änderungen unter `02 Projekte/WebSite 2 Industrie-Zoom/site/**` (oder Workflow-Datei, oder manuell).
- **Kein Build:** der `site/`-Ordner wird 1:1 nach `_deploy` kopiert und per `lftp mirror --reverse --delete` auf Hetzner gespiegelt (wirkvektor.de). `--delete` entfernt Server-Altlasten — alles im Webroot, was nicht in `site/` liegt, wird gelöscht!
- **Secrets** (Environment `production`): `SFTP_HOST`, `SFTP_USER`, `SFTP_PASSWORD`, `SFTP_REMOTE_PATH`.
- `.htaccess` regelt HTTPS-Redirect, www→Apex, gzip, Caching.

## Offene Punkte

- **Datenschutz-Seite fehlt** (Footer-Link zeigt auf `#`) — vor/kurz nach Live-Gang ergänzen.
- Impressum: Handelsregister-Nummer und USt-ID folgen nach Eintragung (Platzhalter im Text).
- Fonts via Google CDN — Self-Hosting wäre DSGVO-sauberer (war auch beim Vorgänger als Phase 2 geplant).
- Kontakt-CTA ist `mailto:`/`tel:` — Calendly/Formular aus dem alten Konzept ist nicht übernommen.
- Logo-Finale mobil: Kamera folgt der Spitze, das Logo kann am Ende teilweise aus dem Bild wandern (bewusster Trade-off zugunsten der Spitzen-Verankerung).

## Was nicht in dieses Projekt gehört

- Build-Tooling, Bundler, Frameworks — die Site bleibt bewusst statisch und dependency-arm.
- Tracking-Skripte ohne explizite Freigabe (höchstens datenschutzfreundliche Lösungen wie Plausible).
- Hype-Sprache in Texten; neue Farben/Schriften außerhalb von DESIGN.md.
- Commits von Dateien > 100 MB (GitHub-Limit) — große Medien bleiben lokal (`.gitignore`).
