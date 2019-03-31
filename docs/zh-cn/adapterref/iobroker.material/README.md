---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.material/README.md
title: ioBroker.material
hash: Ulc3YoyyaWuA8XUEizcZKqEy12ZjA1yR1rUM1uQSmtc=
---
![商标](../../../en/adapterref/iobroker.material/admin/material.png)

![安装数量](http://iobroker.live/badges/material-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.material.svg)
![下载](https://img.shields.io/npm/dm/iobroker.material.svg)
![NPM](https://nodei.co/npm/iobroker.material.png?downloads=true)

＃ioBroker.material
React和Material UI界面。

![截图](../../../en/adapterref/iobroker.material/img/screenshot1.png)

##安装
**重要！**此适配器无法直接从github安装。只有从npm。

##用法
非常重要的是要知道，适配器仅显示添加到某些类别的设备，例如* rooms *或* function *。
如果每个设备都属于两个类别，那就更好因为每个设备都有类型和地点。

##支持的类型
### Switch
### Dimmer
＃＃＃ 媒体播放器
###卷
###组卷
＃＃ 去做
*凸轮（超额外适配器）
*事件（超额外适配器）
* 主屏幕
*图表
*窄菜单
* 吸尘器
*显示滑块指示位置的栏
*支持质量代码
*地图（OpensStreetMap）
* X秒后切换到默认屏幕
*信息中的订单状态
*在天气使用图标而不是文字

##学分
 - 使用flaticon的图标
 - 来自[here]的音量旋钮（https://codepen.io/blucube/pen/cudAz）作者：[Ed Hicks]（https://twitter.com/blucube） - 灵感来自[运球拍摄]（https：/ / [Riccar Salazar] /（https://twitter.com/rickss）/dribbble.com/shots/753124-Volume-Knob

## Changelog
### 0.10.6 (2019.01.29)
*  Added Chinese support

### 0.10.5 (2018.10.15)
* (bluefox) fix error with settings

### 0.10.3 (2018.09.02)
* (bluefox) implement color temperature
* (bluefox) implement cache of objects

### 0.10.1 (2018.09.02)
* (bluefox) GUI corrections
### 0.10.0 (2018.08.30)
* (bluefox) RGB was corrected

### 0.9.12 (2018.08.19)
* (bluefox) RGB was implemented

### 0.9.11 (2018.08.14)
* (bluefox) Fixed error with empty page

### 0.9.10 (2018.08.08)
* (bluefox) Crop of images was implemented
* (bluefox) Background of tiles is possible
* (bluefox) Double width of every tile is possible
* (bluefox) Group light control
* (bluefox) Custom URLs implemented

### 0.9.9 (2018.08.03)
* (bluefox) Order of tiles is implemented
* (bluefox) Support of dwd data

### 0.9.7 (2018.07.30)
* (bluefox) Implemented the weather widget

### 0.9.4 (2018.07.26)
* (bluefox) Bug-fixes

### 0.9.3 (2018.07.25)
* (bluefox) Many changes

### 0.9.2 (2018.07.21)
* (bluefox) Update logic was implemented (only with web 2.4.1)

### 0.9.1 (2018.07.20)
* (bluefox) Volume control was implemented

### 0.8.9 (2018.07.17)
* (bluefox) React app

### 0.5.7 (2018.01.24)
* (bluefox) Ready for cloud services

### 0.5.6 (2017.10.11)
* (bluefox) fix undefined names
* (bluefox) fix detection of switches

### 0.5.3 (2017.08.11)
* (bluefox) fix dimmer

### 0.5.2 (2017.07.30)
* (bluefox) fix action icons

### 0.5.1
* (bluefox) edit of visibility

## License
CC-BY-NC

Copyright (c) 2017-2018 bluefox <dogafox@gmail.com>

Commercial use is not allowed without permission.