---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-materialdesign/README.md
title: ioBroker.vis-materialdesign
hash: LPbONeBhVG+lpgVFNacUFboup+8X2LBTK5KlDGcR62w=
---
![商标](../../../en/adapterref/iobroker.vis-materialdesign/admin/vis-materialdesign.png)

![稳定版](http://iobroker.live/badges/vis-materialdesign.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.vis-materialdesign.svg)
![安装数量](http://iobroker.live/badges/vis-materialdesign-installed.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.vis-materialdesign.svg)
![依赖状态](https://img.shields.io/david/Scrounger/iobroker.vis-materialdesign.svg)
![已知漏洞](https://snyk.io/test/github/Scrounger/ioBroker.vis-materialdesign/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vis-materialdesign.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/Scrounger/ioBroker.vis-materialdesign/master.svg)

＃ioBroker.vis-materialdesign
## IoBroker VIS的材料设计小部件
[![贝宝]（https://www.paypalobjects.com/zh_CN/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YHPPW474N5CKQ&source=url)

基于[Google材料组件网络库](https://github.com/material-components/material-components-web)的材料设计小部件。

基于[chartjs库](https://www.chartjs.org/)的图表。

###支持的浏览器
https://github.com/material-components/material-components-web/blob/master/docs/supported-browsers.md

##按钮切换
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/buttons.gif)

##卡
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/cards.png)

##图标按钮
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/icon-button.gif)

##清单
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/list.gif)

##进展
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/progress.gif)

##滑块
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/slider.gif)

下表中未列出的设置是不言自明的。

<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/slider.png"></td><td>初始化延迟</td><td>如果在加载运行时后滑块不可见或不可操作，则必须增加该值。输入以毫秒为单位。 <br>例如，增加250步，直到滑块起作用。 </td></tr></tbody></table>

##圆形滑块
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/round_slider.gif)

基于[圆形滑梯起thomasloven](https://github.com/thomasloven/round-slider)

##开关
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/switch.gif)

##带有导航抽屉的顶部应用栏
信息：

*顶部应用栏使用VIS Adapter的[小部件8中的视图]（https://www.iobroker.net/#en/documentation/viz/basic.md）-配置相同，请在论坛上搜索工作示例。
*应用栏的位置是硬编码的，始终显示在左上角。仅宽度和高度是可调的。在编辑器中，您可以移动窗口小部件，但是这些设置将不会应用！
*在编辑器中，滚动等效果无法正确显示或表现不同！
*必须激活复选框“永久”！
* oid必须从类型号设置为数据点（例如VIS Adapter的[小部件8中的视图]（https://www.iobroker.net/#en/documentation/viz/basic.md））

#####布局模式：
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/topappbar_modal.gif)

#####可忽略的版式：
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/topappbar_dismissible.gif)

#####永久布局：
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/topappbar_permanent.gif)

###子菜单
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/drawer_subMenu.png)

下表中未列出的设置是不言自明的。

<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/drawer_subMenu_views.png"></td><td>意见[x] </td><td>要激活子菜单，您必须添加多个以&#39;|&#39;分隔的视图进入查看字段，查看屏幕截图</td></tr><tr><td rowspan=1><img src="doc/en/media/drawer_subMenu_labels.png"></td><td>标签[x] </td><td>要更改项目的文本，您必须将json对象放入带有查看字段索引的label字段中。 <br>例： <br>

`{"itemText": "Item with Subitems", "subItems": ["subItem1", "subItem2"]}`

结果：查看屏幕截图</td></tr><tr><td rowspan=1><img src="doc/en/media/drawer_subMenu_icons.png"></td><td>图标[x] </td><td>要更改项目的图标，您必须将json对象放入带有视图字段索引的icons字段中。 <br>例： <br>

`{"itemImage": "/icons-material-svg/hardware/ic_computer_48px.svg", "subItems": ["/vis/widgets/materialdesign/img/IoBroker_Logo.png", "/icons-material-svg/action/ic_android_48px.svg"]}`

