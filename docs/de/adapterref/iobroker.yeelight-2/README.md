---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.yeelight-2/README.md
title: ioBroker.yeelight-2
hash: Kgokgx6YyMwsn8SeX8Yveg0962+Ac+mZW7EAWn2waCw=
---
![Anzahl der Installationen](http://iobroker.live/badges/yeelight-2-installed.svg)
![Ausführung](http://iobroker.live/badges/yeelight-2-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.yeelight-2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.yeelight-2.svg)
![Travis-CI](https://api.travis-ci.org/MeisterTR/ioBroker.yeelight-2.svg?branch=master)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/MeisterTR/ioBroker.yeelight-2?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.yeelight-2.png?downloads=true)

<!-- -->

![Logo](../../../en/adapterref/iobroker.yeelight-2/admin/yeelight.png)

# IoBroker.yeelight-2 ==================
[Deutsche Beschreibung hier](README_de.md)

Dieser Adapter steuert Ihr Yeelight-Gerät. Dieser Adapter ist nur für admin3. Admin2 wird nicht unterstützt

## Jump Version
Beim Wechsel von 0.4.X auf 0.9.X oder höher müssen die Objekte manuell gelöscht werden, damit sie erneut erstellt werden können.

## Installation
Für RGB-Lampen müssen Sie das LAN in den Einstellungen der yeelight-App aktivieren.

![](../../../en/adapterref/iobroker.yeelight-2/admin/lan.jpg)

## Config
Sie können Geräte manuell hinzufügen oder Geräte im Netzwerk suchen. Der Basisport ist 55443. Wenn Sie möchten, können Sie den Namen, die IP-Adresse, den Port und den Smartnamen ändern

### Smartname
Wenn Sie einen Smartnamen eingeben, wird das Gerät zur iobroker.cloud hinzugefügt und kann von alexa gesteuert werden.

Gerät suchen
Mit dieser Schaltfläche können Sie Ihr Netzwerk nach Geräten durchsuchen. Wenn etwas gefunden wird, werden die Divices zur Tabelle hinzugefügt. Es dauert ungefähr 20 Sekunden, um das Netzwerk zu scannen. Wenn die Geräte nicht gefunden werden, ist der LAN-Modus nicht aktiviert oder die Lampen befinden sich in einem anderen Netzwerk.

## Set_scene
Verwendung: Mit dieser Methode wird die intelligente LED direkt in den angegebenen Status gesetzt. Wenn die intelligente LED nicht leuchtet, wird zuerst die intelligente LED eingeschaltet und der angegebene Befehl ausgeführt.

Parameter: 3 ~ 4.

 "class" kann "color", "hsv", "ct", "cf", "auto_dealy_off" sein.

- "Farbe" bedeutet, die intelligente LED in die angegebene Farbe und zu ändern

Helligkeit.

- "hsv" bedeutet, die intelligente LED auf die angegebene Farbe und Helligkeit einzustellen.
- "ct" bedeutet, dass die intelligente LED auf den angegebenen Wert und die angegebene Helligkeit eingestellt wird.
- "cf" bedeutet, dass ein Farbfluss auf bestimmte Weise gestartet wird.
- "auto_delay_off" bedeutet, dass die Smart-LED eingeschaltet ist

Helligkeit und starten Sie einen Sleep-Timer, um das Licht nach den angegebenen Minuten auszuschalten.

 "val1", "val2", "val3" sind klassenspezifisch.

Anforderungsbeispiel:

- `` ["Farbe", 65280, 70] ``
- `` ["hsv", 300, 70, 100] ``
- `` ["ct", 5400, 100] ``
- `` ["cf", 0,0, "500,1,255,100,1000,1,16776960,70"] ``
- `` ["auto_delay_off", 50, 5] ``

HINWEIS: Der Status "Ein" und "Aus" wird akzeptiert.

 Für die obigen Beispiele:

 - Zuerst müssen Sie die Farbe auf "652280" und 70% Helligkeit einstellen.
 - Das zweite ist, Farbe für Farbton: 300, Sättigung: 70 und maximale Helligkeit einzustellen.
 - Der dritte Wert ist auf 500 K und 100% Helligkeit eingestellt.
 - Der vierte Schritt besteht darin, einen unendlichen Farbfluss auf zwei Strömungstupeln zu starten.
 - Der fünfte ist das Licht auf 50% Helligkeit einschalten und dann ausschalten

nach 5 Minuten.

## Changelog
### 1.0.1 (2018-12-08)
* (MeisterTR) push version, added set_scene
### 0.9.6 (2018-12-08)
* (MeisterTR) yeelight-wifi added
* (MeisterTR) fixed  bugs
* (MeisterTR) add manuell light
* (MeisterTR) better error handling
* (MeisterTR) fixed reconnect at start
* (MeisterTR) delete object and smartname bug fixed
### 0.9.1 (2018-10-31)
* (MeisterTR) added offline detection, poll sates, cleanup
### 0.9.0 (2018-08-29)
* (MeisterTR) rebuild
### 0.4.1 (2018-08-29)
* (MeisterTR) fixed JSON error
### 0.4.0 (2018-08-29)
* (MeisterTR) fixed errors
* (MeisterTR) added scenen
### 0.3.6 (2018-07-07)
* (MeisterTR) catch spaces in config, small performance changes
### 0.3.5 (2018-06-18)
* (MeisterTR) added yeelight650, fixed some bugs, power on when ct change
### 0.2.9 (2018-06-07)
* (MeisterTR) change name for repo and npm
### 0.2.8 (2018-06-01)
* (MeisterTR) fixed bug wit port, fixed set ct by alexa
### 0.2.6 (2018-05-31)
* (MeisterTR) fixed manny bugs.
### 0.2.0 (2018-03-07)
* (MeisterTR) many changes add smartname Option, add manual devices, many fixes
* (MeisterTR) fix role for alexa
### 0.1.1 (2018-03-07)
* (MeisterTR)return to default value when turn on
* (MeisterTR)fix role for alexa
### 0.1.0 (2018-03-07)
* (MeisterTR) many changes, add hue and sat for alexa control
### 0.0.2 (2018-03-07)
* (MeisterTR) objects not overwirte after restart
### 0.0.2 (2018-03-07)
* (MeisterTR) testing added, log changed
### 0.0.1 (2018-01-29)
* (cahek2202) initinal version



base from: adb backup https://github.com/cahek2202/ioBroker.yeelight