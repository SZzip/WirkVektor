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
  /* Ladescreen: verschwindet nach dem ersten gerenderten Frame,
     spätestens aber nach 6 s (Sicherheitsnetz) */
  const loader = document.querySelector('[data-loader]');
  const hideLoader = () => loader && loader.classList.add('is-hidden');
  setTimeout(hideLoader, 6000);

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
    hideLoader();
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

  /* Punktraster über die gesamte Welt (Halbton-Anmutung des Originals) */
  const dots = new THREE.Mesh(
    new THREE.PlaneGeometry(900, 500),
    new THREE.MeshBasicMaterial({
      map: makeDotTexture(40, 22), transparent: true, opacity: 0.35, depthWrite: false,
    })
  );
  dots.rotation.x = -Math.PI / 2;
  dots.position.set(120, 0.02, 0);
  scene.add(dots);

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

  /* Leuchtender Kopf des Pfads — türkis, nicht weiß */
  const headSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture('#14b8a6'),
    transparent: true, depthWrite: false, toneMapped: false,
  }));
  headSprite.scale.set(3, 3, 1);
  scene.add(headSprite);

  const headLight = new THREE.PointLight(COLORS.tealBright, 60, 22, 1.8);
  scene.add(headLight);

  /* Pfad-Parameter wichtiger Orte (per Arc-Length-Sampling) */
  const uOf = makeCurveLocator(pathCurve);

  /* ---------- Akt 1: Stadt + KMU ---------- */
  const cityBuildings = buildCity(scene, pathCurve);
  const turbines = buildTurbines(scene);
  const cars = buildCars(scene, pathCurve, uOf, cityBuildings);
  buildPeople(scene);
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
    const portrait = w < 768 || w / h < 0.9;
    /* Hochkant: weiterer Blickwinkel (sonst zu enger Ausschnitt) und
       Blickziel mittig, leicht nach unten (UI liegt oben).
       Desktop: Blickziel auf der rechten Drittel-Linie. */
    camera.fov = portrait ? 56 : 40;
    camera.setViewOffset(w, h, portrait ? 0 : -w / 6, portrait ? -h * 0.08 : 0, w, h);
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

    /* Stadtleben: Windräder drehen, Autos fahren (bei reduced motion statisch) */
    for (const r of turbines.rotors) r.rotation.z = r.userData.phase - t * 0.7;
    cars.update(t);

    /* Akt 1 — KMU-Markierung wacht auf; die Sättigung von Teal-Korpus
       und Navy-Dach steigt mit dem Scroll-Fortschritt */
    const smeNear = THREE.MathUtils.clamp(1 - Math.abs(u - uSme) * 14, 0, 1);
    const smeOn = THREE.MathUtils.clamp((p - 0.1) / 0.08, 0, 1);
    const q1 = actProgress(p, 1);
    sme.setSaturation(q1);
    sme.ring.material.opacity = 0.25 + 0.75 * Math.max(smeNear, smeOn * 0.6);
    sme.ring.rotation.z = REDUCED ? 0 : t * 0.25;
    sme.label.material.opacity = smeOn;
    sme.edges.material.opacity = 0.35 + 0.65 * smeOn;
    sme.body.material.emissiveIntensity = (0.15 + 0.35 * smeOn) * q1;

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

    /* Akt 4 — das extrudierte Logo blendet früh ein: vollständig sichtbar,
       sobald der Pfad die halbe Strecke vom Diagramm zum Logo geschafft hat
       (Hub-Abflug p≈0.74 → Logo p≈0.88, 50 % also p≈0.81) */
    const qL = THREE.MathUtils.clamp((p - 0.74) / 0.07, 0, 1);
    const aVisible = qL > 0.02;
    const aScale = 0.55 + 0.45 * easeOut(qL);
    finale.group.visible = aVisible;
    finale.group.scale.setScalar(aScale);
    finale.group.position.y = finale.baseY * aScale;
    for (const m of finale.mats) m.opacity = easeOut(qL);
    for (let i = 0; i < finale.diamonds.length; i++) {
      const d = finale.diamonds[i];
      d.mesh.visible = aVisible;
      d.mesh.material.opacity = easeOut(qL);
      d.mesh.position.y = d.base.y + (REDUCED ? 0 : Math.sin(t * 1.4 + i * 1.7) * 0.5);
      d.mesh.rotation.y = REDUCED ? 0 : t * 0.8 + i;
      d.mesh.material.emissiveIntensity = 0.4 + 1.2 * qL;
    }

    applyUi(ui, p);

    renderer.render(scene, camera);
    hideLoader(); /* erster Frame steht — Ladescreen ausblenden */
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

  const footprints = []; /* Grundrisse für Kollisionsprüfungen (Autos) */
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
      footprints.push({ x: cx, z: cz, hw: w / 2, hd: d / 2, h });
    }
  }

  const edgeGeo = new THREE.BufferGeometry();
  edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3));
  scene.add(new THREE.LineSegments(
    edgeGeo,
    new THREE.LineBasicMaterial({ color: COLORS.edge, transparent: true, opacity: 0.7 })
  ));

  /* KMU-Gebäude ebenfalls als Hindernis führen */
  footprints.push({ x: 32, z: 0, hw: 4, hd: 4, h: 12 });

  return footprints;
}

