---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.benq/README.md
title: ioBroker BenQ Адаптер для проектора
hash: YfmCWWyypsOuFfAS5vkeXbUOvtycDdAEiBM8nkinyGM=
---
![Логотип](../../../en/adapterref/iobroker.benq/admin/benq-logo.png)

![Количество установок](http://iobroker.live/badges/benq-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.benq.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.benq.svg)
![NPM](https://nodei.co/npm/iobroker.benq.png?downloads=true)
![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker BenQ Адаптер для проектора
[![Тесты] (https://github.com/instalator/iobroker.benq/workflows/Test%20and%20Release/badge.svg)](https://github.com/instalator/ioBroker.benq/actions/)

Адаптер ioBroker BenQ для проектора используется для управления проектором BenQ через RS232 вместе со шлюзом Etnernet.
Список моделей и команд содержится в файле `admin/commands.json`.

## Аппаратное обеспечение
Драйвер позволяет подключаться к проекторам BenQ через [адаптер](http://blog.instalator.ru/archives/744) RS232 к Ethernet.

В качестве шлюза RS232 к Ethernet используется любая совместимая с Arduino карта, на которую необходимо загрузить [этот код](https://github.com/stepansnigirev/ArduinoSerialToEthernet).
Вам также понадобится Ethernet Shield W5100 или W5500 и преобразователь RS232 в TTL.

## Поддерживать
Поддерживаемые модели: W1200, W1070, W1080 будет ...

## Changelog

### 0.2.3
 * (instalator) change test

### 0.2.2
 * (instalator) fixed clearTimeout

### 0.2.1
 * (instalator) support compact mode
 * (instalator) support admin3
 * (instalator) refactoring

### 0.0.6
  (instalator) initial

## License
The MIT License (MIT)

Copyright (c) 2021 instalator <vvvalt@mail.ru>

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