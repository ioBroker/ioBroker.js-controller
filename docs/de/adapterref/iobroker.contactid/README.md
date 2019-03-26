---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.contactid/README.md
title: ioBroker.contactid
hash: h7GfJ7f0d+XC/uERT7rhtunUIr+ortt6zJG4VANPgXU=
---
![Logo](../../../en/adapterref/iobroker.contactid/admin/contactid.png)

![Travis CI Build Status](https://travis-ci.org/schmupu/ioBroker.contactid.svg?branch=master)
![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.contactid?branch=master&svg=true)
![Anzahl der Installationen](http://iobroker.live/badges/contactid-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.contactid.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.contactid.svg)
![NPM](https://nodei.co/npm/iobroker.contactid.png?downloads=true)

# IoBroker.contactid
==================

Die Protokollkontakt-ID, die von Alarmsystemen zur Kommunikation mit zentralen Stationen verwendet wird.

Dieser Adapter ist ein Kontakt-ID-Server. Wenn ein Alarmereignis ausgelöst wird, sendet das Alarmsystem die Kontakt-ID-Nachricht über IP an die Zentralstation.
Sie können ioBroker mit diesem Adapter als zentrale Station verwenden. Zum Beispiel. Sie können per Conntact ID eine Telegrammnachricht für einen Alarm senden.

Die Kontakt-ID-Nachricht

  SSSS 18QEEEGGZZZC

  * SSSS - Abonnent. Diese vier Ziffern identifizieren das spezifische Alarmsystem oder den Kunden der Zentralstation. ioBroker erlaubt längere Teilnehmernamen.

  * 18 - Nachrichtentyp. Grundsätzlich sollte dieses Feld immer "18" sein.
  * Q - Event Qualifier.
  * EEE - Ereigniscode.
  * GG - Gruppen- / Partitionsnummer.
  * ZZZ - Zonennummer (001 - 999). Dies ist die Nummer der Zone, die den Alarm ausgelöst hat.
  * C - Prüfsumme.

[Kontakt-ID-Protokoll](http://www.technoimport.com.co/Producto/pdfs/ADEMCO%20-%20DC05_Contact_ID.pdf)

## Install & Konfiguration
1. Installieren Sie den Adapter
2. Konfiguration des Adapters:

Wählen Sie die IP-Adresse und den Port zum Abhören von Conctact-ID-Anforderungen.
Registrieren Sie den Namen Ihres Teilnehmers, um Ihre Einbruchalarmmeldungen zu identifizieren, und wählen Sie Ihren Einbruchalarmtyp aus.

3. Konfigurieren Sie Ihr Einbrechersystem für das Senden von Kontakt-ID-Nachrichten

    Lupusec XT1:

Einstellungen -> Contact ID: rptn: // subcriber @ ip-address-iobroker: port Beispiel: rptn: //test@192.168.20.1: 50000

    Lupusec XT1 + / XT2 / XT2 + / XT3:

Einstellungen -> Kontakt-ID: ip: // subcriber @ ip-address-iobroker: port / CID Beispiel: ip: //test@192.168.20.1: 50000 / CID

4. Testen des Adpaters

  Öffnen Sie die Befehlsshell und geben Sie ein

```
telnet ip-address-iobroker port
Example: telnet 192.168.20.1 50000

```

Jetzt können Sie eine Conntact-ID-Nachricht senden. Bei Lupsec-Einbruchmeldeanlagen beginnt und endet die Meldung mit [und]. Geben Sie Ihre Telnet-Sitzung ein:

```
[SSSS 18QEEEGGZZZC]
Example: [test 18160201010B]
```

  Jetzt können Sie die Nachricht in den ioBroker-Objekten sehen

## Changelog

### 1.0.0 (2019.01.05)
* (Stübi) Support js-controller compact mode 

### 0.1.6 (2018.12.27)
* (Stübi) Update Core Adapter

### 0.1.5 (2018.06.07)
* (Stübi) Translations

### 0.1.3 (2018.06.07)
* (Stübi) Cleanup

### 0.1.2 (2018.06.07)
* (Stübi) Improvements

### 0.1.1 (2018.06.03)
* (Stübi) Lupusec XT1 Plus, XT2 Plus and XT3 added

### 0.1.0 (18.05.2018)
* (Stübi) First Beta Release

### 0.0.6 (2018.05.18)
* (Stübi) fixed error i
* (Stübi) correction of README.md

### 0.0.5 (2018.05.17)
* (Stübi) fixed error in drop down menu

### 0.0.4 (15.05.2018)
* (Stübi) code improvements

## License
The MIT License (MIT)

Copyright (c) 2018 Thorsten <thorsten@stueben.de>

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