---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hue-extended/README.md
title: ioBroker.hue-продлен
hash: jLtZ+1cQsa9An1Ur/QRqlhsg7yaNh1f7ZGHioNgmOCg=
---
![логотип](../../../en/adapterref/iobroker.hue-extended/admin/hue-extended.png)

![Пожертвование Paypal](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![Количество установок](http://iobroker.live/badges/hue-extended-installed.svg)
![Стабильная версия](http://iobroker.live/badges/hue-extended-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.hue-extended.svg)
![Фиксируется с момента последнего выпуска](https://img.shields.io/github/commits-since/Zefau/ioBroker.hue-extended/latest.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hue-extended.svg)
![NPM](https://nodei.co/npm/iobroker.hue-extended.png?downloads=true)

# IoBroker.hue-extended Подключите фары Philips Hue с ioBroker.
[![Travis CI] (https://travis-ci.com/Zefau/ioBroker.hue-extended.svg?branch=master)](https://travis-ci.com/Zefau/ioBroker.hue-extended)

## Характеристики
- Синхронизировать огни
- Синхронизировать группы
- Синхронизация сцен (в том числе групповых сцен, световых сцен и сцен из [HueLabs] (https://labs.meethue.com/))
- Синхронизировать датчики
- синхронизировать расписание
- Синхронизировать конфигурацию
- Синхронизировать ресурсы
- Синхронизировать правила
- Запускать изменения состояний `вкл / выкл`,` яркость` (`уровень`),` оттенок`, `насыщенность`,` xy`, `colorTempera`,` alert`, `effect` и` transitiontime`
- Дополнительные триггеры на основе цветовых пространств для `rgb`,` hsv` и `hex`
- Применить собственную комбинацию команд, используя триггер `_commands`
- Управляйте светом всех групп одновременно, используя группу `0-all`
- Запустите сцену или примените «_scene» к свету или группе

## Changelog

Please also see [release page](https://github.com/Zefau/ioBroker.hue-extended/releases) for changelog and detailed information.

### 1.2.3 (2019-02-21)
- (Zefau) added `Signify` (formerly Philips Lighting) as official manufacturer
- (Zefau) updated dependencies

### 1.2.2 (2019-02-04)
- (Zefau) fixed wrong group state (see [#19](https://github.com/Zefau/ioBroker.hue-extended/issues/19))

### 1.2.1 (2019-02-03)
- (Zefau) fixed failing secure connection when selecting default certificates

### 1.2.0 (2019-11-23)
- (Zefau) added option to change `transitiontime` on scenes (see [#24](https://github.com/Zefau/ioBroker.hue-extended/issues/24))

### 1.1.7 (2019-11-23)
- (Zefau) fixed failing retrieval of new user / token from admin panel (see [#20](https://github.com/Zefau/ioBroker.hue-extended/issues/20))

### 1.1.7 (2019-11-23)
- (Zefau) fixed incorrect behaviour of garbage collector (again)

### 1.1.6 (2019-11-07)
- (Zefau) fixed `effect` and `alert` not being applied correctly

### 1.1.5 (2019-11-05)
- (Zefau) added option for conversion of `colorTemperature` to `xy` for non-Philips lights (see [#9](https://github.com/Zefau/ioBroker.hue-extended/issues/9))
- (Zefau) fixed conversion of `hue` to `xy` for groups consisting of either only Philips lights, mixed lights or only non-Philips lights (see [#11](https://github.com/Zefau/ioBroker.hue-extended/issues/11))
- (Zefau) fixed conversion of `hue` to `xy` to only convert if `xy` is actually supported by the light

### 1.1.3 / 1.1.4 (2019-10-31)
- (Zefau) added option for secure connection via SSL/TLS
- (Zefau) fixed `scenes` not being applied correctly

### 1.1.2 (2019-10-29)
- (Zefau) added option to (not) synchronise duplicated scenes
- (Zefau) added reworked garbage collector (deletion of old states)
- (Zefau) fixed `transitiontime` not being applied correctly (see [#8](https://github.com/Zefau/ioBroker.hue-extended/issues/8))

### 1.1.1 (2019-10-28)
- (Zefau) removed garbage collector (deletion of old states) due to incorrect behaviour

### 1.1.0 (2019-10-27)
- (Zefau) add full support for Hue Labs scenes
- (Zefau) add retry if bridge returns error `socket hang up`
- (Zefau) add retry if device is not reachable

### 1.0.2 (2019-10-20)
- (Zefau) added scenes from Hue Labs

### 1.0.1 (2019-10-20)
- (Zefau) fixed incorrect omitting GroupScenes

### 1.0.0 (2019-10-20)
- (Zefau) fixed issue setting devices with `bri` / `brightness` (e.g. plugs)

### 1.0.0-rc.1 (2019-10-13)
- (Zefau) __BREAKING CHANGE__ changed certain objects due to standardization (see https://forum.iobroker.net/post/298019)
	- changed `bri` to `brightness`*
	- changed `sat` to `saturation`*
	- removed `hue_degrees`
	- changed `hue` (changed value range from 0-65535 (native Hue API) to 0-360°C)
	- changed `ct` to `colorTemperature`* (changed value range from 153-500 (native Hue API) to 2000-6500K)
	- changed `_hex` to `hex`
	- changed `_hsv` to `hsv`
	- changed `_rgb` to `rgb`
	- removed `_cmyk`*
	- removed `_xyz`*

- fixed incorrect conversion between color spaces (`rgb`, `hex`, etc.)

_Note: If you are using the state `_commands` **renaming is not necessary** for the states `ct` (adapting the value range is required), `bri` or `sat`._

### 0.9.0 (2019-10-13)
- (Zefau) __BREAKING CHANGE__: changed grouping of scenes and added option to choose how objects are mapping (either `scenes.<group>.<scene>.objects` or `scenes.<scene>.<group>.objects`)
- (Zefau) retrieving group for all-lights directly from Hue Bridge API (instead of assembling through states)
- (Zefau) added option to delete outdated devices (gargabe collector)

## License
The MIT License (MIT)

Copyright (c) 2019-2020 Zefau <zefau@mailbox.org>

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