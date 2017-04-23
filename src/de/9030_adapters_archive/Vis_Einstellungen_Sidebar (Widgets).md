# Die Einstellungen-Sidebar (Reiter Widgets)

siehe alte Version: Widget Grundeinstellungen

### Widget

Um Datenpunkte anzeigen oder Aktionen durchführen zu können, muss der zu steuernde Datenpunkt dem Widget zugeordnet werden. Dieser Eintrag ist im Abschnitt _Allgemein_ zu finden.

Unter dem Reiter Widget können die Eigenschaften eines Widgets sehr umfangreich eingestellt werden. (Ein Beispiel zu dem Umfang kann man nach Anklicken der Abbildung unten bekommen)

[
![](img/Vis_Einstellungen_Sidebar (Widgets)_ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_groups_Items.jpg)


Sobald ein Widget ausgewählt wurde ändert sich die Beschriftung des Reiters in die Kennung des ausgewählten Widgets.

Standardmäßig sind alle Gruppen zugeklappt und können nach vorhergehender Aktivierung der Checkbox aufgeklappt werden. Werden in den Gruppen keine Einstellungen vorgenommen gelten die Einstellungen des entsprechenden Views.

#### Generell (1)

[![](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_general.jpg)](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_general.jpg)

##### Name:

Hier kann ein eindeutiger Name für dieses Widget eingegeben werden

##### Kommentar:

Hier kann eine kurze Beschreibung dazu eingegeben werden

##### CSS Klasse:

Hier kann eine zuvor definierte CSS Klasse für das Widget ausgewählt werden.

##### Filterwort

Wenn hier ein Filter eingegeben wird, werden bei der Zuordnung des Datenpunktes nur Datenpunkte angezeigt, die diesem Filter entsprechen.

##### Zeige in Views

Hier kann ausgewählt werden, ob dieses Widget nur im aktuellen View, oder in mehreren erscheinen soll.

##### Inaktiv (locked)

Ist diese Checkbox markiert, kann das Widget nicht bedient werden.

#### Sichtbarkeit (2)

Die Sichtbarkeit eines Widgets kann von dem Zustand eines Datenpunktes abhängig gemacht werden. Der die Sichtbarkeit steuernde Datenpunkt kann auch ein anderer sein, als der, der mit dem Widget verknüpft ist. [![](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_Sichtbarkeit.jpg)](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_Sichtbarkeit.jpg)

##### Object ID

Hier wird die ID des Datenpunkts eingegeben, der die Sichtbarkeit des ausgewählten widgets steuern soll. Der Datenpunkt kann über den Button gesucht werden.

##### Bedingung

Das Widget wird sichtbar wenn die hier eingegebene Bedingung für den o.a. Datenpunkt...

##### Wert für die Bedingung

...dem hier eingebenen Wert entspricht.

##### Nur für Gruppen

Soll dieses Widget nicht für alle Anwender zu sehen sein, kann die Sichtbarkeit auf einzelne Gruppen, die in der Benutzersteuerung angelegt wurden beschränkt werden. Die entsprechenden Gruppen, die diesen View sehen sollen können über die entsprechende Checkboxen ausgewählt werden.

##### Falls Anwender nicht in der Gruppe

Hier wird das Verhalten für den View festgelegt, falls ein Anwender nicht zu einer der aktivierten Gruppen gehört. Dann kann der View entweder vollständig verborgen werden, oder in der Auswahl zwar sichtbar, aber nicht anwählbar sein.

#### Allgemein (3)

Der Abschnitt Allgemein ist für jedes Widget spezifisch und wird bei den einzelnen Widgets näher beschrieben. In diesem Abschnitt wird der gewünschte Datenpunkt in dem Feld Object ID dem Widget zugeordnet. (Bitte nicht mit dem Feld Object-ID in dem Block _Sichtbarkeit_ verwechseln!) **Die CSS Einstellungen** des Widgets finden sich in den folgenden Menüpunkten und können den eigenen Wünschen angepasst werden:

#### CSS allgemein (4) [](http://iobroker.net/wp-content/uploads/2015/05/004_CSS_allgemein.jpg) [](http://iobroker.net/wp-content/uploads/2015/05/005_CSS_Font_Text.jpg)[![](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_CSS_allgemein.jpg)](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_CSS_allgemein.jpg)

##### position

Elemente können durch Verwendung der Eigenschaft **position** aus dem normalen Elementfluss entfernt werden und an jede beliebige Stelle des Viewports positioniert werden. In diesem Pulldownmenü können die Optionen _nichts_ (dann müssen unten left und top ausgefüllt werden), _relativ_ oder _sticky_ ausgewählt werden. [(mehr)](https://wiki.selfhtml.org/wiki/Position)

##### display

Mit der Eigenschaft **display** wird festgelegt, welche Art von Box ein Element erzeugt. Jedes Element kann Null oder mehr Boxen erzeugen. Diese Funktion steht nach Aktivierung von relativ bzw. sticky unter dem Punkt position zur Verfügung. Die möglichen Optionen sind _nichts_ oder _inline-block. [(mehr)](https://wiki.selfhtml.org/wiki/Display)_

##### left

Abstand vom linken Rand des Views

##### top

Abstand vom oberen Rand des Views

##### width

Breite des Widgets

##### height

Höhe des Widgets

##### z-index

Angebe der Ebene, in der das Widget liegt (0= auf dem Hintergrund, positive Werte= weiter vorne, je höher der Wert)

##### overflow-x

Mit overflow-x lässt sich angeben, wie übergroßer Inhalt hinsichtlich der Breite des Elements behandelt wird.

[![](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_Overflow.jpg)](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_Overflow.jpg)

*   **visible:** Inhalte sind sichtbar
*   **hidden:** Inhalte sind unsichtbar
*   **scroll:** Inhalte sind per Scrollbalken erreichbar
*   **auto:** browserabhängig, die meisten Browser stellen Scrollbalken zur Verfügung
*   **initial:** Verhalten wirdauf Standardwerte zurückgesetzt
*   **inherit:** Verhalten wird vom Elternelement übernommen

##### overflow-y

Mit overflow-y lässt sich angeben, wie übergroßer Inhalt hinsichtlich der Höhe des Elements behandelt wird.

##### opacity

Dieser Wert gibt die (umgekehrte) Transparenz des Widgets an. Je höher der Wert, desto massiver wird das Widget angezeigt.

#### CSS Font & Text (5)

[![](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_Font_Textt.jpg)](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_Font_Textt.jpg)

##### color

Mit der Eigenschaft **color** wird die Farbe der Schrift bzw. des Textvordergrundes festgelegt. ([mehr](https://wiki.selfhtml.org/wiki/Color))

##### text-align

Die Eigenschaft **text-align** gibt die Orientierung des Textes innerhalb der Box an (rechtsbündig, zentriert, linksbündig...) ([mehr](https://wiki.selfhtml.org/wiki/Text-align))

##### text-shadow

Die Eigenschaft **text-shadow** ermöglicht die Darstellung von Schatten unter Texten, ohne dabei Bilder zu verwenden. ([mehr](https://wiki.selfhtml.org/wiki/Text-shadow))

##### font-family

Mithilfe der hier beschriebenen Eigenschaft **font-family** können Schriftarten anggeeben werden, ohne sich darum kümmern zu müssen, ob und wie die Schriftart beim Anwender angezeigt werden kann. Falls die angegebene Schriftart nicht angezeigt werden kann, bleibt die Angabe wirkungslos. ([mehr](https://wiki.selfhtml.org/wiki/Font-family))

##### font-style

Als Schriftstil wird die Neigung der Schrift bezeichnet, welche mit der Eigenschaft **font-style** gesteuert können. ([mehr](https://wiki.selfhtml.org/wiki/Font-style))

##### font-variant

Als besondere Schriftvariante stehen Kapitälchen (kleine Großbuchstaben) statt der kleinen Buchstaben zur Verfügung, einstellbar mit der Eigenschaft **font-variant**. ([mehr](https://wiki.selfhtml.org/wiki/Font-variant))

##### font-weight

Mit der Eigenschaft **font-weight** kann die Strichstärke (fälschlicherweise Schriftgewicht genannt) bestimmt werden. Die Strichstärke bezeichnet die Dicke und Stärke einer Schrift. ([mehr](https://wiki.selfhtml.org/wiki/Font-weight))

##### font-size

Die Eigenschaft **font-size** bestimmt den Schriftgrad, das heißt die Darstellungsgröße der Schrift. ([mehr](https://wiki.selfhtml.org/wiki/Font-size))

##### line-height

Mit der Eigenschaft **line-height** kann die Höhe der Textzeile entweder relativ zur geltenden `[font-size](https://wiki.selfhtml.org/wiki/CSS/Eigenschaften/Schriftformatierung/font-size "CSS/Eigenschaften/Schriftformatierung/font-size")`-Angabe oder als absolute Angabe definiert werden. ([mehr](https://wiki.selfhtml.org/wiki/Line-height))

##### letter-spacing

Mit der Eigenschaft **letter-spacing** kann der Abstand zwischen den Buchstaben bzw. Zeichen im Text festgelegt werden. ([mehr](https://wiki.selfhtml.org/wiki/Letter-spacing))

##### word-spacing

Mit der Eigenschaft **word-spacing** wird der Abstand zwischen Wörtern im Text bestimmt. ([mehr](https://wiki.selfhtml.org/wiki/Word-spacing))

#### CSS Hintergrund (6)

[![](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_Background.jpg)](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_Background.jpg)

##### background

Hier kann ein eigener Ausdruck eingegeben werden, um den gewünschten Hintergrund zu erzeugen. Wird hier nichts eingegeben, sondern in den darunterliegenden Feldern die Auswahl getroffen wird in diesem Feld automatisch die Zusammenfassung der unten eingegebenen Parameter aufgeführt. Z.B. `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box`

##### -color

hier kann eine Farbe für den Hintergrund  über den colorpicker oder über eine Angabe als RGB(a) eingegeben werden. 
![](img/Vis_Einstellungen_Sidebar (Widgets)_ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Views_background-color-e1484594801931.jpg)


##### -image

Für den Hintergrund kann auch ein Bild gewählt werden. Der Pfad dazu wird hier eingetragen ???

##### -repeat

Dieser Parameter bestimmt, wie mit Hintergrundbildern verfahren werden soll, falls das Element größer als ein Hintergrundbild ist. ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/background-repeat))

##### -attachment

Dieser Parameter bestimmt, wie sich die Hintergrundbilder verhalten sollen, wenn das Element oder sein Inhalt bewegt wird. ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/background-attachment))

##### -position

Dieser Parameter bestimmt, an welcher Stelle sich die linken oberen Ecken der Hintergrundbilder befinden sollen. ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/background-position))

##### -size

Dieser Parameter bestimmt, an welcher Stelle sich die linken oberen Ecken der Hintergrundbilder befinden sollen. ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/background-size))

##### -clip

Dieser Parameter bestimmt, dass die Hintergrundeigenschaften nur für bestimmte Bereiche der Elementbox gelten. ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/background-clip))

##### -origin

Dieser Parameter verschiebt Ursprung für das Koordinatensystem, welches der Positionierung der Hintergrundgrafiken zugrunde liegt, für jede einzelne Hintergrundgrafik. ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/background-origin))

#### CSS Border (7)

[![](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_Border.jpg)](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_Border.jpg)

##### -width

Dicke der Umrandung ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/border-width))

##### -style

Linienart der Umrandung ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/border-style))

##### -color

Farbe der Umrandung ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/border-color))

##### -radius

Eckenradius der Umrandung; kann höchstens die Hälfte der kürzeren Strecke des Widgets sein ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/border-radius))

#### CSS Schatten und Abstand (8)

[![](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_Schatten.jpg)](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_Schatten.jpg)

##### padding

Versatz vom Rand der Widget-Box ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/padding))

##### padding-left

Versatz auf der linken Seite ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/padding-left))

##### padding-top

Versatz auf der oberen Seite ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/padding-top))

