---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tuya/README.md
title: ioBroker.tuya
hash: 4JKNgyT51t9U/W5Rn7obRXVV7XvGZCz1MW4H7EI0xYw=
---
![Logo](../../../en/adapterref/iobroker.tuya/admin/tuya.png)

![Anzahl der Installationen](http://iobroker.live/badges/tuya-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.tuya.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tuya.svg)
![Travis-CI](http://img.shields.io/travis/Apollon77/ioBroker.tuya/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.tuya?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.tuya.png?downloads=true)

# IoBroker.tuya
[![Greenkeeper-Abzeichen] (https://badges.greenkeeper.io/Apollon77/ioBroker.tuya.svg)](https://greenkeeper.io/)

ioBroker-Adapter zum Anschluss an mehrere kleine und günstige WLAN-Geräte, die an die Tuya Cloud angeschlossen sind und hauptsächlich die Smartlife App / Alexa-Skill verwenden. Der Adapter unterstützt das Lesen von Echtzeitstatus-Aktualisierungen und die Steuerung dieser Geräte, sobald sie mit der entsprechenden Mobiltelefon-App synchronisiert wurden.

Tuya-Geräte sind ESP8266MOD-WLAN-Smart-Geräte von Shenzhen Xenon.

Neben Geräten, die mit der Smart Live App verwendet werden können, sollte auch die Verwendung der Jinvoo Smart App, der Xenon Smart App, der eFamilyCloud, der io.e (Luminea oder einer solchen) App möglich sein. Bitte melden Sie sich bei Erfolg zurück.

Der Adapter ist so getestet, dass er mit allen Geräten, die "immer in WLAN sind", sehr gut funktioniert. Geräte, die nur bei einem Ereignis online sind, ihre Daten senden und wieder offline gehen, werden nicht unterstützt.

Eine Adapterinstanz kann alle Geräte in einem Netzwerk verwalten, die UDP-Pakete routen.

## Wie funktioniert der Adapter?
### Grundlegende Funktionalität
Der Adapter überwacht das lokale Netzwerk auf UDP-Pakete von Tuya-Geräten. Der ioBroker-Host, auf dem der Adapter ausgeführt wird, muss sich in demselben Netzwerksegment befinden wie die Geräte. UDP-Multicasting muss vom Router unterstützt werden!

Alle erkannten Geräte werden dem Adapter hinzugefügt und als Basisfunktionalität fordert der Adapter Daten im definierten Abrufintervall an. Ohne Synchronisation mit der jeweiligen mobilen App (siehe unten) sind KEINE weiteren Funktionen wie Echtzeitupdates oder Steuern möglich.

### Erweiterte Funktionalität nach Gerätesynchronisation
Um die volle Funktionalität des Adapters zu erhalten, muss dem Adapter ein Verschlüsselungsschlüssel bekannt sein.

Der einfachste Weg, diesen Verschlüsselungsschlüssel zu erhalten, besteht darin, sie von der verwendeten mobilen App zu erhalten. Zu diesem Zweck stellt der Adapter einen Proxy bereit, um die Kommunikation der App mit den Tuya-Servern abzufangen und die erforderlichen Informationen abzurufen.

Dazu müssen Sie zunächst ein benutzerdefiniertes Stammzertifikat auf Ihrem mobilen Gerät hinzufügen.
Wenn Sie in der Adapterinstanzkonfiguration auf "Proxy starten" klicken, wird das Zertifikat für Ihr System erstellt und zeigt einen QR-Code für den Downloadort an. Scannen Sie den QR-Code idealerweise mit Ihrem mobilen Gerät und folgen Sie den Anweisungen, um dieses Stammzertifikat hinzuzufügen und diesem zu vertrauen.
Wenn der QR-Code nicht erreichbar ist (dies kann bei Verwendung von Docker oder ähnlichem der Fall sein), öffnen Sie in Ihrem Browser den "Proxy Web Info Port" und klicken Sie in der Navigation auf "Root-CA". Sie können auch die CA-Datei herunterladen.

Stellen Sie jetzt sicher, dass Sie die entsprechende Tuya-Smart-App schließen / beenden.
Fügen Sie anschließend den Proxy-Port und den ioBroker-Host als "Manual" -Proxy für Ihre WLAN-Verbindung auf Ihrem Mobiltelefon hinzu.

Öffnen Sie nun die entsprechende Tuya Smart App und / oder laden Sie sie erneut.

Die Admin-Konfiguration zeigt eine Erfolgsmeldung an, wenn das relevante Datenpaket empfangen wurde, und schaltet den Proxy 10 Sekunden später aus. Sie können jetzt den Proxy von Ihrem Telefon entfernen und auch das Zertifikat aufheben.

Unmittelbar danach sollten die Objekte mit aussagekräftigeren Namen aktualisiert werden und erhalten dann automatisch Live-Updates und sollten kommunizieren können.

Die Synchronisierung wird nur anfangs benötigt oder nachdem Sie Ihrer App neue Geräte hinzugefügt haben.

Einige Bilder für einige mobile Betriebssysteme finden Sie unter den [Proxy-Seite](PROXY.md).

## Credits
Die Arbeit des Adapters wäre ohne die großartige Arbeit von @codetheweb und @ NorthernMan54 (https://github.com/codetheweb/tuyapi) und https://github.com/clach04/python-tuya und vielen mehr nicht möglich .

## Machen
* Verbessern Sie das Testen: Statusprüfungen und SetState's
* Dokumentation verbessern

## Changelog

### 1.0.8 (2019-03-08)
* (Apollon77) New schemas added

### 1.0.7 (2018-11-23)
* (Apollon77) New schemas added, fixed one error

### 1.0.5 (2018-11-18)
* (Apollon77) preserve device name too, New schemas

### 1.0.4 (2018-11-16)
* (Apollon77) New schemas added

### 1.0.3
* (Apollon77) New schemas added

### 1.0.2
* (Apollon77) New schemas added
* (Apollon77) Data are requested from the device after controlling because sometimes not all data seems to be updated automatically

### 1.0.1
* (Apollon77) Automatically convert some value types like booleans better

### 1.0.0
* (Apollon77) Add several new schema definitions
* (Apollon77) Optimizations and bug fixes

### 0.1.3
* (Apollon77) Add several new schema definitions
* (Apollon77) Try to preserve names of objects. Sync with App via proxy will overwrite in any case!
* (Apollon77) Optimizations and bug fixes

### 0.1.2
* (BuZZy1337) Optimized Admin, thank you very much!

### 0.1.0/1
* (Apollon77) development and first tests

## License

The MIT License (MIT)

Copyright (c) 2018 Apollon77 <iobroker@fischer-ka.de>

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