---
BADGE-Number of Installations: http://iobroker.live/badges/flot-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.flot.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.flot.svg
BADGE-NPM: https://nodei.co/npm/iobroker.flot.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.flot/README.md
title: 海军报
hash: YqHK7C+NwZyaLU2Uu9LAyTetjsTPXvduP8K2VsgZKE8=
---
#flot
<span style="font-size: 16px;">适配器用于以图形方式显示测量值。有了它，您可以可视化使用历史记录适配器记录的数据。一方面，直接通过“对象”选项卡中的“历史记录”图标调用记录的数据点，但它也可以用作单独的应用程序，以同时显示多个数据点。</span>

[![]（图/海军报-2_ioBroker_Adapter_Flot_001.jpg）](../../../de/adapterref/iobroker.flot/img/flot-2_ioBroker_Adapter_Flot_001.jpg)这样生成的图表可以显示在.vis中的iFrame小部件中

* * *

# [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-rickshaw#konfiguration)**Konfiguration**

＃[]（https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-rickshaw#configuration) **配置**
[![]（图/海军报-2_ioBroker_Adapter_Flot_000.jpg）](../../../de/adapterref/iobroker.flot/img/flot-2_ioBroker_Adapter_Flot_000.jpg)配置不是必需的。这就是为什么这里不提供配置菜单的原因。

* * *

# [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-rickshaw#bedienung)**Bedienung**

＃[]（https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-rickshaw#services) **操作**
Flot适配器的编辑器通过`<IPdesServers>:8082/flot/edit.html/`或通过管理适配器的Instances选项卡中的超链接调用。

输入字段分为4个块：

####  [![](img/flot-2_ioBroker_Adapter_Flot_Groups.jpg)](../../../de/adapterref/iobroker.flot/img/flot-2_ioBroker_Adapter_Flot_Groups.jpg)

#### [！[]（Img / flot-2_ioBroker_Adapter_Flot_Groups.jpg）]（img / flot-2_ioBroker_Adapter_Flot_Groups.jpg）
## [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-rickshaw#input-data)**Input data (1)**

## []（https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-rickshaw#input-data) **输入数据（1）**
当前安装的版本显示在右上角。

[![]（图/海军报-2_ioBroker_Adapter_Flot_Input_Data.jpg）](../../../de/adapterref/iobroker.flot/img/flot-2_ioBroker_Adapter_Flot_Input_Data.jpg)

###删除设置（垃圾桶）
清除此图表中的所有条目。在调用/flot/edit.html/时，通常在编辑器中调用最近编辑的项目。但是，如果要创建完全不同的图表，可以使用此按钮将所有设置重置为默认值。

添加###行
另一行添加到下表的底部。这将被分配另一种颜色。

###自动更新
如果要在每次更改时更新页面下半部分中的预览图像，则必须激活此复选框。这可能需要一些非常复杂的图表。默认情况下，此复选框未激活。

如果激活该复选框，** _更新预览_ **按钮将消失在预览窗口的右上方，否则预览将更新。

###放置布尔人
使用此按钮，图形被分成几个垂直叠加的部分，每个部分显示数据点的状态。这提供了对布尔数据点的更好概述（开/关;真/假）

###数据点参数
下表定义了用于显示相应数据点的参数

####实例
这里确定应从哪个历史实例获取图表的记录数据。

![](../../../de/adapterref/iobroker.flot/img/flot-2_ioBroker_Adapter_Flot_Input_Data_Instanz.jpg)

default是指系统设置中指定的数据收集的默认实例。其他点对应于已安装的实例。

#### ID
这里，选择要显示的数据点。必须在适配器_ **Admin** _的_ **Objects** _选项卡中记录数据点，并在_ **Instance** _下选择历史记录实例。

####艺术
这里，选择表示行中数据点的方式

[![]（图/海军报-2_ioBroker_Adapter_Flot_Input_Data_Art.jpg）](../../../de/adapterref/iobroker.flot/img/flot-2_ioBroker_Adapter_Flot_Input_Data_Art.jpg)

