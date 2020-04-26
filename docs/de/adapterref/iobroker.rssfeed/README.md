---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rssfeed/README.md
title: ioBroker Adapter zum Anfordern und Anzeigen von RSS-Feeds verschiedener Standards (Atom, RSS, RDF)
hash: fdZGN3otuVCjYZjFFxzWNfhB/D59zu4ZgSI8B7Pene4=
---
![Logo](../../../en/adapterref/iobroker.rssfeed/admin/rssfeed-logo.png)

![Anzahl der Installationen](http://iobroker.live/badges/rssfeed-installed.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.rssfeed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)
![Travis](https://img.shields.io/travis/oweitman/ioBroker.rssfeed.svg)
![AppVeyor-Build-Status](https://img.shields.io/appveyor/ci/oweitman/iobroker-rssfeed.svg)
![GitHub Probleme](https://img.shields.io/github/issues/oweitman/ioBroker.rssfeed.svg)

# IoBroker Adapter zum Anfordern und Anzeigen von RSS-Feeds verschiedener Standards (Atom, RSS, RDF)
## Überblick
Adapter zum Anfordern und Anzeigen von RSS-Feeds verschiedener Standards (Atom, RSS, RDF).
Sie können die Ausgabe des Feeds mit einem Vorlagensystem anpassen. In den Vorlagen können Sie HTML, CSS und Javascript einfügen.

## Installation
Der im neuesten Repository verfügbare Adapter.

## Instanz hinzufügen
Nach der Installation sollte der Adapter dann im Adapterbereich des iobroker angezeigt werden.
Manchmal kommt es vor, dass die Änderungen nicht sichtbar sind, insbesondere bei Webänderungen (Widgets / Konfigurationsdialog). Möglicherweise muss der folgende Befehl in der Befehlszeile ausgeführt werden:

```
iobroker upload rssfeed
```

Im rechten Bereich in der Zeile des Adapters kann über die Plus-Schaltfläche eine Instanz hinzugefügt werden

## Aufbau
Die Konfiguration ist relativ einfach. Es gibt nur wenige Felder

| Einstellung | Beschreibung |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Aktualisieren | ist die allgemeine Angabe, wie oft das Futter in Minuten erneut abgerufen werden soll. Der Standardwert ist 60 Minuten |
| Maximale Elemente im Datenpunkt | Die Gesamtmenge der zu verarbeitenden Daten kann hier begrenzt werden. |

Dann für jeden neuen Feed:

| Einstellung | Beschreibung |
| --------------------------------- | ------------------------------------------------------------------------------------------------- |
| Name | Ein Name für den Datenpunkt. In einem Ordner darf ein Name nicht zweimal vorkommen. |
| Kategorie | Name für einen Unterordner dort sollte der Datenpunkt erscheinen. Die Kategorie muss eindeutig sein |
| URL | Die vollständige Adresse des Feeds (mit http:// oder https://, siehe Beispiele unten) |
| Aktualisieren | Für diesen Feed kann ein anderer Wert angegeben werden. Andernfalls wird die allgemeine Spezifikation übernommen |
| Schaltfläche Bearbeiten | Das ausgewählte Element wird entfernt und die Werte werden im Abschnitt Hinzufügen | angezeigt |
| Schaltfläche Löschen | Das ausgewählte Element wird entfernt |

Wenn Sie die Konfiguration gespeichert und geschlossen haben, werden die Feed-Daten als JSON-Datenpunkt im Objektbaum gefunden.

## Vis und Widgets
Die folgenden Widgets sind tatsächlich vorhanden

* RSS-Feed-Widget - um einen einzelnen Feed anzuzeigen
* RSS Feed Multi Widget - um mehrere aggregierte Feeds in einem Widget anzuzeigen.
* RSS-Feed-Meta-Helfer - Ein Helfer-Widget zum Überprüfen der Metadaten eines Feeds
* RSS-Feed-Artikel-Helfer - Ein Helfer-Widget zum Überprüfen der Artikeldaten eines Feeds
* RSS-Feed-Auswahlrahmen - Ein Widget zum Anzeigen der Überschriften eines Feeds als Auswahlrahmen
* JSON-Vorlage - ein wdiget, das nichts mit RSS-Feeds zu tun hat, aber Sie können eine benutzerdefinierte Vorlage definieren, um alle JSON-Daten in vis anzuzeigen.

Die Dokumentation für die vis-Widgets ist in vis oder [Widget-Dokumentation / Deutsch](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.rssfeed/blob/master/widgets/rssfeed/doc.html) verfügbar

## Vorlage anhand von Beispielen
Ein Beispiel, das ich mit den folgenden RSS-Feeds getestet habe:

* http://www.tagesschau.de/xml/rss2
* https://www.bild.de/rssfeeds/rss3-20745882,feed=alles.bild.html

```
<%= meta.title %>
<% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

Das Vorlagensystem arbeitet mit bestimmten Tags.
Die verwendeten Tags bedeuten Folgendes

| tag | Beschreibung |
| ----- | --------------------------------------------------------------------- |
| <% = | Der Inhalt des enthaltenen Ausdrucks / der enthaltenen Variablen wird maskiert. |
| <% - | Der Inhalt des enthaltenen Ausdrucks / der enthaltenen Variablen ist nicht entkommen. |
| <% | Keine Ausgabe, wird für beiliegende Javascript-Anweisungen verwendet |
| %> | ist im Allgemeinen ein schließendes Tag, um eines der vorherigen zu vervollständigen |

Alles, was sich außerhalb dieser Tags befindet, wird genau so angezeigt, wie es ist oder wenn es sich um HTML handelt, das als HTML interpretiert wird. (Siehe z. B. p-Tag, div-tag, small-tag. Innerhalb der Vorlage stehen 2 vordefinierte Variablen zur Verfügung

#### Meta
Diese enthält alle Metainformationen zum Feed. Der folgende Inhalt ist verfügbar. Ich denke, die Bezeichner sind selbsterklärend. In der Hilfe werde ich sie genauer beschreiben. oder geben Sie den Inhalt an (einige sind Arrays). meta.title meta.description meta.link meta.xmlurl meta.date meta.pubdate meta.author meta.language meta.image meta.favicon meta.copyright meta.generator meta.categories

#### Artikel
Ist ein Array mit einzelnen Elementen (Javascript-Array). Jedes Element hat die folgenden Eigenschaften.
Damit es zum Beispiel passt, mache ich das Präfixelement davor. Aber wenn Sie möchten, können Sie das selbst wählen. Es muss nur in der Schleife (forEach) entsprechend benannt werden. Auch hier sind die Bezeichner selbsterklärend. Nicht alle Attribute werden in jedem Feed ausgefüllt. Die wichtigsten sind bereits in der obigen Vorlage enthalten.

item.title item.description item.summary item.link item.origlink item.permalink item.date item.pubdate item.author item.guid item.comments item.image item.categories item.source item.enclosures

## Vorlagenbeispiel und detaillierte Beschreibung
```
<%= meta.title %>
<% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

Kurzbeschreibung der Vorgänge in den einzelnen Zeilen Z1: Die Ausgabe des Feed-Titels Z2: Ohne Ausgabe. Javascript-Befehl zum Durchlaufen aller Artikel. Bei jeder Runde wird das aktuelle Element dem variablen Element zugewiesen.
Z3: Ausgabe von Datum und Uhrzeit ist. Es ist mit einem p / small-Tag zur Formatierung versehen. Die vis-own Datumsformatfunktion wird zur Formatierung verwendet. Beschreibung finden Sie im Adapter vis.
Z4: Die Ausgabe des Artikeltitels. Ein Header 3 - Tag wird zur Formatierung verwendet.
Z5: Ausgabe des Inhalts des Artikels. Es ist mit einem p-Tag versehen. Hier ist zumindest in den beiden Beispielen HTML-Code enthalten, der normalerweise ein Bild und einen beschreibenden Text enthält. Z6: Geben Sie ein div-Tag aus, das die spezielle Formatierung im Feed-HTML löscht (in beiden Beispielen für tagesschau und bild wird es benötigt. Andere Feeds brauchten es vielleicht nicht.
Z7: Ohne Ausgabe. Diese Zeile schloss die Javascript-Schleife. Alles, was zwischen Z2 und Z7 definiert wurde, wird für jeden einzelnen Artikel wiederholt.

## Machen
* Bereinigen Sie nicht verwendete Einträge in datapoint info.lastRequest, indem Sie sie im Admin-Dialogfeld speichern.
* Schaltfläche zum Bereinigen nicht verwendeter Datenpunkte im Admin-Dialog
* ~~ RSS-Feeds für mehrere Widgets ~~
* ~~ Festzelt für mehrere Widgets ~~
* ~~ Weitere Datenpunkte im Template verfügbar machen. ~~
* ~~ Widget für Laufschrift mit den Titeln https://forum.iobroker.net/topic/31242/nachrichten-ticker-newsticker-via-php-in-vis-einbinden/2~~

## Changelog
### 0.0.28
* remove customtab
### 0.0.27
* adapter configuration is now editable
### 0.0.26
* correct changelog size 
### 0.0.25
* the error messages for the template are improved 
### 0.0.24
* errors in the request of feeds are now real errors in the iobroker log
* loading of rules for ejs in the editor is improved 
* marquee3 widget: options to show time and date
### 0.0.23
* republish to npm
### 0.0.22
* improvements in the configuration dialog
* remove unused admintab
* new RSS Feed multi widget. in this widget you can add your one or more datapoints, that are available in the template.
* New marquee widget 3 replaces the existing marquee widget 2.The marquee widget 3 is now a multi widget and can handle more than one feed. The Headlines are now aggregated.
* the existing widget JSON template is improved. in this widget you can add your one or more datapoints, that are available in the template.
* Remove several deprecated widgets (RSS Feed widget 1, Article Helper 1, Marquee 1, JSON template 1)
### 0.0.21
* add link option to marquee widget
* widget help added 
* marquee widget: the divider characters (default: +++) are configurable
### 0.0.20
* add ejs syntax to template editor
### 0.0.19
* try to fix marquee widget.
### 0.0.18
* try to fix the wrong NoSave dialog
### 0.0.17
* rework setting objects and states
### 0.0.16
* improve logic adding rssfeed in configuration dialog
* fix wrong icon for marquee widget
* define default template for rssfeed widget
* deprecate existing and replace with new version of widgets to improve naming of the attributes in case of translation
* widget rss marquee: replace duration attribute with speed attribute and improved the calculation algorithm. now same number is same speed regardless of the length of the titles
### 0.0.15
* fix bug saving last request in adapter configuration / improve debug messages
### 0.0.14
* update package.json and install new tools for stream encoding/decoding detection
* implement encoding detection and stream encoding
* change the ejs lib with a real browserified lib
### 0.0.13
* new widget as a guest, because it is not directly related to the rssfeed functionality, but reuse the same code base. maybe later i transfer it to an own adapter. the new widget can take a json datapoint and you can visualize the data with the ejs template system.
### 0.0.12
* now you can download the adapter configuration in the admin dialog. upload is not possible due to security restrictions in modern browsers.
### 0.0.11
* improve admin layout
* implement a forceRefresh button
### 0.0.10
* fix bug a bug in marquee widget. not all styles should applied to the span tag.
### 0.0.9
* apply widget styles also to the inner span element, because they had not any effect on the marquee.
* renew the package-lock.json
* add categories to save feeds in subfolders
* improve mechanism to write only updated feeds to datapoint. the feed has new data if comparision of articles in title and description is different.
### 0.0.8
* improve lasrequest logic of the adapter
* fix problem with datapoint naming
### 0.0.7
* test with encapsulation of ejs.js, becaus of error in some browsers
### 0.0.6
* add attribute duration for widget marquee to control animation duration
### 0.0.5
* new widget marquee for article titles
* add filter function for articles. the filter searchs in title,description and categories, seceral filter criteria can be seperated by semicolon
### 0.0.4
* some adjustments in readme, io-package
### 0.0.3
* add addveyor build
### 0.0.2
* added widgets meta helper and article helper
### 0.0.1
* initial release

## License
MIT License

Copyright (c) 2020 oweitman <oweitman@gmx.de>

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