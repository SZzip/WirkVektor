import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from './lenis';

let registered = false;

export function registerScrollTrigger(): void {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);

  const lenis = getLenis();
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  registered = true;
}

export function setupParallaxBackgrounds(): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = Number(el.dataset.parallax ?? '0.15');
    gsap.fromTo(
      el,
      { yPercent: -speed * 100 },
      {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('[data-section]') ?? el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  });
}

export function setupIntroLogoMorph(): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const glyph = document.querySelector<HTMLElement>('[data-logo-morph]');
  const section = document.querySelector<HTMLElement>('.intro');
  const headerLogo = document.querySelector<HTMLElement>('.header__logo');
  if (!glyph || !section || !headerLogo) return;

  gsap.set(headerLogo, { opacity: 0 });

  const computeTarget = (): { x: number; y: number; scale: number } => {
    const isDesktop = window.innerWidth >= 768;
    const targetSpan = headerLogo.querySelector<HTMLElement>(
      isDesktop ? '.header__logo--full' : '.header__logo--glyph'
    );
    const targetEl: HTMLElement = targetSpan ?? headerLogo;
    const targetRect = targetEl.getBoundingClientRect();

    const styles = window.getComputedStyle(glyph);
    const currentFontSize = parseFloat(styles.fontSize);
    // Header SVG <text> "WV" font-size 22 (viewBox 32 tall, rendered height 28) → effective ≈ 22 × 28/32 ≈ 19.25
    const targetWvHeightPx = 22 * (28 / 32);
    // The intro glyph's rendered height ≈ font-size × line-height (0.9) ≈ font-size × 0.9
    const currentWvHeightPx = currentFontSize * 0.9;
    const scale = targetWvHeightPx / currentWvHeightPx;

    // The "WV" text is at the left edge of the header logo span.
    // Approximate WV-glyph center inside the span:
    // - SVG height 28px → SVG width (full) = 28 × 160 / 32 = 140px, "WV" occupies the leftmost ≈ 30px
    // - WV center inside SVG viewBox at x ≈ 15 → in screen px ≈ 15 × 28/32 ≈ 13
    const wvCenterX = targetRect.left + 13;
    const wvCenterY = targetRect.top + targetRect.height / 2;

    return {
      x: wvCenterX - window.innerWidth / 2,
      y: wvCenterY - window.innerHeight / 2,
      scale,
    };
  };

  let target = computeTarget();

  gsap.to(glyph, {
    x: () => target.x,
    y: () => target.y,
    scale: () => target.scale,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  gsap.to(glyph, {
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'bottom 20%',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.to(headerLogo, {
    opacity: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'bottom 30%',
      end: 'bottom 5%',
      scrub: true,
    },
  });

  const onResize = (): void => {
    target = computeTarget();
    ScrollTrigger.refresh();
  };
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener(
    'load',
    () => {
      target = computeTarget();
      ScrollTrigger.refresh();
    },
    { once: true }
  );
}

export function setupClipReveal(): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  document.querySelectorAll<HTMLElement>('[data-clip-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0% 0)',
        ease: 'power2.out',
        duration: 1.2,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
}
