---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.canbus/README.md
title: ioBroker.canbus
hash: BsHvCP3XTKPy/kU0CP3ByqkoVjiWxgvleJmi5vIW3nQ=
---
![NPM版本](https://img.shields.io/npm/v/iobroker.canbus.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.canbus.svg)
![安装数量（最新）](https://iobroker.live/badges/canbus-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/canbus-stable.svg)
![依赖状态](https://img.shields.io/david/crycode-de/iobroker.canbus.svg)
![NPM](https://nodei.co/npm/iobroker.canbus.png?downloads=true)

＃ioBroker.canbus
![商标](../../../en/adapterref/iobroker.canbus/admin/canbus.png)

[![翻译状态]（https://weblate.iobroker.net/widgets/adapters/-/canbus/svg-badge.svg）](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**测试：**![测试与发布](https://github.com/crycode-de/ioBroker.canbus/workflows/Test%20and%20Release/badge.svg)

## IoBroker的CAN总线适配器
该适配器将ioBroker连接到控制器局域网（CAN总线）。

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

＃＃ 特征
*使用标准框架和扩展框架接收和发送原始消息
*每个消息都可以配置为接收和/或发送数据
*能够为尚未配置的可见CAN消息自动添加对象
*为每个消息配置解析器以从原始消息缓冲区读取数据/将数据写入原始消息缓冲区
  *数值类型
  *布尔值，包括位掩码支持
  *不同字符编码的字符串
  *自定义脚本以读取/写入原始数据的缓冲区
*高级导入/导出功能
  *导入消息配置以扩展现有配置
  *在管理界面中从GitHub导入预定义的“知名”配置
  *将消息配置导出和导入为json文件或csv文件
*对固定数据长度（DLC）的可选支持
*对RTR标志的可选支持
*包含原始CAN消息对象的可选原始状态

＃＃ 要求
* Linux操作系统（由于使用了socketcan库）
*内核支持的CAN硬件，它会创建一个类似于`can0`的接口
*有关在您的CAN总线上发送的消息的一些知识

##解析器
使用解析器，您可以从CAN消息缓冲区读取数据或将数据写入CAN消息缓冲区。

为以下数据类型提供了预定义的解析器。
另外，您可以编写自己的脚本来使用* custom parser *读取/写入值。

＃big＃和* little-endian *表示形式中的数字类型
*有符号和无符号8、16和32位整数
* 32位浮点数
* 64位双

###布尔值
* 1个字节，包括位掩码支持

＃＃＃ 细绳
* 1至8字节长度
*编码：* ascii *，* base64 *，* hex *，* latin1 *，* utf8 *，* utf16le *

＃＃＃ 风俗
对于自定义解析器，您必须提供自己的读取和写入脚本。
这些脚本应为纯JavaScript，并将在沙箱中运行。

在脚本中，您可以使用以下功能：

*大多数Node.js内置函数
*`async` /`await`
*适配器日志函数`log.warn（'something'）`，`log.info（'something'）`，`log.debug（'something'）`
*`getStateAsync（'id'）`和`getObjectAsync（'id'）`，其中`id`是状态/对象的完整ID

脚本中的错误将由适配器记录。

在这两个脚本中，变量`buffer`和`value`是预定义的。
`buffer`始终包含当前的CAN消息内容作为Node.js缓冲区。

####自定义阅读脚本
在读取脚本中，您必须从`buffer`变量中读取`value`。

在自定义读取脚本的开头，`buffer`将是接收到的/当前的CAN消息数据（类似于`.json`状态）。
`value`将是`undefined`，应由脚本设置。

自定义读取脚本末尾的`value`变量的内容将用作状态的新值。
如果`value`是`undefined`，它将被忽略。使用此功能，您可以按数据部分过滤自定义读取脚本中的消息。

#####自定义读取脚本的示例
检查接收到的缓冲区中的前三个字节以匹配固定值。
如果匹配，则从缓冲区字节3和4中读取一个16位带符号整数值，然后将其除以10。

```js
if (buffer[0] === 0xC2 && buffer[1] === 0x10 && buffer[2] === 0x0F) {
  value = buffer.readInt16BE(3) / 10;
}
```

`value`的原因仅在前三个字节匹配时设置，所有其他数据将被忽略并且不会为该状态设置新值。

####自定义写脚本
在写脚本中，您必须修改（或替换）`buffer`变量。

在自定义写入脚本的开头，`buffer`将是当前的CAN消息数据（类似于`.json`状态）。
`value`设置为应写入`buffer`中的状态值。

自定义写入脚本末尾的`buffer`变量的内容将用作CAN消息的新数据。

#####自定义写脚本的示例
准备一个具有固定值的新缓冲区。
从缓冲区的第五个字节开始，将状态值作为一个带符号的16位整数写入缓冲区。

```js
buffer = Buffer.from([0x30, 0x00, 0xFA, 0x06, 0x7E, 0x00, 0x00]);
buffer.writeInt16BE(value, 5);
```

然后将新的`buffer`设置为`.json`状态。
如果为邮件启用了* autosend *选项，则该邮件将自动发送。

##脚本中的用法
您可以处理/修改脚本中的`<messageId>.json`或`<messageId>.<parserId>`状态。

此外，如果在适配器配置中启用了状态，则可以使用`raw.received`和`raw.send`状态。
它们保存消息数据的字符串化JSON数据，可用于独立于已配置的消息来处理每个接收或发送的消息。
通过将JSON数据写入`raw.send`状态，您可以发送包含任何所需数据的CAN消息。

###原始消息对象示例
```js
{
  "id": 42,
  "ext": false,
  "data": [0, 13, 37, 255],
  "rtr": false
}
```

`ext`和`rtr`是可选的，默认为`false`。

## Changelog

### 1.1.3 (2021-04-12)
* (crycode-de) Added definition of possible state values in admin
* (crycode-de) Added selection of the state role for each parser in admin
* (crycode-de) Fixed display bug of floating action buttons in admin
* (crycode-de) Export uses defaults if some config parts are not defined (e.g. if the config is from an older version)
* (crycode-de) Fixed wrong validation if a message/parser was deleted

### 1.1.2 (2021-04-06)
* (crycode-de) Added copy/paste function for message and parser configurations in admin

### 1.1.1 (2021-04-02)
* (crycode-de) Import bugfixes
* (crycode-de) Prevent wrong log warning if a parser returned undefined
* (crycode-de) Added react errorboundary for better clientside error handling

### 1.1.0 (2021-04-01)
* (crycode-de) Added import/export feature for messages in json or csv format
* (crycode-de) Added import of well known configurations from GitHub
* (crycode-de) Fixed config import in admin
* (crycode-de) Added ioBroker state data type option for custom parsers

### 1.0.2 (2021-03-26)
* (crycode-de) Fixed issue where missing state prevented custom parser write
* (DutchmanNL) Dutch translation updates
* (UncleSamSwiss) French translation updates
* (VeSler) Russian translation updates

### 1.0.1 (2021-03-12)
* (crycode-de) Use a queue to process _parser_ and _send_ state changes in the correct order
* (crycode-de) Fixed some spelling issues
* (crycode-de) Updated dependencies

### 1.0.0 (2021-02-23)
* (crycode-de) Sort messages in admin
* (VeSler) Russian admin translations
* (crycode-de) Updated dependencies

Older changelog is in CHANGELOG_OLD.md

## License

Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)

Copyright (c) 2020-2021 Peter Müller <peter@crycode.de> (https://crycode.de/)