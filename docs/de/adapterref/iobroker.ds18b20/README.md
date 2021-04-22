---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.ds18b20.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ds18b20.svg
BADGE-Number of Installations (latest): https://iobroker.live/badges/ds18b20-installed.svg
BADGE-Number of Installations (stable): https://iobroker.live/badges/ds18b20-stable.svg
BADGE-Dependency Status: https://img.shields.io/david/crycode-de/iobroker.ds18b20.svg
BADGE-NPM: https://nodei.co/npm/iobroker.ds18b20.png?downloads=true
---
![Logo](../../admin/ds18b20.png)

# ioBroker.ds18b20

Der Adapter `ds18b20` ermöglicht die direkte Einbindung von 1-Wire Temperatursensoren des Typs DS18B20 in ioBroker.

Es wird eine entsprechende Hardware mit Unterstützung für den 1-Wire Bus benötigt (z.B. Raspberry Pi) und der 1-Wire Bus muss auf dem System funktionsfähig eingerichtet sein (Sensoren unter `/sys/bus/w1/devices/` aufgelistet).

Ein Beispiel für die Anbindung von DS18B20 Sensoren an einen Raspberry Pi ist weiter unten zu finden.


## Features

* Auslesen des aktuellen Temperaturwertes
* Automatische Erkennung der angeschlossenen Sensoren
* Fehlererkennung beim Abfragen der Sensoren (Checksumme, Kommunikationsfehler, Gerät getrennt)
* Abfrageintervall pro Sensor anpassbar
* Rundung und Umrechnung des gemessenen Wertes pro Sensor anpassbar
* Unterstützung von Sensoren an entfernten Systemen über den _Remote Client_


## Installation

Der Adapter ist über das stable- und latest-Repository verfügbar.

Über die GitHub URL `https://github.com/crycode-de/ioBroker.ds18b20.git` kann zudem die jeweils letzte Entwicklungsversion installiert werden.  
Dies ist aber in den seltensten Fällen zu empfehlen!


## Konfiguration

In der Adapterkonfiguration kann der **Standardabfrageintervall** für alle Sensoren in Millisekunden festgelegt werden. Das Minimum ist 500.  
Zudem kann der **Pfad der 1-Wire Geräte** bei Bedarf angepasst werden.  
Für ein Einbindung von Sensoren an einem entfernten System kann weiterhin der hierfür integrierte Server aktiviert und konfiguriert werden.

In einer Tabelle können die einzelnen Sensoren händisch oder über **Sensoren suchen** hinzugefügt werden.

![Konfiguration](./img/konfiguration.png)

Die **Adresse** ist dabei die 1-Wire Adresse/ID des Sensors und bestimmt zugleich das die Objekt-ID.  
Ein Sensor mit der Adresse `28-0000077ba131` bekommt beispielsweise die Objekt-ID `ds18b20.0.sensors.28-0000077ba131`.

Die **Entfernte System-ID** ist die bei direkt angeschlossenen Sensoren nicht gesetzt (leer) und bei Sensoren an entfernten System die ID des jeweiligen entfernten Systems.

Der **Name** ist zur Identifizierung des Sensors frei wählbar.

Es kann für jeden Sensor ein extra **Abfrageintervall** in Millisekunden festgelegt werden.  
Wird das Feld leer gelassen, so gilt der Standardabfrageintervall.
Das Minimum ist 500.

Die **Einheit** bestimmt die im ioBroker-Objekt hinterlegte Einheit zu dem Wert.
Standardmäßig ist dies `°C`.

Über **Faktor** und **Offset** ist es möglich den vom Sensor gelesenen Wert nach der Formel `Wert = (Wert * Faktor) + Offset` anzupassen.

Die **Dezimalstellen** geben an, auf wie viele Stellen nach dem Komma der Wert gerundet wird.
Die Rundung erfolgt nach der Berechnung mit Faktor und Offset.

**Null bei Fehler** legt fest, wie mit Fehlern beim Lesen des Sensors verfahren werden soll.  
Ist die Option gesetzt, dann werden `null`-Werte bei Fehlern in den State des Sensors geschrieben.  
Ohne diese Option wird bei Fehlern der State nicht aktualisiert.


### Umrechnung von `°C` in `°F`

Damit die gemessenen Temperaturen vom Adapter in `°F` zurückgegeben werden, müssen als Faktor `1.8` und als Offset `32` verwendet werden.


## Aktionen

Über ein Schreiben in den State `ds18b20.0.actions.readNow` ist es möglich das sofortige Lesen von allen oder einem bestimmten Sensor anzustoßen.

Um ein sofortiges Lesen aller Sensors anzustoßen muss in den State das Schlüsselwort `all` geschrieben werden.

Soll nur ein bestimmter Sensor gelesen werden, so muss die Adresse oder die ioBroker Objekt-ID des Sensors in den State geschrieben werden.


## Verwendung in Skripten

