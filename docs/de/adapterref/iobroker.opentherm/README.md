---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.opentherm/README.md
title: Opentherm Integration ioBroker
hash: dV68z48hIK6slmvwYtJBYgqJisH12SBBQutKPvgOihk=
---
![Alt-Text](https://raw.githubusercontent.com/DutchmanNL/ioBroker.opentherm/master/admin/opentherm_large.png)

![Alt-Text](https://travis-ci.org/iobroker-community-adapters/ioBroker.opentherm.svg?branch=master)
![Anzahl der Installationen](http://iobroker.live/badges/opentherm-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.opentherm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.opentherm.svg)

# Opentherm-Integration ioBroker
[![Greenkeeper-Abzeichen] (https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.opentherm.svg)](https://greenkeeper.io/)

Dieser Adapter integriert alle Funktionen des opentherm Gateways in ioBroker.
Opentherm ist ein Gateway-Protokoll, das von mehreren modernen Heizungssystemen wie Remeha verwendet wird.

Weitere Informationen finden Sie unter http://otgw.tclcode.com/index.html#intro mit allen Credits an die Entwickler.

### Featured Funktionalität im Endzustand:
* Stellen Sie einen TCP / IP-Relay-Server bereit, um die Verbindung anderer OpenTherm-Monitorsoftware durch diese Instanz zu ermöglichen (wenn eine direkte USB-Verbindung verwendet wird).
* Passen Sie nach Möglichkeit die Werte in ioBroker an und senden Sie den Befehl an Opentherm
* Bitte zögern Sie nicht, Funktionsanfragen hinzuzufügen

Derzeit implementiert
* Verbinden Sie sich per TCP / IP mit dem OpenTherm Gateway
* Stellen Sie eine direkte Verbindung mit OpenTherm Gateway über eine USB-Verbindung her

## Machen
* Verbinden Sie sich über eine USB-Verbindung direkt mit dem OpenTherm Gateway
* Stellen Sie einen TCP / IP-Relay-Server bereit, um die Verbindung anderer OpenTherm-Monitorsoftware durch diese Instanz zu ermöglichen (wenn eine direkte USB-Verbindung verwendet wird).
* Woher

0.1.9
* Direkte Verbindung per USB implementiert
* Konfigurationsoptionen zu Adaptereinstellungen hinzugefügt
* Problem mit falscher Protokollierung behoben

0.1.8
* Problem mit falschem Objekttyp behoben (boolean / number / string)
* Rundungsstatus auf 1 Stelle nach Komma implementiert

0,1,1
* Implementierter Entwicklermodus (alle Status für alle Nachrichtentypen werden in _Dev erstellt.)
* Implementierter Entwicklerprotokollierungsmodus (wenn nicht aktiviert, werden keine Informationen in das Protokoll geschrieben!)
* Einige kleine Backend-Korrekturen

0,1,6
* Erstellung von logischen Kanälen
* Schaffung von Staaten
* Reduzierte Protokollierung, alle empfangenen Nachrichten sind während der Betaversion zur Datenerfassung noch im Protokoll
* Erstellung der Definitionsdatei (bitte geben Sie Ihre Eingabe ein)

0,1,0
* Lesen von Daten per TCP-Verbindung zur Protokolldatei

### 0.0.1
* (Holländer) erstes Commit

## License
MIT License

Copyright (c) 2018 Dutchman

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