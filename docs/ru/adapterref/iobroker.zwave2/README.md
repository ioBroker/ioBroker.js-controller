---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zwave2/README.md
title: ioBroker.zwave2
hash: ScxiaH6V105foLuihyc7QRNT1MgDNTXgZGY3R/bL/MA=
---
![логотип](../../../en/adapterref/iobroker.zwave2/admin/zwave2.svg)

![узел](https://img.shields.io/node/v/iobroker.zwave2.svg)
![НПМ](https://img.shields.io/npm/v/iobroker.zwave2.svg)
![изменения](https://img.shields.io/badge/read-Changelog-informational)
![Количество установок](http://iobroker.live/badges/zwave2-stable.svg)
![Оценка языка: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/AlCalzone/ioBroker.zwave2.svg?logo=lgtm&logoWidth=18)

# IoBroker.zwave2
![Тест и выпуск](https://github.com/AlCalzone/iobroker.zwave2/workflows/Test%20and%20Release/badge.svg)

<h2 align="center"> Z-Wave для ioBroker. Но лучше. </h3>

Z-Wave 2 - это новая реализация Z-Wave для ioBroker. Он основан на [`ZWave-js`](https://github.com/AlCalzone/node-zwave-js), который был написан с нуля для вашей выгоды.

Если только [`ioBroker.zwave`](https://github.com/ioBroker/ioBroker.zwave/) не требуется `OpenZWave`. Это означает, что установка и обновления выполняются быстро, и нет необходимости в компиляции статических библиотек и других сложных этапов.

Кроме того, некоторые устройства просто не работают в оригинальном адаптере, например Роллеты Фибаро 3.

Простое использование в ioBroker учитывалось на протяжении всей разработки. Например, некоторые устройства повторно используют параметры конфигурации для настройки множества разных вещей. В этом адаптере большинство из них разделены на отдельные состояния, и никакой сложной математики не требуется:

| Config params в ioBroker.zwave2 | против | Config params в ioBroker.zwave |
| ![] (docs / de / images / config-params.png) | против | ! [](../../../en/adapterref/iobroker.zwave2/docs/de/images/config-params-legacy.png) |
| ! [] (docs / de / images / config-params.png) | против | ! [] (docs / de / images / config-params-legacy.png) |

## Changelog
[Older changes](CHANGELOG_OLD.md)
<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->

### 1.0.0 (2020-06-04)
* Changed the compatibility config queries for Danfoss thermostats, so queued setpoint changes are not overwritten

### 0.14.9 (2020-06-03)
* Placeholder object names (e.g. `Node 003`) for non-reachable nodes are now overwritten with the correct name when the nodes are interviewed.

### 0.14.8 (2020-06-03)
* Fixed an issue where secure sleeping nodes could block all communication with other nodes

### 0.14.7 (2020-06-03)
* Fixed an issue where interviews could get stuck for sleeping nodes
* Fixed a crash that happened when decoding a secure message with an unsupported payload

### 0.14.6 (2020-06-02)
* Added support for `Protection CC`
* Fixed several bugs in `Security CC`
* Updates from a node that span multiple messages are now correctly decoded
* During the startup, device objects are created for asleep and dead nodes. This allows removing failed devices from the network even after the cache was cleared.

## License

MIT License

Copyright (c) 2019-2020 AlCalzone

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