---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sia/README.md
title: ioBroker.sia
hash: il7/UPEyrU92BmFdqvOBWwW0PIp9WsgXNkxmwPVIO84=
---
![Logo](../../../en/adapterref/iobroker.sia/admin/sia.png)

![Travis CI Build Status](https://travis-ci.org/schmupu/ioBroker.sia.svg?branch=master)
![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.sia?branch=master&svg=true)
![Anzahl der Installationen](http://iobroker.live/badges/sia-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sia.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sia.svg)
![NPM](https://nodei.co/npm/iobroker.sia.png?downloads=true)

# IoBroker.sia
==================

Benötigt node.js 6.0 oder höher und Admin v3!

Das Protokoll SIA DC-09 wird von Alarmsystemen zur Kommunikation mit den Zentralstationen verwendet.

Dieser Adapter ist ein SIA-Server. Wenn ein Alarmereignis ausgelöst wird, sendet das Alarmsystem die SIA-Nachricht über IP an die Zentralstation.
Sie können ioBroker mit diesem Adapter als zentrale Station verwenden. Zum Beispiel. Sie können per SIA eine Telegrammnachricht für einen Alarm senden.

[SIA DC-09-Protokoll](https://www.yumpu.com/en/document/view/47594214/dc-09-preparing-for-ansi-public-review-security-industry-)

## Install & Konfiguration
1. Installieren Sie den Adapter
2. Konfiguration des Adapters:

Wählen Sie die IP-Adresse und den Port für das Abhören von SIA-Anforderungen.
![sia_adapter1](../../../en/adapterref/iobroker.sia/admin/sia_adapter1.png)

Registrieren Sie die Kontonummer. Wenn Sie AES verwenden, müssen Sie ein Passwort (Schlüssel) eingeben. Der Schlüssel sollte 16, 24 oder 32 Zeichen (Byte) lang sein.
Wenn das Kontrollkästchen "AES-Passwort im Hex-Format" aktiviert ist, muss das Passwort 32, 48 oder 64 Zeichen (Byte) lang sein.
Im Feld ACK-Timeout legen Sie fest, wie alt die Nachricht in Sekunden sein darf. Wenn Sie 0 Sekunden definieren, wird keine Überprüfung des Timeouts durchgeführt.
![sia_adapter2](../../../en/adapterref/iobroker.sia/admin/sia_adapter2.png)

3. Konfigurieren Sie Ihr Einbrechersystem für das Senden von SIA-Nachrichten

    * Lupusec XT1 + / XT2 / XT2 + / XT3:

Einstellungen -> Kontakt-ID: ip: // subcriber @ ip-address-iobroker: port / SIA Beispiel: ip: //test@192.168.20.1: 50001 / SIA

      ![sia_lupusec1](../../../en/adapterref/iobroker.sia/admin/sia_lupusec1.png)

    * Andere Alarmsysteme:

Der Adapter funktioniert mit allen Alarmsystemen, die das SIA DC-09-Protokoll unterstützen

4. SIA-Objekte / Staaten

Wenn Sie SIA-Nachrichten erhalten, werden sie im Statusbaum angezeigt

![sia_adapter3](../../../en/adapterref/iobroker.sia/admin/sia_adapter3.png)

## Changelog

### 1.0.1 (05.03.2019)
* (Stübi) Saving password encrypted. 
* (Stübi) ACK and NAC calculation extended.
* (Stübi) CRC can be send in 0xABCD (2 Byte) or ABCD (4 Byte, ASCII) format. Automatic recognizing
* (Stübi) AES Password can be in AES-128-CBC, AES-192-CBC or AES-256-CBC
* (Stübi) AES Password can be saved in byte or hex (length 16, 24 or 32 byte) format or hex (length 32, 48 or 64 hex) format
* (Stübi) Timeout for ACK (0 = disable, 1 - n sec)
* (Stübi) Set ioBroker States of message on ACK not on NACK

### 1.0.0 (05.01.2018)
* (Stübi) Support js-controller compact mode 

### 0.1.8 (27.12.2018)
* (Stübi) Update Adapter Core File

### 0.1.6 (23.10.2018)
* (Stübi) Bugfxing (NAK) and AES support

### 0.1.5 (01.10.2018)
* (Stübi) Translations

### 0.0.5 (09.08.2018)
* (Stübi) Requires nodejs 6.0 or higher

### 0.0.4 (08.06.2018)
* (Stübi) Cleanup

### 0.0.3 (08.06.2018)
* (Stübi) SIA regex optimized

### 0.0.2 (08.06.2018)
* (Stübi) bug fixing

### 0.0.1 (07.06.2018)
* (Stübi) first implementation

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