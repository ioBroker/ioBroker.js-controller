# Die Redis-Datenbank für IoBroker

Bei Redis handelt es sich um eine Open Source In-Memory-Datenbank. 
Nähere Informationen dazu findet man unter https://redis.io/

Der große Vorteil von Redis:

Redis bietet verglichen mit den internen ioBroker-Datenbanken vor allem Vorteile in den Bereichen Datenzugriffsgeschwindigkeit,
IO-Management im Dateisystem und bessere Nutzung von CPU-Ressourcen.
Der js-controller wird entlastet. Ein vorher träges System kann wieder schneller werden.
Wichtig ist allerdings das genügend RAM verfügbar ist, da Redis alle Daten im RAM behält. Je nachdem was genau alles im Redis gespeichert wird, liegt der RAM Bedarf bei wenigen MB (z.B. wenn nur States im Redis liegen) bis zu über 200 MB (wenn z.B. auch Objekte und Files dort gespeichert sind).

## Redis FAQ

1. Brauche ich Redis für meinen ioBroker oder nicht?
Für alle üblichen Installationen reichen normalerweise die ioBroker-eigenen Datenbanken vollkommen aus!
Erst wenn der js-controller dauerhaft 50-70% oder mehr CPU braucht und sich das System gleichzeitig träge anfühlt,
kann es Sinn machen sich mit dem Thema Redis zu beschäftigen.
Alternativ wird es nötig wenn man ein hochverfügbares ioBroker System anstrebt, aber dazu sind noch einige Dinge mehr nötig.

2. Wie finde ich heraus ob ich Redis nutze oder nicht?
Da auch die ioBroker eigenen Datenbanken das Redis-Protokoll für die Kommunikation nutzen, kann es manchmal verwirren, wenn man im Log etwas von Redis liest. So lange dabei aber Port 9000/9001 genannt sind deutet auf die interne Datenbank hin und hat nichts mit der externen Redis Datenbank zu tun.
Ein Aufruf von `iobroker status` zeigt an, welcher Datenbanktyp für die States- und Objects-Datenbanken verwendet werden.
"file" bedeutet das die ioBroker eigenen Datenbanken genutzt werden. "redis" bedeutet das ein Redis im Einsatz ist.


