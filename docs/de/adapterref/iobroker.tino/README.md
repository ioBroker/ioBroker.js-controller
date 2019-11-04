---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tino/README.md
title: ioBroker.tino
hash: 5EyTLSIHjhIfH6MS/cb+yVrDxgGfH0Kijr4bXEZyRNk=
---
![Logo](../../../en/adapterref/iobroker.tino/admin/tino.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.tino.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tino.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/bowao/iobroker.tino.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/bowao/ioBroker.tino/badge.svg)
![NPM](https://nodei.co/npm/iobroker.tino.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/bowao/ioBroker.tino/master.svg)

# IoBroker.tino
## TiNo Adapter für ioBroker
(Deutsche Version siehe unten)

Liest drahtlose Sensordaten, die über TiNo Protocol Version 1.01 und TiNo Protocol Version 2.0 empfangen wurden.
Die entsprechende Protokollversion wird anhand der empfangenen Daten automatisch erkannt.

Der drahtlose Transceiver und Empfänger TiNo wurden von nurazur entwickelt.

Projektseite: https://nurazur.wordpress.com/

Github: https://github.com/nurazur/TiNo

"** TI ** ny ** NO ** de": Batteriebetriebener drahtloser Sensor oder drahtloser Akteur. Ziel des Projekts ist die Entwicklung kleiner, kostengünstiger batteriebetriebener Funksensoren. Die Sensoren kommunizieren mit Gateways wie ein Himbeer-Pi. Die Ziele sind:

* günstig (Stückliste unter 5 Euro)
* sehr klein (Streichholzschachtel)
* Ultra niedriger Schlafstrom
* Lange Akkulaufzeit: 5 Jahre und mehr bei einer CR2032-Zelle
* große Reichweite (was auch immer das bedeutet :-), aber es ist wirklich lang)
* einfach aufzubauen
* Kommunikationssicherheit
* Plug & Play-Firmware

Sensoren können fast alle sein, wie Temperatur, relative Luftfeuchtigkeit, Luftdruck, Höhenmesser, Lichtintensität, UV-Index, Bewegungsmelder, Reed-Schalter usw.

In der Adapterkonfiguration kann die serielle Schnittstelle und die zugehörige Baudrate eingestellt werden.
Wenn der Lernmodus aktiviert wurde, werden die Sensoren automatisch mit ihrer Node-ID und allen erkannten Datenpunkten nach dem ersten Nachrichtenempfang erstellt.
Der Lernmodus endet automatisch nach 10 Minuten und kann unter "info" über den Datenpunkt "learningMode" für weitere 10 Minuten wieder aktiviert werden.
Die zugehörigen Offset-Datenpunkte werden unter "config" angelegt, damit die Sensorwerte bei Bedarf korrigiert werden können.
Die berechneten Datenpunkte Feuchte absolut und Taupunkt werden unter "berechnet" erstellt, jedoch nur, wenn der Sensor die Werte Temperatur und relative Feuchte liefert.

Für das Empfängerprotokoll Version 1.01 würden folgende Datenpunkte angelegt:

* NodeId
* RSSI
* Batteriespannung
* Nachrichtenzähler
* Temperatur
* Feuchtigkeit
* Heartbeat (nur in Protokollversion 1.01)
* Unterbrechen Sie 1, 2 und 3
* Frequenzfehleranzeige (nur in Protokollversion 1.01)
* RFM69-Temperatur (nur in Protokollversion 1.01)
* Bitfehler

Zusätzlich werden folgende Datenpunkte für das Empfängerprotokoll Version 2.0 angelegt (falls vorhanden).

* Unterbrechen Sie 4 bis 8
* synchronisiert
* Anzeige der Verbindungsqualität
* Frequenzversatz
* Abstand (nur bei installiertem Abstandssensor)
* Höhe (nur bei installiertem Höhensensor)
* Luftdruck (nur bei installiertem Luftdrucksensor)
* Kontakt (Nur mit Reedkontakt installiert)

