---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/stateroles.md
title: 国家角色
hash: TyRDvFO26COB9IB5dLzOnd7bGkiptZ8UYCKCyrXG7Do=
---
＃州角色
##很常见
*州 - 非常普遍的目的。如果您不知道州有哪个角色，请使用此角色。
* text（common.type = string）
* text.url（common.type = string）state val包含一个用于锚点，iframe或img的url
* html（common.type = string）
* json（common.type = string）
* list（common.type = array）
* date（common.type = string  - 可由“new Date（ddd）”字符串解析
* date（common.type = number  -  epoch seconds * 1000

##传感器（布尔值，只读）
*common.type = boolean，common.write = false*

* sensor.window  - 窗口打开（true）或关闭（false）
* sensor.door  - 门打开（真实）或关闭（假）
* sensor.alarm  - 一些常见的警报
* sensor.alarm.flood  - 漏水
* sensor.alarm.fire  - 火灾传感器
* sensor.alarm.secure  - 门打开，窗口打开或警报期间检测到运动。
* sensor.alarm.power  - 无电源（电压= 0）
* sensor.light  - 来自灯的反馈，它是ON
* sensor.lock  - 锁的实际位置
* sensor.motion  - 运动传感器
* sensor.rain  - 检测到雨水
* sensor.noise  - 检测到噪音

##按钮（布尔，只写）
*common.type = boolean，common.write = true，common.read = false*

*按钮
* button.long
* button.stop  - 例如罗洛停止
* button.start
* button.open.door
* button.open.window
* button.mode。*
* button.mode.auto
* button.mode.manual
* button.mode.silent

##值（数字，只读）
*common.type = number，common.write = false*

*价值
* value.window（common.states = {“0”：“CLOSED”，“1”：“TILTED”，“2”：“OPEN”}）重要的是（CLOSED / TILTED / OPEN）。价值观可能不同。
* value.temperature（common.unit ='°C'或'°F'或'K'）
* value.humidity
* value.brightness  - 亮度级别（单位：勒克斯）
* value.min
* value.max
* value.default
* value.battery  - 电池电量
* value.valve  - 阀门水平
* value.time  -  Date（）对象的getTime（）
* value.interval（common.unit ='sec'） - 以秒为单位的间隔（可以是0.1或更小）
* ~~ value.date（common.type = string） - 表格中的日期2015.01.01（没有时间）~~
* ~~ value.datetime（common.type = string） - 系统格式的日期和时间~~
* value.gps.longitude  -  gps经度坐标
* value.gps.latitude  -  gps纬度
* value.gps.elevation  -  gps提升
* value.gps  - 经度和纬度一起像'5.56; 43.45'
* value.power.consumption（单位= Wh或KWh）
* value.direction  - （common.type = number ~~或string ~~，表示上/下，左/右，4向开关，风向......）
* value.curtain  - 窗帘的实际位置
* value.blind  - 盲人的实际位置
* value.tilt  - 实际倾斜位置
* value.lock  - 锁定的实际位置
* value.speed  - 风速
* value.pressure  - （单位：mbar）
* value.distance
* value.distance.visibility
* value.severity  - 一些严重性（可以提供状态），更高更重要
* value.warning  - 一些警告（可以提供状态），更高更重要
* value.sun.elevation  - 以°为单位的太阳高度
* value.sun.azimuth  - 以°为单位的太阳方位角
* value.voltage  - 以伏特为单位的电压，单位= V.
* value.current  - 以安培为单位的电流，单位= A.

##指标（布尔值，只读）
*common.type = boolean，common.write = false*

*指标*与*传感器*的区别在于指标将显示为小图标。传感器作为真正的价值。
因此，指标可能并非在渠道中单独存在。它必须是通道内的其他主要状态。

*指标
* indicator.working  - 表示目标系统正在执行某些操作，如百叶窗或锁定开启。
* indicator.reachable  - 如果设备在线
* indicator.connected  - 仅用于实例。对设备使用indicator.reachable
* indicator.maintenance  - 表示系统警告/错误，警报，服务消息，电池电量耗尽或类似的东西
* indicator.maintenance.lowbat
* indicator.maintenance.unreach
* indicator.maintenance.alarm
* indicator.lowbat  - 如果电池电量不足则为true
* indicator.alarm  - 与indicator.maintenance.alarm相同
* indicator.alarm.fire  - 检测到火灾
* indicator.alarm.flood  - 检测到洪水
* indicator.alarm.secure  - 门或窗口打开

##级别（数字，读写）
使用**级别**，您可以控制或设置一些数字值。

*common.type = number，common.write = true*

