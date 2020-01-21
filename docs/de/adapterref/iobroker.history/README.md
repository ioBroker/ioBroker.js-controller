---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.history/README.md
title: ioBroker.history
hash: tq/r3S9OFXNtKGix4J0p/oLPOqHRXYBNGN6tSjVtauI=
---
![Logo](../../../en/adapterref/iobroker.history/admin/history.png)

![Anzahl der Installationen](http://iobroker.live/badges/history-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.history.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.history.svg)
![Tests](http://img.shields.io/travis/ioBroker/ioBroker.history/master.svg)
![NPM](https://nodei.co/npm/iobroker.history.png?downloads=true)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/ioBroker/ioBroker.history.svg)

# IoBroker.history
Dieser Adapter speichert den Statusverlauf in einem zweistufigen Prozess.
Zunächst werden Datenpunkte im RAM gespeichert, sobald sie die maximale Länge erreichen, werden sie auf der Festplatte gespeichert.

Um einige zu speichernde Datenpunkte einzurichten, müssen sie auf der Registerkarte "Objekte" des Administrators (letzte Schaltfläche) konfiguriert werden.

Um Karten zu aktivieren, müssen Sie den **flot** Adapter installieren.

## Die Einstellungen
- **Speicherverzeichnis** - Pfad zum Verzeichnis, in dem die Dateien gespeichert werden. Dies kann relativ zu "iobroker-data" oder absolut erfolgen, wie "/ mnt / history" oder "D: / history".
- **Maximale Anzahl der im RAM gespeicherten Werte** - Nach Erreichen dieser Anzahl von Werten im RAM werden sie auf der Festplatte gespeichert.
- **Ursprung des Wertes speichern** - Wenn "von" Feld wird auch gespeichert. Kann Platz auf der Festplatte speichern.
- **Entprellintervall** - Schutz gegen zu häufige Änderungen eines Wertes und definierte die Zeit in ms, in der nach einer Wertänderung andere Änderungen nicht protokolliert werden
- **Aufbewahrung des Speichers** - Wie viele Werte in der Vergangenheit werden auf der Festplatte gespeichert.
- **Unveränderte Werte (n) protokollieren** - Bei Verwendung von "nur Änderungen protokollieren" können Sie hier ein Zeitintervall in Sekunden einstellen, nach dem auch unveränderte Werte in den DB zurückprotokolliert werden

Die meisten dieser Werte sind in den Detaileinstellungen für den Datenpunkt bereits eingetragen und können dort geändert werden. Zusätzlich können Sie auf der Datenpunktseite eine "Alias-ID" eintragen. Mit diesem können Sie z. Nach dem Umschalten eines Geräts und der Änderung von Datenpunktnamen werden die Daten weiterhin in die frühere ID protokolliert, indem nur diese ID dort eingegeben wird. Alle Daten werden als diese protokolliert.

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

- **start** - (optional) Zeit in ms - *new Date (). getTime ()* '
- **end** - (optional) Zeit in ms - *new Date (). getTime ()* ', standardmäßig (jetzt + 5000 Sekunden)
- **Schritt** - (optional) wird in aggregierten Schritten (m4, max, min, Durchschnitt, gesamt) in ms-Intervallen verwendet
- **count** - Anzahl der Werte, wenn das Aggregat 'onchange' ist, oder Anzahl der Intervalle, wenn eine andere Aggregatmethode verwendet wird. Count wird ignoriert, wenn step gesetzt ist.
- **von** - wenn das Feld *von* in der Antwort enthalten sein soll
- **ack** - wenn das *ack* -Feld in der Antwort enthalten sein soll
- **q** - wenn das Feld *q* in der Antwort enthalten sein soll
- **addId** - wenn das Feld *id* in der Antwort enthalten sein soll
- **limit** - Gebe nicht mehr Einträge als limit zurück
- **ignoreNull** - wenn Nullwerte enthalten sein sollen (false), ersetzt durch den letzten Nicht-Nullwert (true) oder ersetzt durch 0 (0)
- **aggregate** - aggregate method:
  - *minmax* - verwendeter spezieller Algorithmus. Splice den gesamten Zeitbereich in kleinen Intervallen und finde für jedes Intervall Max-, Min-, Start- und Endwerte.
  - *max* - Splice den gesamten Zeitbereich in kleinen Intervallen und finde für jedes Intervall den Maximalwert und verwende ihn für dieses Intervall (Nullen werden ignoriert).
  - *min* - Wie max, aber mit minimalem Wert.
  - *Average* - Wie Max, aber Durchschnittswert nehmen.
  - *total* - Wie max, aber Gesamtwert berechnen.
  - *count* - Wie "max", aber Anzahl der Werte berechnen (Nullen werden berechnet).
  - *keine* - Überhaupt keine Aggregation. Nur Rohwerte im angegebenen Zeitraum.

Der erste und der letzte Punkt werden für Aggregationen berechnet, mit Ausnahme der Aggregation "keine".
Wenn Sie manuell eine Aggregation anfordern, sollten Sie den ersten und den letzten Wert ignorieren, da diese aus Werten außerhalb des Zeitraums berechnet werden.

## StoreState
Wenn Sie andere Daten in die InfluxDB schreiben möchten, können Sie die eingebaute Systemfunktion **storeState** verwenden.
Diese Funktion kann auch zum Konvertieren von Daten aus anderen Verlaufsadaptern wie Verlauf oder SQL verwendet werden.

Die angegebenen IDs werden nicht mit der ioBroker-Datenbank abgeglichen und müssen dort nicht eingerichtet werden, sondern sind nur direkt zugänglich.

Die Nachricht kann eines der folgenden drei Formate haben:

* eine ID und ein Statusobjekt
* Eine ID und ein Array von Statusobjekten
* Array von mehreren IDs mit Statusobjekten

## History Logging Management über Javascript
Der Adapter unterstützt das Aktivieren und Deaktivieren der Verlaufsprotokollierung über JavaScript sowie das Abrufen der Liste der aktivierten Datenpunkte mit ihren Einstellungen.

### Aktivieren
Für die Nachricht muss die "ID" des Datenpunkts angegeben werden. Zusätzliche optionale "Optionen" zum Definieren der Datenpunkt-spezifischen Einstellungen:

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
Für die Nachricht muss die "ID" des Datenpunkts angegeben werden.

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

### Liste holen
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
Wenn Sie im Laufe der Zeit mehr Daten haben, ist der Verlaufsadapter möglicherweise nicht die beste Wahl, und eine echte Datenbank ist besser. Hierfür gibt es zwei weitere History-Adapter für SQL-Datenbanken (PostgreSQL, MS-SQL, MySQL, SQLite) und InfluxDB.
Mit dieser Änderung stellt sich die Frage, wie die gesammelten Daten aus der Vergangenheit in diese neuen Adapter konvertiert werden sollen.

Hierfür wurden einige Konverterskripte vorbereitet, die helfen und die Arbeit erledigen können. Diese Skripte werden über die Befehlszeile aufgerufen.

### Bereiten Sie vorhandene Daten im Übertragungsziel vor und analysieren Sie sie
Beim Konvertieren von Daten sollten nur die Daten übertragen werden, die noch nicht vorhanden sind. Daher gibt es die erste Gruppe von Skripten mit dem Namen **analyse <db> .js** Dieses Skript sollte zu Beginn einmal aufgerufen werden, um einige Daten für vorhandene Daten zu erfassen und in lokalen .json-Dateien zu speichern, die vom echten Konverterskript verwendet werden sollen.
Es werden zwei Arten von Daten gesammelt:

- **frühester Wert für Datenpunkt-ID** Der Zeitstempel des allerersten Eintrags für jeden vorhandenen Datenpunkt wird gespeichert und beim Importieren verwendet, um standardmäßig alle neueren Werte zu ignorieren. Es wird davon ausgegangen, dass die Daten ab diesem ersten Eintrag vollständig ausgefüllt sind und alle früheren Werte ansonsten dupliziert würden. Diese Annahme kann beim Import durch Parameter überschrieben werden.
- **vorhandene Werte pro Tag pro Datenpunkt-ID** Die vorhandenen Daten werden pro Tag analysiert und an jedem Tag, an dem bereits Daten vorhanden sind, gespeichert. Dies kann alternativ zu den ersten Daten verwendet werden, um auch "Löcher" in die Daten füllen zu können.

#### Analyseinflux.js
Die Datei analyseinflux.js befindet sich im Verzeichnis "converter".
Dieses Skript sammelt die oben genannten Daten für eine InfluxDB-Instanz.

** Verwendung **: nodejs analyseinflux.js [<InfluxDB-Instance>] [<Loglevel>] [--deepAnalyze] ** Beispiel **: nodejs analyseinflux.js influxdb.0 info --deepAnalyze

Parameter:

- **<InfluxDB-Instanz>** Welche influxdb-Adapter-Instanz soll verwendet werden? (Standard: influxdb.0) Wenn set der erste Parameter nach dem Skriptnamen sein muss.
- **<Loglevel>** Loglevel für die Ausgabe (Standard: info). Wenn gesetzt muss der zweite Parameter nach dem Skriptnamen stehen.
- **- deepAnalyze** sammelt auch die vorhandenen Werte pro Tag, standardmäßig wird nur der früheste Wert abgefragt.

Das Skript generiert dann eine oder drei .json-Dateien mit den gesammelten Daten. Diese Dateien werden dann vom eigentlichen Konverterskript verwendet.

#### Analysesql.js
Die analysesql.js finden Sie im Verzeichnis "converter".
Dieses Skript sammelt Teile der oben genannten Daten für eine SQL-Instanz.

** Verwendung **: nodejs analysesql.js [<SQL-Instanz>] [<Loglevel>] ** Beispiel **: nodejs analysesql.js sql.0 info

Parameter:

- **<SQL-Instanz>** Welche SQL-Adapter-Instanz soll verwendet werden? (Standard: sql.0) Wenn set der erste Parameter nach dem Skriptnamen sein muss.
- **<Loglevel>** Loglevel für die Ausgabe (Standard: info). Wenn gesetzt muss der zweite Parameter nach dem Skriptnamen stehen.

Das Skript generiert dann zwei .json-Dateien mit den gesammelten Daten. Diese Dateien werden dann vom eigentlichen Konverterskript verwendet.
Derzeit kann --processNonExistingValuesOnly für das Konverterskript nicht verwendet werden, da die Daten nicht erfasst werden.

### History-Daten in einen DB konvertieren
Die history2db.js finden Sie im Verzeichnis "converter".

Das Skript verwendet direkt die generierten JSON-Dateien vom Verlaufsadapter auf der Festplatte, um sie in die Datenbank zu übertragen.
Außerdem werden die vorgenerierten Datendateien für bereits vorhandene Werte in der Ziel-DB verwendet, um nur nicht vorhandene Daten zu konvertieren.

Das Skript kann ohne vorherigen Analyseschritt ausgeführt werden. Dann müssen Sie die Startdaten als Parameter festlegen und es konvertiert einfach alles von diesem Zeitpunkt zurück in die Zeit.
Wenn Sie zuvor eine Analyse ausgeführt haben und die Datei earliestDBValues.json vorhanden ist, werden nur diese Datenpunkte konvertiert, es sei denn, Sie verwenden Parameter, um dies zu ändern.
Wenn zuvor eine Analyse ausgeführt wurde und die Datendateien verwendet werden, werden sie auch mit allen konvertierten Daten aktualisiert, sodass bei einer zweiten Ausführung normalerweise keine Duplikate generiert werden.
Um die Daten zurückzusetzen, löschen Sie die Datei "earliestDBValues.json", "existingDBValues.json" und / oder "existingDBTypes.json".

Der Konverter durchläuft dann alle als Daten verfügbaren Tage in der Zeit rückwärts und bestimmt, welche Daten an InfluxDB übertragen werden sollen.

Wenn Sie den Vorgang abbrechen möchten, drücken Sie "x" oder "<STRG-C>" und der Konverter bricht nach der aktuellen Datendatei ab.

Das Konverterskript selbst sollte mit allen Verlaufsadaptern funktionieren, die "storeState" -Methoden unterstützen.

Hinweis: Die Migration vieler Daten führt zu einer bestimmten Systemlast, insbesondere wenn Konverter und Zieldatenbankinstanz auf demselben Computer ausgeführt werden. Überwachen Sie die Auslastung und Leistung Ihres Systems während der Aktion und verwenden Sie möglicherweise den Parameter "delayMultiplicator", um die Verzögerungen im Konverter zu erhöhen.

** Verwendung: ** nodejs history2influx.js DB-Instanz [Loglevel] [Startdatum | 0] [Pfad-zu-Daten] [delayMultiplicator] [--logChangesOnly [relog-Interval (m)] [- -ignoreExistingDBValues] [--processNonExistingValuesOnly] [--processAllDPs] [--simulate] ** Beispiel **: nodejs history2influx.js influxdb.0 info 20161001 / path / to / data 2 --logChangesOnly 30 --processNonExistingValuesOnly

Mögliche Optionen und Parameter:

- **DB-Instanz** DB-Instanz zum Senden der Daten an den erforderlichen Parameter. Muss der erste Parameter nach dem Skriptnamen sein.
- **Loglevel** Loglevel für die Ausgabe (Default: info). Wenn gesetzt muss der zweite Parameter nach dem Skriptnamen stehen.
- **Startdatum** Starttag im Format JJJJMTT (z. B. 20161028). Verwenden Sie "0", um erkannte früheste Werte zu verwenden. Wenn gesetzt, muss der dritte Parameter nach dem Skriptnamen stehen.
- **Pfad zu Daten** Pfad zu den Datendateien. Standardmäßig in das iobroker-Installationsverzeichnis / iobroker-data / history-data. Wenn gesetzt, muss der vierte Parameter nach dem Skriptnamen stehen.
- **<delayMultiplicator>** Ändern Sie die Verzögerungen zwischen mehreren Aktionen im Skript durch einen Multiplikator. "2" würde bedeuten, dass sich die Verzögerungen verdoppeln, die der Konvertierte selbst berechnet hat. Wenn gesetzt, muss der fünfte Parameter nach dem Skriptnamen stehen.
- **- logChangesOnly [relog-Interval (m)]** Wenn --logChangesOnly gesetzt ist, werden die Daten analysiert und reduziert, so dass nur geänderte Werte in InfluxDB gespeichert werden. Zusätzlich kann ein "Relog-Intervall (e)" in Minuten eingestellt werden, um unveränderte Werte nach diesem Intervall neu zu protokollieren.
- **- ignoreExistingDBValues** Mit diesem Parameter werden alle vorhandenen Daten ignoriert und alle Daten in den DB eingefügt. Bitte stellen Sie sicher, dass keine Duplikate generiert werden. Diese Option ist nützlich, um "Löcher" in den Daten zu beheben, in denen einige Daten fehlen. Standardmäßig werden nur alle Datenpunkte mit mindestens einem Eintrag in der Datenbank gefüllt. Dies kann von --processAllDPs überschrieben werden
- **- processNonExistingValuesOnly** Mit diesem Parameter wird die Datei "Vorhandene Datenpunkte nach Tag" aus dem Analyseskript verwendet und für jeden Tag und Datenpunkt geprüft. In diesem Modus werden die vorhandenen DB-Werte immer ignoriert und auch nicht aktualisiert. Bitte führen Sie einen weiteren Analyselauf durch, nachdem Sie diesen Modus verwendet haben !!!
- **- processAllDPs** Mit diesem Parameter stellen Sie sicher, dass alle vorhandenen Datenpunkte aus den History-Dateien in den DB übertragen werden, auch wenn diese in diesem DB noch nicht vorhanden sind.
- **- simulieren** Mit diesem Parameter aktivieren Sie den Simulationsmodus, dh es findet kein richtiges Schreiben statt und auch die Analysedatendateien werden beim Beenden nicht aktualisiert.

## 1.9.0 (2020-01-16)
* (foxriver76) hat die Verwendung von adapter.objects entfernt
* __erfordert js-controller> = 2.0.0__

### 1.8.7 (2019-09-02)
* (paul53) alte Dateien sollten automatisch gelöscht werden

### 1.8.6
* Behebung einiger kleinerer Probleme und Optimierung einiger Texte

### 1.8.5 (2018-07-02)
* (Apollon77) Fehler in storeState behoben

### 1.8.4 (2018-06-24)
* (Apollon77) Beheben / Deaktivieren des Schreibens von Start- und Endwerten

### 1.8.0 (2018-06-19 / 24)
* (Apollon77) Option zum Schreiben von Daten auf eine andere ID, um Geräteänderungen zu vereinfachen. Das Abrufen von Daten funktioniert für beide IDs

### 1.7.4 (2018-04-03)
* (AlCalzone) Die Behandlung von Dateinamen für Zustände mit Sonderzeichen wurde korrigiert

### 1.7.3 (2018-03-28)
* (Apollon77) Respektieren Sie die Einstellung "Für immer behalten", um die Datenpunktkonfiguration beizubehalten

### 1.7.2 (2018-02-05)
* (bondrogeen) Admin3-Korrekturen

### 1.7.1 (2018-01-31)
* (Bluefox) Admin3-Korrekturen

### 1.7.0 (17.01.2018)
* (bluefox) Bereit für Admin3

### 1.6.6 (2017-12-20)
* (Bluefox) Übersetzungen

### 1.6.5 (2017-10-05)
* (Apollon77) Funktion zum Fixieren von Relog-Werten

### 1.6.4 (2017-08-12)
* (bluefox) Option "letzten Wert speichern" hinzufügen

### 1.6.3 (2017-08-03)
* (Apollon77) Behobenes Verhalten des Protokollintervalls, um immer den aktuellen Wert zu protokollieren

### 1.6.2 (2017-04-07)
* Fix bei Datentypkonvertierungen

### 1.6.0 (28.02.2017)
* (Apollon77) Ersetzen Sie einige Zeichen in den Dateinamen des Verlaufs

### 1.5.3 (2017-02-22)
* (Apollon77) Kleiner Fix für ältere Konfigurationen

### 1.5.2
* (Apollon77) Verbesserung der Min-Delta-Logik für Datenpunkte vom Typ gemischt

### 1.5.1 (2017-01-16)
* (bluefox) Fehlerbehebung beim Umgang mit Float-Werten in der Adapterkonfiguration und in der Datenpunktkonfiguration.

### 1.5.0 (01.12.2016)
* (Apollon77) Nachrichten hinzufügen enableHistory / disableHistory
* (Apollon77) Unterstützung für das Protokollieren von Änderungen nur dann hinzufügen, wenn der Wert von einem Mindestwert für Zahlen abweicht
* (Apollon77) Berechnung des Fixing-Aggregats

### 1.4.0 (29.10.2016)
* (Apollon77) Option hinzufügen, um unveränderte Werte neu zu protokollieren, um die Visualisierung zu vereinfachen
* (Apollon77) hat Konverterskripte hinzugefügt, um Verlaufsdaten nach db zu verschieben

### 1.3.1 (25.09.2016)
* (Apollon77) Behoben: ts wird als Wert zugewiesen
* (bluefox) Fix Selector für Verlaufsobjekte

### 1.3.0 (30.08.2016)
* (Bluefox) Kompatibel nur mit neuen Admin

### 1.2.0 (27.08.2016)
* (bluefox) Ändere den Namen des Objekts von "history" in "custom"

### 1.1.0 (27.08.2016)
* (bluefox) fixe Aggregation des letzten Punktes
* (bluefox) aggregation none liefert nur die Rohdaten ohne Aggregation

### 1.0.5 (24.07.2016)
* (Bluefox) Fix Aggregation in großen Intervallen

### 1.0.4 (05.07.2016)
* (Bluefox) Fix Aggregation in Sekunden

### 1.0.3 (2016-05-31)
* (bluefox) Ziehe eine Linie bis zum Ende, wenn du null ignorierst

### 1.0.2 (29.05.2016)
* (bluefox) wechselt zwischen max und min

### 1.0.1 (28.05.2016)
* (bluefox) berechnet auch End- / Startwerte für "on change"

### 1.0.0 (2016-05-20)
* (bluefox) Ändert den Standardnamen der Aggregation

### 0.4.1 (2016-05-14)
* (bluefox) support sessionId

### 0.4.0 (05.05.2016)
* (bluefox) Aggregationsdatei vom SQL-Adapter verwenden
* (bluefox) korrigiert den Wertespeicher beim Beenden
* (bluefox) speichert alle 5 Minuten alle zwischengespeicherten Daten
* (Bluefox) Unterstützung von ms

### 0.2.1 (14.12.2015)
* (bluefox) Beschreibung der Einstellungen hinzufügen
* (bluefox) Platzieren Sie die Aggregatfunktion in einer separaten Datei, um sie für andere Adapter freizugeben
* (lächelnder Jack) Hinzufügen Demo-Daten generieren
* (lächelnd-Jack) bekommen Geschichte in der eigenen Gabel
* (bluefox) storeAck-Flag hinzufügen
* (Bluefox) Modell für onchange

### 0.2.0 (2015-11-15)
* (Smiling_Jack) Speichern und Laden im Adapter und nicht im js-controller
* (Smiling_Jack) Aggregation von Datenpunkten
* (Smiling_Jack) Unterstützung des Speicherpfads

### 0.1.3 (19.02.2015)
* (bluefox) behebe einen kleinen Fehler in der Geschichte (Danke an Dschaedl)
* (Bluefox) Update Admin-Seite

### 0.1.2 (20.01.2015)
* (bluefox) speichere & schließe Button per config

### 0.1.1 (10.01.2015)
* (Bluefox) Überprüfen Sie, ob der Status nicht gelöscht wurde

### 0.1.0 (2015-01-02)
* (bluefox) aktiviere npm install

### 0.0.8 (25.12.2014)
* (Bluefox) Unterstützung des De-Bounce-Intervalls

### 0.0.7 (2014-11-01)
* (bluefox) speichere jede Änderung und nicht nur lc! = ts

### 0.0.6 (19.10.2014)
* (bluefox) Konfigurationsseite hinzufügen

## Changelog

## License

The MIT License (MIT)

Copyright (c) 2014-2020 Bluefox <dogafox@gmail.com>, Apollon77

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