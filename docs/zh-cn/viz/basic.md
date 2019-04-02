---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/viz/basic.md
title: 基本
hash: HOmOiyBsxBE4nWody29rLQBv71iKYK3n2apUNfxPU48=
---
＃基本
|小工具|图片|描述

| [HTML](#Html-frame)| ![001](../../de/viz/media/widget_images/basic/Prev_HTML.png)|此小部件代表任意HTML代码 |
| [Svg形状](#svg-shape)| ![002](../../de/viz/media/widget_images/basic/Prev_Shape.png)|表示形式|
| [的iFrame](#iframe)| ![003](../../de/viz/media/widget_images/basic/Prev_iFrame.png)|这个小部件包含一个iframe |
| [图片](#image)| ![004](../../de/viz/media/widget_images/basic/Prev_Image.png)|此小组件显示图片 |
| [链接](#link)| ![005](../../de/viz/media/widget_images/basic/Prev_tplLink.png)|此小部件对应于小部件“static  -  HTML”，但也是整个表面上的可点击链接。可用于视图之间或外部链接的导航 |
| [边界](#border)| ![006](../../de/viz/media/widget_images/basic/Prev_tplFrame.png)||
| [iFrame8](#iframe8)| ![007](../../de/viz/media/widget_images/basic/Prev_StatefulIFrame8.png)||
| [查看小部件](#view-in-widget)| ![008](../../de/viz/media/widget_images/basic/Prev_ContainerView.png)|此小组件可以在视图中显示视图。导航：使用导航元素构建视图，然后将它们集成到任意数量的其他视图中 |
| [查看小部件8](#view-in-widget-8)] | ![009](../../de/viz/media/widget_images/basic/Prev_StatefulContainerView8.png)|根据状态显示8个视图中的一个 |
| `Image 8`| ![010](../../de/viz/media/widget_images/basic/Prev_StatefulImage.png)|根据条件显示8张图片中的一张 |
| `HTML navigation`| ![011](../../de/viz/media/widget_images/basic/Prev_HTMLnavigation.png)|此小组件用于在视图之间构建导航。对应于小部件“静态 - 链接”，但仅可用于视图之间的导航，并且还提供在更改视图时使用动画效果的可能性。 |
| `filter - dropdown`| ![012](../../de/viz/media/widget_images/basic/Prev_FilterDropdown.png)||
| `Number`| ![013](../../de/viz/media/widget_images/basic/Prev_ValueFloat.png)|此小组件表示数值|
| `String `| ![014](../../de/viz/media/widget_images/basic/Prev_ValueString.png)|此小组件表示String类型的数据点 |
| `String (unescaped)`| ![015](../../de/viz/media/widget_images/basic/Prev_ValueStringRaw.png)|此小部件表示类型字符串的数据点。与小部件“hm_val  -  String”相比，没有特殊字符被“转义” -  i。该变量也可能包含HTML代码，这将显示 |
| `String img src`| ![016](../../de/viz/media/widget_images/basic/Prev_ValueStringImg.png)|可以为此小部件分配一个类型字符串的变量，其中包含的URL随后显示为图片|
| `Timestamp`| ![017](../../de/viz/media/widget_images/basic/Prev_ValueTimestamp.png)||
| `Last change Timestamp`| ![018](../../de/viz/media/widget_images/basic/Prev_ValueLastchange.png)||
| `ValueList Text`| ![019](../../de/viz/media/widget_images/basic/Prev_ValueList.png)|此小组件表示值类型列表的变量 |
| `ValueList HTML`| ![020](../../de/viz/media/widget_images/basic/Prev_ValueListHtml.png)|这个小部件代表一个类型值列表的变量。对应于小部件“hm_val  -  ValueList Text，但它不是”转义“，也就是说，可以在valuelist中输入HTML代码。 |
| `ValueList HTML Style`| ![021](../../de/viz/media/widget_images/basic/Prev_ValueListHtml8.png)|这个小部件代表一个类型值列表的变量。对应于widm“hm_val  -  ValueList HTML，但是可以为8个不同的值（0-7）使用8个不同的CSS值。” |
| `Bool HTML`| ![022](../../de/viz/media/widget_images/basic/Prev_ValueBool.png)|此小组件代表Bool值 |
| `AckFlag HTML`| ![023](../../de/viz/media/widget_images/basic/Prev_AckBool.png)||
| `Bool Checkbox`| ![024](../../de/viz/media/widget_images/basic/Prev_ValueBoolCheckbox.png)|此小部件将Bool值显示为一个简单的复选框，并允许您切换值。 |
| `Bool Select`| ![025](../../de/viz/media/widget_images/basic/Prev_ValueBoolSelect.png)|此小组件将Bool值显示为下拉列表，并允许您切换值。 |
| `Bool HTML`| ![026](../../de/viz/media/widget_images/basic/Prev_ValueBoolCtrl.png)|此小组件显示bool值，还允许您切换值以在小组件区域内单击。 |
| `Bool SVG`| ![027](../../de/viz/media/widget_images/basic/Prev_ValueBoolCtrlSvg.png)|此小组件在小组件区域中单击时设置值 |
| `HTML State`| ![028](../../de/viz/media/widget_images/basic/Prev_BasicState.png)|如果关联数据点的值为0或false，则此窗口小部件将消失。技术熟练，例如用于显示服务消息|
| `Red Number`| ![029](../../de/viz/media/widget_images/basic/Prev_RedNumber.png)|以iOS通知图标的样式显示数值。消失在值0。|
| `Bulb on/off`| ![030](../../de/viz/media/widget_images/basic/Prev_BulbOnOffCtrl.png)|此小部件在黑色背景上显示一个值作为关闭或发光的灯泡。可用于Bool和Float值（调光器）。 |
| `Bar`| ![031](../../de/viz/media/widget_images/basic/Prev_ValueFloatBar.png)|此小组件显示值0-100作为水平条 |
| `Note`| ![032](../../de/viz/media/widget_images/basic/Prev_Note.png)||
| `json Table`| ![033](../../de/viz/media/widget_images/basic/Prev_TableBody.png)||
| `HTML logout`| ![034](../../de/viz/media/widget_images/basic/Prev_HtmlLogout.png)||
| `Gesture indicator`| ![035](../../de/viz/media/widget_images/basic/Prev_ValueGesture.png)||
| `Speech to text`| ![036](../../de/viz/media/widget_images/basic/Prev_Speech2Text.png)||
| `Full Screen`| ![037](../../de/viz/media/widget_images/basic/Prev_FullScreen.png)||
| `Screen Resolution`| ![038](../../de/viz/media/widget_images/basic/Prev_ScreenResolution.png)||
| `todo`| ![](../../de/viz/media/widget_images/basic/Explanation/html.png)||
| `todo`| ![](../../de/viz/media/widget_images/basic/Explanation/svg.gif)||
| `todo`| ![](../../de/viz/media/widget_images/basic/Explanation/iframe.gif)||
| `todo`| ![](../../de/viz/media/widget_images/basic/Explanation/image.gif)||
| `todo`| ![](../../de/viz/media/widget_images/basic/Explanation/link.gif)||
| `todo`| ![](../../de/viz/media/widget_images/basic/Explanation/border.gif)||
| `todo` | ！[]（media / widget_images / basic / Explanation / border.gif）||

### Html框架
这个小部件代表任意HTML代码。也可以在小部件中使用Javascript。

|属性|说明|
|-----|----|
| `ObjectId`|要显示的包含HTML的对象的ID |
|前缀html | HTML代码显示在对象前面 |
|在对象|之后附加html | HTML代码以显示 |

**例子：**！[039]

### SVG形状
此小部件仅表示几何形状，其中预定义了一些形状。

|属性|说明|
|-----|----|
|类型|几何形状|
|线条颜色|形状边框的颜色|
|填充颜色|填充颜色|
|线宽||
|以|度为单位转动|从初始位置开始的旋转角度 |
|宽度比例|将宽度缩放在0到100％|之间 |
|高度比例|将高度缩放在0到100％|之间 |

**例子：**！[040]

### Iframe
表示iframe

|属性|说明|
|-----|----|
|来源|来源之路（网站，图片）;这可以在本地或通过URL |来定义 |
|没有沙箱|：建设：|
|建设：|更新时间|
|醒来更新|：施工：|
|更新视图更改|：构造：|
|不要添加到URL |：construction：|
|滚动X |：构造：|
|滚动Y |：构造：|
|没有框架|：建筑：|

**例子：**！[041]

###图片
这个小部件代表一张图片。

|属性|说明|
|-----|----|
|源|本地文件系统中源的路径|
|拉伸|使图像适合框架尺寸|
|建设：|更新时间|
|醒来更新|：施工：|
|更新视图更改|：构造：|
|不要添加到URL |：construction：|
|允许用户交互|：构造：|

**例子：**！[042]

###链接
此窗口小部件对应于窗口小部件“HTML框架”，但也是整个表面上的可单击链接。可用于视图之间或外部链接的导航。

|属性|说明|
|-----|----|

| `html`|不言自明;）...在这里插入格式化文本表示的HTML代码。
| `link`|链接URL。要使用指向另一个视图的链接，只需输入以哈希符号（＃）|开头的视图名称`target`|链接的目标。留空以保持在同一浏览器窗口中;想打开一个新窗口_blank。其他选项：_self（相同标签），_ parent（），_ top（）

**例子：**！[043]

###边境
这个小部件只代表一个框架 - 没有其他功能，只有文本和颜色。这可以用于分组小部件。

|属性|说明|
|-----|----|

|标题|自我解释| upper label font |标题的字体|上标签颜色|标题颜色|标题背景|标题文本的背景颜色|标题向上距离|标题距离上边缘的距离|标题 - 左距离|标题距离左边距|头部高度|从顶部边缘的光束高度|头部颜色|条形图颜色

**例子：**！[044]

###在小部件8中查看
根据状态显示8个视图中的一个。

|属性|说明|
|-----|----|

| `persistent`|不再从DOM中删除曾经呈现的视图

### IFrame 8
根据状态显示8个iframe中的一个。

### HTML导航
此小组件用于在视图之间构建导航。对应于小部件“静态 - 链接”，但仅可用于视图之间的导航，并且还提供在更改视图时使用动画效果的可能性。

|属性|说明|
|-----|----|

| `html`|不言自明;）...在此处插入HTML代码| `nav_view`|此处必须输入要导航到的视图的名称`hide_effect`|这里可以输入jQueryUI效果的名称，在离开视图时使用。可用的效果有：盲，弹跳，夹子，掉落，爆炸，淡入淡出，折叠，高光，粉扑，脉动，比例，摇，大小，幻灯片和转移。
| `hide_duration`|以毫秒为单位的效果持续时间| `show_effect`|见上文，相同 - 但这次是新视图| `show_duration`|参见上文，显示新视图的以ms为单位的时间

###过滤器 - 下拉列表
###号码
此小部件表示一个数值（可用于整数和浮点数）

|属性|说明|
|-----|----|

| `html_prepend`|在数值|之前显示的文本或HTML代码`html_append`|显示在数值后面的文本或HTML代码`digits`|显示的小数位数| `factor`|与数值相乘的因子

### String
此小组件表示字符串类型的数据点。

|属性|说明|
|-----|----|

| `html_prepend`|字符串前显示的文本或HTML代码。
| `html_append`|字符串后面显示的文本或HTML代码。

### String（未转义）
此Widget表示类型字符串的数据点。与小部件“hm_val  -  String”相比，没有特殊字符被“转义” -  i。该变量也可能包含HTML代码，然后会显示。

|属性|说明|
|-----|----|

| html_prepend |出现在字符串之前的文本或HTML代码。
| html_append |字符串后显示的文本或HTML代码。

### String img src
可以为此窗口小部件分配一个string类型的变量，其中包含的URL随后显示为图片。

|属性|说明|
|-----|----|

| `html_prepend`|图像前面显示的文本或HTML代码。
| `html_append`|图像后面显示的文本或HTML代码。

###最后更改时间戳
显示已连接状态的上一个时间戳。

### ValueList文本
此小组件表示值类型列表的变量。

|属性|说明|
|-----|----|

| `valuelist`|以分号分隔的各个值的文本列表。
| `html_prepend`|图像前面显示的文本或HTML代码。
| `html_append`|图像后面显示的文本或HTML代码。

### ValueList HTML
此窗口小部件表示值类型列表的变量。对应于“hm_val  -  ValueList”窗口小部件，但它不是“转义”，因此可以在值列表中输入HTML代码。

|属性|说明|
|-----|----|

| `valuelist`|用于各个值的以分号分隔的HTML代码列表。
| `html_prepend`|图像前面显示的文本或HTML代码。
| `html_append`|图像后面显示的文本或HTML代码。

### ValueList HTML 8
此小部件表示值列表变量。对应于ValueList HTML小部件，但可以为8个不同的值（0-7）使用8个不同的CSS值。

|属性|说明|
|-----|----|

| `html_append`|图像后面显示的文本或HTML代码

| `html_append` |图像后面显示的文本或HTML代码
| value0到value7 |值0到7 |的文本或HTML代码style0到style7 |值0到7的CSS值 |

### Bool HTML
此小组件表示bool值。

|属性|说明|
|-----|----|

| `html_prepend`|图像前面显示的文本或HTML代码。
| `html_append`|图像后面显示的文本或HTML代码。
| `html_true`|在真实案例中显示的文本或HTML代码。
| `html_false`|在false的情况下显示的文本或HTML代码。

### Bool Checkbox
此小组件将bool值显示为一个简单的复选框，还允许您切换值。

|属性|说明|
|-----|----|

| `html_prepend`|复选框前显示的文本或HTML代码。
| `html_append`|复选框后面显示的文本或HTML代码。

### Bool选择
此小组件将bool值显示为下拉列表，还允许您切换值。

|属性|说明|
|-----|----|

| `html_prepend`|图像前面显示的文本或HTML代码。
| `html_append`|图像后面显示的文本或HTML代码。
| `text_true`|真实案例的文本| `text_false`|虚假案例的文本

### Bool HTML
此窗口小部件表示布尔值，还允许您在窗口小部件区域内切换值以单击。

|属性|说明|
|-----|----|

| `html_prepend`|图像前面显示的文本或HTML代码。
| `html_append`|图像后面显示的文本或HTML代码。
| `text_true`|真实案例的文本| `text_false`|虚假案例的文本

### Bool HTML
### Bool SVG
### HTML状态
此窗口小部件在窗口小部件区域中单击时设置值。

|属性|说明|
|-----|----|

| `html`|显示文本或HTML代码| `value`|要设置的值

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

|属性|说明|
|-----|----|

| `factor`|乘以该值的因子。示例：对于调光器（从0.00到1.00），必须输入100。
| `color`|条形图的CSS属性background-color `border`|条形图的CSS属性边框`shadow`|条形图的CSS属性框阴影`reverse`|如果输入为true，则条形图从右向左显示，而不是从左向右显示。

### Bar Vertical
对应于小部件“hm_val  -  Bar Horizontal，但是垂直而不是horiziontal。

|属性|说明|
|-----|----|

| `factor`|乘以该值的因子。示例：对于调光器（从0.00到1.00），必须输入100。
| `color`|条形图的CSS属性background-color `border`|条形图的CSS属性边框`shadow`|条形图的CSS属性框阴影`reverse`|如果输入为true，则条形图将从下到上显示，而不是从上到下