---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sbfspot/README.md
title: ioBroker.sbfspot
hash: H35jC6h/n9Gh+hmU2Jqe7BvaNZe8+id1JmRgM0alWGg=
---
![логотип](../../../en/adapterref/iobroker.sbfspot/admin/sbfspot.png)

![Количество установок](http://iobroker.live/badges/sbfspot-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.sbfspot.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sbfspot.svg)
![тесты](https://travis-ci.org/rg-engineering/ioBroker.sbfspot.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sbfspot.png?downloads=true)

# IoBroker.sbfspot
Этот адаптер считывает данные с силовых преобразователей SMA, используя sbfspot.
Теперь поддерживаются оба типа базы данных (mySQL и sqlite).
Начиная с версии 0.2.3, существует собственный виджет vis, основанный на flot, для отображения исторических данных.

## Подсказки
* используйте последнюю версию из sbfspot с https://github.com/SBFspot/SBFspot или с https://github.com/rg-engineering/SBFspot
* адаптер, sbfspot и базы данных (mySQL или sqlite) должны работать в одной системе, например Raspberry Pi
* Руководство по установке sbfspot на Raspberry Pi (или аналогичном) можно найти по адресу https://github.com/SBFspot/SBFspot/wiki/Installation-Linux-SQLite или https://www.rg-engineering.eu/index. PHP / Продукты / программное обеспечение / плагин-Fuer-iobroker-sbfspot
* для Raspberry Pi есть полуавтоматический инструмент настройки, доступный по адресу https://github.com/SBFspot/sbfspot-config

## Известные проблемы
* пожалуйста, создайте проблемы на [github] (https://github.com/rg-engineering/ioBroker.sbfspot/issues), если вы обнаружите ошибки или пожелаете новых функций

## 2.3.4 (2019-10-31)
* (René) обновление flot до версии 3.0

### 2.3.3 (2019-02-03)
* (René) из-за проблем с установкой понижения пакета sqlite3

### 2.3.1 (2019-02-02)
* (René) исправление ошибки: с sqlite "сегодня" данные не отображались

### 2.3.0 (2019-01-20)
* (Рене) поддержка компактного режима
* (René) добавить дополнительную информацию об ошибке в журнал

### 2.2.5 (2018-11-26)
* (René) пакеты обновлений

### 2.2.5 (2018-11-04)
* (René) сбросить доходность, если нет нового значения за сегодняшний день

### 2.2.4 (2018-08-19)
* (René) исправление для тиков на X

### 2.2.3
* (Рене) так же, как 2.2.2

### 2.2.2
* (Рене) добавить метку времени последнего обновления

### 2.2.1
* (René) закрытие соединения с базой данных после получения последнего результата запроса (например, для поддержки более одного преобразователя)

### 2.2.0
* (Nis) цвет фона и границы
* (René) исправление ошибок в admin3

### 2.1.0
* (Рене) Поддержка MariaDB

### 2.0.1
* (René) Поддержка admin3

### 2.0.0
* (René), поскольку мы всегда используем один график для виджета, теперь поддерживается только один

Внимание: виджет не совместим с версией 1.x.x; просто проверьте настройки в виджете после установки!

### 1.1.0
* (Рене) автомасштабирование оси у
* (Рене) цвет для оси у
* (Рене) регулируемый формат даты

### 1.0.1
* (Рене) исправление ошибки для sqlite

### 1.0.0
* (Рене) первый стабильный релиз

### 0.2.6
* (Рене) исправление ошибки для приложения для Android> 1.0.6

### 0.2.5
* (Рене) использовать дату установки для расчета исторических значений

### 0.2.4
* (Рене) логотип изменен

### 0.2.3
* (René) добавление исторических данных в качестве точки данных (JSON)
* (René) новый виджет vis для отображения исторических данных

### 0.2.2
* (Рене) переименован в sbfspot

### 0.2.1
* (René) index.html обновлен

### 0.2.0
* (René) поддержка sqlite и лицензии изменена на MIT

### 0.1.1
* (Рене) кодировка UTF8

### 0.1.0
* (Рене) первый выпуск

### 0.0.1
* (Рене) первый выпуск

## Changelog

## License
Copyright (C) <2017-2019>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.