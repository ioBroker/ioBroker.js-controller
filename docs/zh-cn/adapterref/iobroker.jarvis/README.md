---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.jarvis/README.md
title: ioBroker.jarvis
hash: e/osQ26wn5IDTtU1VDSILJGlS47QktHcHZTdoIYHyuM=
---
![商标](../../../en/adapterref/iobroker.jarvis/admin/jarvis.png)

![贝宝捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![安装数量](http://iobroker.live/badges/jarvis-installed.svg)
![稳定版](http://iobroker.live/badges/jarvis-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.jarvis.svg)
![自上次发行以来提交](https://img.shields.io/github/commits-since/Zefau/ioBroker.jarvis/latest.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.jarvis.svg)
![NPM](https://nodei.co/npm/iobroker.jarvis.png?downloads=true)

＃ioBroker.jarvis jarvis-另一个杰出的视觉
[![Travis CI]（https://travis-ci.com/Zefau/ioBroker.jarvis.svg?branch=master）](https://travis-ci.com/Zefau/ioBroker.jarvis)

## Ist是贾维斯吗？
Jarvis ist eine Material Design Visualisierung，请参见[材质界面](https://material-ui.com/)basiert。 Jarvis gibt eine Struktur和Module vor，来自视觉界的工程师，Aber sehr flexibel konfiguriert werden专家。

Jarvis ist[*反应迅速*](https://de.wikipedia.org/wiki/Responsive_Webdesign)和屏幕保护程序已失效。

Das Layout ist flexibel konfigurierbar。 Eskönnen可选（beliebig viele）Tabs verwendet werden。 Jeder Tab kann封装`fullscreen`sein oder beliebig viele`columns`haben，死于einzelnen`modules`中更灵活的Reihenfolge beinhalten。

Jedes Modul的演讲人Konfigurationsmöglichkeiten（[维基百科](https://github.com/Zefau/ioBroker.jarvis/wiki/de-Modules)）。

## Warum jarvis？
jarvis ist weitaus weniger flexibel als ioBroker.vis，aber bietetdafürein standardisiertes Design，um schnell eine Visualisierung zusammenzustellen。 Wer besonders spezifische Anforderungen hat，sollte（weiterhin）ioBroker.vis verwendet。

##安装和维修信息
[Mehr Informationen-知识点配置-Gibt es im Wiki](https://github.com/Zefau/ioBroker.jarvis/wiki).

_____

##印象
模范·冯·模块·坎恩·弗雷Nachfolgend einige Impressionen / Beispiele：

###截屏视频
[![播放视频]（https://raw.githubusercontent.com/Zefau/jarvis/master/documentation/App/play.png）](https://youtu.be/jltXTSDGoQw)

您可以在[YouTube频道](https://www.youtube.com/channel/UCQ7rw5Uect8PSx1aVzEOlzQ)上找到更多视频。

###截图
#### Beispiel：资讯主页（3`columns`）
![Dashboard.png](https://raw.githubusercontent.com/Zefau/jarvis/master/documentation/App/Dashboard.png)

#### Beispiel：Karte（Vollbild）
![Map.png](https://raw.githubusercontent.com/Zefau/jarvis/master/documentation/App/Map.png)

#### Beispiel：Statistiken（2`columns`）
![Statistik.png](https://raw.githubusercontent.com/Zefau/jarvis/master/documentation/App/Statistik.png)

#### Beispiel：状态（3`columns`，davon 2 leer）
![Status.png](https://raw.githubusercontent.com/Zefau/jarvis/master/documentation/App/Status.png)

## Changelog

Please also see [release page](https://github.com/Zefau/ioBroker.jarvis/releases) for changelog and detailed information.


### v1.0.0-rc.16 - Independence Day (2020-09-23)

#### :star2: newly added features
- Add standard state keys to device depending on function ([89](https://github.com/Zefau/ioBroker.jarvis/issues/89))

#### :bug: fixed bugs
- Validate IconStyle and StateStyle ([104](https://github.com/Zefau/ioBroker.jarvis/issues/104))
- BlindLevelAction: Stop-Button shown even though activity is not given ([100](https://github.com/Zefau/ioBroker.jarvis/issues/100))
- Group action fails on certain device state configuration ([94](https://github.com/Zefau/ioBroker.jarvis/issues/94))
- Unhandled promise rejection ([93](https://github.com/Zefau/ioBroker.jarvis/issues/93))
- Can't add devices to Map module ([92](https://github.com/Zefau/ioBroker.jarvis/issues/92))
- Map in Widget not shown and jumper is wrongly positioned ([88](https://github.com/Zefau/ioBroker.jarvis/issues/88))
- Import of alias devices may fail in case of insufficient declaration ([87](https://github.com/Zefau/ioBroker.jarvis/issues/87))

#### core
- Unhandled promise rejection ([93](https://github.com/Zefau/ioBroker.jarvis/issues/93))
- Add all required language transitions ([91](https://github.com/Zefau/ioBroker.jarvis/issues/91))
- Remove `installedFrom` from io-package the deployment process ([90](https://github.com/Zefau/ioBroker.jarvis/issues/90))


### v1.0.0-rc.15 - Django Unchained

#### :star2: newly added features
- Add standard state keys to device depending on function ([89](https://github.com/Zefau/ioBroker.jarvis/issues/89))

#### :bug: fixed bugs
- BlindLevelAction: Stop-Button shown even though activity is not given ([100](https://github.com/Zefau/ioBroker.jarvis/issues/100))
- Group action fails on certain device state configuration ([94](https://github.com/Zefau/ioBroker.jarvis/issues/94))
- Unhandled promise rejection ([93](https://github.com/Zefau/ioBroker.jarvis/issues/93))
- Can't add devices to Map module ([92](https://github.com/Zefau/ioBroker.jarvis/issues/92))
- Map in Widget not shown and jumper is wrongly positioned ([88](https://github.com/Zefau/ioBroker.jarvis/issues/88))
- Import of alias devices may fail in case of insufficient declaration ([87](https://github.com/Zefau/ioBroker.jarvis/issues/87))

#### core
- Unhandled promise rejection ([93](https://github.com/Zefau/ioBroker.jarvis/issues/93))
- Add all required language transitions ([91](https://github.com/Zefau/ioBroker.jarvis/issues/91))
- Remove `installedFrom` from io-package the deployment process ([90](https://github.com/Zefau/ioBroker.jarvis/issues/90))


### v1.0.0-rc.10 - Fight Club

#### :star2: newly added features
- Add standard state keys to device depending on function ([89](https://github.com/Zefau/ioBroker.jarvis/issues/89))

#### :bug: fixed bugs
- Group action fails on certain device state configuration ([94](https://github.com/Zefau/ioBroker.jarvis/issues/94))
- Unhandled promise rejection ([93](https://github.com/Zefau/ioBroker.jarvis/issues/93))
- Can't add devices to Map module ([92](https://github.com/Zefau/ioBroker.jarvis/issues/92))
- Map in Widget not shown and jumper is wrongly positioned ([88](https://github.com/Zefau/ioBroker.jarvis/issues/88))

#### core
- Unhandled promise rejection ([93](https://github.com/Zefau/ioBroker.jarvis/issues/93))
- Add all required language transitions ([91](https://github.com/Zefau/ioBroker.jarvis/issues/91))
- Remove `installedFrom` from io-package the deployment process ([90](https://github.com/Zefau/ioBroker.jarvis/issues/90))


### v1.0.0-rc.6 - The Matrix Reloaded

#### :bug: fixed bugs
- WidgetPage: Cannot read property "map" of undefined ([77](https://github.com/Zefau/ioBroker.jarvis/issues/77))


### v1.0.0-rc.5 - The Matrix

#### :bug: fixed bugs
- Connection issues when using socket.io as separated adapter (not socket via integrated web adapter) ([74](https://github.com/Zefau/ioBroker.jarvis/issues/74))
- Adapters without a status are shown with yellow status ([68](https://github.com/Zefau/ioBroker.jarvis/issues/68))
- Stop button of blind level state not working in pop-up ([60](https://github.com/Zefau/ioBroker.jarvis/issues/60))


### v1.0.0-rc.1 - The Matrix Revolution

#### :exclamation: BREAKING CHANGES
- Preview for the Action Elements in widget configuration ([43](https://github.com/Zefau/ioBroker.jarvis/issues/43))
- Idea for improved configuration of groups and devices ([26](https://github.com/Zefau/ioBroker.jarvis/issues/26))

#### :star2: newly added features
- Add unreach state ([66](https://github.com/Zefau/ioBroker.jarvis/issues/66))
- Add possibility for boolean battery state ([65](https://github.com/Zefau/ioBroker.jarvis/issues/65))
- Import of blind alias devices ([47](https://github.com/Zefau/ioBroker.jarvis/issues/47))
- Preview for the Action Elements in widget configuration ([43](https://github.com/Zefau/ioBroker.jarvis/issues/43))
- Improve mobile view ([34](https://github.com/Zefau/ioBroker.jarvis/issues/34))
- Customize icons / avatars shown on Map ([33](https://github.com/Zefau/ioBroker.jarvis/issues/33))
- Add pre-defined layout and devices based on user-defined enums ([31](https://github.com/Zefau/ioBroker.jarvis/issues/31))
- Widget iFrame ([29](https://github.com/Zefau/ioBroker.jarvis/issues/29))
- Idea for improved configuration of groups and devices ([26](https://github.com/Zefau/ioBroker.jarvis/issues/26))
- Is it possible to add i18n support ([23](https://github.com/Zefau/ioBroker.jarvis/issues/23))
- Suggestion of new data structure ([21](https://github.com/Zefau/ioBroker.jarvis/issues/21))
- Add dropdown field ([20](https://github.com/Zefau/ioBroker.jarvis/issues/20))
- Device configuration ([18](https://github.com/Zefau/ioBroker.jarvis/issues/18))
- On value of dimmable lights ([12](https://github.com/Zefau/ioBroker.jarvis/issues/12))

#### :bug: fixed bugs
- Blind level shown as null if level is 0 ([72](https://github.com/Zefau/ioBroker.jarvis/issues/72))
- Missing translation of functions ([64](https://github.com/Zefau/ioBroker.jarvis/issues/64))
- Expert mode not loading ([63](https://github.com/Zefau/ioBroker.jarvis/issues/63))
- State icon depending on state value ([61](https://github.com/Zefau/ioBroker.jarvis/issues/61))
- Stop button of blind level state not working in pop-up ([60](https://github.com/Zefau/ioBroker.jarvis/issues/60))
- Add action to imported devices ([59](https://github.com/Zefau/ioBroker.jarvis/issues/59))
- Import of light alias devices ([55](https://github.com/Zefau/ioBroker.jarvis/issues/55))
- Import of heating alias devices ([54](https://github.com/Zefau/ioBroker.jarvis/issues/54))
- Import of window alias devices ([53](https://github.com/Zefau/ioBroker.jarvis/issues/53))
- Function not recognized while importing alias devices ([52](https://github.com/Zefau/ioBroker.jarvis/issues/52))
- Button is pulsating ([51](https://github.com/Zefau/ioBroker.jarvis/issues/51))
- Unit missing after using BlindLevelAction ([50](https://github.com/Zefau/ioBroker.jarvis/issues/50))
- Icons of blinds states not working ([49](https://github.com/Zefau/ioBroker.jarvis/issues/49))
- Label of blinds states not used in widget ([48](https://github.com/Zefau/ioBroker.jarvis/issues/48))
- Changing colors has no effect ([46](https://github.com/Zefau/ioBroker.jarvis/issues/46))
- Problems in settings dialogue after changing language ([45](https://github.com/Zefau/ioBroker.jarvis/issues/45))
- LevelBody for blinds not working as expected ([44](https://github.com/Zefau/ioBroker.jarvis/issues/44))
- Newly created devices / states are not directly available in widget configuration ([41](https://github.com/Zefau/ioBroker.jarvis/issues/41))
- Function blind throws error ([27](https://github.com/Zefau/ioBroker.jarvis/issues/27))
- Sorting states of a device ([25](https://github.com/Zefau/ioBroker.jarvis/issues/25))
- Saving device config ([22](https://github.com/Zefau/ioBroker.jarvis/issues/22))
- Position of configuration pop-up  ([16](https://github.com/Zefau/ioBroker.jarvis/issues/16))


### 0.1.0 - Shawshank Redemption (2020-03-28)

### 0.0.1 (2020-02-21)
- (Zefau) initial version

## License
The MIT License (MIT)

Copyright (c) 2019-2020 Zefau <zefau@mailbox.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.