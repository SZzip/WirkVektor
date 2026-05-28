type Theme = 'ui-light' | 'ui-dark';

function isTheme(value: string | undefined): value is Theme {
  return value === 'ui-light' || value === 'ui-dark';
}

export function setupThemeObserver(): void {
  const sections = document.querySelectorAll<HTMLElement>('[data-section][data-theme]');
  if (sections.length === 0) return;

  const body = document.body;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const target = visible.target as HTMLElement;
      const theme = target.dataset.theme;
      if (isTheme(theme)) {
        body.dataset.theme = theme;
      }
    },
    {
      rootMargin: '-40% 0px -40% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  sections.forEach((s) => observer.observe(s));
}
