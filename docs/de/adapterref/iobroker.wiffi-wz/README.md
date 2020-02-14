---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wiffi-wz/README.md
title: kein Titel
hash: NGgm7DK6E9ncrgi/aCWgVT5ULGjWqESD0iJ9uLBcDEw=
---
![Logo](../../../en/adapterref/iobroker.wiffi-wz/admin/wiffi-wz.png) ioBroker Adapter für Wiffi-wz, Weatherman, Wiffi-Pumpe, Pulsecounter, Rainyman und vielleicht andere

![Anzahl der Installationen](http://iobroker.live/badges/wiffi-wz-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.wiffi-wz.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.wiffi-wz.svg)
![NPM](https://nodei.co/npm/iobroker.wiffi-wz.png?downloads=true)
![Build-Status](https://travis-ci.org/t4qjXH8N/ioBroker.wiffi-wz.svg?branch=master)

=================

Dies ist ein [ioBroker] (https://github.com/ioBroker/ioBroker) Adapter zum Abrufen von Sensordaten von Wiffi-Geräten siehe [Stall.biz](http://www.stall.biz) für weitere Informationen.

Typische Beispiele für Geräte von Stall.biz sind die [Wiffi-wz] (http://www.stall.biz/project/der-wiffi-wz-2-0-der-wohnzimmersensor), der [Weatherman] (https://www.stall.biz/project/weatherman) -die-perfekte-wetterstation-für-die-hausautomation) und der [Rainyman](https://www.stall.biz/project/rainyman-der-perfekte-sensor-fuer-regen-sonne-klima-bodenfeuchte-und-mehr). Es werden mehrere Wiffis gleichzeitig unterstützt.

Aufgrund der sehr geringen Latenz des Adapters (normalerweise <3 s) ist es möglich, mit den IR-Bewegungssensoren eine Aktion wie das Ein- oder Ausschalten der Lichter auszulösen.

Im Folgenden werden einige Geräte von Stall.biz näher beschrieben: Das Wiffi-wz ist ein Gerät, das acht Sensoren in einer Einheit vereint. Derzeit sind folgende Sensoren verfügbar:

- zwei orthogonal ausgerichtete IR-Bewegungssensoren
- Temperatursensor (kann [DHT22] (https://www.sparkfun.com/datasheets/Sensors/Temperature/DHT22.pdf) oder [BME280] (https://ae-bst.resource.bosch.com/ sein) media / _tech / media / Datenblätter / BST-BME280_DS001-11.pdf))
- Luftfeuchtigkeitssensor (kann [DHT22] (https://www.sparkfun.com/datasheets/Sensors/Temperature/DHT22.pdf) oder [BME280] (https://ae-bst.resource.bosch.com sein) sein /media/_tech/media/datasheets/BST-BME280_DS001-11.pdf))
- Atmosphärendruck (kann [BMP180] sein (https://cdn-shop.adafruit.com/datasheets/BST-BMP180-DS000-09.pdf), [BMP280] (https://ae-bst.resource.bosch .com / media / _tech / media / datasheets / BST-BMP280-DS001-12.pdf) oder [BME280] (https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-) BME280_DS001-11.pdf))
- Geräuschsensor mit einstellbarer Empfindlichkeit
- Luxmeter ([BH1750] (http://rohmfs.rohm.com/de/products/databook/datasheet/ic/sensor/light/bh1750fvi-e.pdf))
- Luftqualitätssensor ([MQ135] (https://www.olimex.com/Products/Components/Sensors/SNS-MQ135/resources/SNS-MQ135.pdf))
- Piepser

Der Weatherman kann mit vielen Sensoren ausgestattet werden, siehe [Startseite](https://www.stall.biz/project/weatherman-die-perfekte-wetterstation-fuer-die-hausautomation) für weitere Details.

Der Rainyman ist eine irgendwie reduzierte Version des Weatherman, siehe [Startseite](https://www.stall.biz/project/rainyman-der-perfekte-sensor-fuer-regen-sonne-klima-bodenfeuchte-und-mehr) für weitere Details.

## Wie es funktioniert
Normalerweise sendet der Wiffi-wz Sensordaten an eine Homematic-CCU. Die Homematic CCU empfängt ein Homematic-Skript (oder besser JSON) an Port 8181. Auf der Administrationsseite dieses Adapters wird das Wiffi-wz neu konfiguriert, um Sensordaten direkt an ioBroker zu senden. Die Sensordaten werden im Format [JSON](https://en.wikipedia.org/wiki/JSON) codiert. Daher wird auf dem ioBroker-Computer ein lokaler Socket an Port 8181 geöffnet. Beachten Sie, dass der Socket ** aus Sicherheitsgründen nicht dem Internet ausgesetzt werden darf.

## Installieren
1. Legen Sie ioBroker als Empfänger für die Sensordaten fest, indem Sie die URL abrufen

    http:// [wiffi ip] /? ccu: [io-broker's ip]:

2. und setzen Sie den Port auf 8181 von

    http:// [wiffi ip] /? param: 12: 8181

3. Sagen Sie wiffi-wz, dass Daten im JSON-Format ohne HTML-Header gesendet werden müssen (Beachten Sie, dass der Wettermann möglicherweise eine andere Parameternummer verwendet).

http:// [wiffi ip] /? param: 27: 1

Wenn ein Fehler auftritt, setzen Sie den Adapter loglevel auf Debug und senden Sie mir das Datentelegramm per E-Mail.

## Spende
Wenn dieses Projekt Ihnen geholfen hat, die Entwicklungszeit zu verkürzen, können Sie mir über PayPal (chvorholt@gmail.com) eine Tasse Kaffee oder eine Flasche Bier geben :-)

## Changelog
#### 2.2.0 (08-Feb-2020)
- compact mode successfully tested

#### 2.1.5 (08-Feb-2020)
- fixed an error with numeric state names

#### 2.1.4 (29-Aug-2019)
- fixed "could not create a state null" error

#### 2.1.3 (27-Jun-2019)
- compatibility for boolean values and old Wiffi versions

#### 2.1.2 (21-Jun-2019)
- changed behaviour: if states are missing in the datagram, but present in the database, they are not removed from the database
- boolean and numeric values are correctly stored

#### 2.1.0 (14-Apr-2019)
- support for compact mode

#### 2.0.1 (08-Jan-2019)
- fixed "could not find ip" bug

#### 2.0.0 (03-Oct-2018)
- wiffi type does not need to be specified in the config anymore
- states are created and deleted by examining the received datagram
- some minor changes concerning the logging
- the buzzer of the wiffi can be activated (it may work for other actors as well, but it is untested at the moment)

#### 1.3.1 (01-Sep-2018)
- fixed npm installation problems

#### 1.3.0 (31-Aug-2018)
- support for Wiffi-pump

#### 1.2.6 (31-Aug-2018)
- fixed "adapter already running error"

#### 1.2.5 (31-Aug-2018)
- solved error when the adapter shuts down

#### 1.2.4 (16-Aug-2018)
- hotfix for wiffi-wz

#### 1.2.3 (15-Aug-2018)
- necessary modifications for publishing the adapter (fixing package.json, etc ...)

#### 1.2.2 (14-Aug-2018)
- necessary modifications for publishing the adapter (fixing roles, etc ...)

#### 1.2.1 (14-Aug-2018)
- fixed datagram evaluation

#### 1.2.0 (10-Aug-2018)
- added support for Rainyman (many thanks to Strobelix from [ioBroker forum](https://forum.iobroker.net) for testing)

#### 1.1.0 (26-Jul-2018)
- added support for Weatherman (many thanks to smartboart from [ioBroker forum](https://forum.iobroker.net) for testing)

#### 1.0.0 (17-Jul-2018)
- added support for Admin3

#### 0.3.3 (13-Dec-2017)
- corrected typos
- cleaner code

#### 0.3.2 (13-Dec-2017)
- added license file

#### 0.3.1 (10-Dec-2017)
- support for wiffi-wz, WEATHERMAN, and Rainymans, firmware should be greater or equal to _83
- some bugfixes

#### 0.2.1 (5-Dec-2017)
Bugfixes:
- JSON format sent by the Wiffi had been changed since Wiffi firmware wiffi_software_53. JSON data interpretation fixed.

#### 0.2.0 (10-Feb-2017)
Features:
- Added support for multiple Wiffis.

Changes:
- Removed expert functions from the admin interface.

#### 0.1.0 (12-Jan-2017)
Features:
- Mandatory settings can be done on the admin page.
- The wiffi-wz can be configured from the admin page (there are some problems, see known issues of this release).

#### 0.0.1 (12-Jan-2017)
Features:
- The sensor data is send to the ioBroker and saved as corresponding states.

## License
The MIT License (MIT)

Copyright (c) 2014-2019 Christian Vorholt <chvorholt@gmail.com>

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