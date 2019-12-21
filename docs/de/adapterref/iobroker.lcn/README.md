---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lcn/README.md
title: ioBroker.lcn
hash: XsIZz+rYQ0zWl3hpNnx571PIlwCFV26kGdvcRx+HE40=
---
![Logo](../../../en/adapterref/iobroker.lcn/admin/lcn.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.lcn.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lcn.svg)
![NPM](https://nodei.co/npm/iobroker.lcn.png?downloads=true)

# IoBroker.lcn
Mit diesem Adapter kann das lokale Steuerungsnetzwerk [LCN](https://www.lcn.eu/) mit ioBroker verbunden werden.

## Unterstützte Gateways
- LCN-PKE

![pke](../../../en/adapterref/iobroker.lcn/img/lcn-pke.png)

- LCN-PKU mit LCN-PCHK

![pke](../../../en/adapterref/iobroker.lcn/img/lcn-pku.png)

** Vergiss nicht, dass ioBroker.lcn eine LCN-Verbindungslizenz blockiert. **

Die Konfiguration und Module werden automatisch durch einen Scan erkannt, der manuell über den Konfigurationsdialog ausgelöst werden muss und jederzeit wiederholt werden kann.

## Types
Folgende Lese- und Schreibgruppen werden unterstützt:

- Analogwerte (Ausgang / Eingang)
- Relais (Ausgang)
- Sensoren (Eingang)
- LEDs (Ausgang / Eingang)
- Variablen (Eingabe)

## Variablen
Um die gültigen Konvertierungsfunktionen auf Variablen anzuwenden, müssen die Variablen die gültigen Rollen haben. Folgende Rollen werden unterstützt:

- **Wert.Temperatur** - Temperatur in Celsius
- **Wert.Helligkeit** - Lux (I-Eingang) in Lux
- **value.speed.wind** - Windgeschwindigkeit in m / s
- **Spannungswert** - Spannung in Volt
- **value.current** - Strom in Ampere
- **value.sun.azimuth** - Sonnenazimut
- **value.sun.elevation** - Sonnenstand

## Die Einstellungen
- Wiederverbindungsintervall (Sek.) - Wie oft Adapter versuchen, eine Verbindung herzustellen. Standard alle 30 Sekunden.
- Verbindungs-Timeout (ms) - wie lange der Adapter auf die Antwort der Verbindung einschließlich Authentifizierung wartet. Standard 6 Sekunden.
- Scan-Antwort-Timeout (ms) - Wie lange der Adapter auf Antworten wartet, indem er die Module scannt.
- Antwortzeitlimit (ms) - Zeitlimit für Steuerbefehle
- Ping-Intervall (Sek.) - wie oft der Adapter Ping-Anforderungen sendet
- Ping Response Timeout (ms) - Zeitlimit für Ping-Anforderungen
- IN / OUT-Relais sind gleich - wenn das "out" - und das "in" -Relais dasselbe sind oder wenn diese Relais unterschiedlich sind.

```
// =====================  Same relays =============================
//                                    +-------+
// ----------------- OUT -----------> |       |
//                                    | Relay |
// <----------------- IN ------------ |       |
//                                    +-------+
//
//
// ======================  Different relays =======================
//                                    +-------+
//                                    |       |
// ----------------- OUT -----------> | Relay |
//                                    |       |
//                                    +-------+
//
//                                    +--------+
//                                    | Sensor |
// <----------------- IN ------------ |   or   |
//                                    | Relay  |
//                                    +--------+
```

## Wie benutzt man
Nach dem ersten Start müssen die Geräte gescannt werden. Dies kann im Konfigurationsdialog mit der Schaltfläche Scannen erfolgen

![Scan](../../../en/adapterref/iobroker.lcn/img/scanButton.png)

## Machen
- Konfigurationsdialog zum Definieren des Variablentyps.

## Changelog
### 0.6.3 (2019-12-18)
* (bluefox) General relays mode implemented

### 0.6.2 (2019-12-07)
* (bluefox) Detected delayed responses
* (bluefox) Dynamical creation of states is implemented

### 0.5.5 (2019-12-05)
* (bluefox) Relay inputs were corrected

### 0.5.4 (2019-12-04)
* (bluefox) Connection indication was corrected

### 0.5.1 (2019-11-29)
* (bluefox) Finger scanner supported
* (bluefox) Added possibility to set the analog mode
* (bluefox) Relay outputs are supported now

### 0.4.4 (2019-11-26)
* (bluefox) Fixed error by parsing of acknowledgement

### 0.4.2 (2019-06-12)
* (bluefox) Support of old measure values was added

### 0.3.2 (2018-11-19)
* (bluefox) add variables support

### 0.2.1
* (bluefox) initial release

## License
CC-BY-NC-4.0

Copyright (c) 2018-2019 bluefox <dogafox@gmail.com>

Up to 10 devices can be connected for free. If you need more devices, you must buy a commercial license.