function buildTurbines(scene) {
  const mat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.9 });
  const rng = mulberry32(21);
  const rotors = [];
  for (let i = 0; i < 6; i++) {
    const g = new THREE.Group();

    /* Mast mit Gondel */
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 9, 8), mat);
    pole.position.y = 4.5;
    pole.castShadow = true;
    g.add(pole);
    const nacelle = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 1), mat);
    nacelle.position.set(0, 9, 0.1);
    nacelle.castShadow = true;
    g.add(nacelle);

    /* Rotor: Nabe + drei Blätter exakt im 120°-Stern, Ebene zur Kamera */
    const rotor = new THREE.Group();
    rotor.position.set(0, 9, 0.68);
    const hubCap = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.25, 10), mat);
    hubCap.rotation.x = Math.PI / 2;
    rotor.add(hubCap);
    for (let b = 0; b < 3; b++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.6, 0.08), mat);
      blade.geometry.scale(1, 1, 1);
      blade.position.y = 1.85;
      blade.castShadow = true;
      const arm = new THREE.Group();
      arm.rotation.z = (b * Math.PI * 2) / 3;
      arm.add(blade);
      rotor.add(arm);
    }
    rotor.userData.phase = rng() * Math.PI * 2;
    rotor.rotation.z = rotor.userData.phase;
    g.add(rotor);
    rotors.push(rotor);

    g.position.set(-44 + i * 13 + rng() * 4, 0, -26 - rng() * 9);
    scene.add(g);
  }
  return { rotors };
}

/* Drei Autos: eins parkt am KMU (der Berater kam mit dem Auto), zwei
   fahren auf der freien Schneise neben dem Berater-Pfad durch die Stadt.
   Die Routen werden gegen die Gebäude-Grundrisse kollisionsbereinigt und
   so beschnitten, dass Start und Ende hinter einem hohen Gebäude liegen. */
