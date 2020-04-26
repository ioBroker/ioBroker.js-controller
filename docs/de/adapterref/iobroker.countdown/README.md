---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.countdown/README.md
title: ioBroker.countdown
hash: p4FkV853prgZOjvgYnZt9Y3LcUThtRiYzI5PqsyxU44=
---
![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown.png)

![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/jack-blackson/ioBroker.countdown.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.countdown.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.countdown.svg)
![Anzahl der Installationen](http://iobroker.live/badges/countdown-stable.svg)
![NPM](https://nodei.co/npm/iobroker.countdown.png?downloads=true)

# IoBroker.countdown
[![Build Status Travis] (https://travis-ci.com/jack-blackson/ioBroker.countdown.svg?branch=master)](https://travis-ci.com/jack-blackson/ioBroker.countdown)

Countdown-Adapter für ioBroker ---------------------------------------------- --------------------------------

Das Ziel des Adapters ist es, Ihnen die Möglichkeit zu geben, Countdowns für zukünftige Ereignisse mit Jahren, Monaten, Tagen, Stunden und Minuten durchzuführen. Sie erhalten jeden dieser Werte separat und zwei Zeichenfolgen mit einer kurzen und einer langen Version des Datums.

## Countdowns anzeigen
Der Adapter liefert Ihnen automatisch eine JSON-Tabelle. Sie müssen es nur mit der erweiterten json-Tabelle verwenden. Bitte kreuzen Sie dort "No Header" an. Es ist möglich, entweder den Kurztext oder den Langtext anzuzeigen.
![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown_json.png)

## So erstellen Sie Countdowns
Es gibt zwei Möglichkeiten, Countdowns einzurichten:

* Sie können einen Countdown in den Adaptereinstellungen auf der Registerkarte "Countdown erstellen" erstellen.
* Sie können einen manuellen Status im Gerät "Setup" erstellen. Der Name des Objekts ist der Alarmname und der Wert ist das Datum. Das Datum muss im Format "TT.MM.JJJJ HH: mm: ss" vorliegen.
* Mit sendto können Sie einen Alarm erstellen. Dort können Sie entweder die Komponenten (mindestens Jahr Monat Datum) oder eine Datumszeichenfolge senden. Für die Datumszeichenfolge können Sie das Format im Setup des Adapters anpassen.

![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky.png)

* Sie können Tage, Monate und Jahre mit sendto zum heutigen Datum hinzufügen. Senden Sie daher bitte die Komponente "Name" und entweder "addminutes", "addhours", "adddays", "addmonths" oder "addyears" als int-Wert.

![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky_add.png)

## So löschen Sie Countdowns
Sie können einen Countdown mit dem Sendto löschen. Senden Sie daher nur den Namen mit sendto an den Adapter, und der Countdown wird automatisch gelöscht.

## Countdown wiederholen
Wenn Sie möchten, dass sich ein Countdown in einem definierten Zeitraum wiederholt (z. B. können Sie nicht jedes Jahr einen Countdown für Ihren Hochzeitstag durchführen), können Sie dies auch mit diesem Adapter tun. Füllen Sie daher entweder das Feld "Wiederholungszeitraum" in den Einstellungen des Adapters aus oder fügen Sie den Zeitraum nach dem Datum hinzu, wenn Sie einen Countdown mit dem Typ "Datum" erstellen. Ein sendTo würde so aussehen für einen Countdown, der am 1. April 2020 endet und jedes Jahr wiederholt wird:

sendTo ("countdown.0", "send", {"name": 'Hochzeitstag', "Datum": '01 .04.2020 00: 01 + 1Y '});

Parameter hier sind:

* Y: Jahre
* M: Monate
* D: Tage
* H: Stunden
* m: Minuten

## Verfügbare Ausgänge
| Datentyp | Beschreibung |
|:---:|:---:|
| Minuten | Minuten bis zum Ende des Countdowns (nicht insgesamt!) |
| Stunden | Stunden bis zum Ende des Countdowns (nicht insgesamt!) |
| Tage | Tage bis zum Ende des Countdowns (nicht insgesamt!) |
| Monate | Monate bis zum Ende des Countdowns (nicht insgesamt!) |
| Jahre | Jahre bis zum Ende des Countdowns (nicht insgesamt!) |
| Name | Countdown-Name |
| endDate | Enddatum des Countdowns - formatiert wie im definierten Setup |
| inWordsShort | Kombinierter Wert von Minuten, Stunden, ... - z. 1Y 5M 4D |
| inWordsLong | Kombinierter Wert von Minuten, Stunden, ... - z. 1 Jahr 5 Monate 4 Tage |
| totalHours | Total Anzahl der Stunden bis zum Enddatum |
| totalDays | Total Anzahl der Tage bis zum Enddatum |
| totalWeeks | Total Anzahl der Wochen bis zum Enddatum |
| erreicht | Boolesches Feld, das definiert, ob das Enddatum erreicht wurde oder nicht |
| repeatEvery | Countdown wird um diesen Zeitraum nach Erreichen des Enddatums | wiederholt |

## Funktionen zum Hinzufügen
* Möglichkeit, ein Skript als Parameter hinzuzufügen und zu starten, wenn der Countdown endet
* Möglichkeit, Plus und Minus in Addminutes und den anderen Add-Funktionen zu verwenden

## 1.1.0 (2020-04-02)
* (jack-blackson) Bugfix Read-Me-Link
* (Jack-Blackson) Bugfix RepeatCycle

## 1.0.9 (2020-03-31)
* (jack-blackson) Bugfix-Protokollmeldungen

## 1.0.8 (2020-03-31)
* (Jack-Blackson) Wiederholen Sie den Countdown in einem definierten Zeitraum (z. B. jedes Jahr).

## 1.0.7 (2020-03-30)
* (jack-blackson) Neuer Datumstyp für Einstellungen hinzugefügt: JJJJ-MM-TT
* (jack-blackson) Countdown direkt in den Adaptereinstellungen hinzufügen

## 1.0.6 (2020-03-20)
* (DutchmanNL) Adaptertyp behoben

## 1.0.5 (2020-02-05)
* (jack-blackson) Bugfix für Alarm um Mitternacht -> danke an @Lueghi

## 1.0.4 (2019-08-25)
* (jack-blackson) Neu geordnete Release-Infos

## 1.0.3 (2019-08-10)
* (Jack-Blackson) Änderungen für den Kompaktmodus
* (Jack-Blackson) Verschiedene Bugfixes
* (jack-blackson) Es ist jetzt möglich, mehrere Instanzen des Adapaters zu haben

## 1.0.2 (2019-07-22)
* (Jack-Blackson) Release-Version

## 0.7.0 (2019-07-07)
* (Jack-Blackson) Bugfixes
* (Jack-Blackson) Addminutes und Addhours sind jetzt ebenfalls möglich
* (jack-blackson) Datenpunkt im Setup kann jetzt bearbeitet werden
* (Jack-Blackson) hinzugefügt Gesamt-Nr. von Wochen

## 0.6.0 (06.07.2019)
* (Jack-Blackson) einstellbares Datumsformat für Ein- und Ausgabe
* (jack-blackson) Countdowns mit sendto löschen
* (Jack-Blackson) Fähigkeit, Countdowns in "Tagen / Monaten / Wochen ab jetzt) hinzuzufügen

## 0.5.0 (2019-07-04)
* (Jack-Blackson) Passen Sie die Daten in der Tabelle an
* (Jack-Blackson) Bugfix Datumsimport

### 0.4.0 (04.06.2019)
* (Jack-Blackson) Restrukturierung - Die Erstellung von Alarmen mit Sendto oder manuell mit Datenpunkt ist jetzt möglich

### 0.3.0 (2019-05-24)
* (Jack-Blackson) hat die Gesamtzahl der Tage und Stunden hinzugefügt

### 0.2.0 (21.05.2019)
* (Jack-Blackson) angepasste Pakete

### 0.1.0 (29.04.2019)
* (Jack-Blackson) Erstversion

## Changelog

## License
The MIT License (MIT)

Copyright (c) 2019-2020 jack-blackson <blacksonj7@gmail.com>

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