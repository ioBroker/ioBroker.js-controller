---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis/README.md
title: Visualisierung
hash: gxMcyyW7ttlzlCOMxgGgChxNRZkvdhTK2DRDT06Hhj8=
---
![Logo](../../../en/adapterref/iobroker.vis/admin/vis.png)

![Anzahl der Installationen](http://iobroker.live/badges/vis-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis.svg)
![NPM](https://nodei.co/npm/iobroker.vis.png?downloads=true)

# Visualisierung
WEB-Visualisierung für die ioBroker-Plattform.

## Installation & Dokumentation
![Demo-Oberfläche](img/user0.png) ![Demo-Oberfläche](../../../en/adapterref/iobroker.vis/img/user7.png)

[Online-Demos](https://iobroker.click/)

## Bindungen von Objekten
Normalerweise haben die meisten Widgets das ObjectID-Attribut. Und dieses Attribut kann mit einem Wert der Objekt-ID verknüpft werden.
Es gibt jedoch eine andere Option, wie *jedes* Attribut des Widgets an eine ObjectID gebunden werden kann.

Schreiben Sie einfach in das Attribut ```{object.id}``` und es wird (nicht im Bearbeitungsmodus) an den Wert dieses Objekts gebunden.
Wenn Sie ein spezielles Format verwenden, können Sie damit sogar einige einfache Vorgänge ausführen, z. Multiplizieren oder Formatieren.
Patten hat folgendes Format:

```
{objectID;operation1;operation2;...}
```

Folgende Operationen werden unterstützt:

- `\ *` - Multiplizieren. Das Argument muss in Klammern stehen, z. B. "* (4)". In diesem Beispiel multiplizieren wir den Wert mit 4.
- `\ +` - hinzufügen. Das Argument muss in Klammern stehen, z. B. "+ (4.5)". In diesem Beispiel addieren wir den Wert 4.5.
- `\ -` - subtrahieren. Das Argument muss in Klammern stehen, z. B. "- (- 674.5)". In diesem Beispiel subtrahieren wir vom Wert -674,5.
- `/` - Teilen. Das Argument muss in Klammern stehen, z. B. "/(0.5)". In dieser Stichprobe teilen wir den Wert durch 0,5.
- `%` - Modulo. Das Argument muss in Klammern stehen, z. B. "% (5)". In diesem Beispiel nehmen wir Modulo von 5.
- `round` - rundet den Wert.
- `round (N)` - rundet den Wert mit N Stellen nach dem Punkt, z. 34,678; Runde (1) => 34,7
- `hex` - Wert in Hexadezimalwert umwandeln. Alle Buchstaben sind in Kleinbuchstaben geschrieben.
- `hex2` - Wert in Hexadezimalwert umwandeln. Alle Buchstaben sind in Kleinbuchstaben geschrieben. Wenn der Wert kleiner als 16 ist, wird die führende Null addiert.
- `HEX` - wie Sechseck, jedoch im oberen Gehäuse.
- `HEX2` - wie hex2, jedoch im oberen Gehäuse.
- `Datum` - Format Datum gemäß gegebenem Format. Das Format ist das gleiche wie in [iobroker.javascript] (https://github.com/iobroker/iobroker.javascript/blob/master/README.md#formatdate).
- `min (N)` - Wenn der Wert kleiner als N ist, nehmen Sie den N-Wert
- `max (M)` - Wenn der Wert größer als M ist, nehmen Sie den M-Wert
- `sqrt` - Quadratwurzel
- `pow (n)` - Potenz von N.
- `pow` - Potenz von 2.
- `Boden` - Math.floor
- `Decke` - Math.ceil
- `random (R)` - Math.random () * R oder einfach Math.random (), wenn kein Argument vorhanden ist
- `formatValue (Dezimalstellen)` - Formatieren Sie den Wert gemäß den Systemeinstellungen und verwenden Sie Dezimalstellen
- `Datum (Format)` - Formatwert als Datum. Das Format lautet wie folgt: "JJJJ-MM-TT hh: mm: ss.sss"
- `momentDate (format, useTodayOrYesterday)` - Formatieren Sie den Wert als Datum mit Moment.js. [Genehmigte Formate müssen gemäß der Bibliothek moment.js eingegeben werden] (https://momentjs.com/docs/#/displaying/format/). Mit `useTodayOrYesterday = true` wird das momentjs-Format` ddd` /` dddd` mit today / gestern überschrieben
- `array (element1, element2 [, element3, element4])` - gibt das Indexelement zurück. Beispiel: `{id.ack; array (ack ist falsch, ack ist wahr)}`

Sie können dieses Muster in jedem Text verwenden, wie z

```
My calculations with {objectID1;operation1;operation2;...} are {objectID2;operation3;operation4;...}
```

oder Farbberechnungen:

```
#{objectRed;/(100);*(255);HEX2}{objectGreen;HEX2}{objectBlue;HEX2}
```

Um den Zeitstempel des Objekts anzuzeigen, schreiben Sie `.ts` oder `.lc` (für letzte Änderung) am Ende der Objekt-ID, z.

```
Last change: {objectRed.lc;date(hh:mm)}
```

Es gibt eine andere Möglichkeit, Muster zu schreiben:

```
Hypotenuse of {height} and {width} = {h:height;w:width;Math.max(20, Math.sqrt(h*h + w*w))}
```

`{h:height;w:width;h*w}` werden als Funktion interpretiert:

```
value = (function () {
    var h = "10";
    var w = "20";
    return Math.max(20, Math.sqrt(h*h + w*w));
})();
```

Sie können *beliebige* Javascript-Funktionen verwenden. Argumente müssen mit ':' definiert werden. Andernfalls wird es als Formel interpretiert.

Achten Sie auf Typen. Alle von ihnen als Zeichenfolgen definiert. Um sicherzugehen, dass dieser Wert als Zahl behandelt wird, verwenden Sie die Funktion parseFloat.

```
Hypotenuse of {height} and {width} = {h:height;w:width;Math.max(20, Math.sqrt(Math.pow(parseFloat(h), 2) + Math.pow(parseFloat(w), 2)))}
```

### Spezielle Bindungen
Es gibt verschiedene interne Bindungen, um zusätzliche Informationen in Ansichten bereitzustellen:

* `Benutzername` - Zeigt den angemeldeten Benutzer an
* `view` - Name der tatsächlichen Ansicht
* `wname` - Widgetname
* `Widget` - ist ein Objekt mit allen Daten des Widgets. Kann nur im JS-Teil verwendet werden, z. B. "{a: a; widget.data.name}"
* `wid` - Name des tatsächlichen Widgets
* `language` - kann` de`, `en` oder` ru` sein.
* `instance` - Browserinstanz
* `login` - ob ein Login erforderlich ist oder nicht (z. B. um die Abmeldeschaltfläche anzuzeigen / auszublenden)

Hinweis: Um ":" in Berechnungen (z. B. in der Zeichenfolgenformel) zu verwenden, verwenden Sie stattdessen "::".

** Denken Sie daran **, dass Stildefinitionen als Bindungen interpretiert werden. Verwenden Sie daher `{{style: value}}` oder nur

```
{
	style: value
}
```

dafür.

## Filter
Um in einer Ansicht die ganze Anzahl von Widgets zu visualisieren, können Sie Filter verwenden, um die Anzahl der Widgets zu reduzieren, die gleichzeitig in der Ansicht angezeigt werden.

Jedes Widget hat ein Feld `filter`. Wenn Sie einen bestimmten Wert festlegen, z. `light`, sodass Sie mit einem anderen Widget `(bars - filters, filter - dropdown)` steuern können, welcher Filter tatsächlich aktiv ist.

## Steuerschnittstelle
Vis erstellt 3 Variablen:

- `control.instance` - Hier sollte die Browserinstanz geschrieben werden oder FFFFFFFF, wenn jeder Browser gesteuert werden muss.
- `control.data` - Parameter für den Befehl. Siehe spezifische Befehlsbeschreibung.
- `control.command` - Befehlsname. Das Schreiben dieser Variablen löst den Befehl aus. Das heißt, bevor der Befehl geschrieben wird, müssen "Instanz" und "Daten" mit Daten vorbereitet werden.

Befehle:

* `alert` - Alarmfenster in vis anzeigen. "control.data" hat das folgende Format "message; title; jquery-icon". Titel und jquery-icon sind optional. Symbolnamen finden Sie [hier] (http://jqueryui.com/themeroller/). Um das Symbol "ui-icon-info" anzuzeigen, schreiben Sie `` `Message ;; info```.
* `changeView` - wechselt zur gewünschten Ansicht. "control.data" muss den Namen der Ansicht haben. Sie können den Projektnamen auch als "Projekt / Ansicht" angeben. Das Standardprojekt ist "main".
* `refresh` - vis neu laden, zum Beispiel nachdem das Projekt geändert wurde, um in allen Browsern neu zu laden.
* `reload` - wie aktualisieren.
* `dialog` - Dialogfenster anzeigen. Der Dialog muss in der Ansicht vorhanden sein. Einer von:

    - `static - HTML - Dialog`,
    - `static - Icon - Dialog`,
    - `container - HTML - view in jqui Dialog`,
    - `container - ext cmd - view in jqui Dialog`,
    - `container - Icon - view in jqui Dialog`,
    - `container - Button - Ansicht im jqui Dialog`.

    `control.data` müssen die ID des Dialog-Widgets haben, z. `w00056`.

* `dialogClose`
* `popup` - öffnet ein neues Browserfenster. Der Link muss in "control.data" angegeben werden, z. http://google.com
* `playSound` - Sounddatei abspielen. Der Link zur Datei ist in "control.data" angegeben, z. http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3.

  Sie können Ihre eigene Datei in vis hochladen und wie beispielsweise `/vis.0/main/img/myFile.mp3` abspielen lassen.

Wenn der Benutzer die Ansicht ändert oder zu Beginn, werden die Variablen von vis mit gefüllt

- `control.instance`: Browser-Instanz und` ack = true`
- `control.data`: Projekt- und Ansichtsname in der Form` project / view`, z. `main / view` (und` ack = true`)
- `control.command`: `angedView` und` ack = true`

Sie können den JSON-String oder das Objekt als Befehl in `{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}` in control.command schreiben. In diesem Fall werden die Instanz und die Daten vom JSON-Objekt übernommen.

Beispiel für einen Javascript-Adapter:

```
setState('vis.0.control.command', {"instance": "*", "command": "refresh", "data": ""});
```

## Standardansicht
Sie können für jede Ansicht die gewünschte Auflösung definieren (Menü => Extras => Auflösung). Dies ist nur der visuelle Rand im Bearbeitungsmodus, um die Bildschirmgröße auf einem bestimmten Gerät anzuzeigen. Im Echtzeitmodus ist es nicht sichtbar und alle Widgets außerhalb des Rahmens sind sichtbar.

Außerdem können Sie festlegen, ob diese Ansicht als Standard für diese Auflösung verwendet werden muss.

Jedes Mal, wenn die `index.html` (ohne `#viewName`) aufgerufen werden, wird die für diese Auflösungsansicht am besten geeignete geöffnet.
Wenn nur eine Ansicht das Flag "Standard" * hat, wird diese Ansicht unabhängig von der Bildschirmauflösung oder -ausrichtung geöffnet.

Z.B. Sie können zwei Ansichten "Landscape-Mobile" und "Portrait-Mobile" erstellen. Diese beiden Ansichten werden automatisch umgeschaltet, wenn Sie die Ausrichtung oder Bildschirmgröße ändern.

Es gibt ein Hilfs-Widget "Basic - Bildschirmauflösung", das die tatsächliche Bildschirmauflösung und die am besten geeignete Standardansicht für diese Auflösung anzeigt.

## Die Einstellungen
### Nachladen, wenn länger als
Es gibt eine Regel, dass nach einer gewissen Unterbrechungszeit die gesamte VIS-Seite neu geladen wird, um das Projekt zu synchronisieren.
Sie können es im Menü "Einstellungen ..." konfigurieren. Wenn Sie das Intervall auf "nie" setzen, wird die Seite nie neu geladen.

### Intervall wieder verbinden
Legen Sie das Intervall zwischen den Verbindungsversuchen fest, wenn die Verbindung getrennt wird. Wenn Sie 2 Sekunden einstellen, wird alle 2 Sekunden versucht, die Verbindung herzustellen.

### Dunkler Bildschirm zum erneuten Verbinden
Manchmal (in der Nacht) ist ein dunkler Ladebildschirm erforderlich. Mit dieser Option können Sie es einstellen.

Beachten Sie, dass diese Einstellungen nur für die erneute Verbindung und nicht für die erste Verbindung gültig sind.

![Dunkel](../../../en/adapterref/iobroker.vis/img/dark_screen.png)

<! - Platzhalter für die nächste Version (am Zeilenanfang):

### __WORK IN PROGRESS__ ->

## Changelog
### 1.3.3 (2020-09-21)
* (bluefox) Return de-bounce settings back
* (bluefox) Corrected error with {username} binding
* (bluefox) Fixed "show last change" option

### 1.3.1 (2020-09-18)
* (bluefox) Added the auto-focus option to the input widgets

### 1.3.0 (2020-09-17)
* (foxriver76) on pending getStates, try again instead of drop
* (foxriver76) fixed the file manager typos
* (Scrounger) Added momentDate for the bindings

### 1.2.12 (2020-09-08)
* (foxriver76) only parse arrays and json objects, not booleans, normal strings etc

### 1.2.11 (2020-08-25)
* (bluefox) The error message about the non-found chart view was fixed. 

### 1.2.10 (2020-08-23)
* (gsicilia82/fceller) JSON strings will be parsed in VIS bindings

### 1.2.9 (2020-08-22)
* (bluefox) Charts are now supported

### 1.2.6 (2020-03-22)
* (bluefox) Added the better error message if license could not be parsed

### 1.2.4 (2020-02-11)
* (bluefox) Table widget was extended with the selected object ID.

### 1.2.3 (2019-12-14)
* (bluefox) Small changes in license handling were made

### 1.2.2 (2019-10-27)
* (bluefox) Preparations for js-controller 2.0. Check undefined adn null.

### 1.2.1 (2019-09-10)
* (bluefox) fixed upload of files

### 1.2.0 (2019-05-07)
* (bluefox) add translations

### 1.1.11 (2019-02-07)
* (bluefox) improve Bool HTML

### 1.1.10 (2019-01-30)
* Add Chinese support

### 1.1.8 (2018-10-29)
* (bluefox) File dialog was corrected

### 1.1.7 (2018-07-24)
* (bluefox) view8 corrected

### 1.1.6 (2018-07-18)
* (bluefox) support of new variables (see [Special bindings](#special-bindings) )
* (bluefox) fix error if fast view changes
* (bluefox) fix "jqui - ctrl - IconState / val - Icon Bool"

### 1.1.5 (2018-06-10)
* (bluefox) show more information if widget cannot be rendered
* (bluefox) fix saving of widgets if they have bindings
* (bluefox) show error stack
* (bluefox) fix binding
* (Apollon77) fix testing
* (bluefox) fix for iobroker.pro and external socket.io settings
* (bluefox) A user variable was added into bindings.
* (bluefox) Fixed widget tabs

### 1.1.4 (2018-04-23)
* (bluefox) fix bool SVG

### 1.1.3 (2018-04-12)
* (bluefox) ignore click by scrolling on touch devices
* (bluefox) remove wrong state vis.0.command
* (bluefox) fix error with jplot
* (bluefox) better widget behaviour in edit Mode (basic, jqui)
* Fix config dialog

### 1.1.2 (2018-02-02)
* (bluefox) Fixing the saving of project
* (bluefox) Fixing the background selector
* (bluefox) Fixing the null pointer problem
* (bluefox) Fixing the selection helper
* Update translations

### 1.1.1 (2018-01-07)
* (bluefox) The problem with view change on the touch devices fixed

### 1.0.5 (2017-11-19)
* (bluefox) show number of datapoints in every project

### 1.0.4 (2017-10-22)
* (bluefox) Add autocomplete for view CSS options
* (bluefox) change edit of view CSS background options

### 1.0.3 (2017-10-20)
* (bluefox) Fix parse of invalid bindings
* (bluefox) add moment.js

### 1.0.0 release candidate (2017-10-13)
* (bluefox) fix iframe and image updates
* (bluefox) fix fonts

### 0.15.7 (2017-10-01)
* (bluefox) allow update of images without additional query (but it works only in spome very specific cases)
* (bluefox) zoom of iframes

### 0.15.5 (2017-07-24)
* (bluefox) Fix widgets upload

### 0.15.4 (2017-07-19)
* (bluefox) Add swipe

### 0.15.3 (2017-07-12)
* (bluefox) Add full screen widget
* (bluefox) Fix timestamp widget

### 0.15.2 (2017-07-07)
* (bluefox) Fix binding if it has "-" in the OID

### 0.15.1 (2017-06-30)
* (bluefox) Fix error with context menu
* (bluefox) Allow add class to view

### 0.15.0 (2017-05-25)
* (bluefox) fix copy of grouped widgets
* (bluefox) fix subscribe if empty states

### 0.14.7 (2017-05-19)
* (bluefox) add templates

### 0.14.6 (2017-05-16)
* (bluefox) Fix error by groups selection
* (apollon77) fix jqui-dialog for auto-open

### 0.14.3 (2017-05-11)
* (bluefox) fix export/import of groupped widgets

### 0.14.2 (2017-04-29)
* (bluefox) Fix install error

### 0.14.1 (2017-04-27)
* (bluefox) move beta to main
* (bluefox) fix choose filter
* (bluefox) fix error if some views do not exist
* (bluefox) fix binding problem, e.g. "a:-45?0" was detected as variable too.
* (bluefox) fix some font sizes
* (bluefox) fix undo
* (bluefox) fix themes change
* (bluefox) optimize load of pages
* (bluefox) check license
* (bluefox) fix basic views 8
* (bluefox) fix time picker if opened in dialog

### 0.14.0 (2017-04-10)
* (bluefox) add mandatory license input

### 0.12.7 (2017-02-09)
* (bluefox) prepare beta

### 0.12.6 (2017-01-29)
* (pmant) fix view copy
* (pmant) Improvements to context menu
* (pmant) usability improvements for both view dropdowns
* (bluefox) small fix of dragging

### 0.12.6 (2017-01-29)
* (pmant) add dropdown menu to views bar
* (pmant) sort widgets widget selector by name
* (bluefox) fix groupAttr in signals and visibility

### 0.12.2 (2016-12-04)
* (bluefox) fix errors with grouping

### 0.12.1 (2016-11-30)
* (bluefox) fix errors with containers

### 0.12.0 (2016-11-24)
* (bluefox) subscribe mode for faster state loading
* (bluefox) add grouping

### 0.10.15 (2016-11-06)
* (bluefox) remove weather-adapter.html
* (bluefox) clean config.js
* (bluefox) remove old widgets
* (bluefox) improve authentication in app
* (bluefox) allow creation of instance from helper widget

### 0.10.14 (2016-10-09)
* (bluefox) fix rendering of widgets
* (bluefox) working on relative positions.
* (bluefox) destroy widgets before views deletion

### 0.10.13 (2016-09-23)
* (bluefox) fixed errors for iPad 1
* (bluefox) start wokring on relative positions

### 0.10.12 (2016-09-16)
* (bluefox) group specific visibility of widgets and views

### 0.10.11 (2016-09-15)
* (bluefox) fix for iOS 10
* (bluefox) allow disabling of groups for performance

### 0.10.10 (2016-09-14)
* (bluefox) add text2speech widget
* (bluefox) try to fix problem with iOS 10

### 0.10.9 (2016-09-04)
* (bluefox) support of web-sockets force
* (bluefox) destory unused views after 30 seconds
* (bluefox) do not show middle leading lines if top and bottom are shown
* (bluefox) let timestamp and lastchange to show time as interval

### 0.10.7 (2016-07-09)
* (bluefox) add settings to reload vis
* (bluefox) add dark reload screen
* (bluefox) fix reload interval
* (bluefox) export/import
* (bluefox) add global script
* (bluefox) add 'not exist'/'not consist'/'exist' to signal and visibility
* (bluefox) fix oids in editor

### 0.10.5 (2016-06-15)
* (bluefox) fix select ID dialog
* (bluefox) add align help lines
* (bluefox) never store data in non-edit mode

### 0.10.4 (2016-06-14)
* (bluefox) fix drag and resize
* (Patrick) fix QuoJS
* (bluefox) support of milliseconds in formatDate
* (bluefox) support of getHistory
* (bluefox) support of show history instances
* (bluefox) grid
* (bluefox) add previews

### 0.10.3 (2016-05-30)
* (bluefox) update canJS
* (pmant) fixes bugs with dialogs on touchscreens
* (bluefox) speedUP show attributes at 300ms
* (bluefox) fix click on widget if signal is active

### 0.10.2 (2016-05-24)
* (bluefox) fix widgets with timestamps

### 0.10.1 (2016-05-23)
* (bluefox) change version

### 0.10.0 (2016-05-23)
* (bluefox) translates
* (bluefox) fix 'no widgets selected'
* (bluefox) change widget icons
* (bluefox) add signals
* (bluefox) add app.css for cordova
* (bluefox) change icons preview
* (bluefox) show properties of widget as icon
* (bluefox) fix error with external commands
* (bluefox) add types icon to preview
* (bluefox) support edit on iPad1
* (bluefox) change security settings

## License
 Copyright (c) 2013-2020 bluefox, https://github.com/GermanBluefox <dogafox@gmail.com>,
 
 Copyright (c) 2013-2014 hobbyquaker, https://github.com/hobbyquaker <hobbyquaker@gmail.com>,
 
 Creative Common Attribution-NonCommercial (CC BY-NC)

 http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).