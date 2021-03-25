---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.esphome/README.md
title: ioBroker.esphome
hash: 8Y4ipsVXecu71h2LUjgVWSx8EgTDS/9pd4cNWuAuyNI=
---
![标识](../../../en/adapterref/iobroker.esphome/admin/esphome.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.esphome.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.esphome.svg)
![安装数量（最新）](http://iobroker.live/badges/esphome-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/esphome-stable.svg)
![依赖状态](https://img.shields.io/david/DrozmotiX/iobroker.esphome.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome/badge.svg)
![NPM](https://nodei.co/npm/iobroker.esphome.png?downloads=true)

＃ioBroker.esphome
[![翻译状态]（https://weblate.iobroker.net/widgets/adapters/-/ESPHome/svg-badge.svg）](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**测试：**![测试与发布](https://github.com/DrozmotiX/ioBroker.esphome/workflows/Test%20and%20Release/badge.svg)

## IoBroker的ESPHome适配器
使用由ESPHome创建和管理的简单但功能强大的配置文件来控制ESP8266 / ESP32。
适配器将通过其本地API连接到ESPHome受管设备，并确保所有数据都已同步（实时事件处理，无数据轮询！：）

该适配器将[esphome-native-api](https://github.com/Nafaya/esphome-native-api#readme)与@Nafaya的所有积分一起使用，谢谢！

## [文献资料](https://DrozmotiX.github.io/languages/en/ESPHome/)
我们所有的适配器文档都可以在[DrozmotiX文档页面](https://DrozmotiX.github.io)中找到

##先决条件
您应该熟悉如何使用ESPHome并将设备/传感器添加到YAML文件。
请确保已激活API，因为适配器将通过ESPHome本机API进行交互，您可以根据需要定义密码[请参阅ESPHome API参考](https://esphome.io/components/api.html?highlight=api)

```
api:
  password: 'MyPassword'
```

示例配置，有关更多示例，请参见[DrozmotiX Docu页面]（https://DrozmotiX.github.io）或[ESPHome文档](https://esphome.io/index.html)

```
esphome:
  name: sensor_badkamer
  platform: ESP32
  board: esp-wrover-kit

wifi:
  use_address: 192.168.10.122
  ssid: "xxxxx"
  password: "xxxxxx"

# Enable ESPHome API
api:
    password: 'MyPassword'
# Activate i2c bus
i2c:
  sda: 21
  scl: 22
  scan: True
  id: bus_a

# Example configuration for bh1750
sensor:
  - platform: bh1750
    name: "Hal_Illuminance"
    address: 0x23
    measurement_time: 69
    update_interval: 10s

# Example configuration for an GPIO output
output:
  - platform: gpio
    pin: 12
    inverted: true
    id: gpio_12

# Example configuration linking a switch to the previous defined output
switch:
  - platform: output
    name: "Generic Output"
    output: 'gpio_12'

```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (DutchmanNL) Update Translations

### 0.1.5 (2021-03-21)
* (DutchmanNL) Add Translations

### 0.1.4 (2021-03-19)
* (DutchmanNL) Implemented RGBW
* (DutchmanNL) Ensure correct encryption and storage of passwords
* (DutchmanNL) Proper value ranges for type light (255 instead 100)
* (DutchmanNL) Implemented hex color state for type light (if RGB is available)

### 0.1.2 (2021-03-02)
* (DutchmanNL) Type Fan added
* (DutchmanNL) Type Light added
* (DutchmanNL) Error messages optimized
* (DutchmanNL) Device reconnect handling improved
* (DutchmanNL) [Breaking!] Change state name to default "state" for type BinarySensor / Climate / Sensor / TextSensor & Switch  
* (DutchmanNL) Autodiscovery improved, non-ESPHome devices excluded

### 0.1.0 (2021-02-27)
* (DutchmanNL) Autodiscovery implemented
* (DutchmanNL) Type Climat added
* (DutchmanNL) Type TextSensor added
* (DutchmanNL) Solved reconnection issues
* (DutchmanNL) Optimized error messages for unknown types
* (DutchmanNL & @xXBJXx) Adapter configuration page optimized

### 0.0.1
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2021 DutchmanNL <rdrozda86@gmail.com>

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