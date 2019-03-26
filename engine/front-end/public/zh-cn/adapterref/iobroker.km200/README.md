---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/frankjoke/ioBroker.km200/edit/master//README.md
title: Buderus KM200
hash: tsPSmDY9afXxyXUew2/p/U3+Q6HOK8EeGGCY7l1Byj4=
adapter: true
license: MIT
authors: Frank Joke <frankjoke@hotmail.com>
description: ioBroker Buderus KM200适配器
keywords: Buderus, KM200, KM50, KM100, KM300, Junkers, Bosch, vis, GUI, graphical, scada
readme: https://github.com/frankjoke/ioBroker.km200/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2016-11-18T21:35:17.155Z
version: 1.2.3
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.km200.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.km200.svg
BADGE-特拉维斯-CI: http://img.shields.io/travis/frankjoke/ioBroker.km200/master.svg
BADGE-NPM: https://nodei.co/npm/iobroker.km200.png?downloads=true
---
＃ioBroker.km200
##适用于Buderus KM50 / KM100 / KM200 / KM300和Junkers / Bosch MB LANi
![商标](zh-cn/adapterref/iobroker.km200/../../../en/adapterref/iobroker.km200/admin/km200.png)

[德语手册](README_DE.md)

适配器支持以下加热系统：

* Buderus与[网络适配器]（https://www.buderus.de/de/produkte/catalogue/alle-produkte/7719_gateway-logamatic-web-km200-km100-km50）KM50，KM100，KM200和KM300
* Junkers与[网络适配器]（https://www.bosch-smarthome.com/de/mblani）MB LANi
*博世与[网络适配器]（https://www.bosch-smarthome.com/en/mblani)MB LANi

