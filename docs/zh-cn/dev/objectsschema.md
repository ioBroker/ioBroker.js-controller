---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/objectsschema.md
title: 核心理念
hash: H1OWBCqZ0FktDkD9NSYrsqPNsrkwmTHyq90eiAfh4pw=
---
＃核心概念
ioBroker中有两种根本不同的数据类型。所谓的“状态”（`states`）和“对象” **。

对象代表很少更改的较大数据，例如系统设备的元数据，配置和其他文件。每个对象都必须具有属性“类型”。有关更多信息，请参见下面的信息，特定类型的对象需要哪些可用的对象类型以及哪些强制属性。适配器模块为您提供了诸如setObject，getObject等功能。

状态代表系统中经常变化的数据，例如f。如果指示灯亮起或熄灭，运动检测器检测到某种运动，起居室的温度或按了遥控器的按钮。与对象相反，状态可以用来触发动作，状态可以创建历史数据。要使用状态，适配器模块中有几个功能，例如setState，getState等。

对于每个状态，还必须存在一个带有`type=state`的对应对象。

以下各章介绍了数据库架构。

## ID
ID是一个字符串，最大长度为240字节，层次结构，以点分隔。

ID中禁止使用以下字符：`[]*,;'"&#96;<>\\?`。

不建议也使用`^$()/`。

ID具有不同的级别。每个级别由点确定。示例：`system.adapter.admin.0`

-`system`-是系统对象的名称空间
-`adapter`-适配器配置的名称空间
-`admin`-适配器名称
-0-适配器实例

或其他示例`hm-rpc.1.ABC110022.2.VALUE`：

-`hm-rpc`-是适配器的名称
-1-适配器实例
-`ABC110022`-设备地址
-`2`-频道名称
-`VALUE`-状态名称

##命名空间
*`system.`-系统对象和状态
*`system.host.`-控制器进程
*`system.config.`-系统设置，如默认语言
*`system.meta.`-系统元数据
*`system.user.`-用户
*`system.group.`-组
*`system.adapter。<适配器名称>`-适配器的默认配置
*`<适配器名称> .`-特定适配器的对象。
*`<适配器名称> .meta.`-此适配器的所有实例使用的公共元数据
*`<适配器名称>。<实例号> .`-适配器实例名称空间
*枚举。-枚举
*`history.`-历史数据
*`scripts.`-脚本引擎脚本
*`scripts.js.`-javascript脚本引擎脚本
*`scripts.py.`-python脚本引擎脚本（未来）

###命名空间system.config。
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

###命名空间system.host。＆lt; hostname＆gt;
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
getState方法和stateChange事件传递具有除过期以外的所有属性的对象

对于`setState`方法，除`val`之外的所有内容都是可选的，`from`由`setState`方法自动设置。 `ack`默认为false，按预期设置`ts`和`lc`

getState / stateChange / setState对象的属性：

*`val`-实际值-可以是JSON-“可编码”的任何类型
*`ack`-一个布尔型标志，指示目标系统是否已确认该值
*`ts`-指示状态的最后更新的unix时间戳（以毫秒为单位）
*`lc`-Unix时间戳，指示状态的实际值的最后一次更改（以毫秒为单位）
*`from`-完成`setState`的适配器实例
*`user`-用户名，用于设置值
*`expire`-一个整数值，可用于设置在给定秒数后到期的状态。可以与`setValue`一起使用。该值过期后，它将从redisDB中消失。
*`c`-此状态更改的注释。
*`q`-质量。具有以下状态的编号：

```
  0x00 - 00000000 - good (can be undefined or null)
  0x01 - 00000001 - general bad, general problem
  0x02 - 00000010 - no connection problem

  0x10 - 00010000 - substitute value from controller
  0x20 - 00100000 - substitute initial value
  0x40 - 01000000 - substitute value from device or instance
  0x80 - 10000000 - substitute value from sensor

  0x11 - 01000001 - general problem by instance
  0x41 - 01000001 - general problem by device
  0x81 - 10000001 - general problem by sensor

  0x12 - 00010010 - instance not connected
  0x42 - 01000010 - device not connected
  0x82 - 10000010 - sensor not connected

  0x44 - 01000100 - device reports error
  0x84 - 10000100 - sensor reports error
```

