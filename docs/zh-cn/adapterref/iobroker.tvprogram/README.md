---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tvprogram/README.md
title: ioBroker.tv程序
hash: nqWOf4ufvn2twgN8hVqOw2cKIwAFr3l7O3vs7fb2QXY=
---
![标识](../../../en/adapterref/iobroker.tvprogram/admin/tvprogram.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.tvprogram.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.tvprogram.svg)
![安装数量（最新）](http://iobroker.live/badges/tvprogram-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/tvprogram-stable.svg)
![依赖状态](https://img.shields.io/david/oweitman/iobroker.tvprogram.svg)
![已知漏洞](https://snyk.io/test/github/oweitman/ioBroker.tvprogram/badge.svg)
![NPM](https://nodei.co/npm/iobroker.tvprogram.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/oweitman/ioBroker.tvprogram/master.svg)
![AppVeyor构建状态](https://img.shields.io/appveyor/ci/oweitman/iobroker-tvprogram.svg)

＃ioBroker.tv程序
**测试：**

## IoBroker的电视程序适配器
该适配器定期轮询有关电视节目的信息。
数据可以显示在各种小部件中。

适配器处于beta阶段，在该阶段中仍在测试小部件/功能，可以添加和删除或完全交换功能/小部件。

可以在iobroker论坛中的相应主题中保留或讨论问题或功能请求的引用

要进行设置，适配器必须已经访问并填充了必要的数据。
由于其大小，数据不会存储在数据点中，而是存储在文件中（Linux路径：/ opt / iobroker / data-files / tvprogram）和适配器的内存中。
在配置中，窗口小部件仅需要填充适配器的任何数据点（例如cmd）。
小部件会自动搜索所有剩余的数据点。

##开发人员手册
该适配器当前只能通过github安装。可以在iobroker中的“适配器”选项卡中，通过github按钮（猫符号）使用专家视图进行操作。

然后在“任何”选项卡中输入github存储库https://github.com/oweitman/ioBroker.tvprogram的URL并安装它。

###适配器配置
您可以配置多少台不同的电视，或者至少配置不同的电视。

###小部件
窗口小部件仅在现代浏览器（Google Chrome，Mozilla Firefox，Opera，Safari）中受支持。
不支持不带Chromium（版本<79）的Internet Explorer或Microsoft Edge。

＃＃＃＃ 时间
该小部件按时间顺序在每个电视频道上显示当前电视节目。

如果通道徽标后面的文本通过显示出来，则必须在小部件中选择背景色。
通常，为视图或至少为小部件选择显式的前景和背景颜色是一种很好的方法。
标记位置ist每15秒更新一次。

如果安装后出现问题，并且未正确显示小部件，请从shell尝试以下命令：

iobroker上传所有

以下属性可用于在vis中进行配置

|属性|例子描述 |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| tvprogram_oid | tvprogram.0.tv1.cmd |电视节目适配器实例的数据点。 |
| widthItem | 120 | 30分钟分段的标准宽度（以像素为单位）|
| heightRow | 35 |每行显示的高度|
| headerfontpercent | 125 |标题的大小（百分比）（时间）|
| broadcastfontpercent | 75 |广播中的字符大小（百分比）|
| Highlightcolor |黄色|最喜欢的颜色|
|标记位置百分比| 25 |标记在小部件宽度中的位置百分比 |
| dialogwidthpercent | 90 |对话框的大小（以小部件的百分比表示）|
| dialogheightpercent | 90 |对话框的大小（以小部件的百分比表示）|

##### CSS类
请更改w00001为您的小部件ID

更改对话框的格式

```css
#w00001channeldlg {
    background-color: red !important;
}
```

```css
#w00001broadcastdlg {
    background-color: red !important;
}
```

如果将其他对话框与其他z-index设置一起使用，则可以为电视节目对话框设置更高的z-index。
也许您必须设置一个大于300的数字。这取决于其他对话框中与电视节目（广播信息和频道选择）对话框重叠或隐藏的设置。

```css
.ui-dialog.w00001 {
   z-index:300 !important;
}
```

更改广播的交替背景色的格式

```css
#w00001 .scrollcontainer ul.tv-row:nth-child(odd)> li.broadcast:nth-child(odd),#w00001 ul.tv-row:nth-child(odd)> li.time:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .scrollcontainer ul.tv-row:nth-child(odd)> li.broadcast:nth-child(even),#w00001 ul.tv-row:nth-child(odd)> li.time:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.55);
}
#w00001 .scrollcontainer ul.tv-row:nth-child(even)> li.broadcast:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.45);
}
#w00001 .scrollcontainer ul.tv-row:nth-child(even)> li.broadcast:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.35);
}

```

####收藏
该小部件显示了所选收藏夹的列表，按日期和时间排序。

以下属性可用于在vis中进行配置

|属性|例子描述 |
| -------------- | -------------------- | --------------------------------------------------- |
| oid | tvprogram.0.tv 1.cmd |电视节目适配器实例的数据点。 |
|频道名称|没有显示徽标（关闭）或频道名称|
| showweekday |是的显示工作日|
| maxfavorites | 10 |显示的最大收藏夹|
| Highlightcolor |黄色|最喜欢的颜色|

＃＃＃＃ 控制
此小部件显示所有实际广播。您可以单击频道徽标来切换频道。
您可以单击广播以获取有关广播的详细信息。

以下属性可用于在vis中进行配置

|属性|例子描述 |
| --------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| oid | tvprogram.0.tv1.cmd |电视节目适配器实例的数据点。 |
|时间| |如果为空，则将显示实际广播。 |
|时间| 20:15 |如果仅此时间的广播将显示120分钟，则显示第二天|
|时间| 20：15/200 |如果持续时间，则此时的广播将显示200分钟|
|时间| 2021-02-15T20：15：00.000Z |如果日期字符串有效，则将显示该时间的广播。记住时区|
| heightRow | 35 |每行显示的高度|
| broadcastfontpercent | 75 |广播中的字符大小（百分比）|
| Highlightcolor |黄色|最喜欢的颜色|
| dialogwidthpercent | 90 |对话框的大小（以小部件的百分比表示）|
| dialogheightpercent | 90 |对话框的大小（以小部件的百分比表示）|

##### CSS类
请更改w00001为您的小部件ID

更改广播的交替背景色的格式

```css
#w00001 .tv-control .tv-row:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-control .tv-row:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.55);
}

```

＃＃＃＃ 搜索
使用此小部件，您可以搜索标题内的广播，开始日期以及广播类型。
输入字段“发件人”已预填实际日期。如果此字段未更改，则搜索从实际时间开始。
如果将此字段更改为将来或过去的日期，则搜索将从该日期的00:00开始。
必须填写/选择输入字段searchtext和category中的一个或两个。

以下属性可用于在vis中进行配置

|属性|例子描述 |
| --------------------- | ------------------- | ---------------------------------------------------- |
|对象ID | tvprogram.0.tv1.cmd |电视节目适配器实例的数据点。 |
| maxresults | 10 |列表中的最大结果|
| heightRow | 35 |每行显示的高度|
| broadcastfontpercent | 75 |广播中的字符大小（百分比）|
| Highlightcolor |黄色|最喜欢的颜色|
| dialogwidthpercent | 90 |对话框的大小（以小部件的百分比表示）|
| dialogheightpercent | 90 |对话框的大小（以小部件的百分比表示）|

##### CSS类
请更改w00001为您的小部件ID

更改广播的交替背景色的格式

```css
#w00001 .tv-search .tv-row:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-search .tv-row:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.55);
}

```

###提供的数据点
每个创建的电视都存在以下一组数据点

**频道过滤器**

此数据点包含在小部件中显示为JSON-Array的通道

** cmd **

此数据点用于小部件和适配器之间的内部通信

**最喜欢的**

此数据点包含选定的收藏夹作为JSON-Array

**记录**

如果用户单击广播详细信息视图中的“记录”按钮，则将设置此数据点。
提供的数据是

|领域例子描述 |
| ----------- | -------------------------- | ---------------------- |
| startTime | 2021-01-01T00：10：00 + 01：00 |开始时间 |
| endTime | 2021-01-01T00：10：30 + 01：00 |结束时间|
|标题|广播标题|广播标题|
|频道| 7 |唯一频道号|
| channelid | zdf |唯一频道ID |
|频道名称| ZDF |可读的频道名称|
| eventid | 12345678 |唯一广播ID |

**选择频道**

通过单击详细信息视图中的通道徽标或切换图标，此数据点可用于识别通道切换命令。

**展示**

此数据点包含在小部件电视程序中是否仅显示收藏夹或所有内容的状态

**配置**

不推荐使用此数据点，并将在下一版本中将其删除

###提供的Sendto-Commands
可以通过sendto命令从适配器请求所有数据。这可以用来开发个人功能

#### GetServerData
从适配器请求基本数据。

**有效参数为**

*类别
*类型
*频道

**返回：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getServerData","categories",(data)=>console.log(data));
```

#### GetServerTVProgram
从适配器请求程序数据。

**有效参数为**

日期字符串，格式如下：yyyy-mm-dd

**返回：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getServerTVProgram","2021-02-10",(data)=>console.log(data));
```

#### GetServerBroadcast
请求广播的详细数据。

**有效参数为**

包含以下格式的viewdate的对象yyyy-mm-dd广播的eventid

**返回：**

目的

**例子：**

```javascript
sendTo("tvprogram.0","getServerBroadcast",{viewdate:"2021-02-10",eventid:"10659522"},(data)=>console.log(data));
```

#### GetFavoritesDatax
从现在开始请求所有喜欢的广播，直到保存的数据结束。

**有效参数为**

收藏夹数组

**返回：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getFavoritesDatax",['heute','Tagesschau'],(data)=>console.log(data));

```

#### GetServerBroadcastNow
请求当前正在运行的所有广播

**有效参数为**

您喜欢的频道的channelID数组

**返回：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getServerBroadcastNow",[1,6,22,7],(data)=>console.log(data));

```

#### GetServerBroadcastDate
请求在某个日期时间运行的所有广播

**有效参数为**

您喜欢的频道datetime的channelID数组

**返回：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getServerBroadcastDate",{channelfilter:[1,6,22,7],date:"2021-02-10T20:15:00.000Z"},(data)=>console.log(data));

```

#### GetServerBroadcastFind
搜索时间范围内的广播，并且可以选择类别

**有效参数为**

channelfilter：您最喜欢的频道的channelID数组。categoryfilter：可选的categoryID数组datetimefrom：datetime到datetimetill的日期时间：datetime直到textfilter：可选的标题或标题的一部分，以搜索maxresults：可选的最大结果数。默认值为10

**返回：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getServerBroadcastFind",{
    channelfilter:[1,6,22,7],
    categoryfilter:[],
    datefrom:"2021-02-10T10:00:00.000Z",
    datetill:"2021-02-10T23:00:00.000Z",
    textfilter:"",
    maxresults:10
},(data)=>console.log(data));
```

#### GetServerInfo
在适配器内存中请求广播的可用日期

**有效参数为**

空物体

**返回：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getServerInfo","{}",(data)=>console.log(data));

```

###函数未在适配器中实现，但作为javascript-adapter的脚本提供
####记录列表
记录数据点记录并每分钟更新的所有当前记录时间的列表。
您必须配置RecorderList的数据点名称和要观察的数据点的名称。
一旦脚本将记录添加到列表中，记录数据点就会清空。

```javascript
// datapoint where the List should be saved
var recorderListDP = "0_userdata.0.tvprogram.RecorderList";
// datapoint who should be monitored of new data
var recorderDP ="tvprogram.0.tv1.record";

on(recorderDP, function (obj) {
    var recorderList;
    var index;
        console.log(obj.state.val);
    try {
        var recObj = JSON.parse(obj.state.val);
    } catch {
        return;
    }
    var s = getState(recorderListDP).val;
    s = (s=="") ? s="[]":s;
    recorderList = JSON.parse(s) || [];
    index = recorderList.findIndex(function(el) {
        return JSON.stringify(el)==JSON.stringify(recObj);
    });
    if (index>-1) {
        recorderList.splice(index,1);
    }
    recorderList.push(recObj);
    setState(recorderListDP,JSON.stringify(recorderList));
    setState(recorderDP,"");

});
var timer = setInterval(function() {
    var recorderList;
    var s = getState(recorderListDP).val;
    s = (s=="") ? s="[]":s;
    recorderList = JSON.parse(s) || [];
    recorderList=recorderList.filter( (el) => new Date(el.endTime)>new Date());
    setState(recorderListDP,JSON.stringify(recorderList));
},1000*60);
 ```

为了可视化此数据，适配器myTime中的小部件JSON模板可以帮助以下模板。
输入带有记录列表的数据点作为json_oid，并输入以下代码作为json_template：

```javascript
<% data.sort((a,b)=>new Date(a.startTime) - new Date(b.startTime)) %>
<table>
    <th>Datum</th>
    <th>Start</th>
    <th>Ende</th>
    <th>Titel</th>
<% for (var i=0;i<data.length;i++) {%>
<tr>
<td><%- new Date(data[i].startTime).toLocaleDateString() %>%></td>
<td><%- new Date(data[i].startTime).toLocaleTimeString() %></td>
<td><%- new Date(data[i].endTime).toLocaleTimeString() %></td>
<td><%- data[i].channelname %></td>
<td><%- data[i].title %></td>
</tr>
<% } %>
</table>

```

####目前最喜欢的广播
以下脚本每分钟一次确定当前是否正在运行收藏程序。

```javascript
// Favorites datapoint of your tv
var favoritesDP = "tvprogram.0.tv1.favorites";
// channelfilter datapoint of your tv
var channelfilterDP = "tvprogram.0.tv1.channelfilter";
// datapoint where the result should be saved
var favoritesBool ="0_userdata.0.tvprogram.favoriteNow";

var timer = setInterval(function() {
    var favorites = JSON.parse(getState(favoritesDP).val);
    var channelfilter = JSON.parse(getState(channelfilterDP).val);
    sendTo("tvprogram.0","getServerBroadcastNow",channelfilter,(data)=>{
            setState(favoritesBool,data.some((el) => favorites.includes(el.events[0].title)))
    });
},1000*60);

```

####为小程序tvprogram中的记录列表数据点中的程序着色
以下模板用于适配器rssfeed中的小部件JSON模板。
该模板不会生成任何可见的输出，但会生成使当前程序着色的CSS指令。
它还会在详细视图中为记录按钮着色。

要使用此模板，请在小部件属性json_oid中选择记录列表数据点，然后在json_template中插入以下模板

```javascript
<%
  // Insert the IDs of your tvprogram widget IDs
  var widgetArray = ["w00001","w00002"];
  recorderList = data || [];
%>
  <style>
<%
  recorderList.map( (rec) => {
        widgetArray.map( (widget) => {
%>
            #<%= widget %> .broadcastelement[data-eventid="<%= rec.eventid %>"] {
                 background-color: rgba(255,0,0,0.1);
            }
            #<%= widget %>broadcastdlg .event-container.tv-dlg-row[data-eventid="<%= rec.eventid %>"] .record  {
                color: red;
            }
<%      });
    }); %>
  </style>
```

＃＃＃ 功能：
-通过电视频道在时间轴上显示电视数据
-显示有关电视广播的详细信息（如果有）
-通过自动滚动显示实际位置标记
-配置显示的电视频道和顺序，可以通过dragNdrop重新排序。
-单击徽标后通过数据点切换命令
-放大/缩小
-下一天和上一天的导航
-播放按钮切换频道数据点
-中心放大第二天
-回到今天
-重置缩放
-最喜欢的广播
-从Detailview复制文本
-标记位置是可配置的
-对话框的宽度和高度是可配置的
-Datenpunkt记录，der nach druck auf Knopf mit Aufnahmedatengefülltwird
-收藏夹小部件
-隐藏非收藏夹

＃＃＃ 去做
小部件电视节目：

-问题：Firefox无限滚动
-基于现有电视节目脚本的其他小部件的想法
-其他来源的数据适配器（Internet，硬件，例如Enigma，VU-Box）
-~~待讨论：Datenpunkt，mit allen Aufnahmedaten，应该在录像机适配器或单独的脚本中实现~~
-~~用于细节视图的响应设计-> jQuery对话框无法进行响应设计，找到了另一种解决方案，其高度>宽度固定布局~~
-~~问题：如果滚动窗格在左侧完成，则像素出现小故障~~

## Changelog

### 0.0.1
* (oweitman) initial release

## License
MIT License


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

Copyright (c) 2021 oweitman <oweitman@gmx.de>