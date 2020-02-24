---
local: true
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: rN4KkHkTgQi739/0GZDQZ274L23nvqhd+4OxJHA44Ww=
---
![Logo](../../../en/adapterref/iobroker.tr-064/media/tr-064.png)

# IoBroker.tr-064
### Die Info
Dieser Adapter liest Hauptinformationen von AVM Fritz! Box, wie Anrufliste oder Anzahl der Nachrichten auf dem Anrufbeantworter.
Basierend auf diesen [AVM-Dokumentationen](https://avm.de/service/schnittstellen/)

### Einfache Zustände und Funktionen
- WLAN für 2,4 GHz und 5 GHz ein- und ausschalten,
- Gast-WLAN ein- / ausschalten,
- Fritz! Box neu starten,
- WPS-Prozess starten,
- Internet wieder verbinden
- externe IP-Adresse

### Klingeln (Nummer wählen)
- Wenn Sie eine Internel-Nummer (wie ** 610) verwenden, klingelt der interne Status des internen Telefons.

z. B.: ** 610 [, Zeitüberschreitung]

- Wenn Sie eine externe Nummer verwenden, verbindet Sie der Rufzustand mit der externen Nummer.

Die FritzBox ruft die externe Nummer an und Ihr Standardtelefon klingelt, wenn das angerufene Telefon abgenommen wird.
Das Standardtelefon kann in der FritsBox unter Telefonie / Gebühren / [Tab] Wahlhilfe / Wählhilfe konfiguriert werden

### ToPauseState
- Werte: klingeln, verbinden, beenden
- Kann verwendet werden, um einen Videoplayer bei einem eingehenden Anruf anzuhalten (Klingeln) oder beim Abheben des Telefons (Verbinden).
- Die Wiederaufnahme kann am Endwert erfolgen.

### Präsenz
Sie können eine Liste der Geräte konfigurieren, die abgehört werden sollen.
Kann von mDNS ausgelöst werden. Bei Verwendung von MDNS ist keine Abfrage erforderlich und es ist schneller

### AB - Anrufbeantworter
Kann ein- und ausgeschaltet werden.
Der Status cbIndex kann auf die Adresse # des Anrufbeantworters gesetzt werden.

### Anrufmonitor
Der Anrufmonitor erstellt Echtzeitzustände für jeden eingehenden und ausgehenden Anruf.
Wenn das Telefonbuch aktiviert ist (Standard), werden die Nummern in Namen aufgelöst. Es gibt auch einen Status, der auf ein klingelndes Telefon hinweist.

### Telefonbuch
- Wenn das Telefonbuch aktiviert ist, wird der Name der Telefonnummer des Anrufers abgerufen.
- Außerdem gibt es drei Zustände, um eine Nummer oder einen Namen aufzulösen. Falls verfügbar, erhalten Sie auch die Bild-URL des Kontakts.

  Beispiel: Wenn Sie das Status-Telefonbuch festlegen, werden alle drei Status, Name, Nummer und Bild auf den gefundenen Kontakt gesetzt. Beachten Sie, dass bei der Suche nach Namen zuerst der vollständige Name verglichen wird. Wenn er nicht gefunden wird, wird ein Teil von verwendet.

### Anruflisten
Ausgabeformate:

- json
- HTML

Anruflisten sind:

- alle Anrufe
- Anrufe in Abwesenheit
- eingehende Anrufe
- ausgehende Anrufe

Anrufanzahl: Die Anrufanzahl kann auf 0 gesetzt werden. Der nächste Anruf erhöht 1.

Die HTML-Ausgabe kann durch eine Vorlage konfiguriert werden

### Command & commandResult state
Mit dem Befehlsstatus können Sie jeden tr-064-Befehl aus diesem [Dokumentation](https://avm.de/service/schnittstellen/) aufrufen.
z.B.

```
command = {
    "service": "urn:dslforum-org:service:WLANConfiguration:1",
    "action": "X_AVM-DE_SetWPSConfig",
    "params": {
        "NewX_AVM-DE_WPSMode": "pbc",
        "NewX_AVM-DE_WPSClientPIN": ""
    }
};
```

Der Befehlsstatus sollte auf einen JSON der obigen Zeilen gesetzt werden. Also {...} (ohne Befehl = und Zeilenumbrüche) Der Rückruf des Aufrufs setzt den Befehl commandResult-Status.

### Anrufüberwachung aktivieren
Um die Anrufüberwachungsfunktion nutzen zu können, muss sie zuerst in der AVM Fritz! Box aktiviert sein.
Um den Anrufmonitor zu aktivieren, wählen Sie ```#96*5*``` und der TCP / IP-Port 1012 wird geöffnet. Um den Port zu schließen, wählen Sie ```#96*4*```.

### Vorabversionen
Prerelease-Versionen sind um npm mit dem Tag dev verfügbar.
Sie können sie nicht aus dem ioBroker-Stammverzeichnis installieren mit:

```
npm install iobroker.tr-064@dev
iobroker upload tr-064
```

## Changelog
### 3.1.4 (2020-01-26)
* (Apollon77) fix error and check some other code check comments
* (Apollon77) Add proper meta data for buttons

### 3.1.1 (2020-01-25)
* (bluefox) Configuration dialog was improved
* (bluefox) Soef library was removed

### 3.0.0 (2020-01-24)
* (Apollon77) Switch Name back to tr064 because ewe got it from npmjs
* (maeb3) Enhance call handling and fix wrong data for currently active calls 
* (Apollon77) Remove unused state phonebook.ringing

### 2.0.3 (2019-12-17)
* (Jey Cee) fix delete last device from list

### 2.0.2 (2019-12-16)
* __requires js-controller v2__
* (foxriver76) no longer use adapter.objects
* (Apollon77) several fixes, Call lists working again, Phonebook fixed and many more

### 1.1.0 (2019-11-10)
* (jey cee) added Admin v3 support

### 1.0.0 (2019-04-01)
* (ldittmar) first version for the community

## License
The MIT License (MIT)

Copyright (c) 2015-2020 soef <soef@gmx.net>

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