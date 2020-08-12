---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.devices/README.md
title: ioBroker.devices
hash: BwI4wZaBzqbt1aZcKszEcHW3vHdbJgcceFvET+mdYKY=
---
![логотип](../../../en/adapterref/iobroker.devices/admin/devices.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.devices.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.devices.svg)
![Статус зависимости](https://img.shields.io/david/ioBroker/iobroker.devices.svg)
![Известные уязвимости](https://snyk.io/test/github/ioBroker/ioBroker.devices/badge.svg)
![NPM](https://nodei.co/npm/iobroker.devices.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/ioBroker/ioBroker.devices/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/ioBroker/ioBroker.devices?branch=master&svg=true)

# IoBroker.devices
## Адаптер устройств для ioBroker
Управляйте и создавайте устройства для использования в других адаптерах, таких как материал, iot, ...

** Важно: включить вкладку в админке, например, журнал и скрипты **

![экран](../../../en/adapterref/iobroker.devices/img/screen.png)

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. **

## Делать
- клонировать существующее устройство в связанные устройства / псевдоним / javascript
- добавить иконки для всех состояний каналов
- добавить описания состояний
- показать ошибки для google / alisa / alexa
- определить, установлен ли js-controller 2.0

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

## Changelog
### 0.3.8 (2020-08-12)
* (bluefox) added the air conditioner

### 0.3.6 (2020-04-17)
* (Apollon77) Added Sentry error reporting for Frontend/React

### 0.3.5 (2020-04-17)
* (Apollon77) Fixed typo

### 0.3.4 (2020-03-24)
* (bluefox) Fixed error by device creation

### 0.3.2 (2020-02-09)
* (Apollon77) usage with all kinds of admin ports and reverse proxies optimized

### 0.3.1 (2020-02-09)
* (Apollon77) compatibility with Admin >4.0.0 added

### 0.2.0 (2019-12-20)
* (bluefox) Backend was removed

### 0.1.8 (2019-11-13)
* (bluefox) Allowed the clone of devices

### 0.1.7 (2019-09-15)
* (bluefox) work in progress

### 0.1.2 (2019-09-04)
* (bluefox) work in progress

### 0.1.0 (2019-08-31)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019-2020 bluefox <dogafox@gmail.com>

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