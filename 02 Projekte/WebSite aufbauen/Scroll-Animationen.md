---
tags: [projekt, website, animation, scroll, referenz]
status: aktiv
erstellt: 2026-05-28
projekt: "[[Website aufbauen]]"
referenz: "aircenter.space"
---

# Scroll-Animationen — Analyse & Übertragung

> Vollständige Analyse aller Scroll-Trigger und Animations-Parameter auf [aircenter.space](https://aircenter.space) und die konkrete Übertragung auf jede Sektion des WirkVektor-OnePagers.

Quelle der Analyse: das HTML-Markup und der Webpack-Build (`shared_v=1778590395.js`, `landing_v=1778590395.js`, `global_v=1778590395.css`, `landing_v=1778590395.css`) aus dem Save-Web2Zip-Snapshot.

---

## 1. Mechanik aircenter.space

aircenter.space (Studio Tekta) basiert auf einer modifizierten **Locomotive-Scroll-Pipeline** mit proprietärem **Parallax-Pattern-System**. Animationen werden ausschließlich über HTML-Data-Attribute deklariert; die JS-Engine löst sie per Scroll-Listener auf.

### Trigger-Familie 1: Scroll-Container

| Attribut | Funktion |
|---|---|
| `data-scroll-section` | Markiert eine Sektion, die in den Scroll-Manager aufgenommen wird. Pflicht für jede Section. |
| `data-scroll` | Markiert ein Element als animierbar. |
| `data-scroll-sticky` | Pinnt das Element so lange am Viewport, bis die Section-Höhe abgescrollt ist. Pendant zu `position: sticky` mit zusätzlichem Scroll-Progress-Tracking. |
| `data-sticky-bottom-enable-mq="sm-down"` | Sticky nur unterhalb breakpoint `sm`. |

### Trigger-Familie 2: Parallax-Patterns

| Attribut | Funktion |
|---|---|
| `data-parallax-pattern="name"` | Verknüpft das Element mit einer benannten Pattern-Definition (z. B. `landingIntroFade`). Mehrere Patterns sind Space-separated kombinierbar. |
| `data-parallax-clamp="true\|false"` | Werte außerhalb der Keyframes werden geklemmt (true) oder extrapoliert (false). |
| `data-parallax-measure-selector=".section"` | Bezugselement für die Scroll-Progress-Berechnung. Häufig `.section`, `.sticky` oder `picture`. |
| `data-parallax-enable-mq="sm-down\|md-up\|null"` | Aktiv nur in bestimmtem Breakpoint. `null` = immer aktiv. |
| `data-parallax-enable-not-smooth-scroll="false"` | Aus, wenn Smooth-Scroll deaktiviert ist (Touch). |
| `data-parallax-first / -last / -index` | Reihenfolge-Marker für Pattern-Ketten (`first`, `last`, Slot-Index). |

### Trigger-Familie 3: Reveal-Patterns

| Attribut | Funktion |
|---|---|
| `data-reveal="text"` | Text fadet beim Eintritt ein (Default-Threshold). |
| `data-reveal="image-in"` | Bild fadet aus blur in (Eintritt ab unterer Viewport-Kante). |
| `data-reveal="image-in-fullscreen"` | Bild deckt den Viewport vollflächig; Blur 20 px → 0 beim Hereinscrollen. |
| `data-reveal-visible="true"` | Bypass: schon initial sichtbar. |
| `data-reveal-threshold="0"` | Intersection-Threshold (Default 0). |
| `data-reveal-group` | Mehrere Elemente werden synchron revealed. |

### Parallax-Pattern-Notation

Die Keyframes heißen `parallax-A-B` (CSS-Syntax `data-parallax-A-B`):

- **A** = Scroll-Position der Element-Oberkante relativ zum Viewport, in Prozent (`0` = unten, `100` = oben, negative Werte = Element bereits über dem Viewport hinausgescrollt).
- **B** = Scroll-Position der Element-Unterkante relativ zur unteren Viewport-Kante.

Beispiele:

| Keyframe | Bedeutung |
|---|---|
| `parallax-0-0` | Element-Oberkante an unterer Viewport-Kante (Element scrollt gerade rein) |
| `parallax-100-0` | Element-Oberkante an oberer Viewport-Kante (vollständig drin) |
| `parallax-100-100` | Element komplett drin, Unterkante deckt sich mit oberer Viewport-Kante |
| `parallax--80-0` | Element bereits 80 % über dem Viewport hinausgescrollt |

Zwischen zwei Keyframes wird mit den angegebenen Easings interpoliert. Verfügbare Easings im Build: `easeInExpo`, `easeOutExpo`, `easeInOutExpo`, `easeInQuad`, `easeOutQuad`, `easeInOutQuad`, `easeInCubic`, `easeOutCubic`, `easeInOutCubic`, `easeSection` (quadratisch über Section-Progress), `easeSectionInverse` (invers).

---

## 2. Pattern-Bibliothek (alle 19 Patterns)

Direkt extrahiert aus `shared_v=1778590395.js`. Format pro Pattern: `Trigger-Bezug` · `Keyframes` · `Effekt`.

### 2.1 Sektion „Intro" (Logo-Vorhang)

#### `landingIntroFade`
- `clamp:true`, `measureSelector:".section"`, `enableMq:null`
- `parallax-0-0` → `opacity:1`
- `parallax--80-0` → `opacity:0`
- **Effekt:** Logo + Intro-Text bleiben voll sichtbar, fadet erst, wenn die Section 80 % über den Viewport hinaus ist.

#### `landingIntroMove`
- `clamp:true`, `enableMq:"md-up"`
- `parallax-0-0` → `translateY(0%)`
- `parallax--80-0` → `translateY(40%)`
- **Effekt:** Logo/Headline bewegt sich beim Wegscrollen 40 % nach unten (Parallax-Drag, Desktop only).

#### `landingIntroLogoA / I / R` (jeweils Mobile-Variante)
- `clamp:true`, `measureSelector:".section"`, Easing `easeOutQuad`
- 4 Keyframes pro Buchstabe: bewegt sich beim Wegscrollen aus der Ausgangsposition in eine kleinere Skala (`scale(50/140)`) und an einen Ziel-Slot in der Nav-Leiste.
- **Effekt:** Hero-Logo „A I R" verkleinert sich beim Scroll auf Nav-Größe und positioniert sich oben. Klassische **Logo-Morph-Animation**.

### 2.2 Sektion „Impulse"

#### `landingImpulseIntroImage`
- `clamp:true`, `measureSelector:".section"`
- `parallax-100-0` → `translateY(-16.666%)`
- `parallax--100-0` → `translateY(16.666%)`
- **Effekt:** Hero-Bild bewegt sich entgegengesetzt zum Scroll um ±16,6 % der eigenen Höhe (sanfter Parallax-Crop).

#### `landingImpulseImageImageFirst`
- `clamp:true`, `measureSelector:".sticky"`
- `parallax-150-0` → `translateY(-8.333%)`, Easing `easeSection`
- `parallax-0-0` → `translateY(0%)`
- `parallax-100-100` → `translateY(-16.666%)`
- **Effekt:** Erstes Sticky-Bild wandert beim Hochscrollen langsam nach oben aus dem sticky-Layer heraus.

#### `landingImpulseImageImageSecond`
- `parallax-0-0` → `translateY(0%)`
- `parallax-100-100` → `translateY(-16.666%)`
- **Effekt:** Zweites Sticky-Bild folgt minimal versetzt — erzeugt das „Stapel-mit-Tiefe"-Gefühl.

#### `landingImpulseImageClip` / `landingImpulseImageClipMobile`
- `clamp:true`, `measureSelector:".sticky"`, `enableMq:"md-up"`
- `parallax-0-0` → `clipPath:inset(100% 0% 0% 0%)`
- `parallax-200-100` → `clipPath:inset(0% 0% 0% 0%)`
- **Effekt:** Bild wird von unten nach oben aufgedeckt (vertikale Clip-Reveal über doppelte Section-Höhe).

### 2.3 Sektion „Format"

#### `landingFormatImageWrapper` (dynamisch berechnet)
- Skaliert das Bildwrapper über vier Keyframes zwischen *kleinerem Bezugsraster* (`scale(i)`) und *Vollbreite* (`scale(s)`) — abhängig von Grid-Gutter und Viewport-Breite.
- Easing: `easeInOutQuad`
- **Effekt:** Bild wächst beim Hereinscrollen von der Spaltenbreite auf Full-Bleed und schrumpft beim Verlassen wieder zurück. Cinematischer „Reveal-and-Crop".

#### `landingFormatImageScale`
- `parallax-100-0` → `scale(1.25)`, `transformOrigin:50% 0%`, `easeInOutQuad`
- `parallax-30-0` → `scale(1)`, `transformOrigin:50% 0%`
- `parallax--1-0` → `scale(1)`, `transformOrigin:50% 100%`, `easeInOutQuad`
- `parallax-0-100` → `scale(1.25)`, `transformOrigin:50% 100%`
- **Effekt:** Subtiler Ken-Burns-Zoom (1.25× → 1× → 1× → 1.25×), Drehpunkt flipt von oben nach unten.

#### `landingFormatImage`
- `clamp:true`, `measureSelector:"picture"`
- `parallax-100-0` → `translateY(-28%)`
- `parallax-0-100` → `translateY(0%)`
- **Effekt:** Bild verschiebt sich um −28 % der eigenen Höhe (klassischer Parallax-Pan über die gesamte Section-Reise).

#### `landingFormatBackground`
- `enableTouch:false`, `clamp:true`, `measureSelector:".sticky"`, Easing `easeSectionInverse`
- `parallax-200-100` → `translateY(0%)`
- `parallax-100-100` → `translateY(20%)`
- **Effekt:** Hintergrund schiebt sich beim Sticky-Aufenthalt 20 % nach unten — der Vordergrund wirkt dadurch „leichter".

#### `landingFormatCounter`
- `easeSectionInverse`
- `parallax-200-100` → `translateX(0vw)`
- `parallax-150-100` → `translateX(25vw)`
- **Effekt:** Slide-Zähler (1/2) gleitet horizontal um 25 vw — visuelles Pendant zum Slide-Wechsel.

### 2.4 Sektion „Harmony"

#### `landingHarmonyBackground`
- `clamp:true`, `measureSelector:".sticky, .section"`
- `parallax-100-0` → `translateY(-40svh)`
- `parallax-0-100` → `translateY(40svh)`
- **Effekt:** Großer Background-Slow-Pan von ±40 svh über die gesamte Section. Sehr großzügiger Parallax — nur sinnvoll bei großflächigen Architektur-Bildern.

### 2.5 Sektion „Status"

#### `landingStatusBackground`
- `clamp:true`, `measureSelector:".sticky"`, 5 Keyframes
- `parallax-100-0` → `translateY(-14svh)` (easeSection)
- `parallax-0-0` → `translateY(-7svh)` (easeSectionInverse)
- `parallax-100-100` → `translateY(-7svh)` (easeSectionInverse)
- `parallax-0-100` → `translateY(0svh)`
- `parallax--100-100` → `translateY(14svh)`
- **Effekt:** Mehrstufiger Background-Drift mit „Atempause" während des Sticky-Aufenthalts.

### 2.6 Generische Sektion-Verbinder

#### `sectionToSticky`
- `enableTouch:false`, `clamp:true`, `measureSelector:".sticky"`, `easeSectionInverse`
- Keyframes dynamisch: `parallax-(100−e)-0` → `translateY(-50svh)`, `parallax-(0−e)-0` → `translateY(0svh)`
- **Effekt:** Section verschiebt sich um −50 svh nach oben, während sie in den Sticky-Layer eintritt — erzeugt den Eindruck, dass die nächste Section „darunter herauskommt".

#### `sectionFromSticky`
- `easeSection`
- `parallax-100-100` → `translateY(0svh)`
- `parallax-0-100` → `translateY(50svh)`
- **Effekt:** Section gleitet beim Verlassen 50 svh nach unten — Gegenstück zu `sectionToSticky`.

#### `sectionFromStickyHalfUnderNext`
- `parallax-200-100` → `translateY(0svh)` (easeSectionInverse)
- `parallax-150-100` → `translateY(-25svh)`
- `parallax-100-100` → `translateY(-75svh)`
- **Effekt:** Halbe Überlappung: Die abgehende Section bleibt für einen Moment unter der neuen sichtbar.

### 2.7 Hilfs-Patterns

#### `imageMove`
- `enableMq:"md-up"`, `measureSelector:"picture, .parallax-image-move"`
- Berechnet aus Slider- vs. Bildhöhe einen Translate-Y oder Translate-X, sodass das Bild perfekt durch sein Crop-Fenster wandert.
- **Effekt:** Pixelgenaue Parallax ohne Whitespace.

#### `imageSliderImage`
- `clamp:true`, `measureSelector:".sticky"`
- Kontextabhängig: prüft, ob der Slider in einer `sectionToSticky`- oder `sectionFromSticky`-Kette liegt, und wendet die jeweiligen Translate-Frames an. Fallback: lineares Progress-Mapping.
- **Effekt:** Slider-Bilder synchronisieren sich mit dem Section-Pin-Lebenszyklus.

---

## 3. Reveal-Konventionen aircenter.space

| Reveal-Typ | Initial-Style | Animation |
|---|---|---|
| `text` | `opacity:0.005` (DOM-präsent, unsichtbar) | `opacity → 1`, kurze CSS-Transition |
| `image-in` | `opacity:0.005` | `opacity → 1` ab Intersection |
| `image-in-fullscreen` | `filter:blur(20px)`, weißer Text | `filter:none`, Text bleibt weiß |
| `reveal-group` | Container-Trigger | Mehrere Elemente sync revealed |

Trigger via IntersectionObserver, Standard-Threshold `0`, `rootMargin:0px 0px ${vh/2}px 0px` (Element wird ab Bildmitte aktiviert).

---

## 4. Übertragung auf den WirkVektor-OnePager

### 4.1 Stack-Mapping

Das aircenter-System ist nicht 1:1 auf den WirkVektor-Stack (Lenis + GSAP ScrollTrigger + IntersectionObserver) übertragbar — aber jede Animation hat ein direktes GSAP-Pendant:

| aircenter | WirkVektor-Stack |
|---|---|
| `data-scroll-section` | implizit über `data-section` (existiert bereits) |
| `data-scroll-sticky` | GSAP `ScrollTrigger.create({ pin:true })` |
| `data-parallax-pattern="…"` | GSAP `gsap.fromTo(…, { scrollTrigger:{ trigger, start, end, scrub:true } })` |
| `data-reveal="text"` | bereits implementiert in `revealOnView.ts` (IntersectionObserver) |
| `data-reveal="image-in-fullscreen"` | neu: Blur-Reveal über IntersectionObserver |
| `data-parallax-clamp:true` | GSAP-Default `scrub:true` ist bereits geklemmt |
| Easings (`easeSection`) | GSAP-Pendants: `power2.inOut`, `power2.in`, `power1.in` |

### 4.2 Notations-Konvention für WirkVektor

Wir bleiben bei den schlanken Data-Attributen, die `scrollTrigger.ts` heute schon kennt — erweitert um zwei zusätzliche Hooks:

| Attribut | Vorhanden? | Bedeutung |
|---|---|---|
| `data-reveal` | ✅ | Fade + 24 px Y, 800 ms |
| `data-reveal-delay="1\|2\|3"` | ✅ | Staffel-Delay 100/200/300 ms |
| `data-clip-reveal` | ✅ | Vertikaler Clip-Reveal von unten |
| `data-parallax="0.12"` | ✅ | yPercent ±N × 100 mit `scrub:true` |
| `data-pin` | ⚠️ neu | Section wird gepinnt (`ScrollTrigger.pin`) |
| `data-image-blur-in` | ⚠️ neu | Blur 16 px → 0 beim Reveal (image-in-fullscreen-Pendant) |

Erweiterungen ausschließlich dort einbauen, wo die Sektion eine klar erkennbare inhaltliche Funktion stützt (siehe Sektions-Mapping unten). Keine Pattern-Inflation.

### 4.3 Pro-Sektion-Mapping

Reihenfolge folgt [[Sitemap]]. Jede Zeile nennt: aircenter-Pendant · empfohlenes Pattern · Parameter · Begründung.

#### Section 0 — Logo-Intro (`section.intro`)

**Aircenter-Pendant:** `landingIntroFade` + `landingIntroMove` + `landingIntroLogo*`.

**WirkVektor-Empfehlung:**

| Element | Trigger | Pattern | Parameter |
|---|---|---|---|
| `.intro__glyph` (WV) | aktiv schon `data-parallax="0.1"` | Halten | yPercent ±10, scrub true. **Reduzieren** statt erweitern — wir wollen kein Logo-Morph, das Glyph bleibt nur dezent in Position. |
| `.intro__sub` („Die Architektur wirksamer KI.") | neu: `data-reveal` | Fade-up | 24 px Y, 800 ms ease-out, **delay-1** für die ruhige Choreografie unter dem Glyph. |
| `section.intro` gesamt | optional: leichter Fade-out beim Wegscrollen | GSAP `to({ opacity: 0.4, scrollTrigger:{ trigger, start:'bottom bottom', end:'bottom top', scrub:true } })` | Übergibt das Bild ruhig an Section 1. **Optional**, nur wenn Hero direkt darunter „weiß sticht". |

**Bewusst weggelassen:** Logo-Morph (zu showy für sachliche Wirkung), 40 %-Translate (überzogen).

#### Section 1 — Hero (`#hero`)

**Aircenter-Pendant:** Reveal-Group für Headline-Zeilen, `landingIntroFade` für Subline.

**WirkVektor-Empfehlung — bereits korrekt verdrahtet:**

| Element | Trigger | Pattern | Parameter |
|---|---|---|---|
| `.eyebrow` | `data-reveal` | Fade-up | ✅ Default |
| `.hero__display` | `data-reveal data-reveal-delay="1"` | Fade-up gestaffelt | ✅ Default + 100 ms |
| `.hero__subline` | `data-reveal data-reveal-delay="2"` | Fade-up gestaffelt | ✅ Default + 200 ms |
| `.hero__ctas` | `data-reveal data-reveal-delay="3"` | Fade-up gestaffelt | ✅ Default + 300 ms |
| `.hero__visual` (SVG) | `data-reveal data-reveal-delay="2"` | Fade-up | ✅ Default + 200 ms |
| `.hero__trust` | `data-reveal` (per `data-render`) | Fade-up | ✅ |

**Optionale Ergänzung:** Headline-Zeilen pro `<br/>` einzeln staggern (Split: 3 × Span statt 1 × H1, jeweils `data-reveal-delay`). Erzeugt das „Architektur entsteht Zeile für Zeile"-Bild ohne Overhead. **Empfehlung: ja**, weil es die zentrale Marken-Aussage trägt.

#### Section 2 — Hebel (`#hebel`)

**Aircenter-Pendant:** `landingImpulseImageClip` (vertikale Clip-Reveal für Cards) + `landingImpulseImageImageFirst/Second` (Stapel-Versatz).

**WirkVektor-Empfehlung:**

| Element | Trigger | Pattern | Parameter |
|---|---|---|---|
| Text-Spalte (eyebrow, h2, body, CTA) | bereits `data-reveal[-delay]` | Fade-up | ✅ |
| `.hebel__visual` (Card 1 + 2) | bereits `data-clip-reveal` | Vertikaler Clip-Reveal | ✅ — aircenter-Pendant exakt getroffen |
| **Ergänzen:** Card 2 mit `data-clip-reveal-delay="200"` (neue Option) oder zweite ScrollTrigger-Definition mit `+= 200ms` | optional | Stapel-Versatz | Card 2 startet 200 ms nach Card 1 — Stapel wirkt „aufgeblättert". |
| **Optional:** sehr leichter Y-Parallax auf Card 2 (`data-parallax="0.06"`) | neu | Tiefen-Effekt | Card 2 driftet minimal langsamer als Card 1 → Tiefe ohne Layout-Shift. Maß: 6 % der Section-Höhe. |

**Bewusst weggelassen:** Sticky-Pinning des Card-Stapels (aircenter pinnt; bei uns wäre die Höhe zu kurz und der Pin würde Lesefluss stören).

#### Section 3 — Methodik (`#methodik`)

**Aircenter-Pendant:** `landingFormatImage*` (Hintergrund-Pan + Scale) + `landingFormatCounter` (Counter-Slide) + `sectionToSticky` für Sticky-Phase.

**WirkVektor-Empfehlung:**

| Element | Trigger | Pattern | Parameter |
|---|---|---|---|
| `.methodik__bg` (Grid-SVG) | bereits `data-parallax="0.18"` | Parallax-Y | ✅ — entspricht aircenter `landingFormatImage` mit −18 % |
| Text-Header (eyebrow, h2, body) | bereits `data-reveal[-delay]` | Fade-up | ✅ |
| `.carousel` Wrapper | bereits `data-reveal data-reveal-delay="2"` | Fade-up | ✅ |
| **Carousel-Counter** „1 / 2" | optional: leichter X-Slide beim Slide-Wechsel (CSS-Transition statt Scroll-Trigger) | Counter-Slide | `translateX(-8px → 0)`, 300 ms, ease-out — Pendant zu `landingFormatCounter`, aber Slide-getriggert nicht scroll-getriggert. |
| **Section-Hintergrund** als sehr dezenter Scale (`data-parallax-scale="0.04"`) | optional/neu | Zoom-In bei Eintritt | scale 1 → 1.04 über Section-Reise, scrub. **Empfehlung: nicht einbauen** — Risiko von Kanten-Artefakten und Layout-Shift. |

**Bewusst weggelassen:** `landingFormatImageWrapper` (dynamisches Spaltenraster → komplex, ohne SVG-Wirkungsgewinn), `landingFormatImageScale` (Ken-Burns 1.25×), Sticky-Pin (Carousel ist bereits selbst der „Sticky-Anker" durch Slide-Counter).

#### Section 4 — Haltung (`#haltung`, dark)

**Aircenter-Pendant:** `landingHarmonyBackground` (±40 svh Background-Drift) + `data-reveal="image-in-fullscreen"` für den Hintergrund.

**WirkVektor-Empfehlung:**

| Element | Trigger | Pattern | Parameter |
|---|---|---|---|
| `.haltung__bg` (Architektur-SVG) | bereits `data-parallax="0.2"` | Parallax-Y | ✅ — entspricht 20 % der Section-Höhe, deckt sich mit Sitemap-Limit „max 20 svh" |
| Headline & Sub-Button | bereits `data-reveal[-delay]` | Fade-up | ✅ |
| `.values-card` | bereits `data-reveal data-reveal-delay="2"` | Fade-up | ✅ |
| **Ergänzen:** Werte-Card-Liste einzelne `<li>`-Staggerung | optional | Fade-up je Listenpunkt | Stagger 80 ms zwischen Items. **Empfehlung: ja**, weil die 4 Grundsätze das inhaltliche Statement sind. |
| **Optional:** Blur-Reveal auf Hintergrund-SVG (`data-image-blur-in`) | neu | Blur 12 px → 0 beim Eintritt | Eintritt einmalig, 600 ms. Pendant zu `image-in-fullscreen`. **Nur** wenn das Architektur-Foto später durch eine echte Aufnahme ersetzt wird — auf dem aktuellen SVG bringt es nichts. |

#### Section 5 — Zielgruppe (`#zielgruppe`, dark)

**Aircenter-Pendant:** `imageMove` für das Foto rechts + horizontal scroll-bound Cards-Slider (`landingFormatCounter`-artig).

**WirkVektor-Empfehlung:**

| Element | Trigger | Pattern | Parameter |
|---|---|---|---|
| Headline-Block | bereits `data-reveal[-delay]` | Fade-up | ✅ |
| `.zielgruppe__photo` | bereits `data-reveal` | Fade-up | ✅ |
| **Ergänzen:** Foto mit leichtem Parallax (`data-parallax="0.08"`) | neu | Vertikaler Drift | yPercent ±8 — entspricht dem aircenter `imageMove`-Effekt in dezent. |
| `.role-grid` (4 Karten) | bereits `data-reveal` | Fade-up | ✅ |
| **Ergänzen:** Karten gestaffelt mit Stagger 80 ms (sequenziell von links nach rechts oder oben nach unten) | neu | Stagger-Reveal | Erzeugt das Pendant zum aircenter-Horizontal-Slider — ohne tatsächlichen Scroll-Slider. |

**Bewusst weggelassen:** Horizontales Pin-Scrolling der Karten — bricht die vertikale Lese-Linearität.

#### Section 6 — Befähigung (`#befaehigung`, dark)

**Aircenter-Pendant:** `landingFormatBackground` + Sticky-Carousel mit cursor-getriggertem Slide-Wechsel.

**WirkVektor-Empfehlung:**

| Element | Trigger | Pattern | Parameter |
|---|---|---|---|
| `.befaehigung__bg` | bereits `data-parallax="0.15"` | Parallax-Y | ✅ |
| Text-Header | bereits `data-reveal[-delay]` | Fade-up | ✅ |
| `.carousel` (5 Slides) | bereits `data-reveal data-reveal-delay="2"` | Fade-up Container | ✅ |
| **Optional:** Pin der Carousel-Sektion (`data-pin` neu) und Slide-Wechsel an Scroll-Progress koppeln | neu | Scroll-Drive-Carousel | Section pinnt für `+= 100%` Scroll-Distanz; jeder Scroll-Schritt von 20 % wechselt einen Slide. **Empfehlung: nein** — bricht Tastatur- und A11y-Bedienung des Carousels. Stattdessen Pfeil-Buttons beibehalten. |

#### Section 7 — Wirkung (`#wirkung`)

**Aircenter-Pendant:** `landingImpulseImageClip` (vertikale Clip-Reveal) + `landingStatusBackground` (Background-Mehrstufen-Drift).

**WirkVektor-Empfehlung:**

| Element | Trigger | Pattern | Parameter |
|---|---|---|---|
| Headline + Body | bereits `data-reveal[-delay]` | Fade-up | ✅ |
| `.wirkung__mockup` (Mockup 1 + 2) | bereits `data-clip-reveal` | Vertikaler Clip-Reveal | ✅ — exakt aircenter-Pendant |
| **Ergänzen:** Mockups mit Stagger (Mockup 2 startet 250 ms nach Mockup 1) | optional | Sequenz | Sequentielle Aufdeckung. **Empfehlung: ja** — unterstützt das narrative „erst Bericht, dann Matrix". |
| `.outcome-list` (5 Statements) | bereits `data-reveal` | Fade-up | ✅ |
| **Ergänzen:** Liste-Items einzeln gestaffelt (Stagger 100 ms) | neu | Stagger-Reveal | Erzeugt das „Aufzählungs-Tempo". |
| Final-CTA | bereits `data-reveal` | Fade-up | ✅ |

#### Section 8 — Über Sebastian (`#ueber`)

**Aircenter-Pendant:** `data-reveal="image-in-fullscreen"` (Portrait) + Reveal-Group für Body-Text.

**WirkVektor-Empfehlung:**

| Element | Trigger | Pattern | Parameter |
|---|---|---|---|
| `.about__portrait` | bereits `data-clip-reveal` | Vertikaler Clip-Reveal | ✅ — passend, Portrait wird „von unten nach oben enthüllt" |
| **Alternativ:** `data-image-blur-in` statt clip-reveal | neu | Blur 16 px → 0 | Pendant zu `image-in-fullscreen`. **Empfehlung:** sobald echtes Foto vorhanden, Variante per A/B testen. Beim SVG-Platzhalter: clip-reveal beibehalten. |
| Eyebrow, h2, Subline, Body, Quote, Links | bereits `data-reveal[-delay]` | Fade-up gestaffelt | ✅ |

#### Section 9 — Closing-CTA (`#closing`, dark)

**Aircenter-Pendant:** Reveal-Group + leichter Background-Drift.

**WirkVektor-Empfehlung:**

| Element | Trigger | Pattern | Parameter |
|---|---|---|---|
| Eyebrow, Display, Sub, CTAs | bereits `data-reveal[-delay]` | Fade-up gestaffelt | ✅ |
| **Optional:** Display-Headline mit Per-Zeilen-Stagger (wie Section 1) | neu | Split-Fade-up | Stagger 120 ms — verstärkt den finalen Ruhepunkt vor dem CTA. **Empfehlung: ja**. |
| **Optional:** Sehr dezenter Background-Highlight-Slow-Pulse | nicht empfohlen | — | Verstößt gegen „keine Endlos-Loops". |

#### Section 10 — Kontakt (`#kontakt`)

**Aircenter-Pendant:** Standard-Reveal.

**WirkVektor-Empfehlung:**

| Element | Trigger | Pattern | Parameter |
|---|---|---|---|
| Headline-Block links | bereits `data-reveal[-delay]` | Fade-up | ✅ |
| Form-Block rechts | bereits `data-reveal[-delay]` | Fade-up | ✅ |
| **Optional:** Form-Felder einzeln gestaffelt | nicht empfohlen | — | Verwirrt im Formular-Kontext. Form-Container als Ganzes reveal genügt. |

#### Section 11 — Footer

**Aircenter-Pendant:** keiner (Footer ohne Scroll-Animation).

**WirkVektor-Empfehlung:** keine Reveal-Animation. Footer ist Information, nicht Inszenierung. ✅ — entspricht dem Status quo.

---

## 5. Empfohlene konkrete Implementierungs-Tickets

In Reihenfolge nach Wirkung-pro-Aufwand:

1. **Hero-Headline Per-Zeilen-Stagger** (Section 1) — höchste Wirkung, niedriger Aufwand. Headline in 3 Spans splitten, jede mit `data-reveal-delay="1\|2\|3"`. Akzent „KI." kommt zuletzt.
2. **Outcome-Liste Stagger** (Section 7) — die 5 Statements sind der inhaltliche Beweis und verdienen Tempo.
3. **Werte-Card Listenpunkt-Stagger** (Section 4) — vier Grundsätze sequenziell statt simultan.
4. **Hebel-Card-Stapel Sequenz** (Section 2) — Card 1 vor Card 2 (Delay 200 ms).
5. **Wirkung-Mockup-Sequenz** (Section 7) — Bericht vor Matrix.
6. **Zielgruppe-Foto Mikro-Parallax** (Section 5) — `data-parallax="0.08"`.
7. **Role-Grid-Karten Stagger** (Section 5) — 4 Karten sequenziell.
8. **Closing-Display Per-Zeilen-Stagger** (Section 9) — analog zu Hero.

Tickets 1–5 sind reine HTML/CSS-Änderungen (kein neuer JS-Code). Tickets 6–8 brauchen entweder Erweiterung von `revealOnView.ts` um ein `data-stagger`-Attribut oder eine GSAP-Stagger-Definition in `scrollTrigger.ts`.

## 6. Was bewusst NICHT übernommen wird

| aircenter-Effekt | Grund für die Ablehnung |
|---|---|
| Logo-Morph (`landingIntroLogo*`) | Showy, sachlicher Anspruch verletzt. |
| 40 % Background-Translate (`landingHarmonyBackground` ±40 svh) | Übersteigt Sitemap-Limit „max 20 svh". |
| `landingFormatImageScale` Ken-Burns 1.25× | Erzeugt subjektiv „Werbe-Optik". |
| `landingFormatImageWrapper` Grid-Skalierung | Komplex und ohne Wirkungsgewinn bei abstrakten SVGs. |
| Sticky-Pinning ganzer Sektionen | Bricht vertikalen Lesefluss; gefährdet Mobile-A11y. |
| Cursor-getriggerter Carousel-Slide-Change | A11y-Risiko; Tastatur-Bedienung ist Pflicht. |
| Horizontaler Scroll-Hijack (Role-Cards) | Bricht erwartete Scroll-Richtung. |
| WebGL-Bild-Carousel | CLAUDE.md schließt WebGL/Three.js explizit aus. |
| Endlos-/Loop-Animationen (Background-Pulse) | Verstoß gegen „keine Endlos-Loops" (CLAUDE.md). |

## 7. Globale Guardrails (gelten weiter)

- Alle neuen Animationen respektieren `prefers-reduced-motion: reduce` (entweder über `revealOnView.ts`-Pfad oder GSAP `gsap.registerPlugin(ScrollTrigger); ScrollTrigger.matchMedia` + Reduced-Motion-Query).
- Keine Animation darf Layout-Shifts (CLS) erzeugen — alle Parallax-Translates `yPercent`, keine `top`/`margin`-Animationen.
- Reveal-Animationen einmalig (kein Re-Trigger beim Hochscrollen) — Verhalten der bestehenden `revealOnView.ts` beibehalten.
- Performance-Budget aus CLAUDE.md (Initial JS < 100 KB gzipped) bleibt bindend. Neue Tickets dürfen GSAP-ScrollTrigger nicht aufblähen — alle bisherigen Patterns sind mit einer einzigen `gsap.utils.toArray('[data-…]').forEach()`-Initialisierung umzusetzen.
- Maximal **eine** GSAP-Timeline pro Section (kein verschachteltes Pinning).

## 8. Referenzen

- Sitemap & Theme-Folge: [[Sitemap]]
- Content pro Sektion: [[Inhaltskonzept OnePager]]
- Design-Tokens, Easings, Durations: [[DESIGN]] + `site/src/styles/tokens.css`
- Aktuelle JS-Mechanik: `site/src/scroll/lenis.ts`, `site/src/scroll/scrollTrigger.ts`, `site/src/scroll/revealOnView.ts`, `site/src/scroll/themeObserver.ts`
- CSS-Reveal-Definition: `site/src/styles/components.css:255-276`
