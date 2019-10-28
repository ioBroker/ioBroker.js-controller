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
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YHPPW474N5CKQ&source=url)

Material Design Widgets based on [Google material components web library](https://github.com/material-components/material-components-web).

### Supported Browser
https://github.com/material-components/material-components-web/blob/master/docs/supported-browsers.md

## Button Toggle
![Logo](doc/media/buttons.gif)

## Card
![Logo](doc/media/cards.png)

## Icon Button
![Logo](doc/media/icon-button.gif)

## List
![Logo](doc/media/list.gif)

## Progress
![Logo](doc/media/progress.gif)

## Slider
![Logo](doc/media/slider.gif)

## Switch
![Logo](doc/media/switch.gif)

## Top App Bar with Navigation Drawer

Information:
* App Bar position is hardcoded and always appears in the upper left corner. Only width and height are adjustable. In the editor you can move the widget, but these settings will not be applied!
* In the editor, effects such as scrolling, etc. are not displayed correctly or behave differently!
* Checkbox "persistent" must be activated!

##### Layout modal:
![Logo](doc/media/topappbar_modal.gif)

##### Layout dismissible:
![Logo](doc/media/topappbar_dismissible.gif)

##### Layout permanent:
![Logo](doc/media/topappbar_permanent.gif)

##### Submenu 
![Logo](doc/media/drawer_subMenu.png)

To activate submenu, you have to add multiple views seperated with '|' into the view field, example:
![Logo](doc/media/drawer_subMenu_views.png)

To change the text of the items, you have to put a json object into the label field with the index of the view field, example:

`{"itemText": "Item with Subitems", "subItems": ["subItem1", "subItem2"]}`

To change the image of the items, you have to a json object into the image filed with the index of the view field, example:

`{"itemImage": "/icons-material-svg/hardware/ic_computer_48px.svg", "subItems": ["/vis/widgets/materialdesign/img/IoBroker_Logo.png", "/icons-material-svg/action/ic_android_48px.svg"]}`

## Changelog

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
