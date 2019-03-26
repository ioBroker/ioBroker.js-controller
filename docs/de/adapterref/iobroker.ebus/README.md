---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ebus/README.md
title: ioBroker.ebus
hash: +glfxo8JhtjZ2bEms4bWeOoJPgDSbPZRpbsdo0hydak=
---
![Logo](../../../en/adapterref/iobroker.ebus/admin/ebus.png)

![Anzahl der Installationen](http://iobroker.live/badges/ebus-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.ebus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ebus.svg)
![Tests](https://travis-ci.org/rg-engineering/ioBroker.ebus.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.ebus.png?downloads=true)

# IoBroker.ebus
Dieser Adapter liest

- Daten von ebusd mittels html

In diesem Fall muss ebusd laufen und Daten senden können, z. Explorer über http:// IP: port / data (http://192.168.0.123:8889/data) Aktuelle Version von ebusd inkl. Konfigurationsdateien können von https://github.com/john30/ebusd kopiert werden. Alle Felder mit Daten, lastup und from global section werden analysiert. Alle anderen werden im Moment ignoriert.

Es besteht die Möglichkeit, Daten abzufragen, die nicht direkt von ebusd abgefragt werden. Mit dem Befehl 'read -f' wird das Lesen über Ebus erzwungen.

Eine weitere Funktion besteht darin, einen Befehl an ebusd zu senden und eine Antwort zu erhalten, um z. Skripte.

aktuell unterstützte ebusd-Version: 3.3

## Changelog

### 0.8.0 (2019-02-24)
* (René) hcmode2 value 5 = EVU Sperrzeit

### 0.7.0 (2019-01-28)
* (René) add adjustable timeout

### 0.6.0 (2019-01-06)
* (René) support of compact mode

### 0.5.5 (2018-11-04)
* (René) code clean up

### 0.5.4
* (René) arduino support removed

### 0.5.3
* (René) add error information

### 0.5.2
* (René) bug fix: in vis 1.x some values are not stored

### 0.5.1
* (René) bug fix: if nothing to poll then skip telnet connection

### 0.5.0
* (René) write date over TCP to ebusd

### 0.4.2
* (René) bug fix for admin V3 

### 0.4.1 
* (René) logo changed 

### 0.4.0 
* (René) reading data from ebusd 

### 0.3.0 
* (René) support of ebusd 
* (René) admin3 support

### 0.2.0
* (René) add history as JSON for vis
* (René) add flot based widget to display temperatur, status and power graph

### 0.1.0
* (René) scheduled adapter instead of deamon

### 0.0.3
* (René) UTF8 coding

### 0.0.2
* (René) initial release

## License
Copyright (C) <2017 - 2019>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.