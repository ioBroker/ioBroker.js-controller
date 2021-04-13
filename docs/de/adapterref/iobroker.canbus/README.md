---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.canbus/README.md
title: ioBroker.canbus
hash: BsHvCP3XTKPy/kU0CP3ByqkoVjiWxgvleJmi5vIW3nQ=
---
# IoBroker.canbus
![Logo](../../../en/adapterref/iobroker.canbus/admin/canbus.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.canbus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.canbus.svg)
![Anzahl der Installationen (spätestens)](https://iobroker.live/badges/canbus-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/canbus-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/crycode-de/iobroker.canbus.svg)
![NPM](https://nodei.co/npm/iobroker.canbus.png?downloads=true)

[![Übersetzungsstatus] (https://weblate.iobroker.net/widgets/adapters/-/canbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

** Tests: ** ![Testen und freigeben](https://github.com/crycode-de/ioBroker.canbus/workflows/Test%20and%20Release/badge.svg)

## CAN-Bus-Adapter für ioBroker
Dieser Adapter verbindet ioBroker mit einem CAN-Bus (Controller Area Network).

** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Eigenschaften
* Empfangen und Senden von Rohnachrichten mit Standardframes und erweiterten Frames
* Jede Nachricht kann zum Empfangen und / oder Senden von Daten konfiguriert sein
* Möglichkeit zum automatischen Hinzufügen von Objekten für gesehene CAN-Nachrichten, die noch nicht konfiguriert sind
* Konfigurieren Sie Parser für jede Nachricht zum Lesen / Schreiben von Daten aus / in den Rohnachrichtenpuffer
  * Numerische Typen
  * Boolesche Werte einschließlich Bitmaskenunterstützung
  * Zeichenfolgen in verschiedenen Zeichencodierungen
  * Benutzerdefinierte Skripte zum Lesen / Schreiben aus / in den Puffer von Rohdaten
* Erweiterte Import / Export-Funktion
  * Importieren Sie Nachrichtenkonfigurationen, um Ihre vorhandene Konfiguration zu erweitern
  * Importieren Sie vordefinierte "bekannte" Konfigurationen von GitHub in die Admin-Oberfläche
  * Exportieren und importieren Sie Ihre Nachrichtenkonfigurationen als "json" - oder "csv" -Dateien
* Optionale Unterstützung für feste Datenlängen (DLC)
* Optionale Unterstützung für das RTR-Flag
* Optionale Rohzustände, die rohe CAN-Nachrichtenobjekte enthalten

## Bedarf
* Linux-Betriebssystem (wegen der verwendeten Socketcan-Bibliothek)
* CAN-Hardware, die vom Kernel unterstützt wird und eine Schnittstelle wie "can0" erstellt
* Einige Kenntnisse über die auf Ihrem CAN-Bus gesendeten Nachrichten

## Parser
Mit Parsern können Sie Daten aus dem CAN-Nachrichtenpuffer lesen oder in diesen schreiben.

Es gibt vordefinierte Parser für die folgenden Datentypen.
Zusätzlich können Sie eigene Skripte schreiben, um Werte mit einem *benutzerdefinierten Parser* zu lesen / schreiben.

### Numerische Typen in *Big-Endian* und *Little-Endian*
* Vorzeichenbehaftete und vorzeichenlose 8-, 16- und 32-Bit-Ganzzahl
* 32 Bit Float
* 64 Bit doppelt

### Boolean
* 1 Byte inklusive Bitmaskenunterstützung

### String
* 1 bis 8 Byte Länge
*Codierung: * ascii *, * base64 *, * hex *, * latin1 *, * utf8 *, * utf16le*

### Benutzerdefiniert
Für einen benutzerdefinierten Parser müssen Sie ein eigenes Lese- und Schreibskript bereitstellen.
Diese Skripte sollten aus reinem Javascript bestehen und in einer Sandbox ausgeführt werden.

In den Skripten können Sie die folgenden Funktionen verwenden:

* Die meisten Node.js-Funktionen sind integriert
* `async` /` warte`
* Adapterprotokollfunktionen "log.warn (" etwas ")", "log.info (" etwas ")", "log.debug (" etwas ")"
* `getStateAsync ('id')` und `getObjectAsync ('id')` wobei `id` die vollständige ID des Status / Objekts ist

Fehler in den Skripten werden vom Adapter protokolliert.

In beiden Skripten sind die Variablen `buffer` und `value` vordefiniert.
`buffer` enthält immer den aktuellen CAN-Nachrichteninhalt als Node.js-Puffer.

#### Benutzerdefiniertes Leseskript
In einem Leseskript müssen Sie die `value` aus der Variablen `buffer` lesen.

Zu Beginn des benutzerdefinierten Leseskripts sind `buffer` die empfangenen / aktuellen CAN-Nachrichtendaten (wie im Status `.json`).
`value` sind `undefined` und sollten vom Skript festgelegt werden.

Der Inhalt der Variablen `value` am Ende des benutzerdefinierten Leseskripts wird als neuer Wert für den Status verwendet.
Wenn `value` `undefined` ist, wird dies ignoriert. Auf diese Weise können Sie Nachrichten im benutzerdefinierten Leseskript nach Datenteilen filtern.

##### Beispiel für ein benutzerdefiniertes Leseskript
Überprüfen Sie die ersten drei Bytes im empfangenen Puffer auf feste Werte.
Lesen Sie bei Übereinstimmung einen 16-Bit-Ganzzahlwert mit Vorzeichen aus den Pufferbytes 3 und 4 und teilen Sie ihn durch 10.

```js
if (buffer[0] === 0xC2 && buffer[1] === 0x10 && buffer[2] === 0x0F) {
  value = buffer.readInt16BE(3) / 10;
}
```

Ursache von `value` wird nur gesetzt, wenn die ersten drei Bytes übereinstimmen, alle anderen Daten werden ignoriert und setzen keinen neuen Wert auf den Status.

#### Benutzerdefiniertes Schreibskript
In einem Schreibskript müssen Sie die Variable `buffer` ändern (oder ersetzen).

Zu Beginn des benutzerdefinierten Schreibskripts sind `buffer` die aktuellen CAN-Nachrichtendaten (wie im Status `.json`).
`value` wird auf den Wert des Staates gesetzt, der in die `buffer` geschrieben werden soll.

Der Inhalt der Variablen `buffer` am Ende des benutzerdefinierten Schreibskripts wird als neue Daten für die CAN-Nachricht verwendet.

##### Beispiel für ein benutzerdefiniertes Schreibskript
Bereiten Sie einen neuen Puffer mit festen Werten vor.
Schreiben Sie den Statuswert als vorzeichenbehaftete 16-Bit-Ganzzahl in den Puffer, beginnend mit dem fünften Byte im Puffer.

```js
buffer = Buffer.from([0x30, 0x00, 0xFA, 0x06, 0x7E, 0x00, 0x00]);
buffer.writeInt16BE(value, 5);
```

Die neuen `buffer` werden dann als `.json` gesetzt.
Wenn die Option *automatisch senden* für die Nachricht aktiviert ist, wird die Nachricht automatisch gesendet.

## Verwendung in Skripten
Sie können die Zustände `<messageId>.json` oder `<messageId>.<parserId>` in Ihren Skripten behandeln / ändern.

Zusätzlich können Sie die Zustände `raw.received` und `raw.send` verwenden, sofern Sie diese in der Adapterkonfiguration aktiviert haben.
Sie enthalten die stringifizierten JSON-Daten der Nachrichtendaten und können verwendet werden, um jede empfangene oder gesendete Nachricht unabhängig von den konfigurierten Nachrichten zu verarbeiten.
Durch Schreiben von JSON-Daten in den Status `raw.send` können Sie CAN-Nachrichten senden, die beliebige Daten enthalten.

### Beispiel für ein Rohnachrichtenobjekt
```js
{
  "id": 42,
  "ext": false,
  "data": [0, 13, 37, 255],
  "rtr": false
}
```

`ext` und `rtr` sind optional und standardmäßig `false`.

## Changelog

### 1.1.3 (2021-04-12)
* (crycode-de) Added definition of possible state values in admin
* (crycode-de) Added selection of the state role for each parser in admin
* (crycode-de) Fixed display bug of floating action buttons in admin
* (crycode-de) Export uses defaults if some config parts are not defined (e.g. if the config is from an older version)
* (crycode-de) Fixed wrong validation if a message/parser was deleted

### 1.1.2 (2021-04-06)
* (crycode-de) Added copy/paste function for message and parser configurations in admin

### 1.1.1 (2021-04-02)
* (crycode-de) Import bugfixes
* (crycode-de) Prevent wrong log warning if a parser returned undefined
* (crycode-de) Added react errorboundary for better clientside error handling

### 1.1.0 (2021-04-01)
* (crycode-de) Added import/export feature for messages in json or csv format
* (crycode-de) Added import of well known configurations from GitHub
* (crycode-de) Fixed config import in admin
* (crycode-de) Added ioBroker state data type option for custom parsers

### 1.0.2 (2021-03-26)
* (crycode-de) Fixed issue where missing state prevented custom parser write
* (DutchmanNL) Dutch translation updates
* (UncleSamSwiss) French translation updates
* (VeSler) Russian translation updates

### 1.0.1 (2021-03-12)
* (crycode-de) Use a queue to process _parser_ and _send_ state changes in the correct order
* (crycode-de) Fixed some spelling issues
* (crycode-de) Updated dependencies

### 1.0.0 (2021-02-23)
* (crycode-de) Sort messages in admin
* (VeSler) Russian admin translations
* (crycode-de) Updated dependencies

Older changelog is in CHANGELOG_OLD.md

## License

Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)

Copyright (c) 2020-2021 Peter Müller <peter@crycode.de> (https://crycode.de/)