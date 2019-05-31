---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.viessmannapi/README.md
title: ioBroker.viessmannapi
hash: E+E7xqiJjqeHgW33UbeLs5yc7G6Tp7c9OqAghBPYONY=
---
![Logo](../../../en/adapterref/iobroker.viessmannapi/admin/viessmannapi.png)

![Build Status](https://travis-ci.org/thovid/ioBroker.viessmannapi.svg?branch=master)
![Anzahl der Installationen](http://iobroker.live/badges/viessmannapi-installed.svg)

# IoBroker.viessmannapi
=================

Dieser Adapter verbindet Ihr ioBroker-System über die Viessmann-API mit Ihrer Viessmann-Zentralheizung. Voraussetzung ist, dass Ihre Heizungsanlage über einen Vitoconnect oder ein ähnliches Gerät mit dem Viessmann Server verbunden ist. Alle von der API bereitgestellten aktivierten Informationen werden regelmäßig (alle 60 Sekunden) abgefragt und in Status geschrieben.

Beachten Sie, dass dies ein privates Projekt ist. Die Verwendung erfolgt auf eigenes Risiko. Es wird von Viessmann weder unterstützt noch unterstützt!

## Installation
Da sich dieser Adapter in einem frühen Entwicklungsstadium befindet, kann die Installation über das 'neueste' Repository von ioBroker erfolgen. Geben Sie in den Adaptereinstellungen den Benutzernamen und das Passwort Ihres Viessmann-Kontos ein. Wenn alles gut geht, sollten unter `viessmannapi.X` Zustände angezeigt werden. Erste Werte sollten nach 60 Sekunden eintreffen.

## Zustände
Die spezifischen Zustände können von Ihrer Installation abhängen. Beispiele sind

- `viessmannapi.0.heating.boiler.sensors.temperature.main.value` - Kesseltemperatur
- `viessmannapi.0.heating.circuits.0.heating.curve.shift` und` slope` - Shift und Slope bestimmen die Heizkurve
- `viessmannapi.0.heating.circuits.0.operating.modes.active.value` - aktueller Betriebsmodus; Beispielsweise bedeutet "Brauchwasser" nur heißes Wasser, "Brauchwasser und Heizen" bedeutet heißes Wasser und Heizen
- `viessmannapi.0.heating.sensors.temperature.outside.value` - vom externen Fühler gemessene Außentemperatur

## Aktionen
Einige Funktionen bieten *Aktionen* zum Ändern einiger Eigenschaften. Eine Aktion kann über die Methode `sendTo` aufgerufen werden. Die Syntax sieht folgendermaßen aus:

```javascript
sendTo('viessmannapi.0', 'action', {
    feature: 'heating.circuits.0.operating.programs.comfort',
    action: 'setTemperature',
    payload: {targetTemperature: 20}
});
```

Der obige Aufruf würde die Zieltemperatur für das Komfortprogramm auf 20 °C einstellen.

### Unterstützte Aktionen
Im Folgenden finden Sie eine Liste der unterstützten Aktionen (Beachten Sie, dass abhängig von Ihrer Heizungsinstallation einige Aktionen möglicherweise nicht verfügbar sind oder andere Aktionen verfügbar, aber hier nicht dokumentiert sind).

| Funktion | Aktion | Feld | Anmerkungen |
|---------------------------------------------------|----------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| **Heizkreise.X.Zirkulationsplan** | | | |
| | setSchedule | | Legt den Zeitplan für den Umlauf des Stromkreises 'X' | fest |
| | | `newSchedule` (Typ: Zeitplan, siehe unten, Modi: 'Ein', Standard: 'Aus') | siehe Beschreibung des Zeitplantyps unten |
| **Heizkreise.X.Heizkurve** | | | |
| | | `slope` (Anzahl, min: 0,2, max: 3,5, Schrittweite: 0,1) | |
| | | `shift` (Anzahl, min: -13, max ": 40, Schrittweite: 1) | |
| | | `shift` (Zahl, min: -13, max": 40, Schrittweite: 1) | |
| **Heizkreise.X.Heizungsplan** | | | |
| | | `newSchedule` (Typ: Zeitplan, siehe unten, Modi: 'normal', Standard: 'reduziert' | siehe Beschreibung des Zeitplantyps unten |
| | | `newSchedule` (Typ: Schedule, siehe unten, Modi: 'normal', Standard: 'reduziert' | siehe Beschreibung des Schedule-Typs unten |
| **Heizkreise.X.Betriebsarten.aktiv** | | | |
| | | `mode` (Zeichenfolge, Aufzählung: ["Standby", "Brauchwasser", "BrauchwasserundHeizung", "Zwangsreduziert", "Zwangsnormal"]) | erforderlich |
| | | `mode` (string, enum: [" standby "," dhw "," dhwAndHeating "," forcedReduced "," forcedNormal "]) | erforderlich |
| **Heizkreise.X.Betriebsprogramme** | | | |
| | | `targetTemperature` (Anzahl, min: 4, max: 37, Schrittweite: 1) | erforderlich |
| | | `targetTemperature` (Zahl, min: 4, max: 37, Schrittweite: 1) | erforderlich |
| | aktivieren | | Keine Felder (leeres Objekt senden), aktiviert den Komfortmodus |
| | deaktivieren | | Keine Felder (leeres Objekt senden), Komfortmodus deaktivieren |
| ** Heizkreise.X.Betriebsprogramme | | |
| | | `temperature` (Anzahl, min: 3, max: 37, Schrittweite: 1) | optional |
| | | `Temperatur` (Zahl, min: 3, max: 37, Schrittweite: 1) | optional |
| | deaktivieren | | Keine Felder (leeres Objekt senden), deaktiviert den Eco-Modus |
| **Heizkreise.X.Betriebsprogramme.Urlaub** | | | |
| | | `start` (Zeichenfolge) | Erforderliches, unbekanntes Format (wahrscheinlich irgendeine Form von Datumszeichenfolge?) |
| | | `end` (Zeichenfolge) | Erforderliches, unbekanntes Format (wahrscheinlich irgendeine Form von Datumszeichenfolge?) |
| | | `end` (string) | Erforderliches, unbekanntes Format (wahrscheinlich irgendeine Form von Datumszeichenfolge?) |
| | ungeplant | | Keine Felder (leeres Objekt senden), deaktiviert Ferienprogramm |
| **Heizkreise.X.Betriebsprogramme.normal** | | | |
| | | `targetTemperature` (Anzahl, min: 3, max: 37, Schrittweite: 1) | erforderlich |
| | | `targetTemperature` (Zahl, min: 3, max: 37, Schrittweite: 1) | erforderlich |
| **Heizkreise.X.Betriebsprogramme.reduziert** | | | |
| | | `targetTemperature` (Anzahl, min: 3, max: 37, Schrittweite: 1) | erforderlich |
| | | `targetTemperature` (Zahl, min: 3, max: 37, Schrittweite: 1) | erforderlich |
| **heizen.dhw.oneTimeCharge** | | | |
| | aktivieren | | Keine Felder (leeres Objekt senden). Aktiviert die einmalige Aufladung des Warmwasserspeichers. |
| | deaktivieren | | Keine Felder (leeres Objekt senden). Deaktiviert die einmalige Aufladung des Warmwasserspeichers. |
| **heizung.dhw.temperatur** | | | |
| | | `temperature` (Anzahl, min: 10, max: 60, Schrittweite: 1) | erforderlich |
| | | `Temperatur` (Zahl, min: 10, max: 60, Schrittweite: 1) | erforderlich |
| **heizung.dhw.zeitplan** | | | |
| | | `newSchedule` (Typ: Zeitplan, siehe unten, Modi: 'Ein', Standard: 'Aus') | Siehe Beschreibung des Zeitplantyps unten |
| | | `newSchedule` (Typ: Schedule, siehe unten, Modi: 'on', Standard: 'off') | Siehe Beschreibung des Zeitplantyps unten |

### Zeitplantyp
Die meisten Aktionen verwenden einfache Datentypen (Zahlen, Zeichenfolgen). Einige Aktionen ermöglichen das Festlegen von Zeitplänen. Ein Zeitplan sieht folgendermaßen aus:

```javascript
{
   "mon":[
      {
         "start":"05:30",
         "end":"10:00",
         "mode":"on",
         "position":0
      },
      {
          "start":"11:00",
          "end":"12:30",
          "mode":"on",
          "position":1
      },
      /* ... */
   ],
   "tue":[ /* ... */ ],
   "wed":[ /* ... */ ],
   "thu":[ /* ... */ ],
   "fri":[ /* ... */ ],
   "sat":[ /* ... */ ],
   "sun":[ /* ... */ ]
}
```

Für jeden Tag muss ein Array bereitgestellt werden, das die "Zeitpläne" für diesen Tag enthält. Ein einzelner Eintrag besteht aus der Start- und Endzeit, dem geplanten "Modus" und der Position. Welche Modi unterstützt werden, hängt von der Planung ab (siehe Tabelle der unterstützten Funktionen oben). Außerhalb der geplanten Elemente wird der Standardmodus verwendet (siehe Tabelle oben). Im obigen Beispiel soll etwas am Montag zwischen 5:30 und 10:00 Uhr und zwischen 11:00 und 12:30 Uhr "an" sein. Außerhalb dieser Zeitintervalle ist der Standardmodus ("Aus") geplant.

### Abfrage aller Funktionen
Um eine Liste aller verfügbaren Funktionen mit allen verfügbaren Aktionen zu erhalten, senden Sie einfach die Nachricht `describe` an eine aktive Adapterinstanz. Das Ergebnis ist ein Array aller verfügbaren Funktionen, die beispielsweise über `JSON.stringify()` als JSON-String ausgedruckt werden können.

*Beispiel:*

```javascript
sendTo('viessmannapi.0', 'describe', {}, (result) => {
    const features = JSON.stringify(result.result);
    log(features);
});
```

Dieses Skript fragt alle verfügbaren Funktionen ab und druckt sie in das Protokoll.

## Anmerkungen
- Dieser Adpater ist in der frühen Entwicklung! Erwarten Sie Bugs und melden Sie Bugs hier auf github (https://github.com/thovid/ioBroker.viessmannapi/issues ").

## Legal
- Viessmann und Vitoconnect sind eingetragene Marken der Viessmann Werke GmbH & Co. KG.

- Dieses Projekt ist ein privates Projekt und wird von der Viessmann Werke GmbH & Co. KG *nicht* offiziell unterstützt oder unterstützt. Die Verwendung erfolgt auf eigenes Risiko.

- Falls Sie Fragen haben, kontaktieren Sie mich bitte per Github!

## Changelog
### 1.3.2 (2019/02/10)
* (thovid) Fixed a bug preventing the adapter to start
### 1.3.1 (2019/02/05)
* (thovid) reduced package size by removing unused stuff
### 1.3.0 (2019/02/05)
* (thovid) impoved action execution: validation of payload improved, schedule payload now supported
* (thovid) added support for compact mode
* (thovid) added configuration for poll interval
### 1.2.0 (2018/12/18)
* (thovid) added experimental support to execute actions on a feature via the `sendTo` function
### 1.1.2 (2018/12/10)
* (thovid) fixed bug that prevented email and password to be removed after initial authentication 
### 1.1.1 (2018/12/10)
* (thovid) fixed a bug that prevented certain properties from beeing exposed as states (for example `heating.burner`)
### 1.1.0 (2018/12/10)
* (thovid) Deletes email and password after sucessful connection, further connections are done via refresh token
* (thovid) Uses npm released version of client lib, so no longer requires git upon installation
### 1.0.0 (2018/12/07)
* (thovid) Initial adapter

## License
The MIT License (MIT)

Copyright (c) 2018 Thomas Vidic

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.