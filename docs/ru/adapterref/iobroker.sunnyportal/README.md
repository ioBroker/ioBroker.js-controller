---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sunnyportal/README.md
title: ioBroker.sunnyportal
hash: TMqCdVLk68bgg1DcittqVGvvI5+Y6fTY8WZiIprn2p8=
---
![логотип](../../../en/adapterref/iobroker.sunnyportal/admin/sunnyportal.png)

![Статус сборки](https://travis-ci.org/marvincaspar/ioBroker.sunnyportal.svg?branch=master)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sunnyportal.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sunnyportal.svg)
![Количество установок (последняя)](http://iobroker.live/badges/sunnyportal-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/sunnyportal-stable.svg)
![Статус зависимости](https://img.shields.io/david/marvincaspar/iobroker.sunnyportal.svg)
![Известные уязвимости](https://snyk.io/test/github/marvincaspar/ioBroker.sunnyportal/badge.svg)
![NPM](https://nodei.co/npm/iobroker.sunnyportal.png?downloads=true)

# IoBroker.sunnyportal
![Тест и выпуск](https://github.com/marvincaspar/ioBroker.sunnyportal/workflows/Test%20and%20Release/badge.svg)

## Солнечный портал-адаптер для ioBroker
Получайте текущие данные с Солнечного портала каждую минуту.

### Настройки
![настройки](../../../en/adapterref/iobroker.sunnyportal/./docs/images/settings.png)

### Обзор объекта
![Обзор объекта](../../../en/adapterref/iobroker.sunnyportal/./docs/images/object-overview.png)

## Кредиты
Я основал код на [sunnyportal-апи](https://github.com/mkorthuis/sunnyportal-api/) mkorthuis

## Changelog

### 0.1.5
* (Marvin Caspar) Reduce update interval to 60 seconds

### 0.1.4
* (Marvin Caspar) Rewrite code to fix login issue
* (Marvin Caspar) Add units to ioBroker states

### 0.1.3
* (Marvin Caspar) Fix version

### 0.1.2
* (Marvin Caspar) Fixes for ioBroker repository

### 0.1.1
* (Marvin Caspar) Fix redirect after login
* (Marvin Caspar) Cleanup readme

### 0.1.0
* (Marvin Caspar) Login and fetch current data from sunny portal

### 0.0.1
* (Marvin Caspar) initial release

## License
MIT License

Copyright (c) 2020 Marvin Caspar <info@caspar.dev>

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