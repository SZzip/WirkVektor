/**
 * Header-Telefon-Link.
 *
 * Verhalten: Der Telefon-Button in der App-Bar ist ein echter tel:-Link
 * (auf Mobilgeräten öffnet sich der Wähler). Zusätzlich scrollt ein Klick
 * sanft zur Telefonnummer im Footer, damit Desktop-Nutzer die Nummer sehen.
 */
export function setupPhoneLink(): void {
  const trigger = document.querySelector<HTMLAnchorElement>('[data-phone-link]');
  const target = document.querySelector<HTMLAnchorElement>('[data-footer-phone]');
  if (!trigger || !target) return;

  trigger.addEventListener('click', () => {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}
