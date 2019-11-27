---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nuki/README.md
title: ioBroker.nuki
hash: IFCxG7+BEae80E0Z4nCOc2h/bFT1gpT77yBDwio7Akg=
---
![Logo](../../../en/adapterref/iobroker.nuki/admin/nuki-logo.png)

![Anzahl der Installationen](http://iobroker.live/badges/nuki-stable.svg)

# IoBroker.nuki
Dieser ioBroker-Adapter ermöglicht die Steuerung und Überwachung der [Nuki Smart Lock](https://nuki.io/de/) über die API der Nuki Bridge.

## Bedarf
* Ein Nuki Smart Lock (offensichtlich) und eine Nuki-Brücke (Hardware oder Software).
* Eine laufende Instanz von ioBroker.

## Verwendungszweck
Jede Instanz des Nuki-Adapters repräsentiert eine Nuki-Bridge. Geben Sie beim Erstellen einer Instanz einfach IP-Adresse, Port und Token Ihrer Nuki-Bridge ein. Der Name ist optional und wird automatisch generiert, wenn er leer gelassen wird. Die Checkbox "Callback verwenden" und der Wert "Callback-Port in ioBroker" sind optional und können gesetzt werden, um die Callback-Funktion des Nuki zu nutzen. Nach dem Speichern einer Instanz wird für jedes Nuki-Schloss ein Brückengerät mit einem Kanal erstellt, das mit der angegebenen Nuki-Brücke verbunden ist. Die Kanäle liefern den aktuellen Status der Nuki-Sperre als Ausgabeparameter:

* batteryCritical: Anzeige für schwache Batterie
* lockState: Zeigt an, ob Nuki gesperrt ist (nur Nuki Lock)
* state: Aktueller (numerischer) Sperrstatus (Nuki native)
* Zeitstempel: Zuletzt aktualisiert

Zusätzlich bieten die Kanäle Eingangsparameter, die die grundlegende Steuerung des Nuki-Schlosses ermöglichen:

* action: Numerischer Aktionscode zum Festlegen des Nuki-Status (Nuki native)

Gültige Eingabewerte für Sperren sind:

0 (keine Aktion) 1 (Entsperren) 2 (Sperren) 3 (Entriegeln) 4 (Sperren und Loslassen) 5 (Sperren und Loslassen mit Entriegeln)

* lockAction: Schalter zum Sperren / Entsperren des Nuki (true = entsperren; false = sperren)
* openAction: Taste zum Entriegeln des Nuki
* openLocknGoAction: Knopf zum Entriegeln und nach einigen Sekunden zum Verriegeln des Nuki
* unlockLocknGoAction: Taste zum Entsperren und nach einigen Sekunden zum Sperren des Nuki

Gültige Eingabewerte für Öffner sind:

0 (keine Aktion) 1 (aktiviere rto) 2 (deaktiviere rto) 3 (elektrische Schlagbetätigung) 4 (aktiviere kontinuierlichen Modus) 5 (deaktiviere kontinuierlichen Modus)

* rtoAction: Schalter zum Aktivieren / Deaktivieren der Ring-to-Open-Funktion (true = aktivieren; false = deaktivieren)
* openAction: Taste zur Betätigung eines elektrischen Schlaggeräts
* cmActiveAction: Schaltfläche zum Aktivieren des kontinuierlichen Modus
* cmDeactiveAction: Schaltfläche zum Deaktivieren des kontinuierlichen Modus

## Zusätzliche Information
So bekommen Sie Ihren Brücken-Token:

* Rufen Sie http:// <bridge_ip>: <bridge_port> / auth in einem beliebigen Browser in Ihrem LAN auf. -> Die Bridge schaltet ihre LED ein
* Drücken Sie den Knopf der Brücke innerhalb von 30 Sekunden
* Das Ergebnis des Browseraufrufs sollte ungefähr so aussehen:

{"token": "token123", "success": true} Rückruffunktion:

Wenn die Rückruffunktion verwendet wird, versucht der Adapter, den Rückruf auf der Nuki-Bridge automatisch festzulegen, wenn die Instanz gespeichert wird. Beim Entladen der Instanz wird der Rückruf wieder gelöscht. Alle Nuki-Zustände werden von der Nuki-Brücke auf dem neuesten Stand gehalten, während der Rückruf aktiviert ist.
Rückrufe können mit folgenden URLs in jedem Browser festgelegt und entfernt werden:

Einstellen:

* http:// <bridge_ip>: <bridge_port> / callback / add? url = http% 3A% 2F% 2F <host_ip>% 3A <host_port>% 2Fapi% 2Fnuki & token = <bridgeToken>

Entfernen:

* http:// <bridge_ip>: <bridge_port> / callback / remove? id = <callback_id> & token = <bridgeToken>

## Update
Bei einem Update von 0.1.x auf 0.2.0 oder höher wird empfohlen, alle Instanzen der alten Version zu löschen, bevor Sie die neue Version installieren. Bitte beachten Sie, dass Versionsänderungen, die größer sind als auf Patch-Ebene (-> Änderung nur der letzten Ziffer), immer Änderungen an Datenpunkten enthalten können, z. 0,1,3 bis 0,2,0

## Changelog

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