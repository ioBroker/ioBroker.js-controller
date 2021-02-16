---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fahrplan/README.md
title: ioBroker.fahrplan
hash: 2f1JTLdANv3W8733DPUa/4GZSHAWQ+wl8dwVD1EY2wQ=
---
![Logo](../../../en/adapterref/iobroker.fahrplan/admin/fahrplan.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.fahrplan.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.fahrplan.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/fahrplan-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/fahrplan-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/gaudes/iobroker.fahrplan.svg)
![NPM](https://nodei.co/npm/iobroker.fahrplan.png?downloads=true)

# IoBroker.fahrplan
![Testen und freigeben](https://github.com/gaudes/ioBroker.fahrplan/workflows/Test%20and%20Release/badge.svg)

## Fahrplan Adapter für ioBroker
### Deutsch
Dieser Adapter für ioBroker verwendet die mobile API von HAFAS verwendet. HAFAS steht für HaCon Fahrplan-Auskunfts-System und wird von vielen europäischen Verkehrsunternehmen verwendet, untersteuert auch von der Deutschen Bahn.
Der Zugriff auf HAFAS gehört hierbei über [HAFAS-Client](https://github.com/public-transport/hafas-client).

Der Adapter Nord hierbei drei Funktionen:

#### Fahrplan für Verbindungen (Routen)
Die einzelnen Routen müssen in der Adapterkonfiguration behandelt und werden werden.
Über einen konfigurierbaren Intervall ruft den Adapter dann wird die Verbindungsinformationen ab.
Die gemeinsamen drei Verbindungen werden als HTML und optional auch detailliert als Objekte in ioBroker Darstellung.
Das HTML-Objekt kann einfach in VIS verbundenunden werden.

#### Beanspruchung bei Verspätungen der Routen
Für die konfigurierten Routen kann ein Verspätungsalarm werden werden. So kann eine bestimmte Ablehnung per Telegramm oder Alexa Vertretung, fällt alle oder eine persönliche Verbindung verspätet ist.

#### Abfahrtstafeln für Stationen
Viele Nord der Adapter eine Abfahrtstafel für konfigurierte Stationen.
Hierbei werden die verschiedenen drei Abfahrten einer Station behandelt und als Objekte und HTML angezeigt.

** Dieser Adapter verwendet die Sentry Bibliotheken um sich Abstrakt und Programmfehler und die Entwickler zu überentwickeln. ** Weitere Details und für Informationen zur Deaktivierung der Fehlerberichterstattung in der [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab JS-Controller 3.0 verwendet.

### Englisch
Dieser Adapter für ioBroker verwendet die mobile API von HAFAS. HAFAS ist ein Managementsystem für den öffentlichen Verkehr, das von Anbietern öffentlicher Verkehrsmittel in ganz Europa verwendet wird, z. Deutsche Bahn.
Mit [HAFAS-Client](https://github.com/public-transport/hafas-client) wird auf HAFAS zugegriffen.

Der Adapter bietet drei Funktionen:

#### Zeitplan für Verbindungen (Routen)
Die gewünschten Routen müssen in der Adapterkonfiguration konfiguriert und aktiviert werden.
Der Adapter ruft die Verbindungsinformationen in einem konfigurierten Intervall automatisch ab.
Die nächsten drei Verbindungen werden in ioBroker als HTML und optional als detaillierte Objekte gespeichert.
Das HTML-Objekt kann problemlos in VIS verwendet werden.

#### Benachrichtigung bei Verspätungen auf Strecken
Für konfigurierte Routen kann eine Verzögerungsbenachrichtigung aktiviert werden. Beispielsweise kann eine Benachrichtigung per Telegramm oder Alexa erfolgen, wenn die gesamte oder eine bestimmte Verbindung verzögert wird.

#### Abfahrtsplan für Stationen
Zusätzlich bietet der Adapter einen Abfahrtsplan für konfigurierte Stationen.
Hier werden die nächsten drei Verbindungen wiederbelebt und als Objekte und HTML erstellt.

** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Konfiguration
### Deutsch
Die Start- und Zielorte sowie Zwischenziele müssen mit ihren numerischen ID werden.
Eine solche Funktion ist im Tab Einstellungen.

#### Tab Einstellungen
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings.png)

| Einstellung | Beschreibung | ------------------------------ | --- | Angebote | Auswahl des zu gehörenenden Empfängers, aktuelle DB, ÖBB und SBB | Aktualisierungsintervall | Intervall in dem die Route aktualisiert werden, Angabe in Minuten | Verspätet entfernen ab | Verspätung in Minuten ab der Verbindung als verspätet wird wird. Standardmäßig werden nur Verspätungen ab zwei Minuten HTML-Ansicht zeigt | Ertritt pro Route eine konfigurierbare HTML-Tabelle in einem Objekt | Detailierte Objekte erhalten | Konfiguration der Interessengebenden Objekte | JSON-Elemente speichern | Die Rückgabe von HAFAS gehört als JSON, diese werden zur Fehlerbehebung werden

Auf der rechten Seite ist die Suchfunktion gehört. Dies muss ein Gespräch gehört werden.
Die Suche nach dem Suchfeld und der Suche nach einer Station wurde gesucht.
Die Suchenden der neuen Suche werden in der Tabelle aufgeführt.

#### Tab Routen
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_routes.png)

Mit dem + -Button können neue Einträge zur Tabelle hinzugefügt werden.

| Einstellung | Beschreibung | ----------------------------- | --- | Nr | Die Nummer gehört dem Unterknoten in den Besitz und wird in die Lage genommen.
| Aktiv | Wenn die Route wird, werden die Verbindungsinfos aktualisiert | Von | Numerische ID von Startbahnhof oder Starthaltestelle | Von (Eigenername) | Benutzerdefinierter Name von Startbahnhof oder Starthaltestelle, für HTML- und Verspätungstext verwendet | Nach | Numerische ID von Zielbahnhof oder Zielhaltestelle | Nach (Eigenername) | Benutzerdefinierter Name von Zielbahnhof oder Zielhaltestelle, für HTML- und Verspätungstext verwendet | Über 1 | Fahrt über den gleichen Ort als numerische ID (optional, sonst leer) | Über 2 | Fahrt über den gleichen Ort als numerische ID (optional, sonst leer) | Verkehrsmittel | Auswahl des Verkehrsmittels, z.B. Bus, S-Bahn, usw. Standardmäßig werden alle Verkehrsmittelwechsel | Max. Umstiege | Maximale Anzahl an Umstiegen. 0 für nur direkte Verbindungen.
| Abfahrten | Anzahl abserder Fahrten | Fahrradmitnahme | Nur Verbindungen mit Fahrradmitnahme treten

#### Tab Verspätungsalarm
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_delaynotification.png)

Mit dem + -Button können neue Einträge zur Tabelle hinzugefügt werden.

| Einstellung | Beschreibung | ----------------------------- | --- | Nr | Die Nummer gehört dem Unterknoten in den Besitz und wird in die Lage genommen.
| Aktiv | Wenn der Verspätungsalarm-Vertrag wird wird diese Aufgaben | Route | Route auf die sich der Alarm gehört soll | Geplante Abfahrt | Geplante Abfahrtszeit der zu prüfenden Route | Wochentag | Wochentage an die die Befragung soll | Schuldigung in Minuten | Anzahl der Minuten vor der Abfahrt Objekt für Ausgabetext | Angabe eines bekannten Objekts

Hinweis zum Ausgabetext: Hier kann neben dem eigenen Kontakt für VIS z.B. auch das "sprechen" -Objekt des Alexa-Adapters oder das "Antwort" -Objekt des Telegramm-Adapters werden werden.

#### Tab Abfahrtstafeln
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_departuretimetables.png)

Mit dem + -Button können neue Einträge zur Tabelle hinzugefügt werden.

| Einstellung | Beschreibung | ----------------------------- | --- | Nr | Die Nummer gehört dem Unterknoten in den Besitz und wird in die Lage genommen.
| Aktiv | Wenn der nachtragungsberechtigt ist, wird dieser nachlassen | Von | Numerische ID von Startbahnhof oder Starthaltestelle | Von (Eigenername) | Benutzerdefinierter Name von Startbahnhof oder Starthaltestelle, für HTML-Ausgabe verwendet | Abfahrten | Anzahl abserder Abfahrten | Verkehrsmittel | Auswahl des Verkehrsmittels, z.B. Bus, S-Bahn, usw. Standardmäßig werden alle Verkehrsmittelwechsel

### Englisch
Start und Ziel sowie Zwischenstopps müssen mit einer numerischen ID gekennzeichnet sein.
Die Suchfunktion für diese IDs ist in die Registerkarteneinstellungen integriert.

#### Registerkarteneinstellungen
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings.png)