##### padding-right

Versatz auf der rechten Seite ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/padding-right))

##### padding-bottom

Versatz auf der unteren Seite ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/padding-bottom))

##### box-shadow

Farbe des Schattens der Widget-Box ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/box-shadow))

##### margin-left

Abstand zum nächsten Element auf der linken Seite ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/margin-left))

##### margin-top

Abstand zum nächsten Element auf der oberen Seite ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/margin-top))

##### margin-right

Abstand zum nächsten Element auf der rechten Seite ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/margin-right))

##### margin-bottom

Abstand zum nächsten Element auf der unteren Seite ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/margin-bottom))

#### Gesten (9)

Damit kann man fast für jedes Widget eine Aktion mit Gesten (Maus oder Touch) aktivieren. [![](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_Gesten.jpg)](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Widgets_Gesten.jpg) Meist verwendete Option ist Swipe (Schieben). Um diese Option für z.B. Basic-HTML zu aktivieren sollte man ein Basic-Widget namens "_Gesture indicator_" verwenden. Im Feld "_Gestenindikator_" wird dieses Widget ausgewählt. Danach muss man eine swiping Object ID definieren. Dieser Zustand wird geändert, wenn eine Swipe-Geste auf editierten Widget (nicht _Gesture indicator_) erkannt wird.

