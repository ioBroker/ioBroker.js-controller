---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/config/cli.md
title: ioBroker的控制台命令
hash: 4zamKLaOfbKpOwq0yrGsxHCQnDFBHNUOJf+8fdbXcdo=
---
＃ioBroker的控制台命令
可以通过控制台（Windows和Linux）执行一些操作，如启动，停止或更新。这是它们的描述。

注意：可以从iobroker命令可用的任何目录中调用以```iobroker```开头的所有命令。必须从ioBroker根目录中调用```npm install```命令。

可以使用以下命令：

-[npm install iobroker.adapterName]（＃npm-install-iobrokeradaptername）
-[iobroker start]（＃iobroker-start）
-[iobroker stop]（＃iobroker-stop）
-[iobroker重新启动]（＃iobroker-restart）
-[iobroker isrun]（＃iobroker-isrun）
-[iobroker启动适配器名称。实例]（＃iobroker-start-adaptername实例）
-[iobroker停止adapterName.instance]（＃iobroker-stop-adapternameinstance）
-[iobroker重新启动adapterName.instance]（＃iobroker-restart-adapternameinstance）
-[iobroker添加适配器名称\ [-已启用\] \ [-主机\ <主机\> \] \ [-端口\ <端口\> \]]（＃iobroker-add-adaptername）
-[iobroker安装适配器名称]（＃iobroker-install-adaptername）
-[iobroker上传适配器名称]（＃iobroker-upload-adaptername）
-[iobroker设置]（＃iobroker-setup）
-[iobroker del adapterName]（＃iobroker-del-adaptername）
-[iobroker del adapterName.instance]（＃iobroker-del-adapternameinstance）
-[iobroker更新\ [存储库URL \] \ [-可更新\]]（＃iobroker-update-repository-url）
-[iobroker升级\ [存储库URL \]]（＃iobroker-upgrade）
-[iobroker升级自我\ [存储库网址\]]（＃iobroker-upgrade-self）
-[iobroker升级适配器名称\ [存储库网址\]]（＃iobroker-upgrade-adaptername）
-[iobroker object get objectId]（＃iobroker-object-get）
-[iobroker对象chmod \ <object-mode\> \ [状态模式\] \ <id\> ]（＃iobroker-object-chmod）
-[iobroker object chown \ <用户\> \ <组\> \ <id \>]（＃iobroker-object-chown）
-[iobroker对象列表\ <id \>]（＃iobroker-object-list）
-[iobroker设置\ <实例\> \ [设置\]]（＃iobroker设置）
-[iobroker state get objectId]（＃iobroker-state-get）
-[iobroker状态getplain objectId]（＃iobroker-state-getplain）
-[iobroker状态getvalue objectId]（＃iobroker-state-getvalue）
-[iobroker状态集objectId newValue]（＃iobroker-state-set）
-[iobroker state del objectId]（＃iobroker-state-del）
-[iobroker消息\ <适配器\> \ [。instanceid \] \ <命令\> \ [\ message \]]（＃iobroker-message）
-[iobroker设置]（＃iobroker-state-setplain）
-[iobroker clean]（＃iobroker-clean）
-[iobroker备份]（＃iobroker-backup）
-[iobroker主机]（＃iobroker-host）
-[iobroker主机集]（＃iobroker-host-set）
-[iobroker主机删除]（＃iobroker-host-remove）
-[iobroker restore \ <备份名称或路径\>]（＃iobroker-还原）
-[iobroker列表\ <类型\> \ [模式\]]（＃iobroker-list）
-[iobroker chmod \ <模式\> \ [模式\]]（＃iobroker-chmod）
-[iobroker chown \ <用户\> \ [组\] \ [模式\]]（＃iobroker-chown）
-[iobroker adduser \ <user \> \ [-ingroup group \] \ [-password pass \]]（＃iobroker-adduser）
-[iobroker deluser \ <用户\>]（＃iobroker-deluser）
-[iobroker passwd \ <用户\> \ [-密码pass \]]（＃iobroker-passwd）
-[iobroker文件读取\ <toRead \> \ [toWrite \]]（＃iobroker文件读取）
-[iobroker文件写入\ <toRead \> \ <toWrite \>]（＃iobroker-file-write）
-[iobroker版本\ [adapterName \]]（＃iobroker-version）
-[iobroker uuid]（＃iobroker-uuid）
-[iobroker状态]（＃iobroker-status）
-[iobroker repo \ [repoName \]]（＃iobroker-repo）
-[iobroker信息]（＃iobroker-info）
-[iobroker日志\ [-watch \]]（＃iobroker-logs）

