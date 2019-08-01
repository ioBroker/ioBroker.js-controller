---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/downloads/ioBroker_Image_RPi_2-3-4_piVCCU_20190723_buster.md
title: 用于Raspberry Pi2 / 3/4 Buster的ioBroker图像，带有piVCCU 20190723
hash: fdPxXaqZLD7Fzo1Q+/gc3r+XxPVt6ondUpWQd9YjeBk=
---
#ioBroker用于Raspberry Pi2 / 3/4 Buster的图像，带有piVCCU 20190723
##创建μ-SD卡
这是Homematic的一体化SD卡图像，在Raspberry Pi2，Pi3，Pi3 B +或Pi4上使用ioBroker。

该图像是在带有2GB RAM的Raspberry Pi4上创建的，但也应该在所有提到的上运行。适用于4 GB以上的卡。但是，建议的最小大小为8 GB。无论如何，建议使用16GB的卡，因此并不总是描述相同的单元。

解压缩图像，然后使用Balena Etcher程序将其写入SD卡。 Etcher适用于不同的操作系统。

##组件的图像
该图片包含Raspbian lite，基于Debian 10“Buster”，自10.07.2019后从http://www.raspberrypi.org/downloads下载。

此外，还安装了某些适配器所需的软件包。

还包括从https://www.pivccu.de/images/?dir=piVCCU3下载的piVCCU3日期为19.07.2019

创建以下用户：

*用户：pi，
*密码：覆盆子

Node-js安装在版本10.16.0中，当然iobroker通过安装程序安装了js-controller，截止日期为23.07.2019。

它是**最小安装**，其中仅包含**和发现适配器**。仍然必须创建和配置其他适配器及其实例。

[这里](/tutorial/adapter.md)中描述了创建其他适配器及其实例。

**注意！**以下说明是根据我们所知，在创建图像时的信息。对包或内核的更新可以随时更改任何内容。

该图像已针对德国本地化。如果在其他环境中使用，请相应调整。 （`sudo raspi-config`; 4.）本地化选项）

##第一次启动后
首次启动Rapberry Pi后，请使用`sudo raspi-config`进行以下设置：

第1点：更改用户密码（分配给用户Pi的自己的密码）第2点：网络选项 - 主机名（如有必要，更改Raspberry Pi的名称，默认为ioBroker-Pi）如果主机名已更改，请在安装目录的控制台中iobroker主机输入此项目7：高级选项 - 扩展文件系统（将根文件系统扩展到所使用的SD卡的最大大小），如有必要，仍然在第4项：进行本地化选项调整。默认设置适用于德国

##系统更新
由于图像是在下载时创建的，因此您应该首先更新系统。

要为Linux和nodejs提供最新版本，您可以在控制台上执行以下操作：

```sudo apt-get update && sudo apt-get upgrade -y```

此外，您应该检查是否已经安装了适配器和js-controller的更新（请参阅主机标签）。

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

##已安装的piVCCU3
在此图像中还安装了虚拟化CCU3，这使得可以在没有进一步单独硬件的情况下控制Homematic和HM-IP设备。
只有无线电模块HM-MOD-RPI-PCB或RPI-RF-MOD必须插在Raspberry Pi的引脚头上。

piVCCU从DHCP服务器接收与RaspberryPi本身不同的IP地址。这是通过命令`sudo pivccu-info`获得的

如果您拨打此IP地址，则可以登录CCU3的界面。