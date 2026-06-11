/* ============================================================
   WirkVektor — Website 2 „Industrie-Zoom"
   Three.js-Welt + GSAP-ScrollTrigger-Scrubbing.

   Erzählung in vier Akten entlang einer Kamerafahrt:
   01 Ankommen  — der Berater kommt ins Unternehmen (Stadt → KMU)
   02 Verstehen — der Weg durch die Prozess-Stationen
   03 Umsetzen  — der KI-Hub färbt das BPMN-Prozessnetz ein
   04 Wirkung   — der Pfad passiert das extrudierte Logo und läuft
                  in den Hintergrund, Kennzahlen zählen hoch
   ============================================================ */

import * as THREE from 'three';
import { SVGLoader } from './lib/SVGLoader.js';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const COLORS = {
  bg: 0xf7f9fb,
  ground: 0xedf1f6,
  building: 0xffffff,
  buildingAlt: 0xf1f5f9,
  edge: 0xcbd5e1,
  navy: 0x0f172a,
  teal: 0x0d9488,
  tealBright: 0x14b8a6,
  cyan: 0x22d3ee,
};

/* Akt-Grenzen (Scroll-Fortschritt 0..1) */
const ACTS = [
  { id: 1, from: 0.08, to: 0.3 },
  { id: 2, from: 0.3, to: 0.57 },
  { id: 3, from: 0.57, to: 0.79 },
  { id: 4, from: 0.79, to: 1.01 },
];

const STATIONS = [
  'IHRE GESCHÄFTSMODELLE', 'IHRE PRODUKTE', 'IHRE LEISTUNGEN', 'IHRE PROZESSE',
  'IHRE DATEN', 'IHRE IT-LANDSCHAFT', 'IHRE ZIELE', 'IHRE SERVICES',
];

const state = { p: 0, headPos: new THREE.Vector3() };

main();

