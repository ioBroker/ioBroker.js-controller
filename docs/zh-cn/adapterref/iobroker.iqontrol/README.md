---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iqontrol/README.md
title: ioBroker.iqontrol
hash: J3EuVE+zZQ/jZpebcngfTcfVq90XvItMCYE74SafCbU=
---
![商标](../../../en/adapterref/iobroker.iqontrol/admin/iqontrol.png)

![安装数量](http://iobroker.live/badges/iqontrol-installed.svg)
![稳定版](http://iobroker.live/badges/iqontrol-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.iqontrol.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.iqontrol.svg)
![依赖状态](https://img.shields.io/david/sbormann/iobroker.iqontrol.svg)
![已知漏洞](https://snyk.io/test/github/sbormann/ioBroker.iqontrol/badge.svg)
![NPM](https://nodei.co/npm/iobroker.iqontrol.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/sbormann/ioBroker.iqontrol/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/sbormann/ioBroker.iqontrol?branch=master&svg=true)

＃ioBroker.iqontrol
**测试：**

| Linux / Mac / Windows：跨浏览器检查： |
| --- | --- |

\ **如果喜欢，请考虑捐赠：**

[![贝宝]（https://www.paypalobjects.com/zh_CN/DK/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LDHZMNPXKRX2N&source=url)

****

## IoBroker的iqontrol适配器
快速的Web应用程序以实现可视化。

![例](img/screenshot4.jpg)![例](../../../en/adapterref/iobroker.iqontrol/img/screenshot3.jpg)

在任何浏览器中运行。
它是完全可定制的。

##添加到主屏幕
您可以将其另存为主屏幕上的Web-App，它的外观和感觉就像是本机应用程序：![添加到Homescreeen](../../../en/adapterref/iobroker.iqontrol/img/add_to_homescreen.png)

＃＃ 你需要...
* Nodejs 8或更高版本
* Web适配器，其一个实例运行与admin-adapter，socket.IO相同的协议（http或https），并且IO设置为“集成”并且“强制Web-Sockets”禁用
    *如果与其他适配器冲突，只需添加具有上述设置的另一个实例-iQontrol将搜索最合适的web-adapter-instance并将其用于通信
*为了同时通过* iobroker.pro-Cloud *进行连接，应将admin-和web-adapter设置为http（而非https）

＃＃ 故障排除
*确保您已满足此页面顶部的“您需要...”部分
*如果更新后某些功能无法正常工作，请尝试以下步骤：
    *开始上传适配器：

    \
        ![上载](../../../en/adapterref/iobroker.iqontrol/img/adapter_upload.png)

*清除浏览器缓存
*重新启动ioBroker
*在浏览器打开的调试控制台中启动iQonrol（通常需要按F12键打开它），然后在控制台窗口中查找消息

##论坛
访问[iobroker论坛](https://forum.iobroker.net/topic/22039/neuer-adapter-visualisierung-iqontrol)。

＃＃ 如何使用
*开始创建视图。

您可以将视图视为类似于页面的内容。

*然后在这些视图上创建设备。

设备具有确定设备功能，使用哪些图标等的角色。
根据角色，您可以将多个状态链接到设备。这些将赋予设备其功能。
如果您选择“链接到其他视图”作为角色，则可以创建到其他视图的链接。我建议对链接到具有相同背景的其他视图的外观进行换肤。
您也可以尝试使用自动创建功能从iobroker-object-tree中选择现有设备。自动创建试图找出角色并匹配尽可能多的状态。

*之后，您可以创建一个工具栏，该工具栏显示为页脚。

工具栏条目是视图的链接。
第一个工具栏条目将是您的“主视图”，并将在启动时加载。

*要为所有内容提供精美的样式，您可以上传自己的图像。

您可以将图像用作背景图像或设备的背景图像。
文件夹“ / usericons”中的图像可用作设备图标。
免费的内置演示壁纸来自www.pexels.com。

## URL参数
*通过``http [s]：// <iobroker的URL或ip>：<Web适配器的端口> /iqontrol/index.html调用前端
    *``<网络适配器端口>''通常是8082
*要打开指定的实例，您可以添加“ namespace = iqontrol。<instance-number>”作为URL参数
*要打开指定的视图作为主页，可以添加“ home = <viewID>”作为URL参数

**例：**

*``https：//192.168.1.1：8082 / iqontrol / index.html？namespace = iqontrol.1＆home = iqontrol.1.Views.Living-Room``
    *注意大写和小写

##角色和相关状态的描述
每个设备都有一个角色，该角色定义了设备的功能。每个角色都会生成一组状态，这些状态可以链接到相应的io-broker状态。
如果使用自动创建功能，则可以从io-broker-object树中选择一个现有设备。自动创建试图找出角色并匹配尽可能多的状态。
这仅适用于已知设备。对于未知设备，以及要使设备具有高级功能，您可以通过（+）-按钮手动添加它们，或编辑由自动创建功能创建的设备。
要编辑设备的角色和状态，请单击设备后面的铅笔。您会在下面找到角色和使用状态的简短描述：

###修改数据点配置
您可以通过设备配置对话框或iobroker的objects-tab中数据点后面的扳手图标来修改数据点的配置。在这里您可以：

*设置只读标志
*设置反转标志
*设置Confirm-Flag（强制用户在将更改写入数据点之前进行确认）
*设置PIN码（强制用户在将更改写入数据点之前输入此PIN码-但要注意：这仅是低安全性，因为该密码是在前端检查的！使用数字显示全屏-pin-pad（如果要求输入代码）
*设置要写入目标值的数据点ID（如果实际值和目标值有不同的数据点）
*修改数据点的单位，以零，单数和复数分隔
*修改数据点的最小值和最大值
*修改数据点的类型
*修改数据点的角色
*设置或修改值列表

![CustomDialog调用](img/custom_call.png)![CustomDialog示例](../../../en/adapterref/iobroker.iqontrol/img/custom_dialog.png)

###一般状态：
每个角色具有以下三个状态：

* **ADDITIONAL_INFO** *array* 数据点的数组，将显示在信息对话框的底部
* **BATTERY** *布尔值*-为true或* number *-小于10％时，将显示少许电池电量图标
* **错误**：*布尔值*-为true时，将显示一些感叹号图标
* **UNREACH** *布尔值*-为true时，将显示一个小的无线图标

几乎所有角色都具有STATE和/或LEVEL状态。在大多数情况下，这代表了设备的主要功能。您可以为其分配以下类型的io-broker-states：

* *布尔值*-如果可能，它将被翻译为有意义的文本，例如“开/关”，“打开/关闭”或类似内容。如果单击图块的图标，它将尝试切换布尔值（例如，打开或关闭灯）。如果它不是只读的，它将在对话框中生成一个翻转开关。
* *数字*-将显示其对应的单位并在对话框中生成一个滑块
* *string* 要显示的文本
* *值列表*-将显示所选值。如果没有写保护，它将在对话框中生成一个下拉菜单
    *从技术上讲，“值列表”是具有相应转换列表的值，在数据点的“ common.custom.iqontrol。<instance> .states”，“ native.states”或“ common.states”对象中定义：

````
"native": {
    "states": {"true": "Text for true", "false": "Text for false"},
    ...
}
````

    *您可以通过修改数据点来创建自己的值列表（iobroker的objects-tab中数据点后面的扳手图标，请参见上文）

但是，并非每种类型对每个角色都有意义。因此，例如，在大多数情况下，开关的状态将为布尔值，以便可以在开和关之间进行切换。可能会显示一个字符串，但是该开关将不起作用。

###链接到其他视图：
*没有其他状态
* **链接视图属性**直接打开

### <img src="img/icons/switch_on.png" width="32">开关， <img src="img/icons/fan_on.png" width="32">风扇：
* **STATE** *布尔值*-显示和设置开/关状态
* **电源**：*数字*-功耗将在右上角以小号显示

### <img src="img/icons/button.png" width="32">按键：
* **STATE** *任何*-任何所需的状态类型
* **SET_VALUE** 常量*字符串*-这是一个常数（不是链接的io-broker-state！），如果按下按钮，它将分配给STATE
* **OFF_SET_VALUE** 常量*字符串*-这是一个常量（不是链接的io-broker状态！）。如果已定义，则将在in选项中定义的时间或100ms之后将STATE重置为该值。

### <img src="img/icons/light_on.png" width="32">光：
每个灯可能具有以下一种或两种状态：

* **STATE** *布尔值*-显示和设置开/关状态
* **LEVEL** *数字*-显示并设置灯光水平

可选，您可以定义以下状态：

*对于彩色LED（HSB颜色空间）：
    * **色调**：*数量*-0-360°的灯光颜色（色相格式）
    * **饱和度**：*数量*-光线的饱和度（从白色到纯色）
 ***COLOR_BRIGHTNESS*** 字*-彩色LED的亮度（如果您处于LEVEL状态且没有白色LED，则将忽略此亮度，因为亮度完全由LEVEL控制）
*对于白色LED：
 ***CT*** 字*-灯光的色温（如果有两个白色阴影）
 ***WHITE_BRIGHTNESS*** 字*-白色LED的亮度（如果您处于LEVEL状态且没有彩色LED，则将忽略此亮度，因为亮度完全由LEVEL控制）
*替代色彩空间：
 ***ALTERNATIVE_COLORSPACE_VALUE*** 符串*或*数字*（取决于所选的色彩空间）-替代色彩空间的值

    如果您的设备不支持使用HUE，SATURATION和COLOR_BRIGHTNESS（HSB / HSV颜色空间），则可以使用多种替代颜色空间。在设备选项中，可以选择以下颜色空间之一：

    * **RGB** / **RGB** 您可以使用RGB格式（十六进制），而不是使用HUE，SATURATION和COLOR_BRIGHTNESS，可选，前导'＃'
    * **RGBW** / **RGBW** 您可以使用RGBW格式（十六进制），而不是使用HUE，SATURATION，COLOR_BRIGHTNESS和WHITE_BRIGHTNESS，可选，并以'＃'开头
    * **RGBWWCW** / **RGBWWCW** / **RGBCWWW** / **RGBCWWW** 您可以使用RGBWWCW-或RGBCWWW-Format（十六进制）来代替HUE，SATURATION，COLOR_BRIGHTNESS，CT和WHITE_BRIGHTNESS ，WW =暖白，CW =冷白），可选，以“＃”开头
    * **RGB（仅色相）** /** RGB（仅色相）**：可以使用RGB（仅色相）格式（十六进制）替代使用HUE，并在前导'＃'处可选。在这种特殊情况下，RGB格式将仅接受色相色圆圈的纯饱和色。不允许混合白色
    * ** Milight的色相**：这是Milight设备的色相值，在色相色域中使用另一个起点：

````
tHue = modulo(66 - (hue / 3.60), 100) * 2.55;
modulo(-3.60 * (MilightHue/2.55 - 66), 360);
on modulo(n, m){ return ((n % m) + m) %m; }
````

切记：转换到替代色彩空间是由前端完成的，因此只有在iQontrol在某个地方打开时，它才处于活动状态。因此，您不能将其用作色彩空间的转换器。为了避免对话循环，建议您要么使用原始的色彩空间数据点（HUE，SATURATION，COLOR_BRIGHTNESS，CT，WHITE_BRIGHTNESS），要么使用替代色彩空间数据点来“替换”这些数据点。

*效果模式：
    * **效果**：*值列表*-播放效果
* **EFFECT_NEXT** *布尔值*-如果设置为true，则将播放下一个效果（作为不支持EFFECT值列表的设备的替代）
* **EFFECT_SPEED_UP** / **EFFECT_SPEED_DOWN** *布尔值*-如果设置为true，则效果将加快/降低
*其他：
    * **电源**：*数字*-功耗将在右上角以小号显示

### <img src="img/icons/radiator.png" width="32">温控器：
* **SET_TEMPERATURE** *数字*-目标温度
* **温度**：*数字*-实际温度在右上角以小号显示
* **湿度**：*数字*-实际湿度在右上角以小号显示
* **CONTROL_MODE** *值列表*-显示和设置恒温器的模式
* **WINDOW_OPENING_REPORTING** *布尔值*-如果为true，则显示一个打开的小窗口
* **VALVE_STATES** 名称和数字数组-显示与恒温器关联的阀门的开度

### <img src="img/icons/radiator.png" width="32">恒温器：
除常规恒温器外，您还可以定义：

* **PARTY_TEMPERATURE** *字符串*-特殊格式的字符串，用于定义恒温疗法的聚会或假期模式
* **BOOST_STATE** *数字*-显示恒温器的剩余启动时间

### <img src="img/icons/temperature.png" width="32">温度感应器， <img src="img/icons/humidity.png" width="32">湿度传感器：
* **STATE** *数字*-将在设备下部显示的温度或湿度
* **温度**：*数字*-温度将在右上角以小号显示
* **湿度**：*数字*-湿度将在右上角显示为小
* **链接视图属性**直接打开

### <img src="img/icons/brightness_light.png" width="32">亮度传感器：
* **STATE** *数字*-将在设备下部显示的亮度
* **亮度**：*数字*-亮度将在右上角以小号显示
* **链接视图属性**直接打开

### <img src="img/icons/motion_on.png" width="32">运动传感器：
* **STATE** *布尔值*-显示是否检测到运动
* **链接视图属性**直接打开

### <img src="img/icons/door_closed.png" width="32">门， <img src="img/icons/window_closed.png" width="32">窗口：
* **STATE** *布尔值*-如果门或窗户被打开或关闭，则显示
    *或者，您可以分配*值列表*，以显示其他状态，例如“倾斜”
    *您还可以分配* string *以显示任何文本，例如“ 3个打开的窗口”或“全部关闭”
*尊重**链接视图属性**

### <img src="img/icons/garagedoor_closed.png" width="32">车库门：
* **STATE** *布尔值*-显示门是打开还是关闭
    *或者，您可以分配*值列表*，以显示其他状态，例如“倾斜”
    *您还可以分配*字符串*以显示任何文本，例如“ 3扇门打开”或“全部关闭”
* **TOGGLE** *布尔值*-显示“切换”按钮，如果按下，则设置为true

### <img src="img/icons/door_locked.png" width="32">带锁门：
* **STATE** *布尔值*-显示门是打开还是关闭
* **LOCK_STATE** *布尔值*-显示门是否被锁定或解锁
* **LOCK_STATE_UNCERTAIN** *布尔值*-如果为true，则状态将以斜体显示，以表示锁的确切位置未知
* **LOCK_OPEN** *布尔值*-如果设置为true，则门将完全打开

### <img src="img/icons/blind_middle.png" width="32">盲：
* **等级**：*数量*-百叶窗高度
* **方向**：*值列表*-可以是停止，向上和向下。可以配置代表Stop，Up，Down和Unknown的值
* **STOP** *布尔值*-如果按下停止按钮，则设置为true
* ** UP ** / ** DOWN **：*布尔值*-如果按下向上/向下按钮（对于使用UP和DOWN数据点而不是LEVEL或除LEVEL之外的设备），则设置为true。另外，您可以通过** UP_SET_VALUE ** / ** DOWN_SET_VALUE **数据点定义一个值。如果已定义，则在按下“向上” /“向下”按钮时将发送此值而不是true
* ** FAVORITE_POSITION **：*布尔值*-可用于调出喜欢的位置。如果按下“收藏夹”按钮（可以在设备设置中配置按钮标题），则将true发送到该数据点。另外，您可以通过** FAVORITE_POSITION_SET_VALUE **数据点定义一个值。如果已定义，则当按下“收藏夹”按钮时，将发送此值而不是true
* **SLATS_LEVEL** *数量*-百叶板的位置百分比

### <img src="img/icons/fire_on.png" width="32">火灾传感器：
* **STATE** *布尔值*-如果为true，则传感器将显示为已触发
    *或者，您可以分配*值列表*，以显示其他状态，例如“篡改”
    *您还可以分配* string *来显示任何文本，例如“楼上的火”
* **链接视图属性**直接打开

### <img src="img/icons/alarm_on.png" width="32">报警：
* **STATE** *布尔值*-如果为true，则传感器将显示为已触发
    *或者，您可以分配*值列表*，以显示其他状态，例如“篡改”
    *您还可以分配* string *来显示任何文本，例如“楼上的火”
* **CONTROL_MODE** *值列表*-选择操作模式，例如“武装”和“撤防”
    *在设备选项中，您可以定义代表撤防的值，因此可以显示代表图标

### <img src="img/icons/battery_full.png" width="32">电池：
* **州**：*数字*-电池电量百分比
* **CHARGING** *布尔值*-如果为true，则显示一个充电图标
* **电源**：*数字*-功耗将在右上角以小号显示
* **VOLTAGE** *数字*-电压将在右上角以小号显示

### <img src="img/icons/value_on.png" width="32">值：
* **STATE** *任何*-要显示的任何有效状态（请查看“常规状态”部分）
* **等级**：*数字*-将在对话框中产生一个滑块

### <img src="img/icons/play_on.png" width="32">程序：
* **STATE** *布尔值*-如果设置为true，则程序将启动

### <img src="img/icons/play.png" width="32">现场：
* **STATE** *布尔值*-如果场景处于活动状态，则显示。如果设置为true，将开始场景

### <img src="img/icons/popup.png" width="32">弹出：
* **STATE** *任何*-可用于显示更多信息
* **URL** 常量*字符串*-该网址将作为iframe在弹出窗口中打开
* **HTML** 常量*字符串*-如果未指定URL，此标记将显示在弹出窗口内

### <img src="img/icons/link.png" width="32">外部链接：
* **STATE** *任何*-可用于显示更多信息
* **URL** 常量* string *-该URL将被打开

##开发中
*查看[前端的操作原理]（Operating％20Principle％20of％20Frontend.md）

****

## Changelo8
### 0.2.19（2020-02-29）
*（Sebastian Bormann）更新了依赖性。

### 0.2.18（2020-02-29）
*（Sebastian Bormann）更新了依赖性。

### 0.2.17（2020-02-29）
*（Sebastian Bormann）添加了选项，可通过单击视图，窗口，门，火，温度，湿度，亮度和运动的图块来打开对话框。
*（Sebastian Bormann）添加了用于隐藏设备（如果设备处于非活动状态）的选项（请谨慎处理，因为您可能无法再次打开它）。

### 0.2.16（2020-01-14）
*（Sebastian Bormann）固定了加热控制的自定义步骤。
*（Sebastian Bormann）已修复固定的通用弹出窗口，即使为空也是如此。

### 0.2.15（2020-01-07）
*（塞巴斯蒂安·鲍尔曼（Sebastian Bormann））添加了svg作为可能的图像进行上传。
*（Sebastian Bormann）使URL和HTML几乎对所有设备通用，以在对话框内部显示自定义html代码或url的内容（例如，可用于在对话框内部显示与设备相关的FLOT图形）。
*（Sebastian Bormann）修复了管理3.7.6+和js-controller <2.2的禁用自定义值。

### 0.2.14（2019-11-12）
*（Sebastian Bormann）固定了恒温器的图标切换功能。

### 0.2.13（2019-10-23）
*（塞巴斯蒂安·博尔曼（Sebastian Bormann））改进了“时间归还”方法。
*（Bluefox）修复了自定义对话框中的翻译。

### 0.2.12（2019-10-12）
*（Sebastian Bormann）改进了恒温器，以实现控制器2.0的兼容性。

### 0.2.11（2019-10-07）
*（Sebastian Bormann）重写了pincode部分，以与较旧的浏览器一起使用。
*（Sebastian Bormann）Pincode现在也适用于按钮。
*（Sebastian Bormann）修改了“返回时间后”功能，以与较旧的浏览器一起使用。
*（Sebastian Bormann）修复了iOS 13长压力菜单中缺少的条目。

### 0.2.10（2019-10-05）
*（Sebatian Bormann）增强的PIN码，用于在使用字母数字PIN时查看数字键盘。

### 0.2.9（2019-10-02）
*（Sebastian Bormann）在自定义数据点配置对话框（扳手图标）中添加了可选的PIN码。
*（Sebastian Bormann）添加了选项，可在设置的设置时间达到静止状态后返回到视图。

### 0.2.8（2019-09-27）
*（Sebastian Bormann）对index.js的进一步改进，以实现控制器2.0兼容性。

### 0.2.7（2019-09-27）
*（Sebastian Bormann）固定popup_width和popup_height。
*（Sebastian Bormann）对main.js和index.js进行了进一步改进，以实现控制器2.0兼容性。
*（Sebastian Bormann）为Button和Program添加了选项showState。

### 0.2.6（2019-09-24）
*（Sebastian Bormann）现在，在舍入数字值之后即可处理值的纯文本。
*（Sebastian Bormann）删除了Button的Icon_on。
*（Sebastian Bormann）修改了main.js，以实现controller 2.0兼容性。

### 0.2.5（2019-09-22）
*（Sebastian Bormann）调整了iOS 13的压力菜单处理。
*（Sebastian Bormann）添加了Buffer，用于在创建pressureMenue时渲染视图。
*（Sebastian Bormann）为电池增加了电源和电压。

### 0.2.4（2019-09-15）
*（Sebastian Bormann）进一步增强了自动恒温器的控制模式处理能力。
*（Sebastian Bormann）小错误修正。

### 0.2.3（2019-09-15）
*（Sebastian Bormann）进一步增强了自动恒温器的控制模式处理能力。
*（Sebastian Bormann）添加了对替代状态-属性语法的处理。

### 0.2.2（2019-09-14）
*（Sebastian Bormann）增强了恒温器控制模式的处理能力，以实现更大的兼容性。
*（Sebastian Bormann）当移动百叶窗和恒温器的滑块时，发送速度降低。

### 0.2.1（2019-09-07）
*（Sebastian Bormann）修复了后端崩溃（互换的index_m.html和custom_m.html）。

### 0.2.0（2019-09-06）
*（Sebastian Bormann）为盲人增加了板条水平。

### 0.1.15（2019-09-05）
*（Sebastian Bormann）在自定义对话框中添加了步骤，允许您定义值滑块的分辨率。
*（Sebastian Bormann）单位为％且从最小值到最大值为0-1的值现在缩放为0-100。
*（Sebastian Bormann）固定为色相灯转换为替代色空间。

### 0.1.14（2019-09-01）
*（Sebastian Bormann）修复了在对表进行排序或添加项目后图像丢失的下拉菜单的问题。
*（Sebastian Bormann）水平滑块将为较小值范围的数据点提供更高的分辨率。

### 0.1.13（2019-08-28）
*（Sebastian Bormann）修复了前端崩溃。
*（Sebastian Bormann）安全更新。

### 0.1.12（2019-08-28）
*（Sebastian Bormann）在弹出选项中添加了宽度和高度。
*（Sebastian Bormann）添加了用于定义免费CSS代码以修改前端的选项。
*（Sebastian Bormann）信息文本值现在显示为纯文本，如果数字则四舍五入。
*（Sebastian Bormann）在场景，程序和按钮的设备选项中添加了“执行后关闭对话框”。

### 0.1.11（2019-08-26）
*（Sebastian Bormann）修正了铬不透明过渡错误。
*（Sebastian Bormann）在选项页面上为文本输入的默认值添加了占位符。
*（Sebastian Bormann）为设备选项添加了默认图标和空白图标的占位符。
*（Sebastian Bormann）通过类型开关扩展了恒温器CONTROL_MODE。
*（Sebastian Bormann）修复了将恒温器与设定值用于非家用设备时的崩溃问题。
*（Sebastian Bormann）在自定义对话框中添加了最小值和最大值。
*（Sebastian Bormann）现在，您可以将任何设备都不设置为活动设备的设备背景图像（以前是从不活动设备中复制的，以实现向后兼容的原因）。

### 0.1.10（2019-08-20）
*（Sebastian Bormann）现在，如果自定义对话框中的value为零或value为1，则可以定义不同的单位。
*（Sebastian Bormann）通过新的下拉菜单更改图像时，保存按钮将立即被激活。
*（Sebastian Boramnn）添加了选项，以在设备处于活动状态或非活动状态时删除图块的覆盖。
*（Sebastian Bormann）将booelan转换为数字时的增强转换功能。
*（Sebastian Bormann）修复了图像文件的重命名（现在还正确重命名了已使用图像的链接）。
*（Sebastian Bormann）固定处理图像文件名中的空格。

### 0.1.9（2019-08-18）
*（Sebastian Bormann）修改了缓存清单以从日志中删除EISDIR错误。
*（Sebastian Bormann）固定了压力菜单中的切换输入。
*（Sebastian Bormann）添加了多个文件上传到图像选项卡。
*（Sebastian Bormann）添加了保存设置时检查指向其他视图的无效链接。
*（Sebastian Bormann）现在，您可以将外部URL分配给背景图像和图标（例如，添加天气实时地图）。
*（Sebastian Bormann）删除了值和程序的选项clickOnIconOpensDialog和clickOnTileToggles，因为它们是不可切换的。
*（Sebastian Bormann）在按钮上添加了OFF_SET_VALUE和选项“在[ms]之后返回到OFF_SET_VALUE”。

### 0.1.8（2019-08-11）
*（Sebastian Bormann）通过iobroker.pro进行连接时的进一步改进。
*（Sebastian Bormann）现在显示COLOR_BRIGHTNESS和WHITE_BRIGHTNESS，如果在色相灯光上未定义LEVEL。
*（Sebastian Bormann）添加了字体的缩略图预览。
*（Sebastian Bormann）在设备选项中添加了clickOnIconOpensDialog和clickOnTileToggles。

### 0.1.7（2019-08-11）
*（Sebastian Bormann）在工具栏，标题，设备名称，设备状态和设备信息文本的选项中添加了字体系列，-size，-weight和-style。
*（Sebastian Bormann）在工具栏的选项中增加了icon-size，icon-background-size和icon-background-corner-size。

### 0.1.6（2019-08-08）
*（Sebastian Bormann）接下来尝试通过iobroker.pro连接

### 0.1.5（2019-08-06）
*（Sebastian Bormann）在选项中添加了验证。
*（Sebastian Bormann）扩展了警报，带有CONTROL_MODE-数据点和用于撤防，布防和触发的图标。
*（Sebastian Bormann）为节省内存，仅将已使用状态保存在本地内存中（在保存所有已使用状态和所有更新状态之前）。
*（Sebastian Bormann）优化了socket-connectionLink，尝试通过iobroker.pro进行连接。

### 0.1.4（2019-08-04）
*（Sebastian Bormann）优化了瓷砖的褪色。
*（Sebastian Bormann）如果未定义向上/向下按钮，则将切换按钮添加到盲孔。
*（Sebastian Bormann）在admin中添加了对套接字协议的检测。
*（Sebastian Bormann）在自定义数据点配置对话框中添加了确认标志，以允许要求用户在更改值之前进行确认。
*（Sebastian Bormann）在车库门上添加了切换按钮。

### 0.1.3（2019-08-01）
*（Sebastian Bormann）为活动设备添加了单独的背景图像。
*（Sebastian Bormann）修复了活动和非活动设备磁贴的背景选项（颜色和不透明度）。
*（Sebastian Bormann）在视图底部增加了更多空间。
*（Sebastian Bormann）固定了百叶窗的反转电平。
*（Sebastian Bormann）以可折叠布局组织选项。

### 0.1.2（2019-07-29）
*（Sebastian Bormann）为盲人添加了FAVORITE_POSITION（具有可配置的按钮标题）和UP，DOWN和FAVORITE_POSITION的SET_VALUE。
*（Sebastian Bormann）在图标配置中添加了“无图标”作为选项。
*（Sebastian Bormann）将图标添加到“链接到其他视图”。
*（Sebastian Bormann）添加了一堆新的标准图标。

### 0.1.1（2019-07-28）
*（Sebastian Bormann）添加了用户图标。

### 0.1.0 **稳定**（2019-07-27）
*（Sebastian Bormann）第一次稳定发布。
*（Sebastian Bormann）在设备选项中添加了显示时间戳，以选择默认行为，并在对话框中显示一个小的时间戳图标以显示和隐藏时间戳。
*（Sebastian Bormann）修复了Homematic温控器控制模式的只读处理。

### 0.0.49（2019-07-27）
*（Sebastian Bormann）在自定义对话框中添加了通用类型和通用角色。
*（Sebastian Bormann）添加了工具栏的压力菜单。

### 0.0.48（2019-07-25）
*（Sebastian Bormann）Datapoint BATTERY现在可以是一个级别-如果值小于10％，则将显示电池电量图标。
*（Sebastian Bormann）为色相灯（RGB，RGBW，RGBWWCW，RGBCWWW，Milight-Hue，仅限RGB色相）添加了其他色彩空间。
*（Sebastian Bormann）添加了车库门。

### 0.0.47（2019-07-22）
*（Sebastian Bormann）在自定义数据点配置对话框中添加了targetValueId，从而允许具有不同的数据点，例如实际值和目标值。
*（Sebastian Bormann）在自定义数据点配置对话框中添加了反转标志。

### 0.0.46（2019-07-20）
*（Sebastian Bormann）在设备配置对话框中添加了选项。
*（Sebastian Bormann）在设备选项中添加了只读标志。
*（Sebastian Bormann）在设备的灯光选项中添加了反转色温标志。
*（Sebastian Bormann）将反转标志添加到百叶窗的设备选项中。

### 0.0.45（2019-07-15）
*（塞巴斯蒂安·鲍尔曼（Sebastian Bormann））设备现在已缩放为适合屏幕大小（可在选项下配置）。

### 0.0.44
*（Sebastian Bormann）修复了某些设置无法完全加载管理页面的问题。
*（Sebastian Bormann）通过自定义对话框添加了数据点配置。

### 0.0.43
*（Sebastian Bormann）将socket.io的初始化更改为异步过程，以等待连接，然后再尝试使用文件操作。
*（Sebastian Bormann）添加了常规数据点ADDITIONAL_INFO，以在信息对话框的底部显示其他数据点。
*（Sebastian Bormann）固定值列表类型冲突。

### 0.0.42
*（Sebastian Bormann）调整了演示文件的路径。

### 0.0.41
*（Sebastian Bormann）重大更改：上载的用户图像的位置已更改，因此可以通过iobroker的备份功能访问图像-图像将自动移动到新位置-请打开所有实例的管理页面，并保存设置以自动调整使用图像的文件名。
*（Sebastian Bormann）反转色温的色温刻度（现在它使用的是mired刻度=微倒数刻度而不是kelvin）。
*（Ansgar Schulte）向窗帘添加了向上和向下按钮。
*（Sebastian Bormann）创建目录时，将输入该目录。
*（塞巴斯蒂安·博尔曼（Sebastian Bormann））为灯光添加了效果部分
*（Sebastian Bormann）如果尚未设置状态，将使用标准值

### 0.0.40
*（Sebastian Bormann）在管理文件夹中追加了缺少的conn.js。

### 0.0.39
*（Sebastian Bormann）现在，admin中的文件操作应该可以正常工作（文件和目录的重命名和删除）。
*（Sebastian Bormann）在管理员中添加了Image-Popup。
*（Sebastian Bormann）重命名了演示图像。

### 0.0.38
*（Sebastian Bormann）再次更改为强制触摸以获得兼容性。

### 0.0.37
*（Sebastian Bormann）对强制触摸进行了一些小的更改。
*（Sebastian Bormann）添加了通过在URL参数中添加“ home = <viewId>”来通过URL打开视图的选项。

### 0.0.36
*（Sebastian Bormann）添加了对某些Android设备的强制触摸兼容性。
*（Sebastian Bormann）更改了色调和ct的显示方式，以便更好地与某些设备兼容。

### 0.0.35
*（Sebastian Bormann）修复了前端崩溃的问题，如果设备没有角色，并且向管理员添加了信息以选择角色。
*（Sebastian Bormann）删除了select-id-dialog中用于自动创建的状态过滤。
*（Sebastian Bormann）进一步改进了带有压力指示器的强制触摸，并希望与更多设备更好地兼容。

### 0.0.34
*（Sebastian Bormann）添加了强制触摸菜单（在不受支持的设备上长按或长按），这将为将来的扩展功能提供更多空间。
*（Sebastian Bormann）现在可以为所有角色设置链接视图，并且可以在对话框中通过强制触摸来使用它们。
*（Sebastian Bormann）添加了窗户，门，火，温度，湿度，亮度和运动的时间戳。
*（Sebastian Bormann）固定问题49（类型为数字时角色切换的状态）。

### 0.0.33
*（Sebastian Bormann）将WINDOW_OPENING_REPORTING添加到恒温器和homematic-恒温器中。
*（塞巴斯蒂安·博尔曼（Sebastian Bormann））修复了选框无法始终正确启动的问题。

### 0.0.32
*（Sebastian Bormann）添加了电池。
*（Sebastian Bormann），如果设定值最小，加热器将显示为非活动状态。
*（Sebastian Bormann）添加了meta.user对象，以允许通过iobroker备份来备份用户上传的文件。
*（Sebastian Bormann）在渲染视图之前添加了对common.role是否存在的检查。

### 0.0.31
*（Sebastian Bormann）修正了一些错字。
*（Sebastian Bormann）增强了光的颜色混合以及单独的亮度数据点（用于颜色和白色）。
*（Sebastian Bormann）将视图渲染重写为基本特性，以进行进一步的增强。
*（Sebastian Bormann）重写了对话框的渲染，将其作为进一步的增强。
*（Sebastian Bormann）添加了为设备文本着色的选项。

### 0.0.30
*（Sebastian Bormann）固定io-package.json

### 0.0.29
*（Sebastian Bormann）更改了部分代码，使其与旧版浏览器（例如11）向后兼容。
*（Sebastian Bormann）现在，可以为.native.states下的数据点定义值列表，而其优先级高于.common.states下的值列表。
*（Sebastian Bormann）将axios的依赖关系更新为0.0.19，以解决问题。

### 0.0.28
*（Sebastian Bormann）添加了数据点POWER来开关，风扇和照明。
*（Sebastian Bormann）修复了大屏幕尺寸时右上角的小信息文本的选框。
*（Sebastian Bormann）添加了更多用于配置标题颜色和设备颜色（实验状态）的选项。文本颜色ist尚未配置。

### 0.0.27
*（Sebastian Bormann）为长状态和设备名称（可以在选项中配置）添加了字幕（滚动文本）。
*（Sebastian Bormann）添加了更多工具栏选项。
*（Sebastian Bormann）增强了对价目表的处理。
*（Sebastian Bormann）在打开对话框时禁用了滑动。

### 0.0.26
*（Sebastian Bormann）为运动传感器增加了亮度。
*（Sebastian Bormann）添加了选项选项卡。现在，您可以配置工具栏的颜色。
*（Sebastian Bormann）修复了常量的呈现。
*（Sebastian Bormann）调整了演示墙纸的大小，以加快加载速度。

### 0.0.25
*（Sebastian Bormann）添加了运动传感器。
*（Sebastian Bormann）添加了有关前端如何工作的描述：[前端的操作原理]（Operating％20Principle％20of％20Frontend.md）。
*（Sebastian Bormann）添加了用于编辑常量（如SET_VALUE，URL或HTML）的对话框。
*（Sebastian Bormann）更改了数组的存储方式。
*（Sebastian Bormann）为字符串类型的值添加了提交按钮。
*（Sebastian Bormann）在色相光中增加了饱和度。
*（Sebastian Bormann）更好的色温和亮度传感器图标。

### 0.0.24
*（Sebastian Bormann）修复了滚动时Safari上的抖动（与Pull2Refresh有关）。
*（Sebastian Bormann）将加载并使用iobroker的系统语言。

### 0.0.23
*（Sebastian Bormann）重写了如何处理常量值（而不是linkedStates）-这是进一步开发的要求。
*（Sebastian Bormann）修复了Android设备/ Chrome上的Pull2Refresh。
*（Sebastian Bormann）添加了外部链接
*（塞巴斯蒂安·博尔曼（Sebastian Bormann））在iframe中添加了弹出式窗口

### 0.0.22
*（watcherkb）改进的德语翻译。
*（BramTown）改进的德语翻译。
*（Sebastian Bormann）现在很快就会忽略另一个即将发生的重新连接事件（<5s）。

### 0.0.21
*（Sebastian Bormann）在移动设备上添加了Pull2Refresh-在首页上下拉时重新加载整个页面，否则仅重新加载acual视图。
*（Sebastian Bormann）改进了重新连接时的重载（希望最终能在iOS 12.2上正常运行）。

### 0.0.20
*（Sebastian Bormann）使它可以在iOS 12.2中运行的新试用版。

### 0.0.19
*（Sebastian Bormann）在iOS 12.2的新PWA模式下改进了页面的重新加载。

### 0.0.18
*（Sebastian Bormann）改进了对VALVE_STATES的提取。
*（Sebastian Bormann）更改了按钮图标。
*（Sebastian Bormann）如果断开连接，则添加了Load-Spinner。
*（Sebastian Bormann）由于新的iOS 12.2 PWA模式增加了可见性检查和连通性检查。
*（Sebastian Bormann）在编辑设备对话框的角色选择框中添加了角色图标。
*（Sebastian Bormann）修复了类型字符串状态的缺失值列表。

### 0.0.17
*（Sebastian Bormann）更改了滑块的描述（级别/调光器/值/高度）。

### 0.0.16
*（Sebastian Bormann）设备的角色显示在设备表中。
*（Sebastian Bormann）VALVE_STATES现在可以通过GUI进行编辑（以百分比显示与恒温器相关的阀门的打开）。
*（Sebastian Bormann）添加了角色“按钮”：您可以定义一个常量SET_VALUE，如果按下该按钮，它将被写入与STATE链接的ID。
*（Sebastian Bormann）重写了前端部分，以确保更好的兼容性。 Homematic-Thermostat的Boost模式现在应该可以使用。
*（Sebastian Bormann）为Homematic-Thermostat添加了状态BOOST_STATE-能够在增强模式下显示剩余的增强时间。
*（Sebastian Bormann）添加了角色和相应状态的描述。
*（Sebastian Bormann）温度和湿度传感器现在可以在设备底部显示一个状态，在右上角的小处可以显示TEMPERATURE和HUMIDITY。
*（Sebastian Bormann）更好地处理了自动创建温度和湿度传感器。
*（Sebastian Bormann）德语翻译：'geöffnet'小写。
*（Sebastian Bormann）将Zigbee的湿度和温度添加到自动创建中。
*（Sebastian Bormann）修复了设备选项卡上不可滚动的选择框。

### 0.0.15
*（Sebastian Bormann）改进了状态值类型的检查。
*（Sebastian Bormann）改进了滑块工具提示，以降低大量字体的大小。

### 0.0 14
*（Sebastian Bormann）如果未进一步指定状态角色，则检查父对象的角色。

### 0.0.13
*（Sebastian Bormann）门和窗现在强制将true / false转换为打开/关闭状态。
*（塞巴斯蒂安·博尔曼（Sebastian Bormann））删除了“欢迎屏幕/概述”上的重复项。
*（Sebastian Bormann）状态现在设置为正确的值类型。
*（Sebastian Bormann）更改了对状态类型的识别。我希望现在没有新的错误！

### 0.0.12
*（Sebastian Bormann）检查对象名称中是否存在不允许的字符。
*（Sebastian Bormann）检查视图名称是否重复。
*（Sebastian Bormann）Level会在对话框中触发一个滑块-即使它具有状态列表（再次是HUE :)）。
*（塞巴斯蒂安·博尔曼（Sebastian Bormann））添加了百叶窗（Homematic）-请对其进行测试，我没有一个可以测试。

### 0.0.11
*（Sebastian Bormann）添加了对edge和Firefox的兼容性。
*（塞巴斯蒂安·博尔曼（Sebastian Bormann））再次色调修正。
*（Sebastian Bormann）从工具栏中删除了工具提示。

### 0.0.10
*（Sebastian Bormann）添加了ColorTemperature。希望HUE现在可以工作吗？无法测试ist，因为我没有任何色相灯:)

### 0.0.9
*（Sebastian Bormann）飞利浦HUE已添加到自动创建中（colortemp尚无法使用！）。
*（Sebastian Bormann）LinkedView现在也可以在窗户，门和火灾感应器上使用。
*（Sebastian Bormann）添加了翻译（感谢ldittmar！）。

### 0.0.8
*（Sebastian Bormann）向图像选择框添加了图标。

### 0.0.7
*（Sebastian Bormann）更改了标签顺序
*（塞巴斯蒂安·鲍尔曼（Sebastian Bormann））的Shelly自动创建功能现在应该可以使用了（我希望如此，无法在此处进行测试）

### 0.0.6
*（Sebastian Bormann）提高了选择ID和自动创建的速度
*（Sebastian Bormann）将过滤器设置为自动创建通道

### 0.0.5
*（Sebastian Bormann）错误修正：现在应该可以创建许多设备

### 0.0.4
*（Sebastian Bormann）错误修正：复制设备仅创建了对旧对象的引用
*（Sebastian Bormann）添加了工具栏图标

### 0.0.3
*（Sebastian Bormann）的各种错误修正

### 0.0.2
*（Sebastian Bormann）第一个部分运行的版本

### 0.0.1
*（Sebastian Bormann）初始版本

## License
MIT License

Copyright (c) 2020 Sebastian Bormann

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