每个* state *必须由state类型的对象表示，该对象包含该状态的元数据。见下文。

##对象
###强制属性
每个对象中必须存在以下属性：

*`_id`
*`type`-参见下面的可能值
*`common`-包含ioBroker特定抽象属性的对象
*`native`-包含目标系统一致属性的对象

###可选属性
*`common.name`-对象的名称（可选，但严格建议填写）

###树结构
树结构是按名称自动组装的。例如。 ```system.adapter.0.admin```是`system.adapter.0.admin.uptime`的父级。将此名称约定与点“。”一起用作级别分隔符。

###对象类型
*`state`-父级应该是通道，设备，实例或主机的类型
*`channel`-反对组织一个或多个状态。父母应该是设备。
*`device`-阻止对一个或多个通道或状态进行分组。除适配器实例名称空间外，不应有任何父项。
*`enum`-持有共同点数组的对象。成员指向状态，通道，设备或文件。枚举可以有一个父枚举（可能是树结构）
*`host`-运行控制器进程的主机
*`adapter`-适配器的默认配置。存在状态也表示适配器已成功安装。 （建议：应具有一个属性，其中包含安装它的主机的数组）
*`instance`-适配器的实例。父级必须是适配器类型
*`meta`-很少更改适配器或其实例所需的元信息
*`config`-配置
*`script`-脚本
*`user`-用户
*`group`-组
*`图表`-图表
*`folder`-一堆设备或其他东西。

####特定对象类型的属性
#####状态
属性：

*`common.type`（可选-（默认为blend ==任何类型）（可能的值：数字，字符串，布尔值，数组，对象，混合对象，文件）。作为例外，类型为meta的对象可以具有common .type = meta.user`或`meta.folder`
*`common.min`（可选）
*`common.max`（可选）
*`common.step`（可选）-增加/减少间隔。例如。调温器为0.5
*`common.unit`（可选）
*`common.def`（可选-默认值）
*`common.defAck`（可选-如果设置了common.def，则此值用作ack标志，js-controller 2.0.0+）
*`common.desc`（可选，字符串或对象）-描述，用于多语言描述的对象
*`common.read`（布尔值，强制性）-如果状态可读，则为true
*`common.write`（布尔值，强制性）-如果状态为可写，则为true
*`common.role`（字符串，强制性）-状态的角色（在用户界面中用于指示要选择哪个小部件，请参见下文）
*类型编号的`common.states`（可选）属性，带有可能状态的对象'{'value'：'valueName'，'value2'：'valueName2'，0：'OFF'，1：'ON'}`
*`common.workingID`（字符串，可选）-如果此状态具有助手状态WORKING。如果前几部分与实际名称相同，则必须写上全名或最后一部分。用于HM.LEVEL，通常值为“ WORKING”
*`common.custom`（可选）-具有特定适配器的自定义设置的结构。像`{“ influxdb.0”：{“ enabled”：true，“ alias”：“ name”}}`一样。 “ enabled”属性是必填项，如果不正确，则将删除整个属性。

#####状态`common.history`
历史记录功能需要历史记录适配器或任何其他类型为历史记录的存储适配器

当达到最大值时，fifo长度会减小为最小值。设置为null或保留未定义状态以使用默认值

有关传输的列表，请参阅历史记录适配器自述文件

*`common.history`（可选）
*`common.history。<HISTORY-INSTANCE> .changesOnly`（可选，布尔值，如果为true，则仅记录值更改）
*`common.history。<HISTORY-INSTANCE> .enabled`（布尔值）

#####状态`common.role`
*`common.role`（指示该状态应如何在用户界面中表示）

