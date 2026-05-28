const TILE_COUNT = 60;
const ACCENT_INDICES = [10, 22, 30, 38, 50];
const ACCENT_COLORS = ['#0F172A', '#475569', '#0D9488', '#22D3EE', '#94A3B8'];

export function setupSpiralBackground(): void {
  const host = document.querySelector<HTMLElement>('[data-spiral-bg]');
  if (!host) return;

  const cx = 800;
  const cy = 760;
  const innerR = 70;
  const outerR = 480;
  const tileWidth = 12;
  const startAngle = -90;
  const endAngle = 90;

  const tiles: string[] = [];
  for (let i = 0; i < TILE_COUNT; i++) {
    const angle = startAngle + (i / (TILE_COUNT - 1)) * (endAngle - startAngle);
    const accentSlot = ACCENT_INDICES.indexOf(i);
    const fill = accentSlot === -1 ? '#FFFFFF' : ACCENT_COLORS[accentSlot];
    const stroke = accentSlot === -1 ? '#E2E8F0' : 'none';

    tiles.push(
      `<g transform="translate(${cx} ${cy}) rotate(${angle.toFixed(2)})">` +
        `<rect class="intro__spiral-tile" style="--i:${i}" ` +
        `x="${-tileWidth / 2}" y="${-outerR}" width="${tileWidth}" height="${outerR - innerR}" rx="1" ` +
        `fill="${fill}" stroke="${stroke}" stroke-width="1"/>` +
        `</g>`
    );
  }

  host.innerHTML =
    `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" ` +
    `xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">` +
    tiles.join('') +
    `</svg>`;
}
