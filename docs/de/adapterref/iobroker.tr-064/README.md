---
local: true
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: gQb6+lw6ghlkjZdyw4RE6KoR3pbJ2ScyXASA/1CoXQ0=
---
![Logo](../../../en/adapterref/iobroker.tr-064/media/tr-064.png)

# IoBroker.tr-064
### Info
Dieser Adapter liest die wichtigsten Informationen aus der AVM Fritz! Box wie Anrufliste oder Anzahl der Nachrichten auf dem Anrufbeantworter.
Basierend auf diesem §§LLLL_0§§

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
Wenn das Telefonbuch aktiviert ist (Standardeinstellung), werden die Nummern in Namen aufgelöst. Es gibt auch einen Status, der ein Klingeltelefon anzeigt.

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

```javascript
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
### 0.4.18
* (soef) IP and MAC-address added to device object
### 0.4.17
* (soef) readme updated
### 0.4.16
* (soef) terminating adapter, if init fails, so that the adapter will be restarted",
### 0.4.15
* (soef) callmonitor: new toPauseState with extension
### 0.4.14
* (soef) Errorhandling of connecting to FritzBox extended
### 0.4.12
* (soef) Errorhandling of deflections fixed
### 0.4.11
* (Apollon77) Update utils.js and usage, CI Testing and deps
### 0.4.10 (2017-11-23)
* (soef) readme changelog extended
### 0.4.9
* (soef) fix tag error in io-package.json
### 0.4.8
* (soef) fix posible timeout on getting WLAN-Infos
### 0.4.6
* (soef) fix posible exception in deflections
### 0.4.5
* (apollon77) update basic package-file testing
### 0.4.4
* (soef) states of call forwarding will now be updated in the configured interval
### 0.4.3
* (soef) Call forwarding now configurable
### 0.4.2
* (soef) fixed exception in deflections
### 0.4.1
* (soef) fix changing forwarding state
### 0.4.0
* (soef) enable/disable call forwarding added
### 0.3.24
* (soef) States from the callmonitor are renewed, even if no change
### 0.3.23
* (soef) node 0.12 removed from testing
### 0.3.22
* (soef) Enhance CI testing
### 0.3.21
* (soef) using soef 0.4.6 to fix adapter load
### 0.3.20
* (soef) adapter type changed to media
### 0.3.19
* (soef) error message removed
### 0.3.18
* (soef) clear caller/callee before next call
### 0.3.17
* (soef) Only active will be shone in configuration
### 0.3.16
* (soef) Some extensions in onMessage discovery
### 0.3.15
* (soef) toPauseState added. Values: ring, connect, end
### 0.3.14
* (soef) callee name added
### 0.3.12 (2017-03-15)
* (bluefox) phone book for repeater excluded
* (bluefox) readme extended
### 0.3.11 (2017-03-07)
* (soef) external property adde to call list
### 0.3.10 (2017-03-07)
* (soef) Error message in configuration, if an older admin adapter is installed
### 0.3.7 (2017-03-06)
* (soef) Fixed imageurl for external phone book again. E.g. google
### 0.3.6 (2017-03-06)
* (soef) Fixed imageurl for external phone book. e.g. google
### 0.3.5 (2017-03-06)
* (soef) Json device list added
### 0.3.3 (2017-03-01)
* (soef) phonebook functions/states added
### 0.3.1 (2017-02-28)
* (soef) some bug fixes
* (soef) releasing call lists
### 0.3.0 (2017-02-25)
* (bluefox) use new table for configuration dialog

### 0.2.0 (2016)
* (soef) initial commit