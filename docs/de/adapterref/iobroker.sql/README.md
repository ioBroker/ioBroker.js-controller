---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sql/README.md
title: ioBroker.sql
hash: oH6/B1e2WUVKqSdwl85gT18ugSQxUpkvi9mR7iujG8k=
---
![Logo](../../../en/adapterref/iobroker.sql/admin/sql.png)

![Anzahl der Installationen](http://iobroker.live/badges/sql-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sql.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sql.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.sql.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sql.png?downloads=true)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/ioBroker/ioBroker.sql.svg)

# IoBroker.sql
Dieser Adapter speichert den Statusverlauf in der SQL-Datenbank.

Unterstützt PostgreSQL, MySQL, Microsoft SQL Server und SQLite.
Sie können Port 0 verlassen, wenn der Standardport gewünscht wird.

** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

### MS-SQL:
Verwenden Sie ```localhost\instance``` für den Host und überprüfen Sie, ob die TCP / IP-Verbindungen aktiviert sind.
https://msdn.microsoft.com/en-us/library/bb909712(v=vs.90).aspx

### SQLite:
ist "Datei" -DB und kann nicht zu viele Ereignisse verwalten. Wenn Sie eine große Datenmenge haben, verwenden Sie die echte Datenbank wie PostgreSQL und Co.

SQLite DB darf nicht extra installiert werden. Es ist nur eine Datei auf der Festplatte, aber um sie zu installieren, benötigen Sie Build-Tools auf Ihrem System. Für Linux schreiben Sie einfach:

```
sudo apt-get install build-essential
```

Für Windows:

```
c:\>npm install --global --production windows-build-tools
```

und installieren Sie dann den Adapter neu, z.

```
cd /opt/iobroker
iobroker stop sql
npm install iobroker.sql --production
iobroker start sql
```

### MySQL:
Sie können MySQL wie folgt auf Linux-Systemen installieren:

```
apt-get install mysql-server mysql-client

mysql -uroot -p

CREATE USER 'iobroker'@'%' IDENTIFIED BY 'iobroker';
GRANT ALL PRIVILEGES ON * . * TO 'iobroker'@'%';
FLUSH PRIVILEGES;
```

Bearbeiten Sie bei Bedarf */ etc / mysql / my.cnf* um die Bindung an die IP-Adresse für die Remoteverbindung festzulegen.

** Warnung **: iobroker-Benutzer ist "admin". Geben Sie dem iobroker-Benutzer bei Bedarf eingeschränkte Rechte.

Unter "Windows" kann es einfach über das Installationsprogramm installiert werden: https://dev.mysql.com/downloads/installer/.

Achten Sie auf die Authentifizierungsmethode. Der neue Verschlüsselungsalgorithmus in MySQL 8.0 wird von `node.js` noch nicht unterstützt, und Sie müssen die Legacy-Authentifizierungsmethode auswählen.

![Windows](../../../en/adapterref/iobroker.sql/img/WindowsMySQLinstaller.png)

## Struktur der DBs
Der Standardname der Datenbank lautet "iobroker", kann jedoch in der Konfiguration geändert werden.

### Quellen Diese Tabelle enthält eine Liste der Adapterinstanzen, die die Einträge geschrieben haben. (state.from)
| DB | Name in Abfrage |
|------------|----------------------|
| MS-SQL | iobroker.dbo.sources |
| MySQL | iobroker.sources |
| PostgreSQL | Quellen |
| SQLite | Quellen |

Struktur:

| Feld | Geben Sie | ein Beschreibung |
|-------|--------------------------------------------|-------------------------------------------|
| id | INTEGER NICHT NULL PRIMARY KEY IDENTITY (1,1) | eindeutige ID |
| Name | varchar (255) / TEXT | Instanz des Adapters, der den Eintrag | geschrieben hat |

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

| Feld | Geben Sie | ein Beschreibung |
|-------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER NICHT NULL PRIMARY KEY IDENTITY (1,1) | eindeutige ID |
| Name | varchar (255) / TEXT | ID der Variablen, z. hm-rpc.0.JEQ283747.1.STATE |
| Typ | INTEGER | 0 - Zahl, 1 - Zeichenfolge, 2 - Boolescher Wert |

* Hinweis: * MS-SQL verwendet varchar (255) und andere verwenden TEXT

### Zahlen
Werte für Zustände vom Typ "Nummer". **ts** bedeutet "Zeitreihe".

| DB | Name in Abfrage |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_number |
| MySQL | iobroker.ts_number |
| PostgreSQL | ts_number |
| SQLite | ts_number |

Struktur:

| Feld | Geben Sie | ein Beschreibung |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | ID des Status aus der Tabelle "Datenpunkte" |
| ts | BIGINT / INTEGER | Zeit in ms bis zur Epoche. Kann mit "new Date (ts)" | in time konvertiert werden |
| val | REAL | Wert |
| ack | BIT / BOOLEAN | Wird bestätigt: 0 - nicht ack, 1 - ack |
| _von | INTEGER | ID der Quelle aus der Tabelle "Quellen" |
| q | INTEGER | Qualität als Nummer. Sie finden die Beschreibung [Hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

* Hinweis: * MS-SQL verwendet BIT und andere verwenden BOOLEAN. SQLite verwendet für ts INTEGER und alle anderen BIGINT.

Der Benutzer kann zusätzlich zum Typ `number` die Funktionalität von "Zählern" definieren. Zu diesem Zweck wird folgende Tabelle erstellt:

| DB | Name in der Abfrage |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_counter |
| MySQL | iobroker.ts_counter |
| PostgreSQL | ts_counter |
| SQLite | ts_counter |

Struktur:

| Feld | Geben Sie | ein Beschreibung |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | ID des Status aus der Tabelle "Datenpunkte" |
| ts | BIGINT / INTEGER | Zeit in ms bis zur Epoche. Kann mit "new Date (ts)" | in time konvertiert werden |
| val | REAL | Wert |

In dieser Tabelle werden die Werte gespeichert, als der Zähler ausgetauscht wurde und der Wert nicht erhöht wurde, aber nicht auf Null oder einen niedrigeren Wert gesetzt wurde.

### Strings
Werte für Zustände vom Typ "Zeichenfolge".

| DB | Name in Abfrage |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_string |
| MySQL | iobroker.ts_string |
| PostgreSQL | ts_string |
| SQLite | ts_string |

Struktur:

| Feld | Geben Sie | ein Beschreibung |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | ID des Status aus der Tabelle "Datenpunkte" |
| ts | BIGINT | Zeit in ms bis zur Epoche. Kann mit "new Date (ts)" | in time konvertiert werden |
| val | TEXT | Wert |
| ack | BIT / BOOLEAN | Wird bestätigt: 0 - nicht ack, 1 - ack |
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

| Feld | Geben Sie | ein Beschreibung |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | ID des Status aus der Tabelle "Datenpunkte" |
| ts | BIGINT | Zeit in ms bis zur Epoche. Kann mit "new Date (ts)" | in time konvertiert werden |
| val | BIT / BOOLEAN | Wert |
| ack | BIT / BOOLEAN | Wird bestätigt: 0 - nicht ack, 1 - ack |
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
Wenn Sie andere Daten in die InfluxDB / SQL schreiben möchten, können Sie die eingebaute Systemfunktion **storeState** verwenden.
Diese Funktion kann auch zum Konvertieren von Daten aus anderen Verlaufsadaptern wie Verlauf oder SQL verwendet werden.

Die angegebenen IDs werden nicht mit der ioBroker-Datenbank verglichen und müssen dort nicht eingerichtet werden, sondern können nur direkt aufgerufen werden.

Die Nachricht kann eines der folgenden drei Formate haben:

* eine ID und ein Statusobjekt: `{id: 'adapter.0.device.counter', Status: {val: 1, ts: 10239499}}`
* eine ID und ein Array von Statusobjekten: `{id: 'adapter.0.device.counter', Status: [{val: 1, ts: 10239499}, {val: 2, ts: 10239599}, {val: 3 , ts: 10239699}]} `
* Array mehrerer IDs mit Statusobjekten `[{id: 'adapter.0.device.counter1', Status: {val: 1, ts: 10239499}, {id: 'adapter.0.device.counter2', Status: {val: 2, ts: 10239599}] `

Zusätzlich können Sie das Attribut `rules: true` hinzufügen, um alle Regeln wie `counter`, `changesOnly`, `de-bounce` usw. zu aktivieren: `{id: 'adapter.0.device.counter', rules: true, state: [{val: 1, ts: 10239499}, {val: 2, ts: 10239599}, {val: 3, ts: 10239699}]}`

## Geschichte abrufen
Zusätzlich zu benutzerdefinierten Abfragen können Sie die integrierte Systemfunktion **getHistory** verwenden:

```
var end = Date.now();
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

## Zähler abrufen
Der Benutzer kann den Wert eines Zählers (Typ = Nummer, Zähler = Wahr) für einen bestimmten Zeitraum erfragen.

```
var now = Date.now();
// get consumption value for last 30 days
sendTo('sql.0', 'getCounter', {
    id: 'system.adapter.admin.0.memRss',
    options: {
        start:      now - 3600000 * 24 * 30,
        end:        now,
    }
}, result => {
    console.log(`In last 30 days the consumption was ${result.result} kWh`);
});
```

Wenn der Zähler ersetzt wird, wird er ebenfalls berechnet.

## Verwaltung der Verlaufsprotokollierung über Javascript
Der Adapter unterstützt das Aktivieren und Deaktivieren der Verlaufsprotokollierung über JavaScript sowie das Abrufen der Liste der aktivierten Datenpunkte mit ihren Einstellungen.

### Aktivieren
Die Nachricht muss die "ID" des Datenpunkts haben. Zusätzlich optionale "Optionen", um die datenpunktspezifischen Einstellungen zu definieren:

```
sendTo('sql.0', 'enableHistory', {
    id: 'system.adapter.sql.0.memRss',
    options: {
        changesOnly:  true,
        debounce:     0,
        retention:    31536000,
        maxLength:    3,
        changesMinDelta: 0.5,
        aliasId: ''
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
- **DB-Typ** Typ der SQL-DB: MySQL, PostgreSQL, MS-SQL oder SQLite3
- **Host** IP-Adresse oder Hostname mit SQL Server
- **Port** Port von SQL Server (leer lassen, wenn nicht sicher)
- **Datenbankname** Datenbankname. Standard iobroker
- **Benutzer** Benutzername für SQL. Muss in der DB vorhanden sein.
- **Passwort** Passwort für SQL.
- **Passwort bestätigen** Wiederholen Sie einfach das Passwort hier.
- **Verschlüsseln** Einige DBs unterstützen die Verschlüsselung.
- **Real runden auf** Anzahl der Ziffern nach dem Komma.
- **Parallele Anforderungen zulassen** Zulassen gleichzeitiger SQL-Anforderungen an die Datenbank.

## Standardeinstellungen
- **De-Bounce-Intervall** Speichern Sie Werte nicht öfter als dieses Intervall.
- **Unveränderte Werte protokollieren** Schreiben Sie die Werte zusätzlich alle X Sekunden.
- **Minimale Differenz vom letzten Wert zum Protokoll** Das minimale Intervall zwischen zwei Werten.
- **Speicheraufbewahrung** Wie lange werden die Werte in der Datenbank gespeichert?

## 1.12.3 (2020-04-30)
* (Apollon77) Versuchen Sie, Indizes unter MSSQL zu erstellen, um die Dinge zu beschleunigen. Infos werden angezeigt, wenn dies für den Benutzer nicht möglich ist. Timeout ist 15s

## 1.12.2 (2020-04-30)
* (Apollon77) MSSQL funktioniert wieder

## 1.12.1 (2020-04-26)
* (Apollon77) Behebung eines möglichen Absturzes (Sentry)

## 1.12.0 (2020-04-23)
* (Apollon77) Implementieren Sie die Einstellung für maximale Verbindungen und respektieren Sie diese. Jetzt können Sie steuern, wie viele gleichzeitige Verbindungen zur Datenbank verwendet werden (Standard 100), und andere warten bis zu 10 Sekunden auf eine freie Verbindung, bevor sie fehlschlagen.)
* (Apollon77) Ändern Sie die Abhängigkeiten von admin in eine globale Abhängigkeit
* (Apollon77) Aktualisieren Sie den Verbindungsstatus auch dazwischen
* (Apollon77) behebt einige mögliche Absturzfälle (Sentry berichtet)
* (Omega236) ID zur Fehlermeldung für Abfragen hinzufügen
* (Apollon77) aktualisiere pg, um mit nodejs 14 kompatibel zu bleiben
* (Apollon77) Beginne klar, Timeouts beim Entladen zu beenden ... noch einige Fälle übrig!

## 1.11.1 (2020-04-19)
* __Erfordert js-controller> = 2.0.0__
* (Apollon77) hat die Verwendung von adapter.objects entfernt
* (Apollon77) Überprüfen Sie, ob sich Objekte geändert haben, und ignorieren Sie sie unverändert
* (Apollon77) Fügen Sie Sentry für die Fehlerberichterstattung mit js-controller 3.0 hinzu
* (Apollon77) Stellen Sie sicher, dass der undefinierte Wert ignoriert wird

## 1.10.1 (2020-04-12)
* (Bluefox) In ES6 konvertiert
* (bluefox) Die Zählerfunktionalität wurde implementiert.

## 1.9.5 (2019-05-15)
* (Apollon77) Unterstützung für NodeJS 12 hinzufügen

## 1.9.4 (2019-02-24)
* (Apollon77) Beheben Sie mehrere kleinere Probleme und Themen
* (Apollon77) Texte optimieren (für Admin v3 UI)

## 1.9.0 (2018-06-19)
* (Apollon77) Option zum Protokollieren von Datenpunkten als andere ID (Alias) hinzufügen, um die Migration von Geräten und dergleichen zu vereinfachen

## 1.8.0 (29.04.2018)
* (Apollon77) Aktualisieren Sie sqlite3, nodejs 10 kompatibel
* (BuZZy1337) Admin-Fix

## 1.7.4 (15.04.2018)
* (Apollon77) Fix getHistory

## 1.7.3 (2018-03-28)
* (Apollon77) Beachten Sie die Einstellung "Für immer behalten", um die Datenpunktkonfiguration beizubehalten

## 1.7.2 (2018-03-24)
* (Apollon77) Deaktiviert das Schreiben von NULL-Werten für SQLite

## 1.7.1 (10.02.2018)
* (Apollon77) Option zum Schreiben von NULL-Werten an Start- / Stoppgrenzen konfigurierbar machen

## 1.6.9 (2018-02-07)
* (bondrogeen) Admin3-Korrekturen
* (Apollon77) Optimieren Sie die Relog-Funktion und andere Dinge

## 1.6.7 (2018-01-31)
* (Bluefox) Admin3-Korrekturen
* (Apollon77) Relog- und Null-Log-Korrekturen

## 1.6.2 (2018-01-30)
* (Apollon77) Admin3-Korrekturen

## 1.6.0 (2018-01-14)
* (bluefox) Bereit für Admin3

## 1.5.8 (2017-10-05)
* (Apollon77) Relog-Wert-Funktion korrigieren

## 1.5.7 (10.08.2017)
* (bluefox) Option "Letzten Wert speichern" hinzufügen

## 1.5.6 (2017-08-02)
* (Apollon77) Das Verhalten des Protokollintervalls wurde korrigiert, um immer den aktuellen Wert zu protokollieren

## 1.5.4 (12.06.2017)
* (Apollon77) Behebung der Abhängigkeit von einer anderen Bibliothek

## 1.5.3 (2017-04-07)
* (Apollon77) Korrektur bei Datentypkonvertierungen

### 1.5.0 (2017-03-02)
* (Apollon77) Option zum Definieren des Speicherdatentyps pro Datenpunkt hinzufügen, einschließlich der Konvertierung des Werts bei Bedarf

### 1.4.6 (2017-02-25)
* (Apollon77) Tippfehler mit PostgrSQL beheben

### 1.4.5 (2017-02-18)
* (Apollon77) Wieder ein kleiner Fix für ältere Konfigurationen
* (Apollon77) Fix für DBConverter Analyze-Funktion

### 1.4.3 (2017-02-11)
* (Apollon77) Kleine Korrektur für ältere Konfigurationen

### 1.4.2 (2017-01-16)
* (bluefox) Die Behandlung von Gleitkommawerten in der Adapterkonfiguration und der Datenpunktkonfiguration wurde korrigiert.

### 1.4.1
* (Apollon77) Rollback auf SQL-Client 0.7, um die mmagische Abhängigkeit zu beseitigen, die auf älteren Systemen zu Problemen führt

### 1.4.0 (2016-12-02)
* (Apollon77) Nachrichten hinzufügen enableHistory / disableHistory
* (Apollon77) Unterstützung für Protokolländerungen nur hinzufügen, wenn der Wert von einem Mindestwert für Zahlen abweicht

### 1.3.4 (2016-11)
* (Apollon77) Erlaube Datenbanknamen mit '-' für MySQL

### 1.3.3 (2016-11)
* (Apollon77) Aktualisieren Sie die Abhängigkeiten

### 1.3.2 (21.11.2016)
* (bluefox) Fix Einfügung der Zeichenfolge mit '

### 1.3.0 (29.10.2016)
* (Apollon77) Option zum erneuten Protokollieren unveränderter Werte hinzufügen, um die Visualisierung zu vereinfachen

### 1.2.1 (30.08.2016)
* (bluefox) Fix Selektor für SQL-Objekte

### 1.2.0 (30.08.2016)
* (bluefox) Nur mit neuem Administrator kompatibel

### 1.0.10 (27.08.2016)
* (bluefox) Ändern Sie den Namen des Objekts von "Verlauf" in "Benutzerdefiniert".

### 1.0.10 (2016-07-31)
* (bluefox) behebt mehrere Anfragen, wenn SQLite

### 1.0.9 (14.06.2016)
* (bluefox) erlaubt Einstellungen für parallele Anfragen

### 1.0.7 (2016-05-31)
* (bluefox) Linie bis zum Ende ziehen, wenn null ignoriert wird

### 1.0.6 (30.05.2016)
* (bluefox) erlaubt den Setup-DB-Namen für MySQL und MSSQL

### 1.0.5 (29.05.2016)
* (bluefox) schalten max und min miteinander um

### 1.0.4 (29.05.2016)
* (bluefox) Datenaufbewahrung prüfen, wenn "nie" gesetzt ist

### 1.0.3 (28.05.2016)
* (Bluefox) versuchen, alte Zeitstempel zu berechnen

### 1.0.2 (24.05.2016)
* (bluefox) Fehler mit io-package behoben

### 1.0.1 (24.05.2016)
* (bluefox) Fehler mit SQLite behoben

### 1.0.0 (2016-05-20)
* (bluefox) Ändert den Standardaggregationsnamen

### 0.3.3 (2016-05-18)
* (Bluefox) Postgres reparieren

### 0.3.2 (2016-05-13)
* (bluefox) Warteschlange auswählen, ob IDs und FROMs nach SQLite fragen

### 0.3.1 (2016-05-12)
* (bluefox) Warteschlange Löschabfragen auch für SQLite

### 0.3.0 (08.05.2016)
* (Bluefox) Unterstützung von benutzerdefinierten Abfragen
* (bluefox) nur eine Anfrage gleichzeitig für SQLite
* (Bluefox) Tests hinzufügen (primitiv und nur SQL)

### 0.2.0 (30.04.2016)
* (Bluefox) Unterstützung von Millisekunden
* (Bluefox) SQLite reparieren

### 0.1.4 (25.04.2016)
* (bluefox) korrigiert das Löschen alter Einträge

### 0.1.3 (08.03.2016)
* (bluefox) druckt Fehler nicht zweimal

### 0.1.2 (2015-12-22)
* (bluefox) korrigiert die MS-SQL-Porteinstellungen

### 0.1.1 (2015-12-19)
* (bluefox) Fehler mit doppelten Einträgen behoben

### 0.1.0 (14.12.2015)
* (Bluefox) Unterstützung von Strings

### 0.0.3 (06.12.2015)
* (smile_Jack) Demo-Daten hinzufügen (Aufgabe: schnelleres Einfügen in die Datenbank)
* (smile_Jack) Änderungsaggregation (jetzt wie Verlaufsadapter)
* (Bluefox) Fehlerbehebung

### 0.0.2 (06.12.2015)
* (bluefox) erlaubt nur 1 Client für SQLite

### 0.0.1 (2015-11-19)
* (Bluefox) anfängliches Commit

## Changelog

## License

The MIT License (MIT)

Copyright (c) 2015-2020 bluefox <dogafox@gmail.com>, Apollon77

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