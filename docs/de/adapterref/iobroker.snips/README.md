---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.snips/README.md
title: ioBroker.snips
hash: GwiKNGZb+RqS8FxuI7LgbvEMNXHAc4yM8IBhetYQbHE=
---
![Logo](../../../en/adapterref/iobroker.snips/admin/snips.png)

![Build-Status](https://travis-ci.org/Bettman66/ioBroker.snips.svg?branch=master)
![Anzahl der Installationen](http://iobroker.live/badges/snips-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.snips.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.snips.svg)
![NPM](https://nodei.co/npm/iobroker.snips.png?downloads=true)

# IoBroker.snips ===================
Benötigt node.js 6.0 oder höher und Admin v3!

Der Adapter kommuniziert mit Snips-Hardware über MQTT. Der text2-Befehlsadapter ist zum Ausführen der Befehle erforderlich.

Snips-URL: https://makers.snips.ai/

## Installationsschnipsel
Für Snips unter Debian Stretch (x86), Raspbian / Armbian Stretch (RPI3, Odroid) installieren Sie bitte die folgenden Pakete:

lsb-release apt-transport-https ca-zertifikate systemd-sysv libttspico-utils alsa-utils dirmngr mosquitto snips-asr snips-audio-server snips-dialog-hotword-snips-snips-tts-snips-injection

Abhängig von Ihrer Hardware- und Linux-Distribution haben Sie möglicherweise bereits Pakete installiert.

Installationsanweisungen und Konfiguration für Raspian / Armbian: https://snips.gitbook.io/documentation/installing-snips/on-a-raspberry-pi

Installationsanweisungen und Konfiguration für Debian: sudo nano /etc/apt/sources.list Fügen Sie in jeder Zeile "non-free" an. Andernfalls können Sie das Paket "libttspico-utils" nicht installieren.
https://snips.gitbook.io/documentation/advanced-configuration/advanced-solutions

Melden Sie sich bei https://console.snips.ai an und fügen Sie einen neuen Assistenten hinzu.
Fügen Sie eine App hinzu, über dem Häkchen "Nur Apps mit Aktionen anzeigen" und suchen Sie nach "iobroker" ![ioBroker Snips-App-Logo](https://console.snips.ai/images/bundles/bundle-home.svg) und wählen Sie.
Wenn Sie fertig sind, drücken Sie auf Bereitstellungsassistent, um die ZIP-Datei herunterzuladen.
Die zip-Datei wird auf der Snips-Maschine unter "/ usr / share / snips" entpackt und anschließend neu gestartet.

Snips sollten funktionieren, bevor wir hier fortfahren:

### Konfigurieren Sie den Snips Adapter
URL: Adresse des Snips-MQTT-Servers Port: Port der Snips-MQTT-Server Instanz: Text2Command-Instanz (zum Beispiel 0) Filter: zum Beispiel ClientID: ID verstehen (zum Beispiel 0)

### Konfigurieren Sie den Text2Command-Adapter
Fügen Sie in der Konfiguration des Text2Command-Adapters unter Antwort in ID snips.X.devices.all.send.say.text ein.

### Injektion (neue Wörter lernen)
Unbekannte Wörter können unter snips.0.send.inject.room oder dem Gerät gelernt werden.
ACHTUNG: Der Injection-Dienst muss auf dem Gerät / Server installiert sein. Sudo apt-get install -y snips-injection

## Changelog
### 1.1.1
* (apollon77) Update CI testing

### 1.1.0
* (unltdnetworx) support for satellites

### 1.0.1
* (wal) bugfix memoryleak

### 1.0.0
* (wal) stable version

### 0.3.1
* (unltdnetworx) bugfix for not recognized slots

### 0.3.0
* (unltdnetworx) slots reduced to two

### 0.2.2
* (unltdnetworx) slot setBoolean changed to setDevice

### 0.2.1
* (unltdnetworx) slot-type names converted to singular

### 0.2.0
* (unltdnetworx) support for compact-mode added

### 0.1.1
* (unltdnetworx) 2 new slots added incl. injection

### 0.1.0
* (wal) add soundfeedback

### 0.0.9
* (unltdnetworx) testadapter and slots added

### 0.0.8
* (wal) adaptation for new snips version

### 0.0.7
* (wal) file corrupt

### 0.0.6
* (wal) add receive.text

### 0.0.5
* (wal) bugfix injection

### 0.0.4
* (wal) add hotword recognize

### 0.0.3
* (wal) add filter and text2command_Instanz

### 0.0.2
* (wal) first working adapter

### 0.0.1
* (wal) initial release

## License
The MIT License (MIT)

Copyright (c) 2018 Walter Zengel <w.zengel@gmx.de>

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