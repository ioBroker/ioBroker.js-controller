---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-materialdesign/README.md
title: ioBroker VIS的材料设计小部件
hash: STkC4jUrj13PgxyXCjHtZZL44zY9Atc892hDUI3Tx/M=
---
![商标](../../../en/adapterref/iobroker.vis-materialdesign/admin/vis-materialdesign.png)<！-toc中省略->

![稳定版](http://iobroker.live/badges/vis-materialdesign.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.vis-materialdesign.svg)
![安装数量](http://iobroker.live/badges/vis-materialdesign-installed.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.vis-materialdesign.svg)
![NPM](https://nodei.co/npm/iobroker.vis-materialdesign.png?downloads=true)

## IoBroker.vis-materialdesign
<！-在目录中省略->

＃ioBroker VIS [![贝宝]（https://www.paypalobjects.com/zh_CN/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VWAXSTS634G88&source=url)]的材料设计小部件
ioBroker物料设计小部件基于[Google的材料设计指南](https://material.io/design/)

<br>

<！-在目录中省略->

＃＃ 表中的内容
-[一般]（＃general）
-[在线示例项目]（＃online-example-project）
-[实用示例]（＃practical-examples）
-[有关小部件的问题和答案]（＃questions-and-answers-about-the-widgets）
-[支持的浏览器]（＃supported-browser）
-[支持在移动设备上振动的浏览器功能]（＃支持浏览器在移动设备上振动的功能）
-[ioBroker VIS App]（＃iobroker-vis-app）
-[适配器设置]（＃adapter-settings）
-[General]（＃general-1）
-[主题编辑器]（＃theme-editor）
-[颜色主题]（＃colors-theme）
-[字体主题]（＃fonts-theme）
-[字体大小主题]（＃font-sizes-theme）
-[小部件]（＃widgets）
-[材料设计图标和图像]（＃material-design-icons-and-images）
-[按钮]（＃buttons）
-[垂直按钮]（＃buttons-vertical）
-[按钮图标]（＃buttons-icon）
-[卡片]（＃card）
-[列表]（＃list）
-[IconList]（＃iconlist）
-[编辑器设置]（＃editor-settings）
-[JSON属性]（＃json-properties）
-[进度]（＃progress）
-[进度通知]（＃progress-circular）
-[滑块]（＃slider）
-[滑子回合]（＃slider-round）
-[复选框]（＃checkbox）
-[Switch]（＃switch）
-[输入]（＃输入）
-[文字输入]（＃text-input）
-[选择]（＃select）
-[自动完成]（＃autocomplete）
-[顶部应用栏]（＃top-app-bar）
-[子菜单]（＃submenu）
-[JSON属性]（＃json-properties-1）
-[图表]（＃charts）
-[条形图]（＃bar-chart）
-[编辑器设置]（＃editor-settings-1）
-[JSON属性]（＃json-properties-2）
-[饼图]（＃pie-chart）
-[编辑器设置]（＃editor-settings-2）
-[JSON属性]（＃json-properties-3）
-[线路历史记录图表：]（＃line-history-chart）
-[编辑器设置]（＃editor-settings-3）
-[JSON图表]（＃json-chart）
-[JSON属性]（＃json-properties-4）
-[表格]（＃table）
-[输入数据]（＃input-data）
-[控制元素]（＃control-elements）
-[编辑器设置]（＃editor-settings-4）
-[响应式布局]（＃sensitive-layout）
-[砌体视图]（＃masonry-views）
-[网格视图]（＃grid-views）
-[警报]（＃alerts）
-[日历]（＃calendar）
-[HTML元素]（＃html-elements）
-[二手图书馆]（＃used-libraries）
-[变更日志]（＃changelog）
-[许可证]（＃license）

＃ 一般
##在线示例项目
由[iobroker.click](https://iobroker.click/index.html)提供，这要归功于bluefox和iobroker。

* <a href="https://iobroker.click/vis/index.html?Material%20Design%20Widgets" target="_blank">VIS运行时</a>（ <a href="http://iobroker.click:8082/vis/index.html?Material%20Design%20Widgets" target="_blank">alternativ</a> ）
* <a href="https://iobroker.click/vis/edit.html?Material%20Design%20Widgets" target="_blank">VIS编辑器</a>（ <a href="http://iobroker.click:8082/vis/edit.html?Material%20Design%20Widgets" target="_blank">alternativ</a> ）

##实际例子
* [天气视图]（https://forum.iobroker.net/topic/32232/material-design-widgets-wetter-view）
* [Skript状态]（https://forum.iobroker.net/topic/30662/material-design-widgets-skript-status）
* [适配器状态]（https://forum.iobroker.net/topic/30661/material-design-widgets-adapter-status）
* [UniFi Netzwerk状态]（https://github.com/Scrounger/ioBroker.vis-materialdesign/tree/master/examples/UnifiNetworkState）

##有关小部件的问题和答案
如果您对各个小部件有疑问，请首先查看各个小部件的主题

* [德语线程]（https://forum.iobroker.net/search?term=Material%20Design%20Widgets%3A&in=titles&matchWords=all&by%5B%5D=Scrounger&categories%5B%5D=7&sortBy=topic.title&sortDirection=desc&showAs=主题）

##支持的浏览器
我正式支持每个主要浏览器的最后两个版本。具体来说，我在以下浏览器上进行测试：

* Windows和Linux上的Firefox
* Android，Windows和Linux上的Chrome

##支持的浏览器可在移动设备上振动功能
https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/vibrate

## IoBroker VIS应用程序
该应用程序需要实现最新版本，请参阅https://github.com/ioBroker/ioBroker.vis.cordova。
我不使用该应用程序，也未对其进行测试

＃适配器设置
从版本0.4.0开始，有一个适配器设置页面。您可以在管理适配器的用户界面中的“实例”下找到它

＃＃ 一般
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/settings_general.png)

|设置|描述|
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|说明文件|链接到文档以帮助您配置窗口小部件|
|生成全局脚本使用所有主题数据点为[Javascript脚本引擎](https://github.com/ioBroker/ioBroker.javascript)创建一个全局脚本。这允许在脚本中舒适地使用颜色，字体和字体大小。 |
|哨兵使用Sentry库自动向开发人员匿名报告异常和代码错误。有关更多详细信息以及如何禁用错误报告的信息，请参见[Sentry-Plugin文档]（https://github.com/ioBroker/plugin-sentry#plugin-sentry）！ |

##主题编辑器
借助主题编辑器，您可以通过适配器设置为所有小部件集中设置颜色，字体和字体大小。这是在[VIS适配器的绑定](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects)的帮助下实现的。对于每个窗口小部件，使用设置值创建数据点（请参见下面的屏幕快照）。这样就可以通过绑定在其他窗口小部件（而非“材料设计窗口小部件”）中使用这些设置。

#####数据点结构
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/settings_datapoints.png)

##### VIS编辑器（还原/更新旧的小部件）
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/vis_editor_theme_restore.gif)

在VIS编辑器中，您将为每个小部件找到一个按钮`use theme`。使用此按钮，您可以重置小部件以使用主题。这意味着如果您更改了颜色，字体或字体大小，则可以使用此按钮将其重置。

借助此按钮，还可以从0.4.0之前的版本更新您的小部件以使用主题。

#####对非Material Design小部件使用绑定
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/settings_binding.gif)

在适配器设置中，您可以通过单击表中的默认文本或ID将绑定命令复制到剪贴板。然后，即使对于非Material Design小部件，也可以通过复制和粘贴使用此绑定。

###颜色主题
对于颜色，有两个主题-浅色主题和深色主题。使用数据点`vis-materialdesign.0.colors.darkTheme`，您可以在两个主题之间切换。

![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/settings_colors_light.png)

![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/settings_colors_dark.png)

可以在上方区域定义标准颜色。然后可以使用表格中的按钮将这些标准颜色分配给各个小部件。如果更改默认颜色，则所有使用该颜色的小部件的颜色也会更改。
此外，可以将您自己的颜色分配给小部件，而与标准颜色无关。

###字体主题
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/settings_fonts.png)

可以在上方区域定义标准字体。然后，可以使用表格中的按钮将这些标准字体分配给各个小部件。如果更改默认颜色，则所有使用该颜色的小部件的颜色也会更改。
另外，可以将您自己的字体分配给小部件，而与标准颜色无关。

###字体大小主题
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/settings_fontSizes.png)

可以在上方区域定义标准字体大小。然后，可以使用表格中的按钮将这些标准字体大小分配给各个小部件。如果更改默认颜色，则所有使用该颜色的小部件的颜色也会更改。
此外，可以将您自己的字体大小分配给小部件，而与标准颜色无关。

＃小部件
##材质设计图标和图像
<table><thead><tr><th>屏幕截图</th><th>描述</th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/material-icons.png"></td><td>一些小部件支持<a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a>库。您可以从上方列表中弹出一个图标，或通过单击输入字段右侧的按钮来打开图像选择器。<br><br><b>图像颜色仅适用于材料设计图标，不适用于图像！</b></td></tr></tbody></table>

＃＃ 纽扣
#####按钮链接属性
以下属性可用作[表中的控制元素]（＃control-elements）或作为[HTML元素](#html-elements)

<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>类型</td><td>小部件类型</td><td>串</td><td>link_default</td></tr><tr><td>调试</td><td>调试模式</td><td>布尔值</td><td>错误真正</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>共同</b></i></td></tr><tr><td>buttonStyle</td><td>按钮样式</td><td>串</td><td>文字|提出|未提升概述</tr><tr><td>href</td><td>链接</td><td>网址</td><td></tr><tr><td>openNewWindow</td><td>在新窗口中打开</td><td>布尔值</td><td>错误真正</tr><tr><td>vibrateOnMobilDevices</td><td>在移动装置上振动[s]</td><td>数</td><td></tr><tr><td>generateHtmlControl</td><td>生成HTML元素</td><td>串</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>贴标</b></i></td></tr><tr><td>按钮文字</td><td>按钮文字</td><td>串</td><td></tr><tr><td>textFontFamily</td><td>字形</td><td>串</td><td></tr><tr><td>textFontSize</td><td>字体大小</td><td>数</td><td></tr><tr><td>labelWidth</td><td>文字宽度</td><td>数</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>颜色</b></i></td></tr><tr><td>mdwButtonPrimaryColor</td><td>原色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> mdwButtonSecondaryColor</td><td>二次色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> mdwButtonColorPress</td><td>压色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>图标</b></i></td></tr><tr><td>图片</td><td>图片</td><td>串</td><td></tr><tr><td>imageColor</td><td>图像颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> iconPosition</td><td>图像位置</td><td>串</td><td>左|对</tr><tr><td>iconHeight</td><td>影像高度</td><td>数</td><td></tr></tbody></table></details>

#####按钮状态属性
以下属性可用作[表中的控制元素]（＃control-elements）或作为[HTML元素](#html-elements)

<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>类型</td><td>小部件类型</td><td>串</td><td>state_default</td></tr><tr><td>调试</td><td>调试模式</td><td>布尔值</td><td>错误真正</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>共同</b></i></td></tr><tr><td>oid</td><td>对象ID</td><td>串</td><td></tr><tr><td>buttonStyle</td><td>按钮样式</td><td>串</td><td>文字|提出|未提升概述</tr><tr><td>值</td><td>值</td><td>串</td><td></tr><tr><td>vibrateOnMobilDevices</td><td>在移动装置上振动[s]</td><td>数</td><td></tr><tr><td>generateHtmlControl</td><td>生成HTML元素</td><td>串</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>贴标</b></i></td></tr><tr><td>按钮文字</td><td>按钮文字</td><td>串</td><td></tr><tr><td>textFontFamily</td><td>字形</td><td>串</td><td></tr><tr><td>textFontSize</td><td>字体大小</td><td>数</td><td></tr><tr><td>labelWidth</td><td>文字宽度</td><td>数</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>颜色</b></i></td></tr><tr><td>mdwButtonPrimaryColor</td><td>原色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> mdwButtonSecondaryColor</td><td>二次色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> mdwButtonColorPress</td><td>压色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>图标</b></i></td></tr><tr><td>图片</td><td>图片</td><td>串</td><td></tr><tr><td>imageColor</td><td>图像颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> iconPosition</td><td>图像位置</td><td>串</td><td>左|对</tr><tr><td>iconHeight</td><td>影像高度</td><td>数</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>锁定</b></i></td></tr><tr><td>lockEnabled</td><td>启用锁定</td><td>布尔值</td><td>错误真正</tr><tr><td>autoLockAfter</td><td> [s]之后自动锁定</td><td>数</td><td></tr><tr><td>lockIcon</td><td>图标</td><td>串</td><td></tr><tr><td>lockIconSize</td><td>图标大小</td><td>数</td><td></tr><tr><td>lockIconColor</td><td>图标颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> lockFilterGrayscale</td><td>灰色滤镜（如果锁定）</td><td>数</td><td></tr></tbody></table></details>

#####按钮切换属性
以下属性可用作[表中的控制元素]（＃control-elements）或作为[HTML元素](#html-elements)

<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>类型</td><td>小部件类型</td><td>串</td><td>toggle_default</td></tr><tr><td>调试</td><td>调试模式</td><td>布尔值</td><td>错误真正</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>共同</b></i></td></tr><tr><td>oid</td><td>对象ID</td><td>串</td><td></tr><tr><td>buttonStyle</td><td>按钮样式</td><td>串</td><td>文字|提出|未提升概述</tr><tr><td>只读</td><td>只读</td><td>布尔值</td><td>错误真正</tr><tr><td>toggleType</td><td>切换类型</td><td>串</td><td>布尔|值</tr><tr><td>按钮</td><td>按钮</td><td>布尔值</td><td>错误真正</tr><tr><td>valueOff</td><td>折价</td><td>串</td><td></tr><tr><td>valueOn</td><td>的价值</td><td>串</td><td></tr><tr><td>stateIfNotTrueValue</td><td>说明值是否等于“ on”条件</td><td>串</td><td>在|关</tr><tr><td>vibrateOnMobilDevices</td><td>在移动装置上振动[s]</td><td>数</td><td></tr><tr><td>generateHtmlControl</td><td>生成HTML元素</td><td>串</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>贴标</b></i></td></tr><tr><td>按钮文字</td><td>按钮文字</td><td>串</td><td></tr><tr><td>labelTrue</td><td>标签为真</td><td>串</td><td></tr><tr><td>labelColorFalse</td><td>标签颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> labelColorTrue</td><td>活动标签颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> textFontFamily</td><td>字形</td><td>串</td><td></tr><tr><td>textFontSize</td><td>字体大小</td><td>数</td><td></tr><tr><td>labelWidth</td><td>文字宽度</td><td>数</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>颜色</b></i></td></tr><tr><td>mdwButtonPrimaryColor</td><td>原色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> mdwButtonSecondaryColor</td><td>二次色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> mdwButtonColorPress</td><td>压色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorBgFalse</td><td>背景</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorBgTrue</td><td>活动背景</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>图标</b></i></td></tr><tr><td>图片</td><td>图片</td><td>串</td><td></tr><tr><td>imageColor</td><td>图像颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> imageTrue</td><td>活动图像</td><td>串</td><td></tr><tr><td>imageTrueColor</td><td>活动图像颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> iconPosition</td><td>图像位置</td><td>串</td><td>左|对</tr><tr><td>iconHeight</td><td>影像高度</td><td>数</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>锁定</b></i></td></tr><tr><td>lockEnabled</td><td>启用锁定</td><td>布尔值</td><td>错误真正</tr><tr><td>autoLockAfter</td><td> [s]之后自动锁定</td><td>数</td><td></tr><tr><td>lockIcon</td><td>图标</td><td>串</td><td></tr><tr><td>lockIconSize</td><td>图标大小</td><td>数</td><td></tr><tr><td>lockIconColor</td><td>图标颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> lockFilterGrayscale</td><td>灰色滤镜（如果锁定）</td><td>数</td><td></tr></tbody></table></details>

##垂直按钮
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/buttons.gif)

#####按钮垂直链接属性
以下属性可用作[表中的控制元素]（＃control-elements）或作为[HTML元素](#html-elements)

<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>类型</td><td>小部件类型</td><td>串</td><td>link_vertical</td></tr><tr><td>调试</td><td>调试模式</td><td>布尔值</td><td>错误真正</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>共同</b></i></td></tr><tr><td>buttonStyle</td><td>按钮样式</td><td>串</td><td>文字|提出|未提升概述</tr><tr><td>href</td><td>链接</td><td>网址</td><td></tr><tr><td>openNewWindow</td><td>在新窗口中打开</td><td>布尔值</td><td>错误真正</tr><tr><td>vibrateOnMobilDevices</td><td>在移动装置上振动[s]</td><td>数</td><td></tr><tr><td>generateHtmlControl</td><td>生成HTML元素</td><td>串</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>贴标</b></i></td></tr><tr><td>按钮文字</td><td>按钮文字</td><td>串</td><td></tr><tr><td>textFontFamily</td><td>字形</td><td>串</td><td></tr><tr><td>textFontSize</td><td>字体大小</td><td>数</td><td></tr><tr><td>对准</td><td>对准</td><td>串</td><td>弹性启动|中心|柔性端</tr><tr><td>distanceBetweenTextAndImage</td><td>文字和图片之间的距离</td><td>数</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>颜色</b></i></td></tr><tr><td>mdwButtonPrimaryColor</td><td>原色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> mdwButtonSecondaryColor</td><td>二次色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> mdwButtonColorPress</td><td>压色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>图标</b></i></td></tr><tr><td>图片</td><td>图片</td><td>串</td><td></tr><tr><td>imageColor</td><td>图像颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> iconPosition</td><td>图像位置</td><td>串</td><td>顶部|底部</tr><tr><td>iconHeight</td><td>影像高度</td><td>数</td><td></tr></tbody></table></details>

#####按钮垂直状态属性
以下属性可用作[表中的控制元素]（＃control-elements）或作为[HTML元素](#html-elements)

<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>类型</td><td>小部件类型</td><td>串</td><td>state_vertical</td></tr><tr><td>调试</td><td>调试模式</td><td>布尔值</td><td>错误真正</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>共同</b></i></td></tr><tr><td>oid</td><td>对象ID</td><td>串</td><td></tr><tr><td>buttonStyle</td><td>按钮样式</td><td>串</td><td>文字|提出|未提升概述</tr><tr><td>值</td><td>值</td><td>串</td><td></tr><tr><td>vibrateOnMobilDevices</td><td>在移动装置上振动[s]</td><td>数</td><td></tr><tr><td>generateHtmlControl</td><td>生成HTML元素</td><td>串</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>贴标</b></i></td></tr><tr><td>按钮文字</td><td>按钮文字</td><td>串</td><td></tr><tr><td>textFontFamily</td><td>字形</td><td>串</td><td></tr><tr><td>textFontSize</td><td>字体大小</td><td>数</td><td></tr><tr><td>对准</td><td>对准</td><td>串</td><td>弹性启动|中心|柔性端</tr><tr><td>distanceBetweenTextAndImage</td><td>文字和图片之间的距离</td><td>数</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>颜色</b></i></td></tr><tr><td>mdwButtonPrimaryColor</td><td>原色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> mdwButtonSecondaryColor</td><td>二次色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> mdwButtonColorPress</td><td>压色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>图标</b></i></td></tr><tr><td>图片</td><td>图片</td><td>串</td><td></tr><tr><td>imageColor</td><td>图像颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> iconPosition</td><td>图像位置</td><td>串</td><td>顶部|底部</tr><tr><td>iconHeight</td><td>影像高度</td><td>数</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>锁定</b></i></td></tr><tr><td>lockEnabled</td><td>启用锁定</td><td>布尔值</td><td>错误真正</tr><tr><td>autoLockAfter</td><td> [s]之后自动锁定</td><td>数</td><td></tr><tr><td>lockIcon</td><td>图标</td><td>串</td><td></tr><tr><td>lockIconTop</td><td>距顶部的符号距离[％]</td><td>数</td><td></tr><tr><td>lockIconLeft</td><td>距左的符号距离[％]</td><td>数</td><td></tr><tr><td>lockIconSize</td><td>图标大小</td><td>数</td><td></tr><tr><td>lockIconColor</td><td>图标颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> lockFilterGrayscale</td><td>灰色滤镜（如果锁定）</td><td>数</td><td></tr></tbody></table></details>

#####按钮垂直切换属性
以下属性可用作[表中的控制元素]（＃control-elements）或作为[HTML元素](#html-elements)

<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>类型</td><td>小部件类型</td><td>串</td><td>toggle_vertical</td></tr><tr><td>调试</td><td>调试模式</td><td>布尔值</td><td>错误真正</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>共同</b></i></td></tr><tr><td>oid</td><td>对象ID</td><td>串</td><td></tr><tr><td>buttonStyle</td><td>按钮样式</td><td>串</td><td>文字|提出|未提升概述</tr><tr><td>只读</td><td>只读</td><td>布尔值</td><td>错误真正</tr><tr><td>toggleType</td><td>切换类型</td><td>串</td><td>布尔|值</tr><tr><td>按钮</td><td>按钮</td><td>布尔值</td><td>错误真正</tr><tr><td>valueOff</td><td>折价</td><td>串</td><td></tr><tr><td>valueOn</td><td>的价值</td><td>串</td><td></tr><tr><td>stateIfNotTrueValue</td><td>说明值是否等于“ on”条件</td><td>串</td><td>在|关</tr><tr><td>vibrateOnMobilDevices</td><td>在移动装置上振动[s]</td><td>数</td><td></tr><tr><td>generateHtmlControl</td><td>生成HTML元素</td><td>串</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>贴标</b></i></td></tr><tr><td>按钮文字</td><td>按钮文字</td><td>串</td><td></tr><tr><td>labelTrue</td><td>标签为真</td><td>串</td><td></tr><tr><td>labelColorFalse</td><td>标签颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> labelColorTrue</td><td>活动标签颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> textFontFamily</td><td>字形</td><td>串</td><td></tr><tr><td>textFontSize</td><td>字体大小</td><td>数</td><td></tr><tr><td>对准</td><td>对准</td><td>串</td><td>弹性启动|中心|柔性端</tr><tr><td>distanceBetweenTextAndImage</td><td>文字和图片之间的距离</td><td>数</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>颜色</b></i></td></tr><tr><td>mdwButtonPrimaryColor</td><td>原色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> mdwButtonSecondaryColor</td><td>二次色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorBgFalse</td><td>背景</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorBgTrue</td><td>活动背景</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>图标</b></i></td></tr><tr><td>图片</td><td>图片</td><td>串</td><td></tr><tr><td>imageColor</td><td>图像颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> imageTrue</td><td>活动图像</td><td>串</td><td></tr><tr><td>imageTrueColor</td><td>活动图像颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> iconPosition</td><td>图像位置</td><td>串</td><td>顶部|底部</tr><tr><td>iconHeight</td><td>影像高度</td><td>数</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>锁定</b></i></td></tr><tr><td>lockEnabled</td><td>启用锁定</td><td>布尔值</td><td>错误真正</tr><tr><td>autoLockAfter</td><td> [s]之后自动锁定</td><td>数</td><td></tr><tr><td>lockIcon</td><td>图标</td><td>串</td><td></tr><tr><td>lockIconTop</td><td>距顶部的符号距离[％]</td><td>数</td><td></tr><tr><td>lockIconLeft</td><td>距左的符号距离[％]</td><td>数</td><td></tr><tr><td>lockIconSize</td><td>图标大小</td><td>数</td><td></tr><tr><td>lockIconColor</td><td>图标颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> lockFilterGrayscale</td><td>灰色滤镜（如果锁定）</td><td>数</td><td></tr></tbody></table></details>

##按钮图标
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/icon-button.gif)

#####按钮图标链接属性
以下属性可用作[表中的控制元素]（＃control-elements）或作为[HTML元素](#html-elements)

<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>类型</td><td>小部件类型</td><td>串</td><td>link_icon</td></tr><tr><td>调试</td><td>调试模式</td><td>布尔值</td><td>错误真正</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>共同</b></i></td></tr><tr><td>href</td><td>链接</td><td>网址</td><td></tr><tr><td>openNewWindow</td><td>在新窗口中打开</td><td>布尔值</td><td>错误真正</tr><tr><td>vibrateOnMobilDevices</td><td>在移动装置上振动[s]</td><td>数</td><td></tr><tr><td>generateHtmlControl</td><td>生成HTML元素</td><td>串</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>图标</b></i></td></tr><tr><td>图片</td><td>图片</td><td>串</td><td></tr><tr><td>imageColor</td><td>图像颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> iconHeight</td><td>影像高度</td><td>数</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>颜色</b></i></td></tr><tr><td>colorBgFalse</td><td>背景</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorPress</td><td>压色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr></tbody></table></details>

#####按钮图标状态属性
以下属性可用作[表中的控制元素]（＃control-elements）或作为[HTML元素](#html-elements)

<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>类型</td><td>小部件类型</td><td>串</td><td>state_icon</td></tr><tr><td>调试</td><td>调试模式</td><td>布尔值</td><td>错误真正</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>共同</b></i></td></tr><tr><td>oid</td><td>对象ID</td><td>串</td><td></tr><tr><td>值</td><td>值</td><td>串</td><td></tr><tr><td>vibrateOnMobilDevices</td><td>在移动装置上振动[s]</td><td>数</td><td></tr><tr><td>generateHtmlControl</td><td>生成HTML元素</td><td>串</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>图标</b></i></td></tr><tr><td>图片</td><td>图片</td><td>串</td><td></tr><tr><td>imageColor</td><td>图像颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> iconHeight</td><td>影像高度</td><td>数</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>颜色</b></i></td></tr><tr><td>colorBgFalse</td><td>背景</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorPress</td><td>压色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>锁定</b></i></td></tr><tr><td>lockEnabled</td><td>启用锁定</td><td>布尔值</td><td>错误真正</tr><tr><td>autoLockAfter</td><td> [s]之后自动锁定</td><td>数</td><td></tr><tr><td>lockIcon</td><td>图标</td><td>串</td><td></tr><tr><td>lockIconTop</td><td>距顶部的符号距离[％]</td><td>数</td><td></tr><tr><td>lockIconLeft</td><td>距左的符号距离[％]</td><td>数</td><td></tr><tr><td>lockIconSize</td><td>图标大小</td><td>数</td><td></tr><tr><td>lockIconColor</td><td>图标颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> lockIconBackground</td><td> lockIconBackground</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> lockBackgroundSizeFactor</td><td> lockBackgroundSizeFactor</td><td>数</td><td></tr><tr><td>lockFilterGrayscale</td><td>灰色滤镜（如果锁定）</td><td>数</td><td></tr></tbody></table></details>

#####按钮图标切换属性
以下属性可用作[表中的控制元素]（＃control-elements）或作为[HTML元素](#html-elements)

<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr><thead><tbody><tr><td>类型</td><td>小部件类型</td><td>串</td><td>toggle_icon</td></tr><tr><td>调试</td><td>调试模式</td><td>布尔值</td><td>错误真正</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>共同</b></i></td></tr><tr><td>oid</td><td>对象ID</td><td>串</td><td></tr><tr><td>只读</td><td>只读</td><td>布尔值</td><td>错误真正</tr><tr><td>toggleType</td><td>切换类型</td><td>串</td><td>布尔|值</tr><tr><td>按钮</td><td>按钮</td><td>布尔值</td><td>错误真正</tr><tr><td>valueOff</td><td>折价</td><td>串</td><td></tr><tr><td>valueOn</td><td>的价值</td><td>串</td><td></tr><tr><td>stateIfNotTrueValue</td><td>说明值是否等于“ on”条件</td><td>串</td><td>在|关</tr><tr><td>vibrateOnMobilDevices</td><td>在移动装置上振动[s]</td><td>数</td><td></tr><tr><td>generateHtmlControl</td><td>生成HTML元素</td><td>串</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>图标</b></i></td></tr><tr><td>图片</td><td>图片</td><td>串</td><td></tr><tr><td>imageColor</td><td>图像颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> imageTrue</td><td>活动图像</td><td>串</td><td></tr><tr><td>imageTrueColor</td><td>活动图像颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> iconHeight</td><td>影像高度</td><td>数</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>颜色</b></i></td></tr><tr><td>colorBgFalse</td><td>背景</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorBgTrue</td><td>活动背景</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorPress</td><td>压色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>锁定</b></i></td></tr><tr><td>lockEnabled</td><td>启用锁定</td><td>布尔值</td><td>错误真正</tr><tr><td>autoLockAfter</td><td> [s]之后自动锁定</td><td>数</td><td></tr><tr><td>lockIcon</td><td>图标</td><td>串</td><td></tr><tr><td>lockIconTop</td><td>距顶部的符号距离[％]</td><td>数</td><td></tr><tr><td>lockIconLeft</td><td>距左的符号距离[％]</td><td>数</td><td></tr><tr><td>lockIconSize</td><td>图标大小</td><td>数</td><td></tr><tr><td>lockIconColor</td><td>图标颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> lockIconBackground</td><td> lockIconBackground</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> lockBackgroundSizeFactor</td><td> lockBackgroundSizeFactor</td><td>数</td><td></tr><tr><td>lockFilterGrayscale</td><td>灰色滤镜（如果锁定）</td><td>数</td><td></tr></tbody></table></details>

##卡
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/cards.png)

##清单
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/list.gif)

## IconList
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/iconList.gif)

###编辑器设置
下表中未列出的设置是不言自明的。

<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/iconlist_settings_data.png"></td><td>列表数据的输入方法</td><td>IconList的数据可以通过编辑器输入，也可以使用JSON字符串</td></tr><tr><td>编辑器：列表项计数</td><td>使用vis编辑器获取列表数据的列表项数</td></tr><tr><td>JSON-String：对象ID</td><td>包含json字符串的数据点的对象ID。允许的属性如下所述</td></tr></tbody></table>

### JSON属性
JSON字符串必须是具有以下属性的对象数组：

<table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>listType</td><td>清单类型</td><td>串</td><td>文字| buttonState | buttonToggle | buttonToggleValueTrue | buttonToggleValueFalse | buttonNav | buttonLink</td></tr><tr><td> objectId</td><td>按钮的对象ID</td><td>串</td><td/></tr><tr><td>buttonStateValue</td><td>按钮状态的值</td><td>串</td><td/></tr><tr><td>buttonNavView</td><td>查看导航</td><td>串</td><td/></tr><tr><td>buttonLink</td><td>网址导航</td><td>串</td><td/></tr><tr><td>buttonToggleValueTrue</td><td>按键切换的真实值</td><td>串</td><td/></tr><tr><td>buttonToggleValueFalse</td><td>按钮切换的假值</td><td>串</td><td/></tr><tr><td>showValueLabel</td><td>以文字显示价值</td><td>串</td><td/></tr><tr><td>价值附录</td><td>将文字附加到值</td><td>串</td><td/></tr><tr><td>背景</td><td>背景颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td>背景</td><td>文本</td><td>串</td><td/></tr><tr><td>subText</td><td>第二文字</td><td>串</td><td/></tr><tr><td>图片</td><td>图像路径或“材料设计”图标的名称</td><td>串</td><td/></tr><tr><td>imageColor</td><td>材料设计图标的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> imageActive</td><td>活动按钮的图像路径或“材料设计”图标的名称</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> buttonBackgroundColor</td><td>按钮的背景色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> buttonBackgroundActiveColor</td><td>活动按钮的按钮背景色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> statusBarColor</td><td>状态栏的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> statusBarText</td><td>状态栏文字</td><td>串</td><td/></tr><tr><td>lockEnabled</td><td>启用锁定</td><td>布尔值</td><td>错误真正</tr></tbody></table>

<！-在目录中省略->

####示例
<details> <pre><code> [ { "background": "red", "text": "text1", "subText": "number", "image": "harddisk", "imageColor": "#ec0909", "imageActive": "folder", "imageActiveColor": "#5ad902", "buttonBackgroundColor": "", "buttonBackgroundActiveColor": "", "listType": "buttonState", "objectId": "0_userdata.0.iconList.buttonState.number", "buttonStateValue": "60", "buttonNavView": "", "buttonLink": "", "buttonToggleValueTrue": "", "buttonToggleValueFalse": "", "valueAppendix": "", "showValueLabel": "true", "statusBarColor": "green", "lockEnabled": "false" }, { "background": "green", "text": "text0", "subText": "bool", "image": "home", "imageColor": "#44739e", "imageActive": "home", "imageActiveColor": "#44739e", "buttonBackgroundColor": "", "buttonBackgroundActiveColor": "#a0f628", "listType": "buttonToggle", "objectId": "0_userdata.0.iconList.buttonToggle.bool0", "buttonStateValue": "60", "buttonNavView": "", "buttonLink": "", "buttonToggleValueTrue": "", "buttonToggleValueFalse": "", "valueAppendix": "", "showValueLabel": "false", "statusBarColor": "", "lockEnabled": "false" } ] </code></pre> </details>

##进展
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/progress.gif)

<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/progress_settings.png"></td><td> 自定义标签</td><td>对于自定义标签，可以使用属性<code>[#value]</code>显示数据点的实际值。要显示当前百分比，您可以使用<code>[#percent]</code></td></tr></tbody></table>

#####进度属性
以下属性可用作[表中的控制元素]（＃control-elements）或作为[HTML元素](#html-elements)

<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>类型</td><td>小部件类型</td><td>串</td><td>线性的</td></tr><tr><td>调试</td><td>调试模式</td><td>布尔值</td><td>错误真正</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>共同</b></i></td></tr><tr><td>进度不确定</td><td>不确定-连续动画</td><td>布尔值</td><td>错误真正</tr><tr><td>oid</td><td>对象ID</td><td>串</td><td></tr><tr><td>分</td><td>分</td><td>串</td><td></tr><tr><td>最高</td><td>最高</td><td>串</td><td></tr><tr><td>逆转</td><td>冲销价值</td><td>布尔值</td><td>错误真正</tr><tr><td>generateHtmlControl</td><td>生成HTML元素</td><td>串</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>布局</b></i></td></tr><tr><td>progressRounded</td><td>圆角</td><td>布尔值</td><td>错误真正</tr><tr><td>进度条</td><td>条纹的</td><td>布尔值</td><td>错误真正</tr><tr><td>progressStripedColor</td><td> progressStripedColor</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>颜色</b></i></td></tr><tr><td>colorProgressBackground</td><td>背景颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorProgress</td><td>颜色进度</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorOneCondition</td><td>颜色1进度的条件[&gt;]</td><td>数</td><td></tr><tr><td>colorOne</td><td>颜色1进度</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorTwoCondition</td><td>颜色2进度的条件[&gt;]</td><td>数</td><td></tr><tr><td>colorTwo</td><td>颜色2进度</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>贴标</b></i></td></tr><tr><td>showValueLabel</td><td>显示价值</td><td>布尔值</td><td>错误真正</tr><tr><td>valueLabelStyle</td><td>价值标题样式</td><td>串</td><td>progressPercent | progressValue | progressCustom</tr><tr><td> valueLabelUnit</td><td>单元</td><td>串</td><td></tr><tr><td>valueMaxDecimals</td><td>小数点</td><td>数</td><td></tr><tr><td>valueLabelCustom</td><td>自定义标签</td><td>串</td><td></tr><tr><td>textColor</td><td>分钟文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> textFontSize</td><td>字体大小</td><td>数</td><td></tr><tr><td>textFontFamily</td><td>字形</td><td>串</td><td></tr><tr><td>textAlign</td><td> textAlign</td><td>串</td><td>开始中心|结束</tr></tbody></table></details>

##进度通知
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/progress.gif)

<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/progress_settings.png"></td><td> 自定义标签</td><td>对于自定义标签，可以使用属性<code>[#value]</code>显示数据点的实际值。要显示当前百分比，您可以使用<code>[#percent]</code></td></tr></tbody></table>

##### Progress循环属性
以下属性可用作[表中的控制元素]（＃control-elements）或作为[HTML元素](#html-elements)

<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>类型</td><td>小部件类型</td><td>串</td><td>圆</td></tr><tr><td>调试</td><td>调试模式</td><td>布尔值</td><td>错误真正</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>共同</b></i></td></tr><tr><td>oid</td><td>对象ID</td><td>串</td><td></tr><tr><td>分</td><td>分</td><td>串</td><td></tr><tr><td>最高</td><td>最高</td><td>串</td><td></tr><tr><td>generateHtmlControl</td><td>生成HTML元素</td><td>串</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>布局</b></i></td></tr><tr><td>progressCircularSize</td><td>尺寸</td><td>数</td><td></tr><tr><td>progressCircularWidth</td><td>厚度</td><td>数</td><td></tr><tr><td>progressCircularRotate</td><td>旋转起点</td><td>数</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>颜色</b></i></td></tr><tr><td>colorProgressBackground</td><td>背景颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorProgress</td><td>颜色进度</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> innerColor</td><td>圆圈背景色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorOneCondition</td><td>颜色1进度的条件[&gt;]</td><td>数</td><td></tr><tr><td>colorOne</td><td>颜色1进度</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorTwoCondition</td><td>颜色2进度的条件[&gt;]</td><td>数</td><td></tr><tr><td>colorTwo</td><td>颜色2进度</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>贴标</b></i></td></tr><tr><td>showValueLabel</td><td>显示价值</td><td>布尔值</td><td>错误真正</tr><tr><td>valueLabelStyle</td><td>价值标题样式</td><td>串</td><td>progressPercent | progressValue | progressCustom</tr><tr><td> valueLabelUnit</td><td>单元</td><td>串</td><td></tr><tr><td>valueMaxDecimals</td><td>小数点</td><td>数</td><td></tr><tr><td>valueLabelCustom</td><td>自定义标签</td><td>串</td><td></tr><tr><td>textColor</td><td>分钟文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> textFontSize</td><td>字体大小</td><td>数</td><td></tr><tr><td>textFontFamily</td><td>字形</td><td>串</td><td></tr></tbody></table></details>

##滑块
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/slider.gif)

下表中未列出的设置是不言自明的。

<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/slider.png"></td><td>初始化延迟</td><td>如果在加载运行时后滑块不可见或不可操作，则必须增加该值。输入以毫秒为单位。<br>例如，增加250步，直到滑块起作用。</td></tr></tbody></table>

#####滑块属性
以下属性可用作[表中的控制元素]（＃control-elements）或作为[HTML元素](#html-elements)

<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>调试</td><td>调试模式</td><td>布尔值</td><td>错误真正</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>共同</b></i></td></tr><tr><td>oid</td><td>对象ID</td><td>串</td><td></tr><tr><td>oid工作</td><td>工作对象ID</td><td>串</td><td></tr><tr><td>方向</td><td>方向</td><td>串</td><td>卧式|垂直</tr><tr><td>reverseSlider</td><td>反转滑块</td><td>布尔值</td><td>错误真正</tr><tr><td>旋钮尺寸</td><td>旋钮大小</td><td>串</td><td>旋钮小|旋钮旋钮大</tr><tr><td>只读</td><td>只读</td><td>布尔值</td><td>错误真正</tr><tr><td>分</td><td>分</td><td>串</td><td></tr><tr><td>最高</td><td>最高</td><td>串</td><td></tr><tr><td>步</td><td>脚步</td><td>串</td><td></tr><tr><td>vibrateOnMobilDevices</td><td>在移动装置上振动[s]</td><td>数</td><td></tr><tr><td>generateHtmlControl</td><td>生成HTML元素</td><td>串</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>步骤布局</b></i></td></tr><tr><td>showTicks</td><td>显示步骤</td><td>串</td><td>没有是的总是</tr><tr><td>tickSize</td><td>显示步长</td><td>数</td><td></tr><tr><td>tickLabels</td><td>步骤文本（逗号分隔）</td><td>串</td><td></tr><tr><td>tickTextColor</td><td>步骤的文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> tickFontFamily</td><td>步骤字体</td><td>串</td><td></tr><tr><td>tickFontSize</td><td>字体大小</td><td>数</td><td></tr><tr><td>tickColorBefore</td><td>调节器前的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> tickColorAfter</td><td>调节器后的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>颜色</b></i></td></tr><tr><td>colorBeforeThumb</td><td>调节器前的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorThumb</td><td>调节器的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorAfterThumb</td><td>调节剂后颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>贴标</b></i></td></tr><tr><td>prepandText</td><td>文字预填</td><td>串</td><td></tr><tr><td>prepandTextWidth</td><td> prepandTextWidth</td><td>数</td><td></tr><tr><td>prepandTextColor</td><td>预设的文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> prepandTextFontSize</td><td>文字大小</td><td>数</td><td></tr><tr><td>prepandTextFontFamily</td><td>预设的文字字体</td><td>串</td><td></tr><tr><td>showValueLabel</td><td>显示价值</td><td>布尔值</td><td>错误真正</tr><tr><td>valueLabelStyle</td><td>价值标题样式</td><td>串</td><td>slidePercent | SliderValue</tr><tr><td> valueLabelUnit</td><td>单元</td><td>串</td><td></tr><tr><td>valueFontFamily</td><td> valueFontFamily</td><td>串</td><td></tr><tr><td>valueFontSize</td><td>值字体大小</td><td>数</td><td></tr><tr><td>valueLabelColor</td><td>值的文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> valueLabelMin</td><td>值小于min的文字</td><td>串</td><td></tr><tr><td>valueLabelMax</td><td>值大于min的文字</td><td>串</td><td></tr><tr><td>值小于</td><td>值文字的“小于”条件</td><td>数</td><td></tr><tr><td>textForValueLessThan</td><td>文字“小于”</td><td>串</td><td></tr><tr><td>价值大于</td><td>值文字的“大于”条件</td><td>数</td><td></tr><tr><td>textForValueGreaterThan</td><td>文字“大于”</td><td>串</td><td></tr><tr><td>valueLabelWidth</td><td>距离标签</td><td>数</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>控制器标签的布局</b></i></td></tr><tr><td>showThumbLabel</td><td>显示标签</td><td>串</td><td>没有是的总是</tr><tr><td>thumbSize</td><td>标签尺寸</td><td>数</td><td></tr><tr><td>thumbBackgroundColor</td><td>背景颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> thumbFontColor</td><td>字体颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> thumbFontSize</td><td>字体大小</td><td>数</td><td></tr><tr><td>thumbFontFamily</td><td>字形</td><td>串</td><td></tr><tr><td>useLabelRules</td><td>使用文字规则</td><td>布尔值</td><td>错误真正</tr></tbody></table></details>

##滑轮
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/round_slider.gif)

#####滑子回合属性
以下属性可用作[表中的控制元素]（＃control-elements）或作为[HTML元素](#html-elements)

<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>调试</td><td>调试模式</td><td>布尔值</td><td>错误真正</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>共同</b></i></td></tr><tr><td>oid</td><td>对象ID</td><td>串</td><td></tr><tr><td>oid工作</td><td>工作对象ID</td><td>串</td><td></tr><tr><td>分</td><td>分</td><td>串</td><td></tr><tr><td>最高</td><td>最高</td><td>串</td><td></tr><tr><td>步</td><td>脚步</td><td>串</td><td></tr><tr><td>只读</td><td>只读</td><td>布尔值</td><td>错误真正</tr><tr><td>startAngle</td><td>起始角度</td><td>数</td><td></tr><tr><td>arcLength</td><td>弧长</td><td>数</td><td></tr><tr><td>slideWidth</td><td>滑块厚度</td><td>数</td><td></tr><tr><td>handleSize</td><td>旋钮大小</td><td>数</td><td></tr><tr><td>手柄缩放</td><td>控制旋钮变焦</td><td>数</td><td></tr><tr><td>rtl</td><td>滑块从右向左移动</td><td>布尔值</td><td>错误真正</tr><tr><td>vibrateOnMobilDevices</td><td>在移动装置上振动[s]</td><td>数</td><td></tr><tr><td>generateHtmlControl</td><td>生成HTML元素</td><td>串</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>颜色</b></i></td></tr><tr><td>colorSliderBg</td><td>背景</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorBeforeThumb</td><td>调节器前的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorThumb</td><td>调节器的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorAfterThumb</td><td>调节剂后颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> valueLabelColor</td><td>值的文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>贴标</b></i></td></tr><tr><td>showValueLabel</td><td>显示价值</td><td>布尔值</td><td>错误真正</tr><tr><td>valueLabelVerticalPosition</td><td>文字的垂直位置</td><td>数</td><td></tr><tr><td>valueLabelStyle</td><td>价值标题样式</td><td>串</td><td>slidePercent | SliderValue</tr><tr><td> valueLabelUnit</td><td>单元</td><td>串</td><td></tr><tr><td>valueFontFamily</td><td> valueFontFamily</td><td>串</td><td></tr><tr><td>valueFontSize</td><td>值字体大小</td><td>数</td><td></tr><tr><td>valueLabelMin</td><td>值小于min的文字</td><td>串</td><td></tr><tr><td>valueLabelMax</td><td>值大于min的文字</td><td>串</td><td></tr><tr><td>值小于</td><td>值文字的“小于”条件</td><td>数</td><td></tr><tr><td>textForValueLessThan</td><td>文字“小于”</td><td>串</td><td></tr><tr><td>价值大于</td><td>值文字的“大于”条件</td><td>数</td><td></tr><tr><td>textForValueGreaterThan</td><td>文字“大于”</td><td>串</td><td></tr></tbody></table></details>

##复选框
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/checkbox.gif)

#####复选框属性
以下属性可用作[表中的控制元素]（＃control-elements）或作为[HTML元素](#html-elements)

<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>调试</td><td>调试模式</td><td>布尔值</td><td>错误真正</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>共同</b></i></td></tr><tr><td>oid</td><td>对象ID</td><td>串</td><td></tr><tr><td>只读</td><td>只读</td><td>布尔值</td><td>错误真正</tr><tr><td>toggleType</td><td>切换类型</td><td>串</td><td>布尔|值</tr><tr><td>valueOff</td><td>折价</td><td>串</td><td></tr><tr><td>valueOn</td><td>的价值</td><td>串</td><td></tr><tr><td>stateIfNotTrueValue</td><td>说明值是否等于“ on”条件</td><td>串</td><td>在|关</tr><tr><td>vibrateOnMobilDevices</td><td>在移动装置上振动[s]</td><td>数</td><td></tr><tr><td>generateHtmlControl</td><td>生成HTML元素</td><td>串</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>贴标</b></i></td></tr><tr><td>labelFalse</td><td>标签为假</td><td>串</td><td></tr><tr><td>labelTrue</td><td>标签为真</td><td>串</td><td></tr><tr><td>labelPosition</td><td> labelPosition</td><td>串</td><td>左|对|关</tr><tr><td>labelClickActive</td><td>激活标签点击</td><td>布尔值</td><td>错误真正</tr><tr><td>valueFontFamily</td><td> valueFontFamily</td><td>串</td><td></tr><tr><td>valueFontSize</td><td>值字体大小</td><td>数</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>颜色</b></i></td></tr><tr><td>colorCheckBox</td><td>复选框颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorCheckBoxBorder</td><td>边框颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorCheckBoxHover</td><td>悬停复选框的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> labelColorFalse</td><td>标签颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> labelColorTrue</td><td>活动标签颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>锁定</b></i></td></tr><tr><td>lockEnabled</td><td>启用锁定</td><td>布尔值</td><td>错误真正</tr><tr><td>autoLockAfter</td><td> [s]之后自动锁定</td><td>数</td><td></tr><tr><td>lockIcon</td><td>图标</td><td>串</td><td></tr><tr><td>lockIconTop</td><td>距顶部的符号距离[％]</td><td>数</td><td></tr><tr><td>lockIconLeft</td><td>距左的符号距离[％]</td><td>数</td><td></tr><tr><td>lockIconSize</td><td>图标大小</td><td>数</td><td></tr><tr><td>lockIconColor</td><td>图标颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> lockFilterGrayscale</td><td>灰色滤镜（如果锁定）</td><td>数</td><td></tr></tbody></table></details>

##开关
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/switch.gif)

#####开关属性
以下属性可用作[表中的控制元素]（＃control-elements）或作为[HTML元素](#html-elements)

<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>调试</td><td>调试模式</td><td>布尔值</td><td>错误真正</td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>共同</b></i></td></tr><tr><td>oid</td><td>对象ID</td><td>串</td><td></tr><tr><td>只读</td><td>只读</td><td>布尔值</td><td>错误真正</tr><tr><td>toggleType</td><td>切换类型</td><td>串</td><td>布尔|值</tr><tr><td>valueOff</td><td>折价</td><td>串</td><td></tr><tr><td>valueOn</td><td>的价值</td><td>串</td><td></tr><tr><td>stateIfNotTrueValue</td><td>说明值是否等于“ on”条件</td><td>串</td><td>在|关</tr><tr><td>vibrateOnMobilDevices</td><td>在移动装置上振动[s]</td><td>数</td><td></tr><tr><td>generateHtmlControl</td><td>生成HTML元素</td><td>串</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>贴标</b></i></td></tr><tr><td>labelFalse</td><td>标签为假</td><td>串</td><td></tr><tr><td>labelTrue</td><td>标签为真</td><td>串</td><td></tr><tr><td>labelPosition</td><td> labelPosition</td><td>串</td><td>左|对|关</tr><tr><td>labelClickActive</td><td>激活标签点击</td><td>布尔值</td><td>错误真正</tr><tr><td>valueFontFamily</td><td> valueFontFamily</td><td>串</td><td></tr><tr><td>valueFontSize</td><td>值字体大小</td><td>数</td><td></tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>颜色</b></i></td></tr><tr><td>colorSwitchThumb</td><td>开关的拇指颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorSwitchTrack</td><td>跟踪开关的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorSwitchTrue</td><td>活动开关颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorSwitchHover</td><td>悬停开关颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> colorSwitchHoverTrue</td><td>选择的活动开关颜色/悬停</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> labelColorFalse</td><td>标签颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> labelColorTrue</td><td>活动标签颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td colspan="4" style="background: #44739e; color: white; border-color: #44739e;"><i><b>锁定</b></i></td></tr><tr><td>lockEnabled</td><td>启用锁定</td><td>布尔值</td><td>错误真正</tr><tr><td>autoLockAfter</td><td> [s]之后自动锁定</td><td>数</td><td></tr><tr><td>lockIcon</td><td>图标</td><td>串</td><td></tr><tr><td>lockIconTop</td><td>距顶部的符号距离[％]</td><td>数</td><td></tr><tr><td>lockIconLeft</td><td>距左的符号距离[％]</td><td>数</td><td></tr><tr><td>lockIconSize</td><td>图标大小</td><td>数</td><td></tr><tr><td>lockIconColor</td><td>图标颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</tr><tr><td> lockFilterGrayscale</td><td>灰色滤镜（如果锁定）</td><td>数</td><td></tr></tbody></table></details>

##输入
###文字输入
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/input.gif)

去做

＃＃＃ 选择
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/select.gif)

下表中未列出的设置是不言自明的。

<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/select_autocomplete_settings.png"></td><td>菜单数据的方法</td><td>有三种方法可以定义菜单数据。首先是通过编辑器定义它。其次是通过json字符串定义它。第三种方法是通过三个值，标签和图标列表来定义它</td></tr><tr><td>编辑器：菜单项计数</td><td>菜单数据的方法：通过编辑器<br>定义菜单项的数量。各个菜单项可以在菜单项[x]下定义</td></tr><tr><td>JSON字符串</td><td>菜单数据的方法：json字符串<br>在这里，您可以添加JSON字符串以定义菜单项，或使用绑定到包含JSON字符串的数据点。<br><br> JSON字符串必须具有以下格式：<br><pre><code> [ { &quot;text&quot;: &quot;text 0&quot;, &quot;subText&quot;: &quot;sub 0&quot;, &quot;value&quot;: &quot;val0&quot;, &quot;icon&quot;: &quot;account-cancel&quot; }, { &quot;text&quot;: &quot;text 1&quot;, &quot;subText&quot;: &quot;sub 1&quot;, &quot;value&quot;: &quot;val1&quot;, &quot;icon&quot;: &quot;/vis/icon/info.png&quot;, &quot;iconColor&quot;: &quot;red&quot;, &quot;iconColorSelectedTextField&quot;: &quot;red&quot; }, { &quot;text&quot;: &quot;text 2&quot;, &quot;subText&quot;: &quot;sub 2&quot;, &quot;value&quot;: &quot;val2&quot;, &quot;icon&quot;: &quot;facebook-workplace&quot;, &quot;iconColor&quot;: &quot;green&quot; } ]</code></pre></td></tr><tr><td>值表</td><td>菜单数据的方法：值列表<br>通过添加将设置到数据点的值来定义菜单条目的数量。条目必须以分号分隔</td></tr><tr><td>值清单：标签</td><td>菜单数据的方法：值列表<br>定义值的相关标签。条目必须以分号分隔</td></tr><tr><td>值清单：标签</td><td>菜单数据的方法：值列表<br>定义值的相关图标。条目必须以分号分隔。您可以使用图像路径或“材料设计图标”名称</td></tr></tbody></table>

###自动完成
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/autocomplete.gif)

下表中未列出的设置是不言自明的。

<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/select_autocomplete_settings.png"></td><td>菜单数据的方法</td><td>有三种方法可以定义菜单数据。首先是通过编辑器定义它。其次是通过json字符串定义它。第三种方法是通过三个值，标签和图标列表来定义它</td></tr><tr><td>编辑器：菜单项计数</td><td>菜单数据的方法：通过编辑器<br>定义菜单项的数量。各个菜单项可以在菜单项[x]下定义</td></tr><tr><td>JSON字符串</td><td>菜单数据的方法：json字符串<br>在这里，您可以添加JSON字符串以定义菜单项，或使用绑定到包含JSON字符串的数据点。<br><br> JSON字符串必须具有以下格式：<br><pre><code> [ { &quot;text&quot;: &quot;text 0&quot;, &quot;subText&quot;: &quot;sub 0&quot;, &quot;value&quot;: &quot;val0&quot;, &quot;icon&quot;: &quot;account-cancel&quot; }, { &quot;text&quot;: &quot;text 1&quot;, &quot;subText&quot;: &quot;sub 1&quot;, &quot;value&quot;: &quot;val1&quot;, &quot;icon&quot;: &quot;/vis/icon/info.png&quot;, &quot;iconColor&quot;: &quot;red&quot; }, { &quot;text&quot;: &quot;text 2&quot;, &quot;subText&quot;: &quot;sub 2&quot;, &quot;value&quot;: &quot;val2&quot;, &quot;icon&quot;: &quot;facebook-workplace&quot;, &quot;iconColor&quot;: &quot;green&quot; } ]</code></pre></td></tr><tr><td>值表</td><td>菜单数据的方法：值列表<br>通过添加将设置到数据点的值来定义菜单条目的数量。条目必须以分号分隔</td></tr><tr><td>值清单：标签</td><td>菜单数据的方法：值列表<br>定义值的相关标签。条目必须以分号分隔</td></tr><tr><td>值清单：标签</td><td>菜单数据的方法：值列表<br>定义值的相关图标。条目必须以分号分隔。您可以使用图像路径或“材料设计图标”名称</td></tr></tbody></table>

##顶部应用栏
带有导航抽屉的顶部应用栏可以与<a href="https://www.iobroker.net/#en/documentation/viz/basic.md">小部件8中</a>的<a href="https://www.iobroker.net/#en/documentation/viz/basic.md">视图</a>结合使用。

<b>看一下[Material Design Widgets示例项目](https://github.com/Scrounger/ioBroker.vis-materialdesign#online-example-project)</b>以了解其工作原理。

#####布局模式：
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/topappbar_modal.gif)

#####永久布局：
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/topappbar_permanent.gif)

<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=3><img src="doc/en/media/topappbar_settings.png"></td><td> 对象ID</td><td>必须从典型编号设置为数据点。例如<a href="https://www.iobroker.net/#en/documentation/viz/basic.md">，小部件8中</a>的<a href="https://www.iobroker.net/#en/documentation/viz/basic.md">视图</a>可以使用此数据点</td></tr><tr><td>显示导航项的索引</td><td>在项目标签之前显示导航索引。此数字可<a href="https://www.iobroker.net/#en/documentation/viz/basic.md">在小部件8的视图中</a>使用，以定义在选择该项目时应显示的视图</td></tr><tr><td>导航项目数</td><td>定义导航项的数量</td></tr></tbody></table>

###子菜单
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/drawer_subMenu.png)