async function main() {
  /* Canvas-Labels erst rendern, wenn die Webfonts da sind */
  try {
    await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);
  } catch (e) { /* Fallback-Font ist akzeptabel */ }

  const canvas = document.querySelector('[data-canvas]');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  } catch (e) {
    document.querySelector('[data-stage]').style.height = '100vh';
    return;
  }

  renderer.setClearColor(COLORS.bg);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(COLORS.bg, 60, 140);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 400);

  /* ---------- Licht ---------- */
  scene.add(new THREE.HemisphereLight(0xffffff, 0xdde5ee, 1.15));

  const sun = new THREE.DirectionalLight(0xffffff, 1.7);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -70;
  sun.shadow.camera.right = 70;
  sun.shadow.camera.top = 70;
  sun.shadow.camera.bottom = -70;
  sun.shadow.camera.far = 160;
  sun.shadow.bias = -0.0004;
  scene.add(sun, sun.target);

  /* ---------- Boden ---------- */
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(900, 500),
    new THREE.MeshStandardMaterial({ color: COLORS.ground, roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(120, 0, 0);
  ground.receiveShadow = true;
  scene.add(ground);

  /* ---------- Berater-Pfad ----------
     Läuft an festen Objekten VORBEI, nicht hindurch: ums KMU herum,
     seitlich an den Stationen entlang, am Logo vorbei in den Horizont. */
  const pathPoints = [
    [-48, 0.6, 8], [-34, 0.6, -6], [-18, 0.6, 9], [-2, 0.6, -7],
    [12, 0.6, 4], [22, 0.6, 1],
    /* Bogen um das KMU-Gebäude (Akt 1) */
    [26.5, 0.6, 3.2], [32, 0.6, 5.2], [38, 0.6, 3], [46, 0.6, 0],
    /* seitlich an den Prozess-Stationen vorbei (Akt 2) */
    [62, 0.6, -4.4], [72, 0.6, 4.4], [82, 0.6, -4.4], [92, 0.6, 4.4],
    [102, 0.6, -4.4], [112, 0.6, 4.4], [122, 0.6, -4.4], [132, 0.6, 4.4],
    /* BPMN-Feld (Akt 3) */
    [142, 0.7, 2], [154, 0.9, 0], [165, 2.2, 0],
    /* am Logo vorbei und in den Hintergrund (Akt 4) */
    [180, 2.6, 1], [196, 4, 3.6], [206, 5, 4.2], [216, 6, 4],
    [230, 7.5, 0], [248, 10, -10], [270, 14, -22],
  ].map((p) => new THREE.Vector3(...p));

  const pathCurve = new THREE.CatmullRomCurve3(pathPoints, false, 'centripetal');

  const TUBE_SEG = 700;
  const RADIAL = 8;
  const IDX_PER_SEG = RADIAL * 6;

  const tubeDim = new THREE.Mesh(
    new THREE.TubeGeometry(pathCurve, TUBE_SEG, 0.16, RADIAL, false),
    new THREE.MeshBasicMaterial({
      color: COLORS.teal, transparent: true, opacity: 0.55, toneMapped: false,
    })
  );
  const tubeBright = new THREE.Mesh(
    new THREE.TubeGeometry(pathCurve, TUBE_SEG, 0.24, RADIAL, false),
    new THREE.MeshBasicMaterial({
      color: COLORS.cyan, toneMapped: false, depthWrite: false,
    })
  );
  tubeDim.geometry.setDrawRange(0, 0);
  tubeBright.geometry.setDrawRange(0, 0);
  scene.add(tubeDim, tubeBright);

  /* Leuchtender Kopf des Pfads */
  const headSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture('#22d3ee'),
    transparent: true, depthWrite: false, toneMapped: false,
  }));
  headSprite.scale.set(3, 3, 1);
  scene.add(headSprite);

  const headLight = new THREE.PointLight(COLORS.cyan, 60, 22, 1.8);
  scene.add(headLight);

  /* Pfad-Parameter wichtiger Orte (per Arc-Length-Sampling) */
  const uOf = makeCurveLocator(pathCurve);

  /* ---------- Akt 1: Stadt + KMU ---------- */
  buildCity(scene, pathCurve);
  buildTurbines(scene);
  const sme = buildSme(scene);
  const uSme = uOf(new THREE.Vector3(26.5, 0.6, 3.2));

  /* ---------- Akt 2: Prozess-Stationen (Pfad läuft seitlich vorbei) ---------- */
  const stations = STATIONS.map((name, i) => {
    const pos = new THREE.Vector3(62 + i * 10, 0, i % 2 === 0 ? -6 : 6);
    const st = buildStation(scene, name, pos);
    st.u = uOf(new THREE.Vector3(pos.x, 0.6, Math.sign(pos.z) * 4.4));
    return st;
  });

  /* ---------- Akt 3: BPMN-Prozessnetz + KI-Hub ---------- */
  const field = buildBpmnField(scene);
  const hub = buildHub(scene, field.linkTargets);

  /* ---------- Akt 4: extrudiertes Logo ---------- */
  const finale = await buildFinale(scene);

  /* ---------- Kamera-Keyframes ---------- */
  const CAM = [
    { p: 0.0, pos: [-26, 34, 58], tgt: [4, 0, 0] },
    { p: 0.1, pos: [-16, 27, 50], tgt: [10, 1, 0] },
    { p: 0.26, pos: [6, 15, 32], tgt: [30, 5, 0] },
    { p: 0.34, pos: [44, 11, 24], tgt: [62, 1, -2] },
    { p: 0.46, pos: [84, 14, 30], tgt: [96, 1, 0] },
    { p: 0.55, pos: [120, 16, 30], tgt: [132, 1, 0] },
    { p: 0.66, pos: [142, 22, 34], tgt: [165, 0, 0] },
    { p: 0.76, pos: [152, 11, 17], tgt: [165, 2.5, 0] },
    { p: 0.88, pos: [178, 11, 28], tgt: [215, 6, 0] },
    { p: 1.0, pos: [188, 8, 18], tgt: [215, 6, 0] },
  ];
  const camSampler = makeCamSampler(CAM);

  /* Pfad-Fortschritt an die Kamera-Erzählung koppeln:
     der Berater ist immer dort, wo die Kamera gerade hinschaut */
  const PATH_MAP = [
    { p: 0.04, u: 0 },
    { p: 0.16, u: uOf(new THREE.Vector3(-2, 0.6, -7)) },
    { p: 0.26, u: uSme },
    { p: 0.31, u: uOf(new THREE.Vector3(46, 0.6, 0)) },
    { p: 0.46, u: uOf(new THREE.Vector3(92, 0.6, 4.4)) },
    { p: 0.58, u: uOf(new THREE.Vector3(134, 0.6, 4)) },
    { p: 0.74, u: uOf(new THREE.Vector3(165, 2.2, 0)) },
    { p: 0.88, u: uOf(new THREE.Vector3(216, 6, 4)) },
    { p: 1.0, u: 1 },
  ];

  function pathU(p) {
    if (p <= PATH_MAP[0].p) return 0;
    for (let i = 0; i < PATH_MAP.length - 1; i++) {
      const a = PATH_MAP[i];
      const b = PATH_MAP[i + 1];
      if (p <= b.p) return a.u + ((p - a.p) / (b.p - a.p)) * (b.u - a.u);
    }
    return 1;
  }

  /* ---------- Scroll-Wiring ---------- */
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.create({
    trigger: document.querySelector('[data-stage]'),
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => { state.p = self.progress; },
  });

  wireHeader();
  wireReveals();
  const ui = collectUi();

  /* ---------- Resize ---------- */
  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  /* ---------- Render-Loop ---------- */
  const clock = new THREE.Clock();

  function frame() {
    const p = state.p;
    const t = REDUCED ? 0 : clock.getElapsedTime();

    /* Kamera */
    const { pos, tgt } = camSampler(p);
    camera.position.copy(pos);
    camera.lookAt(tgt);

    /* Sonne folgt dem Blickziel, damit Schatten dort scharf sind */
    sun.position.set(tgt.x - 30, 60, 38);
    sun.target.position.set(tgt.x, 0, tgt.z);

    /* Pfad-Fortschritt: gekoppelt an die Kamera-Erzählung */
    const u = pathU(p);
    const segDrawn = Math.floor(u * TUBE_SEG);
    tubeDim.geometry.setDrawRange(0, segDrawn * IDX_PER_SEG);
    const windowSeg = Math.min(segDrawn, Math.floor(TUBE_SEG * 0.07));
    tubeBright.geometry.setDrawRange((segDrawn - windowSeg) * IDX_PER_SEG, windowSeg * IDX_PER_SEG);

    if (u > 0) {
      pathCurve.getPointAt(u, state.headPos);
      headSprite.position.copy(state.headPos);
      headLight.position.copy(state.headPos).y += 1;
      const pulse = REDUCED ? 1 : 0.9 + 0.1 * Math.sin(t * 4);
      headSprite.scale.setScalar(3 * pulse);
      headSprite.material.opacity = 1; /* läuft am Ende sichtbar in den Nebel */
      headLight.intensity = 60;
    } else {
      headSprite.material.opacity = 0;
      headLight.intensity = 0;
    }

    /* Akt 1 — KMU-Markierung wacht auf, wenn der Berater ankommt */
    const smeNear = THREE.MathUtils.clamp(1 - Math.abs(u - uSme) * 14, 0, 1);
    const smeOn = THREE.MathUtils.clamp((p - 0.1) / 0.08, 0, 1);
    sme.ring.material.opacity = 0.25 + 0.75 * Math.max(smeNear, smeOn * 0.6);
    sme.ring.rotation.z = REDUCED ? 0 : t * 0.25;
    sme.label.material.opacity = smeOn;
    sme.edges.material.opacity = 0.35 + 0.65 * smeOn;

    /* Akt 2 — Stationen aktivieren sich, sobald der Pfad sie passiert */
    for (const st of stations) {
      const on = THREE.MathUtils.clamp((u - st.u + 0.012) * 60, 0, 1);
      st.ring.material.opacity = on * 0.9;
      st.ring.scale.setScalar(1 + 0.25 * (1 - on));
      st.label.material.opacity = 0.15 + 0.85 * on;
      st.body.material.emissiveIntensity = 0.35 * on;
    }

    /* Akt 3 — Hub erwacht, Links + Impulse, BPMN-Knoten färben sich ein */
    const q3 = actProgress(p, 3);
    hub.core.material.emissiveIntensity = 0.2 + 1.6 * q3;
    hub.core.rotation.y = REDUCED ? 0 : t * 0.6;
    hub.links.material.opacity = q3 * 0.85;
    hub.label.material.opacity = q3;
    hub.glow.material.opacity = q3 * 0.85;
    for (let i = 0; i < hub.pulses.length; i++) {
      const s = hub.pulses[i];
      const k = REDUCED ? 0.6 : (t * 0.35 + i / hub.pulses.length) % 1;
      s.position.lerpVectors(hub.pos, hub.linkTargets[i], k);
      s.material.opacity = q3 * (1 - k) * 0.9;
    }
    field.update(state.headPos, u, q3);

    /* Akt 4 — das extrudierte Logo baut sich auf */
    const q4 = actProgress(p, 4);
    const aVisible = q4 > 0.02;
    const aScale = 0.55 + 0.45 * easeOut(q4);
    finale.group.visible = aVisible;
    finale.group.scale.setScalar(aScale);
    finale.group.position.y = finale.baseY * aScale;
    for (const m of finale.mats) m.opacity = easeOut(q4);
    for (let i = 0; i < finale.diamonds.length; i++) {
      const d = finale.diamonds[i];
      d.mesh.visible = aVisible;
      d.mesh.material.opacity = easeOut(q4);
      d.mesh.position.y = d.base.y + (REDUCED ? 0 : Math.sin(t * 1.4 + i * 1.7) * 0.5);
      d.mesh.rotation.y = REDUCED ? 0 : t * 0.8 + i;
      d.mesh.material.emissiveIntensity = 0.4 + 1.2 * q4;
    }

    applyUi(ui, p);

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

/* ============================================================
   Welt-Bausteine
   ============================================================ */

function buildCity(scene, pathCurve) {
  const cityPts = [];
  for (let i = 0; i <= 200; i++) cityPts.push(pathCurve.getPointAt((i / 200) * 0.32));

  const mats = [
    new THREE.MeshStandardMaterial({ color: COLORS.building, roughness: 0.95 }),
    new THREE.MeshStandardMaterial({ color: COLORS.buildingAlt, roughness: 0.95 }),
  ];

  const edgePositions = [];
  const rng = mulberry32(7);

  for (let gx = -6; gx <= 4; gx++) {
    for (let gz = -3; gz <= 3; gz++) {
      const cx = gx * 9 + (rng() - 0.5) * 3.5;
      const cz = gz * 9 + (rng() - 0.5) * 3.5;
      if (cx > 22 && cx < 42 && Math.abs(cz) < 9) continue; /* KMU-Areal */
      if (cx > 42) continue;

      let minD = Infinity;
      for (const pp of cityPts) {
        const d = (pp.x - cx) ** 2 + (pp.z - cz) ** 2;
        if (d < minD) minD = d;
      }
      if (minD < 4.4 ** 2) continue; /* Korridor für den Pfad freihalten */

      const w = 3 + rng() * 3.5;
      const d = 3 + rng() * 3.5;
      const h = 2 + rng() * 7 * (1 - Math.abs(gz) * 0.15);
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mats[rng() > 0.7 ? 1 : 0]);
      mesh.position.set(cx, h / 2, cz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      collectEdges(edgePositions, mesh.geometry, mesh.position);
    }
  }

  const edgeGeo = new THREE.BufferGeometry();
  edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3));
  scene.add(new THREE.LineSegments(
    edgeGeo,
    new THREE.LineBasicMaterial({ color: COLORS.edge, transparent: true, opacity: 0.7 })
  ));
}

