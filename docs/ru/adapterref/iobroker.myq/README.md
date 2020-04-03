---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.myq/README.md
title: ioBroker.myq
hash: XtssCpy2gfrIRfH+ncNkDuStqrBBsrN1gXDNYL16Ryw=
---
![логотип](../../../en/adapterref/iobroker.myq/admin/myq.png)

![Количество установок](http://iobroker.live/badges/myq-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.myq.svg)
![NPM](https://nodei.co/npm/iobroker.myq.png?downloads=true)
![стабильный](http://iobroker.live/badges/myq-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.myq.svg)
![Статус сборки](https://travis-ci.org/StrathCole/ioBroker.myq.svg?branch=master)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# IoBroker.myq
Адаптер ioBroker для MyQ (Чемберлен / Лифтмастер). Этот проект не имеет никакого отношения к указанным компаниям.
Чтобы начать использовать адаптер, добавьте экземпляр и введите свое имя пользователя и пароль myQ на экране конфигурации.

## Состояния
Не все состояния доступны для всех типов устройств.

`myq.0.devices.<id>.info.MyQDeviceTypeId` - тип устройства в числовой форме. `myq.0.devices.<id>.info.MyQDeviceTypeName` - читаемый человеком тип устройства, например, Gateway или GarageDoorOpener `myq.0.devices.<id>.info.SerialNumber` - Серийный номер устройства `myq.0.devices.<id>.info.desc` - Предоставленное пользователем имя устройства `myq.0.devices.<id>.info.fwver` - Текущая версия прошивки устройства `myq.0.devices.<id>.info.name` - Внутренняя имя устройства (не предоставлено пользователем) `myq.0.devices.<id>.info.numdevices` - (шлюз) Количество подключенных устройств для этого шлюза `myq.0.devices.<id>.info.online` - Устройство в настоящее время подключено к облаку и является доступным `myq.0.devices.<id>.states.IsFirmwareCurrent` - § §SSSSS_9§§, если обновлена прошивка устройства `myq.0.devices.<id>.states.ishomekitactive` - `true`, если для этого устройства активно использование Homekit `myq.0.devices.<id>.states.ishomekitcapable` - `true`, если устройство homekit -capable `myq.0.devices.<id>.states.doorstate` - (дверь гаража) Состояние двери (см. Дверные состояния)

### Дверные состояния
 - 1: дверь открыта
 - 2: дверь закрыта
 - 3: дверь была остановлена
 - 4: дверь открывается
 - 5: дверь закрывается
 - 8: дверь движется
 - 9: дверь в неопределенном состоянии (не закрыта)

## Команды
`myq.0.devices.<id>.commands.close` - Закрыть дверь `myq.0.devices.<id>.commands.open` - Открыть дверь

## Пожертвовать
[![PayPal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

### 0.1.1

-  Code rework and several bugs fixed

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