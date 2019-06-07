---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.schoolfree/README.md
title: ioBroker.schoolfree
hash: aAgpzMQSPRFzfXLU6vJ8g9hjY9lngmIhTi6UkHFu6Jo=
---
![логотип](../../../en/adapterref/iobroker.schoolfree/admin/schoolfree.png)

![Количество установок](http://iobroker.live/badges/schoolfree-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.schoolfree.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.schoolfree.svg)
![Статус зависимости](https://img.shields.io/david/simatec/iobroker.schoolfree.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.schoolfree/badge.svg)
![Трэвис-CI](http://img.shields.io/travis/simatec/ioBroker.schoolfree/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/simatec/ioBroker.schoolfree?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.schoolfree.png?downloads=true)

# IoBroker.schoolfree
## Школьный адаптер для ioBroker
### Deutsche Beschreibung:
Schoolfree ist ein Adapter for iobroker Installationen.
Mit dem Adapter lassen sich die Schulferien auswerten und in Datenpunkte übergeben.
Die Datenpunkte können somit für weitere Funktionen wie Heizungssteuerungen, Rolladen- und Anwesenheitssteuerungen ausgewertet and verarbeitet werden.

Der aktuelle Bezug von Terminen für die Schulferien erfolgt über die API von https://www.mehr-schulferien.de

Aktuell werden die Schulferien und freien Tage für Deutschland unterstützt.

Folgende Datenpunkte stehen mit Schoolfree für die weitere Verarbeitung zur Verfügung:

* info.current.end: Datum für das Ende der aktuellen Ferien
* info.current.name: Bezeichnung der aktuellen Schulferien
* info.current.start: Startdatum der aktuellen Ferien
* info.next.end: Datum für das Ende der nächsten Ferien
* info.next.name: Bezeichnung der nächsten Schulferien
* info.next.start: Startdatum der nächsten Ferien
* info.today: Switch für den aktuellen Status heute (true / false)
* info.tuture: Switch für den aktuellen Статус morgen (true / false)

*************************************************************************************************************************************

### Английское описание:
Schoolfree - это адаптер для установки iobroker.
С помощью адаптера можно оценить школьные каникулы и перенести их в точки данных.
Таким образом, точки данных могут быть оценены и обработаны для других функций, таких как управление обогревом, затвор и контроль присутствия.

Текущая подписка на школьные каникулы осуществляется через API https://www.mehr-schulferien.de.

В настоящее время школьные каникулы и выходные для Германии поддерживаются.

Следующие данные доступны для дальнейшей обработки с Schoolfree:

* info.current.end: дата окончания текущих праздников
* info.current.name: название текущих школьных каникул
* info.current.start: дата начала текущего праздника
* info.next.end: дата окончания следующих праздников
* info.next.name: название следующих школьных каникул
* info.next.start: дата начала следующего отпуска
* info.today: переключиться на текущий статус сегодня (true / false)
* info.tщё: переключение на текущий статус завтра (true / false)

*************************************************************************************************************************************

## Changelog

### 0.2.2 (04.06.2019)
* (simatec)new object structure

### 0.2.1 (14.05.2019)
* (simatec) fix travis and appveyor

### 0.2.0 (13.05.2019)
* (simatec) Add Objects for next school holiday
* (simatec) cleaned code

### 0.1.0 (10.05.2019)
* (simatec) First Beta

### 0.0.1 (08.05.2019)
* (simatec) initial release

*************************************************************************************************************************************

## License
MIT License

Copyright (c) 2019 simatec

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