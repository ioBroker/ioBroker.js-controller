---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.heatingcontrol/README.md
title: ioBroker.HeatingControl
hash: /M83RywTZxXt+UVKfss6tcKIoeODTwnUCt8VByMtlk8=
---
![Логотип](../../../en/adapterref/iobroker.heatingcontrol/admin/heatingcontrol.png)

![Количество установок](http://iobroker.live/badges/heatingcontrol-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.heatingcontrol.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)
![Тесты](https://travis-ci.org/rg-engineering/ioBroker.heatingcontrol.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)

# IoBroker.HeatingControl
** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

** Если вам это нравится, рассмотрите возможность пожертвования: **

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

## Адаптер для управления вашей системой отопления.
Особенности:

* Контролируйте уровни заданной температуры всех термостатов по расписанию
* Настройте несколько периодов нагрева для каждого дня и ночи
* Поддерживает все виды термостатов (предварительное условие: он должен быть доступен в ioBroker)
* Автоопределение устройства Homematic
* поддерживает несколько профилей
* Если нет прямого соединения между термостатом и исполнительным механизмом, исполнительный элемент может быть отключен непосредственно от адаптера
* В настоящее время привод отключается сразу при достижении заданной температуры. Как только заданная температура становится ниже фактической температуры, привод включается. (Что нужно сделать: реализовать улучшенный контроль)
* поддерживается неограниченное количество термостатов, приводов и дополнительных устройств на комнату
* Термостат, привод и датчик автоматически определяются для каждой комнаты. Для этого используется функция (например, «нагрев»).
* Комнаты могут быть исключены в интерфейсе администратора, если в комнате есть термостат, но управлять им нельзя.
* датчик используется для снижения целевой температуры (например, если окно открыто); опционально с SensorDelay
* интерфейс к Feiertag-Adapter или любым другим для определения праздников. Государственный праздник может быть обычным днем или воскресеньем. (настройка администратора)
* ручное изменение температуры на определенное время
* предустановленный период отопления
* принять изменения от термостата (опция)
* поддерживается визуализация от [Pittini] (https://github.com/Pittini/iobroker-heatingcontrol-vis). Спасибо!

[часто задаваемые вопросы](doc/FAQ.md)

## Установка
## Настройки
### Главный
* Функция = Функция, которая будет использоваться для обнаружения термостатов, исполнительных механизмов и датчиков в каждой комнате. Это одно из перечислений системы
* timezone = будет использоваться cron для настройки заданий cron
* Путь к Feiertag - Adapter = если вы хотите использовать Feiertag-Adapter для автоматического определения государственных праздников на сегодня, укажите путь здесь (например, feiertage.0)
* удалить все устройства при открытии администратора = должно быть отключено. Включайте его только тогда, когда вам нужно удалить все настройки помещения, привода и датчиков. Поиск устройства будет выполнен, когда откроется администратор адаптера.
* датчик используется = если у вас есть датчики окна, и вы хотите уменьшить целевую температуру, когда окно открыто, включите эту опцию
* используемые приводы = если вы хотите управлять приводами напрямую от адаптера. На всякий случай нет прямой связи между термостатом и приводом.
* используйте приводы, если нет периода нагрева = действительно только с приводами. Определяет, как настраиваются исполнительные механизмы, когда период нагрева не активен.
* используйте приводы, если нет термостата = действительно только с приводами. Если у вас есть комнаты без термостата, но с исполнительным механизмом отопления, вы можете постоянно включать или выключать их.

### Профиль
* Тип профиля = поддерживаются три разных типа профиля (понедельник - воскресенье или понедельник - пятница и суббота / воскресенье или каждый день)
* количество профилей = если вам нужно больше, увеличьте это значение в профиле. Затем вы можете выбрать, какой профиль будет использоваться.
* количество периодов = определите, сколько дневных секций с разной температурой вам нужно. Чем больше вы установите, тем больше точек данных будет создано. Лучше использовать низкое значение (например, 5)
* "государственный праздник, например, воскресенье = если вы хотите установить целевую температуру в праздничный день, например воскресенье, включите эту опцию. В противном случае настройки государственных праздников такие же, как и в обычные дни.
* HeatingPeriod = дата начала и окончания периода отопления. Используется для установки "HeatingPeriodActive"

### Устройства
* список всех номеров. Вы можете отключить комнату здесь.
* нажмите кнопку редактирования справа, чтобы открыть окно настроек термостатов, исполнительных механизмов и датчиков для этой комнаты

### Редактировать комнату
* здесь вы можете проверить и установить ID объекта для термостатов, исполнительных механизмов и датчиков
* вы можете вручную добавить новые термостаты, исполнительные механизмы или датчики. Просто нажмите кнопку +. Затем вы получаете пустую строку, которую необходимо заполнить. Кнопка Edit открывает список доступных устройств в системе.
* термостаты:

** необходимо указать имя, целевой OID температуры и OID текущей температуры.

* приводы

** необходимо указать имя и OID для состояния

* датчики

** необходимо указать имя и OID для текущего состояния

## Точки данных
| Имя DP | описание |
|---------------------|-----------------------------------------------------------------------------------------------------|
| HeatingPeriodActive | если выключено, профили использоваться не будут |
| CurrentProfile | выбрать текущий профиль (на основе 1, означает, что профиль 1 использует точки данных в разделе heatingcontrol.0.Profiles.0) |
| LastProgramRun | показывает время последнего запуска адаптера |

### Понижение / повышение температуры
| Имя DP | описание | целевая температура для относительного снижения | целевая температура для абсолютного снижения |
|-------------------|------------------------------------------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------|
| ГостиПрисутствуют | повысить температуру, потому что гости хотят потеплее | увеличить текущую температуру профиля с помощью Profiles.0.room.GuestIncrease | установите цель на Profiles.0.room.absolute.GuestIncrease |
| PartyNow | снизить температуру, потому что становится жарко »| уменьшить текущую температуру профиля с помощью Profiles.0.room.PartyDecrease | установите цель на Profiles.0.room.absolute.PartyDecrease |
| Настоящее | присутствуем, если нет понизьте температуру | уменьшить текущую температуру профиля с помощью Profiles.0.room.AbsentDecrease | установите цель на Profiles.0.room.absolute.AbsentDecrease |
| VacationAbsent | нас нет, поэтому уменьшаемся и в выходные | уменьшить текущую температуру профиля с помощью Profiles.0.room.VacationAbsentDecrease | установите цель на Profiles.0.room.absolute.VacationAbsentDecrease |

* в обоих вариантах используется только одно опускание (в предыдущей версии адаптера можно было использовать более одного обезжиривания)
* в сценарии абсолютного обезжиривания используются только целевые значения, не равные 0 °C. Если вам не нужно понижать температуру для определенной комнаты, сохраните значения понижения на уровне 0 ° C.

### Без отопительного периода
есть три варианта

* исправить температуру в комнате

Если этот параметр выбран, для каждой комнаты появляется новая точка данных в дереве объектов. Здесь вы можете установить фиксированную целевую температуру, которая устанавливается, когда период нагрева не активен.

* исправить температуру для всех комнат

с помощью этой опции вы можете использовать одну заданную температуру для каждой комнаты, когда период отопления не активен.

* ничего

с этой опцией ничего не будет отправлено на термостат, если период нагрева не активен. Целевая температура остается от последнего тега, когда период нагрева еще был активен.
В этом случае и если вы используете приводы от адаптера, у вас есть возможность определить, как приводы должны быть установлены (выключить, включить или оставить как есть)

## Другие
* HolidayPresent

Если для HolidayPresent установлено значение true, в любом случае используется профиль для воскресенья. Мы предполагаем, что вы дома как в воскресенье.

* PublicHolidyToday

Есть возможность обрабатывать PublicHoliday как воскресенье. Эту опцию можно включить в админке.

### Окно открыто
если "использовать датчики" активен и датчик (и) для комнаты настроен / настроены, то

a) уменьшить текущую температуру профиля, когда окно открыто (true) с помощью Profiles.0.room.WindowOpenDecrease, если настроено относительное уменьшение; b) установить цель в Profiles.0.room.absolute.WindowOpenDecrease, когда окно открыто (true), если абсолютное уменьшение настроен

опционально может использоваться задержка. Если окно открывается только на короткое время, датчик задержки может избежать уменьшения и возврата к нормальному состоянию за очень короткое время.

## Ical поддержка
вы можете использовать свой календарь для изменения точек данных в адаптере.
Просто настройте события из ical в админке. Поддерживаются

* Управление отоплением.0.Присутствует
* Управление отоплением.0.HolidayPresent
* Управление отоплением.0.Отпуск отсутствует
* heatingcontrol.0.ГостиПрисутствуют
* heatingcontrol.0.PartyNow

## Использовать изменения от термостата
Многие пользователи просили возможность перенести изменения с термостата на адаптер. Теперь реализовано четыре варианта:

| вариант | описание | -------------------------- | --------------------- -------------------------------------------------- ---------------- | нет | изменения с термостата игнорируются | как переопределение | изменения с термостата принимаются за отмену; время отмены должно быть установлено заранее в heatingcontrol.0.Rooms.RoomName.TemperaturOverrideTime | | если время переопределения не установлено, то переопределение не выполняется | как настройка нового профиля | изменения от термостата принимаются за расчетную температуру для текущего периода профиля | до следующей точки профиля | изменения от термостата принимаются как заданная температура до следующей точки профиля. Это ручной режим, поэтому используются только датчики окна. Все остальные | | увеличение / уменьшение игнорируются. В каждой комнате есть точка данных для отключения ручного режима перед достижением следующей точки профиля.

## Проблемы и запросы функций
* Если вы столкнулись с какими-либо ошибками или у вас есть запросы функций для этого адаптера, создайте проблему в разделе проблем GitHub адаптера на [github] (https://github.com/rg-engineering/ioBroker.heatingcontrol/issues ). Любые отзывы приветствуются и помогут улучшить этот адаптер.

## Известные вопросы
### Адаптер с Homematic IP Fußbodenheizungsaktor HmIP-FAL230-C10 - 10фач, 230 В
Похоже, что HmIP-FAL230-C10 нельзя использовать напрямую в качестве исполнительного механизма в сочетании с этим адаптером. Если вы используете HmIP-FAL230-C10 вместе с термостатами Homematic, он должен работать.
см. также [Форум](https://forum.iobroker.net/topic/22579/test-adapter-heatingcontrol-v1-0-x/1553)

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не дают сбоев.

## Changelog

### 2.0.0 (2020-12-xx)
* (René) internal refactoring

**ATTENTION: breaking changes !!!!**
* complete internal refactoring (new source files, internal data structures, code review, ...)
* **Periods and Profils count from 1 instead 0**
* ChangesFromThermostat adjustable per room is removed
* recalculation of room temperature is performed only for the room where necessary (in previous versions all rooms were recalculated and new value transmitted)
* SensorOpenDelay / SensorCloseDelay renamed
* ResetButton to disable manual mode (and go back to auto)
* status log per room
* complete profile can be saved and loaded in admin
* copy profile (complete or for a single room) and periods (for a certain profile and room) by button supported
* datapoint selector for external datapoints added in admin
* autodectection for thermostats, sensors and actuators completely overworked
* room detection overworked
* limits and step widh for profil temperatures adjustable in admin for Pittini vis
* simple window status view (in html) for Pittini vis added
* room state as simple html table for vis added
* issues in github: 
	* #161 Profil springt zur angegebenen Zeit nicht um
	* #153 cron Probleme beim ändern eines Profils mittels Javascript
	* #152 Fenstererkennung im manuellen Modus
	* #148 Bei Änderung vom Thermostat bis zum nächsten Profilpunkt müssen Sensoren berücksichtigt werden


### 1.1.2 (2020-11-11)
* (René) bug fix: activate actors after temperatur change

### 1.1.0 (2020-11-01)
* (René) see issue #149: bug fix: calculate current period in case we are still in last period from yesterday

### 1.1.0 (2020-10-20)
* (René) see issue #132: timer before on and off for actuators 
* (René) see issue #143: additional checks to avoid unneccessary override 
* (René) see issue #140: use guests present and party now DP's also as counter like present (as a option); add adjustable counter limit for present, party now and guest present
* (René) see issue #145: avoid reset of target temperatur by profile settings in option "until next profil point" when set by thermostat 

### 1.0.0 (2020-10-09)
* (matida538) added better Handling of strings in HandleThermostat (convert to Number, instead of warn) (e.g. fhem connector for fht80)
* (matida538) changed Check4ValidTemperature to convert strings to Number instead of Int (else we lose information e.g. 18.5 will be 18)
* (René) some smaller code optimisations

### 0.6.0 (2020-09-15)
* (René) see issue #123: use window open / close delay only when window state changed
* (René) see issue #122: better log for different type warning
* (René) see issue #120: override from thermostat only if it's different to current settings
* (René) see issue #126: TestThermostat should not be checked for correct configuration
* (René) see issue #124: vis from Pittini: Image for open / closed window adjustabel (as an option, if nothing is configured the original will be used)
* (René) see issue #127: use value from thermostat until next profile point 
* (René) see issue #128: try to convert string data to number

### 0.5.7 (2020-07-07)
* (René) see issue #116: get MinimumTemperature for vis only if enabled

### 0.5.6 (2020-06-14)
* (René) see issue #113: re-order of rooms added
* (René) see issue #112: bug fix "Fensterübersicht"

### 0.5.4 (2020-06-04)
* (René) bug fix: HeatingControlVis avoid exceptions like "Cannot read property 'val' of null"

### 0.5.3 (2020-06-03)
* (René) bug fix: new temperatures set when current profile is changed
* (René) refactoring HeatingControlVis to avoid exceptions like "Cannot read property 'val' of null"

### 0.5.2 (2020-05-25)
* (René) bug fix: log a warning if actors are configured but UseActors are off

### 0.5.1 (2020-05-22)
* (René) log a warning if actors are configured but UseActors are off
* (René) sentry added
* (René) some hints in admin

### 0.5.0 (2020-05-03)
* (René) see issue #101: sensor close delay added (similar to already existing sensor open delay)
* (René) see issue #103: date/time format string corrected for vis
* (René) see issue #104: bug fix to take over changes from vis
* (René) see issue #102: bug fix change current time period to be shown on vis

### 0.4.0 (2020-05-02)
* (René) see issue #70: use changes from thermostat
* (René) see issue #91 bug fix: if the same sensor is configured for more than one room thermostat target temperature will be set for all configured rooms
* (René) script from Pittini integrated to support his visualization [Pittini](https://github.com/Pittini/iobroker-heatingcontrol-vis) 
* (Dutchman) some refactoring 

### 0.3.19 (2020-03-15)
* (René) create correct cron job for sunday if profile type "every day" is used
* (René) see issue #87: change type of time data points to string
* (René) see issue #87: set correct roles for data points
* (René) see issue #84: set default value for minimum temperature
* (René) see issue #86: all "float" converted to "number""

### 0.3.18 (2020-03-08)
* (René) fix issues reported by adapter checker

### 0.3.17 (2020-03-01)
* (René) check datapoint configuration: if datapoint points to itself then error messages
* (René) support of new vis see issue  #76
* (Rene) thermostat mode if no heating period

### 0.3.16 (2020-02-09)
* (René) deccrease/increase-handling also when Override is active (see issue #72)
* (René) priority handling for temperature increase / decrease overworked (use only values not equal zero)

### 0.3.15 (2020-01-18)
* (René) bug fix: avoid exception when go to override if MinTemperature-check is active

### 0.3.14 (2020-01-12)
* (René) format conversion for temperatures in string to number
* (René) ack for MinTemperature

### 0.3.13 (2019-12-28)
* (René) bugfix create cron jobs for profile type 3 (daily)

### 0.3.12 (2019-12-27)
* (René) bugfix exception in CheckTemperatureChange [ReferenceError: RoomState is not defined] 

### 0.3.11 (2019-12-27)
* (René) option: minimum temperature per room
* (René) bugfix exception in CheckTemperatureChange [ReferenceError: PublicHolidyToday is not defined] 

### 0.3.10 (2019-12-26)
* (René) see issue #54: stop override with OverrideTemperature =0
* (René) new priority for lowering reasons
* (René) handling of actuators without thermostat
* (René) see issue #66: handle lowering in time between 0:00 and first period
* (René) see issue #64: import of configuration fixed

### 0.3.9 (2019-12-14)
* (René) see issue #60: sensor delay
* (René) see issue #57: support of the same sensor for different rooms
* (René) bug fix: "AbsentDecrease not defined" for relative lowering

### 0.3.8 (2019-12-12)
* (René) see issue #59: TemperaturOverride: acceppt hh:mm and hh:mm:ss
* (René) PartyNow support by iCal 
* (René) if useActuators: show how many actuators are active (as a datapoint)

### 0.3.7 (2019-11-29)
Attention: some changes in datapoints!!
* (René) see issue  #53: moved datapoints for relative lowering into "relative"
* (René) new datapoint to show lowering decrease mode (heatingcontrol.0.TemperatureDecreaseMode)
* (René) guest present as interface to ical
* (René) see issue #52: support radar adapter
* (René) all external states checked when adapter starts

### 0.3.6 (2019-11-23)
Attention: some changes in datapoints!!
* (René) moved some datapoints from "profile" to "rooms"
* (René) see issue #50: support absolute and relative decrease of target temperature
* (René) do not check all rooms everytime: when data only for one room changed then check only one room
* (René) only one event is used to lower temperature
* (René) add interface to ical (path to vacation and path to holiday present datapoints)
* (René) support of more then one instance

### 0.3.4 (2019-11-09)
* (René) bug fix in data point name

### 0.3.3 (2019-11-08)
Attention: some changes in datapoints!!
* (René) in admin: new buttons to add search new rooms
* (René) bug fix: in profil type Mo-Fr / Sa- So period order check failed  
* (René) see issue #38: new datapoint for WindowIsOpen
* (René) change datapoint "CurrentTimePeriod" to "CurrentTimePeriodFull", "CurrentTimePeriod" and "CurrentTimePeriodTime"
* (René) bugfix datapoint name "Sa-Su"
* (René) see issue #16: new datapoint "state" per room to show reason for temperatur change 
* (René) change format of LastProgramRun date / time

### 0.3.2 (2019-11-01)
* (René) try to convert temperature to number if NaN
* (René) see issue #33: check for heating period when adapter starts
* (René) fix a problem in subscription function when room can not be found 

### 0.3.1 (2019-10-31)
* (René) see issue #42 and #44: check all sensors per room and set state when adapter starts
* (René) show message in admin when adapter is not online
* (René) pre-define devicelist; add dummy thermostat, if list is empty

### 0.3.0 (2019-10-27)
* (René) see issue #20 + #24: start and end of heating period is configurable in admin 
* (René) see issue #24: use external data point to set internal "present" data point 
* (René) see issue #15: manual temperatur override
* (René) see issue #35: delete of devices
* (René) reset DeleteAll at next admin start 

### 0.2.3 (2019-09-20)
* (René) see issue #19: handling of enums created in iobroker admin fixed
* (René) see issue #13: check order of periods; if order is wrong (next time is smaller than previous) then time si not used for cron and a warning appears in log
* (René) see issue #21: check temperatures after changing of period settings (e.g. time)
* (René) see issue #25: select OID for target and current of thermostat in admin overworked
* (René) change datapoint type from bool to boolean

### 0.2.2 (2019-09-13)
* (René) see issue #14: description of datapoint time changed ('from' instead 'until')
* (René) see issue #12: unnecessary warnings removed
* (René) see issue #17: seconds removed from time list
* (René) datepoint change handling reworked
* (René) see issue #18: take over values from external PublicHoliday-datapoint

### 0.2.1 (2019-09-08)
* (René) bug fixes in actuator handling

### 0.2.0 (2019-09-05)
* (René) path to Feiertag-Adapter can also include a complete datapoint path 

### 0.1.0 (2019-08-25)
* (René) redesign of data structure
	- more then one actuator, sensor and thermostat per room
	- three different profile types
	- manual configuration of devices (if device is not detected automatically)
	- interface to Feiertag-Adapter
	- public holiday as normal day or like sunday (setting in admin)
	- window sensor support. Reduce target temperature when window is open
	- !!ATTENTION!! data structure/objects has been changed. You need to update your visualisation settings

### 0.0.5 (2019-07-08)
* (René) support for max! thermostats

### 0.0.4 (2019-06-23)
* (René) debugging

### 0.0.3 (2019-06-02)
* (René) ready to publish

### 0.0.2 (2019-05-19)
* (René) actuator handling added

### 0.0.1 (2019-04-27)
* (René) initial release

## License

Copyright (C) <2019-2020>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.