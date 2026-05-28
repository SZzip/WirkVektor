---
name: WirkVektor System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#00201d'
  on-tertiary-container: '#0c9488'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  navy-deep: '#0F172A'
  slate-mid: '#475569'
  vector-teal: '#0D9488'
  impact-cyan: '#22D3EE'
  safety-border: '#E2E8F0'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 80px
  margin-tablet: 40px
  margin-mobile: 20px
  max-width: 1280px
---

## Brand & Style
The design system is engineered for **WirkVektor**, a consultancy bridge between high-level AI and the pragmatic needs of the German Mittelstand. The brand personality is rooted in **Competence** and **Clarity**, eschewing "AI hype" for a visual language of **Reliability** and **Directional Impact**. 

The design style is **Corporate Modern with a Technical Edge**. It utilizes structured layouts, generous but purposeful whitespace, and precision-engineered vector elements. The aesthetic reflects a "Security-First" mindset, utilizing stable proportions and a grounded color palette to reassure stakeholders while demonstrating technical fluency.

## Colors
This palette is built on a foundation of **Navy Blue** (`#0F172A`) to establish immediate authority and trust. **Slate Gray** provides a professional, neutral mid-tone for secondary information and interface borders. 

The primary accent, **Vector Teal**, represents "Directional Impact." It is used sparingly for call-to-actions and key data points to signify effectiveness. 

- **Primary (Navy Deep):** Use for headlines, primary buttons, and heavy navigational elements.
- **Secondary (Slate):** Use for body text, icons, and secondary actions.
- **Accent (Vector Teal):** Use for success states, active indicators, and "Impact" highlights.
- **Neutral:** A cool-toned off-white is used for backgrounds to reduce eye strain and maintain a modern feel.

## Typography
The typography system prioritizes legibility and a systematic hierarchy. We use **Hanken Grotesk** for headlines to provide a sharp, contemporary "engineering" feel. **Inter** is utilized for body text and UI labels due to its exceptional readability in professional software contexts.

- **Headlines:** Use tight letter-spacing on larger sizes to maintain a "structured" look.
- **Body Text:** Optimized for long-form consulting reports and service descriptions.
- **Label Caps:** Reserved for small metadata, overlines (eyebrow text), and category tags.

## Layout & Spacing
The layout follows a **Fixed Grid** model on desktop to mirror the stability and precision of the brand. We utilize a 12-column grid with a 24px gutter.

- **Desktop (1280px+):** Centered container with 80px side margins. 
- **Tablet (768px - 1279px):** Fluid layout with 40px margins; content often collapses from 3 columns to 2.
- **Mobile (< 767px):** Single column with 20px margins.

Spacing rhythm is strictly based on a 4px baseline. Components should use consistent internal padding (e.g., 16px or 24px) to ensure a modular, "engineered" appearance.

## Elevation & Depth
To convey security and pragmatism, this design system avoids heavy shadows. Instead, it uses **Tonal Layers** and **Low-Contrast Outlines**.

- **Surface 0 (Background):** `#F8FAFC`
- **Surface 1 (Cards/Containers):** `#FFFFFF` with a 1px border in `#E2E8F0`.
- **Surface 2 (Elevated):** Only used for active states or dropdowns. Uses a very soft, diffused shadow: `0px 4px 12px rgba(15, 23, 42, 0.05)`.

This approach ensures the UI feels "flat" and efficient, rather than decorative or heavy.

## Shapes
The shape language is **Soft (0.25rem)**. This subtle rounding provides a modern touch without appearing overly "bubbly" or consumer-oriented. It maintains the professional "boxiness" required by the German Mittelstand while signaling that the technology is accessible and user-friendly.

- **Buttons:** 4px radius.
- **Input Fields:** 4px radius.
- **Cards:** 8px radius (Large).

## Components

### Buttons
- **Primary:** Solid Navy Deep (`#0F172A`) with White text. Bold, 16px horizontal padding.
- **Secondary:** Outline Navy Deep or Slate Mid. Used for less critical actions.
- **Impact Action:** Solid Vector Teal (`#0D9488`) with White text. Reserved for the final step in a funnel (e.g., "Start Project").

### Input Fields
Strictly rectangular with a 1px border. Focus state should use a 2px Vector Teal border to indicate precision and active "processing."

### Cards
White backgrounds with a 1px Slate border. Headers within cards should use `label-caps` for categorization. Cards should be used to break down complex AI service offerings into digestible "modules."

### Technical Vectors
Use thin-stroke (1px) icons and data visualizations. Avoid "blob" shapes or organic gradients; use isometric perspectives or straight-line connections to illustrate the "Vektor" concept—movement with direction and magnitude.

### Progress Indicators
Linear, thin bars using Vector Teal to show the "Impact" of AI implementation phases. Avoid circular loaders; use horizontal progress to signify a clear journey from A to B.
