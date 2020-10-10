---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sbfspot/README.md
title: ioBroker.sbfspot
hash: jd9BgNo5pX4TKImcxV35XMy4WBvFO8nVTCUheVhfS+A=
---
![Логотип](../../../en/adapterref/iobroker.sbfspot/admin/sbfspot.png)

![Количество установок](http://iobroker.live/badges/sbfspot-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.sbfspot.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sbfspot.svg)
![Тесты](https://travis-ci.org/rg-engineering/ioBroker.sbfspot.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.sbfspot.png?downloads=true)

# IoBroker.sbfspot
** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация по Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

** Если вам это нравится, рассмотрите возможность пожертвования: **

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

Этот адаптер считывает данные с преобразователей мощности SMA с помощью sbfspot.
Теперь поддерживаются оба типа баз данных (mySQL и sqlite).
Начиная с версии 0.2.3 существует собственный виджет vis, основанный на flot, доступный для отображения исторических данных.

## Установка
следуйте инструкциям по установке sbfspot на странице https://github.com/SBFspot/SBFspot/wiki

[детальная установка на системы на базе arm](docs/en/install_arm.md)

## Подсказки
* используйте последнюю версию от sbfspot с https://github.com/SBFspot/SBFspot
* адаптер, sbfspot и базы данных (mySQL или sqlite) должны работать в одной системе, например. Raspberry Pi
* руководство по установке sbfspot на Raspberry Pi (или аналогичном) можно найти по адресу https://github.com/SBFspot/SBFspot/wiki/Installation-Linux-SQLite или https://www.rg-engineering.eu/index. php / produkte / программное обеспечение / плагин-fuer-iobroker-sbfspot
* для Raspberry Pi существует полуавтоматический инструмент настройки, доступный по адресу https://github.com/SBFspot/sbfspot-config

## Известные проблемы
* иногда установка пакета npm sqlite3 не выполняется.

в этом случае переустановите все пакеты npm

> cd /opt/iobroker/node_modules/iobroker.sbfspot> sudo npm install

иногда npm intall необходимо вызывать более одного раза, чтобы успешно установить все необходимые пакеты

* пожалуйста, создавайте проблемы на [github] (https://github.com/rg-engineering/ioBroker.sbfspot/issues), если вы обнаружите ошибки или захотите новые функции

## 4.0.2 (2020-10-09)
* (René) исправление ошибки на основе тестов CI

## 4.0.0 (2020-07-28)
* (Рене) переработка для использования async / await
* (Рене) используйте mysql2

## 3.0.0 (25.04.2020)
* (René) пакет sqlite3 заменен на better-sqlite3
* (Рене) роли DP перегружены
* (Рене) см. Проблему №19: получать данные только при добавлении дневного света в качестве опции
* (Рене) см. Проблему # 29: изменен цвет по умолчанию для метки оси виджета
* (Рене) виджет: добавлен журнал, если виджет слишком мал

## 2.4.3 (2020-04-02)
* (René) исправление ошибки в DB_CalcHistory_Today, используемой для виджета

## 2.4.2 (01.02.2020)
* (René) виджет исправления ошибок

## 2.4.0 (28 декабря 2019 г.)
* (Рене) обновление до моего собственного флота 3.0

## 2.3.4 (31.10.2019)
* (René) обновление флота до версии 3.0

### 2.3.3 (03.02.2019)
* (Рене) из-за проблем с установкой понизил версию пакета sqlite3

### 2.3.1 (02.02.2019)
* (René) исправление ошибки: с sqlite "сегодня" данные не отображались

### 2.3.0 (20.01.2019)
* (René) поддержка компактного режима
* (Рене) добавить дополнительную информацию об ошибке в журнал

### 2.2.5 (26.11.2018)
* (René) пакеты обновления

### 2.2.5 (04.11.2018)
* (Рене) сбрасывает доход, если с сегодняшнего дня нет нового значения

### 2.2.4 (19.08.2018)
* (René) исправление тиков на X

### 2.2.3
* (Рене) то же, что и 2.2.2

### 2.2.2
* (Рене) добавить отметку времени последнего обновления

### 2.2.1
* (Рене) закрытие соединения с базой данных после получения последнего результата запроса (например, для поддержки более одного инвертора)

### 2.2.0
* (Nis) цвет фона и границы
* (René) исправления ошибок в admin3

### 2.1.0
* (Рене) Поддержка MariaDB

### 2.0.1
* (Рене) Поддержка admin3

### 2.0.0
* (Рене), поскольку мы всегда используем один график для каждого виджета, сейчас поддерживается только один

Внимание: виджет несовместим с версией 1.x.x; просто проверьте настройки в виджете после установки!

### 1.1.0
* (René) автомасштаб по оси y
* (René) цвет для оси y
* (René) регулируемый формат даты

### 1.0.1
* (René) исправление ошибки для sqlite

### 1.0.0
* (René) первая стабильная версия

### 0.2.6
* (René) исправление ошибки в приложении для Android> 1.0.6

### 0.2.5
* (Рене) используйте дату установки для расчета исторических значений

### 0.2.4
* (René) логотип изменен

### 0.2.3
* (Рене) добавление исторических данных в виде точки данных (JSON)
* (René) новый виджет vis для отображения исторических данных

### 0.2.2
* (Рене) переименован в sbfspot

### 0.2.1
* (René) index.html обновлен

### 0.2.0
* (René) поддержка sqlite и лицензии изменена на MIT

### 0.1.1
* (Рене) Кодировка UTF8

### 0.1.0
* (Рене) первый выпуск

### 0.0.1
* (Рене) первый выпуск

## Changelog

## License
Copyright (C) <2017-2020>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.