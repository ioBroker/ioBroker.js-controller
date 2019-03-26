---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.kecontact/README.md
title: ioBroker-Adapter für KEBA KeContact Wallbox
hash: KqCnXeT45sZPgAY9INjY2pZ5QG76wcl5EA5ClvlbrcE=
---
![Adapter-Logo](../../../en/adapterref/iobroker.kecontact/admin/charger.png)

![Anzahl der Installationen](http://iobroker.live/badges/kecontact-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.kecontact.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.kecontact.svg)
![Travis](https://img.shields.io/travis/UncleSamSwiss/ioBroker.kecontact.svg)
![AppVeyor Build Status](https://img.shields.io/appveyor/ci/UncleSamSwiss/iobroker-kecontact-fxdvr.svg)
![GitHub Probleme](https://img.shields.io/github/issues/UncleSamSwiss/ioBroker.kecontact.svg)

# IoBroker-Adapter für KEBA KeContact Wallbox
Stellt Informationen zum aktuellen Status einer KEBA KeContact-Wallbox mithilfe des UDP-Protokolls bereit.

## Installieren
Installieren Sie diesen Adapter über ioBroker Admin:

1. Öffnen Sie den Instanzkonfigurationsdialog
2. Geben Sie die IP-Adresse Ihrer KEBA KeContact Wallbox ein
3. Passen Sie ggf. das Aktualisierungsintervall an
4. Speichern Sie die Konfiguration
5. Starten Sie den Adapter

## Aufbau
### KeContact IP-Adresse
Dies ist die IP-Adresse Ihrer KEBA KeContact Wallbox.

### Aktualisierungsintervall
Dies ist das Intervall in Sekunden, wie oft die Wallbox nach neuen Werten abgefragt werden soll.

Der Standardwert ist 30 Sekunden. Dies ist ein guter Ausgleich zwischen der Belastung des KeConnect und der Aktualisierung der aktuellen Informationen im ioBroker.

## Legal
Dieses Projekt ist weder direkt noch indirekt mit der Firma KEBA AG verbunden.

KeConnect ist eine eingetragene Marke der KEBA AG.

## Changelog
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