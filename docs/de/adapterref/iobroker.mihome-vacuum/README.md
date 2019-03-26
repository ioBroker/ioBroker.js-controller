---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mihome-vacuum/README.md
title: Verschoben nach https://github.com/iobroker-community-adapters/ioBroker.mihome-vacuum
hash: 6Cep76PzwOlz7ts1x9vgh+PzEWvFSzfvZJpo5uvhnpo=
---
# Verschoben zu https://github.com/iobroker-community-adapters/ioBroker.mihome-vacuum
![Logo](../../../en/adapterref/iobroker.mihome-vacuum/admin/mihome-vacuum.png)

![Anzahl der Installationen](http://iobroker.live/badges/mihome-vacuum-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.mihome-vacuum.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mihome-vacuum.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.mihome-vacuum.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.mihome-vacuum.png?downloads=true)

miohome-vakuumadapter ===================
[Deutsche beschreibung hier](README_de.md)

Mit diesem Adapter können Sie den Xiaomi-Staubsauger steuern.

## Inhalt
- [Setup] (# Konfiguration)
    - [mit Android] (# on-android)
    - [mit iOS] (# für-ios)
    - [Adapter konfigurieren] (# Adapter-Konfiguration)
        - [Kontrolle über Alexa] (# control-over-alexa)
        - [Zweiter Roboter] (# zweiter Roboter)
- [Funktionen] (# Funktionen)
    - [S50-Befehle] (# command-of-the-s50)
    - [Gehe zu] (# goto)
- [zone clean] (# zoneclean)
    - [Eigene Befehle] (# send-your-own-befehle)
    - [sendTo hook] (# send-custom-command-with-sendto)
- [Widget] (# Widget)
- [bugs] (# bugs)
- [Changelog] (# changelog)

## Aufbau
Derzeit ist es das größte Problem, das Token zu finden.
Die folgenden Verfahren können verwendet werden:

### Einfache Erkennung von Token auf Android
Deinstallieren Sie einfach die offizielle MiHome App und installieren Sie diese von [diese Seite (russisch)](http://www.kapiba.ru/2017/11/mi-home.html):

- [Link APK] (https://cloud.mail.ru/public/BSos/7YJhcLB2W/MiHome_5.4.13_vevs.apk).

Nach der Installation und Anmeldung mit denselben Einstellungen wie bei der offiziellen App finden Sie das Token in den "Netzwerkinformationen" für das Gerät.

### Unter Android
Vorbereitung: Ein Android-Smartphone mit der fertigen MiHome-App ist erforderlich. Der Sauger muss hinzugefügt und eingepasst werden.

Nicht gerootete Android-Handys

- Laden Sie das [MiToolkit] (https://github.com/ultrara1n/MiToolkit/releases) herunter, und entpacken Sie es. Starten Sie MiToolkit.exe.
- Aktivieren Sie das USB-Debugging in den Smartphone-Einstellungen ([video] (https://www.youtube.com/watch?v=aw7D6bNgI1U)).
- Verbinden Sie das Smartphone über ein USB-Kabel mit dem PC.
- Klicken Sie im MiToolkit auf "Verbindung prüfen" und testen Sie ggf. die Java-Installation. Beide Tests sollten fehlerfrei ablaufen.
- Klicken Sie auf "Read Token" und bestätigen Sie die Meldung auf dem Smartphone (KEIN Passwort!).

Auf dem Smartphone sollte die MiHome-App (automatisch) geöffnet und ein Backup auf dem PC erstellt werden (sollte einige Sekunden dauern), das Programm liest dann das Token aus der MiHome-Datenbank (miio2.db).
Suchen Sie nun im geöffneten Fenster nach rockrobo.vacuum, kopieren Sie das 32-stellige Token und geben Sie es in das Konfigurationsfenster ein.

Verwurzelte Android-Handys

- Sie müssen die MiHome-App 4.xx-5.029 verwenden. Höhere Versionen der Mihome-Anwendung enthalten kein Token in der Datenbank.
- Installieren Sie [aSQLiteManager] (https://play.google.com/store/apps/details?id=dk.andsen.asqlitemanager) mit der MiHome-App auf Ihrem Telefon
- Erstellt die Kopie /data/data/com.xiaomi.smarthome/databases/miio2.db
- Öffnen Sie die Kopie von miio2.db mit aSQLiteManager, und führen Sie die Abfrage "select token from devicerecord" aus, wobei localIP "192.168.89.100" ist. Kopieren Sie das 32-stellige Token und geben Sie es in das Konfigurationsfenster ein.

### Für iOS
Mit Jailbreak:

- Wenn das Token unter /var/mobile/Containers/Data/Application/514106F3-C854-45E9-A45C-119CB4FFC235/Documents/USERID_mihome.sqlite gefunden wird

Ohne Jailbreak:

- Lesen Sie zuerst das erforderliche Token über das iPhone-Backup
- Richten Sie dazu zunächst das xiaomi auf Ihrem iPhone ein
- Erstellen Sie ein Backup mit iTunes oder 3utools
- Dann installieren Sie den [iphonebackupviewer] (http://www.imactools.com/iphonebackupviewer/)
- Gehe zur Baumansicht (oben rechts)
- gehe zum Pfad AppDomain-com.xiaomi.mihome \ Documents \
- Laden Sie die Datei xxxxxxxxxx_mihome.sqlite herunter

-Wenn die Datei / der Ordner nicht gefunden wird, sollten Sie statt mit 3utools eine Sicherungskopie mit iTunes erstellen

- Öffnen Sie diese mit [DB Browser for SQLite] (https://github.com/sqlitebrowser/sqlitebrowser/releases/download/v3.10.1/SQLiteDatabaseBrowserPortable_3.10.1_English.paf.exe).
- Den 96-stelligen Sechskantschlüssel finden Sie unter Daten durchsuchen Z Tabelle ZDEVICE  in der Spalte ganz rechts ZTOKEN
- Der 96-stellige Hex-Schlüssel muss jetzt in einen 32-stelligen Schlüssel umgewandelt werden
- Geben Sie Folgendes über den [Link] (http://aes.online-domain-tools.com/) hier ein
- Eingabetyp: Text
- Eingabetext: der 96-stellige Schlüssel
- Hex
- Automatische Erkennung: EIN
- Funktion: AES
- Modus: EZB (elektronisches Codebuch)
- Taste: 00000000000000000000000000000000 * muss 32-stellig sein
- Hex
- Klicken Sie nun auf Entschlüsseln und entfernen Sie den 32-stelligen Schlüssel ganz rechts aus dem entschlüsselten Text

### Adapterkonfiguration
- Für die IP-Adresse muss die IP-Adresse des Roboters im Format "192.168.178.XX" eingegeben werden.
- Der Port des Roboters ist standardmäßig auf "54321" eingestellt, dies sollte nicht geändert werden
- Eigener Port, sollte nur mit zweitem Roboter geändert werden
- Abfrageintervall Zeit in ms, in der die Statuswerte des Roboters abgerufen werden (sollte nicht <10000 sein)

#### Kontrolle über Alexa
In der config add alexa state wird aktiviert, hier wird ein Hack gesetzt, ein zusätzlicher Status "clean_home". Es ist ein Schalter, der bei "true" den Sucker startet und bei "false" nach Hause geht, wird er automatisch zu einem intelligenten Gerät in der Cloud Adapter mit dem Namen "Staubsauger" erstellt, der im Cloud-Adapter geändert werden kann.

Pause Pause mit Starttaste fortsetzen
Wenn diese Option aktiviert ist, nimmt Vacuum die Zonenreinigung wieder auf, wenn der Status "Start" auf "true" gesetzt wird, wenn er während einer laufenden Zonencause angehalten wurde.
Wenn diese Option deaktiviert ist, startet der Staubsauger eine neue "normale Reinigung", wenn Sie den Startbefehl senden, auch wenn er während einer laufenden zoneclean angehalten wurde.

- Experimentell: Mit der Checkbox "Eigene Befehle senden" werden Objekte angelegt, über die Sie eigene Befehle an den Roboter senden und empfangen können.

#### Zweiter Roboter
Wenn zwei Roboter über ioBroker gesteuert werden sollen, müssen zwei Instanzen erstellt werden. Der zweite Roboter muss seinen eigenen Port ändern (Standard: 53421), so dass beide Roboter unterschiedliche Ports haben.

## Funktionen
### Befehle der S50 (zweite Generation)
Die Kartengröße beträgt immer 52000 mm x 52000 mm, daher sind Werte von 0 bis 51999 mm möglich.
Leider kann die Position und Position der Karte nicht abgefragt werden, dies kann sich von Saug zu Saug ändern. Als Basis dient immer die letzte Saugkarte sowie in der App.
Wenn der Roboter nur einen Bereich aufnimmt und die Karte immer auf dieselbe Weise erstellt, können Sie ihn zuverlässig an Orte senden oder den Bereich absaugen lassen.

#### Gehe zu
Um den Staubsauger auf einen Punkt zu fahren, muss das Objekt "goTo" wie folgt gefüllt werden:

```
xVal, yval
```

Die Werte müssen den oben angegebenen Bereich erfüllen und die x- und y-Koordinaten auf der Karte angeben.

Beispiel:

```
24,850.26500
```

#### ZoneClean
Um eine Zone abzusaugen, muss ZoneClean wie folgt gefüllt sein:

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

### Senden Sie Ihre eigenen Befehle
HINWEIS: Diese Funktion sollte nur von Experten verwendet werden, da der Sauger durch falsche Befehle beschädigt werden kann

Der Roboter unterscheidet zwischen den Befehlen in Methoden (Methoden) und Parametern (Parametern), die zur Festlegung der Methoden dienen.
Unter dem Objekt "mihome-vacuum.X.control.X_send_command" können Sie Ihre eigenen Befehle an den Roboter senden.
Die Objektstruktur muss folgendermaßen aussehen: Methode; [params]

Unter dem Objekt "mihome-vacuum.X.control.X_get_response" wird die Antwort nach dem Senden vom Roboter eingegeben. Wenn Parameter abgefragt wurden, erscheinen sie hier im JSON-Format. Wenn nur ein Befehl gesendet wurde, antwortet der Roboter nur mit "0".

Die folgenden Methoden und Parameter werden unterstützt:

| Methode | Params | Beschreibung |
|-----------      |-------                                                              |-------------------                                                                                     |
| get_timer | | Gibt den eingestellten Timer zurück. Setzt die Absaugzeiten BSp. 12 Uhr 30 in 5 Tagen |
| set_timer | [["TIME_IN_MS", ["30 12 * * 1,2,3,4,5", ["start_clean", ""]]]] Timer aktivieren / deaktivieren |
| upd_timer | ["1481997713308", "Ein / Aus"] | |
| | | Rettet die Zeiten des Do Not Distrube |
| get_dnd_timer | | DND-Zeiten löschen |
| close_dnd_timer | | DND Einstellung h, min, h, min |
| set_dnd_timer | [22,0,8,0] | |
|                 |                                                                     |                                                                                                        |
| app_rc_start | | Starten Sie Romote Control |
| app_rc_end | | Fernbedienung beenden |

| app_rc_move | [{"seqnum": '0-1000', "Geschwindigkeit": VALUE1, "omega": VALUE2, "duration": VALUE3}] | Bewegung. Sequenznummer muss stetig sein, VALUE1 (Geschwindigkeit) = -0,3-0,3, VALUE2 (Drehung) = -3,1-3,1, VALUE3 (Dauer)

Weitere Methoden und Parameter finden Sie hier ([Verknüpfung](https://github.com/MeisterTR/XiaomiRobotVacuumProtocol)).

### Senden Sie benutzerdefinierte Befehle mit sendTo
Sie können diese benutzerdefinierten Befehle auch von anderen Adaptern mit `sendTo` senden. Verwendung mit `method_id` und `params` wie oben definiert:

```
sendTo("mihome-vacuum.0", "sendCustomCommand",
    {method: "method_id", params: [...] /* optional*/},
    function (response) { /* do something with the result */}
);
```

Das `response`-Objekt hat zwei Eigenschaften: `error` und (falls kein Fehler aufgetreten ist) `result`.

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
| Starten Sie den Reinigungsvorgang | `startVacuuming` | - Keine - | |
| Stoppen Sie den Reinigungsvorgang | `stopVacuuming` | - Keine - | |
| Unterbrechen Sie den Reinigungsvorgang | `pause` | - Keine - | |
| Reinigen Sie einen kleinen Bereich um den Roboter `cleanSpot` | - Keine - | |
| Gehe zurück zur Basis | `charge` | - Keine - | |
| Sag "Hi, ich bin hier drüben!" | `findMe` | - Keine - | |
| Überprüfen Sie den Status der Verbrauchsmaterialien (Pinsel usw.) | `getConsumableStatus` | - Keine - | |
| Status des Verbrauchsmaterials (Pinsel usw.) zurücksetzen | `resetConsumables` | - Keine - | Rufsignatur unbekannt |
| Holen Sie sich eine Zusammenfassung aller vorherigen Reinigungsvorgänge | `getCleaningSummary` | - Keine - | |
| Holen Sie sich eine detaillierte Zusammenfassung eines vorherigen Reinigungsvorgangs | `getCleaningRecord` | `recordId` | |
| Holen Sie sich eine Karte | `getMap` | - Keine - | Unbekannt, was mit dem Ergebnis zu tun ist
| Den aktuellen Status des Roboters abrufen `getStatus` | - Keine - | |
| Rufen Sie die Seriennummer des Roboters ab `getSerialNumber` | - Keine - | |
| Detaillierte Geräteinformationen anzeigen `getDeviceDetails` | - Keine - | |
| Rufen Sie den *nicht stören* Timer ab `getDNDTimer` | - Keine - | |
| Stellen Sie einen neuen *nicht stören* Timer ein `setDNDTimer` | `startHour`, `startMinute`, `endHour`, `endMinute` | |
| Löschen Sie den *nicht stören* Timer `deleteDNDTimer` | - Keine - | |
| Rufen Sie die aktuelle Lüftergeschwindigkeit ab `getFanSpeed` | - Keine - | |
| Neue Lüftergeschwindigkeit einstellen `setFanSpeed` | `fanSpeed` | `fanSpeed` ist eine Zahl zwischen 1 und 100 |
| Starten Sie die Fernbedienungsfunktion | `startRemoteControl` | - Keine - | |
| Geben Sie einen Bewegungsbefehl für die Fernbedienung aus `move` | `velocity`, `angularVelocity`, `duration`, `sequenceNumber` | Sequenznummer muss sequenziell sein, Duration in ms |
| Beenden Sie die Fernbedienungsfunktion `stopRemoteControl` | - Keine - | |
| Beenden Sie die Fernbedienungsfunktion `stopRemoteControl` | - Keine - | |

## Widget
Entschuldigung, noch nicht fertig.
![Widget](../../../en/adapterref/iobroker.mihome-vacuum/widgets/mihome-vacuum/img/previewControl.png)

## Bugs
- Gelegentliche Verbindungsabbrüche sind jedoch nicht auf den Adapter zurückzuführen, sondern meist auf seine eigenen Netzwerke
- Widget zur Zeit ohne Funktion

## Changelog
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