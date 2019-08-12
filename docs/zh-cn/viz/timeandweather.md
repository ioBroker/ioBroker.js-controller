---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/viz/timeandweather.md
title: 时间及天气
hash: gobWIDvudg3iW1eszIOA2lKUW5A+/3y5Dr7K9GR2O4c=
---
＃时间和天气
此集提供可显示日期，时间和天气预报的小部件。

|小工具|图片|说明|
|---------------------------------|-------|-------------|

[很酷的时钟](#cool-clock)| ！[001] |模拟时钟|
[翻转时钟](#flip-clock)| ！[002] |复古风格的数字时钟（带动画）|
[段时钟](#segment-clock)| ！[7] | 7段式数字时钟|
[简单的时钟](#simple-clock)| [005] |数字！|
[简单日期](#simple-date)| [006] |日期！|
[SVG时钟](#svg-clock)| [007] |非常可变的模拟式时钟|
[HTC天气](#htc-weather)| [003] |具有天气信息的时间显示 - >不再工作|
[雅虎天气](#yahoo-weather)|来自雅虎的天气预报 - >不再起作用了
[天气定制](#weather-custom)| ！[010] |具有可配置状态的天气预报|

*********************************************************

###酷时钟
模拟时钟！[001]

属性|说明|
---- | ---- |
主题|不同的演示文稿主题可用|
显示无秒|没有秒针的显示|
数字|。|
显示上午/下午|美式风格的时间|

**示例：**！[[：arrow_up：回到顶部](#TimeWeather)************************************************************************* **********************

###翻转时钟
复古风格数字时钟与动画数字！[002]

[：arrow_up：回到顶部](#TimeWeather)  
*********************************************************

###段时钟
7段数字时钟，可以显示当前时间或数据点的时间。

！[004]

|属性|说明|
| ----|----|
|对象ID |数据点，如果您不希望显示当前时间|
|激活时钟||
|秒|秒|
|模板||
|分段颜色AN |活动段的颜色|
|段颜色OFF |非活动段的颜色|
|当前文本的间隔[ms] |运行文本表示的速度|
|段数|每位7/14/16段|
|字符的角度|数字的倾斜|
|字符高度|数字高度|
|字符宽度|数字宽度|
|字符间距|数字间距|
|段宽度|每段的宽度|
|段距离|段之间的距离|
|角部形状|

**示例：**！[011][：arrow_up：回到顶部](#TimeWeather)******************************** **********************

###简单的CLock
7段数字时钟显示当前时间。

！[005]

属性|说明|
---- | ----不显示秒|不显示秒闪烁| ？没有风格| ？

**示例：**！[012][：arrow_up：回到顶部](#TimeWeather)********************************* **********************

###简单日期
日期以7段样式显示当前日期。

！[006]

属性|说明|
---- | ----平日|在星期几短暂的日期前显示工作日|显示星期几作为快捷方式（仅在工作日激活时）短年|仅显示年份的最后两位数零前导|日和月中的前导零作为文本的月份|作为文本的月份短月份|将月份缩写写为文本美国格式|没有风格|？

**示例：**！[013][：arrow_up：回到顶部](#TimeWeather)************************************ **********************

### SVG时钟
模拟时钟有许多显示选项

！[007]

属性|说明|
---- | ----四分之一文本大小|四分之一小时演示文稿的文本大小四分之一文本颜色|四分之一小时演示文稿的文本颜色四分之一刻度颜色|四分之一刻度的大小分钟文本大小|分钟演示文稿的文本大小分钟文本颜色|分钟色调文本小刻度颜色|减去刻度（每分钟）显示秒|显示秒针指针颜色|时针和分针颜色指针冰球颜色|小时和分钟的偏移颜色元素手二手颜色|秒针颜色文本字体|恳求数字

**示例：**！[015][：arrow_up：回到顶部](#TimeWeather)****************************** **********************

### HTC天气
天气指示器（由于......不再起作用）！[003]

属性|说明|
---- | ----城市|为这个城市选择天气城市名称|城市名称语言|显示语言更新间隔|更新天气数据

[：arrow_up：回到顶部](#TimeWeather)  
*********************************************************

###雅虎天气
天气预报指标（由于Yahoo Weather Service发生变化而无法使用）（请参阅https://developer.yahoo.com/weather/）

！[010]

[：arrow_up：回到顶部](#TimeWeather)  
*********************************************************

###天气定制
任何天气数据源的天气预报显示。
目前建议使用适配器'daswetter'的数据。

！[010]

属性|说明|
---- | ----城市|为这个城市选择天气城市名称|城市名称语言|显示语言

####现在
属性|说明|
---- | ----温度ID |当前温度的数据点文本ID |天气描述文本的数据点湿度ID |湿度数据点最低温度ID |每日最低温度的数据点最高温度ID |每日最高温度的数据点风速|风速数据点风向|数据点用于风向图像URL |具有适当天气符号的URL的数据点

####早上
属性|说明|
---- | ----天气描述文字的文本ID最低温度ID |低温日数据最高温度ID |最高温度数据点图像URL |带有天气图标URL的数据点

所以接下来的几天（取决于预测需求和点击耐力）......

**示例：**！[016][：arrow_up：回到顶部](#TimeWeather)***************************** **********************

[001]: media/iobroker-vis-timeandweather_timeandweather_coolclock.png

[002]: media/iobroker-vis-timeandweather_timeandweather_flipclock.png

[003]: media/iobroker-vis-timeandweather_timeandweather_htcweather.png

[004]: media/iobroker-vis-timeandweather_timeandweather_segmentclock.png

[005]: media/iobroker-vis-timeandweather_timeandweather_simpleclock.png

[006]: media/iobroker-vis-timeandweather_timeandweather_simpledate.png

[007]: media/iobroker-vis-timeandweather_timeandweather_svgclock.png

[008]: media/iobroker-vis-timeandweather_timeandweather_coolclock_config.png

[009]: media/iobroker-vis-timeandweather_timeandweather_htcweather_config.png

[010]: media/iobroker-vis-timeandweather_timeandweather_yahooweather.png

[011]: media/iobroker-vis-timeandweather_timeandweather_segmentclock_config.png

[012]: media/iobroker-vis-timeandweather_timeandweather_simpleclock_config.png

[013]: media/iobroker-vis-timeandweather_timeandweather_simpledate_config.png

[014]: media/iobroker-vis-timeandweather_timeandweather_svgclock_config.png

[015]: media/iobroker-vis-timeandweather_timeandweather_explain_svgclock.gif

[016]: media/iobroker-vis-timeandweather_timeandweather_explain_CustomWeather.gif