---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.meross/README.md
title: ioBroker.meross
hash: pJGQEFLPE5QjV0vaS3+is8H8cMuJ76JaKN0Wjd+Pf1Q=
---
![логотип](../../../en/adapterref/iobroker.meross/admin/meross-logo.png)

![Значок Greenkeeper](https://badges.greenkeeper.io/Apollon77/ioBroker.meross.svg)
![Количество установок](http://iobroker.live/badges/meross-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.meross.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.meross.svg)
![Трэвис-CI](http://img.shields.io/travis/Apollon77/ioBroker.meross/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.meross?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.meross.png?downloads=true)

# IoBroker.meross
** Этот адаптер использует службу [Sentry.io](https://sentry.io), чтобы автоматически сообщать об исключениях и ошибках кода мне как разработчику. **

## Описание
Этот адаптер позволяет управлять устройствами Meross, подключаясь к облачным серверам Meross.

Вам необходимо предоставить свои учетные данные для входа в Cloud. Адаптер подключается к вашей облачной учетной записи и подписывается на все данные устройства через MQTT. Из-за этого устройства должны быть подключены к их облаку. В настоящее время не известно ни одного способа локального управления устройствами.

Один экземпляр адаптера покажет все устройства из одной учетной записи Meross Cloud и позволит управлять ими.

## Известные рабочие устройства
* mss425e
* mss310
* MSS620 EU / UK

Если работает больше устройств (или нет), сообщите об этом, открыв проблему с GitHub.

## Changelog

### 1.3.4 (2019.11.26)
* (Apollon77) Add Temperature/Humidity support for MTS100

### 1.3.1 (2019.11.25)
* (Apollon77) Add names to hub sub devices

### 1.3.0 (2019.11.25)
* (Apollon77) Add msg100 with Garage Door Reed contact
* (Apollon77) Add reconnection handling
* (Apollon77) Add light support (e.g. MSL120 RGB bulb)
* (Apollon77) Add units and roles for electricity
* (Apollon77) Add support for MSXH0 (Air Purifyer)
* (Apollon77) Add support for Hub and Thermostates
* (Apollon77) Allow to control DND mode (LED) - be aware then if controlled via meross app it my get out of sync!
* (Apollon77) Integrate sentry.io for automated error/exception reporting
* (Apollon77) Add support for mts100v3
* (Apollon77) add Compact mode
* (Apollon77) add control option for (rgb) lights

### 1.0.0 (2018.12.16)
* (Apollon77) finalize and move to 1.0.0

### 0.4.1 (2018.11.26)
* (Apollon77) finalize version and allow electricity polling interval to be configured

### 0.3.0 (2018.11.16)
* (Apollon77) add support for mss310 devices

### 0.1.0 (2018.11.14)
* (Apollon77) First release to support ToggleX devices

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Apollon77 <iobroker@fischer-ka.de>

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