[可能的值](stateroles.md)

####频道
#####频道`common.role`§（可选）
建议：通道对象common.role应该/可以暗示一组强制性和/或可选状态子对象

可能的值：

*`info`-货币或股票价格，燃油价格，邮政信箱插入等
*`calendar`-
*`forecast`-天气预报

*`媒体-普通媒体频道
*`media.music`-媒体播放器，例如SONOS，YAMAHA等
*`media.tv`-电视
*`media.tts`-文字转语音

*`thermo`-监视或控制温度，湿度等
*`thermo.heat`
*`thermo.cool`

*`blind`-百叶窗控制

*`光`
*`light.dimmer`-调光器
*`light.switch`-灯光开关。
*`light.color`-具有颜色更改功能的灯光控制
*`light.color.rgb`-以RGB设置颜色
*`light.color.rgbw`-以RGBW设置颜色
*`light.color.hsl`-以色相/饱和度/亮度设置颜色（色相光-LivingColors ...）
*`light.color.hslct`-在“色相/饱和度/亮度”或“色温”中设置颜色（色相扩展色光）
*`light.color.ct`-色温K

*`switch`-一些通用的开关

*`sensor`-例如窗户或门触点，漏水传感器，火灾传感器
*`sensor.door`-打开，关闭
*`sensor.door.lock`-打开，关闭，锁定
*`sensor.window`-打开，关闭
*`sensor.window.3`-打开，倾斜，关闭
*`sensor.water`-真（警报），假（无警报）
*`sensor.fire`-正确（警报），错误（无警报）
*`sensor.CO2`-真（警报），假（无警报）

*

*`警报`-一些警报

*`phone`-炸弹盒，赛车场等

*`button`-类似墙壁开关或电视遥控器，其中每个按钮都处于.play，.stop，.pause之类的状态
*`remote`-具有状态的电视或其他遥控器是带有按下值的字符串，例如“播放”，“停止”，“暂停”

*`meta-有关设备的信息
*`meta.version`-设备版本
*`meta.config`-从设备配置
* ...

####频道说明
~~属性名称可以由适配器自由定义，用** bold **字体编写的属性除外。~~

“ W”-common.write = true

“ M”-必选

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

#####`light.switch`-属性说明
| **称** |** common.role **|** M **|** W **|** common.type **|** 明** | ------------- |：-------------------------- |：-----：| ：-----：| ----------------- | ---

|州|开关| X | X |布尔|
|描述| text.description | | | |
| mmm | indicator.maintenance.mmm | | | | mmm =低矮或不可达或其他 |

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

#####`light.dimmer`-属性说明
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

#####`blind`-属性说明
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

#####`phone`-属性说明
| **称** |** common.role **|** M **|** W **|** common.type **|** 明** | `ringing_number`| `text.phone_number`| | | `string`|

| `ringing`| `indicator`| | | `boolean`|
| `ringing` | `指标`| | |布尔值|

...

####设备
####枚举
*`common.members`-（可选）枚举成员ID的数组

####元
ID

 *`*＆lt;适配器名称＆gt;。＆lt;实例号＆gt; .meta。＆lt;元名称＆*; *`
 *`*＆lt;适配器名称＆gt; .meta。＆lt;元名称＆gt; *`
 *`system。* meta。＆lt;元名称＆gt; *`

####适配器
id`system.adapter.<adapter.name>`

*注意：*所有标志都是可选的，除非特殊标记为“强制性”。

