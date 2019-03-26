---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.yr/README.md
title: ioBroker.yr
hash: 5qdg/c8Aor4SO0NCMWBSaAxtXCkdR1s5M1UQURZfeRM=
---
![логотип](../../../en/adapterref/iobroker.yr/admin/yr.png)

![Количество установок](http://iobroker.live/badges/yr-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.yr.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.yr.svg)
![тесты](https://travis-ci.org/ioBroker/ioBroker.yr.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.yr.png?downloads=true)

# IoBroker.yr =================================
получает прогноз погоды на 48 часов из [yr.no](yr.no)

[yr.no] (yr.no) является совместной службой [Норвежский метеорологический институт] (met.no) и [Норвежская радиовещательная корпорация](nrk.no)

http://om.yr.no/verdata/free-weather-data/

** Примечание ** - если _ «Отправить отсутствующие переводы на iobroker.net» _ активировано (по умолчанию), то отсутствующие переводы будут отправлены на сервер iobroker.net. Никакие ips или любая дополнительная информация не будут сохранены или проанализированы. Просто отсутствует перевод.

## Иконки
Иконки взяты отсюда [https://github.com/YR/weather-symbols](https://github.com/YR/weather-symbols) и принадлежит yr.no.

## 1.0.4 [2016-07-06]
* (bluefox) исправление ссылки на readme

### 1.0.3 [2016-05-17]
* (bluefox) изменить путь чтения

### 1.0.2 [2016-05-16]
* (bluefox) добавить перевод

### 1.0.1 [2016-04-25]
* (bluefox) добавить перевод

### 1.0.0 [2016-03-15]
* (bluefox) изменение парсинга городов

### 0.1.9 [2015-10-28]
* (bluefox) исправить ошибку с переводами

### 0.1.8 [2015-10-27]
* (bluefox) переводы
* (bluefox) автоматическая загрузка отсутствующих переводов на iobroker.net

### 0.1.7 [2015-07-10]
* (bluefox) заставляет вас работать с виджетами метро

### 0.1.6 [2015-06-12]
* (bluefox) переводы

### 0.1.5 [2015-03-26]
* (bluefox) переводы

### 0.1.4 [2015-03-24]
* (bluefox) убрать единицу «%» для «направления ветра»

### 0.1.3 [2015-03-22]
* (bluefox) исправляет ошибку завтра и послезавтра

### 0.1.2 [2015-03-08]
* (bluefox) правильные ссылки на сайт yr.no

### 0.1.1
* (bluefox) добавить переводы для погодных условий на другие языки

### 0.1.0
* (bluefox) обновить год на новой модели объектов

### 0.0.4
* (hobbyquaker) предварять "прогноз". указать идентификаторы

### 0.0.3
* (hobbyquaker) настройки интерфейса с автозаполнением для местоположения
* (hobbyquaker) переименован в yr_forecast для прогноза
* (hobbyquaker) добавлен атрибут детей
* (хобби-квакер) уменьшенная детализация журнала
* (хобби-квакер) исправления

### 0.0.2
* (хобби-квакер) исправления

### 0.0.1
* (hobbyquaker) первый выпуск

## Сделать
* setState forecast_object

## Changelog
### 2.0.3 [2018-10-10]
* (bluefox) add translations

### 2.0.2 [2018-08-01]
* (bluefox) Warning! Breaking changes! States are renamed.
* (bluefox) Refactoring of states and roles

### 1.0.6 [2017-05-27]
* (Andre) Update iconset

### 1.0.5 [2016-10-10]
* (bluefox) move weather widgets to this adapter

## License

The MIT License (MIT)

Copyright (c) 2014-2018 hobbyquaker <hq@ccu.io>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.