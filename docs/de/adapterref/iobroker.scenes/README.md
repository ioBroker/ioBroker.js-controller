---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.scenes/README.md
title: ioBroker Szenenadapter
hash: G1E4YTsd0Q1l6+A7mv99P5sg5zK8+foyWJ0BN3JhoI4=
---
![Logo](../../../en/adapterref/iobroker.scenes/admin/scenes.png)

![Anzahl der Installationen](http://iobroker.live/badges/scenes-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.scenes.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.scenes.svg)
![NPM](https://nodei.co/npm/iobroker.scenes.png?downloads=true)

# IoBroker Szenenadapter
_scenes Adapter_ kann Szenen erstellen und in der ioBroker-Umgebung ausführen.

Dieser Adapter kann drei Arten von Szenen erstellen:

- **Szenen**
- **Gruppen**
- **virtuelle Gruppen**

## Szenen
** Szenen ** werden erstellt, wenn die Einstellung "auf falsch gesetzt" nicht verwendet wird.
Jede Szene kann einzeln konfiguriert werden, sodass Sie in einer Instanz des Adapters ** Szenen ** und ** Gruppen ** haben können.
Die ** Szene ** ist nur eine Liste von Status-IDs und Werten, die diese Status bei Aktivierung der Szene haben müssen. Z.B. Wir haben in der Szene "_scene.allLightInBath_" erstellt:

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  +- hm-rpc.0.TOP_LIGHT.STATE     - true
```

Um die Szene zu aktivieren, müssen wir "_scene.allLightInBath_" auf "true" setzen (z. B. über Skript oder vis). Dann werden beide Zustände auf die gewünschten Werte gesetzt, auf **true** Der Wert von _scene.allLightInBath_ ist ebenfalls **true** Wenn wir das obere Licht manuell ausschalten, wird der Wert von _scene.allLightInBath_ auf **false** gesetzt.
Und wieder auf **true** wenn wir das Licht manuell einschalten wollen.

Fügen wir der **Szene** den Fan hinzu:

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  |- hm-rpc.0.TOP_LIGHT.STATE     - true
  |- hm-rpc.0.FAN.STATE          - true
  |- hm-rpc.0.FAN.STATE          - false (delay 60000ms)
```

In diesem Fall wird der Lüfter bei Aktivierung der **Szene** eingeschaltet und in einer Minute ausgeschaltet.
Nach dem Ausschalten des Lüfters wird der Wert von _scene.allLightInBath_ auf **false** gesetzt, da nicht alle Zustände den gewünschten Werten entsprechen.
Zustände mit Verspätung nehmen nicht an Berechnungen teil.

Sie können die Szene mit einem "Play" -Button testen.
Zusätzlich können Sie diese **Szene** direkt mit einer anderen Szenen-ID verknüpfen. Wenn Sie beispielsweise einen Sensor an der Tür haben, können Sie diesen als Auslöser auswählen:

```
  trigger
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     true
```

Und jedes Mal, wenn Sie die Tür im Bad öffnen, werden alle Lichter mit Ventilator eingeschaltet.

## Gruppen
** Gruppen ** sind wie virtuelle Kanäle. Sie können mit Hilfe von ** Gruppen ** virtuelle Geräte aus mehreren Aktoren erstellen und diese wie ein Gerät gemeinsam steuern.
Lassen Sie uns unsere Probe mit Badlichtern modifizieren.

```
  scene.allLightInBath             "set on true"    "set on false"
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true             false
  +- hm-rpc.0.TOP_LIGHT.STATE     - true             false
```

Wenn Sie diese **Gruppe** mit dem Türsensor wie folgt verknüpfen:

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

Jedes Mal, wenn Sie die Tür öffnen, werden alle Lichter in einer Badewanne eingeschaltet. Der Wert von _scene.allLightInBath_ wird auf **true** gesetzt.
Wenn Sie die Tür schließen, werden die Lichter ausgeschaltet. Und der Wert von _scene.allLightInBath_ wird auf **false** gesetzt.

Es ist nutzlos, aber es ist ein gutes Beispiel.

Wenn Sie ein Licht manuell einschalten, wird der Wert von _scene.allLightInBath_ auf **unsicher** gesetzt.

Verzögerungen können auch in der **Gruppe** verwendet werden, aber die Zustände mit Verzögerung nehmen nicht an Berechnungen des aktuellen Werts der **Gruppe** teil.

## Virtuelle Gruppen
** Virtuelle Gruppen ** sind wie virtuelle Kanäle und wie Gruppen, können jedoch beliebige Werte annehmen: Zahlen, Zeichenfolgen usw.
Sie können eine virtuelle Gruppe erstellen, um alle Fensterläden im Wohnzimmer zu steuern. Wenn Sie 40% in die virtuelle Gruppe schreiben, werden alle Fensterläden auf 40% gesetzt.

## Aktuelle Zustände als Szene speichern
Um aktuelle Zustände in einer Szene zu speichern, können Sie eine Nachricht an den Adapter senden:

```
sendTo(
    'scenes.0',
    'save',
    {sceneId:
        'scene.0.SCENE_ID', // scene ID
        isForTrue: true     // true if actual values must be saved for `true` state and `false` if for false
    },
    result => result.err && console.error(result.error) // optional
);
```

Der Adapter liest alle tatsächlichen Werte für die in dieser Szene definierten IDs und speichert sie als konfigurierte.

## Changelog
### 1.1.1 (2019-05-26)
* (bluefox)Added storing of actual values in scene via message

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