function buildTurbines(scene) {
  const mat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.9 });
  const rng = mulberry32(21);
  for (let i = 0; i < 6; i++) {
    const g = new THREE.Group();
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.18, 9, 6), mat);
    pole.position.y = 4.5;
    pole.castShadow = true;
    g.add(pole);
    const rotor = new THREE.Group();
    rotor.position.y = 9;
    for (let b = 0; b < 3; b++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.16, 3.4, 0.05), mat);
      blade.position.y = 1.7;
      const arm = new THREE.Group();
      arm.rotation.z = (b * Math.PI * 2) / 3 + rng() * 6;
      arm.add(blade);
      rotor.add(arm);
    }
    g.add(rotor);
    g.position.set(-44 + i * 13 + rng() * 4, 0, -26 - rng() * 9);
    scene.add(g);
  }
}

function buildSme(scene) {
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(8, 12, 8),
    new THREE.MeshStandardMaterial({ color: COLORS.building, roughness: 0.9 })
  );
  body.position.set(32, 6, 0);
  body.castShadow = true;
  body.receiveShadow = true;
  scene.add(body);

  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(4.4, 1.6, 4.4),
    new THREE.MeshStandardMaterial({ color: COLORS.buildingAlt, roughness: 0.9 })
  );
  roof.position.set(32, 12.8, 0);
  roof.castShadow = true;
  scene.add(roof);

  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(body.geometry),
    new THREE.LineBasicMaterial({ color: COLORS.cyan, transparent: true, opacity: 0.35 })
  );
  edges.position.copy(body.position);
  scene.add(edges);

  const ring = new THREE.Line(
    circleGeometry(7, 90),
    new THREE.LineDashedMaterial({
      color: COLORS.cyan, dashSize: 0.9, gapSize: 0.7, transparent: true, opacity: 0.25,
    })
  );
  ring.computeLineDistances();
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(32, 0.06, 0);
  scene.add(ring);

  const label = makeLabelSprite('Ihr Unternehmen', { color: '#0f172a', accent: true });
  label.position.set(32, 15.6, 0);
  label.material.opacity = 0;
  scene.add(label);

  return { body, ring, label, edges };
}

