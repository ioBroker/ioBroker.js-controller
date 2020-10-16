---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.philips-air/README.md
title: ioBroker.philips-air
hash: zYfc3wAURPeQ5XU+DF2XdcWICEq5gT8ZMhvZO62Px8A=
---
![Logo](../../../en/adapterref/iobroker.philips-air/admin/philips-air.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.philips-air.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.philips-air.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/philips-air-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/philips-air-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.philips-air.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.philips-air/badge.svg)
![NPM](https://nodei.co/npm/iobroker.philips-air.png?downloads=true)

# IoBroker.philips-air
## Philips Luftreinigeradapter für ioBroker
Verbindet den Philips Luftreiniger mit ioBroker.
** Nur mit AC2729 getestet **, sollte aber mit einem neuen Luftreiniger funktionieren, der über COAP mit Verschlüsselung kommuniziert.
![AC2729](../../../en/adapterref/iobroker.philips-air/img/device.png)

[Link zur philips Website](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

## Verwendungszweck
Es wird nur die IP-Adresse des Geräts benötigt. Finden Sie es in Ihrem Router (z. B. `MiCO`).
Es kann vorkommen, dass einige Geräte nicht alle Variablen haben und im Objektbaum nicht ausgefüllt bleiben.

![Objekte](../../../en/adapterref/iobroker.philips-air/img/objects.png)

## Changelog

### 0.1.1 (2020-10-14)
* (ioBroker) initial release

## License
MIT License

Copyright (c) 2020 ioBroker <dogafox@gmail.com>

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