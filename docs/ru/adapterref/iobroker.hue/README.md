---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hue/README.md
title: Перемещено на https://github.com/iobroker-community-adapters/ioBroker.hue
hash: jaPO4HOvxaUmQXvTTjTM136xdGeXdThA0GX71m9v4Uk=
---
# Перемещено на https://github.com/iobroker-community-adapters/ioBroker.hue
![логотип](../../../en/adapterref/iobroker.hue/admin/hue.jpeg)

![Количество установок](http://iobroker.live/badges/hue-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.hue.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hue.svg)
![NPM](https://nodei.co/npm/iobroker.hue.png?downloads=true)

# IoBroker Адаптер Philips Hue Bridge
==============

## Английский: gb:
Этот адаптер соединяет ваши мосты Philips Hue с ioBroker для управления светодиодными лампами Philips Hue, светодиодными лампами Friends of Hue, полосками, штекерами, такими как Osram, и другими устройствами с поддержкой SmartLink (такими как LivingWhites и некоторые LivingColors).

### Настроить
После того, как вы установили этот адаптер в ioBroker, создайте соответствующий экземпляр адаптера. Далее вам необходимо подключить ваш мост Hue к ioBroker в настройках адаптера:

1. Если вы используете другой мост, кроме v2, настройте порт на 80 (не-https), иначе 443 (https) должно быть способом.
2. Нажмите кнопку «Найти мост», чтобы получить IP-адрес вашего моста. Это будет искать все мосты в вашей среде. Затем выберите мост, к которому вы хотите подключиться. Поле «Адрес моста» будет заполнено IP-адресом выбранного вами моста Хюэ.
3. Затем нажмите кнопку «Создать пользователя» в настройках, а затем перейдите к устройству моста Hue, а затем к своему оборудованию, чтобы нажать его круглую кнопку. У тебя будет 30 секунд, чтобы продолжить. После того, как вы нажали кнопку, поле «Пользователь моста» должно быть заполнено сгенерированной строкой.
4. Измените любые другие параметры в настройках адаптера и затем выберите «сохранить и закрыть».
5. Наконец, у вас все должно быть готово: адаптер сгенерирует все объекты для управления устройствами Hue соответственно

Обратите внимание: кнопка настроек адаптера «Найти мост» будет неактивна, если заполнено поле «Адрес моста», а кнопка «Создать пользователя» будет неактивной, если заполнено поле «Пользователь моста».

## Deutsch: de:
Bindet Philips Hue / LivingColors / LivingWhites Lampen ein.
В настройках адаптера необходимо указать IP-адрес Hue Bridge sowie ein Имя пользователя konfiguriert werden. Um einen User zu aktivieren einmal auf создать пользователя drücken und dann innerhalb von 30 Sekunden den Button an der Hue bridge drücken. Dann wird automatisch der User übergeben.

## Дорожная карта / Todo
* Автоматическое обнаружение моста
* Автоматическая настройка пользователя с помощью кнопки моста

## Changelog
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

Copyright (c) 2017-2019 Bluefox <dogafox@gmail.com>
Copyright (c) 2014-2016 hobbyquaker