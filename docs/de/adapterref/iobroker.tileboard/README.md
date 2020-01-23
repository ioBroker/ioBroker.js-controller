---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tileboard/README.md
title: ioBroker.tileboard
hash: VWBJDpsB6tMzUlHb7q3XKs2qslIhBqzHjlBBGpwuP/k=
---
![Logo](../../../en/adapterref/iobroker.tileboard/admin/tileboard.png)

![Anzahl der Installationen](http://iobroker.live/badges/tileboard-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.tileboard.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tileboard.svg)
![NPM](https://nodei.co/npm/iobroker.tileboard.png?downloads=true)

# IoBroker.tileboard
WEB Visualisierung für die ioBroker Plattform basierend auf [TileBoard für Home Assistant](https://github.com/resoai/TileBoard).
Herzlichen Dank an [Alexey Ivanov](https://github.com/resoai).

## Installation & Dokumentation
<! - ![Demo-Schnittstelle](images/user0.png) -> <! - ![Demo-Schnittstelle](../../../en/adapterref/iobroker.tileboard/images/user7.png) ->

## Steuerschnittstelle
TileBoard erstellt 3 Variablen:

- control.instance - Hier sollte die Browser-Instanz geschrieben werden oder "*", wenn jeder Browser gesteuert werden muss.
- control.data - Parameter für den Befehl. Siehe spezifische Befehlsbeschreibung.
- control.command - Befehlsname. Schreiben Sie diese Variable, um den Befehl auszulösen. Das heißt, bevor der Befehl geschrieben wird, müssen "Instanz" und "Daten" mit Daten vorbereitet werden.

Befehle:

* alert - Benachrichtigungsfenster in TileBoard anzeigen. "control.data" hat folgendes Format "message; title; jquery-icon". Titel und Abfragesymbol sind optional. Symbolnamen finden Sie [hier] (http://jqueryui.com/themeroller/). Um das Symbol "ui-icon-info" anzuzeigen, schreiben Sie "` `Message ;; info```".
* changeView - wechselt zur gewünschten Ansicht. "control.data" muss den Index oder den Titel der Ansicht haben, wie in config definiert.
* refresh - TileBoard neu laden, zum Beispiel nachdem das Projekt so geändert wurde, dass es in allen Browsern neu geladen wird.
* reload - wie refresh.
* popup - öffnet ein neues Browserfenster. Der Link muss in "control.data" angegeben werden, z. http://google.com
* playSound - Sounddatei abspielen. Der Link zur Datei ist in "control.data" angegeben, z. http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3.

  Sie können Ihre eigene Datei in TileBoard hochladen und sie beispielsweise als "/tileboard.0/main/img/myFile.mp3" abspielen lassen.

Wenn der Benutzer die Ansicht ändert oder zu Beginn, werden die Variablen von TileBoard mit gefüllt

- "control.instance": Browser-Instanz und ack = true
- "control.data": der in config definierte Seitentitel
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

## Für Entwickler
So fügen Sie das ursprüngliche Repository in dieses ein:

Folgende Dateien wurden geändert:

- `/ index.html` -` ../ tileboard.0 / custom.css`, `../../ lib / js / socket.io.js`,` ./_ socket / info.js` und hinzugefügt `scripts / vendors / conn.js`,` styles / custom.css` entfernt
- `/ scripts / models / api.js` - komplett ersetzt
- `/ scripts / controller / main.js` -

Erweiterte Funktion `getItemEntity`:

```
   $scope.getItemEntity = function (item) {
      if(typeof item.id === "object") return item.id;

      if(!(item.id in $scope.states)) { // IoB
          if (typeof Api.getState === 'function') {
              Api.getState(item.id);
          } else {
              warnUnknownItem(item);
          }
          return null;
      }

      return $scope.states[item.id];
   };
```

Funktion `setNewStates` hinzugefügt:

```
    // IoB - required for lazy load of the states, becasue every update of the single state cause the request of all states again.
    // To avoid that all states must be updated at once and only then updateView should be called.
    function setNewStates (states) {
        states.forEach(function (state) {
            if(!$scope.states[state.entity_id]) $scope.states[state.entity_id] = state.new_state;

            // Is it required? If $scope.states[key] just assigned?
            for(var k in state.new_state) $scope.states[state.entity_id][k] = state.new_state[k];
        });
    }
```

Geänderte Funktion:

```
   function handleEvent (event) {
      try {
         if (event.event_type === "state_changed") {
            debugLog('state change', event.data.entity_id, event.data.new_state);

            if (event.data instanceof Array) { // IoB
                setNewStates(event.data);
                event.data.forEach(function (state) {
                    checkStatesTriggers(state.entity_id, state.new_state);
                });
            } else {
                setNewState(event.data.entity_id, event.data.new_state);
                checkStatesTriggers(event.data.entity_id, event.data.new_state);
            }
         }
         else if (event.event_type === "tileboard") {
            debugLog('tileboard', event.data);

            triggerEvents(event.data);
         }
      }
      catch (e) {console.error(e);}
      updateView();
   }
```

Am Ende:

```   if(CONFIG.pingConnection !== false) {```

=>

```
   if (CONFIG.pingConnection) { // Changed for IoB
```

- `/styles/main.less (css)`

Hinzugefügt:

```
@media screen and (max-height: 770px) { // IoB
  .header {
    display: none;
  }
}
```

## Changelog
### 0.3.0 (2020-01-23)
* (yaming116) fixed pingConnection
* (bluefox) Changes of the original tileboard were merged

### 0.2.0 (2019-07-15)
* (bluefox) Changes of the original tileboard were merged

### 0.1.1 (2019-02-12)
* (bluefox) Changes of the original tileboard were merged

### 0.1.0 (2019-01-16)
* (bluefox) initial commit

## License
Copyright (c) 2019-2020 bluefox <dogafox@gmail.com>
 
MIT License