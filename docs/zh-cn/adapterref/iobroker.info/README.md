---
BADGE-Number of Installations: http://iobroker.live/badges/info-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.info.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.info.svg
BADGE-NPM: https://nodei.co/npm/iobroker.info.png?downloads=true
BADGE-Travis-CI: http://img.shields.io/travis/iobroker-community-adapters/ioBroker.info/master.svg
BADGE-Dependency Status: https://img.shields.io/david/iobroker-community-adapters/iobroker.info.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/iobroker-community-adapters/ioBroker.info/badge.svg
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.info/README.md
title: 管理员
hash: xQZlmob1ntYjDypLjfDHHF6VpmbxHwyIwAlH6qmampA=
---
#Admin
信息适配器的开发是为了向用户提供有关系统，ioBroker和相关主题的各种信息。用户应该对所有有趣和重要的数据进行概述，如果有重要信息，ioBroker团队将有机会更快地联系用户。

＃安装
<img height="80" align="left" src="img/install.png">要在“选项卡”选项卡中查看信息窗口，必须先在安装后在Admin中将其检查为“可见”。要执行此操作，请单击“管理”窗口左上角的左侧三角形，然后在菜单中选择“信息”。

＃配置
<p align="center"> <img height="300" align="right" src="img/config.png"> </p>

* **不显示时钟**  - 隐藏左上角的时钟。
* **显示适配器请求**  - 显示适配器请求面板。
    * **启动时关闭的适配器请求**  - 当信息窗口启动时，具有适配器请求的面板将关闭。
* **显示已知错误**  - 显示已知错误的面板和已安装适配器的请求。
    * **启动时已知错误关闭**  - 具有已知错误的面板在信息窗口开始时关闭。

* **来自iobroker.net的新闻**  - 显示官方ioBroker新闻的面板。
* **显示最新论坛条目**  - 显示最近论坛条目的面板。
* ** Feednami API密钥** - 如果使用主机名调用ioBroker，例如： iobroker：8081或类似的东西，你需要在Feednami免费注册以获得适当的API密钥。这不是通过IP地址访问所必需的。

* **显示文档**  - 显示文档的按钮。
    * **选择文档所需的语言**  - 选择要包含在文档中的语言。 （您可能必须单击右侧的名称来选择 - 默认 - >设置语言+英语）

* **搜索Github用于未知适配器（专家）**  - 显示面板在github中搜索未授权的适配器。
    * **将适配器排序为**  - 按名称，创建日期或上次更新对搜索结果进行排序。
    * **逆序**  - 反转结果的顺序。
    * **启动时关闭新适配器**  - 启动信息窗口时，关闭具有未知适配器的面板。

* **不加载当前系统数据**  - 不会循环加载当前系统数据。
    * **每x秒加载CPU数据**  -  CPU数据每1到10秒循环加载一次。 （0关 - 默认3）
    * **每x秒加载内存数据**  - 内存数据每1至10秒循环加载一次。 （0关 - 默认3）
    * **每隔x秒加载硬盘数据**  - 硬盘数据每1至10秒循环加载一次。 （0关 - 默认8）
    * **每x秒充电一次电池数据**  - 电池数据每1至10秒循环加载一次。 （0关 - 默认8）
    * **每隔x秒加载网络数据**  - 网络数据每1到10秒循环加载一次。 （0关 - 默认3）
    * **每x秒加载进程和用户数据**  - 进程和用户数据每1到10秒循环加载一次。 （0关 - 默认8）

对于Windows系统，系统数据的循环加载不应该发生得太快，因为这会对系统造成相当大的负担。已选择默认值在大多数系统上运行时没有问题。

#Info标签
通过单击![打开/展开块](../../../de/adapterref/iobroker.info/img/expand.png)，几乎可以打开或关闭所有块。

##时钟
<img height="50" align="left" src="img/clock.png">时钟没有特殊功能（但我已经付出了努力），并且可以在配置中随时关闭。

<br><br>

