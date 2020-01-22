---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rainbird/README.md
title: ioBroker.rainbird
hash: pl7ETPDt8mpHDMW6jIpuDTrXvFaFcAv30MS1+/S+4xI=
---
![логотип](../../../en/adapterref/iobroker.rainbird/admin/rainbird.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.rainbird.svg)
![Статус сборки](https://travis-ci.org/StrathCole/ioBroker.rainbird.svg?branch=master)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# IoBroker.rainbird
Адаптер ioBroker для Rain Bird с адаптером LNK WiFi. Этот проект не имеет никакого отношения к Rain Bird.

Основано на библиотеке python "pyrainbird" с https://github.com/jbarrancos/pyrainbird и полностью перенесено на NodeJS. Адаптер устанавливает прямое соединение с устройством через WiFi-соединение и не использует облачный сервис Rain Bird.

## Состояния
`rainbird.X.device.commands.advanceZone` - Когда работает текущая программа, перейдите к следующей зоне орошения и остановите текущую.
`rainbird.X.device.commands.runProgram` - Запустите указанную программу вручную (от 1 до X), как ранее было настроено в устройстве.
`rainbird.X.device.commands.stopIrrigation` - Немедленно прекратить полив во всех зонах.

`rainbird.X.device.irrigation.active` - Полив в настоящее время активен. Если false, это может означать, что вы установили переключатель на устройстве в положение «Стоп».
`rainbird.X.device.irrigation.station` - Номер зоны, которая орошается в настоящее время.

`rainbird.X.device.sensors.rain` - Истина, если подключен датчик дождя и обнаружен дождь.

`rainbird.X.device.settings.rainDelay` - Текущая задержка полива (в днях), установленная для устройства.

`rainbird.X.device.stations.Y.available` - Истина, если в устройстве доступна зона Y.
`rainbird.X.device.stations.Y.irrigation` - Истина, если зона Y в настоящее время орошается.
`rainbird.X.device.stations.Y.runZone` - Запустите полив вручную в зоне Y на указанное количество минут.
`rainbird.X.device.stations.Y.testZone` - Тестовая зона Y.

## Пожертвовать
[![PayPal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

### 0.1.2

-   Fixed adapter stalling on connection timeout

### 0.1.1

-   Smaller fixes

### 0.1.0

-   First running Version

## License

The MIT License (MIT)

Copyright (c) 2020 Marius Burkard

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