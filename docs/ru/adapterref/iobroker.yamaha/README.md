---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.yamaha/README.md
title: без названия
hash: lXGOOhOdLLITEXW7oIwVl9BUiIyU7vTFrTiTPlvTwIc=
---
![логотип](../../../en/adapterref/iobroker.yamaha/admin/yamaha.png)

![Количество установок](http://iobroker.live/badges/yamaha-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.yamaha.svg)
![тесты](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.yamaha/master.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

## IoBroker.yamaha
#### Описание
Адаптер для ресиверов Yamaha AV

### Первоначальное создание
Этот адаптер изначально был создан @soef по адресу https://github.com/soef/ioBroker.yamaha, но больше не поддерживается, поэтому мы переместили его в iobroker-community, чтобы можно было исправлять ошибки. спасибо @soef за его работу.

#### Конфигурация
В настоящее время без автообнаружения необходимо ввести IP-адрес получателя.

#### Установка
через админ ioBroker.

В противном случае выполните следующую команду в корневом каталоге iobroker (например, в / opt / iobroker) `` npm install iobroker.yamaha iobroker upload yamaha ``

#### В реальном времени
Государства будут созданы, когда они появятся. То есть используйте свой пульт дистанционного управления и измените что-нибудь, и вы увидите новые состояния.
Устройства yamaha принимают только одно соединение.

#### Требования
Yamaha Reciver

Вы должны включить функцию «ожидания сети» в конфигурации вашего приемника

## Changelog
### 0.3.21
* (Garfonso) added admin 3 compatibility and more meta-data stuff.
* (Garfonso) added compact mode support.
### 0.3.20
* (Garfonso) adjusted local copy of soef.js to js-controller 3.0
* (Garfonso) updated meta information (links etc) to iobroker-community-adapters
### 0.3.19
* (soef) Changelog added to readme
### 0.3.18
* (Apollon77) Update utils.js and usage, CI Testing and deps
### 0.3.17
* (Apollon77) update basic package-file testing
### 0.3.16
* (soef) node 0.12 removed from testing
### 0.3.15
* (soef) Enhance CI testing
### 0.3.14
* (soef) Possible exception in reconnect fixed
### 0.3.12
* (soef) Version incr. for npm
### 0.3.11
* (soef) reconnect overworked
### 0.3.10
* (soef) realtime Ping now configurable
### 0.3.8
* (soef) realtime states optimized
### 0.3.7
* (soef) fix typo in creating realtime states
### 0.3.6
* (soef) timeout to connect reduced

<!--

## License
The MIT License (MIT)

Copyright (c) 2015-2020 soef <soef@gmx.net>

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
-->