---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.broadlink2/README.md
title: ! [Logo] (./ admin / broadlink2.png) Steuert BroadLink-kompatible Geräte
hash: Wu14KdJTJSFWbkb4/bCIIoRgWFIPOPdGnxCp67MghtQ=
---
# ![Logo](../../../en/adapterref/iobroker.broadlink2/./admin/broadlink2.png) Steuert BroadLink-kompatible Geräte

![NPM-Version](http://img.shields.io/npm/v/iobroker.broadlink2.svg)
![Eingerichtet](http://iobroker.live/badges/broadlink2-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.broadlink2.svg)
![Travis-CI](http://img.shields.io/travis/frankjoke/ioBroker.broadlink2/master.svg)

[Deutsche Anleitung übersetzt von Google](https://translate.google.com/translate?sl=en&tl=de&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.broadlink2%2Fblob%2Fmaster%2FREADME.md)

[Русские инструкции переведены с гуглом](https://translate.google.com/translate?sl=en&tl=ru&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.broadlink2%2Fblob%2Fmaster%2FREADME.md)

## Adapter für verschiedene Broadlink-kompatible WLan-Geräte (RM ++, SP ++, A1, Floureon, S1C, LB1)
Dies ist ein ioBroker-Adapter für mehrere Broadlink-Switches wie RM2, RM3, RM Plus, SP1, SP2, SP3, Honeywell SP2, SPMini, SPMini2, SPMiniPlus und einige OEM-Produkte von diesen.
Es werden auch Fernbedienungen wie RM2, RM Mini, RM Pro Phicomm, RM2 Home Plus, RM2 Home Plus GDT, RM2 Pro Plus, RM2 Pro Plus2 und RM2 Pro Plus BL unterstützt. Mehrere Controller generieren ihre eigenen Einträge und müssen separat geschult werden.
Es durchsucht das Netzwerk nach kompatiblen Geräten und installiert sie (derzeit nur Switches vom Typ SP?).

Wenn Sie Status für RM * gelernt und dann ihren Namen umbenannt haben, ändert sich die Status-ID ebenfalls in den neuen Namen!

Sie können auch Ihre eigenen neuen Befehle in LearnedStates erstellen, wenn Sie 'Code' + Ihren Code als Wert verwenden (wobei 'CODE_' vor dem Code steht oder noch besser (da dies beim Umbenennen des Status erhalten bleibt), fügen Sie einen Feldcode hinzu 'mit dem admin.object Bleistift einheimisch und dort den Hex-Code einfügen (ohne' CODE_ '!).

Der Adapter hat feste Zustände, um Codes von RM-Geräten zu senden oder zu lernen. Er kann auch einzelne Szenen senden (Aktionen auf mehreren Geräten).

Wenn Geräte, die für eine bestimmte IP konfiguriert sind, nicht wiedergefunden werden, werden sie als "nicht erreichbar" gekennzeichnet! Wenn sie wieder verbunden werden, können sie normal verwendet werden.

Wenn ein Gerät 5 Minuten hintereinander nicht antwortet, ist es nicht erreichbar. ***notReachable*** Geräte geben bei jedem x-Scan eine Protokollwarnmeldung aus. Nach einigen Scans versucht der Adapter, sie unter derselben Mac-Adresse wiederzufinden.

Bitte löschen Sie alte Geräte aus admin.objects, falls Sie sie dauerhaft entfernen oder in Ihrem Router umbenennen!

Der Adapter versucht, das Gerät zuerst anhand seines Namens und dann anhand seiner Mac-Adressen zu finden. Wenn sich der Name beispielsweise aufgrund einer Änderung der IP-Adresse ändert und die Mac-Adresse gleich bleibt, verwendet das Gerät weiterhin den alten Namen. Wenn das Gerät mit einem neuen Mac zu einem neuen Gerät wechselt, können Sie das Gerät in config umbenennen, um stattdessen einen alten Gerätenamen zu verwenden.

### Hinweis zum Polling
* SP1-Geräte können nicht abgefragt werden.
* Wenn Sie nur RM-Geräte verwenden, kann die Abfrage auf 2 Minuten (120 Sekunden) eingestellt werden, sollte jedoch nicht höher eingestellt werden, da sie sonst möglicherweise nicht erneut autorisiert werden
* Wenn Sie Schalter verwenden, die manuell umgeschaltet werden können, sollte das Molling 30s-1 Minute betragen, um Änderungen innerhalb einer Minute widerzuspiegeln.

## Aufbau
* Geben Sie in der Konfiguration das Präfix der Netzwerkadresse ein, das beim Generieren von Gerätenamen entfernt werden soll
* Geben Sie die Anzahl der Sekunden zwischen den Umfragen ein. Bei jeder Abfrage werden alle SP * -Geräte, die SP1 erläutern, nach dem Switch-Status gefragt. Diese Funktion kann deaktiviert werden, indem die Abfrageverzögerung auf 0 gesetzt wird. Bei einigen RM-Geräten mit Temperaturanzeige wird auch die Temperatur aktualisiert.
* Sie können jetzt IP-Adressen von zu findenden / enthaltenen Geräten hinzufügen, die sich ebenfalls in einem anderen Netzwerk als dem Netzwerk des Adapters befinden. In diesem Fall müssen Sie sicherstellen, dass der Computer, auf dem der Adapter ausgeführt wird, über interne oder externe Routing-Tabellen weiß, wie eine Verbindung zu diesem anderen Netzwerk hergestellt wird.
* Die Option "IP-Schnittstelle verwenden" kann so eingestellt werden, dass eine bestimmte Schnittstellenadresse verwendet wird. Dies kann hilfreich sein, wenn auf dem System, auf dem iobroker ausgeführt wird, LAN und LAN vorhanden sind und Sie nicht auf der ersten Schnittstelle, sondern nur auf WLAN scannen möchten auch, wenn sich die lokale Schnittstelle in einigen Docker- oder VM-Umgebungen von der externen unterscheidet. Sie müssen die IPv4-Adresse der Schnittstelle eingeben, die als Quelladresse verwendet werden soll. Andernfalls verwendet der Adapter 0.0.0.0 und hört nur alle lokalen Schnittstellen ab.

## How-To-Lernen von Codes auf RMs
* In Objekte von ioBroker finden Sie "broadlink2. [Gerätename] .Learn oder LearnRF für Geräte vom Typ '+'".
* Für RM (x) + (Plus) -Geräte erhalten Sie außerdem eine spezielle RS-Sweep-Lerntaste (_LearnRF), mit der Sie mehr Geräte als mit normalen 433 MHz lernen können.
* Setzen Sie dieses Objekt auf true. (Sie können auf die Schaltfläche in der Objektansicht klicken)
* Drücken Sie nun innerhalb von 30 Sekunden eine Taste auf Ihrer Fernbedienung. Drücken Sie im normalen Modus kurz mit etwas Zeit dazwischen, bis Sie gelernt haben.
* Beim RF-Sweep lernen Sie, dass Sie die Taste zuerst ~ 10-20 Sekunden lang lang drücken, dann loslassen und 2-3 Sekunden warten müssen, bevor Sie sie erneut für sehr kurze Zeit drücken.
* Ein neues Objekt sollte jetzt im Objekt "Broadlink. [N]. [Gerätename] .LearnedState" mit dem Namen ">>> Learned @ YYYYMMDDTHHmmSS" angezeigt werden.
* Sie können auf die Schaltfläche in der Objektansicht klicken, um den Code zu senden.
* Um das Element umzubenennen, klicken Sie auf den Namen (beginnend mit `_Rename_learned_`) und ändern Sie den Namen. Es sollte nicht ",", "." Oder ";" sowie einige andere Zeichen enthalten, sie werden durch "_" ersetzt.

Es ist auch möglich, die Codes aus [RM-Brücke](http://rm-bridge.fun2code.de/) zu verwenden.
Erstellen Sie einfach ein Objekt (Status, Typ-Schaltfläche) mit dem Wert, bei dem Sie "CODE_" voranstellen, oder mit dem nativen Eintrag `code` ohne 'CODE_'.

## Hinweis zu neuen RM4 / LB1-Geräten
* Mehrere neue Broadlink-Geräte unterstützen ein neues Broadlink-Cloud-Protokoll, das automatisch ausgewählt wird, wenn Sie die neueren Broadlink-Apps verwenden, um das Gerät in Ihr WLAN-Netzwerk einzubinden. Dieses neue Broadlink-Protokoll ist nicht mit dem Broadlink2-Adapter kompatibel und Sie können keine Geräte verwenden, die dieses neue Protokoll verwenden.
* Um dieses Problem zu vermeiden, bringen Sie das Gerät mit älteren Broadlink-Apps wie "e smart home" oder "e-control" in das Netzwerk und stellen Sie sicher, dass sich Ihr Telefon im selben 2,4-GHz-WLAN-Netzwerk befindet, in das Sie es einbinden möchten!
* Diese neueren Geräte müssen außerdem alle 5-10 Minuten erneut authentifiziert werden, was vom Adapter automatisch durchgeführt wird.

## Szenen verwenden
* Szenen können IDs oder Namen sowie durch "," getrennte Nummern enthalten. Normalerweise werden die IDs mit einem Zeitunterschied von 100 ms ausgeführt / gesendet. Wenn Sie jedoch eine längere Pause benötigen, können Sie eine Zahl eingeben, die die Millisekunden für das Warten widerspiegelt. Zum Beispiel würde "SP: Dosis = 1, 1000, RM: Ihr.L.StereoEin, 1000, RM: Ihr.L.TVEin" einen drahtlosen Stecker mit dem Namen "SP: Dosis" einschalten und dann eine Sekunde warten (tatsächlich 1,1 Sekunden) ), Schalten Sie den Stero und nach einer weiteren Sekunde den Fernseher ein. Sie können auch Geräte anderer Adapter schalten, z. B. `hm-rpc.0.MEQ1435726.1.STATE = true` würde dieses Homematic-Gerät einschalten! Boolsche Zustände können mit '= 1 / = on / = true / = ein' umgeschaltet werden, wenn Sie es ohne `=` belassen, wird true verwendet. Um ein Gerät auszuschalten, beenden Sie es mit '= 0 / = false / = aus / = off', was ausgeschaltet werden muss!

## Zustände verwenden
* Sie können auch Status für Ihre Geräte erstellen, die Ein- und Ausschaltbefehle zu einem einzigen Status kombinieren, der wie jedes andere Gerät umgeschaltet werden kann.
* Sie müssen die Befehle zum Ein- und Ausschalten eines Status in den separaten Spalten auflisten. Dies können mehrere sein, damit der Status weiß, wann Ihr Gerät von einem von ihnen ein- und ausgeschaltet wird
* Wenn Sie den Status nur auf Ein oder Aus setzen, wird der erste Ein / Aus-Befehl gesendet
* Wenn nur Befehle vorhanden sind, sendet der Switch den entsprechenden Befehl mit einem numerischen Wert von 1, dh er sendet den ersten Befehl, wenn er eine "0" empfängt, den zweiten, wenn er eine "1" empfängt. Auf diese Weise können Sie mehrere Zustände innerhalb eines Zustands simulieren.
* Wenn Sie nur '+' als Aus-Befehl verwenden, müssen Sie 10 Ein-Befehle eingeben, die durch '' getrennt sind und die Zahlen '0-9' auf der Fernbedienung widerspiegeln. Sie können dem Staat dann eine Nummer senden, wie "123" (max. 9999), und er würde "1", "2" und "3" mit einer Verzögerung von 1/3 Sekunde zwischen ihnen senden! Auf diese Weise können Sie beispielsweise den Kanal im Fernsehen auf '33' setzen, indem Sie einfach 'TVchannel = 33' schreiben, wenn der Statusname TVchannel ist.

## Verwenden Sie Nachrichten an den Adapter senden
Der Adapter versteht auch 'sendTo'-Befehle.

* `debug`:` sendTo ('broadlink2.0', 'debug', 'on') `(auch 0,1, on, off, ein, aus, true, false) würde den Debug-Modus einschalten.
* `get`:` sendTo ('broadlink2.0', 'get', 'RM2: RMPROPLUS.Temperature'` könnte Daten von einem Gerät wie `{val: 29.9, ack: true, ts: 1505839335870, q: 0, anfordern from: 'system.adapter.broadlink2.0', lc: 1505839335870} `zurück
* `switch`: kann einen Stecker ein- oder ausschalten:` sendTo ('broadlink2.0', 'switch', 'SP: Ihre Geräte-ID = on') `
* `switch_on` /` switch_off`: sendTo ('broadlink2.0', 'switch_on', 'SP: Ihre Geräte-ID') `
* `send`:` sendTo ('broadlink2.0', 'send', 'RM: yourdev._Learn') `würde mit dem Lernen beginnen und` sendTo ('broadlink2.0', 'send', 'RM: yourdev.L .yourid ') `würde den Code senden.
* `send_scene`:` sendTo ('broadlink2.0', 'send_scene', 'scene xxx')
* `send_code`:` sendTo ('broadlink2.0', 'send_code', 'RM: Ihre remote.CODE_xxxxx')

## Floureon- oder Beok313-Thermostate
* Die meisten Daten können eingestellt werden. Die Zeit kann durch Schreiben von "_setTime" eingestellt werden. In diesem Fall wird die Zeit des Geräts auf die ioBroker-Systemzeit eingestellt. Dies erfolgt automatisch auch beim Adapterstart.

## Konfigurieren Sie zusätzliche neue Geräte
* Sie können neue Geräte hinzufügen, die dasselbe Protokoll verwenden, indem Sie sie mit der Geräte-ID (hexadezimal oder dezimal) und der Geräteklasse (dort gelöscht) hinzufügen (Klasse = A1, MP1, RM, RMP, S1C, SP1, SP2, SP3P, T1). Sie können also eine neue Fernbedienung, die der Adapter nur als unbekanntes Gerät mit der Hex-ID 0x1234 findet, zur RM-Liste mit 0x01234 = RMP hinzufügen.

## Geräte umbenennen
* Geräte erhalten normalerweise ihren Netzwerkhostnamen oder eine Kombination aus Gerätetyp, ID und Mac-Adresse als Namen mit den ersten beiden Buchstaben des Typs mit ':' vor. Sie können ein solches Gerät mit "T1: BroadLink-OEM-T1-fa-83-7c = Beok313" umbenennen. In diesem Fall wird der ursprüngliche Name nicht verwendet, der neue Name lautet jedoch "Beok313".

## Debug-Modus
* Wenn Sie am Ende der Liste der hinzugefügten neuen Geräte ein "!" Hinzufügen (auch wenn es leer ist), können Sie den Adapter in den Debug-Modus versetzen, in dem viele zusätzliche Informationen protokolliert werden, auch wenn er nicht auf "gesetzt" ist. Info-Modus in Admin.

## Bekannte Probleme
* Wenn Sie dasselbe Signal mehrmals lernen, kann der Code jedes Mal anders sein. Dies kann nicht geändert werden.
* Manchmal werden Geräte nicht gefunden, wenn sie nicht auf die Suche reagieren. Führen Sie einen Rescan durch oder starten Sie den Adapter neu, um eine neue Instanz neu zu starten.

## Wichtig / Wichtig
* Benötigt Knoten> = V6

## Installation
Mit ioBroker admin installiert npm iobroker.broadlink2 oder von <https://github.com/frankjoke/ioBroker.broadlink2>

## Changelog

### 2.1.0

* Added RM4 protocol for newest RM4 and RM3-Minis 
* Added LB1 Wifi bulb device support
* Added finding of devices if name or ip changes according to mac address
* Added support of devices in other netword with IP address
* Changed learning and device communication for all RM devices
* Re-write of 70% nof the code for new js-controllers and nodejs versions.

### 2.0.3

* changed to new myAdapter to support js-controller 2.0 and 3.0

### 2.0.1

* Can handle Floureon/Beko thermostats (now with MQTT)
* Can handle S1C security devices
* Names device after their name or with their mac to reduce possibility of renaming
* Can rename devices
* Support compact mode
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

Copyright (c) 2014-2020, frankjoke <frankjoke@hotmail.com>

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