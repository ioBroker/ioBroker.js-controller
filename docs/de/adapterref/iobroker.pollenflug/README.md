---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pollenflug/README.md
title: Pollenrisikoindex
hash: RjP/kMcMjP8AFiLqq64h2tjH2yUsQbolm3pTtgV7UQs=
---
![Logo](../../../en/adapterref/iobroker.pollenflug/admin/pollenflug.png)

![Travis CI Build Status](https://travis-ci.org/schmupu/ioBroker.pollenflug.svg?branch=master)
![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.pollenflug?branch=master&svg=true)
![Anzahl der Installationen](http://iobroker.live/badges/pollenflug-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.pollenflug.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.pollenflug.svg)
![NPM](https://nodei.co/npm/iobroker.pollenflug.png?downloads=true)

# Pollenrisikoindex
![DWDLogo](../../../en/adapterref/iobroker.pollenflug/docs/dwdlogo.png)

Der Deutsche Wetterdienst DWD erstellt tägliche Prognosen für den Pollenrisikoindex.
Die Pollenarten werden vorhergesagt: Hasel, Erle, Esche, Birke, Gras, Roggen, Beifuß und Ambrosia für heute und morgen, am Freitag auch übermorgen (Sonntag).
Täglich aktualisiert.
Informationen zu den Pollenkreisen finden Sie unter: https://www.dwd.de/pollenflug Copyright der verwendeten Pollendaten: © Deutscher Wetterdienst (Quelle: Deutscher Wetterdienst)

## Install & Konfiguration
Benötigt node.js 8.0 oder höher und Admin v3! Wählen Sie den Landkreis in der ioBroker-Adapterkonfiguration aus. Sie erhalten den Pollenrisikoindex für diese Region. Der Index wird einmal täglich um 11 Uhr aktualisiert.
In den Objekten info.today, info.tomorrow und info.dayaftertomorrow wird der Gültigkeitszeitraum angezeigt.
Es ist möglich, dass zum Beispiel heute Freitag ist, aber im Objekt info.today der Tag donnerstag ist.
Das ist richtig, weil die DWD-Daten noch Donnerstag sind und bis jetzt nicht aktualisiert wurden. Das Update findet normalerweise um 11 Uhr statt.

Bereitgestellte deutsche Landkreise:

* Schleswig-Holstein und Hamburg (Region 11 und 12)
    * Inseln und Marschen (Region 11)
    * Geest, Schleswig-Holstein und Hamburg (Region 12)
* Mecklenburg-Vorpommern (Region 20)
* Niedersachsen und Bremen (Region 31 und 32)
    * Westl. Niedersachsen / Bremen (Region 31)
    * Östl. Niedersachsen (Region 32)
* Nordrhein-Westfalen (Region 41, 42 und 43)
    * Rhein.-Westfäl. Tiefland (Region 41)
    * Ostwestfalen (Region 42)
    * Mittelgebirge NRW (Region 43)
* Brandenburg und Berlin (Region 50)
* Sachsen-Anhalt (Region 61 und 62)
    * Tiefland Sachsen-Anhalt (Region 61)
    * Harz (Region 62)
* Thüringen (Region 71 und 72)
    * Tiefland Thüringen (Region 71)
    * Mittelgebirge Thüringen (Region 72)
* Sachsen (Region 81 und 82)
    * Tiefland Sachsen (Region 81)
    * Mittelgebirge Sachsen (Region 82)
* Hessen (Region 91 und 92)
    * Nordhessen und Hess. Mittelgebirge (Region 91)
    * Rhein-Main (Region 92)
* Rheinland-Pfalz und Saarland (Region 101, 102 und 103)
    * Rhein, Pfalz, Nahe und Mosel (Region 101)
    * Mittelgebirgsbereich Rheinland-Pfalz (Region 102)
    * Saarland (Region 103)
* Baden-Württemberg (Region 111, 112 und 113)
    * Oberrhein und unteres Neckartal (Region 111)
    * Hohenlohe / mittlerer Neckar / Oberschwaben (Region 112)
    * Mittelgebirge Baden-Württemberg (Region 113)
* Bayern (Region 121, 122, 123 und 124)
    * Allgäu / Oberbayern / Bay. Wald (Region 121)
    * Donauniederungen (Region 122)
    * Bayern nördl. der Donau, o. Bayr. Wald, o. Mainfranken (Region 123)
    * Mainfranken (Region 124)

![ioBroker1](../../../en/adapterref/iobroker.pollenflug/docs/iobroker-pollenflug1.png)

Der ursprüngliche DWD-Risikoindex 0, 0-1, 1, 1-2, 2, 2-3 und 3 wird in 0, 1, 2, 3, 4, 5 und 6 geändert.
Dieses Format kann einfacher in ioBroker verwendet werden.

| Index | DWD-Index | Beschreibung |
|-----	|---------- |------------------------------------ |
| -1 | -1 | keine Daten verfügbar |
| 0 | 0 | keine Pollenkonzentration |
| 1 | 0-1 | keine zu niedrige Pollenkonzentration |
| 2 | 1 | niedrige Pollenkonzentration |
| 3 | 1-2 | niedrige bis mittlere Pollenkonzentration |
| 4 | 2 | durchschnittliche Pollenkonzentration |
| 5 | 2-3 | mittlere bis hohe Pollenkonzentration |
| 6 | 3 | hohe Pollenkonzentration |

** Pollenflugbeispiel: ** ![ioBroker2](../../../en/adapterref/iobroker.pollenflug/docs/iobroker-pollenflug2.png)

![ioBroker3](../../../en/adapterref/iobroker.pollenflug/docs/iobroker-pollenflug3.png)

URL-Addess der Pollenbilder aus DWD

![ioBroker4](https://www.dwd.de/DWD/warnungen/medizin/pollen/pollen_1_0.png)

## Beispiel
Wenn neue Daten vom DWD eingetroffen sind (das heutige Datum ändert sich), zeigt das Skript den Pollenrisikoindex für Hasel und Erle an.

```
on({id: "pollenflug.0.info.today"/*Today*/, change: "ne"}, (obj) => {
    let hasel = getState("pollenflug.0.region#12.Hasel.text_today"/*today*/).val;
    let erle  = getState("pollenflug.0.region#12.Erle.text_today"/*today*/).val;
    console.log("Haselnuss Belastung " + hasel);
    console.log("Erle Belastung " + erle);
});
```

## Changelog

### 1.0.2 (12.03.2019)
* (Stübi) Bugfixing, of changing sepaation of entries in riskindex_x from ',' to ', '
* (Stübi) unnecessary states will be deleted

### 1.0.1 (11.03.2019)
* (Stübi) Delete all states for day after tommorrow 
* (Stübi) Changed type of object riskindex_x from number to string
* (Stübi) Changed sepaation of entries in riskindex_x from ',' to ', '
* (Stübi) Deleted in summary (json) alle -1 entries

### 1.0.0 (10.03.2019)
* (Stübi) Changed the pollen index for better use in VIS. Now you you values -1, 0, 1, 2, 3, 4, 5 ,6
* (Stübi) Add summary for today, tomorrow and the day after tomorrow in json format for every region

### 0.1.9 (25.02.2019)
* (Stübi) Link to DWD Image of pollen flight added

### 0.1.8 (24.02.2019)
* (Stübi) Bugfixing deleting object

### 0.1.6 (20.02.2019)
* (Stübi) First Version of pollen index adapter

## License
The MIT License (MIT)

Copyright (c) 2019 Thorsten Stueben <thorsten@stueben.de> / <https://github.com/schmupu>

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