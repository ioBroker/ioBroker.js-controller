---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.yeelight-2/README.md
title: ioBroker.yeelight-2
hash: 6AC/HUPUiT+GyYNY6GrP3bC5jW5oKgY63rQwR2GCI9g=
---
![商标](../../../en/adapterref/iobroker.yeelight-2/admin/yeelight.png)

![安装数量](http://iobroker.live/badges/yeelight-2-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.yeelight-2.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.yeelight-2.svg)
![特拉维斯](https://api.travis-ci.org/MeisterTR/ioBroker.yeelight-2.svg?branch=master)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/MeisterTR/ioBroker.yeelight-2?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.yeelight-2.png?downloads=true)

＃ioBroker.yeelight-2
[德意志银行](README_de.md)

该适配器控制您的Yeelight设备。该适配器仅适用于admin3。不支持Admin2

##跳转版本
从0.4.X更改为0.9.X或更高版本时，必须手动删除对象，以便可以重新创建它们。

##安装
对于RGB灯泡，您必须在yeelight应用程序的设置中启用LAN。

![](../../../en/adapterref/iobroker.yeelight-2/admin/lan.jpg)

##配置
您可以手动添加设备或在网络中查找设备。基本端口是55443。如果需要，可以更改名称，ip，端口和smartname。

### Smartname
如果键入智能名称，则该设备将添加到iobroker.cloud，并且可以由alexa控制。

###查找设备
使用此按钮，您可以扫描网络中的设备，如果发现问题，设备将添加到表中。扫描网络大约需要20秒。如果找不到设备，则表示未启用局域网模式，或者灯泡在其他网络中。

## Set_scene
用法：此方法用于将智能LED直接设置为指定状态。如果智能指示灯熄灭，则它将首先打开智能指示灯，然后应用指定的命令。

参数：3〜4

 “类别”可以是“颜色”，“ hsv”，“ ct”，“ cf”，“ auto_dealy_off”。

-“颜色”表示将智能LED更改为指定的颜色，然后

亮度。

-“ hsv”表示将智能LED更改为指定的颜色和亮度。
-“ ct”表示将智能LED更改为指定的ct和亮度。
-“ cf”表示以指定的方式启动颜色流。
-“ auto_delay_off”表示将智能LED开启到指定的

在指定的分钟后，打开亮度并启动睡眠计时器以关闭灯。

 “ val1”，“ val2”，“ val3”是特定于类的。

请求示例：

-``[“颜色”，65280，70]“
-``[“ hsv”，300，70，100]``
-``[“ ct”，5400，100]``
-``[“ cf”，0,0，“ 500,1,255,100,1000,1,16776960,70”]“
-``[“ auto_delay_off”，50，5]``

注意：在“打开”和“关闭”状态下均接受。

 对于以上示例：

 -首先是将颜色设置为“ 652280”，亮度设置为70％。
 -第二种是将颜色设置为“色相：300”，“饱和度：70”和最大亮度。
 -第三个将CT设置为500K，亮度设置为100％。
 -第四步是在两个流元组上启动无限的颜色流。
 -第五种是打开灯光至50％的亮度，然后关闭

5分钟后。

## Changelog
### 1.0.3 (2019-12-01)
* (MeisterTR) add Pedant
* (MeisterTR) transfer to community
### 1.0.1 (2018-12-08)
* (MeisterTR) push version, added set_scene
### 0.9.6 (2018-12-08)
* (MeisterTR) yeelight-wifi added
* (MeisterTR) fixed  bugs
* (MeisterTR) add manuell light
* (MeisterTR) better error handling
* (MeisterTR) fixed reconnect at start
* (MeisterTR) delete object and smartname bug fixed
### 0.9.1 (2018-10-31)
* (MeisterTR) added offline detection, poll sates, cleanup
### 0.9.0 (2018-08-29)
* (MeisterTR) rebuild
### 0.4.1 (2018-08-29)
* (MeisterTR) fixed JSON error
### 0.4.0 (2018-08-29)
* (MeisterTR) fixed errors
* (MeisterTR) added scenen
### 0.3.6 (2018-07-07)
* (MeisterTR) catch spaces in config, small performance changes
### 0.3.5 (2018-06-18)
* (MeisterTR) added yeelight650, fixed some bugs, power on when ct change
### 0.2.9 (2018-06-07)
* (MeisterTR) change name for repo and npm
### 0.2.8 (2018-06-01)
* (MeisterTR) fixed bug wit port, fixed set ct by alexa
### 0.2.6 (2018-05-31)
* (MeisterTR) fixed manny bugs.
### 0.2.0 (2018-03-07)
* (MeisterTR) many changes add smartname Option, add manual devices, many fixes
* (MeisterTR) fix role for alexa
### 0.1.1 (2018-03-07)
* (MeisterTR)return to default value when turn on
* (MeisterTR)fix role for alexa
### 0.1.0 (2018-03-07)
* (MeisterTR) many changes, add hue and sat for alexa control
### 0.0.2 (2018-03-07)
* (MeisterTR) objects not overwirte after restart
### 0.0.2 (2018-03-07)
* (MeisterTR) testing added, log changed
### 0.0.1 (2018-01-29)
* (cahek2202) initinal version



base from: adb backup https://github.com/cahek2202/ioBroker.yeelight

The MIT License (MIT)

Copyright (c) 2018-2019 MeisterTR <meistertr.smarthome@gmail.com>, cahek2202 <cahek2202@mail.ru>

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