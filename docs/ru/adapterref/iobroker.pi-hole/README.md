---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pi-hole/README.md
title: ioBroker.pi-hole! [Логотип] (admin / pi-hole.png)
hash: FCNx3Suc9+EPF5ZDlsOuLVsxxLQISMOlUX5P/GY2zTA=
---
# IoBroker.pi-hole ![логотип](../../../en/adapterref/iobroker.pi-hole/admin/pi-hole.png)

![Количество установок](http://iobroker.live/badges/pi-hole-stable.svg)
![Статус сборки](https://api.travis-ci.org/unltdnetworx/ioBroker.pi-hole.svg?branch=master)
![Версия NPM](https://img.shields.io/npm/v/iobroker.pi-hole.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pi-hole.svg)
![NPM](https://nodei.co/npm/iobroker.pi-hole.png?downloads=true)

=================

Этот адаптер предназначен для чтения значений из работающей точки и управления устройством (запуск / остановка).

ИСПОЛЬЗУЙТЕ НА СВОЙ РИСК!!! АБСОЛЮТНО НЕТ ГАРАНТИИ НА УЩЕРБ, ETC. !!!

Помощь или советы приветствуются.

## Шаги
1. Установите adpater

2. Заполните поля адаптера-админа. IP-адрес устройства pi-hole, API-токен, который можно получить из веб-интерфейса администратора устройства pi-hole (Настройки / API / Получить токен), и обязательный интервал для обновления значений пи-дыра (обновить статистику в iobroker))

3. Некоторые из объектов являются json-таблицами, которые вы можете использовать внутри vis.

4. Активируйте фильтр, нажав кнопку «активировать пи-дыру», деактивируйте фильтр, изменив значение «деактивировать пи-дыру» (0 - навсегда, число - количество секунд).

## Требования
* работает пи-дырка

## Пожертвовать
Kaffee тратят / подают кофе <https://paypal.me/unltdnetworx>

## Changelog

### 1.2.2

* (unltdnetworx) bugfix for objecttypes

### 1.2.1

* (unltdnetworx) bugfix for update notification

### 1.2.0

* (unltdnetworx) datapoint for available update

### 1.1.0

* (unltdnetworx) support for ssl-connection

### 1.0.1

* (unltdnetworx) bugfixes

### 1.0.0

* (unltdnetworx) rise of version-number - stable version

### 0.2.1

* (unltdnetworx) small bugfix for storage

### 0.2.0

* (unltdnetworx) cleanup and bugfix for restart and storage

### 0.1.0

* (unltdnetworx) fully working release for LTE_API

### 0.0.1

* (unltdnetworx) initial release

## License

MIT License

Copyright (c) 2020 Michael Schuster

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