---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wifilight/README.md
title: ioBroker.wifilight
hash: h3yqoVsmU/F7BiffThXvqiZH/tuN6ByBLAJZL5cSJ4Y=
---
![Logo](../../../en/adapterref/iobroker.wifilight/admin/wifilight.png)

![Anzahl der Installationen](http://iobroker.live/badges/wifilight-community-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.wifilight.svg)
![Tests](http://img.shields.io/travis/soef/ioBroker.wifilight/master.svg)
![Build-Status](https://ci.appveyor.com/api/projects/status/2hvs4fvfms7xhmnw?svg=true)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# IoBroker.wifilight
## Beschreibung
ioBroker Adapter für WiFi Light

## Die Info
Unterstützt LW12, LD382 und LD382A.
Unterstützung für Mi-Light / LimitlessLED RGBW hinzugefügt.

## Ersterstellung
Dieser Adapter wurde ursprünglich von @soef unter https://github.com/soef/ioBroker.wifilight erstellt, aber nicht mehr gewartet. Daher haben wir ihn in die iobroker-Community verschoben, damit Fehler behoben werden können. danke @soef für seine arbeit.

### So verwenden Sie den Befehlsstatus:
+ Mögliche Bezeichner sind: ``red, r, green, g, blue, b, bri, sat, transition, on, off`` + Die Zeichenfolge kann ein JSON mit oder ohne Klammern sein.
+ Sie können einen Wert auch zuweisen durch = + Farbbereich: ```0..255``` + Bereich von bri: ``0..100``

Einige Beispiele:

```
r = 100; g = 250, b = 100
r: 0, g: 0, b = 255
red: 200, green: 0, blue: 0
{r:100, b: 200, transition: 20}
off
on
{on:0}
```

Um die Farbe zu ändern, müssen Sie nicht alle drei Werte verwenden.
Zum Beispiel bleiben ``` red = 0 ```, blau und grün unverändert.

### R, g, b, w Zustände:
+ Werte 0..255 + \ #rrggbb [ww]

## Installation
Verwenden Sie das Adapterfenster in iobroker, um eine Instanz hinzuzufügen.

Wenn nicht vorhanden, führen Sie den folgenden Befehl im Stammverzeichnis von iobroker aus (z. B. in / opt / iobroker).

```
npm install iobroker.wifilight
```

### Fehlerbehebung
Falls dies nicht funktioniert, versuchen Sie, das soef npm-Paket zu installieren

```
cd /opt/iobroker/node_modules/iobroker.wifilight
sudo npm install soef
```

## Changelog
### 1.1.0 (2020-04-09)
* (foxriver76) compatibility for js-c 3

### 1.0.0 (2019-10-18)
* (ldittmar) first version for the community

## License
The MIT License (MIT)

Copyright (c) 2019-2020 soef <soef@gmx.net>

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