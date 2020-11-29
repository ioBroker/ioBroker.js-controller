---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.adb/README.md
title: ioBroker.adb
hash: DJ8OQXPjNVglgAUFzwu5+DM1TbuY2as654gOxACSAWI=
---
![商标](../../../en/adapterref/iobroker.adb/admin/adb.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.adb.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.adb.svg)
![依赖状态](https://img.shields.io/david/om2804/iobroker.adb.svg)
![已知漏洞](https://snyk.io/test/github/om2804/ioBroker.adb/badge.svg)
![NPM](https://nodei.co/npm/iobroker.adb.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/om2804/ioBroker.adb/master.svg)

＃ioBroker.adb
##用于ioBroker的adb适配器
使用此适配器，您可以通过Android调试桥控制android设备的某些功能：

-自定义外壳命令
-启动/停止应用程序
- 重启
-截图

###自定义shell命令
要执行shell命令，请将命令写为状态shell。您将始终在“结果”状态下获得答案。

示例：按POWER键**输入键事件POWER **或**外壳输入键事件POWER **

###启动/停止应用程序
启动一个应用程序。用包名称前缀指定组件名称以创建明确的意图。
要启动应用程序，请写意图（* com.example.app / .ExampleActivity *。）以声明** startApp **。

示例：对于KODI，开始编写** org.xbmc.kodi / .Splash **

停止应用程序。强制停止与程序包（应用程序的程序包名称）关联的所有内容。
要停止应用程序，请写程序包名称以声明** stopApp **。

示例：对于KODI停止，请写** org.xbmc.kodi **

＃＃＃ 重启设备
重新启动设备。将任何值写入状态** reboot **。

###截图
截图并保存到适配器的文件夹。写入任何值以表示** screencap **。

##信息
Android调试桥（adb）是一种多功能的命令行工具，可让您与设备进行通信。 adb命令可促进各种设备操作，例如安装和调试应用程序，并提供对Unix shell的访问，您可以使用Unix shell在设备上运行各种命令。

adb包含在Android SDK平台工具包中。您可以使用SDK Manager下载该软件包，然后将其安装在android_sdk / platform-tools /中。为了不安装完整的Android SDK，您可以安装Minimal ADB和Fastboot或使用adbLink

要使用适配器，需要启动adb服务器。
** adb启动服务器**

＃＃＃ 更多信息
[Android调试桥文档](https://developer.android.com/studio/command-line/adb?hl=ru)

## Changelog

### 0.0.4
* (om2804) js-controller dependency upgraded to > 2.0.0

### 0.0.3
* (om2804) fixes ater review

### 0.0.2
* (om2804) start/stop application
* (om2804) reboot device
* (om2804) take screenshot

### 0.0.1
* (om2804) initial release

## License
MIT License

Copyright (c) 2020 om2804 <om2804@mail.ru>

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