---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/foxthefox/ioBroker.musiccast/edit/master//README.md
title: Yamaha MusicCast
hash: XnE4QwDFRjUpKw9w5tMIJ7qYPO7YYoM0zgipGsj69/c=
adapter: true
license: MIT
authors: foxthefox <foxthefox@wysiwis.net>
description: Musiccast Adapter
keywords: musiccast, sound, audio
readme: https://github.com/foxthefox/ioBroker.musiccast/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2017-05-01T13:50:35.419Z
version: 0.1.0
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.musiccast.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.musiccast.svg
BADGE-建立状态: https://travis-ci.org/foxthefox/ioBroker.musiccast.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.musiccast.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.musiccast/../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)


＃ioBroker.musiccast
适用于Yamaha MusicCast设备的适配器，如WX-010/030，YSP-1600

##安装：
安装至少需要nodejs v4

来自npm

```javascript
npm install iobroker.musiccast
```

来自github的实际版本（这可能不是每次工作，当开发正在进行时）

```javascript
npm install https://github.com/foxthefox/ioBroker.musiccast/tarball/master --production
```

##设置
管理页面“+”可用于手动添加IP地址，DeviceID，类型和名称。
按搜索按钮进行发现。如果您有多个设备，则必须多次点击该按钮，直到找到所有设备。不幸的是，该发现当时只返回一个对象，这可能是您的任何MusicCast设备。如果返回与已经是表的一部分相同，则必须再次点击该按钮。有时它有助于再次保存和打开damin页面。

在不太可能的情况下，2个或更多设备提供相同的ID，然后稍微更改一个ID。否则，适配器无法区分2个设备。

如果您想查看为您收听的曲目更新的播放时间，请启用/选中相应的复选框。请注意，增加消息计数（每个设备每秒都会更新一次乒乓）。

##可用对象
目前实现了以下对象：

### Basic（zone）
|对象|价值|设定|说明|
|--------|-------|:-:|--------|
| {zone} .power | boolean | x | true / false  - > ON / Standby |
| {zone} .zone_b | boolean |？| true / false  - >目标区域是区域B |
| {zone} .mute | boolean | x | true / false  - >静音/不静音|
| {zone} .volume | value | x | 0 ... max（最大值取决于设备）|
| {zone} .act_vol_mode | text |？| dB模式下的实际音量|
| {zone} .act_vol_val | value |？|以dB值为单位的实际音量
| {zone} .act_vol_unit | text |  -  |实际音量单位（应为dB）|
| {zone} .act_vol_mode_list | text |  -  | dB模式下的实际音量|
| {zone} .input | text | x |输入取决于设备|
| {zone} .input_list | text |  -  |可能的输入|
| {zone} .sound_program | text | x |设置声音程序|
| {zone} .sound_program_list | text |  -  |可能的声音程序|
| {zone} .surr_decoder_type | text |？|设置环绕声类型|
| {zone} .surr_decoder_type_list | text |  -  |可能的环绕声解码器|
| {zone} .link_control | text | x |设置链接控件|
| {zone} .link_control_list | text |  -  |可能的链接控制设置|
| {zone} .link_audio_delay | text | x |设置链接音频延迟|
| {zone} .link_audio_delay_list | text |  -  |可能的链接链接音频延迟设置|
| {zone} .clearVoice | boolean | x | clear语音控制|
| {zone} .low | value | x | level EQ low |
| {zone} .mid | value | x | level EQ mid |
| {zone} .high | value | x | level EQ high |
| {zone} .subwoofer_volume | value | x | level低音炮音量|
| {zone} .bass | value | x | level bass |
| {zone} .treble | value | x | level treble |
| {zone} .tone_control_mode_list | text |  -  |可能的音调控制模式|
| {zone} .tone_mode | boolean |？|音调控制模式|
| {zone} .balance | value | x | level balance |
| {zone} .direct | boolean | x | set direct |
| {zone} .pure_direct | boolean | x |设置纯直接|
| {zone} .enhancer | boolean | x | set enhancer |
| {zone} .bass_extension | boolean | x |设置低音扩展|
| {zone} .sleep | value | x |睡眠计时器|

### Netusb
|对象|价值|设定|说明|
|--------|-------|:-:|--------|
| netusb.input | value | x |设置/实际输入|
| netusb.playPause | boolean | x |设置播放/暂停|
| netusb.playback | text |  -  | status net player |
| netusb.auto_stop | boolean |  -  |自动停止|
| netusb.next | boolean | x | set Forward |
| netusb.prev | boolean | x |设置倒带|
| netusb.shuffle | boolean | x |切换shuffle |
| netusb.shuffle_stat | text |  -  | shuffle status |
| netusb.repeat | boolean | x |切换重复|
| netusb.repeat_stat | text |  -  | repeat status |
| netusb.artist | text |  -  | artist name |
| netusb.album | text |  -  |专辑名称|
| netusb.track | text |  -  | track name |
| netusb.albumart_url | text |  -  |专辑封面的http地址|
| netusb.albumart_id | value |  -  | album art id |
| netusb.play_time | value |  -  |在s |中播放时间
| netusb.play_queue_type | text |  -  | netusb队列类型|
| netusb.total_time | value |  -  |在s |中播放的总时间
| netusb.recent_info | json |  -  |播放项目的历史记录|
| netusb.preset_info | json |  -  |已保存的预设/收藏夹|
| netusb.presetrecallnumber | value | x |回想一下收藏夹列表中的＃
| netusb.usb_devicetype | text |  -  |连接USB设备的类型|
| netusb.attribute | value |  -  |哪个possibiolites有服务，要解码|