function buildStation(scene, name, pos) {
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(1.05, 1.05, 1.5, 24),
    new THREE.MeshStandardMaterial({
      color: COLORS.building, roughness: 0.85,
      emissive: COLORS.cyan, emissiveIntensity: 0,
    })
  );
  body.position.set(pos.x, 0.75, pos.z);
  body.castShadow = true;
  scene.add(body);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.7, 0.055, 10, 60),
    new THREE.MeshBasicMaterial({ color: COLORS.cyan, transparent: true, opacity: 0 })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(pos.x, 0.1, pos.z);
  scene.add(ring);

  const label = makeLabelSprite(name, { color: '#475569' });
  label.position.set(pos.x, 3.6, pos.z);
  label.material.opacity = 0.15;
  scene.add(label);

  return { body, ring, label };
}

/* BPMN-Prozessnetz (Akt 3): Tasks, Gateways und Events in Lanes um den
   KI-Hub. Knoten färben sich ein, wenn der Pfad-Kopf vorbeifliegt, und
   werden zusätzlich vom erwachenden Hub aus eingefärbt. */
function buildBpmnField(scene) {
  const HUB = new THREE.Vector2(165, 0);

  /* [Typ, x, z] — Mittelkorridor |z| < 2.5 bleibt frei für den Pfad */
  const defs = [
    /* Lane Nord (z = -7) */
    ['start', 144, -7], ['task', 151, -7], ['task', 158, -7],
    ['gateway', 165, -7], ['task', 172, -7], ['task', 179, -7], ['end', 186, -7],
    /* Lane Süd (z = +7) */
    ['start', 144, 7], ['task', 151, 7], ['gateway', 158, 7],
    ['task', 165, 7], ['task', 172, 7], ['gateway', 179, 7], ['end', 186, 7],
    /* mittlere Zubringer (z = ±3.5) */
    ['task', 150, -3.5], ['gateway', 158, -3.5], ['task', 172, -3.5], ['end', 180, -3.5],
    ['task', 150, 3.5], ['task', 158, 3.5], ['task', 172, 3.5], ['end', 180, 3.5],
  ];

  const white = new THREE.Color(0xfafcfe);
  const teal = new THREE.Color(COLORS.teal);

  const taskShape = roundedRectShape(3.2, 2.2, 0.5);
  const taskGeo = new THREE.ExtrudeGeometry(taskShape, { depth: 0.7, bevelEnabled: false });
  taskGeo.rotateX(-Math.PI / 2);

  const nodes = defs.map(([type, x, z]) => {
    const mat = new THREE.MeshStandardMaterial({
      color: white.clone(), roughness: 0.85,
      emissive: COLORS.teal, emissiveIntensity: 0,
    });
    const grp = new THREE.Group();

    if (type === 'task') {
      grp.add(new THREE.Mesh(taskGeo, mat));
    } else if (type === 'gateway') {
      const m = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.7, 2.1), mat);
      m.rotation.y = Math.PI / 4;
      m.position.y = 0.35;
      grp.add(m);
    } else {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.7, 28), mat);
      m.position.y = 0.35;
      grp.add(m);
      if (type === 'end') {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.07, 8, 40), mat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = 0.72;
        grp.add(ring);
      }
    }
    grp.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    grp.position.set(x, type === 'task' ? 0.7 : 0, z);
    if (type === 'task') grp.position.y = 0; /* ExtrudeGeo liegt nach rotateX bereits auf y 0..0.7 */
    scene.add(grp);

    return { mat, pos: new THREE.Vector2(x, z), distHub: HUB.distanceTo(new THREE.Vector2(x, z)) };
  });

  /* Sequenzfluss-Linien */
  const flows = [];
  const lane = (z, xs) => { for (let i = 0; i < xs.length - 1; i++) flows.push([xs[i], z, xs[i + 1], z]); };
  lane(-7, [144, 151, 158, 165, 172, 179, 186]);
  lane(7, [144, 151, 158, 165, 172, 179, 186]);
  lane(-3.5, [150, 158]);
  lane(3.5, [150, 158]);
  lane(-3.5, [172, 180]);
  lane(3.5, [172, 180]);
  /* Diagonalen zum Hub und Querverbinder */
  flows.push([158, -3.5, 165, 0], [158, 3.5, 165, 0], [165, 0, 172, -3.5], [165, 0, 172, 3.5]);
  flows.push([158, -3.5, 158, -7], [158, 3.5, 158, 7], [172, -3.5, 172, -7], [172, 3.5, 172, 7]);

  const flowPos = [];
  for (const [x1, z1, x2, z2] of flows) flowPos.push(x1, 0.4, z1, x2, 0.4, z2);
  const flowGeo = new THREE.BufferGeometry();
  flowGeo.setAttribute('position', new THREE.Float32BufferAttribute(flowPos, 3));
  scene.add(new THREE.LineSegments(flowGeo, new THREE.LineBasicMaterial({
    color: COLORS.edge, transparent: true, opacity: 0.6,
  })));

  /* Punktraster-Untergrund (Halbton-Anmutung des Originals) */
  const dots = new THREE.Mesh(
    new THREE.PlaneGeometry(92, 64),
    new THREE.MeshBasicMaterial({
      map: makeDotTexture(), transparent: true, opacity: 0.4, depthWrite: false,
    })
  );
  dots.rotation.x = -Math.PI / 2;
  dots.position.set(165, 0.02, 0);
  scene.add(dots);

  /* Hub-Verbindungen zu den inneren Knoten */
  const linkTargets = nodes
    .filter((n) => n.distHub > 0.1 && n.distHub < 12)
    .map((n) => new THREE.Vector3(n.pos.x, 0.8, n.pos.y));

  const head2 = new THREE.Vector2();

  function update(headPos, u, q3) {
    head2.set(headPos.x, headPos.z);
    for (const n of nodes) {
      const dHead = n.pos.distanceTo(head2);
      const aHead = u > 0.7 ? Math.exp(-(dHead * dHead) / 26) : 0;
      const aHub = THREE.MathUtils.clamp((q3 * 1.5 - n.distHub / 24) * 2.2, 0, 1);
      const a = Math.min(1, Math.max(aHead, aHub));
      n.mat.color.lerpColors(white, teal, a);
      n.mat.emissiveIntensity = 0.35 * a;
    }
  }

  return { update, linkTargets };
}

