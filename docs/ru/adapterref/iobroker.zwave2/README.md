---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zwave2/README.md
title: ioBroker.zwave2
hash: 2uuGJ31fJ0ME2V3pOopBkWGfYyiOBQ5GSYngapKRVYo=
---
![Логотип](../../../en/adapterref/iobroker.zwave2/admin/zwave2.svg)

![узел](https://img.shields.io/node/v/iobroker.zwave2.svg)
![npm](https://img.shields.io/npm/v/iobroker.zwave2.svg)
![журнал изменений](https://img.shields.io/badge/read-Changelog-informational)
![Количество установок](http://iobroker.live/badges/zwave2-stable.svg)
![Уровень языка: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/AlCalzone/ioBroker.zwave2.svg?logo=lgtm&logoWidth=18)

# IoBroker.zwave2
![Тестирование и выпуск](https://github.com/AlCalzone/iobroker.zwave2/workflows/Test%20and%20Release/badge.svg)

<h2 align="center">Z-Wave для ioBroker. Но лучше.</h3>

Z-Wave 2 - это новая реализация Z-Wave для ioBroker. Он основан на [`zwave-js`](https://github.com/AlCalzone/node-zwave-js), который был написан с нуля для вас.

За исключением [ʻioBroker.zwave`](https://github.com/ioBroker/ioBroker.zwave/), это не требует `OpenZWave`. Это означает, что установка и обновления выполняются быстро, и не требуется компиляция статических библиотек и другие сложные шаги.

Кроме того, некоторые устройства просто не работают с оригинальным адаптером, например рольставни Fibaro 3.

На протяжении всего процесса разработки учитывалась простота использования ioBroker. Например, некоторые устройства повторно используют параметры конфигурации для настройки множества различных вещей. В этом адаптере большинство из них разделено на отдельные состояния и не требует сложной математики:

| Параметры конфигурации в ioBroker.zwave2 | vs | Параметры конфигурации в ioBroker.zwave |
| ![] (docs / de / images / config-params.png) | vs | ! [](../../../en/adapterref/iobroker.zwave2/docs/de/images/config-params-legacy.png) |
| ! [] (документы / де / изображения / config-params.png) | vs | ! [] (документы / де / изображения / config-params-legacy.png) |

---

## Документация и использование
* [FAQ] (docs / en / FAQ.md)
* [Устранение неполадок] (docs / en / Troubleshooting.md) · [bei Problemen] (docs / de / bei-problemen.md)

---

## Changelog
[Older changes](CHANGELOG_OLD.md)
<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->

### 1.7.3 (2020-10-03)
* Fixed two crashes during the `Notification CC` interview

### 1.7.2 (2020-10-01)
* Added an option to improve the compatibility with legacy switches. If this option is enabled, `targetValue` (Binary and Multilevel Switch) will be overwritten with `currentValue` whenever `currentValue` is updated.
* When healing the network, the progress should now show up immediately
* Fixed two crash sources
* Several improvements to `Notification CC`
  * The interview now detects whether a node is push or pull
  * Push nodes now have their supporting values set to idle if no value is yet known
  * Pull nodes are now auto-refreshed every 6 hours and on wakeup
* Including secure devices now fails if the device takes too long to respond (as required by the specifications)

### 1.7.1 (2020-09-29)
* Added two options to increase the driver timeouts and/or send attempts. This should allow increasing the network stability at the cost of decreased responsiveness.
* Added support for `User Code CC V2`
* Fix: Nodes are no longer marked as dead or asleep if they acknowledge a message but don't respond to it

### 1.7.0 (2020-09-25)
* The `quality` parameter is now set for state updates when reading (potentially stale) values from the cache
* Changed the serialport setting field to use autocomplete instead of a dropdown, added a tip how to use serial-over-tcp connections
* The adapter will now attempt to restart if starting the driver fails
* Upgraded `zwave-js` to version 5.0.0. This includes many changes including the following:
  * The driver has been completely rewritten with state machines for a well-defined program flow and better testability. This should solve issues where communication may get stuck for unknown reasons.
  * All interview messages now automatically have a lower priority than most other messages, e.g. the ones created by user interaction. This should make the network feel much more responsive while an interview process is active.
  * Improved performance of reading from the Value DB
  * A node is no longer marked as dead or asleep if it fails to respond to a `Configuration CC::Get` request. This can happen if the parameter is not supported.
  * The interview for sensor-type CCs is now skipped if a timeout occurs waiting for a response. Previously the whole interview was aborted.
  * If a node that is known to be included securely does not respond to the `Security CC` interview, it is no longer assumed to be non-secure
  * If a node that is assumed to be included non-securely sends secure commands, it is now marked as secure and the interview will be restarted
  * Added a configuration file for `ABUS CFA3010`.
  * Added a configuration file for `Everspring AC301`
  * Removed parameter #5 from `Aeon Labs ZW130` because it doesn't seem to be supported in any firmware version
  * In addition to real serial ports, serial-over-tcp connections (e.g. by using `ser2net`) are now supported. Use these `ser2net` settings to host a serial port: `<external-port>:raw:0:<path-to-serial>:115200 8DATABITS NONE 1STOPBIT`
  * Fixed a crash that could occur when assembling a partial message while the driver is not ready yet.

### 1.6.3 (2020-09-04)
* Further performance optimization
* Improved compatibility with devices that send invalid `Multi Channel CC` commands

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