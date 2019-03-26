---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wm-bus/README.md
title: 无题
hash: bcgdW0CboxN5Utg+pXdL1OPVf7BRFiWefI38lZNV50A=
---
![商标](../../../en/adapterref/iobroker.wm-bus/admin/wm-bus.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.wm-bus.svg)
![测试](http://img.shields.io/travis/soef/ioBroker.wm-bus/master.svg)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![建立状态](https://ci.appveyor.com/api/projects/status/xg29a1r5dl00dq23?svg=true)

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