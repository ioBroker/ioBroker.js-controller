---
local: true
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: D59HzSVYkdStJaSDx6e91FA6u2/6TTOD7QeUisJd0X0=
---
![Logo](../../../en/adapterref/iobroker.tr-064/media/tr-064.png)

# IoBroker.tr-064
### Info
Dieser Adapter liest die wichtigsten Informationen aus der AVM Fritz! Box wie Anrufliste oder Anzahl der Nachrichten auf dem Anrufbeantworter.
Basierend auf diesem [AVM-Dokumentationen](https://avm.de/service/schnittstellen/)

### Einfache Zustände und Funktionen
- WLAN für 2,4 GHz und 5 GHz ein- und ausschalten,
- WLAN ein- / ausschalten,
- Fritz! Box neu starten,
- WPS-Prozess starten
- Internet wieder herstellen
- externe IP-Adresse

### Ring (eine Nummer wählen)
- Wenn Sie eine Internelnummer (wie ** 610) verwenden, wird der Klingelton dieses internen Telefons klingeln lassen.

z.B. ** 610 [, Zeitüberschreitung]

- Wenn Sie eine externe Nummer verwenden, verbindet Sie der Klingelstatus mit der externen Nummer.

Die FritzBox ruft die externe Nummer an und Ihr Standardtelefon klingelt, wenn das angerufene Telefon abgeholt wird.
Das Standardtelefon kann in der FritsBox unter: Telefonie / Anrufe / [Tab] Wahlhilfe / Wählhilfe verwenden

### ToPauseState
- Werte: klingeln, verbinden, beenden
- Kann verwendet werden, um einen Videoplayer bei einem eingehenden Anruf (Klingeln) oder beim Abheben des Telefons (Verbinden) anzuhalten.
- Der Endwert kann wieder aufgenommen werden.

### Präsenz
Sie können eine Liste von Geräten zum Abhören konfigurieren.
Kann durch mDNS ausgelöst werden. Bei Verwendung von MDNS ist keine Abfrage erforderlich, und es ist schneller

### AB - Anrufbeantworter (Anrufbeantworter)
Kann ein- / ausgeschaltet werden.
Der Status cbIndex kann auf Adresse # des Antwortgeräts gesetzt werden.

### Anrufüberwachung
Der Anrufmonitor erstellt Echtzeitzustände für jeden eingehenden und ausgehenden Anruf.
Wenn das Telefonbuch aktiviert ist (Standardeinstellung), werden die Nummern in Namen aufgelöst. Es gibt auch einen Status, der ein klingelndes Telefon anzeigt.

### Telefonbuch
- Wenn das Telefonbuch aktiviert ist, wird der Name der Telefonnummer des Anrufers abgerufen.
- Weiterhin gibt es drei Zustände, um eine Zahl oder einen Namen aufzulösen. Falls verfügbar, erhalten Sie auch die Bild-URL des Kontakts.

  Beispiel: Wenn Sie den Status Telefonbuch festlegen. Alle 3 Status, Name, Nummer und Bild werden auf den gefundenen Kontakt gesetzt. Beachten Sie, dass bei Suchen nach Name zuerst der vollständige Name verglichen wird, wenn ein Teil nicht gefunden wird.

### Anruflisten
Ausgabeformate:

- Json
- html

Anruflisten sind:

- alle Anrufe
- verpasste Anrufe
- eingehende Anrufe
- ausgehende Anrufe

Anrufanzahl: Die Anrufanzahl kann auf 0 gesetzt werden. Der nächste Anruf wird um 1 erhöht.

Die HTML-Ausgabe kann durch eine Vorlage konfiguriert werden

### Befehl & Befehlsergebnis Status
Mit dem Befehlsstatus können Sie jeden tr-064-Befehl von diesem [Dokumentation](https://avm.de/service/schnittstellen/) aus aufrufen.
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

Der Befehlsstatus sollte auf eine JSON der obigen Zeilen gesetzt werden. Also {...} (ohne Befehl = und Zeilenumbrüche) Der Callback des Aufrufs setzt den Status von commandResult.

### Anrufüberwachung aktivieren
Um die Anrufüberwachungsfunktion nutzen zu können, muss diese zuerst in der AVM Fritz! Box aktiviert werden.
Um die Anrufüberwachung zu aktivieren, wählen Sie ```#96*5*``` und der TCP / IP-Port 1012 wird geöffnet. Um den Port zu schließen, wählen Sie ```#96*4*```.

### Vorabversionen
Prerelease-Versionen sind mit dem Tag dev um npm verfügbar.
Sie können sie vom ioBroker-Stammverzeichnis aus mit folgendem Befehl installieren:

```
npm install iobroker.tr-064@dev
iobroker upload tr-064
```

## Changelog
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