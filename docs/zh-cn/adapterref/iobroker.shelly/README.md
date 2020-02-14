---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/README.md
title: ioBroker.shelly
hash: ObG6V2WYjGqHLfkZeG0b7HUzmDdMS29Elnd27w6C+tE=
---
![商标](../../../en/adapterref/iobroker.shelly/admin/shelly.png)

![建立状态](https://travis-ci.org/schmupu/ioBroker.shelly.svg?branch=master)
![AppVeyor构建状态](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.shelly?branch=master&svg=true)
![安装数量](http://iobroker.live/badges/shelly-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.shelly.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.shelly.svg)
![NPM](https://nodei.co/npm/iobroker.shelly.png?downloads=true)

＃ioBroker.shelly
需要node.js 8.0或更高版本以及Admin v3！

适配器通过REST api和CoAP或MQTT协议与Shelly设备通信。
默认为Shelly固件（无需刷新固件！）。您可以在这里找到有关该设备的更多详细信息：[雪莉](https://shelly.cloud/)

##安装
您可以在此处找到详细的安装文档：[安装文件](./docs/EN/INSTALL.md)

##支持的设备
| Shelly设备|默认（CoAP）| MQTT |
|-------------|--------------|----|
| Shelly1（SHSW-1）|已验证|已验证|
| Shelly2（SHSW-21 / SHSW-22）|已验证|已验证|
| ShellyBulb（SHBLB）|已验证|已验证|
| Shelly H＆T（SHHT-1）|已验证|已验证|
| Shelly Smoke（SHSM-01）|已验证|已验证|
| Shelly 1 1PM（SHSW-PM）|已验证|已验证|
| Shelly 2.5（SHSW-25）|已验证|已验证|
| ShellyRGBW（SHRGBWW-01）|已验证|已验证|
| ShellyRGBW2（SHRGBW2）|已验证|已验证|
| Shelly2LED（SH2LED）|已验证|已验证|
| ShellyPlug（SHPLG-1）|已验证|已验证|
| ShellyPlug S（SHPLG-1）|已验证|已验证|
| ShellyPlug 2（SHPLG-2）|已验证|已验证|
| ShellySense（SHSEN-1）|已验证|未验证|
| Shelly4Pro（SHSW-44）|已验证|未验证|
| Shelly EM（SHEM）|已验证|已验证|
| Shelly Flood（SHWT-1）|已验证|已验证|
| Shelly Dimmer（SHDM-1）|已验证|已验证|
| Shelly门窗传感器（SHDW-1）|已验证|已验证|
| Shelly Bulb Duo（SHBDUO-1）|已验证|已验证|

## Changelog

### 3.2.0 (13.02.2020)
* (Stübi) - Add device Shelly Door/Windows sensor 

### 3.1.9 (25.01.2020)
* (Stübi) - Bugfixing, auto update new firmware

### 3.1.7 (08.01.2020)
* (Stübi) - Add state energy to Shelly dimmer 

### 3.1.6 (30.12.2019)
* (Stübi) - Add device Shelly Door/Windows sensor 
* (Stübi) - Bugfixing, auto update new firmware

### 3.1.5 (23.12.2019)
* (Stübi) - Add device Shelly Plug S2. It will be shown as Shelly Plug S (SHPLG-1) in MQTT

### 3.1.4 (11.12.2019)
* (Stübi) - Bugfixing, auto update new firmware

### 3.1.3 (07.12.2019)
* (Stübi) - Bugfixing. Add power state to Shelly dimmer in MQTT mode

### 3.1.2 (11.10.2019)
* (Stübi) - Bugfixing. Error message will not only be shown in debug modus

### 3.1.1 (14.09.2019)
* (Stübi) - Add device Shelly Dimmer

### 3.1.0 (03.09.2019)
* (Stübi) - Add device Shelly flood

### 3.0.9 (06.08.2019)
* (Stübi) - Bugfixing, with the new firmware, Shelly HT sends the humidity by CoAP as it should. Division by 2 removed!
* (Stübi) - Add status Duration in roller (shutter) mode for CoAP (not working with MQTT) 
* (Stübi) - Changed role from level to level.brightness for state Gain

### 3.0.8 (27.07.2019)
* (Stübi) - Add device Shelly EM 
* (Stübi) - Add state energy for Shelly Plug S, Shelly PM and Shelly 2.5 in CoAP mode 
* (Stübi) - Add state temperature for Shelly Plug S, Shelly PM and Shelly 2.5 in CoAP mode
* (Stübi) - Add state overtemperature for Shelly Plug S, Shelly PM and Shelly 2.5 in CoAP and MQTT mode
* (Stübi) - Bugfixing, the Shelly HT sends by CoAP the humidity multiply with 2. The fix divides the value by 2. 

### 3.0.7 (03.07.2019)
* (Stübi) - correct spelling error 
* (Stübi) - Adjust IP address after IP change in CoAP Modus (Issue 70)
* (Stübi) - Bugfixing for datapoint power (rounding method was wrong)
* (Stübi) - Fixed Buffer() is deprecated due to security and usability issues for Node >= 10

### 3.0.6 (29.06.2019)
* (Stübi) - State reboot and uptime added 

### 3.0.5 (16.06.2019)
* (Stübi) - Bugfixing 
* (Stübi) - Add Blacklist

### 3.0.4 (04.06.2019)
* (Stübi) - Bugfixing (Issue #60) 

### 3.0.3 (02.06.2019)
* (Stübi) - Support of MQTT QoS 1 and 2. Add auto firmware update to the menu 

### 3.0.2 (25.05.2019)
* (Stübi) - Bugfixing and longpush and input states for Shelly 1, 2, 1pm, 2.5 and Shelly RGBWW2 added. Add state temperature to Shelly 1pm, 2.5 and Plug S.  

### 3.0.1 (21.05.2019)
* (Stübi) - Redesign of the adapter. You can choose now between CoAP and MQTT protocol. The Shellys use this protocolls to send there state changes to ioBroker in realtime. Out of the Box the Shelly works with the CoAP protocol. You do not have to configure anything. The Shelly will be found by the Shelly Adapter itself. If you want to use MQTT, you have configure all your Shelly devices. You find a detailed installing documentation here: [Installation Documentation](./docs/EN/INSTALL.md). If you have problems with the version 3.0.1 please change back to 2.2.0 and leave an Issue (bug report) here: [GitHub Issues](https://github.com/schmupu/ioBroker.shelly/issues). 

### 2.2.0 (13.04.2019)
* Add devices Shelly 2.5 and Shelly 1 PM 

### 2.1.9 (31.03.2019)
* Add status 'firmware update' for Shelly RGBW, RGBW2 and Bulb

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

## License
The MIT License (MIT)

Copyright (c) 2018-2020 Thorsten Stueben <thorsten@stueben.de>, Apollon77 <iobroker@fischer-ka.de>

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