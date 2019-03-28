---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sourceanalytix/README.md
title: [Бета - выпущен] SourceAnalytix
hash: x4Jcz2GtRG/pKhPzA8CnttAg9HW2mFikuPbGhV95eHQ=
---
# [Бета - выпущен] SourceAnalytix

![тесты](https://travis-ci.org/iobroker-community-adapters/ioBroker.sourceanalytix.svg?branch=master)
![Количество установок](http://iobroker.live/badges/sourceanalytix-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sourceanalytix.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sourceanalytix.svg)
![Значок Greenkeeper](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.sourceanalytix.svg)

## Внимание, этому адаптеру нужен узел 8 или выше !!!
ioBroker SourceAnalytix позволяет вам отслеживать и отслеживать потребление, стоимость и значения счетчиков для ваших устройств.
Вам нужны данные в качестве входных данных (общее количество использованного Wh, л / ч или м3) с ваших устройств, и этот адаптер будет:

* Отслеживание потребления ежедневно, еженедельно, ежемесячно, ежеквартально, ежегодно
* рассчитать стоимость (текущая цена настраивается)
* Может использоваться для энергопотребления, жидкостей и ГАЗА
* Входные значения могут быть wh / кВтч / м3 / л

## Как
* [ ] Сделать

Этот адаптер имеет свои корни благодаря пиксам в 2016 году https://forum.iobroker.net/viewtopic.php?f=21&t=2262

Что было улучшено @hadering и опубликовано на github https://github.com/hdering/homematic_verbrauchszaehler

## Известные вопросы
* [] Расчет периода выбирается, но еще не реализован
* [] сохранить текущие значения счетчика, еще не реализованные
* [] четверти не рассчитаны
* [] месячная стоимость еще не включена в расчет
* [x] Значение счетчика выбирается, но еще не реализовано
* [x] требуется перезагрузка адаптера для добавления расчета новых объектов
* [x] Состояния для доставки по типу стоимости не записываются
* [x] псевдоним устройства неверен
* [x] переводы

## Сделать
* [ ] Документация
* [] Стоимость по умолчанию равна 0 с сообщением об ошибке, если не указано
* [] пересчет на основе значений счетчика (настраивается по дате)
* [] расчеты для квартальных значений
* [] хранение значений счетчиков для каждого штата
* [] добавить состояния объекта для предыдущего [x] дня, [x] недели, [x] месяца, [x] квартала, [x] года, настраиваемых в настройках адаптера
* [] оптимизация кода
* [x] компактный режим
* [x] добавить поддержку для вычисления значений wh
* [x] Исправлены основные переводы.
* [x] готовые значения состояний и сохранение в состояниях
* [x] записать значение счетчика в состояние «старт» для использования в расчетах
* [x] настраиваемый интервал для каждого состояния
* [x] настраиваемая единица измерения для каждого состояния
* [x] настраиваемая себестоимость для каждого штата
* [x] настраиваемая цена за единицу для каждого штата
* [x] Штат, использованный для стоимости или заработка
* [x] расчет потребления
* [x] расчет стоимости
* [x] регулируемая начальная точка измерения
* [x] поддержка нескольких состояний устройства
* [x] записать значение метра в объект для использования в расчетах
* [x] конфигурация в настройках адаптера (в настоящее время поддерживаются только демонстрационные объекты Discovergy)
* [x] удалить временные состояния для расчетов
* [x] расчет для значений м3
* [x] использовать псевдоним имени устройства
* [x] настраиваемые точки данных (да / нет) для стоимости, потребления и значений счетчиков
* [x] Возможность выбора хранения аналитики за полный год или только по выбору
* [x] убедитесь, что все значения сохраняются при выключении адаптера, чтобы предотвратить пробелы в данных

## Changelog

### 0.2.276
* (Dutchman) implemented meter readings
* (Dutchman & @AlCalzone) code improvements & stability
* (Dutchman) fix issue with liquid unit reading (m3)

### 0.2.273
* (Dutchman) fix issue in daily reset of start values
* (Dutchman) Fix badges in readme
* (Dutchman) exclude calculations of w from current routines (will be implemented in next version(s)

### 0.2.272
* (Dutchman) change logic of initialisation
* (Dutchman) fix issue in calculation handling
* (Dutchman) extract unit definition to central function
* (Dutchman) removed "logging to troubleshoot", use "debug" in adapter setting

### 0.2.271
* (Dutchman) implement compact mode
* (Dutchman) fix testing issues
* (Dutchman) fix error "unit" or "tolowercase" is undefind
* (Dutchman) fixed installation issues

### 0.2.27
* (Dutchman) fixed issue related to multihost installations with slave as target

### 0.2.26
* (Dutchman) fixed issue in calculations for gas environments and liquids
* (Dutchman) improve logging related to issue analytics

### 0.2.25
* (Dutchman) add option in state setting to automatically OR manually choose the meassurement unit (for cases device state does not have correct value)

### 0.2.24
* (Dutchman) add support for heating pumps
* (Dutchman) improvements in adapter configuration screen

### 0.2.2
* (Dutchman) fixed reset of start values
* (Dutchman) removed uneeded logging "Write calculations for : "
* (Dutchman) generic improvement of logging, to see status messages activate it in adapter settings ! Otherwise onlyu erros will be shown and add/del devices
* (Dutchman) improved complete logic of state add/delete/update config in backend which will result in better performance/error handling
* (Dutchman) small fixed in configuration screen to show logging options

### 0.2.1
* (Dutchman) fixed "current_day" missing in object tree
* (Dutchman) fixed log messages "removed from SourceAnalytix"
* (Dutchman) fixed unit issue to support upper and lower case in values
* (Dutchman) fixed unit issue replace strange characters
* (Dutchman) remove intervall setting from configuraiton screen (handle by state subscribtion now!)
* (Dutchman) remove start meassurement from state configuraiton screen (not need, please use day start, week start etc !)

### 0.2.0
* (Dutchman) rebuild logic to calculate values (beta testing)
* (Dutchman) implement logic to automatically reset values by start of new day, week, month, year etc (beta testing)
* (Dutchman) changed logic from intervall polling to handle calculations based on state updates (beta testing, not if suitable for all situations)
* (Dutchman) fixed issue incorrect states are added to monitoring
* (Dutchman) fixed issue calculation not stopped when state removed from monitoring
* (Dutchman) always store all current meassurements to values of cathegorie regardless setting year etc
* (Dutchman) code cleanup and optiomalisation
* (Dutchman) added logging option "satus notification"
* (Dutchman) implement new translation mechanisme


### 0.1.9 
* (Dutchman) Adapter moved to community development tree
* (Dutchman) added npm version and test-status to readme
* (Dutchman) finalized new konfiguration screen & translations
* (Dutchman) adding/removing objects from analytix does not need adapter reboot anymore ! :-)
* (Dutchman) rebuild logic how data is handled as basic for new calculation logic (Experimental)
* (Dutchman) added options to year analytics to choose values (days,weeks,years etc)
* (Dutchman) option added for Developer logging
* (Dutchman) Basic price is currently not considered in cost calculations !
* (Dutchman) Values day start, week start etc are currenlty not automatically set (will be in 0.2.0)


### 0.1.8 (unuasable temporary verion )
* (Dutchman) konfiguration pages completly redesigned : Please do not enter values yet !
* (Dutchman) master konfiguration added to globally define costs
* (Dutchman) intervall settings moved to global setting instead of each state seperated
* (Dutchman) instead of cost-price in each state use drop down menu to choose values from global settings
* (Dutchman) fixed naming and translations

### 0.1.6
* (Dutchman) fixed data reset for quarter values (thank you Jens !)
* (Dutchman) fixed usage of alias
* (Dutchman) fixeded issue in calculation of earnings and delivery
* (Dutchman) logging improvement
* (Dutchman) fixed log messages
* (Dutchman) calculation for m3 values
* (Dutchman) calculation for l values

### 0.1.5
* (Dutchman) improved state write logic, only sent write commando when needed

### 0.1.3
* (Dutchman) add support for calculation of Wh values

### 0.1.0
* (Dutchman) first public beta release
* (Dutchman) fixed translations
* (Dutchman) rebuild calculation logic
* (Dutchman) fixed calculation of start offset
* (Dutchman) adjustable if state is used for cosumption or delivery
* (Dutchman) limited possible logging to kWh only for this moment
* (Dutchman) only create states and channels for logging types selected

### 0.0.9
* (Dutchman) fixed wrong calculation of start values
* (Dutchman) fixed wrong calculation of quarter values
* (Dutchman) prepare public beta and travis testing
* (Dutchman) change name to SourceAnalytix
* (Dutchman) implemented SourceAnalytix settings at states (equal to data logging adapters)
* (Dutchman) configurable unit for every state, automatically from object state. currently only kWh supported !

### 0.0.8
* (Dutchman) configurable intervall for every state

### 0.0.7
* (Dutchman) automated reset of start values

### 0.0.6
* (Dutchman) fixed issue with travis build
* (Dutchman) fixed wrong information in package-json

### 0.0.4
* (Dutchman) cost calculation
* (Dutchman) adjustable starting point of meassurement
* (Dutchman) support of multiple device states instead of 1
* (Dutchman) fixed calculation of current consumptions

### 0.0.3
* (Dutchman) code optimalisation

### 0.0.2
* (Dutchman) creation of object structure
* (Dutchman) first values read based on test_object.js input file to read values adn write data of current period.s

### 0.0.1
* (Dutchman) initial release

## License
MIT License

Copyright (c) 2018 Dutchman

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