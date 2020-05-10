---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/README.md
title: ioBroker.shelly
hash: fIeGvVx0vFNJyI2FSdlQWp1eCKljEcV9j/dOkl0v5k8=
---
![логотип](../../../en/adapterref/iobroker.shelly/admin/shelly.png)

![Статус сборки](https://travis-ci.org/schmupu/ioBroker.shelly.svg?branch=master)
![AppVeyor Статус сборки](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.shelly?branch=master&svg=true)
![Количество установок](http://iobroker.live/badges/shelly-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.shelly.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.shelly.svg)
![NPM](https://nodei.co/npm/iobroker.shelly.png?downloads=true)

# IoBroker.shelly
Требуется node.js 8.0 или выше и Admin v3!

Адаптер связывается с устройствами Shelly по REST api и протоколу CoAP или MQTT.
По умолчанию прошивка Shelly (прошивка прошивки не требуется!). Более подробную информацию об устройстве вы найдете здесь: [изобилующий раковинами](https://shelly.cloud/)

** Этот адаптер использует библиотеки Sentry, чтобы автоматически сообщать об исключениях и ошибках кода мне как разработчику. ** Подробнее см. Ниже!

## Установка
Вы найдете подробную документацию по установке здесь: [Документация по установке](./docs/EN/INSTALL.md)

## Поддерживаемые устройства
| Shelly Device | По умолчанию (CoAP) | MQTT |
|-------------|--------------|----|
| Shelly1 (SHSW-1) | проверено | проверено |
| Shelly2 (SHSW-21 / SHSW-22) | проверено | проверено |
| ShellyBulb (SHBLB) | проверено | проверено |
| Shelly H & T (SHHT-1) | проверено | проверено |
| Shelly Smoke (SHSM-01) | проверено | проверено |
| Shelly 1 1PM (SHSW-PM) | проверено | проверено |
| Shelly 2.5 (SHSW-25) | проверено | проверено |
| ShellyRGBW (SHRGBWW-01) | проверено | проверено |
| ShellyRGBW2 (SHRGBW2) | проверено | проверено |
| Shelly2LED (SH2LED) | проверено | проверено |
| ShellyPlug (SHPLG-1) | проверено | проверено |
| ShellyPlug S (SHPLG-1) | проверено | проверено |
| ShellyPlug 2 (SHPLG-2) | проверено | проверено |
| ShellySense (SHSEN-1) | проверено | не проверено |
| Shelly4Pro (SHSW-44) | проверено | не проверено |
| Shelly EM (SHEM) | проверено | проверено |
| Шелли Потоп (SHWT-1) | проверено | проверено |
| Шелли Диммер (ШДМ-1) | проверено | проверено |
| Shelly Датчик двери / окна (SHDW-1) | проверено | проверено |
| Shelly Bulb Duo (SHBDUO-1) | проверено | не проверено |
| Shelly 3EM (SHEM) | проверено | проверено |
| Шелли Винтаж (ШВИН-1) | проверено | проверено |

## Что такое Sentry и что сообщается на серверы?
Sentry.io позволяет разработчикам получить обзор ошибок в своих приложениях. И именно это реализовано в этом адаптере.

Когда происходит сбой адаптера или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется на наш собственный сервер Sentry, расположенный в Германии. Когда вы разрешили iobroker GmbH собирать диагностические данные, включался и ваш установочный идентификатор (это просто уникальный идентификатор **без** каких-либо дополнительных сведений о вас, адрес электронной почты, имя или тому подобное). Это позволяет Sentry группировать ошибки и показывать, на сколько уникальных пользователей влияет такая ошибка. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не выходят из строя.

## Changelog

### 3.2.8 (09.05.2020)
* (c7j3X) - Add device Shelly Vintage
* (Stübi) - Add state vibration and tilt to Shelly DW

### 3.2.7 (28.04.2020)
* (Stübi) - User can enable/disable sentry logging

### 3.2.6 (27.04.2020)
* (Apollon77)  - Update Dependencies incl shelly-lib to prevent exceptions
* (Apollon77)  - Add Sentry for error/crash reporting (active with js-controller 3.0)
* (Stübi       - Add for hue two new datapoints for Shelly Bulb and RGBW2
* (@SamLowrie) - Add option to set a specific multicast interface for CoAP server

### 3.2.4 (11.04.2020)
* (Stübi) - Bugfixing MQTT ext_temperature for Shelly 1

### 3.2.3 (03.03.2020)
* (Stübi) - Bugfixing Shelly 3EMfor MQTT support (fixed datapoints for total and total_returned)
* (Stübi) - Bugfixing MQTT support for door and windows sensor (issue #135)

### 3.2.2 (03.03.2020)
* (Stübi) - Bugfixing, if Shelly sends a string instead of number and boolean (issue #131)

### 3.2.1 (02.03.2020)
* (Stübi) - Bugfixing Shelly 3EMfor MQTT support 

### 3.2.0 (13.02.2020)
* (Simon W.) - Add device Shelly 3EM
* (Stübi)    - Add device Shelly Door/Windows sensor 
* (Stübi)    - Add external temperature sensor for Shelly 1, 1PM and 2.5 (only CoAP)

### 3.1.9 (25.01.2020)
* (Stübi) - Bugfixing, auto update new firmware

### 3.1.7 (08.01.2020)
* (Stübi) - Add state energy to Shelly dimmer 

### 3.1.6 (30.12.2019)
* (Stübi) - Add device Shelly Door/Windows sensor 
* (Stübi) - Bugfixing, auto update new firmware

### 3.1.5 (23.12.2019)
* (Stübi) - Add device Shelly Plug S2. It will be shown as Shelly Plug S (SHPLG-1) in MQTT

### 3.1.4 (11.12.2019)
* (Stübi) - Bugfixing, auto update new firmware

### 3.1.3 (07.12.2019)
* (Stübi) - Bugfixing. Add power state to Shelly dimmer in MQTT mode

### 3.1.2 (11.10.2019)
* (Stübi) - Bugfixing. Error message will not only be shown in debug modus

### 3.1.1 (14.09.2019)
* (Stübi) - Add device Shelly Dimmer

### 3.1.0 (03.09.2019)
* (Stübi) - Add device Shelly flood

### 3.0.9 (06.08.2019)
* (Stübi) - Bugfixing, with the new firmware, Shelly HT sends the humidity by CoAP as it should. Division by 2 removed!
* (Stübi) - Add status Duration in roller (shutter) mode for CoAP (not working with MQTT) 
* (Stübi) - Changed role from level to level.brightness for state Gain

### 3.0.8 (27.07.2019)
* (Stübi) - Add device Shelly EM 
* (Stübi) - Add state energy for Shelly Plug S, Shelly PM and Shelly 2.5 in CoAP mode 
* (Stübi) - Add state temperature for Shelly Plug S, Shelly PM and Shelly 2.5 in CoAP mode
* (Stübi) - Add state overtemperature for Shelly Plug S, Shelly PM and Shelly 2.5 in CoAP and MQTT mode
* (Stübi) - Bugfixing, the Shelly HT sends by CoAP the humidity multiply with 2. The fix divides the value by 2. 

### 3.0.7 (03.07.2019)
* (Stübi) - correct spelling error 
* (Stübi) - Adjust IP address after IP change in CoAP Modus (Issue 70)
* (Stübi) - Bugfixing for datapoint power (rounding method was wrong)
* (Stübi) - Fixed Buffer() is deprecated due to security and usability issues for Node >= 10

### 3.0.6 (29.06.2019)
* (Stübi) - State reboot and uptime added 

### 3.0.5 (16.06.2019)
* (Stübi) - Bugfixing 
* (Stübi) - Add Blacklist

### 3.0.4 (04.06.2019)
* (Stübi) - Bugfixing (Issue #60) 

### 3.0.3 (02.06.2019)
* (Stübi) - Support of MQTT QoS 1 and 2. Add auto firmware update to the menu 

### 3.0.2 (25.05.2019)
* (Stübi) - Bugfixing and longpush and input states for Shelly 1, 2, 1pm, 2.5 and Shelly RGBWW2 added. Add state temperature to Shelly 1pm, 2.5 and Plug S.  

### 3.0.1 (21.05.2019)
* (Stübi) - Redesign of the adapter. You can choose now between CoAP and MQTT protocol. The Shellys use this protocolls to send there state changes to ioBroker in realtime. Out of the Box the Shelly works with the CoAP protocol. You do not have to configure anything. The Shelly will be found by the Shelly Adapter itself. If you want to use MQTT, you have configure all your Shelly devices. You find a detailed installing documentation here: [Installation Documentation](./docs/EN/INSTALL.md). If you have problems with the version 3.0.1 please change back to 2.2.0 and leave an Issue (bug report) here: [GitHub Issues](https://github.com/schmupu/ioBroker.shelly/issues). 

### 2.2.0 (13.04.2019)
* Add devices Shelly 2.5 and Shelly 1 PM 

### 2.1.9 (31.03.2019)
* Add status 'firmware update' for Shelly RGBW, RGBW2 and Bulb

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

## License
The MIT License (MIT)

Copyright (c) 2018-2020 Thorsten Stueben <thorsten@stueben.de>, Apollon77 <iobroker@fischer-ka.de>

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