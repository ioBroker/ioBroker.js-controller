---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.jeelink/README.md
title: ioBroker.jeelink
hash: pqu3Bjsp33UvrKBQ05qx1l3rKcZM5SddWQfAlEtdnF8=
---
![Logo](../../../en/adapterref/iobroker.jeelink/admin/jeelab_logo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.jeelink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.jeelink.svg)
![Build-Status](https://travis-ci.org/foxthefox/ioBroker.jeelink.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.jeelink.png?downloads=true)

# IoBroker.jeelink
Dies ist ein Adapter für ioBroker zur Integration von RFM12B / RFM69 über Jeelink.
Der Jeelink kann mit der vorinstallierten Software (rfmdemo) zum Lesen von Openenergiesensoren (emon) verwendet werden.
Für den Einsatz von LaCrosse-Sensoren muss die Firmware ausgetauscht werden (siehe iobroker-Forum).

## Installation:
### Freigegebene Version
```javascript
npm install iobroker.jeelink
```

auf Himbeere kann es helfen, zu verwenden:

```javascript
 npm install --unsafe-perm iobroker.jeelink
 ```

 weil das serialport-Paket auf einem nicht unterstützten arm-hw erstellt werden muss

### Die eigentliche Entwicklungsversion von github (funktioniert möglicherweise nicht!)
```javascript
npm install https://github.com/foxthefox/ioBroker.jeelink/tarball/master --production
```

oder

```javascript
npm install --unsafe-perm https://github.com/foxthefox/ioBroker.jeelink/tarball/master --production
```

## Die Einstellungen:
- USB-Anschluss von JeelinkAdapter in der Regel / dev / ttyACME
- Seriengeschwindigkeit normalerweise 57600 Baud

## Aufbau:
in admin gemacht werden

* Deinitierung des USB-Ports
* Einstellung der Baudrate
- Definieren Sie die Adresse des Sensors, der auf Luft empfangen wird
- Definieren Sie eine eindeutige Sensoradresse im Adapter (LaCrosse ändert die On-Air-Adresse nach dem Batteriewechsel. Beobachten Sie das Protokoll und passen Sie die Sensoradresse nach dem Batteriewechsel an.)
- den Sensortyp definieren (siehe Beispiele unten)
- den Raum definieren

## Sensoren
| Objekt | Gerätevarianten | Telegrammbeispiel | Beschreibung |
|--------|-------|:-:|--------|
| emonTH | emonTH | OK 19 ... | sensor von openenergy.org |
| emonWater | emonWater | OK 21 ... | Sensor mit RFM12B für Wassermessung |
| LaCrosseDTH | TX | OK 9 ... | Sensoren von LaCrosse, technoline |
| HMS100TF | TXH29DTH-IT | H00 ... | sensors technoline |
| LaCrosseBMP180 || OK WS ... | sensor mod, superjee |
| LaCrosseWS | WS1080, TX22, WS1600 | OK WS ... | Wetterstation |
| EC3000 | EC3000 | OK 22 ... | Energiezähler |
| EMT7110 | EMT7110 | OK EMT7110 ... | Energiezähler |
| Füllstand | Füllstand | OK LS ... | Füllstandssensor |

## MACHEN:
* andere Sensortypen
* Geben Sie den Sensorcode in eine separate Datei ein
* Schieben des neuen Sensors auf config, dann sichtbar auf der Admin / Config-Seite
* HMS100TF Temperatur unter 0 °C und niedriger Batteriestand

## Changelog
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