---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.habpanel/README.md
title: ioBroker.habpanel
hash: +hvha07fvSMhMIlRBRNxtzTIxMS5bvD0J/FKiUdUXNA=
---
![Logo](../../../en/adapterref/iobroker.habpanel/admin/habpanel.png)

![Anzahl der Installationen](http://iobroker.live/badges/habpanel-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.habpanel.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.habpanel.svg)
![NPM](https://nodei.co/npm/iobroker.habpanel.png?downloads=true)

# IoBroker.habpanel ===================
HABPanel ist ein leichtes Dashboard-Interface für ioBroker, das auf OpenHAB HABpanel basiert.

Es verfügt insbesondere über einen eingebetteten Dashboard-Designer, der das einfache Erstellen von Schnittstellen direkt auf dem Zielgerät ermöglicht.

## Installation
** Wichtig! ** Dieser Adapter kann nicht direkt von github installiert werden. Nur ab npm.

## Fertig machen
- Wenn Sie zum ersten Mal mit einem neuen Browser oder Gerät auf HABPanel zugreifen, sollte ein leerer Bildschirm angezeigt werden. Folgen Sie der Anleitung und klicken Sie auf das Symbol in der oberen rechten Ecke (oder tippen Sie darauf).
- Sie befinden sich jetzt im Bearbeitungsmodus, es wurde ein Link (_ "Neues Dashboard hinzufügen" _) sowie ein _ "Erweiterte Einstellungen" -Link angezeigt.
- Wenn Sie zuvor HABPanel verwendet und einige Bedienfeldkonfigurationen auf dem Server gespeichert haben, gehen Sie zu _ "Erweiterte Einstellungen" _ und klicken Sie auf Ihre vorherige Konfiguration. Diese wird sofort wieder angezeigt. Oder erstellen Sie Ihr erstes Dashboard: Klicken Sie auf den Link _ "Neues Dashboard hinzufügen" und geben Sie einen Namen.
- Klicken Sie auf die Dashboard-Kachel, um den Dashboard-Editor zu öffnen
- Fügen Sie Ihr erstes Widget hinzu: Wählen Sie das Menü _ "Widget hinzufügen" _ aus und wählen Sie einen Widget-Typ aus (beispielsweise Dummy - ein einfaches Widget, das den Status eines Elements anzeigt).
- Verschieben Sie das Widget per Drag & Drop und ändern Sie die Größe mit dem weißen Chevron. Es wird angezeigt, wenn Sie auf das Widget klicken
- Klicken Sie auf die drei Punkte in der rechten oberen Ecke des Widgets, um das Kontextmenü zu öffnen, und wählen Sie "Bearbeiten".
- Passen Sie einige Einstellungen an (Name, openHAB-Element usw.) und bestätigen Sie Ihre Änderungen
- Speichern Sie Ihre Konfiguration, indem Sie auf die Schaltfläche _Save_ klicken / tippen
- Klicken Sie auf / Ausführen, um Ihr Dashboard in Aktion zu sehen. Verwenden Sie die Zurück-Schaltfläche Ihres Browsers oder den Pfeil, um zum Zeichenbrett zurückzukehren
- Wenn Sie mit Ihrem Dashboard-Set zufrieden sind, kehren Sie zu _ "Erweiterte Einstellungen" _ zurück und klicken / tippen Sie auf _ "Aktuelle Konfiguration in einer neuen Panel-Konfiguration speichern" _; Dadurch wird es wie oben beschrieben auf dem openHAB 2-Server gespeichert und zur Wiederverwendung verfügbar gemacht.

## Screenshots
![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot0.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot1.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot2.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot3.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot4.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot5.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot6.png)

## Changelog

### 0.3.4 (2019-02-04)
* (janfromberlin) button widget did not handle primitive boolean commands
* (matthiasgasser) fix time series query start date, adapted end date

### 0.3.3 (2019-02-02)
* (janfromberlin) fix button toggle functionality for true/false

### 0.3.2 (2019-01-30)
* (foxthefox) chart and timeline functionality fixed

### 0.3.1 (2019-01-27)
* (foxthefox) chart and timeline functionality added

### 0.2.6 (2019-01-14)
* (jogibear9988) bugfix selection element

### 0.2.5 (2019-01-14)
* (jogibear9988) bugfix format strings

### 0.2.4 (2019-01-13)
* (jogibear9988) bugfix template widget

### 0.2.3 (2019-01-11)
* (jogibear9988) upgrade to current openhab version

### 0.1.7 (2017-05-20)
* (bluefox) add to welcome screen

### 0.1.6 (2017-05-15)
* (bluefox) initial commit