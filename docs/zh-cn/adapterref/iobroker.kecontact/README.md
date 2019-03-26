---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.kecontact/README.md
title: 适用于KEBA KeContact墙盒的ioBroker适配器
hash: KqCnXeT45sZPgAY9INjY2pZ5QG76wcl5EA5ClvlbrcE=
---
![适配器徽标](../../../en/adapterref/iobroker.kecontact/admin/charger.png)

![安装数量](http://iobroker.live/badges/kecontact-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.kecontact.svg)
![下载](https://img.shields.io/npm/dm/iobroker.kecontact.svg)
![特拉维斯](https://img.shields.io/travis/UncleSamSwiss/ioBroker.kecontact.svg)
![AppVeyor构建状态](https://img.shields.io/appveyor/ci/UncleSamSwiss/iobroker-kecontact-fxdvr.svg)
![GitHub问题](https://img.shields.io/github/issues/UncleSamSwiss/ioBroker.kecontact.svg)

#ioBroker适配器用于KEBA KeContact wallbox
使用其UDP协议提供有关KEBA KeContact墙盒的当前状态的信息。

##安装
通过ioBroker管理员安装此适配器：

1.打开实例配置对话框
2.输入KEBA KeContact墙盒的IP地址
3.根据需要调整刷新间隔
4.保存配置
5.启动适配器

##配置
### KeContact IP地址
这是您的KEBA KeContact墙盒的IP地址。

＃＃＃ 刷新间隔
这是以秒为单位的间隔，应该为新值查询wallbox的频率。

默认值为30秒，这是KeConnect的负载与ioBroker中的最新信息之间的良好平衡。

##法律
该项目与KEBA AG公司没有直接或间接关联。

KeConnect是KEBA AG的注册商标。

## Changelog
### 0.1.0 (2019-01-12)
* (Apollon77) Updated CI testing, update basic files

### 0.0.3 (2017-07-04)
* (UncleSamSwiss) Improved UDP datagram sending
* (UncleSamSwiss) Added all known writable states

### 0.0.2 (2017-06-25)
* (UncleSamSwiss) Improved UDP socket handling (thanks to ehome)
* (UncleSamSwiss) Added reading all known states

### 0.0.1 (2017-06-11)
* (UncleSamSwiss) Initial version