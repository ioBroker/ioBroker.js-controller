---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ham/README.md
title: ioBroker Homebridge Zubehörmanager
hash: LqJkGBTKLwpEowhRXJMqL8JiCgbQgeamsXQKiRqqzsI=
---
![Logo](../../../en/adapterref/iobroker.ham/admin/ham.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ham.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ham.svg)
![Anzahl der Installationen (spätestens)](https://iobroker.live/badges/ham-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/ham-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ioBroker/iobroker.ham.svg)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/ioBroker/ioBroker.ham.svg)
![NPM](https://nodei.co/npm/iobroker.ham.png?downloads=true)

# IoBroker Homebridge Zubehörmanager
** Tests: ** ![Testen und freigeben](https://github.com/ioBroker/ioBroker.ham/workflows/Test%20and%20Release/badge.svg)

Verwenden Sie Homebridge-Plugins in ioBroker oder führen Sie eine global installierte Homebridge als ioBroker-Adapter aus.
Alle Staaten von Homebridge werden auch in ioBroker verfügbar sein und können dort auch gesteuert werden.

## Beschreibung
Dieser Adapter bietet drei verschiedene Modi:

### Standardmodus (Wrapper)
Im Standardmodus können Sie mit dem Adapter Homebridge-Plugin-Module direkt verwenden.
Sie können alle verfügbaren Plugins auf der NPM-Website unter [Suche nach dem Schlüsselwort `homebridge-plugin`](https://www.npmjs.com/search?q=homebridge-plugin) durchsuchen.

Sie fügen einfach die Liste der Module zur Adapterkonfiguration hinzu und geben die Konfiguration im JSON-Editor an (siehe Plugin-Beschreibungen).
Danach werden alle Homebridge-Objekte auch in ioBroker erstellt und alle beschreibbaren Objekte können ebenfalls geändert werden.

** WICHTIG: In diesem Modus können die Geräteintegrationen der bereitgestellten Homebridge-Plugins verwendet werden. Es wird keine "Brücke" bereitgestellt, die von der Home App verwendet werden kann! **

Einen Link zu erfolgreich getesteten Plugins mit Beispielen finden Sie hier: https://forum.iobroker.net/viewtopic.php?f=20&t=15021

### Local-Homebridge-Modus
Wenn Sie möchten, dass eine veröffentlichte Bridge von der Home-App verwendet wird und Sie auch über ioBroker mit ihr interagieren und die Daten abrufen möchten, Homebridge jedoch noch nicht installiert ist, verwenden Sie diesen Modus.

Der lokale Modus installiert die aktuelle kompatible Version von Homebridge und führt sie als ioBroker-Benutzer aus. Sie stellen die vollständige Homebridge-Konfiguration mit ioBroker bereit.
Die Installation der Homebridge-Module erfolgt ebenfalls über ioBroker.

** WICHTIG: Bei Verwendung von untergeordneten Bridges (neue Homebridge-Funktion seit 1.3.x) kann der Adapter NICHT auf die von diesen untergeordneten Bridges bereitgestellten Daten zugreifen! Nur die Hauptbrücke ist zugänglich! **

### Global-Homebridge-Modus
Wenn Sie Homebridge (Apple OpenSource SmartHome) bereits als globale Installation auf dem Host verwenden, auf dem auch ioBroker ausgeführt wird, können Sie diese vorhandene Homebridge-Installation verwenden und diese Homebridge-Installation als ioBroker-Prozess starten. In diesem Fall wird der Homebridge-Server von ioBroker gestartet.
Zusätzlich sind alle Status von Homebridge als Status in ioBroker verfügbar und können von ioBroker aus gesteuert werden.

Damit dies funktioniert, müssen Sie den Speicherort des globalen Knotenmodulordners des Systems angeben. Für diesen Aufruf **npm root -g** Außerdem müssen Sie den Pfad des Homebridge-Konfigurationsverzeichnisses angeben (normalerweise .homebridge im Ordner "users").

** WICHTIG: ioBroker wird als Benutzer "iobroker" ausgeführt, Homebridge jedoch normalerweise als Root- oder Homebridge-Benutzer (je nachdem, wie Sie es installiert haben). Sie müssen sicherstellen, dass der ioBroker-Benutzer auf den Ordner "Persistenz" der Homebride zugreifen kann. Andernfalls werden Fehler angezeigt, dass die Datei nicht gespeichert werden kann (wodurch der Adapter abstürzen kann!) **

** WICHTIG: Bei Verwendung von untergeordneten Bridges (neue Homebridge-Funktion seit 1.3.x) kann der Adapter NICHT auf die von diesen untergeordneten Bridges bereitgestellten Daten zugreifen! Nur die Hauptbrücke ist zugänglich! **

## Folgende Plugins wurden im Standardmodus getestet
* homebridge-Chamberlain v1.0.1 - Plugin für Chamberlain Garagentoröffner mit MyQ
* homebridge-doorbird v0.0.4 - Plugin für Doorbird
* homebridge-dyson-link v2.2.2 - Dyson Link-Geräte
* homebridge-edomoticz v2.1.11 - Ein vollwertiges, aktuelles Plugin für Domoticz
* homebridge-Fibaro-HC2 v2.1.5 - Fibaro HomeCenter-Integration
* homebridge-homee v0.2.4 - Ein vollwertiges, aktuelles Plugin für Homee
* homebridge-ikea-tradfri-gateway v1.0.26 - Tradfri
* homebridge-noolite v0.0.29 - Noolite über USB MTRF-64- oder МТRF-64-Module
* homebridge-platform-wemo v1.0.1 - Belkin WeMo Platform Plugin
* homebridge-saisone v1.0.1 - Ein Plugin zur Anzeige der aktuellen Jahreszeit.
* homebridge-vera v0.8.2 - VeraLink ist eine Anwendung für Z-Wave-Zubehör von Vera (Node.js 8.11.3).

... und viele mehr

## MACHEN
* Tests
* Mehr Dokumentation?!

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) update homebridge and wrapper to 1.3.2 (latest as of today). IMPORTANT: Requires also homebridge 1.3.x installed when using global mode and local mode will update to 1.3.x too! Check your plugins for updates!
* (Apollon77) IMPORTANT: Configurations in local/global mode with child bridges will NOT work because ioBroker can not access the data on the child bridge processes!

### 3.0.2 (2020-11-29)
* (Apollon77) update homebridge in wrapper to 1.1.6 (latest as of today)

### 3.0.1 (2020-08-08)
* (Apollon77) set a very high limit (again) on allowed accessories and services because irrelevant 

### 3.0.0 (2020-08-04)
* (Apollon77) BREAKING: ONLY WORKS WITH HOMEBRIDGE 1.1.x+ AND Node JS >=10.17.0!! Make sure plugins support it AND homebridge is updated to 1.1.x when you use the Global Mode!

### 1.1.2 (2019-07-08)
* (Apollon77) Allow more then 149 accessories in wrapper mode

### 1.1.1 (2019-07-05)
* (Apollon77) Add option to update NPM modules in Admin. Reinstall will happen after saving settings
* (Apollon77) Enhance NPM installation handling
* (Apollon77) Allow to specify special version of homebridge NPM packages using name@version
* (Apollon77) Allow to specify homebridge command line options. They will be added to the command line arguments (Some plugins need that or special features are only available with it)
* (Apollon77) Add "Local" mode that installs an own homebridge and run it as bridge

### 1.0.1 (2019-01-16)
* (SchumyHao) Add Chinese support

### 1.0.0 (WIP)
* (Apollon77) add polling interval to global mode
* (Apollon77) add option to use insecure flag in wrapper mode

### 0.4.5 (2018.08.21)
* (Apollon77) issues fixed

### 0.4.4 (2018.08.07)
* (Apollon77) corrected automatic role determination and bugs fixed

### 0.4.2 (2018.06.25)
* (Apollon77) Fix for global mode

### 0.4.1 (2018.06.21)
* (Apollon77) option to poll values from the plugins added and other optimizations

### 0.3.1 (2018.06.20)
* (kirovilya) Fixed a bug in global mode that values were not reported back to iOS devices

### 0.3.0 (2018.06.20)
* (bluefox) Support of ham plugins was added

### 0.2.6 (2018.06.19)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.5 (2018.06.18)
* (Apollon77) Catch all console logs from Homegridge and make available as debug log

### 0.2.4 (2018.06.18)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.3 (2018.06.17)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.2 (2018.06.17)
* (Bluefox) Fixes for JSON editor in Firefox and Chrome

### 0.2.0/0.2.1 (2018.06.17)
* (Apollon77) Public test version with both modes
* (Bluefox) Admin3

### 0.1.0 (2018.06.09)
* (Apollon77) Update for working mode 1

### 0.0.1 (2018.03.24)
* (kirovilya) initial commit

## License
The MIT License (MIT)

Copyright (c) 2018-2020 Apollon77 <ingo@fischer-ka.de>

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