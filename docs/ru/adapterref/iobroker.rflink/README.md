---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rflink/README.md
title: ioBroker.rflink
hash: DJ9qlecqsdcEAcK9qiln1yd3axtyxD/PSo0UE8mUJbY=
---
![логотип](../../../en/adapterref/iobroker.rflink/admin/rflink.png)

![Количество установок](http://iobroker.live/badges/rflink-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.rflink.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rflink.svg)
![тесты](https://travis-ci.org/ioBroker/ioBroker.rflink.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.rflink.png?downloads=true)

# IoBroker.rflink
=================

Этот адаптер взаимодействует с [rflink](http://www.nemcon.nl/blog2/) на базе Arduino Mega и RFC 433MHz / 866MHz / 2.6Gz.
Используется для получения данных от датчиков погоды и беспроводных выключателей питания.

## Предварительные требования
Для использования последовательного порта в Windows требуется сборка двоичного кода.
Чтобы использовать последовательный порт в Linux, требуется сборка. Чтобы установить его просто напишите:

```
sudo apt-get update
sudo apt-get install build-essential -y
```

## Использование
Для включения обучения датчиков необходимо активировать «Режим включения». Режим включения по умолчанию будет включен на 5 минут (300000 мс), а через 5 минут будет отключен автоматически.

Чтобы включить режим включения навсегда, просто установите «Таймаут включения» на 0.

## Pair
Устройства получают новый адрес каждый раз при замене батареи.

Так что после замены батареи ее нужно заново изучать.

Для этого нажмите кнопку сопряжения непосредственно перед установкой аккумулятора, и устройство будет изучено с новым адресом.

## Автоматическое сопряжение
Если у вас не так много датчиков, вы можете активировать автоматическое повторное сопряжение.

Это возможно только в том случае, если устройство может быть однозначно идентифицировано.

Это означает, что присутствует только одно устройство этой марки и типа. (Например, только один датчик температуры от одной марки)

Если система обнаружит более одного устройства с таким параметром, она автоматически деактивирует режим автоматического повторного сопряжения и укажет на неисправность датчиков со вспышкой.

## Отправить необработанные команды
Пользователь имеет возможность отправлять необработанные команды на устройство. Просто напишите свою команду в форме, описанной [Вот](http://www.nemcon.nl/blog2/protref).

Например: ```10;AB400D;00004d;1;OFF;```. Пожалуйста, прочитайте документацию, чтобы понять команды.

## Changelog

### 2.0.0 (2019-05-15)
* (Apollon77) Support for nodejs 12 added, nodejs 4 is no longer supported!

### 1.2.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library

### 1.1.6 (2017-10-08)
* (Apollon77) Fix parsing for Wind-Direction

### 1.1.5 (2017-05-23)
* (Apollon77) Upgrade Serialport Library for compatibility to node 6.x

### 1.1.4 (2017-04-15)
* (bluefox) Fix the rain calculation

### 1.1.3 (2017-04-11)
* (bluefox) Allow flash on node.js < 5

### 1.1.2 (2017-04-10)
* (bluefox) Fix the wind gist calculation

### 1.1.0 (2017-02-03)
* (bluefox) Add stop for blinds

### 1.0.8 (2017-01-20)
* (bluefox) fix KWATT calculation for Oregon CM180

### 1.0.6 (2016-12-15)
* (bluefox) Support of raw commands
* (bluefox) Support MiLightv1 commands
* (Apollon77) update serialport library for node 6.x compatibility

### 1.0.5 (2016-11-11)
* (bluefox) Read newest sketch from web

### 1.0.2 (2016-10-23)
* (bluefox) Flashing of sketch into arduino
* (bluefox) Set_level from 1 to 15
* (bluefox) show version of sketch

### 0.2.1 (2016-10-19)
* (bluefox) Fix for SET_LEVEL

### 0.2.0 (2016-10-18)
* (bluefox) Fix write of commands

### 0.1.4 (2016-10-18)
* (bluefox) Fix the last changed time indication

### 0.1.3 (2016-10-17)
* (bluefox) initial commit