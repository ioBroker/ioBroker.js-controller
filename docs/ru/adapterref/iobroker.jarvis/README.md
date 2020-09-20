---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.jarvis/README.md
title: ioBroker.jarvis
hash: IhzWXCxJtWsJBbYrLXx+E3Kn0vaWsHdtK4vpmH7U1Ro=
---
![Логотип](../../../en/adapterref/iobroker.jarvis/admin/jarvis.png)

![Пожертвование Paypal](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![Количество установок](http://iobroker.live/badges/jarvis-installed.svg)
![Стабильная версия](http://iobroker.live/badges/jarvis-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.jarvis.svg)
![Совершено с момента последнего выпуска](https://img.shields.io/github/commits-since/Zefau/ioBroker.jarvis/latest.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.jarvis.svg)
![NPM](https://nodei.co/npm/iobroker.jarvis.png?downloads=true)

# IoBroker.jarvis jarvis - еще один замечательный vis
[![Трэвис С.И.] (https://travis-ci.com/Zefau/ioBroker.jarvis.svg?branch=master)](https://travis-ci.com/Zefau/ioBroker.jarvis)

## Это был Джарвис?
jarvis ist eine Material Design Visualisierung, die auf [Материал UI](https://material-ui.com/) basiert. jarvis gibt eine Struktur und Module vor, die zur Visualisierung genutzt werden, aber sehr flexibel konfiguriert werden können.

jarvis ist [*отзывчивый*](https://de.wikipedia.org/wiki/Responsive_Webdesign) und passt sich der Größe des Screens an.

Das Layout - это flexibel konfigurierbar. Es können optional (Bellybig viele) Tabs verwendet werden. Jeder Tab kann entweder `fullscreen` sein oder libebig viele `columns` haben, die die einzelnen `modules` в flexibler Reihenfolge beinhalten.

Jedes Modul hat spezielle Konfigurationsmöglichkeiten ([siehe Wiki je Modul](https://github.com/Zefau/ioBroker.jarvis/wiki/de-Modules)).

## Варум Джарвис?
jarvis ist weitaus weniger flexibel als ioBroker.vis, aber bietet dafür ein standardisiertes Design, um schnell eine Visualisierung zusammenzustellen. Wer besonders spezifische Anforderungen hat, sollte (weiterhin) ioBroker.vis verwendet.

## Установка и дополнительная информация
[Mehr Informationen - insbesondere zur Konfiguration - gibt es im Wiki](https://github.com/Zefau/ioBroker.jarvis/wiki).

_____

## Impressionen
Die Konfiguration von Modulen kann frei angeordnet werden. Nachfolgend einige Impressionen / Beispiele:

### Скринкаст / видео
[![Воспроизвести видео] (https://raw.githubusercontent.com/Zefau/jarvis/master/documentation/App/play.png)](https://youtu.be/jltXTSDGoQw)

Siehe https://youtu.be/jltXTSDGoQw

### Скриншоты
#### Beispiel: Панель управления (3 `columns`)
![Dashboard.png](https://raw.githubusercontent.com/Zefau/jarvis/master/documentation/App/Dashboard.png)

#### Beispiel: Karte (Vollbild)
![Map.png](https://raw.githubusercontent.com/Zefau/jarvis/master/documentation/App/Map.png)

#### Beispiel: Statistiken (2 `columns`)
![Statistik.png](https://raw.githubusercontent.com/Zefau/jarvis/master/documentation/App/Statistik.png)

#### Beispiel: Статус (3 `columns`, davon 2 leer)
![Status.png](https://raw.githubusercontent.com/Zefau/jarvis/master/documentation/App/Status.png)

## Changelog

Please also see [release page](https://github.com/Zefau/ioBroker.jarvis/releases) for changelog and detailed information.


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