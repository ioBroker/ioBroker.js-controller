---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zwave2/README.md
title: ioBroker.zwave2
hash: ScxiaH6V105foLuihyc7QRNT1MgDNTXgZGY3R/bL/MA=
---
![Logo](../../../en/adapterref/iobroker.zwave2/admin/zwave2.svg)

![Knoten](https://img.shields.io/node/v/iobroker.zwave2.svg)
![npm](https://img.shields.io/npm/v/iobroker.zwave2.svg)
![Änderungsprotokoll](https://img.shields.io/badge/read-Changelog-informational)
![Anzahl der Installationen](http://iobroker.live/badges/zwave2-stable.svg)
![Sprachklasse: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/AlCalzone/ioBroker.zwave2.svg?logo=lgtm&logoWidth=18)

# IoBroker.zwave2
![Testen und freigeben](https://github.com/AlCalzone/iobroker.zwave2/workflows/Test%20and%20Release/badge.svg)

<h2 align="center"> Z-Wave für ioBroker. Aber besser. </h3>

Z-Wave 2 ist eine brandneue Z-Wave-Implementierung für ioBroker. Es basiert auf [`zwave-js`](https://github.com/AlCalzone/node-zwave-js), die von Grund auf zu Ihrem Vorteil geschrieben wurden.

Sofern nicht [`ioBroker.zwave`](https://github.com/ioBroker/ioBroker.zwave/), sind keine `OpenZWave` erforderlich. Dies bedeutet, dass die Installation und Aktualisierungen schnell sind und keine Kompilierung statischer Bibliotheken und anderer komplizierter Schritte erforderlich ist.

Darüber hinaus funktionieren einige Geräte im Originaladapter einfach nicht, z. der Fibaro Rollladen 3.

Die einfache Verwendung in ioBroker wurde während der gesamten Entwicklung berücksichtigt. Beispielsweise verwenden einige Geräte Konfigurationsparameter erneut, um viele verschiedene Dinge zu konfigurieren. In diesem Adapter sind die meisten von ihnen in separate Zustände unterteilt, und es ist keine komplizierte Mathematik erforderlich:

| Konfigurationsparameter in ioBroker.zwave2 | vs | Konfigurationsparameter in ioBroker.zwave |
| ![] (docs / de / images / config-params.png) | vs | ! [](../../../en/adapterref/iobroker.zwave2/docs/de/images/config-params-legacy.png) |
| ! [] (docs / de / images / config-params.png) | vs | ! [] (docs / de / images / config-params-Legacy.png) |

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