*水平
* level.co2  -  0-100％的质量
* level.dimmer  - 亮度也更暗
* level.blind  - 设置盲位
* level.temperature  - 设定所需温度
* level.valve  - 阀门位置的设定点
* level.color.red
* level.color.green
* level.color.blue
* level.color.white  -  rgbW
* level.color.hue  - 颜色在°0-360; 0 =红色，120 =绿色，240 =蓝色，360 =红色（循环）
* level.color.saturation
* level.color.rgb  - 像'#rrggbb'这样的十六进制颜色
* level.color.luminance
* level.color.temperature  - 色温K°2200暖白色，6500°冷白色
* level.timer
* level.timer.sleep  - 睡眠计时器。 0  - 关闭，或在几分钟内
* ...
* level.volume  - （min = 0，max = 100） - 音量，但是min，max可以不同。 min <max
* level.volume.group  - （min = 0，max = 100） - 音量，用于设备组
* level.curtain  - 设置窗帘位置
* level.tilt  - 设置百叶窗的倾斜位置

##开关（布尔值，读写）
切换控制布尔设备（true = ON，false = OFF）

*common.type = boolean，common.write = true*

*开关
* switch.lock  -  lock（true  -  open lock，false  -  close lock）
* switch.lock.door  - 门锁
* switch.lock.window  - 窗口锁
* switch.boost  - 恒温器的启动/停止升压模式
* switch.light
* switch.comfort  - 舒适模式
* switch.enable
* switch.power  - 电源开/关
* switch.mode。*
* switch.mode.auto  - 开启/关闭自动模式
* switch.mode.manual  - 手动模式开/关
* switch.mode.silent  - 静音模式开/关
* switch.mode.moonlight  - 开启/关闭月光模式
* switch.mode.color  - 开启/关闭颜色模式

##媒体
媒体播放器的特殊角色

* button.stop
* button.play
* button.next
* button.prev
* button.pause
* switch.pause
* button.forward
* button.reverse
* button.fastforward
* button.fastreverse
* button.volume.up
* button.volume.down
* media.seek  - （common.type = number）％
* media.mode.shuffle  - （common.type = number）0  -  none，1  -  all，2  -  one
* media.mode.repeat  - （common.type = boolean）
* media.state  -  ['play'，'stop'，'pause']或[0  - 暂停，1  -  play，2  -  stop]或[true  -  playing / false  -  pause]
* media.artist
* media.album
* media.title
* media.title.next
* media.cover  - 封面网址
* media.cover.big  - 大封面网址
* media.cover.small  - 小封面网址
* media.duration.text  - 例如“2:35”
* media.duration  - （common.type = number）秒
* media.elapsed.text  - 例如“1:30”
* media.elapsed  - （common.type = number）秒
* media.broadcastDate  - （common.type = string）广播日期
* media.mute  - （common.type = boolean）true为静音
* media.season  - （common.type = string）季节号（重要的是类型真的是“字符串”，能够用“”表示没有季节）
* media.episode  - （common.type = string）剧集编号（重要的是该类型实际上是“字符串”，以便能够指示没有剧集“”）
* media.mute.group  - （common.type = boolean）设备组静音
* media.tts  - 文本到语音
* media.bitrate  -  kbps
* media.genre  - 流派歌曲
* media.date  - 年歌
* media.track  - （common.type = string）当前播放曲目id [0  - 〜]（重要的是该类型实际上是“字符串”，能够用“”表示没有曲目）
* media.playid  - 媒体播放器跟踪ID
* media.add  - 添加当前播放列表
* media.clear  - 清除当前播放列表（只写）
* media.playlist  -  json数组之类的
* media.url  - 要播放的网址或当前网址
* media.url.announcement  - 播放公告的网址
* media.jump  - 要在播放列表中跳转的项目数（可以为负数）
* media.content  - 正在播放的媒体类型，如音频/ mp3
* media.link  - 使用当前文件的状态
* media.input  - 输入的数字或字符串（AUX，AV，TV，SAT，...）
* level.bass  - 低音等级
* level.treble  - 高音等级
* switch.power.zone  - 电源区

```
[
    {
        "artist": "",
        "album": "",
        "bitrate":0,
        "title": "",
        "file": "",
        "genre": "",
        "year": 0,
        "len": "00:00",
        "rating": "",
        "cover": ""
    }
]
```

* media.browser  - 像“文件”一样的json数组

```
[
    {
        "fanart": "",
        "file": "",//smb://192.168.1.10/music/AtlantidaProject/
        "filetype": "", //directory
        "label": "",
        "lastmodified": "",
        "mimetype": "",
        "size": 0,
        "thumbnail": "",
        "title": "",
        "type": "",
        "lastmodified": "2016-02-27 16:05:46",
        "time": "88",
        "track": "01",
        "date": "2005",
        "artist": "yonderboy (H)",
        "album": "splendid isolation",
        "genre": "Trip-Hop"
    }
]
```

