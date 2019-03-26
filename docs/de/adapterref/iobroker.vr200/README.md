---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vr200/README.md
title: ioBroker.vr200
hash: o0F4IRoVxRDtI08RdgicrLLzwC7SnYFwzWHJXr/xiAw=
---
![Logo](../../../en/adapterref/iobroker.vr200/admin/VR200.png)

![Anzahl der Installationen](http://iobroker.live/badges/vr200-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vr200.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vr200.svg)
![Travis-CI](https://travis-ci.org/Eisbaeeer/ioBroker.vr200.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.vr200.png?downloads=true)

# IoBroker.vr200
Dies ist eine vollständige Gabel des Botvac-Adapters. Der einzige Unterschied besteht darin, das entsprechende Knoten-Kobold-Modul von nicoh88 zu verwenden.
Ich bin nicht der Autor des Adapters. Ich habe nur ein paar Dinge geändert, damit der VR200 als Adapter läuft.
Der volle Respekt gilt Pmant und nicoh88.

## Installation
- Installieren Sie den Adapter
- Geben Sie Ihre Vorwerk-Benutzerdaten ein
- Ändern Sie bei Bedarf das Abrufintervall (mindestens 60).

## Verwendungszweck
- Verwenden Sie die Zustände im Befehlskanal, um Ihren VR200 zu steuern
- Verwenden Sie die can * -Zustände im Statuskanal, um festzustellen, welche Befehle gültig sind
- Alle Zustände im Statuskanal sind schreibgeschützt

## Beispiele
### Im Eco-Modus reinigen
- Prüfen Sie, ob status.canStart `` `true``` ist
- Setzen Sie command.eco auf `` true```
- Setzen Sie die Befehle.clean auf `` true```

### Reinigen Sie einen 150cm * 150cm-Fleck
- Platzieren Sie den VR200 vor dem gewünschten Ort
- Prüfen Sie, ob status.canStart `` `true``` ist
- setze command.spotHeight und command.spotWidth auf `` 150```
- Setzen Sie command.cleanSpot auf `` true```

### Zur Basis zurückkehren
- status.dockHasBeenSeen muss `` `true``` sein
- VR200 muss sich im angehaltenen oder gestoppten Zustand befinden (Befehls.Stopp / Befehls.Pause)
- Setzen Sie command.goToBase auf `` true```

## Changelog

### 0.1.0
- (Eisbaeeer) inital commit from Pmant�s adapter
### 0.2.0
- (Eisbaeeer) added Travis testing - no changes in code
### 0.3.0
- (Eisbaeeer) fixed issue #1 (status reachable)
### 1.0.0
- no changes. Went to stable release.

## License
The MIT License (MIT)