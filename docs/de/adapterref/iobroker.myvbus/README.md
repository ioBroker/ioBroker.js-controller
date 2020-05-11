---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.myvbus/README.md
title: ioBroker.myvbus
hash: 2TFJDIah+2/TCuImfk5d2OXZ35YZOL4+i+UkQdt7LGw=
---
# IoBroker.myvbus
![Logo](../../../en/adapterref/iobroker.myvbus/admin/myvbus.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.myvbus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.myvbus.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/myvbus-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/myvbus-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.myvbus.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.myvbus/badge.svg)
![NPM](https://nodei.co/npm/iobroker.myvbus.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.myvbus/master.svg)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.myvbus.svg)

## IoBroker Adapter für Resol VBus
Dieser Adapter verbindet ioBroker über resol-vbus, eine von Daniel Wippermann bereitgestellte JavaScript-Bibliothek zur Erfassung von RESOL VBus-Daten, mit verschiedenen VBus-basierten Geräten.

<https://github.com/danielwippermann/resol-vbus>

<https://www.npmjs.com/package/resol-vbus>

## Eigenschaften
* Ermöglicht das Lesen der Messdaten von verschiedenen RESOL (R) VBus (R) -Geräten - vorzugsweise Solar- und Systemsteuerungen der DeltaSol (R) -Serie einschließlich eingebauter Wärmemengenmesser (HQM) - mithilfe von DL3- oder DL2-Datenloggern, KM2 Kommunikationsmodule, VBus / LAN-Schnittstellenadapter oder serielle / LAN-Gateways lokal über TCP / IP.
* Der Gerätezugriff über den seriellen VBus / USB-Schnittstellenadapter oder über VBus.net (R) mit DLx / KMx wird ebenfalls unterstützt.
* Verarbeitet Live-VBus-Datenströme und stellt sie als ioBroker-Status zur Verfügung.
* Die Werte werden mit einer konfigurierbaren Zykluszeit aktualisiert.
* Das Lesen oder Einstellen der VBus-Gerätekonfigurationsparameter wird nicht unterstützt. Hierfür sollten die von Resol bereitgestellten Tools verwendet werden, z. über VBus.net oder das Parametrierungstool RPT.
* Das Lesen von DL3-Kanal 0 (Sensoren, die direkt an das DL3-Gerät angeschlossen sind) wird aufgrund von Einschränkungen der DL3-Schnittstelle nicht unterstützt.

## Konfigurationshinweise
* Die Standardeinstellung für den Verbindungstyp ist VBus / LAN, muss jedoch auch für VBus / LAN explizit ausgewählt werden, da sonst keine Verbindung hergestellt wird.
* Die korrekten Einstellungen für den direkten LAN-Zugriff für VBus / LAN, DL3, DL2, KM2 sind:
  * Verbindungstyp: VBus / LAN oder KM2 oder DL2 oder DL3
  * Verbindungskennung: IP-Adresse oder FullyQualifiedHostName (z. B. host1.example.com)
  * VBus-Passwort: YourVBusPassword (Standard: vbus)
  * Verbindungsport: Die Standardeinstellung 7053 sollte nicht geändert werden
  * DL3-Kanal: Nur für DL3 relevant (Werte 1-6, Kanal 0 kann nicht ausgelesen werden)
  * Aktualisierungsintervall: Zeit zwischen Aktualisierungen der aufgezeichneten Werte (Standard 30s)
* Die korrekten Einstellungen für den DL3-, DL2- und KM2-Zugriff über VBus.net sind:
  * Verbindungstyp: DL3 oder DL2 oder KM2
  * Verbindungskennung: vbus.net (oder vbus.io) - beide ohne http:// und Via-Kennung!
  * Verbindungsport: Die Standardeinstellung 7053 sollte nicht geändert werden
  * VBus-Passwort: YourVBusPassword (Standard: vbus)
  * DL3-Kanal: Nur für DL3 relevant (Werte: 1-6, Kanal 0 kann nicht ausgelesen werden)
  * Über die Kennung: d1234567890 - ohne http:// vor oder .vbus.io dahinter
  * Aktualisierungsintervall: Zeit zwischen der Aktualisierung der aufgezeichneten Werte (Standard 30s)

## Rechtliche Hinweise
RESOL, VBus, VBus.net, DeltaSol und andere sind Marken oder eingetragene Marken der RESOL - Elektronische Regelungen GmbH <https://www.resol.de/en>

Alle anderen Marken sind Eigentum ihrer jeweiligen Inhaber.

## Changelog

### 0.0.5

* (pdbjjens) alpha 5 release improved type and role mapping of adapter values

### 0.0.4

* (pdbjjens) alpha 4 release updated dependency on resol-vbus library to 0.21.0

### 0.0.3

* (pdbjjens) alpha 3 release tested with DL3 over local LAN and VBus.net and DeltaSol SLT (0x1001) incl. HQM (0x1011)

### 0.0.2

* (pdbjjens) alpha 2 release tested with VBus/LAN, KM2, VBus.net and DeltaSol E (0x7721 & 0x7722), DeltaSol M (0x7311 & 0x716), DeltaSol CS Plus (0x2211), Oventrop RQXXL (0x7541)

### 0.0.1

* (pdbjjens) initial release tested only with VBus/USB (Serial) and DeltaSol(R) BS2009 (0x427B)

## License

MIT License

Copyright (c) 2020 Jens-Peter Jensen <jjensen@t-online.de>

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