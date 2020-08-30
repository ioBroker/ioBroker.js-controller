---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.unifi/README.md
title: ioBroker.unifi
hash: uzAYLNiazFB+pRFLhUAVnrVOUtlnYN9uaWaHamOgHaE=
---
![商标](../../../en/adapterref/iobroker.unifi/admin/unifi.png)

![建立状态](https://travis-ci.org/iobroker-community-adapters/ioBroker.unifi.svg?branch=master)
![安装数量](http://iobroker.live/badges/unifi-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.unifi.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.unifi.svg)
![NPM](https://nodei.co/npm/iobroker.unifi.png?downloads=true)

＃ioBroker.unifi
此ioBroker适配器允许使用公共UniFi控制器Web-API监视和限制[UniFi设备](http://www.ubnt.com/)，例如UniFi WiFi接入点。

##配置
###最低要求信息
要启动此适配器并运行，需要以下信息：

* UniFi控制器的IP地址和端口（如果该控制器在UbiOS（例如UDM Pro）上运行，请将该端口留空）
*用户名和密码（不支持2FA）
*更新间隔

默认情况下，信息每60秒更新一次。根据您的ioBroker硬件和网络大小（客户端，UniFi设备等），建议不要进一步缩短间隔。

###过滤对象
适配器会从您的UniFi控制器中更新尽可能多的信息，但可以限制更新的信息。

可以禁用所选信息的更新或过滤该信息的特定对象。

|信息|可过滤的对象|
|-------------|-----------------------------------------|
|客户|名称，主机名，IP地址，MAC地址|
|设备|名称，IP地址，MAC地址|
|无线局域网|姓名|
|网络|姓名|
|健康|子系统|

＃＃ 控制
###启用/禁用WLAN
通过更改WLAN的“启用”状态，可以启用/禁用它。几秒钟后，更改将被提供给访问点。

###凭证创建
使用“ vouchers.create_vouchers”按钮可以创建预定义的凭单。可以配置将创建的凭证的数量，凭证的有效期限，还可以设置上传和下载的限制。

##缺少数据点
适配器使用[节点统一](https://github.com/jens-maus/node-unifi)连接到您的UniFi控制器。为简化起见，并非所有可用数据点都被拉到ioBroker中。如果缺少数据点，请使用以下URL检查API。 （注意：您必须用设置替换IP，PORT和SITE）

|信息| API URL |
|-------------|---------------------------------------------|
|网站| https：// IP：PORT / api / self / sites |
| SysInfo | https：// IP：PORT / api / s / SITE / stat / sysinfo |
|客户| https：// IP：PORT / api / s / SITE / stat / sta |
|设备| https：// IP：PORT / api / s / SITE / stat / device |
|无线局域网| https：// IP：PORT / api / s / SITE / rest / wlanconf |
|网络| https：// IP：PORT / api / s / SITE / rest / networkconf |
|健康| https：// IP：PORT / api / s / SITE / stat / health |
|优惠券| https：// IP：PORT / api / s / SITE / stat / voucher |
| DPI | https：// IP：PORT / api / s / SITE / stat / dpi |
|警报器| https：// IP：PORT / api / s / SITE / stat / alarm |

### UbiOS端点
|信息| API URL |
|-------------|------------------------------------------------------|
|网站| https：// IP / proxy / network / api / self / sites |
| SysInfo | https：// IP / proxy / network / api / s / SITE / stat / sysinfo |
|客户| https：// IP / proxy / network / api / s / SITE / stat / sta |
|设备| https：// IP / proxy / network / api / s / SITE / stat / device |
|无线局域网| https：// IP / proxy / network / api / s / SITE / rest / wlanconf |
|网络| https：// IP / proxy / network / api / s / SITE / rest / networkconf |
|健康| https：// IP / proxy / network / api / s / SITE / stat / health |
|优惠券| https：// IP / proxy / network / api / s / SITE / stat / voucher |
| DPI | https：// IP / proxy / network / api / s / SITE / stat / dpi |
|警报器| https：// IP / proxy / network / api / s / SITE / stat / alarm |

＃＃ 已知的问题
*客户端离线后，客户端的is_wired状态不正确。这是UniFi控制器的已知问题，与适配器无关。 （请参阅https://community.ui.com/questions/Wireless-clients-shown-as-wired-clients/49d49818-4dab-473a-ba7f-d51bc4c067d1）

＃＃ __工作正在进行中__
### 0.5.8（2020-08-29）
*（braindead1）修复了与未使用站点有关的问题
*（braindead1）修复了通过哨兵报告的一些错误

### 0.5.7（2020-07-27）
*（braindead1）修复了更新后未更新配置导致的Sentry错误

### 0.5.6（2020-07-25）
*（Scrounger，braindead1）已实施的警报，DPI和网关流量
*（braindead1）防止了由iOS MAC随机化引起的虚假客户端的创建
*（dklinger）实施了手动更新触发器
*（braindead1）已实施已用凭证的删除
*（braindead1）修复了通过哨兵报告的一些错误

### 0.5.5（2020-06-13）
*（braindead1）修复了通过哨兵报告的一些错误

### 0.5.4（2020-06-06）
*（braindead1）为is_online实现的偏移量
*（braindead1）修复了与is_online相关的一些问题
*（braindead1）准备客户的白名单等

### 0.5.2（2020-05-23）
*（jens-maus）已实现UniFiOS / UDM-Pro支持
*（braindead1）已实现启用/禁用WLAN的可能性
*（braindead1）已创建凭证
*（braindead1）为客户端实现了在线状态
*（braindead1）更新了客户端状态
*（braindead1）更新了设备状态
*（braindead1）改进了错误消息

### 0.5.0（2020-05-09）
*（braindead1）已实施更新配置
*（braindead1）改进了JsonLogic
*（braindead1）删除了旧代码
*（braindead1）实施哨兵

### 0.4.3（2020-04-24）
*（braindead1）修复了配置问题

### 0.4.2（2020-04-23）
*（braindead1）子系统问题已修复

### 0.4.1（2020-04-16）
*（braindead1）增强的重构

### 0.4.0（2020-04-16）
*（bluefox）重构

### 0.3.1
*（jens-maus）添加了对多站点环境的支持。

### 0.3.0
*（jens-maus）添加了访问设备数据查询，并将客户端设备移至“客户端”子树

### 0.2.1
*（jens-maus）次要修复

### 0.2.0
*（jens-maus）将lib / unifi.js移至专用的node-unifi nodejs类，并将其添加为依赖项。

### 0.1.0
*（jens-maus）实现了第一个基本可用的版本，该版本可以从UniFi控制器检索状态信息。

### 0.0.1
*（jens-maus）非工作开发版本的初始签入

##参考
该适配器使用以下第三方nodejs模块的功能：

* [node-unifi]（https://github.com/jens-maus/node-unifi）
* [json-logic-js]（https://github.com/jwadhams/json-logic-js）

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ## __WORK IN PROGRESS__
-->

## License
The MIT License (MIT)

Copyright (c) 2020 braindead1 &lt;os.braindead1@gmail.com&gt;
Copyright (c) 2016-2020 Jens Maus &lt;mail@jens-maus.de&gt;

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