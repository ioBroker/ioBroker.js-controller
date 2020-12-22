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


## Installation

Der Adapter ist aktuell über das latest-Repository verfügbar.

Alternativ kann er über die URL `https://github.com/crycode-de/ioBroker.ds18b20.git` installiert werden.


## Konfiguration

In der Adapterkonfiguration kann der **Standardabfrageintervall** für alle Sensoren in Millisekunden festgelegt werden. Das Minimum ist 500.

In einer Tabelle können die einzelnen Sensoren händisch oder über *Sensoren suchen* hinzugefügt werden.

![Konfiguration](./img/konfiguration.png)

Die **Adresse** ist dabei die 1-Wire Adresse/ID des Sensors und bestimmt zugleich das die Objekt-ID.
Ein Sensor mit der Adresse `28-0000077ba131` bekommt beispielsweise die Objekt-ID `ds18b20.0.sensors.28-0000077ba131`.

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
            log('Sensor: ' + s);
        }
    }
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


## Einbindung von Sensoren an einem entfernten Raspberry Pi

Es ist ebenso möglich Sensoren einzubinden, die an einen entfernten Raspberry Pi angeschlossen sind.
Hierzu wird das entsprechende Verzeichnis mittels *Samba* auf dem entfernten Raspberry Pi freigegeben und dann auf dem ioBorker-System gemountet.

### Konfiguration auf dem entfernten Raspberry Pi

Installation von Samba:
```sh
sudo apt install samba
```

Konfiguration in der Datei `/etc/samba/smb.conf`:
```ini
[ds1820]
path = /sys/devices/w1_bus_master1
comment = DS1820 Temperature sensors.
available = yes
browseable = yes
guest ok = yes
writeable = no
force user = root
force group = root
```

Anschließend Samba neu starten, um die Änderungen anzuwenden:
```sh
sudo systemctl restart smbd
```

### Konfiguration auf dem ioBroker-System

Installation des Samba Clients:
```sh
sudo apt install smbclient
```

Eintrag für den Mount in der Datei `/etc/fstab` hinzufügen:
```
//<IP-ADRESSE-REMOTE-RPI>/ds1820 /mnt/remote-ds1820 cifs defaults,vers=1.0 0 0
```

Verzeichnis für den Mountpunkt anlegen:
```sh
sudo mkdir -p /mnt/remote-ds1820
```

Verzeichnis mounten:
```sh
sudo mount /mnt/remote-ds1820
```

### Adapterkonfiguration
In der Adapterkonfiguration muss dann der Systempfad für die 1-Wire Geräte auf den Mountpunkt `/mnt/remote-ds1820` gesetzt werden.

Sollten auf dem ioBroker-System ebenfalls DS1820 Sensoren direkt angeschlossen sein, dann sollte am besten eine zweite Instanz des Adapters für die Remote-Sensoren erstellt werden.

## Changelog

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

Copyright (c) 2019-2020 Peter Müller <peter@crycode.de>

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