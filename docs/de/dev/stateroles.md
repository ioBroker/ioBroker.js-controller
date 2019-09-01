---
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/stateroles.md
title: Rollen von Datenpunkten
hash: syC9htxAnnv0AgMriyuXpe6GqkUOZNtl226RMjG91Io=
---
# Rollen (roles) von Datenpunkten
## Allgemein
* state - sehr allgemeiner Zweck. Zu verwenden, wenn unbekannt ist, welche Rolle der Datenpukt hat.
* text (common.type = string)
* text.url (common.type = string) state val enthält eine URL zur Verwendung in einem Anker, Iframe oder img
* html (common.type = string)
* json (common.type = string)
* list (common.type = array)
* date (common.type = string - kann mit der Zeichenfolge "new Date (ddd)" analysiert werden)
* date (common.type = number - Sekunden * 1000)

## Sensor (Boolescher Wert, schreibgeschützt)
*common.type = boolean, common.write = false*

* sensor.window - Fenster geöffnet (true) oder geschlossen (false)
* sensor.door - Tür geöffnet (true) oder geschlossen (false)
* sensor.alarm - ein häufiger Alarm
* sensor.alarm.flood - Wasserleckage
* sensor.alarm.fire - Feuersensor
* sensor.alarm.secure - Tür geöffnet, Fenster geöffnet oder Bewegung erkannt, während der Alarm eingeschaltet ist.
* sensor.alarm.power - Kein Strom (Spannung = 0)
* sensor.light - Rückmeldung der Lampe, dass sie eingeschaltet ist
* sensor.lock - aktuelle Position des Schlosses
* sensor.motion - Bewegungssensor
* sensor.rain - Regen erkannt
* sensor.noise - Geräusch erkannt

## Tasten (Boolscher Wert, nur Schreiben)
*common.type = boolean, common.write = true, common.read = false*

* button
* button.long
* button.stop - z. rollo halt,
* button.start
* button.open.door
* button.open.window
* button.mode.*
* button.mode.auto
* button.mode.manual
* button.mode.silent

## Werte (Zahlen, schreibgeschützt)
*common.type = number, common.write = false*

* value
* value.window (common.states = {"0": "CLOSED", "1": "TILTED", "2": "OPEN"}) Es ist wichtig (CLOSED / TILTED / OPEN) zu haben. Werte können abweichen.
* value.temperature (common.unit = '°C' oder '°F' oder 'K')
* value.humidity
* value.brightness - Beleuchtungsstärke (Einheit: Lux,)
* value.min
* value.max
* value.default
* value.battery - Batteriestand
* value.valve - Ventilebene
* value.time - getTime () des Date () -Objekts
* value.interval (common.unit = 'sec') - Intervall in Sekunden (kann 0,1 oder weniger betragen)
* value.date (common.type = string) - Datum in der Form 2015.01.01 (ohne Uhrzeit)
* value.datetime (common.type = string) - Datum und Uhrzeit im Systemformat
* value.gps.longitude - GPS-Längenkoordinaten
* value.gps.latitude - GPS-Breite
* value.gps.elevation - GPS-Höhe
* value.gps - Länge und Breite zusammen wie '5.56; 43.45'
* value.power.consumption (Einheit = Wh oder kWh)
* value.direction - Richtung
* value.curtain - Istposition des Vorhangs
* value.blind - Istposition der Jalousie
* value.tilt - tatsächliche Neigungsposition
* value.lock - aktuelle Position des Schlosses
* value.speed - Windgeschwindigkeit
* value.pressure - (Einheit: mbar)
* value.distance - Abstand, Entfernung
* value.distance.visibility - Sichtbarkeit
* value.severity - etwas Dringlichkeit (Zustände können zur Verfügung gestellt werden), höher ist wichtiger
* value.warning - einige Warnung (Zustände können zur Verfügung gestellt werden), höher ist wichtiger
* value.sun.elevation - Sonnenstand in °
* value.sun.azimuth - Sonnenazimut in °
* value.voltage - Spannung, Einheit = V
* value.current - Strom, Einheit = A
* value.fill - Füllstand, Einheit = l, ml, m3,%
* value.blood.sugar - Blutzuckerwert, Einheit = mmol, mgdl

