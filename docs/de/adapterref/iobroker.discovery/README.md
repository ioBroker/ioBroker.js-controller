---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.discovery/README.md
title: ioBroker Discover Adapter
hash: t2jmJ5rbLu/SwF6++81FinapfXq7DS+vp5vZd/zH/4Q=
---
![Logo](../../../en/adapterref/iobroker.discovery/admin/discovery.png)

![Anzahl der Installationen](http://iobroker.live/badges/discovery-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.discovery.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.discovery.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.discovery.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.discovery.png?downloads=true)

# IoBroker Discover Adapter ===============
** Geräte mit allen bekannten Methoden erkennen. **

Dies sind spezielle Adapter, die versuchen, alle möglichen Geräte zu finden, die vom Host aus erreichbar sind.
Jetzt kann es per Ping UPnP (seriell geplant) erkennen.

## Eigentlich unterstützt
### Automatisch erkannt
- Bose Soundtouch
- Broadlink
- Chromecast
- Daikin-Klimatisierung
- deConz
- Denon / Marantz
- DoorBird
- ebus
- ekey
- Energiemanager (E.ON / Solarwatt)
- Epson Stylus PX830
- Fakeroku
- FHEM
- FireTV
- Fronius
- G-Homa-Stecker
- Harmonie
- Home Assistant
- Homematic CCU (hm-rpc, hm-rega)
- Homepilot
- Philips HUE
- InfluxDB
- KLF-200
- KNX
- Landroid
- LGTV
- Lightify
- Loxone
- Lupusec
- MAX! Würfel
- MegaD
- Miele
- Mi Zuhause Smarthome
- MiLight-Brücke (v6)
- Musiksendung
- Mysensors USB / Seriell (9600, 38400, 57600, 115200)
- Nuss
- OpenHAB
- Ping
- Proxmox
- RFLink (Seriell 57600 Baud)
- SamsungTV
- Sonnen
- Sonos
- Stiebel-Eltron / Tecalor ISG (plus)
- SQL (MySQL, MSSQL, PostgreSQL)
- Squeezebox
- stiebel-isg
- TR-064
- Trådfri
- UPnP
- Wifilight
- Yamaha
- Yeelight
- Z-Wave USB (getestet mit Aeon Labs)

### Als zusätzliche Adapter angeboten
- Wolke
- Verlauf (wenn keine SQL oder InfluxDB gefunden wurde)
- Flot (wird angeboten, wenn ein History-Adapter vorhanden ist)
- JavaScript
- Handy, Mobiltelefon
- Vis
- Netz

## Machen
- artnet? (Blauer Fuchs)
- B-Control-Em? (Blauer Fuchs)
- cul / maxcul (Bluefox)
- Foobar200 (Installateur)
- fritzbox (ruhr70)
- km200 (Frankjoke)
- kodi (instalator)
- megaesp (ausHaus)
- Modbus (Bluefox)
- mpd (instalator)
- mqtt / mqtt-client (Bluefox)
- onkyo (Bluefox)
- owfs (Bluefox)
- rpi2 (wenn ioBroker auf Himbeere läuft)
- rwe-smarthome (PArns)
- s7 (Bluefox)
- Smartmeter (Apollon77)
- unifi (jens-maus)
- Wolf
- xs1 (frankjoke)

## Changelog
### 1.3.0 (2019-01-04)
* (bluefox) Support of compact mode

### 1.2.4 (2018-09-22)
* (bluefox) Small GUI update was made
* (rg-engineering) Added ebus

### 1.2.3 (2018-09-13)
* (bluefox) Proxmox was fixed
* (unltdnetworx) solarwatt
* (Michael Schroeder) klf200
* (bluefox) Use OpenStreetMap
* (MeisterTR) yeelight
* (unltdnetworx) stiebel-isg
* (BuZZy1337) doorbird

### 1.2.1 (2018-07-28)
* (bluefox) New adapter added: DENON

### 1.1.1 (2018-03-27)
* (bluefox) New adapter added: ekey, Home Assistant, FHEM

### 1.1.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library

### 1.0.2 (2018-01-13)
* (bluefox) ready for admin3

### 1.0.1 (2017-12-28)
* Fix Epson Stylus PX830
* Add Bose Soundtouch

### 1.0.0 (2017-10-18)
* (pix) Add Epson Stylus PX830
* (pix) Add Homepilot
* (Samuel Weibel) Loxone

### 0.4.5 (2017-08-25)
* (Apollon77) Fixes in mihome

### 0.4.4 (2017-06-01)
* (bluefox) Add lgtv
* (bluefox) disable serial by default. It must be explicit enabled every time
* (bluefox) add mihome

### 0.4.2 (2017-05-17)
* (bluefox) Add discovery methods selection

### 0.4.0 (2017-05-01)
* (soef) add SamsungTV, Lightify, Miele and yamaha
* (soef) add new discovery method mDNS
* (bluefox) add openhab, Broadlink

### 0.3.3 (2017-04-15)
* (bluefox) add philips HUE

### 0.3.2 (2017-04-12)
* (bluefox) Add mysensors USB/Serial

### 0.3.1 (2017-04-01)
* (apollon77) Add Daikin climate control

### 0.3.0 (2017-03-27)
* (bluefox) Fixed serial discovery

### 0.2.3 (2017-03-18)
* (bluefox) fix license dialog
* (bluefox) add zwave
* (bluefox) add sqllite and flot
* (bluefox) ack => ignore
* (bluefox) add megad
* (apollon77) add history
* (apollon77) enhance/fix sql-sqlite
* (apollon77) add InfluxDB
* (ykuendig) german translation updated

### 0.2.2 (2017-03-18)
* (bluefox) Fix typo

### 0.2.1 (2017-03-15)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2017-2019, bluefox <dogafox@gmail.com>

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