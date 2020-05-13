---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lametric/README.md
title: ioBroker.lametric
hash: WC5mIQKmR7+YtXFf0eIZXBipXFHcfbzV4G5YwkZ6zkE=
---
![Logo](../../../en/adapterref/iobroker.lametric/admin/lametric.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.lametric.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lametric.svg)
![Stabil](http://iobroker.live/badges/lametric-stable.svg)
![Eingerichtet](http://iobroker.live/badges/lametric-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/klein0r/iobroker.lametric.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/klein0r/ioBroker.lametric/badge.svg)
![Build-Status](http://img.shields.io/travis/klein0r/ioBroker.lametric.svg)
![NPM](https://nodei.co/npm/iobroker.lametric.png?downloads=true)

# IoBroker.lametric
Mit diesem Adapter können Sie Statusinformationen zu Ihrer LaMetric-Zeit abrufen und Benachrichtigungen an diese senden.
Sie benötigen lediglich die IP-Adresse Ihres Geräts und den API-Entwicklerschlüssel.

## Aufbau
Sie können Ihren persönlichen Schlüssel [Hier](https://developer.lametric.com/) erhalten.

![API-Schlüssel](../../../en/adapterref/iobroker.lametric/docs/apiKey.png)

## Verwendungszweck
Weitere Informationen zu Benachrichtigungen finden Sie hier: https://lametric-documentation.readthedocs.io/en/latest/reference-docs/device-notifications.html

## Eigenschaften
- Displayhelligkeit einstellen (Prozent, Auto-Modus / Manueller-Modus)
- Stellen Sie die Lautstärke ein (Prozent)
- Bildschirmschoner konfigurieren (aktivieren / deaktivieren, zeitbasiert, wenn es dunkel ist)
- Aktivieren / Deaktivieren Sie Bluetooth und ändern Sie den Bluetooth-Namen
- Zwischen Apps wechseln (weiter, vorher, zu einer bestimmten App gehen)
- Blockierte Benachrichtigungen senden (mit konfigurierbarer Priorität, Sound, Symbolen, Text, ...)
- Steuern Sie spezielle Apps wie Radio, Stoppuhr und Wetter

## Blockly
Sie können eine einfache Zeichenfolge als Nachricht verwenden, die als einzelner Frame angezeigt wird

![einfach](../../../en/adapterref/iobroker.lametric/docs/blockly1.png)

Um mehrere Frames anzuzeigen, können Sie auch ein Array als Nachricht bereitstellen

![einfach](../../../en/adapterref/iobroker.lametric/docs/blockly2.png)

## Changelog

### 0.0.8

* (klein0r) Updated dependencies

### 0.0.7

* (klein0r) fixed blockly

### 0.0.6

* (klein0r) switched to setTimeout instead of setInterval, improved logging and fixes eslint complaints

### 0.0.5

* (klein0r) Fixed notification, html, updated github template, enable and disable screensaver

### 0.0.4

* (klein0r) Refactored blockly sendTo / notifications

### 0.0.3

* (klein0r) Added app switching support, refactored everything
* (bluefox) The deletion of the actual shown information was added

### 0.0.2

* (Sigi74) Change message_value for variables message
* (Sigi74) Leave sound none

### 0.0.1

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2020 Matthias Kleine <info@haus-automatisierung.com>

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