---
title: 安装
lastChanged: 13.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/windows.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: 3IPuE0Sc5nqIMrNMSopMxwrevFRt7jXGLkCX5nLTb7U=
---

＃在Windows上安装ioBroker
？&gt; ***此项目目前正在扩展***。 <br><br>帮助我ioBroker。请注意[ioBroker风格指南](community/styleguidedoc)，以便更容易采用这些更改。

以下说明将指导您逐步完成安装。请不要跳过步骤，因为某些命令相互依赖。

##检查要求
！>首先检查系统是否满足所有必要的[安装要求](install/requirements)。

Node.js是运行ioBroker所必需的。以下假设PC上既没有安装Node.js也没有安装ioBroker。如果已安装ioBroker，请继续[更新]（）部分。

为了检测是否安装了Node.js，使用组合键<kbd>⊞Windows</kbd> + <kbd>r</kbd>打开`Ausführen`对话框，然后输入命令~~~ cmd.exe / C node -v＆pause ~~~ ，确认命令后，会出现一个窗口。

![Node.js的版本](zh-cn/install/../../de/install/media/w02nodecheck.png)* Node.js考试*

将显示错误消息或已安装的Node.js版本。

输出Node.js版本号时，首先检查它是否仍符合[安装要求]（）。

如果错误消息是`Der Befehl "node" ist entweder falsch geschrieben oder konnte nicht gefunden werden.`，则不安装node.js并且安装[可以马上开始](#nodeinst)。

##快速入门
？>此安装步骤摘要适用于已多次安装ioBroker的有经验的ioBroker用户。

初学者应遵循§§LLLL_0§§。

* Node.js 8.x LTS版本[下载并安装](install/nodejs)。
*命令行`cmd.exe`依次以管理员身份和以下命令打开

运行：~~~ cmd npm install --global windows-build-tools md C：\ iobroker cd / d C：\ iobroker npm install iobroker npm install --production iobroker status ~~~

<div id="nodeinst"></div>

##安装Node.js和npm
Node.js的安装根据[本指南](install/nodejs)进行。

##安装ioBroker
？> ioBroker可以安装在本地硬盘上可自由选择的文件夹中。如果安装路径包含空格，则必须在所有带引号的命令中包含完整路径。
示例命令：`dir "C:\ioBroker Testsystem"`。

？> ioBroker的默认安装文件夹是`C:\iobroker`。

1.以管理员身份打开命令行窗口。使用组合键执行此操作

<kbd>⊞的Windows</kbd> + <kbd>R</kbd>打开`Ausführen`对话框有~~~ CMD CMD ~~~输入命令。

由于必须以管理员身份打开命令行窗口，因此请不要使用`OK`输入** **，而是使用组合键`Strg`+`Umschalt`+`Eingabetaste`。发出确认提示，必须使用`Ja`或管理员密码输入进行确认。

！>黑色命令窗口中的标题栏现已打开，必须以`Administrator:`开头。

某些ioBroker适配器包含需要为Windows编译的组件。因此，在安装ioBroker之前安装了所谓的`windows-build-tools`。有关`windows-build-tools`的更多信息，请参阅§§LLLL_0§§。

1.使用以下命令安装`windows-build-tools`：

~~~ cmd npm install --global windows-build-tools ~~~

1.然后在命令行窗口中创建安装文件夹的命令

运行：~~~ cmd md C：\ iobroker ~~~

1.现在可以安装实际的ioBroker安装包：

~~~ cmd cd / d C：\ iobroker npm install iobroker ~~~

结果应如下所示：~~~ [...]─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── ──────╮│iobroker文件已成功下载。完成│要完成安装，你需要运行││││npmi--production│││─────────│││Pro ─────────────────────────────╯

npm notice创建了一个lockfile作为package-lock.json。你应该提交这个文件。
npo WARN enoent ENOENT：没有搜索文件或目录，打开'C：\ iobroker \ package.json'npm WARN iobroker没有描述npm WARN iobroker没有存储库字段。
npm WARN iobroker没有README数据npm WARN iobroker没有许可证字段。

+ iobroker@1.3.0从28个贡献者中添加了51个包，并在6,937个中发现了83个包，发现0个漏洞~~~

1.使用以下命令完成ioBroker安装：

~~~ cmd cd / d C：\ iobroker npm install --production ~~~安装过程可能需要一段时间。如果执行npm，则可能出现与模块`unix-dgram`相关的红色错误消息（gyp！ERR）。可以忽略这些错误消息。

安装的最后几行应以如下结尾：~~~ [...]编写“iobroker start”以启动ioBroker npm install node -windows@0.1.14 --production --save --prefix“C： / iobroker“安装了ioBroker服务。编写“serviceIoBroker start”以启动服务并转到http：// localhost：8081以打开管理UI。
Npm WARN可选SKIPPING OPTIONAL DEPENDENCY：unix-dgram@0.2.3（node_modules \ unix-dgram）：npm WARN可选SKIPPING可选依赖性：unix-dgram@0.2.3安装：`node-gyp rebuild`npmWARN可选SKIPPING OPTIONAL DEPENDENCY：退出状态1

在300个贡献者中添加了514个包，在61.874个中审计了1808个包，发现23个漏洞（17个低，6个高）运行`npm audit fix`来修复它们，或者`npm audit`了解详情~~~

1.然后，您可以使用该命令

~~~ cmd iobroker status ~~~检查ioBroker是否自动启动为Windows服务。
答案应该是~~~ iobroker正在运行~~~或者~~~ iobroker没有运行~~~。

如果ioBroker没有自动启动，请输入以下命令：~~~ cmd net start iobroker.exe iobroker status ~~~现在答案应该是~~~ iobroker正在运行~~~。

？>将来，每次重启系统时，ioBroker都会在后台自动启动。

1.最后，可以通过执行命令来执行命令行窗口

~~~退出~~~关闭。

？>在`Admin`适配器的帮助下进行进一步的配置。它使用Web浏览器和地址[HTTP：//本地主机：8081](http://localhost:8081)进行调用。关于网络ioBroker的配置在[Configuration]（）章节中有详细介绍。

？>对于初学者，现在建议运行[Tutorial]（）。这里，逐步呈现管理界面并进行必要的基本设置。

## Update
@@@ tbd @@@

##疑难解答
@@@ tbd @@@