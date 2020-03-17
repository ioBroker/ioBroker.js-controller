---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mihome-vacuum/README.md
title: ioBroker Mihome-Vakuumadapter
hash: jgAFr69EafUJFMKZTLdoBfXb9BHAbRyRHuy0LScVqGQ=
---
![Logo](../../../en/adapterref/iobroker.mihome-vacuum/admin/mihome-vacuum.png)

![Anzahl der Installationen](http://iobroker.live/badges/mihome-vacuum-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.mihome-vacuum.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mihome-vacuum.svg)
![Tests](https://travis-ci.org/iobroker-community-adapters/ioBroker.mihome-vacuum.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.mihome-vacuum.png?downloads=true)

# IoBroker Mihome-Vakuumadapter
[Deutsche beschreibung hier](README_de.md)

Mit diesem Adapter können Sie den Xiaomi-Staubsauger steuern.

## Inhalt
- [Setup] (# Konfiguration)
    - [Adapter konfigurieren] (# Adapterkonfiguration)
        - [Kontrolle über Alexa] (# Kontrolle über Alexa)
        - [Zweiter Roboter] (# zweiter Roboter)
    - [Valetudo konfigurieren] (# valetudo-config)
- [Funktionen] (# Funktionen)
    - [S50-Befehle] (# Befehle-des-s50)
    - [Gehe zu] (# gehe zu)
- [zone Clean] (# zoneclean)
    - [Zimmer] (# Zimmer)
    - [Timer] (# Timer)
    - [Eigene Befehle] (# send-your-own-Befehle)
    - [sendTo hook] (# send-custom-befehle-with-sendto)
- [Widget] (# Widget)
- [Bugs] (# Bugs)
- [Changelog] (# changelog)

## Aufbau
Derzeit ist das Finden des Tokens das größte Problem.
Bitte folgen Sie den Anweisungen im Link:

[Token Turorial](https://www.smarthomeassistent.de/token-auslesen-roborock-s6-roborock-s5-xiaomi-mi-robot-xiaowa/).

### Fehler bei der Installation
wenn Ihre Installation fehlerhaft ausgeführt wird. Das Canvas-Paket konnte nicht installiert werden

`` npm ERR! canvas@2.6.1 install: node-pre-gyp install --fallback-to-build npm ERR! Beenden Sie den Status 1``

Bitte installieren Sie canvas und die Bibliotheken manuell mit:

`` sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev ``

`` sudo npm install canvas --unsafe-perm = true ``

### Adapterkonfiguration
- Für die IP-Adresse muss die IP-Adresse des Roboters im Format "192.168.178.XX" eingegeben werden.
- Der Port des Roboters ist standardmäßig auf "54321" eingestellt, dies sollte nicht geändert werden
- Eigener Port, sollte nur mit zweitem Roboter gewechselt werden
- Abfrageintervall Die Zeit in ms, in der die Statuswerte des Roboters abgerufen werden (sollte nicht <10000 sein).

#### Kontrolle über Alexa
In der Konfiguration wird der Status "Alexa hinzufügen" aktiviert. Hier wird ein Hack gesetzt. Ein zusätzlicher Status "clean_home" ist ein Schalter, der bei "true" des Saugers beginnt und bei "false" nach Hause geht. Er wird automatisch zu einem intelligenten Gerät in der Cloud Adapter mit dem Namen "Staubsauger" erstellt, der im Cloud-Adapter geändert werden kann.

#### Setzen Sie die angehaltene Zonenreinigung mit der Starttaste fort
Wenn diese Option aktiviert ist, setzt das Vakuum die Zonenreinigung fort, wenn der Status "Start" auf "true" gesetzt wird, wenn er während einer laufenden Zonenreinigung angehalten wurde.
Wenn diese Option deaktiviert ist, startet das Vakuum beim Senden des Startbefehls eine neue "normale Reinigung", auch wenn diese während einer laufenden Zonenreinigung angehalten wurde.

- Experimentell: Mit dem Kontrollkästchen "Eigene Befehle senden" werden Objekte erstellt, über die Sie Ihre eigenen Befehle an den Roboter senden und empfangen können.

#### Zweiter Roboter
Wenn zwei Roboter über ioBroker gesteuert werden sollen, müssen zwei Instanzen erstellt werden. Der zweite Roboter muss seinen eigenen Port ändern (Standard: 53421), damit beide Roboter unterschiedliche Ports haben.

## Map Config
Es gibt zwei Möglichkeiten, um die Karte zu erhalten. Die ersten holen die Karte aus der Cloud. Dazu müssen Sie sich anmelden und den richtigen Roboter aus der Liste auswählen

Der zweite Weg ist die Karte von Valetudo (nur lokale Verbindung). Dafür müssen Sie valetudo rooten und auf Ihrem Gerät installieren. Vatudo können Sie [Valetudo RE] (https://github.com/rand256/valetudo) oder normal [Valetudo](https://github.com/Hypfer/Valetudo) verwenden

![Konfig](../../../en/adapterref/iobroker.mihome-vacuum/admin/valetudo_conf.png)

- Um die Karte zu verwenden, müssen Sie in der Konfiguration Valetudo oder Originalkarte auswählen
- Das Anforderungsintervall muss mehr als 1000 ms betragen. Dies ist das Intervall für die Aktualisierung der HTML-Map
- Das Kartenintervall muss länger als 5000 ms sein. Dieses Intervall aktualisiert die PNG-Kartendatei (Sie können dies für Telegramm oder Vis oder irgendetwas anderes verwenden.)
- Farbe dort können Sie die Farben für das Kartenbeispiel auswählen:

```
- #2211FF
- rbg(255,200,190)
- rgba(255,100,100,0.5) //for Transparent
- green
```

- Roboter dort können Sie verschiedene Roboter oder andere Fahrzeuge für die Karte auswählen

### Karten-Widget
Um die Karte anzuzeigen, können Sie ein normales HTML-Widget verwenden, z.

```
[{"tpl":"tplHtml","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","refreshInterval":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"html":"{mihome-vacuum.0.map.map64}"},"style":{"left":"0","top":"0","width":"100%","height":"100%"},"widgetSet":"basic"}]
```

Die zweite Möglichkeit besteht darin, ein src img-Widget zu verwenden, um die PNG-Datei zu integrieren. Aber die HTML-Ansicht ist schneller, es ist wie eine Live-Ansicht.

## Funktionen
### Befehle des S50 (zweite Generation)
Die Kartengröße beträgt immer 52000 mm x 52000 mm, daher sind Werte von 0 bis 51999 mm möglich.
Leider kann die Position und Position der Karte nicht abgefragt werden, dies kann sich von Saugen zu Saugen ändern. Als Basis dient immer die letzte Saugkarte sowie in der App.
Wenn der Roboter nur einen Bereich aufnimmt und die Karte immer auf die gleiche Weise erstellt, können Sie sie zuverlässig an Orte senden oder den Bereich staubsaugen lassen.

#### Gehe zu
Um den Staubsauger auf einen Punkt zu bringen, muss das Objekt "goTo" wie folgt gefüllt werden:

```
xVal, yval
```

Die Werte müssen den oben genannten Gültigkeitsbereich erfüllen und die x- und y-Koordinaten auf der Karte angeben.

Beispiel:

```
24,850.26500
```

#### ZoneClean
Um eine Zone abzusaugen, muss ZoneClean wie folgt gefüllt werden:

```
[X1, y1, x2, x2, count]
```

Wobei x und y die Koordinaten des rechteckigen Bereichs sind und die Reinigungsvorgänge "zählen".
Sie können auch mehrere Bereiche gleichzeitig saugen lassen:

```
[X1, y1, x2, x2, count], [x3, y3, x4, x4, count2]
```

Beispiel:

```
[24117,26005,25767,27205,1], [24320,24693,25970,25843,1]
```

#### Räume
Neuerer Staubsauger mit der neuesten Home App unterstützt die Definition von Räumen, siehe [Video](https://www.youtube.com/watch?v=vEiUZzoXfPg)

Jeder Raum in der aktuellen Karte verfügt über einen Index, der dann über die App dem Raum zugewiesen wird. Vom Roboter erhalten wir nur eine Zuordnung mit Raumnummer und Index. Der Adapter fragt diese Räume bei jedem Start des Adapters ab und erstellt für jeden Raum einen Kanal, der dann den aktuellen Raumindex kennt. Das gleiche passiert manuell mit der Schaltfläche loadRooms. Dieser Kanal kann dann den ioBroker-Räumen zugewiesen werden. Wenn die Taste roomClean gedrückt wird, wird der Index der Karte ermittelt und an den Roboter gesendet, damit dieser diesen Raum absaugen kann. Zuvor ist die Lüfterleistung auf Einzelraumabsaugung eingestellt. Wenn Sie noch nicht die Möglichkeit haben, die Räume in der App zu benennen, besteht auch die Möglichkeit, einen solchen Kanal manuell durch Angabe des Kartenindex zu erstellen. Es ist auch möglich, Zonenkoordinaten anstelle von mapIndex hinzuzufügen.
Wenn Sie mehrere Räume spontan reinigen möchten, können Sie dies über multiRoomClean tun, indem Sie die ioBroker-Räume diesem Datenpunkt zuweisen und dann die Taste drücken.

#### Timer
Sobald der Staubsauger die Raumfunktion unterstützt (siehe oben), können auch Timer erstellt werden, die dann die entsprechenden Raumkanäle auslösen oder deren mapIndexe ermitteln.
Der Timer kann direkt über Räume und / oder Raumkanäle ausgelöst werden.
Die Timer selbst werden über den Konfigurationsbereich erstellt, werden dann aber zu einem Datenpunkt. Dort kann jeder Timer einmal aktiviert / deaktiviert oder übersprungen werden. Ein direkter Start ist ebenfalls möglich. Der Vorteil der ioBroker-Timer besteht darin, dass sie im VIS angezeigt und verwendet werden können und Sie den Roboter vom Internet trennen können, da die Timer der App von China aus ausgelöst werden.

### Senden Sie Ihre eigenen Befehle
HINWEIS: Diese Funktion sollte nur von Experten verwendet werden, da der Sauger durch falsche Befehle beschädigt werden kann

Der Roboter unterscheidet zwischen den Befehlen in Methoden (Methoden) und Parametern (Parametern), die zur Angabe der Methoden dienen.
Unter dem Objekt "mihome-vakuum.X.control.X_send_command" können Sie Ihre eigenen Befehle an den Roboter senden.
Die Objektstruktur muss wie folgt aussehen: Methode; [params]

Unter dem Objekt "mihome-vakuum.X.control.X_get_response" wird die Antwort vom Roboter nach dem Senden eingegeben. Wenn Parameter abgefragt wurden, werden sie hier im JSON-Format angezeigt. Wenn nur ein Befehl gesendet wurde, antwortet der Roboter nur mit "0".

Die folgenden Methoden und Parameter werden unterstützt:

| Methode | params | Beschreibung |
|-----------      |-------                                                              |-------------------                                                                                     |
| get_timer | | Gibt den eingestellten Timer zurück. Einstellen der Saugzeiten BSp. 12 Uhr 30 in 5 Tagen |
| set_timer | [["TIME_IN_MS", ["30 12 * * 1,2,3,4,5", ["start_clean", ""]]] | Timer aktivieren / deaktivieren |
| upd_timer | ["1481997713308", "Ein / Aus"] | |
| | | Rettet die Zeiten des Do Not Distrube |
| get_dnd_timer | | DND-Zeiten löschen |
| close_dnd_timer | | DND Einstellung h, min, h, min |
| set_dnd_timer | [22,0,8,0] | |
|                 |                                                                     |                                                                                                        |
| app_rc_start | | Starten Sie Romote Control |
| app_rc_end | | Beenden Sie die Fernbedienung |

| app_rc_move | [{"seqnum": '0-1000', "Geschwindigkeit": VALUE1, "Omega": VALUE2, "Dauer": VALUE3}] | Bewegung. Die Sequenznummer muss fortlaufend sein, VALUE1 (Geschwindigkeit) = -0,3-0,3, VALUE2 (Drehung) = -3,1-3,1, VALUE3 (Dauer)

Weitere Methoden und Parameter finden Sie hier ([Verknüpfung](https://github.com/MeisterTR/XiaomiRobotVacuumProtocol)).

### Benutzerdefinierte Befehle mit sendTo senden
Sie können diese benutzerdefinierten Befehle auch von anderen Adaptern mit `sendTo` senden. Verwendung mit `method_id` und `params` wie oben definiert:

```
sendTo("mihome-vacuum.0", "sendCustomCommand",
    {method: "method_id", params: [...] /* optional*/},
    function (response) { /* do something with the result */}
);
```

Das Objekt `response` hat zwei Eigenschaften: `error` und (falls kein Fehler aufgetreten ist) `result`.

Auf diese Weise können auch einige vordefinierte Befehle ausgegeben werden:

```
sendTo("mihome-vacuum.0",
    commandName,
    {param1: value1, param2: value2, ...},
    function (response) { /* do something with the result */}
);
```

Die unterstützten Befehle sind:

| Beschreibung | `commandName` | Erforderliche Parameter | Bemerkungen |
| Reinigungsvorgang starten | `startVacuuming` | - Keine - | |
| Stoppen Sie den Reinigungsvorgang `stopVacuuming` | - Keine - | |
| Unterbrechen Sie den Reinigungsvorgang `pause` | - Keine - | |
| Wartejobs löschen | `clearQueue` | - Keine - | |
| Reinigen Sie einen kleinen Bereich um den Roboter herum `cleanSpot` | - Keine - | |
| Gehe zurück zur Basis | `charge` | - Keine - | |
| Sag "Hallo, ich bin hier!" | `findMe` | - Keine - | |
| Überprüfen Sie den Status der Verbrauchsmaterialien (Bürste usw.) `getConsumableStatus` | - Keine - | |
| Status der Verbrauchsmaterialien (Bürste usw.) zurücksetzen | `resetConsumables` | `resetConsumables` | `consumable` | Zeichenfolge: filter_work_time, filter_element_work_time, sensor_dirty_time, main_brush_work_time, side_brush_work_time |
| Erhalten Sie eine Zusammenfassung aller vorherigen Reinigungsprozesse `getCleaningSummary` | - Keine - | |
| Erhalten Sie eine detaillierte Zusammenfassung eines früheren Reinigungsprozesses `getCleaningRecord` | `recordId` | |
| Holen Sie sich eine Karte | `getMap` | - Keine - | Unbekannt, was mit dem Ergebnis zu tun ist |
| Ruft den aktuellen Status des Roboters ab `getStatus` | - Keine - | |
| Rufen Sie die Seriennummer des Roboters ab `getSerialNumber` | - Keine - | |
| Detaillierte Geräteinformationen abrufen | `getDeviceDetails` | - Keine - | |
| Rufen Sie den Timer *nicht stören* | ab `getDNDTimer` | - Keine - | |
| Stellen Sie einen neuen *nicht stören* Timer | ein `setDNDTimer` | `startHour`, `startMinute`, `endHour`, `endMinute` | |
| Löschen Sie den Timer *nicht stören* | `deleteDNDTimer` | - Keine - | |
| Rufen Sie die aktuelle Lüftergeschwindigkeit ab `getFanSpeed` | - Keine - | |
| Stellen Sie eine neue Lüftergeschwindigkeit ein | `setFanSpeed` | `fanSpeed` | `fanSpeed` ist eine Zahl zwischen 1 und 100 |
| Starten Sie die Fernbedienungsfunktion | `startRemoteControl` | - Keine - | |
| Geben Sie einen Verschiebungsbefehl für die Fernbedienung aus `move` | `velocity`, `angularVelocity`, `duration`, `sequenceNumber` | Die Sequenznummer muss fortlaufend sein. Die Dauer ist in ms |
| Beenden Sie die Fernbedienungsfunktion | `stopRemoteControl` | - Keine - | |
| Reinraum / Zimmer | `cleanRooms` | `rooms` | `rooms` ist ein durch Kommas getrennter String mit enum.rooms.XXX |
| sauberes Segment | `cleanSegments` | `rooms` | `rooms` ist ein Array mit mapIndex oder ein durch Kommas getrennter String mit mapIndex |
| saubere Zone | `cleanZone` | `coordinates` | `coordinates` ist ein String mit Koordinaten und Anzahl, siehe [zoneClean](#zoneClean) |
| saubere Zone | `cleanZone` | `Koordinaten` | `Koordinaten` ist ein String mit Koordinaten und Anzahl, siehe [zoneClean] (# zoneClean) |

## Widget
Entschuldigung, noch nicht fertig.
![Widget](../../../en/adapterref/iobroker.mihome-vacuum/widgets/mihome-vacuum/img/previewControl.png)

## Bugs
- gelegentliche Unterbrechungen, dies ist jedoch nicht auf den Adapter zurückzuführen, sondern meist auf seine eigenen Netzwerke
- Widget zu der Zeit ohne Funktion

## Changelog
### 2.0.9 (2020-03-05)
* (dirkhe) add state info for room channels and change queue info from number to JSON
### 2.0.8 (2020-02-26)
* (dirkhe) decreased communication with robot
### 2.0.7 (2020-02-25)
* (dirkhe) add Resuming after pause for rooms
### 2.0.6 (2020-02-17)
* (MeisterTR) add roooms for s50 with map (cloud or Valetudo needed)
### 2.0.4 (2020-02-13)
* (MeisterTR) add cloud login to get token
* (MeisterTR) add cloud Map
* (MeisterTR) add new and old Map format
* (MeisterTR) rebuild config page
### 1.10.5 (2020-02-11)
* send Ping only if not connected, otherwise get_status
* set button states to true, if clicked
* move Timermanager and roomManager to own libs

### 1.10.4 (2020-02-06)
* (MeiserTR) add valetudo map support for gen3 and gen2 2XXX
### 1.10.1 (2020-01-20)
* (dirkhe) added zone as room handling
* (dirkhe) timer could room channels directly

### 1.10.0 (2020-01-17)
* (dirkhe) added room handling
* (dirkhe) added Timer 
* (dirkhe) changed featurehandling 

### 1.1.6 (2018-12-06)
* (JoJ123) Added fan speed for MOP (S50+).

### 1.1.5 (2018-09-02)
* (BuZZy1337) Added description for Status 16 and 17 (goTo and zonecleaning).
* (BuZZy1337) Added setting for automatic resume of paused zonecleaning.

### 1.1.4 (2018-08-24)
* (BuZZy1337) Added possibility to resume a paused zoneclean (State: mihome-vacuum.X.control.resumeZoneClean)

### 1.1.3 (2018-07-11)
* (BuZZy1337) fixed zoneCleanup state not working (vacuum was only leaving the dock, saying "Finished ZoneCleanup", and returned immediately back to the dock)

### 1.1.2 (2018-07-05)
* (BuZZy1337) fixed detection of new Firmware / Second generation Vacuum

### 1.1.1 (2018-04-17)
* (MeisterTR) error catched , added states for new fw

### 1.1.0 (2018-04-10)
* (mswiege) Finished the widget

### 1.0.1 (2018-01-26)
* (MeisterTR) ready for admin3
* (MeisterTR) support SpotClean and voice level (v1)
* (MeisterTR) support second generation (S50)
* (MeisterTR) Speed up data requests

### 0.6.0 (2017-11-17)
* (MeisterTR) use 96 char token from Ios Backup
* (MeisterTR) faster connection on first use

### 0.5.9 (2017-11-03)
* (MeisterTR) fix communication error without i-net
* (AlCalzone) add selection of predefined power levels

### 0.5.7 (2017-08-17)
* (MeisterTR) compare system time and Robot time (fix no connection if system time is different)
* (MeisterTR) update values if robot start by cloud

### 0.5.6 (2017-07-23)
* (MeisterTR) add option for crate switch for Alexa control

### 0.5.5 (2017-06-30)
* (MeisterTR) add states, fetures, fix communication errors

### 0.3.2 (2017-06-07)
* (MeisterTR) fix no communication after softwareupdate(Vers. 3.3.9)

### 0.3.1 (2017-04-10)
* (MeisterTR) fix setting the fan power
* (bluefox) catch error if port is occupied

### 0.3.0 (2017-04-08)
* (MeisterTR) add more states

### 0.0.2 (2017-04-02)
* (steinwedel) implement better decoding of packets

### 0.0.1 (2017-01-16)
* (bluefox) initial commit