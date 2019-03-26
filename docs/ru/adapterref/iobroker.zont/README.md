---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zont/README.md
title: ioBroker.zont
hash: gal4k00yBlWw5UJ9RlEi/ZtSzgCw7ao2fSu9H1qcmfE=
---
![логотип](../../../en/adapterref/iobroker.zont/admin/zont.png)

![Количество установок](http://iobroker.live/badges/zont-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.zont.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.zont.svg)
![тесты](https://travis-ci.org/kirovilya/ioBroker.zont.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.zont.png?downloads=true)

# IoBroker.zont
ioBroker адаптер для сервисов https://zont-online.ru

Адаптер использовать Zont-api описанное [здесь](https://zont-online.ru/api/docs/).
Он получает данные об оборудовании и сохраняет их как Состояния ioBroker.

IoBroker. Затем они отправляются обратно в сервис Zont:

* thermostat_mode
* thermostat_ext_mode
* thermostat_temp
* охранник
* сирена
* Блок двигателя
* вебасто
* auto_ignition

## История изменений
#### 0.5.3 Обновлена работа H-1 термостата
#### 0.5.2 Первая публичная версия
-----------------

Адаптер ioBroker для сервиса https://zont-online.ru

Адаптер использует Zont-api, описанный [Вот](https://zont-online.ru/api/docs/).
Он получает данные об устройствах и хранит их во многих государствах ioBroker.

Некоторые состояния могут изменяться пользователем или скриптом ioBroker. Затем отправьте обратно в сервис Zont:

* thermostat_mode
* thermostat_ext_mode
* thermostat_temp
* охранник
* сирена
* Блок двигателя
* вебасто
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