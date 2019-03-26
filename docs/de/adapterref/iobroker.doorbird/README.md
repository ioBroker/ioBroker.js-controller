---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.doorbird/README.md
title: ioBroker.doorbird
hash: KLXkPpXCzSL1sB94eu10raL+yR5J/hZVkNu/cnHEuxc=
---
![Logo](../../../en/adapterref/iobroker.doorbird/admin/doorbird.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.doorbird.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.doorbird.svg)
![Tests](https://travis-ci.org/BuZZy1337/ioBroker.doorbird.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.doorbird.png?downloads=true)

# IoBroker.doorbird ===================
## Aufbau
1. Geben Sie die IP-Adresse ein, auf der der Adapter Ereignisse vom Doorbird-Gerät abhören soll.

(Dies ist normalerweise die IP Ihres ioBroker-Hosts).
Der Adapter versucht, das Feld mit der richtigen IP für Sie vorzufüllen. Wenn die vorab ausgefüllte IP-Adresse nicht die IP-Adresse Ihres ioBroker-Hosts ist, ändern Sie sie in die richtige IP-Adresse.

2. Der Port ist als `` 8100``` vordefiniert. Sie können es ändern, wenn der Port bereits von einem anderen Dienst verwendet wird.

Versuchen Sie einfach, den Adapter mit diesem Port auszuführen. Wenn der Port nicht verfügbar ist, wird beim Starten des Adapters eine Fehlermeldung angezeigt. Dann geh einfach zurück und wechsle den Hafen.

3. Geben Sie die IP Ihres Doorbird-Geräts ein. Sie können auf das "Suchsymbol" links neben dem Eingabefeld klicken. Nachdem Sie auf das Symbol geklickt haben, wird eine Meldung oben auf dem Konfigurationsbildschirm angezeigt. Jetzt haben Sie 60 Sekunden, um den Klingelknopf an Ihrem Doorbird-Gerät zu drücken. Der Adapter versucht, die IP-Adresse zu ermitteln und alle Felder für Sie auszufüllen.
4. Die Geräte-ID (NICHT IP!) Ihres Doorbird.
5. Der Benutzername, für den die API-Berechtigung für das Doorbird-Gerät erforderlich ist.
6. Das in Feld 5 eingegebene Passwort für den Benutzernamen.

![Bildschirmfoto](../../../en/adapterref/iobroker.doorbird/img/configscreen.png)

Nachdem Sie alle erforderlichen Informationen in den Konfigurationsdialog eingegeben haben, klicken Sie auf "Speichern & Schließen".
Der Adapter sollte jetzt neu starten und Sie können loslegen!

## Changelog
### 0.1.5 (2018-09-18)
* (BuZZy1337) Check response of Doorbird when triggering relays
* (BuZZy1337) Check if any favorite has to be updated (For example when adapteraddress or port changes)
* (BuZZy1337) Added state for restarting DoorBird Device (There is a bug in DoorBird Firmware .. DoorBird will fix it with next FW Update!)
* (BuZZy1337) Change some Code for working more with responses from DoorBird

### 0.1.0 (2018-09-08)
* (BuZZy1337) "public release"
* (BuZZy1337) Changed Adapteraddress option from dropdown list to inputfield
* (BuZZy1337) Added Support for triggering Doorbird-Relays

### 0.0.4
* (BuZZy1337) DO A COMPLETE REINSTALL OF THE ADAPTER (DELTE AND INSTALL THE ADAPTER AGAIN!)
DELETE ALL IOBROKER SCHEDULES AND THEN ALL IOBROKER FAVORITES IN YOUR DOORBIRD APP BEFORE STARTING 0.0.4!
* (BuZZy1337) Added support for more then one Doorbell Button
* (BuZZy1337) Encrypted saving of Doorbird Password
* (BuZZy1337) Detect and create Favorites & Schedules on the Doorbird Device.
* There is a Bug in the Doorbird Firmware for the Motion schedule! You can delete and set the Schedule for the Motionsensor in the App - thats a workaround for now.

### 0.0.3
* (BuZZy1337) Added possibility to choose the AdapterIP Address

### 0.0.2
* (BuZZy1337) Just added the info that the Adapter is not ready yet .. just to be sure! ;)

### 0.0.1
* (BuZZy1337) initial release

## License
The MIT License (MIT)

Copyright (c) 2018 BuZZy1337 <buzzy1337@outlook.de>

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