---
tags: [projekt, workflow, beratung]
status: aktiv
erstellt: 2026-05-30
---

# KI-Beratungsworkflow — Master-Playbook

> [!abstract] Was dieses Dokument ist
> Dein operatives Feldhandbuch für ein vollständiges WirkVektor-Mandat. Es führt dich Schritt für Schritt durch alle Phasen einer KI-Beratung — von der Auftragsklärung bis zur Wirkungsmessung. Du kannst es **live beim Kunden öffnen** und dich daran entlanghangeln: Es enthält Leitfragen, Gesprächsskripte, Checklisten, Übergabepunkte und Qualitätssicherung. Die ausfüllbaren Arbeitsvorlagen liegen im Unterordner `Vorlagen/`.

---

## Wie du dieses Dokument nutzt

- **Vor dem Termin:** Lies die jeweilige Phase und die verlinkte Vorlage. Bereite die Leitfragen vor.
- **Im Termin:** Folge dem Phasen-Ablauf von oben nach unten. Die **Leitfragen** und **Gesprächsskripte** sind so formuliert, dass du sie direkt verwenden kannst.
- **Nach dem Termin:** Fülle die Vorlage aus, prüfe den **QS-Checkpoint**, bereite die **Übergabe** in die nächste Phase vor.
- **Pro Mandat:** Dupliziere die Vorlagen aus `Vorlagen/` in einen Kundenordner (Vorschlag: `02 Projekte/Mandat <Kundenname>/`).

> [!tip] Grundhaltung — der rote Faden
> Du verkaufst keine Technologie, sondern **kontrollierte Unternehmenswirkung durch KI**. In jedem Gespräch gilt: erst verstehen, dann bewerten, dann empfehlen. Niemals ein Tool empfehlen, bevor der geschäftliche Nutzen und das Risiko geklärt sind. Siehe [[WirkVektor]] Kapitel 16.

---

## Das Gesamtbild

### Die sechs Phasen (aus [[WirkVektor]] Kapitel 11)

```
1. VERSTEHEN  →  2. BEWERTEN  →  3. PRIORISIEREN  →  4. ABSICHERN  →  5. UMSETZEN  →  6. MESSEN
   Ausgangslage    Use Cases       Top-Vorhaben       Governance       Pilot/Rollout    Wirkung
```

Davor steht **Phase 0 — Erstkontakt und Auftragsklärung**: die Qualifizierung und der Übergang vom Gespräch zum Mandat. Sie ist Teil dieses Workflows, weil eine gute Beratung mit der richtigen Auftragsklärung beginnt.

### Wie die fünf Einstiegspakete auf die Phasen abbilden

Die Pakete sind **modulare Ausschnitte** derselben Methodik. Du musst nie den ganzen Weg auf einmal verkaufen — jedes Paket ist ein in sich abgeschlossener Schritt mit eigenem Ergebnis.

| Paket | Phasen | Kern-Ergebnis | Vorlage |
|---|---|---|---|
| **KI-Readiness-Check** | 1 Verstehen (+ Teile von 2) | Reifegradprofil, priorisierte Maßnahmen | [[KI-Reifegrad-Assessment]] |
| **KI-Use-Case-Sprint** | 2 Bewerten, 3 Priorisieren | Priorisierte Use-Case-Liste, Roadmap | [[Use-Case-Steckbrief und Bewertungsmatrix]], [[Workshop-Leitfaden Use-Case-Sprint]] |
| **KI-Governance-Starterpaket** | 4 Absichern | Richtlinie, Leitfaden, Rollen, Freigabeprozess, Register, Risikomatrix | [[Governance-Checkliste und Risikoklassifizierung]] |
| **AI-Literacy-Schulung** | Befähigungsschicht (eigener Workflow, parallel zu 4–5) | Geschulte Mitarbeitende, reduziertes Risiko, EU-AI-Act-Nachweis | [[Schulungs-Workflow AI-Literacy]] |
| **Produktiver KI-Pilot** | 5 Umsetzen, 6 Messen | Getesteter Use Case, Skalierungsentscheidung | [[Pilot-Steckbrief und Erfolgsmessung]] |

