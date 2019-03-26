---
BADGE-Travis CI: https://travis-ci.org/MiSchroe/ioBroker.klf200.svg?branch=master
BADGE-Build status: https://ci.appveyor.com/api/projects/status/t28nlps5c99jy5v7/branch/master?svg=true
BADGE-GitHub issues: https://img.shields.io/github/issues/MiSchroe/ioBroker.klf200.svg
BADGE-GitHub license: https://img.shields.io/github/license/MiSchroe/ioBroker.klf200.svg
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.klf200.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.klf200.svg
BADGE-NPM: https://nodei.co/npm/iobroker.klf200.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/MiSchroe/ioBroker.klf200/edit/master//README.md
title: KLF-200
hash: Ju0Pch23b2A9SxISJePGcq8iK7w8OF/BBWi9nSZbzys=
adapter: true
license: MIT
authors: Michael Schroeder klf200@gmx.de
description: Runs scenes on a KLF-200 Interface
keywords: KLF-200, VELUX
readme: https://github.com/MiSchroe/ioBroker.klf200/blob/master/README.md
mode: daemon
materialize: true
compact: false
published: 2018-08-05T19:05:55.098Z
version: 0.9.5
---
＃KLF-200适配器文档
该适配器用于控制VELUX®KLF-200接口。此适配器既不是VELUX官方产品，也不是拥有VELUX产品的公司支持。

该适配器的主要用途是控制电动天窗和/或电动百叶窗或百叶窗。
但是，KLF-200接口能够连接其他设备，如灯，开关，百叶窗等。
我没有设计适配器用于这些设备。因此，这些设备也可以通过此适配器进行控制。

适配器使用KLF-200接口的内部REST API，您不需要连接输入和输出，尽管仍然可以并行使用它们。

---

##准备你的KLF-200界面
要使用此适配器，您必须在**接口模式**中设置KLF-200盒。如果您将盒子用作转发器，它将不起作用。

>有关以下任务的详细说明，请阅读包装盒随附的手册。
>>假设您已成功登录Web浏览器中的框。

###产品
您要使用此适配器控制的任何产品都必须在“我的产品”页面上注册。
您可以通过注册新产品

 - 从另一个遥控器复制
 - 搜索产品

注册所有产品后，您应该看到如下列表：

![KLF-200界面的“我的产品”的屏幕截图](zh-cn/adapterref/iobroker.klf200/../../../de/adapterref/iobroker.klf200/img/ProductList.PNG)

###设置场景
要录制场景，请单击按钮

![录制节目按钮](zh-cn/adapterref/iobroker.klf200/../../../de/adapterref/iobroker.klf200/img/RecordProgramButton.PNG)

这将打开*程序准备进行中*窗口。现在使用随产品提供的遥控器来更改某些内容，例如：把窗户打开到40％。然后输入程序名称并单击* Save Program *。

![正在录制的屏幕截图](zh-cn/adapterref/iobroker.klf200/../../../de/adapterref/iobroker.klf200/img/RecordingInProgress.PNG)

>提示：>  - 按产品和开放级别命名您的程序，例如窗户浴室40％。但是，适配器不使用命名约定。
>  - 如果您的窗口已关闭，请从100％打开开始，然后继续执行每个附加程序，直至达到0％。
>  - 您可以在框中存储最多32个程序。因此，请计划您的步数，因为30％或40％的打开窗口之间没有真正的区别。

当你完成录制节目时，你会得到一个这样的列表：

![程序列表的屏幕截图](zh-cn/adapterref/iobroker.klf200/../../../de/adapterref/iobroker.klf200/img/ProgramList.PNG)

###建立联系
最后一步是可选的。如果您没有使用输入和输出线，您可能已经注意到盒子上的小LED不断闪烁。要摆脱烦人的闪烁，您需要设置至少一个连接。

你只需要在盒子里设置它，你不必连接任何东西！选择一些东西。

---

##配置适配器
![适配器配置的屏幕截图](zh-cn/adapterref/iobroker.klf200/../../../de/adapterref/iobroker.klf200/img/AdapterConfiguration.PNG)

