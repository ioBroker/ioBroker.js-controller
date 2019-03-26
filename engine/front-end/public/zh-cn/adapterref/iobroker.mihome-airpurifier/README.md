---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/JoJ123/ioBroker.mihome-airpurifier/edit/master//README.md
title: MiHome-Air-Purifier
hash: v9/RyFymOAzQsuQLVQ998xAKpCe4/CXiSDSvgb6c/84=
adapter: true
license: MIT
authors: Johannes Jaeger <johannesjaegeroffice@gmail.com>
description: Controll your Xiaomi Air Purifier
keywords: mihome-airpurifier, xiaomi, air, purifier
readme: https://github.com/JoJ123/ioBroker.mihome-airpurifier/blob/master/README.md
mode: daemon
materialize: true
compact: false
published: 2018-12-18T12:20:09.290Z
version: 0.0.5
BADGE-建立状态: https://travis-ci.org/JoJ123/ioBroker.mihome-airpurifier.svg?branch=master
---
![商标](zh-cn/adapterref/iobroker.mihome-airpurifier/../../../en/adapterref/iobroker.mihome-airpurifier/admin/mihome-airpurifier.png)


＃ioBroker.mihome-airpurifier
适用于ioBroker物联网平台的小米空气净化器适配器。

##如何获得令牌？
您必须安装miio命令行工具`npm install -g miio`

现在您有两个选择：

1.使用Mi Home App：

    您将净化器与MI Home App连接到您的Wifi网络，然后运行以下命令：

    `miio discover`

    您应该获得以下输出并可以保存令牌。

```
Device ID: 48765421
Model info: zhimi.airpurifier.m1
Address: 192.168.100.9
Token: token-as-hex-here via auto-token
Support: At least basic
```

2.没有Mi Home App：

    您重置空气净化器的WIFI设置。然后将网络连接到空气净化器的WIFI并运行以下命令：

    `miio discover`

    您应该获得与上面相同的输出，现在可以通过以下命令配置与网络的连接：

    `miio configure id-or-address --ssid ssid-of-network --passwd password-of-network`

    现在空气净化器已连接到您的网络。

##云连接
要使用云适配器控制空气净化器，只需将状态“manuallevel”添加到云适配器。之后你可以发送f.e.通过Alexa执行以下命令：

* Alexa，打开空气净化器*，

* Alexa，将空气净化器设置为50％*，

* Alexa，关闭空气净化器*

如果您在云适配器中将“On Value”设置为“Last active value”，则设备始终以最新的acitve功率级别开始运行。

##控制状态
要控制空气净化器，可以编写以下对象：

|国家|说明|
| :---           | :---        |
|电源|打开/关闭设备|
|汽车|激活设备的自动模式。 |
|沉默|激活设备的静音模式。 |
|手册|激活设备的手动模式。 |
| manuallevel |控制手动模式的功率在0-100％的范围内。如果需要，这也将打开/关闭设备

##信息状态
从您的空气净化器（只读状态）收集以下信息：

＃＃＃ 设备信息
|国家|说明|
| :---        | :---        |
|模式|实际设备模式，如果设备已开启，则有效。 |
|温度|设备的温度以°C为单位。 |
|湿度|杂乱的相对湿度，以％为单位。 |
| pm25 | PM2.5中的空气污染。 |

## Changelog
### 0.0.5 (06.01.2019)
* (JoJ123) update natives

### 0.0.4 (02.01.2019)
* (JoJ123) update type

### 0.0.3 (18.12.2018)
* (JoJ123) npm release

### 0.0.2 (29.11.2018)
* (JoJ123) auto reconnect

### 0.0.1 (10.10.2018)
* (JoJ123) initial release

## License
The MIT License (MIT)

Copyright (c) 2018 Johannes Jaeger <johannesjaegeroffice@gmail.com>

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