**  -  minmax（默认值）：**显示聚合间隔内的最高值和最低值

**  -  medium：**显示聚合间隔内的平均值

**  -  min：**显示聚合间隔内的最低值

**  -  max：**显示聚合间隔内的最高值

**  - 总计：**这将是???聚合间隔内显示的值

**  - 如果更改：**如果值更改，则仅显示值

####图表类型
这里确定应该以何种形式显示数据。

[![]（图/海军报-2_ioBroker_Adapter_Flot_Input_Data_Chart_Type.jpg）](../../../de/adapterref/iobroker.flot/img/flot-2_ioBroker_Adapter_Flot_Input_Data_Chart_Type.jpg)

**行：**数据显示为行。各个点以直线连接。

**栏：**数据的每个单独测量点显示为垂直条。建议仅针对少数测量点进行此表示。

**散点图：**数据显示为孤立点。各个点未连接。

**步骤：**数据显示为行。各个点水平连接为直线，直到下一次更改。在更改时，输入一个步骤。

**样条曲线：**数据显示为线条。各个点作为弯曲曲线彼此连接。

#### Fill（0-1）
在这里，您可以指定是否应在绘制的线和X轴（或通过0的线）之间绘制曲面。 0到1之间的值（例如，0.4）表示颜色的覆盖范围（0 =透明，1 =不透明）。

####点
如果要突出显示除线条之外的测量点，可以勾选此复选框。

#### Color
应显示该数据点数据的颜色可以输入为十六进制（＃FF0000），rgb（rgb（21,120,210））或rgba（rgba（0,0,255,0.6））。如果单击该字段，将打开一个rgba颜色选择器，其中可以以图形方式确定该值。

#### Min
在这里，您可以输入Y轴的最小值。如果未输入任何值，则动态缩放轴。

#### Max
在这里，您可以输入Y轴的最大值。如果未输入任何值，则动态缩放轴。

####单位
在这里，您可以指定用于缩放Y轴的单位

#### Y轴
有几种方法可以表示每个数据点的Y轴。默认情况下，为每个数据点绘制一个单独的Y轴。但是，这很容易让人感到困惑。因此，有以下选项。

[![]（图/海军报-2_ioBroker_Adapter_Flot_Input_Data_Y_Achse.jpg）](../../../de/adapterref/iobroker.flot/img/flot-2_ioBroker_Adapter_Flot_Input_Data_Y_Achse.jpg)

**  - 无：**不应为此数据点绘制自己的Y轴。

**  - 左：**此数据点的y轴应绘制在图表的左侧

**  - 右：**此数据点的y轴应绘制在图表的右侧

**  - 左侧着色：**此数据点的y轴应以数据点颜色绘制在图表左侧

**  - 右侧颜色：**此数据点的Y轴应绘制在数据点颜色的图表右侧

#### X轴
有几种方法可以表示每个数据点的x轴。默认情况下，为每个数据点绘制一个单独的x轴。但是，这很容易让人感到困惑。因此，有以下选项。

[![]（图/海军报-2_ioBroker_Adapter_Flot_Input_Data_X_Achse.jpg）](../../../de/adapterref/iobroker.flot/img/flot-2_ioBroker_Adapter_Flot_Input_Data_X_Achse.jpg)

**  - 无：**不应为此数据点绘制自己的Y轴。

**  - 顶部：**此数据点的x轴应绘制在图表上方

**  - 以下：**此数据点的x轴应绘制在图表下方

**  - 以上颜色：**此数据点的x轴应绘制在数据点颜色的图表上方

**  - 以下颜色：**此数据点的x轴应绘制在数据点颜色的图表下方

####名称
您可以在此处指定数据点的名称，该名称也显示在图例中。如果此处未输入任何内容，则使用完整数据点名称。

####更多
在此图标后面隐藏更多设置

[![]（图/海军报-2_ioBroker_Adapter_Flot_Input_Data_more.jpg）](../../../de/adapterref/iobroker.flot/img/flot-2_ioBroker_Adapter_Flot_Input_Data_more.jpg)

