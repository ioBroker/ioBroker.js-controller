# Time&Weather
Dieses Set stellt Widgets zur Verfügung, mit denen Datum, Uhrzeit und Wettervorhersagen dargestellt werden können.  

|Widget                           | Bild  | Beschreibung|   
|---------------------------------|-------|-------------|
[Cool Clock](#cool-clock)        | ![001]|Analoge Uhr|
[Flip Clock](#flip-clock)        | ![002]|Digitaluhr im Retro-Stil (mit Animation)|
[Segment Clock](#segment-clock)  | ![004]|Digitaluhr im 7-Segment-Stil|
[Simple Clock](#simple-clock)    | ![005]|Digitaluhr|
[Simple Date](#simple-date)      | ![006]|Datumsanzeige|
[SVG Clock](#svg-clock)          | ![007]|Sehr variable Uhr im Analog-Stil|
[HTC Weather](#htc-weather)      | ![003]|Uhrzeitanzeige mit Wetterinformationen --> funktioniert nicht mehr|
[Yahoo Weather](#yahoo-weather)  | ![010]|Wettervorhersage von Yahoo --> funktioniert nicht mehr|
[Weather Custom](#weather-custom)| ![010]|Wettervorhersage mit konfigurierbaren Zuständen|
 
*********************************************************

### Cool Clock  
Analoge Uhr  
![001]  

Attribut|Beschreibung|  
----|----|
Thema|Es stehen verschiedene Darstellungs-Themen zur Verfügung|
Zeige keine Sekunden|Darstellung ohne Sekundenzeiger|
Digitaluhr|.|
Zeige am/pm|Derstellung der Uhrzeit nach US-amerikanischem Stil|


**Beispiel:**  
![008]  
[:arrow_up: back to top ](#TimeWeather)  
*********************************************************

### Flip Clock    
Digitaluhr im Retro-Stil, bei der die Zahlen animiert umspringen  
![002]  

[:arrow_up: back to top ](#TimeWeather)  
*********************************************************


### Segment Clock    

Digitaluhr im 7-Segment-Stil, die entweder die aktuelle Uhrzeit oder eine Zeit aus einem Datenpunkt anzeigen kann.

![004]  

| Attribut|Beschreibung|
| ----|----|
| Object ID                       |Datenpunkt, falls nicht die aktuelle Uhrzeit angezeigt werden soll|
| Aktiviere Uhr                   ||
| Sekunden                        |Sekunden darstellen|
| Vorlage                         ||
| Segmentfarbe AN                 | Farbe der aktiven Segmente|
| Segmentfarbe AUS                | Farbe der inaktiven Segmente|
| Interval für laufenden Text [ms]|Geschwindigkeit für Lauftextdarstellung|
| Anzahl Segmente                 |7/14/16 Segmente pro Ziffer|
| Zeichenwinkel                   |Schrägstellung der Ziffern|
| Zeichenhöhe                     |Ziffernhöhe|
| Zeichenbreite                   |Ziffernbreite|
| Zeichenabstand                  |Abstand der Ziffern|
| Segmentbreite                   |Breite der einzelnen Segment|
| Segmentdistanz                  |Abstand zwischen den Segmenten|
| Ecktyp                          |Form der Segmente|  

**Beispiel:**  
![011]  
[:arrow_up: back to top ](#TimeWeather)  
*********************************************************

### Simple CLock    
Digitaluhr im 7-Segment-Stil, die  die aktuelle Uhrzeit anzeigt.  

![005]  

Attribut|Beschreibung|
----|----
Zeige keine Sekunden|Sekunden nicht darstellen
Blinken| ?
Kein Stil| ?

**Beispiel:**  
![012]  
[:arrow_up: back to top ](#TimeWeather)  
*********************************************************

### Simple Date    
Datumsanzeige im 7-Segment-Stil für aktuelles Datum.  

![006]  

Attribut|Beschreibung|
----|----
Wochentag| Zeige Wochentag vor dem Datum an
Kurzer Wochentag| Zeige den Wochentag als Kurzform an (nur wenn Wochentag aktiviert)
Kurzes Jahr| Nur die letzten beiden Ziffern des Jahres anzeigen
Null vorne|Führende Nullen bei Tag und Monat
Monat als Text|Monat als Text ausschreiben
Kurzer Monat|Monatsabkürzung als Text ausschreiben
USA-Format|?
Kein Stil|?  

**Beispiel:**  
![013]  
[:arrow_up: back to top ](#TimeWeather)  
*********************************************************

### SVG Clock    
Analoguhr mit vielen Darstellungsmöglichkeiten

![007]  

Attribut|Beschreibung|
----|----
Viertel-Text-Größe|Textgröße für die Viertelstunden-Darstellung
Viertel-Text-Farbe|Textfarbe für die Viertelstunden-Darstellung
Viertel-Tickfarbe|Größe der Viertel-Ticks
Minutentextgröße|Textgröße für die Minuten-Darstellung
Minutentextfarbe|Textfarbe für die Minuten-Darstellung
Klein-Tickfarbe|Farbe der kleinen Ticks (jede Minute)
Zeige Sekunden|Zeige Sekundenzeiger
Zeigerfarbe|Farbe des Stunden- und Minutenzeigers
Zeigerbeulefarbe|Farbe für abgesetztes Element aus Stunden- und Mintenzeiger
Sekundenzeigerfarbe|Farbe des Sekundenzeigers
Textschrift|Schriftsatz der Zahlen  

**Beispiel:**  
![015]  
[:arrow_up: back to top ](#TimeWeather)  
*********************************************************

### HTC Weather    
Wetteranzeige  (funktioniert nicht mehr, weil ...? )  
![003]  

Attribut|Beschreibung|
----|----
Stadt|Wetter für diese Stadt wählen
Stadtname|Name der Stadt
Sprache|Anzeigesprache
Updateintervall|Aktualisierung der Wetterdaten

[:arrow_up: back to top ](#TimeWeather)  
*********************************************************

### Yahoo Weather    
Wettervorhersageanzeige (nicht mehr zu nutzen, weil der Yahoo-Wetterdienst geändert wurde)  
(siehe https://developer.yahoo.com/weather/)  

![010]  

[:arrow_up: back to top ](#TimeWeather)  
*********************************************************

### Weather Custom
Wettervorhersageanzeige für beliebige Wetterdatenquellen.
Aktuell empfiehlt sich, die Daten des Adapter 'daswetter' zu nutzen.  

![010]  

Attribut|Beschreibung|
----|----
Stadt|Wetter für diese Stadt wählen
Stadtname|Name der Stadt
Sprache|Anzeigesprache

#### Jetzt  
Attribut|Beschreibung|
----|----  
Temperature ID|Datenpunkt für aktuelle Temperatur
Text ID|Datenpunkt für Wetterbeschreibungstext
Luftfeuchtigkeit ID|Datenpunkt für Luftfeuchtigkeit
Min Temperature ID|Datenpunkt für Tagestiefsttemperatur
Max Temperature ID|Datenpunkt für Tageshöchsttemperatur
Windgeschwindigkeit|Datenpunkt für Windgeschwindigkeit
Windrichtung|Datenpunkt für Windrichtung
Bild-URL|Datenpunkt mit URL zum passenden Wettersymbol

#### Morgen  
Attribut|Beschreibung|
----|----  
Text ID|Datenpunkt für Wetterbeschreibungstext
Min Temperature ID|Datenpunkt für Tagestiefsttemperatur
Max Temperature ID|Datenpunkt für Tageshöchsttemperatur
Bild-URL|Datenpunkt mit URL zum passenden Wettersymbol

So geht es weiter für die nächsten Tage (je nach Vorhersagebedarf und Klick-Ausdauer)...  

**Beispiel:**  
![016]  
[:arrow_up: back to top ](#TimeWeather)  
*********************************************************


[001]: media/iobroker-vis-timeandweather_timeandweather_coolclock.png 
[002]: media/iobroker-vis-timeandweather_timeandweather_flipclock.png
[003]: media/iobroker-vis-timeandweather_timeandweather_htcweather.png
[004]: media/iobroker-vis-timeandweather_timeandweather_segmentclock.png
[005]: media/iobroker-vis-timeandweather_timeandweather_simpleclock.png
[006]: media/iobroker-vis-timeandweather_timeandweather_simpledate.png
[007]: media/iobroker-vis-timeandweather_timeandweather_svgclock.png
[008]: media/iobroker-vis-timeandweather_timeandweather_coolclock_config.png
[009]: media/iobroker-vis-timeandweather_timeandweather_htcweather_config.png
[010]: media/iobroker-vis-timeandweather_timeandweather_yahooweather.png
[011]: media/iobroker-vis-timeandweather_timeandweather_segmentclock_config.png
[012]: media/iobroker-vis-timeandweather_timeandweather_simpleclock_config.png
[013]: media/iobroker-vis-timeandweather_timeandweather_simpledate_config.png
[014]: media/iobroker-vis-timeandweather_timeandweather_svgclock_config.png
[015]: media/iobroker-vis-timeandweather_timeandweather_explain_svgclock.gif
[016]: media/iobroker-vis-timeandweather_timeandweather_explain_CustomWeather.gif