## Indikatoren (Boolean, schreibgeschützt)
*common.type = boolean, common.write = false*

Der Unterschied von *Indikatoren* zu *Sensoren* besteht darin, dass Indikatoren als kleines Symbol angezeigt werden. Sensoren als realer Wert.
Die Anzeige darf also nicht alleine im Kanal sein. Es muss sich um einen anderen Hauptstatus im Kanal handeln.

* indicator
* indicator.working - Zeigt an, dass das Zielsystem gerade etwas ausführt, z. B. Jalousien oder das Öffnen von Sperren.
* indicator.reachable - Wenn das Gerät online ist
* indicator.connected - wird nur für Instanzen verwendet. Verwenden Sie indicator.reachable für Geräte
* indicator.maintenance - zeigt Systemwarnungen / -fehler, Alarme, Servicemeldungen, Batterie leer oder ähnliches an
* indicator.maintenance.lowbat
* indicator.maintenance.unreach
* indicator.maintenance.alarm
* indicator.lowbat - wahr, wenn die Batterie schwach ist
* indicator.alarm - Entspricht indicator.maintenance.alarm
* indicator.alarm.fire - Feuer erkannt
* indicator.alarm.flood - Flut erkannt
* indicator.alarm.secure - Tür oder Fenster ist geöffnet
* indicator.alarm.health - Gesundheitsproblem

## Niveau / Pegel (Zahlen, Lese- und Schreibzugriff)
Mit **Niveau** können Zahlenwerte gesteuert oder eingestellt werden.

*common.type = number, common.write = true*

* level
* level.co2 - 0-100% Luftqualität
* level.dimmer - Helligkeit ist auch gedimmt
* level.blind - Jalousieposition einstellen
* level.temperature - Temperatursollwert
* level.valve - Sollwert für die Ventilposition
* level.color.red
* level.color.green
* level.color.blue
* level.color.white - rgbW
* level.color.hue - Farbe in ° 0-360; 0 = rot, 120 = grün, 240 = blau, 360 = rot (zyklisch)
* level.color.saturation
* level.color.rgb - hexadezimale Farbe wie '#rrggbb'
* level.color.luminance
* level.color.temperature - Farbtemperatur in K ° 2200 warmweiß, 6500 kaltweiß
* level.timer
* level.timer.sleep - Sleep-Timer. 0 - aus oder in Minuten
* ...
* level.volume - (min = 0, max = 100) - Lautstärke, aber min, max können abweichen. min <max
* level.volume.group - (min = 0, max = 100) - Lautstärke für die Gerätegruppe
* level.curtain - Vorhangposition einstellen
* level.tilt - Stellt die Neigungsposition der Jalousien ein

## Schalter (Boolesche Werte, Lese- und Schreibzugriff)
Schalter steuert boolesches Gerät (true = ON, false = OFF)

*common.type = boolean, common.write = true*

* switch
* switch.lock - lock (true - open lock, false - close lock)
* switch.lock.door - Türschloss
* switch.lock.window - Fenstersperre
* switch.boost - Start / Stopp-Boost-Modus des Thermostats
* switch.light
* switch.comfort - Komfortmodus
* switch.enable - Freigabe
* switch.power - Ein- / Ausschalten
* switch.mode.*
* switch.mode.auto - automatischer Modus ein / aus
* switch.mode.manual - manueller Modus ein / aus
* switch.mode.silent - Stummschaltung ein / aus
* switch.mode.moonlight - Mondlichtmodus ein / aus
* switch.mode.color - Farbmodus ein / aus

