---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bosesoundtouch/README.md
title: ioBroker.bosesoundtouch！[Logo]（admin / bosesoundtouch.png）
hash: mbAV8qA2RDeNq6P2wPmscDyJNJgDnB6E4jRBgMEUAMA=
---
＃ioBroker.bosesoundtouch![商标](../../../en/adapterref/iobroker.bosesoundtouch/admin/bosesoundtouch.png)
用于ioBroker IoT平台的Bose SoundTouch适配器

##控制状态
要控制扬声器，可以编写以下对象：

|国家|说明|
| :---           | :---        |
|关键|要发送的以下密钥之一： <br><br>玩<br>暂停<br>停<br> PREV_TRACK <br> NEXT_TRACK <br>竖起大拇指<br>不看好<br>书签<br>功率<br>静音<br>提高音量<br>音量减小<br> PRESET_1 <br> PRESET_2 <br> PRESET_3 <br> PRESET_4 <br> PRESET_5 <br> PRESET_6 <br> AUX_INPUT <br> SHUFFLE_OFF <br> SHUFFLE_ON <br> REPEAT_OFF <br> REPEAT_ONE <br> REPEAT_ALL <br> PLAY_PAUSE <br> ADD_FAVORITE <br> REMOVE_FAVORITE <br> INVALID_KEY |
|静音|将设备静音或取消静音。 |
|在|打开或关闭设备电源。 |
| playEverywhere |将扬声器定义为区域主控并在所有其他扬声器上播放其内容。 |
|音量|将设备容量更改为0到100之间

##信息状态
从您的发言人那里收集以下信息（只读状态）：

＃＃＃ 设备信息
|国家|说明|
| :---       | :---        |
| ipAddress |设备IP地址，通常与您在适配器设置中配置的相同。 |
| macAddress |设备MAC地址|
|名字|您使用SoundTouch应用程序配置的名称。 |
|类型|设备类型（例如SoundTouch 300）。 |

###正在播放
|国家|说明|
| :---       | :---        |
|专辑|目前正在播放的专辑。 |
|艺术|源艺术的URL。 |
|艺术家|目前正在播放的艺术家|
|类型|当前播放曲目的类型。 |
|来源|播放服务的类型或名称。要确定产品是否处于待机模式，请检查source == STANDBY。 |
|车站|电台或播放列表名称。 |
|跟踪|目前正在播放的曲目。 |

###预设
6个可用预设中的每一个都存在以下状态：

|国家|说明|
| :---       | :---        |
| iconUrl |源艺术的URL。 |
|名字|专辑，电台，播放列表，歌曲，电话等名称取决于来源。 |
|来源|服务的类型或名称。 |

### Zones
以下说明将帮助您使用多室系统创建组。如果您通过Soundtouch应用程序本身更改组，则声音触摸设备会自动更新只读字段。

|国家|说明|
| :---       | :---        |

| masterOf |显示扬声器从站的MAC地址（由“;”拆分）（只读）| memberOf |显示该扬声器主控的MAC地址（只读）| addMasterOf |添加要添加到此主扬声器的扬声器的MAC地址。也可以放一个以上的扬声器（用“;”分开）。
| removeMasterOf |添加要从此主扬声器中移除的扬声器的MAC地址。也可以放一个以上的扬声器（用“;”分开）。

## Changelog

### 0.2.3 (11.11.2018)
* fixed issue #24 "does not start"
 
### 0.2.2 (03.11.2018)
* Zones: objects moved to sub folder 'zones'

### 0.2.1 (12.10.2018)
* Update now playing info for source Deezer

### 0.2.0 (27.09.2018)
* Add support for zones

### 0.1.9 (07.03.2018)
* Update now playing info for source Amazon

### 0.1.8 (08.02.2018)
* Update now playing info for source Spotify
* now playing: added state 'genre'

### 0.1.7 (04.02.2018)
* fixed crash if no presets are defined

### 0.1.6 (17.01.2018)
* fixed crash if socket connection fails
* added setting: time to reconnect in seconds

### 0.1.5 (06.01.2018)
* added 'TUNEIN' to now playing info
* state playEverywhere falls back to false after activation
* admin/bose.png renamed to admin/bosesoundtouch.png to be shown corretly in adapter list
* added short adapter description in io-package.json

### 0.1.4 (30.12.2017)
* playEverywhere: support multi room (zones) to define one speaker as master for all others

### 0.1.3 (22.12.2017)
* revert last change

### 0.1.2 (22.12.2017)
* fixed typo in package.json

### 0.1.1 (20.12.2017)
* now playing: added state 'art' (URL to cover image if available)
* merged pull request from Apollon77 (basic config files for testing)
* renamed repository to 'ioBroker.bosesoundtouch'

### 0.1.0 (26.11.2017)
* objectChange/stateChange: log level 'debug'
* added 'STORED_MUSIC' to now playing info.

### 0.0.9 (22.11.2017)
* Merge pull request #1 from Apollon77/master: Add testing and fix things...

### 0.0.8 (19.11.2017)
* send value to correct instance when having multiple adapters installed
* first version of README.md

### 0.0.7 (09.11.2017)
* fixed logging in soundtouchsocket.js

### 0.0.6 (09.11.2017)
* renamed main.js to bosesoundtouch.js
* line ending: LF
* strings: single quote

### 0.0.5 and earlier (01.11.2017)
* Initial versions