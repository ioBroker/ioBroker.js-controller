---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tino/README.md
title: ioBroker.tino
hash: Jsy7pGbLgbQrUXPWGCOXwH9kDfkuCeYCNcl/OjDrB3c=
---
![логотип](../../../en/adapterref/iobroker.tino/admin/tino.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.tino.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tino.svg)
![Статус зависимости](https://img.shields.io/david/bowao/iobroker.tino.svg)
![Известные уязвимости](https://snyk.io/test/github/bowao/ioBroker.tino/badge.svg)
![NPM](https://nodei.co/npm/iobroker.tino.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/bowao/ioBroker.tino/master.svg)

# IoBroker.tino
## Адаптер TiNo для ioBroker
(Немецкая версия см. Ниже)

Чтение беспроводных сенсордат, полученных через TiNo версии 1.01

Беспроводной приемопередатчик и приемник TiNo были разработаны nurazur.

Страница проекта: https://nurazur.wordpress.com/

Github: https://github.com/nurazur/TiNo

TiNo - логическая и последовательная эволюция беспроводных датчиков TinyTX4 / TinyRX4.

* Оптимизированный срок службы батареи (5 лет и более с батареей CR2032)
* оптимизированный диапазон
* оптимизированная безопасность
* оптимизированная простота
* оптимизированная надежность

Датчики автоматически создаются с их идентификатором узла после получения первого сообщения.
Кроме того, соответствующие точки данных смещения создаются в «config», так что значения датчика могут быть скорректированы при необходимости.

Будут созданы следующие точки данных:

* NodeId
* RSSI
* Напряжение батареи
* Счетчик сообщений
* Температура
* Смещение температуры (значение коррекции при необходимости)
* Влажность
* Влажность смещения (корректирующее значение при необходимости)
* Флаги
* FEI
* Температура RFM69
* Biterrors

-------------------------------------------------------------------------------------------

## Адаптер TiNo для ioBroker
Einlesen der vom TiNo Version 1.01 empfangenen Funksensordaten

Der Funksender und -empfänger TiNo wurden von nurazur entwickelt.

Проект-Сайт: https://nurazur.wordpress.com/

Github: https://github.com/nurazur/TiNo

Der TiNo ist die die logische and konsequente Weiterentwicklung der TinyTX4 / TinyRX4 Funksensoren.

* optimierte Batterielebensdauer (5 часов питания для батареи CR2032)
* Optimierte Reichweite
* Optimierte Sicherheit
* Optimierte Einfachheit
* optimierte Zuverlässigkeit

Die Sensoren werden nach dem ersten Nachrichten-Empfang automatisch mit ihrer Node-Id angelegt.
Свернуть все как можно раньше "config" die zugehörigen offset Datenpunkte erstellt, damit die Sensorwerte bei Bedarf korrigiert werden können.

Folgende Datenpunkte werden angelegt:

* NodeId
* RSSI
* Batteriespannung
* Nachrichtenzähler
* Температур
* Смещение температуры (Korrekturwert bei Bedarf)
* Фейхте
* Offset Feuchte (Korrekturwert bei Bedarf)
* Флаги
* FEI
* RFM69 Temperatur
* Biterrors

## Changelog

### 0.0.5
- (bowao) Add datapoints interrupt an heartbeat
- (bowao) Set default baudrate to 38400
- (bowao) Close serialport on unload and cleanup

### 0.0.4
- (bowao) Resize logo

### 0.0.3
- (bowao) Update readme

### 0.0.2
- (nurazur) Add logo

### 0.0.1
- (bowao) initial release

## License
MIT License

Copyright (c) 2019 bowao

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