*`common.adminColumns`-自定义属性，必须在对象浏览器的admin中显示。像：`[{“ name”：{“ en”：“ KNX address”}，“ path”：“ native.address”，“ width”：100，“ align”：“ left”}，{“ name”： “ DPT”，“ path”：“ native.dpt”，“ width”：100，“ align”：“ right”，“ type”：“ number”，“ edit”：true，“ objTypes”：[“ state” ，“ channel”]}]`。 type是属性的类型（例如字符串，数字，布尔值），只有在启用了编辑功能后才需要。 objTypes是对象类型的列表，可以具有这样的属性。也仅在编辑模式下使用。
*`common.adminTab.fa-icon`-TAB的“真棒字体”图标名称。
*`common.adminTab.ignoreConfigUpdate`-如果更改了配置，则不更新配置TAB（以启用TAB中的配置设置）
*`common.adminTab.link`-TAB中iframe的链接。您可以像这样使用参数替换：“ http：//％ip％：％port％”。 IP将被替换为主机IP。 “端口”将从native.port中提取。
*`common.adminTab.name`-管理员中TAB的名称
*`common.adminTab.singleton`-[true / false]如果适配器具有用于管理员的TAB。对于所有实例，仅显示一个TAB。
*`common.allowInit`-[true / false]如果设置更改或适配器已启动，则允许将“计划的”适配器称为“不在时间表中”。或在配置更改后允许调度的适配器启动一次，然后按调度启动。
*`common.availableModes`-common.mode的值，如果可能有多个模式
*`common.blockly`-[true / false]如果适配器具有用于块的自定义块。 （需要admin / blockly.js）
*`common.connectionType`-与设备的连接类型：`local / cloud`。参见`common.dataSource`。
*`common.compact`-对控制器说，可以根据需要在同一过程中启动此适配器
*`common.config.height`-配置对话框的默认高度（不建议使用-仅对admin2有效）
*`common.config.minHeight`-配置对话框的最小高度（不建议使用-仅对admin2有效）
*`common.config.minWidth`-配置对话框的最小宽度（不建议使用-仅对admin2有效）
*`common.config.width`-配置对话框的默认宽度（不建议使用-仅对admin2有效）
*`common.dataFolder`-相对于iobroker-data的文件夹，适配器存储数据。该文件夹将被备份并自动恢复。您可以在其中使用变量'％INSTANCE％'。
*`common.dataSource`-如何从设备上接收数据：`poll / push / assumption`。与`connectionType`一起使用很重要。
*`common.dependencies`-类似[[{“ js-controller”：“> = 2.0.0”}]]的数组，它描述了此适配器需要哪些ioBroker模块。
*`common.docs`-类似于`{“ en”：“ docs / en / README.md”，“ de”：[“ docs / de / README.md”，“ docs / de / README1.md” ]}`描述了文档（如果不在README.md中）
*`common.enabled`-强制性[true / false]值应为false，因此默认情况下禁用新实例
*`common.engineTypes`-不推荐使用。在package.json中使用引擎
*`common.eraseOnUpload`-上传前清除目录中的所有先前数据
*`common.expert`-仅在admin中的专家模式下显示此对象
*`common.extIcon`-链接到已卸载适配器的外部图标。通常在github上。
*`common.getHistory`-[true / false]如果适配器支持getHistory消息
*`common.icon`-本地图标的名称（应位于子目录“ admin”中）
*`common.installedVersion`-请勿使用，只能在内部设置
*`common.keywords`-与package.json中的关键字相似，但是可以用多种语言定义。只是一个数组。
*`common.localLinks`-链接到该适配器的Web服务。例如，从管理员到http：// localhost：5984 / _utils以获取蒲团
*`common.localLink`-不推荐使用。使用`common.localLinks`。
*`common.loglevel`-调试，信息，警告或错误
*`common.logTransporter`-如果此适配器从其他主机和适配器接收日志（例如在某处散布日志）
*`common.main`-不推荐使用**在package.json中使用main。
*`common.materializeTab`-如果适配器支持> tab的admin3（具体化样式）
*`common.materialize`-如果适配器支持> admin3（具体化样式）
*`common.messagebox`-如果支持消息框，则为true。如果是，则将创建对象system.adapter。＆lt; adapter.name＆gt; adapter.instance＆gt.messagebox，以将消息发送到适配器（用于电子邮件，推送，...;
*`common.mode`-**必填**可能的值见下文
*`common.name`-**必需**不带“ ioBroker”的适配器的名称。
*`common.noConfig`-[true / false]不显示实例的配置对话框
*`common.noIntro`-从不在管理员的“简介/概述”屏幕上显示此适配器的实例（如图标，小部件）
*`common.noRepository`-[true / false]如果适配器随初始安装一起提供或具有自己的存储库
*`common.nogit`-如果为true，则无法直接从github安装
*`common.nondeletable`-[true / false]该适配器无法删除或更新。它将与控制器一起更新。
*`common.npmLibs`-不推荐使用。使用package.json`dependencies`。
*`common.onlyWWW`-对控制器说[true / false]，该适配器只有html文件，没有main.js，如人力车
*`common.osDependencies.darwin`-此适配器所需的OSX软件包数组
*`common.osDependencies.linux`-此适配器需要的debian / centos软件包数组（当然，只有带有apt，apt-get，yum作为软件包管理器的OS）
*`common.osDependencies.win32`-未使用，因为win32没有程序包管理器
*`common.os`-支持的操作系统的字符串或数组，例如[“ linux”，“ darwin”]
*`common.platform`-**必填**可能的值：Javascript / Node.js，更多
*`common.preserveSettings`-具有实例公共属性名称的字符串（或数组），不会被删除。例如。 “ history”，所以通过setState（'system.adapter.mqtt.0“，{..}），即使新对象没有此字段，也不删除common.history字段。要删除该属性，必须明确用```common：{history：null}```完成。
*`common.readme`-不推荐使用。使用`docs`。
*`common.restartAdapters`-具有适配器名称的阵列，必须在安装该适配器后重新启动它，例如[“可见”]
*`common.schedule`-如果适配器以`schedule`模式运行，则CRON时间表。
*`common.serviceStates`-[true / false或path]如果适配器可以传递其他状态。如果是，路径适配器/lib/states.js将被调用，并提供以下参数功能（对象，状态，实例，配置，回调）。函数必须传递点数组，其值必须类似于函数（err，result）{result = [{id：'id1'，val：1}，{id：'id2'，val：2}]}}
*`common.singletonHost`-适配器只能在一台主机上安装一次
*`common.singleton`-适配器在整个系统中只能安装一次
*`common.stopBeforeUpdate`-[true / false]如果适配器必须在更新前停止
*`common.stopTimeout`-超时，以毫秒为单位，直到适配器关闭。默认值500ms。
*`common.subscribable`-必须使用sendTo订阅此适配器的变量以启用更新
*`common.subscribe`-变量名，即自动订阅
*`common.supportCustoms`-[true / false]如果适配器支持每种状态的设置。它必须在管理员中具有custom.html文件。样本可以在ioBroker.history中找到
*`common.supportStopInstance`-[true / false]如果适配器支持信号stopInstance（需要** messagebox **）。该信号将在停止前发送到适配器。 （如果问题发生在SIGTERM上，则使用）
*`common.titleLang`-**必填**所有支持的语言（如{en：'Adapter'，de：'adapter'，ru：'Драйвер'}的适配器的更长名称
*`common.title`-适配器的更长名称（不建议使用）以在admin中显示
*`common.type`-适配器类型。参见[类型]（adapterpublish.md）
*`common.unchanged`-（系统）请不要使用此标志。这是通知系统的标志，必须在admin中显示配置对话框。
*`common.unsafePerm`-[true / false]如果必须使用“ npm --unsafe-perm”参数安装软件包
*`common.version`-**必需**可用版本
*`common.wakeup`-如果将一些值写入`system.adapter.NAME.x.wakeup`中，适配器将启动。通常，适配器应在事件处理后停止。
*`common.webByVersion`-在Web适配器中将版本显示为前缀（通常-ip：port / material，webByVersion-ip：port / 1.2.3 / material）
*`common.webExtendable`-[true / false]如果此适配器中的Web服务器可以使用诸如代理，simple-api之类的插件/扩展名进行扩展
*`common.webExtension`-用于连接网络扩展名的相对文件名。例如。在相对于适配器根目录的simple-api“ lib / simpleapi.js”中。另外，native.webInstance要求说出该扩展名的位置。空意味着，它必须作为自己的Web服务运行。 “ *”表示每个Web服务器都必须包含它。
*`common.webPreSettings`-WebServer适配器必须包含在info.js中的参数列表。 （示例材料）
*`common.webservers`-Web服务器实例的数组，应从适配器www文件夹提供内容
*`common.welcomeScreen`-页面数组，应在“网络” index.html页面上显示。 [“ vis / edit.html”，“ vis / index.html”]或[{“ link”：“ vis / edit.html”，“ name”：“ Vis编辑器”，“ img”：“ vis / img / edit.png“，” color“：” blue“}，” vis / index.html“]
*`common.welcomeScreen.order`-待办事项
*`common.welcomeScreenPro`-与`common.welcomeScreen`相同，但仅用于ioBroker.cloud的访问。
*`common.wwwDontUpload`-不要将www目录上传到数据库。仅用于管理员。您可以只命名目录，然后单击确定。
*`protectedNative`-配置属性数组，只能由自己的适配器访问，例如`[“ password”]`
*`encryptedNative`-配置属性数组，当通过“管理”配置页面存储时将自动加密，并在适配器运行时自动解密，例如`[“” password“，” token“]`
*`native`-预定义的属性，可在index_m.html中并在运行时通过`adapter.config。<attribute>`访问，例如`{“端口”：1234，“密码”：“秘密”}`

