---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.heatingcontrol/README.md
title: ioBroker.HeatingControl
hash: 80yPXOUDRDFJbcLt0uyeDpBihd2v1+HoVsoYRqjJywo=
---
![логотип](../../../en/adapterref/iobroker.heatingcontrol/admin/heatingcontrol.png)

![Количество установок](http://iobroker.live/badges/heatingcontrol-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.heatingcontrol.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)
![тесты](https://travis-ci.org/rg-engineering/ioBroker.heatingcontrol.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)
![Значок Greenkeeper](https://badges.greenkeeper.io/rg-engineering/ioBroker.heatingcontrol.svg)

# IoBroker.HeatingControl
** Если вам это нравится, пожалуйста, рассмотрите пожертвование: **

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

Адаптер для управления вашей системой отопления.

Функции:

* Контроль заданных уровней температуры всех термостатов в соответствии с расписанием
* Настройка нескольких периодов отопления для каждого дня и ночи
* Поддерживает различные Homematic и Макс! термостаты
* поддерживает несколько профилей
* Если нет прямой связи между термостатом и приводом, привод можно отключить непосредственно из адаптера
* В настоящее время привод отключается непосредственно при достижении заданной температуры. Как только заданная температура станет ниже фактической температуры, привод будет включен. (Для этого: реализовать улучшенный контроль)
* Поддерживается неограниченное количество термостатов, приводов и датчиков для каждой комнаты
* Термостат, привод и датчик автоматически определяются для каждой комнаты. Для этого используется функция (например, «нагрев»).
* Комнаты могут быть исключены из интерфейса администратора, если комната содержит термостат, но не должна контролироваться
* датчик используется для снижения целевой температуры (например, если окно открыто); опционально с SensorDelay
* Интерфейс для Feiertag-Adapter или любых других для обнаружения выходных дней. Государственный праздник может быть обычным днем или как воскресенье. (настройка администратора)
* ручное изменение температуры на определенное время
* заданный период нагрева
* поддерживается визуализация из [Питтини] (https://github.com/Pittini/iobroker-heatingcontrol-vis). Спасибо!

[Вопросы-Ответы](doc/FAQ.md)

## Установка
## Настройки
### Основной
* Функция = Функция, используемая для обнаружения термостатов, исполнительных механизмов и датчиков в помещении. Это один из перечислений системы
* часовой пояс = для использования cron для настройки заданий cron
* Путь к Feiertag - Adapter = если вы хотите использовать Feiertag-Adapter для автоматического определения выходного дня на сегодня, то укажите здесь путь (например, feiertage.0)
* удалить все устройства, когда администратор открывает = должен быть отключен. Включайте его только тогда, когда вам нужно удалить все настройки комнаты, привода и датчика. Поиск устройства будет выполнен, когда администратор адаптера откроет
* датчик используется = если у вас есть датчики окна, и вы хотите уменьшить целевую температуру, когда окно открыто, включите эту опцию
* используемые исполнительные механизмы = если вы хотите управлять исполнительными механизмами непосредственно с адаптера. На всякий случай нет прямой связи между термостатом и приводом.
* Используйте приводы, если период нагрева отсутствует = действителен только для приводов. Определяет, как приводы установлены, когда период нагрева не активен
* Используйте приводы, если термостат отсутствует = действителен только для приводов. Если у вас есть комнаты без термостата, но с приводом отопления, вы можете постоянно включать или выключать их

### Профиль
* Тип профиля = поддерживается три разных типа профиля (понедельник - воскресенье или понедельник - пятница и суббота / воскресенье или каждый день)
* количество профилей = если вам нужно больше, то в профиле увеличьте это значение. Затем вы можете выбрать, какой профиль будет использоваться.
* количество периодов = определить, сколько ежедневных секций с различной температурой вам нужно. Чем больше вы установите, тем больше точек данных будет создано. Лучше использовать низкое значение (например, 5)
* "выходной день, например, воскресенье = если вы хотите установить целевые температуры в выходные дни, например, воскресенье, включите эту опцию. В противном случае настройки выходных дней такие же, как и в обычные дни.
* HeatingPeriod = дата начала и окончания периода нагрева. Используется для установки «HeatingPeriodActive»

### Устройства
* список всех комнат. Вы можете отключить комнату здесь.
* Нажмите кнопку редактирования справа, чтобы открыть окно настроек для термостатов, приводов и датчиков для этой комнаты.

### Редактировать комнату
* здесь вы можете проверить и установить идентификаторы объектов для термостатов, приводов и датчиков
* Вы можете добавить вручную новые термостаты, приводы или датчики. Просто нажмите кнопку +. Тогда вы получите пустую строку, которую нужно заполнить. Кнопка «Правка» открывает список доступных устройств в системе.
* термостаты:

** Должны быть заданы имя, целевой температурный OID и текущий температурный OID.

* приводы

** имя и OID для состояния должны быть установлены

* датчики

** имя и OID для текущего состояния должны быть установлены

## Точки данных
| Название DP | описание |
|---------------------|-----------------------------------------------------------------------------------------------------|
| HeatingPeriodActive | если выключено, профили не будут использоваться |
| CurrentProfile | выбрать текущий профиль (на основе 1, означает, что профиль 1 использует точки данных в Heatingcontrol.0.Profiles.0) |
| LastProgramRun | показывает последний раз, когда работает адаптер |

### Понижение / повышение температуры
| Название DP | описание | целевая температура для относительного снижения | целевая температура для абсолютного снижения |
|-------------------|------------------------------------------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------|
| Гости присутствуют | повысить температуру, потому что гости хотят, чтобы было теплее | увеличить текущую температуру профиля с помощью Profiles.0.room.GuestIncrease | установить цель в Profiles.0.room.absolute.GuestIncrease |
| PartyNow | понизить температуру, потому что становится жарко »| уменьшить текущую температуру профиля с помощью Profiles.0.room.PartyDecrease | установить цель в Profiles.0.room.absolute.PartyDecrease |
| Настоящее | мы присутствуем, если нас нет, понижаем температуру | уменьшить текущую температуру профиля с помощью Profiles.0.room.AbsentDecrease | установить цель в Profiles.0.room.absolute.AbsentDecrease |
| VacationAbsent | мы отсутствуют, поэтому снижаемся и в выходные | уменьшить текущую температуру профиля с помощью Profiles.0.room.VacationAbsentDecrease | установить целевое значение для Profiles.0.room.absolute.VacationAbsentDecrease |

* в обоих сценариях используется только одно понижение (в предыдущей версии адаптера можно было использовать более одного обезжиривания)
* в абсолютном сценарии обезжиривания используются только целевые значения, не равные 0 °C. Если вам не нужно опускаться для определенной комнаты, то сохраняйте значения понижения при 0 ° C.

## Другие
* HolidayPresent

если для HolidayPresent установлено значение true, то в любом случае используется профиль на воскресенье. Мы предполагаем, что вы дома, как в воскресенье.

* PublicHolidyToday

Существует возможность обрабатывать PublicHoliday как воскресенье. Эта опция может быть включена в админке.

### Окно открыто
если «Использовать датчики» активен и датчики настроены для комнаты, то

a) уменьшить текущую температуру профиля, когда окно открыто (true), с помощью Profiles.0.room.WindowOpenDecrease, если настроено относительное уменьшение; b) установить целевое значение на Profiles.0.room.absolute.WindowOpenDecrease, когда окно открыто (true), если абсолютное уменьшение настроен

При желании можно использовать задержку. Если окно открывается только на короткое время, задержка датчика может избежать уменьшения и возврата в нормальное состояние за очень короткое время.

## Реальная поддержка
Вы можете использовать свой календарь, чтобы изменить точки данных в адаптере.
Просто настройте события из ical в админке. Поддерживаются

* HeatingControl.0. Присутствует
* HeatingControl.0. HolidayPresent
* Heatingcontrol.0. VacationAbsent
* heatingcontrol.0. Гость-подарок
* heatingcontrol.0.PartyNow

## Требования
* Требуется версия узла 8 или выше

## Проблемы и запросы функций
* Если вы столкнулись с какими-либо ошибками или у вас есть запросы на функции для этого адаптера, пожалуйста, создайте проблему в разделе проблем GitHub адаптера на [github] (https://github.com/rg-engineering/ioBroker.heatingcontrol/issues ). Любые отзывы приветствуются и помогут улучшить этот адаптер.

## Changelog
### 0.3.17 (2020-02-xx)
* (René) check datapoint configuration: if datapoint points to itself then error messages
+ (René) support of new vis see issue  #76

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