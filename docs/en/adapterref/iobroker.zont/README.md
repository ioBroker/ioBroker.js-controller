![Logo](admin/zont.png)

# ioBroker.zont

![Number of Installations](http://iobroker.live/badges/zont-installed.svg) ![Number of Installations](http://iobroker.live/badges/zont-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.zont.svg)](https://www.npmjs.com/package/iobroker.zont)
[![Downloads](https://img.shields.io/npm/dm/iobroker.zont.svg)](https://www.npmjs.com/package/iobroker.zont)
[![Tests](https://travis-ci.org/kirovilya/ioBroker.zont.svg?branch=master)](https://travis-ci.org/kirovilya/ioBroker.zont)

[![NPM](https://nodei.co/npm/iobroker.zont.png?downloads=true)](https://nodei.co/npm/iobroker.zont/)

ioBroker адаптер для сервисов https://zont-online.ru

Адаптер используем Zont-api описанное [здесь](https://zont-online.ru/api/docs/).
Он получает данные об устойствах и сохраняет их как Состояния ioBroker.

Некоторые Состояния могут изменяться пользователем или скриптами ioBroker. Затем они отправляются обратно в сервис Zont:
* thermostat_mode
* thermostat_ext_mode
* thermostat_temp
* guard
* siren
* engine_block
* webasto
* auto_ignition

## История изменений

#### 0.5.3 Обновлена работа H-1 термостата

#### 0.5.2 Первая публичная версия

-----------------

ioBroker adapter for https://zont-online.ru service

Adapter uses Zont-api described [here](https://zont-online.ru/api/docs/).
It get data about devices and store it as many ioBroker States.

Some States can change by user or ioBroker script. Then it send back to Zont service:
* thermostat_mode
* thermostat_ext_mode
* thermostat_temp
* guard
* siren
* engine_block
* webasto
* auto_ignition


## Changelog

#### 0.5.3 Update H-1 thermostat

#### 0.5.2 First public version

---------------

## License
The MIT License (MIT)

Copyright (c) 2017 Kirov Ilya <kirovilya@gmail.com>

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
