---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.countdown/README.md
title: ioBroker.countdown
hash: 2pwvd3sP6qi/L5PCTCuA+vmVlqzm533lnBCNbrnJfTk=
---
![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown.png)

![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/jack-blackson/ioBroker.countdown.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.countdown.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.countdown.svg)
![Anzahl der Installationen](http://iobroker.live/badges/countdown-stable.svg)
![NPM](https://nodei.co/npm/iobroker.countdown.png?downloads=true)

# IoBroker.countdown
=================

Countdown-Adapter für ioBroker ------------------------------------------ --------------------------------

Das Ziel des Adapters ist es, Ihnen die Möglichkeit zu geben, Countdowns für zukünftige Ereignisse mit Jahren, Monaten, Tagen, Stunden und Minuten durchzuführen. Sie erhalten jedes dieser Werte separat und zwei Zeichenfolgen mit einer kurzen und einer langen Version des Datums.

## Countdowns anzeigen
Der Adapter stellt Ihnen automatisch einen JSON-Tisch zur Verfügung. Sie müssen es nur mit dem erweiterten JSON-Tisch verwenden. Bitte dort "No Header" ankreuzen. Es ist möglich, entweder den Kurztext oder den Langtext anzuzeigen.
![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown_json.png)

## Countdowns erstellen
Es gibt zwei Möglichkeiten, Countdowns einzurichten:

* Sie können im Geräte-Setup einen manuellen Status erstellen. Der Name des Objekts ist der Alarmname und der Wert ist das Datum. Das Datum muss das Format "TT.MM.JJJJ HH: mm: ss" haben.
* Mit sendto können Sie einen Alarm erstellen. Dort können Sie entweder die Komponenten (mindestens Jahr Monat Datum) oder eine Datumszeichenfolge senden. Für die Datumszeichenfolge können Sie das Format im Setup des Adapters anpassen.

![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky.png)

* Mit sendto to to today date können Sie Tage, Monate und Jahre hinzufügen. Bitte senden Sie daher die Komponente "name" und entweder "addminutes", "addhours", "adddays", "addmonths" oder "addyears" als int-Wert.

![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky_add.png)

## So löschen Sie Countdowns
Sie können einen Countdown mit dem sendto löschen. Senden Sie daher nur den Namen mit sendto an den Adapter, und der Countdown wird automatisch gelöscht.

## Verfügbare Ausgänge
| Datentyp | Beschreibung |
|:---:|:---:|
| minutes | Minuten bis Countdownende (nicht gesamt!) |
| Stunden | Stunden bis Countdownende (nicht gesamt!) |
| Tage | Tage bis Countdownende (nicht gesamt!) |
| Monate | Monate bis Countdownende (nicht gesamt!) |
| Jahre Jahre bis Countdownende (nicht gesamt!) |
| name | Countdown-Name |
| endDate | Enddatum des Countdowns wie im Setup definiert |
| inWordsShort | Kombinierter Wert von Minuten, Stunden, ... - z. 1J 5M 4D |
| inWordsLong | Kombinierter Wert von Minuten, Stunden, ... - z. 1 Jahr 5 Monate 4 Tage |
| totalHours | Total Anzahl der Stunden bis zum Enddatum |
| totalDays | Total Anzahl der Tage bis zum Enddatum |
| totalWeeks | Total Anzahl der Wochen bis zum Enddatum |
| Boolesches Feld, das definiert, ob das Enddatum erreicht wurde oder nicht |

## Hinzuzufügende Funktionen
* Möglichkeit, ein Skript als Parameter hinzuzufügen und es am Ende des Countdowns zu starten
* Möglichkeit, Plus und Minus in addminutes und den anderen add-Funktionen zu verwenden

## 0.5.0 (2019-07-04)
* (Jack-Blackson) Passen Sie die Daten in der Tabelle an
* (Jack-Blackson) Bugfix-Datumsimport

## 0.6.0 (2019-07-06)
* (Jack-Blackson) einstellbares Datumsformat für Ein- und Ausgabe
* (jack-blackson) Countdowns mit sendto löschen
* (Jack-Blackson) Fähigkeit, Countdowns von "Tagen / Monaten / Wochen ab jetzt" hinzuzufügen

## 0.7.0 (07.07.2019)
* (Jack-Blackson) Bugfixes
* (jack-blackson) Minuten und Stunden sind jetzt auch möglich
* Der (Jack-Blackson) -Datenpunkt im Setup kann jetzt bearbeitet werden
* (jack-blackson) addierte insgesamt nr. von Wochen

## 1.0.2 (2019-07-22)
* (Jack-Blackson) Release-Version

## Changelog
### 0.1.0 (2019-04-29)
* (jack-blackson) initial version

### 0.2.0 (2019-05-21)
* (jack-blackson) adjusted packages

### 0.3.0 (2019-05-24)
* (jack-blackson) added total No. of days and hours

### 0.4.0 (2019-06-04)
* (jack-blackson) restructuring - creation of alarms with sendto or manually with datapoint is now possible

## License
The MIT License (MIT)

Copyright (c) 2019 jack-blackson <blacksonj7@gmail.com>

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