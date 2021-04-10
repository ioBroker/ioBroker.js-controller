---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hyperion_ng/README.md
title: ioBroker.hyperion_ng
hash: yxrOejxWKCewRasC784zpVjNET7vUTpRyyQxMO8bB5U=
---
![Logo](../../../en/adapterref/iobroker.hyperion_ng/admin/hyperion_ng.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.hyperion_ng.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hyperion_ng.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/hyperion_ng-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/hyperion_ng-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/felixganzer/ioBroker.hyperion_ng.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/felixganzer/ioBroker.hyperion_ng/badge.svg)
![NPM](https://nodei.co/npm/iobroker.hyperion_ng.png?downloads=true)

# IoBroker.hyperion_ng
** Tests: ** ![Testen und freigeben](https://github.com/felixganzer/ioBroker.hyperion_ng/workflows/Test%20and%20Release/badge.svg)

## Hyperion_ng Adapter für ioBroker
Mit diesem Adapter können Sie Ihre HyperionNG-Geräte steuern

https://hyperion-project.org/

## Handbuch
### Allgemeines
Der Adapter erstellt für jede Hyperion-Hardwareinstanz einen Ordner mit der Instanznummer. Innerhalb dieses Ordners die tatsächlichen Anpassungen, alle Komponenten und alle aktiven Prioritäten.

Zusätzlich wird ein allgemeiner Ordner erstellt, der die Steuerung, das Senden von Befehlen an Hyperion, alle möglichen Auswirkungen und Systeminformationen zu Hyperion enthält.

### Komponenten steuern und Hyperion-Instanz deaktivieren
Sie können die Komponenten im Ordner instance.components steuern, um den Booleschen Wert festzulegen. Nach dem Einstellen des Parameters werden alle Komponentenparameter der gesteuerten Instanz und alle folgenden Instanzen aktualisiert

Zusätzlich können Sie den Parameter instance.running so einstellen, dass die gesamte Instanz aktiviert und deaktiviert wird

### Steuerungsanpassungen
Sie können die Anpassungen im Ordner instance.components steuern, um den Parameter festzulegen. Nach dem Einstellen des Parameters werden alle Anpassungen der gesteuerten Instanz und aller folgenden Instanzen aktualisiert

### Effekte einstellen
Um einen Effekt festzulegen, müssen Sie unter general.control.instance eine Instanznummer festlegen. Danach können Sie unter general.control.setEffect den korrekten Namen eines vorhandenen Effekts eingeben. Nach dem Festlegen des Effekts werden die Prioritäten der verwendeten Instanz und aller folgenden Instanzen aktualisiert

Über general.control.durationEffectColor können Sie eine Dauer in Sekunden festlegen. Sie müssen diesen Wert einstellen, bevor Sie den Effekt einstellen. Der Standardwert 0. Dadurch wird die Effektzeit auf unendlich gesetzt.

### Farben einstellen
Um eine Farbe festzulegen, müssen Sie unter general.control.instance eine Instanznummer festlegen. Danach können Sie unter general.control.setColorRGB einen RGB-Wert eingeben. Nach dem Festlegen der Farbe werden die Prioritäten der verwendeten Instanz und aller folgenden Instanzen aktualisiert

Über general.control.durationEffectColor können Sie eine Dauer in Sekunden festlegen. Sie müssen diesen Wert einstellen, bevor Sie die Farbe einstellen. Der Standardwert 0. Dadurch wird die Effektzeit auf unendlich gesetzt.

Eine andere Möglichkeit, die Farbe einzustellen, ist über HSL. Für diese existieren 3 Datenpunkte bei general.control.setColorHSL. Wenn einer dieser Datenpunkte geändert wird, wird die Farbe aktualisiert.

### Grabber Visible setzen
Sie können den internen oder USB-Video-Grabber als sichtbare Priorität festlegen, wenn Sie general.control.setinternalGrabberVisible oder setUSBGrabberVisible auf true setzen. Bevor Sie die zu steuernde Instanz unter general.control.instance einstellen müssen. Wenn Sie die Standardprioritäten bei Hyperion geändert haben, müssen Sie die Werte auf der Adapterkonfigurationsseite ändern, um dieselben Werte zu erhalten.

### Klare Effekte und Farben
Um eine Priorität zu löschen, müssen Sie unter general.control.instance eine Instanznummer festlegen. Danach können Sie den Parameter general.control.clearAll oder general.control.clearVisible auf true setzen, um Prioritäten zu löschen. Nach Erfolg wird der Boolesche Wert auf false gesetzt.

### Daten von Hyperion aktualisieren
Sie können die Daten des gesamten Adapters manuell aktualisieren, wenn Sie general.control.updateAdapter auf true setzen. Mit dem Datenpunkt general.control.updatePriorities können Sie die Prioritäten aller Instanzen aktualisieren

## Changelog

### 0.1.19 (2021.03.29)
* (felixganzer) little bugfixing

### 0.1.18 (2021.03.06)
* (felixganzer) increase stopTimeout to 3 seconds
* (felixganzer) add communicationTimer object


### 0.1.17 (2021.02.26)
* (felixganzer) bugfixing: add error event handler for socket connection
* (felixganzer) bugfixing: change state roles of control states
* (felixganzer) bugfixing: add try and catch at set RGB color

### 0.1.16 (2021.02.07)
* (felixganzer) bugfixing: clear socket at adapter unload
* (felixganzer) bugfixing: change logo
* (felixganzer) bugfixing: fix testing for github
* (felixganzer) bugfixing: remove all the stuff inserted by an npm install

### 0.1.13 (2021.02.03)
* (felixganzer) add set Color over HSL values

### 0.1.12 (2021.02.02)
* (felixganzer) bugfix: add type-of-is to dependencies

### 0.1.11 (2021.01.30)
* (felixganzer) bugfix: reduce warning "state has no existing object" for js-controller 3.2
* (felixganzer) bugfix: read out priority of color crash at js-controller 3.2

### 0.1.10 (2021.01.10)
* (felixganzer) reorginize config page and add config parameter
* (felixganzer) add set internal or USB Grabber Visible with boolean

### 0.1.9 (2021.01.09)
* (felixganzer) bugfix: reduce warnings
* (felixganzer) add set Grabber Visible without any error catching
* (felixganzer) add start update whole adapter data points and update Priorities

### 0.1.8 (2021.01.07)
* (felixganzer) add set duration of effect and color to set
* (felixganzer) bugfix: clearVisible did not work

### 0.1.7 (2021.01.06)
* (felixganzer) bugfix: only works with iobroker adapter instance 0
* (felixganzer) updating the manual

### 0.1.6 (2021.01.03)
* (felixganzer) add setColorRGB under general.control
* (felixganzer) add controlling adjustments of hyperion
* (felixganzer) add start and stop Instance

### 0.1.5 (2021.01.02)
* (felixganzer) read out all possible effects
* (felixganzer) add setEffect under general.control
* (felixganzer) read out video Mode and LED Mapping
* (felixganzer) read out adjustments of instance

### 0.1.4 (2021.01.01)
* (felixganzer) add control clear of colors and effects

### 0.1.3 (2021.01.01)
* (felixganzer) add read out priorities to see actual running colors and effects

### 0.1.2 (2020.12.30)
* (felixganzer) add read out sysinfos to check Version of Hyperion

### 0.1.1 (2020.12.30)
* (felixganzer) add controlling components of hyperion
* (felixganzer) create first config to set IP, Port and Priority

### 0.1.0 (2020.12.29)
* (felixganzer) creating api class to communicate with hyperion and adding read out instances of hyperionNG

### 0.0.1 (2020.12.29)
* (felixganzer) initial release

## License
MIT License

Copyright (c) 2020-2021 felixganzer <felixganzer@web.de>

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