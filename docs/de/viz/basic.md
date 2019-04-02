# Basic  

| Widget                  | Image | Beschreibung
|-------------------------|-------|-------------|
| [HTML](#Html-frame)     | ![001](media/widget_images/basic/Prev_HTML.png)|Dieses Widget stellt beliebigen HTML-Code dar.|
| [Svg Shape](#svg-shape) | ![002](media/widget_images/basic/Prev_Shape.png)|Stellt eine Form dar|
| [iFrame](#iframe)       | ![003](media/widget_images/basic/Prev_iFrame.png)|Dieses Widget bindet ein iFrame ein|
| [Image](#image)         | ![004](media/widget_images/basic/Prev_Image.png)|Dieses Widget stellt ein Bild dar.|
| [Link](#link)           | ![005](media/widget_images/basic/Prev_tplLink.png)|Dieses Widget entspricht dem Widget "static - HTML" ist aber zusätzlich auf seiner ganzen Fläche ein klickbarer Link. Kann für die Navigation zwischen Views oder für externe Links genutzt werden.|
| [Border](#border)       | ![006](media/widget_images/basic/Prev_tplFrame.png)||
| [iFrame8](#iframe8)     | ![007](media/widget_images/basic/Prev_StatefulIFrame8.png)||
| [View in widget](#view-in-widget)| ![008](media/widget_images/basic/Prev_ContainerView.png)|Dieses Widget kann Views innerhalb von Views darstellen.Sinnvoll z.B. für eine Navigation: Man baut eine View mit Navigations-Elementen auf und bindet diese dann in beliebig vielen anderen Views ein.|
| [view in widget 8](#view-in-widget-8)]| ![009](media/widget_images/basic/Prev_StatefulContainerView8.png)|Zeigt eine von 8 Views in Abhängigkeit von einem Zustand an.|
| `Image 8`                 | ![010](media/widget_images/basic/Prev_StatefulImage.png)|Zeigt eines von 8 Bildern in Abhängigkeit von einem Zustand an.|
| `HTML navigation`         | ![011](media/widget_images/basic/Prev_HTMLnavigation.png)|Dieses Widget dient dazu eine Navigation zwischen den Views aufzubauen. Entspricht dem Widget "static - link", ist jedoch ausschließlich für die Navigation zwischen den Views nutzbar und bietet zusätzlich die Möglichkeit animierte Effekte beim Wechsel der Views zu verwenden.|
| `filter - dropdown`       | ![012](media/widget_images/basic/Prev_FilterDropdown.png)||
| `Number`                  | ![013](media/widget_images/basic/Prev_ValueFloat.png)|Dieses Widget stellt einen Zahlenwert dar|
| `String `                 | ![014](media/widget_images/basic/Prev_ValueString.png)|Dieses Widget stellt einen Datenpunkt vom Typ Zeichenkette dar.|
| `String (unescaped)`      | ![015](media/widget_images/basic/Prev_ValueStringRaw.png)|Dieses Widget stellt einen Datenpunkt vom Typ Zeichenkette dar. Im Unterschied zum Widget "hm_val - String" werden dabei keine Sonderzeichen "escaped" - d.h. die Variable kann auch HTML-Code enthalten und dieser wird dann dargestellt.|
| `String img src`          | ![016](media/widget_images/basic/Prev_ValueStringImg.png)|Diesem Widget kann ein Variable vom Typ Zeichenkette zugeordnet werden, eine dort enthaltene URL wird dann als Bild dargestellt|
| `Timestamp`               | ![017](media/widget_images/basic/Prev_ValueTimestamp.png)||
| `Last change Timestamp`   | ![018](media/widget_images/basic/Prev_ValueLastchange.png)||
| `ValueList Text`          | ![019](media/widget_images/basic/Prev_ValueList.png)|Dieses Widget stellt eine Variable vom Typ Werteliste dar.|
| `ValueList HTML`          | ![020](media/widget_images/basic/Prev_ValueListHtml.png)|Dieses Widget stellt eine Variable vom Typ Werteliste dar. Entspricht dem Widget "hm_val - ValueList Text, allerdings wird nicht "escaped", d.h. in valuelist kann HTML-Code eingetragen werden.|
| `ValueList HTML Style`    | ![021](media/widget_images/basic/Prev_ValueListHtml8.png)|Dieses Widget stellt eine Variable vom Typ Werteliste dar. Entspricht dem Widget "hm_val - ValueList HTML, bietet aber die Möglichkeit für 8 verschiedene Werte (0-7) auch 8 verschiedene CSS-Angaben zu verwenden.|
| `Bool HTML`               | ![022](media/widget_images/basic/Prev_ValueBool.png)|Dieses Widget stellt Bool-Werte dar.|
| `AckFlag HTML`            | ![023](media/widget_images/basic/Prev_AckBool.png)||
| `Bool Checkbox`           | ![024](media/widget_images/basic/Prev_ValueBoolCheckbox.png)|Dieses Widget zeigt Bool-Werte als einfache Checkbox an und erlaubt außerdem den Wert zu umzuschalten.|
| `Bool Select`             | ![025](media/widget_images/basic/Prev_ValueBoolSelect.png)|Dieses Widget stellt Bool-Werte als Dropdown dar und erlaubt außerdem den Wert umzuschalten.|
| `Bool HTML`               | ![026](media/widget_images/basic/Prev_ValueBoolCtrl.png)|Dieses Widget stellt Bool-Werte dar und erlaubt außerdem den Wert auf Klick innerhalb der Widget-Fläche umzuschalten.|
| `Bool SVG`                | ![027](media/widget_images/basic/Prev_ValueBoolCtrlSvg.png)|Dieses Widget setzt bei Klick innerhalb der Widget-Fläche einen Wert.|
| `HTML State`              | ![028](media/widget_images/basic/Prev_BasicState.png)|Dieses Widget verschwindet wenn der Wert des zugeordneten Datenpunkts 0 bzw false ist. Geschickt z.B. für die Anzeige von Servicemeldungen|
| `Red Number`              | ![029](media/widget_images/basic/Prev_RedNumber.png)|Anzeige eines numerischen Werts im Stil der iOS Benachrichtigungs-Symbole. Verschwindet beim Wert 0.|
| `Bulb on/off`             | ![030](media/widget_images/basic/Prev_BulbOnOffCtrl.png)|Dieses Widget stellt einen Wert als ausgeschaltete oder leuchtende Glühbirne auf schwarzem Hintergrund dar. Ist für Bool und Float-Werte (Dimmer) einsetzbar.|
| `Bar`                     | ![031](media/widget_images/basic/Prev_ValueFloatBar.png)|Dieses Widget stellt einen Wert von 0-100 als horizontalen Balken dar.|
| `Note`                    | ![032](media/widget_images/basic/Prev_Note.png)||
| `json Table`              | ![033](media/widget_images/basic/Prev_TableBody.png)||
| `HTML logout`             | ![034](media/widget_images/basic/Prev_HtmlLogout.png)||
| `Gesture indicator`       | ![035](media/widget_images/basic/Prev_ValueGesture.png)||
| `Speech to text`          | ![036](media/widget_images/basic/Prev_Speech2Text.png)||
| `Full Screen`             | ![037](media/widget_images/basic/Prev_FullScreen.png)||
| `Screen Resolution`       | ![038](media/widget_images/basic/Prev_ScreenResolution.png)||
| `todo`                    | ![](media/widget_images/basic/Explanation/html.png) ||
| `todo`                    | ![](media/widget_images/basic/Explanation/svg.gif) ||
| `todo`                    | ![](media/widget_images/basic/Explanation/iframe.gif) ||
| `todo`                    | ![](media/widget_images/basic/Explanation/image.gif) ||
| `todo`                    | ![](media/widget_images/basic/Explanation/link.gif) ||
| `todo`                    | ![](media/widget_images/basic/Explanation/border.gif) ||

### Html Frame  
Dieses Widget stellt beliebigen HTML-Code dar. Es ist auch möglich, Javascript innerhalb des Widgets zu verwenden.  

| Attribut|Beschreibung|
|-----|----|
| `ObjectId`|Id eines darzustellenden Objekts, das HTML enthält|
| Voranstellen html|HTML-Code, der vor dem Objekt dargestellt werden soll|  
| Html anhängen|HTML-Code, der nach dem Objekt dargestellt werden soll|  

**Beispiel:**  
![039]  

### SVG Shape
Dieses Widget stellt einfach eine geometrische Form da, wobei einige Formen vordefiniert sind.  

| Attribut|Beschreibung|
|-----|----|
| Typ|geometrische Form|  
| Linienfarbe|Farbe der Formumrandung|  
| Füllfarbe|Farbe der Füllung|  
| Linienbreite||  
| Drehen|Drehwinkel ausgehend von Initialposition in Grad|  
| Breitenskala|Skaliert die Breite zwischen 0 und 100%|  
| Höhenskala|Skaliert die Höhe zwischen 0 und 100%|  

**Beispiel:**  
![040]  

### iFrame  
Stellt einen iFrame dar  

| Attribut|Beschreibung|
|-----|----|
| Quelle|Pfad zur Quelle (Webseite, Bild); das kann lokal oder per URL definiert sein|  
| Kein Sandkasten|:construction:|  
| Updatezeit|:construction:|  
| Update bei Aufwachen|:construction:|  
| Update bei Viewwechsel|:construction:|  
| Addiere nicht zu URL|:construction:|  
| Scroll X|:construction:|  
| Scroll Y|:construction:|  
| Kein Rahmen|:construction:|  

**Beispiel:**  
![041]  

### Image
Dieses Widget stellt ein Bild dar.  

| Attribut|Beschreibung|
|-----|----|
| Quelle|Pfad zur Quelle im lokalen Dateisystem|  
| Strecken|Bild an Dimensionen des Rahmens anpassen|  
| Updatezeit|:construction:|  
| Update bei Aufwachen|:construction:|  
| Update bei Viewwechsel|:construction:|  
| Addiere nicht zu URL|:construction:|  
| Allow useer interactions|:construction:|  

**Beispiel:**  
![042]  

### Link
Dieses Widget entspricht dem Widget "HTML Frame", ist aber zusätzlich auf seiner ganzen Fläche ein klickbarer Link. Kann für die Navigation zwischen Views oder für externe Links genutzt werden.  

| Attribut|Beschreibung|
|-----|----|
| `html`|Selbsterklärend ;) ...hier den HTML-Code zur formatierten Darstellung von Text einfügen.
| `link`|Die Link-URL. Um einen Link auf eine andere View zu nutzen, einfach den View-Namen mit vorangestelltem Hash-Symbol (#) eintragen
| `target`|Das Ziel des Links. Leer lassen um im gleichen Browser-Fenster zu bleiben; möchte man ein neues Fenster öffnen _blank eintragen.  Weitere Optionen: _self (gleicher Tab),  _parent (),  _top ()

**Beispiel:**  
![043]  

### Border  
Dieses Widget stellt einfach einen Rahmen dar - ohne weitere Funktion, nur Text und Farbe. Das kann zur Gruppierung von Widgets genutzt werden.  

| Attribut|Beschreibung|
|-----|----|
| Titel|Selbsterklärend
| oberer Beschriftungsfont|Schriftart des Titels
| Obere Beschriftungsfarbe|Farbe des Titels
| Titelhintergrund|Hintergrundfarbe des Titeltextes
| Titel-Oben-Abstand|Abstand des Titels vom oberen Rand
| Titel-Links-Abstand|Abstand des Titels vom linken Rand
| Kopfhöhe|Höhe eines Balkens vom oberen Rand an
| Kopffarbe|Farbe des Balkens  

**Beispiel:**  
![044]  

### View in widget 8
Zeigt eine von 8 Views in Abhängigkeit von einem Zustand an.  

| Attribut|Beschreibung|
|-----|----|
| `persistent`|Views die einmal gerendert wurden nicht mehr aus dem DOM Entfernen
	
### iFrame 8
Zeigt einen von 8 iFrames in Abhängigkeit von einem Zustand an.  

### HTML navigation
Dieses Widget dient dazu, eine Navigation zwischen den Views aufzubauen. Entspricht dem Widget "static - link", ist jedoch ausschließlich für die Navigation zwischen den Views nutzbar und bietet zusätzlich die Möglichkeit, animierte Effekte beim Wechsel der Views zu verwenden.

| Attribut|Beschreibung|
|-----|----|
| `html`|Selbsterklärend ;) ...hier den HTML-Code einfügen
| `nav_view`|Hier muss der Name der View zu der navigiert werden soll eingetragen werden
| `hide_effect`|Hier kann der Name eines jQueryUI Effektes eingetragen werden, der beim Verlassen der View genutzt wird. Verfügbare Effekte sind: Blind, Bounce, Clip, Drop, Explode, Fade, Fold, Highlight, Puff, Pulsate, Scale, Shake, Size, Slide und Transfer.
| `hide_duration`|Dauer des Effekts in ms
| `show_effect`|siehe oben, das gleiche - aber dieses mal für das Einblenden der neuen View
| `show_duration`|Siehe oben, Zeit in ms für das Einblenden der neuen View
	
### Filter - dropdown  

### Number
Dieses Widget stellt einen Zahlenwert dar (sowohl für Integer als auch Float verwendbar)

| Attribut|Beschreibung|
|-----|----|
| `html_prepend`|Text oder HTML-Code der vor dem Zahlenwert angezeigt wird
| `html_append`|Text oder HTML-Code der hinter dem Zahlenwert angezeigt wird
| `digits`|Anzahl der dargestellten Nachkommastellen
| `factor`|Faktor mit dem der Zahlenwert multipliziert wird
	
### String
Dieses Widget stellt einen Datenpunkt vom Typ Zeichenkette dar.

| Attribut|Beschreibung|
|-----|----|
| `html_prepend`|Text oder HTML-Code der vor dem String angezeigt wird.
| `html_append`|Text oder HTML-Code der hinter dem String angezeigt wird.
	
### String (unescaped)
Dieses Widget stellt einen Datenpunkt vom Typ Zeichenkette dar. Im Unterschied zum Widget "hm_val - String" werden dabei keine Sonderzeichen "escaped" - d.h. die Variable kann auch HTML-Code enthalten und dieser wird dann dargestellt.

| Attribut|Beschreibung|
|-----|----|
| html_prepend|Text oder HTML-Code der vor dem String angezeigt wird.
| html_append|Text oder HTML-Code der hinter dem String angezeigt wird.

### String img src
Diesem Widget kann eine Variable vom Typ Zeichenkette zugeordnet werden, eine dort enthaltene URL wird dann als Bild dargestellt.

| Attribut|Beschreibung|
|-----|----|
| `html_prepend`|Text oder HTML-Code der vor dem Bild angezeigt wird.
| `html_append`|Text oder HTML-Code der hinter dem Bild angezeigt wird.

### Last change timestamp  
Zeigt den letzten Zeitstempel des verbundenen States an.  

### ValueList Text
Dieses Widget stellt eine Variable vom Typ Werteliste dar.

| Attribut|Beschreibung|
|-----|----|
| `valuelist`|Eine Semikolon-getrennte Liste von Texten für die jeweiligen Werte.
| `html_prepend`|Text oder HTML-Code der vor dem Bild angezeigt wird.
| `html_append`|Text oder HTML-Code der hinter dem Bild angezeigt wird.
	
### ValueList HTML
Dieses Widget stellt eine Variable vom Typ Werteliste dar. Entspricht dem Widget "hm_val - ValueList Text, allerdings wird nicht "escaped", d.h. in valuelist kann HTML-Code eingetragen werden.

| Attribut|Beschreibung|
|-----|----|
| `valuelist`|Eine Semikolon-getrennte Liste von HTML-Code für die jeweiligen Werte.
| `html_prepend`|Text oder HTML-Code der vor dem Bild angezeigt wird.
| `html_append`|Text oder HTML-Code der hinter dem Bild angezeigt wird.
	
### ValueList HTML 8
Dieses Widget stellt eine Variable vom Typ Werteliste dar. Entspricht dem Widget "ValueList HTML, bietet aber die Möglichkeit für 8 verschiedene Werte (0-7) auch 8 verschiedene CSS-Angaben zu verwenden.

| Attribut|Beschreibung|
|-----|----|
| `html_prepend`|Text oder HTML-Code der vor dem Bild angezeigt wird.
| `html_append`|Text oder HTML-Code der hinter dem Bild angezeigt wird|
| value0 bis value7|Text oder HTML-Code für die Werte 0 bis 7
| style0 bis style7|CSS-Angaben für die Werte 0 bis 7  
	
### Bool HTML
Dieses Widget stellt Bool-Werte dar.

| Attribut|Beschreibung|
|-----|----|
| `html_prepend`|Text oder HTML-Code der vor dem Bild angezeigt wird.
| `html_append`|Text oder HTML-Code der hinter dem Bild angezeigt wird.
| `html_true`|Text oder HTML-Code der im True-Fall angezeigt wird.
| `html_false`|Text oder HTML-Code der im False-Fall angezeigt wird.
	
### Bool Checkbox
Dieses Widget zeigt Bool-Werte als einfache Checkbox an und erlaubt außerdem den Wert zu umzuschalten.

| Attribut|Beschreibung|
|-----|----|
| `html_prepend`|Text oder HTML-Code der vor der Checkbox angezeigt wird.
| `html_append`|Text oder HTML-Code der hinter der Checkbox angezeigt wird.
	
### Bool Select
Dieses Widget stellt Bool-Werte als Dropdown dar und erlaubt außerdem den Wert umzuschalten.

| Attribut|Beschreibung|
|-----|----|
| `html_prepend`|Text oder HTML-Code der vor dem Bild angezeigt wird.
| `html_append`|Text oder HTML-Code der hinter dem Bild angezeigt wird.
| `text_true`|Text für den True-Fall
| `text_false`|Text für den False-Fall
	
### Bool HTML
Dieses Widget stellt Bool-Werte dar und erlaubt außerdem den Wert auf Klick innerhalb der Widget-Fläche umzuschalten.

| Attribut|Beschreibung|
|-----|----|
| `html_prepend`|Text oder HTML-Code der vor dem Bild angezeigt wird.
| `html_append`|Text oder HTML-Code der hinter dem Bild angezeigt wird.
| `text_true`|Text für den True-Fall
| `text_false`|Text für den False-Fall

### Bool HTML  

### Bool SVG  


### HTML State
Dieses Widget setzt bei Klick innerhalb der Widget-Fläche einen Wert.

| Attribut|Beschreibung|
|-----|----|
| `html`|Text oder HTML-Code der angezeigt wird
| `value`|Wert der gesetzt werden soll
	
### Hide on 0/false
Dieses Widget verschwindet, wenn der Wert des zugeordneten Datenpunkts 0 bzw false ist. Geschickt z.B. für die Anzeige von Servicemeldungen

### Red Number
Anzeige eines numerischen Werts im Stil der iOS Benachrichtigungs-Symbole. Verschwindet beim Wert 0.  

### Bulb on/off
Dieses Widget stellt einen Wert als ausgeschaltete oder leuchtende Glühbirne auf schwarzem Hintergrund dar. Ist für Bool und Float-Werte (Dimmer) einsetzbar.  

### Bulb on/off
Dieses Widget stellt einen Wert als ausgeschaltete oder leuchtende Glühbirne auf schwarzem Hintergrund dar. Bei Klick auf das Widget wird der Wert umgeschaltet.  

### Drehgriff
Dieses Widget stellt eine Drehgriff-Sensor mit den originalen Homematic-Icons dar.  

### TFK
Dieses Widget stellt einen Tür-/Fenster-Kontakt mit den originalen Homematic-Icons dar.  

### Bar Horizontal
Dieses Widget stellt einen Wert von 0-100 als horizontalen Balken dar.

| Attribut|Beschreibung|
|-----|----|
| `factor`|Faktor mit dem der Wert multipliziert wird. Beispiel: für einen Dimmer (der von 0.00 bis 1.00 geht) muss 100 eingetragen werden.
| `color`|CSS-Eigenschaft background-color des Balkens
| `border`|CSS-Eigenschaft border des Balkens
| `shadow`|CSS-Eigenschaft box-shadow des Balkens
| `reverse`|Wenn hier true eingetragen wird, wird der Balken von rechts nach links statt von links nach rechts angezeigt.

### Bar Vertical
Entspricht dem Widget "hm_val - Bar Horizontal, allerdings vertikal statt horiziontal.

| Attribut|Beschreibung|
|-----|----|
| `factor`|Faktor mit dem der Wert multipliziert wird. Beispiel: für einen Dimmer (der von 0.00 bis 1.00 geht) muss 100 eingetragen werden.
| `color`|CSS-Eigenschaft background-color des Balkens
| `border`|CSS-Eigenschaft border des Balkens
| `shadow`|CSS-Eigenschaft box-shadow des Balkens
| `reverse`|Wenn hier true eingetragen wird wird, der Balken von unten nach oben statt von oben nach unten angezeigt