**注意：**有一个参数```--timeout 5000```§，可以与每个命令一起使用。它指定连接数据库的超时时间（以毫秒为单位）。

## Npm install iobroker.adapterName
必须从ioBroker的根目录（通常是```/opt/iobroker```或```C:\Program Files\ioBroker```§）中调用此命令。它使用npm管理器来安装或更新给定的适配器或js-controller。即使“ admin”或“ js-controller”有问题，它也始终有效。

用法示例：

-```npm install iobroker.admin```-更新或安装“管理员”适配器
-```npm install iobroker.js-controller```-更新或安装js-controller本身
-```npm install https：// github.com / husky-koglhof / ioBroker.hmm / tarball / master /```-直接从github或其他地方安装适配器。它必须是ZIP或GZ软件包，并且必须包含package.json。

如果已安装适配器，则在调用```npm install ..```之后，应重新启动指定的适配器或整个js-controller，这样更改才能生效。

这可以通过```iobroker restart adapterName```或仅通过```iobroker restart```完成。有关详细信息，请参见[这里](#restart)。

***注意：***只能安装名称为ioBroker.zzz **的软件包。

## Iobroker开始
将iobroker作为守护程序启动。如果ioBroker尚未启动，您将收到警告：

```ioBroker controller daemon already running. PID: xx```

*** Windows注意：***通常，Windows下的ioBroker作为服务启动。此命令将启动ioBroker的第二个实例，这将导致冲突。使用ioBroker目录中的§§JJJJJ_0_0§§代替```iobroker start```命令。您应该具有启动服务的管理员权限。

## Iobroker停止
如果iobroker作为守护程序运行，则将其停止。如果ioBroker没有启动，您将收到警告：

```ioBroker controller daemon is not running```

*** Windows注意：***通常，Windows下的ioBroker作为服务启动。该命令无效。使用ioBroker目录中的§§JJJJJ_0_0§§代替```iobroker stop```命令。您应该具有管理员权限才能停止该服务。

## Iobroker重新启动
只是停止和启动命令在一起。往上看。

## Iobroker isrun
返回ioBroker的实际状态。是否开始。如果未启动ioBroker，则返回码为100。

与```iobroker status```相同。

## Iobroker启动adapterName.instance
您可以从控制台启动指定的适配器。它会自动启用并启动。

如果适配器已启动，它将重新启动。

您可以在“管理员”中控制适配器实例已启用。

用法：

-```iobroker start email.0```-启用并启动适配器实例ioBroker.email.0

注意：您可以调用```iobroker start all```来启动所有禁用的实例，例如恢复后。

## Iobroker停止adapterName.instance
您可以从控制台停止指定的适配器。它将禁用并停止。以后不会自动重新启动。

您可以在“管理员”中控制适配器实例已被禁用。

用法：

-```iobroker stop email.0```-启用并启动适配器实例ioBroker.email.0

## Iobroker重新启动adapterName.instance
只需重新启动指定的适配器即可。如果被禁用，它将被启用。

## Iobroker添加适配器名称
完整语法为```iobroker add adapterName [desiredInstanceNumber] [--enabled] [--host \<host\>] [--port \<port\>]```

如果未安装，则安装并创建指定适配器的实例。如果适配器实例尚不存在，则将使用下一个实例号。

还有一些其他参数：

-启用：适配器实例将在创建后自动启用，否则将使用适配器预定义值。
-host：必须在其中创建适配器实例的主机名。您可以使用“ iobroker list hosts”命令获取主机列表。（尚未实现）
-端口：如果适配器具有native.port设置，则安装后将设置为所需的值。
-requiredInstanceNumber：您可以指定所需的实例号。

用法：

-```iobroker add dwd```--安装并创建dwd适配器实例。
-```iobroker add admin --enabled --port 80```-在端口80上创建第二个（通常）管理适配器实例并启用它。

如果此命令不起作用，则始终可以使用```npm install iobroker.adapterName```命令强制进行更新或安装。将不会创建任何实例，您应该在那之后再调用```iobroker add iobroker.adapterName```命令。

## Iobroker安装adapterName
仅将适配器安装在ioBroker中，不创建任何实例。如果尚未安装适配器，则会收到以下警告：

```adapter "admin" yet installed. Use "upgrade" to install newer version.```

## Iobroker上传适配器名称
将适配器中“ www”和“ admin”文件夹中的网页上传到ioBroker文件存储中。开发人员通常使用它来查看在配置页面或“ www”页面上所做的更改。
您不能直接在“ iobroker / iobroker-data / adapter / file”中更改文件。在配置文件（* iobroker-data / iobroker.json *）objects.noFileCache中有一个供开发人员使用的标志，用于禁用文件缓存。将此标志设置为true（当然，更改配置文件后需要重新启动），而无需使用§§JJJJJ_0_0§§命令，即可在Web上看到iobroker-data目录的更改。

注意：您可以调用```iobroker upload all```来上传所有适配器，例如恢复后。

## Iobroker设置
如果未使用npm或Windows安装程序安装ioBroker（例如，仅从github复制并解压缩），则必须调用此命令。它创建默认配置文件并准备数据目录。

您可以使用参数“ first”调用此命令，以确保如果配置还存在，则不会覆盖任何内容。

用法：

```iobroker setup first``` - create configuration files if not yet created.

## iobroker setup custom
To enable multi-host configuration (experimental) this command must be called. Following questions must be answered:
<pre><code>
Type of objects DB [file, couch, redis], default [file]:
Host of objects DB(file), default[127.0.0.1]: enter IP address of the main system
Port of objects DB(file), default[9001]:
Type of states DB [file, redis], default [file]:
Host of states DB (file), default[ip]:
Port of states DB (file), default[9000]:
</code></pre>
You can just press ENTER to take the default value shown in \[\].

**Note:** at the moment only *file* DB type is supported. If you change the ports you must be an expert.

**Note:** Check the firewall settings on the main host for the defined ports (9000/9001).

## iobroker del adapterName
Completely removes all instances and states of this adapter from ioBroker and deletes it on the disk.

You cannot restore settings of the adapter instances after deletion.

Usage:
```iobroker del dwd``` - deletes all instances and code of adapter dwd from ioBroker.

## iobroker del adapterName.instance
Removes only specified instance of this adapter from ioBroker and **not** deletes it from the disk.

You cannot restore settings of the adapter instance after deletion.

Usage:
```iobroker del dwd.0``` - deletes instance 0 of adapter dwd from ioBroker.

## iobroker update \[repository url\]
Full syntax: ```iobroker update \[repository url\]```

从配置的ioBroker存储库中读取信息。如果设置了```\repository url\```，则将从该存储库中读取信息。

用法：

-```iobroker update```--列出已配置（通常是本地）存储库中的可用版本。
-``iobroker更新https：// raw.githubusercontent.com / ioBroker / ioBroker.js-controller / master / conf / sources-dist.json`''-列出在线存储库中的可用版本。

```
>./iobroker.js update
Cannot get version of "virtual".
Cannot get version of "geofency".
update done
Adapter    "zwave"         : 0.1.0
Adapter    "yr"            : 0.1.2    , installed 0.1.2
Adapter    "web"           : 0.2.6    , installed 0.2.6
Adapter    "vis"           : 0.2.9    , installed 0.2.9
Adapter    "virtual"
Adapter    "sonos"         : 0.1.5    , installed 0.1.4 [Updateable]
Adapter    "rickshaw"      : 0.2.1    , installed 0.2.1
Adapter    "pushover"      : 0.1.0
Adapter    "onkyo"         : 0.0.4
Adapter    "telnet"        : 0.0.0
Adapter    "socketio"      : 0.2.3    , installed 0.2.3
Adapter    "simple-api"    : 0.0.3    , installed 0.0.3
Adapter    "sayit"         : 0.3.0    , installed 0.3.0
Adapter    "ping"          : 0.1.3    , installed 0.1.3
Adapter    "node-red"      : 0.1.5    , installed 0.1.5
Adapter    "mqtt"          : 0.1.6    , installed 0.1.5 [Updateable]
Adapter    "mobile"        : 0.0.2
Adapter    "legacy"        : 0.1.12
Adapter    "knx"           : 0.0.1
Controller "js-controller" : 0.5.14   , installed 0.5.14
Adapter    "javascript"    : 0.2.3    , installed 0.2.3
Adapter    "ical"          : 0.0.2    , installed 0.0.1 [Updateable]
Adapter    "hmm"           : 0.0.15   , installed 0.0.16
Adapter    "hue"           : 0.2.0    , installed 0.2.0
Adapter    "hm-rpc"        : 0.3.5    , installed 0.3.4 [Updateable]
Adapter    "hm-rega"       : 0.1.17   , installed 0.1.17
Adapter    "history"       : 0.1.3    , installed 0.1.3
Adapter    "highcharts"    : 0.0.0
Adapter    "graphite"      : 0.1.0
Adapter    "geofency"
Adapter    "example"       : 0.1.1    , installed 0.1.1
Adapter    "email"         : 0.1.0
Adapter    "dwd"           : 0.1.7    , installed 0.1.7
Adapter    "cul"           : 0.0.2    , installed 0.0.3
Adapter    "b-control-em"  : 0.1.1
Adapter    "artnet"        : 0.0.3
Adapter    "admin"         : 0.3.21   , installed 0.3.20 [Updateable]
```

该命令什么都不会改变，只是更新有关可用适配器版本的内部信息并显示出来。

要仅显示可更新的适配器，请使用过滤器“ --updatable”。

## Iobroker升级
完整语法：```iobroker upgrade \[repository url\]```

如果所有适配器（不是js-controller）在指定存储库中具有较新的版本，则将它们升级。如果未指定存储库链接，则将使用配置的存储库。

用法：

-```iobroker upgrade```--升级所有适配器。
-``iobroker升级https：// raw.githubusercontent.com / ioBroker / ioBroker.js-controller / master / conf / sources-dist.json`''-从在线存储库升级所有适配器

## Iobroker升级自我
完整语法：```iobroker upgrade self \[repository url\]```

此命令将ioBroker.js-controller升级到版本，该版本将在存储库中找到。

**注意：**如果指定或配置的存储库具有较低的版本，它将降级为该版本。

-```iobroker upgrade self```-将js-controller升级到已配置存储库中的版本。
-``iobroker升级自我https：// raw.githubusercontent.com / ioBroker / ioBroker.js-controller / master / conf / sources-dist.json`-从在线存储库升级js-controller到版本。

## Iobroker升级适配器名称
完整语法：```iobroker upgrade adapterName \[repository url\]```

此命令将指定的适配器升级到版本，该版本将在存储库中找到。

**注意：**如果指定或配置的存储库具有较低的版本，它将降级为该版本。

-```iobroker升级电子邮件```--将ioBroker.email适配器升级到配置的存储库中的版本。
-```iobroker升级电子邮件https：// raw.githubusercontent.com / ioBroker / ioBroker.js-controller / master / conf / sources-dist.json```-将ioBroker.email适配器从在线存储库升级到版本。

## Iobroker对象获取
完整语法：```iobroker get objectId```

从命令行读取对象的描述：C：\ pWork> iobroker对象get system.adapter.admin.0.uptime

```
>./iobroker object get system.adapter.admin.0.uptime
{
  "_id":"system.adapter.admin.0.uptime",
  "type":"state",
  "common":{"name":"admin.0.uptime","type":"number","role":"indicator.state","unit":"seconds"},
  "native":{}
}
```

**注意：**通常不会格式化输出，但是您可以使用标志“ --pretty”来格式化它们。

## Iobroker对象chmod
格式：```iobroker object chmod <object-mode> [state-mode] <id>```

ID可以是带有'\ *'的模式。 '\ *'只能在模式末尾。

## Iobroker对象chown
格式：```iobroker object chown <user> <group> <id>```

ID可以是带有'\ *'的模式。 '\ *'只能在模式末尾。

## Iobroker对象列表
格式：```iobroker object list <id>```

列出对象的权限，例如：

```
>iobroker object list system.adapter.admin.*

ObjectAC | StateAC |     User     |     Group    | ID
---------+---------+--------------+--------------+--------------
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.uptime
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.memRss
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.memHeapTotal
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.memHeapUsed
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.connected
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.alive
rw-r--r--                    admin  administrator system.adapter.admin.0
```

ID可以是带有'\ *'的模式。 '\ *'只能在模式末尾。

## Iobroker套装
完整语法：```iobroker set <instance> [--port value] [--enabled true|false] [--ip address] [--auth true|false] [--ssl true|false] [—-ttl value]```§用于从控制台修改实例设置。可以修改以下设置：

-端口-更改绑定实例的端口
-启用-启用/禁用实例（也可以通过“ iobroker start | stop <instance>`”来完成）
-ip-更改绑定的IP地址
-身份验证-启用或禁用身份验证
-ssl-开启或关闭SSL协议
-ttl-登录超时（以秒为单位）

## Iobroker状态获取
完整语法：```iobroker state get stateId```读取状态的JSON值：

```
>./iobroker state get system.adapter.admin.0.uptime
{"val":496,"ack":true,"ts":1425925626,"from":"system.adapter.admin.0","lc":1425925626}
```

您可以使用“ --pretty”标志来格式化输出：

```
>./iobroker state get system.adapter.admin.0.uptime --pretty
{
  "val": 496,
  "ack": true,
  "ts": 1425925626,
  "from": "system.adapter.admin.0",
  "lc": 1425925626
}
```

## Iobroker状态getplain
完整语法：```iobroker state getplain stateId```

读取状态的普通值作为列表属性：

```
>./iobroker state getplain system.adapter.admin.0.uptime
571
true
system.adapter.admin.0
1425925701
1425925701
```

## Iobroker状态getvalue
完整语法：```iobroker state getvalue stateId```

读取状态的普通值作为列表属性：

```
>./iobroker state getvalue system.adapter.admin.0.uptime
571
```

## Iobroker状态集
完整语法：```iobroker state set stateId newValue ack```

设置状态值。 “默认情况下，ack = false。

```>iobroker state set sayit.0.tts.text "Текст сказать"```

```>iobroker state set adapter.0.states.temperature 28.5 true```

如果ID错误，则不会出现错误消息。

## Iobroker状态删除
完整语法：```iobroker state del stateId```

删除状态。

## Iobroker消息
完整语法：```iobroker message adapter.instance command message```

未设置实例时，将消息发送到给定的适配器实例或适配器的所有实例。

## Iobroker清洁
清除ioBroker的所有设置。 **如果调用此命令，将无法恢复设置。**

```
>iobroker clean yes
Deleted 205 objects.
Restarting ioBroker...
```

## Iobroker备份
zip文件中ioBroker的备份设置。备份文件将在_backups_目录中创建，并具有以下名称：

```2015_02_10-17_49_45_backupIoBroker.tar.gz``` with current date and time.

**Note:** not yet finished

## iobroker restore
Full syntax: ```iobroker restore <backup name or path>```

如果使用命令```iobroker backup```创建了一些备份，则可以将其还原。如果调用不带参数的恢复，则将获得可用备份的列表。

```
/>iobroker restore
Please specify one of the backup names:
   2015_07_18-12_20_28_backupIoBroker.tar.gz or 2015_07_18-12_20_28 or 0
   2015_07_17-21_54_01_backupIoBroker.tar.gz or 2015_07_17-21_54_01 or 1
```

您可以调用```iobroker restore 0```来使用最新的备份文件或其他索引。
对于给定的示例，以下命令相同：

-iobroker恢复0
-iobroker 2015_07_18-12_20_28
-iobroker 2015_07_17-21_54_01_backupioBroker.tar.gz
-iobroker /opt/iobroker/backups/2015_07_17-21_54_01_backupioBroker.tar.gz

除“ admin”外，所有适配器都将恢复为禁用状态。要一次启用所有适配器，可以调用“ iobroker全部启动”。如果未上载某些适配器，则可以调用“ iobroker全部上载”以一次上载所有适配器的文件。

## Iobroker主机
更改对象中的主机名。

有时，通过将iobroker数据从一个系统移动到另一个系统，需要更改主机名。使用此命令可以执行。

您必须先停止ioBroker。

要将数据库中的某些特定主机名更改为当前主机名，请写```iobroker host oldHostName```。

要更改任何主机名（必须仅是单个主机系统，而不是多主机），请写§§JJJJJ_0_0§§。

## Iobroker主机集
您可以将主机名更改为某些特定的名称（而不是计算机名）。为此，您必须编写：```iobroker host set newHostName```从实际的计算机名称或先前指定的主机名重命名。

## Iobroker主机删除
要删除主机，只需编写```iobroker host remove hostNameToRemove```。请小心。

## Iobroker列表
使用此命令可以在ioBroker中显示不同类型的对象和状态。例子：

-```iobroker列出对象hm-rega.0```--显示实例hm-rega.0的所有对象
-```iobroker列表状态hm-rega.0```-显示实例hm-rega.0的所有状态
-```iobroker列表文件vis.0```-显示实例vis.0的所有文件
-``iobroker列表实例''-显示所有实例
-```iobroker列表适配器```-显示所有适配器
-```iobroker list users```--显示所有用户
-```iobroker列表群组```-显示所有群组
-```iobroker list enums```-显示所有枚举
-```iobroker列表主机```-显示所有主机

可以使用类型的简称：

-o-物件
-s-状态
-u-用户
-e-枚举
-g-组
-我-实例
-f-文件
-h-主机

例如。 ```iobroker l u```-列出所有用户。

通过“列表实例”，您可以使用其他过滤器：

-已启用-列出所有已启用的实例
-禁用-列出所有禁用的实例
-端口-列出所有带有端口的实例
-ip-列出可以绑定到某些IP的所有实例
-ssl-列出所有可以启用SSL的实例

使用：```iobroker list instances --enabled```列出所有已启用的实例

或```iobroker l i --port```列出使用的端口。

## Iobroker adduser
此命令允许创建一个新用户（默认情况下在“管理员”组中）。可以在命令中使用参数“ --ingroup”定义该组。如果未指定密码，则必须从控制台输入。
例如。在“用户”组中创建用户“马丁”：

```iobroker adduser martin --group user```

使用密码创建用户：

```iobroker adduser martin --group user --password 12345```

## Iobroker deluser
要删除现有用户，请致电：

```iobroker deluser username```

用户也会自动从所有组中删除。不能删除“ admin”用户。

## Iobroker passwd
更改现有用户呼叫的密码：

```iobroker passwd username```

系统将提示您输入密码并重复密码。
如果不需要控制台交互，请致电：

```iobroker passwd username --password newPassword```

## Iobroker chmod
更改文件模式。

## Iobroker chown
更改文件所有者。

## Iobroker文件已读取
从数据库读取文件并将其存储在本地文件系统上。
用法：

```iobroker file read <fileToRead> [storeFile]```

storeFile是可选的，但可以是目录或新文件的路径。

例：

```iobroker file read /vis.0/main/img/picture.png /opt/myfile.png```

可以将“文件”和“读取”缩短为“ f r”。

## Iobroker文件写入
将文件从本地文件系统写入数据库。
用法：

```iobroker file write <fileToRead> <storeFile>```

storeFile可以是数据库中重定向的路径，也可以是全名

示例：iobroker文件写入/opt/myfile.png /vis.0/main/img/picture.png

“文件”和“写”可以缩短为“ f w”。

## Iobroker版本
显示适配器或js-controller的版本。

js-controller的版本：

```
>iobroker version
0.11.2
>iobroker -v
0.11.2
>iobroker --version
0.11.2
```

管理适配器的版本：

```
>iobroker version admin
1.5.4
>iobroker admin -v
1.5.4
>iobroker admin --version
1.5.4
```

## Iobroker uuid
显示此ioBroker安装的UUID。

```
>iobroker uuid
8f73s7c9-2fd6-3066-189a-cccccccccc
```

## Iobroker状态
ioBroker是否运行。

## Iobroker回购
显示已配置的存储库或选择一个。

```
C:\ioBroker>ioBroker repo
default: conf/sources-dist.json
online: https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json
fast: http://download.iobroker.net/sources-dist.json

Active repo: fast
```

```
C:\ioBroker>ioBroker repo default
default: conf/sources-dist.json
online: https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json
fast: http://download.iobroker.net/sources-dist.json

Active repo: default
```

## Iobroker信息
收集有关此主机的信息。

```
Platform       : Windows
Architecture   : x64
CPUs           : 4
Speed          : 2496 MHz
Model          : Intel(R) Core(TM) i7-7660U CPU @ 2.50GHz
RAM            : 15.9 GB
System uptime  : 13d. 13:18:04
Node.js        : v8.11.1
adapters count : 176
Disk size      : 949.9 GiB
Disk free      : 813.3 GiB
NPM            : v5.8.0
```

## Iobroker日志
显示ioBroker日志的最后几行。此命令显示日志的最后1000行并监视日志。

```iobroker logs --lines 1000 --watch ```