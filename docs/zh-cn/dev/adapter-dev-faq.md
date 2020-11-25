---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapter-dev-faq.md
title: 常见的适配器开发问题
hash: 5dEjacU1AHJylH65Fm27UxFiSV0NYLcsREgs++uwcKY=
---
＃常见的适配器开发问题
＃＃ 介绍
该页面的目的是收集有关ioBroker适配器开发的常见问题。
Ralf于2020年11月24日在ioBroker #adapter Discord频道中与Mic讨论一个问题时提出了这个想法。

##请贡献（这很简单！）
随时在此页面添加任何问题和相应答案。唯一的限制是：确保为答案添加日期。无需完美主义，只需发布在适配器开发中对您有帮助的内容。也非常欢迎链接到实现该问题的适配器。我们的开发人员喜欢看实现示例：-)

*注意：*这不会成为正式文档。欢迎任何提示，解决方法，甚至更老的论坛帖子的链接等。目的是快速支持和帮助开发人员解决常见的开发问题。如果您在此处用英语书写时遇到问题，请使用德语，俄语等当地语言，我们将很乐意为您提供帮助，以后再翻译。

一切都在这里轻松;）

＃＃ 常问问题
###适配器配置（admin / index_m.html）
####输入验证
**问题：**我想通过使用核心适配器方法以及node.js适配器代码的类/方法来验证适配器配置的字段。一旦用户在适配器配置中单击“保存”，便应进行验证，然后将调用`admin/index_m.html`中的`save()`。

**答案：**您可以使用`sendTo()`方法将变量`obj`从`admin/index_m.html`发送到适配器代码，验证其中的内容，然后通过回调提供结果给`admin/index_m.html`中的`sendTo()`。<br>示例：这在适配器[法尔普兰](https://github.com/gaudes/ioBroker.fahrplan)中实现。<br>注意：您可能需要更改`io-package.json`，请参阅例如[ioBroker论坛：sendTo（）函数](https://forum.iobroker.net/topic/5205/gel%C3%B6st-sendto-in-eigenem-adapter-funktioniert-nicht/)<br> （2020年11月24日）