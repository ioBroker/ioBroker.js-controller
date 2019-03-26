---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.broadlink2/README.md
title: ! [Logo] (./ admin / broadlink.png) Steuert BroadLink IR / RF-Fernbedienungen und Schaltsteckdosen
hash: ojXJVWaPDij5W3jYFX3qBu8GsySY/rPG3ElGnBuLIqE=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.broadlink2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.broadlink2.svg)
![Travis-CI-Build-Status](https://travis-ci.org/frankjoke/ioBroker.broadlink2.svg?branch=master)
![AppVeyor Build-Status](https://ci.appveyor.com/api/projects/status/d2wwp0f02t512wp8?svg=true)
![NPM](https://nodei.co/npm/iobroker.broadlink2.png?downloads=true)

Steuert BroadLink IR / RF-Fernbedienungen und Schaltsteckdosen
## Adapter für verschiedene Broadlink WLan-Geräte (RM ++, SP ++, A1)
Dies ist ein ioBroker-Adapter für mehrere Broadlink-Switches wie RM2, SP1, SP2, SP3, Honeywell SP2, SPMini, SPMini2, SPMiniPlus und einige OEM-Produkte von ihnen.
Außerdem werden Fernbedienungen unterstützt, wie RM2, RM Mini, RM Pro Phicomm, Home Plus Plus, RM2 Home Plus, RM2 Pro Plus, RM2 Pro Plus, RM2 Pro Plus2 und RM2 Pro Plus BL. Mehrere Controller erstellen eigene Einträge und müssen separat geschult werden.
Es durchsucht das Netzwerk nach kompatiblen Geräten und installiert diese (derzeit nur Switches vom Typ SP?).

Wenn Sie Zustände für RM * gelernt haben und dann ihren Namen umbenennen, ändert sich auch die Zustands-ID in den neuen Namen!

Sie können auch Ihre eigenen neuen Befehle in LearnedStates erstellen, wenn Sie "code" + Ihren Code als Wert verwenden (wobei "CODE_" dem Code vorangeht oder sogar besser (weil er bleibt, wenn Sie den Status umbenennen) einen Feldcode hinzufügen 'nativ mit dem admin.object Bleistift und dort den Hex-Code (ohne' CODE_ '!) einfügen.

Der Adapter verfügt über feste Zustände, um Codes von RM-Geräten zu senden oder zu lernen. Sie können auch einzelne Szenen (Aktionen auf mehreren Geräten) senden.

Wenn Geräte, die für eine bestimmte IP-Adresse konfiguriert wurden, nicht erneut gefunden werden, werden sie als "nicht erreichbar" gekennzeichnet. Wenn sie erneut verbunden werden, sind sie normal verwendbar.

Wenn ein Gerät nicht zweimal hintereinander antwortet, ist es nicht erreichbar. ***Nicht erreichbare*** Geräte geben alle 50 Scans eine Protokollwarnung aus. Nach 10 Scans versucht der Adapter, sie unter derselben IP-Adresse wie zuvor wiederzufinden. Wenn Sie die IP-Adresse geändert haben, führen Sie einen neuen Scan durch.

Bitte löschen Sie Geräte aus admin.objects, falls Sie diese dauerhaft entfernen oder in Ihrem Router umbenennen!

### Hinweis
SP1-Geräte können nicht abgefragt werden.

* Dieser Adapter basiert auf dem ursprünglichen Broadlink-Adapter v0.1.1, der hier zu finden ist: <https://github.com/hieblmedia/ioBroker.broadlink>

## Aufbau
* Geben Sie in der Konfiguration das Präfix der Netzwerkadresse ein, das bei der Generierung von Gerätenamen entfernt werden soll
* Geben Sie die Anzahl der Sekunden zwischen den Abfragen ein. Bei jeder Abfrage werden alle SP * -Geräte, die SP1 untersuchen, nach dem Status des Schalters gefragt. Diese Funktion kann deaktiviert werden, indem die Abrufverzögerung auf 0 eingestellt wird. Bei einigen RM-Geräten mit Temperaturanzeige wird auch die Temperatur aktualisiert.

## How-To-Codes lernen
* In Objects von ioBroker finden Sie "broadlink2. [Gerätename] .Learn oder LearnRF für Geräte vom Typ" + ".
* Für RM (x) + (Plus) -Geräte erhalten Sie auch einen speziellen RS-Sweep-Lear-Button, mit dem Sie mehr Geräte lernen können als auf normalen 433MHz.
* Setzen Sie dieses Objekt auf true. (Sie können in der Objektansicht auf die Schaltfläche klicken.)
* Drücken Sie jetzt innerhalb von 30 Sekunden eine Taste auf Ihrer Fernbedienung.
* Ein neues Objekt sollte nun im Objekt "broadlink. [N]. [Gerätename] .LearnedState" mit dem Namen ">>> Gelerntes umbenennen @ YYYYMMDDTHHmmSS" erscheinen.
* Sie können auf die Schaltfläche in der Objektansicht klicken, um den Code zu senden.
* Um das Element umzubenennen, klicken Sie auf den Namen (beginnend mit `>>>`) und ändern Sie den Namen. Es sollte nicht `,`, `.` oder`; `enthalten

Es ist auch möglich, die Codes aus [RM-Brücke](http://rm-bridge.fun2code.de/) zu verwenden.
Erstellen Sie einfach ein Objekt (state, type button) mit dem Wert, dem Sie "CODE_" voranstellen, oder mit dem systemeigenen Eintrag `code` ohne 'CODE_'.

## Szenen verwenden
* Szenen bestehen aus ID's oder Zahlen mit `,` aneinandergereiht. Normal werden sie im Abstand von 100ms hintereinander ausgelöst. Wird eine Zahl gefunden? Auch `, SP: dose1, RM: your.L.StereoEin, 1000, RM: your.L.TVEin` würde die Steckdose einschalten, dann den Fernseher 1100ms nachher die Stereoanlage. Man kann auch Werte bei anderen Staaten angeben: `hm-rpc.0.MEQ1435726.1.STATE` würde diesen einschalten! Übrigens, Bei boolschen Stateskann kann das '= 1 / = on / = true / = ein' weggelassen werden, da der Default-Wert ist. Beim Ausschalten wäre ein '= 0 / = false / = aus / = off' undbedingt notwendig!

## Zustände verwenden
* Sie können zustände anlegen, die mit gelernten Signale ein- oder ausgeschaltet werden.
Damit geben Sie den State-Namen und die Signale ein.
Bei allen boolschen Staaten wird nur der erste Wert angezeigt. Das ist von Vorteil, wenn mehrere Tasten ein Gerät einschalten (oder Ausschalten)
* Es kännen zum Ausschalten auch keine Signale gelistet werden
* wird als Aus-Signal angegeben '+' angegeben. Wenn dann der Zustand mit Wert 123 beschrieben wird dann '1', '2' und dann '3' mit jeweils nach 1/3 Sekunde geschickt wird!

Die Liste muss mit dem 0-Befehl beginnen und mit dem 9-Befehl enden!

## Senden Sie Nachrichten an den Adapter
Der Adapter versteht jetzt auch 'sendTo' Kommandos.

* `debug`:` sendTo ('broadlink2.0', 'debug', 'on') `(es geht auch 0,1, on, off, ein, aus, true, false) würde debug ein- oder ausschalten.
get get: sendTo ('broadlink2.0', 'get', 'RM2: RMPROPLUS.Temperature'` kann der Zustand von Werten abgefragt werden, man muss zB `{val: 29.9, ack: true, ts: 1505839335870 , q: 0, von: 'system.adapter.broadlink2.0', lc: 1505839335870} `zurück
* `switch`: schaltet Steckdose ein / aus je nach Text:` sendTo ('broadlink2.0', 'switch', 'SP: Ihre Geräte-ID = ein') `
* `switch_on` /` switch_off`: sendTo ('broadlink2.0', 'switch_on', 'SP: Ihre Geräte-ID') `
* `send`:` sendTo ('broadlink2.0', 'send', 'RM: yourdev.Learn') `würde lernen starten und` sendTo ('broadlink2.0', 'send', 'RM: yourdev.L .yourid ') `würde den code (oder eine Scene) senden.
* send_scene: `sendTo ('broadlink2.0', 'send_scene', 'scene xxx')` würde den als message angegebenen Text als Szene ausführen
* `send_code`:` sendTo ('broadlink2.0', 'send_code', 'RM: Ihre Fernbedienung.CODE_xxxxx') `würde den CODE_xxxx vom R: Ihren Namen senden.

## Bekannte Probleme
* Wenn Sie dasselbe Signal mehrmals lernen, kann der Code jedes Mal anders sein. Dies kann nicht geändert werden.
* Manchmal werden keine Geräte gefunden, wenn sie nicht auf die Suche reagieren. Führen Sie einen erneuten Scan durch oder starten Sie den Adapter erneut, um eine neue Instanz neu zu starten.

## Wichtig / Wichtig
* Benötigt Knoten> = v4.2

## Installation
Mit ioBroker admin, npm install iobroker.broadlink2 oder von <https://github.com/frankjoke/ioBroker.broadlink2>

## Changelog

### 1.9.1
* added anothe RM Mini code

### 1.8.1
* Changed util.js and tests and added new devices

### 1.7.0

* Changed and corrected states which are created by A1-devices

### 1.6.0

* Added RF learning for RM-Plus devices
* Changed Learn states to LearnRF and LearnIR to differentiate
* a lot of code change to improve error handling and renaming

### 1.5.3

* Added ***notReachable*** states to devices which can return values (SP,RM,A1)
* Added info when SP's are switched manually
* devices which are disconnected will be stated as such and reconeccted automatically

### 1.5.0

* Added ***Scenes*** um mehrere Befehle hintereinander auszuführen. Diese können aud Adapter.config angelegtr werden.
* Adapter verwendet kürzere Namen
* Adapter kann codes oder Szenen direkt als Befehl senden
* Adapter verwendet keine 'strings' mehr als button type

### 1.1.1

* Added ***NewDeviceScan***-Button um einen neuen scan zu veranlassen ohne den Adapter zu starten.
* Adapter lest sofort die Werte der Devices ein
* Problem solved which occured when multiple IP names were resolved by reverse-dns.

### 1.1.0

* Support for A1 devices added (thanks a lot to **blackrozes**)
* bug fix for SP?
* Receive and execute message from sendTo to broadlink2 implemented

### 1.0.3

* Renamed to ioBroker.broadlink2 on Git
* Bug fix on 1.0.1

### 1.0.0

* Added learned state renaming, just rename the name and the ID will be renamed as well.
* Added debugging with 'debug!' at beginning of IP suffix and you will see debug messages without setting Adapter to debug.

### 0.2.0

* Implemented SP2 switches and they are working to set them!
* Currently ONLY SP1 && SP2 (SP3?) are working, please test!
* Disabled RM? devices, no test available, ordered one for later re-implementation

### Todo for later revisions

## License

The MIT License (MIT)

Copyright (c) 2014-2019, frankjoke <frankjoke@hotmail.com>

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