---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.myvbus/README.md
title: ioBroker.myvbus
hash: yxVtgxq/SxahbvABi0FHjG+ybv/RSx9gFAvbDwQ53fU=
---
# IoBroker.myvbus
![логотип](../../../en/adapterref/iobroker.myvbus/admin/myvbus.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.myvbus.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.myvbus.svg)
![Количество установок (последняя)](http://iobroker.live/badges/myvbus-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/myvbus-stable.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.myvbus.svg)
![Известные уязвимости](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.myvbus/badge.svg)
![NPM](https://nodei.co/npm/iobroker.myvbus.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.myvbus/master.svg)
![Значок Greenkeeper](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.myvbus.svg)

## Адаптер ioBroker для Resol VBus
Этот адаптер ioBroker подключается к различным устройствам на базе VBus через resol-vbus, библиотеку JavaScript для обработки данных RESOL VBus, предоставленных Дэниелом Випперманом.
<https://github.com/danielwippermann/resol-vbus> <https://www.npmjs.com/package/resol-vbus>

## Особенности
* Предоставляет доступ к различным устройствам RESOL (R) VBus (R) с использованием регистраторов данных DL3 или DL2, коммуникационного модуля KM2, адаптера интерфейса VBus / LAN или шлюзов Serial / LAN локально через TCP / IP. Доступ к устройству через интерфейсный адаптер VBus / USB или DLx / KMx через VBus.net (R) также поддерживается.
* Обрабатывает живые потоки данных VBus и делает их доступными как состояния ioBroker.
* Значения обновляются с настраиваемым временем цикла.

## Юридические уведомления
RESOL, VBus, VBus.net, DeltaSol и другие являются товарными знаками или зарегистрированными товарными знаками RESOL - Elektronische Regelungen GmbH.
<https://www.resol.de/en> Все остальные торговые марки являются собственностью их соответствующих владельцев.

## Changelog

### 0.0.1

* (pdbjjens) initial release tested only with VBus/USB (Serial) and DeltaSol(R) BS2009 (0x427B)

## License

MIT License

Copyright (c) 2020 Jens-Peter Jensen <jjensen@t-online.de>

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