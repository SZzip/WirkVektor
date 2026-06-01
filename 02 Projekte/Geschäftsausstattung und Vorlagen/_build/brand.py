# -*- coding: utf-8 -*-
"""
WirkVektor — gemeinsame Marken-/Design-Tokens.
Quelle der Wahrheit: DESIGN.md (Vault-Root) bzw. site/src/styles/tokens.css.
Wird von build_docx.py und build_pptx.py genutzt.
"""

# ----------------------------------------------------------------------------
# Farben (Hex ohne #) — siehe DESIGN.md › Colors
# ----------------------------------------------------------------------------
NAVY_DEEP          = "0F172A"   # Primär: Headlines, Cover, Footer
NAVY_RAISED        = "111E34"   # Erhöhte Fläche im Dark-Mode / Button-Hover Navy
NAVY_HOVER         = "1A253C"
SLATE_MID          = "475569"   # Body-Text, Sekundär
SLATE_LIGHT        = "94A3B8"   # Subtiler Text, Quellen
VECTOR_TEAL        = "0D9488"   # Akzent: CTAs, Impact
VECTOR_TEAL_BRIGHT = "14B8A6"
VECTOR_TEAL_HOVER  = "0B7E74"
IMPACT_CYAN        = "22D3EE"   # Akzent im Dark-Mode
OFF_WHITE          = "F7F9FB"   # Light-Background
WHITE              = "FFFFFF"
SAFETY_BORDER      = "E2E8F0"   # Trennlinien, Card-Borders
SAFETY_BORDER_STRONG = "CBD5E1"
ERROR              = "B91C1C"

# Teal-Tint (8 % Vector Teal auf Weiß) — für dezente Hervorhebungsflächen
TEAL_TINT          = "E7F4F2"
NAVY_TINT          = "EAECF0"

# ----------------------------------------------------------------------------
# Typografie — siehe DESIGN.md › Typography
# ----------------------------------------------------------------------------
FONT_DISPLAY = "Hanken Grotesk"   # Headlines / Display
FONT_BODY    = "Inter"            # Body / UI
# Fallbacks, falls Markenschriften nicht installiert sind:
FONT_DISPLAY_FALLBACK = "Arial"
FONT_BODY_FALLBACK    = "Calibri"

# ----------------------------------------------------------------------------
# Unternehmensdaten — Platzhalter in [eckigen Klammern] vor Nutzung ersetzen
# ----------------------------------------------------------------------------
COMPANY = {
    "name":      "WirkVektor",
    "claim":     "Ihr Vektor zur wirkungsvollen KI.",
    "tagline":   "KI-Beratung für den Mittelstand · Strategie, Governance, Wirkung",
    "owner":     "Sebastian Schucht",
    "role":      "Gründer & Geschäftsführer",
    "email":     "kontakt@wirkvektor.de",
    "web":       "wirkvektor.de",
    "linkedin":  "linkedin.com/in/sebastianschucht",
    "phone":     "[Telefon]",
    "street":    "[Straße Hausnummer]",
    "zip_city":  "[PLZ Ort]",
    "ustid":     "[USt-IdNr. DE…]",
    "taxno":     "[Steuernummer]",
    "bank":      "[Bank]",
    "iban":      "[IBAN]",
    "bic":       "[BIC]",
}

# Leistungspakete (WirkVektor.md Kap. 10)
PAKETE = [
    "KI-Readiness-Check",
    "KI-Use-Case-Sprint",
    "KI-Governance-Starterpaket",
    "AI-Literacy-Schulung",
    "Produktiver KI-Pilot",
]

# 6-Phasen-Methodik (WirkVektor.md Kap. 11)
METHODIK = [
    ("01", "Verstehen",  "Kontext, Ziele und Status quo erfassen."),
    ("02", "Bewerten",   "Daten, Prozesse und Reifegrad einschätzen."),
    ("03", "Priorisieren","Use Cases nach Nutzen, Aufwand und Risiko ordnen."),
    ("04", "Absichern",  "Governance, EU AI Act und Sicherheit verankern."),
    ("05", "Umsetzen",   "Piloten produktiv und kontrolliert einführen."),
    ("06", "Messen",     "Wirkung messen und kontinuierlich verbessern."),
]
