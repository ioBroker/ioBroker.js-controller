---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.deconz/README.md
title: 无题
hash: xzWGUNkAGKRFbpANSBfLaWc62lyPYV1ShIRT4L9XpV0=
---
![商标](../../../en/adapterref/iobroker.deconz/admin/deconz.png)

![安装数量](http://iobroker.live/badges/deconz-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.deconz.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.deconz.svg)
![NPM](https://nodei.co/npm/iobroker.deconz.png?downloads=true)

ioBroker deConz dresden-elektronik适配器

==============

英语--------------------连接到dresden-elektronik开发的deConz软件。该软件旨在成为通用的ZigBee网关解决方案，使用来自dresden-elektronik的硬件，ConBee USB棒和RaspBee作为Raspberry Pi的模块。

您必须先链接到deConz。

1. a）输入deConz的IP地址

    b）输入端口（如果已更改），标准为80。

2.输入并保存IP地址和端口后，单击“创建API密钥”按钮。现在，您可以输入deConz的凭据，或转到Phoscon APP并将ioBroker注册为第三方APP。

##链接
[德康](https://www.dresden-elektronik.de/funktechnik/products/software/pc/deconz/)[REST插件](https://github.com/dresden-elektronik/deconz-rest-plugin)[网关（硬件）](https://www.dresden-elektronik.de/funktechnik/solutions/wireless-light-control/gateways/)

＃＃ 注意
###不支持deConz的Beta版本
###必需的js-controller版本> 2.x.x
必需的node.js> = 10.x.x

## [赞助商](https://github.com/iobroker-community-adapters/ioBroker.deconz/blob/master/SPONSORS.MD)

## Changelog

### 1.3.9
* set default port to 80

### 1.3.8
* fix colorloopspeed is not working
* fix set xy has no effect 
* some small fixes

### 1.3.7
* stable re-release

### 1.3.6
* fix object definition dimup and dimdown

### 1.3.5
* disable node v8 tests
* fix createscene object definition
* prevent websocket to connect if port, api key or ip is missing
* catch errors on ackStateVal
* fix "Cannot read property 'id' of undefined" for controlId
* fix crash on scene actions with js-controller 3
* catch onStateChange stateObj is null
* fix level update when bri was set by other deConz instance

### 1.3.4
* fix message "State value to set is invalid"
* terminate websocket connection on error to make sure the session is closed
* check response is not undefined
* catch request errors and send to sentry
* prevent sending message with wrong value type

### 1.3.3
* fix catch response of setLightState is undefined
* fix ws.terminate at unload
* catch ip/port undefined at auto updates
* catch res is undefined at deleteApiKey

### 1.3.2
* transitiontime now in seconds instead 1/10 seconds
* fix colorspeed
* use new class style
* add sentry for error collection
* fix transition time if set to 0
* objects will be now deleted if the device is removed by adapter
* fix multiple websocket connections
* try to fix #120 reconnect after 60 seconds

### 1.3.1
* fix set dimspeed
* connect to Websocket in any case

### 1.3.0
* fix websocket connection if there are no upnp broadcast answer from deconz
* corrected duration role
* added level to lights and groups

### 1.2.6
* fix crash by executing commands without parameters

### 1.2.5
* code cleanup
* (Zefau) fixed duplicated subscription
* (Zefau) useless loop within getGroupAttributes()
* refactor logging
* refactor state change
* fix API Key Dialog
* Websocket reconnect after 60 Seconds if no message is received

### 1.2.4
* dynamicly add boolean states for button events
* added new object definitions
* (mobilutz) remove ip overwrite
* (njeisecke) add transitiontime for bri_inc (dim step)


### 1.2.3
* fix expire time for alive 
* add object for open zigbee network to add new devices without admin config
* removed input for opne network time
* fix device list in admin config

### 1.2.2
* adapter configuration handling rewritten
* fix lastupdated UTC to locale time

### 1.2.1
* convert lastupdated time to locale
* object creation refactored
* fix adapter config update
* add auto detect deConz
* include ssdp discovery to repo

### 1.2.0
* fix adapter crash when deConz is not reachable
* show connection state as adapter state
* add auto reconnect to deconz
* add new objects for thermostat support and others

### 1.1.3
* Changed default port to 80
* (mplogas) fixed config save 
* (mplogas) added config.delay to set up presence sensor cooldown

### 1.1.2
* fix button objects
*  changed buttonpressed from boolean to number

### 1.1.0
*  added objects for "tiltangle", "vibration", "vibrationstrength" and "orientation"
*  (asgothian) added object "buttonpressd"
*  some fixes


### 1.0.2
* fix set bri for groups


### 1.0.1
* small fixes


### 1.0.0
*  (thewhobox) skip helper groups
*  (thewhobox) added channels for lights, groups and sensors
*  (thewhobox) skip unusable sensors
*  (thewhobox/KristianHeider) turn light/groups on when changing brightness
*  (jey-cee) added object group for remotes
*  (jey-cee) stop overwrite objects on adapter start
*  (jey-cee) prepared for compact mode
*  (jey-cee) new possible to change offset (if the device accept it)
*  (jey-cee) new possible to change duration (if the device accept it)
*  (jey-cee) get API key with credentials


### 0.4.0
* (asgothian) Fix for hue change
* (halloamt)  Added support for dimming lights and groups
* (halloamt)  Added support for custom actions

### 0.3.1
* Fixing hue from range 0-65535 to 0-360


### 0.3.0
* Added scene support
*  Drop nodejs 4 support


### 0.2.5
* Fix/Change handling create objects during running Adapter

### 0.2.4
* Fix create objects during running adapter

### 0.2.3
* Create objects during runing adapter

### 0.2.2
*  Changed id naming
*  Use websocket messages instead polling afterwards

### 0.2.1
* (Jey-Cee) Added new elements to config
* (Jey-Cee) Changed som small things

### 0.2.0
* (Jey-Cee) next Try with Xiaomi Sensors
* (Jey-Cee) Added "pressure" sensor
* (Jey-Cee) Added create group to adapter config

### 0.1.7

* (Jey-Cee) add possibility to delete devices from deConz
* (Jey-Cee) fix issue on getAll... functions when there are is nothing

### 0.1.6

* (Jey-Cee) fix Xiaomi Sensors recognition

### 0.1.5

* (Jey-Cee) Try to fix Sensors

### 0.1.4

* (Jey-Cee) Added support for Admin v3
* (Jey-Cee) Create API Key without use of WebApp/Phoscon (only with deConz standard password)

### 0.1.3

* (Jey-Cee) Stop Spam in log
* (Jey-Cee) Added filter for name to id conversation

### 0.1.2

* (Jey-Cee) Added new datapoints for sensors (experimental)

### 0.1.1

* (Jey-Cee) Adapter complete rewritten

### 0.1.0

* (Jey-Cee) first release

## License
Apache-2.0

Copyright (c) 2017-2020 Jey Cee jey-cee@live.com