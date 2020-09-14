---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iqontrol/README.md
title: ioBroker.iqontrol
hash: pX/oRf8W4dGvbTp0xVZaTKPGx3F0YMOyof1ihm5yQlQ=
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

\ **如果您喜欢，请考虑捐赠：**

[![paypal]（https://www.paypalobjects.com/zh_CN/DK/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LDHZMNPXKRX2N&source=url)

****

## IoBroker的iqontrol适配器
快速的Web应用程序以实现可视化。

![屏幕截图](../../../en/adapterref/iobroker.iqontrol/img/screenshot_kueche.png)

\
![屏幕截图](../../../en/adapterref/iobroker.iqontrol/img/screenshot_licht.png)

\
![屏幕截图](../../../en/adapterref/iobroker.iqontrol/img/screenshot_heizung.png)

\
![屏幕截图](../../../en/adapterref/iobroker.iqontrol/img/screenshot_rauchmelder.png)

\
![屏幕截图](../../../en/adapterref/iobroker.iqontrol/img/screenshot_flot.png)

在任何浏览器中运行。
它是完全可定制和响应的。

> **此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

##添加到主屏幕
您可以将其另存为主屏幕上的Web-App，它的外观和感觉就像是本机应用程序：![添加到Homescreeen](../../../en/adapterref/iobroker.iqontrol/img/add_to_homescreen.png)

＃＃ 你需要...
* Nodejs 10或更高版本
* Web适配器，其一个实例运行与admin-adapter，socket.IO相同的协议（http或https），并且IO设置为“集成”，并且禁用了“强制Web-Sockets”
    *如果与其他适配器冲突，只需添加具有上述设置的另一个实例-iQontrol将搜索最合适的web-adapter-instance并将其用于通信
*为了同时通过* iobroker.pro-Cloud *进行连接，应将admin-和web-adapter设置为http（而非https）

*如果遇到任何问题，请参阅本自述文件结尾的[疑难解答]（＃troubleshooting）部分

##论坛
访问[iobroker论坛](https://forum.iobroker.net/topic/22039/neuer-adapter-visualisierung-iqontrol)。

＃＃ 如何使用
**不要害怕您有很多选择。**大多数事情都是开箱即用的。您可以*，但是您不必使用iQontrol提供的所有配置功能！只是这样开始：

*开始创建视图。

您可以将视图视为类似于页面的内容。

*然后在这些视图上创建设备。

设备具有确定设备功能，使用哪些图标等的角色。
根据该角色，您可以将多个状态链接到设备。这些将赋予设备其功能。
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
*要打开指定的视图作为主页，可以添加“ home = <viewID>”作为URL参数
    *``<viewID>``的格式必须像``iqontrol。<instance-number> .Views。<view-name>``
*注意：这是区分大小写的！
*要在加载页面时打开指定的对话框，可以添加“ openDialog = <deviceID>”作为URL参数
    *``<deviceID>''的格式必须类似于``iqontrol。<instance-number> .Views。<view-name> .devices。<device-number>``，其中``<device-number>``从0开始（因此视图中的第一个设备是设备号0）
*注意：这是区分大小写的！
*要设置或覆盖时间设置后的返回，请使用以下参数：
*``returnAfterTimeTreshold = <time in seconds> ``设置时间，之后将调用目标视图。使用``0&#39;&#39;禁用定时返回功能。
*``returnAfterTimeDestiationView = <viewID>``设置视图，在阈值之后调用。如果未指定，将使用主视图。
*如果您从壁挂式平板电脑上调用iQontrol，这些选项会很有用，使用后该平板电脑应自动返回主视图

**例：**

*``https：//192.168.1.1：8082 / iqontrol / index.html？namespace = iqontrol.1＆home = iqontrol.1.Views.Living-Room``
    *注意大写和小写

##图标和背景图片
*您可以使用内置图像或在“图像”标签下上传的图像或您喜欢的任何免费网址
*您也可以在图片网址中使用变量。例如，这对于天气预报而言可能是有用的。使用此模式：
    *``路径/到/firstloaded.png |另一个路径/到/{iobrokerstate|fallback}.png”
    *示例：``./../ iqontrol.meta / userimages / demo / bottle.jpg | ./../ iqontrol.meta / userimages / demo / {javascript.0.myimage | whitestone} .jpg''
*打开视图时加载``./../iqontrol.meta/userimages/demo/bottle.jpg''
*从服务器获取javascript.0.myimage的状态后，图像将立即替换为./../iqontrol.meta/userimages/demo/XXX.jpg，其中XXX是javascript.0.myimage的值
*如果javascript.0.myimage没有值，将使用后备的whitestone（使用后备是可选的）

###进度条
*可以结合使用SVG定义和变量而不是图像文件来显示进度条
*集成了vew模板供您选择，但是您也可以创建自己的SVG

![进度栏广场](img/progressbar_square.png)![进度栏圈](../../../en/adapterref/iobroker.iqontrol/img/progressbar_circle.png)

*有关更多信息，请参见[Wiki]（https://github.com/sbormann/ioBroker.iqontrol/wiki/Progress-Bars）

##设备名称
*就像图片网址中的变量一样，您可以在设备名称中使用变量。语法几乎相同：
    *“加载时输入文字|加载后{iobrokerstate | fallback}后文字”
*另外，可以将iobrokerstate放在方括号中，然后将使用不带其单位的普通值：“加载时的文本|加载{[iobrokerstate] | fallback}之后的文本”
    *示例：“天气正在加载|天气：{javascript.0.weather |未找到天气数据}”
*打开视图时显示``天气正在加载''
*从服务器获取javascript.0.weather状态后，文本将被Weather XXX替换，其中XXX是javascript.0的值。天气``
*如果``javascript.0.weather''没有值，将使用回退``No weather data found''（使用回退是可选的）

##弹出消息
*每个实例都会创建状态``iqontrol.x.Popup.Message''
*将值传递到此状态时，将显示弹出消息（或吐司）
*您可以使用html标签来格式化消息文本
*还有一些其他状态可以进一步自定义显示的弹出窗口（必须在设置消息数据点之前设置这些状态）：
    *``持续时间''：这是显示消息的时间，以毫秒为单位;如果设置为0，则必须确认消息
    *``ClickedValue''和``ClickedDestinationState''：如果用户单击了弹出窗口，则``ClickedValue''中的值将发送到``iqontrol.x.Popup.POPUP_CLICKED''中，如果指定了其他值到``ClickedDestinationState''中的数据点
        *如果未指定任何值，则将使用“ true”
    *“ ButtonNames”：您可以在此处指定以逗号分隔的按钮列表，该列表将显示在弹出窗口的底部（例如“ OK，中止”）
        *``ButtonValues''和``ButtonDestinationStates''：这些是逗号分隔的值列表，这些值将被发送到``iqontrol.x.Popup.BUTTON_CLICKED''，并且如果指定的话，将附加到``ButtonDestinationStates''中的数据点`，如果用户单击相应的按钮
*如果仅使用一个值（而不是用逗号分隔的列表），则此值将用于所有按钮
*如果将“ ButtonValues”留空，则将使用按钮的名称
*如果仅使用一个目标状态（而不是用逗号分隔的列表），则此状态将用于所有按钮
        *``ButtonCloses``：这是一个用逗号分隔的布尔值列表（``true''/``false''），用于指定在按下相应按钮时是否应关闭弹出窗口
*或者，您可以通过sendTo-command和参数``PopupMessage''，``PopupDuration''，``PopupClickedValue''等来设置这些值
    *示例：``sendTo（“ iqontrol”，“ send”，{PopupMessage：'这是我的消息'，PopupDuration：2500，PopupClickedValue：'messageConfirmed'}）;''
*您也可以使用块状发送消息到iQontrol

![弹出屏幕截图](img/popup_screenshot.png)![弹出式阻止](../../../en/adapterref/iobroker.iqontrol/img/popup_blockly.png)

##角色和相关状态的描述
每个设备都有一个角色，该角色定义了设备的功能。每个角色都会生成一组状态，这些状态可以链接到相应的iobroker状态。
如果使用自动创建功能，则可以从iobroker-object树中选择一个现有设备。自动创建会尝试找出角色并匹配尽可能多的状态。
这仅适用于已知设备。对于未知设备，以及要赋予设备高级功能，您可以通过（+）-按钮手动添加它们，或编辑由自动创建功能创建的设备。
要编辑设备的角色和状态，请单击设备后面的铅笔。您将在下面找到角色和已用状态的简短描述：

###修改数据点配置
您可以通过设备配置对话框或iobroker的objects-tab中数据点后面的扳手图标来修改数据点的配置。在这里您可以：

*设置只读标志
*设置反转标志
*设置Confirm-Flag（强制用户在将更改写入数据点之前进行确认）
*设置PIN码（强制用户在将更改写入数据点之前输入此PIN码-但要注意：这仅是低安全性，因为在前端检查了PIN码！使用数字来显示全屏-pin-pad（如果要求输入代码）
*修改数据点的单位，以零，单数和复数形式分开
*修改数据点的最小值和最大值
*设置水平滑块在增加/减少时采取的步骤
*修改数据点的类型
*修改数据点的角色
*设置目标值ID，这是一个数据点ID，目标值将写入其中（如果实际值和目标值的数据点不同）
*设置或修改值列表
    *向值列表中添加一个选项，以输入自由文本
*设置目标值列表：
    *除了目标值ID外，您还可以为不同的键定义不同的数据点ID和目标值（键是原始数据点的可能值）
    *您也可以在键和目标值中使用通配符``*''
*示例：
*键：``TuneIn-Playlist：*''，目标数据点ID：``alexa2.0.Echo-Devices.XYZ.Music-Provider.TuneIn-Playlist''，目标值：``*''
*如果用户输入``TuneIn-Playlist：Ambient''，则值``Ambient''将被写入``alexa2.0.Echo-Devices.XYZ.Music-Provider.TuneIn-Playlist``

![CustomDialog调用](img/custom_call.png)![CustomDialog示例](img/custom_dialog.png)![目标值列表的概念](../../../en/adapterref/iobroker.iqontrol/img/target-value-list_concept.png)

###一般状态：
####状态和级别
几乎所有角色都具有** STATE **状态和/或** LEVEL **状态。在大多数情况下，这代表了设备的主要功能。您可以为其分配以下类型的iobroker状态：

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
*在以下情况下，iQontrol将在对话框中显示定义的valueList作为下拉字段：
*如果type是'numbers'，并且valueList的条目数与数据点的最小值和最大值之间的步数完全相同，或者
*如果类型为“布尔值”，但角色不是“开关”或
*如果类型为“字符串”或
*如果激活了“添加选项以输入自由文本”
*是否通过状态或级别数据点确定设备块将显示为活动还是不活动。此外，您可以在选项部分“活动图块的条件”中自由自定义行为。您甚至可以设置另一个确定贴砖状态的外部数据点

但是，并非每种类型对每个角色都有意义。因此，例如，在大多数情况下，开关的状态将为布尔值，以便可以在开和关之间进行切换。可能会显示一个字符串，但是该开关将不起作用。

####其他一般状态：
* **ADDITIONAL_INFO** *array* 数据点的数组，将显示在信息对话框的底部
* **URL** 常量*字符串*-该URL将在对话框中以iframe的形式打开
* **HTML** 常量*字符串*-如果未指定URL-Datapoint，则此标记将显示在iframe中
* **BACKGROUND_URL** 常量*字符串*-该网址将显示为设备拼贴的背景。它位于背景图像上方，但是如果图块处于活动状态或非活动状态，您可以将其配置为隐藏。
* **BACKGROUND_HTML** 常量*字符串*-如果未指定Background_URL，则此标记将显示为设备块的背景
* **BATTERY** *布尔值*-为true或* number *-小于10％时，将显示一点电池电量图标
    *您可以在选项部分“电池空图标”中进一步自定义电池图标的行为
* **错误**：*布尔值*-为true时，将显示一些感叹号图标
* **UNREACH** *布尔值*-为true时，将显示一个小的无线图标
    *行为可以在选项的“常规”部分中反转（使用连接而不是未连接）

###链接到其他视图：
*没有其他状态
* **链接视图属性**直接打开

### <img src="img/icons/switch_on.png" width="32">开关：
* **STATE** *布尔值*-显示和设置开/关状态
* **电源**：*数字*-功耗将在右上角以小号显示

### <img src="img/icons/button.png" width="32">按键：
* **STATE** *任何*-任何所需的状态类型
* **SET_VALUE** CONSTANT *string* 这是一个常数（不是链接的iobroker状态！），如果按下按钮，它将分配给STATE
* **OFF_SET_VALUE** 常量*字符串*-这是一个常数（不是链接的iobroker状态！）。如果已定义，则在in选项中定义的时间或100ms之后，STATE将重置为该值。

### <img src="img/icons/light_on.png" width="32">光：
每个灯可能具有以下一种或两种状态：

* **STATE** *布尔值*-显示和设置开/关状态
* **LEVEL** *数字*-显示并设置灯光水平

可选，您可以定义以下状态：

*对于彩色LED（HSB颜色空间）：
    * **色调**：*数字*-0-360°的灯光颜色（色相格式）
    * **饱和度**：*数量*-光线的饱和度（从白色到纯色）
 ***COLOR_BRIGHTNESS*** 字*-彩色LED的亮度（如果您处于LEVEL状态且没有白色LED，则将忽略此亮度，因为亮度完全由LEVEL控制）
*对于白色LED：
 ***CT*** 字*-灯光的色温（如果有两个白色阴影）
 ***WHITE_BRIGHTNESS*** 字*-白色LED的亮度（如果您处于LEVEL状态且没有彩色LED，则将忽略此亮度，因为亮度完全由LEVEL控制）
*替代色彩空间：
 ***ALTERNATIVE_COLORSPACE_VALUE*** 符串*或*数字*（取决于所选的色彩空间）-替代色彩空间的值

    如果您的设备不支持使用HUE，SATURATION和COLOR_BRIGHTNESS（HSB / HSV色彩空间），则可以使用多种替代色彩空间。在设备选项中，可以选择以下颜色空间之一：

    * **RGB** / **RGB** 您可以使用RGB格式（十六进制），而不是使用HUE，SATURATION和COLOR_BRIGHTNESS，可选，并以'＃'开头
    * **RGBW** / **RGBW** 您可以使用RGBW格式（十六进制），而不是使用HUE，SATURATION，COLOR_BRIGHTNESS和WHITE_BRIGHTNESS，可在前导'＃'处使用
    * **RGBWWCW** / **RGBWWCW** / **RGBCWWW** / **RGBCWWW** ，WW =暖白，CW =冷白），可选，以“＃”开头
    * **RGB（仅色相）** /** RGB（仅色相）**：可以使用RGB（仅色相）格式（十六进制）替代使用HUE，并以“＃”开头。在这种特殊情况下，RGB格式将仅接受色相色圆圈的纯饱和色。不允许混合白色
    * ** Milight的色相**：这是Milight设备的色相值，在色相色域中使用另一个起点：

````
tHue = modulo(66 - (hue / 3.60), 100) * 2.55;
modulo(-3.60 * (MilightHue/2.55 - 66), 360);
on modulo(n, m){ return ((n % m) + m) %m; }
````

切记：转换到替代色彩空间是由前端完成的，因此只有在iQontrol在某个地方打开时，它才处于活动状态。因此，您不能将其用作色彩空间的转换器。为避免对话循环，建议您要么使用原始色彩空间数据点（HUE，SATURATION，COLOR_BRIGHTNESS，CT，WHITE_BRIGHTNESS），要么使用替代色彩空间数据点来“替换”这些数据点。

*效果模式：
    * **效果**：*值列表*-播放效果
* **EFFECT_NEXT** *布尔值*-如果设置为true，将播放下一个效果（作为不支持EFFECT值列表的设备的替代）
* **EFFECT_SPEED_UP** / **EFFECT_SPEED_DOWN** *布尔值*-如果设置为true，则效果将加快/降低
*其他：
    * **电源**：*数字*-功耗将在右上角以小号显示

### <img src="img/icons/fan_on.png" width="32">风扇：
* **STATE** *布尔值*-显示和设置开/关状态
* **LEVEL** *数字*或*值列表*-风扇速度
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
    *或者，您可以分配*值列表*，以显示其他状态，例如“倾斜”（在窗口选项中，您可以定义代表打开的文本，代表倾斜的文本以显示正确的图标）
    *您还可以分配*字符串*以显示任何文本，例如“ 3个窗口打开”或“全部关闭”或*数字*
* **链接视图属性**直接打开

### <img src="img/icons/garagedoor_closed.png" width="32">车库门：
* **STATE** *布尔值*-显示门是打开还是关闭
    *或者，您可以分配*值列表*，以显示其他状态，例如“倾斜”
    *您还可以分配* string *以显示任何文本，例如“ 3扇门打开”或“全部关闭”
* **TOGGLE** *布尔值*-显示“切换”按钮，如果按下，则设置为true

### <img src="img/icons/door_locked.png" width="32">带锁门：
* **STATE** *布尔值*-显示门是打开还是关闭（门/窗接触）
* **LOCK_STATE** *布尔值*-显示和控制门是否被锁定或解锁（如果STATE为true，则禁用控件-因为您无法锁定门而已打开）
* **LOCK_STATE_UNCERTAIN** *布尔值*-如果为true，则状态将以斜体显示，以表示锁的确切位置未知
* **LOCK_OPEN** *布尔值*-如果设置为true，则门将完全打开

### <img src="img/icons/blind_middle.png" width="32">盲：
* **等级**：*数量*-百叶窗高度
* **方向**：*值列表*-可以是停止，向上和向下。可以配置代表Stop，Up，Down和Unknown的值
* **STOP** *布尔值*-如果按下停止按钮，则设置为true
* ** UP ** / ** DOWN **：*布尔值*-如果按下向上/向下按钮（对于使用UP和DOWN数据点而不是LEVEL或除LEVEL之外的设备），则设置为true。另外，您可以通过** UP_SET_VALUE ** / ** DOWN_SET_VALUE **数据点定义一个值。如果已定义，则在按下“向上” /“向下”按钮时，将发送此值而不是true
* ** FAVORITE_POSITION **：*布尔值*-可用于调出喜欢的位置。如果按下“收藏夹”按钮（可以在设备设置中配置按钮标题），则将true发送到该数据点。另外，您可以通过** FAVORITE_POSITION_SET_VALUE **数据点定义一个值。如果已定义，则当按下“收藏夹”按钮时，将发送此值而不是true
* **SLATS_LEVEL** *数量*-百叶板的位置百分比

### <img src="img/icons/fire_on.png" width="32">火灾传感器：
* **STATE** *布尔值*-如果为true，则传感器将显示为已触发
    *或者，您可以分配*值列表*，以显示其他状态，例如“篡改”
    *您还可以分配* string *来显示任何文本，例如“楼上火灾”
* **链接视图属性**直接打开

### <img src="img/icons/flood_on.png" width="32">洪水传感器：
* **STATE** *布尔值*-如果为true，则传感器将显示为已触发
    *或者，您可以分配*值列表*，以显示其他状态，例如“篡改”
    *您还可以分配* string *以显示任何文本，例如“楼上洪水”
* **链接视图属性**直接打开

### <img src="img/icons/alarm_on.png" width="32">报警：
* **STATE** *布尔值*-如果为true，则传感器将显示为已触发
    *或者，您可以分配*值列表*，以显示其他状态，例如“篡改”
    *您还可以分配* string *来显示任何文本，例如“楼上火灾”
* **CONTROL_MODE** *值列表*-选择操作模式，例如“武装”和“撤防”
    *在设备选项中，您可以定义代表撤防的值，因此可以显示代表图标

### <img src="img/icons/battery_full.png" width="32">电池：
* **状态**：*数量*-电池电量百分比
* **CHARGING** *布尔值*-如果为true，则显示一个充电图标
* **电源**：*数字*-功耗将在右上角以小号显示
* **VOLTAGE** *数字*-电压将在右上角以小号显示

### <img src="img/icons/value_on.png" width="32">值：
* **STATE** *任何*-要显示的任何有效状态（请查看“常规状态”部分）
* **等级**：*数字*-将在对话框中产生一个滑块

### <img src="img/icons/play_on.png" width="32">程序：
* **STATE** *布尔值*-如果设置为true，则程序将启动

### <img src="img/icons/play.png" width="32">现场：
* **STATE** *布尔值*-如果场景处于活动状态，则显示。根据场景的配置（虚拟组，启用或禁用false的设置值），切换命令将发送true，false，min，0，max或100。有一个选项始终发送true（禁用切换） 。

### <img src="img/icons/media_on.png" width="32">媒体播放器/遥控器：
* **STATE** *字符串*-“播放”，“暂停”或“停止”或*布尔值*-播放为true，停止为false
    *在设备选项中，您可以定义代表播放，暂停和停止的值
* **COVER_URL** *字符串*-封面图片的网址
* **艺术家，专辑，标题**：*字符串*-自我说明
* **TRACK_NUMBER** *数字*-自我说明
* **PREV，REWIND，PLAY，PAUSE，STOP，FORWARD，NEXT** *布尔值*-如果按下相应的按钮，则设置为true
* **SHUFFLE，MUTE，PLAY_EVERYWHERE，EJECT，POWER_SWITCH** *boolean* 相应功能的状态
* **REPEAT** *布尔值*-重复功能的状态或* string *-可以通过相应的选项定义3种状态：off值，all-all和repeat-one
* **DURATION，ELAPSED** *数字*-实际标题的持续时间和经过的时间-用于显示搜索栏
* **VOLUME** *数字*-用于音量滑块
* **源，播放列表**：*值列表*-显示选择菜单以从播放列表中选择来源或标题

#####要显示“通用遥控器”，您可以定义以下状态：
* **REMOTE_NUMBER** *字符串*-显示数字键盘，如果单击数字，则返回相应的数字
* **REMOTE_VOLUME_UP，REMOTE_VOLUME_UP，REMOTE_CH_UP，REMOTE_CH_DOWN** *string* 显示音量调高/调低和频道调高/调低的按钮，如果对应，则返回“ volumeUp”，“ volumeDown”，“ chUp”或“ chDown”按下按钮
* **REMOTE_PAD_DIRECTION，REMOTE_PAD_BACK，REMOTE_PAD_HOME，REMOTE_PAD_MENU** *字符串*-显示用于导航和返回的触控板
    *如果单击打击板的中间位置，则为“确定”，
*如果单击打击垫的边缘或沿相应的方向滑动打击垫，则为“左”，“右”，“上”或“下”
*'返回'，'主页'或'菜单*，如果单击了相应的按钮
*注意：您可以使用Target-Value-List（可通过每个数据点的扳手图标访问）将一个数据点链接到多个数据点，具体取决于返回的值（请参见上面的Modifying Datapoints部分）
* **REMOTE_COLOR** *字符串*-显示彩色按钮，如果单击了颜色，则返回相应的颜色（“红色”，“绿色”，“黄色”或“蓝色”）
* **REMOTE_ADDITIONAL_BUTTONS** *array* 按钮数组。如果单击按钮，则按钮的名称将发送到相应的状态ID
* **REMOTE_HIDE_REMOTE** *布尔值*-如果为true，则将隐藏完整的远程控制部分（例如，如果选择了有效的信号源，则仅显示该部分）

### <img src="img/icons/popup.png" width="32">弹出：
* **STATE** *任何*-可用于显示更多信息

### <img src="img/icons/link.png" width="32">外部链接：
* **STATE** *任何*-可用于显示更多信息
* **URL** 常量* string *-该URL将被打开

### <img src="img/icons/widget_on.png" width="32">小部件：
该设备具有一些特殊的预定义大小和显示设置，以显示网站，可以通过** BACKGROUND_URL **将其定义为小部件。在默认选项下，小放大按钮将显示在右上方。

* **STATE** *任何*-特殊：如果为空，将创建一个虚拟数据点，因此您可以单击该图标以激活并因此最大化小部件的大小

****

＃＃ 故障排除
*确保您已满足本页顶部的“您需要...”部分
*如果更新后某些功能无法正常工作，请尝试以下步骤：
    *开始上传适配器：

    \
        ![上载](../../../en/adapterref/iobroker.iqontrol/img/adapter_upload.png)

*清除浏览器缓存
*重新启动ioBroker

###如果您还有其他问题，请提供浏览器调试控制台中的日志以及错误行的屏幕截图：
*在浏览器打开的调试控制台中启动iQonrol（通常需要按<kbd>F12</kbd>来打开它）
*切换到控制台窗口并重现该错误
*在控制台窗口中查找消息
*出现错误时，列出导致错误的行号
*请单击此行号，并进行故障行的屏幕截图：

![故障排除控制台窗口](img/troubleshooting_consolewindow.png)![故障线路故障排除](../../../en/adapterref/iobroker.iqontrol/img/troubleshooting_faultyline.png)

****

## Changelog

### 1.2.4 (2020-09-14)
* (sbormann) Ignore readonly for enlarge.
* (sbormann) Always show enlarge button, if tile is enlarged.
* (sbormann) Enhanced some styles and marquee detection.
* (sbormann) Added url-parameter to open a specified dialog on loading the page.
* (sbormann) Changed the way cover images are loaded.
* (sbormann) Added option to start with new line for devices.
* (sbormann) Tiles with no link to other view now open dialog by default.
* (sbormann) Added mouse cursor styles depending on tile actions (open dialog, toggle, link to view, external link, ...).
* (sbormann) You can now chose caption and appearance (always visible, collapsible closed, collapsible opened) of ADDITIONAL_INFO.

### 1.2.3 (2020-09-07)
* (sbormann) Now it will be automatically scrolled to tile that is switched to Screen Size.
* (sbormann) New options to set tile size for an enlarged state, which can be toggled via a new enlarge-button and via the pressure menu (both needs to be turned on in options).
* (sbormann) Modified the widget-device to use the new enlarge-button and use a blank icon by default.

### 1.2.2 (2020-09-05)
* (sbormann) Enhanced TileActiveConditions to even work, if STATE is not defined.
* (sbormann) Added option to rename section 'Additional Buttons' for remote.
* (sbormann) Arrays like REMOTE_ADDITIONAL_BUTTONS are now sortable.
* (sbormann) Enhanced handling of BACKGROUND_URL/HTML.
* (sbormann) Added options to change caption of UP, STOP and DOWN for blinds.
* (sbormann) Disabled scrolling to top by reconnection.
* (sbormann) Added more tile size options (full width with different aspects and full screen).
* (sbormann) Fixed a bug where frontend could crash in endless loop.
* (sbormann) Added Widget to devices.

### 1.2.1 (2020-28-30)
* (sbormann) If STATE in Dialog contains (valid) HTML-Code, it is now rendered as HTML and - if state is not readonly - a HTML-Editor is shown.
* (sbormann) Added option to disable zoom-effect on mouse-over (for HTML-Widgets the zoom-effect may be disturbing).
* (sbormann) Remote is only shown, if one of the remote datapoints are defined.
* (sbormann) Added polyfil for older browsers for Array.from in shuffle.js.

### 1.2.0 (2020-28-29)
* (sbormann) Introducing different tile sizes, they can be configured in options for active and inactive state.
* (sbormann) Added BACKGROUND_URL and BACKGROUND_HTML as universal states to all devices, to display webpages as background of tiles (for FLOT, weather, security-cameras,...).
* (sbormann) Again better animations for shuffle.js.
* (sbormann) Reordered remote control sections.

### 1.1.15 (2020-08-27)
* (sbormann) Bugfixed shuffle.js (better animations, fixed hideIfInactive-Option).

### 1.1.14 (2020-08-24)
* (sbormann) Made HTML/URL-iFrame resizable (can be turned off by option).
* (sbormann) Bugfixing remote control.
* (sbormann) Added option to configure conditions for active battery-empty-icon.
* (sbormann) Dialog is now repositioned and bigger when phone is rotated to horizontal view.
* (sbormann) Breaking Change: Using now shuffle.js to reposition the tiles after resizing or orientation change. For now its only a nice effect, but this opens possibilities for future development with different tile-sizes.

### 1.1.13 (2020-08-23)
* (sbormann) Added option to remote to show vol and ch +/- inside pad.
* (sbormann) Fixed calculation of blind level.
* (sbormann) Fixed opening of external links.

### 1.1.12 (2020-08-21)
* (sbormann) Prevented selection of elements on long click for actual iOS version.
* (sbormann) Bugfixed tile active conditions for media.
* (sbormann) Renamed Media-Player to Media-Player / Remote-Control.
* (bluefox) The compatibility to socket.io 3.0.13 provided
* (sbormann) Prevented accidentally sorting of tables when clicking buttons.

### 1.1.11 (2020-08-21)
* (sbormann) Added option to define explicit conditions for a tile to be active.
* (sbormann) Added wrench icon to edit array dialog.

### 1.1.10 (2020-08-20)
* (sbormann) Added universal remote control including a track-pad to media-device.
* (sbormann) Device-Options are now sorted in categories.
* (sbormann) Collapsibles like additional informations are animated now.
* (sbormann) Added option for the device button to change the caption of the button in the dialog.
* (sbormann) Added option to open URL in new window instead of box inside dialog.
* (sbormann) Made toggeling of a state more fault tolerant if the type is not set correctly (iQontrol presumes now, it is a switch).

### 1.1.9 (2020-08-14)
* (sbormann) Enhanced popup with the ability to add buttons and confirmation messages.
* (sbormann) Fixed crash on some toolbar specifications.

### 1.1.8 (2020-08-02)
* (sbormann) Enhanced rendering of color-lights with alternative colorspace.
* (sbormann) Added rounded corners to iframe.
* (sbormann) Added sans-serif as standard font-family to iframe (may overwrite your settings - you can overwrite this by marking your own font-family css with '!important').
* (sbormann) Added sentry plugin.

### 1.1.7 (2020-07-28)
* (sbormann) Improved long press and forced touch handling.
* (sbormann) Added URL-Parameters returnAfterTimeDestiationView and returnAfterTimeTreshold.

### 1.1.6 (2020-07-24)
* (sbormann) Added some roles to recognize water and fire sensors more reliable.
* (sbormann) Added a block to blockly to send popup messages to iQontrol.
* (sbormann) Set option "Always use time instead of pressure" as standard - if you want to use ForcedTouch, disable this option.
* (sbormann) Updated some dependencies.

### 1.1.5 (2020-07-05)
* (sbormann) Made dialog movable by dragging title.
* (sbormann) Added LEVEL to fan.
* (sbormann) Fixed flickering of SVG-Background change on some devices.

### 1.1.4 (2020-07-03)
* (sbormann) Changed the way popup-iframes are created to allow execution of code inside them.
* (sbormann) Added the possibility to chose progressbars as icons and background-images for devices.
* (sbormann) Added progress-circle of remaining display-time to popup.

### 1.1.3 (2020-06-28)
* (sbormann) Added popup messagen (toast-messagen).
* (sbormann) Enhanced scenes to be able to toggle (added option to always send true, if you need the old behaviour).

### 1.1.2 (2020-06-21)
* (sbormann) Compatibility enhancements for repeat function of Media-Player.
* (sbormann) Made value-list and target-value-list sortable.
* (sbormann) Made sortable lists only draggable in y-axis.
* (sbormann) Added option to enter own value for value-lists.
* (sbormann) Added PLAY_EVERYWHERE to Media-Player.

### 1.1.1 (2020-06-16)
* (sbormann) Some fixes, styling and enhancements for Media-Player.
* (sbormann) Added option to hide play, pause and stop icon for Media-Player.
* (sbormann) Added function repeat one to Media-Player.
* (sbormann) Maquee is only restarting, if the value of a state has really changed.
* (sbormann) Fixed crash when some ids of linked views were missing.
* (sbormann) Added targetValues to custom configuration, which allows to send changes of a state to different target-datapoints.

### 1.1.0 (2020-06-13)
* (sbormann) Added Media-Player.

### 1.0.1 (2020-06-10)
* (sbormann) Fixed month for timestamps.
* (sbormann) You can now chose if values are linked states or constants.
* (sbormann) Added the ability to use variables in device-names.

### 1.0.0 (2020-06-01)
* (sbormann) Added a few captions to admin.
* (sbormann) Prevent pressure menu when scrolling and after opening menu.
* (sbormann) Corrected a few translations.

<details>
<summary>Older Changelog:</summary>

### 0.4.1 (2020-05-15)
* (sbormann) Added icons for toplight and tilted to window and enhanced window to recognize tilted position.
* (sbormann) Fixed crash when using some thermostats.
* (sbormann) New gulpfile and fixed translations.
* (sbormann) Further improvement of connection speed.
* (sbormann) Disabled context-menu on long/right-click.
* (sbormann) Revised pressure/forced touch and added option to always use time instead of pressure.

### 0.4.0 (2020-05-13)
* (sbormann) Major change using socket.io without conn.js which leads to a much faster initial connection.
* (sbormann) Improved loading and scrolling for popups.

### 0.3.7 (2020-05-06)
* (sbormann) Added more options to timestamp.

### 0.3.6 (2020-05-05)
* (sbormann) Added failback to variables
* (sbormann) Added option to add timestamp to state

### 0.3.5 (2020-04-26)
* (sbormann) Added variables to icons and backgroundimages (see readme)
* (sbormann) It is now possible to remove toolbar (the first view is then the home view)

### 0.3.3 (2020-04-19)
* (sbormann) Fixed device readonly for toggle state.
* (Sebastian Boramnn) Fixed devices with same name.
* (sbormann) Removed some old code from version <0.3.0.

### 0.3.2 (2020-04-19)
* (sbormann) Fixed loading toolbar with no entries on linked view.
* (sbormann) Fixed views with quotes in name.
* (sbormann) Fixed Flood-Sensor.

### 0.3.1 (2020-04-16)
* (sbormann) Breaking change: The complete configuration is no longer stored in ioBroker channels and states, but is fetched as one complete object, thus saving the configuration is much much faster than before.
* (sbormann) Views, devices and toolbar entries are now sortable via drag- and drop in the configuration dialog.
* (sbormann) After saving the configuration the instance ist now yellow until the configuration is completely written.
* (sbormann) Added invert UNREACH to device options.
* (sbormann) Added Flood-Sensor.
* (sbormann) Enhanced autocreation-feature by using ioBroker-Type-Detector by bluefox.
* (sbormann) Enhanced hue-lights when using alternative colorspace without white-values and changing ct.
* (sbormann) Enhanced hue-lights when using alternative colorspace to keep uppercase if needed.

### 0.2.20 (2020-04-08)
* (sbormann) If value for POWER is greater than 100, it is rounded without decimal places.
* (sbormann) Bugfixed invert-function with custom min and max.
* (sbormann) Added reload-link to loading page.
* (sbormann) Updated dependencies.

### 0.2.19 (2020-02-29)
* (sbormann) Updated dependencies.

### 0.2.18 (2020-02-29)
* (sbormann) Updated dependencies.

### 0.2.17 (2020-02-29)
* (sbormann) Added option to open dialog by clicking on tile for View, Window, Door, Fire, Temperatur, Humidity, Brightness and Motion.
* (sbormann) Added option to hide device, if it is inactive (handle with care, as you may not be able to switch it on again).

### 0.2.16 (2020-01-14)
* (sbormann) Fixed custom step for heating control.
* (sbormann) Fixed universal popup which was displayed, even when empty.

### 0.2.15 (2020-01-07)
* (sbormann) Added svg as possible image to upload.
* (sbormann) Made URL and HTML universal for nearly all devices, to display custom html code or content of an url inside the dialog (this could be used e.g. to display FLOT-graphs related to the device inside the dialog).
* (sbormann) Fixed disabled custom values with admin 3.7.6+ and js-controller <2.2.

### 0.2.14 (2019-11-12)
* (sbormann) Fixed icon-switching for thermostats.

### 0.2.13 (2019-10-23)
* (sbormann) Improved the return after time method.
* (Bluefox) Fixed translations in custom-dialog.

### 0.2.12 (2019-10-12)
* (sbormann) Improvement of homematic-thermostat for controler 2.0 compatiility.

### 0.2.11 (2019-10-07)
* (sbormann) Rewritten pincode-section to work with older browsers.
* (sbormann) Pincode now works for buttons as well.
* (sbormann) Modified the return after time function to work with older browsers.
* (sbormann) Fixed missing entrys in long pressure menus in iOS 13.

### 0.2.10 (2019-10-05)
* (Sebatian Bormann) Enhanced PIN-Code to view a num-pad when using an alphanumeric PIN.

### 0.2.9 (2019-10-02)
* (sbormann) Added optional PIN-Code to custom datapoint-configuration dialog (wrench icon).
* (sbormann) Added option to return to a view after a settable time of inactivity to settings.

### 0.2.8 (2019-09-27)
* (sbormann) Further improvement of index.js for controller 2.0 compatibility.

### 0.2.7 (2019-09-27)
* (sbormann) Fixed popup_width and popup_height.
* (sbormann) Further improvement of main.js and index.js for controller 2.0 compatibility.
* (sbormann) Added option showState for Button and Program.

### 0.2.6 (2019-09-24)
* (sbormann) Processing the plain text of values is now done after rounding a number value.
* (sbormann) Removed Icon_on for Button.
* (sbormann) Modified main.js for controler 2.0 compatibility.

### 0.2.5 (2019-09-22)
* (sbormann) Adjusted handling of pressure menu for iOS 13.
* (sbormann) Added Buffer for rendering a view while pressureMenue is beeing created.
* (sbormann) Added POWER and VOLTAGE to battery.

### 0.2.4 (2019-09-15)
* (sbormann) Further enhancement of control-mode handling for homematic-thermostat.
* (sbormann) Minor bugfixes.

### 0.2.3 (2019-09-15)
* (sbormann) Further enhancement of control-mode handling for homematic-thermostat.
* (sbormann) Added handling of alternative states-property-syntax.

### 0.2.2 (2019-09-14)
* (sbormann) Enhanced handling of control-mode for homematic-thermostat for more compatibility.
* (sbormann) Reduced rate of sending when moving slider for blinds and thermostats. 

### 0.2.1 (2019-09-07)
* (sbormann) Fixed crash of Backend (interchanged index_m.html and custom_m.html).

### 0.2.0 (2019-09-06)
* (sbormann) Added slats level to blind.

### 0.1.15 (2019-09-05)
* (sbormann) Added step to custom dialog, which allowes to define the resolution of value-sliders.
* (sbormann) Values with unit % and a range from min to max of 0-1 are now scaled to 0-100.
* (sbormann) Fixed conversion to alternative colorspace for hue lights.

### 0.1.14 (2019-09-01)
* (sbormann) Fixed missing dropdown-menus for images after sorting or adding items to tables.
* (sbormann) Level-Sliders will have a higher resolution for datapoints with small value ranges.

### 0.1.13 (2019-08-28)
* (sbormann) Fixed crash of frontend.
* (sbormann) Security updates.

### 0.1.12 (2019-08-28)
* (sbormann) Added width and height to options for popup.
* (sbormann) Added option to define free CSS-code to modify frontend.
* (sbormann) Infotext-values are now displayed as plain text or rounded if numbers.
* (sbormann) Added 'Close dialog after execution' to device options for scenes, programs and buttons.

### 0.1.11 (2019-08-26)
* (sbormann) Bugfix for chrome opacity transition bug.
* (sbormann) Added placeholder for default values for text inputs on options page.
* (sbormann) Added placeholder for default icon and blank icon to device options.
* (sbormann) Extended thermostat CONTROL_MODE by type switch.
* (sbormann) Fixed crash when using thermostat with setpoint an non homematic-devices.
* (sbormann) Added min and max to custom dialog.
* (sbormann) Now you can set none as a devices background image for active devices (formerly this was copied from inactive devices for backward-compatibility-reasons).
 
### 0.1.10 (2019-08-20)
* (sbormann) You can now define different units if value is zero or if value is one in custom dialog.
* (sbormann) When changing an image via the new drop-down, save button will be activated now.
* (Sebastian Boramnn) Added option, to remove overlay of tile, if device is active or inactive.
* (sbormann) Enhanced conversion function when converting booelan to number.
* (sbormann) Fixed renaming of image files (links to used images are now also correctly renamed).
* (sbormann) Fixed handling of spaces in image filenames.

### 0.1.9 (2019-08-18)
* (sbormann) Modified cache manifest to remove EISDIR-errors from log.
* (sbormann) Fixed toggle-entry in pressure menu.
* (sbormann) Added multiple file upload to images tab.
* (sbormann) Added check for dead links to other views when saving settings.
* (sbormann) You can now assign external urls to background images and icons (for example to add a weather-live-map).
* (sbormann) Removed options clickOnIconOpensDialog and clickOnTileToggles for Values and Programs as they are not switchable.
* (sbormann) Added OFF_SET_VALUE and the option 'Return to OFF_SET_VALUE after [ms]' to button.

### 0.1.8 (2019-08-11)
* (sbormann) Further improvements on connecting over iobroker.pro.
* (sbormann) COLOR_BRIGHTNESS and WHITE_BRIGHTNESS are now displayed, if LEVEL is not defined on hue lights.
* (sbormann) Added thumbnail-previews of fonts.
* (sbormann) Added clickOnIconOpensDialog and clickOnTileToggles to device options.

### 0.1.7 (2019-08-11)
* (sbormann) Added font-family, -size, -weight and -style to options for toolbar, headers, device-name, device-state and device-info-text.
* (sbormann) Added icon-size, icon-background-size and icon-background-corner-size to options for toolbar.

### 0.1.6 (2019-08-08)
* (sbormann) Next try to connect via iobroker.pro

### 0.1.5 (2019-08-06)
* (sbormann) Added validation to options.
* (sbormann) Extended alarm with CONTROL_MODE-datapoint and icons for disarmed, armed and triggered. 
* (sbormann) To save memory, only used states are saved in local memory (before all used AND all updated states were saved).
* (sbormann) Optimized socket-connectionLink to try to connect via iobroker.pro.

### 0.1.4 (2019-08-04)
* (sbormann) Optimized fading of tiles.
* (sbormann) Added toggle-button to blind, if no up/down button is defined.
* (sbormann) Added detection of protocol for socket in admin.
* (sbormann) Added confirm-flag inside custom datapoint configuration dialog to enable asking user to confirm before changing values.
* (sbormann) Added toggle-button to garage door.

### 0.1.3 (2019-08-01)
* (sbormann) Added seperate background image for active devices.
* (sbormann) Fixed background-options (color and opacity) for active and inactive device tiles.
* (sbormann) Added more space to views bottom.
* (sbormann) Fixed invert level for blinds.
* (sbormann) Organized options in collapsible layout.

### 0.1.2 (2019-07-29)
* (sbormann) Added FAVORITE_POSITION (with configurable button caption) and SET_VALUE for UP, DOWN and FAVORITE_POSITION to Blinds.
* (sbormann) Added 'No Icon' as option to icon configuration.
* (sbormann) Addes icon to 'Link to other view'.
* (sbormann) Added a bunch of new standard-icons.

### 0.1.1 (2019-07-28)
* (sbormann) Added usericons.

### 0.1.0 **stable** (2019-07-27)
* (sbormann) First stable release.
* (sbormann) Added show timestamp to device options to chose default behaviour and a small timestamp-icon in the dialog to show and hide timestamps.
* (sbormann) Fixed readonly handling of control mode for Homematic Thermostats.

### 0.0.49 (2019-07-27)
* (sbormann) Added common type and common role to custom dialog.
* (sbormann) Added pressure menu for toolbar.

### 0.0.48 (2019-07-25)
* (sbormann) Datapoint BATTERY can now be a level - the battery-empty-icon will be shown if value is less than 10%.
* (sbormann) Added additional colorspaces for hue lights (RGB, RGBW, RGBWWCW, RGBCWWW, Milight-Hue, RGB Hue Only).
* (sbormann) Added Garage Door.

### 0.0.47 (2019-07-22)
* (sbormann) Added targetValueId inside custom datapoint configuration dialog which allowes to have different datapoints vor actual value and for target value.
* (sbormann) Added invert-flag inside custom datapoint configuration dialog.

### 0.0.46 (2019-07-20)
* (sbormann) Added options to device configuration dialog.
* (sbormann) Added readonly-flag to device options.
* (sbormann) Added invert color temperature flag to device options for lights.
* (sbormann) Added invert flag to device options for blinds.

### 0.0.45 (2019-07-15)
* (sbormann) Devices are now zoomed to fit screen (configurable under options).

### 0.0.44
* (sbormann) Fixed incomplete loading of admin page with some settings.
* (sbormann) Added datapoint-configuration via custom-dialog.

### 0.0.43
* (sbormann) Changed initialization of socket.io to an asynchronous process to wait for connection before trying to use file-operations.
* (sbormann) Added general datapoint ADDITIONAL_INFO to display additional datapoints at the bottom of the info-dialog.
* (sbormann) Fixed value list type conflict.

### 0.0.42
* (sbormann) Adjusted pathes of demo-files.

### 0.0.41
* (sbormann) Major Change: The location of the uploaded userimages has changed, so the images can be accessed by backup-function of iobroker - the images will be moved to the new location automatically - please open admin-page for ALL instances and save the settings to adjust the filenames of used images automatically.
* (sbormann) Inverted colortemperature-scale for hue-lights (now it uses the mired-scale = micro reciprocal degree-scale instead of kelvin).
* (Ansgar Schulte) Added Up and Down Buttons to Blinds.
* (sbormann) When creating a directory it will be entered.
* (sbormann) Added Effect-Section to Light
* (sbormann) If a state is not set yet, a standard value will be used

### 0.0.40
* (sbormann) Appended missing conn.js in admin-folder.

### 0.0.39
* (sbormann) Now file-operations in admin should work (file and directory renaming and deleting).
* (sbormann) Added Image-Popup in admin.
* (sbormann) Renamed demo-images.

### 0.0.38
* (sbormann) Again changes to forced touch for gained compatibility.

### 0.0.37
* (sbormann) Some more little changes to forced touch.
* (sbormann) Added option to open a view via url by adding 'home=<viewId>' to url-parameters.

### 0.0.36
* (sbormann) Added compatibility for some android devices to forced touch.
* (sbormann) Changed the way hue and ct is displayed for better compatibility to some devices.

### 0.0.35
* (sbormann) Fixed crash of frontend, if a device has no role and added info to admin to chose a role.
* (sbormann) Removed filtering of states in select-id-dialog for autocreate.
* (sbormann) Further improvments of forced touch with force-indicator and hopefully a better compatibility with more devices.

### 0.0.34
* (sbormann) Added forced touch menu (press hard or press long on unsupported devices), which will give more room for extended features in future.
* (sbormann) Linked Views can now be set for all roles and are available in the dialog and by a forced touch.
* (sbormann) Added timestamp for Window, Door, Fire, Temperature, Humidity, Brightness and Motion.
* (sbormann) Fixed issure 49 (state for role switch if type is number).

### 0.0.33
* (sbormann) Added WINDOW_OPENING_REPORTING to thermostat and homematic-thermostat.
* (sbormann) Fixed marquee not always starting correctly.

### 0.0.32
* (sbormann) Added Battery.
* (sbormann) Heaters are displayed as inactive, if set-value is at its minimum.
* (sbormann) Added meta.user object to allow backup of user uploaded files via iobroker backup.
* (sbormann) Added check for existance of common.role before rendering view.

### 0.0.31
* (sbormann) Fixed some typos.
* (sbormann) Enhanced color-mixing of light with seperate brightness-datapoints for color and white.
* (sbormann) Rewritten rendering of view as praparation for further enhancements.
* (sbormann) Rewritten rendering of dialog as praparation for further enhancements.
* (sbormann) Added option to colorize Device-Texts.

### 0.0.30
* (sbormann) Fixed io-package.json

### 0.0.29
* (sbormann) changed parts of the code to be backward-compatible to older browsers like ie 11.
* (sbormann) Now its possible to define a value list for a data point under .native.states which will have a greater priority than a value list under .common.states. 
* (sbormann) Updated dependency for axios to 0.0.19 to fix a scurity issue.

### 0.0.28
* (sbormann) Added datapoint POWER to switch, fan and light.
* (sbormann) Fixed marquee for small info texts in the upper right corner at big screen sizes.
* (sbormann) Added more options for configuring header-colors and device-colors (experimental state). Text-color ist not configurable yet.

### 0.0.27
* (sbormann) Added marquee (scrolling text) for long states and device names (can be configured  in options). 
* (sbormann) Added more toolbar-options. 
* (sbormann) Enhanced handling of value lists. 
* (sbormann) Disabled swiping when dialog is opened.

### 0.0.26
* (sbormann) Added brightness to motion-sensor.
* (sbormann) Added options tab. You can now configure colors of toolbar.
* (sbormann) Fixed rendering of constants.
* (sbormann) Resized the demo-wallpapers for faster loading.

### 0.0.25
* (sbormann) Added motion-sensor.
* (sbormann) Added description, how the frontend works: [Operating Principle of Frontend](Operating%20Principle%20of%20Frontend.md).
* (sbormann) Added dialog for editing constants like SET_VALUE, URL or HTML.
* (sbormann) Changed the way arrays are stored.
* (sbormann) Added submit-button for values of type string.
* (sbormann) Added saturation to hue-lights.
* (sbormann) Better icons for color-temperature and brightness-sensor.

### 0.0.24
* (sbormann) Fixed jittering on Safari while scrolling (was related to Pull2Refresh).
* (sbormann) System language of iobroker will be loaded and used.

### 0.0.23
* (sbormann) Rewrote how constant values (instead of linkedStates) are handeled - this is a requirement for further development.
* (sbormann) Fixed Pull2Refresh on android devices / chrome.
* (sbormann) Added external links
* (sbormann) Added popups with iframes

### 0.0.22
* (watcherkb) Improved german translation.
* (BramTown) Improved german translation.
* (sbormann) Short after another coming reconnect-events (<5s) are ignored now.

### 0.0.21
* (sbormann) Added Pull2Refresh on mobile devices - reloads whole page when pulling down on homepage, otherwise only the acual view is reloaded.
* (sbormann) Improved reloading on reconnect (hoepefully to get it finally good working on iOS 12.2).

### 0.0.20
* (sbormann) New trial to get it working in iOS 12.2.

### 0.0.19
* (sbormann) Improved reloading of page in new PWA-Mode of iOS 12.2.

### 0.0.18
* (sbormann) Improved fetching of VALVE_STATES.
* (sbormann) Changed Button Icon.
* (sbormann) Added Loading-Spinner if disconnected.
* (sbormann) Due to new iOS 12.2 PWA-Mode added visibility-check and connectivity-check.
* (sbormann) Added role-icons to role-selectbox in edit device dialog.
* (sbormann) Fixed missing value-list for states of the type string.

### 0.0.17
* (sbormann) Changed description of slider (level/dimmer/value/height).

### 0.0.16
* (sbormann) Role of device is displayed in devices-table.
* (sbormann) VALVE_STATES is now editable via GUI (show opening of valves associated with a thermostat in percentage).
* (sbormann) Added Role 'Button': You can define a constant SET_VALUE which will be written to the ID that is linked with STATE if the button is pressed.
* (sbormann) Rewritten parts of front-end to guarentee better compatibility. Boost-Mode for Homematic-Thermostat should work now.
* (sbormann) Added state BOOST_STATE for Homematic-Thermostat - ability to display remaining boost-time if in boost-mode.
* (sbormann) Added dessription of roles and corresponding states.
* (sbormann) Temperature und Humidity-Sensors can now display a STATE at bottom of device, and both, TEMPERATURE and HUMIDITY, in small in the upper right corner.
* (sbormann) Better handling of Auto-Create of Temperature- und Humidity-Sensors.
* (sbormann) German translation: 'geöffnet' lower case.
* (sbormann) Zigbee humidity and temperature added to auto-creation.
* (sbormann) Fixed not scrollable selectbox at devices tab.

### 0.0.15
* (sbormann) Improved check for value type of states.
* (sbormann) Improved slider-tooltip to lower font-size at large numbers.

### 0.0 14
* (sbormann) If role of state is not further specified, then check for role of parent object.

### 0.0.13
* (sbormann) Doors and Windows now force true/false to be translated to opened/closed.
* (sbormann) Double Entrys on WelcomeScreen/Overview removed.
* (sbormann) States are now set with the correct value type.
* (sbormann) Changed recognition of state types. I hope there are no new bugs now!

### 0.0.12
* (sbormann) Check for unallowed chars in object names.
* (sbormann) Check for duplicates in view names.
* (sbormann) Level fires a slider in dialog - even when it has a state list (HUE again :)).
* (sbormann) Added Blinds (Homematic) - please test it, i don't have one to test.

### 0.0.11
* (sbormann) Added compatibility for edge and firefox. 
* (sbormann) Again Hue bugfixes.
* (sbormann) Removed Tooltip from Toolbar.

### 0.0.10
* (sbormann) Added ColorTemperature. Hoepfully HUE works now? Can't test ist, because i do not own any hue lamp :)

### 0.0.9
* (sbormann) Philips HUE added to autocreate (colortemp is not working yet!).  
* (sbormann) LinkedView now also works on windows, doors and fire-sensor.
* (sbormann) Added translation (thanks ldittmar!).

### 0.0.8
* (sbormann) Added icons to image selectboxes.

### 0.0.7
* (sbormann) Changed order of tabs
* (sbormann) Autocreate for shelly should work now (i hope so, can't test it here)

### 0.0.6
* (sbormann) Improved speed of select id and autocreate
* (sbormann) Set filter to channel on autocreate

### 0.0.5
* (sbormann) Bugfix: creation of many devices schould work now

### 0.0.4
* (sbormann) Bugfix: copy device created just a reference to old object
* (sbormann) Addes Toolbar-Icons

### 0.0.3
* (sbormann) various bugfixes

### 0.0.2
* (sbormann) first partly running version

### 0.0.1
* (sbormann) initial release

</details>

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