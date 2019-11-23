---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-materialdesign/README.md
title: ioBroker.vis-materialdesign
hash: LPbONeBhVG+lpgVFNacUFboup+8X2LBTK5KlDGcR62w=
---
![Logo](../../../en/adapterref/iobroker.vis-materialdesign/admin/vis-materialdesign.png)

![stabile Version](http://iobroker.live/badges/vis-materialdesign.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-materialdesign.svg)
![Anzahl der Installationen](http://iobroker.live/badges/vis-materialdesign-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-materialdesign.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Scrounger/iobroker.vis-materialdesign.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/Scrounger/ioBroker.vis-materialdesign/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vis-materialdesign.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/Scrounger/ioBroker.vis-materialdesign/master.svg)

# IoBroker.vis-materialdesign
## Material Design Widgets für ioBroker VIS
[![paypal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YHPPW474N5CKQ&source=url)

Material Design Widgets basierend auf [Webbibliothek für Google-Materialkomponenten](https://github.com/material-components/material-components-web).

Diagramme basierend auf [chartjs Bibliothek](https://www.chartjs.org/).

### Unterstützter Browser
https://github.com/material-components/material-components-web/blob/master/docs/supported-browsers.md

## Button Umschalten
![Logo](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/buttons.gif)

## Card
![Logo](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/cards.png)

## Icon Button
![Logo](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/icon-button.gif)

## Liste
![Logo](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/list.gif)

## Fortschritt
![Logo](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/progress.gif)

## Schieberegler
![Logo](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/slider.gif)

Einstellungen, die in der folgenden Tabelle nicht aufgeführt sind, sind selbsterklärend.

<table><thead><tr><th> Bildschirmfoto </th><th> Rahmen </th><th> Beschreibung </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/slider.png"></td><td> initDelay </td><td> Wenn der Schieberegler nach dem Laden der Laufzeit nicht sichtbar oder bedienbar ist, muss dieser Wert erhöht werden. Die Eingabe erfolgt in Millisekunden. <br> Erhöhen Sie beispielsweise um 250 Schritte, bis der Schieberegler funktioniert. </td></tr></tbody></table>

## Runder Schieberegler
![Logo](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/round_slider.gif)

Basierend auf [rundschieber von thomasloven](https://github.com/thomasloven/round-slider)

## Schalter
![Logo](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/switch.gif)

## Top App Bar mit Navigationsleiste
Information:

* Top App Bar verwenden Sie die [Ansicht in Widget 8] (https://www.iobroker.net/#en/documentation/viz/basic.md) von VIS Adapter - Konfiguration ist die gleiche, durchsuchen Sie das Forum nach Arbeitsbeispielen.
* Die Position der App-Leiste ist fest codiert und wird immer in der oberen linken Ecke angezeigt. Nur Breite und Höhe sind einstellbar. Im Editor können Sie das Widget verschieben, diese Einstellungen werden jedoch nicht übernommen!
* Im Editor werden Effekte wie Scrollen usw. nicht richtig angezeigt oder verhalten sich anders!
* Checkbox "persistent" muss aktiviert sein!
* oid muss auf einen Datenpunkt vom Typ number gesetzt sein (wie die [Ansicht in Widget 8] (https://www.iobroker.net/#en/documentation/viz/basic.md) von VIS Adapter)

##### Layout modal:
![Logo](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/topappbar_modal.gif)

##### Layout nicht zulässig:
![Logo](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/topappbar_dismissible.gif)

##### Layout permanent:
![Logo](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/topappbar_permanent.gif)

### Untermenü
![Logo](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/drawer_subMenu.png)

Einstellungen, die in der folgenden Tabelle nicht aufgeführt sind, sind selbsterklärend.

<table><thead><tr><th> Bildschirmfoto </th><th> Rahmen </th><th> Beschreibung </th></tr></thead><tbody><tr><td rowspan=1><img src="doc/en/media/drawer_subMenu_views.png"></td><td> Ansichten [x] </td><td> Um das Untermenü zu aktivieren, müssen Sie mehrere mit &#39;|&#39; getrennte Ansichten hinzufügen. in das Ansichtsfeld, siehe Screenshots </td></tr><tr><td rowspan=1><img src="doc/en/media/drawer_subMenu_labels.png"></td><td> label [x] </td><td> Um den Text der Elemente zu ändern, müssen Sie ein JSON-Objekt in das Beschriftungsfeld mit dem Index des Ansichtsfelds einfügen. <br> Beispiel: <br>

`{"itemText": "Item with Subitems", "subItems": ["subItem1", "subItem2"]}`

Ergebnis: siehe Screenshot </td></tr><tr><td rowspan=1><img src="doc/en/media/drawer_subMenu_icons.png"></td><td> icon [x] </td><td> Um die Symbole der Elemente zu ändern, müssen Sie ein JSON-Objekt in das Feld Symbole mit dem Index des Ansichtsfelds einfügen. <br> Beispiel: <br>

`{"itemImage": "/icons-material-svg/hardware/ic_computer_48px.svg", "subItems": ["/vis/widgets/materialdesign/img/IoBroker_Logo.png", "/icons-material-svg/action/ic_android_48px.svg"]}`

Ergebnis: siehe Screenshot </ td> </ tr> </ tbody> </ table>

## Charts
### Linienverlaufsdiagramm:
> Erforderlicher Adapter: [SQL] (https://github.com/ioBroker/ioBroker.sql), [Verlauf] (https://github.com/ioBroker/ioBroker.history) oder [InfluxDb](https://github.com/ioBroker/ioBroker.influxdb)!

![Logo](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/line_history_chart.gif)

Einstellungen, die in der folgenden Tabelle nicht aufgeführt sind, sind selbsterklärend.

<table><thead><tr><th> Bildschirmfoto </th><th> Rahmen </th><th> Beschreibung </th></tr></thead><tbody><tr><td rowspan=6><img src="doc/en/media/line_hostory_chart_general.png"></td><td> Adapterinstanz </td><td> Instanz für den SQL- oder Verlaufsadapter </td></tr><tr><td> Anhäufung </td><td> <a href="https://www.iobroker.net/docu/index-195.htm?page_id=198&lang=en#Aggregation">Verknüpfung</a> </td></tr><tr><td> max. Anzahl der anzuzeigenden Datenpunkte </td><td> Anzahl der maximal anzuzeigenden Datenpunkte </td></tr><tr><td> Zeitintervall zwischen den Datenpunkten in [s] </td><td> Optionale Einstellung, überschreibt die Einstellung &#39;count&#39;. <br> Abstand zwischen den einzelnen Datenpunkten in Sekunden. <br> Wenn Sie beispielsweise Datenpunkte jede Minute anzeigen möchten, müssen Sie hier 60 eingeben </td></tr><tr><td> Zeitintervall über Objekt steuern </td><td> ID eines Datenpunkts zum Ändern des Zeitintervalls des Diagramms. Der Datenpunkt muss eine Zeichenfolge sein und kann <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/235530e4e54346b5527333ca06ce596519954c67/widgets/materialdesign/js/materialdesign.chart.js#L802">die verknüpften Werte enthalten</a> <br> Sie können hier beispielsweise eine Schaltfläche verwenden, um die Anzeige des Diagramms zur Laufzeit zu ändern </td></tr><tr><td> Boolesches Objekt für die Aktualisierung </td><td> ID von adatapoint, um eine manuelle Aktualisierung des Diagramms auszulösen. <br> Sie können hier beispielsweise eine Schaltfläche verwenden, um das Diagramm zur Laufzeit zu aktualisieren </td></tr><tr><td><img src="doc/en/media/line_hostory_chart_xAxis_layout.png"></td><td> Zeitformate der x-Achse </td><td> Ändern Sie das Zeitformat der X-Achse. Zeitformate müssen für alle Zeiteinheiten eingegeben werden, <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">die folgenden Zeiteinheiten sind zulässig.</a> <br> Genehmigte Zeitformate müssen gemäß der Bibliothek moment.js eingegeben werden, <a href="https://momentjs.com/docs/#/displaying/">siehe Link</a> </td></tr><tr><td><img src="doc/en/media/line_hostory_chart_tooltip_layout.png"></td><td> Tooltip-Zeitformate </td><td> Ändern Sie das Zeitformat des Tooltips. Zeitformate müssen für alle Zeiteinheiten eingegeben werden, <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign/blob/c677220868961b3cf0b153fb8bf04e13b4475c09/widgets/materialdesign/js/materialdesign.chart.js#L805">die folgenden Zeiteinheiten sind zulässig.</a> <br> Genehmigte Zeitformate müssen gemäß der Bibliothek moment.js eingegeben werden, <a href="https://momentjs.com/docs/#/displaying/">siehe Link</a> </td></tr></tbody></table>

## Tabelle
![Logo](../../../en/adapterref/iobroker.vis-materialdesign/doc/en/media/table.gif)

##### Eingabedaten
Eingabedaten müssen ein JSON-Array von Objekten sein. Beispiel:

```
[
{"img":"/vis.0/myImages/erlebnis_50.png","name":"Empire","betriebszeit":"4h 06m","funk":"5G","ip":"10.0.0.1"},
{"img":"/vis.0/myImages/erlebnis_100.png","name":"Handy","betriebszeit":"13m","funk":"5G","ip":"10.0.0.2"},
{"img":"/vis.0/myImages/erlebnis_100.png","name":"Harmony Hub - Wohnzimmer","betriebszeit":"18T 07h 21m","funk":"2G","ip":"10.0.0.3"},
{"img":"/vis.0/myImages/erlebnis_25.png","name":"MusicCast - Esszimmer (WX-030)","betriebszeit":"1h 57m","funk":"2G","ip":"10.0.0.4"},
{"img":"/vis.0/myImages/erlebnis_75.png","name":"MusicCast - K�che (ISX-18D)","betriebszeit":"4h 10m","funk":"2G","ip":"10.0.0.5"}
]
```

<table><thead><tr><th> Bildschirmfoto </th><th> Rahmen </th><th> Beschreibung </th></tr></thead><tbody><tr><td rowspan=2><img src="doc/en/media/table_general.png"></td><td> Schalter </td><td> Datenpunkt vom Typ string mit Eingabedaten wie oben gezeigt </td></tr><tr><td> Daten als JSON </td><td> Optional, geben Sie die Daten wie oben gezeigt ein, wenn kein OID-Datenpunkt festgelegt ist </td></tr><tr><td rowspan=4><img src="doc/en/media/table_column.png"></td><td> colType [x] </td><td> Wenn Bild ausgewählt ist, muss die Objekteigenschaft den Pfad zum Bild haben ( <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#input-data">siehe oben</a> ) </td></tr><tr><td> Präfix [x] </td><td> Präfix für Objekteigenschaft, interne Objektbindung ( <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#internal-object-binding">siehe unten</a> ) und HTML können verwendet werden </td></tr><tr><td> Suffix [x] </td><td> Suffix für Objekteigenschaft, interne Objektbindung ( <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#internal-object-binding">siehe unten</a> ) und HTML können verwendet werden </td></tr><tr><td> Objektname zum Sortieren [x] </td><td> Hier können Sie eine andere Objekteigenschaft definieren, die zum Sortieren verwendet werden soll. </td></tr></tbody></table>

##### Interne Objektbindung
Präfix & Suffix unterstützt die tabelleninterne Objektbindung -> Sie können mithilfe von auf andere Objekteigenschaften zugreifen

```
#[obj.'propertyName']
```

Beispiel <a href="https://github.com/Scrounger/ioBroker.vis-materialdesign#input-data">siehe oben</a> .

Working Widget Beispiel kann [Hier](https://forum.iobroker.net/topic/26199/test-adapter-material-design-widgets-v0-1-x/113) gefunden werden

## Changelog

### 0.2.4
* (Scrounger): Round Slider Widget bug fixes
* (Scrounger): Line History Chart Widget: null value bug fix
* (Scrounger): Line History Chart Widget: tooltip bug fix
* (Scrounger): Line History Chart Widget: editor translation improved
 
### 0.2.0
* (Scrounger): Round Slider Widget added
* (Scrounger): Icon Button Adition Widget added
* (Scrounger): Button Adition Widget added
* (Scrounger): Line History Chart Widget added
* (Scrounger): Table Widget added
* (Scrounger): Dialog iFrame Widget added
* (Scrounger): Dialog View Widget added
* (Scrounger): Select Widget added
* (Scrounger): colorSchemes for Charts added
* (Scrounger): bug fixes

### 0.1.5
* (Scrounger): bar chart added
* (Scrounger): pie chart added
* (Scrounger): bug fixes

### 0.1.2
* (Scrounger): list: right label option added
* (Scrounger): slider: value text option for lees or greather than added
* (Scrounger): switch: support for non boolean values added
* (Scrounger): checkbox: support for non boolean values added
* (Scrounger): buttons: image position option added
* (Scrounger): toggle buttons: support for non boolean values added
* (Scrounger): topAppBar: z-Index added
* (Scrounger): haptic feedback (vibration) option for mobil browser added
* (Scrounger): editor text fields changed to html
* (Scrounger): mdc-typography font styles added
* (Scrounger): bug fixes

### 0.1.1
* (Scrounger): bug fixes

### 0.1.0
* (Scrounger): Top App Bar Submenu added
* (Scrounger): List added
* (Scrounger): Button vertical State, Link, Nav added
* (Scrounger): Icon Button State, Link, Nav added
* (Scrounger): initialize slider bug fixes
* (Scrounger): moved hard coded styling options to css
* (Scrounger): styling options extended
* (Scrounger): bug fixes

### 0.0.7
* (Scrounger): Top App Bar Layouts added
* (Scrounger): Top App Bar customizing options added
* (Scrounger): Top App Bar Navigation Drawer backdrop layout added
* (Scrounger): Button State added
* (Scrounger): Button Link added

### 0.0.6
* (Scrounger): Top App Bar with Navigation Drawer added
* (Scrounger): Checkbox added
* (Scrounger): bug fixes
 
### 0.0.5
* (Scrounger): icon button Toggle added
* (Scrounger): color pressed for buttons added
* (Scrounger): Slider bug fix & label for value <= min / >= max added
* (Scrounger): translation added

### 0.0.4
* (Scrounger): cards added

### 0.0.3
* (Scrounger): progress added
 
### 0.0.2
* (Scrounger): slider vertical added
* (Scrounger): switch added
* (Scrounger): button toggle added

### 0.0.1
* (Scrounger) initial release

## License
MIT License

Copyright (c) 2019 Scrounger <scrounger@gmx.net>

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