---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.luxtronik1/README.md
title: ioBroker.luxtronik1
hash: dtJxhyPKy8uUbDfthaxzW7LDafKlcLlV2d+sXBsDOc4=
---
![логотип](../../../en/adapterref/iobroker.luxtronik1/admin/luxtronik1.png)

![Количество установок](http://iobroker.live/badges/luxtronik1-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.luxtronik1.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.luxtronik1.svg)
![NPM](https://nodei.co/npm/iobroker.luxtronik1.png?downloads=true)

# IoBroker.luxtronik1
Адаптер ioBroker для Luxtronik 1 - тепловые насосы - контроллеры (то есть Alpha Innotec, Siemens ...)

Установите адаптер, создайте экземпляр.
Установите аппаратное обеспечение: то есть адаптер RS232-LAN к последовательному интерфейсу (RS232) основного кабеля тепловых насосов.
Характеристики: последовательный кабель: связь PINS 2, 3 и 5 (если она не работает, поменяйте контакты 2 и 3). Преобразователь RS232 в LAN: USR TCP232 - 302.
Настройки последовательного интерфейса: 57600/8 / N / 1, режим: время ожидания сброса TCP-сервера: 0

Установить comfoair - IP-адрес, порт и опрос - intervall

Проверено на тепловых насосах luxtronik 1 и AlphaInnotec

Читает различные значения и характеристики вашего теплового насоса (температуры, ошибки, время работы, ...).
Запланировано: функции управления (заданные температуры, кривая нагрева, режим).

## Changelog

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