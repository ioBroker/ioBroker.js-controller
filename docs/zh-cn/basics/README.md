---
Title: ioBroker Grundlagen
lastChanged: 02.05.2021
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/README.md
title: 无题
hash: vjFz8hLiuUe0GNoRANP+qAb+Alc7Pw1/JZ/rvJYCrHg=
---
ioBroker是一个纯软件解决方案，用于将不同的IoT系统连接到一个整体系统。因此，每个系统仍然需要一个控制中心（网关/接口），以便能够集成其设备。

在特殊情况下，可以使用软件模拟控制中心，或者将控制中心作为硬件（USB记忆棒或类似产品）插入ioBroker服务器。

##模块化
ioBroker具有模块化结构。这些模块在ioBroker上称为***适配器***。
有超过400个[适配器]用于连接各种硬件或集成各种信息，例如天气，日历等。

因此，只需在安装中安装满足个别需要的那些适配器即可。这样可以节省存储空间和计算能力。

为每个适配器创建所谓的***实例***。这些是适配器的“工作版本”。根据适配器的不同，可以创建任意数量的实例，以将不同的子系统或不同的任务区域彼此分开。

在这些情况下会进行相应的配置。

＃＃ 建筑学
＃＃＃ 服务器
ioBroker的一个特殊功能是可以在多个服务器上**分配任务。在这种情况下，人们会谈到***多主机系统***。划分的原因可能是空间分布或功率分布。

###硬件要求
ioBroker服务器几乎可以安装在任何硬件上。唯一的条件是相应操作系统存在[nodejs]的当前版本。

对于较大的安装，还建议至少2GB的RAM。具有1GB RAM的Raspberry Pi 2/3足以进行测试，因为在多主机环境中，单个适配器的从属设备甚至是较小的小型计算机也已足够。

＃＃＃ 软件
ioBroker管理数据库中的数据。数据的结构是相应组织的。

对于每个适配器，都有一个所谓的名称空间，其中包含适配器实例上的所有数据。因此，名称空间的名称例如是：*** AdapterName.0 ***

在此区域内，ioBroker创建设备，它们的通道以及它们的数据点及其值（状态）。

![对象结构](../../de/basics/../admin/media/ADMIN_Objekte_status_tree.png)

在此示例中，它是您自己的测量值的自行创建的名称空间。

[Adapter]: http://download.iobroker.net/list.html

[nodejs]: https://nodejs.org