---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.owfs/README.md
title: ioBroker OWFS适配器
hash: w4iaPF0/v9YW60yr3gLQaEQPm5p2VBWypsVIKvgvFQk=
---
![商标](../../../en/adapterref/iobroker.owfs/admin/owfs.png)

![安装数量](http://iobroker.live/badges/owfs-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.owfs.svg)
![下载](https://img.shields.io/npm/dm/iobroker.owfs.svg)
![NPM](https://nodei.co/npm/iobroker.owfs.png?downloads=true)

#ioBroker OWFS适配器
## * ioBroker的一个有线文件系统*适配器。
支持的

此适配器使用来自https://www.npmjs.com/package/owjs的owfs库，因此需要owfs服务器。

##安装OWFS Linux
```sudo apt-get install owfs```

有时您需要编写以下步骤：

 - 启动服务器以通过串行接口与1wire传感器进行通信

```
owserver -d "/dev/ttyUSB0" --nozero
```

* / dev / ttyUSB0 *是串行设备的名称。这是用于它的USB记忆棒。

此命令在本地端口4304上启动1wire服务器。

 - 要在文件系统调用follwing命令中显示本地1wire服务器的数据：

```
owfs -C -m /mnt/1wire --allow_other
```

必须使用命令`mkdir /mnt/1wire`创建directroy */ mnt / 1wire* 前

##安装OWFS窗口
http://sourceforge.net/projects/owfs/

##安装
```node iobroker.js add owfs```

##配置

## Changelog
### 0.5.0 (2018-03-16)
* (bluefox) Ready for Admin3

### 0.4.1 (2017-05-29)
* (ausHaus) fix translations

### 0.4.0 (2017-02-26)
* (bluefox) support iButtons

### 0.3.4 (2016-08-28)
* (bluefox) filter out service entries by list

### 0.3.3 (2016-08-25)
* (bluefox) custom poll interval for every sensor

### 0.3.2 (2016-08-24)
* (bluefox) support of local OWFS via file system

### 0.2.2 (2016-07-29)
* (bluefox) add new datapoints: pressure, volts, ...

### 0.2.1 (2016-07-28)
* (bluefox) fixes of write

### 0.2.0 (2016-07-27)
* (bluefox) discover sensors
* (bluefox) use other npm library to fix write

### 0.1.1 (2016-07-25)
* (bluefox) check configuration

### 0.1.0 (2016-07-08)
* (bluefox) remove rooms
* (bluefox) fix creation of states
* (bluefox) convert states to numbers
* (bluefox) support of quality codes

### 0.0.1 (2014-11-02)
* (bluefox) support of server (actual no authentication)

## License

The MIT License (MIT)

Copyright (c) 2015-2018, bluefox

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