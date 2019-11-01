---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ebus/README.md
title: ioBroker.ebus
hash: 1VJU4Sv5W1C2XtmfLxk38+lToDHHGJSb4n9422lSZrw=
---
![Logo](../../../en/adapterref/iobroker.ebus/admin/ebus.png)

![Anzahl der Installationen](http://iobroker.live/badges/ebus-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.ebus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ebus.svg)
![Tests](https://travis-ci.org/rg-engineering/ioBroker.ebus.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.ebus.png?downloads=true)

# IoBroker.ebus
Dieser Adapter liest

- Daten von ebusd mit HTML

In diesem Fall muss ebusd ausgeführt werden und in der Lage sein, Daten an z. Explorer über http:// IP: port / data (http://192.168.0.123:8889/data) Aktuelle Version von ebusd inkl. Konfigurationsdateien können von https://github.com/john30/ebusd kopiert werden. Alle Felder mit Daten, lastup und aus dem globalen Bereich werden analysiert. Alle anderen werden momentan ignoriert.

Es besteht die Möglichkeit, Daten abzufragen, die nicht direkt von ebusd abgefragt werden. Mit dem Befehl 'read -f' wird das Lesen über ebus erzwungen.

Ein weiteres Merkmal besteht darin, einen beliebigen Befehl an ebusd zu senden und eine Antwort zu empfangen, um mit z. Skripte.

aktuell unterstützte ebusd-version: 3.3

## Bekannte Probleme
* Bitte erstellen Sie Probleme bei [github] (https://github.com/rg-engineering/ioBroker.ebus/issues), wenn Sie Fehler finden oder neue Funktionen wünschen

## 0.8.1 (2019-10-31)
* (René) Update Flot auf Version 3.0

### 0.8.0 (24.02.2019)
* (René) hcmode2 Wert 5 = EVU Sperrzeit

### 0.7.0 (2019-01-28)
* (René) einstellbares Timeout hinzufügen

### 0.6.0 (06.01.2019)
* (René) Unterstützung des Kompaktmodus

### 0.5.5 (04.11.2018)
* (René) Code bereinigen

### 0.5.4
* (René) Arduino-Unterstützung entfernt

### 0.5.3
* (René) füge Fehlerinformationen hinzu

### 0.5.2
* (René) Bugfix: In Vis 1.x werden einige Werte nicht gespeichert

### 0.5.1
* (René) Bugfix: Wenn Sie nichts abrufen möchten, überspringen Sie die Telnet-Verbindung

### 0.5.0
* (René) schreibe Datum über TCP nach ebusd

### 0.4.2
* (René) Bugfix für Admin V3

### 0.4.1
* (René) Logo geändert

### 0.4.0
* (René) liest Daten aus ebusd

### 0.3.0
* (René) Unterstützung von ebusd
* (René) admin3-Unterstützung

### 0.2.0
* (René) füge history als JSON für vis hinzu
* (René) füge ein flotbasiertes Widget hinzu, um Temperatur-, Status- und Leistungsdiagramme anzuzeigen

### 0.1.0
* (René) geplanter Adapter anstelle von Deamon

### 0.0.3
* (René) UTF8-Codierung

### 0.0.2
* (René) Erstveröffentlichung

## Changelog

## License
Copyright (C) <2017 - 2019>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.