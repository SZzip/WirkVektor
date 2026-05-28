const TILE_COUNT = 80;
const ACCENT_INDICES = [12, 28, 44, 60, 74];
const ACCENT_COLORS = [0x0f172a, 0x475569, 0x0d9488, 0x22d3ee, 0x94a3b8];
const BASE_COLOR = 0xfafbfc;

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
  camera.position.set(0, 0.5, 12);
  camera.lookAt(0, 0, 0);

  const ambient = new THREE.AmbientLight(0xffffff, 0.85);
  const dir = new THREE.DirectionalLight(0xffffff, 0.9);
  dir.position.set(4, 6, 8);
  scene.add(ambient, dir);

  const controlPoints = [
    new THREE.Vector3(-7, -1.0, -3),
    new THREE.Vector3(-4.5, 1.4, -1),
    new THREE.Vector3(-2, -1.1, 1.2),
    new THREE.Vector3(0.2, 1.6, -0.6),
    new THREE.Vector3(2.6, -1.2, 1.8),
    new THREE.Vector3(4.8, 1.2, -1.2),
    new THREE.Vector3(7, -0.8, 0.5),
  ];
  const initialOffsets = controlPoints.map((p) => p.clone());
  const phases = controlPoints.map((_, i) => i * 0.7);

  const curve = new THREE.CatmullRomCurve3(controlPoints, false, 'catmullrom', 0.5);

  const tileGeometry = new THREE.BoxGeometry(0.42, 0.07, 0.22);
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: BASE_COLOR,
    roughness: 0.55,
    metalness: 0.1,
  });
  const accentMaterials = ACCENT_COLORS.map(
    (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.55, metalness: 0.1 })
  );

  const tiles: InstanceType<typeof THREE.Mesh>[] = [];
  const tileOrient = new THREE.Object3D();
  for (let i = 0; i < TILE_COUNT; i++) {
    const accentSlot = ACCENT_INDICES.indexOf(i);
    const material = accentSlot === -1 ? baseMaterial : accentMaterials[accentSlot];
    const mesh = new THREE.Mesh(tileGeometry, material);
    scene.add(mesh);
    tiles.push(mesh);
  }

  const tmpUp = new THREE.Vector3(0, 1, 0);
  const tmpTangent = new THREE.Vector3();
  const tmpTarget = new THREE.Vector3();

  function placeTiles(time: number): void {
    for (let i = 0; i < controlPoints.length; i++) {
      const base = initialOffsets[i];
      const phase = phases[i] + time * 0.5;
      controlPoints[i].set(
        base.x,
        base.y + Math.sin(phase) * 0.5,
        base.z + Math.cos(phase * 0.85) * 0.6
      );
    }

    const flow = (time * 0.04) % 1;
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
