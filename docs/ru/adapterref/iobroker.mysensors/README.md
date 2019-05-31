---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mysensors/README.md
title: ioBroker.mysensors
hash: pqyUZ7lepiWRdgoAZsaiXY3HfA02mg4o2YbQuc5rBQw=
---
![логотип](../../../en/adapterref/iobroker.mysensors/admin/mysensors.png)

![Количество установок](http://iobroker.live/badges/mysensors-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.mysensors.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mysensors.svg)
![тесты](https://travis-ci.org/ioBroker/ioBroker.mysensors.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.mysensors.png?downloads=true)

# IoBroker.mysensors
Этот адаптер связывается с [mysensors](http://www.mysensors.org) последовательным или сетевым шлюзом (TCP или UDP).
В этом случае выбран Ethernet-шлюз, ioBroker является сервером, который ожидает соединения.

## TCP-клиент
Этот параметр работает только вместе с последовательным мостом TCP & lt; = & gt; например, [особ-ссылка](https://github.com/jeelabs/esp-link).

## Предварительные требования
Для использования последовательного порта в Windows требуется сборка двоичного кода.
Для использования последовательного порта в linux необходим сборочный python2.7. Чтобы установить их просто напишите:

```
sudo apt-get update
sudo apt-get install build-essential
sudo apt-get install python2.7
```

## Changelog
### 2.0.0 (2019-05-15)
* (Apollon77) Support for nodejs 12 added, nodejs 4 is no longer supported!

### 1.2.2 (2018-09-17)
* (Haba1234) Added new objects (library 2.3.x)
* (Haba1234) Added support for sleeping nodes

### 1.2.1 (2018-01-23)
* (Haba1234) Update for Admin v3

### 1.2.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library

### 1.1.0 (2017-12-17)
* (bluefox) TCP client added

### 1.0.10 (2017-10-24)
* (jangatzke) Fixed wrong data type for scene controller, enabled ack flag on set command

### 1.0.8 (2017-04-18)
* (Qube2org) adjust log level for I_LOG_MESSAGE

### 1.0.7 (2017-04-10)
* (bluefox) fix I_TIME request

### 1.0.6 (2016-12-17)
* (bluefox) show extended list of serial ports

### 1.0.5 (2016-12-15)
* (Apollon77) update serialport library for node 6.x compatibility

### 1.0.4 (2016-07-01)
* (bluefox) add comment in configuration
* (bluefox) fix inclusion mode control

### 1.0.2 (2016-07-06)
* (soef) fix id usage

### 1.0.1 (2016-07-01)
* (soef) necessary version of sensor module increased

### 1.0.0 (2016-06-28)
* (soef) some value corrections and enlargement

### 0.2.6 (2016-06-16)
* (bluefox) do not switch off inclusion mode by stop

### 0.2.5 (2016-06-14)
* (bluefox) remove debug outputs

### 0.2.4 (2016-06-10)
* (bluefox) try/catch parse of messages

### 0.2.3 (2016-04-13)
* fix boolean values

### 0.2.2 (2016-04-10)
* (bluefox) implement inclusion mode

### 0.2.1 (2016-03-21)
* (bluefox) translates
* (bluefox) connection timeout for serial connection

### 0.2.0 (2016-03-21)
* (bluefox) wait till serial port is opened
* (bluefox) configurable baud rate

### 0.1.10 (2016-03-21)
* (bluefox) set role of dimmer as level.dimmer

### 0.1.9 (2016-03-15)
* (bluefox) fix typo

### 0.1.8 (2016-03-02)
* (bluefox) fix connection indicator for serial

### 0.1.7 (2016-03-02)
* (bluefox) do not send any data on disconnect

### 0.1.6 (2016-03-02)
* (bluefox) set UDP as default settings

### 0.1.5 (2016-03-02)
* (bluefox) change tree