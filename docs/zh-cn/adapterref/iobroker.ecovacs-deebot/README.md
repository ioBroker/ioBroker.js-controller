---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ecovacs-deebot/README.md
title: 适用于ioBroker的Ecovacs Deebot适配器
hash: NpL58aNOi21reLcwXXu1HIRjHOIlqd2Ld3rxNiWRxv8=
---
![商标](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![特拉维斯](https://travis-ci.org/mrbungle64/ioBroker.ecovacs-deebot.svg?branch=master)

＃适用于ioBroker的Ecovacs Deebot适配器
此适配器使用[ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js)库。

＃＃ 楷模
到目前为止，只有与** XMPP **协议通信的设备才能正常工作。
与** MQTT **协议通信的设备是实验性的。

成功建立连接后，可以使用状态值`info.communicationProtocol`对此进行检查（值：`XMPP`，`MQTT`）。

###这些模型可以充分发挥作用
* Deebot苗条2
* Deebot Ozmo 930

###这些模型几乎可以正常工作
* Deebot 601
* Deebot 710/711
* Deebot 900/901
* Deebot奥兹莫610
* Deebot Ozmo 950

###这些模型应该（几乎）完全正常工作
* Deebot N79T
* Deebot 600/605
* Deebot Ozmo 960（未经测试）

###这些模型应该部分起作用
* Deebot Ozmo 900

###按钮和控件
|型号基本* |暂停|现货| spotArea | customArea ** |边缘playSound |水位|
|------------------- |-------- |------ |------ |--------- |-------------- |------ |---------- |----------- |
| Deebot Slim 2 | x |不适用x |不适用不适用x |不适用不适用 |
| Deebot 600/601/605 | x | | x |不适用不适用x | | |
| Deebot 710/711 | x | | | | | | |不适用 |
| Deebot 900/901 | x | x |不适用| |不适用|不适用 |
| Deebot Ozmo 610 | x | | x |不适用不适用x | | |
| Deebot Ozmo 900 | | |不适用| |不适用| |
| Deebot Ozmo 930 | x | x |不适用x | x |不适用x | x |
| Deebot Ozmo 950 | x | x |不适用x | x |不适用x | x |

*）“基本”命令是`clean`（`auto`），`charge`，`stop`。它们不在此处单独列出。

**）包括`cleanings`的数量

###信息和状态
|型号电池| chargestatus | cleanstatus |水位|水箱|消耗品|
|------------------- |-------- |------------- |------------ |----------- |--------  |------------ |
| Deebot Slim 2 | x | x | x |不适用不适用x |
| Deebot 600/601/605 | x | x | x | | | |
| Deebot 710/711 | x | | |不适用不适用|
| Deebot 900/901 | x | x | x |不适用不适用|
| Deebot Ozmo 610 | | | | | | |
| Deebot Ozmo 900 | | | | | | |
| Deebot Ozmo 930 | x | x | x | x | x | x |
| Deebot Ozmo 950 | x | | x | | | |

＃＃ 控制
＃＃＃ 纽扣
|名称|描述|
| --- | --- |
|收费|返回充电站|
|干净开始自动清洁|
|边缘开始边缘清洁|
| playSound |播放声音以查找机器人|
|现货|开始点清洁|
|停止|停止清洁过程|
|暂停|暂停清洁过程|
| spotArea`0`-`9`| Ecovacs应用程序中定义的区域最多有9个按钮|

###区域/区域清洁
#### SpotArea
*点区在移动应用中以字母命名
    *在适配器中，它们映射到一个数字：
        *`A` =`0`
        *`B` =`1`
        *等
*`spotArea`：以逗号分隔的数字列表
    *以0开头（例如：1,3 =区域B和D），以进行清洁
*按钮数量（`spotArea_0-9`）可以在适配器配置中配置

#### CustomArea
*以逗号分隔的列表，精确列出了x1，y1，x2，y2的4个位置值（例如，-3975、2280，-1930、4575）
    *位置“ 0,0,0,0”似乎是充电站的位置
    *值“ 1000”似乎是大约1米的距离

＃＃＃＃ 水位
*控制和显示水位（“低”，“中”，“高”和“最大”）

##消耗品
|名称|描述|
| --- | --- |
|过滤器|过滤器寿命|
| main_brush |主刷寿命|
|边刷|侧刷寿命|

##信息
|名称|描述|
| --- | --- |
|电池|电池|
| chargestatus |充电状态 |
| cleanstatus |清洁状态 |
|通讯协议| XMPP或MQTT |
| deviceClass | Deebot设备类|
| deviceName | Ecovacs应用程序中定义的设备名称|
| deviceStatus |设备状态|
|错误当前错误信息|

##适配器配置
|名称|描述|
| --- | --- |
|电邮|您的Ecovacs帐户使用的电子邮件地址|
|密码您的Ecovacs帐户使用的密码|
|国家代码（大陆）|选择预定义的国家代码（包括大陆）|
|设备编号|如果使用多个设备，则选择当前实例|
|点数| Ecovacs应用程序中定义的运动区域数（默认为`0`）|

##谢谢和感谢
* @joostth（[sucks.js]（https://github.com/joostth/sucks.js））
* @wpietri（[吸]（https://github.com/wpietri/sucks））
* @ bmartin5692（[sucks]（https://github.com/bmartin5692/sucks），[bumber]（https://github.com/bmartin5692/bumper））
* @Ligio（[ozmo]（https://github.com/Ligio/ozmo））

## Changelog

### 0.3.10
   * (mrbungle64) Improved support for XML based MQTT devices
   
### 0.3.9
   * (mrbungle64) Improved support for XML based MQTT devices

### 0.3.8
   * (boriswerner) Improved support for Ozmo 950 device
   * (mrbungle64) Implemented waterbox info (XMPP based devices)

### 0.3.7
   * (mrbungle64) Bugfix
   
### 0.3.6
   * (boriswerner) Basic clean & charge working (Ozmo 950)

### 0.3.5
   * (mrbungle64) Improved support for MQTT devices
   * (boriswerner) Improved support for Ozmo 950 device

### 0.3.4
* (mrbungle64) Feature Release
   * Implemented handling water level
   * Preparing for latest repo

### 0.3.3
* (mrbungle64) Feature release
   * Implemented lifespan values of components
   
### 0.3.2
* (mrbungle64) Feature release
   * Implemented spotArea buttons
   
### 0.3.1
* (mrbungle64) Feature release (alpha)
   * Implemented spotArea command
   * Implemented customArea command
   * Implemented playSound command
   
### 0.3.0
* (mrbungle64) alpha release

### 0.2.0
* (mrbungle64) Pre-release (alpha)

### 0.1.0
* (mrbungle64) Initial release (pre-alpha)

### 0.0.1
* (mrbungle64) Initial development release

## License
MIT License

Copyright (c) 2020 Sascha Hölzel <mrb1232@posteo.de>

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