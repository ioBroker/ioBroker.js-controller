### Tipps & Tricks

*   [iobroker.js-controller reparieren](#repair)
*   [MySQL Umziehen](#MySQL)

* * *

## <a name="#repair"></a>iobroker.js-controller reparieren

Falls beim start von iobroker so was vorkommt: `root@ioBroker:/opt/iobroker# ./iobroker restart module.js:340 throw err; ^ Error: Cannot find module '/opt/iobroker/node_modules/iobroker.js-controller/iobroker.js' at Function.Module._resolveFilename (module.js:338:15) at Function.Module._load (module.js:280:25) at Function.Module.runMain (module.js:497:10) at startup (node.js:119:16) at node.js:901:3 root@ioBroker:/opt/iobroker#` aus der Konsole dann folgendes ausführen: `cd /opt/iobroker sudo iobroker stop sudo npm install iobroker.js-controller sudo chmod 777 * -R iobroker start` Es ist allgemein so, falls irgendein Adapter nicht anläuft und irgendwas nicht gefunden werden kann, dann kann man versuchen den Adapter so wiederherstellen: `cd /opt/iobroker sudo iobroker stop sudo npm install iobroker.<adapterName> sudo chmod 777 * -R iobroker start`

* * *

## <a name="#MySQL"></a>MySQL Umziehen

Von [forum.iobroker.net](http://forum.iobroker.net/viewtopic.php?f=23&t=1853).

*   Neuer Server vorbereiten: _mysql -uroot -p_ `CREATE USER 'iobroker‘@’%’ IDENTIFIED BY 'iobroker'; GRANT ALL PRIVILEGES ON * . * TO 'iobroker'@'%'; FLUSH PRIVILEGES;`
*   sicherstellen, das die DB von außen erreichbar ist (Stichwort bind in my.cnf)
*   sql.0 Adapter deaktivieren
*   DB umziehen: auf Server mit alter DB: `mysqldump --extended-insert --force --log-error=log.txt -uBenutzerAlt -pPasswortAlt --all-databases | ssh -C benutzer@neuerPi "mysql -uBenutzerNeu -pPasswortNeu"`
*   dann den alten SQL-Server (falls er nicht mehr gebraucht wird) stoppen `/etc/init.d/mysql stop`
*   und am neustarten hindern: `systemctl disable mysql`