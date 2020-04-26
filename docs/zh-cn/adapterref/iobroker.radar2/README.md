---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.radar2/README.md
title: 雷达2网络和蓝牙可用性
hash: lVE3295PTa4EuFeQwSZc9GB98Y60n9pcML0Hu/1ofjQ=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.radar2.svg)
![已安装](http://iobroker.live/badges/radar2-installed.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.radar2.svg)
![特拉维斯](http://img.shields.io/travis/frankjoke/ioBroker.radar2/master.svg)

＃Radar2网络和蓝牙可用性
![商标](../../../en/adapterref/iobroker.radar2/admin/radar2.png)

[德语手册-Deutsche Anleitung](README_DE.md)

## IoBroker Radar2对网络和蓝牙设备，HP打印机，UWZ警告和ECB货币的可见性测试
该适配器尝试查找网络上指定的或带有蓝牙的设备。它还显示了网络的当前外部IP，可以读取HP打印机的墨水状态，还可以从UWZ读取几个欧洲国家的天气警告。它还可以从ECB读取每日货币汇率。

它的工作原理是：

*使用arp-scan和ping在具有IPv4和IPv6的网络上查找设备！
*收听dhcp消息，该消息宣布有新设备进入网络。
*它可以在多个接口上工作，这意味着您的系统中的Wlan和lan在不同的网络上，并且可以看到两个lan。
*支持普通蓝牙和蓝牙LE
* HP打印机墨水状态
*欧洲中央银行兑换Euero
* ioBroker设置为的区域的UWZ天气警告
*仅在实验性程序上使用arp-scan和ping，其他所有内容都在nodejs内部。
*该适配器也可以在没有root权限的情况下工作，但是在安装之前需要进行一些配置操作

如果将`-`放在名称末尾，则该设备将不计入_notHere或_isHere中。

如果IP地址以“ http”开头，radar2会将其解释为URL /网址，并尝试从服务器读取页面，则该地址可用于测试Web服务器的可用性（例如http://iobroker.net ）。如果使用https，如果他没有更新的安全密钥，则可能无法访问服务器！

要使用UWZ，您需要在ioBroker.Admin中配置您的位置！如果最大消息的值> 0，则每个警告将以单独的状态写入，否则将被合并。
您也可以设置是否要使用较长的警告文本，但所有信息也可以简短显示。

在这里可以看到欧洲中央银行的货币：`https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml`

###蓝牙使用
BT设备有两种不同类型：BT-LE（V 4.x +）和普通BT（V <= 3.x）。对于每种不同的设备类型，适配器都具有两种不同的扫描功能。

1）适用于BT-LE：Noble（Nodejs modile）和'hcitool lescan'命令2）适用于普通BT：BT扫描（Nodejs模块）和'l2ping'命令

每个BT设备只能同时使用两种方法中的一种。

Noble和BT扫描是使用npm在适配器安装上编译的模块，该模块应在linux和大多数Windows设置上运行。
Hcitool和l2ping随安装脚本中的蓝牙工具一起安装，仅适用于linux。

在Adapter-config BT-LE macs中，应该用“！”标识在mac地址之前，以避免使用l2ping之类的常规BT扫描对其进行扫描。
通常，Noble比hcitool lescan识别设备要好一些，但它还会产生更多错误，并且可能无法在所有系统上安装。
同样，l2ping更好地找到了普通的BT设备，但在Linux以外的其他平台上不可用。
因此，您可以在适配器配置中单独配置用法。

如果您使用多个BT设备，则可以在config中指定设备编号，默认值为-1，使用第一个可用设备。在Linux上，使用`lescan dev`可以看到所有可用设备的列表。
在同一适配器中，您只能使用一个设备，如果要扫描多个设备，则需要使用不同的适配器或实例。

##与Radar-Adapter的区别
Radar2设置了在可见时立即可见的设备，甚至在重新开始扫描之前也可以使用新IP。
Radar2使用nodejs-libraries查找蓝牙设备，但是它现在也可以从iobroker在用户空间中运行，并且不需要获得root访问权限（请参阅下面的安装要求）。
您可以在同一行中配置多个IP（现在为IPv4和IPv6）地址或主机地址（而不是URL），这使您可以通过多种方式对设备执行ping操作。
`arp-scan`用于查找mac地址，它将在具有外部IPv4的所有网络接口上运行（如果在命令行中没有指定不同的话），因此它不会检测基于IPv6上mac地址的设备，但是现在将同时检测无线和固定网络上的设备！

设备的可用性处理方式有所不同。每次看到时，每个设备都将获得`_lasthere`状态，并以当前日期和时间更新。在每次扫描结束时，适配器检查所有lasthere条目是否早于当前时间（配置的缺席分钟数）。从来没有到过的设备也不会具有`_lasthere`状态！

Web URL现在可以更好地管理https服务器。
Mac地址供应商解析现在是在内部完成的，而不是通过Web完成的。仅在适配器启动文件lib / vendor.json上加载，如果该文件的时间超过31天，则将从Web下载新版本-仅在适配器启动时！

蓝牙部分已更新，您可以定义要使用的蓝牙设备（0,1，...默认值：-1 =第一）。这样，您可以使用多个BT棒在同一设备上运行BLE和radar2等多个适配器（一个设备的蓝牙LE驱动程序不能同时被多个程序访问）。

如果找到了您未在设备列表中指定的IP地址或蓝牙设备，它们将显示在未知的IP和BT列表中，并且将为每个状态生成一个状态。这样，您可以识别登录到您的网络或可集成的ned设备的人员。
如果不想让它们被列为未知，则将它们放入适配器配置中的相应已知IP / BT列表中。

另一个新功能是可以分别定义HP-打印机，ECB，UWZ和普通扫描的间隔。

##安装
在将适配器安装到ioBroker中之前，您需要安装在Linux`arp-scan`和`libcap2-bin`§以及一些驱动程序上，这些驱动程序可以通过运行以下命令来完成。
在Debian（Raspi-Stretch，Ubuntu，...）上，它看起来像：

```
sudo apt-get install -y coreutils libcap2-bin arp-scan bluetooth bluez libbluetooth-dev libudev-dev net-tools
# and below need to be run whenever you update nodejs!
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp-scan`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which node`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hcitool`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hciconfig`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which l2ping`)
```

如果第一行安装了除`readlink`或`hcitools`以外的所有内容，则很可能缺少路径，请尝试使用`sudo find / -name readlink`搜索路径（在我的情况下为`/usr/bin` ），它未包含在$ PATH中！然后编辑`.bashrc`并在`export PATH=$PATH:/usr/bin`中添加一行！

如果您更新节点或某些系统工具，则应再次执行以上操作！

在Windows（可能是osx）上，没有arp-scan，这意味着将仅使用ping，而不能扫描IP-mac地址！

在Osx上，蓝牙也可能根本不起作用！

安装设置适配器配置后，您可以删除演示订单项。

### Arp-scan的特殊信息：
有一个定义的标准命令行`-lgq --retry=5 --timeout=400`，如果在400ms内没有应答，它将在所有IPv4接口上扫描所有254个地址，然后重试5次！如果仅需要扫描特定的接口，则可以添加例如` --interface=br0`，但是通常现在可以正确使用网桥接口，但是仍然需要在docker环境中使用otot.repeat = 5可以更改为6或7更好的检测，以上7我没有发现改善！超时也是如此，超过500时我找不到任何改善。

###给那些从雷达转移到Radar2适配器或从一台机器转移到另一台机器的提示
*如果您移动雷达适配器，则可以通过以下方式轻松复制整个设备列表或设置
*-进入管理对象并启用专家模式
*-查找一个名为“ system.adapter.radar.0”的对象树（其中“ 0”是实例，如果您有多个实例，请选择正确的实例）
*-在此行的最右边是带有铅笔的按钮，请单击它
*-在窗口上，选择NATIVE
*-您应该看到config字段，然后选择“ devices”字段的内容并将其复制到剪贴板
*-在目标计算机上执行同样的操作，在Admin / objects中选择`system.adapter.radar2.0`，然后转到NATIVE。
*-从剪贴板中删除“设备”字段中的文本和以前的文本
*-保存更改

在系统之间也可以使用这种移动设置的方法，但是如果其他适配器具有不同的结构，则可能无法使用。雷达和radar2的设备列表相同，唯一的区别是在radar2中，您可以有多个以“，”分隔的ip地址/条目。

##重要/ Wichtig
*适配器需要节点> = v6。*！
*适配器可能无法在osx上使用蓝牙和arp扫描，只能ping ror ip而无法检测IP mac地址！
*适配器在Windows上的蓝牙也可能有问题，并且arp-scan在Windows上不可用，将仅使用ping不能检测IP mac地址！

## Changelog

### 1.2.3

* Updated to use the adapter for js-controller 3.0 
* Updated HP printer routine to understand some newer inkjet printers

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