## Media
Sonderrollen für Mediaplayer

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
* media.state - ['abspielen', 'anhalten', 'anhalten'] oder [0 - anhalten, 1 - abspielen, 2 - anhalten] oder [wahr - abspielen / falsch - anhalten]
* media.artist - Künstler
* media.album
* media.title
* media.title.next
* media.cover - cover url
* media.cover.big - big cover url
* media.cover.small - winzige Cover-URL
* media.duration.text - z. B. "2:35"
* media.duration - (common.type = number) Sekunden
* media.elapsed.text - z. B. "1:30"
* media.elapsed - (common.type = number) Sekunden
* media.broadcastDate - (common.type = string) Übertragungsdatum
* media.mute - (common.type = boolean) true ist stummgeschaltet
* media.season - (common.type = string) Saisonnummer (wichtig, der Typ ist wirklich "string", um das Fehlen einer Saison mit "" anzeigen zu können)
* media.episode - (common.type = string) Episodennummer (wichtig, der Typ ist wirklich "string", um das Fehlen einer Episode mit "" anzeigen zu können)
* media.mute.group - (common.type = boolean) Stummschaltung einer Gerätegruppe
* media.tts - Text zu Sprache
* media.bitrate - kbps
* media.genre - Genre-Song
* media.date - Jahreslied
* media.track - (common.type = string) aktuelle Play-Track-ID [0 - ~] (wichtig, der Typ ist wirklich "string", um das Fehlen eines Tracks mit "" anzeigen zu können)
* media.playid - Track-ID des Media Players
* media.add - aktuelle Wiedergabeliste hinzufügen
* media.clear - Aktuelle Wiedergabeliste löschen (nur Schreiben)
* media.playlist - json array like
* media.url - zu spielende URL oder aktuelle URL
* media.url.announcement - URL zum Abspielen der Ansage
* media.jump - Anzahl der zu überspringenden Elemente in der Wiedergabeliste (kann negativ sein)
* media.content - Art der wiedergegebenen Medien wie Audio / MP3
* media.link - Status mit der aktuellen Datei
* media.input - Nummer oder Zeichenfolge des Eingangs (AUX, AV, TV, SAT, ...)
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

