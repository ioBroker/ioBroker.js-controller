---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sql/README.md
title: ioBroker.sql
hash: kOf3oPq4qStRFDipZVtBzb4+UGhHEUFhZ2n7hKt1Hhg=
---
![Logo](../../../en/adapterref/iobroker.sql/admin/sql.png)

![Anzahl der Installationen](http://iobroker.live/badges/sql-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sql.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sql.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.sql.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sql.png?downloads=true)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/ioBroker/ioBroker.sql.svg)

# IoBroker.sql
==================================

Dieser Adapter speichert den Statusverlauf in der SQL-Datenbank.

Unterstützt PostgreSQL, MySQL, Microsoft SQL Server und SQLite.
Sie können Port 0 belassen, wenn der Standardport gewünscht wird.

### MS-SQL:
Verwenden Sie ```localhost\instance``` für den Host und überprüfen Sie, ob die TCP / IP-Verbindungen aktiviert sind.
https://msdn.microsoft.com/en-us/library/bb909712(v=vs.90).aspx

### SQLite:
ist "file" -DB und kann nicht zu viele Ereignisse verwalten. Wenn Sie eine große Datenmenge haben, verwenden Sie echte Datenbanken wie PostgreSQL und Co.

SQLite DB darf nicht extra installiert werden. Es ist nur eine Datei auf der Festplatte, aber um sie zu installieren, benötigen Sie Build-Tools auf Ihrem System. Für Linux schreiben Sie einfach:

```
sudo apt-get install build-essential
```

Für Windows:

```
c:\>npm install --global --production windows-build-tools
```

Installieren Sie dann den Adapter neu, z.

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

Bearbeiten Sie bei Bedarf */ etc / mysql / my.cnf* um die Bindung für die Remoteverbindung auf die IP-Adresse festzulegen.

** Warnung **: iobroker-Benutzer ist "admin". Geben Sie dem iobroker-Benutzer bei Bedarf eingeschränkte Rechte.

## Struktur der DBs
Der Standardname der Datenbank ist "iobroker", er kann jedoch in der Konfiguration geändert werden.

### Quellen Diese Tabelle ist eine Liste der Adapterinstanzen, die die Einträge geschrieben haben. (state.from)
| DB | Name in Abfrage |
|------------|----------------------|
| MS-SQL | iobroker.dbo.sources |
| MySQL | iobroker.sources |
| PostgreSQL | Quellen |
| SQLite | Quellen |

Struktur:

| Feld | Typ | Beschreibung |
|-------|--------------------------------------------|-------------------------------------------|
| id | INTEGER NICHT NULL PRIMARY KEY IDENTITY (1,1) | eindeutige ID |
| name | varchar (255) / TEXT | Instanz des Adapters, der den Eintrag geschrieben hat |

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
| id | INTEGER NICHT NULL PRIMARY KEY IDENTITY (1,1) | eindeutige ID |
| name | varchar (255) / TEXT | ID der Variablen, z.B. hm-rpc.0.JEQ283747.1.STATE |
| Typ | INTEGER | 0 - Zahl, 1 - String, 2 - Boolescher Wert |

* Hinweis: * MS-SQL verwendet varchar (255) und andere verwenden TEXT

### Zahlen
Werte für Zustände vom Typ "number". **ts** bedeutet "Zeitreihe".

| DB | Name in Abfrage |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_number |
| MySQL | iobroker.ts_number |
| PostgreSQL | ts_number |
| SQLite | ts_number |

Struktur:

| Feld | Typ | Beschreibung |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | ID des Status aus der Tabelle "Datenpunkte" |
| ts | BIGINT / INTEGER | Zeit in ms bis Epoche. Kann mit "new Date (ts)" auf Zeit umgerechnet werden |
| val | REAL | Wert |
| ack | BIT / BOOLEAN | Wird quittiert: 0 - nicht quittieren, 1 - quittieren |
| _von | INTEGER | ID der Quelle aus der Tabelle "Quellen" |
| q | INTEGER | Qualität als Nummer. Sie finden die Beschreibung [Hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

* Hinweis: * MS-SQL verwendet BIT und andere verwenden BOOLEAN. SQLite verwendet für ts INTEGER und alle anderen BIGINT.

### Strings
Werte für Zustände vom Typ "string".

| DB | Name in Abfrage |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_string |
| MySQL | iobroker.ts_string |
| PostgreSQL | ts_string |
| SQLite | ts_string |

Struktur:

| Feld | Typ | Beschreibung |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | ID des Status aus der Tabelle "Datenpunkte" |
| ts | BIGINT | Zeit in ms bis Epoche. Kann mit "new Date (ts)" auf Zeit umgerechnet werden |
| val | TEXT | Wert |
| ack | BIT / BOOLEAN | Wird quittiert: 0 - nicht quittieren, 1 - quittieren |
| _von | INTEGER | ID der Quelle aus der Tabelle "Quellen" |
| q | INTEGER | Qualität als Nummer. Sie finden die Beschreibung [Hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

* Hinweis: * MS-SQL verwendet BIT und andere verwenden BOOLEAN. SQLite verwendet für ts INTEGER und alle anderen BIGINT.

### Boolesche Werte
Werte für Zustände vom Typ "boolean".

| DB | Name in Abfrage |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_bool |
| MySQL | iobroker.ts_bool |
| PostgreSQL | ts_bool |
| SQLite | ts_bool |

Struktur:

| Feld | Typ | Beschreibung |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | ID des Status aus der Tabelle "Datenpunkte" |
| ts | BIGINT | Zeit in ms bis Epoche. Kann mit "new Date (ts)" auf Zeit umgerechnet werden |
| val | BIT / BOOLEAN | Wert |
| ack | BIT / BOOLEAN | Wird quittiert: 0 - nicht quittieren, 1 - quittieren |
| _von | INTEGER | ID der Quelle aus der Tabelle "Quellen" |
| q | INTEGER | Qualität als Nummer. Sie finden die Beschreibung [Hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

* Hinweis: * MS-SQL verwendet BIT und andere verwenden BOOLEAN. SQLite verwendet für ts INTEGER und alle anderen BIGINT.

## Benutzerdefinierte Abfragen
Der Benutzer kann benutzerdefinierte Abfragen für Tabellen über den Javascript-Adapter ausführen:

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

Oder rufen Sie Einträge für die letzte Stunde für ID = system.adapter.admin.0.memRss ab

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
Diese Funktion kann auch zum Konvertieren von Daten aus anderen Verlaufsadaptern wie Verlauf oder SQL verwendet werden.

Die angegebenen IDs werden nicht mit der ioBroker-Datenbank abgeglichen und müssen dort nicht eingerichtet werden, sondern sind nur direkt zugänglich.

Die Nachricht kann eines der folgenden drei Formate haben:

* eine ID und ein Statusobjekt
* Eine ID und ein Array von Statusobjekten
* Array von mehreren IDs mit Statusobjekten

## Geschichte abrufen
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
Der Adapter unterstützt das Aktivieren und Deaktivieren der Verlaufsprotokollierung über JavaScript sowie das Abrufen der Liste der aktivierten Datenpunkte mit ihren Einstellungen.

### Aktivieren
Für die Nachricht muss die "ID" des Datenpunkts angegeben werden. Zusätzliche optionale "Optionen" zum Definieren der Datenpunkt-spezifischen Einstellungen:

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
Für die Nachricht muss die "ID" des Datenpunkts angegeben werden.

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

### Liste holen
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
- **DB-Typ** Typ der SQL-DB: MySQL, PostgreSQL, MS-SQL oder SQLite3
- **Host** IP-Adresse oder Hostname mit SQL Server
- **Port** Port von SQL Server (leer lassen, wenn nicht sicher)
- **Datenbankname** Datenbankname. Standard iobroker
- **Benutzer** Benutzername für SQL. Muss in der DB vorhanden sein.
- **Passwort** Passwort für SQL.
- **Passwort bestätigen** Passwort hier einfach wiederholen.
- **Verschlüsseln** Einige DBs unterstützen die Verschlüsselung.
- **Runden Sie den Real auf** Anzahl der Stellen nach dem Komma.
- **Erlaube parallele Anfragen** Erlaube gleichzeitige SQL-Anfragen an DB.

## Standardeinstellungen
- **Entprellintervall** Speichern Sie Werte nicht oft als dieses Intervall.
- **Unveränderte Werte protokollieren alle** Schreiben Sie zusätzlich alle X Sekunden die Werte.
- **Mindestdifferenz vom letzten Wert zum Protokoll** Mindestintervall zwischen zwei Werten.
- **Aufbewahrung** Wie lange werden die Werte im DB gespeichert?

## 1.10.0 (2019-07-xx) WIP !!
* (Bluefox) Auf ES6 konvertieren

## 1.9.5 (15.05.2019)
* (Apollon77) Unterstützung für NodeJS 12 hinzufügen

## 1.9.4 (2019-02-24)
* (Apollon77) Behebung mehrerer kleinerer Probleme und Themen
* (Apollon77) Texte optimieren (für Admin v3 UI)

## 1.9.0 (2018-06-19)
* (Apollon77) Option hinzufügen, um Datenpunkte als andere ID (Alias) zu protokollieren, um die Migration von Geräten und dergleichen zu vereinfachen

## 1.8.0 (2018-04-29)
* (Apollon77) Update von sqlite3, NodeJS 10 kompatibel
* (BuZZy1337) Admin-Fix

## 1.7.4 (2018-04-15)
* (Apollon77) Fix getHistory

## 1.7.3 (2018-03-28)
* (Apollon77) Respektieren Sie die Einstellung "Für immer behalten", damit die Datenpunktkonfiguration beibehalten wird

## 1.7.2 (2018-03-24)
* (Apollon77) Deaktiviert das Schreiben von NULL-Werten für SQLite

## 1.7.1 (2018-02-10)
* (Apollon77) Option zum Schreiben von NULL-Werten an Start / Stopp-Grenzen konfigurierbar machen

## 1.6.9 (2018-02-07)
* (bondrogeen) Admin3-Korrekturen
* (Apollon77) optimieren Relog-Funktion und andere Dinge

## 1.6.7 (2018-01-31)
* (Bluefox) Admin3-Korrekturen
* (Apollon77) Korrekturen für Relog und Null-Log

## 1.6.2 (30.01.2018)
* (Apollon77) Admin3-Korrekturen

## 1.6.0 (2018-01-14)
* (bluefox) Bereit für Admin3

## 1.5.8 (2017-10-05)
* (Apollon77) Fix Relog-Wert-Funktion

## 1.5.7 (2017-08-10)
* (bluefox) Option "letzten Wert speichern" hinzufügen

## 1.5.6 (2017-08-02)
* (Apollon77) Behobenes Verhalten des Protokollintervalls, um immer den aktuellen Wert zu protokollieren

## 1.5.4 (2017-06-12)
* (Apollon77) Fix Abhängigkeit zu anderen Bibliotheken

## 1.5.3 (2017-04-07)
* (Apollon77) Fix bei Datentypkonvertierungen

### 1.5.0 (2017-03-02)
* (Apollon77) Option zum Definieren des Speicherdatentyps pro Datenpunkt, einschließlich der Konvertierung des Werts, falls erforderlich

### 1.4.6 (25.02.2017)
* (Apollon77) Tippfehler mit PostgrSQL beheben

### 1.4.5 (2017-02-18)
* (Apollon77) Kleine Korrektur für ältere Konfigurationen
* (Apollon77) Fehlerbehebung für die DBConverter-Analysefunktion

### 1.4.3 (2017-02-11)
* (Apollon77) Kleiner Fix für ältere Konfigurationen

### 1.4.2 (2017-01-16)
* (bluefox) Fehlerbehebung beim Umgang mit Float-Werten in der Adapter- und Datenpunktkonfiguration.

### 1.4.1
* (Apollon77) Rollback auf SQL-Client 0.7, um die MMAGIC-Abhängigkeit zu beseitigen, die Probleme auf älteren Systemen mit sich bringt

### 1.4.0 (2016-12-02)
* (Apollon77) Nachrichten hinzufügen enableHistory / disableHistory
* (Apollon77) Unterstützung für das Protokollieren von Änderungen nur hinzufügen, wenn der Wert von einem Mindestwert für Zahlen abweicht

### 1.3.4 (2016-11)
* (Apollon77) Erlaube Datenbanknamen mit '-' für MySQL

### 1.3.3 (2016-11)
* (Apollon77) Abhängigkeiten aktualisieren

### 1.3.2 (21.11.2016)
* (bluefox) String einfügen mit '

### 1.3.0 (29.10.2016)
* (Apollon77) Option hinzufügen, um unveränderte Werte neu zu protokollieren, um die Visualisierung zu vereinfachen

### 1.2.1 (30.08.2016)
* (bluefox) Fix Selector für SQL Objekte

### 1.2.0 (30.08.2016)
* (Bluefox) Kompatibel nur mit neuen Admin

### 1.0.10 (27.08.2016)
* (bluefox) benenne das Objekt von "history" in "custom"

### 1.0.10 (31.07.2016)
* (bluefox) behebe Mehrfachanfragen wenn sqlite

### 1.0.9 (2016-06-14)
* (bluefox) erlaubt Einstellungen für parallele Anfragen

### 1.0.7 (2016-05-31)
* (bluefox) Zeichne eine Linie bis zum Ende, wenn du null ignorierst

### 1.0.6 (30.05.2016)
* (bluefox) erlaubt den Namen der Setup-Datenbank für mysql und mssql

### 1.0.5 (29.05.2016)
* (bluefox) wechselt zwischen max und min

### 1.0.4 (29.05.2016)
* (bluefox) Datenaufbewahrung prüfen, wenn "nie" eingestellt ist

### 1.0.3 (28.05.2016)
* (bluefox) versuche alte Zeitstempel zu berechnen

### 1.0.2 (24.05.2016)
* (bluefox) Fehler mit io-package beheben

### 1.0.1 (24.05.2016)
* (bluefox) Fehler mit SQLite beheben

### 1.0.0 (2016-05-20)
* (bluefox) Ändert den Standardnamen der Aggregation

### 0.3.3 (2016-05-18)
* (Bluefox) fix postgres

### 0.3.2 (2016-05-13)
* (bluefox) queue wähle wenn IDs und FROMs nach sqlite fragen

### 0.3.1 (2016-05-12)
* (bluefox) queue löscht auch abfragen für sqlite

### 0.3.0 (08.05.2016)
* (Bluefox) Unterstützung von benutzerdefinierten Abfragen
* (bluefox) nur eine anfrage gleichzeitig für sqlite
* (bluefox) teste hinzufügen (primitiv und nur sql)

### 0.2.0 (30.04.2016)
* (Bluefox) Unterstützung von Millisekunden
* (bluefox) fix sqlite

### 0.1.4 (25.04.2016)
* (bluefox) Löschung alter Einträge korrigieren

### 0.1.3 (08.03.2016)
* (Bluefox) Fehler nicht zweimal ausdrucken

### 0.1.2 (2015-12-22)
* (bluefox) MS-SQL-Porteinstellungen korrigieren

### 0.1.1 (19.12.2015)
* (bluefox) Fehler mit doppelten Einträgen beheben

### 0.1.0 (14.12.2015)
* (Bluefox) Unterstützung von Strings

### 0.0.3 (06.12.2015)
* (smiling_Jack) Demo-Daten hinzufügen (todo: schnelleres Einfügen in die Datenbank)
* (smiling_Jack) Aggregation ändern (jetzt wie History Adapter)
* (Bluefox) Fehlerbehebung

### 0.0.2 (06.12.2015)
* (bluefox) erlaubt nur 1 Client für SQLite

### 0.0.1 (19.11.2015)
* (Bluefox) Initial Commit

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