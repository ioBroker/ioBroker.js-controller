---
title: 安装
lastChanged: 13.09.2018
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/nodejs.md
hash: aiE+/kF28wavV+TG9cs6S1B4VXymKjBAiO1O8la65Z4=
---
＃安装Node.js和npm
？&gt; ***这是一张通配符***。 <br><br>帮助ioBroker并扩展这篇文章。请注意[ioBroker风格指南](community/styleguidedoc)，以便更容易采用这些更改。

ioBroker和适配器主要用编程语言JavaScript编写。由于计算机无法直接执行Javascript，因此需要运行时环境Node.js.

以下信息是[Node.js的基金会](https://nodejs.org/en/download/package-manager/)的安装说明的非正式翻译。

##目录
* [Arch Linux]（＃arch）
* [基于Debian和Ubuntu的Linux发行版]（＃）
* [Enterprise Linux和Fedora]（＃debian）
* [FreeBSD]（＃）
* [Gentoo]（＃）
* [NetBSD]（＃）
* [nvm]（＃）
* [OpenBSD]（＃）
* [openSUSE和SLE]（＃）
* [macOS]（＃）
* [SmartOS和illumos]（＃）
* [Void Linux]（＃）
* [Solus]（＃）
* [Windows]（#windows）

<h2 id="arch"> Arch Linux </h2>

社区存储库中提供了完成的Node.js和npm包。

```
pacman -S nodejs npm
```

<h2 id="debian">基于Debian和Ubuntu的Linux发行版</h2>

这包括** Linux Mint，Linux Mint Debian Edition（LMDE），elementaryOS，Windows上的bash **等等。

Node.js是通过NodeSource Debian和Ubuntu Binary Repository（以前的Chris Lea的Launchpad PPA）提供的。
可以在GitHub的[nodesource /分布](https://github.com/nodesource/distributions)下找到有关重新发布的帮助和脚本。

**注意：**如果要在Ubuntu Precise或Debian Wheezy上安装Node.js，建议阅读[较旧的发行版上的Node.js> = 6.x.](https://github.com/nodesource/distributions/blob/master/OLDER_DISTROS.md)上的文章。

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

对于Node.js 10，请使用以下命令：

```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

***可选：***安装构建工具

要使用npm编译和安装本机扩展，您还应该安装构建工具。

```
sudo apt-get install -y build-essential
```

**可用架构：**

* **i386** 32位）
* **amd64** 64位）
* **armhf** ARM 32位硬浮动，ARMv7及更高版本：arm-linux-gnueabihf）

支持的Ubuntu版本：

* **Ubuntu 14.04 LTS** Trusty Tahr）
* **Ubuntu 16.04 LTS** Xenial Xerus）

支持的Debian版本：

* **Debian 8** jessie，旧稳定）
* ** Debian 9 /稳定**（拉伸）
* ** Debian 9测试**（将要发布的下一个稳定版）
* ** Debian不稳定**（sid永远不会被释放，又名滚动）

Debian Sid（不稳定），Jessie（测试）和Wheezy（wheezy-backports）的官方报告中也提供了Node.js软件包作为“nodejs”。它只是安装了一个nodejs二进制文件。

nodejs-legacy软件包安装了许多模块所需的节点符号链接，以便构建和正确运行。 Node.js模块在官方分发版库中可用，不需要它。

支持的Linux Mint版本：

* ** Linux Mint 17“Qiana”**（通过Ubuntu 14.04 LTS）
* ** Linux Mint 17.1“Rebecca”**（通过Ubuntu 14.04 LTS）
* ** Linux Mint 17.2“Rafaela”**（通过Ubuntu 14.04 LTS）
* Linux Mint Debian Edition（LMDE）2“Betsy”**（来自Debian 8）

支持的基本OS版本：

* **基本操作系统Luna **（通过Ubuntu 12.04 LTS）
* **基本OS Freya **（通过Ubuntu 14.04 LTS）
* **基本OS Loki **（通过Ubuntu 16.04 LTS）
* **基本操作系统Juno **（通过Ubuntu 18.04 LTS）

支持的Trisquel版本：

* ** Trisquel 7“Belenos”**（通过Ubuntu 14.04 LTS）

支持的BOSS版本：

* ** BOSS 5.0“Anokha”**（来自Debian 7）

企业Linux和Fedora

包括RedHat®EnterpriseLinux®/ RHEL，CentOS和Fedora。

Node.js可从NodeSource Enterprise Linux和Fedora二进制分发库获得。可以在GitHub上的nodesource / distribution中找到对此存储库及其脚本的支持。

请注意，EL 5（RHEL5和CentOS 5）的Node.js包依赖于可用的EPEL存储库。安装脚本要检查并提供是否未安装。

在RHEL，CentOS或Fedora上，对于Node.js v8 LTS：

```
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
```

或者对于Node.js 10：

```
curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash -
```

然后安装：

```
sudo yum -y install nodejs
```

可选：安装构建工具

要从npm编译和安装本机插件，您可能需要安装构建工具：

```
sudo yum install gcc-c++ make
# or: sudo yum groupinstall 'Development Tools'
```

可用架构：

* **i386** 32位，不适用于EL7）
* **x86_64** 64位）

支持的RedHat®EnterpriseLinux®版本：

* **RHEL 5** 32位和64位）
* **RHEL 6** 32位和64位）
* RHEL 7 **（64位）

支持的CentOS版本：

* **CentOS 5** 32位和64位）
* **CentOS 6** 32位和64位）
* **CentOS 7** 64位）

支持的CloudLinux版本：

* **CloudLinux 6** 32位和64位）

支持的Fedora版本：

* **Fedora 21** 二十一）（32位和64位）
* **Fedora 20** Heisenbug）（32位和64位）
* **Fedora 19** Schrödinger的Cat）（32位和64位）

已知支持的其他发行版：

* **Oracle Linux** 非常密切地镜像RHEL）
* **亚马逊Linux **（2016.03测试）

替代品

Fedora 18及更高版本中提供了官方Fedora Node.js和npm软件包。安装时间：

```
sudo dnf install nodejs
```

急于获得最新的更新？从更新测试中获取它们。

Enterprise Linux（RHEL和CentOS）用户可以使用EPEL存储库中的Node.js和npm包。

为您的版本安装适当的epel-release RPM（可在EPEL存储库主页上找到），然后运行：

```
sudo yum install nodejs npm --enablerepo=epel
```

急于获得最新的更新？从epel测试中获取它们。

可用架构：

* **i686** 32位，不适用于EL7）
* **x86_64** 64位）
* **armv6hl** Raspberry Pi，仅限Pidora）
* **armv7hl** 32位ARM硬浮动，ARMv7及以上版本，仅限Fedora）

支持的RedHat®EnterpriseLinux®版本：

* **RHEL 6** i686 / x86_64）
* **RHEL 7** aarch64 / x86_64）

EPEL不再支持RHEL 6，但您可以使用Red Hat Software Collections。

此外，所有EPEL包（包括nodejs）都正式支持与上述RHEL版本对应的CentOS和Scientific Linux版本。由于先前向epel-devel邮件列表报告的重大不兼容性，EPEL并未正式支持Amazon Linux。

支持的Fedora版本：

* **Fedora Rawhide** i686 / x86_64 / armv7hl / aarch64 / ppc64 / ppc64le / s390x）
* **Fedora 27** i686 / x86_64 / armv7hl / aarch64 / ppc64 / ppc64le / s390x）
* **Fedora 26** i686 / x86_64 / armv7hl / aarch64 / ppc64 / ppc64le）

FreeBSD的

Node.js的最新版本可通过www / node端口获得。

通过pkg安装二进制包：

```
pkg install node
```

或者使用ports自己编译：

```
cd /usr/ports/www/node && make install
```

Gentoo的

Node.js在portage树中可用。

```
emerge nodejs
```

NetBSD的

pkgsrc树中提供了Node.js：

```
cd /usr/pkgsrc/lang/nodejs && make install
```

或者使用pkgin安装二进制包（如果适用于您的平台）：

```
pkgin -y install nodejs
```

NVM

Node Version Manager是一个bash脚本，用于管理多个已发布的Node.js版本。它允许您执行安装，卸载，切换版本等操作。要安装nvm，请使用此安装脚本。

在Unix / OS X系统上，可以使用nvm期望安装从源构建的Node.js：

```
$ env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

在此之后，您可以使用从源构建的版本和版本。例如，如果Node.js的版本是v8.0.0-pre：

```
$ nvm use 8
```

正式版本准备就绪后，您想要卸载从源构建的版本：

```
$ nvm uninstall 8
```

OpenBSD系统

Node.js可通过ports系统获得。

```
/usr/ports/lang/node
```

在OpenBSD上使用pkg_add：

```
pkg_add node
```

openSUSE和SLE

Node.js在以下包的主存储库中可用：

* ** openSUSE Leap 42.2：** nodejs4
* ** openSUSE Leap 42.3：** nodejs4，nodejs6
* ** openSUSE风滚草：** nodejs4，nodejs6，nodejs8
* ** SUSE Linux Enterprise Server（SLES）12：** nodejs4，nodejs6

    （必须在安装之前添加“Web和脚本模块”。）

例如，要在openSUSE Leap 42.2上安装Node.js 4.x，请以root身份运行以下命令：

```
zypper install nodejs4
```

MACOS

只需直接从nodejs.org网站下载macOS安装程序即可。

如果你想用bash下载软件包：

```
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

替代品

使用自制软件：

brew安装节点

使用MacPorts：

```
port install nodejs<major version>
```

＃例子
端口安装nodejs7

使用pkgsrc：

安装二进制包：

```
pkgin -y install nodejs
```

或者从pkgsrc手动构建：

```
cd pkgsrc/lang/nodejs && bmake install
```

SmartOS和illumos

SmartOS映像预先安装了pkgsrc。在其他illumos发行版上，首先安装pkgsrc，然后你可以正常安装二进制包：

```
pkgin -y install nodejs
```

或者从pkgsrc手动构建：

```
cd pkgsrc/lang/nodejs && bmake install
```

Void Linux

Void Linux在主存储库中发布node.js stable。

```
xbps-install -Sy nodejs
```

独自的

Solus在其主存储库中提供node.js.

```
sudo eopkg install nodejs
```

<h2 id="windows">视窗</h2>

建议从安装它的机器上下载Node.js. Node.js的下载网站自动考虑Windows是否可用作32位或64位版本。

1.从网站上

[https://nodejs.org/en/download](https://nodejs.org/en/download/)下载当前8.x LTS版本的Node.js.

![下载Node.js.](../../de/install/media/w01downloadnode.png "'：尺寸= 550'")*下载Node.js *

1.双击启动下载的Node.js安装程序。

？>通常，程序位于文件夹`Downloads`中，并遵循命名方案`node-<Version>.msi`。

1.如果出现一条消息，指出该应用程序不是Microsoft Store中经过验证的应用程序，

   选择`Trotzdem installieren`。

1.使用默认设置安装Node.js.请勿更改安装路径。

   确认任何出现的安全查询。

![安装Node.js.](../../de/install/media/w03nodeinst.gif)* Node.js安装*