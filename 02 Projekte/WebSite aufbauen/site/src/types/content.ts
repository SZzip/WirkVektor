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
  paket: z.string().min(1),
  text: z.string().min(1),
});
export type Outcome = z.infer<typeof OutcomeSchema>;

const ContactInfoSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  href: z.string().nullable(),
});
export type ContactInfo = z.infer<typeof ContactInfoSchema>;

const ValueSchema = z.object({
  title: z.string().min(1),
  detail: z.string().min(1),
});
export type Value = z.infer<typeof ValueSchema>;

export const ContentSchema = z.object({
  methodikPhases: z.array(MethodikPhaseSchema).length(6),
  zielgruppeRoles: z.array(RoleCardSchema).length(4),
  befaehigungSlides: z.array(CarouselSlideSchema).length(5),
  outcomes: z.array(OutcomeSchema).length(5),
  contactInfos: z.array(ContactInfoSchema),
  values: z.array(ValueSchema).length(4),
});
export type Content = z.infer<typeof ContentSchema>;

export const content: Content = ContentSchema.parse({
  values: [
    {
      title: 'Passt zu Ihrem Unternehmen',
      detail:
        'Lösungen im Maßstab Ihres Unternehmens, vom kleinen Betrieb bis zum Mittelständler, ohne Konzern-Overhead und ohne Plattformzwang.',
    },
    {
      title: 'Sicher und regelkonform',
      detail:
        'Datenschutz, Governance und EU AI Act sind von Anfang an mitgedacht, nicht nachträglich.',
    },
    {
      title: 'Erst der Nutzen, dann die Technik',
      detail:
        'Wir starten beim Geschäftsproblem und machen den Effekt messbar, statt Werkzeuge zu verwalten.',
    },
    {
      title: 'Sie bleiben unabhängig',
      detail:
        'Wir schulen Ihr Team und übergeben Wissen, damit Sie KI selbst steuern können.',
    },
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
      tag: 'BIS 50 MITARBEITENDE',
      title: 'Geschäftsführung & Inhaber',
      subline: 'Klare Entscheidungsgrundlage, kontrollierte Risiken',
    },
    {
      tag: '50–250 MITARBEITENDE',
      title: 'IT-Verantwortliche',
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
      eyebrow: 'KI-KOMPETENZ-SCHULUNG',
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
    {
      id: 'readiness',
      paket: 'KI-Readiness-Check',
      text: '2–3 Wochen bis zum belastbaren Reifegradbericht.',
    },
    {
      id: 'usecase',
      paket: 'KI-Use-Case-Sprint',
      text: '4–6 Wochen bis zur priorisierten Use-Case-Liste.',
    },
    {
      id: 'governance',
      paket: 'KI-Governance-Starterpaket',
      text: '3–4 Wochen bis zum sofort nutzbaren Governance-Rahmen.',
    },
    {
      id: 'schulung',
      paket: 'AI-Literacy-Schulung',
      text: '1–2 Tage für geschulte Mitarbeitende.',
    },
    {
      id: 'pilot',
      paket: 'Produktiver KI-Pilot',
      text: '8–12 Wochen vom Pilot zur Skalierungs-Entscheidung.',
    },
  ],
  contactInfos: [
    { label: 'E-MAIL', value: 'info@wirkvektor.de', href: 'mailto:info@wirkvektor.de' },
    { label: 'TELEFON', value: '+49 176 20 139 739', href: 'tel:+4917620139739' },
    { label: 'ANSCHRIFT', value: 'Leitenstr. 18, 84048 Mainburg', href: null },
  ],
});
