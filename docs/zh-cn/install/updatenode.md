---
title: 更新NodeJS
lastChanged: 30.05.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/updatenode.md
hash: MPmZUM6TWpDMUxNDz1o1kaEj1vxig35ozaoOi5UeK+M=
---
＃为ioBroker更新NodeJS
每年都会发布一个新的Node.js版本，标记为LTS（长期支持），版本号为直版，并将保留数年。
同时，早期的Node.js LTS版本达到其寿命终止（`End of Life`）。
在2019年，NodeJS版本12将在10月份宣布为LTS，版本6将于4月份发布。

即使版本1.5.11的js-controller仍支持版本4的Node.js，新的适配器越来越多地使用例如版本4。 Node.js 8作为基本要求，因为每个新的Node.js版本都带来了新功能。

具有奇数版本号的所有Node.js版本都是开发版本，并且不受官方支持，不应使用！

但即使是最新版本也没有意义，因为这里通常不是完全兼容的库。
目前Node.js 10将是推荐版本。

每隔几年，Node.js的更新就会进行ioBroker安装，本文应该总结一下我们如何做到最好。

首先，应该停止ioBroker，以便更新不会导致任何副作用或崩溃。
还请检查以`io.`开头的所有进程是否已终止。

此外，当然，必须创建备份。
您可以使用BackItUp适配器或命令行命令

```iobroker backup```

下一步是将系统上的Node.js更新为所需的新版本。
在Linux下，只需执行[https://github.com/nodesource/distributions#debinstall](https://github.com/nodesource/distributions#debinstall)中列出的Nodesource安装命令就足够了。
对于macOS，在[https://nodejs.org/en/download/](https://nodejs.org/en/download/)上有一个安装程序，您只需重新安装即可。
如果在Windows下使用ioBroker安装程序，请不要自行更新Nodejs / npm版本，但请按照安装程序的说明进行操作。

不幸的是，这只是工作的一半，因为有许多模块使用了将在当前Node.js的安装过程中安装的模块。
更新Node.js时，必须更新这些模块，否则执行期间会出错。

有几种方法可以更新：

1. ** npm重建**

应始终使用ioBroker目录中的命令`npm rebuild`进行第一次尝试，因为这是最干净的，并且由程序包管理直接执行。理想情况下，它可能需要几分钟，并且可能会列出一些警告。
但如果有错误，那么你必须检查并解决它们......这是一个棘手的部分。
在下一篇文章中，我们尝试使用您的解决方案方法收集所有已知的这些案例。
如果可行，这是最快速，最干净的方式。

2. **重新安装脚本**

如果不这样做，js控制器包括重新安装脚本（重新安装.sh或js-controller 1.5重新安装.js）。
此脚本将检测任何已安装的ioBroker适配器，然后从node_modules目录中删除它们并重新安装它们。
这种方法比npm rebuild稍贵，但它的用途相同。这通常很有效，但你不应该打破这个过程。如果它确实发生或在此过程后开始出现问题，那么最好在下一点选择路径。
包含在js-controller 1.4中的重新安装.sh脚本存在格式问题，必须在命令行中用于Linux

...... ???这样做会得到纠正。

3. **节点模块重置**

另一个需要更长时间的变体是简单地删除所有ode-JS模块，手动安装js-controller然后启动ioBroker并自动安装缺少的适配器的方法。
为此，请删除ioBroker目录中的整个node_modules目录。然后在相关版本中安装控制器（例如1.5.12，当前处于稳定状态）：

```npm install iobroker.js-controller@1.5.12 --production  --no-optional --logevel=error```

然后你启动ioBroker。重要的是iobroker-data目录不会更改。
然后ioBroker启动并依次发现它想要启动的适配器没有安装并安装它们。根据系统的不同，这可能需要一些时间 - 有时长达几个小时（或在慢速SD卡上整夜）。
但是一切都应该更新。

4. **使用Restore **重新安装

对最后一个变体的一个小修改是重新安装。这可以保护`iobroker-data`目录（或使用上面的备份）。然后删除整个ioBroker目录并使用安装程序。
紧接着ioBroker再次停止（安装后自动启动）并复制iobroker-data目录或使用`iobroker restore`。然后再次启动ioBroker。
其余部分按选项3运行并占用时间。

请提供反馈，了解哪些内容适合您，您使用的内容以及问题和解决方案。