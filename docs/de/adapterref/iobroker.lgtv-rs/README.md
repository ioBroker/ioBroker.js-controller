---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lgtv-rs/README.md
title: ioBroker LG TV RS232-Adapter
hash: DKbZHmbQ+8tx4lVcCUf2im47pxpoZ+PKBjrPZJX3KLY=
---
![Logo](../../../en/adapterref/iobroker.lgtv-rs/admin/lg_admin.png)

![Anzahl der Installationen](http://iobroker.live/badges/lgtv-rs-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.lgtv-rs.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lgtv-rs.svg)
![Tests](http://img.shields.io/travis/instalator/ioBroker.lgtv-rs/master.svg)
![NPM](https://nodei.co/npm/iobroker.lgtv-rs.png?downloads=true)

# IoBroker LG TV RS232-Adapter
Der ioBroker LG TV RS232-Adapter dient zur Steuerung Ihres LG-Fernsehgeräts über RS232 in Verbindung mit dem Etnernet Gateway.
Die Liste der Modelle und Befehle ist in der Datei `admin/commands.json` enthalten.

## Hardware
Mit dem Treiber können Sie eine Verbindung zum LG-Fernsehgerät über den [Adapter](http://blog.instalator.ru/archives/744) RS232 zu Ethernet herstellen.

Als RS232-Gateway zu Ethernet wird jede Arduino-kompatible Karte verwendet, in die Sie [dieser Code](https://github.com/stepansnigirev/ArduinoSerialToEthernet) herunterladen müssen.
Sie benötigen außerdem ein Ethernet Shield W5100 oder W5500 und einen RS232-zu-TTL-Konverter.

## Unterstützung
Unterstützte Modelle: LD750 soll ...

## Changelog
### 0.0.4
  (instalator) fix error

### 0.0.3
  (instalator) alfa

### 0.0.1
  (instalator) initial