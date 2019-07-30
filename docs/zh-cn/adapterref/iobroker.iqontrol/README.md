---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iqontrol/README.md
title: ioBroker.iqontrol
hash: /F04+i5U8jSzmrOw4XXGDC7UpGfsFlrFxQ/axAdbd9w=
---
![商标](../../../en/adapterref/iobroker.iqontrol/admin/iqontrol.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.iqontrol.svg)
![下载](https://img.shields.io/npm/dm/iobroker.iqontrol.svg)
![依赖状态](https://img.shields.io/david/sbormann/iobroker.iqontrol.svg)
![已知的漏洞](https://snyk.io/test/github/sbormann/ioBroker.iqontrol/badge.svg)
![NPM](https://nodei.co/npm/iobroker.iqontrol.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/sbormann/ioBroker.iqontrol/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/sbormann/ioBroker.iqontrol?branch=master&svg=true)

＃ioBroker.iqontrol
**测试：**

| Linux / Mac / Windows：|跨浏览器检查：|
| --- | --- |

\ **如果您喜欢，请考虑捐款：**

[![贝宝（https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LDHZMNPXKRX2N&source=url)

****

适用于ioBroker的## iqontrol适配器
用于可视化的快速Web应用程序。

![例](img/screenshot4.jpg)![例](../../../en/adapterref/iobroker.iqontrol/img/screenshot3.jpg)

在任何浏览器中运行。
您可以将其保存为iOS-Homescreen上的Web-App，它看起来和感觉就像一个原生应用程序。
它完全可定制。

＃＃ 你需要...
* Nodejs 8或更高版本
* socket.IO必须设置为“集成”，并且必须在Web适配器中禁用“强制Web套接字”

＃＃ 如何使用
*开始创建视图。

您可以将视图视为类似页面的内容。

*然后在这些视图上创建设备。

设备有一个角色，它决定了设备的功能，使用了哪些图标等等。
根据该角色，您可以将多个状态链接到设备。这些将为设备提供其功能。
如果选择“链接到其他视图”作为角色，则可以创建指向其他视图的链接。我建议将链接映射到具有相同背景的其他视图，链接视图具有。
您还可以尝试使用Autocreate-Function从iobroker-object-tree中选择现有设备。 Autocreate尝试找出角色并匹配尽可能多的状态。

*之后您可以创建一个工具栏，显示为页脚。

Toolbar-Entrys是视图的链接。
第一个工具栏条目将是您的“主视图”，将在开始时加载。

*为了给所有东西增添一种奇特的风格，你可以上传你自己的图像。

您可以将图像用作视图或设备的背景图像。
免费的内置演示壁纸来自www.pexels.com。

##论坛
访问[iobroker论坛](https://forum.iobroker.net/topic/22039/neuer-adapter-visualisierung-iqontrol)。

## URL-Parameters
*前端通过``http [s]：// <url或ip of iobroker>调用：<web适配器端口> / iqontrol / index.html``
    *``<web of port adapter>``通常是8082
*要打开指定的实例，可以添加``namespace = iqontrol。<instance-number>``作为URL参数
*要将指定视图作为主页打开，可以添加``home = <viewID>``作为URL参数

**例：**

*``https：//192.168.1.1：8082 / iqontrol / index.html？namespace = iqontrol.1＆home = iqontrol.1.Views.Living-Room``
    *注意大小写

##角色和相关状态的描述
每个设备都有一个角色，它定义了设备的功能。每个角色都会生成一组状态，这些状态可以链接到相应的io-broker状态。
如果使用auto-create-function，则可以从io-broker-object树中选择现有设备。 Autocreate尝试找出角色并匹配尽可能多的状态。
这仅适用于已知设备。对于未知设备，并为设备提供高级功能，您可以通过（+） - 按钮手动添加它们或编辑由自动创建创建的设备。
要编辑设备的角色和状态，请单击设备后面的铅笔。您将在下面找到角色和使用状态的简短描述：

###修改数据点配置
您可以通过iobroker的objects-tab中数据点后面的扳手图标修改数据点的配置。在这里你可以：

*设置Readonly-Flag
*设置反转（计划，尚未起作用）
*设置自己的单位
*设置或修改值列表

![CustomDialog调用](img/custom_call.png)![CustomDialog示例](../../../en/adapterref/iobroker.iqontrol/img/custom_dialog.png)

###一般状态：
每个角色都有以下三种状态：

* **ADDITIONAL_INFO** *array* - 数据点数组，将显示在信息对话框的底部
* **BATTERY** * boolean * - 当为true或* number * - 当小于10％时，将显示一个小电池空图标
* **ERROR** *boolean* - 如果为true，将显示一个小的感叹号图标
* **UNREACH** *boolean* - 如果为true，将显示一个小的无线图标

几乎所有角色都具有STATE和/或LEVEL状态。在大多数情况下，这代表了设备的主要功能。您可以为其分配以下类型的io-broker-states：

* *布尔*  - 如果可能，它将被翻译成有意义的文本，如'开/关'，'打开/关闭'或类似。如果单击图块的图标，它会尝试切换布尔值（例如打开或关闭灯光）。如果它不是只读的，它将在对话框中生成一个翻转开关。
* *number* - 将与相应的单位一起显示，并在对话框中生成滑块。
* *string* - 要显示的文本
* *value-list* - 将显示所选值。如果它没有写保护，它将在对话框中生成一个下拉菜单。
    *技术上，* value-list *是一个带有相应翻译列表的值，在数据点的'common.custom.iqontrol。<instance> .states'，'native.states'或'common.states'对象中定义：

````
"native": {
    "states": {"true": "Text for true", "false": "Text for false"},
    ...
}
````

    *您可以通过修改数据点来创建自己的值列表（iobroker的objects-tab中数据点后面的扳手图标，见上文）

但是，并非每种类型对每个角色都有意义。因此，在大多数情况下，开关的STATE将是一个布尔值，可以在打开和关闭之间切换。可能会显示一个字符串，但该开关将不起作用。

###链接到其他视图：
*没有其他州
* **linked-view-property** 接打开

### <img src="img/icons/switch_on.png" width="32">开关， <img src="img/icons/fan_on.png" width="32">风扇：
* **STATE** *boolean* - 显示和设置开/关状态
* **POWER** *数字* - 功耗将在右上角显示为小功率

### <img src="img/icons/light_on.png" width="32">光：
每个灯都可能具有以下一种或两种状态：

* **STATE** *boolean* - 显示和设置开/关状态
* **LEVEL** *number* - 显示和设置灯光的级别

可选您可以定义以下状态：

*对于彩色LED（HSB颜色空间）：
 ***HUE*** 字* - 0-360°光线的颜色（色调格式）
    * **饱和度**：*数量*  - 光线饱和度（从白色到纯色）
 ***COLOR_BRIGHTNESS*** 字* - 彩色LED的亮度（仅当灯具有彩色和白色LED时才会受到尊重。如果您只有一种LED，则亮度由LEVEL控制 - 州）
*对于白光LED：
 ***CT*** 字* - 光的色温，如果它有两种白色阴影
 ***WHITE_BRIGHTNESS*** 字* - 白色LED的亮度（仅当灯具有白色和彩色LED时才会受到尊重。如果您只有一种LED，则亮度由LEVEL控制 - 州）
*替代色彩空间：
 ***ALTERNATIVE_COLORSPACE_VALUE*** string ** number* 取决于选择的色彩空间） - 替代色彩空间的值

    如果您的设备不支持使用HUE，SATURATION和COLOR_BRIGHTNESS（HSB / HSV颜色空间），则可以使用各种替代颜色空间。在设备选项中，您可以选择以下颜色空间之一：

    * **RGB** / **#RGB** 您可以使用RGB格式（十六进制）代替使用HUE，SATURATION和COLOR_BRIGHTNESS，可选使用前导'＃'
    * **RGBW** / **#RGBW** 您可以使用RGBW格式（十六进制）代替使用HUE，SATURATION，COLOR_BRIGHTNESS和WHITE_BRIGHTNESS，可选使用前导'＃'
    * **RGBWWCW** / **#RGBWWCW** / **RGBCWWW** / **RGBCWWW** 您可以使用RGBWWCW-或RGBCWWW格式（十六进制）代替HUE，SATURATION，COLOR_BRIGHTNESS，CT和WHITE_BRIGHTNESS ，WW =暖白色，CW =冷白色），可选带前导'＃'
    * **RGB（仅限Hue）** /** #RGB（仅限Hue）**：您可以使用RGB（仅限Hue） - 格式（十六进制），可选使用前导'＃'，而不是使用HUE。在这种特殊情况下，RGB格式只接受色调 - 色环的纯饱和色。不允许混合白色。
        * **米尔的色调**：这是Milight-Devices的Hue-Value，在色调color-cirlce中使用另一个起点：

````
tHue = modulo(66 - (hue / 3.60), 100) * 2.55;
modulo(-3.60 * (MilightHue/2.55 - 66), 360);
on modulo(n, m){ return ((n % m) + m) %m; }
````

请记住：转换到替代颜色空间是由前端完成的，因此只有在某个地方打开iQontrol时它才会激活。因此，您不能将其用作颜色空间的转换器。为了避免会话循环，建议使用原始颜色空间 - 数据点（HUE，SATURATION，COLOR_BRIGHTNESS，CT，WHITE_BRIGHTNESS）*或*替代颜色空间 - 数据点以*替换*这些数据点。

*效果模式：
    * **效果**：*值列表*  - 播放的效果
* **EFFECT_NEXT** *boolean* - 如果设置为true，将播放下一个效果（作为不支持EFFECT值列表的设备的替代方案）
* **EFFECT_SPEED_UP** / **EFFECT_SPEED_DOWN** *布尔值* - 如果设置为true，效果会加快/减小
*杂项：
 ***POWER*** 字* - 功耗将在右上角显示为小功率

### <img src="img/icons/radiator.png" width="32">温控器：
* **SET_TEMPERATURE** *数字* - 目标温度
* **温度**：*数字*  - 实际温度在右上角显示为小
* **湿度**：*数字*  - 实际湿度在右上角显示为小
* **CONTROL_MODE** *value-list* - 显示并设置恒温器的模式
* **WINDOW_OPENING_REPORTING** *boolean* - 如果为true，则会显示一个小窗口
* **VALVE_STATES** 名称和数字数组 - 显示与恒温器相关的阀门开度

### <img src="img/icons/radiator.png" width="32"> Homematic，温控器：
除了普通恒温器，您还可以定义：

* **PARTY_TEMPERATURE** *string* - 特殊格式的字符串，用于定义家庭恒温器的派对或假日模式
* **BOOST_STATE** *number* - 显示homematic恒温器的剩余提升时间

### <img src="img/icons/temperature.png" width="32">温度感应器， <img src="img/icons/humidity.png" width="32">湿度传感器：
* **状态**：*数字*  - 将显示在设备下部的温度或湿度
* **温度**：*数字*  - 温度将在右上角显示为小
* **湿度**：*数字*  - 湿度将在右上角显示为小
* **linked-view-property** 接打开

### <img src="img/icons/brightness_light.png" width="32">亮度传感器：
* **状态**：*数字*  - 亮度将显示在设备的下半部分
* **亮度**：*数字*  - 亮度将在右上角显示为小亮度
* **linked-view-property** 接打开

### <img src="img/icons/motion_on.png" width="32">运动传感器：
* **STATE** *boolean* - 显示是否检测到运动
* **linked-view-property** 接打开

### <img src="img/icons/door_closed.png" width="32">门， <img src="img/icons/garagedoor_closed.png" width="32">车库门， <img src="img/icons/window_closed.png" width="32">窗口：
* **STATE** *boolean* - 显示门或窗是打开还是关闭。
    *或者，您可以指定*值列表*，以显示“倾斜”等其他状态。
    *您还可以指定*字符串*来显示任何文本，例如“3个窗口打开”或“全部关闭”。
*尊重** linked-view-property **

### <img src="img/icons/door_locked.png" width="32">带锁门：
* **STATE** *boolean* - 显示门是打开还是关闭。
* **LOCK_STATE** *boolean* - 显示门是锁定还是解锁
* **LOCK_STATE_UNCERTAIN** *boolean* - STATE将以斜体显示，如果为true则表示锁的确切位置未知
* **LOCK_OPEN** *boolean* - 如果设置为true，门将完全打开

### <img src="img/icons/blind_middle.png" width="32">盲：
* **等级**：*数字*  - 盲人的高度百分比
* **DIRECTION** *value-list* - 可以是Stop，Up和Down
* **STOP** *boolean* - 如果设置为true，盲人将停止
* **UP** / **DOWN** *boolean* - 如果设置为true，盲人将上/下（对于设备，使用UP和DOWN数据点而不是LEVEL）

### <img src="img/icons/fire_on.png" width="32">消防传感器：
* **STATE** *boolean* - 如果为true，传感器将显示为已触发
    *或者，您可以指定*值列表*，以显示“篡改”等其他状态。
    *您还可以指定一个*字符串*来显示任何文本，如“在楼上火”。
* **linked-view-property** 接打开

### <img src="img/icons/alarm_on.png" width="32">报警：
* **STATE** *boolean* - 如果为true，传感器将显示为已触发
    *或者，您可以指定*值列表*，以显示“篡改”等其他状态。
    *您还可以指定一个*字符串*来显示任何文本，如“在楼上火”。

### <img src="img/icons/battery_full.png" width="32">电池：
* **状态**：*数字*  - 电池电量百分比
* **CHARGING** *boolean* - 如果为true，则显示充电图标

### <img src="img/icons/value_on.png" width="32">值：
* **STATE** *any* - 要显示的任何有效状态（查看一般状态 - 部分）
* **LEVEL** *number* - 将在对话框中生成滑块

### <img src="img/icons/play_on.png" width="32">程序：
* **STATE** *boolean* - 如果设置为true，程序将启动

### <img src="img/icons/play.png" width="32">现场：
* **STATE** *boolean* - 显示场景是否有效。如果设置为true，则将启动场景

### <img src="img/icons/button.png" width="32">按钮：
* **状态**：*任何*  - 任何所需类型的状态
* **SET_VALUE** CONSTANT *string* - 这是一个常量（不是链接的io-broker-state！），如果按下按钮，它将被分配给STATE

### <img src="img/icons/popup.png" width="32">弹出：
* **状态**：*任何*  - 可用于显示更多信息
* **URL** CONSTANT *string* - 此url将在弹出窗口中以iframe方式打开
* **HTML** CONSTANT *string* - 如果未指定URL，此标记将显示在弹出窗口内

### <img src="img/icons/link.png" width="32">外部链接：
* **状态**：*任何*  - 可用于显示更多信息
* **URL** CONSTANT *string* - 此网址将被打开

##开发
*看看[前端的工作原理]（运营％20Principle％20of％20Frontend.md）

****

## Changelog

### 0.0.49 (2019-07-27)
* (Sebastian Bormann) Added common type and common role to custom dialog.
* (Sebastian Bormann) Added pressure menu for toolbar.

### 0.0.48 (2019-07-25)
* (Sebastian Bormann) Datapoint BATTERY can now be a level - the battery-empty-icon will be shown if value is less than 10%.
* (Sebastian Bormann) Added additional colorspaces for hue lights (RGB, RGBW, RGBWWCW, RGBCWWW, Milight-Hue, RGB Hue Only).
* (Sebastian Bormann) Added Garage Door.

### 0.0.47 (2019-07-22)
* (Sebastian Bormann) Added targetValueId inside custom datapoint configuration dialog wich allowes to have different datapoints vor actual value and for target value.
* (Sebastian Bormann) Added invert-flag inside custom datapoint configuration dialog.

### 0.0.46 (2019-07-20)
* (Sebastian Bormann) Added options to device configuration dialog.
* (Sebastian Bormann) Added readonly-flag to device options.
* (Sebastian Bormann) Added invert color temperature flag to device options for lights.
* (Sebastian Bormann) Added invert flag to device options for blinds.

### 0.0.45 (2019-07-15)
* (Sebastian Bormann) Devices are now zoomed to fit screen (configurable under options).

### 0.0.44
* (Sebastian Bormann) Fixed incomplete loading of admin page with some settings.
* (Sebastian Bormann) Added datapoint-configuration via custom-dialog.

### 0.0.43
* (Sebastian Bormann) Changed initialization of socket.io to an asynchronous process to wait for connection before trying to use file-operations.
* (Sebastian Bormann) Added general datapoint ADDITIONAL_INFO to display additional datapoints at the bottom of the info-dialog.
* (Sebastian Bormann) Fixed value list type conflict.

### 0.0.42
* (Sebastian Bormann) Adjusted pathes of demo-files.

### 0.0.41
* (Sebastian Bormann) Major Change: The location of the uploaded userimages has changed, so the images can be accessed by backup-function of iobroker - the images will be moved to the new location automatically - please open admin-page for ALL instances and save the settings to adjust the filenames of used images automatically.
* (Sebastian Bormann) Inverted colortemperature-scale for hue-lights (now it uses the mired-scale = micro reciprocal degree-scale instead of kelvin).
* (Ansgar Schulte) Added Up and Down Buttons to Blinds.
* (Sebastian Bormann) When creating a directory it will be entered.
* (Sebastian Bormann) Added Effect-Section to Light
* (Sebastian Bormann) If a state is not set yet, a standard value will be used

### 0.0.40
* (Sebastian Bormann) Appended missing conn.js in admin-folder.

### 0.0.39
* (Sebastian Bormann) Now file-operations in admin should work (file and directory renaming and deleting).
* (Sebastian Bormann) Added Image-Popup in admin.
* (Sebastian Bormann) Renamed demo-images.

### 0.0.38
* (Sebastian Bormann) Again changes to forced touch for gained compatibility.

### 0.0.37
* (Sebastian Bormann) Some more little changes to forced touch.
* (Sebastian Bormann) Added option to open a view via url by adding 'home=<viewId>' to url-parameters.

### 0.0.36
* (Sebastian Bormann) Added compatibility for some android devices to forced touch.
* (Sebastian Bormann) Changed the way hue and ct is displayed for better compatibility to some devices.

### 0.0.35
* (Sebastian Bormann) Fixed crash of frontend, if a device has no role and added info to admin to chose a role.
* (Sebastian Bormann) Removed filtering of states in select-id-dialog for autocreate.
* (Sebastian Bormann) Further improvments of forced touch with force-indicator and hopefully a better compatibility with more devices.

### 0.0.34
* (Sebastian Bormann) Added forced touch menu (press hard or press long on unsupported devices), wich will give more room for extended features in future.
* (Sebastian Bormann) Linked Views can now be set for all roles and are available in the dialog and by a forced touch.
* (Sebastian Bormann) Added timestamp for Window, Door, Fire, Temperature, Humidity, Brightness and Motion.
* (Sebastian Bormann) Fixed issure 49 (state for role switch if type is number).

### 0.0.33
* (Sebastian Bormann) Added WINDOW_OPENING_REPORTING to thermostat and homematic-thermostat.
* (Sebastian Bormann) Fixed marquee not always starting correctly.

### 0.0.32
* (Sebastian Bormann) Added Battery.
* (Sebastian Bormann) Heaters are displayed as inactive, if set-value is at its minimum.
* (Sebastian Bormann) Added meta.user object to allow backup of user uploaded files via iobroker backup.
* (Sebastian Bormann) Added check for existance of common.role before rendering view.

### 0.0.31
* (Sebastian Bormann) Fixed some typos.
* (Sebastian Bormann) Enhanced colour-mixing of light with seperate brightness-datapoints for color and white.
* (Sebastian Bormann) Rewritten rendering of view as praparation for further enhancements.
* (Sebastian Bormann) Rewritten rendering of dialog as praparation for further enhancements.
* (Sebastian Bormann) Added option to colorize Device-Texts.

### 0.0.30
* (Sebastian Bormann) Fixed io-package.json

### 0.0.29
* (Sebastian Bormann) changed parts of the code to be backward-compatible to older browsers like ie 11.
* (Sebastian Bormann) Now its possible to define a value list for a data point under .native.states wich will have a greater priority than a value list under .common.states. 
* (Sebastian Bormann) Updated dependency for axios to 0.0.19 to fix a scurity issue.

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