---
title: ioBroker已停止工作
lastChanged: 06.06.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/trouble/RunsNoMore.md
hash: UsV8EdQdT5BLeSXWa+Fxes2caK4VGm5HBv3MblYRwjI=
---
＃ioBroker已停止工作
在ioBroker不再运行的论坛中经常发生这种情况。但这句话承载着尽可能多的信息：我的汽车不开车。

有人认为汽车不开车的原因可能有1000个：没有燃料，电池没电，轮胎没气了，和，...

ioBroker是非常模块化的，您可以很容易地修理任何零件。使用Node.js软件包从目录中删除了配置文件，并且只要此配置目录仍然完整，ioBroker的安装就不会发生任何严重的情况。

您注意到的第一件事是，如果“ admin”未运行，ioBroker将不会运行。但是，或多或少有一种清晰的算法如何检查损坏的内容。
检查js控制器是否正在运行：

** Linux：**

````
Linux: ps -A | grep iobroker
````

** Windows：**

检查Process Explorer中是否存在node.exe进程（显示所有进程）

在Linux下必须可见：

```
pi@pi:~$ ps -A | grep iobroker
1807 ? 13:59:22 iobroker.js-con
```

如果不起作用，请尝试从ioBroker开始

** Linux：**

```
cd /opt/iobroker
iobroker start
```

或** Windows：**

```
cd C:\ioBroker
iobroker start
```

如果它仍未运行或有错误消息，则可以尝试手动启动js控制器。

```
cd /opt/iobroker
node node_modules/iobroker.js-controller/controller.js --logs
```

如果有任何错误消息，您可以尝试更新“ js-controller”。

当js控制器运行时，必须占用TCP端口9000和9001。您可以使用以下命令进行检查：

```
netstat -n -a -p TCP
```

以下几行必须可见：

```
TCP 0.0.0.0:9000 0.0.0.0:0 LISTENING
TCP 0.0.0.0:9001 0.0.0.0:0 LISTENING
```

使用Redis时，它应如下所示：

```
TCP 0.0.0.0:6379 0.0.0.0:0 LISTENING
TCP 0.0.0.0:9001 0.0.0.0:0 LISTENING
```

如果看不到（或只有一个），则端口可能已被其他程序占用。您可以在* / opt / iobroker / iobroker-data / iobroker.json *中更改端口。或重新配置另一个程序。

##重新安装适配器或js控制器
如果适配器或js控制器在更新后运行且不再起作用，则更新很可能出了点问题。但是您可以非常轻松地再次安装适配器。您只需要在控制台中编写：

```
cd /opt/iobroker
iobroker stop adapterName
npm install iobroker.adapterName
iobroker upload adapterName
iobroker start adapterName
```

或对于js控制器：

```
cd /opt/iobroker
iobroker stop
npm install iobroker.js-controller
iobroker start
```

##检查或node.js和npm是否正确安装
如果js-controller没有运行，则也可能根本没有安装node.js。
建议使用8.x版本的node.js。

Node.js版本10.x已在很大程度上进行了测试（截至2019年5月6日），使用12.x无法保证它将正常运行。

命令

```
node -v
npm -v
```

必须显示相同的版本号。如果不是，则应卸载并重新安装node.js。或检查搜索路径。

Node.js的卸载和安装方式与ioBroker手动安装的方式相同（对于Raspberry和其他Linux系统）。

这里详细描述了必要的步骤。

在这里您可以找到有关其他系统的信息..
检查管理适配器是否正在运行

首先检查管理员是否被激活：

```
cd /opt/iobroker
iobroker list instances
```

必须有这样的一行：

```
system.adapter.admin.0 : admin - enabled, port: 8081, bind: 0.0.0.0, run as: admin
```

如果有“禁用”而不是“启用”，则可以按以下方式激活适配器：

```
iobroker start admin
```

如果IP地址不正确，请输入：

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
iobroker set admin.0 --secure false
```

然后，端口上的实例（默认为8081）必须可见。

用

```
netstat -n -a -p TCP
```

您可以检查是否可以找到该行：

```
TCP 0.0.0.0:8081 0.0.0.0:0 LISTENING
```

如果仍未运行，则可以手动启动它，看看是否有任何错误：cd / opt / iobroker节点node_modules / iobroker.admin / admin.js --logs

日志中也可能有东西。日志文件位于*** / opt / iobroker / log / iobroker.JJJJ-MM-DD.log ***下。

您可以使用命令

```
cd /opt/iobroker
cat log/iobroker.JJJJ-MM-TT.log
```

查看文件。当然，YYYY-MM-DD必须替换为当前日期。 （“ Cat”仅在Linux下可用）

##安装管理员的另一个实例
如果通过管理控制台更改了设置，并且您无法再访问管理页面，则仍然可以选择安装第二个管理实例。

因此：

```
iobroker add admin --port 8089
```

跑步。

8089是一个肯定免费的端口。然后，您可以通过以下网址访问Admin：http：// ip：8089。

再次确定设置后，您应该卸载新实例（端口8089上的第二个实例）以节省资源。

## Npm消失了
>！这在Debian（Raspbian）Buster中正在发生

由于npm的问题，可能会发生以下情况：从Linux升级后，通常在皮肤版本（6.x; 8.x，10.x）中也升级了nodejs，突然没有任何工作。

例如，不再安装适配器，错误消息是*** npm not found ***

在这种情况下，请在控制台中检查：

节点-v npm -v

通常（截至2019年7月30日）未找到节点版本8.15.0和npm。

升级npm的正常过程不起作用，因为npm不存在。因此，您必须首先卸载节点，然后重新安装它：

```
sudo apt-get --purge remove node
sudo apt-get --purge remove nodejs
sudo apt-get autoremove
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

现在通常应该安装npm6.x。

如果先前安装了Node的另一个主版本（不是10.x），则必须在节点10上编译软件包

```
cd /opt/iobroker
npm rebuild
```