---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hass-mqtt/README.md
title: 无题
hash: aK8092Wtl2WOpdEN09Y+RuK9P5yWSFPep6epXTBpfeA=
---
![安装数量](http://iobroker.live/badges/hass-mqtt-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.hass-mqtt.svg)
![下载](https://img.shields.io/npm/dm/iobroker.hass-mqtt.svg)
![依赖状态](https://img.shields.io/david/smarthomefans/iobroker.hass-mqtt.svg)
![已知的漏洞](https://snyk.io/test/github/smarthomefans/ioBroker.hass-mqtt/badge.svg)
![NPM](https://nodei.co/npm/iobroker.hass-mqtt.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/smarthomefans/ioBroker.hass-mqtt/master.svg)

<h1><img src="admin/hass-mqtt.png" width="64"/> ioBroker.hass-MQTT </h1>

适用于ioBroker的## hass-mqtt适配器
该适配器可以发现遵循hass mqtt discover协议的设备。

##支持Homeassistant域
 - 开关
 - 传感器

##适配器配置
您需要创建另一个MQTT实例与此适配器一起使用。此MQTT实例可以作为客户端或代理。

 -  bind mqtt instance ID：选择创建的MQTT实例ID。
 -  homeassistant前缀

：homeassistant MQTT协议中定义的前缀，默认值为homeassitant。

## Mqtt实例配置
###用作客户端
在这种情况下，mqtt实例作为mqtt客户端工作。
您需要手动安装mqtt broker。

像这样的配置![](doc/img/en/client_connection.png)![](../../../en/adapterref/iobroker.hass-mqtt/doc/img/en/client_mqtt.png)

###用作经纪人
在这种情况下，mqtt实例作为mqtt代理工作。
确保已停止在同一端口上的同一主机上运行的其他mqtt代理。

这样的配置![](doc/img/en/broker_connection.png)![](../../../en/adapterref/iobroker.hass-mqtt/doc/img/en/broker_mqtt.png)

----

## Hass-MQTT适配器
此适配器可以发现并接入局域网内符合Homeassistant规定的MQTT协议规范的设备。

##已支持的Hass域名
 - 开关
 - 传感器

## 适配器配置
此适配器需要另行创建一个MQTT实例配合使用.MQTT实例可以是客户端或者服务器模式。

 - 绑定MQTT实例ID：选择另行创建的MQTT实例ID
 -  homeassistant前缀：homeassistant规定的MQTT协议的前缀，默认为homeassitant。

## MQTT实例的配置
### 工作为客户端模式
如果局域网内已经有MQTT服务器，可以创建一个MQTT客户端实力并绑定到此适配器。

配置方式如下图![](doc/img/zh-cn/client_connection.png)![](../../../en/adapterref/iobroker.hass-mqtt/doc/img/zh-cn/client_mqtt.png)

### 工作为服务器模式
如果局域网内没有MQTT服务器，需要在当前主机上创建MQTT服务器。需要注意配置的MQTT端口不可以被当前主机上的其他程序占用。

配置方式如下图![](doc/img/zh-cn/broker_connection.png)![](../../../en/adapterref/iobroker.hass-mqtt/doc/img/zh-cn/broker_mqtt.png)

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