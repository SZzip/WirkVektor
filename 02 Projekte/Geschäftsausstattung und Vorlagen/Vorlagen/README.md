# WirkVektor — Vorlagen

Fertige Vorlagen im Markenlook ([[DESIGN]]). Platzhalter stehen in `[eckigen Klammern]`.

## Struktur

```
Vorlagen/
├── Geschäftsausstattung/     Briefbogen, Angebot, Rechnung, Auftragsbestätigung,
│                             Mahnung, E-Mail-Signatur, Visitenkarte
├── Projekt und Beratung/     Meeting-Protokoll, Projektstatusbericht,
│                             Workshop-Dokumentation, KI-Readiness-Bericht,
│                             Use-Case-Steckbrief
├── Intern und Marketing/     Onboarding-Checkliste, One-Pager, Case-Study,
│                             Pressemitteilung
└── Präsentation/             WirkVektor Master-Folien.pptx (30 Layouts, 16:9)
```

## Nutzung

1. **Word (.docx):** Öffnen, Platzhalter ersetzen. Kopf- und Fußzeile (Briefbogen) erscheinen automatisch auf jeder Seite.
2. **PowerPoint (.pptx):** Die Datei ist eine Folien-Bibliothek. Passende Folie duplizieren, Inhalt austauschen.

## Schriften

Für die exakte Darstellung *Hanken Grotesk* (Headlines) und *Inter* (Fließtext) installieren — beide kostenlos über Google Fonts. Ohne installierte Schriften ersetzt Office automatisch.

## Anpassen / Neu erzeugen

Zentrale Firmendaten und Farben: `../_build/brand.py`. Danach Skripte in `../_build/` erneut ausführen (siehe [[Geschäftsausstattung und Vorlagen]]).
