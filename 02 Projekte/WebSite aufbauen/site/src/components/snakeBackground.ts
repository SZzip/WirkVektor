const TILE_COUNT = 80;
const ACCENT_INDICES = [12, 28, 44, 60, 74];
const ACCENT_COLORS = [0x0f172a, 0x475569, 0x0d9488, 0x22d3ee, 0x94a3b8];
const BASE_COLOR = 0xfafbfc;

// Plättchen: width × 1.7, depth × 1.7, height (= Dicke) ÷ 2 gegenüber der Vorversion
const TILE_WIDTH = 0.714;
const TILE_THICKNESS = 0.035;
const TILE_DEPTH = 0.374;

// DNA-Helix-Parameter
const HELIX_LENGTH = 16;
const HELIX_RADIUS = 1.4;
const HELIX_TURNS = 5;
const HELIX_SEGMENTS_PER_TURN = 30;

export async function setupSnakeBackground(): Promise<void> {
  const found = document.querySelector<HTMLElement>('[data-spiral-bg]');
  if (!found) return;
  const host: HTMLElement = found;

  const THREE = await import('three');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer: InstanceType<typeof THREE.WebGLRenderer>;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  } catch {
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0.6, 11);
  camera.lookAt(0, 0, 0);

  const ambient = new THREE.AmbientLight(0xffffff, 1.5);
  const dirA = new THREE.DirectionalLight(0xffffff, 1.4);
  dirA.position.set(4, 6, 8);
  const dirB = new THREE.DirectionalLight(0xffffff, 0.6);
  dirB.position.set(-5, -2, 6);
  scene.add(ambient, dirA, dirB);

  // Build DNA-Helix curve
  const helixPoints: InstanceType<typeof THREE.Vector3>[] = [];
  const totalSegments = HELIX_TURNS * HELIX_SEGMENTS_PER_TURN;
  for (let i = 0; i <= totalSegments; i++) {
    const t = i / totalSegments;
    const angle = t * HELIX_TURNS * Math.PI * 2;
    const x = -HELIX_LENGTH / 2 + t * HELIX_LENGTH;
    const y = Math.cos(angle) * HELIX_RADIUS;
    const z = Math.sin(angle) * HELIX_RADIUS;
    helixPoints.push(new THREE.Vector3(x, y, z));
  }
  const curve = new THREE.CatmullRomCurve3(helixPoints, false, 'catmullrom', 0.5);

  const helixGroup = new THREE.Group();
  scene.add(helixGroup);

  const tileGeometry = new THREE.BoxGeometry(TILE_WIDTH, TILE_THICKNESS, TILE_DEPTH);
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: BASE_COLOR,
    roughness: 0.55,
    metalness: 0.08,
  });
  const accentMaterials = ACCENT_COLORS.map(
    (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.55, metalness: 0.08 })
  );

  const tiles: InstanceType<typeof THREE.Mesh>[] = [];
  for (let i = 0; i < TILE_COUNT; i++) {
    const accentSlot = ACCENT_INDICES.indexOf(i);
    const material = accentSlot === -1 ? baseMaterial : accentMaterials[accentSlot];
    const mesh = new THREE.Mesh(tileGeometry, material);
    helixGroup.add(mesh);
    tiles.push(mesh);
  }

  const tmpUp = new THREE.Vector3(0, 1, 0);
  const tmpTangent = new THREE.Vector3();
  const tmpTarget = new THREE.Vector3();
  const tileOrient = new THREE.Object3D();

  function placeTiles(time: number): void {
    const flow = (time * 0.03) % 1;
    for (let i = 0; i < TILE_COUNT; i++) {
      const t = (((i / TILE_COUNT + flow) % 1) + 1) % 1;
      const u = 0.001 + t * 0.998;
      curve.getPointAt(u, tiles[i].position);
      curve.getTangentAt(u, tmpTangent);
      tmpTarget.copy(tiles[i].position).add(tmpTangent);
      tileOrient.position.copy(tiles[i].position);
      tileOrient.up.copy(tmpUp);
      tileOrient.lookAt(tmpTarget);
      tiles[i].quaternion.copy(tileOrient.quaternion);
    }

    // DNA-Twist: ganze Helix dreht sich langsam um die x-Achse
    helixGroup.rotation.x = time * 0.108;
  }

  function resize(): void {
    const rect = host.getBoundingClientRect();
    const w = Math.max(rect.width, 1);
    const h = Math.max(rect.height, 1);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  host.appendChild(renderer.domElement);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';
  resize();

  placeTiles(0);
  renderer.render(scene, camera);

  if (prefersReducedMotion) {
    window.addEventListener('resize', resize, { passive: true });
    return;
  }

  let rafId = 0;
  let visible = true;
  const start = performance.now();

  function frame(now: number): void {
    if (visible) {
      placeTiles((now - start) / 1000);
      renderer.render(scene, camera);
    }
    rafId = requestAnimationFrame(frame);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? false;
    },
    { threshold: 0 }
  );
  observer.observe(host);

  window.addEventListener('resize', resize, { passive: true });
  rafId = requestAnimationFrame(frame);

  window.addEventListener(
    'pagehide',
    () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    },
    { once: true }
  );
}