> [!info] Typische Mandatsketten
> - **Klassischer Einstieg:** Readiness-Check → Use-Case-Sprint → Governance-Starterpaket → Pilot. AI-Literacy begleitend.
> - **Akuter Risiko-Druck (Schatten-KI):** Governance-Starterpaket zuerst, dann Readiness/Use-Cases.
> - **Konkreter Bedarf bekannt:** direkt Use-Case-Sprint → Pilot, Governance nachgezogen.

### Engagement-Modelle (aus [[WirkVektor]] Kapitel 18)

Projektbasiert · Paketangebot · Retainer (laufende Begleitung) · Schulung · Umsetzungsbegleitung. Kläre in Phase 0, welches Modell passt.

---

## Goldene Regeln (Qualitäts- und Sicherheitsprinzipien)

Diese Sätze sind dein Kompass in jeder Phase. Aus [[WirkVektor]] Kapitel 16.

> [!warning] Sicherheitsprinzipien — nicht verhandelbar
> - Keine KI-Nutzung ohne klare Datenregeln.
> - Keine Produktivsetzung ohne Verantwortlichkeiten.
> - Keine sensiblen Daten in ungeprüfte Tools.
> - Keine Automatisierung kritischer Entscheidungen ohne menschliche Kontrolle.
> - Keine Tool-Einführung ohne Schulung und Nutzungsleitfaden.

> [!check] Qualitätsprinzipien
> - Jede Empfehlung muss nachvollziehbar begründet sein.
> - Jeder Use Case braucht ein Zielbild und Erfolgskriterien.
> - Risiken werden **vor** Produktivsetzung bewertet.
> - Datenzugriffe entsprechen dem Schutzbedarf.
> - Governance muss praktikabel sein, nicht nur formal.

---

# Phase 0 — Erstkontakt und Auftragsklärung

> [!note] Auf einen Blick
> **Ziel:** Vom Erstgespräch zu einem klar umrissenen Mandat. **Dauer:** 1–2 Termine à 30–60 Min. **Beteiligte:** Entscheider (GF/IT/Compliance). **Ergebnis:** Qualifizierung, Paketempfehlung, Angebot.

### Ablauf

1. **Erstgespräch führen.** Nutze die [[Kundenerstkontakt Präsentation]] (10 Folien, ca. 20 Min., dann Dialog).
2. **Qualifizieren** — passt der Kunde zum [[ICP]]? Prüfe:
   - Kleines oder mittelständisches Unternehmen (KMU) in Deutschland?
   - Echter Leidensdruck oder nur Neugier?
   - Entscheidungskompetenz im Raum oder Zugang dazu?
   - Bereitschaft, Zeit von Schlüsselpersonen bereitzustellen?
3. **Bedarf einordnen** — welcher der typischen sechs Schmerzpunkte dominiert? (Siehe [[ICP]]: ungesteuerte Nutzung, fehlende Use Cases, unvorbereitete Daten, späte Governance, fehlende Befähigung, keine Messung.)
4. **Paket empfehlen** anhand der Mapping-Tabelle oben und der dominanten Rolle. Bei kleinen Unternehmen die Kompakt-Variante des Pakets wählen (siehe [[Angebot]]).
5. **Angebot ableiten** — Umfang, Ergebnis, Zeitraum, Beteiligte, Preis. Variante (Kompakt für kleine Unternehmen / Standard für Mittelständler) an Unternehmensgröße und Budget ausrichten.

### Leitfragen für die Qualifizierung

> [!question] Diese Fragen führen das Gespräch
> - „Was hat Sie dazu gebracht, sich gerade jetzt mit KI zu beschäftigen?"
> - „Was nutzen Ihre Mitarbeitenden heute schon — offiziell und inoffiziell?"
> - „Gab es schon Versuche oder Pilotprojekte? Was ist daraus geworden?"
> - „Wer entscheidet bei Ihnen über KI-Investitionen?"
> - „Gibt es konkrete Vorgaben oder Sorgen aus Datenschutz oder Informationssicherheit?"
> - „Was müsste in zwölf Monaten passiert sein, damit Sie sagen: Das hat sich gelohnt?"

### Paketempfehlung nach Rolle (Anhaltspunkt)

| Wer sitzt dir gegenüber? | Wahrscheinlich relevantestes Einstiegspaket |
|---|---|
| Geschäftsführung / Inhaber | KI-Readiness-Check |
| IT-Leitung | KI-Governance-Starterpaket oder Readiness-Check |
| Informationssicherheit / Datenschutz | KI-Governance-Starterpaket |
| Fachbereichsleitung | KI-Use-Case-Sprint oder Produktiver KI-Pilot |

