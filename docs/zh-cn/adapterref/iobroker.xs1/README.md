---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.xs1/README.md
title: ioBroker.xs1
hash: YDDMrsvKEdeOSKCT1MPhIWYk68X7WT5w1tOQy0vU+BA=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.xs1.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.xs1.svg)
![特拉维斯](http://img.shields.io/travis/frankjoke/ioBroker.xs1/master.svg)
![NPM](https://nodei.co/npm/iobroker.xs1.png?downloads=true)

＃ioBroker.xs1
![商标](../../../en/adapterref/iobroker.xs1/admin/xs1.png)

## IoBroker适配器zu EZcontrol XS1
XS1和XS1的适配器都非常适合XS1和监听器，并且可以在代理服务器上使用。
Beomhle vom ioBroker werden zuerst mit ack = false gesendet和wenn etwas vom Listener kommt dann passiert das mit ack = true。男士XS1 den Befehl gesendet帽子。

XS1 vergebenen Namen的所有适配器和传感器（只读）和Aktoren（读/写）和版本均不可用。

动机侦探侦探侦探侦探侦探尼古丁·韦登werden。

Heimnetz auf das XS1 zugreifen kann。
Momentan ist noch kein Passwort-Zugriff实施和交易XS1 kein Passwort gesetzt sein！

  状态传感器为“电池电量低” -Meldung安全状态为LOWBAT状态。

死副本清单erlaubt direktes Gleichschalten zwischen侦听器和Aktoren。
Damit kann man Aktoren zusammenschalten welche ohne im ioBroker签发schreiben zumüssen。
也请问Aktor A von XS！听从Aktor B（und C ..）auf ein geschaltet。
Das ist sinnvoll wenn Aktoren verschiedene Systeme benutzen（Aktor A = FS20，B = AB400，C = HMS）和zusammen geschaltet werden sollen（Ein funksender von FS20 kann dann direkt auch einen AB400 Funkstekdose schalten）。

语法：{“ von_a”：“ auf_b（，auf_c，...）”，“ von_b”：“ auf_c”，....}}
Ein Beispiel von mir：{“ UWPumpeT2”：“ UWPumpe”，“ UWPumpe”：“ UWPumpeT2”，“ Schalter1”：“ Licht1，Licht2”} ioBroker nur noch einen Aktor verwenden。
'Schalter1'würde'Licht1'和'Licht2'gleichzeitig mitschalten。

XS1的Watchdog-Funktion sollte由Aktuator命名为“ Watchdog” kreiert werden。
Dieser wird jede分钟umgeschaltet和下降4 Minuten lan dieer Umschaltvorgang nichtzurückgemeldetwird wird der Adapter neu gestartet。

## Wichtig！-
* Der适配器benötigt节点> = v6。*！
*艾因·布莱恩（Einen blinden）。

## Changelog

### 1.1.0

* Added Admin3 capabities and support for new js-controller
* Adapter runs only with node>=8.16

### 1.0.2

* Added more sensors. All unknown types will use 'value' role. This can lead to problems if actual type is a boolean, but should work otherwise. As a result all sensors should be listed now.

### 1.0.0

* Update accepted device list and test for node v 8
* Tarvis updated to test right repository

### 0.5.2

* Update variables list and values from XS1 but change values only if they are different than in state not to create false state updates

### 0.5.1
* Adapter test auf Node 4.x und 6.x für Windows und Linux.
* Fehler beim ersten Einlesen von boolean states korrigiert.

### 0.5.0 
* LOWBAT für Sensoren mit Battery low state.
* Abhängigkeit von 'async' und 'request' entfernt, damit braucht xs1 keine zusätzlichen Module mehr.
* Watchdog mit XS1-Aktuator implementiert.
* Cleanup der states wenn sie nicht mehr verwendet werden (und z.B. vom XS1 gelöscht werden)

### 0.4.2
  Watchdog von 4 Minuten implementiert, wenn 4 Minuten kein Signal vom XS1 kommt wird Adapter gestoppt.
  jede Minute sendet der Adapter ein Signal an den Aktuator 'Watchdog' der dies bestätigen sollte.
  iobroker sollte den Adapter dann neu starten.
 
### 0.4.0
  Erster öffentliche Version, kann lesen und Aktuatoren schreiben (Befehle absetzten).
  TODO: Dokumentieren und Batteriestatus polling implementieren.

### 0.1.0
  Erster Test, Kann nur lesen und mithören

## License
The MIT License (MIT)

Copyright (c) 2016 Frank Joke

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