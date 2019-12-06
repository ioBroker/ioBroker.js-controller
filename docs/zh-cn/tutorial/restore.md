---
title: ioBroker恢复
lastChanged: 03.12.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/tutorial/restore.md
hash: PdKXVqljYzqz8sIsT9661nR4t5rhUnRIN98FYdrp0w8=
---
＃基础
如何在Linux系统上正确还原ioBroker安装？

###前言：
由于某些使用“还原”的用户非常努力，因此，这里提供了有关崩溃后，甚至在硬件更改，系统变更或其他帮助之后进行还原的分步说明。

原则上，人们可以事先说一件事：在几分钟之内正确执行就可以完成还原，而无需担心。

最后，所有数据都可以再次使用，并且已经建立了一个新系统。

###准备：
准备过程中绝对需要可执行的ioBroker安装。

为此，有两种方法。
在[说明](https://www.iobroker.net/#de/documentation/install/linux.md)之后，可以从[下载区](https://www.iobroker.net/#de/download)中获取完成的映像，设置自己的Linux操作系统并安装ioBroker。

###下一步
如果旧系统已将状态和/或对象存储在Redis中，则新系统必须首先配备Redis服务器。

如果不确定是否已使用Redis并仍然可以访问旧系统，请使用以下命令检索所需的信息：`iobroker status`“使用Redis时，输出如下所示：

```
iobroker is running on this host.

At least one iobroker host is running.

Objects type: redis
States  type: redis
```

如果对象类型和/或状态类型为“ redis”，则必须在新系统上安装Redis服务器。
如果两种类型均为“文件”，则不需要Redis服务器。

如果您无法再访问旧系统并且不知道以前配置的内容，则无论如何都应预先安装Redis服务器。

#### Redis已安装：
要在终端中检查腻子并执行以下命令：

```
sudo apt-get update
sudo apt-get install redis-server
sudo usermod -a -G redis iobroker
sudo reboot now
```

接下来，如果不是所有权限都适合该系统，则应遍历安装程序修复时间。
此步骤仅是建议，并非强制性的。

```
curl -sL https://iobroker.net/fix.sh | bash –
```

使用小型工具“ htop”，您可以很好地看到所有正在运行的进程，这不仅对于还原感兴趣，而且对于一般还原很有用。
将按以下方式安装：

在控制台中，运行以下命令：

```
sudo apt-get install htop
```

完成此操作后，它可能会恢复到实际状态。

###恢复：
也有2个选项：

#### ** 1。使用Backitup自动还原**
由于此处不需要Linux知识，因此通过Iobroker的Web界面进行的整个操作首先是使用[BackItUp中](https://github.com/simatec/ioBroker.backitup/blob/master/README.md)进行自动还原的变体。

为此，必须安装适配器Backitup。
这可通过选项卡“适配器”完成。在其中查找Backitup，然后在（+）处安装实例。

安装完成后，您可以使用sftp程序（例如FileZilla或WinSCP）将以前从旧系统“ ioBroker Backup”创建的新文件放在/ opt / iobroker / backups路径中。

Backitup也可以从NAS，Dropbox或Google云端硬盘执行还原，但是本地变体出现问题的机会最少。

如果您已经具有从NAS进行安装的经验，那么也可以轻松地使用它，尤其是因为这样您就可以直接访问旧安装的现有目录。
但是，本教程指的是本地保存的备份。

如果已成功保存ioBroker Backup，则将打开Backitup，然后将打开“还原”选项卡。
在此处，将“备份源”设置为“本地”，然后保存。

![还原标签](../../de/tutorial/media/restore/1575301096581-restoretab.jpg)

如果要在还原后自动启动所有实例，则必须激活“还原后启动所有适配器”选项，然后再保存。
如果将备份还原到另一台主机，则不应使用此选项，因为在启动每个实例之前可能需要调整IP地址。

保存后，可以使用“获取备份”按钮来检索本地路径上的现有备份。

刚通过FTP复制的备份应出现在“ iobroker”下的列表中。
现在选择这个。

![选择备份](../../de/tutorial/media/restore/1575301146928-restoreliste.jpg)

选择后，有指示iobroker已停止以进行还原，然后重新启动。

![开始还原](../../de/tutorial/media/restore/1575301175231-restorestart.jpg)

在这里，您已经开始了实际的恢复过程。

![还原正在运行](../../de/tutorial/media/restore/1575301208033-restore.jpg)

这可能需要一些时间，具体取决于系统性能和旧ioBroker安装的大小。
通常，还原应在大约10-15分钟后完成，然后重新启动ioBroker。

![恢复完成](../../de/tutorial/media/restore/1575301228008-restorefinish.jpg)

如果广告没有更改，请不时使用F5更新浏览器窗口。

在极少数情况下，还原后ioBroker不会自动启动。
如果是这种情况，或者不确定还原是否仍在运行，则可以使用已安装的htop工具查看还原是否仍在运行或已经完成。
只需在终端中键入```htop```。输出应如下所示。

![HTOP](../../de/tutorial/media/restore/1575363981959-htop.jpg)

在可以通过htop显示的进程中，图像中标记的所有进程都不再可用。
如果是这种情况，则用“ F10”停止htop并通过终端执行以下命令。

```
iobroker start
```

现在，ioBroker应该再次启动，并且在“日志”选项卡中，您可以看到npm正在重新安装旧系统上安装的所有适配器。

现在，必须稍加耐心，让iobroker轻松做出。
在实例中，您可以看到逐步安装了哪些适配器。
仍在安装或等待循环中的所有适配器在实例中还没有图标。
请不要重新启动ioBroker，最多只能使用F5更新视图，直到所有实例都带有图标为止。

根据安装大小和计算机速度以及互联网连接的不同，这可能很容易花费2-3个小时。

恭喜，现在新安装的系统已完成所有设置，脚本，可视化等。

如果已将Backitup提前保存在旧系统中，则可以使用Backitup还原更多数据。
您可以使用上述相同的步骤还原Redis数据库，Zigbee数据库，mySql数据库和历史记录数据。

然后，检索到的备份列表将类似于此示例。

![完整清单](../../de/tutorial/media/restore/1575362131512-fullliste.jpg)

*****************************************************************************************************************************************

#### ** 2。使用终端命令手动还原**
首先，必须通过Putty或类似的命令发送一些命令。

首先，必须创建一个备份文件夹：

```
sudo mkdir /opt/iobroker/backups
```

同样，这之后将是一个sftp程序，例如FileZilla或WinSCP是在旧系统上创建的备份，可能还包括Redis备份，zigbee备份等。
存储在文件夹/ opt / iobroker / backups中。

如果状态和对象存储在Redis数据库中，则应首先还原备份的Redis数据库。
如果只有州在Redis的领导下进行，则不一定需要事先这样做。

完成此操作后，您将按照以下步骤停止ioBroker：

```
iobroker stop
```

之后，请使用以下命令检查是否一切都停止了：

```
iobroker status
```

如果所有问题均正确并且iobroker已停止，则现在可以使用以下命令还原控制台：

```
cd /opt/iobroker
iobroker restore <Dateiname eures Backups>
```

！> **但是，使用此方法只能还原ioBroker备份非常重要。
无法使用此命令**创建Redis备份，Zigbee备份，mySql备份或历史记录数据。

为此需要Backitup，因为它们是专门使用Backitup创建的。

现在可能要花几分钟，具体取决于系统。进度显示在终端中。
还原完成后，重新启动以下命令ioBroker：

```
iobroker start
```

同样，ioBroker将在npm上分别重新安装所有适配器。
这可能需要一段时间，具体取决于安装大小，Internet速度和系统性能。
可以在“日志”选项卡中跟踪当前状态。

现在，完成并重新安装系统，并还原所有设置，脚本，可视化文件等。

###结论：
基本上，两个变体都会导致相同的结果。
如果您对终端命令几乎没有经验，并且感到不安全，那么Backitup会让您感到安全。

但是，如果要准确查看系统上发生的情况，则应通过控制台选择手动版本。在这里，您可以在终端中详细查看每个进程。