function buildCars(scene, pathCurve, uOf, buildings) {
  /* vollständig weiß — Karosserie, Kabine und Räder */
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7 });
  const cabinMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95 });

  function makeCar() {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.42, 2), bodyMat);
    body.position.y = 0.46;
    body.castShadow = true;
    g.add(body);
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.36, 1.05), cabinMat);
    cabin.position.set(0, 0.82, -0.12);
    cabin.castShadow = true;
    g.add(cabin);
    const wheelGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.14, 12);
    for (const [wx, wz] of [[-0.45, 0.62], [0.45, 0.62], [-0.45, -0.62], [0.45, -0.62]]) {
      const w = new THREE.Mesh(wheelGeo, wheelMat);
      w.rotation.z = Math.PI / 2;
      w.position.set(wx, 0.19, wz);
      g.add(w);
    }
    scene.add(g);
    return g;
  }

  /* Parker am KMU-Eingang */
  const parked = makeCar();
  parked.position.set(24.5, 0, 6.2);
  parked.rotation.y = 0.9;

  /* Fahrende Autos: Route = Pfad-Schneise lateral versetzt (Stadt-Abschnitt) */
  const u0 = 0.015;
  const u1 = uOf(new THREE.Vector3(22, 0.6, 1));
  const MARGIN = 1.3; /* halbe Auto-Diagonale + Abstand */

  /* Verdeckt ein hohes Gebäude den Punkt aus Süd-Kamerasicht? */
  function occluded(p) {
    return buildings.some((b) =>
      b.h >= 4 &&
      Math.abs(p.x - b.x) < b.hw + 0.5 &&
      p.z < b.z - b.hd &&
      (b.z - b.hd) - p.z < 5
    );
  }

  function buildRoute(off) {
    const N = 140;
    const pts = [];
    const c = new THREE.Vector3();
    const a = new THREE.Vector3();
    for (let i = 0; i <= N; i++) {
      const u = u0 + (i / N) * (u1 - u0);
      pathCurve.getPointAt(u, c);
      pathCurve.getPointAt(Math.min(u + 0.004, 1), a);
      const dx = a.x - c.x;
      const dz = a.z - c.z;
      const len = Math.hypot(dx, dz) || 1;
      /* Seitenvektor = Fahrtrichtung × hoch */
      pts.push(new THREE.Vector3(c.x + (-dz / len) * off, 0, c.z + (dx / len) * off));
    }

    /* Kollisionen mit Gebäuden auflösen (kleinste Verschiebung raus),
       glätten, dann erneut auflösen */
    const resolve = () => {
      for (const p of pts) {
        for (const b of buildings) {
          const dx = p.x - b.x;
          const dz = p.z - b.z;
          const px = b.hw + MARGIN - Math.abs(dx);
          const pz = b.hd + MARGIN - Math.abs(dz);
          if (px > 0 && pz > 0) {
            if (px < pz) p.x += Math.sign(dx || 1) * px;
            else p.z += Math.sign(dz || 1) * pz;
          }
        }
      }
    };
    const mid = new THREE.Vector3();
    const smooth = () => {
      for (let i = 1; i < pts.length - 1; i++) {
        mid.addVectors(pts[i - 1], pts[i + 1]).multiplyScalar(0.5);
        pts[i].lerp(mid, 0.4);
      }
    };
    resolve(); smooth(); resolve(); smooth(); resolve();

    /* Route so beschneiden, dass Start und Ende hinter einem Gebäude liegen */
    let i0 = 0;
    while (i0 < N / 3 && !occluded(pts[i0])) i0++;
    let i1 = pts.length - 1;
    while (i1 > (2 * N) / 3 && !occluded(pts[i1])) i1--;
    const sliced = pts.slice(i0, i1 + 1);
    return new THREE.CatmullRomCurve3(sliced.length > 6 ? sliced : pts, false, 'centripetal');
  }

  const movers = [
    { car: makeCar(), route: buildRoute(2.6), offset: 0.15, speed: 0.05 },
    { car: makeCar(), route: buildRoute(-2.6), offset: 0.62, speed: 0.04 },
  ];

  const pos = new THREE.Vector3();
  const aheadPos = new THREE.Vector3();

  function place(m, k) {
    m.route.getPointAt(k, pos);
    /* Blick auf einen Punkt deutlich voraus: glättet die Kurvenfahrt,
       das Auto dreht nicht auf der Stelle, sondern fährt vorwärts hinein */
    m.route.getPointAt(Math.min(k + 0.02, 1), aheadPos);
    const dx = aheadPos.x - pos.x;
    const dz = aheadPos.z - pos.z;
    m.car.position.set(pos.x, 0, pos.z);
    if (dx || dz) m.car.rotation.y = Math.atan2(dx, dz);
  }

  function update(t) {
    for (const m of movers) place(m, REDUCED ? m.offset : (m.offset + t * m.speed) % 1);
  }
  update(0);

  return { update };
}

/* Zehn weiße Figuren (Architekturmodell-Stil) über die ganze Welt:
   Werksarbeiter, Manager, Bauarbeiter, Sekretärin, Arzt … */
