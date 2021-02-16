---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lupusec/README.md
title: ioBroker.lupusec
hash: K0k5vvfJi3TuR4x+nkQ70nYeefXX626FHzYCnBXV/fg=
---
![Logo](../../../en/adapterref/iobroker.lupusec/admin/lupusec.png)

![Travis Build Status](https://travis-ci.org/schmupu/ioBroker.lupusec.svg?branch=master)
![AppVeyor-Build-Status](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.lupusec?branch=master&svg=true)
![Stabile Version](http://iobroker.live/badges/lupusec-stable.svg)
![Anzahl der Installationen](http://iobroker.live/badges/lupusec-installed.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.lupusec.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lupusec.svg)
![NPM](https://nodei.co/npm/iobroker.lupusec.png?downloads=true)

# IoBroker.lupusec
** Benötigt node.js 10.0 oder höher und Admin v3! **

Dieser Adapter verbindet das Lupusec-Alarmsystem XT1 Plus, XT2, XT2 Plus und XT3 mit ioBroker.
Der XT1 (ohne Plus) wird nicht unterstützt. Sie können den Status der Lupusec-Sensoren wie Tür, Fenster, Wasser, Rauchsensoren und den Status des Alarmsystems ablesen.
Sie können beispielsweise Schalter einschalten, den Verschluss steuern und das Alarmsystem aktivieren / deaktivieren.

Detaillierte Informationen finden Sie hier: [Lupus](https://www.lupus-electronics.de/en)

## Installation
1. Installieren Sie den Adapter

Am einfachsten ist es, den Adapter lupusec.iobroker über den Erkennungsadapter in ioBroker zu konfigurieren. Der Erkennungsadapter sucht nach der richtigen IP-Adresse des Lupusec-Alarmsystems. Der andere Weg ist es, es manuell zu konfigurieren

2. Manuelle Konfiguration des Adapters

Wählen Sie die IP-Adresse oder den Hostnamen aus dem Lupusec-Alarmsystem. Wählen Sie nach Möglichkeit https (empfohlen).
Um nur den Status zu lesen, wählen Sie einen Benutzer ohne Schreibzugriff aus. Wenn Sie den Status ändern möchten (z. B. das Licht ein- / ausschalten oder den Alarm aktivieren / deaktivieren möchten), wählen Sie einen Benutzer mit Schreibzugriff aus.
![admin_main](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin.png) Wenn Sie Überwachungskameras an Ihr Lupusec-Alarmsystem angeschlossen haben, können Sie diese in ioBroker bereitstellen. Der Lupusec-Adapter findet alle Lupusec-Kameras selbst. Sie müssen eine Adresse (Ihre ioBroker IP-Adresse oder 0.0.0.0) und einen Port eingeben, um später eine Verbindung zu den Cams herstellen zu können.
![admin_webcam](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin_webcam.png) Wenn Sie Ihren Nuki-Türöffner an Ihr Lupusec-Alarmsystem angeschlossen haben, können Sie ihn auch von ioBroker aus verwenden. Im Administratormenü der ioBroker-Instanz können Sie Ihren Lupusec-Türsensor eingeben, der an der Nuki-Tür angebracht ist. Wenn Sie jetzt die Tür öffnen, an der der Nuki montiert ist, haben Sie den zusätzlichen Status "Tür geöffnet" statt nur "entriegelt". Wenn Sie keinen Lupusec-Türsensor an der Nuki-Tür haben, sehen Sie nur die Zustände "gesperrt" oder "gesperrt".
![admin_nuki](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin_nuki.png)

Standardmäßig werden alle Lupusec-Geräte auf der Registerkarte ioBroker-Objekt angezeigt.
Voll unterstützt und individuell angepasst sind folgende Geräte:

  - Türkontakt / Fensterkontakt (Typ 4)
  - Wassersensor (Typ 5)
  - Panikknopf (Typ 7)
  - Bewegungsmelder / 360-Grad-Bewegungsmelder (Typ 9)
  - CO-Sensor (Typ 13)
  - Rauchmelder / Wärmemelder (Typ 14)
  - Temperatursensor V2 (Typ 20)
  - Sirene innen (Typ 21)
  - Statusanzeige / Mini-Innensirene (Typ 22)
  - Netzschalter (Typ 24)
  - 1-Kanal-Relais mit ZigBee-Repeater (Typ 24)
  - 2-Kanal-Relais mit ZigBee-Repeater (Typ 24)
  - Repater V2 (Typ 26)
  - Tastatur (Typ 37)
  - Glassensor (Typ 39)
  - Sirene innen (Typ 45)
  - Sirene draußen (Typ 48)
  - Leistungsschalter (Typ 48)
  - Stromzähler (Typ 50)
  - Universeller IR-Controller (Typ 52)
  - Raumsensor V1 (Typ 54)
  - LCD-Temperatursensor (Typ 54)
  - Minitemperatur (Typ 54)
  - Nuki Türöffner (Typ 57)
  - Wärmemelder (Typ 58)
  - Dimmer (Typ 66)
  - Lichtschalter V2 (Typ 66)
  - Farbton (Typ 74)
  - Rollladenrelais V1 (Typ 76)
  - Kühlerthermostat (Typ 79)
  - Kühlerthermostat V2 (Typ 79)
  - Lichtsensor (Typ 78)
  - Szenarioschalter V2 (Typ 81)
  - Stoßsensor (Typ 93)
  - Rauchmelder V2 (Typ 14)
  - Inwall Relais mit Dimmer V3 (Typ 66)

Die beiden Zustände apple_home_a1 und lupusec.0.status.apple_home_a2 für den Apple Homekit-Adapter yahka werden unterstützt. Sie können zusätzlich zu den Lupusec-Zuständen das Alarmsystem für die Bereiche 1 und 2 ein- und ausschalten.

Wenn Sie ein Gerät besitzen, das nicht in der obigen Liste aufgeführt ist, kontaktieren Sie mich bitte unter Thorsten Stueben <thorsten@stueben.de>.

## Objekte
### Lupusec Status
ioBroker bietet Ihnen dieselben Statusobjekte wie in der Lupusec-App.
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_status.png)

### Lupusec-Geräte
Alle unterstützten Lupsec-Sensoren und -Geräte finden Sie unter "Geräte". Wenn ein Gerät fehlt, kontaktieren Sie mich bitte.
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_devices.png) Detailansicht eines Sensors oder Geräts. In diesem Beispiel sehen Sie den CO-Sensor. Bei einem CO-Alarm ändert sich der Status 'alarm_status_ex' in true und der Status 'alarm_status' in 'CO'.
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_devices_type09.png)

### Lupusec Webcams
Sie finden alle angeschlossenen Überwachungskameras unter "Webcams". Sie können den im Status "Bild" und "Stream" angegebenen Link zum Öffnen in Ihren Webbrowser kopieren.
![lupusec_obj_webcam](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_webcam.png)

### Lupusec Nuki
Sie finden Ihren Nuki-Türöffner unter "Geräten" wie den Lupusec-Geräten. Der Nuki bietet 2 Staaten. Der Status nuki_state zeigt Ihnen den tatsächlichen Status des Nuki-Türöffners an, wenn die Tür verriegelt oder entriegelt ist. Mit dem Status nuki_action können Sie Ihre Tür öffnen, verriegeln oder entriegeln.
![lupusec_obj_nuki](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_nuki.png)

### Lupusec SMS
Wenn Sie den Lupusec XT1 +, XT2 + oder XT3 mit einer SMS-SIM-Karte verwenden, können Sie SMS mit folgenden Zuständen senden: ![lupusec_obj_sms](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_sms.png)

Alternativ können Sie SMS von Ihrem JavaScript mit folgendem Befehl senden:

```
sendTo('lupusec.0', 'sms', { number: '017247114711', text: 'Test message' });
```

## Fehlerbehebung
Wenn Sie den Lupusec-Adapter starten und die Fehlermeldung erhalten, dass das Alarmsystem nicht erreichbar ist, versuchen Sie bitte, das System über ein Terminalfenster Ihres ioBroker-Systems zu pingen.

```
ssh <user>@<iobroker-ip-address>
sudo -u iobroker ping <lupsec-ip-address>
```

Wenn die Fehlermeldung _ping: icmp open socket: Operation nicht zulässig_ angezeigt wird, gehen Sie bitte wie folgt vor und starten Sie anschließend den Lupusec-Adapter erneut.

```
ls -l `which ping`
sudo chmod u+s `which ping`
```

## Geplant
Folgende Dinge sind für die Zukunft geplant:

* Unterstützung für mehr Sensoren / Geräte
* Schreiben einer Dokumentation für jeden Sensor / jedes Gerät

## Changelog

### 1.3.2-beta-2 (14.02.2021)
* (Stübi) Send SMS if you are using a sim card

### 1.3.1 (07.02.2021)
* (Stübi) Add universal IR controller (type 52)

### 1.3.0 (03.10.2020)
* (Stübi) Reduce CPU Load
* (Stübi) Add local link to alarm system
* (Stübi) Bugfixing Issue #27 - bypass

### 1.2.9 (04.07.2020)
* (Stübi) Bugfixing

### 1.2.8 (10.06.2020)
* (Stübi) Add sentry mode
* (Stübi) Now you can hold the reason for the alarm in alarm_status and alarm_status till the alarm ends

### 1.2.7 (25.05.2020)
* (Stübi) Add token renew time to expert mode

### 1.2.6 (02.05.2020)
* (Stübi) Change logic to get faster sensor states
* (Stübi) Node 10 recommended 
* (Stübi) Add old Light sensor (type 78)

### 1.2.5 (21.01.2019)
* (Stübi) Change logic to get faster sensor states

### 1.2.4 (09.01.2019)
* (Stübi) Add device: temperature sensor v2

### 1.2.3 (06.09.2019)
* (Stübi) Add device: Repeater V2
* (Stübi) Add device: Siren inside (Battery version without Zigbee repeater)

### 1.2.1 (14.10.2019)
* (Stübi) Bugfixing (Issue #9)
* (Stübi) Bugfixing: if the name of a device is empty, the name was changed all the time between NaN and ''  

### 1.2.0 (13.09.2019)
* (Stübi) Changing error handling of adapter
* (Stübi) Add Nuki door opener

### 1.1.9 (06.09.2019)
* (Stübi) Add device: Smoke detector V2
* (Stübi) Add device: Inwall relay with dimmer V3

### 1.1.8 (10.06.2019)
* (Stübi) Add device: 360 PIR motion sensor
* (Stübi) Add device: electric meter
* (Stübi) Add device: LCD temperature sensor
* (Stübi) Add device: mini temperature sensor

### 1.1.7 (06.05.2019)
* (Stübi) Enhancement: optimizing webcam support

### 1.1.6 (01.05.2019)
* (Stübi) New feature: you can change the buttons for keypad
* (Stübi) New feature: add push notifications to sensors
* (Stübi) New feature: change switch from switch to push button 
* (Stübi) New feature: now you can change status for tamper, bypass and reporting for sensors
* (Stübi) New feature: Webcam support. You can get the link of Lupusec provided webcams.
* (Stübi) New feature: you can edit the on/off timer for shutters 
* (Stübi) New feature: Discription of states are now in English or German available
* (Stübi) Bugfixing: HUE and saturation of HUE devices fixed 
* (Stübi) Bugfixing: Add role to button 4 of scenario switch.  

### 1.1.5 (24.04.2019)
* (Stübi) New feature: Add buttons for Scenario Switch V2
* (Stübi) Bugfixing: Various improvements

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

Copyright (c) 2019-2020 Thorsten Stueben <thorsten@stueben.de>

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