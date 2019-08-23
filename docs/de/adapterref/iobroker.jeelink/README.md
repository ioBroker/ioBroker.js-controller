---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.jeelink/README.md
title: ioBroker.jeelink
hash: apV/B74CjZZUMKx+MC9nfCoMdKN4fZnzSlibWD1ycMc=
---
![Logo](../../../en/adapterref/iobroker.jeelink/admin/jeelab_logo.png)

![Anzahl der Installationen](http://iobroker.live/badges/jeelink-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.jeelink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.jeelink.svg)
![Build Status](https://travis-ci.org/foxthefox/ioBroker.jeelink.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.jeelink.png?downloads=true)

# IoBroker.jeelink
Dies ist ein Adapter für ioBroker zur Integration von RFM12B / RFM69 über Jeelink.
Der jeelink kann mit der vorinstallierten Software (rfmdemo) zum Auslesen von Openenergiesensoren (emon) verwendet werden.
Für die Verwendung von LaCrosse-Sensoren muss die Firmware ausgetauscht werden (siehe iobroker-Forum).

## Installation:
### Freigegebene Version
```javascript
npm install iobroker.jeelink
```

auf Himbeere könnte es helfen, zu verwenden:

```javascript
 npm install --unsafe-perm iobroker.jeelink
 ```

 weil serialport package auf nicht unterstütztem arm-hw aufgebaut sein muss

### Die aktuelle Entwicklungsversion von Github (im Test möglicherweise nicht funktionsfähig!)
```javascript
npm install https://github.com/foxthefox/ioBroker.jeelink/tarball/master --production
```

oder

```javascript
npm install --unsafe-perm https://github.com/foxthefox/ioBroker.jeelink/tarball/master --production
```

## Die Einstellungen:
- USB-Anschluss von JeelinkAdapter normalerweise / dev / ttyACME
- Seriengeschwindigkeit normalerweise 57600 Baud

## Aufbau:
zu erledigen in admin

* Deinition des USB-Ports
* Einstellen der Baudrate
- Fühleradresse festlegen, die auf Sendung empfangen wird
- Definieren Sie eine eindeutige Sensoradresse im Adapter (LaCrosse ändert die On-Air-Adresse nach dem Batteriewechsel. Beachten Sie daher das Protokoll und passen Sie die Sensoradresse nach dem Batteriewechsel an.)
- Definieren Sie den Sensortyp (siehe nachfolgende Beispiele)
- definieren Sie den Raum

## Sensoren
| Objekt | Gerätevarianten | Telegrammbeispiel | Beschreibung |
|--------|-------|:-:|--------|
| emonTH | emonTH | OK 19 ... | sensor von openenergy.org |
| emonWater | emonWater | OK 21 ... | Sensor mit RFM12B zur Wasserdosierung |
| LaCrosseDTH | TX | OK 9 ... | Sensoren von LaCrosse, technoline |
| LaCrosseDTT | TX | OK 9 ... | Sensoren von LaCrosse, technoline double temp |
| HMS100TF | TXH29DTH-IT | H00 ... | Sensoren technoline |
| LaCrosseBMP180 || OK WS ... | sensor mod, superjee |
| LaCrosseWS | WS1080, TX22, WS1600 | OK WS ... | Wetterstation |
| EC3000 | EC3000 | OK 22 ... | Energiezähler |
| EMT7110 | EMT7110 | OK EMT7110 ... | Energiezähler |
| Füllstand | Füllstand | OK LS ... | Füllstandsensor |

## MACHEN:
* andere Sensortypen
* Geben Sie den Sensorcode in eine separate Datei ein
* Neuen Sensor in die Konfiguration schieben, dann auf der Admin / Config-Seite sichtbar
* HMS100TF Temperatur unter 0 °C und niedriger Batteriestand müssen implementiert werden

## Changelog
### 0.1.3
* (atl285) added new sensor type LacCrosseDTT (double temp like TX25-IT)

### 0.1.2
* correction for weather (no data is given by value = 255)

### 0.1.1
* delete buffer function to be compatible with nodejs10
* enhanced automatic testing

### 0.1.0
* compact mode

### 0.0.7
* new level sensor (fhem)

### 0.0.6
* last version of serialport
* new sensor TXH29DTH-IT
* new weather station WS1600
* new sensor EC3000, EMT7110 not verified with life data

### 0.0.5
* adminv3 improved with values2table

### 0.0.4
* command to USB-stick for configuration
* added superjee, BMP180 sensor on jeenode
* admin v3 implementation

### 0.0.3
* abs humidity and dewpoint calculation

### 0.0.2
* definition of unique sensor ID for iobroker datapoint
* implementation of LaCrosseDTH
* definition of sensors via admin

### 0.0.1
* working with 3 sensors emon

## License

The MIT License (MIT)

Copyright (c) 2018 foxthefox <foxthefox@wysiwis.net>