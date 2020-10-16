![Logo](admin/odl.png)
# ioBroker.odl

[![NPM version](http://img.shields.io/npm/v/iobroker.odl.svg)](https://www.npmjs.com/package/iobroker.odl)
[![Downloads](https://img.shields.io/npm/dm/iobroker.odl.svg)](https://www.npmjs.com/package/iobroker.odl)
[![Dependency Status](https://img.shields.io/david/crycode-de/iobroker.odl.svg)](https://david-dm.org/crycode-de/iobroker.odl)
[![Known Vulnerabilities](https://snyk.io/test/github/crycode-de/ioBroker.odl/badge.svg)](https://snyk.io/test/github/crycode-de/ioBroker.odl)

[![NPM](https://nodei.co/npm/iobroker.odl.png?downloads=true)](https://nodei.co/npm/iobroker.odl/)

**Tests:** [![Travis-CI](http://img.shields.io/travis/crycode-de/ioBroker.odl/master.svg)](https://travis-ci.org/crycode-de/ioBroker.odl)

## ODL adapter for ioBroker

This adapter integrates the ODL (Ortsdosisleistung / Ambient Dose Rate) values of specified measuring points of the German [Federal Office for Radiation Protection (Bundesamt für Strahlenschutz, BfS)](https://www.bfs.de/) into ioBroker.

For more information about the ambient dose rate in germany visit https://odlinfo.bfs.de/.

---

Dieser Adapter integriert die ODL (Ortsdosisleistung) Messwerte von ausgewählten Messstellen des [Bundesamtes für Strahlenschutz (BfS)](https://www.bfs.de/) in ioBroker.

Das bundesweite Messnetz des BfS umfasst rund 1800 ortsfeste Messstellen, die permanent die vor Ort aktuelle Gamma-Umweltradioaktivität (Ortsdosisleistung) erfassen und aufzeichnen. Die gewonnenen Messdaten werden vom BfS gesammelt, ausgewertet und öffentlich unter der _Datenlizenz Deutschland_ zur Verfügung gestellt.

Für weitere Informationen zur ODL siehe https://odlinfo.bfs.de/.

Dieser Adapter läd die aktuellen und historischen 1-Stunden-Mittelwerte der Messdaten direkt über einen Web Feature Service (WFS) des [Geoportals des BfS](https://www.imis.bfs.de/geoportal/). Das BfS ist Urheber der vom Adapter verwendeten Daten.
Wird ein aktivierter History-Adapter (history, influxdb oder sql) erkannt, dann werden gegebenenfalls in der Historie fehlende Datenpunkte durch den Adapter automatisch nachgetragen, sodass sich vollständige Zeitreihen ergeben.

Die aktuellen Messdaten werden von dem Adapter standardmäßig im Stundentakt aktualisiert. Ein geringerer Aktualisierungsintervall ist meist nicht sinnvoll, da die zu Grunde liegenden Messdaten auf dem BfS-Server (abhängig von der Messstelle) größtenteils stündlich aktualisiert werden.

---


## Changelog
### 1.0.7 (2020-10-14)
* (Peter Müller) Added timeout to force exit the adapter after 10 minutes in case of any problems
* (Peter Müller) Updated dependencies

### 1.0.6 (2020-10-01)
* (Peter Müller) Hopefully fixed a bug where adapter did not exit as expected
* (Peter Müller) Updated dependencies

### 1.0.5 (2020-02-05)
* (Peter Müller) Use of `extendObject` to update names of existing objects.

### 1.0.4 (2020-02-03)
* (Peter Müller) Updated connectionType and dataSource in io-package.json.

### 1.0.3 (2020-01-23)
* (Peter Müller) Added `connectionType` in `io-package.json` and updated dependencies.

### 1.0.2 (2019-10-22)
* (Peter Müller) Minimum required js-conntroller version is now 1.5.7

### 1.0.1 (2019-10-14)
* (Peter Müller) initial release


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
