---
title: 转接头
lastChanged: 25.02.2020
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/admin/adapter.md
hash: qvQSbRQZm8KXIQYiTdmaA6YOIfFf6rsf6Qxl3hZaZ1s=
---
＃适配器选项卡
在此处显示和管理可用和已安装的适配器。

##标题行
标题栏中有最重要过程的图标。每个图标都有上下文帮助。只需用鼠标在图标上停留一会儿即可。

![管理员标签](../../de/admin/media/ADMIN_Adapter_Kachel_numbers.png)

###详细的图标：
** 1.）切换视图**

使用此按钮，您可以在平铺视图和表格视图之间切换（切换功能）

** 2.）刷新广告**

每次重新启动时，都会自动搜索更新。使用此按钮，您可以手动开始搜索或触发页面刷新。

** 3。 ）仅显示已安装的适配器**如果选择此图标，则仅显示已安装实例的适配器（切换功能）

** 4.）显示带有更新的适配器**

选择此图标时，仅显示有更新的适配器（切换功能）可更新适配器的磁贴具有绿色标题。如果没有适配器的更新，则会出现相应的消息。

标题栏中还会出现另一个图标：

![管理员标签](../../de/admin/media/ADMIN_Adapter_Kachel_upgradeable.png)

单击该图标（8）将更新所有可用的适配器。

** 5.）从您自己的URL安装适配器**

**注意：** **使用此选项可能会导致ioBroker安装问题** GitHub适配器可能无法正常工作（因为它们仍在开发中）。建议等待稳定版本而不是使用此选项。如果使用此图标来安装适配器，那么将下载不应在生产系统中使用的适配器的开发状态。

Octocat图标可用于从您自己的路径（URL或文件路径）或GitHub的预版本安装适配器。

单击此图标后，将打开一个相应的选择窗口：

![安装GitHub](../../de/admin/media/ADMIN_Adapter_GitHub.png)

在*** FROM GITHUB ***选项卡下，只需在下拉菜单中选择所需的适配器，即可安装最新的初始版本。

如果选择*** ANY ***选项卡，则可以在字段中输入任何文件路径或URL（例如，指向外部适配器开发者的URL）并安装相应的适配器。

** 6.）开启专家模式**

专家模式还允许安装较旧版本的适配器。如果选择此按钮（9），则磁贴中会出现一个附加图标，可用于安装早期版本。

![安装其他版本](../../de/admin/media/ADMIN_Adapter_Kachel_versions.png)

** 7.）过滤器**

在这里，您可以使用过滤条件搜索特定的适配器。