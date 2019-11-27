---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.yeelight-2/README.md
title: ioBroker.yeelight-2
hash: wDWdWZngi4yY2tvEIk9nlPOBTlLqkwqMQfNSRCw9xlk=
---
![Logo](../../../en/adapterref/iobroker.yeelight-2/admin/yeelight.png)

![Anzahl der Installationen](http://iobroker.live/badges/yeelight-2-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.yeelight-2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.yeelight-2.svg)
![Travis-CI](https://api.travis-ci.org/MeisterTR/ioBroker.yeelight-2.svg?branch=master)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/MeisterTR/ioBroker.yeelight-2?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.yeelight-2.png?downloads=true)

# IoBroker.yeelight-2
=================

[Deutsche Beschreibung hier](README_de.md)

Dieser Adapter steuert Ihr Yeelight-Gerät. Dieser Adapter ist nur für admin3. Admin2 wird nicht unterstützt

## Jump Version
Beim Wechsel von 0.4.X zu 0.9.X oder höher müssen die Objekte manuell gelöscht werden, damit sie neu erstellt werden können.

## Installation
Für RGB-Lampen müssen Sie das LAN in den Einstellungen der yeelight-App aktivieren.

![](../../../en/adapterref/iobroker.yeelight-2/admin/lan.jpg)

## Konfig
Sie können Geräte manuell hinzufügen oder Geräte im Netzwerk suchen. Der Standard-Port ist 55443. Wenn Sie möchten, können Sie den Namen, die IP-Adresse, den Port und den Smart-Namen ändern

### Smartname
Wenn Sie einen Smartnamen eingeben, wird das Gerät zur iobroker.cloud hinzugefügt und kann von alexa gesteuert werden.

### Gerät suchen
Mit dieser Schaltfläche können Sie Ihr Netzwerk nach Geräten durchsuchen. Wenn etwas gefunden wird, werden die Geräte der Tabelle hinzugefügt. Das Scannen des Netzwerks dauert ca. 20 Sekunden. Wenn die Geräte nicht gefunden werden, ist der LAN-Modus nicht aktiviert oder die Lampen befinden sich in einem anderen Netzwerk.

## Set_scene
Verwendung: Mit dieser Methode wird die Smart-LED direkt auf den angegebenen Status gesetzt. Wenn die Smart-LED nicht leuchtet, schaltet sie zuerst die Smart-LED ein und wendet dann den angegebenen Befehl an.

Parameter: 3 ~ 4.

 "class" kann "color", "hsv", "ct", "cf", "auto_dealy_off" sein.

- "Farbe" bedeutet, dass die Smart-LED auf die angegebene Farbe und geändert wird

Helligkeit.

- "hsv" bedeutet, dass die Smart-LED auf die angegebene Farbe und Helligkeit geändert wird.
- "ct" bedeutet, dass die Smart-LED auf den angegebenen Wert für ct und Helligkeit geändert wird.
- "cf" bedeutet, dass ein Farbfluss in der angegebenen Weise gestartet wird.
- "auto_delay_off" bedeutet, dass die Smart-LED auf den angegebenen Wert eingeschaltet wird

Helligkeit und starten Sie einen Sleep-Timer, um das Licht nach den angegebenen Minuten auszuschalten.

 "val1", "val2", "val3" sind klassenspezifisch.

Beispiel anfordern:

- "[" color ", 65280, 70]"
- "[" hsv ", 300, 70, 100]"
- "[" ct ", 5400, 100]"
- "[" cf ", 0,0," 500,1,255,100,1000,1,16776960,70 "]"
- `` ["auto_delay_off", 50, 5] ``

HINWEIS: Akzeptiert sowohl im Status "Ein" als auch im Status "Aus".

 Für obige Beispiele:

 - Die erste ist, die Farbe auf "652280" und 70% Helligkeit einzustellen.
 - Die zweite Option ist, die Farbe auf Farbton: 300, Sättigung: 70 und maximale Helligkeit einzustellen.
 - Der dritte ist CT auf 500K und 100% Helligkeit eingestellt.
 - Der vierte ist, einen unendlichen Farbfluss auf zwei Flusstupeln zu starten.
 - Der fünfte ist das Einschalten des Lichts auf 50% Helligkeit und dann ausschalten

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