** X偏移：**为了将曲线设置为偏离Y轴，可以在此处输入应该执行此减少量的值。

** Y偏移：**为了将曲线设置为偏离X轴，可以在此处输入一个值，该值应通过该减少量进行。这将是你。防止线宽遮盖x轴

** X轴刻度：** X轴标记的数量

** Y轴刻度：** Y轴刻度数

**ØL：**线的粗细（以像素为单位）

**ØS：**阴影的厚度，以像素为单位

**公共Y轴：**默认=每条线都有自己的轴，每个数字代表相应的线

** NULL as：**这决定了如果没有数据，应该如何绘制线。

默认值：无行;

忽略空值：线条水平延续

使用0而不是零：线被拉到值0。

**平滑：**平滑曲线。原则上，在设定的点数上绘制移动平均值。

**逗号后：**小数位数。

####删除数据点（垃圾桶）
单击此图标可删除包含所有设置的整个表格行。

##标记（2）
使用此选项，可以将水平线输入图表以显示阈值。标记还可以指示区域（例如，温度或湿度下的舒适区）。然后必须指定上下触发器。
![](../../../de/adapterref/iobroker.flot/img/flot-2_ioBroker_Adapter_Flot_Markierungen.jpg)

###添加新标记
单击此按钮可在下表中插入另一行以定义另一个标记。

###标记参数
所选标记的属性分别设置为一行：

####线路ID
这里选择了图表中的数据系列。这是必要的，以便标记基于相关Y轴的值。

####上限值或ID
这里，输入绝对值或数据点，其被认为是范围上限的触发器。可以通过对象资源管理器搜索数据点。

####较低的值或ID
在这里，您可以输入绝对值或数据点，这应该是范围下限的触发器。可以通过对象资源管理器搜索数据点。

#### Color
应显示此标记行的颜色可以输入为十六进制（＃FF0000），rgb（rgb（21,120,210））或rgba（rgba（0,0,255,0.6））。如果单击该字段，将打开一个rgba颜色选择器，其中可以以图形方式确定该值。

####填写
在这里，您可以指定是在绘制的直线之间，还是在直线与X轴之间（或通过0的直线）之间绘制曲面。

#### <span style="text-align: justify; line-height: 1.5;">ØL</span>
线条的粗细（以像素为单位）

####ØS
阴影的厚度（以像素为单位）

#### Text
您可以在此处输入有关图表中显示的标记的信息。

####文字位置
您可以指定是否应在Y轴的右侧或左侧显示此信息。

####文本偏移量
这是到标记线的距离。该值可以指定为正数或负数。

####文字大小
文本大小以px为单位。也可以在pt中指示

####文字颜色
应显示此标记信息的颜色可输入为十六进制（＃FF0000），rgb（rgb（21,120,210））或rgba（rgba（0,0,255,0.6））。如果单击该字段，将打开一个rgba颜色选择器，其中可以以图形方式确定该值。

## Time（3）
![](../../../de/adapterref/iobroker.flot/img/flot-2_ioBroker_Adapter_Flot_Zeit-e1484938214253.jpg)

###时间跨度
####艺术
在这里你可以选择静态和相对。

[![]（图/海军报-2_ioBroker_Adapter_Flot_Zeit_statisch.jpg）](../../../de/adapterref/iobroker.flot/img/flot-2_ioBroker_Adapter_Flot_Zeit_statisch.jpg)

使用静态固定时间点，相对于可变时间的相对时间范围，例如， _ ** _今天。

####结束
此点可以是固定时间，或者，如果相对选择，则可变重复时间，具体取决于上覆点_ **类型** _中的设置。

![](../../../de/adapterref/iobroker.flot/img/flot-2_ioBroker_Adapter_Flot_Zeit_relativ_Ende.jpg)

####范围
在此处输入X轴应显示数据的时间范围（持续时间）。

[![]（图/海军报-2_ioBroker_Adapter_Flot_Zeit_relativ_Range.jpg）](../../../de/adapterref/iobroker.flot/img/flot-2_ioBroker_Adapter_Flot_Zeit_relativ_Range.jpg)