Eine detailierte Erläuterung zum Thema Redis mit weiteren Informationen,
findet man im [Forum](https://forum.iobroker.net/topic/26327/redis-in-iobroker-%C3%BCberblick)

## Redis Persistenz

Normalerweise ist Redis eine "In-Speicher-Datenbank". Die Daten lagern also, im RAM. Wenn Redis beendet wird sind diese weg.
Um aber auch ein Update zu ermöglichen, unterstützt Redis zwei Arten der Datenspeicherung auf Festplatte.
Die RDB- und AOF Persistenz.

**RDB** ist standardmäßig aktiv, diese Methode speichert den gesamten Inhalt in eine RDB Datei. Der Intervall der Speicherung kann konfigiert werden und sollte auf die eigenen bedürfnisse angepasst werden!
Dies zu konfigurieren sollte eine Mischung aus Datensicherheit (wie viele Daten kann man verkraften bei einem Crash zu verlieren) und Schreiblast für das Speichermedium, da immer der gesamte Inhalt geschrieben wird (wenn auch Objekte im Redis liegen sind das ggf mehrere hundert MB!).

**AOF** stellt jedoch sicher, dass die Daten ganz aktuell sind.
Dazu wird fortlaufend eine sog. AOF Datei geschrieben, wo alle Änderungen immer angehängt werden. In regelmäßigen Abständen wird diese Datei dann konsolidiert und verkleinert sich damit wieder. Wie die finale Schreiblast genau ist, und ob das ganze damit für SD Karten gut ist oder eher nicht, hängt davon ab welche Daten gespeichert werden. Wenn Objekte und Files auch im Redis liegen ist das anhängen und seltene konsolidieren pot. deutlich "sparsamer" als das regelmässige speichern grosser Datenmengen.
Wie oben schon erwähnt, wird dadurch mehr Ram benötigt. Falls dieser RAM mal nicht verfügbar ist,
läuft - je nach Einstellungen - alles problemlos weiter.
Ein Backup der Daten wird dann allerdings nicht erzeugt! Entsprechende Meldungen stehen nur im Logfile.

Mehr Details zur Persistenz gibt es unter https://redis.io/topics/persistence

**Redis Slaves**, also einen zweiten Redis-Server, ist eine weitere Möglichkeit immer aktuelle Daten als Sicherung zu haben.
Wenn der Rechner mit dem Master-Redis defekt ist, existieren immer noch die Daten nahezu Echtzeit-aktuell auf dem Slave.
Man kann diesen also nutzen um einen Dump zu erstellen um den Master neu aufzusetzen, oder man macht als schnelle Lösung den Slave zum Master und ändert die Datenbank-IPs im ioBroker und ist fast aktuell wieder online. Auch dieses findet man etwas detailierter im [Forum](https://forum.iobroker.net/topic/26327/redis-in-iobroker-%C3%BCberblick) bzw unter https://raw.githubusercontent.com/antirez/redis/5.0/redis.conf

**Ein Slave schützt allerdings nicht gegen das versehentliche Löschen von Daten, da diese auf dem Slave auch direkt danach gelöscht sind. Hier helfen nur Backups.**

## Installation von Redis

Redis muss als eigener Dienst installiert und konfiguriert werden und auch die Daten sollten beim Backup entsprechend berücksichtigt werden.
Die persistierten Datenbanken werden in Form von JSON-Dateien im "iobroker-data"-Ordner gespeichert.
Die Installation erfolgt auf der Komanndozeile für

**Debian**

```sh
sudo apt update   
sudo apt install redis
```



**Ubuntu**

```sh
sudo add-apt-repository ppa:chris-lea/redis-server  
sudo apt-get update  
sudo apt-get install redis-server
```

**Achtung**: Für Windows gibt es keine offiziellen Redis-Builds.

## Redis einrichten

Prüfen kann man mittels `sudo systemctl status redis-server`.
Falls es bei einem Reboot nicht automatisch wieder startet hilft ein `sudo systemctl enable redis-server`.
Redis nutzt standardmäßig Port 6379 und bringt auch ein Kommandozeilentool für den Zugriff zur Datenbank mit: `redis-cli` öffnet eine Shell.
Der Befehl `info` zeigt einige Informationen zum System, Speicherverbrauch und zu den gespeicherten Daten ("Keyspace") an, der natürlich aktuell noch leer ist.

Wenn man ein Single-Host -System betreibt bzw. ioBroker auf dem gleichen Host läuft, dann war es das auch schon.


Falls auch andere Hosts auf diesen Redis-Server zugreifen sollen (Slaves oder so), dann muss dies noch erlaubt werden.
Dazu muss /etc/redis/redis.conf editiert werden und die Zeile **bind 127.0.0.1** zu **bind 0.0.0.0** geändert werden und direkt darunter der **protected_mode** auf **no** gesetzt werden.

Danach startet `sudo systemctl restart redis-server` den Server mit der aktualisierten Konfiguration neu.

Nähere Details siehe [Multihost](https://www.iobroker.net/#de/documentation/config/multihost.md)



## ioBroker Datenbank auf Redis umstellen

Die meisten Änderungen und Datenabfragen finden mit der States-Datenbank statt. Alle Datenänderungen kommen hier an und werden dann wieder auf Adapter verteilt,
wenn diese sich für bestimmte Daten angemeldet haben.
Eine Umstellung der States auf Redis hat damit mit Abstand den größten und spürbarsten Performance-Effekt.
Wer nur die States-Datenbank umstellt, sollte den Redis-Server idealerweise auf dem gleichen Host installieren wie den ioBroker-Master.

Die Umstellung der "States" erfolgt dann über:

```sh
iobroker stop  
iobroker setup custom
```


Für die "Objects" die aktuellen Einstellungen bestätigen ("file" als Typ, IP, Port 9001) und
bei "States" jetzt als Typ "redis", die IP des Redis-Hostservers (bzw. 127.0.01 wenn auf dem gleichen Host) und 6379 als Port einstellen.
Damit man nicht alle State-Daten verliert bietet es sich an die Daten zu migrieren, was die nächsten Fragen bei der Konfiguration abfragen.
Nach der Migration kann ioBroker mit **iobroker start** neu gestartet werden. Falls man auch Slave-Systeme einsetzt,
so müssen dort überall die gleichen Einstellungen über **iobroker setup custom** vorgenommen werden.
Allerdings ist die Frage nach der Migration zu verneinen!


Wer ebenfalls "Objects" umstellen möchte, geht genaus vor und wählt entsprechend den Typ "redis", IP und Port des Redis-Hosts eingeben und ggf. die Daten migrieren,
was je nach Grösse allerdings eine ganze Weile dauern kann.


**States und Objekte im gleichen oder getrennten Redis-Prozessen?**

Am einfachsten ist es natürlich, States und Objekte zusammen in einem Redis-Prozess speichern zu lassen.
Dies bedeutet allerdings auch das nur alle Daten zusammen gesichert werden können.
Bei der ioBroker File-DB waren States, Objekte und Files getrennt und konnten so selektiv gesichert werden.
Auch die Schreiblast ist, wenn alles in einem Redis gespeichert ist, höher, da die Datenbank größer ist.
Um auch mit einem Redis-Setup, die sich oft ändernden States und nicht so oft geänderten Objekte und Dateien zu trennen, kann man einfach zwei Redis-Prozesse je Host nutzen.
Anleitungen dazu gibt es z.B. unter https://gist.github.com/inecmc/f40ca0ee622e86999d9aa016c1b15e8c .

Bei `iobroker setup custom` werden einfach die jeweiligen unterschiedlichen Ports für States bzw. Objekte/Dateien angegeben.

Für States ist es empfohlen eher eine RDB Persistenz zu nutzen die dann je nach ANzahl der Änderungen alle 5-15 Minuten die Daten sichert. Für Objects/Files bietet sich eher die AOF Persistenz zur Minimierung der Schreiblast an.

## Backup

Redis speichert seine Dateien üblicherweise unter /var/lib/redis. Das dort liegenden dump.rdb bzw. appendonly.aof (je nach gewählter Persistenz) kann gespeichert werden. Man kann auch per `redis-cli BGSAVE` direkt vor dem Backup ein dump.rdb erzeugen lassen und dieses dann wegsichern.

