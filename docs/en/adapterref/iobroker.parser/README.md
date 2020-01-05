![Logo](admin/parser.png)
ioBroker parser adapter
=================
![Number of Installations](http://iobroker.live/badges/parser-installed.svg) ![Number of Installations](http://iobroker.live/badges/parser-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.parser.svg)](https://www.npmjs.com/package/iobroker.parser)
[![Downloads](https://img.shields.io/npm/dm/iobroker.parser.svg)](https://www.npmjs.com/package/iobroker.parser)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.parser.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.parser)

[![NPM](https://nodei.co/npm/iobroker.parser.png?downloads=true)](https://nodei.co/npm/iobroker.parser/)

This adapter parses data received via URL or from a file, by using regular expressions. For each rule being configured in the settings of this adapter, a state will be created under `parser.<instance number>` and filled and updated with the parsed information.

## Settings

### 1. Default poll interval
This default poll interval value will be used, if no individual poll interval value is specified for an entry in the configuration table (column: "Interval"). The interval is in milliseconds and defines how often the link or file is being read and the states are being updated.

**Note:** Do not use a too aggressive poll interval especially for website URLs. For example, if you want to retrieve the price of your shares from a certain website, you probably should be good with an interval of just every 24 hours (= 86400000 ms), if you are not a day trader. If you try to retrieve data from certain URLs too often, the website may ban you and put you on a server blacklist. So please use the poll interval with care.

### 2. Table
Click the "Plus" button to add a new entry to the table.

Table fields:

- ***Name*** - name of state that is being created under `parser.<instance number>`. Spaces are not allowed. You can use dots "." as separator to create sub folders. Example: `Shares.Microsoft.Current` will result in `parser.<instance number>.Shares.Micosoft.Current`.
- ***URL or file name*** - either an URL of a website or the path to a file of which we want to retrieve information. Examples `https://darksky.net/forecast/48.1371,11.5754/si24/de` (weather information Munich), or `/opt/iobroker/test/testdata.txt` (file from within ioBroker).
- ***RegEx*** - regular expression, how to extract data from link. There is a good service to test regula expressions: [regex101](https://regex101.com/). E.g. *temp swip">(-?\d+)˚<* for the line above.
- ***Item*** (German: "Num") - a regex can find (match) multiple entries. With this option you can define which match to be chosen. 0 = first match, 1 = second match, 2 = third match, etc. Default is 0 (first match).
- ***Role*** - one of the roles:
    - custom - user defines itself via *admin" the role
    - temperature - the value is temperature
    - value - the value is a number (e.g. dimmer)
    - blinds - the value is a blind position
    - switch - the value is switch position (true/false)
    - button - the value is a button
    - indicator - boolean indicator
- ***Type*** - the type of variable per the pull-down menu.
- ***Item*** - number of the found element, starting from 0.
- ***Unit*** - Optional: unit of the value added to the state entry. E.g. `°C`, `€`, `GB`, etc.
- ***Old***  - If activated, the state will *not* be updated if the value cannot be read or found in the provided date (URL or file), so it will keep the former value in this case.
- ***Subs*** - Optional: substitute URL or file name. This substitute URL/filename will be used if the URL/file name of the first column is not available.
- ***Factor/Offset*** (for "Type" numbers only) - allows to modify the retrieved data prior to set into the state: 
*calculated value* = *extracted value* * factor + offset , to make immediately modifications of value
- ***Interval*** - poll interval in ms (milliseconds). If blank or 0, the default poll interval will be used. Please see further information above.

## Sample settings
| Name              |      URL or file name                                |      RegEx            | Role         | Type    | Unit | Interval |
|-------------------|:-----------------------------------------------------|:----------------------|--------------|---------|------|----------|
| temperatureMunich | `https://darksky.net/forecast/48.1371,11.5754/si24/de` | `temp swip">(-?\d+)˚<`  | temperature  | number  |  °C  | 180000   |
| forumRunning      | `http://forum.iobroker.net/`                           | `Forum`                 | indicator    | boolean |      | 60000    |
| cloudRunning      | `https://iobroker.net/`                                | `Privacy Notice`        | indicator    | boolean |      | 60000    |
| cpuTemperature    | `/sys/devices/virtual/thermal/thermal_zone0/temp`      | `(.*)`                  | temperature  | number  |  °C  | 30000    |
| stockPrice.Visa    | `https://www.finanzen.net/aktien/visa-aktie`      | `\d{0,3},\d{2}(?=<span>EUR<\/span>)` | value  | number  |  €  | 86400000    |



*Note:* While applying regex to the retrieved URL/file data, all line breaks will be replaced with spaces to allow multi-line search.



## About Regular expressions (RegExp)
Regular expressions are a powerful tool to parse and extract certain data from strings, and even more important: it allows to extract certain values/text from a given string (like from the HTML of a webpage, or text from a file) by applying rules.

For boolean types, the regex is rather simple. For numeric types, you should mark the number with brackets - "()". E.g. to extract the number from *The temperature is 5°C* you should use " (\d+)" expression.

Further information on RegExp:
  * [MDN/Mozilla Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
  * [regex101: online tool to create and test regular expressions](https://regex101.com/)


### Examples
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

### Other useful expressions

- (-?\d+) get number (both negative and positive numbers)

## Quality codes

Values can have quality codes:
- 0 - OK
- 0x82 - The URL or file cannot be read.
- 0x44 - Number or string value not found in the text

## Support
1. General: [ioBroker Forum](https://forum.iobroker.net/). German speaking users: see [ioBroker forum thread Parser-Adapter](https://forum.iobroker.net/topic/4494/adapter-parser-regex).
2. In case of any issues, please check out [ioBroker Parser Adapter: Github Issues](https://github.com/ioBroker/ioBroker.parser/issues).


## Changelog
### 1.0.7 (2018-10-08)
* (bluefox) Comma will be replaced automatically by point for the offset and for the factor

### 1.0.6 (2018-09-22)
* (bluefox) fix parser

### 1.0.5 (2018-08-30)
* (bluefox) Multi-line search allowed

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
