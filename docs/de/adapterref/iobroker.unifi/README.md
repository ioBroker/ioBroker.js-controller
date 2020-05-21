---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.unifi/README.md
title: ioBroker.unifi
hash: zPUGyeud4aIM6Mcc2JX7+ut7qxoA+LIE6qPFl3LjWzA=
---
![Logo](../../../en/adapterref/iobroker.unifi/admin/unifi.png)

![Build-Status](https://travis-ci.org/iobroker-community-adapters/ioBroker.unifi.svg?branch=master)
![Anzahl der Installationen](http://iobroker.live/badges/unifi-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.unifi.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.unifi.svg)
![NPM](https://nodei.co/npm/iobroker.unifi.png?downloads=true)

# IoBroker.unifi
Dieser ioBroker-Adapter ermöglicht die Überwachung und eingeschränkte Steuerung von [UniFi-Geräte](http://www.ubnt.com/), z. B. UniFi WiFi Access Points, mithilfe der öffentlichen UniFi Controller-Web-API.

## Aufbau
### Erforderliche Mindestinformationen
Um diesen Adapter zum Laufen zu bringen, werden die folgenden Informationen benötigt:

* IP-Adresse und Port Ihres UniFi-Controllers
* Benutzername und Passwort
* Updateintervall

Standardmäßig werden die Informationen alle 60 Sekunden aktualisiert. Abhängig von Ihrer ioBroker-Hardware und Ihrer Netzwerkgröße (Anzahl der Clients, UniFi-Geräte usw.) wird nicht empfohlen, das Intervall weiter zu verkürzen.

### Blacklists
Der Adapter aktualisiert so viele Informationen wie möglich von Ihrem UniFi-Controller, bietet jedoch die Möglichkeit, die aktualisierten Informationen einzuschränken.

Es ist möglich, die Aktualisierung ausgewählter Informationen zu deaktivieren oder bestimmte Elemente dieser Informationen auf die schwarze Liste zu setzen.

| Informationen | Artikel, die von | auf die schwarze Liste gesetzt werden können |
|-------------|-----------------------------------------|
| Kunden | Name, Hostname, IP-Adresse, MAC-Adresse |
| Geräte | Name, IP-Adresse, MAC-Adresse |
| WLANs | Name |
| Netzwerke | Name |
| Gesundheit | Subsystem |

## Steuerung
### WLANs aktivieren / deaktivieren
Durch Ändern des Status 'Aktiviert' eines WLAN kann es aktiviert / deaktiviert werden. Einige Sekunden später wird die Änderung für die Access Points bereitgestellt.

### Gutscheinerstellung
Mit der Schaltfläche 'vouchers.create_vouchers' können vordefinierte Gutscheine erstellt werden. Es ist möglich, die Anzahl der zu erstellenden Gutscheine, die Gültigkeitsdauer der Gutscheine und Grenzwerte für das Hoch- und Herunterladen zu konfigurieren.

## Fehlende Datenpunkte
Der Adapter verwendet [Node-Unifi](https://github.com/jens-maus/node-unifi), um eine Verbindung zu Ihrem UniFi-Controller herzustellen. Zur Vereinfachung werden nicht alle verfügbaren Datenpunkte in Ihren ioBroker gezogen. Wenn Sie Datenpunkte vermissen, verwenden Sie die folgenden URLs, um die API zu überprüfen. (Hinweis: Sie müssen IP, PORT und SITE durch Ihre Einstellungen ersetzen.)

| Informationen | API URL |
|-------------|---------------------------------------------|
| Websites | https:// IP: PORT / api / self / sites |
| SysInfo | https:// IP: PORT / api / s / SITE / stat / sysinfo |
| Kunden | https:// IP: PORT / api / s / SITE / stat / sta |
| Geräte | https:// IP: PORT / api / s / SITE / stat / device |
| WLANs | https:// IP: PORT / api / s / SITE / rest / wlanconf |
| Netzwerke | https:// IP: PORT / api / s / SITE / rest / networkconf |
| Gesundheit | https:// IP: PORT / api / s / SITE / stat / health |
| Gutscheine | https:// IP: PORT / api / s / SITE / stat / voucher |

## Bekannte Probleme
* Der Status is_wired von Clients ist falsch, nachdem ein Client offline geschaltet wurde. Dieses Problem ist kein bekanntes Problem des UniFi-Controllers und hängt nicht mit dem Adapter zusammen. (Siehe https://community.ui.com/questions/Wireless-clients-shown-as-wired-clients/49d49818-4dab-473a-ba7f-d51bc4c067d1)

## Verweise
Dieser Adapter verwendet die Funktionen der folgenden NodeJS-Module von Drittanbietern:

* [node-unifi] (https://github.com/jens-maus/node-unifi)
* [json-logic-js] (https://github.com/jwadhams/json-logic-js)

## Changelog
### 0.5.1-beta.5 (2020-05-21)
* (jens-maus) Implemented UniFiOS/UDM-Pro support
* (braindead1) Implemented possibility to enable/disable WLANs
* (braindead1) Implemented voucher creation
* (braindead1) Implemented online state for clients
* (braindead1) Updated client states
* (braindead1) Updated device states
* (braindead1) Improved error messages

### 0.5.0 (2020-05-09)
* (braindead1) Implemented configuration of updates
* (braindead1) Improved JsonLogic
* (braindead1) Removed legacy code
* (braindead1) Implemented Sentry

### 0.4.3 (2020-04-24)
* (braindead1) fixed configuration issue

### 0.4.2 (2020-04-23)
* (braindead1) subsystem issue fixed

### 0.4.1 (2020-04-16)
* (braindead1) Enhanced refactoring

### 0.4.0 (2020-04-16)
* (bluefox) Refactoring
  
### 0.3.1
* (jens-maus) added support for multi-site environments.

### 0.3.0
* (jens-maus) added access device data query and moved the client devices to the 'clients' subtree instead

### 0.2.1
* (jens-maus) minor fixes

### 0.2.0
* (jens-maus) moved `lib/unifi.js` to dedicated node-unifi nodejs class and added it as a dependency.

### 0.1.0
* (jens-maus) implemented a first basically working version which can retrieve status information from a UniFi controller.

### 0.0.1
* (jens-maus) initial checkin of non-working development version

## License
The MIT License (MIT)

Copyright (c) 2020 braindead1 &lt;os.braindead1@gmail.com&gt;
Copyright (c) 2016-2020 Jens Maus &lt;mail@jens-maus.de&gt;

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