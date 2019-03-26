---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sma-em/README.md
title: ioBroker.sma-эм
hash: hYAOnhOsemUQz9HSTF5sjJflyv6TVEBPYbiF2JcCYnY=
---
![логотип](../../../en/adapterref/iobroker.sma-em/admin/sma-em.png)

![Количество установок](http://iobroker.live/badges/sma-em-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sma-em.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sma-em.svg)
![тесты](https://travis-ci.org/CTJaeger/ioBroker.sma-em.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sma-em.png?downloads=true)

# IoBroker.sma-em =================
### Информация
Этот адаптер считывает информацию с SMA Energy Meter и SMA Home Manager 2.

### Состояния
- Общая и счетчик активной мощности, реактивной мощности, полной мощности
- cosphi, полное гармоническое искажение, напряжение
- Подробно Каждая из 3 фаз в отношении активной мощности, реактивной мощности, полной мощности, cosphi, силы тока, напряжения
- Подробно Каждая из 3 фаз с избытком активной мощности, реактивной мощности, полной мощности, cosphi, Amperage, Voltage
- Подробно Каждая из трех фаз счетчика
- Серийный номер счетчика энергии SMA

### Опции
- Варианты выбора для каждой отдельной фазы L1 / L2 / L3
- Выбор не расширенного режима для общего и счетчика активной мощности
- Выбор расширенного режима для реактивной мощности, полной мощности, cosphi, Amperage, Voltage (требуется больше вычислительной мощности)

### Папка-структура
- L1 - Фаза 1
- L2 - Фаза 2
- L3 - Фаза 3

### Состояния-Структура
Пример:

pregard P-активная мощность / отношение qregard Q-реактивная мощность / отношение sregard S-полная мощность / отношение

psurplus P-активная мощность / избыток qsurplus Q-реактивная сила / избыток ssurplus S-видимая мощность / избыток

## Changelog

### 0.5.3
* (Marcolotti) Fix units 

### 0.5.2
* (Marcolotti) support of more than one energy meter 

### 0.5.1
* (Marcolotti) Add Option for extended Mode
* (Marcolotti) Remove Option for Poll
* (Marcolotti) several fixes

### 0.5.0
* (Bluefox) Optimize Performance

### 0.0.2
* (Marcolotti) Add options for detailed View of L1, L2, L3
* (Marcolotti) Bugfixes
* (Bluefox) Optimize Performance
* (Apollon77) Clean Template

### 0.0.1
* (Marcolotti) initial release

## License
The MIT License (MIT)

Copyright (c) 2017 Marcolotti <info@ct-j.de>

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