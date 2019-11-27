---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tinyrx4/README.md
title: ioBroker.tinyrx4
hash: WCXvCw2USMZuNPV7OuAYAc/BhULhccxu9wUup20j7Hw=
---
![Logo](../../../en/adapterref/iobroker.tinyrx4/admin/tinyRX4.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.tinyrx4.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tinyrx4.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/bowao/iobroker.tinyrx4.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/bowao/ioBroker.tinyrx4/badge.svg)
![NPM](https://nodei.co/npm/iobroker.tinyrx4.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/bowao/ioBroker.tinyrx4/master.svg)

# IoBroker.tinyrx4
## TinyRX4 Adapter für ioBroker
(Deutsche Version siehe unten)

Liest drahtlose Sensordaten, die über TinyRX4 empfangen wurden

Der kabellose Transceiver TinyTX4 und der Empfänger TinyRX4 wurden von meigrafd im deutschen Raspberry Pi Forum entwickelt.

Projektseite: https://forum-raspberrypi.de/forum/thread/7472-batteriebetriebene-funk-sensoren/

Github:

* Transceiver: https://github.com/meigrafd/TinyTX4
* Empfänger: https://github.com/meigrafd/TinyRX4

Ziel des Projektes ist es, batteriebetriebene Funksensoren zu betreiben und die Daten mit dem RaspberryPI zu empfangen und auszuwerten.

Grundsätzlich können Sie alle Arten von Sensoren als Sensor verwenden, z. Temperatur, Luftfeuchtigkeit, Luftdruck, Höhenmesser, Anwesenheitssensoren, Magnetschalter, Vibrationssensoren, Feuchtigkeitsmesser usw.

Dieser ioBroker-Adapter unterstützt alle auf https://github.com/meigrafd/TinyTX4 veröffentlichten Sensorskizzen

* BMP085 (Druck- / Temperatursensor)
* DHT22 (Temperatur- / Feuchtigkeitssensor)
* DS18B20 (Temperatursensor)
* HCSR04 (Ultraschallsensor)
* ReedSwitch (Tür- / Fensterkontakt)

Weitere unterstützte Skizzen:

* BME280 (Druck- / Temperatur- / Feuchtigkeitssensor) https://github.com/bowao/tinytx4_bme280

In der Adapterkonfiguration kann die serielle Schnittstelle und die zugehörige Baudrate eingestellt werden. Außerdem ist es möglich, in bereits erstellten Sensoren nach neuen oder versehentlich gelöschten Datenpunkten zu suchen, ohne den gesamten Sensor neu erstellen zu müssen.

Die Sensoren werden nach dem ersten Nachrichtenempfang automatisch mit ihrer Node-ID angelegt. Es werden nur die Datenpunkte erzeugt, die über die msg-Variablen erkannt werden. Zusätzlich werden die zugehörigen Offsetdatenpunkte unter "config" angelegt, damit die Sensorwerte bei Bedarf korrigiert werden können. Die berechneten Datenpunkte Feuchte absolut und Taupunkt werden unter "berechnet" erstellt, jedoch nur, wenn der Sensor die Werte Temperatur und relative Feuchte liefert.

Wenn Sie andere Sensoren mit angepassten msg-Variablen verwenden, kann ich dies im Adapter implementieren oder Sie stellen eine Pull-Anfrage. Die msg-Variablen müssen sich von den bereits verwendeten unterscheiden.

Bereits verwendete msg-Variablen

* d = Entfernung
* h = Luftfeuchtigkeit
* er = Höhe
* p = Luftdruck
* r = Reed-Kontakt
* t = Temperatur
* v = Batteriespannung

-------------------------------------------------------------------------------------------

## TinyRX4 Adapter für ioBroker
Einlesen der vom TinyRX4 empfangenen Funksensordaten

Der Funksender TinyTX4 und der Funkempfänger TinyRX4 wurden von meigrafd im deutschen Raspberry Pi Forum entwickelt.

Projekt-Seite: https://forum-raspberrypi.de/forum/thread/7472-batteriebetriebene-funk-sensoren/

Github:

* Absender: https://github.com/meigrafd/TinyTX4
* Empfänger: https://github.com/meigrafd/TinyRX4

Ziel des Projekts ist es, schnurlose Funk-Sensoren, die über Batterien versorgt werden, zu betreiben und mit dem RaspberryPI die Daten zu empfangen sowie auszuwerten.

Als Sensor kann man im Prinzip alle Arten von Sensoren verwenden, Temperatur, Luftfeuchtigkeit, Luftdruck, Höhenmesser, Anwesenheitssensoren, Magnetschalter, Erschütterungs-Sensoren, Feuchtigkeitsmesser usw.

Dieser ioBroker-Adapter unterstützt alle unter https://github.com/meigrafd/TinyTX4 hinterlegten Sensorsketche:

* BMP085 (Druck- / Temperatursensor)
* DHT22 (Temperatur- / Feuchtesensor)
* DS18B20 (Temperatursensor)
* HCSR04 (Ultraschallsensor)
* ReedSwitch (Tür- / Fensterkontakt)

Weitere unterstützte Sketche:

* BME280 (Druck- / Temperatur- / Feuchtesensor) https://github.com/bowao/tinytx4_bme280

In der Adapterkonfiguration können Sie die serielle Schnittstelle und die zugehörige Baudrate einstellen. Außerdem besteht die Möglichkeit für bereits erstellte Sensoren nach neuen oder versehentlich gelöschten Datenpunkten zu suchen, ohne dass der komplette Sensor neu angelegt werden muss.

Die Sensoren werden nach dem ersten Nachrichten-Empfang automatisch mit ihrer Node-Id angelegt. Es werden jeweils nur die Datenpunkte angelegt, die über die msg-Variablen erkannt wurden. Zusätzlich werden unter "config" die zugehörigen Offset-Datenpunkte erstellt, damit die Sensorwerte bei Bedarf korrigiert werden können. Unter "berechnet" werden die errechneten Datenpunkte absolut und taupunktmäßig angelegt, jedoch nur, wenn der Sensor die Werte Temperatur und relative Feuchte liefert.

Falls ihr andere Sensoren mit angepassten msg-Variablen verwendet, kann ich gerne im Adapter umsetzen oder ihr macht einen Pull-Request. Die msg-Variablen müssen von den bereits benutzten unterscheiden.

Bereits benutzte msg-Variablen:

* d = Entfernung
* h = Luftfeuchte
* he = Höhe
* p = Luftdruck
* r = Reed-Kontakt
* t = Temperatur
* v = Batteriespannung

## Changelog
### 0.1.4
- (bowao) fix typo

### 0.1.3
- (bowao) fix npm Version

### 0.1.2
- (bowao) close serialport on unload and cleanup 2

### 0.1.1
- (bowao) close serialport on unload and cleanup

### 0.1.0
- (boawo) add option to search new data points on already created sensors
- (bowao) add calculated data points humidity_absolute and dew point
- (bowao) remove TiNo support (TiNo now has his own adapter)

### 0.0.3
- (bowao) add support for TiNo
- (bowao) bugfix

### 0.0.2
- (bowao) cleanup and npm release

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