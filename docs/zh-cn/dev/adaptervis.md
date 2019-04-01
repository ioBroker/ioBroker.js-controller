---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adaptervis.md
title: 如何调试VIS小部件
hash: KIzieMx/A0IHa34738atYrTR1bLyDI4IzfnpJXXujh8=
---
＃如何调试VIS小部件
要开始调试ioBroker.vis，必须完成以下操作：

 - 在ioBroker.js-controller中禁用缓存

  打开/opt/iobroker/iobroker-data/iobroker.json文件并将属性** noFileCache **更改为_true_。

```
{
  "network": {
    "IPv4": true,
    "IPv6": true,
    "bindAddress": null,
    "useSystemNpm": true
  },
  "objects": {
    "type": "file",
    "typeComment": "Possible values: 'file' - [port 9001], redis - [port 6379], couch - [port 5984].",
    "host": "127.0.0.1",
    "port": 9001,
    "user": "",
    "pass": "",
    "noFileCache": true
  },
...
```

 - 在ioBroker.web中禁用缓存

  打开适配器“web”实例的配置并确保禁用“Cache”。默认情况下禁用它。

 - 使用“iobroker restart”重新启动ioBroker

 - 替换index.html和edit.html

使用_ / opt / iobroker / node_modules / iobroker.vis / www / index.html.original_和_edit.html中的文件替换_ / opt / iobroker / iobroker-data / files / vis / index.html_和_edit.html_中的文件。原版的_。
更改文件/opt/iobroker/iobroker-data/files/vis/cache.manifest。无论如何，只需一个符号即可触发浏览器重新加载文件。文件必须小于200k。如果你有错误的文件，那么它们肯定大于400k。

 - 现在，如果您要更改文件（例如/opt/iobroker/iobroker-data/files/vis/widgets/metro.html），您将在重新加载vis后看到更改。

 - 问题是，所有小部件都是动态链接的，你不能在浏览器源中转到文件metro.html并制定一个断点。

  但是有一个技巧：如果你制作了一些console.log输出（或[调试器;](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/debugger)），那么你可以在Browser JS控制台中检测这个输出，然后点击它（在Chrome中工作）去那个地方。