![Logo](admin/discovery.png)
# ioBroker Discover Adapter

![Number of Installations](http://iobroker.live/badges/discovery-installed.svg) ![Number of Installations](http://iobroker.live/badges/discovery-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.discovery.svg)](https://www.npmjs.com/package/iobroker.discovery)
[![Downloads](https://img.shields.io/npm/dm/iobroker.discovery.svg)](https://www.npmjs.com/package/iobroker.discovery)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.discovery.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.discovery)

[![NPM](https://nodei.co/npm/iobroker.discovery.png?downloads=true)](https://nodei.co/npm/iobroker.discovery/)

**Detect devices with all known methods.**

This is special adapters, that tries to find all possible devices, that can be reachable from host.
Just now it can detect via ping, UPnP (serial planned).

## Actually supported

### Automatically Discovered

- Bosch Smart Home
- Bose Soundtouch
- Broadlink
- Chromecast
- Daikin climate control
- deConz
- Denon /Marantz
- DoorBird
- ebus
- ekey
- energymanager (E.ON/Solarwatt)
- Epson Stylus PX830
- Fakeroku
- FHEM
- FireTV
- Fronius
- G-Homa plugs
- Harmony
- Home Assistant
- Homematic CCU (hm-rpc, hm-rega)
- Homepilot
- Philips HUE
- Plex
- InfluxDB
- KLF-200
- KNX
- Landroid
- LGTV
- Lightify
- Loxone
- Lupusec
- MAX! Cube
- MegaD
- Miele
- Mi Home Smarthome
- MiLight bridge (v6)
- Musiccast
- Mysensors USB/Serial (9600, 38400, 57600, 115200)
- Nut
- OpenHAB
- Ping
- Proxmox
- RFLink (Serial 57600baud)
- SamsungTV
- Sonnen
- Sonos
- Stiebel-Eltron/Tecalor ISG (plus)
- SQL (MySQL, MSSQL, PostgreSQL)
- Squeezebox
- stiebel-isg
- TR-064
- Trådfri
- UPnP
- Wifilight
- Yamaha
- Yeelight
- Z-wave USB (Tested with Aeon Labs)

### Offered as additional adapters
- Cloud
- History (if no SQL or InfluxDB found)
- flot (offered when a History-Adapter is present)
- JavaScript
- Info
- Mobile
- Vis
- Web

## Todo
- artnet? (Bluefox)
- B-Control-Em? (Bluefox)
- cul / maxcul (Bluefox)
- Foobar200 (Instalator)
- fritzbox (ruhr70)
- km200 (frankjoke)
- kodi (instalator)
- megaesp (ausHaus)
- modbus (Bluefox)
- mpd (instalator)
- mqtt/mqtt-client (Bluefox)
- onkyo (Bluefox)
- owfs (Bluefox)
- rpi2 (if ioBroker runs on Raspberry)
- rwe-smarthome (PArns)
- s7 (Bluefox)
- smartmeter (Apollon77)
- unifi (jens-maus)
- wolf (smiling-jack)
- xs1 (frankjoke)

## Changelog
### 2.1.0 (2020-01-21)
* (foxriver76) no longer use adapter.objects
* __js-controller > 2.0.0 required__

### 2.0.0 (2019-05-15)
* (thewhobox) Code refactoring
* (thewhobox) add emby detection
* (frankjoke) boradlink => broadlink2
* (bluefox) Small fixes
* (Apollon77) Support for nodejs 12 added, nodejs 4 is no longer supported!

### 1.3.0 (2019-01-04)
* (bluefox) Support of compact mode
* (ldittmar) info Adapter added

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
