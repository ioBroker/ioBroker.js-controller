---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.botvac/README.md
title: ioBroker.botvac
hash: VfgnY3yRgOnFfABjHM3CpUQmymouMY6j6pOGCVGAr/E=
---
![Logo](../../../en/adapterref/iobroker.botvac/admin/botvac.png)

![Anzahl der Installationen](http://iobroker.live/badges/botvac-stable.svg)

# IoBroker.botvac
## Installation
- Installieren Sie den Adapter
- Geben Sie Ihre Botvac-Benutzerdaten ein
- Ändern Sie bei Bedarf das Abrufintervall (mindestens 60).

## Verwendungszweck
- Verwenden Sie die Zustände im Befehlskanal, um Ihren Botvac zu steuern
- Verwenden Sie die can * -Zustände im Statuskanal, um zu sehen, welche Befehle gültig sind
- Alle Zustände im Statuskanal sind schreibgeschützt

## Beispiele
### Im Eco-Modus reinigen
- Prüfen Sie, ob status.canStart `` `true``` ist
- Setzen Sie command.eco auf `` true```
- Setzen Sie die Befehle.clean auf `` true```

### Reinigen Sie einen 150cm * 150cm-Fleck
- Platzieren Sie den Botvac vor dem gewünschten Ort
- Prüfen Sie, ob status.canStart `` `true``` ist
- setze command.spotHeight und command.spotWidth auf `` 150```
- Setzen Sie command.cleanSpot auf `` true```

### Zur Basis zurückkehren
- status.dockHasBeenSeen muss `` `true``` sein
- Botvac muss sich im angehaltenen oder gestoppten Zustand befinden (Befehls.stopp / Befehls.Pause)
- Setzen Sie command.goToBase auf `` true```

## Changelog
### 0.5.0
- (Pmant) add readme
- (Pmant) change pollInterval to seconds
- (Pmant) change pollInterval min to 60 seconds

### 0.4.0
- (Pmant) reduce update calls (/dashboard)

### 0.3.0
- (Pmant) fix bug where Botvac is not connected to wifi

### 0.2.0
- (Pmant) update status after command
- (Pmant) update commands 

### 0.1.0
- (Pmant) inital commit

## License
The MIT License (MIT)