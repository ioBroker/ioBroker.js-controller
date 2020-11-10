---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-material-advanced/README.md
title: ioBroker.vis-material-advanced
hash: UhKFsvE/MazLo9kNokhslQ8lqDoHst5L1wvq4yedao0=
---
![商标](../../../en/adapterref/iobroker.vis-material-advanced/admin/vis-material-advanced.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.vis-material-advanced.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.vis-material-advanced.svg)
![安装数量（最新）](http://iobroker.live/badges/vis-material-advanced-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/vis-material-advanced-stable.svg)
![依赖状态](https://img.shields.io/david/EdgarM73/iobroker.vis-material-advanced.svg)
![已知漏洞](https://snyk.io/test/github/EdgarM73/ioBroker.vis-material-advanced/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vis-material-advanced.png?downloads=true)

＃ioBroker.vis-material-advanced
## IoBroker的可见材料高级适配器
该适配器为ioBroker中的vis提供了标准化的小部件。许多不同的预定义小部件

该适配器的基础已经由创建：

*（nisio）https://github.com/iobroker-community-adapters/ioBroker.vis-material
*（pix--）https://github.com/Pix---/ioBroker.vis-material

但改写成90％

几个错误修正和许多新的小部件添加

##以下小部件现在存在：
###当前
 -门
 -窗户
 -温度
 -湿度
 -压力
 -温度和湿度
 -占用
 -轻
 -调光器
 -光温
 -快门
 -音量
 -温控器
 -布尔值
 -号码
 -文字
 -阀门

＃＃＃ 进行中
尚未最终：

 -车库门
 - 广播电台

 许多小部件仍在计划中

##选项
    大多数小部件中都提供以下选项：

    -文字颜色
    -cardIcon（并非在所有地方都有意义，例如dimmer）
    -不透明颜色（标准不透明颜色）
    -colorizeByValue（根据某些值可以更改不透明度颜色，例如，如果太热则将其设为红色，变为冷蓝色）
    -下方，上方，最小值，最大值（colorizeByValue的值）
    -彩色低/高，中...（抬高边框时使用的颜色）
    -只读（可以将某些小部件设置为只读模式以仅用于显示）
    -边界半径以启用和更改圆角
    -valueAlign将“值”字段左，中或右对齐
    -value-vetical将“值”字段的顶部，底部或中间对齐
    -borderColor边框的颜色（如果已激活）

＃＃＃ 入门
安装适配器并在“编辑”模式下启动VIS。
在左侧选择vis-material-adapter，然后所有小部件都显示在预览中。

.............缺少许多文档...................

**这是example2.png，将其导入并实时显示****![](../../../en/adapterref/iobroker.vis-material-advanced/widgets/door_example.png)

**由于@ sigi234，您可以将example.json文件导入vis **

## Changelog
<!--
    Placeholder
    ### __WORK IN PROGRESS__
* 
-->
### 1.2.0 (2020-11-04)
* added option to round every corner different/not 
* added option to change color of border
* added option for shadow and size of shadow

### 1.1.1 (2020-10-18)
* url wrong in package.json


### 1.1.0 (2020-10-15)
* Travis changes

### 1.0.0 (2020-10-14)
* no changes, upgrading to 1.0

### 0.9.1 (2020-10-13)
* some colorizeByValue options did not work

## License
MIT License

Copyright (c) 2020 EdgarM73 <edgar.miller@gmail.com>

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