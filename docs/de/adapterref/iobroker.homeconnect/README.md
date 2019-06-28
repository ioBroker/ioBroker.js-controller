---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.homeconnect/README.md
title: ioBroker.homeconnect
hash: 6CvYBjhtz9gp9QYsounGpuWdRZEfsOfBUY8C8Lp1t70=
---
![Logo](../../../en/adapterref/iobroker.homeconnect/admin/homeconnect.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.homeconnect.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.homeconnect.svg)
![Build Status](https://travis-ci.org/dna909/ioBroker.homeconnect.svg?branch=master)

# IoBroker.homeconnect
=================

## Voraussetzungen vor der Installation
Es muss mindestens Node.js Version 8 installiert sein !!

Für den Adapter wird eine ClientID benötigt. Nutze die Einstellungen um jeden Schritt der Registrierung zu erreichen.

## Voraussetzungen vor der Installation
Mindestens Node.js Version 8 muss installiert sein!

Für den Adapter ist eine ClientID erforderlich. Verwenden Sie die Einstellungen für jeden Schritt, um sich zu registrieren.

https://developer.home-connect.com

![Bildschirmfoto](../../../en/adapterref/iobroker.homeconnect/img/registrierung1.JPG)

Bei **Default Home Connect User Account for Testing** wird die E-Mail-Adresse angegeben, mit der die Home Connect-App registriert wird, diese wird auch später beim Authorization-Prozess benötigt.

Geben Sie für **Standard-Home Connect-Benutzerkonto zum Testen** die E-Mail-Adresse an, mit der die Home Connect-App gesendet werden soll.
registriert wurde, ist dies auch später im Autorisierungsprozess erforderlich.

![Bildschirmfoto](../../../en/adapterref/iobroker.homeconnect/img/registrierung2.JPG)

Bei **Account Type** Individual auswählen. Keine Ahnung, ob das geprüft wird.

Für **Account Type** wählen Sie Individual. Fügen Sie die restlichen Daten hinzu, falls verfügbar (keine Ahnung, ob dies überprüft wird).

![Bildschirmfoto](../../../en/adapterref/iobroker.homeconnect/img/application1.JPG)

Dann auf **Applications** und anschließend auf **Register Application** gehen.

Gehen Sie dann zu **Applications** und dann zu **Register Application**

![Bildschirmfoto](../../../en/adapterref/iobroker.homeconnect/img/application2.JPG)

Bei **Application ID** einen Namen für die Application eintragen, diesen ioBroker. Bei **OAuth Flow** Device Flow kann das letzte Feld leer bleiben. Dann speichern und dann hat man die benötigte ClientID.

Geben Sie für **Anwendungs-ID** einen Namen für die Anwendung ein, z. ioBroker. Wählen Sie mit **OAuth Flow** Device Flow das Feld Das letzte Feld kann leer bleiben. Speichern Sie dann und Sie haben die erforderliche ClientID.

## Konfiguration
In der Adapter-Config muss nur die ClientID eingetragen werden. Wenn der Adapter läuft, wird eine Authorization-URL generiert, die in den Einstellungen nach dem Speichern der ClientID angezeigt wird. Einfach nach dem Speichern der Einstellungen neu öffnen

## Aufbau
In der Adapterkonfiguration muss nur die ClientID eingegeben werden. Wenn der Adapter ausgeführt wird, wird eine Autorisierungs-URL generiert. Diese URL können Sie in den Einstellungen nach dem Speichern sehen, warten und öffnen Sie die Einstellungen erneut.

## Benutzung
Mit den Befehlen können Sie das Programm stoppen, pausiren oder fortführen.
Mit den Zuständen in den Einstellungen kannst du das Gerät ein oder ausschalten.
Ändern des States programs.active.BSH_Common_Root_ActiveProgram führt zum Starten eines Programms Ändern des States programs.selected.BSH_Common_Root_SelectedProgram führt zum Auswählen des Programms oder der Optionen

## Verwendungszweck
Mit den Zuständen in Befehlen können Sie ein Programm anhalten, anhalten und fortsetzen.
Mit den Status in den Einstellungen können Sie das Gerät ausschalten oder einschalten. Ändern des Werts von programs.active.BSH_Common_Root_ActiveProgram führt zum Starten eines Programms. Ändern des Werts von programs.selected.BSH_Common_Root_SelectedProgram führt zur Auswahl eines Programms oder von Optionen

## Changelog

### 0.0.18 (26.06.2019)

-   (ta2k) add error handling for stoping

### 0.0.17 (26.06.2019)

-   (ta2k) make commands writeable

### 0.0.16 (26.06.2019)

-   (ta2k) cleanup states after update

### 0.0.15 (24.06.2019)

-   (ta2k) reconnect after token refresh

### 0.0.14 (18.06.2019)

-   (ta2k) check for keep alive events

### 0.0.13 (18.06.2019)

-   (ta2k) close event stream before reconnect

### 0.0.12 (18.06.2019)

-   (ta2k) fix events lost after 12hr

### 0.0.11 (09.06.2019)

-   (ta2k) fix set values and refresh available options after program select

### 0.0.10 (04.06.2019)

-   (ta2k) add settings and commands, add options to available and fix bugs

### 0.0.9 (29.05.2019)

-   (ta2k) clean up code and receive event notifications

### 0.0.8 (10.04.2019)

-   (dna909) increase refreshTokenInterval

### 0.0.7 (03.04.2019)

-   (TA2k) Improve refreshToken and add Register process in instance option

### 0.0.6 (09.01.2019)

-   (dna909) Oven: add Option.FastPreHeat, Logging, query stream.type DISCONNECTED
-   (tFaster) code format and cleanups,fixed devices data structure,renamed deviceArray to devices,
    added startInRelative for Oven

### 0.0.5 (28.11.2018)

-   (dna909) add eventstream handling

### 0.0.4 (23.11.2018)

-   (dna909) add event-listener

### 0.0.3 (14.11.2018)

-   (dna909) query States and available programs

### 0.0.2 (08.11.2018)

-   (dna909) OAuth2 Deviceflow-Authorization, enumerate connected appliances

### 0.0.1 (09.10.2018)

-   (dna909) initial release

## License

The MIT License (MIT)

Copyright (c) 2019 dna909 <dna909@googlemail.com>

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