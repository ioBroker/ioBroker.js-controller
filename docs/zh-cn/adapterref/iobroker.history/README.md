---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.history/README.md
title: ioBroker.history
hash: crZ8qcB8BIoTrMdd0LtQmPDHmNda2enWB/Ta0DlzjIA=
---
![商标](../../../en/adapterref/iobroker.history/admin/history.png)

![安装数量](http://iobroker.live/badges/history-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.history.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.history.svg)
![测验](http://img.shields.io/travis/ioBroker/ioBroker.history/master.svg)
![NPM](https://nodei.co/npm/iobroker.history.png?downloads=true)
![保镖徽章](https://badges.greenkeeper.io/ioBroker/ioBroker.history.svg)

＃ioBroker.history
此适配器将状态历史记录保存在两个阶段的过程中。

##配置
* [英文说明]（docs / zh / README.md）
* [deutsche Beschreibung]（docs / de / README.md）

## 1.9.0（2020-01-16）
*（foxriver76）删除了adapter.objects的用法
* __需要js-controller> = 2.0.0__

### 1.8.7（2019-09-02）
*（paul53）旧文件应自动删除

### 1.8.6
*修复了一些较小的问题并优化了一些文本

### 1.8.5（2018-07-02）
*（Apollon77）在storeState中修复的错误

### 1.8.4（2018-06-24）
*（Apollon77）修复/允许禁用开始和结束值的写入

### 1.8.0（2018-06-19 / 24）
*（Apollon77）添加选项以将数据写入其他ID，从而使设备更改变得更加容易。检索数据适用于两个ID

### 1.7.4（2018-04-03）
*（AlCalzone）修复了特殊字符状态的文件名处理

### 1.7.3（2018-03-28）
*（Apollon77）尊重“永久保留”设置以保留数据点配置

### 1.7.2（2018-02-05）
*（bondrogeen）Admin3修复

### 1.7.1（2018-01-31）
*（Bluefox）Admin3修复

### 1.7.0（2018-01-17）
*（bluefox）准备使用Admin3

### 1.6.6（2017-12-20）
*（bluefox）翻译

### 1.6.5（2017-10-05）
*（Apollon77）修复了重新记录值功能

### 1.6.4（2017-08-12）
*（bluefox）添加“保存最后一个值”选项

### 1.6.3（2017-08-03）
*（Apollon77）修复了日志间隔的行为，以始终记录当前值

### 1.6.2（2017-04-07）
*修复数据类型转换

### 1.6.0（2017-02-28）
*（Apollon77）替换历史文件名中的某些字符

### 1.5.3（2017-02-22）
*（Apollon77）针对较早配置的小修正

### 1.5.2
*（Apollon77）增强了混合类型数据点的最小增量逻辑

### 1.5.1（2017-01-16）
*（bluefox）修复了适配器配置和数据点配置中浮点值的处理。

### 1.5.0（2016-12-01）
*（Apollon77）添加消息enableHistory / disableHistory
*（Apollon77）仅当值与数字的最小值不同时才添加对日志更改的支持
*（Apollon77）固定汇总计算

### 1.4.0（2016-10-29）
*（Apollon77）添加选项以重新记录未更改的值，使其更易于可视化
*（Apollon77）添加了转换器脚本以将历史数据移动到db

### 1.3.1（2016-09-25）
*（Apollon77）固定：ts被指定为val
*（bluefox）修复历史对象的选择器

### 1.3.0（2016-08-30）
*（bluefox）仅与新管理员兼容

### 1.2.0（2016-08-27）
*（bluefox）将对象名称从历史记录更改为自定义

### 1.1.0（2016-08-27）
*（bluefox）修复了最后一点的聚合
*（bluefox）聚合没有传递任何原始数据而没有任何聚合

### 1.0.5（2016-07-24）
*（bluefox）大间隔修复了聚合

### 1.0.4（2016-07-05）
*（bluefox）在几秒钟内修复了聚合

### 1.0.3（2016-05-31）
*（bluefox）如果忽略null，则在最后画线

### 1.0.2（2016-05-29）
*（bluefox）彼此切换最大值和最小值

### 1.0.1（2016-05-28）
*（bluefox）也计算“更改时”的结束/起始值

### 1.0.0（2016-05-20）
*（bluefox）更改默认聚合名称

### 0.4.1（2016-05-14）
*（bluefox）支持sessionId

### 0.4.0（2016-05-05）
*（bluefox）使用来自SQL适配器的聚合文件
*（bluefox）修复退出时的值存储
*（bluefox）每5分钟存储一次所有缓存的数据
*（bluefox）支持ms

### 0.2.1（2015-12-14）
*（bluefox）添加设置说明
*（bluefox）将聚合函数放置在单独的文件中，以实现与其他适配器的共享
*（微笑杰克）添加生成演示数据
*（微笑杰克）用自己的叉子获得历史
*（bluefox）添加storeAck标志
*（bluefox）用于onchange的模型

### 0.2.0（2015-11-15）
*（Smiling_Jack）保存并加载到适配器中，而不是js-controller中
*（Smiling_Jack）聚合数据点
*（Smiling_Jack）支持存储路径

### 0.1.3（2015-02-19）
*（bluefox）修复了历史记录中的小错误（感谢Dschaedl）
*（bluefox）更新管理页面

### 0.1.2（2015-01-20）
*（bluefox）通过配置启用保存和关闭按钮

### 0.1.1（2015-01-10）
*（bluefox）检查状态是否未删除

### 0.1.0（2015-01-02）
*（bluefox）启用npm安装

### 0.0.8（2014-12-25）
*（bluefox）支持反跳间隔

### 0.0.7（2014-11-01）
*（bluefox）存储所有更改，而不仅仅是lc！= ts

### 0.0.6（2014-10-19）
*（bluefox）添加配置页面

## Changelog

## License

The MIT License (MIT)

Copyright (c) 2014-2020 Bluefox <dogafox@gmail.com>, Apollon77

Copyright (c) 2016 Smiling_Jack

Copyright (c) 2014 hobbyquaker

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