---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/eisbaeeer/iobroker.piface/edit/master//README.md
title: PiFace addon
hash: Jem0qrM+xiBBoAyyrGiFXroWjtJRbc2Xbj1MfzL0XXs=
adapter: true
license: MIT
authors: Lars Weimar <Eisbaeeer@gmail.com>
description: Control PiFace Board
keywords: piface, raspberry, addon
readme: https://github.com/eisbaeeer/iobroker.piface/blob/master/README.md
mode: daemon
materialize: false
compact: false
published: 2016-04-29T12:31:59.913Z
version: 1.0.0
BADGE-安装数量: http://iobroker.live/badges/piface-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.piface.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.piface.svg
BADGE-特拉维斯-CI: https://travis-ci.org/Eisbaeeer/ioBroker.piface.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.piface.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.piface/../../../en/adapterref/iobroker.piface/admin/piface.png)


#ioBroker.piface
该适配器允许控制Raspberry Pi上的Piface。

它使用node-pifacedigial：https：//github.com/tualo/node-pifacedigital

适配器在iobroker中创建8个输入和输出对象。
输出可以通过VIS按钮控制，也可以通过将对象设置为“true”或“false”或“1”或“0”来控制。

###！注意！
请阅读适配器的预先要求。
适配器需要节点版本> = v4.0.0您必须通过控制台安装以下库并通过设置“raspi-config”启用Raspberry的SPI支持

```
git clone https://github.com/piface/libmcp23s17.git
cd libmcp23s17/
make
sudo make install
```

```
git clone https://github.com/piface/libpifacedigital.git
cd libpifacedigital/
make
sudo make install
```

如果您运行错误，因为您的节点版本太低，请更新节点版本。

*我已成功安装节点版本：v4.2.1

### Iobroker中的设置
![替代文字](zh-cn/adapterref/iobroker.piface/../../../en/adapterref/iobroker.piface/admin/settings.png?raw=true "设置")

## PiFace板号
您可以在一个Raspberry Pi上堆叠多达4个板。您必须使用跳线对电路板进行寻址。
要寻址电路板，请使用以下跳线设置：

|董事会编号| JP1 | JP2 |
| ------------- |:---:|:---:|
|董事会0 | 0 | 0 |
|板1 | 1 | 0 |
|董事会2 | 0 | 1 |
|董事会3 | 1 | 1 |

如果您使用多个电路板，请为每个电路板创建其他实例，并在设置相应实例时更改电路板编号。

## PiFace以ms为单位读取输入
此值定义检查输入的间隔。值以ms为单位。

##反向输入
您可以反转输入

##初始化输出
如果选中此选项，则通过重新启动适配器将输出设置为0。

＃＃ 去做：

## Changelog

### 1.0.0.(2017-09-19)
* (Eisbaeeer)
* Solving issue #6 (RAM)

### 0.0.9 (2017-03-05)
* (Eisbaeeer)
* Activating Travis - no changes
* (Apollon77)
* Added basic testing

### 0.0.50 (2016-05-07)
* (Eisbeeer)
* Optimized loggin because of RPI´s flash

### 0.0.40
* (Eisbaeeer) RC
added:
* addressing boards

### 0.0.30
* (Eisbaeeer) first aplpha
added:
* Read interval in setup (ms)
* Selectable invers input (pullup)

### 0.0.20
* (Eisbaeeer) first beta

### 0.0.10
* (Eisbaeeer) initial version

## License
MIT