##消息
<img height="200" align="left" src="img/messages.png">为了快速向用户发送有关ioBroker的重要消息，创建了创建消息的可能性。仅在某些条件适用时才会显示这些消息。因此，如果未安装适配器，则不会在适配器上显示任何消息。这样可确保仅警告用户，并且还会受到问题的影响。

可以在![关闭消息](../../../de/adapterref/iobroker.info/img/close_message.png)的右上角单击关闭消息，但只要问题仍然存在，只要重新加载Info-Tab就会重新出现。

###消息（VIS小部件）
<img height="100" align="left" src="img/vis.png">对于消息，创建了VIS窗口小部件，仅当消息涉及用户时才会显示该窗口小部件。如果没有消息，则不显示任何消息，因此您不需要在VIS表面上为消息添加额外空间，而只需将其放置在屏幕中间即可。

##文档
<img height="150" align="left" src="img/documentation.png">我们整理了一系列重要链接。您可以通过单击右侧“文档”右侧的按钮将其作为下拉列表找到。如果该按钮不可见，请确保选中配置中的相应项目。

各个链接存储在不同的类别中：社区，文档，新闻，博客，视频播放列表，开发和其他

对于外部链接的正确性和完整性，我们无法保证。如果链接丢失或不正确，请发送电子邮件给我们。

##更新
<img height="200" align="left" src="img/updates.png">如果发布了适配器的新版本并且您已安装它，则它将显示在此列表中。

从这里您可以点击![更新按钮](../../../de/adapterref/iobroker.info/img/update_button.png)直接更新。
如果将鼠标移到![更改日志图标](../../../de/adapterref/iobroker.info/img/changelog.png)上，您将看到自您的版本以来最重要的更改。
通过单击![文件](../../../de/adapterref/iobroker.info/img/readme.png)，将显示适配器的完整描述。

<br>

##新适配器
<img height="200" align="right" src="img/new_adapters.png">此处显示过去60天内所有新的和正式发布的适配器。

从这里，您可以通过单击![安装按钮](../../../de/adapterref/iobroker.info/img/install_button.png)直接安装新适配器。
通过单击![文件](../../../de/adapterref/iobroker.info/img/readme.png)，将显示适配器的完整描述。

<br>

##系统信息
<img height="200" align="left" src="img/systeminfo.png">此处显示ioBroker系统的系统信息。当然，在多主机系统的情况下，还显示其他主机的信息。这些数据来自js控制器。

以下信息（每个主机）作为信息提供：

 - 操作系统（linux，win32，darwin，android，aix，freebsd，openbsd或sunos）
 - 架构（穷人，arm64，ia32，mips，mipsel，ppc，ppc64，s390，s90x，x32和x64）
 -  CPU（核心数）
 - 速度（处理器速度）
 - 型号（处理器型号）
 -  RAM（近似总内存）
 - 系统运行时间（系统运行多长时间）
 -  Node.js（Node.js版本 - 如果它是较新版本或您的版本已过时，此信息也在这里）
 -  NPM（NPM版）
 - 硬盘大小（ioBroker所在硬盘的大小）
 - 无硬盘（仍有多少空间）
 - 适配器数量（目前为ioBroker发布了多少个适配器）
 - 运行时间（ioBroker在没有重启的情况下运行多长时间）
 - 活动实例（当前在此主机上运行的适配器实例数）
 - 主机名（主机名）

```
Sollten Informationen fehlen, dann sollte eine aktuelle Version des JS-Controllers installiert werden.
Das ist der Datenbestand des JS-Controllers v1.5.7.
```

通过单击![系统信息详细视图](../../../de/adapterref/iobroker.info/img/sysinfo_detail_button.png)，将显示有关主系统的详细信息。

###系统信息（详细视图）
这里显示有关房屋系统的大量信息并将其存储为对象。这些可以让你非常舒服地使用。大多数数据仅在首次充电时读取并保存，因为这些数据不会轻易改变。

一些数据也会周期性更新。可以在配置中设置这种情况发生的频率。