### Host
KLF-200接口的主机名。这是您在Web浏览器的地址栏中输入的用于连接到您的盒子的地址。

###密码
连接KLF-200接口所需的密码。这与您在Web浏览器中连接时使用的内容相同。

> KLF-200的默认密码是`velux123`，但无论如何你应该更改它！

###以分钟为单位查询频率
<span style="color: #ff0000"><strong><em>此选项计划在将来的版本中使用。如果要重新加载配置，则必须重新启动适配器。</em></strong></span>

适配器从KLF-200接口重新加载配置的分钟数。

---

##使用适配器
适配器从KLF-200接口读取元数据后，您将在对象树中找到以下状态：

设备|频道|国家|数据类型|说明--- | --- | --- | --- | ---产品| | | |在KLF-200的产品列表中有每个产品的子条目。
产品| | productsFound |价值|列表中的产品数量。只读。
产品| 0..n |类别|文字|产品类别。只读。
产品| 0..n |级别|级别|产品的当前状态为要执行的相应场景设置此值。读/写。
产品| 0..n | scenesCount |价值|使用产品的场景数。只读。
场景| | | |在KLF-200的产品列表中有每个产品的子条目。
场景| | scenesFound |价值|列表中的场景数。只读。
场景| 0..n | productsCount |价值|此场景中的产品数量。只读。
场景| 0..n |运行| button.play |指示场景是否正在运行。设置此值以运行场景。读/写。
场景| 0..n |沉默| indicator.silent |指示场景是否以安静模式运行（如果场景中的产品支持）。只读。

> **重要事项：** >>通道中使用的ID是来自KLF-200接口的ID。如果您对KLF-200中的产品列表或程序列表进行了更改，则ID可能会更改。

要执行场景，可以将场景的状态`run`设置为`true`，或将产品的状态`level`设置为与将产品设置为此级别的场景对应的值，

###例子
假设您的浴室窗口在渠道`0`上。您在频道`10`上有一个场景，可将浴室窗口打开至40％。

```javascript
// Variant 1: Open the bathroom window at 40% using the scenes run state:
setState('klf200.0.scenes.10.run', true);
/*
    The following will happen:
    1. Your window will start to move to 40% opening level.
    2. After your window has stopped, klf200.0.scenes.10.run will be set to 'false' again.
    3. klf200.0.products.0.level will be set to 40%.
*/

// Variant 2: Open the bathroom window at 40% using the products level state:
setState('klf200.0.products.0.level', 40);
/*
    The following will happen:
    1. Your window will start to move to 40% opening level.
    2. klf200.0.scenes.10.run will be set to true.
    3. After your window has stopped, klf200.0.scenes.10.run will be set to 'false' again.
*/

// What happens, if we don't have a scene for that level?
setState('klf200.0.products.0.level', 41);
/*
    The following will happen:
    1. Your window won't move at all!
    2. klf200.0.products.0.level will be reset to the previous value, e.g. 40
*/

```

---

##已知限制
适配器使用内部REST API控制KLF-200，该API由盒子的Web界面使用。
虽然我们只使用API的一个子集，但存在一些限制：

 - 适配器无法读取窗口的当前开度。如果您使用遥控器控制它或由于下雨而关闭，适配器将不会知道它并仍将显示最后的已知值。
 -  KLF-200接口限制为最多32个场景。
 - 适配器不知道动作何时结束。州仍然是`true`至少30秒。
 - 不要连续执行太快的场景。然后KLF-200可以报告错误。 （您可以在日志中找到错误。）

---

VELUX和VELUX徽标是VKR Holding A / S的注册商标。

## Changelog

#### 0.9.5
* (Michael Schroeder) Bug fixes

#### 0.9.4
* (Michael Schroeder) Compatible to Admin 3, add documentation

#### 0.9.0
* (Michael Schroeder) Initial public beta release

#### 0.0.1
* (Michael Schroeder) Initial developer release

## License
The MIT License (MIT)

Copyright (c) 2018 Michael Schroeder <klf200@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

------------------------------------------------------------------------------

VELUX and the VELUX logo are registered trademarks of VKR Holding A/S.