子菜单必须由JSON字符串定义：

#### JSON属性
<table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>文本</td><td>输入文字</td><td>串</td><td></td></tr><tr><td>图标</td><td>图标或图像的输入路径</td><td>串</td><td></td></tr><tr><td>iconColor</td><td>图标颜色（如果使用图像则无法使用）</td><td>颜色</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td>分频器</td><td>显示分隔线</td><td>布尔值</td><td>假，真</td></tr><tr><td>userGroups</td><td>允许查看和控制此条目的用户组。</td><td>数组[字符串]</td><td>用户组ID</td></tr><tr><td> behaviorNotInUserGroup</td><td>如果用户不属于用户组，则隐藏或禁用条目</td><td>串</td><td>隐藏，禁用</td></tr></tbody></table>

<！-在目录中省略->

####示例
<details> <pre><code> [ { "text": "subitem0", "icon": "account", "iconColor": "red" }, { "text": "subitem1", "icon": "home", "iconColor": "green", "divider": "true" }, { "text": "subitem1", "divider": "true", "icon": "/vis.0/myImages/devices/lxc_iobroker.png", "userGroups": ["administrator", "user"], "behaviorNotInUserGroup": "disabled" } ] </code></pre> </details>

##图表
###条形图
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/barChart.png)

####编辑器设置
下表中未列出的设置是不言自明的。

