---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: VgIhdc1/23xticYs/abzNV4hx3j1Dut103VJuJ/9spo=
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
Mit diesem Adapter können Sie eine Visualisierung für ioBroker mit der Home Assistant Lovelace-Benutzeroberfläche erstellen.

## Aufbau
Es gibt zwei Möglichkeiten, wie die Entitäten konfiguriert werden könnten:

- Auto
- Handbuch

### Auto
Im Auto-Modus wird der gleiche Vorgang wie bei `google home` oder `material adapter` angewendet.

*** Es werden nur Objekte und Kanäle erkannt, für die die Kategorien `function`und `room` definiert sind ***

Sie können Anzeigenamen definieren, die in Entitäten verwendet werden.

### Handbuch
Die Objekte können manuell im Objektbaum wie SQL oder Histroy definiert werden. Der Entitätstyp muss angegeben werden und optional der Name des Objekts.
Mit dieser Methode konnten nur einfache Entitäten wie input_number, input_text oder input_boolean erstellt werden. Es darf nicht mehr als einen Status oder ein Attribut haben.

## Panels
### Alarmzentrale
ioBroker unterstützt ein solches Gerät noch nicht, kann aber simuliert werden. Wenn Sie ein solches Skript erstellen:

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

oder Sie verwenden einfach `lovelace.X.control.alarm (entity_id = alarm_control_panel.defaultAlarm)` dafür.

### Zahleneingabe
Dies kann manuell erfolgen, wenn der Entitätstyp input_number im benutzerdefinierten Dialogfeld ausgewählt ist.
Dieser Typ erforderte `min` und `max` Werte in `common` und optionale `step` könnten hinzugefügt werden.
Wenn Sie die Aufwärts- und Abwärtspfeile sehen möchten, sollten Sie in benutzerdefinierten `mode` auf 'Nummer' setzen:

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

### Eingang auswählen
Dies kann manuell erfolgen, wenn der Entitätstyp input_select im benutzerdefinierten Dialogfeld ausgewählt ist.
Die Liste der Optionen zur Auswahl sollte im Standardobjekt commom.states enthalten sein:

```
"common": {
    "type": "string",
    "states": {
      "1": "select 1",
      "2": "Select 2",
      "3": "select 3"
    },
    "custom": {
      "lovelace.0": {
        "enabled": true,
        "entity": "input_text",
        "name": "test_input_select"
      }
    }
```

Mit anderen Worten, in sollte auch in IoB eingegeben werden.

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
Getestet mit yr und daswetter. Für eines oder mehrere der folgenden Objekte müssen `Function=Weather` und `Room=Any` festgelegt sein, damit sie in der Konfiguration verfügbar sind:

- daswetter.0.NextDays.Location_1
- yr.0.forecast

Getestet mit dem AccuWeather-Treiber v1.1.0 https://github.com/iobroker-community-adapters/ioBroker.accuweather.
Benutzerdefinierte Lovelace-Karte zur Unterstützung der Accuweather-Prognose - https://github.com/algar42/IoB.lovelace.accuweather-card

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
Die Objekte müssen wie folgt aussehen:

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

oder diese beiden Objekte:

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

### Bildentität
Sie können ein statisches Bild dafür verwenden oder einen beliebigen Status verwenden, der eine URL als Status liefert.
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
Um es anzuzeigen, können Sie es im Dialogfeld wieder deaktivieren oder einfach die URL mit dem Parameter `?toolbar=true` aufrufen.

### Abschrift
Sie können Bindungen in Abschriften wie in [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects) verwenden.

Z.B. Text `Admin adapter is {a:system.adapter.admin.0.alive;a === true || a === 'true' ? ' ' : 'not '} *alive*.` erzeugt Text `Admin adapter is alive` im Markdown-Bereich.

## Benutzerdefinierte Karten
### Hochladen von benutzerdefinierten Karten
Um die benutzerdefinierte Karte hochzuladen, schreiben Sie Folgendes:

```iobroker file write PATH_TO_FILE\bignumber-card.js /lovelace.0/cards/```

Nach dem Neustart des Lovelace-Adapters werden automatisch alle Dateien aus dem Verzeichnis `cards` aufgenommen.

Folgende benutzerdefinierte Karten konnten erfolgreich getestet werden:

