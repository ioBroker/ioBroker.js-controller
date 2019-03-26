---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.socketio/README.md
title: ioBroker socket.io
hash: f1lFcY3hIeuPTSEZN1GmfOuiuQW7C10OzaOn5sLMO6Y=
---
![商标](../../../en/adapterref/iobroker.socketio/admin/socketio.png)

![安装数量](http://iobroker.live/badges/socketio-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.socketio.svg)
![下载](https://img.shields.io/npm/dm/iobroker.socketio.svg)
![NPM](https://nodei.co/npm/iobroker.socketio.png?downloads=true)

#ioBroker socket.io =================
某些WEB应用程序和适配器使用此适配器与ioBroker通信。

用户可以使用此适配器通过Web套接字将其产品连接到ioBroker。实际上，Flot，Rickshaw，Vis和mobile使用此适配器从ioBroker中提取数据。

您可以在示例[目录](https://github.com/ioBroker/ioBroker.socketio/tree/master/example)简单应用程序中找到，该应用程序使用此接口来显示某些数据。

通过使用socket.io接口，用户应该理解系统的[基础知识和概念](https://github.com/ioBroker/ioBroker)。

阅读[对象的结构](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md)也很有用。

##概念的简要描述
###对象
对象是数据点或组的描述。在这种情况下，组可以满足其他数据点，它称为通道。如果组在这种情况下由其他通道组成，则称为设备。

对象是描述数据点和内容的元信息：最大/最小值，单位，名称，默认值，值的类型，用于通信的适配器的信息（例如，IP地址）等。

###状态
State是数据点的实际值，由javascript对象呈现：

```
{
    val: VALUE,
    ack: ACKNOWLEDGED,
    ts: TIMESTAMP, // could be converted into time with "new Date(state.ts)" (In older version of js-controller - "new Date(state.ts * 1000)")
    lc: TIMESTAMP of last change,
    from: ADAPTER_NAME,
    q: QUALITY
}
```

与对象相比，国家经常改变自己。 （通常情况下，对象应该通过创建改变一次，这就是全部）

###致谢
每个州都有“ack”属性。它显示了命令的方向。

 - 如果ack = false，则表示某个其他适配器想要控制（写入）此变量，因此将执行该命令（例如，将打开灯）。
 - 如果ack = true，则表示设备通知新值。 （例如，手动打开灯或检测到运动）

**示例**：我们有一些家庭自动化适配器（HAA），其中一个灯在地址* haa.0.lamp1 *下连接。

 - 灯具可以通过物理开关手动打开，也可以通过wifi帮助HAA打开。
 - 如果vis想要通过wifi打开灯，它应该用```{value：true，ack：false}```设置新值。
 - 当灯打开时，它通常会告知HAA新状态，并且应立即用```{value：true，ack：true}```覆盖该值。
 - 如果通过物理开关手动关闭灯泡，它会通过“`{value：false，ack：true}```向HAA通知新状态。

###质量
每个数据点都有属性** q ** - *quality*

##用法
建议使用example / conn.js进行通信。

在包含conn.js文件之后，可以使用全局对象** servConn **来建立与socketio适配器的通信。

** servConn **对象有空心方法：

＃＃＃ 在里面
 -  function（connOptions，connCallbacks，objectsRequired）

** connOptions ** - 是可选参数：

```
connOptions = {
    name:          'name of the connection', // optional - default 'vis.0', used to distinguish connections in socket-io adapter.
    connLink:      'http://localhost:8084',  // optional - URL of the socket.io adapter. By default it is same URL where the WEB server is.
    socketSession: ''                        // optional - default 'nokey', and used by authentication
};
```

您也可以在调用“init”之前定义全局变量来传递这些参数：

```
var socketUrl      = 'http://localhost:8084';  // is connOptions.connLink
var socketSession  = '';                       // is connOptions.socketSession
servConn.namespace = 'myapp';                  // is connOptions.name
```

** connCallbacks ** - 带回调的对象：

```
connCallbacks = {
    onConnChange:   function (isConnected) {}, // optional - called if connection state changed.
    onObjectChange: function (id, obj)     {}, // optional - called if content of some object is changed, new object created or object was deleted (obj = null)
    onUpdate:       function (id, state)   {}, // optional - called if state of some object is changed, new state for object is created or state was deleted (state = null)
    onError:        function (error)       {}  // optional - called if some error occurs
};
```

### SetState
 - 函数（pointId，value，callback）

设置某些数据点的新值。

例如。 ```servConn.setState('adapter.0.myvalue', true)```将```{val: true, ack: false}```写入* adapter.0.myvalue *。

 - **pointId** - 是状态的ID，如* adapter.0.myvalue *，
 - **value** - 状态的新值，可以是简单值（字符串，数字，布尔值）或像```{val：newValue，ack：false，q：0}```这样的对象。

如果使用简单值，“ack”将被设置为“false”。

 - **callback** - ```function（error）{}``` - 在执行向DB写入新值时调用（不是在控制设备时）。

### GetStates
 - 功能（ID，回调）

获得多个州的州。通常在建立连接后调用此命令以获取已使用数据点的实际状态。

 - **ID** - 带ID的模式或数组。可以省略以获得所有状态。模式可以有通配符，例如：'* .STATE'，'haa.0。*'
 -  **回调**  - ```函数（错误，状态）{}``` -  *状态*是对象，如```''id1'：'state1'，'id2'：'state2'，.. }```。 * stateX *是具有[上面]描述的结构的对象（#state）。

### HttpGet
 - 功能（网址，回调）

从PC调用此URL，其中socketio适配器运行。

 - **url** - 是致电的地址。
 - **callback** - ```function（data）{}``` - 请求的结果（html body）。

### LogError
 - 函数（errorText）

将错误消息写入控制器的日志。

### GetConfig
 - 功能（回调）

读取控制器配置，如语言，温度单位，浮点数中的点或逗号分隔符，日期格式。

 - **callback** - ```function（err，config）{}``` - config看起来像：

```
{
  "_id": "system.config",
  "type": "config",
  "common": {
    "name":             "System configuration",
    "language":         "de",
    "tempUnit":         "°C",
    "currency":         "€",
    "dateFormat":       "DD.MM.YYYY",
    "isFloatComma":     true,
    "licenseConfirmed": true,
    "activeRepo":       "fast-online",
    "diag":             "extended",
    "defaultHistory":   ""
  }
}
```

### GetObject
 - 功能（id，回调）

从DB读取特定对象。使用此功能可以读取某些对象的元信息。

 - **id** - 状态的id，如“haa.0.light1”，
 - **callback** - ```function（error，obj）``` - obj看起来像：

```
{
  "_id": "haa.0.light1",
  "type": "state",
  "common": {
    "def": false,
    "type": "boolean",
    "read": false,
    "write": true,
    "role": "switch",
    "name": "light in floor"
  },
  "native": {
    "CONTROL": "BUTTON.LONG",
    "DEFAULT": false,
    "FLAGS": 1,
    "ID": "PRESS_LONG",
    "MAX": true,
    "MIN": false,
    "OPERATIONS": 6,
    "TAB_ORDER": 1,
    "TYPE": "ACTION",
    "UNIT": ""
  },
  "enums": ['enum.rooms.floor'],
  "acl": {
    "object": 1638,
    "state": 1638
  }
}
```

### GetObjects
 - 功能（回调）

从DB读取所有对象。

 - **callback** - ```function（error，objs）``` - objs看起来像：```'''id1'：'object1'，'id2'：'object2'，...}`` `

### ReadDir
 -  function（dirName，callback）

读取指定目录中的文件和目录。

文件存储在DB（或类似文件）中，通常不应直接访问。文件名由路径，文件名和文件扩展名组成，如“/mobile.0/data/fileName.txt”。

 -  dirName  - 像* / mobile.0 / data *这样的目录名称
 -  callback  - ```function（error，list）``` -  list看起来像：

```
[
    {
        file:       'file1.txt',
        stats:      {
                      mode: 33188,
                      size: 527,
                      atime: Mon, 10 Oct 2011 23:24:11 GMT,
                      mtime: Mon, 10 Oct 2011 23:24:11 GMT,
                      ctime: Mon, 10 Oct 2011 23:24:11 GMT,
                      birthtime: Mon, 10 Oct 2011 23:24:11 GMT
                    },
        isDir:      false,
        modifiedAt: timeInMs, // new Date().getTime()
        createdAt:  timeInMs, // new Date().getTime()
    },
    {
        file:       'main',
        stats:      {
                      mode: 33188,
                      atime: Mon, 10 Oct 2011 23:24:11 GMT,
                      mtime: Mon, 10 Oct 2011 23:24:11 GMT,
                      ctime: Mon, 10 Oct 2011 23:24:11 GMT,
                      birthtime: Mon, 10 Oct 2011 23:24:11 GMT
                    },
        isDir:      true,
        modifiedAt: timeInMs, // new Date().getTime()
        createdAt:  timeInMs, // new Date().getTime()
    },
    ...
]
```

### Mkdir
 -  function（dirName，callback）

 -  **回调**  - ```function（error）{}```

### Unlink
 - 功能（名称，回调）

删除文件或目录。目录必须为空才能删除。

 -  dirName  - 目录或文件的名称，如* / mobile.0 / data *。
 -  **回调**  - ```function（error）{}```

### ReadFile
 - 函数（文件名，回调）

 - **callback** - ```function（error，fileData，mimeType）```

### ReadFile64
 - 函数（文件名，回调）

 -  **回调**  - ```函数（错误，数据）``` - 数据是```{mime：mimeType，data：base64data}```

### WriteFile
 - 功能（文件名，数据，模式，回调）

 -  **回调**  - ```function（error）{}```

### WriteFile64
 - 功能（文件名，数据，模式，回调）

 -  **回调**  - ```function（error）{}```

＃＃＃ 重新命名文件
 - 函数（oldName，newName，callback）

 -  **回调**  - ```function（error）{}```

### GetHistory
 - 功能（实例，选项，回调）

 - **callback** - ```function（error，data，step，sessionId）{}```

### RequireLog
 - 函数（isRequire，callback）

激活/停用此套接字的日志接收。

 -  **回调**  - ```function（error）{}```

### AuthEnabled
 - 功能（）

如果启用了身份验证以及登录了哪个用户，则会读取

 - **callback** - ```function（authEnabled，currentUser）{}```

如果启用了身份验证，则将返回当前登录用户，如果禁用身份验证，则将返回默认用户“正在运行”。

##调整Web套接字
在某些Web套接字客户端上，通信存在性能问题。有时这个问题是由于长轮询机制上socket.io通信的回退造成的。
您可以设置选项*强制Web套接字*以强制仅使用Web套接字传输。

## Changelog
### 2.1.1 (2018-06-09)
* (bluefox) Used socket.io Version 1.7.2
* (bluefox) Fix authentication problem

### 2.1.0 (2018-05-04)
* (bluefox) Used socket.io Version 1.7.4

### 2.0.1 (2018-02-28)
* (bluefox) Dropped support of old browsers. Please do not update if you have iPad 1 and so on.

### 1.9.0 (2018-01-14)
* (bluefox) Ready for admin3

### 1.8.7 (2017-11-29)
* (bluefox) Tune cloud work

### 1.8.5 (2017-10-22)
* (bluefox) Escape [] in subscriptions

### 1.8.4 (2017-10-16)
* (bluefox) Check callback validity

### 1.8.3 (2017-10-09)
* (bluefox) Allow authentication via URL

### 1.8.2 (2017-09-20)
* (bluefox) Fix cmdExec command

### 1.8.1 (2017-09-13)
* (bluefox) Fix user access rights for sendToHost

### 1.8.0 (2017-08-06)
* (bluefox) Support the access to admin via iobroker.pro

### 1.7.5 (2017-05-24)
* (bluefox) fix error if subscribe is empty

### 1.7.4 (2017-01-04)
* (bluefox) fix error with authentication

### 1.7.3 (2016-11-13)
* (bluefox) support of socket extensions

### 1.7.2 (2016-11-06)
* (bluefox) Fix unsubscribe of states

### 1.7.1 (2016-10-11)
* (bluefox) Fix authentication for app

### 1.7.0 (2016-08-30)
* (bluefox) сompatible only with new admin

### 1.6.1 (2016-08-29)
* (bluefox) fix error by checking user name

### 1.6.0 (2016-08-27)
* (bluefox) support of letsencrypt certificates

### 1.5.4 (2016-08-26)
* (bluefox) fix error in socket.js

### 1.5.3 (2016-08-14)
* (bluefox) support of force only web sockets transport

### 1.5.2 (2016-07-06)
* (bluefox) support of chained certificates

### 1.5.1 (2016-06-28)
* (bluefox) add sendToHost command

### 1.5.0 (2016-06-17)
* (bluefox) preparations for cloud

### 1.4.1 (2016-05-13)
* (bluefox) change getHistory function

### 1.4.0 (2016-04-24)
* (bluefox) encode json files

### 1.3.0 (2016-03-17)
* (bluefox) rename files

### 1.2.3 (2015-12-24)
* (bluefox) support of authentication over URL

### 1.2.2 (2015-12-09)
* (bluefox) remove unused parameter "cache"

### 1.2.0 (2015-11-15)
* (bluefox) add version compatibility check

### 1.1.0 (2015-11-14)
* (Smiling_Jack) add getHistory

### 1.0.0 (2015-09-30)
* (bluefox) stop adapter before update

### 0.4.5 (2015-08-11)
* (bluefox) update packets

### 0.4.4 (2015-07-07)
* (bluefox) extend writeFile with mode

### 0.4.3 (2015-07-06)
* (bluefox) add chmodFile

### 0.4.1 (2015-06-13)
* (bluefox) add default ttl
* (bluefox) enable run from "web" and add permissions check

### 0.4.0 (2015-06-13)
* (bluefox) add permissions support

### 0.3.1 (2015-05-19)
* (bluefox) support of subscribe on objectChanged

### 0.3.0 (2015-04-23)
* (bluefox) enable security

### 0.2.3 (2015-03-07)
* (bluefox) extend getStates to support list of objects

### 0.2.2 (2015-02-14)
* (bluefox) fix error with objectChanged event

### 0.2.0 (2015-01-16)
* (bluefox) make socket usable as module

### 0.1.6 (2015-01-08)
* (bluefox) support of subscribe for different sockets. Support of socket names. Diagnostic info in socket.0.connected

### 0.1.5 (2015-01-07)
* (bluefox) fix error with update of states and objects

### 0.1.4 (2015-01-06)
* (bluefox) support of file manager in vis

### 0.1.3 (2015-01-02)
* (bluefox) enable adapter by default

### 0.1.2 (2015-01-02)
* (bluefox) add "request" module to package.json

### 0.1.1 (2015-01-02)
* (bluefox) enable npm install

### 0.1.0 (2014-12-28)
* (bluefox) support of read/write files

### 0.0.5 (2014-12-19)
* (bluefox) support of setObjects command

### 0.0.4 (2014-12-10)
* (bluefox) support of https sockets

### 0.0.3 (2014-12-05)
* (bluefox) support of https sockets

### 0.0.2 (2014-11-24)
* (bluefox) fix error by start

### 0.0.1 (2014-10-10)
* (bluefox) authentication works

## License

The MIT License (MIT)

Copyright (c) 2014-2018 bluefox <dogafox@gmail.com>