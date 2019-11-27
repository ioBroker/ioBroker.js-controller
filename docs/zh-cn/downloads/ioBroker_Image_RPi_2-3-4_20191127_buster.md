---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/downloads/ioBroker_Image_RPi_2-3-4_20191127_buster.md
title: Raspberry Pi2 / 3/4 Buster的ioBroker图像20191127
hash: FK1FYRcyPvZIVS+M8eiw+wTnwmhbNAjRkBIsAXN23OA=
---
＃ioBroker图像用于Raspberry Pi2 / 3/4 Buster 20191127
##创建μ-SD卡
这是Raspberry Pi2，Pi3，Pi3 B +或Pi4的SD卡映像。

该映像是在具有4GB RAM的Raspberry Pi4上创建的，但也应在所有提及的映像上运行。适用于8 GB及更大的卡。但是，建议的最小大小为16 GB。
还是建议使用16GB卡，这样一来，描述的单元格就不会总是相同。

将图像解压缩，然后使用Balena Etcher程序将其写入SD卡。 Etcher可用于不同的操作系统。

##图片的组成部分
该图像包含Raspbian lite，该版本基于Debian 10“ Buster”（基于26.09.2019），可从http://www.raspberrypi.org/downloads下载。

此外，还安装了某些适配器所需的软件包。

创建了以下用户：

*用户：`pi`，
*密码：`raspberry`

截至2019年11月27日，Node-js已安装在10.17.0版中，当然还有iobroker通过js-controller **v2.1.1** 安装程序进行安装。

这是仅包含管理，信息和发现适配器的**最小安装**。
仍然必须创建和配置其他适配器及其实例。

[这里](/tutorial/adapter.md)中描述了创建其他适配器及其实例的过程。

**注意！**根据我们所知，在创建图像时会根据以下说明进行操作。软件包或内核的更新可以随时更改任何内容。

该图像已针对德国进行了本地化。如果在其他环境中使用，请进行相应的调整。 （`sudo raspi-config`; 4.）本地化选项）

##第一次启动后
Rapberry Pi首次启动后，请使用`sudo raspi-config`进行以下设置：

点1：`Change User passwort`（分配给用户的专有密码`Pi`）点2：`Network Options – Hostname`（如有必要，请更改Raspberry Pi的名称）如果更改了主机名，则默认值为`raspberrypi`是，然后请在控制台中的安装目录`iobroker host this`中输入第7点：`Advanced Options – Expand filesystem`（将根文件系统扩展到使用的SD卡的最大大小）可能仍在第4点：§§SSSSS_6§进行调整。默认设置适用于德国

##系统更新
由于自下载时创建映像以来可能已有一段时间，因此您应该首先更新系统。

要使Linux和nodejs保持最新版本，可以在控制台上执行以下操作：

```sudo apt-get update && sudo apt-get upgrade -y```

另外，您应该检查是否已安装适配器和js控制器的更新（请参阅“主机”选项卡）。

除了图像的最小可能大小外，这也是仅预装几个适配器的原因。

在这种情况下，请始终首先根据“主机”选项卡中的指示通过控制台运行js-controller，然后根据需要运行适配器Admin，然后再运行所有其他适配器。

##安装Redis
这些映像不再包含用于保存状态的数据库Redis。由于计算机性能较差且RAM较低，因此在某些情况下使用Redis可以显着提高性能。使用速度更快的计算机，它可以减少写访问，从而延长SD卡的寿命。

如果要安装Redis，则必须按照以下步骤操作当前映像。

###安装Redis服务器
在命令之后：

`sudo apt install redis-server`

如果Redis服务器已准备就绪，则在端口6379上可用

###将状态切换到Redis
必须在控制台中使用以下命令配置使用Redis将状态存储在ioBroker中：

`iobroker setup custom`

在随后的对话框中，输入以下内容（第4行中的“注意”）：

```
Type of objects DB [file, couch, redis], default [file]: ENTER
Host of objects DB(file), default[127.0.0.1]: ENTER
Port of objects DB(file), default[9001]: ENTER
Type of states DB [file, redis], default [file]: r ENTER
Host of states DB (file), default[HostName]:ENTER
Port of states DB (file), default[9000]: ENTER
Host name of this machine [hostname]: ENTER
```

在多主机系统中安装时的特殊功能如下：

[点击这里](config/multihost.md)

为用户iobroker发布Redis backitup适配器也可以访问redis，必须通过以下方式为用户提供必要的权限：

`sudo usermod -a -G redis iobroker`