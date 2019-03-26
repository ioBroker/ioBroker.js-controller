---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mysensors/README.md
title: ioBroker.mysensors
hash: MTKTY7bxv8lLiSNzdt7rB0mKYl8xAKDonrbbtSVKGfc=
---
![Logo](../../../en/adapterref/iobroker.mysensors/admin/mysensors.png)

![Anzahl der Installationen](http://iobroker.live/badges/mysensors-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.mysensors.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mysensors.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.mysensors.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.mysensors.png?downloads=true)

# IoBroker.mysensors ===================
Dieser Adapter kommuniziert mit [Mysensoren](http://www.mysensors.org) Seriell- oder Ethernet-Gateway (TCP oder UDP).
Das in diesem Fall ausgewählte Ethernet-Gateway ioBroker ist ein Server, der Verbindungen erwartet.

## TCP Client
Diese Option funktioniert nur zusammen mit der TCP <=> seriellen Bridge, wie z. B. [esp-link](https://github.com/jeelabs/esp-link).

## Voraussetzungen
Um die serielle Schnittstelle unter Windows verwenden zu können, muss VS die Binärdatei erstellen.
Um die serielle Schnittstelle unter Linux verwenden zu können, ist Python2.7 erforderlich. Um sie zu installieren, schreibe einfach:

```
sudo apt-get update
sudo apt-get install build-essential
sudo apt-get install python2.7
```

## Changelog
### 1.2.2 (2018-09-17)
* (Haba1234) Added new objects (library 2.3.x)
* (Haba1234) Added support for sleeping nodes

### 1.2.1 (2018-01-23)
* (Haba1234) Update for Admin v3

### 1.2.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library

### 1.1.0 (2017-12-17)
* (bluefox) TCP client added

### 1.0.10 (2017-10-24)
* (jangatzke) Fixed wrong data type for scene controller, enabled ack flag on set command

### 1.0.8 (2017-04-18)
* (Qube2org) adjust log level for I_LOG_MESSAGE

### 1.0.7 (2017-04-10)
* (bluefox) fix I_TIME request

### 1.0.6 (2016-12-17)
* (bluefox) show extended list of serial ports

### 1.0.5 (2016-12-15)
* (Apollon77) update serialport library for node 6.x compatibility

### 1.0.4 (2016-07-01)
* (bluefox) add comment in configuration
* (bluefox) fix inclusion mode control

### 1.0.2 (2016-07-06)
* (soef) fix id usage

### 1.0.1 (2016-07-01)
* (soef) necessary version of sensor module increased

### 1.0.0 (2016-06-28)
* (soef) some value corrections and enlargement

### 0.2.6 (2016-06-16)
* (bluefox) do not switch off inclusion mode by stop

### 0.2.5 (2016-06-14)
* (bluefox) remove debug outputs

### 0.2.4 (2016-06-10)
* (bluefox) try/catch parse of messages

### 0.2.3 (2016-04-13)
* fix boolean values

### 0.2.2 (2016-04-10)
* (bluefox) implement inclusion mode

### 0.2.1 (2016-03-21)
* (bluefox) translates
* (bluefox) connection timeout for serial connection

### 0.2.0 (2016-03-21)
* (bluefox) wait till serial port is opened
* (bluefox) configurable baud rate

### 0.1.10 (2016-03-21)
* (bluefox) set role of dimmer as level.dimmer

### 0.1.9 (2016-03-15)
* (bluefox) fix typo

### 0.1.8 (2016-03-02)
* (bluefox) fix connection indicator for serial

### 0.1.7 (2016-03-02)
* (bluefox) do not send any data on disconnect

### 0.1.6 (2016-03-02)
* (bluefox) set UDP as default settings

### 0.1.5 (2016-03-02)
* (bluefox) change tree