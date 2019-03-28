---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.opentherm/README.md
title: Opentherm интеграция ioBroker
hash: wikTXYrREugR2qKKXWiYccvaYJY6/WmEIE+cjCSqnzA=
---
![альтернативный текст](https://raw.githubusercontent.com/DutchmanNL/ioBroker.opentherm/master/admin/opentherm_large.png)

![альтернативный текст](https://travis-ci.org/iobroker-community-adapters/ioBroker.opentherm.svg?branch=master)
![Количество установок](http://iobroker.live/badges/opentherm-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.opentherm.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.opentherm.svg)
![Значок Greenkeeper](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.opentherm.svg)

# Opentherm интеграция ioBroker
Этот адаптер объединяет все функции шлюза opentherm в ioBroker.
Opentherm - это протокол шлюза, используемый несколькими современными системами отопления, такими как Remeha.

Для получения дополнительной информации http://otgw.tclcode.com/index.html#intro со всеми кредитами для разработчиков.

### Рекомендуемая функциональность в конечном состоянии:
* Предоставьте сервер ретрансляции TCP / IP, чтобы разрешить подключение другого программного обеспечения монитора OpenTherm к этому экземпляру (при использовании прямого подключения USB)
* Где возможно, отрегулируйте значения в ioBroker и отправьте команду в Opentherm
* Пожалуйста, не стесняйтесь добавлять запросы функций

### В настоящее время реализовано
* Подключение к OpenTherm Gateway по TCP / IP
* Подключение к OpenTherm Gateway напрямую через USB-соединение

## Сделать
* Подключение к OpenTherm Gateway напрямую через USB-соединение
* Предоставьте сервер ретрансляции TCP / IP, чтобы разрешить подключение другого программного обеспечения монитора OpenTherm к этому экземпляру (при использовании прямого подключения USB)
* Куда

### 0.1.9
* Реализовано прямое подключение по USB
* добавлены параметры конфигурации в настройки адаптера
* Исправлена проблема неправильной регистрации

### 0.1.8
* Исправлена проблема с неправильным типом объекта (логическое / число / строка)
* Реализовано округление состояний до 1 цифры после запятой

### 0.1.7
* реализован режим разработчика (все состояния для всех типов сообщений будут создаваться в _Dev
* Реализован режим ведения журнала разработчика (если не активирован, информация не записывается в журнал!)
* Несколько небольших исправлений

### 0.1.6
* Создание логических каналов
* создание штатов
* уменьшено ведение журнала, все полученные сообщения все еще находятся в журнале во время бета-тестирования для сбора данных
* создание файла определения (пожалуйста, не стесняйтесь предоставить вход)

### 0.1.0
* Чтение данных по TCP-соединению в лог-файл

### 0.0.1
* (Голландец) первоначальный коммит

## License
MIT License

Copyright (c) 2018 Dutchman

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