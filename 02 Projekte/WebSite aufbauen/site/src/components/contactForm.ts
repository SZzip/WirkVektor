import { z } from 'zod';

const ContactFormSchema = z.object({
  name: z.string().min(2, 'Bitte Namen eingeben.'),
  unternehmen: z.string().min(2, 'Bitte Unternehmen eingeben.'),
  email: z.string().email('Bitte gültige E-Mail-Adresse eingeben.'),
  rolle: z.string().min(1, 'Bitte Rolle auswählen.'),
  mitarbeiter: z.string().optional(),
  paket: z.string().optional(),
  nachricht: z.string().optional(),
  dsgvo: z.literal('on', { errorMap: () => ({ message: 'Bitte DSGVO bestätigen.' }) }),
});

const CallbackFormSchema = z.object({
  name: z.string().min(2, 'Bitte Namen eingeben.'),
  telefon: z.string().min(5, 'Bitte Telefonnummer eingeben.'),
  zeit: z.string().optional(),
  notiz: z.string().optional(),
  dsgvo: z.literal('on', { errorMap: () => ({ message: 'Bitte DSGVO bestätigen.' }) }),
});

function showFieldError(form: HTMLFormElement, fieldName: string, message: string): void {
  const errorEl = form.querySelector<HTMLElement>(`[data-error-for="${fieldName}"]`);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('is-visible');
  }
  const input = form.elements.namedItem(fieldName);
  if (input instanceof HTMLElement) {
    input.classList.add('has-error');
  }
}

function clearErrors(form: HTMLFormElement): void {
  form.querySelectorAll<HTMLElement>('[data-error-for]').forEach((el) => {
    el.textContent = '';
    el.classList.remove('is-visible');
  });
  form.querySelectorAll<HTMLElement>('.has-error').forEach((el) => el.classList.remove('has-error'));
}

function showSuccess(form: HTMLFormElement): void {
  const success = form.querySelector<HTMLElement>('[data-form-success]');
  if (success) {
    success.classList.add('is-visible');
  }
  form.classList.add('is-submitted');
}

type Schema = typeof ContactFormSchema | typeof CallbackFormSchema;

function bindForm(form: HTMLFormElement, schema: Schema): void {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    clearErrors(form);
    const formData = new FormData(form);
    const obj: Record<string, FormDataEntryValue> = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    const result = schema.safeParse(obj);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        const field = err.path[0];
        if (typeof field === 'string') {
          showFieldError(form, field, err.message);
        }
      });
      const firstError = form.querySelector<HTMLElement>('.has-error');
      firstError?.focus();
      return;
    }
    showSuccess(form);
  });
}

export function setupForms(): void {
  const contactForm = document.querySelector<HTMLFormElement>('[data-form="contact"]');
  if (contactForm) bindForm(contactForm, ContactFormSchema);

  const callbackForm = document.querySelector<HTMLFormElement>('[data-form="callback"]');
  if (callbackForm) bindForm(callbackForm, CallbackFormSchema);

  document.querySelectorAll<HTMLAnchorElement>('[data-prefill-paket]').forEach((link) => {
    link.addEventListener('click', () => {
      const value = link.getAttribute('data-prefill-paket');
      if (!value) return;
      const select = document.querySelector<HTMLSelectElement>('select[name="paket"]');
      if (select) {
        const option = Array.from(select.options).find((o) => o.value === value);
        if (option) select.value = value;
      }
    });
  });
}
