---
title:       "ioBroker läuft nicht mehr"
lastChanged: "06.06.2019"
---


# ioBroker läuft nicht mehr


Es kommt oft im Forum, dass ioBroker nicht mehr läuft. Das ist aber eine Aussage, die genau so viel Information trägt, wie: mein Auto fährt nicht.

Dabei denkt man nicht, das es 1000 Gründe sein können, warum ein Auto nicht fährt: kein Kraftstoff, Batterie leer, Reifen platt und, und, und…

ioBroker ist sehr modular aufgebaut und man kann jedes Teil ziemlich einfach reparieren. Die Konfigurationsdateien sind aus dem Verzeichnis mit Node.js Paketen raus genommen und so lange, dass diese Konfigurations-Verzeichnis noch ganz ist, ist mit der ioBroker installation nichts ernsthaftes passiert.

Als erstes merkt man, dass ioBroker nicht läuft, wenn “admin” nicht läuft. Es gibt aber mehr oder weniger klarer Algorithmus, wie man checken kann, was kaputt ist.
Prüfen ob js-controller läuft:

**Linux:**
````
Linux: ps -A | grep iobroker
````

**Windows:**

Prüfen ob node.exe Prozess da ist in Prozess Explorer (alle Prozesse anzeigen)


Unter linux muss so was sichtbar sein:

```
pi@pi:~$ ps -A | grep iobroker
1807 ? 13:59:22 iobroker.js-con
```

Falls es nicht läuft, dann versuchen ioBroker zu starten mit

**Linux:**

```
cd /opt/iobroker
iobroker start
```

oder **Windows:**

```
cd C:\ioBroker
iobroker start
```


Falls es immer noch nicht läuft oder es kommen Fehlermeldungen, dann kann man versuchen den js-controller manuell zu starten.

```
cd /opt/iobroker
node node_modules/iobroker.js-controller/controller.js --logs
```

Falls Fehlermeldungen kommen, kann man versuchen “js-controller” upzudaten. 

Wenn der js-controller läuft, dann müssen die TCP Ports 9000 und 9001 belegt sein. Das kann man mit dem Kommando prüfen:

```
netstat -n -a -p TCP
```

Es müssen folgende Zeilen sichtbar sein:

```
TCP 0.0.0.0:9000 0.0.0.0:0 LISTENING
TCP 0.0.0.0:9001 0.0.0.0:0 LISTENING
```
 

Bei Verwendung von Redis sollte es so aussehen:

```
TCP 0.0.0.0:6379 0.0.0.0:0 LISTENING
TCP 0.0.0.0:9001 0.0.0.0:0 LISTENING
```
 

Falls nichts zu sehen ist (oder nur eine), dann sind vermutlich die Ports von anderen Programmen belegt. Man kann die Ports in */opt/iobroker/iobroker-data/iobroker.json* ändern. Oder ein anderes Programm umkonfigurieren.


## Ein Adapter oder js-controller neu installieren

Falls ein Adapter oder js-controller lief und nach dem Update nicht mehr, dann ist höchstwahrscheinlich bei dem Update was schief gelaufen. Man kann aber sehr einfach ein Adapter noch mal installieren. Dafür muss man nur in der Konsole schreiben:

```
cd /opt/iobroker
iobroker stop adapterName
npm install iobroker.adapterName
iobroker upload adapterName
iobroker start adapterName
```

Oder für den js-controller:

```
cd /opt/iobroker
iobroker stop
npm install iobroker.js-controller
iobroker start
```

## Prüfen oder node.js und npm richtig installiert sind

Falls js-controller nicht läuft, dann könnte es auch sein, dass node.js gar nicht installiert ist.
Es wird empfohlen eine 8.x Version von node.js zu verwenden.

Die Node.js Version 10.x ist weitestgehend geprüft (Stand 06.05.2019), bei 12.x gibt es keine Garantie, dass es funktionieren wird.

Die Befehle

```
node -v
npm -v
```

