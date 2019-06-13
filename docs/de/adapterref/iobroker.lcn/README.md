---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lcn/README.md
title: ioBroker.lcn
hash: fqNOdd76eIu4H7mYnlg3q/hxtJukZdAZ2vLp8u0uEyw=
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

## Wie benutzt man
Nach dem ersten Start müssen die Geräte gescannt werden. Dies kann im Konfigurationsdialog mit der Schaltfläche Scannen erfolgen

![Scan](../../../en/adapterref/iobroker.lcn/img/scanButton.png)

## Machen
- Konfigurationsdialog zum Definieren des Variablentyps.

## Changelog

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