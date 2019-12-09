---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.worx/README.md
title: ioBroker.worx
hash: flLd7JA0Bb7FWP3vBgHH5/HsmNefVJVTVeyA2Y1UDS0=
---
![логотип](../../../en/adapterref/iobroker.worx/admin/worx.png)

![Количество установок](http://iobroker.live/badges/worx-installed.svg)
![Стабильная версия](http://iobroker.live/badges/worx-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.worx.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.worx.svg)
![Известные уязвимости](https://snyk.io/test/github/iobroker-community-adapter/ioBroker.worx/badge.svg)
![NPM](https://nodei.co/npm/iobroker.worx.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/iobroker-community-adapter/ioBroker.worx/master.svg)

# IoBroker.worx
[![Статус зависимостей] (https://david-dm.org/iobroker-community-adapter/iobroker.worx/status.svg)](https://david-dm.org/iobroker-community-adapter/iobroker.worx)

## WORX адаптер для ioBroker
управление через облако и mqtt

Этот адаптер соединяет ioBroker с вашим Landroid S / M / L через Cloud.
Температура, время кошения, уровень заряда батареи и другие данные считываются из газонокосилки. Адаптер может управлять газонокосилкой, и вы можете изменять параметры конфигурации, например, время косилки.

<img src="admin/worx_ada2.png" alt="рисунок" width="100%"/>

## Настройки
- для подключения к газонокосилке введите адрес электронной почты и пароль от своей учетной записи WORX в конфигурации.
- Задержка срезания кромки: если срез кромки начинается по кривой или изгибу, газонокосилка может потерять провод и остановиться из-за неисправности, или лезвия могут не вращаться. Для этого можно установить начальную точку, в которой начинают вращаться лопасти.

## Changelog
### 1.0.0 (03.12.2019)
* (MeisterTR) bump Version
* (MeisterTR) transfer to community
### 0.4.0 (03.08.2019)
* (MeisterTR) fix multimower
* (MeisterTR) change loglevel
* (MeisterTR) fix online Status

### 0.3.1 (12.06.2019)
* (MeisterTR) add delay for edgecut in config
* (MeisterTR) fix mowtime error

### 0.2.0 (01.06.2019)
* (MeisterTR) add border
* (MeisterTR) fix small errors
* (MeisterTR) code cleanup
### 0.0.1
* (MeisterTR) initial release

## License
MIT License

Copyright (c) 2019 MeisterTR

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