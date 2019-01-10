![Logo](media/tradfri.png)
Ikea tradfri Adapter
=============

| Stand der Doku | 10.01.2019                      |
|----------------|---------------------------------|
| Entwickler     | AlCalzone            	   |
| Kategorie      | ioT Systeme                     |
| Keywords       | Ikea, Tradfri, SmartHome |
| Abhängigkeiten |                                 |
| Lizenz         | MIT                             |

Tradfri
---------

Tradfri ist ein SmartHome System der Firma Ikea. Zum jetzigen Zeitpunkt umfasst
dieses System verschiedenste Komponenten aus:

- Leuchtmittel(Lampen)
- LED-Panele/Leisten für Wände und Schränke/Schranktüren
- Bewegungsmelder
- Rolläden für Fenster
- Fernbedienung
- zentraler Gateway

Das Tradfri System ist somit eines der umfangreichesten SmartHome Komponentensystem
was es momentan auf dem Markt gibt.

Voraussetzungen zur Verwendung von Tradfri mit ioBroker
---------------------------------------------------------------

- RaspberryPi 3 Model B+
- Tradfri Gateway
- Tradfri Komponenten (z.b. Leuchtmittel oder Bewegungsmelder etc.)
- Tradfri Fernbedienung


Verwaltung und Steuerung von Tradfri mit ioBroker
---------------------------------------------------------------

Um Tradfri mit ioBroker optimal zu verwalten und zu steuern
wird folgender Adapter benötigt:

1.  Ikea Tradfri

Dieser Adapter stellt eine Verbindung zum zentralen Tradfri Gateway her
Er synchronisiert Komponenten(Lampen, Bewegungsmelder etc.), Szenen, Systemvariablen 
Tradfri Gateway und ioBroker. Abb. 01 zeigt eine vereinfachte Darstellung der Kommunikation
zwischen ioBroker, Gateway und Komponenten.

![Kommunikationsablauf](media/TradfriOverview_002.PNG)




