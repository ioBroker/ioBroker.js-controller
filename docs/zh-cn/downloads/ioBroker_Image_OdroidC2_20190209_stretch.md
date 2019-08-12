---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/downloads/ioBroker_Image_OdroidC2_20190209_stretch.md
title: 带有Stretch 20190209的Odroid C2的ioBroker图像
hash: iH8lwAH09suBze4A8aYWuU8K9QY0mbMjxa7TjalM9co=
---
#ioBroker图片为Odroid C2与Stretch 20190209
这是Odroid C2的最小SD卡图像。适用于4 GB以上的卡。由于它仅适用于4 GB卡，因此建议最小尺寸为8 GB。无论如何，建议使用16GB卡。

！> **注意**：Odroid C2在μSD卡上非常挑剔。他只喜欢相对轻快的牌。如果它不能立即工作，请尝试另一张卡。

解压缩映像，然后使用Win32 DiskImager程序将映像写入SD卡。为此，请在单击文件夹图标后选择文件，然后从“写入”按钮开始。强烈推荐的是Etcher。这适用于不同的操作系统。

该图像包含Armbian 5.71，基于Debian“Stretch”，自下载[https://dl.armbian.com/odroidc2/](https://dl.armbian.com/odroidc2/)后于10.01.2019开始。

创建以下用户：

 -  **用户：**`root`，**密码：** 1234
 -  **用户：**`pi`，**密码：**`raspberry`

此外，从09.02.2019开始，安装了node-js v 8.15.0，当然还有isroker和js-controller。

**仅预安装了admin和发现适配器**并创建了实例。

-----------------

*此文档反映了图像创建的状态。更新可能会导致更改。*

该图像已针对德国本地化。如果在其他环境中使用，请相应调整。 （armbian-config;工作人员）

##第一次启动后
如果第一次启动Odroid后没有提示您为root用户和新用户创建新密码，请出于安全原因执行以下操作：

 - 为了使用存储卡的完整大小，您还必须使用`sudo / usr / lib / armbian / armbian-resize-filesystem'启动文件系统。

达到SD卡的大小。

 - 可能已经有基础Linux和nodejs的更新。为了使这更新，你继续

控制台如下：`sudo apt-get update && sudo apt-get upgrade -y`

 - 务必使用`sudo passwd root`更改root密码然后输入默认密码`1234`然后输入新密码

并在下一步确认。

 - 这也适用于用户`pi`。用`sudo passwd pi'改变它然后输入默认密码`raspberry`然后输入一个新密码

输入密码并在下一步中确认。

可以使用调用的配置实用程序进行进一步设置：

`sudo armbian-config`

有关该实用程序的更多信息，请参阅[https://docs.armbian.com/User-Guide_Armbian-Config/](https://docs.armbian.com/User-Guide_Armbian-Config/)

由于在下载时创建映像可能已经有一段时间了，因此应首先检查是否已经安装了适配器和js控制器（请参阅主机选项卡）。

除了图像的最小可能尺寸之外，这也是仅预先安装了几个适配器的原因。

在这种情况下，总是先根据选项卡Hosts中的说明通过控制台运行js-controller，然后根据需要使用适配器Admin，然后是所有其他适配器。

##安装Redis
这些图像不再包含用于保存状态的数据库Redis。由于计算机较弱且RAM较低，因此在某些情况下使用Redis会大大提高性能。

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
Host of states DB (file), default[cubie]:ENTER
Port of states DB (file), default[9000]: ENTER
Host name of this machine [hostname]: ENTER
```

此处描述了在多主机系统中安装时的特殊功能：

[点击这里](config/multihost.md)

为用户iobroker发布redis backitup适配器也可以访问redis，必须为用户提供必要的权限：

`sudo usermod -a -G redis iobroker`