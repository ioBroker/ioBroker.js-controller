---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/Pmant/ioBroker.botvac/edit/master//README.md
title: Neato Botvac Adapter
hash: VfgnY3yRgOnFfABjHM3CpUQmymouMY6j6pOGCVGAr/E=
adapter: true
license: undefined
authors: Pmant <patrickmo@gmx.de>
description: ioBroker neato botvac Adapter
keywords: botvac, neato
readme: https://github.com/Pmant/ioBroker.botvac/blob/master/README.md
mode: daemon
materialize: false
compact: false
published: 2016-07-24T22:08:47.215Z
version: 1.0.0
BADGE-安装数量: http://iobroker.live/badges/botvac-stable.svg
---
![商标](zh-cn/adapterref/iobroker.botvac/../../../en/adapterref/iobroker.botvac/admin/botvac.png)


＃ioBroker.botvac
##安装
 - 安装适配器
 - 填写您的Botvac用户凭据
 - 如果需要，更改轮询间隔（最小值为60）

##用法
 - 使用命令通道中的状态来控制您的Botvac
 - 使用状态通道中的can *状态来查看哪些命令有效
 - 状态通道中的所有状态都是只读的

＃＃ 例子
###清洁生态模式
 - 检查status.canStart是否为```true```
 - 将commands.eco设置为```true```
 - 将commands.clean设置为```true```

###清洁150厘米* 150厘米的斑点
 - 将Botvac放在所需位置的前面
 - 检查status.canStart是否为```true```
 - 将commands.spotHeight和commands.spotWidth设置为```150```
 - 将commands.cleanSpot设置为```true```

###返回基地
 -  status.dockHasBeenSeen必须是```true```
 -  Botvac必须处于暂停或停止状态（commands.stop / commands.pause）
 - 将commands.goToBase设置为```true```

## Changelog
### 0.5.0
- (Pmant) add readme
- (Pmant) change pollInterval to seconds
- (Pmant) change pollInterval min to 60 seconds

### 0.4.0
- (Pmant) reduce update calls (/dashboard)

### 0.3.0
- (Pmant) fix bug where Botvac is not connected to wifi

### 0.2.0
- (Pmant) update status after command
- (Pmant) update commands 

### 0.1.0
- (Pmant) inital commit

## License
The MIT License (MIT)