> [!check] QS-Checkpoint Phase 0
> - [ ] Kunde passt zum ICP (oder bewusste Ausnahme begründet)
> - [ ] Dominanter Schmerzpunkt benannt
> - [ ] Konkretes Paket empfohlen, nicht „alles Mögliche"
> - [ ] Angebot mit klarem Ergebnis, Zeitraum und benötigten Beteiligten

> [!example] Übergabe in Phase 1
> Mandat ist beauftragt. Lege den Kundenordner an, dupliziere die benötigten Vorlagen, terminiere die Interviews und den Kick-off.

---

# Phase 1 — Verstehen

> [!note] Auf einen Blick
> **Ziel:** Realistisches Bild der Ausgangslage — Geschäftsmodell, Prozesse, Daten, IT, Regulatorik, bestehende KI-Nutzung. **Dauer:** 1–2 Wochen. **Beteiligte:** GF, IT, Datenschutz/Infosec, 2–4 Fachbereiche. **Ergebnis:** KI-Reifegradprofil + Handlungsfelder. **Paket:** KI-Readiness-Check.

### Ablauf

1. **Kick-off (30–45 Min.):** Ziel, Ablauf, Rollen und Zeitbedarf klären. Erwartungen steuern: „Wir hören in dieser Phase vor allem zu."
2. **Dokumente sichten:** Orga-/Prozessübersicht, IT-Landschaft, bestehende Richtlinien, vorhandene KI-Tools, Datenschutz-Dokumentation.
3. **Interviews führen** mit den vier Buyer-Rollen — nutze den [[Interviewleitfaden]] (rollenspezifisch).
4. **Bestehende KI-Nutzung erfassen** — auch informelle/Schatten-KI. Ohne Schuldzuweisung, rein bestandsaufnehmend.
5. **Reifegrad bewerten** — über das [[KI-Reifegrad-Assessment]] (sechs Dimensionen, Skala 1–5).
6. **Risiken und Chancen** grob aufnehmen (wird in Phase 2 vertieft).

### Die sechs Reifegrad-Dimensionen

Strategie · Prozesse · Daten · Technologie/IT · Governance & Sicherheit · Menschen & Kompetenz. Details und Scoring in [[KI-Reifegrad-Assessment]].

### Gesprächsführung im Interview