加热系统可以通过Buderus网站（[https://www.buderus-connect.de]）或手机上的'EasyControl'应用程序进行控制。 App和Buderus网站也与Junkers和Bosch供暖系统配合使用。

现在这已成功实现了两个方向，并且适配器已经完全可用。

为此，首先需要在手机上安装应用程序并设置私人密码。
该应用程序要求设备密码和设备的登录名。

适配器仍然需要IP（或网络名称，例如'BuderusKM200.fritz.box'）和端口地址（设备上的端口80，但如果您通过路由器更改它...）。

如果添加'！'在地址的末尾，适配器将在调试模式下工作并提供大量信息！

由于适配器必须查询系统中的数据，因此我已定义了更新间隔，因此每次更新都需要单独的查询，因此设置为最少5分钟。

我的系统（2个加热电路和一个热水回路）提供180多个数据点，我不能使用最多，有些是双倍的。

这就是我引入黑/推列表来隐藏或显示某些数据的原因。
该列表由类似于RegExp的字符串组成（它们由适配器转换），然后加热器中的服务随后被过滤掉。

语法是`+`一开始意味着该字段不应该被翻译，即使另一个规则会阻止它。
`-`就像没有任何东西一样，并且阻止数学状态被阻止。
每个匹配由`,`分隔，并且可以包括`/`或`^`用于开头，`*`匹配所有内容，`语法是`+`一开始意味着该字段不应该被翻译，即使另一个规则会阻止它。
`-`就像没有任何东西一样，并且阻止数学状态被阻止。
每个匹配由`,`分隔，并且可以包括`/`或`^`用于开头，`*`匹配所有内容，用于匹配结尾。
字符串区分大小写!!!如果您想知道哪些状态可以在调试模式下切换并删除所有阻塞，那么您将找到所有已创建的状态，并且可以使用阻止列表阻止某些不需要的日期。
示例：使用`+*temp*`，您可以淡入包含'temp'的所有内容，并且使用`_Hourly语法是`+`一开始意味着该字段不应该被翻译，即使另一个规则会阻止它。
`-`就像没有任何东西一样，并且阻止数学状态被阻止。
每个匹配由`,`分隔，并且可以包括`/`或`^`用于开头，`*`匹配所有内容，`语法是`+`一开始意味着该字段不应该被翻译，即使另一个规则会阻止它。
`-`就像没有任何东西一样，并且阻止数学状态被阻止。
每个匹配由`,`分隔，并且可以包括`/`或`^`用于开头，`*`匹配所有内容，用于匹配结尾。
字符串区分大小写!!!如果您想知道哪些状态可以在调试模式下切换并删除所有阻塞，那么您将找到所有已创建的状态，并且可以使用阻止列表阻止某些不需要的日期。
示例：使用`+*temp*`，您可以淡入包含'temp'的所有内容，并且使用您可以阻止最后包含'_Hourly'的所有内容，两者合并将阻止所有_Hourly结尾但没有以他们的名义来临。

Mye列表看起来像`/gateway*, /recordings*,*SwitchPrograms*,/HeatSource*, *HolidayModes*`并隐藏了我工厂关闭的约180条记录中的90条。

现在还有另外两种时间表，即快速（对于状态轮询比每30分钟快一次），对于在小时或多小时循环中轮询的状态来说速度慢。
这使您可以跟踪一些信息，如1-5分钟循环的温度和正常20分钟循环中的其他项目。通常不会在一小时内改变的那些（如_Daily $或_Monthly $和severyl其他一般数据）即使每30分钟也不需要阅读，因为它们不会改变。
这种策略有助于获得更快的重要数据读数和更慢的读数，而不是那么重要。

用于记录的数据是加热系统内的（小）历史数据。有3种不同的可用：_Hourly，_Daily和Monthly。
在过去48小时内每小时覆盖一次。 _每日过去2个月，每月不超过一年，全部来自当前的读数时间。某些数据点确实显示较少的数据点。
您必须了解适配器从每个记录的数据点的3个单独调用中收集数据！

`switchPrograms`现在也可以重新编写，它是一个反映工作日数组的JSON-String，请不要更改格式，只需更改上传时的数字。似乎数字是分钟只能设置为15分钟增量！

从V 1.1.2开始，括号和逗号可以省略，阻塞/推送值只能用逗号写！

系统使用结构类似于目录树的服务，并在适配器中复制。

###如果km200从版本1.1更新，则很重要。*
如果您输入了64个字符的访问密钥，则不需要密码，但不应将其留空，只需写入任何内容即可！

##重要
*适配器需要节点> = v6.1。*

＃＃ 去做
*附加语言支持和文本翻译

## Changelog

### 1.9.9

* Beta for v2.0.0
* Implemented recordings for hourly, daily and monthly data
* Changed readout for 'mins' units to enable these fields for read/write
* Implemented 2 additional time schedule where you can define fast cycle (1-30 minutes), normal with 30-60 minutes and slow with 1-24 hours. You define the lists whjich go to fast or slow in a similar way than the blocklist.
* Blocklist syntax changed sligly. `/` or `^` first is for from beginning, `*` can now be everywhere and `$` can be the end
* `switchPrograms` are supported now for read and write!  

### 1.2.4

* Beta for next version, recordings supported

### 1.2.3 
* Implemented a correction to show also switchPrograms

### 1.2.2
* Adapter works also only with accesskey iin old 64 digit hex format without private passwort.

### 1.2.1 
* Adapter supports now compact mopde
* Adapter uses other module and removes need for mcrypt which makes it working on all platforms
* Adapter can now have debug mode set via '!' at end of address
* Adapter needs node >=v6


### 1.2.0
* Integrating Schupu's changes and also make the adapter ready for compact mode
* Update of adapter should continue to work with old settings

### 1.1.7
* (Schmupu) Supports Admin3
* (Schmupu) Only device password and own password needed. You do not have to get the access code anymore.

### 1.1.6
Adapter communication and retries more often to catch more errors.
* Writes are also retried
Added blocklist text in config screen

### 1.1.2
* Adapter handles better communication and retries if he got an error.
* you can set debug-mode by adding 'debug!' in front of host.
* Host port is not required and can be added to hostname with: xxx at end.
* Simpler blocklist handling, which does not ask for device which services are blocked

### 0.4.3
* Renamed repository to ioBroker.km200

### 0.4.3
Cleaning of objects / states for current adapters instance which are not part of scanned services anymore.

### 0.4.2
* Some small bug fixes and added some debug logs. Removed so dependency of 'request' and 'async' modules.

### 0.4.1
  Have only 'request' and 'async' with --save now also registered in the package.json ... Remember: Nuícht --save forget :(!

### 0.4.0
  Strings with allowedValues ​​are now converted to ioBroker states in both directions (read & write)

### 0.3.0
  Setting variables with numbers or strings now works.
  Thus, e.g. Target temperatures are changed.
  TODO: Enums and set tables

### 0.2.0
  Adapter now works with blacklist and in read-only mode.
  TODO: Implement setting values ​​in the heating system
  TODO: Implement variables with ENUMS (value lists)

### 0.1.0
  First test

## License
The MIT License (MIT)

Copyright (c) 2016 Frank Joke 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.