###系统
|对象|价值|设定|说明|
|--------|-------|:-:|--------|
| system.api_version | value |  -  | API Version |
| system.system_version | value |  -  | System Version |
| system.inputs。{service} | value |  -  |可用输入服务|
| system.inputs。{service} .account_enable | value |  -  |可用的输入服务启用|
| system.inputs。{service} .distribution_enable | value |  -  |可用输入服务distributable |
| system.inputs。{service} .play_info_type | value |  -  |可用输入服务类型|

＃＃＃ 激光唱机
|对象|价值|设定|说明|
|--------|-------|:-:|--------|
| cd.playPause | boolean | x |设置播放/暂停|
| cd.playback | text |  -  | status CD player |
| cd.stop | boolean | x | set Stop |
| cd.next | boolean | x | set Forward |
| cd.prev | boolean | x | set Rewind |
| cd.shuffle | boolean | x | toggle shuffle |
| cd.shuffle_stat | text |  -  | shuffle status |
| cd.repeat | boolean | x |切换重复|
| cd.repeat_stat | text |  -  | repeat status |
| cd.device_stat | text |  -  |设备状态|
| cd.playtime | value |  -  |当前播放时间|
| cd.totaltime | value |  -  |当前曲目总时间|
| cd.disctime | value |  -  | CD总时间|
| cd.tracknumber | value |  -  |跟踪播放中的当前值|
| cd.totaltracks | value |  -  | total CD tracks |
| cd.artist | text |  -  | artist name |
| cd.album | text |  -  |专辑名称|
| cd.track | text |  -  | track name |

### Tuner
|对象|价值|设定|说明|
|--------|-------|:-:|--------|
| tuner.common_preset_info | array |  -  | Preset Information |
| tuner.am.preset_info | array |  -  | Preset AM Information |
| tuner.fm.preset_info | array |  -  |预设FM信息|
| tuner.dab.preset_info | array |  -  |预设DAB信息|
| tuner.am.preset | number | x | AM预设号码|
| tuner.am.freq | number | x | AM频率，单位为kHz |
| tuner.am.tuned | boolean |  -  | AM调整|
| tuner.fm.preset | number | x | FM预设号码|
| tuner.fm.freq | number | x | FM频率，单位为kHz |
| tuner.fm.tuned | boolean |  -  | FM tuned |
| tuner.fm.audio_mode | string |  -  | FM mono / stereo |
| tuner.dab.preset | number | x | DAB预设号码|
| tuner.dab.id | number |  -  | DAB Station ID |
| tuner.dab.status | string |  -  | DAB状态|
| tuner.dab.freq | number |  -  | DAB频率|
| tuner.dab.category |串|  -  |主/辅|
| tuner.dab.audio_mode | string |  -  | DAB mono / stereo |
| tuner.dab.bit_rate | number |  -  | DAB比特率，单位为kpbs |
| tuner.dab.quality | number |  -  | DAB质量0-100 |
| tuner.dab.tune_aid | number |  -  | DAB信号强度0-100 |
| tuner.dab.off_air | boolean |  -  | DAB off air |
| tuner.dab.dab_plus |布尔|  -  | DAB + |
| tuner.dab.program_type | string |  -  | DAB程序类型|
| tuner.dab.ch_label | string |  -  | DAB CH label |
| tuner.dab.service_label | string |  -  | DAB服务标签|
| tuner.dab.dls | string |  -  | DAB DLS |
| tuner.dab.ensemble_label | string |  -  | DAB随附标签|
| tuner.dab.initial_scan_progress | number |  -  | DAB初始扫描进度0-100 |
| tuner.dab.total_station_num | number |  -  | DAB全站仪0-255 |
| tuner.rds.program_type | string |  -  | RDS程序类型|
| tuner.rds.program_service | string |  -  | RDS程序服务|
| tuner.rds.radio_text_a | string |  -  | RDS text A |
| tuner.rds.radio_text_b | string |  -  | RDS文本B |

＃＃＃ 时钟
|对象|价值|设定|说明|
|--------|-------|:-:|--------|
| clock.auto_sync | boolean | x |时钟自动同步|
| clock.format | string | x |时钟格式12h / 24h |
| clock.alarm_on | boolean | x |时钟报警状态开/关|
| clock.volume | number | x |时钟闹钟音量|
| clock.fade_interval | number | x |时钟警报淡入淡出间隔|
| clock.fade_type | number | x |时钟闹钟淡入淡出类型|
| clock.mode | string | x |时钟闹钟模式oneday / weekly |
| clock.repeat | boolean | x |如果指定了oneday，则重复时钟报警
| clock。{day} .enable | boolean | x |时钟设置有效性|
| clock。{day} .time | string |  -  |时钟闹钟启动时间hhmm 00-23,00-59 |
| clock。{day} .beep | boolean | x | Clock Beep valid |
| clock。{day} .playback_type | string |  -  |时钟闹钟播放类型resume / preset |
| clock。{day} .resume_input | string |  -  |时钟闹钟恢复输入ID |
| clock。{day} .preset_type | string |  -  |时钟闹钟预设类型|
| clock。{day} .preset_num | number |  -  |时钟闹钟预设输入ID |
| clock。{day} .preset_netusb_input | string |  -  |时钟报警netusb输入ID |
| clock。{day} .preset_netusb_text | string |  -  |时钟报警netusb文本|
| clock。{day} .preset_tuner_band | string |  -  |时钟闹钟调谐器乐队|
| clock。{day} .preset_tuner_number | number |  -  |时钟闹钟调谐器频率或电台ID |

＃＃ 去做
*支持列表
*将交互值更改为漂亮的命名
* NETUSB / CD的fastforward / fastrewind
* 蓝牙
*对话级别

## Changelog
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

Copyright (c) 2018 foxthefox <foxthefox@wysiwis.net>