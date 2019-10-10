---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.radiohead.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.radiohead.svg
BADGE-Dependency Status: https://img.shields.io/david/crycode-de/iobroker.radiohead.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/crycode-de/ioBroker.radiohead/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.radiohead.png?downloads=true
BADGE-Travis-CI: http://img.shields.io/travis/crycode-de/ioBroker.radiohead/master.svg
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.radiohead/README.md
title: ioBroker.radiohead
hash: V0vrm0V+IiDhGTVilg+5PGS6f5bR/npZhH+Gsx9z72g=
---
![徽标](../../../de/adapterref/iobroker.radiohead/../../admin/radiohead.png)

＃ioBroker.radiohead
适配器`radiohead`允许将RadioHead网络连接到ioBroker。

通信通过串行接口进行。
为了连接无线硬件，可以使用小型微处理器（例如Arduino nano）作为网关。

[电台司令](http://www.airspayce.com/mikem/arduino/RadioHead/)是用于微处理器的基于开源数据包的无线电模块库。
它提供寻址，可靠，重复发送和确认的可变长度消息。

##功能
*从RadioHead网络中的其他节点接收消息/命令。
*将消息/命令发送到RadioHead网络中的其他节点。
*用于传入和传出数据的可单独配置的对象。
*能够通过脚本发送RadioHead消息。
*可以通过脚本评估收到的RadioHead消息。

如果通过串行接口接收到与输入数据的对象的模式匹配的消息，则从中提取数据并由适配器将其写入对象的状态。

要发送数据，只需将数据写入外发数据的已配置对象的状态，然后适配器将数据发送到设置的模式。

##安装
该适配器可通过*稳定*存储库提供，因此可以通过管理界面或命令行正常安装。

或者，可以通过*最新*存储库或URL`https://github.com/crycode-de/ioBroker.radiohead.git`安装任何现有的预发行版本。

##配置
配置窗口坚持以下三个过程：

*主要设定
*传入数据
*外发数据

###主要设置
![主要设置](../../../de/adapterref/iobroker.radiohead/./img/haupteinstellungen.png)

####串行接口
进行RadioHead通信的串行端口。

例子：

*`/ dev / ttyUSB0`（Linux）
*`COM1`（Windows）

####波特率
进行通讯的波特率。对于RadioHead网络中的所有节点，这应该是相同的。

默认值为`9600`。

####地址
RadioHead网络中的ioBroker适配器的地址。

可以指定为十六进制数（`0x00`至`0xFE`）或十进制数（`0`至`254`）。无法使用`0xFF`（或`255`），因为这是广播地址。

####可靠模式
在可靠模式下，期望接收者针对每个发送的消息进行确认（ACK）。
如果在设定的时间内未确认消息，则会再次发送。

如果激活，则使用`RHReliableDatagram`代替RadioHead的`RHDatagram`。

####重复
如果缺少确认，将为每个要发送的消息发送的重试尝试次数。

默认值为`3`。在`0`上设置为无重复。

####超时
等待消息发送到确认（ACK）的时间（以毫秒为单位）。

默认值为`200`。

####混杂模式
在混杂模式下，可以接收发给任何收件人的邮件。

启用此功能后，应正确设置传入数据的传入地址。

####所有数据日志
如果激活，则将每个接收和发送的消息写入日志。

###传入数据
![传入数据](../../../de/adapterref/iobroker.radiohead/./img/eingehende_daten.png)

####名称
ioBroker对象的名称。对于适配器实例的传入数据必须唯一。

可以通过在名称中使用点来形成组。

对于每个数据记录，根据`radiohead.<instanz>.data.in.<name>`模式创建一个对象。

####角色
数据的作用对于处理接收到的数据很重要。

开关，按钮和指示器被评估为真值。
对于所有其他角色，将从接收到的数据中提取数值并进行评估。

####发件人地址
消息发送方在RadioHead网络中的地址。

可以指定为十六进制数（`0x00`至`0xFE`）或十进制数（`0`至`254`）。
也可以对任何发件人地址使用`*`。

####收件人
RadioHead网络中邮件收件人的地址。

可以指定为十六进制数（`0x00`至`0xFF`）或十进制数（`0`至`255`）。
对于任何其他地址，也可以使用`*`。

*注意：*如果没有激活的混杂模式，则只能接收到自己地址和广播地址`0xFF`（或`255`）的消息。

####数据
这些是接收到的消息的数据，以逗号分隔。
基于此数据，对接收到的消息进行分析和处理。

字节可以指定为十六进制数（`0x00`至`0xFF`）或十进制数（`0`至`255`）。
作为任何字节的通配符，可以使用`*`。

要为接收值提取的数据字节必须用大的`D`标记，以便在处理过程中识别数据。连续的`D`字节数取决于所选的数据类型。

**特殊情况下的开关和指示器：**

对于开关和指示器，可以指定用分号分隔的两组数据字节。
第一组用于`true`值，第二组用于`false`值。
如果仅指定一组，则将在接收时切换当前状态。

**范例**

*固定字节`0x10`，32位浮点数，4个任意字节：`0x01，D，D，D，D，*，*，*，*`
*按钮的两个固定字节：`0x01,0x00`
*两组每个开关一个字节：0x05; 0x06

####类型
这是ioBroker中的数据类型。
这里可能是*数字*和*真值*之间的选择。如果是真值，则将接收到的值转换为真值（`true`或`false`）。

####数据类型
数据类型定义了接收到的数据类型，从而定义了从数据字节读取数据的方法。

请参阅[数据类型](#datentypen)。

####单位
ioBroker中相应值的单位。

####因数和偏移
一个因数乘以接收的值并为其增加一个偏移量。

`Wert = (Wert * Faktor) + Offset`

####小数位
接收值（经过分解和偏移计算后）四舍五入到的小数位数。

###外发数据
![外发数据](../../../de/adapterref/iobroker.radiohead/./img/ausgehende_daten.png)

####名称
ioBroker对象的名称。对于适配器实例的出站数据，必须是唯一的。

可以通过在名称中使用点来形成组。

对于每个数据记录，根据`radiohead.<instanz>.data.out.<name>`模式创建一个对象。

####角色
数据的作用对于处理要发送的数据很重要。

开关，按钮和指示器作为真实值发送。
对于所有其他角色，数值将嵌入在要发送的数据中。

####收件人
RadioHead网络中邮件收件人的地址。

可以指定为十六进制数（`0x00`至`0xFF`）或十进制数（`0`至`255`）。

为了向所有节点广播消息，必须使用地址`0xFF`（或`255`）。

####数据
这是以单个逗号分隔字节发送的消息数据。
基于该数据，建立要发送的消息。

字节可以指定为十六进制数（`0x00`至`0xFF`）或十进制数（`0`至`255`）。

必须使用较大的`D`来标识要使用的发送数据字节。连续的`D`字节数取决于所选的数据类型。

**特殊情况下的开关和指示器：**

对于开关和指示器，可以指定用分号分隔的两组数据字节。
第一组用于`true`值，第二组用于`false`值。
如果仅指定一个组，则始终发送该组。

**范例**

*固定字节`0x42`，16位整数：`0x42，D，D`
*按钮的两个固定字节：`0x01,0x02`
*两组每组两个字节的字节：`0x01,0x00; 0x01,0xFF`

####类型
这是ioBroker中的数据类型。
这里可能是*数字*和*真值*之间的选择。对于真值，将要发送的值转换为`0x01`（`true`）或`0x00`（`false`）。

####数据类型
数据类型定义要发送的数据类型，从而定义数据字节中的写方法。

请参阅[数据类型](#datentypen)。

####单位
ioBroker中相应值的单位。

##数据类型
接收和发送数据时，可以使用以下数据类型：

|数据类型描述值范围|数据字节|
|---|---|---|---|
| `int8`|有符号8位整数| -128至127 | 1 |
| `int16_le`，`int16_be`|有符号16位整数| 0至32767 | 2 |
| `uint16_le`，`uint16_be`|无符号16位整数| 0至65535 | 2 |
| `int32_le`，`int32_be`|有符号32位整数| 0至4294967295 | 4 |
| `uint32_le`，`uint32_be`|无符号32位整数| 0至4294967295 | 4 |
| `float32_le`，`float32_be`| 32位浮点数| -3.4E + 38到+ 3.4E + 38，小数点后7位| 4 |
| `double64_le`，`double64_be`| 64位浮点数| -1.7E + 308至+ 1.7E + 30，小数点后16位| 8 |
| `double64_le`，`double64_be` | 64位浮点数| -1.7E + 308至+ 1.7E + 30，小数点后16位| 8 |

结尾`_le`和`_be`分别表示具有多个字节的数据类型的字节顺序（字节序）。这取决于远程站如何发送或处理数据。

*`_le`-*小尾数*：最低有效字节在前
*`_be`-*大端字节*：最高有效字节在前

##在脚本中使用
可以使用脚本发送RadioHead消息并评估收到的消息。

###通过脚本发送
为了通过脚本发送，可以使用功能`sendTo`。

**实施例：**

```js
sendTo('radiohead.0', 'send', {
    to: 0x02, // Zu-Adresse
    data: [0x01,0x02,255] // zu sendende Daten-Bytes als Array oder Buffer
}, (ret) => {
    log('ret: ' + JSON.stringify(ret));
    // -> ret: {}
    if (ret.error) {
        log('error sending message', 'warn');
    }
});
```

如果未成功发送消息，则将`ret.error`设置为相应的错误。

###通过脚本评估收到的消息
对于每个接收到的消息，对象`radiohead.<instanz>.data.incoming`被更新，并且该值设置为具有接收到的数据的对象。
可以相应地评估此更改。

**实施例：**

```js
on({id: "radiohead.0.data.incoming", change:'any'}, (obj) => {
    log('incoming changed: ' + JSON.stringify(obj.state.val));
    // -> incoming changed: {"data":[1,0],"length":2,"headerTo":1,"headerFrom":2,"headerId":47,"headerFlags":0}
});
```

##适配器信息
适配器的每个实例都提供以下信息：

|对象描述 |
|---|---|
|信息连接|适配器是否已连接到串行端口的指示器 |
| info.lastReceived |收到最后一个RadioHead消息的时间|
| info.lastSentOk |成功发送上一个RadioHead消息的时间|
| info.lastSentError |最后一个RadioHead消息发送不正确的时间|
| info.receivedCount |收到的RadioHead消息数|
| info.retransmissionsCount |重试发送邮件的次数|
| info.sentErrorCount |错误发送的消息数|
| info.sentOkCount |成功发送的消息数|

如有必要，可以通过写入对象`actions.resetCounters`将消息的计数器重置为0。

## Changelog
### 1.0.2 (2019-09-08)
* (Peter Müller) dependency updates and bugfixes

### 1.0.1 (2019-07-30)
* (Peter Müller) license  update

### 1.0.0 (2019-07-28)
* (Peter Müller) initial release

## License

Copyright (c) 2019 Peter Müller <peter@crycode.de>