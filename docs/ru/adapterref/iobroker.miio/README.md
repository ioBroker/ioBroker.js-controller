---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.miio/README.md
title: без названия
hash: XDMqwMWlFhKnECYCDK10wcbFmf9uJWhK5gUOJXXehi4=
---
![Количество установок](http://iobroker.live/badges/miio-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.miio.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.miio.svg)
![Статус зависимости](https://img.shields.io/david/smarthomefans/iobroker.miio.svg)
![Известные уязвимости](https://snyk.io/test/github/smarthomefans/ioBroker.miio/badge.svg)
![NPM](https://nodei.co/npm/iobroker.miio.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/smarthomefans/ioBroker.miio/master.svg)

<h1><img src="admin/miio.png" width="64"/> ioBroker.miio </h1>

## Адаптер miio для ioBroker
Этот адаптер управляет устройствами, которые следуют протоколу miIO.

## Текущий поддерживаемый тип устройства
| Тип | значок | модель | Испытано |

--- | --- | --- | --- | airfresh | ![](admin/icons/zhimi-airfresh-va2.png) | zhimi-airfresh-va2 | ❌ | airmonitor |! [] () || ❌ | воздухоочиститель | ![](admin/icons/zhimi.airpurifier.m1.png) | zhimi.airpurifier.m1 | ❌ | воздушный очиститель | ![](admin/icons/zhimi.airpurifier.v1.png) | zhimi.airpurifier.v1 | ❌ | воздушный очиститель | ![](admin/icons/zhimi.airpurifier.v2.png) | zhimi.airpurifier.v2 | ❌ | воздушный очиститель | §§IIIII_4§ | .airpurifier.v3 | ❌ | воздухоочиститель | ![](admin/icons/zhimi.airpurifier.v6.png) | zhimi.airpurifier.v6 | ❌ | fan |! [] () || ❌ | увлажнитель | ![](admin/icons/zhimi.humidifier.ca1.png) | zhimi.humidifier.ca1 | ❌ | увлажнитель | ![](admin/icons/zhimi.humidifier.v1.png) | zhimi.humidifier.v1 | ❌ | чайник | ![](admin/icons/yunmi.kettle.r1.png) | yunmi.kettle.r1 | ✅ | свет | ![](admin/icons/philips.light.bulb.png) | philips.light.bulb | ✅ | свет | ![](admin/icons/philips.light.sread1.png) | philips.light.sread1 | ✅ | light | ![](admin/icons/yeelink.light.color1.png) | yeelink.light.color1 | ✅ | light | ![](admin/icons/yeelink.light.lamp1.png) | yeelink.light.lamp1 | ✅ | light | §§ IIIII_13§§ | yeelink.light.mono1 | ✅ | light | ![](admin/icons/yeelink.light.strip1.png) | yeelink.light.mono1 | ✅ | plug | ![](admin/icons/chuangmi.plug.m1.png) | chuangmi.plug.m1 | ❌ | plug | §§IIIII_16§ § | chuangmi.plug.v1 | ❌ | plug | ![](admin/icons/chuangmi.plug.v2.png) | chuangmi.plug.v2 | ❌ | plug | ![](admin/icons/chuangmi.plug.v3.png) | chuangmi.plug.v3 | ✅ | powerstrip | §IIIII_19§§ | qmi.powerstrip.v1 | ❌ | powerstrip | ![](admin/icons/zimi.powerstrip.v2.png) | zimi.powerstrip.v2 | ❌ | waterpuri | ![](../../../en/adapterref/iobroker.miio/admin/icons/yunmi.waterpuri.lx3.png) | yunmi.waterpuri.lx3 | ✅ | waterpuri | §§IIIII_22 §§ | yunmi.waterpuri.v2 | ✅

- Если какое-либо устройство вы протестировали, пожалуйста, создайте проблему и сообщите мне результат и модель устройства.

## Changelog
### 0.0.6 (2019-04-13)
* Add power load for chuangmi plug

### 0.0.5 (2019-04-04)
* Fix URL mis-match issue

### 0.0.4 (2019-03-31)
* Add yunmi water purifier support. Perfect unit test

### 0.0.3 (2019-03-17)
* Add value mapper function. Add CommandInPara command

### 0.0.2 (2019-03-15)
* Add new device support. Fix some TS lint error

### 0.0.1
* (SchumyHao) initial release

## License
MIT License

Copyright (c) 2019 SchumyHao

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