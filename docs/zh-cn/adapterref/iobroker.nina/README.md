---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nina/README.md
title: ioBroker.nina
hash: odSTrZwJDkv0OJaiU4jx+IZgY6uZ0iDDEMDC7G9iFVA=
---
![商标](../../../en/adapterref/iobroker.nina/admin/nina.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.nina.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.nina.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.nina.svg)
![已知漏洞](https://snyk.io/test/github/TA2k/ioBroker.nina/badge.svg)
![NPM](https://nodei.co/npm/iobroker.nina.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/TA2k/ioBroker.nina/master.svg)

＃ioBroker.nina
## IoBroker的Nina适配器
Notfall-Informations-和Nachrichten-App

<https://www.bbk.bund.de/DE/NINA/Warn-App_NINA_node.html>

<https://warnung.bund.de/>

＃＃＃ 入门
模具AGS负责设计AGS eingeben。

AGS（AmtlicherGemeindeschlüssel）博物馆：AGS博物馆/ Gemeinde博物馆：

<https://www.statistikportal.de/de/gemeindeverzeichnis>

###错误请求错误{“ errno”：“ EPROTO”，“ code”：“ EPROTO”，“ syscall”：“ write”}
在Debian Buster和RP4音乐网站上，您可以在以下网站上正常浏览：

在/etc/ssl/openssl.cn中的位置：

[system_default_sect] MinProtocol = TLSv1.2 CipherString = DEFAULT @ SECLEVEL = 2

于：[system_default_sect] MinProtocol = TLSv1.2 CipherString = DEFAULT @ SECLEVEL = 1

## Changelog

### 0.0.24
- (thost96) fixed broken link in README
- (thost96) added icon with transparent background for admin ui
- (thost96) updated link on admin ui to the same as on this README as old link was broken

### 0.0.23

- (tomboxi) Convert all state changes to async.

### 0.0.22

- (tomboxi) Optionen zum Filtern und JSON Ausgabe hinzugefügt.

### 0.0.19

- (tomboxi) Auslastung reduziert. Objekte werden nur geändert wenn die Warnungen sich ändern.

### 0.0.17

- (tomboxi) Fehlerbehandlung verbessert. Option zum Deaktiveren der Area Objekte hinzugefügt.

### 0.0.13

- (tomboxi) Identifierliste hinzugefügt.

### 0.0.12

- (tomboxi) Fix Info connection, improve deleting, fix gzip problem.

### 0.0.8

- (tomboxi) Katwarn Warnungen hinzugefügt.

### 0.0.7

- (tomboxi) BiwApp Warnungen hinzugefügt.

### 0.0.6

- (tomboxi) NumberOfWarns werden nur geändert wenn eine Änderung vorliegt

### 0.0.5

- (tomboxi) Option für Beispielwarnung

### 0.0.4

- (tomboxi) Mehrere Warnungen werden jetzt korrekt angezeigt.

### 0.0.3

- (tomboxi) Unwetter und Hochwasserwarnungen hinzugefügt

### 0.0.1

- (tomboxi) initial release

## License

MIT License

Copyright (c) 2020 tomboxi <tombox_2020@gmail.com>

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