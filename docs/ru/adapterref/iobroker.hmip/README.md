---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hmip/README.md
title: ioBroker HomeMatic IP Облако Адаптер AccessPoint
hash: Dxtpe5ZPSR50pjpG+9oL1un7Rsj17nSyt7OrYX4URpA=
---
![логотип](../../../en/adapterref/iobroker.hmip/admin/homematic.png)

![Количество установок](http://iobroker.live/badges/hmip-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.hmip.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hmip.svg)
![Статус сборки](https://travis-ci.org/iobroker-community-adapters/ioBroker.hmip.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.hmip.png?downloads=true)

# IoBroker HomeMatic IP Cloud Access Adapter =================
## Описание
Этот адаптер позволяет обмениваться данными с HomematicIP CloudAccessPoint через API отдыха Homematic IP Cloud.

## Монтаж
Этому адаптеру нужны node-js в версии> = 8.6

## Информация
Большинство IP-устройств Homematic уже работают с последней версией адаптера.

Я буду постоянно его улучшать, но это займет время. Любая помощь от сообщества, например, Запрос на тягу будет высоко оценен.

Для не работающих устройств HmIP, пожалуйста, создайте проблему с этой информацией (пожалуйста, по одному на устройство и, если возможно, техническое имя в теме).
Переключите регистрацию адаптера в ioBroker в глупый режим и добавьте json устройства, которое напечатано в журнал в выпуске.
Мне также может понадобиться json изменения состояния.

Спасибо

## Важная информация, что можно сделать с помощью этого адаптера
!!! С помощью этого адаптера вы можете инициировать события, которые могут запускаться только через исходное приложение Homematic IP.
Например, прямые соединения между устройствами не имеют событий в приложении и также не могут быть инициированы через этот адаптер !!!

## Настройки
* введите свой SGTIN (задняя часть точки доступа) и PIN-код (если задан ранее) и подтвердите данные нажатием синей светодиодной кнопки. Это создаст токен аутентификации.

## Спасибо
CoreGreenberet для его библиотеки Python (https://github.com/coreGreenberet/homematicip-rest-api)

## Дискуссия в форуме ioBroker
https://forum.iobroker.net/viewtopic.php?f=36&t=21000#p220517

## Запрос адаптера на GitHub
https://github.com/ioBroker/AdapterRequests/issues/62

## Changelog

### 0.0.10
* (jogibear9988) added ping/pong, enable setBoots, more units, more hardware

### 0.0.9
* (jogibear9988) fullrx and operationlock channel

### 0.0.8
* (jogibear9988) fixes a few devices

### 0.0.7
* (jogibear9988) fixes wrong state handling

### 0.0.6
* (jogibear9988) fixes for more devices, alarm handling

### 0.0.5
* (jogibear9988) more devices and big refactoring (switched from DeviceType to FunctionalChannelType)

### 0.0.4
* (jogibear9988) more devices, bugfixes. thanks to TobiasF1986, steckenpferd and Ma-ster77

### 0.0.3
* (jogibear9988) bugfixes and more devices 

### 0.0.2
* (jogibear9988) bugfixes, more devices and initial support of groups

### 0.0.1
* (jogibear9988) initial release

## License
The MIT License (MIT)

Copyright (c) 2018 @@Author@@ <@@email@@>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.