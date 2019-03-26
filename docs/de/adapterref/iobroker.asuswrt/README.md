---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.asuswrt/README.md
title: ioBroker.asuswrt
hash: th9msLcv0OCTB3cVH4NhjbOy3OabS7EF+q3Ckcxin84=
---
![Logo](../../../en/adapterref/iobroker.asuswrt/admin/asuswrt.png)

![Anzahl der Installationen](http://iobroker.live/badges/asuswrt-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.asuswrt.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.asuswrt.svg)
![Tests](https://api.travis-ci.org/mcdhrts/ioBroker.asuswrt.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![NPM](https://nodei.co/npm/iobroker.asuswrt.png?downloads=true)

# IoBroker.asuswrt ===================
## ASUSWRT-Adapter für ioBroker
Aktive Geräte in ASUS-Routern suchen, auf denen ASUSWRT ausgeführt wird.
Sie können dies beispielsweise für die Anwesenheitserkennung von Telefonen verwenden, um zu ermitteln, ob jemand zu Hause ist.

Getestet mit Asus GT-AC5300 mit ASUSWRT 3.0.0.4.384_32799

Eine Liste von Asus, deren Router NICHT ASUSWRT verwenden, finden Sie hier: https://event.asus.com/2013/nw/ASUSWRT/

## Bedarf
Sie müssen SSH-Verbindungen in den Router-Einstellungen aktivieren und zulassen

Sie benötigen mindestens NodeJS V6 und Admin V3

Wenn Sie die letzte Version von Admin V2 installieren, wird Version 0.3.1 unterstützt

## Konfiguration
* IP-Adresse des Asus-Routers (obligatorisch)
    * Die IP-Adresse des Asus Routers
* Login Benutzer (obligatorisch)
    * Der Benutzername für den Asus Router zum Anmelden
* Login-Passwort (optional, wenn private Schlüsseldatei verwendet wird)
    * Das Passwort für den Benutzer zum Einloggen
    * Wenn Sie Private Key File verwenden, lassen Sie dieses Feld leer
* Private-Key-Datei (optional, wenn Kennwort verwendet wird)
    * Wenn Sie kein Passwort-Login verwenden möchten, können Sie den Pfad zur Private Key File für das SSH-Login festlegen
    * Leer lassen, wenn nicht gewünscht
* Passphrase für private Schlüsseldatei (optional, wenn die private Schlüsseldatei verschlüsselt ist)
    * Wenn Ihre Schlüsseldatei mit einer Passphrase verschlüsselt ist, geben Sie sie hier ein
    * Leer lassen, wenn nicht nötig
* SSH-Port (obligatorisch)
    * Der Port für die SSH-Verbindung zum Asus Router
* Abfragezeit
    * Die Zeit in ms für die Prüfung auf aktive Geräte (Mininum-Zeit beträgt 5000 ms = 5 s)
* Zeit nicht aktiv
    * Die Zeit in ms, in der ein Gerät nicht mehr aktiv ist.
    * In meinem Fall 180000ms = 180s = 3 Minuten funktioniert einwandfrei. Minimum ist 60000ms
* Adressen zur Überwachung
    * Fügen Sie die zu überwachenden Geräte hinzu, wenn sie mit der MAC-Adresse des Geräts aktiv sind oder nicht.
    * Vergessen Sie nicht, das Kontrollkästchen zu aktivieren, um die Überwachung zu aktivieren

## Changelog

### 1.0.1 (2019-03-22)
* (mcdhrts) Add Support for Compact Mode

### 1.0.0 (2019-01-13)
* (mcdhrts) 
    * Add possibility to use SSH Private Key File instead of Password.
    * Minimum Polling Time down to 5 Seconds.
    * Removed Simple-SSH Support.
    * Removed Admin V2 Support.

### 0.3.1 (2019-01-03)
* (mcdhrts) Changed Test Files, no features added

### 0.3.0 (2018-12-31)
* (mcdhrts) Code Review Changes, when using SSH2 Polling Intervall is lower to now minimum 10s

### 0.2.1 (2018-12-29)
* (mcdhrts) Update Readme and add missing translations

### 0.2.0 (2018-12-17)
* (mcdhrts) Possibilty to use SSH2 which keeps the SSH Session to the Router alive

### 0.1.2 (2018-12-10)
* (mcdhrts) Update wrong dependencies

### 0.1.1 (2018-12-10)
* (mcdhrts) Update README

### 0.1.0 (2018-12-10)
* (mcdhrts) first complete checked and running beta Version

### 0.0.1 (2018-12-09)
* (mcdhrts) first official beta version

## License
The MIT License (MIT)

Copyright (c) 2019 mcdhrts <mcdhrts@outlook.com>

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