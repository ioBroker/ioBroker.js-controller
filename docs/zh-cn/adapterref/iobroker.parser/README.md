---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.parser/README.md
title: 无题
hash: Lg4GUIwP3rQm33R0Vu1O+kha1iJ3jJ3EourbBn5IJIc=
---
![商标](../../../en/adapterref/iobroker.parser/admin/parser.png)ioBroker解析器适配器

![安装数量](http://iobroker.live/badges/parser-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.parser.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.parser.svg)
![测验](https://travis-ci.org/ioBroker/ioBroker.parser.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.parser.png?downloads=true)

=================

该适配器使用正则表达式解析通过URL或从文件接收的数据。对于在此适配器的设置中配置的每个规则，将在`parser.<instance number>`下创建状态，并使用解析的信息填充并更新状态。

##设置
### 1.默认轮询间隔
如果未为配置表中的条目指定单独的轮询间隔值（列：“ Interval”），则将使用此默认轮询间隔值。该间隔以毫秒为单位，定义了读取链接或文件以及更新状态的频率。

**注意：**请勿使用过于激进的轮询间隔，尤其是对于网站URL。例如，如果您想从某个网站检索股票的价格，则如果您不是日间交易者，则间隔应该仅为24小时（= 86400000 ms），这应该很好。如果您尝试过于频繁地从某些URL检索数据，则该网站可能会禁止您进入您的服务器黑名单。因此，请谨慎使用轮询间隔。

### 2.表
单击“加号”按钮，将新条目添加到表中。

表格栏位：

-***名称***-在“解析器。<实例号>”下创建的状态名称。不允许使用空格。您可以使用点“。”作为创建子文件夹的分隔符。示例：`Shares.Microsoft.Current`将导致`parser。<实例号> .Shares.Micosoft.Current`。
-*** URL或文件名***-我们要检索其信息的网站URL或文件路径。例如`https：// darksky.net / forecast / 48.1371,11.5754 / si24 / de`（慕尼黑的天气信息），或`/ opt / iobroker / test / testdata.txt`（来自ioBroker中的文件）。
-*** RegEx ***-正则表达式，如何从链接中提取数据。有一个很好的服务来测试规则表达：[regex101]（https://regex101.com/）。例如。 * temp swip“>（-？\ d +）˚<*用于上面的行。
-***项目***（德语：“ Num”）-正则表达式可以找到（匹配）多个条目。使用此选项，您可以定义要选择的匹配项。 0 =第一场比赛，1 =第二场比赛，2 =第三场比赛，依此类推。默认值为0（第一场比赛）。
-***角色***-角色之一：
    -自定义-用户通过* admin定义自己的角色
    -温度-值是温度
    -值-值是一个数字（例如，调光器）
    -盲注-值是盲注位置
    -switch-值是开关位置（是/否）
    -按钮-值是一个按钮
    -指标-布尔指标
-***类型***-每个下拉菜单的变量类型。
-***项目***-找到的元素的编号，从0开始。
-***单位***-可选：添加到状态条目的值的单位。例如。 °C，€，GB等。
-***旧***-如果激活，则在提供的日期（URL或文件）中无法读取或找到该值时，状态将*不*更新，因此在这种情况下将保留前一个值。
-*** Subs ***-可选：替代URL或文件名。如果第一列的URL /文件名不可用，则将使用此替代URL /文件名。
-***因子/偏移量***（仅适用于“类型”数字）-允许在设置为状态之前修改检索到的数据：

*计算值* = *提取值* *因子+偏移量，以立即修改值

-***间隔***-轮询间隔，以毫秒（毫秒）为单位。如果为空白或0，将使用默认轮询间隔。请参阅上面的更多信息。

##样本设置
|姓名| URL或文件名|正则表达式|角色|类型单位间隔|
|-------------------|:-----------------------------------------------------|:----------------------|--------------|---------|------|----------|
|慕尼黑| `https://darksky.net/forecast/48.1371,11.5754/si24/de`| `temp swip">(-?\d+)˚<`|温度|编号°C | 180000 |
| cloudRunning | `https://iobroker.net/`| `Privacy Notice`|指标|布尔值| | 60000 |
| cpu温度| `/sys/devices/virtual/thermal/thermal_zone0/temp`| `(.*)`|温度|编号°C | 30000 |
| stockPrice.Visa | `https://www.finanzen.net/aktien/visa-aktie`| `\d{0,3},\d{2}(?=<span>EUR<\/span>)`|价值|编号€| 86400000 |
| stockPrice.Visa | `https：// www.finanzen.net / aktien / visa-aktie` | `\ d {0,3}，\ d {2}（？= <span>EUR &lt;\ / span&gt;）`|价值|编号€| 86400000 |</span> |

*注意：*在将正则表达式应用于检索到的URL /文件数据时，所有换行符都将替换为空格，以允许进行多行搜索。

##关于正则表达式（RegExp）
正则表达式是从字符串中解析和提取某些数据的强大工具，甚至更重要：它可以通过应用规则从给定的字符串（例如从网页的HTML或文件的文本）中提取某些值/文本。 。

对于布尔类型，正则表达式非常简单。对于数字类型，应在括号中标记数字-“（）”。例如。要从*温度为5°C *中提取数字，则应使用“（\ d +）”表达式。

有关RegExp的更多信息：

  * [MDN / Mozilla文档]（https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp）
  * [regex101：用于创建和测试正则表达式的在线工具]（https://regex101.com/）

＃＃＃ 例子
-* .at *匹配任何以“ at”结尾的三个字符的字符串，包括“ hat”，“ cat”和“ bat”。
-* [hc] at *匹配“帽子”和“猫”。
-* [^ b] at *与.at匹配的所有字符串（“ bat”除外）匹配。
-* [^ hc] at *匹配除“ hat”和“ cat”以外所有与.at匹配的字符串。
-* ^ [hc] at *匹配“ hat”和“ cat”，但仅在字符串或行的开头。
-* [hc] at $ *匹配“ hat”和“ cat”，但仅在字符串或行的末尾。
-* \ [。\] *匹配由“ [”和“]”包围的任何单个字符，因为括号被转义了，例如：“ [a]”和“ [b]”。
-* s。\ **匹配s后跟零个或多个字符，例如：“ s”，“ saw”和“ seed”。
-* [hc] + at *匹配“ hat”，“ cat”，“ hhat”，“ chat”，“ hcat”，“ cchchat”等，但不匹配“ at”。
-* [hc]？at *与“ hat”，“ cat”和“ at”匹配。
-* [hc] \ *at* 配“ hat”，“ cat”，“ hhat”，“ chat”，“ hcat”，“ cchchat”，“ at”等。
-* cat | dog *与“ cat”或“ dog”匹配。
-*（\ d +）*-从字符串中获取数字
-*稍后（\ w +）*-在“现在”和“以后”之间输入单词

###其他有用的表达
-（-？\ d +）获取数字（负数和正数）

##质量代码
值可以具有质量代码：

-0-好
-0x82-无法读取URL或文件。
-0x44-在文本中找不到数字或字符串值

##支持
1.常规：[ioBroker论坛]（https://forum.iobroker.net/）。会说德语的用户：请参阅[ioBroker论坛线程分析器适配器]（https://forum.iobroker.net/topic/4494/adapter-parser-regex）。
2.如果有任何问题，请查看[ioBroker Parser Adapter：Github Issues]（https://github.com/ioBroker/ioBroker.parser/issues）。

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