---
title: 的Linux
lastChanged: 05.12.2020
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/linux.md
hash: 94FZ9JS8K/j3512/RP42QRy2cSacJu+1igJqfvWnKGc=
---
＃在Linux上安装ioBroker
！>这些说明不适用于网站的成品图片！但是，手动安装比映像更可取。

使用脚本执行安装，该脚本执行必需的安装步骤并重新加载可能需要的所有软件包。
在安装过程中，系统中会创建一个新用户“ iobroker”和一个关联的主目录（/ home / iobroker）。
ioBroker然后在该用户下运行。

如果重新加载脚本对您来说太危险，则可以在[这个连结](https://raw.githubusercontent.com/ioBroker/ioBroker/stable-installer/installer.sh)下事先检查脚本。

ioBroker的这些安装说明以带有Raspberry OS'Buster'的Raspberry Pi为例显示了在Linux上的安装。

由于依赖于其他软件包或其他安装，特殊功能可能在安装过程中一次又一次地出现。

##必需的硬件
### Raspberry Pi 2/3/4
或任何其他具有常见Linux的硬件。但是，建议使用Debian，Ubuntu或基于它们的发行版之一。

我们不建议使用Pi 1作为主机。它只是不够强大（500MB RAM等）。由于硬件不同，这些说明仍然不适用于Pi 1。

即使是Pi 2或Pi 3也只有最大。 1 GB RAM。对于15个适配器实例，这应该足够了，但除此之外，它可能会很严格。每个适配器实例需要大约40 MB（有时甚至200MB甚至更多）的RAM。因此，在激活其他适配器实例之前，您应始终注意RAM的使用-1 GB RAM是有限的。

因此，建议从Raspberry系列使用具有4个更好的8 GB RAM的Raspberry4。

＃＃＃ 电源适配器
拥有良好的电源很重要。电源弱的情况下会出现稳定性问题

＃＃＃ 存储卡
或SSD，USB记忆棒等（取决于所用的硬件）

##必要/重要链接
*下载图片：https：//www.raspberrypi.org/downloads/raspbian/
* Win32DiskImager：https://sourceforge.net/projects/win32diskimager/ **或**
* Balena Etcher：https://www.balena.io/etcher/
*油灰：http：//www.putty.org/

＃＃ 安装指南
###操作系统安装
*根据所使用的硬件安装所需的基本操作系统（Raspian Stretch，Ubuntu，Debian等）。

有关相应版本的帮助和说明可在相应的支持页面，YouTube等上找到。

*仅当绝对需要通过SSH或sftp进行root访问时，才可以** CAN **

可以激活SSH的根访问权限。

对于众所周知的安全方面，我们建议您不要这样做。要安装ioBroker，只需使用sudo命令并在相应命令之前即可。

###安装Node.js
！>使用当前的ioBroker安装程序（见下文）**在没有node.js的系统上**当前推荐的node.js版本会自动安装！

以下说明也应用于降级。

当前推荐的版本是节点12.x。用于步骤4.1中的其他所需版本。用Y.x替换“ 12.x”。

！> Debian Buster至少需要node.js v10.x！

<span style="color:red">通常不建议使用奇数的nodejs版本，因为它们是开发人员版本。</span>

1.系统更新：“ sudo apt-get update && sudo apt-get upgrade”

根据所使用的操作系统，也可以使用“`sudo apt update && sudo apt upgrade`”来执行更新。

2.测试nodejs和npm的现有版本。

    `node -v``

    `nodejs -v``

    `npm -v``

仅当** ALL **这些命令没有产生结果（即不再显示版本号）时才继续本节的步骤4，否则，或者如果版本与所需的版本不符，请事先执行以下操作：

3.卸载现有的node＆node.js版本

    ``sudo apt-get --purge remove node``（可能是错误消息出现在这里。请继续！）

    `sudo apt-get --purge remove nodejs``

    `sudo apt-get autoremove``

    `sudo reboot``

4.重新安装适用于Linux和Raspberry 2/3的Node.js

    `curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -``

    `sudo apt install -y nodejs``

    `sudo reboot``

安装后，命令“ node -v”和“ nodejs -v”必须返回相同的版本号。

    如果``node -v``生成错误消息，例如“未找到”，请

    在控制台上执行``sudo ln -s /usr/local/bin/nodejs /usr/bin/node``。

如果版本不同，请再次浏览[安装Node.js](#installation-nodejs)部分

    作为最后检查，请使用``npm -v``检查npm的版本。

如果结果是版本<6，请使用``sudo -H npm install -g npm@6``执行npm更新。

---

###安装ioBroker
可以用pi用户安装，也可以用root用户安装。

在控制台上运行：

`curl -sLf https://iobroker.net/install.sh | bash -``

---

安装过程分为四个步骤：

`Installing prerequisites (1/4)``

`Creating ioBroker user and directory (2/4)``

`Installing ioBroker (3/4)``

`Finalizing installation (4/4)``

最后有消息

`ioBroker was installed successfully``

`Open http://localhost:8081 in a browser and start configuring!``

---

现在，通过Web浏览器中的指定IP调用ioBroker：``http://<IP-Adresse>:8081``

**注意：**

这些命令在1月初至1月中旬与安装例程一起使用：

* iobroker停止
* iobroker开始
* iobroker重新启动
* iobroker身份

不再。这是Linux的功能-不是ioBroker！

相反必须

* sudo systemctl停止iobroker

或可以使用其他等效项

此外，可能存在权利问题。

在这种情况下，请使用安装修复程序：

`curl -sL https://iobroker.net/fix.sh | bash -``

论坛中的更多信息：

https://forum.iobroker.net/topic/20211/iobroker-installation-fixer-beta-verf%C3%BCgbar