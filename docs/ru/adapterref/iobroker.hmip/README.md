---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hmip/README.md
title: ioBroker HomeMatic IP Cloud AccessPoint адаптер
hash: UnHTzvzWwdbWm+eHXhoedg6zjQvgT8aPkvmVK20Teq8=
---
![Логотип](../../../en/adapterref/iobroker.hmip/admin/homematic.png)

![Количество установок](http://iobroker.live/badges/hmip-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.hmip.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hmip.svg)
![Статус сборки](https://travis-ci.org/iobroker-community-adapters/ioBroker.hmip.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.hmip.png?downloads=true)

# IoBroker HomeMatic IP Cloud AccessPoint Adapter
** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация по Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Описание
Этот адаптер позволяет обмениваться данными с HomematicIP CloudAccessPoint через Rest API из Homematic IP Cloud.

## Установка
Этому адаптеру требуется node-js версии> = 8.6.

Вот пошаговое видео по установке на YouTube https://youtu.be/kXWfJRUYJIA

## Информация
Большинство IP-устройств Homematic уже работают с последней версией адаптера.

Я буду постоянно его улучшать, но это займет время. Любая помощь от сообщества, например, Запрос на вытягивание будет очень признателен.

Если устройства HmIP не работают, создайте проблему с этой информацией (пожалуйста, по одному для каждого устройства и, если возможно, укажите техническое название в теме).
Переключите ведение журнала адаптера в ioBroker в глупый режим и добавьте json-код устройства, который печатается в журнале проблемы.
Мне также может понадобиться json изменения состояния.

Спасибо

Если вы ищете информацию, если настройки сигнализации активны, вы должны проверить активное состояние группы ВНУТРЕННИЙ и ВНЕШНИЙ, они представляют в комбинации три состояния сигнализации. ВНУТРЕННИЙ и ВНЕШНИЙ активны означает Нет на месте, активен только ВНЕШНИЙ означает, что активен только Периметр.

## Важная информация, что можно сделать с этим адаптером
!!! Вы можете запускать только события с этим адаптером, которые могут запускаться через исходное приложение Homematic IP.
Например, прямые соединения между устройствами не имеют событий в приложении и не могут быть запущены через этот адаптер !!!

## Настройки
* введите свой SGTIN (на задней стороне точки доступа) и PIN-код (если он был установлен ранее) и подтвердите данные, нажав синюю светодиодную кнопку. Это создаст токен аутентификации.

## Благодарность
в coreGreenberet за его библиотеку python (https://github.com/coreGreenberet/homematicip-rest-api)

## Обсуждение на форуме ioBroker
https://forum.iobroker.net/topic/27532/homematic-ip-cloud-access-point-adapter

## Запрос адаптера на GitHub
https://github.com/ioBroker/AdapterRequests/issues/62

## Changelog

### 1.4.0 (2020-10-29)
* (Apollon77) Add ROTARY_WHEEL_CHANNEL and RAIN_DETECTION_CHANNEL, ACCESS_CONTROLLER_WIRED_CHANNEL
* (Apollon77) Read home anew if no home object is provided for SECURITY_JOURNAL_CHANGED event

### 1.3.1 (2020-09-18)
* (Apollon77) Fix missing write permission for Notification Light "On" channel

### 1.3.0 (2020-09-18)
* (SliX185) Add MAINS_FAILURE_CHANNEL
* (Apollon77) Add DEVICE_RECHARGEABLE_WITH_SABOTAGE, ACCESS_CONTROLLER_CHANNEL, FLOOR_TERMINAL_BLOCK_MECHANIC_CHANNEL, DEVICE_BASE_FLOOR_HEATING, MULTI_MODE_INPUT_DIMMER_CHANNEL, MULTI_MODE_INPUT_SWITCH_CHANNEL, ANALOG_OUTPUT_CHANNEL, ACCELERATION_SENSOR_CHANNEL, TILT_VIBRATION_SENSOR_CHANNEL, SHADING_CHANNEL
* (Apollon77) try to add dim/rgb support for NotificationLight. You might need to delete/recreate the states if it is not working.
* (Apollon77) add additional functions for setOperationLock, setClimateControlDisplay, setMinimumFloorHeatingValvePosition, setRgbDimLevel. You might need to delete/recreate the states if it is not working.
* (Apollon77) adjusted some roles. You might need to delete/recreate the states if it is not working.

### 1.2.2 (2020-08-17)
* (Apollon77) Prevent Crash case (Sentry IOBROKER-HMIP-1B)

### 1.2.1 (2020-08-10)
* (Apollon77) Fix pairing process

### 1.2.0 (2020-07-26)
* (saschaabraham) Added an active property INTERNAL and EXTERNAL groups for alarm zones
* (marcus0303/slix185) added DOOR_CHANNEL properties

### 1.1.1 (2020-07-23)
* (Apollon77) Crash prevented if object is deleted by state changed (Sentry IOBROKER-HMIP-Y)

### 1.1.0 (2020-07-14)
* (Apollon77) Remember already sent unknown channel infos to not spam Sentry
* (Apollon77) Handle reconnects better (Sentry IOBROKER-HMIP-G)
* (Apollon77) Try to prevent crashes on i valid server reponses, warning is logged
* (SliX185) Add HMIP-SPDR (PASSAGE_DETECTOR_CHANNEL)

### 1.0.1 (2020-05-16)
* (Apollon77) Make sure invalid data do not crash adapter (Sentry IOBROKER-HMIP-7)
* (Apollon77) code cleanup
* (Apollon77) fix several roles (role info is not allowed)

### 1.0.0 (2020-05-12)
* (Apollon77) Add Sentry for error/crash reporting
* (Apollon77) multiple fixes and optimizations
* (Apollon77) prevent adapter crashes in some places
* (Apollon77) 
* (ApolloSK) add vaporAmount for WeatherSensorPro
* (ApolloSK) fix HmIP-SWO-PR wrong DataType actualTemperature
* (marcus0303) Added DEVICE_GLOBAL_PUMP_CONTROL, FLOOR_TERMINAL_BLOCK_LOCAL_PUMP_CHANNEL and DEVICE_INCORRECT_POSITIONED, Fixed role in _createWaterSensorChannel and function call in _createWeatherSensorPlusChannel
* (marcus0303) Added CONTACT_INTERFACE_CHANNEL for HmIP-SCI (see Issue #70 ), Added FLOOR_TERMINAL_BLOCK_CHANNEL, HEAT_DEMAND_CHANNEL, DEHUMIDIFIER_DEMAND_CHANNEL, CHANGE_OVER_CHANNEL, but without functionality, because it's not implemented in REST-API. Only to supress Warnings in Log.

### 0.0.12
* (jogibear9988) multiple fixes

### 0.0.11
* (jogibear9988) multiple fixes

### 0.0.10
* (jogibear9988) added ping/pong, enable setBoots, more units, more hardware

### 0.0.9
* (jogibear9988) fullrx and operationlock channel

### 0.0.8
* (jogibear9988) fixes a few devices

### 0.0.7
* (jogibear9988) fixes wrong state handling

### 0.0.6
* (jogibear9988) fixes for more devices, alarm handling

### 0.0.5
* (jogibear9988) more devices and big refactoring (switched from DeviceType to FunctionalChannelType)

### 0.0.4
* (jogibear9988) more devices, bugfixes. thanks to TobiasF1986, steckenpferd and Ma-ster77

### 0.0.3
* (jogibear9988) bugfixes and more devices 

### 0.0.2
* (jogibear9988) bugfixes, more devices and initial support of groups

### 0.0.1
* (jogibear9988) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2019 jogibear9988 <jochen.kuehner@gmx.de>

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