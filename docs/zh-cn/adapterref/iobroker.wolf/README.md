---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wolf/README.md
title: ioBroker.wolf
hash: Rot/Djk/wBUnhJuUMYvWkk2S+OtcuUb2MEMu6oCNOgk=
---
![商标](../../../en/adapterref/iobroker.wolf/admin/wolf_logo.png)

![安装数量](http://iobroker.live/badges/wolf-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.wolf.svg)
![下载](https://img.shields.io/npm/dm/iobroker.wolf.svg)
![NPM](https://nodei.co/npm/iobroker.wolf.png?downloads=true)

＃ioBroker.wolf
======================

##应用领域：加热/太阳能/家庭通风
适配器可通过ISM8i评估最多4个以下加热器：

*气体冷凝装置：CGB-2（包括：CGW-2，CGS-2，CSZ-2），MGK-2
*油冷凝锅炉：TOB
*分体式热泵：BWL-1-S
*客厅通风CWL优秀

始终需要系统控制模块BM-2。
此外，诸如混合器模块MM，级联模块KM，太阳能模块SM1或SM2的附加组件可以存在于eBus系统中。

单个模块的最大数量：

*最大4个加热器hg（1）-hg（4）（其中BWL-1-S创建为hg0）
*最大3个搅拌机mm（1） -  mm（3）
*最大4个操作面板（BM-2）bm（1）-bm（4）
*最大1级联模块km（1）
*最大1个太阳能组件（SM1或SM2）sm（1）

CWL Excellent系列的住宅通风装置也可以使用ISM8i进行评估和操作。

## Einsatzbereiche：Heizung / Solar /Wohnraumlüftung
Der AdapterkannüberdasISM8i maximal 4 von dennachfolgendenHeizgerätenaucewerten：

  *Gasbrennwertgerät：CGB-2（beinhaltet：CGW-2，CGS-2，CSZ-2），MGK-2
  *ÖlBrennwertkessel：TOB
  * Split-Wärmepumpe：BWL-1-S
  *WohnraumlüftungCWL优秀

Es ist immer ein System-Bedienmodul BM-2 erforderlich。
WeiterhinkönnenzusätzlicheKomponentenwie Mischermodul MM，Kaskadenmodul KM，Solarmodul SM1 oder SM2，im eBusSystem vorhanden sein。

  Maximale Anzahl der einzelnen模块：

  *最大4Heizgerätehg（1）-hg（4）（wobei ein BWL-1-S als hg0 angelegt wird）
  *最大3 Mischer mm（1） -  mm（3）
  *最大4卧床（BM-2）bm（1）-bm（4）
  *最大1 Kaskadenmodul km（1）
  *最大1 Solarmodul（SM1或SM2）sm（1）

  EinWohnraumlüftungsgerätderBaureihe CWL优秀的kann mit dem ISM8i ebenfalls ausgewertet und bedient werden。

## Changelog
### 1.0.0 [2017.11.21]
* (bluefox) resize logo

### 0.9.1 [2016.12.19]
* (smiling_Jack) Add Bool option
* (smiling_Jack) Add Bar option
* (smiling_Jack) Bugfix Type 5.001 Scaling 

### 0.1.0 [2015.12.01]
* (smiling_Jack) Add writing to ism8

### 0.0.9 [2015.11.06]
* (smiling_Jack) Bugfix
* (smiling_Jack) Add test output

### 0.0.8 [2015.11.02]
* (smiling_Jack) Bugfix io-package

### 0.0.7 [2015.11.02]
* (smiling_Jack) new object management
* (smiling_Jack) Bugfixes

### 0.0.6 [2015.10.20]
* (smiling_Jack) Bugfix parsing

### 0.0.5 [2015.10.16]
* (smiling_Jack) Add support for multiple data
* (smiling_Jack) Add debug output 
* (smiling_Jack) Bugfixes

### 0.0.4 [2015.10.15]
* (smiling_Jack) Bugfix on parse error
* (smiling_Jack) Add DPT_HVACContrMode
* (smiling_Jack) Add DPT_HVACMode

### 0.0.3 [2015.10.14]
* (smiling_Jack) add CWL
* (smiling_Jack) remove ISM8 ip

### 0.0.2 [2015.10.12]
* (smiling_Jack) add BWL-1-S
* (smiling_Jack) update readme

### 0.0.1 [2015.10.08]
* (smiling_Jack) first release

## License

The MIT License (MIT)

Copyright (c) 2015-2017 smiling_Jack

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.