Es ist möglich dem Adapter Befehle zum lesen der Sensordaten oder zum Suchen nach Sensoren zu senden.

### `readNow`

Über den Befehl `readNow` wird ein sofortiges Abfragen von allen oder einem bestimmten Sensor angestoßen.
Zum Abfragen aller Sensoren kann der Nachrichtenteil leer gelassen, oder der String `all` verwendet werden.
Zum Lesen eines bestimmten Sensors muss der Nachrichtenteil auf die Adresse oder die ioBroker-ID des Sensors gesetzt werden.

Der Befehl `readNow` gibt keine Daten zurück. Er stößt nur das sofortige Auslesen der Sensoren an.

```js
sendTo('ds18b20.0', 'readNow');
sendTo('ds18b20.0', 'readNow', '28-0000077ba131');
```

### `read`

Über den `read` Befehl kann ein einzelner Sensor gelesen werden.
Als Nachrichtenteil muss die Adresse oder ioBroker Objekt-ID des zu lesenden Sensors angegeben werden.
Der gelesene Wert kann über eine Callback-Funktion weiterverarbeitet werden.

```js
sendTo('ds18b20.0', 'read', '28-0000077ba131', (ret) => {
    log('ret: ' + JSON.stringify(ret));
    if (ret.err) {
        log(ret.err, 'warn');
    }
});
```

### `search`

Der `search` Befehl führt eine Suche nach aktuell angeschlossenen 1-Wire Sensoren durch und gibt die Adressen der gefundenen Sensoren über eine Callback-Funktion zurück.

```js
sendTo('ds18b20.0', 'search', {}, (ret) => {
    log('ret: ' + JSON.stringify(ret));
    if (ret.err) {
        log(ret.err, 'warn');
    } else {
        for (let s of ret.sensors) {
            if (s.remoteSystemId) {
                log('Sensor: ' + s.address + '@' + s.remoteSystemId);
            } else {
                log('Sensor: ' + s.address);
            }
        }
    }
});
```

### `getRemoteSystems`

Über `getRemoteSystems` können die System-IDs der aktuell verbundenen entfernten Systeme abgefragt werden.

```js
sendTo('ds18b20.0', 'getRemoteSystems', {}, (ret) => {
    log('ret: ' + JSON.stringify(ret));
    log('Verbundene Systeme: ' + ret.join(', '));
});
```

## Adapter-Informationen

Über den `ds18b20.*.info.connection` State stellt jede Adapterinstanz eine Information bereit, ob alle konfigurierten Sensoren Daten liefern.  
Wenn das jeweils letzte Lesen von allen Sensoren erfolgreich war, ist dieser State `true`.
Sobald einer der Sensoren einen Fehler aufweist, ist dieser State `false`.


## DS18B20 am Raspberry Pi

Der Anschluss von DS18B20 Temperatursensoren an einen Raspberry Pi erfolgt wie in der folgenden Grafik dargestellt.
Zu beachten ist dabei, dass der Pullup-Widerstand an die +3,3V angeschlossen werden muss und nicht an +5V, da dies den GPIO beschädigen würde.
In diesem Beispiel wird der GPIO.04 (BCM) verwendet.

![DS18B20 Raspberry Pi](./img/raspi-ds18b20.png)

Zur Aktivierung des 1-Wire Bus auf dem Raspberry Pi muss in der Datei `/boot/config.txt` die folgende Zeile hinzugefügt und anschließend der Raspberry Pi neu gestartet werden.
```
dtoverlay=w1-gpio,gpiopin=4
```

Wenn alles funktioniert sind die angeschlossenen Sensoren dann unter `/sys/bus/w1/devices/` sichtbar.
```
$ ls -l /sys/bus/w1/devices/
insgesamt 0
lrwxrwxrwx 1 root root 0 Nov  2 11:18 28-0000077b4592 -> ../../../devices/w1_bus_master1/28-0000077b4592
lrwxrwxrwx 1 root root 0 Nov  2 11:18 28-0000077b9fea -> ../../../devices/w1_bus_master1/28-0000077b9fea
lrwxrwxrwx 1 root root 0 Nov  2 10:49 w1_bus_master1 -> ../../../devices/w1_bus_master1
```

### Nutzung vieler Sensoren am Raspberry Pi

Die Anzahl an Sensoren, die an einem Raspberry Pi an einem Strang fehlerfrei betrieben werden können, ist begrenzt und abhängig von einigen technischen Gegebenheiten (z.B. Leitungslänge).  
Meistens treten ab etwa 10 Sensoren die ersten, teils zufälligen, Ausfälle auf.

Um dennnoch mehr Sensoren betreiben zu können, ist es möglich diese auf mehrere Stänge (also mehrere GPIOs) aufzuteilen.
Dabei benötigt dann jeder Strang einen eigenen Pullup-Widerstand.

Zur Aktivierung werden in der Datei `/boot/config.txt` dann einfach mehrere Einträge mit der entsprechenden GPIO-Nummer hinzugefügt:

