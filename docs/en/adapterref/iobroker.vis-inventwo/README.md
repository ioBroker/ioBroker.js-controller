![Logo](admin/inventwo.png)
# ioBroker.vis-inventwo

[![NPM version](http://img.shields.io/npm/v/iobroker.vis-inventwo.svg)](https://www.npmjs.com/package/iobroker.vis-inventwo)
![Number of Installations (stable)](http://iobroker.live/badges/vis-inventwo-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-inventwo.svg)](https://www.npmjs.com/package/iobroker.vis-inventwo)
![Number of Installations (latest)](http://iobroker.live/badges/vis-inventwo-installed.svg)
[![Dependency Status](https://img.shields.io/david/inventwo/iobroker.vis-inventwo.svg)](https://david-dm.org/inventwo/iobroker.vis-inventwo)
[![Known Vulnerabilities](https://snyk.io/test/github/inventwo/iobroker.vis-inventwo/badge.svg)](https://snyk.io/test/github/inventwo/iobroker.vis-inventwo)
[![Build status](https://ci.appveyor.com/api/projects/status/2hvs4fvfms7xhmnw?svg=true)](https://ci.appveyor.com/project/inventwo/iobroker-vis-inventwo)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/inventwo/iobroker.vis-inventwo/LICENSE)

[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GQPD3G25CKTEJ&source=url)

[![NPM](https://nodei.co/npm/iobroker.vis-inventwo.png?downloads=true)](https://nodei.co/npm/iobroker.vis-inventwo/)

## Schalter Widgets für den ioBroker.vis Adapter

###### .. ab v 2.0.0



<table>
   <tr>
        <td><center><b>Universal</b><br><img src="widgets/vis-inventwo/img/Universal.gif"></td>
        <td><center><b>Multi</b><br><img src="widgets/vis-inventwo/img/Multi.gif"></td>
        <td><center><b>Image</b><br><img src="widgets/vis-inventwo/img/Image.png"></td>
         <td><center><b>Table</b><br><img src="widgets/vis-inventwo/img/Table.png"></td>
    </tr>
<tr><td colspan=4></td></tr>   
    <tr>
        <td><center><b>List</b><br><img src="widgets/vis-inventwo/img/List.png"></td>
        <td><center><b>Marquee</b><br><img src="widgets/vis-inventwo/img/Marquee.gif"></td>
        <td><center><b>Radio Button</b><br><img src="widgets/vis-inventwo/img/Radio.gif"></td>
        <td><center><b>Slider vertical</b><br><img src="widgets/vis-inventwo/img/Slider2.gif"></td>
    </tr>
<tr><td colspan=4></td></tr>   
      <tr>
        <td><center><b>Slider horizontal</b><br><img src="widgets/vis-inventwo/img/Slider1.gif"></td>
        <td><center><b>Colorslider horizontal</b><br><img src="widgets/vis-inventwo/img/ColorSliderHor.png"></td>
        <td><center><b>Colorslider horizontal</b><br><img src="widgets/vis-inventwo/img/ColorSliderVert.png"></td>
        <td><center><b>Toggle Switch</b><br><img src="widgets/vis-inventwo/img/Toggle.gif"></td>
    </tr>
</table>





###### .. v 1.3.8

![Beispiel](http://resources.inventwo.com/github/inventwo/Set.png)



Mit Hilfe unserer Widgets lassen sich folgende Projekte verwirklichen. Zur Zeit befinden sich in unserem Adapter NUR die reinen Schaltflächen (siehe oben) und die Icons. Uhr und Wetter stammen aus anderen Adaptern und müssen ggf. zusätzlich installiert werden.

![Beispiel](http://resources.inventwo.com/github/inventwo/Preview.png)

![Beispiel](http://resources.inventwo.com/github/inventwo/Preview2.png)
---

## Unterstützung

Falls Dir unsere Arbeit gefällt und Du uns unterstützen möchtest, wir freuen uns über jede Spende.

(Dieser Link führt zu unserem PayPal-Konto und steht in keiner Verbindung zum ioBroker)

[![Spende](http://resources.inventwo.com/github/inventwo/spende.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GQPD3G25CKTEJ&source=url)

---

## Changelog / Änderungsprotokoll

## 2.8.0
- View in PopUp Option für Universal- und Multi-Widget hinzugefügt
- Bugfix

## 2.7.11
- Bugfix

## 2.7.10
- Problem mit Bildern im Universal und Multi Widget behoben
- Problem mit Bildwechesl im Universal und Multi Widget behoben

## 2.7.9
- Option für die Bildgröße für das Image-Widget hinzugefügt
- Fehler von vorheriger Version behoben

## 2.7.8
- Problem mit Textausrichtung behoben
- Problem mit Bildgröße im Image-Widget behoben

## 2.7.7

- Problem mit der Bildgröße behoben
- Problem mit dem Farbregler behoben, dass der Wert beim loslassen nicht gespeichert wurde

## 2.7.6
- Problem mit Symbolfarbe für Navi-Widget behoben
- Problem mit Hervorhebung auf Touch-Geräten behoben
- Problem mit Radiobutton-Widget und Datentyp Zahlen behobenn

## 2.7.5
- JSON Tabelle farbliche Schwellenwerte für Zahlen
- Fehler beim Slider behoben wenn ungültiger Wert im Datenpunkt steht
- Fehler behoben: Signalbilder wurden mit eingefärbt
- Option um Bildfarbe zu invertieren eingefügt, um Farbfilter zu umgehen
- Color Slider kann nun zwischen HEX, RGB und CIE unterscheiden


## 2.7.4
- Fehlende Übersetzung für Hover-Farben hinzugefügt

## 2.7.3
- Fehler beim Multi-State und mehreren Zuständen behoben
- Schatten und Rand Hover für Buttons hinzugefügt

## 2.7.2
- Fehler in Radiobutton mit Bildfarbe behoben
- Fehler behoben: Doppeltes klicken bei State mit Verweildauer
- Hovereffekt für Buttons eingefügt
- Problem mit anzeigen des Sliderwertss behoben
- Slider Text anhängen möglich

## 2.7.1
- Bugfix

## 2.7.0
- Neues Widget: Farbslider
- JSON Tabelle Spaltenformat boolean und number
- JSON Tabelle Kopfzeile kann fixiert werden
- JSON Tabelle Fehler beim sortieren behoben
- JSON Tabelle konfigurierbare Dummyzeile wenn JSON leer ist
- Fehler behoben

## 2.6.0
- Universal- & Multi-Widget Vergleichsoperatoren gleich, größer, kleiner und nicht hinzugefügt
- Slider Min/Max invertieren
- Slider Wert erst beim loslassen setzen
- Widget um Wert zu erhöhen oder zu senken
- JSON Tabelle Fehler mit Datum behoben
. JSON Tabelle anzeige von Millisekunden möglich
- JSON Tabelle Platzhalter wenn Eintrag leer ist
- JSON Tabelle Spalten können per Klick sortiert werden

## 2.5.11
- Bugfix

## 2.5.10
- Bugfix

## 2.5.9
- Der Prozess der Bildfarbfilterung wurde geändert
- Die Bildfarbe kann jetzt ein Datenpunkt sein

## 2.5.8
- Bugfix

## 2.5.7
- Bugfix

## 2.5.6
- Bugfix

## 2.5.5
- Bugfix

## 2.5.4
- Bugfix (State: doppeltes senden dese Wertes bei touch)


## 2.5.3
- Grauer Kippschalter hinzugefügt

## 2.5.2
- Bugfix

## 2.5.1
- Bugfix

## 2.5.0
- Kippschalter hinzugefügt
- Bugfix

## 2.4.3
- Bugfix

## 2.4.2
- Bugfix

## 2.4.1
- Bugfix

## 2.4.0
- Randstil zur JSON-Tabelle hinzugefügt
- Farbauswahö für Icons zu allen Widgets hinzugefügt
- Fehlerbehebung

## 2.3.2
- Fehler bei der Navigation mit dem Widget 'View in Widget' behoben

## 2.3.1
- Fehler in JSON Tabelle behoben


## 2.3.0
- Problem behoben, bei dem Schaltflächen zweimal Werte senden
- Datum / Uhrzeit und Bildformat für Tabellenzellen hinzugefügt
- Universal- und Multi-Widget-Attribute werden beim Klicken auf Widget aktualisiert

## 2.2.3
- Fehler in JSON Tabelle behoben

## 2.2.2
- Fehler im Multi Widget behoben: Bilder und Text wechseln nicht bei Typ Navigation

## 2.2.1
- Fehler in JSON Tabelle behoben, wenn kein gültiges JSON-Objekt vorhanden ist
- Fehler in Value-List behoben: Wert wird nicht aktualisiert

## 2.2.0
- Datenpunktwerte werden jetzt bei allen Widgets im Editor angezeigt
- Neues Widget: Marquee (Laufschrift)
- Universal und Multi State Verweildauer hinzugefügt
- List Widget Abstand zwischen den Einträgen kann eingestell werden

## 2.1.0
- Datenpunktwerte werden im VIS Editor angezeigt!

## 2.0.1
- Übersetzungsfehler behoben
- Border Farbe behoben
- Widget-Untertitel behoben

## 2.0.0
- Switch, Button, Nav und Background Widget (sowie die kleinen Ausführungen) zu einem einzigen Widget zussammengeführt -> dem Universal Widget 
- Multi Widget -> wie das Universal, nur dass hier auf mehrere Datenpunkte und Werte geprüft werden kann (Ähnlich der Signalbild Funktion)
- Image Widget kann nun auf Datenpunkt prüfen
- Radiobuttons hinzugefügt
- Werteliste hinzugefügt (Kann Liste aus einem Datenpunkt oder manuell eingetragenem Text erstellen)

## 1.3.8
- Changed slider step to decimal
- Fixed problem with numeric values

### 1.3.7
- Fixed problem with navigation on touchscreens

### 1.3.6
- Added set state option for navigation
- Fixed problem with datapoints without config

### 1.3.5
- Added refresh rate for table

### 1.3.4
- Removed icons and backgrounds, changed config, Fixed navigation

### 1.3.3
- Fixed background widget value option

### 1.3.2
- Bug fix

### 1.3.1
- Changed navigation button color behaviour
- Added new icons

### 1.3.0
- Added JSON table
- Added delay for navigations
- Text in buttons can now be HTML
- Added new icons

### 1.2.3
- Added Navigation active color
- Fixed state color for value switch

## 1.2.2
- Bug Fix: slider value, config

## 1.2.1
- Fixed Slider Widget: seperatet into two widgets (horizontal and vertical)

### 1.2.0
- Added image widget
- Added Slider to change border radius for all 4 corners (If this version is an update for you, you need to click on each button in the vis-editor to get back the default corners)
- Added new icons


### 1.1.1
- Bug fix


### 1.1.0
- Added slider widget
- Added option to mirror image
- Added new icons
- Changed button widgets to use default font and text options

### 1.0.0
- Widget background and content opacity, Switch can be changed from boolean to value, changed icons from white to black, added seamless backgrounds

### 0.1.2
- Bug fixes
...

### 0.1.1
- Bug fixes
...

### 0.1.0 (Erstveröffentlichung)
- inventwo Design Widgets
...

### 0.0.1
- Die Idee ist geboren

---

## License

Urheberrechte (c) 2020 [jkvarel](https://github.com/jkvarel) und [skvarel](https://github.com/skvarel) von [inventwo](https://github.com/inventwo)


MIT License (nur in englisch / englisch only)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

Icons from Icons8 https://icons8.com/
