---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.stiebel-isg/README.md
title: ioBroker.stiebel-isg! [Logo] (admin / stiebel-isg.png)
hash: F9wfRq1LCm/pTfUrhSPaeLE7JtedBb3ihJk77eA5DMo=
---
# IoBroker.stiebel-isg ![логотип](../../../en/adapterref/iobroker.stiebel-isg/admin/stiebel-isg.png)

![Количество установок](http://iobroker.live/badges/stiebel-isg-stable.svg)
![Статус сборки](https://api.travis-ci.org/unltdnetworx/ioBroker.stiebel-isg.svg?branch=master)
![Версия NPM](https://img.shields.io/npm/v/iobroker.stiebel-isg.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.stiebel-isg.svg)
![NPM](https://nodei.co/npm/iobroker.stiebel-isg.png?downloads=true)

=================

Этот адаптер предназначен для считывания значений из шлюзов интернет-услуг stiebel-eltron / tecalor и управления устройством.

ИСПОЛЬЗУЙТЕ НА СВОЙ РИСК!!! АБСОЛЮТНО НЕТ ГАРАНТИИ НА УЩЕРБ, ETC. !!!

Помощь или советы приветствуются.

## Шаги
1. Установите adpater

2. Возьмите значения из вашего объекта. [X] -объект.

## Требования
* Интернет-шлюз stiebel-eltron / tecalor (ISG)

## Пожертвовать
Kaffee тратят / подают кофе <https://paypal.me/unltdnetworx>

## Changelog

### 1.4.11

* support for further heatingtyp WPL25A

### 1.4.10

* bugfix for group definitons

### 1.4.9

* bug in rounding for info-values fixed

### 1.4.8

* update due to security vulnerabilities in dependencies

### 1.4.7

* update due to security vulnerabilities in dependencies

### 1.4.6

* bugfix for some boolean-values

### 1.4.5

* bugfix for false state for boolean-values

### 1.4.4

* bugfix for error handling

### 1.4.3

* Timeout of 5 seconds for sending commands to gather multiple commands to reduce the load of the ISG
* Timeout for pulling deleted

### 1.4.2

* Timeout of 10 seconds for pulling settings after multiple commands to reduce the load of the ISG

### 1.4.1

* Core Files/Testing Update and introduce adapter-core

### 1.4.0

* expert-values can be pulled/written

### 1.3.2

* bugfix: 0 is now recognized

### 1.3.1

* reboot-option added

### 1.3.0

* support for compact-mode added

### 1.2.4

* bug repaired: unnecessary space characters in units removed

### 1.2.3

* bug repaired: ignore hidden fields in some heatings

### 1.2.2

* additional values available, like filter-lifetime

### 1.2.1

* according to a problem with the history-adapter, umlauts can now be deactivated

### 1.2.0

* status for photovoltaik and device included

### 1.1.1

* bugfix for controls-menu

### 1.1.0

* Energymanagment added (ISG plus required)

## License

The MIT License (MIT)

Copyright (c) 2018-2019 Michael Schuster <development@unltd-networx.de>

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