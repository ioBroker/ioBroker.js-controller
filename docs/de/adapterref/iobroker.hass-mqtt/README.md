---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hass-mqtt/README.md
title: kein Titel
hash: aK8092Wtl2WOpdEN09Y+RuK9P5yWSFPep6epXTBpfeA=
---
![Anzahl der Installationen](http://iobroker.live/badges/hass-mqtt-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.hass-mqtt.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hass-mqtt.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/smarthomefans/iobroker.hass-mqtt.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/smarthomefans/ioBroker.hass-mqtt/badge.svg)
![NPM](https://nodei.co/npm/iobroker.hass-mqtt.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/smarthomefans/ioBroker.hass-mqtt/master.svg)

<h1><img src="admin/hass-mqtt.png" width="64"/> ioBroker.hass-mqtt </h1>

## Hass-mqtt Adapter für ioBroker
Dieser Adapter kann Geräte erkennen, die dem mqtt-Erkennungsprotokoll folgen.

## Unterstützte homeassistente Domain
- Schalter
- Sensor

## Adapterkonfiguration
Sie müssen eine andere MQTT-Instanz erstellen, die mit diesem Adapter funktioniert. Diese MQTT-Instanz kann als Client oder Broker arbeiten.

- MQTT-Instanz-ID binden: Wählen Sie die erstellte MQTT-Instanz-ID aus.
- homeassistant Präfix

: Das im homeassistant MQTT-Protokoll definierte Präfix. Standardwert ist homeassitant.

## Mqtt Instanzkonfiguration
### Als Client verwenden
In dieser Situation arbeitet die mqtt-Instanz als mqtt-Client.
Sie müssen mqtt broker manuell installieren.

Konfiguration wie folgt ![](doc/img/en/client_connection.png) ![](../../../en/adapterref/iobroker.hass-mqtt/doc/img/en/client_mqtt.png)

### Als Broker verwenden
In dieser Situation fungiert die mqtt-Instanz als mqtt-Broker.
Stellen Sie sicher, dass Sie einen anderen mqtt-Broker gestoppt haben, der auf demselben Host auf demselben Port ausgeführt wird.

Konfiguration wie diese ![](doc/img/en/broker_connection.png) ![](../../../en/adapterref/iobroker.hass-mqtt/doc/img/en/broker_mqtt.png)

----

## Hass-MQTT 适配器
Homeassistant ist ein MQTT-System.

## 已 已 的 Hass Domain
- Schalter
- Sensor

## 适配器配置
此 此 适配器 另行 创建 MQTT 实例 实例 配合 MQTT 实例 实例 是 客户 客户 端 或者

- MQTT-ID: MQTT-ID
- homeassistant 前缀 ： homeassistant 的 的 MQTT 的 的 ， 默认 为 homeassitant。

## MQTT 的 的 配置
### 工作为客户端模式
如果 如果 内 已经 已经 MQTT 服务器 ， 可以 一个 mqtt 客户 客户 实力 并 并 绑定 到此 到此

配置 配置 如下 图 ![](../../../en/adapterref/iobroker.hass-mqtt/doc/img/zh-cn/client_connection.png) §§IIIII_1§

### 工作为服务器模式
Bei MQTT 创建 需要 在 当前 主机 的 当前 主机 MQTT 服务器。 被 的 的 的 的 的 的 占用 占用

配置 配置 如下 图 ![](../../../en/adapterref/iobroker.hass-mqtt/doc/img/zh-cn/broker_connection.png) §§IIIII_1§

## Changelog
### 0.0.5 (2019-05-18)
* update npm

### 0.0.4 (2019-05-18)
* select mqtt instance, not type it name

### 0.0.3
* (SchumyHao) Update admin page

### 0.0.2
* (SchumyHao) Add switch device support

### 0.0.1
* (SchumyHao) initial release

## License
MIT License

Copyright (c) 2019 SchumyHao

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