---
BADGE-Build Status Travis: https://travis-ci.org/foxriver76/ioBroker.xbox.svg?branch=master
BADGE-Build status: https://ci.appveyor.com/api/projects/status/s1we3cpcbxm97upp/branch/master?svg=true
BADGE-Number of Installations: http://iobroker.live/badges/xbox-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.xbox.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.xbox.svg
BADGE-NPM: https://nodei.co/npm/iobroker.xbox.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.xbox/README.md
title: Xbox适配器
hash: B+HOIdyHj0b3Mv2rWY8zlsmiUO0i+KPHylmETFM704c=
---
![徽标](../../../de/adapterref/iobroker.xbox/media/xbox.png)

#Xbox适配器
Xbox适配器允许将Xbox One或Xbox One X游戏控制台集成到ioBroker系统中。

##概述
### Xbox One游戏机
Xbox One是由微软开发的游戏机，目前正在播放流行的视频游戏。此外，Xbox One能够控制家庭影院系统的各种组件，并支持使用Microsoft Apps。 <br/> Xbox One的其他特性目前是Xbox One X和Xbox One S，它们提供与原始控制台相同的功能，但性能得到改善。

### Xbox适配器
可以为每个Xbox One控制台设置Xbox适配器，以便控制和读取信息。 <br/>适配器以对象的形式自动创建所有命令和状态。大部分州也可以读出，例如：例如，当前标题，通电状态等。通过指定或读取所创建的对象，可以改变它们的状态，从而可以触发或查询动作。

##安装前的先决条件
1.在添加适配器之前，至少必须在主机系统上安装Python 3.5

安装。

2.如果要通过适配器打开Xbox，则