| Einstellung | Beschreibung | ----------------------------- | --- | Anbieter | Auswahl des öffentlichen Verkehrsunternehmens, derzeit DB, ÖBB und SBB | Aktualisierungsintervall | Intervall für Aktualisierungen der Routen in Minuten | Markierung verzögert nach Verzögerung in | Minuten nach einer Verzögerung definieren sollte als Verzögerung markiert werden. Standardmäßig wird eine Verzögerung markiert, wenn die Verzögerung größer als eine Minute ist HTML-Ansicht erstellen | Erstellt pro Route eine konfigurierbare HTML-Tabelle in einem Objekt Detaillierte Objekte speichern | Konfiguration von Ausgabeobjekten | JSON-Elemente speichern | Die Rückgabe von HAFAS ist JSON und sollte zur Fehlerbehebung gespeichert werden

#### Registerkartenrouten
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_routes.png)

Mit der + -Taste können neue Einträge zur Tabelle hinzugefügt werden.

| Einstellung | Beschreibung | ----------------------------- | --- | Nr | Die Nummer stimmt mit dem Unterknoten in Objekten überein und wird automatisch zugewiesen Aktiv | Die Verbindungsinformationen werden aktualisiert, wenn die Route aktiviert ist Von | Numerische ID der Startstation oder des Startstopps | Von (Benutzerdefinierter Name) | Benutzerdefinierter Name für Startstation oder Startstopp, der in der Ausgabe von HTML- und Verzögerungsbenachrichtigungen verwendet wird Zu | Numerische ID der Zielstation oder Zielhaltestelle | Von (Benutzerdefinierter Name) | Benutzerdefinierter Name für Zielstation oder Zielstopp, der in der HTML- und Verzögerungsbenachrichtigungsausgabe verwendet wird Über 1 | Fahren Sie als numerische ID über eine spezielle Station (optional, standardmäßig leer) Über 2 | Fahren Sie als numerische ID über eine spezielle Station (optional, standardmäßig leer) Fahrzeug | Auswahl des Fahrzeugs, z.B. Bus, S-Bahn usw. Standardmäßig sind alle Fahrzeuge ausgewählt Max. Übertragungen | Maximale Übertragungen auf der Route, 0 nur für direkte Verbindungen | Abfahrten | Anzahl der zu empfangenden Abfahrten Bycicle | Wählen Sie nur Verbindungen aus, bei denen Fahrzeuge zulässig sind

