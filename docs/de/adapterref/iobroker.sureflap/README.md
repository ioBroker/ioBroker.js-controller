---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sureflap/README.md
title: ioBroker.sureflap
hash: CvgX9nV9Iu3qbzg7qfuqsuhRMbEJ1i800qF6DWbSkY0=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.sureflap.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sureflap.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/sureflap-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/sureflap-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Sickboy78/iobroker.sureflap.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/Sickboy78/ioBroker.sureflap/badge.svg)
![Travis-CI](http://img.shields.io/travis/Sickboy78/ioBroker.sureflap/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Sickboy78/ioBroker.sureflap?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.sureflap.png?downloads=true)

<p align="center"> <img src="admin/sureflap.png" /> </p>

# IoBroker.sureflap
## Adpater für SureFlap® Katzen- und Haustierklappen von Sure Petcare®
<p align="center"> <img src="/admin/SureFlap_Pet_Door_Connect_Hub_Phone.png" /> </p>

## Aufbau
Fügen Sie auf der Adapterkonfigurationsseite Benutzernamen und Passwort von Ihrem Sure Petcare®-Konto hinzu.

## Beschreibung
Der Adapter informiert Sie über die Einstellungen und den Status Ihrer Katzenklappe.

Es zeigt auch den Standort Ihrer Haustiere.

### Veränderbare Werte
Die folgenden Zustände können geändert werden und wirken sich auf Ihr Gerät aus. Sie werden jeweils in Ihrer Sure Petcare®-App angezeigt.

| Zustand | Beschreibung | zulässige Werte |
|-------|-------------|----------------|
| haushaltsname.hubname.klappenname.control.curfew | Aktiviert oder deaktiviert die konfigurierte Ausgangssperre<br> (Ausgangssperre muss über App konfiguriert werden) | **wahr** oder **falsch** |
| haushaltsname.hubname.klappenname.control.lockmode | setzt den Sperrmodus | **0** - offen<br> **1** - einrasten<br> **2** - sperren<br> **3** - geschlossen (ein- und ausschließen) |
| haushaltsname.pets.pet_name.inside | legt fest, ob sich Ihr Haustier im Inneren befindet | **wahr** oder **falsch** |

### Struktur
Der Adapter erstellt die folgende hierarchische Struktur:

Adapter<br> ├ Haushaltsname<br> │ ├ Hubname<br> │ │ ├ led_mode<br> │ │ ├ online<br> │ │ └ Klappenname<br> │ │ ├ Batterie<br> │ │ ├ Batterieprozentsatz<br> │ │ ├ online<br> │ │ ├ Kontrolle<br> Ausgangssperre<br> │ │ │ └ Sperrmodus<br> Ausgangssperre<br> │ │ │ └ 0..i<br> │ │ │ ├ aktiviert<br> │ │ │ ├ lock_time<br> │ │ │ └unlock_time<br> │ │ └ last_curfew<br> │ │ └ 0..i<br> │ │ ├ aktiviert<br> │ │ ├ lock_time<br> │ │ └ entsperren_Zeit<br> │ └ Haustiere<br> │ └ pet_name<br> │ ├ Name<br> │ ├ innen<br> │ └ seit<br> └ info<br> ├ all_devices_online<br> └ Verbindung<br>

## Anmerkungen
SureFlap® und Sure Petcare® sind eingetragene Marken von [SureFlap Ltd.](https://www.surepetcare.com/)

Das Bild der Katzenklappen-, Hub- und Smartphone-App kann ab [Sicher Petcare®](https://www.surepetcare.com/en-us/press) kostenlos zur Verfügung gestellt werden.

## Changelog

### 1.0.3 (2021-02-28)
* (Sickboy78) code improvements from review
* (Sickboy78) fixed timezone bug

### 1.0.2 (2021-02-25)
* (Sickboy78) fixed bug setting lockmode and inside values

### 1.0.1 (2021-02-19)
* (Sickboy78) initial release

## License

MIT License

Copyright (c) 2021 Sickboy78 <asmoday_666@gmx.de>

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