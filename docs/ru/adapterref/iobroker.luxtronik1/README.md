---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.luxtronik1/README.md
title: ioBroker.luxtronik1
hash: TT0lYMaugEBCLZTuZjl4ZHvVk+OeeEtLuxV35Z5MYMY=
---
![Логотип](../../../en/adapterref/iobroker.luxtronik1/admin/luxtronik1.png)

![Количество установок](http://iobroker.live/badges/luxtronik1-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.luxtronik1.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.luxtronik1.svg)
![НПМ](https://nodei.co/npm/iobroker.luxtronik1.png?downloads=true)

# IoBroker.luxtronik1
Адаптер ioBroker для Luxtronik 1 - тепловой насос - контроллеры (например, Alpha Innotec, Siemens ...)

Установите адаптер, создайте экземпляр.
Установите оборудование: например, адаптер RS232 - LAN к последовательному интерфейсу (RS232) основной платы теплового насоса.
Технические характеристики: последовательный кабель: соедините контакты 2, 3 и 5 (если он не работает, замените контакты 2 и 3) Преобразователь RS232 в LAN: например, USR TCP232 - 302.
Настройки последовательного интерфейса: 57600/8 / N / 1, Режим: Тайм-аут сброса TCP-сервера: 0

Установить luxtronik - IP-адрес, порт и опрос - интервал

Протестировано на тепловом насосе luxtronik 1 и AlphaInnotec

Считывает различные значения и статистику вашего теплового насоса (температуры, ошибки, время работы, ...).
Управляет Luxtronik 1, задавая значения в «контрольном» канале. Управляет следующими значениями:

- Горячая вода - настройка температуры
- Отопление - режим
- Горячая вода - режим
- Отопление - кривая (разница, конечная точка, начальная точка, ночная редукция).
- Гистерезис горячей воды
- Гистерезис подогрева

Значения в «контрольном» канале должны быть установлены с ack = false для запуска действия.

## Changelog

### 0.3.0

- info on temperature - settings and hysteresis - control added

### 0.2.7

-   status-info added.

### 0.2.6

-   input-data and timers (Eingänge & Ablaufzeiten) added.

### 0.2.5

-   outlet-data added by @pingus01.

### 0.2.4

-   comm-errors fixed, 'control'-values are updated now.

### 0.2.3

-   adapter - restart in case of connection - problems added.

### 0.2.2

-   .npmignore and .gitignore added, small bugfix.

### 0.2.1

-   Readme / License update.

### 0.2.0

-   missing temperature values added, displays now all available temperature values.

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

Copyright (c) 2018-2021 forelleblau marceladam@gmx.ch

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