---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adaptertranslate.md
title: 适配器的翻译
hash: 397W84qVYffJYSWkv8fxwwlq1WNcFCdgZ0vqe/MIGzQ=
---
＃适配器的翻译
＃＃ 介绍
ioBroker在[许多不同的语言](https://www.iobroker.net/#en/statistics)中被国际使用，因此翻译非常重要。

适配器具有多个部分，需要翻译：

1.管理员用户界面中的字符串
1. io-package.json中的标题和描述
1.在“ io-package.json”中发布新闻

##语言
所有这些短字符串**必须**翻译为以下语言：

-英语（en）
-德文（de）

**还应**将它们翻译成以下其他语言：

-暴行（ru）
-葡萄牙（pt）
-荷兰文（NL）
-法语（fr）
-意大利语
-西班牙语（es）
-波兰文（pl）
-中文（zh-cn）

##自动翻译
所有适配器均应使用`gulp`使用自动翻译。

当使用[适配器创作者](https://github.com/ioBroker/create-adapter)创建适配器时，将创建正确的gulp文件。

无论何时添加一些字符串，都可以简单地使用`gulp translateAndUpdateWordsJS`来添加所有缺少的翻译。

##托管翻译
自动翻译通常不够好或令人困惑，因此ioBroker提供了用于托管社区翻译的Weblate平台：

https://weblate.iobroker.net/

在Weblate中，社区成员可以轻松地管理所有随附的ioBroker适配器对多种语言的翻译。

要将适配器添加到Weblate，请遵循[这些准则](https://github.com/ioBrokerTranslator/doc/blob/master/README.md)。

Weblate当前仅在管理用户界面中管理字符串。它不会更改`io-package.json`或对文档执行任何操作。