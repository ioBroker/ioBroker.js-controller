---
title: 可视化
lastChanged: 11.08.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/viz/vis.md
hash: jhqCx3JWJrpTK1iXzcCVHrIJcZgFdkRTJhUR65z4jKo=
---
#VIS可视化
##一般
@@@ VIS是一个功能强大的应用程序，需要详细的说明和教程。本手册的形式和位置尚未定义。
@@@

## [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-vis#konfiguration)
##配置
不需要配置适配器。只能有一个VIS实例。

* * *

##[](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-vis#bedienung)Operation
通过`<IPdesServers>:8082/vis/index.html`调用适配器并显示可视化。
项目中有几个视图。
在每个视图上，可以再次自由放置几个小部件，这些小部件用于显示或操作。
要创建和配置可视化，您必须加载**编辑器**。
编辑器通过`<IPdesServers>:8082/vis/edit.html`或通过管理适配器的Instances选项卡中的超链接调用。
通过关闭窗口图标（右上角的（x））关闭编辑器后，最后编辑的视图将显示在功能视图中。
这可以随时使用§§SSSSS_2§来调用。编辑器分为不同的区域。
![概观](../../de/viz/media/vis_ioBroker_vis_Editor_002-300x165.jpg)

* * *

##头部区域的车手（1）
###观看
如果选择此选项卡，则可以从下面下拉菜单中的现有下拉菜单中选择要编辑的视图。
![iobroker_vis_Editor_Views_Header](../../de/viz/media/iobroker_vis_Editor_Views_Header.jpg)右边的四个图标是不言自明的，并参考了视图。
单击工作区域后，右侧属性侧栏中的视图将更改为“视图”选项卡，并显示视图的设置。

###小部件
如果激活了选项卡窗口小部件，则基础工具栏会更改.![iobroker_vis_Editor_Widgets_Header](../../de/viz/media/iobroker_vis_Editor_Widgets_Header.jpg)将显示用于编辑窗口小部件的工具。

####下拉菜单
您可以在此处选择要编辑的小部件，或者在此处显示所选小部件。

####图标栏
选择窗口小部件时，删除，复制和信息的三个图标将变为活动状态。

####对齐小部件
![](../../de/viz/media/iobroker_vis_Editor_Widgets_Ausrichten_Header.JPG)如果您在按下鼠标按钮（或按住Ctrl键单击）的情况下选择多个小部件，则可以使用这些图标对齐组（左对齐，右对齐，齐平顶部，底部齐平，居中，中心垂直对齐）。
此外，您可以使用相同的距离（水平和垂直）定位多个小部件，以及使用最后两个图标调整多个小部件的大小。
如果选择窗口小部件，则右侧“属性”侧边栏中的视图将更改为“窗口小部件”选项卡，并显示此窗口小部件的设置。
通过多种选择的可能性，您可以同时更改右侧边栏上的多个小部件的属性。

####所有小部件
这两个小部件用于更轻松地编辑视图。
第一个确保窗口小部件的值不会更新，第二个窗口可以防止移动窗口小部件。

####导出小部件
如果激活了窗口小部件，则可以使用此按钮导出窗口小部件的CSS代码。

####导入小部件
相反，例如，可以在这里导入不在vis范围内的小部件。
单击窗口小部件后，右侧属性侧栏中的视图将更改为窗口小部件选项卡，并显示所选窗口小部件的设置。