##天气
* value.temperature  - 实际温度
* value.temperature.windchill  - 实际风寒
* value.temperature.dewpoint  - 实际露点
* value.temperature.feelslike  - 实际温度“感觉像”
* value.temperature.min  - 最后24小时的最低温度
* value.temperature.max  - 最后24小时的最高温度
* value.humidity  - 实际或平均湿度
* value.humidity.min  - 实际湿度
* value.humidity.max  - 实际湿度
* value.speed.wind  - 实际或平均风速
* value.speed.max.wind  - 最近24小时的最大风速
* value.speed.min.wind  - 过去24小时的最小风速
* value.speed.wind.gust  - 实际阵风速度
* value.direction.wind  - 以度为单位的实际或平均风向
* value.direction.max.wind  - 以度为单位的实际风向
* value.direction.min.wind  - 以度为单位的实际风向
* weather.direction.wind  - 实际或平均风向为文本，例如北北西
*日期 - 上次阅读信息的实际日期或日期
* date.sunrise  - 今天的日出
* date.sunset  - 今天的日落
* dayofweek  - 作为文本的星期几
* location  - 位置的文字说明（例如地址）
* weather.icon  - 现在的实际状态图标URL
* weather.icon.wind  - 现在的实际风图标网址
* weather.icon.name  - 现在的实际状态图标名称
* weather.state  - 实际天气描述
* value.precipitation  - （类型：数量，单位：mm）最近24小时降雨/降雪的降雨量（NiederschlagheutefürSchneeoder Regen /осадкисегодняснегаилидождя）
* value.precipitation.hour  - 过去一小时的实际降水量
* value.precipitation.today  - 今天的实际降水量（至0:00）
* value.radiation  - 实际太阳辐射水平
* value.uv  - 实际UV水平
* value.clouds  - 天空上的云彩。 0％ - 没有云，100％ - 很多云。
* value.rain  - 过去24小时内的实际降雨量
* value.rain.hour  - 过去一小时的实际降雨量
* value.rain.today  - 今天的实际降雨量（至0:00）
* value.snow  - 过去24小时内的实际降雪量
* value.snow.hour  - 过去一小时的实际降雪量
* value.snow.today  - 今天的实际降雪等级（直至0:00）
* value.snowline  - 以米为单位的实际雪线
* weather.chart.url  - 天气历史记录图表的URL
* weather.chart.url.forecast  - 天气预报图表的URL
* weather.html  - 带有天气描述的HTML对象
* weather.title  - 非常简短的描述
* weather.title.short  - 非常简短的描述（一个字）
* weather.type  - 天气信息的类型
* weather.json  - 具有特定数据的JSON对象
* value.speed.wind.forecast.0  - 今天的风速预测
* weather.state.forecast.0  - 今天的天气描述
* value.direction.wind.forecast.0  - 今天的风向预测度数
* weather.direction.wind.forecast.0  - 今天的风向预测为文本
* value.pressure.forecast.0  - 今天的压力预测
* value.temperature.min.forecast.0  - 今天的最低温度预测
* value.temperature.max.forecast.0  - 今天的最高温度预测
* value.precipitation.forecast.0  - （类型：数量，单位：％）今天的降水机会预测
* value.precipitation.forecast.0  - （类型：数量，单位：mm）今天的降水量预测
* weather.title.forecast.0  - 明天的简短描述
* value.precipitation.day.forecast.0  - 白天降水量预测
* value.precipitation.night.forecast.0  - 夜间降水预测

* date.forecast.1  - 明天的日期
* weather.icon.forecast.1  - 明天图标
* weather.state.forecast.1  - 明天天气状况
* value.temperature.min.forecast.1
* value.temperature.max.forecast.1
* value.precipitation.forecast.1  - （类型：数量，单位：％）明天的降水机会预测
* value.precipitation.forecast.1  - （类型：数量，单位：mm）明天降水量预测
* value.direction.wind.forecast.1
* value.speed.wind.forecast.1
* value.pressure.forecast.1

##信息
* info.ip  - 设备的IP
* info.mac  - 设备的mac
* info.name  - 设备名称
* info.address  - 其他一些地址（例如KNX）
* info.port  -  tcp端口
* info.standby  - 如果设备处于待机模式，则为true
* info.status  - 设备状态
* info.display  - 设备显示屏上显示的信息
* date.start  - 字符串或数字
* date.end  - 字符串或数字

＃＃ 其他
*网址
* url.icon  -  icon（另外每个对象都可以有common.icon）
* url.cam  - 网络摄像头网址
* url.blank  - 在新窗口中打开URL
* url.same  - 在此窗口中打开URL
* url.audio  - 音频文件的URL
* text.phone  - 电话号码

* adapter.messagebox（common.type = object，common.write = true）用于向电子邮件，pushover和其他适配器发送消息
* adapter.wakeup（common.type = boolean，common.write = true）从挂起模式唤醒适配器