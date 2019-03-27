---
title: 主机
lastChanged: 27.03.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/admin/hosts.md
hash: d3PABjsuRtz+kpLVyvABYXMrXPSerSkOVGM0IStX7no=
---
＃页面主机
此处显示可用的主机。

![页面主机](../../de/admin/media/ADMIN_Hosts_numbers.png)

在标准系统中，只有一个主机。在一个多主机系统中根据几个。

##标题栏
标题栏包含最重要流程的图标。每个图标都有一个上下文帮助。只需将鼠标停留在图标上一段时间即可。

###详细图标：
** 1.）切换视图**

使用此按钮，您可以在平铺视图和列表视图之间切换（切换功能）

** 2.）获取更新**

要检查是否有js-controller的更新，您可以单击此按钮。如果有更新，则在菜单栏的*** Hosts ***项中，出现与要更新的主机对应的编号，并在可用的图块中显示新版本。

** 3.）过滤器**

在此字段中，您可以根据自己的意愿过滤主机列表

##页面内容
在页面上枚举现有主机。

对于每个主机，存在一个区块（列表视图中的一行），其中显示相应主机的数据。

以下图标用于管理主机：

** 4.）编辑**

这里可以更改主机的名称。此名称必须是唯一的。

** 5.）重启主机*

使用此按钮，可以重新启动相应的主机。单击它对应于reboot命令。

** 6.）删除主机**

此按钮仅适用于从站。如果已从多主机环境中删除了从属设备，则也可以删除属于该主机的所有对象。

** 7.）控制器更新**

如果设置存储库的js-controller更新，则会显示另一个图标：

![控制器更新](../../de/admin/media/ADMIN_Hosts_update.png)

但是，如果单击此图标，与适配器的此图标不同，更新将无法启动，因为ioBroker必须退出。相反，会出现对进一步程序的附件。

![控制器更新说明](../../de/admin/media/ADMIN_Hosts_update02.png)