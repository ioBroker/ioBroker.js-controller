---
title: 可视化
lastChanged: 13.09.2018
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/viz/widgets.md
hash: Ma/ZdawKE4JUnzvNSVsgZhrua+/xTjhAPGc3ThcEbfM=
---
#Widgets
##一般
在此上下文中的小部件（“设备，事物”）是以各种方式表示数字，文本，图片或图表并提供交互可能性的显示元素。

＃** ioBroker.vis小工具**
对于带有vis的ioBroker中的可视化，有不同的小部件集。

-------------------------------------------------------------------------------  
-------------------------------------------------------------------------------

＃小部件的基本设置
## **一般**
![001_Widget_Generell](../../de/viz/../media/vis/vis_widgets_001_Widget_Generell.jpg)

属性|说明|
---- | ---- |
名称|在这里您可以输入此小组件的唯一名称注释|在此您可以输入简短描述CSS类|：构造：过滤器字词：构造：在视图中显示|在此您可以选择此窗口小部件是仅在当前视图中还是应该出现在几个。
不活动（锁定）|：构造：

## **可见性**
可以使小部件的可见性取决于数据点的状态。
![002_Widget_Sichtbarkeit](../../de/viz/../media/vis/vis_widgets-2_002_Widget_Sichtbarkeit.jpg)

属性|说明|
---- | ---- |
对象ID |输入数据点的ID以控制所选窗口小部件的可见性。可以通过按钮搜索数据点。
条件|如果在此处为o.a输入条件，则窗口小部件将可见。数据点...
条件的值| ...对应于此处输入的值。

## **一般**
![](../../de/viz/../media/vis/vis_widgets_003_Widget_Allgemein.jpg)“常规”部分特定于每个窗口小部件，并为每个窗口小部件详细描述。
在本节中，对象ID字段中的所需数据点将映射到窗口小部件。

***小部件的** CSS设置**可以在以下菜单项中找到，可以根据您自己的意愿进行调整：

## ** CSS一般**
![](../../de/viz/../media/vis/vis_widgets_004_CSS_allgemein.jpg)

属性|说明|
---- | ---- |
left |距离视图顶部的左边缘的距离|距窗口的顶部的距离|窗口小部件的宽度|窗口的高度|窗口的高度|指示窗口小部件所在的平面（0 =在背景上，正值=每个值越高，越往上）overflow-x | overflow属性指定如果内容在元素框中溢出会发生什么。此属性提供当元素的内容太大而无法放入指定区域时是否向滚动条添加内容。
溢出-Y |
不透明度|透明度（0 =不透明 - >图像不可见.. 1 =透明 - >图像可见）

## ** CSS字体和文字**
![005_CSS_Font_Text](../../de/viz/../media/vis/vis_widgets_005_CSS_Font_Text.jpg)

属性|说明|
---- | ---- |
color | font color（通过选择对话框或颜色代码）text-align | flush文本（左，右，居中）text-shadow |颜色字体font-family | font font-style | font type（normal，italic，oblique，initial，继承）font-variant |字符集变体（普通，小写字母，...）font-weight |字体强度字体大小|字体大小line-height |行间距字母间距|间距字间距|字间距

## ** CSS背景**
![006_CSS_Hintergrund](../../de/viz/../media/vis/vis_widgets_006_CSS_Hintergrund.jpg)

属性|说明|
---- | ---- |
background |这里可以指定多个以下属性-color | background color -image | background image -repeat |指定是否在元素的整个宽度或/和高度上重复背景。
-attachement |指定背景图像是固定的还是在移动时滚动 - 位置|背景图像的方向（https://www.w3schools.com/cssref/pr_background-position.asp）-size |背景图像的大小-clip |控制与图像坐标的边缘-origin |坐标坐标原点的重叠

（见https://www.w3schools.com/cssref/css3_pr_background.asp）

## ** CSS边框**
![007_CSS_Border](../../de/viz/../media/vis/vis_widgets_007_CSS_Border.jpg)

属性|说明|
---- | ---- |
-width | border thickness -style |边框的线条样式 - 颜色|边框颜色-radius |边框的边角;最多可以是小部件较短范围的一半

## ** CSS阴影和距离**
![008_CSS_Schatten_Abstand](../../de/viz/../media/vis/vis_widgets_008_CSS_Schatten_Abstand.jpg)

属性|说明|
---- | ---- |
padding |从小部件框的边缘偏移padding-left |偏移在左侧padding-top |偏移在顶侧padding-right | offset在右侧padding-bottom | offset在底侧box-shadow |颜色小部件框阴影边距顶部|窗口小部件周围的上边距（自动，％，px，pt，cm）边距右边缘|右边距小部件边距 - 底部|底部边距小部件边距左边|左边距围绕小部件

[185]：../ media / vis / widget_images / swipe / Prev_Carousel.png [186]：../ media / vis / widget_images / swipe / Prev_Swipe.png