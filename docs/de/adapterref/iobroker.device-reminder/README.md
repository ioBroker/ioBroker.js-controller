---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.device-reminder/README.md
title: ioBroker.device-Erinnerung
hash: CKDOj7tho6HLlSTu7B9m+ZEKIO6VT6wd96A37iLgpOI=
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

## Deutsche Readme benötigt?<br> [Deutsche Readme](https://github.com/Xenon-s/ioBroker.device-reminder/blob/master/README_GER.md)
<br>

## Adapter zur Überwachung des Gerätestatus
Dieser Adapter kann über Messbuchsen erkennen, ob ein Gerät eingeschaltet, in Betrieb oder ausgeschaltet ist und darauf reagieren. Nachrichten können dann automatisch per Telegramm, WhatsApp, Alexa und Sayit ausgegeben werden (Mehrfachauswahl pro Gerät möglich). Es ist auch möglich, die Steckdose nach Abschluss des Vorgangs automatisch auszuschalten (ebenfalls zeitverzögert). (vorheriges Projekt, aus dem dieser Adapter entwickelt wurde: https://github.com/Xenon-s/js.device-reminder)

## Was ist zu beachten?
Das Aktualisierungsintervall vom &quot;Live-Verbrauchswert (bedeutet **&quot; _ Energie &quot;**)&quot; für die meisten Geräte sollte nicht mehr als 10 Sekunden betragen, da es sonst zu sehr verzögerten Nachrichten kommen kann.<br> Befehl in der Tasmota-Konsole: TelePeriod 10<br> **Hinweis:**

- Werte unter 1 Watt gelten als 0 Watt und zeigen automatisch "** ausgeschaltet **" an.
- Werte über 1 Watt zeigen das Gerät als "** Standby **" an.

## Welche Geräte können momentan überwacht werden?
Es gibt Standardwerte für die folgenden Geräte:

- Waschmaschine,
- Trockner,
- Geschirrspülmaschine,
- Wasserkocher,
- Computer,
- Mikrowelle

Diese Werte wurden über Monate ermittelt und sollten für die meisten Geräte geeignet sein.<br> Zusätzlich stehen 5 benutzerdefinierte Geräte zur Verfügung. Diese können bei Bedarf vom Benutzer konfiguriert werden. Die Schwellenwerte aller Gerätetypen können auch manuell angepasst werden.<br>

## Was ist pro Gerät möglich?
- Benachrichtigung beim Gerätestart
- Benachrichtigung am Ende jedes Gerätestarts
- Telegrammbenachrichtigung (mehrere IDs sind möglich)
- Alexa-Benachrichtigung (mehrere IDs sind möglich)
- WhatsApp-Benachrichtigung mit mehreren IDs möglich)
- Benachrichtigungen können frei erstellt oder durch ein externes Skript vordefiniert werden
- Datenpunkte mit dem aktuellen Status, dem Live-Verbrauch und der zuletzt gesendeten Statusmeldung, um die Werte dieses Adapters in anderen Skripten zu verwenden
- Schalten Sie Geräte bei Bedarf aus (auch zeitverzögert), wenn der Vorgang als abgeschlossen erkannt wurde<br>

<br> <br>

# Anleitung
![config.png](../../../en/adapterref/iobroker.device-reminder/admin/config.png)

Zunächst müssen alle gewünschten Geräte, Alexas usw. in der Konfiguration erstellt werden, bevor sie verwendet werden können. Wenn alle Einträge abgeschlossen sind, müssen Sie auf ** "hier klicken, um neu zu laden" ** klicken. Erst dann werden die Geräte wirklich erstellt und können in der Registerkarte "** GERÄTE **" weiter konfiguriert werden.

## Gerät erstellen
Zuerst muss ein neuer Eintrag mit dem **"+ Gerät hinzufügen"** erstellt werden. Dadurch wird die folgende Tabellenzeile erstellt: ![addDevice.png](../../../en/adapterref/iobroker.device-reminder/admin/addDevice.png)

