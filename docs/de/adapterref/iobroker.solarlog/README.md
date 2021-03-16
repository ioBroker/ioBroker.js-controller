---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solarlog/README.md
title: ioBroker.solarlog
hash: JrCGjlDBD6R6mF+NNj8ajarvw7LOIHac0YU/8vcMuqg=
---
![Logo](../../../en/adapterref/iobroker.solarlog/admin/solarlog.png)

![Anzahl der Installationen](http://iobroker.live/badges/solarlog-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.solarlog.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.solarlog.svg)
![NPM](https://nodei.co/npm/iobroker.solarlog.png?downloads=true)

# IoBroker.solarlog
Ein ioBroker-Adapter für Solarlog-Geräte

## Solarlog - Einstellungen
Die offene JSON-Schnittstelle muss im Konfigurationsmenü des Solarlog aktiviert werden.

## Adapter - Einstellungen
### Grundeinstellungen
Stellen Sie Solarlog - IP-Adresse (192.XXX.X.XXX), Port (optional) und Abfrageintervall (in Millisekunden, mindestens 10 Sekunden, empfohlenen 30 Sekunden oder mehr) ein.

Sicherheit: Sie können das Kennwort 'Benutzer' in Ihrem Solarlog und das Kontrollkästchen 'Benutzeranmeldung aktiviert' aktivieren und Ihr Kennwort in der Adapterkonfiguration hinzufügen oder Solarlog und Adapter ohne Benutzerkennwort ausführen. Wenn die Benutzeranmeldung aktiviert ist, wird empfohlen, den Adapter zu stoppen, während Sie die Solarlog-Benutzeroberfläche verwenden (andernfalls müssen Sie sich nach jeder Anforderung des Adapters erneut anmelden).

### Erweiterte Einstellungen
Überprüfen Sie, ob alle Wechselrichter / Submeter / Geräte / Smart Energy - Daten erfasst werden sollen.

Überprüfen Sie, ob historische Daten erfasst werden sollen, und legen Sie die Tageszeit fest, zu der die historischen Datenobjekte aktualisiert werden.

Prognose: Optional erhält der Adapter Prognosedaten mithilfe der Forecast.Solar-API. Tatsächlich werden die heutigen und morgigen Gesamt-kWh vorhergesagt und jede Stunde aktualisiert. Detailliertere oder zusätzliche Daten sind auf Anfrage erhältlich (bitte öffnen Sie ein Problem).

## Hardware
Getestet am: Solarlog 200PM + / 300PM + / 500 / 1200Meter / 50

SolarLog 50: Es gibt keine offenen JSON-Interface @ SolarLog 50-Geräte. Bestimmte Werte im Kanal 'info' und 'status' lauten also 'ACCESS DENIED'. Wenn Sie eine andere Lösung bevorzugen, öffnen Sie bitte ein Problem oder veröffentlichen Sie Ihre Einstellungen in einem entsprechenden Problem.

## Changelog

### 2.0.2
-   smart energy 'switch group' data added.

### 2.0.1

-   bugfix (better timing to set inverter data).

### 2.0.0

-   Complete code redesign to reduce traffic between adapter and solarlog. NEW: System informations (info) and solarlogs setpoint-values for year, current and all month and current day (forecast).

### 1.3.0

-   user-login possibility added.

### 1.2.4

-   .npmignore and .gitignore added, small bugfix

### 1.2.3

-   Readme/License update.

### 1.2.2

-   It is now possible to set the time when historic data is requested.

### 1.2.1

-   'Forecast' - bug fixed (forecast request now only submitted if forecast is activated), dependencies updated.

### 1.2.0

-   Shows now forecast data: todays and tomorrows total kWh. Completed translations in words.js.

### 1.1.0

-   Shows detailed information on self - consumption. Imports yearly & monthly historic data.

### 1.0.0

-   Reads now devicetypes, -brands and -classes. Sets correct params for batteries. Displays self-consumption @'status'

### 0.1.6

-   Reads now battery data

### 0.1.5

-   Reads now historic data (yearly sum per Inverter), testing update

### 0.1.4

-   Readme - update

### 0.1.3

-   Core Files/Testing Update and introduce adapter-core

### 0.1.2

-   Inverter/meter - detecion optimized

### 0.1.1

-   support for compact mode

### 0.1.0

-   optional port declaration, readme updated

### 0.0.9

-   another bugfix daysum - function

### 0.0.8

-   bugfix daysum - function

### 0.0.7

-   import of daily sum of production/consumption per inverter/meter in Wh
-   info connection state fixed

### 0.0.6

-   optimized evaluation of number of inverters/meters to import

### 0.0.5

-   better readme
-   correct labes in config-dialogue

Planned for next version: reading solarlog smart energy settings and states

### 0.0.4

-   Inverter-import optional
-   Error - logs refer to functions
-   better readme

Planned for next version: reading solarlog smart energy settings and states

### 0.0.3

New functions added!

-   reads all defined inverters/meters
-   sets objects named as in solarlog
-   gets values (current production/consumption) and states for each inverter

Planned for next version: reading solarlog smart energy settings and states

### 0.0.2 First running version

Defined objects:

-   Time last data sync
-   Installed generator power
-   Total output PAC from all of the inverters and meters in inverter mode.
-   Total output PAC from all of the inverters
-   Average voltage UAC from the inverter
-   Average voltage UDC from the inverter
-   Total yield for the day from all of the inverters
-   Total yield for the previous day from all of the inverters
-   Total yield for the month from all of the inverters
-   Total yield for the year from all of the inverters
-   Total yield from all of the inverters
-   Current total consumption PAC from all of the consumption meters
-   Total consumption from all of the consumption meters
-   Total consumption for the previous day; all of the consumption meters
-   Total consumption for the month; all of the consumption meters
-   Total consumption for the year; all of the consumption meters
-   Accumulated total consumption, all Consumption meter

Planned Objects:

-   Description/Yield/Consuption of all connected inverters and meters

## License

The MIT License (MIT)

Copyright (c) 2018-2021 forelleblau marceladam@gmx.ch

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