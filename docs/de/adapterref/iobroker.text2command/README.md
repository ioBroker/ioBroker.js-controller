---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.text2command/README.md
title: text2Befehl
hash: v/62tWbiUamGI5neCCj9swtQFEsHpzk2pjuNLKp2nZM=
---
![Logo](../../../en/adapterref/iobroker.text2command/admin/text2command.png)

![Anzahl der Installationen](http://iobroker.live/badges/text2command-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.text2command.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.text2command.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.text2command.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.text2command.png?downloads=true)

# Text2command ==================
## Beschreibung
Dieser Adapter kann normale Sätze wie *'Licht in Küche einschalten'* in einen bestimmten Befehl umwandeln und setzt den Status *'adapter.0.device.kitchenLight'* auf **true**

Dieser Adapter hat keinen Sinn, als eigenständiges Gerät aktiviert zu werden. Es sollte mit anderen Adaptern wie Telegramm oder Android-App **iobroker.vis** verwendet werden.

## Verwendungszweck
Um den Befehl auszuführen, schreiben Sie den Status **text2command. <INSTANCE> .text** mit dem Satz. Die Antwort erhalten Sie immer in **text2command. <INSTANCE> .response**

Wenn Sie **Antwort auf ID** definieren, wird die Antwort auch in diese ID geschrieben. Dies ist erforderlich für z. die Stimme zu erkennen bestätigt.

Sie können eine Nachricht per Messagebox von Javascript aus senden. Die Antwort wird in der Nachricht zurückkommen:

```
sendTo('text2command', 'Switch light in kitchen on', function (err, response) {
    console.log('Response is: ' + response);
});
```

Reguläre Ausdrücke können verwendet werden wie: ```/^light\son|^lamp\son/```. Reguläre Ausdrücke sind immer unabhängig von Groß- und Kleinschreibung.

Um "Ein / Ausschalten nach Funktion" zu verwenden, sollten Sie sich um Funktionen kümmern.

Keywords funktionieren wie folgt:

- Schlüsselwörter sind nach Leerzeichen unterteilt
- Alle Schlüsselwörter müssen in einem Satz enthalten sein, um eine Regel auszulösen: z. Schlüsselwort: `` `light on``` wird auf` `` switch light on````, `` `überall Licht einschalten``` und nicht auf` `` einschalten````, `` ` Licht machen```
- Ein Keyword kann viele Formen haben. Variationen des Schlüsselworts müssen durch "/" geteilt werden. Z.B. Schlüsselwörter: `` `switch / make / do light on / true``` wird ausgelöst:` `` do light true```, `` `make please light on```.
- Wenn Schlüsselwörter in vielen Fällen (nom, gen, akkusativ, plural) auftreten können, müssen sie alle als Variationen aufgeführt werden, wie zum Beispiel: `` `switch light / lights on```.

Folgende Funktionen werden als interpretiert

enum.functions:

** enum.functions.light ** (Licht | Свет):

- Rollen - Level.dimmer
- Rollen - switch.light

** enum.functions.backlight ** (Beleuchtung | Подсветка):

- Rollen - Hintergrundbeleuchtung
- Rollen - Switch.backlight

** enum.functions.blinds / shutter ** (Rolladen | Жалюзи / окна)

- Rollen - Level.blind
- Rollen - switch.blind

** enum.functions.curtain ** (Vorhänge | Шторы)

- Rollen - Ebene. Vorhang
- Rollen - Switch.Curtain

** enum.functions.heating ** (Heizung | Отопление / Подогрев)

- Rollen - Füllstand.Temperatur
- Rollen - Schalttemperatur

** enum.functions.music ** (Musik | Музыка)

- Rollen - Button.play
- Rollen - button.stop / button.pause

** enum.functions.alarm / security ** (Alarmanlage / Alarm | Охрана)

- Rollen - Schaltersicherheit

** enum.functions.lock ** (Schloß / Schloss | Замок)

- Rollen - switch.open
- Rollen - Schaltverriegelung

Folgende Räume werden unterstützt:

| Schlüsselwort im Satz | Mögliche enum.rooms auf englisch | auf deutsch | auf russisch |
|-----------------------|---------------------------------|--------------------------|------------------------|
| überall | überall | - | - |
| leben | wohnzimmer | wohnzimmer | зал |
| Schlafzimmer | Schlafzimmer / Schlafzimmer | schlafzimmer | спальня |
| Bad | Bad / Badewanne | badezimmer / bad | ванная |
| arbeiten / büro | Büro | arbeitszimmer | кабинет |
| Kinder / Kinder / Kindergarten Kindergarten | Kinderzimmer | детская |
| Guets WC / Gäste-Schrank | guestwc | gästewc | гостевой туалет |
| WC / Schrank | wc | wc | туалет |
| Boden / Enter | Boden | diele / gang / flur | коридор / прихожая |
| Küche | Küche | küche / kueche | кухня |
| Balkon / Terrasse / Terrasse | Terrasse | Balkon / Terrasse | терасса / балкон |
| Essen | Esszimmer | esszimmer | столовая |
| Garage | Garage | Garage | гараж |
| Treppe | Treppen | trepe / treppenhaus | лестница |
| Garten | Garten | garten | сад |
| Hof / Hof | Gericht | hof | двор |
| Gästezimmer | Gästezimmer | gästezimmer | гостевая |
| Dachboden | Dachboden | Speicher | кладовка |
| Dach | Dach | dachstuhl | крыша |
| terminal | terminal | anschlussraum | сени |
| Waschraum | Waschraum | waschraum | прачечная |
| Heizraum | Wärmekammer | heizraum / heizungsraum | котельная |
| hovel | hovel | schuppen / scheune | сарай |
| Sommerhaus | Sommerhaus | gartenhaus | теплица |

Sie können Muster in Bestätigungen verwenden:

- %s : Wert
-% o: Einheit
-% n: Name (geplant!)
- {objectId}: Der Status dieser objectID wird hier eingefügt

Folgende Befehle werden unterstützt:

### Wie spät ist es?
Antwort: 14:56 (aktuelle Uhrzeit)

### Wie heißen Sie?
Die Antwort ist anpassbar. Voreinstellung: ```My name is Alpha```

Was ist die Außentemperatur?
Der Benutzer muss die Status-ID angeben, wo die Außentemperatur gelesen werden soll.
Die Antwort ist anpassbar. Standardeinstellung: ```Outside temperature is %s %u``` **%s** wird durch die Temperatur ersetzt und auf Ganzzahl gerundet. **u** wird durch Einheiten dieses Zustands oder durch Systemtemperatureinheiten ersetzt.

Was ist die Innentemperatur?
Der Benutzer muss die Status-ID angeben, wo die Innentemperatur gelesen werden soll.
Die Antwort ist anpassbar. Standardeinstellung: ```Inside temperature is %s %u``` **%s** wird durch die Temperatur ersetzt und auf Ganzzahl gerundet. **u** wird durch Einheiten dieses Zustands oder durch Systemtemperatureinheiten ersetzt.

### Mit Funktion ein- / ausschalten
Dieser Befehl liest Informationen aus Aufzählungen. Es verwendet **enum.functions** um den Gerätetyp (z. B. Licht, Alarm, Musik) und **enum.rooms** zum Ermitteln des Raumnamens zu finden.

Beispiel in deutscher Sprache: ![Aufzählungen](../../../en/adapterref/iobroker.text2command/img/enums.png)

Schlüsselwörter zum Einschalten sind: *Einschalten* z. ```switch rear light in bath on```

Schlüsselwörter zum Ausschalten sind: *Ausschalten* z. ```switch light in living room off```

Die Antwort wird automatisch generiert, falls gewünscht: ```Switch off %function% in %room%```, wobei% function% und% room% durch den gefundenen Gerätetyp und die Position ersetzt werden.

Der Befehl akzeptiert auch den numerischen Wert. Es hat Priorität, z. In dem Befehl ```switch light off in living room on 15%``` wird das Licht auf 15% gesetzt und nicht im Zustand *aus*

Sie können einen Standardraum in [] definieren. E. ```switch the light on[sleepingroom]```

### Jalousien öffnen / schließen
Dieser Befehl liest Informationen aus Aufzählungen. Es verwendet **enum.functions.blind** um Typjalousien oder Rollläden zu finden, und **enum.rooms** um den Raumnamen zu ermitteln.

Schlüsselwörter zum Hochfahren von Blinds sind: *Blinds* z. ```set blinds up in sleeping room```

Schlüsselwörter, um Blinds nach unten zu bewegen, sind: *Blinds nach unten* z. ```move blinds down in office```

Sie können die genaue Position von Blind in Prozent angeben, z. ```move blinds to 40 percent in office```

Die Antwort wird automatisch generiert, falls gewünscht: ``` in %room%```, wobei% room% durch den gefundenen Gerätetyp und Ort ersetzt wird.

### Schalten Sie etwas ein / aus
Der Benutzer muss die Status-ID des Geräts angeben, die gesteuert werden muss, und den Wert, der geschrieben werden muss.

Sie sollten für jede Position eine Regel erstellen (z. B. für *ein* und für *aus* .

Die Antwort ist anpassbar. Voreinstellung: ```Switched on```

Z.B.:

- `` `Alarm deaktivieren```, Objekt-ID:` `hm-rpc.0.alarm```, Wert:` `` false```, Antwort: `` `Alarm ist deaktiviert / deaktiviert ``` . In diesem Fall wird die Antwort zwischen *Alarm deaktiviert* und *Deaktiviert* randomisiert.
- `` `Alarm aktivieren```, Objekt-ID:` `hm-rpc.0.alarm```, Wert:` `` true```, Antwort: `` `Alarm ist aktiviert / aktiviert / fertig` ``. In diesem Fall wird die Antwort zwischen *Alarm aktiviert* *Aktiviert* und *Fertig* randomisiert.

* Deaktivieren * muss an erster Stelle der Liste stehen, da es länger ist.

Sie können Gleitkommawerte in den Steuerbefehlen verwenden. Wenn ein numerischer Wert im Text enthalten ist, wird dieser als Steuerwert verwendet und der vordefinierte Wert wird ignoriert.

Z.B. für die Regel für die Regel:

- `` `Set light level``` ', Objekt-ID:` `` hm-rpc.0.light.STATE```, Wert: `` `10```, Antwort:` `` Level auf %s  gesetzt % ``.

Wenn der Befehl wie ```Set light level to 50%``` ist, so wird in die ```hm-rpc.0.light.STATE``` 50 geschrieben, und die Antwort wird ```Level set to 50%``` sein.

Wenn der Befehl wie ```Set light level``` ist, so wird in die ```hm-rpc.0.light.STATE``` 10 geschrieben und die Antwort wird ```Level set to 10%``` sein.

### Nach etwas fragen
Der Benutzer muss die Status-ID des Geräts angeben, dessen Wert gelesen wird.
Diese Vorlage antwortet mit Informationen aus einem bestimmten Zustand.

Z.B.:

- `` `window closed````, Objekt-ID:` `javascript.0.countOpenedWindows```, Bestätigen:` `'Aktuelle %s -Fenster geöffnet```
- `` `Temperature sleeping room``` ', Objekt-ID:` `hm-rpc.0.sleepingRoomSensor.TEMPERATURE````, Bestätigung:` `` Die tatsächliche Temperatur im Schlafzimmer ist %s % u /% s% u `` `. In diesem Fall wird die Antwort zwischen *Ist-Temperatur im Schlafraum% s% u* und *s% u* randomisiert.

### Senden Sie Text an den Status
Sie können Text in den Status schreiben. Der Benutzer muss die Status-ID angeben, um Text in ihn zu schreiben.

Z.B. Regel: ```email [to] wife```, Objekt-ID: ```javascript.0.emailToWife```, Bestätigung: ```Email sent``` Text: *E-Mail an meine Frau senden: Ich komme zu spät* Der Adapter sucht das letzte Wort aus Schlüsselwörtern (in diesem Fall *Ehefrau* , extrahiert den Text aus dem nächsten Wort (in diesem Fall *Ich komme zu spät* und schreibt diesen Text in *javascript.0.emailToWife* Word *bis* ist nicht erforderlich, um die Regel auszulösen, wird jedoch aus dem Text entfernt.

### Du bist gut (Nur zum Spaß)
Die Antwort ist anpassbar. Default: ```Thank you``` oder ```You are welcome```

Vielen Dank (Nur zum Spaß)
Die Antwort ist anpassbar. Default: ```No problem``` oder ```You are welcome```

Antwort erstellen
Sie können eine Antwort mit Bindings {objectId} in Acknowledge erzeugen. Wird für alexa verwendet.

Z.B.:

- `` `windows closed```, Bestätigen:` `Actual {javascript.0.countOpenedWindows} Fenster geöffnet````
- `` `` `` Temperatur-Schlafraum````, Bestätigung: `` `Die tatsächliche Temperatur im Schlafzimmer ist {t: hm-rpc.0.sleepingRoomSensor.TEMPERATURE; Math.round (t)} / {hm-rpc.0.sleepingRoomSensor.TEMPERATURE; rund (1)} grad```. In diesem Fall wird die Antwort zwischen *Ist-Temperatur im Schlafraum <VALUE>* und *<VALUE>* randomisiert.

Weitere Informationen zu Bindungen finden Sie hier: (Bindungen von Objekten) [https://github.com/ioBroker/ioBroker.vis#bindings-of-objects]

Zusätzlich können Sie bis jetzt Zeit erhalten durch {hm-rpc.0.light.STATE.lc; dateinterval} (2 Minuten und 12 Sekunden) oder {hm-rpc.0.light.STATE.lc; dateinterval (true)} ( Vor 2 Minuten und 12 Sekunden **)

## Externe Regeln mit Javascript
Es gibt eine Möglichkeit, Javascript-Engine zu verwenden, um Befehle in text2command zu verarbeiten.
Dazu müssen Sie in "Prozessorstatus-ID" (Erweiterte Einstellungen) einen bestimmten Status angeben und diesen Status in einem JS- oder Blockly-Skript überwachen.
Sie können einen Status manuell in admin oder in Skript erstellen. Das Skript kann wie folgt aussehen:

```
createState("textProcessor", '', function () {
    // text2command writes the value with ack=false. Change "any" is important too, to process repeated commands.
    on({id: "javascript.0.textProcessor", ack: false, change: 'any'}, function (obj) {
         var task = JSON.parse(obj.state.val);
         // value looks like
         // {
         //     "command":      "text to process", // command that was received by text2command
         //     "language":     "en",              // language in command or system language
         //     "withLanguage": false              // indicator if language was defined in command (true) or used default language (false)
         // }
         // response to text2command with ack=true
         if (task.command === 'switch light on') {
            setState("hm-rpc.0.light", true);
            setState("javascript.0.textProcessor", 'light is on', true);
         } else {
            // let it process with predefined rules
            setState("javascript.0.textProcessor", '', true);
         }
    });
});
```

Legen Sie in den Einstellungen von text2command **Processor state ID** als *javascript.0.textProcessor* fest, damit dieses Beispiel funktioniert.

Zuerst wird der Befehl mit Ihrem Javascript verarbeitet. Wenn Javascript mit '' antwortet oder nicht in vordefinierter Zeit (standardmäßig 1 Sekunde) antwortet, wird der Befehl durch Regeln verarbeitet.

# Machen
- in russischen männlichen und weiblichen Antworten.

## Installieren
```iobroker add text2command```

## Changelog
### 1.2.5 (2019-02-12)
* (unltdnetworx) description in german corrected
* (unltdnetworx) added percent to true/false rules

### 1.2.4 (2018-05-05)
* (Apollon77) Fix

### 1.2.3 (2018-05-01)
* (bluefox) Support of bindings in answer {objId}

### 1.2.0 (2018-04-23)
* (bluefox) Support of Admin3 (but not materialize style)

### 1.1.7 (2018-04-04)
* (bluefox) The parsing error was fixed

### 1.1.6 (2017-10-05)
* (bluefox) Check if units are undefined

### 1.1.5 (2017-08-14)
* (bluefox) Support of iobroker.pro

### 1.1.4 (2017-03-27)
* (bluefox) translations

### 1.1.3 (2016-08-30)
* (bluefox) russian translations

### 1.1.2 (2016-08-29)
* (bluefox) fix the russian temperature text
* (bluefox) extend rule "control device" with option 0/1
* (bluefox) use by control of devices min/max values if set

### 1.1.1 (2016-08-19)
* (bluefox) add additional info for external text processor

### 1.1.0 (2016-08-16)
* (bluefox) add text processor state ID

### 1.0.2 (2016-07-22)
* (bluefox) fix error with detection of numeric values

### 1.0.1 (2016-06-01)
* (bluefox) fix: send text command

### 1.0.0 (2016-05-05)
* (bluefox) replace special chars in input text: #'"$&/\!?.,;:(){}^

### 0.1.10 (2016-03-20)
* (bluefox) fix double pronunciation of some answers

### 0.1.9 (2016-03-20)
* (bluefox) ignore spaces

### 0.1.8 (2016-03-15)
* (bluefox) fix error with enums

### 0.1.7 (2016-03-12)
* (bluefox) implement "say something"

### 0.1.6 (2016-02-24)
* (bluefox) fix temperature

### 0.1.5 (2016-02-23)
* (bluefox) fix russian outputs

### 0.1.4 (2016-02-22)
* (bluefox) fix russian outputs

### 0.1.3 (2016-02-21)
* (bluefox) round temperature in answers

### 0.1.2 (2016-02-21)
* (bluefox) implement russian time

### 0.1.1 (2016-02-19)
* (bluefox) check invalid commands

### 0.1.0 (2016-02-19)
* (bluefox) fix problem with controlling of channels
* (bluefox) enable write JSON as argument

### 0.0.3 (2016-02-14)
* (bluefox) remove unused files

### 0.0.2 (2016-02-10)
* (bluefox) extend readme

### 0.0.1 (2016-02-09)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2014-2018, bluefox<dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.