/* ==========================================================================
   WirkVektor — Website 2 „Industrie-Zoom"
   Scroll-Choreografie der vier Akte:
   01 Industrie → 02 Unternehmen (Zoom) → 03 Prozesse → 04 Wirkung
   Alles ist scroll-gebunden (Scrubbing): kein Timer steuert die Inszenierung,
   nur die Fließ-Impulse in Akt 4 laufen als CSS-Loop (reduced-motion: aus).
   ========================================================================== */

(function () {
  'use strict';

  // ---------- Helpers ----------
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  // Anteil von p innerhalb [a, b] mit Smoothstep-Glättung
  const ramp = (p, a, b) => {
    const t = clamp((p - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };

  // ---------- DOM ----------
  const stage = document.querySelector('[data-stage]');
  const sticky = stage.querySelector('.stage__sticky');
  const header = document.querySelector('[data-header]');

  const scene1 = stage.querySelector('[data-scene="industrie"]');
  const scene2 = stage.querySelector('[data-scene="firma"]');
  const zoom1 = stage.querySelector('[data-zoom="industrie"]');
  const zoom2 = stage.querySelector('[data-zoom="firma"]');
  const zielring = stage.querySelector('[data-el="zielring"]');

  const caps = [1, 2, 3, 4].map((n) => stage.querySelector(`[data-cap="${n}"]`));
  const rail = [1, 2, 3, 4].map((n) => stage.querySelector(`[data-rail="${n}"]`));

  const nodes = Array.from(stage.querySelectorAll('[data-node]'));
  const links = Array.from(stage.querySelectorAll('[data-link]'));
  const kiLayer = stage.querySelector('[data-layer="ki"]');
  const kiHub = stage.querySelector('[data-kihub]');
  const kiLinks = Array.from(stage.querySelectorAll('[data-kilink]'));
  const kiFlow = stage.querySelector('[data-kiflow]');
  const stats = Array.from(stage.querySelectorAll('[data-stat]'));
  const counters = Array.from(stage.querySelectorAll('[data-count]'));
  const ketteLayer = stage.querySelector('[data-layer="kette"]');

  // Zoom-Zentren (SVG-Koordinaten)
  const Z1 = { x: 800, y: 540 }; // Zielgebäude in der Skyline
  const Z2 = { x: 800, y: 470 }; // Mitte des Querschnitts

  // ---------- Akt-Grenzen (Scroll-Fortschritt 0..1) ----------
  const ACT = {
    zoomStart: 0.16,
    zoomEnd: 0.38,
    nodesStart: 0.46,
    nodesEnd: 0.64,
    kiStart: 0.68,
    statsStart: 0.84,
  };

  function setScale(el, s, cx, cy) {
    el.setAttribute('transform', `translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})`);
  }

  function showCap(el, on, opacity, shift) {
    el.style.opacity = String(opacity);
    el.style.transform = window.matchMedia('(max-width: 767px)').matches
      ? `translateY(${shift}px)`
      : `translateY(calc(-50% + ${shift}px))`;
    el.setAttribute('aria-hidden', on ? 'false' : 'true');
  }

  // Caption ein- und ausblenden: [inStart..inEnd] rein, [outStart..outEnd] raus
  function capWindow(el, p, inStart, inEnd, outStart, outEnd) {
    let o;
    if (outStart === null) {
      o = ramp(p, inStart, inEnd);
    } else {
      o = ramp(p, inStart, inEnd) * (1 - ramp(p, outStart, outEnd));
    }
    const shift = lerp(24, 0, ramp(p, inStart, inEnd));
    showCap(el, o > 0.5, o, shift);
  }

  // ---------- Haupt-Update ----------
  let stageTop = 0;
  let stageScrollable = 1;

  function measure() {
    const rect = stage.getBoundingClientRect();
    stageTop = rect.top + window.scrollY;
    stageScrollable = stage.offsetHeight - window.innerHeight;
  }

  function update() {
    const p = clamp((window.scrollY - stageTop) / stageScrollable, 0, 1);

    // --- Szene 1: sanfter Anflug, dann Zoom ins Zielgebäude ---
    const approach = lerp(1, 1.12, ramp(p, 0, ACT.zoomStart));
    const dive = lerp(0, 6, ramp(p, ACT.zoomStart, ACT.zoomEnd));
    setScale(zoom1, approach + dive, Z1.x, Z1.y);
    scene1.style.opacity = String(1 - ramp(p, 0.27, 0.36));
    zielring.style.opacity = String(ramp(p, 0.05, 0.12) * (1 - ramp(p, ACT.zoomStart, 0.26)));

    // --- Szene 2: aus dem Zoom heraus aufblenden ---
    const grow = lerp(0.55, 1, ramp(p, 0.2, 0.42)) + lerp(0, 0.05, ramp(p, 0.42, 1));
    setScale(zoom2, grow, Z2.x, Z2.y);
    scene2.style.opacity = String(ramp(p, 0.28, 0.38));

    // --- Akt 3: Prozess-Stationen und manuelle Kette gestaffelt ---
    const span = (ACT.nodesEnd - ACT.nodesStart) / nodes.length;
    nodes.forEach((node, i) => {
      const a = ACT.nodesStart + i * span;
      const o = ramp(p, a, a + span * 1.4);
      node.style.opacity = String(o);
    });
    links.forEach((link, i) => {
      const a = ACT.nodesStart + (i + 0.6) * span;
      // In Akt 4 tritt die manuelle Kette zurück, die Automatisierung übernimmt
      const o = ramp(p, a, a + span * 1.4) * (1 - 0.7 * ramp(p, ACT.kiStart, ACT.kiStart + 0.08));
      link.style.opacity = String(o);
    });

    // --- Akt 4: KI-Hub verbindet sich, Wirkung entfaltet sich ---
    kiLayer.style.opacity = String(ramp(p, ACT.kiStart, ACT.kiStart + 0.05));
    const hubScale = lerp(0.6, 1, ramp(p, ACT.kiStart, ACT.kiStart + 0.07));
    kiHub.setAttribute('transform', `translate(800 470) scale(${hubScale})`);

    kiLinks.forEach((link, i) => {
      const a = ACT.kiStart + 0.04 + i * 0.012;
      const draw = ramp(p, a, a + 0.07);
      link.style.strokeDashoffset = String(1 - draw);
      link.style.strokeDasharray = '1';
      link.style.opacity = draw > 0 ? '0.8' : '0';
    });

    stats.forEach((stat, i) => {
      const a = ACT.statsStart + i * 0.025;
      const o = ramp(p, a, a + 0.07);
      stat.style.opacity = String(o);
    });
    counters.forEach((c, i) => {
      const a = ACT.statsStart + i * 0.025;
      // Fenster endet vor p=1, damit jeder Zähler seinen Zielwert sicher erreicht
      const t = ramp(p, a, Math.min(a + 0.1, 0.99));
      const target = Number(c.dataset.count);
      c.textContent = `${c.dataset.prefix}${Math.round(target * t)}${c.dataset.suffix}`;
    });

    kiFlow.style.opacity = String(ramp(p, ACT.statsStart, ACT.statsStart + 0.06) * 0.9);
    sticky.classList.toggle('is-flowing', p > ACT.statsStart);

    // --- Captions ---
    capWindow(caps[0], p, -0.01, -0.005, 0.13, 0.19); // ab Start voll sichtbar
    capWindow(caps[1], p, 0.26, 0.32, 0.44, 0.5);
    capWindow(caps[2], p, 0.5, 0.56, 0.66, 0.72);
    capWindow(caps[3], p, 0.74, 0.8, null, null);

    // --- Akt-Navigation ---
    const act = p < 0.24 ? 0 : p < 0.48 ? 1 : p < ACT.kiStart ? 2 : 3;
    rail.forEach((li, i) => li.classList.toggle('is-active', i === act));

    // --- Header ---
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }

  // ---------- Wiring ----------
  let raf = 0;
  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      update();
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    measure();
    update();
  });

  measure();
  update();
})();