- **Gerätename** Frei wählbarer Name
- **Gerätetyp** Hier müssen Sie auswählen, um welches Gerät es sich handelt, damit die Berechnungen im Adapter korrekt ausgeführt werden können
- **Pfadverbrauch / Energie** Klicken Sie auf die Schaltfläche mit den drei weißen Punkten, um Ihre Objektverwaltung zu öffnen. Sie müssen den Datenpunkt auswählen, der den **aktuellen Live-Verbrauch** anzeigt.
- **Pfadschalter ein / aus** Klicken Sie auf die Schaltfläche mit den drei weißen Punkten, um Ihre Objektverwaltung zu öffnen. Sie müssen den Datenpunkt auswählen, der Ihre **Buchse ein- / ausschaltet** (nicht obligatorisch).
- **Starttext** Benachrichtigung, die beim Starten des Geräts gesendet werden soll (Sonderzeichen sind ebenfalls möglich). Es darf kein "." am Ende des Textes!
- **Endtext** Benachrichtigung, die gesendet werden soll, wenn das Gerät seinen Vorgang abgeschlossen hat (Sonderzeichen sind ebenfalls möglich). Es darf kein "." am Ende des Textes!

Mit **Starttext** und **Endtext** können Sie auch eine Nachricht von einem externen Datenpunkt erhalten. Diese Nachricht wird mit einer Verzögerung von 1 Sekunde vom Datenpunkt gelesen, nachdem sich der Status des Geräts geändert hat. Sie können also eine Nachricht von einem externen Skript erstellen lassen. Der Adapter erkennt automatisch, ob eine Nachricht von einem Datenpunkt stammt oder einfach manuell eingegeben wurde. Um einen Datenpunkt auszuwählen, klicken Sie einfach auf die Schaltfläche mit den drei weißen Punkten und wählen Sie dann den entsprechenden Datenpunkt aus. **Bitte beachten Sie** Es kann nur entweder ein Datenpunkt **oder** eine manuell eingegebene Nachricht verwendet werden!<br><br>

## Alexa erstellen
![addAlexa.png](../../../en/adapterref/iobroker.device-reminder/admin/addAlexa.png) Zunächst muss mit dem **"+ alexa Gerät hinzufügen"** ein neuer Eintrag erstellt werden. Dadurch wird die folgende Tabellenzeile erstellt:

- **alexa name** Frei wählbarer Name, auch Sonderzeichen sind möglich
- ** alexa "Ansage" / "Sprechen" **: Hier müssen Sie ** den Datenpunkt auswählen, der Ihre Alexa zum Sprechen bringt. Um den Datenpunkt auszuwählen, klicken Sie einfach auf die Schaltfläche mit den drei kleinen weißen Punkten.
- **Volume 0-100** *optional* Hier können Sie ein Volume einstellen (Standard: 50). Werte zwischen 0 und 100 sind möglich.

Die letzten 4 Felder können verwendet werden, um einen Zeitraum zu erstellen, in dem Ihre Alexa sprechen darf. Standardmäßig ist der Zeitraum von 00:00 bis 23:59 aktiv.

- **"Zeit aktive Stunde"** Startzeit in Stunden
- **"Zeit aktiv min"** Startzeit in Minuten
- "Zeit inaktive Stunde": Endzeit in Stunden
- **"Zeit inaktiv min"** Endzeit in Minuten

<br> <br>

## SayIt-Gerät erstellen
![addSayit.png](../../../en/adapterref/iobroker.device-reminder/admin/addSayit.png) Zuerst müssen Sie mit dem **"+ sayit device"** einen neuen Eintrag anlegen. Dadurch wird die folgende Tabellenzeile erstellt:

- **sayit name** Frei wählbarer Name, auch Sonderzeichen sind möglich
- **sayit path "../ text"** Wählen Sie den Datenpunkt "text" im jeweiligen sayIt-Geräteordner aus. Die Textausgabe wird an diesen Ordner gesendet.
- **Volume 0-100** *optional* Hier können Sie ein Volume einstellen (Standard: 50). Werte zwischen 0 und 100 sind möglich.
- **"Zeit aktive Stunde"** Startzeit in Stunden
- **"Zeit aktiv min"** Startzeit in Minuten
- "Zeit inaktive Stunde": Endzeit in Stunden
- **"Zeit inaktiv min"** Endzeit in Minuten

<br> <br>

## WhatsApp-Benutzer erstellen
![addWhatsapp.png](../../../en/adapterref/iobroker.device-reminder/admin/addWhatsapp.png) Zuerst müssen Sie einen neuen Eintrag mit dem **"+ WhatsApp-Benutzer hinzufügen"** erstellen. Dadurch wird die folgende Tabellenzeile erstellt:

