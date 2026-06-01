# -*- coding: utf-8 -*-
"""
Logo-/Favicon-Sync.
Quelle der Wahrheit: 07 Anhänge/WirkVektor Logo.svg (Markenzeichen W + Teal-Pfeil).
Die Root-Datei wird WORTGETREU an alle Logo- und Favicon-Stellen verteilt
(inkl. ihres weißen Hintergrunds). Zusätzlich ein hochauflösendes PNG für die
Office-Vorlagen, direkt aus derselben Datei gerendert.
"""
import os, shutil
import cairosvg

HERE  = os.path.dirname(os.path.abspath(__file__))
VAULT = os.path.normpath(os.path.join(HERE, "..", "..", ".."))
ROOT_LOGO = os.path.join(VAULT, "07 Anhänge", "WirkVektor Logo.svg")
SITE   = os.path.join(VAULT, "02 Projekte", "WebSite aufbauen", "site")
GRAFIK = os.path.join(VAULT, "07 Anhänge", "Website Grafiken")
ASSETS = os.path.join(HERE, "assets")
os.makedirs(ASSETS, exist_ok=True)

# Ziele: Logos UND Favicon — überall exakt die Root-Datei
TARGETS = [
    os.path.join(SITE, "public", "wirkvektor-logo.svg"),
    os.path.join(SITE, "public", "favicon.svg"),
    os.path.join(SITE, "src", "assets", "logo-wv.svg"),
    os.path.join(SITE, "src", "assets", "logo-wv-glyph.svg"),
    os.path.join(GRAFIK, "wirkvektor-logo.svg"),
    os.path.join(GRAFIK, "logo-wv.svg"),
    os.path.join(GRAFIK, "logo-wv-glyph.svg"),
    os.path.join(GRAFIK, "favicon.svg"),
]

print("Verteile Root-Logo wortgetreu:")
for p in TARGETS:
    shutil.copyfile(ROOT_LOGO, p)
    print("  ✓", os.path.relpath(p, VAULT))

print("PNG für Office-Vorlagen (aus Root-Logo):")
cairosvg.svg2png(url=ROOT_LOGO,
                 write_to=os.path.join(ASSETS, "wv-logo.png"),
                 output_width=1024, output_height=1024)
print("  ✓ _build/assets/wv-logo.png")
print("Fertig.")
