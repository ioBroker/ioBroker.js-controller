---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapter-dev-faq.md
title: 常见的适配器开发问题
hash: eYLJSbvcCz8wYyj3Pa+wrDSZhMY78b6yn9YUWmOxv0E=
---
＃常见的适配器开发问题
＃＃ 介绍
该页面的目的是收集有关ioBroker适配器开发的常见问题。
Ralf于2020年11月24日在ioBroker #adapter Discord频道中与Mic讨论一个问题时提出了这个想法。

##请贡献（这很简单！）
随时在此页面添加任何问题和相应答案。唯一的限制是：确保为答案添加日期。无需完美主义，只需发布在适配器开发中对您有帮助的内容。也非常欢迎链接到实现该问题的适配器。我们的开发人员喜欢看实现示例：-)

*注意：*这不会成为正式文档。欢迎任何提示，解决方法，甚至更老的论坛帖子的链接等。目的是快速支持和帮助开发人员解决常见的开发问题。如果您在此处用英语书写时遇到问题，请使用德语，俄语等当地语言，我们将很乐意为您提供帮助，以后再翻译。

为了更新目录，您可以使用TOC生成器，例如[luciopaiva.com/markdown-toc](https://luciopaiva.com/markdown-toc/)

＃ 目录
-[适配器更新]（＃adapter-updates）
  -[发布适配器更新]（＃publishing-adapter-updates）
-[适配器测试和错误报告]（＃适配器测试和错误报告）
  -[紧凑模式]（＃compact-mode）
  -[哨兵]（＃sentry）
-[适配器配置UI（admin / index_m.html）]（＃adapter-configuration-ui-adminindexmhtml）
  -[输入验证]（＃input-validation）
-[适配器功能]（＃adapter-functions）
  -[写文件]（＃writing-files）

---

###适配器更新
####发布适配器更新
**问题：**我需要在哪些文件中更改版本号？

**答案：**基本上，您需要触摸3个文件：

 *`io-package.json`：更改版本号并添加最近的更改日志
 *`package.json`：仅更改版本号
 *`README.md`：添加新的版本号和更改日志

请注意，必须使用[语义版本控制]（https://semver.org/），请参阅[版本控制](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#versioning)。<br> （2020年11月25日）

**问题：**我的适配器在最新的存储库中。我在Github上更新了适配器，并在NPM上发布了。用户什么时候会在Admin中看到新版本？

**答案：** ioBroker每天扫描两次版本更改。<br> （2020年11月25日）

**问题：**如何将新的适配器添加到最新的存储库？

**答案：**参见[将新的适配器添加到最新的存储库](https://github.com/ioBroker/ioBroker.repositories#add-a-new-adapter-to-the-latest-repository)<br> （2020年11月25日）

###适配器测试和错误报告
####紧凑模式
**问题：**如何测试紧凑模式？

**答案：**参见[紧凑模式测试](https://forum.iobroker.net/topic/32789/anleitung-f%C3%BCr-adapter-entwickler-compact-mode-testen)（德语）<br> （2020年11月25日）

####哨兵
**问题：**如何将Sentry添加到我的适配器中？

**答案：**参见[哨兵自述](https://github.com/ioBroker/plugin-sentry#readme)<br> （2020年11月25日）

###适配器配置UI（admin / index_m.html）
####输入验证
**问题：**我想通过使用核心适配器方法以及node.js适配器代码的类/方法来验证适配器配置的字段。一旦用户在适配器配置中单击“保存”，便应进行验证，然后将调用`admin/index_m.html`中的`save()`。

**答案：**您可以使用`sendTo()`方法将变量`obj`从`admin/index_m.html`发送到适配器代码，验证其中的内容，然后通过回调提供结果给`admin/index_m.html`中的`sendTo()`。<br>示例：这在适配器[法尔普兰](https://github.com/gaudes/ioBroker.fahrplan)中实现。<br>注意：您可能需要更改`io-package.json`，请参阅例如[ioBroker论坛：sendTo（）函数](https://forum.iobroker.net/topic/5205/gel%C3%B6st-sendto-in-eigenem-adapter-funktioniert-nicht/)<br> （2020年11月24日）

###适配器功能
####写入文件
**问题：**适配器应使用axios下载文件并能够将其写入iobroker-data / files / <adapter>

**答案：**这是此操作的一小段代码：

```
const WebCall = await axios.get(url,{responseType: "arraybuffer"});
await Helper.Adapter.writeFileAsync(Helper.Adapter.namespace, `picture.jpg`, WebCall.data)
```

之后，ioBroker日志中出现警告：<br> `writeFile will not write this file (picture.jpg) in future versions: <adapter> is not an object of type "meta"`<br>在io-package.json中，必须在instanceObjects中包含一个meta.user对象：<br>

```
"instanceObjects": [
  {
    "_id": "",
    "type": "meta",
    "common": {
      "name": "User files for <Adapter>",
      "type": "meta.user"
    },
    "native": {}
  }
]
```

（2020年12月9日）