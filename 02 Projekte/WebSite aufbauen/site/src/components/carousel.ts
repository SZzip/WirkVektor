type CarouselState = {
  root: HTMLElement;
  track: HTMLElement;
  slides: HTMLElement[];
  index: number;
  prev: HTMLButtonElement | null;
  next: HTMLButtonElement | null;
  counter: HTMLElement | null;
};

function update(state: CarouselState): void {
  const max = state.slides.length;
  if (max === 0) return;
  state.index = Math.max(0, Math.min(state.index, max - 1));
  state.track.style.transform = `translateX(-${state.index * 100}%)`;
  if (state.counter) {
    state.counter.textContent = `${state.index + 1} / ${max}`;
  }
  if (state.prev) state.prev.disabled = state.index === 0;
  if (state.next) state.next.disabled = state.index === max - 1;
  state.slides.forEach((slide, i) => {
    slide.setAttribute('aria-hidden', String(i !== state.index));
  });
}

function setupTouch(state: CarouselState): void {
  let startX = 0;
  let active = false;
  state.track.addEventListener('touchstart', (ev) => {
    startX = ev.touches[0]!.clientX;
    active = true;
  }, { passive: true });
  state.track.addEventListener('touchend', (ev) => {
    if (!active) return;
    const dx = (ev.changedTouches[0]?.clientX ?? startX) - startX;
    if (Math.abs(dx) > 40) {
      state.index += dx < 0 ? 1 : -1;
      update(state);
    }
    active = false;
  });
}

function setupKeyboard(state: CarouselState): void {
  state.root.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowRight') {
      state.index += 1;
      update(state);
    } else if (ev.key === 'ArrowLeft') {
      state.index -= 1;
      update(state);
    }
  });
}

export function setupCarousels(): void {
  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
    const track = root.querySelector<HTMLElement>('[data-carousel-track]');
    if (!track) return;
    const slides = Array.from(track.querySelectorAll<HTMLElement>('[data-carousel-slide]'));
    if (slides.length === 0) return;

    const state: CarouselState = {
      root,
      track,
      slides,
      index: 0,
      prev: root.querySelector<HTMLButtonElement>('[data-carousel-prev]'),
      next: root.querySelector<HTMLButtonElement>('[data-carousel-next]'),
      counter: root.querySelector<HTMLElement>('[data-carousel-counter]'),
    };

    root.setAttribute('tabindex', '0');

    state.prev?.addEventListener('click', () => {
      state.index -= 1;
      update(state);
    });
    state.next?.addEventListener('click', () => {
      state.index += 1;
      update(state);
    });
    setupTouch(state);
    setupKeyboard(state);

    update(state);
  });
}
