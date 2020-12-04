---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mytime/README.md
title: ioBroker.mytime
hash: 8kCk0k4ECkwdp9kJHWGLhj4/4+kEv5E7p/CgD8oyCSA=
---
![Logo](../../../en/adapterref/iobroker.mytime/admin/mytime.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.mytime.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mytime.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/mytime-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/mytime-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/oweitman/iobroker.mytime.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/oweitman/ioBroker.mytime/badge.svg)
![Travis-CI](http://img.shields.io/travis/oweitman/ioBroker.mytime/master.svg)

# IoBroker.mytime
## Mytime Adapter für ioBroker
Dieser Adapter verarbeitet die Zeit (z. B. Countdown usw.)
Die Countdown-Funktion bietet Datenpunkte, mit denen Sie einen Countdown verwalten können (z. B. in einem Skript). Der Adapter enthält auch mehrere Widgets zur Visualisierung dieser Countdowns.

### Aufbau
#### Countdown
Erstellen Sie nach der Installation einen neuen Countdown, z. B. 'Test', stellen Sie den Timer auf 10 Sekunden ein und importieren Sie die folgenden Widgets.
Datenpunkte sind für einen Countdown mit dem Namen test vorkonfiguriert.

##### Verhaltens-Timer stoppen
Nachdem der Countdown das Signal gestoppt hat, wird der Countdown auf die vom Timer eingestellte Zeit zurückgesetzt.

##### Stoppverhalten Null Nachdem der Countdown das Signal gestoppt hat, bleibt der Countdown bei 0.
### Verwendung
#### Countdown
##### Verfügbare Datenpunkte
Nach der Konfiguration eines neuen Countdowns erstellt der Adapter die folgenden Datenpunkte:

| Datenpunkt | Beschreibung |
|-----------|---------------------------------------------------------------------------|
| Aktion | aktueller Stand des Countdowns. Mögliche Werte sind stop, run, pause, end |
| cmd | Datenpunkt für Befehle. Mögliche Befehle werden unten beschrieben |
| start | Datenpunkt für die Startzeit in Millisekunden |
| Ende | Datenpunkt für die Endzeit in Millisekunden |
| Timer | Datenpunkt für die in Millisekunden festgelegte Gesamtzeit |

##### Verfügbare Aktionszustände
| Aktion | Beschreibung |
|-----------|-------------------------------------------------------------------------------------------------------|
| stop | Der Countdown wird gestoppt, die Start- und Endzeit auf 0 | gesetzt |
| run | Der Countdown läuft. wenn der Countdown die Endzeit erreicht. Die Aktion wechselt zum Ende |
| Pause | Countdown läuft im Pausenmodus. Die Endzeit wurde auf die Zeit der Pause eingestellt |
| Ende | Der Countdown ist beendet. Diesen Status können Sie als Auslöser für weitere Aktionen (Sound, Popups usw.) verwenden |

##### Verfügbare Befehle für den cmd-Datenpunkt
| Befehl | Beispiel | Beschreibung |
|---------------|----------------------|----------------------------------------------------------------------------------------------|
| + Wert | +1: 10 | Fügt der Countdown-Einstellung Zeit hinzu. Die Einstellung wird beim nächsten Start berücksichtigt |
| -Wert | -1: 2: 3 | subtrahiert die Zeit vom Countdown. Die Einstellung wird beim nächsten Start berücksichtigt |
| = Wert | = 5: 00 | Stellen Sie den Countdowntimer auf diese Zeit ein. |
| # ISO-Datum | # 2020-01-01T10: 00: 00 | Stellen Sie den Countdowntimer auf eine Zielzeit ein. Die Zeit muss als ISO-Datestring | formatiert sein |
| $ Zeit | $ 20: 15 | Stellen Sie den Countdowntimer auf eine Zielzeit ein. Wenn die Zeit vor der aktuellen Zeit liegt. der nächste Tag ist eingestellt |
| start | start | startet den Countdown |
| stop | stop | stoppt den Countdown. Die Countdown-Zeit wird auf die Einstellung | zurückgesetzt |
| Pause | Pause | pausiert den Countdown |
| Ende | Ende | stoppt den Countdown. Der Countdown wird auf 0 | gesetzt |
| setstop2timer | setstop2timer | Setzen Sie die Konfiguration des Stoppverhaltens auf Timer |
| setstop2zero | setstop2zero | Setzen Sie die Konfiguration des Stoppverhaltens auf Nullen |

##### Format des Werts zum Einstellen des Countdown-Timers
Sie können den Countdown auf eine unbegrenzte Zeit einstellen.
Die Notation des Werts lautet [Tage: [Stunden: [Minuten: [Sekunden]]]. Tage, Stunden und Minuten sind optional.
Wenn Sie den Timer auf einen Tag einstellen möchten, müssen Sie auch Stunden, Minuten und Sekunden einstellen. Sie müssen die normalen Wertebereiche (z. B. Stunden 0-24) nicht einhalten. Sie können auch 48 Stunden einstellen.
Wenn Sie möchten, können Sie unregelmäßige Zeitnotationen festlegen. Die Zeit wird separat zusammengefasst

** Beispiele **

| Einstellung | Beschreibung |
|-----------|---------------------------------------------|
| 1: 0: 0: 0 | 1 Tag zum Timer setzen / addieren / subtrahieren |
| 2: 0: 0 | setze / addiere / subtrahiere 2 Stunden zum Timer |
| 3: 0 | 3 Minuten zum Timer setzen / addieren / subtrahieren |
| 120 | setze / addiere / subtrahiere 120 Sekunden zum Timer |
| 48: 0: 0 | setze / addiere / subtrahiere 48 Stunden zum Timer |
| 48: 75: 120 | setze / addiere / subtrahiere den Timer |

##### Format der Vorlage zum Formatieren der Countdown-Ausgabe im Widget
Folgende Platzhalter stehen zur Verfügung:

| Platzhalter | Beschreibung |
|-------------|-----------------------------------------------------------------|
| d | Tage ohne führende Nullen |
| dd | Tage mit führenden Nullen |
| H | Stunden ohne führende Nullen |
| HH | Stunden mit führenden Nullen |
| m | Minuten ohne führende Nullen |
| mm | Minuten mit führenden Nullen |
| s | Sekunden ohne führende Nullen |
| ss | Sekunden mit führenden Nullen |
| \ | Escapezeichen, wenn Sie einen Platzhalter in der Ausgabe | verwenden möchten |

** Beispiele **

Alle folgenden Beispiele mit Countdown-Timer 1: 2: 3: 4

| Vorlage | Beispiel | Ergebnis |
|-----------------------|-------------------|--------------------------------------------------|
| d \ d Hh m \ m s \ s | 1d 2h 3m 4s | mit Escapezeichen und ohne führende Nullen |
| dd \ d HHh mm \ m ss \ s | 01d 02h 03m 04s | mit Escapezeichen und mit führenden Nullen |
| ss \ s | 93784s | nur Sekunden |
| dd \ d HH \ h | 01d 02h | nur Tage und Stunden |
| HH \ h mm \ m | 26h 03m | nur Stunden und Minuten |

### Widgets
#### Widget Countdown normal
Ein Countdown-Widget für eine einfache Textausgabe

##### Widget-Eigenschaften
###### Oid Der Timer-Datenpunkt eines Countdown-Datenpunkts.
###### Format Formatiert die Timer-Ausgabe. Standard ist mm: ss. Einzelheiten finden Sie unter Kapitelformatvorlage
##### Beispiel für einen Widget-Code
Die Widgets sind für einen Countdown mit dem Namen test vorkonfiguriert.

```
[{"tpl":"tplMyTimeCountdownPlain","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"countdown_oid":"mytime.0.Countdown.test.timer","format":"d H m s"},"style":{"left":"771px","top":"143px","width":"151px","height":"16px"},"widgetSet":"mytime"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"+10s","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"+10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"742px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"-10s","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"-10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"801px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"=10","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"=10","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"864px","top":"111px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"start","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"start","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"742px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"pause","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"pause","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"801px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"},{"tpl":"tplJquiButtonState","data":{"oid":"mytime.0.Countdown.test.cmd","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"buttontext":"stop","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"value":"stop","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","class":"mytime"},"style":{"left":"864px","top":"163px","color":"white","font-weight":"lighter","font-size":"x-small","background":"","border-width":"2px","border-style":"solid","border-color":"white","border-radius":"10px","background-color":"#303030 !important","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","width":"55px"},"widgetSet":"jqui"}]
```

##### Der aktuelle Aktionsstatus (cdstop, cdrun, cdpause, cdend) des Countdowns ist als CSS-Klassenauswahl verfügbar.
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

#### Widget Countdown Kreis
Ein Countdown-Widget in einem Ring / Kreis-Design.

##### Widget-Eigenschaften
###### Oid Der Timer-Datenpunkt eines Countdown-Datenpunkts.
###### Notimetext Deaktiviert den Zeittext über der Polaruhr
###### Format Formatiert die Timer-Ausgabe. Standard ist mm: ss. Einzelheiten finden Sie unter Kapitelformatvorlage
###### Umgekehrte Einstellung zum Vergrößern oder Verkleinern des Rings / Kreises
###### Breite Die Breite des Rings oder Kreises.
###### Ringlücke Pixelabstand zwischen den Ringen
###### Caps Einstellung für die Enden des Rings / Kreises: rund oder gerade
###### Hintergrund Hintergrundfarbe des Rings / Kreises
###### Vordergrund Vordergrundfarbe des Rings / Kreises
###### Showsec Zeigt den Sekundenring an
###### Showmin Zeigt den Minutenring an
###### Showhrs Zeigt den Minutenring an
###### Showday Zeigt den Ring der Tage an
##### Der aktuelle Aktionsstatus (cdstop, cdrun, cdpause, cdend) des Countdowns ist als CSS-Klassenauswahl verfügbar.
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

#### Widget Countdown FlipClock
Ein Countdown-Widget im Flipboard-Stil eines Flughafens

##### Widget-Eigenschaften
###### Oid Der Timer-Datenpunkt eines Countdown-Datenpunkts.
###### Countdown_showsec Zeigt den Sekunden-Teil an. Zwischen zwei Einheiten darf keine Lücke bestehen.
###### Countdown_showmin Zeigt den Minutenteil an. Zwischen zwei Einheiten darf keine Lücke bestehen.
###### Countdown_showhrs Zeigt den Stunden-Teil an. Zwischen zwei Einheiten darf keine Lücke bestehen.
###### Countdown_showday Zeigt den Tagesteil an. Zwischen zwei Einheiten darf keine Lücke bestehen.
###### Countdown_color Farbe des Countdowntimers
###### Countdown_background_color Hintergrundfarbe des Countdowntimers
###### Countdown_dot_color Farbe der Punkte des Countdowntimers
##### Tipps
Wenn Sie die Größe der Countdown-Flipclock anpassen möchten, können Sie unter CSS-Einstellungen in vis die halbe Größe eingeben: Gruppe CSS-Common / transform "scale (0.5)"

##### Der aktuelle Aktionsstatus (cdstop, cdrun, cdpause, cdend) des Countdowns ist als CSS-Klassenauswahl verfügbar.
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

#### Widget Countdown NixieClock
Ein Countdown-Widget im Nixie-Tube / LED-Stil

##### Widget-Eigenschaften
###### Oid Der Timer-Datenpunkt eines Countdown-Datenpunkts.
###### Countdown_showsec Zeigt den Sekunden-Teil an. Zwischen zwei Einheiten darf keine Lücke bestehen.
###### Countdown_showmin Zeigt den Minutenteil an. Zwischen zwei Einheiten darf keine Lücke bestehen.
###### Countdown_showhrs Zeigt den Stunden-Teil an. Zwischen zwei Einheiten darf keine Lücke bestehen.
###### Countdown_showday Zeigt den Tagesteil an. Zwischen zwei Einheiten darf keine Lücke bestehen.
###### Countdown_color_active Farbe des Countdowntimers
###### Countdown_color_inactive Farbe der inaktiven Ziffern
###### Countdown_opacity_inactive Deckkraft der Farbe der inaktiven Ziffern
###### Countdown_glowcolor Farbe des Lichts um die Nixie-Ziffern
##### Tipps
Wenn Sie die Größe des Countdown-Nixieclock anpassen möchten, können Sie unter CSS-Einstellungen in vis die halbe Größe eingeben: Gruppe CSS-Common / Transformation "scale (0.5)"

##### Der aktuelle Aktionsstatus (cdstop, cdrun, cdpause, cdend) des Countdowns ist als CSS-Klassenauswahl verfügbar.
```
#w00000 .timer.cdend {
    color:red;
}
#w00000 .timer.cdrun {
    color:green;
}
```

## Machen
* 7-Segment-Anzeige
* rollierende Zahlen
* anpassbare Schriftarten
* Wordclock Timer?
* Timed Scheduler: Planen Sie ein einzelnes Datum / eine einzelne Uhrzeit und wiederkehrende Ereignisse wie Outlook
* ~~ Nixie-Stil ~~
* ~~ Flip-Board-Anzeige (Flughafen-Anzeige) ~~
* ~~ neuer Befehl, um nur die Zielzeit ohne Datum festzulegen ~~
* ~~ Countdown-Kreis-Widget mit Option zum Deaktivieren des Countdown-Textes
* ~~ Groupseperator '.' im Namen ~~
* ~~ Polaruhr ~~
* ~~ Kreis umkehren ~~
* ~~ Kreis mit runden Kappen ~~

## Changelog


### 0.5.1
* Migration of old counters
### 0.5.0
* Change settings dialog to react
### 0.4.2
* performance optimization. mytime now checks the data from internal and did not read the data allways from datapoints | update dependencies
### 0.4.1
* widget cd flipclock: remove dot labels
### 0.4.0
* New widget NixieClock
### 0.3.1
* remove mytime tile in iobroker overview
* set initial visual countdown value to 0
* prefix css classes, due css artefacts from other adapters (eg kodi and css class stop)
### 0.3.0
* new command to set only target time without date
* countdown circle widget now with option to disable countdown text
* timers are now groupable in subdirectories. you can now enter dots (.) as a groupseperater in the name of a timer
### 0.2.1
* fix timer display in configuration dialog
* fix default template of countdown plain
* add icons for countdonw plain and countdown circle widgets 
* fix startangle calculation for countdown circle if time values are 0
* remove timer intervals in editmode due to interfer with the configuration dialog and didnt save the ne values
### 0.2.0
* extend the countdown circle with more rings for days, hours and minutes
### 0.1.2
* Setting for growing or shrinking the ring/circle
* Setting for the ends of the ring/circle: round or straight
* Extend special char filtering with umlauts
* Fix state request issue in widget countdown circle 
### 0.1.1
* Add a countdown name datapoint
### 0.1.0
* Forum release
### 0.1.0
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