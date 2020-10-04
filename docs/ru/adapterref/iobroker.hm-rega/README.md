---
local: true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hm-rega/README.md
title: HomeMatic ReGaHSS
hash: 5nzOtddjd6p/3BVJJkfR7yHWPQUqVm2mcbdsP7tvrkM=
---
![логотип](../../../de/adapterref/iobroker.hm-rega/media/homematic.png)

# HomeMatic ReGaHSS
## Homematic
> Homematic - это система умного дома от eQ-3, которая позволяет всесторонне контролировать широкий спектр функций с использованием сценариев (от простых до сложных) в доме или квартире.

> Устройства включают продукты для управления освещением, рольставнями и отоплением, детекторы опасности, датчики безопасности и продукты для измерения погодных данных. Радиосвязь упрощает дооснащение. Компоненты проводной шины можно использовать в новостройках.

[источник](https://www.eq-3.de/produkte/homematic.html)

## Адаптер Homematic ReGaHss
Этот адаптер устанавливает соединение с логическим уровнем Homematic «ReGaHSS» (** Re ** sidential ** Ga ** teway).
Он синхронизирует настоящие имена, системные переменные, комнаты, сделки и программы между Homematic и ioBroker.

Если в ioBroker необходимо интегрировать несколько центральных блоков, необходимо установить и настроить отдельный экземпляр для каждого центрального блока.

При установке ReGaHSS устанавливается экземпляр адаптера «hm-rpc», который необходимо предварительно настроить и активировать.

Один экземпляр этого адаптера может управлять до 5 различными экземплярами адаптера RPC Homematic, которые предоставляют разные службы (для каждой службы требуется свой собственный экземпляр RPC):

- rfd (радиослужба CCU для стандартных компонентов)
- hs485d (Wired) (для компонентов проводной шины)
- CuxD (дополнительное программное обеспечение для обеспечения универсального интерфейса)
- Homematic IP (компоненты с поддержкой IP)
- Виртуальные устройства

### Требования перед установкой
- Домашний шлюз (CCU / CCU2 / CCU3…) *или*
- Радиомодуль с подходящим ПО (piVCCU (* x) *, RaspberryMatic или подобное)

## Установка
Экземпляр адаптера устанавливается через интерфейс администратора ioBroker.

Когда установка будет завершена, автоматически откроется окно конфигурации.

Перед фактической настройкой следует создать и настроить экземпляр адаптера HM-RPC (созданный вместе с этим адаптером) или, при необходимости, дополнительные экземпляры HM-RPC.

## Конфигурация
![](../../../de/adapterref/iobroker.hm-rega/media/01c7dbc4da0240421b0711b331971d2d.png) **Меню выбора выше**

В верхнем меню выбора можно выбрать три различных области:

### Область основных настроек
![](../../../de/adapterref/iobroker.hm-rega/media/3e0325b2bf61e508e131f8792e2c004d.png) **Основные настройки**

В этой области производятся основные настройки.

IP-адрес CCU можно выбрать в раскрывающемся меню; интервал повторного подключения (стандартный 30 сек) также может быть изменен пользователем.

![](../../../de/adapterref/iobroker.hm-rega/media/ce181cdbb3b8979e1233b57a4588cf1d.png) **Назначение экземпляров RPC**

Затем необходимые службы активируются и связываются с соответствующим экземпляром HM-RPC.

Опрос

Если эта функция активирована, CCU регулярно запрашивает данные RegaHSS на основе секунд, установленных в поле «Интервалы». Интервал не следует устанавливать слишком низким, поскольку слишком частый опрос может привести к сбою CCU.

Вызывать

Чтобы свести к минимуму количество активных запросов от ioBroker к RegaHSS, триггер также может передавать данные в CCU внутри программы при внесении изменений.
Для этого можно использовать виртуальную кнопку на CCU, которая запускается в программе CCU. По умолчанию это ключ BidCosRF.50.PRESS_SHORT (см. Образец программы).

### Синхронизировать область
Здесь пользователь может указать, какая информация должна быть передана из CCU в ioBroker. Затем в ioBroker создаются соответствующие объекты и точки данных.

- DutyCycle: активирует индикацию рабочего цикла (в%)
- Переменные: активирует передачу системных переменных из CCU.
- Программы: активирует передачу названий программ из CCU.
- Имена: активирует передачу текстовых имен точек данных из CCU.
- Избранное: активирует передачу и список избранного
- Комнаты: активирует захват комнат и их список
- Сделки: активирует передачу сделок и их список

### Область дополнительных настроек
Здесь пользователь может решить, следует ли использовать https (зашифрованное и защищенное от прикосновения соединение). Если активирован, требуется имя пользователя и связанный пароль.

После выполнения всех настроек страница конфигурации закрывается командой «сохранить и закрыть» (кнопка под областью настроек). Адаптер закрывается, и экземпляр запускается с новыми значениями.

### Пример
![](../../../de/adapterref/iobroker.hm-rega/media/44785b82964bcdc198565b1681787dc0.png) **Экземпляр и сигнал**

Созданные экземпляры теперь можно найти в области *Instances* ioBroker. Слева система светофора показывает, активирован ли адаптер или подключен к CCU.

Если вы поместите указатель мыши на символ, вы получите подробную информацию.

### Объекты адаптера
В области «Объекты» все значения и информация, передаваемая адаптером из CCU, отображаются в виде древовидной структуры.

Поскольку объекты зависят от пользователя, здесь отображаются только общие объекты, одинаковые для всех пользователей.

![](../../../de/adapterref/iobroker.hm-rega/media/c24d8382beda4c970093097959080524.png) **структура папок**

Первые папки (обычно номер ID) - это программы, содержащиеся в CCU.

Папки CCU и info содержат основную информацию о шлюзе, включая
процентное значение рабочего цикла (если активировано).

Наконец, перечислены переменные, созданные в CCU.

### ВОПРОСЫ-ОТВЕТЫ

## Changelog
### 2.6.22 (2020-09-29)
* (foxriver76) fixed error where alarm states of hm-rpc instances with instance number >= 10 are created for the wrong instance (issue #111)

### 2.6.20 (2020-09-15)
* (foxriver76) set explicit object type on extending object (issue #109)

### 2.6.19 (2020-08-23)
* (foxriver76) fixed issue on syncing service message counter when invisible variables are synchronized
* (foxriver76) fixed issue where value list variables are a string instead of an integer

### 2.6.17 (2020-08-17)
* (foxriver76) fix for % scaling of float numbers

### 2.6.15 (2020-08-08)
* (foxriver76) fix potential issues with scaling of % values as in https://github.com/ioBroker/ioBroker.hm-rpc/issues/263

### 2.6.14 (2020-06-11)
* (foxriver76) fix potential problem on enum sync, where to many channels could be deleted

### 2.6.11 (2020-06-11)
* (foxriver76) timeout of requests increased to 90 seconds (its only important to have a timeout to prevent infinite stucking)

### 2.6.10 (2020-06-10)
* (foxriver76) fix crash when a user on CCU is a empty string on synchronizing favorites

### 2.6.9 (2020-05-29)
* (foxriver76) fixed crash when we cannot determine CCU version

### 2.6.8 (2020-05-26)
* (foxriver76) Script post requests will time out after 15 seconds to prevent 
stucking in queue if no answer from ccu received

### 2.6.7 (2020-05-11)
* (foxriver76) fixed some edge cases, reported by Sentry

### 2.6.6 (2020-05-06)
* (foxriver76) use current time as timestamp if non-existent on initial variables poll

### 2.6.5 (2020-04-22)
* (foxriver76) improved error handling, no longer use legacy log file

### 2.6.4 (2020-04-13)
* (foxriver76) now storing scripts in iob file storage

### 2.6.2 (2020-04-11)
* (foxriver76) minor fix on ccu object

### 2.6.1 (2020-04-04)
* (foxriver76) fix synchronization

### 2.6.0 (2020-04-02)
* (foxriver76) sentry plugin support added

### 2.5.5 (2020-02-17)
* (foxriver76) we are logging the script name in still pending warning from now on

### 2.5.4 (2020-02-05)
* (foxriver76) made port fully configurable, also with https enabled

### 2.5.3 (2020-01-15)
* (foxriver76) improved error handling in edge cases and more verbose logging on errors

### 2.5.2 (2019-12-29)
* (foxriver76) fixed issue which originated by undefined tclsh alias on CCU for dutycycle.fn script

### 2.5.1 (2019-12-14)
* (foxriver76) no longer use adapter.objects
* (foxriver76) js-controller v > 2 required

### 2.4.12 (2019-09-26)
* (foxriver76) fixed bug which lead to alarm counter showing number of service messages

### 2.4.10 (2019-09-17)
* (foxriver76) we set enum name as translation object again

### 2.4.9 (2019-09-04)
* (foxriver76) fix minor bug which prevented correct room sync
* (foxriver76) in 2.4.6 we implemented the mechanism for hm-rega and rpc, in fact we should only delete hm-rpc devices, 
because rega will be added on ioB side (can't be done in CCU)

### 2.4.7 (2019-08-28)
* (foxriver76) fixed another legacy bug, which prevented some enums from getting correct name

### 2.4.6 (2019-08-11)
* (foxriver76) only deleting hm adapter objects from enums

### 2.4.4 (2019-08-02)
* (foxriver76) fixed enum sync and improved logging

### 2.4.2 (2019-07-23)
* (foxriver76) lc and ts for alarm states are now valid formatted for js-controller

### 2.4.1 (2019-07-13)
* (foxriver76) also poll invisible vars if configured

### 2.4.0 (2019-07-03)
* (foxriver76) added possibility to synchronize hidden variables

### 2.3.3 (2019-04-05)
* (foxriver76) added more systeminfo states when syncing duty cycle
* (foxriver76) when setting ts, do it in ms

### 2.3.2 (2019-03-10)
* (foxriver76) when ccu sysvar is nan, replace it by null

### 2.3.1 (2019-03-07)
* (foxriver76) also unescape %0A (\n)
* (foxriver76) remove line break in firmware version

### 2.3.0 (2019-02-07)
* (foxriver76) implemented messagebox

### 2.2.2 (2019-02-04)
* (foxriver76) show correct number of service messages even if automatic checking is enabled

### 2.2.1 (2019-01-29)
* (foxriver76) create alarm states with correct name instead of renaming on restart
* (foxriver76) fix to enable acknowledging servicemessages for all instance types

### 2.2.0 (2019-01-26)
* (foxriver76) reworked alarm states, see FAQ
* (foxriver76) fix where virtual devices were not named

### 2.1.8 (2019-01-24)
* (foxriver76) from now on we are displaying the firmware version instead of coprocessor fw version
* (foxriver76) we are making sure to prevent a CCU3 being exposed as a CCU2
* (foxriver76) fixed renaming of alarms on start

### 2.1.7 (2019-01-21)
* (foxriver76) fixed the bug that all alarms of devices are in hm-rpc rfd instance 
or non existent if no rpc instance existed
* (foxriver76) fix bug where datapoints were not named

### 2.1.6 (2019-01-20)
* (foxriver76) update state when same value is set with another timestamp
* (foxriver76) revert duty cycle script
* (foxriver76) fix for parse errors on -inf values

### 2.1.3 (2019-01-14)
* (foxriver76) also decode string values when setting foreign states
* (foxriver76) add more translations

### 2.1.2 (2019-01-10)
* (foxriver76) fix duty cycle script
* (foxriver76) fix bug where state units were ignored for all except rfd

### 2.1.0 (2019-01-07)
* (foxriver76) usage of adapter-core
* (bluefox) compact mode compatibility

### 2.0.1 (2019-01-01)
* (foxriver76) fix error that prevented setting umlauts to system variables in ioBroker
* (foxriver76) usage and application of eslint 

### 2.0.0 (2018-11-28)
* (foxriver76) Https checkbox added
* (foxriver76) Https can be used instead of http
* (foxriver76) Added possibility to authenticate on API
* (foxriver76) de- and encryption added

### 1.7.2 (2018-07-29)
* (bluefox) Configuration dialog was corrected

### 1.7.1 (2018-06-25)
* (bluefox) Forbidden characters were replaced

### 1.7.0 (2018-01-26)
* (bluefox) Ready for Admin3

### 1.6.6 (2017-09-23)
* (AlGu1) Fix error if Lan Interfaces exits

### 1.6.5 (2017-09-10)
* (AlGu1) Change adapter logging of new values to debug

### 1.6.4 (2017-09-10)
* (AlGu1) Config Settings changed to set defaults after update adapter

### 1.6.3 (2017-09-06)
* (AlGu1) Read values from CCU in raw format and create JSON string and object in adapter

### 1.6.2 (2017-09-05)
* (AlGu1) dutycycle.fn script changed for better compatiblity without ReGaHss Beta version

### 1.6.1 (2017-09-05)
* (AlGu1) Error in script file fixed

### 1.6.0 (2017-09-05)
* (AlGu1) Read DutyCycle and other params from listBidcosInterfaces

### 1.5.0 (2017-06-29)
* (Apollon77) Also update names of states when syncing with CCU

### 1.4.8 (2017-05-24)
* (bluefox) Fix values conversion for CUxD

### 1.4.4 (2017-02-28)
* (Apollon77) small fix (issue #23)

### 1.4.3 (2017-02-01)
* (Apollon77) respect settings and only sync variables and programs if selected in settings (issue #22)

### 1.4.2 (2017-01-30)
* (bluefox) remove error log in CCU by start

### 1.4.1 (2017-01-16)
* (bluefox) merge rooms, functions and favorites with existing one

### 1.4.0 (2017-01-15)
* (jens-maus) Add HMIP support

### 1.3.0 (2016-08-23)
* (bluefox) update states only if changed

### 1.2.1 (2016-07-15)
* (nobody) fix initial read of states

### 1.2.0 (2016-05-27)
* (bluefox) read variables anew if connection of rfd detected
* (bluefox) read alarms
* (bluefox) support of acknowledgment of alarms

### 1.1.1 (2016-05-27)
* (bluefox) fix min/max for variables

### 1.1.0 (2016-04-19)
* (bluefox) change timestamp and last change of states

### 1.0.0 (2016-04-19)
* (bluefox) detect disconnection and handle it

### 0.3.7 (2016-04-18)
* (bluefox) fix error with polling trigger

### 0.3.6 (2016-03-12)
* (bluefox) fix read datapoints

### 0.3.5 (2016-03-12)
* (bluefox) remove deprecated unescape

### 0.3.4 (2016-03-09)
* (bluefox) remove deprecated unescape

### 0.3.3 (2016-03-01)
* (bluefox) remove deprecated unescape
* (bluefox) add connection state

### 0.3.2 (2016-03-01)
* (bluefox) remove deprecated unescape

### 0.3.1 (2016-02-29)
* (bluefox) fix dimmer and blinds values at start

### 0.3.0 (2016-02-28)
* (bluefox) remove deprecated unescape

### 0.2.1 (2015-03-25)
* (bluefox) fix "\n" in values

### 0.2.0 (2015-03-24)
* (bluefox) implement check init function

### 0.1.16 (2015-01-04)
* (bluefox) catch errors if states deleted

### 0.1.15 (2015-01-03)
* (bluefox) add hm-rpc as dependency

### 0.1.14 (2015-01-03)
* (bluefox) enable npm install

### 0.1.13 (2014-12-11)
* (bluefox) process errors

### 0.1.12 (2014-12-10)
* (bluefox) update devices if hm-rpc updates the device list

### 0.1.11 (2014-12-06)
* (bluefox) update devices if hm-rpc updates the device list

### 0.1.10 (2014-11-21)
* (bluefox) support of new naming concept with no parents and children

### 0.1.9 (2014-11-11)
* (bluefox) fix error with stopping adapter

### 0.1.8 (2014-10-22)
* (bluefox) fix error with scripts
* (bluefox) add gruntfile.js and remove jscs warnings

### 0.1.7
* (Bluefox, Hobbyquaker) fix bug if no programs or variables exist

### 0.1.6
* (hobbyquaker) added common.role for variables
* (hobbyquaker) get state values
* (hobbyquaker) queue device/channel renaming

### 0.1.5
* (hobbyquaker) enum fixes

### 0.1.4
* (hobbyquaker) fixes
* (hobbyquaker) add settings ui

### 0.1.3
* (hobbyquaker) common.children vs children

### 0.1.2
* (hobbyquaker) Fix common.children in getPrograms

### 0.1.1
* (hobbyquaker) Fix common.name attribute

## License

The MIT License (MIT)

Copyright (c) 2014-2020 bluefox <dogafox@gmail.com>

Copyright (c) 2014 hobbyquaker

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