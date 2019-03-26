---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/Bettman66/ioBroker.snips/edit/master//README.md
title: Snips-Offline Speech2Text
hash: GwiKNGZb+RqS8FxuI7LgbvEMNXHAc4yM8IBhetYQbHE=
adapter: true
license: MIT
authors: Walter Zengel <w.zengel@gmx.de>, Michael Schuster <development@untld-networx.de>, bluefox <dogafox@gmail.com>
description: ioBroker snips
keywords: snips, GUI, graphical, scada
readme: https://github.com/Bettman66/ioBroker.snips/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2019-01-16T14:15:00.000Z
version: 1.1.1
BADGE-建立状态: https://travis-ci.org/Bettman66/ioBroker.snips.svg?branch=master
BADGE-安装数量: http://iobroker.live/badges/snips-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.snips.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.snips.svg
BADGE-NPM: https://nodei.co/npm/iobroker.snips.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.snips/../../../en/adapterref/iobroker.snips/admin/snips.png)


#ioBroker.snips =================
需要node.js 6.0或更高版本以及Admin v3！

适配器通过MQTT与Snips硬件通信。执行命令需要text2command适配器。

Snips网址：https：//makers.snips.ai/

##安装剪辑
对于Debian Stretch（x86）下的Snips，Raspbian / Armbian Stretch（RPI3，Odroid）请安装以下软件包：

lsb-release apt-transport-https ca-certificates systemd systemd-sysv libttspico-utils alsa-utils dirmngr mosquitto snips-asr snips-audio-server snips-dialogue snips-hotword snips-nlu snips-tts snips-injection

您可能已经安装了软件包，具体取决于您的硬件和Linux发行版。

Raspian / Armbian的安装说明和配置：https：//snips.gitbook.io/documentation/installing-snips/on-a-raspberry-pi

Debian的安装说明和配置：sudo nano /etc/apt/sources.list在每一行中附加“non-free”，否则无法安装软件包“libttspico-utils”。
https://snips.gitbook.io/documentation/advanced-configuration/advanced-solutions

登录https://console.snips.ai并添加新向导。
在复选标记“仅显示带有操作的应用程序”上方添加应用程序，然后搜索iobroker![ioBroker snips-app标志](https://console.snips.ai/images/bundles/bundle-home.svg)并选择。
完成后，按Deploy Assistant下载ZIP文件。
zip文件在“/ usr / share / snips”下的剪辑机上解压缩，然后重新启动。

剪片应该在我们继续之前工作：

###配置Snips适配器
Url：Snips-MQTT-Servers端口的地址：Snips-MQTT-Servers的端口Instanz：Text2Command-Instanz（例如0）过滤器：例如，了解ClientID：ID（例如0）

###配置Text2Command适配器
在ID snips.X.devices.all.send.say.text中的Answer下的Text2Command适配器的配置中插入。

###注射（学习新单词）
可以在snips.0.send.inject.room或设备下学习未知单词。
注意：必须在设备/服务器sudo apt-get install -y snips-injection上安装注入服务

## Changelog
### 1.1.1
* (apollon77) Update CI testing

### 1.1.0
* (unltdnetworx) support for satellites

### 1.0.1
* (wal) bugfix memoryleak

### 1.0.0
* (wal) stable version

### 0.3.1
* (unltdnetworx) bugfix for not recognized slots

### 0.3.0
* (unltdnetworx) slots reduced to two

### 0.2.2
* (unltdnetworx) slot setBoolean changed to setDevice

### 0.2.1
* (unltdnetworx) slot-type names converted to singular

### 0.2.0
* (unltdnetworx) support for compact-mode added

### 0.1.1
* (unltdnetworx) 2 new slots added incl. injection

### 0.1.0
* (wal) add soundfeedback

### 0.0.9
* (unltdnetworx) testadapter and slots added

### 0.0.8
* (wal) adaptation for new snips version

### 0.0.7
* (wal) file corrupt

### 0.0.6
* (wal) add receive.text

### 0.0.5
* (wal) bugfix injection

### 0.0.4
* (wal) add hotword recognize

### 0.0.3
* (wal) add filter and text2command_Instanz

### 0.0.2
* (wal) first working adapter

### 0.0.1
* (wal) initial release

## License
The MIT License (MIT)

Copyright (c) 2018 Walter Zengel <w.zengel@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.