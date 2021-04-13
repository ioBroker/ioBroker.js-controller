---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.smartmeter/README.md
title: ioBroker.smartmeter
hash: Wf0ob83Vrele/5QNmX5h6bMft7FJTwzbQeLGTJpQN68=
---
![Logo](../../../en/adapterref/iobroker.smartmeter/admin/smartmeter.png)

![Anzahl der Installationen](http://iobroker.live/badges/smartmeter-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.smartmeter.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.smartmeter.svg)
![Travis-CI](http://img.shields.io/travis/Apollon77/ioBroker.smartmeter/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.smartmeter?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.smartmeter.png?downloads=true)

# IoBroker.smartmeter
[![Code Climate] (https://codeclimate.com/github/Apollon77/ioBroker.smartmeter/badges/gpa.svg)](https://codeclimate.com/github/Apollon77/ioBroker.smartmeter)

** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an mich als Entwickler zu melden. ** Weitere Details siehe unten!

Dieser Adapter für ioBroker ermöglicht das Lesen und Parsen von Smartmeter-Protokollen, die der OBIS-Nummernlogik folgen, um deren Daten verfügbar zu machen.

*** Der Adapter benötigt NodeJS 8.x +, um zu funktionieren! ***

*** Für die Installation dieses Gitters muss git installiert sein! ***

## Beschreibung der Parameter
ioBroker-Forum-Thread: http://forum.iobroker.net/viewtopic.php?f=23&t=5047&p=54973

### Datenprotokoll
Unterstützte Protokolle:

* **Sml** SML (Smart Message Language) als Binärformat
* **D0** D0 (basierend auf IEC 62056-21: 2002 / IEC 61107 / EN 61107) als ASCII-Format (Binärprotokollmodus E wird derzeit nicht unterstützt)
* **Json-Efr** OBIS-Daten vom EFR Smart Grid Hub (JSON-Format)

### Datentransfer
* **Serieller Empfang** Empfang über serielle Push-Daten (Smartmeter sendet Daten ohne Anforderung in regelmäßigen Abständen). Wird hauptsächlich für SML verwendet
* **Serielle bidirektionale Kommunikation** D0-Protokoll in den Modi A, B, C und D (Modus E wird derzeit NICHT unterstützt!) Mit Wakeup-, Signon-, Pot. ACK- und Datennachrichten zum Auslesen von Daten (Programmier- / Schreibmodus bisher nicht implementiert)
* **HTTP-Anfragen** Lesen Sie Daten über HTTP, indem Sie eine definierte URL anfordern
* **Lokale Dateien** Liest Daten aus einer lokalen Datei

### Datenanforderungsintervall
Anzahl der Sekunden, die auf die nächste Anforderung gewartet oder der serielle Empfang angehalten werden soll, Wert 0, der direkt nach Abschluss einer Nachricht neu gestartet werden kann.

Standard: ist 300 (= 5 Minuten)

### Baudrate für serielle Geräte
Baudrate für die anfängliche serielle Verbindung, wenn nicht definierte Standardwerte pro Transporttyp verwendet werden (9600 für SerialResponseTransprt und 300 für SerialRequestResponseTransport)

### D0: SignOn-Message-Befehl
Befehl für SignIn-Message, Standard "?" um Pflichtfelder abzufragen, andere Werte je nach Gerät.
Beispiel: Der 2WR5-Wärmezähler verwendet "#", um viel mehr Daten abzufragen (optionale Felder zusammen mit allen obligatorischen)

### D0: Mode-Overwrite
Der Adapter versucht, den in den Spezifikationen definierten D0-Protokollmodus zu bestimmen. Es gibt einige Geräte, die nicht den Spezifikationen entsprechen und daher Probleme verursachen. Mit dieser Option können Sie den festgelegten Protokollmodus überschreiben.

* Modus A: keine Baudratenumschaltung, keine Bestätigungsnachricht
* Modus B: Baudratenumschaltung, keine Bestätigungsnachricht
* Modus C: Baudratenumschaltung und Ack-Message erforderlich
* Modus D: Keine Baudratenumschaltung, Baudrate immer 2400
* Modus E: Baudratenumschaltung und Ack-Message erforderlich, benutzerdefinierte Protokolle, nicht korrekt unterstützt !! Kontaktieren Sie mich, wenn Sie ein solches Smartmeter haben

### D0: Baudrate-Umschaltung-Überschreiben
Der Adapter versucht, die Baudrate für die Datennachrichten zu bestimmen, wie in den Protokollspezifikationen definiert. Aber wie beim Modus liefern einige Smartmeter hier falsche Daten. Sie können dies also verwenden, um die Baudrate für die Datennachricht nach Bedarf zu überschreiben. Lassen Sie das Feld leer, um die vom Smart Meter definierte Baudratenumschaltung zu verwenden.

## Adapter wird getestet mit ...
... mindestens:

* Hager-eHz-Energiezähler (mehrfach, z. B. eHZ-IW8E2A5L0EK2P, EHZ363W5)
* EMH-Energiezähler
* EFR SmartGridHub
* Siemens 2WR5-Lesegerät von einer Heizstation
* Elster AS1440
* Iskraemeco MT174
* Iskraemeco MT175
* Itron EM214 Typ 720
* Landis & Gyr E220
* Niederländisches Smart Meter mit DSRM-Protokoll (verwenden Sie "Nur Daten zum Lesen serieller Geräte" und "D0" als Protokoll)
* DZG DWS7412.1T
  ** WICHTIG* Es scheint einen Firmware-Fehler zu geben und manchmal wird der aktuelle Energieverbrauch negativ! Manuelle Neuberechnung möglich mit Formular von https://github.com/Apollon77/smartmeter-obis/issues/75#issuecomment-581650736* ... und vielen, vielen mehr

Bitte senden Sie mir Informationen zu Geräten, auf denen Sie die Bibliothek erfolgreich verwendet haben, und ich werde sie hier hinzufügen.

## Spezielle Smartmeter und Probleme
### DZG DVS74
Es scheint manchmal ein Fehler in der SML-Firmware zu sein und die Werte sind in der SML-Nachricht falsch codiert, aber die Nachricht selbst ist gültig. Die Lösung besteht darin, den Wert mit einem Javascript nachzubearbeiten. Siehe https://github.com/Apollon77/smartmeter-obis/issues/75#issuecomment-581650736

## So melden Sie Probleme und Funktionsanforderungen
Bitte verwenden Sie dazu GitHub-Probleme.

Am besten stellen Sie den Adapter auf den Debug-Protokollmodus (Instanzen -> Expertenmodus -> Spaltenprotokollstufe). Dann holen Sie sich bitte die Protokolldatei von der Festplatte (Unterverzeichnis "log" im ioBroker-Installationsverzeichnis und nicht von Admin, da Admin die Zeilen abschneidet). Wenn Sie es nicht gerne in der GitHub-Ausgabe bereitstellen, können Sie es mir auch per E-Mail senden (iobroker@fischer-ka.de). Bitte fügen Sie einen Verweis auf das relevante GitHub-Problem hinzu UND beschreiben Sie auch, was ich zu welchem Zeitpunkt im Protokoll sehe.

## Was ist Sentry und was wird den Servern gemeldet?
Mit Sentry.io erhalten Entwickler einen Überblick über Fehler in ihren Anwendungen. Und genau das ist in diesem Adapter implementiert.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll angezeigt wird, an unseren eigenen Sentry-Server in Deutschland gesendet. Wenn Sie der iobroker GmbH erlaubt haben, Diagnosedaten zu sammeln, ist auch Ihre Installations-ID (dies ist nur eine eindeutige ID **ohne** zusätzliche Informationen über Sie, E-Mail, Name oder dergleichen) enthalten. Auf diese Weise kann Sentry Fehler gruppieren und anzeigen, wie viele eindeutige Benutzer von einem solchen Fehler betroffen sind. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die im Grunde nie abstürzen.

## Changelog

### 3.2.0 (2021-01-24)
* (Apollon77) Add new protocolSmlInputEncoding option for SML protocol. With this also ascii or base64 based encodings (e.g. with TCP transports) are possible.

### 3.1.9 (2021-01-22)
* (Apollon77) optimize stop handling (Sentry IOBROKER-SMARTMETER-10)

### 3.1.8 (2021-01-14)
* (Apollon77) prevent last warnings with js-controller 3.2

### 3.1.7 (2021-01-13)
* (Apollon77) prevent warnings with js-controller 3.2
* (Apollon77) update js-controller dependency to at least require js-controller 2.0.0

### 3.1.6 (2020-11-15)
* (Apollon77) update OpenSML lib to support Holley DTZ541 wrongly implemented CRC Algorithm

### 3.1.5 (2020-09-21)
* (Apollon77) update dependencies to prevent some crash cases and optimize tcp mode

### 3.1.3 (2020-07-20)
* (Apollon77) update dependencies to prevent some crash cases

### 3.1.2 (2020-04-12)
* (Apollon77) catch errors when no memory is available anymore and stop processing

### 3.1.1 (2020-03-11)
* (Apollon77) fix admin when switching to TCPTransport
* (Apollon77) bugfixes and optimizations

### 3.1.0 (2020-03-08)
* (Apollon77) bugfixes and optimizations
* (Apollon77) experimental TCP support, please give feedback

### 3.0.10 (2020-02-05)
* (Apollon77) make sure HTTP based smartmeters are also polled frequently when responses are invalid
* (Apollon77) other optimizations
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany

### 3.0.8 (2019-12-20)
* (Apollon77) errors prevented when stopping to process data

### 3.0.7 (2019-12-18)
* (Apollon77) errors prevented when stopping to process data

### 3.0.6 (2019-12-07)
* (Apollon77) serial port configuration further optimized
* (Apollon77) update smartmeter-obis lib to fix some edge case errors and serial close handling

### 3.0.3 (2019-11-30)
* (Apollon77) serial port configuration further optimized

### 3.0.2 (2019-11-29)
* (Apollon77) Fix use of "/dev/serial/by-id" paths on linux if available

### 3.0.1 (2019-11-27)
* (Apollon77) BREAKING CHANGE: Supports nodejs 8.x+ only, up to 12.x
* (Apollon77) support compact mode
* (Apollon77) update to latest library versions to fix problems and add special handling for some smart meters with broken firmware
* (Apollon77) Use "/dev/serial/by-id" paths on linux if available; add port selection to Admin
* (Apollon77) Add Sentry for error reporting

### 2.0.0 (2019-03-22)
* (Apollon77) BREAKING CHANGE: State names changed because * no longer supported. Is replaced by __ now because of possible collisions in state names with only one _

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

Copyright (c) 2017-2020 Apollon77 <ingo@fischer-ka.de>

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