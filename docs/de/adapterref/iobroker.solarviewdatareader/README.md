---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solarviewdatareader/README.md
title: ioBroker.solarviewdatareader
hash: 3Tz0iPIs6QrXDjZMM8pPt78Jo3H+StXkUoJrxLr70AU=
---
![Logo](../../../en/adapterref/iobroker.solarviewdatareader/admin/solarviewdatareader.png)

![Anzahl der Installationen](http://iobroker.live/badges/solarviewdatareader-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.solarviewdatareader.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.solarviewdatareader.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/afuerhoff/iobroker.solarviewdatareader.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/afuerhoff/ioBroker.solarviewdatareader/badge.svg)
![NPM](https://nodei.co/npm/iobroker.solarviewdatareader.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/afuerhoff/ioBroker.solarviewdatareader/master.svg)

# IoBroker.solarviewdatareader
## Solarviewdatareader Adapter für ioBroker
Der Adapter liest die Daten aus dem Solarview-Datenlogger.
Hier finden Sie weitere Informationen zu Solarview: https://www.solarview.info/solarlogger.aspx

## Aufbau
### IP-Adresse, Port
Um die Daten vom Datenlogger zu erhalten, müssen Sie die IP-Adresse und den Port eingeben. Der Standardport ist 15000. Weitere Informationen finden Sie in der Solarview-Dokumentation.

### D0 Konverter
Wenn Sie einen D0-Konverter an den Solarview-Datenlogger angeschlossen haben, können Sie diese Option aktivieren.

### Selbstverbrauchszählersumme und 1 bis 4
Wenn Sie ein S0-Messgerät haben, können Sie diese Option aktivieren.
Sie können bis zu 4 Eigenverbrauchszähler und die Summe aller Zähler haben.

### Wechselrichter 1 bis 4
Jeder Wechselrichter kann separat aktiviert werden.

### Intervall, Intervallstart, Intervallende
Hier können Sie den Zeitbereich und das Intervall konfigurieren.

### Systemvariable CCU, Systemvariable setzen
Dies ist eine Besonderheit für die homematische CCU. Sie können eine Systemvariable in der CCU definieren.
In dieser Systemvariablen wird der tatsächliche PAC-Wert gespeichert.

## Changelog

### 0.2.1
* (Achim Fürhoff) self consumption meter optimized
### 0.2.0
* (Achim Fürhoff) Error handling optimized, self consumption meter implemented
### 0.1.0
* (Achim Fürhoff) optimizations for adding to latest repository
### 0.0.5
* (Achim Fürhoff) Code optimized, unload optimized, documentation added 
### 0.0.4
* (Achim Fürhoff) Objects, Telnet client and checksum calculation changed
### 0.0.3
* (Achim Fürhoff) inverter selection added
### 0.0.2
* (Achim Fürhoff) test version
### 0.0.1
* (Achim Fürhoff) initial release

## License
MIT License

Copyright (c) 2020 Achim Fürhoff <achim.fuerhoff@outlook.de>
Copyright (c) 2019 Achim Fürhoff

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