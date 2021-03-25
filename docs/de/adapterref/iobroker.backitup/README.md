---
BADGE-Number of Installations: http://iobroker.live/badges/backitup-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.backitup.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.backitup.svg
BADGE-Dependency Status: https://img.shields.io/david/simatec/iobroker.backitup.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/simatec/ioBroker.backitup/badge.svg
BADGE-Travis-CI: http://img.shields.io/travis/simatec/ioBroker.backitup/master.svg
BADGE-NPM: https://nodei.co/npm/iobroker.backitup.png?downloads=true
---
![Logo](img/backitup.png)
# ioBroker.backitup

![Number of Installations](http://iobroker.live/badges/backitup-installed.svg)
![Number of Installations](http://iobroker.live/badges/backitup-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.backitup.svg)](https://www.npmjs.com/package/iobroker.backitup)
[![Downloads](https://img.shields.io/npm/dm/iobroker.backitup.svg)](https://www.npmjs.com/package/iobroker.backitup)
[![Dependency Status](https://img.shields.io/david/simatec/iobroker.backitup.svg)](https://david-dm.org/simatec/iobroker.backitup)
[![Known Vulnerabilities](https://snyk.io/test/github/simatec/ioBroker.backitup/badge.svg)](https://snyk.io/test/github/simatec/ioBroker.backitup)
[![Travis-CI](http://img.shields.io/travis/simatec/ioBroker.backitup/master.svg)](https://travis-ci.org/simatec/ioBroker.backitup)

[![NPM](https://nodei.co/npm/iobroker.backitup.png?downloads=true)](https://nodei.co/npm/iobroker.backitup/)


# Inhalt
* [Grundlegendes](#grundlegendes)
* [Abhängigkeiten](#abhängkeiten)
* [Backuptypen](#Backuptypen)
	* [ioBroker Backup](#ioBroker-Backup)
	* [CCU Backup (Homematic)](#CCU-Backup-(Homematic))
	* [Mysql-Backup](#Mysql-Backup)
    * [Redis-Backup](#Redis-Backup)
	* [InfluxDB-Backup](#InfluxDB-Backup)
    * [PostgreSQL-Backup](#PostgreSQL-Backup)
    * [Javascript-Backup](#Javascript-Backup)
    * [Jarvis-Backup](#Jarvis-Backup)
    * [Zigbee-Backup](#Zigbee-Backup)
    * [Grafana-Backup](#Grafana-Backup)
* [Speicher-Optionen](#Speicher-Optionen)
    * [CIFS](#CIFS)
    * [NFS](#NFS)
    * [FTP](#FTP)
    * [Copy](#Copy)
    * [Dropbox](#Dropbox)
    * [Google Drive](#Google-Drive)
    * [WebDAV](#WebDAV)
* [Verwendung](#Verwendung)
* [Benachichtigungen](#Benachichtigungen)
* [Restore](#Restore)
* [Fehlersuche](#Fehlersuche)
* [Aufgetretene Fehler / Lösungen](#Aufgetretene-Fehler-/-Lösungen)

---

# Grundlegendes
Backitup ist eine Backuplösung, mit der das zyklische Sichern einer IoBroker-Installation sowie einer Homematic CCU möglich ist.

Der Adapter ist für Multiplattformen geeignet und kann  neben Linux-Installationen auch auf Windows und Mac Installationen verwendet werden.

[zurück](#Inhalt)
---

# Abhängigkeiten
* Für den CIFS Mount muss zwingend cifs-utils installiert sein.
    - `sudo apt-get install cifs-utils`

* Für den NFS Mount muss zwingend nfs-common installiert sein.
    - `sudo apt-get install nfs-common`

* Für die verwendung des MySql-Backups muss mysqldump auf dem System installiert sein
    - `sudo apt-get install mysql-client`

* Für die verwendung des PostgreSQL-Backups muss mysqldump auf dem System installiert sein
    - [Installationsanleitung PostgreSQL](https://www.postgresql.org/download/linux/debian/)

* Für die Verwendung des InfluxDB Backups muss influxd installiert sein
    - [Installationsanleitung InfluxDB](https://docs.influxdata.com/influxdb/v1.8/introduction/install/)

[zurück](#Inhalt)
---

# Backuptypen
Backitup bietet sehr viele Möglichkeiten verschiedene Backuptypen zyklisch oder auf Knopfdruck durch zu führen. Jedes Backup wird standardmäßig im Verzeichnis /opt/iobroker/backups/ abgelegt. Optional kann ein FTP-Upload eingerichtet oder alternativ ein CIFS/NFS-Mount genutzt werden.

## ioBroker Backup
Dieses Backup entspricht dem in IoBroker enthaltenen Backup welches man in der Konsole über den Aufruf `iobroker backup` starten kann. Nur wird es hier durch die festgelegten Einstellungen in der Adapterkonfiguration oder dem Widget OneClick-Backup durchgeführt ohne die Konsole verwenden zu müssen.

## CCU Backup (Homematic)
Dieses Backup bietet die Möglichkeit 3 verschiedene Varianten einer Homematic Installations (CCU-Original / pivCCU / Raspberrymatic) zu sichern. Auch die Ausführung dieses Backups kann durch die festgelegten Einstellungen in der Adapterkonfiguration oder dem Widget OneClick-Backup durchgeführt werden.

## Mysql-Backup
Dieses separat einstellbare Backup wird sofern es aktiviert ist, bei jedem Backup ioBroker erstellt und nach Ablauf der angegebenen Vorhaltezeit auch gelöscht. FTP oder CIFS sind für dieses Backup ebenfalls gültig sofern bei den anderen IoBroker-Backup-Typen eingestellt.<br><br>
Wichig hierbei ist, dass auch wenn der Mysql-Server auf einem entferten System läuft, die mysqldump auf dem ioBroker System laufen muss.<br>Für Linuxsysteme wäre der Installationsbefehl wie folgt: `sudo apt-get install mysql-client`

## Redis-Backup
Dieses separat einstellbare Backup wird sofern es aktiviert ist, bei jedem Backup ioBroker erstellt und nach Ablauf der angegebenen Vorhaltezeit auch gelöscht. FTP oder CIFS sind für dieses Backup ebenfalls gültig sofern bei den anderen IoBroker-Backup-Typen eingestellt.<br>
Zur Verwendung von Redis mit Backitup sollten die Rechte für den iobroker-User angepasst werden:<br>
```
sudo usermod -a -G redis iobroker
sudo reboot
```

## History Daten Backup
Dieses separat einstellbare Backup wird sofern es aktiviert ist, bei jedem Backup ioBroker erstellt und nach Ablauf der angegebenen Vorhaltezeit auch gelöscht. FTP oder CIFS sind für dieses Backup ebenfalls gültig sofern bei den anderen IoBroker-Backup-Typen eingestellt.

## InfluxDB-Backup
Dieses separat einstellbare Backup wird sofern es aktiviert ist, bei jedem Backup ioBroker erstellt und nach Ablauf der angegebenen Vorhaltezeit auch gelöscht. FTP oder CIFS sind für dieses Backup ebenfalls gültig sofern bei den anderen IoBroker-Backup-Typen eingestellt.<br><br>
**Um ein InfluxDB Backup ausführen zu können, muss Influxd auf dem iobroker-System installiert sein.**<br>
**Hierbei ist es egal, ob die Datenbank lokal verwaltet wird oder auf einen anderen Server läuft.**<br><br>
Wenn die InfluxDB von einem entfernten Server gesichert werden soll, müssen in der influxdb.conf auf dem entfernten Server die Remote-Rechte für den RPC-Dienst angepasst werden.

```
bind-address = "<InfluxDB-IP>:8088"
```
oder 
```
bind-address = "0.0.0.0:8088"
```

**Nach dem Änderungen in der Konfiguration muss der InfluxDB-Dienst neugestartet werden.**

Weitere Informationen zur Datensicherung der InfluxDB sind [hier](https://docs.influxdata.com/influxdb/v1.8/administration/backup_and_restore/#online-backup-and-restore-for-influxdb-oss) zu finden.

## PostgreSQL-Backup
Dieses separat einstellbare Backup wird sofern es aktiviert ist, bei jedem Backup ioBroker erstellt und nach Ablauf der angegebenen Vorhaltezeit auch gelöscht. FTP oder CIFS sind für dieses Backup ebenfalls gültig sofern bei den anderen IoBroker-Backup-Typen eingestellt.<br><br>
Wichig hierbei ist, dass auch wenn der PostgreSQL-Server auf einem entferten System läuft, die PostgreSQL auf dem ioBroker System laufen muss.<br>Für Linuxsysteme gibt es [hier](https://www.postgresql.org/download/linux/debian/) eine Installationsanleitung

## Javascript-Backup
Dieses separat einstellbare Backup wird sofern es aktiviert ist, bei jedem Backup ioBroker erstellt und nach Ablauf der angegebenen Vorhaltezeit auch gelöscht. FTP oder CIFS sind für dieses Backup ebenfalls gültig sofern bei den anderen IoBroker-Backup-Typen eingestellt.<br><br>
Um das Javascript Backup erstellen zu können, muss im Vorfeld in der Javascript-Adapter Konfiguration die Menüpunkte "Spiegeln von Skripten in den Dateipfad" und "Instanz, die Spiegelung macht" festgelegt werden.<br>
Backitup kann dann im Konfiguartionsmenü die Einstellungen übernehmen

## Jarvis-Backup
Dieses separat einstellbare Backup wird sofern es aktiviert ist, bei jedem Backup ioBroker erstellt und nach Ablauf der angegebenen Vorhaltezeit auch gelöscht. FTP oder CIFS sind für dieses Backup ebenfalls gültig sofern bei den anderen IoBroker-Backup-Typen eingestellt.<br><br>
***Ein Backup der Jarvis-Konfiguration ist ab eine Jarvis-Version 2.2.0-beta.7 möglich.***

## Zigbee-Backup
Dieses separat einstellbare Backup wird sofern es aktiviert ist, bei jedem Backup ioBroker erstellt und nach Ablauf der angegebenen Vorhaltezeit auch gelöscht. FTP oder CIFS sind für dieses Backup ebenfalls gültig sofern bei den anderen IoBroker-Backup-Typen eingestellt.

## Grafana-Backup
Dieses separat einstellbare Backup wird sofern es aktiviert ist, bei jedem Backup ioBroker erstellt und nach Ablauf der angegebenen Vorhaltezeit auch gelöscht. FTP oder CIFS sind für dieses Backup ebenfalls gültig sofern bei den anderen IoBroker-Backup-Typen eingestellt.<br><br>
**Um ein Grafana-Backup erstellen zu können, wird der Benutzername und das Passwort von Grafana benötigt.**<br><br>
**Des Weiteren muss in der Grafana-Weboberfläche ein Api-Key erzeugt werden, um Zugriff auf die Dashboards zu bekommen.**<br>
Der Api-Key kann unter ***"Configuration → API Keys"*** erstellt werden.

[zurück](#Inhalt)
---

# Speicher-Optionen

## CIFS
CIFS-Mount ist unter Linux kein Problem.<br>
Es sollte beachtet werden, dass cifs-utils installiert ist

Die Pfadangabe sollte wie folgt aussehen (Bsp: "/Freigabename/Pfadangabe")<br>
Optional kann man aktivieren/deaktivieren, ob die Backups vom NAS gelöscht werden sollen

  ## NFS
NFS-Mount ist unter Linux kein Problem.<br>
Es sollte beachtet werden, dass nfs-common installiert ist<br><br>
Die Pfadangabe sollte wie folgt aussehen (Bsp: "/Freigabename/Pfadangabe").<br>
Optional kann man aktivieren/deaktivieren, ob die Backups vom NAS gelöscht werden sollen

## FTP
FTP ist auf allen OS möglich und dient als eine Alternative zum CIFS Mount<br>
Die Pfadangabe unter FTP muss immer mit "/" beginnen (Bsp: "/Pfadangabe")<br>
Optional kann man aktivieren/deaktivieren, ob die Backups vom NAS gelöscht werden sollen
  
## Copy
Sollte kein CIFS-Mount möglich sein, besteht eine weitere Möglichkeit der Copy-Funktion<br>
Hier muss in den CIFS-Einstellungen die Pfadangabe eingetragen werden, wo hin kopiert werden soll.<br>
Die Angabe der IP Adresse muss für die Copy-Funktion leer bleiben.
  
## Dropbox
Um die Sicherung in der Dropbox zu nutzen, muss ein Access Token und eine APP unter https://www.dropbox.com/developers/apps erstellt werden<br><br>
* Schritt 1: Den Button "Create Backup" nutzen
* Schritt 2: "Dropbox API" auswählen
* Schritt 3: "App folder" auswählen
* Schritt 4: "Name your app" vergeben
* Schritt 5: "Generated access token" Button drücken (Der Token wird in den Einstellungen von Backitup eingetragen)<br><br>
In deiner Dropbox gibt es nun einen neuen Ordner mit dem Namen "Apps"
  
## Google Drive
Um die Sicherung in der Google Drive zu nutzen, muss ein Access Token holen. Das kann man auf der Konfigurationsseite machen.<br>
ioBroker greift nur auf die definierte Bereiche an. Das Code für oAuth kann man [hier](https://github.com/simatec/ioBroker.backitup/blob/master/docs/oAuthService.js) ansehen.<br><br>
Keine Tokens oder Anwenderdaten werden in der Cloud gespeichert.

## WebDAV
Mit WebDAV bietet Backitup die Möglichkeit mehrere Cloudsysteme anzusprechen.<br>Die bekannteste ist hier NextCloud.
Um eine WebDAV-Verbindung herzustellen, weren der Username und das Passwort des Cloud Accounts benötigt.<br>
Die Verbindung zur Cloud erfolgt über eine verschlüsselte Verbindung.<br><br>
Um eine Verbindung aufbauen zu können, muss der Hostname der Cloud alle Sicherheitszertifikate erfüllen.
Eine Verbindung mit lokaler IP-Adresse ist nicht möglich, da diese keine Lets Encrypt Zertifikate enthält.<br><br>
> Beispiel URL: "https://example.com/remote.php/dav/files/username/"

[zurück](#Inhalt)
---

# Verwendung
1.	Der Adapter erstellt einige Datenpunkte zur Verwendung in Vis<br>
	* oneClick.ccu -> dient als Auslösetrigger für ein CCU-Backup (Kann in Vis durch einen Button auf true gesetzt werden)
	* oneClick.iobroker -> dient als Auslösetrigger für ein Standard-Backup (Kann in Vis durch einen Button auf true gesetzt werden)<br><br>
	* history.html -> dient als History-Log welcher in Vis via CCS vom Design anpassbar ist.
    * history.json -> dient als History-Log welcher in Vis via CCS vom Design anpassbar ist.
	* history.ccuLastTime -> speichert das Erstell-Datum und die Uhrzeit des letzten CCU Backups
	* history.minimalLastTime -> speichert das Erstell-Datum und die Uhrzeit des letzten Standard Backups
    * history.ccuSuccess -> zeigt bei erfolgreichen Backup den State "true"
    * history.minimalSuccess -> zeigt bei erfolgreichen Backup den State "true"
    * history.iobrokerLastTime -> zeigt die letzte ioBroker Sicherung
    * history.ccuLastTime -> zeigt die letzte CCU Sicherung
    * info.ccuNextTime -> zeigt die nächste Ausführungszeit des CCU-Backups
    * info.iobrokerNextTime -> zeigt die nächste Ausführungszeit des ioBroker-Backups
    * info.latestBackup -> zeigt als json das letzte beim Start ermittelte Backup

2. History-Log in Vis anzeigen
   - Es ist möglich den History-Log bspw. in einem Html-Widget durch eintragen folgender Zeile in HTML darzustellen:
```
{backitup.0.history.html}
```
Syntax: {BackitupInstanz.history.html}


3. CCS-Formatierung des History-Logs:
```
   .html{
       display:block;
       width:100%;
   /*    overflow-y:scroll; */
   }
   .backup-type-iobroker
       {
           float:left;
           color:white;
           font-size:20px;
       }
   .backup-type-ccu
       {
           float:left;
           color:red;
           font-size:20px;
    }
   ```
4. OneClick-Button mit Status-Text
   - Wenn ein OneClick-Datenpunkt auf true gesetzt wird startet das entsprechende Backup und nach einer vordefinierten Zeit wird dieser Datenpunkt wieder auf false gesetzt somit ist es möglich einen Button mit Status zu erstellen, hierzu folgende Zeile anpassen und in Vis als Knopftext eintragen:

```
{wert: backitup.0.oneClick.iobroker; wert === "true" || wert === true ? "Minimal Backup </br> wird erstellt" : "Minimal Backup </br> starten"}

```

Syntax: {wert: <BackitupInstanz>.oneClick.<Auslösetrigger>; wert === "true" || wert === true ? "Text während der Backuperstellung" : "Standard-Text"}

[zurück](#Inhalt)
---

# Benachichtigungen
 Backitup unterstützt für die Benachrichtigung nach einem erfolgreichen Backup folgende Messenger.
 Zur Verwendung müssen die jeweiligen Adapter installiert und eigerichtet sein.

   * Telegram
   * Pushover
   * E-Mail 
   * Whatsapp

[zurück](#Inhalt)
---

# Restore

Mit Backitup ist es möglich, alle erzeugten Backup-Typen über das Konfiguartionsmenü im ioBroker auch wiederherzustellen.<br><br>
Es kann aus allen Speichermedien ein Restore ausgeführt werden.<br><br>
**Grundsätzlich ist aber der sicherste Weg, den Restore lokal auszuführen.**<br><br>
Wer den sichersten Weg wählt und den Restore lokal ausführen möchte, muss die Backupdatei im iobroker Backup-Ordner ablegen.
Auf Linuxsystemen befindet sich dieser Ordner unter folgenden Pfad: `/opt/iobroker/backups`

Bei den Backuptypen "iobroker" und "redis" wird beim Restore der iobroker gestoppt und im Anschluss automatisch wieder gestartet.<br>
Nach dem Stop des iobrokers öffnet sich ein neuer Browser-Tab, in dem der Verlauf des Restores zu sehen ist.<br><br>
***Falls dieser Tab nicht öffnet, müssen die Browser-Einstellungen für Popups blockieren kontrolliert werden.***<br><br>

**Bei allen anderen Backuptypen wird iobroker nicht gestoppt. Hier werden lediglich die betroffnenen Adapter kurzzeitig gestoppt.**<br><br>

Wer seine Backups lieber manuell wiederherstellen möchte, sollte folgende Punkte durchführen:

***Restore eines IoBroker Backups:***
    - Das Backup muss wie gewohnt im  Verzeichnis `opt/iobroker/backups` liegen
    - Es kann über die Konsole mit Hilfe des Befehls: `iobroker restore <Backupdateiname>` wieder hergestellt werden.
    - Nach dem Restore ist ein `iobroker upload all` nötig


Eine detailierte Anleitung zum Restore mit Backitup und auch zum manuellen Restore ist [hier](https://forum.iobroker.net/topic/27271/howto-iobroker-restore-unter-linux-durchf%C3%BChren) zu finden.

**Das CCU-Backup muss weiterhin über das Webinterface der CCU wiederhergestellt werden.**

***Restore eines Raspberrymatic / CCU Backups:***
    - *.sbk Datei via SCP in das Verzeichnis „ /usr/local/tmp directory“ auf die Raspberrymatic  kopieren
    - Über die Konsole  als Root-User  auf der Raspberrymatic einloggen
    - Den Befehl: „/bin/restoreBackup.sh /user/local/tmp/EuerBackupDateiname“ auf der Raspberrymatic ausführen.
    - Den Befehl:“reboot“ auf der Raspberrymatic ausführen um den PI neu zu starten
    - Alternativ kann das Backup natürlich auch wie gewohnt über das Webinterface wieder hergestellt werden.

[zurück](#Inhalt)
---

# Fehlersuche
    Um Fehler zu loggen, muss Backitup in unter dem IoBroker Reiter Instanzen auf Log-Stufe "debug" gestellt werden.

[zurück](#Inhalt)
--- 

# Aufgetretene Fehler / Lösungen:
Hier eine Liste der bisher aufgetretenen Probleme und deren Lösungen sofern vorhanden.

1.	Olifall (aus dem Forum) hatte das Problem dass nach dem Restore das Webinterface des IoBrokers nicht mehr erreichbar war, durch folgende Schritte über die Konsole konnte er dies beheben:
    - sudo iobroker status
    - Meldung = "No connection to states 127.0.0.0:6379[redis]"
    - sudo apt-get install redis-server

2.	Sollte der CIFS-Mount mit IP-Adresse nicht möglich sein, sollte der Hostname des NAS verwendet werden
3.  Wenn ihr beim cifs-mount ein Passwort mit Sonderzeichen verwendet, haben User festgestellt, dass dann das Passwort mit Anführungszeichen in der Config hinterlegt werden muss.
4.  cifs-mount kann laut einigen Usern mit sehr langen Passwörtern nicht umgehen. Falls der mount nicht klappen sollte, kürz das Passwort etwas ein (12 Zeichen sind funktionieren bei mir).
5.  Sollte der Adapter sich nicht installieren lassen, prüft eure Versionen von node und nodejs. Der Adapter unterstützt Versionen < Node 8 nicht.
6.  Wenn euer iobroker System mit dem neuen Installer Script installiert wurde, kann es vorkommen, dass ihr nicht alle Rechte für den neuen User iobroker habt. 
    Dies betrifft dann leider auch backitup, da backitup einige systemrelevante Befehle benutzt.

    Um das Problem mit fehlenden Rechten zu beheben, gibt es inzwischen einen Fix für den Installerscript von iobroker.
    Führt bitte folgende Befehle auf eure Iobrokerumgebung in der Konsole aus:

    ```
    iobroker stop
    iobroker fix
    sudo reboot
    ```
8.  Solltet Ihr eine Fehlermeldung beim erstellen der Redis Datenbank bekommen, prüft bitte, ob euer User iobroker die Rechte hat und ob er in der User-Gruppe Redis vorhanden ist.
    Wenn dies nicht der Fall ist, könnt ihr das mit folgenden Befehl in der Konsole beheben.
    
    ```
    sudo usermod -a -G redis iobroker
    sudo reboot
    ```
    Wenn ihr nicht mit dem Installerscript eure Iobroker Installation aufgesetzt habt und euer User einen anderen Namen hat, bitte in dem Befehl "iobroker" durch euren User ersetzen.

[zurück](#Inhalt)
---

## Changelog

### 2.1.0 (24.03.2021)
* (simatec) Admin-Tab added
* (simatec) dependencies targz removed
* (simatec) dependencies tar-fs added
* (simatec) dependencies updated
* (simatec) small Bugfixes

### 2.0.5 (14.03.2021)
* (simatec) error handling for redis backup added
* (simatec) error handling for history backup added
* (simatec) BugFix Grafana backup

### 2.0.4 (10.03.2021)
* (simatec) Bugfix history json
* (simatec) BugFix Redis backup
* (simatec) chmod for backup directory added
* (simatec) error handling for Grafana backup added

### 2.0.3 (04.03.2021)
* (simatec) Promise for redis aof added
* (simatec) BugFix Grafana restore
* (simatec) small BugFix umount

### 2.0.2 (03.03.2021)
* (simatec) BugFix redis backup
* (simatec) aof for redis added

### 2.0.1 (23.02.2021)
* (simatec) BugFix redis backup/restore
* (simatec) dependencies node-tar added
* (simatec) BugFix Notification
* (simatec) BugFix Grafana backup

### 2.0.0 (31.01.2021)
* (simatec) BugFix detect last backup
* (simatec) WebDAV added
* (simatec) BugFix Zigbee
* (simatec) stop/start Instances on restore
* (simatec) Download Icon for Cloud Restore added
* (simatec) javscript Backup added
* (simatec) Grafana Backup added
* (simatec) Restore added for some types without restart
* (simatec) timestamp for history-json added
* (simatec) Source code rewritten
* (simatec) Restore revised
* (simatec) fixed many small bugs
* (simatec) Added warning messages
* (simatec) Fixed cloud restore

### 1.8.5 (11.01.2021)
* (simatec) Bugfix Jarvis Backup
* (simatec) Bugfix GUI

### 1.8.4 (09.01.2021)
* (simatec) Bugfix influxDB Backup
* (simatec) Bugfix influxDB Restore
* (simatec) Jarvis Backup added
* (simatec) Jarvis Restore added
* (simatec) Bugfix mysql Backup
* (simatec) Bugfix pgsql Backup
* (simatec) small Bugfixes
* (simatec) Info-Message for storage added

### 1.8.3 (22.12.2020)
* (simatec) Bugfix iobroker start after restore on Windows
* (simatec) changed webui-port for restore
* (simatec) Bugfix influxDB Restore
* (simatec) dependencies updated

### 1.8.2 (09.12.2020)
* (simatec) code cleaned
* (simatec) code for history.html object revised
* (simatec) code for history.json object revised

### 1.8.1 (07.12.2020)
* (simatec) influxDB Backup added
* (simatec) influxDB Restore added
* (simatec) Postgresql Backup added
* (simatec) Postgresql Restore added
* (simatec) translation added
* (simatec) new zigbee Restore added
* (simatec) dependencies updated
* (simatec) many small bugfixes
* (simatec) new redis Restore added
* (simatec) enable/disable option for Sentry Plugin
* (simatec) smb 3.02 support added
* (simatec) smb 3.1.1 support added

### 1.7.0 (26.10.2020)
* (simatec) small Bugfix for umount on cifs/nfs mount
* (simatec) Dev-Dependencies updated
* (simatec) Dependencies updated

### 1.6.9 (30.09.2020)
* (simatec) Timeout fix for backup process

### 1.6.8 (24.09.2020)
* (simatec) Translations update for Weblate
* (simatec) dependencies updated
* (simatec) devdependencies updated
* (weblate) translation updated

### 1.6.7 (09.09.2020)
* (simatec) Bugfix error on GoogleDrive

### 1.6.6 (08.09.2020)
* (simatec) Bugfix clean local backups
* (simatec) Bugfix mount and umount for sentry.io

### 1.6.5 (07.09.2020)
* (simatec) Bugfix GoogleDrive Rate Limit errors 
* (simatec) small fixes on zigbee backup

### 1.6.4 (04.09.2020)
* (simatec) small fixes for sentry.io
* (simatec) small fixes on zigbee backup


### 1.6.3 (01.09.2020)
* (simatec) dependencies for googleapis updated
* (simatec) dependencies for dropbox-v2-api updated
* (simatec) devdependencies updated

### 1.6.2 (31.08.2020)
* (simatec) added whatsapp-cmb support for notifications

### 1.6.1 (24.08.2020)
* (Apollon77) several fixes and optimizations

### 1.6.0 (03.08.2020)
* (Jey-Cee/simatec) adapter configuration revised

### 1.5.9 (21.07.2020)
* (simatec) small fixes on mysql backup
* (simatec) next bugfixs errorhandling sentry.io
* (simatec) updated dependencies

### 1.5.8 (20.05.2020)
* (simatec) small fixes on zigbee backup
* (simatec) added log for zigbee Instances
* (simatec) next bugfix errorhandling sentry.io

### 1.5.7 (11.05.2020)
* (simatec) bugfix errorhandling sentry.io
* (simatec) updated dependencies
* (simatec) added node14 support

### 1.5.6 (02.05.2020)
* (simatec) Bugfix reading restore list

### 1.5.5 (01.05.2020)
* (simatec) bugfix errorhandling sentry.io

### 1.5.4 (29.04.2020)
* (simatec) added osDependencies for nfs and cifs
* (simatec) Bugfixes for errorhandling telegram, pushover, e-mail, ftp list and create backup folder


### 1.5.3 (28.04.2020)
* (simatec) many smal Bugfixes for errorhandling sentry.io

### 1.5.2 (24.04.2020)
* (simatec) errorhandling sentry.io
* (AlCalzone) docu updated

### 1.5.1 (23.04.2020)
* (simatec) Bugfix list from nas
* (simatec) Bugfix sentry errors

### 1.5.0 (21.04.2020)
* (simatec) revised error handling
* (simatec) revised mount process
* (simatec) revised umount process
* (simatec) added log for last backup file
* (simatec) updated dependencies
* (simatec) added sentry.io support

### 1.4.5 (23.03.2020)
* (simatec) Bugfix CIFS Domain

### 1.4.4 (23.03.2020)
* (simatec) Fix history error

### 1.4.3 (21.03.2020)
* (simatec) Fix for autochecker

### 1.4.2 (21.03.2020)
* (simatec) Fix start after restore
* (simatec) update dependencies

### 1.4.1 (02.03.2020)
* (simatec) json historystate with more options

### 1.4.0 (27.02.2020)
* (simatec) added next Backup Time
* (simatec) added Name Suffix for mysql Backup
* (simatec) added more Options for mysql
* (simatec) added domain support for cifs
* (simatec) added json historystate

### 1.3.6 (18.12.2019)
* (simatec) Fix historyList for compact-mode
* (simatec) Added ack for history states

### 1.3.5 (17.12.2019)
* (simatec) Fix compact-mode for history

### 1.3.4 (15.12.2019)
* (simatec) Fix hide passwords

### 1.3.3 (14.12.2019)
* (simatec) Fix Webinterface for Restore
* (simatec) Fix MySql Backup
* (simatec) Added some debug logs for Restore
* (simatec) some Bug Fix
* (simatec) Messagebox for restore list
* (simatec) hide password on log
* (simatec) Added password hiding
* (simatec) Clean Code
* (simatec) detected history path
* (simatec) Fix deteced

### 1.3.2 (04.12.2019)
* (simatec) Add Webinterface for Restore
* (simatec) Bug fix

### 1.3.1 (02.12.2019)
* (bluefox) Added information about latest backup
* (simatec) some Bug fix
* (simatec) add new translation
* (simatec) Fix translation
* (simatec) Default backup renamed to ioBroker backup
* (simatec) delete old objects

### 1.3.0 (22.11.2019)
* (simatec) support end for the total backup
* (simatec) Added backup of history data path
* (simatec) Added startup of all adapters after restore
* (simatec) Revision of the restoration for Redis
* (simatec) revision of log issues
* (simatec) Rebuild the start / stop processes under Unix
* (simatec) Rebuilding the start / stop processes under Windows
* (simatec) new translations
* (simatec) adjustments to the new Windows Installer
* (simatec) adjustments to the new Linux installer
* (simatec) fixed some small bugs

### 1.2.2 (20.10.2019)
* (simatec) Fix update process

### 1.2.1 (19.10.2019)
* (simatec) Fix CIFS password with special characters

### 1.2.0 (02.07.2019)
* (bluefox) Google Drive was added
* (simatec) Support for node 6 ended

### 1.1.4 (08.04.2019)
* (simatec) Support for SMB3
* (simatec) Backup for Zigbee Database
* (simatec) Restore for Zigbee Database

### 1.1.3 (12.03.2019)
* (simatec) Timeout for email sending
* (simatec) Timeout for pushover sending
* (simatec) Timeout for telegram sending
* (simatec) Code cleaned up

### 1.1.2 (21.02.2019)
* (simatec) exec Start for iobroker
* (simatec) Fix umount before Restore

### 1.1.1 (12.02.2019)
* (simatec) Fix iobroker-stop for total backup

### 1.1.0 (10.02.2019)
* (simatec) stable Release

### 1.0.9 (02.02.2019)
* (simatec) Add New umount query
* (simatec) Add Umount wait by device busy
* (simatec) Add Timeout for History settings
* (simatec) Add Notification only on error

### 1.0.8 (26.01.2019)
* (simatec) modification for new installer
* (simatec) WOL-waittime adjustable
* (simatec) Fix History settings

### 1.0.7 (17.01.2019)
* (simatec) better start/stop Handling for backup and restore

### 1.0.6 (16.01.2019)
* (simatec) Fix Start/Stop for new iobroker-installer

### 1.0.5 (14.01.2019)
* (simatec) Fix compact mode
* (simatec) Fix total backup
* (simatec) better history handling for html
* (simatec) better history handling
* (simatec) error Message for telegram
* (simatec) error Message for E-Mail
* (simatec) error Message for pushover

### 1.0.4 (08.01.2019)
* (simatec) support for compact mode

### 1.0.3 (06.01.2019)
* (simatec) Bugfix

### 1.0.2 (05.01.2019)
* (simatec) Fix start/stop for new iobroker-Installer

### 1.0.1 (30.12.2018)
* (simatec) Fix delete old Files
* (simatec) Add wake on LAN for CIFS and NFS

### 1.0.0 (24.12.2018)
* (simatec) Stable Release

### 0.4.4 (19.12.2018)
* (simatec) Fix cifs-mount User

### 0.4.3 (17.12.2018)
* (simatec) Add device ID for pushover

### 0.4.2 (10.12.2018)
* (simatec) Fix mount / umount
* (simatec) Fix Readme

### 0.4.1 (07.12.2018)
* (simatec) Added boolean for backup Success
* (simatec) Added Selection menu SMB type (CIFS)
* (simatec) Added Checkbox for mount as root (sudo)

### 0.4.0 (04.12.2018)
* (simatec) Added Pushover Notification

### 0.3.9 (03.12.2018)
* (simatec) Fix cifs/nfs mount and umount

### 0.3.8 (08.11.2018)
* (simatec) Fix notifications format
* (simatec) Fix Telegram User

### 0.3.7 (07.11.2018)
* (simatec) Added e-mail notification
* (simatec) Create backup directory on first boot
* (simatec) many small changes
* (peoples) Fix Telegram SilentNotice
* (peoples) Added Possibility to select a Telegram Receiver
* (peoples) Added Possibility to select a Telegram Notification length
* (peoples) Some Translations

### 0.3.6 (16.10.2018)
* (simatec) Fix Dropbox Backup
* (simatec) Fix Restore path for ownDir
* (simatec) Fix FTP and NAS path
* (simatec) Fix Access Token for dropbox

### 0.3.5 (03.10.2018)
* (simatec) Fix Translation
* (simatec) Fix Filename Suffix for Restore
* (peoples) Bugfix Title for Backup deletion

### 0.3.4 (01.10.2018)
* (simatec) Fix Restart after total-backup

### 0.3.3 (27.09.2018)
* (simatec) Fix Backup-Directoy for dropbox
* (simatec) Fix Restart after total-backup
* (simatec) Fix error Log on cifs

### 0.3.2 (25.09.2018)
* (simatec) Fix Filename for ccu backup

### 0.3.1 (25.09.2018)
* (simatec) Fix FTP Directory
* (simatec) delete old Files

### 0.3.0 (24.09.2018)
* (bluefox/simatec) Add Multiplatform (Windows/Linux/Mac)
* (bluefox/simatec) Backitup switched to Javascript
* (bluefox/simatec) shell support removed
* (bluefox/simatec) Deleting old backups up to the last X backups added
* (bluefox/simatec) restore feature added (beta)
* (bluefox/simatec) Restore added via NAS/FTP/Local/Dropbox (Beta)
* (simatec) NFS support added
* (bluefox) Dropbox Support added
* (bluefox) Fix History
* (peoples) Added silent mode for telegram
* (simatec) Redis/mysql added with standard backup
* (simatec) translations added
* (simatec) Docs adapted

### 0.2.7 (29.07.2018)
* (simatec) Fix Delete old Files

### 0.2.6 (27.07.2018)
* (bluefox) Configurable redis path was added
* (simatec) Translations Script
* (simatec) Fix FTP Upload

### 0.2.5 (26.07.2018)
* (simatec) Check for dependencies
* (simatec) Delete older files if number of files greater than X
* (simatec) Check for Backup Dir
* (simatec) Translations added

### 0.2.4 (23.07.2018)
 * (peoples) Some Bugfixes
 * (peoples) Added translations in words.js


### 0.2.3 (19.07.2018)
 * (bluefox) The backup buttons in configuration dialog were added
 * (bluefox) Show bash output text
 * (peoples) Bug Fix Mysql-Login Error

### 0.2.2 (17.07.2018)
 * (peoples/simatec/bluefox) Bug Fix Code

### 0.2.1 (15.07.2018)
 * (peoples/simatec) Bug Fix

### 0.2.0 (14.07.2018)
 * (blufox) Code formatting

### 0.1.8 (11.07.2018)
 * (darkiop) MySQL-Sicherung um Host- und Portabfrage erweitert
 * (peoples) Versendende Telegram-Instanz wählbar
 * (peoples) Telegram-Nachrichten angepasst an Verbindungstyp
 * (peoples) History-Log angepasst an Verbindungstyp
 * (simatec) Komprimierung der MySQL-Datenbank-Sicherung eingebaut
 * (simatec) Anpassung der Konfigoberfläche an Telegram-Instanz Auswahl

### 0.1.7 (05.07.2018)
 * (peoples) Datenpunkte in io-package definiert

### 0.1.6 (04.07.2018)
 * (simatec/peoples) Beta Version

### 0.1.5 (03.07.2018)
 * (peoples) Log Einträge neu formatiert

### 0.1.4 (02.07.2018)
 * (simatec/peoples) diverse Anpassungen

### 0.1.3 (01.07.2018)
 * (simatec/peoples) Sprachen hinzugefügt

### 0.1.2 (30.06.2018)
 * (simatec/peoples) Erste Beta-Version

### 0.1.0 (25.06.2018)
 * (simatec/peoples) Erste Git-Adapter-Version

## License

The MIT License (MIT)

Copyright (c) 2018 - 2021 simatec

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