---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.proxy/README.md
title: ioBroker.proxy
hash: //IRKnZisUrRTj8PhVbFCytT++DK67nIbOBiUfK1sBs=
---
![商标](../../../en/adapterref/iobroker.proxy/admin/proxy.png)

![安装数量](http://iobroker.live/badges/proxy-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.proxy.svg)
![下载](https://img.shields.io/npm/dm/iobroker.proxy.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.proxy.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.proxy.png?downloads=true)

#ioBroker.proxy
##用法
允许通过一个Web服务器访问定义的URL或本地文件。

指定的路线将在`http://ip:8082/proxy.0/context/...`下提供。当然，端口，协议，`proxy.0`，可以变化取决于设置。

##配置
 - 扩展WEB适配器：对于哪个Web实例将激活此代理。
 - 路径路径：代理路径。如果是“/proxy.0”，那么路由将在`http：// webIP：8082 / proxy.0 / ...下可用
 - 错误超时（ms）：如果请求的资源不可用或返回错误，则重试之间的最小间隔。
 - 使用简单代理：在这种情况下，将使用非常简单但强大的方法。它不适用于Web套接字或POST请求。如果您在WEB实例或socket.io通信中遇到一些问题，请使用此方法。

##样本设置
|上下文|网址|说明|
|----------------|:---------------------------------------------------|:---------------------------------------------------|
| admin / | http：// localhost：8081 |访问管理页面|
|路由器/ | http://192.168.1.1 |访问本地路由器|
| cam / | http：// user：pass@192.168.1.123 |访问网络摄像头（例如，呼叫http：// ip：8082 / proxy.0 / cam / web / snapshot.jpg）|
| dir / | / tmp / |访问本地目录“/ tmp /”|
| dir / | tmp / |访问本地目录“/ opt / iobroker / tmp”|
| file.jpg | /tmp/picture.jpg |访问本地文件“/tmp/picture.jpg”|

**并非所有设备都可以通过代理访问。**

某些设备希望位于根`http://ip/`中，并且不能在`http://ip/proxy.0/context/`下运行。

您可以阅读有关上下文的更多信息[这里](https://www.npmjs.com/package/http-proxy-middleware#context-matching)

此外，用户可以定义代理请求的路由路径。

## Changelog
### 1.1.0 (2019-06-27)
* (bluefox) Implemented simple proxy to eliminate socket.io problem

### 1.0.3 (2018-07-14)
* (bluefox) Newer mime version used

### 1.0.2 (2018-06-30)
* (bluefox) URI was decoded for usage of special chars in password and login

### 1.0.1 (2018-03-01)
* (bluefox) Fixed error: after 10 timeouts the web cam was never reachable
* (bluefox) Ready for Admin3

### 1.0.0 (2017-10-09)
* (bluefox) do not allow the error generation to fast

### 0.2.0 (2017-03-13)
* (bluefox) fix run-mode

### 0.0.1 (2017-01-09)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2019 bluefox <dogafox@gmail.com>

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