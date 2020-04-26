---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mihome-airpurifier/README.md
title: ioBroker.mihome空气净化器
hash: GZpDfYg6GTTqGpD7ZIU8MYgRKvu6uwkllS7U5QdFRpk=
---
![安装数量](http://iobroker.live/badges/mihome-airpurifier-stable.svg)
![建立状态](https://travis-ci.org/JoJ123/ioBroker.mihome-airpurifier.svg?branch=master)

---
---
![商标](../../../en/adapterref/iobroker.mihome-airpurifier/admin/mihome-airpurifier.png)

＃ioBroker.mihome-airpurifier
##如何获取令牌？
您必须安装miio命令行工具`npm install -g miio`

现在，您有两个选择：

1.使用Mi Home App：

    您将带有MI Home App的净化器连接到Wifi网络，然后运行以下命令：

    `miio discover`

    您应该获得以下输出并可以保存令牌。

```
Device ID: 48765421
Model info: zhimi.airpurifier.m1
Address: 192.168.100.9
Token: token-as-hex-here via auto-token
Support: At least basic
```

2.如果没有Mi Home App：

    您重置空气净化器的WIFI设置。然后，将您的网络与空气净化器的WIFI连接，然后运行以下命令：

    `miio discover`

    您应该获得与上述相同的输出，并且现在可以通过以下命令配置与网络的连接：

    `miio configure id-or-address --ssid ssid-of-network --passwd password-of-network`

    现在，空气净化器已连接到您的网络。

##云连接
要使用云适配器控制空气净化器，只需将状态“ manuallevel”添加到您的云适配器。之后，您可以发送f.e.通过Alexa的以下命令：

* Alexa，打开空气净化器*，

* Alexa，将空气净化器设置为50％*，

* Alexa，关闭空气净化器*

如果在云适配器中将“打开值”设置为“上次有功值”，则设备将始终以最新的有功功率水平开始运行。

##控制状态
要控制空气净化器，可以编写以下对象：

|州|描述 |
| :---           | :---        |
| `power`|打开/关闭设备|
| `silent`|激活设备的静音模式。 |
| `manual`|激活设备的手动模式。 |
| `manuallevel`|将手动模式的功率控制在0-100％的范围内。如有必要，这还将打开/关闭设备。 |
| `manuallevel` |将手动模式的功率控制在0-100％的范围内。如有必要，这还将打开/关闭设备。 |

##信息状态
从您的空气净化器收集以下信息（只读状态）：

＃＃＃ 设备信息
|州|描述 |
| :---        | :---        |
| `mode`|如果设备已打开电源，则实际的设备模式才有效。 |
| `humidity`|测量的相对湿度，以设备的百分比表示。 |
| `pm25`| PM2.5中的空气污染。 |
| `pm25` | PM2.5中的空气污染。 |

## Changelog
### 0.1.1 (18.04.2020)
* (JoJ123) move to typescript

### 0.0.6 (09.04.2019)
* (JoJ123) update miio to fork of Sineos

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

Copyright (c) 2019 Johannes Jaeger johannesjaegeroffice@gmail.com

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

Copyright (c) 2020 Johannes Jaeger <johannesjaegeroffice@gmail.com>