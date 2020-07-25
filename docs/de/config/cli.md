# Konsolenbefehle
Einige Befehle wie z.B. starten, stoppen oder aktualisieren können über die Konsole (Windows bzw. Linux) ausgeführt werden.

***Hinweis:*** Alle Befehle, die mit ```iobroker``` beginnen, können von jedem Verzeichnis aus aufgerufen werden. 
Der Befehl ```npm install``` muss jedoch im ioBroker-Stammverzeichnis ausgeführt werden.

Befehlsübersicht:

- [npm install iobroker.adapterName](#npm-install-iobrokeradaptername)
- [iobroker start](#iobroker-start)
- [iobroker stop](#iobroker-stop)
- [iobroker restart](#iobroker-restart)
- [iobroker isrun](#iobroker-isrun)
- [iobroker start adapterName.instance](#iobroker-start-adapternameinstance)
- [iobroker stop adapterName.instance](#iobroker-stop-adapternameinstance)
- [iobroker restart adapterName.instance](#iobroker-restart-adapternameinstance)
- [iobroker add adapterName](#iobroker-add-adaptername)
- [iobroker install adapterName](#iobroker-install-adaptername)
- [iobroker upload adapterName](#iobroker-upload-adaptername)
- [iobroker setup](#iobroker-setup)
- [iobroker del adapterName](#iobroker-del-adaptername)
- [iobroker del adapterName.instance](#iobroker-del-adapternameinstance)
- [iobroker update](#iobroker-update)
- [iobroker upgrade](#iobroker-upgrade)
- [iobroker upgrade self](#iobroker-upgrade-self)
- [iobroker upgrade adapterName](#iobroker-upgrade-adaptername)
- [iobroker object get objectId](#iobroker-object-get)
- [iobroker object chmod](#iobroker-object-chmod)
- [iobroker object chown](#iobroker-object-chown)
- [iobroker object list](#iobroker-object-list)
- [Iobroker set](#iobroker-set)
- [iobroker state get](#iobroker-state-get)
- [iobroker state getplain](#iobroker-state-getplain)
- [iobroker state getvalue](#iobroker-state-getvalue)
- [iobroker state set](#iobroker-state-set)
- [iobroker state del](#iobroker-state-del)
- [iobroker message](#iobroker-message)
- [iobroker setup](#iobroker-setup)
- [iobroker clean](#iobroker-clean)
- [iobroker backup](#iobroker-backup)
- [iobroker host](#iobroker-host)
- [Iobroker host set](#iobroker-host-set)
- [iobroker host remove](#iobroker-host-remove)
- [iobroker restore](#iobroker-restore)
- [iobroker list ](#iobroker-list)
- [iobroker chmod](#iobroker-chmod)
- [iobroker chown](#iobroker-chown)
- [iobroker adduser](#iobroker-adduser)
- [iobroker deluser](#iobroker-deluser)
- [iobroker passwd](#iobroker-passwd)
- [iobroker file read](#iobroker-file-read)
- [iobroker file write](#iobroker-file-write)
- [iobroker version](#iobroker-version)
- [iobroker uuid](#iobroker-uuid)
- [iobroker status](#iobroker-status)
- [iobroker repo](#iobroker-repo)
- [iobroker info](#iobroker-info)
- [iobroker compact status](#iobroker-compact-status)
- [iobroker compact \[enable|disable|on|off\]](#iobroker-compact-enabledisableonoff)
- [iobroker compact adapterName.instance](#iobroker-compact-adapternameinstance)
- [iobroker cert create](#iobroker-cert-create)
- [iobroker logs \[--watch\]](#iobroker-logs)

***Hinweis:*** Mit dem Parameter ```--timeout 5000``` am Ende eines jeden Befehls kann ein Timeout (ms) für die Verbindung zur DB angegeben werden.

## npm install iobroker.adapterName
Dieser Befehl muss vom Stammverzeichnis des ioBroker aus aufgerufen werden (normalerweise ```/opt/iobroker``` oder ```C:\Program Files\ioBroker```). Mit dem npm-Manager können bestimmte Adapter und der js-Controller installiert oder aktualisiert werden. Es funktioniert immer, auch wenn der "admin" oder "js-Controller" Probleme hat.

Anwendungsbeispiele:

- ```npm install iobroker.admin``` - aktualisiert oder installiert den "admin" -Adapter
- ```npm install iobroker.js-controller``` - aktualisiert oder installiert den js-controller selbst
- ```npm installiere https://github.com/husky-koglhof/ioBroker.hmm/tarball/master/``` - installiert diesen Adapter direkt von github oder von einem anderen Ort aus. Es muss ein ZIP- oder GZ-Paket sein und muss package.json enthalten.

Damit die Änderungen wirksam werden sollte nach dem Aufruf von ```npm install ..``` der Neustart des angegebenen Adapters oder des gesamten js-Controllers durchgeführt werden, .

Dies kann mit ```iobroker restart adapterName``` oder nur mit ```iobroker restart``` erfolgen. Für Einzelheiten siehe [iobroker restart](#iobroker-restart).

***Hinweis:*** Nur Pakete mit dem Namen **ioBroker.zzz** können so installiert werden.

## iobroker start
Startet Iobroker als Daemon. Wenn der ioBroker bereits gestartet ist, erscheint die Warnung:

```ioBroker controller daemon already running. PID: xx```

***Hinweis für Windows:*** ioBroker wird unter Windows als Dienst gestartet. Der Befehl ```iobroker start``` startet eine zweite Instanz von ioBroker und dies führt hier zu Konflikten. 
Stattdessen mit Administratorrechten im ioBroker-Verzeichnis den Befehl ```serviceIoBroker.bat start``` ausführen um den Dienst zu starten.

## iobroker stop
Stoppt IoBroker, wenn er als Dämon ausgeführt wird. Wenn der ioBroker nicht gestartet war, erscheint die Warnung:

```ioBroker controller daemon is not running```

***Hinweis für Windows:*** ioBroker wird unter Windows als Dienst gestartet. Der Befehl ```iobroker stop``` funktioniert hier nicht. Stattdessen mit Administratorrechten im ioBroker-Verzeichnis den Befehl ```serviceIoBroker.bat stop``` ausführen um den Dienst zu beenden.

## iobroker restart
Führt die Befehle ```iobroker stop``` und ```iobroker start``` nacheinander aus.

## iobroker isrun
Gibt aus ob ioBroker läuft oder nicht. Wenn ioBroker nicht gestartet ist, lautet der Ausgabecode 100.

Gleich Funktion wie ```iobroker status```.

## iobroker start adapterName.instance
Startet die Instanz des angegebenen Adapters. Falls die Instanz bereits läuft wird sie neu gestartet.

Beispiel:

- ```iobroker start email.0``` - aktiviert und startet den email Adapter mit der Instanz 0

***Hinweis:*** Mit ```iobroker start all``` werden alle deaktivierten Instanzen gestartet, z.B. nach einer Systemwiederherstellung.

## iobroker stop adapterName.instance
Stoppt die Instanz des angegebenen Adapters.

Beispiel:

- ``` Iobroker stop email.0``` - stoppt den email Adapter mit der Instanz 0

## iobroker restart adapterName.instance
Startet die Instanz des angegebenen Adapter neu. Wenn die Instanz deaktiviert war, wird sie aktiviert.

## iobroker add adapterName
Die vollständige Syntax lautet ```iobroker add adapterName [desiredInstanceNumber] [--enabled] [--host \<host\>] [--port \<port\>]```

Falls nicht installiert wird eine Instanz des angegebenen Adapters mit der Bezeichnung adaptername.0 installiert. Wenn die Instanz des Adapters bereits vorhanden ist, wird die nächsthöhere Instanznummer verwendet.

Parameter:

- enabled: Die Adapterinstanz wird nach der Erstellung automatisch aktiviert. Andernfalls wird der vom Adapter vordefinierte Wert dafür verwendet.
- host: Name des Hosts auf dem die Adapterinstanz erstellt werden soll. Die Liste der verfügbaren Hosts kann mit dem Befehl ```iobroker list hosts``` abgefragt werden.
- port: Hier wird der gewünschte Port eingestellt. Bei normaler Installtion ist dies nicht notwendig, da der native port des Adapters verwendet wird.
- desiredInstanceNumber: Hiermit wird die gewünschte ID der Instanz vergeben.

Beipiel:

- ```iobroker add dwd``` - Installiert und erstellt eine Instanz des dwd-Adapters.
- ```iobroker add admin --enabled --port 80``` - Erstellt eine zweite (normalerweise ist admin.0 schon vorhanden) Instanz des Admin Adapters auf Port 80 und aktiviert sie.

Falls dies nicht funktioniert sollte, ist die Installation immer über den Befehl ```npm install iobroker.adapterName``` im ioBroker-Stammverzeichnis möglich. Falls keine Instanz erstellt wird, den Befehl ```iobroker add iobroker.adapterName``` noch einmal aufrufen.

## iobroker install adapterName
Installiert nur den Adapter ohne Instanz. Wenn der Adapter bereits installiert ist, erscheint die Warnung:

```adapter "admin" yet installed. Use "upgrade" to install newer version.```

## iobroker upload adapterName
Lädt Webseiten aus den Ordnern "www" und "admin" eines Adapters in den ioBroker-Dateispeicher hoch. Wird normalerweise von Entwicklern verwendet, um die Änderungen auf deren Konfigurationsseiten oder auf den "www" -Seiten anzuzeigen.
Die Dateien können nicht direkt in "iobroker/iobroker-data/adapter/file" geändert werden. 
In der Konfigurationsdatei (*iobroker-data/iobroker.json*) objects.noFileCache gibt es ein Flag für Entwickler, um den Cache der Datei zu deaktivieren. Wenn dieses Flag auf true gesetzt ist (nachdem die Konfigurationsdatei geändert wurde ist ein Neustart erforderlich), werden die Änderungen im iobroker-data-Verzeichnis ohne den Befehl ```iobroker upload adapterName``` im Web angezeigt.

***Hinweis:*** Mit ```iobroker upload all``` werden alle Adapter hochgeladen, z.B nach einer Systemwiederherstellung.

## iobroker setup
Dieser Befehl muss aufgerufen werden, wenn ioBroker nicht mit npm oder Windows Installer installiert wurde (z.B. von github kopiert und entpackt). Er erstellt die Standardkonfigurationsdatei und bereitet die Datenverzeichnisse vor.

```iobroker setup first``` - stellt sicher, dass nichts von einer bereits vorhandenen Konfiguration überschrieben wird.

## iobroker setup custom
Zur manuellen Einrichtung eines Multi-Host Systems muss dieser Befehl zuerst auf dem Master und dann auf den untergeordneten Systemen ausgeführt werden. Folgende Werte müssen nacheinander gesetzt werden:

<pre><code>Type of objects DB [file, couch, redis], default [file]:
Host of objects DB(file), default[127.0.0.1]: enter IP address of the main system
Port of objects DB(file), default[9001]:
Type of states DB [file, redis], default [file]:
Host of states DB (file), default[ip]:
Port of states DB (file), default[9000]:
</code></pre>
Mit ENTER wird der jeweilige Standarwert innerhalb der eckigen Klammern übernommen.

***Hinweis:*** derzeit wird nur *file* DB typen unterstützt. Port Änderungen setzt Sachkenntnis voraus.

***Hinweis:*** Die Firewall Einstellungen des Master Systems für die Standartports (9000/9001) prüfen.

## iobroker del adapterName
Entfernt alle Instanzen und Zustände dieses Adapters vollständig von ioBroker und löscht ihn von der Festplatte.

***Hinweis:*** Die Einstellungen der Adapterinstanzen können nach dem Löschen nicht wiederhergestellt werden.

Bespiel:
```iobroker del dwd``` - löscht alle Instanzen und Zustände des dwd Adapters.

## iobroker del adapterName.instance
Entfernt nur die angegebene Instanz dieses Adapters von ioBroker und löscht den Adapter aber **nicht** von der Festplatte.

***Hinweis:*** Die Einstellungen der Adapterinstanz können nach dem Löschen nicht wiederhergestellt werden.

Beispiel:
```iobroker del dwd.0``` - löscht Instanz 0 des dwd Adapters.

## iobroker update
Liest die Informationen gemäß dem im Admin Adapter eingestellten ioBroker-Repository aus und zeigt mögliche Updates an. Wenn ```\repository url\``` nachgestellt wird, werden die Informationen aus dem genannten Repository ausgelesen.
Dieser Befehl ändert nichts, aktualisiert lediglich die internen Informationen zu verfügbaren Adapterversionen und zeigt sie an.

Beispiel:
- ```iobroker update``` - Liste der verfügbaren Version des konfigurierten (normalerweise lokalen) Repositorys.
- ```iobroker update https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json``` - Listet verfügbare Versionen aus dem Online-Repository auf.
- ```iobroker update --updatable``` - Listet nur aktualisierbare Adapter auf

Ausgabebeispiel für ```iobroker update```:
```
>./iobroker.js update
update done
Adapter    "zwave"         : 0.1.0
Adapter    "yr"            : 0.1.2    , installed 0.1.2
Adapter    "web"           : 0.2.6    , installed 0.2.6
Adapter    "vis"           : 0.2.9    , installed 0.2.9
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
Adapter    "example"       : 0.1.1    , installed 0.1.1
Adapter    "email"         : 0.1.0
Adapter    "dwd"           : 0.1.7    , installed 0.1.7
Adapter    "cul"           : 0.0.2    , installed 0.0.3
Adapter    "b-control-em"  : 0.1.1
Adapter    "artnet"        : 0.0.3
Adapter    "admin"         : 0.3.21   , installed 0.3.20 [Updateable]
```

## iobroker upgrade
Aktualisiert alle Adapter (nicht js-Controller), wenn sie mit einer neueren Version im angegebenen Repository verfügbar sind. Wenn keine Repository-Verknüpfung angegeben ist, wird das im Admin Adapter konfigurierte Repository verwendet.

Beispiel:

- ```iobroker upgrade``` - alle Adapter aktualisieren.
- ```iobroker upgrade https:// raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json``` - Aktualisiert alle Adapter aus dem Online-Repository

## iobroker upgrade self
Dieser Befehl aktualisiert den ioBroker.js-Controller auf die sich im Repository zu findende Version.

***Hinweis:*** Wenn das angegebene oder konfigurierte Repository eine niedrigere Version hat, wird es auf diese Version heruntergestuft.

- ```iobroker upgrade self``` - aktualisiert den js-Controller auf die Version im konfigurierten Repository.
- ```iobroker upgrade self https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json``` - Aktualisiert den js-controller auf die Version des online-Repository.

## iobroker upgrade adapterName
Dieser Befehl aktualisiert den angegebenen Adapter auf die Version, die sich im Repository befindet.

***Hinweis:*** Wenn das angegebene oder konfigurierte Repository eine niedrigere Version hat, wird es auf diese Version heruntergestuft.

- ```iobroker upgrade email``` - Upgrade des ioBroker.email-Adapters auf die Version im konfigurierten Repository.
- ```iobroker upgrade email https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json``` - Upgrade des ioBroker.email-Adapters auf die Version vom Online-Repository .

## iobroker object get
Liest Wert einer Objekt ID aus. Beispiel ```iobroker object get system.adapter.admin.0.uptime``` gibt aus:

```
>./iobroker object get system.adapter.admin.0.uptime
{"_id":"system.adapter.admin.0.uptime","type":"state","common:{"name":"admin.0.uptime","type":"number","read":true,"write":false,"role":"indicator.state","unit":"seconds"},"native":{},"from":"system.host.ioBroker.cli","ts":1551895179193,"acl":{}}
```

Mit dem Flag "--pretty" wird die Ausgabe formatiert:
```
iobroker object get system.adapter.admin.0.uptime --pretty
{
  "_id": "system.adapter.admin.0.uptime",
  "type": "state",
  "common": {
    "name": "admin.0.uptime",
    "type": "number",
    "read": true,
    "write": false,
    "role": "indicator.state",
    "unit": "seconds"
  },
  "native": {},
  "from": "system.host.ioBroker.cli",
  "ts": 1551895179193,
  "acl": {}
}
```

## iobroker object chmod
Format: ```iobroker object chmod <object-mode> [state-mode] <id>```

ID kann ein Muster mit '\*' sein. '\*' kann nur am Ende des Musters sein.

## iobroker object chown
Format: ```iobroker object chown <user> <group> <id>```

ID kann ein Muster mit '\*' sein. '\*' kann nur am Ende des Musters sein.

## iobroker object list
Format: ```iobroker object list <objectid>```

Listenberechtigungen von Objekten, wie z.B.:

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

ID kann ein Muster mit '\*' sein. '\*' kann nur am Ende des Musters sein.

## iobroker set
Vollständige Syntax: ```iobroker set <instance> [--port value] [--enabled true|false] [--ip address] [--auth true|false] [--secure true|false] [—-ttl value]``` 

Zum Ändern von Instanzeinstellungen von der Konsole aus. Folgende Einstellungen können geändert werden:

- Port - Port ändern, an den die Instanz gebunden ist
- enabled - Aktivieren/Deaktivieren der Instanz (Kann auch mit ```iobroker start|stopp <Instanz>``` durchgeführt werden)
- ip - Gebundene IP-Adresse ändern
- auth - Authentifizierung aktivieren oder deaktivieren
- ssl - SSL-Protokoll ein- oder ausschalten
- TTL - Login Timeout in Sekunden

## iobroker state get
Vollständige Syntax: ```iobroker state get stateId``` 

Liest den JSON-Wert eines states aus:

```
>./iobroker state get system.adapter.admin.0.uptime
{"val":496,"ack":true,"ts":1425925626,"from":"system.adapter.admin.0","lc":1425925626}
```

Mit dem Flag "--pretty" wird die Ausgabe formatiert::

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

## iobroker state getplain
Vollständige Syntax: ```iobroker state getplain stateId```

Liest den JSON-Wert eines states als Listenattribut aus:

```
>./iobroker state getplain system.adapter.admin.0.uptime
571
true
system.adapter.admin.0
1425925701
1425925701
```

## iobroker state getvalue
Vollständige Syntax: ```iobroker state getvalue stateId```

Lesen Sie den einfachen Wert des Status als Listenattribute:

```
>./iobroker state getvalue system.adapter.admin.0.uptime
571
```

## iobroker state set
Vollständige Syntax: ```iobroker state set stateId newValue ack```

Setzt den Wert eines states. "ack" ist standardmäßig "false".

```>iobroker state set sayit.0.tts.text "Text"```

```>iobroker state set adapter.0.states.temperature 28.5 true```

***Hinweis:*** Bei falscher ID wird keine Fehlermeldung angezeigt.

## iobroker state del
Vollständige Syntax: ```iobroker state del stateId```

Löscht diesen state.

## iobroker message
Vollständige Syntax: ```iobroker message adapter.instance command message```

Sendet eine Nachricht an die angegebene Adapterinstanz oder alle Instanzen des Adapters, wenn keine Instanz festgelegt ist.

## iobroker clean
Bereinigt alle Einstellungen von ioBroker. ***Achtung: Die Einstellungen können danach nicht wiederhergestellt werden.***

```
>iobroker clean yes
Deleted 205 objects.
Restarting ioBroker...
```

## iobroker backup

***Hinweis:*** ioBroker muss vor Ausführung dieses Befehls gestoppt werden.

Sichert ioBroker als ZIP-Datei im Verzeichnis _backups_ und werden mit Datum und Zeit versehen:

```2015_02_10-17_49_45_backupIoBroker.tar.gz``` with current date and time.

## iobroker restore

***Hinweis:*** ioBroker muss vor Ausführung dieses Befehls gestoppt werden.

Full syntax: ```iobroker restore <backup name or path>```

Wenn Sicherungen mit dem Befehl ```iobroker backup``` erstellt wurden, können sie hiermit wiederhergestellt werden. Ohne Parameter aufgerufen wird eine Liste der verfügbaren Sicherungen ausgegeben.

```
/>iobroker restore
Please specify one of the backup names:
   2015_07_18-12_20_28_backupIoBroker.tar.gz or 2015_07_18-12_20_28 or 0
   2015_07_17-21_54_01_backupIoBroker.tar.gz or 2015_07_17-21_54_01 or 1
```

Mit ```iobroker restore 0``` wird die neueste Sicherungsdatei geladen.
Die folgenden Befehle sind für das angegebene Beispiel gleich:

- iobroker restore 0
- iobroker 2015_07_18-12_20_28
- iobroker 2015_07_17-21_54_01_backupioBroker.tar.gz
- iobroker /opt/iobroker/backups/2015_07_17-21_54_01_backupioBroker.tar.gz

Alle Adapter werden außer "admin" werden deaktiviert wiederhergestellt. Alle Adapter können gleichzeitig mit ```iobroker start all``` aktiviert werden. Falls einige Adapter nicht hochgeladen wurden, kann mit ```iobroker upload all``` um alle Adapterdateien gleichzeitig hochgeladen werden.

## iobroker host
Ändert den Hostnamen in den Objekten.

Manchmal muss durch Verschieben der ioBroker Daten von einem System auf ein anderes der Hostname geändert werden. Mit diesem Befehl kann es ausgeführt werden.

***Hinweis:*** ioBroker muss vor Ausführung dieses Befehls gestoppt werden.

Um einen bestimmten Hostnamen in der DB in den aktuellen Hostnamen zu ändern, schreiben Sie ```iobroker host oldHostName```.

Um einen beliebigen Hostnamen zu ändern (darf nur ein Hostsystem sein, nicht für Multihosts), schreiben Sie ```iobroker host this```.

## iobroker host set
Sie können den Hostnamen in einen bestimmten Namen ändern (nicht den Computernamen). Dazu müssen Sie schreiben: ```iobroker host set newHostName```, um den tatsächlichen Computernamen oder den zuvor angegebenen Hostnamen umzubenennen.

## iobroker host remove
Um den Host zu löschen, schreiben Sie einfach ```iobroker host remove hostNameToRemove```. Bitte seien Sie damit vorsichtig.

## iobroker list
Mit diesem Befehl können verschiedene Objekt-Typen und Zustände in ioBroker angezeigt werden. Beispiele:

- ```iobroker list objects hm-rega.0``` - zeigt alle Objekte der Instanz hm-rega.0
- ```iobroker list states hm-rega.0``` - Zeigt alle Zustände der Instanz hm-rega.0 an
- ```iobroker list files vis.0``` - zeigt alle Dateien der Instanz vis.0 an
- ```iobroker list instances``` - alle Instanzen anzeigen
- ```iobroker list adapters``` - zeige alle Adapter
- ```iobroker list users``` - alle Benutzer anzeigen
- ```iobroker list groups``` - alle Gruppen anzeigen
- ```iobroker list enums``` - zeigt alle Aufzählungen
- ```iobroker list hosts``` - alle Hosts anzeigen

Es ist möglich, kurze Typenbezeichnungen zu verwenden:

- o - Objekte
- s - States
- u - Benutzer
- e - Aufzählungen
- g - Gruppen
- i - Instanzen
- f - Dateien
- h - Gastgeber

Z.B. wird mit ```iobroker l u``` alle Benutzer aufgelistet.

Mit den "Listeninstanzen" können zusätzliche Filter verwendet werden:

- enabled - listet alle aktivierten Instanzen auf
- disabled - listet alle deaktivierten Instanzen auf
- port - listet alle Instanzen mit Port auf
- ip - listet alle Instanzen auf, die an eine bestimmte IP-Adresse gebunden werden können
- ssl - listet alle Instanzen auf, in denen SSL aktiviert werden kann

Mit ```iobroker list instances --enabled``` werden alle aktivierten Instanzen aufgelistet

oder mit ```iobroker l i --port``` werden die verwendeten Ports aufgelistet.

## iobroker adduser
Mit diesem Befehl kann ein neuer Benutzer erstellt werden (standardmäßig in der Gruppe "Administrator"). Die Gruppe kann im Befehl mit dem Parameter "--ingroup" definiert werden. Wenn das Kennwort nicht angegeben ist, muss es über die Konsole eingegeben werden.
Z.B. Benutzer "Martin" in der Gruppe "Benutzer" anlegen:

```iobroker adduser martin --group user```

Benutzer mit Passwort erstellen:

```iobroker adduser martin --group user --password 12345```

## iobroker deluser
Löscht einen vorhandenen Benutzer:

```iobroker deluser username```

Der Benutzer wird automatisch aus allen Gruppen gelöscht. "admin" Benutzer kann nicht gelöscht werden.

## iobroker passwd
Ändert das Passwort eines bestehenden Benutzers:

```iobroker passwd username```

Anschließend muss das Passwort eingeben und wiederholt werden.
Wenn keine Konsoleninteraktion gewünscht wird, das Passwort wie folgt mitgeben:

```iobroker passwd username --password newPassword```

## iobroker chmod
Dateimodus ändern

## iobroker chown
Dateieigentümer ändern

## iobroker file read
Liest eine Datei aus der Datenbank ein und speichert sie im lokalen Dateisystem.
Verwendungszweck:

```iobroker file read <fileToRead> [storeFile]```

storeFile ist optional, kann jedoch der Pfad zum Verzeichnis oder zur neuen Datei sein.

Beispiel:

```iobroker file read /vis.0/main/img/picture.png /opt/myfile.png```

file bzw. read kann mit f bzw. r abgekürzt werden.

## iobroker file write
Datei vom lokalen Dateisystem in die DB schreiben.
Verwendungszweck:

```iobroker file write <fileToRead> <storeFile>```

storeFile kann ein Pfad zum Verzeichnis in DB oder ein vollständiger Name sein

Beispiel: 

```iobroker file write /opt/myfile.png /vis.0/main/img/picture.png```

file bzw. write kann mit f bzw. w abgekürzt werden.

## iobroker version
Zeigt die Version eines Adapters oder des js-Controllers an.

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

## iobroker uuid
UUID dieser ioBroker-Installation anzeigen.

```
>iobroker uuid
8f73s7c9-2fd6-3066-189a-cccccccccc
```

## iobroker status
Zeigt an ob ioBroker läuft oder nicht.

## iobroker repo
Zeigt die im Admin Adapter konfigurierten Repositories an bzw. ändert das aktive Repository.

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

## iobroker info
Zeigt Informationen dieses Hosts.

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

## iobroker compact status
**Verfügbar seit js-controller 2.0.0**

Zeigt den Status des Compact-Mode für den aktuellen Host an.

```
Compact mode for this host is currently enabled
``` 

## iobroker compact [enable|disable|on|off]
**Verfügbar seit js-controller 2.0.0**

Erlaubt die Aktivierung oder Deaktivierung des Compact-Modus für den aktuellen Host. 
Hierbei wird zuerst der aktuelle Status ausgegeben und dann die durchgeführte Änderung.

```
Compact mode for this host is currently disabled

Compact mode for this host changed to enabled
```

Folgende Befehle sind möglich:
- `enable/on` - Compact-Modus für ioBroker aktivieren
- `disable/off` - Compact-Modus für ioBroker deaktivieren 

## iobroker compact adapterName.instance
**Verfügbar seit js-controller 2.0.0**

Dieser Befehl erlaubt die Compact-Modus Konfiguration einer Adapter-Instanz zu prüfen und zu ändern.
Es werden immer alle Einstellungen (siehe status) angezeigt inklusive der vorgenommenen Änderungen.
 

Alle Änderungen können auch bei laufendem ioBroker durchgeführt werden. Die Adapterinstanzen werden ggf neu gestartet.

Folgende Kombinationen stehen zur Verfügung:

### compact adapterName.instance status
Anzeige des aktuellen Status und der aktuellen Einstellungen der Instanz.

```
Compact mode supported: true
Compact mode enabled:   true
Compact group:          0
```

Bedeutung der Felder:
* Compact mode supported: Der Adapter unterstützt den Compact Mode generell
* Compact mode enabled: Diese Instanz wird im Compact Modus gestartet
* Compact group: Die Instanz wird in der Compact-Gruppe gestartet wie angegeben. 0 bedeutet "im Haupt-js-controller-Prozess dieses Hosts" (höheres Risiko, wenigster RAM Bedarf). >0 bedeutet jeweils ein eigener Host-Prozess (weniger Risiko, dafür etwas mehr RAM Bedarf)

### compact adapterName.instance group &lt;group-id&gt;

Setzt die Compact Mode Gruppe der Instanz

```
Compact mode supported: true
Compact mode enabled:   true
Compact group:          0 --> 1
Instance settings for "simple-api.0" are changed.
```

### compact adapterName.instance disable;

Deaktiviert den Compact Mode für die Instanz.
```
Compact mode supported: true
Compact mode enabled:   true --> false
Compact group:          1
Instance settings for "simple-api.0" are changed.
```

### compact adapterName.instance group enable [group-id]

Aktiviert den Compact Mode für die Instanz und setzt (optional) im gleichen Aufruf die Gruppe
```
Compact mode supported: true
Compact mode enabled:   false --> true
Compact group:          0 --> 1
Instance settings for "simple-api.0" are changed.
```

## iobroker cert create

Generiert ein neues SSL Zertifikat für die ioBroker Installation, trägt diese im System als Standardzertifikat ein und gibt Sie auch aus.

```
-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----

-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----
   
The object "system.certificates" was updated successfully.
```

## iobroker logs
Letzte Zeilen anzeigen und das ioBroker-Protokoll überwachen.

Dieser Befehl zeigt die letzten 1000 Protokollzeilen an und überwacht das Protokoll:

```iobroker logs --lines 1000```

Um das Protokoll zu überwachen, fügen Sie "--watch" hinzu, wie hier: 

```iobroker logs --lines 100 --watch```
