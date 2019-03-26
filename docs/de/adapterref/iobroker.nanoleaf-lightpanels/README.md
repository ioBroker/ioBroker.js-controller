---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nanoleaf-lightpanels/README.md
title: Adapter für ioBroker.nanoleaf-lightpanels
hash: neG9EXUZ60IWcgHatKc7HaIJoNcD1rvTGCM08MD/y2I=
---
![Logo](../../../en/adapterref/iobroker.nanoleaf-lightpanels/admin/nanoleaf-lightpanels.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.nanoleaf-lightpanels.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.nanoleaf-lightpanels.svg)
![Build Status Travis](https://travis-ci.org/daniel-2k/ioBroker.nanoleaf-lightpanels.svg?branch=master)
![Build Status Appveyor](https://ci.appveyor.com/api/projects/status/29fjgn8ww5w96etq/branch/master?svg=true)
![NPM](https://nodei.co/npm/iobroker.nanoleaf-lightpanels.png?downloads=true)

# IoBroker.nanoleaf-lightpanels Adapter ===================
Dies ist ein ioBroker-Adapter zur Steuerung der Nanoleaf Light Panels (ehemals Nanoleaf Aurora) oder Nanoleaf Canvas durch die Nanoleaf OpenAPI.

## Anschluss an die Nanoleaf Light Panels / Canvas Controller:
1. In den Adaptereinstellungen müssen Sie die IP-Adresse und den Port des nanoleaf Controllers einstellen. Die nanoleaf-OpenAPI benötigt ein Autorisierungstoken, um Zugriff auf die REST-API zu gewähren. Wenn Sie bereits einen haben, können Sie den Token hier eingeben und den nächsten Schritt überspringen.
2. Wenn Sie kein Berechtigungstoken haben, müssen Sie es von der nanoleaf OpenAPI anfordern.

Um dies zu tun, versetzen Sie den nanoleaf Controller in den Pairing-Modus, indem Sie den Netzschalter am Gerät 5-7 Sekunden lang gedrückt halten, bis die LEDs abwechselnd blinken.
Klicken Sie dann innerhalb von 30 Sekunden auf die Schaltfläche 'Authorization Token anfordern' (der Pairing-Modus wird nach 30 Sekunden beendet). Der Adapter muss laufen! Wenn dies erfolgreich war, sollte das Autorisierungstoken im Feld 'Authentifizierungstoken' angezeigt werden. Wenn ein Fehler aufgetreten ist, wird ein Popup mit der Fehlermeldung angezeigt (Details, die Sie im Protokoll sehen können).

3. Speichern Sie die Einstellungen.
4. viel spaß

Da die OpenAPI von nanoleaf keine langen Abfragen oder Websockets unterstützt, können Abfragen nur durch Aktualisieren der Status aktualisiert werden.
Sie können das Abrufintervall in den Adaptereinstellungen festlegen.

## Alexa
Sie können die nanoleaf Light Panels / Canvas mit Alexa über ioBroker (Cloud-Adapter) steuern.
Ein / Aus, Helligkeit, Farbe und Farbtemperatur werden unterstützt.
Sie müssen die Datenpunkte einrichten

* Zustand (zum Ein- und Ausschalten)
* Farbton (für Farbe)
* Sättigung (für Farbe)
* Helligkeit (für Farbe)
* colorTemp (für Farbtemperatur)

im Cloud-Adapter unter demselben Smartnamen.

## IoBroker-Visualisierung
Die nanoleaf Light Panels / Canvas können in der ioBroker-Visualisierung gesteuert werden, indem grundlegende Widgets wie "Radiobuttons ein / aus" oder Schieberegler zum Steuern des Leistungszustands, der Helligkeit, des Farbtons, der Sättigung und der Farbtemperatur verwendet werden.

Für Effekte können Sie das Widget "Select ValueList" verwenden, um es als Dropdown-Liste zu verwenden, und dann den Status von effectsList der Eigenschaft value und text des Widgets zuordnen (Typ: "{nanoleaf-lightpanels.0.LightPanels.effectsList}". -> die geschweiften Klammern sind wichtig!)

Um die Farbe zu steuern und zu visualisieren, müssen Sie die Widgets im Farbauswahlstil installieren. Sie können die RGB-ID dem colorRGB-Status zuordnen oder auch die drei HSV-Status verwenden.

Sie können das Demo-Projekt nanoleaf vis verwenden, das sich im Unterordner / vis von github befindet.

## Changelog

### 0.8.1 (2019-01-31)
* (daniel_2k) new: rhythm module mode (microphone/AUX input) can be changed
* (daniel_2k) changed: removed fixed effects *Solid* and *Dynamic* for Canvas because not supported
* (daniel_2k) fixed: Rhythm module information depending of connect state

### 0.8.0 (2019-01-27)
* (daniel_2k) changed: adapter has own nanoleaf-api lib (no dependency), because the nanoleaf-aurora-client module does not implement the nanoleaf API correctly (will be changed until this is fixed in the module)
* (daniel_2k) fixed: should now work properly with Canvas
* (daniel_2k) new: duration for brightness changes added (can be set in native part of brightness state)
* (daniel_2k) new: added compact mode
* (daniel_2k) changed: handling of device states
* (daniel_2k) fixed: command queue will not process when states are written which cannot be processed
* (daniel_2k) changed: some small code adjustments

### 0.7.0 (2019-01-20)
* (daniel_2k) new: compatible with nanoleaf Canvas
* (daniel_2k) changed: Rhythm module information is now obtained depended if it is connected or not (only Light Panels)
* (daniel_2k) changed: some small adjustments

### 0.6.1 (2018-10-13)
* (daniel_2k) fixed: command processing stopping when invalid RGB value is written to 'colorRGB'
* (daniel_2k) changed: more error logging of invalid values send to controller
* (daniel_2k) changed: adjusted types and roles

### 0.6.0 (2018-09-02)
* (daniel_2k) changed: processing commands in sequence (FIFO) ensuring that all commands are executed and avoiding hanging of the nanoleaf-controller sometimes

### 0.5.0 (2018-08-10)
* (daniel_2k) changed: automatically reconnect attemps will be done in any case of connection failures (fixes no reconnect when device hung and was restarted)
* (daniel_2k) new: default minimum values for polling intervals in adapter
* (daniel_2k) new: static effects 'Solid' and 'Dynamic' added to effect states
* (daniel_2k) changed: save settings in admin is only possible when all fields filled
* (daniel_2k) changed: optimized debug logging

### 0.4.1 (2018-07-13)
* (daniel_2k) added automatic testing via Travis and Appveyor
* (daniel_2k) preparations for official repository

### 0.4.0 (2018-06-11)
* (daniel_2k) changed: Authorization token will be obtained now in the adapter settings (not on adapter start)
* (daniel_2k) fixed: some texts in the old adapter settings (Admin2)
* (daniel_2k) new: State 'effect' now contains all possible states (auto updated)
* (daniel_2k) changed: updated AuroraAPI version to 1.2.2

### 0.3.0 (2018-05-12)
* (daniel_2k) new: state "ColorRGB" for controlling color with hex RGB values
* (daniel_2k) changed: updating states from API only when value changed
* (daniel_2k) changed: state effectsList will now be written as a semicolon seperated list to use it with "Select ValueList" widget in ioBroker visualization
* (daniel_2k) new: debug logging
* (daniel_2k) changed: set units for states "saturation" and "hue"

### 0.2.0 (2018-05-03)
* (daniel_2k) adjusted types and roles of states according API JSON response data types
* (daniel_2k) compatible with node.js 4.x

### 0.1.0 (2018-04-23)
* (daniel_2k) initial release

## License
The MIT License (MIT)