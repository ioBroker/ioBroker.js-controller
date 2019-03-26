---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/schmupu/ioBroker.shelly/edit/master//README.md
title: 谢莉
hash: iTZ24wv7VPSFx9I1I0uKeEtbGYOylVSdzg+T+Q3pdF4=
adapter: true
license: MIT
authors: Thorsten Stueben <thorsten@stueben.de>, Apollon77 <iobroker@fischer-ka.de>
description: 雪莉适配器
keywords: shelly, switch, smarthome, iobroker
readme: https://github.com/schmupu/ioBroker.shelly/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2018-09-03T18:00:52.255Z
version: 2.1.7
BADGE-建立状态: https://travis-ci.org/schmupu/ioBroker.shelly.svg?branch=master
BADGE-AppVeyor构建状态: https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.shelly?branch=master&svg=true
BADGE-安装数量: http://iobroker.live/badges/shelly-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.shelly.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.shelly.svg
BADGE-NPM: https://nodei.co/npm/iobroker.shelly.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.shelly/../../../en/adapterref/iobroker.shelly/admin/shelly.png)


＃ioBroker.shelly =================
需要node.js 6.0或更高版本以及Admin v3！

适配器通过REST api与Shelly设备通信，使用默认Shelly固件与CoAP协议通信（不需要刷新固件！）。
由于CoAP使用多播UDP包，因此Shelly设备必须与ioBroker位于同一子网中。
如果在docker容器中使用ioBroker，则容器必须以host或macvlan modus运行。

您可以在此处找到有关该设备的更多详细信息：[雪莉](https://shelly.cloud/)

##安装
1.安装适配器
2.无需配置。 Shelly设备将被自动检测和添加。有时您必须重新启动shelly设备或在最初出现在ioBroker之前使用应用程序控制它。

##支持的设备
* Shelly1（SHSW-1，已验证）
* Shelly2（SHSW-21 / SHSW-22，已验证）
* ShellyRGBW（SHRGBWW-01，已验证）
* ShellyRGBW2（SHRGBW2-01，未经过验证和测试）
* Shelly4Pro（SHSW-44，未经过验证和测试）
* ShellyPlug（SHPLG-1，未经过验证和测试）
* ShellyRGBW（SHRGBWW-01，已验证）
* Shelly H＆T（SHHT-1，已验证）
* Shelly Smoke（SHSM-01，已验证）

##需要实现的更多细节（调试日志）
* ShellySense（SHSEN-1）
* ShellyBulb（SHBLB-1d）
* Shelly2LED（SH2LED-1）

## Changelog

### 2.1.8 (19.03.2019)
* Consider roller (shutter) position in CoAP message 
* Support of Shelly Sensor

### 2.1.7 (15.03.2019)
* Changing all RGBWW2 colors at the same time
* new RGBWW2 State color.rgbw with the format #RRGGBBWW

### 2.1.6 (08.03.2019)
* Shelly RGBWW2 bug fixing (whit did not work in color mode)

### 2.1.5 (05.03.2019)
* Shelly Smoke Support

### 2.1.4 (20.02.2019)
* Bugfixing of Shelly RGBW2 Support. If you have installed version 2.1.3, please delete all RGBW2 objects first, because the objects will be renamed from lights to color and white in version 2.1.4.   

### 2.1.3 (16.02.2019)
* Support of Shelly RGBW2

### 2.1.0 (09.02.2019)
* New Status 'new firmware available' for Shely1, Shelly2, Shelly4Pro and ShellyPlug 

### 2.0.8 (31.01.2019)
* Bugfixing, polling new Shelly status must be at least 1 sec ago 

### 2.0.7 (21.01.2019)
* Bugfixing for objects AutoTimerOn and AutoTimeroff

### 2.0.6 (12.01.2019)
* Getting faster online status for Shelly devices, excluded H&T. Fix of power status for Shelly Plug.

### 2.0.5 (07.01.2019)
* Fixing an error if Shelly device is not reachable (offline)

### 2.0.4 (04.01.2018)
* Support of js-controller compact mode and performance optimizing. Relay status changes will be shown much faster in ioBroker for Shelly 1, 2 and 4Pro

### 2.0.3 (02.01.2018)
* Shows RSSI Status for Shelly 1 & 2. You need Firmware 1.4.4 

### 2.0.2 (22.12.2018)
* Add Shelly H&T. 

### 2.0.1 (22.12.2018)
* Major update because of problems with CoAP messages. 

### 1.0.2 (17.12.2018)
* Work around for showing states in shutter/roller modus

### 1.0.1 (07.12.2018)
* Add shutter/roller position

### 1.0.0 (10.11.2018)
* Optimizations and Online status fixed

### 0.2.6 (31.10.2018)
* Two new datapoints (AutoTimerOn and AutoTimerOn) for Shelly 1/2

### 0.2.5 (13.10.2018)
* Hostname instead of ip address will be shown

### 0.2.4 (10.10.2018)
* Channel name can be overwrite with own name

### 0.2.3 (01.10.2018)
* Bugfixing, shutter status display

### 0.2.2 (30.09.2018)
* Bugfixing, on start default value of timer and duration of relay and shutter will be 0 sec

### 0.2.1 (28.09.2018)
* Username/Password supported

### 0.2.0 (28.09.2018)
* Roller / Shutter for Shelly2 supported

### 0.1.1 (21.09.2018)
* Bugfixing

### 0.1.0 (20.09.2018)
* First Version. Supports all Shelly switches like Shelly 1, Shelly 2, Shelly 4 and the power sockets.

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Thorsten Stueben <thorsten@stueben.de>, Apollon77 <iobroker@fischer-ka.de>

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