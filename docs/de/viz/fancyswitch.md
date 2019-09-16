# Fancyswitch
Dieses Set stellt einige Schalter dar, die überwiegend gleich funktionieren.
Sie stellen bool'sche Zustände dar und können diese auch schalten.

|Widget                  | Image | Beschreibung |
|------------------------|-------|--------------|
|Switch light off/on     | ![switch](media/fancyswitch-1.png)|Hellgraue Schaltwippe |
|Slider dark off/on      | ![switch](media/fancyswitch-2.png)|Schieber mit 'on'/'off'-Beschriftung |
|Schieber dunkel ein/aus | ![switch](media/fancyswitch-3.png)|Schieber mit 'ein'/'aus'-Beschriftung |
|Schieber dunkel aus/ein | ![switch](media/fancyswitch-4.png)|Schieber mit 'aus'/'ein'-Beschriftung |
|Wippe dunkel aus/ein    | ![switch](media/fancyswitch-5.png) ![switch](media/fancyswitch-6.png)|Dunkle Schaltwippe mit 'aus'/'ein'-Beschriftung; optional auch im Hell-Stil |
|Giva Labs iButton       | ![switch](media/fancyswitch_givalabsibutton.png)| Weißer Schieber mit 'on'/'off'-Beschriftung |
|Taitem jqui Toggleswitch| ![switch](media/fancyswitch_taitem.png)| Weißer Schieber mit 'on'/'off'-Beschriftung außerhalb des Schiebers |

## Beschreibung der Eigenschaften

|Attribut|Beschreibung|Betrifft|
|----|----|---|
|ObjectId|Id eines darzustellenden Objekts, das HTML enthält|Switch, Slider, Schieber, Wippe |
|Invertieren|Schaltzustand invertieren|Switch, Slider, Schieber, Wippe |
|Falsch-Wert|Wert, dem der Zustand falsch/aus/off entspricht|Switch, Slider, Schieber, Wippe |
|Wahr-Wert|Wert, dem der Zustand falsch/aus/off entspricht|Switch, Slider, Schieber, Wippe |
|Auto-Aus|Stellt Taster-Funktion dar: nach einstellbarer Zeit geht der Schalter wieder in seinen ursprünglichen Zustand zurück|Switch, Slider, Schieber, Wippe |
|Hellstil|Hellere Darstellung des Schalters|Wippe dunkel aus/ein |
|Hebelgröße||Giva Labs iButton |
|Containergröße||Giva Labs iButton |
|Ziehen erlaubt|Schalter kann gezogen werden (nicht nur gedrückt)|Giva Labs iButton |
|Animation|Umschalten wird animiert dargestellt|Giva Labs iButton |
|Umschalt-Dauer|Datenpunkt wird erst verzögert geschaltet|Giva Labs iButton |
|Highlight Schalter|Schiebebereich des Schalters wird auch farbig dargestellt|Taitem jqui Toggleswitch |
|Widget-Breite|Breite des Schalters, unabhängig von Beschriftung|Taitem jqui Toggleswitch |
|Voranstellen html|HTML-Code, der vor dem Objekt dargestellt werden soll|Taitem jqui Toggleswitch |
|Html anhängen|HTML-Code, der nach dem Objekt dargestellt werden soll|Taitem jqui Toggleswitch |

**Beispiel:**
![009](media/fancyswitch_all.gif)