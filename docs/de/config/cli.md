---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/config/cli.md
title: Konsolenbefehle für ioBroker
hash: gDKI5WnwytmXb2zTPcSnSvUtOHvPTTmbUWOS+IrqjJU=
---
# Konsolenbefehle für ioBroker
Es besteht die Möglichkeit, einige Vorgänge wie Starten, Stoppen oder Aktualisieren über die Konsole (Windows und Linux) auszuführen. Hier ist die Beschreibung von ihnen.

Hinweis: Alle Befehle, die mit ```iobroker``` beginnen, können von jedem Verzeichnis aus aufgerufen werden, in dem der Iobroker-Befehl verfügbar ist. Der Befehl §§JJJJJ1§§ muss vom ioBroker-Stammverzeichnis aus aufgerufen werden.

Folgende Befehle sind möglich:

- [npm install iobroker.adapterName] (# npm-install-iobrokeradaptername)
- [iobroker start] (# iobroker-start)
- [iobroker stop] (# iobroker-stop)
- [iobroker restart] (# iobroker-restart)
- [iobroker isrun] (# iobroker-isrun)
- [iobroker start adapterName.instance] (# iobroker-start-adapternameinstance)
- [iobroker stop adapterName.instance] (# iobroker-stop-adapternameinstance)
- [iobroker restart adapterName.instance] (# iobroker-restart-adapternameinstance)
- [iobroker add adapterName \ [- aktiviert \] \ [- host \ <host \> \] \ [- port \ <port \> \]] (# iobroker-add-adaptername)
- [iobroker install adapterName] (# iobroker-install-adaptername)
- [iobroker upload adapterName] (# iobroker-upload-adaptername)
- [iobroker-setup] (# iobroker-setup)
- [iobroker del adapterName] (# iobroker-del-adaptername)
- [iobroker del adapterName.instance] (# iobroker-del-adapternameinstance)
- [iobroker update \ [Repository-URL \] \ [- aktualisierbar \]] (# iobroker-update-repository-url)
- [iobroker upgrade \ [Repository-URL \]] (# iobroker-upgrade)
- [iobroker upgrade self \ [Repository-URL \]] (# iobroker-upgrade-self)
- [iobroker upgrade adapterName \ [Repository-URL \]] (# iobroker-upgrade-adaptername)
- [iobroker object get objectId] (# iobroker-object-get)
- [iobroker object chmod \ <object-mode\> \ [Zustandsmodus \] \ <id\> ] (# iobroker-object-chmod)
- [iobroker object chown \ <Benutzer \> \ <group \> \ <id \>] (# iobroker-object-chown)
- [iobroker object list \ <id \>] (# iobroker-object-list)
- [Iobroker-Set \ <Instanz \> \ [Einstellungen \]] (# Iobroker-Set)
- [iobroker state get objectId] (# iobroker-state-get)
- [iobroker state getplain objectId] (# iobroker-state-getplain)
- [iobroker state getvalue objectId] (# iobroker-state-getvalue)
- [iobroker-Statusobjekt objectId newValue] (# iobroker-state-set)
- [iobroker state del objectId] (# iobroker-state-del)
- [iobroker message \ <adapter \> \ [. instanz_id \] \ <befehl \> \ [\ message \]] (# iobroker-message)
- [iobroker-Setup] (# iobroker-state-setplain)
- [iobroker clean] (# iobroker-clean)
- [iobroker-backup] (# iobroker-backup)
- [iobroker-host] (# iobroker-host)
- [Iobroker-Hostsatz] (# Iobroker-Hostsatz)
- [iobroker-Host entfernen] (# iobroker-host-remove)
- [iobroker restore \ <Sicherungsname oder Pfad \>] (# iobroker-restore)
- [iobroker list \ <type \> \ [muster \]] (# iobroker-list)
- [iobroker chmod \ <modus \> \ [muster \]] (# iobroker-chmod)
- [iobroker chown \ <Benutzer \> \ [Gruppe \] \ [Muster \]] (# iobroker-chown)
- [iobroker adduser \ <benutzer \> \ [- ingroup group \] \ [- passwort pass \]] (# iobroker-adduser)
- [iobroker deluser \ <Benutzer \>] (# iobroker-deluser)
- [iobroker passwd \ <benutzer \> \ [- passwort pass \]] (# iobroker-passwd)
- [iobroker file read \ <toRead \> \ [toWrite \]] (# iobroker-file-read)
- [iobroker file write \ <toRead \> \ <toWrite \>] (# iobroker-file-write)
- [iobroker version \ [adaptername \]] (# iobroker-version)
- [iobroker uuid] (# iobroker-uuid)
- [iobroker status] (# iobroker-status)
- [iobroker repo \ [repoName \]] (# iobroker-repo)
- [iobroker info] (# iobroker-info)

** Hinweis: ** Es gibt einen Parameter ```--timeout 5000```, der mit jedem Befehl verwendet werden kann. Es gibt das Timeout in ms für die Verbindung zum DB an.

## Npm install iobroker.adapterName
Dieser Befehl muss vom Stammverzeichnis des ioBroker aus aufgerufen werden (normalerweise ```/opt/iobroker``` oder ```C:\Program Files\ioBroker```). Es verwendet den npm-Manager zum Installieren oder Aktualisieren eines bestimmten Adapters oder js-Controllers. Es funktioniert immer, auch wenn der "Admin" oder "Js-Controller" die Probleme hat.

Anwendungsbeispiele:

- `` npm install iobroker.admin``` - Aktualisieren oder installieren Sie den "admin" -Adapter
- `` npm install iobroker.js-controller``` - aktualisiert oder installiert den js-controller selbst
- `` `npm installiere https:// github.com / husky-koglhof / ioBroker.hmm / tarball / master /` `` - Installiere den Adapter direkt von github oder von einem anderen Ort aus. Es muss ein ZIP- oder GZ-Paket sein und muss package.json enthalten.

Wenn der Adapter installiert wurde, sollte nach dem Aufruf von ```npm install ..``` der Neustart des angegebenen Adapters oder des gesamten js-Controllers ausgeführt werden, damit die Änderungen wirksam werden.

Dies kann mit ```iobroker restart adapterName``` oder nur mit ```iobroker restart``` erfolgen. Für Einzelheiten siehe [Hier](#restart).

*** Hinweis: *** Nur Pakete mit dem Namen **ioBroker.zzz** können so installiert werden.

## Iobroker start
Startet den Iobroker als Daemon. Wenn der ioBroker noch nicht gestartet ist, erhalten Sie die Warnung:

```ioBroker controller daemon already running. PID: xx```

*** Hinweis für Windows: *** Normalerweise wird der ioBroker unter Windows als Dienst gestartet. Dieser Befehl startet die zweite Instanz von ioBroker und dies führt zu Konflikten. Verwenden Sie ```serviceIoBroker.bat start``` aus dem ioBroker-Verzeichnis anstelle des Befehls ```iobroker start```. Sie sollten über Administratorrechte verfügen, um den Dienst zu starten.

## Iobroker halt
Stoppt den Iobroker, wenn er als Dämon ausgeführt wird. Wenn der ioBroker nicht gestartet ist, erhalten Sie die Warnung:

```ioBroker controller daemon is not running```

*** Hinweis für Windows: *** Normalerweise wird der ioBroker unter Windows als Dienst gestartet. Dieser Befehl hat keine Auswirkungen. Verwenden Sie ```serviceIoBroker.bat stop``` aus dem ioBroker-Verzeichnis anstelle des Befehls ```iobroker stop```. Sie sollten über Administratorrechte verfügen, um den Dienst zu beenden.

## Iobroker neustart
Nur die Stopp- und Startbefehle zusammen. Siehe oben.

## Iobroker isrun
Gibt den tatsächlichen Status von ioBroker zurück. Ist es angefangen oder nicht? Wenn ioBroker nicht gestartet ist, lautet der Rückkehrcode 100.

Gleich wie ```iobroker status```.

## Iobroker start adapterName.instance
Sie können den angegebenen Adapter von der Konsole aus starten. Es wird automatisch aktiviert und gestartet.

Wenn der Adapter gestartet wurde, wird er neu gestartet.

Sie können in "admin" steuern, dass die Adapterinstanz jetzt aktiviert ist.

Verwendungszweck:

- `` `iobroker start email.0``` - aktiviert und startet die Adapterinstanz ioBroker.email.0

Hinweis: Sie können ```iobroker start all``` aufrufen, um alle deaktivierten Instanzen zu starten, z. nach dem Wiederherstellen.

## Iobroker stop adapterName.instance
Sie können den angegebenen Adapter von der Konsole aus stoppen. Es wird deaktiviert und gestoppt. Es wird später nicht automatisch neu gestartet.

Sie können in "admin" steuern, dass die Adapterinstanz jetzt deaktiviert ist.

Verwendungszweck:

- `` Iobroker stop email.0``` - aktiviert und startet die Adapterinstanz ioBroker.email.0

## Iobroker starte adapterName.instance neu
Startet den angegebenen Adapter einfach neu. Wenn es deaktiviert wurde, wird es aktiviert.

## Iobroker add adapterName
Die vollständige Syntax lautet ```iobroker add adapterName [desiredInstanceNumber] [--enabled] [--host \<host\>] [--port \<port\>]```

Wird installiert, falls nicht installiert, und erstellt die Instanz des angegebenen Adapters. Wenn die Instanz des Adapters bereits vorhanden ist, wird die nächste Instanznummer verwendet.

Es gibt einige zusätzliche Parameter:

- enabled: Die Adapterinstanz wird nach der Erstellung automatisch aktiviert. Andernfalls wird der vom Adapter vordefinierte Wert dafür verwendet.
- host: Hostname, an dem die Adapterinstanz erstellt werden muss. Die Liste der Hosts erhalten Sie mit dem Befehl `` `iobroker list hosts``` (Noch nicht implementiert)
- port: Wenn der Adapter native.port hat, wird er nach der Installation auf den gewünschten Wert gesetzt.
- wishInstanceNumber: Sie können die gewünschte Instanznummer angeben.

Verwendungszweck:

- `` `iobroker add dwd``` - Installieren und erstellen Sie eine Instanz des dwd-Adapters.
- `` `iobroker add admin --enabled --port 80``` - Erstellen Sie eine zweite (normalerweise) Instanz des Administrationsadapters auf Port 80 und aktivieren Sie sie.

Wenn dieser Befehl nicht funktioniert, können Sie immer den Befehl ```npm install iobroker.adapterName``` verwenden, um das Update oder die Installation zu erzwingen. Es wird keine Instanz erstellt, danach sollten Sie den Befehl ```iobroker add iobroker.adapterName``` noch einmal aufrufen.

## Iobroker install adapterName
Installiert den Adapter nur in ioBroker und erstellt keine Instanz. Wenn der Adapter noch installiert ist, erhalten Sie folgende Warnung:

```adapter "admin" yet installed. Use "upgrade" to install newer version.```

## Iobroker upload adapterName
Laden Sie Webseiten aus den Ordnern "www" und "admin" im Adapter in den ioBroker-Dateispeicher hoch. Wird normalerweise von Entwicklern verwendet, um die Änderungen auf den Konfigurationsseiten oder auf den "www" -Seiten anzuzeigen.
Sie können die Dateien nicht direkt in "iobroker / iobroker-data / adapter / file" ändern. In der Konfigurationsdatei (* iobroker-data / iobroker.json *) objects.noFileCache gibt es ein Flag für Entwickler, um den Cache der Datei zu deaktivieren. Wenn dieses Flag auf true gesetzt ist (natürlich ist ein Neustart erforderlich, nachdem die Konfigurationsdatei geändert wurde), werden die Änderungen im iobroker-data-Verzeichnis ohne den Befehl ```iobroker upload adapterName``` im Web angezeigt.

Hinweis: Sie können ```iobroker upload all``` aufrufen, um alle Adapter hochzuladen, z. nach dem Wiederherstellen.

## Iobroker-Setup
Dieser Befehl muss aufgerufen werden, wenn ioBroker nicht mit npm oder Windows Installer installiert wurde (z. B. nur aus github kopiert und entpackt). Es erstellt die Standardkonfigurationsdatei und bereitet die Datenverzeichnisse vor.

Sie können diesen Befehl mit dem Parameter "first" aufrufen, um sicherzustellen, dass nichts überschrieben wird, wenn die Konfiguration noch vorhanden ist.

Verwendungszweck:

```iobroker setup first``` - create configuration files if not yet created.

## iobroker setup custom
To enable multi-host configuration (experimental) this command must be called. Following questions must be answered:
<pre><code>
Type of objects DB [file, couch, redis], default [file]:
Host of objects DB(file), default[127.0.0.1]: enter IP address of the main system
Port of objects DB(file), default[9001]:
Type of states DB [file, redis], default [file]:
Host of states DB (file), default[ip]:
Port of states DB (file), default[9000]:
</code></pre>
You can just press ENTER to take the default value shown in \[\].

**Note:** at the moment only *file* DB type is supported. If you change the ports you must be an expert.

**Note:** Check the firewall settings on the main host for the defined ports (9000/9001).

## iobroker del adapterName
Completely removes all instances and states of this adapter from ioBroker and deletes it on the disk.

You cannot restore settings of the adapter instances after deletion.

Usage:
```iobroker del dwd``` - deletes all instances and code of adapter dwd from ioBroker.

## iobroker del adapterName.instance
Removes only specified instance of this adapter from ioBroker and **not** deletes it form the disk.

You cannot restore settings of the adapter instance after deletion.

Usage:
```iobroker del dwd.0``` - deletes instance 0 of adapter dwd from ioBroker.

## iobroker update \[repository url\]
Full syntax: ```iobroker update \[repository url\]```

Lesen Sie die Informationen aus dem konfigurierten ioBroker-Repository. Wenn ```\repository url\``` gesetzt ist, werden die Informationen aus diesem Repository gelesen.

Verwendungszweck:

- `` Iobroker Update``` - Liste der verfügbaren Version des konfigurierten (normalerweise lokalen) Repositorys.
- `` `Iobroker-Update https:// raw.githubusercontent.com / ioBroker / ioBroker.js-controller / master / conf / sources-dist.json``` - Listet verfügbare Versionen aus dem Online-Repository auf.

```
>./iobroker.js update
Cannot get version of "virtual".
Cannot get version of "geofency".
update done
Adapter    "zwave"         : 0.1.0
Adapter    "yr"            : 0.1.2    , installed 0.1.2
Adapter    "web"           : 0.2.6    , installed 0.2.6
Adapter    "vis"           : 0.2.9    , installed 0.2.9
Adapter    "virtual"
Adapter    "sonos"         : 0.1.5    , installed 0.1.4 [Updateable]
Adapter    "rickshaw"      : 0.2.1    , installed 0.2.1
Adapter    "pushover"      : 0.1.0
Adapter    "onkyo"         : 0.0.4
Adapter    "telnet"        : 0.0.0
Adapter    "socketio"      : 0.2.3    , installed 0.2.3
Adapter    "simple-api"    : 0.0.3    , installed 0.0.3
Adapter    "sayit"         : 0.3.0    , installed 0.3.0
Adapter    "ping"          : 0.1.3    , installed 0.1.3
Adapter    "node-red"      : 0.1.5    , installed 0.1.5
Adapter    "mqtt"          : 0.1.6    , installed 0.1.5 [Updateable]
Adapter    "mobile"        : 0.0.2
Adapter    "legacy"        : 0.1.12
Adapter    "knx"           : 0.0.1
Controller "js-controller" : 0.5.14   , installed 0.5.14
Adapter    "javascript"    : 0.2.3    , installed 0.2.3
Adapter    "ical"          : 0.0.2    , installed 0.0.1 [Updateable]
Adapter    "hmm"           : 0.0.15   , installed 0.0.16
Adapter    "hue"           : 0.2.0    , installed 0.2.0
Adapter    "hm-rpc"        : 0.3.5    , installed 0.3.4 [Updateable]
Adapter    "hm-rega"       : 0.1.17   , installed 0.1.17
Adapter    "history"       : 0.1.3    , installed 0.1.3
Adapter    "highcharts"    : 0.0.0
Adapter    "graphite"      : 0.1.0
Adapter    "geofency"
Adapter    "example"       : 0.1.1    , installed 0.1.1
Adapter    "email"         : 0.1.0
Adapter    "dwd"           : 0.1.7    , installed 0.1.7
Adapter    "cul"           : 0.0.2    , installed 0.0.3
Adapter    "b-control-em"  : 0.1.1
Adapter    "artnet"        : 0.0.3
Adapter    "admin"         : 0.3.21   , installed 0.3.20 [Updateable]
```

Dieser Befehl ändert nichts, aktualisiert lediglich die internen Informationen zur verfügbaren Adapterversion und zeigt sie an.

Um nur aktualisierbare Adapter anzuzeigen, verwenden Sie den Filter "--updatable".

## Iobroker-Upgrade
Vollständige Syntax: ```iobroker upgrade \[repository url\]```

Aktualisiert alle Adapter (nicht js-Controller), wenn sie mit einer neueren Version im angegebenen Repository verfügbar sind. Wenn keine Repository-Verknüpfung angegeben ist, wird das konfigurierte Repository verwendet.

Verwendungszweck:

- `` Iobroker Upgrade`` - alle Adapter aufrüsten.
- `` `Iobroker-Upgrade https:// raw.githubusercontent.com / ioBroker / ioBroker.js-controller / master / conf / sources-dist.json``` - Aktualisieren Sie alle Adapter aus dem Online-Repository

## Iobroker-Upgrade selbst
Vollständige Syntax: ```iobroker upgrade self \[repository url\]```

Dieser Befehl aktualisiert den ioBroker.js-Controller auf die Version, die sich im Repository befindet.

** Hinweis: ** Wenn das angegebene oder konfigurierte Repository eine niedrigere Version hat, wird es auf diese Version heruntergestuft.

- `` Iobroker Upgrade Self``` - Rüsten Sie den js-Controller auf die Version im konfigurierten Repository auf.
- `` `Iobroker-Upgrade selbst https:// raw.githubusercontent.com / ioBroker / ioBroker.js-controller / master / conf / sources-dist.json``` - Aktualisieren Sie den js-controller von online-Repository auf die Version.

## Iobroker upgrade adapterName
Vollständige Syntax: ```iobroker upgrade adapterName \[repository url\]```

Dieser Befehl aktualisiert den angegebenen Adapter auf die Version, die sich im Repository befindet.

** Hinweis: ** Wenn das angegebene oder konfigurierte Repository eine niedrigere Version hat, wird es auf diese Version heruntergestuft.

- `` Iobroker Upgrade Email``` - Upgrade des ioBroker.email-Adapters auf die Version im konfigurierten Repository.
- `` `Iobroker-Upgrade-E-Mail https:// raw.githubusercontent.com / ioBroker / ioBroker.js-controller / master / conf / sources-dist.json``` - Upgrade des ioBroker.email-Adapters auf die Version vom Online-Repository .

## Iobroker object erhalten
Vollständige Syntax: ```iobroker get objectId```

Liest von der Befehlszeile die Beschreibung des Objekts: C: \ pWork> Iobroker-Objekt get system.adapter.admin.0.uptime

```
>./iobroker object get system.adapter.admin.0.uptime
{
  "_id":"system.adapter.admin.0.uptime",
  "type":"state",
  "common":{"name":"admin.0.uptime","type":"number","role":"indicator.state","unit":"seconds"},
  "native":{}
}
```

** Hinweis: ** Normalerweise wird die Ausgabe nicht formatiert, aber Sie können das Flag "--pretty" verwenden, um sie zu formatieren.

## Iobroker object chmod
Format: ```iobroker object chmod <object-mode> [state-mode] <id>```

ID kann ein Muster mit '\ *' sein. '\ *' kann nur am Ende des Musters sein.

## Iobroker object chown
Format: ```iobroker object chown <user> <group> <id>```

ID kann ein Muster mit '\ *' sein. '\ *' kann nur am Ende des Musters sein.

## Iobroker-Objektliste
Format: ```iobroker object list <id>```

Listenberechtigungen von Objekten, wie:

```
>iobroker object list system.adapter.admin.*

ObjectAC | StateAC |     User     |     Group    | ID
---------+---------+--------------+--------------+--------------
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.uptime
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.memRss
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.memHeapTotal
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.memHeapUsed
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.connected
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.alive
rw-r--r--                    admin  administrator system.adapter.admin.0
```

ID kann ein Muster mit '\ *' sein. '\ *' kann nur am Ende des Musters sein.

## Iobroker gesetzt
Vollständige Syntax: ```iobroker set <instance> [--port value] [--enabled true|false] [--ip address] [--auth true|false] [--ssl true|false] [—-ttl value]``` Zum Ändern von Instanzeinstellungen von der Konsole aus. Folgende Einstellungen können geändert werden:

- Port - Port ändern, an den die Instanz gebunden ist
- aktiviert - Aktivieren / Deaktivieren der Instanz (Kann auch mit `` `` Iobroker Start | Stopp <Instanz> `` `durchgeführt werden)
- ip - Gebundene IP-Adresse ändern
- auth - Authentifizierung aktivieren oder deaktivieren
- ssl - SSL-Protokoll ein- oder ausschalten
- TTL - Login Timeout in Sekunden

## Iobroker state erhalten
Vollständige Syntax: ```iobroker state get stateId``` JSON-Wert des Staates lesen:

```
>./iobroker state get system.adapter.admin.0.uptime
{"val":496,"ack":true,"ts":1425925626,"from":"system.adapter.admin.0","lc":1425925626}
```

Sie können das Flag "--pretty" verwenden, um die Ausgabe zu formatieren:

```
>./iobroker state get system.adapter.admin.0.uptime --pretty
{
  "val": 496,
  "ack": true,
  "ts": 1425925626,
  "from": "system.adapter.admin.0",
  "lc": 1425925626
}
```

## Iobroker state getplain
Vollständige Syntax: ```iobroker state getplain stateId```

Lesen Sie den einfachen Wert des Status als Listenattribute:

```
>./iobroker state getplain system.adapter.admin.0.uptime
571
true
system.adapter.admin.0
1425925701
1425925701
```

## Iobroker state getvalue
Vollständige Syntax: ```iobroker state getvalue stateId```

Lesen Sie den einfachen Wert des Status als Listenattribute:

```
>./iobroker state getvalue system.adapter.admin.0.uptime
571
```

## Iobroker-Status eingestellt
Vollständige Syntax: ```iobroker state set stateId newValue ack```

Stellen Sie den Wert des Zustands ein. "ack ist standardmäßig = false.

```>iobroker state set sayit.0.tts.text "Текст сказать"```

```>iobroker state set adapter.0.states.temperature 28.5 true```

Wenn die ID falsch ist, wird keine Fehlermeldung angezeigt.

## Iobroker state del
Vollständige Syntax: ```iobroker state del stateId```

Entferne den Zustand.

## Iobroker Nachricht
Vollständige Syntax: ```iobroker message adapter.instance command message```

Senden Sie eine Nachricht an die angegebene Adapterinstanz oder alle Instanzen des Adapters, wenn keine Instanz festgelegt ist.

## Iobroker sauber
Bereinigt alle Einstellungen von ioBroker. **Sie können die Einstellungen nicht wiederherstellen, wenn Sie diesen Befehl aufrufen.**

```
>iobroker clean yes
Deleted 205 objects.
Restarting ioBroker...
```

## Iobroker-backup
Sicherungseinstellungen von ioBroker in einer ZIP-Datei. Sicherungsdateien werden im Verzeichnis _backups_ erstellt und haben Namen:

```2015_02_10-17_49_45_backupIoBroker.tar.gz``` with current date and time.

**Note:** not yet finished

## iobroker restore
Full syntax: ```iobroker restore <backup name or path>```

Wenn einige Sicherungen mit dem Befehl ```iobroker backup``` erstellt wurden, können sie wiederhergestellt werden. Wenn Sie restore ohne Parameter aufrufen, erhalten Sie eine Liste der verfügbaren Sicherungen.

```
/>iobroker restore
Please specify one of the backup names:
   2015_07_18-12_20_28_backupIoBroker.tar.gz or 2015_07_18-12_20_28 or 0
   2015_07_17-21_54_01_backupIoBroker.tar.gz or 2015_07_17-21_54_01 or 1
```

Sie können ```iobroker restore 0``` aufrufen, um die neueste Sicherungsdatei oder einen anderen Index zu verwenden.
Die folgenden Befehle sind für das angegebene Beispiel gleich:

- iobroker restore 0
- iobroker 2015_07_18-12_20_28
- iobroker 2015_07_17-21_54_01_backupioBroker.tar.gz
- iobroker /opt/iobroker/backups/2015_07_17-21_54_01_backupioBroker.tar.gz

Alle Adapter werden außer "admin" als deaktiviert wiederhergestellt. Um alle Adapter gleichzeitig zu aktivieren, können Sie "iobroker start all" aufrufen. Wenn einige Adapter nicht hochgeladen werden, können Sie "iobroker upload all" anrufen, um alle Adapterdateien gleichzeitig hochzuladen.

## Iobroker-Host
Ändern Sie den Hostnamen in den Objekten.

Manchmal muss durch Verschieben der Iobroker-Daten von einem System auf ein anderes der Hostname geändert werden. Mit diesem Befehl kann es ausgeführt werden.

Sie müssen ioBroker vorher stoppen.

Um einen bestimmten Hostnamen in der DB in den aktuellen Hostnamen zu ändern, schreiben Sie §§JJJJJ0, §§.

Um einen beliebigen Hostnamen zu ändern (darf nur ein Hostsystem sein, nicht für Multihosts), schreiben Sie ```iobroker host this```.

## Iobroker-Hostsatz
Sie können den Hostnamen in einen bestimmten Namen ändern (nicht den Computernamen). Dazu müssen Sie schreiben: ```iobroker host set newHostName```, um den tatsächlichen Computernamen oder den zuvor angegebenen Hostnamen umzubenennen.

## Iobroker host entfernen
Um den Host zu löschen, schreiben Sie einfach ```iobroker host remove hostNameToRemove```. Bitte seien Sie damit vorsichtig.

## Iobroker liste
Mit diesem Befehl können verschiedene Objekttypen und Zustände in ioBroker angezeigt werden. Beispiele:

- `` `iobroker list objects hm-rega.0``` - zeigt alle Objekte der Instanz hm-rega.0
- `` `iobroker list states hm-rega.0``` - Zeigt alle Zustände der Instanz hm-rega.0 an
- `` `iobroker list files vis.0``` - zeigt alle Dateien der Instanz vis.0 an
- `` Iobroker-Listeninstanzen``` - alle Instanzen anzeigen
- `` `iobroker list adapters``` - zeige alle Adapter
- `` iobroker list users``` - alle Benutzer anzeigen
- `` iobroker list groups``` - alle Gruppen anzeigen
- `` iobroker list enums``` - zeigt alle enums
- `` iobroker list hosts``` - alle Hosts anzeigen

Es ist möglich, kurze Typenbezeichnungen zu verwenden:

- o - Objekte
- s - Zustände
- U - Benutzer
- e - enums
- g - Gruppen
- Ich - Instanzen
- f - Dateien
- h - Gastgeber

Z.B. ```iobroker l u``` - Alle Benutzer auflisten.

Mit den "Listeninstanzen" können Sie zusätzliche Filter verwenden:

- enabled - listet alle aktivierten Instanzen auf
- disabled - Listet alle deaktivierten Instanzen auf
- port - Listet alle Instanzen mit Port auf
- ip - listet alle Instanzen auf, die an eine bestimmte IP-Adresse gebunden werden können
- ssl - listet alle Instanzen auf, in denen SSL aktiviert werden kann

Mit: ```iobroker list instacnes --enabled``` werden alle aktivierten Instanzen aufgelistet

oder ```iobroker l i --port```, um die verwendeten Ports aufzulisten.

## Iobroker adduser
Mit diesem Befehl können Sie einen neuen Benutzer erstellen (standardmäßig in der Gruppe "Administrator"). Die Gruppe kann im Befehl mit dem Parameter "--ingroup" definiert werden. Wenn das Kennwort nicht angegeben ist, muss es über die Konsole eingegeben werden.
Z.B. Benutzer "Martin" in der Gruppe "Benutzer" anlegen:

```iobroker adduser martin --group user```

Benutzer mit Passwort erstellen:

```iobroker adduser martin --group user --password 12345```

## Iobroker deluser
Um einen vorhandenen Benutzer zu löschen, rufen Sie an:

```iobroker deluser username```

Der Benutzer wird automatisch aus allen Gruppen gelöscht. "admin" Benutzer kann nicht gelöscht werden.

## Iobroker passwd
So ändern Sie das Passwort eines bestehenden Benutzeranrufs:

```iobroker passwd username```

Sie werden aufgefordert, das Passwort einzugeben und das Passwort zu wiederholen.
Wenn keine Konsoleninteraktion gewünscht wird, rufen Sie Folgendes auf:

```iobroker passwd username --password newPassword```

## Iobroker chmod
Dateimodus ändern

## Iobroker chown
Dateieigentümer ändern

## Iobroker Datei gelesen
Lesen Sie die Datei aus der Datenbank und speichern Sie sie im lokalen Dateisystem.
Verwendungszweck:

```iobroker file read <fileToRead> [storeFile]```

storeFile ist optional, kann jedoch der Pfad zum Verzeichnis oder zur neuen Datei sein.

Beispiel:

```iobroker file read /vis.0/main/img/picture.png /opt/myfile.png```

„File“ und „read“ können zu „fr“ verkürzt werden.

## Iobroker Datei schreiben
Datei vom lokalen Dateisystem in die DB schreiben.
Verwendungszweck:

```iobroker file write <fileToRead> <storeFile>```

storeFile kann ein Pfad zum Verzeichnis in DB oder ein vollständiger Name sein

Beispiel: iobroker file write /opt/myfile.png /vis.0/main/img/picture.png

„File“ und „write“ können zu „f w“ gekürzt werden.

## Iobroker version
Zeigt die Version des Adapters oder des js-Controllers an.

Version des js-Controllers:

```
>iobroker version
0.11.2
>iobroker -v
0.11.2
>iobroker --version
0.11.2
```

Version des Admin-Adapters:

```
>iobroker version admin
1.5.4
>iobroker admin -v
1.5.4
>iobroker admin --version
1.5.4
```

## Iobroker uuid
UUID dieser ioBroker-Installation anzeigen.

```
>iobroker uuid
8f73s7c9-2fd6-3066-189a-cccccccccc
```

## Iobroker-Status
Wenn ioBroker läuft oder nicht.

## Iobroker repo
Konfigurierte Repositorys anzeigen oder eines auswählen.

```
C:\ioBroker>ioBroker repo
default: conf/sources-dist.json
online: https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json
fast: http://download.iobroker.net/sources-dist.json

Active repo: fast
```

```
C:\ioBroker>ioBroker repo default
default: conf/sources-dist.json
online: https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json
fast: http://download.iobroker.net/sources-dist.json

Active repo: default
```

## Iobroker info
Sammeln Sie Informationen zu diesem Host.

```
Platform       : Windows
Architecture   : x64
CPUs           : 4
Speed          : 2496 MHz
Model          : Intel(R) Core(TM) i7-7660U CPU @ 2.50GHz
RAM            : 15.9 GB
System uptime  : 13d. 13:18:04
Node.js        : v8.11.1
adapters count : 176
Disk size      : 949.9 GiB
Disk free      : 813.3 GiB
NPM            : v5.8.0
```