- **WhatsApp-Name** Frei wählbarer Name, auch Sonderzeichen sind möglich
- **WhatsApp-Pfad "sendMessage"** Wählen Sie den Datenpunkt "sendMessage" im jeweiligen WhatsApp-Ordner aus. Hier wird die Textausgabe gesendet.

<br> <br>

## Konfiguration speichern
Wenn alle Geräte und Messenger eingefügt wurden, müssen Sie speichern, indem Sie auf die Schaltfläche Speichern klicken. ** Klicken Sie hier, um neu zu laden ** auf der Seite! Dadurch wird die Tabelle auf der Registerkarte &quot;** Geräte **&quot; aktualisiert. Da es Probleme mit der Anzeige gab, wird die Tabelle mit einer kleinen Verzögerung generiert.<br> *Hinweis:* Wenn Sie den Namen eines vorhandenen Geräts ändern und dann auf die Schaltfläche ** hier klicken, um neu zu laden ** klicken, wird das Gerät in der Tabelle neu erstellt und muss entsprechend konfiguriert werden (alexa zuweisen usw.).

![save_device2.png](../../../en/adapterref/iobroker.device-reminder/admin/save_device2.png)<br> Die Schaltfläche ist nur aktiv, wenn neue Geräte eingefügt oder vorhandene geändert werden!<br><br>

# Geräte konfigurieren
![configureDevices.png](../../../en/adapterref/iobroker.device-reminder/admin/configureDevices.png)

## Konfigurieren Sie Ihren eigenen Gerätestatus
- **in Aktion** Status, der angezeigt wird, wenn das Gerät in Betrieb ist.
- **im Standby** Status, der angezeigt wird, wenn sich das Gerät im Standby befindet.
- **Gerät aus** Status, der angezeigt wird, wenn das Gerät ausgeschaltet wird.

## Gerät konfigurieren
Nach dem Klicken auf die Schaltfläche "** hier klicken, um neu zu laden **" auf der Konfigurationsseite werden alle erstellten Geräte angezeigt und können weiter konfiguriert werden.

- **aktiv** Ist standardmäßig aktiviert. Hier können Sie ein Gerät vorübergehend deaktivieren, damit es keine Benachrichtigungen mehr sendet
- **Gerätename** wird automatisch erstellt
- **Alexa-Geräte** Alle zuvor erstellten Alexas werden hier aufgelistet und können durch Klicken hinzugefügt werden
- **sayit ID** Alle zuvor erstellten sayit-Geräte werden hier aufgelistet und können durch Klicken hinzugefügt werden
- **WhatsApp-Benutzer** Alle zuvor erstellten WhatsApp-Benutzer werden hier aufgelistet und können durch Klicken hinzugefügt werden
- **Telegramm-Benutzername** Hier werden alle verfügbaren Telegramm-Benutzer angezeigt und können dem Gerät durch Klicken zugewiesen werden. Die jeweilige Instanz ist in den [eckigen] Klammern angegeben.

** Wenn keine Namen angezeigt werden sollen: ** Prüfen Sie, ob der Eintrag unter "telegram.X.communicate.users" (das X steht für die jeweilige Instanz, zB 0) folgende Struktur enthält: "{" ID IN NUMBERS " : {"firstName": "User1"}} ", wenn nicht, kann es einfach angepasst werden. Der Adapter sucht sowohl nach ** Vorname ** als auch nach ** Benutzername **. Sie können entscheiden, welchen Namen Sie verwenden möchten. Es kann nur entweder der ** Vorname ** oder der ** Benutzername ** ausgewählt werden!

- **Auto Off** Wenn diese Option ausgewählt ist, wird die Steckdose nach Abschluss des Vorgangs automatisch ausgeschaltet
- **Timer** Hier können Sie optional eine Zeitüberschreitung in **Minuten** eingeben. Nach Ablauf der Zeitüberschreitung wird die Steckdose ausgeschaltet *wenn die automatische Abschaltung aktiviert ist* Die Endbenachrichtigung des Geräts ist von einer Zeitüberschreitung nicht betroffen!
- **Erkennung abbrechen** Wenn aktiviert, versucht der Adapter zu erkennen, ob ein Gerät bereits vor der Benachrichtigung manuell ausgeschaltet wurde, und meldet dann nicht mehr.

