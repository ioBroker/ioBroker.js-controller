---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.eventlist/README.md
title: ioBroker.eventlist
hash: auofOnwss1vveKXRxK7rZmb4tpajlTLLVP7Mvgv5ULU=
---
![Logo](../../../en/adapterref/iobroker.eventlist/admin/eventlist.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.eventlist.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.eventlist.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/eventlist-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/eventlist-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/bluefox/iobroker.eventlist.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/bluefox/ioBroker.eventlist/badge.svg)
![NPM](https://nodei.co/npm/iobroker.eventlist.png?downloads=true)

# IoBroker.eventlist
## Ereignislistenadapter für ioBroker
Ermöglicht das Definieren der Zustände, die in der Ereignisliste protokolliert werden müssen.

Die Liste kann in admin, web, vis angezeigt, als PDF gespeichert, Material (noch nicht implementiert).

Zusätzlich können Sie Ereignisse per Telegramm oder WhatsApp senden.

![Aufführen](../../../en/adapterref/iobroker.eventlist/img/list.png)

![PDF](../../../en/adapterref/iobroker.eventlist/img/pdf.png)

## Alarmmodus
Die Ereignisse konnten nur im Alarmmodus generiert werden.
Der Alarmmodus kann durch die Variable `eventlist.X.alarm` gesteuert werden.

Außerdem können die Nachrichten an Messenger nur gesendet werden, wenn der Alarmmodus aktiviert ist.

Anwendungsfall:

- Z.B. Der Türsensor kann die Nachrichten nur senden, wenn niemand zu Hause ist. Andernfalls werden die Ereignisse zum Öffnen der Tür nur in der Ereignisliste erfasst.

## Mögliche Präsentationen
### In Admin als Registerkarte
Sie können die Ereignisliste als Registerkarte in admin aktivieren.

### Netz
Die Ereignisliste kann unter `http://<IP>:8082/eventlist/index.html` angezeigt werden

### Vis Widget
Die Ereignisliste kann als vis-Widget angezeigt werden.

### PDF-Generierung
Es besteht die Möglichkeit, mit allen Ereignissen ein PDF-Dokument zu erstellen.

Der Dokumenttitel kann aus dem Generierungsdatum bestehen, wenn Sie das Muster darin platzieren: `Event list on {{YYYY MM DD}}`.
Die genaue Beschreibung des Zeitformats finden Sie hier: https://momentjs.com/docs/#/displaying/format/

Die Erzeugung von PDF kann durch Schreiben eines `true` in `eventlist.0.triggerPDF` ausgelöst werden.

Auf die PDF-Datei kann zugegriffen werden über:

- web: `http:// <IP>: 8082 / eventlist / eventlist / report.pdf`
- admin: `http:// <IP>: 8081 / files / eventlist / report.pdf`

** Die Symbole konnten nicht als PDF angezeigt werden. **

## Machen
- Viele vordefinierte Symbole (mindestens 100)
- Material Widget
- Senden Sie Nachrichten an syslog (möglicherweise Splunk) https://www.npmjs.com/package/splunk-logging

<! - Platzhalter für die nächste Version (am Zeilenanfang):

### __WORK IN PROGRESS__ ->

## Changelog
### 0.2.5 (2020-09-24)
* (bluefox) Extended icon selector 
 
### 0.2.1 (2020-09-21)
* (bluefox) Vis-widget was corrected 

### 0.1.3 (2020-09-15)
* (bluefox) Implemented the alarm mode and messengers 

### 0.0.3 (2020-09-08)
* (bluefox) Objects with states are supported now 

### 0.0.2 (2020-09-07)
* (bluefox) initial commit

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020 ioBroker <dogafox@gmail.com>

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