<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=3><img src="doc/en/media/barchart_settings_common.png"></td><td>设置数据集</td><td>可以通过编辑器输入BarChart的数据，也可以使用JSON字符串</td></tr><tr><td>项目数</td><td>使用vis编辑器获取列表数据的条数</td></tr><tr><td>对象编号</td><td>包含json字符串的数据点的对象ID。允许的属性如下所述</td></tr><tr><td rowspan=><img src="doc/en/media/barchart_settings_dataset.png"></td><td>对象ID [x]</td><td>使用vis编辑器的单个条的对象ID</td></tr></tbody></table>

#### JSON属性
JSON字符串必须是具有以下属性的对象数组：

<table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>标签</td><td>条轴标签</td><td>串</td><td/></tr><tr><td>值</td><td>条值</td><td>数</td><td/></tr><tr><td>dataColor</td><td>条形颜色</td><td>串</td><td/></tr><tr><td>valueText</td><td>覆盖栏文字</td><td>串</td><td/></tr><tr><td>valueColor</td><td>值文字的颜色</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td><td/></tr><tr><td>价值附录</td><td>有价文字附录</td><td>串</td><td/></tr><tr><td>工具提示标题</td><td>工具提示标题</td><td>串</td><td/></tr><tr><td>工具提示文字</td><td>工具提示文字</td><td>串</td><td/></tr></tbody></table>