Nach dem Klicken auf "** Speichern und schließen **" wird nun unter *Objekte -> Geräteerinnerung* für jedes neu erstellte Gerät ein Ordner erstellt, in dem

- die aktuelle Laufzeit in hh: mm: ss
- die aktuelle Laufzeit in Millisekunden
- den aktuellen Status des Geräts
- den aktuellen Live-Verbrauch (abgerufen aus dem *Pfadverbrauch / Energie* und
- die Nachricht an die Boten
- durchschnittlicher Verbrauch (Kann als Hilfe zur Bestimmung Ihrer eigenen Schwellenwerte verwendet werden)
- nicht stören (Wenn aktiviert, werden keine Nachrichten über **Sprachassistent** gesendet.)

wird angezeigt.<br><br>

# Gerätetyp konfigurieren
![default-device.png](../../../en/adapterref/iobroker.device-reminder/admin/default-devices.png) **Achtung** Änderungen der Werte können dazu führen, dass Geräte nicht mehr korrekt erfasst werden und somit falsche Meldungen auftreten können.

In der ersten Tabelle werden die "Standard" -Werte angezeigt. Diese Werte wurden über einen Zeitraum von mehreren Monaten ermittelt und sollten nicht angepasst werden. Trotzdem erkläre ich die Bedeutung der einzelnen Werte.

- **Startwert** Startwert in Watt, der überschritten werden muss, um das Gerät als gestartet zu erkennen
- **Endwert** Endwert in Watt, der unterschritten werden muss, damit das Gerät als fertig erkannt werden kann
- Anzahl der Werte "Start" **Hier legen Sie fest, wie oft der "Startwert"** nacheinander **überschritten werden muss** Wenn der Wert einmal unter diesen Wert fällt, wird der Start abgebrochen. Der Durchschnitt dieser Werte muss über dem Startwert liegen, um als gestartet erkannt zu werden.

* Beispiel: Der Wert sollte 10 W betragen und dreimal hintereinander überschritten werden. 1. 15W, 2. 1W, 15W => Startphase wurde abgebrochen, da der zweite Wert unter 10 lag. *.

- Anzahl der Werte "Ende" **: Hier wird angegeben, wie viele Werte aufgezeichnet werden sollen, bevor berechnet wird, ob das Gerät fertig ist. Je weniger Werte hier aufgelistet sind, desto ungenauer ist das Ergebnis und die Gefahr falscher Nachrichten steigt. Je höher der Wert, desto genauer ist die Aufnahme. Der Nachteil ist jedoch, dass die fertige Nachricht mit einer langen Verzögerung gesendet wird. Das Ende wird nur erkannt, wenn "Ende der Anzahl der Werte" erreicht ist und der Durchschnittsverbrauch unter dem "Endwert" liegt.

<br> <br>

* Kurze Beispielberechnung: *Verbrauchswerte kommen alle 10 Sekunden. **Endwert** wird auf 50 gesetzt, **Werteende** auf 100. 100 Werte (* dauert 100 Werte x 10 Sekunden = 1000 Sekunden* werden aufgezeichnet, nachdem das Gerät als gestartet erkannt wurde und erst dann der Durchschnitt Wert wird berechnet. Wenn der Durchschnitt unter 50 liegt, wird nach ca. 16,5 Minuten (wir erinnern uns, dass **Werte enden** = 100 Werte) **fertig** erkannt und eine Nachricht (falls konfiguriert) gesendet. Wenn der Wert über 50 liegt, geschieht nichts, da das Gerät noch in Betrieb ist. Jeder weitere Wert ersetzt jetzt den ältesten und nach jedem neuen Wert wird ein neuer Durchschnitt berechnet.<br><br>

Wenn Sie bisher gelesen haben und immer noch der Meinung sind, dass Sie benutzerdefinierte Werte benötigen, stehen **5 benutzerdefinierte Typen** für das kostenlose Design zur Verfügung.
benutzerdefinierte Geräte.png] (admin / benutzerdefinierte Geräte.png)

Um mehr über die Funktion zu erfahren, lesen Sie sie einfach hier unter "** Standardgeräte **".

# Unterstützung
** Wenn dir meine Arbeit gefällt: **<br>

[![paypal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3EYML5A4EMJCW&source=url)<br><br>

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

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