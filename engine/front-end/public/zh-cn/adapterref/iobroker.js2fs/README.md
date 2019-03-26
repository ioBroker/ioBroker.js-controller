---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/soef/iobroker.js2fs/edit/master//README.md
title: Javascript to file
hash: 9N08pUHC8+SEtfl84UAZfsUk3pq1yvYr3NrROL3JAt4=
adapter: true
license: undefined
authors: soef <soef@gmx.net>
description: Javascript to file
keywords: sync, iobroker file, JetBrains, webstorm, file, debug, editor, ide
readme: https://github.com/soef/iobroker.js2fs/blob/master/README.md
mode: daemon
materialize: false
compact: false
published: 2017-07-10T13:01:38.945Z
version: 0.1.5
BADGE-NPM版本: https://img.shields.io/npm/v/iobroker.js2fs.svg
BADGE-测试: https://img.shields.io/travis/soef/iobroker.js2fs/master.svg
BADGE-建立状态: https://ci.appveyor.com/api/projects/status/c92hrxu79mvs1qxo?svg=true
BADGE-执照: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
---
![商标](zh-cn/adapterref/iobroker.js2fs/../../../en/adapterref/iobroker.js2fs/admin/js2fs.png)


### IoBroker.js2fs
此适配器允许您使用首选的IDE /编辑器编辑ioBroker javascript文件。

###信息
 - 仅供开发人员和备份使用（脚本是磁盘上的文件，因此可以包含在备份中）
 - 这是预发布版，仅用于测试目的
 - 目前调试受到限制

###好处
 - 使用您首选的环境ide
 - 调试
 - 断点

###用法
例如：Webstorm：

####安装
在iobroker根目录中执行以下命令（例如在/ opt / iobroker中）

```
npm install iobroker.js2fs
```