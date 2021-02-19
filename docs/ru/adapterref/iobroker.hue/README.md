---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hue/README.md
title: Адаптер ioBroker Philips Hue Bridge
hash: j1mPVDqpHsySN+sZGj7QwQbOalRdpf1bIWnKI9DgA3Q=
---
![Логотип](../../../en/adapterref/iobroker.hue/admin/hue.jpeg)

![Количество установок](http://iobroker.live/badges/hue-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.hue.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hue.svg)
![НПМ](https://nodei.co/npm/iobroker.hue.png?downloads=true)

# IoBroker Адаптер Philips Hue Bridge
==============

![Статус сборки](https://github.com/iobroker-community-adapters/ioBroker.hue/workflows/Test%20and%20Release/badge.svg)

** Этот адаптер использует службу [Sentry.io](https://sentry.io) для автоматического сообщения мне как разработчику об исключениях, ошибках кода и новых схемах устройств. ** Подробнее см. Ниже!

## Что такое Sentry.io и что передается на серверы этой компании?
Sentry.io - это сервис, позволяющий разработчикам получать обзор ошибок в своих приложениях. Именно это и реализовано в данном адаптере.

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry.
Если вы разрешили ioBroker GmbH собирать диагностические данные, включается также ваш установочный идентификатор (это просто уникальный идентификатор **без** дополнительной информации о вас, электронной почте, имени и т. Д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуты такой ошибкой. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не дают сбоев.

## Английский: gb:
Этот адаптер соединяет мосты Philips Hue Bridges с ioBroker для управления светодиодными лампами Philips Hue, светодиодными лампами Friends of Hue, полосами, вилками, такими как Osram, и другими устройствами с поддержкой SmartLink (такими как LivingWhites и некоторые LivingColors).

### Настраивать
После того, как вы установили этот адаптер в ioBroker, создайте соответствующий экземпляр адаптера. Затем вам нужно подключить мост Hue к ioBroker в настройках адаптера:

1. Если вы используете мост, отличный от v2, настройте порт на 80 (не https), иначе 443 (https) должен быть подходящим вариантом.
2. Нажмите кнопку «Найти мост», чтобы получить IP-адрес вашего моста. Будет произведен поиск всех мостов в вашей среде. Затем выберите мост, к которому вы хотите подключиться. Поле «Адрес моста» будет заполнено IP-адресом выбранного вами моста Hue.
3. Затем нажмите кнопку «Создать пользователя» в настройках, а затем перейдите к устройству моста Hue, чтобы ваше оборудование нажало круглую кнопку. У вас будет 30 секунд, чтобы продолжить. После того, как вы нажали кнопку, поле «Пользователь моста» должно быть заполнено сгенерированной строкой.
4. Измените любые другие параметры в настройках адаптера, а затем выберите «сохранить и закрыть».
5. Наконец, у вас все должно быть готово: адаптер сгенерирует все объекты для управления вашими устройствами Hue соответственно.

Обратите внимание: кнопка «Найти мост» в настройках адаптера будет неактивна, если заполнено поле «Адрес моста», а кнопка «Создать пользователя» будет неактивной, если заполнено поле «Пользователь моста».

### Настройки
| Имя | Описание |
|---|---|
| __Bridge address__ | IP-адрес вашего моста Hue, вы можете попытаться определить его, нажав кнопку `Find Bridge`. |
| __Port__ | Порт вашего моста Hue, обычно 443 (SSL) и 80 (без SSL). |
| __User__ | Имя пользователя вашего моста. Вы можете создать его, нажав кнопку `Create User` и следуя инструкциям на экране. |
| __User__ | Имя пользователя вашего моста. Вы можете создать его, нажав кнопку «Создать пользователя» и следуя инструкциям на экране. |
| __ Игнорировать сцены__ | Если этот флажок установлен, сцены не будут отображаться / управляться адаптером. |
| __Ignore groups__ | Если этот флажок установлен, адаптеры не будут отображать / контролировать группы.
| __ "Устаревшая" структура__ | Для поддержки обратной совместимости в ioBroker можно сохранить старую структуру объекта. Эта старая структура - `hue.<instance_number>.<brdige_name_channel>.<light_or_group_channel>.<state>`. Новая структура удаляет `<brdige_name_channel>` и, таким образом, требует адаптации старых сценариев и т. Д. Если существующая старая строка обнаружена адаптером, структура будет использоваться без установки флажка. Однако, если требуется переход от старой структуры к новой, удалите все пространство имен `hue.<instance_number>` один раз. |
| __Синхронизация программных датчиков__ | Также синхронизируйте программные датчики. Это виртуальные датчики, например Создано сценами Hue Labs. Управляя точкой данных `status` такого датчика, вы можете запускать / останавливать сцены, которые следуют этой логике. В большинстве случаев `0` выключает сцену, а `1` включает ее. |
| __Синхронизация программных датчиков__ | Также синхронизируйте программные датчики. Это виртуальные датчики, например Создано сценами Hue Labs. Управляя точкой данных «status» такого датчика, вы можете запускать / останавливать сцены, которые следуют этой логике. В большинстве случаев `0` выключает сцену, а` 1` включает. |
| __Polling__ | Если этот флажок установлен, адаптер будет опрашивать изменения состояния, в противном случае его можно использовать только для управления лампами, а не для отображения их состояния. |
| __Polling interval__ | Определяет, как часто состояния будут опрашиваться и, таким образом, обновляться в ioBroker. Низкие интервалы опроса могут вызвать проблемы с производительностью в некоторых настройках. Следовательно, минимально допустимый интервал опроса составляет 2 секунды. Если интервал опроса установлен менее 2 секунд, он будет установлен на 2 секунды во время выполнения. |

### Дополнительная информация
В версии 3.3.0 группа заявляет, что `anyOn` и `allOn` стали управляемыми, обратите внимание, что при управлении они будут действовать как состояние `on`. В некоторых случаях может быть желательно иметь управляемое состояние `anyOn` в вашей визуализации.

## Deutsch: de:
Bindet Philips Hue / LivingColors / LivingWhites Lampen ein.
In den Adapter-Settings muss die IP der Hue Bridge sowie ein Username konfiguriert werden. Um einen User zu aktivieren einmal auf create user drücken und dann innerhalb из 30 Sekunden den Button an der Hue bridge drücken. Dann wird automatisch der User übergeben.

## Roadmap / Todo
* Автоматическое обнаружение моста
* Автоматическая настройка пользователя с помощью кнопки связи моста

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### 3.5.0 (2021-02-18)
* (foxriver76) use official js-controller regex for replacing forbidden chars (fixes #165)
* (foxriver76) use release-script
* (foxriver76) sentry added

### 3.4.0 (2021-01-20)
* (foxriver76) we now restart the adapter automatically to add new devices if they have been added to bridge

### 3.3.11 (2021-01-12)
* (foxriver76) fixed updating `anyOn` and `allOn` if legacy structure used

### 3.3.9 (2021-01-11)
* (foxriver76) we do not set states of non-existing states anymore

### 3.3.8 (2020-10-11)
* (foxriver76) marked read-only states accordingly

### 3.3.7 (2020-10-04)
* (Apollon77) do not catch undhandeledRejections anymore, because controller can handle and report now
* (foxriver76) dependencies updated
* (foxriver76) temperature is now correctly read-only
* (foxriver76) fix duplicate filtering on browse

### 3.3.5 (2020-06-03)
* (foxriver76) fixed issue on frontend validation of polling intervals starting with 1

### 3.3.4 (2020-06-02)
* (foxriver76) implemented fix for problems with switches and handling id conflicts 

### 3.3.3 (2020-05-31)
* (foxriver76) we now handle potential id conflicts, when adding devices from different type with same name over time

### 3.3.2 (2020-05-15)
* (foxriver76) internal optimizations - polling after change timeout removed, was 150 ms now instant

### 3.3.0 (2020-05-14)
* (foxriver76) introduce `allOn` state for groups
* (foxriver76) `anyOn` and `allOn` are now controllable and act like the `on` state
* (foxriver76) when native turn on/off behaviour is used, the brightness change of partially turned on groups will not turn
the whole group on, like the hue app does instead it will only change the brightness of the currently turned on lamps

### 3.2.9 (2020-05-12)
* (foxriver76) fixed issues on user creation
* (foxriver76) minor frontend (admin config) optimizations

### 3.2.8 (2020-04-26)
* (foxriver76) replace dots in light/group/sensor/.. names by underscores
* (foxriver76) fix potential state update delay after state change on lights/groups containing blanks

### 3.2.4 (2020-04-08)
* (xXBJXx) changed role of battery to `value.battery` and made unit `%`

### 3.2.3 (2020-02-20)
* (Apollon77) minor fix regarding handleParam called with non-existing id

### 3.2.2 (2020-02-12)
* (foxriver76) fix potential issues when error type is not HueError

### 3.2.1 (2020-01-26)
* (foxriver76) if lights/groups/sensors are deleted during runtime, restart of adapter is no longer necessary
* (foxriver76) if controller supports recursive deletion, device will be deleted automatically

### 3.1.1 (2020-01-15)
* (foxriver76) added additional frontend validation of polling interval
* (foxriver76) if errors are hue errors, log message instead of Error

### 3.1.0 (2020-01-12)
* (foxriver76) added new indicators for entertainment groups (class and activeStream)
* (foxriver76) added possibility to enable/disable streaming of entertainment group

### 3.0.3 (2020-01-11)
* (foxriver76) fixed turning on/off switchs like Osram Plug

### 3.0.1 (2020-01-10)
* (foxriver76) removed queue, because handled by dependency now
* (foxriver76) improved error handling
* __Nodejs >= 10 required__

### 2.5.0 (2019-12-23)
* (foxriver76) implemented a mechanic to prevent regular polling of recently changed state
* (foxriver76) this prevents fluctuating of buttons on low polling intervals + possible strange triggers in scripts

### 2.4.7 (2019-12-14)
* (foxriver76) do not set default values on every adapter start
* (foxriver76) this is now done only on object creation

### 2.4.6 (2019-12-06)
* (foxriver76) log unhandeld promise rejections
* (foxriver76) fix potential issue for negative temperature values

### 2.4.4 (2019-11-27)
* (foxriver76) only stringify huge jsons if necessary
* (foxriver76) prevent possible double polling at adapter start
* (foxriver76) use timeouts instead of interval
* (foxriver76) improved performance

### 2.4.3 (2019-11-19)
* (foxriver76) increased version of node-hue-api to fix authentication for old bridge

### 2.4.2 (2019-11-16)
* (foxriver76) we now use nupnp + upnp to discover bridges (previously only upnp)

### 2.4.1 (2019-11-13)
* (foxriver76) added possibility to control zones and entertainment areas
* (foxriver76) log queue retires on debug instead warn
* (foxriver76) __BETA__: added possibility to control software sensors (Note: this may be handled in a more suitable fashion soon)

### 2.3.1 (2019-11-02)
* (foxriver76) fixed controlling `on` state of sensors

### 2.2.3 (2019-10-21)
* (foxriver76) migrate everything to Hue v3
* (foxriver76) add possibility to turn on/off sensor
* (foxriver76) add anyOn state for all group
* (foxriver76) different kinds of fixes for v3 (Osram Plugs, SSL connection, etc)

### 2.1.0 (2019-10-15)
* (foxriver76) usage and adaptions for node-hue-api v3
* (foxriver76) ability to turn lights on with last settings
* (foxriver76) polling interval minimum is now 2 sec

### 2.0.1 (2019-10-04)
* (foxriver76) fixed bug, that prevented some sensor states getting updated during runtime

### 2.0.0 (2019-09-23)
__ATTENTION: Remove all objects once, ids have changed__
* (foxriver76) internal optimizations
* (foxriver76) usage of iobroker testing
* (foxriver76) add possibility to sync scenes
* (foxriver76) restart adapter when room is deleted in app
* (foxriver76) fix .hue value, user had to set 0-360° but adapter set 0-65535
* (foxriver76) fix .color.temperature
* (foxriver76) remove unnecessary bridge channel, adapter namespace is the bridge
* (foxriver76) add "update available" indicator for light bulbs
* (foxriver76) we now poll the root endpoint instead of (|lights| + |groups| + |sensors|) endpoints every pollingInterval seconds
* (foxriver76) min poll interval now 3 seconds instead of 5 seconds
* (foxriver76) add new indicator state 'anyOn'

### 1.2.4 (2019.09.18)
* (Apollon77) Make compatible with js-controller 2.0

### 1.2.3 (2019.03.11//2019.07.07)
* (jens-maus) Refactored command queue handling to use 'bottleneck' package so that command execution are processed with minimum delay.

### 1.1.2 (2019.01.25)
* (BasGo) Added compact mode

### 1.1.1 (2018.08.17)
* (bluefox) Ignoring of groups was implemented

### 1.1.0 (2018.08.17)
* (bluefox) The command queue was optimized

### 1.0.1 (2018.08.14)
* (bluefox) Roles were adjusted
* (bluefox) temperature changed from 153-cold, 500-warm to 2200-warm, 6500-cold
* (bluefox) hue changed from 0-65535 to 0-360°

### 1.0.0 (2018.04.12)
* (arteck) Enable/Disable OSRAM check from HUE Bridge
* (arteck) polling ZLLSwitch and ZGPSwitch     
* (bluefox) admin3
* (bluefox) do not send commands ofter than 10 in 10 seconds

### 0.6.9 (2017.05.18)
* (bluefox) Enable adapter by default

### 0.6.8 (2017.04.22)
* (bluefox) Poll groups

### 0.6.7 (2017.04.21)
* (bluefox) Fix error with turn on the lamp on start
* (bluefox) configurable port

### 0.6.6 (2017.04.20)
* (bluefox) Use new version of npm library

### 0.6.0 (2016.11.30)
* (pmant) support new lamps
* (pmant) add light name to log

### 0.5.9 (2016.10.11)
* (pmant) fix error with null values

### 0.5.8 (2016.06.05)
* (bluefox) fix typo

### 0.5.7 (2016.06.05)
* (soef) write back known states for group/room
* (soef) Integer conversion for bri_inc command

### 0.5.6
* (Pmant) (experimental) support for power switches

### 0.5.5
* (Pmant) fix error with xy state
* (Pmant) support level in command state

### 0.5.4
* (Pman) Lightset 0 fixed
* (Pman) support for diffent gamuts
* (Pman) support Rooms (new HUE App)

### 0.5.3
* (soef) Default Lightset 0 added

### 0.5.2
* (Pman) fix jscs warnings
* (Pman) improve RGB conversion
* (Pman) add update rgb color

### 0.5.1
* (Pman) fix find bridge popup

### 0.5.0
* (Pman) update to node-hue-api 1.2.x
* (Pman) add level state (bri percentage)

### 0.4.4
* (bluefox) fix config edit

### 0.4.3
* (Pmant) fix adapter crash

### 0.4.2
* (Pmant) add find bridge (experimental)
* (Pmant) add create user (experimental)
* (Pmant) fix enable polling

### 0.4.1
* (Pmant) calculate and write back inc values

### 0.4.0
* (Pmant) add command state

### 0.3.2
* (Pmant) add groups as channels (write only)
* (Pmant) fix prevent duplicate channel names

### 0.3.1
* (Pmant) fix another bug with spaces
* (Pmant) fix hue/sat bug
* (Pmant) fix effect bug
* (Pmant) fix xy colormode

### 0.3.0
* (Pmant) fix rgb states only for color lights
* (Pmant) change set known state changes immediately
* (Pmant) change on/off sets brightness to 254/0
* (Pmant) change changing any color (hs,ct,xy) while light is off sets brightness to max
* (Pmant) fix set brightness to zero if light is off
* (Pmant) change set bri to zero if lamp is not reachable
* (Pmant) fix bridges and lamps with spaces in name

### 0.2.1
* (Pmant) add rgb states (write only)
* (Pmant) fix parent/children warnings
* (Pmant) add switch light off if brightness is zero

### 0.1.4
* (bluefox) fix some null objects

### 0.1.3
* (hobbyquaker) config UI
* (hobbyquaker) added children

### 0.1.2
* (hobbyquaker) fixes

### 0.1.1

* (hobbyquaker) fixed min/max attributes
* (hobbyquaker) added common.oper.read/write attributes

### 0.1.0

* (hobbyquaker) first release

## License

Apache 2.0

Copyright (c) 2017-2020 Bluefox <dogafox@gmail.com>
Copyright (c) 2014-2016 hobbyquaker