---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hmip/README.md
title: ioBroker HomeMatic IP Cloud AccessPoint адаптер
hash: ijuFp8aNeY4Hy2i0Nl5rlSZyjDVdk8LiQwte36/U8hw=
---
![Логотип](../../../en/adapterref/iobroker.hmip/admin/homematic.png)

![Количество установок](http://iobroker.live/badges/hmip-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.hmip.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hmip.svg)

# IoBroker HomeMatic IP Cloud AccessPoint Adapter
![Тестирование и выпуск](https://github.com/Apollon77/iobroker.hmip/workflows/Test%20and%20Release/badge.svg) [![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/hmip/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Описание
Этот адаптер позволяет обмениваться данными с HomematicIP CloudAccessPoint через Rest API из Homematic IP Cloud.

** Важное примечание: ** Пожалуйста, ограничьте запросы управления до минимума, потому что EQ-3 начал блокировать IP-адреса, когда вы делаете слишком много!

## Монтаж
Этому адаптеру требуется node-js версии> = 8.6.

Вот пошаговое видео по установке на YouTube https://youtu.be/kXWfJRUYJIA

## Информация
Большинство IP-устройств Homematic уже работают с последней версией адаптера.

Я буду постоянно его улучшать, но это займет время. Любая помощь от сообщества, например, Запрос на вытягивание будет очень признателен.

Если устройства HmIP не работают, создайте проблему с этой информацией (пожалуйста, по одному для каждого устройства и, если возможно, укажите техническое название в теме).
Переключите ведение журнала адаптера в ioBroker в глупый режим и добавьте json-код устройства, который печатается в журнале проблемы.
Мне также может понадобиться json для изменения состояния.

Спасибо

Если вы ищете информацию, если настройки сигнализации активны, вы должны проверить активный статус группы ВНУТРЕННИЙ и ВНЕШНИЙ, они представляют в комбинации три состояния сигнализации. ВНУТРЕННИЙ и ВНЕШНИЙ активны означает Нет на месте, активен только ВНЕШНИЙ означает, что активен только Периметр.

## Важная информация, что можно сделать с этим адаптером
!!! С помощью этого адаптера вы можете запускать только события, которые могут запускаться через исходное приложение Homematic IP.
Например, прямые соединения между устройствами не имеют событий в приложении и не могут быть запущены через этот адаптер !!!

## Настройки
* введите свой SGTIN (на задней панели точки доступа) и PIN-код (если установлен ранее) и подтвердите данные, нажав синюю светодиодную кнопку. Это создаст токен аутентификации.

## Спасибо
в coreGreenberet за его библиотеку python (https://github.com/coreGreenberet/homematicip-rest-api)

## Обсуждение на форуме ioBroker
https://forum.iobroker.net/topic/27532/homematic-ip-cloud-access-point-adapter

## Запрос адаптера на GitHub
https://github.com/ioBroker/AdapterRequests/issues/62

## Changelog

### 1.11.0 (2021-04-25)
* (Apollon77) Implement CARBON_DIOXIDE_SENSOR_CHANNEL

### 1.10.0 (2021-04-12)
* (Apollon77) Implement TEMPERATURE_SENSOR_2_EXTERNAL_DELTA_CHANNEL, DOOR_LOCK_CHANNEL and ACCESS_AUTHORIZATION_CHANNEL

### 1.9.0 (2021-02-16)
* (Apollon77) Round temperature values to nearest 0.5 degrees
* (Apollon77) Only send values to HMIP when changed (reduce traffic!)
* (Apollon77) Add debouncing to setPointTemperature changes (means value is sent out when "stable" for 5s!) (reduce traffic!)
* (Apollon77) Add throttling to other change requests (means other changes are blocked for 1s) (reduce traffic!)
* (Apollon77) Implement ANALOG_ROOM_CONTROL_CHANNEL (Sentry IOBROKER-HMIP-1X)

### 1.7.2 (2021-02-09)
* (Apollon77) Try to detect websocket connection failures start over

### 1.7.0 (2021-01-26)
* (Apollon77) add Heating Absence Permanent state and functionality
* (Apollon77) add support for MULTI_MODE_INPUT_BLIND_CHANNEL

### 1.6.2 (2021-01-21)
* (Apollon77) Add check when HMIP domain could not be determined.

### 1.6.1 (2021-01-12)
* (Apollon77) Prevent crash case (Sentry IOBROKER-HMIP-1N)

### 1.6.0 (2020-12-24)
* Important note: Please limit control requests to the bare minimum because EQ-3 started to block IPs when you do too much!
* (Apollon77) Add support for WALL_MOUNTED_THERMOSTAT_CHANNEL

### 1.5.2 (2020-12-15)
* (Apollon77) ignore DEVICE_CHANNEL_EVENT for now and also log as debug to not flood log

### 1.5.0 (2020-11-09)
* (Apollon77) Add control options for primary/secondaryShadingLevel datapoints

### 1.4.1 (2020-11-03)
* (Apollon77) fix potential crash case (Sentry IOBROKER-HMIP-1N)

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