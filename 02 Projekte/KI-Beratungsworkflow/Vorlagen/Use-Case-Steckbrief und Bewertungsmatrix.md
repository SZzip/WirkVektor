---
tags: [vorlage, beratung, workflow]
phase: 2-bewerten
---

# Use-Case-Steckbrief und Bewertungsmatrix (Phase 2–3)

> [!abstract] Zweck
> Erfasst und bewertet jeden KI-Anwendungsfall systematisch. Pro Use Case einen Steckbrief; die Gesamtmatrix am Ende dient der Priorisierung in Phase 3. Siehe [[KI-Beratungsworkflow]] Phase 2 und 3.

---

## Teil A — Use-Case-Steckbrief (pro Use Case duplizieren)

| Feld | Eintrag |
|---|---|
| **Use-Case-ID / Titel** | |
| **Fachbereich** | |
| **Problem / Anlass** | |
| **Betroffener Prozess** | |
| **Was soll KI tun?** | |
| **Erwarteter Nutzen** (qualitativ) | |
| **Benötigte Daten** | |
| **Schutzbedarf der Daten** | gering / mittel / hoch / sehr hoch |
| **Beteiligte / Nutzer** | |
| **Abhängigkeiten** | |
| **Risiko-Flags** | personenbezogene Daten? Geschäftsgeheimnisse? kritische Entscheidung? |

---

## Teil B — Bewertung (acht Kriterien, je 1–5)

> [!info] Skala
> **Nutzen, Datenverfügbarkeit, Akzeptanz, Skalierbarkeit:** 1 = niedrig … 5 = hoch (höher ist besser).
> **Aufwand, Integrationsaufwand, Sicherheits-/Datenschutzrisiko, regulatorische Relevanz:** 1 = niedrig … 5 = hoch (niedriger ist besser).

| Kriterium | Wert (1–5) | Begründung |
|---|---|---|
| Geschäftlicher Nutzen | | |
| Technischer Aufwand | | |
| Datenverfügbarkeit | | |
| Integrationsaufwand | | |
| Sicherheits-/Datenschutzrisiko | | |
| Regulatorische Relevanz | | |
| Akzeptanz im Fachbereich | | |
| Skalierbarkeit | | |

**Einordnung Nutzen-Aufwand-Risiko:**
- Nutzen: hoch / mittel / niedrig
- Aufwand: hoch / mittel / niedrig
- Risiko: hoch / mittel / niedrig
- **Kategorie:** ⬜ Quick Win ⬜ Strategisches Vorhaben ⬜ Später / Beobachten ⬜ Verwerfen

---

## Teil C — Gesamtmatrix (alle Use Cases)

| ID / Titel | Nutzen | Aufwand | Risiko | Daten | Akzeptanz | Kategorie | Pilot-Kandidat? |
|---|---|---|---|---|---|---|---|
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |

> [!tip] Lesart für die Priorisierung
> **Quick Wins** = hoher Nutzen, niedriger Aufwand **und** niedriges Risiko → zuerst, gute Pilot-Kandidaten.
> Hohes Risiko verschiebt einen Use Case nicht automatisch nach hinten — es bedeutet, dass Phase 4 (Absichern) vor der Umsetzung gründlicher wird.

> [!check] Qualitätscheck
> - [ ] Jeder Use Case vollständig erfasst
> - [ ] Alle acht Kriterien bewertet (nicht nur Nutzen)
> - [ ] Schutzbedarf und Risiko-Flags gesetzt
> - [ ] Mindestens ein klarer Pilot-Kandidat markiert

> [!example] Übergabe
> Befüllte Matrix → Phase 3 Priorisierung → [[Management-Entscheidungsvorlage]].
