---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/objectsschema.md
title: 核心概念
hash: /+zjF1sxTW9nTd9/4ssdJVC89TA4xSYZjT8bNVA6QHo=
---
＃核心概念
ioBroker中有两种根本不同的数据类型。所谓的**状态**（`states`）和**对象**。

对象代表很少变化和更大的数据，如系统设备的元数据，配置和其他文件。每个对象都必须具有属性“类型”。有关可用的对象类型以及特定类型的对象需要哪些必需属性的更多信息，请参见下文。适配器模块为您提供了setObject，getObject，...等函数。

状态代表经常更改系统中的数据，例如f.e.如果灯打开或关闭，如果运动检测器检测到某些运动，客厅的温度或按下遥控器的按钮。与对象相反，状态可用于触发动作，状态可以创建历史数据。要使用状态，适配器模块中有几个函数，如setState，getState等。

对于每个州，还必须存在具有`type=state`的相应对象。

以下章节描述了数据库模式。

## ID
ID是一个字符串，最大长度为240字节，层次结构，级别由点分隔。

以下字符禁止在ID中使用：`[]*,;'"&#96;<>\\?`。

建议不要使用`^$()/`。

ID有不同的级别。每个级别由点确定。示例：`system.adapter.admin.0`

 - `system`  - 是系统对象的命名空间
 - `adapter`  - 适配器配置的命名空间
 - `admin`  - 适配器名称
 - `0`  - 适配器实例

或者其他示例`hm-rpc.1.ABC110022.2.VALUE`：

 - `hm-rpc`  - 是适配器的名称
 - `1`  - 适配器实例
 - `ABC110022`  - 设备地址
 - `2`  - 频道名称
 - `VALUE`  - 州名

##命名空间
*`system。 - 系统对象和状态
*`system.host。 - 控制器进程
*`system.config。 - 系统设置，如默认语言
*`system.meta。 - 系统元数据
*`system.user。 - 用户
*`system.group。 - 组
*`system.adapter。<adapter-name>` - 适配器的默认配置
*`<adapter-name> .`  - 特定适配器的对象。
*`<adapter-name> .meta。 - 此适配器的所有实例使用的公共元数据
*`<adapter-name>。<instance-number> .`  - 适配器实例名称空间
*`enum。 - 枚举
*`历史。 - 历史数据
*`scripts。 - 脚本引擎脚本
*`scripts.js。 -  javascript脚本引擎脚本
*`scripts.py。 -  python脚本引擎脚本（未来）

### Namespace system.config。
```
{
    _id:   id,
    type: 'config',
    common: {
        language:     'en',         // Default language for adapters. Adapters can use different values.
        tempUnit:     '°C',         // Default temperature units.
        currency:     '€',          // Default currency sign.
        dateFormat:   'DD.MM.YYYY'  // Default date format.
        isFloatComma: true,         // Default float divider ('.' - false, ',' - true)
        "activeRepo": "online1",    // active repository
        "listRepo": {               // list of possible repositories
            "default": "conf/sources-dist.json",
            "online1": "https://raw.githubusercontent.com/ioBroker/ioBroker.nodejs/master/conf/sources-dist.json"
        }
    }
}
```

### Namespace system.host。＆lt; hostname＆gt;
```
{
    _id:   id,
    type: 'host',
    common: {
        name:       id,
        process:    title,           // iobroker.ctrl
        version:    version,         // Vx.xx.xx
        platform:   'javascript/Node.js',
        cmd:        process.argv[0] + ' ' + process.execArgv.join(' ') + ' ' + process.argv.slice(1).join(' '),
        hostname:   hostname,
        address:    ipArr,
        defaultIP:  ???
    },
    native: {
        process: {
            title:      process.title,
            pid:        process.pid,
            versions:   process.versions,
            env:        process.env
        },
        os: {
            hostname:   hostname,
            type:       os.type(),
            platform:   os.platform(),
            arch:       os.arch(),
            release:    os.release(),
            uptime:     os.uptime(),
            endianness: os.endianness(),
            tmpdir:     os.tmpdir()
        },
        hardware: {
            cpus:       os.cpus(),
            totalmem:   os.totalmem(),
            networkInterfaces: os.networkInterfaces()
        }
    }
};
```

