const STORAGE_KEY = 'wv:bookmarks';

function load(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === 'string');
  } catch {
    return [];
  }
}

function save(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // localStorage may be unavailable (private mode); fail silently
  }
}

function syncDom(ids: string[]): void {
  document.querySelectorAll<HTMLButtonElement>('[data-bookmark]').forEach((btn) => {
    const id = btn.getAttribute('data-bookmark');
    if (!id) return;
    const active = ids.includes(id);
    btn.classList.toggle('is-bookmarked', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  const listContainer = document.querySelector<HTMLElement>('[data-bookmark-list]');
  if (listContainer) {
    const items = ids
      .map((id) => {
        const source = document.querySelector<HTMLElement>(`[data-bookmark="${id}"]`);
        const label = source?.getAttribute('data-bookmark-label') ?? id;
        return `<li class="bookmark-item"><span>${label}</span></li>`;
      })
      .join('');
    const empty = '<li class="bookmark-item bookmark-item--empty">Noch keine Ergebnisse gemerkt.</li>';
    listContainer.innerHTML = ids.length > 0 ? items : empty;
  }

  const counter = document.querySelector<HTMLElement>('[data-bookmark-count]');
  if (counter) {
    counter.textContent = String(ids.length);
    counter.classList.toggle('is-visible', ids.length > 0);
  }
}

export function setupBookmarks(): void {
  const initial = load();
  syncDom(initial);

  document.querySelectorAll<HTMLButtonElement>('[data-bookmark]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-bookmark');
      if (!id) return;
      const ids = load();
      const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
      save(next);
      syncDom(next);
    });
  });
}
