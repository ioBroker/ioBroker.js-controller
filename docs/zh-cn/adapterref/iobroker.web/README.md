---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.web/README.md
title: ioBroker.web
hash: IoxXgKd7pdra/01v8N27ewN+TRl/KFc9cGGYsa3qLd0=
---
![商标](../../../en/adapterref/iobroker.web/admin/web.png)

![安装数量](http://iobroker.live/badges/web-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.web.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.web.svg)
![测验](https://travis-ci.org/ioBroker/ioBroker.web.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.web.png?downloads=true)

＃ioBroker.web
基于Node.js的Web服务器，并表示可以从ioBroker DB中读取文件

##调整Web套接字
在某些网络套接字客户端上，通信存在性能问题。有时，此问题是由于长轮询机制上的socket.io通信回退所致。
您可以设置选项* Force Web-Sockets *强制仅使用Web套接字传输。

##让我们加密证书
阅读[这里](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates)

##扩展
Web驱动程序支持扩展。扩展名是URL处理程序，如果出现此类URL请求，则会调用该处理程序。
这些扩展看起来像普通的适配器，但是它们没有正在运行的进程，将由Web服务器调用。

例如。用户可以激活特殊的代理适配器并访问同一Web服务器中的其他设备（例如Web cam）。
必须让所有服务在一台Web服务器下可用。

##暴力保护
如果启用了身份验证，并且用户在一分钟内输入了5次无效密码，则他必须至少等待一分钟才能进行下一次尝试。
第15次错误尝试后，用户必须等待1个小时。

##“保持登录状态”选项
如果选择此选项，则用户将保持登录状态一个月。
否则，用户将保持登录状态以配置“登录超时”。

## Changelog
### 2.4.8 (2019-10-16)
* (bluefox) Fixed login of non-admin user

### 2.4.6 (2019-10-12)
* (bluefox) Fixed issue with simple-api

### 2.4.4 (2019-06-27)
* (bluefox) Fixed issue with socket.io.js not found

### 2.4.3 (2019-01-14)
* (SchumyHao) Add Chinese support

### 2.4.2 (2018-08-04)
* (bluefox) Fixed error with the access by the version

### 2.4.1 (2018-07-21)
* (bluefox) The support of the versioned links to adapter was added
* (bluefox) WhiteList was corrected
* (bluefox) Custom login background is supported

### 2.4.0 (2018-07-15)
* (bluefox) Pre-settings for instances now supported

### 2.3.6 (2018-06-27)
* (bluefox) URLs were sanitized

### 2.3.5 (2018-06-09)
* (bluefox) Used iobroker.socket.io version 2.1.1
* (bluefox) Authentication problem was fixed

### 2.3.4 (2018-04-27)
* (bluefox) Used socket.io version 2.1.0

### 2.3.3 (2018-04-27)
* (bluefox) Fixing the new version of socket.io

### 2.3.2 (2018-04-14)
* (bluefox) fixed select ID dialog for old style (vis)

### 2.3.1 (2018-04-14)
* (bluefox) Updated socket.io version to 2.1.0

### 2.3.0 (2018-01-24)
* (bluefox) The required for Admin3 libraries are added

### 2.2.0 (2018-01-14)
* (bluefox) Ready for Admin3

### 2.1.9 (2017-11-19)
* (bluefox) Fix link to local admin on welcome screen

### 2.1.7 (2017-10-06)
* (bluefox) Fix link to local admin on welcome screen

### 2.1.4 (2017-10-02)
* (bluefox) Support of iobroker.pro

### 2.0.6 (2017-08-05)
* (bluefox) Fix welcome screen

### 2.0.5 (2017-05-24)
* (bluefox) Update socketio lib

### 2.0.4 (2017-04-25)
* (bluefox) show logout button if connected over cloud

### 2.0.3 (2017-04-01)
 * (bluefox) catch errors for invalid objects

### 2.0.2 (2017-02-08)
* (bluefox) fix selectID dialog

### 2.0.1 (2017-01-28)
* (bluefox) implement new welcome screen

### 2.0.0 (2017-01-05)
* (bluefox) support of web extensions
* (bluefox) protect against brute force attacks

### 1.7.7 (2017-01-04)
* (bluefox) fix error with authentication

### 1.7.6 (2016-12-07)
* (bluefox) Downgrade the socket.io to support older devices

### 1.7.5 (2016-11-14)
* (bluefox) Fix selectID Dialog

### 1.7.4 (2016-11-06)
* (bluefox) Fix unsubscribe of states

### 1.7.3 (2016-10-11)
* (bluefox) use new socketio
* (bluefox) fix config dialog

### 1.7.2 (2016-09-25)
* (bluefox) Fix redirect for login

### 1.7.1 (2016-09-15)
* (bluefox) update selectID dialog

### 1.7.0 (2016-08-30)
* (bluefox) сompatible only with new admin

### 1.6.2 (2016-08-30)
* (bluefox) updated SelectID Dialog

### 1.6.1 (2016-08-27)
* (bluefox) support of letsencrypt

### 1.5.4 (2016-08-14)
* (bluefox) support of web-sockets force

### 1.5.3 (2016-07-27)
* (bluefox) show links if root directory called

### 1.5.2 (2016-07-18)
* (bluefox) fix error with early logout
* (bluefox) update passport.socketio

### 1.5.1 (2016-07-06)
* (bluefox) support of chained certificates

### 1.5.0 (2016-06-29)
* (bluefox) update version of socket.io

### 1.4.8 (2016-06-19)
* (bluefox) bind socket to specifed IP

### 1.4.7 (2016-05-24)
* (bluefox) add version dependency

### 1.4.6 (2016-05-23)
* (bluefox) update selectID dialog

### 1.4.5 (2016-05-17)
* (bluefox) make possible to change language without restart

### 1.4.4 (2016-05-13)
* (bluefox) update socket-io version

### 1.4.3 (2016-04-24)
* (bluefox) use new socket.io version

### 1.4.1 (2016-04-09)
* (bluefox) add grey jquery theme

### 1.4.0 (2016-03-17)
* (bluefox) rename files

### 1.3.5 (2016-03-11)
* (bluefox) update selectId dialog
* (bluefox) enable get files from disk and not from cache, just request http://ip:8082/vis/file.png?something
* (bluefox) update packages

### 1.3.4 (2015-12-25)
* (bluefox) update socketio

### 1.3.3 (2015-12-14)
* (bluefox) add themes

### 1.3.3 (2015-12-14)
* (bluefox) add themes

### 1.3.2 (2015-12-14)
* (bluefox) fix selectID.js
* (bluefox) update socketio

### 1.3.0 (2015-11-15)
* (bluefox) add version compatibility check

### 1.2.2 (2015-11-14)
* (bluefox) support of multi-history

### 1.2.1 (2015-11-10)
* (bluefox) fix default user

### 1.2.0 (2015-11-06)
* (bluefox) support of npm 3.x

### 1.1.1 (2015-11-01)
* (bluefox) some files were missed on npm
*
### 1.1.0 (2015-11-01)
* (bluefox) update jquery UI libs

### 1.0.2 (2015-10-09)
* (bluefox) update selectID dialog

### 1.0.1 (2015-10-06)
* (bluefox) update selectID dialog
* (bluefox) enable resizing of columns in select ID dialog

### 1.0.0 (2015-09-30)
* (bluefox) stop adapter before update

### 0.4.4 (2015-08-14)
* (bluefox) update select ID dialog

### 0.4.3 (2015-08-11)
* (bluefox) fix filter in selectId dialog
* (bluefox) update packages

### 0.4.2 (2015-07-01)
* (bluefox) fix small package.json errors

### 0.4.1 (2015-06-28)
* (bluefox) change login form
* (bluefox) update version of simple-api
* (bluefox) add default user
* (bluefox) temporary enable install over npm
* (bluefox) use xtend 4.0.0

### 0.4.0 (2015-06-13)
* (bluefox) add permissions support

### 0.3.2 (2015-05-20)
* (bluefox) support of subscribeObjects in socketio

### 0.3.1 (2015-04-24)
* (bluefox) make "_socket/info.js" available from every directory

### 0.3.0 (2015-04-23)
* (bluefox) enable https connection and improve login dialog

### 0.2.6 (2015-03-07)
* (bluefox) update socketio

### 0.2.5 (2015-03-04)
* (bluefox) add sysLang variable to info.js (e.g. for Rickshaw)

### 0.2.4 (2015-02-14)
* (bluefox) fix error with update states if used internal socket.io

### 0.2.3 (2015-02-12)
* (bluefox) add simple api
* (bluefox) update select ID dialog

### 0.2.2 (2015-01-20)
* (bluefox) update select ID dialog

### 0.2.1 (2015-01-18)
* (bluefox) update select ID dialog

### 0.2.0 (2015-01-16)
* (bluefox) support of integrated socket (from iobroker.socketio)

### 0.1.12 (2015-01-08)
* (bluefox) update selectId dialog

### 0.1.11 (2015-01-07)
* (bluefox) monitor state of socket.io to give correct connection data

### 0.1.10 (2015-01-06)
* (bluefox) cache web files in memory

### 0.1.9 (2015-01-03)
* (bluefox) update selectId dialog

### 0.1.8 (2015-01-02)
* (bluefox) enable socketio.0 by default

### 0.1.7 (2015-01-02)
* (bluefox) enable npm install

### 0.1.6 (2014-12-28)
* (bluefox) support empty files

### 0.1.5 (2014-12-26)
* (bluefox) extend select ID dialog with jquery Theme-roller

### 0.1.4 (2014-12-25)
* (bluefox) update select ID dialog

### 0.1.3 (2014-12-14)
* (bluefox) include "lib" directory with common files like jquery and jqGrid

### 0.1.2 (2014-12-05)
* (bluefox) read certificates from DB

### 0.1.1 (2014-12-05)
* (bluefox) use readFile instead of request

### 0.1.0 (2014-11-24)
* (bluefox) support of socket.io information

### 0.0.2 (2014-11-02)
* (bluefox) support of read binary states under http://ip:port/state/stateName

#### 0.0.1
* (bluefox) initial commit