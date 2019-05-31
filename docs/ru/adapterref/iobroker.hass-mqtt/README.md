---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hass-mqtt/README.md
title: без названия
hash: aK8092Wtl2WOpdEN09Y+RuK9P5yWSFPep6epXTBpfeA=
---
![Количество установок](http://iobroker.live/badges/hass-mqtt-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.hass-mqtt.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hass-mqtt.svg)
![Статус зависимости](https://img.shields.io/david/smarthomefans/iobroker.hass-mqtt.svg)
![Известные уязвимости](https://snyk.io/test/github/smarthomefans/ioBroker.hass-mqtt/badge.svg)
![NPM](https://nodei.co/npm/iobroker.hass-mqtt.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/smarthomefans/ioBroker.hass-mqtt/master.svg)

<h1><img src="admin/hass-mqtt.png" width="64"/> ioBroker.hass-MQTT </h1>

## Адаптер hass-mqtt для ioBroker
Этот адаптер может обнаруживать устройства в соответствии с протоколом hash mqtt Discover.

## Поддерживаемый домен Homeassistant
- переключатель
- датчик

## Настройка адаптера
Вам нужно создать еще один экземпляр MQTT, работающий с этим адаптером. Этот экземпляр MQTT может работать как Клиент или Брокер.

- привязать идентификатор экземпляра mqtt: выбрать идентификатор созданного экземпляра MQTT.
- префикс homeassistant

: Префикс, определенный в homeassistant MQTT протоколе, значение по умолчанию является homeassitant.

## Настройка экземпляра mqtt
### Использовать как клиент
В этой ситуации экземпляр mqtt работает как клиент mqtt.
Вам необходимо установить mqtt брокер вручную.

Конфигурация, подобная этой: ![](doc/img/en/client_connection.png) ![](../../../en/adapterref/iobroker.hass-mqtt/doc/img/en/client_mqtt.png)

### Использовать как брокер
В этой ситуации экземпляр mqtt работает как брокер mqtt.
Убедитесь, что вы остановили другой брокер mqtt, работающий на том же хосте на том же порту.

Конфигурация, как это ![](doc/img/en/broker_connection.png) ![](../../../en/adapterref/iobroker.hass-mqtt/doc/img/en/broker_mqtt.png)

----

## Hass-MQTT 适配器
此 适配器 可以 发现 并 接入 局域网 内 符合 Homeassistant 规定 的 MQTT 协议 规范 的 设备.

## 已 支持 的 Hass домен
- переключатель
- датчик

## 适配器配置
此 适配器 需要 另行 创建 一个 MQTT 实例 配合 使用 .MQTT 实例 可以 是 客户 端 或者 服务器 模式.

- 绑定 MQTT 实例 ID ： 选择 另行 创建 的 MQTT 实例 ID
- homeassistant 前缀 ： homeassistant 规定 的 MQTT 协议 的 前缀 ， 默认 为 homeassitant。

## MQTT 实例 的 配置
### 工作为客户端模式
如果 局域网 内 已经 有 MQTT 服务器, 可以 创建 一个 MQTT 客户 端 实力 并 绑定 到此 适配器.

图 方式 如下 图 ![](doc/img/zh-cn/client_connection.png) ![](../../../en/adapterref/iobroker.hass-mqtt/doc/img/zh-cn/client_mqtt.png)

### 工作为服务器模式
MQTT 内。 需要 注意 的 MQTT 端口 不可以 被 当前 当前 主机 的 程序 占用。。

图 方式 如下 图 ![](doc/img/zh-cn/broker_connection.png) ![](../../../en/adapterref/iobroker.hass-mqtt/doc/img/zh-cn/broker_mqtt.png)

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