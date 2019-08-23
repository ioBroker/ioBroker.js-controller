---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tileboard/README.md
title: ioBroker.tileboard
hash: KDDfAmppbMhPsVKDFRcw4XVgwSDkfh3rObW7OlcqqWQ=
---
![Logo](../../../en/adapterref/iobroker.tileboard/admin/tileboard.png)

![Anzahl der Installationen](http://iobroker.live/badges/tileboard-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.tileboard.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tileboard.svg)
![NPM](https://nodei.co/npm/iobroker.tileboard.png?downloads=true)

# IoBroker.tileboard
WEB Visualisierung für die ioBroker Plattform basierend auf [TileBoard für Home Assistant](https://github.com/resoai/TileBoard).
Vielen Dank an [Alexey Ivanov](https://github.com/resoai).

## Installation & Dokumentation
<! - ![Demo-Schnittstelle](images/user0.png) -> <! - ![Demo-Schnittstelle](../../../en/adapterref/iobroker.tileboard/images/user7.png) ->

## Steuerschnittstelle
TileBoard erstellt 3 Variablen:

- control.instance - Hier sollte die Browser-Instanz geschrieben werden oder "*", wenn jeder Browser gesteuert werden muss.
- control.data - Parameter für den Befehl. Siehe spezifische Befehlsbeschreibung.
- control.command - Befehlsname. Schreiben Sie diese Variable, um den Befehl auszulösen. Das heißt, bevor der Befehl geschrieben wird, müssen "Instanz" und "Daten" mit Daten vorbereitet werden.

Befehle:

* alert - Benachrichtigungsfenster in TileBoard anzeigen. "control.data" hat das folgende Format "message; title; jquery-icon". Titel und Abfragesymbol sind optional. Symbolnamen finden Sie [hier] (http://jqueryui.com/themeroller/). Um das Symbol "ui-icon-info" anzuzeigen, schreiben Sie "Message ;; info```".
* changeView - wechselt zur gewünschten Ansicht. "control.data" muss den Index oder den Titel der Ansicht haben, wie in config definiert.
* refresh - TileBoard neu laden, zum Beispiel nachdem das Projekt so geändert wurde, dass es in allen Browsern neu geladen wird.
* reload - wie refresh.
* popup - öffnet ein neues Browserfenster. Der Link muss in "control.data" angegeben werden, z. http://google.com
* playSound - Sounddatei abspielen. Der Link zur Datei ist in "control.data" angegeben, z. http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3.

  Sie können Ihre eigene Datei in TileBoard hochladen und sie beispielsweise als "/tileboard.0/main/img/myFile.mp3" abspielen lassen.

Wenn der Benutzer die Ansicht ändert oder zu Beginn, werden die Variablen von TileBoard mit gefüllt

- "control.instance": Browser-Instanz und ack = true
- "control.data": der Seitentitel wie in config definiert
- "control.command": "changedView" und ack = true

Sie können den JSON-String oder das Objekt in den Befehl control.command als ```{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}``` schreiben. In diesem Fall werden die Instanz und die Daten vom JSON-Objekt übernommen.

### Alarm
Um weitere Einstellungen für Warnungen zu erhalten, können Sie die folgende Struktur senden, um jeden Parameter des Benachrichtigungs-Popups vom Skriptadapter anzupassen.

```
setState('tileboard.0.control.command', JSON.stringify({
    command: "alert",
    instance: "*",
    data: {
        "icon": "mdi-car",        // Material icon
        "type": "info",           // Type: info, warning, error, success
        "title": "Information",   // Header of the message
        "message": "Hello world", // Text of the message
        "lifetime": 5,            // Seconds
    }
}));
```

## Changelog
### 0.2.0 (2019-07-15)
* (bluefox) Changes of the original tileboard were merged

### 0.1.1 (2019-02-12)
* (bluefox) Changes of the original tileboard were merged

### 0.1.0 (2019-01-16)
* (bluefox) initial commit

## License
Copyright (c) 2019 bluefox <dogafox@gmail.com>
 
MIT License