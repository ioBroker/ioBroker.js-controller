---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.synology/README.md
title: ioBroker Synology Adapter
hash: tmY0K1EQ19t8kcb8dvdFpborvlzzMaoGF8O4LaDq7og=
---
![Logo](../../../en/adapterref/iobroker.synology/admin/synology.png)

![Anzahl der Installationen](http://iobroker.live/badges/synology-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.synology.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.synology.svg)
![NPM](https://nodei.co/npm/iobroker.synology.png?downloads=true)
![Spenden](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker Synology Adapter
[![Tests] (https://github.com/instalator/iobroker.synology/workflows/Test%20and%20Release/badge.svg)](https://github.com/instalator/ioBroker.synology/actions/)

## Beschreibung
Mit dem Treiber können Sie Daten empfangen und Ihren Synology NAS-Server verwalten.

### 2FA Einstellungen
Wenn Sie 2FA verwenden, lesen Sie die Anweisungen [Hier](docs/en/template.md)

### SendMethod
Sie können jeden Befehl (jede Methode) senden, indem Sie das sendMethod-Objekt festlegen. Beispiel: Get the SurveillanceStation info ist eine getInfo-Methode ohne zusätzliche Parameter.

```{"method": "getInfo", "params": {}}```

### Steuerung
** command.reboot ** - NAS neu starten

** command.shutdown ** - NAS herunterfahren

*** SurveillanceStation.cameras. {NAMECAM} ***:

* enabled - Aktueller Status und Kamera aktivieren / deaktivieren
* linkSnapshot - URL für den Schnappschuss

*** SurveillanceStation.HomeMode.status_on *** - Aktueller Status und Aktivieren / Deaktivieren des Homemode

*** SurveillanceStation.getSnapshotCamera *** - Schnappschuss nach Kameranummer abrufen, die Datei wird in einem Verzeichnis ``...iobroker-data\synology_0\snapshotCam_2.jpg`` gespeichert

*** AudioStation.players. {PLAYERID} ***:

* Wiedergabe, Pause, Stopp, Weiter, Zurück - Steuerung der Wiedergabe (Taste, nur wahr)
* wiederholen - Steuerung wiederholen (Aus, Alle, Eins)
* shuffle - Shuffle-Steuerung (wahr / falsch)
* Lautstärke - Lautstärke-Remote-Player (0-100)
* seek - Steuern der Wiedergabesuche (0-100)
* play_folder - Fügt Titel aus dem Ordner zur Wiedergabeliste hinzu (ID-Ordner, z. B. `` dir_5816``)
* play_track - Titel nach seiner ID abspielen (z. B. `` music_120847``)
* current_play - Steuerung und Status des aktuellen Titels anhand seiner Nummer in der Wiedergabeliste (z. B. `` 14``)

*** DownloadStation ***:

* activeTask - Anzahl unvollständiger Downloads
* listTasks - ein Array mit unvollständigen Downloads
*hedule_enabled, Shedule_emule_enabled - Status und Kontrolle von geplanten oder sofortigen Downloads
* add_hash_download - zu Hash-Downloads hinzufügen (z. B. `` 8BD3CAD02FC9ECB661A12378414FA310D3F3FE03``)
* add_url_download - Download-URL oder Magnet-Link hinzufügen
* Ordner - Der Ordner, der heruntergeladen werden soll, bevor der Download hinzugefügt wird. Andernfalls wird er in den Standardordner geladen
* pause_task, resume_task - Unterbrechen Sie den Download und setzen Sie den Vorgang fort. (z. B. `` dbid_170`` oder `` 170`` oder `` all``)

### Nachrichtenbox
```
sendTo('synology.0', 'getSnapshot', {camId: 2}, (res) => {
    if(res) sendTo('telegram.0', {text: res, caption: 'caption for image'});
});
```

## Changelog

### 0.1.20
* (instalator) fixed error

### 0.1.18
* (instalator) change link for album cover

### 0.1.17
* (instalator) added Sentry plugin support

### 0.1.16
* (instalator) fixed error

### 0.1.15
* (instalator) fixed error in parse Info
* (instalator) fixed api undefined

### 0.1.14
* (instalator) fixed missing [datapoints](https://github.com/instalator/ioBroker.synology/issues/43)
* (instalator) refactoring
* (instalator) Changed the logging of some errors
* (instalator) Changed format session in syno package

### 0.1.11
* (instalator) added motionDetected state
* (SpectreKr*) Adding to FS Sharing

### 0.1.10
* (instalator) fixed copy cover file
* (instalator) fix get packages for DSM 5.x
* (instalator) Added option to select services for receiving data

### 0.1.8
* (instalator) fix error addDownload
* (instalator) fixed listRadios
* (instalator) fixed get cover

### 0.1.7
* (instalator) fixed 2FA
* (instalator) Added setup guide 2FA

### 0.1.6
* (instalator) fix for 2fa
* (instalator) fix error
* (instalator) change error log
* (instalator) fix io-package
* (instalator) fix error status player

### 0.1.4
* (instalator) change for DownloadStation
* (instalator) added playlist favorite radio
* (instalator) added clearPlaylist button
* (instalator) refactoring

### 0.1.3
* (instalator) change obj for ss info fix for cover song 
* (instalator) fix for info.connection 
* (instalator) add 6.2.3 fix for player browser files 
* (instalator) fix for 2FA
* (instalator) fixed error add download 
* (instalator) added DownloadStation task list

### 0.1.2
* (instalator) fixed error

### 0.1.1
* (instalator) added messagebox for snapshot
* (instalator) update readme
* (instalator) added ss link for different streams
* (instalator) fix error
* (instalator) refactoring

### 0.1.0
* (instalator) added HomeMode switch 
* (instalator) change for audiostation 
* (instalator) change for as and ss
* (instalator) added snapshot functional 
* (instalator) fixed systemConfig 
* (instalator) fixed many error 

### 0.0.4 (2018-10-07)
* (instalator) Изменен репозиторий библиотеки
* (instalator) Добавлено в конфиг время опроса

### 0.0.3 (2018-01-03)
* (instalator) initial

## License
The MIT License (MIT)

Copyright (c) 2021 instalator <vvvalt@mail.ru>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.