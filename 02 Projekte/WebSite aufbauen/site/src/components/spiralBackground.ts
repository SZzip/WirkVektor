const TILE_COUNT = 120;
const ACCENT_INDICES = [10, 35, 60, 85, 110];
const ACCENT_COLORS = ['#0F172A', '#475569', '#0D9488', '#22D3EE', '#94A3B8'];

export function setupSpiralBackground(): void {
  const host = document.querySelector<HTMLElement>('[data-spiral-bg]');
  if (!host) return;

  const innerR = 60;
  const outerR = 520;
  const tileWidth = 14;
  const stepAngle = 360 / TILE_COUNT;

  const tiles: string[] = [];
  for (let i = 0; i < TILE_COUNT; i++) {
    const angle = i * stepAngle;
    const accentSlot = ACCENT_INDICES.indexOf(i);
    const fill = accentSlot === -1 ? '#FAFBFC' : ACCENT_COLORS[accentSlot];

    tiles.push(
      `<g transform="rotate(${angle.toFixed(2)})">` +
        `<rect class="intro__spiral-tile" style="--i:${i}" ` +
        `x="${-tileWidth / 2}" y="${-outerR}" width="${tileWidth}" height="${outerR - innerR}" rx="1.5" ` +
        `fill="${fill}"/>` +
        `</g>`
    );
  }

  host.innerHTML =
    `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" ` +
    `xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">` +
    `<defs>` +
      `<filter id="intro-spiral-shadow" x="-50%" y="-50%" width="200%" height="200%">` +
        `<feGaussianBlur in="SourceAlpha" stdDeviation="2.5"/>` +
        `<feOffset dx="0" dy="1.5"/>` +
        `<feComponentTransfer><feFuncA type="linear" slope="0.22"/></feComponentTransfer>` +
        `<feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>` +
      `</filter>` +
    `</defs>` +
    `<g transform="translate(800 760)">` +
      `<g class="intro__spiral-fan" filter="url(#intro-spiral-shadow)">` +
        tiles.join('') +
      `</g>` +
    `</g>` +
    `</svg>`;
}