function buildPeople(scene) {
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
  /* Akzentfarben nach DESIGN.md — je Figur 1-2 kleine Hervorhebungen */
  const tealMat = new THREE.MeshStandardMaterial({ color: COLORS.teal, roughness: 0.8 });
  const navyMat = new THREE.MeshStandardMaterial({ color: COLORS.navy, roughness: 0.8 });

  function makePerson(variant) {
    const g = new THREE.Group();
    for (const lx of [-0.09, 0.09]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.66, 8), mat);
      leg.position.set(lx, 0.33, 0);
      g.add(leg);
    }
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.21, 0.78, 10), mat);
    torso.position.y = 1.05;
    g.add(torso);
    for (const ax of [-0.24, 0.24]) {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.06, 0.62, 8), mat);
      arm.position.set(ax, 1.08, 0);
      arm.rotation.z = ax < 0 ? 0.12 : -0.12;
      g.add(arm);
    }
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), mat);
    head.position.y = 1.62;
    g.add(head);

    if (variant === 'builder') {
      /* Teal-Bauhelm mit Krempe */
      const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.23, 12, 8), tealMat);
      helmet.scale.y = 0.62;
      helmet.position.y = 1.72;
      g.add(helmet);
      const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.04, 12), tealMat);
      brim.position.y = 1.69;
      g.add(brim);
      /* Werkzeugkiste */
      const toolbox = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.2, 0.34), navyMat);
      toolbox.position.set(0.32, 0.56, 0);
      g.add(toolbox);
    } else if (variant === 'worker') {
      /* Navy-Schirmmütze mit Schild */
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.07, 12), navyMat);
      cap.position.set(0, 1.77, 0);
      g.add(cap);
      const visor = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.03, 0.16), navyMat);
      visor.position.set(0, 1.74, 0.26);
      g.add(visor);
      /* Teal-Arbeitsweste (dünne Auflage auf dem Torso) */
      const vest = new THREE.Mesh(new THREE.CylinderGeometry(0.185, 0.225, 0.42, 10), tealMat);
      vest.position.y = 1.16;
      g.add(vest);
    } else if (variant === 'manager') {
      /* Navy-Aktenkoffer mit Griff + Teal-Krawatte */
      const case_ = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.32, 0.42), navyMat);
      case_.position.set(0.34, 0.6, 0);
      g.add(case_);
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 0.16), navyMat);
      handle.position.set(0.34, 0.79, 0);
      g.add(handle);
      const tie = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.34, 0.03), tealMat);
      tie.position.set(0, 1.22, 0.19);
      tie.rotation.x = -0.06;
      g.add(tie);
    } else if (variant === 'secretary') {
      /* Navy-Klemmbrett mit weißem Blatt + Teal-Halstuch */
      const board = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.38, 0.04), navyMat);
      board.position.set(0, 1.12, 0.24);
      board.rotation.x = -0.35;
      g.add(board);
      const sheet = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.3, 0.012), mat);
      sheet.position.set(0, 1.13, 0.27);
      sheet.rotation.x = -0.35;
      g.add(sheet);
      const scarf = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.045, 8, 16), tealMat);
      scarf.rotation.x = Math.PI / 2;
      scarf.position.y = 1.44;
      g.add(scarf);
    } else if (variant === 'doctor') {
      /* Kittel + Teal-Stethoskop + Navy-Brusttasche */
      const coat = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 0.6, 10), mat);
      coat.position.y = 0.85;
      g.add(coat);
      const steth = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.025, 8, 18, Math.PI), tealMat);
      steth.position.set(0, 1.34, 0.18);
      steth.rotation.x = 0.5;
      steth.rotation.z = Math.PI;
      g.add(steth);
      const chestpiece = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.03, 10), tealMat);
      chestpiece.position.set(0.14, 1.18, 0.2);
      chestpiece.rotation.x = Math.PI / 2;
      g.add(chestpiece);
      const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.02), navyMat);
      pocket.position.set(-0.1, 1.18, 0.21);
      g.add(pocket);
    }

    g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
    scene.add(g);
    return g;
  }

  /* [Variante, x, z, Blickrichtung] — verteilt über Stadt, Stationen,
     BPMN-Feld und Logo-Zone, abseits des Pfad-Korridors */
  const defs = [
    ['manager', 24.2, 8.4, -0.8],
    ['builder', -8, 13, 0.6],
    ['worker', -30, 2.5, 1.8],
    ['secretary', 60.5, -8.2, 0.4],
    ['worker', 81, -8.6, -0.3],
    ['doctor', 103.5, -8.4, 0.5],
    ['manager', 112.5, 8.6, 2.6],
    ['builder', 146, 9.6, -0.5],
    ['secretary', 170, 10.2, 2.9],
    ['worker', 205, 7, -1.1],
  ];
  for (const [variant, x, z, ry] of defs) {
    const person = makePerson(variant);
    person.position.set(x, 0, z);
    person.rotation.y = ry;
  }
}

