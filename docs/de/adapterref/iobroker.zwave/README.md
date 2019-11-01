---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zwave/README.md
title: ioBroker zwave Adapter
hash: CLW9bI1lIyxKiU2eXBY314KMIp5jHUAnDwy7F/Fl8IQ=
---
![Logo](../../../en/adapterref/iobroker.zwave/admin/zwave.png)

![Anzahl der Installationen](http://iobroker.live/badges/zwave-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.zwave.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zwave.svg)
![NPM](https://nodei.co/npm/iobroker.zwave.png?downloads=true)

# IoBroker zwave Adapter
==============

Zwave Unterstützung mit Openzwave.

Für diesen Adapter wird eher ein gut unterstütztes npm-Modul verwendet: https://github.com/OpenZWave/node-openzwave-shared Sie sollten herausfinden, wie der Name USB-Anschluss des Z-Wave-Sticks hat und diesen in den Adaptereinstellungen einrichten.

## Wichtige Informationen
- Beim ersten Start benötigt der Adapter einige Zeit, um alle Objekte in iobroker zu berechnen.
- Wenn Sie ein Gerät hinzufügen, lassen Sie den Adapter die Arbeit erledigen und warten Sie ein wenig.
- Wenn ein Gerät auf der enthaltenen Administrations-Site nicht sichtbar ist, wird es nicht vollständig in ioBroker importiert.

## Installation
Zunächst wird die Implementierung nur unter ARM Linux (z. B. Raspberry Pi (2)) getestet.
Sie benötigen eine vollständige Entwicklungsumgebung (gcc, make, ...)

### Zusätzliche Pakete installieren
Auf einigen Systemen müssen zusätzliche Pakete installiert werden. Führen Sie daher vor der Installation des Adapters Folgendes auf der Konsole aus:

```bash
apt-get install pkg-config libudev-dev build-essential curl unzip
```

### Nur Raspberry Pi3: GPIO UART aktivieren
Auf Raspberry Pi 3 ist der UART standardmäßig vom Bluetooth-Modul belegt. Gehen Sie folgendermaßen vor, um es für die Verwendung mit einem GPIO-Modul zu aktivieren:

1. `sudo nano / boot / cmdline.txt`
1. entfernen Sie `console = serial0,115200`
1. Speichern Sie die Datei und schließen Sie sie

2. `sudo nano / boot / config.txt`

Suchen Sie nach den folgenden Zeilen. Wenn sie mit einem `#` auskommentiert sind, entfernen Sie diesen. Wenn sie nicht vorhanden sind, fügen Sie sie am Ende der Datei hinzu:

* `dtoverlay = pi3-miniuart-bt`
* `enable_uart = 1`
* `force_turbo = 1`

3. neu starten

### Erster Start
Das GPIO-Modul hat normalerweise eine Adresse wie `/dev/ttyAMA0` oder `/dev/ttyACM0`.
Den USB-Stick finden Sie unter `/dev/ttyUSB0` oder `/dev/ttyUSB1`.

- Gehen Sie zu iobroker admin und fügen Sie den Zwave Adapter hinzu (die Installation ist ziemlich lang, haben Sie etwas Geduld)
- Starten Sie die neue zwave Adapter-Instanz und wählen Sie die Adresse des Controller-Geräts aus der Dropdown-Liste in der Admin-Benutzeroberfläche aus.
- Wenn Ihr Gerät nicht erkannt wird, überprüfen Sie es oder versuchen Sie, die Adresse manuell einzugeben, wenn der Adapter ausgeschaltet ist.
- Warten Sie, bis die Anzeige auf der Registerkarte "Instances" grün leuchtet oder die Meldung "zwave.0 Scan completed" im iobroker-Protokoll angezeigt wird.

### Bekannte Probleme
Wenn Sie nach dem Starten des Adapters die folgende (oder eine ähnliche) Fehlermeldung erhalten

```
libopenzwave.so.1.4: cannot open shared object file: No such file or directory
```

Sie können es beheben, indem Sie ausführen

```
sudo ldconfig
```

oder

```
sudo ldconfig /usr/local
```

oder

```
sudo ldconfig /usr/local/lib64
```

Wenn all diese Befehle nicht funktionieren, kann der folgende Prozess ausgeführt werden:

1. `sudo nano / etc / ld.so.conf.d / zwave.conf`
1. Geben Sie `/ usr / local / lib64` ein
1. Verlassen Sie den Editor mit STRG + X und bestätigen Sie mit Y, um die Änderungen zu speichern

1. `sudo ldconfig`

## Aufbau
In den Admin-Einstellungen können Sie folgende Attribute festlegen

- USB-Name (der USB-Port Ihres Z-Wave-Sticks)
- Protokollierung (Protokollierung in OZW_Log.txt aktivieren)
- Konsolenausgabe (Kopierprotokollierung in die Konsole, Protokolliert alle in ioBroker.log)
- Save Config (schreibe ein XML-Netzwerk-Layout und erstelle eine /zwcfg_<HOMEID>.xml unter Linux)
- Treiberversuche (versuchen Sie dies mehrmals, bevor Sie aufgeben)
- Abfrageintervall (Intervall zwischen Abfragen in Millisekunden)
- Aktualisierung unterdrücken (keine Aktualisierungen senden, wenn sich nichts geändert hat)

![Admin-Einstellungen](../../../en/adapterref/iobroker.zwave/img/admin-settings.png)

## Logfiles / Konfigurationseinstellungen
Wenn Sie iobroker in den Standardordner installiert haben:

 - Logdatei: /opt/iobroker/node_modules/iobroker.zwave/node_modules/openzwave-shared/OZW_Log.txt unter Linux
 - Konfiguration: /opt/iobroker/node_modules/iobroker.zwave/node_modules/zwcfg_<HOMEID>.xml unter Linux

## Gerät hinzufügen oder entfernen
Wenn Sie ein Gerät hinzufügen oder entfernen, dauert es 60 Sekunden. Dann wird die Seite automatisch neu geladen.

Wenn Sie den Namen oder den Ort ändern, dauert es 5 Sekunden. Dann wird die Seite automatisch neu geladen.

## Eigenschaften
In OpenZWave Configurator können Sie alle Knoten und ihre Klassen sehen.

Folgende Aktionen werden aktuell unterstützt (nur mit Kontextmenü):

- Legen Sie den Namen und den Ort für den Knoten selbst fest
- Wert einer Klasse ändern

Folgende globale Aktionen werden derzeit unterstützt:

- Knoten hinzufügen
- Knoten entfernen
- Knoten aktualisieren (Knoten aus ioBroker-Kommunikation aktualisieren)

## Machen
### ZWave-spezifisch
- Szenen
- Gruppenmanagement
- Umfrage
- Controller-Befehle
- Konfigurationsbefehle

### Global
- Testen Sie mehr Hardware
- Verschieben Sie die Konfigurations- und Protokolldatei in den Standardpfad von iobroker (/ opt / iobroker / log, / opt / iobroker / data / files / zwave).
- Sprachunterstützung (Englisch, Deutsch, Russisch)

## Getestete Hardware
### ZWave
- USB-Stick ZME_UZB1
- RazBerry GPIO Board für RaspBerry (1/2)

### Fibaro
- Universal-Binärsensor FGBS001
- Doppelrelaisschalter FGS222 2x1,5 kW
- FGWPE-Wandstecker
- Rauchmelder FGSS001
- Bewegungssensor FGMS001
- Doppelschalter FGS-223 2
- FGR-222 Rollladen 2
- FGDW-002 Tür- / Fenstersensor 2

### Danfoss
- Danfoss Living Connect Raumthermostat (Typ 0003, ID 8010)
- Danfoss Z Thermostat 014G0013

## Changelog

### 1.7.0
* (cburghardt) Added multi-instance associations

### 1.6.3
* (cburghardt) Update openzwave version
* (cburghardt) Verify that the correct version of openzwave is installed by checking the manufacturer revision
* (cburghardt) Don't refresh the association menu directly after adding or removing for sleeping devices as it is not updated
* (cburghardt) Add `removeFailedNode` command

### 1.6.1
* (cburghardt) Fix issues 75 and 76

### 1.6.0
* (cburghardt) Cleanup obsolete states on startup
* (cburghardt) Added confirmation dialog for hard reset
* (cburghardt) Translation fixes
* (cburghardt) Removed non-existing `getNeighbors` function
* (cburghardt) Display network map
* (cburghardt) Allow manual input of a serial port together with the selection
* (cburghardt) Suppress permission denied warnings during installation

### 1.5.1
* (cburghardt) The *refresh node* command no longer excludes the node

### 1.5.0
* (AlCalzone) Update OpenZWave dependency to version 1.6

### 1.4.2
* (AlCalzone) Also escape spaces in state IDs.

### 1.4.1
* (AlCalzone) Pinned version of OpenZWave to 1.4 because 1.6 is not compatible yet

### 1.4.0
* (AlCalzone) Fixed breaks with OpenZWave 1.6
* (AlCalzone) Switched to new testing
* (AlCalzone) Support for compact mode

### 1.3.2 (2018-11-28)
* (AlCalzone) Replace all chars in state IDs that are forbidden in JS-Controller 1.5+
* (AlCalzone) Include @types/iobroker and strongly type adapter config properties

### 1.3.0
* (AlCalzone) Experimental support for CentralScene

### 1.2.0 (2018-07-25)
* (AlCalzone) Forbidden chars in state IDs are replaced

### 1.1.0 (2018-05-01)
* (AlCalzone) Use new OZW version for compatibility with NodeJS 10

### 1.0.0 (2018-01-31)
* (AlCalzone) Simplified resolving the location of the JS-Controller

### 0.9.0 (2017-10-28)
* (AlCalzone) Fixed lifeline detection in admin UI
* (AlCalzone) Updated buttons to match their behaviour in OZW
* (AlCalzone) Only set adapter status to green after OZW is done initializing
* (AlCalzone) Fixed hard reset: also delete all nodes from ioBroker
* (Pmant/AlCalzone) Parse decimal values into floats, not strings

### 0.8.0 (2017-07-12)
* (Apollon77) Update to Openzwave-shared 1.4

### 0.7.0 (2017-07-12)
* (Pmant/AlCalzone) Several fixes and add association ui

### 0.6.0 (2017-05-01)
* (Pmant) Support secure devices

### 0.5.2 (2017-04-05)
* (AlCalzone) improved handling of instance status objects

### 0.5.0 (2017-01-08)
* (bluefox) Update openzwave-shared
* (ekarak) Change install process

### 0.4.4 (2016-11-27)
* (AlCalzone) Fix enumeration values

### 0.4.3 (2016-11-26)
* (bluefox) add state "info.scanCompleted"

### 0.4.2 (2016-11-15)
* (AlCalzone) Read devices from dev and not from serialport

### 0.4.1 (2016-11-14)
* (AlCalzone) Allow set of parameters

### 0.4.0 (2016-11-01)
* (bluefox) Rewrite adapter completely

### 0.2.5 (2015-12-21)
 - (husky-koglhof) Object tree build now on change/added/ready from zwave
 - Default Role/Type/State (needed for history)
 - openzwave-shared 1.1.6
 - last openzwave from github
 - OpenZWave Security

### 0.2.4 (2015-12-05)
 - (husky-koglhof) fixed hardcoded values
   Admin Page can Add / Remove ZWave Devices

### 0.2.3 (2015-11-11)
 - (bluefox) try to fix io-package.json

### 0.2.2 (2015-09-28)
 - (ekarak) API changes for openzwave-shared 1.0.8+

### 0.2.3 (2015-11-11)
 - (bluefox) try to fix io-package.json

### 0.2.2 (2015-09-28)
 - (ekarak) API changes for openzwave-shared 1.0.8+

### 0.2.1 (2015-08-24)
 - (husky-koglhof) Fixed Errors with Config save at OpenZwave Configurator

### 0.2.0 (2015-08-05)
 - (husky-koglhof) Added OpenZWave Configurator, changed Dependency from openzwave to openzwave-shared, Implemented stateChange, objectChange Functions, Implemented extended Settings

### 0.1.0 (2015-01-03)
 - enable npm install.

### 0.0.9 (2014-11-22)
 - Support of new naming concept.

### 0.0.8 (2014-10-31)
 - Fix names of classes.

### 0.0.6 (2014-10-30)
 - Show in config found tty ports.

### 0.0.3 (2014-10-30)
 - Classify channels.

### 0.0.2 (2014-10-28)
 - Initial commit. Still non-functional.

## License

Copyright (c) 2014-2019 bluefox <dogafox@gmail.com>, husky-koglhof <husky.koglhof@icloud.com>

SOFTWARE NOTICE AND LICENSE

OpenZWave is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License,
or (at your option) any later version.

OpenZWave is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with OpenZWave.  If not, see <http://www.gnu.org/licenses/>.