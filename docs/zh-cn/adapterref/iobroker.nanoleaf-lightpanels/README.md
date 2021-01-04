---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nanoleaf-lightpanels/README.md
title: ioBroker.nanoleaf-lightpanels适配器
hash: i+JgMJTd6a/CI3m4/mF4qoaX3UiBMFfPXnNlDbV8XDo=
---
![商标](../../../en/adapterref/iobroker.nanoleaf-lightpanels/admin/nanoleaf-lightpanels.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.nanoleaf-lightpanels.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.nanoleaf-lightpanels.svg)
![生成状态Travis](https://travis-ci.org/daniel-2k/ioBroker.nanoleaf-lightpanels.svg?branch=master)
![建置状态传送带](https://ci.appveyor.com/api/projects/status/29fjgn8ww5w96etq/branch/master?svg=true)
![NPM](https://nodei.co/npm/iobroker.nanoleaf-lightpanels.png?downloads=true)

＃ioBroker.nanoleaf-lightpanels适配器
=================

这是一个ioBroker适配器，可通过nanoleaf OpenAPI控制nanoleaf光面板（以前称为nanoleaf Aurora）或nanoleaf Canvas和Shape。

##连接到nanoleaf灯光面板/画布控制器：
1.在适配器设置中，您必须设置nanoleaf Controller的IP地址或主机名和端口。您可以使用搜索功能发现网络中的所有纳米叶设备。
2. nanoleaf OpenAPI需要授权令牌才能授予对OpenAPI的访问权限。如果已经拥有一个令牌，则可以在此处输入令牌，然后跳过下一步。
3.如果没有授权令牌，则需要从nanoleaf OpenAPI请求它。

为此，通过按住设备上的电源按钮5-7秒钟，直到LED交替闪烁，将nanoleaf Controller设置为配对模式。
然后在30秒内单击“获取授权令牌”按钮（配对模式在30秒后停止）。适配器必须正在运行！如果成功，则应该在“身份验证令牌”字段中看到授权令牌。如果发生错误，则会弹出带有错误消息的窗口（详细信息可以在日志中看到）。

4.保存设置。
5.玩得开心！

通过服务器发送事件（SSE）###直接状态更新
由于Light Panel固件版本> 3.1.0和Canvas固件版本> 1.1.0，因此服务器发送事件（SSE）可以用于直接状态更新。对于“画布和形状”设备，支持触摸事件。

_请注意：_要检测nanoleaf设备是否仍在运行，SSDP通知消息每60秒从nanoleaf设备发送一次。请确保您可以在端口1900上接收UDP多播消息（检查防火墙和路由）。否则，您将在适配器中收到有关连接已丢失的错误消息。如果您在保持生命方面遇到问题，请在管理设置中为nanoleaf适配器设置正确的适配器接口。
对于搜索设备，请确保可以在UDP端口5000上接收流量。
我注意到某些纳米叶设备突然停止发送SSDP通知消息，因此将不再检测到连接。这是纳米叶装置本身的问题。遇到此问题的人可以启用保持活动轮询机制，而不必使用其他适配器设置中的SSDP通知消息。

状态更新轮询间隔的设置仅影响使用较低固件版本的设备，在这些固件中，轮询用于状态更新，或者在其他适配器设置中禁用了SSE功能。

## Alexa
您可以通过ioBroker（云适配器）使用Alexa控制nanoleaf光面板/画布。
支持电源开/关，亮度，色度和色温。
您必须设置数据点

*状态（用于电源开/关）
*色相（用于颜色）
*饱和度（用于颜色）
*亮度（用于彩色）
* colorTemp（用于色温）

在云适配器中使用相同的智能名称。

## IoBroker可视化
可以在ioBroker可视化中通过使用基本小部件（例如“开/关单选按钮”）或用于控制功率状态，亮度，色相，饱和度和色温状态的滑块来控制ioBroker可视化中的nanoleaf光面板/画布。

对于效果，您可以使用“选择ValueList”小部件将其用作下拉列表，然后将effectsList状态映射到小部件的value和text属性（类型：“ {nanoleaf-lightpanels.0.LightPanels.effectsList}” ->大括号很重要！）

要控制和显示颜色，您必须安装颜色选择器样式的小部件。您可以将RGB ID映射到colorRGB状态，也可以使用三个HSV状态。

您可以使用在github上的/ vis子文件夹中找到的nanoleaf vis演示项目。

## Changelog

### 1.2.0 (2021-01-03)
* (daniel_2k) new: possibility to use polling for keep alive detection instead of SSDP notify messages (for nanoleaf devices which stop sending SSDP notify packages)
* (daniel_2k) changed: small internal adjustments

### 1.1.1 (2020-12-27)
* (daniel_2k) fixed: error in device detection

### 1.1.0 (2020-12-27)
* (daniel_2k) new: support nanoleaf Shapes

### 1.0.6 (2020-09-14)
* (daniel_2k) changed: force status update for Canvas touch events
* (daniel_2k) new: added debug logging of received data via SSE

### 1.0.5 (2020-09-13)
* (daniel_2k) fixed: touch channel was not created for nanoleaf devices (bug since 1.0.3)

### 1.0.4 (2020-09-06)
* (daniel_2k) new: adapter address can be choosen in adapter settings for interfacing binding issues
* (daniel_2k) changed: use fixed port 5000 for MSEARCH replies for easy setup in firewall

### 1.0.3 (2020-08-30)
* (daniel_2k) fixed: search nanoleaf devices does not work on clean install of adapter
* (daniel_2k) new: added update of effectsList via SSE
* (daniel_2k) new: ability to disable of using SSE (for nanoleaf devices that stops sending ssdp:alive messages)
* (daniel_2k) changed: display nanoleaf device name in admin search result list
* (daniel_2k) changed: using forked "node-upnp-ssdp" for fixing interface binding

### 1.0.2 (2020-07-06)
* (daniel_2k) fixed: detection of ssdp:alive notify message for Canvas (fix disconnect/connect issue)
* (daniel_2k) fixed: sending correct service type for discovery of Canvas devices (fixes no devices found for Canvas devices)
* (daniel_2k) changed: if unknown nanoleaf device is detected Canvas will be used as fallback and warning will be logged
* (daniel_2k) fixed: setting rhythmMode was not working

### 1.0.1 (2020-07-05)
* (daniel_2k) fixed: detection of firmware version for Canvas for enabling SSE (Canvas firmware > 1.1.0 required)

### 1.0.0 (2020-06-18)
* (daniel_2k) new: using server sent events (SSE) for getting updates instead of polling (firmware > 3.1.0 required)
* (daniel_2k) new: support touch events for Canvas
* (daniel_2k) new: searching devices in Admin is now possible
* (daniel_2k) changed: moved duration for brightness state to separate state (please note: duration of in native part of brightness state will no longer work)
* (daniel_2k) changed: some minor internal adjustments
* (daniel_2k) changed: removed Admin2 configuration page

### 0.8.2 (2019-08-02)
* (daniel_2k) fixed: effects with special characters (german umlauts) can now be set (fixes HTTP error code 422)
* (daniel_2k) changed: removed fixed effects *Solid* and *Dynamic* for all devices (works also no longer with Light Panels since firmware update)

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
Copyright (c) 2020 daniel_2k <daniel_2k@outlook.com>