import { z } from 'zod';

const CarouselSlideSchema = z.object({
  eyebrow: z.string().min(1),
  headline: z.string().min(1),
  body: z.string().min(1),
});
export type CarouselSlide = z.infer<typeof CarouselSlideSchema>;

const MethodikPhaseSchema = z.object({
  step: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
});
export type MethodikPhase = z.infer<typeof MethodikPhaseSchema>;

const RoleCardSchema = z.object({
  tag: z.string().min(1),
  title: z.string().min(1),
  subline: z.string().min(1),
});
export type RoleCard = z.infer<typeof RoleCardSchema>;

const OutcomeSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
});
export type Outcome = z.infer<typeof OutcomeSchema>;

const ContactInfoSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  href: z.string().nullable(),
});
export type ContactInfo = z.infer<typeof ContactInfoSchema>;

export const ContentSchema = z.object({
  methodikPhases: z.array(MethodikPhaseSchema).length(6),
  zielgruppeRoles: z.array(RoleCardSchema).length(4),
  befaehigungSlides: z.array(CarouselSlideSchema).length(5),
  outcomes: z.array(OutcomeSchema).length(5),
  contactInfos: z.array(ContactInfoSchema),
  values: z.array(z.string().min(1)).length(4),
});
export type Content = z.infer<typeof ContentSchema>;

export const content: Content = ContentSchema.parse({
  values: [
    'Mittelstandsnah',
    'Sicherheit als Kern',
    'Wirkung vor Technologie',
    'Befähigung statt Abhängigkeit',
  ],
  methodikPhases: [
    {
      step: '01',
      title: 'Verstehen',
      body: 'Wir analysieren Geschäftsmodell, Prozesse, Datenlage und IT-Landschaft. So entsteht ein realistisches Bild der Ausgangslage.',
    },
    {
      step: '02',
      title: 'Bewerten',
      body: 'Wir prüfen mögliche KI-Anwendungsfälle nach Nutzen, Aufwand, Datenlage, Risiko und Compliance.',
    },
    {
      step: '03',
      title: 'Priorisieren',
      body: 'Wir wählen die Vorhaben aus, die wirtschaftlich, realistisch und kontrollierbar sind.',
    },
    {
      step: '04',
      title: 'Absichern',
      body: 'Wir klären Governance, Rollen, Datenzugriffe und Risiken, bevor KI in den produktiven Betrieb geht.',
    },
    {
      step: '05',
      title: 'Umsetzen',
      body: 'Wir begleiten Pilotierung, Toolauswahl, Prozessintegration, Schulung und Produktivsetzung.',
    },
    {
      step: '06',
      title: 'Messen',
      body: 'Nach der Einführung prüfen wir den Nutzen an klaren Kriterien wie Zeitersparnis, Qualität und Akzeptanz und verbessern weiter.',
    },
  ],
  zielgruppeRoles: [
    {
      tag: '50–250 MITARBEITENDE',
      title: 'Geschäftsführung',
      subline: 'Klare Entscheidungsgrundlage, kontrollierte Risiken',
    },
    {
      tag: '250–1000 MITARBEITENDE',
      title: 'IT-Leitung',
      subline: 'Sichere Integration, beherrschbare Architektur',
    },
    {
      tag: 'ALLE GRÖSSEN',
      title: 'Infosec & Datenschutz',
      subline: 'Governance vor Produktivsetzung, EU AI Act ready',
    },
    {
      tag: 'FACHBEREICHE',
      title: 'Operations & Vertrieb',
      subline: 'Spürbare Entlastung im Tagesgeschäft',
    },
  ],
  befaehigungSlides: [
    {
      eyebrow: 'AI-LITERACY-SCHULUNG',
      headline: 'Sicher mit KI arbeiten',
      body: 'Praxisorientierte Schulung für Mitarbeitende, 1 bis 2 Tage.',
    },
    {
      eyebrow: 'FÜHRUNGSKRÄFTE-WORKSHOP',
      headline: 'KI strategisch führen',
      body: 'Halbtagesformat für GF und Bereichsleitungen.',
    },
    {
      eyebrow: 'GOVERNANCE-BRIEFING',
      headline: 'Regeln klar kommunizieren',
      body: 'Vermittlung der internen KI-Richtlinie an alle Teams.',
    },
    {
      eyebrow: 'PROMPT-PRAXIS',
      headline: 'Werkzeuge wirksam nutzen',
      body: 'Hands-on-Sessions mit Microsoft Copilot, ChatGPT Enterprise oder unternehmenseigenen Assistenten.',
    },
    {
      eyebrow: 'LEARNING-PFAD',
      headline: 'Wissen, das bleibt',
      body: 'Dokumentation, Materialien und Folgesessions für nachhaltige Befähigung.',
    },
  ],
  outcomes: [
    { id: 'reifegrad', text: '2–3 Wochen bis zum belastbaren Reifegradbericht.' },
    { id: 'usecase', text: '4–6 Wochen bis zur priorisierten Use-Case-Liste.' },
    { id: 'governance', text: '3–4 Wochen bis zum sofort nutzbaren Governance-Rahmen.' },
    { id: 'schulung', text: '1–2 Tage für geschulte Mitarbeitende.' },
    { id: 'pilot', text: '8–12 Wochen vom Pilot zur Skalierungs-Entscheidung.' },
  ],
  contactInfos: [
    { label: 'E-MAIL', value: 'kontakt@wirkvektor.de', href: 'mailto:kontakt@wirkvektor.de' },
    { label: 'TELEFON', value: '[noch festzulegen]', href: null },
    {
      label: 'LINKEDIN',
      value: 'linkedin.com/in/sebastianschucht',
      href: 'https://linkedin.com/in/sebastianschucht',
    },
    { label: 'ANSCHRIFT', value: '[noch festzulegen]', href: null },
  ],
});
