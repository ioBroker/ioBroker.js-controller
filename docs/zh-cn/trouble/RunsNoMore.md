---
title: ioBroker不再工作了
lastChanged: 06.06.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/trouble/RunsNoMore.md
hash: UbJALyhZ0lBEJau1MBYfLa578cAArCRtYxl1BBtaDXM=
---
＃ioBroker不再工作了
在论坛中经常会出现ioBroker不再运行的情况。但这是一个包含尽可能多信息的声明：我的车不开车。

你不认为汽车不能驾驶可能有1000个原因：没有燃料，没有电池，轮胎漏气，而且......

ioBroker非常模块化，您可以非常轻松地修复任何部件。配置文件是从带有Node.js软件包的目录中取出的，并且只要该配置目录仍然完整，ioBroker安装就不会发生任何严重问题。

首先，您注意到“admin”未运行时ioBroker未运行。但是，如何检查破坏的内容或多或少有明确的算法。
检查js-controller是否正在运行：

** **的Linux

````
Linux: ps -A | grep iobroker
````

**的Windows：**

检查node.exe进程是否在进程资源管理器中（显示所有进程）

在linux下，必须看到一些东西：

```
pi@pi:~$ ps -A | grep iobroker
1807 ? 13:59:22 iobroker.js-con
```

如果它不起作用，请尝试ioBroker开始

** **的Linux

```
cd /opt/iobroker
iobroker start
```

或** Windows：**

```
cd C:\ioBroker
iobroker start
```

如果它仍未运行或错误消息，则可以尝试手动启动js-controller。

```
cd /opt/iobroker
node node_modules/iobroker.js-controller/controller.js --logs
```

如果出现错误消息，您可以尝试更新“js-controller”。

如果js-controller正在运行，则必须使用TCP端口9000和9001。可以使用以下命令检查：

```
netstat -n -a -p TCP
```

必须显示以下行：

```
TCP 0.0.0.0:9000 0.0.0.0:0 LISTENING
TCP 0.0.0.0:9001 0.0.0.0:0 LISTENING
```

使用Redis时，它应如下所示：

```
TCP 0.0.0.0:6379 0.0.0.0:0 LISTENING
TCP 0.0.0.0:9001 0.0.0.0:0 LISTENING
```

如果没有任何东西可见（或只有一个），则可能其他程序的端口被占用。您可以将端口更改为* / opt / iobroker / iobroker-data / iobroker.json *。或者重新配置另一个程序。

##重新安装适配器或js控制器
如果一个适配器或js-controller运行，并且在更新后不再，那么很可能在更新中出现了问题。但您可以再次轻松安装适配器。您所要做的就是在控制台中写：

```
cd /opt/iobroker
iobroker stop adapterName
npm install iobroker.adapterName
iobroker upload adapterName
iobroker start adapterName
```

或者对于js-controller：

```
cd /opt/iobroker
iobroker stop
npm install iobroker.js-controller
iobroker start
```

##检查或node.js和npm安装正确
如果js-controller没有运行，则可能根本没有安装node.js。
建议使用8.x版本的node.js.

Node.js版本10.x主要经过检查（截至06.05.2019），在12.x时无法保证它能正常工作。

命令

```
node -v
npm -v
```

必须显示相同的版本号。如果不是，那么您应该卸载node.js并重新安装。或者检查搜索路径。

卸载和安装Node.js的方式与手动ioBroker安装（Raspberry和其他Linux系统）相同。

这里详细描述了必要的步骤。

在这里您可以找到有关其他系统的信息..
检查管理适配器是否正在运行

首先看，如果管理员被激活：

```
cd /opt/iobroker
iobroker list instances
```

必须有这样一条线：

```
system.adapter.admin.0 : admin - enabled, port: 8081, bind: 0.0.0.0, run as: admin
```

如果有“禁用”而不是“启用”，您可以启用这样的适配器：

```
iobroker start admin
```

如果IP地址错误，那么写：

```
iobroker set admin.0 --bind 0.0.0.0
```

允许所有IP地址。

您还可以更改端口：

```
iobroker set admin.0 --port 8081
```

或关闭SSL：

```
iobroker set admin.0 --ssl false
```

然后，实例必须在端口上可见（默认为8081）。

同

```
netstat -n -a -p TCP
```

你可以检查是否找到该行：

```
TCP 0.0.0.0:8081 0.0.0.0:0 LISTENING
```

如果它仍然不起作用，那么你可以手动启动并查看是否有任何错误：cd / opt / iobroker node node_modules / iobroker.admin / admin.js --logs

它也可以是日志中的东西。日志文件可在*** / opt / iobroker / log / iobroker.JJJJ-MM-TT.log ***中找到。

你可以使用命令

```
cd /opt/iobroker
cat log/iobroker.JJJJ-MM-TT.log
```

显示文件。当然，YYYY-MM-DD必须替换为当前日期。 （“Cat”只能在Linux下使用）

##安装另一个Admin实例
如果管理控制台的设置被阻止且您无法访问管理页面，则仍有可能安装第二个管理实例。

要做到这一点：

```
iobroker add admin --port 8089
```

运行。

这是8089一个当然免费的端口。然后，您可以通过http：// ip：8089联系管理员。

设置再次正常后，您应该卸载新的（端口8089上的第二个）实例以节省资源。

## Npm已经消失了
>！目前这种情况发生在Debian（Raspbian）Buster

由于npm的问题，从Linux升级后，通常也会在皮肤版本（6.x，8.x，10.x）内升级nodejs，但突然间没有任何问题。

因此，例如，不再安装适配器，错误消息是*** npm not found ***

如果请检查控制台：

node -v npm -v

通常现在（截至2019年7月30日）节点版本是8.15.0并且找不到npm。

升级npm的正常程序不起作用，因为npm不存在。因此，您必须先卸载节点，然后重新安装：

```
sudo apt-get --purge remove node
sudo apt-get --purge remove nodejs
sudo apt-get autoremove
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

现在通常应该安装npm 6.x.

如果之前安装了另一个主要版本（不是10.x）的Node，则必须在节点10上编译包

```
cd /opt/iobroker
npm rebuild
```