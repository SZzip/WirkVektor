import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('scroll modules', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes('reduce'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initLenis returns null when prefers-reduced-motion is set', async () => {
    const { initLenis } = await import('../src/scroll/lenis');
    expect(initLenis()).toBeNull();
  });

  it('reveal observer marks elements when reduced motion is set', async () => {
    document.body.innerHTML = '<div data-reveal></div><div data-reveal></div>';
    const { setupRevealOnView } = await import('../src/scroll/revealOnView');
    setupRevealOnView();
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      expect(el.classList.contains('is-revealed')).toBe(true);
    });
  });

  it('setupIntroLogoMorph is a no-op when reduced motion is set', async () => {
    document.body.innerHTML = `
      <header><a class="header__logo">
        <span class="header__logo--full"><svg></svg></span>
        <span class="header__logo--glyph"><svg></svg></span>
      </a></header>
      <section class="intro"><div class="intro__glyph" data-logo-morph>WV</div></section>
    `;
    const { setupIntroLogoMorph } = await import('../src/scroll/scrollTrigger');
    expect(() => setupIntroLogoMorph()).not.toThrow();
    const headerLogo = document.querySelector<HTMLElement>('.header__logo');
    expect(headerLogo?.style.opacity).toBe('');
  });

  it('setupSpiralBackground renders 40 tiles and 5 accent fills', async () => {
    document.body.innerHTML = '<div data-spiral-bg></div>';
    const { setupSpiralBackground } = await import('../src/components/spiralBackground');
    setupSpiralBackground();
    const host = document.querySelector('[data-spiral-bg]');
    const tiles = host?.querySelectorAll('rect.intro__spiral-tile');
    expect(tiles?.length).toBe(40);
    const accents = host?.querySelectorAll('rect[fill="#0F172A"], rect[fill="#475569"], rect[fill="#0D9488"], rect[fill="#22D3EE"], rect[fill="#94A3B8"]');
    expect(accents?.length).toBe(5);
  });
});
