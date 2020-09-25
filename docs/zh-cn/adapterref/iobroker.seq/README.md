---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.seq/README.md
title: ioBroker.seq
hash: Z3wIYJa4DkCBRw0AVCmkWc/RVCc/+Rkq1ThDdcqM+2Q=
---
![商标](../../../en/adapterref/iobroker.seq/admin/seq.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.seq.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.seq.svg)
![安装数量（最新）](http://iobroker.live/badges/seq-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/seq-stable.svg)
![依赖状态](https://img.shields.io/david/o0shojo0o/iobroker.seq.svg)
![NPM](https://nodei.co/npm/iobroker.seq.png?downloads=true)

＃ioBroker.seq
## IoBroker的Seq适配器
该适配器使您可以将ioBroker日志推送到[顺序](https://datalust.co/seq)系统中

##配置
1.创建适配器的新实例
2.填写[Seq]（https://datalust.co/seq）实例的URL / IP和端口
3.指定要推送到[Seq]（https://datalust.co/seq）的日志事件
4.保存设置

## Changelog
<!--
 https://github.com/AlCalzone/release-script#usage
    npm run release prerelease beta -- --all
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### 0.0.5 (2020-09-23)
* (IdleBit) add param SystemName for display in Seq

### 0.0.4 (2020-09-23)
* (IdleBit) bugfix at the server address check  

### 0.0.3 (2020-09-22)
* (IdleBit) fix minimum js.controller version

### 0.0.2 (2020-09-17)
* (IdleBit) new release for npm...

### 0.0.2-beta.0 (2020-09-16)
* (IdleBit) initial release

### 0.0.1
* (IdleBit) initial push

## License
MIT License

Copyright (c) 2020 Dennis Hinzpeter <info@bastelbunker.de>

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