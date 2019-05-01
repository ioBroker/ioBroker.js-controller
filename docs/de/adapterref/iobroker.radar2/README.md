---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.radar2/README.md
title: Radar2-Netzwerk und Bloutooth-Verfügbarkeit
hash: 2Qp5IHqny/Wa4vK0k8yFmChUVnPiU4UR3CLIO9dIq/c=
---
# Radar2 netzwerk und bloutooth-verfügbarkeit
![Logo](../../../en/adapterref/iobroker.radar2/admin/radar2.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.radar2.svg)
![Eingerichtet](http://iobroker.live/badges/radar2-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.radar2.svg)
![Travis-CI](http://img.shields.io/travis/frankjoke/ioBroker.radar2/master.svg)

[Deutsche Anleitung - Deutsche Anleitung](README_DE.md)

## IoBroker Radar2 Sichtbarkeitstest für Netzwerk- und Bluetooth-Geräte, HP-Drucker, UWZ-Warnungs- und EZB-Währungen
Dieser Adapter versucht, die im Netzwerk oder über Bluetooth angegebenen Geräte zu finden. Es zeigt auch die aktuelle externe IP des Netzwerks an, kann den Tintenstatus von HP-Druckern sowie Wetterwarnungen des UWZ für mehrere europäische Länder lesen. Es kann auch die täglichen Wechselkurse der EZB ablesen.

Es funktioniert durch:

* Verwenden von arp-scan und ping zum Suchen von Geräten im Netzwerk mit IPv4 und IPv6!
* Hören von dhcp-Nachrichten, die neue Geräte ankündigen, die in das Netzwerk gelangen.
* Es funktioniert an mehreren Schnittstellen, was bedeutet, dass Ihr System über Wlan und LAN in verschiedenen Netzwerken verfügt und beide LANs sehen kann.
* Normales Bluetooth und Bluetooth LE werden unterstützt
* Tintenstatus des HP-Druckers
* Wechsel der Europäischen Zentralbank gegen Euero
* UWZ Wetterwarnungen für den Bereich, in dem der ioBroker eingestellt ist
* Verwendet arp-scan und ping im Netzwerk als einzige externe Programme, alles andere ist Node-intern.
* Der Adapter funktioniert auch ohne Root-Rechte. Vor der Installation sind jedoch einige Konfigurationsaktionen erforderlich

Wenn Sie am Ende eines Namens einen `-` eingeben, wird das Gerät nicht in _notHere oder _isHere gezählt.

Wenn die IP-Adresse mit 'http' beginnt, wird sie von radar2 als URL / Web-Adresse interpretiert und versucht, eine Seite vom Server zu lesen. Auf diese Weise kann die Verfügbarkeit von Webservern getestet werden (z. B. http://iobroker.net) ). Bei https kann es vorkommen, dass der Server nicht erreichbar ist, wenn er keine Sicherheitsschlüssel aktualisiert hat!

Um UWZ verwenden zu können, müssen Sie Ihren Standort in ioBroker.Admin konfiguriert haben. Wenn der Wert von max messages> 0 ist, wird jede Warnung in einem separaten Zustand geschrieben, ansonsten werden sie kombiniert.
Sie können auch festlegen, ob Sie langen Warntext verwenden möchten, aber alle Informationen sind auch in Kurzform verfügbar.

Die Währungen der Europäischen Zentralbank sind hier zu sehen: `https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml`

## Unterschiede zum Radaradapter
Radar2 legt Geräte fest, die sofort sichtbar werden, wenn sie sichtbar werden, und zwar vor dem erneuten Starten des Scans für neue IPs.
Radar2 verwendet nodejs-Libraries, um Bluetooth-Geräte zu finden, aber es kann jetzt auch im Benutzerbereich von iobroker ausgeführt werden und benötigt keinen Root-Zugriff (siehe unten, Installationsanforderungen).
Sie können mehr als eine IP-Adresse (jetzt IPv4 UND IPv6) oder Hostadresse (keine URLs) in derselben Zeile konfigurieren, sodass Sie auf mehreren Wegen an Geräte pingen können.
Nach `arp-scan` wird nach MAC-Adressen gesucht. Es wird (sofern nicht anders in der Befehlszeile angegeben) auf allen Netzwerkschnittstellen ausgeführt, die über externe IPv4 verfügen. Es werden also keine Geräte erkannt, die auf Mac-Adressen auf IPv6 basieren, aber es erkennt jetzt Geräte in drahtlosen und festen Netzwerken gleichzeitig!

Die Verfügbarkeit von Geräten wird anders gehandhabt. Jedes Gerät erhält einen Status nach `_lasthere`, der mit dem aktuellen Datum und der aktuellen Uhrzeit aktualisiert wird, sobald es angezeigt wird. Am Ende jedes Scans prüft der Adapter alle letzten Einträge, ob sie älter als die aktuelle Uhrzeit sind - die konfigurierten Minuten der Abwesenheit. Devecies, die noch nie hier waren, werden auch keinen `_lasthere`-Zustand haben!

Web-URLs können jetzt besser https-Server verwalten.
Die Auflösung der MAC-Adressenanbieter erfolgt jetzt intern und nicht über das Web. Nur beim Start des Adapters wird die Datei lib / vendor.json geladen. Wenn diese Datei älter als 31 Tage ist, wird eine neue Version vom Web heruntergeladen - NUR beim Start des Adapters!

Der Bluetooth-Teil wurde so aktualisiert, dass Sie das zu verwendende Bluetooth-Gerät definieren können (0,1, ... Standard: -1 = zuerst). Auf diese Weise können Sie mehrere BT-Sticks verwenden, um mehrere Adapter wie BLE und Radar2 auf demselben Gerät auszuführen (Bluetooth LE-Treiber für ein Gerät können nicht von mehreren Programmen gleichzeitig aufgerufen werden).

Wenn IP-Adressen oder Bluetooth-Geräte gefunden werden, die Sie nicht in Ihrer Geräteliste angegeben haben, werden diese in unbekannten IP- und BT-Listen angezeigt, und für jede dieser Adressen wird ein Status generiert. Auf diese Weise können Sie Personen identifizieren, die sich in Ihr Netzwerk einloggen, oder ned-Geräte, die integriert werden können.
Wenn Sie nicht möchten, dass sie als unbekannt aufgelistet werden, legen Sie sie in der entsprechenden bekannten IP / BT-Liste in der Adapter-Konfiguration fest.

Neu ist auch, dass Intervalle für HP-Drucker, ECB-, UWZ- und normale Scans separat definiert werden können.

## Installation
Bevor Sie den Adapter in ioBroker installieren, müssen Sie unter Linux `arp-scan` und `libcap2-bin` sowie einige Treiber installieren, die Sie ausführen können, indem Sie die folgenden Befehle ausführen.
Auf Debian (Raspi-Stretch, Ubuntu, ...) sieht es so aus:

```
sudo apt-get install libcap2-bin arp-scan bluetooth bluez libbluetooth-dev libudev-dev net-tools
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp-scan`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which node`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hcitool`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hciconfig`)
```

Wenn Sie einen Knoten oder einige Systemwerkzeuge aktualisieren, sollte das obige erneut ausgeführt werden!

Unter Windows (und möglicherweise auch osx) gibt es keinen arp-scan, dh es wird nur Ping verwendet, aber keine IP-MAC-Adressen können gescannt werden!

Auf Osx kann auch Bluetooth überhaupt nicht funktionieren!

Nach der Installation des Konfigurationsadapters können Sie die Demo-Zeilenelemente entfernen.

### Spezielle Informationen zum Arp-Scan:
Es ist eine Standardbefehlszeile definiert (`-lgq --retry=5 --timeout=400`), die alle 254 Adressen auf allen IPv4-Schnittstellen scannt, wenn sie nicht innerhalb von 400 ms antwortet. Wenn Sie nur die spezifische Schnittstelle scannen möchten, können Sie beispielsweise ` --interface=br0` hinzufügen. Normalerweise werden Bridge-Schnittstellen jedoch jetzt ordnungsgemäß verwendet. In Docker-Umgebungen kann es jedoch nicht erforderlich sein bessere Erkennung, über 7 fand ich keine Verbesserung! Das gleiche gilt für das Timeout, über 500 konnte ich keine Verbesserung feststellen.

### Tipp für den Wechsel von Radar zu Radar2-Adapter oder von Maschine zu Maschine
* Wenn Sie Radaradapter verschieben, können Sie ganz einfach die gesamte Geräteliste oder Einstellungen kopieren
* - Gehen Sie in Admin zu Objekten und aktivieren Sie den Expertenmodus
* - Suchen Sie nach einem Objektbaum, der `system.adapter.radar.0` heißt (wobei '0' die Instanz ist, wenn Sie mehrere Instanzen hatten, wählen Sie die richtige aus.)
* - Ganz rechts in dieser Zeile befindet sich eine Schaltfläche mit einem Bleistift. Klicken Sie darauf
* - Im Fenster wird NATIVE angezeigt
* - Sie sollten dann die Konfigurationsfelder sehen, den Inhalt des Feldes 'devices' auswählen und in die Zwischenablage kopieren
* - mache dasselbe auf dem Zielcomputer, wähle "system.adapter.radar2.0" in Admin / objects und gehe hier auch zu NATIVE.
* - Löschen Sie den Text im Feld "Geräte" und in der alten aus der Zwischenablage
* - die Änderungen speichern

Diese Methode zum Verschieben von Einstellungen funktioniert auch zwischen Systemen, kann jedoch nicht funktionieren, wenn andere Adapter eine andere Struktur haben. Die Geräteliste ist für Radar und Radar2 gleich. Der einzige Unterschied besteht darin, dass in Radar2 mehrere IP-Adressen / Einträge durch ',' getrennt werden können.

## Wichtig / Wichtig
* Adapter benötigt Knoten> = v6. *!
* Der Adapter ist möglicherweise nicht für die Verwendung von Bluetooth und Arp-Scan unter osx verfügbar. Nur Ping oder IP, die keine IP-MAC-Adressen erkennen können!
* Der Adapter kann auch unter Windows Probleme mit Bluetooth haben, außerdem ist arp-scan unter Windows nicht verfügbar.

## Changelog

### 1.2.0

* You may use now hcitool as only BT scanner instead of noble on linux (standatd)
* _LastHere will not be change on restart
* Standard scan cycle set to 20 seconds
* Removed the 'remove-end' field and replaced it with a debug flag

### 1.0.7

* check on linux the availability of BT-devices and if no devices are found do not run any BT scans to avoid SIGSEGV

### 1.0.3

* Added possibility to add more than one BT mac address for a device

### 1.0.2

* Corrected version which works with _lastHere and all new devices

### 1.0.0

* First public realease

## License

The MIT License (MIT)

Copyright (c) 2018-2019, frankjoke <frankjoke@hotmail.com>

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