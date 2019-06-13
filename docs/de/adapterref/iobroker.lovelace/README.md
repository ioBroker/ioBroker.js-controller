---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: otY70Vo66QvNd+TNPeQlWUAKCXqWoQWQ0S7TuNOyN7M=
---
![Logo](../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.lovelace.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lovelace.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ioBroker/iobroker.lovelace.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/ioBroker/ioBroker.lovelace/badge.svg)
![NPM](https://nodei.co/npm/iobroker.lovelace.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/ioBroker/ioBroker.lovelace/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/ioBroker/ioBroker.lovelace?branch=master&svg=true)

# IoBroker.lovelace
## Lovelace Adapter für ioBroker
Mit diesem Adapter können Sie eine Visualisierung für ioBroker mit der Home Assistant Lovelace-Benutzeroberfläche erstellen

## Aufbau
Es gibt zwei Möglichkeiten, wie die Entitäten konfiguriert werden können:

- auto
- manuell

### Auto
Im Auto-Modus wird der gleiche Vorgang angewendet wie für `google home` oder `material adapter`.

*** Es werden nur Objekte und Kanäle erkannt, für die `function` und `room` Kategorien definiert sind ***

Sie können Anzeigenamen definieren, die in Entitäten verwendet werden.

### Handbuch
Die Objekte können manuell im Objektbaum wie sql oder histroy definiert werden. Der Entitätstyp und optional der Name des Objekts müssen angegeben werden.
Mit dieser Methode konnten nur einfache Entitäten wie input_number, input_text oder input_boolean erstellt werden. Es darf nicht mehr als einen Zustand oder ein Attribut haben.

## Panels
### Alarmzentrale
ioBroker unterstützt ein solches Gerät noch nicht, kann jedoch simuliert werden. Wenn Sie ein solches Skript erstellen:

```
createState(
    'alarmSimple',
    false,
    false,
    {
        "name": "alarmSimple",
        "role": "alarm",
        "type": "boolean",
        "read": true,
        "write": true,
        "desc": "Arm or disarm with code",
        "def": false,
        "custom": {
            "lovelace.0": {
                "enabled": true,
                "entity": "alarm_control_panel",
                "name": "simulateAlarm" // this is a name how the entity will be called. In this case "alarm_control_panel.simulateAlarm"
            }
        }
    },
    {
        "alarm_code": 1234 // this is a alarm code, that must be entered
    },
    function () {
        // react on changes
        on({id: 'javascript.' + instance + '.alarmSimple', change: 'any'}, function (obj) {
            console.log('Control here the real device: ' + obj.state.val);
        });
    }
);
```

oder du benutzt einfach `lovelace.X.control.alarm (entity_id = alarm_control_panel.defaultAlarm)` dafür.

### Zahleneingabe
Dies kann manuell erfolgen, wenn der Entitätstyp input_number im benutzerdefinierten Dialogfeld ausgewählt ist.
Für diesen Typ wurden die erforderlichen Werte für `min` und `max` in `common` sowie die optionalen Werte für `step` hinzugefügt.
Wenn Sie die Auf- und Abwärtspfeile sehen möchten, sollten Sie in benutzerdefinierten `mode` auf 'Nummer' einstellen:

```
common: {
    custom: {
        "lovelace.0": {
            "enabled": true,
            "entity": "input_number",
            "name": "Shutter" // this is a name how the entity will be called. In this case "alarm_control_panel.simulateAlarm"
            "mode": "number", // default presentation is slider
        }
    }
}
```

### Timer
Der Timer kann mit folgendem Skript simuliert werden:

```
createState(
    'timerSimple',
    false,
    false,
    {
        "name": "timerSimple",
        "role": "level.timer",
        "type": "number",
        "read": true,
        "write": true,
        "unit": "sec",
        "desc": "Start/Stop Timer",
        "def": 0,
        "custom": {
            "lovelace.0": {
                "enabled": true,
                "entity": "timer",
                "name": "simulateTimer" // this is a name how the entity will be called. In this case "timer.simulateTimer"
            }
        }
    },
    {
        "alarm_code": 1234 // this is a alarm code, that must be entered
    },
    function () {
        let interval;
        let id = 'javascript.' + instance + '.timerSimple';
        // react on changes
        on({id, change: 'any'}, function (obj) {
            // If command
            if (!obj.state.ack) {
                // If start or pause timer
                if (obj.state.val) {
                    // If pause (the same value was written)
                    if (obj.state.val === obj.oldState.val) {
                        if (interval) {
                            setState(id, state.val, true);
                            clearInterval(interval);
                            interval = null;
                        } else {
                            interval = setInterval(() => {
                                getState(id, (err, state) => {
                                    state.val--;
                                    if (state.val <= 0) {
                                        clearInterval(interval);
                                        interval = null;
                                        state.val = 0;
                                    }
                                    setState(id, state.val, true);
                                });
                            }, 1000);
                        }
                    } else {
                        interval && clearInterval(interval);
                        // update value every second
                        interval = setInterval(() => {
                            getState(id, (err, state) => {
                                state.val--;
                                if (state.val <= 0) {
                                    clearInterval(interval);
                                    interval = null;
                                    state.val = 0;
                                }
                                setState(id, state.val, true);
                            });
                        }, 1000);
                    }
                } else {
                    // stop interval
                    interval && clearInterval(interval);
                    interval = null;
                }
            }
        });
        // test timer. Disable it later
        setTimeout(() => setState(id, 20));
    }
);
```

### Wetter
Getestet mit Jahr und Daswetter. Für eines oder mehrere der folgenden Objekte müssen `Function=Weather` und `Room=Any` festgelegt sein, um in der Konfiguration verfügbar zu sein:

- daswetter.0.NextDays.Location_1
- yr.0.forecast

### Einkaufsliste
Einkaufsliste schreibt die Werte in Form:

```
[
   {name: 'Task 1', id: 1234222, complete: false},
   {name: 'Task 2', id: 1234223, complete: true}
]
```

in `lovelace.X.control.shopping_list` Zustand.

### Karte
Die Objekte müssen so aussehen:

```
createState('location', '39.5681295;2.6432632', false, {
    "name": "location",
    "role": "value.gps",
    "type": "string",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
```

oder diese zwei Objekte:

```
createState('location.longitude', 2.6432632, false, {
    "name": "location longitude",
    "role": "value.gps.longitude",
    "type": "number",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
createState('location.latitude', 39.5681295, false, {
    "name": "location latitude",
    "role": "value.gps.latitude",
    "type": "number",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
```

### Bildeinheit
Sie können dafür ein statisches Bild oder einen beliebigen Status verwenden, der die URL als Status liefert.
Z.B.:

```
{
  "_id": "daswetter.0.NextDays.Location_1.Day_1.iconURL",
  "type": "state",
  "common": {
    "name": "Weather icon URL",
    "type": "string",
    "role": "weather.icon.forecast.0",
    "read": true,
    "write": false
  },
  "native": {}
}
```

oder setzen Sie den Entitätstyp einfach manuell auf `camera` und schreiben Sie eine URL hinein.

### Werkzeugleiste verstecken
Um die Symbolleiste auszublenden, können Sie das Kontrollkästchen im ioBroker-Konfigurationsdialog auf der Registerkarte Themen aktivieren.
Um es anzuzeigen, können Sie es im Dialog wieder deaktivieren oder einfach die URL mit dem Parameter `?toolbar=true` aufrufen.

## Benutzerdefinierte Karten
### Upload von benutzerdefinierten Karten
Um die benutzerdefinierte Karte hochzuladen, schreiben Sie Folgendes:

```iobroker file write PATH_TO_FILE\bignumber-card.js /lovelace.0/cards/```

Nach dem Neustart des Lovelace Adapters werden alle Dateien aus dem Verzeichnis `cards` automatisch mit einbezogen.

Folgende benutzerdefinierte Karten konnten erfolgreich getestet werden:

- Bignumber-Card: https://github.com/custom-cards/bignumber-card/blob/master/bignumber-card.js
- Simple-Thermostat: https://github.com/nervetattoo/simple-thermostat/releases (nehmen Sie die neueste Version)
- Thermostat: https://github.com/ciotlosm/custom-lovelace/tree/master/thermostat-card (beide Dateien .js und .lib.js sind erforderlich)

Ich fand diesen Link https://github.com/jimz011/homeassistant als interessante Ressource für benutzerdefinierte Karten.

Häufig werden die benutzerdefinierten Karten als Quellen auf github gespeichert und müssen vor der Verwendung kompiliert werden.
Sie sollten das Menü `Releases` auf github überprüfen und versuchen, dort kompilierte Dateien zu finden.
So wie dieser: [https://github.com/kalkih/mini-graph-card/releases](https://github.com/kalkih/mini-graph-card/releases) (Suchen Sie nach der Datei `mini-graph-card-bundle.js`)

## Eigene Bilder
Die benutzerdefinierten Bilder (z. B. für den Hintergrund) können über denselben Konfigurationsdialog wie die benutzerdefinierten Karten geladen werden. Und benutze es so:

`background: center / cover no-repeat url("/cards/background.jpg") fixed`

oder

`background: center / cover no-repeat url("/local/custom_ui/background.jpg") fixed`

in der Lovelace Konfigurationsdatei. Lesen Sie mehr über den Hintergrund in Lovelace [Hier](https://www.home-assistant.io/lovelace/views/#background).

## Themes
Die Themen können im Konfigurationsdialog von ioBroker definiert werden.
Füge etwas ein wie:

```
midnight:
  # Main colors
  primary-color: '#5294E2'                                                        # Header
  accent-color: '#E45E65'                                                         # Accent color
  dark-primary-color: 'var(--accent-color)'                                       # Hyperlinks
  light-primary-color: 'var(--accent-color)'                                      # Horizontal line in about

  # Text colors
  primary-text-color: '#FFFFFF'                                                   # Primary text colour, here is referencing dark-primary-color
  text-primary-color: 'var(--primary-text-color)'                                 # Primary text colour
  secondary-text-color: '#5294E2'                                                 # For secondary titles in more info boxes etc.
  disabled-text-color: '#7F848E'                                                  # Disabled text colour
  label-badge-border-color: 'green'                                               # Label badge border, just a reference value

  # Background colors
  primary-background-color: '#383C45'                                             # Settings background
  secondary-background-color: '#383C45'                                           # Main card UI background
  divider-color: 'rgba(0, 0, 0, .12)'                                             # Divider

  # Table rows
  table-row-background-color: '#353840'                                           # Table row
  table-row-alternative-background-color: '#3E424B'                               # Table row alternative

  # Nav Menu
  paper-listbox-color: 'var(--primary-color)'                                     # Navigation menu selection hoover
  paper-listbox-background-color: '#2E333A'                                       # Navigation menu background
  paper-grey-50: 'var(--primary-text-color)'
  paper-grey-200: '#414A59'                                                       # Navigation menu selection

  # Paper card
  paper-card-header-color: 'var(--accent-color)'                                  # Card header text colour
  paper-card-background-color: '#434954'                                          # Card background colour
  paper-dialog-background-color: '#434954'                                        # Card dialog background colour
  paper-item-icon-color: 'var(--primary-text-color)'                              # Icon color
  paper-item-icon-active-color: '#F9C536'                                         # Icon color active
  paper-item-icon_-_color: 'green'
  paper-item-selected_-_background-color: '#434954'                               # Popup item select
  paper-tabs-selection-bar-color: 'green'

  # Labels
  label-badge-red: 'var(--accent-color)'                                          # References the brand colour label badge border
  label-badge-text-color: 'var(--primary-text-color)'                             # Now same as label badge border but that's a matter of taste
  label-badge-background-color: '#2E333A'                                         # Same, but can also be set to transparent here

  # Switches
  paper-toggle-button-checked-button-color: 'var(--accent-color)'
  paper-toggle-button-checked-bar-color: 'var(--accent-color)'
  paper-toggle-button-checked-ink-color: 'var(--accent-color)'
  paper-toggle-button-unchecked-button-color: 'var(--disabled-text-color)'
  paper-toggle-button-unchecked-bar-color: 'var(--disabled-text-color)'
  paper-toggle-button-unchecked-ink-color: 'var(--disabled-text-color)'

  # Sliders
  paper-slider-knob-color: 'var(--accent-color)'
  paper-slider-knob-start-color: 'var(--accent-color)'
  paper-slider-pin-color: 'var(--accent-color)'
  paper-slider-active-color: 'var(--accent-color)'
  paper-slider-container-color: 'linear-gradient(var(--primary-background-color), var(--secondary-background-color)) no-repeat'
  paper-slider-secondary-color: 'var(--secondary-background-color)'
  paper-slider-disabled-active-color: 'var(--disabled-text-color)'
  paper-slider-disabled-secondary-color: 'var(--disabled-text-color)'

  # Google colors
  google-red-500: '#E45E65'
  google-green-500: '#39E949'
```

entnommen aus [Hier](https://community.home-assistant.io/t/midnight-theme/28598/2).

## Icons
Verwenden Sie Symbole in der Form `mdi:NAME` wie 'mdi: play-network'. Namen können hier entnommen werden: https://materialdesignicons.com/

## Benachrichtigungen
Sie können Benachrichtigungen über die `sendTo`-Funktionalität oder durch Schreiben des Status in `lovelace.X.notifications.add` hinzufügen:

```
sendTo('lovelace.0', 'send', {message: 'Message text', title: 'Title'}); // full version
sendTo('lovelace.0', 'send', 'Message text'); // short version
```

oder

```
setState('lovelace.0.notifications.add', '{"message": "Message text", "title": "Title"}'); // full version
setState('lovelace.0.notifications.add', 'Message text'); // short version
```

## Machen
Die Sicherheit muss vom aktuellen Benutzer und nicht vom Standardbenutzer übernommen werden

## Entwicklung
### So erstellen Sie die neue Lovelace-Version
1. Wechseln Sie in das Verzeichnis ./build.
2. `git clone https:// github.com / home-assistant / home-assistant-polymer.git`
3. `cd home-assistant-polymer`
4. `Git Checkout Master`
5. `npm install`
6. `gulp run build-app`
4. `. / Build / home-assistant-polymer / hass_frontend` in`. / Hass_frontend` in diesem Repo
5. Formatieren Sie index.html
6. Starten Sie die Aufgabe "gulp rename".

## Changelog

### 0.1.1 (2019-06-10)
* (bluefox) Fixed control of states

### 0.1.0 (2019-06-06)
* (bluefox) Authentication could be disabled
* (bluefox) Lovelace compiled extra for ioBroker 

### 0.0.3 (2019-06-02)
* (bluefox) initial release

## License
   
Copyright 2019, bluefox <dogafox@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.