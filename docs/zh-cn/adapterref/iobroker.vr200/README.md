---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vr200/README.md
title: ioBroker.vr200
hash: o0F4IRoVxRDtI08RdgicrLLzwC7SnYFwzWHJXr/xiAw=
---
![商标](../../../en/adapterref/iobroker.vr200/admin/VR200.png)

![安装数量](http://iobroker.live/badges/vr200-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.vr200.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vr200.svg)
![特拉维斯-CI](https://travis-ci.org/Eisbaeeer/ioBroker.vr200.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.vr200.png?downloads=true)

＃ioBroker.vr200
这是botvac适配器的完整分支。唯一不同的是使用nicoh88中的corrosponding node-kobold模块。
我不是适配器的作者。我只改变了一些东西让VR200作为适配器运行。
完全尊重Pmant和nicoh88。

##安装
 - 安装适配器
 - 填写您的Vorwerk用户凭据
 - 如果需要，更改轮询间隔（最小值为60）

##用法
 - 使用命令通道中的状态来控制VR200
 - 使用状态通道中的can *状态来查看哪些命令有效
 - 状态通道中的所有状态都是只读的

＃＃ 例子
###清洁生态模式
 - 检查status.canStart是否为```true```
 - 将commands.eco设置为```true```
 - 将commands.clean设置为```true```

###清洁150厘米* 150厘米的斑点
 - 将VR200放在所需位置的前面
 - 检查status.canStart是否为```true```
 - 将commands.spotHeight和commands.spotWidth设置为```150```
 - 将commands.cleanSpot设置为```true```

###返回基地
 -  status.dockHasBeenSeen必须是```true```
 -  VR200必须处于暂停或停止状态（commands.stop / commands.pause）
 - 将commands.goToBase设置为```true```

## Changelog

### 0.1.0
- (Eisbaeeer) inital commit from Pmant�s adapter
### 0.2.0
- (Eisbaeeer) added Travis testing - no changes in code
### 0.3.0
- (Eisbaeeer) fixed issue #1 (status reachable)
### 1.0.0
- no changes. Went to stable release.

## License
The MIT License (MIT)