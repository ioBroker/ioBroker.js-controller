---
title: Linux的
lastChanged: 28.03.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/linux.md
hash: +9KkGvDJvUveJ02nsS48om8AmoOjywSgZJz/9MM+TGA=
---
＃在Linux上安装ioBroker
！>这些说明不适用于网站的最终图片！

ioBroker的安装例程已被完全修改，并且某些安装问题（安装用户，自动启动等）已得到修复。

现在，通过脚本执行安装，该脚本在运行时包含所需的安装步骤和软件包。充电。在安装过程中，将创建一个新用户“ iobroker”以及关联的主目录（/ home / iobroker）。从现在开始，ioBroker在用户iobroker下运行，不再以root用户身份运行。

如果重新加载脚本对您来说太危险，则可以在[这个连结](https://raw.githubusercontent.com/ioBroker/ioBroker/stable-installer/installer.sh)下事先检查脚本。

ioBroker的此安装指南以带有System Stretch的Raspberry PI为例显示了在Linux上的安装。几乎所有其他Linux系统都可以使用安装nodejs和ioBroker的实际说明。

由于依赖于其他软件包或其他安装，因此总是会出现特殊功能。

如果您还有任何疑问，请在论坛中发布。

在此处发布的说明中，node.js版本会随每次内核更新（如果有）自动更新。

##必需的硬件
### Raspberry Pi 2/3，
或任何其他具有常见Linux（Debian，Ubuntu等）的硬件，甚至是Mac。

我们不建议将Pi 1用作主机。它根本不够强大（500 MB RAM等）。由于硬件不同，这些说明仍然不适用于Pi 1。

Pi 2或Pi 3也只有最大1 GB RAM。对于15个适配器实例，这应该仍然足够，但除此之外，它可能变得稀缺。每个适配器实例需要大约40 MB（有时需要200MB甚至更多）的RAM。因此，在激活其他适配器实例之前，您应始终注意RAM的利用率-1 GB RAM是有限的。

###电源
拥有良好的电源很重要。在电源不足的情况下，可能会出现稳定性问题

###存储卡
或SSD，USB记忆棒等（取决于所用的硬件）

##必需/重要链接
*下载图片：https://www.raspberrypi.org/downloads/raspbian/
* Win32DiskImager：https://sourceforge.net/projects/win32diskimager/ **或**
* Balena Etcher：https://www.balena.io/etcher/
*油灰：http：//www.putty.org/

##安装说明
###操作系统安装
*根据所使用的硬件，安装所需的基本操作系统（Raspian Stretch，Ubuntu，Debian等）。

有关相应版本的帮助和说明可在相应的支持页面，YouTube等上找到。

*仅当绝对需要通过SSH或sftp进行root访问时，才可以** CAN **

可以激活SSH的根访问权限。

我们基于已知的安全性方面建议不要这样做。对于ioBroker的安装，只需使用sudo命令并将其放在相应命令的前面即可。

###安装Node.js
降级时也应使用以下说明。

当前推荐的版本是节点10.x。使用js-controller 1.5.7和8.x节点，然后执行步骤4.1。将“ 10.x”替换为“ 8.x”。

！> Debian Buster需要node.js v10.x！

<span style="color:red">通常不建议使用奇数版本的nodejs，因为它们是开发人员版本。</span>

1.系统更新：``sudo apt-get update && sudo apt-get upgrade''

根据所使用的操作系统，也可以使用“`sudo apt update && sudo apt upgrade`”来执行更新。

2.测试nodejs和npm的现有版本。

    ``node -v``

    ``nodejs -v``

    ``npm -v``

仅当** ALL **这些命令没有结果（即不再显示版本号）时才继续执行本节的步骤4，否则，或者如果版本与所需的版本不符，请事先执行以下操作：

3.卸载现有的node＆node.js版本

    ``sudo apt-get --purge remove node``

    ``sudo apt-get --purge remove nodejs``

    ``sudo apt-get autoremove``

    ``sudo reboot``

4.重新安装适用于Linux和Raspberry 2/3的Node.js

    ``curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -``

    ``sudo apt install -y nodejs``

    ``sudo reboot``

安装后，命令“ node -v”和“ nodejs -v”必须返回相同的版本号。

    如果``node -v``生成错误消息，例如“未找到”，请

    在控制台上执行``sudo ln -s /usr/local/bin/nodejs /usr/bin/node``。

如果版本不同，请再次浏览[安装Node.js](#installation-nodejs)部分

    作为最终检查，请使用``npm -v``检查npm的版本。

如果这导致版本小于6，请使用``sudo -H npm install -g npm@6``进行npm更新。

### IoBroker安装
可以使用pi用户或root用户来完成安装。

在控制台上运行：

``curl -sL https://iobroker.net/install.sh | bash -``

---

安装分为四个步骤：

``Installing prerequisites (1/4)``

``Creating ioBroker user and directory (2/4)``

``Installing ioBroker (3/4)``

``Finalizing installation (4/4)``

最后，有消息

``ioBroker was installed successfully``

``Open http://localhost:8081 in a browser and start configuring!``

---

现在，通过Web浏览器中的指定IP调用ioBroker：``http://<IP-Adresse>:8081``

**注：**

通过安装例程，这些命令从一月初到一月中旬生效：

* iobroker停止
* iobroker开始
* iobroker重新启动
* iobroker身份

不再。这是Linux的功能-不是ioBroker！

相反必须

* sudo systemctl停止iobroker

或使用其他等效项

供股也可能出现。

在这种情况下，请使用安装修复程序：

``curl -sL https://iobroker.net/fix.sh | bash -``

论坛中的更多信息：

https://forum.iobroker.net/topic/20211/iobroker-installation-fixer-beta-verf%C3%BCgbar