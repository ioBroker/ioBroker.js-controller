---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solarviewdatareader/README.md
title: ioBroker.solarviewdatareader
hash: 05N10yWtxS1P7K3+raksbc/gr4OudAtGI2km5AIX8jw=
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
Um die Daten vom Datenlogger abzurufen, müssen Sie die IP-Adresse und den Port von Ihrem Solarview-TCP-Server eingeben.
Der Standardport ist 15000. Weitere Informationen finden Sie in der Solarview-Dokumentation unter https://www.solarview.info/solarlogger.aspx.

### D0 Konverter
Wenn Sie einen D0-Konverter an den Solarview-Datenlogger angeschlossen haben, können Sie diese Option aktivieren.
Bei Fragen lesen Sie bitte die Solarview-Dokumentation.

### Selbstverbrauchszählersumme und 1 bis 4
Wenn Sie ein S0-Messgerät haben, können Sie diese Option aktivieren.
Sie können bis zu 4 Eigenverbrauchszähler und die Summe aller Zähler haben.
Bei Fragen lesen Sie bitte die Solarview-Dokumentation.

### Wechselrichter 1 bis 4
Jeder Wechselrichter kann separat aktiviert werden.
Bei Fragen lesen Sie bitte die Solarview-Dokumentation.

### Intervall, Intervallstart, Intervallende
Hier können Sie den Zeitbereich und das Intervall konfigurieren. Der Zeitbereich für 24 Stunden liegt zwischen 00:00 und 23:59 Uhr.
Nicht 00:00 bis 00:00.

### Systemvariable CCU, Systemvariable setzen
Dies ist eine Besonderheit für die homematische CCU. Sie können eine Systemvariable in der CCU definieren.
In dieser Systemvariablen wird der tatsächliche PAC-Wert gespeichert.
Sie müssen den ioBroker-Status für diese Systemvariable eingeben -> **z. "hm-rega.0.12345"**

### Erstellte Zustände
#### Pvig, pvi1..4, d0supply, d0consumption
täglich = Tagesertrag (kWh) monatlich = monatlicher Ertrag (kWh) jährlich = jährlicher Ertrag (kWh) gesamt = Gesamtertrag (kWh) Strom = Generatorleistung in W UDC, UDCB, UDCC, UDCD = Generatorspannungen in Volt pro MPP-Tracker IDC, IDCB, IDCC, IDCD = Generatorstrom in Ampere pro MPP-Tracker UL1, IL1 = Netzspannung, Netzstromphase 1 UL2, IL2 = Netzspannung, Netzstromphase 2 UL3, IL3 = Netzspannung, Netzstromphase 3 TKK = Temperaturwechselrichter

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (afuerhoff) dependencies updated
* (afuerhoff) documentation changed

### 0.2.1
* (afuerhoff) self consumption meter optimized
### 0.2.0
* (afuerhoff) Error handling optimized, self consumption meter implemented
### 0.1.0
* (afuerhoff) optimizations for adding to latest repository
### 0.0.5
* (afuerhoff) Code optimized, unload optimized, documentation added 
### 0.0.4
* (afuerhoff) Objects, Telnet client and checksum calculation changed
### 0.0.3
* (afuerhoff) inverter selection added
### 0.0.2
* (afuerhoff) test version
### 0.0.1
* (afuerhoff) initial release

## License
MIT License

Copyright (c) 2019-2021 Achim Fürhoff <achim.fuerhoff@outlook.de>

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