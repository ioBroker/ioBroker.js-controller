---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.odl/README.md
title: ioBroker.odl
hash: Jts9Oc6Ce70T3TKN1f7AohQAa4ZawDryzULKAbAkGsY=
---
![Logo](../../../en/adapterref/iobroker.odl/admin/odl.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.odl.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.odl.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/odl-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/odl-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/crycode-de/iobroker.odl.svg)
![NPM](https://nodei.co/npm/iobroker.odl.png?downloads=true)

# IoBroker.odl
** Tests: ** ![Testen und freigeben](https://github.com/crycode-de/iobroker.odl/workflows/Test%20and%20Release/badge.svg)

## ODL-Adapter für ioBroker
Dieser Adapter integriert die ODL-Werte (Ortsdosisleistung / Ambient Dose Rate) der angegebenen Messpunkte der deutschen [Bundesamt für Strahlenschutz (BfS)](https://www.bfs.de/) in ioBroker.

Weitere Informationen zur Umgebungsdosis in Deutschland finden Sie unter https://odlinfo.bfs.de/.

---

Dieser Adapter hat die ODL (Ortsdosisleistung) Messwerte von arbeits Messstellen des [Bundesamtes für Strahlenschutz (BfS)](https://www.bfs.de/) in ioBroker.

Das bundesweite Messnetz des BfS wird rund 1800 ortsfeste Messstellen, die permanente sterben vor Ort aktuelle Gamma-Umweltradiowirkung (Ortsdosisleistung) gehört und aufzeichnen. Die getroffenen Messdaten werden vom BfS erfahren, gehörtert und sehen unter derDatenlizenz Deutschland zur Verfügung gestellt.

Für weitere Informationen zur ODL siehe https://odlinfo.bfs.de/.

Dieser Adapter läd die neuen und historischen 1-Stunden-Mittelwerte der Messdaten direkt über einen Web Feature Service (WFS) des [Geoportals des BfS](https://www.imis.bfs.de/geoportal/). Das BfS ist Urheber der vom Adapter Verantwortlichen Daten.
Wird ein aktivierter History-Adapter (geschichte, influxdb oder sql) erkannt, dann werden werdenfälle in der Historie fehlende Datenpunkte durch den Adapter erhalten

Die neuen Messdaten werden von dem Adapter standardmäßig im Stundentaktschauen. Ein Aktualer Aktualisierungsintervall ist am meisten nicht erledigt, da die zu Grundeinstellungen Messdaten auf dem BfS-Server werden.

---

** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Changelog

### 1.1.0 (2020-12-21)
* (crycode-de) Added Sentry error reporting
* (crycode-de) Updated dependencies

### 1.0.7 (2020-10-14)
* (crycode-de) Added timeout to force exit the adapter after 10 minutes in case of any problems
* (crycode-de) Updated dependencies

### 1.0.6 (2020-10-01)
* (crycode-de) Hopefully fixed a bug where adapter did not exit as expected
* (crycode-de) Updated dependencies

### 1.0.5 (2020-02-05)
* (crycode-de) Use of `extendObject` to update names of existing objects.

### 1.0.4 (2020-02-03)
* (crycode-de) Updated connectionType and dataSource in io-package.json.

### 1.0.3 (2020-01-23)
* (crycode-de) Added `connectionType` in `io-package.json` and updated dependencies.

### 1.0.2 (2019-10-22)
* (crycode-de) Minimum required js-conntroller version is now 1.5.7

### 1.0.1 (2019-10-14)
* (crycode-de) initial release

## License

Copyright (c) 2019-2020 Peter Müller <peter@crycode.de>

Data (c) [German Federal Office for Radiation Protection (Bundesamt für Strahlenschutz, BfS)](https://www.bfs.de/), [Data licence Germany – attribution – Version 2.0](http://www.govdata.de/dl-de/by-2-0)

### MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.