---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.omron-fins/README.md
title: ioBroker.omron-fins
hash: C6+WSTKgHSrkPim8raQuThxjy5jHkWNqoo4afVq6R74=
---
![Логотип](../../../en/adapterref/iobroker.omron-fins/admin/omron-fins.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.omron-fins.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.omron-fins.svg)
![Количество установок (последнее)](http://iobroker.live/badges/omron-fins-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/omron-fins-stable.svg)
![Статус зависимости](https://img.shields.io/david/thebam1990/iobroker.omron-fins.svg)
![Известные уязвимости](https://snyk.io/test/github/thebam1990/ioBroker.omron-fins/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.omron-fins.png?downloads=true)

# IoBroker.omron-fins
** Тесты: ** ![Тестирование и выпуск](https://github.com/thebam1990/ioBroker.omron-fins/workflows/Test%20and%20Release/badge.svg)

## Для немецкого
https://github.com/TheBam1990/ioBroker.omron-fins/blob/master/Readmede.md

## Адаптер omron-fins для ioBroker
Подключение ПЛК Omron по протоколу FINS для всех моделей CJ2M или CJ1M

## Руководство пользователя (на английском языке)
Настройте IP-адрес ПЛК на вкладке основных настроек.
Порт является стандартным и обычно не требует настройки.
Значение опроса указывается в мсек и указывает на циклический запрос значений.

Выбираемые переменные вводятся на вкладке «Устройства». Просто добавьте новую с помощью знака «+» и затем назначьте произвольно выбираемое имя. Назовите каждую переменную индивидуально, а не сразу.
В области «Переменная» введите переменную, которую нужно выбрать для входных или выходных переменных CB0: 00, CB0: 01, CB100: 00 и т. Д. Всегда используйте двоеточия для их разделения. W31: 00 и т. Д. Также работает для флагов. Значения D1 и т. Д. также можно получить.
На вкладке «Тип» выберите тип переменной, хранящейся в ПЛК.

## Changelog
<!--
 Placeholder for the next version (at the beginning of the line):
 ### __WORK IN PROGRESS__ ( - falls nicht benötigt löschen sonst klammern entfernen und nach dem - dein text schreiben )
-->
### 0.0.2 (2021-03-05)
* (Thebam) Änderungen im Abrufen Verbesserung des Intervall

### 0.0.1 (2021-02-22)
* (Thebam) Update Abhängigkeiten 

### 0.0.1-7 (2021-02-08)
* (Thebam) NPM Aktualisiert

### 0.0.1-6 (2021-02-07)
* (Thebam) Änderungen für Repro eingetragen

### 0.0.1-5 (2021-01-01)
* (Thebam) io-package angepasst

### 0.0.1-4 (2021-01-01)
* (Thebam) package json angepasst

### 0.0.1-3 (2021-01-01)
* (Thebam) adater checker anpassung

### 0.0.1-2 (2021-01-01)
* (Thebam) native objekt ip geändert


### 0.0.1-1 (2021-01-01)
* (Thebam) add GitHub Action

### 0.0.1
* (Thebam) initial release
Erste version zum Abholen und schreiben der variablen

## License
MIT License

Copyright (c) 2021 thebam 

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