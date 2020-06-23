---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mydlink/README.md
title: ioBroker.mydlink
hash: 8ZmcRc9HDuf1rvpmcj1/4KRrtRQDEhepPhbEKfqYfqA=
---
![Logo](../../../en/adapterref/iobroker.mydlink/admin/mydlink.png)

![Anzahl der Installationen](http://iobroker.live/badges/mydlink-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.mydlink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mydlink.svg)
![Tests](https://travis-ci.org/iobroker-community-adapters/ioBroker.mydlink.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.mydlink.png?downloads=true)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.mydlink.svg)

# IoBroker.mydlink
MyDlink Adapter für ioBroker.
-------------------------------------------------- ----------------------------

Ermöglicht die Steuerung von Steckdosen oder Bewegungsmeldern über [D-Link](https://eu.dlink.com/uk/en/for-home/smart-home) in ioBroker.

** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.
Dies hilft auch bei der Unterstützung neuer Geräte.

Derzeit getestete Geräte:

| Modell | Geben Sie | ein Bild |
| :---: | :---: | :---: |
| DSP-W215 | Smart Plug (Buchse, Temperatur, Strom) **Abfrage erforderlich** | ![Bild](../../../en/adapterref/iobroker.mydlink/docs/media/DSP_W215.png) |
| DCH-S150 | Bewegungsmelder (letzte erkannte Bewegung) **Abfrage erforderlich** | ![Bild](../../../en/adapterref/iobroker.mydlink/docs/media/DCH_S150.png) |
| DCH-S150 | Bewegungsmelder (letzte erkannte Bewegung) **Abfrage erforderlich** | ! [Bild] (docs / media / DCH_S150.png) |

Der Adapter muss einige Geräte abfragen. Neuere senden Push-Nachrichten, was jetzt unterstützt wird. Sensorablesungen und Bewegungserkennung werden um das Abfrageintervall verzögert, wenn sie abgefragt werden müssen (kann in der Konfiguration eingestellt werden).

#### Aufbau:
* Liste der Geräte, jedes Gerät mit folgenden Einstellungen:

<table><tr><td> Name </td><td> hier einen Namen setzen, muss eindeutig sein (für mydlink Geräte) </td></tr><tr><td> IP </td><td> Geben Sie hier die IP-Adresse ein, der Hostname sollte auch funktionieren </td></tr><tr><td> STIFT </td><td> Die PIN befindet sich auf einem Aufkleber auf dem Gerät, wahrscheinlich unten. Kann TELNET für DSP-W115 sein, siehe unten. </td></tr><tr><td> Abfrageintervall </td><td> pro Gerät Abfrageintervall <br /> Setzen Sie 0, um die Abfrage zu deaktivieren. <br /> <b>Empfehlung:</b> Legen Sie ein schnelles Abfrageintervall für Sensoren und ein längeres für Stecker fest. </td></tr><tr><td> aktivieren </td><td> Wenn nicht aktiviert, wird nicht abgefragt oder gesteuert. <br /> Geräte, die nicht angeschlossen sind, können deaktiviert werden, um Netzwerkverkehr und Fehlermeldungen im Protokoll zu vermeiden. </td></tr></table>

Der Adapter stört die Nutzung der App nicht.

## Einrichtung von DSP-W115
Und andere *neuere* Geräte verwenden ein völlig anderes Protokoll und ein anderes Setup. Wenn Sie die Geräte aus der mydlink-App entfernen, können Sie sie einfach als andere Geräte verwenden und Ihre übliche PIN eingeben.

Wenn Sie die App weiterhin verwenden möchten, müssen Sie das Gerät wie folgt in den Werksmodus versetzen:

1. Setzen Sie das Gerät in den Wiederherstellungsmodus zurück, indem Sie während des Startvorgangs die Taste wps / reset gedrückt halten, bis es **rot** statt orange zu blinken beginnt.
2. Jetzt läuft ein Telnet-Deamon. Stellen Sie eine Verbindung zum WLAN des Geräts her
3. Führen Sie "telnet 192.168.0.20" aus und melden Sie sich mit "admin: 123456" an (oder verwenden Sie putty, vergessen Sie nicht, "telnet" anstelle von "ssh" auszuwählen).
4. Führen Sie `nvram_set FactoryMode 1` aus
5. Führen Sie `reboot; exit; `um das Gerät neu zu starten.

Jetzt sollten Sie `TELNET` als Pin eingeben und der Adapter ruft die erforderlichen Daten vom Gerät selbst ab.

## Changelog
<!-- 
	Placeholder for next versions (this needs to be indented):
	### __WORK IN PROGRESS__
	npm install @alcalzone/release-script
-->
### 1.1.4 (2020-06-23)
* fixed: sometimes state was always reported as true.

### 1.1.3 (2020-06-18)
* fixed: if error during login, polling would stop.
* fixed: can now update device name from config again
* change: read devices from config in UI again
* change: in UI do not create +-Button if detected device is already in devices table.

### 1.1.2 (2020-06-01)
* fixed two possible crashes with offline / wrong devices.

### 1.1.1 (2020-06-01)
* Improved auto detection of DSP-W115 (but mdns seems very unreliable whit that device)
* UI should never delete user devices

### 1.1.0 (2020-05-31)
* Added Support for w115 (and maybe other never myDlink devices, might even do *something* with cameras)
* Fix relogin to device (i.e. when device was restarted during adapter runtime) 
* Fix error when switching a socket.

### 1.0.11 (2020-05-10)
* Tried to add even more information in case device seems incompatible

### 1.0.10 (2020-05-10)
* Returned to login with user "Admin"
* Tried to add more debug for incompatible devices.

### 1.0.9 (2020-05-07)
* Fixed: changes in configuration were not respected once devices were created
* Fixed: re-login to device on switching if polling is disabled
* Fixed: Error output on switching now more informative

### 1.0.8 (2020-05-05)
* Fixed switching, was broken in some circumstances by id changes.

### 1.0.7 (2020-05-02)
* Made saving config more robust and direct again.
* Made identify by IP more robust and allows saving right away. 
* Prevent saving if devices without PIN are configured.

### 1.0.6 (2020-05-02)
* Prevent creation of empty devices (MYDLINK-6)

### 1.0.5 (2020-05-02)
* Fixed possible issue with device ids.
* Improved device creation
* Adjusted for discovery adapter that not yet stores passwords encrypted.

### 1.0.4 (2020-05-01)
* Improved connection keepAlive
* Improved logging of network errors

### 1.0.3 (2020-05-01)
* Fixed login/identification loop on (possibly) duplicate devices

### 1.0.2 (2020-04-30)
* Fixed potential crashes on network errors.

### 1.0.1 (2020-04-30)
* Re-added device config to adapter config (in case objects get deleted).

### 1.0.0 (2020-04-30)
* BREAKING CHANGE: device id is now mac instead of name -> all devices need to be recreated. Sorry for that. But should never happen again, now. New devices *should* be created automatically.
* added encryption of PIN
* settings stored in native part of device (please do not delete them or you have to reconfigure them)
* modified device creation / identification / start to allow devices to be (re-)started during runtime (you do not need to press save on config page anymore)
* added auto detection
* added missing translations
* added sentry plugin (including sending information about unknown devices)
* a lot of internal restructuring and cleanup for better maintenance in future.

### 0.0.7
* (Garfonso) added info.connection state
* (Garfonso) suppressed repeated error messages during polling.

### 0.0.6
* (Garfonso) prevent removement of custom details in objects.

### 0.0.5
* (Garfonso) fixed config files for release in latest repository.

### 0.0.4
* (Garfonso) polling interval can now be configured on per device basis (if not configured for a device global poll intervall will be used.) Recommendation: Use high global poll interval and a smaller one for motion detectors.
* (Garfonso) added no_motion state for motion detectors, contains number of seconds since last motion.

### 0.0.3
* (Garfonso) use setStateChanged instead of polling state before writing.
* (Garfonso) minor clean ups.

### 0.0.2
* (Garfonso) move to ioborker-community-adapters

### 0.0.1
* (Garfonso) initial release

## License
MIT License

Copyright (c) 2020 Garfonso <garfonso@mobo.info>

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