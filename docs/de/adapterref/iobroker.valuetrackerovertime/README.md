---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.valuetrackerovertime/README.md
title: ioBroker.valuetrackerovertime
hash: bR/4DaqaDwejQvgP5BIKrDAMdi+lFoYoip5W2O5eqUI=
---
![Logo](../../../en/adapterref/iobroker.valuetrackerovertime/admin/ValueTrackerOverTime_Logo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.valuetrackerovertime.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.valuetrackerovertime.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/valuetrackerovertime-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/valuetrackerovertime-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Omega236/iobroker.valuetrackerovertime.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/Omega236/ioBroker.valuetrackerovertime/badge.svg)
![NPM](https://nodei.co/npm/iobroker.valuetrackerovertime.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/Omega236/ioBroker.valuetrackerovertime/master.svg)

# IoBroker.valuetrackerovertime
[![Build Status] (https://travis-ci.com/Omega236/ioBroker.valuetrackerovertime.svg?branch=master)](https://travis-ci.com/Omega236/ioBroker.valuetrackerovertime)

## Wertetrackerovertime-Adapter für ioBroker
Verfolgt alle Zahlen und ihre Zunahme / Abnahme. Die Daten werden dann verwendet, um Statistiken über die Änderungsrate zu erstellen, die in Zeiten wie Stunden, Tagen, Wochen, Monaten, Quartalen und Jahren angezeigt werden. Die gesammelten Daten können verwendet werden, um d. H. Den Stromverbrauch in Diagrammen zu visualisieren.

## Die Einstellungen
Die Einstellungen für ValueTrackerOverTime werden an zwei Stellen vorgenommen. Die Standardeinstellungen werden in der Instanz des Adapters selbst behandelt. Die Einstellungen für die einzelnen Datenpunkte werden in den Datenpunkten vorgenommen, die die zu verfolgenden Daten enthalten.

### Standardeinstellungen
![Handlung](../../../en/adapterref/iobroker.valuetrackerovertime/admin/DefaultSettings.png) Dies sind die Standardeinstellungen, die bei jeder Aktivierung von ValueTrackerOverTime auf einem Datenpunkt angezeigt werden. Für jeden Datenpunkt können diese angepasst werden, aber die am häufigsten verwendeten Anfangswerte werden hier als Standardwerte festgelegt, sodass Sie später nicht mehr viele Änderungen vornehmen müssen.

#### Detaillierte Geschichte
Im Abschnitt "Detaillierter Verlauf" werden die zu erstellenden Datenpunkte ausgewählt. Möchten Sie die Daten für jeden sammeln?

* Tag
* Woche
* Monat
* Vierteljahr (eines Jahres)
* Jahr

#### Aktuelle / vorherige Daten
Im Abschnitt "Aktuelle / vorherige Daten" können Sie auswählen, wie lange Sie die gesammelten Daten für jeden ValueTrackerOverTime-Datenpunkt aufbewahren möchten, der für jeden Zeitraum generiert wird.
Es ist sinnvoll, die Datenerfassung zu beenden, sobald sie in einem anderen Datenpunkt landet (Beispiel: Nach 7 Tagen werden die Daten in einer Woche kumuliert gefunden. Nach 4 Wochen befinden sich die Daten in einem Monat ...)

#### Erkennung des Zurücksetzens des Zählers
Dieser Wert sollte immer aktiviert und auf eins gesetzt sein. Es hilft dem ValueTrackerOverTime, korrekte Messwerte zu erstellen, nachdem ein Wert im ursprünglichen Datenpunkt erneut gespeichert wurde.

### Datenpunkteinstellungen
![Handlung](../../../en/adapterref/iobroker.valuetrackerovertime/admin/DatapointSettings.png) In dieser Einstellung müssen Sie ein Nema angeben, das als Datenpunktname für diesen Auswahlknoten verwendet wird. Zusätzlich müssen Sie die Einheit angeben, in der die Daten gesammelt werden sollen.
Wenn Sie also die Regenmenge messen möchten, können Sie die Einheit l / m² hinzufügen oder die Menge des verbrauchten Energieverbrauchs in Wattstunden (kWh) messen.
Falls der Datenpunkt selbst eine andere Einheit (d. H. Wh) verwendet, können Sie hier einen Multiplikator hinzufügen (d. H. 60 oder 1/60), um die Daten in die erforderliche Einheit umzuwandeln.

Die restlichen Einstellungen überschreiben die Standardeinstellungen, die in der Adapterinstanz festgelegt wurden.

## Datenpunkte
Abhängig von den ausgewählten Zeiträumen, die erfasst werden sollen, erstellt der Adapter für jeden Datenpunkt, den Sie verfolgen möchten, eigene Datenpunkte.

Auf dem Bild sind drei Beispiele angegeben. Da der Screenshot am 3. Januar (Beginn des neuen Jahres / Monats) aufgenommen wurde, entschuldigen Sie bitte, dass die Daten nicht so farbenfroh und vielfältig sind.

* Sie sehen, dass es heute eine Regenmenge von 0,3 l / m² war, die sich die ganze Woche nicht verändert hat.
* Die Sonne schien in dieser Winterwoche überhaupt nicht (für meine Wetterstation bedeutet dies, dass sie jeden Tag nicht heller als 4.500 lm wurde)
* Der Energieverbrauch zeigt Ihnen jedoch, dass der aktuelle Tag für den Computer auf 0,351 kWh, die Woche auf 1,909 kWh und das Jahr auf 1,393 kWh eingestellt ist (da heute Sonntag ist und die Woche bereits 7 Tage beträgt alt, aber es ist auch der 3. Januar, der das Jahr nur drei Tage alt macht).

## Changelog
### 0.6.0 (18.02.2021)
* (Omega236) add function to store history-Data to current-DP history"
### 0.5.4
* (Omega236) optimize RAM-Usage (Remove .toLocaleString)
### 0.5.3
* (Omega236) bugfix startvalue not used after SQL read out
### 0.5.2
* (Omega236) bugfix _getObjectAsync not worked
### 0.5.1
* (Omega236) optimizations, HistoryAnalyse extended and CurrentHistory added
### 0.4.1
* (Omega236) bugfix DetailedYear not saved, bugfix HistoryDetailed not used Multi
### 0.4.0
* (Omega236) HistoryAnalyseDetailed Added, Bugfix KW
### 0.3.5
* (Omega236) reset Detection optimize and bugfix only ack
### 0.3.4
* (Omega236) Check for duplicate Alias and reduce recalcs on start-value changed
### 0.3.3
* (Omega236) bugfix date object changed
### 0.3.2
* (Omega236) reemove selectID.js from index_m.html
### 0.3.1
* (Omega236) first public
### 0.0.1
* (Omega236) initial release

## License
MIT License

Copyright (c) 2021 Omega236 <general.of.omega@googlemail.com>

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