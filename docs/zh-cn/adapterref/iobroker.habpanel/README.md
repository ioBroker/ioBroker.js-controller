---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.habpanel/README.md
title: ioBroker.habpanel
hash: C89ICo0mYfQ8N2nXtMcdkM+wbs5ZDI8WBQuJ1t3kcdk=
---
![商标](../../../en/adapterref/iobroker.habpanel/admin/habpanel.png)

![安装数量](http://iobroker.live/badges/habpanel-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.habpanel.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.habpanel.svg)
![NPM](https://nodei.co/npm/iobroker.habpanel.png?downloads=true)

＃ioBroker.habpanel
HABPanel是基于OpenHAB HABpanel的ioBroker的轻量级仪表板界面。

它特别具有嵌入式仪表板设计器的功能，可轻松在目标设备上轻松构建界面。

##安装
**重要！**无法直接从github安装此适配器。仅来自npm。

＃＃ 入门
-在新的浏览器或设备上首次访问HABPanel时，应该显示一个相当空白的屏幕-按照教程进行操作，首先单击（或点击）右上角的图标。
-您现在处于编辑模式，出现了一个链接（_“添加新的仪表盘” _），以及一个_“高级设置” _链接。
-如果您以前使用过HABPanel并将某些面板配置存储在服务器上，请转到“高级设置” _，然后单击以前的配置-它会立即恢复。或者，创建您的第一个仪表板：单击/点击_“添加新仪表板” _链接并为其命名。
-单击/轻按仪表板磁贴以进入仪表板编辑器
-添加您的第一个小部件：选择_“添加小部件” _菜单，然后选择一个小部件类型（假设Dummy-一个显示项目状态的简单小部件）
-通过拖放移动小部件并使用白色V形燕尾形调整其大小-单击小部件时会显示
-点击窗口小部件右上角的三个点以显示其上下文菜单，然后选择_“编辑...” _
-调整一些设置（名称，openHAB项目等）并确认您的更改
-通过单击/点击_Save_按钮来保存配置
-单击/点击_Run_以查看操作中的仪表板-使用浏览器的后退按钮或箭头返回至绘图板
-对一组仪表板满意后，返回_“高级设置” _，然后单击/点击_“将当前配置保存到新的面板配置” _；它将如上所述将其存储在openHAB 2服务器上，并使其可重复使用。

##屏幕截图
![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot0.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot1.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot2.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot3.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot4.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot5.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot6.png)

## Changelog
### 0.4.3 (2020-08-22)
* (bluefox) The compatibility to socket.io 3.0.13 provided 

### 0.4.1 (2020-02-10)
* (Apollon77) compatibility to web 3.0

### 0.3.5 (2019-04-15)
* (yaming116) bugfix i18n

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

## License
Copyright 2017-2020 bluefox <dogafox@gmail.com>

Eclipse Public License