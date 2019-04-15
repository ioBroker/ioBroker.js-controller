---
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/stateroles.md
title: "状态角色"
---

# 状态角色

## 通用角色

* state  - 最通用的角色。如果您不知道状态属于哪个角色，请使用此角色。
* text  - 文本角色。（common.type = string）
* text.url  - 网址角色，存储一个URL。（common.type = string）
* html  - 网页角色（common.type = string）
* json  - JSON文本角色（common.type = string）
* list  - 列表角色（common.type = array）
* date  - 日期角色，可被`new Data(date)`解析。（common.type = string）
* date  - 日期角色，是UNIX时间*1000。（common.type = number）

## 传感器角色（布尔值，只读）

所有传感器角色都遵循这两条定义：*common.type = boolean，common.write = false*。

* sensor.window  - 窗口打开（true）或关闭（false）
* sensor.door  - 门打开（真实）或关闭（假）
* sensor.alarm  - 一些常见的警报
* sensor.alarm.flood  - 漏水
* sensor.alarm.fire  - 火灾传感器
* sensor.alarm.secure  - 门打开，窗口打开或警报期间检测到运动。
* sensor.alarm.power  - 电池电量将用尽（电量为0）
* sensor.light  - 灯打开（true）或关闭（false）
* sensor.lock  - 锁的实际位置
* sensor.motion  - 运动传感器
* sensor.rain  - 检测到雨水
* sensor.noise  - 检测到噪音

## 按钮角色（布尔值，只写）

所有按钮角色都遵循这两条定义：*common.type = boolean，common.write = true，common.read = false*。

* button  - 通用按钮
* button.long
* button.stop  - 例如罗洛停止
* button.start
* button.open.door
* button.open.window
* button.mode.*
* button.mode.auto
* button.mode.manual
* button.mode.silent

## 数值角色（数字，只读）

所有数值角色都遵循这两条定义：*common.type = number，common.write = false*。

* value  - 通用数值
* value.window  - 窗户状态数值，对应关系如下。（common.states = {“0”：“CLOSED”，“1”：“TILTED”，“2”：“OPEN”}）。
* value.temperature  - 温度数值。（common.unit = '°C' or '°F' or 'K'）
* value.humidity  - 湿度数值。
* value.brightness  - 亮度数值（common.unit = lux）
* value.min
* value.max
* value.default
* value.battery  - 电池电量
* value.valve  - 阀位
* value.time  - `Date()`对象的`getTime()`值
* value.interval  - 以秒为单位的间隔，值可以是小数。（common.unit ='sec'）
* ~~ value.date  - 从2015.01.01开始的时间。（common.type = string）~~
* ~~ value.datetime  - 系统格式的日期和时间（common.type = string）~~
* value.gps.longitude  - gps经度
* value.gps.latitude  - gps纬度
* value.gps.elevation  - gps海拔
* value.gps  - 经度和纬度组合在一起，比如'5.56; 43.45'
* value.power.consumption  - 耗电值（common.unit = Wh or KWh）
* value.direction  - 方向值（common.type = number ~~ or string ~~，表示上/下，左/右，4路开关，风向...）
* value.curtain  - 窗帘的实际位置
* value.blind  - 百叶窗的实际位置
* value.tilt  - 实际倾斜位置
* value.lock  - 锁定的实际位置
* value.speed  - 风速
* value.pressure  - 大气压值（common.unit = mbar）
* value.distance
* value.distance.visibility
* value.severity
* value.warning
* value.sun.elevation  - 以°为单位的太阳高度
* value.sun.azimuth  - 以°为单位的太阳方位角
* value.voltage  - 以伏特为单位的电压。（common.unit = V）
* value.current  - 以安培为单位的电流。（common.unit = A）

## 指示角色（布尔值，只读）

所有指示角色都遵循这两条定义：*common.type = boolean，common.write = false*

*指示角色*与*传感器角色*的区别在于*指示角色*将显示为小图标。*传感器角色*将显示真正的值。

* indicator  - 通用指示状态
* indicator.working  - 表示目标系统正在执行某些操作，如百叶窗或锁定开启。
* indicator.reachable  - 如果设备在线。
* indicator.connected  - 此角色仅用于实例。对设备请使用。indicator.reachable
* indicator.maintenance  - 表示系统出现了异常。比如电池电量耗尽或类似的状态。
* indicator.maintenance.lowbat
* indicator.maintenance.unreach
* indicator.maintenance.alarm
* indicator.lowbat  - 为真时表示电量不足
* indicator.alarm  - 与indicator.maintenance.alarm相同
* indicator.alarm.fire  - 检测到火灾
* indicator.alarm.flood  - 检测到漏水
* indicator.alarm.secure  - 门或窗口打开

## 级别角色（数字，可读写）

**级别角色**可允许用户控制或设置一些数字值：*common.type = number，common.write = true*

