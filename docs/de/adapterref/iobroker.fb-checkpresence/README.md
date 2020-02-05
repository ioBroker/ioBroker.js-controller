---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fb-checkpresence/README.md
title: kein Titel
hash: G+3VyP1KeB3eWta19/yCP3zVMtx6BNH1rOOajZ5zV9g=
---
![Anzahl der Installationen](http://iobroker.live/badges/fb-checkpresence-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.fb-checkpresence.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.fb-checkpresence.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/afuerhoff/iobroker.fb-checkpresence.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence/badge.svg)
![NPM](https://nodei.co/npm/iobroker.fb-checkpresence.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/afuerhoff/ioBroker.fb-checkpresence/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/afuerhoff/ioBroker.fb-checkpresence?branch=master&svg=true)

<h1><img src="admin/fb-checkpresence.png" width="64"/> ioBroker.fb-checkpresence </h1>

## Fb-checkpresence adapter für ioBroker
Der Adapter prüft die Anwesenheit von Familienmitgliedern über die Fritzbox.
Sie müssen den Namen des Familienmitglieds und die Mac-Adresse (oder IP-Adresse) des verwendeten Geräts eingeben.
Der Kommentar ist optional und Sie können das Familienmitglied aktivieren oder deaktivieren.
Der Datenpunkt basiert auf dem Mitgliedsnamen.

### Adaptervoraussetzungen
Für die korrekte Funktion muss ein Verlaufsadapter installiert werden. Sie können einen der folgenden Adapter auswählen:

* Geschichte
* SQL
* InfluxDB

## Gebrauchtes Gerät
Für diesen Adapter wird die AVM Fritzbox verwendet. Hier finden Sie Informationen zur Fritzbox https://avm.de/produkte/fritzbox/.

### Fritzbox Bedingungen
Die verwendete TR-064-Schnittstelle zur Fritzbox ist hier beschrieben: https://avm.de/service/schnittstellen/.
Folgende TR-064-Funktionen werden verwendet:

* GetSpecificHostEntry
* X_AVM-DE_GetSpecificHostEntryByIP (unterstützt ab dem 18.05.2016) -> wird verwendet, um den Status eines Mitglieds über die IP-Adresse zu lesen
* GetHostNumberOfEntries
* X_AVM-DE_GetHostListPath (Unterstützung ab dem 09.01.2017) -> wird für die Mitgliederkonfiguration verwendet
* GetSecurityPort

Standardmäßig ist die TR-064-Schnittstelle nicht aktiviert. Dies kann jedoch problemlos über die FritzBox-Weboberfläche geändert werden. Loggen Sie sich dazu in Ihre FritzBox ein und stellen Sie sicher, dass die Expertenansicht aktiviert ist. Dann finden Sie unter &quot;Heimnetzwerk» Heimnetzwerkübersicht »Netzwerkeinstellungen&quot; den Punkt &quot;Zugriff für Anwendungen erlauben&quot;. Dort musst du die Checkbox aktivieren und dann die FritzBox einmal neu starten. <img src="doc/access_settings_network.JPG"/>

## Konfigurationsdialog
### Fritzbox IP-Adresse, Benutzer und Passwort
Die Konfiguration von IP-Adresse, Benutzer und Passwort ist notwendig, um die Gerätedaten von der Fritzbox zu erhalten.
Das Passwort ist verschlüsselt und wurde nicht im Klartext gespeichert.

### Intervall
Das Intervall kann von 1 bis 59 Minuten konfiguriert werden. Normalerweise ist ein Wert von 1 bis 5 Minuten ein optimales Intervall zum Lesen der Fritzbox-Daten.

### Verlaufsadapter
Über den Historienadapter werden einige Werte berechnet. Sie können wählen, ob der Verlauf, der SQL- oder der Influxdb-Adapter für diese Berechnungen verwendet werden soll. Der Verlaufsadapter muss vorinstalliert werden.

### Datumsformat
Die Optionen für die Datumsformatmaske werden auf dieser Webseite beschrieben: https://www.npmjs.com/package/dateformat.
Die Formatierungsmaske wird zum Formatieren der HTML- und JSON-Tabellenobjekte verwendet.

### Einstellungen für Familienmitglieder
Für ein konfiguriertes Familienmitglied müssen Sie den Namen, die Mac- oder IP-Adresse, einen Kommentar eingeben und ob das Mitglied für die Berechnung aktiviert ist. Für jedes Mitglied erstellt der Adapter Datenobjekte und prüft, ob das Mitglied vorhanden ist oder nicht.

### Whitelist-Einstellungen
In die Whitelist können Sie jedes bekannte Gerät einfügen. Unbekannte Geräte werden im Blacklist-Objekt aufgelistet.
Wenn Sie das Kontrollkästchen in der Überschrift der Tabelle aktivieren, werden alle Geräte ausgewählt.

## Eigenschaften
### Überprüfung der AVM-Unterstützung
Die Funktion prüft die Verfügbarkeit der genutzten Fritzbox-Features. Die Verfügbarkeit wird als Info protokolliert.

### Gäste holen, schwarze Liste
In dieser Funktion wird geprüft, ob ein Benutzer als Gast angemeldet ist. Außerdem wird geprüft, ob ein Gerät nicht in der Whitelist aufgeführt ist.
Diese Geräte werden der Blacklist hinzugefügt.

### Aktiv werden
Für jedes Familienmitglied werden die Anwesenheit, die An- und Abreisedaten und einige andere Informationen berechnet und im Mitgliedsobjekt gespeichert.

### Hostnummer, aktive Geräte
Die Anzahl der Geräte und wie viele aktiv sind, werden von der Fritzbox abgerufen.

## Objekte
### ObjektpräsenzAlle
Wenn alle Familienmitglieder anwesend sind, ist das Objekt wahr.

### Objektpräsenz
Wenn ein Familienmitglied anwesend ist, ist das Objekt wahr.

### Objektgeräte
Dies sind alle in der Fritzbox aufgelisteten Geräte

### Object activeDevices
Dies ist die Anzahl aller aktiven Geräte in der Fritzbox

### Objekt html, json
Bei diesen Objekten handelt es sich um Tabellen (json und html), in denen die eingehenden und ausgehenden Informationen aller Familienmitglieder aufgeführt sind.

### Objektinfo
Hier finden Sie Informationen zum letzten Update und zum Verbindungsstatus des Adapters.

### Objektgast
Hier finden Sie Informationen über die Anzahl der aktiven Gäste und Tabellenobjekte mit den darin enthaltenen Geräteinformationen.

### Objekt Blacklist
Hier finden Sie Informationen über die Anzahl unbekannter Geräte und Tabellenobjekte mit den darin enthaltenen unbekannten Geräteinformationen.

### Objekt member.present
Hier finden Sie Informationen über die Anwesenheit eines Mitglieds am aktuellen Tag und wie lange das Mitglied seit der letzten Änderung den Status wahr hat.

### Objekt member.absent
Hier finden Sie Informationen über die Abwesenheit eines Mitglieds am aktuellen Tag und wie lange das Mitglied seit der letzten Änderung den Status false hatte.

### Objekt member.comming, member.going
Hier finden Sie Informationen, wann das Familienmitglied ankommt oder das Haus verlässt.

### Objekt member.history, member.historyHtml
Hier finden Sie Informationen zur Geschichte des heutigen Tages.

## Changelog

### 0.0.1
* (Achim Fürhoff) initial release
### 0.0.2
* (Achim Fürhoff) optimized features
### 0.0.3
* (Achim Fürhoff) guest feature added
### 0.0.4
* (Achim Fürhoff) calculation error resolved
### 0.0.5
* (Achim Fürhoff) configuration optimized
### 0.0.6
* (Achim Fürhoff) bug in json and html table resolved
### 0.0.7
* (Achim Fürhoff) Fix bug invalid date. Add debug information.
### 0.1.0
* (Achim Fürhoff) Influxdb added, debug information added
### 0.2.0
* (Achim Fürhoff) debug and error information optimized, crypto dependency removed, service check and blacklist added   
### 0.2.1
* (Achim Fürhoff) getGuests issue resolved, lastVal function and debug information optimized   
### 0.2.2
* (Achim Fürhoff) outdated packages updated, documentation changed, 
  history dependency removed, onstate/objectChange removed, scheduler library removed,
  two fixes from publish review

## License
MIT License

Copyright (c) 2019-2020 Achim Fürhoff <achim.fuerhoff@outlook.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.