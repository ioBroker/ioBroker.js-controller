---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/iobroker/ioBroker.phantomjs/edit/master//README.md
title: Screenshots with PhantomJS
hash: w6UxlDY+5VfvYk44dGnqfn7YCQusj9p25QbIPkwoteA=
adapter: true
license: Apache-2.0
authors: bluefox <dogafox@gmail.com>
description: Get web page screenshot (e.g. for flot)
keywords: js, phantomjs
readme: https://github.com/iobroker/ioBroker.phantomjs/blob/master/README.md
mode: daemon
materialize: false
compact: false
published: 2016-04-29T06:04:14.612Z
version: 1.0.1
BADGE-安装数量: http://iobroker.live/badges/phantomjs-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.phantomjs.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.phantomjs.svg
BADGE-测试: https://travis-ci.org/ioBroker/ioBroker.phantomjs.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.phantomjs.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.phantomjs/../../../en/adapterref/iobroker.phantomjs/admin/phantomjs.png)


＃ioBroker.phantomjs ====================
此适配器允许您创建网页的屏幕截图（例如flot）并将其保存为png文件或通过内部WEB服务器共享。

用户以后可以通过电子邮件或电报或其他方式发送此文件。

如果图表将每x分钟自动生成，则慢速Web客户端可以显示图表。

##预先要求
它是使用预制的phantomjs包。如果您的系统不存在prebuild，则无法使用此适配器。
在某些Linux系统上，需要额外的库“libfontconfig”。它可以安装如下：

```
sudo apt-get install libfontconfig
```

##用法
有两种方法可以创建图像。

###通过各州
通过创建状态实例将创建：

 - **filename** - 文件名，将保存图片。如果path不是绝对的，它将相对于```/ iobroker / node_modules / iobroker.phantomjs```。
 -  **宽度**  - 图片的宽度。默认值800px。
 -  **高度**  - 图片的高度。默认值600px。
 - **paging** - PDF页面的格式。文件名必须以“.pdf”结尾
 - **renderTime** - 等待直到页面呈现的ms的间隔。
 -  **在线**  - 如果请求的URL图片必须上传到内部Web服务器。然后可以通过http：// ip：8082 / state / phantomjs.0.filename_png访问它
 - **clipTop** - 剪辑矩形的顶部位置。默认值0px。
 - **clipLeft** - 剪辑矩形的左侧位置。默认值0px。
 - **clipWidth** - 剪辑矩形的宽度。默认值与宽度相等。注意每次宽度变化都会覆盖此值。
 - **clipHeight** - 剪辑矩形的高度位置。默认值与高度相等。注意每次高度变化都会覆盖此值。
 - **scrollTop** - 滚动顶部位置。默认值0px。
 - **scrollLeft** - 向左滚动位置。默认值0px。

写入url状态后，适配器会尝试创建图片，并在创建时将** url ** state的ack标志更改为true。

###通过消息
使用脚本代码，如下所示：

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

您可以创建一些URL的屏幕截图。只有** url **字段是强制性的，所有其他字段都是可选的，将从当前设置填充。

### PDF生成
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

支持的尺寸单位为：'mm'，'cm'，'in'，'px'。没有单位意味着'px'。

您可以阅读有关phantomJS[这里](http://phantomjs.org/api/webpage/property/paper-size.html)的更多信息。

## Changelog
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
Copyright 2016-2018 bluefox <dogafox@gmail.com>.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific 
language governing permissions and limitations under the License.