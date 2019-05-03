---
title:       "Einleitung"
lastChanged: "14.09.2018"
---

# Fehlerbehebung

?> ***Dies ist ein Platzhalter***.
   <br><br>
   Hilf mit bei ioBroker und erweitere diesen Artikel.  
   Bitte beachte den [ioBroker Style Guide](community/styleguidedoc), 
   damit die Änderungen einfacher übernommen werden können.

@@@   
Übergreifende Verfahren. Auf individuelle Hilfe beim jeweiligen, Adapter,
Installationsverfahren und -plattform verweisen.  
@@@


Auf dieser Seite findet Ihr Informationen zu Problemen und deren Lösungen bzw Ansätze für Lösungen.
Bitte schaut die Themen durch, ob Euer Problem hier bzw auf den Unterseiten bereits enthalten ist und damit ggf auch schon die Lösung.

## Erste-Hilfe-Checkliste "Mein ioBroker funktioniert nicht mehr" - Was sollte ich zu allerest prüfen und im Forum immer posten?

Wichtige Informationen sind immer die folgenden Versionsangaben:
* `node -v`: ioBroker unterstützt die "LTS-Versionen" von nodejs (gerade Versionsnummern). Neuinstallationen müssen mindestens nodejs 8.12 nutzen. **Achtung:** Entwicklungsversionen von nodejs (ungerade Versionsnummern) werden offiziell nicht unterstützt! Bitte auch ganz neue LTS-Versionen erst nach Forums-Informationen nutzen. Empfohlen ist nodejs 8.15 oder höher. 
* `npm -v`: ioBroker unterstützt npm in Version 3 und >5.7.1, Empfohlen ist 6.4.1 oder höher
* `iobroker -v`
* Versionsnummer des/der Adapter um die es geht
* Betriebssystem (Linux, MacOS, Windows)
* Hardware-Platform

Am besten stellt diese Informationen direkt im Thread zur Verfügung.

Weiterhin bitte VOR einer ForumAnfrage diese Troubleshooting-Seite und auch die FAQ --LINK-- prüfen ob das Thema bereits dort enthalten ist. Falls Ihr Aktionen aus diesen Dokumenten bereits versucht habt, schreibt das bitte auch gleich mit dazu.

Bitte prüft die Logs, ob zu den Problemzeitpunkten von den relevanten Adaptern Einträge vorhanden sind die hilfreich sind. Setzt Logs und auch Skripte o.ä. immer in Spoiler.

## Wo finde ich Logs?

Logs können im einfachsten Fall in der Admin-UI im Web-Browser gefunden werden. Bitte beachtet aber hier das im Admin die Log Zeilen nach ca 200 Zeichen abgeschnitten werden. Dadurch gehen ggf. wichtige Informationen verloren oder sind unvollständig. 
Weiterhin stehen die Logs im Admin immer nur für die aktuelle Browser-Sitzung zur Verfügung.

ioBroker schreibt weiterhin alle Logs auch in eine Log-Datei. Diese liegt im ioBroker-Verzeichnis im Unterverzeichnis "log" und stehen dort im Normalfall für 7 Tage zur Verfügung. Einfach mit einem Text-Editor öffnen und ggf. Auszüge mitsenden.

## Wie ändere ich die Log-Stufe einer Adapter-Instanz?

Standardmäßig läuft der js-controller und die Adapter in der Log-Stufe "info". Dies bedeutet das Informationen die der Adapter-Entwickler als sinnvoll angesehen hat im Log ausgegeben werden. In Summe gibt es die folgenden Log-Stufen:
* **error**: Nur Fehler werden geloggt
* **warn**: Fehler und Warnungen werden geloggt
* **info**: Informationen, Warnungen und Fehler werden geloggt, Standard
* **debug**: neben Informationen, Warnungen und Fehlern werden zusäzliche Informationen geloggt, die der Adapter-Entwickler als sinnvoll zur Fehlersuche erachtet.
* **silly**: Ausführlichste Log-Stufe, in welcher auch Meldungen vom js-controller mit geloggt werden, nur nutzen wenn explizit angefragt.

Die Log-Stufe einer Instanz kann im Admin-WebUI gesetzt werden. Aktiviert hierzu unter "Instanzen" den Expertenmodus und stellt die Log-Stufe in der gleichnamigen Spalte für die Instanz ein.
Nach einer Änderung der Log-Stufe wird die Instanz automatisch neu gestartet.

**Achtung:** Je nach Log-Stufe (vor allem debug und silly) kann das Logfile auf der Platte ziemlich groß werden. Achtet auf den verfügbaren Speicherplatz.

## Nach Betriebssystemupdates funktioniert ioBroker nicht mehr (nodeversionen checken und sowas)
## Ein Adapter/ioBroker startet nicht mehr mit Fehler "falsche node version natives paket. bla" ? (npm rebuild und so)
## Ich habe mehrere verschiedene nodejs Versionen auf meinem Rechner?
## Plötzlich geht ioBroker/Adapter nicht mehr mit Meldung "Syntax Error Unexpected/Invalid Token o.ä." (File korrupt, SD Karte ...)
## Beim Adapterstart Error 7/ Reconnect to DB (Gründe ... Lösungen)
## Der ioBroker ist plötzlich nicht mehr erreichbar, mein Rechner aber noch? (syslog oom oder sowas)
## Der ganze Host friert plötzlich im laufenden Betrieb ein (Swapping top ...)
## Der ganze Host friert bei Adapter-updates ein (zB sql Installation)
## Wie kann ich manuell den js-controller neu installieren und wann sollte ich soetwas tun? Was muss ich beachten?
## Wie kann ich manuell einen Adapter neu installieren und wann sollte ich soetwas tun? Was muss ich beachten?
## Bei der Installation eines Adapter kommt ein Fenster mit "index.html not found"? (Admin3 installieren)

## Meine Adapter sind alle weg?

...

## Wo liegen die Daten von iobroker?
* Iobroker-data Objects, und Backup und so
## Mein Speicher RAM ist ständig voll?
## Mein System stürzt ab? Bleibt ständig stehen, nicht mehr erreichbar
* Ssh noch? 
* Gar nicht mehr?
* Netzteil?
* Syslog
## Wo finde ich das iobroker Logfile?
## Nicht 2x auf gleichem Rechner/Docker installierbar
## Node und nodejs unterschiedliche Ausgaben
## Wie schalte ich Debug Log Modus bei Adapterinstanzen ein?
## Fehler von ppm beim Installieren von Adaptern
* ENOGIT
* EACCESS
* ENOSPC
## Error: Module version mismatch. Expected 48, got 67.
## Iot Geräte gehen nicht mehr?
## Cloud oder iot?
## Fehler beim Aufruf der Admin Seite „index.html not found“
## Wann Forum wann GitHub issue?
## Es hat alles funktioniert, ich habe nichts geändert und jetzt läuft etwas nicht mehr?
* Kommunikationsfehler
* Filesystemfehler
## Nach Stromausfall/Strom weg ohne sauberem shutdown Fehler
## iobroker updates? Adapter? Controller? Wann npm?
## Warnungen bei ppm Aktionen?
* No Access
* Audit, Security, Deprications
## Reconnection to DB
## Error 7 Adapter läuft schon
## Reinstall/rebuild (und Fehler shell script)
## Habe kein Backup gemacht aber habe noch das Biobroker Verzeichnis? Reicht für Restore?
