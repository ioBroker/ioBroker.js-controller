![Logo](media/parser.png)
ioBroker parser adapter
=================
[![NPM version](http://img.shields.io/npm/v/iobroker.parser.svg)](https://www.npmjs.com/package/iobroker.parser)
[![Downloads](https://img.shields.io/npm/dm/iobroker.parser.svg)](https://www.npmjs.com/package/iobroker.parser)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.parser.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.parser)

[![NPM](https://nodei.co/npm/iobroker.parser.png?downloads=true)](https://nodei.co/npm/iobroker.parser/)

This adapter allows to parse the data received via URL or in files with regular expressions.

## Settings

### Default poll interval
This value will be used, if no poll interval for the entry specified. The interval is in milliseconds and describes how often the link or file will be read.

### Table
With plus button the new entries will be added to the table.

Table fields:

- *Name* - is the state name and may not consist spaces.
- *URL or file name* - is the URL link like *https://darksky.net/forecast/48.1371,11.5754/si24/de* for Munich weather.
- *RegEx* - regular expression, how to extract data from link. There is a good service to test regula expressions: [regex101](https://regex101.com/). E.g. *temp swip">(-?\d+)˚<* for the lin above.
- *Role* - one of the roles:
    - custom - user defines itself via *admin" the role
    - temperature - the value is temperature
    - value - the value is a number (e.g. dimmer)
    - blinds - the value is a blind position
    - switch - the value is switch position (true/false)
    - button - the value is a button
    - indicator - boolean indicator
- *Type* - type of variable. One of boolean, number, string, json.
- *Item* - number of the found element, starting from 0.
- *Unit* - unit of the value. E.g. *°C*
- *Old*  - if the value cannot be read or found on the page so do not update the actual stored value.
- *Subs* - substitute values. This value will be used if file or URL is not available.
- *Factor/Offset* - *calculated value* = *extracted value* * factor + offset , to make immediately modifications of value. Used Only for numbers.
- *Interval* - poll interval in ms. If not set or 0, so the default interval will be used.

## Sample settings
| Name              |      URL or file name                                |      RegEx            | Role         | Type    | Unit | Interval |
|-------------------|:-----------------------------------------------------|:----------------------|--------------|---------|------|----------|
| temperatureMunich | https://darksky.net/forecast/48.1371,11.5754/si24/de | temp swip">(-?\d+)˚<  | temperature  | number  |  °C  | 180000   |
| forumRunning      | http://forum.iobroker.net/                           | Forum                 | indicator    | boolean |      | 60000    |
| cloudRunning      | https://iobroker.net/                                | Privacy Notice        | indicator    | boolean |      | 60000    |
| cpuTemperature    | /sys/devices/virtual/thermal/thermal_zone0/temp      | (.*)                  | temperature  | number  |  °C  | 30000    |

## About Regular expressions
Regular expressions is a powerful tool to parse and extract the data from strings.

You can effectively check if some text is in the string or extract some text from the string into variable.

For boolean types it is enough to write simple RegEx. For numeric types you should mark the number with brackets - "()". E.g. to extract the number from *The temperature is 5°C* you should use " (\d+)" expression.

More about regex can be found here: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp

### Examples:
- *.at* matches any three-character string ending with "at", including "hat", "cat", and "bat".
- *[hc]at* matches "hat" and "cat".
- *[^b]at* matches all strings matched by .at except "bat".
- *[^hc]at* matches all strings matched by .at other than "hat" and "cat".
- *^[hc]at* matches "hat" and "cat", but only at the beginning of the string or line.
- *[hc]at$* matches "hat" and "cat", but only at the end of the string or line.
- *\[.\]* matches any single character surrounded by "[" and "]" since the brackets are escaped, for example: "[a]" and "[b]".
- *s.\** matches s followed by zero or more characters, for example: "s" and "saw" and "seed".
- *[hc]+at* matches "hat", "cat", "hhat", "chat", "hcat", "cchchat", and so on, but not "at".
- *[hc]?at* matches "hat", "cat", and "at".
- *[hc]\*at* matches "hat", "cat", "hhat", "chat", "hcat", "cchchat", "at", and so on.
- *cat|dog* matches "cat" or "dog".
- *(\d+)* - get the number from string
- *now (\w+)* later - get the word between "now" and "later"

### Most useful expressions

- (-?\d+) get the number negative or positive

## Quality codes

Values can have quality codes:
- 0 - OK
- 0x82 - The URL or file cannot be read.
- 0x44 - Number or string value not found in the text

## Changelog

### 1.0.2 (2018-08-06)
* (bluefox) Iterations in regex were corrected

### 1.0.1 (2017-12-10)
* (bluefox) Added additional option: old value

### 1.0.0 (2017-05-19)
* (bluefox) Allow set the number of found item

### 0.2.2 (2017-04-03)
* (Apollon77) fix handling of multiple fields for one URL

### 0.2.1 (2017-02-24)
* (bluefox) fix error with timestamp

### 0.2.0 (2017-02-01)
* (bluefox) Add visual test

### 0.1.1 (2017-01-30)
* (bluefox) move to common group

### 0.0.1 (2017-01-16)
* (bluefox) initial commit
