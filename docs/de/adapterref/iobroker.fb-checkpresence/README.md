---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fb-checkpresence/README.md
title: kein Titel
hash: C8GTh5RNmhNJJQYm93XhRUqCeQqUWDGVoxL3qMPOCgc=
---
![Anzahl der Installationen](http://iobroker.live/badges/fb-checkpresence-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.fb-checkpresence.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.fb-checkpresence.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/afuerhoff/iobroker.fb-checkpresence.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence/badge.svg)
![NPM](https://nodei.co/npm/iobroker.fb-checkpresence.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/afuerhoff/ioBroker.fb-checkpresence/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/afuerhoff/ioBroker.fb-checkpresence?branch=master&svg=true)

<h1><img src="admin/fb-checkpresence.png" width="64"/>ioBroker.fb-checkpresence</h1>

## Fb-checkpresence Adapter für ioBroker
Der Adapter überprüft die Anwesenheit von Familienmitgliedern über die Fritzbox.
Sie müssen den Namen des Familienmitglieds und die Mac-Adresse (oder IP-Adresse) des verwendeten Geräts eingeben.
Der Kommentar ist optional und Sie können das Familienmitglied aktivieren oder deaktivieren.
Der Datenpunkt basiert auf dem Mitgliedsnamen.

### Adaptervorbedingungen
Für die richtige Funktion müssen Sie einen Verlaufsadapter installieren. Sie können einen der folgenden Adapter auswählen:

* Geschichte
* SQL
* InfluxDB

## Gebrauchtes Gerät
Für diesen Adapter wird die AVM Fritzbox verwendet. Hier finden Sie Informationen zur Fritzbox https://avm.de/produkte/fritzbox/.
Die Fritzbox-Dienste werden über das TR-064-Protokoll verwendet.

### Fritzbox Bedingungen
Die verwendete TR-064-Schnittstelle aus der Fritzbox wird hier beschrieben: https://avm.de/service/schnittstellen/.
Folgende TR-064-Dienste und -Aktionen werden verwendet:

* Hosts: 1 - X_AVM-DE_GetHostListPath (unterstützt seit dem 09.01.2017)
* Hosts: 1 - X_AVM-DE_GetMeshListPath
* Hosts: 1 - GetSpecificHostEntry
* Hosts: 1 - X_AVM-DE_GetSpecificHostEntryByIP (unterstützt seit dem 18.05.2016)
* DeviceInfo: 1 - GetSecurityPort
* DeviceInfo: 1 - GetInfo
* WANPPPConnection: 1 - GetInfo
* WANIPConnection: 1 - GetInfo
* WLANConfiguration3 - SetEnable
* WLANConfiguration3 - GetInfo
* X_AVM-DE_HostFilter - DisallowWANAccessByIP
* X_AVM-DE_HostFilter - GetWANAccessByIP

Standardmäßig ist die TR-064-Schnittstelle nicht aktiviert. Dies kann jedoch einfach über die FritzBox-Weboberfläche geändert werden. Melden Sie sich dazu in Ihrer FritzBox an und stellen Sie sicher, dass die Expertenansicht aktiviert ist.
Dann finden Sie unter "Heimnetzwerk» Heimnetzwerkübersicht »Netzwerkeinstellungen" den Punkt "Zugriff für Anwendungen zulassen". Dort müssen Sie das Kontrollkästchen aktivieren und dann die FritzBox einmal neu starten.

Tipp: Vergessen Sie nach dem Ändern der Optionen nicht den Neustart der Fritzbox!<img src="doc/access_settings_network.JPG"/>

## Konfigurationsdialog
### Allgemeines
Die Konfigurationswerte werden validiert und es können nur korrekte Werte gespeichert werden. Andernfalls ist die Schaltfläche Speichern deaktiviert.

### Fritzbox IP-Adresse, Benutzer und Passwort
Die Konfiguration von IP-Adresse, Benutzer und Passwort ist erforderlich, um die Gerätedaten von der fritzbox abzurufen.
Das Passwort ist verschlüsselt und wurde nicht im Klartext gespeichert. Der Benutzername und das Passwort dürfen maximal 32 Zeichen lang sein. Weitere Informationen finden Sie unter: https://service.avm.de/help/de/FRITZ-Box-Fon-WLAN-7490/014/hilfe_zeichen_fuer_kennwoerter#:~:text=Namen%20f%C3%BCr%20Benutzer,Kennwortfeld%20darf % 20nicht% 20leer% 20sein.

### Intervall
Sie haben separate Intervalle für Familienmitglieder und Fritzbox-Geräte.
Das Intervall für Fritzbox-Geräte kann zwischen 1 und 59 Minuten konfiguriert werden. Normalerweise ist ein Wert zwischen 1 und 5 Minuten ein optimales Intervall zum Lesen der Fritzbox-Daten. Familienmitglieder können von 10 bis 600 Sekunden konfiguriert werden. Jeder neue Zyklus beginnt, wenn der vorherige Zyklus beendet ist.

### Verlaufsadapter
Über den Verlaufsadapter werden einige Werte berechnet. Sie können wählen, ob für diese Berechnungen der Verlauf, der SQL- oder der Influxdb-Adapter verwendet werden soll. Der Verlaufsadapter muss vorläufig installiert werden und kann dann im Konfigurationsdialog ausgewählt werden.
Wenn die Verlaufskonfiguration deaktiviert ist, konnte die Berechnung einiger Werte nicht realisiert werden.

### Datumsformat
Die Optionen für die Datumsformatmaske werden auf dieser Webseite beschrieben: https://www.npmjs.com/package/dateformat.
Die Formatmaske wird zum Formatieren der HTML- und JSON-Tabellenobjekte verwendet.

### Erstellung von FB-Geräten
Wenn diese Option aktiviert ist, werden die Objekte für jedes Gerät in der Fritzbox-Geräteliste erstellt.
Wenn diese Option deaktiviert ist, sind auch die Netzinformationen deaktiviert.

### Resynchronisation von FB-Geräteobjekten
Wenn diese Option aktiviert ist, wird das FB-Geräteobjekt erneut mit der Geräteliste von Fritzbox synchronisiert.

### Erstellung von Netzinformationen
Diese Option kann aktiviert werden, wenn die Erstellung von FB-Geräten zulässig ist. Wenn diese Option aktiviert ist, werden die Netzobjekte für jedes Gerät in der Fritzbox-Geräteliste erstellt.

### Einstellungen für Familienmitglieder
Für ein konfiguriertes Familienmitglied müssen Sie den Namen, die Mac- oder IP-Adresse, einen Kommentar und angeben, ob das Mitglied für die Berechnung aktiviert ist. Für jedes Mitglied erstellt der Adapter Datenobjekte und prüft, ob das Mitglied vorhanden ist oder nicht.

### Whitelist-Einstellungen
In die weiße Liste können Sie jedes bekannte Gerät einfügen. Unbekannte Geräte werden im Blacklist-Objekt aufgelistet.
Wenn Sie das Kontrollkästchen in der Überschrift der Tabelle aktivieren, sind alle Geräte ausgewählt.

## Eigenschaften
### Überprüfung der AVM-Unterstützung
Die Funktion prüft die Verfügbarkeit der verwendeten Fritzbox-Funktionen. Die Verfügbarkeit wird als Info protokolliert. Wenn Sie Probleme haben, prüfen Sie, ob alle Funktionen auf true gesetzt sind.

### Schalten Sie den Gast-WLAN ein / aus
Unter dem Ordner guest können Sie den Status wlan auf true oder false setzen. Anschließend wird der Gast wlan ein- oder ausgeschaltet.

### Schalten Sie den Internetzugang von Fritzbox-Geräten ein / aus
Unter dem Ordner FB-Geräte können Sie den deaktivierten Status auf wahr oder falsch setzen und der Internetzugang dieses Geräts ist in der Fritzbox gesperrt.

### Gäste holen, schwarze Liste
In dieser Funktion wird geprüft, ob ein Benutzer als Gast angemeldet ist. Wird auch überprüft, ob ein Gerät nicht in der Whitelist aufgeführt ist.
Diese Geräte werden der Blacklist hinzugefügt.

### Aktiv werden
Für jedes Familienmitglied werden die Anwesenheit, das Kommen und Gehen sowie mehrere andere Informationen berechnet und im Mitgliedsobjekt gespeichert, wenn ein Verlaufsadapter ausgewählt ist.

### Hostnummer, aktive Geräte
Die Anzahl der Geräte und wie viele aktiv sind, wird von der Fritzbox abgerufen.

## Objekte
### ObjektpräsenzAlle
Wenn alle Familienmitglieder anwesend sind, ist das Objekt wahr.

### Objektpräsenz
Wenn ein Familienmitglied anwesend ist, ist das Objekt wahr.

### Objektgeräte
Dies sind alles aufgelistete Geräte in der Fritzbox

### Object activeDevices
Dies ist die Anzahl aller aktiven Geräte in der Fritzbox

### Objekt html, json
Diese Objekte sind Tabellen (json und html) mit den kommenden und fortlaufenden Informationen aller Familienmitglieder.

### Objektinfo
Hier finden Sie Informationen zum letzten Update und zum Verbindungsstatus des Adapters.

### Objektgast
Hier finden Sie Informationen zur Anzahl der aktiven Gäste und Tabellenobjekte mit den darin enthaltenen Geräteinformationen.

### Objekt-Blacklist
Hier finden Sie Informationen zur Anzahl unbekannter Geräte und Tabellenobjekte mit den unbekannten Geräteinformationen.

### Objekt member.present
Hier finden Sie Informationen über die Anwesenheit eines Mitglieds am aktuellen Tag und darüber, wie lange der Status des Mitglieds seit der letzten Änderung wahr war.

### Objekt member.absent
Hier finden Sie Informationen zur Abwesenheit eines Mitglieds am aktuellen Tag und wie lange der Status des Mitglieds seit der letzten Änderung falsch war.

### Objekt member.comming, member.going
Hier finden Sie Informationen, wann das Familienmitglied ankommt oder das Haus verlässt.

### Objekt member.history, member.historyHtml
Hier finden Sie Informationen zur Geschichte des aktuellen Tages.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ## __WORK IN PROGRESS__
-->

### 1.1.0 (2020-10-24)
* (afuerhoff) second interval for family members implemented
* (afuerhoff) mesh info added
* (afuerhoff) configuration validation added
* (afuerhoff) switch on, off guest wlan
* (afuerhoff) switch on, off internet access of devices 
* (afuerhoff) structural changes
* (afuerhoff) code optimization

### 1.0.4 (2020-06-28)
* (afuerhoff) bugfix json list and guest handling, new object guest.presence

### 1.0.3 (2020-05-26)
* (afuerhoff) bugfix checking mac or ip

### 1.0.2 (2020-05-24)
* (afuerhoff) error handling optimized
* (afuerhoff) external ip implemented
* (afuerhoff) check if mac or ip are listed in fritzbox

### 1.0.1 (2020-04-12)
* (afuerhoff) error handling optimized
* (afuerhoff) history configuration optimized
* (afuerhoff) re-synchronisation of fb-devices implemented

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