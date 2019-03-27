---
title: 管理员
lastChanged: 14.09.2018
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/admin/enums.md
hash: D7MAS/uEgXnpYxUjm87fT1ofzV90HsJzSj2pvxO/hY0=
---
＃枚举窗口
？&gt; ***这是一张通配符***。 <br><br>帮助ioBroker并扩展这篇文章。请注意[ioBroker风格指南](community/styleguidedoc)，以便更容易采用这些更改。

＃选项卡枚举
这里列出了最爱，行业和房间。如果有HomeMatic安装，则其中包含的列表将被接管。您也可以创建自己的列表可以在脚本中使用。

![平铺视图中的枚举](../../de/admin/media/ADMIN_Aufzaehlungen_kachel.png)

标题栏中的第一个图标可用于切换到列表视图。该视图使用如下：

![列表视图中的枚举](../../de/admin/media/ADMIN_Aufzaehlungen_liste_numbers.png)

##标题栏
标题栏包含最重要流程的图标。每个图标都有一个上下文帮助。只需将鼠标停留在图标上一段时间即可。

###详细图标：
** 1.）切换视图**

使用此按钮，您可以在平铺视图和列表视图之间切换（切换功能）

** 2.）创建一个新列表**

使用此按钮可以创建新的枚举。这将打开一个新窗口

![创建一个新的枚举](../../de/admin/media/ADMIN_Aufzaehlungen_liste_erstellen.png)

**姓名**

此处输入所需的枚举名称。或者，也可以将此枚举的图标拖放到此字段中。

** ID保留**

创建新枚举时，默认情况下取消选中此复选框，因为此处创建了新ID。

在现有枚举的编辑模式（s.u。）中，您可以更改不带ID的名称。

** **预览

此处显示枚举的完整ID。

** **彩

此时，可以选择用于标记枚举的颜色。

在图块视图中，图块以此颜色着色，在列表视图中，带有此颜色的枚举名称的行带有下划线。

** 3.）创建一个新类别**

使用此按钮，可以创建类似于枚举的新类别（例如函数/房间等）。

** 4）编辑**

通过此按钮，枚举的数据点可能已过时。首先，用鼠标单击标记所需的枚举，然后激活编辑模式。

屏幕现在分为两部分：

![编辑枚举](../../de/admin/media/ADMIN_Aufzaehlungen_liste_hinzufuegen.png)

右半部分的构造对应于[对象页](opbjects.md)的构造。

通过将数据点拖动到左侧所需的列表中，可以从右侧拖动数据点。

枚举中删除数据点是通过垃圾桶图标完成的