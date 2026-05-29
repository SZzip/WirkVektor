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

  // Garantierter Initialzustand: Glyph zentriert (CSS-translate) + voll sichtbar,
  // Header-Logo unsichtbar bis zum Swap am Section-Ende.
  gsap.set(glyph, { x: 0, y: 0, scale: 1, opacity: 1 });
  gsap.set(headerLogo, { opacity: 0 });

  const computeTarget = (): { x: number; y: number; scale: number } => {
    const targetMark = headerLogo.querySelector<HTMLElement>('.header__logo-mark');
    const targetEl: HTMLElement = targetMark ?? headerLogo;
    const targetRect = targetEl.getBoundingClientRect();
    const glyphRect = glyph.getBoundingClientRect();

    const scale = targetRect.height / glyphRect.height;

    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    return {
      x: targetCenterX - window.innerWidth / 2,
      y: targetCenterY - window.innerHeight / 2,
      scale,
    };
  };

  let target = computeTarget();

  gsap.fromTo(
    glyph,
    { x: 0, y: 0, scale: 1 },
    {
      x: () => target.x,
      y: () => target.y,
      scale: () => target.scale,
      ease: 'none',
      immediateRender: false,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    }
  );

  ScrollTrigger.create({
    trigger: section,
    start: 'bottom top',
    onEnter: () => {
      gsap.set(glyph, { opacity: 0 });
      gsap.set(headerLogo, { opacity: 1 });
    },
    onLeaveBack: () => {
      gsap.set(glyph, { opacity: 1 });
      gsap.set(headerLogo, { opacity: 0 });
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
