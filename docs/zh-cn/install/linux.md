---
title: Linux的
lastChanged: 28.03.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/linux.md
hash: rToAGckz5g8DJcVj8aOpJNCl6cMnwuRP6khgB4EIOa0=
---
Linux下的＃ioBroker安装
！>本手册不适用于网站的完成图像！

ioBroker的安装例程已经彻底检修，并修复了一些安装问题（安装程序，启动程序等）。

现在通过脚本完成安装，该脚本在运行时会执行所需的安装步骤和软件包。充电。在安装过程中，会创建一个新用户“iobroker”，以及一个关联的主目录（/ home / iobroker）。从现在开始，ioBroker在用户iobroker下运行，不再以root用户身份运行。

如果重新加载脚本太危险，脚本可以事先在[这个链接](https://raw.githubusercontent.com/ioBroker/ioBroker/stable-installer/installer.sh)下进行检查。

此ioBroker安装指南使用带有System Stretch的Raspberry PI示例显示Linux上的安装。安装nodejs和ioBroker的实际指令几乎可以用于所有其他Linux系统。

由于在安装过程中依赖于其他软件包或其他安装，因此可能会一次又一次地出现特殊功能。

如果有任何问题，请在论坛中发布。

根据此处发布的指令，每个内核更新（如果可用）也会自动更新node.js版本。

##需要硬件
### Raspberry Pi 2/3，
或任何其他硬件与常见的Linux（Debian，Ubuntu等），甚至是Mac。

我们建议不要使用Pi 1作为主人。这还不够强大（500 MB RAM等）。由于硬件不同，本手册无论如何都不适合Pi 1。

即使是Pi 2或Pi 3也只有最大值。 1 GB RAM。它应该足够15个适配器实例，但除此之外它可能是稀缺的。每个适配器实例需要大约40 MB（有时200 MB或更多）的RAM。因此，在启用更多适配器实例之前，应始终关注RAM的使用情况 - 最终可以使用1 GB的RAM。

###电源
拥有良好的电力供应非常重要。在电力供应不足的情况下，可以预期稳定性问题

###记忆卡
或SSD，USB棒等（取决于使用的硬件）

##需要/重要的链接
*下载图片：https：//www.raspberrypi.org/downloads/raspbian/
* Win32DiskImager：https：//sourceforge.net/projects/win32diskimager/ **或**
* Balena Etcher：https：//www.balena.io/etcher/
* Putty：http：//www.putty.org/

##安装说明
###安装操作系统
*根据您使用的硬件安装所需的基本操作系统（Raspian Stretch，Ubuntu，Debian等）。

有关相应版本的帮助和说明，请参见相应的支持页面，Youtube等。

*只有通过SSH或sftp进行root访问才是绝对必要的，** CAN **也是

SSH的root访问权限将被解锁。

我们建议反对它的众所周知的安全方面。对于ioBroker的安装，使用sudo命令并在相应的命令前面就足够了。

###安装Node.js
降级期间还将使用以下说明。

目前推荐的版本是node 8.x; js-controller 1.5.7也是节点10.x，然后是步骤4.1。将“8.x”替换为10.x“。

<span style="color:red">不建议使用奇数nodejs版本，因为它们是开发版本。</span>

1.系统更新：``sudo apt-get update && sudo apt-get upgrade``

根据所使用的操作系统，也可以使用``sudo apt update && sudo apt upgrade``执行更新。

2.测试nodejs和npm的现有版本。

    ``node -v``

    ``nodejs -v``

    ``npm -v``

仅当** ALL **这些命令不产生结果（即不再显示版本号）时，转到本节的第4步，否则，或者如果版本与您想要的版本不匹配：

3.卸载现有节点和node.js版本

    ``sudo apt-get --purge remove node``

    ``sudo apt-get --purge remove nodejs``

    ``sudo apt-get autoremove``

    ``sudo reboot``

4.重新安装适用于Linux和Raspberry 2/3的Node.js.

    ``curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -``

``sudo apt-get install -y build-essential libavahi-compat-libdnssd-dev libudev-dev libpam0g-dev nodejs``

    ``sudo reboot``

安装后，命令“node -v”和“nodejs -v”必须返回相同的版本号。

    如果``node -v``生成错误消息，如“未找到”，请输入

    在控制台上执行``sudo ln -s /usr/local/bin/nodejs /usr/bin/node``。

如果版本不同，请重新执行[安装Node.js](install/linux.md#installation-nodejs)部分

    作为最后一项检查，请使用``npm -v``检查npm的版本。

如果这导致版本<6，请使用``sudo -H npm install -g npm@6``进行npm更新

###安装ioBroker
安装可以通过用户pi完成，也可以通过用户root完成。

在控制台运行：

``curl -sL https://iobroker.net/install.sh | bash -``

---

安装分4个步骤完成：

``Creating ioBroker directory (1/4)``

``Downloading installation files (2/4)``

``Installing ioBroker (3/4)``

``Finalizing installation (4/4)``

最后，有消息

``ioBroker was installed successfully``

``Open http://localhost:8081 in a browser and start configuring!``

---

现在通过Web浏览器中的指定IP调用ioBroker：``http://<IP-Adresse>:8081``

**注：**

使用安装例程，命令从1月初到1月中旬：

* iobroker停止
* iobroker开始
* iobroker重启
* iobroker状态

不再了这是Linux的一个特性 - 而不是ioBroker！

而不是那个

* sudo systemctl stop iobroker

或者使用其他等同物

此外，它可能会出现权利问题。

在这种情况下，请使用安装程序修复程序：

``curl -sL https://raw.githubusercontent.com/ioBroker/ioBroker/stable-installer/fix_installation.sh | bash -``

论坛中的更多信息：

https://forum.iobroker.net/topic/20211/iobroker-installation-fixer-beta-verf%C3%BCgbar