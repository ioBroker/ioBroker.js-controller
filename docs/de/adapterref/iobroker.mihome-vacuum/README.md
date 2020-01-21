---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mihome-vacuum/README.md
title: ioBroker mihome-Vakuumadapter
hash: AOAalXfMKBwzIM4xD3kpyJJ278omMCQWMuM55jq/RZ0=
---
![Logo](../../../en/adapterref/iobroker.mihome-vacuum/admin/mihome-vacuum.png)

![Anzahl der Installationen](http://iobroker.live/badges/mihome-vacuum-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.mihome-vacuum.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mihome-vacuum.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.mihome-vacuum.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.mihome-vacuum.png?downloads=true)

ioBroker mihome-vacuum adapter
[Deutsche beschreibung hier](README_de.md)

Mit diesem Adapter können Sie den Xiaomi-Staubsauger steuern.

## Inhalt
- [Setup] (# Konfiguration)
    - [Configure Adapter] (# Adapter-Konfiguration)
        - [Kontrolle über Alexa] (# control-over-alexa)
        - [Zweiter Roboter] (# zweiter Roboter)
    - [Valetudo konfigurieren] (# valetudo-config)
- [Funktionen] (# Funktionen)
    - [S50-Befehle] (# s50-Befehle)
    - [Gehe zu] (# gehe zu)
- [zone Clean] (# zoneclean)
    - [Zimmer] (# Zimmer)
    - [timer] (# timer)
    - [Eigene Befehle] (# eigene Befehle senden)
    - [sendTo hook] (# send-custom-commands-with-sendto)
- [Widget] (# Widget)
- [Bugs] (# Bugs)
- [Changelog] (# changelog)

## Aufbau
Derzeit ist das Finden des Tokens das größte Problem.
Bitte folgen Sie den Anweisungen im Link:

[Jeton turorial](https://www.smarthomeassistent.de/token-auslesen-roborock-s6-roborock-s5-xiaomi-mi-robot-xiaowa/).

### Adapterkonfiguration
- Für die IP-Adresse muss die IP-Adresse des Roboters im Format "192.168.178.XX" eingegeben werden
- Der Port des Roboters ist standardmäßig auf "54321" eingestellt. Dies sollte nicht geändert werden
- Eigener Port, sollte nur mit zweitem Roboter gewechselt werden
- Abfrageintervall Die Zeit in ms, in der die Statuswerte des Roboters abgerufen werden (sollte nicht <10000 sein)

#### Kontrolle über Alexa
In der Konfig ist hier ein Hack gesetzt und ein zusätzlicher Zustand aktiviert. "Clean_home" ist ein Schalter, der bei "true" den Sucker startet und bei "false" nach Hause geht, es wird automatisch ein Smart Device in der Cloud Adapter erstellt mit dem Namen "Staubsauger", der im Cloud-Adapter geändert werden kann.

#### Unterbrochene Zonenreinigung mit Starttaste fortsetzen
Wenn diese Option aktiviert ist, nimmt das Vakuum die Zonenreinigung wieder auf, wenn der Status "start" auf "true" gesetzt wird, wenn es während einer laufenden Zonenreinigung angehalten wurde.
Wenn diese Option deaktiviert ist, startet der Staubsauger eine neue "normale Reinigung", wenn Sie den Startbefehl senden, auch wenn er während einer laufenden Zonenreinigung angehalten wurde.

- Experimentell: Mit der Checkbox "Eigene Befehle senden" werden Objekte erstellt, über die Sie eigene Befehle an den Roboter senden und empfangen können.

#### Zweiter Roboter
Wenn zwei Roboter über ioBroker gesteuert werden sollen, müssen zwei Instanzen erstellt werden. Der zweite Roboter muss seinen eigenen Port ändern (Standard: 53421), damit beide Roboter unterschiedliche Ports haben.

## Valetudo Konfig
Dazu musst du valetudo rooten und auf deinem Gerät installieren. Vatudo können Sie [Valetudo RE] (https://github.com/rand256/valetudo) oder normal [Valetudo](https://github.com/Hypfer/Valetudo)

![Konfig](../../../en/adapterref/iobroker.mihome-vacuum/admin/valetudo_conf.png)

- Valetudo aktivieren aktiviert die Valetudo-Oberfläche
- Das Anforderungsintervall muss mehr als 1000 ms betragen. Dies ist das Intervall für die Aktualisierung der HTML-Karte
- Das Kartenintervall muss länger als 5000 ms sein. Dieses Intervall aktualisiert die PNG-Kartendatei.
- Farbe dort können Sie die Farben für das Kartenbeispiel auswählen:

```
- #2211FF
- rbg(255,200,190)
- rgba(255,100,100,0.5) //for Transparent
- green
```

- roboter dort können sie verschiedene roboter oder andere fahrzeuge für die karte auswählen

### Karten-Widget
Zum Anzeigen der Karte können Sie ein normales HTML-Widget verwenden, z.

```
[{"tpl":"tplHtml","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","refreshInterval":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"html":"{mihome-vacuum.0.valetudo.map64}"},"style":{"left":"0","top":"0","width":"100%","height":"100%"},"widgetSet":"basic"}]
```

Die zweite Möglichkeit besteht darin, ein src img-Widget zu verwenden, um die PNG-Datei zu integrieren. Aber die HTML-Ansicht ist schneller, es ist wie eine Live-Ansicht.

## Funktionen
### Befehle des S50 (zweite Generation)
Die Kartengröße beträgt immer 52000 mm x 52000 mm, daher sind Werte von 0 bis 51999 mm möglich.
Leider können Position und Position der Karte nicht abgefragt werden, dies kann sich von Saugkraft zu Saugkraft ändern. Als Grundlage dient immer die letzte Saugkarte sowie in der App.
Wenn der Roboter nur einen Bereich aufnimmt und die Karte immer auf dieselbe Weise erstellt, können Sie sie zuverlässig an Orte senden oder den Bereich staubsaugen lassen.

#### Gehe zu
Um den Staubsauger an einen Punkt zu fahren, muss das Objekt "goTo" wie folgt gefüllt werden:

```
xVal, yval
```

Die Werte müssen den oben angegebenen Bereich erfüllen und die x- und y-Koordinaten auf der Karte angeben.

Beispiel:

```
24,850.26500
```

#### ZoneClean
Um eine Zone zu saugen, muss ZoneClean wie folgt gefüllt sein:

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
neuerer Staubsauger mit der neuesten Home App unterstützt die Definition von Räumen, siehe [Video](https://www.youtube.com/watch?v=vEiUZzoXfPg)

Jeder Raum in der aktuellen Karte hat einen Index, der dann dem Raum aus der App zugeordnet wird. Vom Roboter erhalten wir nur ein Mapping mit Raumnummer und Index. Der Adapter fragt diese Räume bei jedem Start des Adapters ab und erstellt für jeden Raum einen Kanal, der dann den aktuellen Raumindex kennt. Das gleiche passiert manuell mit dem Button loadRooms. Dieser Kanal kann dann den ioBroker-Räumen zugewiesen werden. Wird der Knopf roomClean gedrückt, wird der Index der Karte ermittelt und an den Roboter gesendet, damit dieser diesen Raum dann staubsaugen kann. Davor ist die Ventilatorleistung auf Einzelraumabsaugung eingestellt. Wenn Sie in der App noch nicht die Möglichkeit haben, die Räume zu benennen, besteht auch die Möglichkeit, einen solchen Kanal manuell durch Angabe des Kartenindex zu erstellen. Anstelle von mapIndex können auch Zonenkoordinaten hinzugefügt werden.
Wenn Sie mehrere Räume spontan reinigen möchten, können Sie dies über multiRoomClean tun, indem Sie die ioBroker-Räume diesem Datenpunkt zuordnen und dann die Taste drücken.

#### Timer
Sobald der Staubsauger die Raumfunktion unterstützt (so), können auch Timer angelegt werden, die dann die entsprechenden Raumkanäle auslösen oder deren mapIndexes ermitteln.
Der Timer kann direkt über Räume und / oder Raumkanäle ausgelöst werden.
Die Timer selbst werden über den Konfigurationsbereich erstellt, werden dann aber zu einem Datenpunkt. Dort kann jeder Timer einmal aktiviert / deaktiviert oder übersprungen werden. Ein direkter Start ist ebenfalls möglich. Der Vorteil der ioBroker-Timer ist, dass sie im VIS angezeigt und verwendet werden können und Sie den Roboter vom Internet trennen können, da die Timer der App von China aus ausgelöst werden.

### Senden Sie Ihre eigenen Befehle
HINWEIS: Diese Funktion sollte nur von Experten verwendet werden, da der Sauger durch falsche Befehle beschädigt werden kann

Der Roboter unterscheidet zwischen den Befehlen in Methoden (Methoden) und Parametern (Parametern), die zur Festlegung der Methoden dienen.
Unter dem Objekt "mihome-vacuum.X.control.X_send_command" können Sie eigene Befehle an den Roboter senden.
Die Objektstruktur muss folgendermaßen aussehen: method; [params]

Unter dem Objekt "mihome-vacuum.X.control.X_get_response" wird die Antwort nach dem Senden vom Roboter eingetragen. Wenn Parameter abgefragt wurden, werden sie hier im JSON-Format angezeigt. Wurde nur ein Befehl gesendet, antwortet der Roboter nur mit "0".

Die folgenden Methoden und Parameter werden unterstützt:

| Methode | params | Beschreibung |
|-----------      |-------                                                              |-------------------                                                                                     |
| get_timer | | Liefert den eingestellten Timer. Einstellen der Saugzeiten BSp. 12 uhr 30 in 5 tagen |
| set_timer | [["TIME_IN_MS", ["30 12 * * 1,2,3,4,5", ["start_clean", ""]]] | Timer aktivieren / deaktivieren |
| upd_timer | ["1481997713308", "ein / aus"] | |
| | | Rettet die Zeiten des Do Not Distrube |
| get_dnd_timer | | DND-Zeiten löschen |
| close_dnd_timer | | DND Einstellung h, min, h, min |
| set_dnd_timer | [22,0,8,0] | |
|                 |                                                                     |                                                                                                        |
| app_rc_start | | Starten Sie Romote Control |
| app_rc_end | | Beenden Sie die Fernbedienung |

| app_rc_move | [{"seqnum": '0-1000', "velocity": VALUE1, "omega": VALUE2, "duration": VALUE3}] | Bewegung. Sequenznummer muss fortlaufend sein, VALUE1 (Geschwindigkeit) = -0,3-0,3, VALUE2 (Drehung) = -3,1-3,1, VALUE3 (Dauer)

Weitere Methoden und Parameter finden Sie hier ([Verknüpfung](https://github.com/MeisterTR/XiaomiRobotVacuumProtocol)).

### Senden Sie benutzerdefinierte Befehle mit sendTo
Sie können diese benutzerdefinierten Befehle auch von anderen Adaptern mit `sendTo` senden. Verwendung mit `method_id` und `params` wie oben definiert:

```
sendTo("mihome-vacuum.0", "sendCustomCommand",
    {method: "method_id", params: [...] /* optional*/},
    function (response) { /* do something with the result */}
);
```

Das Objekt `response` hat zwei Eigenschaften: `error` und (falls kein Fehler aufgetreten ist) `result`.

Einige vordefinierte Befehle können auch folgendermaßen ausgegeben werden:

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
| Beenden Sie den Reinigungsvorgang `stopVacuuming` | - Keine - | |
| Reinigungsvorgang unterbrechen | `pause` | - Keine - | |
| Reinigen Sie einen kleinen Bereich um den Roboter `cleanSpot` | - Keine - | |
| Gehe zurück zur Basis `charge` | - Keine - | |
| Sag "Hallo, ich bin hier drüben!" | `findMe` | - Keine - | |
| Überprüfen Sie den Status der Verbrauchsmaterialien (Bürste usw.) `getConsumableStatus` | - Keine - | |
| Status der Verbrauchsmaterialien (Bürste usw.) zurücksetzen | `resetConsumables` | - Keine - | Signatur unbekannt anrufen |
| Verschaffen Sie sich einen Überblick über alle bisherigen Reinigungsprozesse `getCleaningSummary` | - Keine - | |
| Erhalten Sie eine detaillierte Zusammenfassung eines vorherigen Reinigungsprozesses `getCleaningRecord` | `recordId` | |
| Karte abrufen | `getMap` | - Keine - | Unbekannt, was mit dem Ergebnis geschehen soll |
| Den aktuellen Status des Roboters abrufen `getStatus` | - Keine - | |
| Rufen Sie die Seriennummer des Roboters ab `getSerialNumber` | - Keine - | |
| Detaillierte Geräteinformationen abrufen `getDeviceDetails` | - Keine - | |
| Rufen Sie den Timer *Bitte nicht stören* | auf `getDNDTimer` | - Keine - | |
| Stellen Sie einen neuen *Nicht stören* Timer | ein `setDNDTimer` | `startHour`, `startMinute`, `endHour`, `endMinute` | |
| Löschen Sie den Timer *Bitte nicht stören* | `deleteDNDTimer` | - Keine - | |
| Aktuelle Lüfterdrehzahl abrufen | `getFanSpeed` | - Keine - | |
| Neue Lüfterdrehzahl einstellen | `setFanSpeed` | `fanSpeed` | `fanSpeed` ist eine Zahl zwischen 1 und 100 |
| Starten Sie die Fernbedienungsfunktion | `startRemoteControl` | - Keine - | |
| Geben Sie einen Befehl zum Verschieben der Fernbedienung aus `move` | `velocity`, `angularVelocity`, `duration`, `sequenceNumber` | Die laufende Nummer muss fortlaufend sein. Die Dauer wird in ms angegeben |
| Beenden Sie die Fernbedienungsfunktion | `stopRemoteControl` | - Keine - | |
| saubere zimmer / zimmer | `cleanRooms` | `rooms` | `rooms` ist eine durch Kommas getrennte Zeichenfolge mit enum.rooms.XXX |
| Segment reinigen | `cleanSegments` | `rooms` | `rooms` ist ein Array mit mapIndex oder ein durch Kommas getrennter String mit mapIndex |
| saubere Zone | `cleanZone` | `coordinates` | `coordinates` ist ein String mit Koordinaten und Anzahl, siehe [zoneClean](#zoneClean) |
| saubere Zone | `cleanZone` | `Koordinaten` | `Koordinaten` ist ein String mit Koordinaten und Anzahl, siehe [zoneClean] (# zoneClean) |

## Widget
Entschuldigung, noch nicht fertig.
![Widget](../../../en/adapterref/iobroker.mihome-vacuum/widgets/mihome-vacuum/img/previewControl.png)

## Bugs
- Gelegentliche Unterbrechungen sind jedoch nicht auf den Adapter zurückzuführen, sondern meist auf die eigenen Netzwerke
- Widget zur Zeit ohne Funktion

## Changelog
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