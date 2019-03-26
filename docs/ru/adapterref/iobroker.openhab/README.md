---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.openhab/README.md
title: Перемещено на https://github.com/iobroker-community-adapters/ioBroker.openhab
hash: 4ZdWn3iLr1RFw/oEu2l/uV8zXKJDY0DUGjmY+Mg2noo=
---
# Перемещено на https://github.com/iobroker-community-adapters/ioBroker.openhab
![логотип](../../../en/adapterref/iobroker.openhab/admin/openhab.png)

![Количество установок](http://iobroker.live/badges/openhab-stable.svg)

# IoBroker.openhab =================
Этот адаптер соединяет ioBroker с [openhab](http://openhab.org/).

Он экспортирует устройства и группы из openhab, а затем отслеживает обновления переменных.

## Сделать
- Новые устройства обнаруживают синонимы без перезагрузки адаптера?
- На данный момент только элементы просмотра / переключаемые, также могут быть прочитаны "вещи"
- Элементы, удаленные из OpenHab, не исчезают в ioBroker

## Changelog
### 1.1.0 (2019.02.12)
* (Schluesselmeister) Add first support for new OH type definition

### 1.0.0 (2018.12.29)
* (Schluesselmeister) New type quantity was added

### 0.3.0 (2018.08.12)
* (Schluesselmeister) Many fixes
* (bluefox) Admin3

### 0.2.1 (2017.11.30)
* (bluefox) Fix decimal types

### 0.2.0 (2017.10.14)
* (bluefox) Fix small error by the connection closing

### 0.1.5 (2017.08.15)
* (bluefox) changed the value types for openHAB

### 0.1.4 (2017.07.16)
* (bluefox) allow control of dimmer

### 0.1.3 (2017.05.22)
* (bluefox) change settings

### 0.1.0 (2017.05.09)
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright (c) 2017-2018 bluefox <dogafox@gmail.com>

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