#### Autoupdate all：
此值确定自动更新图表中数据点的显示频率：

[![]（图/海军报-2_ioBroker_Adapter_Flot_Zeit_autoupdate.jpg）](../../../de/adapterref/iobroker.flot/img/flot-2_ioBroker_Adapter_Flot_Zeit_autoupdate.jpg)

如果是使用Homematic无线传感器，数据每3分钟只会改变一次，不需要更频繁的刷新。

###聚合
此点用于减少图表中的数据量。您可以指定每个数据点的记录点数（数量）或各个点的时间间隔（以秒为单位）。

##选项（4）
第四个块包含许多其他选项以使图表更美观[![]（图/海军报-2_ioBroker_Adapter_Flot_Options_all.jpg）](../../../de/adapterref/iobroker.flot/img/flot-2_ioBroker_Adapter_Flot_Options_all.jpg)

###外观
#### Width
指定应显示图表的宽度。 px中的规格。

####身高
指示应显示图表的高度。 px中的规格。

####没有框架
选择是否围绕图表的整个区域，轴及其标签绘制边框

####窗口背景
填充此窗口的颜色可以输入为十六进制（＃FF0000），rgb（rgb（21,120,210））或rgba（rgba（0,0,255,0.6））。如果单击该字段，将打开一个rgba颜色选择器，其中可以以图形方式确定该值。此参数指的是整个区域，包括带有标签的轴。

####用户图表背景
如果激活此复选框，则下方的下拉菜单将消失，并显示输入字段。

####图表背景
此参数仅指实际图表的背景。如果激活该复选框，则可以输入您自己的描述或rgb（a）颜色。如果没有，您可以从下拉菜单中选择各种下拉背景。

#### Y标签颜色
用于显示Y轴标签的颜色可以输入为十六进制（＃FF0000），rgb（rgb（21,120,210））或rgba（rgba（0,0,255,0.6））。如果单击该字段，将打开一个rgba颜色选择器，其中可以以图形方式确定该值。

如果数据点描述_ ** Y轴右/左已着色** _，则此颜色不适用。

#### X-label颜色
用于显示X轴标签的颜色可以输入为十六进制（＃FF0000），rgb（rgb（21,120,210））或rgba（rgba（0,0,255,0.6））。如果单击该字段，将打开一个rgba颜色选择器，其中可以以图形方式确定该值。

如果在数据点描述中选择**，则此颜色不适用** _ X轴右/左色_ **。

####框架颜色
在实际图表周围绘制框架的颜色可以输入为十六进制（＃FF0000），rgb（rgb（21,120,210））或rgba（rgba（0,0,255,0.6））。如果单击该字段，将打开一个rgba颜色选择器，其中可以以图形方式确定该值。

####网格颜色
在图表背景上绘制网格的颜色可以输入为十六进制（＃FF0000），rgb（rgb（21,120,210））或rgba（rgba（0,0,255,0.6）） ，如果单击该字段，将打开一个rgba颜色选择器，其中可以以图形方式确定该值。

####边框宽度
规划要在图表背景周围绘制的边框宽度。 px中的规格。

###栏设置
此处输入的值仅适用于图表类型设置为现金的情况。

####填充颜色
要绘制条形填充的颜色可以输入为十六进制（＃FF0000），rgb（rgb（21,120,210））或rgba（rgba（0,0,255,0.6））。如果单击该字段，将打开一个rgba颜色选择器，其中可以以图形方式确定该值。

####显示标签
如果要在条形图上显示数据点的名称，可以在此处确定此名称的位置。

**没有：**没有名字

**上面：**在酒吧上方

**顶部底部：**位于顶部边缘下方的栏内部

**下方：酒吧下方**

**在中间：**梁的中间位置

####条宽
以px为单位的条宽度规格

####标签字体大小
以px为单位的字体大小规格

####标签颜色
应显示条形指定的颜色可以输入为十六进制（＃FF0000），rgb（rgb（21,120,210））或rgba（rgba（0,0,255,0.6））。如果单击该字段，将打开一个rgba颜色选择器，其中可以以图形方式确定该值。

