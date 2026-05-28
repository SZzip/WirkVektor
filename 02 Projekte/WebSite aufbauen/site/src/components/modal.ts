function openModal(modal: HTMLElement): void {
  modal.setAttribute('data-modal-open', '');
  document.documentElement.style.overflow = 'hidden';
  const firstFocusable = modal.querySelector<HTMLElement>(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  firstFocusable?.focus();
}

function closeModal(modal: HTMLElement): void {
  modal.removeAttribute('data-modal-open');
  document.documentElement.style.overflow = '';
}

function getModalById(id: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-modal="${id}"]`);
}

export function setupModals(): void {
  document.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>('[data-modal-target]').forEach((trigger) => {
    trigger.addEventListener('click', (ev) => {
      const id = trigger.getAttribute('data-modal-target');
      if (!id) return;
      const modal = getModalById(id);
      if (!modal) return;
      ev.preventDefault();
      openModal(modal);
    });
  });

  document.querySelectorAll<HTMLElement>('[data-modal]').forEach((modal) => {
    modal.querySelectorAll<HTMLButtonElement>('[data-modal-close]').forEach((closeBtn) => {
      closeBtn.addEventListener('click', () => closeModal(modal));
    });
    modal.addEventListener('click', (ev) => {
      if (ev.target === modal) closeModal(modal);
    });
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key !== 'Escape') return;
    const open = document.querySelector<HTMLElement>('[data-modal][data-modal-open]');
    if (open) closeModal(open);
  });
}

export function openModalById(id: string): void {
  const modal = getModalById(id);
  if (modal) openModal(modal);
}