<！-在目录中省略->

####示例
<details> <pre><code> [ { "label": "val0", "value": "30", "valueColor": "#ffffff" }, { "label": "val1", "value": "12.54645646", "tooltipTitle": "myTitle" }, { "label": "val2", "value": "48", "dataColor": "#c2c2c2", "valueAppendix": "\n extra" }, { "label": "val3", "value": "97", "valueColor": "#ffffff" }, { "label": "val4", "value": "32", "valueText": "text" } ] </pre></code> </details>

＃＃＃ 饼形图
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/pieChart.png)

####编辑器设置
下表中未列出的设置是不言自明的。

<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=3><img src="doc/en/media/piechart_settings_common.png"></td><td>设置数据集</td><td>可以通过编辑器输入PieChart的数据，也可以使用JSON字符串</td></tr><tr><td>项目数</td><td>使用vis编辑器获取列表数据的饼数</td></tr><tr><td>对象编号</td><td>包含json字符串的数据点的对象ID。允许的属性如下所述</td></tr><tr><td rowspan=><img src="doc/en/media/barchart_settings_dataset.png"></td><td>对象ID [x]</td><td>使用vis编辑器的单个饼图的对象ID</td></tr></tbody></table>

#### JSON属性
JSON字符串必须是具有以下属性的对象数组：

###线路历史记录图表：
>必需的适配器：[SQL]（https://github.com/ioBroker/ioBroker.sql），[历史记录]（https://github.com/ioBroker/ioBroker.history）或[InfluxDb](https://github.com/ioBroker/ioBroker.influxdb)！

![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/line_history_chart.gif)

####编辑器设置
下表中未列出的设置是不言自明的。

