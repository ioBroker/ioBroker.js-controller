![Logo](admin/phantomjs.png)
# ioBroker.phantomjs

![Number of Installations](http://iobroker.live/badges/phantomjs-installed.svg) ![Number of Installations](http://iobroker.live/badges/phantomjs-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.phantomjs.svg)](https://www.npmjs.com/package/iobroker.phantomjs)
[![Downloads](https://img.shields.io/npm/dm/iobroker.phantomjs.svg)](https://www.npmjs.com/package/iobroker.phantomjs)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.phantomjs.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.phantomjs)

[![NPM](https://nodei.co/npm/iobroker.phantomjs.png?downloads=true)](https://nodei.co/npm/iobroker.phantomjs/)

This adapter allows you to create the screen shots of web pages (e.g. flot) and save it as png file or share it via internal WEB-server.

User can later send this file in email or per telegram or whatever.

Slow web clients can display the charts if the charts will be automatically generated every x minutes.

## Prerequire
It is used prebuild package of phantomjs. If for your system the prebuild does not exist, you cannot use this adapter. 
On some linux systems the additional library "libfontconfig" is required. It can be installed as follow:
```
sudo apt-get install libfontconfig
```

## Usage
There are two ways how to create images.

### Via states
By creation of the instance for states will be created:
- **filename** - file name, where the picture will be saved. If path is not absolute, it will be relative to ```.../iobroker/node_modules/iobroker.phantomjs```.
- **width** - width of the picture. Default value 800px.
- **height** - height of the picture. Default value 600px.
- **paging** - Format of the PDF page. File name must end with ".pdf"
- **renderTime** - Interval in ms to wait till the page will be rendered.
- **online** - If requested URL picture must be uploaded to internal web server. It could be accessed then via http://ip:8082/state/phantomjs.0.pictures.filename_png
- **clipTop** - top position of the clip rectangle. Default value 0px.
- **clipLeft** - left position of the clip rectangle. Default value 0px.
- **clipWidth** - width of the clip rectangle. Default value is equal with width. Attention this value will be overwritten every time by the width change.
- **clipHeight** - height position of the clip rectangle. Default value is equal with height. Attention this value will be overwritten every time by the height change.
- **scrollTop** - Scroll top position. Default value 0px.
- **scrollLeft** - Scroll left position. Default value 0px.

After the url state is written, the adapter tries to create the picture and as it created changes the ack flag of **url** state to true.

### Via messages
With the script code, like this:

```
sendTo('phantomjs.0', 'send', {
    url:                    'http://localhost:8082/flot/index.html?l%5B0%5D%5Bid%5D=system.adapter.admin.0.memHeapTotal&l%5B0%5D%5Boffset%5D=0&l%5B0%5D%5Bart%5D=average&l%5B0%5D%5Bcolor%5D=%23FF0000&l%5B0%5D%5Bthickness%5D=3&l%5B0%5D%5Bshadowsize%5D=3&timeArt=relative&relativeEnd=now&range=10&live=false&aggregateType=step&aggregateSpan=300&hoverDetail=false&useComma=false&zoom=false',
    output:                 'picture.png',  // default value
    width:                  800,            // default value
    height:                 600,            // default value
    timeout:                2000,           // default value
    zoom:                   1,              // default value

    'clip-top':             0,              // default value
    'clip-left':            0,              // default value
    'clip-width':           800,            // default value is equal to width
    'clip-height':          600,            // default value is equal to height
    'scroll-top':           0,              // default value
    'scroll-left':          0,              // default value

    online:                 false           // default value
}, function (result) {
    if (result.error) {
        console.error(JSON.stringify(result.error));
    }
    if (result.stderr) {
        console.error(result.stderr);
    }
    if (result.stdout) {
        console.log(result.stdout);
    }
    console.log(result.output);
});
```

you can create a screen shot of some URL. Only **url** field is mandatory all others are optional and will be filled from current settings.  

### PDF Generation
```
sendTo('phantomjs.0', 'send', {
    url:                    'http://localhost:8082/flot/index.html?l%5B0%5D%5Bid%5D=system.adapter.admin.0.memHeapTotal&l%5B0%5D%5Boffset%5D=0&l%5B0%5D%5Bart%5D=average&l%5B0%5D%5Bcolor%5D=%23FF0000&l%5B0%5D%5Bthickness%5D=3&l%5B0%5D%5Bshadowsize%5D=3&timeArt=relative&relativeEnd=now&range=10&live=false&aggregateType=step&aggregateSpan=300&hoverDetail=false&useComma=false&zoom=false',
    output:                 'document.pdf',

    'paper-margin':         '0cm',          // paper-margin or paper-margin-top/paper-margin-left
    'paper-margin-top':     0,
    'paper-margin-left':    0,

    // only one of
    // 1.
    'paper-format':         'A4',           // 'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid': 'paper-format' should be used with 'paper-orientation'
    'paper-orientation':    'portrait',     // 'portrait', 'landscape'

    // 2.
    'paper-width':          200,            // '5in',   '10cm': 'paper-width' should be used 'paper-height'
    'paper-height':         300,            // '7.5in', '20cm'

    timeout:                2000            // default value
}, function (result) {
    if (result.error) {
        console.error(JSON.stringify(result.error));
    }
    if (result.stderr) {
        console.error(result.stderr);
    }
    if (result.stdout) {
        console.log(result.stdout);
    }
    console.log(result.output);
});
```

Supported dimension units are: 'mm', 'cm', 'in', 'px'. No unit means 'px'.

You can read more about phantomJS [here](http://phantomjs.org/api/webpage/property/paper-size.html).

## Changelog

### 1.0.2 (2020-07-24)
* (Apollon77) Add config to automatically install libfontconfig when js-controller 3+ is used
* (Apollon77) Add ignore-ssl-errors=true to parameters to prevent error with self signed ssl certs
* (Apollon77) Adjust state description to not confuse witha static port number :-)

### 1.0.1 (2018-05-04)
* (bluefox) Problem with page size fixed

### 1.0.0 (2018-02-19)
* (bluefox) clipping support
* (bluefox) IMPORTANT: paging is replaces by 'paper-xxx' options.

### 0.1.3 (2017-09-24)
* (bluefox) add pdf support

### 0.1.2 (2016-04-30)
* (bluefox) change package name from phantomjs to phantomjs-prebuilt

### 0.1.0 (2016-04-30)
* (bluefox) add renderTime
* (bluefox) add upload to local web-server

### 0.0.1 (2016-04-28)
* (bluefox) initial commit

## License
Copyright 2016-2020 bluefox <dogafox@gmail.com>.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific 
language governing permissions and limitations under the License.