*   _Wert_ ist ein Wert um wie viel der Zustand des Datenpunktes von dem ausgewählten Widget beim Swipen geändert wird.
*   _min/-max_ sind die Grenzwerte die das Wert nicht überschreiben wird.
*   _delta_ ist eine Pixelanzahl ab wann eine Bewegung als Swipe-Geste erkannt wird. D.h. die Maus muss sich um X Pixel bewegen um die Swipe Aktion auszulösen.

Andere Geste können ähnlich konfiguriert werden. Diese sind: Zoom mit zwei Finger; Swipe nach links, rechts, oben oder untern; Drehen; Drehen nach links oder rechts; Zoom In oder Zoom Out.

#### Signalbilder (10)

Mit Hilfe des Abschnittes "Signalbilder" kann man z.B. bei batteriebetriebenen Sensoren oder Aktoren ein kleines, frei wählbares Piktogramm anzeigen lassen, wenn die Batterie zu Neige geht (und im Homematic-Umfeld auf der CCU eine entsprechende Servicemeldung kommen würde). Pro Element sind bis zu drei Signalbilder möglich. So könnte man den Batteriestatus, den Sabotagekontakt und den UNREACH-Datenpunkt (= nicht erreichbar) eines Sensors oder Aktors abfragen. 
![](img/Vis_Einstellungen_Sidebar (Widgets)_signalbilder_eric.png)


