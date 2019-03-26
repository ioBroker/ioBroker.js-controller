---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sma-em/README.md
title: ioBroker.sma-em
hash: hYAOnhOsemUQz9HSTF5sjJflyv6TVEBPYbiF2JcCYnY=
---
![Logo](../../../en/adapterref/iobroker.sma-em/admin/sma-em.png)

![Anzahl der Installationen](http://iobroker.live/badges/sma-em-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sma-em.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sma-em.svg)
![Tests](https://travis-ci.org/CTJaeger/ioBroker.sma-em.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sma-em.png?downloads=true)

# IoBroker.sma-em ===================
### Info
Dieser Adapter liest Informationen von SMA Energy Meter und SMA Home Manager 2.

### Zustände
- Summe und Zähler von Wirkleistung, Blindleistung, Scheinleistung
- cosphi, Total Harmonic Distortion, Spannung
- Detailliert Jede der 3 Phasen in Bezug auf Wirkleistung, Blindleistung, Scheinleistung, Stromverbrauch, Spannung
- Detailliert Jede der 3 Phasen mit einem Überschuss an Wirkleistung, Blindleistung, Scheinleistung, Stromverbrauch, Stromstärke und Spannung
- Detailliert Jeder der 3 Phasenzähler
- Seriennummer des SMA Energy Meters

### Optionen
- Auswahlmöglichkeiten über jede einzelne Phase L1 / L2 / L3
- Auswahl nicht erweiterter Modus für Gesamt- und Wirkleistungszähler
- Auswahl erweiterter Modus für Blindleistung, Scheinleistung, Stromverbrauch, Spannung (benötigt mehr Rechenleistung)

### Ordnerstruktur
- L1 - Phase 1
- L2 - Phase 2
- L3 - Phase 3

### States-Structure
Beispiel:

pregard P-Wirkleistung / Rücksicht qregard Q-Blindleistung / Rücksichtnahme S-Scheinleistung / Rücksicht

psurplus P-Wirkleistung / Überschuss qsurplus Q-reaktive Leistung / Überschuss ssurplus S-Scheinleistung / Überschuss

## Changelog

### 0.5.3
* (Marcolotti) Fix units 

### 0.5.2
* (Marcolotti) support of more than one energy meter 

### 0.5.1
* (Marcolotti) Add Option for extended Mode
* (Marcolotti) Remove Option for Poll
* (Marcolotti) several fixes

### 0.5.0
* (Bluefox) Optimize Performance

### 0.0.2
* (Marcolotti) Add options for detailed View of L1, L2, L3
* (Marcolotti) Bugfixes
* (Bluefox) Optimize Performance
* (Apollon77) Clean Template

### 0.0.1
* (Marcolotti) initial release

## License
The MIT License (MIT)

Copyright (c) 2017 Marcolotti <info@ct-j.de>

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