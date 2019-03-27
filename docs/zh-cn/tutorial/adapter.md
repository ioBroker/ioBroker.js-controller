---
title: 管理适配器
lastChanged: 27.03.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/tutorial/adapter.md
hash: Htjtid2RO2WZS7rCBBwUlzON58VeeVaje9/ceh+glQY=
---
＃使用适配器的基础知识
ioBroker上的适配器和实例的安装是多层次的。

这些术语反复混淆。本页面旨在阐明如何执行ioBroker中最重要的管理任务以及它们背后的内容。

##管理任务
###安装新适配器
实际安装会将适配器使用所需的数据从服务器加载到本地主机。这些数据在安装时将保持“最新”，直到更新为止。

**关于管理员**

此功能无法通过管理员使用，在创建实例（实例化）时会自动加上前缀。

**通过控制台**

``iobroker install AdapterName``

###创建适配器实例
要在ioBroker中使用适配器，您需要此适配器的一个（或多个）实例。这些实例通过Instances选项卡在Admin中配置。

**关于管理员**

如果要创建适配器实例，可以通过单击相应适配器磁贴中“管理”选项卡左侧的（+）按钮来执行此操作。

![创建实例](../../de/tutorial/media/Instance_new.gif)

**通过控制台**

``iobroker add AdapterName``

如果适配器的必需文件尚未在主机上，则首先会自动执行iobroker安装AdapterName。只有这样才能创建实例。

***通过控制台通过npm（仅限专家！）***

``cd /opt/iobroker``

``npm install iobroker.AdapterName``

**只有在所有其他方法因任何原因无效时才应使用此版本。**

<span style="color:red">注意！在较新的安装中，直接使用npm install会在安装后导致权限问题或失败。建议使用iobroker命令。!!</span>

###升级适配器
如果有适配器的新版本，则可以更新它。适配器还需要另一个适配器的特定版本。因此，始终保持所有适配器最新是有意义的

**关于管理员**

如果升级了适配器，则相应磁贴的标题栏将变为绿色。新版本号将在“可用版本”下的磁贴上显示为绿色，并在其左侧显示升级图标。如果要立即升级此适配器，请单击此图标。

后台运行两个进程，即实际升级适配器文件，然后将文件上载到实例。

![适配器更新](../../de/tutorial/media/Adapter_upgrade.gif)

**通过控制台**

``iobroker upgrade AdapterName``

###上传适配器文件
仅在特殊情况下才需要此功能。如果使用上述过程，则不需要此功能。

只有当有经验的用户知道他们正在做什么才能自己修改文件，或者加载测试版的Github时才需要这个功能

关于管理员在选项卡管理中，必须激活专家模式。此后，图块中会显示其他图标。向上箭头（右起第3个图标）执行此上传。

![适配器更新](../../de/tutorial/media/Adapter_upload.gif)

**通过控制台**

``iobroker upload AdapterName``

###降级适配器
如果新版本出现问题，您可以再次降级适配器。

**关于管理员**

要降级，首先必须切换到专家模式，然后调出可用版本列表：

![适配器更新](../../de/tutorial/media/Adapter_downgrade.gif)

此列表显示开发人员为此功能批准的所有版本。

请点击所需的版本。

**通过控制台**

``iobroker install AdapterName@ver.si.on``

其中*** AdapterName ***是iobroker更新中列出的所需适配器的名称，*** ver.si.on ***是格式正确的版本号。

***通过控制台通过npm（仅限专家！）***

``cd /opt/iobroker``

``npm install iobroker.AdapterName@ver.si.on``

**只有在所有其他方法因任何原因无效时才应使用此版本。**

<span style="color:red">注意！在较新的安装中，直接使用npm install会在安装后导致权限问题或失败。建议使用iobroker命令。!!</span>

##其他重要信息
###管理员中的适配器列表
实际上，这里只是所选存储库中现有适配器的列表（主要设置）。此处显示的内容尚未在主机上显示。

此列表每天在服务器上的02:00更新，并在管理员调用时在线更新。如果没有与服务器的连接，无论出于何种原因，此列表仅包含已安装的适配器或根本无法加载。

###不同的安装源
一次又一次出现问题，为什么会说某个版本之一，但这不是为了更新。因此，这里有待解释的背景：

**发布适配器有三个阶段**

*存储库稳定，一切稳定并经过测试
*存储库最新，尚未完全测试
* Github，开发人员，部分<span style="color:red">测试版甚至未完成</span>

版本</ span>

如果没有太多改变，这些级别都可以具有相同的版本，但是在各种存储库或github中也可以有更大的跳转。

**要从中获取其适配器版本的存储库**在[主要设置](../admin/settings.md#Haupteinstellungen)小节的系统设置中定义。

可用的存储库列在[该资料库](../admin/settings.md#Verwahrungsorte)小节中。

** Github的开发人员或测试版**通过[Octocat符号](../admin/adapter.md#die-icons-im-einzelnen)＃5安装。

要么只是在下拉菜单*** Github ***，或通过输入选项卡下的Github存储库的地址***任何***特别是“外部”适配器开发人员。

<span style="color:red">**只有在咨询开发人员后才能安装GitHub。**</span>

###安装Github（ <span style="color:red">仅适用于专家！</span> ）
Github的安装只能由专家完成。以下是测试版本，或者更糟糕的是，未完成的版本。 <span style="color:red">他们的安装可以破坏整个ioBroker的安装！</span>

如果仍然通过GitHub（Octocat-Icon）执行更新（或建议通过论坛进行故障排除），则新文件将仅保存在本地，但不会发送到实例。因此，如果js-controller的版本低于1.5，则必须手动执行上载。

为此，必须在选项卡Admin中激活专家模式。此后，图块中会显示其他图标。向上箭头（右起第3个图标）执行此上传。