# Die Einstellungen-Sidebar (Reiter View)



Unter diesem Reiter können die Eigenschaften für den ausgewählten View eingestellt werden. Wenn die Arbeitsfläche des Views angeklickt wird, wird dieser Reiter automatisch aktiviert. 
![](img/Vis_Einstellungen_Sidebar (Views)_ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Views_kpl.jpg)


## CSS Allgemein

### Kommentar

In diesem Feld kann ein Kommentar zu dem angewählten View eingetragen werden.

### CSS-Klasse

Diesem View kann eine bestimmte, bereits vorher definierte CSS-Klasse zugewiesen werden.

### Anfangsfilter

Dieser Filterwert wird beim ersten Öffnen der Seite gesetzt. Mehr über Filter im Kapitel Filter. Auf der Seite gibt es z.B. "Licht" und "Rollos". Wenn man für "Anfangsfilter" den Wert "Licht" auswählt, dann wird die Seite beim ersten Aufruf keine "Rollos" anzeigen.

### Thema

In diesem Pulldownmenü kann ein Thema ausgewählt werden, in dem der ausgewählte View dargestellt werden soll. Ein Thema beinhaltet einheitliche Farbgebung und Schriftarten. In dem Pulldownmenü stehen mehrere Themes zur Verfügung. [![](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Views_themes.jpg)](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Views_themes.jpg)

### Nur für Gruppen

Soll dieser View nicht für alle Anwender zu sehen sein, kann die Sichtbarkeit auf einzelne Gruppen, die in der Benutzersteuerung angelegt wurden beschränkt werden. 
![](img/Vis_Einstellungen_Sidebar (Views)_ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Views_usergroups.jpg)
 Die entsprechenden Gruppen, die diesen View sehen sollen können über die entsprechende Checkboxen ausgewählt werden.

### Falls Anwender nicht in der Gruppe

Hier wird das Verhalten für den View festgelegt, falls ein Anwender nicht zu einer der aktivierten Gruppen gehört. 
![](img/Vis_Einstellungen_Sidebar (Views)_ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Views_no_user.jpg)
 Dann kann der View entweder vollständig verborgen werden, oder in der Auswahl zwar sichtbar, aber nicht anwählbar sein.

## CSS Hintergrund

[![](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Views_CSS_background.jpg)](img/ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Views_CSS_background.jpg)

### background

Hier kann ein eigener Ausdruck eingegeben werden, um den gewünschten Hintergrund zu erzeugen. Wird hier nichts eingegeben, sondern in den darunterliegenden Feldern die Auswahl getroffen wird in diesem Feld automatisch die Zusammenfassung der unten eingegebenen Parameter aufgeführt. Z.B. `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box`

### -color

hier kann eine Farbe für den Hintergrund  über den colorpicker oder über eine Angabe als RGB(a) eingegeben werden. 
![](img/Vis_Einstellungen_Sidebar (Views)_ioBroker_Adapter_Vis_Editor_Eigenschaften_Sidebar_Views_background-color-e1484594801931.jpg)


### -image

Für den Hintergrund kann auch ein Bild gewählt werden. Der Pfad dazu wird hier eingetragen ???

### -repeat

Dieser Parameter bestimmt, wie mit Hintergrundbildern verfahren werden soll, falls das Element größer als ein Hintergrundbild ist. ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/background-repeat))

### -attachment

Dieser Parameter bestimmt, wie sich die Hintergrundbilder verhalten sollen, wenn das Element oder sein Inhalt bewegt wird. ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/background-attachment))

### -position

Dieser Parameter bestimmt, an welcher Stelle sich die linken oberen Ecken der Hintergrundbilder befinden sollen. ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/background-position))

### -size

Dieser Parameter bestimmt, an welcher Stelle sich die linken oberen Ecken der Hintergrundbilder befinden sollen. ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/background-size))

### -clip

Dieser Parameter bestimmt, dass die Hintergrundeigenschaften nur für bestimmte Bereiche der Elementbox gelten. ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/background-clip))

### -origin

Dieser Parameter verschiebt Ursprung für das Koordinatensystem, welches der Positionierung der Hintergrundgrafiken zugrunde liegt, für jede einzelne Hintergrundgrafik. ([mehr](https://wiki.selfhtml.org/wiki/Referenz:CSS/Eigenschaften/background-origin))

## CSS Font & text

### color

Mit der Eigenschaft **color** wird die Farbe der Schrift bzw. des Textvordergrundes festgelegt. ([mehr](https://wiki.selfhtml.org/wiki/Color))

### text-shadow

Die Eigenschaft **text-shadow** ermöglicht die Darstellung von Schatten unter Texten, ohne dabei Bilder zu verwenden. ([mehr](https://wiki.selfhtml.org/wiki/Text-shadow))

### font-family

Mithilfe der hier beschriebenen Eigenschaft **font-family** können Schriftarten anggeeben werden, ohne sich darum kümmern zu müssen, ob und wie die Schriftart beim Anwender angezeigt werden kann. Falls die angegebene Schriftart nicht angezeigt werden kann, bleibt die Angabe wirkungslos. ([mehr](https://wiki.selfhtml.org/wiki/Font-family))

### font-style

Als Schriftstil wird die Neigung der Schrift bezeichnet, welche mit der Eigenschaft **font-style** gesteuert können. ([mehr](https://wiki.selfhtml.org/wiki/Font-style))

### font-variant

Als besondere Schriftvariante stehen Kapitälchen (kleine Großbuchstaben) statt der kleinen Buchstaben zur Verfügung, einstellbar mit der Eigenschaft **font-variant**. ([mehr](https://wiki.selfhtml.org/wiki/Font-variant))

### font-weight

Mit der Eigenschaft **font-weight** kann die Strichstärke (fälschlicherweise Schriftgewicht genannt) bestimmt werden. Die Strichstärke bezeichnet die Dicke und Stärke einer Schrift. ([mehr](https://wiki.selfhtml.org/wiki/Font-weight))

### font-size

Die Eigenschaft **font-size** bestimmt den Schriftgrad, das heißt die Darstellungsgröße der Schrift. ([mehr](https://wiki.selfhtml.org/wiki/Font-size))

### line-height

Mit der Eigenschaft **line-height** kann die Höhe der Textzeile entweder relativ zur geltenden `[font-size](https://wiki.selfhtml.org/wiki/CSS/Eigenschaften/Schriftformatierung/font-size "CSS/Eigenschaften/Schriftformatierung/font-size")`-Angabe oder als absolute Angabe definiert werden. ([mehr](https://wiki.selfhtml.org/wiki/Line-height))

### letter-spacing

Mit der Eigenschaft **letter-spacing** kann der Abstand zwischen den Buchstaben bzw. Zeichen im Text festgelegt werden. ([mehr](https://wiki.selfhtml.org/wiki/Letter-spacing))

### word-spacing

Mit der Eigenschaft **word-spacing** wird der Abstand zwischen Wörtern im Text bestimmt. ([mehr](https://wiki.selfhtml.org/wiki/Word-spacing))