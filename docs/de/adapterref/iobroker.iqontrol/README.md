---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iqontrol/README.md
title: ioBroker.iqontrol
hash: qWPQT0vodXCE5ks4qi6nL4Cxox5g3exb8CS3AJFQwKc=
---
![Logo](../../../en/adapterref/iobroker.iqontrol/admin/iqontrol.png)

![Anzahl der Installationen](http://iobroker.live/badges/iqontrol-installed.svg)
![stabile Version](http://iobroker.live/badges/iqontrol-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.iqontrol.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.iqontrol.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/sbormann/iobroker.iqontrol.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/sbormann/ioBroker.iqontrol/badge.svg)
![NPM](https://nodei.co/npm/iobroker.iqontrol.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/sbormann/ioBroker.iqontrol/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/sbormann/ioBroker.iqontrol?branch=master&svg=true)

# IoBroker.iqontrol
** Tests: **

| Linux / Mac / Windows: | Browserübergreifende Überprüfung: |
| --- | --- |

\ **Wenn es Ihnen gefällt, ziehen Sie bitte eine Spende in Betracht:**

[![paypal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LDHZMNPXKRX2N&source=url)

****

## Iqontrol Adapter für ioBroker
Schnelle Web-App zur Visualisierung.

![Bildschirmfoto](../../../en/adapterref/iobroker.iqontrol/img/screenshot_kueche.png)

\
![Bildschirmfoto](../../../en/adapterref/iobroker.iqontrol/img/screenshot_licht.png)

\
![Bildschirmfoto](../../../en/adapterref/iobroker.iqontrol/img/screenshot_heizung.png)

\
![Bildschirmfoto](../../../en/adapterref/iobroker.iqontrol/img/screenshot_rauchmelder.png)

\
![Bildschirmfoto](../../../en/adapterref/iobroker.iqontrol/img/screenshot_flot.png)

Läuft in jedem Browser.
Es ist vollständig anpassbar und reagiert.

> **Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Zum Startbildschirm hinzufügen
Sie können es als Web-App auf Homescreen speichern und es sieht aus und fühlt sich an wie eine native App: ![Zu Homescreeen hinzufügen](../../../en/adapterref/iobroker.iqontrol/img/add_to_homescreen.png)

## Du brauchst...
* Knoten 10 oder höher
* Web-Adapter mit einer Instanz, auf der dasselbe Protokoll (http oder https) wie der Admin-Adapter ausgeführt wird, socket.IO auf "integriert" und "Web-Sockets erzwingen" deaktiviert
    * Wenn dies im Widerspruch zu anderen Adaptern steht, fügen Sie einfach eine weitere Instanz mit den oben genannten Einstellungen hinzu - iQontrol durchsucht die passende passende Webadapter-Instanz und verwendet sie für die Kommunikation
* Für die Verbindung über *iobroker.pro-Cloud* sollten sowohl der Administrator- als auch der Webadapter auf http (nicht https) eingestellt sein.

* Wenn Probleme auftreten, lesen Sie bitte den Abschnitt [Fehlerbehebung] (# Fehlerbehebung) am Ende dieser Readme-Datei

## Forum
Besuchen Sie [iobroker Forum](https://forum.iobroker.net/topic/22039/neuer-adapter-visualisierung-iqontrol).

## Wie benutzt man
** Haben Sie keine Angst vor den vielen Optionen, die Sie haben. ** Die meisten Dinge funktionieren sofort. Sie *können* müssen aber nicht alle Konfigurationsmöglichkeiten nutzen, die iQontrol bietet! Beginnen Sie einfach so:

* Erstellen Sie Ansichten.

Sie können Ansichten als eine Art Seite betrachten.

* Erstellen Sie dann Geräte in diesen Ansichten.

Geräte haben eine Rolle, die die Funktion des Geräts bestimmt, welche Symbole verwendet werden und so weiter.
Abhängig von dieser Rolle können Sie mehrere Status mit dem Gerät verknüpfen. Diese geben dem Gerät seine Funktionalität.
Wenn Sie als Rolle "Mit anderer Ansicht verknüpfen" auswählen, können Sie Links zu anderen Ansichten erstellen. Ich schlage vor, Links zu anderen Ansichten mit demselben Hintergrund wie die verknüpfte Ansicht zu skinnen.
Sie können auch versuchen, mit der Autocreate-Funktion ein vorhandenes Gerät aus dem iobroker-Objektbaum auszuwählen. Autocreate versucht, die Rolle herauszufinden und so viele Zustände wie möglich zuzuordnen.

* Anschließend können Sie eine Symbolleiste erstellen, die als Fußzeile angezeigt wird.

Symbolleisteneinträge sind Links zu Ansichten.
Der erste Symbolleisteneintrag ist Ihre 'Home-View', mit der beim Start geladen wird.

* Um alles zu einem ausgefallenen Stil zu machen, können Sie Ihre eigenen Bilder hochladen.

Sie können Ihre Bilder als Hintergrundbilder für Ansichten oder für Geräte verwenden.
Bilder im Ordner '/ usericons' können als Symbole für Geräte verwendet werden.
Die kostenlos eingebauten Demo-Hintergrundbilder stammen von www.pexels.com.

## URL-Parameter
* Das Frontend wird über `` http [s]: // <URL oder IP von iobroker>: <Port des Webadapters> / iqontrol / index.html`` aufgerufen
    * `` <Port des Webadapters> `` ist normalerweise 8082
* Um eine angegebene Instanz zu öffnen, können Sie `` namespace = iqontrol. <Instanznummer> `` als URL-Parameter hinzufügen
* Um eine angegebene Ansicht als Homepage zu öffnen, können Sie `` home = <viewID> `` als URL-Parameter hinzufügen
    * `` <viewID> `` muss wie `` iqontrol. <Insektanznummer> .Views. <Ansichtsname> `` formatiert sein
* Hinweis: Hierbei wird zwischen Groß- und Kleinschreibung unterschieden!
* Verwenden Sie die folgenden Parameter, um die Rückgabe nach Zeiteinstellungen festzulegen oder zu überschreiben:
* `` returnAfterTimeTreshold = <time in seconds> `` um die Zeit einzustellen, nach der die Zielansicht aufgerufen wird. Verwenden Sie `` 0``, um die Rückgabe nach Zeit zu deaktivieren.
* `` returnAfterTimeDestiationView = <viewID> ``, um die Ansicht festzulegen, die nach dem Schwellenwert aufgerufen wird. Wenn nicht angegeben, wird die Startansicht verwendet.
* Diese Optionen sind hilfreich, wenn Sie iQontrol von einem an der Wand montierten Tablet aus aufrufen, das nach der Verwendung automatisch zur Startansicht zurückkehren sollte

**Beispiel:**

* `` https://192.168.1.1: 8082 / iqontrol / index.html? namespace = iqontrol.1 & home = iqontrol.1.Views.Living-Room``
    * Groß- und Kleinschreibung beachten

## Icons und Hintergrundbilder
* Sie können die eingebauten Bilder oder die unter der Registerkarte "Bilder" hochgeladenen Bilder oder eine beliebige kostenlose URL verwenden
* Sie können auch eine Variable in der Bild-URL verwenden. Dies kann beispielsweise für Wettervorhersagen nützlich sein. Verwenden Sie dieses Muster:
    * `` path / to / firstloaded.png | anotherpath / to / {iobrokerstate | fallback} .png``
    * Beispiel: `` ./../ iqontrol.meta / userimages / demo / Flasche.jpg | ./../ iqontrol.meta / userimages / demo / {javascript.0.myimage | whitestone} .jpg``
* Dies lädt `` ./../ iqontrol.meta / userimages / demo / Bottle.jpg``, wenn Sie die Ansicht öffnen
* Sobald der Status von "javascript.0.myimage" vom Server abgerufen wird, wird das Bild durch "./../ iqontrol.meta / userimages / demo / XXX.jpg" ersetzt, wobei " `XXX`` ist der Wert von` `javascript.0.myimage``
* Wenn `` javascript.0.myimage`` keinen Wert hat, wird der Fallback `` whitestone`` verwendet (die Verwendung des Fallbacks ist optional)

### Fortschrittsbalken
* Es ist möglich, SVG-Definitionen in Kombination mit Variablen anstelle von Bilddateien zu verwenden, um Fortschrittsbalken anzuzeigen
* Es stehen integrierte Vew-Vorlagen zur Auswahl, Sie können jedoch auch eigene SVGs erstellen

![Fortschrittsbalkenquadrat](img/progressbar_square.png) ![Fortschrittsbalken Kreis](../../../en/adapterref/iobroker.iqontrol/img/progressbar_circle.png)

* Weitere Informationen finden Sie unter [Wiki] (https://github.com/sbormann/ioBroker.iqontrol/wiki/Progress-Bars)

## Gerätenamen
* Genau wie Variablen in Bild-URLs können Sie Variablen in Gerätenamen verwenden. Die Syntax ist fast dieselbe:
    * `` Text beim Laden | Text nach dem Laden von {iobrokerstate | fallback} ``
* Kann den iobrokerstate zusätzlich in eckige Klammern setzen, dann wird der einfache Wert ohne seine Einheit verwendet: `` Text beim Laden | Text nach dem Laden von {[iobrokerstate] | fallback} ``
    * Beispiel: `` Wetter wird geladen | Wetter: {javascript.0.weather | Keine Wetterdaten gefunden} ``
* Dies zeigt "Wetter wird geladen", wenn Sie die Ansicht öffnen
* Sobald der Status von "javascript.0.weather" vom Server abgerufen wird, wird der Text durch "Weather: XXX" ersetzt, wobei "XXX" der Wert von "javascript.0" ist .wetter``
* Wenn `` javascript.0.weather`` keinen Wert hat, wird der Fallback `` Keine Wetterdaten gefunden`` verwendet (die Verwendung des Fallbacks ist optional)

## Popup-Nachrichten
* Jede Instanz erstellt den Status "iqontrol.x.Popup.Message"
* Wenn Sie Werte an diesen Status übergeben, wird eine Popup-Nachricht (oder ein Toast) angezeigt
* Sie können HTML-Tags verwenden, um den Nachrichtentext zu formatieren
* Es gibt einige zusätzliche Status für die weitere Anpassung des angezeigten Popups (diese müssen festgelegt werden, bevor der Nachrichtendatenpunkt festgelegt wird):
    * `` Dauer``: Dies ist die Zeit in ms, in der die Nachricht angezeigt wird. Wenn auf 0 gesetzt, muss die Nachricht bestätigt werden
    * `` ClickedValue`` und `` ClickedDestinationState``: Wenn der Benutzer auf das Popup klickt, wird der Wert von `` ClickedValue`` an `` iqontrol.x.Popup.POPUP_CLICKED`` und, falls angegeben, zusätzlich gesendet zum Datenpunkt in `` ClickedDestinationState``
        * Wenn kein Wert angegeben ist, wird `` true`` verwendet
    * `` ButtonNames``: Hier können Sie eine durch Kommas getrennte Liste von Schaltflächen angeben, die am unteren Rand des Popups angezeigt wird (zum Beispiel "OK, Abort").
        * `` ButtonValues`` und `` ButtonDestinationStates``: Dies sind durch Kommas getrennte Wertelisten, die an `` iqontrol.x.Popup.BUTTON_CLICKED`` und, falls angegeben, zusätzlich zum Datenpunkt in `` ButtonDestinationStates` gesendet werden `, wenn der Benutzer auf die entsprechende Schaltfläche klickt
* Wenn Sie nur einen Wert verwenden (anstelle einer durch Kommas getrennten Liste), wird dieser Wert für alle Schaltflächen verwendet
* Wenn Sie `` ButtonValues`` leer lassen, wird der Name der Schaltfläche verwendet
* Wenn Sie nur einen Zielstatus verwenden (anstelle einer durch Kommas getrennten Liste), wird dieser Status für alle Schaltflächen verwendet
        * `` ButtonCloses``: Dies ist eine durch Kommas getrennte Liste von Booleschen Werten (`` true`` / `` false``), die angeben, ob das Popup geschlossen werden soll, wenn die entsprechende Schaltfläche gedrückt wird
* Alternativ können Sie diese Werte über den Befehl sendTo mit den Parametern `` PopupMessage``, `` PopupDuration``, `` PopupClickedValue`` usw. festlegen
    * Beispiel: `` sendTo ("iqontrol", "send", {PopupMessage: 'Dies ist meine Nachricht', PopupDuration: 2500, PopupClickedValue: 'messageConfirmed'}); ``
* Sie können blockly auch Nachrichten an iQontrol senden

![Popup-Screenshot](img/popup_screenshot.png) ![Popup Blockly](../../../en/adapterref/iobroker.iqontrol/img/popup_blockly.png)

## Beschreibung der Rollen und zugehörigen Zustände
Jedes Gerät hat eine Rolle, die die Funktion des Geräts definiert. Jede Rolle generiert eine Reihe von Status, die mit einem entsprechenden Io-Broker-Status verknüpft werden können.
Wenn Sie die Auto-Create-Funktion verwenden, können Sie ein vorhandenes Gerät aus dem Io-Broker-Objektbaum auswählen. Autocreate versucht, die Rolle herauszufinden und so viele Zustände wie möglich zuzuordnen.
Dies funktioniert nur bei bekannten Geräten. Für unbekannte Geräte und um Geräten erweiterte Funktionen zu bieten, können Sie sie manuell über die Schaltfläche (+) - hinzufügen oder die durch automatische Erstellung erstellten Geräte bearbeiten.
Klicken Sie auf den Stift hinter dem Gerät, um die Rolle und den Status eines Geräts zu bearbeiten. Nachfolgend finden Sie eine kurze Beschreibung der Rollen und der verwendeten Zustände:

### Ändern der Datenpunktkonfiguration
Sie können die Konfiguration von Datenpunkten über das Schraubenschlüsselsymbol hinter einem Datenpunkt im Dialogfeld Gerätekonfiguration oder auf der Registerkarte Objekte von iobroker ändern. Hier kannst du:

* Readonly-Flag setzen
* Invert-Flag setzen
* Confirm-Flag setzen (zwingt den Benutzer zur Bestätigung, bevor eine Änderung in einen Datenpunkt geschrieben wird)
* PIN-Code festlegen (zwingt den Benutzer, diesen PIN-Code einzugeben, bevor eine Änderung in einen Datenpunkt geschrieben wird - aber Vorsicht: Dies ist nur von geringer Sicherheit, da die PIN im Frontend überprüft wird! Verwenden Sie eine Nummer, um einen Vollbildmodus anzuzeigen -pin-pad, wenn nach Code gefragt wird)
* Ändern Sie die Einheit des Datenpunkts, getrennt nach Null-, Singular- und Pluralwerten
* Ändern Sie min und max des Datenpunkts
* Legen Sie die Schritte fest, die ein Level-Schieberegler ausführt, wenn er erhöht / verringert wird
* Ändern Sie den Typ des Datenpunkts
* Ändern Sie die Rolle des Datenpunkts
* Legen Sie eine Zielwert-ID fest, bei der es sich um eine Datenpunkt-ID handelt, in die Zielwerte geschrieben werden (wenn Sie unterschiedliche Datenpunkte für den tatsächlichen und den Zielwert haben).
* Festlegen oder Ändern einer Werteliste
    * Optional eine Option zur Werteliste hinzufügen, um freien Text einzugeben
* Legen Sie eine Zielwertliste fest:
    * Zusätzlich zur Zielwert-ID können Sie verschiedene Datenpunkt-IDs und Zielwerte für verschiedene Schlüssel definieren (Schlüssel sind mögliche Werte des ursprünglichen Datenpunkts).
  *Sie können auch den Platzhalter ``* `` in den Schlüsseln und in den Zielwerten verwenden
* Beispiel:
* Schlüssel: `` TuneIn-Playlist: *``, Zieldatenpunkt-ID: `` alexa2.0.Echo-Devices.XYZ.Music-Provider.TuneIn-Playlist``, Zielwert: ``* ``
* Wenn der Benutzer "TuneIn-Playlist: Ambient" eingibt, wird der Wert "Ambient" in "alexa2.0.Echo-Devices.XYZ.Music-Provider.TuneIn-Playlist" geschrieben

![CustomDialog-Aufruf](img/custom_call.png) ![CustomDialog Beispiel](img/custom_dialog.png) ![Konzept der Zielwertliste](../../../en/adapterref/iobroker.iqontrol/img/target-value-list_concept.png)

### Allgemeine Zustände:
#### STATE und LEVEL
Fast alle Rollen haben einen **STATE** - und / oder einen **LEVEL** - Status. In den meisten Fällen stellt dies die Hauptfunktion des Geräts dar. Sie können ihm io-Broker-Zustände der folgenden Typen zuweisen:

* *boolean* - wenn möglich, wird es in einen sinnvollen Text wie "ein / aus", "geöffnet / geschlossen" oder ähnliches übersetzt. Wenn Sie auf das Symbol einer Kachel klicken, wird versucht, den Booleschen Wert umzuschalten (z. B. um ein Licht ein- oder auszuschalten). Wenn es nicht schreibgeschützt ist, wird im Dialog ein Kippschalter generiert
* *Nummer* - wird mit der entsprechenden Einheit angezeigt und generiert einen Schieberegler im Dialogfeld
* *string* - Ein anzuzeigender Text
* *Werteliste* - Der ausgewählte Wert wird angezeigt. Wenn es nicht schreibgeschützt ist, wird im Dialogfeld ein Dropdown-Menü generiert
    * Technisch gesehen ist eine * Werteliste * ein Wert mit einer entsprechenden Übersetzungsliste, die im Objekt 'common.custom.iqontrol. <Instanz> .states', 'native.states' oder 'common.states' des Datenpunkts definiert ist ::

````
"native": {
    "states": {"true": "Text for true", "false": "Text for false"},
    ...
}
````

    * Sie können Ihre eigene Werteliste erstellen, indem Sie den Datenpunkt ändern (Schraubenschlüsselsymbol hinter dem Datenpunkt auf der Registerkarte Objekte von iobroker, siehe oben).
* Ob die Gerätekachel als aktiv oder inaktiv angezeigt wird, wird ebenfalls aus dem STATE- oder LEVEL-Datenpunkt ermittelt. Sie können das Verhalten jedoch im Optionsbereich "Bedingungen für eine aktive Kachel" frei anpassen. Sie können sogar einen anderen externen Datenpunkt festlegen, der den Status der Kachel bestimmt

Allerdings macht nicht jeder Typ für jede Rolle Sinn. So ist beispielsweise der ZUSTAND eines Schalters in den meisten Fällen ein Boolescher Wert, um zwischen Ein und Aus umgeschaltet werden zu können. Möglicherweise wird eine Zeichenfolge angezeigt, der Schalter ist jedoch nicht funktionsfähig.

### Weitere allgemeine Zustände:
* **ADDITIONAL_INFO** *array* - Ein Array von Datenpunkten, das am unteren Rand des Info-Dialogs angezeigt wird
* **URL** CONSTANT *string* - Diese URL wird als Iframe im Dialogfeld geöffnet
* **HTML** CONSTANT *string* - Dieses Markup wird im iframe angezeigt, wenn kein URL-Datenpunkt angegeben ist
* **BACKGROUND_URL** CONSTANT *string* - Diese URL wird als Hintergrund der Gerätekachel angezeigt. Es wird über den Hintergrundbildern platziert, aber Sie können es so konfigurieren, dass es ausgeblendet wird, wenn die Kachel aktiv oder inaktiv ist.
* **BACKGROUND_HTML** CONSTANT *string* - Dieses Markup wird als Hintergrund der Gerätekachel angezeigt, wenn kein BACKGROUND_URL angegeben ist
* **BATTERIE** *Boolescher Wert* - wenn wahr oder *Zahl* - wenn weniger als 10%, wird ein kleines Symbol für leere Batterie angezeigt
    * Sie können das Verhalten des Batteriesymbols im Optionsbereich 'BATTERY Empty Icon' weiter anpassen.
* **ERROR** *boolean* - Wenn true, wird ein kleines Ausrufezeichen angezeigt
* **UNREACH** *boolean* - Wenn true, wird ein kleines WLAN-Symbol angezeigt
    * Das Verhalten kann im Abschnitt "Allgemein" der Optionen umgekehrt werden (verwenden Sie "Verbunden" anstelle von "Nicht erreichbar").

### Link zu anderer Ansicht:
* Hat keine weiteren Zustände
* Die **Linked-View-Eigenschaft** wird direkt geöffnet

### <img src="img/icons/switch_on.png" width="32"> Schalter:
* **STATE** *boolean* - Anzeige und Ein / Aus-Status
* **POWER** *number* - Stromverbrauch, der in der oberen rechten Ecke klein angezeigt wird

### <img src="img/icons/button.png" width="32"> Taste:
* **STATE** *any* - jede gewünschte Art von Zustand
* **SET_VALUE** CONSTANT *string* - Dies ist eine Konstante (kein verknüpfter Io-Broker-Status!), Die dem STATE zugewiesen wird, wenn die Taste gedrückt wird
* **OFF_SET_VALUE** CONSTANT *string* - Dies ist eine Konstante (kein verknüpfter Io-Broker-Status!). Wenn definiert, wird STATE nach der in den Optionen definierten Zeit oder 100 ms auf diesen Wert zurückgesetzt

### <img src="img/icons/light_on.png" width="32"> Licht:
Jedes Licht kann einen oder beide der folgenden Zustände haben:

* **STATE** *boolean* - show und set on / off-state
* **LEVEL** *number* - Zeigt den Lichtpegel an und stellt ihn ein

Optional können Sie folgende Zustände definieren:

* Für farbige LEDs (HSB-Farbraum):
  * **HUE** * number * - Farbe des Lichts von 0-360 ° (Farbtonformat)
  * **SÄTTIGUNG** * Zahl * - Lichtsättigung (von Weiß zu reiner Farbe)
  * **COLOR_BRIGHTNESS** * number * - die Helligkeit der farbigen LEDs (wenn Sie einen LEVEL-Status und keine weißen LEDs haben, wird dies ignoriert, da die Helligkeit vollständig von LEVEL gesteuert wird)
* Für weiße LEDs:
  * **CT** * Nummer * - Farbtemperatur des Lichts, wenn es zwei Weißtöne hat
  * **WHITE_BRIGHTNESS** * number * - die Helligkeit der weißen LEDs (wenn Sie einen LEVEL-Status und keine farbigen LEDs haben, wird dies ignoriert, da die Helligkeit vollständig von LEVEL gesteuert wird)
* Alternative Farbräume:
  * **ALTERNATIVE_COLORSPACE_VALUE** * string * oder * number * (abhängig vom gewählten Farbraum) - der Wert des alternativen Farbraums

    Wenn Ihr Gerät die Verwendung von HUE, SATURATION und COLOR_BRIGHTNESS (HSB / HSV-Farbraum) nicht unterstützt, können Sie verschiedene alternative Farbräume verwenden. In den Geräteoptionen können Sie einen der folgenden Farbräume auswählen:

    * **RGB** / **# RGB** Anstelle von HUE, SATURATION und COLOR_BRIGHTNESS können Sie das RGB-Format (hex) verwenden, optional mit dem führenden '#'
    * **RGBW** / **# RGBW** Anstelle von HUE, SATURATION, COLOR_BRIGHTNESS und WHITE_BRIGHTNESS können Sie das RGBW-Format (hex) verwenden, optional mit führendem '#'
    * **RGBWWCW** / **# RGBWWCW** / **RGBCWWW** / **# RGBCWWW** Anstelle von HUE, SATURATION, COLOR_BRIGHTNESS, CT und WHITE_BRIGHTNESS können Sie das RGBWWCW- oder RGBCWWW-Format (hex) verwenden , WW = warmweiß, CW = kaltweiß), optional mit führendem '#'
    * **RGB (nur Farbton)** / **# RGB (nur Farbton)** Anstelle von HUE können Sie auch das RGB-Format (nur Farbton) (hex) verwenden, optional mit dem führenden '#'. In diesem speziellen Fall akzeptiert das RGB-Format nur reine gesättigte Farben des Farbton-Farbkreises. Mischweiß ist nicht erlaubt
    * **Farbton für Milight** Dies ist der Farbtonwert für Milight-Geräte, wobei ein anderer Ausgangspunkt im Farbton-Farbkreis verwendet wird:

````
tHue = modulo(66 - (hue / 3.60), 100) * 2.55;
modulo(-3.60 * (MilightHue/2.55 - 66), 360);
on modulo(n, m){ return ((n % m) + m) %m; }
````

Beachten Sie: Die Konvertierung in einen alternativen Farbraum erfolgt über das Frontend und ist daher nur aktiv, wenn iQontrol irgendwo geöffnet ist. Daher können Sie es nicht als Konverter für Farbräume verwenden. Um Konversationsschleifen zu vermeiden, wird empfohlen, entweder die ursprünglichen Farbraum-Datenpunkte (HUE, SATURATION, COLOR_BRIGHTNESS, CT, WHITE_BRIGHTNESS) *oder* den alternativen Farbraum-Datenpunkt zu verwenden, um diese Datenpunkte *zu ersetzen*

* Effektmodus:
  * **EFFECT** * Werteliste * - der zu spielende Effekt
* **EFFECT_NEXT** *boolean* - Wenn auf true gesetzt, wird der nächste Effekt abgespielt (als Alternative für Geräte, die die EFFECT-Werteliste nicht unterstützen).
* **EFFECT_SPEED_UP** / **EFFECT_SPEED_DOWN** *boolean* - Wenn dieser Wert auf true gesetzt ist, wird der Effekt beschleunigt / verringert
* Verschiedenes:
  * **POWER** * number * - Stromverbrauch, der in der oberen rechten Ecke klein angezeigt wird

### <img src="img/icons/fan_on.png" width="32"> Ventilator:
* **STATE** *boolean* - Anzeige und Ein / Aus-Status
* **LEVEL** *number* oder *value-list* - die Lüftergeschwindigkeit
* **POWER** *number* - Stromverbrauch, der in der oberen rechten Ecke klein angezeigt wird

### <img src="img/icons/radiator.png" width="32"> Thermostat:
* **SET_TEMPERATURE** *Nummer* - Zieltemperatur
* **TEMPERATUR** *Zahl* - Die tatsächliche Temperatur wird in der oberen rechten Ecke klein angezeigt
* **FEUCHTIGKEIT** *Zahl* - Die tatsächliche Luftfeuchtigkeit wird in der oberen rechten Ecke klein angezeigt
* **CONTROL_MODE** *Werteliste* - Anzeige und Einstellung des Modus des Thermostats
* **WINDOW_OPENING_REPORTING** *boolean* - Wenn true, wird ein kleines geöffnetes Fenster angezeigt
* **VALVE_STATES** Array von Namen und Nummern - Zeigt die Öffnung der Ventile an, die dem Thermostat zugeordnet sind

### <img src="img/icons/radiator.png" width="32"> Homematischer Thermostat:
Zusätzlich zum normalen Thermostat können Sie Folgendes definieren:

* **PARTY_TEMPERATURE** *string* - speziell formatierter String zum Definieren des Party- oder Feiertagsmodus von homematischen Thermostaten
* **BOOST_STATE** *number* - Zeigt die verbleibende Boost-Zeit von homematischen Thermostaten an

### <img src="img/icons/temperature.png" width="32"> Temperatursensor, <img src="img/icons/humidity.png" width="32"> Feuchtigkeitssensor:
* **STATE** *number* - Temperatur oder Luftfeuchtigkeit, die im unteren Teil des Geräts angezeigt werden
* **TEMPERATUR** *Zahl* - Temperatur, die in der oberen rechten Ecke klein angezeigt wird
* **FEUCHTIGKEIT** *Zahl* - Luftfeuchtigkeit, die in der oberen rechten Ecke klein angezeigt wird
* Die **Linked-View-Eigenschaft** wird direkt geöffnet

### <img src="img/icons/brightness_light.png" width="32"> Helligkeitssensor:
* **STATE** *number* - Helligkeit, die im unteren Teil des Geräts angezeigt wird
* **HELLIGKEIT** *Zahl* - Helligkeit, die in der oberen rechten Ecke klein angezeigt wird
* Die **Linked-View-Eigenschaft** wird direkt geöffnet

### <img src="img/icons/motion_on.png" width="32"> Bewegungssensor:
* **STATE** *boolean* - Anzeige, ob eine Bewegung erkannt wird oder nicht
* Die **Linked-View-Eigenschaft** wird direkt geöffnet

### <img src="img/icons/door_closed.png" width="32"> Tür, <img src="img/icons/window_closed.png" width="32"> Fenster:
* **STATE** *boolean* - Anzeige, ob die Tür oder das Fenster geöffnet oder geschlossen ist
    * Alternativ können Sie eine * Werteliste * zuweisen, um zusätzliche Zustände wie 'gekippt' anzuzeigen (in Fensteroptionen können Sie definieren, welche Texte für geöffnet, geschlossen und gekippt stehen, um das richtige Symbol anzuzeigen).
    * Sie können auch eine * Zeichenfolge * zuweisen, um Text wie "3 Fenster offen" oder "alles geschlossen" oder eine * Nummer * anzuzeigen.
* Die **Linked-View-Eigenschaft** wird direkt geöffnet

### <img src="img/icons/garagedoor_closed.png" width="32"> Garagentor:
* **STATE** *boolean* - Anzeige, ob die Tür geöffnet oder geschlossen ist
    * Alternativ können Sie eine * Werteliste * zuweisen, um zusätzliche Zustände wie 'gekippt' anzuzeigen.
    * Sie können auch eine * Zeichenfolge * zuweisen, um Text wie "3 Türen offen" oder "Alle geschlossen" anzuzeigen.
* **TOGGLE** *boolean* - Zeigt einen 'Toggle'-Button an und wird auf true gesetzt, wenn gedrückt

### <img src="img/icons/door_locked.png" width="32"> Tür mit Schloss:
* **STATE** *boolean* - Anzeige, ob die Tür geöffnet oder geschlossen ist (Tür- / Fensterkontakt)
* **LOCK_STATE** *boolean* - Anzeige und Steuerung, ob die Tür verriegelt oder entriegelt ist (Steuerung ist deaktiviert, wenn STATE wahr ist - weil Sie eine geöffnete Tür nicht verriegeln können)
* **LOCK_STATE_UNCERTAIN** *boolean* - Wenn true, wird der STATE in Kursivschrift angezeigt, um anzuzeigen, dass die genaue Position des Schlosses unbekannt ist
* **LOCK_OPEN** *boolean* - Wenn true festgelegt ist, wird die Tür vollständig geöffnet

### <img src="img/icons/blind_middle.png" width="32"> Blind:
* **LEVEL** *number* - Höhe des Blinden in Prozent
* **RICHTUNG** *Werteliste* - kann Stop, Up und Down sein. Die Werte für Stop, Up, Down und Unknown können konfiguriert werden
* **STOP** *boolean* - wird auf true gesetzt, wenn die Stop-Taste gedrückt wird
* **UP** / **DOWN** *boolean* - wird auf true gesetzt, wenn die Auf- / Ab-Taste gedrückt wird (für Geräte, die UP- und DOWN-Datenpunkte anstelle von oder zusätzlich zu LEVEL verwenden). Zusätzlich können Sie einen Wert über die Datenpunkte **UP_SET_VALUE** / **DOWN_SET_VALUE** definieren. Wenn definiert, wird dieser Wert anstelle von true gesendet, wenn die Auf- / Ab-Taste gedrückt wird
* **FAVORITE_POSITION** *boolean* - kann verwendet werden, um eine Lieblingsposition abzurufen. Wenn die Favoritentaste (Schaltflächenbeschriftung kann in den Geräteeinstellungen konfiguriert werden) gedrückt wird, wird true an diesen Datenpunkt gesendet. Zusätzlich können Sie einen Wert über den Datenpunkt **FAVORITE_POSITION_SET_VALUE** definieren. Wenn definiert, wird dieser Wert anstelle von true gesendet, wenn die Favoritentaste gedrückt wird
* **SLATS_LEVEL** *number* - Position der Lamellen in Prozent

### <img src="img/icons/fire_on.png" width="32"> Feuersensor:
* **STATE** *boolean* - Wenn true, wird der Sensor als ausgelöst angezeigt
    * Alternativ können Sie eine * Werteliste * zuweisen, um zusätzliche Zustände wie 'manipuliert' anzuzeigen.
    * Sie können auch eine * Zeichenfolge * zuweisen, um Text wie "Feuer im Obergeschoss" anzuzeigen.
* Die **Linked-View-Eigenschaft** wird direkt geöffnet

### <img src="img/icons/flood_on.png" width="32"> Hochwassersensor:
* **STATE** *boolean* - Wenn true, wird der Sensor als ausgelöst angezeigt
    * Alternativ können Sie eine * Werteliste * zuweisen, um zusätzliche Zustände wie 'manipuliert' anzuzeigen.
    * Sie können auch eine * Zeichenfolge * zuweisen, um Text wie "Flood in Upper Floor" anzuzeigen.
* Die **Linked-View-Eigenschaft** wird direkt geöffnet

### <img src="img/icons/alarm_on.png" width="32"> Alarm:
* **STATE** *boolean* - Wenn true, wird der Sensor als ausgelöst angezeigt
    * Alternativ können Sie eine * Werteliste * zuweisen, um zusätzliche Zustände wie 'manipuliert' anzuzeigen.
    * Sie können auch eine * Zeichenfolge * zuweisen, um Text wie "Feuer im Obergeschoss" anzuzeigen.
* **CONTROL_MODE** *Werteliste* - Betriebsmodus wie "Bewaffnet" und "Entwaffnet" auswählen
    * In den Geräteoptionen können Sie den Wert definieren, der die Deaktivierung darstellt, sodass das Darstellungssymbol angezeigt werden kann

### <img src="img/icons/battery_full.png" width="32"> Batterie:
* **STATE** *number* - Batteriestand in Prozent
* **CHARGING** *boolean* - Wenn true, wird ein Ladesymbol angezeigt
* **POWER** *number* - Stromverbrauch, der in der oberen rechten Ecke klein angezeigt wird
* **VOLTAGE** *number* - Spannung, die in der oberen rechten Ecke klein angezeigt wird

### <img src="img/icons/value_on.png" width="32"> Wert:
* **STATE** *any* - jeder gültige Status, der angezeigt werden soll (siehe Abschnitt "Allgemeine Status")
* **LEVEL** *number* - erzeugt einen Schieberegler im Dialog

### <img src="img/icons/play_on.png" width="32"> Programm:
* **STATE** *boolean* - Wenn true festgelegt ist, wird das Programm gestartet

### <img src="img/icons/play.png" width="32"> Szene:
* **STATE** *boolean* - wird angezeigt, wenn die Szene aktiv ist. Abhängig von der Konfiguration der Szene (virtuelle Gruppe, Werte für falsch aktiviert oder deaktiviert festlegen) sendet der Umschaltbefehl true, false, min, 0, max oder 100. Es besteht die Möglichkeit, immer true zu senden (Umschalten deaktivieren). .

### <img src="img/icons/media_on.png" width="32"> Media-Player / Fernbedienung:
* **STATE** *string* - "play", "pause" oder "stop" oder *boolean* - true für play, false für stop
    * In den Geräteoptionen können Sie den Wert definieren, der Wiedergabe, Pause und Stopp darstellt
* **COVER_URL** *string* - URL zum Titelbild
* **KÜNSTLER, ALBUM, TITEL** *string* - selbsterklärend
* **TRACK_NUMBER** *Nummer* - selbsterklärend
* **PREV, REWIND, PLAY, PAUSE, STOP, FORWARD, NEXT** *boolean* - wird auf true gesetzt, wenn die entsprechende Taste gedrückt wird
* **SHUFFLE, MUTE, PLAY_EVERYWHERE, EJECT, POWER_SWITCH** *Boolescher* - Status für die entsprechende Funktion
* **REPEAT** *Boolescher* - Status für Wiederholungsfunktion oder *Zeichenfolge* - 3 Zustände können über die entsprechenden Optionen definiert werden: Wert für Aus, Alle wiederholen und Eins wiederholen
* **DAUER, ABLAUFEN** *Nummer* - Dauer und verstrichene Zeit des tatsächlichen Titels - wird verwendet, um eine Suchleiste anzuzeigen
* **VOLUME** *number* - für Lautstärkeregler
* **QUELLE, PLAYLIST** *Werteliste* - Auswahlmenü anzeigen, um eine Quelle oder einen Titel aus der Wiedergabeliste auszuwählen

##### Um eine *Universalfernbedienung* anzuzeigen, können Sie folgende Zustände definieren:
* **REMOTE_NUMBER** *string* - Zeigt einen Nummernblock an und gibt die entsprechende Nummer zurück, wenn auf eine Nummer geklickt wird
* **REMOTE_VOLUME_UP, REMOTE_VOLUME_UP, REMOTE_CH_UP, REMOTE_CH_DOWN** *string* - zeigt die Schaltflächen für Lautstärke hoch / runter und Kanal hoch / runter und gibt 'volumeUp', 'volumeDown', 'chUp' oder 'chDown' zurück, falls dies der Fall ist Taste gedrückt wird
* **REMOTE_PAD_DIRECTION, REMOTE_PAD_BACK, REMOTE_PAD_HOME, REMOTE_PAD_MENU** *string* - zeigt ein Trackpad für Navigation und Rückkehr
    * 'ok' wenn die Mitte des Pads angeklickt wird,
* 'left', 'right', 'up' oder 'down', wenn auf die Kanten des Pads geklickt oder das Pad in die entsprechende Richtung gewischt wird oder
* 'Zurück', 'Startseite' oder 'Menü *, wenn die entsprechenden Schaltflächen angeklickt werden
* Beachten Sie: Sie können die Zielwertliste (über das Schraubenschlüsselsymbol jedes Datenpunkts zugänglich) verwenden, um abhängig vom zurückgegebenen Wert eine Verknüpfung von einem Datenpunkt zu mehreren Datenpunkten herzustellen (siehe Abschnitt Ändern von Datenpunkten oben).
* **REMOTE_COLOR** *string* - zeigt farbige Schaltflächen an und gibt die entsprechende Farbe ('rot', 'grün', 'gelb' oder 'blau') zurück, wenn auf eine Farbe geklickt wird
* **REMOTE_ADDITIONAL_BUTTONS** *array* - ein Array von Schaltflächen. Der Name der Schaltfläche wird an die entsprechende Status-ID gesendet, wenn auf die Schaltfläche geklickt wird
* **REMOTE_HIDE_REMOTE** *booelan* - Wenn true, wird der gesamte Abschnitt der Fernbedienung ausgeblendet (z. B. um ihn nur anzuzeigen, wenn eine gültige Quelle ausgewählt ist).

### <img src="img/icons/popup.png" width="32"> Aufpoppen:
* **STATE** *any* - kann verwendet werden, um weitere Informationen anzuzeigen

### <img src="img/icons/link.png" width="32"> Externer Link:
* **STATE** *any* - kann verwendet werden, um weitere Informationen anzuzeigen
* **URL** CONSTANT *string* - Diese URL wird geöffnet

****

## Fehlerbehebung
* Stellen Sie sicher, dass Sie den Abschnitt "Sie brauchen ..." oben auf dieser Seite erfüllt haben
* Wenn nach dem Update etwas nicht wie erwartet funktioniert, führen Sie die folgenden Schritte aus:
    * Starten Sie den Upload des Adapters:

    \
        ![Hochladen](../../../en/adapterref/iobroker.iqontrol/img/adapter_upload.png)

* Browser-Cache löschen
* Starten Sie ioBroker neu

### Wenn Sie weitere Probleme haben, geben Sie bitte das Protokoll von der Debugging-Konsole Ihres Browsers und Screenshots der fehlerhaften Zeile an:
* Starten Sie iQonrol mit der geöffneten Debugging-Konsole Ihres Browsers (meistens müssen Sie <kbd>F12</kbd> drücken, um es zu öffnen).
* Wechseln Sie zum Konsolenfenster und reproduzieren Sie den Fehler
* Suchen Sie im Konsolenfenster nach Nachrichten
* Wenn Fehler auftreten, wird die Nummer der Zeile aufgelistet, die den Fehler verursacht hat
* Bitte klicken Sie auf diese Zeilennummer und machen Sie einen Screenshot der fehlerhaften Zeile:

![Fehlerbehebung im Konsolenfenster](img/troubleshooting_consolewindow.png) ![Fehlerbehebung bei fehlerhafter Leitung](../../../en/adapterref/iobroker.iqontrol/img/troubleshooting_faultyline.png)

****

## Changelog

### 1.2.0 (2020-28-29)
* (sbormann) Introducing different tile sizes, they can be configured in options for active and inactive state.
* (sbormann) Added BACKGROUND_URL and BACKGROUND_HTML as universal states to all devices, to display webpages as background of tiles (for FLOT, weather, security-cameras,...).
* (sbormann) Again better animations for shuffle.js.
* (sbormann) Reordered remote control sections.

### 1.1.15 (2020-08-27)
* (sbormann) Bugfixed shuffle.js (better animations, fixed hideIfInactive-Option).

### 1.1.14 (2020-08-24)
* (sbormann) Made HTML/URL-iFrame resizable (can be turned off by option).
* (sbormann) Bugfixing remote control.
* (sbormann) Added option to configure conditions for active battery-empty-icon.
* (sbormann) Dialog is now repositioned and bigger when phone is rotated to horizontal view.
* (sbormann) Breaking Change: Using now shuffle.js to reposition the tiles after resizig or orientation change. For now its only a nice effect, but this opens possibilities for future development with different tile-sizes.

### 1.1.13 (2020-08-23)
* (sbormann) Added option to remote to show vol and ch +/- inside pad.
* (sbormann) Fixed calculation of blind level.
* (sbormann) Fixed opening of external links.

### 1.1.12 (2020-08-21)
* (sbormann) Prevented selection of elements on long click for actual iOS version.
* (sbormann) Bugfixed tile active conditions for media.
* (sbormann) Renamed Media-Player to Media-Player / Remote-Control.
* (bluefox) The compatibility to socket.io 3.0.13 provided
* (sbormann) Prevented accidentally sorting of tables when clicking buttons.

### 1.1.11 (2020-08-21)
* (sbormann) Added option to define explicit conditions for a tile to be active.
* (sbormann) Added wrench icon to edit array dialog.

### 1.1.10 (2020-08-20)
* (sbormann) Added universal remote control including a track-pad to media-device.
* (sbormann) Device-Options are now sorted in categories.
* (sbormann) Collapsibles like additional informations are animated now.
* (sbormann) Added option for the device button to change the caption of the button in the dialog.
* (sbormann) Added option to open URL in new window instead of box inside dialog.
* (sbormann) Made toggeling of a state more fault tolerant if the type is not set correctly (iQontrol presumes now, it is a switch).

### 1.1.9 (2020-08-14)
* (sbormann) Enhanced popup with the ability to add buttons and confirmation messages.
* (sbormann) Fixed crash on some toolbar specifications.

### 1.1.8 (2020-08-02)
* (sbormann) Enhanced rendering of colour-lights with alternative colorspace.
* (sbormann) Added rounded corners to iframe.
* (sbormann) Added sans-serif as standard font-family to iframe (may overwrite your settings - you can overwrite this by marking your own font-family css with '!important').
* (sbormann) Added sentry plugin.

### 1.1.7 (2020-07-28)
* (sbormann) Improved long press and forced touch handling.
* (sbormann) Added URL-Parameters returnAfterTimeDestiationView and returnAfterTimeTreshold.

### 1.1.6 (2020-07-24)
* (sbormann) Added some roles to recognize water and fire sensors more reliable.
* (sbormann) Added a block to blockly to send popup messages to iQontrol.
* (sbormann) Set option "Always use time instead of pressure" as standard - if you want to use ForcedTouch, disable this option.
* (sbormann) Updated some dependencies.

### 1.1.5 (2020-07-05)
* (sbormann) Made dialog movable by dragging title.
* (sbormann) Added LEVEL to fan.
* (sbormann) Fixed flickering of SVG-Background change on some devices.

### 1.1.4 (2020-07-03)
* (sbormann) Changed the way popup-iframes are created to allow execution of code inside them.
* (sbormann) Added the possibility to chose progressbars as icons and background-images for devices.
* (sbormann) Added progress-circle of remaining display-time to popup.

### 1.1.3 (2020-06-28)
* (sbormann) Added popup messagen (toast-messagen).
* (sbormann) Enhanced scenes to be able to toggle (added option to always send true, if you need the old behaviour).

### 1.1.2 (2020-06-21)
* (sbormann) Compatibility enhancements for repeat function of Media-Player.
* (sbormann) Made value-list and target-value-list sortable.
* (sbormann) Made sortable lists only draggable in y-axis.
* (sbormann) Added option to enter own value for value-lists.
* (sbormann) Added PLAY_EVERYWHERE to Media-Player.

### 1.1.1 (2020-06-16)
* (sbormann) Some fixes, styling and enhancements for Media-Player.
* (sbormann) Added option to hide play, pause and stop icon for Media-Player.
* (sbormann) Added function repeat one to Media-Player.
* (sbormann) Maquee is only restarting, if the value of a state has really changed.
* (sbormann) Fixed crash when some ids of linked views were missing.
* (sbormann) Added targetValues to custom configuration, wich allows to send changes of a state to different target-datapoints.

### 1.1.0 (2020-06-13)
* (sbormann) Added Media-Player.

### 1.0.1 (2020-06-10)
* (sbormann) Fixed month for timestamps.
* (sbormann) You can now chose if values are linked states or constants.
* (sbormann) Added the ability to use variables in device-names.

### 1.0.0 (2020-06-01)
* (sbormann) Added a few captions to admin.
* (sbormann) Prevent pressure menu when scrolling and after opening menu.
* (sbormann) Corrected a few translations.

<details>
<summary>Older Changelog:</summary>

### 0.4.1 (2020-05-15)
* (sbormann) Added icons for toplight and tilted to window and enhanced window to recognize tilted position.
* (sbormann) Fixed crash when using some thermostats.
* (sbormann) New gulpfile and fixed translations.
* (sbormann) Further improvement of connection speed.
* (sbormann) Disabled context-menu on long/right-click.
* (sbormann) Revised pressure/forced touch and added option to always use time instead of pressure.

### 0.4.0 (2020-05-13)
* (sbormann) Major change using socket.io without conn.js wich leads to a much faster initial connection.
* (sbormann) Improved loading and scrolling for popups.

### 0.3.7 (2020-05-06)
* (sbormann) Added more options to timestamp.

### 0.3.6 (2020-05-05)
* (sbormann) Added failback to variables
* (sbormann) Added option to add timestamp to state

### 0.3.5 (2020-04-26)
* (sbormann) Added variables to icons and backgroundimages (see readme)
* (sbormann) It is now possible to remove toolbar (the first view is then the home view)

### 0.3.3 (2020-04-19)
* (sbormann) Fixed device readonly for toggle state.
* (Sebastian Boramnn) Fixed devices with same name.
* (sbormann) Removed some old code from version <0.3.0.

### 0.3.2 (2020-04-19)
* (sbormann) Fixed loading toolbar with no entries on linked view.
* (sbormann) Fixed views with quotes in name.
* (sbormann) Fixed Flood-Sensor.

### 0.3.1 (2020-04-16)
* (sbormann) Breaking change: The complete configuration is no longer stored in ioBroker channels and states, but is fetched as one complete object, thus saving the configuration is much much faster than before.
* (sbormann) Views, devices and toolbar entries are now sortable via drag- and drop in the configuration dialog.
* (sbormann) After saving the configuration the instance ist now yellow until the configuration is completely written.
* (sbormann) Added invert UNREACH to device options.
* (sbormann) Added Flood-Sensor.
* (sbormann) Enhanced autocreation-feature by using ioBroker-Type-Detector by bluefox.
* (sbormann) Enhanced hue-lights when using alternative colorspace without white-values and changing ct.
* (sbormann) Enhanced hue-lights when using alternative colorspace to keep uppercase if needed.

### 0.2.20 (2020-04-08)
* (sbormann) If value for POWER is greater than 100, it is rounded without decimal places.
* (sbormann) Bugfixed invert-function with custom min and max.
* (sbormann) Added reload-link to loading page.
* (sbormann) Updated dependencies.

### 0.2.19 (2020-02-29)
* (sbormann) Updated dependencies.

### 0.2.18 (2020-02-29)
* (sbormann) Updated dependencies.

### 0.2.17 (2020-02-29)
* (sbormann) Added option to open dialog by clicking on tile for View, Window, Door, Fire, Temperatur, Humidity, Brightness and Motion.
* (sbormann) Added option to hide device, if it is inactive (handle with care, as you may not be able to switch it on again).

### 0.2.16 (2020-01-14)
* (sbormann) Fixed custom step for heating control.
* (sbormann) Fixed universal popup wich was displayed, even when empty.

### 0.2.15 (2020-01-07)
* (sbormann) Added svg as possible image to upload.
* (sbormann) Made URL and HTML universal for nearly all devices, to display custom html code or content of an url inside the dialog (this could be used e.g. to display FLOT-graphs related to the device inside the dialog).
* (sbormann) Fixed disabled custom values with admin 3.7.6+ and js-controller <2.2.

### 0.2.14 (2019-11-12)
* (sbormann) Fixed icon-switching for thermostats.

### 0.2.13 (2019-10-23)
* (sbormann) Improved the return after time method.
* (Bluefox) Fixed translations in custom-dialog.

### 0.2.12 (2019-10-12)
* (sbormann) Improvement of homematic-thermostat for controler 2.0 compatiility.

### 0.2.11 (2019-10-07)
* (sbormann) Rewritten pincode-section to work with older browsers.
* (sbormann) Pincode now works for buttons as well.
* (sbormann) Modified the return after time function to work with older browsers.
* (sbormann) Fixed missing entrys in long pressure menus in iOS 13.

### 0.2.10 (2019-10-05)
* (Sebatian Bormann) Enhanced PIN-Code to view a num-pad when using an alphanumeric PIN.

### 0.2.9 (2019-10-02)
* (sbormann) Added optional PIN-Code to custom datapoint-configuration dialog (wrench icon).
* (sbormann) Added option to return to a view after a settable time of inactivity to settings.

### 0.2.8 (2019-09-27)
* (sbormann) Further improvement of index.js for controller 2.0 compatibility.

### 0.2.7 (2019-09-27)
* (sbormann) Fixed popup_width and popup_height.
* (sbormann) Further improvement of main.js and index.js for controller 2.0 compatibility.
* (sbormann) Added option showState for Button and Program.

### 0.2.6 (2019-09-24)
* (sbormann) Processing the plain text of values is now done after rounding a number value.
* (sbormann) Removed Icon_on for Button.
* (sbormann) Modified main.js for controler 2.0 compatibility.

### 0.2.5 (2019-09-22)
* (sbormann) Adjusted handling of pressure menu for iOS 13.
* (sbormann) Added Buffer for rendering a view while pressureMenue is beeing created.
* (sbormann) Added POWER and VOLTAGE to battery.

### 0.2.4 (2019-09-15)
* (sbormann) Further enhancement of control-mode handling for homematic-thermostat.
* (sbormann) Minor bugfixes.

### 0.2.3 (2019-09-15)
* (sbormann) Further enhancement of control-mode handling for homematic-thermostat.
* (sbormann) Added handling of alternative states-property-syntax.

### 0.2.2 (2019-09-14)
* (sbormann) Enhanced handling of control-mode for homematic-thermostat for more compatibility.
* (sbormann) Reduced rate of sending when moving slider for blinds and thermostats. 

### 0.2.1 (2019-09-07)
* (sbormann) Fixed crash of Backend (interchanged index_m.html and custom_m.html).

### 0.2.0 (2019-09-06)
* (sbormann) Added slats level to blind.

### 0.1.15 (2019-09-05)
* (sbormann) Added step to custom dialog, wich allowes to define the resolution of value-sliders.
* (sbormann) Values with unit % and a range from min to max of 0-1 are now scaled to 0-100.
* (sbormann) Fixed conversion to alternative colorspace for hue lights.

### 0.1.14 (2019-09-01)
* (sbormann) Fixed missing dropdown-menus for images after sorting or adding items to tables.
* (sbormann) Level-Sliders will have a higher resolution for datapoints with small value ranges.

### 0.1.13 (2019-08-28)
* (sbormann) Fixed crash of frontend.
* (sbormann) Security updates.

### 0.1.12 (2019-08-28)
* (sbormann) Added width and height to options for popup.
* (sbormann) Added option to define free CSS-code to modify frontend.
* (sbormann) Infotext-values are now displayed as plain text or rounded if numbers.
* (sbormann) Added 'Close dialog after execution' to device options for scenes, programs and buttons.

### 0.1.11 (2019-08-26)
* (sbormann) Bugfix for chrome opacity transition bug.
* (sbormann) Added placeholder for default values for text inputs on options page.
* (sbormann) Added placeholder for default icon and blank icon to device options.
* (sbormann) Extended thermostat CONTROL_MODE by type switch.
* (sbormann) Fixed crash when using thermostat with setpoint an non homematic-devices.
* (sbormann) Added min and max to custom dialog.
* (sbormann) Now you can set none as a devices background image for active devices (formerly this was copied from inactive devices for backward-compatibility-reasons).
 
### 0.1.10 (2019-08-20)
* (sbormann) You can now define different units if value is zero or if value is one in custom dialog.
* (sbormann) When changing an image via the new drop-down, save button will be activated now.
* (Sebastian Boramnn) Added option, to remove overlay of tile, if device is active or inactive.
* (sbormann) Enhanced conversion function when converting booelan to number.
* (sbormann) Fixed renaming of image files (links to used images are now also correctly renamed).
* (sbormann) Fixed handling of spaces in image filenames.

### 0.1.9 (2019-08-18)
* (sbormann) Modified cache manifest to remove EISDIR-errors from log.
* (sbormann) Fixed toggle-entry in pressure menu.
* (sbormann) Added multiple file upload to images tab.
* (sbormann) Added check for dead links to other views when saving settings.
* (sbormann) You can now assign external urls to background images and icons (for example to add a weather-live-map).
* (sbormann) Removed options clickOnIconOpensDialog and clickOnTileToggles for Values and Programs as they are not switchable.
* (sbormann) Added OFF_SET_VALUE and the option 'Return to OFF_SET_VALUE after [ms]' to button.

### 0.1.8 (2019-08-11)
* (sbormann) Further improvements on connecting over iobroker.pro.
* (sbormann) COLOR_BRIGHTNESS and WHITE_BRIGHTNESS are now displayed, if LEVEL is not defined on hue lights.
* (sbormann) Added thumbnail-previews of fonts.
* (sbormann) Added clickOnIconOpensDialog and clickOnTileToggles to device options.

### 0.1.7 (2019-08-11)
* (sbormann) Added font-family, -size, -weight and -style to options for toolbar, headers, device-name, device-state and device-info-text.
* (sbormann) Added icon-size, icon-background-size and icon-background-corner-size to options for toolbar.

### 0.1.6 (2019-08-08)
* (sbormann) Next try to connect via iobroker.pro

### 0.1.5 (2019-08-06)
* (sbormann) Added validation to options.
* (sbormann) Extended alarm with CONTROL_MODE-datapoint and icons for disarmed, armed and triggered. 
* (sbormann) To save memory, only used states are saved in local memory (before all used AND all updated states were saved).
* (sbormann) Optimized socket-connectionLink to try to connect via iobroker.pro.

### 0.1.4 (2019-08-04)
* (sbormann) Optimized fading of tiles.
* (sbormann) Added toggle-button to blind, if no up/down button is defined.
* (sbormann) Added detection of protocol for socket in admin.
* (sbormann) Added confirm-flag inside custom datapoint configuration dialog to enable asking user to confirm before changing values.
* (sbormann) Added toggle-button to garage door.

### 0.1.3 (2019-08-01)
* (sbormann) Added seperate background image for active devices.
* (sbormann) Fixed background-options (color and opacity) for active and inactive device tiles.
* (sbormann) Added more space to views bottom.
* (sbormann) Fixed invert level for blinds.
* (sbormann) Organized options in collapsible layout.

### 0.1.2 (2019-07-29)
* (sbormann) Added FAVORITE_POSITION (with configurable button caption) and SET_VALUE for UP, DOWN and FAVORITE_POSITION to Blinds.
* (sbormann) Added 'No Icon' as option to icon configuration.
* (sbormann) Addes icon to 'Link to other view'.
* (sbormann) Added a bunch of new standard-icons.

### 0.1.1 (2019-07-28)
* (sbormann) Added usericons.

### 0.1.0 **stable** (2019-07-27)
* (sbormann) First stable release.
* (sbormann) Added show timestamp to device options to chose default behaviour and a small timestamp-icon in the dialog to show and hide timestamps.
* (sbormann) Fixed readonly handling of control mode for Homematic Thermostats.

### 0.0.49 (2019-07-27)
* (sbormann) Added common type and common role to custom dialog.
* (sbormann) Added pressure menu for toolbar.

### 0.0.48 (2019-07-25)
* (sbormann) Datapoint BATTERY can now be a level - the battery-empty-icon will be shown if value is less than 10%.
* (sbormann) Added additional colorspaces for hue lights (RGB, RGBW, RGBWWCW, RGBCWWW, Milight-Hue, RGB Hue Only).
* (sbormann) Added Garage Door.

### 0.0.47 (2019-07-22)
* (sbormann) Added targetValueId inside custom datapoint configuration dialog wich allowes to have different datapoints vor actual value and for target value.
* (sbormann) Added invert-flag inside custom datapoint configuration dialog.

### 0.0.46 (2019-07-20)
* (sbormann) Added options to device configuration dialog.
* (sbormann) Added readonly-flag to device options.
* (sbormann) Added invert color temperature flag to device options for lights.
* (sbormann) Added invert flag to device options for blinds.

### 0.0.45 (2019-07-15)
* (sbormann) Devices are now zoomed to fit screen (configurable under options).

### 0.0.44
* (sbormann) Fixed incomplete loading of admin page with some settings.
* (sbormann) Added datapoint-configuration via custom-dialog.

### 0.0.43
* (sbormann) Changed initialization of socket.io to an asynchronous process to wait for connection before trying to use file-operations.
* (sbormann) Added general datapoint ADDITIONAL_INFO to display additional datapoints at the bottom of the info-dialog.
* (sbormann) Fixed value list type conflict.

### 0.0.42
* (sbormann) Adjusted pathes of demo-files.

### 0.0.41
* (sbormann) Major Change: The location of the uploaded userimages has changed, so the images can be accessed by backup-function of iobroker - the images will be moved to the new location automatically - please open admin-page for ALL instances and save the settings to adjust the filenames of used images automatically.
* (sbormann) Inverted colortemperature-scale for hue-lights (now it uses the mired-scale = micro reciprocal degree-scale instead of kelvin).
* (Ansgar Schulte) Added Up and Down Buttons to Blinds.
* (sbormann) When creating a directory it will be entered.
* (sbormann) Added Effect-Section to Light
* (sbormann) If a state is not set yet, a standard value will be used

### 0.0.40
* (sbormann) Appended missing conn.js in admin-folder.

### 0.0.39
* (sbormann) Now file-operations in admin should work (file and directory renaming and deleting).
* (sbormann) Added Image-Popup in admin.
* (sbormann) Renamed demo-images.

### 0.0.38
* (sbormann) Again changes to forced touch for gained compatibility.

### 0.0.37
* (sbormann) Some more little changes to forced touch.
* (sbormann) Added option to open a view via url by adding 'home=<viewId>' to url-parameters.

### 0.0.36
* (sbormann) Added compatibility for some android devices to forced touch.
* (sbormann) Changed the way hue and ct is displayed for better compatibility to some devices.

### 0.0.35
* (sbormann) Fixed crash of frontend, if a device has no role and added info to admin to chose a role.
* (sbormann) Removed filtering of states in select-id-dialog for autocreate.
* (sbormann) Further improvments of forced touch with force-indicator and hopefully a better compatibility with more devices.

### 0.0.34
* (sbormann) Added forced touch menu (press hard or press long on unsupported devices), wich will give more room for extended features in future.
* (sbormann) Linked Views can now be set for all roles and are available in the dialog and by a forced touch.
* (sbormann) Added timestamp for Window, Door, Fire, Temperature, Humidity, Brightness and Motion.
* (sbormann) Fixed issure 49 (state for role switch if type is number).

### 0.0.33
* (sbormann) Added WINDOW_OPENING_REPORTING to thermostat and homematic-thermostat.
* (sbormann) Fixed marquee not always starting correctly.

### 0.0.32
* (sbormann) Added Battery.
* (sbormann) Heaters are displayed as inactive, if set-value is at its minimum.
* (sbormann) Added meta.user object to allow backup of user uploaded files via iobroker backup.
* (sbormann) Added check for existance of common.role before rendering view.

### 0.0.31
* (sbormann) Fixed some typos.
* (sbormann) Enhanced colour-mixing of light with seperate brightness-datapoints for color and white.
* (sbormann) Rewritten rendering of view as praparation for further enhancements.
* (sbormann) Rewritten rendering of dialog as praparation for further enhancements.
* (sbormann) Added option to colorize Device-Texts.

### 0.0.30
* (sbormann) Fixed io-package.json

### 0.0.29
* (sbormann) changed parts of the code to be backward-compatible to older browsers like ie 11.
* (sbormann) Now its possible to define a value list for a data point under .native.states wich will have a greater priority than a value list under .common.states. 
* (sbormann) Updated dependency for axios to 0.0.19 to fix a scurity issue.

### 0.0.28
* (sbormann) Added datapoint POWER to switch, fan and light.
* (sbormann) Fixed marquee for small info texts in the upper right corner at big screen sizes.
* (sbormann) Added more options for configuring header-colors and device-colors (experimental state). Text-color ist not configurable yet.

### 0.0.27
* (sbormann) Added marquee (scrolling text) for long states and device names (can be configured  in options). 
* (sbormann) Added more toolbar-options. 
* (sbormann) Enhanced handling of value lists. 
* (sbormann) Disabled swiping when dialog is opened.

### 0.0.26
* (sbormann) Added brightness to motion-sensor.
* (sbormann) Added options tab. You can now configure colors of toolbar.
* (sbormann) Fixed rendering of constants.
* (sbormann) Resized the demo-wallpapers for faster loading.

### 0.0.25
* (sbormann) Added motion-sensor.
* (sbormann) Added description, how the frontend works: [Operating Principle of Frontend](Operating%20Principle%20of%20Frontend.md).
* (sbormann) Added dialog for editing constants like SET_VALUE, URL or HTML.
* (sbormann) Changed the way arrays are stored.
* (sbormann) Added submit-button for values of type string.
* (sbormann) Added saturation to hue-lights.
* (sbormann) Better icons for color-temperature and brightness-sensor.

### 0.0.24
* (sbormann) Fixed jittering on Safari while scrolling (was related to Pull2Refresh).
* (sbormann) System language of iobroker will be loaded and used.

### 0.0.23
* (sbormann) Rewrote how constant values (instead of linkedStates) are handeled - this is a requirement for further development.
* (sbormann) Fixed Pull2Refresh on android devices / chrome.
* (sbormann) Added external links
* (sbormann) Added popups with iframes

### 0.0.22
* (watcherkb) Improved german translation.
* (BramTown) Improved german translation.
* (sbormann) Short after another coming reconnect-events (<5s) are ignored now.

### 0.0.21
* (sbormann) Added Pull2Refresh on mobile devices - reloads whole page when pulling down on homepage, otherwise only the acual view is reloaded.
* (sbormann) Improved reloading on reconnect (hoepefully to get it finally good working on iOS 12.2).

### 0.0.20
* (sbormann) New trial to get it working in iOS 12.2.

### 0.0.19
* (sbormann) Improved reloading of page in new PWA-Mode of iOS 12.2.

### 0.0.18
* (sbormann) Improved fetching of VALVE_STATES.
* (sbormann) Changed Button Icon.
* (sbormann) Added Loading-Spinner if disconnected.
* (sbormann) Due to new iOS 12.2 PWA-Mode added visibility-check and connectivity-check.
* (sbormann) Added role-icons to role-selectbox in edit device dialog.
* (sbormann) Fixed missing value-list for states of the type string.

### 0.0.17
* (sbormann) Changed description of slider (level/dimmer/value/height).

### 0.0.16
* (sbormann) Role of device is displayed in devices-table.
* (sbormann) VALVE_STATES is now editable via GUI (show opening of valves associated with a thermostat in percentage).
* (sbormann) Added Role 'Button': You can define a constant SET_VALUE wich will be written to the ID that is linked with STATE if the button is pressed.
* (sbormann) Rewritten parts of front-end to guarentee better compatibility. Boost-Mode for Homematic-Thermostat should work now.
* (sbormann) Added state BOOST_STATE for Homematic-Thermostat - ability to display remaining boost-time if in boost-mode.
* (sbormann) Added dessription of roles and corresponding states.
* (sbormann) Temperature und Humidity-Sensors can now display a STATE at bottom of device, and both, TEMPERATURE and HUMIDITY, in small in the upper right corner.
* (sbormann) Better handling of Auto-Create of Temperature- und Humidity-Sensors.
* (sbormann) German translation: 'geöffnet' lower case.
* (sbormann) Zigbee humidity and temperature added to auto-creation.
* (sbormann) Fixed not scrollable selectbox at devices tab.

### 0.0.15
* (sbormann) Improved check for value type of states.
* (sbormann) Improved slider-tooltip to lower font-size at large numbers.

### 0.0 14
* (sbormann) If role of state is not further specified, then check for role of parent object.

### 0.0.13
* (sbormann) Doors and Windows now force true/false to be translated to opened/closed.
* (sbormann) Double Entrys on WelcomeScreen/Overview removed.
* (sbormann) States are now set with the correct value type.
* (sbormann) Changed recognition of state types. I hope there are no new bugs now!

### 0.0.12
* (sbormann) Check for unallowed chars in object names.
* (sbormann) Check for duplicates in view names.
* (sbormann) Level fires a slider in dialog - even when it has a state list (HUE again :)).
* (sbormann) Added Blinds (Homematic) - please test it, i don't have one to test.

### 0.0.11
* (sbormann) Added compatibility for edge and firefox. 
* (sbormann) Again Hue bugfixes.
* (sbormann) Removed Tooltip from Toolbar.

### 0.0.10
* (sbormann) Added ColorTemperature. Hoepfully HUE works now? Can't test ist, because i do not own any hue lamp :)

### 0.0.9
* (sbormann) Philips HUE added to autocreate (colortemp is not working yet!).  
* (sbormann) LinkedView now also works on windows, doors and fire-sensor.
* (sbormann) Added translation (thanks ldittmar!).

### 0.0.8
* (sbormann) Added icons to image selectboxes.

### 0.0.7
* (sbormann) Changed order of tabs
* (sbormann) Autocreate for shelly should work now (i hope so, can't test it here)

### 0.0.6
* (sbormann) Improved speed of select id and autocreate
* (sbormann) Set filter to channel on autocreate

### 0.0.5
* (sbormann) Bugfix: creation of many devices schould work now

### 0.0.4
* (sbormann) Bugfix: copy device created just a reference to old object
* (sbormann) Addes Toolbar-Icons

### 0.0.3
* (sbormann) various bugfixes

### 0.0.2
* (sbormann) first partly running version

### 0.0.1
* (sbormann) initial release

</details>

## License
MIT License

Copyright (c) 2020 Sebastian Bormann

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