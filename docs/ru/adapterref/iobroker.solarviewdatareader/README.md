---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solarviewdatareader/README.md
title: ioBroker.solarviewdatareader
hash: N2WdT+EmCQqXeNw1uSS9qyLsRAmJtIdcT7DfxuwaPkk=
---
![логотип](../../../en/adapterref/iobroker.solarviewdatareader/admin/solarviewdatareader.png)

![Количество установок](http://iobroker.live/badges/solarviewdatareader-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.solarviewdatareader.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solarviewdatareader.svg)
![Статус зависимости](https://img.shields.io/david/afuerhoff/iobroker.solarviewdatareader.svg)
![Известные уязвимости](https://snyk.io/test/github/afuerhoff/ioBroker.solarviewdatareader/badge.svg)
![NPM](https://nodei.co/npm/iobroker.solarviewdatareader.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/afuerhoff/ioBroker.solarviewdatareader/master.svg)

# IoBroker.solarviewdatareader
## Переходник solarviewdatareader для ioBroker
Адаптер считывает данные из регистратора данных Solarview.
Здесь вы можете найти дополнительную информацию о Solarview: https://www.solarview.info/solarlogger.aspx

## Конфигурация
### IP-адрес, порт
Чтобы получить данные из регистратора данных, вы должны ввести ip-адрес и порт. Стандартный порт 15000. Пожалуйста, обратитесь к документации Solarview.

### D0 конвертер
Если у вас есть преобразователь D0, подключенный к регистратору данных Solarview, вы можете включить эту опцию.

### Счетчик собственного потребления от 1 до 5
Если у вас есть счетчик S0, вы можете включить эту опцию.

### Инвертор с 1 по 4
Каждый инвертор вы можете включить отдельно.

### Интервал, начало интервала, конец интервала
Здесь вы можете настроить диапазон времени и интервал.

### Установить системную переменную CCU, Системная переменная
Это особенность гомеатической CCU. Вы можете определить системную переменную в CCU.
В этой системной переменной фактическое значение PAC сохраняется.

## Changelog

### 0.2.0
* (Achim Fürhoff) Error handling optimized, self consumption meter implemented
### 0.1.0
* (Achim Fürhoff) optimizations for adding to latest repository
### 0.0.5
* (Achim Fürhoff) Code optimized, unload optimized, documentation added 
### 0.0.4
* (Achim Fürhoff) Objects, Telnet client and checksum calculation changed
### 0.0.3
* (Achim Fürhoff) inverter selection added
### 0.0.2
* (Achim Fürhoff) test version
### 0.0.1
* (Achim Fürhoff) initial release

## License
MIT License

Copyright (c) 2020 Achim Fürhoff <achim.fuerhoff@outlook.de>
Copyright (c) 2019 Achim Fürhoff

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