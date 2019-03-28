---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/viz/basic.md
title: 基本
hash: XCWXJ0eZW+O2I60K2NU5XF58R2CdhtU2NY1S4AQfMY8=
---
＃基本
小工具|图片|说明--------------------- | ------- | ------------- |
[HTML](#Html-frame)| ！[001] |此小部件代表任意HTML代码。
[Svg形状](#svg-shape)| ！[002] |表示形式[的iFrame](#iframe)| [003] |该小部件包括iFrame[图片](#image)| [004] |该小部件表示图像。
[链接](#link)| [005] |该小部件对应于小部件“静态 -  HTML”，但也是其整个表面上的可点击链接。可用于视图之间或外部链接的导航
[边界](#border)| ！【006】|
[iFrame8](#iframe8)| ！[007] |
[查看小部件](#view-in-widget)| [008] |该小部件可以表示视图内的视图。导航：使用导航元素构建视图，然后将它们集成到任意数量的其他视图中
[查看小部件8](#view-in-widget-8)] | [009] |根据状态显示8个视图中的一个
图8 | ！[010] |根据状态显示8张图片中的一张。|||||
HTML导航| ！[011] |此小部件用于在视图之间构建导航。对应于小部件“static  -  link”，但仅可用于视图之间的导航，并且还可以在更改视图时使用动画效果。|||||
过滤器 - 下拉列表| ！[012] ||||||
号码| ！[013] |此小部件表示数值|||||
字符串| ！[014] |此小部件表示String类型的数据点。|||||
字符串（未转义）| ！[015] |此小部件表示字符串类型的数据点。与“hm_val  -  String”小部件相比，没有特殊字符被“转义” -  i。变量也可能包含HTML代码，这将显示。|||||
String img src | ！[016] |可以为此小部件分配一个字符串类型的变量，其中包含的URL随后显示为图片|||||
时间戳| ！[017] ||||||
上次更改时间戳| ！[018] ||||||
ValueList文本| ！[019] |此小部件表示值类型列表的变量。|||||
ValueList HTML | ！[020] |此小部件表示类型值列表的变量。对应于小部件“hm_val  -  ValueList Text，但它不是”转义“，即HTML代码可以在valuelist中输入。|||||
ValueList HTML样式| ！[021] |此小部件表示值类型列表的变量。对应于小部件“hm_val  -  ValueList HTML，但可以为8个不同的值（0-7）使用8个不同的CSS值。|||| |
Bool HTML | ！[022] |这个小部件代表bool值。|||||
AckFlag HTML | ！[023] ||||||
Bool Checkbox | ！[024] |此小部件将bool值显示为一个简单的复选框，并允许您切换值。|||||
Bool选择| ！[025] |此小组件将bool值显示为下拉列表，并允许您切换值。|||||
Bool HTML | ！[026] |此小组件显示布尔值，还允许您在小组件区域内切换值以进行单击。|||||
Bool SVG | [027] |此小组件在小组件区域内单击时设置值。|||||
HTML状态| [028]如果关联数据点的值为0或假，则该小部件消失。技术熟练，例如用于显示服务消息|||||
红色数字| [029] |以iOS通知图标的样式显示数值。消失在值0. |||||
灯泡开/关| ！[030] |此小部件在黑色背景上显示一个关闭或发光灯泡的值。可用于布尔值和浮点（调光器）值。|||||
酒吧| ！[031] |此小部件将0-100的值表示为水平条。|||||
注意| ！[032] ||||||
json表| ！【033】||||||
HTML注销| ！[034] ||||||
手势指标| ！[035] ||||||
演讲文字| ！[036] ||||||
全屏| ！[037] ||||||
屏幕分辨率| ！[038] ||||||

### Html框架
这个小部件代表任意HTML代码。也可以在小部件中使用Javascript。

属性|说明|
---- | ---- |
ObjectId |要显示的包含HTML的对象的ID
前缀html | HTML代码显示在对象前面
在对象|之后附加html | HTML代码以显示

**例子：**！[039]

### SVG形状
此小部件仅表示几何形状，其中预定义了一些形状。

属性|说明|
---- | ---- |
类型|几何形状|
线条颜色|形状边框的颜色|
填充颜色|填充颜色|
线宽||
以|度为单位转动|从初始位置开始的旋转角度
宽度比例|将宽度缩放在0到100％|之间
高度比例|将高度缩放在0到100％|之间

**例子：**！[040]

### Iframe
表示iframe

属性|说明|
---- | ---- |
来源|来源之路（网站，图片）;这可以在本地或通过URL |来定义
没有沙箱|：建设：|
建设：|更新时间|
醒来更新|：施工：|
更新视图更改|：构造：|
不要添加到URL |：construction：|
滚动X |：构造：|
滚动Y |：构造：|
没有框架|：建筑：|

**例子：**！[041]

###图片
这个小部件代表一张图片。

属性|说明|
---- | ---- |
源|本地文件系统中源的路径|
拉伸|使图像适合框架尺寸|
建设：|更新时间|
醒来更新|：施工：|
更新视图更改|：构造：|
不要添加到URL |：construction：|
允许用户交互|：构造：|

**例子：**！[042]

###链接
此窗口小部件对应于窗口小部件“HTML框架”，但也是整个表面上的可单击链接。可用于视图之间或外部链接的导航。

属性|说明|
---- | ---- |
html |不言自明;）...在这里插入格式化文本表示的HTML代码。
链接|链接URL。要使用指向另一个视图的链接，只需输入以哈希符号（＃）目标开头的视图名称|链接的目标。留空以保持在同一浏览器窗口中;想打开一个新窗口_blank。其他选项：_self（相同标签），_ parent（），_ top（）

**例子：**！[043]

###边境
这个小部件只代表一个框架 - 没有其他功能，只有文本和颜色。这可以用于分组小部件。

属性|说明|
---- | ---- |
标题|不言自明的上标题字体|标题字体上标题颜色|标题标题标题背景|标题标题标题 - 标题|从顶部标题到轨道间距的标题距离|从左边距标题距离头部高度|条形图的高度头部颜色的上边距|横条颜色

**例子：**！[044]

###在小部件8中查看
根据状态显示8个视图中的一个。

属性|说明|
---- | ---- |
持久性|一旦不再从DOM中删除而呈现的视图

### IFrame 8
根据状态显示8个iframe中的一个。

### HTML导航
此小组件用于在视图之间构建导航。对应于小部件“静态 - 链接”，但仅可用于视图之间的导航，并且还提供在更改视图时使用动画效果的可能性。

属性|说明|
---- | ---- |
html |不言自明;）...在此处插入HTML代码nav_view |在这里，您必须输入要导航到hide_effect的视图的名称|这里您可以输入jQueryUI效果的名称，该名称将在离开视图时使用。可用的效果有：盲，弹跳，夹子，掉落，爆炸，淡入淡出，折叠，高光，粉扑，脉动，比例，摇，大小，幻灯片和转移。
hide_duration |效果持续时间以毫秒为单位show_effect |见上文，相同 - 但这次是为了显示新视图show_duration |参见上文，显示新视图的时间以毫秒为单位

###过滤器 - 下拉列表
###号码
此小部件表示一个数值（可用于整数和浮点数）

属性|说明|
---- | ---- |
html_prepend |在数值html_append之前显示的文本或HTML代码|在数字后面显示的文本或HTML代码|小数位数因子|用于乘以数值的因子

### String
此小组件表示字符串类型的数据点。

属性|说明|
---- | ---- |
html_prepend |出现在字符串之前的文本或HTML代码。
html_append |字符串后显示的文本或HTML代码。

### String（未转义）
此Widget表示类型字符串的数据点。与小部件“hm_val  -  String”相比，没有特殊字符被“转义” -  i。该变量也可能包含HTML代码，然后会显示。

属性|说明|
---- | ---- |
html_prepend |出现在字符串之前的文本或HTML代码。
html_append |字符串后显示的文本或HTML代码。

### String img src
可以为此窗口小部件分配一个string类型的变量，其中包含的URL随后显示为图片。

属性|说明|
---- | ---- |
html_prepend |显示在图像前面的文本或HTML代码。
html_append |图像后面显示的文本或HTML代码。

###最后更改时间戳
显示已连接状态的上一个时间戳。

### ValueList文本
此小组件表示值类型列表的变量。

属性|说明|
---- | ---- |
valuelist |每个值的以分号分隔的文本列表。
html_prepend |显示在图像前面的文本或HTML代码。
html_append |图像后面显示的文本或HTML代码。

### ValueList HTML
此窗口小部件表示值类型列表的变量。对应于“hm_val  -  ValueList”窗口小部件，但它不是“转义”，因此可以在值列表中输入HTML代码。

属性|说明|
---- | ---- |
valuelist |每个值的以分号分隔的HTML代码列表。
html_prepend |显示在图像前面的文本或HTML代码。
html_append |图像后面显示的文本或HTML代码。

### ValueList HTML 8
此小部件表示值列表变量。对应于ValueList HTML小部件，但可以为8个不同的值（0-7）使用8个不同的CSS值。

属性|说明|
---- | ---- |
html_prepend |显示在图像前面的文本或HTML代码。
html_append |图像后面显示的文本或HTML代码
value0到value7 |值0到7的文本或HTML代码style0到style7 |值0到7的CSS值

### Bool HTML
此小组件表示bool值。

属性|说明|
---- | ---- |
html_prepend |显示在图像前面的文本或HTML代码。
html_append |图像后面显示的文本或HTML代码。
html_true |将以真实情况显示的文本或html。
html_false |在false的情况下显示的文本或html代码。

### Bool Checkbox
此小组件将bool值显示为一个简单的复选框，还允许您切换值。

属性|说明|
---- | ---- |
html_prepend |复选框前显示的文本或HTML代码。
html_append |复选框后面显示的文本或HTML代码。

### Bool选择
此小组件将bool值显示为下拉列表，还允许您切换值。

属性|说明|
---- | ---- |
html_prepend |显示在图像前面的文本或HTML代码。
html_append |图像后面显示的文本或HTML代码。
text_true |真实案例的文本text_false | false案例的文本

### Bool HTML
此窗口小部件表示布尔值，还允许您在窗口小部件区域内切换值以单击。

属性|说明|
---- | ---- |
html_prepend |显示在图像前面的文本或HTML代码。
html_append |图像后面显示的文本或HTML代码。
text_true |真实案例的文本text_false | false案例的文本

### Bool HTML
### Bool SVG
### HTML状态
此窗口小部件在窗口小部件区域中单击时设置值。

属性|说明|
---- | ---- |
html | text或html显示要设置的值|值

###隐藏0 / false
如果关联数据点的值为0或false，则此窗口小部件将消失。技术熟练，例如用于显示服务消息

###红色数字
以iOS通知图标的样式显示数值。消失在值0。

###灯泡开/关
此小部件在黑色背景上显示一个关闭或发光灯泡的值。可用于布尔和浮动（调光器）值。

###灯泡开/关
此小部件在黑色背景上显示一个关闭或发光灯泡的值。单击小部件将切换值。

### Twist grip
此小部件表示带有原始Homematic图标的旋转手柄传感器。

### TFK
此小组件表示与原始Homematic图标的门/窗口联系。

### Bar Horizontal
此小组件表示0-100的值作为水平条。

属性|说明|
---- | ---- |
factor |乘以该值的因子。示例：对于调光器（从0.00到1.00），必须输入100。
color |粗体CSS属性background-color |边框CSS属性|粗体CSS属性| box-shadow |反向条属性|如果为true，则条形从右到左而不是从左到右显示。

### Bar Vertical
对应于小部件“hm_val  -  Bar Horizontal，但是垂直而不是horiziontal。

属性|说明|
---- | ---- |
factor |乘以该值的因子。示例：对于调光器（从0.00到1.00），必须输入100。
color | bar background CSS属性background-color | bar的CSS属性| shadow bar的CSS属性box-shadow |如果为true，则从下到上显示条形而不是从上到下

[001]：../media/vis/widget_images/basic/Prev_HTML.png“Html”[002]：.. / media / vis / widget_images / basic / Prev_Shape.png [003]：../ media / vis / widget_images / basic / Prev_iFrame.png [004]：../media/vis/widget_images/basic/Prev_Image.png [005]：../ media / vis / widget_images / basic / Prev_tplLink.png [006]：../ media / vis / widget_images / basic / Prev_tplFrame.png [007]：.. / media / vis / widget_images / basic / Prev_StatefulIFrame8.png [008]：.. / media / vis / widget_images / basic / Prev_ContainerView.png [009] ：../media/vis/widget_images/basic/Prev_StatefulContainerView8.png [010]：../ media / vis / widget_images / basic / Prev_StatefulImage.png [011]：../ media / vis / widget_images / basic / Prev_HTMLnavigation。 png [012]：../media/vis/widget_images/basic/Prev_FilterDropdown.png [013]：../ media / vis / widget_images / basic / Prev_ValueFloat.png [014]：../ media / vis / widget_images / basic / Prev_ValueString.png [015]：../media/vis/widget_images/basic/Prev_ValueStringRaw.png [016]：../ media / vis / widget_images / basic / Prev_ValueStringImg.png [017]：.. / media / v is / widget_images / basic / Prev_ValueTimestamp.png [018]：.. / media / wis / widget_images / basic / Prev_ValueLastchange.png [019]：.. / media / wis / widget_images / basic / Prev_ValueList.png [020]： ./media/vis/widget_images/basic/Prev_ValueListHtml.png [021]：../ media / vis / widget_images / basic / Prev_ValueListHtml8.png [022]：../ media / vis / widget_images / basic / Prev_ValueBool.png [ 023]：.. / media / vis / widget_images / basic / Prev_AckBool.png [024]：.. / media / wiv / widget_images / basic / Prev_ValueBoolCheckbox.png [025]：../ media / vis / widget_images / basic / Prev_ValueBoolSelect.png [026]：.. / media / wiv / widget_images / basic / Prev_ValueBoolCtrl.png：... / media / vis / widget_images / basic / Prev_ValueBoolCtrlSvg.png [028]：../ media / vis / widget_images / basic / Prev_BasicState.png [029]：.. / media / vis / widget_images / basic / Prev_RedNumber.png [030]：../ media / vis / widget_images / basic / Prev_BulbOnOffCtrl.png [031]：../ media / vis / widget_images / basic / Prev_ValueFloatBar.png [032]：.. / media / vis / widget_images / basic / Prev_Note.png [033]：../ media / vis / widget _images / basic / Prev_TableBody.png [034]：../media/vis/widget_images/basic/Prev_HtmlLogout.png [035]：../ media / vis / widget_images / basic / Prev_ValueGesture.png [036]：../ media / vis / widget_images / basic / Prev_Speech2Text.png [037]：.. / media / vis / widget_images / basic / Prev_FullScreen.png [038]：../ media / wis / widget_images / basic / Prev_ScreenResolution.png [039] ：../media/vis/widget_images/basic/Explanation/html.png [040]：../media/vis/widget_images/basic/Explanation/svg.gif [041]：../ media / vis / widget_images / basic / explain / iframe.gif [042]：.. / media / vis / widget_images / basic / Exploation / image.gif [043]：../ media / vis / widget_images / basic / Exploation / link.gif [044] ：../ media / vis / widget_images / basic / Expation / border.gif