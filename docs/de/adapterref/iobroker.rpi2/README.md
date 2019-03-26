---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rpi2/README.md
title: kein Titel
hash: yUNT/749tkPsNh55r2vRh5FX088bXozqNd5QYjdxJpo=
---
![Logo](../../../en/adapterref/iobroker.rpi2/admin/rpi.png) ioBroker RPI-Monitor Adapter ================

![Anzahl der Installationen](http://iobroker.live/badges/rpi2-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.rpi2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rpi2.svg)
![NPM](https://nodei.co/npm/iobroker.rpi2.png?downloads=true)

RPI-Monitor-Implementierung zur Integration in ioBroker. Es ist dieselbe Implementierung wie für iobroker.rpi, jedoch mit GPIOs.

## Wichtige Informationen
Funktioniert nur mit Knoten> = 0.12

** ioBroker muss unter root ausgeführt werden, um GPIOs zu steuern. **

## Installation
Nach der Installation müssen Sie alle benötigten Module über die Administrationsseite konfigurieren.

Nach dem Start von iobroker.rpi erzeugen alle ausgewählten Module einen Objektbaum in ioBroker innerhalb von rpi. <Instanz>. <Modulname>, z. rpi.0.cpu

Stellen Sie sicher, dass Python und Build-Essential installiert sind:

```
sudo apt-get update
sudo apt-get install -y build-essential python
```

Folgende Objekte stehen nach Auswahl zur Verfügung:

#### **ZENTRALPROZESSOR**
- cpu_frequency
- load1
- load5
- load15

#### **Himbeere (vcgencmd ist erforderlich)**
- cpu_voltage
- mem_arm
- mem_gpu

#### **Erinnerung**
- memory_available
- memory_free
- memory_total

#### **Netzwerk (eth0)**
- net_received
- net_send

#### **SD-Karte**
- sdcard_boot_total
- sdcard_boot_used
- sdcard_root_total
- sdcard_root_used

#### **Wechsel**
- swap_total
- swap_used

#### **Temperatur**
- soc_temp

#### **Betriebszeit**
- Betriebszeit

#### **WLAN**
- wifi_received
- wifi_send

## Aufbau
Auf der Konfigurationsseite können Sie folgende Module auswählen:

- ZENTRALPROZESSOR
- Himbeere
- Erinnerung
- Netzwerk
- SD-Karte
- Wechsel
- Temperatur
- Uptime
- WLAN

## Logfiles / Konfigurationseinstellungen
## Eigenschaften
## Machen
## Getestete Hardware
 - Odroid C1
 - Himbeer-Pi 1

## GPIOs
Sie können auch GPIOs lesen und steuern.
Sie müssen lediglich die GPIOs-Optionen (zusätzliche Registerkarte) in den Einstellungen konfigurieren.

![GPIOs](../../../en/adapterref/iobroker.rpi2/img/pi3_gpio.png)

Nachdem einige Ports aktiviert wurden, werden in der Objektstruktur folgende Status angezeigt:

- rpi.0.gpio.PORT.state

Die Anzahl der Ports ist BCM (BroadComm Pins on Chip). Die Aufzählung erhalten Sie mit ```gpio readall```.
Zum Beispiel PI2:

```
+-----+-----+---------+------+---+---Pi 2---+---+------+---------+-----+-----+
| BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
+-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+
|     |     |    3.3v |      |   |  1 || 2  |   |      | 5v      |     |     |
|   2 |   8 |   SDA.1 | ALT0 | 1 |  3 || 4  |   |      | 5V      |     |     |
|   3 |   9 |   SCL.1 | ALT0 | 1 |  5 || 6  |   |      | 0v      |     |     |
|   4 |   7 | GPIO. 7 |   IN | 1 |  7 || 8  | 0 | IN   | TxD     | 15  | 14  |
|     |     |      0v |      |   |  9 || 10 | 1 | IN   | RxD     | 16  | 15  |
|  17 |   0 | GPIO. 0 |   IN | 0 | 11 || 12 | 0 | IN   | GPIO. 1 | 1   | 18  |
|  27 |   2 | GPIO. 2 |   IN | 0 | 13 || 14 |   |      | 0v      |     |     |
|  22 |   3 | GPIO. 3 |   IN | 0 | 15 || 16 | 0 | IN   | GPIO. 4 | 4   | 23  |
|     |     |    3.3v |      |   | 17 || 18 | 0 | IN   | GPIO. 5 | 5   | 24  |
|  10 |  12 |    MOSI |   IN | 0 | 19 || 20 |   |      | 0v      |     |     |
|   9 |  13 |    MISO |   IN | 0 | 21 || 22 | 1 | IN   | GPIO. 6 | 6   | 25  |
|  11 |  14 |    SCLK |   IN | 0 | 23 || 24 | 1 | IN   | CE0     | 10  | 8   |
|     |     |      0v |      |   | 25 || 26 | 1 | IN   | CE1     | 11  | 7   |
|   0 |  30 |   SDA.0 |   IN | 1 | 27 || 28 | 1 | IN   | SCL.0   | 31  | 1   |
|   5 |  21 | GPIO.21 |   IN | 1 | 29 || 30 |   |      | 0v      |     |     |
|   6 |  22 | GPIO.22 |   IN | 1 | 31 || 32 | 0 | IN   | GPIO.26 | 26  | 12  |
|  13 |  23 | GPIO.23 |   IN | 0 | 33 || 34 |   |      | 0v      |     |     |
|  19 |  24 | GPIO.24 |   IN | 0 | 35 || 36 | 0 | IN   | GPIO.27 | 27  | 16  |
|  26 |  25 | GPIO.25 |  OUT | 1 | 37 || 38 | 0 | IN   | GPIO.28 | 28  | 20  |
|     |     |      0v |      |   | 39 || 40 | 0 | IN   | GPIO.29 | 29  | 21  |
+-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+
| BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
+-----+-----+---------+------+---+---Pi 2---+---+------+---------+-----+-----+
```

## Changelog

### 1.0.0 (2018-08-20)
 - (bluefox) Admin3 support 

### 0.3.2 (2017-11-29)
 - (Homoran) fixed Mem available readings on Stretch

### 0.3.1 (2017-01-11)
 - (olifre) Fixup swap_used calculation.

### 0.2.2 (2016-12-01)
 - (bluefox) Add GPIO direction indication

### 0.2.2 (2016-11-22)
 - (bluefox) Use BCM enumeration

### 0.2.1 (2016-10-29)
 - (bluefox) fix start of adapter

### 0.2.0 (2016-10-23)
 - (bluefox) just version change

### 0.1.1 (2016-10-13)
 - (bluefox) implement GPIOs control

### 0.0.4 (2016-03-25)
 - (bluefox) Try catch by eval
   (bluefox) do not process if exec fails

### 0.0.3 (2015-12-28)
 - (husky-koglhof) Fixed value calc.
   Set Value to 2 digits

### 0.0.2 (2015-12-26)
 - (husky-koglhof) Workaround for node 0.10.x
 - (bluefox) Some Fixes

### 0.0.1 (2015-12-23)
 - Initial commit. Alpha Version.

## License

Copyright (c) 2015-2018 husky-koglhof <husky.koglhof@icloud.com>

MIT License