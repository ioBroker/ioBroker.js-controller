---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.habpanel/README.md
title: ioBroker.habpanel
hash: +hvha07fvSMhMIlRBRNxtzTIxMS5bvD0J/FKiUdUXNA=
---
![商标](../../../en/adapterref/iobroker.habpanel/admin/habpanel.png)

![安装数量](http://iobroker.live/badges/habpanel-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.habpanel.svg)
![下载](https://img.shields.io/npm/dm/iobroker.habpanel.svg)
![NPM](https://nodei.co/npm/iobroker.habpanel.png?downloads=true)

＃ioBroker.habpanel =================
HABPanel是基于OpenHAB HABpanel的ioBroker的轻量级仪表板界面。

它特别强大的嵌入式仪表板设计器允许在目标设备上轻松构建界面。

##安装
**重要！**此适配器无法直接从github安装。只有从npm。

＃＃ 入门
 - 在新浏览器或设备上首次访问HABPanel时，您应该看到一个相当空的屏幕 - 按照教程开始，然后单击右上角图标上的（或点击）。
 - 您现在处于编辑模式，出现了一个链接（_“添加新仪表板”_），以及一个_“高级设置”_链接。
 - 如果您以前使用过HABPanel并在服务器上存储了一些面板配置，请转到_“高级设置”_并单击您之前的配置 - 它将立即恢复。或者，创建您的第一个仪表板：单击/点击_“添加新仪表板”_链接并为其命名。
 - 单击/点击仪表板磁贴以进入仪表板编辑器
 - 添加您的第一个小部件：选择_“添加小部件”_菜单并选择小部件类型（假设Dummy  - 显示项目状态的简单小部件）
 - 通过拖放移动小部件并使用白色V形大小调整大小 - 当您单击小部件时它会出现
 - 点击小部件右上角的三个点以显示其上下文菜单，然后选择_“编辑...”_
 - 调整一些设置（名称，openHAB项目等）并确认您的更改
 - 单击/点击_Save_按钮保存配置
 - 单击/点击_Run_以查看仪表板的运行情况 - 使用浏览器的后退按钮或箭头返回绘图板
 - 一旦您对仪表板组感到满意，请返回_“高级设置”_然后单击/点击_“将当前配置保存到新的面板配置”_;这将如上所述将其存储在openHAB 2服务器上，并使其可供重用。

##截图
![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot0.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot1.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot2.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot3.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot4.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot5.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot6.png)

## Changelog

### 0.3.4 (2019-02-04)
* (janfromberlin) button widget did not handle primitive boolean commands
* (matthiasgasser) fix time series query start date, adapted end date

### 0.3.3 (2019-02-02)
* (janfromberlin) fix button toggle functionality for true/false

### 0.3.2 (2019-01-30)
* (foxthefox) chart and timeline functionality fixed

### 0.3.1 (2019-01-27)
* (foxthefox) chart and timeline functionality added

### 0.2.6 (2019-01-14)
* (jogibear9988) bugfix selection element

### 0.2.5 (2019-01-14)
* (jogibear9988) bugfix format strings

### 0.2.4 (2019-01-13)
* (jogibear9988) bugfix template widget

### 0.2.3 (2019-01-11)
* (jogibear9988) upgrade to current openhab version

### 0.1.7 (2017-05-20)
* (bluefox) add to welcome screen

### 0.1.6 (2017-05-15)
* (bluefox) initial commit