结果：查看屏幕截图</ td> </ tr> </ tbody> </ table>

##图表
###线路历史记录图表：
>必需的适配器：[SQL]（https://github.com/ioBroker/ioBroker.sql），[历史记录]（https://github.com/ioBroker/ioBroker.history）或[InfluxDb](https://github.com/ioBroker/ioBroker.influxdb)！

![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/line_history_chart.gif)

下表中未列出的设置是不言自明的。

<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/line_hostory_chart_general.png"></td><td>适配器实例</td><td> SQL或历史记录适配器的实例</td></tr><tr><td>聚合</td><td> <a href="https://www.iobroker.net/docu/index-195.htm?page_id=198&lang=en#Aggregation">链接</a> </td></tr><tr><td>最高要显示的数据点数</td><td>要显示的最大数据点数</td></tr><tr><td>数据点之间的时间间隔[s] </td><td>可选设置，将覆盖“计数”设置。 <br>各个数据点之间的距离，以秒为单位。 <br>例如，如果要每分钟显示一次数据点，则必须在此处输入60 </td></tr><tr><td>使用对象控制时间间隔</td><td>数据点的ID，以更改图表的时间间隔。数据点必须是字符串，并且可以包含<a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/235530e4e54346b5527333ca06ce596519954c67/widgets/materialdesign/js/materialdesign.chart.js#L802">链接的值</a> <br>例如，您可以在此处使用按钮在运行时更改图表的显示</td></tr><tr><td>用于更新的布尔对象</td><td> adatapoint的ID，以触发图表的手动刷新。 <br>例如，您可以在此处使用按钮在运行时刷新图表</td></tr><tr><td><img src="doc/en/media/line_hostory_chart_xAxis_layout.png"></td><td> x轴的时间格式</td><td>更改X轴的时间格式。必须为所有时间单位输入时间格式， <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">允许以下时间单位。</a> <br>必须根据moment.js库输入批准的时间格式， <a href="https://momentjs.com/docs/#/displaying/">请参阅链接</a> </td></tr><tr><td><img src="doc/en/media/line_hostory_chart_tooltip_layout.png"></td><td>工具提示时间格式</td><td>更改工具提示的时间格式。必须为所有时间单位输入时间格式， <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">允许以下时间单位。</a> <br>必须根据moment.js库输入批准的时间格式， <a href="https://momentjs.com/docs/#/displaying/">请参阅链接</a> </td></tr></tbody></table>

##表
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/table.gif)

＃＃＃＃＃ 输入数据
输入数据必须是对象的json数组，例如：

```
[
{"img":"/vis.0/myImages/erlebnis_50.png","name":"Empire","betriebszeit":"4h 06m","funk":"5G","ip":"10.0.0.1"},
{"img":"/vis.0/myImages/erlebnis_100.png","name":"Handy","betriebszeit":"13m","funk":"5G","ip":"10.0.0.2"},
{"img":"/vis.0/myImages/erlebnis_100.png","name":"Harmony Hub - Wohnzimmer","betriebszeit":"18T 07h 21m","funk":"2G","ip":"10.0.0.3"},
{"img":"/vis.0/myImages/erlebnis_25.png","name":"MusicCast - Esszimmer (WX-030)","betriebszeit":"1h 57m","funk":"2G","ip":"10.0.0.4"},
{"img":"/vis.0/myImages/erlebnis_75.png","name":"MusicCast - K�che (ISX-18D)","betriebszeit":"4h 10m","funk":"2G","ip":"10.0.0.5"}
]
```