####实例
id *system.adapter。＆lt; adapter.name＆gt;。＆lt;实例号＆gt;*

*`common.host`-适配器应在其上启动的（强制性）主机-对象* system.host。＆lt; host＆gt; *必须存在
*`common.enabled`-（强制性）
*`common.mode`-（强制）可能的值，请参见下文

#####适配器/实例common.mode
*`none`-此适配器不会启动进程
*`daemon`-始终运行的进程（如果进程退出，将重新启动）
*`subscribe`-在状态* system.adapter。＆lt; adapter-name＆gt;。＆lt; instance-number＆gt; .alive *变为* true *时启动。当* .alive *更改为* false *并被杀死（如果进程退出，则将* .alive *设置为* false *）（进程退出时将不重新启动）
*`schedule`-由在* system.adapter。＆lt; adapter-name＆gt;。＆lt; instance-number＆gt; .schedule *中找到的时间表开始。
*`once`-每次更改system.adapter.yyy.x对象时，都会启动此适配器。终止后将不会重新启动。
*`extension`-该适配器不会由`js-controller`启动，但会由Web实例启动。网络实例可以在“ native.webInstance”中定义为“ *”（如果在每个网络中），也可以在特定的网络实例中定义为“ web.x”。 （例如：“相机，代理”）。另外，在`common.webExtension`中必须提供插件文件的路径。

####主机
id`system.host.<host>`

*`common.name`-f.e. `system.host.banana`
*`common.process`
*`common.version`
*`common.platform`
*`common.cmd`
*`common.hostname`-f.e.香蕉
*`common.address`-IP地址字符串数组

####配置
####脚本
*`common.platform`-（必填）可能的值`Javascript / Node.js`（以后还会有）
*`common.enabled`-（强制）是否激活脚本
*`common.source`-（强制性）脚本源
*`common.engine`-（可选）*脚本引擎*应该运行此脚本的实例（例如'javascript.0'）-如果自动选择省略的引擎

####个用户
*`common.name`-（必填）用户名（区分大小写）
*`common.password`-（必填）MD5密码哈希

####组
*`common.name`-（必填）组名
*`common.members`-（强制）用户对象ID数组
*`common.desc`-（可选）组用途描述