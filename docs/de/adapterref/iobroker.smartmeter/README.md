---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.smartmeter/README.md
title: ioBroker.smartmeter
hash: VrjGsPhGQxker5i5TvZ1NNQkqfAJ6+e8Z/TfH4pNr0A=
---
![Logo](../../../en/adapterref/iobroker.smartmeter/admin/smartmeter.png)

![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/Apollon77/ioBroker.smartmeter.svg)
![Anzahl der Installationen](http://iobroker.live/badges/smartmeter-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.smartmeter.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.smartmeter.svg)
![Travis-CI](http://img.shields.io/travis/Apollon77/ioBroker.smartmeter/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.smartmeter?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.smartmeter.png?downloads=true)

# IoBroker.smartmeter
[![Code Climate] (https://codeclimate.com/github/Apollon77/ioBroker.smartmeter/badges/gpa.svg)](https://codeclimate.com/github/Apollon77/ioBroker.smartmeter)

** Dieser Adapter verwendet den Dienst [Sentry.io](https://sentry.io), um Ausnahmen und Codefehler automatisch an mich als Entwickler zu melden. **

Dieser Adapter für ioBroker ermöglicht das Lesen und Parsen von Smartmeter-Protokollen, die der OBIS-Nummernlogik folgen, um deren Daten verfügbar zu machen.

*** Der Adapter benötigt nodejs 4.x um zu funktionieren! ***

*** Für diesen Adapter muss ein Git installiert sein! ***

## Derzeit bekannte Probleme
* Dieser Adapter verwendet die Serialport Library. Dies kann eine längere Installationszeit bedeuten, wenn es kompiliert werden muss
* Es scheint, dass die Speicherbehandlung manchmal nicht optimal ist und beim Lesen von Daten zu Abstürzen mit SIGABRT oder SIGSEGV führen kann. iobroker Controller startet den Adapter automatisch neu, daher sind 2-3 Loglines der einzige Effekt :-)

## Beschreibung der Parameter
ioBroker-Forum-Thread: http://forum.iobroker.net/viewtopic.php?f=23&t=5047&p=54973

### Datenprotokoll
Unterstützte Protokolle:

* **Sml** SML (SmartMeterLanguage) als Binärformat
* **D0** D0 (basierend auf IEC 62056-21: 2002 / IEC 61107 / EN 61107) als ASCII-Format (Binärprotokollmodus E wird derzeit nicht unterstützt)
* **Json-Efr** OBIS-Daten von EFR Smart Grid Hub (JSON-Format)

### Datentransfer
* **Serieller Empfang** Empfang über serielle Push-Daten (Smartmeter sendet Daten in regelmäßigen Abständen ohne Aufforderung). Wird hauptsächlich für SML verwendet
* **Serielle bidirektionale Kommunikation** D0-Protokoll in den Modi A, B, C und D (Modus E wird derzeit NICHT unterstützt!) Mit Wakeup-, Signon-, Pot. ACK- und Data-Messages zum Auslesen von Daten (Programmier- / Schreibmodus noch nicht implementiert)
* **Http-Requests** Lesen Sie Daten über HTTP, indem Sie eine definierte URL anfordern
* **Lokale Dateien** Liest Daten aus einer lokalen Datei

### Datenanforderungsintervall
Wartezeit in Sekunden bis zur nächsten Anforderung oder Unterbrechung des seriellen Empfangs. Der Wert 0 kann direkt nach Beendigung einer Nachricht neu gestartet werden.

Standardeinstellung: 300 (= 5 Minuten)

### Baudrate des seriellen Geräts
Baudrate für die erste serielle Verbindung, falls nicht definiert Standardwerte pro Transporttyp verwendet werden (9600 für SerialResponseTransprt und 300 für SerialRequestResponseTransport)

### D0: SignOn-Message-Befehl
Befehl für SignIn-Nachricht, Standard "?" um Pflichtfelder abzufragen, andere Werte je nach Gerät.
Beispiel: Der Wärmezähler 2WR5 verwendet "#", um viel mehr Daten abzufragen (optionale Felder zusammen mit allen Pflichtfeldern)

### D0: Mode-Overwrite
Der Adapter versucht, den in den Spezifikationen definierten D0-Protokollmodus zu bestimmen. Es gibt einige Geräte, die nicht den Spezifikationen entsprechen und daher Probleme mit sich bringen. Mit dieser Option können Sie den ermittelten Protokollmodus überschreiben.

* Mode A: keine Baudratenumschaltung, keine Ack-Message
* Modus B: Baudratenumschaltung, keine Bestätigungsmeldung
* Modus C: Baudratenumschaltung und Ack-Message erforderlich
* Modus D: Keine Baudratenumschaltung, Baudrate immer 2400
* Modus E: Baudratenumschaltung und Ack-Message erforderlich, Benutzerdefinierte Protokolle, werden derzeit nicht unterstützt !! Kontaktieren Sie mich, wenn Sie einen solchen Smartmeter haben

### D0: Baudrate-Umschaltung-Überschreiben
Der Adapter versucht, die Baudrate für die Datennachrichten gemäß den Protokollspezifikationen zu ermitteln. Aber wie im Modus liefern einige Smartmeter hier falsche Daten. SO können Sie dies verwenden, um die Baudrate für die Datennachricht nach Bedarf zu überschreiben. Lassen Sie dieses Feld leer, um die vom Smart Meter festgelegte Baudratenumschaltung zu verwenden.

## Adapter wird getestet mit ...
... mindestens:

* Hager eHz Energy Meter (mehrere, z. B. eHZ-IW8E2A5L0EK2P, EHZ363W5)
* EMH-Energiezähler
* EFR SmartGridHub
* Siemens 2WR5 Lesegerät von einer Wärmestation
* Elster AS1440
* Iskraemeco MT174
* Iskraemeco MT175
* Itron EM214 Typ 720
* Niederländisches Smart Meter mit DSRM-Protokoll (als Protokoll "Nur Daten vom seriellen Gerät lesen" und "D0" verwenden)

Bitte senden Sie mir Informationen zu Geräten, auf denen Sie die Bibliothek erfolgreich verwendet haben, und ich werde sie hier hinzufügen.

## Machen
* Aktualisieren Sie die Sml-Unterstützung auf 1.0.4 (falls erforderlich)
* Dokumente für die Webseite

## Changelog

### 3.0.0 (2019-11-2x)
* BREAKING CHANGE: Supports nodejs 8.x+ only, up to 12.x
* support compact mode
* update to latest library versions to fix problems and add special handling for some smart meters with broken firmware
* Use "/dev/serial/by-id" paths on linux if available; add port selection to Admin
* Add Sentry for error reporting

### 2.0.0 (2019-03-22)
* BREAKING CHANGE: State names changed because * no longer supported. Is replaced by __ now because of possible collisions in state names with only one _

### 1.2.2 (2018-11-11)
* Update smartmeter library, fix HTTP-JSON-Transport

### 1.2.1 (2018-06-23)
* BREAKING CHANGE: State names changed because * no longer supported. Is replaced by _

### 1.1.3 (2018-04-13)
* Fix Admin

### 1.1.2 (26.03.2018)
* Add better support for devices with more then 16 values (OpenSML Library upgrade)

### 1.1.0 (31.01.2018)
* Allow multiple queries for D0 and Serial-Bidirectional communication
* a lot of bugfixing and Optimizations
* Switch to Serialport 6.0.4 to hopefully get more stable (less/no SIGSEGV/SIGABRT ...)

### 1.0.0 (25.08.2017)
* Update smartmeter library and fix some timing issues

### 0.5.12 (23.07.2017)
* update SML library

### 0.5.11 (21.06.2017)
* optimize D0 handling and add support for Dutch smartmeter using DSRM protocol.

### 0.5.8 (06.04.2017)
* optimize Serial handling on Windows (because pause and resume are not supported there)

### 0.5.6 (02.04.2017)
* update library

### 0.5.5 (19.03.2017)
* improved baudrate-changeover logic for D0 protocol (now hopefully finally)
* enhanced D0 protocol support for multiple values

### 0.5.0 (26.02.2017)
* maintenance update

### 0.4.2 (27.02.2017)
* one last try to fix the crashes SIGABRT/SIGSEGV

### 0.4.1 (24.02.2017)
* Fix potential hanging communication with D0 Serial

### 0.4.0 (23.02.2017)
* Optimize for D0 Message handling and baudrate changeovers

### 0.3.2 (22.02.2017)
* Optimize D0 protocol handling for mode E

### 0.3.1 (12.02.2017)
* Finalize Adapter config and added some informations

### 0.3.0 (11.02.2017)
* We now should be quiet stable

### 0.2.x
* Public release of Adapter after forum Tests
* remove all additional logging
* enhance Adapter config screenxw
* Add possibility to overwrite serial connections settings and also D0 Mode for devices that send a wrong identification
* update smartmeter-obis library for memory optimizations

### 0.1.1
* Update smartmeter-obis library to 0.2.5 to add Serial Timeout for Request/Response protocol

### 0.1.0
* Initial version for public testing

### 0.0.1
* Initial version for internal testing

## License

The MIT License (MIT)

Copyright (c) 2017-2019 Apollon77 <ingo@fischer-ka.de>

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