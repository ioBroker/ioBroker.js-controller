---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.history/README.md
title: ioBroker.history
hash: D2+N/guf37V/MaNUbADVccgWuAcuSrOXPp20XtwZ8Os=
---
![Logo](../../../en/adapterref/iobroker.history/admin/history.png)

![Anzahl der Installationen](http://iobroker.live/badges/history-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.history.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.history.svg)
![Tests](http://img.shields.io/travis/ioBroker/ioBroker.history/master.svg)
![NPM](https://nodei.co/npm/iobroker.history.png?downloads=true)

# IoBroker.history
[![Greenkeeper-Abzeichen] (https://badges.greenkeeper.io/ioBroker/ioBroker.history.svg)](https://greenkeeper.io/)

Dieser Adapter speichert den Statusverlauf in einem zweistufigen Prozess.
Zunächst werden Datenpunkte im RAM gespeichert, sobald sie maxLength erreichen, werden sie auf der Festplatte gespeichert.

Um einige zu speichernde Datenpunkte einzurichten, müssen diese im Admin-Register "Objekte" (letzte Schaltfläche) konfiguriert werden.

Um Diagramme zu aktivieren, müssen Sie einen ** Flot-Adapter installieren.

## Die Einstellungen
- **Speicherverzeichnis** - Pfad zu dem Verzeichnis, in dem die Dateien gespeichert werden. Dies kann relativ zu "Iobroker-Daten" oder absolut erfolgen, wie "/ mnt / history" oder "D: / History".
- **Maximale Anzahl von im RAM gespeicherten Werten** - Nachdem diese Anzahl von Werten im RAM erreicht wurde, werden sie auf der Festplatte gespeichert.
- **Wertursprung speichern** - Wenn das Feld "from" ebenfalls gespeichert wird. Kann Platz auf der Festplatte speichern.
- **De-Bounce-Intervall** - Schutz gegen zu häufige Änderungen eines bestimmten Wertes und Definieren der Zeit in ms, in der nach einer Wertänderung andere Änderungen nicht protokolliert werden
- **Speicheraufbewahrung** - Wie viele Werte in der Vergangenheit werden auf der Festplatte gespeichert.
- **Unveränderte Werte protokollieren beliebige (s)** - Wenn Sie "Nur Änderungen protokollieren" verwenden, können Sie hier ein Zeitintervall in Sekunden einstellen, nach dem auch unveränderte Werte in den DB neu protokolliert werden

Die meisten dieser Werte werden in den Detaileinstellungen für den Datenpunkt vorbelegt und können dort geändert werden. Zusätzlich können Sie auf der Datenpunktseite eine "Alias-ID" angeben. Mit diesem können Sie z. Nachdem Sie einen Geräte- und Datenpunktnamen geändert haben, protokollieren Sie die Daten immer noch mit der alten ID, indem Sie diese ID dort eingeben. Alle Daten werden als diese protokolliert.

## Zugriff auf Werte vom Javascript-Adapter
Auf die sortierten Werte kann über den Javascript-Adapter zugegriffen werden. Z.B. Mit folgendem Code können Sie die Liste der Ereignisse für die letzte Stunde lesen:

```
// Get 50 last stored events for all IDs
sendTo('history.0', 'getHistory', {
    id: '*',
    options: {
        end:       new Date().getTime(),
        count:     50,
        aggregate: 'onchange'
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());
    }
});

// Get stored values for "system.adapter.admin.0.memRss" in last hour
var end = new Date().getTime();
sendTo('history.0', 'getHistory', {
    id: 'system.adapter.admin.0.memRss',
    options: {
        start:      end - 3600000,
        end:        end,
        aggregate: 'onchange'
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());
    }
});
```

Möglichkeiten:

- **start** - (optional) Zeit in ms - *neues Datum (). getTime ()* '
- **end** - (optional) Zeit in ms - *neues Datum (). getTime ()* 'ist standardmäßig (jetzt + 5000 Sekunden)
- **Schritt** - (optional) wird in Aggregatschritten (m4, max, min, Durchschnitt, gesamt) in ms von Intervallen verwendet
- **Anzahl** - Anzahl der Werte, wenn das Aggregat 'onchange' ist, oder Anzahl der Intervalle, wenn eine andere Aggregatmethode verwendet wird Count wird ignoriert, wenn step eingestellt ist.
- **von** - wenn *von* in der Antwort enthalten sein soll
- **ack** - wenn *ack* in der Antwort enthalten sein soll
- **q** - wenn *q* in der Antwort enthalten sein soll
- **addId** - wenn *id* in der Antwort enthalten sein soll
- **limit** - gibt nicht mehr Einträge als limit zurück
- **ignoreNull** - Wenn NULL-Werte einschließen (false), durch letzten nicht NULL-Wert (true) oder durch 0 (0) ersetzt werden sollen.
- **Aggregat** - Aggregatmethode:
  - *minmax* - benutzter spezieller Algorithmus. Spleißen Sie den gesamten Zeitbereich in kleinen Intervallen und suchen Sie für jedes Intervall die Maximal-, Min-, Start- und Endwerte.
  - *max* - Spleißen Sie den gesamten Zeitbereich in kleinen Intervallen und suchen Sie für jedes Intervall den Maximalwert und verwenden Sie ihn für dieses Intervall (Nullen werden ignoriert).
  - *min* - Gleich wie max, aber minimaler Wert.
  - *Durchschnitt* - Wie Max, jedoch Durchschnittswert.
  - *total* - Wie Max, aber Gesamtwert berechnen.
  - *count* - Gleich wie max, aber Anzahl der Werte berechnen (Nullwerte werden berechnet).
  - *keine* - überhaupt keine Aggregation. Nur Rohwerte in einem bestimmten Zeitraum.

Der erste und der letzte Punkt werden für Aggregationen berechnet, mit Ausnahme der Aggregation "keine".
Wenn Sie manuell eine Aggregation anfordern, sollten Sie die ersten und letzten Werte ignorieren, da sie aus Werten außerhalb des Zeitraums berechnet werden.

## StoreState
Wenn Sie andere Daten in die InfluxDB schreiben möchten, können Sie die eingebaute Systemfunktion **storeState** verwenden.
Diese Funktion kann auch zum Konvertieren von Daten von anderen History-Adaptern wie History oder SQL verwendet werden.

Die angegebenen IDs werden nicht gegen die ioBroker-Datenbank geprüft und müssen dort nicht eingerichtet werden, sondern können nur direkt aufgerufen werden.

Die Nachricht kann eines der folgenden drei Formate haben:

* eine ID und ein Zustandsobjekt
* eine ID und ein Array von Statusobjekten
* Array mit mehreren IDs mit Statusobjekten

## History Logging Management über Javascript
Der Adapter unterstützt das Aktivieren und Deaktivieren der Protokollierung über JavaScript sowie das Abrufen der Liste der aktivierten Datenpunkte mit ihren Einstellungen.

### Aktivieren
Für die Nachricht muss die "id" des Datenpunkts vorhanden sein. Zusätzliche optionale "Optionen" zur Definition der datenpunktspezifischen Einstellungen

```
sendTo('history.0', 'enableHistory', {
    id: 'system.adapter.history.0.memRss',
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
sendTo('history.0', 'disableHistory', {
    id: 'system.adapter.history.0.memRss',
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
sendTo('history.0', 'getEnabledDPs', {}, function (result) {
    //result is object like:
    {
        "system.adapter.history.0.memRss": {
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

## Datenkonverter
### Grund Idee
Wenn Sie im Laufe der Zeit mehr Daten haben, ist der Verlaufsadapter möglicherweise nicht die beste Wahl und eine echte Datenbank ist besser. Hierfür gibt es zwei weitere History-Adapter für SQL-Datenbanken (PostgreSQL, MS-SQL, MySQL, SQLite) und InfluxDB.
Mit dieser Änderung wird die Frage gestellt, wie die gesammelten Daten aus der Vergangenheit in diese neuen Adapter konvertiert werden können.

Zu diesem Zweck wurden einige Konverter-Skripts erstellt, die helfen und die Arbeit erledigen können. Diese Skripts werden von der Befehlszeile aus aufgerufen.

### Bereiten Sie vorhandene Daten im Übertragungsziel vor und analysieren Sie sie
Bei der Konvertierung von Daten sollten nur die Daten übertragen werden, die noch nicht vorhanden sind. Zu diesem Zweck existiert der erste Satz von Skripten mit dem Namen **analysis <db> .js** Dieses Skript sollte zu Beginn einmal aufgerufen werden, um Daten für vorhandene Daten zu sammeln und diese in lokalen .json-Dateien zu speichern, die vom Real Converter-Skript verwendet werden.
Es werden zwei Arten von Daten erfasst:

- **frühester Wert für Datenpunkt-ID** Der Zeitstempel des allerersten Eintrags für jeden vorhandenen Datenpunkt wird gespeichert und von importiert verwendet, um standardmäßig alle neueren Werte zu ignorieren. Es wird davon ausgegangen, dass die Daten ab diesem ersten Eintrag vollständig gefüllt sind und alle früheren Werte andernfalls doppelt vorhanden wären. Diese Annahme kann beim Import durch Parameter überschrieben werden.
- **vorhandene Werte pro Tag pro Datenpunkt-ID** Die vorhandenen Daten werden täglich analysiert und jeder Tag wird dort gespeichert, wo bereits Daten vorhanden sind. Dies kann als Alternative zu den ersten Daten verwendet werden, um auch "Löcher" in den Daten füllen zu können.

#### Analysisinflux.js
Die Datei analysisinflux.js befindet sich im Verzeichnis "converter".
Dieses Skript erfasst die oben genannten Daten für eine InfluxDB-Instanz.

** Verwendung **: nodejs analysisinflux.js [<InfluxDB-Instanz>] [<Loglevel>] [--deepAnalyze] ** Beispiel **: nodejs analysisinflux.js influxdb.0 info --deepAnalyze

Parameter:

- **<InfluxDB-Instanz>** Welche Influxdb-Adapter-Instanz soll verwendet werden? (Standardeinstellung: influxdb.0) Wenn gesetzt, muss der erste Parameter hinter dem Skriptnamen stehen.
- **<Loglevel>** Loglevel für die Ausgabe (Standard: info). Wenn gesetzt, muss der zweite Parameter hinter dem Skriptnamen stehen.
- **- deepAnalyze** Sammelt auch die vorhandenen Werte pro Tag, standardmäßig wird nur der früheste Wert abgefragt.

Das Skript generiert dann eine oder drei .json-Dateien mit den gesammelten Daten. Diese Dateien werden dann vom realen Konverter-Skript verwendet.

#### Analysisql.js
Die analysisql.js finden Sie im Verzeichnis "converter".
Dieses Skript erfasst Teile der oben genannten Daten für eine SQL-Instanz.

** Verwendung **: nodejs analysisql.js [<SQL-Instanz>] [<Loglevel>] ** Beispiel **: nodejs analysisql.js sql.0 info

Parameter:

- **<SQL-Instanz>** Welche SQL-Adapter-Instanz soll verwendet werden? (Standardeinstellung: sql.0) Wenn gesetzt, muss der erste Parameter hinter dem Skriptnamen stehen.
- **<Loglevel>** Loglevel für die Ausgabe (Standard: info). Wenn gesetzt, muss der zweite Parameter hinter dem Skriptnamen stehen.

Das Skript generiert dann zwei .json-Dateien mit den gesammelten Daten. Diese Dateien werden dann vom realen Konverter-Skript verwendet.
Derzeit kann --processNonExistingValuesOnly for converter script nicht verwendet werden, da die Daten nicht erfasst werden.

### Konvertieren Sie History-Daten in eine DB
Die history2db.js befindet sich im Verzeichnis "converter".

Das Skript verwendet die generierten JSON-Dateien vom History-Adapter auf der Festplatte direkt, um sie in die Datenbank zu übertragen.
Außerdem werden die bereits generierten Datendateien für bereits vorhandene Werte in der Ziel-DB verwendet, um nur nicht vorhandene Daten zu konvertieren.

Das Skript kann ohne jeden Analyseschritt ausgeführt werden, dann müssen Sie die Startdaten als Parameter festlegen und es wird einfach alles von diesem Zeitpunkt zeitlich rückwärts konvertieren.
Wenn Sie zuvor eine Analyse ausgeführt haben und die älteste DBValues.json-Datei vorhanden ist, werden nur diese Datenpunkte konvertiert, sofern Sie diese nicht mit Parametern ändern.
Wenn zuvor eine Analyse ausgeführt wurde und die Datendateien verwendet werden, werden sie auch mit allen konvertierten Daten aktualisiert, sodass bei einem zweiten Durchlauf normalerweise keine Duplikate erzeugt werden.
Um die Daten zurückzusetzen, löschen Sie die Dateien "earliestDBValues.json", "existsDBValues.json" und / oder "existsDBTypes.json".

Der Konverter durchläuft dann in der Zeit alle verfügbaren Tage rückwärts und bestimmt, welche Daten an InfluxDB übertragen werden.

Wenn Sie den Vorgang abbrechen möchten, drücken Sie "x" oder "<STRG-C>" und der Konverter bricht nach der aktuellen Datei ab.

Das Konvertierungsskript selbst sollte mit allen History-Adaptern funktionieren, die "storeState" -Methoden unterstützen.

Hinweis: Die Migration vieler Daten führt zu einer gewissen Belastung des Systems, insbesondere wenn die Konverter- und Zieldatenbankinstanz auf demselben Computer ausgeführt wird. Überwachen Sie die Last und Leistung Ihres Systems während der Aktion und verwenden Sie möglicherweise den Parameter "delayMultiplicator", um die Verzögerungen im Konverter zu erhöhen.

** Verwendung: ** nodejs history2influx.js DB-Instance [Loglevel] [Startdatum | 0] [Pfad-zu-Daten] [delayMultiplicator] [--logChangesOnly [relog-Interval (m)]] [- -ignoreExistingDBValues] [--processNonExistingValuesOnly] [--processAllDPs] [--simulate] ** Beispiel **: nodejs history2influx.js influxdb.0 info 20161001 / path / to / data 2 --logChangesOnly 30 --processNonExevalOnly

Mögliche Optionen und Parameter:

- **DB-Instanz** DB-Instanz zum Senden der Daten an den erforderlichen Parameter. Muss der erste Parameter nach dem Skriptnamen sein.
- **Loglevel** Loglevel für die Ausgabe (Standard: info). Wenn gesetzt, muss der zweite Parameter hinter dem Skriptnamen stehen.
- **Startdatum** Tag, an dem im Format yyyymmdd (z. B. 20161028) begonnen werden soll. Verwenden Sie "0", um erkannte früheste Werte zu verwenden. Wenn gesetzt, muss der dritte Parameter hinter dem Skriptnamen stehen.
- **Pfad zu Daten** Pfad zu den Datendateien. Definiert das iobroker-Installationsverzeichnis / iobroker-data / history-data. Wenn gesetzt, muss der vierte Parameter hinter dem Skriptnamen stehen.
- **<delayMultiplicator>** Ändern Sie die Verzögerungen zwischen mehreren Aktionen im Skript durch einen Multiplikator. "2" würde bedeuten, dass die Verzögerungen, die der Konvertierte von sich aus berechnet hatte, verdoppelt wurden. Wenn gesetzt, muss der fünfte Parameter hinter dem Skriptnamen stehen.
- **- logChangesOnly [relog-Interval (m)]** Wenn --logChangesOnly gesetzt ist, werden die Daten analysiert und reduziert, sodass nur geänderte Werte in InfluxDB gespeichert werden. Zusätzlich kann ein "relog-Intervall (s)" in Minuten eingestellt werden, um nach diesem Intervall unveränderte Werte erneut zu protokollieren.
- **- ignoreExistingDBValues** Mit diesem Parameter werden alle vorhandenen Daten ignoriert und alle Daten in die DB eingefügt. Bitte stellen Sie sicher, dass keine Duplikate generiert werden. Diese Option ist nützlich, um "Löcher" in den Daten zu beheben, bei denen einige Daten fehlen. Standardmäßig werden nur alle Datenpunkte mit mindestens einem Eintrag in der DB gefüllt. Dies kann durch --processAllDPs überschrieben werden
- **- processNonExistingValuesOnly** Mit diesem Parameter wird die Datei "Vorhandene Datenpunkte nach Tag" aus dem Analyseskript für jeden Tag und Datenpunkt verwendet und geprüft. In diesem Modus werden die vorhandenen DB-Werte immer ignoriert und auch nicht aktualisiert. Führen Sie nach diesem Modus eine weitere Analyse durch !!!
- **- processAllDPs** Mit diesem Parameter stellen Sie sicher, dass alle vorhandenen Datenpunkte aus den History-Dateien in die DB übernommen werden, auch wenn diese in dieser DB noch nicht vorhanden sind.
- **- simulate** Mit diesem Parameter aktivieren Sie den Simulationsmodus. Dies bedeutet, dass kein Schreibvorgang stattfindet und auch die Analysedateien beim Beenden nicht aktualisiert werden.

## Changelog
### 1.8.5 (2018-07-02)
* (Apollon77) Error fixed in storeState

### 1.8.4 (2018-06-24)
* (Apollon77) Fixing/allow to disable writing of start and end values

### 1.8.0 (2018-06-19/24)
* (Apollon77) Add option to write data to a different ID to make device changes easier. Retrieving data works for both IDs

### 1.7.4 (2018-04-03)
* (AlCalzone) Fix filename handling for states with special characters

### 1.7.3 (2018-03-28)
* (Apollon77) Respect 'keep forever' setting for retention from datapoint configuration

### 1.7.2 (2018-02-05)
* (bondrogeen) Admin3 Fixes

### 1.7.1 (2018-01-31)
* (Bluefox) Admin3 Fixes

### 1.7.0 (2018-01-17)
* (bluefox) Ready for Admin3

### 1.6.6 (2017-12-20)
* (bluefox) translations

### 1.6.5 (2017-10-05)
* (Apollon77) fix relog value feature

### 1.6.4 (2017-08-12)
* (bluefox) add "save last value" option

### 1.6.3 (2017-08-03)
* (Apollon77) fix behaviour of log interval to always log the current value

### 1.6.2 (2017-04-07)
* fix in datatype conversions

### 1.6.0 (2017-02-28)
* (Apollon77) Replace some characters in history filenames

### 1.5.3 (2017-02-22)
* (Apollon77) Small fix for older configurations

### 1.5.2
* (Apollon77) Enhance Min-Delta logic for datapoints from type mixed

### 1.5.1 (2017-01-16)
* (bluefox) Fix handling of float values in Adapter config and Datapoint config.

### 1.5.0 (2016-12-01)
* (Apollon77) Add messages enableHistory/disableHistory
* (Apollon77) add support to log changes only if value differs a minimum value for numbers
* (Apollon77) Fixing aggregate calculation

### 1.4.0 (2016-10-29)
* (Apollon77) add option to re-log unchanged values to make it easier for visualization
* (Apollon77) added converter scripts to move history data to db

### 1.3.1 (2016-09-25)
* (Apollon77) Fixed: ts is assigned as val
* (bluefox) Fix selector for history objects

### 1.3.0 (2016-08-30)
* (bluefox) сompatible only with new admin

### 1.2.0 (2016-08-27)
* (bluefox) change name of object from history to custom

### 1.1.0 (2016-08-27)
* (bluefox) fix aggregation of last point
* (bluefox) aggregation none just deliver the raw data without any aggregation

### 1.0.5 (2016-07-24)
* (bluefox) fix aggregation on large intervals

### 1.0.4 (2016-07-05)
* (bluefox) fix aggregation on seconds

### 1.0.3 (2016-05-31)
* (bluefox) draw line to the end if ignore null

### 1.0.2 (2016-05-29)
* (bluefox) switch max and min with each other

### 1.0.1 (2016-05-28)
* (bluefox) calculate end/start values for "on change" too

### 1.0.0 (2016-05-20)
* (bluefox) change default aggregation name

### 0.4.1 (2016-05-14)
* (bluefox) support sessionId

### 0.4.0 (2016-05-05)
* (bluefox) use aggregation file from sql adapter
* (bluefox) fix the values storage on exit
* (bluefox) store all cached data every 5 minutes
* (bluefox) support of ms

### 0.2.1 (2015-12-14)
* (bluefox) add description of settings
* (bluefox) place aggregate function into separate file to enable sharing with other adapters
* (smiling-Jack) Add generate Demo data
* (smiling-Jack) get history in own fork
* (bluefox) add storeAck flag
* (bluefox) mockup for onchange

### 0.2.0 (2015-11-15)
* (Smiling_Jack) save and load in adapter and not in js-controller
* (Smiling_Jack) aggregation of data points
* (Smiling_Jack) support of storage path

### 0.1.3 (2015-02-19)
* (bluefox) fix small error in history (Thanks on Dschaedl)
* (bluefox) update admin page

### 0.1.2 (2015-01-20)
* (bluefox) enable save&close button by config

### 0.1.1 (2015-01-10)
* (bluefox) check if state was not deleted

### 0.1.0 (2015-01-02)
* (bluefox) enable npm install

### 0.0.8 (2014-12-25)
* (bluefox) support of de-bounce interval

### 0.0.7 (2014-11-01)
* (bluefox) store every change and not only lc != ts

### 0.0.6 (2014-10-19)
* (bluefox) add configuration page

## License

The MIT License (MIT)

Copyright (c) 2014-2018 Bluefox <dogafox@gmail.com>, Apollon77

Copyright (c) 2016 Smiling_Jack

Copyright (c) 2014 hobbyquaker

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