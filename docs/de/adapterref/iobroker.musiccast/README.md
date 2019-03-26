---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.musiccast/README.md
title: ioBroker.musiccast
hash: XnE4QwDFRjUpKw9w5tMIJ7qYPO7YYoM0zgipGsj69/c=
---
![Logo](../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.musiccast.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.musiccast.svg)
![Build-Status](https://travis-ci.org/foxthefox/ioBroker.musiccast.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.musiccast.png?downloads=true)

# IoBroker.musiccast
Adapter für Yamaha MusicCast-Geräte wie WX-010/030, YSP-1600

## Installation:
Die Installation erfordert mindestens nodejs v4

von npm

```javascript
npm install iobroker.musiccast
```

Aktuelle Version von Github (dies funktioniert möglicherweise nicht jedes Mal, wenn die Entwicklung läuft)

```javascript
npm install https://github.com/foxthefox/ioBroker.musiccast/tarball/master --production
```

## Die Einstellungen
Auf der Admin-Seite "+" können IP-Adresse, Geräte-ID, Typ und Name manuell hinzugefügt werden.
Drücken Sie die Suchtaste für die Erkennung. Wenn Sie über mehrere Geräte verfügen, müssen Sie die Taste mehrmals drücken, bis alle Geräte erkannt werden. Leider wird bei der Erkennung zu diesem Zeitpunkt nur ein Objekt zurückgegeben. Dies könnte eines Ihrer MusicCast-Geräte sein. Wenn der Rücksprung dem bereits vorhandenen Teil der Tabelle entspricht, müssen Sie die Schaltfläche erneut drücken. Manchmal hilft es, die Daminseite zu speichern und wieder zu öffnen.

In dem unwahrscheinlichen Fall, dass 2 oder mehr Geräte dieselbe ID liefern, ändern Sie eine ID leicht. Ansonsten kann der Adapter nicht zwischen den beiden Geräten unterscheiden.

Wenn Sie möchten, dass die Wiedergabezeit für die Tracks, die Sie hören, aktualisiert wird, aktivieren Sie das entsprechende Kontrollkästchen. Beachten Sie, dass die Anzahl der Nachrichten erhöht wird (jede Sekunde für jedes Gerät der Pingpong der Updates).

## Verfügbare Objekte
Folgende Objekte sind derzeit implementiert:

### Basic (zone)
Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| {zone} .power | boolean | x | true / false -> ON / Standby |
| {zone} .zone_b | boolean | | | true / false -> Zielzone ist Zone B |
| {zone} .mute | boolean | x | true / false -> stumm / nicht stumm |
| {zone} .volume | value | x | 0 ... max (max je nach Gerät) |
| {zone} .act_vol_mode | text | | | tatsächliche Lautstärke im dB-Modus |
| {zone} .act_vol_val | value | | | tatsächliche Lautstärke in dB-Wert |
| {zone} .act_vol_unit | text | - | tatsächliche Lautstärkeeinheit (sollte dB sein) |
| {zone} .act_vol_mode_list | text | - | aktuelle Lautstärke in dB-Modi |
| {zone} .input | text | x | wird je nach Gerät | eingegeben
| {zone} .input_list | text | - | mögliche Eingaben |
| {zone} .sound_program | text | x | set sound program |
| {zone} .sound_program_list | text | - | mögliche Klangprogramme |
| {zone} .surr_decoder_type | text | | | setze den Surround-Typ |
| {zone} .surr_decoder_type_list | text | - | möglicher Surround-Decoder |
| {zone} .link_control | text | x | Linksteuerung festlegen |
| {zone} .link_control_list | text | - | mögliche linksteuerungseinstellungen |
| {zone} .link_audio_delay | text | x | Link-Audioverzögerung einstellen |
| {zone} .link_audio_delay_list | text | - | mögliche link link audio delay einstellungen |
| {zone} .clearVoice | boolean | x | clear Sprachsteuerung |
| {zone} .low | value | x | level EQ niedrig |
| {zone} .mid | value | x | level EQ mid |
| {zone} .high | value | x | level EQ hoch |
| {zone} .subwoofer_volume | value | x | Pegel Subwoofer-Lautstärke |
| {zone} .bass | value | x | level bass |
| {zone} .dreble | value | x | Pegelhöhen |
| {zone} .tone_control_mode_list | text | - | möglicher Tonsteuerungsmodus |
| {zone} .tone_mode | boolean | | | Tonsteuermodus |
| {zone} .balance | value | x | level balance |
| {zone} .direct | boolean | x | set direct |
| {zone} .pure_direct | boolean | x | set pure direkt |
| {zone} .enhancer | boolean | x | set-Enhancer |
| {zone} .bass_extension | boolean | x | Basserweiterung setzen |
| {zone} .sleep | value | x | sleep timer |

### Netusb
Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| netusb.input | value | x | set / actual input |
| netusb.playPause | boolean | x | set Play / Pause |
| netusb.playback | text | - | status net player |
| netusb.auto_stop | boolean | - | automatisch gestoppt |
| netusb.next | boolean | x | set Forward |
| netusb.prev | boolean | x | set Rewind |
| netusb.shuffle | boolean | x | Shuffle umschalten |
| netusb.shuffle_stat | text | - | shuffle status |
| netusb.repeat | boolean | x | Wiederholung umschalten |
| netusb.repeat_stat | text | - | Wiederholungsstatus |
| netusb.artist | text | - | Künstlername |
| netusb.album | text | - | Albumname |
| netusb.track | text | - | spurname |
| netusb.albumart_url | text | - | http-Adresse für Albumcover |
| netusb.albumart_id | value | - | album art id |
| netusb.play_time | value | - | gespielte Zeit in s |
| netusb.play_queue_type | text | - | netusb Warteschlangentyp |
| netusb.total_time | value | - | Gesamtzeit in s |
| netusb.recent_info | json | - | geschichte der gespielten gegenstände |
| netusb.preset_info | json | - | gespeicherte Voreinstellungen / Favoriten |
| netusb.presetrecallnumber | value | x | ruft das # in der Favoritenliste | auf
| netusb.usb_devicetype | text | - | Typ des angeschlossenen USB-Geräts |
| netusb.attribute | value | - | welche Möglichkeiten hat den Dienst, | zu decodieren

### System
Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| system.api_version | value | - | API-Version |
| system.system_version | value | - | Systemversion |
| system.inputs. {service} | value | - | verfügbarer Eingabedienst |
| system.inputs. {service} .account_enable | value | - | verfügbarer Eingabedienst aktiviert |
| system.inputs. {service} .distribution_enable | value | - | verfügbare Verteilungsdatei für Eingabedienste |
| system.inputs. {service} .play_info_type | value | - | verfügbarer Eingabediensttyp |

### CD-Player
Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| cd.playPause | boolean | x | set Play / Pause |
cd.playback | text | - | status CD-Spieler |
| cd.stop | boolean | x | set Stop |
| cd.next | boolean | x | Vorwärts setzen |
| cd.prev | boolean | x | set Rewind |
cd.shuffle | boolean | x | Shuffle umschalten |
cd.shuffle_stat | text | - | shuffle status |
| cd.repeat | boolean | x | Wiederholung umschalten |
| cd.repeat_stat | text | - | Wiederholungsstatus |
| cd.device_stat | text | - | gerätestatus |
| cd.playtime | value | - | aktuelle Wiedergabezeit |
| cd.totaltime | value | - | aktuelle Gesamtzeit des Tracks |
| cd.disctime | value | - | CD Gesamtzeit |
| cd.tracknumber | value | - | Track aktuell in Wiedergabe |
| cd.totaltracks | value | - | total CD Titel |
| cd.artist | text | - | Künstlername |
| cd.album | text | - | Albumname |
| cd.track | text | - | spurname |

### Tuner
Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| tuner.common_preset_info | array | - | Voreinstellungsinformationen |
| tuner.am.preset_info | array | - | Voreingestellte AM-Informationen |
| tuner.fm.preset_info | array | - | Preset FM Information |
| tuner.dab.preset_info | array | - | Preset-DAB-Informationen |
| tuner.am.preset | number | x | AM-Preset-Nummer |
| tuner.am.freq | number | x | AM-Frequenz in kHz |
| tuner.am.tuned | boolean | - | AM abgestimmt |
| tuner.fm.preset | number | x | FM-Preset-Nummer |
| tuner.fm.freq | number | x | UKW-Frequenz in kHz |
| tuner.fm.tuned | boolean | - | FM abgestimmt |
| tuner.fm.audio_mode | string | - | UKW Mono / Stereo |
| tuner.dab.preset | number | x | DAB-Preset-Nummer |
| tuner.dab.id | Nummer | - | DAB-Stations-ID |
| tuner.dab.status | string | - | DAB-Status |
| tuner.dab.freq | number | - | DAB-Frequenz |
| tuner.dab.category | string | - | primary / secondary |
| tuner.dab.audio_mode | string | - | DAB Mono / Stereo |
| tuner.dab.bit_rate | number | - | DAB-Bitrate in kpbs |
| tuner.dab.quality | number | - | DAB quality 0-100 |
| tuner.dab.tune_aid | number | - | DAB-Signal als 0-100 |
| tuner.dab.off_air | boolean | - | DAB off air |
| tuner.dab.dab_plus | boolean | - | DAB + |
| tuner.dab.program_type | string | - | DAB-Programmtyp |
| tuner.dab.ch_label | string | - | DAB CH-Label |
| tuner.dab.service_label | string | - | DAB-Dienstetikett |
| tuner.dab.dls | string | - | DAB DLS |
| tuner.dab.ensemble_label | string | - | DAB-Beschriftung |
| tuner.dab.initial_scan_progress | number | - | DAB initialer Scanfortschritt 0-100 |
| tuner.dab.total_station_num | number | - | DAB total stations 0-255 |
| tuner.rds.program_type | string | - | RDS-Programmtyp |
| tuner.rds.program_service | string | - | RDS-Programmdienst |
| tuner.rds.radio_text_a | string | - | RDS-Text A |
| tuner.rds.radio_text_b | string | - | RDS-Text B |

### Uhr
Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| clock.auto_sync | boolean | x | Automatische Synchronisierung der Uhr |
| clock.format | string | x | Uhrzeitformat 12h / 24h |
| clock.alarm_on | boolean | x | Status des Weckalarms ein / aus |
| clock.volume | number | x | Clock alarm volume |
| clock.fade_interval | number | x | Intervall für das Weckalarmsignal |
| clock.fade_type | number | x | Fade-Typ für Clock-Alarm |
| clock.mode | string | x | Weckalarmmodus an einem Tag / pro Woche |
| clock.repeat | boolean | x | Weckalarm wiederholen, wenn ein Tag angegeben wird |
| clock. {day} .enable | boolean | x | Uhr Einstellungsgültigkeit |
uhr. {day} .time | string | - | Uhrzeit für den Weckalarm hhmm 00-23,00-59 |
| clock. {day} .beep | boolean | x | Gültigkeit des Signaltons |
uhr. {day} .playback_type | string | - | Wiedergabewiederholungstyp / voreingestellt |
uhr. {day}. resume_input | string | - | Clock alarm resume input ID |
| Uhr. {Tag} .preset_type | Zeichenfolge | - | Vorwahltyp für Uhralarm |
| Uhr. {Tag} .preset_num | Nummer | - | Vorgabeeingangs-ID für Uhralarm |
uhr. {day} .preset_netusb_input | string | - | Uhr alarm netusb input ID |
uhr. {day} .preset_netusb_text | string | - | Uhr alarm netusb text |
| Uhr. {Tag} .preset_tuner_band | Zeichenfolge | - | Uhr Wecker-Tuner-Band |
| Uhr. {Tag} .preset_tuner_number | number | - | Taktfrequenz des Radioweckers oder Stations-ID |

## Machen
* Unterstützung von Listen
* Änderung der Interaktionswerte in nette Namensgebung
* Fastforward / Fastrewind für NETUSB / CD
* Bluetooth
* Dialogebene

## Changelog
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

Copyright (c) 2018 foxthefox <foxthefox@wysiwis.net>