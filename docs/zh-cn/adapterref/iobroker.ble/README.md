---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ble/README.md
title: 无题
hash: X3BN9z9QT2g4Dn4oYKEJDV0N1zMdgUi8APe7JPfGOEo=
---
![安装数量](http://iobroker.live/badges/ble-stable.svg?break_cache=1)

<img src="admin/ble.png" height="48" /> ioBroker.ble

=================

![建立状态](https://action-badges.now.sh/AlCalzone/ioBroker.tradfri)

监视蓝牙低功耗（BLE）信标并记录其信息。
当前，仅支持记录*广告*服务数据。您可以使用nRF Connect应用程序（服务数据UUID）监视要播发的服务。
将来的版本将支持连接和读取/写入服务的功能。

##安装
该适配器需要其他库才能进行编译。有关详细说明，请参见https://github.com/sandeepmistry/noble#prerequisites。
在Raspberry Pi和类似设备上，应该这样做：`sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev libcap2-bin`

如果适配器启动但无法连接到蓝牙硬件，请检查ioBroker中的`info.driverState`状态。如果它是`unauthorized`，则需要授予`node`其他权限。对于Linux，这很简单

```bash
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
```

这要求安装`libcap2-bin`。

##配置
如果您的系统上有多个蓝牙设备，请从下拉列表中选择要使用的蓝牙设备。
在下面的文本框中，输入要记录的广告服务的所有UUID（在nRF Connect应用程序中找到）。

##插件系统
适配器通过插件支持扩展。那些定义了应该监听哪些广告服务以及如何转换数据。插件结构在https://github.com/AlCalzone/ioBroker.ble/blob/master/src/plugins/plugin.ts中定义，并且在此https://github.com/AlCalzone定义了可用插件的示例/ioBroker.ble/blob/master/src/plugins/_default.ts

如果您有任何设备通过广告传输经过特殊编码的信息，请随时使用新插件创建PR。

###支持的插件
*`“ xiaomi”`：所有小米蓝牙传感器，包括
  * [花卉护理植物传感器]（https://xiaomi-mi.com/sockets-and-sensors/xiaomi-huahuacaocao-flower-care-smart-monitor/）
  * [Mijia温湿度传感器]（https://www.banggood.com/Xiaomi-Mijia-Bluetooth-Thermometer-Hygrometer-with-LCD-Screen-Magnetic-Suction-Wall-Stickers-p-1232396.html?cur_warehouse =美国）
  * [驱蚊剂]（https://www.aliexpress.com/item/32883859984.html）
*`“ mi-flora”`：用于花卉护理植物传感器的原始插件，现在别名为“” xiaomi“`
*`“ ruuvi-tag”`：[ruuvi标签]（https://tag.ruuvi.com/）多传感器，固件版本为v1和v2。 **未经测试，请提供反馈！**

## Changelog

### 0.11.0 (2019-11-19)
* (AlCalzone) Removed compact support. `noble` sometimes throws errors in callbacks that cannot be handled and would bring the whole compact group down.

### 0.10.1 (2019-10-13)
* (AlCalzone) Fixed crash in JS-Controller 2.0

### 0.10.0 (2019-09-26)
* (AlCalzone) `xiaomi` plugin: test the received data instead of relying on MAC prefixes

### 0.9.2 (2019-09-26)
* (AlCalzone) Add `e7:2e:00` as an alternative mac prefix for MiTemperature

### 0.9.1 (2019-09-22)
* (AlCalzone) Fix compact mode crashes

### 0.9.0 (2019-09-04)
* (AlCalzone) Devices without service data but with manufacturer data are no longer treated as empty
* (AlCalzone) `_default` plugin: Create states for manufacturer data
* (AlCalzone) `ruuvi-tag` plugin: Set `"Ruuvi Tag"` as the default name for the device object

### 0.8.4 (2019-09-03)
* (AlCalzone) `ruuvi-tag` plugin: Fix parsing of data format 3 and 5

### 0.8.3 (2019-08-26)
* (AlCalzone) Add `80:ea:ca` as an alternative mac prefix for FlowerCare

### 0.8.2 (2019-08-14)
* (AlCalzone) Add `3f:5b:7d` as an alternative mac prefix for the Xiaomi watch

### 0.8.1 (2019-07-26)
* (AlCalzone) Added support for the Xiaomi Mosquito Repellent (read-only!)

### 0.7.4 (2019-07-03)
* (AlCalzone) Removed dependency to admin instance on slaves
* (AlCalzone) Several dependency updates

### 0.7.3 (2019-04-05)
* (AlCalzone) Add MiTemperature watch with E-Ink display

### 0.7.2 (2019-04-05)
* (AlCalzone) Add `58:2d:34` as an alternative mac prefix for MiTemperature

### 0.7.0 (2019-02-05)
* (AlCalzone) Support MaterializeCSS (Admin v3)
* (AlCalzone) Support compact mode
* (AlCalzone) Use @iobroker/testing for tests

### 0.6.0 (2018-12-23)
* (AlCalzone) Add NodeJS 10 support
* (AlCalzone) Add an option to disallow new devices

### 0.5.5 (2018-11-29)
* (AlCalzone) Bugfix: Preserving object properties works again

### 0.5.3 (2018-11-23)
* (AlCalzone) Cache objects for a short while instead of retrieving them from ioBroker all the time
* (AlCalzone) Support negative temperatures from Xiaomi devices

### 0.5.2 (2018-03-28)
* (AlCalzone) Fixed `isHandling` for the `ruuvi-tag` plugin

### 0.5.1 (2018-03-28)
* (AlCalzone) Restored accidentally deleted `mi-flora` plugin.

### 0.5.0 (2018-03-27)
* (JonasR & AlCalzone) Added support for the Ruuvi Tag with the `ruuvi-tag` plugin

### 0.4.2 (2018-03-27)
* (AlCalzone) Fixed the parsing of temperature+humidity packets from the Xiaomi temperature sensor

### 0.4.1 (2018-03-24)
* (AlCalzone) Forgot to load legacy `mi-flora` plugin
* (AlCalzone) Fixed an error when a plugin defines no objects

### 0.4.0 (2018-03-24)
* (zuvielx9 & AlCalzone) Support for all Xiaomi bluetooth sensors using the `xiaomi` plugin
* (AlCalzone) reworked plugin system slightly

### 0.3.5 (2018-03-18)
* (AlCalzone) Bugfix: Next attempt at preserving object properties like history and name

### 0.3.4 (2018-01-01)
* (AlCalzone) Bugfix: Keep `history` settings by not overriding existing objects
* (AlCalzone) Bugfix: When plugins return `undefined`, ignore the packet

### 0.3.3 (2017-11-24)
* (AlCalzone) Enable logging of RSSI

### 0.3.2 (2017-09-27)
* (AlCalzone) Add * wildcard for "all services"

### 0.3.1 (2017-09-27)
* (AlCalzone) Bugfix: don't throw error when RSSI state doens't exist

### 0.3.0 (2017-09-27)
* (AlCalzone) Support throttling of RSSI updates

### 0.2.2 (2017-09-27)
* (AlCalzone) Bugfix: Only monitor services from _enabled_ plugins

### 0.2.1 (2017-09-27)
* (AlCalzone) Bugfix: last patch broke the service filtering

### 0.2.0 (2017-09-26)
* (AlCalzone) Modularized the adapter code into a plugin system
* (AlCalzone) Added Mi-Flora plugin

### 0.1.0 (2017-09-06)
* (AlCalzone) Support selection of bluetooth devices

### 0.0.2 (2017-09-06)
* (AlCalzone) Store more information, improved object structure.

### 0.0.1
* (AlCalzone) initial release

## License
The MIT License (MIT)

Copyright (c) 2017-2020 AlCalzone <d.griesel@gmx.net>

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