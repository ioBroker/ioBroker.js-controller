---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.radar2/README.md
title: radar2 netzwerk und bloutooth verfügbarkeit
hash: xCqWNj9vQWZax9Xyl78PAO+bOqwlo9yMuYN/ZyxBBM8=
---
# Radar2 netzwerk und bloutooth verfügbarkeit
![Logo](../../../en/adapterref/iobroker.radar2/admin/radar2.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.radar2.svg)
![Eingerichtet](http://iobroker.live/badges/radar2-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.radar2.svg)
![Travis-CI](http://img.shields.io/travis/frankjoke/ioBroker.radar2/master.svg)

[Deutsches Handbuch - Deutsche Anleitung](README_DE.md)

## IoBroker radar2 Sichtbarkeitstest für Netzwerk- und Bluetooth-Geräte, HP Drucker, UWZ-Warnungen und EZB-Währungen
Dieser Adapter versucht, die im Netzwerk oder über Bluetooth angegebenen Geräte zu finden. Es zeigt auch die aktuelle externe IP des Netzwerks an, kann den Tintenstatus von HP Druckern und auch Wetterwarnungen von UWZ für mehrere europäische Länder lesen. Es können auch die täglichen Wechselkurse der EZB abgelesen werden.

Es funktioniert durch:

* Mit arp-scan und ping Geräte im Netzwerk mit IPv4 und IPv6 suchen!
* Abhören von DHCP-Nachrichten, die neue Geräte im Netzwerk ankündigen.
* Es funktioniert auf mehreren Schnittstellen, was bedeutet, dass Ihr System Wlan und LAN in verschiedenen Netzwerken hat und beide LANs sehen kann.
* Normales Bluetooth und Bluetooth LE werden unterstützt
* HP-Drucker Tintenstatus
* Geldwechsel der Europäischen Zentralbank für Euero
* UWZ-Wetterwarnungen für den Bereich, auf den ioBroker eingestellt ist
* Verwendet Arp-Scan und Ping im Netzwerk als nur externe Programme, alles andere ist knotenintern.
* Der Adapter funktioniert auch ohne Root-Rechte. Vor der Installation sind jedoch einige Konfigurationsschritte erforderlich

Wenn Sie am Ende eines Namens ein `-` setzen, wird das Gerät nicht in _notHere oder _isHere gezählt.

Wenn die IP-Adresse mit "http" beginnt, interpretiert radar2 sie als URL / Webadresse und versucht, eine Seite vom Server zu lesen, kann dies verwendet werden, um die Verfügbarkeit von Webservern (wie zum Beispiel http://iobroker.net) zu testen ). Bei https kann es vorkommen, dass der Server nicht erreichbar ist, wenn er keine aktualisierten Sicherheitsschlüssel hat!

Um UWZ nutzen zu können, muss Ihr Standort in ioBroker.Admin konfiguriert sein! Wenn der Wert von max messages> 0 ist, wird jede Warnung in einen separaten Zustand geschrieben, andernfalls werden sie kombiniert.
Sie können auch festlegen, ob Sie langen Warnungstext verwenden möchten, aber alle Informationen sind auch in Kurzform verfügbar.

Die Währungen der Europäischen Zentralbank können hier eingesehen werden: `https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml`

### Bluetooth-Nutzung
Es gibt zwei verschiedene Arten von BT-Geräten: BT-LE (V 4.x +) und normales BT (V <= 3.x). Der Adapter verfügt über zwei verschiedene Scanfunktionen für jeden der verschiedenen Gerätetypen.

1) für BT-LE: Befehl Noble (Nodejs modile) und 'hcitool lescan' 2) für normalen BT: BT-Scan (Nodejs module) und Befehl 'l2ping'

Jedes BT-Gerät kann nur eine der beiden Methoden zur selben Zeit verwenden.

Noble und BT Scan sind Module, die bei der Adapterinstallation mit npm kompiliert werden und die unter Linux und den meisten Windows-Setups funktionieren sollten.
Hcitool und l2ping werden mit den Bluetooth-Tools im Setup-Skript installiert und sind nur für Linux verfügbar.

In der Adapter-Konfiguration sollten BT-LE Macs mit einem '!' vor der MAC-Adresse, um sie nicht mit normalen BT-Scans wie l2ping zu scannen.
Normalerweise ist Noble ein bisschen besser als hcitool lescan, identifiziert Geräte, erzeugt jedoch auch mehr Fehler und kann möglicherweise nicht auf allen Systemen installiert werden.
Ebenso ist l2ping besser in der Lage, normale BT-Geräte zu finden, ist aber auf anderen Plattformen als Linux nicht verfügbar.
Daher können Sie die Verwendung in der Adapterkonfiguration separat konfigurieren.

Wenn Sie mehrere BT-Geräte verwenden, können Sie die Gerätenummer in der Konfiguration angeben. Die Standardeinstellung ist '-1', wobei die erste verfügbare verwendet wird. Eine Liste aller verfügbaren Geräte kann unter Linux mit `lescan dev` angezeigt werden.
In ein und demselben Adapter können Sie nur ein Gerät verwenden. Wenn Sie mehrere Geräte scannen möchten, müssen Sie unterschiedliche Adapter oder Instanzen verwenden.

## Unterschiede zum Radar-Adapter
Radar2 setzt Geräte, die sofort sichtbar werden, auf neue IPs, noch bevor der Scan erneut startet.
Radar2 verwendet NodeJS-Bibliotheken, um Bluetooth-Geräte zu finden, aber es kann jetzt auch im Benutzerbereich von iobroker ausgeführt werden und benötigt keinen Root-Zugriff (siehe unten Installationsvoraussetzungen).
Sie können mehr als eine IP-Adresse (jetzt IPv4 UND IPv6) oder eine Host-Adresse (nicht URLs) in derselben Zeile konfigurieren, sodass Sie auf mehreren Wegen zu Geräten pingen können.
`arp-scan` wird verwendet, um nach Mac-Adressen zu suchen. Es wird (sofern in der Befehlszeile nicht anders angegeben) auf allen Netzwerkschnittstellen ausgeführt, die über externes IPv4 verfügen, sodass Geräte, die auf Mac-Adressen basieren, nicht auf IPv6 erkannt werden erkennt jetzt Geräte in drahtlosen und festen Netzwerken gleichzeitig!

Die Verfügbarkeit von Geräten wird unterschiedlich gehandhabt. Jedes Gerät erhält einen Status `_lasthere`, der bei jeder Anzeige mit dem aktuellen Datum und der aktuellen Uhrzeit aktualisiert wird. Am Ende jedes Scans überprüft der Adapter alle letzten Einträge, wenn sie älter als die aktuelle Zeit sind - die konfigurierten Minuten der Abwesenheit. Geräte, die noch nie hier waren, haben auch keinen `_lasthere`-Status!

Web-URLs können jetzt https-Server besser verwalten.
Die Auflösung der Mac-Adressanbieter erfolgt jetzt intern und nicht mehr über das Web. Nur beim Start des Adapters wird die Datei lib / vendor.json geladen. Wenn diese Datei älter als 31 Tage ist, wird eine neue Version vom Web heruntergeladen - NUR beim Start des Adapters!

Der Bluetooth-Teil wurde so aktualisiert, dass Sie das zu verwendende Bluetooth-Gerät definieren können (0,1, ... Standard: -1 = zuerst). Auf diese Weise können Sie mehrere BT-Sticks verwenden, um mehrere Adapter wie BLE und Radar2 auf demselben Gerät auszuführen (auf Bluetooth LE-Treiber für ein Gerät können nicht mehrere Programme gleichzeitig zugreifen).

Wenn IP-Adressen oder Bluetooth-Geräte gefunden werden, die Sie nicht in Ihrer Geräteliste angegeben haben, werden sie in unbekannten IP- und BT-Listen angezeigt und für jedes Gerät wird ein Status generiert. Auf diese Weise können Sie Personen identifizieren, die sich in Ihr Netzwerk einloggen, oder Geräte, die integriert werden können.
Wenn Sie nicht möchten, dass sie als unbekannt aufgelistet werden, fügen Sie sie in die entsprechenden bekannten IP / BT-Listen in der Adapterkonfiguration ein.

Neu ist auch, dass Intervalle für HP-Drucker, ECB-, UWZ- und normale Scans separat definiert werden können.

## Installation
Vor der Installation des Adapters in ioBroker müssen Sie unter Linux `arp-scan` und `libcap2-bin` sowie einige Treiber installieren, die Sie mit den folgenden Befehlen ausführen können.
Unter Debian (Raspi-Stretch, Ubuntu, ...) sieht es so aus:

```
sudo apt-get install libcap2-bin arp-scan bluetooth bluez libbluetooth-dev libudev-dev net-tools
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp-scan`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which node`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hcitool`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hciconfig`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which l2ping`)
```

Wenn Sie den Knoten oder einige Systemtools aktualisieren, sollten Sie die obigen Schritte erneut ausführen!

Unter Windows (und vielleicht auch unter OSX) gibt es keinen Arp-Scan, was bedeutet, dass nur Ping verwendet wird, aber keine IP-Mac-Adressen gescannt werden können!

Unter Osx funktioniert Bluetooth möglicherweise überhaupt nicht!

Nach der Installation von Setup Adapter Config können Sie die Demo-Werbebuchungen entfernen.

### Spezielle Informationen für arp-scan:
Es ist eine Standardbefehlszeile `-lgq --retry=5 --timeout=400` definiert, die auf allen IPv4-Schnittstellen alle 254 Adressen durchsucht, wenn sie nicht innerhalb von 400 ms antwortet, würde sie es 5 Mal wiederholen! Wenn Sie nur die spezifische Schnittstelle scannen müssen, können Sie zum Beispiel ` --interface=br0` hinzufügen, aber normalerweise werden Brückenschnittstellen jetzt zu Recht verwendet, aber in Docker-Umgebungen ist dies möglicherweise noch nicht erforderlich. Die Wiederholung = 5 kann für auf 6 oder 7 geändert werden bessere Erkennung, über 7 Ich habe keine Verbesserung gefunden! Das gleiche gilt für das Timeout, oberhalb von 500 konnte ich keine Besserung feststellen.

### Tipp für den Wechsel von Radar zu Radar2-Adapter oder von Maschine zu Maschine
* Wenn Sie Radaradapter verschieben, können Sie problemlos die gesamte Geräteliste oder Einstellungen von kopieren
* - Gehe in admin zu Objekten und aktiviere den Expertenmodus
* - Suchen Sie nach einem Objektbaum mit dem Namen "system.adapter.radar.0" (wobei "0" die Instanz ist, wenn Sie mehrere Instanzen hatten, wählen Sie die richtige aus).
* - Ganz rechts in dieser Zeile befindet sich ein Knopf mit einem Bleistift. Klicken Sie darauf
* - Im Fenster erhalten Sie NATIVE auswählen
* - Sie sollten dann die Konfigurationsfelder sehen, den Inhalt des 'Geräte'-Feldes auswählen und in die Zwischenablage kopieren
* - Machen Sie dasselbe auf dem Zielcomputer, indem Sie in Admin / objects `system.adapter.radar2.0` auswählen und hier auch zu NATIVE gehen.
* - Löschen Sie den Text im Feld 'Geräte' und fügen Sie ihn in die Zwischenablage ein
* - Speichern Sie die Änderungen

Diese Methode zum Verschieben von Einstellungen funktioniert auch zwischen Systemen, funktioniert jedoch möglicherweise nicht, wenn ein anderer Adapter eine andere Struktur aufweist. Die Geräteliste ist für Radar und Radar2 identisch. Der einzige Unterschied besteht darin, dass in Radar2 mehrere IP-Adressen / Einträge durch ',' getrennt werden können.

## Wichtig / Wichtig
* Adapter benötigt Node> = v6. *!
* Der Adapter ist möglicherweise nicht für die Verwendung von Bluetooth und Arp-Scan unter OSX verfügbar, nur für Ping- oder IP-Adressen, die keine IP-Mac-Adressen erkennen können!
* Adapter kann auch Probleme mit Bluetooth unter Windows haben, auch Arp-Scan ist unter Windows nicht verfügbar, verwendet nur Ping und erkennt keine IP-Mac-Adressen !.

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