---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.snips/README.md
title: ioBroker.snips！[徽标]（admin / snips.png）
hash: pBgUGZnR38d1Hr6geTtsYLu64muY5uJ4tnyK+ks8FWs=
---
![建立状态](https://travis-ci.org/unltdnetworx/ioBroker.snips.svg?branch=master)
![安装数量](http://iobroker.live/badges/snips-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.snips.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.snips.svg)
![NPM](https://nodei.co/npm/iobroker.snips.png?downloads=true)

＃ioBroker.snips![商标](../../../en/adapterref/iobroker.snips/admin/snips.png)
注意：由于Sonos购买了Snips，并且免费平台已于02/01/2020终止，因此不再开发或维护适配器。适配器和已安装的snips设备仍然可以使用。

需要node.js 6.0或更高版本以及Admin v3！

适配器通过MQTT与Snips硬件进行通信。执行命令需要使用text2command适配器。

Snips网址：<https://makers.snips.ai/>

##安装片段
对于Debian Stretch（x86），Raspbian / Armbian Stretch（RPI3，Odroid）下的Snips，请安装以下软件包：

lsb-release apt-transport-https ca证书systemd systemd-sysv libttspico-utils alsa-utils dirmngr mosquitto snips-asr snips-音频服务器snips-dialog snips-hotword snips-nlu snips-tts snips-injection

根据您的硬件和Linux发行版，您可能已经安装了软件包。

Raspian / Armbian的安装说明和配置：<https://snips.gitbook.io/documentation/installing-snips/on-a-raspberry-pi>

Debian的安装说明和配置：sudo nano /etc/apt/sources.list在每行中附加“ non-free”，否则您将无法安装软件包“ libttspico-utils”。
<https://snips.gitbook.io/documentation/advanced-configuration/advanced-solutions>

登录到<https://console.snips.ai>并添加一个新向导。
在复选标记“仅显示带有操作的应用程序”上方添加一个应用程序，然后搜索iobroker![ioBroker snips-app徽标](https://console.snips.ai/images/bundles/bundle-home.svg)并选择。
完成后，请按Deploy Assistant下载ZIP文件。
压缩文件在“ / usr / share / snips”下的snips机器上解压缩，然后重新启动。

在我们继续之前，应先进行剪断：

###配置Snips适配器
网址：Snips-MQTT服务器的地址端口：Snips-MQTT服务器的端口Instanz：Text2Command-Instanz（例如0）过滤器：例如了解ClientID：ID（例如0）

###配置Text2Command适配器
在ID snips.X.devices.all.send.say.text中的Answer（答案）下的Text2Command适配器的配置中插入。

###注入（学习新单词）
可以在snips.0.send.inject.room或设备下学习未知单词。
注意：必须在设备/服务器上安装注入服务sudo apt-get install -y snips-injection

## Changelog

### 1.5.0

* (unltdnetworx) removal of language support, may come back

### 1.4.0

* (unltdnetworx) multilingualism support for german and english

### 1.3.1

* (unltdnetworx) add multilingual blinds/switch-rule

### 1.3.0

* (unltdnetworx) preparation for multilingualism support

### 1.2.1

* (unltdnetworx) bugfix for multiple devices in stellite's room

### 1.2.0

* (unltdnetworx) possibility to enforce the room for a satellite

### 1.1.7

* (unltdnetworx) security update because of vulnerability in pulled by mqtt-dependency mqtt-package

### 1.1.6

* (unltdnetworx) activation/deactivation of hotword recognition for each satellite (mute)

### 1.1.5

* (unltdnetworx) bugfixes for adapter-testing

### 1.1.4

* (unltdnetworx) control soundfeedback for every satellite

### 1.1.3

* (unltdnetworx) delete states after session ended

### 1.1.2

* (unltdnetworx) create satellites manually

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

Copyright (c) 2020 Michael Schuster <development@unltd-networx.de> & Walter Zengel <w.zengel@gmx.de>

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