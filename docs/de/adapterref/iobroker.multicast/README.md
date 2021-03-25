---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.multicast/README.md
title: Multicast-APi-Adapter für ioBroker
hash: BMajt41V8iwGH+aqDL/L/f3MZJja6m62+jbpW80vWiM=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.multicast.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.multicast.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/multicast-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/multicast-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/DrozmotiX/ioBroker.multicast.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/DrozmotiX/ioBroker.multicast/badge.svg)
![NPM](https://nodei.co/npm/ioBroker.multicast.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/DrozmotiX/ioBroker.multicast/master.svg)

<h1>

<img  src="admin/multicast.png"  width="64" alt=""/>ioBroker.multicast

</ h1>

# Multicast-APi-Adapter für ioBroker
Dieser Adapter bietet eine API, die auf dem Multicast-Kommunikationsprotokoll basiert, um Status an Geräte mit benutzerdefinierter Firmware zu senden und zu empfangen.

Zweck dieses Adapters war:

* bieten eine Alternative zu http post und MQTT protokoll
* Halten Sie eine einheitliche API bereit, die auf Multicast-Kommunikation und JSON-formatierter Datenübertragung basiert
* Verfügen Sie über einen Zero-Touch-Adapter, um jedes Ethernet-Gerät (Beispiel: ESP-basiertes Board-Equalizer Wemos D1 mini) wie Vansware / Gosound-Smart-Plugs oder andere kundenspezifische Automatisierungen zu integrieren.

### Keine Berührung?
Der APi ist so aufgebaut, dass keine zusätzliche Konfiguration des Endbenutzers im Adapter selbst oder im zu verwendenden Gerät erforderlich ist.
Wenn der Wi-Fi-Übergang verwendet wird, muss nur der Wi-Fi-Berechtigungsnachweis angegeben werden (LAN-basierte Geräte werden vollautomatisch behandelt).
Dies erfordert, dass der Entwickler der Binärdatei versucht, auf dem zugehörigen Chipsatz (wie ESP-basierten Chipsätzen) zu flashen.

Wenn die Firmware alle Regeln des APi befolgt (siehe weiter unten), wird die Kommunikation wie folgt behandelt:

* Gerät sendet Statuswerte per UDP-Multicast
* Der Adapter erkennt diese Meldung und prüft, ob in ioBroker Status für dieses Gerät vorhanden sind

#### Neues Gerät
In einer vorherigen Nachricht hat der Adapter angegeben, dass kein Gerät gefunden wurde. Die folgende Routine wird ausgeführt:

* ioBroker sendet eine Broadcast-Nachricht, um das Gerät zu initialisieren
* Gerät sendet alle Zustände und zugehörige Struktur an ioBroker
* ioBroker erstellt das neue Gerät und alle erforderlichen Status
* Wenn alle Status erstellt wurden, sendet ioBroker einen Handshake an das Gerät "bereit, Daten zu empfangen".
* Das Gerät sendet seine Status in Intervallen oder durch Änderungen (wie durch die Firmware-Konfiguration definiert).

#### Wiederverbindung bestehender Geräte
Aus einer vorherigen Nachricht geht hervor, dass das vom Adapter angegebene Gerät bereits vorhanden ist. Die folgende Routine wird behandelt:

* ioBroker prüft, ob die Konfiguration auf "Wiederherstellen" eingestellt ist.
* Wenn die Wiederherstellung aktiviert ist, sendet ioBroker alle Status (außer Info-Status) an das Gerät
* Wenn alle Zustände empfangen wurden, sendet das Gerät einen Handshake an ioBroker "bereit, Daten zu empfangen".
* ioBroker bestätigt
* Das Gerät sendet seine Status in Intervallen oder durch Änderungen (wie durch die Firmware-Konfiguration definiert).

#### Statusänderungen
Der Adapter ist so aufgebaut, dass er bis zu fünfmal einen erneuten Versuch sendet, um sicherzustellen, dass alle Statusänderungen vom Gerät empfangen werden. Dieser Vorgang wird wie folgt behandelt:

* Der Status wird in ioBroker geändert
* Der Adapter erkennt die Wertänderung und sendet den neuen Wert an das Gerät
* Das Gerät muss die Meldung innerhalb von 500 ms bestätigen
* Wenn die Nachricht nicht bestätigt wird, sendet der Adapter den Wert erneut
* Dies wird bis zu maximal 5 Wiederholungsversuchen behandelt. Danach zeigt eine Fehlermeldung an, dass die Kommunikation unterbrochen wurde

### APi Struktur und Dokumentation
{zu erledigen / in Bearbeitung}

## To-Do geplant:
* [] Warteschlangen implementieren, 20 ms nach der Statusänderung auf ein Gerät warten und ein Array mit allen Statusaktualisierungen senden
* [] Ablaufwert per API implementieren
* [x] Optimieren Sie die Statuswiederholung und feuern Sie nicht alle 500 ms mehr Warteschlangen ab
* [x] Wiederherstellungsdaten senden, wenn Harbert empfangen wird und die Verbindung zum Gerät FALSE ist
* [x] Implementiere Zustände (Fähigkeit zur Werteliste)
* [x] Korrekte Behandlung von Änderungen an Hostnamen und Hostnamen

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 0.1.6 (2021-03-23)
* (DutchmanNL) Dependency updates

### 0.1.5
* (Dutchman & Andiling) Stable-Release candidate

### 0.1.4
* (DutchmanNL) Fix Device Name
* (DutchmanNL) improved way of handling info channel values compatible with old firmware

### 0.1.3
* (Dutchman) Optimise state retry, don't fire every 500ms more queuing
* (Dutchman) Send recovery data if Harbeat is received and connection to device is FALSE
* (Dutchman) Implement states (capability for value list)

### 0.1.2
* (Dutchman) Optimise state retry, don't fire every 500ms more queuing
* (Dutchman) Correct handling of hostname and hostname changes

### 0.1.1
* (Dutchman) Send recovery data if Harbeat is received and connection to device is FALSE
* (Dutchman) Implement states (capability for value list)

### 0.1.0

* (Dutchman & Andiling) initial release

## License

MIT License

Copyright (c) 2021 Dutchman & Andiling

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