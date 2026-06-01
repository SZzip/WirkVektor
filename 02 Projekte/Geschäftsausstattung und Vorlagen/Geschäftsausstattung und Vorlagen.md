---
tags: [projekt, branding, vorlagen, design]
status: aktiv
date: 2026-06-01
---

# Geschäftsausstattung und Vorlagen

Vollständiger Satz an Geschäftsdokumenten (Word) und eine PowerPoint-Master-Foliensammlung für WirkVektor. Alle Vorlagen folgen dem Designsystem aus [[DESIGN]] (Navy Deep, Vector Teal, Hanken Grotesk / Inter).

## Ziel

Eine einheitliche, sofort nutzbare Vorlagenbasis, damit jedes nach außen gehende Dokument und jede Präsentation konsistent im WirkVektor-Look erscheint — sachlich, strukturiert, ohne Hype.

## Inhalt

### Word-Vorlagen (`Vorlagen/`)

**Geschäftsausstattung** — Briefbogen, Angebot, Rechnung, Auftragsbestätigung, Mahnung, E-Mail-Signatur, Visitenkarte.

**Projekt und Beratung** — Meeting-Protokoll, Projektstatusbericht, Workshop-Dokumentation, KI-Readiness-Bericht, Use-Case-Steckbrief.

**Intern und Marketing** — Onboarding-Checkliste, One-Pager, Case-Study, Pressemitteilung.

Alle Word-Dokumente teilen denselben Briefbogen (Kopf mit Wortmarke + Claim, Teal-Trennlinie; Fuß mit Kontakt-, Steuer- und Bankdaten).

### PowerPoint (`Vorlagen/Präsentation/`)

`WirkVektor Master-Folien.pptx` — 30 gestaltete Layout-Folien (16:9) für alle Zwecke: Cover (hell/dunkel), Abschnittstrenner, Agenda, Content-Varianten (1–4 Spalten, Karten), Aufzählung, Zitat, Definition, Do's & Don'ts, KPI, Prozess, 6-Phasen-Methodik, Timeline, Nutzen-Aufwand-Matrix, Vergleich, Tabelle, Balken- und Ringdiagramm, Bild-Layouts, Leistungspakete, Team, Call-to-Action, Danke, Anhang.

## Bedienung

- **Word:** Datei öffnen, Platzhalter in `[eckigen Klammern]` ersetzen. Der Briefbogen wiederholt sich automatisch auf jeder Seite.
- **PowerPoint:** Passende Layout-Folie duplizieren und Inhalte ersetzen — die Sammlung dient als Folien-Bibliothek.
- **Schriften:** Für korrekte Darstellung sollten *Hanken Grotesk* und *Inter* installiert sein (kostenlos via Google Fonts). Ohne sie ersetzt Office automatisch (Arial/Calibri).

## Regenerierung

Die Vorlagen werden per Skript erzeugt (Single Source of Truth = [[DESIGN]] bzw. `_build/brand.py`):

```bash
cd "_build"
pip install python-pptx python-docx
python3 build_docx.py     # 16 Word-Vorlagen
python3 build_pptx.py     # Master-Foliensammlung
```

Marken-/Kontaktdaten (Adresse, Telefon, USt-IdNr., Bankverbindung) stehen zentral in `_build/brand.py` und sind dort als Platzhalter hinterlegt — einmal befüllen, dann neu generieren.

## Offene Punkte

- Platzhalter in `_build/brand.py` mit echten Firmendaten füllen (Adresse, Telefon, USt-IdNr., Bank).
- Optional: echtes Logo-SVG in Briefkopf und Cover einbinden, sobald final (siehe [[DESIGN]] › Grafiken).
- Rechtsdokumente (AGB, NDA, AV-Vertrag) bewusst nicht enthalten — bei Bedarf separat mit anwaltlicher Prüfung.
