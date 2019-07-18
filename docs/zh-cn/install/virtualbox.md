---
title: 安装
lastChanged: 13.09.2018
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/virtualbox.md
hash: I9fBqGuBbdh3aWQsRBtlCo0jrgRu8pfhoF5A11pGlBw=
---
＃在VirtualBox中设置和安装ioBroker
？&gt; ***这是一张通配符***。 <br><br>帮助ioBroker并扩展这篇文章。请注意[ioBroker风格指南](community/styleguidedoc)，以便更容易采用这些更改。

@@@ http://www.iobroker.net/docu/?page_id=5358&lang=en @@@

首先，让我们获得当前稳定版本的Debian https://www.debian.org/CD/http-ftp/#stable

再往下一点，我们点击AMD64上的CD下

现在我们下载“debian-8.4.0-amd64-netinst.iso”如果有更新的版本应该使用这个，在下载时是Debian 8.4.0 Aktuell。
我使用Netinst，因为文件很小，安装只能从网上卸下杂物。

然后我们创建一个新的虚拟机并为其命名。
在我的示例中，ioBroker_Debian_Jessie_x64 recording87.jpg然后指示我们要分配给VM的主内存量。
在我的例子4GB RAM Aufnahme88.jpg

单击Create Disk Recording89.jpg

选择VDI（虚拟映像盒）Recording90.jpg

对于存储类型，由每个人决定他选择什么。
在我的例子中，我使用DYNAMICALLY ALLOCATED recording91.jpg

现在我们仍然可以更改VM的文件名（如果需要）并为我们的VM提供提供Partiotion的大小在我的示例中10GB Aufnahme92.jpg

现在VM准备就绪。
如果我们现在点击CHANGE，我们可以调整VM的更多内容。

我们转到标签MASS MEMORY单击UNDER Controller：IDE

在“属性”下的右侧，将显示CD徽标。
我们点击它并选择FILE FOR VIRTUAL CD / DVD medium。
现在我们在Explorer中导航到下载的Debian ISO文件并选择它。
整个事情应该是这样的：Aufnahme93.jpg

由于我想在我的网络上而不是在子网络中访问ioBroker，我在CONNECTED下的NETWORK选项卡下设置，NETWORK BRIDGE上的选择记录94.jpg

现在我们已经设定了一切必要
Debian的安装可以开始了。
我们点击START并登陆下图。
我们选择INSTALL recording95.jpg

语言：从Record96.jpg中选择德语

地点：从Aufnahme97.jpg选择德国

键盘布局：从Recording98.jpg中选择ENGLISH

计算机名称：输入要安装的计算机的名称。
在我的示例ioBrokerVM中（如果有人想要回放他的ioBroker生产系统的备份，请在这里输入相同的Nanem你的RasPi / Cubie / BananaPi等）Aufnahme100.jpg

域名：该字段可以留空.Aufnahme101.jpg

root密码：你的root密码Aufnahme102.jpg

重复root密码：再次输入你的root密码Aufnahme103.jpg

用户创建：在我的示例NIPPY Recording104.jpg中

用户名创建：在我的例子中NIPPY Aufnahme105.jpg

用户密码：您的用户密码Recording106.jpg

重复用户密码：重新输入您的用户密码.Acording107.jpg时区：我们选择BERLIN

Aufnahme108.jpg

分区硬盘1：我们选择GUIDED  - 使用FULL DISK RECORD109.jpg

分区硬盘2：我们选择我们的硬盘Recording110.jpg

分区磁盘3：我们选择分区上的所有文件，建议初学者记录111.jpg

分区硬盘4：我们选择PARTITIONING EXIT和TAKE CHANGES Recording112.jpg

磁盘分区5：我们选择YES Recording113.jpg Package Manager配置1：我们选择GERMANY Recording115.jpg

包管理器配置2：我选择了ftp.de.debian.org Recording116.jpg

包管理器配置3：您可以将其留空并转到NEXT Recording118.jpg

Populary-Contest：我选择了NO Recording119.jpg

软件选择：我们选择SSH SERVER和STANDARD SYSTEM TOOLS我们选择其余的（如果选择）Recording120.jpg

GRUB Bootloader 1：我们选择JA Aufnahme121.jpg

GRUB Bootloader 2：我们选择HDD / dev / sda（ata-vbox .........）recording122.jpg

安装完成：Aufnahme123.jpg

现在系统重新启动，我们登陆登录

登录：Recording124.jpg

我们使用root帐户登录：登录：root密码：收到您的密码Record125.jpg

现在我们更新系统：apt-get install update 1

apt-get install update apt-get install升级1

apt-get安装升级

由于未安装SUDO，请执行以下操作：aptitude install sudo 1

aptitude安装sudo

以下是NPM安装：apt-get install npm 1

apt-get install npm

然后我们安装CURL：apt-get install curl 1

apt-get install curl

准备和安装NodeJs curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash  -  1

curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash  -

apt-get install nodejs 1

apt-get install nodejs

完成后，ioBroker将安装

首先我们创建目录iobroker：mkdir / opt / iobroker 1

mkdir / opt / iobroker

我们切换到目录iobroker：cd / opt / iobroker 1

cd / opt / iobroker

现在我们安装iobroker：npm install --unsafe-perm iobroker 1

