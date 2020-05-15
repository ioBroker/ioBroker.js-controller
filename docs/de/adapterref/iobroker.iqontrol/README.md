---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iqontrol/README.md
title: ioBroker.iqontrol
hash: QUjp5YLMUtcL+gll2EKmMeOYyzACrE+UZ9Fi8WWbHxk=
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

![Beispiel](img/screenshot4.jpg) ![Beispiel](../../../en/adapterref/iobroker.iqontrol/img/screenshot3.jpg)

Läuft in jedem Browser.
Es ist vollständig anpassbar.

## Zum Startbildschirm hinzufügen
Sie können es als Web-App auf Homescreen speichern und es sieht aus und fühlt sich an wie eine native App: ![Zu Homescreeen hinzufügen](../../../en/adapterref/iobroker.iqontrol/img/add_to_homescreen.png)

## Du brauchst...
* Knoten 10 oder höher
* Web-Adapter mit einer Instanz, auf der dasselbe Protokoll (http oder https) wie der Admin-Adapter ausgeführt wird. Socket.IO ist auf "integriert" und "Web-Sockets erzwingen" deaktiviert
    * Wenn dies im Widerspruch zu anderen Adaptern steht, fügen Sie einfach eine weitere Instanz mit den oben genannten Einstellungen hinzu - iQontrol durchsucht die am besten passende Webadapter-Instanz und verwendet sie für die Kommunikation
* Für die Verbindung über *iobroker.pro-Cloud* sollten sowohl der Administrator- als auch der Webadapter auf http (nicht https) eingestellt sein.

## Fehlerbehebung
* Stellen Sie sicher, dass Sie den Abschnitt "Sie brauchen ..." oben auf dieser Seite erfüllt haben
* Wenn nach dem Update etwas nicht wie erwartet funktioniert, führen Sie die folgenden Schritte aus:
    * Starten Sie den Upload des Adapters:

    \
        ![Hochladen](../../../en/adapterref/iobroker.iqontrol/img/adapter_upload.png)

* Browser-Cache löschen
* Starten Sie ioBroker neu
* Starten Sie iQonrol mit der geöffneten Debugging-Konsole Ihres Browsers (meistens müssen Sie F12 drücken, um sie zu öffnen) und suchen Sie im Konsolenfenster nach Nachrichten

