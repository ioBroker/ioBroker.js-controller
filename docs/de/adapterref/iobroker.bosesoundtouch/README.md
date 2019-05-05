---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bosesoundtouch/README.md
title: ioBroker.bosesoundtouch! [Logo] (admin / bosesoundtouch.png)
hash: WhdHbVWqidSidG4Ci6z6jRClTlkIEjuPY0PUi2kND70=
---
# IoBroker.bosesoundtouch ![Logo](../../../en/adapterref/iobroker.bosesoundtouch/admin/bosesoundtouch.png)

![Anzahl der Installationen](http://iobroker.live/badges/bosesoundtouch-stable.svg)

Bose SoundTouch-Adapter für die IoT-Plattform von ioBroker

## Kontrollstaaten
Zur Steuerung Ihres Sprechers können folgende Objekte geschrieben werden:

| Zustand | Beschreibung |
| :---           | :---        |
| Schlüssel | Einer der folgenden Schlüssel zum Senden: <br><br> ABSPIELEN <br> PAUSE <br> HALT <br> PREV_TRACK <br> NÄCHSTER TITEL <br> DAUMEN HOCH <br> DAUMEN RUNTER <br> LESEZEICHEN <br> LEISTUNG <br> STUMM <br> VOLUME_UP <br> LAUTSTÄRKE RUNTER <br> PRESET_1 <br> PRESET_2 <br> PRESET_3 <br> PRESET_4 <br> PRESET_5 <br> PRESET_6 <br> AUX_INPUT <br> SHUFFLE_OFF <br> SHUFFLE_ON <br> REPEAT_OFF <br> REPEAT_ONE <br> WIEDERHOLE ALLES <br> SPIELPAUSE <br> FAVORIT HINZUFÜGEN <br> REMOVE_FAVORITE <br> INVALID_KEY |
| stumm geschaltet | Das Gerät stummschalten oder die Stummschaltung aufheben. |
| auf | Schalten Sie das Gerät ein oder aus. |
| playEverywhere | Definieren Sie den Lautsprecher als Zonenmaster und spielen Sie den Inhalt auf allen anderen Lautsprechern. |
| Volumen | Ändern Sie die Lautstärke des Geräts zwischen 0 und 100. |

## Info Staaten
Die folgenden Informationen werden von Ihrem Lautsprecher erfasst (schreibgeschützte Status):

### Geräteinformationen
| Zustand | Beschreibung |
| :---       | :---        |
| ipAddress | Die IP-Adresse des Geräts ist normalerweise dieselbe, die Sie in den Adaptereinstellungen konfiguriert haben. |
| macAddress | Die MAC-Adresse des Geräts |
| Name | Der Name, den Sie mit Ihrer SoundTouch App konfiguriert haben. |
| Typ | Der Gerätetyp (z. B. SoundTouch 300). |

### Läuft gerade
| Zustand | Beschreibung |
| :---       | :---        |
| Album | Das aktuell spielende Album. |
| Kunst | Die URL der Quellgrafik. |
| Künstler | Der momentan spielende Künstler. |
| Genre | Das Genre des aktuell gespielten Titels. |
| Quelle | Art oder Name des spielenden Dienstes Um festzustellen, ob sich das Produkt im Standby-Modus befindet, prüfen Sie, ob source == STANDBY. |
| Station | Der Name des Senders oder der Wiedergabeliste. |
| track | Der aktuell abgespielte Titel. |

### Presets
Für jedes der 6 verfügbaren Presets sind folgende Zustände vorhanden:

| Zustand | Beschreibung |
| :---       | :---        |
| iconUrl | Die URL der Quellgrafik. |
| Name | Der Name des Albums, des Senders, der Wiedergabeliste, des Songs, des Telefons usw. hängt von der Quelle ab. |
| Quelle | Der Typ oder Name des Dienstes. |

### Zonen
Die folgende Beschreibung hilft Ihnen beim Erstellen von Gruppen mit Ihrem Multiroom-System. Das Readonly-Feld wird automatisch von den Soundtouch-Geräten aktualisiert, auch wenn Sie die Gruppen von der Soundtouch-Anwendung selbst ändern.

| Zustand | Beschreibung |
| :---       | :---        |

| masterOf | Zeigt die MAC-Adressen der Slaves eines Lautsprechers an (getrennt durch ";") (readonly) | memberOf | Zeigt die MAC-Adresse des Masters dieses Lautsprechers an (Readonly) | addMasterOf | Fügen Sie die MAC-Adresse des Lautsprechers hinzu, den Sie zu diesem Master-Lautsprecher hinzufügen möchten. Es ist auch möglich, mehr als einen Lautsprecher zu platzieren (geteilt durch ";").
| removeMasterOf | Fügen Sie die MAC-Adresse des Lautsprechers hinzu, den Sie von diesem Master-Lautsprecher entfernen möchten. Es ist auch möglich, mehr als einen Lautsprecher zu platzieren (geteilt durch ";").

## Changelog

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
* admin/bose.png renamed to admin/bosesoundtouch.png to be shown corretly in adapter list
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