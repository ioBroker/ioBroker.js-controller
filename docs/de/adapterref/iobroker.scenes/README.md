---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.scenes/README.md
title: ioBroker-Szenenadapter
hash: dy3j69BC0SGdZMOc6aZJ0WtlL7xCC25Cn972P9cAxEs=
---
![Logo](../../../en/adapterref/iobroker.scenes/admin/scenes.png)

![Anzahl der Installationen](http://iobroker.live/badges/scenes-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.scenes.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.scenes.svg)
![NPM](https://nodei.co/npm/iobroker.scenes.png?downloads=true)

# IoBroker-Szenenadapter ==================
_scenes Adapter_ kann Szenen erstellen und in der ioBroker-Umgebung ausführen.

Dieser Adapter kann drei Arten von Szenen erstellen:

- **szenen**
- **Gruppen**
- **virtuelle Gruppen**

## Szenen
** Szenen ** werden erstellt, wenn die Einstellung "False setzen" nicht verwendet wird.
Jede Szene kann individuell konfiguriert werden, so dass Sie ** Szenen ** und ** Gruppen ** in einer einzigen Instanz des Adapters haben können.
Die ** Szene ** ist nur eine Liste von Status-IDs und Werten, die diese Status durch Aktivierung der Szene haben müssen. Z.B. Wir haben in Szene "_scene.allLightInBath_" erstellt:

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  +- hm-rpc.0.TOP_LIGHT.STATE     - true
```

Um die Szene zu aktivieren, müssen Sie "_scene.allLightInBath_" auf "true" setzen (z. B. über Skript oder vis). Dann werden beide Zustände auf die gewünschten Werte gesetzt und auf **true** gesetzt.
Der Wert von _scene.allLightInBath_ ist ebenfalls **true** Wenn wir das obere Licht manuell ausschalten, geht der Wert von _scene.allLightInBath_ auf **false** Und wieder auf **true** wenn wir das Licht manuell einschalten.

Fügen wir der Szene ** den Fan hinzu:

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  |- hm-rpc.0.TOP_LIGHT.STATE     - true
  |- hm-rpc.0.FAN.STATE          - true
  |- hm-rpc.0.FAN.STATE          - false (delay 60000ms)
```

In diesem Fall wird der Lüfter durch Aktivieren der **Szene** eingeschaltet und in einer Minute ausgeschaltet.
Nach dem Abschalten des Lüfters geht der Wert von _scene.allLightInBath_ auf **false** da nicht alle Zustände den gewünschten Werten entsprechen.
Staaten mit Verspätung nehmen nicht an Berechnungen teil.

Sie können die Szene mit einer "Play" -Taste testen.
Zusätzlich können Sie diese **Szene** direkt mit einer anderen Szenen-ID verknüpfen. Wenn Sie beispielsweise einen Sensor an der Tür haben, können Sie ihn als Auslöser auswählen:

```
  trigger
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     true
```

Und jedes Mal, wenn Sie die Tür in der Badewanne öffnen, werden alle Lichter mit Lüfter eingeschaltet.

## Gruppen
** Gruppen ** sind wie virtuelle Kanäle. Sie können mit Hilfe von ** Gruppen ** virtuelle Geräte aus mehreren Aktuatoren erstellen und diese wie ein Gerät gemeinsam steuern.
Lassen Sie uns unsere Probe mit Badleuchten modifizieren.

```
  scene.allLightInBath             "set on true"    "set on false"
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true             false
  +- hm-rpc.0.TOP_LIGHT.STATE     - true             false
```

Wenn Sie diese **Gruppe** mit dem Türsensor verbinden, wie folgt:

```
  trigger on true
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     true

  trigger on false
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     false
```

Jedes Mal, wenn Sie die Tür öffnen, werden alle Lichter in einer Badewanne eingeschaltet. Der Wert von _scene.allLightInBath_ geht auf **true** Wenn Sie die Tür schließen, wird das Licht ausgeschaltet. Der Wert von _scene.allLightInBath_ wird auf **false** gesetzt.

Es ist nutzlos, aber es ist gut als Beispiel.

Wenn Sie ein Licht manuell einschalten, wird der Wert von _scene.allLightInBath_ auf **unsicher** gesetzt.

Verzögerungen können auch in der **Gruppe** verwendet werden, die Zustände mit Verzögerung sind jedoch nicht an den Berechnungen des aktuellen Werts von **Gruppe** beteiligt.

## Virtuelle Gruppen
** Virtuelle Gruppen ** sind wie virtuelle Kanäle und Gruppen, sie können jedoch beliebige Werte haben: Zahlen, Zeichenfolgen usw.
Sie können eine virtuelle Gruppe erstellen, um alle Fensterläden im Wohnzimmer zu steuern. Wenn Sie 40% in eine virtuelle Gruppe schreiben, werden alle Fensterläden auf 40% gesetzt.

## Installieren
```iobroker add scenes```

## Changelog
### 1.1.0 (2018-04-24)
* (bluefox) Works now with Admin3

### 1.0.2 (2018-01-21)
* (bluefox) use new select ID dialog
* (DeepCoreSystem) translations
* (paul53) text fixes

### 1.0.0 (2017-11-11)
* (bluefox) fix false scenes

### 0.2.7 (2017-08-14)
* (bluefox) Support of iobroker.pro

### 0.2.6 (2016-06-21)
* (bluefox) add read/write settings to scene object

### 0.2.5 (2016-02-03)
* (bluefox) update node-schedule

### 0.2.4 (2016-01-24)
* (bluefox) fix error disabled states in scene

### 0.2.3 (2015-12-10)
* (bluefox) fix error with trigger on false

### 0.2.2 (2015-11-22)
* (bluefox) fix error with restart adapter

### 0.2.1 (2015-10-27)
* (bluefox) delete triggers if virtual groups enabled

### 0.2.0 (2015-10-27)
* (bluefox) support of virtual groups

### 0.1.3 (2015-09-19)
* (bluefox) show set value if 0 or false in settings

### 0.1.2 (2015-08-15)
* (bluefox) add translations
* (bluefox) try to fix error by renaming

### 0.1.1 (2015-08-10)
* (bluefox) allow description for states in scene
* (bluefox) check by rename if the scene with the same name yet exists
* (bluefox) allow copy scene
* (bluefox) fix error with delay and stopAllDelays settings

### 0.1.0 (2015-08-09)
* (bluefox) fix error with delays and config change
* (bluefox) implement replace 

### 0.0.2 (2015-08-05)
* (bluefox) change configuration schema
* (bluefox) add cron
* (bluefox) add burst interval

### 0.0.1 (2015-07-29)
* (bluefox) initial commit