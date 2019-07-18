---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iot/README.md
title: ioBroker IoT Adapter
hash: SvLxJ27B2YAyqHKMejjyRanFjD+2LVt6woSOELM7nHs=
---
![Logo](../../../en/adapterref/iobroker.iot/admin/iot.png)

![Anzahl der Installationen](http://iobroker.live/badges/iot-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.iot.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.iot.svg)
![NPM](https://nodei.co/npm/iobroker.iot.png?downloads=true)

# IoBroker IoT Adapter
Dieser Adapter ist NUR für die Kommunikation mit Amazon Alexa vorgesehen.
Es ist nicht für den Remotezugriff auf Ihre ioBroker-Instanz vorgesehen. Verwenden Sie dafür den Adapter ioBroker.cloud.

## Die Einstellungen
Um den Cloud-Adapter zu verwenden, müssen Sie sich zunächst in der ioBroker-Cloud registrieren. [https://iobroker.pro](https://iobroker.pro).

![Intro](../../../en/adapterref/iobroker.iot/img/intro.png)

### Sprache
Wenn Sie die Standardsprache auswählen, werden die Smart-Namen von Geräten und Aufzählungen nicht übersetzt. Wenn eine Sprache angegeben ist, werden alle bekannten Namen in diese Sprache übersetzt.
Es wird getan, um zu Demonstrationszwecken schnell zwischen vielen Sprachen zu wechseln.

### Platziere die Funktion zuerst in den Namen
Ändern Sie die Reihenfolge der Funktionen und Rollen in selbst generierten Namen:

- wenn falsch: "Raumfunktion", z. "Wohnzimmer Dimmer"
- wenn ja: "Veranstaltungsraum", z. "Dimmer Wohnzimmer"

Verketten Sie Wörter mit
Sie können das Wort definieren, das zwischen Funktion und Raum platziert wird. Z.B. "In" und von "Dimmer Wohnzimmer" wird "Dimmer im Wohnzimmer" sein.

Dies wird jedoch nicht empfohlen, da die Erkennungs-Engine ein weiteres Wort analysieren muss und dies zu Missverständnissen führen kann.

### OFF-Pegel für Schalter
Einige Gruppen bestehen aus gemischten Geräten: Dimmern und Schaltern. Sie können mit den Befehlen "EIN" und "AUS" und mit Prozenten gesteuert werden.
Wenn der Befehl "Set to 30%" und der * OFF-Pegel "30%" ist, werden die Schalter eingeschaltet. Mit dem Befehl "Set to 25%" werden alle Schalter ausgeschaltet.

Wenn der Befehl "OFF" ist, speichert der Adapter außerdem den aktuellen Dimmerpegel, wenn der tatsächliche Wert über oder gleich "30%" ist.
Später, wenn der neue "EIN" -Befehl kommt, schaltet der Adapter den Dimmer nicht auf 100%, sondern auf den Pegel im Speicher.

Beispiel:

- Nehmen Sie an, dass *OFF level* 30% ist.
- Das virtuelle Gerät "Light" verfügt über zwei physikalische Geräte: *switch* und *dimmer*
- Befehl: "Licht auf 40 %s tellen". Der Adapter speichert diesen Wert für *dimmer* stellt ihn auf "dimmer" und schaltet den *Schalter* ein.
- Befehl: "Licht ausschalten". Der Adapter stellt den *Dimmer* auf 0% und schaltet den *Schalter* aus.
- Befehl: "Licht einschalten". *Dimmer* => 40%, *Schalter* => EIN.
- Befehl: "Licht auf 20 %s tellen". *Dimmer* => 20%, *Schalter* => AUS. Der Wert für den Dimmer wird nicht gespeichert, da er unter *OFF level* liegt.
- Befehl: "Licht einschalten". *Dimmer* => 40%, *Schalter* => EIN.

### Von ON
Sie können das Verhalten des EIN-Befehls für den Nummernstatus auswählen. Der spezifische Wert kann ausgewählt werden oder der letzte Wert ungleich Null wird verwendet.

### Antwort schreiben an
Für jeden Befehl wird die Textantwort generiert. Hier können Sie die Objekt-ID definieren, in die dieser Text geschrieben werden muss. Z.B. *sayit.0.tts.text*

### Farben
Momentan unterstützt nur die englische alexa die Farbsteuerung.
Der Kanal muss 4 Zustände mit folgenden Rollen haben:

- level.color.saturation (zur Erkennung des Kanals erforderlich),
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
Um die Sperren sperren zu können, muss der Status die Rolle "switch.lock" und native.LOCK_VALUE haben, um den Sperrstatus zu bestimmen.

```
Alexa, is "lock name" locked/unlocked
Alexa, lock the "lock name"
```

## Wie Namen generiert werden
Der Adapter versucht, virtuelle Geräte für die Smart-Home-Steuerung zu generieren (z. B. Amazon Alexa oder Google Home).

Das sind zwei wichtige Aufzählungen: Räume und Funktionen.

Die Zimmer sind wie: Wohnzimmer, Bad, Schlafzimmer.
Funktionen sind wie: Licht, Jalousie, Heizung.

Folgende Bedingungen müssen erfüllt sein, um den Status in die automatisch generierte Liste aufzunehmen:

- Der Zustand muss in einer "Funktions" -Aufzählung sein.
- Der Zustand muss eine Rolle haben ("Zustand", "Schalter" oder "Stufe. *", z. B. Stufe.Dimmer), wenn er nicht direkt in "Funktionen" enthalten ist.

Es kann sein, dass der Kanal sich in den "Funktionen" befindet, sich aber nicht selbst angibt.

- Der Status muss schreibbar sein: common.write = true
- Der Zustandsdimmer muss den allgemeinen Typ 'Zahl' haben.
- Die Standheizung muss die Einheit '°C', '°F' oder '° K' und den Typ 'Nummer' haben.

Befindet sich der Status nur in "Funktionen" und nicht in einem "Raum", wird der Name des Status verwendet.

Die Zustandsnamen werden aus Funktion und Raum generiert. Z.B. Alle *Lichter* im *Wohnzimmer* werden im virtuellen Gerät *Wohnzimmerlicht* gesammelt.
Der Benutzer kann diesen Namen nicht ändern, da er automatisch generiert wird.
Wenn sich der Aufzählungsname ändert, wird auch dieser Name geändert. (z. B. Funktion "Licht" in "Lichter" geändert, daher wird das *Wohnzimmerlicht* in *Wohnzimmerlichter* geändert.)

Alle Regeln werden ignoriert, wenn der Status common.smartName hat. In diesem Fall wird nur der Smart Name verwendet.

Wenn *common.smartName* **false** ist, wird der Status oder die Aufzählung nicht in die Listengenerierung einbezogen.

Über den Konfigurationsdialog können Sie die einzelnen Status bequem entfernen und zu virtuellen Gruppen oder als einzelnes Gerät hinzufügen.
![Aufbau](../../../en/adapterref/iobroker.iot/img/configuration.png)

Wenn die Gruppe nur einen Status hat, kann sie umbenannt werden, da hierfür der SmartName des Status verwendet wird.
Wenn die Gruppe mehr als einen Status hat, muss die Gruppe über die Namen der Aufzählung umbenannt werden.

Um eigene Gruppen zu erstellen, kann der Benutzer den "Szenen" -Adapter installieren oder ein "Skript" im Javascript-Adapter erstellen.

### Ersetzt
Sie können Zeichenfolgen angeben, die automatisch in den Gerätenamen ersetzt werden. Zum Beispiel, wenn Sie Ersatz setzen für:

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

curl - Daten "myString" https://service.iobroker.in/v1/iotService?service=custom_ <NAME> & key = <XXX> & user = <USER_EMAIL>

```

or

```[GET]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>&data=myString```

Wenn Sie in den Einstellungen den Namen *custom_test* in das Feld "Weiße Liste für Dienste" eintragen und "custom_test" als Dienstnamen angeben, wird der Status **cloud.0.services.custom_test** auf *myString gesetzt*

Sie können "*" in die weiße Liste schreiben, und alle Dienste werden zugelassen.

Hier finden Sie Anweisungen zur Verwendung mit [Tasker](doc/tasker.md).

Der IFTTT-Dienst ist nur zulässig, wenn der IFTTT-Schlüssel festgelegt ist.

Reservierte Namen sind "ifttt", "text2command", "simpleApi", "swagger". Diese müssen ohne das Präfix ```"custom_"``` verwendet werden.

### Text2command
Sie können "text2command" in die Whitelist schreiben. Sie können eine POST-Anfrage an ```https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>``` senden, um Daten in die Variable *text2command.X.text* zu schreiben.

Sie können auch die Methode GET verwenden.

"X" kann in den Einstellungen mit der Option "Use text2command instance" definiert werden.

## Benutzerdefinierte Fertigkeit
Die Antworten für benutzerdefinierte Fertigkeiten können auf zwei Arten verarbeitet werden:

- text2command
- Javascript

### Text2command
Wenn im Konfigurationsdialog die Instanz *text2command* definiert ist, wird die Frage an die Instanz gesendet.

* text2command * muss so konfiguriert sein, dass der erwartete Ausdruck analysiert und die Antwort zurückgegeben wird.

### Javascript
Es besteht die Möglichkeit, die Frage direkt mit Skript zu bearbeiten. Sie ist standardmäßig aktiviert, wenn keine Instanz *text2command* ausgewählt ist.

Wenn die Instanz *text2command* definiert ist, muss diese Instanz die Antwort bereitstellen, und die Antwort von *script* wird ignoriert.

Der Adapter liefert die Details in zwei Zuständen mit unterschiedlicher Detailstufe

* **smart.lastCommand** enthält den empfangenen Text einschließlich Informationen zur Art der Abfrage (Intent). Beispiel: "askDevice Status Rasenmäher"
* ** smart.lastCommandObj *** enthält eine JSON-Zeichenfolge, die für ein Objekt analysiert werden kann, das die folgenden Informationen enthält
 * **words** enthält die empfangenen Wörter in einem Array
 * **intent** enthält die Art der Abfrage. Mögliche Werte sind derzeit "askDevice", "controlDevice", "actionStart", "actionEnd", "askWhen", "askWhere", "askWho"
 * **Geräte-ID** enthält eine Geräte-ID, die das Gerät angibt, an das die Anfrage gesendet wurde. Die von Amazon übermittelte ID ist eine leere Zeichenfolge, wenn sie nicht angegeben wird
 * **sessionId** enthält eine sessionId der Skill-Sitzung, sollte gleich sein, wenn mehrere Befehle gesprochen wurden, von Amazon geliefert, wird leere Zeichenfolge sein, wenn nicht angegeben
 * **Benutzer-ID** enthält eine Benutzer-ID des Gerätebesitzers (oder später des Benutzers, der mit dem Skill interagiert hat), die von Amazon bereitgestellt wird und eine leere Zeichenfolge ist, wenn sie nicht angegeben wird

 Weitere Informationen darüber, wie die Wörter erkannt werden und welche Art von Abfragen von Alexa Custom Skill unterschieden werden, finden Sie unter https://forum.iobroker.net/viewtopic.php?f=37&t=17452.

** Ergebnis über smart.lastResponse zurückgeben **

Die Antwort muss innerhalb von 200 ms im Status "smart.lastResponse" gesendet werden und kann eine einfache Textzeichenfolge oder ein JSON-Objekt sein.
Wenn es sich um eine Textzeichenfolge handelt, wird dieser Text als Antwort an den Skill gesendet.
Wenn der Text ein JSON-Objekt ist, können die folgenden Schlüssel verwendet werden:

* **responseText** muss den Text enthalten, um zu Amazon zurückzukehren
* **shouldEndSession** ist ein Boolescher Wert und steuert, ob die Sitzung geschlossen wird, nachdem die Antwort gesprochen wurde, oder offen bleibt, um eine andere Spracheingabe zu akzeptieren.

** Ergebnis per Nachricht an iot-Instanz zurücksenden **

Die iot-Instanz akzeptiert auch eine Nachricht mit dem Namen "alexaCustomResponse", die den Schlüssel "response" enthält, mit einem Objekt, das die oben beschriebenen Schlüssel **responseText** und **shouldEndSession** enthalten kann.
Die iot-Instanz antwortet nicht auf die Nachricht!

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
### 1.0.0 (2019-07-14)
* (TA2k) Google Home list was added 

### 0.5.0 (2019-06-29)
* (bluefox) tried to add yandex Alisa 

### 0.4.3 (2019-04-14)
* (Apollon77) Change enable/disable of Amazon Alexa and of Google Home from configuration to be really "active if selected". 

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

Copyright (c) 2018-2109 bluefox <dogafox@gmail.com>

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