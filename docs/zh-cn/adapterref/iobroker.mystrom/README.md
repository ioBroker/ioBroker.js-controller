---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mystrom/README.md
title: ioBroker.mystrom
hash: Y4F1YJ9C2J8XGwmWsaxy+NFPk41ruTvYoaxjM4W5V9o=
---
![商标](../../../en/adapterref/iobroker.mystrom/admin/mystrom.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.mystrom.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.mystrom.svg)
![安装数量（最新）](http://iobroker.live/badges/mystrom-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/mystrom-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.mystrom.svg)
![已知漏洞](https://snyk.io/test/github/TA2k/ioBroker.mystrom/badge.svg)
![NPM](https://nodei.co/npm/iobroker.mystrom.png?downloads=true)

＃ioBroker.mystrom
**测试：**![测试与发布](https://github.com/TA2k/ioBroker.mystrom/workflows/Test%20and%20Release/badge.svg)

##适用于ioBroker的mystrom适配器
myStrom适配器

30分钟内，Date Adapter随myStrom App和其他应用程序更新。在线应用程序和IP地址应用程序。 DazumüssenalleGerätebei Adapterstart在线开始。 Button sind nicht沉浸在在线环境中，使您更轻松地获得2x xdrücken和dann 8 Sekundengedrückthalten oder resetenüber10 Sekundendrückenbis rot眨眼和dann einmaldrücken。 Nach dem Reset ist inin通过WLAN notwendig对Verbinden产生作用。 Manuell verbinden通过3个应用程序中的无线局域网和无线网络。 Danach ist der Button在线和纪念版。

EskönnenURLs的按钮和Bewegungsmelder。通过ioBroker State geschaltet werden进行切换。

#### Wifi开关
Zum Schalten derGeräte将localCommand设置为mystrom.0.XXXXXXX.localCommands。

＃＃＃＃ 纽扣
Zum Schalten von ioBroker指出[SimpleAPI](https://github.com/ioBroker/ioBroker.simple-api)verwenden是男人。

死于SimpleAPI kannüberein ioBroker web.0 Instanz aktiviert werden。在der Instanz web.0中，选择“ Eingebautes'Simple-API'”。

Zum setzen eines国家kann dann folgende URL<br />

Unter Objekte folgenden State setzen mystrom.0.XXX.localData.api / v1 / device.XXXX.single oder long oder double（Gerätemuss bei Adapterstart online sein，Zweimaldrückenund dannfür8 Sekunden halten。Danach Adapter neustarten bis derdner gefülltist。）：

##### Get：// ioBrokerIP：8082 / toggle / javascript.0.test
<br />

#### PIR Bewegungsmelder
Unter Objekte folgenden State setzen mystrom.0.XXXXX.localData.api / v1 / action.pir

##### Get：// ioBrokerIP：8082 / toggle / javascript.0.test
<br />

Mehr Details wie man z.B. Zwei States gleichzeitigändert：[https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332](https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332)

## Changelog

## License

MIT License

Copyright (c) 2020 TA2k <tombox2020@gmail.com>

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