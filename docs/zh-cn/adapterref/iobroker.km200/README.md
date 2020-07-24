---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.km200/README.md
title: ioBroker.km200
hash: 0jOL48Jt7HVKEcKPFioyMHDFRzdxzYyUjNfUNvtkCA8=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.km200.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.km200.svg)
![安装数量](http://iobroker.live/badges/km200-installed.svg)
![特拉维斯](http://img.shields.io/travis/frankjoke/ioBroker.km200/master.svg)
![NPM](https://nodei.co/npm/iobroker.km200.png?downloads=true)

＃ioBroker.km200
##适用于Buderus KM50 / KM100 / KM200 / KM300和Junkers / Bosch MB LANi
![商标](../../../en/adapterref/iobroker.km200/admin/km200.png)

[德文手册](README_DE.md)

适配器支持以下加热系统：

*具有[网络适配器]的Buderus（https://www.buderus.de/de/produkte/catalogue/alle-produkte/7719_gateway-logamatic-web-km200-km100-km50）KM50，KM100，KM200和KM300
*带有[网络适配器]的垃圾邮件（https://www.bosch-smarthome.com/de/mblani）MB LANi
*带有[网络适配器]的博世（https://www.bosch-smarthome.com/en/mblani）MB LANi

为了访问系统，我使用了最初由Andreas Hahn开发并在其博客[在这里输入]（https://www.andreashahn.info/2014/07/kernthema-am-eigenen-leibe）和[在此输入](https://www.andreashahn.info/2014/08/easycontrol-pro-unter-der-lupe-oder-m)中描述的代码。

可以通过Buderus网站（[https://www.buderus-connect.de]）或通过手机的“ EasyControl”应用程序来控制加热系统。 App and Buderus网站还可以与Junkers和Bosch加热系统配合使用。

现在，这已经在两个方向上都成功了，并且适配器已经完全可用。

为此，必须首先在手机上安装该应用程序并设置一个私人密码。
该应用程序要求设备密码和设备的登录名。

适配器仍需要IP（或网络名称，例如'BuderusKM200.fritz.box'）和端口地址（设备上的端口80，但是如果通过路由器进行了更改...）。

如果添加“！”在地址末尾，适配器将在调试模式下工作并提供很多信息！

由于适配器必须查询系统中的数据，因此我已定义了一个更新间隔，由于每次更新都需要单独的查询，因此将其设置为最少5分钟。

我的系统（2个加热回路和一个热水回路）提供了180多个数据点，这些数据点我用得最多，有些是双倍的。

这就是为什么我引入了一个黑色/推送列表来隐藏或显示某些数据的原因。
该列表由类似于RegExp的字符串组成（它们被适配器转换为字符串），然后用它们过滤加热器中的服务。

语法是，一开始的`+`意味着不应跳过此字段，即使另一个规则将阻止它。
`-`就像什么都没有，并且使数学状态被阻止。
每个匹配项之间均以`,`隔开，开头可以包括`/`或`^`，匹配所有内容的`*`和末尾的`语法是，一开始的`+`意味着不应跳过此字段，即使另一个规则将阻止它。
`-`就像什么都没有，并且使数学状态被阻止。
每个匹配项之间均以`,`隔开，开头可以包括`/`或`^`，匹配所有内容的`*`和末尾的以匹配结尾。
字符串区分大小写！！！如果您想知道找到了哪些状态，请打开调试模式并删除所有阻止，然后您将发现所有声明的已创建状态，并且可以使用阻止列表阻止某些不需要的日期。
示例：使用`+*temp*`，您可以淡入包含“ temp”的所有内容；使用`_Hourly语法是，一开始的`+`意味着不应跳过此字段，即使另一个规则将阻止它。
`-`就像什么都没有，并且使数学状态被阻止。
每个匹配项之间均以`,`隔开，开头可以包括`/`或`^`，匹配所有内容的`*`和末尾的`语法是，一开始的`+`意味着不应跳过此字段，即使另一个规则将阻止它。
`-`就像什么都没有，并且使数学状态被阻止。
每个匹配项之间均以`,`隔开，开头可以包括`/`或`^`，匹配所有内容的`*`和末尾的以匹配结尾。
字符串区分大小写！！！如果您想知道找到了哪些状态，请打开调试模式并删除所有阻止，然后您将发现所有声明的已创建状态，并且可以使用阻止列表阻止某些不需要的日期。
示例：使用`+*temp*`，您可以淡入包含“ temp”的所有内容；使用，您可以阻止末尾具有“ _Hourly”的所有内容，这两者的组合将阻止所有末尾具有“ _Hourly”的内容临时的名字。

Mye列表看起来像`/gateway*, /recordings*,*SwitchPrograms*,/HeatSource*, *HolidayModes*`，并且隐藏了我工厂关闭的约180条记录中的90条。

现在还有其他两个时间表，快速（对于以30分钟为单位的轮询状态）和慢速（以小时或数小时为周期的轮询状态）。
这使您可以跟踪某些信息，例如1-5分钟周期内的温度以及正常20分钟周期内的其他项目。通常在一个小时内不会改变的数据（例如_Daily $或_Monthly $和Severyl其他常规数据）即使每30分钟也不需要读取，因为它们不会改变。
该策略有助于获得重要数据的更快读数，而对于不太重要的数据则可以降低读数。

用于记录的数据是加热系统内的（小）历史数据。共有3种可用选项：_小时，_每日和每月。
每小时通常覆盖过去48小时。 _最近两个月每天一次，每月不超过一年，全部从当前读数时间开始。某些数据点确实显示较少的数据点。
您必须了解适配器针对每个记录的数据点从3个单独的调用中收集数据！

`switchPrograms`也可以立即编写，它是一个JSON-String，它反映了一个工作日数组，请不要更改格式，上传时请仅更改数字。似乎分钟数只能设置为15分钟增量！

从V 1.1.2开始，括号和逗号可以省略，被阻止/推入的值只能用逗号写！

该系统使用结构类似于目录树的服务，并将其复制到适配器中。

###如果km200是从1.1版更新的，则很重要。*
如果您输入了64个字符的访问密钥，则不需要密码，但不要将其留空，只需输入任何内容即可！

##重要
*适配器需要节点> = v6.1。*

＃＃ 去做
*其他语言支持和文本翻译

## Changelog

### 2.0.3

* Adapter config update
* Blacklist is working now for any combination
* Added option not to delete unsused states

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

Copyright (c) 2016-2020 Frank Joke <frankjoke@hotmail.com>
Includes communications and crypto routines copyright (c) 2014 Andreas Hahn km200@andreashahn.info

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