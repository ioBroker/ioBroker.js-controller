---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/soef/iobroker.wm-bus/edit/master//README.md
title: Wireless M-Bus
hash: bcgdW0CboxN5Utg+pXdL1OPVf7BRFiWefI38lZNV50A=
adapter: true
license: MIT
authors: soef <soef@gmx.net>
description: Wireless M-Bus
keywords: ioBroker, m-bus, mbus, wm-bus, wireless m-bus, wireless mbus
readme: https://github.com/soef/iobroker.wm-bus/blob/master/README.md
mode: daemon
materialize: false
compact: false
published: 2016-02-13T14:06:42.570Z
version: 0.3.1
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.wm-bus.svg
BADGE-测试: http://img.shields.io/travis/soef/ioBroker.wm-bus/master.svg
BADGE-执照: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
BADGE-建立状态: https://ci.appveyor.com/api/projects/status/xg29a1r5dl00dq23?svg=true
---
![商标](zh-cn/adapterref/iobroker.wm-bus/../../../en/adapterref/iobroker.wm-bus/admin/wm-bus.png)


### IoBroker.wm-bus
***此适配器至少需要Node 4.4 ***

####说明
适用于无线M-Bus的适配器

####信息
支持的USB适配器：

+[iM871A](http://www.wireless-solutions.de/products/gateways/wirelessadapter)+[CUL](http://shop.busware.de/product_info.php/products_id/29?osCsid=eab2ce6ef5efc95dbdf61396ca256b6e)

####配置
如果使用，则使用AES密钥解密消息。
制造商ID，类型和版本将在第一次收到消息后确定

####安装
在iobroker根目录中执行以下命令（例如在/ opt / iobroker中）

```
npm install iobroker.wm-bus
```

＃＃＃＃ 要求
+a[iM871A](http://www.wireless-solutions.de/products/gateways/wirelessadapter)USBStick +或[CUL](http://shop.busware.de/product_info.php/products_id/29?osCsid=eab2ce6ef5efc95dbdf61396ca256b6e)USBStick + WM-Bus设备，例如[EasyMeter](http://www.easymeter.com/)

## Changelog
### 0.3.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library