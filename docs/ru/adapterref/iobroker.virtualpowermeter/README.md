---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.virtualpowermeter/README.md
title: без заголовка
hash: LWL1G057vp6UifFgeueZESq/7mD3mWlfnJWE9QcpSGo=
---
![узел](https://img.shields.io/node/v/iobroker.virtualpowermeter.svg)
![Количество установок](http://iobroker.live/badges/virtualpowermeter-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.virtualpowermeter.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.virtualpowermeter.svg)
![Статус зависимости](https://img.shields.io/david/Omega236/iobroker.virtualpowermeter.svg)
![Известные уязвимости](https://snyk.io/test/github/Omega236/ioBroker.virtualpowermeter/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.virtualpowermeter.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/Omega236/ioBroker.virtualpowermeter/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Omega236/ioBroker.virtualpowermeter?branch=master&svg=true)
![Лицензия](https://img.shields.io/npm/l/iobroker.virtualpowermeter.svg)

<h1><img src="admin/virtualpowermeter.png" width="64"/>ioBroker.virtualpowermeter</h1>

## Адаптер virtualpowermeter для ioBroker
Эрцегт Виртуэль Строммессер

Im Smarthome hat man viele Geräte die man zwar schalten kann, diese aber keinen integrierten Powermeter haben (meist Lichter).

Mit diesem Adapter ist das Ziel zu jedem eingestelltem Datenpunkt (über Custom -> MaxWatt (z.B. 60W)) zwei zusätzliche Datenpunkte zu befüllen -> Energy_Power (z.B. 60 Вт) и Energy_Total (z.B. 2501,23 Втч).
Zusätzlich werden Gruppen gebildet (Diese werden unter virtualpowermeter.0.xxx abgelegt) die summe der einzelnen Datenpunkte darstellt

Mit diesen neuen Datenpunkten kann dann eine Einfache Visualiserung durchgeführt werden.

Die neuen Datenpunkte (besonders die Gruppen) könnten super mit valuetrackerovertime weiterverarbeitet werden

Die neuen Datenpunkte für Power und Total werden normal im gleichen Verzeichnis wie die überwachten States abgelegt. Sobald der Pfad einen &quot;.&quot; Enthält Wird das Verzeichnis как Absolut Betrachtet und unter dieser id abgelegt. Hier is sinnvoll die Datenpunkte in das eigene virtualpowermeter.0 abzulegen (aufpassen dass man die Ids nicht doppelt verwendet.) <img src="https://user-images.githubusercontent.com/25373047/104218659-5920eb80-543d-11eb-8e20-774822d489a7.png" />

Beispiel mit valuetrackerovertime:<img src="MeinBeispiel2.jpg" />

## Changelog
### 1.2.2 (2020-12-26
* (Lutz Sebastian) Group Calculations only after InitialFinished
### 1.2.1 (2020-04-15)
* (Lutz Sebastian) translation
### 1.2.0 (2020-04-15)
* (Lutz Sebastian) js-controller 3.x support
### 1.1.1 (2020-04-07)
* (Lutz Sebastian) bugfix translation
### 1.1.0 (2020-04-05)
* (Lutz Sebastian) inverted added
### 1.0.1
* (Lutz Sebastian) SecurityUpdates
### 1.0.0
* (Lutz Sebastian) Final Release
### 0.2.8
* (Lutz Sebastian) Bug found on travis unsubscribeStatesAsync
### 0.2.6
* (Lutz Sebastian) texts adapted
### 0.2.5
* (Lutz Sebastian) awaits missing
### 0.2.4
* (Lutz Sebastian) var remove and SettingPage Info and dic in class and .bind(this) (Template 1.10)
### 0.2.3
* (Lutz Sebastian) CodeOptimierung nach eslint
### 0.2.1
* (Lutz Sebastian) CodeOptimierung und bild
### 0.2.0
* (Lutz Sebastian) Alle Funktionen implementiert, code noch nicht überprüft/optimiert/getestet
### 0.1.0
* (Lutz Sebastian) Erste Version mit Grundfunktionalität
### 0.0.1
* (Lutz Sebastian) initial release

## License
MIT License

Copyright (c) 2021 Lutz Sebastian general.of.omega@googlemail.com

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