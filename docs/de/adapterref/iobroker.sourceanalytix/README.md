---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sourceanalytix/README.md
title: SourceAnalytix
hash: cJ0zcRjinMYceOqlpu5dgtyyFMRwSAEG4RjYQcqZcw8=
---
# SourceAnalytix

![NPM-Version](http://img.shields.io/npm/v/iobroker.sourceanalytix.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sourceanalytix.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/sourceanalytix-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/sourceanalytix-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.sourceanalytix.svg)
![NPM](https://nodei.co/npm/iobroker.sourceanalytix.png?downloads=true)

[![Übersetzungsstatus] (https://weblate.iobroker.net/widgets/adapters/-/sourceanalytix/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.coronavirus-statistics/workflows/Test%20and%20Release/badge.svg) **Dieser Adapter verwendet den Dienst [Sentry.io](https://sentry.io), um Ausnahmen und Codefehler sowie neue Geräteschemata automatisch an mich als Entwickler zu melden.** Weitere Details siehe unten!

Detaillierte Analyse Ihres Energie-, Gas- und Flüssigkeitsverbrauchs Für Datenanalysen kann jede Quelle (kWh, Wh, Watt, l / h oder m3) verwendet werden:

## Eigenschaften
#### Grundfunktionen
| Zustand | Funktionalität | Beschreibung |
|--|--|--|
| > Gerät <.cumulativeReading | [Werte akkumulieren] (# cumulativeReading) | Berechnen Sie kumulierte Werte<br/> einschließlich [Transformation] (# valueTransformation)<br/> Der kumulierte Wert kann durch Befolgen dieser Schritte geändert werden](#cumulativeReading-Reset) |
| &gt; Gerät &lt;.&gt; Jahr &lt;.&gt; Aktuelles Jahr | [Statistik des laufenden Jahres](#Current-Period) | Speichern Sie statistische Informationen des aktuellen Jahres auf Ebene<br/> &gt; Gerät.&gt; aktuelles Jahr &lt;.&gt; gewählter Zeitraum &lt;|
| &gt; Jahr &lt;.&gt; Aktuelles Jahr.&gt; Verbrauchsart &lt;| [Verbrauch](#consumptionCalculation) | Stammordner zum Speichern von Verbrauchsdaten<br/> (aktueller Wert - vorheriger Wert).<br/> Kann Verbrauch oder Lieferung sein |
| &gt; Jahr &lt;.&gt; Aktuelles Jahr&gt; Kostentyp &lt;| [Kosten](#costCalculation) | Stammordner zum Speichern von Kostendaten.<br/> aktueller Wert * Kosten + Grundpreis<br/> Kann Verbrauch oder Lieferung sein |
| &gt; Jahr &lt;.&gt; Aktuelles Jahr&gt; Kostentyp &lt;| [Kosten] (# costCalculation) | Stammordner zum Speichern von Kostendaten.<br/> aktueller Wert * Kosten + Grundpreis<br/> Kann Verbrauch oder Lieferung sein |

Alle Statusstandorte sind nach Statusnamen gruppiert und in Perioden- und [Kategorie](#Categories)-Strukturen getrennt.<br/> Berechnungen werden automatisch verarbeitet und die Werte in die richtige Einheit umgewandelt, wie in [Preisdefinitionen](#Price-DefinitionsPrice-Definitions) definiert.

Wenn Sie irgendwelche Probleme haben, lesen Sie bitte zuerst die **[Fehlerbehebung](#Troubleshooting)**

## Wie man
### Zustandsaktivierung! ![Haupteinstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/settingKey.png)
![Haupteinstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateSettings.png)

| Konfigurationselement | Beschreibung |
|--|--|
| aktiviert | Aktivieren Sie den Status für SourceAnalytix |
| Alias | Standard: Name des Status, Name des Geräts wie in SA | gezeigt |
| Wählen Sie Typ | obligatorisch, wählen Sie die Berechnungsart, die gemäß [Preisdefinitionen](#Price-Definitions) | berechnet werden soll |
| Wählen Sie Einheit | Standard: Bei Bedarf automatisch manuell auswählen (siehe Protokolle) |
| Kosten | Kostenberechnung |
| ohne Grundgebühr inkl. Grundgebühr bei der Kostenberechnung |
| Verbrauch | Verbrauchsdaten berechnen |
| Zählerwerte | Aktuelle Zählerwerte speichern |
| Zählerstand am </ br> Anfang von x: | Startwert des Zählers für einen bestimmten Zeitraum zur Verarbeitung des </ br> Berechnungsstroms - startValue |

### Grundkonfiguration (Adapterinstanz)
![Haupteinstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/mainSettings.png)

#### CumulativeReading
> ToDo: Logik beschreiben <

#### Verbrauchsberechnung
> ToDo: Logik beschreiben <

#### Kostenkalkulation
> ToDo: Logik beschreiben <

#### ValueTransformation
&gt; ToDo: Dokumentlink zur Bibliothek (document lib also!)<br/> &gt; ToDo: Dokumentieren Sie die Umwandlung von Watt in kWh<br/> &gt; ToDo: Transformation der Dokumenteinheit (wie Watt, von Wh zu KWh<br/>

#### Jahresstatistik
Speichern Sie statistische Informationen zu Verbrauch / Preisen und / oder Kosten / Einnahmen auf Jahresebene<br/> &gt;&gt; Gerät.&gt; dieses Jahr &lt;.&gt; Kategorie &lt;.&gt; ausgewählter Zeitraum

Diese Informationen werden normalerweise für die Datenspeicherung und historische Vergleiche verwendet.<br/> Die Staaten sind nach einem bestimmten Zeitraum gruppiert (wie Jahr 2020 gegen 2021, Erz Februar 2019 gegen Februar ect).

&gt; #### *Wochen* br/> &gt; Geräte &lt;.&gt; Jahr &lt;.&gt; Kosten / Ertrag<br/> &gt; Verbrauch / Lieferung &lt;.Wochen. **WocheNr** &lt;&gt; #### *Monate* br/> &gt; Geräte &lt;.&gt; Jahr &lt;.&gt; Kosten / Ertrag<br/> &gt; Verbrauch / Lieferung &lt;.Monate. **Monat** &lt;&gt; #### *Quartale* br/> &gt; Geräte &lt;.&gt; Jahr &lt;.&gt; Kosten / Ertrag<br/> &gt; Verbrauch / Lieferung &lt;.Viertel. **Qx** &lt;

#### Derzeitige Periode
Speichern Sie statistische Informationen des aktuellen Jahres auf der Ebene:> Gerät.> Aktuelles Jahr <.> Ausgewählter Zeitraum

&gt; #### *Wochen* br/> &gt; Geräte &lt;.&gt; Jahr &lt;.&gt; Kosten / Ertrag<br/> &gt; Verbrauch / Lieferung &lt;.Wochen. **WocheNr** &lt;&gt; #### *Monate* br/> &gt; Geräte &lt;.&gt; Jahr &lt;.&gt; Kosten / Ertrag<br/> &gt; Verbrauch / Lieferung &lt;.Monate. **Monat** &lt;&gt; #### *Quartale* br/> &gt; Gerät &lt;.&gt; Jahr &lt;.&gt; Kosten / Ertrag&gt; Verbrauch / Lieferung &lt;.Viertel. **Qx** &lt;

Diese Informationen werden normalerweise für die tägliche / wöchentliche / monatliche Berechnung von verwendet<br/> Kosten / Ertrag und / oder Verbrauch / Lieferung gruppiert nach festgelegtem Zeitraum

> ToDo: Screenshots hinzufügen <

#### Kategorien
| Kategorie | Typ | Beschreibung |
|--|--|--|
| Kosten | finanziell | Ergebnis des Berechnungswertes * Selbstkostenpreis + Grundpreis |
| Einkommen | finanziell | Ergebnis des Berechnungswertes * Verdienstpreis + Grundpreis |
| Verbrauch | Berechnungen Ergebnis des Berechnungswertes als Kostenstartwert<br/> von Jahr / Monat / Quartal usw. |
| Lieferung | Berechnungen Ergebnis des Berechnungswertes als Lieferung - Startwert<br/> von Jahr / Monat / Quartal usw. |

### Fehlerbehebung
Bevor wir mit der Fehlerbehebung beginnen, ist es wichtig zu verstehen, wie Source Analytix initialisiert wird, da hier Fehler auftreten können, siehe Abschnitt "Probleme".
Die folgende Sequenz wird behandelt:

1) SourceAnalytix starten 2) Alle für SourceAnalytix aktivierten Zustände auflisten 3) Zustände für jeden Zustand einleiten:

    * Lesen Sie das aktuelle kumulierte Lesen </ br>

      (falls vorhanden) und Speicherwerte aus dem Status

    * Überprüfen Sie, ob das Gerät gehandhabt werden kann {Problem 1}
    * Überprüfen Sie, ob die Kostenart ausgewählt ist {Ausgabe 2}
    * Überprüfen Sie, ob für die Kostenart {Ausgabe 3} eine gültige Preisdefinition vorliegt.
    * Überprüfen Sie, ob der vorherige Initialisierungswert> der aktuelle kumulierte Wert ist {Problem 4}
    * Überprüfen Sie, ob der vorherige Geräte-Reset gültig ist> aktueller kumulierter Wert {Problem 5}
    * Speichern Sie alle Daten im Speicher

4) Initialisieren Sie Zustände für jeden Zustand:

    * create state cumulativeReading (zum Speichern von Berechnungsergebnissen, kann auch nur für W bis kWh verwendet werden) {Ausgabe 6}
    * Erstellen Sie Status wie in der Statuskonfiguration ausgewählt {Ausgabe 7}
    * Berechnung starten

5) Bei Statusänderung / Aktualisierung

    * Überprüfen Sie, ob die Informationen korrekt sind
    * Wert in richtige Einheit umwandeln (Zustandseinheit in Einheit, die in der Zustandskonfiguration ausgewählt wurde)
  * Überprüfen Sie, ob die Werteingabe korrekt ist (aktueller Wert **** VorherigerInit-Wert) {Siehe **7 Beim Zurücksetzen des Geräts** Ausgabe 8}
    * Berechne {Ausgabe 9}
      * Für Watt: Berechnen Sie Watt in kWh, berechnen Sie cumulatedReading = currentReading + cumulatedReading
      * Für andere: berechne cumulatedReading = currentReading + previousDeviceReset (falls vorhanden)

6) Nachts (00.00)

    * Alle aktivierten SourceAnalytix-Zustände auflisten
    * Startwerte (Tag / Woche / Jahr / Monat) zurücksetzen

7) Beim Zurücksetzen des Geräts

    * Speichern Sie den aktuellen Wert als previousDeviceReset- und previousInit-Wert </ br>

Wenn das Gerät erneut zurückgesetzt wird (erkannt durch den Wert von previousInit), wird </ br> currentReading + previousDeviceReset wie bei previousDeviceReset gespeichert.

** Problem 1 ** Keine Einheit definiert für ....., kann keine Berechnungen ausführen </ br> Bitte wählen Sie die richtige Einheit in den Statuseinstellungen aus

** Problem 2 ** Kein Kostentyp definiert für ....., bitte Wählen Sie den Berechnungstyp bei der Statuseinstellung aus. </ Br> Bitte wählen Sie den gewünschten Kostentyp aus, um zu verstehen, welcher Betrag für die Berechnung verwendet werden soll

** Problem 3 ** Ausgewählter Typ ... existiert nicht in Preisdefinitionen </ br> Jetzt werden Preisdefinitionen für den ausgewählten Kostentyp gefunden. Bitte überprüfen Sie Ihre Preiseinstellung (Konfiguration anpassen).

** Ausgabe 4 ** Überprüfen Sie die Einstellungen für .....! Bekannter Init-Wert: .....> bekannter kumulativer Wert ..... kann nicht fortgesetzt werden </ br> Der bekannte Init-Wert> bekannte kumulierte Werte, dies kann durch Entfernen oder Ändern dieser Objekte im Status-Rohobjekt gelöst werden

```"valueAtDeviceInit": xxxx```

** Ausgabe 5 ** Überprüfen Sie die Einstellungen für .....! Bekannter WertAtDeviceReset: .....> bekannter kumulativer Wert ..... kann nicht verarbeitet werden </ br> Der bekannte Init-Wert> bekannte kumulierte Werte, dies kann gelöst werden </ br> Entfernen oder Ändern dieser Objekte im Status-Rohobjekt

```valueAtDeviceReset": xxxx```

** Problem 6 ** Status für kumulatives Lesen wird nicht erstellt </ br> Die Initialisierung des Status ist fehlgeschlagen, siehe Problem 1 bis 5

** Ausgabe 7 ** Zustände für Kostenablesungen wurden nicht erstellt </ br> Die Art der Berechnung ist in den Zustandseinstellungen nicht aktiviert. ![Haupteinstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateSettings.png)

### Preisdefinitionen ![Haupteinstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/priceSettings.png)
** Problem 8 **aktueller Wert** <** previousInit </ br> Ein Geräte-Reset wurde erkannt, siehe Funktion 7

** Problem 9 ** Meine Berechnungen sind falsch </ br>

#### CumulativeReading-Reset 1) Überprüfen Sie, ob die richtige Einheit ausgewählt ist (von nicht ausgewählt, SA versucht, automatisch zu erkennen). 2) Überprüfen Sie, ob das kumulierte Lesen den korrekten Gesamtwert Ihres Wertes widerspiegelt, falls nicht </ br>
        - Stoppen Sie SA
        - Gehen Sie zu Registerkartenobjekten

          ![Haupteinstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/cumulativeReading-Reset.png)

        - Wechseln Sie in den Expertenmodus
        - Ändern Sie das kumulierte Lesen
        - Beenden Sie den Expertenmodus
        - Stellen Sie sicher, dass die Startwerte richtig eingestellt sind
        - Starten Sie SA </ br>

3) Stellen Sie sicher, dass die Startwerte richtig eingestellt sind</br> SA verarbeitet Berechnungen mit cumulatedReading - bekannt als cumulatedReading zu Beginn des Zeitraums. <b/>Diese Startwerte werden in den Statuseinstellungen definiert und sollten &lt;als **currentReading** sein</b></br> <b/>Bitte stellen Sie sicher, dass cumulativeReading&gt; = DayStart&gt; = WeekStart&gt; = MonthStart&gt; = QuarterStart&gt; = YearStart ![Haupteinstellungen](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateStartValues.png)</b>

4) Überprüfen Sie diese Werte im Status-Rohobjekt:

```valueAtDeviceReset": xxx```

```"valueAtDeviceInit": xxx```

<! - **Problem 6** Einstellung - Status für SourceAnalytix kann nicht deaktiviert werden

Im RAW NUR "Verbrauch": false umgestellt, gehört. Das wurde behalten (wo ggf. noch nicht falsch, auch bei "aktiviert": falsch und bei "Kosten": falsch) In der Objekt-Übersicht ist der Schraubenschlüssel nachwievor blau. Dann mit dem Schraubenschlüssel in das Objekt, SA Krieg nicht der Haken bei Interessen drin. Dort einmal aufgenommen, nicht gespeichert, wieder aufgestaltet.
Kontrolle im RAW, ob SA-EIntrag Nonne weg => jup, ist Nonne fott ->

<!--

* Verfolgen Sie den Verbrauch täglich, wöchentlich, monatlich, vierteljährlich, jährlich
* Kosten berechnen (aktueller Preis ist konfigurierbar)
* Kann für Stromverbrauch, Flüssigkeiten und GAS verwendet werden
* Eingabewerte können wh / kWh / Watt / m3 / l sein

-->

Dieser Adapter hat Wurzeln dank dank Pix im Jahr 2016 https://forum.iobroker.net/viewtopic.php?f=21&t=2262

Was von @hadering verbessert und auf github https://github.com/hdering/homematic_verbrauchszaehler veröffentlicht wurde

## Machen
* [] Dokumentation!
* [] Periodenberechnung auswählbar, aber noch nicht implementiert
* [] monatlicher Selbstkostenpreis noch nicht in die Berechnung einbezogen
* [] Neuberechnung basierend auf Zählerwerten (konfigurierbar nach Datum)
* [] Objektzustände für vorherigen [x] Tag, [x] Woche, [x] Monat, [x] Quartal, [x] Jahr hinzufügen, die in den Adaptereinstellungen konfiguriert werden können

## Unterstütze mich
Wenn Ihnen meine Arbeit gefällt, ziehen Sie bitte eine persönliche Spende in Betracht (dies ist ein persönlicher Spendenlink für DutchmanNL, keine Beziehung zum ioBroker-Projekt!) [![Spenden] (https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.sourceanalytix/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Was ist Sentry.io und was wird den Servern dieses Unternehmens gemeldet?
Sentry.io ist ein Dienst für Entwickler, um einen Überblick über Fehler in ihren Anwendungen zu erhalten. Und genau das ist in diesem Adapter implementiert.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll angezeigt wird, an Sentry gesendet. Wenn Sie der iobroker GmbH erlaubt haben, Diagnosedaten zu sammeln, ist auch Ihre Installations-ID (dies ist nur eine eindeutige ID **ohne** zusätzliche Informationen über Sie, E-Mail, Name oder dergleichen) enthalten. Auf diese Weise kann Sentry Fehler gruppieren und anzeigen, wie viele eindeutige Benutzer von einem solchen Fehler betroffen sind. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die im Grunde nie abstürzen.

<! - Platzhalter für die nächste Version (am Zeilenanfang):

### __WORK IN PROGRESS__ ->
### 0.4.8-beta.0 (2021-01-18)
* (Holländer) Bugfix: Formatierung von Nachrichten
* (Holländer) Bugfix: Löscht Zustände in der Erstellungsfunktion
* (Holländer) Bugfix: Falsche Initialisierung für Staaten
* (Holländer) Bugfix: Vermeiden Sie NULL & 0-Werte beim nächtlichen Zurücksetzen
* (Holländer) Bugfix: Falsche Initialisierung für Wattwerte mit 0 Eingabe
* (Holländer) Bugfix: Erstelle nur kumuliertes XXX in der Jahresstatistik, wenn aktiviert
* (Niederländer) implementieren kumulative Werte der Kategorie in der Jahresstatistik

### 0.4.8-alpha.15 (2021-01-16)
* (Holländer) Bugfix: Problem beim Laden des Arrays bei der ersten Berechnungsbehandlung
* (Holländer) Bugfix: Kumulativer Wert für das Objekt

### 0.4.8-alpha.14 (2021-01-16)
* (Holländer) Ändern Sie die Standardprotokollstufe in "Info"
* (Holländer) Bugfix: Vierteln.1 hat kein vorhandenes Objekt
* (Holländer) Bugfix: 05_currentYear hat kein vorhandenes Objekt
* (Holländer) Bugfix: Wachpostenfehler: Alias xxxxx hat kein Ziel
* (Holländer) Bugfix: Falsche Warnmeldung, wenn die Konfiguration für Objekte geändert wird

### 0.4.8-alpha.13 (2021-01-15)
* (Holländer) Bugfix: Fehler {Ist keine Zahl, kann Berechnung nicht fortsetzen} wenn Wert = 0

## Changelog
### 0.4.8-alpha.12 (2021-01-14)
* (Dutchman) Bugfix : Ensure daily reset does not destroy cumulative memory value (Fixes NULL values for Watt after night reset)
* (Dutchman) Bugfix : Ensure a proper reset and init of Watt values

### 0.4.8-alpha.10 (2021-01-14)
* (Dutchman) Bugfix : Avoid loop if init value is set and > reading
* (Dutchman) Bugfix : Throw error if value is NULL for troubleshooting instead of handling incorrect calculation

### 0.4.8-alpha.9 (2021-01-13)
#### Breaking changes
* (Dutchman) Breaking!!! Move current values to currentYear [#135](https://github.com/iobroker-community-adapters/ioBroker.sourceanalytix/issues/135)
* (Dutchman & ToTXR4Y) MajorChange !: Replaced **Current_Reading** with **CumulativeReading** [226](https://github.com/iobroker-community-adapters/ioBroker.sourceanalytix/issues/226)

#### New Features
* (Dutchman) Code cleanup
* (Dutchman) Add back "currentYear"
* (Dutchman) (debug) Logging improved
* (Dutchman) Weekly reset of weekdays
* (Dutchman) Calculation for all states
* (Dutchman) Calculation for previous states [#242](https://github.com/iobroker-community-adapters/ioBroker.sourceanalytix/issues/242)
* (Dutchman) Optimized error reporting (Sentry)
* (Dutchman) Removed unneeded settings in configuration
* (Dutchman) Implemented new configuration for "currentYear"
* (Dutchman & ToTXR4Y) implement "05_currentYear" in year root folder [#280](https://github.com/iobroker-community-adapters/ioBroker.sourceanalytix/issues/280)
* (Dutchman & ToTXR4Y) implement cached memory slot for initialisation value [#226](https://github.com/iobroker-community-adapters/ioBroker.sourceanalytix/issues/226)
* (Dutchman & ToTXR4Y) Implement log messages if state attributes are changed
* (Dutchman & ToTXR4Y) Implement automatically detection of currency from admin settings [#247](https://github.com/iobroker-community-adapters/ioBroker.sourceanalytix/issues/247)

#### BugFixes
* (Dutchman) Bugfix : dev: 0 bug workaround
* (Dutchman) Do not round cumulated reading
* (Dutchman) Bugfix : Calculations for "previous" values    
* (Dutchman) Bugfix : Avoid calculation of non-Initialised states
* (Dutchman) Bugfix : Cannot read property 'stateDetails' of null
* (Dutchman) Correct error handling of "Watt" state initialisation
* (Dutchman & ToTXR4Y) Bugfix : Rebuild calculation logic which solves :
  * Watt values : Ensure proper reading start (0 instead of current watt value)
    Watt values : Ensure proper reading calculation with exponent (0 instead of current watt value) [#281](https://github.com/iobroker-community-adapters/ioBroker.sourceanalytix/issues/281)
  * All calculations : correct handling  of device reset (if value is reset or 0)

### 0.4.7 (2020-09-15) Solved NULL error's & daily resets
* (Dutchman) Implement Sentry
* (Dutchman) Implement configuration for Price definitions
* (Dutchman) Bugfix: NULL value issue  at daily reset
* (Dutchman) Bugfix: Issue found in selection of category
* (Dutchman) Bugfix: Category issue (read value of undefined)
* (Dutchman) Bugfix: Issue in storing meter values by month
* (Dutchman) Bugfix: Wrong reading value for Watt initialisation
* (Dutchman) Bugfix: Warnings at object creations (js-controller 3.x)
* (Dutchman) Bugfix: wrong interpretation of start values at value resets
* (Dutchman) Bugfix: Proper error message instead of code crash if no cost type defined
* (Dutchman) Add device name for log messages if device value < than currently known value
* (Dutchman) Bugfix : Crash at adapter start if chosen Type is not present in instance configuration    

### 0.4.2 (2020-04-12) BugFixes
* (Dutchman) Translations updated
* (Dutchman) Bugfix : Values do not reset at new day start
* (Dutchman) Bugfix : Handle calculations when reading = 0
* (Dutchman) Bugfix : Handle calculations at initialisation
* (Dutchman) Bugfix : Pause all calculation during day-reset
* (Dutchman) Do not calculate values is state is update with same value as previous

### 0.4.0 (2020-04-05) Adapter completely redesigned, please test carefully
* (Dutchman) Complete code rebuild
* (Dutchman) Change data points to root by year
* (Dutchman) Delete unneeded states automatically
* (Dutchman) Calculation by quarter implemented
* (Dutchman) Storage of meter values implemented
* (Dutchman) Rebuild calculation logic to handle in memory instead of object DB (performance)

### 0.3.0   
* (Dutchman) m³ Implemented

### 0.2.5
* (xXBJXx) Fix wrong storage of start meter values

### 0.2.41
* (Dutchman) Fix wrong storage of daily reset of meter values

### 0.2.3
* (Xoroles & Dutchman) fix watt calculation, thank you @Xoroles !

### 0.2.29
* (Dutchman) implemented w to kWh calculations :) with thanks to @AlCalzone and @andiling !

### 0.2.276
* (Dutchman) implemented meter readings
* (Dutchman & @AlCalzone) code improvements & stability
* (Dutchman) fix issue with liquid unit reading (m3)

### 0.2.273
* (Dutchman) fix issue in daily reset of start values
* (Dutchman) Fix badges in readme
* (Dutchman) exclude calculations of w from current routines (will be implemented in next version(s)

### 0.2.272
* (Dutchman) change logic of initialisation
* (Dutchman) fix issue in calculation handling
* (Dutchman) extract unit definition to central function
* (Dutchman) removed "logging to troubleshoot", use "debug" in adapter setting

### 0.2.271
* (Dutchman) implement compact mode
* (Dutchman) fix testing issues
* (Dutchman) fix error "unit" or "tolowercase" is undefind
* (Dutchman) fixed installation issues

### 0.2.27
* (Dutchman) fixed issue related to multihost installations with slave as target

### 0.2.26
* (Dutchman) fixed issue in calculations for gas environments and liquids
* (Dutchman) improve logging related to issue analytics

### 0.2.25
* (Dutchman) add option in state setting to automatically OR manually choose the meassurement unit (for cases device state does not have correct value)

### 0.2.24
* (Dutchman) add support for heating pumps
* (Dutchman) improvements in adapter configuration screen

### 0.2.2
* (Dutchman) fixed reset of start values
* (Dutchman) removed uneeded logging "Write calculations for : "
* (Dutchman) generic improvement of logging, to see status messages activate it in adapter settings ! Otherwise onlyu erros will be shown and add/del devices
* (Dutchman) improved complete logic of state add/delete/update config in backend which will result in better performance/error handling
* (Dutchman) small fixed in configuration screen to show logging options

### 0.2.1
* (Dutchman) fixed "current_day" missing in object tree
* (Dutchman) fixed log messages "removed from SourceAnalytix"
* (Dutchman) fixed unit issue to support upper and lower case in values
* (Dutchman) fixed unit issue replace strange characters
* (Dutchman) remove intervall setting from configuraiton screen (handle by state subscribtion now!)
* (Dutchman) remove start meassurement from state configuraiton screen (not need, please use day start, week start etc !)

### 0.2.0
* (Dutchman) rebuild logic to calculate values (beta testing)
* (Dutchman) implement logic to automatically reset values by start of new day, week, month, year etc (beta testing)
* (Dutchman) changed logic from intervall polling to handle calculations based on state updates (beta testing, not if suitable for all situations)
* (Dutchman) fixed issue incorrect states are added to monitoring
* (Dutchman) fixed issue calculation not stopped when state removed from monitoring
* (Dutchman) always store all current meassurements to values of cathegorie regardless setting year etc
* (Dutchman) code cleanup and optiomalisation
* (Dutchman) added logging option "satus notification"
* (Dutchman) implement new translation mechanisme


### 0.1.9 
* (Dutchman) Adapter moved to community development tree
* (Dutchman) added npm version and test-status to readme
* (Dutchman) finalized new konfiguration screen & translations
* (Dutchman) adding/removing objects from analytix does not need adapter reboot anymore ! :-)
* (Dutchman) rebuild logic how data is handled as basic for new calculation logic (Experimental)
* (Dutchman) added options to year analytics to choose values (days,weeks,years etc)
* (Dutchman) option added for Developer logging
* (Dutchman) Basic price is currently not considered in cost calculations !
* (Dutchman) Values day start, week start etc are currenlty not automatically set (will be in 0.2.0)


### 0.1.8 (unuasable temporary verion )
* (Dutchman) konfiguration pages completly redesigned : Please do not enter values yet !
* (Dutchman) master konfiguration added to globally define costs
* (Dutchman) intervall settings moved to global setting instead of each state seperated
* (Dutchman) instead of cost-price in each state use drop down menu to choose values from global settings
* (Dutchman) fixed naming and translations

### 0.1.6
* (Dutchman) fixed data reset for quarter values (thank you Jens !)
* (Dutchman) fixed usage of alias
* (Dutchman) fixeded issue in calculation of earnings and delivery
* (Dutchman) logging improvement
* (Dutchman) fixed log messages
* (Dutchman) calculation for m3 values
* (Dutchman) calculation for l values

### 0.1.5
* (Dutchman) improved state write logic, only sent write commando when needed

### 0.1.3
* (Dutchman) add support for calculation of Wh values

### 0.1.0
* (Dutchman) first public beta release
* (Dutchman) fixed translations
* (Dutchman) rebuild calculation logic
* (Dutchman) fixed calculation of start offset
* (Dutchman) adjustable if state is used for cosumption or delivery
* (Dutchman) limited possible logging to kWh only for this moment
* (Dutchman) only create states and channels for logging types selected

### 0.0.9
* (Dutchman) fixed wrong calculation of start values
* (Dutchman) fixed wrong calculation of quarter values
* (Dutchman) prepare public beta and travis testing
* (Dutchman) change name to SourceAnalytix
* (Dutchman) implemented SourceAnalytix settings at states (equal to data logging adapters)
* (Dutchman) configurable unit for every state, automatically from object state. currently only kWh supported !

### 0.0.8
* (Dutchman) configurable intervall for every state

### 0.0.7
* (Dutchman) automated reset of start values

### 0.0.6
* (Dutchman) fixed issue with travis build
* (Dutchman) fixed wrong information in package-json

### 0.0.4
* (Dutchman) cost calculation
* (Dutchman) adjustable starting point of meassurement
* (Dutchman) support of multiple device states instead of 1
* (Dutchman) fixed calculation of current consumptions

### 0.0.3
* (Dutchman) code optimalisation

### 0.0.2
* (Dutchman) creation of object structure
* (Dutchman) first values read based on test_object.js input file to read values adn write data of current period.s

### 0.0.1
* (Dutchman) initial release

## License
MIT License

Copyright (c) 2020 Dutchman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.