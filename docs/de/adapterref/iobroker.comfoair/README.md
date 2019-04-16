---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.comfoair/README.md
title: ioBroker.comfoair
hash: G1IV30sMIv9dhiCRQd/TU2CqG9JhNIpBSkzaWsHybYc=
---
![Logo](../../../en/adapterref/iobroker.comfoair/admin/comfoair.png)

![Anzahl der Installationen](http://iobroker.live/badges/comfoair-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.comfoair.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.comfoair.svg)
![NPM](https://nodei.co/npm/iobroker.comfoair.png?downloads=true)

# IoBroker.comfoair
Ein ioBroker-Adapter für Zehnder Comfoair-CA-Ventilationen (z. B. ComfoAir CA350, NICHT ComfoAir Q350 ...)

Um diesen Adapter verwenden zu können, benötigen Sie einen RS232-zu-LAN- oder WLAN-Konverter, um den ioBroker mit Ihrem Zehnder Comfoair zu verbinden.
Installieren Sie Hardware für die TCP - Verbindung zu comfoair: d. H. Einen RS232 - zu - LAN - Adapter an die serielle Schnittstelle des comfoair. Verbinden Sie nur die Pins 2, 3 und 5 (sollte auch mit TX-, RX- und GND-Kontakten der cc-Ease-Verbindung funktionieren).
Eigentlich funktioniert dieser Adapter nur mit einer LAN-Verbindung. Eine direkte Verbindung, die auf einer direkten seriellen Verbindung basiert, ist in Entwicklung.

Adapter installieren, Instanz erstellen.

## Config
Setze comfoair - IP-Adresse, Port und Polling - Intervall.

## Adapter & CC Ease
Es wird generell nicht empfohlen, Datenform-2-Sender an einen Empfänger in serieller RS232-Kommunikation zu senden. Die parallele Verwendung von CCEase und Adapter kann zu Fehlern oder im schlimmsten Fall zu Schäden an Ihrer Comfoair-Steuerung führen! Wenn Sie den ComfoAir-Adapter starten, muss Ihr CC Ease daher getrennt werden oder heruntergefahren werden.
Das comfoair selbst kennt 4 verschiedene rs232-Modi: CCEaseonly, PConly, PCMaster, PCLogmode. In PConly und PCMaster ist CC-Ease ausgeschaltet.
In der Instanzkonfiguration können Sie einen der folgenden Verbindungsmodi auswählen. Bitte nur eines davon ankreuzen! Sobald der Adapter nur im Adapter oder im Parallelmodus ausgeführt wird, können Sie den RS232-Modus des comfoair umstellen (was nicht empfohlen wird, da ein bestimmter Verbindungsmodus einen bestimmten RS232-Modus erfordert!).

Nur Adapter
CC Ease ist nicht verbunden oder wird beim Start des Adapters heruntergefahren. Sie können Ihren comfoair nur mit ioBroker steuern. (rs232mode ist PCMaster, wird standardmäßig verwendet und empfohlen).

### Nur zuhören
Der Adapter erfasst die vom comfoair oder vom CC Ease gesendeten Daten. CC Ease läuft, vom Adapter können keine Befehle gesendet werden. In diesem Modus erhalten Sie nur einen grundlegenden Wertesatz (Temperaturen, Lüftungszustände).

### Parallelmodus
CC Ease und Adapter laufen. comfoiar rs232mode ist auf 'PCLogmode' gesetzt. Der Adapter überwacht Grundwerte und fragt andere ab (wählen Sie ein erweitertes Abrufintervall). Sie können Ihren ComfoAir mit ioBroker und mit der CC Ease-Einheit steuern. Bevor ein Befehl gesendet wird (einschließlich Abfrage), wird der RS232-Modus auf PC-Master umgestellt. Mit jedem gesendeten Befehl wird auch eine Abfrage durchgeführt. Tests haben sich als fehlerfrei erwiesen - sie laufen über einen längeren Zeitraum parallel. Aber: Sie führen diesen Modus auf eigenes Risiko aus.

## Verwendung des Adapters
Die Werte Ihres Unternehmens sollten im "Status" - und "Temperatur" -Kanal sichtbar sein.

Durch Setzen / Ändern von Werten im 'control' - Kanal steuern Sie Ihre Komfortbelüftung. Alle Werte im 'control' - Kanal müssen mit ACK = false gesetzt werden, um als Befehle für den Adapter erkannt zu werden.

Getestet auf comfoair CA350.

## Changelog

### 0.3.0

-   new connection modes, i.e. 'listening only'-

### 0.2.1

-   smaller bugfixes.

### 0.2.0

-   New rs232 - Modes, reading enthalpie-values, handling connection-errors.

### 0.1.4

-   README-Update 'NO PARALLEL USE', discard 'Safe-Mode'.

### 0.1.3

-   RS - 232 interface: manual- or safe - mode possible.

### 0.1.2

-   ReadME updated, minor bugfixes.

### 0.1.1

-   bugfix ventlevels, reading errors

### 0.1.0

-   ReadME Update

### 0.0.7

-   Core Files/Testing Update and introduce adapter-core

### 0.0.6

-   Filter - change - indicator.

### 0.0.5

-   bugfig set vent levels.

### 0.0.4

-   gets & sets vent levels, gets filter-timer.

### 0.0.3

-   minor bugfixes, sets comfort-temperature and resets filter-hours.

### 0.0.2

-   First running Version. Gets temp, vent, bypass and filter states, sets fan level.

### 0.0.1

-   In development stage, contributions welcome

## License

The MIT License (MIT)

Copyright (c) 2019 forelleblau marceladam@gmx.ch

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