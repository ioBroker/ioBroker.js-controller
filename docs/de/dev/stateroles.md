---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/stateroles.md
title: Staatliche Rollen
hash: TyRDvFO26COB9IB5dLzOnd7bGkiptZ8UYCKCyrXG7Do=
---
# Staatsrollen
## Verbreitet
* state - sehr häufiger Zweck. Wenn Sie nicht wissen, welche Rolle der Staat hat, verwenden Sie diese.
* text (common.type = Zeichenfolge)
* text.url (common.type = string) state val enthält eine URL zur Verwendung in einem Anker, iframe oder img
* html (common.type = Zeichenfolge)
* json (common.type = string)
* list (common.type = array)
* date (common.type = string - durch "new Date (ddd)" - Zeichenfolge analysierbar
* Datum (allgemeiner Typ = Anzahl - Sekunden der Epoche * 1000

## Sensor (Booleans, schreibgeschützt)
*common.type = boolean, common.write = false*

* sensor.window - Fenster geöffnet (true) oder geschlossen (false)
* sensor.door - Tür geöffnet (true) oder geschlossen (false)
* sensor.alarm - ein allgemeiner Alarm
* sensor.alarm.flood - Wasserleckage
* sensor.alarm.fire - feuersensor
* sensor.alarm.secure - Die Tür ist geöffnet, das Fenster ist geöffnet oder die Bewegung wurde während des Alarms erkannt.
* sensor.alarm.power - Keine Stromversorgung (Spannung = 0)
* sensor.light - Rückmeldung von der Lampe, dass sie eingeschaltet ist
* sensor.lock - aktuelle Position der Verriegelung
* sensor.motion - Bewegungssensor
* sensor.rain - Regen erkannt
* sensor.noise - Rauschen erkannt

## Buttons (Booleans, nur zum Schreiben)
*common.type = boolean, common.write = true, common.read = false*

* Taste
* button.long
* button.stop - z. rollo stop,
* button.start
* button.open.door
* button.open.window
*button.mode.*
* button.mode.auto
* button.mode.manual
* button.mode.silent

## Werte (Zahlen, schreibgeschützt)
*common.type = number, common.write = false*

* Wert
* value.window (common.states = {"0": "CLOSED"), "1": "TILTED", "2": "OPEN"}) Es ist wichtig, dass (CLOSED / TILTED / OPEN) vorhanden ist. Werte können abweichen.
* value.temperatur (common.unit = '°C' oder '°F' oder 'K')
* wert.feuchtigkeit
* value.hellness - Leuchtdichte (Einheit: Lux,)
* value.min
* value.max
* value.default
* value.battery - Akkuladestand
* value.Ventil - Ventilebene
* value.time - getTime () des Date () - Objekts
* value.interval (common.unit = 'sec') - Intervall in Sekunden (kann 0,1 oder weniger sein)
* ~~ value.date (common.type = string) - Datum im Formular 2015.01.01 (ohne Uhrzeit) ~~
* ~~ value.datetime (common.type = string) - Datum und Uhrzeit im Systemformat ~~
* value.gps.longitude - GPS-Längenkoordinaten
* value.gps.latitude - gps Breitengrad
* value.gps.elevation - GPS-Höhe
* value.gps - Längengrad und Breitengrad zusammen wie '5.56; 43.45'
* value.power.consumption (Einheit = Wh oder KWh)
* value.direction - (common.type = number ~~ oder string ~~, zeigt auf / ab, links / rechts, 4-Wege-Schalter, Windrichtung, ...)
* value.curtain - aktuelle Position des Vorhangs
* value.blind - Istposition der Jalousie
* value.tilt - tatsächliche Neigungsposition
* value.lock - Istposition der Sperre
* value.speed - Windgeschwindigkeit
* value.pressure - (Einheit: mbar)
* value.distance
* value.distance.visibility
* value.severity - etwas Schweregrad (Zustände können angegeben werden), höher ist wichtiger
* value.warning - Warnung (Zustände können angegeben werden), Höher ist wichtiger
* value.sun.elevation - Sonnenstand in °
* value.sun.azimuth - Sonnenazimut in °
* wert.spannung - Spannung in Volt, Einheit = V
* value.current - Strom in Ampere, Einheit = A

## Indikatoren (boolean, schreibgeschützt)
*common.type = boolean, common.write = false*

Der Unterschied zwischen *Anzeigen* und *Sensoren* besteht darin, dass die Anzeigen als kleines Symbol angezeigt werden. Sensoren als echter Wert.
Der Indikator darf also nicht alleine im Kanal sein. Es muss ein anderer Hauptzustand innerhalb des Kanals sein.

* Anzeige
* Indicator.working - Gibt an, dass das Zielsystem etwas ausführt, beispielsweise Jalousien oder das Öffnen von Schlössern.
* Indicator.reachable - Wenn das Gerät online ist
* Indicator.connected - wird nur für Instanzen verwendet. Verwenden Sie Indicator.reachable für Geräte
* Indicator.maintenance - Zeigt Systemwarnungen / -fehler, Alarme, Servicemeldungen, leere Batterie oder ähnliches an
* Indikator.Wartung.Lustbat
* anzeige.wartung.unreach
* anzeige.wartung.alarm
* Indicator.lowbat - wahr, wenn die Batterie schwach ist
* Anzeige.Alarm - wie Anzeige.Wartung.Alarm
* Indicator.alarm.fire - Feuer erkannt
* Indicator.alarm.flood - Flut erkannt
* Indikator.alarm.Sicher - Tür oder Fenster werden geöffnet

## Stufen (Zahlen, Lese- und Schreibzugriff)
Mit **Stufen** können Sie einen Zahlenwert steuern oder einstellen.

*common.type = number, common.write = true*

* Niveau
* level.co2 - 0-100% Qualität
* level.dimmer - Die Helligkeit ist ebenfalls schwächer
* level.blind - Jalousieposition einstellen
* level.temperatur - gewünschte Temperatur einstellen
* level.Ventil - Sollwert für die Ventilstellung
* level.color.red
* level.color.green
* level.color.blue
* level.color.white - rgbW
* level.color.hue - Farbe in ° 0-360; 0 = rot, 120 = grün, 240 = blau, 360 = rot (zyklisch)
* level.color.saturation
* level.color.rgb - Hex-Farbe wie '#rrggbb'
* level.color.luminance
* Stufe.Farbtemperatur - Farbtemperatur in K ° 2200 warmweiß, 6500 ° kaltweiß
* level.timer
* level.timer.sleep - Sleep Timer. 0 - aus oder in Minuten
* ...
* level.volume - (min = 0, max = 100) - Lautstärke, aber min, max können abweichen. min <max
* level.volume.group - (min = 0, max = 100) - Lautstärke für die Gruppe von Geräten
* level.curtain - Legt die Position des Vorhangs fest
* level.tilt - Stellt die Neigungsposition der Jalousien ein

## Schalter (Booleans, Lese- und Schreibzugriff)
Schalter steuert boolesches Gerät (true = ON, false = OFF)

*common.type = boolean, common.write = true*

* Schalter
* switch.lock - lock (wahr - offenes Schloss, falsch - Schließsperre)
* switch.lock.door - Türschloss
* switch.lock.window - Fenstersperre
* switch.boost - Start / Stopp des Boost-Modus des Thermostats
* switch.light
* switch.comfort - Komfortmodus
* switch.enable
* switch.power - ein- / ausschalten
* Wechselmodus.*
* switch.mode.auto - Automatikmodus ein / aus
* switch.mode.manual - manueller Modus ein / aus
* switch.mode.silent - Silent-Modus ein / aus
* switch.mode.moonlight - Mondlichtmodus ein / aus
* switch.mode.color - Farbmodus ein / aus

## Media
Spezielle Rollen für Mediaplayer

* button.stop
* button.play
* button.next
* button.prev
* button.pause
* switch.pause
* button.forward
* button.reverse
* button.fastforward
* button.fastreverse
* button.volume.up
* button.volume.down
* media.seek - (common.type = number)%
* media.mode.shuffle - (common.type = number) 0 - keine, 1 - alle, 2 - eins
* media.mode.repeat - (common.type = boolean)
* media.state - ["play", "stop", "pause"] oder [0 - pause, 1 - play, 2 - stop] oder [true - play / false - Pause]
* Medienkünstler
* media.album
* media.title
* media.title.next
* media.cover - cover url
* media.cover.big - Big Cover-URL
* media.cover.small - winzige Cover-URL
* media.duration.text - z. B. "2:35"
* media.duration - (common.type = number) Sekunden
* media.elapsed.text - z. B. "1:30"
* media.elapsed - (common.type = number) Sekunden
* media.broadcastDate - (common.type = string) Sendedatum
* media.mute - (common.type = boolean) true ist stummgeschaltet
* media.season - (common.type = string) Saisonnummer (wichtig, dass der Typ wirklich "string" ist, um das Fehlen der Saison mit "" anzuzeigen)
* media.episode - (common.type = string) Episodenummer (wichtig, dass der Typ wirklich "string" ist, um das Fehlen einer Episode mit "" anzeigen zu können)
* media.mute.group - (common.type = boolean) Stummschaltung einer Gerätegruppe
* media.tts - Text zu Sprache
* media.bitrate - kbps
* media.genre - Genre-Song
* media.date - Jahreslied
* media.track - (common.type = string) Aktuelle Play-Track-ID [0 - ~] (wichtig, dass der Typ wirklich "String" ist, um das Fehlen eines Tracks mit "" anzeigen zu können)
* media.playid - ID des Medienplayers
* media.add - Aktuelle Wiedergabeliste hinzufügen
* media.clear - aktuelle Wiedergabeliste löschen (nur zum Schreiben)
* media.playlist - json array gefällt
* media.url - URL zum Abspielen oder aktuelle URL
* media.url.announcement - URL zum Abspielen der Ankündigung
* media.jump - Anzahl der Elemente, die in die Wiedergabeliste springen sollen (kann negativ sein)
* media.content - Typ der abgespielten Medien wie Audio / MP3
* media.link - Zustand der aktuellen Datei
* media.input - Nummer oder Zeichenfolge der Eingabe (AUX, AV, TV, SAT, ...)
* level.bass - Basspegel
* level.treble - Höhenpegel
* switch.power.zone - Leistungszone

```
[
    {
        "artist": "",
        "album": "",
        "bitrate":0,
        "title": "",
        "file": "",
        "genre": "",
        "year": 0,
        "len": "00:00",
        "rating": "",
        "cover": ""
    }
]
```

* media.browser - json array wie "files"

```
[
    {
        "fanart": "",
        "file": "",//smb://192.168.1.10/music/AtlantidaProject/
        "filetype": "", //directory
        "label": "",
        "lastmodified": "",
        "mimetype": "",
        "size": 0,
        "thumbnail": "",
        "title": "",
        "type": "",
        "lastmodified": "2016-02-27 16:05:46",
        "time": "88",
        "track": "01",
        "date": "2005",
        "artist": "yonderboy (H)",
        "album": "splendid isolation",
        "genre": "Trip-Hop"
    }
]
```

## Wetter
* value.temperatur - Isttemperatur
* value.temperature.windchill - Aktueller Windkühler
* value.temperature.dewpoint - Aktueller Taupunkt
* value.temperature.feelslike - Ist-Temperatur "fühlt sich an"
* value.temperature.min - Minimale Temperatur in den letzten 24 Stunden
* value.temperature.max - Maximale Temperatur in den letzten 24 Stunden
* value.feuchte - tatsächliche oder durchschnittliche Luftfeuchtigkeit
* value.feuchte.min - tatsächliche Luftfeuchtigkeit
* value.feuchte.max - tatsächliche Luftfeuchtigkeit
* value.speed.wind - tatsächliche oder durchschnittliche Windgeschwindigkeit
* value.speed.max.wind - maximale Windgeschwindigkeit in den letzten 24 Stunden
* value.speed.min.wind - minimale Windgeschwindigkeit in den letzten 24 Stunden
* value.speed.wind.gust - Istwindgeschwindigkeit
* value.direction.wind - tatsächliche oder durchschnittliche Windrichtung in Grad
* value.direction.max.wind - tatsächliche Windrichtung in Grad
* value.direction.min.wind - tatsächliche Windrichtung in Grad
* weather.direction.wind - tatsächliche oder durchschnittliche Windrichtung als Text, z. NNW
* date - aktuelles Datum oder Datum der zuletzt gelesenen Information
* date.sunrise - Sonnenaufgang für heute
* date.sunset - Sonnenuntergang für heute
* Wochentag - Wochentag als Text
* location - Textbeschreibung des Standorts (z. B. Adresse)
* weather.icon - Aktuelle Status-Symbol-URL
* weather.icon.wind - Aktuelle Wind-Icon-URL für jetzt
* weather.icon.name - Derzeitiger Status-Symbolname
* weather.state - Aktuelle Wetterbeschreibung
* value.precipitation - (Typ: Anzahl, Einheit: mm) Niederschlag für die letzten 24 Stunden Regen / Schnee (Niederschlag heute für Schnee oder Regen / Schnee)
* value.precipitation.hour - Aktueller Niederschlag in der letzten Stunde
* value.precipitation.today - Aktuelles Niederschlagsniveau für heute (bis 0:00 Uhr)
* value.strahlung - Aktueller Sonnenstrahlungspegel
* value.uv - aktueller UV-Wert
* value.clouds - Wolken am Himmel. 0% - keine Wolken, 100% - viele Wolken.
* value.rain - Aktueller Regenstand in den letzten 24 Stunden
* value.rain.hour - Aktueller Regenpegel in der letzten Stunde
* value.rain.today - Aktuelle Regenmenge für heute (bis 0:00 Uhr)
* value.snow - Tatsächlicher Schneelevel in den letzten 24 Stunden
* value.snow.hour - Tatsächlicher Schneelevel in der letzten Stunde
* value.snow.today - Tatsächlicher Schneehöhe für heute (bis 0:00 Uhr)
* value.snowline - Aktuelle Schneegrenze in Metern
* weather.chart.url - URL zum Diagramm der Wetterhistorie
* weather.chart.url.forecast - URL zum Chart der Wettervorhersage
* weather.html - HTML-Objekt mit Wetterbeschreibung
* weather.title - Sehr kurze Beschreibung
* weather.title.short - Sehr kurze Beschreibung (Ein Wort)
* weather.type - Art der Wetterinformationen
* weather.json - JSON-Objekt mit bestimmten Daten
* value.speed.wind.forecast.0 - Windvorhersage für heute
* weather.state.forecast.0 - Wetterbeschreibung für heute
* value.direction.wind.forecast.0 - Windrichtungsvorhersage für heute in Grad
* weather.direction.wind.forecast.0 - Windrichtungsvorhersage für heute als Text
* value.pressure.forecast.0 - Prognose für den Druck von heute
* value.temperature.min.forecast.0 - Minimale Temperaturprognose für heute
* value.temperature.max.forecast.0 - Maximale Temperaturprognose für heute
* value.precipitation.forecast.0 - (Typ: Anzahl, Einheit:%) Vorhersage der Niederschlagswahrscheinlichkeit für heute
* value.precipitation.forecast.0 - (Typ: Anzahl, Einheit: mm) Vorhersage des heutigen Niederschlagsniveaus
* weather.title.forecast.0 - Sehr kurze Beschreibung für morgen
* value.precipitation.day.forecast.0 - Vorhersage des Niederschlags für die Tageszeit
* value.precipitation.night.forecast.0 - Vorhersage für Niederschlag in der Nacht

* date.forecast.1 - morgen datum
* weather.icon.forecast.1 - Das Symbol für morgen
* weather.state.forecast.1 - morgen Wetterzustand
* value.temperature.min.forecast.1
* value.temperature.max.forecast.1
* value.precipitation.forecast.1 - (Typ: Anzahl, Einheit:%) Vorhersage der Niederschlagswahrscheinlichkeit für morgen
* value.precipitation.forecast.1 - (Typ: Anzahl, Einheit: mm) Vorhersage des Niederschlagsniveaus für morgen
* value.direction.wind.forecast.1
* value.speed.wind.forecast.1
* value.pressure.forecast.1

## Info
* info.ip - IP des Geräts
* info.mac - mac des Geräts
* info.name - Name des Geräts
* info.address - eine andere Adresse (z. B. KNX)
* info.port - TCP-Port
* info.standby - wahr, wenn sich das Gerät im Standby-Modus befindet
* info.status - Status des Geräts
* info.display - Informationen, die auf dem Gerätedisplay angezeigt werden
* date.start - Zeichenfolge oder Nummer
* date.end - String oder Nummer

## Andere
* url
* url.icon - icon (zusätzlich kann jedes Objekt common.icon haben)
* url.cam - Webkamera-URL
* url.blank - URL in neuem Fenster öffnen
* url.same - URL in diesem Fenster öffnen
* url.audio - URL für Audiodatei
* text.phone - Telefonnummer

* adapter.messagebox (common.type = object, common.write = true) zum Senden von Nachrichten an E-Mail-, Pushover- und andere Adapter
* adapter.wakeup (common.type = boolean, common.write = true) aktiviert den Adapter aus dem Suspend-Modus