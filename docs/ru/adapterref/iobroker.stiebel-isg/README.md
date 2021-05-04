---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.stiebel-isg/README.md
title: ioBroker.stiebel-isg
hash: iyF0ZWK88/WwUlksouiJrRJoAU/ZMAs2UqiVj+jo/Co=
---
![Логотип](../../../en/adapterref/iobroker.stiebel-isg/admin/stiebel-isg.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.stiebel-isg.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.stiebel-isg.svg)
![Количество установок (последнее)](https://iobroker.live/badges/stiebel-isg-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/stiebel-isg-stable.svg)
![Статус зависимости](https://img.shields.io/david/unltdnetworx/iobroker.stiebel-isg.svg)
![НПМ](https://nodei.co/npm/iobroker.stiebel-isg.png?downloads=true)

# IoBroker.stiebel-isg
** Тесты: ** ![Тестирование и выпуск](https://github.com/unltdnetworx/ioBroker.stiebel-isg/workflows/Test%20and%20Release/badge.svg)

## Адаптер stiebel-isg для ioBroker
Этот адаптер предназначен для считывания значений со шлюзов интернет-сервисов stiebel-eltron / tecalor (ISG) и управления устройством.

ИСПОЛЬЗУЙТЕ НА СВОЙ РИСК!!! АБСОЛЮТНО ОТСУТСТВИЕ ГАРАНТИЙ НА УБЫТКИ И Т.П. !!!

Помощь или подсказки приветствуются.

## Пожертвовать
Каффи тратишь / подай кофе <https://paypal.me/unltdnetworx>

## Шаги
1. Установите адпатер

2. Возьмите значения из вашего stiebel-isg. [X] -объекта.

## Требования
* шлюз интернет-услуг stiebel-eltron / tecalor (ISG)

## Changelog

### 1.7.0

* new adapter structure, bugfixes for new js-controller

### 1.6.0

* new values for isg-version 12 implemented

### 1.6.1

* isg-sites to read values from, can now be select by the user

### 1.5.3

* bugfix for latest_value added in statistics for database

### 1.5.2

* latest_value added in statistics for database

### 1.5.1

* new adapter testing and security update

### 1.5.0

* support for cooling values and startpage graphs

### 1.4.11

* support for further heatingtyp WPL25A

## License
MIT License

Copyright (c) 2018-2021 Michael Schuster <development@unltd-networx.de>

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