## Forum
Besuchen Sie [iobroker Forum](https://forum.iobroker.net/topic/22039/neuer-adapter-visualisierung-iqontrol).

## Wie benutzt man
* Erstellen Sie Ansichten.

Sie können Ansichten als eine Art Seite betrachten.

* Erstellen Sie dann Geräte in diesen Ansichten.

Geräte haben eine Rolle, die die Funktion des Geräts bestimmt, welche Symbole verwendet werden und so weiter.
Abhängig von dieser Rolle können Sie mehrere Status mit dem Gerät verknüpfen. Diese geben dem Gerät seine Funktionalität.
Wenn Sie als Rolle "Mit anderer Ansicht verknüpfen" auswählen, können Sie Links zu anderen Ansichten erstellen. Ich schlage vor, Links zu anderen Ansichten mit demselben Hintergrund zu häuten, den die verknüpfte Ansicht hat.
Sie können auch versuchen, mit der Autocreate-Funktion ein vorhandenes Gerät aus dem iobroker-Objektbaum auszuwählen. Autocreate versucht, die Rolle herauszufinden und so viele Zustände wie möglich zuzuordnen.

* Anschließend können Sie eine Symbolleiste erstellen, die als Fußzeile angezeigt wird.

Symbolleisteneinträge sind Links zu Ansichten.
Der erste Symbolleisteneintrag ist Ihre 'Home-View', die beim Start geladen wird.

* Um alles zu einem ausgefallenen Stil zu machen, können Sie Ihre eigenen Bilder hochladen.

Sie können Ihre Bilder als Hintergrundbilder für Ansichten oder für Geräte verwenden.
Bilder im Ordner '/ usericons' können als Symbole für Geräte verwendet werden.
Die kostenlosen Demo-Hintergrundbilder stammen von www.pexels.com.

## URL-Parameter
* Das Frontend wird über `` http [s]: // <URL oder IP von iobroker>: <Port des Webadapters> / iqontrol / index.html`` aufgerufen
    * `` <Port des Webadapters> `` ist normalerweise 8082
* Um eine angegebene Instanz zu öffnen, können Sie `` namespace = iqontrol. <Instanznummer> `` als URL-Parameter hinzufügen
* Um eine angegebene Ansicht als Homepage zu öffnen, können Sie `` home = <viewID> `` als URL-Parameter hinzufügen

**Beispiel:**

* `` https://192.168.1.1: 8082 / iqontrol / index.html? namespace = iqontrol.1 & home = iqontrol.1.Views.Living-Room``
    * Groß- und Kleinschreibung beachten

## Beschreibung der Rollen und zugehörigen Zustände
Jedes Gerät hat eine Rolle, die die Funktion des Geräts definiert. Jede Rolle generiert eine Reihe von Status, die mit einem entsprechenden Io-Broker-Status verknüpft werden können.
Wenn Sie die Auto-Create-Funktion verwenden, können Sie ein vorhandenes Gerät aus dem Io-Broker-Objektbaum auswählen. Autocreate versucht, die Rolle herauszufinden und so viele Zustände wie möglich zuzuordnen.
Dies funktioniert nur bei bekannten Geräten. Für unbekannte Geräte und um den Geräten erweiterte Funktionen zu bieten, können Sie sie manuell über die Schaltfläche (+) - hinzufügen oder die durch automatische Erstellung erstellten Geräte bearbeiten.
Klicken Sie auf den Stift hinter dem Gerät, um die Rolle und den Status eines Geräts zu bearbeiten. Nachfolgend finden Sie eine kurze Beschreibung der Rollen und der verwendeten Zustände:

### Ändern der Datenpunktkonfiguration
Sie können die Konfiguration von Datenpunkten über das Schraubenschlüsselsymbol hinter einem Datenpunkt im Dialogfeld "Gerätekonfiguration" oder auf der Registerkarte "Objekte" von iobroker ändern. Hier kannst du:

* Readonly-Flag setzen
* Invert-Flag setzen
* Confirm-Flag setzen (zwingt den Benutzer zur Bestätigung, bevor eine Änderung in einen Datenpunkt geschrieben wird)
* PIN-Code festlegen (zwingt den Benutzer, diesen PIN-Code einzugeben, bevor eine Änderung in einen Datenpunkt geschrieben wird - aber Vorsicht: Dies ist nur von geringer Sicherheit, da die PIN im Frontend überprüft wird! Verwenden Sie eine Nummer, um einen Vollbildmodus anzuzeigen -pin-pad wenn nach Code gefragt)
* Legen Sie eine Datenpunkt-ID fest, in die Zielwerte geschrieben werden (wenn Sie unterschiedliche Datenpunkte für den tatsächlichen und den Zielwert haben).
* Ändern Sie die Einheit des Datenpunkts, getrennt nach Null-, Singular- und Pluralwerten
* Ändern Sie min und max des Datenpunkts
* Ändern Sie den Datenpunkttyp
* Ändern Sie die Rolle des Datenpunkts
* Festlegen oder Ändern einer Werteliste

![CustomDialog-Aufruf](img/custom_call.png) ![CustomDialog Beispiel](../../../en/adapterref/iobroker.iqontrol/img/custom_dialog.png)

### Allgemeine Zustände:
Jede Rolle hat die folgenden drei Zustände:

* **ADDITIONAL_INFO** *array* - Ein Array von Datenpunkten, das am unteren Rand des Info-Dialogs angezeigt wird
* **BATTERIE** *Boolescher Wert* - wenn wahr oder *Zahl* - wenn weniger als 10%, wird ein kleines Symbol für leere Batterie angezeigt
* **ERROR** *boolean* - Wenn true, wird ein kleines Ausrufezeichen angezeigt
* **UNREACH** *boolean* - Wenn true, wird ein kleines WLAN-Symbol angezeigt

Fast alle Rollen haben einen STATE- und / oder einen LEVEL-Status. In den meisten Fällen stellt dies die Hauptfunktion des Geräts dar. Sie können ihm io-Broker-Zustände der folgenden Typen zuweisen:

* *boolean* - Wenn möglich, wird es in einen sinnvollen Text wie "Ein / Aus", "Geöffnet / Geschlossen" oder ähnliches übersetzt. Wenn Sie auf das Symbol einer Kachel klicken, wird versucht, den Booleschen Wert umzuschalten (z. B. um ein Licht ein- oder auszuschalten). Wenn es nicht schreibgeschützt ist, wird im Dialog ein Kippschalter generiert
* *Nummer* - wird mit der entsprechenden Einheit angezeigt und generiert einen Schieberegler im Dialog
* *string* - Ein anzuzeigender Text
* *Werteliste* - Der ausgewählte Wert wird angezeigt. Wenn es nicht schreibgeschützt ist, wird im Dialogfeld ein Dropdown-Menü generiert
  * Technisch gesehen ist eine *Werteliste* ein Wert mit einer entsprechenden Übersetzungsliste, die im Objekt 'common.custom.iqontrol. <Instanz> .states', 'native.states' oder 'common.states' des Datenpunkts definiert ist ::

````
"native": {
    "states": {"true": "Text for true", "false": "Text for false"},
    ...
}
````

    * Sie können Ihre eigene Werteliste erstellen, indem Sie den Datenpunkt ändern (Schraubenschlüsselsymbol hinter dem Datenpunkt auf der Registerkarte "Objekte" von iobroker, siehe oben).

Allerdings macht nicht jeder Typ für jede Rolle Sinn. So ist beispielsweise der ZUSTAND eines Schalters in den meisten Fällen ein Boolescher Wert, um zwischen Ein und Aus umgeschaltet werden zu können. Möglicherweise wird eine Zeichenfolge angezeigt, der Schalter ist jedoch nicht funktionsfähig.

### Link zu anderer Ansicht:
* Hat keine weiteren Zustände
* Die **Linked-View-Eigenschaft** wird direkt geöffnet

### <img src="img/icons/switch_on.png" width="32"> Schalter, <img src="img/icons/fan_on.png" width="32"> Ventilator:
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
  * **CT** * Zahl * - Farbtemperatur des Lichts, wenn es zwei Weißtöne hat
  * **WHITE_BRIGHTNESS** * number * - die Helligkeit der weißen LEDs (wenn Sie einen LEVEL-Status und keine farbigen LEDs haben, wird dies ignoriert, da die Helligkeit vollständig von LEVEL gesteuert wird)
* Alternative Farbräume:
  * **ALTERNATIVE_COLORSPACE_VALUE** * string * oder * number * (abhängig vom gewählten Farbraum) - der Wert des alternativen Farbraums

    Wenn Ihr Gerät die Verwendung von HUE, SATURATION und COLOR_BRIGHTNESS (HSB / HSV-Farbraum) nicht unterstützt, können Sie verschiedene alternative Farbräume verwenden. In den Geräteoptionen können Sie einen der folgenden Farbräume auswählen:

    * **RGB** / **# RGB** Anstelle von HUE, SATURATION und COLOR_BRIGHTNESS können Sie das RGB-Format (hex) verwenden, optional mit dem führenden '#'
    * **RGBW** / **# RGBW** Anstelle von HUE, SATURATION, COLOR_BRIGHTNESS und WHITE_BRIGHTNESS können Sie das RGBW-Format (hex) verwenden, optional mit dem führenden '#'
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
* **EFFECT_NEXT** *boolean* - Wenn true festgelegt ist, wird der nächste Effekt abgespielt (als Alternative für Geräte, die die EFFECT-Werteliste nicht unterstützen).
* **EFFECT_SPEED_UP** / **EFFECT_SPEED_DOWN** *boolean* - Wenn dieser Wert auf true gesetzt ist, wird der Effekt beschleunigt / verringert
* Sonstiges:
  * **POWER** * number * - Stromverbrauch, der in der oberen rechten Ecke klein angezeigt wird

### <img src="img/icons/radiator.png" width="32"> Thermostat:
* **SET_TEMPERATURE** *Nummer* - Zieltemperatur
* **TEMPERATUR** *Zahl* - Die tatsächliche Temperatur wird in der oberen rechten Ecke klein angezeigt
* **FEUCHTIGKEIT** *Zahl* - Die tatsächliche Luftfeuchtigkeit wird in der oberen rechten Ecke klein angezeigt
* **CONTROL_MODE** *Werteliste* - Anzeige und Einstellung des Thermostatmodus
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
  * Alternativ können Sie eine *Werteliste* zuweisen, um zusätzliche Zustände wie 'gekippt' anzuzeigen (in Fensteroptionen können Sie definieren, welche Texte für geöffnet, geschlossen und gekippt stehen, um das richtige Symbol anzuzeigen).
  * Sie können auch eine *Zeichenfolge* zuweisen, um Text wie "3 Fenster offen" oder "alles geschlossen" oder eine *Nummer* anzuzeigen.
* Respektiere die **Linked-View-Eigenschaft**

### <img src="img/icons/garagedoor_closed.png" width="32"> Garagentor:
* **STATE** *boolean* - Anzeige, ob die Tür geöffnet oder geschlossen ist
  * Alternativ können Sie eine *Werteliste* zuweisen, um zusätzliche Zustände wie 'gekippt' anzuzeigen.
  * Sie können auch eine *Zeichenfolge* zuweisen, um Text wie "3 Türen offen" oder "Alle geschlossen" anzuzeigen.
* **TOGGLE** *boolean* - Zeigt einen 'Toggle'-Button an und wird auf true gesetzt, wenn gedrückt

### <img src="img/icons/door_locked.png" width="32"> Tür mit Schloss:
* **STATE** *boolean* - Anzeige, ob die Tür geöffnet oder geschlossen ist
* **LOCK_STATE** *boolean* - Anzeige, ob die Tür verriegelt oder entriegelt ist
* **LOCK_STATE_UNCERTAIN** *boolean* - Wenn true, wird STATE in Kursivschrift angezeigt, um anzuzeigen, dass die genaue Position der Sperre unbekannt ist
* **LOCK_OPEN** *boolean* - Wenn true festgelegt ist, wird die Tür vollständig geöffnet

### <img src="img/icons/blind_middle.png" width="32"> Blind:
* **LEVEL** *number* - Höhe des Blinden in Prozent
* **RICHTUNG** *Werteliste* - kann Stop, Up und Down sein. Die Werte für Stop, Up, Down und Unknown können konfiguriert werden
* **STOP** *boolean* - wird auf true gesetzt, wenn die Stopptaste gedrückt wird
* **UP** / **DOWN** *boolean* - wird auf true gesetzt, wenn die Auf- / Ab-Taste gedrückt wird (für Geräte, die UP- und DOWN-Datenpunkte anstelle von oder zusätzlich zu LEVEL verwenden). Zusätzlich können Sie einen Wert über die Datenpunkte **UP_SET_VALUE** / **DOWN_SET_VALUE** definieren. Wenn definiert, wird dieser Wert anstelle von true gesendet, wenn die Auf- / Ab-Taste gedrückt wird
* **FAVORITE_POSITION** *boolean* - kann verwendet werden, um eine Lieblingsposition abzurufen. Wenn die Favoritentaste (Schaltflächenbeschriftung kann in den Geräteeinstellungen konfiguriert werden) gedrückt wird, wird true an diesen Datenpunkt gesendet. Zusätzlich können Sie einen Wert über den Datenpunkt **FAVORITE_POSITION_SET_VALUE** definieren. Wenn definiert, wird dieser Wert anstelle von true gesendet, wenn die Favoritentaste gedrückt wird
* **SLATS_LEVEL** *number* - Position der Lamellen in Prozent

### <img src="img/icons/fire_on.png" width="32"> Feuersensor:
* **STATE** *boolean* - Wenn true, wird der Sensor als ausgelöst angezeigt
  * Alternativ können Sie eine *Werteliste* zuweisen, um zusätzliche Zustände wie 'manipuliert' anzuzeigen.
  * Sie können auch eine *Zeichenfolge* zuweisen, um Text wie "Feuer im Obergeschoss" anzuzeigen.
* Die **Linked-View-Eigenschaft** wird direkt geöffnet

### <img src="img/icons/flood_on.png" width="32"> Hochwassersensor:
* **STATE** *boolean* - Wenn true, wird der Sensor als ausgelöst angezeigt
  * Alternativ können Sie eine *Werteliste* zuweisen, um zusätzliche Zustände wie 'manipuliert' anzuzeigen.
  * Sie können auch eine *Zeichenfolge* zuweisen, um Text wie "Flood in Upper Floor" anzuzeigen.
* Die **Linked-View-Eigenschaft** wird direkt geöffnet

### <img src="img/icons/alarm_on.png" width="32"> Alarm:
* **STATE** *boolean* - Wenn true, wird der Sensor als ausgelöst angezeigt
  * Alternativ können Sie eine *Werteliste* zuweisen, um zusätzliche Zustände wie 'manipuliert' anzuzeigen.
  * Sie können auch eine *Zeichenfolge* zuweisen, um Text wie "Feuer im Obergeschoss" anzuzeigen.
* **CONTROL_MODE** *Werteliste* - Betriebsmodus wie "Bewaffnet" und "Entwaffnet" auswählen
    * In den Geräteoptionen können Sie den Wert definieren, der deaktiviert darstellt, sodass das Symbol für die Darstellung angezeigt werden kann

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
* **STATE** *boolean* - wird angezeigt, wenn die Szene aktiv ist. Wenn true festgelegt ist, wird die Szene gestartet

### <img src="img/icons/popup.png" width="32"> Pop-up:
* **STATE** *any* - kann verwendet werden, um weitere Informationen anzuzeigen
* **URL** CONSTANT *string* - Diese URL wird als Iframe im Popup geöffnet
* **HTML** CONSTANT *string* - Dieses Markup wird im Popup angezeigt, wenn keine URL angegeben ist

### <img src="img/icons/link.png" width="32"> Externer Link:
* **STATE** *any* - kann verwendet werden, um weitere Informationen anzuzeigen
* **URL** CONSTANT *string* - Diese URL wird geöffnet

## Icons und Hintergrundbilder
* Sie können die eingebauten Bilder oder die unter der Registerkarte "Bilder" hochgeladenen Bilder oder eine beliebige kostenlose URL verwenden
* Sie können auch eine Variable in der Bild-URL verwenden. Dies kann beispielsweise für Wettervorhersagen nützlich sein. Verwenden Sie dieses Muster:
    * `` path / to / firstloaded.png | anotherpath / to / {iobrokerstate | fallback} .png``
    * Beispiel: `` ./../ iqontrol.meta / userimages / demo / Flasche.jpg | ./../ iqontrol.meta / userimages / demo / {javascript.0.myimage | whitestone} .jpg``
* Dies lädt `` ./../ iqontrol.meta / userimages / demo / Bottle.jpg``, wenn Sie die Ansicht öffnen
* Sobald der Status von "javascript.0.myimage" vom Server abgerufen wird, wird das Bild durch "./../ iqontrol.meta / userimages / demo / XXX.jpg" ersetzt, wobei " `XXX`` ist der Wert von` `javascript.0.myimage``
* Wenn `` javascript.0.myimage`` keinen Wert hat, wird der Fallback `` whitestone`` verwendet

## Entwickeln
* Sehen Sie sich [Funktionsprinzip des Frontends] an (Betriebs% 20Prinzip% 20von% 20Frontend.md)

****

## Changelog

### 0.4.1 (2020-05-15)
* (Sebastian Bormann) Added icons for toplight and tilted to window and enhanced window to recognize tilted position.
* (Sebastian Bormann) Fixed crash when using some thermostats.
* (Sebastian Bormann) New gulpfile and fixed translations.
* (Sebastian Bormann) Further improvement of connection speed.
* (Sebastian Bormann) Disabled context-menu on long/right-click.
* (Sebastian Bormann) Revised pressure/forced touch and added option to always use time instead of pressure.

### 0.4.0 (2020-05-13)
* (Sebastian Bormann) Major change using socket.io without conn.js wich leads to a much faster initial connection.
* (Sebastian Bormann) Improved loading and scrolling for popups.

### 0.3.7 (2020-05-06)
* (Sebastian Bormann) Added more options to timestamp.

### 0.3.6 (2020-05-05)
* (Sebastian Bormann) Added failback to variables
* (Sebastian Bormann) Added option to add timestamp to state

### 0.3.5 (2020-04-26)
* (Sebastian Bormann) Added variables to icons and backgroundimages (see readme)
* (Sebastian Bormann) It is now possible to remove toolbar (the first view is then the home view)

### 0.3.3 (2020-04-19)
* (Sebastian Bormann) Fixed device readonly for toggle state.
* (Sebastian Boramnn) Fixed devices with same name.
* (Sebastian Bormann) Removed some old code from version <0.3.0.

### 0.3.2 (2020-04-19)
* (Sebastian Bormann) Fixed loading toolbar with no entries on linked view.
* (Sebastian Bormann) Fixed views with quotes in name.
* (Sebastian Bormann) Fixed Flood-Sensor.

### 0.3.1 (2020-04-16)
* (Sebastian Bormann) Breaking change: The complete configuration is no longer stored in ioBroker channels and states, but is fetched as one complete object, thus saving the configuration is much much faster than before.
* (Sebastian Bormann) Views, devices and toolbar entries are now sortable via drag- and drop in the configuration dialog.
* (Sebastian Bormann) After saving the configuration the instance ist now yellow until the configuration is completely written.
* (Sebastian Bormann) Added invert UNREACH to device options.
* (Sebastian Bormann) Added Flood-Sensor.
* (Sebastian Bormann) Enhanced autocreation-feature by using ioBroker-Type-Detector by bluefox.
* (Sebastian Bormann) Enhanced hue-lights when using alternative colorspace without white-values and changing ct.
* (Sebastian Bormann) Enhanced hue-lights when using alternative colorspace to keep uppercase if needed.

### 0.2.20 (2020-04-08)
* (Sebastian Bormann) If value for POWER is greater than 100, it is rounded without decimal places.
* (Sebastian Bormann) Bugfixed invert-function with custom min and max.
* (Sebastian Bormann) Added reload-link to loading page.
* (Sebastian Bormann) Updated dependencies.

### 0.2.19 (2020-02-29)
* (Sebastian Bormann) Updated dependencies.

### 0.2.18 (2020-02-29)
* (Sebastian Bormann) Updated dependencies.

### 0.2.17 (2020-02-29)
* (Sebastian Bormann) Added option to open dialog by clicking on tile for View, Window, Door, Fire, Temperatur, Humidity, Brightness and Motion.
* (Sebastian Bormann) Added option to hide device, if it is inactive (handle with care, as you may not be able to switch it on again).

### 0.2.16 (2020-01-14)
* (Sebastian Bormann) Fixed custom step for heating control.
* (Sebastian Bormann) Fixed universal popup wich was displayed, even when empty.

### 0.2.15 (2020-01-07)
* (Sebastian Bormann) Added svg as possible image to upload.
* (Sebastian Bormann) Made URL and HTML universal for nearly all devices, to display custom html code or content of an url inside the dialog (this could be used e.g. to display FLOT-graphs related to the device inside the dialog).
* (Sebastian Bormann) Fixed disabled custom values with admin 3.7.6+ and js-controller <2.2.

### 0.2.14 (2019-11-12)
* (Sebastian Bormann) Fixed icon-switching for thermostats.

### 0.2.13 (2019-10-23)
* (Sebastian Bormann) Improved the return after time method.
* (Bluefox) Fixed translations in custom-dialog.

### 0.2.12 (2019-10-12)
* (Sebastian Bormann) Improvement of homematic-thermostat for controler 2.0 compatiility.

### 0.2.11 (2019-10-07)
* (Sebastian Bormann) Rewritten pincode-section to work with older browsers.
* (Sebastian Bormann) Pincode now works for buttons as well.
* (Sebastian Bormann) Modified the return after time function to work with older browsers.
* (Sebastian Bormann) Fixed missing entrys in long pressure menus in iOS 13.

### 0.2.10 (2019-10-05)
* (Sebatian Bormann) Enhanced PIN-Code to view a num-pad when using an alphanumeric PIN.

### 0.2.9 (2019-10-02)
* (Sebastian Bormann) Added optional PIN-Code to custom datapoint-configuration dialog (wrench icon).
* (Sebastian Bormann) Added option to return to a view after a settable time of inactivity to settings.

### 0.2.8 (2019-09-27)
* (Sebastian Bormann) Further improvement of index.js for controller 2.0 compatibility.

### 0.2.7 (2019-09-27)
* (Sebastian Bormann) Fixed popup_width and popup_height.
* (Sebastian Bormann) Further improvement of main.js and index.js for controller 2.0 compatibility.
* (Sebastian Bormann) Added option showState for Button and Program.

### 0.2.6 (2019-09-24)
* (Sebastian Bormann) Processing the plain text of values is now done after rounding a number value.
* (Sebastian Bormann) Removed Icon_on for Button.
* (Sebastian Bormann) Modified main.js for controler 2.0 compatibility.

### 0.2.5 (2019-09-22)
* (Sebastian Bormann) Adjusted handling of pressure menu for iOS 13.
* (Sebastian Bormann) Added Buffer for rendering a view while pressureMenue is beeing created.
* (Sebastian Bormann) Added POWER and VOLTAGE to battery.

### 0.2.4 (2019-09-15)
* (Sebastian Bormann) Further enhancement of control-mode handling for homematic-thermostat.
* (Sebastian Bormann) Minor bugfixes.

### 0.2.3 (2019-09-15)
* (Sebastian Bormann) Further enhancement of control-mode handling for homematic-thermostat.
* (Sebastian Bormann) Added handling of alternative states-property-syntax.

### 0.2.2 (2019-09-14)
* (Sebastian Bormann) Enhanced handling of control-mode for homematic-thermostat for more compatibility.
* (Sebastian Bormann) Reduced rate of sending when moving slider for blinds and thermostats. 

### 0.2.1 (2019-09-07)
* (Sebastian Bormann) Fixed crash of Backend (interchanged index_m.html and custom_m.html).

### 0.2.0 (2019-09-06)
* (Sebastian Bormann) Added slats level to blind.

### 0.1.15 (2019-09-05)
* (Sebastian Bormann) Added step to custom dialog, wich allowes to define the resolution of value-sliders.
* (Sebastian Bormann) Values with unit % and a range from min to max of 0-1 are now scaled to 0-100.
* (Sebastian Bormann) Fixed conversion to alternative colorspace for hue lights.

### 0.1.14 (2019-09-01)
* (Sebastian Bormann) Fixed missing dropdown-menus for images after sorting or adding items to tables.
* (Sebastian Bormann) Level-Sliders will have a higher resolution for datapoints with small value ranges.

### 0.1.13 (2019-08-28)
* (Sebastian Bormann) Fixed crash of frontend.
* (Sebastian Bormann) Security updates.

### 0.1.12 (2019-08-28)
* (Sebastian Bormann) Added width and height to options for popup.
* (Sebastian Bormann) Added option to define free CSS-code to modify frontend.
* (Sebastian Bormann) Infotext-values are now displayed as plain text or rounded if numbers.
* (Sebastian Bormann) Added 'Close dialog after execution' to device options for scenes, programs and buttons.

### 0.1.11 (2019-08-26)
* (Sebastian Bormann) Bugfix for chrome opacity transition bug.
* (Sebastian Bormann) Added placeholder for default values for text inputs on options page.
* (Sebastian Bormann) Added placeholder for default icon and blank icon to device options.
* (Sebastian Bormann) Extended thermostat CONTROL_MODE by type switch.
* (Sebastian Bormann) Fixed crash when using thermostat with setpoint an non homematic-devices.
* (Sebastian Bormann) Added min and max to custom dialog.
* (Sebastian Bormann) Now you can set none as a devices background image for active devices (formerly this was copied from inactive devices for backward-compatibility-reasons).
 
### 0.1.10 (2019-08-20)
* (Sebastian Bormann) You can now define different units if value is zero or if value is one in custom dialog.
* (Sebastian Bormann) When changing an image via the new drop-down, save button will be activated now.
* (Sebastian Boramnn) Added option, to remove overlay of tile, if device is active or inactive.
* (Sebastian Bormann) Enhanced conversion function when converting booelan to number.
* (Sebastian Bormann) Fixed renaming of image files (links to used images are now also correctly renamed).
* (Sebastian Bormann) Fixed handling of spaces in image filenames.

### 0.1.9 (2019-08-18)
* (Sebastian Bormann) Modified cache manifest to remove EISDIR-errors from log.
* (Sebastian Bormann) Fixed toggle-entry in pressure menu.
* (Sebastian Bormann) Added multiple file upload to images tab.
* (Sebastian Bormann) Added check for dead links to other views when saving settings.
* (Sebastian Bormann) You can now assign external urls to background images and icons (for example to add a weather-live-map).
* (Sebastian Bormann) Removed options clickOnIconOpensDialog and clickOnTileToggles for Values and Programs as they are not switchable.
* (Sebastian Bormann) Added OFF_SET_VALUE and the option 'Return to OFF_SET_VALUE after [ms]' to button.

### 0.1.8 (2019-08-11)
* (Sebastian Bormann) Further improvements on connecting over iobroker.pro.
* (Sebastian Bormann) COLOR_BRIGHTNESS and WHITE_BRIGHTNESS are now displayed, if LEVEL is not defined on hue lights.
* (Sebastian Bormann) Added thumbnail-previews of fonts.
* (Sebastian Bormann) Added clickOnIconOpensDialog and clickOnTileToggles to device options.

### 0.1.7 (2019-08-11)
* (Sebastian Bormann) Added font-family, -size, -weight and -style to options for toolbar, headers, device-name, device-state and device-info-text.
* (Sebastian Bormann) Added icon-size, icon-background-size and icon-background-corner-size to options for toolbar.

### 0.1.6 (2019-08-08)
* (Sebastian Bormann) Next try to connect via iobroker.pro

### 0.1.5 (2019-08-06)
* (Sebastian Bormann) Added validation to options.
* (Sebastian Bormann) Extended alarm with CONTROL_MODE-datapoint and icons for disarmed, armed and triggered. 
* (Sebastian Bormann) To save memory, only used states are saved in local memory (before all used AND all updated states were saved).
* (Sebastian Bormann) Optimized socket-connectionLink to try to connect via iobroker.pro.

### 0.1.4 (2019-08-04)
* (Sebastian Bormann) Optimized fading of tiles.
* (Sebastian Bormann) Added toggle-button to blind, if no up/down button is defined.
* (Sebastian Bormann) Added detection of protocol for socket in admin.
* (Sebastian Bormann) Added confirm-flag inside custom datapoint configuration dialog to enable asking user to confirm before changing values.
* (Sebastian Bormann) Added toggle-button to garage door.

### 0.1.3 (2019-08-01)
* (Sebastian Bormann) Added seperate background image for active devices.
* (Sebastian Bormann) Fixed background-options (color and opacity) for active and inactive device tiles.
* (Sebastian Bormann) Added more space to views bottom.
* (Sebastian Bormann) Fixed invert level for blinds.
* (Sebastian Bormann) Organized options in collapsible layout.

### 0.1.2 (2019-07-29)
* (Sebastian Bormann) Added FAVORITE_POSITION (with configurable button caption) and SET_VALUE for UP, DOWN and FAVORITE_POSITION to Blinds.
* (Sebastian Bormann) Added 'No Icon' as option to icon configuration.
* (Sebastian Bormann) Addes icon to 'Link to other view'.
* (Sebastian Bormann) Added a bunch of new standard-icons.

### 0.1.1 (2019-07-28)
* (Sebastian Bormann) Added usericons.

### 0.1.0 **stable** (2019-07-27)
* (Sebastian Bormann) First stable release.
* (Sebastian Bormann) Added show timestamp to device options to chose default behaviour and a small timestamp-icon in the dialog to show and hide timestamps.
* (Sebastian Bormann) Fixed readonly handling of control mode for Homematic Thermostats.

### 0.0.49 (2019-07-27)
* (Sebastian Bormann) Added common type and common role to custom dialog.
* (Sebastian Bormann) Added pressure menu for toolbar.

### 0.0.48 (2019-07-25)
* (Sebastian Bormann) Datapoint BATTERY can now be a level - the battery-empty-icon will be shown if value is less than 10%.
* (Sebastian Bormann) Added additional colorspaces for hue lights (RGB, RGBW, RGBWWCW, RGBCWWW, Milight-Hue, RGB Hue Only).
* (Sebastian Bormann) Added Garage Door.

### 0.0.47 (2019-07-22)
* (Sebastian Bormann) Added targetValueId inside custom datapoint configuration dialog wich allowes to have different datapoints vor actual value and for target value.
* (Sebastian Bormann) Added invert-flag inside custom datapoint configuration dialog.

### 0.0.46 (2019-07-20)
* (Sebastian Bormann) Added options to device configuration dialog.
* (Sebastian Bormann) Added readonly-flag to device options.
* (Sebastian Bormann) Added invert color temperature flag to device options for lights.
* (Sebastian Bormann) Added invert flag to device options for blinds.

### 0.0.45 (2019-07-15)
* (Sebastian Bormann) Devices are now zoomed to fit screen (configurable under options).

### 0.0.44
* (Sebastian Bormann) Fixed incomplete loading of admin page with some settings.
* (Sebastian Bormann) Added datapoint-configuration via custom-dialog.

### 0.0.43
* (Sebastian Bormann) Changed initialization of socket.io to an asynchronous process to wait for connection before trying to use file-operations.
* (Sebastian Bormann) Added general datapoint ADDITIONAL_INFO to display additional datapoints at the bottom of the info-dialog.
* (Sebastian Bormann) Fixed value list type conflict.

### 0.0.42
* (Sebastian Bormann) Adjusted pathes of demo-files.

### 0.0.41
* (Sebastian Bormann) Major Change: The location of the uploaded userimages has changed, so the images can be accessed by backup-function of iobroker - the images will be moved to the new location automatically - please open admin-page for ALL instances and save the settings to adjust the filenames of used images automatically.
* (Sebastian Bormann) Inverted colortemperature-scale for hue-lights (now it uses the mired-scale = micro reciprocal degree-scale instead of kelvin).
* (Ansgar Schulte) Added Up and Down Buttons to Blinds.
* (Sebastian Bormann) When creating a directory it will be entered.
* (Sebastian Bormann) Added Effect-Section to Light
* (Sebastian Bormann) If a state is not set yet, a standard value will be used

### 0.0.40
* (Sebastian Bormann) Appended missing conn.js in admin-folder.

### 0.0.39
* (Sebastian Bormann) Now file-operations in admin should work (file and directory renaming and deleting).
* (Sebastian Bormann) Added Image-Popup in admin.
* (Sebastian Bormann) Renamed demo-images.

### 0.0.38
* (Sebastian Bormann) Again changes to forced touch for gained compatibility.

### 0.0.37
* (Sebastian Bormann) Some more little changes to forced touch.
* (Sebastian Bormann) Added option to open a view via url by adding 'home=<viewId>' to url-parameters.

### 0.0.36
* (Sebastian Bormann) Added compatibility for some android devices to forced touch.
* (Sebastian Bormann) Changed the way hue and ct is displayed for better compatibility to some devices.

### 0.0.35
* (Sebastian Bormann) Fixed crash of frontend, if a device has no role and added info to admin to chose a role.
* (Sebastian Bormann) Removed filtering of states in select-id-dialog for autocreate.
* (Sebastian Bormann) Further improvments of forced touch with force-indicator and hopefully a better compatibility with more devices.

### 0.0.34
* (Sebastian Bormann) Added forced touch menu (press hard or press long on unsupported devices), wich will give more room for extended features in future.
* (Sebastian Bormann) Linked Views can now be set for all roles and are available in the dialog and by a forced touch.
* (Sebastian Bormann) Added timestamp for Window, Door, Fire, Temperature, Humidity, Brightness and Motion.
* (Sebastian Bormann) Fixed issure 49 (state for role switch if type is number).

### 0.0.33
* (Sebastian Bormann) Added WINDOW_OPENING_REPORTING to thermostat and homematic-thermostat.
* (Sebastian Bormann) Fixed marquee not always starting correctly.

### 0.0.32
* (Sebastian Bormann) Added Battery.
* (Sebastian Bormann) Heaters are displayed as inactive, if set-value is at its minimum.
* (Sebastian Bormann) Added meta.user object to allow backup of user uploaded files via iobroker backup.
* (Sebastian Bormann) Added check for existance of common.role before rendering view.

### 0.0.31
* (Sebastian Bormann) Fixed some typos.
* (Sebastian Bormann) Enhanced colour-mixing of light with seperate brightness-datapoints for color and white.
* (Sebastian Bormann) Rewritten rendering of view as praparation for further enhancements.
* (Sebastian Bormann) Rewritten rendering of dialog as praparation for further enhancements.
* (Sebastian Bormann) Added option to colorize Device-Texts.

### 0.0.30
* (Sebastian Bormann) Fixed io-package.json

### 0.0.29
* (Sebastian Bormann) changed parts of the code to be backward-compatible to older browsers like ie 11.
* (Sebastian Bormann) Now its possible to define a value list for a data point under .native.states wich will have a greater priority than a value list under .common.states. 
* (Sebastian Bormann) Updated dependency for axios to 0.0.19 to fix a scurity issue.

### 0.0.28
* (Sebastian Bormann) Added datapoint POWER to switch, fan and light.
* (Sebastian Bormann) Fixed marquee for small info texts in the upper right corner at big screen sizes.
* (Sebastian Bormann) Added more options for configuring header-colors and device-colors (experimental state). Text-color ist not configurable yet.

### 0.0.27
* (Sebastian Bormann) Added marquee (scrolling text) for long states and device names (can be configured  in options). 
* (Sebastian Bormann) Added more toolbar-options. 
* (Sebastian Bormann) Enhanced handling of value lists. 
* (Sebastian Bormann) Disabled swiping when dialog is opened.

### 0.0.26
* (Sebastian Bormann) Added brightness to motion-sensor.
* (Sebastian Bormann) Added options tab. You can now configure colors of toolbar.
* (Sebastian Bormann) Fixed rendering of constants.
* (Sebastian Bormann) Resized the demo-wallpapers for faster loading.

### 0.0.25
* (Sebastian Bormann) Added motion-sensor.
* (Sebastian Bormann) Added description, how the frontend works: [Operating Principle of Frontend](Operating%20Principle%20of%20Frontend.md).
* (Sebastian Bormann) Added dialog for editing constants like SET_VALUE, URL or HTML.
* (Sebastian Bormann) Changed the way arrays are stored.
* (Sebastian Bormann) Added submit-button for values of type string.
* (Sebastian Bormann) Added saturation to hue-lights.
* (Sebastian Bormann) Better icons for color-temperature and brightness-sensor.

### 0.0.24
* (Sebastian Bormann) Fixed jittering on Safari while scrolling (was related to Pull2Refresh).
* (Sebastian Bormann) System language of iobroker will be loaded and used.

### 0.0.23
* (Sebastian Bormann) Rewrote how constant values (instead of linkedStates) are handeled - this is a requirement for further development.
* (Sebastian Bormann) Fixed Pull2Refresh on android devices / chrome.
* (Sebastian Bormann) Added external links
* (Sebastian Bormann) Added popups with iframes

### 0.0.22
* (watcherkb) Improved german translation.
* (BramTown) Improved german translation.
* (Sebastian Bormann) Short after another coming reconnect-events (<5s) are ignored now.

### 0.0.21
* (Sebastian Bormann) Added Pull2Refresh on mobile devices - reloads whole page when pulling down on homepage, otherwise only the acual view is reloaded.
* (Sebastian Bormann) Improved reloading on reconnect (hoepefully to get it finally good working on iOS 12.2).

### 0.0.20
* (Sebastian Bormann) New trial to get it working in iOS 12.2.

### 0.0.19
* (Sebastian Bormann) Improved reloading of page in new PWA-Mode of iOS 12.2.

### 0.0.18
* (Sebastian Bormann) Improved fetching of VALVE_STATES.
* (Sebastian Bormann) Changed Button Icon.
* (Sebastian Bormann) Added Loading-Spinner if disconnected.
* (Sebastian Bormann) Due to new iOS 12.2 PWA-Mode added visibility-check and connectivity-check.
* (Sebastian Bormann) Added role-icons to role-selectbox in edit device dialog.
* (Sebastian Bormann) Fixed missing value-list for states of the type string.

### 0.0.17
* (Sebastian Bormann) Changed description of slider (level/dimmer/value/height).

### 0.0.16
* (Sebastian Bormann) Role of device is displayed in devices-table.
* (Sebastian Bormann) VALVE_STATES is now editable via GUI (show opening of valves associated with a thermostat in percentage).
* (Sebastian Bormann) Added Role 'Button': You can define a constant SET_VALUE wich will be written to the ID that is linked with STATE if the button is pressed.
* (Sebastian Bormann) Rewritten parts of front-end to guarentee better compatibility. Boost-Mode for Homematic-Thermostat should work now.
* (Sebastian Bormann) Added state BOOST_STATE for Homematic-Thermostat - ability to display remaining boost-time if in boost-mode.
* (Sebastian Bormann) Added dessription of roles and corresponding states.
* (Sebastian Bormann) Temperature und Humidity-Sensors can now display a STATE at bottom of device, and both, TEMPERATURE and HUMIDITY, in small in the upper right corner.
* (Sebastian Bormann) Better handling of Auto-Create of Temperature- und Humidity-Sensors.
* (Sebastian Bormann) German translation: 'geöffnet' lower case.
* (Sebastian Bormann) Zigbee humidity and temperature added to auto-creation.
* (Sebastian Bormann) Fixed not scrollable selectbox at devices tab.

### 0.0.15
* (Sebastian Bormann) Improved check for value type of states.
* (Sebastian Bormann) Improved slider-tooltip to lower font-size at large numbers.

### 0.0 14
* (Sebastian Bormann) If role of state is not further specified, then check for role of parent object.

### 0.0.13
* (Sebastian Bormann) Doors and Windows now force true/false to be translated to opened/closed.
* (Sebastian Bormann) Double Entrys on WelcomeScreen/Overview removed.
* (Sebastian Bormann) States are now set with the correct value type.
* (Sebastian Bormann) Changed recognition of state types. I hope there are no new bugs now!

### 0.0.12
* (Sebastian Bormann) Check for unallowed chars in object names.
* (Sebastian Bormann) Check for duplicates in view names.
* (Sebastian Bormann) Level fires a slider in dialog - even when it has a state list (HUE again :)).
* (Sebastian Bormann) Added Blinds (Homematic) - please test it, i don't have one to test.

