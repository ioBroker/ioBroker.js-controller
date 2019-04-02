---
title:       "Widgets"
lastChanged: "13.09.2018"
---
# Widgets

## Generell

Widgets ('Gerät, Ding') sind in diesem Zusammenhang Anzeigeelemente, die auf verschiedene Weisen 
Zahlen, Texte, Bilder oder Diagramme darstellen und Interaktionsmöglichkeiten bieten.

## **ioBroker.vis Widgets**

Für die Visualisierung in ioBroker mit vis gibt es verschiedene Widget-Sätze.

### Die Grundeinstellungen von Widgets
 
#### **Generell**

![001_Widget_Generell](media/vis_widgets_001_Widget_Generell.jpg)  

| Attribut|Beschreibung|
|-----|----|
| Name|Hier kann ein eindeutiger Name für dieses Widget eingegeben werden
| Kommentar|Hier kann eine kurze Beschreibung dazu eingegeben werden
| CSS Klasse|:construction:
| Filterwort|:construction:
| Zeige in Views|Hier kann ausgewählt werden, ob dieses Widget nur im aktuellen View oder in mehreren erscheinen soll.
| Inaktiv (locked)|:construction:

#### **Sichtbarkeit**

Die Sichtbarkeit eines Widgets kann von dem Zustand eines Datenpunktes abhängig gemacht werden.  
![002_Widget_Sichtbarkeit](media/vis_widgets-2_002_Widget_Sichtbarkeit.jpg)  


| Attribut|Beschreibung|
|----|----|
| `Object ID`|Hier wird die ID des Datenpunkts eingegeben, der die Sichtbarkeit des ausgewählten widgets steuern soll. Der Datenpunkt kann über den Button gesucht werden.
| Bedingung|Das Widget wird sichtbar wenn die hier eingegebene Bedingung für den o.a. Datenpunkt...
| Wert für die Bedingung|...dem hier eingebenen Wert entspricht.

#### **Allgemein**

![](media/vis_widgets_003_Widget_Allgemein.jpg)  
Der Abschnitt 'Allgemein' ist für jedes Widget spezifisch 
und wird bei den einzelnen Widgets näher beschrieben. 
In diesem Abschnitt wird der gewünschte Datenpunkt in dem Feld Object ID dem Widget zugeordnet.  

***
Die **CSS Einstellungen** des Widgets finden sich in den folgenden Menüpunkten 
und können den eigenen Wünschen angepasst werden:

#### **CSS allgemein**
![](media/vis_widgets_004_CSS_allgemein.jpg)  

| Attribut|Beschreibung|
|-----|----|
| `left`|Abstand vom linken Rand des Views
| `top`|Abstand vom oberen Rand des Views
| `width`|Breite des Widgets
| `height`|Höhe des Widgets
| `z-index`|Angebe der Ebene, in der das Widget liegt (0= auf dem Hintergrund, positive Werte= je höher der Wert, desto weiter vorne)
| `overflow-x`|The overflow property specifies what should happen if content overflows an element's box. This property specifies whether to clip content or to add scrollbars when an element's content is too big to fit in a specified area.
| `overflow-y`|
| `opacity`|Durchsichtigkeit  (0=undurchsichtig ->Bild unsichtbar .. 1=durchsichtig ->Bild sichtbar)

#### **CSS Font & Text**

![005_CSS_Font_Text](media/vis_widgets_005_CSS_Font_Text.jpg)  

| Attribut|Beschreibung|
|-----|----| 
| `color`|Schriftfarbe  (über Auswahldialog oder per Farbcode)
| `text-align`|Bündigkeit des Textes (links, rechts, zentriert)
| `text-shadow`|Farbe des Textschattens
| `font-family`|Font
| `font-style`|Zeichensatzart (normal, kursiv, oblique, initial, inherit)
| `font-variant`|Zeichensatzvariante (normal, Kapitälchen, ...)
| `font-weight`|Zeichensatzstärke
| `font-size`|Schriftgröße
| `line-height`|Zeilenabstand
| `letter-spacing`|Zeichenabstand
| `word-spacing`|Wortabstand

#### **CSS-Hintergrund**

![006_CSS_Hintergrund](media/vis_widgets_006_CSS_Hintergrund.jpg)  

| Attribut|Beschreibung|
|-----|----| 
| background|Hier können mehrere der folgenden Eigenschaften gemeinsam angegeben werden
| `-color`|Farbe des Hintergrunds
| `-image`|Hintergrundbild
| `-repeat`|Legt fest, ob ein Hintergrund über die gesamte Breite oder/und Höhe eines Elements wiederholt wird.
| `-attachement`|Legt fest, ob ein Hintergrundbild fest ist, oder beim Scrollen mitverschoben wird
| `-position`|Ausrichtung des Hintergrundbildes (https://www.w3schools.com/cssref/pr_background-position.asp)
| `-size`|Größe des Hintergrundbildes
| `-clip`|Regelt die Überschneidung mit dem Rand
| `-origin`|Koordinatensystemursprung für Bildkoordinaten

(siehe https://www.w3schools.com/cssref/css3_pr_background.asp)  

#### **CSS Border**

![007_CSS_Border](media/vis_widgets_007_CSS_Border.jpg)  

| Attribut|Beschreibung|
|-----|----| 
| `-width`|Dicke der Umrandung
| `-style`|Linienart der Umrandung
| `-color`|Farbe der Umrandung
| `-radius`|Eckenradius der Umrandung; kann höchstens die Hälfte der kürzeren Strecke des Widgets sein

#### **CSS Schatten und Abstand**

![008_CSS_Schatten_Abstand](media/vis_widgets_008_CSS_Schatten_Abstand.jpg)  

| Attribut|Beschreibung|
|-----|----| 
| `padding`|Versatz vom Rand der Widget-Box
| `padding-left`|Versatz auf der linken Seite
| `padding-top`|Versatz auf der oberen Seite
| `padding-right`|Versatz auf der rechten Seite
| `padding-bottom`|Versatz auf der unteren Seite
| `box-shadow`|Farbe des Schattens der Widget-Box
| `margin-top`|Oberer Rand um das Widget (auto, %, px, pt, cm)
| `margin-right`|Rechter Rand um das Widget
| `margin-bottom`|Unterer Rand um das Widget
| `margin-left`|Linker Rand um das Widget

[185]: media/widget_images/swipe/Prev_Carousel.png
[186]: media/widget_images/swipe/Prev_Swipe.png

