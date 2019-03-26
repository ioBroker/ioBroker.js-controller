---
lastChanged: 14.09.2018
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/README.md
title: 基础知识
hash: 46Emgb6RhhtKOmznvzllM65gAhQS1y+ya+CTcZGe9ME=
---
#Basics
？&gt; ***这是一张通配符***。 <br><br>帮助ioBroker并扩展这篇文章。请注意[ioBroker风格指南](community/styleguidedoc)，以便更容易采用这些更改。

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

阅读完基础知识后，用户应该能够初步了解并分配各种特定于ioBroker的术语。

目标是简短而清晰的解释，2-4行，如果有必要，整个后来重建为一个长卷轴页面。

基本文章应参考相应的详细说明。
@@@

##术语的定义
为了便于入门并了解更多帮助，以下是ioBroker中及其周围解释的最重要的术语。

*`Host`：安装ioBroker的设备
*`Adapter`：ioBroker的模块或插件，例如与硬件通信
     - 无法启动
     - 每个主机只能有一个适配器
*`Instanz`：适配器的可执行副本
     - 执行适配器提供的代码
     - 可以启动和停止
     - 可以有设置
     - 必须安装适配器才能具有适配器的实例
*`Objekt`：可以存储数据的字段
     - 大多数实例创建一个`channel`
     - `channel`是一个充当文件夹的对象
*`Aufzählung`：包含例如房间列表
*`Log`：已累积错误的协议
     - 可根据事件，实例等的严重程度进行过滤
*`Ereignisse`：对象的所有更改列表