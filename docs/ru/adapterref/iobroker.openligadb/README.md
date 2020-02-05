---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.openligadb/README.md
title: ioBroker Adapter для получения результатов футбольного спортивного матча от OpenLigaDB
hash: 9bfbzA6cbNxYlyrVPRQt9p4KSJUlPjuP1FqXDEd/K3c=
---
![логотип](../../../en/adapterref/iobroker.openligadb/admin/openligadb_b.png)

![Количество установок](http://iobroker.live/badges/openligadb-installed.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.openligadb.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.openligadb.svg)
![Travis](https://img.shields.io/travis/oweitman/ioBroker.openligadb.svg)
![AppVeyor Статус сборки](https://img.shields.io/appveyor/ci/oweitman/iobroker-openligadb.svg)
![GitHub вопросы](https://img.shields.io/github/issues/oweitman/ioBroker.openligadb.svg)

# IoBroker Адаптер для получения результатов футбольного спортивного матча от OpenLigaDB
## Обзор
Адаптер для запроса игровых данных для футбола или других игр от openligadb.de

## Конфигурация
Добавьте экземпляр адаптера и нажмите на значок гаечного ключа. В форме вы можете добавить ярлык из лиги и сезона.
Посетите openligadb.de, чтобы узнать о доступных лигах, сезонах и ярлыках. Если сезон длится более двух лет, введите только начальный год.

Пример данных для 1. Немецкий Bundliga является сокращенным = сезон bl1 = 2019

Если вы сохранили и закрыли конфигурацию, вскоре после этого должны появиться новые точки данных для вашей лиги и сезона.

## Vis и виджеты
На самом деле доступно 3 виджета. Пожалуйста, введите openligadb в фильтр виджетов

### Стол
Этот виджет отображает текущий рейтинг вашей лиги

### День игры
Все игры текущего или выбранного игрового дня. Существует множество атрибутов виджета для настройки количества отображаемых данных.

### FavGame
Показать все, актуальные или будущие игры ваших любимых клубов

Документация для vis-виджетов доступна внутри vis или [Виджет-Documentation / немецкий](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.openligadb/blob/master/widgets/openligadb/doc.html)

## Сделать
* проверка в виджете, если пользователь не выбрал правильную точку данных
* перевод
* документация адаптер / виджет
* ~~ исправить проблему для динамического с клубной колонной ~~
* ~~ новый виджет: следующие х игр клуба ~~
* ~~ настройка игрового дня виджета для начала игрового дня и продолжительности (-1,3 = показать предыдущий игровой день и 3 игровых дня после этого) ~~
* ~~ Значение замены для режима редактирования, если выставочный день установлен с привязкой ~~
* ~~ выделить любимый клуб ~~
* ~~ контролируемый игровой день в виджете игрового дня ~~

## Changelog
### 0.0.1
* initial release
### 0.0.2
* add controlable gameday logic to gameday widget and adapter
### 0.0.3
* fixed getting oids in vis runtime
### 0.0.4
* fixed more oids in vis runtime
### 0.0.5
* highlight favorite club, 
* Replacement value for edit mode if showgameday is set with binding, 
* widget gameday setting for start gameday an length (-1,3 = show previous gameday and 3 gamedays after that) 
* some documentation 
* remove unused code
* new widget: next x games of club
* fix issue for dynamic with of club column
### 0.0.6
* NPM deployment and preperation for the latest repository
### 0.0.7
* close connections and remove observers (timeouts/intervals)
### 0.0.8
* new widget games of favorite clubs with multi league support as replacement for the old one
### 0.0.9
* optional weekday for widgets: gameday and gamesoffavclub,highlight the clubname in gamesoffavclub
### 0.0.10
* widget gameday: optional you can show informations about the goalgetters
### 0.0.11
* widget gameday: fix issue with not working gamedaycount
### 0.8.0
* push version for latest repository. fix some typos. fix a problem with date handling on different OS

## License
MIT License

Copyright (c) 2020 oweitman

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