![Logo](admin/homeconnect.png)

# ioBroker.homeconnect

=================

[![NPM version](http://img.shields.io/npm/v/iobroker.homeconnect.svg)](https://www.npmjs.com/package/iobroker.homeconnect)
[![Downloads](https://img.shields.io/npm/dm/iobroker.homeconnect.svg)](https://www.npmjs.com/package/iobroker.homeconnect)
[![Build Status](https://travis-ci.org/dna909/ioBroker.homeconnect.svg?branch=master)](https://travis-ci.org/dna909/ioBroker.homeconnect)

## Voraussetzungen vor der Installation

Es muß mindestens Node.js Version 8 installiert sein!!

Für den Adapter wird eine ClientID benötigt. Nutze die Einstellungen um jeden Schritt der Registrierung zu erreichen.

## Requirements before installation

At least Node.js version 8 must be installed!

A ClientID is required for the adapter. Use the settings for each step to register.

https://developer.home-connect.com

![Screenshot](img/registrierung1.JPG)

Bei **Default Home Connect User Account for Testing** die E-Mail-Adresse angeben, mit der die Home-Connect-App
registriert wurde, diese wird später auch beim Authorization-Prozess benötigt.

For **Default Home Connect User Account for Testing**, specify the e-mail address with which the Home Connect app is to be sent.
was registered, this is also required later in the authorization process.

![Screenshot](img/registrierung2.JPG)

Bei **Account Type** Individual auswählen. Die restlichen Daten sofern vorhanden ergänzen (keine Ahnung, ob das geprüft wird).

For **Account Type** select Individual. Add the remaining data if available (no idea if this will be checked).

![Screenshot](img/application1.JPG)

Dann auf **Applications** und anschließend auf **Register Application** gehen.

Then go to **Applications** and then to **Register Application**.

![Screenshot](img/application2.JPG)

Bei **Application ID** einen Namen für die Application eintragen, z.B. ioBroker. Bei **OAuth Flow** Device Flow selektieren das
letzte Feld kann leer bleiben. Dann Speichern und dann hat man die benötigte ClientID.

For **Application ID** enter a name for the application, e.g. ioBroker. With **OAuth Flow** Device Flow select the
The last field can remain empty. Then save and you have the required ClientID.

## Konfiguration

In der Adapter-Config muss nur die ClientID eingetragen werden. Wenn der Adapter läuft, wird eine Authorization-URL generiert, diese wird in den Einstellungen nach dem Speichern der ClientID angezeigt. Einfach nach dem Speichern die Einstellungen neuöffnen

## Configuration

Only the ClientID must be entered in the adapter configuration. If the adapter is running, an authorization URL is generated. This url you can see in the settings after save, wait and reopen the settings.

## Benutzung

Mit den states in commands kannst du das Programm stoppen, pausiren oder fortführen.
Mit den states in settings kannst du das Gerät ein oder ausschalten.
Ändern des States programs.active.BSH_Common_Root_ActiveProgram führt zum starten eines Programms
Ändern des States programs.selected.BSH_Common_Root_SelectedProgram führt zum auswählen des Programms oder Optionen

## Usage

With the states in commands you can stop, pause and resume a program.
With the states in settings you can turn off or turn on the device
Change the value of programs.active.BSH_Common_Root_ActiveProgram leads to starting a program
Change the value of programs.selected.BSH_Common_Root_SelectedProgram leads to selecting a program or options

## Changelog

### 0.0.22 (26.07.2019)

-   (ta2k) bugfixing

### 0.0.21 (12.07.2019)

-   (ta2k) bugfixing

### 0.0.19 (30.06.2019)

-   (ta2k) improve displaying long states, options and events

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