<a id="states"></a>

＃＃ 状态
getState方法和stateChange事件传递一个除了expire之外的所有属性的对象

对于`setState`方法，除了`val`之外的所有内容都是可选的，`from`由`setState`方法自动设置。 `ack`默认为false，`ts`和`lc`按预期设置

getState / stateChange / setState对象的属性：

*`val`  - 实际值 - 可以是任何类型的JSON-“可编码”
*`ack`  - 一个布尔标志，指示目标系统是否已确认该值
*`ts`  - 指示状态的最后更新的unix时间戳（以毫秒为单位）
*`lc`  - 一个unix时间戳，指示状态实际值的最后一次更改（以毫秒为单位）
*`from`  - 执行`setState`的适配器实例
*`user`  - 用户名，用于设置值
*`expire`  - 一个整数值，可用于设置在给定秒数后过期的状态。可以与`setValue`一起使用。值过期后，它将从redisDB中消失。
*`c`  - 对这种状态变化的评论。
*`q`  - 质量。具有以下状态的数字：

```
  0x00 - 00000000 - good (can be undefined or null)
  0x01 - 00000001 - general bad, general problem
  0x02 - 00000010 - no connection problem

  0x10 - 00010000 - substitute value from controller
  0x40 - 00100000 - substitute value from device or instance
  0x80 - 01000000 - substitute value from sensor

  0x11 - 01000001 - general problem by instance
  0x41 - 01000001 - general problem by device
  0x81 - 10000001 - general problem by sensor

  0x12 - 00010010 - instance not connected
  0x42 - 01000010 - device not connected
  0x82 - 10000010 - sensor not connected

  0x44 - 01000100 - device reports error
  0x84 - 10000100 - sensor reports error
```

每个*状态*必须由包含状态的元数据的类型状态的对象表示。见下文。

##对象
###强制属性
以下属性必须存在于每个对象中：

*`_id`
*`type`  - 请参阅下面的可能值
*`common`  - 包含ioBroker特定抽象属性的对象
*`native`  - 包含目标系统的全等属性的对象

###可选属性
*`common.name`  - 对象的名称（可选，但严格建议填写）

###树结构
树结构由名称自动组装。例如。 ```system.adapter.0.admin```是`system.adapter.0.admin.uptime`的父母。将此名称约定与点“。”一起使用，作为级别的分隔符。

###对象类型
*`state`  -  parent应该是channel，device，instance或host类型
*`channel`  - 将一个或多个状态分组的对象。家长应该是设备。
*`device`  - 将一个或多个通道或状态分组的对象。除了适配器实例命
*`enum`  - 持有一个common.members数组的对象，指向状态，通道，设备或文件。枚举可以有一个父枚举（树形结构可能）
*`host`  - 运行控制器进程的主机
*`adapter`  - 适配器的默认配置。 presence也表示适配器已成功安装。 （建议：应该有一个属性，包含安装它的主机数组）
*`instance`  - 适配器的实例。父必须是类型适配器
*`meta`  - 很少改变适配器或其实例所需的元信息
*`config`  - 配置
*`脚本`
*`用户`
*`group`

####特定对象类型的属性
#####状态
属性：

*`common.type`（可选 - （默认为mixed == any type）（可能的值：number，string，boolean，array，object，mixed，file）
*`common.min`（可选）
*`common.max`（可选）
*`common.unit`（可选）
*`common.def`（可选 - 默认值）
*`common.defAck`（可选 - 如果设置了common.def，则此值用作ack标志，js-controller 2.0.0+）
*`common.desc`（可选，字符串）
*`common.read`（boolean，mandatory） - 如果state是可读的，则为true
*`common.write`（boolean，mandatory） - 如果state是可写的，则为true
*`common.role`（字符串，必填） - 状态的作用（在用户界面中用于指示选择哪个小部件，见下文）
*`common.states`（可选）属性类型为number，其中包含可能状态的对象{'value'：'valueName'，'value2'：'valueName2'，0：'OFF'，1：'ON'}
*`common.workingID`（string，optional） - 如果此状态具有辅助状态WORKING。如果第一部分与实际部分相同，则必须写入全名或最后部分。用于HM.LEVEL，通常具有值“工作”