- bignumber-card: https://github.com/custom-cards/bignumber-card/blob/master/bignumber-card.js
- einfacher Thermostat: https://github.com/nervetattoo/simple-thermostat/releases (nehmen Sie die neueste Version)
- Thermostat: https://github.com/ciotlosm/custom-lovelace/tree/master/thermostat-card (beide Dateien .js und .lib.js sind erforderlich)

Ich fand diesen Link https://github.com/jimz011/homeassistant als interessante Ressource für benutzerdefinierte Karten.

Oft werden die benutzerdefinierten Karten als Quellen auf Github gespeichert und müssen vor der Verwendung kompiliert werden.
Sie sollten das Menü `Releases` auf github überprüfen und versuchen, dort kompilierte Dateien zu finden.
Wie dieser: [https://github.com/kalkih/mini-graph-card/releases](https://github.com/kalkih/mini-graph-card/releases) (Suchen Sie nach der Datei `mini-graph-card-bundle.js`)

## Eigene Bilder
Die benutzerdefinierten Bilder (z. B. für den Hintergrund) können über denselben Konfigurationsdialog wie die benutzerdefinierten Karten geladen werden. Und benutze es so:

`background: center / cover no-repeat url("/cards/background.jpg") fixed`

oder

`background: center / cover no-repeat url("/local/custom_ui/background.jpg") fixed`

in der Lovelace-Konfigurationsdatei. Lesen Sie mehr über den Hintergrund in Lovvelace [Hier](https://www.home-assistant.io/lovelace/views/#background).

## Themen
Die Themen können im Konfigurationsdialog von ioBroker definiert werden.
Fügen Sie etwas ein wie:

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

## Symbole
Verwenden Sie Symbole in Form von `mdi:NAME` wie 'mdi: play-network'. Namen können hier abgerufen werden: https://materialdesignicons.com/

## Benachrichtigungen
Sie können Benachrichtigungen über die Funktion `sendTo` oder durch Schreiben des Status in `lovelace.X.notifications.add` hinzufügen:

```
sendTo('lovelace.0', 'send', {message: 'Message text', title: 'Title'}); // full version
sendTo('lovelace.0', 'send', 'Message text'); // short version
```

oder

```
setState('lovelace.0.notifications.add', '{"message": "Message text", "title": "Title"}'); // full version
setState('lovelace.0.notifications.add', 'Message text'); // short version
```

## Stimmenkontrolle
Alle Befehle von der Weboberfläche werden mit `ack=false` in den Status lovelace.X.conversation geschrieben.
Sie können ein Skript schreiben, das auf Anfrage reagiert und antwortet:

```
on({id: 'lovelace.0.conversation', ack: false, change: 'any'}, obj => {
   console.log('Question: ' + obj.state.val);
   if (obj.state.val.includes('time')) {
      setState('lovelace.0.conversation', new Date().toString(), true); // true is important. It will say, that this is answer.
   } else {
      setState('lovelace.0.conversation', 'Sorry I don\'t know, what do you want', true); // true is important. It will say, that this is answer.
   }
});
```

## Originalquellen für Liebesspiel
Verwendete Quellen finden Sie hier https://github.com/GermanBluefox/home-assistant-polymer.

## Machen
Die Sicherheit muss vom aktuellen Benutzer und nicht vom Standardbenutzer übernommen werden

## Entwicklung
### Ausführung
Verwendete Version von home-assistant-frontend@1.0.0

### Wie erstelle ich die neue Lovelace-Version?
Zunächst muss der eigentliche https://github.com/home-assistant/home-assistant-polymer (Entwicklungszweig) **manuell** in https://github.com/GermanBluefox/home-assistant-polymer zusammengeführt werden .git (*** iob *** branch!).

Alle Änderungen für ioBroker sind mit dem Kommentar `// IoB` gekennzeichnet.
Vorerst (2020.01.12) wurden folgende Dateien geändert:

- `.gitignore` -` .idea` ignorieren hinzugefügt
- `build-scripts / gulp / app.js` - Neue gulp-Aufgabe hinzugefügt
- `build-scripts / gulp / webpack.js` - Neue gulp-Aufgabe hinzugefügt
- `src / data / lovelace.ts` - Option zum Ausblenden der Leiste hinzugefügt
- `src / dialogs / notifications / notification-drawer.js` - Schaltfläche ack all hinzugefügt
- `src / entrypoints / core.ts` - geänderter Authentifizierungsprozess
- `src / layouts / home-Assistant-main.ts` - App-Seitenleiste entfernen
- `src / panel / lovelace / hui-root.ts` - Benachrichtigungen und Sprachsteuerung hinzugefügt

Nach dem Auschecken geänderte Version im Ordner `./build`. Dann.

1. Gehen Sie zum Verzeichnis ./build.
2. `git clone https:// github.com / GermanBluefox / home-Assistant-polymer.git` es ist eine Gabelung von https://github.com/home-assistant/home-assistant-polymer.git, aber einige Dinge geändert werden (siehe Dateiliste weiter oben).
3. "CD Home-Assistant-Polymer"
4. `git checkout master`
5. `npm install`
6. `gulp build-app` für die Veröffentlichung oder` gulp Develop-iob` für die Debug-Version. Um das Web nach Änderungen zu erstellen, können Sie "webpack-dev-app" für eine schnellere Erstellung aufrufen. Sie müssen jedoch "build-app" aufrufen, nachdem die Version einsatzbereit ist.
7. Kopieren Sie alle Dateien von `. / Build / home-Assistant-Polymer / hass_frontend` in`. / Hass_frontend` in diesem Repo
8. Starten Sie die Aufgabe "Schlucken umbenennen".

## Changelog
### 1.0.10 (2020-02-13)
* (Garfonso) Fixed handling of malformed / null RGB string
* (algar42)  Binary sensor added
* (Garfonso) fixed manual dimmer 
* (algar42)  fixed for duplicated states via websockets
* (Garfonso) fixed handling of deleted objects 

### 1.0.9 (2020-01-29)
* (bluefox) Dimmer control was fixed

### 1.0.8 (2020-01-13)
* (Garfonso) process max value of saturation and hue
* (Garfonso) disable extensive debug logging
* (Garfonso) many changes done concerning detection of devices and processing of states
* (bluefox) Update hass lovelace

### 1.0.7 (2019-12-17)
* (bluefox) Invalid objects will be filtered out.

### 1.0.6 (2019-12-06)
* (bluefox) Fixed disconnection behavior

### 1.0.5 (2019-11-27)
* (algar42) getting back broken update of internal_entities

### 1.0.4 (2019-11-25)
* (bluefox) Implemented bindings ala vis in markdown
* (bluefox) protect access to states

### 0.2.5 (2019-11-18)
* (algar42) Dimmer light is now switched on with the previous brightness level and not 100%
* (algar42) Added ability to correctly control light brightness from Card and from more_info dialog as well
* (algar42) input_boolean processing correct and initial value added to entity
* (algar42) input_select processing added
* (algar42) Entities object updates with new states added (resolved issue #46 showing old values on page refresh)
* (algar42) Switch entity updated to show two state buttons in GUI (assumed_state attribute set to true)
* (algar42) Russian translation updated
* (algar42) Language support added. Lovelace runs with IoB System Language

### 0.2.4 (2019-11-05)
* (ldittmar) Fixed translations

### 0.2.3 (2019-10-22)
* (bluefox) The custom settings were corrected

### 0.2.1 (2019-10-15)
* (bluefox) Processing of empty states was corrected

### 0.2.0 (2019-09-19)
* (Scrounger) Some bugs on "Custom Dialog" were fixed
* (Scrounger) bug fix: if value set by lovelace and max is not 100
* (Scrounger) log warn if no max value set for light entity
* (bluefox) Version of home-assistant-polymer was updated to 1.0.0

### 0.1.5 (2019-08-26)
* (bluefox) fixed timestamp conversion

### 0.1.3 (2019-07-18)
* (SchumyHao) If no ACTUAL is discovered, use SET value as switch entity value

### 0.1.2 (2019-07-14)
* (SchumyHao) Translate Chinese words to pinyin

### 0.1.1 (2019-06-10)
* (bluefox) Fixed control of states

### 0.1.0 (2019-06-06)
* (bluefox) Authentication could be disabled
* (bluefox) Lovelace compiled extra for ioBroker

### 0.0.3 (2019-06-02)
* (bluefox) initial release

## License

Copyright 2019-2020, bluefox <dogafox@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.