function buildHub(scene, linkTargets) {
  const pos = new THREE.Vector3(165, 3.6, 0);

  const pedestal = new THREE.Mesh(
    new THREE.BoxGeometry(4, 1.6, 4),
    new THREE.MeshStandardMaterial({ color: 0xe8f7fa, roughness: 0.7 })
  );
  pedestal.position.set(165, 0.8, 0);
  pedestal.castShadow = true;
  scene.add(pedestal);

  const core = new THREE.Mesh(
    new THREE.OctahedronGeometry(1.5),
    new THREE.MeshStandardMaterial({
      color: COLORS.navy, roughness: 0.4,
      emissive: COLORS.cyan, emissiveIntensity: 0.2,
    })
  );
  core.position.copy(pos);
  scene.add(core);

  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture('#22d3ee'),
    transparent: true, opacity: 0, depthWrite: false, toneMapped: false,
  }));
  glow.scale.set(9, 9, 1);
  glow.position.copy(pos);
  scene.add(glow);

  const label = makeLabelSprite('KI', { color: '#0f172a', accent: true, big: true });
  label.position.set(165, 6.6, 0);
  label.material.opacity = 0;
  scene.add(label);

  /* Verbindungen zu den umliegenden BPMN-Knoten */
  const linkPos = [];
  for (const tgt of linkTargets) linkPos.push(pos.x, pos.y, pos.z, tgt.x, tgt.y, tgt.z);
  const linkGeo = new THREE.BufferGeometry();
  linkGeo.setAttribute('position', new THREE.Float32BufferAttribute(linkPos, 3));
  const links = new THREE.LineSegments(linkGeo, new THREE.LineBasicMaterial({
    color: COLORS.teal, transparent: true, opacity: 0,
    depthWrite: false, toneMapped: false,
  }));
  scene.add(links);

  /* Impulse entlang der Verbindungen */
  const pulses = linkTargets.map(() => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTexture('#14b8a6'),
      transparent: true, opacity: 0, depthWrite: false, toneMapped: false,
    }));
    s.scale.set(1.4, 1.4, 1);
    scene.add(s);
    return s;
  });

  return { pos, core, glow, label, links, linkTargets, pulses };
}

