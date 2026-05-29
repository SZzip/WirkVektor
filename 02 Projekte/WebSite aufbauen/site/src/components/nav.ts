import { scrollToAnchor } from '../scroll/lenis';
import { closeOpenModal } from './modal';

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
      closeOpenModal();
      scrollToAnchor(hash);
    });
  });
}