<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=5><img src="doc/en/media/line_hostory_chart_general.png"></td><td>适配器实例</td><td>SQL或历史记录适配器的实例</td></tr><tr><td>使用对象控制时间间隔</td><td>数据点的ID，以更改图表的时间间隔。<br><br>如果数据点来自“字符串”类型，则它必须包含<a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/235530e4e54346b5527333ca06ce596519954c67/widgets/materialdesign/js/materialdesign.chart.js#L802">链接值之一</a><br>如果数据点来自“数字”类型，则它必须包含图形的开始时间戳。<br><br>例如，您可以在此处使用按钮在运行时更改图表的显示</td></tr><tr><td>用于更新的布尔对象</td><td>adatapoint的ID，以触发图表的手动刷新。<br>例如，您可以在此处使用按钮在运行时刷新图表</td></tr><tr><td>图表超时</td><td>加载图表数据超时。如果收到超时错误消息，请增加此值</td></tr><tr><td>调试模式</td><td>如果您有问题或错误，请激活调试模式，并将控制台日志（F12）数据附加到问题上</td></tr><tr><td rowspan=5><img src="doc/en/media/line_hostory_chart_dataset.png"></td><td>对象ID [x]</td><td>具有激活的历史记录实例的数据点的ID</td></tr><tr><td>显示方法[x]</td><td><a href="https://www.iobroker.net/docu/index-195.htm?page_id=198&lang=en#Aggregation">汇总方法</a></td></tr><tr><td>最高要显示的数据点数[x]</td><td>要显示的最大数据点数</td></tr><tr><td>数据点之间的时间间隔[s] [x]</td><td>可选设置，将覆盖“计数”设置。<br>各个数据点之间的距离，以秒为单位。<br>例如，如果要每分钟显示一次数据点，则必须在此处输入60</td></tr><tr><td>数据乘以[x]</td><td>可选设置，将每个数据点乘以给定值</td></tr><tr><td><img src="doc/en/media/line_hostory_chart_xAxis_layout.png"></td><td>x轴的时间格式</td><td>更改X轴的时间格式。必须为所有时间单位输入时间格式， <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">允许以下时间单位。</a><br>必须根据moment.js库输入批准的时间格式，<a href="https://momentjs.com/docs/#/displaying/">请参阅链接</a></td></tr><tr><td><img src="doc/en/media/line_hostory_chart_tooltip_layout.png"></td><td>工具提示时间格式</td><td>更改工具提示的时间格式。必须为所有时间单位输入时间格式， <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">允许以下时间单位。</a><br>必须根据moment.js库输入批准的时间格式，<a href="https://momentjs.com/docs/#/displaying/">请参阅链接</a></td></tr></tbody></table>

### JSON图表
使用JSON图表，您可以最大程度地通过脚本创建混合图表（折线图，条形图和堆积条形图）。

![徽标]（doc / en / media / jsonChart.png）！[徽标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/jsonChart2.png)

#### JSON属性
<！-在目录中省略->

＃＃＃＃＃ 一般
<table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>axisLabels</td><td>图的轴标签</td><td>数组</td><td>数字或字符串</td></tr><tr><td>图表</td><td>图形数据</td><td>数组&lt;<a href="#graph">图</a>&gt;</td><td>见图表</td></tr></tbody></table>

<！-在目录中省略->

