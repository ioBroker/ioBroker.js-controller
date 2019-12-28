---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mercury/README.md
title: ioBroker.mercury
hash: ikSSUb3TbTOnUW3NBRQWuJcu+dMe5mQdW8suNuSSWgo=
---
![логотип](../../../en/adapterref/iobroker.mercury/admin/mercury.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.mercury.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mercury.svg)
![Статус зависимости](https://img.shields.io/david/instalator/iobroker.mercury.svg)
![Известные уязвимости](https://snyk.io/test/github/instalator/ioBroker.mercury/badge.svg)
![NPM](https://nodei.co/npm/iobroker.mercury.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/instalator/ioBroker.mercury/master.svg)

# IoBroker.mercury
## Ртутный адаптер для ioBroker
Получение данных от электросчетчиков Меркурий.
Поддерживает TCP / IP и последовательные соединения.

Поддерживаются следующие счетчики электроэнергии:

* Меркурий-200
* Меркурий-201
* Меркурий-206
* Меркурий-203
* Меркурий-203.2ТД
* Меркурий-204
* Меркурий-208
* Меркурий-230
* Меркурий-231
* Меркурий-233
* Меркурий-234
* Меркурий-236
* Меркурий-238

## Объекты
** RAW ** - отправка команды RAW и получение ответа.
Команда без адреса и CRC, байты разделены пробелом. Пример: для 1 счетчика фазы - считывание энергии за текущий месяц

```
32 0F
```

Возвращает буфер в виде строки

```"{"type":"Buffer","data":[0,14,31,155,50,7,0,99,0,255,255,255,255,255,255,255,255,255,255,255,255,127,86]}"```

## Changelog

### 0.0.5
* (instalator) fixed error

### 0.0.4
* (instalator) added unit for state

### 0.0.3
* (instalator) added object send RAW command
* (instalator) refactor and fix error

### 0.0.2
* (instalator) added serial connect
* (instalator) fixed many error

### 0.0.1
* (instalator) initial release

## License
The MIT License (MIT)

Copyright (c) 2019 instalator <vvvalt@mail.ru>

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