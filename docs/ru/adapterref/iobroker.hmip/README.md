---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hmip/README.md
title: ioBroker HomeMatic IP Облако Адаптер AccessPoint
hash: imIQYuotL4N4nhDankZmeV6Bqio97DpYIi1pbbS4MAE=
---
![логотип](../../../en/adapterref/iobroker.hmip/admin/homematic.png)

![Количество установок](http://iobroker.live/badges/hmip-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.hmip.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hmip.svg)
![Статус сборки](https://travis-ci.org/iobroker-community-adapters/ioBroker.hmip.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.hmip.png?downloads=true)
![Значок Greenkeeper](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.hmip.svg)

# IoBroker Адаптер точки доступа HomeMatic IP CloudPoint
** Этот адаптер использует библиотеки Sentry, чтобы автоматически сообщать разработчикам об исключениях и ошибках кода. ** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. В [Sentry-Plugin Документация](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry report используется начиная с js-controller 3.0.

## Описание
Этот адаптер позволяет обмениваться данными с HomematicIP CloudAccessPoint через API отдыха Homematic IP Cloud.

## Установка
Этому адаптеру нужны node-js в версии> = 8.6

Вот пошаговое видео по установке на YouTube https://youtu.be/kXWfJRUYJIA

## Информация
Большинство IP-устройств Homematic уже работают с последней версией адаптера.

Я буду постоянно его улучшать, но это займет время. Любая помощь от сообщества, например, Запрос на тягу будет высоко оценен.

Для не работающих устройств HmIP, пожалуйста, создайте проблему с этой информацией (пожалуйста, по одному на устройство и, если возможно, техническое имя в теме).
Переключите регистрацию адаптера в ioBroker в глупый режим и добавьте json устройства, которое напечатано в журнал в выпуске.
Мне также может понадобиться JSON изменения состояния.

Спасибо

## Важная информация, что можно сделать с помощью этого адаптера
!!! С помощью этого адаптера вы можете инициировать события, которые могут запускаться только через исходное приложение Homematic IP.
Например, прямые соединения между устройствами не имеют событий в приложении и не могут быть инициированы через этот адаптер !!!

## Настройки
* введите свой SGTIN (задняя часть точки доступа) и PIN-код (если он был установлен ранее) и подтвердите данные нажатием синей светодиодной кнопки. Это создаст токен аутентификации.

## Спасибо
CoreGreenberet для его библиотеки Python (https://github.com/coreGreenberet/homematicip-rest-api)

## Дискуссия в форуме ioBroker
https://forum.iobroker.net/topic/27532/homematic-ip-cloud-access-point-adapter

## Запрос адаптера на GitHub
https://github.com/ioBroker/AdapterRequests/issues/62

## Changelog

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