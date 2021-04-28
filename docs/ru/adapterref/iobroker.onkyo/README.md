---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.onkyo/README.md
title: ioBroker.onkyo
hash: 0UrlqHs+CqpyKdo8oX1S7jFJE940wg34/Nco0GC6/nE=
---
![Логотип](../../../en/adapterref/iobroker.onkyo/admin/onkyo.png)

![Количество установок](http://iobroker.live/badges/onkyo-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.onkyo.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.onkyo.svg)
![Трэвис-Си](https://travis-ci.org/ioBroker/ioBroker.onkyo.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.onkyo.png?downloads=true)

# IoBroker.onkyo
### Крупное обновление!
Позаботьтесь об этом крупном обновлении. Начиная с версии 2.0 есть структурные изменения! Если вы обновитесь до этой версии, вам придется изменить переменные в любом другом адаптере, таком как VIS или javascript! В новой версии поддерживаются материалы и обложки. Медиа-объекты поддерживают виджеты проигрывателя, такие как sonso или winamp.
![ВИС](../../../en/adapterref/iobroker.onkyo/admin/player.png)

Этот адаптер позволяет управлять AVR Onkyo и Pioneer по протоколу EISCP.

Он использует node-eiscp: https://github.com/tillbaks/node-eiscp

Для отправки команд есть особое состояние «RAW». Записывает в это состояние триггера только команды RAW, такие как известные файлы EISCP Excel. В качестве примера команды EISCP RAW в форме «PWR01».

Еще одно особое состояние адаптера - «подключен». Это логическое значение, показывающее, подключен ли в данный момент node-eiscp к получателю.

Пример просмотра VIS ![ВИС](../../../en/adapterref/iobroker.onkyo/admin/onkyo-vis.png)

## Протестированные приемники
### Onkyo
* TX-NR 525
* TX-NR 626
* TX-NR 727

### Пионер
* VXS-S520D
* VSX-1131

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

## Changelog
### 2.0.5 (2021-04-27)
* (Diginix) fixed some object properties
* (bluefox) Added the support of compact mode

### 2.0.3   
* (Eisbaeeer) now support zone3   

### 2.0.2
* (Eisbaeeer) fix double .js 

### 2.0.0
* (Eisbaeeer) Major update iobroker.onkyo

### 1.1.5
* (Eisbaeeer) Zones will be powered if tune preset selected   

### 1.1.4  
* (Eisbaeeer) Added direct tuning in zones (issue #2)

### 1.1.3
* (Eisbaeeer) Adding Navigation Items   

### 1.1.2
* (Eisbaeeer) Adding CoverArt

### 1.1.1
* (Eisbaeeer) Update zone 2 volume after power on. Adding Pioneer Receivers with eiscp support.

### 1.1.0
* (Eisbaeeer) Completely new structure (Zone1, Zone2, Device)

### 1.0.5
* (Eisbaeeer) Changed structure
* (Eisbaeeer) Added Object RAW to send own commands

### 1.0.4 (2018.07.24)
* (Eisbaeeer) Cleaned program
* (Eisbaeeer) Fix logging

### 1.0.2 (2018.02.28)
* (Eisbaeeer) Changed name of adapter
* (Eisbaeeer) Added testing of adapter in travis

### 1.0.0 (2017.11.28)
* (Eisbaeeer) Add max volume settings to zone1 and zone2.   
* (Eisbaeeer) changed objects to switch
* (Eisbaeeer) moved adapter to "multimedia"
* (Eisbaeeer) cleaned log outputs

### 0.1.20 (2016.03.29)
* (Eisbaeeer) Add checkbox in settings for VIS objects. Volumes can be set in
  decimal. Power states, mute states, etc. are now usable with VIS buttons.

### 0.1.12 (2016.02.25)
* (installator) Fix power state

### 0.1.11 (2016.01.13)
* (installator) Fix regexp error

### 0.1.10
* (installator) For command CTL sets Center Level -12 - 0 - +12

### 0.1.9
* (installator) change power to system-power

### 0.1.8
* (installator) fix values to control power and enable using of 1 and 0

### 0.1.7
* (bluefox) fix creation of specific states (twice)

### 0.1.6
* (bluefox) fix creation of specific states

### 0.1.5
* (bluefox) fix node-eiscp package

### 0.1.4
* (bluefox) add debug outputs

### 0.1.1
* (bluefox) replace git with tarball

### 0.1.0
* (bluefox) update adapter for new concept

### 0.0.4
* (owagner) use verify_commands=false, to be able to send high-level commands to unknown AVR models

### 0.0.3
* (owagner) allow setting of states other than "command". This will trigger a high level
  command with the state name being set to the new value. Note that this will fail for
  many newer models, as they are not yet properly represented in node-eiscp's
  command table. Use the raw command in that case
* send some initial queries upon connect to get basic state information from the AVR

### 0.0.2
* (owagner) support node-eiscp's Autodiscovery mechanism
* (owagner) updated README, notably removing bogus reference to single instancing

### 0.0.1
* (owagner) initial version

## License
The MIT License (MIT)
Copyright (c) 2019 Eisbaeeer <eisbaeeer@gmail.com>, owagner