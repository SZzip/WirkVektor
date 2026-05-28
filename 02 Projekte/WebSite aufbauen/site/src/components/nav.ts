import { scrollToAnchor } from '../scroll/lenis';

export function setupNav(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  const onScroll = (): void => {
    header.classList.toggle('header--scrolled', window.scrollY > 24);
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
