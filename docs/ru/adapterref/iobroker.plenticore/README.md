---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.plenticore/README.md
title: ioBroker.plenticore
hash: NOmuppZJszQtk4vXpDIlZVzc184ehQ9fxCYn+38dLIM=
---
![логотип](../../../en/adapterref/iobroker.plenticore/admin/plenticore.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.plenticore.svg)
![Статус сборки](https://travis-ci.org/StrathCole/ioBroker.plenticore.svg?branch=master)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# IoBroker.plenticore
Адаптер ioBroker для инвертора KOSTAL Plenticore Plus (т.е. Plenticore Plus 8.5)

Этот адаптер использует внутренний веб-интерфейс преобразователя для доступа к свойствам и настройкам преобразователя и подключенных устройств (например, батареи или интеллектуального счетчика энергии). Чтобы использовать адаптер, вам необходимо подключить экземпляр ioBroker к сети, в которой находится KOSTAL Plenticore.

Этот адаптер НЕ является официальным продуктом KOSTAL и не поддерживается и не поддерживается KOSTAL. Это частный проект, который все еще находится на ранней стадии разработки, поэтому используйте его на свой страх и риск!

## Config
Установите IP-адрес вашего преобразователя (например, 192.168.0.23) и ваш пароль, который вы используете для подключения в качестве владельца установки к веб-интерфейсу преобразователя. Интервал опроса составляет миллисекунды (т.е. 10000 - 10 секунд).

## Адаптер
Адаптер не использует скрининг. Он использует тот же API REST, что и веб-интерфейс. Могут быть (многие) функции, которые (пока) не используются адаптером.

### Почему бы (просто) не использовать Modbus?
В преобразователе включен протокол Modbus tcp, поэтому вы можете использовать адаптер Modbus для запроса значений. KOSTAL не разрешает писать ни один из адресов Modbus. Таким образом, вы не можете установить е. грамм. минимальная зарядка батареи с помощью ioBroker.

### Использование адаптера
Адаптер должен заполнить некоторые объекты в дереве объектов plenticore.X. Некоторые из них доступны только для чтения, e. грамм. текущий выход PV или домашнее энергопотребление. Другие переменчивы, e. грамм. минимальный SoC батареи или режимы управления батареей. Я протестировал адаптер на Plenticore Plus 10.

Я еще не реализовал все конечные точки API, особенно статистику потока энергии, которая используется для страницы «статистика» в веб-интерфейсе. Также в адаптере очень мало переводов, так как я совершенно новичок в разработке для ioBroker.

## Объекты
Ниже приводится выдержка из наиболее важных объектов, используемых и заполненных этим адаптером. Все настройки, отмеченные `[**]`, должны быть доступны для редактирования, но не все из них были протестированы, и могут быть (и будут) ошибки.

### Plenticore.X.devices.local
Дерево devices.local содержит информацию о преобразователе и, возможно, подключенном интеллектуальном счетчике энергии и / или аккумуляторе.

`plenticore.X.devices.local.Dc_P` - текущая мощность постоянного тока, включая автономную мощность инвертора. Это значение должно быть близко к значению `plenticore.X.devices.local.ac.P` (около + 30-40 Вт) `plenticore.X.devices.local.Home_P` - текущая общая используемая домашняя мощность `plenticore.X.devices.local.HomeBat_P` - текущая домашняя мощность, обеспечиваемая батареей §§SSSSS_4§ § - текущая домашняя мощность, напрямую предоставляемая станцией `plenticore.X.devices.local.HomeGrid_P` - текущая домашняя мощность, обеспеченная сетью `plenticore.X.devices.local.LimitEvuAbs` - расчетный текущий предел мощности, отправляемой в сеть. если больше энергии вырабатывается растением, оно будет потеряно.
`plenticore.X.devices.local.StateKey0` - если истина, управление батареей инвертора было разблокировано

#### Plenticore.X.devices.local.ac
Этот канал содержит информацию о стороне переменного тока инвертора. Наиболее важными из них являются: `plenticore.X.devices.local.ac.Frequency` - частота сети `plenticore.X.devices.local.ac.L1_P` - текущая мощность фазы 1 в Вт `plenticore.X.devices.local.ac.L2_P` - текущая мощность фазы 2 в Вт `plenticore.X.devices.local.ac.L3_P` - текущая мощность фазы 3 в Вт `plenticore.X.devices.local.ac.P` - текущая полная мощность, излучаемая инвертором, включая разряд батареи

#### Plenticore.X.devices.local.battery
`plenticore.X.devices.local.battery.Cycles` - срок службы батареи до настоящего момента. `[**] plenticore.X.devices.local.battery.DynamicSoc` - истина, если включен динамический SoC (только если верно также `SmartBatteryControl`) `[**] plenticore.X.devices.local.battery.MinHomeConsumption` - минимальное домашнее энергопотребление, которое необходим для использования батареи `[**] plenticore.X.devices.local.battery.MinSoc` - желаемый минимальный SoC (State of Charge) состояния батареи. Фактическая SoC может пойти ниже этого, если не хватает солнечной энергии.
`plenticore.X.devices.local.battery.P` - текущий заряд батареи (отрицательный при зарядке, положительный при разрядке) `[**] plenticore.X.devices.local.battery.SmartBatteryControl` - true, если интеллектуальное управление батареей включено. Что касается официального руководства, то оно должно быть включено только в том случае, если нет источника переменного тока, такого как второй инвертор. `plenticore.X.devices.local.battery.SoC` - текущее состояние заряда батареи.

#### Plenticore.X.devices.local.inverter
`plenticore.X.devices.local.inverter.MaxApparentPower` - максимальная мощность, которую может обеспечить инвертор

#### Plenticore.X.devices.local.pv1 / pv2
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
Точки данных в этом разделе содержат статистику, видимую в веб-интерфейсе Plenticore. После только упомянутых точек данных `Day`, но каждый из них также доступен для `Month`, `Year` и `Total`.

`plenticore.0.scb.statistic.EnergyFlow.AutarkyDay` - автаркия в процентах за текущий день. `plenticore.0.scb.statistic.EnergyFlow.CO2SavingDay` - расчетная экономия CO2 в кг за текущий день. § - общее домашнее потребление, обеспеченное фотоэлектрической установкой за текущий день. `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeBatDay` - общее домашнее потребление, обеспеченное батареей за текущий день. `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeGridDay` - общее домашнее потребление, обеспеченное электрической сетью для текущий день `plenticore.0.scb.statistic.EnergyFlow.OwnConsumptionRateDay` - собственная норма потребления (генерируемая мощность установки НЕ отправляется в сеть) за текущий день. `plenticore.0.scb.statistic.EnergyFlow.YieldDay` - общая выработка станции за текущий день.

## Данные прогноза
Чтобы использовать функцию прогноза, у вас должен быть установлен адаптер ioBroker.darksky или ioBroker.weatherunderground. Кроме того, вам необходимо настроить глобальное географическое положение системы (долгота и широта) и установить расширенную конфигурацию адаптера plenticore (данные панели и батареи, если применимо).

### Plenticore.0.forecast.consump
`plenticore.0.forecast.consumption.day` - средняя потребляемая мощность в дневное время в течение последних 3 дней `plenticore.0.forecast.consumption.night` - средняя потребляемая мощность в ночное время в течение последних 3 дней.

### Plenticore.0.forecast.current
`plenticore.0.forecast.current.sky` - текущая облачность от погодного адаптера `plenticore.0.forecast.current.visibility` - текущая видимость от погодного адаптера `plenticore.0.forecast.current.power.generated` - генерируемая мощность станции в текущий день и до текущего времени `plenticore.0.forecast.current.power.max` - расчетная максимальная мощность станции при чистом небо (0% облачности) `plenticore.0.forecast.current.power.sky` - расчетная мощность станции с учетом текущего облачного покрытия от погодного адаптера `plenticore.0.forecast.current.power.skyvis` - расчетная мощность станции с учетом текущего облачного покрытия и видимости от погодного адаптера `plenticore.0.forecast.current.sun.azimuth` - текущая позиция солнца (азимут) `plenticore.0.forecast.current.sun.elevation` - текущая позиция солнца (элевация) `plenticore.0.forecast.current.sun.sunrise` - время восхода прогнозируемой даты (сегодня или завтра) `plenticore.0.forecast.current.sun.sunset` - время заката прогнозируемой даты (либо сегодня или завтра)

### Plenticore.0.forecast.power
`plenticore.0.forecast.power.date` - дата, для которой информация о текущем прогнозе мощности предназначена для `plenticore.0.forecast.power.day` - прогноз общей мощности на день `plenticore.0.forecast.power.day_high` - прогноз общей мощности на день без учета данных о видимости адаптера погоды `plenticore.0.forecast.power.remaining` - остаточная мощность прогнозируемой суммы за день, основанная на `plenticore.0.forecast.power.day` `plenticore.0.forecast.power.Xh.power` - оценочная общая мощность от станции в солнечный час X прогнозируемого дня, где 1h - час восхода солнца `plenticore.0.forecast.power.1h.time` - время начала солнечного часа для `plenticore.0.forecast.power.Xh.power`

## Пожертвовать
[![PayPal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

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