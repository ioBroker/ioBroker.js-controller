---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bsblan/README.md
title: ioBroker.bsblan
hash: 9xmWWEjt1WlHXzCcxSovGCp40pOQ9NHKlrzoOme765A=
---
![Logo](../../../en/adapterref/iobroker.bsblan/admin/bsblan.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.bsblan.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bsblan.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/hacki11/iobroker.bsblan.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/hacki11/ioBroker.bsblan/badge.svg)
![NPM](https://nodei.co/npm/iobroker.bsblan.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/hacki11/ioBroker.bsblan/master.svg)

# IoBroker.bsblan
## Bsb_lan Adapter für ioBroker
Dieser Adapter verbindet die [BSB_LAN-Schnittstelle](https://github.com/fredlcore/bsb_lan) mit ioBroker.
Die BSB_LAN-Schnittstelle bringt den BSB (Boiler System Bus) ins LAN. Dieser Adapter verbindet ihn mit ioBroker.

[BSB_LAN Interface Benutzerhandbuch](https://github.com/1coderookie/BSB-LPB-LAN)

## Unterstützte Geräte
- BSB / LPB-kompatible Geräte (z. B. Brötje, Elco, MHG, Fujitsu)
- Einzelheiten finden Sie unter: [Unterstützte Geräte] (https://github.com/1coderookie/BSB-LPB-LAN)

## Verwendung
- BSB_LAN-Schnittstelle ist in Betrieb
- Installieren Sie den Adapter
- Konfigurieren
    - IP
    - Benutzer und Passwort (falls Basisauthentifizierung aktiviert)
    - Abfrageintervall in Sekunden (mindestens 10)
    - IDs, die abgefragt werden sollen (durch Kommas oder Zeilenumbrüche getrennt, verfügbare IDs siehe Webinterface von BSB_LAN)

## Einschränkungen
- TODO: Schreibzugriff für IDs zulassen

## Credits
- Icon von [Freepik] (https://www.freepik.com/home) von www.flaticon.com

## Changelog
### 0.0.3
* dynamically create states
* IDs without whitespaces
* add textarea for configuration

### 0.0.1
* (hacki11) initial release

## License
MIT License

Copyright (c) 2019 hacki11 <jur.schmid@gmail.com>

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