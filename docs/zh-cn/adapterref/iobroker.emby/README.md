---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.emby/README.md
title: ioBroker.emby
hash: MROTHJDTdk8ju4arLWJfWpDbjAxU+5KpcaEXIyXf0A4=
---
![商标](../../../en/adapterref/iobroker.emby/admin/emby.png)

![建立状态](https://travis-ci.org/thewhobox/ioBroker.emby.svg?branch=master)
![安装数量](http://iobroker.live/badges/emby-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.emby.svg)
![下载](https://img.shields.io/npm/dm/iobroker.emby.svg)
![NPM](https://nodei.co/npm/iobroker.emby.png?downloads=true)

＃ioBroker.emby
此适配器将允许您连接到您的Emby服务器并控制它。

请按照步骤确保适配器正常工作，您可以看到所有设备。

＃＃ 脚步
1.从Github安装适配器

2.编辑设置并输入您要忽略的IP，ApiKey和某些DeviceIds。

```IP **with** Port => 192.168.0.100:8096```

3.保存并重新启动适配器。

4.要查看第一个项目，您必须打开一个Emby客户端来接收一些数据。

```The Adapter will not get Data if **no** client is open.```

##对象
### Infos
|命令|说明|信息|
| ------------- | ------------- | ------------- |
| x.info.deviceName |显示设备的名称| |
| x.info.userName |显示在设备上登录的用户名称|
| x.info.supportedCommands |支持的命令列表| |

###媒体
|命令|说明|信息|
| ------------- | ------------- | ------------- |
| x.media.description |显示的文件的描述。 | |
| x.media.isMuted |如果媒体是静音的。 |并非所有设备都支持此功能，并且将为False。 |
| x.media.state |媒体状况。 |玩，暂停，闲置|
| x.media.title |显示的文件的标题。 | |
| x.media.type |显示的文件的类型。 |剧集，电影，音频，无等。|
| x.media.seasonName |季节的名字|只有.media.type是Episode否则它将为空。 |
| x.media.seriesName |意甲的名字只有.media.type是Episode否则它将为空。 |

###命令
|命令|说明|信息|
| ------------- | ------------- | ------------- |
| x.command.dialog |在所选设备上显示一个对话框。 |例如：Header \ | Some text（如果没有给出标题，ioBroker将是Header）|
| x.command.goHome |向所选设备发送命令，该命令将返回到主屏幕| |
| x.command.message |在所选设备上显示消息5秒钟。 | |
| x.command.play |播放媒体|仅当媒体暂停时|
| x.command.pause |暂停媒体|只有媒体正在播放|
| x.command.toggleplay |切换播放状态|播放/暂停|
| x.command.mute |使设备静音|
| x.command.unmute |取消静音设备| |
| x.command.togglemute |切换设备的静音| |
| x.command.volume |设置所选设备的音量。 |由于它对电视音量进行控制，因此不适用于大多数设备。 |

## Changelog

### 0.1.2
* Added more commands

### 0.1.1
* Added delay if you watch mor episodes

### 0.1.0
* Added automatic try reconnect after one minute

### 0.0.4
* added compact mode

### 0.0.3
* added new states, connection state and more improvment


### 0.0.2
* added more states
* added DisplayMessage

### 0.0.1
* Initial version

## License

MIT License

Copyright (c) 2019 thewhobox

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.