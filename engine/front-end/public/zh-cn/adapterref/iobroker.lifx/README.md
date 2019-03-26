---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/foxthefox/ioBroker.lifx/edit/master//README.md
title: lifx
hash: S4fCQvdzkHOrq0MfE/tpd1WumFgBGsQZX2ufYygiWAM=
adapter: true
license: MIT
authors: foxthefox <foxthefox@wysiwis.net>
description: lifx灯适配器
keywords: lifx, light
readme: https://github.com/foxthefox/ioBroker.lifx/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2017-01-22T13:26:57.226Z
version: 0.1.0
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.lifx.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.lifx.svg
BADGE-建立状态: https://travis-ci.org/foxthefox/ioBroker.lifx.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.lifx.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.lifx/../../../en/adapterref/iobroker.lifx/admin/lifx_logo.png)


＃ioBroker.lifx
适用于ioBroker的Lifx适配器

##安装：
官方发布的版本

```javascript
npm install iobroker.lifx
```

来自github的实际版本：

```javascript
npm install https://github.com/foxthefox/ioBroker.lifx/tarball/master --production
```

##设置/配置：
 - 无需设置或配置，适配器自动检测灯泡

### Metro widget unreachable status
 -  metro-widget中无法访问状态的小图标是第一个通知对象
 -  object_id [0]是indicator.unreachable
 - 不是预设“真”，而是写“假”
 - 图标应为wifiColorRed.png
 - 水平偏移6应该可以正常工作

##可视化：
 - 使用lifx小部件

##对象
|对象|价值|设定|说明|
|--------|-------|:-:|--------|
| Bulb.state | boolean | x | true / false  - > ON / OFF |
| Bulb.colormode | boolean | x | color，white |
| Bulb.temp | value | x |色温2500 ... 9000 K |
| Bulb.hue | value | x | color 0 ... 360 |
| Bulb.sat | value | x |饱和度0 ... 100％|
| Bulb.bright | value | x | brightness 0 ... 100％|
| Bulb.online |布尔|  -  |真/假|

＃＃ 去做：
 - 如果在ioBroker外调整，则从灯中循环获取getState
 - 使用所有现有设置调整颜色值（亮度调整具有固定的80％饱和度并保持先前的色调设置;饱和度调整和色调调整具有固定的80％亮度）
 - 过渡时间
 - 波形
 - 使用meta.roles
 - 白色灯泡的对象

＃＃ 已知的问题
??

## Changelog
### 0.1.0
- compact mode
### 0.0.5
- adminv3
- noConfig -> no admin page anymore

### 0.0.4
- jqui widget with interactive colored slider

### 0.0.3
- metro widget
- jqui widget

### 0.0.2 
- change to node-lifx
- successful tested with 2 lamps and firmware 2.1

### 0.0.1 
- initial setup with lifx

## License

The MIT License (MIT)

Copyright (c) 2018 foxthefox <foxthefox@wysiwis.net>