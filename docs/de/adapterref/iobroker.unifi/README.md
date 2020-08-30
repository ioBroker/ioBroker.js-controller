---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.unifi/README.md
title: ioBroker.unifi
hash: uzAYLNiazFB+pRFLhUAVnrVOUtlnYN9uaWaHamOgHaE=
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

* IP-Adresse und Port Ihres UniFi-Controllers (Lassen Sie den Port leer, falls Ihr Controller unter UbiOS ausgeführt wird (z. B. UDM Pro).)
* Benutzername und Passwort (2FA wird nicht unterstützt)
* Updateintervall

Standardmäßig werden die Informationen alle 60 Sekunden aktualisiert. Abhängig von Ihrer ioBroker-Hardware und Ihrer Netzwerkgröße (Anzahl der Clients, UniFi-Geräte usw.) wird nicht empfohlen, das Intervall weiter zu verkürzen.

### Objekte filtern
Der Adapter aktualisiert so viele Informationen wie möglich von Ihrem UniFi-Controller, bietet jedoch die Möglichkeit, die aktualisierten Informationen einzuschränken.

Es ist möglich, die Aktualisierung ausgewählter Informationen zu deaktivieren oder bestimmte Objekte dieser Informationen zu filtern.

| Informationen | Objekte, die nach | gefiltert werden können |
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
| DPI | https:// IP: PORT / api / s / SITE / stat / dpi |
| Alarme | https:// IP: PORT / api / s / SITE / stat / alarm |

### UbiOS-Endpunkte
| Informationen | API URL |
|-------------|------------------------------------------------------|
| Websites | https:// IP / proxy / network / api / self / sites |
| SysInfo | https:// IP / proxy / network / api / s / SITE / stat / sysinfo |
| Kunden | https:// IP / proxy / network / api / s / SITE / stat / sta |
| Geräte | https:// IP / Proxy / Netzwerk / API / s / SITE / stat / Gerät |
| WLANs | https:// IP / proxy / network / api / s / SITE / rest / wlanconf |
| Netzwerke | https:// IP / proxy / network / api / s / SITE / rest / networkconf |
| Gesundheit | https:// IP / Proxy / Netzwerk / API / s / SITE / stat / health |
| Gutscheine | https:// IP / proxy / network / api / s / SITE / stat / voucher |
| DPI | https:// IP / Proxy / Netzwerk / API / s / SITE / stat / dpi |
| Alarme | https:// IP / proxy / network / api / s / SITE / stat / alarm |

## Bekannte Probleme
* Der Status is_wired von Clients ist falsch, nachdem ein Client offline geschaltet wurde. Dies ist ein bekanntes Problem des UniFi-Controllers und hängt nicht mit dem Adapter zusammen. (Siehe https://community.ui.com/questions/Wireless-clients-shown-as-wired-clients/49d49818-4dab-473a-ba7f-d51bc4c067d1)

## __IN ARBEIT__
### 0.5.8 (2020-08-29)
* (braindead1) Probleme im Zusammenhang mit nicht verwendeten Sites wurden behoben
* (braindead1) Einige über Sentry gemeldete Fehler wurden behoben

### 0.5.7 (2020-07-27)
* (braindead1) Sentry-Fehler wurden behoben, die durch nicht aktualisierte Konfiguration nach dem Update verursacht wurden

### 0.5.6 (2020-07-25)
* (Scrounger, braindead1) Implementierte Alarme, DPI- und Gateway-Verkehr
* (braindead1) Verhindert die Erstellung von Ghost-Clients durch iOS MAC-Randomisierung
* (dklinger) Manueller Update-Trigger implementiert
* (braindead1) Löschen gebrauchter Gutscheine implementiert
* (braindead1) Einige über Sentry gemeldete Fehler wurden behoben

### 0.5.5 (2020-06-13)
* (braindead1) Einige über Sentry gemeldete Fehler wurden behoben

### 0.5.4 (2020-06-06)
* (braindead1) Offset für is_online implementiert
* (braindead1) Einige Probleme im Zusammenhang mit is_online wurden behoben
* (braindead1) Vorbereitete Whitelist von Clients usw.

### 0.5.2 (2020-05-23)
* (jens-maus) UniFiOS / UDM-Pro-Unterstützung implementiert
* (braindead1) Möglichkeit zum Aktivieren / Deaktivieren von WLANs implementiert
* (braindead1) Die Erstellung von Gutscheinen wurde implementiert
* (braindead1) Implementierter Online-Status für Clients
* (braindead1) Aktualisierte Client-Status
* (braindead1) Aktualisierte Gerätezustände
* (braindead1) Verbesserte Fehlermeldungen

### 0.5.0 (2020-05-09)
* (braindead1) Konfiguration von Updates implementiert
* (braindead1) JsonLogic wurde verbessert
* (braindead1) Legacy-Code entfernt
* (braindead1) Sentry implementiert

### 0.4.3 (2020-04-24)
* (braindead1) Konfigurationsproblem behoben

### 0.4.2 (2020-04-23)
* (braindead1) Subsystemproblem behoben

### 0.4.1 (2020-04-16)
* (braindead1) Verbessertes Refactoring

### 0.4.0 (2020-04-16)
* (Bluefox) Refactoring

### 0.3.1
* (jens-maus) Unterstützung für Umgebungen mit mehreren Standorten hinzugefügt.

### 0.3.0
* (jens-maus) hat die Datenabfrage für Zugriffsgeräte hinzugefügt und die Clientgeräte stattdessen in den Teilbaum 'clients' verschoben

### 0.2.1
* (jens-maus) kleinere Korrekturen

### 0.2.0
* (jens-maus) hat `lib / unifi.js` in die dedizierte Klasse node-unifi nodejs verschoben und als Abhängigkeit hinzugefügt.

### 0.1.0
* (jens-maus) hat eine erste grundsätzlich funktionierende Version implementiert, die Statusinformationen von einem UniFi-Controller abrufen kann.

### 0.0.1
* (jens-maus) Erstes Einchecken der nicht funktionierenden Entwicklungsversion

## Verweise
Dieser Adapter verwendet die Funktionen der folgenden NodeJS-Module von Drittanbietern:

* [node-unifi] (https://github.com/jens-maus/node-unifi)
* [json-logo-js] (https://github.com/jwadhams/json-logic-js)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ## __WORK IN PROGRESS__
-->

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