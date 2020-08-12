---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.windows-control/README.md
title: ioBroker.windows控制
hash: n0cN2H2xfyKCu0I/mtx+6KUcirwA3gd/7RDk1+6s09E=
---
![商标](../../../en/adapterref/iobroker.windows-control/admin/windows-control_90.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.windows-control.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.windows-control.svg)
![安装数量（最新）](http://iobroker.live/badges/windows-control-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/windows-control-stable.svg)
![依赖状态](https://img.shields.io/david/Mic-M/iobroker.windows-control.svg)
![已知漏洞](https://snyk.io/test/github/Mic-M/ioBroker.windows-control/badge.svg)
![NPM](https://nodei.co/npm/iobroker.windows-control.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/Mic-M/ioBroker.windows-control/master.svg)

＃ioBroker.windows-control
##用于控制Windows设备的适配器
该适配器可控制Microsoft Windows设备。需要在要控制的每个Windows设备上安装工具GetAdmin。 <br> <strong>非常感谢[弗拉基米尔·维利索夫（Vladimir Vilisov）](https://blog.instalator.ru)的工具GetAdmin！</strong>

**请注意：**此适配器使用Sentry库自动向适配器开发者匿名报告异常和代码错误。有关如何禁用此错误报告的更多详细信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)。 Sentry报告从js-controller 3.0开始使用。

##工具GetAdmin
要使用此适配器，需要在要控制的每个Windows设备上运行工具GetAdmin（版本2.6）。
GetAdmin是单个exe文件（776 kB）。它由Delphi的Vladimir Vilisov编码，并已发布[在他的博客instalator.ru上](https://blog.instalator.ru/archives/47)。
下载：

 1.主要来源：https：//blog.instalator.ru/archives/47
 2.如果不可用，则可以在此适配器的Github站点上[在“文件”文件夹中]（https://github.com/Mic-M/ioBroker.windows-control/tree/master/files）中找到一个副本。

###配置
将`GetAdmin.exe`文件放在Windows设备的任何文件夹中。执行文件并设置以下内容：

1.在“服务器”部分的左上方：
    * IP：ioBroker服务器的IP地址
    *端口：“ 8585”是标准端口。通常，无需更改此端口。
2.在“选项”部分顶部：激活“最小化托盘”和“启动”以自动启动最小化到系统托盘的程序。
3.单击“保存”确认。

![GetAdmin设置](../../../en/adapterref/iobroker.windows-control/img/getadmin-settings.png)

### GetAdmin.exe命令列表中各个条目的示例：
*休眠状态（德语：Ruhezustand）：
    *“命令”列：输入“ m_hibernate”或您选择的其他任何名称（请不要使用空格）
    * PATH或URL列：shutdown
    *列“ PARAMETERS”：`-h`
*备用（德语：Energie备用）：
    *“命令”列：输入“ m_sleep”或您选择的其他任何名称（请不要使用空格）
    * PATH或URL列：rundll32.exe
    *列“ PARAMETERS”：`powrprof.dll，SetSuspendState`

＃＃＃ 更多信息
* ioBroker论坛：
    * [适配器Windows控制]（https://forum.iobroker.net/topic/31485/）
    * [Windows-Steuerung]（https://forum.iobroker.net/topic/1570/windows-steuerung）
    * [ПрограммауправлениякомпьютеромGetAdmin]（https://forum.iobroker.net/topic/1505/）
* GetAdmin的[博客文章]（https://blog.instalator.ru/archives/47）。如果您不熟悉俄语，请使用Google翻译。

## Changelog

### 0.1.5
* (Mic-M) Added [Sentry](https://github.com/ioBroker/plugin-sentry)

### 0.1.4
* (Mic-M) Updated lodash dependency from 4.17.15 to 4.17.19

### 0.1.3
* (Mic-M) Internal only: Correction to support compatibility with js-adapter 3.x, Use gulp for translations (which is resulting in files under admin/i18n/)

### 0.1.2
* (Mic-M) Several fixes.

### 0.1.1
* (Mic-M) Readme updated.

### 0.1.0
* (Mic-M) Add states "_processGetStatus" and "_processGetStatusResult" to check if a Windows process (like Chrome browser) is running or not

### 0.0.3
* (Mic-M) `io-package.json` fixed

### 0.0.2
* (Mic-M) Fixed sendkey issue
* (Mic-M) State _sendKey: provide all supported keys as dropdown and no longer as open text field.
* (Mic-M) Renamed states: sendKey -> _sendKey, connected -> _connection

### 0.0.1
* (Mic-M) Initial release

## License
MIT License

Copyright (c) 2020 Mic-M

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