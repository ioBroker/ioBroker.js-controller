---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lupusec/README.md
title: ioBroker.lupusec
hash: ojQGzLlL+5fNwArqwcLHZkA4o+ceZjJj1Q3RMIjIJ94=
---
![Logo](../../../en/adapterref/iobroker.lupusec/admin/lupusec.png)

![Build-Status](https://travis-ci.org/schmupu/ioBroker.lupusec.svg?branch=master)
![Anzahl der Installationen](http://iobroker.live/badges/lupusec-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.lupusec.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lupusec.svg)
![NPM](https://nodei.co/npm/iobroker.lupusec.png?downloads=true)

# IoBroker.lupusec ==================
Benötigt node.js 6.0 oder höher und Admin v3!

Dieser Adapter verbindet das Lupusec-Alarmsystem XT1 Plus, XT2, XT2 Plus und XT3 mit dem ioBroker.
Der XT1 (ohne Plus) wird nicht unterstützt. Sie können den Status der Lupusec-Sensoren wie Türen, Fenster, Wasser- und Rauchsensoren sowie den Status der Alarmanlage ablesen.
Sie können Schalter einschalten und das Alarmsystem aktivieren / deaktivieren.

Detaillierte Informationen finden Sie hier: [Lupus](https://www.lupus-electronics.de/en)

## Installation
1. Installieren Sie den Adapter

Am einfachsten ist es, den lupusec.iobroker-Adapter über den Discovery-Adapter in ioBroker zu konfigurieren. Der Erkennungsadapter sucht nach der richtigen IP-Adresse des Lupusec-Alarmsystems. Der andere Weg ist es, es manuell zu konfigurieren

2. Manuelle Konfiguration des Adapters

Wählen Sie die IP-Adresse oder den Hostnamen aus dem Lupusec-Alarmsystem. Wählen Sie möglichst https (empfohlen).
Um nur den Status zu lesen, wählen Sie einen Benutzer ohne Schreibzugriff aus. Wenn Sie den Status ändern möchten (z. B. das Licht ein- / ausschalten oder den Alarm aktivieren oder deaktivieren), wählen Sie einen Benutzer mit Schreibzugriff aus.

Standardmäßig werden alle Lupusec-Geräte auf der Registerkarte des ioBroker-Objekts angezeigt.
Vollständig unterstützt und individuell angepasst sind folgende Geräte:

  - Türkontakt / Fensterkontakt (Typ 4)
  - Wassersensor (Typ 5)
  - Bewegungsmelder / 360-Grad-Bewegungsmelder (Typ 9)
  - Rauchmelder / Wärmemelder (Typ 14)
  - Statusanzeige / Mini-Innensirene (Typ 22)
  - Netzschalter (Typ 24)
  - Tastatur (Typ 37)
  - Leistungsschalterzähler (Typ 49)
  - Raumfühler V1 (Typ 54)
  - Dimmer (Typ 66)
  - Farbton (Typ 74)
  - Rollladenrelais V1 (Typ 76)
  - Lichtsensor (Typ 78)
  - Heizkörperthermostat (Typ 79)

Die beiden Zustände apple_home_a1 und lupusec.0.status.apple_home_a2 für den Apple Homekit-Adapter yahka werden unterstützt. Sie können zusätzlich zu den Lupusec-Zuständen das Alarmsystem für Bereich 1 und 2 ein- und ausschalten.

Wenn Sie ein Gerät besitzen, das nicht in der obigen Liste aufgeführt ist, wenden Sie sich bitte an Thorsten Stueben <thorsten@stueben.de>.

## Changelog

### 1.0.0 (22.12.2018)
* (Stübi) Support js-controller compact mode   

### 0.4.1 (22.12.2018)
* (Stübi) Changed core adapter   

### 0.4.0 (07.12.2018)
* (Stübi) Add Light sensor (type 78)  

### 0.3.9 (26.11.2018)
* (Stübi) Add Apple home alarm status  

### 0.3.8 (13.11.2018)
* (Stübi) Add dimmer / relais (type 66)  

### 0.3.7 (12.11.2018)
* (Stübi) Bugfixing

### 0.3.6 (31.10.2018)
* (Stübi) Bugfixing and new status alarm_ex

### 0.3.5 (21.10.2018)
* (Stübi) Bugfixing and changing of the polling mechanism

### 0.3.4 (30.09.2018)
* (Stübi) password will be encrypted. Translation of configuration

### 0.3.2 (15.09.2018)
* (Stübi) add debug messages

### 0.3.1 (12.09.2018)
* (Stübi) Hue, room sensor, power switch added

### 0.2.7 (19.08.2018)
* (Stübi) Fixing error update function

### 0.2.6 (17.08.2018)
* (Stübi) Improvements and new add/del/update Object function

### 0.2.5 (10.08.2018)
* (Stübi) Changes of roles and icons added to devices

### 0.2.4 (16.07.2018)
* (Stübi) Wrong device description removed

### 0.2.3 (16.07.2018)
* (Stübi) RSSI Status an Device shutter (type 76) supported

### 0.2.2 (13.07.2018)
* (Stübi) Devices thermostat (type 79) and switch (type 48) supported

### 0.2.1 (08.06.2018)
* (Stübi) Directory widged deleted

### 0.2.0 (03.06.2018)
* (Stübi) Port can be added

## License
The MIT License (MIT)

Copyright (c) 2018 Thorsten Stueben <thorsten@stueben.de>

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