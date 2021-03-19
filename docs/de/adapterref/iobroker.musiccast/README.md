---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.musiccast/README.md
title: ioBroker.musiccast
hash: FWruI73yp9zrKb04C0x3SjjvJj222EL77NS/r/h1XD8=
---
![Logo](../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)

![Anzahl der Installationen](http://iobroker.live/badges/musiccast-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.musiccast.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.musiccast.svg)
![Build-Status](https://travis-ci.org/foxthefox/ioBroker.musiccast.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.musiccast.png?downloads=true)

# IoBroker.musiccast
Adapter für Yamaha MusicCast-Geräte wie WX-010/030, YSP-1600

## Installation:
Für die Installation ist mindestens nodejs v10 erforderlich

ab npm

```javascript
npm install iobroker.musiccast
```

aktuelle Version von Github (dies funktioniert möglicherweise nicht jedes Mal, wenn die Entwicklung läuft)

```javascript
npm install https://github.com/foxthefox/ioBroker.musiccast/tarball/master --production
```

## Die Einstellungen
Auf der Administrationsseite "+" können IP-Adresse, Geräte-ID, Typ und Name manuell hinzugefügt werden.
Drücken Sie die Suchtaste, um eine Erkennung durchzuführen. Wenn Sie mehrere Geräte haben, müssen Sie die Taste mehrmals drücken, bis alle Geräte erkannt wurden. Leider gibt die Erkennung jeweils nur ein Objekt zurück, und dies kann jedes Ihrer MusicCast-Geräte sein. Wenn die Rückgabe mit der bereits in der Tabelle enthaltenen identisch ist, müssen Sie die Taste erneut drücken. Manchmal hilft es, die verdammte Seite zu speichern und wieder zu öffnen.

In dem unwahrscheinlichen Fall, dass zwei oder mehr Geräte dieselbe ID liefern, ändern Sie eine ID geringfügig. Andernfalls kann der Adapter die beiden Geräte nicht unterscheiden.

Wenn Sie möchten, dass die Wiedergabezeit für die Titel, die Sie hören, aktualisiert wird, aktivieren / aktivieren Sie das entsprechende Kontrollkästchen. Beachten Sie, dass dies die Anzahl der Nachrichten erhöht (jede Sekunde für jedes Gerät das Pingpong der Updates).

## Verfügbare Objekte
Folgende Objekte sind derzeit implementiert:

### Basic (Zone)
| Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| {zone} .power | boolean | x | true / false -> ON / Standby |
| {zone} .zone_b | boolean |? | true / false -> Zielzone ist Zone B |
| {zone} .mute | boolean | x | true / false -> stummgeschaltet / nicht stummgeschaltet |
| {zone} .volume | value | x | 0 ... max (max je nach Gerät) |
| {zone} .act_vol_mode | text |? | tatsächliche Lautstärke im dB-Modus |
| {zone} .act_vol_val | value |? | tatsächliche Lautstärke in dB value |
| {zone} .act_vol_unit | text | - | tatsächliche Lautstärkeeinheit (sollte dB sein) |
| {zone} .act_vol_mode_list | text | - | tatsächliche Lautstärke in dB-Modi |
| {zone} .input | text | x | Eingaben je nach Gerät |
| {zone} .input_list | text | - | mögliche Eingaben |
| {zone} .sound_program | text | x | Soundprogramm einstellen |
| {zone} .sound_program_list | text | - | mögliche Soundprogramme |
| {zone} .surr_decoder_type | text |? | setze Surround-Typ |
| {zone} .surr_decoder_type_list | text | - | möglicher Surround-Decoder |
| {zone} .link_control | text | x | set link control |
| {zone} .link_control_list | text | - | mögliche Einstellungen für die Linksteuerung |
| {zone} .link_audio_delay | text | x | Link-Audio-Verzögerung einstellen |
| {zone} .link_audio_delay_list | text | - | mögliche Einstellungen für die Audioverzögerung von Link-Links |
| {zone} .clearVoice | boolean | x | clear Sprachsteuerung |
| {zone} .low | value | x | level EQ low |
| {zone} .mid | value | x | level EQ mid |
| {zone} .high | value | x | level EQ high |
| {zone} .subwoofer_volume | value | x | level subwoofer volume |
| {zone} .bass | value | x | level bass |
| {zone} .treble | value | x | level dreifach |
| {zone} .tone_control_mode_list | text | - | möglicher Tonsteuerungsmodus |
| {zone} .tone_mode | boolean |? | Tonsteuerungsmodus |
| {zone} .balance | value | x | level balance |
| {zone} .direct | boolean | x | set direct |
| {zone} .pure_direct | boolean | x | set pure direct |
| {zone} .enhancer | boolean | x | set Enhancer |
| {zone} .bass_extension | boolean | x | set bass extension |
| {zone} .sleep | value | x | sleep timer |

### Netusb
| Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| netusb.input | value | x | set / actual input |
| netusb.playPause | boolean | x | setze Play / Pause |
| netusb.playback | text | - | status net player |
| netusb.stop | boolean | x | set Stop |
| netusb.auto_stop | boolean | - | automatisch gestoppt |
| netusb.next | boolean | x | set Forward |
| netusb.prev | boolean | x | set Rewind |
| netusb.shuffle | boolean | x | Shuffle umschalten |
| netusb.shuffle_stat | text | - | shuffle status |
| netusb.repeat | boolean | x | Umschaltwiederholung |
| netusb.repeat_stat | text | - | Status wiederholen |
| netusb.artist | text | - | Künstlername |
| netusb.album | text | - | Albumname |
| netusb.track | text | - | track name |
| netusb.albumart_url | text | - | http adresse für album art |
| netusb.albumart_id | value | - | album art id |
| netusb.play_time | value | - | gespielte Zeit in s |
| netusb.play_queue_type | text | - | netusb queue type |
| netusb.total_time | value | - | Gesamtzeit in s |
| netusb.recent_info | json | - | Verlauf der gespielten Gegenstände |
| netusb.preset_info | json | - | gespeicherte Presets / Favoriten |
| netusb.presetrecallnumber | value | x | das # in der Favoritenliste abrufen |
| netusb.usb_devicetype | text | - | Typ des angeschlossenen USB-Geräts |
| netusb.attribute | value | - | welche Possibiolite den zu entschlüsselnden Dienst haben |

### System
| Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| system.api_version | value | - | API-Version |
| system.system_version | value | - | Systemversion |
| system.inputs. {service} | value | - | verfügbarer Eingabedienst |
| system.inputs. {service} .account_enable | value | - | verfügbarer Eingabedienst aktiviert |
| system.inputs. {service} .distribution_enable | value | - | verfügbarer Eingabedienst verteilbar |
| system.inputs. {service} .play_info_type | value | - | verfügbarer Eingabediensttyp |

### CD-Player
| Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| cd.playPause | boolean | x | setze Play / Pause |
| cd.playback | text | - | status CD-Player |
| cd.stop | boolean | x | set Stop |
| cd.next | boolean | x | set Forward |
| cd.prev | boolean | x | set Rewind |
| cd.shuffle | boolean | x | Shuffle umschalten |
| cd.shuffle_stat | text | - | shuffle status |
| cd.repeat | boolean | x | Umschaltwiederholung |
| cd.repeat_stat | text | - | Status wiederholen |
| cd.device_stat | text | - | Gerätestatus |
| cd.playtime | value | - | aktuelle Wiedergabezeit |
| cd.totaltime | value | - | aktuelle Track-Gesamtzeit |
| cd.disctime | value | - | CD-Gesamtzeit |
| cd.tracknumber | value | - | Spurstrom bei der Wiedergabe |
| cd.totaltracks | value | - | Gesamtanzahl der CD-Titel |
| cd.artist | text | - | Künstlername |
| cd.album | text | - | Albumname |
| cd.track | text | - | track name |

### Tuner
| Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| tuner.common_preset_info | array | - | Preset Information |
| tuner.am.preset_info | array | - | Voreingestellte AM-Informationen |
| tuner.fm.preset_info | array | - | Voreingestellte FM-Informationen |
| tuner.dab.preset_info | array | - | Voreingestellte DAB-Informationen |
| tuner.am.preset | number | x | AM voreingestellte Nummer |
| tuner.am.freq | number | x | AM Frequenz in kHz |
| tuner.am.tuned | boolean | - | AM optimiert |
| tuner.fm.preset | number | x | FM voreingestellte Nummer |
| tuner.fm.freq | number | x | FM-Frequenz in kHz |
| tuner.fm.tuned | boolean | - | FM optimiert |
| tuner.fm.audio_mode | string | - | FM mono / stereo |
| tuner.dab.preset | number | x | DAB voreingestellte Nummer |
| tuner.dab.id | number | - | DAB-Stations-ID |
| tuner.dab.status | string | - | DAB status |
| tuner.dab.freq | number | - | DAB-Frequenz |
| tuner.dab.category | string | - | primär / sekundär |
| tuner.dab.audio_mode | string | - | DAB mono / stereo |
| tuner.dab.bit_rate | number | - | DAB-Bitrate in kpbs |
| tuner.dab.quality | number | - | DAB-Qualität 0-100 |
| tuner.dab.tune_aid | number | - | DAB-Signal strenth 0-100 |
| tuner.dab.off_air | boolean | - | DAB off air |
| tuner.dab.dab_plus | boolean | - | DAB + |
| tuner.dab.program_type | string | - | DAB-Programmtyp |
| tuner.dab.ch_label | string | - | DAB CH label |
| tuner.dab.service_label | string | - | DAB-Dienstbezeichnung |
| tuner.dab.dls | string | - | DAB DLS |
| tuner.dab.ensemble_label | string | - | DAB ensmble label |
| tuner.dab.initial_scan_progress | number | - | Fortschritt des ersten DAB-Scans 0-100 |
| tuner.dab.total_station_num | number | - | DAB-Totalstationen 0-255 |
| tuner.rds.program_type | string | - | RDS-Programmtyp |
| tuner.rds.program_service | string | - | RDS-Programmdienst |
| tuner.rds.radio_text_a | string | - | RDS-Text A |
| tuner.rds.radio_text_b | string | - | RDS-Text B |

### Uhr
| Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| clock.auto_sync | boolean | x | Automatische Uhrensynchronisierung |
| clock.format | string | x | Clock-Format 12h / 24h |
| clock.alarm_on | boolean | x | Uhralarmstatus ein / aus |
| clock.volume | number | x | Taktalarmlautstärke |
| clock.fade_interval | number | x | Taktalarm-Fade-Intervall |
| clock.fade_type | number | x | Clock Alarm Fade Type |
| clock.mode | string | x | Uhralarmmodus an einem Tag / wöchentlich |
| clock.repeat | boolean | x | Wiederholung des Uhralarms, wenn ein Tag angegeben ist |
| clock. {day} .enable | boolean | x | Gültigkeit des Clock-Setups |
| clock. {day} .time | string | - | Startzeit des Uhralarms hhmm 00-23,00-59 |
| clock. {day} .beep | boolean | x | Clock Beep-Gültigkeit |
| clock. {day} .playback_type | string | - | Wiedergabetyp für Taktalarm wieder aufnehmen / voreingestellt |
| clock. {day} .resume_input | string | - | Clock Alarm Resume Input ID |
| clock. {day} .preset_type | string | - | Clock alarm voreingestellter Typ |
| clock. {day} .preset_num | number | - | Clock alarm voreingestellte Eingangs-ID |
| clock. {day} .preset_netusb_input | string | - | Clock Alarm Netusb Input ID |
| clock. {day} .preset_netusb_text | string | - | Clock alarm netusb text |
| clock. {day} .preset_tuner_band | string | - | Clock Alarm Tuner Band |
| clock. {day} .preset_tuner_number | number | - | Clock Alarm Tuner Frequenz oder Sender ID |

## Machen
* Unterstützung von Listen
* Änderung der Interaktionswerte in nette Benennung
* Fastforward / Fastrewind für NETUSB / CD
* Bluetooth
* Dialogebene

## Changelog
#### 0.2.0
* refactoring with "create adaptor"
* async/await

#### 0.1.5
* (Scrounger) error handling when device is not reachable

#### 0.1.4
* (Scrounger) correction of type mismatch (array object)

#### 0.1.3
* (foxthefox) added writing for linkControl/linkAudioDelay/linkAudioQuality

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

Copyright (c) 2017 - 2021 foxthefox <foxthefox@wysiwis.net>