---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.stiebel-isg/README.md
title: ioBroker.stiebel-ISG
hash: mensfg/nJ9WetjCgf2Ka6gO8k5XlY9qNxk9LunxJmWA=
---
![логотип](../../../en/adapterref/iobroker.stiebel-isg/admin/stiebel-isg.png)

![Количество установок](http://iobroker.live/badges/stiebel-isg-stable.svg)
![Статус сборки](https://api.travis-ci.org/unltdnetworx/ioBroker.stiebel-isg.svg?branch=master)
![Версия NPM](https://img.shields.io/npm/v/iobroker.stiebel-isg.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.stiebel-isg.svg)
![NPM](https://nodei.co/npm/iobroker.stiebel-isg.png?downloads=true)

# IoBroker.stiebel-isg
=================

Этот адаптер предназначен для чтения значений из шлюзов интернет-услуг stiebel-eltron / tecalor и управления устройством.

ИСПОЛЬЗУЙТЕ НА СВОЙ РИСК!!! АБСОЛЮТНО НЕТ ГАРАНТИИ НА УЩЕРБ, ETC. !!!

Помощь или советы приветствуются.

## Шаги
1. Установите adpater

2. Возьмите значения из вашего объекта. [X] -объект.

## Требования
* Интернет-шлюз stiebel-eltron / teclor (ISG)

## Changelog
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

### 1.0.3
* bugfix in version number

### 1.0.2
* code cleanup

### 1.0.1
* added two new groups for controls, roomtemp 1 and 2

### 1.0.0
* confirmed stable release

### 0.1.0
* release candidate for stable
* additional controles added

### 0.0.1
* initial release

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