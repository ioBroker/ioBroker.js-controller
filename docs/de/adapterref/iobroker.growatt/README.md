---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.growatt/README.md
title: ioBroker.growatt
hash: 9DQt0xD93CdRjMp2rdZ8KsjvnnGOmlkbDKtjXdmmip8=
---
![Logo](../../../en/adapterref/iobroker.growatt/admin/glogo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.growatt.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.growatt.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/growatt-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/growatt-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/PLCHome/ioBroker.growatt.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/PLCHome/ioBroker.growatt/badge.svg)
![NPM](https://nodei.co/npm/iobroker.growatt.png?downloads=true)

# IoBroker.growatt
## Growatt-Adapter für ioBroker
ioBroker Growatt Adapter zur Kommunikation mit Growatt Shine Server.
Ich bin nicht verbunden.
Normalerweise werden die Daten alle 5 Minuten vom Datenlogger an die Cloud gesendet.
Die Software fragt den Server alle 30 Sekunden ab, damit der Offset nicht zu groß ist.

Nicht alle Anlagentypen sind implementiert.

Derzeit können nur Daten gelesen werden, das Schreiben von Parametern oder das Ändern von Parametern ist nicht möglich.

## Administrator Seite
### Benutzer und Passwort
Bitte geben Sie den Namen und das Passwort ein, die Sie auch in der Shine-App oder im Webportal verwenden.

### Anlagendaten lesen
Dieser Datensatz enthält die gespeicherten Stammdaten

### Statusdaten lesen
Diese Daten sind nicht für alle Pflanzen verfügbar. Dieser Datensatz enthält Live-Daten.

### Gesamtdaten lesen
Dieser Datensatz enthält Aggregationsdaten.

### Gerätedaten lesen
Dieser Datensatz enthält einige Daten vom Gerät. Einige Daten sind auch in den anderen Kategorien verfügbar.

### Wetter lesen
Dieser Datensatz enthält die Wettervorhersage.

## Changelog
### 0.0.9 (05.10.2020)
* (PLCHome) fix no feature 'ADAPTER_AUTO_DECRYPT_NATIVE'

### 0.0.8 (05.10.2020)
* (PLCHome) fix io-package

### 0.0.7 (05.10.2020)
* (PLCHome) with "@iobroker/adapter-core": "^2.4.0", the js-controller dep needs to be >=2.0.0!
* (PLCHome) io-package native defined 5 values, admin sets 7
* (PLCHome) store password encrypted

### 0.0.6 (31.08.2020)
* (PLCHome) translation with ioBroker tool.

### 0.0.5
* (PLCHome) initial release.

### 0.0.1
* (PLCHome) initial release.

## License
MIT License

Copyright (c) 2020 PLCHome <https://github.com/PLCHome>

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