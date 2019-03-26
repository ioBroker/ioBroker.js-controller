---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.noolite/edit/master//README.md
title: Noolite Adapter
hash: WMJzPgkdiDOENacR++TowYAl7sHLSQRUbdQrzi03X/k=
adapter: true
license: MIT
authors: bluefox <dogafox@gmail.com>
description: Lets control the Noolite devices
keywords: Noolite
readme: https://raw.githubusercontent.com/ioBroker/ioBroker.noolite/master/README.md
mode: daemon
materialize: false
compact: false
published: 2016-03-12T21:57:35.479Z
version: 0.0.1
BADGE-安装数量: http://iobroker.live/badges/noolite-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.noolite.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.noolite.svg
BADGE-NPM: https://nodei.co/npm/iobroker.noolite.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.noolite/../../../en/adapterref/iobroker.noolite/admin/noolite.png)ioBrokerNoolite适配器=================


让我们从ioBroker控制Noolite设备。

***适配器至少需要nodejs 4.x ***

实际上只支持以太网网关PR1132。

＃＃ 英语
[по русски](#Русский)

##安装
```node iobroker.js add noolite```

###信息
###配置
###港口
-------------------

##РусскийЭтотдрайверпозволяетуправлятьnooliteустройствамичерезUSBадаптер（РС1ххх）иличерезEthernet-шлюзPR1132。
ДляуправленияустройствамиспомощьюUSBадаптераподwindowsнеобходимоустановитьпрограмму“nooLite control panel”ипрописатьпутькexeфайлувнастройках。 Например：

```Windows exe: C:\Program Files (x86)\nooLite\noolite.exe```.

Под windows не нужно указывать TX USB Type т.к. коммуникация происходит через noolite.exe.

При использовании шлюза можно подключить до 4х различных датчиков температуры или влажности.

Приём команд на данный момент неработает, за неимением приёмного адаптера.

### Настройки


### Порты

## Changelog
### 0.2.0 (2016-04-30)
* (bluefox) USB adapter under windows
* (bluefox) RGB channel finished

### 0.0.1 (2016-03-11)
* (bluefox) initial commit