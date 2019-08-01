---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/downloads/ioBroker_Image_Rock64_20190209_stretch.md
title: 带有Stretch 20190730的Rock64的ioBroker映像
hash: 6ASvKW7zGlCioocgoT0Wgo+ChyeXdit13HY/U3JI+sg=
---
#ioBroker用于Stretch 20190730的Rock64图像
这是Rock64的最小SD卡映像。适用于4 GB以上的卡。由于它仅适用于2 GB卡，因此建议最小尺寸为4 GB。无论如何，建议使用16GB或更大的卡，因此并不总是描述相同的单元。

解压缩图像，然后使用Balena Etcher程序将其写入SD卡。
这适用于不同的操作系统。

该图像包含Armbian 5.90，基于Debian“Stretch”，自下载[https://dl.armbian.com/rock64/Debian_stretch_default.7z](https://dl.armbian.com/rock64/Debian_stretch_default.7z)后于28.06.2019开始。

创建以下用户：

 -  **用户：** root，**密码：** 1234
 -  **用户：** pi，**密码：**覆盆子

此外，node-js v 10.16..0已安装，当然还有ibroker与js-controller截至30.07.2019。

**仅预安装了admin和发现适配器**并创建了实例。
[这里](/tutorial/adapter.md)中描述了创建其他适配器及其实例

-----------------

*此文档反映了图像创建的状态。更新可能会导致更改。*

该图像已针对德国本地化。如果在其他环境中使用，请相应调整。 （armbian-config;工作人员）

##第一次启动后
如果在第一次启动Rock之后没有要求您为root用户和新用户创建新密码，请出于安全原因执行以下操作：

 - 要使用存储卡的完整大小，你必须使用文件系统sudo`/ usr / lib / armbian / armbian-resize-filesystem`

  达到SD卡的大小。

 - 可能已经有基础Linux和nodejs的更新。为了更新这一点

在控制台上，按以下步骤操作：`sudo apt-get update && sudo apt-get upgrade -y`

 - 务必使用`sudo passwd root`更改root密码然后输入默认密码`1234`然后

输入新密码并在下一步中确认。

 - 这也适用于用户`pi`。这是通过`sudo passwd pi`后跟默认密码`raspberry`来改变的

然后输入新密码并在下一步中确认。

可以使用调用的配置实用程序进行进一步设置：

`sudo armbian-config`

有关该实用程序的更多信息，请参阅[https://docs.armbian.com/User-Guide_Armbian-Config/](https://docs.armbian.com/User-Guide_Armbian-Config/)

由于在下载时创建映像可能已经有一段时间了，因此应首先检查是否已经安装了适配器和js控制器（请参阅主机选项卡）。

除了图像的最小可能尺寸之外，这也是仅预先安装了几个适配器的原因。

在这种情况下，总是先根据选项卡Hosts中的说明通过控制台运行js-controller，然后根据需要使用适配器Admin，然后是所有其他适配器。

##安装Redis
这些图像不再包含用于保存状态的数据库Redis。由于计算机较弱且RAM较低，因此在某些情况下使用Redis会大大提高性能。使用更快的计算机，可以减少写入访问，从而延长SD卡的使用寿命。

如果要安装Redis，则必须按如下方式继续处理当前图像。

###安装Redis服务器
命令后：

`sudo apt install redis-server`

Redis服务器是否已准备好并可在端口6379上使用？

###将状态切换到Redis
必须在控制台中配置使用Redis在ioBroker中存储状态：

`iobroker setup custom`

在随后的对话框中，输入以下内容（第4行注意）：

```
Type of objects DB [file, couch, redis], default [file]: ENTER
Host of objects DB(file), default[127.0.0.1]: ENTER
Port of objects DB(file), default[9001]: ENTER
Type of states DB [file, redis], default [file]: r ENTER
Host of states DB (file), default[HostName]:ENTER
Port of states DB (file), default[9000]: ENTER
Host name of this machine [hostname]: ENTER
```

此处描述了在多主机系统中安装时的特殊功能：

[点击这里](config/multihost.md)

为用户iobroker发布redis backitup适配器也可以访问redis，必须为用户提供必要的权限：

`sudo usermod -a -G redis iobroker`