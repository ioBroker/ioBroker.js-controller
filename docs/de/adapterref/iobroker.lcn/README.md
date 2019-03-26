---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lcn/README.md
title: ioBroker.lcn
hash: huwsxU4/YbYGapJUD98J8NIoQW2t3uDw1T5ci8Vw/LE=
---
![Logo](../../../en/adapterref/iobroker.lcn/admin/lcn.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.lcn.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lcn.svg)
![NPM](https://nodei.co/npm/iobroker.lcn.png?downloads=true)

# IoBroker.lcn ===================
Mit diesem Adapter können Sie das Local Control Network [LCN](https://www.lcn.eu/) mit dem ioBroker verbinden.

## Unterstützte Gateways
- LCN-PKE

![pke](../../../en/adapterref/iobroker.lcn/img/lcn-pke.png)

- LCN-PKU mit LCN-PCHK

![pke](../../../en/adapterref/iobroker.lcn/img/lcn-pku.png)

** Vergessen Sie nicht, dass ioBroker.lcn eine LCN-Verbindungslizenz blockiert. **

Die Konfiguration und die Module werden beim Scannen automatisch erkannt.

## Typen
Folgende Lese- und Schreibgruppen werden unterstützt:

- Analogwerte (Ausgang / Eingang)
- Relais (Ausgabe)
- Sensoren (Eingang)
- LEDs (Ausgang / Eingang)
- Variablen (Eingabe)

## Variablen
Um die gültigen Konvertierungsfunktionen auf Variablen anzuwenden, müssen die Variablen gültige Rollen haben. Folgende Rollen werden unterstützt:

- Wert.Temperatur - Temperatur in Celsius
- value.hellness - Lux (I-Eingabe) in Lux
- value.speed.wind - Windgeschwindigkeit in m / s
- wert.strom - strom in Volt
- value.power - Leistung in Amper

-

## Changelog

### 0.3.0
* (bluefox) add variables support

### 0.2.1
* (bluefox) initial release

## License
CC-BY-NC-4.0

Copyright (c) 2018 bluefox <dogafox@gmail.com>

Up to 10 devices can be connected for free. If you need more devices, you must buy a commercial license.