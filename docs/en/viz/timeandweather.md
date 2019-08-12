---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/timeandweather.md
title: Time & Weather
hash: gobWIDvudg3iW1eszIOA2lKUW5A+/3y5Dr7K9GR2O4c=
---
# Time & Weather
This set provides widgets that can display date, time, and weather forecasts.

| Widget | Picture | Description |
|---------------------------------|-------|-------------|

[Cool clock](#cool-clock) | ! [001] | Analog Clock |
[Flip clock](#flip-clock) | ! [002] | Digital clock in retro style (with animation) |
[Segment Clock](#segment-clock) | ! [7] | Digital clock in 7-segment style |
[Simple Clock](#simple-clock) | [005] | Digital! |
[Simple Date](#simple-date) | [006] | Date! |
[SVG Clock](#svg-clock) | ! [007] | Very variable analog-style clock |
[HTC Weather](#htc-weather) | ! [003] | Time display with weather information -> does not work anymore |
[Yahoo Weather](#yahoo-weather) | ! Weather forecast from Yahoo -> does not work anymore |
[Weather Custom](#weather-custom) | ! [010] | Weather forecast with configurable states |

*********************************************************

### Cool Clock
Analog clock! [001]

Attribute | Description |
---- | ---- |
Topic | Different Presentation Topics Are Available |
Show no seconds | Display without second hand |
Digital |. |
Show am / pm | Time of American style |

** Example: **! [[: arrow_up: back to top](#TimeWeather) ******************************************************************************** **********************

### Flip Clock
Retro style digital clock with animated numbers! [002]

[: arrow_up: back to top](#TimeWeather)  
*********************************************************

### Segment Clock
7-segment digital clock that can display either the current time or a time from a data point.

! [004]

| Attribute | Description |
| ----|----|
| Object ID | Data point, if you do not want the current time displayed |
| Activate clock ||
| Seconds | seconds |
| Template ||
| Segment color AN | Color of active segments |
| Segment color OFF | Color of inactive segments |
| Interval for current text [ms] | Velocity for running text representation |
| Number of segments | 7/14/16 segments per digit |
| Angle of the characters | Incline of the numbers |
| Character height | digit height |
| Character width | digit width |
| Character spacing | Spacing of numbers |
| Segment width | Width of each segment |
| Segment distance | distance between segments |
| Corner type | shape of segments |

** Example: **! [011] [: arrow_up: back to top](#TimeWeather) ******************************** **********************

### Simple CLock
7-segment digital clock showing the current time.

! [005]

Attribute | Description |
---- | ---- Do not show seconds | do not show seconds flashing | ? No style | ?

** Example: **! [012] [: arrow_up: back to top](#TimeWeather) ************************************ **********************

### Simple Date
Date display in 7-segment style for current date.

! [006]

Attribute | Description |
---- | ---- weekday | Show weekday before the date on Short day of the week | Show the day of the week as a shortcut (only if weekday is activated) Short year | Show only the last two digits of the year Zero leading | Leading zeros in day and month Month as text | Month as text Short month | Write out month abbreviation as text USA format | No style |?

** Example: **! [013] [: arrow_up: back to top](#TimeWeather) ************************************ **********************

### SVG Clock
Analog clock with many display options

! [007]

Attribute | Description |
---- | ---- Quarter Text Size | Text size for the quarter hour presentation Quarter Text Color | Text color for the quarter hour presentation Quarter Tick Color | Size of the Quarter Ticks Minute text size | Text size for the minutes presentation Minutes text color | Minutes tint text Small tick color | Minus ticks (every minute) Show seconds | Show second hand Pointer color | Color of hour and minute hand Pointer puck color | Offset color element of hour and min. Hands Second hand color | Color of second hand Text font | Pleading of the numbers

** Example: **! [015] [: arrow_up: back to top](#TimeWeather) ****************************** **********************

### HTC Weather
Weather indicator (does not work anymore because ...?)! [003]

Attribute | Description |
---- | ---- City | Choose weather for this city City name | City name Language | Display language Update interval | Update of weather data

[: arrow_up: back to top](#TimeWeather)  
*********************************************************

### Yahoo Weather
Weather forecast indicator (unusable because the Yahoo Weather Service changed) (see https://developer.yahoo.com/weather/)

! [010]

[: arrow_up: back to top](#TimeWeather)  
*********************************************************

### Weather Custom
Weather forecast display for any weather data sources.
Currently it is recommended to use the data of the adapter 'daswetter'.

! [010]

Attribute | Description |
---- | ---- City | Choose Weather for this City City Name | City Name Language | Display Language

#### Now
Attribute | Description |
---- | ---- Temperature ID | Data point for current temperature Text ID | Data point for weather description text Humidity ID | Data point for humidity Min Temperature ID | Data point for daily minimum temperature Max Temperature ID | Data point for daily maximum temperature Wind speed | Data point for wind speed Wind direction | Data point for wind direction Image URL | Data point with URL to the appropriate weather symbol

#### Morning
Attribute | Description |
---- | ---- Text ID for weather description text Min Temperature ID | Data for low day temperature Max Temperature ID | Highest temperature data point Image URL | Data point with URL to weather icon

So it goes on for the next days (depending on forecasting needs and click-endurance) ...

** Example: **! [016] [: arrow_up: back to top](#TimeWeather) ***************************** **********************

[001]: media/iobroker-vis-timeandweather_timeandweather_coolclock.png

[002]: media/iobroker-vis-timeandweather_timeandweather_flipclock.png

[003]: media/iobroker-vis-timeandweather_timeandweather_htcweather.png

[004]: media/iobroker-vis-timeandweather_timeandweather_segmentclock.png

[005]: media/iobroker-vis-timeandweather_timeandweather_simpleclock.png

[006]: media/iobroker-vis-timeandweather_timeandweather_simpledate.png

[007]: media/iobroker-vis-timeandweather_timeandweather_svgclock.png

[008]: media/iobroker-vis-timeandweather_timeandweather_coolclock_config.png

[009]: media/iobroker-vis-timeandweather_timeandweather_htcweather_config.png

[010]: media/iobroker-vis-timeandweather_timeandweather_yahooweather.png

[011]: media/iobroker-vis-timeandweather_timeandweather_segmentclock_config.png

[012]: media/iobroker-vis-timeandweather_timeandweather_simpleclock_config.png

[013]: media/iobroker-vis-timeandweather_timeandweather_simpledate_config.png

[014]: media/iobroker-vis-timeandweather_timeandweather_svgclock_config.png

[015]: media/iobroker-vis-timeandweather_timeandweather_explain_svgclock.gif

[016]: media/iobroker-vis-timeandweather_timeandweather_explain_CustomWeather.gif