müssen die selbe Versionsnummer anzeigen. Falls es nicht der Fall ist, dann sollte man node.js deinstallieren und neu installieren. Oder den Suchpfad prüfen.

Die Deinstallation sowie die Installation von Node.js erfolgt analog zur manuellen ioBroker-Installation (bei Raspberry und anderen Linux-Systemen).

Die notwendigen Schritte sind HIER ausführlich beschrieben.

 

Und hier findet ihr noch Infos zu anderen Systemen..
Prüfen ob Admin-Adapter läuft

Erst anschauen, ob admin aktiviert ist:

```
cd /opt/iobroker
iobroker list instances
```

es muss so eine Zeile zu sehen sein:

```
system.adapter.admin.0 : admin - enabled, port: 8081, bind: 0.0.0.0, run as: admin
```

Falls da “disabled” statt “enabled” steht, man kann Adapter so aktivieren:

```
iobroker start admin
```

Falls IP Adresse nicht stimmt, dann schreiben:

```
iobroker set admin.0 --bind 0.0.0.0
```

um an allen IP Adressen erlauben.

Man kann auch Port ändern:

```
iobroker set admin.0 --port 8081
```

oder SSL ausschalten:
```
iobroker set admin.0 --ssl false
```
Dann muss die Instanz am Port (default 8081) zu sehen sein.

Mit

```
netstat -n -a -p TCP
```
kann man prüfen ob die Zeile zu finden ist:

```
TCP 0.0.0.0:8081 0.0.0.0:0 LISTENING
```

Falls es immer noch nicht läuft, dann kann man manuell starten und schauen, ob es irgendwelche Fehler zu sehen sind:
cd /opt/iobroker
node node_modules/iobroker.admin/admin.js --logs

Es kann auch was im Log sein. Die Log-Datei kann unter ***/opt/iobroker/log/iobroker.JJJJ-MM-TT.log*** gefunden werden.

Man kann mit dem Kommando

```
cd /opt/iobroker
cat log/iobroker.JJJJ-MM-TT.log
```

die Datei anzeigen. Natürlich muss JJJJ-MM-TT mit aktuellem Datum ersetzt werden. (“cat” ist nur unter Linux möglich)

## Andere Instanz vom Admin installieren

Falls die Einstellungen von der Admin-Konsole verstellt sind und man nicht mehr auf die Admin-Seite zugreifen kann, gibt es noch die Möglichkeit eine zweite Admin-Instanz zu installieren.

Dafür:

```
iobroker add admin --port 8089
```

ausführen.

Wobei hier 8089 ein Port ist, der sicher frei ist. Danach kann man Admin unter http://ip:8089 erreichen.

Nachdem die Einstellungen wieder in Ordnung sind, sollte man die neue (zweite auf dem port 8089) Instanz deinstallieren, um die Ressourcen zu sparen.

 
## npm ist verschwunden

>! Aktuell passiert so etwas bei Debian (Raspbian) Buster 

Durch ein Problem mit npm kann es vorkommen, dass nach einem Upgrade von Linux, bei dem üblicherweise auch nodejs innerhalb einer Hautversion (6.x; 8.x, 10.x) 
upgegradet wird auf einmal nichts mehr läuft.

So können z.B. Adapter nicht mehr installiert werden, die Fehlermeldung lautet ***npm not found***

In den Fällen bitte in der Konsole prüfen:

node -v
npm -v

Üblicherweise ist jetzt (Stand 30.7.2019) die node-Version 8.15.0 und npm wird nicht gefunden.

Das normale Vorgehen npm upzugraden funktioniert nicht, weil npm nicht da ist. Daher muss man erst node deinstallieren und dann neu installieren:

```
sudo apt-get --purge remove node
sudo apt-get --purge remove nodejs
sudo apt-get autoremove
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

Jetzt sollte üblicherweise npm 6.x installiert sein.


War vorher eine andere Main Version (nicht 10.x) von Node installiert müssen noch die Pakete auf node 10 kompiliert werden

```
cd /opt/iobroker
npm rebuild
```
