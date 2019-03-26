---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-history/README.md
title: без названия
hash: a4nWDMfSsymodIiaUYEYFsXg0ENJ99v/80gAAdjQ4ZM=
---
![логотип](../../../en/adapterref/iobroker.vis-history/admin/vis-history.png) ioBroker.vis-history ============

![Количество установок](http://iobroker.live/badges/vis-history-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.vis-history.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-history.svg)
![NPM](https://nodei.co/npm/iobroker.vis-history.png?downloads=true)

![Скриншот](../../../en/adapterref/iobroker.vis-history/img/widgets.png)

Виджеты, которые могут работать с данными истории. Конечно, для этого нужны некоторые адаптеры истории: sql, history или flow (или что-то еще).

Спарклайны могут быть показаны только для недвоичных данных из-за агрегации.

Для спарклайнов используется [плагин jquery](http://omnipotent.net/jquery.sparkline/), который был написан Гаретом Уоттсом и выпущен по новой лицензии BSD.

## Changelog

### 0.2.7 (2017-05-29)
- (Apollon77) small fixes on Title (http://forum.iobroker.net/viewtopic.php?f=23&t=3111&start=20#p68971) and getHistory parameters

### 0.2.6 (2017-03-02)
- (bluefox) small fix for empty values

### 0.2.5 (2017-01-13)
- (bluefox) make http links "clickable" in the list

### 0.2.4 (2016-10-09)
- (bluefox) support of new custom schema

### 0.2.3 (2016-09-22)
- (bluefox) fixed JS error

### 0.2.2 (2016-08-22)
- (bluefox) add units and suffix

### 0.2.1 (2016-07-09)
- (bluefox) typo

### 0.2.0 (2016-07-09)
- (bluefox) fix max line settings
- (bluefox) add 'none' time selector

### 0.1.1 (2016-06-13)
- (bluefox) change default style to vis-style-green-gray

### 0.1.0 (2016-06-13)
- (bluefox) initial checkin

## License
 Copyright (c) 2016 bluefox
 BSD-3-Clause