###标题
此类别处理图表可能的标签

####标题
您可以在此处设置应显示在图表中或图表上的标签。在大多数情况下，这将是图表的标题。

####标签位置
标题可以放在图表上的不同位置。这些可通过下拉菜单获得。

####标题颜色
使用图表标题显示的颜色可以输入为十六进制（＃FF0000），rgb（rgb（21,120,210））或rgba（rgba（0,0,255,0.6））。如果单击该字段，将打开一个rgba颜色选择器，其中可以以图形方式确定该值。

####标题大小
标签的字体大小可以以标准大小的百分比形式指定，单位为px或pt。如果稍后在可缩放窗口中显示图表，则建议使用％的大小。

###选项
在此类别中，配置了其他项目和功能，以使图表具有最后的触感。

####显示图例
在这里，您可以选择是否应显示图例，如果是，则将其放置在何处。为了使图例不会遮盖曲线，位置有用地取决于图表的结构。

传说中的####列
对于大量数据点，在图例中显示多列中的数据点可能很有用。

####传奇不透明度（0-1）
图例的颜色密度为0到1（0 =透明，1 =密集）

####传奇背景
用于显示图例背景的颜色可以输入为十六进制（＃FF0000），rgb（rgb（21,120,210））或rgba（rgba（0,0,255,0.6））。如果单击该字段，将打开一个rgba颜色选择器，其中可以以图形方式确定该值。

####悬停细节
如果选中此复选框，则当您将鼠标移到该线上时，将显示该曲线的数据。

####时间格式
默认情况下，时间格式按系统设置中的指定使用。或者，许多其他形式可用于图表。

####使用逗号
如果选中此复选框，则使用逗号作为小数分隔符。否则，使用小数点

####激活缩放和推送
激活此复选框可以通过时间轴中的鼠标移动来缩放和移动实时视图中的图表。

####没有'编辑'按钮
如果激活此复选框，则不会显示图表窗口右上角的“铅笔图标”。否则，此图标将以编辑模式打开此图表

####动画
在这里，您可以指定在打开图表时是否应该立即可用，或者是否由动画构建。这决定了这个动画的持续时间。

##链接
在此字段中，以前菜单中配置的所有数据都以文本形式汇总。如果将此链接以vis格式复制到iFrame窗口小部件中，则图表将完全显示。窗口中的按钮_ ** **在浏览器中打开另一个选项卡并在那里显示图表。此页面可以加入书签以保存图表。按钮_ **更新预览** _显示预览窗口中的最后一次更改。如果在_ **输入数据** _下选中了自动更新复选框，则此按钮不可用。然后，预览窗口会随每次更改自动更新

## Changelog

### 1.9.2 (2018-08-18)
* (Seqway) Translations

### 1.9.1 (2018-06-04)
* (bluefox) Added dashed lines
* (bluefox) All JS files together are concatenated
* (bluefox) Show days of week (dow) in time axis.

### 1.8.0 (2018-05-04)
* (bluefox) Optimize communication

### 1.7.9 (2018-05-01)
* (bluefox) Added support of multi-languages in names

### 1.7.7 (2018-03-04)
* (Apollon77) fix month range

### 1.7.6 (2018-02-16)
* (Apollon77) remove alert windows from errors, log instead

### 1.7.5 (2018-01-13)
* (bluefox) try to fix small error

### 1.7.4 (2018-01-05)
* (bluefox) The loading via cloud is fixed

### 1.7.1 (2017-12-14)
* (bluefox) Fixed the loading of presets
* (bluefox) Added new date formats for X axis

### 1.7.0 (2017-10-17)
* (bluefox) Add presets

### 1.6.2 (2017-08-12)
* (bluefox) Show chart at start

### 1.6.1 (2017-03-25)
* (bluefox) Change edit layout

### 1.5.9 (2017-02-27)
* (bluefox) New color picker
* (bluefox) If 'none' for title selected => do not show any title
* (bluefox) add date format 'dd.mm.'

