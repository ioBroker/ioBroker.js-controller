---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.broadlink2/README.md
title: ! [Logo] (./ admin / broadlink2.png) Steuert BroadLink-kompatible Geräte
hash: WTYq/WXAyxAsoH6tiIsBCs4yCcfe2WO0lK+6ud+WRQg=
---
# §IIIIIII_0§§ Steuert BroadLink-kompatible Geräte

![NPM-Version](http://img.shields.io/npm/v/iobroker.broadlink2.svg)
![Eingerichtet](http://iobroker.live/badges/broadlink2-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.broadlink2.svg)
![Travis-CI](http://img.shields.io/travis/frankjoke/ioBroker.broadlink2/master.svg)

[Deutsche Anleitung - Deutsche Anleitung](README_DE.md)

## Adapter für verschiedene Broadlink-kompatible WLan-Geräte (RM ++, SP ++, A1, Floureon, S1C)
Dies ist ein ioBroker-Adapter für mehrere Broadlink-Switches wie RM2, RM3, RM Plus, SP1, SP2, SP3, Honeywell SP2, SPMini, SPMini2, SPMiniPlus und einige OEM-Produkte von ihnen.
Außerdem werden Fernbedienungen unterstützt, wie RM2, RM Mini, RM Pro Phicomm, Home Plus Plus, RM2 Home Plus, RM2 Pro Plus, RM2 Pro Plus, RM2 Pro Plus2 und RM2 Pro Plus BL. Mehrere Controller erstellen eigene Einträge und müssen separat geschult werden.
Es durchsucht das Netzwerk nach kompatiblen Geräten und installiert diese (derzeit nur Switches vom Typ SP?).

Wenn Sie Zustände für RM * gelernt haben und dann ihren Namen umbenennen, ändert sich auch die Zustands-ID in den neuen Namen!

Sie können auch Ihre eigenen neuen Befehle in LearnedStates erstellen, wenn Sie "code" + Ihren Code als Wert verwenden (wobei "CODE_" dem Code vorangeht oder sogar besser (weil er bleibt, wenn Sie den Status umbenennen) 'nativ mit dem admin.object Bleistift und dort den Hex-Code (ohne' CODE_ '!) einfügen.

Der Adapter verfügt über feste Zustände, um Codes von RM-Geräten zu senden oder zu lernen. Sie können auch einzelne Szenen (Aktionen auf mehreren Geräten) senden.

Wenn Geräte, die für eine bestimmte IP-Adresse konfiguriert wurden, nicht erneut gefunden werden, werden sie als "nicht erreichbar" gekennzeichnet. Wenn sie erneut verbunden werden, sind sie normal verwendbar.

Wenn ein Gerät 5 Minuten lang nicht antwortet, wird es als nicht erreichbar angezeigt. ***Nicht erreichbare*** Geräte geben bei jedem x-Scan eine Protokollwarnung aus. Nach einigen Scans wird der Adapter versuchen, sie zuvor wieder an derselben MAC-Adresse zu finden.

Bitte löschen Sie alte Geräte aus admin.objects, falls Sie diese dauerhaft entfernen oder in Ihrem Router umbenennen!

### Hinweis
SP1-Geräte können nicht abgefragt werden.

## Aufbau
* Geben Sie in der Konfiguration das Präfix der Netzwerkadresse ein, das bei der Generierung von Gerätenamen entfernt werden soll
* Geben Sie die Anzahl der Sekunden zwischen den Abfragen ein. Bei jeder Abfrage werden alle SP * -Geräte, die SP1 untersuchen, nach dem Status des Schalters gefragt. Diese Funktion kann deaktiviert werden, indem die Abrufverzögerung auf 0 eingestellt wird. Bei einigen RM-Geräten mit Temperaturanzeige wird auch die Temperatur aktualisiert.

## How-To-Codes lernen
* In Objects von ioBroker finden Sie "broadlink2. [Gerätename] .Learn oder LearnRF für Geräte vom Typ" + ".
* Für RM (x) + (Plus) -Geräte erhalten Sie auch einen speziellen RS-Sweep-Lear-Button, mit dem Sie mehr Geräte lernen können als auf normalen 433MHz.
* Setzen Sie dieses Objekt auf true. (Sie können in der Objektansicht auf die Schaltfläche klicken.)
* Drücken Sie jetzt innerhalb von 30 Sekunden eine Taste auf Ihrer Fernbedienung. Im Normalmodus drücken Sie kurz mit einer gewissen Zeit dazwischen, bis Sie es gelernt haben.
* Beim RF-Sweep-Learn müssen Sie die Taste zuerst ~ 10 Sekunden lang drücken, dann loslassen und dann erneut kurz drücken.
* Ein neues Objekt sollte nun im Objekt "broadlink. [N]. [Gerätename] .LearnedState" mit dem Namen ">>> Gelerntes umbenennen @ YYYYMMDDTHHmmSS" erscheinen.
* Sie können auf die Schaltfläche in der Objektansicht klicken, um den Code zu senden.
* Um das Element umzubenennen, klicken Sie auf den Namen (beginnend mit `_Rename_learned_`) und ändern Sie den Namen. Es sollte nicht `,`, `.` oder`; 'sowie einige andere Zeichen enthalten, sie werden durch' _ 'ersetzt.

Es ist auch möglich, die Codes aus [RM-Brücke](http://rm-bridge.fun2code.de/) zu verwenden.
Erstellen Sie einfach ein Objekt (state, type button) mit dem Wert, dem Sie "CODE_" voranstellen, oder mit dem systemeigenen Eintrag `code` ohne 'CODE_'.

## Szenen verwenden
* Szenen können IDs oder Namen sowie Nummern enthalten, die durch `,` getrennt sind. Normalerweise werden die IDs mit einer Zeitverschiebung von 100 ms ausgeführt / gesendet. Wenn Sie jedoch eine längere Pause benötigen, können Sie eine Zahl eingeben, die die Wartezeit in Millisekunden widerspiegelt. Zum Beispiel: "SP: dose = 1, 1000, RM: your.L.StereoEin, 1000, RM: your.L.TVEin" schaltet einen WLAN-Stecker mit dem Namen "SP: dose" ein und wartet dann eine Sekunde (tatsächlich 1,1 Sekunden) ), Schalten Sie den Stero ein und nach einer weiteren Sekunde den Fernseher. Sie können auch Geräte anderer Adapter wie "hm-rpc.0.MEQ1435726.1.STATE = true" umschalten, um dieses Homematic-Gerät einzuschalten! Boolsche Zustände können mit '= 1 / = on / = true / = ein' umgeschaltet werden, wenn Sie sie ohne '=' belassen, wird sie true verwenden. Um ein Gerät auszuschalten, beenden Sie es mit '= 0 / = false / = aus / = off', das ausgeschaltet werden muss!

## Zustände verwenden
* Sie können auch Zustände für Ihre Geräte erstellen, die Ein- und Ausschaltbefehle zu einem einzigen Zustand kombinieren, der wie jedes andere Gerät geschaltet werden kann.
* Sie müssen die Befehle zum Ein- und Ausschalten eines Zustands in den einzelnen Spalten auflisten. Diese können mehrere sein. Der Zustand kann also angezeigt werden, wenn Ihr Gerät von einem beliebigen Gerät ein- oder ausgeschaltet wird
* Wenn Sie den Status onlöy aktivieren oder deaktivieren, wird der erste Befehl Ein / Aus gesendet
* Wenn nur ein Befehl vorhanden ist, sendet der Switch den entsprechenden Befehl mit dem numerischen Wert "1", dh er sendet den ersten Befehl, wenn er eine "0" empfängt, der zweite, wenn er eine "1" empfängt. Auf diese Weise können Sie mehrere Zustände innerhalb eines Zustands simulieren.
* Wenn Sie nur "+" als Ausschaltbefehl verwenden, müssen Sie 10 Befehle angeben, die durch "," getrennt sind und die Nummern "0-9" auf der Fernbedienung widerspiegeln. Sie können dem Staat dann eine Nummer wie "123" (max. 9999) senden, und es würden "1", "2" und "3" mit 1/3 Sekunde Verzögerung zwischen ihnen gesendet! Auf diese Weise setzen Sie beispielsweise den Kanal im Fernsehen auf '33', indem Sie einfach 'TVchannel = 33' schreiben, wenn der Staatsname TVchannel lautet.

## Senden Sie Nachrichten an den Adapter
Der Adapter versteht auch 'sendTo'-Befehle.

* `debug`:` sendTo ('broadlink2.0', 'debug', 'on') `(auch 0,1, ein, aus, ein, aus, true, false) würde den Debug-Modus einschalten.
* `get`:` sendTo ('broadlink2.0', 'get', 'RM2: RMPROPLUS.Temperature') könnte Daten von einem Gerät anfordern wie `{val: 29.9, ack: true, ts: 1505839335870, q: 0, from: 'system.adapter.broadlink2.0', lc: 1505839335870} `zurück
* `switch`: kann einen Stecker ein- oder ausschalten:` sendTo ('broadlink2.0', 'switch', 'SP: Ihre Geräte-ID = ein') `
* `switch_on` /` switch_off`: sendTo ('broadlink2.0', 'switch_on', 'SP: Ihre Geräte-ID') `
* `send`:` sendTo ('broadlink2.0', 'send', 'RM: yourdev._Learn') `würde 'learn' starten und` sendTo ('broadlink2.0', 'send', 'RM: yourdev.L .yourid ') `würde den Code senden.
* send_scene: `sendTo ('broadlink2.0', 'send_scene', 'scene xxx')` würde den als message angegebenen Text als Szene ausführen
* `send_code`:` sendTo ('broadlink2.0', 'send_code', 'RM: Ihre Fernbedienung.CODE_xxxxx') `würde den CODE_xxxx vom R: Ihren Namen senden.

## Floureon oder Beok313 Thermostate
* Die meisten Daten können eingestellt werden. Die Uhrzeit kann eingestellt werden, indem etwas in "_setTime" geschrieben wird. In diesem Fall wird die Uhrzeit des Geräts auf die ioBroker-Systemzeit eingestellt. Dies wird automatisch auch beim Start des Adapters durchgeführt.

## Konfigurieren Sie weitere neue Geräte
* Sie können neue Geräte hinzufügen, die dasselbe Protokoll verwenden, indem Sie sie mit der Geräte-ID (in Hex oder Dezimal) und der Geräteklasse (dort gelisted) (Klasse = A1, MP1, RM, RMP, S1C, SP1, SP2, SP3P, T1). Sie können also eine neue Fernbedienung hinzufügen, die der Adapter nur als unbekanntes Gerät mit der Hex-ID 0x1234 von 0x01234 = RMP zur RM-Liste findet.

## Umbenennen von Geräten
* Geräte erhalten normalerweise ihren Netzwerk-Hostnamen oder eine Kombination aus Gerätetyp, ID und MAC-Adresse als Namen mit den ersten beiden Buchstaben des Typs mit dem vorangestellten ':'. Sie können ein solches Gerät mit "T1: BroadLink-OEM-T1-fa-83-7c = Beok313" umbenennen. In diesem Fall wird der ursprüngliche Name nicht verwendet, der neue Name ist jedoch "Beok313".

## Debug-Modus
* Wenn Sie am Ende der Liste der hinzugefügten neuen Geräte ein "!" Hinzufügen (auch wenn dieses leer ist), können Sie den Adapter in den Debug-Modus setzen, in dem er viele zusätzliche Informationen protokolliert, selbst wenn er nicht auf 'gesetzt ist. Info-Modus in Admin.

## Bekannte Probleme
* Wenn Sie dasselbe Signal mehrmals lernen, kann der Code jedes Mal anders sein. Dies kann nicht geändert werden.
* Manchmal werden keine Geräte gefunden, wenn sie nicht auf die Suche reagieren. Führen Sie einen erneuten Scan durch oder starten Sie den Adapter erneut, um eine neue Instanz neu zu starten.

## Wichtig / Wichtig
* Benötigt Knoten> = V6

## Installation
Mit ioBroker admin kann npm iobroker.broadlink2 oder von <https://github.com/frankjoke/ioBroker.broadlink2> installiert werden

## Changelog

### 2.0.0
* Can handle Floureon/Beko thermostats (now with MQTT)
* Can handle S1C security devices
* Names device after their name or with their mac to reduce possibility of renaming
* Can rename devices
* Can add device Id's/Types for new devices
* New communication routines to find & re-find devices
* New communication protocoll with devices which do not allow that devices can get commands from 2 sources intermixed


### 1.9.1

* added anothe RM Mini code

### 1.8.1

* Changed util.js and tests and added new devices

### 1.7.0

* Changed and corrected states which are created by A1-devices

### Todo for later revisions

* config of devices and codes in separate config tool

## License

The MIT License (MIT)

<<<<<<< HEAD
Copyright (c) 2014-2019, frankjoke <frankjoke@hotmail.com>
=======
Copyright (c) 2014-2019 Frank Joke <frankjoke@hotmail.com>
>>>>>>> 7aa61304cbc5059e752952ce3a494629cd151962

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