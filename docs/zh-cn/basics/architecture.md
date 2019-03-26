---
title: 架构
lastChanged: 13.09.2018
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/architecture.md
hash: ulFhDXheOcx69I0tr7ze5s/3oTOcYmUEh4gKobwD7+o=
---
＃系统结构
？&gt; ***这是一张通配符***。 <br><br>帮助ioBroker并扩展这篇文章。请注意[ioBroker风格指南](community/styleguidedoc)，以便更容易采用这些更改。

##架构
ioBroker是模块化的，i。由许多独立组件构建而成。每个模块都有一个特定的任务。为了跟踪，ioBroker因此为其所有模块提供了一个中央协调器。该协调员的工作背景是`js-controller`。他负责中央数据管理以及所有模块之间的管理和沟通。模块本身称为`Adapter`。仅在需要时由用户安装适配器。基于Web的管理界面`admin`本身就是一个适配器。管理适配器或简称“admin”是ioBroker系统的管理界面。通常使用地址[HTTP：//本地主机：8081](http://localhost:8081)调用admin。

与Admin一起安装新适配器时，首先从Internet下载适配器文件并将其写入服务器磁盘。如果要启动适配器，则首先生成适配器的`Instanz`。可以单独配置和停止每个适配器实例，并使用admin独立启动。因此，每个实例都在自己的进程中运行，该进程在后台与ioBroker js-controller进行通信。

在具有多个ioBroker服务器的`Multihost`系统中，适配器实例也可以分布在不同的服务器上。因此，可以分配负载，也可以直接在现场连接其他硬件（例如，IO端口，USB）。

适配器，js控制器，数据库和Web前端之间的通信通过多个TCP / IP连接进行。数据交换取决于所选设置，以纯文本或加密方式进行。

ioBroker和适配器主要用编程语言JavaScript编写。要运行JavaSript，您需要一个相应的运行时环境。因此，ioBroker使用`Node.js`。此运行时环境适用于各种软件平台，例如Linux，Windows和macOS。 JavaScript包管理器`npm`用于安装ioBroker和适配器。

@@@带有建筑图层的漂亮图片@@@@@@ JS控制器说明并转移到适配器和实例@@@