-------------------------------------------------------------------------------------------

## TiNo Adapter für ioBroker
Einlesen der TiNo Version 1.01 und TiNo Version 2.0 empfangenen Funksensordaten.
Die entsprechende Protokoll-Version wird automatisch anhand der empfangenen Daten erkannt.

Der Funksender und -empfänger TiNo wurden von nurazur entwickelt.

Projekt-Seite: https://nurazur.wordpress.com/

Github: https://github.com/nurazur/TiNo

"** TI ** ny ** NO ** de": Batteriebetriebener Funksensor oder Funk-Aktor. Target this projects is the development of the funk sensors mit dem Raspberry Pi kommunizieren. Die Entwicklung hat zum Ziel:

* minimale Kosten (Stückkosten unter 5 EUR)
* minimale Grösse (Streichholzschachtel)
* minimaler Stromverbrauch
* maximale Batterielebensdauer (5 Jahre oder mehr)
* maximale Reichweite
* maximal einfach nachzubauen
* Plug & Play-Firmware

Als Sensor kann man so ziemlich alles verwenden, ob Temperatur, Luftfeuchtigkeit, Luftdruck, Höhenmesser, Lichtintensität, UV-Index, Anwesenheitssensoren, Magnetschalter, Erschütterungs-Sensoren, Feuchtigkeitsmesser usw auch im Prinzip alle Arten von Sensoren.

In der Adapterkonfiguration können Sie die serielle Schnittstelle und die zugehörige Baudrate einstellen.
Wenn der Anlermodus aktiviert wird, werden die Sensoren nach dem ersten Nachrichten-Empfang automatisch mit ihrer Node-Id und allen erkannten Datenpunkten angelegt.
Der Anlernmodus wird nach 10min. automatisch beendet und kann unter "info" über den Datenpunkt "learningMode" für weitere 10min. erneut aktiviert werden.
Unter "config" werden die zugehörigen Offset-Datenpunkte erstellt, damit die Sensorwerte bei Bedarf korrigiert werden können.
Unter "berechnet" werden die errechneten Datenpunkte absolut und taupunktmäßig angelegt, jedoch nur, wenn der Sensor die Werte Temperatur und relative Feuchte liefert.

Folgende Datenpunkte werden für das Empfänger-Protokoll Version 1.01 angelegt:

* NodeId
* Signalstärke (RSSI)
* Batteriespannung
* Nachrichtenzähler
* Temperatur
* Feuchte
* Heartbeat (Nur in Protokoll Version 1.01)
* Unterbricht 1 bis 3
* Frequenzfehler Indikator (Nur in Protokoll Version 1.01)
* RFM69 Temperatur (Nur in Protokoll Version 1.01)
* Bitfehler

Zusätzlich werden für das Empfänger-Protokoll Version 2.0 folgende Datenpunkte angelegt (wenn vorhanden).

* Unterbrechen Sie 4 bis 8
* Synchronisation
* Kanalgüte
* Frequenzversatz
* Distance (Nur bei installiertem Entfernungssensor)
* Höhe (Nur bei installiertem Höhensensor)
* Luftdruck (Nur bei installiertem Luftdrucksensor)
* Reed-Kontakt (Nur bei installiertem Reed-Kontakt)

## Changelog
### 0.1.1
- (bowao) New learning mode with 10min. auto-timeout

### 0.1.0
- (bowao) Add tino protocol V2.0 support
- (bowao) Add option to search new data points on already created sensors
- (bowao) Add calculated data points humidity_absolute and dew point

### 0.0.5
- (bowao) Add datapoints interrupt an heartbeat
- (bowao) Set default baudrate to 38400
- (bowao) Close serialport on unload and cleanup

### 0.0.4
- (bowao) Resize logo

### 0.0.3
- (bowao) Update readme

### 0.0.2
- (nurazur) Add logo

### 0.0.1
- (bowao) initial release

## License
MIT License

Copyright (c) 2019 bowao

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