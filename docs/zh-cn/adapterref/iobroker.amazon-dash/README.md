---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.amazon-dash/README.md
title: ioBroker.amazon-dash（仅限Linux！）
hash: hWxDnluOOhyr4iw6DK5Iw5DtyogXIWBqdS1Cfi5xUdk=
---
![商标](../../../en/adapterref/iobroker.amazon-dash/admin/amazon-dash.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.amazon-dash.svg)
![下载](https://img.shields.io/npm/dm/iobroker.amazon-dash.svg)
![NPM](https://nodei.co/npm/iobroker.amazon-dash.png?downloads=true)

#ioBroker.amazon-dash（仅限Linux！）=================
适用于向ioBroker添加Amazon Dash按钮的适配器

＃＃ 脚步
1.安装libpcap-dev

```apt-get install libpcap-dev```

2.将您的Dash-Adapter配对在Amazon App中，但不要选择产品！

只需退出产品选择选项卡上的安装过程。
否则，您每次订购产品时都会订购;）[德语说明](https://www.amazon.de/gp/help/customer/display.html?nodeId=201746340)。

3.点击破折号按钮（首先应为白色，然后闪烁红色）

4.在适配器对象中，应出现一个新的破折号按钮，可用于启动场景或JS适配器

＃＃ 把招工广告！
由于这个项目是在我的业余时间开发的，我积极寻求帮助来维护和扩展这个lib！如果你愿意帮忙，请给我留言！

## Changelog

### 0.3.1
+ (PArns) Added new Amazon MAC family

### 0.3.0
+ (foxriver76) materialize ui
+ (foxriver76) dash buttons are now of type device

### 0.2.9
+ (cernst1980) Ignore duplicate ARPs for 5 seconds
+ (PArns) Added new Amazon MAC family

### 0.2.8
+ (offline4ever) Added new Amazon MAC family

### 0.2.7
+ (arteck) fixed MAC parsing

### 0.2.6
+ (arteck) edit admin
+ (arteck) add manual MAC Adresses 
+ (PArns) Added new Amazon MAC family

### 0.2.5
+ (PArns) Added new Amazon MAC family

### 0.2.4
+ (PArns) Added new Amazon MAC family

### 0.2.3
+ (PArns) Added new Amazon MAC family

### 0.2.2
+ (PArns) Added new Amazon MAC family
+ (PArns) Fixed function name in description

### 0.2.1
+ (PArns) Added new Amazon MAC family

### 0.2.0
+ (PArns) Simplified MAC lookup (thx to GermanBluefox)

### 0.1.2
+ (PArns) Added new Amazon MAC family

### 0.1.1
+ (GermanBluefox) Try to install libpcap-dev automatically

### 0.1.0
+ (Niksac) Added the ability to select an interface

### 0.0.5
+ (PArns) Fixed lastPushed
+ (PArns) Fixed GIT dependency which might cause problems on some systems

### 0.0.4
+ (PArns) Removed debug infos

### 0.0.3
+ (PArns) Fixed switch state

### 0.0.2
* (PArns) Added switch state, which toggles between true and false
* (PArns) Changed License

### 0.0.1
* (PArns) Initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2017 Patrick Arns <npm@patrick-arns.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.