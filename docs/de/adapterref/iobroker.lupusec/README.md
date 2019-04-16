---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lupusec/README.md
title: ioBroker.lupusec
hash: g7RKjgGXc3sJl6guz8xQBqY1Mi1cUE1tKbZvxg3JxRk=
---
![Logo](../../../en/adapterref/iobroker.lupusec/admin/lupusec.png)

![Travis Build Status](https://travis-ci.org/schmupu/ioBroker.lupusec.svg?branch=master)
![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.lupusec?branch=master&svg=true)
![Stabile Version](http://iobroker.live/badges/lupusec-stable.svg)
![Anzahl der Installationen](http://iobroker.live/badges/lupusec-installed.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.lupusec.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lupusec.svg)
![NPM](https://nodei.co/npm/iobroker.lupusec.png?downloads=true)

# IoBroker.lupusec
** Erfordert node.js 8.0 oder höher und Admin v3! **

Dieser Adapter verbindet das Lupusec-Alarmsystem XT1 Plus, XT2, XT2 Plus und XT3 mit dem ioBroker.
Der XT1 (ohne Plus) wird nicht unterstützt. Sie können den Status der Lupusec-Sensoren wie Türen, Fenster, Wasser- und Rauchsensoren sowie den Status der Alarmanlage ablesen.
Sie können zum Beispiel Schalter einschalten, den Verschluss steuern und das Alarmsystem aktivieren / deaktivieren.

Detaillierte Informationen finden Sie hier: [Lupus](https://www.lupus-electronics.de/en)

## Installation
1. Installieren Sie den Adapter

Der einfachste Weg ist, den lupusec.iobroker-Adapter über den Discovery-Adapter in ioBroker zu konfigurieren. Der Erkennungsadapter sucht nach der richtigen IP-Adresse des Lupusec-Alarmsystems. Der andere Weg ist es, es manuell zu konfigurieren

2. Manuelle Konfiguration des Adapters

Wählen Sie die IP-Adresse oder den Hostnamen aus dem Lupusec-Alarmsystem. Wählen Sie möglichst https (empfohlen).
Um nur den Status zu lesen, wählen Sie einen Benutzer ohne Schreibzugriff aus. Wenn Sie den Status ändern möchten (z. B. das Licht ein- / ausschalten oder den Alarm aktivieren / deaktivieren), wählen Sie einen Benutzer mit Schreibzugriff aus.
![Administrator](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin.png)

Standardmäßig werden alle Lupusec-Geräte auf der Registerkarte des ioBroker-Objekts angezeigt.
Vollständig unterstützt und individuell angepasst sind folgende Geräte:

  - Türkontakt / Fensterkontakt (Typ 4)
  - Wassersensor (Typ 5)
  - Panik-Taste (Typ 7)
  - Bewegungsmelder / 360-Grad-Bewegungsmelder (Typ 9)
  - CO-Sensor (Typ 13)
  - Rauchmelder / Wärmemelder (Typ 14)
  - Sirene innen (Typ 21)
  - Statusanzeige / Mini-Innensirene (Typ 22)
  - Netzschalter (Typ 24)
  - 1 Kanal-Relais mit ZigBee-Repeater (Typ 24)
  - 2-Kanal-Relais mit ZigBee-Repeater (Typ 24)
  - Tastatur (Typ 37)
  - Glassensor (Typ 39)
  - Sirene draußen (Typ 48)
  - Leistungsschalterzähler (Typ 48)
  - Raumfühler V1 (Typ 54)
  - Wärmemelder (Typ 58)
  - Dimmer (Typ 66)
  - Lichtschalter V2 (Typ 66)
  - Farbton (Typ 74)
  - Rollladenrelais V1 (Typ 76)
  - Heizkörperthermostat (Typ 79)
  - Heizkörperthermostat V2 (Typ 79)
  - Lichtsensor (Typ 78)
  - Szenarioschalter V2 (Typ 81)
  - Stoßsensor (Typ 93)

Die beiden Zustände apple_home_a1 und lupusec.0.status.apple_home_a2 für den Apple Homekit-Adapter yahka werden unterstützt. Sie können zusätzlich zu den Lupusec-Zuständen die Alarmanlage für Bereich 1 und 2 ein- und ausschalten.

Wenn Sie ein Gerät besitzen, das nicht in der obigen Liste aufgeführt ist, wenden Sie sich bitte an Thorsten Stueben <thorsten@stueben.de>.

## Objekte
Lupusec-Status
ioBroker bietet Ihnen die gleichen Statusobjekte wie in der Lupusec-App.
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_status.png)

### Lupusec-Geräte
Alle unterstützten Lupsec-Sensoren und -Geräte finden Sie unter "Geräte". Sollte ein Gerät fehlen, kontaktieren Sie mich bitte.
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_devices.png) Detailansicht eines Sensors oder Geräts. In diesem Beispiel sehen Sie den CO-Sensor. Bei CO-Alarm wechselt der Status 'alarm_status_ex' auf wahr und 'alarm_status' wechselt zu 'CO'.
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_devices_type09.png)

## Geplant
Folgende Dinge sind in der Zukunft geplant:

* unterstützung mehr sensoren / geräte
* Schreiben einer Dokumentation für jeden Sensor / Gerät

## Changelog

### 1.1.4 (13.04.2019)
* (Stübi) Add device outside alarm
* (Stübi) Add device inside alarm
* (Stübi) Add device PIR motions sensor V2
* (Stübi) Add device glass sensor

### 1.1.3 (10.04.2019)
* (Stübi) New Logo
* (Stübi) Add device Panic Button
* (Stübi) Add status indicator 
* (Stübi) Add sensor Heat detector
* (Stübi) Add shock sensor 
* (Stübi) Add Light Switch V2
 
### 1.1.2 (06.04.2019)
* (Stübi) Add light sensor 
* (Stübi) Add CO sensor
* (Stübi) Add water sensor V2
* (Stübi) Add Radiator thermostat V2
* (Stübi) Add 1 channel relay with ZigBee repeater (Type 24)
* (Stübi) Add 2 channel relay with ZigBee repeater (Type 24)
* (Stübi) If you change the sensor name in the Lupusec App, it will be change in ioBroker too 
* (Stübi) Bugfixing Radiator thermostat V1/V2
* (Stübi) Bugfixing Dimmer
* (Stübi) Bugfixing PD Status (Timer) for relay, power switch
* (Stübi) Bugfixing status switch for rollter/shutter device

### 1.1.1 (27.03.2019)
* (Stübi) Lupusec alarm online status added

### 1.1.0 (23.03.2019)
* (Stübi) Totally redesign of the Lupusec adapter. Node 8 or higher is now required

### 1.0.0 (22.12.2018)
* (Stübi) Support js-controller compact mode
* (Stübi) Changed core adapter
* (Stübi) Add Light sensor (type 78)
* (Stübi) Add Apple home alarm status
* (Stübi) Add dimmer / relais (type 66)
* (Stübi) Bugfixing and new status alarm_ex
* (Stübi) Bugfixing and changing of the polling mechanism
* (Stübi) password will be encrypted. Translation of configuration
* (Stübi) add debug messages
* (Stübi) Hue, room sensor, power switch added
* (Stübi) Fixing error update function
* (Stübi) Improvements and new add/del/update Object function
* (Stübi) Changes of roles and icons added to devices
* (Stübi) Wrong device description removed
* (Stübi) RSSI Status an Device shutter (type 76) supported
* (Stübi) Devices thermostat (type 79) and switch (type 48) supported
* (Stübi) Directory widged deleted
* (Stübi) Port can be added

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Thorsten Stueben <thorsten@stueben.de>

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