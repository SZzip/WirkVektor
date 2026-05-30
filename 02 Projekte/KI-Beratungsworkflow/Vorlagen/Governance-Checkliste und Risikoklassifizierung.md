---
tags: [vorlage, beratung, workflow, governance]
phase: 4-absichern
---

# Governance-Checkliste und Risikoklassifizierung (Phase 4 — Absichern)

> [!abstract] Zweck
> Arbeitsgrundlage für das **KI-Governance-Starterpaket**. Stellt sicher, dass vor der Produktivsetzung alle Bausteine eines kontrollierten Rahmens vorliegen und jeder geplante Use Case einer Risikoklasse zugeordnet ist. Siehe [[KI-Beratungsworkflow]] Phase 4.

> [!tip] Framing
> Governance ist Ermöglicher, nicht Bremse: „Damit dürfen Ihre Leute KI sicher nutzen." Praktikabel vor formal — lieber eine kurze, gelebte Richtlinie als ein ungelesenes Regelwerk.

---

## Teil A — Governance-Bausteine (Liefercheckliste)

| Baustein | Status | Verantwortlich | Notiz |
|---|---|---|---|
| **KI-Richtlinie** (was erlaubt/verboten, welche Daten) | ⬜ offen ⬜ Entwurf ⬜ fertig | | |
| **Nutzungsleitfaden für Mitarbeitende** (kurz, praxisnah) | ⬜ offen ⬜ Entwurf ⬜ fertig | | |
| **Rollen- und Verantwortlichkeitsmodell** | ⬜ offen ⬜ Entwurf ⬜ fertig | | |
| **Tool-Freigabeprozess** | ⬜ offen ⬜ Entwurf ⬜ fertig | | |
| **KI-Use-Case-Register** | ⬜ offen ⬜ Entwurf ⬜ fertig | | |
| **Risiko-Klassifizierungsmatrix** | ⬜ offen ⬜ Entwurf ⬜ fertig | | |

---

## Teil B — Rollen- und Verantwortlichkeitsmodell

| Rolle | Person / Funktion | Verantwortung |
|---|---|---|
| KI-Verantwortlicher (Gesamt) | | Strategie, Priorisierung, Freigabe |
| IT / Betrieb | | Integration, Berechtigungen, Betrieb |
| Datenschutz | | DSGVO-Konformität, Datenklassifizierung |
| Informationssicherheit | | Risikobewertung, Tool-Prüfung |
| Fachbereich (je Use Case) | | Fachliche Verantwortung, Qualität |

> [!warning] Grundregel
> Kein produktiver Use Case ohne benannten Verantwortlichen. Keine Produktivsetzung ohne geklärte Datenzugriffe.

---

## Teil C — Tool-Freigabeprozess (Ablauf)

1. Antrag (wer will welches Tool wofür mit welchen Daten?)
2. Datenschutz- und Sicherheitsprüfung (Schutzbedarf vs. Tool-Eignung)
3. Risikoklassifizierung (Teil D)
4. Entscheidung (freigegeben / mit Auflagen / abgelehnt)
5. Eintrag ins Use-Case-Register
6. Schulung + Nutzungsleitfaden vor Nutzung

---

## Teil D — Risikoklassifizierung je Use Case

### D1 — Schutzbedarf und Datenarten
| Use Case | Datenarten | personenbezogen? | Geschäftsgeheimnis? | Schutzbedarf |
|---|---|---|---|---|
| | | | | gering/mittel/hoch/sehr hoch |

### D2 — EU-AI-Act-Einordnung
Ordne jeden produktiv geplanten Use Case ein. Referenz: [[EU AI Act]].

| Use Case | Risikoklasse | Begründung | Zusätzliche Pflichten |
|---|---|---|---|
| | ⬜ verboten ⬜ hoch ⬜ begrenzt ⬜ minimal | | |

> [!warning] Hochrisiko
> Bei Einstufung „hoch": zusätzliche Anforderungen (z. B. Risikomanagement, Dokumentation, menschliche Aufsicht, Transparenz) klären, **bevor** der Use Case in Phase 5 umgesetzt wird.

### D3 — Maßnahmen zur Risikominderung
| Use Case | Risiko | Maßnahme | Restrisiko akzeptabel? |
|---|---|---|---|
| | | | ja / nein |

---

## KI-Use-Case-Register (laufend zu pflegen)

| ID | Use Case | Status | Tool | Verantwortlich | Risikoklasse | Freigabe-Datum |
|---|---|---|---|---|---|---|
| | | | | | | |

> [!check] QS-Checkpoint Phase 4
> - [ ] Alle sechs Governance-Bausteine mindestens im Entwurf
> - [ ] Rollen vollständig zugewiesen
> - [ ] Freigabeprozess definiert und kommunizierbar
> - [ ] Jeder geplante Use Case risikoklassifiziert (inkl. EU AI Act)
> - [ ] Datenzugriffe entsprechen dem Schutzbedarf
> - [ ] Register angelegt

> [!example] Weiterführend
> [[EU AI Act]] · [[ISO 27001]] · [[Microsoft Copilot]] (Datenzugriffe/Berechtigungen bei Copilot-Einführung)
