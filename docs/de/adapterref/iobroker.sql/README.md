---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sql/README.md
title: ioBroker.sql
hash: l2c8zbQEwlmW/cuzqi1sw27P9+p69YL1lwhBHDwjSAM=
---
![Logo](../../../en/adapterref/iobroker.sql/admin/sql.png)

![Anzahl der Installationen](http://iobroker.live/badges/sql-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sql.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sql.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.sql.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sql.png?downloads=true)

# IoBroker.sql
==================================

Dieser Adapter speichert den Statusverlauf in SQL DB.

Unterstützt PostgreSQL, MySQL, Microsoft SQL Server und SQLite.
Sie können Port 0 belassen, wenn ein Standardport gewünscht wird.

### MS-SQL:
Verwenden Sie ```localhost\instance``` für den Host und prüfen Sie, ob die TCP / IP-Verbindungen aktiviert sind.
https://msdn.microsoft.com/de-de/library/bb909712(v=vs.90).aspx

### SQLite:
ist "Datei" -DB und kann nicht zu viele Ereignisse verwalten. Wenn Sie über große Datenmengen verfügen, verwenden Sie eine echte Datenbank, wie PostgreSQL und Co.

SQLite DB darf nicht extra installiert werden. Es ist nur eine Datei auf der Festplatte, aber um sie zu installieren, benötigen Sie Build-Tools auf Ihrem System. Für Linux schreiben Sie einfach:

```
sudo apt-get install build-essential
```

Für Windows:

```
c:\>npm install --global --production windows-build-tools
```

Und dann den Adapter erneut installieren, z.

```
cd /opt/iobroker
iobroker stop sql
npm install iobroker.sql --production
iobroker start sql
```

### MySQL:
Sie können mysql auf Linux-Systemen installieren:

```
apt-get install mysql-server mysql-client

mysql -uroot -p

CREATE USER 'iobroker'@'%' IDENTIFIED BY 'iobroker';
GRANT ALL PRIVILEGES ON * . * TO 'iobroker'@'%';
FLUSH PRIVILEGES;
```

Bearbeiten Sie ggf. */ etc / mysql / my.cnf* um die Bindung an die IP-Adresse für die Remote-Verbindung festzulegen.

** Warnung **: Der iobroker-Benutzer ist "admin". Falls erforderlich, geben Sie dem Iobroker-Benutzer eingeschränkte Rechte.

## Struktur der DBs
Der Standard-Datenbankname ist "iobroker", er kann jedoch in der Konfiguration geändert werden.

Quellen Diese Tabelle ist eine Liste der Instanzen des Adapters, die die Einträge geschrieben haben. (Bundesland)
| DB | Name in Abfrage |
|------------|----------------------|
| MS-SQL | iobroker.dbo.sources |
| MySQL | iobroker.sources |
| PostgreSQL | Quellen |
| SQLite | Quellen |

Struktur:

| Feld | Typ | Beschreibung |
|-------|--------------------------------------------|-------------------------------------------|
| id | INTEGER NOT NULL PRIMARY KEY IDENTITY (1,1) | eindeutige ID |
| name | varchar (255) / TEXT | Instanz des Adapters, der den Eintrag | geschrieben hat

* Hinweis: * MS-SQL verwendet varchar (255) und andere verwenden TEXT

### Datenpunkte
Diese Tabelle ist eine Liste von Datenpunkten. (IDs)

| DB | Name in Abfrage |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.datapoints |
| MySQL | iobroker.datapoints |
| PostgreSQL | Datenpunkte |
| SQLite | Datenpunkte |

Struktur:

| Feld | Typ | Beschreibung |
|-------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER NOT NULL PRIMARY KEY IDENTITY (1,1) | eindeutige ID |
| name | varchar (255) / TEXT | ID der Variablen, z. hm-rpc.0.JEQ283747.1.STATE |
| Typ | INTEGER | 0 - Nummer, 1 - String, 2 - boolean |

* Hinweis: * MS-SQL verwendet varchar (255) und andere verwenden TEXT

### Nummern
Werte für Zustände mit Typ "Nummer". **ts** bedeutet "Zeitreihe".

| DB | Name in Abfrage |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_number |
| MySQL | iobroker.ts_number |
| PostgreSQL | ts_number |
| SQLite | ts_number |

Struktur:

| Feld | Typ | Beschreibung |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | Status-ID aus der Tabelle "Datenpunkte"
| ts | BIGINT / INTEGER | Zeit in ms bis zur Epoche. Kann mit "new Date (ts)" | in Zeit umgewandelt werden
| val | REAL | Wert |
| ack | BIT / BOOLEAN | Wird bestätigt: 0 - nicht bestätigen, 1 - bestätigen |
| _von | INTEGER | ID der Quelle aus der "Quellen" -Tabelle |
| q | INTEGER | Qualität als Nummer. Die Beschreibung finden Sie unter [Hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

* Hinweis: * MS-SQL verwendet BIT und andere verwenden BOOLEAN. SQLite verwendet für ts INTEGER und alle anderen BIGINT.

Zeichenketten
Werte für Zustände mit dem Typ "String".

| DB | Name in Abfrage |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_string |
| MySQL | iobroker.ts_string |
| PostgreSQL | ts_string |
| SQLite | ts_string |

Struktur:

| Feld | Typ | Beschreibung |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | Status-ID aus der Tabelle "Datenpunkte"
| ts | BIGINT | Zeit in ms bis zur Epoche. Kann mit "new Date (ts)" | in Zeit umgewandelt werden
| val | TEXT | Wert |
| ack | BIT / BOOLEAN | Wird bestätigt: 0 - nicht bestätigen, 1 - bestätigen |
| _von | INTEGER | ID der Quelle aus der "Quellen" -Tabelle |
| q | INTEGER | Qualität als Nummer. Die Beschreibung finden Sie unter [Hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

* Hinweis: * MS-SQL verwendet BIT und andere verwenden BOOLEAN. SQLite verwendet für ts INTEGER und alle anderen BIGINT.

### Booleans
Werte für Zustände mit Typ "boolean".

| DB | Name in Abfrage |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_bool |
| MySQL | iobroker.ts_bool |
| PostgreSQL | ts_bool |
| SQLite | ts_bool |

Struktur:

| Feld | Typ | Beschreibung |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | Status-ID aus der Tabelle "Datenpunkte"
| ts | BIGINT | Zeit in ms bis zur Epoche. Kann mit "new Date (ts)" | in Zeit umgewandelt werden
| val | BIT / BOOLEAN | Wert |
| ack | BIT / BOOLEAN | Wird bestätigt: 0 - nicht bestätigen, 1 - bestätigen |
| _von | INTEGER | ID der Quelle aus der "Quellen" -Tabelle |
| q | INTEGER | Qualität als Nummer. Die Beschreibung finden Sie unter [Hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

* Hinweis: * MS-SQL verwendet BIT und andere verwenden BOOLEAN. SQLite verwendet für ts INTEGER und alle anderen BIGINT.

## Benutzerdefinierte Abfragen
Der Benutzer kann über Javascript-Adapter benutzerdefinierte Abfragen für Tabellen ausführen:

```
sendTo('sql.0', 'query', 'SELECT * FROM datapoints', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
         console.log('Rows: ' + JSON.stringify(result.result));
    }
});
```

Oder holen Sie sich Einträge für die letzte Stunde für ID = system.adapter.admin.0.memRss

```
sendTo('sql.0', 'query', 'SELECT id FROM datapoints WHERE name="system.adapter.admin.0.memRss"', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
        console.log('Rows: ' + JSON.stringify(result.result));
        var now = new Date();
        now.setHours(-1);
        sendTo('sql.0', 'query', 'SELECT * FROM ts_number WHERE ts >= ' + now.getTime() + ' AND id=' + result.result[0].id, function (result) {
            console.log('Rows: ' + JSON.stringify(result.result));
        });
    }
});
```

## StoreState
Wenn Sie andere Daten in die InfluxDB schreiben möchten, können Sie die eingebaute Systemfunktion **storeState** verwenden.
Diese Funktion kann auch zum Konvertieren von Daten von anderen History-Adaptern wie History oder SQL verwendet werden.

Die angegebenen IDs werden nicht gegen die ioBroker-Datenbank geprüft und müssen dort nicht eingerichtet werden, sondern können nur direkt aufgerufen werden.

Die Nachricht kann eines der folgenden drei Formate haben:

* eine ID und ein Zustandsobjekt
* eine ID und ein Array von Statusobjekten
* Array mit mehreren IDs mit Statusobjekten

## Holen Sie sich die Geschichte
Zusätzlich zu benutzerdefinierten Abfragen können Sie die eingebaute Systemfunktion **getHistory** verwenden:

```
var end = new Date().getTime();
sendTo('sql.0', 'getHistory', {
    id: 'system.adapter.admin.0.memRss',
    options: {
        start:      end - 3600000,
        end:        end,
        aggregate: 'minmax' // or 'none' to get raw values
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());
    }
});
```

## History Logging Management über Javascript
Der Adapter unterstützt das Aktivieren und Deaktivieren der Protokollierung über JavaScript sowie das Abrufen der Liste der aktivierten Datenpunkte mit ihren Einstellungen.

### Aktivieren
Für die Nachricht muss die "id" des Datenpunkts vorhanden sein. Zusätzliche optionale "Optionen" zum Definieren der datenpunktspezifischen Einstellungen:

```
sendTo('sql.0', 'enableHistory', {
    id: 'system.adapter.sql.0.memRss',
    options: {
        changesOnly:  true,
        debounce:     0,
        retention:    31536000,
        maxLength:    3,
        changesMinDelta: 0.5,
        aliasId: ""
    }
}, function (result) {
    if (result.error) {
        console.log(result.error);
    }
    if (result.success) {
        //successfull enabled
    }
});
```

### Deaktivieren
Die Nachricht muss die "ID" des Datenpunkts haben.

```
sendTo('sql.0', 'disableHistory', {
    id: 'system.adapter.sql.0.memRss',
}, function (result) {
    if (result.error) {
        console.log(result.error);
    }
    if (result.success) {
        //successfull enabled
    }
});
```

### Liste abrufen
Die Nachricht hat keine Parameter.

```
sendTo('sql.0', 'getEnabledDPs', {}, function (result) {
    //result is object like:
    {
        "system.adapter.sql.0.memRss": {
            "changesOnly":true,
            "debounce":0,
            "retention":31536000,
            "maxLength":3,
            "changesMinDelta":0.5,
            "enabled":true,
            "changesRelogInterval":0,
            "aliasId": ""
        }
        ...
    }
});
```

## Verbindungseinstellungen
- **DB-Typ** Typ der SQL-Datenbank: MySQL, PostgreSQL, MS-SQL oder SQLite3
- **Host** IP-Adresse oder Hostname mit SQL Server
- **Port** Port von SQL Server (leer lassen, wenn Sie sich nicht sicher sind)
- **Datenbankname** Datenbankname. Standard-Iobroker
- **Benutzer** Benutzername für SQL. Muss in der DB vorhanden sein.
- **Passwort** Passwort für SQL.
- **Passwort bestätigen** Passwort hier einfach wiederholen.
- **Verschlüsseln** Einige Datenbanken unterstützen die Verschlüsselung.
- **Runde real bis** Anzahl der Stellen nach Komma.
- **Parallele Anforderungen zulassen** Erlaube gleichzeitige SQL-Anforderungen an die DB.

## Standardeinstellungen
- **De-Bounce-Intervall** Speichern Sie Werte nicht öfter als dieses Intervall.
- **Unveränderte Werte protokollieren beliebig** Alle X Sekunden zusätzlich schreiben.
- **Mindestabstand vom letzten Wert zum Protokoll** Mindestabstand zwischen zwei Werten.
- **Speicheraufbewahrung** wie lange die Werte in der DB gespeichert werden.

## 1.9.4 (2019-02-24)
* (Apollon77) Behebt einige kleinere Probleme und Themen
* (Apollon77) Texte optimieren (für Admin v3-Benutzeroberfläche)

## 1.9.0 (2018-06-19)
* (Apollon77) Option hinzufügen, um Datenpunkte als andere ID (Alias) zu protokollieren, um die Migration von Geräten und dergleichen zu erleichtern

## 1.8.0 (2018-04-29)
* (Apollon77) Update sqlite3, nodejs 10 kompatibel
* (BuZZy1337) Admin-Korrektur

## 1.7.4 (2018-04-15)
* (Apollon77) Fixiert getHistory

## 1.7.3 (2018-03-28)
* (Apollon77) Respektieren Sie die Einstellung 'Keep forever' für die Aufbewahrung von der Datenpunktkonfiguration

## 1.7.2 (2018-03-24)
* (Apollon77) Deaktivieren Sie das Schreiben von NULL-Werten für SQLite

## 1.7.1 (2018-02-10)
* (Apollon77) Option zum Schreiben von NULL-Werten an Start- / Stop-Grenzen konfigurierbar

## 1.6.9 (2018-02-07)
* (bondrogeen) Admin3 Korrekturen
* (Apollon77) optimiert die Relog-Funktion und andere Dinge

## 1.6.7 (2018-01-31)
* (Bluefox) Admin3 Korrekturen
* (Apollon77) Fehlerbehebungen in Relog und NULL

## 1.6.2 (2018-01-30)
* (Apollon77) Admin3 Korrekturen

## 1.6.0 (2018-01-14)
* (bluefox) Bereit für Admin3

## 1.5.8 (2017-10-05)
* (Apollon77) korrigiert die relog-Wertefunktion

## 1.5.7 (2017-08-10)
* (bluefox) Option "letzten Wert speichern" hinzufügen

## 1.5.6 (2017-08-02)
* (Apollon77) Verhalten des Protokollintervalls korrigieren, um immer den aktuellen Wert zu protokollieren

## 1.5.4 (2017-06-12)
* (Apollon77) behebt die Abhängigkeit zu anderen Bibliotheken

## 1.5.3 (2017-04-07)
* (Apollon77) Korrektur bei Datentypkonvertierungen

### 1.5.0 (2017-03-02)
* (Apollon77) Add-Option zum Definieren des Speicherdatentyps pro Datenpunkt, einschließlich des erforderlichen Werts

### 1.4.6 (2017-02-25)
* (Apollon77) Tippfehler mit PostgrSQL behoben

### 1.4.5 (2017-02-18)
* (Apollon77) Erneut kleine Korrektur für ältere Konfigurationen
* (Apollon77) Korrektur für die DBConverter Analyze-Funktion

### 1.4.3 (2017-02-11)
* (Apollon77) Kleine Korrektur für ältere Konfigurationen

### 1.4.2 (2017-01-16)
* (bluefox) Die Handhabung von Float-Werten in der Adapter-Konfiguration und der Datenpunkt-Konfiguration wurde korrigiert.

### 1.4.1
* (Apollon77) Rollback auf SQL-Client 0.7, um die Abhängigkeit von mmagic zu beseitigen, die Probleme auf älteren Systemen verursacht

### 1.4.0 (2016-12-02)
* (Apollon77) Nachrichten hinzufügen enableHistory / disableHistory
* (Apollon77) Unterstützung für Protokollierungsänderungen nur hinzufügen, wenn der Wert für die Zahlen einen Mindestwert aufweist

### 1.3.4 (2016-11)
* (Apollon77) Erlaube Datenbanknamen mit '-' für MySQL

### 1.3.3 (2016-11)
* (Apollon77) Update-Abhängigkeiten

### 1.3.2 (2016-11-21)
* (bluefox) Fixiere Einfügung des Strings mit '

### 1.3.0 (2016-10-29)
* (Apollon77) Add-Option, um unveränderte Werte neu zu protokollieren, um die Visualisierung zu erleichtern

### 1.2.1 (2016-08-30)
* (bluefox) Auswahl für SQL-Objekte korrigiert

### 1.2.0 (2016-08-30)
* (bluefox) ist nur mit dem neuen Administrator kompatibel

### 1.0.10 (2016-08-27)
* (bluefox) den Namen des Objekts von "history" in "custom" ändern

### 1.0.10 (2016-07-31)
* (bluefox) behebt mehrere Anfragen bei sqlite

### 1.0.9 (2016-06-14)
* (bluefox) erlaubt Einstellungen für parallele Anfragen

### 1.0.7 (2016-05-31)
* (bluefox) Zeichne Linie bis zum Ende, wenn Null ignoriert wird

### 1.0.6 (2016-05-30)
* (bluefox) erlaubt den Setup-DB-Namen für mysql und mssql

### 1.0.5 (2016-05-29)
* (bluefox) wechselt zwischen max und min

### 1.0.4 (2016-05-29)
* (bluefox) Datenaufbewahrung prüfen, wenn "nie" gesetzt ist

### 1.0.3 (2016-05-28)
* (bluefox) versuchen, alte Zeitstempel zu berechnen

### 1.0.2 (2016-05-24)
* (bluefox) behebt einen fehler mit dem io-package

### 1.0.1 (2016-05-24)
* (bluefox) Fehler mit SQLite beheben

### 1.0.0 (2016-05-20)
* (bluefox) Standard-Aggregationsname ändern

### 0.3.3 (2016-05-18)
* (bluefox) fixieren postgres

### 0.3.2 (2016-05-13)
* (bluefox) Warteschlange auswählen, ob IDs und FROMs für sqlite abfragen

### 0.3.1 (2016-05-12)
* (bluefox) Warteschlange löscht auch Abfragen für sqlite

### 0.3.0 (2016-05-08)
* (bluefox) Unterstützung von benutzerdefinierten Abfragen
* (bluefox) nur eine Anfrage gleichzeitig für sqlite
* (bluefox) add tests (primitiv und nur sql)

### 0.2.0 (2016-04-30)
* (bluefox) Unterstützung von Millisekunden
* (Bluefox) fixiert sqlite

### 0.1.4 (2016-04-25)
* (bluefox) Löschung alter Einträge korrigiert

### 0.1.3 (2016-03-08)
* (bluefox) druckt Fehler nicht zweimal

### 0.1.2 (2015-12-22)
* (bluefox) MS-SQL-Porteinstellungen korrigieren

### 0.1.1 (2015-12-19)
* (bluefox) behebt Fehler bei doppelten Einträgen

### 0.1.0 (2015-12-14)
* (Bluefox) Unterstützung von Strings

### 0.0.3 (2015-12-06)
* (smiling_Jack) Demodaten hinzufügen (todo: schneller Einfügen in db)
* (smiling_Jack) Aggregation ändern (jetzt identisch mit Verlaufsadapter)
* (bluefox) Fehlerbehebung

### 0.0.2 (2015-12-06)
* (bluefox) erlaubt nur einen Client für SQLite

### 0.0.1 (2015-11-19)
* (bluefox) anfängliches Commit

## Changelog

## License

The MIT License (MIT)

Copyright (c) 2015-2018 bluefox <dogafox@gmail.com>, Apollon77

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