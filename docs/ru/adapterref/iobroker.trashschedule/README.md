---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.trashschedule/README.md
title: ioBroker.trashschedule
hash: yh8XvPLUW6JXEm9Kg/mzld7CJMz1EZPbRbApTGMjN1w=
---
![логотип](../../../en/adapterref/iobroker.trashschedule/admin/trashschedule.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.trashschedule.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.trashschedule.svg)
![стабильный](http://iobroker.live/badges/trashschedule-stable.svg)
![установлены](http://iobroker.live/badges/trashschedule-installed.svg)
![Статус зависимости](https://img.shields.io/david/klein0r/iobroker.trashschedule.svg)
![Известные уязвимости](https://snyk.io/test/github/klein0r/ioBroker.trashschedule/badge.svg)
![Статус сборки](http://img.shields.io/travis/klein0r/ioBroker.trashschedule.svg)
![NPM](https://nodei.co/npm/iobroker.trashschedule.png?downloads=true)

# IoBroker.trashschedule
Сканирует календарь для подсчета дней, оставшихся до следующего вывоза мусора

## Предварительные условия
1. Создайте **фактический экземпляр**
2. Настройте URL-адрес вашего календаря (например, календарь Google).
3. Установите для параметра "Дни предварительного просмотра" диапазон, включающий каждый тип корзины как минимум дважды (например, 30 дней).
4. Выберите вариант «Скрыть начало и конец событий».
5. Если вы используете вкладку «События», убедитесь, что для каждого типа события установлен флажок «Отображать», который также должен использоваться в вашем расписании корзины (в противном случае событие будет скрыто экземпляром ical).

## Конфигурация
1. Создайте экземпляр расписания корзины и выберите этот экземпляр в качестве источника.
2. Перейдите на вкладку типов мусора и добавьте названия типов и совпадения событий.
3. Запустите экземпляр.

** Вопросы? ** Проверьте FAQ: [Немецкий](https://github.com/klein0r/ioBroker.trashschedule/blob/master/faq_de.md)

## Changelog

### 0.0.11

* (klein0r) Better error reporting

### 0.0.10

* (klein0r) Added CSS classes for easier customization
* (klein0r) Added optional glow on due date for vis widget

### 0.0.9

* (klein0r) Fixed color correction calculation issue

### 0.0.8

* (klein0r) Fixed missing VIS translations

### 0.0.7

* (klein0r) Improved logging
* (klein0r) Several fixes, improved admin and vis (automatic color correction, resizeable widget)
* (ivosch68) Reset of states if no event matches

### 0.0.6

* (klein0r) updated dependencies

### 0.0.5

* (klein0r) added pickup dates after next date

### 0.0.4

* (klein0r) added VIS templates

### 0.0.3

* (klein0r) fixed issue with events after time change date

### 0.0.2

* (klein0r) added global offset in days
* (klein0r) added exact match for types

### 0.0.1

* (klein0r) initial release

## License

MIT License

Copyright (c) 2020 Matthias Kleine <info@haus-automatisierung.com>

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