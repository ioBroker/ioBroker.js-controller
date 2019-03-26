---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/README.md
title: ioBroker.shelly
hash: iTZ24wv7VPSFx9I1I0uKeEtbGYOylVSdzg+T+Q3pdF4=
---
![логотип](../../../en/adapterref/iobroker.shelly/admin/shelly.png)

![Статус сборки](https://travis-ci.org/schmupu/ioBroker.shelly.svg?branch=master)
![AppVeyor Статус сборки](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.shelly?branch=master&svg=true)
![Количество установок](http://iobroker.live/badges/shelly-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.shelly.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.shelly.svg)
![NPM](https://nodei.co/npm/iobroker.shelly.png?downloads=true)

# IoBroker.shelly =================
Требуется node.js 6.0 или выше и Admin v3!

Адаптер связывается с устройствами Shelly по REST api и протоколу CoAP с прошивкой Shelly по умолчанию (прошивка не требуется!).
Поскольку CoAP использует многоадресные UDP-пакеты, устройства Shelly должны находиться в той же подсети, что и ioBroker.
Если вы используете ioBroker в контейнере Docker, контейнер должен работать в режиме хоста или Macvlan.

Более подробную информацию об устройстве вы найдете здесь: [изобилующий раковинами](https://shelly.cloud/)

## Монтаж
1. Установите адаптер
2. Конфигурация не требуется. Шелли устройства будут обнаружены и добавлены автоматически. Иногда вам нужно перезапустить устройство Шелли или управлять им один раз с помощью приложения, прежде чем оно появится в ioBroker.

## Поддерживаемые устройства
* Shelly1 (SHSW-1, проверено)
* Shelly2 (SHSW-21 / SHSW-22, проверено)
* ShellyRGBW (SHRGBWW-01, проверено)
* ShellyRGBW2 (SHRGBW2-01, не проверено и не протестировано)
* Shelly4Pro (SHSW-44, не проверено и не проверено)
* ShellyPlug (SHPLG-1, не проверено и не проверено)
* ShellyRGBW (SHRGBWW-01, проверено)
* Shelly H & T (SHHT-1, проверено)
* Shelly Smoke (SHSM-01, проверено)

## Для реализации требуется больше деталей (журнал отладки)
* ShellySense (SHSEN-1)
* ShellyBulb (SHBLB-1d)
* Shelly2LED (SH2LED-1)

## Changelog

### 2.1.8 (19.03.2019)
* Consider roller (shutter) position in CoAP message 
* Support of Shelly Sensor

### 2.1.7 (15.03.2019)
* Changing all RGBWW2 colors at the same time
* new RGBWW2 State color.rgbw with the format #RRGGBBWW

### 2.1.6 (08.03.2019)
* Shelly RGBWW2 bug fixing (whit did not work in color mode)

### 2.1.5 (05.03.2019)
* Shelly Smoke Support

### 2.1.4 (20.02.2019)
* Bugfixing of Shelly RGBW2 Support. If you have installed version 2.1.3, please delete all RGBW2 objects first, because the objects will be renamed from lights to color and white in version 2.1.4.   

### 2.1.3 (16.02.2019)
* Support of Shelly RGBW2

### 2.1.0 (09.02.2019)
* New Status 'new firmware available' for Shely1, Shelly2, Shelly4Pro and ShellyPlug 

### 2.0.8 (31.01.2019)
* Bugfixing, polling new Shelly status must be at least 1 sec ago 

### 2.0.7 (21.01.2019)
* Bugfixing for objects AutoTimerOn and AutoTimeroff

### 2.0.6 (12.01.2019)
* Getting faster online status for Shelly devices, excluded H&T. Fix of power status for Shelly Plug.

### 2.0.5 (07.01.2019)
* Fixing an error if Shelly device is not reachable (offline)

### 2.0.4 (04.01.2018)
* Support of js-controller compact mode and performance optimizing. Relay status changes will be shown much faster in ioBroker for Shelly 1, 2 and 4Pro

### 2.0.3 (02.01.2018)
* Shows RSSI Status for Shelly 1 & 2. You need Firmware 1.4.4 

### 2.0.2 (22.12.2018)
* Add Shelly H&T. 

### 2.0.1 (22.12.2018)
* Major update because of problems with CoAP messages. 

### 1.0.2 (17.12.2018)
* Work around for showing states in shutter/roller modus

### 1.0.1 (07.12.2018)
* Add shutter/roller position

### 1.0.0 (10.11.2018)
* Optimizations and Online status fixed

### 0.2.6 (31.10.2018)
* Two new datapoints (AutoTimerOn and AutoTimerOn) for Shelly 1/2

### 0.2.5 (13.10.2018)
* Hostname instead of ip address will be shown

### 0.2.4 (10.10.2018)
* Channel name can be overwrite with own name

### 0.2.3 (01.10.2018)
* Bugfixing, shutter status display

### 0.2.2 (30.09.2018)
* Bugfixing, on start default value of timer and duration of relay and shutter will be 0 sec

### 0.2.1 (28.09.2018)
* Username/Password supported

### 0.2.0 (28.09.2018)
* Roller / Shutter for Shelly2 supported

### 0.1.1 (21.09.2018)
* Bugfixing

### 0.1.0 (20.09.2018)
* First Version. Supports all Shelly switches like Shelly 1, Shelly 2, Shelly 4 and the power sockets.

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Thorsten Stueben <thorsten@stueben.de>, Apollon77 <iobroker@fischer-ka.de>

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