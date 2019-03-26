---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vr200/README.md
title: ioBroker.vr200
hash: o0F4IRoVxRDtI08RdgicrLLzwC7SnYFwzWHJXr/xiAw=
---
![логотип](../../../en/adapterref/iobroker.vr200/admin/VR200.png)

![Количество установок](http://iobroker.live/badges/vr200-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.vr200.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vr200.svg)
![Трэвис-CI](https://travis-ci.org/Eisbaeeer/ioBroker.vr200.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.vr200.png?downloads=true)

# IoBroker.vr200
Это полный форк адаптера Botvac. Единственное отличие заключается в использовании соответствующего модуля node-kobold из nicoh88.
Я не автор адаптера. Я только изменил некоторые вещи, чтобы VR200 работал как адаптер.
Полное уважение дает Pmant и nicoh88.

## Монтаж
- установить адаптер
- введите свои учетные данные пользователя Vorwerk
- при необходимости измените интервал опроса (минимум 60)

## Использование
- используйте состояния в канале команд для управления вашим VR200
- используйте состояния can * в канале статуса, чтобы увидеть, какие команды являются действительными
- все состояния в канале статуса доступны только для чтения

## Примеры
### Чистить в эко режиме
- проверьте, является ли status.canStart `` `true```
- установите для commands.eco значение `` `true```
- установите для commands.clean значение `` `true```

### Очистить пятно 150 см * 150 см
- поместите VR200 перед желаемым местом
- проверьте, является ли status.canStart `` `true```
- установите для groups.spotHeight и commands.spotWidth значение «150».
- установите для commands.cleanSpot значение `` `true```

### Вернуться на базу
- status.dockHasBeenSeen должен быть `` `истинным```
- VR200 должен быть в состоянии паузы или останова (commands.stop / commands.pause)
- установите для arguments.goToBase значение `` `true```

## Changelog

### 0.1.0
- (Eisbaeeer) inital commit from Pmant�s adapter
### 0.2.0
- (Eisbaeeer) added Travis testing - no changes in code
### 0.3.0
- (Eisbaeeer) fixed issue #1 (status reachable)
### 1.0.0
- no changes. Went to stable release.

## License
The MIT License (MIT)