##### Objekt ID

Hier wird der den zu überwachenden Datenpunkt eingetragen - in diesem Beispiel den LOWBAT-Datenpunkt eines Homematic-Temperatur-Differenzsensors.

##### Bedingung

Hier kann man aus den klassischen Vergleichsoperatoren (==, <, >, usw.) auswählen.

##### Wert für die Bedingung

Hier wird der Vergleichswert für den Datenpunkt angegeben - im Beispiel wird der LOWBAT-Datenpunkt mit dem Wert "true" verglichen, was eine Batteriewarnung bedeutet.

##### Bild

Ist die Vergleichsbedingung erfüllt, wird das hier angegebene Symbol angezeigt - im Beispiel eben ein Symbol, welches die leere Batterie darstellt.

##### Bildgröße in px

Hier kann die Größe des anzuzeigenden Symbols festgelegt werden.

##### CSS Bildstyle

Hier können separate CSS-Vorgaben für das Symbol eintragen werden.

##### Beschreibung

Hier kann eine Beschreibung für die Aktion hinterlegt werden.

##### CSS Textstyle

Hier können separate CSS-Vorgaben für den Text eingetragen werden.

##### Blinken

Mit dieser Checkbox wird festgelegt, ob das Symbol blinkend angezeigt werden soll, oder nicht.

##### Horizontale

Über diesen Schieberegler (oder Eingabefelder) kann horizontale Verschiebung des Symbols relativ zum Eckpunkt des eigentlichen Widgets definiert werden.

##### Vertikale

Über diesen Schieberegler (oder Eingabefelder) kann horizontale Verschiebung des Symbols relativ zum Eckpunkt des eigentlichen Widgets definiert werden.

##### Nicht zeigen bei Editieren

Ist diese Checkbox aktiv wird das Signalbild im Editor nicht angezeigt. Als Beispiel hier die Heizungssteuerung eines Badezimmers.
![](img/Vis_Einstellungen_Sidebar (Widgets)_signalbilder_demo_eric.png)
 Das obere Batterie-Symbol gehört zum (Homematic) Raum-Thermostat und das untere zum (Homematic) Heizkörperventil. Sobald bei einem der beiden Geräte eine LOWBAT-Meldung kommt, wird an der jeweiligen Position das Batterie-Symbol angezeigt.