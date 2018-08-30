# Willkommen bei ioBroker {docsify-ignore-all}

ioBroker ist eine Integrationsplattform für das Internet der Dinge. 

Über ioBroker kann eine Vielzahl von Systemen gemeinsam zu einem 
System vereint werden, so dass man alles auswerten und bedienen kann
sowie Interaktionen zwischen den verschiedenen Systemen ausführen kann, 
wo es sonst Insellösungen bleiben würden. 

Ein ioBroker-System ist modular aufgebaut. Eine Vielzahl dieser Module 
(hier `Adapter` genannt) ermöglicht die Anbindung und Kommunikation 
mit über 200 verschiedenen Plattformen von A wie Alexa bis Z wie Zeiterfasung.
Sei es die Einbindung kommerzieller Produkte aus fast allen Lebensbereichen 
oder die Integration einer selbst erstellten Lösung - ioBroker macht fast 
alles möglich. 

## Visualisierung

Die Visualisierung von ioBroker (`ioBroker.vis`) ist ein mächtiges Instrument
mit einem sehr umfangreichen grafischen Editor. 
Aktuelle Werte von Sensoren können genau so wie historische Verläufe 
grafisch aufbereitet dargestellt werden. Live-Bilder von 
Überwachungskameras, die Implementierung einer Alarmanlage, 
Heizungssysteme und Klimatechnik - fast alles was vorstellbar ist,
kann auch umgesetzt werden. 

![VIS](/media/vis2.png ':size=500')  
*Beispiel für eine VIS-Benutzeroberfläche*

Dabei hat der Anwender maximale Gestaltungsfreiheit. Die Erstellung 
von Automatismen und Abläufen bei der Visualisierung ist auch ohne 
Programmierkenntnisse möglich. Vorgefertigte Bausteine (`Widgets`) zur 
einfachen Verwendung, helfen dem Anwender dabei. Doch nicht nur die 
Anzeige von Informationen ist möglich. Auch die Steuerung von Geräten 
ist über die Visualisierungsoberfläche schnell umgesetzt. Die Bedienung 
der Oberfläche ist dabei auf die unterschiedlichsten Endgeräte 
abgestimmt - vom Smartphone über das Wandtablet mit Touchfunktion 
bis hin zum Personal Computer - alles kann durch einfaches Drag and 
Drop realisiert werden.


## Plattformübergreifend

Jeder, der sich mit Hausautomation beschäftigt, wird früher oder 
später feststellen, dass Systeme häufig nicht perfekt sind. Jedes 
System hat seine Stärken und Schwächen. ioBroker ist deshalb 
plattformübergreifend. Der Parallelbetrieb mit bestehenden Lösungen 
ist jederzeit möglich. Es können Synergieeffekte genutzt und das 
Beste aus allen Welten zusammengeführt werden. 

Dabei ist ioBroker selbst auf fast allen Plattformen zu Hause. ioBoker kann 
unter Windows, Linux, OSX oder auch als Dockerimage installiert werden. 
Vorkonfigurierte Installationsimages nehmen dabei dem Anwender die Installationsarbeit ab.

Über optionale cloudbasierte Dienste ist für den Anwender oder 
Systemintegratoren der Remote-Zugriff auf ein lokal installiertes 
ioBroker-System 7x24h möglich. Die Zugriffsteuerung kann mittels 
Benutzer und Gruppen vom Anwender frei konfiguriert werden.

## Skalierbar

Sollen im Laufe der Zeit weitere Systeme angebunden werden, können vom 
Anwender jederzeit zusätzliche Adapter bei laufendem Betrieb hinzugefügt 
werden. 

Auch ioBroker selbst ist skalierbar. Mehrere ioBroker-Server können zu einem 
`Mutihost`-System verbunden werden. Dabei ist sogar die Mischung von 
Betriebssystemplattformen und die Kopplung von SoC-Einplatinencomputern 
mit großen Multicore-Servern möglich. 
Für Systeme mit höchsten Performanceanforderungen kann optional Redis, 
eine besonders schnelle Datenbank, eingebunden werden.

## Erweiterbar

Die Programmierung erfolgt mit JavaScript, einer seit 1995 stetig weiter
entwickelten Skriptsprache. Diese ist einfach zu erlernen, so dass neue
Anforderungen schnell umsetzbar sind. Das macht es möglich, dass jeder
zu ioBroker beitragen kann und auch individuelle Anforderungen
umsetzbar sind.

## Community

Seit 2014 hat sich ioBroker aufgrund seiner vielen Vorzüge eine breite 
Unterstützung von tausenden Anwendern und Entwicklern gesichert. Im eigens
eingerichteten [Forum](https://forum.iobroker.net) treffen sich Anwender 
und Entwickler und tauschen dort ihre Erfahrungen und Anregungen 
miteinander aus. Da ioBroker Open Source-Software ist, stehen alle 
Quelltexte auf der Plattform [GitHub](https://github.com/iobroker/iobroker) 
zur freien Verfügung. 

!> Was ioBroker nicht ist:  
   ioBroker ist keine kommerzielle Software. ioBroker wird von ehrenamtlichen
   Helfern entwickelt und gepflegt. Deshalb erfolgt der Einsatz der Software
   auf eigene Haftung, ausgenommen dem Vorsatz einer mutwilligen Schädigung. 
   Es gibt keinen vertraglich festgelegten Support.