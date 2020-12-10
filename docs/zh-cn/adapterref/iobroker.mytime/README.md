---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mytime/README.md
title: ioBroker.mytime
hash: hSNDCCJ3wn9bOMo9ZSs+ajXFifihxmdOadKkO+16SeY=
---
![商标](../../../en/adapterref/iobroker.mytime/admin/mytime.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.mytime.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.mytime.svg)
![安装数量（最新）](http://iobroker.live/badges/mytime-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/mytime-stable.svg)
![依赖状态](https://img.shields.io/david/oweitman/iobroker.mytime.svg)
![已知漏洞](https://snyk.io/test/github/oweitman/ioBroker.mytime/badge.svg)
![特拉维斯](http://img.shields.io/travis/oweitman/ioBroker.mytime/master.svg)

＃ioBroker.mytime
## IoBroker的mytime适配器
该适配器处理时间（例如：倒数等）。
倒计时功能提供了可用于管理倒计时的数据点（例如，在脚本中）。该适配器还包括几个小部件，以可视化这些倒数计时。
时间序列可用于创建触发数据点的复杂时间序列。

###配置
＃＃＃＃ 倒数
在配置对话框的“倒计时”选项卡中，您可以创建一个新的倒计时，例如“测试”，将计时器设置为10秒，然后导入以下小部件。
数据点已为名为test的倒计时预先配置。

#####停止行为计时器
倒数计时结束后，倒数计时将重设为定时器设定的时间。

#####停止行为为零倒数计时使信号停止后，倒数计时保持为0。
＃＃＃＃ 时间序列
在配置对话框选项卡“时间序列”中，可以创建带有一个或多个计时器的新时间序列。对于每个计时器，您可以定义不同的参数每个时间序列都会创建一个单独的数据点，该数据点将在计算出的时间事件中触发。
时间事件是实时计算的。但是，使用的rrule库在所有参数组合中都不是完美的。
这表明，通过某些组合，页面将陷入无限循环。
演示页面http://jakubroztocil.github.io/rrule/也可以用于实验。
除了添加计时器外，还可以添加计时器以排除时间事件，添加单个时间事件以及排除单个时间事件。

###用法
＃＃＃＃ 时间序列
#####可用数据点
配置新的时间表之后，适配器将创建以下数据点：

|数据点|描述|
|-----------|---------------------------------------------------------------------------|
|动作|盗窃时期的实际状态。可能的值是stop，run |
| cmd |没有功能的atm |

#####可用的动作状态
|动作|描述|
|-----------|-------------------------------------------------------------------------------------------------------|
|停止|目前没有任何时间事件处于活动状态|
|运行时间事件被触发。在配置的持续时间之后，数据点将变为停止|

＃＃＃＃ 倒数
#####可用数据点
在配置新的倒计时之后，适配器将创建以下数据点：

|数据点|描述|
|-----------|---------------------------------------------------------------------------|
|动作|倒计时的实际状态。可能的值是stop，run，pause，end |
| cmd |命令的数据点。可能的命令如下所述|
|开始数据点的开始时间（以毫秒为单位）|
|结束|结束时间的数据点（以毫秒为单位）|
|计时器| datapoint设置的总时间（以毫秒为单位）|

#####可用的动作状态
|动作|描述|
|-----------|-------------------------------------------------------------------------------------------------------|
|停止|倒计时停止，开始和结束时间设置为0 |
|运行倒计时开始。如果倒数计时已到结束时间。动作切换到结束|
|暂停|倒数处于暂停模式。结束时间设置为暂停时间|
|结束|倒计时结束。您可以将此状态用作触发进一步操作（声音，弹出窗口等）的状态| |

##### Cmd数据点的可用命令
|命令例子描述|
|---------------|----------------------|----------------------------------------------------------------------------------------------|
| +值| +1：10 |为倒计时设置增加时间。下次启动时将考虑该设置|
|值| -1：2：3 |从倒计时中减去时间。下次启动时将考虑该设置|
| =值| = 5：00 |将倒数计时器设置为此时间。 |
| #ISO日期| ＃2020-01-01T10：00：00 |将倒数计时器设置为目标时间。时间必须格式化为ISO-日期字符串|
| $ Time | $ 20：15 |将倒数计时器设置为目标时间。如果时间早于当前时间。设置第二天。 |
|开始开始开始倒计时|
|停止|停止|停止倒计时。倒数时间重设为设定|
|暂停|暂停|暂停倒计时|
|结束|结束|停止倒计时。倒计时设置为0 |
| setstop2timer | setstop2timer |将停止行为配置设置为计时器|
| setstop2zero | setstop2zero |将停止行为配置设置为零|
|保存保存将数据点中定义的配置保存到iobroker配置|
| | | iobroker自动保存后重新启动适配器|

#####设置倒数计时器的值的格式
您可以将倒计时设置为无限时间。
值的表示法是[天：[小时：[分钟：[秒]]]]天，小时和分钟是可选的。
如果要将计时器设置为一天，则必须设置小时，分钟和秒，也不必遵守正常值范围（例如0-24小时）。您还可以设置48小时。
如果需要，可以设置不规则的时间符号。时间分别总结

**例子**

|设置|描述|
|-----------|---------------------------------------------|
| 1：0：0：0 |设置/添加/减去1天计时器|
| 2：0：0 |设置/添加/减去2小时计时器|
| 3：0 |设置/添加/减去3分钟的计时器|
| 120 |设置/添加/减去计时器120秒|
| 48：0：0 |设置/添加/减去计时器48小时|
| 48：75：120 |设置/添加/减去计时器|

#####模板的格式，用于格式化小部件中的倒计时输出
可以使用以下占位符：

|占位符|描述|
|-------------|-----------------------------------------------------------------|
| d |天没有前导零|
| dd |前导零的日子|
| H |小时没有前导零|
| HH |小时前导零|
|米|分钟没有前导零|
|毫米分钟，前导零|
| s |秒，不带前导零|
| ss |秒，前导零|
| \ |如果要在输出中使用占位符，请转义字符|

**例子**

以下所有带有倒数计时器1：2：3：4的示例

|模板|例子结果 |
|-----------------------|-------------------|--------------------------------------------------|
| d \ d Hh m \ m s \ s | 1d 2h 3m 4s |有转义字符且不带前导零的字符|
| dd \ d HHh mm \ m ss \ s | 01d 02h 03m 04s |带有转义字符和前导零|
| ss \ s | 93784s |仅几秒钟|
| dd \ d HH \ h | 01d 02h |只有几天和几小时|
| HH \ h mm \ m | 26h 03m |仅数小时和数分钟|

###小部件
####小部件倒数普通
用于纯文本输出的倒计时小部件

#####小部件属性
###### Oid倒计时数据点的计时器数据点。
###### Format格式化计时器输出。默认值为mm：ss。有关详细信息，请参见章节格式模板
#####示例小部件代码
这些小部件已针对名为test的倒计时进行了预配置。

```
[{"tpl":"tplMyTimeCountdownPlain","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"countdown_oid":"mytime.0.Countdown.test.timer","format":"d H m s"},"style":{"left":"771px","top":"143px","width":"151px","height":"16px"},"widgetSet":"mytime"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"+10s","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"+10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"742px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"-10s","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"-10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"801px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"=10","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"=10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"864px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"start","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"start","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"742px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"pause","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"pause","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"801px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"stop","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"stop","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"864px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"}]
```

#####倒数的实际操作状态（cdstop，cdrun，cdpause，cdend）可作为CSS-Class选择器使用。
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

####小部件倒计时圈
环形/圆形设计中的倒计时小部件。

#####小部件属性
###### Oid倒计时数据点的计时器数据点。
###### Notimetext禁用极地时钟上的时间文本
###### Format格式化计时器输出。默认值为mm：ss。有关详细信息，请参见章节格式模板
######反向设置，用于增大或缩小环/圆
###### Width圆环或圆形的宽度。
######环间隙环之间的像素间隙
######圆环/圆形末端的上限设置：圆形或直线
######背景圆环/圆圈的背景颜色
######前景色圆环/圆的前景色
###### Showsec显示秒数
###### Showmin显示分钟数
###### Showhrs显示分钟数
###### Showday显示日子
#####倒数的实际操作状态（cdstop，cdrun，cdpause，cdend）可作为CSS-Class选择器使用。
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

####小部件倒计时FlipClock
机场倒装板风格的倒计时小部件

#####小部件属性
###### Oid倒计时数据点的计时器数据点。
###### Countdown_showsec显示秒部分。两个单元之间一定不能有间隙。
###### Countdown_showmin显示分钟部分。两个单元之间一定不能有间隙。
###### Countdown_showhrs显示小时部分。两个单元之间一定不能有间隙。
###### Countdown_showday显示日期部分。两个单元之间一定不能有间隙。
###### Countdown_color倒数计时器的颜色
###### Countdown_background_color倒数计时器的背景颜色
###### Countdown_dot_color countdowntimer点的颜色
＃＃＃＃＃ 提示
如果要调整倒计时时钟的大小，请在vis中的CSS设置下输入一半大小：组CSS公用/转换“ scale（0.5）”

#####倒数的实际操作状态（cdstop，cdrun，cdpause，cdend）可作为CSS-Class选择器使用。
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

####小部件倒计时NixieClock
Nixie-Tube / LED风格的倒数计时小部件

#####小部件属性
###### Oid倒计时数据点的计时器数据点。
###### Countdown_showsec显示秒部分。两个单元之间一定不能有间隙。
###### Countdown_showmin显示分钟部分。两个单元之间一定不能有间隙。
###### Countdown_showhrs显示小时部分。两个单元之间一定不能有间隙。
###### Countdown_showday显示日期部分。两个单元之间一定不能有间隙。
###### Countdown_color_active倒数计时器的颜色
###### Countdown_color_inactive无效数字的颜色
###### Countdown_opacity_inactive不活动数字的颜色的不透明度
###### Countdown_glowcolor数码数字周围的发光颜色
＃＃＃＃＃ 提示
如果要调整倒数计时的大小，请在vis中的css设置下输入一半大小：组CSS公用/转换“ scale（0.5）”

#####倒数的实际操作状态（cdstop，cdrun，cdpause，cdend）可作为CSS-Class选择器使用。
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

＃＃ 去做
* 7段显示
*滚动数字
*可自定义的字体
*字时钟计时器？
* ts：排除的时间表（时间范围，单个日期）
* ~~定时调度程序：计划单个日期/时间和诸如Outlook之类的重复事件~~
* ~~ Nixie风格~~
* ~~翻转板显示（机场显示）~~
* ~~新命令只设置目标时间而没有日期~~
* ~~倒数圈小部件，带有禁用倒数文字的选项
* ~~ Groupseperator'。'以名字~~
* ~~极钟~~
* ~~倒转圈~~
* ~~带圆帽的圆圈~~

## Changelog


### 0.6.1
* remove beta tag from widgets * m,assive reengeneering of the react classes, add functions für exclusion rules, adding single time events and exclude single time events
### 0.6.0
* Introduction of new functionality timeseries
### 0.5.2
* fix an issue and introduce a new command save to save the configuration defined in datapoints to the iobroker configuration data
### 0.5.1
* Migration of old counters
### 0.5.0
* Change settings dialog to react
### 0.4.2
* performance optimization. mytime now checks the data from internal and did not read the data allways from datapoints | update dependencies
### 0.4.1
* widget cd flipclock: remove dot labels
### 0.4.0
* New widget NixieClock
### 0.3.1
* remove mytime tile in iobroker overview
* set initial visual countdown value to 0
* prefix css classes, due css artefacts from other adapters (eg kodi and css class stop)
### 0.3.0
* new command to set only target time without date
* countdown circle widget now with option to disable countdown text
* timers are now groupable in subdirectories. you can now enter dots (.) as a groupseperater in the name of a timer
### 0.2.1
* fix timer display in configuration dialog
* fix default template of countdown plain
* add icons for countdonw plain and countdown circle widgets 
* fix startangle calculation for countdown circle if time values are 0
* remove timer intervals in editmode due to interfer with the configuration dialog and didnt save the ne values
### 0.2.0
* extend the countdown circle with more rings for days, hours and minutes
### 0.1.2
* Setting for growing or shrinking the ring/circle
* Setting for the ends of the ring/circle: round or straight
* Extend special char filtering with umlauts
* Fix state request issue in widget countdown circle 
### 0.1.1
* Add a countdown name datapoint
### 0.1.0
* Forum release
### 0.1.0
* initial release

## License
MIT License

Copyright (c) 2020 oweitman <oweitman@gmx.de>

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