---
title: 管理员
lastChanged: 25.03.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/admin/README.md
hash: UHSSTzB4gc5y1Sz7l0gCXlSOUZcW+YagLLDWITPD+Ks=
---
＃简介
！> **由于文档的大小，这只是一个概述，详细信息存储在通过部分标题链接到选项卡的页面中。请点击标题。**

Adapter Admin用于操作整个ioBroker安装。他提供了一个Web界面。这在``<IP-Adresse des Servers>:8081``下调用。在ioBroker的安装过程中直接创建此适配器。

![平铺视图中的管理员](../../de/admin/media/ADMIN_Adapter_Kachel.png)

适配器提供的GUI可以包括但不限于：检索以下函数：

*安装额外的适配器
*访问对象概述
*访问对象的状态概述
*访问用户和组管理
*访问日志文件
*主持人的管理

##安装
在ioBroker的安装过程中直接创建此适配器，无需手动安装

## Configuration（在Instances选项卡中）
![主要设置](../../de/admin/media/Admin_konfig_Haupteinstellungen.png)

### IP
此处输入可以到达适配器的IP地址。提供各种Ipv4和Ipv6选项。默认值为0.0.0.0。这一定不能改变！

### Port
这里，设置了可以调用管理员的端口。
如果服务器上正在运行多个Web服务器，则必须调整此端口，以便重复端口分配没有问题。

###加密
如果要使用安全协议https，则必须选中此框。

###身份验证
如果要进行身份验证，则需要放置一个钩子。

##操作
通过Web浏览器调用以下页面：``<IP-Adresse des Servers>:8081``

##骑手
管理员的主页面包含多个选项卡。在基本安装中，选项卡如图所示。安装其他适配器后，左上角的三角形图标（1）可用于添加其他选项卡。
还可以禁用车手以获得更好的概览。

带有选项卡的菜单栏可以通过** X **（2）隐藏，以在移动设备上腾出更多空间。

![管理员](../../de/admin/media/Adapter_admin_first_view_items.png)

详细信息在标题链接的页面中提供。

### [调查](overview.md)
所有具有自己的Web界面的页面和有关主机的信息都显示在此处。

### [适配器](adapter.md)
此处显示和管理可用和已安装的适配器。

### [实例](instances.md)
此处列出了已通过“适配器”选项卡安装的实例，并可进行相应配置。

### [对象](objects.md)
托管对象通过适配器集成的设备的结构和数据点。这里可以创建和删除对象。使用“向上箭头”和“向下箭头”按钮，可以上载或下载整个对象结构。

如果值显示为红色，则接收方尚未确认它们（ack = false）。

### [枚举](enums.md)
这里列出了Homematic CCU的最爱，行业和房间。

### [日志](log.md)
这里显示日志

在Instances选项卡中，可以为各个实例设置要记录的日志级别。在选择菜单中，选择要显示的最小日志级别。如果发生错误，选项卡的标签将显示为红色。

### [活动](events.md)
状态更新列表。

### [用户](users.md)
此处可以创建用户并将其添加到现有组。

### [脚本](scripts.md)
在此页面上，您可以使用javascript，Blocly或Typescript创建自己的脚本。

### [主机](hosts.md)
有关安装ioBroker的计算机的信息。如果有新版本，则菜单栏中的此条目中会显示一条注释。

##[系统设置](settings.md)（扳手图标）
在打开的菜单中，进行语言，时间和日期格式以及其他系统范围设置等设置。

也可以在此处设置存储库和安全设置。