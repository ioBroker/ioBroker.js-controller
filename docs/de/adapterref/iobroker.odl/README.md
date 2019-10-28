---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.odl/README.md
title: ioBroker.odl
hash: H5fyN1RuHeliTOBjqcsslN26lzSo+94apsqwNiURV7U=
---
![Logo](../../../en/adapterref/iobroker.odl/admin/odl.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.odl.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.odl.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/crycode-de/iobroker.odl.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/crycode-de/ioBroker.odl/badge.svg)
![NPM](https://nodei.co/npm/iobroker.odl.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/crycode-de/ioBroker.odl/master.svg)

# IoBroker.odl
## ODL-Adapter für ioBroker
Dieser Adapter integriert die ODL-Werte (Ortsdosisleistung / Ambient Dose Rate) der angegebenen Messpunkte des deutschen [Bundesamt für Strahlenschutz (BfS)](https://www.bfs.de/) in ioBroker.

Weitere Informationen zur Umgebungsdosisleistung in Deutschland finden Sie unter https://odlinfo.bfs.de/.

---

Dieser Adapter integriert die ODL (Ortsdosisleistung) Messwerte von ausgewählten Messstellen des [Bundesamt für Strahlenschutz (BfS)](https://www.bfs.de/) in ioBroker.

Das bundesweite Messnetz des BfS umfasst rund 1800 Messstellen, die permanent die aktuelle Gamma-Umweltradioaktivität (Ortsdosisleistung) erfassen und aufzeichnen. Die gewonnenen Messdaten werden vom BfS gesammelt, ausgewertet und öffentlich unter der _Datenlizenz Deutschland_ zur Verfügung gestellt.

Für weitere Informationen zur ODL siehe https://odlinfo.bfs.de/.

This adapter is the current and history 1-hours-average values of the mess data direct about a Web Feature Service (WFS) of the [Geoportals des BfS](https://www.imis.bfs.de/geoportal/). Das BfS ist Urheber der verwendeten Adapterdaten.
Wird ein aktivierter History-Adapter (history, influxdb or sql) erkannt, so werden ggf. in der Historie fehlende Datenpunkte durch den Adapter automatisch nachgetragen, damit sich vollständige Zeitreihen ergeben.

Die aktuellen Messdaten werden von dem Adapter standardmäßig im Stundentakt aktualisiert. In den meisten Fällen ist die Aktualisierung der Messdaten auf dem BfS-Server (abhängig von der Messstelle) nicht sinnvoll.

---

## Changelog
### 1.0.2 (2019-10-xx)
* (Peter Müller) Minimum required js-conntroller version is now 1.5.7

### 1.0.1 (2019-10-14)
* (Peter Müller) initial release

## License

Copyright (c) 2019 Peter Müller <peter@crycode.de>

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