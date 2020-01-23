---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.radiohead.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.radiohead.svg
BADGE-Dependency Status: https://img.shields.io/david/crycode-de/iobroker.radiohead.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/crycode-de/ioBroker.radiohead/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.radiohead.png?downloads=true
BADGE-Travis-CI: http://img.shields.io/travis/crycode-de/ioBroker.radiohead/master.svg
---
![Logo](../../admin/radiohead.png)

# ioBroker.radiohead

Der Adapter `radiohead` ermöglicht die Anbindung eines RadioHead-Netzwerkes an ioBroker.

Die Kommunikation erfolgt über eine serielle Schnittstelle.
Zur Anbindung von Funk-Hardware kann ein kleiner Mikroprozessor (z.B. ein Arduino nano) als Gateway verwendet werden.

[RadioHead](http://www.airspayce.com/mikem/arduino/RadioHead/) ist eine Open Source paketbasierte Funkmodul-Bibliothek für Mikroprozessoren.
Es bietet adressierte, zuverlässige, wiederholt übertragene und bestätigte Nachrichten in variabler Länge.

## Features

* Empfang von Nachrichten/Befehlen von anderen Knoten im RadioHead-Netzwerk.
* Senden von Nachrichten/Befehlen an andere Knoten im RadioHead-Netzwerk.
* Einzeln konfigurierbare Objekte für eingehende und ausgehende Daten.
* Möglichkeit RadioHead-Nachrichten über Skripte zu senden.
* Möglichkeit empfangene RadioHead-Nachrichten über Skripte auszuwerten.

Wird über die serielle Schnittstelle eine Nachricht empfangen, die zum Muster eines Objektes der eingehenden Daten passt, so werden die Daten daraus extrahiert und von dem Adapter in den State des Objektes geschrieben.

Zum Senden von Daten werden die Daten einfach in den State des konfigurierten Objektes der ausgehenden Daten geschrieben und der Adapter sendet dann die Daten nach dem eingestellten Muster.

## Installation

Der Adapter ist über das *stable*-Repository verfügbar und kann somit ganz normal über die Adminoberfläche oder die Kommandozeile installiert werden.

Alternativ kann eine ggf. vorhandene Vorabversion über das *latest*-Repository oder über die URL `https://github.com/crycode-de/ioBroker.radiohead.git` installiert werden.

## Konfiguration

Das Konfigurationsfenster besteht auf den drei Reiten:
* Haupteinstellungen
* Eingehende Daten
* Ausgehende Daten

### Haupteinstellungen
![Haupteinstellungen](./img/haupteinstellungen.png)

#### Serielle Schnittstelle
Die serielle Schnittstelle, über die die RadioHead-Kommunikation stattfindet.

Beispiele:
* `/dev/ttyUSB0` (Linux)
* `COM1` (Windows)

#### Baudrate
Die Baudrate mit der die Kommunikation stattfindet. Diese sollte bei allen Knoten im RadioHead-Netzwerk gleich sein.

Standard ist `9600`.

#### Adresse
Die Adresse des ioBroker-Adapters im RadioHead-Netzwerk.

Kann als Hexadezimalzahl (`0x00` bis `0xFE`) oder Dezimalzahl (`0` bis `254`) angegeben werden. Die Verwendung von `0xFF` (bzw. `255`) ist nicht möglich, da dies die Broadcast-Adresse ist.

#### Zuverlässiger Modus
Im zuverlässigen Modus wird bei jeder gesendeten Nachricht eine Bestätigung (ACK) vom Empfänger erwartet.
Wird eine Nachricht nicht innerhalb der eingestellten Zeit bestätigt, so wird sie erneut gesendet.

Wenn aktiviert wird `RHReliableDatagram` anstelle von `RHDatagram` von RadioHead verwendet.

#### Wiederholungen
Anzahl an wiederholten Sendeversuchen für jede zu sendende Nachricht, sofern die Bestätigung ausbleibt.

Standard ist `3`. Auf `0` setzen für keine Wiederholung.

#### Zeitüberschreitung
Zeit in Millisekunden die beim Senden einer Nachricht auf die Bestätigung (ACK) gewartet wird.

Standard ist `200`.

#### Promiscuous-Modus
Im Promiscuous-Modus können Nachrichten, die an irgendeinen Empfänger adressiert sind, empfangen werden.

Die Zu-Adresse für eingehende Daten sollte korrekt gesetzt werden, wenn diese Funktion aktiviert ist.

#### Alle Daten Loggen
Wenn aktiviert, dann wird jede empfangene und jede gesendete Nachricht in das Log geschrieben.


### Eingehende Daten
![Eingehende Daten](./img/eingehende_daten.png)

#### Name
Der Name des ioBroker-Objektes. Muss einmalig für die eingehenden Daten der Instanz des Adapters sein.

Es ist möglich Gruppen zu bilden, indem in den Namen Punkte verwendet werden.

Für jeden Datensatz wird ein Objekt nach dem Muster `radiohead.<instanz>.data.in.<name>` angelegt.

#### Rolle
Die Rolle der Daten ist wichtig für die Verarbeitung der empfangenen Daten.

Schalter, Taster und Indikatoren werden als Wahrheitswerte ausgewertet.
Bei allen anderen Rollen werden Zahlenwerte aus den empfangenen Daten extrahiert und ausgewertet.

#### Von-Adresse
Die Adresse des Absenders der Nachricht im RadioHead-Netzwerk.

Kann als Hexadezimalzahl (`0x00` bis `0xFE`) oder Dezimalzahl (`0` bis `254`) angegeben werden.
Es ist zudem möglich ein `*` für eine beliebige Von-Adresse zu verwenden.

#### Zu-Adresse
Die Adresse des Empfängers der Nachricht im RadioHead-Netzwerk.

Kann als Hexadezimalzahl (`0x00` bis `0xFF`) oder Dezimalzahl (`0` bis `255`) angegeben werden.
Es ist zudem möglich ein `*` für eine beliebige Zu-Adresse zu verwenden.

*Hinweis:* Ohne aktivierten Promiscuous-Modus können nur Nachrichten an die eigene Adresse und die Broadcastadresse `0xFF` (bzw. `255`) empfangen werden.

#### Daten
Dies sind die Daten der empfangenen Nachricht in einzelnen, durch Komma getrennte Bytes.
Anhand dieser Daten wird eine empfangene Nachricht analysiert und verarbeitet.

Die Bytes können als Hexadezimalzahl (`0x00` bis `0xFF`) oder Dezimalzahl (`0` bis `255`) angegeben werden.
Als Platzhalter für ein beliebiges Byte kann ein `*` verwendet werden.

Für den Empfangenen Wert zu extrahierende Datenbytes sind durch ein großes `D` zu kennzeichnen, damit die Daten bei der Verarbeitung erkannt werden. Die Anzahl der aufeinanderfolgenden `D`-Bytes richtet sich nach dem gewählten Datentyp.

**Sonderfall Schalter und Indikator:**

Bei Schaltern und Indikatoren können zwei Gruppen an Datenbytes, getrennt durch ein Semikolon, angegeben werden.
Die Erste Gruppe ist dabei für den `true`-Wert und die zweite für den `false`-Wert.
Wird nur eine Gruppe angegeben, so wird der aktuelle Zustand beim Empfangen umgeschaltet.

**Beispiele:**
* Festes Byte `0x10`, 32-Bit Float Zahl, 4 beliebige Bytes: `0x01,D,D,D,D,*,*,*,*`
* Zwei feste Bytes für einen Taster: `0x01,0x00`
* Zwei Gruppen mit je einem Byte für einen Schalter: `0x05;0x06`

#### Typ
Dies ist der Typ der Daten in ioBroker.
Möglich ist hier die Auswahl zwischen *Zahl* und *Wahrheitswert*. Bei einem Wahrheitswert wird der empfangene Wert in einen Wahrheitswert (`true` oder `false`) umgewandelt.

#### Datentyp
Der Datentyp legt die Art der empfangenen Daten und somit auch die Lesemethode aus den Datenbytes fest.

Siehe [Datentypen](#datentypen).

#### Einheit
Die Einheit des entsprechenden Wertes in ioBroker.

#### Faktor und Offset
Ein Faktor, mit dem der empfangene Wert multipliziert wird und ein Offset der hinzuaddiert wird.

`Wert = (Wert * Faktor) + Offset`

#### Dezimalstellen
Anzahl an Dezimalstellen, auf die ein empfangender Wert (nach der Berechnung mit Faktor und Offset) gerundet wird.


### Ausgehende Daten
![Ausgehende Daten](./img/ausgehende_daten.png)

#### Name
Der Name des ioBroker-Objektes. Muss einmalig für die ausgehenden Daten der Instanz des Adapters sein.

Es ist möglich Gruppen zu bilden, indem in den Namen Punkte verwendet werden.

Für jeden Datensatz wird ein Objekt nach dem Muster `radiohead.<instanz>.data.out.<name>` angelegt.

#### Rolle
Die Rolle der Daten ist wichtig für die Verarbeitung der zu sendenden Daten.

Schalter, Taster und Indikatoren werden als Wahrheitswerte gesendet.
Bei allen anderen Rollen werden Zahlenwerte in die zu sendenden Daten eingebettet.

#### Zu-Adresse
Die Adresse des Empfängers der Nachricht im RadioHead-Netzwerk.

Kann als Hexadezimalzahl (`0x00` bis `0xFF`) oder Dezimalzahl (`0` bis `255`) angegeben werden.

Für Broadcast-Nachrichten an alle Knoten ist die Adresse `0xFF` (bzw. `255`) zu verwenden.

#### Daten
Dies sind die Daten der zu sendenden Nachricht in einzelnen, durch Komma getrennte, Bytes.
Anhand dieser Daten wird eine zu sendende Nachricht aufgebaut.

Die Bytes können als Hexadezimalzahl (`0x00` bis `0xFF`) oder Dezimalzahl (`0` bis `255`) angegeben werden.

Die Bytes, an denen die zu sendenden Daten eingesetzt werden sollen, sind durch ein großes `D` zu kennzeichnen. Die Anzahl der aufeinanderfolgenden `D`-Bytes richtet sich nach dem gewählten Datentyp.

**Sonderfall Schalter und Indikator:**

Bei Schaltern und Indikatoren können zwei Gruppen an Datenbytes, getrennt durch ein Semikolon, angegeben werden.
Die Erste Gruppe ist dabei für den `true`-Wert und die zweite für den `false`-Wert.
Wird nur eine Gruppe angegeben, so wird immer diese Gruppe gesendet.

**Beispiele:**
* Festes Byte `0x42`, 16-Bit Integer: `0x42,D,D`
* Zwei feste Bytes für einen Taster: `0x01,0x02`
* Zwei Gruppen mit je zwei Bytes für einen Schalter: `0x01,0x00;0x01,0xFF`

#### Typ
Dies ist der Typ der Daten in ioBroker.
Möglich ist hier die Auswahl zwischen *Zahl* und *Wahrheitswert*. Bei einem Wahrheitswert wird der zu sendende Wert in `0x01` (`true`) oder `0x00` (`false`) umgewandelt.

#### Datentyp
Der Datentyp legt die Art der zu sendenden Daten und somit auch die Schreibmethode in die Datenbytes fest.

Siehe [Datentypen](#datentypen).

#### Einheit
Die Einheit des entsprechenden Wertes in ioBroker.


## Datentypen

Die folgenden Datentypen stehen beim Empfangen und Senden von Daten zur Verfügung:

| Datentyp | Beschreibung | Wertebereich | Datenbytes |
|---|---|---|---|
| `int8` | Vorzeichenbehafteter 8-Bit Integer | -128 bis 127 | 1 |
| `uint8` | Vorzeichenloser 8-Bit Integer | 0 bis 255 | 1 |
| `int16_le`, `int16_be` | Vorzeichenbehafteter 16-Bit Integer | 0 bis 32767 | 2 |
| `uint16_le`, `uint16_be` | Vorzeichenloser 16-Bit Integer | 0 bis 65535 | 2 |
| `int32_le`, `int32_be` | Vorzeichenbehafteter 32-Bit Integer | 0 bis 4294967295 | 4 |
| `uint32_le`, `uint32_be` | Vorzeichenloser 32-Bit Integer | 0 bis 4294967295 | 4 |
| `float32_le`, `float32_be` | 32-Bit Fließkommazahl | -3.4E+38 bis +3.4E+38, 7 Dezimalstellen | 4 |
| `double64_le`, `double64_be` | 64-Bit Fließkommazahl | -1.7E+308 bis +1.7E+30, 16 Dezimalstellen | 8 |

Die Endungen `_le` und `_be` bezeichnen jeweils die Byte-Reihenfolge (endianness) bei den Datentypen mit mehr als einem Byte. Diese hängt davon ab, wie die Gegenstelle die Daten sendet bzw. verarbeitet.

* `_le` - *little-endian*: kleinstwertige Byte zuerst
* `_be` - *big-endian*: höchstwertige Byte zuerst


## Verwendung in Skripten

Es ist möglich über Skripte RadioHead-Nachrichten zu senden und empfangene Nachrichten auszuwerten.

### Senden über ein Skript
Zum Senden über ein Skript kann die Funktion `sendTo` verwendet werden.

**Beispiel:**
```js
sendTo('radiohead.0', 'send', {
    to: 0x02, // Zu-Adresse
    data: [0x01,0x02,255] // zu sendende Daten-Bytes als Array oder Buffer
}, (ret) => {
    log('ret: ' + JSON.stringify(ret));
    // -> ret: {}
    if (ret.error) {
        log('error sending message', 'warn');
    }
});
```

Wenn die Nachricht nicht erfolgreich gesendet wurde, dann ist `ret.error` auf den entsprechenden Fehler gesetzt.

### Auswerten empfangener Nachrichten über ein Script
Bei jeder empfangenen Nachricht wird das Objekt `radiohead.<instanz>.data.incoming` aktualisiert und der Wert auf ein Objekt mit ein empfangenen Daten gesetzt.
Diese Änderung kann entsprechend ausgewertet werden.

**Beispiel:**
```js
on({id: "radiohead.0.data.incoming", change:'any'}, (obj) => {
    log('incoming changed: ' + JSON.stringify(obj.state.val));
    // -> incoming changed: {"data":[1,0],"length":2,"headerTo":1,"headerFrom":2,"headerId":47,"headerFlags":0}
});
```


## Adapter-Informationen

Jede Instanz des Adapters stellt die folgenden Informationen bereit:

| Objekt | Beschreibung |
|---|---|
| info.connection | Indikator, ob der Adapter mit der seriellen Schnittstelle verbunden ist |
| info.lastReceived | Zeitpunkt, wann die letzte RadioHead-Nachricht empfangen wurde |
| info.lastSentOk | Zeitpunkt, wann die letzte RadioHead-Nachricht erfolgreich gesendet wurde |
| info.lastSentError | Zeitpunkt, wann die letzte RadioHead-Nachricht fehlerhaft gesendet wurde |
| info.receivedCount | Anzahl an empfangenen RadioHead-Nachrichten |
| info.retransmissionsCount | Anzahl an wiederholten Sendeversuchen beim Senden von Nachrichten |
| info.sentErrorCount | Anzahl an fehlerhaft gesendete Nachrichten |
| info.sentOkCount | Anzahl an erfolgreich gesendeten Nachrichten |

Die Zähler der Nachrichten können bei Bedarf durch ein Schreiben in das Objekt `actions.resetCounters` auf 0 zurückgesetzt werden.

## Changelog
### 1.0.3 (2020-01-23)
* (Peter Müller) Better handling of changed objects in admin.
* (Peter Müller) Added `connectionType` in `io-package.json` and updated dependencies.

### 1.0.2 (2019-09-08)
* (Peter Müller) dependency updates and bugfixes

### 1.0.1 (2019-07-30)
* (Peter Müller) license  update

### 1.0.0 (2019-07-28)
* (Peter Müller) initial release

## License

Copyright (c) 2019 Peter Müller <peter@crycode.de>