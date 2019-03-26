---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iot/README.md
title: ioBroker IoT-Adapter
hash: dtnn5xoPUYoLNK6queIPVZSoYkbgUvMbauhfOqSTi+A=
---
![Logo](../../../en/adapterref/iobroker.iot/admin/iot.png)

![Anzahl der Installationen](http://iobroker.live/badges/iot-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.iot.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.iot.svg)
![NPM](https://nodei.co/npm/iobroker.iot.png?downloads=true)

# IoBroker IoT-Adapter ==================
Dieser Adapter dient NUR für die Kommunikation mit Amazon Alexa.
Es ist nicht für den Fernzugriff auf Ihre ioBroker-Instanz vorgesehen. Verwenden Sie dazu den ioBroker.cloud-Adapter.

## Die Einstellungen
Um den Cloud-Adapter verwenden zu können, müssen Sie sich zunächst in der ioBroker-Cloud registrieren (§§LLLLL0).

![Intro](../../../en/adapterref/iobroker.iot/img/intro.png)

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
![Aufbau](../../../en/adapterref/iobroker.iot/img/configuration.png)

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
If you call ```[POST]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>``` und value as payload.

```

curl --data "myString" https://service.iobroker.in/v1/iotService?service=custom_ <NAME> & key = <XXX> & user = <USER_EMAIL>

```

or

```[GET]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>&data=myString```

Wenn Sie in den Einstellungen das Feld "Whitelist für Services" den Namen *custom_test* setzen und mit "custom_test" als Servicenamen aufrufen, wird der Status **cloud.0.services.custom_test** auf *myString gesetzt*

Sie können "*" in die weiße Liste eintragen und alle Dienste sind zulässig.

Hier finden Sie Anweisungen zur Verwendung mit [Tasker](doc/tasker.md).

Der IFTTT-Dienst ist nur zulässig, wenn die IFTTT-Taste gesetzt ist.

Reservierte Namen sind "ifttt", "text2command", "simpleApi", "swagger". Diese müssen ohne den Präfix nach ```"custom_"``` verwendet werden.

### Text2Befehl
Sie können "text2command" in die Whitelist schreiben, Sie können eine POST-Anforderung an ```https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>``` senden, um Daten in die Variable *text2command.X.text* zu schreiben.

Sie können auch die Methode GET verwenden. ```https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>&data=<MY COMMAND>```

"X" kann in den Einstellungen mit der Option "Use text2command instance" definiert werden.

## Fertigkeit nach Maß
Die Antworten für benutzerdefinierte Fertigkeiten können auf zwei Arten verarbeitet werden:

- text2Befehl
- Javascript

### Text2Befehl
Wenn im Konfigurationsdialog eine *text2command* -Instanz definiert ist, wird die Frage an die Instanz gesendet.

* text2command * muss so konfiguriert sein, dass die erwartete Phrase analysiert und die Antwort zurückgegeben wird.

### Javascript
Es besteht die Möglichkeit, die Frage direkt mit einem Skript zu bearbeiten. Sie ist standardmäßig aktiviert, wenn keine *text2command* -Instanz ausgewählt ist.

Wenn die Instanz *text2command* definiert ist, muss diese Instanz die Antwort bereitstellen, und die Antwort von *script* wird ignoriert.

Der Adapter stellt die Details in zwei Zuständen mit unterschiedlichen Detailebenen bereit

* **smart.lastCommand** enthält den empfangenen Text einschließlich Informationen zum Abfragetyp (Absicht). Beispiel: "askDevice Status Rasenmäher"
* ** smart.lastCommandObj *** enthält eine JSON-Zeichenfolge, die in einem Objekt analysiert werden kann, das die folgenden Informationen enthält
 * **Wörter** enthält die empfangenen Wörter in einem Array
 * **intent** enthält die Art der Abfrage. Mögliche Werte sind derzeit "askDevice", "controlDevice", "actionStart", "actionEnd", "askWhen", "askWhere", "askWho".
 * **deviceId** enthält eine deviceId, die das von Amazon übermittelte Gerät identifiziert, an das die Anforderung gesendet wurde. Wenn keine Angabe erfolgt, ist sie eine leere Zeichenfolge
 * **sessionId** enthält eine sessionId der Skill-Sitzung. Diese sollte identisch sein, wenn mehrere von Amazon gelieferte Befehle gesprochen wurden. Wenn keine Angabe erfolgt, ist sie eine leere Zeichenfolge
 * **userId** enthält eine userId des Gerätebesitzers (oder möglicherweise später des Benutzers, der mit dem Skill interagiert hat), der von Amazon geliefert wird. Wenn keine Angabe erfolgt, ist er eine leere Zeichenfolge

 Weitere Informationen dazu, wie die Wörter erkannt werden und welche Art von Abfragen die Alexa Custom Skill unterscheidet, finden Sie unter https://forum.iobroker.net/viewtopic.php?f=37&t=17452.

** Ergebnis über den Status von smart.lastResponse zurückgeben **

Die Antwort muss innerhalb von 200 ms im Status "smart.lastResponse" gesendet werden und kann eine einfache Textzeichenfolge oder ein JSON-Objekt sein.
Wenn es sich um eine Textzeichenfolge handelt, wird dieser Text als Antwort an die Fertigkeit gesendet.
Wenn der Text ein JSON-Objekt ist, können die folgenden Schlüssel verwendet werden:

* **responseText** muss den Text enthalten, um zu Amazon zurückzukehren
* **shouldEndSession** ist ein boolescher Wert und steuert, ob die Sitzung geschlossen wird, nachdem die Antwort gesprochen wurde oder offen bleibt, um eine weitere Spracheingabe zu akzeptieren.

** Ergebnis per Nachricht an iot-Instanz zurückgeben **

Die iot-Instanz akzeptiert auch eine Nachricht mit dem Namen "alexaCustomResponse", die den Schlüssel "response" enthält, mit einem Objekt, das die Schlüssel **responseText** und **shouldEndSession** wie oben beschrieben enthalten kann.
Es erfolgt keine Antwort von der iot-Instanz auf die Nachricht!

** Beispiel für ein Skript, das Texte verwendet **

```
// important, that ack=true
on({id: 'iot.0.smart.lastCommand', ack: true, change: 'any'}, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    setState('iot.0.smart.lastResponse', 'Received phrase is: ' + obj.state.val); // important, that ack=false (default)
});
```

** Beispiel eines Skripts, das JSON-Objekte verwendet **

```
// important, that ack=true
on({id: 'iot.0.smart.lastCommandObj', ack: true, change: 'any'}, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    const request = JSON.parse(obj.state.val);
    const response = {
        'responseText': 'Received phrase is: ' + request.words.join(' ') + '. Bye',
        'shouldEndSession': true
    };

    // Return response via state
    setState('iot.0.smart.lastResponse', JSON.stringify(response)); // important, that ack=false (default)

    // or alternatively return as message
    sendTo('iot.0', response);
});
```

## Changelog
### 0.4.2 (2019-03-10)
* (bluefox) Allowed the enable and disable of Amazon Alexa and of Google Home from configuration. 

### 0.4.1 (2019-02-19)
* (bluefox) Add version check to google home

### 0.3.1 (2019-01-13)
* (bluefox) Blockly was fixed

### 0.3.0 (2018-12-30)
* (bluefox) Detection of google devices was fixed

### 0.2.2 (2018-12-21)
* (bluefox) Generation of new URL key was added

### 0.2.0 (2018-12-18)
* (bluefox) Change the name of adapter

### 0.1.8 (2018-10-21)
* (bluefox) Added extended diagnostics

### 0.1.7 (2018-10-14)
* (bluefox) The configuration dialog was corrected
* (bluefox) The possibility to create the answer with script for the custom skill was implemented.

### 0.1.4 (2018-09-26)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2018 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.