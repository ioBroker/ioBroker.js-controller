---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.parser/README.md
title: 无题
hash: 1xpg1MP1AYgU5c5rd9cDJwleBI8cpRXpm7lzvwoML1U=
---
![商标](../../../en/adapterref/iobroker.parser/admin/parser.png)ioBroker解析器适配器=================

![安装数量](http://iobroker.live/badges/parser-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.parser.svg)
![下载](https://img.shields.io/npm/dm/iobroker.parser.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.parser.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.parser.png?downloads=true)

此适配器允许解析通过URL或带有正则表达式的文件接收的数据。

##设置
###默认轮询间隔
如果指定的条目没有轮询间隔，则将使用此值。间隔以毫秒为单位，描述了链接或文件的读取频率。

###表
使用加号按钮，新条目将添加到表中。

表字段：

 -  *名称*  - 是州名，可能不包含空格。
 -  * URL或文件名*  - 是慕尼黑天气的网址链接，如* https://darksky.net/forecast/48.1371,11.5754/si24/de*。
 -  * RegEx *  - 正则表达式，如何从链接中提取数据。测试正则表达式有一个很好的服务：[regex101]（https://regex101.com/）。例如。 * temp swip“>（ - ？\ d +）˚<*为上面的lin。
 -  *角色*  - 其中一个角色：
     - 自定义 - 用户通过* admin“角色定义自己
     - 温度 - 值是温度
     - 值 - 值是一个数字（例如调光器）
     - 百叶窗 - 价值是一个盲目的位置
     - 开关 - 值是开关位置（真/假）
     - 按钮 - 值是一个按钮
     - 指标 - 布尔指标
 -  *类型*  - 变量类型。布尔值，数字，字符串，json之一。
 - *Item* - 找到的元素的编号，从0开始。
 -  *单位*  - 值的单位。例如。 *C*
 -  *旧*  - 如果无法在页面上读取或找到该值，则不要更新实际存储的值。
 - *Subs* - 替换值。如果文件或URL不可用，将使用此值。
 -  *因子/偏移*  -  *计算值* = *提取值* *因子+偏移量，以立即修改值。仅用于数字。
 -  *间隔*  - 以ms为单位的轮询间隔。如果未设置或0，则将使用默认间隔。

##样本设置
|名称| URL或文件名| RegEx |角色|输入|单位|间隔|
|-------------------|:-----------------------------------------------------|:----------------------|--------------|---------|------|----------|
|温度慕尼黑| https://darksky.net/forecast/48.1371,11.5754/si24/de | temp swip“>（ - ？\ d +）˚<| temperature | number |°C | 180000 |
| forumRunning | http://forum.iobroker.net/ |论坛|指标|布尔值| | 60000 |
| cloudRunning | https://iobroker.net/ |隐私声明|指标|布尔值| | 60000 |
| cpuTemperature | / sys / devices / virtual / thermal / thermal_zone0 / temp | （。*）|温度|号码| °C | 30000 |

*注意：*在收到的文本中，所有新行都将替换为空格，以允许多行搜索。

##关于正则表达式
正则表达式是一种从字符串中解析和提取数据的强大工具。

您可以有效地检查字符串中是否有某些文本，或者将字符串中的某些文本提取到变量中。

对于布尔类型，编写简单的RegEx就足够了。对于数字类型，您应使用括号标记数字 - “（）”。例如。提取数字*温度是5°C *你应该使用“（\ d +）”表达式。

有关正则表达式的更多信息，请访问：https：//developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp

＃＃＃ 例子：
 - *.at* 配以“at”结尾的任何三个字符的字符串，包括“hat”，“cat”和“bat”。
 - *[hc] at* 配“hat”和“cat”。
 - *[^ b] at* 配除。“bat”之外的.at匹配的所有字符串。
 - *[^ hc] at* 配除“hat”和“cat”之外的.at匹配的所有字符串。
 - *^ [hc] at* 配“hat”和“cat”，但仅限于字符串或行的开头。
 - *[hc] at $* 配“hat”和“cat”，但仅限于字符串或行的末尾。
 - *\ [。\]* 配由“[”和“]”包围的任何单个字符，因为括号被转义，例如：“[a]”和“[b]”。
 -  * s。\ **匹配s后跟零个或多个字符，例如：“s”和“saw”和“seed”。
 - *[hc] + at* 配“hat”，“cat”，“hhat”，“chat”，“hcat”，“cchchat”等，但不是“at”。
 - *[hc]？at* 配“hat”，“cat”和“at”。
 -  * [hc] \ * at *匹配“hat”，“cat”，“hhat”，“chat”，“hcat”，“cchchat”，“at”等。
 - *cat | dog* 配“cat”或“dog”。
 -  *（\ d +）*  - 从字符串中获取数字
 -  * now（\ w +）*稍后 - 获取“now”和“later”之间的单词

###最有用的表达方式
 - （ - ？\ d +）得到负数或正数

##质量代码
值可以包含质量代码：

 -  0  - 好的
 -  0x82  - 无法读取URL或文件。
 -  0x44  - 文本中找不到数字或字符串值

## Changelog
### 1.0.7 (2018-10-08)
* (bluefox) Comma will be replaced automatically by point for the offset and for the factor

### 1.0.6 (2018-09-22)
* (bluefox) fix parser

### 1.0.5 (2018-08-30)
* (bluefox) Multi-line search allowed

### 1.0.2 (2018-08-06)
* (bluefox) Iterations in regex were corrected

### 1.0.1 (2017-12-10)
* (bluefox) Added additional option: old value

### 1.0.0 (2017-05-19)
* (bluefox) Allow set the number of found item

### 0.2.2 (2017-04-03)
* (Apollon77) fix handling of multiple fields for one URL

### 0.2.1 (2017-02-24)
* (bluefox) fix error with timestamp

### 0.2.0 (2017-02-01)
* (bluefox) Add visual test

### 0.1.1 (2017-01-30)
* (bluefox) move to common group

### 0.0.1 (2017-01-16)
* (bluefox) initial commit