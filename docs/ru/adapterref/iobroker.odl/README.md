---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.odl/README.md
title: ioBroker.odl
hash: Jts9Oc6Ce70T3TKN1f7AohQAa4ZawDryzULKAbAkGsY=
---
![Логотип](../../../en/adapterref/iobroker.odl/admin/odl.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.odl.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.odl.svg)
![Количество установок (последнее)](https://iobroker.live/badges/odl-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/odl-stable.svg)
![Статус зависимости](https://img.shields.io/david/crycode-de/iobroker.odl.svg)
![NPM](https://nodei.co/npm/iobroker.odl.png?downloads=true)

# IoBroker.odl
** Тесты: ** ![Тестирование и выпуск](https://github.com/crycode-de/iobroker.odl/workflows/Test%20and%20Release/badge.svg)

## ODL адаптер для ioBroker
Этот адаптер интегрирует значения ODL (Ortsdosisleistung / Ambient Dose Rate) в указанных точках измерения немецкого [Федеральное ведомство по радиационной защите (Bundesamt für Strahlenschutz, BfS)](https://www.bfs.de/) в ioBroker.

Для получения дополнительной информации о мощности амбиентной дозы в Германии посетите сайт https://odlinfo.bfs.de/.

---

Dieser Adapter integriert die ODL (Ortsdosisleistung) Messwerte von ausgewählten Messstellen des [Bundesamtes für Strahlenschutz (BfS)](https://www.bfs.de/) в ioBroker.

Das bundesweite Messnetz des BfS umfasst rund 1800 ortsfeste Messstellen, die постоянный умереть в Ort aktuelle Gamma-Umweltradioaktivität (Ortsdosisleistung) erfassen und aufzeichnen. Die gewonnenen Messdaten werden vom BfS gesammelt, ausgewertet und öffentlich unter der _Datenlizenz Deutschland_ zur Verfügung gestellt.

Für weitere Informationen zur ODL siehe https://odlinfo.bfs.de/.

Адаптер Dieser находится в действующем и историческом 1-м офисе с прямым доступом к веб-службе (WFS) в [Геопорталы BFS](https://www.imis.bfs.de/geoportal/). Das BfS ist Urheber der vom Adapter verwendeten Daten.
Wird ein aktivierter History-Adapter (история, приток данных или sql) erkannt, dann werden gegebenenfalls in der Historie fehlende Datenpunkte durch den Adaptor automatisch nachgetragen, sodass sich vollständige Zeitreihen ergeben.

Die aktuellen Messdaten werden von dem Adapter standardmäßig im Stundentakt aktualisiert. Ein geringerer Aktualisierungsintervall ist meist nicht sinnvoll, da die zu Grunde liegenden Messdaten auf dem BfS-Server (abhängig von der Messstelle) größtenteils stündlich aktualisiert werden.

---

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

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