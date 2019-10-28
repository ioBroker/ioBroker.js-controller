---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.odl/README.md
title: ioBroker.odl
hash: H5fyN1RuHeliTOBjqcsslN26lzSo+94apsqwNiURV7U=
---
![логотип](../../../en/adapterref/iobroker.odl/admin/odl.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.odl.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.odl.svg)
![Статус зависимости](https://img.shields.io/david/crycode-de/iobroker.odl.svg)
![Известные уязвимости](https://snyk.io/test/github/crycode-de/ioBroker.odl/badge.svg)
![NPM](https://nodei.co/npm/iobroker.odl.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/crycode-de/ioBroker.odl/master.svg)

# IoBroker.odl
## Адаптер ODL для ioBroker
Этот адаптер интегрирует значения ODL (Ortsdosisleistung / Ambient Dose Rate) указанных точек измерения немецкого [Федеральное ведомство по радиационной защите (Bundesamt für Strahlenschutz, BfS)](https://www.bfs.de/) в ioBroker.

Для получения дополнительной информации о мощности амбиентной дозы в Германии посетите сайт https://odlinfo.bfs.de/.

---

Dieser Adapter Interiert die ODL (Ortsdosisleistung) Messwerte vus ausgewählten Messstellen des [Bundesamtes für Strahlenschutz (BfS)](https://www.bfs.de/) в ioBroker.

Das bundesweite Messnetz des BfS umfasst rund 1800 ortsfeste Messstellen, постоянно действующий в рамках Ort aktuelle Gamma-Umweltradioaktivität (Ortsdosisleistung) erfassen und aufzeichnen. Die gewonnenen Messdaten werden vom BfS gesammelt, ausgewertet und öffentlich unter der _Datenlizenz Deutschland_ zur Verfügung gestellt.

Для получения дополнительной информации обратитесь к https://odlinfo.bfs.de/.

Dieser Adapter läd die aktuellen und Historischen 1-Stunden-Mittelwerte der Messdaten direkt über einen Web Feature Service (WFS) des [Геопорталс де BfS](https://www.imis.bfs.de/geoportal/). Das BfS is Urheber der vom Adapter verwendeten Daten.
Wird ein aktivierter History-Adapter (history, effxdb oder sql) erkannt, dann werden gegebenenfalls in the Historie fehlende Datenpunkte durch den Adapter Автоматизированный начальный этап, sodass sich vollständige Zeitreihen ergeben.

Die aktuellen Messdaten werden von dem Адаптер стандартного исполнения в актуальном состоянии. Эйн Герингерер Aktualisierungsintervall ist meist nicht sinnvoll, da die zu Grunde liegenden Messdaten auf dem BfS-Server (abhängig von der Messstelle) größtenteils stündlich aktualisiert werden.

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