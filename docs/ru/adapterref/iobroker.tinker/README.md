---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tinker/README.md
title: ioBroker.tinker
hash: JEPSSK8ggpw+2f3PKk6ehT+Aenx/6AA5+dciOw/uXoI=
---
![логотип](../../../en/adapterref/iobroker.tinker/admin/tinker.png)

![Количество установок](http://iobroker.live/badges/tinker-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.tinker.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tinker.svg)
![NPM](https://nodei.co/npm/iobroker.tinker.png?downloads=true)

# IoBroker.tinker
===================

Адаптер Tinker Board Monitor является модифицированной версией адаптера Raspberry PI Monitor и адаптера OrangePi Monitor для ioBroker

** Если вам это нравится, пожалуйста, рассмотрите пожертвование: **

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q4EEXQ6U96ZTQ&source=url)

### Важная информация
протестированное оборудование: Asus Tinker Board

### Следующие объекты доступны после выбора:
## *ЦПУ*
- cpu_frequency
- load1
- нагрузка5
- нагрузка15

## *Память*
- память доступна
- память_свободная
- memory_total

## *Сеть (eth0)*
- net_received
- net_send

## *SD Card*
- sdcard_root_total
- sdcard_root_used

## *Поменять местами*
- swap_total
- swap_used

## *Температура*
- soc_temp

## *Время работы*
- время работы

## *WLAN*
- wifi_received
- wifi_send

## Конфигурация
На странице конфигурации вы можете выбрать следующие модули:

- ЦПУ
- Память
- сеть
- SD Card
- Поменять местами
- температура
- время работы
- WLAN

## Changelog

### 0.1.3 (2019-03-14)
* (simatec) Ready for latest

### 0.1.1 (2019-01-08)
* Fix for new iobroker Installer

### 0.1.0 (2018-07-03)
* First Beta

### 0.0.1 (2018-07-03)
* initial Version

## License

The MIT License (MIT)

Copyright (c) 2019 simatec <nais@gmx.net>

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