---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/Pix---/ioBroker.solarwetter/edit/master//README.md
title: Solarwetter
hash: qUc6gzg0wBE4IZgRqKmyeSbUWQ4qCowDUgGox8K/Otc=
adapter: true
license: MIT
authors: Pix
description: prognostizierter Solarstrom Tagesertrag solar-wetter.com
keywords: solar, solar-wetter, energy, parse, pix, weather
readme: https://github.com/Pix---/ioBroker.solarwetter/blob/master/README.md
mode: schedule
materialize: false
compact: false
published: 2016-06-01T10:34:25.177Z
version: 1.0.0
BADGE-安装数量: http://iobroker.live/badges/solarwetter-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.solarwetter.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.solarwetter.svg
BADGE-开放式问题: http://githubbadges.herokuapp.com/Pix---/ioBroker.solarwetter/issues.svg
BADGE-NPM: https://nodei.co/npm/iobroker.solarwetter.png?downloads=true
BADGE-特拉维斯-CI: http://img.shields.io/travis/Pix---/ioBroker.solarwetter/master.svg
BADGE-AppVeyor: https://ci.appveyor.com/api/projects/status/github/Pix---/ioBroker.solarwetter?branch=master&svg=true
---
![商标](zh-cn/adapterref/iobroker.solarwetter/../../../en/adapterref/iobroker.solarwetter/admin/solarwetter.png)


＃ioBroker.solarwetter
## Beschreibung /描述
：de：Dieser Adapter liefert den prognostizierten SolarstromTagesertragfüreinebestimmte Region。 Die Daten kommenvon[http://www.auswahl-plz-bereich.solar-wetter.com](http://solar-wetter.com)。
Bei Eingabe der Leistung der eigenen Solaranlage errechnet der Adapter auch die zu erwartende Energieabgabe der Anlage。

：uk：此适配器提供供应商[http://www.auswahl-plz-bereich.solar-wetter.com](http://solar-wetter.com)对特定区域的每日太阳能发电量的预测。
翻译！！！！

## Einstellungen /配置
###用户/密码
Seit 2017 ist die Authentifizierung beimAnbieternötig。 Dazu muss kostenpflichtig beim Anbieter ein Zugang erstanden werden。 Die Login-Datenkönnennunhier im Adapter hinterlegt werden。

自2017年以来，提供商正在收取服务费用。可以在solar-wetter.com上获得个人登录信息。用户名和密码将存储在此处。

### Standort / Location
ÖrtlichkeitdurchAuswahl des Postleitzahlenbereichs bestimmen Gesamtleistung der eigenen Solaranlage zur Berechnung der Energieerzeugung

从邮政编码列表中选择，选择您所在的地区。
输入太阳能发电厂的功率来计算能量输出。

### Solaranlage /太阳能电厂
Hier kann die Gesamtleistung der eigenen Solaranlage zur Bechnung der vorraussichtlich erzeugten Energiemenge eingegeben werden（auchDezimalzahlenmöglich）。

投入太阳能发电厂的总功率来计算能源产量的每日预测（可能的小数分隔符）

### 4-Tage-Prognose / 4天预报
WählenSiehier eine Stadt。 Der Adapter erzeugt einen Link zu einem Chart mit der 4-Tage-Prognose（Datenpunkt solarwetter.0.forecast.chart .__ url__）。

选择一个城市，让适配器建立一个4天预测图表的链接（datapoint solarwetter.0.forecast.chart .__ url__）。

![替代文字](zh-cn/adapterref/iobroker.solarwetter/../../../en/adapterref/iobroker.solarwetter/img/solarwetterSettingScreenshot.jpg "截图设置")

## Aktivierung / Schedule
Der Adapter starteteinmaltäglich。

适配器每天启动一次。

## Datenpunkte / Datapoints
solarwetter.0.forecast .__ clearSky__（* value *）

solarwetter.0.forecast .__ realSky_min __（*值*）

solarwetter.0.forecast .__ realSky_max __（* value *）

solarwetter.0.forecast .__ Datum __（*字符串，没有时间戳*）

solarwetter.0.forecast .__ Region__（* value *）

solarwetter.0.forecast.home .__ clearSky __（* value *）

solarwetter.0.forecast.home .__ realSky_min __（*值*）

solarwetter.0.forecast.home .__ realSky_max __（* value *）

solarwetter.0.forecast.home .__ Leistung__（* value *）

solarwetter.0.forecast.chart .__ city __（* value *）

solarwetter.0.forecast.chart .__ url __（* value *）

＃＃ 去做
* Datapoints的翻译
*设置窗口的俄语翻译

## Changelog
### 1.0.0 (2017-10-15)
* (pix) End of beta, Nodejs 4 or higher required

### 0.3.0 (2017-05-28)
* (pix) Login with website password & username  

### 0.2.0 (2017-01-05)
* (pix) Travis CI testing added

### 0.1.2 (2016-06-21)
* (pix) city selection fixed

### 0.1.1 (2016-06-20)
* (pix) 4-Day-Forecast Chart

### 0.1.0 (2016-06-12)
* (pix) publish on npm

### 0.0.6 (2016-06-09)
* (pix) Adapter.stop() fixed

### 0.0.5 (2016-05-14)
* (pix) Settings now show correct location if already defined

### 0.0.4 (2016-05-13)
* (pix) Appearance of settings window

### 0.0.3 (2016-05-13)
* (pix) Calculates power of own solar plant

### 0.0.2 (2016-05-13)
* (pix) Post code area selectable

### 0.0.1 (2016-05-12)
* (pix) first release

## License

The MIT License (MIT)

Copyright (c) 2017 pix

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

---
*Logo is partly crafted by CHALLENGER* :+1: