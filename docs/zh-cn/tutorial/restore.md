---
title: 运行ioBroker Restore
lastChanged: 03.12.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/tutorial/restore.md
hash: 6M6JLNd7LLD21j0ulNOqyghHCguiQLMi21AkSJnTYyY=
---
＃ 基本
如何在Linux系统上正确还原ioBroker安装？

＃＃＃ 前言：
由于某些用户发现恢复非常困难，因此应该提供有关崩溃后，硬件更改，系统更改或进行其他操作后进行恢复的逐步说明。

基本上，您可以事先说一件事：如果正确执行还原，则可以在几分钟内完成还原，而无需担心。

最后，所有数据都可以再次使用，并且已经建立了一个新系统。

###准备：
可执行的ioBroker安装对于准备工作至关重要。

有两种方法可以做到这一点。
可以从[下载区](https://www.iobroker.net/#de/download)中获取完成的映像，然后根据此[手册](https://www.iobroker.net/#de/documentation/install/linux.md)设置自己的Linux操作系统并安装ioBroker。

＃＃＃ 下一步
如果旧系统已将状态和/或对象保存在Redis中，则新系统必须首先配备Redis服务器。

如果不确定是否使用Redis，并且仍然可以访问旧系统，请使用`iobroker status`命令获取所需的信息。“使用Redis时，输出如下：

```
iobroker is running on this host.

At least one iobroker host is running.

Objects type: redis
States  type: redis
```

如果以“对象”类型和/或“状态”类型编写“ redis”，则必须在新系统上安装Redis服务器。
如果两种类型都说“文件”，则不需要Redis服务器。

如果您不再有权使用旧系统，并且不知道之前的配置是什么，那么您绝对应该提前安装Redis服务器。

#### Redis已安装：
为此，请通过腻子转到终端并执行以下命令：

```
sudo apt-get update
sudo apt-get install redis-server
sudo usermod -a -G redis iobroker
sudo reboot now
```

如果您没有系统的所有权限，那么下一步是运行安装程序修复程序。
此步骤仅是建议，并非绝对必要。

```
curl -sL https://iobroker.net/fix.sh | bash –
```

使用小型工具“ htop”，您可以很好地看到所有正在运行的进程，这不仅对还原很有趣，而且通常很有用。
安装如下：

在控制台中运行以下命令：

```
sudo apt-get install htop
```

完成此操作后，即可进行实际还原。

###恢复：
也有2个选项：

#### ** 1。通过备份自动还原**
由于此处不需要Linux知识，并且整个操作都是通过Iobroker Web界面完成的，因此首先使用[把它备份](https://github.com/simatec/ioBroker.backitup/blob/master/README.md)进行自动还原的变体。

为此，必须安装适配器Backitup。
这是通过“适配器”选项卡完成的。在此处搜索Backitup，然后使用（+）安装实例。

安装完成后，您可以使用sftp程序（如FileZilla或WinSCP）将以前由旧系统创建的“ ioBroker备份”保存在新系统中，该文件位于/ opt / iobroker / backups路径中。

Backitup也可以从NAS，Dropbox或Google Drive进行还原，但是本地变体出现问题的可能性最小。

如果您已经具有安装NAS的经验，那么也可以使用它，尤其是因为您可以直接访问旧安装的现有目录。
但是，本教程指的是本地存储的备份。

如果已成功保存ioBroker Backup，则现在将打开“备份”并打开“还原”选项卡。
在此处，将“备份源”设置为“本地”，然后将其保存。

![还原标签](../../de/tutorial/media/restore/1575301096581-restoretab.jpg)

如果要在还原后自动启动所有实例，则必须激活然后保存“还原后启动所有适配器”选项。
如果要在另一台主机上还原备份，则不应使用此选项，因为在启动各个实例之前可能必须调整IP地址。

保存后，可以使用“检索备份”按钮在本地路径上调用现有备份。

您刚刚通过FTP复制的备份应出现在“ iobroker”下的列表中。
现在选择这个。

![选择备份](../../de/tutorial/media/restore/1575301146928-restoreliste.jpg)

选择之后，将出现一条消息，指示iobroker将停止进行还原，然后重新启动。

![开始还原](../../de/tutorial/media/restore/1575301175231-restorestart.jpg)

在这里，您开始了实际的还原过程。

![还原正在运行](../../de/tutorial/media/restore/1575301208033-restore.jpg)

现在，将在浏览器中打开另一个选项卡，您可以在其中使用Backitup WebUI中的恢复过程，就像在控制台上一样。

![restoreWebUI.JPG](../../de/tutorial/media/restore/restoreWebUI.JPG)

成功完成还原后，您还将在还原的WebUi中收到消息。

![restoreWebUI_finish.JPG](../../de/tutorial/media/restore/restoreWebUI_finish.JPG)

恢复可能需要一些时间，具体取决于系统性能和旧ioBroker安装的大小。
通常，还原应在大约10-15分钟后完成，并且ioBroker应该自动重新启动。

![恢复完成](../../de/tutorial/media/restore/1575301228008-restorefinish.jpg)

在极少数情况下，还原后ioBroker不会自动启动。
在这种情况下，您可以通过控制台使用以下命令手动启动iobroker。

```
iobroker start
```

现在，ioBroker应该再次启动，并且“日志”选项卡显示npm当前正在重新安装旧系统上安装的所有适配器。

在这里，您必须要有耐心，让iobroker来做。
在实例中，您可以看到逐渐安装了哪些适配器。
仍在安装或保留的所有适配器在实例中都没有图标。
请不要重新启动ioBroker，最多不时使用F5更新视图，直到所有实例都带有图标为止。

根据安装的大小以及计算机和Internet连接的速度，这可能很容易花费2-3个小时。

恭喜，新安装的系统现已完成，其中包含所有设置，脚本，可视化等。

使用Backitup，现在有可能恢复更多的数据，前提是这些数据也已预先备份在旧系统上。
您可以按照上述相同步骤还原Redis数据库，Zigbee数据库，mySql数据库和您的历史记录数据。

在示例中，检索到的备份列表将如下所示。

![完整清单](../../de/tutorial/media/restore/1575362131512-fullliste.jpg)

*****************************************************************************************************************************************

#### ** 2。使用终端命令手动还原**
首先，必须通过Putty或类似的命令发送一些命令。

首先，必须创建一个备份文件夹：

```
sudo mkdir /opt/iobroker/backups
```

这里也有一个sftp程序，例如FileZilla或WinSCP是在旧系统上创建的备份，可能还包括Redis备份，zigbee备份等。
存储在文件夹/ opt / iobroker /备份中。

如果状态和对象已保存在Redis数据库中，则应首先在此处还原保存的Redis数据库。
如果只有州在Redis下运行，则不必一定要事先这样做。

如果完成此操作，请按照以下步骤停止ioBroker：

```
iobroker stop
```

然后，请使用以下命令检查是否一切都已停止：

```
iobroker status
```

如果所有输出均正确并且iobroker已停止，则现在可以使用以下命令通过控制台执行还原：

```
cd /opt/iobroker
iobroker restore <Dateiname eures Backups>
```

！> **使用此方法只能还原一个ioBroker备份，这一点非常重要。
无法使用此命令**创建Redis备份，Zigbee备份，mySql备份或历史记录数据。

为此需要Backitup，因为这些是使用Backitup专门创建的。

现在可能要花几分钟，具体取决于您的系统。进度显示在终端中。
还原完成后，使用以下命令重新启动ioBroker：

```
iobroker start
```

在这里，ioBroker现在也可以通过npm重新安装所有适配器。
这可能需要一段时间，具体取决于安装大小，互联网速度和系统性能。
可以在“日志”选项卡中跟踪当前状态。

现在已完成，重新安装了系统，并还原了所有设置，脚本，可视化文件等。

###结论：
基本上，两个变体都会导致相同的结果。
如果您几乎没有使用终端命令的经验并且感到不安全，那么Backitup会让您感到安全。

但是，如果要确切查看系统上发生的情况，则应通过控制台选择手动变量。在这里，您可以在终端中详细查看每个流程。