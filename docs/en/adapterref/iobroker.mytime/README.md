![Logo](admin/mytime.png)
# ioBroker.mytime

[![NPM version](http://img.shields.io/npm/v/iobroker.mytime.svg)](https://www.npmjs.com/package/iobroker.mytime)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mytime.svg)](https://www.npmjs.com/package/iobroker.mytime)
![Number of Installations (latest)](http://iobroker.live/badges/mytime-installed.svg)
<!--- ![Number of Installations (stable)](http://iobroker.live/badges/mytime-stable.svg) -->
[![Dependency Status](https://img.shields.io/david/oweitman/iobroker.mytime.svg)](https://david-dm.org/oweitman/iobroker.mytime)
[![Known Vulnerabilities](https://snyk.io/test/github/oweitman/ioBroker.mytime/badge.svg)](https://snyk.io/test/github/oweitman/ioBroker.mytime)
[![Travis-CI](http://img.shields.io/travis/oweitman/ioBroker.mytime/master.svg)](https://travis-ci.org/oweitman/ioBroker.mytime)

## mytime adapter for ioBroker

This adapter handle Time (eg: countdown,etc.).
The countdownfunctionality provides datapoints that you can use to manage a countdown (e.g. in a script). The adapter also includes several widgets to visualize these countdowns.

### Configuration
#### Countdown
After installation create a new countdown eg 'test', set timer to 10 seconds and import the following widgets. 
Datapoints are pre configured for a countdown named test.

##### Stop behaviour timer
After the countdown gets the signal stop, the countdown resets to the time set by timer.
##### Stop behaviour zero
After the countdown gets the signal stop, the countdown remains at 0.


### Usage
#### Countdown 

##### Available Datapoints

After configuration of a new countdown the adapter creates the following datapoints:

| datapoint | description                                                               |
|-----------|---------------------------------------------------------------------------|
| action    | actual state of thie countdown. possible values are stop,run,pause,end    |
| cmd       | datapoint for commands. possible commands are described below             |
| start     | datapoint for the start time in milliseconds                              |
| end       | datapoint for the end time in milliseconds                                |
| timer     | datapoint for the total time set in milliseconds                          |

##### Available action states

| action    | description                                                                                           |
|-----------|-------------------------------------------------------------------------------------------------------|
| stop      | the countdown is stopped, start and end time is set to 0                                              |
| run       | the countdown runs. if the countdown reachs the end time. the action switchs to end                   |
| pause     | countdown is in pausemode. the end time was set to the time of the pause                              |
| end       | the countdown is ended. this state you can use as a trigger for further actions (sound, popups, etc.) |                                |

##### Available commands for the cmd datapoint

| command       | example              | description                                                                                           |
|---------------|----------------------|----------------------------------------------------------------------------------------------|
| +value        | +1:10                | adds time to the countdown setting. the setting will be taken into account at the next start |
| -value        | -1:2:3               | subtracts time from the countdown. the setting will be taken into account at the next start  |
| =value        | =5:00                | set the countdowntimer to this time.                                                         |
| #ISO-Date     | #2020-01-01T10:00:00 | set the countdowntimer to a target time. The Time must be formatted as ISO-Datestring        |
| $Time         | $20:15               | set the countdowntimer to a target time. If Time is before current time. the next day is set.|
| start         | start                | starts the countdown                                                                         |
| stop          | stop                 | stops the countdown. the countdown time is reset to the setting                              |
| pause         | pause                | pauses the countdown                                                                         |
| end           | end                  | stops the countdown. the countdown is set to 0                                               |
| setstop2timer | setstop2timer        | set stop behaviour configuration to timer                                                    |
| setstop2zero  | setstop2zero         | set stop behaviour configuration to zeros                                                    |

##### Format of the value for setting the countdown timer

you can set the countdown to an unlimited time. 
the notation of the value is
[days:[hours:[minutes:[seconds]]]]
days,hours and minutes are optional.
if you want to set the timer to one day you have to set hours,minutes and second aswell
you dont have to respect the normal value ranges (eg hours 0-24). you can also set 48 hours.
if you want you can set irregular time notations. the time is summed up seperatly

**Examples**

| setting   | description                                 |
|-----------|---------------------------------------------|
| 1:0:0:0   | set/adds/subtracts 1 day to the timer       |
| 2:0:0     | set/adds/subtracts 2 hours to the timer     |
| 3:0       | set/adds/subtracts 3 minutes to the timer   |
| 120       | set/adds/subtracts 120 seconds to the timer |
| 48:0:0    | set/adds/subtracts 48 hours to the timer    |
| 48:75:120 | set/adds/subtracts the timer                |

##### Format of the template to format the countdown output in the widget

The following placeholders are available:

| placeholder | description                                                     |
|-------------|-----------------------------------------------------------------|
| d           | days without leading zeros                                      |
| dd          | days with leading zeros                                         |
| H           | hours without leading zeros                                     |
| HH          | hours with leading zeros                                        |
| m           | minutes without leading zeros                                   |
| mm          | minutes with leading zeros                                      |
| s           | seconds without leading zeros                                   |
| ss          | seconds with leading zeros                                      |
| \           | Escape character if you want to use a placeholder in the output |

**Examples**

All following Examples with countdown timer 1:2:3:4

| template              | example           | result                                           |
|-----------------------|-------------------|--------------------------------------------------|
| d\d Hh m\m s\s        | 1d 2h 3m 4s       | with escape-characters and without leading zeros |
| dd\d HHh mm\m ss\s    | 01d 02h 03m 04s   | with escape-characters and with leading zeros    |
| ss\s                  | 93784s            | only seconds                                     |
| dd\d HH\h             | 01d 02h           | only days and hours                              |
| HH\h mm\m             | 26h 03m           | only hours and minutes                           |

### Widgets
#### Widget Countdown plain
A countdown widget for a plain textual output
##### Widget Properties
###### oid
The timer datapoint of a countdown datapoint.
###### Format
Formats the timer output. default is mm:ss. for details see Chapter format template
##### Example widget code

the widgets are preconfigured for a countdown named test.
```
[{"tpl":"tplMyTimeCountdownPlain","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"countdown_oid":"mytime.0.Countdown.test.timer","format":"d H m s"},"style":{"left":"771px","top":"143px","width":"151px","height":"16px"},"widgetSet":"mytime"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"+10s","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"+10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"742px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"-10s","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"-10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"801px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"=10","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"=10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"864px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"start","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"start","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"742px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"pause","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"pause","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"801px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"stop","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"stop","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"864px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"}]
```

##### The actual action state (cdstop,cdrun,cdpause,cdend) of the countdown is available as CSS-Class selector.

```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```
#### Widget Countdown Circle
A countdown widget in a ring/circle design. 
##### Widget Properties
###### oid
The timer datapoint of a countdown datapoint.
###### notimetext
Disables the time text over the polar clock
###### Format
Formats the timer output. default is mm:ss. for details see Chapter format template
###### Reverse
Setting for growing or shrinking the ring/circle
###### Width
The width of the ring or circle.
###### Ring gap
Gap in pixel between the rings
###### Caps
Setting for the ends of the ring/circle: round or straight
###### background
Backgroundcolor of the ring/circle
###### foreground
Foregroundcolor of the ring/circle
###### showsec
Show the ring of seconds
###### showmin
Show the ring of minutes
###### showhrs
Show the ring of minutes
###### showday
Show the ring of days

##### The actual action state (cdstop,cdrun,cdpause,cdend) of the countdown is available as CSS-Class selector.

```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

#### Widget Countdown FlipClock
A countdown widget in a airport flip board style 
##### Widget Properties
###### oid
The timer datapoint of a countdown datapoint.
###### countdown_showsec
Shows the seconds-part. there must be no gap between two units.
###### countdown_showmin
Shows the minute-part. there must be no gap between two units.
###### countdown_showhrs
Shows the hours-part. there must be no gap between two units.
###### countdown_showday
Shows the day-part. there must be no gap between two units.
###### countdown_color
Color of the countdowntimer
###### countdown_background_color
Backgroundcolor of the countdowntimer
###### countdown_dot_color
Color of the dots of the countdowntimer

##### Tips
If you want to adjust the size of the countdown flipclock, under css settings in vis you can enter for half size:
Group CSS-Common / transform "scale(0.5)"


##### The actual action state (cdstop,cdrun,cdpause,cdend) of the countdown is available as CSS-Class selector.

```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

#### Widget Countdown NixieClock
A countdown widget in a Nixie-Tube/LED style 
##### Widget Properties
###### oid
The timer datapoint of a countdown datapoint.
###### countdown_showsec
Shows the seconds-part. there must be no gap between two units.
###### countdown_showmin
Shows the minute-part. there must be no gap between two units.
###### countdown_showhrs
Shows the hours-part. there must be no gap between two units.
###### countdown_showday
Shows the day-part. there must be no gap between two units.
###### countdown_color_active
Color of the countdowntimer
###### countdown_color_inactive
Color of the inactiv digits
###### countdown_opacity_inactive
Opacity of the color of the inactive digits
###### countdown_glowcolor
Color of the glow around thie Nixie-digits

##### Tips
If you want to adjust the size of the countdown nixieclock, under css settings in vis you can enter for half size:
Group CSS-Common / transform "scale(0.5)"


##### The actual action state (cdstop,cdrun,cdpause,cdend) of the countdown is available as CSS-Class selector.

```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

## Todo
* 7segment display
* rolling numbers
* customizable fonts
* wordclock timer ?
* timed scheduler: plan single date/time and recurring events like outlook
* ~~Nixie style~~
* ~~flip board display (airport-display)~~
* ~~new command to set only target time without date~~
* ~~countdown circle widget with option to disable countdown text
* ~~Groupseperator '.' in Name~~
* ~~Polar clock~~
* ~~circle reverse~~
* ~~circle with round caps~~

## Changelog


### 0.5.1
* Migration of old counters
### 0.5.0
* Change settings dialog to react
### 0.4.2
* performance optimization. mytime now checks the data from internal and did not read the data allways from datapoints | update dependencies
### 0.4.1
* widget cd flipclock: remove dot labels
### 0.4.0
* New widget NixieClock
### 0.3.1
* remove mytime tile in iobroker overview
* set initial visual countdown value to 0
* prefix css classes, due css artefacts from other adapters (eg kodi and css class stop)
### 0.3.0
* new command to set only target time without date
* countdown circle widget now with option to disable countdown text
* timers are now groupable in subdirectories. you can now enter dots (.) as a groupseperater in the name of a timer
### 0.2.1
* fix timer display in configuration dialog
* fix default template of countdown plain
* add icons for countdonw plain and countdown circle widgets 
* fix startangle calculation for countdown circle if time values are 0
* remove timer intervals in editmode due to interfer with the configuration dialog and didnt save the ne values
### 0.2.0
* extend the countdown circle with more rings for days, hours and minutes
### 0.1.2
* Setting for growing or shrinking the ring/circle
* Setting for the ends of the ring/circle: round or straight
* Extend special char filtering with umlauts
* Fix state request issue in widget countdown circle 
### 0.1.1
* Add a countdown name datapoint
### 0.1.0
* Forum release
### 0.1.0
* initial release

## License
MIT License

Copyright (c) 2020 oweitman <oweitman@gmx.de>

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