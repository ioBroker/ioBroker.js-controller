---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.binance/README.md
title: ioBroker.binance
hash: g1ciorZTR3u5Yhaf5+j4iEvviAnfozU2ASrlfW4BtJo=
---
![Logo](../../../en/adapterref/iobroker.binance/admin/binance.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.binance.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.binance.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/binance-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/binance-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Kartax/iobroker.binance.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/Kartax/ioBroker.binance/badge.svg)
![NPM](https://nodei.co/npm/iobroker.binance.png?downloads=true)

# IoBroker.binance
## Einführung
Adapter zur Kommunikation mit der Krypto-Handelsplattform binance

Der Adapter zieht die Preise der Währungen im konfigurierten Aktualisierungsintervall.
Wenn Sie einen API-Schlüssel und das entsprechende Geheimnis konfigurieren, werden auch Kontensalden abgerufen.
Sie können einen API-Schlüssel auf binance.com erstellen. Ich empfehle, ihn auf "schreibgeschützt" zu beschränken.

![Screenshot-1] (Screenshot-1.png)! [Screenshot-2](../../../en/adapterref/iobroker.binance/screenshot-2.png)

## Changelog
### 1.1.0
- added 24hr data for selected symbols
### 1.0.5
- fixed interval handle
### 1.0.4
- npmjs repackage
### 1.0.3
- enrypted storage of apiKeySecret
### 1.0.2
- added translations
- additonal timeout options
- Travis CI
### 1.0.1
- some loggin cleanup
- adjusted documentation
### 1.0.0
- first fully functional release (polling of prices and account balances)
- introduces cropty-js to accomplish binance quthentication requirements
- moved from type schedule to daemon with setTimeout

## License
MIT License

Copyright (c) 2020 Kartax

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