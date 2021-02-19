---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.linktap/README.md
title: ioBroker.LinkTap
hash: 16rabwK6y7zbixpvaA6iHE662ds0W55+RqO08ypi1q0=
---
![Logo](../../../en/adapterref/iobroker.linktap/admin/Logo_small.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.linktap.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.linktap.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Smart-Gang/iobroker.linktap.svg)
![Tests](https://img.shields.io/travis/Smart-Gang/ioBroker.linktap.svg)
![NPM](https://nodei.co/npm/iobroker.linktap.png?downloads=true)

# IoBroker.LinkTap
## IoBroker.linktap
Steuern Sie Ihre Gartenbewässerung mit dem LinkTap Wireless Water Timer-Hersteller: https://www.link-tap.com/

## Installation
Wurde unter Node.js 12 entwickelt. Es wird daher empfohlen, mindestens diese Version zu verwenden.

## Die Einstellungen
Erstellen Sie den API-Schlüssel unter https://www.link-tap.com/#!/api-for-developers mit Ihren LinkTap-Anmeldeinformationen.

Bitte geben Sie den Benutzernamen und den API-Schlüssel in die Konfiguration ein.
Alle angeschlossenen Gateways und Taplinker werden nach dem Start des Adapters abgerufen. Der Hersteller erlaubt alle 5 Minuten eine Abfrage aller Gateways und Geräte. Der Adapter führt den Abruf automatisch jede Stunde oder bei jedem Neustart des Adapters durch.

Das Abrufen des Bewässerungsstatus kann in der Konfiguration anhand von Minuten individuell eingestellt werden. Es kann bis zu einer Minute dauern, bis der LinkTap-Webdienst aktualisierte Bewässerungsinformationen bereitstellt.

Alle von der API bereitgestellten Bewässerungsfunktionen wurden implementiert.

Wichtig: Die gewünschten Zeitpläne müssen vor der Verwendung in der App eingerichtet werden. Diese können dann über den Adapter aktiviert / deaktiviert werden. Zu diesem Zweck müssen zusätzlich die entsprechenden Zustände der Rolle "Argument in" gesetzt werden.

## Changelog

### 0.1.7
* (Smart-Gang) First public release

## License
MIT License

Copyright (c) 2021 Author <gangrulez@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.