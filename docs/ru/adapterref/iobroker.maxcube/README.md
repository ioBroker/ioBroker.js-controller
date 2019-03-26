---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.maxcube/README.md
title: ioBroker.maxcube
hash: QHOIZ10wpa1+8vkJ/NuVAfODNeN1o6wQrzoHrHMwPkE=
---
![логотип](../../../en/adapterref/iobroker.maxcube/admin/maxcube.png)

![Количество установок](http://iobroker.live/badges/maxcube-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.maxcube.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.maxcube.svg)
![тесты](https://travis-ci.org/ioBroker/ioBroker.maxcube.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.maxcube.png?downloads=true)

# IoBroker.maxcube =======================================
ioBroker адаптер для управления Максом! через куб

## Поддерживаемые устройства
- термостат
- Датчик двери / окна
- кнопка (только состояние батареи)

## Использование
Перед использованием необходимо сначала подключить все устройства к MAX! Куб через MAX! Прошивка.

## Changelog
### 1.0.1 (2018-07-06)
* (stabilostick) initialization of working state
* (stabilostick) setpoint rounding to 0.5
* (stabilostick) upstream only changed states
* (stabilostick) stabilize state display for setpoint and mode values

### 1.0.0 (2018-05-24)
* (bluefox) refactoring
* (bluefox) added admin3

### 0.1.2 (2017-06-11)
* (paul53) Try to read wall thermostat

### 0.1.1 (2017-06-07)
* (bluefox) use local maxcube lib

### 0.1.0 (2017-06-05)
* (bluefox) intial commit

## License

MIT Copyright (c) 2017-2018 bluefox