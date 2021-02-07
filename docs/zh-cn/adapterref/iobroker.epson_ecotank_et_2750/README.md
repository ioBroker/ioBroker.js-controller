---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.epson_ecotank_et_2750/README.md
title: ioBroker.epson_ecotank_et_2750
hash: IUDWowD2F47qpsEbXuEhUQ+yOlzvgfzE2z3VtnW5xyg=
---
![商标](../../../en/adapterref/iobroker.epson_ecotank_et_2750/admin/epson_ecotank_et_2750.png)

![安装数量](https://iobroker.live/badges/epson_ecotank_et_2750-stable.svg?dummy=unused)
![NPM版本](https://img.shields.io/npm/v/iobroker.epson_ecotank_et_2750.svg?dummy=unused)
![资料下载](https://img.shields.io/npm/dm/iobroker.epson_ecotank_et_2750.svg?dummy=unused)
![NPM](https://nodei.co/npm/iobroker.epson_ecotank_et_2750.png?downloads=true)

＃ioBroker.epson_ecotank_et_2750
##适用于ioBroker的EPSON EcoTank ET-2750适配器
该适配器从[爱普生EcoTank ET-2750](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-2750)中读取水箱液位和其他信息，并存储在ioBroker中。

[还支持EPSON EcoTank ET-4750]（https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-4750）（由[Homoran测试]](https://forum.iobroker.net/user/homoran))

##配置
1.创建适配器的新实例
2.填写EPSON EcoTank ET-2750的URL / IP和端口
3.配置同步时间（默认10分钟）
4.保存设置

## Changelog
<!--
 https://github.com/AlCalzone/release-script#usage
    npm run release minor -- --all 0.9.8 -> 0.10.0
    npm run release patch -- --all 0.9.8 -> 0.9.9
    npm run release prerelease beta -- --all v0.2.1 -> v0.2.2-beta.0  
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 0.0.4 (2021-02-01)
* (o0shojo0o) bugfix first_print_date for 4750
* (o0shojo0o) code cleaning and refactoring

### 0.0.3 (2021-01-14)
* (o0shojo0o) add compact mode
* (o0shojo0o) all necessary changes for EPSON EcoTank ET-2750
* (o0shojo0o) new tree structure
* (o0shojo0o) replacing the request with axios npm module

### 0.0.1 (2021-01-03)
* (o0shojo0o) forked from iobroker.epson_stylus_px830 0.2.1

## License

The MIT License (MIT)

Copyright (c) 2021 o0shojo0o

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

---
*Dank an die Erfinder des Basisskripts zum Parsen der Daten, Idittmar und MistyReblaus aus dem [Homematic-Forum](http://homematic-forum.de/forum/viewtopic.php?f=31&t=25140).* :+1: 

*Dank an pix und rr0v1 für die Vorlage