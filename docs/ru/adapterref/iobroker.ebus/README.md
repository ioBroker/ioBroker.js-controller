---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ebus/README.md
title: ioBroker.ebus
hash: dnwDQvgOjGk3G1QfiGVYoF96UsN8t3aIQKtw6Z0pbc4=
---
![логотип](../../../en/adapterref/iobroker.ebus/admin/ebus.png)

![Количество установок](http://iobroker.live/badges/ebus-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.ebus.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ebus.svg)
![тесты](https://travis-ci.org/rg-engineering/ioBroker.ebus.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.ebus.png?downloads=true)

# IoBroker.ebus
Этот адаптер читает

- данные из ebusd с использованием HTML

В этом случае ebusd должен работать и должен иметь возможность отправлять данные, например, на. проводник через http:// IP: порт / данные (http://192.168.0.123:8889/data) Текущая версия ebusd вкл. Конфигурационные файлы можно скопировать с https://github.com/john30/ebusd. Все поля с данными, lastup и из глобального раздела анализируются. Все остальные в данный момент игнорируются.

Существует возможность опроса данных, которые не опрашиваются непосредственно ebusd. Команда «read -f» используется для принудительного чтения через ebus.

Другая особенность - отправка любой команды в ebusd и получение ответа для работы, например, с. скрипты.

текущая поддерживаемая ebusd-версия: 3.3

## Известные проблемы
* пожалуйста, создайте проблемы на [github] (https://github.com/rg-engineering/ioBroker.ebus/issues), если вы обнаружите ошибки или пожелаете новых функций

## 0.8.2 (2019-11-10)
* (René) еще несколько сообщений об ошибках в datapoint "error"

## 0.8.1 (2019-10-31)
* (René) обновление flot до версии 3.0

### 0.8.0 (2019-02-24)
* (René) значение hcmode2 5 = EVU Sperrzeit

### 0.7.0 (2019-01-28)
* (Рене) добавить регулируемое время ожидания

### 0.6.0 (2019-01-06)
* (Рене) поддержка компактного режима

### 0.5.5 (2018-11-04)
* (Рене) код очистить

### 0.5.4
* (René) удалена поддержка arduino

### 0.5.3
* (René) добавить информацию об ошибке

### 0.5.2
* (René) исправление ошибки: в vis 1.x некоторые значения не сохраняются

### 0.5.1
* (René) исправление ошибки: если нечего опрашивать, пропустите соединение telnet

### 0.5.0
* (Рене) записать дату по TCP в ebusd

### 0.4.2
* (Рене) исправление ошибки для администратора V3

### 0.4.1
* (Рене) логотип изменен

### 0.4.0
* (Рене) чтение данных из ebusd

### 0.3.0
* (Рене) поддержка ebusd
* (René) поддержка admin3

### 0.2.0
* (Рене) добавить историю как JSON для виз
* (René) добавить виджет, основанный на флоте, для отображения графика температуры, состояния и мощности

### 0.1.0
* (Рене) запланированный адаптер вместо deamon

### 0.0.3
* (Рене) кодировка UTF8

### 0.0.2
* (Рене) первый выпуск

## Changelog

## License
Copyright (C) <2017 - 2019>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.