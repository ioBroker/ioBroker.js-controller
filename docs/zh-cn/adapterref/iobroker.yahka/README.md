---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.yahka/README.md
title: iobroker.yahka
hash: DthhW3uXba+vO00KkmIMU8krtcMB8fC6XxcPnUEcIM4=
---
![商标](../../../en/adapterref/iobroker.yahka/admin/yahka.png)

![安装数量](http://iobroker.live/badges/yahka-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.yahka.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.yahka.svg)
![测验](https://travis-ci.org/ioBroker/ioBroker.yahka.svg?branch=master)

＃iobroker.yahka
##安装和使用
有关如何安装和配置此适配器的详细信息，请参阅[维基](https://github.com/jensweigele/ioBroker.yahka/wiki)

##先决条件
在安装适配器之前，您需要安装一些软件包（对于Linux）：

```sudo apt-get install libavahi-compat-libdnssd-dev```

##安装最新的**版本**
只需点击“适配器”页面上ioBroker管理面板中“ Homekit yahka适配器”后面的“ +”按钮即可

##安装最新的**测试版**
如果您想了解最新的Beta版本，可以通过github url安装适配器。 <br> （有时需要额外的上载[fe iobroker上载yahka]和适配器重新启动） <br>

##备份与还原
注意：为了能够在通常的`iobroker backup`和`iobroker restore`之外的其他系统上还原ioBroker.yahka，`/opt/iobroker/iobroker-data`下的`yahka.X.hapdata`文件夹也必须备份，并且，如有必要，请还原。 [Wiki]（https://github.com/jensweigele/ioBroker.yahka/wiki/ioBroker.yahka-auf-ein-anderes-System-umziehen）/ [问题](https://github.com/jensweigele/ioBroker.yahka/issues/176)

＃＃ 故障排除
###并非所有新功能都可用：
如果在yahka更新之后并非所有新功能都可用，请尝试上传（例如iobrober yahka上传），然后重新启动适配器。

### Missing Avahi守护程序（Linux）
如果日志中出现以下错误： <br>

```
Error:	2016-07-26 18:57:17.989	error	at Error (native)
Error:	2016-07-26 18:57:17.989	error	dns service error: unknown
uncaught	2016-07-26 18:57:17.985	error	exception: dns service error: unknown
```

您必须执行一些其他步骤：

*安装avahi守护程序：

```sudo apt-get install avahi-daemon -y```

*编辑avahi-daemon.conf

```sudo nano avahi-daemon.conf ```<br>
change the following variables:
```host-name=\<put in your hostname\>
domain-name=local
use-ipv4=yes
use-ipv6=yes
enable-dbus=yes
```

###缺少pam-devel软件包（Linux）
如果日志中出现以下错误： <br>

```
../authenticate_pam.cc:30:31: fatal error: security/pam_appl.h: Datei oder Verzeichnis nicht gefunden
#include <security/pam_appl.h>
```

您必须安装pam-devel软件包：

*安装avahi守护程序：

```sudo apt-get install pam-devel -y```

###缺少卓悦（Windows）
-下载：```https：// www.samuelattard.com / files / bonjourcore2.msi`''
-执行：```msiexec / i bonjourcore2.msi / qn`''
-删除：```del bonjourcore2.msi```
-下载：```https：// www.samuelattard.com / files / bonjoursdksetup.exe`''
-执行：```bonjoursdksetup.exe / quiet```
-删除：```del bonjoursdksetup.exe```
-设置：```set BONJOUR_SDK_HOME = C：\ Program Files \ Bonjour SDK```

然后安装yahka适配器。

##关于HomeKit的一些话
HomeKit的体系结构如下： <br>有“设备”作为逻辑实体。每个设备可以具有多个**服务**，并且每个服务都具有多个**特征**。 <br>最后，特征是可以在其中读取或写入值的端点。 <br>服务可能具有的特征由Apple / HomeKit定义，并由服务类型确定。服务类型也由Apple / HomeKit定义。

例： <br>车库门开启器是一种可以提供两种服务的设备： <br>

1.车库门开启器
2.光

车库门开启器服务本身可能具有不同的特征，例如：CurrentDoorState，TargetDoorState等。 <br>此外，Light Service可能具有不同的特征，例如：开（以及许多其他用于改变灯光颜色等）。

## Yahka做什么
使用Yahka，可以将ioBroker数据点映射到HomeKit特性。 <br>由于有时需要进行映射（例如，在HomeKit和其他系统之间，车库门的“状态”值不同），因此还可以指定功能来转换这些值。如下所述。 <br>为了避免过多的管理工作，您在Yahka中创建的所有设备都位于所谓的“桥”后面。使用此网桥，您只需将网桥与iOS设备配对即可访问所有设备。否则，您需要将每个Yahka设备与Homekit配对。

##设置网桥并创建设备和服务
每个需要与Homekit配对的设备都需要一个具有Mac地址形式的“用户名”。 Yahka自动为每个yahka实例生成一个随机的用户名。 <br> **重要提示：如果您将Yahka与HomeKit配对后更改了用户名，则需要在iOS中重新配置所有设备（房间分配，位置等）。更改用户名意味着使用iOS，这是一台全新的设备！** <br>除了用户名，您还需要指定一个PIN码，该密码需要在iOS设备上输入。通过在Yahka的管理面板中单击“：yahka.0”可以指定所有内容。 （单击列表条目后，展开右侧的面板）。桥的名称也可以在那里更改。

设置网桥后，可以使用顶部的“添加设备”按钮添加所需的设备。添加/选择设备后，您可以向该设备添加服务。 <br>必须指定服务名称和服务类型。 <br>根据服务类型，可用特征列表会更改<br>

##设置特征
如果要支持特征，则必须在特征左侧选中“已启用”复选框。
对于每个特征，您可以指定以下属性：

-InOutFunction：您可以指定一个预定义函数，该函数负责将值从HomeKit传递到ioBroker，反之亦然
-InOutParameter：您可以在此处为所选的InOutFunction指定参数。可用/期望的参数取决于所选功能。功能和参数的简要概述如下。
-ConversionFunction：除了InOutFunction外，您还可以指定一个将HomeKit的值转换为ioBroker的函数（反之亦然）
-ConversionParameter：与InOutParameter相同-可用/期望的参数取决于所选函数。

## InOut功能概述
|功能|预期参数|描述|
|---|---|---|

| const | Value |如果HomeKit读取了const函数，则const函数总是将“ InOutParameter”中指定的值传递给Conversion Function。如果HomeKit要写入值，则拒绝此操作

| ioBroker数据点的| ioBroker.State |名称|使用此功能，适配器将指定的ioBroker数据点用于读取和写入操作。所有操作均立即完成，无需缓冲或过滤（将值传递到指定的Conversion函数）|
| ioBroker数据点的| ioBroker.State.Defered |名称|使用此功能，适配器将指定的ioBroker数据点用于读写操作。来自HomeKit的写入操作直接传递给转换函数。 | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
| ioBroker数据点的| ioBroker.State.OnlyACK |名称|使用此功能，适配器将指定的ioBroker数据点用于读写操作。来自HomeKit的写入操作直接传递给转换函数。如果设置了“已确认”-标志值，则仅将ioBroker的更改转发到HomeKit。否则，最后确认的值将被传输到HomeKit |。 |
| ioBroker.homematic。 <br> HomeMatic级别数据点的WindowCovering.TargetPosition | Id <br>要么<br>具有级别数据点的ID和工作数据点的ID的字符串数组|此功能尤其用于控制HomeMatic窗帘。在移动窗帘时，此功能会延迟将值传输到HomeKit。为避免iOS |中的窗帘滑块闪烁，这是必要的。 |

##转换功能概述
|功能|预期参数|描述|
|---|---|---|

| passthrough | \ <无\> |来自ioBroker的值不经过转换即传递给HomeKit（反之亦然）

| HomematicDirectionTo <br> HomekitPositionState | \ <none\> |此函数将Homematic窗帘的方向枚举映射到HomeKit的PositionState枚举（以及向后）|
| HomematicControlModeTo <br> HomekitHeathingCoolingState | \ <none\> |此函数将Homematic的ControlMode枚举映射到HomeKit的HeathingCoolingState枚举（并返回）|
| scaleInt <br> scaleFloat |```{ "homekit.min": <number>, "homekit.max": <number>, "iobroker.min": <number>, "iobroker.max": <number> }```||此函数类似于“ level255”，但更为通用。它将ioBroker值的范围从“ iobroker.min”（如果省略，则为0）到“ iobroker.max”转换为HomeKit值，其值范围从“ homekit.min”（如果省略，则为0）到“ homekit.max” （然后回来）。 <br> **例：**如果参数字段为：```{ "homekit.max": 500, "iobroker.max": 250}```§ <br>实际上，将ioBroker的值乘以2后再将其发送到HomeKit。 <br>** min-Parameters仅在0.8.0及更高版本中可用** |
| inverse | number |此函数用于“反转” ioBroker中的值。该参数在ioBroker中指定了最大值。公式为：```Parameter - value``` <br> **示例：**如果参数字段是```100```§，则ioBroker的值100将作为0发送到HomeKit，值80将作为20发送到HomeKit等。 |
|| hue | \ <none \> |此函数是scaleInt的专用版本，具有参数```iobroker.max=65535```和```homekit.max=360```§。 |
| hue | \ <none \> |此函数是scaleInt的专用版本，带有参数“ iobroker.max = 65535”和“ homekit.max = 360”。 |

## Homematic盲致动器\窗帘
要集成Homematic百叶窗执行器（如HM-LC-Bl1PBU-FM），需要以下设置：

*将服务添加到设备
*将服务名称设置为某些名称，并将服务类型设置为“ WindowCovering”。服务子类型可以留空
*启用并填写以下特征：

|特征名称| 1：InOut函数<br> 2：转换函数| 1：InOut参数<br> 2：转换参数|
|---|---|---|
| CurrentPosition | 1：ioBroker.State.OnlyACK <br> 2：直通| 1：_ \ <path to homematic object\> _.1。等级<br> 2： <empty\> |
| PositionState | 1：ioBroker.State.OnlyACK <br> 2：HomematicDirectionToHomekitPositionState | 1：_ \ <path to homematic object\> _。1个方向<br> 2： <empty\> |
| TargetPosition | 1：ioBroker.homematic.WindowCovering.TargetPosition <br> 2：直通| 1：_ \ <path to homematic object\> _.1。等级<br> 2： <empty\> |

值_ \ <动态对象的路径\> _需要替换为设备的实际路径（例如hm-rpc.0.NEQ0012345）

有关配置掩码的一般信息，请参阅：TODO <br>有关配置，InOut函数和转换函数的更多信息，请参见：[维基](https://github.com/jensweigele/ioBroker.yahka/wiki/Configuration,-InOut-Functions-and-Conversion-Functions)

## Changelog
### 0.10.0 (2020-02-19)
  (apollon77) updated dependencies, nodejs 12 support<br>

### 0.10.0
  (jw) updated dependencies<br>
  (apollon77) removed support for NodeJS 4 - NodeJS 6 is now the minimum required NodeJS version (merged #109)<br>

### 0.9.2
  (jw) fixed a bug where the adapter didn't start anymore<br>
  (jw) removed the reference to the git repository of the hap community types<br>

### 0.9.1
  (jw) fixed a bug where the adapter crashes if a state does not exist<br>
  (jw) added io functions for HomeMatic dimmers ([#30](https://github.com/jensweigele/ioBroker.yahka/issues/30) and [#75](https://github.com/jensweigele/ioBroker.yahka/issues/75))<br>
  (jw) fixed a bug where adapter didn't start anymore when using the conversion function "inverse" ([#98](https://github.com/jensweigele/ioBroker.yahka/issues/98))
  (jw) updated to latest HAP-NodeJS library to support TV services and characteristics (available since iOS 12.2 beta 1)<br>Note: that's still in development, not all services are working correctly. For more information see:  ([#89](https://github.com/jensweigele/ioBroker.yahka/issues/89))<br>

### 0.9.0
  (jw) added more services and characteristics (from https://github.com/homespun/hap-nodejs-community-types)<br>
  (jw) improved admin interface to support individual editors for IO/Conversion functions<br>
  (jw) added new conversion function "script" which adds the ability to run JavaScript functions as conversion functions<br>
  (jw) fixed a bug in the scaleInt and scaleFloat methods (thanks to balzreber) <br>
  (jw) added ioFunction "MultiState" to get multiple states and/or seperate between read and write states <br>
  (jw) added conversion function "map" to customize mappings betwen ioBroker and HomeKit <br>
  (jw) added possibility to specifiy IP for Bonjour broadcasting (for bridge configuration and camera configuration)([#86](https://github.com/jensweigele/ioBroker.yahka/issues/86))<br> 
  (jw) switched to webpack and refactored admin interface and io/conversion functions <br>
  (jw) fixed a problem where numeric values where transmitted to homekit as strings ([#87](https://github.com/jensweigele/ioBroker.yahka/issues/87))<br>
  (jw) added possibility to specify "firmware" version for bridge and devices ([#90](https://github.com/jensweigele/ioBroker.yahka/issues/90))<br>
  (jw) added Internet Explorer / MS Edge detection to print error message in admin panel ([#83](https://github.com/jensweigele/ioBroker.yahka/issues/83))<br>
  (jw) added support for new compact mode ([#95](https://github.com/jensweigele/ioBroker.yahka/issues/95))<br>
  (jw) added support for specifiyng device information via datapoints ([#91](https://github.com/jensweigele/ioBroker.yahka/issues/91))<br>
  (SchumyHao) added Chinese support
  
### 0.8.2
  (jw) Removed a bug which flooded logging when starting/stopping the adapter which led to excessive memory consumption<br>

### 0.8.1
  (jw) updated dependencies<br>
  (jw) change default name of new instances<br>
  (foxriver76) remove excessive logging<br>
  (mdietz666) scaleInt and scaleFloat now supports min-values (this allows mapping from e.g. -90 to 90 to 0 to 180)<br>
  (arichter83) added "Duplicate Device" functionality<br>

### 0.7.1
  (jw) fixed a bug where state selection with admin 2.0.9 did not work anymore<br>
  (jw) restructured repository to support install via url<br>

### 0.7.0 
  (bluefox) Fixed the ID select dialog in Admin3<br>
  (jw) updated hap-nodejs to support the following new services: Faucet, IrrigationSystem and Valve<br>
  (jw) added ip-package to dependencies to avoid errors on some installations<br>

### 0.6.1 
  (jw) fixed startup crash<br>

### 0.6.0
  (jw) add support for IP-Cameras<br>
  (jw) included iOS 11 device definitions<br>
  (jw) allowed negative temperatures for temperature sensors<br>
  (jw) fixed crashes due to duplicate device names<br>
  (oliverschulze) added conversion functions "hue" and "level255"<br>
  (jw) added conversion functions scaleInt, scaleFloat and inverse<br>
  (jw) devices are now sorted by name in the admin panel<br>

### 0.5.5
  (bluefox) allow select ID in configuration dialog<br>

### 0.5.4
  (jw) improve logoutput<br>
  (jw) added HomematicControlModeToHomekitHeathingCoolingState mapping<br>

### 0.5.3
  (jw) internal release<br>

### 0.5.2
  (jw) fixed issues with empty characteristic values<br>
  (jw) fixed issue with empty adapter.systemConfig.system object<br>

### 0.5.1
  (jw) fixed issue with wrongly displayed logo<br>

### 0.5.0
  (jw) initial release<br>

## License
The MIT License (MIT)

Copyright (c) 2016-2020 Jens Weigele (iobroker.yahka@gmail.com)

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