#####State`common.history`
历史记录功能需要历史记录适配器或历史记录类型的任何其他存储适

当达到最大值时，fifo长度减少到min。设置为null或保留undefined以使用默认值

有关传输列表，请参阅历史记录适配器README

*`common.history`（可选）
*`common.history。<HISTORY-INSTANCE> .changesOnly`（可选，布尔值，如果只记录了真值，则记录）
*`common.history。<HISTORY-INSTANCE> .enabled`（boolean）

#####State`common.role`
*`common.role`（表示如何在用户界面中表示此状态）

[可能的价值观](stateroles.md)

####频道
#####频道`common.role`（可选）
建议：channel-objects common.role应该/可能意味着一组强制和/或可选的状态子对象

可能的值：

*`info`  - 货币或股票汇率，燃料价格，邮箱插入等等
*`日历` -
*`forecast`  - 天气预报

*`媒体 - 共同媒体频道
*`media.music`  - 媒体播放器，如SONOS，YAMAHA等
*`media.tv`  - 电视
*`media.tts`  - 文本到语音

*`thermo`  - 监控或控制温度，湿度等
*`thermo.heat`
*`thermo.cool`

*`blind`  - 窗帘控制

*`light`
*`light.dimmer`  - 调光器
*`light.switch`  - 灯开关。
*`light.color`  - 具有变色能力的灯光控制
*`light.color.rgb`  - 设置RGB颜色
*`light.color.rgbw`  - 以RGBW设置颜色
*`light.color.hsl`  - 以色相/饱和度/亮度设置颜色（色调颜色 -  LivingColors ......）
*`light.color.hslct`  - 设置色相/饱和度/亮度或色温（色调扩展色光）
*`light.color.ct`  - 色温K.

*`switch`  - 一些通用开关

*`传感器` - 例如门窗接触器，漏水传感器，火灾传感器
*`sensor.door`  - 打开，关闭
*`sensor.door.lock`  - 打开，关闭，锁定
*`sensor.window`  - 打开，关闭
*`sensor.window.3`  - 打开，倾斜，关闭
*`sensor.water`  -  true（警报），false（无警报）
*`sensor.fire`  -  true（警报），false（无警报）
*`sensor.CO2`  - 真（警报），假（无警报）

*

*`闹钟` - 一些警报

*`phone`  -  fritz box，speedport等

*`button`  - 像墙壁开关或电视遥控器，每个按钮都是.play，.stop，.pause等状态
*`remote`  - 具有状态的电视或其他遥控器是具有按下的值的字符串，例如“播放”，“停止”，“暂停”

*`meta`  - 有关设备的信息
*`meta.version`  - 设备版本
*`meta.config`  - 来自设备的配置
* ...

####频道说明
~~属性的名称可以由适配器自由定义，除了用** bold ** font。~~编写的属性

“W” -  common.write = true

“M” - 强制性

#####每个频道/设备的可选状态
```javascript
// state-working (optional)
{
   "_id": "adapter.instance.channelName.stateName-working", // e.g. "hm-rpc.0.JEQ0205612:1.WORKING"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.working"     // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
,
// state-direction (optional). The state can have following states: "up"/"down"/""
{
   "_id": "adapter.instance.channelName.stateName-direction", // e.g. "hm-rpc.0.JEQ0205612:1.DIRECTION"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   "",                     // optional,  default ""
       "type":  "string",               // optional,  default "string"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "role":  "direction"             // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
,
// state-maintenance (optional).
{
   "_id": "adapter.instance.channelName.stateName-maintenance", //e.g. "hm-rpc.0.JEQ0205612:1.MAINTENANCE"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.maintenance" // mandatory
       "desc":  "Problem description"   // optional,  default undefined
   }
}
,
// state-maintenance-unreach (optional).
{
   "_id": "adapter.instance.channelName.stateName-maintenance-unreach", //e.g. "hm-rpc.0.JEQ0205612:0.UNREACH"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.maintenance.unreach" // mandatory
       "desc":  "Device unreachable"    // optional,  default 'Device unreachable'
   }
}
```

#####`light.switch` - 属性描述
| **名** |** common.role **|** M **|** W **|** common.type **|** 明** | ------------- |：-------------------------- |：-----：| -----：| ----------------- | ---

|州|开关| X | X |布尔值|
|描述| text.description | | | |
|嗯| indicator.maintenance.mmm | | | | mmm = lowbat或者reach或者其他什么 |

```
// SWITCH CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205614:1"
   "type": "channel",
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
       "role":  "light.switch"          // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// SWITCH STATES
{
   "_id": "adapter.instance.channelName.state-switch", // e.g. "hm-rpc.0.JEQ0205614:1.STATE"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": true,                   // mandatory, default true
       "role":  "switch"                // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
// see "Optional states for every channel/device" for description of optional states
//            "adapter.instance.channelName.state-maintenance"          // optional
//            "adapter.instance.channelName.state-maintenance-unreach"  // optional

```

#####`light.dimmer` - 属性描述
```
// DIMMER CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205612:1"
   "type": "channel",
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
       "role":  "light.dimmer"          // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// DIMMER STATES
{
   "_id": "adapter.instance.channelName.state-level", // e.g. "hm-rpc.0.JEQ0205612:1.LEVEL"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   0,                      // optional,  default 0
       "type":  "number",               // optional,  default "number"
       "read":  true,                   // mandatory, default true
       "write": true,                   // mandatory, default true
       "min":   0,                      // optional,  default 0
       "max":   100,                    // optional,  default 100
       "unit":  "%",                    // optional,  default %
       "role":  "level.dimmer"          // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
// see "Optional states for every channel/device" for description of optional states
//            "adapter.instance.channelName.state-working",             // optional
//            "adapter.instance.channelName.state-direction",           // optional
//            "adapter.instance.channelName.state-maintenance"          // optional
//            "adapter.instance.channelName.state-maintenance-unreach"  // optional

```

#####`blind` - 属性描述
```
// BLIND CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205615:1"
   "type": "channel",
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
      "role":  "blind"                 // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// BLIND STATES
// Important: 0% - blind is fully closed, 100% blind is fully opened
{
   "_id": "adapter.instance.channelName.state-level", // e.g. "hm-rpc.0.JEQ0205615:1.LEVEL"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   0,                      // optional,  default 0
       "type":  "number",               // optional,  default "number"
       "read":  true,                   // mandatory, default true
       "write": true,                   // mandatory, default true
       "min":   0,                      // optional,  default 0
       "max":   100,                    // optional,  default 100
       "unit":  "%",                    // optional,  default %
       "role":  "level.blind"           // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
```

#####`phone` - 属性描述
| **名** |** common.role **|** M **|** W **|** common.type **|** 明** | `ringing_number`| `text.phone_number`| | | `string`|

| `ringing`| `indicator`| | | `boolean`|
| `响'| `指标`| | | `boolean` |

...

####设备
#### Enum
*`common.members`  - （可选）枚举成员ID数组

#### Meta
ID

 **＆lt; adapter-name＆gt;。＆lt; instance-number＆gt; .meta。＆lt; meta-name＆gt;*
 **＆lt; adapter-name＆gt; .meta。＆lt; meta-name＆gt;*
 *system。* meta。＆lt; meta-name＆gt;*

####适配器
id`system.adapter.<adapter.name>`

*注意：*所有标志都是可选的，除非特殊标记为**强制**。

*`common.name`  -  **强制**没有“ioBroker”的适配器名称。
*`common.title`  - （不建议使用）更长的适配器名称，以显示在admin中
*`common.titleLang`  -  **强制**在所有支持的语言中使用较长的适配器名称，例如{en：'Adapter'，de：'adapter'，ru：'Драйвер'}
*`common.mode`  -  **强制**可能的值见下文
*`common.version`  -  **强制**可用版本
*`common.installedVersion`  -  **强制**安装版
*`common.enabled`  -  **强制** [true / false]值应为false，因此默认情况下禁用新实例
*`common.platform`  -  **强制**可能的值：Javascript / Node.js，更多来了
*`common.webservers`  - 应该从适配器www文件夹提供内容的Web服务器实例数组
*`common.noRepository`  -  [true / false]如果适配器随初始安装一起提供或具有自己的存储库
*`common.messagebox`  - 如果支持消息框，则为true。如果是，则将创建对象system.adapter。＆lt; adapter.name＆gt;＆lt; adapter.instance＆gt.messagebox以将消息发送到适配器（用于电子邮件，pushover，...;
*`common.subscribe`  - 自动订阅的变量名称
*`common.subscribable`  - 必须使用sendTo订阅此适配器的变量才能启用更新
*`common.wakeup`  -
*`common.availableModes`  - 如果可能有多个模式，则为common.mode的值
*`common.localLink`  - 指向此适配器的Web服务的链接。例如http：// localhost：5984 / _utils来自管理员的蒲团
*`common.logTransporter`  - 如果这个适配器从其他主机和适配器接收日志（例如在某个地方敲击它们）
*`common.nondeletable`  -  [true / false]此适配器无法删除或更新。它将与控制器一起更新。
*`common.icon`  - 本地图标的名称（应位于子目录“admin”中）
*`common.extIcon`  - 链接到未安装适配器的外部图标。通常在github上。
*`common.logLevel`  - 调试，信息，警告或错误
*`common.supportStopInstance`- [true / false]如果适配器支持信号stopInstance（需要** messagebox **）。信号将在停止前发送到适配器。 （如果SIGTERM出现问题，则使用）
*`common.allowInit`  -  [true / false]允许“预定”适配器被调用“不在时间表中”，如果设置已更改或适配器已启动。
*`common.onlyWWW`  -  [true / false]对控制器说，那个适配器只有html文件，没有main.js，就像人力车一样
*`common.singleton`  - 适配器只能在整个系统中安装一次
*`common.singletonHost`  - 适配器只能在一台主机上安装一次
*`common.allowInit`  -  [true / false]允许在配置更改后按计划适配器启动一次，然后按计划启动
*`common.config.width`  - 配置对话框的默认宽度
*`common.config.height`  - 配置对话框的默认高度
*`common.config.minWidth`  - 配置对话框的最小宽度
*`common.config.minHeight`  - 配置对话框的最小高度
*`common.os`  - 支持的操作系统的字符串或数组，例如[“linux”，“darwin”]
*`common.stopBeforeUpdate`  -  [true / false]如果必须在更新前停止适配器
*`common.adminTab.singleton`  -  [true / false]如果适配器有管理员的TAB。仅显示所有实例的一个TAB。
*`common.adminTab.name`  - 管理员中的TAB名称
*`common.adminTab.link`  -  TAB中iframe的链接。您可以使用如下替换参数：“http：//％ip％：％port％”。 IP将替换为主机IP。 “port”将从native.port中提取。
*`common.adminTab.ignoreConfigUpdate`  - 如果配置更改，则不更新配置TAB（在TAB中启用配置设置）
*`common.restartAdapters`  - 在安装此适配器后必须重新启动的适配器名称的数组，例如[ “可见”]
*`common.preserveSettings`  - 具有实例共同属性名称的字符串（或数组），不会被删除。例如。 “history”，所以通过setState（'system.adapter.mqtt.0“，{..}），即使新对象没有这个字段，也不会删除字段common.history。要删除属性，必须明确删除完成```common：{history：null}```。
*`common.noConfig`  -  [true / false]不显示配置对话框
*`common.stopTimeout`  - 等待的超时时间，直到适配器关闭。默认500毫秒。
*`common.unsafePerm`  -  [true / false]如果包必须使用“npm --unsafe-perm”参数安装
*`common.supportCustoms`  -  [true / false]如果适配器支持每个州的设置。它必须在admin中有custom.html文件。样本可以在ioBroker.history中找到
*`common.getHistory`  -  [true / false]如果适配器支持getHistory消息
*`common.blockly`  -  [true / false]如果适配器具有blockly的自定义块。 （需要admin / blockly.js）
*`common.webExtendable`  -  [true / false]如果此适配器中的Web服务器可以使用代理，simple-api等插件/扩展进行扩展
*`common.webExtension`  - 连接Web扩展的相对文件名。例如。在simple-api“lib / simpleapi.js”中，相对于适配器根目录。另外，native.webInstance需要说明此扩展名的位置。空意味着，它必须作为自己的Web服务运行。 “*”表示每个Web服务器都必须包含它。
*`common.welcomeScreen`  - 页面数组，应显示在“web”index.html页面上。 [“vis / edit.html”，“vis / index.html”]或[{“link”：“vis / edit.html”，“name”：“Vis editor”，“img”：“vis / img / edit.png“，”color“：”blue“}，”vis / index.html“]
*`common.unchanged`  - （系统）请不要使用此标志。它是通知系统的标志，必须在admin中显示配置对话框。
*`common.serviceStates`  -  [true / false或path]如果适配器可以提供其他状态。如果是，将调用路径适配器/ lib / states.js并提供以下参数函数（对象，状态，实例，配置，回调）。该函数必须提供像数组一样的值数组（错误，结果）{result = [{id：'id1'，val：1}，{id：'id2'，val：2}]}
*`common.nogit`  - 如果为true，则无法直接从github安装
*`common.materialize`  - 如果适配器支持> admin3（实现样式）
*`common.materializeTab`  - 如果适配器支持> admin3 for tab（实体化样式）
*`common.dataFolder`  - 相对于适配器存储数据的iobroker-data的文件夹。此文件夹将自动备份和还原。您可以在其中使用变量'％INSTANCE％'。
*`common.webPreSettings`  -  webServer适配器必须包含在info.js中的参数列表。 （示例材料）
*`common.apt-get`  - 这个适配器所需的debian软件包列表（当然只有debian）
*`common.eraseOnUpload`  - 在上传之前删除目录中的所有先前数据
*`common.webByVersion`  - 在Web适配器中显示版本作为前缀（通常是 -  ip：port / material，webByVersion  -  ip：port / 1.2.3 / material）
*`common.noIntro`  - 永远不会在管理员的Intro / Overview屏幕上显示此适配器的实例（如图标，小部件）
*`common.expert`  - 仅在管理员的专家模式下显示此对象
*`common.compact`  - 告诉控制器，如果需要，可以在同一进程中启动此适配器

#### Instance
id *system.adapter。＆lt; adapter.name＆gt;。＆lt; instance-number＆gt;*

*`common.host` - （必需）主机应在哪里启动适配器 - object *system.host。＆lt; host＆gt;* 须存在
*`common.enabled`  - （必填）
*`common.mode`  - （强制）可能的值见下文

##### Adapter / instance common.mode
*`none`  - 此适配器无法启动进程
*`daemon`  - 始终运行进程（如果进程退出，将重新启动）
*`subscribe`  - 在state * system.adapter。＆lt; adapter-name＆gt;。＆lt; instance-number＆gt; .alive *变为* true *时启动。当* .alive *更改为* false *时被杀死，并且如果进程退出则将* .alive *设置为* false *（当进程退出时**将不会重新启动）
*`schedule` - 由* system.adapter中的时间表启动。＆lt; adapter-name＆gt;。＆lt; instance-number＆gt; .schedule *- 通过重新安排新状态对* .schedule* 更改作出反应
*`once`  - 每次更改system.adapter.yyy.x对象时都会启动此适配器。终止后不会重新启动。

#### Host
id`system.host.<host>`

*`common.name`  -  f.e. `system.host.banana`
*`common.process`
*`common.version`
*`common.platform`
*`common.cmd`
*`common.hostname`  -  f.e. `banana`
*`common.address`  -  ip地址字符串数组

#### Config
####脚本
*`common.platform`  - （强制）可能的值`Javascript / Node.js`（更多内容）
*`common.enabled`  - （强制）是脚本激活与否
*`common.source`  - （必填）脚本源
*`common.engine`  - （可选）*应该运行此脚本的脚本引擎*实例（f.e.'javascript.0'） - 如果省略引擎则自动选中

#### User
*`common.name`  - （必填）用户名（区分大小写）
*`common.password`  - （强制）MD5哈希密码

#### Group
*`common.name`  - （必填）组名
*`common.members`  - （强制）用户对象ID数组
*`common.desc`  - （可选）组目的描述