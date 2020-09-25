---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zwave2/README.md
title: ioBroker.zwave2
hash: 76AaZKaIGzIjbBAgaRyCEbClKkElMkOe7YyuXCZS9mI=
---
![Logo](../../../en/adapterref/iobroker.zwave2/admin/zwave2.svg)

![Knoten](https://img.shields.io/node/v/iobroker.zwave2.svg)
![npm](https://img.shields.io/npm/v/iobroker.zwave2.svg)
![Änderungsprotokoll](https://img.shields.io/badge/read-Changelog-informational)
![Anzahl der Installationen](http://iobroker.live/badges/zwave2-stable.svg)
![Sprachklasse: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/AlCalzone/ioBroker.zwave2.svg?logo=lgtm&logoWidth=18)

# IoBroker.zwave2
![Testen und freigeben](https://github.com/AlCalzone/iobroker.zwave2/workflows/Test%20and%20Release/badge.svg)

<h2 align="center">Z-Wave für ioBroker. Aber besser.</h3>

Z-Wave 2 ist eine brandneue Z-Wave-Implementierung für ioBroker. Es basiert auf [`zwave-js`](https://github.com/AlCalzone/node-zwave-js), die von Grund auf zu Ihrem Vorteil geschrieben wurden.

Sofern nicht [`ioBroker.zwave`](https://github.com/ioBroker/ioBroker.zwave/), sind keine `OpenZWave` erforderlich. Dies bedeutet, dass die Installation und Aktualisierungen schnell sind und keine Kompilierung statischer Bibliotheken und anderer komplizierter Schritte erforderlich ist.

Darüber hinaus funktionieren einige Geräte im Originaladapter einfach nicht, z. der Fibaro Rollladen 3.

Die einfache Verwendung in ioBroker wurde während der gesamten Entwicklung berücksichtigt. Beispielsweise verwenden einige Geräte Konfigurationsparameter erneut, um viele verschiedene Dinge zu konfigurieren. In diesem Adapter sind die meisten von ihnen in separate Zustände unterteilt, und es ist keine komplizierte Mathematik erforderlich:

| Konfigurationsparameter in ioBroker.zwave2 | vs | Konfigurationsparameter in ioBroker.zwave |
| ![] (docs / de / images / config-params.png) | vs | ! [](../../../en/adapterref/iobroker.zwave2/docs/de/images/config-params-legacy.png) |
| ! [] (docs / de / images / config-params.png) | vs | ! [] (docs / de / images / config-params-legacy.png) |

---

## Dokumentation und Verwendung
* [FAQ] (docs / de / FAQ.md)

---

## Changelog
[Older changes](CHANGELOG_OLD.md)
<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->

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

### 1.6.2 (2020-09-04)
* Reduced CPU load in large networks

### 1.6.1 (2020-09-01)
* Fixed interview issues with devices that claim they support `Basic CC`, but don't respond

### 1.6.0 (2020-08-29)
* Added the possibility to send `Multilevel Sensor Report`s from scripts
* Dependency updates for bug and security fixes

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