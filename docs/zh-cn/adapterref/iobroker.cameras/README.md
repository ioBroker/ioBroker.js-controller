---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.cameras/README.md
title: ioBroker.cameras
hash: S2DXJveAgZbhf55Ekua2qiIe7Z08WoOTSOJhirISeaA=
---
![商标](../../../en/adapterref/iobroker.cameras/admin/cameras.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.cameras.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.cameras.svg)
![依赖状态](https://img.shields.io/david/ioBroker/iobroker.cameras.svg)
![已知漏洞](https://snyk.io/test/github/ioBroker/ioBroker.cameras/badge.svg)
![NPM](https://nodei.co/npm/iobroker.cameras.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/ioBroker/ioBroker.cameras/master.svg)

＃ioBroker.cameras
## IoBroker的IP摄像机适配器
您可以将Web / ip摄像机集成到vis和其他可视化中。
如果您将摄像机配置为名称`cam1`，它将在`http(s)://iobroker-IP:8082/cameras.0/cam1`下的Web服务器上可用。

另外，可以通过以下消息请求图像：

```
sendTo('cameras.0', 'image', {
    name: 'cam1',
    width: 100, // optional
    height: 50, // optional
    angle: 90   // optional
}, result => {
    const img = 'data:' + result.contentType + ';base64,' + result.data;
    console.log('Show image: ' + img);
});
```

结果始终为`jpg`格式。

支持的相机：

### URL图像这是正常的URL请求，其中所有参数都在URL中。就像`http://mycam/snapshot.jpg`
###具有基本身份验证的URL图像
这是图像的URL请求，其中所有参数都在URL中，但是您可以提供用于基本身份验证的凭据。就像`http://mycam/snapshot.jpg`

<！-下一个版本的占位符（在该行的开头）：

### __进展中__->

## Changelog
### 0.1.3 (2020-08-08)
* (Hirsch-DE) Parameters were applied

### 0.1.2 (2020-06-03)
* (bluefox) implemented get image by message

### 0.1.0
* (bluefox) URL and URL with basic authentication were implemented

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020 bluefox <dogafox@gmail.com>

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