#### Tab Verzögerungsalarm
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_delaynotification.png)

Mit der + -Taste können neue Einträge zur Tabelle hinzugefügt werden.

| Einstellung | Beschreibung | ----------------------------- | --- | Nr | Die Nummer stimmt mit dem Unterknoten in Objekten überein und wird automatisch zugewiesen Aktiv | Auf Verzögerungsalarm prüfen ist aktiviert | Route | Route bezüglich dieses Verzögerungsalarms | Geplante Abreise | Geplante Abfahrt der zu prüfenden Verbindung (leer = Alle Routen) | Wochentage | Wochentage, an denen die Verbindung überprüft werden soll | Benachrichtigung in Minuten | Minuten vor Abflug, wenn der Verzögerungsalarm aktiv ist Objekt für Ausgabetext | ioBroker-Status für die Textausgabe

Hinweis für "Objekt für Ausgabetext": Es können einfache Status für die Verwendung in VIS verwendet werden, aber auch "Sprechen" -Zustand des Alexa-Adapters oder "Antwort" -Zustand des Telegrammadapters.

#### Registerkarte Abfahrtszeitpläne
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_departuretimetables.png)

Mit der + -Taste können neue Einträge zur Tabelle hinzugefügt werden.

| Einstellung | Beschreibung | ----------------------------- | --- | Nr | Die Nummer stimmt mit dem Unterknoten in Objekten überein und wird automatisch zugewiesen Aktiv | Die Verbindungsinformationen werden aktualisiert, wenn das Element aktiviert ist Von | Numerische ID der Startstation oder des Startstopps | Von (Benutzerdefinierter Name) | Benutzerdefinierter Name für Startstation oder Startstopp, der in der Ausgabe von HTML- und Verzögerungsbenachrichtigungen verwendet wird Abfahrten | Anzahl der zu empfangenden Abfahrten Fahrzeug | Auswahl des Fahrzeugs, z.B. Bus, S-Bahn usw. Standardmäßig sind alle Fahrzeuge ausgewählt

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (Gaudes) Quality fixing (lgtm.com)

### 1.0.4 (2021-02-13)
* (Gaudes) Add product selection to departure timetable
* (Gaudes) Update HAFAS client to 5.15.1 (Fix error Clientversion with OEBB profile)
* (Gaudes) Enhanced information reporting on error (Sentry Breadcrumbs)
* (Gaudes) Include Dependabot updates

### 1.0.3 (2021-01-27)
* (Gaudes) Station search returns only stations (Sentry Multiple results found for station)
* (Gaudes) Integrate SBB profile
* (Gaudes) Leave out superflous journey per route than configured
* (Gaudes) Fix call of helper for correct counters
* (Gaudes) Include Dependabot updates

### 1.0.2 (2021-01-12)
* (Gaudes) Configurable Headline for HTML tables
* (Gaudes) Fix correct deletion of unneeded objects (Sentry)
* (Gaudes) Include Dependabot updates

### 1.0.1 (2020-12-28)
* (Gaudes) Fixing different errors from HAFAS
* (Gaudes) Fixing identical start and destination station
* (Gaudes) Require vehicle in configuration
* (Gaudes) Include Dependabot updates

### 1.0.0 (2020-12-09)
* (Gaudes) First stable release

## License
MIT License

Copyright (c) 2020 Ralf Gaudes <ralf@gaudes.net>

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