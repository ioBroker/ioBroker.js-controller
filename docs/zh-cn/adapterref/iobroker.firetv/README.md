---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.firetv/README.md
title: 无题
hash: /Cz3gDgOPpGgPIThLnFhQpr1VYtUyYP/Jt1QSmkhE58=
---
![商标](../../../en/adapterref/iobroker.firetv/admin/firetv.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.firetv.svg)
![测试](https://img.shields.io/travis/soef/iobroker.firetv/master.svg)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![建立状态](https://secure.travis-ci.org/soef/iobroker.firetv.svg?branch=master)

### IoBroker.firetv
<!--
[![NPM版]（https://badge.fury.io/js/iobroker.firetv.svg）](https://www.npmjs.com/package/iobroker.firetv)
-->

使用此适配器，您可以控制Fire TV或Fire TV Stick的一些功能。
例如。：

- 开关
 - 发送关键事件
 - 将文本字符串发送到输入字段
 - 启动/停止应用程序
- 重启
 - 执行shell命令

####一些信息
此适配器使用“Android Debug Bridge”的功能，称为“adb”。 Adb是Android Developer SDK的一部分。由于Fire TV具有Android操作系统，因此可以通过adb进行控制。

＃＃＃＃ 要求
要使用此适配器，您必须至少安装Anroid SDK的adb数据包。为了不安装完整的Android SDK，您应该安装

 -  *最小的ADB和Fastboot *

在谷歌搜索（最小ADB和Fastboot）获取最新的下载链接。

或者，您可以使用* adbLink *

####安装
在iobroker根目录中执行以下命令（例如在/ opt / iobroker中）

```
npm install iobroker.firetv
```