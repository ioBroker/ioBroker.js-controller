---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.musiccast/README.md
title: ioBroker.musiccast
hash: tt/h/le4GOU9PDRh7t6r+yzRzstX8rUJyno2AOEsUHM=
---
![Logo](../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)

![Anzahl der Installationen](http://iobroker.live/badges/musiccast-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.musiccast.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.musiccast.svg)
![Build Status](https://travis-ci.org/foxthefox/ioBroker.musiccast.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.musiccast.png?downloads=true)

# IoBroker.musiccast
Adapter für Yamaha MusicCast-Geräte wie WX-010/030, YSP-1600

## Installation:
Die Installation erfordert mindestens nodejs v4

von npm

```javascript
npm install iobroker.musiccast
```

aktuelle Version von Github (dies funktioniert möglicherweise nicht jedes Mal, wenn die Entwicklung läuft)

```javascript
npm install https://github.com/foxthefox/ioBroker.musiccast/tarball/master --production
```

## Die Einstellungen
Auf der Admin-Seite kann das "+" verwendet werden, um die IP-Adresse, die Geräte-ID, den Typ und den Namen manuell hinzuzufügen.
Drücken Sie die Suchtaste, um die Suche zu starten. Wenn Sie über mehrere Geräte verfügen, müssen Sie die Taste mehrmals drücken, bis alle Geräte erkannt wurden. Leider gibt die Erkennung jeweils nur ein Objekt zurück, und dies kann jedes Ihrer MusicCast-Geräte sein. Wenn die Rückgabe mit der bereits in der Tabelle enthaltenen identisch ist, müssen Sie erneut auf die Schaltfläche klicken. Manchmal hilft es, die damin-Seite zu speichern und wieder zu öffnen.

In dem unwahrscheinlichen Fall, dass 2 oder mehr Geräte dieselbe ID liefern, ändern Sie eine ID geringfügig. Ansonsten kann der Adapter die 2 Geräte nicht unterscheiden.

Wenn Sie möchten, dass die Wiedergabezeit für die Titel, die Sie anhören, aktualisiert wird, aktivieren / aktivieren Sie das entsprechende Kontrollkästchen. Beachten Sie, dass sich die Anzahl der Nachrichten erhöht (jede Sekunde für jedes Gerät das Pingpong der Updates).

## Verfügbare Objekte
Folgende Objekte sind aktuell implementiert:

### Basic (zone)
| Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| {zone} .power | boolean | x | true / false -> ON / Standby |
| {zone} .zone_b | boolescher Wert |? | true / false -> Zielzone ist Zone B |
| {zone} .mute | boolean | x | true / false -> stumm / nicht stumm |
| {zone} .volume | value | x | 0 ... max (max. abhängig vom Gerät) |
| {zone} .act_vol_mode | text |? | aktuelle Lautstärke im dB-Modus |
| {zone} .act_vol_val | value |? | tatsächliche Lautstärke in dB value |
| {zone} .act_vol_unit | text | - | tatsächliche Volumeneinheit (sollte dB sein) |
| {zone} .act_vol_mode_list | text | - | aktuelle Lautstärke in dB-Modi |
| {zone} .input | text | x | eingaben je nach gerät |
| {zone} .input_list | text | - | mögliche eingaben |
| {zone} .sound_program | text | x | sound program | setzen |
| {zone} .sound_program_list | text | - | mögliche soundprogramme |
| {zone} .surr_decoder_type | text |? | setze Surround-Typ |
| {zone} .surr_decoder_type_list | text | - | möglicher Surround-Decoder |
| {zone} .link_control | text | x | setze Verbindungssteuerung |
| {zone} .link_control_list | text | - | mögliche Einstellungen für die Verbindungssteuerung |
| {zone} .link_audio_delay | text | x | Link-Audio-Verzögerung einstellen |
| {zone} .link_audio_delay_list | text | - | mögliche Einstellungen für die Audio-Verzögerung von Link-Links |
| {zone} .clearVoice | boolean | x | clear Sprachsteuerung |
| {zone} .low | value | x | level EQ low |
| {zone} .mid | value | x | level EQ mid |
| {zone} .high | value | x | level EQ high |
| {zone} .subwoofer_volume | value | x | level subwoofer volume |
| {zone} .bass | value | x | level bass |
| {zone} .treble | value | x | level Höhen |
| {zone} .tone_control_mode_list | text | - | möglicher Tonsteuerungsmodus |
| {zone} .tone_mode | boolescher |? | Tonsteuermodus |
| {zone} .balance | value | x | level balance |
| {zone} .direct | boolean | x | set direct |
| {zone} .pure_direct | boolean | x | setze pure direct |
| {zone} .enhancer | boolean | x | set enhancer |
| {zone} .bass_extension | boolean | x | setze Basserweiterung |
| {zone} .sleep | value | x | sleep timer |

### Netusb
| Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| netusb.input | value | x | set / actual input |
| netusb.playPause | boolean | x | setze Wiedergabe / Pause |
| netusb.playback | text | - | status net player |
| netusb.stop | boolean | x | set Stop |
| netusb.auto_stop | boolean | - | automatisch gestoppt |
| netusb.next | boolean | x | setze Forward |
| netusb.prev | boolean | x | set Rewind |
| netusb.shuffle | boolean | x | Shuffle umschalten |
| netusb.shuffle_stat | text | - | shuffle status |
| netusb.repeat | boolean | x | toggle repeat |
| netusb.repeat_stat | text | - | repeat status |
| netusb.artist | text | - | artist name |
| netusb.album | text | - | album name |
| netusb.track | text | - | spurname |
| netusb.albumart_url | text | - | http-Adresse für Albumcover |
| netusb.albumart_id | value | - | album art id |
| netusb.play_time | value | - | Spielzeit in s |
| netusb.play_queue_type | text | - | netusb queue type |
| netusb.total_time | value | - | Gesamtzeit in s |
| netusb.recent_info | json | - | Geschichte der gespielten Gegenstände |
| netusb.preset_info | json | - | gespeicherte Presets / Favoriten |
| netusb.presetrecallnumber | value | x | rufe das # in der Favoritenliste auf |
| netusb.usb_devicetype | text | - | Typ des angeschlossenen USB-Geräts |
| netusb.attribute | value | - | welche Possibleiolites den Dienst haben, der entschlüsselt werden soll |

### System
| Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| system.api_version | value | - | API-Version |
| system.system_version | value | - | Systemversion |
| system.inputs. {service} | value | - | verfügbarer Eingabedienst |
| system.inputs. {service} .account_enable | value | - | verfügbarer Eingabedienst aktiviert |
| system.inputs. {service} .distribution_enable | value | - | verfügbarer verteilbarer Eingabedienst |
| system.inputs. {service} .play_info_type | value | - | verfügbarer Eingabeservice-Typ |

### CD-Player
| Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| cd.playPause | boolean | x | setze Wiedergabe / Pause |
| cd.playback | text | - | status CD player |
| cd.stop | boolean | x | setze Stop |
| cd.next | boolean | x | setze Forward |
| cd.prev | boolean | x | set Rewind |
| cd.shuffle | boolean | x | shuffle umschalten |
| cd.shuffle_stat | text | - | shuffle status |
| cd.repeat | boolean | x | Wiederholung umschalten |
| cd.repeat_stat | text | - | repeat status |
| cd.device_stat | text | - | gerätestatus |
| cd.playtime | value | - | aktuelle Wiedergabezeit |
| cd.totaltime | value | - | Gesamtzeit des aktuellen Titels |
| cd.disctime | value | - | CD-Gesamtzeit |
| cd.tracknumber | value | - | aktuelle Wiedergabe verfolgen |
| cd.totaltracks | value | - | total CD tracks |
| cd.artist | text | - | artist name |
| cd.album | text | - | album name |
| cd.track | text | - | spurname |

### Tuner
| Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| tuner.common_preset_info | array | - | Informationen zur Voreinstellung |
| tuner.am.preset_info | array | - | AM-Informationen voreinstellen |
| tuner.fm.preset_info | array | - | FM-Informationen voreinstellen |
| tuner.dab.preset_info | array | - | Voreingestellte DAB-Informationen |
| tuner.am.preset | number | x | AM-Voreinstellungsnummer |
| tuner.am.freq | number | x | AM frequenz in kHz |
| tuner.am.tuned | boolean | - | AM tuned |
| tuner.fm.preset | number | x | FM Festsendernummer |
| tuner.fm.freq | number | x | UKW-Frequenz in kHz |
| tuner.fm.tuned | boolean | - | FM tuned |
| tuner.fm.audio_mode | string | - | FM mono / stereo |
| tuner.dab.preset | number | x | DAB-Voreinstellungsnummer |
| tuner.dab.id | number | - | DAB-Sender-ID |
| tuner.dab.status | string | - | DAB status |
| tuner.dab.freq | number | - | DAB frequency |
| tuner.dab.category | string | - | primär / sekundär |
| tuner.dab.audio_mode | string | - | DAB mono / stereo |
| tuner.dab.bit_rate | number | - | DAB-Bitrate in kpbs |
| tuner.dab.quality | number | - | DAB-Qualität 0-100 |
| tuner.dab.tune_aid | number | - | DAB signal strenth 0-100 |
| tuner.dab.off_air | boolean | - | DAB off air |
| tuner.dab.dab_plus | boolean | - | DAB + |
| tuner.dab.program_type | string | - | DAB-Programmtyp |
| tuner.dab.ch_label | string | - | DAB CH label |
| tuner.dab.service_label | string | - | DAB-Service-Label |
| tuner.dab.dls | string | - | DAB DLS |
| tuner.dab.ensemble_label | string | - | DAB-Ensemble-Label |
| tuner.dab.initial_scan_progress | number | - | Fortschritt des DAB-Startscans 0-100 |
| tuner.dab.total_station_num | number | - | DAB total stations 0-255 |
| tuner.rds.program_type | string | - | RDS-Programmtyp |
| tuner.rds.program_service | string | - | RDS-Programmdienst |
| tuner.rds.radio_text_a | string | - | RDS-Text A |
| tuner.rds.radio_text_b | string | - | RDS-Text B |

### Uhr
| Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| clock.auto_sync | boolean | x | Automatische Uhrensynchronisation |
| clock.format | string | x | Uhrzeitformat 12h / 24h |
| clock.alarm_on | boolean | x | Uhralarmstatus ein / aus |
| clock.volume | number | x | Lautstärke des Weckers |
| clock.fade_interval | number | x | Zeitintervall für Alarmüberblendung |
| clock.fade_type | number | x | Clock Alarm Fade Type |
| clock.mode | string | x | Uhrzeitalarmmodus ein / wöchentlich |
| clock.repeat | boolean | x | Weckalarm wiederholen, wenn ein Tag angegeben ist |
| clock. {day} .enable | boolean | x | Clock Gültigkeit des Setups |
| Uhr. {Tag} .Zeit | Zeichenfolge | - | Startzeit des Weckers hhmm 00-23,00-59 |
| clock. {day} .beep | boolean | x | Clock Beep validity |
| uhr. {tag} .wiedergabetyp | zeichenfolge | - | uhr alarm wiedergabetyp fortsetzen / voreinstellen |
| clock. {day} .resume_input | string | - | Weckalarm-Fortsetzeingabe-ID |
| uhr. {tag} .preset_type | string | - | uhr alarm voreingestellter typ |
| uhr. {tag} .preset_num | nummer | - | uhr alarm voreingestellt eingangskennung |
| clock. {day} .preset_netusb_input | string | - | Netusb-Eingangs-ID für Uhrzeitalarm |
| uhr. {tag} .preset_netusb_text | string | - | uhr alarm netusb text |
| clock. {day} .preset_tuner_band | string | - | Clock Alarm Tuner Band |
| clock. {day} .preset_tuner_number | number | - | Clock Alarm Tuner Frequenz oder Sender ID |

## Machen
* Unterstützung von Listen
* Wechsel der Interaktionswerte zu netter Benennung
* fastforward / fastrewind für NETUSB / CD
* Bluetooth
* Dialogebene

## Changelog
#### 0.1.2
* (Scrounger) correction of type mismatch (string boolean)

#### 0.1.1
* correction for clock "oneday"

#### 0.1.0
* compact mode
* yamaha-yxc-nodejs 0.0.8
* widget update

#### 0.0.9
* adminV3 uses values2table and add button back again
* zone2/3/4 now working
* extended automatic testing
* button in admin for collection of JSON responses

#### 0.0.8
* automatic testing update
* given name in admin page to appear in object (device)

#### 0.0.7
* tuner support
* clock support (information mainly)
* support of more zones
* support of mc-link
* setting of min and max values according features
* admin v3

#### 0.0.6
* widget set matching the objects and control
* cd.shuffle_stat boolean -> text
* new netusb.shuffle_stat (text)
* status update via subscribing UDP messages
* switch for update on playtime info (disabling reduces traffic)

#### 0.0.5
* cleanup in admin page
* improvement for object creation
* more objects on netusb
* more objects in system
* added support of CD

#### 0.0.4
* new objects and functions (input, sound_prog, EQ, clearVoice)
* search/discovery in admin page

#### 0.0.3
* more objects implemented

#### 0.0.2
* minor corrections

#### 0.0.1
* initial release with setting of IP in config-page, 
* available commands power, mute, volume

## License

The MIT License (MIT)

Copyright (c) 2017 - 2019 foxthefox <foxthefox@wysiwis.net>