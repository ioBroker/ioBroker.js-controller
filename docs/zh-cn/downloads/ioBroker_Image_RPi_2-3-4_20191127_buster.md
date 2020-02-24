---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/downloads/ioBroker_Image_RPi_2-3-4_20191127_buster.md
title: Raspberry Pi2 / 3/4 Buster的ioBroker图像20191127
hash: VMimg5s0Ar5yl1CUlqb84IAS0AMoMcD8TCLv8whhtHw=
---
＃适用于Raspberry Pi2 / 3/4 Buster 20191127的ioBroker映像
##生成µ-SD卡
这是Raspberry Pi2，Pi3，Pi3 B +或Pi4的SD卡映像。

该映像是在具有4GB RAM的Raspberry Pi4上创建的，但也应在上述所有版本上运行。它适用于8 GB和更大的卡。但是，建议的最小大小为16 GB。
还是建议使用16GB卡，这样就不会总是写入相同的单元。

提取图像，然后使用Balena Etcher程序将其写入SD卡。 Etcher可用于各种操作系统。

##图片的组成
该图像包含Raspbian lite，该版本基于从2019年9月26日起从Debian 10“ Buster”下载的http://www.raspberrypi.org/downloads。

此外，还安装了某些适配器所需的软件包。

已创建以下用户：

*用户：`pi`，
*密码：`raspberry`

截至2019年11月27日，Node-js已安装在10.17.0版中，当然还有iobroker通过安装了js控制器** v2.1.1 **的安装程序进行安装。

这是一个**最小安装**，仅包含管理员，信息和发现适配器**。
仍然需要创建和配置其他适配器及其实例。

[这里](/tutorial/adapter.md)中描述了其他适配器及其实例的创建。

**注意！**以下说明是根据我们所知并根据创建图像时的信息而创建的。软件包或内核的更新可以随时更改某些内容。

该图像已针对德国进行了本地化。如果在其他环境中使用，请进行相应调整。 （`sudo raspi-config`; 4.）本地化选项）

##第一次启动后
首次启动Rapberry Pi后，请使用`sudo raspi-config`进行以下设置：

*第1点：“更改用户密码”（为用户Pi分配您自己的密码）

*第2点：“网络选项-主机名”（如有必要，更改Raspberry Pi的名称。默认值为“ raspberrypi”）

如果主机名更改，请在安装目录的控制台中输入`iobroker host this`

*第7点：“高级选项-扩展文件系统”（将根文件系统扩展为使用的SD卡的最大大小）

*如有必要，请在第4点：“本地化选项”下进行调整。默认设置适用于德国

##系统更新
自创建映像以来可能已经过了一段时间，所以第一件事就是更新系统。

要将Linux和nodejs更新到当前版本，请在控制台上执行以下操作：

```sudo apt-get update && sudo apt-get upgrade -y```

您还应该检查是否已安装适配器和js控制器的更新（请参见“主机”标签）。

除了图像的最小可能大小外，这也是仅预装几个适配器的原因。

在这种情况下，请始终首先根据“主机”选项卡中的指示，通过控制台运行js-controller，然后根据需要运行Adapter Admin，然后再运行所有其他适配器。

##安装Redis
这些映像不再包含Redis数据库以保存状态。在计算机性能较差和RAM较低的情况下，使用Redis在某些情况下会大大提高性能。使用速度更快的计算机，它可以减少写访问，并延长SD卡的使用寿命。

如果要安装Redis，则必须按以下方式操作当前映像。

### Redis服务器的安装
命令后：

`sudo apt install redis-server`

Redis服务器是否准备就绪，可在端口6379上使用

###将状态切换为Redis
必须在控制台中使用以下命令配置使用Redis将状态保存到ioBroker中：

`iobroker setup custom`

在下面的对话框中，输入以下内容（第4行上的注释）：

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

批准iobroker用户的Redis backitup适配器也可以访问redis，必须授予用户执行以下操作所需的权限：

`sudo usermod -a -G redis iobroker`