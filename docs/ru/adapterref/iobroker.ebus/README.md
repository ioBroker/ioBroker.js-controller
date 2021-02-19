---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ebus/README.md
title: ioBroker.ebus
hash: xxNMxOww/Mb3yCrqbYQpAG95lD28PdziSWOPvmWfjAo=
---
![Логотип](../../../en/adapterref/iobroker.ebus/admin/ebus.png)

![Количество установок](http://iobroker.live/badges/ebus-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.ebus.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ebus.svg)
![Тесты](https://travis-ci.org/rg-engineering/ioBroker.ebus.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.ebus.png?downloads=true)

# IoBroker.ebus
** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация по Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

** Если вам это нравится, рассмотрите возможность пожертвования: **

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

Этот адаптер читает

- данные из ebusd с использованием html

В этом случае должен работать ebusd и иметь возможность отправлять данные, например, проводник через http:// IP: порт / данные (http://192.168.0.123:8889/data) Текущая версия ebusd, вкл. файлы конфигурации можно скопировать с https://github.com/john30/ebusd. Все поля с данными, lastup и из глобального раздела анализируются. Все остальные на данный момент игнорируются.

Существует возможность опроса данных, которые не опрашиваются напрямую ebusd. Команда read -f используется для принудительного чтения через ebus.

Другая функция - отправить любую команду в ebusd и получить ответ для работы, например. скрипты.

Текущая поддерживаемая версия ebusd: 3.3

## Известные вопросы
* пожалуйста, создавайте проблемы на [github] (https://github.com/rg-engineering/ioBroker.ebus/issues), если вы обнаружите ошибки или захотите новые функции

## 2.2.4 (17.02.2021)
* (Рене) см. Проблему # 42: Uncaught ReferenceError: oView не определен в виджете, решена

## 2.2.3 (2020-10-24)
* (Рене) создать историю DP, если она недоступна

## 2.2.0 (06.09.2020)
* (Рене) меняйте DP только в случае необходимости, чтобы снизить нагрузку на систему
* (René) обновить зависимости

## 2.1.1 (27.06.2020)
* (Рене) проблема №26: исправление ошибки: «cmd not found» - это только сообщение отладки, а не ошибка

## 2.1.0 (17.06.2020)
* (René) рефакторинг: используется async / await

## 2.0.0 (26.04.2020)
* (Рене) «просьба» заменена на «изогнутая»

## 1.0.0 (15.12.2019)
* (Рене) обновление до моего собственного флота 3.0

## 0.8.2 (10.11.2019)
* (Рене) еще несколько сообщений об ошибках в точке данных "error"

## 0.8.1 (31.10.2019)
* (René) обновление флота до версии 3.0

### 0.8.0 (24.02.2019)
* (Рене) значение hcmode2 5 = EVU Sperrzeit

### 0.7.0 (28.01.2019)
* (Рене) добавить настраиваемый тайм-аут

### 0.6.0 (06.01.2019)
* (René) поддержка компактного режима

### 0.5.5 (04.11.2018)
* (Рене) очистка кода

### 0.5.4
* (René) поддержка arduino удалена

### 0.5.3
* (Рене) добавить информацию об ошибке

### 0.5.2
* (René) исправление ошибки: в vis 1.x некоторые значения не сохраняются

### 0.5.1
* (René) исправление ошибки: если нечего опрашивать, пропустите telnet-соединение

### 0.5.0
* (Рене) записывает дату по TCP в ebusd

### 0.4.2
* (René) исправление ошибки для админки V3

### 0.4.1
* (René) логотип изменен

### 0.4.0
* (Рене) чтение данных из ebusd

### 0.3.0
* (René) поддержка ebusd
* (René) admin3 поддержка

### 0.2.0
* (René) добавить историю как JSON для vis
* (René) добавить виджет на основе плавающего режима для отображения графика температуры, состояния и мощности

### 0.1.0
* (René) запланированный адаптер вместо deamon

### 0.0.3
* (Рене) Кодировка UTF8

### 0.0.2
* (Рене) первый выпуск

## Changelog

## License
Copyright (C) <2017 - 2020>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.