### 1.5.8 (2017-02-01)
* (bluefox) Add series as X ticks

### 1.5.7 (2017-01-26)
* (bluefox) Small fix in smoothing algorithm

### 1.5.6 (2016-11-04)
* (bluefox) fix marking line

### 1.5.4 (2016-10-13)
* (bluefox) remove area, line plot
* (bluefox) add fill value, points option

### 1.5.3 (2016-10-08)
* (bluefox) Allow using of IDs in the marking
* (bluefox) Support of filled markings

### 1.5.2 (2016-09-30)
* (bluefox) fix range and offset if month or year
* (bluefox) fix after comma settings

### 1.5.1 (2016-09-15)
* (bluefox) Filter IDs depends on storage instance

### 1.5.0 (2016-09-10)
* (bluefox) Support of marking lines

### 1.4.0 (2016-08-30)
* (bluefox) support bar chart (only one bar chart possible)

### 1.3.5 (2016-08-14)
* (bluefox) support of web-sockets force

### 1.3.4 (2016-07-23)
* (nobodyMO) Add app support
* (nobodyMO) Fix for jquery to the current version in vis

### 1.3.3 (2016-06-16)
* (bluefox) remove RTL direction in id field

### 1.3.2 (2016-06-13)
* (bluefox) add settings for border color and border width
* (bluefox) make splines work

### 1.3.1 (2016-06-07)
* (bluefox) add spline file

### 1.3.0 (2016-05-29)
* (bluefox) add animation
* (bluefox) remove smoothing, because does not work
* (bluefox) try to add splines, but it does not work always

### 1.2.5 (2016-05-28)
* (bluefox) do not include nulls by smoothing

### 1.2.4 (2016-05-27)
* (bluefox) show edit button

### 1.2.3 (2016-05-25)
* (bluefox) fix digits after comma
* (bluefox) fix start and finish points

### 1.2.2 (2016-05-22)
* (bluefox) change default aggregation name
* (bluefox) add units in tooltip

### 1.2.1 (2016-05-13)
* (bluefox) implement loading indicator

### 1.2.0 (2016-05-05)
* (bluefox) implement zoom and pan
* (bluefox) support ms
* (bluefox) support m4
* (bluefox) support of pan and zoom on touchable devices
* (bluefox) support of 3 types of "null" handling: use nulls, use last value instead of null, use 0 instead of 0
* (bluefox) update interval in seconds
* (bluefox) smoothing and "after comma" per variable

### 1.1.0 (2016-04-09)
* (bluefox) change splash screen
* (bluefox) ignoreNull per variable
* (bluefox) fix x axis

### 1.0.0 (2016-04-09)
* (bluefox) enable editing of created charts
* (bluefox) enable set of label colors
* (bluefox) enable set of window background

### 0.2.6 (2016-02-24)
* (Pmant) remove ignore null per state

### 0.2.5 (2016-02-14)
* (Pmant) add ignore null per state
* (Pmant) change commonYAxis per state

### 0.2.4 (2016-01-31)
* (ldsign) Title/help attribute for lineWidth and ShadowSize table head
* (ldsign) option for shadowSize
* (nobodyMO) Add option commonYAxis
* (bluefox) add favicon and title

### 0.2.3 (2016-01-26)
* (ldsign) user selectable time (hours/minutes) for static timeArt

### 0.2.2 (2015-12-17)
* (bluefox) fix SelectID for safary

### 0.2.1 (2015-12-14)
* (Smiling_Jack) support of new History concept
* (Smiling_Jack) new editor & working on axis
* (bluefox) add onchange aggregation
* (Smiling_Jack) add ignoreNull
* (Smiling_Jack) working on flot nav
* (bluefox) import old settings

### 0.1.1 (2015-07-13)
* (bluefox) fix time format

### 0.1.0 (2015-07-10)
* (bluefox) lines are implemented

### 0.0.2 (2015-07-09)
* (bluefox) implement title and sort points

### 0.0.1 (2015-03-27)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2014-2018 bluefox<dogafox@gmail.com>