function buildSme(scene) {
  /* Das Zielgebäude trägt Teal-Korpus und Navy-Dach (Logo-Zweiklang),
     startet aber entsättigt: beim Scrollen steigt die Sättigung beider
     Farben bis zum vollen Markenton */
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(8, 12, 8),
    new THREE.MeshStandardMaterial({
      roughness: 0.85, emissive: COLORS.teal, emissiveIntensity: 0,
    })
  );
  body.position.set(32, 6, 0);
  body.castShadow = true;
  body.receiveShadow = true;
  scene.add(body);

  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(4.4, 1.6, 4.4),
    new THREE.MeshStandardMaterial({ roughness: 0.7 })
  );
  roof.position.set(32, 12.8, 0);
  roof.castShadow = true;
  scene.add(roof);

  const bodyHSL = { h: 0, s: 0, l: 0 };
  const roofHSL = { h: 0, s: 0, l: 0 };
  new THREE.Color(COLORS.tealBright).getHSL(bodyHSL);
  new THREE.Color(COLORS.navy).getHSL(roofHSL);

  /* Start bei Weiß (Helligkeit 1, Sättigung 0), Ziel: voller Markenton */
  function setSaturation(q) {
    body.material.color.setHSL(bodyHSL.h, bodyHSL.s * q, THREE.MathUtils.lerp(1, bodyHSL.l, q));
    roof.material.color.setHSL(roofHSL.h, roofHSL.s * q, THREE.MathUtils.lerp(1, roofHSL.l, q));
  }
  setSaturation(0);

  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(body.geometry),
    new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 })
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

  return { body, ring, label, edges, setSaturation };
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

/* BPMN-Diagramm (Akt 3): ein kleiner Auftragsprozess, ohne Texte.

       Start ○ → [Erfassen] → ◇XOR → [Angebot] → ◇AND ⇉ [Fertigung] ⇉ ◇AND → ◎ → ⦿ Ende
                    abgelehnt ↳ [Absage] → ⦿            ⇉ [Material] ⇉
   Hauptfluss auf z=+4, Ablehnungs-Ast auf z=+10, Parallel-Ast auf z=-2.
   Der Mittelkorridor bleibt frei: der Berater-Pfad steigt zum Hub (165,0). */