* media.browser - JSON-Array wie "Dateien"

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
* value.temperature - Aktuelle Temperatur
* value.temperature.windchill - gefühlte Temperatur mit Wind
* value.temperature.dewpoint - Taupunkt
* value.temperature.feelslike - Aktuelle Temperatur "fühlt sich an wie"
* value.temperature.min - Minimale Temperatur in den letzten 24 Stunden
* value.temperature.max - Maximale Temperatur in den letzten 24 Stunden
* value.humidity - aktuelle oder durchschnittliche Luftfeuchtigkeit
* value.humidity.min - minimale Luftfeuchtigkeit
* value.humidity.max - maximale Luftfeuchtigkeit
* value.speed.wind - aktuelle oder durchschnittliche Windgeschwindigkeit
* value.speed.max.wind - maximale Windgeschwindigkeit in den letzten 24 Stunden
* value.speed.min.wind - minimale Windgeschwindigkeit in den letzten 24 Stunden
* value.speed.wind.gust - Windböengeschwindigkeit
* value.direction.wind - aktuelle oder durchschnittliche Windrichtung in Grad
* value.direction.max.wind - max. Windrichtung in Grad
* value.direction.min.wind - min. Windrichtung in Grad
* weather.direction.wind - aktuelle oder durchschnittliche Windrichtung als Text, z. NNW
* date - aktuelles Datum oder Datum der letzten gelesenen Information
* date.sunrise - Sonnenaufgang für heute
* date.sunset - Sonnenuntergang für heute
* weekday - Wochentag als Text
* location - Textbeschreibung des Standorts (z. B. Adresse)
* weather.icon - Aktuelle URL für Statussymbol
* weather.icon.wind - Aktuelle URL für Windsymbole
* weather.icon.name - Name des aktuellen Statussymbols für den Moment
* weather.state - Aktuelle Wetterbeschreibung
* value.precipitation - (type: number, unit: mm) Niederschlag der letzten 24 Stunden (Niederschlag heute für Schnee oder Regen)
* value.precipitation.hour - Niederschlagsmenge in der letzten Stunde
* value.precipitation.today - Niederschlagsmenge für heute (bis 0:00)
* value.radiation - Sonneneinstrahlung
* value.uv - UV-Wert
* value.clouds - Wolken am Himmel. 0% - keine Wolken, 100% - viele Wolken.
* value.rain - Regenpegel in den letzten 24 Stunden
* value.rain.hour - Regenpegel in der letzten Stunde
* value.rain.today - Regenpegel für heute (bis 0:00)
* value.snow - aktuelle Schneehöhe
* value.snow.hour - Schneefall in der letzten Stunde
* value.snow.today - Schneefall für heute (bis 0:00)
* value.snowline - Schneegrenze in Metern über NN
* weather.chart.url - URL zur Anzeige des Wetterverlaufs
* weather.chart.url.forecast - URL für die Wettervorhersage
* weather.html - HTML-Objekt mit Wetterbeschreibung
* weather.title - Titel
* weather.title.short - Sehr sehr kurze Beschreibung (Ein Wort)
* weather.type - Art der Wetterinformationen
* weather.json - JSON-Objekt mit bestimmten Daten
* value.speed.wind.forecast.0 - Windgeschwindigkeitsprognose für heute
* weather.state.forecast.0 - Wetterbeschreibung für heute
* value.direction.wind.forecast.0 - Windrichtungsvorhersage für heute in Grad
* weather.direction.wind.forecast.0 - Windrichtungsvorhersage für heute als Text
* value.pressure.forecast.0 - Vorhersage des Drucks für heute
* value.temperature.min.forecast.0 - Minimale Temperaturprognose für heute
* value.temperature.max.forecast.0 - Maximale Temperaturprognose für heute
* value.precipitation.forecast.0 - (type: number, unit:%) Vorhersage der Niederschlagschance für heute
* value.precipitation.forecast.0 - (type: number, unit: mm) Vorhersage des Niederschlagsniveaus für heute
* weather.title.forecast.0 - Sehr kurze Beschreibung für morgen
* value.precipitation.day.forecast.0 - Vorhersage des Niederschlags für die Tageszeit
* value.precipitation.night.forecast.0 - Vorhersage für Niederschlag in der Nacht

* date.forecast.1 - Datum von morgen
* weather.icon.forecast.1 - Symbol für morgen
* weather.state.forecast.1 - Wetterzustand von morgen
* value.temperatur.min.forecast.1
* value.temperatur.max.forecast.1
* value.precipitation.forecast.1 - (type: number, unit:%) Vorhersage der Niederschlagschance für morgen
* value.precipitation.forecast.1 - (type: number, unit: mm) Vorhersage des Niederschlagsniveaus für morgen
* value.direction.wind.forecast.1
* value.speed.wind.forecast.1
* value.pressure.forecast.1

## Info
* info.ip - IP des Geräts
* info.mac - Mac des Geräts
* info.name - Name des Geräts
* info.address - eine andere Adresse (z. B. KNX)
* info.port - TCP-Port
* info.standby - true, wenn sich das Gerät im Standby-Modus befindet
* info.status - Status des Geräts
* info.display - Informationen werden auf dem Gerätedisplay angezeigt
* date.start - Zeichenfolge oder Nummer
* date.end - Zeichenfolge oder Nummer

## Andere
* url
* url.icon - icon (zusätzlich kann jedes Objekt common.icon haben)
* url.cam - URL der Webkamera
* url.blank - URL in neuem Fenster öffnen
* url.same - URL in diesem Fenster öffnen
* url.audio - URL für Audiodatei
* text.phone - Telefonnummer

* adapter.messagebox (common.type = object, common.write = true) zum Senden von Nachrichten an E-Mail, Pushover und andere Adapter
* adapter.wakeup (common.type = boolean, common.write = true) Aktiviert den Adapter aus dem angehaltenen Modus