###工具
如果激活了工具选项卡，则底层工具栏会更改.![](media/iobroker_vis_Editor_Tools_Header.JPG)显示便于编辑[查看](http://www.iobroker.net/?page_id=1193&lang=de)的工具

####决议
以下是移动设备显示的许多预设屏幕分辨率，而且“用户定义”点可以进行自己的设置。
如果您在此处选择某些内容，将在桌面上绘制一个与所选屏幕分辨率对应的框架。

####默认
如果选中了_default_，则激活的[视图](http://www.iobroker.net/?page_id=1193&lang=de)成为默认视图，并在VIS视图（参见[项目](http://www.iobroker.net/?page_id=188&lang=de&preview_id=188&preview_nonce=d845a20ee2&preview=true#Projekt)）加载了上面设置的分辨率时加载。
**示例：**选择了显示_iPad Portrait_，并在_Start_视图中选中了_Default_框。
假设项目现在在iPad上以横向格式加载名为_Weather_的视图。
如果iPad现在旋转为纵向，则将自动显示先前为此分辨率（纵向）定义的默认（_default_）的_Start_视图。
例如，可以使用相应的可移动设备“移回主菜单”或_hoch_显示除_quer之外的视图。

#### Grid
这里有_inaktiv _，_Elemente_和_Raster_的可能性。如果选择元素，则在使用鼠标移动到相邻元素时，小部件会捕捉。使用Raster，您可以指定网格大小（以px为单位），然后将小部件捕捉到位。

####实例ID
这里，显示唯一的ID，例如，通过VIS[控制命令](https://github.com/iobroker/ioBroker.vis/blob/master/README.md#control-interface)可以用脚本来解决。

####浏览器ID
如果单击此按钮，将在上一个字段中创建新ID。这使得每个浏览器在每个设备上都可以单独识别。

出口####
例如，您可以在此处导出视图在另一个安装中使用。单击该按钮将打开一个窗口，其中以文本形式提供视图。可以使用Ctrl-C将这些数据放入剪贴板并加载到编辑器中然后保存

导入####
单击空窗口后打开。在这里，您可以复制通过函数_export_获得的文本文件。然后在左下角输入视图的名称，然后单击按钮_importieren_。从那里，可以获得新视图。此功能对于从论坛导入示例非常有用。

###设置
![](../../de/viz/media/iobroker_vis_Editor_Setup_Header.gif)

####主题
这是编辑器可供选择的配色方案。

####语言
可以指定编辑器的操作语言

####项目
项目是[查看](http://www.iobroker.net/?page_id=1193&lang=de)的集合。
默认情况下，项目_main_已创建，并通过`<IPdesServers>:8082/vis/index.html#ViewName`进行调用。
项目的文件位于文件夹`_ioBroker-Ordner_/iobroker-data/files/vis.0/main`中的ioBroker安装中。

####项目导出/导入
项目可以作为一个整体导出（例如，与其他用户共享）：创建一个zip文件，其中包含使用的图像，vis-user.css样式表和实际的vis-views.json定义。
此外，还可以选择匿名导出项目。 ：构造：要导入其他项目，只需将上述导出的zip文件拖到窗口上，然后输入新项目的名称：![](../../de/viz/media/iobroker_vis_Editor_Setup_Projekt_ImportHeader.gif)

####新项目......
在这里，您可以创建一个新项目。
将打开一个窗口，要求您输入项目名称。
确认后，编辑器在此地址加载新项目：`<IPdesServers>:8082/vis/_projektname_/index.html#ViewName.`新项目的文件可在`_ioBroker-Ordner_/iobroker-data/files/vis.0/projektname`下的ioBroker安装中找到。
**提示**：您可以复制项目文件夹并在VIS编辑器`<IPdesServers>:8082/vis/_projektname_duplikat_/index.html`中编辑副本。

####申请
加载项目时，所有[视图]：构建:( http://www.iobroker.net/?page_id=1193&lang=en）此[项目]：构造：（http://www.iobroker.net/?page_id = 188＆lang = DE＆preview_id = 188＆preview_nonce = d845a20ee2＆preview = true #project）。
有时这没有意义并且会减慢系统速度。
因此，可以总结在不同项目中属于一起的视图。
例如，分离具有不同屏幕分辨率的设备是有意义的。
因此，您可以创建项目_Smartphone_并创建针对触摸操作和垂直对齐优化的视图。
由于小部件的故意减少，项目在数据量方面仍然很小，因此也在快速加载（例如通过VPN和便携式无线电）。
另一个项目_Wandtablet_，只显示在墙上的平板电脑上，不需要从_Smartphone _项目加载视图。
显示所有数据的主项目_main_通常仅从台式PC显示和编辑。
这里的数据量和计算速度通常无关紧要。
如果要在多个项目中使用视图，可以使用命令[出口](http://www.iobroker.net/?page_id=188&lang=de&preview_id=188&preview_nonce=d845a20ee2&preview=true#exportieren)：construction：/[进口](http://www.iobroker.net/?page_id=188&lang=de&preview_id=188&preview_nonce=d845a20ee2&preview=true#importieren)：construction：复制它们。
通过导航小部件从一个项目链接到另一个项目是不可能的。
**提示**：在试验CSS命令时创建测试项目可能也很有用。

####档案管理员......（6）
选择此菜单项后，可以轻松地将文件复制或复制到ioBroker文件系统，而无需其他程序。
文件管理器打开：![align =“aligncenter”width =“799”](media/iobroker_vis_Editor_Setup_Dateimanager.JPG)[caption id =“attachment_6007”align =“aligncenter”width =“799”] [![]（图/ ioBroker_Adapter_Vis_Editor_Setup_filemanager.jpg）](../../de/viz/img/ioBroker_Adapter_Vis_Editor_Setup_filemanager.jpg)*图像仅为样本图像，并且各自公司拥有版权。 /字幕]

该行为类似于任何文件管理器。
使用蓝色按钮“向左箭头”可以通过单击其中的文件夹来更高级别。
使用图标“Folder +”可以创建新文件夹。
到达所需目录后，选择一个文件，可以使用计算器上的蓝色箭头下载，单击绿色箭头，然后打开“Dropbox”。
![](../../de/viz/media/iobroker_vis_Editor_Setup_Dateimanager_Dropbox.JPG)可以在此处简单地拖放文件，然后通过单击_ ** Upload ** _按钮将其加载到ioBroker服务器上。
或者，您也可以单击该区域中的某个位置，然后打开文件选择。
文件列表清空自己，如果没有其他文件上传，则将Dropbox留在按钮** _ close _ **上。

####设置......（7）
![](../../de/viz/media/iobroker_vis_Editor_Setup_Projekteinstellungen.JPG)

* _ **如果没有连接长度，则重新加载：** _活动视图完全重新加载，

如果前端（平板电脑）与服务器之间的连接中断时间超过预设时间。
为了防止这种情况，这个时间也可以设置为_ **never** _。

* _ **重新连接间隔：** _从前端尝试的时间

到达服务器。

* _ **黑暗重新连接屏幕：** _通常在尝试重新加载视图时页面为白色。

为了不在暗室中打扰这个，可以使用此复选框将屏幕切换为暗。

* _ **从RAM中删除不活动视图：** _要在前端保存宝贵的内存，

对于低成本平板电脑通常只有1GB，不再需要的视图可以从RAM中删除。
但是，重新加载相应的视图时，这需要更长的时间。
此选项设置未使用的视图应保留在RAM中的时间。

####对象浏览器......（8）
![](../../de/viz/media/iobroker-vis_ioBroker_Adapter_Vis_Editor_Setup_objectbrowser.jpg)在这里你可以搜索一个对象。
单击按钮后将其放入剪贴板_ **选择** _。
为了更快地检索，可以使用列标题上方的过滤字段。

###帮助（5）
在这里，您将找到_Shortcuts_下的关键命令的概述以及关于project_的_下的简短信息。

###撤消按钮（6）
使用此按钮，您可以逐步撤消上一个操作。

* * *

小组侧栏（＃2）
它用于选择小部件。
窗口小部件显示为图标，可以拖放到桌面上，也可以使用桌面位置0.0的_Insert_按钮定位。
![iobroker_vis_Editor_Widgets_sidebar](../../de/viz/media/vis_iobroker_vis_Editor_Widgets_sidebar.jpg)按钮_Insert_下的字段是一个过滤字段。
在这里，您可以输入一个术语，然后搜索图标。
将显示包含此术语的所有图标。
如果删除最后一个过滤器（或\ *），则会得到一个包含可能搜索词的下拉列表。
下面是小部件集的选择框。
星号（*）代表所有小部件集。
过滤术语时，会自动搜索所有窗口小部件集。
但是，否则，下拉菜单还会将各种窗口小部件集作为过滤器提供。

* * *

##工作面（3）
这是视图的小部件所在的位置。这可以使用鼠标或箭头键完成。
如果选项卡窗口小部件处于活动状态，则还可以使用一些对齐帮助。

* * *

##设置边栏（4）
这里通过相应的选项卡输入视图和小部件的所有设置。
此外，CSS选项卡为高级用户提供了集成自己开发的机会。

*数据点分配
*小工具大小
*字体大小和颜色
*背景
*框架，线条颜色，款式，厚度
* css参数

要显示数据点或执行操作，必须将数据点分配给窗口小部件。
此条目可在_General_部分中找到。