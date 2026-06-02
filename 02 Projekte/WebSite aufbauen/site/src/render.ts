import { content } from './types/content';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderMethodikSteps(): void {
  const grid = document.querySelector<HTMLElement>('[data-render="methodik-steps"]');
  if (!grid) return;
  grid.innerHTML = content.methodikPhases
    .map(
      (phase) => `
      <article class="card methodik-step">
        <span class="methodik-step__num" aria-hidden="true">${escapeHtml(phase.step)}</span>
        <h3 class="methodik-step__title">${escapeHtml(phase.title)}</h3>
        <p class="methodik-step__body">${escapeHtml(phase.body)}</p>
      </article>`
    )
    .join('');
}

function renderRoles(): void {
  const grid = document.querySelector<HTMLElement>('[data-render="roles"]');
  if (!grid) return;
  grid.innerHTML = content.zielgruppeRoles
    .map(
      (role) => `
      <article class="role-card">
        <span class="role-card__tag">${escapeHtml(role.tag)}</span>
        <h3 class="role-card__title">${escapeHtml(role.title)}</h3>
        <p class="role-card__sub">${escapeHtml(role.subline)}</p>
      </article>`
    )
    .join('');
}

function renderBefaehigungCarousel(): void {
  const track = document.querySelector<HTMLElement>('[data-render="befaehigung-track"]');
  if (!track) return;
  track.innerHTML = content.befaehigungSlides
    .map(
      (slide, i) => `
      <article class="carousel__slide" data-carousel-slide aria-hidden="${i !== 0}">
        <p class="eyebrow">${escapeHtml(slide.eyebrow)}</p>
        <h3 class="headline" style="margin-top: var(--space-4);">„${escapeHtml(slide.headline)}"</h3>
        <p class="body-lg" style="margin-top: var(--space-6);">${escapeHtml(slide.body)}</p>
      </article>`
    )
    .join('');
}

function renderOutcomes(): void {
  const list = document.querySelector<HTMLElement>('[data-render="outcomes"]');
  if (!list) return;
  list.innerHTML = content.outcomes
    .map(
      (outcome) => `
      <li class="outcome-list__item">
        <span class="outcome-list__arrow" aria-hidden="true">→</span>
        <div class="outcome-list__body">
          <span class="outcome-list__text">${escapeHtml(outcome.paket)}</span>
          <span class="outcome-list__detail">${escapeHtml(outcome.text)}</span>
        </div>
        <button type="button" class="bookmark-btn" data-bookmark="${escapeHtml(outcome.id)}" data-bookmark-label="${escapeHtml(outcome.paket)}" aria-pressed="false">
          <svg class="icon icon--sm icon-plus" aria-hidden="true"><use href="#icon-plus"/></svg>
          <svg class="icon icon--sm icon-check" aria-hidden="true"><use href="#icon-check"/></svg>
          <span class="bookmark-btn__label">Merken</span>
        </button>
      </li>`
    )
    .join('');
}

function renderContactInfos(): void {
  const list = document.querySelector<HTMLElement>('[data-render="contact-infos"]');
  if (!list) return;
  list.innerHTML = content.contactInfos
    .map((info) => {
      const value = info.href
        ? `<a href="${escapeHtml(info.href)}" class="contact-info__item-value">${escapeHtml(info.value)}</a>`
        : `<span class="contact-info__item-value">${escapeHtml(info.value)}</span>`;
      return `
        <div class="contact-info__item">
          <span class="contact-info__item-label">${escapeHtml(info.label)}</span>
          ${value}
        </div>`;
    })
    .join('');
}

function renderValues(): void {
  const list = document.querySelector<HTMLElement>('[data-render="values"]');
  if (!list) return;
  list.innerHTML = content.values
    .map(
      (v) => `
      <li>
        <div class="values-card__value">
          <p class="values-card__value-title">${escapeHtml(v.title)}</p>
          <p class="values-card__value-detail">${escapeHtml(v.detail)}</p>
        </div>
      </li>`
    )
    .join('');
}

export function renderContent(): void {
  renderMethodikSteps();
  renderRoles();
  renderBefaehigungCarousel();
  renderOutcomes();
  renderContactInfos();
  renderValues();
}
