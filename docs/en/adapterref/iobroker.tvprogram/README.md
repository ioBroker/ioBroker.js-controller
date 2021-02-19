![Logo](admin/tvprogram.png)
# ioBroker.tvprogram

[![NPM version](http://img.shields.io/npm/v/iobroker.tvprogram.svg)](https://www.npmjs.com/package/iobroker.tvprogram)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tvprogram.svg)](https://www.npmjs.com/package/iobroker.tvprogram)
![Number of Installations (latest)](http://iobroker.live/badges/tvprogram-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/tvprogram-stable.svg)
[![Dependency Status](https://img.shields.io/david/oweitman/iobroker.tvprogram.svg)](https://david-dm.org/oweitman/iobroker.tvprogram)
[![Known Vulnerabilities](https://snyk.io/test/github/oweitman/ioBroker.tvprogram/badge.svg)](https://snyk.io/test/github/oweitman/ioBroker.tvprogram)

[![NPM](https://nodei.co/npm/iobroker.tvprogram.png?downloads=true)](https://nodei.co/npm/iobroker.tvprogram/)

**Tests:** 
[![Travis-CI](http://img.shields.io/travis/oweitman/ioBroker.tvprogram/master.svg)](https://travis-ci.com/oweitman/ioBroker.tvprogram)
[![AppVeyor Build Status](https://img.shields.io/appveyor/ci/oweitman/iobroker-tvprogram.svg)](https://ci.appveyor.com/project/oweitman/iobroker-tvprogram)


## tvprogram adapter for ioBroker

This adapter polls information about the television program at regular intervals. 
The data can be displayed in various widgets. 

The adapter is in an beta phase in which widgets / functions are still being tested, 
functions / widgets can be added and removed or completely exchanged.

References to issues or feature requests can be left or 
discussed in the iobroker forum in the corresponding thread

To set it up, the adapter must have already accessed and filled the necessary data. 
Due to its size, the data is not stored in data points but in files (Linux path: /opt/iobroker/data-files/tvprogram) and in the adapter's memory.
In the configuration, the widget only needs to be filled with any data point of the adapter (e.g.cmd).
The widget searches for all remaining data points automatically.

## Developer manual
The adapter can currently only be installed via github. This can be done in the iobroker in the "adapter" tab, 
with the expert view via the github button (cat symbol).

Then enter the url of the github repository https://github.com/oweitman/ioBroker.tvprogram in the "any" tab and install it.

### Adapter Configuration

You can configure how much different TVs, or at least different configurations you will have.
### Widgets

Widgets are supported only in modern browsers (Google Chrome, Mozilla Firefox, Opera, Safari).
Not supported Internet Explorer or Microsoft Edge without Chromium (Version <79).

#### Time
This widget shows the current TV program on a timeline by TV channel.

If the text behind the channel logos shows through, a background color must be selected in the widget.
it is generally a good approach to choose an explicit foreground and background color for the view or at least for the widget.
The Marker position ist updated every 15 seconds.

If something goes wrong after installation and the widget isnt diplayed correctly, please try the following command from shell:

iobroker upload all

The following attributes are available for configuration in vis

| Attribute             | Example                  | Description                                                                                                       |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| tvprogram_oid         | tvprogram.0.tv1.cmd      | A Datapoint of a instance of the tvprogram adapter.                                                               |
| widthItem             | 120                      | Standard width in pixels for a 30 minute segment                                                                  |
| heightRow             | 35                       | Height for each displayed line                                                                                    |
| headerfontpercent     | 125                      | Character size in percent for the heading (time)                                                                  |
| broadcastfontpercent  | 75                       | Character size in percent for the broadcasts                                                                      |
| highlightcolor        | yellow                   | color for the favorites                                                                                           |
| markerpositionpercent | 25                       | Position of the Marker in percent ot the widget width                                                             |
| dialogwidthpercent    | 90                       | size of the dialogs in percent of the widget                                                                      |
| dialogheightpercent   | 90                       | size of the dialogs in percent of the widget                                                                      |

##### CSS-Classes
Please change w00001 to your widget ID

To Change the formatting of the dialogs

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

If you use some extra dialogs with other z-index-setting you can set higher z-index for the tvprogram dialogs. 
Maybe you have to set a higher number than 300. This depends on settings in other dialogs which overlap or hide the tvprogram (broadcast info and channel select) dialogs

```css
.ui-dialog.w00001 {
   z-index:300 !important;
}
```

To Change the formatting of the alternating background colors of the broadcasts
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

#### Favorites
This widget shows a list of the selected favorites, sorted by date and time.

The following attributes are available for configuration in vis

| Attribute      | Example              | Description                                         |
| -------------- | -------------------- | --------------------------------------------------- |
| oid            | tvprogram.0.tv 1.cmd | A Datapoint of a instance of the tvprogram adapter. |
| channelname    | no                   | Show logo (off) or channelname                      |
| showweekday    | yes                  | Show Weekday                                        |
| maxfavorites   | 10                   | Max favorites to show                               |
| highlightcolor | yellow               | color for the favorites                             |

#### Control
This widget shows all actual broadcasts. You can click on the channel logo to switch channel.
you can click on the broadcast to get detailed information about thew broadcast.

The following attributes are available for configuration in vis

| Attribute             | Example                  | Description                                                                                        |
| --------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| oid                   | tvprogram.0.tv1.cmd      | A Datapoint of a instance of the tvprogram adapter.                                                |
| time                  |                          | If empty then the actual broadcasts would be shown                                                 |
| time                  | 20:15                    | if time only the broadcast at this time would be shown for 120 minutes, then the next day is shown |
| time                  | 20:15/200                | if time with duration the broadcast at this time would be shown for 200 minutes                    |
| time                  | 2021-02-15T20:15:00.000Z | If valid Datestring, then the broadcast at this tim would be shown. Remember the timezones         |
| heightRow             | 35                       | Height for each displayed line                                                                     |
| broadcastfontpercent  | 75                       | Character size in percent for the broadcasts                                                       |
| highlightcolor        | yellow                   | color for the favorites                                                                            |
| dialogwidthpercent    | 90                       | size of the dialogs in percent of the widget                                                       |
| dialogheightpercent   | 90                       | size of the dialogs in percent of the widget                                                       |

##### CSS-Classes

Please change w00001 to your widget ID

To Change the formatting of the alternating background colors of the broadcasts

```css
#w00001 .tv-control .tv-row:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-control .tv-row:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.55);
}

```

#### Search
With this widget you can search for broadcast within the title, a start date and for a broadcast type.
The input field "From" ist prefilled with the actual date. if this field is unchanged the search starts with the actual time.
if you change this field to a future or past date, the search starts at 00:00 of this date.
One or both of the inputfields searchtext and category must be filled/selected.

The following attributes are available for configuration in vis

| Attribute             | Example             | Description                                          |
| --------------------- | ------------------- | ---------------------------------------------------- |
| Object ID             | tvprogram.0.tv1.cmd | A Datapoint of a instance of the tvprogram adapter.  |
| maxresults            | 10                  | max results in the List                              |
| heightRow             | 35                  | Height for each displayed line                       |
| broadcastfontpercent  | 75                  | Character size in percent for the broadcasts         |
| highlightcolor        | yellow              | color for the favorites                              |
| dialogwidthpercent    | 90                  | size of the dialogs in percent of the widget         |
| dialogheightpercent   | 90                  | size of the dialogs in percent of the widget         |

##### CSS-Classes

Please change w00001 to your widget ID

To Change the formatting of the alternating background colors of the broadcasts

```css
#w00001 .tv-search .tv-row:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-search .tv-row:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.55);
}

```


### Provided Datapoints

The following set of datapoint exists for every created TV

**channelfilter**

this datapoint contains the channels shown in the widget as a JSON-Array

**cmd**

this datapoint is used for internal communication between the widgets and the adapter

**favorites**

this datapoint contains the selected favorites as a JSON-Array

**record**

This datapoint is set if the user clicks the record button in the detail view of a broadcast.
The provided data are

| field       | Example                    | Description            |
| ----------- | -------------------------- | ---------------------- |
| startTime   | 2021-01-01T00:10:00+01:00  | Start time             |
| endTime     | 2021-01-01T00:10:30+01:00  | End time               |
| title       | Title of the broadcast     | title of the broadcast |
| channel     | 7                          | Unique channel number  |
| channelid   | zdf                        | Unique channel id      |
| channelname | ZDF                        | Readable channel name  |
| eventid     | 12345678                   | Unique broadcast id    |


**selectchannel**

This datapoint is used to recognize a channel switch command with a click on the channel logo or the switch icon in the detail view.

**show**

this datapoint contains the status of whether only favorites or everything should be displayed in the widget tvprogram

**config**

this datapoint is deprecated and will be removed in the next versions

### Provided Sendto-Commands

All Data can be requested from the adapter by sendto-commands. this can be used to develop individual functionalities

#### getServerData

Request base data from the adapter. 

**Valid parameters are**

* categories
* genres
* channels

**Returns:**

Array

**Example:**

```javascript
sendTo("tvprogram.0","getServerData","categories",(data)=>console.log(data));
```

#### getServerTVProgram

Request program data from the adapter. 

**Valid parameters are**

a datestring in the following format: yyyy-mm-dd

**Returns:**

Array

**Example:**

```javascript
sendTo("tvprogram.0","getServerTVProgram","2021-02-10",(data)=>console.log(data));
```

#### getServerBroadcast

Request the detail data of a broadcast.

**Valid parameters are**

a object that contains an
viewdate in the following format yyyy-mm-dd
the eventid of the broadcast

**Returns:**

Object

**Example:**

```javascript
sendTo("tvprogram.0","getServerBroadcast",{viewdate:"2021-02-10",eventid:"10659522"},(data)=>console.log(data));
```

#### getFavoritesDatax

Request all favorite broadcast from now till end of saved data.

**Valid parameters are**

Array of favorites

**Returns:**

Array

**Example:**

```javascript
sendTo("tvprogram.0","getFavoritesDatax",['heute','Tagesschau'],(data)=>console.log(data));

```

#### getServerBroadcastNow

Requests all broadcasts that are currently running

**Valid parameters are**

Array of channelIDs of your favorite channels 

**Returns:**

Array

**Example:**

```javascript
sendTo("tvprogram.0","getServerBroadcastNow",[1,6,22,7],(data)=>console.log(data));

```

#### getServerBroadcastDate

Requests all broadcasts that are running at a datetime

**Valid parameters are**

Array of channelIDs of your favorite channels
datetime 

**Returns:**

Array

**Example:**

```javascript
sendTo("tvprogram.0","getServerBroadcastDate",{channelfilter:[1,6,22,7],date:"2021-02-10T20:15:00.000Z"},(data)=>console.log(data));

```

#### getServerBroadcastFind

Search for broadcasts in a range of time and optional with categories

**Valid parameters are**

channelfilter: Array of channelIDs of your favorite channels
categoryfilter: Optional Array of categoryIDs
datetimefrom: datetime from
datetimetill: datetime till
textfilter: Optional title or part of a title to search
maxresults: Optional the max amount of results. Default value is 10

**Returns:**

Array

**Example:**

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

#### getServerInfo

Request available dates of broadcast in the adapter memory

**Valid parameters are**

empty object

**Returns:**

Array

**Example:**

```javascript
sendTo("tvprogram.0","getServerInfo","{}",(data)=>console.log(data));

```


### functions not implemented in the Adapter, but provides as scripts for the javascript-adapter

#### Recordlist

List of all current recording times recorded by the recording data point and updated every minute.
You have to configure the data point name of your RecorderList and the name of the data point to be observed.
As soon as the script has added the recording to the list, the record data point is emptied.

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

To visualize this data, the widget JSON template from the adapter myTime can help with the following template.
Enter as json_oid the datapoint with the recordlist and as json_template the following code:

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

#### Favorite broadcast at the moment
The following script determines once a minute whether a favorite program is currently running.

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
#### Coloring of programs that are located in the recordlist data point in the widget tvprogram

the following template is for the widget JSON template from the adapter rssfeed.
this template does not generate any visible output, but generates css instructions that color the current programs.
it also colors the record button in the detailed view.

to use this template, please select the recordlist datapoint in the widget properties json_oid
and insert the following template in json_template

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


### Functions:

- show tv data on timeline by tv channel
- show details about a tv broadcast if available
- show a marker of actual position with automatic scrolling
- configure displayed tv channels and order, reordering ist possible via dragNdrop.
- switch command via datapoint after click on logo
- zoomin/zoomout
- navigation next and prev days
- play button to switchchannel datapoint
- center zoom in next days
- return to today
- reset zoom
- favorite broadcasts
- copy text from Detailview
- markerposition is configurable
- dialog width and height is configurable 
- Datenpunkt record, der nach druck auf Knopf mit Aufnahmedaten gefüllt wird
- Widget for Favorites
- hide Non-Favorites 

### Todo

widget tvprogram: 
- Problem: endless scroll in firefox
- Ideas for further widgets based on the existing TV program script
- Data adapter for other sources (Internet, hardware such as Enigma, VU-Box)
- ~~to be discussed: Datenpunkt, mit allen Aufnahmedaten, should be implementet at a videorecorder adapter or in a seperate script~~
- ~~responsive design for detail view->no responsive design possible for jquery dialog, found another solution with fixed layouts for height>width~~
- ~~Problem: small Pixel glitch if scroll pane is completle on the left side~~

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