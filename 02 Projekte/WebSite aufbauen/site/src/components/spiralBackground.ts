const TILE_COUNT = 40;
const ACCENT_INDICES = [6, 14, 22, 30, 38];
const ACCENT_COLORS = ['#0F172A', '#475569', '#0D9488', '#22D3EE', '#94A3B8'];

export function setupSpiralBackground(): void {
  const host = document.querySelector<HTMLElement>('[data-spiral-bg]');
  if (!host) return;

  const cx = 800;
  const cy = 450;
  const baseRadius = 70;
  const growth = 0.115;
  const angleStep = 0.55;
  const tileW = 30;
  const tileH = 8;

  const tiles: string[] = [];
  for (let i = 0; i < TILE_COUNT; i++) {
    const theta = i * angleStep;
    const r = baseRadius * Math.exp(growth * theta);
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    const deg = (theta * 180) / Math.PI + 90;

    const accentSlot = ACCENT_INDICES.indexOf(i);
    const fill = accentSlot === -1 ? '#FFFFFF' : ACCENT_COLORS[accentSlot];
    const stroke = accentSlot === -1 ? '#E2E8F0' : 'none';
    const opacity = accentSlot === -1 ? '0.9' : '1';

    tiles.push(
      `<g transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${deg.toFixed(2)})">` +
        `<rect class="intro__spiral-tile" style="--i:${i}" ` +
        `x="${-tileW / 2}" y="${-tileH / 2}" width="${tileW}" height="${tileH}" rx="1" ` +
        `fill="${fill}" stroke="${stroke}" stroke-width="1" fill-opacity="${opacity}"/>` +
        `</g>`
    );
  }

  host.innerHTML =
    `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" ` +
    `xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">` +
    tiles.join('') +
    `</svg>`;
}
