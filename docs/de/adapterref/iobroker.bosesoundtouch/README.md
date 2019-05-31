---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bosesoundtouch/README.md
title: ioBroker.bosesoundtouch! [Logo] (admin / bosesoundtouch.png)
hash: y7eAT0+9YRxANKW9rG+VTdK2tjmY4kwJW/z/1HBl0G0=
---
# IoBroker.bosesoundtouch ![Logo](../../../en/adapterref/iobroker.bosesoundtouch/admin/bosesoundtouch.png)

![Anzahl der Installationen](http://iobroker.live/badges/bosesoundtouch-installed.svg)
![NPM](https://nodei.co/npm/iobroker.bosesoundtouch.png?downloads=true)

Bose SoundTouch-Adapter für die ioBroker IoT-Plattform

## Kontrollzustände
Zur Steuerung Ihres Lautsprechers können die folgenden Objekte geschrieben werden:

| Staat | Beschreibung |
| :---           | :---        |
| Schlüssel | Einer der folgenden zu sendenden Schlüssel: <br><br> ABSPIELEN <br> PAUSE <br> HALT <br> PREV_TRACK <br> NÄCHSTER TITEL <br> DAUMEN HOCH <br> DAUMEN RUNTER <br> LESEZEICHEN <br> LEISTUNG <br> STUMM <br> VOLUME_UP <br> LAUTSTÄRKE RUNTER <br> PRESET_1 <br> PRESET_2 <br> PRESET_3 <br> PRESET_4 <br> PRESET_5 <br> PRESET_6 <br> AUX_INPUT <br> SHUFFLE_OFF <br> SHUFFLE_ON <br> REPEAT_OFF <br> REPEAT_ONE <br> WIEDERHOLE ALLES <br> SPIELPAUSE <br> FAVORIT HINZUFÜGEN <br> REMOVE_FAVORITE <br> INVALID_KEY |
| gedämpft | Schalten Sie das Gerät stumm oder heben Sie die Stummschaltung auf. |
| auf | Schalten Sie das Gerät ein oder aus. |
| playEverywhere | Definieren Sie den Lautsprecher als Zonenmaster und geben Sie seinen Inhalt auf allen anderen Lautsprechern wieder. |
| volumen | Ändern Sie die Gerätelautstärke zwischen 0 und 100. |

## Info States
Die folgenden Informationen werden von Ihrem Sprecher gesammelt (schreibgeschützt):

### Geräteinformationen
| Staat | Beschreibung |
| :---       | :---        |
| ipAddress | Die IP-Adresse des Geräts, normalerweise dieselbe, die Sie in den Adaptereinstellungen konfiguriert haben. |
| macAddress | Die MAC-Adresse des Geräts |
| name | Der Name, den Sie mit Ihrer SoundTouch-App konfiguriert haben. |
| Typ | Der Gerätetyp (z. B. SoundTouch 300). |

### Läuft gerade
| Staat | Beschreibung |
| :---       | :---        |
| Album | Das aktuell abgespielte Album. |
| Kunst | Die URL der Quellgrafik. |
| Künstler | Der momentan spielende Künstler. |
| Genre | Das Genre des aktuell wiedergegebenen Titels. |
| Quelle | Der Typ oder Name des Dienstes, der abgespielt wird. Um festzustellen, ob sich das Produkt im Standby-Modus befindet, überprüfen Sie, ob source == STANDBY ist. |
| station | Der Name des Senders oder der Wiedergabeliste. |
| verfolgen | Der aktuell wiedergegebene Titel. |

### Presets
Die folgenden Status sind für jede der 6 verfügbaren Voreinstellungen vorhanden:

| Staat | Beschreibung |
| :---       | :---        |
| iconUrl | Die URL der Quellgrafik. |
| name | Der Name des Albums, des Senders, der Wiedergabeliste, des Musiktitels, des Telefons usw. hängt von der Quelle ab. |
| Quelle | Der Typ oder Name des Dienstes. |

### Zonen
Die folgende Beschreibung hilft Ihnen bei der Erstellung von Gruppen mit Ihrem Multi-Room-System. Das schreibgeschützte Feld wird von den Soundtouch-Geräten automatisch aktualisiert, auch wenn Sie die Gruppen von der Soundtouch-Anwendung selbst ändern.

| Staat | Beschreibung |
| :---       | :---        |

| masterOf | Anzeigen der MAC-Adressen der Slaves eines Lautsprechers (durch ";" getrennt) (schreibgeschützt) | memberOf | Zeigen Sie die MAC-Adresse des Masters dieses Lautsprechers an (schreibgeschützt) addMasterOf | Fügen Sie die MAC-Adresse des Lautsprechers hinzu, den Sie diesem Master-Lautsprecher hinzufügen möchten. Es ist auch möglich, mehr als einen Lautsprecher zu platzieren (durch ";" getrennt).
| removeMasterOf | Fügen Sie die MAC-Adresse des Lautsprechers hinzu, den Sie von diesem Master-Lautsprecher entfernen möchten. Es ist auch möglich, mehr als einen Lautsprecher zu platzieren (durch ";" getrennt).

## Changelog

### 0.9.1 (12.05.2019)

* Support for compact mode.
* Fixed bugs found by adapter checker.

### 0.9.0 (23.01.2019)

* Added possibility to change the source.  
  All available sources are listed as states in folder sources and can be used as play buttons.

### 0.2.4 (05.05.2019)

* Core Files/Testing Update and introduce adapter-core

### 0.2.3 (11.11.2018)

* fixed issue #24 "does not start"

### 0.2.2 (03.11.2018)

* Zones: objects moved to sub folder 'zones'

### 0.2.1 (12.10.2018)

* Update now playing info for source Deezer

### 0.2.0 (27.09.2018)

* Add support for zones

### 0.1.9 (07.03.2018)

* Update now playing info for source Amazon

### 0.1.8 (08.02.2018)

* Update now playing info for source Spotify
* now playing: added state 'genre'

### 0.1.7 (04.02.2018)

* fixed crash if no presets are defined

### 0.1.6 (17.01.2018)

* fixed crash if socket connection fails
* added setting: time to reconnect in seconds

### 0.1.5 (06.01.2018)

* added 'TUNEIN' to now playing info
* state playEverywhere falls back to false after activation
* admin/bose.png renamed to admin/bosesoundtouch.png to be shown correctly in adapter list
* added short adapter description in io-package.json

### 0.1.4 (30.12.2017)

* playEverywhere: support multi room (zones) to define one speaker as master for all others

### 0.1.3 (22.12.2017)

* revert last change

### 0.1.2 (22.12.2017)

* fixed typo in package.json

### 0.1.1 (20.12.2017)

* now playing: added state 'art' (URL to cover image if available)
* merged pull request from Apollon77 (basic config files for testing)
* renamed repository to 'ioBroker.bosesoundtouch'

### 0.1.0 (26.11.2017)

* objectChange/stateChange: log level 'debug'
* added 'STORED_MUSIC' to now playing info.

### 0.0.9 (22.11.2017)

* Merge pull request #1 from Apollon77/master: Add testing and fix things...

### 0.0.8 (19.11.2017)

* send value to correct instance when having multiple adapters installed
* first version of README.md

### 0.0.7 (09.11.2017)

* fixed logging in soundtouchsocket.js

### 0.0.6 (09.11.2017)

* renamed main.js to bosesoundtouch.js
* line ending: LF
* strings: single quote

### 0.0.5 and earlier (01.11.2017)

* Initial versions

## License

[The MIT License (MIT)](LICENSE)

Copyright (c) 2019 SwedishChef <swedish.chef@gmx.at>