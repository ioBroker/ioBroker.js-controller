---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.comfoair/README.md
title: ioBroker.comfoair
hash: JgCMOidjQkEBCrxte4UfFtKM9hD7kE7KeY/C6O4yKNU=
---
![Logo](../../../en/adapterref/iobroker.comfoair/admin/comfoair.png)

![Anzahl der Installationen](http://iobroker.live/badges/comfoair-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.comfoair.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.comfoair.svg)
![NPM](https://nodei.co/npm/iobroker.comfoair.png?downloads=true)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.comfoair.svg)

# IoBroker.comfoair
Ein ioBroker-Adapter für Zehnder Comfoair 'CA'-Belüftungen (d. H. ComfoAir CA350, NICHT ComfoAir Q350 ...).

## Verbindung
### Nach IP / LAN
Verwenden Sie einen RS232-LAN- oder WLAN-Konverter, um ioBroker mit Ihrem Zehnder Comfoair zu verbinden.
Installieren Sie die Hardware für die TCP-Verbindung zu comfoair: d. H. RS232-LAN-Adapter zur seriellen Schnittstelle von comfoair. Verbinden Sie nur die Pins 2, 3 und 5 (sollte auch mit TX, RX und GND funktionieren - Kontakte der cc-Ease-Verbindung auch).

### Serielle VERBINDUNG
Verbinden Sie die serielle Schnittstelle Ihres comfoair mit einer seriellen Schnittstelle des Geräts, auf dem ioBroker ausgeführt wird. Verwenden Sie zum Anschließen der Raspberry Pis UART-Pins ein RS232toUSB-Kabel oder einen RS232toTTL-Adapter.

## Konfig
Wählen Sie Ihren bevorzugten Verbindungsmodus (IP oder seriell), stellen Sie comfoair - IP-Adresse und Port ein oder geben Sie Ihr serielles Gerät an, definieren Sie einen (RS232) comfoair-Verbindungsmodus (siehe 'Adapter & CC Ease') und definieren Sie ein Polling-Intervall.

## Adapter & CC Ease
Im Allgemeinen wird nicht empfohlen, Daten von 2 Sendern an einen Empfänger in der seriellen RS232-Kommunikation zu senden. Die parallele Verwendung von CCEase und Adapter kann zu Fehlern oder im schlimmsten Fall zu Schäden an Ihrer Komfortsteuerung führen! Wenn Sie den ComfoAir-Adapter starten, sollte Ihr CC Ease daher nicht angeschlossen sein oder heruntergefahren werden.
Das Comfoair selbst kennt 4 verschiedene rs232-Modi: CCEaseonly, PConly, PCMaster, PCLogmode. In PConly und PCMaster ist CC-Ease deaktiviert.
In der Instanzkonfiguration können Sie einen der folgenden Verbindungsmodi auswählen. Bitte kreuzen Sie nur eine davon an! Sobald der Adapter nur im Adapter oder im Parallelmodus ausgeführt wird, können Sie den rs232-Modus des comfoair umschalten (was nicht empfohlen wird, da ein bestimmter Verbindungsmodus einen bestimmten rs232-Modus benötigt!).

### Nur Adapter
CC Ease ist nicht verbunden (empfohlen) oder wird beim Starten des Adapters heruntergefahren. Sie können Ihren Comfoair nur mit ioBroker steuern (rs232mode ist PCMaster). Dieser Modus ist Standard und wird empfohlen.

### Nur zuhören
Der Adapter erfasst die vom comfoair oder vom CC Ease gesendeten Daten. CC Ease wird ausgeführt, es können keine Befehle vom Adapter gesendet werden. In diesem Modus erhalten Sie nur einen Grundsatz von Werten (Temperaturen, Lüftungszustände). In diesem Modus besteht auch kein Risiko für Kommunikationsfehler / -schäden, da keine Kommunikation vom Adapter zum Comfoair besteht.

### Paralleler Modus
CC Ease und Adapter laufen. comfoiar rs232mode ist auf 'PCLogmode' gesetzt. Der Adapter wartet auf Grundwerte (Temperaturen, Lüftungsstufen) und fragt nach anderen (Fehler, Filter-Timer). Legen Sie ein verlängertes Abfrageintervall fest, um das Risiko von Kommunikationsfehlern zu verringern. Sie können Ihren ComfoAir mit ioBroker und mit der CC Ease-Einheit steuern. Bevor ein Befehl gesendet wird (einschließlich Abfrage), wird der rs232-Modus auf PC Master umgeschaltet. Mit jedem gesendeten Befehl wird auch eine Abfrage durchgeführt. Tests haben gezeigt, dass sie fehlerfrei sind und über einen längeren Zeitraum parallel laufen. Aber: Sie führen diesen Modus auf eigenes Risiko aus.

### Paralleler Modus im konstanten PC-Log-Modus
Einige Benutzer haben positive Erfahrungen mit der ständigen Ausführung von comfoair im PC-Logmode gemacht. Dieser Modus hat die gleichen Funktionen wie der Nur-Adapter-Modus, jedoch mit einer laufenden CC-Leichtigkeit. Aber: Sie führen diesen Modus auf eigenes Risiko aus.

## Verwenden des Adapters
Die Werte Ihres Komfoair sollten im Kanal "Status" und "Temperaturen" sichtbar sein. Bitte aktualisieren Sie die Objektansicht, nachdem Sie den Verbindungsmodus geändert haben.

Durch Einstellen / Ändern von Werten im 'Steuerungskanal' steuern Sie Ihre Komfortlüftung. Alle Werte im 'control' - Kanal müssen mit ACK = false gesetzt werden, um als Befehle für den Adapter erkannt zu werden.

Getestet auf comfoair CA350.

## Changelog

### 1.0.0

-   offers now the possibility of a direct serial connection besides the connection over IP/LAN.

### 0.3.2

-   Bypass - error bug fixed.

### 0.3.1

-   new connection mode: parallel in constant PC-Logmode.

### 0.3.0

-   new connection modes, i.e. 'listening only', selftest-function and setting filter-timer added.

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

-   bugfix set vent levels.

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

Copyright (c) 2020 forelleblau marceladam@gmx.ch

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