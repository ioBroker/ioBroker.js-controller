---
title: 调试
lastChanged: 14.09.2018
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapterdebug.md
hash: BOKT0EbFe/3HwmnwWGpZ+5EgAHDyRw7VtK6+4awC7D0=
---
＃调试适配器
##适配器使用Chrome进行调试
Node.JS支持使用Chrome进行调试。

如果在ioBroker中停止适配器，然后从控制台启动它：

```
cd /opt/iobroker
iobroker stop sayit
node --inspect node_modules/iobroker.sayit/main.js --force --logs
```

重要的是`–inspect`

然后输出这样的东西：

```
Debugger listening on port 9229.
Warning: This is an experimental feature and could change at any time.
To start debugging, open the following URL in Chrome:
    chrome-devtools://devtools/remote/serve_file/@60cd6e859b9f557d2312f5bf532f6aec5f284980/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/9415dda6-0825-40ed-855c-83c6142e56e9
2016-12-27 15:23:02.637  - error: sayit.0 adapter disabled
starting. Version 1.3.1 in /opt/iobroker/node_modules/iobroker.sayit, node: v6.9.2
2016-12-27 15:23:02.647  - info: sayit.0 starting. Version 1.3.1 in /opt/iobroker/node_modules/iobroker.sayit, node: v6.9.2
Debugger attached.
```

之后，Chrome可以通过在Chrome中输入链接进行调试：

！（铬）媒体/ adapterdebug1.png]

*经测试：Windows，Chrome 55，node.js 6.9.2 *

###使用Chrome进行远程调试
如果iobroker没有与chrome运行在同一台机器上，那么该命令基于上面的示例：

```
node --inspect-brk=<ip-adresse iobroker>:9229 node_modules/iobroker.sayit/main.js --force --logs
```

参数`--inspect-brk`与上述相比，

在适配器的第一行调试器的开头设置断点。

如果您不总是希望将链接复制到调试的开头，您还可以在chrome中调用以下页面：

```
chrome://inspect
```

然后一旦通过配置你的远程处理器的IP和端口就像检查命令输入一样。

启动命令后将显示调试会话，并可通过单击启动。

chrome调试选项太棒了。
您可以通过** web-debugging **（断点，还有条件，监视，callstack，范围检查，控制台问题等）了解所有可能性。

图片和英文说明是[这里](https://software.intel.com/en-us/xdk/articles/using-chrome-devtools-to-debug-your-remote-iot-nodejs-application)

如果尚未安装，则iobroker计算机仍需要节点检查器：

```
npm install -g node-inspector
```

##使用WebStorm进行调试
##使用Visual Sturio代码进行调试