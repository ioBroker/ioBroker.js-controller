---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sma-em/README.md
title: ioBroker.sma-em
hash: 0kx2TWqDDrWP53gDP2D8sqUzn0hmdrhh/f+b3dTPgUk=
---
![Logo](../../../en/adapterref/iobroker.sma-em/admin/sma-em.png)

![Anzahl der Installationen](http://iobroker.live/badges/sma-em-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sma-em.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sma-em.svg)
![Tests](https://travis-ci.org/CTJaeger/ioBroker.sma-em.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sma-em.png?downloads=true)

# IoBroker.sma-em
### Die Info
Dieser Adapter liest Informationen von SMA Energy Meter und SMA Home Manager 2.

### Zustände
- Summe und Zähler der Wirkleistung, Blindleistung, Scheinleistung
- Phosphi, harmonische Gesamtverzerrung, Spannung, Frequenz
- Detailliert Jede der 3 Phasen in Bezug auf Wirkleistung, Blindleistung, Scheinleistung, Phosphi, Stromstärke, Spannung
- Detailliert Jede der 3 Phasen mit Überschuss an Wirkleistung, Blindleistung, Scheinleistung, Phosphi, Stromstärke, Spannung
- Detailliert Jeder der 3 Phasenzähler
- Seriennummer, Softwareversion, SUSyID des SMA-Energiezählers

### Optionen
- Auswahlmöglichkeiten für jede einzelne Phase L1 / L2 / L3
- Auswahl des nicht erweiterten Modus für Gesamt und Zähler der Wirkleistung
- Auswahl erweiterter Modus für Blindleistung, Scheinleistung, Phosphi, Stromstärke, Spannung (erfordert mehr Rechenleistung)

### Ordnerstruktur
- L1 - Phase 1
- L2 - Phase 2
- L3 - Phase 3

### Zustandsstruktur
Beispiel:

Pregard P-Wirkleistung / Rücksicht auf Q-Blindleistung / Rücksicht auf Sregard S-Scheinleistung / Rücksicht

psurplus P-Wirkleistung / Überschuss qsurplus Q-reaktive Leistung / Überschuss ssurplus S-Scheinleistung / Überschuss

<! - Platzhalter für die nächste Version (am Zeilenanfang):

### __WORK IN PROGRESS__ ->

## Changelog
### 0.6.3 (2021-03-04)
* (TGuybrush) The adapter binds now to all external IPv4 addresses.

### 0.6.1-beta.0 (2021-01-18)
* (TGuybrush) Bug fixes
  * Software Version string, last part is the revision as character (e.g. R = release)
  * Potential Warning during the first start
  * Revised units to follow the SI standardization (DIN 1301)
* (TGuybrush) Top level hierarchy object description indicates if the device is a SMA Energy Meter or a SMA Home Manager 2.
* (DutchmanNL) Released to the latest repo, fixed some typo's + news and translations

### 0.6.0
* (TGuybrush) Fixed wrong status information 
  * Complete adapter core rewritten to extract the status values by their OBIS value instead of the absolute position in the received UDP message according to the SMA documentation.
  *  Improved compatibility to future new OBIS values
* (TGuybrush) Add additional status information
  * Power grid frequency
  * Time tick counter
  * SMA SUSy ID
  * Software Version
* Add a timestamp for each received status information

### 0.5.7
* (DutchmanNL) Solved incorrect stated ID type for JS-controller 3.x

### 0.5.4
* (Andiling) Adapter compatibility extended for Node 10 and higher

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

Copyright (c) 2021 IoBroker-Community

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