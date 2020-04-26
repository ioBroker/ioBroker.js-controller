---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.benq/README.md
title: ioBroker BenQ Адаптер для проектора
hash: QzbcM7ReY+xfy43lUEdZL+32mh9ElJ1JfucZtF8bG+Q=
---
![логотип](../../../en/adapterref/iobroker.benq/admin/benq-logo.png)

![Количество установок](http://iobroker.live/badges/benq-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.benq.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.benq.svg)
![тесты](http://img.shields.io/travis/instalator/ioBroker.benq/master.svg)
![NPM](https://nodei.co/npm/iobroker.benq.png?downloads=true)
![жертвовать](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker BenQ Адаптер для проектора
Адаптер ioBroker BenQ Projector используется для управления проектором BenQ через RS232 в сочетании с Etnernet Gateway.
Список моделей и команд содержится в файле `admin/commands.json`.

## Аппаратное обеспечение
Драйвер позволяет подключаться к проекторам BenQ через [адаптер](http://blog.instalator.ru/archives/744) RS232 для Ethernet.

В качестве шлюза RS232 для Ethernet используется любая карта, совместимая с Arduino, в которую необходимо загрузить [этот код](https://github.com/stepansnigirev/ArduinoSerialToEthernet).
Вам также понадобится Ethernet Shield W5100 или W5500 и конвертер RS232 в TTL.

## Служба поддержки
Поддерживаемые модели: W1200, W1070, W1080, чтобы быть ...

## Changelog

### 0.0.6
  (instalator) initial

## License
The MIT License (MIT)

Copyright (c) 2020 instalator <vvvalt@mail.ru>

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