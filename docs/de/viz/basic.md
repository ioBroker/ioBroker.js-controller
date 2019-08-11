# Basic
|Widget               | Image | Beschreibung|   
|---------------------|-------|-------------|
|[HTML](#Html-frame)  | ![001]|Dieses Widget stellt beliebigen HTML-Code dar.
[Svg Shape](#svg-shape) | ![002]|Stellt eine Form dar
[iFrame](#iframe)       | ![003]|Dieses Widget bindet einen iFrame ein
[Image](#image)         | ![004]|Dieses Widget stellt ein Bild dar.
[Link](#link)           | ![005]|Dieses Widget entspricht dem Widget "static - HTML" ist aber zusätzlich auf seiner ganzen Fläche ein klickbarer Link. Kann für die Navigation zwischen Views oder für externe Links genutzt werden.|
[Border](#border)       | ![006]| Stellt einen Rahmen dar, optional mit Titel und Titelbalken
[iFrame 8](#iframe-8)     | ![007]| Zeigt bis zu 8 Bilder in iFrames an
[View in widget](#view-in-widget)| ![008]|Dieses Widget kann Views innerhalb von Views darstellen.Sinnvoll z.B. für eine Navigation: Man baut eine View mit Navigations-Elementen auf und bindet diese dann in beliebig vielen anderen Views ein.|
[view in widget 8](#view-in-widget-8)| ![009]|Zeigt eine von 8 Views in Abhängigkeit von einem Zustand an.|
[Image 8](#image-8)  | ![010]|Zeigt eines von 8 Bildern in Abhängigkeit von einem Zustand an.|
[HTML navigation](#html-navigation)      | ![011]|Dieses Widget dient dazu eine Navigation zwischen den Views aufzubauen. Entspricht dem Widget "static - link", ist jedoch ausschließlich für die Navigation zwischen den Views nutzbar und bietet zusätzlich die Möglichkeit animierte Effekte beim Wechsel der Views zu verwenden.|
[Filter - dropdown](filter-dropdown) | ![012]||
[Number](#number)    | ![013]|Dieses Widget stellt einen Zahlenwert dar|
[String](#string)    | ![014]|Dieses Widget stellt einen Datenpunkt vom Typ Zeichenkette dar.|
[String (unescaped)](#string-unescaped) | ![015]|Dieses Widget stellt einen Datenpunkt vom Typ Zeichenkette dar. Im Unterschied zum Widget "hm_val - String" werden dabei keine Sonderzeichen "escaped" - d.h. die Variable kann auch HTML-Code enthalten und dieser wird dann dargestellt.|
[String img src](#String-img-src) | ![016]|Diesem Widget kann ein Variable vom Typ Zeichenkette zugeordnet werden, eine dort enthaltene URL wird dann als Bild dargestellt|
[Timestamp](#timestamp) | ![017]|Zeigt den letzten Zeitstempel des verbundenen States an.|
[Last change Timestamp](#last-change-timestamp)| ![018]|Zeigt den Zeitstempel der letzten Änderung (last change) des verbundenen States an|
[ValueList Text](#valuelist-text) | ![019]|Dieses Widget stellt eine Variable vom Typ Werteliste dar.|
[ValueList HTML](#valuelist-html) | ![020]|Dieses Widget stellt eine Variable vom Typ Werteliste dar. Entspricht dem Widget "hm_val - ValueList Text, allerdings wird nicht "escaped", d.h. in valuelist kann HTML-Code eingetragen werden.|
[ValueList HTML Style](#valuelist-html-style) | ![021]|Dieses Widget stellt eine Variable vom Typ Werteliste dar. Entspricht dem Widget "hm_val - ValueList HTML, bietet aber die Möglichkeit für 8 verschiedene Werte (0-7) auch 8 verschiedene CSS-Angaben zu verwenden.|
[Bool HTML](#bool-html) | ![022]|Dieses Widget stellt Bool-Werte dar.|
[AckFlag HTML](#ack-flag-html) | ![023]|Dieses Widget stellt das Acknowledge-Flag eines Datenpunkts dar|
[Bool Checkbox](#bool-checkbox) | ![024]|Dieses Widget zeigt Bool-Werte als einfache Checkbox an und erlaubt außerdem den Wert zu umzuschalten.|
[Bool Select](#bool-select) | ![025]|Dieses Widget stellt Bool-Werte als Dropdown dar und erlaubt außerdem den Wert umzuschalten.|
[Bool HTML Click](#bool-html-click) | ![026]|Dieses Widget stellt Bool-Werte dar und erlaubt außerdem den Wert auf Klick innerhalb der Widget-Fläche umzuschalten.|
[Bool SVG](#bool-svg) | ![027]|Dieses Widget setzt bei Klick innerhalb der Widget-Fläche einen Wert.|
[HTML State](#html-state) | ![028]|Dieses Widget verschwindet wenn der Wert des zugeordneten Datenpunkts 0 bzw false ist. Geschickt z.B. für die Anzeige von Servicemeldungen|
[Red Number](#red-number) | ![029]|Anzeige eines numerischen Werts im Stil der iOS Benachrichtigungs-Symbole. Verschwindet beim Wert 0.|
[Bulb on/off](#bulb-on-off) | ![030]|Dieses Widget stellt einen Wert als ausgeschaltete oder leuchtende Glühbirne auf schwarzem Hintergrund dar. Ist für Bool und Float-Werte (Dimmer) einsetzbar.|
[Bar](#bar-horizontal)  | ![031]|Dieses Widget stellt einen Wert von 0-100 als horizontalen Balken dar.|
[Note](#note)                 | ![032]|Dieses Widget stellt den Wert eines (String)-Datenpunkts als Notizzettel dar|
[Json Table](#json-table)           | ![033]|JSON-formatierte Tabelle darstellen|
[HTML logout](#html-logout)          | ![034]|Dieses Widget dient zum Abmelden per HTML-Button|
[Gesture indicator](#gesture-indicator)    | ![035]|Zeigt Gesten-gesteuerte Daten an|
[Speech to text](#speech-to-text)       | ![036]||
[Full Screen](#full-screen)          | ![037]|Mit diesem WIdget kann der Vollbild-Modus ein- und ausgeschaltet werden|
[Screen Resolution](#scree-resolution)    | ![038]|Dieses Widget zeigt die Bildschirmauflösung an|
*********************************************************

*********************************************************

### Html Frame  
Dieses Widget stellt beliebigen HTML-Code dar. Es ist auch möglich, Javascript innerhalb des Widgets zu verwenden.  

Attribut|Beschreibung|
----|----|
ObjectId|Id eines darzustellenden Objekts, das HTML enthält|  
Voranstellen html|HTML-Code, der vor dem Objekt dargestellt werden soll|  
Html anhängen|HTML-Code, der nach dem Objekt dargestellt werden soll|  

**Beispiel:**  
![039]  
[:arrow_up: back to top ](#basic)  
*********************************************************

### SVG Shape
Dieses Widget stellt einfach eine geometrische Form da, wobei einige Formen vordefiniert sind.  

Attribut|Beschreibung|
----|----|
Typ|geometrische Form|  
Linienfarbe|Farbe der Formumrandung|  
Füllfarbe|Farbe der Füllung|  
Linienbreite||  
Drehen|Drehwinkel ausgehend von Initialposition in Grad|  
Breitenskala|Skaliert die Breite zwischen 0 und 100%|  
Höhenskala|Skaliert die Höhe zwischen 0 und 100%|  

**Beispiel:**  
![040]  
[:arrow_up: back to top ](#basic)  
*********************************************************

### iFrame  
Stellt einen iFrame dar  

Attribut|Beschreibung|
----|----|
Quelle|Pfad zur Quelle (Webseite, Bild); das kann lokal oder per URL definiert sein|  
Kein Sandkasten|:construction:|  
Updatezeit|:construction:|  
Update bei Aufwachen|:construction:|  
Update bei Viewwechsel|:construction:|  
Addiere nicht zu URL|:construction:|  
Scroll X|:construction:|  
Scroll Y|:construction:|  
Kein Rahmen|:construction:|  

**Beispiel:**  
![041]  
[:arrow_up: back to top ](#basic)  
*********************************************************

### Image
Dieses Widget stellt ein Bild dar.  

Attribut|Beschreibung|
----|----|
Quelle|Pfad zur Quelle im lokalen Dateisystem|  
Strecken|Bild an Dimensionen des Rahmens anpassen|  
Updatezeit|:construction:|  
Update bei Aufwachen|:construction:|  
Update bei Viewwechsel|:construction:|  
Addiere nicht zu URL|:construction:|  
Allow useer interactions|:construction:|  

**Beispiel:**  
![042]  
[:arrow_up: back to top ](#basic)  
*********************************************************

### Link
Dieses Widget entspricht dem Widget "HTML Frame", ist aber zusätzlich auf seiner ganzen Fläche ein klickbarer Link. Dadurch kann es für die Navigation zwischen Views oder für externe Links genutzt werden.  

Attribut|Beschreibung|
----|----|
html|Selbsterklärend ;) ...hier den HTML-Code zur formatierten Darstellung von Text einfügen.
link|Die Link-URL. Um einen Link auf eine andere View zu nutzen, einfach den View-Namen mit vorangestelltem Hash-Symbol (#) eintragen
target|Das Ziel des Links. Leer lassen um im gleichen Browser-Fenster zu bleiben; möchte man ein neues Fenster öffnen _blank eintragen.  Weitere Optionen: _self (gleicher Tab),  _parent (),  _top ()

**Beispiel:**  
![043]  
[:arrow_up: back to top ](#basic)  
*********************************************************

### Border  
![006]  
Dieses Widget stellt einfach einen Rahmen dar - ohne weitere Funktion, nur Text und Farbe. Das kann zur Gruppierung von Widgets genutzt werden.  

Attribut|Beschreibung|
----|----|
Titel|Selbsterklärend
oberer Beschriftungsfont|Schriftart des Titels
Obere Beschriftungsfarbe|Farbe des Titels
Titelhintergrund|Hintergrundfarbe des Titeltextes
Titel-Oben-Abstand|Abstand des Titels vom oberen Rand
Titel-Links-Abstand|Abstand des Titels vom linken Rand
Kopfhöhe|Höhe eines Balkens vom oberen Rand an
Kopffarbe|Farbe des Balkens  

**Beispiel:**  
![044]  
[:arrow_up: back to top ](#basic)  
*********************************************************

### iFrame 8
Zeigt einen von 8 iFrames in Abhängigkeit von einem Zustand an.  

Attribut|Beschreibung|
----|----|
Object ID| State (Zahl), der steuert, welcher iframe angezeigt werden soll  
Updatezeit (ms)| Aktualisierungsintervall in Millisekunden  
Wertanzahl bis| Gibt an, wie viele iFrames angezeigt werden können (max. 8)  
URL falls Wert=[0]:| Pfad zum anzuzeigenden Bild, wenn Object ID den Wert 0 hat
URL falls Wert=[1]:| Pfad zum anzuzeigenden Bild, wenn Object ID den Wert 1 hat
...|...
Kein Sandkasten|@@@?@@@ 

**Beispiel:**  
![045]  
[:arrow_up: back to top ](#basic)  
*********************************************************

### View in widget
![008]  

Zeigt eine andere View an.  

Attribut|Beschreibung|
----|----|
Viewname| Auswahl der anzuzeigenden View (rekursiv ist nicht möglich...)  

**Beispiel:**  
![046]  
[:arrow_up: back to top ](#basic)  
*********************************************************

### View in widget 8
![007]  
Zeigt eine von 8 Views in Abhängigkeit von einem Zustand an.  

Attribut|Beschreibung|
----|----|
Object ID|Steuerungs-Variable
Dauernd|@@@?@@@
Nur falls sichtbar|@@@?@@@
Werteanzahl bis|Anzahl der anzuzeigenden Views
View für Tab[x]|Auswahl der anzuzeigenden View aus der Liste der vorhandenen Views
![048]  
[:arrow_up: back to top ](#basic)  
*********************************************************

### Image 8
![009]  
Zeigt eines von bis zu acht Bildern in Abhängigkeit einer Steuervariablen an.

Attribut|Beschreibung|
----|----|
Object ID| Datenpunkt (Zahl), der steuert, welcher iframe angezeigt werden soll  
Updatezeit (ms)| Aktualisierungsintervall in Millisekunden  
Wertanzahl bis| Gibt an, wie viele iFrames angezeigt werden können (max. 8)  
URL falls Wert=[0]:| Pfad zum anzuzeigenden Bild, wenn Object ID den Wert 0 hat
URL falls Wert=[1]:| Pfad zum anzuzeigenden Bild, wenn Object ID den Wert 1 hat
...|...
Kein Sandkasten|@@@?@@@ 

**Beispiel:**  
![047]  
[:arrow_up: back to top ](#basic)  
*********************************************************


### HTML navigation
![011]  
Dieses Widget dient dazu, eine Navigation zwischen den Views aufzubauen. Entspricht dem Widget "static - link", ist jedoch ausschließlich für die Navigation zwischen den Views nutzbar und bietet zusätzlich die Möglichkeit, animierte Effekte beim Wechsel der Views zu verwenden.

Attribut|Beschreibung|
----|----|
html|Selbsterklärend ;) ...hier den HTML-Code einfügen
View zum Navigieren|Hier muss der Name der View, zu der navigiert werden soll, eingetragen werden.
Anzeigen und Verbergen gleichzeitig|Nur ein einzelner Effekt zum Übergang
Hintergrund bei Wechsel|Hintergrundfarbe, die beim Wechsel angezeigt wird.
Verbergeneffekt|Hier kann der Name eines jQueryUI Effektes eingetragen werden, der beim Verlassen der View genutzt wird. Verfügbare Effekte sind: Blind, Bounce, Clip, Drop, Explode, Fade, Fold, Highlight, Puff, Pulsate, Scale, Shake, Size, Slide und Transfer. 
Verbergendauer|Dauer des Effekts in ms
Anzeigeeffekt|siehe oben, das gleiche - aber dieses mal für das Einblenden der neuen View
Anzeigedauer|Siehe oben, Zeit in ms für das Einblenden der neuen View
	
**Beispiel:**  
![050]  
[:arrow_up: back to top ](#basic)  
*********************************************************

### Filter - dropdown  
@@@?@@@ Was macht der Filter?
*********************************************************

### Number
![013]  
Dieses Widget stellt einen Zahlenwert dar (sowohl für Integer als auch Float verwendbar)

Attribut|Beschreibung|
----|----|
Voranstellen HTML|Text oder HTML-Code der vor dem Zahlenwert angezeigt wird
HTML anhängen (Singular)|Text oder HTML-Code der hinter dem Zahlenwert angezeigt wird, wenn die dargestellte Zahl = 1 ist>
HTML anhängen (Plural)|Text oder HTML-Code der hinter dem Zahlenwert angezeigt wird, wenn die dargestellte Zahl  1 ist
Zeichen nach Komma|Anzahl der dargestellten Nachkommastellen
Komma als Trennung|Komma statt Dezimalpunkt
Tausender Trennzeichen|Trennzeichen anzeigen
Wert multiplizieren|Faktor mit dem der Zahlenwert multipliziert wird
Qualität ID|@@@?@@@
Klasse bei Qualität 'true'|@@@?@@@  
Klasse bei Qualität 'false'|@@@?@@@
Testtext|Darzustellende Zahl, nur zum Testen

**Beispiel:**  
![049]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### String
![014]  
Dieses Widget stellt einen Datenpunkt vom Typ Zeichenkette dar.

Attribut|Beschreibung|
----|----|
ObjectID|Datenpunkt (reine Zeichenkette)
Voranstellen HTML|Text oder HTML-Code, der vor dem String angezeigt wird.
HTML anhängen|Text oder HTML-Code, der hinter dem String angezeigt wird.  
Testtext|Kann verwendet werden, um die Darstellung unabhängig vom Datenpunkt zu testen

**Beispiel:**  
![051]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### String (unescaped)
![015]  
Dieses Widget stellt einen Datenpunkt vom Typ Zeichenkette dar. Im Unterschied zum Widget "String" werden dabei keine Sonderzeichen "escaped" - d.h. die Variable kann auch HTML-Code enthalten und dieser wird dann dargestellt.

Attribut|Beschreibung|
----|----|
ObjectID|Datenpunkt (reine Zeichenkette)
Voranstellen HTML|Text oder HTML-Code, der vor dem String angezeigt wird.
HTML anhängen|Text oder HTML-Code, der hinter dem String angezeigt wird.  
Testtext|Kann verwendet werden, um die Darstellung unabhängig vom Datenpunkt zu testen
**Beispiel:**  
![052]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### String img src
![016]  
Diesem Widget kann eine Variable vom Typ Zeichenkette zugeordnet werden, eine dort enthaltene URL wird dann als Bild dargestellt. Es ist also ähnlich dem Widget 'image', aber die Quelle ist über den Datenpunkt variabel.

Attribut|Beschreibung|
----|----|
ObjectID|Datenpunkt (reine Zeichenkette)  
Voranstellen HTML|Text oder HTML-Code, der vor dem String angezeigt wird.
HTML anhängen|Text oder HTML-Code, der hinter dem String angezeigt wird.  
Testtext|Kann verwendet werden, um die Darstellung unabhängig vom Datenpunkt zu testen 

![053]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### Timestamp  
![017]  
Zeigt den letzten Zeitstempel des verbundenen States an.  

Attribut|Beschreibung|
----|----|
ObjectID|Datenpunkt
Als Interval|Wenn aktiviert, wird der Zeitraum seit dem letzten Timestamp angezeigt (relativ zum Jetzt)
Datumformat|Auswahl der Formatierung des Timestamp  
Voranstellen HTML|Text oder HTML-Code, der vor dem String angezeigt wird.
HTML anhängen|Text oder HTML-Code, der hinter dem String angezeigt wird.  
Testtext|Kann verwendet werden, um die Darstellung unabhängig vom Datenpunkt zu testen  

![054]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### Last change timestamp  
![017]  
Zeigt den Zeitstempel der letzten Änderung (last change) des verbundenen States an (ansonsten gleich wie Widget Timestamp).  

Attribut|Beschreibung|
----|----|
ObjectID|Datenpunkt
Als Interval|Wenn aktiviert, wird der Zeitraum seit der letzten Änderung angezeigt (relativ zum Jetzt)
Datumformat|Auswahl der Formatierung des Timestamp  
Voranstellen HTML|Text oder HTML-Code, der vor dem String angezeigt wird.
HTML anhängen|Text oder HTML-Code, der hinter dem String angezeigt wird.  
Testtext|Kann verwendet werden, um die Darstellung unabhängig vom Datenpunkt zu testen  

![054]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### ValueList Text
![019]  
Dieses Widget stellt eine Werteliste in Abhängigkeit eines Integer-Datenpunkts dar.

Attribut|Beschreibung|
----|----|
ObjectID|Datenpunkt (Ganzzahl)
Voranstellen HTML|Text oder HTML-Code der vor dem String angezeigt wird.
HTML anhängen|Text oder HTML-Code der hinter dem String angezeigt wird.  
Werteliste|Anzeigewerte (Strings) in Semikolon-getrennter Liste; erster Wert wird angezeigt, wenn Datenpunkt den Zahlenwert 0 hat: 0-->'a', 1-->'b', 2-->'c'
Testtext|Kann verwendet werden, um die Darstellung unabhängig vom Datenpunkt zu testen   

![055]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### ValueList HTML
![020]  
Dieses Widget stellt eine Variable vom Typ Werteliste dar. Entspricht dem Widget "ValueList Text, allerdings wird nicht "escaped", d.h. in valuelist kann HTML-Code eingetragen werden.

Attribut|Beschreibung|
----|----|
ObjectID|Datenpunkt (Ganzzahl)
Voranstellen HTML|Text oder HTML-Code, der vor dem String angezeigt wird.
HTML anhängen|Text oder HTML-Code, der hinter dem String angezeigt wird.  
Werteliste|Anzeigewerte (HTML formatierte Strings) in Semikolon-getrennter Liste; erster Wert wird angezeigt, wenn Datenpunkt den Zahlenwert 0 hat.
Testtext|Kann verwendet werden, um die Darstellung unabhängig vom Datenpunkt zu testen   

![056]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### ValueList HTML 8
![021]  
Dieses Widget stellt eine Variable vom Typ Werteliste dar. Entspricht dem Widget "ValueList HTML, bietet aber die Möglichkeit, für 8 verschiedene Werte (0-7) auch 8 verschiedene CSS-Angaben zu verwenden.

Attribut|Beschreibung|
----|----|
ObjectID|Datenpunkt (Ganzzahl)
Voranstellen HTML|Text oder HTML-Code, der vor dem String angezeigt wird.
HTML anhängen|Text oder HTML-Code, der hinter dem String angezeigt wird. 
Wert[0] ..Wert[7]|Text oder HTML-Code für die Werte 0 bis 7
Stile für [0] .. Stil für [7]|CSS-Angaben für die Werte 0 bis 7 (alle CSS-Attribute können hier angegeben werden; jeweils mit Semikolon voneinander getrennt). Hier kann man z.B. die Schriftgröße oder Umrandungsfarbe abhängig vom Datenpunkt-Wert ändern.  

![057]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### Bool HTML  
![022]  
Dieses Widget stellt Bool-Werte dar.

Attribut|Beschreibung|
----|----|
ObjectID|Datenpunkt
Voranstellen HTML|Text oder HTML-Code, der vor dem String angezeigt wird.
HTML anhängen|Text oder HTML-Code, der hinter dem String angezeigt wird. 
HTML bei 'false'|Text oder HTML-Code, der im False-Fall angezeigt wird.
HTML bei 'true'|Text oder HTML-Code, der im True-Fall angezeigt wird.

![058]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### Ack Flag HTML  
![023]  
Dieses Widget stellt das Acknowledge-Flag eines Datenpunkts dar.

Attribut|Beschreibung|
----|----|
ObjectID|Datenpunkt
Voranstellen HTML|Text oder HTML-Code, der vor dem String angezeigt wird.
HTML anhängen|Text oder HTML-Code, der hinter dem String angezeigt wird. 
HTML bei 'false'|Text oder HTML-Code, der im False-Fall (Ack-Flag nicht gesetzt) angezeigt wird.
HTML bei 'true'|Text oder HTML-Code, der im True-Fall (Ack-Flag gesetzt) angezeigt wird.

![059]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### Bool Checkbox
![024]  
Dieses Widget zeigt Bool-Werte als einfache Checkbox an und erlaubt außerdem, den Wert  umzuschalten.

Attribut|Beschreibung|
----|----|
ObjectID|Datenpunkt (Boolean)
Voranstellen HTML|Text oder HTML-Code, der vor dem String angezeigt wird.
HTML anhängen|Text oder HTML-Code, der hinter dem String angezeigt wird. 

![060]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### Bool Select
![025]  
Dieses Widget stellt Bool-Werte als Dropdown dar und erlaubt außerdem, den Wert umzuschalten.

Attribut|Beschreibung|
----|----|
ObjectID|Datenpunkt (Boolean)
Voranstellen HTML|Text oder HTML-Code, der vor dem String angezeigt wird.
HTML anhängen|Text oder HTML-Code, der hinter dem String angezeigt wird. 
Text für TRUE|Text der im True-Fall angezeigt wird.
Text für FALSE|Text der im False-Fall angezeigt wird.

![061]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### Bool HTML Click
![026]  
Dieses Widget stellt Bool-Werte dar und erlaubt außerdem, den Wert auf Klick innerhalb der Widget-Fläche umzuschalten.

Attribut|Beschreibung|
----|----|
html_prepend|Text oder HTML-Code, der vor dem Bild angezeigt wird.
html_append|Text oder HTML-Code, der hinter dem Bild angezeigt wird.
text_true|Text für den True-Fall
text_false|Text für den False-Fall 
![062]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### Bool SVG  
![027]  
Dieses Widget stellt Bool-Werte mittels SVG-Grafik dar und erlaubt außerdem, den Wert des Datenpunkts mit einem Klick innerhalb der Widget-Fläche umzuschalten. Dabei ist die Widget-Fläche die Zeichnungsfläche. 

Attribut|Beschreibung|
----|----|
Nur Anzeige|Verhindert, dass der Datenpunktwert geändert wird
SVG bei 'false'|SVG-Grafik, falls Datenpunkt 'false' ist
SVG bei 'true'|SVG-Grafik, falls Datenpunkt 'true' ist
![063]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### HTML State
![028]  
Dieses Widget setzt bei Klick innerhalb der Widget-Fläche einen bestimmten Wert.

Attribut|Beschreibung|
----|----|
HTML|Text oder HTML-Code, der angezeigt wird
Wert|Wert der gesetzt werden soll  
![064]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### Hide on 0/false
![030]  
Dieses Widget verschwindet, wenn der Wert des zugeordneten Datenpunkts 0 bzw false ist.  Geschickt z.B. für die Anzeige von Servicemeldungen  

![066]  
[:arrow_up: back to top ](#basic) 
*********************************************************


### Red Number
![029]  
Anzeige eines numerischen Werts im Stil der iOS Benachrichtigungs-Symbole. Wenn der Datenpunkt den Wert 0 annimmt, ist dieses Widget unsichtbar. Damit ist es gut geeignet für Anzeigen, die nur in bestimmten Situationen sichtbar sein sollen (z.B. Warnungen).  

Attribut|Beschreibung|
----|----|
Art| Darstellung als Kreis (bzw. Rechteck mit abgerundeten Ecken) oder Pin
HTML voranstellen|Text oder HTML-Code, der vor dem Bild angezeigt wird.
HTML anhängen (Singular)|Text oder HTML-Code, der hinter dem Bild angezeigt wird, wenn Wert = 1
HTML anhängen (Plural)|Text oder HTML-Code, der hinter dem Bild angezeigt wird, wenn Wert > 1

![065]  
[:arrow_up: back to top ](#basic) 
*********************************************************


### Bulb on off
![030]  
Dieses Widget stellt einen Wert als ausgeschaltete oder leuchtende Glühbirne auf schwarzem Hintergrund dar. Ist für Bool und Float-Werte (Dimmer) einsetzbar.  

Attribut|Beschreibung|
----|----|
Min|Minimalwert (aus)
Max|Maximalwert (an)
Symbol für AUS|Bild für Zustand AUS (alternativ zur Standard-Birne)
Symbol für AN|Bild für Zustand AN
Nur lesend|Keine Zustandsänderung bei Click
URL bei true|URL, die beim Click aufgerufen wird, falls der Datenpunkt 'ObjectID' wahr ist (z.B. um per REST einen Befehl an ein anderes Gerät zu schicken).
URL bei false|URL, die beim Click aufgerufen wird, falls der Datenpunkt 'ObjectID' falsch ist.
Objekt-ID bei true|Hier kann ein Datenpunkt angegeben werden, in den beim Click ein Wert geschrieben wird, falls der Datenpunkt 'ObjectID' wahr ist.
Objekt-ID bei false|Hier kann ein (anderer) Datenpunkt angegeben werden, in den beim Click ein Wert geschrieben wird, falls der Datenpunkt 'ObjectID' falsch ist.
Wert für ID bei false|Wert, der auf den Datenpunkt 'Objekt-ID bei false' geschrieben werden soll
Wert für ID bei true|Wert, der auf den Datenpunkt 'Objekt-ID bei true' geschrieben werden soll

![064]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### Bar Horizontal
![031]  
Dieses Widget stellt einen Wert von 0-100% als horizontalen Balken dar.

Attribut|Beschreibung|
----|----|
Min|Minimalwert, der 0% Balken entspricht
Max|Maximalwert, der 100% Balken entspricht
Ausrichtung|horizontal (standard) oder vertikal
Farbe|Farbe des Balkens
Rand|@@@???@@@
Durchsichtigkeit|@@@???@@@
Wert umkehren|Wenn hier 'true' eingetragen wird, wird der Balken von rechts nach links statt von links nach rechts angezeigt.
border|CSS-Eigenschaft 'border' des Balkens
shadow|CSS-Eigenschaft 'box-shadow' des Balkens
![067]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### Note
![032]  
Dieses Widget stellt den Wert eines (String)-Datenpunkts als Notizzettel dar.

Attribut|Beschreibung|
----|----|
ObjectID|Datenpunkt (Boolean)
Maximale Breite|@@@???@@@
Voranstellen HTML|Text oder HTML-Code der vor dem String angezeigt wird.
HTML anhängen|Text oder HTML-Code der hinter dem String angezeigt wird. 

![068]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### JSON Table
![033]  
Dieses Widget stellt ein JSON als Tabelle dar.

Attribut|Beschreibung|
----|----|
Table ObjectID|Datenpunkt (Boolean)
Static JSON (If no ID)|Hier kann man ein statisches JSON-Objekt definieren, falls man keinen Datenpunkt verwenden möchte.
Ereignis ID|@@@???@@@
Neues Ereignis am Anfang|Neueste Einträge oben in der Tablle anzeigen
Bestätigung ID|@@@???@@@
Kein Header|Tabellenüberschrift ausblenden
Zeige Scrollbar|Scrollbar, um durch längere Tabelle zu scrollen
Detailed Widget|Hier kann ein weiteres Widget angegeben werden, das die Details einer Zeile anzeigt, auf die im JSON-Table-Widget geklickt wurde
Maximale Zeilenzahl|Anzahl der Zeilen, die maximal dargestellt werden sollen
Kolumnanzahl|Anzahl der Spalten aus der Tabelle
--> Headers[0]| (abhängig von eingestellter Spaltenanzahl)
Name[1]|Spaltenname (abweichend vom Name im JSON-Objekt)
Width[1]|Spaltenbreite
Attribut in JSON[1]|Spalte entspricht diesem JSON-Attribut

![069]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### Html Logout
![034]  
Dieses Widget dient zum Abmelden per HTML-Button.

Attribut|Beschreibung|
----|----|
HTML|Definition des Button
Weiterleiten nach Logout|Adresse (URL), auf die nach dem Click weitergeleitet wird
Mobile App schließen|Die VIS-App schließen


![070]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### Gesture Indicator
![035]  
@@@???@@@

Attribut|Beschreibung|
----|----|
HTML voranstellen|Text oder HTML-Code der vor dem Bild angezeigt wird.
HTML anhängen (Singular)|Text oder HTML-Code der hinter dem Bild angezeigt wird, wenn Wert = 1
HTML anhängen (Plural)|Text oder HTML-Code der hinter dem Bild angezeigt wird, wenn Wert > 1
Zeichen nach Komma|Anzahl der dargestellten Nachkommastellen
Komma als Trennung|Komma statt Dezimalpunkt
Tausender Trennzeichen|Trennzeichen anzeigen
Wert multiplizieren|Faktor mit dem der Zahlenwert multipliziert wird

![071]  
[:arrow_up: back to top ](#basic) 
*********************************************************

### Speech to Text
![036]  
@@@???@@@

Attribut|Beschreibung|
----|----|
Object ID|
Sprachmodus|
Sprache|
Schlüsselworte|
Kein Bild|
Inaktiv|
Aktiv|
Gestartet|
Gefunden|
Gesendet|
Höhe|
Breite|
Keine Hilfetexte|
Keine Ergebnisse|
Schlüsselworte-Farbe|
Gesendet-Farbe|

[:arrow_up: back to top ](#basic) 
*********************************************************

### Full Screen
![037]  
Schaltet in den Fullscreen-Modus (und wieder zurück)
 
[:arrow_up: back to top ](#basic) 
*********************************************************

### Screen Resolution
![038]  
Zeigt die Auflösung und Instanz-ID der Standard-Ansicht an.
  
[:arrow_up: back to top ](#basic) 
*********************************************************

[001]: media/basic_prev_html.png 
[002]: media/basic_prev_shape.png
[003]: media/basic_prev_iframe.png
[004]: media/basic_prev_image.png
[005]: media/basic_prev_tpllink.png
[006]: media/basic_prev_tplframe.png
[007]: media/basic_prev_statefuliframe8.png
[008]: media/basic_prev_containerview.png
[009]: media/basic_prev_statefulcontainerview8.png
[010]: media/basic_prev_statefulimage.png
[011]: media/basic_prev_htmlnavigation.png
[012]: media/basic_prev_filterdropdown.png
[013]: media/basic_prev_valuefloat.png
[014]: media/basic_prev_valuestring.png
[015]: media/basic_prev_valuestringraw.png
[016]: media/basic_prev_valuestringimg.png
[017]: media/basic_prev_valuetimestamp.png
[018]: media/basic_prev_valuelastchange.png
[019]: media/basic_prev_valuelist.png
[020]: media/basic_prev_valuelisthtml.png
[021]: media/basic_prev_valuelisthtml8.png
[022]: media/basic_prev_valuebool.png
[023]: media/basic_prev_ackbool.png
[024]: media/basic_prev_valueboolcheckbox.png
[025]: media/basic_prev_valueboolselect.png
[026]: media/basic_prev_valueboolctrl.png
[027]: media/basic_prev_valueboolctrlsvg.png
[028]: media/basic_prev_basicstate.png
[029]: media/basic_prev_rednumber.png
[030]: media/basic_prev_bulbonoffctrl.png
[031]: media/basic_prev_valuefloatbar.png
[032]: media/basic_prev_note.png
[033]: media/basic_prev_tablebody.png
[034]: media/basic_prev_htmllogout.png
[035]: media/basic_prev_valuegesture.png
[036]: media/basic_prev_speech2text.png
[037]: media/basic_prev_fullscreen.png
[038]: media/basic_prev_screenresolution.png
[039]: media/basic_explain_html.png
[040]: media/basic_explain_svg.gif
[041]: media/basic_explain_iframe.gif
[042]: media/basic_explain_image.gif
[043]: media/basic_explain_link.gif
[044]: media/basic_explain_border.gif
[045]: media/basic_explain_iframe8.gif
[046]: media/basic_explain_view_in_widget.gif
[047]: media/basic_explain_image8.gif
[048]: media/basic_explain_view_in_widget8.gif
[049]: media/basic_explain_number.gif
[050]: media/basic_explain_htmlnavigation.gif
[051]: media/basic_explain_string.gif
[052]: media/basic_explain_stringunescaped.gif
[053]: media/basic_explain_stringimgsrc.gif
[054]: media/basic_explain_timestamp.gif
[055]: media/basic_explain_valuelisttext.gif
[056]: media/basic_explain_valuelisthtml.gif
[057]: media/basic_explain_valuelisthtmlstyle.gif
[058]: media/basic_explain_boolhtml.gif
[059]: media/basic_explain_ackflaghtml.gif
[060]: media/basic_explain_boolcheckbox.gif
[061]: media/basic_explain_boolselect.gif
[062]: media/basic_explain_boolhtml3.gif
[063]: media/basic_explain_boolsvg.gif
[064]: media/basic_explain_htmlstate.gif
[065]: media/basic_explain_rednumber.gif
[066]: media/basic_explain_bulb.gif
[067]: media/basic_explain_bar.gif
[068]: media/basic_explain_notes.gif
[069]: media/basic_explain_json.gif
[070]: media/basic_explain_logout.gif