npm install --unsafe-perm iobroker

在安装结束时，应出现以下内容：Aufnahme137.jpg

—

谁想仍然可以htop安装我在终端使用它我的内存负载/ CPU负载等来看看。

安装时使用：apt-get install htop 1

apt-get install htop

它执行：htop 1

HTOP

看起来像这样：Aufnahme139.jpg

我希望一些新手能够更轻松地设置包括ioBroker在内的虚拟机。

对我来说，在VM中安装ioBroker经常会失败，在BananaPi上她没有遇到任何问题。

无论如何，这个安装程序在VM上对我来说非常精彩。

1补充：1.1自动启动VirtualBOX VM（Ubuntu 16.10）：1.2调整3个变量！ （如果需要注释掉第三个变量或添加更多，具体取决于VM实例）

增加：自动启动VirtualBOX VM（Ubuntu 16.10）：

https://www.freesoftwareservers.com/ind ... nd-vbox-5 /

创建文件：

sudo nano /etc/init.d/StartVM&st; sudo chmod + x /etc/init.d/StartVM＆amp; sudo update-rc.d StartVM默认值为99 01 1

sudo nano /etc/init.d/StartVM&st; sudo chmod + x /etc/init.d/StartVM＆amp; sudo update-rc.d StartVM默认为99 01

文件内容：

```
#! /bin/sh
# Start VirtualBox @boot
# /etc/init.d/StartVM
#

#Edit these variables!
VMUSER=user
VMNAME=VM1
VMNAME2=Test

case "$1" in
  start)
    echo "Starting VirtualBox VM ..."
    sudo -u $VMUSER VBoxHeadless --startvm $VMNAME &amp;
    sudo -u $VMUSER VBoxHeadless --startvm $VMNAME2 &amp;
    ;;
  stop)
    echo "Saving state of Virtualbox VM ..."
    sudo -u $VMUSER VBoxManage controlvm $VMNAME savestate
    sudo -u $VMUSER VBoxManage controlvm $VMNAME2 savestate
    ;;
  *)
    echo "Usage: /etc/init.d/StartVM {start|stop}"
    exit 1
    ;;
esac

exit 0
```

调整3个变量！ （如果需要注释掉第三个变量或添加更多，具体取决于VM实例）

在BIOS中（如果它在计算机上运行）设置为在电源故障的情况下，应恢复旧的ON / OFF状态。如果发生电源故障，它将重新启动，然后VM也会启动。

使用VirtualBOX和Back in Time创建备份

在VirtualBOX中，您可以轻松地手动创建备份点。只需几秒钟，只需点击一下。始终在iobroker更新或更改脚本之前！ 2016-04-26 22-48-04.png截图

只需单击一下，即可恢复以前的版本。

内存使用情况：动态10GB虚拟机和Ubuntu 16.10 Full + iobroker占用大约1.7GB的存储空间。我的11个快照占用8.6 GB。

我的整个个人区域包括VirtualBOX VM目录，我每晚都会在第二个硬盘上自动复制“Back in Time”程序。在某些时间后，会保留并自动删除多个版本。
2016-04-26 22-55-23.png的屏幕截图这是VirtualBox。

```
sudo apt-get install virtualbox virtualbox-qt virtualbox-dkms
```

您还可以安装扩展包，例如，它支持从客户端主机连接USB 2.0或3.0设备，从主机到客户端的网络摄像头传输和AES加密。你可以在这里下载[URL：https：//www.virtualbox.org/wiki/Downloads]  - 第二项（扩展包）[/ url]下载此文件并以管理员或打开方式打开通过VirtualBOX / Global Settings / Additional Packages安装它（但启动VirtualBOX作为Admin）。

最低硬件要求非常低。你必须自己弄清楚它是如何适合的。理论上足够512 RAM和旧的Intel处理器。例如，它应该在所有英特尔NUC代中顺利运行。
对于连续操作，拥有低功率主机当然很重要。您现在可以轻松地构建功能强大的10瓦以下的计算机。互联网上有各种10瓦的PC指令。重要的是，没有（自己的）显卡，并且在较低负载范围内具有高效电源，并且不使用高端主板，因为它具有的功能越多，芯片吸入的流越多。
我真的可以推荐适用于Windows或Ubuntu的英特尔NUC系列。让我引用我的签名：在英特尔NUC Nuc6i3SYH（i3 Skylake）上安装VirtualBOX的Ubuntu VM中的iobroker，M.2 SSD，8 GB RAM，Ubuntu 16.10。 6-8瓦空转。

在Virtualbox中，我将Vm的网卡设置为“Bridged”，以便VM挂在LAN路由器上，可以说是一台独立的计算机。

并且通过已安装的操作系统在VM内正常设置固定IP。
这可以像Debian一样工作：

终端：

```
sudo nano /etc/network/interfaces
```

有可能是这样的：

```
  auto eth0
    allow-hotplug eth0
    iface eth0 inet dhcp
```

您将其更改为（注意，将数字调整到您自己的环境）

```
 auto eth0
    iface eth0 inet static
        address 192.168.1.7
        netmask 255.255.255.0
        gateway 192.168.1.1
```

其中eth0是您自己的LAN设备的名称，它可能在VM中有所不同，因此当您进行更改时，您必须使用正确的名称替换两个eth0字。