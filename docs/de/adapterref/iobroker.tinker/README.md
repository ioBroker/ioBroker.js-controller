---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tinker/README.md
title: ioBroker.tinker
hash: JEPSSK8ggpw+2f3PKk6ehT+Aenx/6AA5+dciOw/uXoI=
---
![Logo](../../../en/adapterref/iobroker.tinker/admin/tinker.png)

![Anzahl der Installationen](http://iobroker.live/badges/tinker-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.tinker.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tinker.svg)
![NPM](https://nodei.co/npm/iobroker.tinker.png?downloads=true)

# IoBroker.tinker
===================

Der Tinker Board Monitor Adapter ist eine modifizierte Version des Raspberry PI Monitor Adapters und des OrangePi Monitor Adapters für ioBroker

** Wenn es dir gefällt, erwäge bitte eine Spende: **

[![paypal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q4EEXQ6U96ZTQ&source=url)

### Wichtige Informationen
getestete Hardware: Asus Tinker Board

### Folgende Objekte sind nach Auswahl verfügbar:
## *ZENTRALPROZESSOR*
- CPU_Frequenz
- load1
- load5
- load15

## *Erinnerung*
- memory_available
- Speicher_frei
- memory_total

## *Netzwerk (eth0)*
- net_received
- net_send

## *SD-Karte*
- sdcard_root_total
- sdcard_root_used

## *Wechsel*
- Swap_Total
- swap_used

## *Temperatur*
- soc_temp

## *Uptime*
- Betriebszeit

## *WLAN*
- wifi_received
- wifi_send

## Aufbau
Auf der Konfigurationsseite können Sie folgende Module auswählen:

- ZENTRALPROZESSOR
- Erinnerung
- Netzwerk
- SD-Karte
- Wechsel
- Temperatur
- Uptime
- WLAN

## Changelog

### 0.1.3 (2019-03-14)
* (simatec) Ready for latest

### 0.1.1 (2019-01-08)
* Fix for new iobroker Installer

### 0.1.0 (2018-07-03)
* First Beta

### 0.0.1 (2018-07-03)
* initial Version

## License

The MIT License (MIT)

Copyright (c) 2019 simatec <nais@gmx.net>

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