---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.valuetrackerovertime/README.md
title: ioBroker.valuetrackerovertime
hash: bR/4DaqaDwejQvgP5BIKrDAMdi+lFoYoip5W2O5eqUI=
---
![Логотип](../../../en/adapterref/iobroker.valuetrackerovertime/admin/ValueTrackerOverTime_Logo.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.valuetrackerovertime.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.valuetrackerovertime.svg)
![Количество установок (последнее)](http://iobroker.live/badges/valuetrackerovertime-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/valuetrackerovertime-stable.svg)
![Статус зависимости](https://img.shields.io/david/Omega236/iobroker.valuetrackerovertime.svg)
![Известные уязвимости](https://snyk.io/test/github/Omega236/ioBroker.valuetrackerovertime/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.valuetrackerovertime.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/Omega236/ioBroker.valuetrackerovertime/master.svg)

# IoBroker.valuetrackerovertime
[![Статус сборки] (https://travis-ci.com/Omega236/ioBroker.valuetrackerovertime.svg?branch=master)](https://travis-ci.com/Omega236/ioBroker.valuetrackerovertime)

## Valuetrackerovertime адаптер для ioBroker
Отслеживает все числа и их увеличение / уменьшение. Затем данные будут использоваться для построения статистики скорости изменения, отображаемой в такое время, как часы, дни, недели, месяцы, кварталы и годы. Собранные данные можно использовать для визуализации, например, энергопотребления в виде графиков.

## Настройки
Настройки ValueTrackerOverTime будут выполняться в двух местах. Настройки по умолчанию будут обрабатываться в экземпляре самого адаптера, настройки для отдельных точек данных будут выполняться в точках данных, содержащих данные, которые необходимо отслеживать.

### Настройки по умолчанию
![участок](../../../en/adapterref/iobroker.valuetrackerovertime/admin/DefaultSettings.png) Это настройки по умолчанию, которые будут запрашиваться каждый раз, когда вы активируете ValueTrackerOverTime на точке данных. Для каждой точки данных они могут быть настроены, но наиболее часто используемые начальные значения устанавливаются здесь как значения по умолчанию, поэтому позже вам не придется вносить много изменений.

#### Подробная история
В разделе «Подробная история» будут выбраны создаваемые точки данных. Вы хотите собирать данные по каждому

* день
* неделю
* месяц
* квартал (года)
* Год

#### Текущие / предыдущие данные
В разделе «Текущие / предыдущие данные» вы можете выбрать, как долго вы хотите хранить собранные данные для каждой точки ValueTrackerOverTime, которая создается для каждого таймфрейма.
Имеет смысл прекратить сбор данных, когда они попадают в другую точку данных (например: через 7 дней данные могут быть накоплены за неделю. Через 4 недели данные появятся через месяц ...)

#### Обнаружение сброса счетчика
Это значение всегда должно быть включено и установлено равным единице. Это помогает ValueTrackerOverTime делать правильные показания после сброса значения в исходной точке данных.

### Настройки Datapoint
![участок](../../../en/adapterref/iobroker.valuetrackerovertime/admin/DatapointSettings.png) В этой настройке вы должны указать нему, которая будет использоваться в качестве имени точки данных для этого узла выбора. Кроме того, вы должны указать единицу, в которой вы хотите собирать данные.
Поэтому, если вы хотите измерить количество дождя, вы можете добавить единицу л / м² или вы хотите измерить количество потребляемой энергии в ватт-часах (кВтч).
Если в самой точке данных используется другая единица измерения (например, Wh), вы можете добавить здесь множитель (например, 60 или 1/60), чтобы преобразовать данные в требуемую единицу.

Остальные настройки перезапишут настройки по умолчанию, которые были установлены в экземпляре адаптера.

## Datapoints
В зависимости от выбранных временных рамок для сбора адаптер создаст для каждой точки данных, которую вы хотите отслеживать, свои собственные точки данных.

На картинке приведены три примера. Поскольку скриншот был сделан 3 января (начало нового года / месяца), прошу прощения за то, что данные не такие красочные и разноплановые.

* Вы можете видеть, что сегодня это был счетчик дождя (Regenmenge) 0,3 л / м², который не менялся всю неделю.
* Солнце вообще не светило в течение этой зимней недели (для моей погодной станции это означает, что в любой день не светило ярче 4500 лм)
* Однако потребление энергии покажет вам, что текущий день для компьютера установлен на 0,351 кВтч, неделя установлена на 1,909 кВтч, а год установлен на 1,393 кВтч (это потому, что сегодня воскресенье, а неделя уже 7 дней. старый, но это также 3 января, поэтому в году всего три дня).

## Changelog
### 0.6.0 (18.02.2021)
* (Omega236) add function to store history-Data to current-DP history"
### 0.5.4
* (Omega236) optimize RAM-Usage (Remove .toLocaleString)
### 0.5.3
* (Omega236) bugfix startvalue not used after SQL read out
### 0.5.2
* (Omega236) bugfix _getObjectAsync not worked
### 0.5.1
* (Omega236) optimizations, HistoryAnalyse extended and CurrentHistory added
### 0.4.1
* (Omega236) bugfix DetailedYear not saved, bugfix HistoryDetailed not used Multi
### 0.4.0
* (Omega236) HistoryAnalyseDetailed Added, Bugfix KW
### 0.3.5
* (Omega236) reset Detection optimize and bugfix only ack
### 0.3.4
* (Omega236) Check for duplicate Alias and reduce recalcs on start-value changed
### 0.3.3
* (Omega236) bugfix date object changed
### 0.3.2
* (Omega236) reemove selectID.js from index_m.html
### 0.3.1
* (Omega236) first public
### 0.0.1
* (Omega236) initial release

## License
MIT License

Copyright (c) 2021 Omega236 <general.of.omega@googlemail.com>

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