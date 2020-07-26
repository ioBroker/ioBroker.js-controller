---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nuki/README.md
title: ioBroker.nuki
hash: 0NwI4F2l9JM+WLttJWlD5gTrvhhGycNLkvJzpvrV7So=
---
![Logo](../../../en/adapterref/iobroker.nuki/admin/nuki-logo.png)

![Anzahl der Installationen](http://iobroker.live/badges/nuki-installed.svg)
![Stabile Version](http://iobroker.live/badges/nuki-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.nuki.svg)
![Commits seit der letzten Veröffentlichung](https://img.shields.io/github/commits-since/smaragdschlange/ioBroker.nuki/latest.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.nuki.svg)
![NPM](https://nodei.co/npm/iobroker.nuki.png?downloads=true)

# IoBroker.nuki [![Travis CI] (https://travis-ci.com/smaragdschlange/ioBroker.nuki.svg?branch=master)](https://travis-ci.com/smaragdschlange/ioBroker.nuki)
Dieser ioBroker-Adapter ermöglicht die Steuerung und Überwachung der [Nuki Smart Lock](https://nuki.io/de/) mithilfe der API der Nuki Bridge.

## Bedarf
* Eine Nuki-Brücke (Hardware oder Software).
* Ein Nuki Smart Lock und / oder ein Nuki Opener.
* Eine laufende Instanz von ioBroker.

## Verwendung
Jede Instanz des Nuki-Adapters repräsentiert eine Nuki-Brücke. Geben Sie beim Erstellen einer Instanz einfach die IP-Adresse, den Port und das Token Ihrer Nuki-Bridge ein. Der Name ist optional und wird automatisch generiert, wenn er leer gelassen wird. Das Kontrollkästchen "Rückruf verwenden" und der Wert "Rückrufport in ioBroker" sind optional und können gesetzt werden, um die Rückruffunktion des Nuki zu nutzen. Nach dem Speichern einer Instanz wird für jedes Nuki-Schloss, das mit der angegebenen Nuki-Brücke verbunden ist, ein Bridge-Gerät mit einem Kanal erstellt. Die Kanäle liefern den aktuellen Status der Nuki-Sperre als Ausgabeparameter:

* Batteriekritisch: Anzeige für schwache Batterie
* deviceType: Typ des Nuki-Geräts (Smart Lock oder Opener)
* Modus: Betriebsmodus des Nuki-Geräts
* doorState: Aktueller (numerischer) Türsensorstatus (Nuki native)
* lockState: Zeigt an, ob Nuki gesperrt ist (nur Nuki Smart Lock)
* state: Aktueller (numerischer) Sperrstatus (Nuki native)
* Zeitstempel: Zuletzt aktualisiert

Zusätzlich bieten die Kanäle Eingangsparameter, die eine grundlegende Steuerung des Nuki-Schlosses ermöglichen:

* action: Numerischer Aktionscode zum Einstellen des Nuki-Status (Nuki native)

Gültige Eingabewerte für Sperren sind:

0 (keine Aktion) 1 (Entsperren) 2 (Sperren) 3 (Entriegeln) 4 (Sperren 'n' go) 5 (Sperren 'n' gehen mit Entriegeln)

* lockAction: Schalter zum Sperren / Entsperren des Nuki (true = entsperren; false = sperren)
* openAction: Taste zum Entriegeln des Nuki
* openLocknGoAction: Taste zum Entriegeln und nach einigen Sekunden zum Sperren des Nuki
* refreshLocknGoAction: Taste zum Entsperren und nach einigen Sekunden zum Sperren des Nuki

Gültige Eingabewerte für Opener sind:

0 (keine Aktion) 1 (rto aktivieren) 2 (rto deaktivieren) 3 (elektrische Schlagbetätigung) 4 (kontinuierlichen Modus aktivieren) 5 (kontinuierlichen Modus deaktivieren)

* rtoAction: Schalter zum Aktivieren / Deaktivieren der Funktion Ring to Open (true = aktivieren; false = deaktivieren)
* openAction: Taste zur elektrischen Schlagbetätigung
* cmActiveAction: Schaltfläche zum Aktivieren des kontinuierlichen Modus
* cmDeactiveAction: Schaltfläche zum Deaktivieren des kontinuierlichen Modus

## Zusätzliche Information
So erhalten Sie Ihren Bridge-Token:

* Rufen Sie http:// <bridge_ip>: <bridge_port> / auth in einem beliebigen Browser in Ihrem LAN auf -> Bridge leuchtet die LED
* Drücken Sie innerhalb von 30 Sekunden die Taste der Brücke
* Das Ergebnis des Browseraufrufs sollte ungefähr so aussehen:

{"token": "token123", "success": true} Rückruffunktion:

Wenn die Rückruffunktion verwendet wird, versucht der Adapter, den Rückruf automatisch auf der Nuki-Brücke festzulegen, wenn die Instanz gespeichert wird. Wenn die Instanz entladen wird, wird der Rückruf erneut gelöscht. Alle Nuki-Zustände werden von der Nuki-Brücke auf dem neuesten Stand gehalten, während der Rückruf aktiviert ist.
Rückrufe können in jedem Browser mit folgenden URLs festgelegt und entfernt werden:

Einstellen:

* http:// <bridge_ip>: <bridge_port> / callback / add? url = http% 3A% 2F% 2F <host_ip>% 3A <host_port>% 2Fapi% 2Fnuki & token = <bridgeToken>

Entfernen:

* http:// <bridge_ip>: <bridge_port> / callback / remove? id = <Rückruf-ID> & token = <bridgeToken>

## Update
Bei einem Update von 1.0.x auf 1.1.0 oder höher wird empfohlen, alle Instanzen der alten Version zu löschen, bevor Sie die neue Version installieren. Bitte beachten Sie, dass Versionsänderungen, die größer als auf Patch-Ebene sind (-> Änderung nur der letzten Ziffer), immer Änderungen an Datenpunkten enthalten können, z. 1.1.2 bis 1.1.4

## Changelog

### 1.3.0
* (smaragdschlange) improvement: support of doorsensor states

### 1.2.3
* (smaragdschlange) bug fix: convert to template strings

### 1.2.2
* (smaragdschlange) bug fix: get device type by state name when not provided by bridge (software bridge)

### 1.2.0
* (smaragdschlange) improvement: support of hashed token (set to standard)
* (smaragdschlange) improvement: better use of delay before requests in order to prevent null messages

### 1.1.5
* (smaragdschlange) bug fix: clear all timeouts on unload

### 1.1.4
* (smaragdschlange) bug fix: object was not defined

### 1.1.3
* (smaragdschlange) bug fix: deviceType was undefined in case of Opener
* (smaragdschlange) bug fix: Opener action was not set

### 1.1.2
* (smaragdschlange) improvement: added bridge type as object
* (smaragdschlange) bug fix: force reset deviceType on adapter restart

### 1.1.1
* (smaragdschlange) bug fix: default to Nuki Lock when deviceType unknown

### 1.1.0
* (smaragdschlange) improvement: support for Nuki Opener

### 1.0.7
* (smaragdschlange) bug fix: impact on other Nuki-connected gateways

### 1.0.6
* (smaragdschlange) dependencies update

### 1.0.5
* (ldittmar81) add gulp auto translation
* (smaragdschlange) add license

### 1.0.4
* (smaragdschlange) improvement: added Support for Compact mode (js-Controller 2.0 Feature)

### 1.0.3
* (smaragdschlange) bug fix: action buttons were not working properly

### 1.0.1
* (smaragdschlange) version synch

### 1.0.0
* (smaragdschlange) initial release on npm

### 0.2.0
* (smaragdschlange) periodic state updates added
* (smaragdschlange) restructure objects

### 0.1.3
* (smaragdschlange) timestamp bug fixed

### 0.1.2
* (smaragdschlange) minor bugfixes
* (smaragdschlange) added delay before each Nuki request to avoid null responses

### 0.1.1
* (smaragdschlange) callback will be removed when instance is unloading

### 0.1.0
* (smaragdschlange) callback finally working
* (smaragdschlange) added another State

### 0.0.6
* (smaragdschlange) additional states/actions and improved compatibility (callback still not completely working)

### 0.0.5
* (smaragdschlange) added support for nuki bridge callback (web server still to be added)

### 0.0.4
* (smaragdschlange) added input parameter for lock actions

### 0.0.3
* (smaragdschlange) bug fixes and restructure

### 0.0.2
* (smaragdschlange) added input parameters

### 0.0.1
* (smaragdschlange) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2020 Smaragdschlange <smaragdschlange@gmx.de>

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