# **ioBroker.vis Widgets**

Für die Visualisierung in ioBroker mit vis gibt es viele verschiedene Widgets. Diese sind in Widgetsätzen, die zum Teil nachinstalliert werden müssen, zusammengefasst.   [table id=32/]

# **Die Grundeinstellungen von Widgets [<span style="font-size: 10pt;">(siehe jetzt hier)</span>](http://www.iobroker.net/?page_id=2754&lang=de#Widget)**

## Alter Rest ->

## **Generell**

[![001_Widget_Generell](img/001_Widget_Generell.jpg)](img/001_Widget_Generell.jpg) **Name:**  Hier kann ein eindeutiger Name für dieses Widget eingegeben werden **Kommentar:** Hier kann eine kurze Beschreibung dazu einegegeben werden **CSS Klasse:** **Filterwort:** **Zeige in Views:** Hier kann ausgewählt werden, ob dieses Widget nur im aktuellen View, oder in mehreren erscheinen soll. **Inaktiv (locked):**

## **Sichtbarkeit**

Die Sichtbarkeit eines Widgets kann von dem Zustand eines Datenpunktes abhängig gemacht werden. [![002_Widget_Sichtbarkeit](img/002_Widget_Sichtbarkeit.jpg)](img/002_Widget_Sichtbarkeit.jpg) **Object ID:**  Hier wird die ID des Datenpunkts eingegeben, der die Sichtbarkeit des ausgewählten widgets steuern soll. Der Datenpunkt kann über den Button gesucht werden. **Bedingung:** Das Widget wird sichtbar wenn die hier eingegebene Bedingung für den o.a. Datenpunkt... **Wert für die Bedingung:** ...dem hier eingebenen Wert entspricht.

## **Allgemein**

Der Abschnitt Allgemein ist für jedes Widget spezifisch und wird bei den einzelnen Widgets näher beschrieben. In diesem Abschnitt wird der gewünschte Datenpunkt in dem Feld Object ID dem Widget zugeordnet.   **Die CSS Einstellungen** des Widgets finden sich in den folgenden Menüpunkten und können den eigenen Wünschen angepasst werden:

## **CSS allgemein**[
![](img/vis_widgets-3_004_CSS_allgemein.jpg)
[](img/005_CSS_Font_Text.jpg)

**left:** Abstand vom linken Rand des Views **top:** Abstand vom oberen Rand des Views **width: **Breite des Widgets **height:** Höhe des Widgets **z-index: **Angebe der Ebene, in der das Widget liegt (0= auf dem Hintergrund, positive Werte= weiter vorne, je höher der Wert) **overflow-x:** **overflow-y:** **opacity:**

## **CSS Font & Text**

[![005_CSS_Font_Text](img/005_CSS_Font_Text.jpg)](img/005_CSS_Font_Text.jpg)   **color: **Schriftfarbe **text-align:** Bündigkeit des Textes (links, rechts, zentriert) **text-shadow: **Farbe des Textschattens **font-family: ** **font-style: ** **font-variant: ** **font-weight: ** **font-size: ** **line-height:** **letter-spacing: ** **word-spacing: **

## **CSS-Hintergrund**

[![006_CSS_Hintergrund](img/006_CSS_Hintergrund.jpg)](img/006_CSS_Hintergrund.jpg)   **background: ** **-color: **Farbe des Hintergrunds **-image: **Hintergrundbild **-repeat: ** **-attachement: ** **-position:** **-size: ** **-clip: ** **-origin: **

## **CSS Border**

[![007_CSS_Border](img/007_CSS_Border.jpg)](img/007_CSS_Border.jpg)   **-width:** Dicke der Umrandung **-style:** Linienart der Umrandung **-color: **Farbe der Umrandung **-radius:** Eckenradius der Umrandung; kann höchstens die Hälfte der kürzeren Strecke des Widgets sein

## **CSS Schatten und Abstand**

[![008_CSS_Schatten_Abstand](img/008_CSS_Schatten_Abstand.jpg)](img/008_CSS_Schatten_Abstand.jpg)   **padding: **Versatz vom Rand de Widget-Box **padding-left:** Versatz auf der linken Seite **padding-top:** Versatz auf der oberen Seite **padding-right:** Versatz auf der rechten Seite **padding-bottom:** Versatz auf der unteren Seite **box-shadow:** Farbe des Schattens der Widget-Box