---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.phantomjs/README.md
title: ioBroker.phantomjs
hash: wB5lseMg/xyHiORnWgccglXroLLv8OmrbnMbjHmG0Y4=
---
![商标](../../../en/adapterref/iobroker.phantomjs/admin/phantomjs.png)

![安装数量](http://iobroker.live/badges/phantomjs-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.phantomjs.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.phantomjs.svg)
![测验](https://travis-ci.org/ioBroker/ioBroker.phantomjs.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.phantomjs.png?downloads=true)

＃ioBroker.phantomjs
使用此适配器，您可以创建网页的屏幕截图（例如flot）并将其保存为png文件或通过内部WEB服务器共享。

用户以后可以通过电子邮件，电报或其他方式发送此文件。

如果每隔x分钟自动生成图表，则慢速Web客户端可以显示图表。

##先决条件
它用于phantomjs的预构建包。如果对于您的系统，预构建不存在，则不能使用此适配器。
在某些linux系统上，需要附加库“ libfontconfig”。可以如下安装：

```
sudo apt-get install libfontconfig
```

##安装错误
如果出现类似

```
Unexpected platform or architecture: linux/armIt seems there is no binary available for your platform/architecture Try to install PhantomJS globally
```

在安装过程中，我们很抱歉。您需要使用Google并搜索如何在系统上全局安装phantomjs。

##用法
有两种创建图像的方法。

###通过状态
通过创建实例，将创建状态：

-**文件名**-文件名，图片将保存在其中。如果path不是绝对的，它将相对于```... / iobroker / node_modules / iobroker.phantomjs``。
-**宽度**-图片的宽度。预设值800px。
-**高度**-图片的高度。预设值600px。
-**分页**-PDF页面格式。文件名必须以“ .pdf”结尾
-** renderTime **-间隔，以毫秒为单位，直到页面被渲染为止。
-**在线**-如果需要，URL图片必须上传到内部Web服务器。然后可以通过http：// ip：8082 / state / phantomjs.0.pictures.filename_png进行访问
-** clipTop **-剪辑矩形的顶部位置。预设值为0px。
-** clipLeft **-剪辑矩形的左侧位置。预设值为0px。
-** clipWidth **-剪辑矩形的宽度。默认值等于宽度。注意，每次更改宽度都会覆盖该值。
-** clipHeight **-剪辑矩形的高度位置。默认值等于高度。注意，每次更改高度都会覆盖此值。
-** scrollTop **-滚动顶部位置。预设值为0px。
-** scrollLeft **-向左滚动。预设值为0px。

写入url状态后，适配器尝试创建图片，并在创建图片时将** url **状态的ack标志更改为true。

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

您可以创建一些URL的屏幕截图。仅** url **字段为必填字段，其他均为可选字段，并将由当前设置填充。

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

支持的尺寸单位为：“ mm”，“ cm”，“ in”，“ px”。没有单位表示“ px”。

您可以阅读有关phantomJS[这里](http://phantomjs.org/api/webpage/property/paper-size.html)的更多信息。

## Changelog

### 1.1.2 (2020-07-28)
* (Apollon77) added ssl handling to ignore self signed ssl certificates

### 1.1.1 (2020-07-27)
* (Apollon77) libfontconfig automatically installed

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