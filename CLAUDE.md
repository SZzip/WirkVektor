# Vault Context

Dieses Vault ist das Zweite Gehirn von Sebastian Schucht, Gründer und Geschäftsführer von WirkVektor.

## Über mich

Sebastian Schucht, Gründer und Geschäftsführer von **WirkVektor** — einer spezialisierten Beratungsgesellschaft für die sichere, strukturierte und wirksame Einführung von Künstlicher Intelligenz in Unternehmen. Schwerpunkt: kleine und mittelständische Unternehmen (KMU) in Deutschland, die KI nicht nur ausprobieren, sondern produktiv, regelkonform und wirtschaftlich sinnvoll integrieren wollen. Aktuell im Aufbau, plant ein Team. Arbeitet strukturiert und organisiert. Ausführliches Profil in `00 Kontext/Über mich.md`, vollständiges Unternehmenskonzept in `WirkVektor.md`.

## Vault-Struktur

- **00 Kontext/**: Persönliches Kontext-Profil (Über mich.md, ICP.md, Angebot.md, Schreibstil.md, Branding.md). Zentrale Referenz für alle inhaltlichen Aufgaben. Lies diese Dateien wenn du Content erstellst, Mails schreibst, Angebote formulierst oder Präsentationen baust.
- **DESIGN.md**: Vollständiges Design System für WirkVektor (Farben, Typografie, Komponenten). Referenz für alle visuellen und gestalterischen Aufgaben (Website, Präsentationen, Materialien).
- **WirkVektor.md**: Vollständiges Unternehmenskonzept (Positionierung, Zielgruppen, Leistungsportfolio, Pakete, Methodik, Go-to-Market). Quelldokument für alle inhaltlichen Fragen rund um WirkVektor.
- **01 Inbox/**: Schnelle Gedanken, Brain Dumps, unverarbeitete Notizen. Alles was noch keinen festen Platz hat landet hier.
- **02 Projekte/**: Aktive Projekte mit konkretem Ziel und Enddatum. Projekte starten als einzelne .md Datei. Nur bei komplexen Projekten mit mehreren Dateien wird ein Unterordner erstellt.
- **03 Bereiche/**: Laufende Verantwortungsbereiche ohne Enddatum (Akquise und Vertrieb, Kundenbetreuung, Content und Marketing, Buchhaltung und Finanzen, Weiterbildung, Partnernetzwerk, Gesundheit). Jeder Bereich ist ein eigener Ordner.
- **04 Ressourcen/**: Referenzmaterial und Wissen (EU AI Act, Microsoft Copilot, RAG-Architekturen, Prompt Engineering, ISO 27001, Beratungsmethodik, LinkedIn-Marketing). Jedes Thema ist ein eigener Ordner.
- **05 Daily Notes/**: Tägliches Logbuch. Was an einem Tag passiert ist, welche Entscheidungen getroffen wurden, was offen ist. Gibt Claude die Kontinuität zwischen Sessions.
- **06 Archiv/**: Abgeschlossene Projekte und inaktive Bereiche. Aus dem aktiven Blickfeld, aber durchsuchbar.
- **07 Anhänge/**: Bilder, PDFs, Medien. Als Standard-Anhängeordner in Obsidian konfiguriert (`attachmentFolderPath`) — Obsidian legt hier automatisch alle eingefügten Dateien ab.

## Regeln für dieses Vault

- Nutze [[Wikilinks]] für Verknüpfungen zwischen Notizen
- Neue Notizen ohne klaren Platz kommen in 01 Inbox/
- Halte Notizen atomar: eine Idee pro Notiz wo möglich. Ausnahme: Daily Notes fassen einen ganzen Tag zusammen.
- Daily Notes benennen im Format: YYYY-MM-DD.md (z.B. 2026-05-28.md). So sortieren sie automatisch chronologisch.
- Nutze YAML Frontmatter: tags, status (aktiv/abgeschlossen/pausiert), date
- Dateinamen in normaler Schreibweise mit Leerzeichen und Großbuchstaben: Beschreibender Name.md
- Neue Projekte bekommen eine einzelne .md Datei direkt unter 02 Projekte/. Einen Unterordner nur anlegen wenn das Projekt mehrere Dateien braucht.
- Bereiche und Ressourcen sind immer Ordner, weil sie über die Zeit wachsen
- Abgeschlossene Projekte nach 06 Archiv/ verschieben. Nur auf Anweisung des Nutzers, nicht eigenständig.
- Wenn du Dateien erstellst oder verschiebst, erkläre kurz warum
- Bevor du Dateien löschst oder überschreibst, frag nach
- Wenn Sebastian sagt "merk dir das" oder "speicher das", speichere es dort wo es thematisch hingehört. Schreibregeln nach 00 Kontext/Schreibstil.md, Projekt-Infos in die jeweilige Projekt-Datei, technische Erkenntnisse in 04 Ressourcen/, Vault-Regeln in diese CLAUDE.md, Design-Entscheidungen in DESIGN.md. Im Zweifel kurz fragen wo es hin soll.

## Schreibstil-Hinweis

Wenn du Inhalte für WirkVektor erstellst (Texte, Mails, Präsentationen, Website-Copy), orientiere dich an `00 Kontext/Schreibstil.md` und Kapitel 13 in `WirkVektor.md`. Kernregeln:

- Sachlich, klar, vertrauenswürdig. Keine Hype-Sprache.
- Verständlich aber fachlich präzise, seriös aber nicht trocken, direkt aber nicht alarmistisch.
- Keine überzogenen Versprechen ("KI revolutioniert alles" → vermeiden).
- Belastbare, konkrete Aussagen bevorzugen.

## Design-Hinweis

Für alle visuellen und gestalterischen Aufgaben (Website, Slides, Materialien) gilt das in `DESIGN.md` definierte System. Kernelemente: Navy Deep (#0F172A) als Primärfarbe, Vector Teal (#0D9488) als Impact-Akzent, Hanken Grotesk für Headlines, Inter für Body. Stil: Corporate Modern mit Technical Edge — strukturiert, präzise, ohne dekorative Effekte.

## GitHub und Pull Requests

- Änderungen werden auf einem Feature-Branch committet und gepusht; für gepushte Branches wird ein Pull Request (als Draft) angelegt, falls noch keiner existiert.
- **Nach dem Anlegen eines PRs immer die Überwachung aktivieren** (`subscribe_pr_activity`). So werden CI-Status, Review-Kommentare und andere Aktivität automatisch als Events in die Session geliefert.
- Eingehende PR-Events untersuchen: kleine, eindeutige Fixes direkt umsetzen und pushen; bei Mehrdeutigkeit oder größeren Änderungen vorher nachfragen; sonst still überspringen.
- Den Überwachungs-Status nicht ungefragt beenden — erst auf ausdrückliche Anweisung (`unsubscribe_pr_activity`).

## Session-Routinen

### Bei Session-Start
1. Prüfe 01 Inbox/ auf neue Notizen, zeige was drin liegt, und biete an die Einträge in die passenden Ordner einzusortieren

### Kontext bei Bedarf
Wenn Sebastian fragt "Was ist gerade aktuell?", "Wo war ich stehen geblieben?" oder ähnliches: Lies die letzten 2-3 Daily Notes in 05 Daily Notes/ und die aktiven Projekt-Dateien in 02 Projekte/ um ein Briefing zu geben.

### Bei Session-Ende
Wenn Sebastian die Session beendet oder du merkst dass ein natürliches Ende erreicht ist, biete an:
1. Einen Daily Note Eintrag in 05 Daily Notes/ zu erstellen mit einer Zusammenfassung des Tages
2. Neue Erkenntnisse als Notizen zu speichern
3. Die Inbox aufzuräumen falls nötig
