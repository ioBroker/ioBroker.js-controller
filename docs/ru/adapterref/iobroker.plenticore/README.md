---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.plenticore/README.md
title: ioBroker.plenticore
hash: elQeOPXkT5ba21PqxJof5sB4rxB8CwcIC0kGZtM23+Y=
---
![Логотип](../../../en/adapterref/iobroker.plenticore/admin/plenticore.png)

![Количество установок](http://iobroker.live/badges/plenticore-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.plenticore.svg)
![НПМ](https://nodei.co/npm/iobroker.plenticore.png?downloads=true)
![Стабильный](http://iobroker.live/badges/plenticore-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.plenticore.svg)
![Статус сборки](https://travis-ci.org/StrathCole/ioBroker.plenticore.svg?branch=master)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

Eine deutsche Beschreibung ist [Hier Zu Finden](https://github.com/StrathCole/ioBroker.plenticore/blob/master/README_de.md).

# IoBroker.plenticore
Адаптер ioBroker для инвертора KOSTAL Plenticore Plus (т.е. Plenticore Plus 8.5)

Этот адаптер использует внутренний веб-интерфейс инвертора для доступа к свойствам и настройкам вашего инвертора и подключенных устройств (например, батареи или интеллектуального счетчика энергии). Чтобы использовать адаптер, вам необходимо, чтобы экземпляр ioBroker был подключен к сети, в которой находится ваш KOSTAL Plenticore.

Этот адаптер НЕ является официальным продуктом KOSTAL, не поддерживается и не одобряется KOSTAL. Это частный проект, который все еще находится на ранней стадии разработки, поэтому используйте его на свой страх и риск!

## Конфиг
Установите IP-адрес вашего инвертора (например, 192.168.0.23) и ваш пароль, который вы используете для подключения в качестве владельца установки к веб-интерфейсу инвертора. Интервал опроса указывается в миллисекундах (т. Е. 10000 составляет 10 секунд).

## Адаптер
Адаптер не использует очистку экрана. Он использует тот же REST API, что и веб-интерфейс. Может быть (много) функций, которые (пока) не используются адаптером.

### Почему бы (просто) не использовать Modbus?
В инверторе включен протокол Modbus TCP, поэтому вы можете использовать адаптер Modbus для запроса значений. Однако KOSTAL не разрешил запись каких-либо адресов Modbus. Значит, вы не можете установить e. грамм. минимум батареи SoC с использованием ioBroker.

### Использование адаптера
Адаптер должен заполнить некоторые объекты под деревом объектов Plenticore.X. Некоторые из них доступны только для чтения, например. грамм. текущая мощность PV или домашнее потребление энергии. Другие изменчивы, например. грамм. минимальный уровень заряда батареи или режимы управления батареей. Я тестировал адаптер на Plenticore Plus 10.

## Объекты
Ниже приводится отрывок из наиболее важных объектов, используемых и заполняемых этим адаптером. Все настройки, отмеченные `[**]`, должны быть доступны для редактирования, но не все из них были протестированы, и в них могут быть ошибки.

### Plenticore.X.devices.local
Дерево devices.local содержит информацию об инверторе и, возможно, подключенном интеллектуальном счетчике энергии и / или батарее.

`plenticore.X.devices.local.Dc_P` - текущая мощность постоянного тока, включая потребляемую мощность инвертора. Это значение должно быть близко к значению `plenticore.X.devices.local.ac.P` (около + 30-40 Вт) `plenticore.X.devices.local.Pv_P` - текущей генерируемой фотоэлектрической мощности. Это значение рассчитывается адаптером путем суммирования значений pvx.P.
`plenticore.X.devices.local.Home_P` - текущая общая использованная домашняя мощность `plenticore.X.devices.local.HomeBat_P` - текущая домашняя мощность, обеспечиваемая батареей `plenticore.X.devices.local.HomePv_P` - текущая домашняя мощность, непосредственно обеспечиваемая заводом `plenticore.X.devices.local.HomeGrid_P` - текущая домашняя мощность мощность, передаваемая в сеть `plenticore.X.devices.local.ToGrid_P` - текущая мощность, передаваемая в сеть. Это значение рассчитывается адаптером и может не соответствовать 100% точности.
`plenticore.X.devices.local.LimitEvuAbs` - расчетный текущий предел мощности, который может покинуть преобразователь. если установка вырабатывает больше энергии, она будет потеряна.
`plenticore.X.devices.local.StateKey0` - если true, управление батареями инвертора было разблокировано

#### Plenticore.X.devices.local.ac
Этот канал содержит информацию о стороне переменного тока инвертора. Наиболее важными являются: `plenticore.X.devices.local.ac.Frequency` - чистая частота `plenticore.X.devices.local.ac.L1_P` - текущая мощность фазы 1 в Вт `plenticore.X.devices.local.ac.L2_P` - текущая мощность фазы 2 в Вт `plenticore.X.devices.local.ac.L3_P` - текущая мощность фазы 3 в W `plenticore.X.devices.local.ac.P` - текущая общая мощность, излучаемая инвертором, включая разряд батареи

#### Plenticore.X.devices.local.battery
`plenticore.X.devices.local.battery.Cycles` - время автономной работы до настоящего момента. `[**] plenticore.X.devices.local.battery.DynamicSoc` - верно, если включен динамический SoC (только если `SmartBatteryControl` тоже верно) `[**] plenticore.X.devices.local.battery.MinHomeConsumption` - минимальное домашнее энергопотребление, которое требуется для использования аккумулятора `[**] plenticore.X.devices.local.battery.MinSoc` - желаемый минимальный уровень заряда аккумулятора. Фактическая SoC может быть ниже этого значения, если не хватает солнечной энергии.
`plenticore.X.devices.local.battery.MinSocDummy` - это значение устанавливается адаптером, если управление MinSoC отключено в конфигурации. Это показать, какое значение будет установлено для MinSoC.
`plenticore.X.devices.local.battery.P` - текущий уровень заряда аккумулятора (отрицательный при зарядке, положительный при разрядке) `plenticore.X.devices.local.battery.Charge_P` - текущий заряд аккумулятора (0 при разрядке) `plenticore.X.devices.local.battery.Discharge_P` - текущая разрядная мощность аккумулятора (0 при зарядке ) `[**] plenticore.X.devices.local.battery.SmartBatteryControl` - истина, если включено интеллектуальное управление батареями. Что касается официального руководства, это должно быть разрешено только в том случае, если нет другого источника переменного тока, такого как задействованный второй инвертор `[**] plenticore.X.devices.local.battery.ExternControl` - 0 для включения внутреннего управления, 1 для внешнего цифрового ввода / вывода, 2 для внешнего Modbus TCP §§SSSSS_11§ § - текущее состояние заряда аккумулятора

#### Plenticore.X.devices.local.inverter
`plenticore.X.devices.local.inverter.MaxApparentPower` - максимальная мощность, которую может обеспечить инвертор

#### Plenticore.X.devices.local.pv1 / pv2 / pv3
`plenticore.X.devices.local.pvX.P` - текущая мощность, обеспечиваемая фазой X установки

### Plenticore.X.scb
Этот канал содержит информацию и настройки самого устройства

#### Plenticore.X.scb.modbus
`[**] plenticore.X.scb.modbus.ModbusEnable` - истина, если включен протокол Modbus TCP `[**] plenticore.X.scb.modbus.ModbusUnitId` - идентификатор устройства Modbus устройства

#### Plenticore.X.scb.network
`[**] plenticore.X.scb.network.Hostname` - текущее имя хоста инвертора `[**] plenticore.X.scb.network.IPv4Auto` - использовать DHCP для предоставления настроек IP-адреса инвертора `[**] plenticore.X.scb.network.IPv4Address` - текущий IP-адрес инвертора `[**] plenticore.X.scb.network.IPv4DNS1` и § §SSSSS_4§§ - используемые в настоящее время DNS-серверы `[**] plenticore.X.scb.network.IPv4Gateway` - используемый в настоящее время сетевой шлюз `[**] plenticore.X.scb.network.IPv4Subnetmask` - маска подсети сети

#### Plenticore.X.scb.time
`[**] plenticore.X.scb.time.NTPservers` - используемые в данный момент серверы времени (NTP). Их может быть несколько, разделенных пробелом.
`[**] plenticore.X.scb.time.NTPuse` - использовать NTP для установки текущих настроек времени устройства `[**] plenticore.X.scb.time.Timezone` - часовой пояс устройства

### Plenticore.X.scb.statistic.EnergyFlow
Точки данных в этом разделе содержат статистику, которая отображается в веб-интерфейсе Plenticore. После упомянуты только точки данных `Day`, но каждая из них также доступна для `Month`, `Year` и `Total`.

`plenticore.0.scb.statistic.EnergyFlow.AutarkyDay` - автаркия в процентах на текущий день `plenticore.0.scb.statistic.EnergyFlow.CO2SavingDay` - расчетная сэкономленная СО2 в кг за текущий день `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeDay` - общее домашнее потребление в Втч за текущий день §§SSSSS_3§ § - общее домашнее потребление, обеспечиваемое фотоэлектрической установкой за текущий день `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeBatDay` - общее домашнее потребление, обеспечиваемое батареей за текущий день `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeGridDay` - общее домашнее потребление, обеспечиваемое электросетью для текущий день `plenticore.0.scb.statistic.EnergyFlow.EnergyToGridDay` - общая мощность, отправленная в энергосистему за текущий день `plenticore.0.scb.statistic.EnergyFlow.OwnConsumptionRateDay` - собственная норма потребления (произведенная электростанция НЕ отправляется в сеть) за текущий день `plenticore.0.scb.statistic.EnergyFlow.YieldDay` - общая урожайность растения на текущий день

## Данные прогноза
Для питания функции прогноза используются разные источники данных о погоде. Он работает по умолчанию, но вы можете улучшить результаты, добавив экземпляры одного или нескольких из следующих погодных адаптеров: ioBroker.darksky, ioBroker.weatherunderground, ioBroker.daswetter. Чтобы эта функция работала, вам необходимо настроить глобальное географическое положение системы (долготу и широту) и установить расширенную конфигурацию адаптера Plenticore (данные панели и батареи, если применимо).

### Как работает прогноз
Функция прогноза использует предоставленные данные о вашей электростанции и батарее для расчета максимально возможной мощности, вырабатываемой в любое время суток. Это делается путем использования местоположения системы для получения высоты и азимута солнца и расчета значений солнечной яркости. Эти значения объединяются с данными прогноза погоды из разных источников, чтобы получить прогноз облачности, тумана и дождя на каждый час дня. Используя эти данные, адаптер вычисляет возможную мощность, которую растение может вырабатывать при каждом солнечном свете.

Значения прогноза затем можно использовать для установки MinSoC батареи, включения или отключения динамического «интеллектуального управления батареей» преобразователя (и то, и другое осуществляется внутри адаптера) или управления другими решениями в доме, например. грамм. отопление, стиральная машина, сушилка, посудомоечная машина и т. д. (выполняется внешним JavaScript / Blockly пользователя).

### Plenticore.0.forecast.consuming
`plenticore.0.forecast.consumption.day` - текущее среднее энергопотребление в дневное время за последние 3 дня `plenticore.0.forecast.consumption.night` - текущее среднее энергопотребление в ночное время за последние 3 дня `plenticore.0.forecast.consumption.remaining` - расчетное остаточное энергопотребление для текущего прогнозируемого дня до заката

### Plenticore.0.forecast.current
`plenticore.0.forecast.current.power.generated` - выработанная мощность станции за текущий день до текущего времени `plenticore.0.forecast.current.power.max` - расчетная максимальная мощность станции при ясном небе (0% облачности) `plenticore.0.forecast.current.power.sky` - расчетная мощность станции с учетом текущего покрытия облачностью от погодные адаптеры `plenticore.0.forecast.current.power.skyvis` - расчетная мощность станции с учетом текущего облачного покрытия и видимости от погодных адаптеров `plenticore.0.forecast.current.power.skyvisrain` - расчетная мощность станции с учетом текущего облачного покрытия, видимости и прогноза дождя от погодных адаптеров `plenticore.0.forecast.current.visibility.*` - текущий прогноз видимости, предоставленный соответствующим адаптером погоды `plenticore.0.forecast.current.rain.*` - текущий прогноз дождя, предоставленный соответствующим адаптером погоды `plenticore.0.forecast.current.rainChance.*` - текущий прогноз вероятности дождя, предоставленный соответствующим адаптером погоды `plenticore.0.forecast.current.sky.*` - текущий прогноз облачности предоставленный соответствующим адаптером погоды `plenticore.0.forecast.current.sky_high.*` - текущий прогноз облачности (верхние слои атмосферы), предоставленный соответствующим адаптером погоды `plenticore.0.forecast.current.sky_medium.*` - текущий прогноз облачности (средний воздух la yers), предоставленный соответствующим адаптером погоды `plenticore.0.forecast.current.sky_low.*` - текущий прогноз облачности (нижние слои атмосферы), предоставленный соответствующим адаптером погоды `plenticore.0.forecast.current.sun.azimuth` - текущее положение солнца (азимут) `plenticore.0.forecast.current.sun.elevation` - текущее положение солнца ( элевация)

### Plenticore.0.forecast.day1 - то же самое для day2
`plenticore.0.forecast.day1.power.date` - дата текущего прогноза мощности для `plenticore.0.forecast.day1.power.day` - прогноз общей мощности на день `plenticore.0.forecast.day1.power.day_adjusted` - прогноз общей мощности на день с учетом выработанной мощности до настоящего момента и с использованием данных прогноза только для оставшихся солнечных часов `plenticore.0.forecast.day1.power.day_high` - общий прогноз мощности на день без учета данных о видимости погодного адаптера `plenticore.0.forecast.day1.power.remaining` - общий оставшийся прогноз энергии на день, основанный на прогнозе оставшихся солнечных часов `plenticore.0.forecast.day1.power.Xh.power` - расчетная общая мощность электростанции в солнечный час X прогнозного дня, где 1ч - час восхода солнца `plenticore.0.forecast.day1.power.Xh.power_high` - расчетная общая мощность электростанции в солнечный час X прогнозируемого дня, но без учета видимости или данные о дожде `plenticore.0.forecast.day1.power.Xh.time` - время начала солнечного часа для `plenticore.0.forecast.power.Xh.power` `plenticore.0.forecast.day1.sun.sunrise` - время восхода даты прогноза `plenticore.0.forecast.day1.sun.sunset` - время заката даты прогноза

## Пожертвовать
[![PayPal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

### 2.1.3
-   Fixed wrong hour of weather forecast from daswetter adapter

### 2.1.2
-   Added setting for minimum SoC to enable battery management

### 2.1.1
-   Fixed problems in config and translations

### 2.1.0
-   Added further forecast sources to provide better power forecasts
-   Added second day forecast
-   Improved code and fixed some minor issues
-   New dependency for xml2js
-   Updated readme

### 2.0.0

-   Code rework
-   Outsourced many functions to libraries
-   This version has new dependencies and requires a newer adapter-core version!
-   Several fixes

### 1.1.1

-   No changes

### 1.1.0

-   Added support for weatherunderground weather adapter. The adapter can be choosen as alternative forecast source over the DarkSky adapter.

### 1.0.2

-   Fixed a warning message occuring far too often

### 1.0.1

-   Added forecast features to readme

### 1.0.0

-	Added power forecast feature

### 0.1.5

-   Added translations
-   Fixed shadow management handling.

### 0.1.4

-   Added shadow management datapoint.

### 0.1.3

-   Do not query battery values if battery management is not unlocked.

### 0.1.2

-   Resolved adapter check issues, see https://github.com/StrathCole/ioBroker.plenticore/issues/1
-   Added statistics data points.

### 0.1.1

-   Removed admin adapter dependency

### 0.1.0

-   First running Version

## License

The MIT License (MIT)

Copyright (c) 2020 Marius Burkard

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