请记住，并非所有操作系统都提供所有信息，这可能导致某些信息无法显示。

####系统
这里显示硬件数据 - 主板，BIOS，外壳等......

####软件
软件包括有关操作系统，已安装软件，运行进程和登录用户的数据。

####中央处理器
在这里，您可以找到有关CPU的数据，如速度，负载和温度。

Windows的问题：wmic用于检测Windows系统的温度。在某些情况下，需要使用管理员权限运行wmic。因此，如果您没有获得任何值，请尝试使用适当的权限再次运行它。如果仍然没有获得任何值，则系统可能不支持此功能。

Linux的问题：在某些情况下，您需要安装Linux传感器软件包来测量温度，例如：在基于DEBIAN的系统上运行：

```
$ sudo apt-get install lm-sensors
```

####主内存
这里是所有主要内存数据，如可用内存或RAM条数据。

####硬盘
硬盘驱动器，分区，raid和ROM上的所有数据。

Linux的问题：能够使用S.M.A.R.T.要查看Linux状态，您需要安装smartmontools。在基于DEBIAN的Linux发行版上，您可以通过执行以下操作来安装它：

```
$ sudo apt-get install smartmontools
```

#### Graphic
如果可用/支持，此处显示有关控制器或监视器的数据。

#### Network
有关网络连接的所有数据。

####电池
有关电池的所有数据（如果存在）。

Windows问题：wmic用于检测Windows系统的电池状态。在某些情况下，需要使用管理员权限运行wmic。因此，如果您没有获得任何值，请尝试使用适当的权限再次运行它。如果仍然没有获得任何值，则系统可能不支持此功能。

##适配器请求
<img height="200" src="img/adapter_requests.png">

“适配器请求”面板可以隐藏在配置中，也可以在加载时以关闭状态显示。

##问题和错误
<img height="200" src="img/issues_bugs.png">

“问题和错误”面板可以隐藏在配置中，也可以在加载时以关闭状态显示。

Github上的## ioBroker适配器
<img height="200" src="img/adapter_search.png">

“Github上的ioBroker适配器”面板可以隐藏在配置中，也可以在加载时以关闭状态显示。

##新闻
<img height="200" src="img/news.png">

##论坛
<img height="200" src="img/forum.png">

## Changelog

### 1.3.x (2019-04-01)
* (ldittmar) better system information

### 1.2.7 (2019-03-17)
* (ldittmar) little fixes
* (ldittmar) unknow adapters search new design
* (ldittmar) better design for PC monitor
* (ldittmar) unknow adapters show more informations
* (ldittmar) stable version

### 1.2.5 (2019-03-14)
* (ldittmar) show adapter requests
* (ldittmar) show bugs and issues
* (ldittmar) diyplay important links
* (ldittmar) show important popup news
* (ldittmar) vis widget for popup news

### 1.1.3 (2019-01-03)
* (ldittmar) compact mode compatibility added
* (ldittmar) add chinese support
* (ldittmar) add new forum support
* (ldittmar) add chinese forum support
* (ldittmar) move to iobroker-community-adapters

### 1.0.2 (2018-11-30)
* (ldittmar) fixed problems with Node version info in multihost system

### 1.0.1 (2018-11-27)
* (ldittmar) search for new adapters on Github
* (ldittmar) check for Node.js update
* (ldittmar) https problems with news and forum data solved
* (ldittmar) polish added as language

### 1.0.0 (2018-11-25)
* (ldittmar) full compatibility to Admin 3.x
* (ldittmar) clock can be disabled

### 0.1.0 (2018-01-02)
* (ldittmar) compatibility to Admin 3.x / beta release

### 0.0.6 (2017-12-11)
* (ldittmar) some fixes / install and update implemented

### 0.0.4 (2017-12-08)
* (ldittmar) some fixes and design correction
* (ldittmar) show informations about adapters (update/new)
* (ldittmar) show system informations

### 0.0.1 (2017-11-23)
* (ldittmar) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017 - 2019 ldittmar <iobroker@lmdsoft.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.