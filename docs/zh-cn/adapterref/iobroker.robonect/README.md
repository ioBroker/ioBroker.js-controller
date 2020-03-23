---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.robonect/README.md
title: ioBroker.robonect
hash: 2g+4CkiBh7gPjDcSVR5f3KIb1fznPovNq5EAee0reqs=
---
![商标](../../../en/adapterref/iobroker.robonect/admin/robonect.png)

![建立状态](https://travis-ci.org/braindead1/ioBroker.robonect.svg?branch=master)
![建造状态](https://ci.appveyor.com/api/projects/status/yl79oamamifjvqrq?svg=true)
![安装数量](http://iobroker.live/badges/robonect-stable.svg)

＃ioBroker.robonect
这是用于启用了Robonect HX的割草机的ioBroker适配器。它已经通过Robonect v1.1b（带有ZeroConf v1.4）和Gardena R70Li进行了测试。

##设置
*必须输入Robonect模块的IP地址。如果设置了用户名和密码，则也是必需的。
* ioBroker.robonect以不同的时间间隔轮询数据：默认情况下，状态信息每60秒（1分钟）被轮询一次，而其他信息则每900秒（15分钟）被轮询一次。
*对于每个API请求，都可以选择轮询间隔（状态或信息）或完全不轮询。

＃＃ 控制
###模式
可以通过更改robonect.0.status.mode来控制割草机的模式。可能的模式是“自动”，“主页”，“手动”，“一天结束”和“作业”（目前尚未完全实现）。

###扩展
可以控制Robonect模块的扩展GPIO 1，GPIO 2，OUT 1和OUT 2。要求是通过Robonect Web-UI将扩展方式配置为“ API”。例如，如果将LED连接到OUT1，则可以通过将Robonect.0.extension.out1.status设置为“ true”或“ false”，在晚上将其打开，在早晨将其关闭。

## Changelog
### 0.0.9
* (braindead1) adapter improvements

### 0.0.8
* (braindead1) fixed some issues caused by different configurations

### 0.0.7
* (braindead1) prepared adapter for latest repository

### 0.0.6
* (braindead1) fixed minor issues

### 0.0.5
* (braindead1) updated to work with Robonect HX version 1.1b

### 0.0.4
* (braindead1) updated to work with Robonect HX version 1.0 Beta5

### 0.0.3
* (braindead1) support of Admin3

### 0.0.2
* (braindead1) updated to work with Robonect HX version 1.0 Beta2

### 0.0.1
* (StefSign) initial commit

## License
The MIT License (MIT)

Copyright (c) 2020 braindead1

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