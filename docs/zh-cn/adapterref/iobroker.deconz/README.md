---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.deconz/README.md
title: 无题
hash: xsfX6P9SJKjs8MpPi1ErX29qGJF07F47JRIY5fLs9UA=
---
![商标](../../../en/adapterref/iobroker.deconz/admin/deconz.png)

![安装数量](http://iobroker.live/badges/deconz-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.deconz.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.deconz.svg)
![NPM](https://nodei.co/npm/iobroker.deconz.png?downloads=true)

ioBroker deConz dresden-elektronik适配器

==============

＃＃ 注意
不支持deConz的Beta /预发行版本。

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

所需的js-controller版本> 2.x.x，所需的node.js> = 10.x.x

＃＃ 英语
连接到由dresden-elektronik开发的deConz软件。该软件旨在成为通用的ZigBee网关解决方案，使用来自dresden-elektronik的硬件，ConBee USB棒和RaspBee作为Raspberry Pi的模块。

＃＃＃ 建立
1.阅读deConz / Phoscon的文档，请参阅[links]（https://github.com/iobroker-community-adapters/ioBroker.deconz#links）部分。
2.启动适配器
3. *输入用于deConz的IP地址
    *输入端口号，标准为80。
    * IP和端口将自动保存
    * **替代：**关闭配置，然后再次打开。

    如果找到deConz，则显示IP和端口。

4.单击“创建API密钥”
5. *输入用户名（标准是喜悦）
    *输入密码（在首次登录Phoscon APP时设置）
    * **替代方法：**打开Phoscon APP->菜单->设置->网关->高级->解锁网关

####同时发送多个命令
为此，存在一个称为“动作”的对象。

例子：

`"on": true, "xy": [0.6586,0.3138]`

`"on": true, "transitiontime": 5, "hue": 65500`

##德语
Verbindet mit der von Dresden-elektronik Entwickelten deConz软件。 Diese Software独家介绍了ZigBeeGateway-Lösung网关，硬件von Dresden-elektronik，ConBee USB-Stick和RaspBee，eModulfürden Raspberry Pi，verwendet。

### Einrichten
1. Dokumentation von deConz / Phoscon lesen，Quellen siehe [链接]（https://github.com/iobroker-community-adapters/ioBroker.deconz#links）。
2.适配器启动
3. * IP地址
    * Eingeben端口，标准端口80
    * IP和端口无线自动更新
    * **替代：**适用于架构和功能。

    Wurde deConz gefunden总部位于der Maske的IP und Port schon。

4.“ Erstelle API密钥” Klicken
5. * Buntzername（标准IST喜悦）和
    * Passwort（在Phoscon APP vergeben中的无线beim ersten Anmelden）
     * **替代：** Phoscon应用程序->菜单-> Einstellungen->网关-> Erweitert-> Auf“ App verbinden” klicken

#### Mehr als einen Befehl senden
Dafürgibt es das Objekt“行动”。

贝斯比勒：

`"on": true, "xy": [0.6586,0.3138]`

`"on": true, "transitiontime": 5, "hue": 65500`

##链接
-[Phoscon APP]（https://phoscon.de/）
-[支持的设备]（https://github.com/dresden-elektronik/deconz-rest-plugin/wiki/Supported-Devices）
-[deConz]（https://www.dresden-elektronik.de/funktechnik/products/software/pc/deconz/）
-[Github上的REST插件]（https://github.com/dresden-elektronik/deconz-rest-plugin）
-[网关（硬件）]（https://www.dresden-elektronik.de/funktechnik/solutions/wireless-light-control/gateways/）

## [赞助商](https://github.com/iobroker-community-adapters/ioBroker.deconz/blob/master/SPONSORS.MD)
如果您喜欢我的作品，请随时提供个人捐款（这是Jey Cee的个人捐款链接，与ioBroker项目无关！）[![捐赠]（https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url)

##加入Discord服务器，讨论有关ioBroker-deconz集成的所有内容！
<a href="https://discord.gg/uPwfzvR"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

## Changelog

### 2.0.3
* fix incoming rename event for sensors
* fix release_press is set to true at start
* added websocket port info to configuration
* added event types handling for websocket messages
* added backup, deConz update & firmware update states under Gateway_info
* added touchlink functions
* fix sensor handling for virtual devices (fsm and vpir)

### 2.0.2
* Bugfix

### 2.0.1
* Bugfixes

### 2.0.0
* changed id naming from id to mac (uniqueid)
* possibility to rename devices

Full changelog history can be found in CHANGELOG.md

## License
Apache-2.0

Copyright (c) 2017-2020 Jey Cee jey-cee@live.com