['快速启动'模式](https://support.xbox.com/de-DE/xbox-one/console/learn-about-power-modes)在控制台中配置。

##致谢
非常感谢[团队打开Xbox](https://openxbox.org/)开发和提供[的Xbox休息服务器](https://github.com/OpenXbox/xbox-smartglass-rest-python)及相关库。

##安装
通过ioBroker Admin界面安装适配器的实例。有关必要安装步骤的详细说明，请参见此处（TODO：LINK）。 <br/><br/>完成适配器实例的安装后，将自动打开配置窗口。

##配置
![适配器配置](../../../de/adapterref/iobroker.xbox/media/adapter-configuration.png "组态") <br/> <span style="color:grey">*管理界面*</span>

|领域|说明|
|:-------------|:-------------|
| Xbox Live ID |输入Xbox的Live ID，可在控制台设置中找到
| IP |在此处输入控制台的IP地址
|使用Xbox Live进行身份验证|如果勾选了复选框，则电子邮件地址和密码将登录到Xbox Live
|电子邮件地址|在此处输入Xbox Live帐户的电子邮件地址
|密码|输入Xbox Live帐户的密码

完成配置后，将使用`SPEICHERN UND SCHLIEßEN`退出配置对话框。
这将导致随后重新启动适配器。

##实例
适配器的安装在`Instanzen`部分中创建了Xbox适配器的活动实例。 <br/><br/> ![例](../../../de/adapterref/iobroker.xbox/media/instance.png "例") <br/> <span style="color:grey">*初审*</span>

在ioBroker服务器上，可以创建多个Xbox适配器实例。此外，可以同时连接到多个ioBroker服务器。如果要由ioBroker服务器控制多个设备，则应为每个Xbox创建一个实例。 <br/><br/>是否已启用适配器或已连接到Xbox的适配器由实例的“状态”字段的颜色指示。如果鼠标指针指向符号，则显示更详细的信息。

##适配器的对象
在`Objekte`部分中，Xbox支持的所有信息和活动都以树结构列出。此外，它还会通知您与Xbox的通信是否正常运行。

![对象](../../../de/adapterref/iobroker.xbox/media/objects.png "Xbox对象") </br> <span style="color:grey">* Xbox适配器的对象*</span>

随后，通过通道对对象进行细分。
每个数据点都与其关联的数据类型和权限相关联。如果是按钮，则省略类型和权限的描述。
权限可以是读（R）和写（W）。每个数据点至少可以被读取（R），而其他数据点也可以被描述。要搜索特定数据点，建议使用组合键“CTRL + F”进行搜索。

###频道：信息
* info.connection

    |数据类型|授权|
    |:---:|:---:|
    |布尔| R |

   *只读指示符，如果ioBroker连接到Xbox，则为true。*

* info.currentTitles

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R |

*只读JSON字符串，由键值对组成。键是正在运行的标题的名称，标题的ID值将转换为十六进制系统。此ID可用于使用settings.launchTitle State启动所需的标题。*

* info.activeTitleName

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R |

    *以字符串的形式包含活动标题的名称（前景中的标题）。*

* info.activeTitleId

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R |

    *包含前缀中转换为十六进制的标题的ID作为字符串。*

* info.activeTitleImage

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R |

*以字符串的形式包含前景中标题封面图像的链接。
如果已激活适配器设置中的身份验证，则状态仅存在且功能正常。*

* info.activeTitleType

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R |

    *以只读字符串的形式包含前景中的标题类型。例如'游戏'。*

* info.gamertag

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R |

*包含当前已验证帐户的gamertag的字符串值。
如果已激活适配器设置中的身份验证，则状态仅存在且功能正常。*

* info.authenticated

    |数据类型|授权|
    |:---:|:---:|
    |布尔| R |

*布尔值，如果使用Xbox Live进行身份验证成功则为true，否则为false。
如果已激活适配器设置中的身份验证，则状态仅存在且功能正常。*

###频道：设置
* settings.power

    |数据类型|授权|
    |:---:|:---:|
    |布尔| R / W |

*可以打开和关闭Xbox的布尔值。也可用作指示Xbox是打开还是关闭的指示。*

* settings.launchTitle

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R / W |

*通过将字符串值设置为十六进制标题ID，可以在Xbox上启动标题。
可以通过info.currentTitles状态找到活动游戏的标题ID。
一旦提交给Xbox，状态就会被确认，这并不意味着命令已被执行。*

   *实施例：*

```javascript
setState('settings.launchTitle', '2340236c', false); // Starte Red Dead Redemption 2
```

* settings.inputText

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R / W |

*通过描述字符串状态，可以将文本插入到活动输入字段中，例如。 B.发送私人消息或输入代码。
一旦提交给Xbox，状态就会被确认，这并不意味着命令已被执行。*

   *实施例：*

```javascript
setState('settings.inputText', 'H1 M8 h0w d0 u do?', false); // Versendet einen nerdigen Text
```

* settings.gameDvr

*按钮，按下时记录游戏的最后一分钟。如果在设置中完成身份验证，则该按钮可用。
此外，经过身份验证的帐户必须登录到Xbox，并且游戏必须位于前台。

###频道：游戏手柄
* gamepad.a

   *模拟控制器的A按钮。*

* gamepad.b

   *模拟控制器的B按钮。*

* gamepad.x

   *模拟控制器的X按钮。*

* gamepad.y

   *模拟控制器的Y按钮。*

* gamepad.clear

   *模拟控制器的“清除”按钮。*

* gamepad.dPadDown

   *模拟控制器的DPAD向下按钮。*

* gamepad.dPadUp

   *模拟控制器的DPAD高位按钮。*

* gamepad.dPadRight

   *模拟控制器的DPAD右键。*

* gamepad.dPadLeft

   *模拟控制器的DPAD左键。*

* gamepad.enroll

   *模拟控制器的“注册”按钮。*

* gamepad.leftShoulder

   *模拟按下控制器的左肩按钮。*

* gamepad.rightShoulder

   *模拟按下控制器的右肩按钮。*

* gamepad.leftThumbstick

   *模拟按下控制器的左杆。*

* gamepad.rightThumbstick

   *模拟按下控制器的右杆。*

* gamepad.menu

   *模拟控制器的菜单按钮。*

* gamepad.nexus

   *模拟控制器的Nexus（Xbox）按钮。*

* gamepad.view

   *模拟控制器的“查看”按钮。*

###频道：媒体
* media.seek

    |数据类型|授权|
    |:---:|:---:|
    |编号| R / W |

*跳转到媒体内容的特定位置的数字值。一旦到达服务器，状态就会被确认，这并不意味着它已被执行。*

* media.play

   *按钮播放媒体内容。*

* media.pause

   *暂停媒体内容的按钮。*

* media.playPause

   *媒体内容的组合播放/暂停按钮。*

* media.back

   *媒体内容的后退按钮。*

* media.channelDown

   *关闭媒体内容频道的按钮。*

* media.channelUp

   *向上移动媒体内容频道的按钮。*

* media.fastForward

   *用于快进媒体内容的按钮。*

* media.menu

   *媒体内容的菜单按钮。*

* media.nextTrack

   *播放媒体内容时跳到下一曲目的按钮。*

* media.previousTrack

   *播放媒体内容时跳到上一曲目的按钮。*

* media.record

   *媒体内容的录制按钮。*

* media.rewind

   *用于倒带媒体内容的按钮。*

* media.stop

   *媒体内容的停止按钮。*

* media.view

   *查看媒体内容按钮。*

## Changelog

### 0.5.6
* (foxriver76) if still logged in dont log warning/set auth false anymore
* (foxriver76) on logout only set auth to false, but keep gamertag

### 0.5.5
* (foxriver76) minor optimizations

### 0.5.3
* (foxriver76) improve log message quality
* (foxriver76) more promisification
* (foxriver76) minor fix for compact mode

### 0.5.0
* (foxriver76) support of compact mode
* (foxriver76) fixes and optimizations

### 0.4.4
* (foxriver76) small fixes and optimizations

### 0.4.2
* (foxriver76) use adapter-core module

### 0.4.1
* (foxriver76) minor type fix

### 0.4.0
* (foxriver76) Seek converted to number, to jump to specific position
* (foxriver76) try reauthentication when auth gets lost

### 0.3.0
* (foxriver76) new state activeTitleType added
* (foxriver76) minor fixes
* (foxriver76) authentication for 2 factor auth added

### 0.2.2
* (foxriver76) minor fix when currentTitles empty, activeTitle states should be too
* (foxriver76) dont set info.connection on power off, because will be
self detected and prevents reconnection on shutdown

### 0.2.1
* (foxriver76) minor fix on state name

### 0.2.0
* (foxriver76) Authentication for Xbox Live added
* (foxriver76) When logged in current titles contains the correct title full name
* (foxriver76) Added decryption and encryption
* (foxriver76) minor fixes
* (foxriver76) Added new states

### 0.1.7
* (foxriver76) rest-server will now be stopped on windows unload too
* (foxriver76) enhanced windows debug logging

### 0.1.6
* (foxriver76) fix rest-server start on win when nopy not in own node_modules folder

### 0.1.5
* (foxriver76) starting rest-server on windows fixed
* (foxriver76) stopping rest-server on windows fixed

### 0.1.4
* (foxriver76) set info.connection and settings.power to false on unload
* (foxriver76) not only rely on ping to check if xbox is on, use available too

### 0.1.3
* (foxriver76) minor fix
* (foxriver76) bump smartglass-rest requirement to 0.9.7
* (foxriver76) enables pwoer on for not multicastable consoles
* (foxriver76) only use discovery when Xbox disconnected and online

### 0.1.2
* (foxriver76) fix when currentTitles is empty

### 0.1.1
* (foxriver76) minor fixes
* (foxriver76) explicit require versions of python deps
* (foxriver76) fix for power on, when Xbox not in broadcast network

### 0.1.0
* (foxriver76) brought back live id to settings
* (foxriver76) input text state to enter text in an open text field
* (foxriver76) ability to find consoles which are not available via broadcast
* (foxriver76) info state for active titles & launch title state

### 0.0.13
* (foxriver76) minor fix
* (foxriver76) restart adapter on rest server error
* (foxriver76) log when losing connection without ping

### 0.0.12
* (foxriver76) when console unavailable, also do not connect
* (foxriver76) debug logging for unavailable console
* (foxriver76) only set power states on change

### 0.0.11
* (foxriver76) minor connection fix

### 0.0.10
* (foxriver76) when status is connecting, don't connect again

### 0.0.9
* (foxriver76) LiveID is not necessary anymore

### 0.0.8
* (foxriver76) If reconnect attempts fail often in a row, only log it once
* (foxriver76) removed unneeded objects from io-package and adjusted title

### 0.0.6
* (foxriver76) Stop making connect requests when already connected
* (foxriver76) more user friendly logging
* (foxriver76) more robustness in nopys path

### 0.0.5
* (foxriver76) using relative paths for starting server
* (foxriver76) adding commands for windows
* (foxriver76) enhanced installation manual

### 0.0.4
* (foxriver76) automatically install required Debian packages
* (foxriver76) updated Readme
* (foxriver76) make installation for Windows possible
* (foxriver76) improved logging
* (foxriver76) detect OS

### 0.0.3
* (foxriver76) fixed state handling
* (foxriver76) using ping to check consoles power status instead of connection
* (foxriver76) stop powering on if it is unsuccessful for 15 seconds
* (foxriver76) restarting adapter when REST snpm erver is down

### 0.0.2
* (foxriver76) fixed endpoints
* (foxriver76) automated installation of dependencies
* (foxriver76) readme updated
* (foxriver76) code optimized

### 0.0.1
* (foxriver76) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Moritz Heusinger <moritz.heusinger@gmail.com>

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