---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-map/README.md
title: без названия
hash: 9YHL7u/yclZHcz+CwIcipaC5BRtV+jdVagl34XqgvhQ=
---
![логотип](../../../en/adapterref/iobroker.vis-map/admin/vis-map.png) ioBroker.vis-map ============

![Количество установок](http://iobroker.live/badges/vis-map-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.vis-map.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-map.svg)
![NPM](https://nodei.co/npm/iobroker.vis-map.png?downloads=true)

![Скриншот](../../../en/adapterref/iobroker.vis-map/img/widgets.png)

Виджеты, которые могут отображать координаты на карте.
На самом деле поддерживаются только Open Stree Maps и Google. Для использования Google Maps вы должны получить ключ API для карт Google.
Вы можете получить это [Вот](https://console.developers.google.com/flows/enableapi?apiid=maps_backend,geocoding_backend,directions_backend,distance_matrix_backend,elevation_backend&keyType=CLIENT_SIDE&reusekey=true)

## Использование
Вы можете привязать долготу и широту друг от друга или просто поместить в **долготу** идентификатор объекта со следующим значением:

- 7,0001; 49,0000 (долгота; широта)
- 7 0001; 49 0000 (долгота; широта)
- 7,0001,49,0000 (долгота, широта)
- 49,0000,7,0001 (широта, долгота + флаг свопа)
- 49,0000; 7,0001 (широта; долгота + флаг свопа)

## Changelog
### 1.0.2 (2018-07-06)
- (bluefox) Event click on pins added

### 1.0.1 (2018-01-08)
- (bluefox) Fix error if coordinates are empty

### 1.0.0 (2017-09-26)
- (bluefox) allow to swap longitude and latitude

### 0.1.4 (2017-04-28)
- (bluefox) add traffic layer for google maps

### 0.1.3 (2016-09-04)
- (bluefox) fix google map max zoom

### 0.1.1 (2016-07-17)
- (bluefox) remove unused files

### 0.1.0 (2016-07-08)
- (bluefox) initial checkin

## License
 Copyright (c) 2016-2018 bluefox
 MIT