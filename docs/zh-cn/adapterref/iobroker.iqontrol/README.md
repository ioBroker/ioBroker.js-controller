---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iqontrol/README.md
title: ioBroker.iqontrol
hash: lhfLYHEwCK+SxqzpKxPbFam+cgqQzrYECYRjtvi9I3Y=
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

[![贝宝（https://www.paypalobjects.com/zh_CN/DK/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LDHZMNPXKRX2N&source=url)

****

## IoBroker的iqontrol适配器
快速的Web应用程序以实现可视化。

![例](img/screenshot4.jpg)![例](../../../en/adapterref/iobroker.iqontrol/img/screenshot3.jpg)

在任何浏览器中运行。
它是完全可定制的。

##添加到主屏幕
您可以将其另存为主屏幕上的Web-App，它的外观和感觉就像本机应用程序一样：![添加到Homescreeen](../../../en/adapterref/iobroker.iqontrol/img/add_to_homescreen.png)

＃＃ 你需要...
* Nodejs 10或更高版本
* Web适配器，其一个实例运行与admin-adapter，socket.IO相同的协议（http或https），并且IO设置为“集成”，并且禁用“强制Web-Sockets”
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

###如果您还有其他问题，请提供浏览器调试控制台中的日志以及错误行的屏幕截图：
*在浏览器打开的调试控制台中启动iQonrol（通常需要按F12来打开它）
*切换到控制台窗口并重现该错误
*在控制台窗口中查找消息
*出现错误时，列出导致错误的行号
*请单击此行号，并进行故障行的屏幕截图：

![故障排除控制台窗口](img/troubleshooting_consolewindow.png)![排除故障线路](../../../en/adapterref/iobroker.iqontrol/img/troubleshooting_faultyline.png)

##论坛
访问[iobroker论坛](https://forum.iobroker.net/topic/22039/neuer-adapter-visualisierung-iqontrol)。

＃＃ 如何使用
*开始创建视图。

您可以将视图视为类似于页面的内容。

*然后在这些视图上创建设备。

设备具有确定设备功能，使用哪些图标等的角色。
根据该角色，您可以将多个状态链接到设备。这些将赋予设备功能。
如果选择“链接到其他视图”作为角色，则可以创建到其他视图的链接。我建议对链接到具有相同背景的其他视图的外观进行换肤。
您也可以尝试使用自动创建功能从iobroker-object-tree中选择现有设备。自动创建会尝试找出角色并匹配尽可能多的状态。

*之后，您可以创建一个工具栏，该工具栏显示为页脚。

工具栏条目是视图的链接。
第一个工具栏条目将是您的“主视图”，并将在开始时加载。

*要为所有内容提供精美的样式，您可以上传自己的图像。

您可以将图像用作背景图像或设备的背景图像。
文件夹“ / usericons”中的图像可用作设备图标。
免费的内置演示壁纸来自www.pexels.com。

## URL参数
*通过``http [s]：// <iobroker的URL或ip>：<Web适配器的端口> /iqontrol/index.html调用前端
    *``<网络适配器端口>''通常是8082
*要打开指定的实例，您可以添加“ namespace = iqontrol。<instance-number>”作为URL参数
*要打开指定的视图作为主页，您可以添加“ home = <viewID>”作为URL参数

**例：**

*``https：//192.168.1.1：8082 / iqontrol / index.html？namespace = iqontrol.1＆home = iqontrol.1.Views.Living-Room``
    *注意大写和小写

##角色和相关状态的描述
每个设备都有一个角色，该角色定义了设备的功能。每个角色都会生成一组状态，这些状态可以链接到相应的io-broker状态。
如果使用自动创建功能，则可以从io-broker-object树中选择一个现有设备。自动创建会尝试找出角色并匹配尽可能多的状态。
这仅适用于已知设备。对于未知设备，以及要赋予设备高级功能，您可以通过（+）-按钮手动添加它们，或编辑由自动创建功能创建的设备。
要编辑设备的角色和状态，请单击设备后面的铅笔。您将在下面找到角色和使用状态的简短描述：

###修改数据点配置
您可以通过设备配置对话框或iobroker的objects-tab中数据点后面的扳手图标来修改数据点的配置。在这里您可以：

*设置只读标志
*设置反转标志
*设置Confirm-Flag（强制用户在将更改写入数据点之前进行确认）
*设置PIN码（强制用户在将更改写入数据点之前输入此PIN码-但要注意：这仅是低安全性，因为在前端检查了PIN码！使用数字来显示全屏-pin-pad（如果要求输入代码）
*修改数据点的单位，以零，单数和复数分隔
*修改数据点的最小值和最大值
*设置水平滑块在增加/减少时采取的步骤
*修改数据点的类型
*修改数据点的角色
*设置一个目标值ID，这是一个数据点ID，在其中写入目标值（如果实际值和目标值有不同的数据点）
*设置或修改值列表
    *视情况在值列表中添加一个选项以输入自由文本
*设置目标值列表：
    *除了目标值ID外，您还可以为不同的键定义不同的数据点ID和目标值（键是原始数据点的可能值）
    *您也可以在键和目标值中使用通配符*
*示例：
*键：“ TuneIn-Playlist：*”，目标数据点ID：“ alexa2.0.Echo-Devices.XYZ.Music-Provider.TuneIn-Playlist”，目标值：“ *”
*如果用户输入“ TuneIn-Playlist：Ambient”，则值“ Ambient”将被写入“ alexa2.0.Echo-Devices.XYZ.Music-Provider.TuneIn-Playlist”

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
    *从技术上讲，*值列表*是具有相应转换列表的值，在数据点的'common.custom.iqontrol。<instance> .states'，'native.states'或'common.states'对象中定义：

````
"native": {
    "states": {"true": "Text for true", "false": "Text for false"},
    ...
}
````

    *您可以通过修改数据点来创建自己的值列表（iobroker的objects-tab中数据点后面的扳手图标，请参见上文）

但是，并非每种类型对每个角色都有意义。因此，例如，在大多数情况下，开关的状态将为布尔值，以便可以在开和关之间进行切换。可能会显示一个字符串，但该开关将不起作用。

###链接到其他视图：
*没有其他状态
* **链接视图属性**直接打开

### <img src="img/icons/switch_on.png" width="32">开关， <img src="img/icons/fan_on.png" width="32">风扇：
* **STATE** *布尔值*-显示和设置开/关状态
* **电源**：*数字*-功耗将在右上角以小号显示

### <img src="img/icons/button.png" width="32">按键：
* **STATE** *任何*-任何所需的状态类型
* **SET_VALUE** 常量*字符串*-这是一个常数（不是链接的io-broker状态！），如果按下按钮，它将分配给STATE
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
 ***ALTERNATIVE_COLORSPACE_VALUE*** 符串*或*数字*（取决于选择的色彩空间）-替代色彩空间的值

    如果您的设备不支持使用HUE，SATURATION和COLOR_BRIGHTNESS（HSB / HSV颜色空间），则可以使用多种替代颜色空间。在设备选项中，您可以选择以下颜色空间之一：

    * **RGB** / **RGB** 您可以使用RGB格式（十六进制），而不是使用HUE，SATURATION和COLOR_BRIGHTNESS，并以“＃”开头
    * **RGBW** / **RGBW** 您可以使用RGBW格式（十六进制），而不是使用HUE，SATURATION，COLOR_BRIGHTNESS和WHITE_BRIGHTNESS，可选，并以'＃'开头
    * **RGBWWCW** / **RGBWWCW** / **RGBCWWW** / **RGBCWWW** 您可以使用RGBWWCW-或RGBCWWW-Format（十六进制）来代替HUE，SATURATION，COLOR_BRIGHTNESS，CT和WHITE_BRIGHTNESS ，WW =暖白，CW =冷白），可选，以“＃”开头
    * **RGB（仅色相）** /** RGB（仅色相）**：可以使用RGB（仅色相）格式（十六进制）代替使用HUE，并在前导'＃'处可选。在这种特殊情况下，RGB格式将仅接受色相色圆圈的纯饱和色。不允许混合白色
    * ** Milight的色相**：这是Milight设备的色相值，在色相色域中使用另一个起点：

````
tHue = modulo(66 - (hue / 3.60), 100) * 2.55;
modulo(-3.60 * (MilightHue/2.55 - 66), 360);
on modulo(n, m){ return ((n % m) + m) %m; }
````

注意事项：转换到替代色彩空间是由前端完成的，因此只有在打开了iQontrol的情况下，它才处于活动状态。因此，您不能将其用作色彩空间的转换器。为避免对话循环，建议您要么使用原始的色彩空间数据点（HUE，SATURATION，COLOR_BRIGHTNESS，CT，WHITE_BRIGHTNESS），要么使用替代色彩空间数据点来“替换”这些数据点。

*效果模式：
    * **效果**：*值列表*-播放效果
* **EFFECT_NEXT** *布尔值*-如果设置为true，则会播放下一个效果（作为不支持EFFECT值列表的设备的替代）
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

* **PARTY_TEMPERATURE** *字符串*-特殊格式的字符串，用于定义恒温器的聚会或假期模式
* **BOOST_STATE** *数字*-显示恒温器的剩余启动时间

### <img src="img/icons/temperature.png" width="32">温度感应器， <img src="img/icons/humidity.png" width="32">湿度传感器：
* **STATE** *数字*-将在设备下部显示的温度或湿度
* **温度**：*数字*-温度将在右上角以小号显示
* **湿度**：*数字*-湿度将在右上角以小号显示
* **链接视图属性**直接打开

### <img src="img/icons/brightness_light.png" width="32">亮度传感器：
* **STATE** *数字*-将在设备下部显示的亮度
* **亮度**：*数字*-亮度将在右上角以小号显示
* **链接视图属性**直接打开

### <img src="img/icons/motion_on.png" width="32">运动传感器：
* **STATE** *布尔值*-显示是否检测到运动
* **链接视图属性**直接打开

### <img src="img/icons/door_closed.png" width="32">门， <img src="img/icons/window_closed.png" width="32">窗口：
* **STATE** *布尔值*-在门或窗打开或关闭时显示
    *或者，您可以分配*值列表*，以显示诸如“倾斜”之类的其他状态（在窗口选项中，您可以定义文字文本代表打开，关闭倾斜以显示正确的图标）
    *您还可以分配*字符串*以显示任何文本，例如“ 3窗口打开”或“全部关闭”或*数字*
*尊重**链接视图属性**

### <img src="img/icons/garagedoor_closed.png" width="32">车库门：
* **STATE** *布尔值*-显示门是打开还是关闭
    *或者，您可以分配*值列表*，以显示其他状态，例如“倾斜”
    *您还可以分配* string *以显示任何文本，例如“ 3扇门打开”或“全部关闭”
* **TOGGLE** *布尔值*-显示“切换”按钮，如果按下，则设置为true

### <img src="img/icons/door_locked.png" width="32">带锁门：
* **STATE** *布尔值*-显示门是打开还是关闭（门/窗接触）
* **LOCK_STATE** *布尔值*-显示和控制门是否被锁定或解锁（如果STATE为true，则禁用控件-因为您无法锁定门而已打开）
* **LOCK_STATE_UNCERTAIN** *布尔值*-如果为true，则STATE将以斜体显示，以表示锁的确切位置未知
* **LOCK_OPEN** *布尔值*-如果设置为true，则门将完全打开

### <img src="img/icons/blind_middle.png" width="32">盲：
* **等级**：*数量*-百叶窗高度
* **方向**：*值列表*-可以是停止，向上和向下。可以配置代表Stop，Up，Down和Unknown的值
* **STOP** *布尔值*-如果按下停止按钮，则设置为true
* ** UP ** / ** DOWN **：*布尔值*-如果按下向上/向下按钮（对于使用UP和DOWN数据点而不是LEVEL或除LEVEL以外的设备），则设置为true。另外，您可以通过** UP_SET_VALUE ** / ** DOWN_SET_VALUE **数据点定义一个值。如果已定义，则在按下“向上” /“向下”按钮时，将发送此值而不是true
* ** FAVORITE_POSITION **：*布尔值*-可用于调出喜欢的位置。如果按下“收藏夹”按钮（可以在设备设置中配置按钮标题），则将true发送给该数据点。另外，您可以通过** FAVORITE_POSITION_SET_VALUE **数据点定义一个值。如果已定义，则当按下“收藏夹”按钮时，将发送此值而不是true
* **SLATS_LEVEL** *数字*-百叶窗板的位置百分比

### <img src="img/icons/fire_on.png" width="32">火灾传感器：
* **STATE** *布尔值*-如果为true，传感器将显示为已触发
    *或者，您可以分配*值列表*，以显示其他状态，例如“篡改”
    *您还可以分配* string *以显示任何文本，例如“楼上火”
* **链接视图属性**直接打开

### <img src="img/icons/flood_on.png" width="32">洪水传感器：
* **STATE** *布尔值*-如果为true，传感器将显示为已触发
    *或者，您可以分配*值列表*，以显示其他状态，例如“篡改”
    *您还可以分配* string *以显示任何文本，例如“楼上洪水”
* **链接视图属性**直接打开

### <img src="img/icons/alarm_on.png" width="32">报警：
* **STATE** *布尔值*-如果为true，传感器将显示为已触发
    *或者，您可以分配*值列表*，以显示其他状态，例如“篡改”
    *您还可以分配* string *以显示任何文本，例如“楼上火”
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

### <img src="img/icons/media_on.png" width="32">媒体播放器：
* **STATE** *字符串*-“播放”，“暂停”或“停止”或*布尔值*-播放为true，停止为false
    *在设备选项中，您可以定义代表播放，暂停和停止的值
* **COVER_URL** *字符串*-封面图片的网址
* **艺术家，专辑，标题**：*字符串*-自我说明
* **TRACK_NUMBER** *数字*-自我说明
* **PREV，REWIND，PLAY，PAUSE，STOP，FORWARD，NEXT** *布尔值*-如果按下相应的按钮，则设置为true
* **SHUFFLE，MUTE，PLAY_EVERYWHERE，EJECT，POWER_SWITCH** *布尔值*-相应功能的状态
* **REPEAT** *布尔值*-表示重复功能的状态或* string *-可以通过coressponding选项定义3种状态：off值，all-all和repeat-one
* **DURATION，ELAPSED** *数字*-实际标题的持续时间和经过的时间-用于显示搜索栏
* **VOLUME** *数字*-用于音量滑块
* **源，播放列表**：*值列表*-显示选择菜单以从播放列表中选择来源或标题

### <img src="img/icons/popup.png" width="32">弹出：
* **STATE** *任何*-可用于显示更多信息
* **URL** 常量*字符串*-该网址将作为iframe在弹出窗口中打开
* **HTML** 常量*字符串*-如果未指定URL，此标记将显示在弹出窗口内

### <img src="img/icons/link.png" width="32">外部链接：
* **STATE** *任何*-可用于显示更多信息
* **URL** 常量* string *-该URL将被打开

##图标和背景图片
*您可以使用内置图像或在“图像”标签下上传的图像或您喜欢的任何免费网址
*您也可以在图片网址中使用变量。例如，对于天气预报而言，这可能很有用。使用以下模式：
    *``path / to / firstloaded.png | anotherpath / to / {iobrokerstate | fallback} .png``
    *示例：``./../ iqontrol.meta / userimages / demo / bottle.jpg | ./../ iqontrol.meta / userimages / demo / {javascript.0.myimage | whitestone} .jpg''
*打开视图时加载``./../iqontrol.meta/userimages/demo/bottle.jpg''
*从服务器获取javascript.0.myimage的状态后，该图像将立即替换为./../iqontrol.meta/userimages/demo/XXX.jpg，其中XXX是javascript.0.myimage的值
*如果javascript.0.myimage没有值，将使用后备的whitestone（使用后备是可选的）

##设备名称
*就像图片网址中的变量一样，您可以在设备名称中使用变量。语法几乎相同：
    *“加载时输入文字|加载{iobrokerstate | fallback}之后输入文字”
*另外，可以将iobrokerstate放在方括号中，然后将使用不带其单位的普通值：“加载时的文本|加载{[iobrokerstate] | fallback}之后的文本”
    *示例：“天气正在加载|天气：{javascript.0.weather |未找到天气数据}”
*打开视图时显示``天气正在加载''
*一旦从服务器获取了javascript.0.weather状态，该文本将替换为Weather：XXX，其中XXX是javascript.0的值。天气``
*如果``javascript.0.weather''没有值，将使用回退``No weather data found''（使用回退是可选的）

****

## Changelog

### 1.1.2 (2020-06-21)
* (Sebastian Bormann) Compatibility enhancements for repeat function of Media-Player.
* (Sebastian Bormann) Made value-list and target-value-list sortable.
* (Sebastian Bormann) Made sortable lists only draggable in y-axis.
* (Sebastian Bormann) Added option to enter own value for value-lists.
* (Sebastian Bormann) Added PLAY_EVERYWHERE to Media-Player.

### 1.1.1 (2020-06-16)
* (Sebastian Bormann) Some fixes, styling and enhancements for Media-Player.
* (Sebastian Bormann) Added option to hide play, pause and stop icon for Media-Player.
* (Sebastian Bormann) Added function repeat one to Media-Player.
* (Sebastian Bormann) Maquee is only restarting, if the value of a state has really changed.
* (Sebastian Bormann) Fixed crash when some ids of linked views were missing.
* (Sebastian Bormann) Added targetValues to custom configuration, wich allows to send changes of a state to different target-datapoints.

### 1.1.0 (2020-06-13)
* (Sebastian Bormann) Added Media-Player.

### 1.0.1 (2020-06-10)
* (Sebastian Bormann) Fixed month for timestamps.
* (Sebastian Bormann) You can now chose if values are linked states or constants.
* (Sebastian Bormann) Added the ability to use variables in device-names.

### 1.0.0 (2020-06-01)
* (Sebastian Bormann) Added a few captions to admin.
* (Sebastian Bormann) Prevent pressure menu when scrolling and after opening menu.
* (Sebastian Bormann) Corrected a few translations.

### 0.4.1 (2020-05-15)
* (Sebastian Bormann) Added icons for toplight and tilted to window and enhanced window to recognize tilted position.
* (Sebastian Bormann) Fixed crash when using some thermostats.
* (Sebastian Bormann) New gulpfile and fixed translations.
* (Sebastian Bormann) Further improvement of connection speed.
* (Sebastian Bormann) Disabled context-menu on long/right-click.
* (Sebastian Bormann) Revised pressure/forced touch and added option to always use time instead of pressure.

### 0.4.0 (2020-05-13)
* (Sebastian Bormann) Major change using socket.io without conn.js wich leads to a much faster initial connection.
* (Sebastian Bormann) Improved loading and scrolling for popups.

### 0.3.7 (2020-05-06)
* (Sebastian Bormann) Added more options to timestamp.

### 0.3.6 (2020-05-05)
* (Sebastian Bormann) Added failback to variables
* (Sebastian Bormann) Added option to add timestamp to state

### 0.3.5 (2020-04-26)
* (Sebastian Bormann) Added variables to icons and backgroundimages (see readme)
* (Sebastian Bormann) It is now possible to remove toolbar (the first view is then the home view)

### 0.3.3 (2020-04-19)
* (Sebastian Bormann) Fixed device readonly for toggle state.
* (Sebastian Boramnn) Fixed devices with same name.
* (Sebastian Bormann) Removed some old code from version <0.3.0.

### 0.3.2 (2020-04-19)
* (Sebastian Bormann) Fixed loading toolbar with no entries on linked view.
* (Sebastian Bormann) Fixed views with quotes in name.
* (Sebastian Bormann) Fixed Flood-Sensor.

### 0.3.1 (2020-04-16)
* (Sebastian Bormann) Breaking change: The complete configuration is no longer stored in ioBroker channels and states, but is fetched as one complete object, thus saving the configuration is much much faster than before.
* (Sebastian Bormann) Views, devices and toolbar entries are now sortable via drag- and drop in the configuration dialog.
* (Sebastian Bormann) After saving the configuration the instance ist now yellow until the configuration is completely written.
* (Sebastian Bormann) Added invert UNREACH to device options.
* (Sebastian Bormann) Added Flood-Sensor.
* (Sebastian Bormann) Enhanced autocreation-feature by using ioBroker-Type-Detector by bluefox.
* (Sebastian Bormann) Enhanced hue-lights when using alternative colorspace without white-values and changing ct.
* (Sebastian Bormann) Enhanced hue-lights when using alternative colorspace to keep uppercase if needed.

### 0.2.20 (2020-04-08)
* (Sebastian Bormann) If value for POWER is greater than 100, it is rounded without decimal places.
* (Sebastian Bormann) Bugfixed invert-function with custom min and max.
* (Sebastian Bormann) Added reload-link to loading page.
* (Sebastian Bormann) Updated dependencies.

### 0.2.19 (2020-02-29)
* (Sebastian Bormann) Updated dependencies.

### 0.2.18 (2020-02-29)
* (Sebastian Bormann) Updated dependencies.

### 0.2.17 (2020-02-29)
* (Sebastian Bormann) Added option to open dialog by clicking on tile for View, Window, Door, Fire, Temperatur, Humidity, Brightness and Motion.
* (Sebastian Bormann) Added option to hide device, if it is inactive (handle with care, as you may not be able to switch it on again).

### 0.2.16 (2020-01-14)
* (Sebastian Bormann) Fixed custom step for heating control.
* (Sebastian Bormann) Fixed universal popup wich was displayed, even when empty.

### 0.2.15 (2020-01-07)
* (Sebastian Bormann) Added svg as possible image to upload.
* (Sebastian Bormann) Made URL and HTML universal for nearly all devices, to display custom html code or content of an url inside the dialog (this could be used e.g. to display FLOT-graphs related to the device inside the dialog).
* (Sebastian Bormann) Fixed disabled custom values with admin 3.7.6+ and js-controller <2.2.

### 0.2.14 (2019-11-12)
* (Sebastian Bormann) Fixed icon-switching for thermostats.

### 0.2.13 (2019-10-23)
* (Sebastian Bormann) Improved the return after time method.
* (Bluefox) Fixed translations in custom-dialog.

### 0.2.12 (2019-10-12)
* (Sebastian Bormann) Improvement of homematic-thermostat for controler 2.0 compatiility.

### 0.2.11 (2019-10-07)
* (Sebastian Bormann) Rewritten pincode-section to work with older browsers.
* (Sebastian Bormann) Pincode now works for buttons as well.
* (Sebastian Bormann) Modified the return after time function to work with older browsers.
* (Sebastian Bormann) Fixed missing entrys in long pressure menus in iOS 13.

### 0.2.10 (2019-10-05)
* (Sebatian Bormann) Enhanced PIN-Code to view a num-pad when using an alphanumeric PIN.

### 0.2.9 (2019-10-02)
* (Sebastian Bormann) Added optional PIN-Code to custom datapoint-configuration dialog (wrench icon).
* (Sebastian Bormann) Added option to return to a view after a settable time of inactivity to settings.

### 0.2.8 (2019-09-27)
* (Sebastian Bormann) Further improvement of index.js for controller 2.0 compatibility.

### 0.2.7 (2019-09-27)
* (Sebastian Bormann) Fixed popup_width and popup_height.
* (Sebastian Bormann) Further improvement of main.js and index.js for controller 2.0 compatibility.
* (Sebastian Bormann) Added option showState for Button and Program.

### 0.2.6 (2019-09-24)
* (Sebastian Bormann) Processing the plain text of values is now done after rounding a number value.
* (Sebastian Bormann) Removed Icon_on for Button.
* (Sebastian Bormann) Modified main.js for controler 2.0 compatibility.

### 0.2.5 (2019-09-22)
* (Sebastian Bormann) Adjusted handling of pressure menu for iOS 13.
* (Sebastian Bormann) Added Buffer for rendering a view while pressureMenue is beeing created.
* (Sebastian Bormann) Added POWER and VOLTAGE to battery.

### 0.2.4 (2019-09-15)
* (Sebastian Bormann) Further enhancement of control-mode handling for homematic-thermostat.
* (Sebastian Bormann) Minor bugfixes.

### 0.2.3 (2019-09-15)
* (Sebastian Bormann) Further enhancement of control-mode handling for homematic-thermostat.
* (Sebastian Bormann) Added handling of alternative states-property-syntax.

### 0.2.2 (2019-09-14)
* (Sebastian Bormann) Enhanced handling of control-mode for homematic-thermostat for more compatibility.
* (Sebastian Bormann) Reduced rate of sending when moving slider for blinds and thermostats. 

### 0.2.1 (2019-09-07)
* (Sebastian Bormann) Fixed crash of Backend (interchanged index_m.html and custom_m.html).

### 0.2.0 (2019-09-06)
* (Sebastian Bormann) Added slats level to blind.

### 0.1.15 (2019-09-05)
* (Sebastian Bormann) Added step to custom dialog, wich allowes to define the resolution of value-sliders.
* (Sebastian Bormann) Values with unit % and a range from min to max of 0-1 are now scaled to 0-100.
* (Sebastian Bormann) Fixed conversion to alternative colorspace for hue lights.

### 0.1.14 (2019-09-01)
* (Sebastian Bormann) Fixed missing dropdown-menus for images after sorting or adding items to tables.
* (Sebastian Bormann) Level-Sliders will have a higher resolution for datapoints with small value ranges.

### 0.1.13 (2019-08-28)
* (Sebastian Bormann) Fixed crash of frontend.
* (Sebastian Bormann) Security updates.

### 0.1.12 (2019-08-28)
* (Sebastian Bormann) Added width and height to options for popup.
* (Sebastian Bormann) Added option to define free CSS-code to modify frontend.
* (Sebastian Bormann) Infotext-values are now displayed as plain text or rounded if numbers.
* (Sebastian Bormann) Added 'Close dialog after execution' to device options for scenes, programs and buttons.

### 0.1.11 (2019-08-26)
* (Sebastian Bormann) Bugfix for chrome opacity transition bug.
* (Sebastian Bormann) Added placeholder for default values for text inputs on options page.
* (Sebastian Bormann) Added placeholder for default icon and blank icon to device options.
* (Sebastian Bormann) Extended thermostat CONTROL_MODE by type switch.
* (Sebastian Bormann) Fixed crash when using thermostat with setpoint an non homematic-devices.
* (Sebastian Bormann) Added min and max to custom dialog.
* (Sebastian Bormann) Now you can set none as a devices background image for active devices (formerly this was copied from inactive devices for backward-compatibility-reasons).
 
### 0.1.10 (2019-08-20)
* (Sebastian Bormann) You can now define different units if value is zero or if value is one in custom dialog.
* (Sebastian Bormann) When changing an image via the new drop-down, save button will be activated now.
* (Sebastian Boramnn) Added option, to remove overlay of tile, if device is active or inactive.
* (Sebastian Bormann) Enhanced conversion function when converting booelan to number.
* (Sebastian Bormann) Fixed renaming of image files (links to used images are now also correctly renamed).
* (Sebastian Bormann) Fixed handling of spaces in image filenames.

### 0.1.9 (2019-08-18)
* (Sebastian Bormann) Modified cache manifest to remove EISDIR-errors from log.
* (Sebastian Bormann) Fixed toggle-entry in pressure menu.
* (Sebastian Bormann) Added multiple file upload to images tab.
* (Sebastian Bormann) Added check for dead links to other views when saving settings.
* (Sebastian Bormann) You can now assign external urls to background images and icons (for example to add a weather-live-map).
* (Sebastian Bormann) Removed options clickOnIconOpensDialog and clickOnTileToggles for Values and Programs as they are not switchable.
* (Sebastian Bormann) Added OFF_SET_VALUE and the option 'Return to OFF_SET_VALUE after [ms]' to button.

### 0.1.8 (2019-08-11)
* (Sebastian Bormann) Further improvements on connecting over iobroker.pro.
* (Sebastian Bormann) COLOR_BRIGHTNESS and WHITE_BRIGHTNESS are now displayed, if LEVEL is not defined on hue lights.
* (Sebastian Bormann) Added thumbnail-previews of fonts.
* (Sebastian Bormann) Added clickOnIconOpensDialog and clickOnTileToggles to device options.

### 0.1.7 (2019-08-11)
* (Sebastian Bormann) Added font-family, -size, -weight and -style to options for toolbar, headers, device-name, device-state and device-info-text.
* (Sebastian Bormann) Added icon-size, icon-background-size and icon-background-corner-size to options for toolbar.

### 0.1.6 (2019-08-08)
* (Sebastian Bormann) Next try to connect via iobroker.pro

### 0.1.5 (2019-08-06)
* (Sebastian Bormann) Added validation to options.
* (Sebastian Bormann) Extended alarm with CONTROL_MODE-datapoint and icons for disarmed, armed and triggered. 
* (Sebastian Bormann) To save memory, only used states are saved in local memory (before all used AND all updated states were saved).
* (Sebastian Bormann) Optimized socket-connectionLink to try to connect via iobroker.pro.

### 0.1.4 (2019-08-04)
* (Sebastian Bormann) Optimized fading of tiles.
* (Sebastian Bormann) Added toggle-button to blind, if no up/down button is defined.
* (Sebastian Bormann) Added detection of protocol for socket in admin.
* (Sebastian Bormann) Added confirm-flag inside custom datapoint configuration dialog to enable asking user to confirm before changing values.
* (Sebastian Bormann) Added toggle-button to garage door.

### 0.1.3 (2019-08-01)
* (Sebastian Bormann) Added seperate background image for active devices.
* (Sebastian Bormann) Fixed background-options (color and opacity) for active and inactive device tiles.
* (Sebastian Bormann) Added more space to views bottom.
* (Sebastian Bormann) Fixed invert level for blinds.
* (Sebastian Bormann) Organized options in collapsible layout.

### 0.1.2 (2019-07-29)
* (Sebastian Bormann) Added FAVORITE_POSITION (with configurable button caption) and SET_VALUE for UP, DOWN and FAVORITE_POSITION to Blinds.
* (Sebastian Bormann) Added 'No Icon' as option to icon configuration.
* (Sebastian Bormann) Addes icon to 'Link to other view'.
* (Sebastian Bormann) Added a bunch of new standard-icons.

### 0.1.1 (2019-07-28)
* (Sebastian Bormann) Added usericons.

### 0.1.0 **stable** (2019-07-27)
* (Sebastian Bormann) First stable release.
* (Sebastian Bormann) Added show timestamp to device options to chose default behaviour and a small timestamp-icon in the dialog to show and hide timestamps.
* (Sebastian Bormann) Fixed readonly handling of control mode for Homematic Thermostats.

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