---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iqontrol/README.md
title: 无题
hash: 7pR92s+CFBEhp650wrHpmMzulu2u6AostexQBUBBzOw=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.iqontrol.svg)
![下载](https://img.shields.io/npm/dm/iobroker.iqontrol.svg)
![依赖状态](https://img.shields.io/david/sbormann/iobroker.iqontrol.svg)
![已知的漏洞](https://snyk.io/test/github/sbormann/ioBroker.iqontrol/badge.svg)
![NPM](https://nodei.co/npm/iobroker.iqontrol.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/sbormann/ioBroker.iqontrol/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/sbormann/ioBroker.iqontrol?branch=master&svg=true)

<h1><img src="admin/iqontrol.png" width="64"/> ioBroker.iqontrol </h1>

适用于ioBroker的## iqontrol适配器
用于可视化的快速Web应用程序。

![例](img/screenshot1.jpg)![例](../../../en/adapterref/iobroker.iqontrol/img/screenshot2.jpg)

在任何浏览器中运行。
您可以将其保存为iOS-Homescreen上的Web应用程序，它看起来和感觉就像一个nativ应用程序。
它完全可定制。

＃＃ 你需要...
* Nodejs 8或更高版本
*必须在Web适配器中启用socketIO

＃＃ 如何使用
*开始创建视图。

您可以将视图视为类似页面的内容。

*然后在这些视图上创建设备。

设备有一个角色，它决定了设备的功能，使用了哪些图标等等。
根据该角色，您可以将多个状态链接到设备。这些将为设备提供其功能。
如果选择“链接到其他视图”作为角色，则可以创建指向其他视图的链接。我建议将链接映射到具有相同背景的其他视图，链接视图具有。
您还可以尝试使用Autocreate-Function从iobroker-object-tree中选择现有设备。 Autocreate尝试找出角色并尽可能多地匹配状态。

*之后您可以创建一个工具栏，它显示为页脚。

Toolbar-Entrys是视图的链接。
第一个工具栏条目将是您的“主视图”，将在开始时加载。

*为了给所有东西增添一种奇特的风格，你可以上传你自己的图像。

您可以将图像用作视图或设备的背景图像。
免费的内置演示壁纸来自www.pexels.com。

##知道问题
这是第一个alpha-Release，因此可能存在很多错误。但对我来说它完全稳定。
但是有一些限制：

 - 上传图像（作为背景图像或用于蒙皮设备按钮）有效，但重命名和删除不起作用
 - 创建和删除子目录也不起作用。

您可以在iobroker / iobroker-data / files / iqontrol / userimages下通过ftp手动执行这些操作

请随时发表评论，让我知道，如何解决这些问题！

访问[iobroker论坛](https://forum.iobroker.net/topic/22039/neuer-adapter-visualisierung-iqontrol)。

##角色和相关状态的描述
每个设备都有一个角色，它定义了设备的功能。每个角色都会生成一组状态，这些状态可以链接到相应的io-broker状态。
如果使用auto-create-function，则可以从io-broker-object树中选择现有设备。 Autocreate尝试找出角色并尽可能多地匹配状态。
这仅适用于已知设备。对于未知设备，并为设备提供高级功能，您可以通过（+） - 按钮手动添加设备或编辑由自动创建创建的设备。
要编辑设备的角色和状态，请单击设备后面的铅笔。您将在下面找到角色和使用状态的简短描述：

###一般状态：
每个角色都有以下三种状态：

* BATTERY：boolean  - 当为true时，将显示一个小电池空图标
*错误：布尔值 - 如果为true，将显示一个小的感叹号图标
* UNREACH：boolean  - 当为true时，将显示一个小的无线图标

几乎所有角色都具有STATE和/或LEVEL状态。在大多数情况下，这代表了设备的主要功能。您可以为其分配以下类型的io-broker-states：

* boolean  - 如果可能的话，它将被翻译成一个有意义的文本，如'开/关'，'打开/关闭'或类似。如果单击图块的图标，它会尝试切换布尔值（例如打开或关闭灯光）。如果它不是只读的，它将在对话框中生成一个翻转开关。
* number  - 将与相应的单位一起显示，并在对话框中生成滑块。
* string  - 要显示的文本
* value-list  - 将显示所选值。如果它没有写保护，它将在对话框中生成一个下拉菜单。从技术上讲，值列表是一个带有相应翻译列表的数字，在“native.states”属性中定义。

但是，并非每种类型对每个角色都有意义。因此，在大多数情况下，开关的STATE将是一个布尔值，可以在打开和关闭之间切换。可能会显示一个字符串，但该开关将不起作用。

###链接到其他视图：
*没有其他状态，但它会尊重链接视图属性

### <img src="img/icons/switch_on.png" width="32">开关， <img src="img/icons/fan_on.png" width="32">风扇：
* STATE：boolean  - 显示和设置开/关状态
* POWER：数字 - 功耗将在右上角显示为小功率

### <img src="img/icons/light_on.png" width="32">光：
每个灯都可能具有以下一种或两种状态：

* STATE：boolean  - 显示和设置开/关状态
* LEVEL：数字 - 显示设定灯光的水平

可选您可以定义以下状态：

* HUE：数字 - 灯光的颜色
* CT：数字 - 灯的色温
* POWER：数字 - 功耗将在右上角显示为小 - 但仅限于CT（如果未指定CT）（否则显示CT并忽略POWER）

### <img src="img/icons/radiator.png" width="32">温控器：
* SET_TEMPERATURE：数字 - 目标温度
*温度：数字 - 实际温度在右上角显示为小
*湿度：数字 - 实际湿度在右上角显示为小
* CONTROL_MODE：value-list  - 显示和设置恒温器的模式
* VALVE_STATES：名称和数字的数组 - 显示与恒温器相关的阀门百分比的开度

### <img src="img/icons/radiator.png" width="32"> Homematic，温控器：
除了普通恒温器，您还可以定义：

* PARTY_TEMPERATURE：string  - 特殊格式的字符串，用于定义家庭恒温器的派对假日模式
* BOOST_STATE：number  - 显示homematic恒温器的剩余提升时间

### <img src="img/icons/temperature.png" width="32">温度感应器， <img src="img/icons/humidity.png" width="32">湿度传感器：
*状态：数字 - 将显示在设备下部的温度或湿度
*温度：数字 - 温度将在右上角显示为小
*湿度：数字 - 湿度将在右上角显示为小
*尊重链接视图属性

### <img src="img/icons/brightness_light.png" width="32"> Brigthness-传感器：
* STATE：number  - 亮度，将显示在设备的下半部分
* BRIGHTNESS：数字 - 亮度将在右上角显示为小亮度
*尊重链接视图属性

### <img src="img/icons/motion_on.png" width="32">运动传感器：
* STATE：boolean  - 显示是否检测到运动
*尊重链接视图属性

### <img src="img/icons/door_closed.png" width="32">门， <img src="img/icons/window_closed.png" width="32">窗口：
* STATE：boolean  - 显示门或窗是打开还是关闭。
    * Alternativeley你可以指定一个值列表，以显示其他状态，如'倾斜'。
    *您还可以指定一个字符串来显示任何文本，如“3个窗口打开”或“全部关闭”。
*尊重linked-view-property

### <img src="img/icons/door_locked.png" width="32">带锁门：
* STATE：boolean  - 显示门是打开还是关闭。
* LOCK_STATE：布尔值 - 显示门是锁定还是解锁
* LOCK_STATE_UNCERTAIN：boolean  -  STATE将以斜体显示，如果为true则表示锁的确切位置未知
* LOCK_OPEN：boolean  - 如果设置为true，门将完全打开

### <img src="img/icons/blind_middle.png" width="32">盲：
* LEVEL：数字 - 盲人的高度百分比
* DIRECTION：value-list  - 可以是Stop，Up和Down
* STOP：布尔值 - 如果设置为true，盲人将停止

### <img src="img/icons/fire_on.png" width="32">消防传感器：
* STATE：boolean  - 如果为true，传感器将显示为已触发
    * Alternativeley你可以指定一个值列表，以显示“篡改”等其他状态。
    *您还可以指定一个字符串来显示任何文本，如“在楼上火”。
*尊重链接视图属性

### <img src="img/icons/alarm_on.png" width="32">报警：
* STATE：boolean  - 如果为true，传感器将显示为已触发
    * Alternativeley你可以指定一个值列表，以显示“篡改”等其他状态。
    *您还可以指定一个字符串来显示任何文本，如“在楼上火”。

### <img src="img/icons/value_on.png" width="32">值：
*状态：要显示的任何有效状态（查看一般状态 - 部分）
* LEVEL：数字 - 将在对话框中生成一个滑块

### <img src="img/icons/play_on.png" width="32">程序：
* STATE：boolean  - 如果设置为true，程序将启动

### <img src="img/icons/play.png" width="32">现场：
* STATE：boolean  - 如果场景处于活动状态，则显示。如果设置为true，则将启动场景

### <img src="img/icons/button.png" width="32">按钮：
*状态：任何 - 任何所需类型的州
* SET_VALUE：CONSTANT string  - 这是一个常量（不是链接的io-broker-state！），如果按下putton，它将被分配给STATE

### <img src="img/icons/popup.png" width="32">弹出：
* STATE：any  - 可用于显示更多信息
* URL：CONSTANT string  - 此url将在弹出窗口中以iframe方式打开
* HTML：CONSTANT字符串 - 如果未指定URL，此标记将显示在弹出窗口内

### <img src="img/icons/link.png" width="32">外部链接：
* STATE：any  - 可用于显示更多信息
* URL：CONSTANT字符串 - 此URL将被打开

##开发
*看看[前端的工作原理]（运营％20Principle％20of％20Frontend.md）

## Changelog

### 0.0.28
* (Sebastian Bormann) Added datapoint POWER to switch, fan and light.
* (Sebastian Bormann) Fixed marquee for small info texts in the upper right corner at big screen sizes.
* (Sebastian Bormann) Added more options for configuring header-colors and device-colors (experimental state). Text-color ist not configurable yet.

### 0.0.27
* (Sebastian Bormann) Added marquee (scrolling text) for long states and device names (can be configured  in options). 
* (Sebastian Bormann) Added more toolbar-options. 
* (Sebastian Bormann) Enhanced handling of value lists. 
* (Sebastian Bormann) Disabled swiping when dialog is opened.

### 0.0.26
* (Sebastian Bormann) Added brightness to motion-sensor.
* (Sebastian Bormann) Added options tab. You can now configure colors of toolbar.
* (Sebastian Bormann) Fixed rendering of constants.
* (Sebastian Bormann) Resized the demo-wallpapers for faster loading.

### 0.0.25
* (Sebastian Bormann) Added motion-sensor.
* (Sebastian Bormann) Added description, how the frontend works: [Operating Principle of Frontend](Operating%20Principle%20of%20Frontend.md).
* (Sebastian Bormann) Added dialog for editing constants like SET_VALUE, URL or HTML.
* (Sebastian Bormann) Changed the way arrays are stored.
* (Sebastian Bormann) Added submit-button for values of type string.
* (Sebastian Bormann) Added saturation to hue-lights.
* (Sebastian Bormann) Better icons for color-temperature and brightness-sensor.

### 0.0.24
* (Sebastian Bormann) Fixed jittering on Safari while scrolling (was related to Pull2Refresh).
* (Sebastian Bormann) System language of iobroker will be loaded and used.

### 0.0.23
* (Sebastian Bormann) Rewrote how constant values (instead of linkedStates) are handeled - this is a requirement for further development.
* (Sebastian Bormann) Fixed Pull2Refresh on android devices / chrome.
* (Sebastian Bormann) Added external links
* (Sebastian Bormann) Added popups with iframes

### 0.0.22
* (watcherkb) Improved german translation.
* (BramTown) Improved german translation.
* (Sebastian Bormann) Short after another coming reconnect-events (<5s) are ignored now.

### 0.0.21
* (Sebastian Bormann) Added Pull2Refresh on mobile devices - reloads whole page when pulling down on homepage, otherwise only the acual view is reloaded.
* (Sebastian Bormann) Improved reloading on reconnect (hoepefully to get it finally good working on iOS 12.2).

### 0.0.20
* (Sebastian Bormann) New trial to get it working in iOS 12.2.

### 0.0.19
* (Sebastian Bormann) Improved reloading of page in new PWA-Mode of iOS 12.2.

### 0.0.18
* (Sebastian Bormann) Improved fetching of VALVE_STATES.
* (Sebastian Bormann) Changed Button Icon.
* (Sebastian Bormann) Added Loading-Spinner if disconnected.
* (Sebastian Bormann) Due to new iOS 12.2 PWA-Mode added visibility-check and connectivity-check.
* (Sebastian Bormann) Added role-icons to role-selectbox in edit device dialog.
* (Sebastian Bormann) Fixed missing value-list for states of the type string.

### 0.0.17
* (Sebastian Bormann) Changed description of slider (level/dimmer/value/height).

### 0.0.16
* (Sebastian Bormann) Role of device is displayed in devices-table.
* (Sebastian Bormann) VALVE_STATES is now editable via GUI (show opening of valves associated with a thermostat in percentage).
* (Sebastian Bormann) Added Role 'Button': You can define a constant SET_VALUE wich will be written to the ID that is linked with STATE if the button is pressed.
* (Sebastian Bormann) Rewritten parts of front-end to guarentee better compatibility. Boost-Mode for Homematic-Thermostat should work now.
* (Sebastian Bormann) Added state BOOST_STATE for Homematic-Thermostat - ability to display remaining boost-time if in boost-mode.
* (Sebastian Bormann) Added dessription of roles and corresponding states.
* (Sebastian Bormann) Temperature und Humidity-Sensors can now display a STATE at bottom of device, and both, TEMPERATURE and HUMIDITY, in small in the upper right corner.
* (Sebastian Bormann) Better handling of Auto-Create of Temperature- und Humidity-Sensors.
* (Sebastian Bormann) German translation: 'geöffnet' lower case.
* (Sebastian Bormann) Zigbee humidity and temperature added to auto-creation.
* (Sebastian Bormann) Fixed not scrollable selectbox at devices tab.

### 0.0.15
* (Sebastian Bormann) Improved check for value type of states.
* (Sebastian Bormann) Improved slider-tooltip to lower font-size at large numbers.

### 0.0 14
* (Sebastian Bormann) If role of state is not further specified, then check for role of parent object.

### 0.0.13
* (Sebastian Bormann) Doors and Windows now force true/false to be translated to opened/closed.
* (Sebastian Bormann) Double Entrys on WelcomeScreen/Overview removed.
* (Sebastian Bormann) States are now set with the correct value type.
* (Sebastian Bormann) Changed recognition of state types. I hope there are no new bugs now!

### 0.0.12
* (Sebastian Bormann) Check for unallowed chars in object names.
* (Sebastian Bormann) Check for duplicates in view names.
* (Sebastian Bormann) Level fires a slider in dialog - even when it has a state list (HUE again :)).
* (Sebastian Bormann) Added Blinds (Homematic) - please test it, i don't have one to test.

### 0.0.11
* (Sebastian Bormann) Added compatibility for edge and firefox. 
* (Sebastian Bormann) Again Hue bugfixes.
* (Sebastian Bormann) Removed Tooltip from Toolbar.

### 0.0.10
* (Sebastian Bormann) Added ColorTemperature. Hoepfully HUE works now? Can't test ist, because i do not own any hue lamp :)

### 0.0.9
* (Sebastian Bormann) Philips HUE added to autocreate (colortemp is not working yet!).  
* (Sebastian Bormann) LinkedView now also works on windows, doors and fire-sensor.
* (Sebastian Bormann) Added translation (thanks ldittmar!).

### 0.0.8
* (Sebastian Bormann) Added icons to image selectboxes.

### 0.0.7
* (Sebastian Bormann) Changed order of tabs
* (Sebastian Bormann) Autocreate for shelly should work now (i hope so, can't test it here)

### 0.0.6
* (Sebastian Bormann) Improved speed of select id and autocreate
* (Sebastian Bormann) Set filter to channel on autocreate

### 0.0.5
* (Sebastian Bormann) Bugfix: creation of many devices schould work now

### 0.0.4
* (Sebastian Bormann) Bugfix: copy device created just a reference to old object
* (Sebastian Bormann) Addes Toolbar-Icons

### 0.0.3
* (Sebastian Bormann) various bugfixes

### 0.0.2
* (Sebastian Bormann) first partly running version

### 0.0.1
* (Sebastian Bormann) initial release

## License
MIT License

Copyright (c) 2019 Sebastian Bormann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.