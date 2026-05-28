import { scrollToAnchor } from '../scroll/lenis';

export function setupNav(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  let lastY = window.scrollY;
  const onScroll = (): void => {
    const y = window.scrollY;
    header.classList.toggle('header--scrolled', y > 24);
    header.classList.toggle('header--hidden', y > lastY && y > 200);
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (ev) => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const el = document.querySelector(hash);
      if (!el) return;
      ev.preventDefault();
      scrollToAnchor(hash);
      const modal = document.querySelector('[data-modal-open]');
      if (modal instanceof HTMLElement) {
        modal.removeAttribute('data-modal-open');
        document.documentElement.style.overflow = '';
      }
    });
  });
}