/* Finale (Akt 4): das WirkVektor-Logo als 3D-Extrusion. Fällt auf das
   Chevron-Motiv zurück, wenn das SVG nicht geladen werden kann. */
async function buildFinale(scene) {
  const BASE_Y = 6.4;
  const group = new THREE.Group();
  group.position.set(215, BASE_Y, 0);
  group.rotation.y = -0.5; /* leicht zur Kamera gedreht */
  scene.add(group);

  const mats = [];
  try {
    const data = await new SVGLoader().loadAsync('wirkvektor-logo.svg');
    const inner = new THREE.Group();
    for (const path of data.paths) {
      const fill = (path.userData.style && path.userData.style.fill) || '';
      const isAccent = /0d9488|94cccc/i.test(fill);
      const mat = new THREE.MeshStandardMaterial({
        color: isAccent ? COLORS.teal : COLORS.navy,
        roughness: 0.5, transparent: true,
      });
      mats.push(mat);
      for (const shape of SVGLoader.createShapes(path)) {
        const geo = new THREE.ExtrudeGeometry(shape, { depth: 240, bevelEnabled: false });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.castShadow = true;
        inner.add(mesh);
      }
    }
    const s = 13 / 1448; /* viewBox 1448 → ~13 Welteinheiten hoch */
    inner.scale.set(s, -s, s); /* SVG-y zeigt nach unten */
    const box = new THREE.Box3().setFromObject(inner);
    inner.position.sub(box.getCenter(new THREE.Vector3()));
    group.add(inner);
  } catch (e) {
    /* Fallback: Chevron */
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(7, 7);
    shape.lineTo(0, 14);
    shape.lineTo(4, 14);
    shape.lineTo(11, 7);
    shape.lineTo(4, 0);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 2.4, bevelEnabled: false });
    geo.translate(-5.5, -7, -1.2);
    const mat = new THREE.MeshStandardMaterial({ color: COLORS.navy, roughness: 0.5, transparent: true });
    mats.push(mat);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    group.add(mesh);
  }

  /* Cyan-Diamanten um den Pfeil */
  const diamonds = [
    [221, 9.5, -2], [222.5, 3.5, 1.5], [209, 11.5, 1], [208, 1.8, -2.5],
  ].map((p) => {
    const d = new THREE.Mesh(
      new THREE.OctahedronGeometry(1),
      new THREE.MeshStandardMaterial({
        color: COLORS.teal, roughness: 0.35, transparent: true,
        emissive: COLORS.cyan, emissiveIntensity: 0.4,
      })
    );
    d.position.set(...p);
    d.castShadow = true;
    scene.add(d);
    return { mesh: d, base: new THREE.Vector3(...p) };
  });

  return { group, diamonds, mats, baseY: BASE_Y };
}

