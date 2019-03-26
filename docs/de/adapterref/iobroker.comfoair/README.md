---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.comfoair/README.md
title: ioBroker.comfoair
hash: 6GAu1GeuUy1Oo5FXAaT0gUvgzOqnDZQt1u0x3oIDq0A=
---
![Logo](../../../en/adapterref/iobroker.comfoair/admin/comfoair.png)

![Anzahl der Installationen](http://iobroker.live/badges/comfoair-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.comfoair.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.comfoair.svg)
![NPM](https://nodei.co/npm/iobroker.comfoair.png?downloads=true)

# IoBroker.comfoair
Ein ioBroker-Adapter für Zehnder Comfoair-CA-Ventilationen (d. H. ComfoAir CA350, NICHT ComfoAir Q350 ...)

Um diesen Adapter verwenden zu können, benötigen Sie einen RS232-zu-LAN- oder WLAN-Konverter, um den ioBroker mit Ihrem Zehnder Comfoair zu verbinden.
Installieren Sie Hardware für die TCP - Verbindung zu comfoair: d. H. Einen RS232 - zu - LAN - Adapter an die serielle Schnittstelle des comfoair. Verbinden Sie nur die Pins 2, 3 und 5 (sollte auch mit TX-, RX- und GND-Kontakten der cc-Ease-Verbindung funktionieren).
Eigentlich funktioniert dieser Adapter nur mit einer LAN-Verbindung. Eine direkte Verbindung, die auf einer direkten seriellen Verbindung basiert, ist in Entwicklung.

Adapter installieren, Instanz erstellen.
Setze comfoair - IP-Adresse, Port und Polling - Intervall.

Die Werte Ihres Unternehmens sollten jetzt im Status- und Temperatur-Kanal sichtbar sein.

Durch Einstellen / Ändern von Werten im 'control' - Kanal steuern Sie Ihre Komfortbelüftung.

Kann auch funktionieren, wenn das CC-Ease Panel angeschlossen ist (auf eigenes Risiko). Funktioniert gut, wenn ccEASE - Panel getrennt ist.

Getestet auf comfoair CA350.

## Changelog

### 0.1.2

- ReadME updated, minor bugfixes.

### 0.1.1

-   bugfix ventlevels, reading errors

### 0.1.0

-   ReadME Update

### 0.0.7

-   Core Files/Testing Update and introduce adapter-core

### 0.0.6

-   Filter - change - indicator.

### 0.0.5

-   bugfig set vent levels.

### 0.0.4

-   gets & sets vent levels, gets filter-timer.

### 0.0.3

-   minor bugfixes, sets comfort-temperature and resets filter-hours.

### 0.0.2

-   First running Version. Gets temp, vent, bypass and filter states, sets fan level.

### 0.0.1

-   In development stage, contributions welcome

## License

The MIT License (MIT)

Copyright (c) 2019 forelleblau marceladam@gmx.ch

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