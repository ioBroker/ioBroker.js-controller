## Allgemeines

ioBroker ist eine Integrationsplattform für das Internet der Dinge und dient als zentraler Server für Smart Home / Building Automation / Assisted Living. ioBroker kann über modulare "Adapter" mit diversen Systemen und Geräten kommunizieren. Die Tochterprojekte "iobroker.vis" und "ScriptGUI" ermöglichen Visualisierungen mit maximaler Gestaltungsfreiheit und die Erstellung von Automatismen/Abläufen ohne Programmierkenntnisse. ioBroker hat das Ziel, ein möglicher Ersatz für Software wie z.B. Open Hab oder The Thing System zu sein.

### Aus Fehlern gelernt

Der Vorgänger von ioBroker, CCU.IO, war ein recht erfolgreiches Projekt in der deutschen Homematic-Community. CCU.IO hatte allerdings einige konzeptionelle Schwächen. ioBroker wurde daraufhin von Grund auf neu entwickelt und übernimmt dabei die erfolgreichen Konzepte von CCU.IO. Alle verfügbaren CCU.IO-Addons („yahui“, „DashUI“, „ScriptGUI“, …) und alle CCU.IO-Adapter können mit vertretbarem Aufwand auf ioBroker portiert werden.

* * *

## Betriebssystem und Hardware

ioBroker.nodejs sollte auf jeder Hardware und Betriebssystem laufen, auf dem Node.js läuft (ARM, x86, Windows, Linux, OSX). Da ioBroker für jede Adapterinstanz einen neuen Node.js-Prozess startet, wird das zur Verfügung stehende RAM zum limitierenden Faktor. Der benötigte Footprint eines einzelnen Adapters liegt bei etwa 10-60MB. Ein x86 oder ARM basierendes System wie BananaPi oder Cubietruck mit einem Debian Linux als Betriebssystem wird empfohlen. Für einige Einplatinencomputer befindet sich im [Downloadbereich](http://www.iobroker.net/?page_id=2563&lang=de) ein Image mit Betriebssystem und einer vollständigen ioBroker Installation. Es müssen nur noch die gewünschten Instanzen erzeugt und konfiguriert werden.

* * *

## Adapter

Über sogenannte "Adapter" kommuniziert ioBroker mit den unterschiedlichsten Systemen aus den Bereichen Smarthome (z.B. mit HomeMatic, KNX, FS20 oder EnOcean) und Home Entertainment (z.B. Sonos, Dreambox, AV-Receiver und SmartTV verschiedener Hersteller). Ausserdem ist der Datenaustausch mit unterschiedlichsten Webservices (z.B. weatherunderground.com) und diverser Software wie z.B. MySQL oder Graphite möglich. Systeme, die bisher erfolgreich in ioBroker eingebunden wurden, werden [hier](http://www.iobroker.net/?page_id=2236&lang=de) vorgestellt.

* * *

## ioBroker aus Sicht des Anwenders

### Plattformübergreifend

Jeder, der sich mit Hausautomation beschäftigt, wird früher oder später feststellen, daß kein System perfekt ist. Jedes System hat seine Stärken und Schwächen. ioBroker ist plattformübergreifend. Es vereint das Beste von Allem zu einem Ganzen. So kann man z.B. die Funkkomponenten von Homematic und die verdrahteten Systeme von KNX miteinander verbinden. Auch können preisgünstige OneWire Sensoren und Funkmodule von Z-Wave eingebunden werden. An Arduino gebundene Sensoren können ebenfalls integriert werden. Sollte es innerhalb eines Systems einen Engpass mit einer Zentrale oder Basisstation geben (z.B. durch Überschreitung des Duty-Cycles bei Funkmodulen), kann eine weitere Zentrale angebunden werden. ioBroker ist skalierbar. Es kann beliebig viele Systeme mit jeweils beliebig vielen Zentralen zu einem Komplettsystem zusammenfassen. Dem Anwender erleichtert ioBroker den Einstieg in die Hausautomation. Denn durch seine große Variabilität ist man für zukünftige Systeme gerüstet und kann ohne Sorge, „auf das falsche Pferd gesetzt“ oder in das falsche System investiert zu haben, seine Hausautomation erweitern. Jederzeit ist der Umstieg oder Parallelbetrieb möglich. Neben den klassischen Gewerken der Hausautomation, wie Licht, Heizung oder Sicherheit, bindet ioBroker auch Geräte der Unterhaltungselektronik ein. So können Hifi-Komponenten und Smart-TV mit Netzwerkanschluss mit anderen Sensoren und Aktoren verknüpft werden (z.B. das Lichtsystem Phillips Hue).

### Visualisierung

Die Schnittstelle zum Benutzer ist die Visualisierung. ioBroker stellt mit VIS eine mächtige Visualisierungsplattform zur Verfügung. Damit können aktuelle Werte von Sensoren und deren historische Verläufe grafisch aufbereitet dargestellt werden. Aber auch komplexe Steuerungen zur Bedienung auf unterschiedlichen Endgeräten - vom Smartphone über das Wandtablet bis zum Personal Computer- können durch einfaches Drag and Drop realisiert werden.

* * *

## ioBroker aus Sicht des Entwicklers

ioBroker ist modular und sehr stabil aufgebaut. Mit der Entwicklung sogenannter Adapter können weitere Systeme in ioBroker eingebunden werden. Der Controller und die Adapter laufen als eigenständige Prozesse unter nodejs. Sollte ein Adapter abstürzen, laufen alle anderen Prozesse störungsfrei weiter. Die Programmierung erfolgt im weit verbreiteten Javascript.