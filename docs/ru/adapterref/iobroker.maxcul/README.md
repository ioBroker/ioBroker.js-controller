---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.maxcul/README.md
title: ioBroker.maxcul
hash: 6XQo0gd7QRkRoylGdMHscKHQa5W4FB+ZhlyW12l65XA=
---
![логотип](../../../en/adapterref/iobroker.maxcul/admin/maxcul.png)

![Количество установок](http://iobroker.live/badges/maxcul-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.maxcul.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.maxcul.svg)
![тесты](https://travis-ci.org/ioBroker/ioBroker.maxcul.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.maxcul.png?downloads=true)

# IoBroker.maxcul =======================================
ioBroker адаптер для управления Максом! через [CUL](http://busware.de/tiki-index.php?page=CUL)

Адаптер является производным от [pimatic-maxcul](https://github.com/fbeek/pimatic-maxcul)

## Поддерживаемые устройства
- термостат
- Датчик двери / окна
- Нажать кнопку
- Wallthermostat

## Использование
Перед использованием вы должны сначала соединить устройства с ioBroker.
Например. для термостатов нажмите и удерживайте кнопку «Boost», пока не начнется обратный отсчет.

## Changelog
### 1.0.0 (2018-10-20)
* (Arne Stenmannsr) Wall thermostat was added

### 0.5.3 (2018-03-25)
* (skraw.iobroker) Optimize logic to send commands and scanning

### 0.5.1 (2018-03-07)
* (Apollon77) Further fixes

### 0.5.0 (2018-02-25)
* (Apollon77) Fix Serial data parsing
* (bluefox) Admin3 ready

### 0.4.1 (2018-02-15)
* (Apollon77) Upgrade dependencies

### 0.4.0 (2018-01-24)
* (Apollon77) Upgrade Serialport and cul library

### 0.3.0 (2017-06-21)
* (bowao) Fix control of thermostates

### 0.2.3 (2017-04-11)
* (bluefox) Fix calculation of serial number
* (bluefox) Add valve configuration

### 0.2.0 (2017-04-11)
* (bluefox) Activate thermostat scanner

### 0.1.1 (2017-04-10)
* (bluefox) intial commit

## License

[Licensed under GPLv2](LICENSE) Copyright (c) 2017-2018 bluefox