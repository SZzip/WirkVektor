# -*- coding: utf-8 -*-
"""
Logo-/Favicon-Sync.
Quelle der Wahrheit: 07 Anhänge/WirkVektor Logo.svg (Markenzeichen W + Teal-Pfeil).
Leitet zwei Varianten ab und verteilt sie an alle Logo-/Favicon-Stellen:
  • transparent  → flexible Platzierung (Website, Vorlagen)
  • favicon      → Marke auf weißer, abgerundeter Kachel
Außerdem ein hochauflösendes PNG für die Office-Vorlagen.
"""
import os, re
import cairosvg

HERE  = os.path.dirname(os.path.abspath(__file__))
VAULT = os.path.normpath(os.path.join(HERE, "..", "..", ".."))
ROOT_LOGO = os.path.join(VAULT, "07 Anhänge", "WirkVektor Logo.svg")
SITE   = os.path.join(VAULT, "02 Projekte", "WebSite aufbauen", "site")
GRAFIK = os.path.join(VAULT, "07 Anhänge", "Website Grafiken")
ASSETS = os.path.join(HERE, "assets")
os.makedirs(ASSETS, exist_ok=True)

with open(ROOT_LOGO, encoding="utf-8") as f:
    src = f.read()

# 1) Transparente Variante: weißen Hintergrund-Pfad entfernen
transparent = re.sub(r'<path fill="#FFFFFF".*?/>', '', src, count=1, flags=re.S)

# 2) Favicon-Variante: abgerundete weiße Kachel hinter die Marke legen
m = re.search(r'<svg[^>]*>', transparent)
tile = '\n<rect x="0" y="0" width="1448" height="1448" rx="232" fill="#FFFFFF"/>'
favicon = transparent[:m.end()] + tile + transparent[m.end():]

def write(path, content):
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(content)
    print("  ✓", os.path.relpath(path, VAULT))

print("Transparente Marke:")
for p in [
    os.path.join(SITE, "public", "wirkvektor-logo.svg"),
    os.path.join(SITE, "src", "assets", "logo-wv.svg"),
    os.path.join(SITE, "src", "assets", "logo-wv-glyph.svg"),
    os.path.join(GRAFIK, "wirkvektor-logo.svg"),
    os.path.join(GRAFIK, "logo-wv.svg"),
    os.path.join(GRAFIK, "logo-wv-glyph.svg"),
]:
    write(p, transparent)

print("Favicon (Marke auf weißer Kachel):")
for p in [
    os.path.join(SITE, "public", "favicon.svg"),
    os.path.join(GRAFIK, "favicon.svg"),
]:
    write(p, favicon)

print("PNG für Office-Vorlagen:")
cairosvg.svg2png(bytestring=transparent.encode("utf-8"),
                 write_to=os.path.join(ASSETS, "wv-logo.png"),
                 output_width=1024, output_height=1024)
print("  ✓ _build/assets/wv-logo.png")
print("Fertig.")
