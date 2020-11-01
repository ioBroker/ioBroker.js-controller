---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ebus/README.md
title: ioBroker.ebus
hash: tB2ZoSeU+uiU1nCXjDPAxzxsj46Lg9vwLIwzPOdlofg=
---
![Logo](../../../en/adapterref/iobroker.ebus/admin/ebus.png)

![Anzahl der Installationen](http://iobroker.live/badges/ebus-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.ebus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ebus.svg)
![Tests](https://travis-ci.org/rg-engineering/ioBroker.ebus.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.ebus.png?downloads=true)

# IoBroker.ebus
** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

** Wenn es Ihnen gefällt, ziehen Sie bitte eine Spende in Betracht: **

[![paypal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

Dieser Adapter liest

- Daten von ebusd mit HTML

In diesem Fall muss ebusd ausgeführt werden und Daten an z. Explorer über http:// IP: port / data (http://192.168.0.123:8889/data) Aktuelle Version von ebusd inkl. Konfigurationsdateien können von https://github.com/john30/ebusd kopiert werden. Alle Felder mit Daten, Lastup und aus dem globalen Abschnitt werden analysiert. Alle anderen werden im Moment ignoriert.

Es besteht die Möglichkeit, Daten abzufragen, die nicht direkt von ebusd abgefragt werden. Der Befehl 'read -f' wird verwendet, um das Lesen über den E-Bus zu erzwingen.

Ein weiteres Merkmal besteht darin, einen beliebigen Befehl an ebusd zu senden und eine Antwort zu erhalten, um mit z. Skripte.

aktuell unterstützte ebusd-version: 3.3

## Bekannte Probleme
* Bitte erstellen Sie Probleme unter [github] (https://github.com/rg-engineering/ioBroker.ebus/issues), wenn Sie Fehler finden oder neue Funktionen wünschen

## 2.2.3 (2020-10-24)
* (René) Verlauf DP erstellen, falls nicht verfügbar

## 2.2.0 (2020-09-06)
* (René) DP nur bei Bedarf ändern, um die Systemlast zu reduzieren
* (René) Abhängigkeiten aktualisieren

## 2.1.1 (2020-06-27)
* (René) Problem Nr. 26: Fehlerbehebung: "cmd nicht gefunden" ist nur eine Debug-Meldung anstelle eines Fehlers

## 2.1.0 (2020-06-17)
* (René) Refactoring: 'async / await' verwendet

## 2.0.0 (2020-04-26)
* (René) "Anfrage" ersetzt durch "gebogen"

## 1.0.0 (15.12.2019)
* (René) Update auf meinen eigenen Flot 3.0

## 0.8.2 (2019-11-10)
* (René) einige weitere Fehlermeldungen im Datenpunkt "Fehler"

## 0.8.1 (2019-10-31)
* (René) Update Flot auf Version 3.0

### 0.8.0 (24.02.2019)
* (René) hcmode2 Wert 5 = EVU Sperrzeit

### 0.7.0 (28.01.2019)
* (René) fügt ein anpassbares Timeout hinzu

### 0.6.0 (06.01.2019)
* (René) Unterstützung des Kompaktmodus

### 0.5.5 (2018-11-04)
* (René) Code bereinigen

### 0.5.4
* (René) Arduino-Unterstützung entfernt

### 0.5.3
* (René) Fehlerinformationen hinzufügen

### 0.5.2
* (René) Fehlerbehebung: In vis 1.x werden einige Werte nicht gespeichert

### 0.5.1
* (René) Fehlerbehebung: Wenn nichts abgefragt werden muss, überspringen Sie die Telnet-Verbindung

### 0.5.0
* (René) Datum über TCP in ebusd schreiben

### 0.4.2
* (René) Fehlerbehebung für Admin V3

### 0.4.1
* (René) Logo geändert

### 0.4.0
* (René) liest Daten von ebusd

### 0.3.0
* (René) Unterstützung von ebusd
* (René) admin3-Unterstützung

### 0.2.0
* (René) Geschichte als JSON für vis hinzufügen
* (René) Flot-basiertes Widget hinzufügen, um Temperatur-, Status- und Leistungsdiagramm anzuzeigen

### 0.1.0
* (René) geplanter Adapter anstelle von Deamon

### 0.0.3
* (René) UTF8-Codierung

### 0.0.2
* (René) Erstveröffentlichung

## Changelog

## License
Copyright (C) <2017 - 2020>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.