---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solarlog/README.md
title: ioBroker.solarlog
hash: kKAdXDlNvQdAVqIsZmi5a6+6azXQzT1PO2eqnZNa3Qk=
---
![Логотип](../../../en/adapterref/iobroker.solarlog/admin/solarlog.png)

![Количество установок](http://iobroker.live/badges/solarlog-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.solarlog.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solarlog.svg)
![НПМ](https://nodei.co/npm/iobroker.solarlog.png?downloads=true)

# IoBroker.solarlog
Адаптер ioBroker для Solarlog - устройства

## Solarlog - Настройки
Открытый JSON-интерфейс (offene Json-Schnittstelle) должен быть активирован в меню конфигурации Solarlog (Konfiguration - System - Zugangskontrolle - Offene Json-Schnittstelle: aktivieren.)

## Адаптер - Настройки
### Базовые настройки
Установите Solarlog - IP-адрес (192.XXX.X.XXX), порт (необязательно) и опрос - интервал потребления / производства в секундах ('live' - данные, мин. 10 с).

Безопасность: вы можете активировать «пользовательский» - пароль в своем Solarlog и флажок «пользовательский логин активирован» и добавить свой пароль в конфигурацию адаптера, или вы можете запустить Solarlog и адаптер без пароля пользователя. Если активирован вход в систему, рекомендуется останавливать адаптер при использовании пользовательского интерфейса solarlog (в противном случае необходимо повторно входить в систему после каждого запроса адаптера).

### Расширенные настройки
Проверьте, все ли инверторы / субметры / устройства / интеллектуальная энергия - данные должны быть собраны.

Установить опрос - интервал для среднего и суммирования значений в минутах (мин. 5мин).

Проверьте, нужно ли собирать исторические данные, и установите время дня, когда объекты исторических данных будут обновляться.

Прогноз: опционально адаптер получает прогноз - данные с помощью Forecast.Solar API. Фактически, прогнозируется общее количество кВтч на сегодняшний и завтрашний день, обновляющееся каждый час. Более подробные или дополнительные данные доступны по запросу (пожалуйста, откройте вопрос).

## Аппаратное обеспечение
Проверено на: Solarlog 200PM + / 300PM + / 500 / 1200Meter / 50

SolarLog 50: нет открытых устройств JSON-Interface @ SolarLog 50. Таким образом, определенные значения в канале «информация» и «статус» будут иметь значение «ДОСТУП ЗАПРЕЩЕН». Если вы предпочитаете другое решение, откройте вопрос или опубликуйте свои предпочтения в соответствующем выпуске.

## Changelog

### 2.1.0

-   Cockpit-Data (consumption/production/battery/feed) added. Polling structure optimized for a faster polling of certain values ('live'-data).

### 2.0.2

-   smart energy 'switch group' data added.

### 2.0.1

-   bugfix (better timing to set inverter data).

### 2.0.0

-   Complete code redesign to reduce traffic between adapter and solarlog. NEW: System informations (info) and solarlogs setpoint-values for year, current and all month and current day (forecast).

### 1.3.0

-   user-login possibility added.

### 1.2.4

-   .npmignore and .gitignore added, small bugfix

### 1.2.3

-   Readme/License update.

### 1.2.2

-   It is now possible to set the time when historic data is requested.

### 1.2.1

-   'Forecast' - bug fixed (forecast request now only submitted if forecast is activated), dependencies updated.

### 1.2.0

-   Shows now forecast data: todays and tomorrows total kWh. Completed translations in words.js.

### 1.1.0

-   Shows detailed information on self - consumption. Imports yearly & monthly historic data.

### 1.0.0

-   Reads now devicetypes, -brands and -classes. Sets correct params for batteries. Displays self-consumption @'status'

### 0.1.6

-   Reads now battery data

### 0.1.5

-   Reads now historic data (yearly sum per Inverter), testing update

### 0.1.4

-   Readme - update

### 0.1.3

-   Core Files/Testing Update and introduce adapter-core

### 0.1.2

-   Inverter/meter - detecion optimized

### 0.1.1

-   support for compact mode

### 0.1.0

-   optional port declaration, readme updated

### 0.0.9

-   another bugfix daysum - function

### 0.0.8

-   bugfix daysum - function

### 0.0.7

-   import of daily sum of production/consumption per inverter/meter in Wh
-   info connection state fixed

### 0.0.6

-   optimized evaluation of number of inverters/meters to import

### 0.0.5

-   better readme
-   correct labes in config-dialogue

Planned for next version: reading solarlog smart energy settings and states

### 0.0.4

-   Inverter-import optional
-   Error - logs refer to functions
-   better readme

Planned for next version: reading solarlog smart energy settings and states

### 0.0.3

New functions added!

-   reads all defined inverters/meters
-   sets objects named as in solarlog
-   gets values (current production/consumption) and states for each inverter

Planned for next version: reading solarlog smart energy settings and states

### 0.0.2 First running version

Defined objects:

-   Time last data sync
-   Installed generator power
-   Total output PAC from all of the inverters and meters in inverter mode.
-   Total output PAC from all of the inverters
-   Average voltage UAC from the inverter
-   Average voltage UDC from the inverter
-   Total yield for the day from all of the inverters
-   Total yield for the previous day from all of the inverters
-   Total yield for the month from all of the inverters
-   Total yield for the year from all of the inverters
-   Total yield from all of the inverters
-   Current total consumption PAC from all of the consumption meters
-   Total consumption from all of the consumption meters
-   Total consumption for the previous day; all of the consumption meters
-   Total consumption for the month; all of the consumption meters
-   Total consumption for the year; all of the consumption meters
-   Accumulated total consumption, all Consumption meter

Planned Objects:

-   Description/Yield/Consuption of all connected inverters and meters

## License

The MIT License (MIT)

Copyright (c) 2018-2021 forelleblau marceladam@gmx.ch

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