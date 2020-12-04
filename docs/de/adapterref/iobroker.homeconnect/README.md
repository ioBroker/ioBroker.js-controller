---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.homeconnect/README.md
title: ioBroker.homeconnect
hash: JNG2u5ob50WeA6YDs9uIdJwkkjLcM4JW5m2HxnDnJAw=
---
![Logo](../../../en/adapterref/iobroker.homeconnect/admin/homeconnect.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.homeconnect.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.homeconnect.svg)
![Build-Status](https://travis-ci.org/dna909/ioBroker.homeconnect.svg?branch=master)

# IoBroker.homeconnect
## Voraussetzungen vor der Installation
Es muß noch Node.js Version 8 installiert sein !!

Für den Adapter wird eine ClientID ausgewählt. Nutze die Einstellungen um jeden Schritt der Berechtigung zu entfernen.

## Anforderungen vor der Installation
Mindestens Node.js Version 8 muss installiert sein!

Für den Adapter ist eine ClientID erforderlich. Verwenden Sie die Einstellungen für jeden Schritt, um sich zu registrieren.

<https://developer.home-connect.com>

![Bildschirmfoto](../../../en/adapterref/iobroker.homeconnect/img/registrierung1.JPG)

Bei **Standard-Home-Connect-Benutzerkonto zum Testen** Die E-Mail-Adresse wurde geändert, mit der Home-Connect-App wurde, diese wird auch beim Autorisierungsprozess geändert.

Geben Sie unter **Standard-Home Connect-Benutzerkonto zum Testen** die E-Mail-Adresse an, mit der die Home Connect-App gesendet werden soll.
registriert wurde, wird dies auch später im Autorisierungsprozess benötigt.

![Bildschirmfoto](../../../en/adapterref/iobroker.homeconnect/img/registrierung2.JPG)

Bei **Kontotyp** Individuell gesehen. Die gleichen Daten müssen vorhanden sind.

Für **Kontotyp** wählen Sie Individuell. Fügen Sie die verbleibenden Daten hinzu, falls verfügbar (keine Ahnung, ob dies überprüft wird).

![Bildschirmfoto](../../../en/adapterref/iobroker.homeconnect/img/application1.JPG)

Dann auf **Bewerbungen** und entfernen auf **Anmeldung anmelden** gehen.

Gehen Sie dann zu **Bewerbungen** und dann zu **Bewerbung registrieren**

![Bildschirmfoto](../../../en/adapterref/iobroker.homeconnect/img/application2.JPG)

Bei **Bewerbungs-ID** einen Namen für die Bewerbung eintragen, z.B. ioBroker. Bei **OAuth Flow** Gerätefluss selektieren das letzte Feld kann leer bleiben. Dann fordert und dann hat man die Ansehen ClientID.

Geben Sie für **Anwendungs-ID** einen Namen für die Anwendung ein, z. ioBroker. Wählen Sie mit **OAuth Flow** Device Flow das Feld Das letzte Feld kann leer bleiben. Speichern Sie dann und Sie haben die erforderliche ClientID.

## Konfiguration
In der Adapter-Konfiguration muss nur die ClientID eingetragen werden. Wenn der Adapter läuft, wird eine Autorisierungs-URL fallen, diese wird in den Einstellungen nach dem Entfernen der ClientID-Einstellungen. Einfach nach dem Einstellungen die Einstellungen neuöffnen

## Aufbau
In der Adapterkonfiguration muss nur die ClientID eingegeben werden. Wenn der Adapter ausgeführt wird, wird eine Autorisierungs-URL generiert. Diese URL sehen Sie in den Einstellungen nach dem Speichern, Warten und erneuten Öffnen der Einstellungen.

## Berechtung
Mit den Zuständen in Befehlen können Sie das Programm anhalten, pausieren oder fortführen.
Mit den Zuständen in Einstellungen können Sie das Gerät ein oder ausschalten.
Verwandte des States programs.active.BSH_Common_Root_ActiveProgram kontrollierte zum Start eines Programms überprüfen des States programs.selected.BSH_Common_Root_SelectedProgram führen zum vorgeschlagenen des Programme oder Optionen

## Verwendung
Mit den Status in Befehlen können Sie ein Programm stoppen, anhalten und fortsetzen.
Mit den Status in den Einstellungen können Sie das Gerät aus- oder einschalten. Ändern Sie den Wert von programs.active.BSH_Common_Root_ActiveProgram führt zum Starten eines Programms. Ändern Sie den Wert von programs.selected.BSH_Common_Root_SelectedProgram führt zur Auswahl eines Programms oder von Optionen

## Changelog

### 0.0.31

- (ta2k) fix pause start command

### 0.0.30 (10.05.2020)

- (ta2k) fix js controller 3 issues

### 0.0.27 (13.11.2019)

- (ta2k) improve option selecting

### 0.0.26 (04.11.2019)

- (ta2k) fix boolean settings

### 0.0.25 (08.09.2019)

- (ta2k) fix compact mode
- (ta2k) reduce query per minute to prevent too much request error

### 0.0.24 (08.09.2019)

- (ta2k) improve error messaging

### 0.0.22 (08.09.2019)

- (ta2k) improve error messaging

### 0.0.22 (26.07.2019)

- (ta2k) bugfixing

### 0.0.21 (12.07.2019)

- (ta2k) bugfixing

### 0.0.19 (30.06.2019)

- (ta2k) improve displaying long states, options and events

### 0.0.18 (26.06.2019)

- (ta2k) add error handling for stoping

### 0.0.17 (26.06.2019)

- (ta2k) make commands writeable

### 0.0.16 (26.06.2019)

- (ta2k) cleanup states after update

### 0.0.15 (24.06.2019)

- (ta2k) reconnect after token refresh

### 0.0.14 (18.06.2019)

- (ta2k) check for keep alive events

### 0.0.13 (18.06.2019)

- (ta2k) close event stream before reconnect

### 0.0.12 (18.06.2019)

- (ta2k) fix events lost after 12hr

### 0.0.11 (09.06.2019)

- (ta2k) fix set values and refresh available options after program select

### 0.0.10 (04.06.2019)

- (ta2k) add settings and commands, add options to available and fix bugs

### 0.0.9 (29.05.2019)

- (ta2k) clean up code and receive event notifications

### 0.0.8 (10.04.2019)

- (dna909) increase refreshTokenInterval

### 0.0.7 (03.04.2019)

- (TA2k) Improve refreshToken and add Register process in instance option

### 0.0.6 (09.01.2019)

- (dna909) Oven: add Option.FastPreHeat, Logging, query stream.type DISCONNECTED
- (tFaster) code format and cleanups,fixed devices data structure,renamed deviceArray to devices,
    added startInRelative for Oven

### 0.0.5 (28.11.2018)

- (dna909) add eventstream handling

### 0.0.4 (23.11.2018)

- (dna909) add event-listener

### 0.0.3 (14.11.2018)

- (dna909) query States and available programs

### 0.0.2 (08.11.2018)

- (dna909) OAuth2 Deviceflow-Authorization, enumerate connected appliances

### 0.0.1 (09.10.2018)

- (dna909) initial release

## License

The MIT License (MIT)

Copyright (c) 2020 dna909 <dna909@googlemail.com>, TA2k

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