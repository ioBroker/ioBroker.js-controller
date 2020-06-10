---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.text2command/README.md
title: ioBroker.text2command
hash: AbQO0H/J064n6WlPsVLyGpk/h6Tn0PFaXxY20RhIgjU=
---
![Logo](../../../en/adapterref/iobroker.text2command/admin/text2command.png)

![Anzahl der Installationen](http://iobroker.live/badges/text2command-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.text2command.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.text2command.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.text2command.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.text2command.png?downloads=true)

# IoBroker.text2command
## Beschreibung
Dieser Adapter kann normale Sätze wie *'Licht in der Küche einschalten'* in einen bestimmten Befehl konvertieren und den Status *'adapter.0.device.kitchenLight'* auf **true** setzen.

Dieser Adapter macht keinen Sinn, um eigenständig aktiviert zu werden. Es sollte mit anderen Adaptern wie Telegramm oder Android App **iobroker.vis** verwendet werden.

## Verwendungszweck
Um den Befehl auszuführen, schreiben Sie den Status **text2command. <INSTANCE> .text** mit dem Satz. Sie erhalten die Antwort immer in **text2command. <INSTANCE> .response**

Wenn Sie **Antwort auf ID** definieren, wird die Antwort auch in diese ID geschrieben. Dies ist z.B. zu erkennen, die Stimme bestätigt.

Sie können eine Nachricht per Messagebox aus Javascript senden. Die Antwort wird in der Nachricht zurückkommen:

```
sendTo('text2command', 'Switch light in kitchen on', function (err, response) {
    console.log('Response is: ' + response);
});
```

Reguläre Ausdrücke können verwendet werden, wie: ```/^light\son|^lamp\son/```. Reguläre Ausdrücke unterscheiden immer zwischen Groß- und Kleinschreibung.

Um "Ein- / Ausschalten nach Funktion" zu verwenden, sollten Sie sich um Funktionen kümmern.

Schlüsselwörter funktionieren wie folgt:

- Schlüsselwörter werden durch Leerzeichen geteilt
- Alle Schlüsselwörter müssen in einem Satz enthalten sein, um eine Regel auszulösen: z. Schlüsselwort: `` `Licht an``` wird ausgelöst bei` `` Licht einschalten```, `` `Licht überall einschalten``` und nicht bei` `` Einschalten```, `` `auslösen Licht machen```.
- Ein Schlüsselwort kann viele Formen haben. Variationen des Schlüsselworts müssen durch "/" geteilt werden. Z.B. Schlüsselwörter: `` `switch / make / do light on / true``` wird ausgelöst:` `` do light true```, `` `make please light on```.
- Wenn das Schlüsselwort in vielen Fällen vorkommen kann (nom, gen, akkusativ, plural, ...), müssen alle als Variationen aufgeführt werden, z. B.: `` `Licht / Lichter einschalten```.

Folgende Funktionen werden interpretiert als

enum.functions:

** enum.functions.light ** (Licht | Свет):

- Rollen - Level.Dimmer
- Rollen - switch.light

** enum.functions.backlight ** (Beleuchtung | Подсветка):

- Rollen - Ebene. Hintergrundbeleuchtung
- Rollen - switch.backlight

** enum.functions.blinds / shutter ** (Rolladen | Жалюзи / окна)

- Rollen - level.blind
- Rollen - switch.blind

** enum.functions.curtain ** (Vorweisungen | Шторы)

- Rollen - Level.Curtain
- Rollen - switch.curtain

** enum.functions.heating ** (Heizung | Отопление / Подогрев)

- Rollen - Ebene.Temperatur
- Rollen - Schaltertemperatur

** enum.functions.music ** (Musik | Музыка)

- Rollen - Button.play
- Rollen - button.stop / button.pause

** enum.functions.alarm / security ** (Alarmanlage / Alarm | Охрана)

- Rollen - switch.security

** enum.functions.lock ** (Schloß / Schloss | Замок)

- Rollen - switch.open
- Rollen - switch.lock

Folgende Räume werden unterstützt:

| Schlüsselwort in Phrase | Mögliche enum.rooms in englisch | auf deutsch | auf russisch |
|-----------------------|---------------------------------|--------------------------|------------------------|
| überall | überall | - | - |
| leben | Wohnzimmer | wohnzimmer | зал |
| Schlafzimmer | Schlafzimmer / Schlafzimmer | schlafzimmer | спальня |
| Bad | Bad / Badewanne | badezimmer / schlecht | ванная |
| Arbeit / Büro | Büro | Arbeitszimmer | кабинет |
| Kinder / Kind / Kindergarten | Kindergarten | Kinderzimmer | детская |
| guets wc / gästeschrank | guestwc | gästewc | гостевой туалет |
| WC / Schrank | wc | wc | туалет |
| Etage / betreten | Boden | diele / gang / flur | коридор / прихожая |
| Küche | Küche | küche / kueche | кухня |
| Balkon / Terrasse / Terrasse | Terrasse | balkon / terrasse | терасса / балкон |
| Abendessen | Esszimmer | esszimmer | столовая |
| Garage | Garage | Garage | гараж |
| Treppe | Treppe | trepe / treppenhaus | лестница |
| Garten | Garten | garten | сад |
| Gericht / Hof | Gericht | hof | двор |
| Gästezimmer | Gästezimmer | gästezimmer | гостевая |
| Dachboden | Dachboden | speicher | кладовка |
| Dach | Dach | dachstuhl | крыша |
| Terminal | Terminal | anschlussraum | сени |
| Waschraum | Waschraum | Waschraum | прачечная |
| Heizraum | Heizraum | heizraum / heizungsraum | котельная |
| Hütte | Hütte | schuppen / scheune | сарай |
| Sommerhaus | Sommerhaus | gartenhaus | теплица |

Sie können Muster in Bestätigungen verwenden:

- %s : Wert
-% u: Einheit
-% n: Name (geplant!)
- {objectId}: Der Status dieser objectID wird hier platziert

Folgende Befehle werden unterstützt:

### Wie spät ist es?
Antwort: 14:56 (aktuelle Zeit)

### Wie ist dein Name?
Die Antwort ist anpassbar. Voreinstellung: ```My name is Alpha```

### Wie ist die Außentemperatur?
Der Benutzer muss die Status-ID angeben, unter der die Außentemperatur abgelesen werden soll.
Die Antwort ist anpassbar. Standard: ```Outside temperature is %s %u``` **%s** werden durch Temperatur ersetzt, auf ganze Zahl gerundet. **u** wird durch Einheiten dieses Zustands oder durch Systemtemperatureinheiten ersetzt.

### Wie hoch ist die Innentemperatur?
Der Benutzer muss die Status-ID angeben, unter der die Innentemperatur abgelesen werden soll.
Die Antwort ist anpassbar. Standard: ```Inside temperature is %s %u``` **%s** werden durch Temperatur ersetzt, auf ganze Zahl gerundet. **u** wird durch Einheiten dieses Zustands oder durch Systemtemperatureinheiten ersetzt.

### Ein- / Ausschalten nach Funktion
Dieser Befehl liest Informationen aus Aufzählungen. Es verwendet **enum.functions** um den Gerätetyp (z. B. Licht, Alarm, Musik) zu finden, und **enum.rooms** um den Raumnamen zu ermitteln.

Beispiel auf Deutsch: ![Aufzählungen](../../../en/adapterref/iobroker.text2command/img/enums.png)

Schlüsselwörter zum Einschalten sind: *einschalten* z. ```switch rear light in bath on```

Schlüsselwörter zum Ausschalten sind: *Ausschalten* z. ```switch light in living room off```

Die Antwort wird auf Wunsch automatisch generiert: ```Switch off %function% in %room%```, wobei% function% und% room% durch den gefundenen Gerätetyp und den gefundenen Standort ersetzt werden.

Befehl akzeptiert auch den numerischen Wert. Es hat Priorität, z. im Befehl ```switch light off in living room on 15%``` wird das Licht auf 15% gesetzt und nicht im *Aus* -Zustand.

Sie können den Standardraum in [] definieren. Zum Beispiel ```switch the light on[sleepingroom]```

### Jalousien öffnen / schließen
Dieser Befehl liest Informationen aus Aufzählungen. Es verwendet **enum.functions.blind** um Jalousien oder Rollläden zu finden, und **enum.rooms** um den Raumnamen zu erkennen.

Schlüsselwörter, um Jalousien nach oben zu bewegen, sind: *Jalousien nach oben* z. ```set blinds up in sleeping room```

Schlüsselwörter, um Jalousien nach unten zu bewegen, sind: *Jalousien nach unten* z. ```move blinds down in office```

Sie können die genaue Position des Blinds in Prozent angeben, z. ```move blinds to 40 percent in office```

Die Antwort wird auf Wunsch automatisch generiert: ``` in %room%```, wobei% room% durch den gefundenen Gerätetyp und den gefundenen Standort ersetzt wird.

### Schalten Sie etwas ein / aus
Der Benutzer muss die Status-ID des Geräts angeben, die gesteuert werden muss, und den Wert, der geschrieben werden muss.

Sie sollten für jede Position eine Regel erstellen (z. B. für *ein* und für *aus* .

Die Antwort ist anpassbar. Voreinstellung: ```Switched on```

Z.B.:

- `` `Alarm deaktivieren```, Objekt-ID:` `` hm-rpc.0.alarm```, Wert: `` `false```, Antwort:` `` Alarm ist deaktiviert / deaktiviert``` . In diesem Fall wird die Antwort zufällig zwischen *Alarm ist deaktiviert* und *Deaktiviert* aufgeteilt.
- `` `Alarm aktivieren```, Objekt-ID:` `` hm-rpc.0.alarm```, Wert: `` `true```, Antwort:` `` Alarm ist aktiviert / aktiviert / erledigt` ``. In diesem Fall wird die Antwort zufällig zwischen *Alarm ist aktiviert* *Aktiviert* und *Fertig* aufgeteilt.

* Deaktivieren * muss an erster Stelle in der Liste stehen, da es länger ist.

Sie können Float-Werte in den Steuerbefehlen verwenden. Wenn der Text einen numerischen Wert enthält, wird dieser als Steuerwert verwendet und der vordefinierte Wert wird ignoriert.

Z.B. für Regel für Regel:

- `` `Lichtstärke einstellen```, Objekt-ID:` `` hm-rpc.0.light.STATE```, Wert: `` `10```, Antwort:` `` Stufe auf %s  eingestellt % `` `.

Wenn der Befehl wie ```Set light level to 50%``` ist, wird in die ```hm-rpc.0.light.STATE``` 50 geschrieben und die Antwort lautet ```Level set to 50%```.

Wenn der Befehl wie ```Set light level``` ist, wird in die ```hm-rpc.0.light.STATE``` 10 geschrieben und die Antwort lautet ```Level set to 10%```.

### Nach etwas fragen
Der Benutzer muss die Status-ID des Geräts angeben, welcher Wert gelesen wird.
Diese Vorlage wird mit Informationen aus einem bestimmten Bundesstaat beantwortet.

Z.B.:

- `` `Fenster geöffnet```, Objekt-ID:` `` javascript.0.countOpenedWindows```, Bestätigung: `` `Tatsächliche %s  Fenster geöffnet```
- `` `Temperaturschlafzimmer```, Objekt-ID:` `` hm-rpc.0.sleepingRoomSensor.TEMPERATURE```, Bestätigung: `` `Die tatsächliche Temperatur im Schlafzimmer beträgt %s % u /% s% u `` `. In diesem Fall wird die Antwort zufällig zwischen *Die tatsächliche Temperatur im Schlafzimmer beträgt% s% u* und *s% u*

### Text an Status senden
Sie können Text in den Status schreiben. Der Benutzer muss die Status-ID angeben, um Text hinein zu schreiben.

Z.B. Regel: ```email [to] wife```, Objekt-ID: ```javascript.0.emailToWife```, Bestätigung: ```Email sent``` Text: *E-Mail an meine Frau senden: Ich werde zu spät kommen* Der Adapter sucht das letzte Wort aus Schlüsselwörtern (in diesem Fall *Frau* , extrahiert Text aus dem nächsten Wort (in diesem Fall *Ich komme zu spät* und schreibt diesen Text in *javascript.0.emailToWife* Word *bis* ist nicht erforderlich, um die Regel auszulösen, wird jedoch aus dem Text entfernt.

### Du bist gut (nur zum Spaß)
Die Antwort ist anpassbar. Voreinstellung: ```Thank you``` oder ```You are welcome```

### Danke (Nur zum Spaß)
Die Antwort ist anpassbar. Voreinstellung: ```No problem``` oder ```You are welcome```

### Antwort erstellen
Sie können eine Antwort mit Bindungen {objectId} zur Bestätigung generieren. Wird für Alexa verwendet.

Z.B.:

- `` `Fenster geöffnet```, Bestätigen:` `` Tatsächliche {javascript.0.countOpenedWindows} Fenster geöffnet```
- `` `Temperaturschlafzimmer```, Bestätigung:` `` Die tatsächliche Temperatur im Schlafzimmer beträgt {t: hm-rpc.0.sleepingRoomSensor.TEMPERATURE; Math.round (t)} / {hm-rpc.0.sleepingRoomSensor.TEMPERATURE; runder (1)} Grad```. In diesem Fall wird die Antwort zufällig zwischen *Die tatsächliche Temperatur im Schlafzimmer ist <WERT>* und *<WERT>*

Weitere Informationen zu Bindungen finden Sie hier: (Bindungen von Objekten) [https://github.com/ioBroker/ioBroker.vis#bindings-of-objects]

Zusätzlich können Sie die Zeit bis jetzt mit {hm-rpc.0.light.STATE.lc; dateinterval} (2 Minuten und 12 Sekunden) oder {hm-rpc.0.light.STATE.lc; dateinterval (true)} ( 2 Minuten und 12 Sekunden **vor**

## Externe Regeln mit Javascript
Es besteht die Möglichkeit, mithilfe der Javascript-Engine Befehle in text2command zu verarbeiten.
Dazu müssen Sie in "Prozessorstatus-ID" (Erweiterte Einstellungen) einen Status angeben und diesen Status in einem JS- oder Blockly-Skript abhören.
Sie können einen Status manuell in admin oder im Skript erstellen. Das Verarbeitungsskript kann folgendermaßen aussehen:

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

Legen Sie in den Einstellungen von text2command **Prozessorstatus-ID** *javascript.0.textProcessor* fest, damit dieses Beispiel funktioniert.

Zuerst wird der Befehl mit Ihrem Javascript verarbeitet. Wenn Javascript mit '' antwortet oder nicht in vordefinierter Zeit (standardmäßig 1 Sekunde) antwortet, wird der Befehl durch Regeln verarbeitet.

# Machen
- in russischen männlichen und weiblichen Antworten.

## Installieren
```iobroker add text2command```

## Changelog

### 1.3.1 (2019-07-18)

* (unltdnetworx) changed copyright year to 2019, according to issue #41
* (unltdnetworx) additional words for blinds and functions in english and german
* (unltdnetworx) fixed typo

### 1.3.0 (2019-07-18)

* (bluefox) Using the defined language by words

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

Copyright (c) 2014-2020, bluefox <dogafox@gmail.com>

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