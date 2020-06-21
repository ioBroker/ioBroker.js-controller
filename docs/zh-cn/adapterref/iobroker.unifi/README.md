---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.unifi/README.md
title: ioBroker.unifi
hash: 2iRaXeJCVFRqT9XiEjPhJSCp1bw0GULYKRt5m9Y2rVs=
---
![商标](../../../en/adapterref/iobroker.unifi/admin/unifi.png)

![建立状态](https://travis-ci.org/iobroker-community-adapters/ioBroker.unifi.svg?branch=master)
![安装数量](http://iobroker.live/badges/unifi-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.unifi.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.unifi.svg)
![NPM](https://nodei.co/npm/iobroker.unifi.png?downloads=true)

＃ioBroker.unifi
此ioBroker适配器允许使用公共UniFi控制器Web-API监视和限制对[UniFi设备](http://www.ubnt.com/)（例如UniFi WiFi接入点）的控制。

##配置
###最低要求信息
要启动此适配器并运行，需要以下信息：

* UniFi控制器的IP地址和端口
* 用户名和密码
*更新间隔

默认情况下，信息每60秒更新一次。根据您的ioBroker硬件和网络大小（客户端，UniFi设备等），不建议进一步缩短间隔。

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
适配器使用[节点统一](https://github.com/jens-maus/node-unifi)连接到您的UniFi控制器。为简化起见，并非所有可用数据点都被拉到ioBroker中。如果您缺少数据点，请使用以下URL来检查API。 （注意：您必须用设置替换IP，PORT和SITE）

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

＃＃ 已知的问题
*客户端离线后，客户端的is_wired状态不正确。这是UniFi控制器的已知问题，与适配器无关。 （请参阅https://community.ui.com/questions/Wireless-clients-shown-as-wired-clients/49d49818-4dab-473a-ba7f-d51bc4c067d1）

##参考
该适配器使用以下第三方nodejs模块的功能：

* [node-unifi]（https://github.com/jens-maus/node-unifi）
* [json-logic-js]（https://github.com/jwadhams/json-logic-js）

## Changelog
### __WORK IN PROGRESS__
* (Scrounger, braindead1) Implemented DPI

### 0.5.5 (2020-06-13)
* (braindead1) Fixed some errors reported via Sentry

### 0.5.4 (2020-06-06)
* (braindead1) Implemented offset for is_online
* (braindead1) Fixed some issues related to is_online
* (braindead1) Prepared whitelisting of clients etc.

### 0.5.2 (2020-05-23)
* (jens-maus) Implemented UniFiOS/UDM-Pro support
* (braindead1) Implemented possibility to enable/disable WLANs
* (braindead1) Implemented voucher creation
* (braindead1) Implemented online state for clients
* (braindead1) Updated client states
* (braindead1) Updated device states
* (braindead1) Improved error messages

### 0.5.0 (2020-05-09)
* (braindead1) Implemented configuration of updates
* (braindead1) Improved JsonLogic
* (braindead1) Removed legacy code
* (braindead1) Implemented Sentry

### 0.4.3 (2020-04-24)
* (braindead1) fixed configuration issue

### 0.4.2 (2020-04-23)
* (braindead1) subsystem issue fixed

### 0.4.1 (2020-04-16)
* (braindead1) Enhanced refactoring

### 0.4.0 (2020-04-16)
* (bluefox) Refactoring
  
### 0.3.1
* (jens-maus) added support for multi-site environments.

### 0.3.0
* (jens-maus) added access device data query and moved the client devices to the 'clients' subtree instead

### 0.2.1
* (jens-maus) minor fixes

### 0.2.0
* (jens-maus) moved `lib/unifi.js` to dedicated node-unifi nodejs class and added it as a dependency.

### 0.1.0
* (jens-maus) implemented a first basically working version which can retrieve status information from a UniFi controller.

### 0.0.1
* (jens-maus) initial checkin of non-working development version

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