<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/table_general.png"></td><td>开关</td><td>带有输入数据的类型字符串的数据点，如上所示</td></tr><tr><td>数据作为JSON </td><td>可选，如果未设置oid数据点，则输入如上所示的数据</td></tr><tr><td rowspan=4><img src="doc/en/media/table_column.png"></td><td> colType [x] </td><td>如果选择了图像，则对象属性必须具有图像的路径（ <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#input-data">请参见上文</a> ） </td></tr><tr><td>前缀[x] </td><td>可以使用对象属性，内部对象绑定（ <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#internal-object-binding">请参见下文</a> ）和html的前缀</td></tr><tr><td>后缀[x] </td><td>可以使用对象属性，内部对象绑定（ <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#internal-object-binding">见下文</a> ）和html的后缀</td></tr><tr><td>用于排序的对象名称[x] </td><td>在这里，您可以定义另一个用于排序的对象属性。 </td></tr></tbody></table>

#####内部对象绑定
前缀和后缀支持表内部对象绑定->您可以使用来访问对象的其他属性

```
#[obj.'propertyName']
```

示例请<a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#input-data">参见上面</a> 。

可以找到工作窗口小部件示例[这里](https://forum.iobroker.net/topic/26199/test-adapter-material-design-widgets-v0-1-x/113)

## Changelog

### 0.2.4
* (Scrounger): Round Slider Widget bug fixes
* (Scrounger): Line History Chart Widget: null value bug fix
* (Scrounger): Line History Chart Widget: tooltip bug fix
* (Scrounger): Line History Chart Widget: editor translation improved
 
### 0.2.0
* (Scrounger): Round Slider Widget added
* (Scrounger): Icon Button Adition Widget added
* (Scrounger): Button Adition Widget added
* (Scrounger): Line History Chart Widget added
* (Scrounger): Table Widget added
* (Scrounger): Dialog iFrame Widget added
* (Scrounger): Dialog View Widget added
* (Scrounger): Select Widget added
* (Scrounger): colorSchemes for Charts added
* (Scrounger): bug fixes

### 0.1.5
* (Scrounger): bar chart added
* (Scrounger): pie chart added
* (Scrounger): bug fixes

### 0.1.2
* (Scrounger): list: right label option added
* (Scrounger): slider: value text option for lees or greather than added
* (Scrounger): switch: support for non boolean values added
* (Scrounger): checkbox: support for non boolean values added
* (Scrounger): buttons: image position option added
* (Scrounger): toggle buttons: support for non boolean values added
* (Scrounger): topAppBar: z-Index added
* (Scrounger): haptic feedback (vibration) option for mobil browser added
* (Scrounger): editor text fields changed to html
* (Scrounger): mdc-typography font styles added
* (Scrounger): bug fixes

### 0.1.1
* (Scrounger): bug fixes

### 0.1.0
* (Scrounger): Top App Bar Submenu added
* (Scrounger): List added
* (Scrounger): Button vertical State, Link, Nav added
* (Scrounger): Icon Button State, Link, Nav added
* (Scrounger): initialize slider bug fixes
* (Scrounger): moved hard coded styling options to css
* (Scrounger): styling options extended
* (Scrounger): bug fixes

### 0.0.7
* (Scrounger): Top App Bar Layouts added
* (Scrounger): Top App Bar customizing options added
* (Scrounger): Top App Bar Navigation Drawer backdrop layout added
* (Scrounger): Button State added
* (Scrounger): Button Link added

### 0.0.6
* (Scrounger): Top App Bar with Navigation Drawer added
* (Scrounger): Checkbox added
* (Scrounger): bug fixes
 
### 0.0.5
* (Scrounger): icon button Toggle added
* (Scrounger): color pressed for buttons added
* (Scrounger): Slider bug fix & label for value <= min / >= max added
* (Scrounger): translation added

### 0.0.4
* (Scrounger): cards added

### 0.0.3
* (Scrounger): progress added
 
### 0.0.2
* (Scrounger): slider vertical added
* (Scrounger): switch added
* (Scrounger): button toggle added

### 0.0.1
* (Scrounger) initial release

## License
MIT License

Copyright (c) 2019 Scrounger <scrounger@gmx.net>

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