---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rickshaw/README.md
title: без названия
hash: Ez/Lkulz+xrUY+5AhrRzaNn1T7EFlUq8kjVJRmOmlrc=
---
![логотип](../../../en/adapterref/iobroker.rickshaw/admin/rickshaw.png) ioBroker.rickshaw =================

![Количество установок](http://iobroker.live/badges/rickshaw-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.rickshaw.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rickshaw.svg)
![NPM](https://nodei.co/npm/iobroker.rickshaw.png?downloads=true)

Нарисуйте диаграммы с помощью [рикша](https://shutterstock.github.io/rickshaw/examples/).

## Как пользоваться
- установить "socketio" -adapter и создать один экземпляр
- установить "web" -адаптер и создать один экземпляр.
- Выберите в настройках «web» -адаптера экземпляр установленного экземпляра «socket.io».
- установить "рикшу" -адаптер и вызвать
- Перейдите по адресу http:// ip: 8082 / rickshaw / edit.html.

## Changelog
### 1.0.0 (2018-10-21)
* (informaniac) fix german translations

### 0.4.5 (2017-02-08)
* (bluefox) fix russian translations

### 0.4.4 (2016-08-29)
* (bluefox) add aggregate type and number of intervals

### 0.4.2 (2016-08-14)
* (bluefox) support of web-sockets force

### 0.4.1 (2016-05-20)
* (bluefox) change default aggregation name

### 0.4.0 (2016-05-02)
* (bluefox) support of ms

### 0.3.1 (2015-12-14)
* (bluefox) fix error if value is null
* (bluefox) fix empty data
* (bluefox) implement instances list

### 0.3.0 (2015-11-15)
* (bluefox) support of new history (multi history)

### 0.2.2 (2015-03-24)
* (bluefox) Convert string values to numbers

### 0.2.1 (2015-03-07)
* (bluefox) Convert boolean values to numbers
* (bluefox) add translation to russian

### 0.2.0 (2015-03-04)
* (bluefox) add min and max
* (bluefox) add translation to russian (partly)

### 0.1.5 (2015-01-20)
* (bluefox) update socket connection

### 0.1.4 (2015-01-08)
* (bluefox) set name of socket connection

### 0.1.3 (2015-01-07)
* (bluefox) set onlyWWW flag

### 0.1.2 (2015-01-03)
* (bluefox) fix selectId dialog

### 0.1.1 (2015-01-02)
* (bluefox) add history to dependencies

### 0.1.0 (2015-01-02)
* (bluefox) enable npm install

### 0.0.7 (2014-12-12)
* (bluefox) remove common files like jquery and so on

### 0.0.6 (2014-12-12)
* (bluefox) update select ID dialog and remove jqGrid

### 0.0.5 (2014-12-10)
* (bluefox) build in select ID dialog

### 0.0.4 (2014-12-05)
* (bluefox) use "linear" interpolation by default

### 0.0.3 (2014-11-26)
* (bluefox) fix IDs without units

### 0.0.2 (2014-11-24)
* (bluefox) usable adapter