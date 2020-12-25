---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.echarts/README.md
title: ioBroker.echarts
hash: OsS7Fb1g5FHqz4ndcg9s687Fco2rkIKzDDHASbVnskE=
---
![商标](../../../en/adapterref/iobroker.echarts/admin/echarts.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.echarts.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.echarts.svg)
![依赖状态](https://img.shields.io/david/ioBroker/iobroker.echarts.svg)
![已知漏洞](https://snyk.io/test/github/ioBroker/ioBroker.echarts/badge.svg)

＃ioBroker.echarts
## IoBroker的echarts适配器
在ioBroker中构建有用的图表：

![屏幕截图](../../../en/adapterref/iobroker.echarts/img/screenshot1.png)

##用法
重新启动后，在管理员中添加选项卡：![管理员](../../../en/adapterref/iobroker.echarts/img/admin.png)

创建的预设也可以在Web适配器中访问。网址：`http://IP:8082/echarts/index.html?preset=echarts.0.PRESETID`。

可见，有一个特殊的小部件，可以轻松选择预设。

###工具提示
小写的`i`指示该值是从2个邻居值中插入的，并且在此时间戳时不存在。

![工具提示](../../../en/adapterref/iobroker.echarts/img/tooltip.png)

###服务器端渲染
您可以在服务器上呈现预设并将其作为base64 URL获得，或将其保存在ioBroker DB中的磁盘上：

```
sendTo('echarts.0', {
    preset:   'echarts.0.myPreset', // the only mandatory attribute

    renderer: 'svg',                // svg | png | jpg | pdf, default: svg

    width: 1024,                    // default 1024
    height: 300,                    // default 300
    background: '#000000',          // Background color
    theme: 'light',                 // Theme type: 'light', 'dark'

    title: 'ioBroker Chart',        // Title of PDF document
    quality: 0.8,                   // quality of JPG
    compressionLevel: 3,            // Compression level of PNG
    filters: 8,                     // Filters of PNG (Bit combination https://github.com/Automattic/node-canvas/blob/master/types/index.d.ts#L10)

    fileOnDisk: '',                 // Path on disk to save the file.
    fileName: '',                   // Path in ioBroker DB to save the files on 'echarts.0'. E.g. if your set "chart.svg", so you can access your picture via http(s)://ip:8082/echarts.0/chart.png
}, result => {
    if (result.error) {
        console.error(result.error);
    } else {
        console.log(result.data);
    }
});
```

**注意：您无法在启用了缩放功能的触摸设备上启用/禁用图例中的行**

##开发人员手册
**对于非开发人员，此链接无效！**

您可以使用以下命令在本地调试视图图表：

-cd iobroker.echarts / src-chart
-npm运行开始
-浏览器：http：// localhost：8081 / adapter / echarts / tab.html？dev = true

＃＃ 去做
-可见部件（按钮）
-材料小部件
-在文件夹或其附近显示枚举图标

<！-下一个版本的占位符（在该行的开头）：

### __正在进行的工程__->

## Changelog
### 0.4.10 (2020-12-22)
* (bluefox) Allow the hiding of lines at start and show them via legend later
* (bluefox) Use canvas renderer on touch devices to allow zoom and pan

### 0.4.9 (2020-12-21)
* (bluefox) Updated echarts to 5.0
* (bluefox) Implemented copy&paste of lines and markings
* (bluefox) Available vertical legend
* (bluefox) Allowed to hide interpolated values in tooltip

### 0.4.7 (2020-12-13)
* (bluefox) Updated the select ID dialog

### 0.4.6 (2020-12-12)
* (bluefox) Allowed the same names in different folders

### 0.4.5 (2020-12-11)
* (bluefox) Some sentry errors were corrected.
* (bluefox) Added the possibility to show actual values in legend.

### 0.4.4 (2020-12-07)
* (bluefox) Some sentry errors were corrected.

### 0.4.2 (2020-11-29)
* (bluefox) Corrected the error with overflow of axis.

### 0.4.1 (2020-11-29)
* (bluefox) Disconnection errors are caught now.

### 0.4.0 (2020-11-28)
* (bluefox) Added new option: no background

### 0.3.9 (2020-11-28)
* (bluefox) Corrected error with the chart. 

### 0.3.8 (2020-11-27)
* (bluefox) Implemented the conversion of the flot presets into echarts. 

### 0.3.7 (2020-11-17)
* (bluefox) Hide nulls in hover details

### 0.3.6 (2020-11-13)
* (bluefox) The copy of charts is implemented

### 0.3.5 (2020-11-10)
* (bluefox) Corrected SENTRY errors

### 0.3.4 (2020-11-08)
* (bluefox) Corrected server-side rendering of PNG 

### 0.3.1 (2020-10-31)
* (bluefox) Added the color of export button 
* (bluefox) The interpolated values are shown now
* (bluefox) Server-side rendering is implemented

### 0.2.1 (2020-10-25)
* (bluefox) GUI fixes

### 0.2.0 (2020-10-22)
* (bluefox) Implemented the grouping by category.

### 0.1.2 (2020-10-21)
* (bluefox) Added support of multiple charts

### 0.1.1 (2020-10-21)
* (bluefox) initial release

## License
BSD 3-Clause License

Copyright (c) 2019-2020 bluefox <dogafox@gmail.com>
Copyright (c) 2017, Baidu Inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, 
INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, 
OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, 
OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, 
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, 
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.