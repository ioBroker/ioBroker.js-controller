---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.stockmarket/README.md
title: ioBroker.stockmarket
hash: xWJJynnsydVfVGFj/C4zT8ffzjIIGiWDYjb9wRP2XAk=
---
![Logo](../../../en/adapterref/iobroker.stockmarket/admin/stockmarket.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.stockmarket.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.stockmarket.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/waoler/iobroker.stockmarket.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/waoler/ioBroker.stockmarket/badge.svg)
![NPM](https://nodei.co/npm/iobroker.stockmarket.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/waoler/ioBroker.stockmarket/master.svg)

# IoBroker.stockmarket
## Börsenadapter für ioBroker
Dieser ioBroker Adapter integriert die Börse in ioBroker. Sie können wählen, welche Aktie Sie sehen möchten.

### Aufbau
1. Holen Sie sich Ihren eigenen API-Schlüssel unter https://www.alphavantage.co/support/#api-key
2. Fügen Sie Ihren generierten Schlüssel in die Adapterkonfiguration ein
3. Fügen Sie die gewünschten Aktiensymbole in die Adapterkonfiguration ein (kommasepariert)
4. (optional) Um die gewünschten Aktiensymbole zu finden, können Sie diese unter der folgenden URL überprüfen: https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=STOCKNAME&apikey=YOUR_API_KEY

Ersetzen Sie STOCKNAME durch den von Ihnen gesuchten Bestand und YOUR_API_KEY durch Ihren Api-Schlüssel :) Dann suchen Sie Ihren Bestand und verwenden Sie das abgebildete SYMBOL für Ihre Adapterkonfiguration.

5. Speichern Sie die Einstellungen

Sie können die Zeitplaneinstellungen bei Bedarf ändern (Standardeinstellung alle 15 Minuten).

## Changelog

### 0.0.2
* (waoler) fixed error handling
* (waoler) fixed "instance already running "-Error

### 0.0.1
* (waoler) initial release

## License
MIT License

Copyright (c) 2019 waoler <waoler@web.de>

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