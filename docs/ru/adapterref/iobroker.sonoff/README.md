---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sonoff/README.md
title: ioBroker Sonoff
hash: RSDMeYvJdHdLRa0sQZfy3RIpl1BQYRnCBww693bWEvM=
---
![логотип](../../../en/adapterref/iobroker.sonoff/admin/sonoff.png)

![Количество установок](http://iobroker.live/badges/sonoff-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sonoff.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sonoff.svg)
![тесты](https://travis-ci.org/ioBroker/ioBroker.sonoff.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sonoff.png?downloads=true)

# IoBroker Sonoff ==============
Требуется node.js 4.0 или выше.

## Использование
Этот адаптер связывается с устройствами Sonoff с прошивкой Tasmota или ESP через MQTT.

Ожидаются следующие темы:

- теле / DeviceNAME / STATE
- tele / DeviceNAME / SENSOR
- tele / DeviceNAME / INFOx
- теле / DeviceNAME / ENERGY
- cmnd / DeviceNAME / POWERx
- stat / DeviceNAME / POWERx
- / DeviceNAME / BM280 / Температура
- / DeviceNAME / BM280 / Влажность
- / DeviceNAME / BM280 / Temperatur
- / DeviceNAME / BM280 / Feuchtigkeit
- / DeviceNAME / BM280 / Vcc
- / DeviceNAME / BM280 / VCC
- / DeviceNAME / BM280 / Laufzeit
- / DeviceNAME / BM280 / RSSI
- / DeviceNAME / BM280 / POWER
- / DeviceNAME / BM280 / POWER1
- / DeviceNAME / BM280 / POWER2
- / DeviceNAME / BM280 / POWER3
- / DeviceNAME / BM280 / POWER4
- / DeviceNAME / BM280 / Switch1
- / DeviceNAME / BM280 / Switch2
- / DeviceNAME / BM280 / Total
- / DeviceNAME / BM280 / Сегодня
- / DeviceNAME / BM280 / heute
- / DeviceNAME / BM280 / Вчера
- / DeviceNAME / BM280 / gestern
- / DeviceNAME / BM280 / Фактор
- / DeviceNAME / BM280 / Factor
- / DeviceNAME / BM280 / Питание
- / DeviceNAME / BM280 / Leistung
- / DeviceNAME / BM280 / Напряжение
- / DeviceNAME / BM280 / Spannung
- / DeviceNAME / BM280 / Current
- / DeviceNAME / BM280 / Strom
- / DeviceNAME / BM280 / Punkt
- / DeviceNAME / BM280 / Counter1
- / DeviceNAME / BM280 / Counter2
- / DeviceNAME / BM280 / Counter3
- / DeviceNAME / BM280 / Counter4
- / DeviceNAME / BM280 / Давление
- / DeviceNAME / BM280 / SeaPressure
- / DeviceNAME / BM280 / Druck
- / DeviceNAME / BM280 / Прибл. высота над уровнем моря
- / DeviceNAME / BM280 / Модуль
- / DeviceNAME / BM280 / Версия
- / DeviceNAME / BM280 / Имя хоста
- / DeviceNAME / BM280 / IPAddress
- / DeviceNAME / BM280 / IP-адрес
- / DeviceNAME / BM280 / RestartReason
- / DeviceNAME / BM280 / Углекислый газ
- / DeviceNAME / DHT11 / Освещенность
- / DeviceNAME / SonoffSC / Light
- / DeviceNAME / SonoffSC / Noise
- / DeviceNAME / SonoffSC / AirQuality
- /DeviceNAME/SDS0X1/PM2.5
- / DeviceNAME / SDS0X1 / PM10
- / DeviceNAME / SDS0X1 / UvLevel
- / DeviceNAME / SDS0X1 / Широта
- / DeviceNAME / SDS0X1 / Долгота
- / DeviceNAME / SR04 / Расстояние

** Примечание **: список может быть легко расширен. Пожалуйста, отправьте *Запросы на извлечение* или *Отладочные данные* для неизвестных состояний разработчику (через проблему).

## Автоматическое создание объектов
В веб-конфигурации вы можете определить, какие телеграммы MQTT создают новые объекты, не входящие в точки данных по умолчанию.

* TELE_SENSOR создает объекты из телеграмм tele / xxx / SENSOR
* TELE_STATE создает объекты из телеграмм tele / xxx / STATE
* STAT_RESULT создает объекты из телеграмм stat / xxx / RESULT

Обычно TELE_SENSOR должно быть достаточно для большинства пользователей.

## Флаги для светодиодных контроллеров
Состояния режима будут созданы, только если устройство имеет одно из состояний:

- «Красный», «Зеленый», «Синий», «WW», «CW», «Color», «RGB_POWER», «WW_POWER», «CW_POWER», «Hue», «Saturation»

Состояния:

* modeLedExor - exor для белых светодиодов и цветных светодиодов => если белые светодиоды включены, цветные светодиоды выключены и наоборот (по умолчанию true)
* modeReadColors - разрешить чтение цвета из MQTT (по умолчанию false)

## Changelog

### 2.2.3 (2019-01-10)
* (simatec) Support for comapct mode

### 2.2.2 (2018-06-22)
* (bluefox) Configuration was fixed

### 2.2.1 (2018-06-20)
* (bluefox) '-' in names was allowed again

### 2.2.0 (2018-05-22)
* (gemu2015) auto generate objects, support for arrays (channel), ledcontrollers improved

### 2.1.3 (2018-05-08)
* (bluefox) Added HC-SR04 Ultrasonic Sensor

### 2.1.2 (2018-04-23)
* (bluefox) Added support of UvLight, Longitude and Latitude

### 2.1.1 (2018-04-13)
* (bluefox) Support of the particle concentration sensor

### 2.1.0 (2018-03-30)
* (gemu2015) Support of the devices control (many thanks :)
* (gemu2015) Support of many new values 
* (modmax) Update alive status of the clients
* (modmax) Added POWER5-8 and Switch3-4

### 2.0.2 (2018-03-19)
* (modmax) Fixing reconnection of clients
* (bluefox) Add SeaPressure

### 2.0.1 (2018-03-17)
* (bluefox) Replace stream handler
* (bluefox) Add timeout for clients
* (bluefox) Add Light/Noise/AirQuality
* (bluefox) Do not send pingresp for invalid clients

### 1.0.3 (2018-03-03)
* (bluefox) Add Analog0/1/2/3 sensor

### 1.0.2 (2018-02-17)
* (Apollon77) Add Illuminance sensor

### 1.0.1 (2018-02-05)
* (bluefox) Ready for admin3
* (bluefox) Added CO2 sensor

### 1.0.0 (2017-11-27)
* (AlZiBa) typo @ alive
* (AlZiBa) add Todays power consumption for Sonoff POW
* (AlZiBa) unit of power consumption is kWh

### 0.3.3 (2017-11-03)
* (bluefox) Add counters

### 0.3.2 (2017-10-22)
* (Tan-DE) Small change for Switch1. Switch2 and additional IPaddress added.

### 0.3.1 (2017-10-12)
* (bluefox) Fix tests and LWT

### 0.3.0 (2017-10-06)
* (bluefox) Add INFO and ESP

### 0.2.0 (2017-10-05)
* (bluefox) Add ENERGY and DS18x20

### 0.1.0 (2017-10-01)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2017-2019, bluefox <dogafox@gmail.com>

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