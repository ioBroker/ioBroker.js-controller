![Logo](admin/tinyRX4.png)
# ioBroker.tinyrx4

[![NPM version](http://img.shields.io/npm/v/iobroker.tinyrx4.svg)](https://www.npmjs.com/package/iobroker.tinyrx4)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tinyrx4.svg)](https://www.npmjs.com/package/iobroker.tinyrx4)
[![Dependency Status](https://img.shields.io/david/bowao/iobroker.tinyrx4.svg)](https://david-dm.org/bowao/iobroker.tinyrx4)
[![Known Vulnerabilities](https://snyk.io/test/github/bowao/ioBroker.tinyrx4/badge.svg)](https://snyk.io/test/github/bowao/ioBroker.tinyrx4)

[![NPM](https://nodei.co/npm/iobroker.tinyrx4.png?downloads=true)](https://nodei.co/npm/iobroker.tinyrx4/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/bowao/ioBroker.tinyrx4/master.svg)](https://travis-ci.org/bowao/ioBroker.tinyrx4)

## TinyRX4 adapter for ioBroker
(German version see below)

Read wireless sensordata received via TinyRX4

The wireless transceiver TinyTX4 and receiver TinyRX4 were developed by meigrafd in the german Raspberry Pi Forum.

Project-page: https://forum-raspberrypi.de/forum/thread/7472-batteriebetriebene-funk-sensoren/

Github:

* Transceiver: https://github.com/meigrafd/TinyTX4
* Receiver: https://github.com/meigrafd/TinyRX4


The aim of the project is to operate wireless sensors that are powered by batteries and to receive and evaluate the data with the RaspberryPI.

In principle you can use all types of sensors as sensor, e.g. temperature, humidity, air pressure, altimeter, presence sensors, magnetic switches, vibration sensors, humidity meters, etc.

This ioBroker-adapter supports all sensor sketches published on https://github.com/meigrafd/TinyTX4

* BMP085 (Pressure-/Temperature Sensor)
* DHT22 (Temperature-/Humidity Sensor) 
* DS18B20 (Temperature Sensor)
* HCSR04 (Ultrasonic Sensor)
* ReedSwitch (Door/Window Contact)

Further supported sketches:

* BME280 (Pressure-/Temperatur-/Humidity Sensor) https://github.com/bowao/tinytx4_bme280

In the adapter configuration, the serial interface and the associated baud rate can be set. In addition it is possible to search in already created sensors for new or accidentally deleted data points without having to create the entire sensor again.

The sensors are automatically created with their node-id after the first message reception. Only those data points are created that are detected via the msg-variables. In addition, the associated offset data points are created under "config", so that the sensor values can be corrected if necessary. The calculated data points humidity absolute and dew point are created under "calculated", but only if the sensor supplies the values temperature and relative humidity.

If you use other sensors with customized msg-variables, I can implement this in the adapter or you make a pull-request. The msg-variables must be different from those already used.

Already used msg-variables

* d = Distance
* h = Humidity
* he = Height
* p = Air Pressure
* r = Reed-Contact
* t = Temperature
* v = Battery voltage

-------------------------------------------------------------------------------------------

## TinyRX4 adapter für ioBroker

Einlesen der vom TinyRX4 empfangenen Funksensordaten

Der Funksender TinyTX4 und der Funkempfänger TinyRX4 wurden von meigrafd im deutschen Raspberry Pi Forum entwickelt.

Projekt-Seite: https://forum-raspberrypi.de/forum/thread/7472-batteriebetriebene-funk-sensoren/

Github:

* Sender: https://github.com/meigrafd/TinyTX4
* Empfänger: https://github.com/meigrafd/TinyRX4

Ziel des Projekts ist es, schnurlose Funk Sensoren, die über Batterien versorgt werden, zu betreiben und mit dem RaspberryPI die Daten zu empfangen sowie auszuwerten.

Als Sensor kann man im Prinzip alle Arten von Sensoren verwenden, z.B. Temperatur, Luftfeuchtigkeit, Luftdruck, Höhenmesser, Anwesenheitssensoren, Magnetschalter, Erschütterungs-Sensoren, Feuchtigkeitsmesser usw.

Dieser IoBroker-Adapter unterstützt alle unter https://github.com/meigrafd/TinyTX4 hinterlegten Sensorsketche:

* BMP085 (Druck-/Temperatursensor)
* DHT22 (Temperatur-/Feuchtesensor) 
* DS18B20 (Temperatursensor)
* HCSR04 (Ultraschallsensor)
* ReedSwitch (Tür-/Fensterkontakt)

Weitere unterstützte Sketche:

* BME280 (Druck-/Temperatur-/Feuchtesensor) https://github.com/bowao/tinytx4_bme280

In der Adapter Konfiguration lässt sich die Serielle Schnittstelle und die zugehörige Baudrate einstellen. Außerdem besteht die möglichkeit für bereits erstellte Sensoren nach neuen oder versehentlich gelöschten Datenpunkte zu suchen ohne das der komplette Sensor neu angelegt werden muss.  

Die Sensoren werden nach dem ersten Nachrichten-Empfang automatisch mit ihrer Node-Id angelegt. Es werden jeweils nur die Datenpunkte angelegt, die über die msg-Variablen erkannt wurden. Zusätzlich werden unter "config" die zugehörigen offset Datenpunkte erstellt, damit die Sensorwerte bei Bedarf korrigiert werden können. Unter "calculated" werden die erechneten Datenpunkte Feuchte absolut und Taupunkt angelegt, jedoch nur wenn der Sensor die Werte Temperatur und relative Feuchte liefert.

Falls ihr andere Sensoren mit angepassten msg-Variablen verwendet, kann ich dies gerne im Adapter umsetzen oder ihr macht einen pull-request. Die msg-Variablen müssen sich von den bereits benutzten unterscheiden.

Bereits benutzte msg-Variablen:

* d = Entfernung
* h = Luftfeuchte
* he = Höhe
* p = Luftdruck
* r = Reed-Kontakt
* t = Temperatur
* v = Batteriespannung

## Changelog
### 0.1.5
- Update travis.yml, License, Readme

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

Copyright (c) 2020 bowao <cryolab@web.de>

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