### 0.0.11
* (Sebastian Bormann) Added compatibility for edge and firefox. 
* (Sebastian Bormann) Again Hue bugfixes.
* (Sebastian Bormann) Removed Tooltip from Toolbar.

### 0.0.10
* (Sebastian Bormann) Added ColorTemperature. Hoepfully HUE works now? Can't test ist, because i do not own any hue lamp :)

### 0.0.9
* (Sebastian Bormann) Philips HUE added to autocreate (colortemp is not working yet!).  
* (Sebastian Bormann) LinkedView now also works on windows, doors and fire-sensor.
* (Sebastian Bormann) Added translation (thanks ldittmar!).

### 0.0.8
* (Sebastian Bormann) Added icons to image selectboxes.

### 0.0.7
* (Sebastian Bormann) Changed order of tabs
* (Sebastian Bormann) Autocreate for shelly should work now (i hope so, can't test it here)

### 0.0.6
* (Sebastian Bormann) Improved speed of select id and autocreate
* (Sebastian Bormann) Set filter to channel on autocreate

### 0.0.5
* (Sebastian Bormann) Bugfix: creation of many devices schould work now

### 0.0.4
* (Sebastian Bormann) Bugfix: copy device created just a reference to old object
* (Sebastian Bormann) Addes Toolbar-Icons

### 0.0.3
* (Sebastian Bormann) various bugfixes

### 0.0.2
* (Sebastian Bormann) first partly running version

### 0.0.1
* (Sebastian Bormann) initial release

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