> [!tip] Haltung
> Du bist in dieser Phase **Diagnostiker, nicht Verkäufer**. Stelle offene Fragen, lass ausreden, frage nach Beispielen statt nach Meinungen („Können Sie mir einen konkreten Fall nennen?"). Notiere wörtliche Zitate — sie sind später Gold für den Management-Bericht.

### Leitfragen (Auszug — vollständig im Interviewleitfaden)

> [!question] Querschnitt
> - „Beschreiben Sie mir einen typischen Arbeitstag in Ihrem Bereich. Wo geht Zeit verloren?"
> - „Welche Aufgaben sind wiederkehrend, regelbasiert oder textlastig?"
> - „Welche Daten haben Sie, wo liegen sie, wie gut sind sie gepflegt?"
> - „Was darf auf keinen Fall nach außen gelangen?"
> - „Wer würde merken, wenn KI einen Fehler macht — und wie schnell?"

> [!check] QS-Checkpoint Phase 1
> - [ ] Alle vier Rollen interviewt (oder begründete Lücke)
> - [ ] Bestehende und informelle KI-Nutzung erfasst
> - [ ] Reifegrad in allen sechs Dimensionen bewertet und belegt
> - [ ] Mindestens drei konkrete Handlungsfelder identifiziert
> - [ ] Keine Empfehlung ohne Beleg aus Interview oder Dokument

> [!example] Übergabe in Phase 2 / an den Kunden
> **Deliverable:** Management-Bericht mit Reifegradprofil und priorisierter Maßnahmenliste — Vorlage [[Management-Entscheidungsvorlage]]. Präsentiere ihn in einem Ergebnistermin und stoße die Entscheidung über den nächsten Schritt an (meist Use-Case-Sprint).

---

# Phase 2 — Bewerten

> [!note] Auf einen Blick
> **Ziel:** Mögliche KI-Anwendungsfälle systematisch sammeln und bewerten. **Dauer:** 1–2 Wochen. **Beteiligte:** Fachbereiche, IT, Datenschutz. **Ergebnis:** Bewertete Use-Case-Liste. **Paket:** KI-Use-Case-Sprint (Teil 1).

### Ablauf

1. **Use Cases sammeln** — im Workshop (siehe [[Workshop-Leitfaden Use-Case-Sprint]]) und aus den Interviews der Phase 1.
2. **Je Use Case einen Steckbrief** anlegen: Problem, betroffener Prozess, Datenbedarf, erwarteter Nutzen, Beteiligte. Vorlage [[Use-Case-Steckbrief und Bewertungsmatrix]].
3. **Bewerten nach acht Kriterien** (siehe unten).
4. **Nutzen-Aufwand-Risiko-Matrix** befüllen.

### Die acht Bewertungskriterien (aus [[WirkVektor]] Kapitel 11)

Geschäftlicher Nutzen · technischer Aufwand · Datenverfügbarkeit · Integrationsaufwand · Sicherheits-/Datenschutzrisiko · regulatorische Relevanz · Akzeptanz im Fachbereich · Skalierbarkeit. Scoring-Schema in [[Use-Case-Steckbrief und Bewertungsmatrix]].

> [!tip] Moderationshinweis
> Im Workshop zuerst **divergieren** (alle Ideen sammeln, nichts bewerten), dann **konvergieren** (gemeinsam bewerten). Trenne die beiden Modi klar — sonst werden Ideen vorzeitig zerredet.

> [!warning] Achte besonders auf
> Use Cases, die personenbezogene Daten, Geschäftsgeheimnisse oder kritische Entscheidungen berühren. Diese bekommen früh ein Risiko-Flag und werden in Phase 4 vertieft geprüft.

> [!check] QS-Checkpoint Phase 2
> - [ ] Jeder Use Case hat einen vollständigen Steckbrief
> - [ ] Alle acht Kriterien bewertet, nicht nur „Nutzen"
> - [ ] Datenbedarf und Schutzbedarf je Use Case notiert
> - [ ] Risiko-Flags gesetzt

> [!example] Übergabe in Phase 3
> Vollständig bewertete Use-Case-Liste mit befüllter Matrix.

---

# Phase 3 — Priorisieren

> [!note] Auf einen Blick
> **Ziel:** Aus den bewerteten Use Cases die wirkungsvollsten, realistischsten und kontrollierbarsten auswählen und in eine Roadmap bringen. **Dauer:** wenige Tage. **Beteiligte:** Entscheider + IT. **Ergebnis:** Top-Use-Cases, Pilot-Empfehlung, Roadmap. **Paket:** KI-Use-Case-Sprint (Teil 2).

### Ablauf

1. **Matrix auswerten:** hoher Nutzen / niedriger Aufwand & Risiko = Quick Wins zuerst.
2. **Top-Kandidaten auswählen** (typisch 3–5), mindestens einen **Pilot-Kandidaten** bestimmen.
3. **Roadmap zeichnen:** kurzfristig (Quick Wins / Pilot), mittelfristig, langfristig.
4. **Entscheidungsvorlage** für das Management erstellen — Vorlage [[Management-Entscheidungsvorlage]].

> [!tip] Priorisierungslogik
> Nicht jeder mögliche Use Case ist sinnvoll. Empfiehl bewusst auch das **Weglassen**. Der erste Pilot sollte hohen Nutzen **und** beherrschbares Risiko haben — ein sichtbarer früher Erfolg trägt das ganze Programm.

Ä> [!check] QS-Checkpoint Phase 3
> - [ ] Auswahl nachvollziehbar aus der Matrix begründet
> - [ ] Mindestens ein Pilot-Kandidat mit gutem Nutzen-Risiko-Profil
> - [ ] Roadmap mit Zeithorizonten
> - [ ] Entscheidungsvorlage ist für Nicht-Techniker verständlich

> [!example] Übergabe in Phase 4
> Priorisierte Use Cases stehen. Bevor der Pilot startet, wird der Governance-Rahmen abgesichert (Phase 4).

---

# Phase 4 — Absichern

> [!note] Auf einen Blick
> **Ziel:** Governance, Rollen, Datenzugriffe, Richtlinien und Risikobewertung klären — **bevor** produktiv gearbeitet wird. **Dauer:** 1–3 Wochen. **Beteiligte:** GF, IT, Datenschutz/Infosec. **Ergebnis:** Nutzbarer Governance-Rahmen. **Paket:** KI-Governance-Starterpaket.

### Ablauf

1. **KI-Richtlinie** entwerfen — was ist erlaubt, was nicht, mit welchen Daten.
2. **Nutzungsleitfaden** für Mitarbeitende — praxisnah, kurz, verständlich.
3. **Rollen- und Verantwortlichkeitsmodell** — wer gibt frei, wer betreibt, wer haftet.
4. **Tool-Freigabeprozess** definieren.
5. **KI-Use-Case-Register** anlegen.
6. **Risiko-Klassifizierung** je Use Case (inkl. EU-AI-Act-Einordnung) — siehe [[Governance-Checkliste und Risikoklassifizierung]] und [[EU AI Act]].

> [!warning] EU AI Act im Blick
> Ordne jeden produktiv geplanten Use Case in eine Risikoklasse ein (verboten / hoch / begrenzt / minimal). Bei Hochrisiko: zusätzliche Pflichten klären, bevor es weitergeht. Referenz: [[EU AI Act]].

> [!tip] Governance als Ermöglicher framen
> Verkaufe Governance nie als Bremse. Formuliere: „Damit dürfen Ihre Leute KI sicher nutzen — statt sie zu verbieten oder wegzuschauen." Gute Governance schafft Erlaubnis, nicht Verbot.

> [!check] QS-Checkpoint Phase 4
> - [ ] Richtlinie und Leitfaden vorhanden und verständlich
> - [ ] Rollen klar zugewiesen (kein Use Case ohne Verantwortlichen)
> - [ ] Freigabeprozess definiert
> - [ ] Use-Case-Register angelegt
> - [ ] Risikoklasse je geplantem Use Case bestimmt
> - [ ] Datenzugriffe entsprechen dem Schutzbedarf

> [!example] Übergabe in Phase 5
> Der Rahmen steht. Der Pilot darf starten — kontrolliert.

---

# Phase 5 — Umsetzen

> [!note] Auf einen Blick
> **Ziel:** Den priorisierten Use Case als kontrollierten Piloten umsetzen und in den produktiven Betrieb überführen. **Dauer:** 3–8 Wochen. **Beteiligte:** Fachbereich, IT, ggf. Technologiepartner. **Ergebnis:** Getesteter Use Case, Rollout-Entscheidung. **Paket:** Produktiver KI-Pilot. **Befähigung:** AI-Literacy-Schulung begleitend.

### Ablauf

1. **Pilot-Steckbrief** schärfen: Anforderungen, Prozess, Daten- und Berechtigungskonzept, Erfolgskriterien. Vorlage [[Pilot-Steckbrief und Erfolgsmessung]].
2. **Lösung auswählen** — technologieoffen, passend zur IT-Landschaft (siehe [[WirkVektor]] Kapitel 17). WirkVektor steuert; Umsetzung durch interne IT oder Partner.
3. **Risiko- und Datenschutzbewertung** final bestätigen (Anschluss an Phase 4).
4. **Testphase mit dem Fachbereich** — echte Aufgaben, echte Nutzer.
5. **Schulung** der Pilot-Nutzer (AI Literacy + konkrete Prompts/Workflows).
6. **Erfolg messen** gegen die in Phase 5.1 definierten Kriterien.
7. **Rollout-Entscheidungsvorlage** erstellen.

> [!tip] Pilot-Disziplin
> Klein anfangen, eng begleiten. Ein Pilot braucht definierte Nutzer, einen Zeitraum, klare KPIs und einen klaren Abbruch-/Skalierungs-Entscheidungspunkt. „Pilot ohne Enddatum" ist kein Pilot.

> [!check] QS-Checkpoint Phase 5
> - [ ] Erfolgskriterien **vor** Start definiert
> - [ ] Daten- und Berechtigungskonzept umgesetzt
> - [ ] Pilot-Nutzer geschult, Nutzungsleitfaden vorhanden
> - [ ] Keine sensiblen Daten in ungeprüften Tools
> - [ ] Messung läuft

> [!example] Übergabe in Phase 6
> Pilot ist gelaufen. Jetzt wird die Wirkung sauber ausgewertet.

---

# Phase 6 — Messen und Verbessern

> [!note] Auf einen Blick
> **Ziel:** Nutzen überprüfen, Entscheidung über Skalierung treffen, kontinuierliche Verbesserung anstoßen. **Dauer:** laufend / Auswertungstermin. **Beteiligte:** Entscheider, Fachbereich. **Ergebnis:** Belastbare Skalierungsentscheidung. **Modell:** Retainer als Anschluss.

### Ablauf

1. **KPIs auswerten:** Zeitersparnis, Fehlerreduktion, Bearbeitungsgeschwindigkeit, Qualität, Nutzerakzeptanz, Kostenwirkung.
2. **Lessons Learned** sammeln (Fachbereich + IT).
3. **Skalierungsentscheidung** vorbereiten: ausweiten, anpassen oder einstellen.
4. **Nächste Use Cases** aus der Roadmap aktivieren.
5. **Retainer anbieten** — laufende Begleitung als externer KI-Governance-/Strategiepartner.

> [!tip] Wirkung sichtbar machen
> Stelle die Ergebnisse gegen die Ausgangslage aus Phase 1. Konkrete Zahlen und O-Töne der Nutzer überzeugen das Management mehr als jede Folie. Das ist auch dein bester Anlass für das Folgemandat.

> [!check] QS-Checkpoint Phase 6
> - [ ] KPIs gegen Baseline ausgewertet
> - [ ] Klare Empfehlung: skalieren / anpassen / stoppen
> - [ ] Lessons Learned dokumentiert
> - [ ] Nächster Schritt vereinbart

> [!example] Kreislauf
> Mit der Skalierung beginnt für weitere Use Cases der Zyklus erneut — meist ab Phase 4 (Absichern) oder direkt Phase 5 (Umsetzen).

---

# Querschnitt — AI-Literacy-Schulung (Paket 4)

> [!note] Auf einen Blick
> **Ziel:** Führungskräfte und Mitarbeitende zur sicheren, sinnvollen KI-Nutzung befähigen. **Logik:** eigener Schulungs-Workflow (Curriculum, Didaktik, Durchführung) statt 6-Phasen-Analyse. **Einsatz:** eigenständig oder begleitend zu Phase 4 (Governance) und 5 (Pilot). **Rechtlicher Anker:** EU AI Act Art. 4 (AI-Literacy-Pflicht seit 02/2025).

Der vollständige Ablauf — Bedarf klären → Curriculum zuschneiden → Material vorbereiten → durchführen → Wirkung messen — steht in **[[Schulungs-Workflow AI-Literacy]]** mit eigenen Vorlagen ([[Curriculum-Baukasten AI-Literacy]], [[Schulungs-Drehbuch]], [[Schulungs-Feedback und Wirkungsmessung]]).

---

## Vorlagenübersicht

Alle ausfüllbaren Arbeitsvorlagen liegen in `Vorlagen/`. Pro Mandat duplizieren.

| Vorlage | Einsatz in Phase |
|---|---|
| [[Interviewleitfaden]] | 1 Verstehen |
| [[KI-Reifegrad-Assessment]] | 1 Verstehen |
| [[Workshop-Leitfaden Use-Case-Sprint]] | 2 Bewerten |
| [[Use-Case-Steckbrief und Bewertungsmatrix]] | 2 Bewerten, 3 Priorisieren |
| [[Management-Entscheidungsvorlage]] | 1, 3 (Ergebnisberichte) |
| [[Governance-Checkliste und Risikoklassifizierung]] | 4 Absichern |
| [[Pilot-Steckbrief und Erfolgsmessung]] | 5 Umsetzen, 6 Messen |
| [[Curriculum-Baukasten AI-Literacy]] | Paket 4 — Schulung |
| [[Schulungs-Drehbuch]] | Paket 4 — Schulung |
| [[Schulungs-Feedback und Wirkungsmessung]] | Paket 4 — Schulung |

---

## Referenzen

- [[WirkVektor]] Kapitel 11 (Methodik), 16 (Qualität & Sicherheit), 9–10 (Portfolio & Pakete), 17 (Technologie)
- [[Angebot]], [[ICP]], [[Schreibstil]]
- [[Kundenerstkontakt Präsentation]] (Phase 0)
- [[EU AI Act]], [[ISO 27001]], [[Microsoft Copilot]], [[RAG-Architekturen]], [[Prompt Engineering]]
- [[Beratungsmethodik]]
