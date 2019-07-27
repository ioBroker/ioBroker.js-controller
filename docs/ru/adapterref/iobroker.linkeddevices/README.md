---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.linkeddevices/README.md
title: без названия
hash: 5iPnnZJG/j2E5kYMQgXXzJCv7PFT9Oyp9RSMOwddB/w=
---
![Версия NPM](http://img.shields.io/npm/v/iobroker.linkeddevices.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.linkeddevices.svg)
![Количество установок](http://iobroker.live/badges/linkeddevices-installed.svg)
![Статус зависимости](https://img.shields.io/david/Scrounger/iobroker.linkeddevices.svg)
![Известные уязвимости](https://snyk.io/test/github/Scrounger/ioBroker.linkeddevices/badge.svg)
![NPM](https://nodei.co/npm/iobroker.linkeddevices.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/Scrounger/ioBroker.linkeddevices/master.svg)

<h1><img src="admin/linkeddevices.png" width="32"/> ioBroker.linkeddevices </h1>

## Адаптер связанных устройств для ioBroker
[![PayPal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YHPPW474N5CKQ&source=url)

Связанные устройства создают связанные объекты (точки данных) устройств с определенной структурой. Это позволяет создать структуру в ioBroker, где все объекты централизованы, например, для использования в представлениях или сценариях. Это дает, например, преимущество в том, что при аппаратном обмене должны быть воссозданы только связанные объекты, и все виды представлений и сценарии снова будут работать.

С помощью адаптера вы также можете конвертировать объекты или преобразовывать их в другие типы (еще не полностью реализованные).

![Strukture](../../../en/adapterref/iobroker.linkeddevices/screenshots/structure.png)

Этот адаптер вдохновлен [скрипт виртуальных устройств от Pman](https://forum.iobroker.net/topic/7751/virtual-devices).

## Конфигурация
* [Английское описание] (doc / en / README.md)
* [deutsche Beschreibung] (doc / de / README.md)

## Changelog

### 0.3.0
* (Scrounger) linked devices overview added to adapter configuration
* (Scrounger) bug fixes

### 0.2.1
* (Scrounger) boolean to string converter added
* (Scrounger) bug fixes

### 0.2.0
* (Scrounger) number to boolean converter added
* (Scrounger) number expert settings for min, max added
* (Scrounger) bug fixes

### 0.1.5
* (Scrounger) expert settings properties renamed -> you must recreate your expert settings for all parent objects !!!
* (Scrounger) custom dialog prepared for convert to other type
* (Scrounger) bug fixes

### 0.1.0
* (Scrounger) custom dialog layout changed
* (Scrounger) conversion bug fixes
* (Scrounger) change unit bug fixes

### 0.0.4
* (Scrounger) main function added
* (Scrounger) change unit for linked objects
* (Scrounger) set number of decimal places for linked objects
* (Scrounger) set conversion for read only linked objects

### 0.0.1
* (Scrounger) initial release

## License
MIT License

Copyright (c) 2019 Scrounger

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