* level  - 通用级别值
* level.co2  - 0-100％的二氧化碳含量
* level.dimmer  - 亮度值
* level.blind  - 百叶窗位置
* level.temperature  - 设定所需温度
* level.valve  - 阀门位置的设定点
* level.color.red
* level.color.green
* level.color.blue
* level.color.white  -  rgbW
* level.color.hue  - 用0-360代表颜色值。0 = 红色，120 = 绿色，240 = 蓝色，360 = 红色（循环）
* level.color.saturation
* level.color.rgb  - 遵循'#rrggbb'这样的十六进制格式的颜色值
* level.color.luminance
* level.color.temperature  - K°为单位的色温值。2200暖白色，6500°冷白色
* level.timer
* level.timer.sleep  - 睡眠定时器。 0表示关闭定时器，以分钟为单位。
* level.volume  - 音量值（min = 0，max = 100）
* level.volume.group  - 设备组音量值（min = 0，max = 100）
* level.curtain  - 设置窗帘位置
* level.tilt  - 设置百叶窗的倾斜位置

## 开关角色（布尔值，读写）

可以设置布尔状态的设备状态（true = ON，false = OFF：*common.type = boolean，common.write = true*

* switch  - 通用开关值
* switch.lock  - 设置锁状态（true = 打开锁，false = 关闭所）
* switch.lock.door  - 门锁
* switch.lock.window  - 窗口锁
* switch.boost  - 设置恒温器的升压模式
* switch.light
* switch.comfort  - 舒适模式
* switch.enable
* switch.power  - 电源开/关
* switch.mode.*
* switch.mode.auto  - 开启/关闭自动模式
* switch.mode.manual  - 手动模式开/关
* switch.mode.silent  - 静音模式开/关
* switch.mode.moonlight  - 开启/关闭月光模式
* switch.mode.color  - 开启/关闭颜色模式

## 多媒体角色

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
* media.state  - ['play'，'stop'，'pause']或[0 - pause，1 - play，2 - stop]或[true - playing / false - pause]
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
* media.season  - （common.type = string）电视剧季号
* media.episode  - （common.type = string）剧集编号
* media.mute.group  - （common.type = boolean）设备组静音
* media.tts  - 文本到语音
* media.bitrate  - kbps
* media.genre  - 流派歌曲
* media.date  - 年歌
* media.track  - （common.type = string）当前播放曲目名
* media.playid  - 媒体播放器名
* media.add  - 添加当前到播放列表
* media.clear  - 清除当前播放列表（只写）
* media.playlist  - 获取播放列表
* media.url  - 要播放的网址或当前网址
* media.url.announcement  - 播放公告的网址
* media.jump  - 要在播放列表中跳转的项目数（可以为负数）
* media.content  - 正在播放的媒体类型，如音频/ mp3
* media.link  - 使用当前文件的状态
* media.input  - 输入的数字或字符串（AUX，AV，TV，SAT，...）
* level.bass  - 低音等级
* level.treble  - 高音等级
* switch.power.zone  - 电源区
* media.browser  - 汇总描述多媒体信息的json数组

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

## 天气角色

* value.temperature  - 实际温度
* value.temperature.windchill  - 实际风寒
* value.temperature.dewpoint  - 实际露点
* value.temperature.feelslike  - 实际体表温度
* value.temperature.min  - 24小内的最低温度
* value.temperature.max  - 24小内的最高温度
* value.humidity  - 当前湿度
* value.humidity.min  - 24小内的最低湿度
* value.humidity.max  - 24小内的最高湿度
* value.speed.wind  - 实际或平均风速
* value.speed.max.wind  - 24小内的最大风速
* value.speed.min.wind  - 24小内的最小风速
* value.speed.wind.gust  - 实际阵风速度
* value.direction.wind  - 以度为单位的实际风向
* value.direction.max.wind  - 24小内以度为单位的最大风向
* value.direction.min.wind  - 24小内以度为单位的最小风向
* weather.direction.wind  - 以文本形式显示的风向
* date  - 上次阅读信息的实际日期或日期
* date.sunrise  - 今天的日出
* date.sunset  - 今天的日落
* dayofweek  - 以文本形式保存的星期几
* location  - 位置的文字说明（例如地址）
* weather.icon  - 现在的实际状态图标URL
* weather.icon.wind  - 现在的实际风图标网址
* weather.icon.name  - 现在的实际状态图标名称
* weather.state  - 实际天气描述
* value.precipitation  - （类型：数量，单位：mm）最近24小时降雨/降雪的降雨量
* value.precipitation.hour  - 过去一小时的实际降水量
* value.precipitation.today  - 今天的实际降水量（至0:00）
* value.radiation  - 实际太阳辐射水平
* value.uv  - 实际UV水平
* value.clouds  - 多云情况。 0％ - 没有云，100％ - 很多云。
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
* weather.title  - 对天气简短描述
* weather.title.short  - 一个字描述天气
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

## 信息角色

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

## 其他角色

* url
* url.icon  -  icon（另外每个对象都可以有common.icon）
* url.cam  - 网络摄像头网址
* url.blank  - 在新窗口中打开URL
* url.same  - 在此窗口中打开URL
* url.audio  - 音频文件的URL
* text.phone  - 电话号码
* adapter.messagebox  - 用于向email，pushover和其他适配器发送的消息。（common.type = object，common.write = true）
* adapter.wakeup  - 唤醒适配器（common.type = boolean，common.write = true）
