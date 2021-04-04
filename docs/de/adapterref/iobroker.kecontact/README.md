---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.kecontact/README.md
title: ioBroker-Adapter für KEBA KeContact Wallbox
hash: vjCbP+Q83JgDZKTsurLlO6g+lu0iIW+GUqLR8Ogzg6g=
---
![Adapter-Logo](../../../en/adapterref/iobroker.kecontact/admin/charger.png)

![Anzahl der Installationen](http://iobroker.live/badges/kecontact-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.kecontact.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.kecontact.svg)
![Travis](https://img.shields.io/travis/iobroker-community-adapters/ioBroker.kecontact.svg)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.kecontact.svg)

# IoBroker-Adapter für KEBA KeContact Wallbox
Bietet Informationen zum aktuellen Status einer KEBA KeContact-Wallbox mithilfe ihres UDP-Protokolls.

## Installieren
Installieren Sie diesen Adapter über ioBroker Admin:

1. Öffnen Sie den Instanzkonfigurationsdialog
2. Geben Sie die IP-Adresse Ihrer KEBA KeContact-Wallbox ein
3. Passen Sie das Aktualisierungsintervall bei Bedarf an
4. Speichern Sie die Konfiguration
5. Starten Sie den Adapter

## Aufbau
### KeContact IP-Adresse
Dies ist die IP-Adresse Ihrer KEBA KeContact-Wallbox.

### Firmware-Prüfung
Einmal am Tag prüft der Adapter, ob auf der KEBA-Website eine neuere Firmware verfügbar ist. Diese Informationen werden gedruckt, um als Warnung zu protokollieren.

### Passivmodus
Aktivieren Sie diese Option, wenn Sie Ihre Wallbox selbst steuern möchten und Sie nicht möchten, dass dieser Adapter einige Automatisierungen ausführt. In diesem Fall werden alle nachfolgenden Optionen bezüglich PV-Automatik und Leistungsbegrenzung ignoriert.

### Ladesitzungen laden
Sie können diese Option aktivieren, um regelmäßig die neuesten Ladesitzungen (30) von Ihrer Wallbox herunterzuladen.
ACHTUNG für Benutzer ab Version v1.1.1: Sie müssen diese Option aktivieren, um weiterhin Ladesitzungen zu erhalten!

### Aktualisierungsintervall
Dies ist das Intervall in Sekunden, in dem die Wallbox nach neuen Werten abgefragt werden soll. Normalerweise wird es nicht benötigt (auf 0 gesetzt).
Die Wallbox sendet kontinuierlich Sendungen, die absolut ausreichend sind, um die Daten auf dem neuesten Stand zu halten.

Der Standardwert ist 30 Sekunden. Dies ist ein gutes Gleichgewicht zwischen der Last für KeConnect und den aktuellen Informationen in ioBroker.

### PV-Automatik
Um Ihr Fahrzeug entsprechend einem Überschuss aufzuladen (z. B. durch Photovoltaik), können Sie auch Zustände definieren, die den Überschuss und die Berücksichtigung der Hauptleistung darstellen. Diese Werte werden zur Berechnung der Stromstärke verwendet, die zum Laden verwendet werden kann. Durch zusätzliche Werte können Sie definieren

* eine andere minimale Stromstärke als die Standard-6 A (nur für z. B. Renault Zoe erforderlich)
* Ein Wert für die Leistung, die zum Starten des Ladevorgangs verwendet werden kann (dh der Ladevorgang beginnt auch dann, wenn nicht genügend Überschuss verfügbar ist - empfohlen 0 W für 1-Phasen-Ladevorgang, 500 W bis 2000 W für 3-Phasen-Ladevorgang).
* ein Inkrement für die Stromstärke (empfohlen 500 mA)
* Ein Wert, der vorübergehend verwendet werden kann, um die Ladesitzung aufrechtzuerhalten (das bedeutet, dass der Ladevorgang später beendet wird, auch wenn nicht mehr genügend Überschuss verfügbar ist - Start-Rücksicht wird hinzugefügt - empfohlene 500 W).
* Mindestdauer der Ladesitzung (auch wenn der Überschuss nicht mehr ausreicht, dauert eine Ladesitzung mindestens dieses Mal - empfohlen 300 Sekunden)

### Leistungsbegrenzung
Sie können auch max. Leistung Ihrer Wallbox zur Begrenzung der Hauptleistung. Z.B. Wenn Sie Nachtspeicherheizungen betreiben, müssen Sie möglicherweise eine maximale Leistungsbegrenzung einhalten. Wenn Sie einen Wert eingeben, wird Ihre Wallbox kontinuierlich eingeschränkt, um Ihr Leistungslimit nicht zu überschreiten. Zur Begrenzung können bis zu drei Zustände von Energiezählern angegeben werden. Alle Werte werden addiert, um den Stromverbrauch zu berechnen. Über ein zusätzliches Kontrollkästchen wird angegeben, ob die Wallbox-Leistung enthalten ist (in diesem Fall wird die Wallbox-Leistung von den Statuswerten abgezogen).

## Legal
Dieses Projekt ist weder direkt noch indirekt mit der Firma KEBA AG verbunden.

KeConnect ist eine eingetragene Marke der KEBA AG.

## Changelog

### 1.1.2 (2021-04-02)
* (Sneak-L8) default state of photovoltaics automatic set to true for new users
* (Sneak-L8) new option to select whether charging sessions list should be downloaded and be saved in states or not, do so only once an hour
             ATTENTION for users from version v1.1.1 and below: you have to check this option to still receive for charging sessions!
* (Sneak-L8) firmware version check
* (Sneak-L8) expanded readme

### 1.1.1 (2021-02-25)
* (Sneak-L8) internal state update prevented recognition of state change

### 1.1.0 (2021-02-20)
* (Sneak-L8) intermediate results saved as states values
* (Sneak-L8) additional power for charging session as state

### 1.0.3 (2021-02-08)
* (Sneak-L8) new options for minimal amerage (e.g. Renault Zoe) and permanent regard value

### 1.0.2
* Added readout of last 30 Charging Sessions from Wallbox; Enabled 'setenergy' State to send and set Charging Goal in Wh to Wallbox

### 1.0.1 (2020-08-20)
* (Sneak-L8) add missing german translation for IP address setting

### 1.0.0 (2020-08-20)
* (UncleSam) change settings layout to material design, first offical version

### 0.3.2 (2020-08-04)
* (Sneak-L8) in PV automatics mode wallbox will be disabled as long as no vehicle is plugged

### 0.3.1 (2020-07-23)
* (Sneak-L8) do not start charging when vehicle is plugged even if current is too low for photovoltaics automation

### 0.3.0 (2020-07-21)
* (Sneak-L8) regulate wallbox by PV automatics independant from state curr user

### 0.2.6 (2020-07-20)
* (Sneak-L8) try again to regulate wallbox by currtime instead of curr as suggested

### 0.2.3 (2020-05-24)
* (Sneak-L8) fix call to display PV automatics after vehicle is plugged, fix object in energy meter states

### 0.2.2 (2020-05-13)
* (Sneak-L8) display information about photovoltaics automatic also at begin of charging
* (Sneak-L8) delayed display of photovoltaics automatic when vehicle is plugged (8 sec)

### 0.2.1 (2019-11-14)
* (Sneak-L8) handle values of undefined in getStates
* (Sneak-L8) better recognition of max power function

### 0.2.0 (2019-02-05)
* (Sneak-L8) added automatic regulation by output photovoltaics unit
* (Sneak-L8) added possibility to limit wallbox to keep total power below a limit
* (Sneak-L8) added state to display text on wallbox

### 0.1.0 (2019-01-12)
* (Apollon77) Updated CI testing, update basic files

### 0.0.3 (2017-07-04)
* (UncleSamSwiss) Improved UDP datagram sending
* (UncleSamSwiss) Added all known writable states

### 0.0.2 (2017-06-25)
* (UncleSamSwiss) Improved UDP socket handling (thanks to ehome)
* (UncleSamSwiss) Added reading all known states

### 0.0.1 (2017-06-11)
* (UncleSamSwiss) Initial version

## License

Copyright 2020 UncleSamSwiss

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.