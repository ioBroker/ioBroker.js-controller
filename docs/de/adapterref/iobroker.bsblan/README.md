---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bsblan/README.md
title: ioBroker.bsblan
hash: xUD8t6FT0RVhgnVBFyFDHVTD1appxS4rdHEINifPNdY=
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
Die BSB_LAN-Schnittstelle bringt den BSB (Boiler System Bus) ins LAN. Dieser Adapter verbindet es mit ioBroker.

[BSB_LAN-Schnittstelle Benutzerhandbuch](https://github.com/1coderookie/BSB-LPB-LAN)

## Unterstützte Geräte
- BSB / LPB-kompatible Geräte (z. B. Brötje, Elco, MHG, Fujitsu)
- Einzelheiten finden Sie unter: [Unterstützte Geräte] (https://github.com/1coderookie/BSB-LPB-LAN)

## Verwendungszweck
- Die BSB_LAN-Schnittstelle ist aktiv
- Installieren Sie den Adapter
- Konfigurieren
    - IP
    - Benutzer und Passwort (wenn die Basisauthentifizierung aktiviert ist)
    - Abfrageintervall in Sekunden (mindestens 10)
    - IDs, die abgefragt oder geändert werden sollen (Komma- oder Zeilenumbruch getrennt, verfügbare IDs siehe Webinterface von BSB_LAN)

## Werte schreiben
- Aktivieren Sie alle oder bestimmte IDs als beschreibbar in
  * de: [Lese- oder Lese- / Schreibzugriff] (https://1coderookie.github.io/BSB-LPB-LAN_EN/chap05.html)
  * de: [Zugriff des Adapters auf den Regler] (https://1coderookie.github.io/BSB-LPB-LAN/kap05.html)
  * für alle: `bsb_lan_config.h: #define DEFAULT_FLAG 0`
  * kompilieren & hochladen
- Fügen Sie IDs hinzu, die in die Adapterinstanzkonfiguration geschrieben werden sollen (siehe Verwendung).
- Zahlen, Aufzählungen und Stunden: Min-Typen sind jetzt beschreibbar (natürlich können nur beschreibbare IDs geschrieben werden)

## Credits
- Symbol von [Freepik] (https://www.freepik.com/home) von www.flaticon.com

## Changelog
### 0.1.0
* Support write access

### 0.0.3
* dynamically create states
* IDs without whitespaces
* add textarea for configuration

### 0.0.1
* (hacki11) initial release

## License
MIT License

Copyright (c) 2020 hacki11 <jur.schmid@gmail.com>

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