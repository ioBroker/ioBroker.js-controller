---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.luxtronik1/README.md
title: ioBroker.luxtronik1
hash: 8VsZ+suZ2Fy8U0hoAC5hdTXvDK5IZFzfcf4ATnaqn60=
---
![логотип](../../../en/adapterref/iobroker.luxtronik1/admin/luxtronik1.png)

![Количество установок](http://iobroker.live/badges/luxtronik1-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.luxtronik1.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.luxtronik1.svg)
![NPM](https://nodei.co/npm/iobroker.luxtronik1.png?downloads=true)
![Значок Greenkeeper](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.luxtronik1.svg)

# IoBroker.luxtronik1
Адаптер ioBroker для Luxtronik 1 - тепловые насосы - контроллеры (то есть Alpha Innotec, Siemens ...)

Установите адаптер, создайте экземпляр.
Установите аппаратное обеспечение: то есть адаптер RS232-LAN к последовательному интерфейсу (RS232) основного разъема тепловых насосов.
Спецификации: последовательный кабель: связать PINS 2, 3 и 5 (если он не работает, поменяйте контакты 2 и 3) Преобразователь RS232 в LAN: то есть USR TCP232 - 302.
Настройки последовательного интерфейса: 57600/8 / N / 1, режим: время ожидания сброса TCP-сервера: 0

Установить comfoair - IP-адрес, порт и опрос - intervall

Испытано на тепловых насосах luxtronik 1 и AlphaInnotec

Читает различные значения и характеристики вашего теплового насоса (температуры, ошибки, время работы, ...).
Управляет Luxtronik 1, устанавливая значения в «control» - канале. Управляет следующими значениями:

- Горячая вода - установка температуры
- Отопление - режим
- Горячая вода - режим
- Кривая отопления (разница, конечная точка, начальная точка, ночное сокращение).

Значения в 'control' - канале должны быть установлены с помощью ack = false, чтобы инициировать действие.

## Changelog

### 0.1.0

-   error-handling on communication errors optimized, adapter restart in case of multiple communication errors.

### 0.0.7

-   error-handling on connections added.

### 0.0.6

-   diminished risk of multiple connection, small bugfixes

### 0.0.5

-   controls hotwater-temperature, heating- & hotwater - mode and heating-curve setting.

### 0.0.4

-   error - handling optimized

### 0.0.3

-   Reads mode heating, water and heating-curve

### 0.0.2

-   First published version

### 0.0.1

-   In development stage

## License

The MIT License (MIT)

Copyright (c) 2018-2019 forelleblau marceladam@gmx.ch

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