function buildBpmnField(scene) {
  const HUB = new THREE.Vector2(165, 0);

  /* [Typ, x, z] */
  const defs = [
    ['start', 142, 4], ['task', 147.5, 4], ['xor', 153, 4], ['task', 158.5, 4],
    ['and', 162, 4], ['task', 168, 4], ['and', 174, 4], ['inter', 179.5, 4], ['end', 184.5, 4],
    /* Ablehnungs-Ast */
    ['task', 158.5, 10], ['end', 164, 10],
    /* Parallel-Ast */
    ['task', 168, -2],
  ];

  const white = new THREE.Color(0xfafcfe);
  const teal = new THREE.Color(COLORS.teal);

  const taskShape = roundedRectShape(3.4, 2.4, 0.5);
  const taskGeo = new THREE.ExtrudeGeometry(taskShape, { depth: 0.7, bevelEnabled: false });
  taskGeo.rotateX(-Math.PI / 2);

  /* Statisches Slate-Material für BPMN-Symbolik (Ringe, Gateway-Marker, Pfeile) */
  const symbolMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.7 });

  const addRing = (grp, r, tube) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 8, 48), symbolMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.72;
    grp.add(ring);
  };
  const addBar = (grp, angle) => {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.16, 0.32), symbolMat);
    bar.rotation.y = angle;
    bar.position.y = 0.78;
    grp.add(bar);
  };

  const nodes = defs.map(([type, x, z]) => {
    const mat = new THREE.MeshStandardMaterial({
      color: white.clone(), roughness: 0.85,
      emissive: COLORS.teal, emissiveIntensity: 0,
    });
    const grp = new THREE.Group();

    if (type === 'task') {
      grp.add(new THREE.Mesh(taskGeo, mat));
    } else if (type === 'xor' || type === 'and') {
      const m = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.7, 2.2), mat);
      m.rotation.y = Math.PI / 4;
      m.position.y = 0.35;
      grp.add(m);
      if (type === 'xor') { addBar(grp, Math.PI / 4); addBar(grp, -Math.PI / 4); } /* X-Marker */
      else { addBar(grp, 0); addBar(grp, Math.PI / 2); } /* +-Marker */
    } else {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.7, 28), mat);
      m.position.y = 0.35;
      grp.add(m);
      if (type === 'start') addRing(grp, 0.95, 0.05); /* dünner Rand */
      if (type === 'end') addRing(grp, 0.95, 0.14); /* dicker Rand */
      if (type === 'inter') { addRing(grp, 0.95, 0.05); addRing(grp, 0.68, 0.05); } /* Doppelrand */
    }
    grp.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    grp.position.set(x, 0, z);
    scene.add(grp);

    return { mat, x, pos: new THREE.Vector2(x, z), distHub: HUB.distanceTo(new THREE.Vector2(x, z)) };
  });

  /* Sequenzflüsse als orthogonale Polylinien, jeweils mit Pfeilspitze am Ende */
  const routes = [
    [[143.2, 4], [145.6, 4]],            /* Start → Erfassen */
    [[149.4, 4], [151.4, 4]],            /* Erfassen → XOR */
    [[154.6, 4], [156.6, 4]],            /* XOR → Angebot */
    [[160.4, 4], [160.6, 4]],            /* Angebot → AND-Split */
    [[163.6, 4], [166.1, 4]],            /* AND → Fertigung */
    [[169.9, 4], [172.4, 4]],            /* Fertigung → AND-Join */
    [[175.6, 4], [178.2, 4]],            /* AND-Join → Zwischenereignis */
    [[180.8, 4], [183.2, 4]],            /* Zwischenereignis → Ende */
    [[153, 5.6], [153, 10], [156.6, 10]],   /* XOR → Absage (abgelehnt) */
    [[160.4, 10], [162.7, 10]],          /* Absage → Ende */
    [[162, 2.4], [162, -2], [166.1, -2]],   /* AND-Split → Material */
    [[169.9, -2], [174, -2], [174, 2.4]],   /* Material → AND-Join */
  ];

  const flowPos = [];
  const arrowGeo = new THREE.ConeGeometry(0.26, 0.65, 10);
  const up = new THREE.Vector3(0, 1, 0);
  for (const route of routes) {
    for (let i = 0; i < route.length - 1; i++) {
      flowPos.push(route[i][0], 0.4, route[i][1], route[i + 1][0], 0.4, route[i + 1][1]);
    }
    const [ax, az] = route[route.length - 2];
    const [bx, bz] = route[route.length - 1];
    const dir = new THREE.Vector3(bx - ax, 0, bz - az).normalize();
    const head = new THREE.Mesh(arrowGeo, symbolMat);
    head.quaternion.setFromUnitVectors(up, dir);
    head.position.set(bx - dir.x * 0.32, 0.4, bz - dir.z * 0.32);
    scene.add(head);
  }
  const flowGeo = new THREE.BufferGeometry();
  flowGeo.setAttribute('position', new THREE.Float32BufferAttribute(flowPos, 3));
  scene.add(new THREE.LineSegments(flowGeo, new THREE.LineBasicMaterial({
    color: 0x94a3b8, transparent: true, opacity: 0.85,
  })));

  /* Hub-Verbindungen zu den inneren Knoten */
  const linkTargets = nodes
    .filter((n) => n.distHub > 0.1 && n.distHub < 12)
    .map((n) => new THREE.Vector3(n.pos.x, 0.8, n.pos.y));

  /* Einfärben entlang des Pfades: die Front wandert mit dem Pfad-Kopf
     in Flussrichtung (+x) durch das Diagramm — nicht radial vom Hub. */
  function update(headPos, u, q3) {
    const front = headPos.x;
    for (const n of nodes) {
      const a = THREE.MathUtils.clamp((front - n.x + 2.5) / 5, 0, 1);
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
      /* Original-Logofarben direkt aus dem SVG übernehmen; Emissive-Anteil
         und toneMapped:false halten den Farbton auch im 3D-Licht markentreu */
      const fill = (path.userData.style && path.userData.style.fill) || '#0f172a';
      const fillColor = new THREE.Color().setStyle(fill);
      const mat = new THREE.MeshStandardMaterial({
        color: fillColor, roughness: 0.55, transparent: true,
        emissive: fillColor, emissiveIntensity: 0.4, toneMapped: false,
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

function makeDotTexture(repeatX = 4, repeatY = 3) {
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
  tex.repeat.set(repeatX, repeatY);
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
