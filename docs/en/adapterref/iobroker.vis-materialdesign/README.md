![Logo](admin/vis-materialdesign.png)
# ioBroker.vis-materialdesign

![stable version](http://iobroker.live/badges/vis-materialdesign.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.vis-materialdesign.svg)](https://www.npmjs.com/package/iobroker.vis-materialdesign)
[![Number of Installations](http://iobroker.live/badges/vis-materialdesign-installed.svg)](https://www.npmjs.com/package/ioBroker.vis-materialdesign)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-materialdesign.svg)](https://www.npmjs.com/package/ioBroker.vis-materialdesign)
[![Dependency Status](https://img.shields.io/david/Scrounger/iobroker.vis-materialdesign.svg)](https://david-dm.org/Scrounger/iobroker.vis-materialdesign)
[![Known Vulnerabilities](https://snyk.io/test/github/Scrounger/ioBroker.vis-materialdesign/badge.svg)](https://snyk.io/test/github/Scrounger/ioBroker.vis-materialdesign)

[![NPM](https://nodei.co/npm/iobroker.vis-materialdesign.png?downloads=true)](https://nodei.co/npm/iobroker.vis-materialdesign/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/Scrounger/ioBroker.vis-materialdesign/master.svg)](https://travis-ci.org/Scrounger/ioBroker.vis-materialdesign)

## Material Design Widgets for IoBroker VIS
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VWAXSTS634G88&source=url)

ioBroker Material Design Widgets are based on [Google's material design guidelines](https://material.io/design/). The adapter uses the following libraries:
* [Google material components for the web](https://github.com/material-components/material-components-web)
* [Vuetify](https://github.com/vuetifyjs/vuetify)
* [chartjs](https://www.chartjs.org/)
* [round-slider from thomasloven](https://github.com/thomasloven/round-slider)
* [Material Design Icons](https://materialdesignicons.com/)

## Online Example Project
provided by [iobroker.click](https://iobroker.click/index.html), thanks to bluefox and iobroker.

* <a href="https://iobroker.click/vis/index.html?Material%20Design%20Widgets" target="_blank">VIS Runtime</a> (<a href="http://iobroker.click:8082/vis/index.html?Material%20Design%20Widgets" target="_blank">alternativ</a>)
* <a href="https://iobroker.click/vis/edit.html?Material%20Design%20Widgets" target="_blank">VIS Editor</a> (<a href="http://iobroker.click:8082/vis/edit.html?Material%20Design%20Widgets" target="_blank">alternativ</a>)

### Supported Browser
https://github.com/material-components/material-components-web/blob/master/docs/supported-browsers.md

### Supported Browser for vibrate on mobil devices function
https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate

### ioBroker VIS App
not working at the moment, needs to be implemneted by app, see https://github.com/ioBroker/ioBroker.vis.cordova

## Material Design Icons and Images
<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=6><img src="doc/en/media/material-icons.png"></td>
            <td>Some of the widgets support <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a> library. You can pic up an icon from the list above or open the image picker by clicking the button on the right of the input field.<br><br><b>Image colors only applies to the material design icons, not to an image!</b></td>
        </tr>
    </tbody>
</table>

## Button Toggle
![Logo](doc/en/media/buttons.gif)

## Card
![Logo](doc/en/media/cards.png)

## Icon Button
![Logo](doc/en/media/icon-button.gif)

## List
![Logo](doc/en/media/list.gif)

## Progress
![Logo](doc/en/media/progress.gif)

## Slider
![Logo](doc/en/media/slider.gif)

Settings that are not listed in the table below are self-explanatory.

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=6><img src="doc/en/media/slider.png"></td>
            <td>initDelay</td>
            <td>If the slider is not visible or operable after loading the runtime, then this value must be increased. Entry is made in milliseconds.<br>For example, increase by 250 steps until the slider works.</td>
        </tr>
    </tbody>
</table>

## Round Slider
![Logo](doc/en/media/round_slider.gif)

## Switch
![Logo](doc/en/media/switch.gif)

## Select
![Logo](doc/en/media/select.gif)

Settings that are not listed in the table below are self-explanatory.

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=6><img src="doc/en/media/select_autocomplete_settings.png"></td>
            <td>method of data of menu</td>
            <td>There are three methods to define the data of the menu. First is to define it via editor. Second is to define it via a json string. Third method is to define it by three list for values, labels and icons</td>
        </tr>
        <tr>
            <td>Editor: count of menu items</td>
            <td>Method of data of menu: via editor<br>Define the number of menu entries. The the individual menu entries can be defined under menu item[x]</td>
        </tr>
        <tr>
            <td>JSON string</td>
            <td>Method of data of menu: json string<br>Here you can add a JSON string to define the menu entries or use bindings to a datapoint that contains a JSON string.<br><br>JSON string must have the following format:<br>
<code>
[
	{
		"text": "text 0",
		"subText": "sub 0",
		"value": "val0",
		"icon": "account-cancel"
	},
	{
		"text": "text 1",
		"subText": "sub 1",
		"value": "val1",
		"icon": "/vis/icon/info.png"
	},
	{
		"text": "text 2",
		"subText": "sub 2",
		"value": "val2",
		"icon": "facebook-workplace"
	}
]
</code>
            </td>
        </tr>
        <tr>
            <td>value list</td>
            <td>Method of data of menu: value list<br>Define the number of menu entries by adding values that will be set to the datapoint. Entries must be separeted by comma</td>
        </tr>
        <tr>
        <td>value list: labels</td>
            <td>Method of data of menu: value list<br>Define the related labels of the values. Entries must be separeted by comma</td>
        </tr>
        <tr>
        <td>value list: labels</td>
            <td>Method of data of menu: value list<br>Define the related icons of the values. Entries must be separeted by comma. You can use image path or Material Design Icons name</td>
        </tr>                
    </tbody>
</table>

## Autocomplete
![Logo](doc/en/media/autocomplete.gif)

Settings that are not listed in the table below are self-explanatory.

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=6><img src="doc/en/media/select_autocomplete_settings.png"></td>
            <td>method of data of menu</td>
            <td>There are three methods to define the data of the menu. First is to define it via editor. Second is to define it via a json string. Third method is to define it by three list for values, labels and icons</td>
        </tr>
        <tr>
            <td>Editor: count of menu items</td>
            <td>Method of data of menu: via editor<br>Define the number of menu entries. The the individual menu entries can be defined under menu item[x]</td>
        </tr>
        <tr>
            <td>JSON string</td>
            <td>Method of data of menu: json string<br>Here you can add a JSON string to define the menu entries or use bindings to a datapoint that contains a JSON string.<br><br>JSON string must have the following format:<br>
<code>
[
	{
		"text": "text 0",
		"subText": "sub 0",
		"value": "val0",
		"icon": "account-cancel"
	},
	{
		"text": "text 1",
		"subText": "sub 1",
		"value": "val1",
		"icon": "/vis/icon/info.png"
	},
	{
		"text": "text 2",
		"subText": "sub 2",
		"value": "val2",
		"icon": "facebook-workplace"
	}
]
</code>
            </td>
        </tr>
        <tr>
            <td>value list</td>
            <td>Method of data of menu: value list<br>Define the number of menu entries by adding values that will be set to the datapoint. Entries must be separeted by comma</td>
        </tr>
        <tr>
        <td>value list: labels</td>
            <td>Method of data of menu: value list<br>Define the related labels of the values. Entries must be separeted by comma</td>
        </tr>
        <tr>
        <td>value list: labels</td>
            <td>Method of data of menu: value list<br>Define the related icons of the values. Entries must be separeted by comma. You can use image path or Material Design Icons name</td>
        </tr>                
    </tbody>
</table>

## Top App Bar with Navigation Drawer

Top App Bar with Navigation Drawer can be combined with the <a href="https://www.iobroker.net/#en/documentation/viz/basic.md">view in widget 8</a>.

<b>Take a look at the [Material Design Widgets example project](https://github.com/Scrounger/ioBroker.vis-materialdesign#online-example-project)</b> to understand how it works.

##### Layout modal:
![Logo](doc/en/media/topappbar_modal.gif)

##### Layout permanent:
![Logo](doc/en/media/topappbar_permanent.gif)

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=3><img src="doc/en/media/topappbar_settings.png"></td>
            <td>Object ID</td>
            <td>must be set to a datapoint from typ number. For example this datapoint can be used by <a href="https://www.iobroker.net/#en/documentation/viz/basic.md">view in widget 8</a></td>
        </tr>
        <tr>
            <td>show index of navigation items</td>
            <td>shows the index of navigation before the item label. This number can be used in <a href="https://www.iobroker.net/#en/documentation/viz/basic.md">view in widget 8</a> to define the view that should be shown if the item is selected</td>
        </tr>
        <tr>
            <td>count of navigation items</td>
            <td>Define the count of the navigations items</td>
        </tr>
    </tbody>
</table>

### Submenu 
![Logo](doc/en/media/drawer_subMenu.png)

Settings that are not listed in the table below are self-explanatory.

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=1><img src="doc/en/media/drawer_subMenu_views.png"></td>
            <td>count of sub menus[x]</td>
            <td>Define if the navigation item has submenus and the count of submenus.</td>
        </tr>
        <tr>
            <td rowspan=1><img src="doc/en/media/drawer_subMenu_labels.png"></td>
            <td>label[x]</td>
            <td>To change the text of the items, you have to put a json object into the label field with the index of the view field.<br>
                Example:<br>

`{"itemText": "Item with Subitems", "subItems": ["subItem1", "subItem2"]}`

Result: see screenshot</td>
        </tr>
        <tr>
            <td rowspan=1><img src="doc/en/media/drawer_subMenu_icons.png"></td>
            <td>icon[x]</td>
            <td>To change the icons of the items, you have to put a json object into the icons field with the index of the view field.<br>
                Example:<br>

`{"itemImage": "/icons-material-svg/hardware/ic_computer_48px.svg", "subItems": ["/vis/widgets/materialdesign/img/IoBroker_Logo.png", "/icons-material-svg/action/ic_android_48px.svg"]}`

Result: see screenshot</td>
        </tr>
    </tbody>
</table>

## Charts

### Line History Chart:

> Required Adapter: [SQL](https://github.com/ioBroker/ioBroker.sql), [History](https://github.com/ioBroker/ioBroker.history) or [InfluxDb](https://github.com/ioBroker/ioBroker.influxdb)!

![Logo](doc/en/media/line_history_chart.gif)

Settings that are not listed in the table below are self-explanatory.

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=6><img src="doc/en/media/line_hostory_chart_general.png"></td>
            <td>adapter instance</td>
            <td>Instance for the sql or history adapter</td>
        </tr>
        <tr>
            <td>aggregation</td>
            <td><a href="https://www.iobroker.net/docu/index-195.htm?page_id=198&lang=en#Aggregation">link</a></td>
        </tr>
        <tr>
            <td>max. number of data points to be displayed</td>
            <td>Number of maximum data points to display</td>
        </tr>
        <tr>
            <td>time interval between the data points in [s]</td>
            <td>Optional setting, overrides the 'count' setting.<br>Distance between the individual data points in seconds.<br>For example, if you want to display data points every minute, you have to enter 60 here</td>
        </tr>
        <tr>
            <td>controlling time interval using object</td>
            <td>Id of a datapoint to change the time interval of the chart. The data point must be a string and may contain <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/235530e4e54346b5527333ca06ce596519954c67/widgets/materialdesign/js/materialdesign.chart.js#L802">the linked values</a><br>For example, you can use a button here to change the display of the chart during runtime</td>
        </tr>
        <tr>
            <td>boolean object for update</td>
            <td>Id of adatapoint to trigger a manual refresh of the chart.<br>For example, you can use a button here to refresh the chart during runtime</td>
        </tr>
        <tr>
            <td><img src="doc/en/media/line_hostory_chart_xAxis_layout.png"></td>
            <td>time formats of x-axis</td>
            <td>Change the time format of the X-axis. Time formats must be entered for all time units, <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">the following time units are permitted.</a><br>Approved time formats must be entered according to the moment.js library, <a href="https://momentjs.com/docs/#/displaying/">see link</a></td>
        </tr>
        <tr>
            <td><img src="doc/en/media/line_hostory_chart_tooltip_layout.png"></td>
            <td>tooltip time formats</td>
            <td>Change the time format of the tooltip. Time formats must be entered for all time units, <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">the following time units are permitted.</a><br>Approved time formats must be entered according to the moment.js library, <a href="https://momentjs.com/docs/#/displaying/">see link</a></td>
        </tr>
    </tbody>
</table>

## Table
![Logo](doc/en/media/table.gif)


##### Input Data
Input data must be a json array of objects, example:
```
[
{"img":"/vis.0/myImages/erlebnis_50.png","name":"Empire","betriebszeit":"4h 06m","funk":"5G","ip":"10.0.0.1"},
{"img":"/vis.0/myImages/erlebnis_100.png","name":"Handy","betriebszeit":"13m","funk":"5G","ip":"10.0.0.2"},
{"img":"/vis.0/myImages/erlebnis_100.png","name":"Harmony Hub - Wohnzimmer","betriebszeit":"18T 07h 21m","funk":"2G","ip":"10.0.0.3"},
{"img":"/vis.0/myImages/erlebnis_25.png","name":"MusicCast - Esszimmer (WX-030)","betriebszeit":"1h 57m","funk":"2G","ip":"10.0.0.4"},
{"img":"/vis.0/myImages/erlebnis_75.png","name":"MusicCast - K�che (ISX-18D)","betriebszeit":"4h 10m","funk":"2G","ip":"10.0.0.5"}
]
```

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=2><img src="doc/en/media/table_general.png"></td>
            <td>switch</td>
            <td>Datapoint from type string with input data as shown above</td>
        </tr>
        <tr>
            <td>data as JSON</td>
            <td>Optional, input data as shown above if no oid datapoint is set</td>
        </tr>
        <tr>
            <td rowspan=4><img src="doc/en/media/table_column.png"></td>
            <td>colType[x]</td>
            <td>If image is selected, object property must have the path to the image (<a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#input-data">see above</a>)</td>
        </tr>
        <tr>
            <td>prefix[x]</td>
            <td>Prefix for object property, internal object binding (<a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#internal-object-binding">see below</a>) and html can be used</td>
        </tr>
        <tr>
            <td>suffix[x]</td>
            <td>Suffix for object property, internal object binding (<a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#internal-object-binding">see below</a>) and html can be used</td>
        </tr>
        <tr>
            <td>object name for sorting[x]</td>
            <td>Here you can define an other object property that should be used for sorting.</td>
        </tr>
    </tbody>
</table>

##### internal object binding
prefix & suffix supports table internal object binding -> you can access other properties of object by using
```
#[obj.'propertyName']
```

Example see <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#input-data">see above</a>.

Working Widget Example can be found [here](https://forum.iobroker.net/topic/26199/test-adapter-material-design-widgets-v0-1-x/113)

## Column Views - decrepated !!!

Column Views has multiple `view in widget` integrated, that will be ordered automatically depending of the width of the widget. With this widget it is possible to cereate a responsive layout (one layout for desktop, tablet and mobil)

<b>Take a look at the [Material Design Widgets example project](https://github.com/Scrounger/ioBroker.vis-materialdesign#online-example-project)</b> to understand how it works.

![Logo](doc/en/media/column_views.gif)

<table>
    <thead>
        <tr>
            <th>Screenshot</th>
            <th>Setting</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=2><img src="doc/en/media/column_views_common.png"></td>
            <td>number of columns</td>
            <td>define number of columns</td>
        </tr>
        <tr>
            <td>minmal width</td>
            <td>minimal width of each column. For example use the width of the resolution of a mobil device</td>
        </tr>
        <tr>
            <td rowspan=2><img src="doc/en/media/column_views_col_settings.png"></td>
            <td>views in column[x]</td>
            <td>Define the views that should be shown in this column. Multiple views must be separated by '|'</td>
        </tr>
        <tr>
            <td>height of views in column[x]</td>
            <td>Define the height of each view in the column. Multiple heights must be separated by '|'</td>
        </tr>
    </tbody>
</table>

## Changelog

### 0.2.xx
* (Scrounger): use of Material Design Icons as images added
* (Scrounger): Perfomrance optimized
* (Scrounger): Input Widget added
* (Scrounger): Masonry Views Widget: settings options for mobile phone and tablet added
* (Scrounger): Masonry Views Widget: another chrome bug fix, option for distance between views added
* (Scrounger): Round Slider: vibrate on mobil devices added
* (Scrounger): bug fixes

### 0.2.32
* (Scrounger): Editor translation bug fix
* (Scrounger): Masonry Views Widget: alignment bug fix for chrome
* (Scrounger): Line History Chart Widget: layout option for line values added
* (Bluefox): Russian translation revised

### 0.2.30
* (Scrounger): Masonry Views Widget added
* (Scrounger): Select Widget: background color bug fix
* (Scrounger): Column Views Widget added
* (Scrounger): Button Widgets: icon height bug fix
* (Scrounger): Vuetify API bug fix
* (Scrounger): Chart Widgets: localization added
* (Scrounger): Line History Chart Widget: color options for each y-axis added
* (Scrounger): Line History Chart Widget: x-axis boundary options added
* (Scrounger): Line History Chart Widget: x-axis scaling bug fix
* (Scrounger): TopAppBar Widget: `view in widget 8` removed -> old TopAppBar Widget will be removed in version 0.3.x
* (Scrounger): bug fixes

### 0.2.22
* (Scrounger): library material-components-web updated to v4.0.0
* (Scrounger): Table: support for objects added
* (Scrounger): List: layout checkbox disabled added
* (Scrounger): vuetify slider added -> old slider will be removed in version 0.3.x
* (Scrounger): vuetify library v2.1.15 added
* (Scrounger): bug fixes

### 0.2.9
* (Scrounger): translations added
* (Scrounger): select Widget: color options added
* (Scrounger): slider Widget: color options added
* (Scrounger): bug fixes

### 0.2.7
* (Scrounger): List Widget: types switch readonly, checkbox readonly & button toggle readonly added
* (Scrounger): Line History Chart Widget: bug fix for hide yaxis by legend click if common axis is set
* (Scrounger): Line History Chart Widget: option to append text to yAxis values added
* (Scrounger): Switch Widget: color options added
* (Scrounger): chartjs lib updated to v2.9.3
* (Scrounger): round-slider: lib updated to v0.3.7
* (Scrounger): Table Widget: wordwrap & width option added
* (Scrounger): Chart Widgets: option for background color of diagram area added

### 0.2.4
* (Scrounger): Round Slider Widget bug fixes
* (Scrounger): Line History Chart Widget: null value bug fix
* (Scrounger): Line History Chart Widget: tooltip bug fix
* (Scrounger): Line History Chart Widget: editor translation improved
 
### 0.2.0
* (Scrounger): Round Slider Widget added
* (Scrounger): Icon Button Adition Widget added
* (Scrounger): Button Adition Widget added
* (Scrounger): Line History Chart Widget added
* (Scrounger): Table Widget added
* (Scrounger): Dialog iFrame Widget added
* (Scrounger): Dialog View Widget added
* (Scrounger): Select Widget added
* (Scrounger): colorSchemes for Charts added
* (Scrounger): bug fixes

### 0.1.5
* (Scrounger): bar chart added
* (Scrounger): pie chart added
* (Scrounger): bug fixes

### 0.1.2
* (Scrounger): list: right label option added
* (Scrounger): slider: value text option for lees or greather than added
* (Scrounger): switch: support for non boolean values added
* (Scrounger): checkbox: support for non boolean values added
* (Scrounger): buttons: image position option added
* (Scrounger): toggle buttons: support for non boolean values added
* (Scrounger): topAppBar: z-Index added
* (Scrounger): haptic feedback (vibration) option for mobil browser added
* (Scrounger): editor text fields changed to html
* (Scrounger): mdc-typography font styles added
* (Scrounger): bug fixes

### 0.1.1
* (Scrounger): bug fixes

### 0.1.0
* (Scrounger): Top App Bar Submenu added
* (Scrounger): List added
* (Scrounger): Button vertical State, Link, Nav added
* (Scrounger): Icon Button State, Link, Nav added
* (Scrounger): initialize slider bug fixes
* (Scrounger): moved hard coded styling options to css
* (Scrounger): styling options extended
* (Scrounger): bug fixes

### 0.0.7
* (Scrounger): Top App Bar Layouts added
* (Scrounger): Top App Bar customizing options added
* (Scrounger): Top App Bar Navigation Drawer backdrop layout added
* (Scrounger): Button State added
* (Scrounger): Button Link added

### 0.0.6
* (Scrounger): Top App Bar with Navigation Drawer added
* (Scrounger): Checkbox added
* (Scrounger): bug fixes
 
### 0.0.5
* (Scrounger): icon button Toggle added
* (Scrounger): color pressed for buttons added
* (Scrounger): Slider bug fix & label for value <= min / >= max added
* (Scrounger): translation added

### 0.0.4
* (Scrounger): cards added

### 0.0.3
* (Scrounger): progress added
 
### 0.0.2
* (Scrounger): slider vertical added
* (Scrounger): switch added
* (Scrounger): button toggle added

### 0.0.1
* (Scrounger) initial release

## License
MIT License

Copyright (c) 2019 Scrounger <scrounger@gmx.net>

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
