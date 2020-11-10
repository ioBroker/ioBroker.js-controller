---
BADGE-Number of Installations: http://iobroker.live/badges/xbox-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.xbox.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.xbox.svg
BADGE-NPM: https://nodei.co/npm/iobroker.xbox.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.xbox/README.md
title: Xbox转接器
hash: gJUPhFPBZB+5r5FRM0+F0rvSIBZIOpQQ2Jsy0KuoTkE=
---
![商标](../../../de/adapterref/iobroker.xbox/media/xbox.png)

＃Xbox适配器
通过Xbox适配器，可以将Xbox One或Xbox One X游戏控制台集成到ioBroker系统中。

##概述
### Xbox One游戏机
Xbox One是Microsoft开发的游戏机，目前可以玩流行的视频游戏。此外，Xbox One能够控制家庭影院系统的各种组件，并允许使用Microsoft应用程序。<br/> Xbox One的其他版本目前是Xbox One X和Xbox One S，它们提供与原始控制台相同的功能，但性能有所提高。

### Xbox适配器
可以为每个Xbox One控制台设置Xbox适配器，从而可以控制和读出信息。<br/>适配器以对象的形式自动创建所有命令和状态。大多数状态也可以读出，例如B.当前标题，打开状态等。通过故意写入或读取创建的对象，可以更改其状态以及触发或查询操作。

##安装前的要求
1.在添加适配器之前，主机系统上至少必须有Python 3.5

被安装。

2.如果要通过适配器打开Xbox，则Xbox

