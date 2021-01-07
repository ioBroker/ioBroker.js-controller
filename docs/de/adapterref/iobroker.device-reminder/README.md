---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.device-reminder/README.md
title: ioBroker.device-Erinnerung
hash: q4JxybjgdjPpzFLfN6T1e2bRJ22P/dHBnDEaPQwlcB4=
---
![Logo](../../../en/adapterref/iobroker.device-reminder/admin/icon.png)

![Anzahl der Installationen (stabil)](http://iobroker.live/badges/device-reminder-stable.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/device-reminder-installed.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.device-reminder.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.device-reminder.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/xenon-s/iobroker.device-reminder.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Paypal-Spende](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)
![NPM](https://nodei.co/npm/iobroker.device-reminder.png?downloads=true)

# IoBroker.device-Erinnerung
![Testen und freigeben](https://github.com/xenon-s/iobroker.device-reminder/workflows/Test%20and%20Release/badge.svg)

# Adapter zur Überwachung des Status von Geräten Version 1.0
Dieser Adapter kann mithilfe von Messbuchsen erkennen, ob ein Gerät eingeschaltet ist, in Betrieb ist oder ausgeschaltet wurde, und darauf reagieren. Nachrichten können dann automatisch per Telegramm, WhatsApp, Alexa, Sayit, Pushover und E-Mail ausgegeben werden (Mehrfachauswahl pro Gerät möglich). Es ist auch möglich, den Socket nach Abschluss des Vorgangs automatisch auszuschalten (ebenfalls zeitverzögert).

# Was ist zu beachten?
Das Aktualisierungsintervall vom &quot;Live-Verbrauchswert (wird als **&quot; _ Energie &quot;** bezeichnet)&quot; für die meisten Geräte sollte nicht mehr als 10 Sekunden betragen, da es sonst zu sehr verzögerten Nachrichten kommen kann.<br> Befehl in der Tasmota-Konsole: TelePeriod 10<br> **Hinweis:**

- Werte unter 1 Watt gelten als 0 Watt und zeigen automatisch "** ausgeschaltet **" an.
- Werte über 1 Watt zeigen das Gerät als "** Standby **" an.

# Was ist pro Einheit möglich?
- Benachrichtigung beim Start des Geräts
- Benachrichtigung am Ende des Betriebs des jeweiligen Geräts
- Telegrammbenachrichtigung (mehrere IDs sind möglich)
- Alexa-Benachrichtigung (mehrere IDs sind möglich)
- WhatsApp-Benachrichtigung (mehrere IDs sind möglich)
- Pushover-Benachrichtigung (mehrere IDs sind möglich)
- E-Mail-Benachrichtigung (mehrere IDs sind möglich)
- Benachrichtigungen können frei erstellt oder auch von einem externen Skript angegeben werden
- Datenpunkte mit dem aktuellen Status, dem Live-Verbrauch und der zuletzt gesendeten Statusmeldung, um die Werte dieses Adapters in anderen Skripten verwenden zu können
- Geräte können bei Bedarf (auch zeitverzögert) ausgeschaltet werden, wenn der Vorgang als abgeschlossen erkannt wurde.
- Sprachassistenten können über Datenpunkt vorübergehend deaktiviert werden

# Anweisung
## Gerät erstellen
![addDevice.png](../../../en/adapterref/iobroker.device-reminder/admin/addDevice.png)

- **Gerätename** Frei wählbarer Name
- **Gerätetyp** Hier müssen Sie auswählen, um welches Gerät es sich handelt, damit die Berechnungen im Adapter korrekt durchgeführt werden können.
- **Verbrauch / Energie** Klicken Sie auf die Schaltfläche mit den drei weißen Punkten, um Ihre Objektverwaltung zu öffnen. Der Datenpunkt, der den **aktuellen Live-Verbrauch** anzeigt, muss ausgewählt werden.
- **Ein- / Ausschalten** Durch Klicken auf die Schaltfläche mit den drei weißen Punkten wird Ihre Objektverwaltung geöffnet. Der Datenpunkt, der Ihre **Buchse ein- / ausschaltet** muss ausgewählt sein (nicht obligatorisch).
- Starttext **: Benachrichtigung, die beim Starten des Geräts gesendet werden soll (Sonderzeichen sind ebenfalls möglich). Es darf kein "." Am Ende!
- Endtext **: Benachrichtigung, die gesendet werden soll, wenn das Gerät seinen Betrieb beendet hat (Sonderzeichen sind ebenfalls möglich). Es darf kein "." Am Ende!

Mit **Starttext** und **Endtext** können Sie auch eine Nachricht von einem externen Datenpunkt erhalten. Diese Nachricht wird mit einer Verzögerung von 1 Sekunde vom Datenpunkt gelesen, nachdem sich der Status des Geräts geändert hat. Auf diese Weise können Sie eine Nachricht von einem externen Skript erstellen lassen. Der Adapter erkennt automatisch, ob eine Nachricht von einem Datenpunkt stammt oder ob sie einfach manuell eingegeben wurde. Um einen Datenpunkt auszuwählen, klicken Sie einfach auf die Schaltfläche mit den drei weißen Punkten und wählen Sie dann den entsprechenden Datenpunkt aus. **Bitte beachten Sie** Es kann nur entweder ein Datenpunkt **oder** eine manuell eingegebene Nachricht verwendet werden!<br><br>

## Alexa erstellen
![addAlexa.png](../../../en/adapterref/iobroker.device-reminder/admin/addAlexa.png)

- **alexa name** Frei wählbarer Name, Sonderzeichen sind ebenfalls möglich.
- **alexa "Ansage" / "Sprechen"** Hier muss der Datenpunkt ausgewählt werden, an dem Ihre Alexa sprechen kann. Um den Datenpunkt auszuwählen, klicken Sie einfach auf die Schaltfläche mit den drei kleinen weißen Punkten.
- Lautstärke 0-100 **: Lautstärke, mit der Ihre Alexa sprechen soll (von 0 - 100%).

Die letzten 4 Felder können verwendet werden, um einen Zeitraum zu erstellen, in dem Ihre Alexa sprechen darf. Standardmäßig ist der Zeitraum von 00:00 bis 23:59 aktiv.

- **"ab Stunde aktiv"** Startzeit in Stunden
- aktiv ab Minuten Startzeit in Minuten
- **"ab Stunde inaktiv"** Endzeit in Stunden
- **"ab Minuten inaktiv"** Endzeit in Minuten

<br> <br>

## SayIt-Gerät erstellen
![addSayit.png](../../../en/adapterref/iobroker.device-reminder/admin/addSayit.png)

- **sayit name** Frei wählbarer Name, Sonderzeichen sind ebenfalls möglich.
- **sayit path "../ text"** Wählen Sie den Datenpunkt "text" im jeweiligen sayIt-Geräteordner aus. Die Textausgabe wird hier gesendet.
- **Lautstärke 0-100** Lautstärke, mit der Ihr sayIt-Gerät sprechen soll (von 0 - 100%).
- **"ab Stunde aktiv"** Startzeit in Stunden
- **"ab Minuten aktiv"** Startzeit in Minuten
- **"ab Stunde inaktiv"** Endzeit in Stunden
- **"ab Minuten inaktiv"** Endzeit in Minuten

<br> <br>

## WhatsApp-Benutzer erstellen
![addWhatsapp.png](../../../en/adapterref/iobroker.device-reminder/admin/addWhatsapp.png)

- **WhatsApp-Name** Frei wählbarer Name, Sonderzeichen sind ebenfalls möglich.
- **WhatsApp-Pfad "sendMessage"** Wählen Sie den Datenpunkt "sendMessage" im jeweiligen WhatsApp-Ordner aus. Die Textausgabe wird hier gesendet.

## Pushover-Benutzer erstellen
![addPushover.png](../../../en/adapterref/iobroker.device-reminder/admin/addPushover.png)

- **Name** Frei wählbarer Name, Sonderzeichen sind ebenfalls möglich.
- ** Pushover-Instanz "**: Die Instanz, an die gesendet werden soll
- **Priorität** Die Priorität, mit der die Nachricht gesendet werden soll
- **Ton** Der Ton, der abgespielt werden soll, wenn Pushover die Nachricht empfängt.

## E-Mail-Benutzer erstellen
![addEmail.png](../../../en/adapterref/iobroker.device-reminder/admin/addEmail.png)

- **Name** Frei wählbarer Name, Sonderzeichen sind ebenfalls möglich.
- **Absenderadresse** E-Mail-Adresse, von der aus die E-Mail gesendet wird
- **Empfängeradresse** E-Mail-Adresse, die die Nachricht empfangen soll

# Standardgeräte
![default-device.png](../../../en/adapterref/iobroker.device-reminder/admin/default-devices.png) Diese Werte wurden über einen Zeitraum von mehreren Monaten und mit Hilfe zahlreicher Tester ermittelt. Änderungen an den Werten können dazu führen, dass Geräte nicht mehr korrekt aufgezeichnet werden, was zu falschen Berichten führt.

# Benutzerdefinierte Geräte
![custom-device.png](../../../en/adapterref/iobroker.device-reminder/admin/custom-devices.png) Diese Werte können vom Benutzer angepasst und dann verwendet werden. Das Folgende ist die Erklärung:

- **Startwert** Startwert in Watt, der überschritten werden muss, damit das Gerät als gestartet erkannt wird.
- Endwert **: Endwert in Watt, der unterschritten werden muss, damit das Gerät als fertig erkannt wird.
- Anzahl der Werte "Start" **: Gibt an, wie oft der "Startwert" ** nacheinander ** überschritten werden muss. Wenn Sie einmal darunter fallen, wird der Start abgebrochen. Der Durchschnitt dieser Werte muss über dem Startwert liegen, damit die Einheit als gestartet erkannt wird.

* Beispiel: Der Wert sollte 10 W betragen und dreimal hintereinander überschritten werden. 1. 15W, 2. 1W, 15W => Die Startphase wurde abgebrochen, da der zweite Wert unter 10 lag.

- Anzahl der Werte "Ende": Gibt an, wie viele Werte aufgezeichnet werden sollen, bevor berechnet wird, ob die Einheit fertig ist. Je weniger Werte hier vorhanden sind, desto ungenauer ist das Ergebnis und das Risiko falscher Berichte steigt. Je höher der Wert, desto genauer ist die Aufnahme. Der Nachteil ist jedoch, dass die fertige Nachricht mit einer langen Verzögerung gesendet wird. Das Ende wird nur erkannt, wenn "Ende der Anzahl der Werte" erreicht ist und der Durchschnittsverbrauch unter dem "Endwert" liegt.

* Kurze Beispielberechnung Die Verbrauchswerte werden alle 10 Sekunden eingegeben. **Endwert** wird auf 50 gesetzt, **Werte enden** auf 100. Nachdem das Gerät als gestartet erkannt wurde, werden 100 Werte (* Dauer 100 Werte x 10 Sekunden = 1000 Sekunden *) aufgezeichnet und erst dann wird die Durchschnittswert berechnet. Liegt dieser Wert unter 50, wird **fertig** nach ca. 16,5 Minuten (wir erinnern uns, dass **Werte enden** = 100 Werte) und eine Meldung (falls konfiguriert) erlischt. Wenn der Wert über 50 liegt, geschieht nichts, da das Gerät noch in Betrieb ist. Jeder zusätzliche Wert ersetzt jetzt den ältesten und nach jedem neuen Wert wird ein neuer Durchschnitt berechnet.<br>

# Geräte konfigurieren
![configureDevices.png](../../../en/adapterref/iobroker.device-reminder/admin/configureDevices.png)

![refresh-table.png](../../../en/adapterref/iobroker.device-reminder/admin/refresh-table.png)<br> Wenn die Schaltfläche &quot;Aktualisieren&quot; blau ist, klicken Sie bitte darauf. Es werden nur die Geräte angezeigt, für die keine Fehler festgestellt wurden.

- **aktiv** Ist standardmäßig aktiviert. Hier können Sie ein Gerät vorübergehend deaktivieren, damit es keine Benachrichtigungen mehr sendet.
- **Gerät** wird automatisch erstellt
- **Alexa** Alle zuvor erstellten Alexas werden hier aufgelistet und können per Klick hinzugefügt werden
- **sayit** Alle zuvor erstellten sayit-Geräte werden hier aufgelistet und können durch Klicken hinzugefügt werden.
- **WhatsApp** Alle zuvor erstellten WhatsApp-Benutzer werden hier aufgelistet und können durch Klicken hinzugefügt werden
- **Pushover** Alle zuvor erstellten Pushover-Benutzer werden hier aufgelistet und können durch Klicken hinzugefügt werden.
- **email** Alle zuvor erstellten E-Mail-Benutzer werden hier aufgelistet und können per Klick hinzugefügt werden
- Telegramm **: Alle verfügbaren Telegrammbenutzer werden hier aufgelistet und können dem Gerät durch Klicken zugewiesen werden. Die jeweilige Instanz ist in den [eckigen] Klammern angegeben.

** Wenn keine Namen angezeigt werden: ** Prüfen Sie, ob der Eintrag unter "telegram.X.communicate.users" (das X steht für die jeweilige Instanz, zB 0) folgende Struktur enthält: "{" ID IN NUMBERS ": { "firstName": "User1"}} ", falls nicht, kann dies einfach angepasst werden. Der Adapter sucht nach ** Vorname ** sowie ** Benutzername **. Sie können dann entscheiden, an welchen Namen Sie senden möchten. Es kann nur entweder der ** Vorname ** oder der ** Benutzername ** ausgewählt werden!

- **ausschalten** Wenn ausgewählt, schaltet sich die Steckdose nach Abschluss des Vorgangs automatisch aus.
- **nach Minuten ausschalten** Hier kann optional eine Zeitüberschreitung in **Minuten** eingegeben werden. Nach Ablauf des Timeouts wird die Steckdose ausgeschaltet *wenn die automatische Abschaltung aktiviert ist* Die Endbenachrichtigung des Geräts bleibt jedoch von einer Zeitüberschreitung unberührt!
- Erkennung abbrechen **: Wenn aktiviert, versucht der Adapter zu erkennen, ob ein Gerät bereits vor der Benachrichtigung manuell ausgeschaltet wurde, und benachrichtigt dann nicht mehr.

Nach dem Klicken auf "** Speichern und schließen **" wird nun unter *Objekte -> Geräteerinnerung* ein Ordner für jedes neu erstellte Gerät erstellt, in dem

- die aktuelle Laufzeit in hh: mm: ss
- die aktuelle Laufzeit in Millisekunden
- den aktuellen Status des Geräts
- den aktuellen Live-Verbrauch (wird aus dem *Pfadverbrauch / Energie* abgerufen) und
- die Nachricht an den Boten
- durchschnittlicher Verbrauch (kann als Hilfe zur Bestimmung Ihrer eigenen Schwellenwerte verwendet werden)
- nicht stören (wenn aktiviert, werden keine Nachrichten über **Sprachassistent** gesendet)

wird angezeigt.<br>

# Unterstützung
** Wenn dir meine Arbeit gefällt: **<br>

[![paypal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3EYML5A4EMJCW&source=url)<br><br>

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 1.0.2 (2021-01-06)
* (xenon-s) fix name i io-package.json

### 1.0.1 (2021-01-05)
* (xenon-s) bugfix

### 1.0.0 (2021-01-05)
* (xenon-s) initial commit version 1.0

### 0.7.4 (2020-12-20)
* (xenon-s) bugfix: telegram instance was not recognised correctly
* (xenon-s) bugfix: abort detection prevented sending of notifications

### 0.7.1 (2020-12-17)
* (xenon-s) fix telegram bug
* (xenon-s) Deleted incorrect version numbers in the io package

### 0.7.0 (2020-12-10)
* (xenon-s) Data is now queried cyclically

### 0.6.2 (2020-12-04)
* (xenon-s) bugfix index_m

### 0.6.0 (2020-12-03)
* (xenon-s) bugfix: alexa speak-volume when input is empty
* (xenon-s) bugfix: telegram now shows both names, otherwise there were errors in the notifications 
* (xenon-s) add: Device status can now be configured yourself

### 0.5.4 (2020-11-28)
* (xenon-s) calculation optimised, custom / default values may have to be adjusted if they have been changed by the user

### 0.5.0 (2020-11-22)
* (xenon-s) bugfix: volume sayit
* (xenon-s) add: volume alexa
* (xenon-s) DP runtime in milliseconds

### 0.4.10 (2020-11-17)
* (xenon-s) bugfix main.js

### 0.4.0 (2020-11-11)
* (xenon-s) config page revised to simplify the input of devices
* (xenon-s) inserted a break, so that it is recognized, if a device is switched off prematurely at the device switch
* (xenon-s) bugfix: telegram users are not always recognized correctly and displayed incorrectly
* (xenon-s) adjustable values inserted at "Type
* (xenon-s) readme extended and adapted

### 0.3.0 (2020-11-07)
* (xenon-s) standby detection, even if the power outlet should not be switched off
* (xenon-s) It is now possible to get messages from an external data point and send them as start / end message
* (xenon-s) device "microwave" added

### 0.2.1 (2020-11-05)
* (xenon-s) readme adapted

### 0.2.0 (2020-11-05)
* (xenon-s) update to version 0.2: index_m completely revised and whatsapp added

### 0.1.0 (2020-10-23)
* (xenon-s) beta release

### 0.0.1 (2020-10-20)
* (xenon-s) initial commit

## License

MIT License

Copyright (c) 2020 xenon-s

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