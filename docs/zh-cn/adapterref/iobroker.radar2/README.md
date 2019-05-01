---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.radar2/README.md
title: 雷达2网络和bloutooth可用性
hash: 2Qp5IHqny/Wa4vK0k8yFmChUVnPiU4UR3CLIO9dIq/c=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.radar2.svg)
![安装](http://iobroker.live/badges/radar2-installed.svg)
![下载](https://img.shields.io/npm/dm/iobroker.radar2.svg)
![特拉维斯-CI](http://img.shields.io/travis/frankjoke/ioBroker.radar2/master.svg)

＃radar2网络和bloutooth可用性
![商标](../../../en/adapterref/iobroker.radar2/admin/radar2.png)

[德语手册 -  Deutsche Anleitung](README_DE.md)

## IoBroker radar2针对网络和蓝牙设备，惠普打印机，UWZ-warnungs和ECB货币的可见性测试
此适配器尝试查找网络上指定的设备或蓝牙。它还显示了当前的网络外部IP，可以读取HP打印机的墨水状态以及来自几个欧洲国家的UWZ的天气警告。它还可以读取欧洲央行的每日货币汇率。

它的工作原理是：

*使用arp-scan和ping通过IPv4和IPv6在网络上查找设备！
*收听dhcp消息，宣告新设备进入网络。
*它适用于多个接口，这意味着您的系统在不同的网络上有Wlan和LAN，它可以看到两个lans。
*支持普通蓝牙和蓝牙LE
*惠普打印机墨水状态
* Euero的欧洲央行货币兑换
* UWZ针对ioBroker设置的区域的天气警告
*在网络上使用arp-scan和ping作为经验程序，其他一切都在nodejs内部。
*适配器也可以没有root权限，但在安装之前需要一些配置操作

如果在名称的末尾放置`-`，则设备将不会计入_notHere或_isHere。

如果IP地址以'http'开头，则雷达2会将其解释为URL /网址并尝试从服务器读取页面，这可用于测试网络服务器的可用性（例如http://iobroker.net ）。在https的情况下，如果服务器没有更新的安全密钥，则可能无法访问服务器！

要使用UWZ，您需要在ioBroker.Admin中配置您的位置！如果max messages的值> 0，则每个警告将以单独的状态写入，否则它们将被合并。
您还可以设置是否要使用长警告文本，但所有信息也可以短。

欧洲央行的货币可以在这里看到：`https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml`

##与雷达适配器的区别
Radar2设置的设备在它们变得可见时立即可见，即使在再次开始扫描之前也可用于新的IP。
Radar2使用nodejs-libraries来查找蓝牙设备，但它现在也可以在iobroker的用户空间中运行，并且不需要获得root访问权限（参见下面的安装要求）。
您可以在同一行中配置多个IP（现在为IPv4和IPv6）地址或主机地址（不是URL），这样您就可以通过多种方式ping设备。
`arp-scan`用于查找mac地址，它将在具有外部IPv4的所有网络接口上运行（如果在命令行中没有另外指定），因此它不会检测基于IPv6的mac地址的设备，但它现在将同时检测无线和固定网络上的设备！

设备的可用性处理方式不同。每当设备出现时，每个设备都会获得一个`_lasthere`状态，并更新当前日期和时间。在每次扫描结束时，适配器检查所有最后的条目，如果它们比当前时间更早 - 配置的缺勤分钟。从未在这里出现的匮乏也没有`_lasthere`状态！

Web URL可以更好地管理现在的https服务器。
mac地址供应商解决方案现在在内部完成，而不是通过Web完成。仅在加载适配器启动文件lib / vendor.json时，如果此文件超过31天，则从Web下载新版本 - 仅在适配器启动时！

蓝牙部分已经更新，您可以定义要使用的蓝牙设备（0,1，...默认值：-1 =第一个）。通过这种方式，您可以使用多个BT棒在同一设备上运行多个适配器，如BLE和radar2（多个程序无法同时访问一个设备的蓝牙LE驱动程序）。

如果找到您未在设备列表中指定的IP地址或蓝牙设备，则它们将显示在未知的IP和BT列表中，并且将为每个设备生成状态。通过这种方式，您可以识别登录网络的人员或可以集成的设备。
如果您不希望将它们列为未知，请将它们放入适配器配置中相应的已知IP / BT列表中。

另外新的是HP-Printer，ECB-，UWZ-和正常扫描的间隔可以单独定义。

##安装
在将适配器安装到ioBroker之前，您需要在linux`arp-scan`和`libcap2-bin`上安装以及通过运行以下命令可以执行的一些驱动程序。
在Debian（Raspi-Stretch，Ubuntu，...）上看起来像：

```
sudo apt-get install libcap2-bin arp-scan bluetooth bluez libbluetooth-dev libudev-dev net-tools
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp-scan`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which node`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hcitool`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hciconfig`)
```

如果您更新节点或某些系统工具，则应再次执行上述操作！

在Windows（也许是osx）上没有arp-scan，这意味着只能使用ping，但不能扫描IP-mac地址！

在Osx上，蓝牙可能根本不起作用！

安装设置适配器配置后，您可以删除演示订单项。

### Arp-scan的特殊信息：
定义了一个标准命令行`-lgq --retry=5 --timeout=400`，它将扫描所有IPv4接口上的所有254个地址，如果它将在400ms内没有应答它将重试5次！如果您只需要扫描特定的接口，您可以添加例如` --interface=br0`但通常现在正确使用桥接接口，但仍然在docker环境中可能需要iot。repeat = 5可以更改为6或7更好的检测，7以上我没有找到改善！超时也是如此，500以上我找不到任何改进。

###提示从雷达到雷达2适配器或从机器到另一台机器
*如果您移动雷达适配器，您可以轻松复制整个设备列表或设置
*  - 进入管理对象并启用专家模式
*  - 查找一个名为`system.adapter.radar.0`的对象树（其中`0`是实例，如果有多个实例，请选择正确的实例）
*  - 在这条线的最右边是一个带铅笔的按钮，点击它
*  - 在窗口中，您可以选择NATIVE
*  - 您应该看到配置字段，选择'devices'字段的内容并将其复制到剪贴板
*  - 在目的地机器上选择管理员/对象中的`system.adapter.radar2.0`并同样转到NATIVE。
*  - 删除“设备”字段中的文本，然后从剪贴板中删除旧文本中的文本
*  - 保存更改

这种移动设置的方法也在系统之间工作，但如果其他适配器具有不同的结构，则可能无效。设备列表对于雷达和雷达2是相同的，唯一的区别是在雷达2中你可以有多个ip地址/条目用'，'分隔。

##重要/ Wichtig
*适配器需要节点> = v6。*！
*适配器可能无法在osx上使用蓝牙和arp-scan，只有ping无法检测IP mac地址的ip！
*适配器也可能在Windows上出现蓝牙问题，而且Windows上也没有arp-scan，只能使用ping，然后才能检测到IP mac地址！

## Changelog

### 1.2.0

* You may use now hcitool as only BT scanner instead of noble on linux (standatd)
* _LastHere will not be change on restart
* Standard scan cycle set to 20 seconds
* Removed the 'remove-end' field and replaced it with a debug flag

### 1.0.7

* check on linux the availability of BT-devices and if no devices are found do not run any BT scans to avoid SIGSEGV

### 1.0.3

* Added possibility to add more than one BT mac address for a device

### 1.0.2

* Corrected version which works with _lastHere and all new devices

### 1.0.0

* First public realease

## License

The MIT License (MIT)

Copyright (c) 2018-2019, frankjoke <frankjoke@hotmail.com>

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