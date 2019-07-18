---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.deconz/README.md
title: без названия
hash: N15QZOc4l5K5BdfrXWRZL5GsCH/pU5R7eSedWtnZTyU=
---
![логотип](../../../en/adapterref/iobroker.deconz/admin/deconz.png)

![Количество установок](http://iobroker.live/badges/deconz-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.deconz.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.deconz.svg)
![Значок Greenkeeper](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.deconz.svg)
![NPM](https://nodei.co/npm/iobroker.deconz.png?downloads=true)

ioBroker deConz Дрезден-Электроник Адаптер

==============

Английский -------------------- Подключается к программному обеспечению deConz, разработанному dresden-elektronik. Это программное обеспечение призвано стать универсальным решением ZigBee Gateway с использованием аппаратного обеспечения от dresden-elektronik, USB-накопителя ConBee и RaspBee, модуля для Raspberry Pi.

Вы должны сначала связаться с deConz.

1. а) Введите IP-адрес для deConz

    б) Введите порт, если вы его изменили, иначе оставьте его пустым.

2. После ввода и сохранения IP-адреса и порта нажмите кнопку «Создать ключ API». Теперь вы можете ввести учетные данные для deConz или перейти к приложению Phoscon и зарегистрировать ioBroker в качестве стороннего приложения.

## Ссылки
[deConz](https://www.dresden-elektronik.de/funktechnik/products/software/pc/deconz/) [REST плагин](https://github.com/dresden-elektronik/deconz-rest-plugin) [Шлюзы (Оборудование)](https://www.dresden-elektronik.de/funktechnik/solutions/wireless-light-control/gateways/)

## Уведомление
### Нет поддержки бета-версий deConz
Обязательный node.js> = 0.12.

## Changelog

### 1.1.2
* fix button objects
*  changed buttonpressed from boolean to number

### 1.1.0
*  added objects for "tiltangle", "vibration", "vibrationstrength" and "orientation"
*  (asgothian) added object "buttonpressd"
*  some fixes


### 1.0.2
* fix set bri for groups


### 1.0.1
* small fixes


### 1.0.0
*  (thewhobox) skip helper groups
*  (thewhobox) added channels for lights, groups and sensors
*  (thewhobox) skip unusable sensors
*  (thewhobox/KristianHeider) turn light/groups on when changing brightness
*  (jey-cee) added object group for remotes
*  (jey-cee) stop overwrite objects on adapter start
*  (jey-cee) prepared for compact mode
*  (jey-cee) new possible to change offset (if the device accept it)
*  (jey-cee) new possible to change duration (if the device accept it)
*  (jey-cee) get API key with credentials


### 0.4.0
* (asgothian) Fix for hue change
* (halloamt)  Added support for dimming lights and groups
* (halloamt)  Added support for custom actions

### 0.3.1
* Fixing hue from range 0-65535 to 0-360


### 0.3.0
* Added scene support
*  Drop nodejs 4 support


### 0.2.5
* Fix/Change handling create objects during running Adapter

### 0.2.4
* Fix create objects during running adapter

### 0.2.3
* Create objects during runing adapter

### 0.2.2
*  Changed id naming
*  Use websocket messages instead polling afterwards

### 0.2.1
* (Jey-Cee) Added new elements to config
* (Jey-Cee) Changed som small things

### 0.2.0
* (Jey-Cee) next Try with Xiaomi Sensors
* (Jey-Cee) Added "pressure" sensor
* (Jey-Cee) Added create group to adapter config

### 0.1.7

* (Jey-Cee) add possibility to delete devices from deConz
* (Jey-Cee) fix issue on getAll... functions when there are is nothing

### 0.1.6

* (Jey-Cee) fix Xiaomi Sensors recognition

### 0.1.5

* (Jey-Cee) Try to fix Sensors

### 0.1.4

* (Jey-Cee) Added support for Admin v3
* (Jey-Cee) Create API Key without use of WebApp/Phoscon (only with deConz standard password)

### 0.1.3

* (Jey-Cee) Stop Spam in log
* (Jey-Cee) Added filter for name to id conversation

### 0.1.2

* (Jey-Cee) Added new datapoints for sensors (experimental)

### 0.1.1

* (Jey-Cee) Adapter complete rewritten

### 0.1.0

* (Jey-Cee) first release

## License
Apache-2.0

Copyright (c) 2017-2019 Jey Cee jey-cee@live.com