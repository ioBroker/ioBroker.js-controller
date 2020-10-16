---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.philips-air/README.md
title: ioBroker.philips-air
hash: zYfc3wAURPeQ5XU+DF2XdcWICEq5gT8ZMhvZO62Px8A=
---
![Логотип](../../../en/adapterref/iobroker.philips-air/admin/philips-air.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.philips-air.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.philips-air.svg)
![Количество установок (последнее)](http://iobroker.live/badges/philips-air-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/philips-air-stable.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.philips-air.svg)
![Известные уязвимости](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.philips-air/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.philips-air.png?downloads=true)

# IoBroker.philips-air
## Адаптер очистителя воздуха Philips для ioBroker
Соединяет очиститель воздуха Philips с ioBroker.
** Протестировано только с AC2729 **, но должно работать с новым очистителем, который обменивается данными через COAP с шифрованием.
![AC2729](../../../en/adapterref/iobroker.philips-air/img/device.png)

[Ссылка на веб-сайт Philips](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

## Применение
Требуется только IP-адрес устройства. Найдите его в своем роутере (например, `MiCO`).
Может случиться так, что у некоторых устройств есть не все переменные, и они останутся незаполненными в дереве объектов.

![Объекты](../../../en/adapterref/iobroker.philips-air/img/objects.png)

## Changelog

### 0.1.1 (2020-10-14)
* (ioBroker) initial release

## License
MIT License

Copyright (c) 2020 ioBroker <dogafox@gmail.com>

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