import './styles/main.css';

import { initLenis } from './scroll/lenis';
import {
  registerScrollTrigger,
  setupClipReveal,
  setupIntroCaptionFade,
  setupIntroLogoMorph,
  setupParallaxBackgrounds,
} from './scroll/scrollTrigger';
import { setupRevealOnView } from './scroll/revealOnView';
import { setupThemeObserver } from './scroll/themeObserver';
import { setupNav } from './components/nav';
import { setupModals } from './components/modal';
import { setupCarousels } from './components/carousel';
import { setupBookmarks } from './components/bookmarkList';
import { setupForms } from './components/contactForm';
import { setupPhoneLink } from './components/phoneLink';
import { setupSnakeBackground } from './components/snakeBackground';
import { renderContent } from './render';

function boot(): void {
  renderContent();
  void setupSnakeBackground();
  initLenis();
  registerScrollTrigger();
  setupNav();
  setupModals();
  setupCarousels();
  setupBookmarks();
  setupForms();
  setupPhoneLink();
  setupThemeObserver();
  setupRevealOnView();
  setupParallaxBackgrounds();
  setupClipReveal();
  setupIntroLogoMorph();
  setupIntroCaptionFade();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
