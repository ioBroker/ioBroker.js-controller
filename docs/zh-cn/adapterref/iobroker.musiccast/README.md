---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.musiccast/README.md
title: ioBroker.musiccast
hash: tt/h/le4GOU9PDRh7t6r+yzRzstX8rUJyno2AOEsUHM=
---
![商标](../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)

![安装数量](http://iobroker.live/badges/musiccast-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.musiccast.svg)
![下载](https://img.shields.io/npm/dm/iobroker.musiccast.svg)
![建立状态](https://travis-ci.org/foxthefox/ioBroker.musiccast.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.musiccast.png?downloads=true)

＃ioBroker.musiccast
适用于Yamaha MusicCast设备的适配器，例如WX-010 / 030，YSP-1600

##安装：
安装至少需要nodejs v4

从npm

```javascript
npm install iobroker.musiccast
```

github的实际版本（开发过程中，每次运行时可能都无法正常运行）

```javascript
npm install https://github.com/foxthefox/ioBroker.musiccast/tarball/master --production
```

##设置
管理员页面“ +”可用于手动添加IP地址，设备ID，类型和名称。
按下搜索按钮进行发现。如果有多个设备，则必须多次单击按钮，直到找到所有设备。不幸的是，发现一次仅返回一个对象，这可能是您的任何MusicCast设备。如果返回值与表的一部分相同，则必须再次单击该按钮。有时，它有助于再次保存并打开damin页面。

在不太可能的情况下，如果两个或更多设备提供相同的ID，则稍微更改一个ID。否则，适配器无法区分这两个设备。

如果您想查看播放曲目的播放时间更新，请启用/选中相应的复选框。请注意，这会增加消息计数（对于每个设备，每秒更新一次更新）。

##可用对象
当前实现了以下对象：

###基本（区域）
|对象|价值|设定|说明|
|--------|-------|:-:|--------|
| {zone} .power | boolean | x | true / false-> ON / Standby |
| {zone} .zone_b | boolean |？| true / false->目标区域是区域B |
| {zone} .mute | boolean | x | true / false->静音/未静音|
| {zone} .volume | value | x | 0 ... max（最大值取决于设备）|
| {zone} .act_vol_mode | text |？| dB模式下的实际音量|
| {zone} .act_vol_val | value |？|以dB值表示的实际音量|
| {zone} .act_vol_unit | text |-|实际音量单位（应为dB）|
| {zone} .act_vol_mode_list | text |-| dB模式下的实际音量|
| {zone} .input | text | x |输入取决于设备|
| {zone} .input_list | text |-|可能的输入|
| {zone} .sound_program | text | x |设置声音程序|
| {zone} .sound_program_list | text |-|可能的声音程序|
| {zone} .surr_decoder_type | text |？|设置环绕声类型|
| {zone} .surr_decoder_type_list | text |-|可能的环绕声解码器|
| {zone} .link_control | text | x |设置链接控件|
| {zone} .link_control_list | text |-|可能的链接控制设置|
| {zone} .link_audio_delay | text | x |设置链接音频延迟|
| {zone} .link_audio_delay_list | text |-|可能的链接音频延迟设置|
| {zone} .clearVoice | boolean | x | clear语音控件|
| {zone} .low | value | x | level EQ low |
| {zone} .mid | value | x | level EQ mid |
| {zone} .high | value | x | level EQ high |
| {zone} .subwoofer_volume | value | x | level低音炮音量|
| {zone} .bass | value | x | level bass |
| {zone} .treble | value | x | level treble |
| {zone} .tone_control_mode_list | text |-|可能的音调控制模式|
| {zone} .tone_mode | boolean |？|音调控制模式|
| {zone} .balance | value | x | level balance |
| {zone} .direct | boolean | x |设置直接|
| {zone} .pure_direct | boolean | x |设置纯直接|
| {zone} .enhancer | boolean | x |设置增强器|
| {zone} .bass_extension | boolean | x |设置低音扩展|
| {zone} .sleep | value | x |睡眠计时器|

### Netusb
|对象|价值|设定|说明|
|--------|-------|:-:|--------|
| netusb.input |值| x |设置/实际输入|
| netusb.playPause |布尔值| x |设置播放/暂停|
| netusb.playback |文本|-|状态网络播放器|
| netusb.stop |布尔值| x |设置停止|
| netusb.auto_stop |布尔值|-|自动停止|
| netusb.next |布尔值| x |设置正向|
| netusb.prev | boolean | x | set倒带|
| netusb.shuffle | boolean | x |切换随机播放|
| netusb.shuffle_stat | text |-|随机播放状态|
| netusb.repeat |布尔值| x |切换重复|
| netusb.repeat_stat | text |-|重复状态|
| netusb.artist |文本|-|艺术家名称|
| netusb。相册|文本|-|相册名称|
| netusb.track |文本|-|轨道名称|
| netusb.albumart_url | text |-|专辑封面的http地址|
| netusb.albumart_id | value |-|相册ID |
| netusb.play_time | value |-|播放时间，以s |
| netusb.play_queue_type | text |-| netusb队列类型|
| netusb.total_time | value |-|播放的总时间，以s |
| netusb.recent_info | json |-|播放项目的历史记录|
| netusb.preset_info | json |-|保存的预设/收藏夹|
| netusb.presetrecallnumber | value | x |调用收藏夹列表中的＃|
| netusb.usb_devicetype | text |-|连接的USB设备的类型|
| netusb.attribute | value |-|哪个possibiolites具有服务，将被解码|

###系统
|对象|价值|设定|说明|
|--------|-------|:-:|--------|
| system.api_version |值|-| API版本|
| system.system_version | value |-|系统版本|
| system.inputs。{service} |值|-|可用的输入服务|
| system.inputs。{service} .account_enable | value |-|可用的输入服务已启用|
| system.inputs。{service} .distribution_enable | value |-|可用的输入服务可分配|
| system.inputs。{service} .play_info_type | value |-|可用的输入服务类型|

＃＃＃ 激光唱机
|对象|价值|设定|说明|
|--------|-------|:-:|--------|
| cd.playPause |布尔值| x |设置播放/暂停|
| cd.playback |文本|-|状态CD播放器|
| cd.stop | boolean | x | set Stop |
| cd.next | boolean | x |设置正向|
| cd.prev | boolean | x | set倒带|
| cd.shuffle | boolean | x |切换随机播放|
| cd.shuffle_stat | text |-|随机播放状态|
| cd.repeat |布尔值| x |切换重复|
| cd.repeat_stat | text |-|重复状态|
| cd.device_stat |文本|-|设备状态|
| cd.playtime | value |-|当前播放时间|
| cd.totaltime | value |-|当前曲目总时间|
| cd.disctime | value |-| CD总时间|
| cd.tracknumber |值|-|播放中的当前曲目|
| cd.totaltracks | value |-|总CD轨道|
| cd.artist |文本|-|艺术家名称|
| cd。专辑|文本|-|专辑名称|
| cd.track |文本|-|轨道名称|

###调谐器
|对象|价值|设定|说明|
|--------|-------|:-:|--------|
| tuner.common_preset_info | array |-|预设信息|
| tuner.am.preset_info | array |-|预设AM信息|
| tuner.fm.preset_info | array |-|预设FM信息|
| tuner.dab.preset_info | array |-|预设DAB信息|
| tuner.am.preset |编号| x | AM预设编号|
| tuner.am.freq | number | x | AM频率（kHz）|
| tuner.am.tuned |布尔值|-| AM调谐|
| tuner.fm.preset |编号| x | FM预设编号|
| tuner.fm.freq |数字| x | FM频率（kHz）|
| tuner.fm.tuned |布尔值|-| FM调谐|
| tuner.fm.audio_mode | string |-| FM单声道/立体声|
| tuner.dab.preset |编号| x | DAB预设编号|
| tuner.dab.id |编号|-| DAB站ID |
| tuner.dab.status |字符串|-| DAB状态|
| tuner.dab.freq |数字|-| DAB频率|
| tuner.dab.category |串|  -  |主/辅|
| tuner.dab.audio_mode | string |-| DAB单声道/立体声|
| tuner.dab.bit_rate |数字|-| DAB比特率，单位为kpbs |
| tuner.dab.quality |编号|-| DAB质量0-100 |
| tuner.dab.tune_aid |编号|-| DAB信号强度0-100 |
| tuner.dab.off_air |布尔值|-| DAB广播|
| tuner.dab.dab_plus |布尔|  -  | DAB + |
| tuner.dab.program_type | string |-| DAB程序类型|
| tuner.dab.ch_label |字符串|-| DAB CH标签|
| tuner.dab.service_label |字符串|-| DAB服务标签|
| tuner.dab.dls | string |-| DAB DLS |
| tuner.dab.ensemble_label |字符串|-|| DAB集成标签|
| tuner.dab.initial_scan_progress | number |-| DAB初始扫描进度0-100 |
| tuner.dab.total_station_num | number |-| DAB总站数0-255 |
| tuner.rds.program_type | string |-| RDS程序类型|
| tuner.rds.program_service | string |-| RDS程序服务|
| tuner.rds.radio_text_a | string |-| RDS文本A |
| tuner.rds.radio_text_b | string |-| RDS文本B |

＃＃＃ 时钟
|对象|价值|设定|说明|
|--------|-------|:-:|--------|
| clock.auto_sync | boolean | x |时钟自动同步|
| clock.format | string | x |时钟格式12h / 24h |
| clock.alarm_on | boolean | x |开/关时钟警报状态|
|| clock.volume | number | x |时钟闹钟音量|
| clock.fade_interval | number | x |时钟警报淡入间隔|
| clock.fade_type | number | x |时钟闹钟淡入类型|
| clock.mode | string | x |一天/每周的闹钟模式|
| clock.repeat | boolean | x |如果指定了一天，则重复闹钟警报|
| clock。{day} .enable | boolean | x |时钟设置有效性|
| clock。{day} .time | string |-|时钟闹钟启动时间hhmm 00-23,00-59 |
| clock。{day} .beep | boolean | x | Clock Beep有效性|
| clock。{day} .playback_type | string |-||时钟闹钟的播放类型恢复/预设|
| clock。{day} .resume_input | string |-||闹钟恢复输入ID |
| clock。{day} .preset_type | string |-|时钟闹钟预设类型|
| clock。{day} .preset_num | number |-||闹铃预设输入ID |
| clock。{day} .preset_netusb_input | string |-||时钟警报netusb输入ID |
| clock。{day} .preset_netusb_text | string |-||时钟警报netusb文本|
| clock。{day} .preset_tuner_band | string |-||时钟闹钟调谐器频段|
| clock。{day} .preset_tuner_number | number |-||时钟警报调谐器频率或电台ID |

＃＃ 去做
*支持列表
*将交互值更改为漂亮的命名
* NETUSB / CD的快进/快退
* 蓝牙
*对话等级

## Changelog
#### 0.1.2
* (Scrounger) correction of type mismatch (string boolean)

#### 0.1.1
* correction for clock "oneday"

#### 0.1.0
* compact mode
* yamaha-yxc-nodejs 0.0.8
* widget update

#### 0.0.9
* adminV3 uses values2table and add button back again
* zone2/3/4 now working
* extended automatic testing
* button in admin for collection of JSON responses

#### 0.0.8
* automatic testing update
* given name in admin page to appear in object (device)

#### 0.0.7
* tuner support
* clock support (information mainly)
* support of more zones
* support of mc-link
* setting of min and max values according features
* admin v3

#### 0.0.6
* widget set matching the objects and control
* cd.shuffle_stat boolean -> text
* new netusb.shuffle_stat (text)
* status update via subscribing UDP messages
* switch for update on playtime info (disabling reduces traffic)

#### 0.0.5
* cleanup in admin page
* improvement for object creation
* more objects on netusb
* more objects in system
* added support of CD

#### 0.0.4
* new objects and functions (input, sound_prog, EQ, clearVoice)
* search/discovery in admin page

#### 0.0.3
* more objects implemented

#### 0.0.2
* minor corrections

#### 0.0.1
* initial release with setting of IP in config-page, 
* available commands power, mute, volume

## License

The MIT License (MIT)

Copyright (c) 2017 - 2019 foxthefox <foxthefox@wysiwis.net>