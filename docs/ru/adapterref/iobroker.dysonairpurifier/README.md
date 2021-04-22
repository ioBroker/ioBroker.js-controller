---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.dysonairpurifier/README.md
title: ioBroker.dysonAirPurifier
hash: s1zJIIEJa9uBBcgsAcVnaaBMO6CxukCwj8/He7bfINo=
---
# IoBroker.dysonAirPurifier
![Логотип] (admin / dyson_logo.svg)! [Логотип](../../../en/adapterref/iobroker.dysonairpurifier/admin/dyson_pure_cool.jpg)

![Количество установок (последнее)](http://iobroker.live/badges/dysonairpurifier-installed.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.dysonairpurifier.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/dysonairpurifier-stable.svg)
![Статус зависимости](https://img.shields.io/david/Grizzelbee/iobroker.dysonairpurifier.svg)
![Известные уязвимости](https://snyk.io/test/github/Grizzelbee/ioBroker.dysonairpurifier/badge.svg)
![Трэвис-Си](https://travis-ci.org/Grizzelbee/iobroker.dysonairpurifier.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.dysonAirPurifier.svg?downloads=true)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Загрузки](https://img.shields.io/npm/dm/iobroker.dysonairpurifier.svg)

## IoBroker Адаптер для очистителей воздуха и вентиляторов Dyson
Этот адаптер соединяет ioBroker с различными очистителями воздуха Dyson.

Значок вентилятора в логотипе, созданном [Freepik] (https://www.flaticon.com/de/autoren/freepik) с [www.flaticon.com](https://www.flaticon.com/de/).

### Поддерживаемые устройства
* Башня Dyson Pure Cool Link (TP02, ProductType 475)
* Dyson Pure Cool Tower, модель 2018 г. (TP04, ProductType 438)
* Dyson Pure Cool Link Desk (DP01, ProductType 469)
* Dyson Pure Cool Desk, модель 2018 г. (DP04, ProductType 520)
* Dyson Pure Hot + Cool Link (HP02, ProductType 455)
* Dyson Pure Hot + Cool, модель 2018 г. (HP04, ProductType 527)
* Dyson Pure Hot + Cool (HP07, ProductType 527E)
* Dyson Pure Humidify + Cool (PH01, ProductType 358)

## Функции
Подключает ваши вентиляторы Dyson, тепловентиляторы, очистители и увлажнители воздуха к ioBroker.

* Считывает значения с устройств и датчиков
* Может управлять устройствами, давая вам возможность изменять некоторые значения (основная мощность, колебания, нагрев, скорость вентилятора, ...)
* Читает список устройств с серверов Dyson

## Монтаж
### Предварительные требования
* Для этого адаптера требуется Node.js> = 10 версии.
* Требуется как минимум js-Controller 3.0.0
* Требуется как минимум Admin 4.0.9
* Для запуска этого адаптера вам понадобится учетная запись Dyson.
* Не забудьте добавить поклонника в свой аккаунт. Либо через приложение, либо онлайн.

### Установка адаптера
#### Использование npm
Запустите ```npm install iobroker.dysonairpurifier``` в вашей установке ioBroker, чтобы получить последнюю версию этого адаптера из репозитория npm.

#### Альтернатива: использование URL-адреса GitHub
Установите через интерфейс администратора ioBroker, указав последний стабильный выпуск на GitHub: <https://github.com/Grizzelbee/ioBroker.dysonairpurifier/tarball/master/>

Вы также можете установить более ранние версии выпуска с помощью этих методов (указав тег версии, например, ```v0.6.0``` вместо ```master``` в URL-адресе), но, как правило, предпочтительнее использовать самые последние версии.

### Необходимые данные конфигурации
* Имя пользователя учетной записи Dyson
* Пароль учетной записи Dyson (этот адаптер может обрабатывать пароли до 32 символов)
* IP-адрес вентиляторов / очистителей воздуха в вашей локальной сети.

* Обратите внимание *: из-за ранней стадии разработки и несоответствия реализации mDNS компанией Dyson вам необходимо будет предоставить локальный IP-адрес устройства * после первого запуска *.

* Дополнительное примечание *: Начиная с версии 0.7.1 адаптер пытается подключиться к устройству по его имени хоста (серийному номеру), если не указан адрес хоста / IP. Это будет работать при двух предварительных условиях:

1. В вашей локальной сети работает DNS-сервер. Либо в вашем маршрутизаторе (например, у FritzBoxes работает DNS), либо в выделенном.
2. Вы не изменили имя устройства по умолчанию.

> При первом запуске этого адаптера API Dyson запрашивается для всех ваших устройств, и все поддерживаемые устройства будут созданы в дереве устройств - с их базовой информацией, предоставленной API, и дополнительным полем «Hostaddress».
>> Итак, запустите адаптер один раз, и ваши устройства Dyson будут созданы в дереве устройств с их основными настройками.
>> Затем остановите адаптер, введите IP-адреса в поле (а) Hostaddress и перезапустите адаптер. После этого ваши устройства Dyson в дереве устройств должны быть заполнены данными.

## Управление вашим устройством (ами)
В настоящее время этот адаптер может управлять следующими состояниями ваших устройств:

* FanSpeed, текущая скорость вентилятора
* Ночной режим, состояние ночного режима
* Колебание, Колебание вентилятора.
* ContinuousMonitoring, непрерывный мониторинг датчиков окружающей среды, даже если устройство выключено.
* MainPower, основная мощность вентилятора.
* AutomaticMode, Вентилятор в автоматическом режиме.
* Flowdirection, направление, куда дует вентилятор. ВКЛ = спереди; ВЫКЛ = назад (он же Jet focus)
* Jetfocus, Направление дует вентилятор. ВКЛ = спереди; ВЫКЛ = назад (он же Jet focus)
* Режим обогрева, режим обогрева [ВКЛ / ВЫКЛ]
* HeatingTargetTemp, Целевая температура для обогрева
* AirQualityTarget, Целевое качество воздуха для авто режима.
* Режим увлажнения, Вкл. / Выкл.
* HumidifyAutoMode, Авто / Выкл.
* AutoHumidificationTarget, AutoHumidificationTarget
* HumidificationTarget, Ручное HumidificationTarget
* WaterHardness, мягкий, средний, жесткий

Возможные значения для этих состояний, насколько известно, задокументированы ниже.
Скорость вентилятора допускает только значения от 1 до 10 и Авто. Если вы хотите установить скорость вращения вентилятора на 0, вам необходимо отключить основное питание.
То же самое и с приложением dyson.

### Известные проблемы
* Нет автоматического определения IP устройств

## Объяснение данных Dyson API (полезная нагрузка сообщения)
Информация скопирована и расширена с <https://github.com/shadowwa/Dyson-MQTT2RRD/blob/master/README.md>

### ТЕКУЩЕЕ СОСТОЯНИЕ
| имя | значение | возможные значения | Единица |
| ------------- | ----- | ----- | ----- |
| режим-причина | Текущий режим был установлен RemoteControl, App, Scheduler | КНР, LAPP, LSCH, PUI | |
| состояние-разум | | РЕЖИМ | |
| rssi | Сила WIFI | -100 - 0 | дБм |
| канал | Канал WIFI | 52 | |
| fqhp | | 96704 | |
| fghp | | 70480 | |

#### Состояние продукта
| имя | значение | возможные значения | Единица |
| ------------- | ----- | ----- | ----- |
| ercd | Код последней ошибки | NONE или несколько шестнадцатеричных значений | |
| filf | оставшийся срок службы фильтра | 0000 - 4300 | часы |
| fmod | Режим | ВЕНТИЛЯТОР, АВТО | |
| fpwr | Основная мощность | ВКЛ, ВЫКЛ | |
| fnst | Статус вентилятора | ВКЛ, ВЫКЛ, ВЕНТИЛЯТОР | |
| fnsp | Скорость вентилятора | 0001-0010, АВТО | |
| fdir | Fandirection aka. Струйный фокус / ВКЛ = спереди, ВЫКЛ = сзади | ВКЛ, ВЫКЛ | |
| ffoc | JetFocus | ВКЛ, ВЫКЛ |
| nmod | Ночной режим | ВКЛ, ВЫКЛ | |
| осон | Колебание | ВКЛ, ВЫКЛ | |
| осал | OscillationAngle Нижняя граница | 0005 - 355 | ° (градусы) |
| Osau | OscillationAngle Верхняя граница | 0005 - 355 | ° (градусы) |
| осск | OscillationActive | ВКЛ, ВЫКЛ, ПРОХОЖДЕНИЕ | |
| ancp | OscillationAngle | CUST, 0180 | ° (градусы) |
| qtar | Целевое качество воздуха | 0001 = Хорошо, 0002 = Нормально, 0003 = Плохо, 0004 = Очень плохо | |
| rhtm | Непрерывный мониторинг | ВКЛ, ВЫКЛ | |
| авто | AutomaticMode | ВКЛ, ВЫКЛ | |
| nmdv | NightMode Max Fanspeed? | 0004 | |
| cflr | Статус Углеродный фильтр | 0000 - 0100 | Процент |
| cflt | Угольный фильтр | CARF | |
| hflr | Статус HEPA-фильтр | 0000 - 0100 | Процент |
| hflt | HEPA-фильтр | GHEP | |
| sltm | Таймер сна | ВКЛ, ВЫКЛ ||
| hmod | Режим нагревателя [ВКЛ / ВЫКЛ] | ТЕПЛО | |
| hmax | Целевая температура для обогрева | 0 .. 5000 | K |
| юм | HumidificationMode | ВКЛ, ВЫКЛ, |
| haut | Автоматический режим увлажнения | |
| Humt | Целевое увлажнение | |
| cdrr | CleanDurationRemaining | |
| прямоугольник | AutoHumidificationTarget | |
| cltr | TimeRemainingToNextClean | |
| wath | WaterHardness | |
| wacd | WarningCode? | НЕТ ... |
| rstf | сбросить жизненный цикл фильтра |
| брил | | 0002 |
| корф | | ВКЛ, ВЫКЛ |
| psta | [HP0x] Неизвестно | |
| hsta | [HP0x] Неизвестно | |
| наклон | [HP0x] Неизвестно | |
| набрать | [DP0x] Неизвестно | |
| fqhp | fqhp ||
| мста | мста ||

| Коды ошибок | Значение |
| ----- | ----- |
| НЕТ | Нет активных ошибок |
| 57C2 | неизвестно |
| 11E1 | Колебание отключено. Чтобы продолжить, нажмите кнопку «Осцилляция» на пульте дистанционного управления. |

#### Планировщик
| имя | значение | возможные значения | Единица |
| ------------- | ----- | ----- | ----- |
| dstv | daylightSavingTime | 0001 ... | |
| srsc | ? | 7c68 ... | |
| Цид | часовой пояс? | 0001 ... | |

### ДАННЫЕ ДАТЧИКА ТОКА ОКРУЖАЮЩЕЙ СРЕДЫ
#### Данные
| имя | значение | возможные значения | Единица |
| ------------- | ----- | ----- | ----- |
| hact | Влажность (%) | 0000 - 0100 | Процент |
| пакт | Пыль | 0000 - 0009 | |
| sltm | Таймер сна | ВЫКЛ ... 9999 | Минуты |
| такт | Температура в Кельвине | 0000 - 5000 | K |
| vact | летучие органические соединения | 0001 - 0009 | |
| pm25 | PM2.5 | 0018 ||
| pm10 | PM10 | 0011 ||
| va10 | летучие органические соединения | 0004 ||
| noxl | NO2 | 0000 - 0014 ||
| p25r | | 0019 ||
| p10r | | 0018 ||

### ДАННЫЕ ОБ ОКРУЖАЮЩЕЙ СРЕДЕ И ИСПОЛЬЗОВАНИИ
Избыточные значения?

#### Данные
| имя | значение | возможные значения | Единица |
| ------------- | ----- | ----- | ----- |
| pal0 - pal9 | количество секунд, проведенных в этом уровне пыли с начала часа | 0000 - 3600 | |
| пальма | кажется средним значением palX | | |
| vol0 - vol9 | количество секунд, потраченных на этот уровень вокала с начала часа | 0000 - 3600 | |
| volm | кажется средним значением volX | | |
| aql0 - aql9 | количество секунд, проведенных на этом уровне качества воздуха | max (pal, vol)) с начала часа | 0000 - 3600 | |
| aqlm | кажется средним значением aqlX | | |
| fafs | кажется, это количество секунд, потраченных на определенное время | 0000 - 3600 | |
| фаос | кажется, это количество секунд, потраченных на определенное время | 0000 - 3600 | |
| fofs | кажется, это количество секунд, потраченных на определенное время | 0000 - 3600 | |
| фоны | кажется, это количество секунд, потраченных на определенное время | 0000 - 3600 | |
| хамм | влажность ? (%) | 0000 - 0100 | |
| tmpm | температура в кельвинах? | 0000 - 5000 | |

## Юридические уведомления
Dyson, pure cool, pure hot & cool и другие являются товарными знаками или зарегистрированными товарными знаками [Dyson Ltd.](https://www.dyson.com). Все остальные товарные знаки являются собственностью соответствующих владельцев.

## Changelog

### V0.8.2 (2021-04-09) (Still breathing)
* (grizzelbee) Fix: [#80](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/80) fixed npm install hint in documentation
* (grizzelbee) Fix: [#82](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/82) fixed common.dataSource type with type >poll<
* (grizzelbee) Fix: [#95](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/95) Added new heater model type 527E
* (grizzelbee) Fix: [#94](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/94) Fixed dustIndex


### V0.8.1 (2021-02-19) (Fall into the flames)
* (grizzelbee) New: added icons to each fan type in device tree
* (grizzelbee) New: Showing Filter type correctly - not as code anymore
* (grizzelbee) Upd: updated dependencies

### V0.8.0 (2021-02-18) (Beyond the mirror)
* (grizzelbee) New: Log as info if account is active on login; else log as warning. 
* (grizzelbee) New: [#21](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/21) Improvement for humidifier support
* (grizzelbee) Fix: [#67](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/67) Adapter sometimes wrote objects instead of values.

### V0.7.5 (2021-02-12) (I won't surrender)
* (grizzelbee) Fix: [#65](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/65) Adapter get online again after changes to dyson cloud API login procedure.
* (grizzelbee) New: Adapter reconnects with new host address when it gets changed manually

### V0.7.4 (2021-02-10) (Human)
* (grizzelbee) Fix: fixed adapter traffic light for info.connection
* (grizzelbee) Fix: Minor fixes

### V0.7.3 (2021-02-10) (When angels fall)
* (theimo1221) Fix: [#59](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/59) added default country
* (theimo1221) New: added function to mask password to dyson-utils.js
* (grizzelbee) New: extended config test and error logging
* (grizzelbee) New: added password to protectedNative in io-package.json
* (grizzelbee) Fix: fixed showing password in config (leftover from testing/fixing)
* (grizzelbee) Fix: fixed detection of needed js-controller features
* (grizzelbee) Fix: fixed detection if IP is given or not
* (grizzelbee) Upd: creating all data points with await 


### V0.7.2 (2021-02-10) (Songs of love and death)
* (grizzelbee) Fix: [#59](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/59) Fixed bug while loading/saving config which led to wrong values displayed for country and temperature unit
* (grizzelbee) Upd: switched "Skipping unknown ..." message from info to debug 

### V0.7.1 (2021-02-06) (Horizons)
* (grizzelbee) New: When no host address is given - adapter tries to connect via default hostname of the device
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) Filterlifetime is now correctly displayed in hours and percent for devices supporting this
* (grizzelbee) Fix: [#48](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/48) Fixed countrycodes for UK and USA
* (grizzelbee) Fix: [#52](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/52) Fixed VOCIndex
* (grizzelbee) Fix: Removed option to control Fan state since it corresponds to the state of the fan in auto-mode. Controlling it is senseless.
* (grizzelbee) Fix: Fixed await...then antipattern.
* (grizzelbee) Fix: Fixed undefined roles
* (grizzelbee) Fix: Fixed some bad promises and moved code to dysonUtils
* (grizzelbee) Fix: Fixed encrypting password using js-controller 3.0 build-in routine
* (grizzelbee) Upd: Added topic "Controlling your device(s)" to readme
* (grizzelbee) Upd: Removed unnecessary saving of MQTT password
* (grizzelbee) Upd: [#9](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/9) Added some more dyson codes for heaters and humidifiers


### V0.7.0 (2021-01-08) (Afraid of the dark)
* (jpwenzel)   New: Removing crypto from package dependency list (using Node.js provided version)
* (jpwenzel)   New: Introducing unit tests
* (jpwenzel)   New: At least NodeJs 10.0.0 is required
* (grizzelbee) New: [#23](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/23) - Introduced new data field AirQuality which represents the worst value of all present indexes.
* (grizzelbee) New: BREAKING CHANGE! - switched over to the adapter-prototype build-in password encryption. Therefore you'll need to enter your password again in config.
* (grizzelbee) New: At least js-controller 3.0.0 is required
* (grizzelbee) New: At least admin 4.0.9 is required
* (jpwenzel)   Fix: General overhaul of readme
* (jpwenzel)   Fix: Code refactoring
* (grizzelbee) Fix: fixed some datafield names - please delete the whole device folder and get them newly created.
* (grizzelbee) Fix: [#18](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/18) - Fixed creating the indexes when there is no according sensor
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Displaying Filter life value in hours again
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Creating additional Filter life value in percent
* (grizzelbee) Fix: removed materializeTab from ioPackage
* (grizzelbee) Fix: calling setState now as callback in createOrExtendObject
* (grizzelbee) Fix: Removed non compliant values for ROLE
* (grizzelbee) Fix: calling setState in callback of set/createObject now
* (grizzelbee) Fix: ensuring to clear all timeouts in onUnload-function

### V0.6.0 (2020-10-29) (Rage before the storm)
* (grizzelbee) New: [#17](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/17) - Added online-indicator for each device
* (grizzelbee) New: [#19](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/19) - Extended Password length from 15 characters to 32
* (grizzelbee) New: [#20](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/20) - Improved errorhandling on http communication with Dyson API
* (grizzelbee) Fix: Fixed typo within data field anchorpoint - please delete the old ancorpoint manually.
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Filter life value is now displayed in percent not in hours

### V0.5.1 (2020-10-27) (Heart of the hurricance)
* (grizzelbee) Fix: Added missing clearTimeout

### V0.5.0 (2020-10-27) (Heart of the hurricance)
* (grizzelbee) New: Editable data fields have now appropiate value lists
* (grizzelbee) New: Added more country codes
* (grizzelbee) New: Target temperature of heater can now be set - **in the configured unit!**
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Filter life value is now displayed in percent not in hours
* (grizzelbee) Fix: [#6](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/6) - Changing the fanspeed does now fully work.  

### V0.4.1 (2020-10-16) (unbroken)
* (grizzelbee) New: [#8](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/8) - Documented ProductTypes for better overview and user experience in ReadMe
* (grizzelbee) New: [#9](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/9) - Added some Hot&Cool specific datafields
* (grizzelbee) New: Logging of from devices, when shutting down the adapter
* (grizzelbee) New: [#10](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/10) - Pollig device data every X (configurable) seconds for new data, hence sensors don't send updates on changing values
* (grizzelbee) New: [#11](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/11) - Added Austria and France to Country-List
* (grizzelbee) Fix: Fixed bug in error handling when login to Dyson API fails
* (grizzelbee) Fix: [#12](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/12) - Fixed Dyson API login by completely securing via HTTPS.
* (grizzelbee) Fix: Updated some descriptions in config
  
### V0.4.0 (2020-09-29)
* (grizzelbee) New: devices are now **controllable**
* (grizzelbee) New: state-change-messages are processed correctly now
* (grizzelbee) Fix: Added missing °-Sign to temperature unit
* (grizzelbee) Fix: Terminating adapter when starting with missing Dyson credentials
* (grizzelbee) Fix: NO2 and VOC Indices should work now
* (grizzelbee) Fix: Fixed build errors

### V0.3.0 (2020-09-27) - first version worth giving it a try
* (grizzelbee) New: Messages received via Web-API and MQTT getting processed
* (grizzelbee) New: datapoints getting created and populated
* (grizzelbee) New: Added config item for desired temperature unit (Kelvin, Fahrenheit, Celsius)
* (grizzelbee) New: Added missing product names to product numbers
* (grizzelbee) New: Hostaddress/IP is editable / configurable
* (grizzelbee) New: calculate quality indexes for PM2.5, PM10, VOC and NO2 according to Dyson App

### V0.2.0 (2020-09-22) - not working! Do not install/use
* (grizzelbee) New: Login to Dyson API works
* (grizzelbee) New: Login to Dyson AirPurifier (2018 Dyson Pure Cool Tower [TP04]) works
* (grizzelbee) New: mqtt-Login to [TP04] works
* (grizzelbee) New: mqtt-request from [TP04] works
* (grizzelbee) New: mqtt-request to [TP04] is responding

### V0.1.0 (2020-09-04) - not working! Do not install/use
* (grizzelbee) first development body (non functional)

## License

MIT License

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

Copyright (c) 2020 Hanjo Hingsen <hanjo@hingsen.de>