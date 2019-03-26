---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nanoleaf-lightpanels/README.md
title: ioBroker.nanoleaf-lightpanels适配器
hash: neG9EXUZ60IWcgHatKc7HaIJoNcD1rvTGCM08MD/y2I=
---
![商标](../../../en/adapterref/iobroker.nanoleaf-lightpanels/admin/nanoleaf-lightpanels.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.nanoleaf-lightpanels.svg)
![下载](https://img.shields.io/npm/dm/iobroker.nanoleaf-lightpanels.svg)
![建立状态Travis](https://travis-ci.org/daniel-2k/ioBroker.nanoleaf-lightpanels.svg?branch=master)
![构建状态Appveyor](https://ci.appveyor.com/api/projects/status/29fjgn8ww5w96etq/branch/master?svg=true)
![NPM](https://nodei.co/npm/iobroker.nanoleaf-lightpanels.png?downloads=true)

#ioBroker.nanoleaf-lightpanels适配器=================
这是一个ioBroker适配器，通过nanoleaf OpenAPI控制nanoleaf Light Panels（以前的nanoleaf Aurora）或nanoleaf Canvas。

##与nanoleaf Light Panels / Canvas Controller的连接：
1.在适配器设置中，您必须设置nanoleaf控制器的IP地址和端口。 nanoleaf OpenAPI需要授权令牌来授予对REST-API的访问权限。如果您已经有一个，则可以在此处输入令牌并跳过下一步。
2.如果您没有授权令牌，则需要从nanoleaf OpenAPI请求它。

要执行此操作，请按住设备上的电源按钮5-7秒，将nanoleaf控制器设置为配对模式，直到LED交替闪烁。
然后在30秒内点击“获取授权令牌”按钮（配对模式在30秒后停止）。适配器必须正在运行！如果成功，则应在“Authentification token”字段中查看授权令牌。如果发生错误，您会弹出错误消息（您可以在日志中看到详细信息）。

3.保存设置。
4.玩得开心！

由于nanoleaf OpenAPI不支持长轮询或websockets，更新状态的唯一方法是轮询。
您可以在适配器设置中设置轮询间隔。

## Alexa
您可以通过ioBroker（云适配器）使用Alexa控制nanoleaf Light Panels / Canvas。
支持电源开/关，亮度，颜色和色温。
您必须设置数据点

*状态（电源开/关）
*色调（用于颜色）
*饱和度（颜色）
*亮度（颜色）
* colorTemp（色温）

在云适配器下的同一个smartname。

## IoBroker可视化
通过使用基本小部件作为“Radiobuttons开/关”或滑块来控制电源状态，亮度，色调，饱和度和色温状态，可以在ioBroker Visualization中控制nanoleaf Light Panels / Canvas。

对于效果，您可以使用“Select ValueList”小部件将其用作下拉列表，然后将effectsList状态映射到小部件的value和text属性（类型：“{nanoleaf-lightpanels.0.LightPanels.effectsList}” - >花括号很重要！）

要控制和可视化颜色，您必须安装颜色选择器样式窗口小部件。您可以将RGB ID映射到colorRGB状态，也可以使用三种HSV状态。

您可以使用github上/ vis子文件夹中的nanoleaf vis demo项目。

## Changelog

### 0.8.1 (2019-01-31)
* (daniel_2k) new: rhythm module mode (microphone/AUX input) can be changed
* (daniel_2k) changed: removed fixed effects *Solid* and *Dynamic* for Canvas because not supported
* (daniel_2k) fixed: Rhythm module information depending of connect state

### 0.8.0 (2019-01-27)
* (daniel_2k) changed: adapter has own nanoleaf-api lib (no dependency), because the nanoleaf-aurora-client module does not implement the nanoleaf API correctly (will be changed until this is fixed in the module)
* (daniel_2k) fixed: should now work properly with Canvas
* (daniel_2k) new: duration for brightness changes added (can be set in native part of brightness state)
* (daniel_2k) new: added compact mode
* (daniel_2k) changed: handling of device states
* (daniel_2k) fixed: command queue will not process when states are written which cannot be processed
* (daniel_2k) changed: some small code adjustments

### 0.7.0 (2019-01-20)
* (daniel_2k) new: compatible with nanoleaf Canvas
* (daniel_2k) changed: Rhythm module information is now obtained depended if it is connected or not (only Light Panels)
* (daniel_2k) changed: some small adjustments

### 0.6.1 (2018-10-13)
* (daniel_2k) fixed: command processing stopping when invalid RGB value is written to 'colorRGB'
* (daniel_2k) changed: more error logging of invalid values send to controller
* (daniel_2k) changed: adjusted types and roles

### 0.6.0 (2018-09-02)
* (daniel_2k) changed: processing commands in sequence (FIFO) ensuring that all commands are executed and avoiding hanging of the nanoleaf-controller sometimes

### 0.5.0 (2018-08-10)
* (daniel_2k) changed: automatically reconnect attemps will be done in any case of connection failures (fixes no reconnect when device hung and was restarted)
* (daniel_2k) new: default minimum values for polling intervals in adapter
* (daniel_2k) new: static effects 'Solid' and 'Dynamic' added to effect states
* (daniel_2k) changed: save settings in admin is only possible when all fields filled
* (daniel_2k) changed: optimized debug logging

### 0.4.1 (2018-07-13)
* (daniel_2k) added automatic testing via Travis and Appveyor
* (daniel_2k) preparations for official repository

### 0.4.0 (2018-06-11)
* (daniel_2k) changed: Authorization token will be obtained now in the adapter settings (not on adapter start)
* (daniel_2k) fixed: some texts in the old adapter settings (Admin2)
* (daniel_2k) new: State 'effect' now contains all possible states (auto updated)
* (daniel_2k) changed: updated AuroraAPI version to 1.2.2

### 0.3.0 (2018-05-12)
* (daniel_2k) new: state "ColorRGB" for controlling color with hex RGB values
* (daniel_2k) changed: updating states from API only when value changed
* (daniel_2k) changed: state effectsList will now be written as a semicolon seperated list to use it with "Select ValueList" widget in ioBroker visualization
* (daniel_2k) new: debug logging
* (daniel_2k) changed: set units for states "saturation" and "hue"

### 0.2.0 (2018-05-03)
* (daniel_2k) adjusted types and roles of states according API JSON response data types
* (daniel_2k) compatible with node.js 4.x

### 0.1.0 (2018-04-23)
* (daniel_2k) initial release

## License
The MIT License (MIT)