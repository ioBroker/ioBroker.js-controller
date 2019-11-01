---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-materialdesign/README.md
title: ioBroker.vis-materialdesign
hash: dzY37+riP6rPphWwGWaCzfhEZsZC5f5YzBagjXeQysI=
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

###支持的浏览器
https://github.com/material-components/material-components-web/blob/master/docs/supported-browsers.md

##按钮切换
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/buttons.gif)

##卡
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/cards.png)

##图标按钮
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/icon-button.gif)

##清单
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/list.gif)

##进展
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/progress.gif)

##滑块
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/slider.gif)

##开关
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/switch.gif)

##带有导航抽屉的顶部应用栏
信息：

*应用栏的位置是硬编码的，始终显示在左上角。仅宽度和高度是可调的。在编辑器中，您可以移动窗口小部件，但是这些设置将不会应用！
*在编辑器中，滚动等效果无法正确显示或表现不同！
*必须激活复选框“永久”！

#####布局模式：
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/topappbar_modal.gif)

#####可忽略的版式：
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/topappbar_dismissible.gif)

#####永久布局：
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/topappbar_permanent.gif)

#####子菜单
![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/drawer_subMenu.png)

要激活子菜单，您必须添加多个以'|'分隔的视图进入视图字段，例如：![商标](../../../en/adapterref/iobroker.vis-materialdesign/doc/media/drawer_subMenu_views.png)

要更改项目的文本，您必须将json对象放入带有查看字段索引的label字段中，例如：

`{"itemText": "Item with Subitems", "subItems": ["subItem1", "subItem2"]}`

要更改项目的图像，您必须将一个json对象放入包含视图字段索引的图像中，例如：

`{"itemImage": "/icons-material-svg/hardware/ic_computer_48px.svg", "subItems": ["/vis/widgets/materialdesign/img/IoBroker_Logo.png", "/icons-material-svg/action/ic_android_48px.svg"]}`

## Changelog

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