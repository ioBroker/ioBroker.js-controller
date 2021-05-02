---
title:       "Willkommen"
lastChanged: "02.05.2020"
---
# Willkommen bei ioBroker
!> **Hinweis für Einsteiger**  
    Sollten beim Lesen dieser ersten Worte schon zu viele unbekannten Begriffe  
    verwendet worden sein, werden diese nochmals auf der Seite [Grundlagen]  
    ausführlich erklärt.

ioBroker ist eine Softwarelösung um verschiedene Smarthome-Systeme, die ohne  
ioBroker Insellösungen bleiben würden, in einem Gesamtsystem zu integrieren.  

ioBroker ist daher **die** Integrationsplattform für das Internet der Dinge.

Ein ioBroker-System ist modular aufgebaut. Eine Vielzahl von [Adaptern] ermöglicht  
die Kommunikation mit über 400 verschiedenen Plattformen von A wie Alexa bis Z  
wie Z-Wave.  

Sei es die Einbindung kommerzieller Produkte aus fast allen Lebensbereichen oder  
die Integration einer selbst erstellten Lösung - ioBroker macht fast alles möglich.

!> Die Dokumentation befindet sich im Aufbau und wird stetig erweitert.  
   Daher kann es vorkommen, dass Links noch nicht funktionieren oder  
   Inhalte fehlen. Wir sind für jede Hilfe bei der Erstellung neuer  
   Artikel oder für Verbesserungen dankbar. Informationen dazu gibt  
   es [im Forum].
   <br><br>
   **Bis alle Inhalte übernommen wurden, ist die alte Dokumentation noch [hier zu finden].  
   Sie wird sukzessive durch die neue Dokumentation ersetzt.**


## Plattformübergreifend
Jeder, der sich mit Hausautomation beschäftigt, wird früher oder später  
feststellen, dass einzelne Systeme häufig nicht perfekt sind. Jedes System hat  
seine Stärken und Schwächen. ioBroker ist deshalb plattformübergreifend und  
Parallelbetrieb mit bestehenden Lösungen ist jederzeit möglich. So können  
Synergieeffekte genutzt und das Beste aus allen Welten zusammengeführt werden.  

ioBroker selbst IST auf fast allen Plattformen zu Hause. ioBroker kann unter  
Windows, Linux, OSX oder auch als Dockerimage installiert werden.  
Vorkonfigurierte Installationsimages nehmen dabei dem Anwender die  
Installationsarbeit ab.

Über einen optionalen cloudbasierten Zugriff ist für den Anwender oder auch  
für Systemintegratoren die Remote-Verwaltung auf ein lokal installiertes ioBroker  
-System 24/7 möglich. Die Zugriffsteuerung kann mittels Benutzer und Gruppen vom  
Anwender frei konfiguriert werden.

## Skalierbar
Sollen im Laufe der Zeit weitere Smarthome-Systeme angebunden werden, können  
diese vom Anwender jederzeit über zusätzliche Adapter bei laufendem Betrieb  
implementiert werden.  
Auch ioBroker selbst ist skalierbar: Mehrere ioBroker-Server können zu einem  
`Mutihost`-System verbunden werden. Dabei ist sogar die Mischung von  
Betriebssystemplattformen und die Kopplung von SoC-Einplatinencomputern mit  
großen Multicore-Servern möglich.  
Für Systeme mit höchsten Performanceanforderungen kann optional Redis, eine  
besonders schnelle Datenbank, eingebunden werden.  

## Programmierbar
Eine optionale Programmierung erfolgt mit JavaScript, einer seit 1995 stetig  
weiter entwickelten Skriptsprache. Diese ist einfach zu erlernen, so dass neue  
Anforderungen schnell umsetzbar sind. Das macht es möglich, dass jeder zu  
ioBroker beitragen kann und auch individuelle Anforderungen umsetzbar sind.

Für Einsteiger in die Programmierung ist die Variante 'Blockly' vorhanden, die es  
ermöglicht, ohne umfangreiche Programmierkenntnisse selber per 'drag and drop'  
schnell zu Ergebnissen zu kommen.  

## Visualisierung
ioBroker stellt mit `VIS` ein mächtiges Tool zur Erstellung einer individuellen  
Visualisierung zur Verfügung. Aktuelle Werte von Sensoren können genau so wie  
historische Verläufe grafisch aufbereitet dargestellt werden. Live-Bilder von  
Überwachungskameras, die Implementierung einer Alarmanlage, Heizungssysteme und  
Klimatechnik - fast alles was vorstellbar ist, kann auch umgesetzt werden. 

*Beispiel für eine selbst erstellte VIS-Benutzeroberfläche*
![VIS](media/vis2.png)  


Dabei hat der Anwender maximale Gestaltungsfreiheit. Vorgefertigte Bausteine zur  
einfachen Verwendung helfen dem Anwender dabei. Doch nicht nur die Anzeige von  
Informationen ist möglich. Auch die Steuerung von Geräten ist über die  
Visualisierungsoberfläche schnell umgesetzt. Die Bedienung der Oberfläche kann  
dabei auf die unterschiedlichsten Endgeräte abgestimmt werden - vom Smartphone  
über das Wandtablet mit Touchfunktion bis hin zum Personal Computer - alles kann  
durch einfaches Drag and Drop realisiert werden.  

Einfache vorgefertigte Bedienoberflächen können mit dem Material- oder dem  
HabPanel-Adapter schnell realisiert werden.



## Community
Seit 2014 hat sich ioBroker aufgrund seiner vielen Vorzüge eine breite  
Unterstützung von tausenden Anwendern und Entwicklern gesichert. Im eigens  
eingerichteten [Forum] treffen sich Anwender und Entwickler und tauschen dort ihre  
Erfahrungen und Anregungen miteinander aus. Da ioBroker Open Source-Software ist,  
stehen alle Quelltexte auf der Plattform [GitHub]  
zur freien Verfügung.  

?> Was ioBroker nicht ist:  
   ioBroker ist keine kommerzielle Software. ioBroker wird von ehrenamtlichen Helfern  
   entwickelt und gepflegt. Deshalb erfolgt der Einsatz der Software auf eigene Haftung,  
   ausgenommen dem Vorsatz einer mutwilligen Schädigung.  
   Es gibt keinen vertraglich festgelegten Support!

[Grundlagen]: https://www.iobroker.net/#de/documentation/basics/README.md
[Adaptern]: http://download.iobroker.net/list.html
[hier zu finden]: https://www.iobroker.net/docu/
[im Forum]: https://forum.iobroker.net/viewtopic.php?f=8&t=16933
[GitHub]: https://github.com/ioBroker
[Forum]: https://forum.iobroker.net