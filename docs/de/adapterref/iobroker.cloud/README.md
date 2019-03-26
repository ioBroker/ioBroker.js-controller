---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cloud/README.md
title: ioBroker-Cloud-Adapter
hash: EYfY5wDUK2BuMkI34L5pvxHGhym23Qv7P5OrUELenJE=
---
![Logo](../../../en/adapterref/iobroker.cloud/admin/cloud.png)

![Anzahl der Installationen](http://iobroker.live/badges/cloud-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.cloud.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.cloud.svg)
![NPM](https://nodei.co/npm/iobroker.cloud.png?downloads=true)

# IoBroker Cloud-Adapter ===================
Dieser Adapter ermöglicht die Verbindung vom Internet über die ioBroker-Cloud zur lokalen Installation von ioBroker.

## Die Einstellungen
### APP-KEY
Um den Cloud-Adapter verwenden zu können, sollten Sie zuerst den APP-Key unter [https://iobroker.net](https://iobroker.net) herunterladen.

Dies ist der Anwendungsschlüssel, den der Benutzer auf der Website nach [https://iobroker.net](https://iobroker.net) erhalten kann. Bitte holen Sie den Schlüssel dort ab und geben Sie ihn hier ein.

![Intro](../../../en/adapterref/iobroker.cloud/img/intro.png)

### Instanz
Alle Anforderungen vom Cloud-Adapter werden an eine WEB-Instanz weitergeleitet. Der Benutzer muss hier die WEB-Instanz angeben, die dem Benutzer angezeigt wird, wenn er sich auf der https://iobroker.net-Site anmeldet.

### Selbstsignierte Zertifikate zulassen
Wenn Sie die Standard-Cloud von iobroker.net verwenden, können Sie sie deaktivieren. Diese Option ist nur wichtig, wenn die eigene Cloud verwendet wird.

### Sprache
Wenn Sie "Standardsprache" auswählen, werden die intelligenten Namen der Geräte und der Aufzählungen nicht übersetzt. Wenn eine Sprache angegeben ist, werden alle bekannten Namen in diese Sprache übersetzt.
Es wird getan, um zu Demonstrationszwecken schnell zwischen vielen Sprachen zu wechseln.

### Platziere zuerst die Funktion in Namen
Ändern Sie die Reihenfolge der Funktionen und Rollen in selbst erstellten Namen:

- wenn falsch: "Raumfunktion", z. "Wohnraumdimmer"
- Wenn wahr: "Funktionsraum", z. "Dimmer Wohnzimmer"

### Wörter mit verketten
Sie können das Wort definieren, das zwischen Funktion und Raum platziert wird. Z.B. "in" und von "Dimmer Wohnzimmer" werden "Dimmer im Wohnzimmer".

Dies wird jedoch nicht empfohlen, da die Erkennungs-Engine ein weiteres Wort analysieren muss und zu Missverständnissen führen kann.

### AUS-Pegel für Schalter
Einige Gruppen bestehen aus gemischten Geräten: Dimmer und Schalter. Sie können sie mit den Befehlen "EIN" und "AUS" und mit Prozenten steuern.
Wenn der Befehl "Auf 30 %s etzen" und der * AUS-Pegel "30%" ist, werden die Schalter eingeschaltet. Mit dem Befehl "Auf 25% setzen" werden alle Schalter ausgeschaltet.

Wenn der Befehl "AUS" ist, speichert der Adapter außerdem den aktuellen Dimmerwert, wenn der tatsächliche Wert über oder gleich "30%" liegt.
Später, wenn der neue "EIN" -Befehl kommt, schaltet der Adapter den Dimmer nicht auf 100%, sondern auf den Speicherstand.

Beispiel:

- Nehmen Sie an, dass *AUS* 30% beträgt.
- Das virtuelle Gerät "Light" verfügt über zwei physische Geräte: *Schalter* und *Dimmer*
- Befehl: "Licht auf 40 %s etzen". Der Adapter speichert diesen Wert für *Dimmer* setzt ihn auf "Dimmer" und schaltet den *Schalter* ein.
- Befehl: "Licht ausschalten". Der Adapter setzt den *Dimmer* auf 0% und schaltet den *Schalter* aus.
- Befehl: "Licht einschalten". *Dimmer* => 40%, *Schalter* => ON.
- Befehl: "setze das Licht auf 20%". * Dimmer * => 20%, * Schalter * => OFF. Der Wert für den Dimmer wird nicht gespeichert, da er unter * OFF steht.
- Befehl: "Licht einschalten". *Dimmer* => 40%, *Schalter* => ON.

### Von ON
Sie können das Verhalten des EIN-Befehls für den Nummernstatus auswählen. Der spezifische Wert kann ausgewählt werden oder der letzte Wert ungleich Null wird verwendet.

Antwort schreiben an
Für jeden Befehl wird die Textantwort generiert. Sie können hier die Objekt-ID definieren, in die dieser Text geschrieben werden muss. Z.B. *sayit.0.tts.text*

### Farben
Zur Zeit unterstützt nur englisch alexa die Farbkontrolle.
Der Kanal muss 4 Status mit folgenden Rollen haben:

- level.color.saturation (erforderlich zur Erkennung des Kanals),
- level.color.hue,
- level.dimmer,
- Schalter (optional)

```
Alexa, set the "device name" to "color"
Alexa, turn the light fuschia
Alexa, set the bedroom light to red
Alexa, change the kitchen to the color chocolate
```

### Sperren
Damit die Sperren gesperrt werden können, muss der Status die Rolle "switch.lock" haben und native.LOCK_VALUE, um den Sperrstatus zu ermitteln.

```
Alexa, is "lock name" locked/unlocked
Alexa, lock the "lock name"
```

## Wie werden Namen generiert?
Der Adapter versucht, virtuelle Geräte für die Smart Home-Steuerung (z. B. Amazon Alexa oder Google Home) zu generieren.

Dies sind zwei wichtige Aufzählungen: Räume und Funktionen.

Die Zimmer sind wie: Wohnzimmer, Bad, Schlafzimmer.
Funktionen sind wie: Licht, Jalousie, Heizung.

Folgende Bedingungen müssen erfüllt sein, um den Status in der automatisch generierten Liste zu erhalten:

- Der Status muss sich in einer Funktionsaufzählung befinden.
- Der Status muss eine Rolle haben ("state", "switch" oder "level. *", z. B. level.dimmer), wenn er nicht direkt in "Funktionen" enthalten ist.

Es kann sein, dass sich der Kanal in den "Funktionen" befindet, aber selbst nicht angeben.

- Der Zustand muss beschreibbar sein: common.write = true
- Der Zustandsdimmer muss als 'Nummer' einen gemeinsamen Typ haben.
- Der Zustand der Heizung muss eine gemeinsame Einheit als '°C', '°F' oder '° K' und der Common.typ als 'Nummer' haben.

Wenn sich der Status nur in "Funktionen" und nicht in einem "Raum" befindet, wird der Name des Status verwendet.

Die Zustandsnamen werden aus Funktion und Raum generiert. Z.B. Alle *Lichter* im *Wohnzimmer* werden im virtuellen Gerät *Wohnzimmerlicht* gesammelt.
Der Benutzer kann diesen Namen nicht ändern, da er automatisch generiert wird.
Wenn sich der Aufzählungsname ändert, wird auch dieser Name geändert. (Zum Beispiel wurde die Funktion "Licht" in "Lichter" geändert, daher wird das *Wohnzimmerlicht* in *Wohnzimmerlichter* geändert.)

Alle Regeln werden ignoriert, wenn der Status common.smartName hat. In diesem Fall wird nur der Smart-Name verwendet.

Wenn *common.smartName* **falsch** ist, wird der Status oder die Aufzählung nicht in die Listengenerierung einbezogen.

Der Konfigurationsdialog ermöglicht das bequeme Entfernen und Hinzufügen der einzelnen Status zu virtuellen Gruppen oder als einzelnes Gerät.
![Aufbau](../../../en/adapterref/iobroker.cloud/img/configuration.png)

Wenn die Gruppe nur einen Status hat, kann sie umbenannt werden, da hierfür der smartName des Status verwendet wird.
Wenn die Gruppe mehr als einen Status hat, muss die Gruppe über die Namen der Aufzählung umbenannt werden.

Um eigene Gruppen anzulegen, kann der Benutzer "Szenen" -Adapter installieren oder "Skript" im Javascript-Adapter erstellen.

### Ersetzt
Sie können Zeichenfolgen angeben, die in den Gerätenamen automatisch ersetzt werden können. Z. B. wenn Sie festlegen, ersetzt:

```.STATE,.LEVEL```, so all ".STATE" and ".LEVEL" will be deleted from names. Be careful with spaces.
If you will set ```.STATE, .LEVEL```, so ".STATE" and " .LEVEL" will be replaced and not ".LEVEL".

## Helper states
- **smart.lastObjectID**: This state will be set if only one device was controlled by home skill (alexa, google home).
- **smart.lastFunction**: Function name (if exists) for which last command was executed.
- **smart.lastRoom**:     Room name (if exists) for which last command was executed.
- **smart.lastCommand**:  Last executed command. Command can be: true(ON), false(OFF), number(%), -X(decrease at x), +X(increase at X)
- **smart.lastResponse**: Textual response on command. It can be sent to some text2speech (sayit) engine.

## IFTTT
[instructions](doc/ifttt.md)

## Services
There is a possibility to send messages to cloud adapter.
If you call ```[POST]https://iobroker.net/service/custom_<NAME>/<user-app-key>``` und value as payload.

```

curl --data "myString" https://iobroker.net/service/custom_test/ <Benutzeranwendungstaste>

```

If you set in the settings the field "White list for services" the name *custom_test*, and call with "custom_test" as the service name, the state **cloud.0.services.custom_test** will be set to *myString*.

You may write "*" in white list and all services will be allowed.

From version 2.0.5 you can use GET request in form ```[GET]https://iobroker.net/service/custom_<NAME>/<user-app-key>/<data>``` to place the **\<data\>** into **cloud.0.services.custom_\<NAME\>**.

Here you can find instructions how to use it with [tasker](doc/tasker.md).

IFTTT service is allowed only if IFTTT key is set.

Reserved names are "ifttt", "text2command", "simpleApi", "swagger". These must be used without the ```"custom_"``` prefix.

### text2command
You may write "text2command" in white list, you can send POST request to ```https://iobroker.net/service/text2command/<user-app-key>``` to write data into *text2command.X.text* variable.

"X" can be defined in settings by the "Use text2command instance" option.

### simpleApi
*to do*

## Changelog
### 2.7.1 (2018-09-07)
* (Apollon77) Enhancements for Custom Skill

### 2.7.0 (2018-06-18)
* (bluefox) Multilingual names were corrected

### 2.6.2 (2018-06-18)
* (Apollon77/AlCalzone/Bluefox) Several fixes

### 2.6.1 (2018-05-04)
* (bluefox) Support of custom alexa skill

### 2.5.0 (2018-03-17)
* (bluefox) Added actions on commands from server: wait, stop, redirect; to control load of the server by start.

### 2.4.7 (2018-02-09)
* (bluefox) Small changes in the configuration dialog
* (bluefox) add information about the expiring of remote access

### 2.4.6 (2018-02-09)
* (bluefox) Adding of new devices is fixed

### 2.4.5 (2018-01-29)
* (bluefox) Changes for Admin 3

### 2.4.4 (2018-01-20)
* (bluefox) The errors by controlling of temperature are caught now

### 2.4.2 (2018-01-20)
* (bluefox) Do not subscribe all objects

### 2.2.0 (2017-12-22)
* (bluefox) Better update of the devices in configuration dialog

### 2.1.1 (2017-12-11)
* (bluefox) Add settings for the ping timeout
* (grimneko) corrected some spelling mistakes
* (grimneko) update readme for IFTTT

### 2.1.0 (2017-12-06)
* (bluefox) Allow to disable alexa service by state

### 2.0.8 (2017-11-28)
* (bluefox / Philipp Beckers) Translations

### 2.0.7 (2017-10-29)
* (bluefox) Changes for socket-io

### 2.0.6 (2017-10-26)
* (bluefox) Fix small error in configuration
* (bluefox) Send uuid to cloud for authentication

### 2.0.5 (2017-09-26)
* (bluefox) The small custom service reaction improvement

### 2.0.4 (2017-09-12)
* (bluefox) Allow access to admin via iobroker.pro
* (c-klinger) Add settings for the connection timeout

### 1.0.8 (2017-07-13)
* (bluefox) Allow control light colors

### 1.0.7 (2017-06-26)
* (bluefox) AI deactivated
* (bluefox) change ping interval from 10 to 30 seconds
* (bluefox) fix double auth on connect

### 1.0.3 (2017-05-23)
* (bluefox) Rename some german words

### 1.0.2 (2017-05-23)
* (bluefox) Support of IFTTT

### 1.0.0 (2017-05-22)
* (bluefox) Catch an error if the invalid smart name set

### 0.8.2 (2017-04-24)
* (bluefox) controls of colors (english only)
* (bluefox) request temperature (target temperature and sensor temperature, english only)
* (bluefox) support of double names

### 0.7.1 (2017-04-05)
* (bluefox) Fixed reconnection

### 0.7.0 (2017-04-01)
* (bluefox) Try to fix reconnection

### 0.6.12 (2017-03-26)
* (bluefox) Try to fix error with names

### 0.6.11 (2017-03-20)
* (bluefox) Fixed scrollbar in configuration

### 0.6.10 (2017-03-03)
* (bluefox) Add tooltips in config
* (bluefox) Add workaround for alexa reconnection

### 0.6.9 (2017-02-17)
* (bluefox) Allow to use more than one smart name

### 0.6.8 (2017-02-16)
* (bluefox) Fix deactivation of enums

### 0.6.7 (2017-02-14)
* (bluefox) allow buttons to be controller with alexa

### 0.6.5 (2017-02-06)
* (bluefox) print warnings for invalid states

### 0.6.3 (2017-01-28)
* (bluefox) fix enum names
* (bluefox) add helper states and response text

### 0.6.2 (2017-01-25)
* (bluefox) add option "Place function in names first"

### 0.6.1 (2017-01-24)
* (bluefox) fix reconnect
* (bluefox) change smartName structure

### 0.5.0 (2017-01-20)
* (bluefox) add value by ON

### 0.4.2 (2017-01-12)
* (bluefox) add daily restart

### 0.4.1 (2017-01-06)
* (bluefox) use devices with ":" symbols in the names
* (bluefox) add debug outputs

### 0.4.0 (2017-01-06)
* (bluefox) Support of english language
* (bluefox) Use rooms of channel and not only states

### 0.3.3 (2017-01-02)
* (bluefox) Fix error with smartNames
* (bluefox) Take the superset of actions for group and not the last one
* (bluefox) if group has switches and dimmers, turn devices OFF if the percent level is less than 30%
* (bluefox) Remember ON level for dimmers to switch it later ON

### 0.3.0 (2016-12-29)
* (bluefox) Implement Heating profile for Alexa

### 0.2.0 (2016-12-13)
* (bluefox) support of amazon alexa

### 0.1.2 (2016-11-17)
* (bluefox) update socket.io

### 0.1.1 (2016-10-23)
* (bluefox) update some packages

### 0.1.0 (2016-08-01)
* (bluefox) support of read/write files