/* Abgerundetes Rechteck (BPMN-Task) */
function roundedRectShape(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/* ============================================================
   UI (Captions, Rail, Stats, Header, Reveals)
   ============================================================ */

function collectUi() {
  return {
    hero: document.querySelector('[data-cap="0"]'),
    caps: [1, 2, 3, 4].map((i) => document.querySelector(`[data-cap="${i}"]`)),
    rail: document.querySelector('[data-rail]'),
    railItems: [1, 2, 3, 4].map((i) => document.querySelector(`[data-rail-item="${i}"]`)),
    stats: document.querySelector('[data-stats]'),
    counters: Array.from(document.querySelectorAll('[data-count]')),
  };
}

function applyUi(ui, p) {
  ui.hero.classList.toggle('is-hidden', p > 0.07);
  ui.rail.classList.toggle('is-visible', p > 0.07);

  let active = -1;
  for (let i = 0; i < ACTS.length; i++) {
    const a = ACTS[i];
    const on = p >= a.from && p < a.to;
    if (on) active = i;
    ui.caps[i].classList.toggle('is-active', on);
    ui.caps[i].setAttribute('aria-hidden', String(!on));
  }
  ui.railItems.forEach((el, i) => el.classList.toggle('is-active', i === active));

  const statsOn = p > 0.82;
  ui.stats.classList.toggle('is-active', statsOn);
  ui.stats.setAttribute('aria-hidden', String(!statsOn));
  const q = THREE.MathUtils.clamp((p - 0.82) / 0.12, 0, 1);
  for (const el of ui.counters) {
    const target = Number(el.dataset.count);
    const v = Math.round(target * easeOut(q));
    el.textContent = `${el.dataset.prefix}${v}${el.dataset.suffix}`;
  }
}

function wireHeader() {
  const header = document.querySelector('[data-header]');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function wireReveals() {
  const els = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-revealed');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.2 });
  els.forEach((el) => io.observe(el));
}

/* ============================================================
   Helfer
   ============================================================ */

function actProgress(p, id) {
  const a = ACTS[id - 1];
  return THREE.MathUtils.clamp((p - a.from) / (a.to - a.from), 0, 1);
}

function easeOut(x) {
  return 1 - Math.pow(1 - x, 3);
}

/* Kamera-Sampler: Catmull-Rom über Keyframes, parametrisiert über p */
function makeCamSampler(frames) {
  const posCurve = new THREE.CatmullRomCurve3(
    frames.map((f) => new THREE.Vector3(...f.pos)), false, 'centripetal'
  );
  const tgtCurve = new THREE.CatmullRomCurve3(
    frames.map((f) => new THREE.Vector3(...f.tgt)), false, 'centripetal'
  );
  const n = frames.length - 1;
  const pos = new THREE.Vector3();
  const tgt = new THREE.Vector3();

  return (p) => {
    let i = 0;
    while (i < n - 1 && p > frames[i + 1].p) i++;
    const t = THREE.MathUtils.clamp(
      (p - frames[i].p) / (frames[i + 1].p - frames[i].p), 0, 1
    );
    const uu = (i + t) / n;
    posCurve.getPoint(uu, pos);
    tgtCurve.getPoint(uu, tgt);
    return { pos, tgt };
  };
}

/* Findet den Arc-Length-Parameter u des Kurvenpunkts, der `target` am nächsten ist */
function makeCurveLocator(curve) {
  const N = 2200;
  const pts = [];
  for (let i = 0; i <= N; i++) pts.push(curve.getPointAt(i / N));
  return (target) => {
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i <= N; i++) {
      const d = pts[i].distanceToSquared(target);
      if (d < bestD) { bestD = d; best = i; }
    }
    return best / N;
  };
}

function collectEdges(out, geometry, offset) {
  const e = new THREE.EdgesGeometry(geometry);
  const arr = e.attributes.position.array;
  for (let i = 0; i < arr.length; i += 3) {
    out.push(arr[i] + offset.x, arr[i + 1] + offset.y, arr[i + 2] + offset.z);
  }
  e.dispose();
}

function circleGeometry(r, segments) {
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
}

function makeGlowTexture(color) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, color);
  g.addColorStop(0.25, color + 'aa');
  g.addColorStop(1, color + '00');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeDotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
  const step = 16;
  for (let x = step / 2; x < 512; x += step) {
    for (let y = step / 2; y < 512; y += step) {
      ctx.beginPath();
      ctx.arc(x, y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 3);
  return tex;
}

function makeLabelSprite(text, { color = '#475569', accent = false, big = false } = {}) {
  const scaleFactor = 4;
  const fontSize = (big ? 40 : 22) * scaleFactor;
  const pad = 18 * scaleFactor;
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  const font = `700 ${fontSize}px 'Inter', system-ui, sans-serif`;
  ctx.font = font;
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${2 * scaleFactor}px`;
  const w = Math.ceil(ctx.measureText(text).width) + pad * 2;
  const h = fontSize + pad * 2;
  c.width = w;
  c.height = h;
  const ctx2 = c.getContext('2d');
  ctx2.font = font;
  if ('letterSpacing' in ctx2) ctx2.letterSpacing = `${2 * scaleFactor}px`;
  ctx2.textBaseline = 'middle';
  ctx2.textAlign = 'center';
  if (accent) {
    ctx2.fillStyle = '#22d3ee';
    ctx2.fillRect(0, h - 6 * scaleFactor, w, 6 * scaleFactor);
  }
  ctx2.fillStyle = color;
  ctx2.fillText(text, w / 2, h / 2);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: tex, transparent: true, depthWrite: false,
  }));
  const worldH = big ? 2.6 : 1.5;
  sprite.scale.set((worldH * w) / h, worldH, 1);
  return sprite;
}

function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
