---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zwave/README.md
title: ioBroker zwave Adapter
hash: MOnafPN3SVLChdx3C9Oqj/6x3xtrLHFZZIq5xCd9rdg=
---
![Logo](../../../en/adapterref/iobroker.zwave/admin/zwave.png)

![Anzahl der Installationen](http://iobroker.live/badges/zwave-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.zwave.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zwave.svg)
![NPM](https://nodei.co/npm/iobroker.zwave.png?downloads=true)

# IoBroker zwave Adapter ===============
Zwave-Unterstützung mit openzwave.

Für diesen Adapter wird eher ein gut unterstütztes npm-Modul verwendet: https://github.com/OpenZWave/node-openzwave-shared Sie sollten herausfinden, welchen Namen der USB-Anschluss des Z-Wave-Sticks hat, und ihn in den Adaptereinstellungen einrichten.

## Wichtige Informationen
- Beim ersten Start benötigt der Adapter einige Zeit, um alle Objekte im iobroker zu berechnen.
- Wenn Sie ein Gerät hinzufügen, überlassen Sie es dem Adapter, und warten Sie ein wenig.
- Wenn ein Gerät in der enthaltenen Admistration-Site nicht sichtbar ist, wird es nicht vollständig in ioBroker importiert.

## Installation
Zunächst wird die Implementierung nur unter ARM Linux (z. B. Raspberry Pi (2)) getestet.
Sie benötigen eine vollständige Entwicklungsumgebung (gcc, make, ...)

### Zusätzliche Pakete installieren
Auf einigen Systemen müssen zusätzliche Pakete installiert werden. Führen Sie daher vor der Installation des Adapters Folgendes auf der Konsole aus:

```bash
apt-get install pkg-config libudev-dev build-essential curl unzip
```

Nur für Raspberry Pi3: Aktivieren Sie GPIO UART
Bei Raspberry Pi 3 wird der UART standardmäßig vom Bluetooth-Modul belegt. Gehen Sie folgendermaßen vor, um es für die Verwendung mit einem GPIO-Modul zu aktivieren:

1. `sudo nano / boot / cmdline.txt`
1. Entfernen Sie `console = serial0,115200`
1. Speichern Sie die Datei und schließen Sie sie

2. `sudo nano / boot / config.txt`

Suchen Sie nach den folgenden Zeilen. Wenn sie mit einem `#` auskommentiert sind, entfernen Sie das. Wenn sie nicht vorhanden sind, fügen Sie sie am Ende der Datei hinzu:

* `dtoverlay = pi3-miniuart-bt`
* `enable_uart = 1 '
* `force_turbo = 1`

3. Neustart

### Erster Start
Das GPIO-Modul hat normalerweise eine Adresse wie `/dev/ttyAMA0` oder `/dev/ttyACM0`.
Den USB-Stick finden Sie unter `/dev/ttyUSB0` oder `/dev/ttyUSB1`.

- Gehen Sie in iobroker admin und fügen Sie den Zwave-Adapter hinzu (die Installation ist ziemlich lang, haben Sie Geduld)
- Starten Sie die neue zwave Adapter-Instanz und wählen Sie die Adresse des Controller-Geräts aus der Dropdown-Liste der Administrator-Benutzeroberfläche aus.
- Wenn Ihr Gerät nicht erkannt wird, überprüfen Sie es oder geben Sie die Adresse manuell ein, wenn der Adapter ausgeschaltet ist.
- Warten Sie, bis die Anzeige auf der Registerkarte "Instances" grün leuchtet oder die Meldung "zwave.0 Scan complete" im iobroker-Protokoll angezeigt wird.

### Bekannte Probleme
Wenn Sie nach dem Starten des Adapters die folgende (oder ähnliche) Fehlermeldung erhalten

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

Wenn alle diese Befehle nicht funktionieren, kann der folgende Prozess möglicherweise ausgeführt werden:

1. `sudo nano / etc / ld.so.conf.d / zwave.conf`
1. Geben Sie "/ usr / local / lib64" ein
1. Verlassen Sie den Editor mit `STRG + X` und bestätigen Sie mit` Y`, um die Änderungen zu speichern

1. `sudo ldconfig`

## Aufbau
In den Admin-Einstellungen können Sie folgende Attribute festlegen

- Objekte erneut initiieren (Alle Objekte in ioBroker erneut initialisieren)
- USB-Name (der USB-Port Ihres Z-Wave-Sticks)
- Protokollierung (Protokollierung in OZW_Log.txt aktivieren)
- Konsolenausgabe (Kopieren der Protokollierung auf die Konsole, Protokolliert alle in ioBroker.log)
- Save Config (ein XML-Netzwerklayout erstellen und eine /zwcfg_<HOMEID>.xml unter Linux erstellen)
- Treiberversuche (versuchen Sie es oft, bevor Sie aufgeben)
- Abfrageintervall (Intervall zwischen Abfragen in Millisekunden)
- Aktualisierung unterdrücken (keine Updates senden, wenn sich nichts geändert hat)

![Admin-Einstellungen](../../../en/adapterref/iobroker.zwave/img/admin-settings.png)

## Logfiles / Konfigurationseinstellungen
Wenn Sie iobroker im Standardordner installiert haben:

 - Protokolldatei: /opt/iobroker/node_modules/iobroker.zwave/node_modules/openzwave-shared/OZW_Log.txt unter Linux
 - Konfiguration: /opt/iobroker/node_modules/iobroker.zwave/node_modules/zwcfg_<HOMEID>.xml unter Linux

## Gerät hinzufügen oder entfernen
Wenn Sie ein Gerät hinzufügen oder entfernen, dauert es 60 Sekunden. Dann wird die Seite automatisch neu geladen.

Wenn Sie den Namen oder den Ort ändern, dauert es 5 Sekunden. Dann wird die Seite automatisch neu geladen.

## Eigenschaften
Im OpenZWave Configurator können Sie alle Knoten und ihre Klassen sehen.

Folgende Aktionen werden aktuell unterstützt (nur mit Kontextmenü):

- Legen Sie den Namen und den Ort für den Knoten selbst fest
- Wert einer Klasse ändern

Folgende globale Aktionen werden derzeit unterstützt:

- Fügen Sie Knoten hinzu
- Knoten entfernen
- Knoten aktualisieren (Knoten über die ioBroker-Kommunikation aktualisieren)

## Machen
### ZWave-spezifisch
- Szenen
- Gruppenmanagement
- Abfragen
- Controller-Befehle
- Konfigurationsbefehle

### Global
- Testen Sie weitere Hardware
- Verschiebe config und logfile in den Standardpfad von iobroker (/ opt / iobroker / log, / opt / iobroker / data / files / zwave)
- Sprachunterstützung (Englisch, Deutsch, Russisch)

## Getestete Hardware
### ZWave
- ZME_UZB1 USB-Stick
- RazBerry GPIO Board für RaspBerry (1/2)

### Fibaro
- FGBS001 Universeller Binärsensor
- FGS222 Doppelrelaisschalter 2x1,5 kW
- FGWPE-Wandstecker
- FGSS001 Rauchmelder
- FGMS001 Bewegungssensor
- FGS-223 Doppelschalter 2
- FGR-222 Rollladen 2
- FGDW-002 Tür- / Fenstersensor 2

### Danfoss
- Danfoss Living Connect Raumthermostat (Typ 0003, ID 8010)
- Danfoss Z Thermostat 014G0013

## Changelog

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

Copyright (c) 2014-2018 bluefox <dogafox@gmail.com>, husky-koglhof <husky.koglhof@icloud.com>

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