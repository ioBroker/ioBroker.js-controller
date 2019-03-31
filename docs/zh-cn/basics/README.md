---
Title: ioBroker Grundlagen
lastChanged: 29.03.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/README.md
title: 模块化
hash: FytBmaiv4NpTHt2T+Wgnbozj+XBc5qr7hLloB/Elo9k=
---
ioBroker是一种纯软件解决方案，可将不同的物联网系统连接到一个完整的系统。因此，每个系统也需要中央局（网关/接口），以便能够集成其设备。

在特殊情况下，这样的控制面板可以通过软件模拟，或者作为感染ioBroker服务器的硬件（USB棒或类似物）进行模拟。

＃模块化
ioBroker采用模块化结构。这些模块称为ioBroker ***适配器***。
有[超过250个适配器](http://download.iobroker.net/list.html)用于连接各种硬件或集成各种信息，如天气，日历等。

因此，只需要在安装中安装满足您个人需求的适配器。这节省了存储空间和计算能力。

对于每个适配器，创建所谓的***实例***。这些是适配器的“工作版本”。根据适配器，可以创建任意数量的实例，以区分不同的子系统或不同的任务区域。

相应的配置发生在这些实例中。

＃架构
##服务器
ioBroker的一个特殊功能是，任务也可以分发到多个服务器** **。在这种情况下，人们会谈到***多主机系统***。划分的原因可能是空间或配电。

###硬件要求
ioBroker服务器几乎可以安装在任何硬件上。唯一的条件是对于相应的操作系统存在当前版本的[的NodeJS](https://nodejs.org)。

对于较大的安装，还建议使用至少2GB的RAM。对于测试，具有1GB RAM的Raspberry Pi 2/3就足够了，作为多主机环境中单个适配器的从属设备，有时甚至更小的小型计算机就足够了。

##软件
ioBroker管理数据库中的数据。因此，组织了数据的结构。

每个适配器都有一个所谓的命名空间，其中包含有关适配器实例的所有数据。因此，名称空间的名称例如是：*** AdapterName.0 ***

在此范围内，ioBroker使用其值（状态）创建设备，其通道及其数据点。

![对象结构](../../de/basics/../admin/media/ADMIN_Objekte_status_tree.png)

此示例是您自己的度量标准的自创名称空间