#####图
<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>数据</td><td>图形数据或带有时间戳的数据</td><td>数组[数字] | Array [<a href="#data-with-time-axis">带有时间戳的值</a>]</td><td>数</td></tr><tr><td>类型</td><td>图的类型</td><td>串</td><td>“线”，“栏”</td></tr><tr><td> legendText</td><td>传说文字</td><td>串</td><td></td></tr><tr><td>显示顺序</td><td>图的叠加顺序</td><td>数</td><td>一二三</td></tr><tr><td>颜色</td><td>图的颜色</td><td>颜色</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> use_gradient_color</td><td>使用渐变色</td><td>布尔值</td><td>假，真</td></tr><tr><td>渐变色</td><td>渐变颜色阵列</td><td>数组[ <a href="#gradientcolor">gradientColor</a> ]</td><td> [{值：-20，颜色：&#39;＃7d3c98&#39;}，{值：0，颜色：&#39;＃2874a6&#39;}]</td></tr><tr><td> tooltip_title</td><td>工具提示的标题</td><td>串</td><td></td></tr><tr><td>tooltip_text</td><td>工具提示的ovveride文字</td><td>串</td><td></td></tr><tr><td>tooltip_MinDigits</td><td>工具提示值的最大小数</td><td>数</td><td>0、1、2，...</td></tr><tr><td> tooltip_MaxDigits</td><td>工具提示值的最大小数</td><td>数</td><td>0、1、2，...</td></tr><tr><td> tooltip_AppendText</td><td>将文字附加到工具提示值</td><td>串</td><td></td></tr><tr><td>datalabel_show</td><td>显示图表的数据标签</td><td>字符串布尔值</td><td>错误，正确，自动</td></tr><tr><td>datalabel_anchor</td><td>数据标签的锚点</td><td>串</td><td>中心，开始，结束</td></tr><tr><td>datalabel_align</td><td>数据标签相对于锚点的位置</td><td>串</td><td>左，开始，居中，结束，右，上，下</td></tr><tr><td>datalabel_offset</td><td>距离（以像素为单位）将数据标签拉离锚点</td><td>数</td><td>0、1、2，...</td></tr><tr><td> datalabel_text_align</td><td>数据标签的文字匹配</td><td>串</td><td>左，开始，居中，结束，右</td></tr><tr><td>datalabel_rotation</td><td>数据标签的顺时针旋转角度（以度为单位）</td><td>数</td><td>0、1、2，...</td></tr><tr><td> datalabel_steps</td><td>每x步显示数据标签</td><td>数</td><td>0、1、2，...</td></tr><tr><td> datalabel_minDigits</td><td>数据标签的最小小数</td><td>数</td><td>0、1、2，...</td></tr><tr><td> datalabel_maxDigits</td><td>数据标签的最大小数</td><td>数</td><td>0、1、2，...</td></tr><tr><td> datalabel_append</td><td>将文字附加到数据标签</td><td>串</td><td></td></tr><tr><td>datalabel_color</td><td>数据标签颜色</td><td>颜色|数组[颜色]</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> datalabel_fontFamily</td><td>数据标签字体系列</td><td>串</td><td></td></tr><tr><td>datalabel_fontSize</td><td>数据标签字体大小</td><td>数</td><td>1，2，5，...</td></tr><tr><td> datalabel_backgroundColor</td><td>数据标签背景色</td><td>颜色|数组[颜色]</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> datalabel_borderColor</td><td>数据标签边框颜色</td><td>颜色|数组[颜色]</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> datalabel_borderWidth</td><td>数据标签边框宽度</td><td>数</td><td>1，2，5，...</td></tr><tr><td> datalabel_borderRadius</td><td>数据标签边框半径</td><td>数</td><td>1，2，5，...</td></tr></tbody></table></details>

<！-在目录中省略->

#####图形折线图spfeicifc
<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>line_pointStyle</td><td>线的点样式</td><td>串</td><td>圆，十字，crossRot，破折号，直线，矩形，rectRounded，rectRot，星形，三角形</td></tr><tr><td>line_pointSize</td><td>线的点大小</td><td>数</td><td>1，2，3，...</td></tr><tr><td> line_pointSizeHover</td><td>线的点大小</td><td>数</td><td>1，2，3，...</td></tr><tr><td> line_PointColor</td><td>线点颜色</td><td>颜色|数组[颜色]</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> line_PointColorBorder</td><td>线点的边框颜色</td><td>颜色|数组[颜色]</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> line_PointColorHover</td><td>悬停线点颜色</td><td>颜色|数组[颜色]</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> line_PointColorBorderHover</td><td>线点的边框悬停颜色</td><td>颜色|数组[颜色]</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> line_spanGaps</td><td>如果数据之间存在差距，则画线</td><td>布尔值</td><td>假，真</td></tr><tr><td>line_steppedLine</td><td>启用阶梯线</td><td>布尔值</td><td>假，真</td></tr><tr><td>line_Tension</td><td>线的平滑度</td><td>数</td><td>0-1</td></tr><tr><td>线的粗细</td><td>线的厚度</td><td>数</td><td>1，2，5，...</td></tr><tr><td> line_UseFillColor</td><td>在线条下使用填充颜色</td><td>布尔值</td><td>假，真</td></tr><tr><td>line_FillColor</td><td>在线下填充颜色</td><td>颜色</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> use_line_gradient_fill_color</td><td>使用渐变填充颜色</td><td>布尔值</td><td>假，真</td></tr><tr><td>line_gradient_fill_color</td><td>渐变颜色阵列</td><td>数组[ <a href="#gradientcolor">gradientColor</a> ]</td><td> [{值：-20，颜色：&#39;＃7d3c98&#39;}，{值：0，颜色：&#39;＃2874a6&#39;}]</td></tr><tr><td> line_FillBetweenLines</td><td>为下一行/上一行填充颜色</td><td>串</td><td>&#39;+1&#39;，&#39;-1&#39;，&#39;+ 2&#39;，...</td></tr></tbody></table></details>

<！-在目录中省略->

#####图形条形图spfeicifc
<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>bar已堆叠</td><td>堆积的酒吧。如果您有组合图表（折线+堆积条形图），则还必须为折线数据集设置该值！</td><td>布尔值</td><td>假，真</td></tr><tr><td>barStackId</td><td>堆栈ID。应该组合到堆栈的栏必须具有相同的ID</td><td>数</td><td>1，2，5，...</td></tr><tr><td> barColorHover</td><td>悬停颜色栏</td><td>颜色|数组[颜色]</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> barBorderColor</td><td>条的边框颜色</td><td>颜色|数组[颜色]</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> barBorderWidth</td><td>条形边框的厚度</td><td>数</td><td>1，2，5，...</td></tr><tr><td> barBorderColorHover</td><td>条形的边框悬停颜色</td><td>颜色|数组[颜色]</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> barBorderWidthHover</td><td>将鼠标悬停在边框上</td><td>数</td><td>1，2，5，...</td></tr></tbody></table></details>

<！-在目录中省略->

#####图形y轴
<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>yAxis_id</td><td> y轴的ID。如果您想将通用的y轴用于多图图形数据，请使用相同的ID。</td><td>数</td><td>1，2，5，...</td></tr><tr><td> yAxis_position</td><td> y轴位置</td><td>串</td><td>左右</td></tr><tr><td>yAxis_show</td><td>显示y轴</td><td>布尔值</td><td>假，真</td></tr><tr><td>yAxis_title_text</td><td> y轴标题</td><td>串</td><td></td></tr><tr><td>yAxis_title_color</td><td>覆盖y轴标题颜色</td><td>颜色</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> yAxis_title_font家庭</td><td>覆盖y轴标题字体系列</td><td>串</td><td></td></tr><tr><td>yAxis_title_fontSize</td><td>覆盖y轴标题字体大小</td><td>数</td><td>1，2，5，...</td></tr><tr><td> yAxis_min</td><td> y轴的最小值</td><td>数</td><td>1，2，5，...</td></tr><tr><td> yAxis_max</td><td> y轴最大值</td><td>数</td><td>1，2，5，...</td></tr><tr><td> yAxis_step</td><td> y轴步长</td><td>数</td><td>1，2，5，...</td></tr><tr><td> yAxis_minimumDigits</td><td> y轴最小小数位数</td><td>数</td><td>1，2，5，...</td></tr><tr><td> yAxis_maximumDigits</td><td> y轴最大小数位数</td><td>数</td><td>1，2，5，...</td></tr><tr><td> yAxis_maxSteps</td><td> y轴的最大步幅</td><td>数</td><td>1，2，5，...</td></tr><tr><td> yAxis_distance</td><td>覆盖y轴值到轴的距离</td><td>数</td><td>1，2，5，...</td></tr><tr><td> yAxis_appendix</td><td>将文字附加到y轴值</td><td>串</td><td></td></tr><tr><td>yAxis_color</td><td>覆盖y轴值颜色</td><td>颜色</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> yAxis_fontFamily</td><td>覆盖y轴值字体系列</td><td>串</td><td></td></tr><tr><td>yAxis_fontSize</td><td>覆盖y轴值字体大小</td><td>数</td><td>1，2，5，...</td></tr><tr><td> yAxis_zeroLineWidth</td><td> y轴零线宽度</td><td>数</td><td>0.3、1.5、4 ...</td></tr><tr><td> yAxis_zeroLineColor</td><td> y轴零线颜色</td><td>颜色</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> yAxis_gridLines_show</td><td>显示y轴网格线</td><td>布尔值</td><td>假，真</td></tr><tr><td>yAxis_gridLines_color</td><td> y轴网格线的颜色</td><td>颜色</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> yAxis_gridLines_lineWidth</td><td>网格线的宽度</td><td>数</td><td>0-1</td></tr><tr><td> yAxis_gridLines_border_show</td><td>显示y轴网格线的边界</td><td>布尔值</td><td>假，真</td></tr><tr><td>yAxis_gridLines_ticks_show</td><td>显示y轴网格间隔刻度</td><td>布尔值</td><td>假，真</td></tr><tr><td>yAxis_gridLines_ticks_length</td><td> y轴网格刻度的长度</td><td>数</td><td>1，2，5，...</td></tr></tbody></table></details>

<！-在目录中省略->

##### GradientColor
<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>值</td><td>应当在其中应用颜色的值</td><td>数</td><td>1，2，5，...</td></tr><tr><td>颜色</td><td>物有所值</td><td>颜色</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr></tbody></table></details>

<！-在目录中省略->

具有时间轴的#####图表JSON图表支持具有时间戳的数据。若要使用此数据数组必须具有时间戳记值（x轴值）和值（y轴值）。
######带有时间戳的值
<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>Ť</td><td>时间戳-xAxis值</td><td>数</td><td>1，2，5，...</td></tr><tr><td> ÿ</td><td>时间戳的值-yAxis值</td><td>数</td><td>1，2，5，...</td></tr></tbody></table></details>

###### X轴设置带有时间戳的数据
<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>xAxis_bounds</td><td>规模边界策略<br><br>&#39;数据&#39;：确保数据完全可见，外部标签被去除<br>&#39;打勾&#39;：确保打勾完全可见，外部数据被截断</td><td>串</td><td>数据，刻度</td></tr><tr><td>xAxis_timeFormats</td><td> x轴的时间格式</td><td>目的</td><td>必须为所有时间单位输入时间格式， <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">允许以下时间单位。</a><br>必须根据moment.js库输入批准的时间格式，<a href="https://momentjs.com/docs/#/displaying/">请参阅链接</a></td></tr><tr><td>xAxis_tooltip_timeFormats</td><td> x轴的时间格式</td><td>串</td><td>必须根据moment.js库输入批准的时间格式，<a href="https://momentjs.com/docs/#/displaying/">请参阅链接</a></td></tr><tr><td>xAxis_time_unit</td><td>强制x轴的时间格式</td><td>串</td><td>允许以下单位，<a href="https://www.chartjs.org/docs/latest/axes/cartesian/time.html#time-units">请参阅链接</a></td></tr></tbody></table></details>

<！-在目录中省略->

####示例
<details> <pre><code> { "axisLabels": ["1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "11h", "12h", "13h", "14h", "17h", "18h", "19h", "20h", "21h", "22h", "23h", "24h"], "graphs": [ { "data": [19, 19, 18, 19, 19, 20, 20, 21, 22, 24, 24, 24, 23, 22, 23, 23, 24, 23, 23, 22, 22, 21, 20, 20], "type": "line", "color": "gray", "legendText": "Temperatur", "line_pointSizeHover": 5, "line_pointSize": 0, "line_Tension": 0.3, "yAxis_show": false, "yAxis_gridLines_show": false, "yAxis_gridLines_ticks_length": 5, "yAxis_min": 0, "yAxis_max": 30, "yAxis_step": 5, "yAxis_position": "left", "yAxis_appendix": " °C", "yAxis_zeroLineWidth": 0.1, "yAxis_zeroLineColor": "black", "displayOrder": 0, "tooltip_AppendText": " °C", "datalabel_backgroundColor": ["#2b9a44", "#2b9a44", "#3aa35b", "#2b9a44", "#2b9a44", "#1d922e", "#1d922e", "#0e8917", "#008000", "#668f00", "#668f00", "#668f00", "#338700", "#008000", "#338700", "#338700", "#668f00", "#338700", "#338700", "#008000", "#008000", "#0e8917", "#1d922e", "#1d922e"], "datalabel_color": "white", "datalabel_offset": -10, "datalabel_fontFamily": "RobotoCondensed-Light", "datalabel_fontSize": 12, "datalabel_borderRadius": 6, "datalabel_show": "auto", "line_PointColor": ["#2b9a44", "#2b9a44", "#3aa35b", "#2b9a44", "#2b9a44", "#1d922e", "#1d922e", "#0e8917", "#008000", "#668f00", "#668f00", "#668f00", "#338700", "#008000", "#338700", "#338700", "#668f00", "#338700", "#338700", "#008000", "#008000", "#0e8917", "#1d922e", "#1d922e"], "line_PointColorBorder": ["#2b9a44", "#2b9a44", "#3aa35b", "#2b9a44", "#2b9a44", "#1d922e", "#1d922e", "#0e8917", "#008000", "#668f00", "#668f00", "#668f00", "#338700", "#008000", "#338700", "#338700", "#668f00", "#338700", "#338700", "#008000", "#008000", "#0e8917", "#1d922e", "#1d922e"], "line_PointColorHover": ["#2b9a44", "#2b9a44", "#3aa35b", "#2b9a44", "#2b9a44", "#1d922e", "#1d922e", "#0e8917", "#008000", "#668f00", "#668f00", "#668f00", "#338700", "#008000", "#338700", "#338700", "#668f00", "#338700", "#338700", "#008000", "#008000", "#0e8917", "#1d922e", "#1d922e"], "line_PointColorBorderHover": ["#2b9a44", "#2b9a44", "#3aa35b", "#2b9a44", "#2b9a44", "#1d922e", "#1d922e", "#0e8917", "#008000", "#668f00", "#668f00", "#668f00", "#338700", "#008000", "#338700", "#338700", "#668f00", "#338700", "#338700", "#008000", "#008000", "#0e8917", "#1d922e", "#1d922e"], "use_gradient_color": true, "gradient_color": [{ "value": -20, "color": "#5b2c6f66" }, { "value": 0, "color": "#2874a666" }, { "value": 14, "color": "#73c6b666" }, { "value": 22, "color": "#00800066" }, { "value": 27, "color": "#ffa50066" }, { "value": 35, "color": "#ff000066" } ], "use_line_gradient_fill_color": true, "line_gradient_fill_color": [{ "value": -20, "color": "#5b2c6f66" }, { "value": 0, "color": "#2874a666" }, { "value": 14, "color": "#73c6b666" }, { "value": 22, "color": "#00800066" }, { "value": 27, "color": "#ffa50066" }, { "value": 35, "color": "#ff000066" } ] }, { "data": [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 19, 33, 36, 23, 14, 16, 34, 46, 40, 24, 22], "type": "line", "color": "#0d47a1", "legendText": "Regenwahrscheinlichkeit", "line_UseFillColor": true, "line_pointSize": 0, "line_pointSizeHover": 5, "yAxis_min": 0, "yAxis_max": 100, "yAxis_maxSteps": 10, "yAxis_position": "left", "yAxis_gridLines_show": false, "yAxis_gridLines_border_show": false, "yAxis_zeroLineWidth": 0.1, "yAxis_zeroLineColor": "black", "yAxis_appendix": " %", "displayOrder": 1, "tooltip_AppendText": " %", "datalabel_show": false }, { "data": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1.3", "2.5", 0, 1.9, 1.17, 0, 0, 0, 0.18, 0.7, 0.2, 0, 0], "type": "bar", "color": "#6dd600", "legendText": "Niederschlag", "yAxis_min": 0, "yAxis_max": 5, "yAxis_maxSteps": 10, "yAxis_position": "right", "yAxis_gridLines_show": false, "yAxis_appendix": " mm", "yAxis_gridLines_border_show": false, "yAxis_zeroLineWidth": 0.1, "yAxis_zeroLineColor": "black", "displayOrder": 1, "tooltip_AppendText": " mm", "datalabel_show": false } ] }

</ pre> </ code> </ details>

##表
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/table.gif)

＃＃＃ 输入数据
输入数据必须是对象的json数组，例如：

```
[
	{
		"img": "/vis.0/myImages/erlebnis_50.png",
		"name": "Empire",
		"betriebszeit": "4h 06m",
		"funk": "5G",
		"ip": "10.0.0.1"
	},
	{
		"img": "/vis.0/myImages/erlebnis_100.png",
		"name": "Handy",
		"betriebszeit": "13m",
		"funk": "5G",
		"ip": "10.0.0.2"
	},
	{
		"img": "/vis.0/myImages/erlebnis_100.png",
		"name": "Harmony Hub - Wohnzimmer",
		"betriebszeit": "18T 07h 21m",
		"funk": "2G",
		"ip": "10.0.0.3"
	}
]
```

####控制元素
要在表的单元格中生成控件元素（按钮，复选框等），您必须创建一个对象而不是字符串。

![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/table_control_example.gif)

```
[
	{
		"control": {
			"type": "buttonToggle",
			"oid": "0_userdata.0.MDW.Buttons.bool",
			"buttonText": "&nbsp;off",
			"buttonTextTrue": "&nbsp;on",
			"image": "home",
			"imagePosition": "left",
			"colorBgTrue": "green",
			"lockEnabled": "true"
		},
		"img": "/vis.0/myImages/erlebnis_50.png",
		"name": "Empire",
		"betriebszeit": "4h 06m",
		"funk": "5G"
	}, {
		"img": "/vis.0/myImages/erlebnis_100.png",
		"control": {
			"type": "buttonToggle",
			"oid": "0_userdata.0.MDW.Buttons.bool",
			"buttonText": "off",
			"buttonTextTrue": "on",
			"image": "home",
			"colorBgTrue": "green"
		},
		"name": "Handy",
		"betriebszeit": "13m",
		"funk": "5G",
		"ip": "10.0.0.2"
	}, {
		"img": "/vis.0/myImages/erlebnis_100.png",
		"name": "Harmony Hub - Wohnzimmer",
		"betriebszeit": "18T 07h 21m",
		"funk": "2G",
		"ip": "10.0.0.3"
	}
]
```

#####由编辑器生成
您可以使用编辑器轻松生成控件。只需创建一个受支持的窗口小部件，在编辑器上对其进行配置，然后通过复制并将其粘贴到表wigdet中来导出设置。
看看下面的动画截图：

![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/table_controls.gif)

＃＃＃＃＃ 一般
<table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>物产</th></tr></thead><tbody><tr><td>类型</td><td>控制元件类型</td><td>串</td><td><b>纽扣</b><ul><li><a href="#button-link-properties">按钮链接</a></li><li><a href="#button-state-properties">按钮状态</a></li><li><a href="#button-toggle-properties">按钮切换</a></li></ul><b>垂直按钮</b><ul><li><a href="#button-vertical-link-properties">按钮图标链接</a></li><li><a href="#button-vertical-state-properties">按钮图标状态</a></li><li><a href="#button-vertical-toggle-properties">按钮图标切换</a></li></ul><b>按钮图标</b><ul><li><a href="#button-icon-link-properties">按钮图标链接</a></li><li><a href="#button-icon-state-properties">按钮图标状态</a></li><li><a href="#button-icon-toggle-properties">按钮图标切换</a></li></ul><ul><li><a href="#progress-1">进展</a></li><li><a href="#progress-circular">progress_circular</a></li><li><a href="#slider-1">滑杆</a></li><li><a href="#slider-round">slide_round</a></li><li><a href="#switch-1">开关</a></li><li><a href="#checkbox-1">复选框</a></li><li><a href="#textfield">文本域</a></li><li><a href="#select-1">选择</a></li><li><a href="#autocomplete-1">自动完成</a></li><li><a href="#material-design-icons">材料设计图标</a></li><li><a href="#html">HTML</a></li></ul></td></tr><tr><td>宽度</td><td>控制元素的宽度，以％或px为单位</td><td>串</td><td>100％| 100像素</td></tr><tr><td>高度</td><td>控制元素的高度，以％或px为单位</td><td>串</td><td>100％| 100像素</td></tr><tr><td>行跨</td><td>跨x行的单元格</td><td>数</td><td>1，2，3，...</td></tr><tr><td>科尔斯潘</td><td>跨x列的单元格</td><td>数</td><td>1，2，3，...</td></tr><tr><td> verticalAlign</td><td>垂直对齐</td><td>串</td><td>顶部|中|底部</td></tr><tr><td>cellStyleAttrs</td><td>单元格的CSS样式属性</td><td>串</td><td>...</td></tr></tbody></table>

＃＃＃＃＃ 文本域
<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>oid</td><td>对象ID</td><td>串</td><td/></tr><tr><td>输入类型</td><td>输入类型</td><td>串</td><td>文字|编号日期|时间|面具</td></tr><tr><td>inputAlignment</td><td>文字对齐</td><td>串</td><td>左|中心|对</td></tr><tr><td>inputMask</td><td> inputMask</td><td>串</td><td/></tr><tr><td>inputMaxLength</td><td> inputMaxLength</td><td>数</td><td/></tr><tr><td>inputLayout</td><td>布局</td><td>串</td><td>定期|独奏四舍五入|独奏|填充四舍五入|实心形|概述四舍五入轮廓形</td></tr><tr><td>inputLayoutBackgroundColor</td><td>背景颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLayoutBackgroundColorHover</td><td>背景色悬停</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLayoutBackgroundColorSelected</td><td>选择背景颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLayoutBorderColor</td><td>边框颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLayoutBorderColorHover</td><td>边框颜色悬停</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLayoutBorderColorSelected</td><td>选择边框颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputTextFontFamily</td><td>字形</td><td>串</td><td/></tr><tr><td>inputTextFontSize</td><td>字体大小</td><td>数</td><td/></tr><tr><td>inputTextColor</td><td>文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLabelText</td><td>文本</td><td>串</td><td/></tr><tr><td>inputLabelColor</td><td>文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLabelColorSelected</td><td>所选文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLabelFontFamily</td><td>字形</td><td>串</td><td/></tr><tr><td>inputLabelFontSize</td><td>字体大小</td><td>数</td><td/></tr><tr><td>inputTranslateX</td><td>偏移量x</td><td>数</td><td/></tr><tr><td>inputTranslateY</td><td>偏移y</td><td>数</td><td/></tr><tr><td>inputPrefix</td><td>前置文字</td><td>串</td><td/></tr><tr><td>输入后缀</td><td>附加文字</td><td>串</td><td/></tr><tr><td>inputAppendixColor</td><td>文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputAppendixFontSize</td><td>字体大小</td><td>数</td><td/></tr><tr><td>inputAppendixFontFamily</td><td>字形</td><td>串</td><td/></tr><tr><td>showInputMessageAlways</td><td>总是显示</td><td>布尔值</td><td>错误真正</td></tr><tr><td>inputMessage</td><td>文本</td><td>串</td><td/></tr><tr><td>inputMessageFontFamily</td><td>字形</td><td>串</td><td/></tr><tr><td>inputMessageFontSize</td><td>字体大小</td><td>数</td><td/></tr><tr><td>inputMessageColor</td><td>文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> showInputCounter</td><td>显示柜台</td><td>布尔值</td><td>错误真正</td></tr><tr><td>inputCounterColor</td><td>字体颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputCounterFontSize</td><td>字体大小</td><td>数</td><td/></tr><tr><td>inputCounterFontFamily</td><td>字形</td><td>串</td><td/></tr><tr><td>clearIconShow</td><td>显示文字删除图标</td><td>布尔值</td><td>错误真正</td></tr><tr><td>clearIcon</td><td>文字删除图标</td><td>习俗</td><td/></tr><tr><td>clearIconSize</td><td>文字删除图标的大小</td><td>数</td><td/></tr><tr><td>clearIconColor</td><td>文字删除图标的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td>前置图标</td><td>带前缀的图标</td><td>习俗</td><td/></tr><tr><td>prepandIconSize</td><td>前缀图标的大小</td><td>数</td><td/></tr><tr><td>prepandIconColor</td><td>前缀图标的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> prepandInnerIcon</td><td>内部前缀符号</td><td>习俗</td><td/></tr><tr><td>prepandInnerIconSize</td><td>内部前缀符号的大小</td><td>数</td><td/></tr><tr><td>prepandInnerIconColor</td><td>内部前缀符号的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> appendIcon</td><td>附加符号</td><td>习俗</td><td/></tr><tr><td>appendIconSize</td><td>附加符号的大小</td><td>数</td><td/></tr><tr><td>appendIconColor</td><td>附加符号的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> appendOuterIcon</td><td>外部附加符号</td><td>习俗</td><td/></tr><tr><td>appendOuterIconSize</td><td>外部附加符号的大小</td><td>数</td><td/></tr><tr><td>appendOuterIconColor</td><td>外部附加符号的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr></tbody></table></details>

＃＃＃＃＃ 选择
<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>oid</td><td>对象ID</td><td>串</td><td/></tr><tr><td>输入类型</td><td>输入类型</td><td>串</td><td>文字|日期|时间</td></tr><tr><td>inputAlignment</td><td>文字对齐</td><td>串</td><td>左|中心|对</td></tr><tr><td>vibrateOnMobilDevices</td><td>在移动装置上振动[s]</td><td>数</td><td/></tr><tr><td>inputLayout</td><td>布局</td><td>串</td><td>定期|独奏四舍五入|独奏|填充四舍五入|实心形|概述四舍五入轮廓形</td></tr><tr><td>inputLayoutBackgroundColor</td><td>背景颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLayoutBackgroundColorHover</td><td>背景色悬停</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLayoutBackgroundColorSelected</td><td>选择背景颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLayoutBorderColor</td><td>边框颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLayoutBorderColorHover</td><td>边框颜色悬停</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLayoutBorderColorSelected</td><td>选择边框颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputTextFontFamily</td><td>字形</td><td>串</td><td/></tr><tr><td>inputTextFontSize</td><td>字体大小</td><td>数</td><td/></tr><tr><td>inputTextColor</td><td>文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLabelText</td><td>文本</td><td>串</td><td/></tr><tr><td>inputLabelColor</td><td>文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLabelColorSelected</td><td>所选文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLabelFontFamily</td><td>字形</td><td>串</td><td/></tr><tr><td>inputLabelFontSize</td><td>字体大小</td><td>数</td><td/></tr><tr><td>inputTranslateX</td><td>偏移量x</td><td>数</td><td/></tr><tr><td>inputTranslateY</td><td>偏移y</td><td>数</td><td/></tr><tr><td>inputPrefix</td><td>前置文字</td><td>串</td><td/></tr><tr><td>输入后缀</td><td>附加文字</td><td>串</td><td/></tr><tr><td>inputAppendixColor</td><td>文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputAppendixFontSize</td><td>字体大小</td><td>数</td><td/></tr><tr><td>inputAppendixFontFamily</td><td>字形</td><td>串</td><td/></tr><tr><td>showInputMessageAlways</td><td>总是显示</td><td>布尔值</td><td>错误真正</td></tr><tr><td>inputMessage</td><td>文本</td><td>串</td><td/></tr><tr><td>inputMessageFontFamily</td><td>字形</td><td>串</td><td/></tr><tr><td>inputMessageFontSize</td><td>字体大小</td><td>数</td><td/></tr><tr><td>inputMessageColor</td><td>文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> showInputCounter</td><td>显示柜台</td><td>布尔值</td><td>错误真正</td></tr><tr><td>inputCounterColor</td><td>字体颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputCounterFontSize</td><td>字体大小</td><td>数</td><td/></tr><tr><td>inputCounterFontFamily</td><td>字形</td><td>串</td><td/></tr><tr><td>clearIconShow</td><td>显示文字删除图标</td><td>布尔值</td><td>错误真正</td></tr><tr><td>clearIcon</td><td>文字删除图标</td><td>习俗</td><td/></tr><tr><td>clearIconSize</td><td>文字删除图标的大小</td><td>数</td><td/></tr><tr><td>clearIconColor</td><td>文字删除图标的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> crashIcon</td><td>菜单打开符号</td><td>习俗</td><td/></tr><tr><td>crashIconSize</td><td>菜单打开符号的大小</td><td>数</td><td/></tr><tr><td>crashIconColor</td><td>菜单打开符号的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td>前置图标</td><td>带前缀的图标</td><td>习俗</td><td/></tr><tr><td>prepandIconSize</td><td>前缀图标的大小</td><td>数</td><td/></tr><tr><td>prepandIconColor</td><td>前缀图标的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> prepandInnerIcon</td><td>内部前缀符号</td><td>习俗</td><td/></tr><tr><td>prepandInnerIconSize</td><td>内部前缀符号的大小</td><td>数</td><td/></tr><tr><td>prepandInnerIconColor</td><td>内部前缀符号的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> appendOuterIcon</td><td>外部附加符号</td><td>习俗</td><td/></tr><tr><td>appendOuterIconSize</td><td>外部附加符号的大小</td><td>数</td><td/></tr><tr><td>appendOuterIconColor</td><td>外部附加符号的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listDataMethod</td><td>菜单数据的输入方法</td><td>串</td><td>inputPerEditor | jsonStringObject | multistatesObject |值列表</td></tr><tr><td>countSelectItems</td><td>编辑器：菜单项计数</td><td>数</td><td/></tr><tr><td>jsonStringObject</td><td> JSON字符串</td><td>串</td><td>绑定不起作用！</td></tr><tr><td>值列表</td><td>值表</td><td>串</td><td/></tr><tr><td>valueListLabels</td><td>值清单：标签</td><td>串</td><td/></tr><tr><td>valueListIcons</td><td>值清单：图片</td><td>串</td><td/></tr><tr><td>listPosition</td><td>位置</td><td>串</td><td>汽车|顶部|底部</td></tr><tr><td>listPositionOffset</td><td>使用位置偏移</td><td>布尔值</td><td>错误真正</td></tr><tr><td>listItemHeight</td><td>菜单项的高度</td><td>数</td><td/></tr><tr><td>listItemBackgroundColor</td><td>背景颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemBackgroundHoverColor</td><td>悬停颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemBackgroundSelectedColor</td><td>所选项目的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemRippleEffectColor</td><td>效果色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> showSelectedIcon</td><td>显示所选项目的图标</td><td>串</td><td>没有前置内部前置|附加外</td></tr><tr><td>listIconSize</td><td>图标大小</td><td>数</td><td/></tr><tr><td>listIconColor</td><td>图标颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listIconHoverColor</td><td>图标悬停颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listIconSelectedColor</td><td>所选项目的图标颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemFontSize</td><td>字体大小</td><td>数</td><td/></tr><tr><td>listItemFont</td><td>字形</td><td>串</td><td/></tr><tr><td>listItemFontColor</td><td>字体颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemFontHoverColor</td><td>字体悬停颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemFontSelectedColor</td><td>所选项目的字体颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemSubFontSize</td><td>第二文字字体大小</td><td>数</td><td/></tr><tr><td>listItemSubFont</td><td>第二文字字体</td><td>串</td><td/></tr><tr><td>listItemSubFontColor</td><td>第二文字字体颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemSubFontHoverColor</td><td>悬停第二个文字的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemSubFontSelectedColor</td><td>第二个所选文字的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> showValue</td><td>显示价值</td><td>布尔值</td><td>错误真正</td></tr><tr><td>listItemValueFontSize</td><td>值的字体大小</td><td>数</td><td/></tr><tr><td>listItemValueFont</td><td>价值字体</td><td>串</td><td/></tr><tr><td>listItemValueFontColor</td><td>值的字体颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemValueFontHoverColor</td><td>将鼠标悬停在值的字体颜色上</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemValueFontSelectedColor</td><td>所选值的字体颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td>值<b><i>X</i></b></td><td>菜单项X的值</td><td>串</td><td/></tr><tr><td>标签<b><i>X</i></b></td><td>菜单项X的标签</td><td>串</td><td/></tr><tr><td>子标签<b><i>X</i></b></td><td>菜单项X的子标签</td><td>串</td><td/></tr><tr><td>listIcon <b><i>X</i></b></td><td>菜单项X的listIcon</td><td>习俗</td><td/></tr><tr><td>listIconColor <b><i>X</i></b></td><td>菜单项X的listIconColor</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr></table></details>

#####自动完成
<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>oid</td><td>对象ID</td><td>串</td><td/></tr><tr><td>输入模式</td><td>输入模式</td><td>串</td><td>写选择</td></tr><tr><td>输入类型</td><td>输入类型</td><td>串</td><td>文字|日期|时间</td></tr><tr><td>inputAlignment</td><td>文字对齐</td><td>串</td><td>左|中心|对</td></tr><tr><td>vibrateOnMobilDevices</td><td>在移动装置上振动[s]</td><td>数</td><td/></tr><tr><td>inputLayout</td><td>布局</td><td>串</td><td>定期|独奏四舍五入|独奏|填充四舍五入|实心形|概述四舍五入轮廓形</td></tr><tr><td>inputLayoutBackgroundColor</td><td>背景颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLayoutBackgroundColorHover</td><td>背景色悬停</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLayoutBackgroundColorSelected</td><td>选择背景颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLayoutBorderColor</td><td>边框颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLayoutBorderColorHover</td><td>边框颜色悬停</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLayoutBorderColorSelected</td><td>选择边框颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputTextFontFamily</td><td>字形</td><td>串</td><td/></tr><tr><td>inputTextFontSize</td><td>字体大小</td><td>数</td><td/></tr><tr><td>inputTextColor</td><td>文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLabelText</td><td>文本</td><td>串</td><td/></tr><tr><td>inputLabelColor</td><td>文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLabelColorSelected</td><td>所选文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputLabelFontFamily</td><td>字形</td><td>串</td><td/></tr><tr><td>inputLabelFontSize</td><td>字体大小</td><td>数</td><td/></tr><tr><td>inputTranslateX</td><td>偏移量x</td><td>数</td><td/></tr><tr><td>inputTranslateY</td><td>偏移y</td><td>数</td><td/></tr><tr><td>inputPrefix</td><td>前置文字</td><td>串</td><td/></tr><tr><td>输入后缀</td><td>附加文字</td><td>串</td><td/></tr><tr><td>inputAppendixColor</td><td>文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputAppendixFontSize</td><td>字体大小</td><td>数</td><td/></tr><tr><td>inputAppendixFontFamily</td><td>字形</td><td>串</td><td/></tr><tr><td>showInputMessageAlways</td><td>总是显示</td><td>布尔值</td><td>错误真正</td></tr><tr><td>inputMessage</td><td>文本</td><td>串</td><td/></tr><tr><td>inputMessageFontFamily</td><td>字形</td><td>串</td><td/></tr><tr><td>inputMessageFontSize</td><td>字体大小</td><td>数</td><td/></tr><tr><td>inputMessageColor</td><td>文字颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> showInputCounter</td><td>显示柜台</td><td>布尔值</td><td>错误真正</td></tr><tr><td>inputCounterColor</td><td>字体颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> inputCounterFontSize</td><td>字体大小</td><td>数</td><td/></tr><tr><td>inputCounterFontFamily</td><td>字形</td><td>串</td><td/></tr><tr><td>clearIconShow</td><td>显示文字删除图标</td><td>布尔值</td><td>错误真正</td></tr><tr><td>clearIcon</td><td>文字删除图标</td><td>习俗</td><td/></tr><tr><td>clearIconSize</td><td>文字删除图标的大小</td><td>数</td><td/></tr><tr><td>clearIconColor</td><td>文字删除图标的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> crashIcon</td><td>菜单打开符号</td><td>习俗</td><td/></tr><tr><td>crashIconSize</td><td>菜单打开符号的大小</td><td>数</td><td/></tr><tr><td>crashIconColor</td><td>菜单打开符号的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td>前置图标</td><td>带前缀的图标</td><td>习俗</td><td/></tr><tr><td>prepandIconSize</td><td>前缀图标的大小</td><td>数</td><td/></tr><tr><td>prepandIconColor</td><td>前缀图标的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> prepandInnerIcon</td><td>内部前缀符号</td><td>习俗</td><td/></tr><tr><td>prepandInnerIconSize</td><td>内部前缀符号的大小</td><td>数</td><td/></tr><tr><td>prepandInnerIconColor</td><td>内部前缀符号的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> appendOuterIcon</td><td>外部附加符号</td><td>习俗</td><td/></tr><tr><td>appendOuterIconSize</td><td>外部附加符号的大小</td><td>数</td><td/></tr><tr><td>appendOuterIconColor</td><td>外部附加符号的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listDataMethod</td><td>菜单数据的输入方法</td><td>串</td><td>inputPerEditor | jsonStringObject | multistatesObject |值列表</td></tr><tr><td>countSelectItems</td><td>编辑器：菜单项计数</td><td>数</td><td/></tr><tr><td>jsonStringObject</td><td> JSON字符串</td><td>串</td><td>绑定不起作用！</td></tr><tr><td>值列表</td><td>值表</td><td>串</td><td/></tr><tr><td>valueListLabels</td><td>值清单：标签</td><td>串</td><td/></tr><tr><td>valueListIcons</td><td>值清单：图片</td><td>串</td><td/></tr><tr><td>listPosition</td><td>位置</td><td>串</td><td>汽车|顶部|底部</td></tr><tr><td>listPositionOffset</td><td>使用位置偏移</td><td>布尔值</td><td>错误真正</td></tr><tr><td>listItemHeight</td><td>菜单项的高度</td><td>数</td><td/></tr><tr><td>listItemBackgroundColor</td><td>背景颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemBackgroundHoverColor</td><td>悬停颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemBackgroundSelectedColor</td><td>所选项目的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemRippleEffectColor</td><td>效果色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> showSelectedIcon</td><td>显示所选项目的图标</td><td>串</td><td>没有前置内部前置|附加外</td></tr><tr><td>listIconSize</td><td>图标大小</td><td>数</td><td/></tr><tr><td>listIconColor</td><td>图标颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listIconHoverColor</td><td>图标悬停颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listIconSelectedColor</td><td>所选项目的图标颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemFontSize</td><td>字体大小</td><td>数</td><td/></tr><tr><td>listItemFont</td><td>字形</td><td>串</td><td/></tr><tr><td>listItemFontColor</td><td>字体颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemFontHoverColor</td><td>字体悬停颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemFontSelectedColor</td><td>所选项目的字体颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemSubFontSize</td><td>第二文字字体大小</td><td>数</td><td/></tr><tr><td>listItemSubFont</td><td>第二文字字体</td><td>串</td><td/></tr><tr><td>listItemSubFontColor</td><td>第二文字字体颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemSubFontHoverColor</td><td>悬停第二个文字的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemSubFontSelectedColor</td><td>第二个所选文字的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> showValue</td><td>显示价值</td><td>布尔值</td><td>错误真正</td></tr><tr><td>listItemValueFontSize</td><td>值的字体大小</td><td>数</td><td/></tr><tr><td>listItemValueFont</td><td>价值字体</td><td>串</td><td/></tr><tr><td>listItemValueFontColor</td><td>值的字体颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemValueFontHoverColor</td><td>将鼠标悬停在值的字体颜色上</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td> listItemValueFontSelectedColor</td><td>所选值的字体颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td>值0</td><td>值0</td><td>串</td><td/></tr><tr><td>标签0</td><td>标签0</td><td>串</td><td/></tr><tr><td>子标签0</td><td>子标签0</td><td>串</td><td/></tr><tr><td>listIcon0</td><td> listIcon0</td><td>习俗</td><td/></tr><tr><td>listIconColor0</td><td> listIconColor0</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr><tr><td>值1</td><td>值1</td><td>串</td><td/></tr><tr><td>标签1</td><td>标签1</td><td>串</td><td/></tr><tr><td>子标签1</td><td>子标签1</td><td>串</td><td/></tr><tr><td>listIcon1</td><td> listIcon1</td><td>习俗</td><td/></tr><tr><td>listIconColor1</td><td> listIconColor1</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr></tbody></table></details>

#####材料设计图标
<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>mdwIcon</td><td> <a href="https://materialdesignicons.com/">materialdesignicon名称</a></td><td>串</td><td>家，地方，...</td></tr><tr><td> mdwIconSize</td><td>图标大小</td><td>数</td><td>0、1、2，...</td></tr><tr><td> mdwIconColor</td><td>图标的颜色</td><td>串</td><td>十六进制（＃44739e），rgb（20、50、200），rgba（20、50、200、0.5）</td></tr></tbody></table></details>

##### HTML
<details><table><thead><tr><th>属性</th><th>描述</th><th>类型</th><th>价值观</th></tr></thead><tbody><tr><td>html</td><td>任何html元素</td><td>串</td><td></td></tr><tr><td>oid</td><td>在html中使用的对象ID。在html中，使用&#39;[#value]&#39;作为值</td><td>串</td><td></td></tr></tbody></table></details>

<br>

###编辑器设置
<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/table_general.png"></td><td>开关</td><td>带有输入数据的类型字符串的数据点，如上所示</td></tr><tr><td>数据作为JSON</td><td>可选，如果未设置oid数据点，则输入如上所示的数据</td></tr><tr><td rowspan=4><img src="doc/en/media/table_column.png"></td><td>colType [x]</td><td>如果选择了图像，则对象属性必须具有图像的路径（<a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#input-data">请参见上文</a>）</td></tr><tr><td>前缀[x]</td><td>可以使用对象属性，内部对象绑定（<a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#internal-object-binding">请参见下文</a>）和html的前缀</td></tr><tr><td>后缀[x]</td><td>可以使用对象属性，内部对象绑定（<a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#internal-object-binding">见下文</a>）和html的后缀</td></tr><tr><td>用于排序的对象名称[x]</td><td>在这里，您可以定义应用于排序的其他对象属性。</td></tr></tbody></table>

#####内部对象绑定
前缀和后缀支持表内部对象绑定->您可以使用来访问对象的其他属性

```
#[obj.'propertyName']
```

示例请<a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#input-data">参见上面</a>。

可以找到工作部件示例

* [此处]（https://forum.iobroker.net/topic/26199/test-adapter-material-design-widgets-v0-1-x/113）
* [ical Adapter]（https://forum.iobroker.net/topic/29658/material-design-widgets-table-widget/2）

##响应式布局
有两个小部件-Masonry Views和Grid Views-可以使用它们创建一个响应式布局（台式机，平板电脑和移动设备的布局）。这两个小部件都集成了多个`view in widget`。

###砌体景观
Masonry Views集成了多个`view in widget`§，将根据小部件的宽度自动对其进行排序。使用此小部件，可以创建响应式布局（台式机，平板电脑和mobil的一种布局）。
如果所包含的视图具有不同的高度，则砖石视图特别有用。

<b>看一下[Material Design Widgets示例项目](https://github.com/Scrounger/ioBroker.vis-materialdesign#online-example-project)</b>以了解其工作原理。

![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/masnory.gif)

<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/masonry_resolution_settings.png"></td><td colspan=2>根据窗口小部件的宽度，可以设置列数和视图之间的距离。可以分别设置纵向和横向格式的设置。要找出不同设备的分辨率宽度，请在通用设置下激活“分辨率助手”。</td></tr><tr><td rowspan=2><img src="doc/en/media/masnory_settings_views.png"></td><td>视线宽度[x]</td><td>定义视图的宽度。允许的值为数字，px，％或calc。实施例： <code>100</code> ， <code>100px</code> ， <code>55%</code> <code>calc(60% - 12px)</code></td></tr><tr><td>视线高度[x]</td><td>您可以在此处指定使用的视图的高度。<br><br>如果要使高度随视图而变化，则此输入必须为空，并且对于视图中具有最高高度的小部件，位置必须设置为相对，请参见屏幕截图：<br><br><img src="doc/en/media/masonry_grid_position_settings.png"></td></tr></tbody></table>

###网格视图
网格视图具有多个`view in widget`集成，将根据窗口小部件的宽度自动排序。使用此小部件，可以创建响应式布局（台式机，平板电脑和mobil的一种布局）。
如果包含的视图具有相同的高度，则网格视图特别有用。

<b>网格视图小部件共有12列。如果要使视图的宽度为4列，则必须在相应的视图中将列跨度设置为4 [x]</b>

<b>看一下[Material Design Widgets示例项目](https://github.com/Scrounger/ioBroker.vis-materialdesign#online-example-project)</b>以了解其工作原理。

![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/grid.gif)

<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/grid_settings_resolution.png"></td><td colspan=2>根据窗口小部件的宽度，可以从各个窗口小部件的宽度定义适用各个视图[x]的列跨度的规则以及视图之间的距离。可以分别设置纵向和横向格式的设置。要找出不同设备的分辨率宽度，请在通用设置下激活“分辨率助手”。</td></tr><tr><td rowspan=2><img src="doc/en/media/grid_settings_view.png"></td><td colspan=2>根据当前的宽度分辨率规则定义视图的列范围。<br>您还可以在此处指定是仅以高于或低于定义值的分辨率显示视图，还是通过对象ID使其可见。</td></tr><tr><td>视线高度[x]</td><td>您可以在此处指定使用的视图的高度。<br><br>如果要使高度随视图而变化，则此输入必须为空，并且对于视图中具有最高高度的小部件，位置必须设置为相对，请参见屏幕截图：<br><br><img src="doc/en/media/masonry_grid_position_settings.png"></td></tbody></table>

##警报
可以使用Alerts小部件可以在VIS中显示消息，就像它与Pushover适配器一起使用一样，但是可以直接在VIS中显示。

![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/alerts.gif)

Alerts小部件需要一个JSON字符串作为对象，其结构必须如下：

```
[
       {
		"text": "we have a new message",
		"backgroundColor": "",
		"borderColor": "darkred",
		"icon": "message-alert-outline",
		"iconColor": "darkred",
		"fontColor": "blue"
	}, {
		"text": "we have a new message",
		"backgroundColor": "#e6b0aa",
		"borderColor": "green",
		"icon": "/vis/img/bulb_on.png",
		"iconColor": "green",
		"fontColor": "gold"
	}, {
		"text": "we have a new message",
		"backgroundColor": "",
		"borderColor": "gold",
		"icon": "alert-outline",
		"iconColor": "gold",
		"fontColor": ""
	}
]
```

<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=3><img src="doc/en/media/alerts_settings.png"></td><td>列数</td><td>定义列数</td></tr><tr><td>对象ID</td><td>对象必须是json字符串，其结构必须如上所述</td></tr><tr><td>最高快讯</td><td>应该显示的最大警报数。</td></tr></tbody></table>

使用以下脚本，您可以将简单消息发送到Alerts Widget使用的数据点。
该脚本必须放入全局脚本中。然后可以使用以下命令发送消息

`materialDesignWidgets.sendTo('datapoint_id', 'message', 'color');`

```


var materialDesignWidgets = {};
materialDesignWidgets.sendTo = function (id, text, backgroundColor = '', borderColor = '', icon = '', iconColor = '', fontColor = '') {
    let json = getState(id).val;

    if (json) {
        try {

            json = JSON.parse(json);

        } catch (e) {
            json = [];
            console.warn('Wert ist kein JSON string! Wert wird ersetzt!');
        }
    } else {
        json = [];
    }

    json.push(
        {
            text: text,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            icon: icon,
            iconColor: iconColor,
            fontColor: fontColor
        }
    )
    setState(id, JSON.stringify(json), true);
}
```

##日历
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/calendar.gif)

日历小部件需要一个JSON字符串作为对象，其结构必须如下：

```
[
	{
		"name": "Event",
		"color": "#e74c3c",
		"colorText": "#FFFFFF",
		"start": "2020-01-24",
		"end": "2020-01-26"
	},
	{
		"name": "Meeting",
		"color": "#717d7e",
		"colorText": "#FFFFFF",
		"start": "2020-03-23 16:00",
		"end": "2020-03-24 17:15"
	}
]
```

仅十六进制和RGBA可用作颜色！

下表中未列出的设置是不言自明的。

<table><thead><tr><th>屏幕截图</th><th>设置</th><th>描述</th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/calendar_layout.png"></td><td>要显示一周中的几天</td><td>指定要显示一周中的哪几天。要仅显示星期一至星期五，可以使用值<code>1, 2, 3, 4, 5</code> 。要显示从星期一开始的一周，可以使用值<code>1, 2, 3, 4, 5, 6, 0</code> 。</td></tr><tr><td>对象ID</td><td>对象必须是json字符串，其结构必须如上所述</td></tr><tr><td rowspan=2><img src="doc/en/media/calendar_timeaxis.png"></td><td>开始时间</td><td>在周和日视图中应显示约会的小时数。</td></tr><tr><td>结束时间</td><td>在周和日视图中应显示约会的小时数</td></tr></tbody></table>

如果要将小部件与[医用适配器](https://github.com/iobroker-community-adapters/ioBroker.ical)一起使用，则可以使用以下脚本将ical对象转换为可与小部件一起使用。

```
// momentjs is required as dependecies in javascript adapter
const moment = require("moment");

var instances = $(`[id=ical.*.data.table]`);
instances.on(ical2CalendarWidget);

// remove this, if you know to use your own datapoint
let datapointId = 'materialdesignwidgets.calendar.ical2calendar'
createState(datapointId, "[]", {
  read: true,
  write: false,
  desc: "JSON String for Calendar Widget",
  type: "string",
  def: "[]"
});

function ical2CalendarWidget() {
    try {
        let calList = [];

        for (var inst = 0; inst <= instances.length - 1; inst++) {
            let icalObj = getState(instances[inst]).val;

            if (icalObj) {
                for (var i = 0; i <= icalObj.length - 1; i++) {
                    let item = icalObj[i];

                    // extract calendar color
                    let calendarName = item._class.split(' ')[0].replace('ical_', '');

                    let startTime = moment(item._date);
                    let endTime = moment(item._end);

                    let start = startTime.format("YYYY-MM-DD HH:mm");
                    let end = endTime.format("YYYY-MM-DD HH:mm");

                    if (startTime.format('HH:mm') === '00:00' && endTime.format('HH:mm') === '00:00') {
                        // is full-day event
                        if (endTime.diff(startTime, 'hours') === 24) {
                            // full-day event, one day
                            start = startTime.format("YYYY-MM-DD");
                            end = startTime.format("YYYY-MM-DD");
                        } else {
                            // full-day event, multiple days
                            start = startTime.format("YYYY-MM-DD");
                            end = endTime.format("YYYY-MM-DD");
                        }
                    }

                    // create object for calendar widget
                    calList.push({
                        name: item.event,
                        color: getMyCalendarColor(calendarName),
                        colorText: getMyCalendarTextColor(calendarName),
                        start: start,
                        end: end
                    })
                }

                function getMyCalendarColor(calendarName) {
                    // assign colors via the calendar names, use calendar name as set in ical
                    if (calendarName === 'calendar1') {
                        return '#FF0000';
                    } else if (calendarName === 'calendar2') {
                        return '#44739e'
                    } else if (calendarName === 'calendar3') {
                        return '#32a852'
                    }
                }

                function getMyCalendarTextColor(calendarName) {
                    // assign colors via the calendar names, use calendar name as set in ical
                    if (calendarName === 'calendar1') {
                        return '#FFFFFF';
                    } else if (calendarName === 'calendar2') {
                        return '#FFFFFF'
                    } else if (calendarName === 'calendar3') {
                        return '#FFFFFF'
                    }
                }
            }

            // Enter the destination data point that is to be used as object ID in the widget
            setState(datapointId, JSON.stringify(calList), true);
        }
    } catch (e) {
        console.error(`ical2MaterialDesignCalendarWidget: message: ${e.message}, stack: ${e.stack}`);
    }
}

ical2CalendarWidget();
```

## HTML元素
从受支持的Material Design小部件创建html元素，以在支持html的任何其他小部件中使用它。
只需为您的Material Design小部件设置样式，然后按`generate Html Element`，将数据复制并粘贴到任何支持html标签的小部件中。
或者在脚本中使用它来动态生成窗口小部件。

![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/html-elements.gif)

有关受支持属性的更多信息，请参见各个小部件：

* [按钮]（＃buttons）
* [垂直按钮]（＃buttons-vertical）
* [按钮图标]（＃buttons-icon）

*

* [滑块]（＃slider）

*

* [进度]（＃progress）
* [进度通知]（＃progress-circular）

*

* [复选框]（＃checkbox）
* [Switch]（＃switch）

＃使用的库
适配器使用以下库：

* [适用于Google的网络材料组件]（https://github.com/material-components/material-components-web）
* [Vuetify]（https://github.com/vuetifyjs/vuetify）
* [chartjs]（https://www.chartjs.org/）
* [来自thomasloven的round-slider]（https://github.com/thomasloven/round-slider）
* [材料设计图标]（https://materialdesignicons.com/）

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):    
	### __WORK IN PROGRESS__
-->

<!-- omit in toc -->
### __WORK IN PROGRESS__
* (Scrounger) icon list: option for status bar text added
* (Scrounger) icon list: status bar position bug fix
* (Scrounger) progress circular: auto size option added
* (Scrounger) VIS editor: html previews bug fixes

<!-- omit in toc -->
### 0.4.2 (2020-12-29)
* (Scrounger) vis-google-fonts dependency removed

<!-- omit in toc -->
### 0.4.1 (2020-12-27)
* (Scrounger): Adapter settings: theme editor implementation completed
* (Scrounger): Progress Widget: condition binding bug fix
* (Scrounger): minimal VIS adapter dependency set to v1.3.6
* (Scrounger): VIS editor: image dialog bug fix
* (Scrounger): Color themes for buttons and dialogs widgets implemented
* (Scrounger): Calendar Widget: week number bug fix
* (Scrougner): icon list: scrollbar bug fix
* (Scrounger): bug fixes

<!-- omit in toc -->
### 0.4.0-beta (2020-12-09)
* (Scrounger): Line History Chart Widget: Breaking Changes !!! aggregate (display) method for every dataset configurable, [see documentation for detailed infos](#line-history-chart)!
* (Scrounger): TopAppBar Widget: Breaking Changes !!! Submenus must now be created using JSON string, [see documentation for detailed infos](#since-version-040)!
* (Scrounger): Adapter settings wiht theme editor added
* (Scrounger): bug fix for compatibility issues with other widget adapters
* (Scrounger): Chechbox Widget: option for border and hover color added
* (Scrounger): Chechbox Widget: ripple effect bug fix
* (Scrounger): Buttons Vertical: text alignment option added
* (Scrounger): added URL support as source for symbols / images
* (Scrounger): HTML Card Widget: option to hide title, subtitle and text added
* (Scrounger): HTML Card Widget: background image refresh options by datapoint added
* (Scrounger): Fixed some errors reported via Sentry
* (Scrounger): Select & Autocomplete Widget: overriding icon color bug fix
* (Scrounger): Select & Autocomplete Widget: overriding icon bug fix
* (Scrounger): Select & Autocomplete Widget: colors bug fixes
* (Scrounger): Select & Autocomplete Widget: option to override the icon color of textfield for selected menu icon
* (Scrounger): Select & Autocomplete Widget: text alignment option added
* (Scrounger): Input Widget: text alignment option added
* (Scrounger): JSON Chart Widget: option to force x-axis time unit added
* (Scrounger): JSON Chart Widget: gradient colors for multipe dataset bug fixes
* (Scrounger): JSON Chart: default tooltip title added
* (Scrounger): JSON Chart: option to use Today / Yesterday for x-axis labeling added
* (Scrounger): JSON Chart: option to use Today / Yesterday for tooltip added
* (Scrounger): JSON Chart: option to change x-axis label distance added
* (Scrounger): Line History Chart: option for point color added
* (Scrounger): Line History Chart: option to use Today / Yesterday for x-axis labeling added
* (Scrounger): Line History Chart: option to use Today / Yesterday for tooltip added
* (Scrounger): Line History Chart: tooption change x-axis label distance added
* (Scrounger): Charts Widget: x-Axis time axis bug fixes
* (Scrounger): Calendar Widget: option to show calendar week numbers in month view added
* (Scrounger): Calendar Widget: option for custom date format added
* (Scrounger): IconList Widget: bug fix for performance issue
* (Scrounger): TopAppBar Widget: options for user groups added
* (Scrounger): Table Widget: html element added
* (Scrounger): Masonry & Grid View Widget: default width for handy portrait and landscape view changed
* (Scrounger): Progress Widget: option for indeterminate style added
* (Scrounger): dependencies updated
* (Scrounger): bug fixes

<!-- omit in toc -->
### 0.3.19 (2020-07-18)
* (Scrounger): Icon Button Widget: background color option for lock icon added
* (Scrounger): possibility to deactivate sentry implemented -> see documentation
* (Scrounger): Fixed some bugs reported via Sentry
* (Scrounger): prevent set value in vis editor
* (Scrounger): Grid & Mansonry Widget: visibilty by resoltuin bug fix
* (Scrounger): IconList Widget: Card Background for whole icon list added
* (Scrounger): Table Wigdet: button link widget added
* (Scrounger): Table Wigdet: material design icon widget added
* (Scrounger): Table Wigdet: alignment option for controls added
* (Scrounger): materialdesignicons library updated to v5.3.45
* (Scrounger): Round Slider lib updated to v0.5.0
* (Scrounger): Round Slider Widget: readonly option added
* (Scrounger): Table Widget: background color hover option added
* (Scrounger): bug fixes

## License

MIT License

Copyright (c) 2021 Scrounger <scrounger@gmx.net>

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