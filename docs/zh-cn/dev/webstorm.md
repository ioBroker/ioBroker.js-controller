---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/webstorm.md
title: WebStorm
hash: 6XXAKFYtzFKrNxvp9WAx9BNY5RT24ZKXH9/SJBTKVJ0=
---
#WebStorm
在此页面上，我们将展示如何安装和设置ioBroker开发环境。
WebStorm用于主要开发，也许Nodeclipse是另一种IDE。
这个文档就像一本“烹饪书”，但没有关于Javascript，NodeJS，HTML5等的解释。

随意扩展以下信息。

##在Ubuntu 14.04上下载并安装WebStorm
从[JetBrains公司](https://www.jetbrains.com/webstorm/download/)转到网页，下载适用于您操作系统的WebStorm。我们将专注于Ubuntu 14.04。
转到下载目录并使用“mv WebStorm-9.0.3.tar.gz / opt /”将文件移动到/ opt目录。解压缩/解压缩它“tar xvzf WebStorm-9.0.3.tar.gz。打开”WebStorm-139.1112 / bin“并输入”./webstorm.sh“。也许你必须安装Java JDK ...

###安装Java JDK
** Windows上不需要此步骤**

```
sudo apt-add-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
```

###安装NodeJS
1.`sudo apt-get install nodejs`（不要做一个```sudo apt-get install node```因为节点不是nodejs）
2.在```sudo ln -s / usr / bin / nodejs / usr / bin / node``的帮助下创建一个别名“node”。

##下载最新的ioBroker源并导入WebStorm项目
1.打开终端并转到/ opt目录。
2.使用“mkdir iobroker”创建一个新目录，然后执行“cd iobroker”
3.使用“npm install iobroker”安装iobroker
4.使用“cd node_modules / iobroker.js-controller /”测试它并输入“chmod + x iobroker”，然后输入“node controller.js”
5.使用“http：// localhost：8081”打开浏览器，您应该看到ioBroker欢迎屏幕。

  ![](../../en/dev/media/WelcomeScreen.png)

6.转到终端窗口并键入`ctrl + c`以中断ioBroker

##配置WebStorm以运行和调试ioBroker
1.使用`。/ webstorm.sh`打开WebStorm
2.单击“文件 - >”现有文件中的“新建项目...”
3.选择以下内容......

  ![](../../en/dev/media/CreateNewProject01.png)

4.选择您的ioBroker目录...（右键单击目录以设置项目根目录）

   ![](../../en/dev/media/CNP03.png)

5.您的新WebStorm项目应如下所示......

  ![测试](../../en/dev/media/NewProject01.png)

###创建“运行配置”ioBroker
1.转到运行 - >“编辑配置...”

![](../../en/dev/media/RC01.png)

2.选择“+”并添加如下图所示的NodeJS配置...

![](../../en/dev/media/RunConfigIoBroker.png)

##如何从WebStorm启动ioBroker
1.选择启动ioBroker ...

    ![](../../en/dev/media/RunIobroker01.png)

你可能会问自己如何阻止ioBroker？在WebStorm中打开一个终端并输入...

    ![](../../en/dev/media/TerminalRun01.png)

##如何调试ioBroker适配器
在本章中，我们将了解如何调试ioBroker Adapter，如“iobroker.hmm”。
首先启动ioBroker，如前所述，请不要使用“调试模式”。仅用于ioBroker的“运行模式”。
从命令行安装像ioBroker.hmm这样的适配器，如![](../../en/dev/media/CLIinstallHMM01.png)

配置WebStorm“调试设置”...
![](../../en/dev/media/DebugSettingsHMM01.png)

转到ioBroker网页http：// localhost：8081并安装iobroker.hmm适配器：![](../../en/dev/media/InstallHMMfromWeb01.png)

安装适配器后，我们必须禁用适配器实例...
![](../../en/dev/media/DisableHMMWeb011.png)

......下一个![](../../en/dev/media/DisableHMMWeb01.png)

......最后你应该看到这个结果：![](../../en/dev/media/DisableHMMWeb02.png)

现在回到WebStorm让我们打开hmm.js文件并设置一个像这样的断点：![](../../en/dev/media/WebstormBreakpointsHMM01.png)

开始调试iobroker.hmm适配器：![](../../en/dev/media/WebstormDebugHMM01.png)

当您在第一个断点处停下时，您可以控制以下步骤：1）恢复程序2）步骤：![](../../en/dev/media/DebugHMM02.png)