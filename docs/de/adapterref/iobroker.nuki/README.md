---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nuki/README.md
title: ioBroker.nuki
hash: UvnJYD84v5/tnMP91+G2jJw4UrQJ5eWwfjmx1JMSXas=
---
![Logo](../../../en/adapterref/iobroker.nuki/admin/nuki-logo.png)

![Anzahl der Installationen](http://iobroker.live/badges/nuki-stable.svg)

# IoBroker.nuki
Dieser ioBroker-Adapter ermöglicht die Steuerung und Überwachung der [Nuki Smart Lock](https://nuki.io/de/) mithilfe der API der Nuki Bridge.

## Bedarf
* Ein Nuki Smart Lock (offensichtlich) und eine Nuki-Brücke (Hardware oder Software).
* Eine laufende Instanz von ioBroker.

## Verwendungszweck
Jede Instanz des Nuki-Adapters repräsentiert eine Nuki-Brücke. Geben Sie beim Erstellen einer Instanz einfach die IP-Adresse, den Port und das Token Ihrer Nuki Bridge ein. Der Name ist optional und wird automatisch generiert, wenn er leer bleibt. Die Checkbox "use callback" und der Wert "callback port in ioBroker" sind optional und können gesetzt werden, um die Callback-Funktion des Nuki zu nutzen. Nach dem Speichern einer Instanz wird ein Brückengerät mit einem Kanal für jedes Nuki-Schloss erstellt, das mit der angegebenen Nuki-Brücke verbunden ist. Die Kanäle geben den aktuellen Status der Nuki-Sperre als Ausgangsparameter an:

* batteryCritical: Anzeige für schwache Batterie
* lockState: Anzeige, ob Nuki gesperrt ist
* state: Aktueller (numerischer) Sperrstatus (Nuki native)
* Zeitstempel: Zuletzt aktualisiert

Zusätzlich bieten die Kanäle Eingangsparameter, die eine grundlegende Steuerung des Nuki-Schlosses ermöglichen:

* Aktion: Numerischer Aktionscode zum Einstellen des Nuki-Status (Nuki native)

Gültige Eingabewerte sind:

0 (keine Aktion) 1 (Entsperren) 2 (Sperren) 3 (Entriegeln) 4 (Sperren von "n" gehen) 5 (Sperren von "n" gehen mit Entriegeln)

* lockAction: Schalter zum Sperren / Entsperren des Nuki (true = unlock; false = lock)
* openAction: Button zum Entriegeln des Nuki
* openLocknGoAction: Taste zum Entriegeln und nach einigen Sekunden zum Sperren des Nuki
* unlockLocknGoAction: Taste zum Entsperren und nach einigen Sekunden zum Sperren des Nuki

## Zusätzliche Information
So erhalten Sie Ihre Brückenmarkierung:

* Rufen Sie http:// <bridge_ip>: <bridge_port> / auth von einem beliebigen Browser in Ihrem LAN auf -> Bridge leuchtet seine LED
* Drücken Sie innerhalb von 30 Sekunden die Taste der Brücke
* Das Ergebnis des Browseraufrufs sollte folgendermaßen aussehen:

{"token": "token123", "success": true} Rückruffunktion:

Wenn die Callback-Funktion verwendet wird, versucht der Adapter, den Callback auf der Nuki-Bridge automatisch festzulegen, wenn die Instanz gespeichert wird. Wenn die Instanz entladen ist, wird der Callback wieder gelöscht. Alle Nuki-Staaten werden von der Nuki-Brücke auf dem neuesten Stand gehalten, wenn der Rückruf aktiviert ist.
Rückrufe können in jedem Browser mit folgenden URLs festgelegt und entfernt werden:

Einstellen:

* http:// <bridge_ip>: <bridge_port> / callback / add? url = http% 3A% 2F% 2F <host_ip>% 3A <host_port>% 2Fapi% 2Fnuki & token = <bridgeToken>

Löschen:

* http:// <bridge_ip>: <bridge_port> / callback / remove? id = <callback_id> & token = <bridgeToken>

## Update
Bei einem Update von 0.1.x auf 0.2.0 oder höher wird empfohlen, vor der Installation der neuen Version alle Instanzen der alten Version zu löschen. Bitte beachten Sie, dass größere Versionsänderungen als auf Patch-Ebene (-> Änderung nur der letzten Ziffer) immer Änderungen an Datenpunkten enthalten können, z. 0,1,3 bis 0,2,0

## Changelog

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

Copyright (c) 2018-2019 Smaragdschlange <smaragdschlange@gmx.de>

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