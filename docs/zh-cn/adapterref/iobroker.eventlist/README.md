---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.eventlist/README.md
title: ioBroker.eventlist
hash: ywraCHe0HMT0583wHjYdV78lyHfLS1pss3mUMXaxF2w=
---
![商标](../../../en/adapterref/iobroker.eventlist/admin/eventlist.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.eventlist.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.eventlist.svg)
![安装数量（最新）](http://iobroker.live/badges/eventlist-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/eventlist-stable.svg)
![依赖状态](https://img.shields.io/david/bluefox/iobroker.eventlist.svg)
![已知漏洞](https://snyk.io/test/github/bluefox/ioBroker.eventlist/badge.svg)
![NPM](https://nodei.co/npm/iobroker.eventlist.png?downloads=true)

＃ioBroker.eventlist
## IoBroker的事件列表适配器
允许定义必须在事件列表中记录的状态。

该列表可以显示为admin，web，vis，另存为PDF，材料（尚未实现）。

此外，您可以通过电报或WhatsApp发送事件。

![列表](../../../en/adapterref/iobroker.eventlist/img/list.png)

![PDF格式](../../../en/adapterref/iobroker.eventlist/img/pdf.png)

##闹钟模式
仅可以在警报模式下生成事件。
警报模式可以通过变量`eventlist.X.alarm`来控制。

另外，仅当警报模式为开时，才可以向信使发送消息。

用例：

-例如仅当没有人在家时，门磁才可以发送消息。否则，仅在事件列表中收集有关开门的事件。

##可能的演讲
###在“管理员”标签中
您可以在管理员中将事件列表作为选项卡启用。

###网站
事件列表可以显示在`http://<IP>:8082/eventlist/index.html`下。 （对于大于0的实例：`http://<IP>:8082/eventlist/index.html?X`，其中X是实例编号）

### Vis窗口小部件
事件列表可以显示为可视化小部件。

### PDF生成
有可能生成包含所有事件的PDF文档。

如果将模式放在其中，则文档标题可以包含生成日期：`Event list on {{YYYY MM DD}}`。
时间格式的确切描述可以在这里找到：https://momentjs.com/docs/#/displaying/format/

可以通过将`true`写入`eventlist.0.triggerPDF`中来触发PDF的生成。

可以通过以下方式访问PDF文件：

-网络：http：// <IP>：8082 / eventlist / eventlist / report.pdf`（对于大于0的实例：http：// <IP>：8082 / eventlist / eventlist / report-X.pdf，其中X是实例编号）
-管理员：“ http：// <IP>：8081 / files / eventlist / report.pdf”（对于大于0的实例：“ http：// <IP>：8081 / files / eventlist / report-X.pdf”，其中X是实例编号）

**无法在PDF中显示图标。**

##消息框
用户可以通过javascript将自定义事件添加到列表中：

```
// add custom event to event list
sendTo('eventlist.0', 'insert', {
    event: 'My custom text',
    id: 'ID.that.linked.with.this.event',  // optional
    ts: new Date('2020-09-25T16:11:00',    // optional. Default is Date.now()
    val: 5,                                // optional
    duration: 5                            // in ms
});

// Or simple
sendTo('eventlist.0', 'insert', 'My custom text');
// or
setState('eventlist.0.insert', 'My custom text');
// or
setState('eventlist.0.insert', {event: 'My custom text %s', val: 5});
```

用户可以请求格式化的JSON列表以获取特定ID。当然，必须在`eventlist`中启用该ID。

```
// add custom event to event list
sendTo('eventlist.0', 'list', {
    ids: ['my.0.state.id1', 'my.0.state.id2'],
    count: 10, // optional limit of maximal lines in table,
    allowRelative: false, // optional if relative times, e.g. "one minute ago", may be used (Default: true)
}, result => {
    console.log(JSON.stringify(result)); // array with events
    // result = [{id: 'my.0.state.id1',
    //
});

// or
sendTo('eventlist.0', 'list', 'my.0.state.id1', result => {
    console.log(JSON.stringify(result)); // array with events
});
```

用户可以从事件列表中删除部分或全部事件。

```
// delete all events
sendTo('eventlist.0', 'delete', '*', result => {
    console.log(`Deleted ${result.deleted} events`);
});

// delete all events for specific state ID
sendTo('eventlist.0', 'delete', 'hm-rpc.0.AEOI99389408.1.STATE', result => {
    console.log(`Deleted ${result.deleted} events`);
});

// delete one event by timestamp
sendTo('eventlist.0', 'delete', '2020-10-20T21:00:12.000Z', result => {
    console.log(`Deleted ${result.deleted} events`);
});
```

##模式
在事件文本和状态文本中，可以使用以下模式：

-％s-值（状态更改为％s =>状态更改为5），
-％u-单位（状态更改为％s％u =>状态更改为5％），
-％n-名称（“％n将状态更改为％s” =>“设备A的状态更改为5”），
-％t-时间（`状态更改状态为％t` =>`状态更改状态为Sep Fr，16：32：00`），
-％r-相对时间（“状态已更改状态％r” =>“状态已更改状态5秒前”），
-％d-持续时间（“状态处于％d的先前状态=>”状态处于5s的先前状态），
-％g-值差（“状态已更改为％g％” =>“状态已更改为1％”），
-％o-值差（状态从％o更改为％o =>状态在1％上更改）

##网络中多个实例的使用
例如。您可以显示实例2的特定列表，例如`http://IP:8082/eventlist/index.htmlindex.html?2`。

生成的报告将存储在`eventlist/report.pdf`中的实例0中，但存储在`eventlist/report-1.pdf`中的实例1中。

＃＃ 去做
-根据语言更改PDF的初始文本
-许多预定义的图标（最少100个）
-材质小部件
-将消息发送到syslog（可能是splunk）https://www.npmjs.com/package/splunk-logging

<！-下一个版本的占位符（在该行的开头）：

### __正在进行的工程__->

## Changelog
### 0.4.3 (2021-04-19)
* (bluefox) Added the support of Admin5

### 0.4.2 (2020-12-05)
* (bluefox) Added possibility to add multiple states
* (bluefox) Moved the duration to previous state
* (bluefox) Support of multiple instances

### 0.4.0 (2020-11-10)
* (bluefox) Added setting of even/odd background for widget
* (bluefox) Added filter

### 0.2.9 (2020-10-20)
* (bluefox) Corrected error in GUI by disabling of state
* (bluefox) Implemented the deletion of events from the event list

### 0.2.8 (2020-10-14)
* (bluefox) Corrected error in pdf settings  
* (bluefox) Implemented the recalculation of the relative time every 10 seconds  

### 0.2.6 (2020-09-25)
* (bluefox) Corrected error in pdf creation  

### 0.2.5 (2020-09-24)
* (bluefox) Extended icon selector 
 
### 0.2.1 (2020-09-21)
* (bluefox) Vis-widget was corrected 

### 0.1.3 (2020-09-15)
* (bluefox) Implemented the alarm mode and messengers 

### 0.0.3 (2020-09-08)
* (bluefox) Objects with states are supported now 

### 0.0.2 (2020-09-07)
* (bluefox) initial commit

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020 ioBroker <dogafox@gmail.com>

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