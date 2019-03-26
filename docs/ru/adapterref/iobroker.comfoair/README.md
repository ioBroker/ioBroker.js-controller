---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.comfoair/README.md
title: ioBroker.comfoair
hash: 6GAu1GeuUy1Oo5FXAaT0gUvgzOqnDZQt1u0x3oIDq0A=
---
![логотип](../../../en/adapterref/iobroker.comfoair/admin/comfoair.png)

![Количество установок](http://iobroker.live/badges/comfoair-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.comfoair.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.comfoair.svg)
![NPM](https://nodei.co/npm/iobroker.comfoair.png?downloads=true)

# IoBroker.comfoair
Адаптер ioBroker для Zehnder Comfoair 'CA' -вентиляций (т.е. ComfoAir CA350, НЕ ComfoAir Q350 ...)

Чтобы использовать этот адаптер, вам понадобится конвертер RS232 в LAN или WiFi, чтобы подключить ioBroker к вашему Zehnder Comfoair.
Установите оборудование для TCP-соединения с comfoair: то есть адаптер RS232-LAN к последовательному интерфейсу comfoair. Подключайте контакты 2, 3 и 5 только (должны работать также с TX, RX и GND - контакты соединения cc-Ease тоже).
На самом деле этот адаптер работает только с LAN-подключением. Прямая связь, основанная на прямом последовательном соединении, находится в стадии разработки.

Установите адаптер, создайте экземпляр.
Установите comfoair - IP-адрес, порт и опрос - intervall.

Значения вашего comfoair теперь должны быть видны в канале «status» и «Temperature».

Устанавливая / изменяя значения в канале «control», вы управляете вентиляцией comfoair.

Может работать, даже если подключена CC-Ease Panel (на свой страх и риск). Хорошо работает, если ccEASE - Панель отключена.

Проверено на comfoair CA350.

## Changelog

### 0.1.2

- ReadME updated, minor bugfixes.

### 0.1.1

-   bugfix ventlevels, reading errors

### 0.1.0

-   ReadME Update

### 0.0.7

-   Core Files/Testing Update and introduce adapter-core

### 0.0.6

-   Filter - change - indicator.

### 0.0.5

-   bugfig set vent levels.

### 0.0.4

-   gets & sets vent levels, gets filter-timer.

### 0.0.3

-   minor bugfixes, sets comfort-temperature and resets filter-hours.

### 0.0.2

-   First running Version. Gets temp, vent, bypass and filter states, sets fan level.

### 0.0.1

-   In development stage, contributions welcome

## License

The MIT License (MIT)

Copyright (c) 2019 forelleblau marceladam@gmx.ch

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.