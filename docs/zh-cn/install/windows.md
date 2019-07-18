---
title: 安装
lastChanged: 18.07.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/windows.md
hash: XFdcrokNPGtTri8RFE+c4m/7TgKEDdKqtTLfO7BRt1s=
---
＃在Windows上安装ioBroker
？&gt; ***此项目目前正在扩展***。 <br><br>帮助我ioBroker。请注意[ioBroker风格指南](community/styleguidedoc)，以便更容易采用这些更改。

以下说明将指导您逐步完成安装。请不要跳过步骤，因为某些命令相互依赖。

##检查要求
！>首先检查系统是否满足所有必要的[安装要求](install/requirements)。

Node.js是运行ioBroker所必需的。以下假设PC上既没有安装Node.js也没有安装ioBroker。如果已安装ioBroker，请继续[更新]（）部分。

为了检测是否安装了Node.js，使用组合键<kbd>⊞Windows</kbd> + <kbd>r</kbd>打开`Ausführen`对话框，然后在那里执行命令

```
cmd.exe /C node -v & pause
```

进入。确认命令后，会出现一个窗口。

![Node.js的版本](../../de/install/media/w02nodecheck.png)* Node.js考试*

将显示错误消息或已安装的Node.js版本。

输出Node.js版本号时，首先检查它是否仍符合[安装要求]（）。

如果错误消息是`Der Befehl "node" ist entweder falsch geschrieben oder konnte nicht gefunden werden.`，则不安装node.js并且安装[可以马上开始](#nodeinst)。

##快速入门
？>此安装步骤摘要适用于已多次安装ioBroker的有经验的ioBroker用户。

初学者应遵循[详细说明](#nodeinst)。

* Node.js 8.x LTS版本[下载并安装]（install / nodejs）。
*命令行`cmd.exe`以管理员身份打开，依次打开以下命令

  运行：

```
npm install --global windows-build-tools
md C:\iobroker
cd /d C:\iobroker
npm install iobroker
npm install --production --no-optional --logevel=error
iobroker status
```

<div id="nodeinst"></div>

##安装Node.js和npm
Node.js的安装根据[本指南](install/nodejs)进行。

##安装ioBroker
？> ioBroker可以安装在本地硬盘上可自由选择的文件夹中。如果安装路径包含空格，则必须在所有带引号的命令中包含完整路径。
示例命令：`dir "C:\ioBroker Testsystem"`。

？> ioBroker的默认安装文件夹是`C:\iobroker`。

1.以管理员身份打开命令行窗口。使用组合键执行此操作

<kbd>⊞Windows</kbd> + <kbd>r</kbd>打开`Ausführen`对话框，然后打开命令

```
cmd
```

   输入。

由于命令行窗口必须以管理员身份打开，因此请不要使用`OK`输入** **，而是使用组合键`Strg`+`Umschalt`+`Eingabetaste`。发出确认提示，必须使用`Ja`或管理员密码输入进行确认。

！>黑色命令窗口中的标题栏现已打开，必须以`Administrator:`开头。

某些ioBroker适配器包含需要为Windows编译的组件。因此，在安装ioBroker之前安装了所谓的`windows-build-tools`。有关`windows-build-tools`的更多信息，请参阅[在这里找到](https://github.com/felixrieseberg/windows-build-tools)。

1.使用以下命令安装`windows-build-tools`：

```
npm install --global windows-build-tools
```

1.然后在命令行窗口中创建安装文件夹的命令

   运行：

```
md C:\iobroker
```

1.现在可以安装实际的ioBroker安装包：

```
cd /d C:\iobroker
npm install iobroker
```

   结果应如下所示：

```
[...]
╭───────────────────────────────────────────────────────╮
│ The iobroker files have been downloaded successfully. │
│ To complete the installation, you need to run         │
│                                                       │
│   npm i --production --no-optional --logevel=error    │
│                                                       │
╰───────────────────────────────────────────────────────╯

npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN enoent ENOENT: no such file or directory, open 'C:\iobroker\package.json'
npm WARN iobroker No description
npm WARN iobroker No repository field.
npm WARN iobroker No README data
npm WARN iobroker No license field.

+ iobroker@1.3.0
added 51 packages from 28 contributors and audited 83 packages in 6.937s
found 0 vulnerabilities
```

1.使用以下命令完成ioBroker安装：

```
cd /d C:\iobroker
npm install --production --no-optional --logevel=error
```

安装过程可能需要一段时间。如果执行npm，则可能出现与模块`unix-dgram`相关的红色错误消息（gyp！ERR）。可以忽略这些错误消息。

   安装的最后几行应该大致如下：

```
[...]
Write "iobroker start" to start the ioBroker
npm install node-windows@0.1.14 --production --no-optional --logevel=error --save --prefix "C:/iobroker"
ioBroker service installed. Write "serviceIoBroker start" to start the service and go to http://localhost:8081 to open the admin UI.
To see the outputs do not start the service, but write "node node_modules/iobroker.js-controller/controller"
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: unix-dgram@0.2.3 (node_modules\unix-dgram):
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: unix-dgram@0.2.3 install: `node-gyp rebuild`
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: Exit status 1

added 514 packages from 300 contributors and audited 1808 packages in 61.874s
found 23 vulnerabilities (17 low, 6 high)
run `npm audit fix` to fix them, or `npm audit` for details
```

1.然后，您可以使用该命令

```
iobroker status
```

检查ioBroker是否作为Windows服务自动启动。
答案应该是

```
iobroker is running
```

   或

```
iobroker is not running
```

   响亮。

   如果ioBroker未自动启动，请输入以下命令：

```
net start iobroker.exe
iobroker status
```

   答案应该是现在

```
iobroker is running
```

   响亮。

？>将来，每次重启系统时，ioBroker都会在后台自动启动。

1.最后，可以通过执行命令来执行命令行窗口

```
exit
```

   被关闭

？>在`Admin`适配器的帮助下进行进一步的配置。它使用Web浏览器和地址[HTTP：//本地主机：8081](http://localhost:8081)进行调用。关于网络ioBroker的配置在[Configuration]（）章节中有详细介绍。

？>对于初学者，现在建议运行[Tutorial]（）。这里，逐步呈现管理界面并进行必要的基本设置。

## Update
@@@ tbd @@@

##疑难解答
@@@ tbd @@@