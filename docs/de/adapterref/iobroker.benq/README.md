---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.benq/README.md
title: kein Titel
hash: 2039cqFb9k988C4gt5gK+GzckJciWBfUOICU+P1JwsM=
---
![Logo](../../../en/adapterref/iobroker.benq/admin/benq-logo.png) ioBroker BenQ Projector-Adapter ===================

![Anzahl der Installationen](http://iobroker.live/badges/benq-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.benq.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.benq.svg)
![Tests](http://img.shields.io/travis/instalator/ioBroker.benq/master.svg)
![NPM](https://nodei.co/npm/iobroker.benq.png?downloads=true)

Der IoBroker BenQ Projector Adapter wird zur Steuerung Ihres BenQ-Projektors über RS232 in Verbindung mit dem Etnernet Gateway verwendet.
Die Liste der Modelle und Befehle ist in der Datei `admin/commands.json` enthalten.

## Hardware
Mit dem Treiber können Sie über den [Adapter](http://blog.instalator.ru/archives/744) RS232 zu Ethernet eine Verbindung zu den Projektoren BenQ herstellen.

Als RS232-Gateway zu Ethernet wird jede Arduino-kompatible Karte verwendet, in die Sie [dieser Code](https://github.com/stepansnigirev/ArduinoSerialToEthernet) herunterladen.
Sie benötigen außerdem ein Ethernet Shield W5100 oder W5500 und einen RS232-zu-TTL-Konverter.

## Unterstützung
Unterstützte Modelle: W1200, W1070, W1080 für ...