必须在控制台中配置[快速启动模式](https://support.xbox.com/de-DE/xbox-one/console/learn-about-power-modes)。

＃＃ 谢谢
非常感谢[团队开放Xbox](https://openxbox.org/)开发和提供[xbox-rest-server](https://github.com/OpenXbox/xbox-smartglass-rest-python)及其关联的库。

##安装
适配器的实例是通过ioBroker管理界面安装的。有关必要安装步骤的详细说明，请参见此处（TODO：LINK）。<br/><br/>适配器实例的安装完成后，配置窗口将自动打开。

##配置
![适配器配置](../../../de/adapterref/iobroker.xbox/media/adapter-configuration.png "组态")<br/> <span style="color:grey">*管理界面*</span>

|领域描述 |
|:-------------|:-------------|
| Xbox Live ID |在此处输入Xbox Live ID，可以在控制台设置中找到它。 |
| IP |控制台的IP地址应在此处输入。 |
| Xbox Live的身份验证|如果选中了此复选框，则将使用您的电子邮件地址和密码登录到Xbox Live。 |
| 回到顶端|提供反馈解决方案|电子邮件地址| Xbox Live帐户的电子邮件地址应在此处输入。 |
|密码| Xbox Live帐户的关联密码应在此处输入。 |

完成配置后，使用`SPEICHERN UND SCHLIEßEN`退出配置对话框。
这将导致适配器重新启动。

##个实例
适配器的安装已在`Instanzen`节中创建了Xbox适配器的活动实例。<br/><br/> ![实例](../../../de/adapterref/iobroker.xbox/media/instance.png "实例")<br/> <span style="color:grey">* 第一个例子 *</span>

可以在ioBroker服务器上创建几个Xbox适配器实例。一台也可以同时连接到多台ioBroker服务器。如果一台ioBroker服务器要控制多个设备，则应为每个Xbox创建一个实例。<br/><br/>实例的状态字段的颜色指示适配器是已激活还是已连接到Xbox。如果鼠标指针指向该符号，则会显示更多详细信息。

##适配器的对象
在`Objekte`节中，Xbox支持的所有信息和活动都以树形结构列出。此外，还提供有关与Xbox的通信是否运行顺利的信息。

![对象](../../../de/adapterref/iobroker.xbox/media/objects.png "Xbox对象")</br> <span style="color:grey">* Xbox适配器对象*</span>

在下文中，根据通道将对象划分。
列出了每个数据点及其关联的数据类型及其授权。只要是按钮，就不再需要类型和权限的描述。
可以读取（R）和写入（W）授权。每个数据点至少可以读取（R），而其他数据点也可以写入。要搜索特定的数据点，我们建议使用组合键“ CTRL + F”。

###频道：信息
*信息连接

    |数据类型|授权|
    |:---:|:---:|
    |布尔值| R |

   * ioBroker连接到Xbox时为true的只读指示器。

* info.currentTitles

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R |

*仅可读的JSON字符串，由键值对组成。关键字是当前标题的名称，该值将标题的ID转换为十六进制系统。该ID可用于使用settings.launchTitle状态来开始所需的标题。

* info.activeTitleName

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R |

    *包含活动标题的名称（前景中的标题），以字符串形式。

* info.activeTitleId

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R |

    *包含标题的ID，该标题的ID作为字符串转换为前台的十六进制系统。

* info.activeTitleImage

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R |

*以字符串的形式包含指向前景中标题封面图像的链接。
仅在适配器设置中激活了身份验证后，此状态才可用并且可以运行。

* info.activeTitleType

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R |

    *包含以只读字符串形式出现在前台的标题类型，例如B.“游戏”。

* info.gamertag

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R |

*包含当前已验证帐户的游戏标记的字符串值。
仅在适配器设置中激活了身份验证后，此状态才可用并且可以运行。

*信息已认证

    |数据类型|授权|
    |:---:|:---:|
    |布尔值| R |

*布尔值，如果通过Xbox Live的身份验证成功，则为true，否则为false。
仅在适配器设置中激活了身份验证后，此状态才可用并且可以运行。

###频道：设置
* settings.power

    |数据类型|授权|
    |:---:|:---:|
    |布尔值|读/写|

*可以用来打开和关闭Xbox的布尔值。该值还可以指示Xbox是否打开或关闭。

* settings.launchTitle

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R / W |

*通过将字符串值设置为十六进制标题ID，可以在Xbox上启动标题。
可以从info.currentTitles状态中找到有效游戏的标题ID。
状态一旦被传输到Xbox便被确认，这并不意味着该命令已被实际执行。

   *例：*

```javascript
setState('settings.launchTitle', '2340236c', false); // Starte Red Dead Redemption 2
```

* settings.inputText

    |数据类型|授权|
    |:---:|:---:|
    |字符串| R / W |

*通过描述字符串状态，可以将文本插入活动输入字段，例如B.发送私人消息或输入密码。
状态一旦被传输到Xbox便被确认，这并不意味着该命令已被实际执行。

   *例：*

```javascript
setState('settings.inputText', 'H1 M8 h0w d0 u do?', false); // Versendet einen nerdigen Text
```

* settings.gameDvr

    |数据类型|授权|
    |:---:|:---:|
    |字符串| W |

*记录游戏定义时间的可写字符串。如果已在设置中进行认证，则状态为可用。
经过身份验证的帐户也必须在Xbox上注册，并且游戏必须在前台。

    *例：*

```javascript
setState('settings.gameDvr', '-60,30', false); // zeichne die letzten 60 Sekunden bis zu den nächsten 30 Sekunden auf (90 Sekunden gesamt)
```

###频道：游戏手柄
* gamepad.a

   *模拟控制器上的A按钮。

* gamepad.b

   *模拟控制器上的B按钮。

* gamepad.x

   *模拟控制器上的X按钮。

* gamepad.y

   *模拟控制器上的Y按钮。

* gamepad.clear

   *模拟控制器的“清除”按钮。

* gamepad.dPadDown

   *模拟控制器上的DPAD向下按钮。

* gamepad.dPadUp

   *模拟控制器上的DPAD向上按钮。

* gamepad.dPadRight

   *模拟控制器右侧的DPAD按钮。

* gamepad.dPadLeft

   *模拟控制器左侧的DPAD按钮。

* gamepad.enroll

   *模拟控制器的“注册”按钮。

* gamepad.left肩

   *模拟按下控制器上的左肩按钮。

* gamepad.right肩

   *模拟按下控制器上的右肩按钮。

* gamepad.leftThumbstick

   *模拟按下控制器的左操纵杆。

* gamepad.rightThumbstick

   *模拟按下控制器的右摇杆。

* gamepad.menu

   *模拟控制器上的菜单按钮。

* gamepad.nexus

   *模拟控制器上的Nexus（Xbox）按钮。

* gamepad.view

   *模拟控制器上的“查看”按钮。

###频道：媒体
* media.seek

    |数据类型|授权|
    |:---:|:---:|
    |号| R / W |

*数字值，可跳至媒体内容中的特定点。状态一旦到达服务器即被确认，这并不意味着它实际上已被执行。

* media.play

   *用于播放媒体内容的按钮。

* media.pause

   *用于暂停媒体内容的按钮。

* media.playPause

   *用于媒体内容的组合播放/暂停按钮。

* media.back

   *返回按钮以显示媒体内容。

* media.channelDown

   *向下切换媒体内容频道的按钮。

* media.channelUp

   *用于向上切换媒体内容频道的按钮。

* media.fastForward

   *用于快速转发媒体内容的按钮。

* media.menu

   *媒体内容的菜单按钮。

* media.nextTrack

   *播放媒体内容时跳至下一首曲目的按钮。

* media.previousTrack

   *播放媒体内容时跳至上一个标题的按钮。

* media.record

   *录制媒体内容的按钮。

* media.rewind

   *倒带媒体内容的按钮。

* media.stop

   *媒体内容的停止按钮。

* media.view

   *查看媒体内容的按钮。

## Changelog
### 0.7.0 (2020-11-04)
* (foxriver76) replaced deprecated requests module by axios
* (foxriver76) migrated to xbox-smartglass 1.3
* (foxriver76) removed Python3.6 support 
* (foxriver76) event based rest server startage (faster and more robust)
* (foxriver76) GameDVR now supports custom time

### 0.6.9 (2020-11-02)
* (foxriver76) dependency upgrade, fixes installation problems

### 0.6.8 (2020-09-24)
* (foxriver76) minor optimization

### 0.6.5 (2020-05-28)
* (foxriver76) fixed problem with auth-only states

### 0.6.4 (2020-05-11)
* (foxriver76) compatibility with controller v3

### 0.6.3 (2020-04-02)
* (foxriver76) try specific python versions first on install
* (foxriver76) bump dependency, because of auth bug in smartglass

### 0.6.1 (2020-03-17)
* (foxriver76) fixes for compact mode compatibility
* (foxriver76) more translations added
* (foxriver76) minor optimizations

### 0.6.0 (2020-03-01)
* (foxriver76) dependency upgrade (smartglass has been refactored)
* __python 3.6 required!__

### 0.5.12 (2020-01-17)
* (foxriver76) let js-controller know which apt packages are required

### 0.5.11 (2019-11-27)
* (foxriver76) we not try to install apt packages any longer if already installed

### 0.5.8
* (foxriver76) increased stopTimeout to successfully shut down adapter on windows based systems
* (foxriver76) now using setStateChanged instead of own implementation

### 0.5.7
* (foxriver76) fix gamertag not set if no state on the object exists yet

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

Copyright (c) 2018-2020 Moritz Heusinger <moritz.heusinger@gmail.com>

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