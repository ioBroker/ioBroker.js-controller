---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wm-bus/README.md
title: 无题
hash: 6njKhpGr6/kOA37w9bFfDaO2DkjSIZlXknJm5sm7v8M=
---
![商标](../../../en/adapterref/iobroker.wm-bus/admin/wm-bus.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.wm-bus.svg)
![测验](http://img.shields.io/travis/soef/ioBroker.wm-bus/master.svg)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![建造状态](https://ci.appveyor.com/api/projects/status/xg29a1r5dl00dq23?svg=true)

### IoBroker.wm-bus
***此适配器至少需要节点4.4 ***

####说明
无线M-Bus适配器

####信息
支持的USB适配器：

+[iM871A](http://www.wireless-solutions.de/products/gateways/wirelessadapter)+[CUL](http://shop.busware.de/product_info.php/products_id/29?osCsid=eab2ce6ef5efc95dbdf61396ca256b6e)+[琥珀色8465-M](https://www.amber-wireless.de/en/amb8465-m.html)

####配置
如果使用，则为用于解密消息的AES密钥。
制造商ID，类型和版本将在收到第一条消息后确定

####安装
在iobroker根目录中执行以下命令（例如，在/ opt / iobroker中）

```
npm install iobroker.wm-bus
```

＃＃＃＃ 要求
+[iM871A](http://www.wireless-solutions.de/products/gateways/wirelessadapter)USB记忆棒+或[CUL](http://shop.busware.de/product_info.php/products_id/29?osCsid=eab2ce6ef5efc95dbdf61396ca256b6e)USB记忆棒+ WM总线设备，例如[简易表](http://www.easymeter.com/)

## Changelog
### 0.3.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library