```
dtoverlay=w1-gpio,gpiopin=4
dtoverlay=w1-gpio,gpiopin=17
```

Jeder Eintrag erzeugt dann einen eigenen `w1_bus_masterX` im System.

### Kernel-Bug bei negativen Temperaturen

Im Kernel 5.10.y des Raspberry Pi gab es ab Mitte November 2020 einen Bug, wodurch negative Temperaturen als beispielsweise 4092 °C gelesen wurden. (siehe [GitHub Issue](https://github.com/raspberrypi/linux/issues/4124))  
Dieser Bug wurde im Kernel 5.10.14 am 08.02.2021 behoben. (siehe [GitHub Commit](https://github.com/Hexxeh/rpi-firmware/commit/115e3a5f77488d9ee30a33bcb5ac31eb587f60a8))  
Ein `rpi-update` sollte somit das Problem beheben.

Bei Adapterversionen bis einschließlich v1.2.2 werden diese offensichtlich falschen Werte in den ioBroker State übernommen.  
Ab v1.2.3 prüft der Adapter zusätzlich, ob der gelesene Wert plausibel ist (zwischen -80 und +150 °C) und verwirft unplausible Werte.


## Einbindung von Sensoren an einem entfernten System

Ab Version 1.4.0 von _ioBroker.ds18b20_ können Sensoren an entfernten Systemen direkt über den eigenen _ioBroker.ds18b20 Remote Client_ eingebunden werden. Hierfür ist auf dem entfernten System lediglich Node.js erforderlich.

In der Adapterkonfiguration muss der Haken für **Entfernte Sensoren aktiviren** gesetzt sein. Der Adapter startet dann auf dem angegebenen Port einen TCP Server und nimmt Verbindungen der Clients entgegen.

Die Verbindung zwischen Server und Client ist über einen `aes-256-cbc` Algorithmus verschlüsselt.  
Hierfür muss bei den Clients der in der Adapterkonfiguration angezeigte Verschlüsselungsschlüssel gesetzt werden.

Der _ioBroker.ds18b20 Remote Client_ baut dann eine TCP Verbindung zum Adapter auf und wird in der Adapterkonfiguration unter **Verbundene entfernte Systeme** angezeigt.

### Installation des ioBroker.ds18b20 Remote Clients

Ein Setup für den _ioBroker.ds18b20 Remote Client_ wird über den Adapter bereitgestellt.

Anweisungen zur Einrichtung sind in der Adapterkonfiguration zu finden.

## Changelog

### 1.4.1 (2021-04-20)
* (crycode-de) Fixed bug if multiple remote sensors are used

### 1.4.0 (2021-02-21)
* (crycode-de) Support for remote sensors using an own tiny daemon and encrypted TCP sockets
* (crycode-de) Set `q` flag to `0x81` (general problem by sensor) if a sensor reported a `null` value

### 1.3.0 (2021-02-11)
* (crycode-de) Searching for sensors now works for multiple 1-wire masters

### 1.2.3 (2021-02-11)
* (crycode-de) Added check of temperatures higher/lower than possible sensor values

### 1.2.2 (2021-02-06)
* (crycode-de) Fixed crash if settings are malformed (IOBROKER-DS18B20-3)

### 1.2.1 (2021-01-09)
* (crycode-de) Small fixes
* (crycode-de) Updated dependencies

### 1.2.0 (2020-12-21)
* (crycode-de) Added Sentry error reporting
* (crycode-de) Updated dependencies
* (crycode-de) Optimized npm package

### 1.1.5 (2020-10-14)
* (crycode-de) Fixed incorrect data type of object
* (crycode-de) Updated dependencies

### 1.1.4 (2020-02-03)
* (crycode-de) Updated connectionType and dataSource in io-package.json.

### 1.1.3 (2020-01-23)
* (crycode-de) Added `connectionType` in `io-package.json` and updated dependencies.

### 1.1.2 (2020-01-22)
* (crycode-de) Better handling of changed objects in admin.

### 1.1.1 (2020-01-09)
* (crycode-de) Fixed wrong communication errror detection on some sensors.

### 1.1.0 (2019-11-11)
* (crycode-de) Own implementation of reading the sensor data.
* (crycode-de) Fixed bug on decimals rounding.
* (crycode-de) 1-wire devices path is now configurable.

### 1.0.3 (2019-11-03)
* (crycode-de) Added documentation about DS18B20 at a Raspberry Pi; Dependencies updated

### 1.0.2 (2019-10-07)
* (crycode-de) Display error message when tried to search for sensors without adapter running.

### 1.0.1 (2019-10-01)
* (crycode-de) Type changed to hardware, Renamed command, Added missing documentation

### 1.0.0 (2019-09-09)
* (crycode-de) initial release

## License

Copyright (c) 2019-2021 Peter Müller <peter@crycode.de>

### MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.