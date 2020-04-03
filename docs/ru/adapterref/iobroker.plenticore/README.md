---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.plenticore/README.md
title: ioBroker.plenticore
hash: vqQ+RT/i/DyLu9kq8J5F9MibEr8IsgioGiC01n6rCM4=
---
![логотип](../../../en/adapterref/iobroker.plenticore/admin/plenticore.png)

![Количество установок](http://iobroker.live/badges/plenticore-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.plenticore.svg)
![NPM](https://nodei.co/npm/iobroker.plenticore.png?downloads=true)
![стабильный](http://iobroker.live/badges/plenticore-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.plenticore.svg)
![Статус сборки](https://travis-ci.org/StrathCole/ioBroker.plenticore.svg?branch=master)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

Eine deutsche Beschreibung ist [Hier Zu Finden](https://github.com/StrathCole/ioBroker.plenticore/blob/master/README_de.md).

# IoBroker.plenticore
Адаптер ioBroker для инвертора KOSTAL Plenticore Plus (т.е. Plenticore Plus 8.5)

Этот адаптер использует внутренний веб-интерфейс преобразователя для доступа к свойствам и настройкам преобразователя и подключенных устройств (например, батареи или интеллектуального счетчика энергии). Чтобы использовать адаптер, вам необходимо подключить экземпляр ioBroker к сети, в которой находится KOSTAL Plenticore.

Этот адаптер НЕ является официальным продуктом KOSTAL и не поддерживается и не поддерживается KOSTAL. Это частный проект, который все еще находится на ранней стадии разработки, поэтому используйте его на свой страх и риск!

## Config
Установите IP-адрес вашего преобразователя (например, 192.168.0.23) и ваш пароль, который вы используете для подключения в качестве владельца установки к веб-интерфейсу преобразователя. Интервал опроса находится в миллисекундах (т.е. 10000 - это 10 секунд).

## Адаптер
Адаптер не использует скрининг. Он использует тот же API REST, что и веб-интерфейс. Могут быть (многие) функции, которые (пока) не используются адаптером.

### Почему бы (просто) не использовать Modbus?
В преобразователе включен протокол Modbus tcp, поэтому вы можете использовать адаптер Modbus для запроса значений. KOSTAL не разрешает писать ни один из адресов Modbus. Таким образом, вы не можете установить е. грамм. минимальная зарядка батареи с помощью ioBroker.

### Использование адаптера
Адаптер должен заполнить некоторые объекты в дереве объектов plenticore.X. Некоторые из них доступны только для чтения, e. грамм. текущий выход PV или домашнее энергопотребление. Другие переменчивы, e. грамм. минимальный SoC батареи или режимы управления батареей. Я протестировал адаптер на Plenticore Plus 10.

## Объекты
Ниже приводится выдержка из наиболее важных объектов, используемых и заполненных этим адаптером. Все настройки, отмеченные `[**]`, должны быть доступны для редактирования, но не все из них были протестированы, и могут быть ошибки.

### Plenticore.X.devices.local
Дерево devices.local содержит информацию о преобразователе и, возможно, подключенном интеллектуальном счетчике энергии и / или батарее.

`plenticore.X.devices.local.Dc_P` - текущая мощность постоянного тока, включая автономную мощность инвертора. Это значение должно быть близко к значению `plenticore.X.devices.local.ac.P` (около + 30-40 Вт) `plenticore.X.devices.local.Pv_P` - текущей генерируемой мощности PV. Это значение рассчитывается адаптером путем суммирования значений pvx.P.
`plenticore.X.devices.local.Home_P` - текущая общая потребляемая мощность дома `plenticore.X.devices.local.HomeBat_P` - текущая мощность дома, обеспечиваемая батареей мощность, предоставляемая сетью `plenticore.X.devices.local.ToGrid_P` - текущая мощность, передаваемая в сеть. Это значение рассчитывается адаптером и может быть не на 100% точным.
`plenticore.X.devices.local.LimitEvuAbs` - расчетный предел мощности, который может покинуть преобразователь. если больше энергии вырабатывается растением, оно будет потеряно.
`plenticore.X.devices.local.StateKey0` - если true, управление батареей инвертора было разблокировано

#### Plenticore.X.devices.local.ac
Этот канал содержит информацию о стороне переменного тока инвертора. Наиболее важными являются: `plenticore.X.devices.local.ac.Frequency` - чистая частота `plenticore.X.devices.local.ac.L1_P` - текущая мощность фазы 1 в Вт `plenticore.X.devices.local.ac.L2_P` - текущая мощность фазы 2 в Вт `plenticore.X.devices.local.ac.L3_P` - текущая мощность фазы 3 в Вт.

#### Plenticore.X.devices.local.battery
`plenticore.X.devices.local.battery.Cycles` - срок службы батареи до настоящего момента. `[**] plenticore.X.devices.local.battery.DynamicSoc` - истина, если включен динамический SoC (только если верно также `SmartBatteryControl`) `[**] plenticore.X.devices.local.battery.MinHomeConsumption` - минимальное домашнее энергопотребление, которое необходим для использования батареи `[**] plenticore.X.devices.local.battery.MinSoc` - желаемый минимальный SoC (State of Charge) состояния батареи. Фактическая SoC может пойти ниже этого, если не хватает солнечной энергии.
`plenticore.X.devices.local.battery.MinSocDummy` - это значение устанавливается адаптером, если управление MinSoC отключено в конфигурации. Это показывает, какое значение будет установлено MinSoC.
`plenticore.X.devices.local.battery.P` - текущая мощность батареи (отрицательная при зарядке, положительная при разрядке) `plenticore.X.devices.local.battery.Charge_P` - текущая зарядная емкость батареи (0 при разрядке) `plenticore.X.devices.local.battery.Discharge_P` - текущая мощность разрядки батареи (0 при зарядке) ) `[**] plenticore.X.devices.local.battery.SmartBatteryControl` - true, если интеллектуальное управление батареями включено. Что касается официального руководства, то оно должно быть включено только в том случае, если нет источника переменного тока, такого как второй инвертор. `plenticore.X.devices.local.battery.SoC` - текущее состояние заряда батареи.

#### Plenticore.X.devices.local.inverter
`plenticore.X.devices.local.inverter.MaxApparentPower` - максимальная мощность, которую может обеспечить инвертор

#### Plenticore.X.devices.local.pv1 / pv2 / pv3
`plenticore.X.devices.local.pvX.P` - текущая мощность, обеспечиваемая фазой X станции

### Plenticore.X.scb
Этот канал содержит информацию и настройки самого устройства

#### Plenticore.X.scb.modbus
`[**] plenticore.X.scb.modbus.ModbusEnable` - true, если протокол Modbus включен. `[**] plenticore.X.scb.modbus.ModbusUnitId` - идентификатор устройства Modbus устройства.

#### Plenticore.X.scb.network
`[**] plenticore.X.scb.network.Hostname` - текущее имя хоста инвертора `[**] plenticore.X.scb.network.IPv4Auto` - используйте DHCP для предоставления настроек IP-адреса для инвертора `[**] plenticore.X.scb.network.IPv4Address` - текущий IP-адрес инвертора `[**] plenticore.X.scb.network.IPv4DNS1` и § §SSSSS_4§§ - используемые в настоящее время DNS-серверы `[**] plenticore.X.scb.network.IPv4Gateway` - используемый в настоящее время сетевой шлюз `[**] plenticore.X.scb.network.IPv4Subnetmask` - маска подсети

#### Plenticore.X.scb.time
`[**] plenticore.X.scb.time.NTPservers` - используемые в настоящее время серверы времени (NTP). Это может быть несколько разделенных пробелом.
`[**] plenticore.X.scb.time.NTPuse` - используйте NTP для установки текущих настроек времени устройства. `[**] plenticore.X.scb.time.Timezone` - часовой пояс устройства.

### Plenticore.X.scb.statistic.EnergyFlow
Точки данных в этом разделе содержат статистику, видимую в веб-интерфейсе Plenticore. Ниже приведены только точки данных `Day`, но каждая из них также доступна для `Month`, `Year` и `Total`.

`plenticore.0.scb.statistic.EnergyFlow.AutarkyDay` - автаркия в процентах за текущий день. `plenticore.0.scb.statistic.EnergyFlow.CO2SavingDay` - расчетная экономия CO2 в кг за текущий день. `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeDay` - общее потребление в домашних хозяйствах в Wh за текущий день. § - общее домашнее потребление, обеспеченное фотоэлектрической установкой за текущий день. `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeBatDay` - общее домашнее потребление, обеспеченное батареей за текущий день. `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeGridDay` - общее домашнее потребление, обеспеченное электрической сетью для текущий день `plenticore.0.scb.statistic.EnergyFlow.EnergyToGridDay` - общая мощность, отправленная в электрическую сеть за текущий день, `plenticore.0.scb.statistic.EnergyFlow.OwnConsumptionRateDay` - собственная норма потребления (произведенная электростанция НЕ отправлена в сеть) за текущий день `plenticore.0.scb.statistic.EnergyFlow.YieldDay` - общая урожайность завода за текущий день

## Данные прогноза
Для питания функции прогноза используются разные источники данных о погоде. Он работает "из коробки", но вы можете улучшить результаты, добавив экземпляры одного или нескольких следующих погодных адаптеров: ioBroker.darksky, ioBroker.weatherunderground, ioBroker.daswetter. Чтобы эта функция работала, вам необходимо настроить глобальное географическое положение системы (долгота и широта) и установить расширенную конфигурацию адаптера plenticore (данные панели и батареи, если применимо).

### Как работает прогноз
Функция прогноза использует предоставленные данные о вашей силовой установке и аккумуляторе для расчета максимально возможной мощности, генерируемой в любое время дня. Это делается с использованием местоположения системы, чтобы получить высоту и азимут солнца и рассчитать значения солнечного сияния. Эти значения объединяются с данными прогноза погоды из разных источников для получения прогноза облачности, тумана и дождя на каждый час дня. Используя эти данные, адаптер вычисляет возможную мощность, которую растение может генерировать при каждом солнечном свете.

Прогнозные значения могут затем использоваться для установки MinSoC батареи, включения или выключения динамического «интеллектуального управления батареями» преобразователя (оба выполняются внутренне с помощью адаптера) или для управления другими решениями в домашнем хозяйстве, e. грамм. отопление, стиральная машина, сушилка, посудомоечная машина и т. д. (выполняется внешним JavaScript / Blockly пользователя).

### Plenticore.0.forecast.consump
`plenticore.0.forecast.consumption.day` - средняя потребляемая мощность в дневное время в течение последних 3 дней `plenticore.0.forecast.consumption.night` - средняя потребляемая мощность в ночное время в течение последних 3 дней.

### Plenticore.0.forecast.current
`plenticore.0.forecast.current.power.generated` - вырабатываемая мощность станции в текущий день и до текущего времени `plenticore.0.forecast.current.power.max` - рассчитанная максимальная мощность станции в чистом небе (0% облачности) `plenticore.0.forecast.current.power.sky` - расчетная мощность станции с учетом текущего покрытия облаков из погодные адаптеры `plenticore.0.forecast.current.power.skyvis` - расчетная мощность станции с учетом текущего облачного покрытия и видимости от погодных адаптеров `plenticore.0.forecast.current.power.skyvisrain` - расчетная мощность станции с учетом текущего облачного покрытия, видимости и прогноза дождя от погодных адаптеров `plenticore.0.forecast.current.visibility.*` - текущий прогноз видимости, предоставленный соответствующим погодным адаптером `plenticore.0.forecast.current.rain.*` - текущий прогноз дождя, предоставленный соответствующим погодным адаптером `plenticore.0.forecast.current.rainChance.*` - текущий прогноз вероятности дождя, предоставленный соответствующим погодным адаптером `plenticore.0.forecast.current.sky.*` - текущий прогноз облаков предоставлен соответствующим погодным адаптером `plenticore.0.forecast.current.sky_high.*` - текущий прогноз облачности (верхние слои воздуха), предоставленный соответствующим погодным адаптером §§SSSSS_10 §§ - текущий прогноз облачности (средние слои воздуха), предоставляемый соответствующим погодным адаптером `plenticore.0.forecast.current.sky_low.*` - текущий прогноз облачности (нижние слои воздуха), предоставленный соответствующим погодным адаптером `plenticore.0.forecast.current.sun.azimuth` - текущее положение солнца (азимут) § §SSSSS_13§§ - текущее положение солнца (подъем)

### Plenticore.0.forecast.day1 - то же самое относится к day2
`plenticore.0.forecast.day1.power.date` - дата, для которой предназначена информация о текущем прогнозе мощности, `plenticore.0.forecast.day1.power.day` - прогноз общей мощности на день. только для оставшихся солнечных часов `plenticore.0.forecast.day1.power.day_high` - прогноз общей мощности на день без учета данных видимости адаптера погоды `plenticore.0.forecast.day1.power.remaining` - оставшаяся мощность прогнозируемой общей суммы на день, на основе прогноза на оставшиеся солнечные часы - расчетная общая мощность от станции в солнечный час X прогнозируемого дня, где 1h - час восхода солнца `plenticore.0.forecast.day1.power.Xh.power_high` - расчетная общая мощность от станции в солнечный час X прогнозируемого дня, но без учета видимости или данные о дожде

## Пожертвовать
[![PayPal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

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