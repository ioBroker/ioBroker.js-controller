---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nanoleaf-lightpanels/README.md
title: ioBroker.nanoleaf-lightpanels Adapter
hash: /gMSjR122XgKD81je0cHoSR6U6NFssNBgMO2sZJDQc0=
---
![Logo](../../../en/adapterref/iobroker.nanoleaf-lightpanels/admin/nanoleaf-lightpanels.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.nanoleaf-lightpanels.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.nanoleaf-lightpanels.svg)
![Build Status Travis](https://travis-ci.org/daniel-2k/ioBroker.nanoleaf-lightpanels.svg?branch=master)
![Build Status Förderer](https://ci.appveyor.com/api/projects/status/29fjgn8ww5w96etq/branch/master?svg=true)
![NPM](https://nodei.co/npm/iobroker.nanoleaf-lightpanels.png?downloads=true)

# IoBroker.nanoleaf-lightpanels Adapter
=================

Dies ist ein ioBroker-Adapter zur Steuerung der Nanoleaf Light Panels (ehemals Nanoleaf Aurora) oder des Nanoleaf Canvas über das Nanoleaf OpenAPI.

## Verbindung zum Nanoleaf Light Panels / Canvas Controller:
1. In den Adaptereinstellungen müssen Sie die IP-Adresse und den Port des Nanoleaf Controllers einstellen. Das Nanoleaf OpenAPI benötigt ein Autorisierungstoken, um Zugriff auf die REST-API zu gewähren. Wenn Sie bereits einen haben, können Sie den Token hier eingeben und den nächsten Schritt überspringen.

   Sie können die Suchgerätefunktion auf der Administrationsseite verwenden, um Ihre Nanoleaf-Geräte zu erkennen.

2. Wenn Sie kein Autorisierungstoken haben, müssen Sie es bei der Nanoleaf OpenAPI anfordern.

Versetzen Sie dazu den Nanoleaf-Controller in den Pairing-Modus, indem Sie den Netzschalter am Gerät 5-7 Sekunden lang gedrückt halten, bis die LEDs abwechselnd blinken.
Klicken Sie dann innerhalb von 30 Sekunden auf die Schaltfläche 'Autorisierungstoken erhalten' (der Pairing-Modus stoppt nach 30 Sekunden). Der Adapter muss laufen! Wenn dies erfolgreich war, sollte das Autorisierungstoken im Feld "Authentifizierungstoken" angezeigt werden. Wenn ein Fehler aufgetreten ist, wird ein Popup mit der Fehlermeldung angezeigt (Details können Sie im Protokoll sehen).

3. Speichern Sie die Einstellungen.
4. Viel Spaß!

Da Light Panels Firmware-Version> 3.1.0 und Canvas-Firmware-Version> 1.1.0 Server Sent Events (SSE) für direkte Statusaktualisierungen verwendet werden können. Für Canvas-Geräte werden Berührungsereignisse unterstützt.
Die Einstellung für das Abfrageintervall für Statusaktualisierungen betrifft nur Geräte mit niedrigeren Firmware-Versionen, bei denen die Abfrage für Statusaktualisierungen verwendet wird.

## Alexa
Sie können die Nanoleaf Light Panels / Canvas mit Alexa über ioBroker (Cloud-Adapter) steuern.
Ein- / Ausschalten, Helligkeit, Farbe und Farbtemperatur werden unterstützt.
Sie müssen die Datenpunkte einrichten

* Zustand (zum Ein- und Ausschalten)
* Farbton (für Farbe)
* Sättigung (für Farbe)
* Helligkeit (für Farbe)
* colorTemp (für Farbtemperatur)

im Cloud-Adapter unter demselben Smartnamen.

## IoBroker Visualisierung
Die Nanoleaf Light Panels / Canvas können in ioBroker Visualization gesteuert werden, indem grundlegende Widgets wie "Radiobuttons on / off" oder Schieberegler zur Steuerung des Leistungszustands, der Helligkeit, des Farbtons, der Sättigung und der Farbtemperatur verwendet werden.

Für Effekte können Sie das Widget "Werteliste auswählen" verwenden, um es als Dropdown-Liste zu verwenden, und dann den Status der Effektliste der Wert- und Texteigenschaft des Widgets zuordnen (Typ: "{nanoleaf-lightpanels.0.LightPanels.effectsList}") -> die geschweiften Klammern sind wichtig!)

Um die Farbe zu steuern und zu visualisieren, müssen Sie die Widgets im Farbauswahlstil installieren. Sie können die RGB-ID dem colorRGB-Status zuordnen oder auch die drei HSV-Status verwenden.

Sie können das Nanoleaf-Vis-Demo-Projekt verwenden, das sich im Unterordner / vis auf github befindet.

## Changelog

### 1.0.2 (2020-07-06)
* (daniel_2k) fixed: detection of ssdp:alive notify message for Canvas (fix disconnect/connect issue)
* (daniel_2k) fixed: sending correct service type for discovery of Canvas devices (fixes no devices found for Canvas devices)
* (daniel_2k) changed: if unknown nanoleaf device is detected Canvas will be used as fallback and warning will be logged
* (daniel_2k) fixed: setting rhythmMode was not working

### 1.0.1 (2020-07-05)
* (daniel_2k) fixed: detection of firmware version for Canvas for enabling SSE (Canvas firmware > 1.1.0 required)

### 1.0.0 (2020-06-18)
* (daniel_2k) new: using server sent events (SSE) for getting updates instead of polling (firmware > 3.1.0 required)
* (daniel_2k) new: support touch events for Canvas
* (daniel_2k) new: searching devices in Admin is now possible
* (daniel_2k) changed: moved duration for brightness state to separate state (please note: duration of in native part of brightness state will no longer work)
* (daniel_2k) changed: some minor internal adjustments
* (daniel_2k) changed: removed Admin2 configuration page

### 0.8.2 (2019-08-02)
* (daniel_2k) fixed: effects with special characters (german umlauts) can now be set (fixes HTTP error code 422)
* (daniel_2k) changed: removed fixed effects *Solid* and *Dynamic* for all devices (works also no longer with Light Panels since firmware update)

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
Copyright (c) 2019 daniel_2k <daniel_2k@outlook.com>