---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iqontrol/README.md
title: ioBroker.iqontrol
hash: J3EuVE+zZQ/jZpebcngfTcfVq90XvItMCYE74SafCbU=
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
* Knoten 8 oder höher
* Web-Adapter mit einer Instanz, auf der dasselbe Protokoll (http oder https) wie der Admin-Adapter ausgeführt wird. Socket.IO ist auf "integriert" und "Web-Sockets erzwingen" deaktiviert
    * Wenn dies im Widerspruch zu anderen Adaptern steht, fügen Sie einfach eine weitere Instanz mit den oben genannten Einstellungen hinzu - iQontrol durchsucht die passende Webadapter-Instanz und verwendet sie für die Kommunikation
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
Wenn Sie als Rolle "Mit anderer Ansicht verknüpfen" auswählen, können Sie Links zu anderen Ansichten erstellen. Ich schlage vor, Links zu anderen Ansichten mit demselben Hintergrund wie die verknüpfte Ansicht zu skinnen.
Sie können auch versuchen, mit der Autocreate-Funktion ein vorhandenes Gerät aus dem iobroker-Objektbaum auszuwählen. Autocreate versucht, die Rolle herauszufinden und so viele Zustände wie möglich zuzuordnen.

* Anschließend können Sie eine Symbolleiste erstellen, die als Fußzeile angezeigt wird.

Symbolleisteneinträge sind Links zu Ansichten.
Der erste Symbolleisteneintrag ist Ihre 'Home-View', die beim Start geladen wird.

* Um alles zu einem ausgefallenen Stil zu machen, können Sie Ihre eigenen Bilder hochladen.

Sie können Ihre Bilder als Hintergrundbilder für Ansichten oder für Geräte verwenden.
Bilder im Ordner '/ usericons' können als Symbole für Geräte verwendet werden.
Die kostenlos eingebauten Demo-Hintergrundbilder stammen von www.pexels.com.

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
Dies funktioniert nur bei bekannten Geräten. Für unbekannte Geräte und um Geräten erweiterte Funktionen zu bieten, können Sie sie manuell über die Schaltfläche (+) - hinzufügen oder die Geräte bearbeiten, die durch die automatische Erstellung erstellt wurden.
Klicken Sie auf den Stift hinter dem Gerät, um die Rolle und den Status eines Geräts zu bearbeiten. Nachfolgend finden Sie eine kurze Beschreibung der Rollen und der verwendeten Zustände:

### Ändern der Datenpunktkonfiguration
Sie können die Konfiguration von Datenpunkten über das Schraubenschlüsselsymbol hinter einem Datenpunkt im Dialogfeld "Gerätekonfiguration" oder auf der Registerkarte "Objekte" von iobroker ändern. Hier kannst du:

* Readonly-Flag setzen
* Invert-Flag setzen
* Confirm-Flag setzen (zwingt den Benutzer zur Bestätigung, bevor eine Änderung in einen Datenpunkt geschrieben wird)
* PIN-Code festlegen (zwingt den Benutzer, diesen PIN-Code einzugeben, bevor eine Änderung in einen Datenpunkt geschrieben wird - aber Vorsicht: Dies ist nur von geringer Sicherheit, da die PIN im Frontend überprüft wird! Verwenden Sie eine Nummer, um einen Vollbildmodus anzuzeigen -pin-pad, wenn nach Code gefragt wird)
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
* **STATE** *boolean* - Anzeigen und Ein- / Ausschalten
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
  * **SÄTTIGUNG** * Zahl * - Lichtsättigung (von weiß zu reiner Farbe)
  * **COLOR_BRIGHTNESS** * number * - die Helligkeit der farbigen LEDs (wenn Sie einen LEVEL-Status und keine weißen LEDs haben, wird dies ignoriert, da die Helligkeit vollständig von LEVEL gesteuert wird)
* Für weiße LEDs:
  * **CT** * Nummer * - Farbtemperatur des Lichts, wenn es zwei Weißtöne hat
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
* **EFFECT_NEXT** *boolean* - Wenn auf true gesetzt, wird der nächste Effekt abgespielt (als Alternative für Geräte, die die EFFECT-Werteliste nicht unterstützen).
* **EFFECT_SPEED_UP** / **EFFECT_SPEED_DOWN** *boolean* - Wenn dieser Wert auf true gesetzt ist, wird der Effekt beschleunigt / verringert
* Sonstiges:
  * **POWER** * number * - Stromverbrauch, der in der oberen rechten Ecke klein angezeigt wird

### <img src="img/icons/radiator.png" width="32"> Thermostat:
* **SET_TEMPERATURE** *Nummer* - Zieltemperatur
* **TEMPERATUR** *Zahl* - Die tatsächliche Temperatur wird in der oberen rechten Ecke klein angezeigt
* **FEUCHTIGKEIT** *Zahl* - Die tatsächliche Luftfeuchtigkeit wird in der oberen rechten Ecke klein angezeigt
* **CONTROL_MODE** *Werteliste* - Anzeige und Einstellung des Thermostatmodus
* **WINDOW_OPENING_REPORTING** *boolean* - Wenn true, wird ein kleines geöffnetes Fenster angezeigt
* **VALVE_STATES** Array mit Namen und Nummern - Zeigt die Öffnung der Ventile an, die dem Thermostat zugeordnet sind

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
  * Alternativ können Sie eine *Werteliste* zuweisen, um zusätzliche Zustände wie 'gekippt' anzuzeigen.
  * Sie können auch eine *Zeichenfolge* zuweisen, um Text wie "3 Fenster offen" oder "Alle geschlossen" anzuzeigen.
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
* **STOP** *boolean* - wird auf true gesetzt, wenn die Stop-Taste gedrückt wird
* **UP** / **DOWN** *boolean* - wird auf true gesetzt, wenn die Auf- / Ab-Taste gedrückt wird (für Geräte, die UP- und DOWN-Datenpunkte anstelle von oder zusätzlich zu LEVEL verwenden). Zusätzlich können Sie einen Wert über die Datenpunkte **UP_SET_VALUE** / **DOWN_SET_VALUE** definieren. Wenn definiert, wird dieser Wert anstelle von true gesendet, wenn die Auf- / Ab-Taste gedrückt wird
* **FAVORITE_POSITION** *boolean* - kann verwendet werden, um eine Lieblingsposition abzurufen. Wenn die Schaltfläche Favorit (Schaltflächenbeschriftung kann in den Geräteeinstellungen konfiguriert werden) gedrückt wird, wird true an diesen Datenpunkt gesendet. Zusätzlich können Sie einen Wert über den Datenpunkt **FAVORITE_POSITION_SET_VALUE** definieren. Wenn definiert, wird dieser Wert anstelle von true gesendet, wenn die Favoritentaste gedrückt wird
* **SLATS_LEVEL** *number* - Position der Lamellen in Prozent

### <img src="img/icons/fire_on.png" width="32"> Feuersensor:
* **STATE** *boolean* - Wenn true, wird der Sensor als ausgelöst angezeigt
  * Alternativ können Sie eine *Werteliste* zuweisen, um zusätzliche Zustände wie "manipuliert" anzuzeigen.
  * Sie können auch eine *Zeichenfolge* zuweisen, um Text wie "Feuer im Obergeschoss" anzuzeigen.
* Die **Linked-View-Eigenschaft** wird direkt geöffnet

### <img src="img/icons/alarm_on.png" width="32"> Alarm:
* **STATE** *boolean* - Wenn true, wird der Sensor als ausgelöst angezeigt
  * Alternativ können Sie eine *Werteliste* zuweisen, um zusätzliche Zustände wie "manipuliert" anzuzeigen.
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

### <img src="img/icons/popup.png" width="32"> Aufpoppen:
* **STATE** *any* - kann verwendet werden, um weitere Informationen anzuzeigen
* **URL** CONSTANT *string* - Diese URL wird als Iframe im Popup geöffnet
* **HTML** CONSTANT *string* - Dieses Markup wird im Popup angezeigt, wenn keine URL angegeben ist

### <img src="img/icons/link.png" width="32"> Externer Link:
* **STATE** *any* - kann verwendet werden, um weitere Informationen anzuzeigen
* **URL** CONSTANT *string* - Diese URL wird geöffnet

## Entwickeln
* Sehen Sie sich [Funktionsprinzip des Frontends] an (Betriebs% 20Prinzip% 20von% 20Frontend.md)

****

## Changelo8
### 0.2.19 (29.02.2020)
* (Sebastian Bormann) Abhängigkeiten aktualisiert.

### 0.2.18 (29.02.2020)
* (Sebastian Bormann) Abhängigkeiten aktualisiert.

### 0.2.17 (2020-02-29)
* (Sebastian Bormann) Option zum Öffnen des Dialogfelds durch Klicken auf die Kachel für Ansicht, Fenster, Tür, Feuer, Temperatur, Luftfeuchtigkeit, Helligkeit und Bewegung hinzugefügt.
* (Sebastian Bormann) Option zum Ausblenden des Geräts hinzugefügt, wenn es inaktiv ist (vorsichtig behandeln, da Sie es möglicherweise nicht wieder einschalten können).

### 0.2.16 (2020-01-14)
* (Sebastian Bormann) Benutzerdefinierter Schritt für die Heizungsregelung behoben.
* (Sebastian Bormann) Universelles Popup behoben, das angezeigt wurde, auch wenn es leer war.

### 0.2.15 (2020-01-07)
* (Sebastian Bormann) svg als mögliches Bild zum Hochladen hinzugefügt.
* (Sebastian Bormann) URL und HTML für fast alle Geräte universell gemacht, um benutzerdefinierten HTML-Code oder Inhalt einer URL im Dialogfeld anzuzeigen (dies kann beispielsweise zum Anzeigen von FLOT-Diagrammen verwendet werden, die sich auf das Gerät im Dialogfeld beziehen).
* (Sebastian Bormann) Deaktivierte benutzerdefinierte Werte mit admin 3.7.6+ und js-controller <2.2 behoben.

### 0.2.14 (2019-11-12)
* (Sebastian Bormann) Symbolumschaltung für Thermostate behoben.

### 0.2.13 (23.10.2019)
* (Sebastian Bormann) Die Methode der Rückkehr nach der Zeit wurde verbessert.
* (Bluefox) Übersetzungen im benutzerdefinierten Dialog korrigiert.

### 0.2.12 (2019-10-12)
* (Sebastian Bormann) Verbesserung des Homematik-Thermostats für die Kompatibilität von Regler 2.0.

### 0.2.11 (07.10.2019)
* (Sebastian Bormann) Umgeschriebener Pincode-Bereich für ältere Browser.
* (Sebastian Bormann) Pincode funktioniert jetzt auch für Schaltflächen.
* (Sebastian Bormann) Die Funktion "Rückkehr nach Zeit" wurde geändert, um mit älteren Browsern zu arbeiten.
* (Sebastian Bormann) Fehlende Einträge in Langdruckmenüs in iOS 13 behoben.

### 0.2.10 (2019-10-05)
* (Sebatian Bormann) Verbesserter PIN-Code zum Anzeigen eines Nummernblocks bei Verwendung einer alphanumerischen PIN.

### 0.2.9 (2019-10-02)
* (Sebastian Bormann) Optionaler PIN-Code zum benutzerdefinierten Datenpunktkonfigurationsdialog hinzugefügt (Schraubenschlüsselsymbol).
* (Sebastian Bormann) Option hinzugefügt, um nach einer einstellbaren Zeit der Inaktivität der Einstellungen zu einer Ansicht zurückzukehren.

### 0.2.8 (2019-09-27)
* (Sebastian Bormann) Weitere Verbesserung von index.js für Controller 2.0-Kompatibilität.

### 0.2.7 (27.09.2019)
* (Sebastian Bormann) Popup_width und Popup_height behoben.
* (Sebastian Bormann) Weitere Verbesserung von main.js und index.js für die Kompatibilität mit Controller 2.0.
* (Sebastian Bormann) Option showState für Button und Programm hinzugefügt.

### 0.2.6 (2019-09-24)
* (Sebastian Bormann) Die Verarbeitung des Klartextes von Werten erfolgt nun nach dem Runden eines Zahlenwerts.
* (Sebastian Bormann) Icon_on für Button entfernt.
* (Sebastian Bormann) Die Datei main.js wurde geändert, um die Kompatibilität mit Controler 2.0 zu gewährleisten.

### 0.2.5 (2019-09-22)
* (Sebastian Bormann) Die Handhabung des Druckmenüs für iOS 13 wurde angepasst.
* (Sebastian Bormann) Puffer zum Rendern einer Ansicht hinzugefügt, während druckMenue erstellt wird.
* (Sebastian Bormann) Der Batterie wurden LEISTUNG und SPANNUNG hinzugefügt.

### 0.2.4 (2019-09-15)
* (Sebastian Bormann) Weitere Verbesserung des Handlings im Steuermodus für Homematik-Thermostate.
* (Sebastian Bormann) Kleinere Bugfixes.

### 0.2.3 (2019-09-15)
* (Sebastian Bormann) Weitere Verbesserung des Handlings im Steuermodus für Homematik-Thermostate.
* (Sebastian Bormann) Behandlung alternativer Zustände-Eigenschafts-Syntax hinzugefügt.

### 0.2.2 (14.09.2019)
* (Sebastian Bormann) Verbesserte Handhabung des Steuermodus für Homematik-Thermostat für mehr Kompatibilität.
* (Sebastian Bormann) Reduzierte Sendegeschwindigkeit beim Bewegen des Schiebereglers für Jalousien und Thermostate.

### 0.2.1 (07.09.2019)
* (Sebastian Bormann) Absturz des Backends behoben (vertauschte index_m.html und custom_m.html).

### 0.2.0 (06.09.2019)
* (Sebastian Bormann) Lamellenlevel zum Blind hinzugefügt.

### 0.1.15 (05.09.2019)
* (Sebastian Bormann) Schritt zum benutzerdefinierten Dialog hinzugefügt, mit dem die Auflösung von Wertschiebereglern definiert werden kann.
* (Sebastian Bormann) Werte mit der Einheit% und einem Bereich von min bis max von 0-1 werden jetzt auf 0-100 skaliert.
* (Sebastian Bormann) Die Konvertierung in einen alternativen Farbraum für Farbtonlichter wurde korrigiert.

### 0.1.14 (2019-09-01)
* (Sebastian Bormann) Fehlende Dropdown-Menüs für Bilder nach dem Sortieren oder Hinzufügen von Elementen zu Tabellen wurden behoben.
* (Sebastian Bormann) Level-Slider haben eine höhere Auflösung für Datenpunkte mit kleinen Wertebereichen.

### 0.1.13 (2019-08-28)
* (Sebastian Bormann) Absturz des Frontends behoben.
* (Sebastian Bormann) Sicherheitsupdates.

### 0.1.12 (28.08.2019)
* (Sebastian Bormann) Den Optionen für das Popup wurden Breite und Höhe hinzugefügt.
* (Sebastian Bormann) Option hinzugefügt, um freien CSS-Code zum Ändern des Frontends zu definieren.
* (Sebastian Bormann) Infotext-Werte werden jetzt als Klartext angezeigt oder gerundet, wenn Zahlen.
* (Sebastian Bormann) Den Geräteoptionen für Szenen, Programme und Schaltflächen wurde "Dialog nach Ausführung schließen" hinzugefügt.

### 0.1.11 (26.08.2019)
* (Sebastian Bormann) Bugfix für den Fehler beim Übergang der Chromopazität.
* (Sebastian Bormann) Platzhalter für Standardwerte für Texteingaben auf der Optionsseite hinzugefügt.
* (Sebastian Bormann) Platzhalter für Standardsymbol und leeres Symbol zu Geräteoptionen hinzugefügt.
* (Sebastian Bormann) Erweiterter Thermostat CONTROL_MODE nach Typschalter.
* (Sebastian Bormann) Absturz bei Verwendung eines Thermostats mit Sollwert und nicht homematischen Geräten behoben.
* (Sebastian Bormann) Min und Max zum benutzerdefinierten Dialog hinzugefügt.
* (Sebastian Bormann) Jetzt können Sie keine als Gerätehintergrundbild für aktive Geräte festlegen (früher wurde dies aus Gründen der Abwärtskompatibilität von inaktiven Geräten kopiert).

### 0.1.10 (2019-08-20)
* (Sebastian Bormann) Sie können jetzt verschiedene Einheiten definieren, wenn der Wert Null ist oder wenn der Wert im benutzerdefinierten Dialogfeld Eins ist.
* (Sebastian Bormann) Wenn Sie ein Bild über das neue Dropdown-Menü ändern, wird jetzt die Schaltfläche Speichern aktiviert.
* (Sebastian Boramnn) Option hinzugefügt, um Überlagerungen von Kacheln zu entfernen, wenn das Gerät aktiv oder inaktiv ist.
* (Sebastian Bormann) Verbesserte Konvertierungsfunktion beim Konvertieren von Booelan in Zahlen.
* (Sebastian Bormann) Das Umbenennen von Bilddateien wurde korrigiert (Links zu verwendeten Bildern werden jetzt auch korrekt umbenannt).
* (Sebastian Bormann) Fehler beim Umgang mit Leerzeichen in Bilddateinamen behoben.

### 0.1.9 (2019-08-18)
* (Sebastian Bormann) Das Cache-Manifest wurde geändert, um EISDIR-Fehler aus dem Protokoll zu entfernen.
* (Sebastian Bormann) Fehler beim Umschalten im Druckmenü behoben.
* (Sebastian Bormann) Mehrere Dateien wurden auf die Registerkarte "Bilder" hochgeladen.
* (Sebastian Bormann) Beim Speichern von Einstellungen wurde die Überprüfung auf tote Links zu anderen Ansichten hinzugefügt.
* (Sebastian Bormann) Sie können jetzt Hintergrundbildern und Symbolen externe URLs zuweisen (z. B. um eine Wetter-Live-Karte hinzuzufügen).
* (Sebastian Bormann) Die Optionen clickOnIconOpensDialog und clickOnTileToggles für Werte und Programme wurden entfernt, da sie nicht umschaltbar sind.
* (Sebastian Bormann) OFF_SET_VALUE und die Option 'Zurück zu OFF_SET_VALUE nach [ms]' zur Schaltfläche hinzugefügt.

### 0.1.8 (2019-08-11)
* (Sebastian Bormann) Weitere Verbesserungen beim Verbinden über iobroker.pro.
* (Sebastian Bormann) COLOR_BRIGHTNESS und WHITE_BRIGHTNESS werden jetzt angezeigt, wenn LEVEL für Farbtonlichter nicht definiert ist.
* (Sebastian Bormann) Miniaturansichten von Schriftarten hinzugefügt.
* (Sebastian Bormann) clickOnIconOpensDialog und clickOnTileToggles wurden zu den Geräteoptionen hinzugefügt.

### 0.1.7 (2019-08-11)
* (Sebastian Bormann) Die Optionen für Symbolleiste, Kopfzeilen, Gerätenamen, Gerätestatus und Geräteinfotext wurden um Schriftfamilie, -größe, -gewicht und -stil erweitert.
* (Sebastian Bormann) Den Optionen für die Symbolleiste wurden Symbolgröße, Symbolhintergrundgröße und Symbolhintergrund-Eckgröße hinzugefügt.

### 0.1.6 (08.08.2019)
* (Sebastian Bormann) Versuchen Sie als nächstes, eine Verbindung über iobroker.pro herzustellen

### 0.1.5 (2019-08-06)
* (Sebastian Bormann) Validierung zu Optionen hinzugefügt.
* (Sebastian Bormann) Erweiterter Alarm mit CONTROL_MODE-Datenpunkt und Symbolen für entwaffnet, bewaffnet und ausgelöst.
* (Sebastian Bormann) Um Speicher zu speichern, werden nur verwendete Zustände im lokalen Speicher gespeichert (bevor alle verwendeten UND alle aktualisierten Zustände gespeichert wurden).
* (Sebastian Bormann) Optimierter Socket-ConnectionLink für den Versuch, eine Verbindung über iobroker.pro herzustellen.

### 0.1.4 (04.08.2019)
* (Sebastian Bormann) Optimiertes Ausbleichen von Fliesen.
* (Sebastian Bormann) Umschalttaste zum Blind hinzugefügt, wenn keine Auf- / Ab-Taste definiert ist.
* (Sebastian Bormann) Erkennung des Protokolls für Socket in Admin hinzugefügt.
* (Sebastian Bormann) Bestätigungsflag im benutzerdefinierten Datenpunktkonfigurationsdialog hinzugefügt, damit der Benutzer vor dem Ändern der Werte zur Bestätigung aufgefordert werden kann.
* (Sebastian Bormann) Das Garagentor wurde umgeschaltet.

### 0.1.3 (2019-08-01)
* (Sebastian Bormann) Separates Hintergrundbild für aktive Geräte hinzugefügt.
* (Sebastian Bormann) Hintergrundoptionen (Farbe und Deckkraft) für aktive und inaktive Gerätekacheln wurden korrigiert.
* (Sebastian Bormann) Mehr Platz für Ansichten unten hinzugefügt.
* (Sebastian Bormann) Invert-Level für Blinds behoben.
* (Sebastian Bormann) Organisierte Optionen in zusammenklappbarem Layout.

### 0.1.2 (2019-07-29)
* (Sebastian Bormann) FAVORITE_POSITION (mit konfigurierbarer Tastenbeschriftung) und SET_VALUE für UP, DOWN und FAVORITE_POSITION zu Blinds hinzugefügt.
* (Sebastian Bormann) Als Option zur Symbolkonfiguration wurde 'Kein Symbol' hinzugefügt.
* (Sebastian Bormann) Fügt das Symbol "Link zu anderer Ansicht" hinzu.
* (Sebastian Bormann) Eine Reihe neuer Standard-Icons hinzugefügt.

### 0.1.1 (2019-07-28)
* (Sebastian Bormann) Benutzer hinzugefügt.

### 0.1.0 **stabil** (2019-07-27)
* (Sebastian Bormann) Erste stabile Veröffentlichung.
* (Sebastian Bormann) Den Geräteoptionen den Zeitstempel anzeigen hinzugefügt, um das Standardverhalten auszuwählen, und ein kleines Zeitstempelsymbol im Dialogfeld, um Zeitstempel anzuzeigen und auszublenden.
* (Sebastian Bormann) Die schreibgeschützte Behandlung des Steuermodus für homematische Thermostate wurde korrigiert.

### 0.0.49 (2019-07-27)
* (Sebastian Bormann) Gemeinsamer Typ und gemeinsame Rolle zum benutzerdefinierten Dialog hinzugefügt.
* (Sebastian Bormann) Druckmenü für Symbolleiste hinzugefügt.

### 0.0.48 (2019-07-25)
* (Sebastian Bormann) Datenpunkt-BATTERIE kann jetzt eine Stufe sein - das Symbol für leere Batterie wird angezeigt, wenn der Wert weniger als 10% beträgt.
* (Sebastian Bormann) Zusätzliche Farbräume für Farbtonlichter hinzugefügt (nur RGB, RGBW, RGBWWCW, RGBCWWW, Milight-Hue, RGB-Farbton).
* (Sebastian Bormann) Garagentor hinzugefügt.

### 0.0.47 (2019-07-22)
* (Sebastian Bormann) targetValueId im benutzerdefinierten Datenpunktkonfigurationsdialog hinzugefügt, der es ermöglicht, unterschiedliche Datenpunkte für den tatsächlichen Wert und für den Zielwert zu haben.
* (Sebastian Bormann) Invert-Flag im benutzerdefinierten Datenpunkt-Konfigurationsdialog hinzugefügt.

### 0.0.46 (20.07.2019)
* (Sebastian Bormann) Optionen zum Gerätekonfigurationsdialog hinzugefügt.
* (Sebastian Bormann) Readonly-Flag zu Geräteoptionen hinzugefügt.
* (Sebastian Bormann) Den Geräteoptionen für Lichter wurde das Invert-Farbtemperatur-Flag hinzugefügt.
* (Sebastian Bormann) Invert-Flag zu Geräteoptionen für Jalousien hinzugefügt.

### 0.0.45 (2019-07-15)
* (Sebastian Bormann) Geräte werden jetzt auf den Bildschirm gezoomt (konfigurierbar unter Optionen).

### 0.0.44
* (Sebastian Bormann) Das unvollständige Laden der Admin-Seite mit einigen Einstellungen wurde behoben.
* (Sebastian Bormann) Datenpunktkonfiguration über benutzerdefinierten Dialog hinzugefügt.

### 0.0.43
* (Sebastian Bormann) Die Initialisierung von socket.io wurde in einen asynchronen Prozess geändert, um auf die Verbindung zu warten, bevor versucht wird, Dateioperationen zu verwenden.
* (Sebastian Bormann) Allgemeiner Datenpunkt ADDITIONAL_INFO hinzugefügt, um zusätzliche Datenpunkte am unteren Rand des Infodialogs anzuzeigen.
* (Sebastian Bormann) Konflikt zwischen Wertelistentypen behoben.

### 0.0.42
* (Sebastian Bormann) Angepasste Pfade von Demo-Dateien.

### 0.0.41
* (Sebastian Bormann) Wesentliche Änderung: Der Speicherort der hochgeladenen Benutzerbilder hat sich geändert, sodass auf die Bilder über die Sicherungsfunktion von iobroker zugegriffen werden kann. Die Bilder werden automatisch an den neuen Speicherort verschoben. Bitte öffnen Sie die Administrationsseite für ALLE Instanzen und Speichern Sie die Einstellungen, um die Dateinamen der verwendeten Bilder automatisch anzupassen.
* (Sebastian Bormann) Invertierte Kolortemperaturskala für Farbtonlichter (jetzt wird anstelle von Kelvin die Mired-Skala = mikro-reziproke Gradskala verwendet).
* (Ansgar Schulte) Added Up und Down Buttons zu Blinds.
* (Sebastian Bormann) Beim Erstellen eines Verzeichnisses wird es eingetragen.
* (Sebastian Bormann) Dem Licht wurde ein Effektabschnitt hinzugefügt
* (Sebastian Bormann) Wenn noch kein Status festgelegt ist, wird ein Standardwert verwendet

### 0.0.40
* (Sebastian Bormann) Fehlende conn.js im admin-Ordner angehängt.

### 0.0.39
* (Sebastian Bormann) Jetzt sollten Dateivorgänge im Administrator funktionieren (Umbenennen und Löschen von Dateien und Verzeichnissen).
* (Sebastian Bormann) Image-Popup in admin hinzugefügt.
* (Sebastian Bormann) Umbenannte Demobilder.

### 0.0.38
* (Sebastian Bormann) Wechselt erneut zu erzwungener Berührung, um die Kompatibilität zu verbessern.

### 0.0.37
* (Sebastian Bormann) Noch ein paar kleine Änderungen an der erzwungenen Berührung.
* (Sebastian Bormann) Option zum Öffnen einer Ansicht über URL durch Hinzufügen von 'home = <viewId>' zu URL-Parametern hinzugefügt.

### 0.0.36
* (Sebastian Bormann) Kompatibilität für einige Android-Geräte zur erzwungenen Berührung hinzugefügt.
* (Sebastian Bormann) Die Darstellung von Farbton und CT wurde geändert, um die Kompatibilität mit einigen Geräten zu verbessern.

### 0.0.35
* (Sebastian Bormann) Absturz des Frontends behoben, wenn ein Gerät keine Rolle hat, und dem Administrator Informationen hinzugefügt, um eine Rolle auszuwählen.
* (Sebastian Bormann) Das Filtern von Zuständen im Select-ID-Dialog für die automatische Erstellung wurde entfernt.
* (Sebastian Bormann) Weitere Verbesserungen der erzwungenen Berührung mit Kraftanzeige und hoffentlich eine bessere Kompatibilität mit mehr Geräten.

### 0.0.34
* (Sebastian Bormann) Das Menü für erzwungene Berührungen wurde hinzugefügt (bei nicht unterstützten Geräten fest oder lange drücken), um in Zukunft mehr Platz für erweiterte Funktionen zu schaffen.
* (Sebastian Bormann) Verknüpfte Ansichten können jetzt für alle Rollen festgelegt werden und sind im Dialog und durch erzwungene Berührung verfügbar.
* (Sebastian Bormann) Zeitstempel für Fenster, Tür, Feuer, Temperatur, Luftfeuchtigkeit, Helligkeit und Bewegung hinzugefügt.
* (Sebastian Bormann) Problem 49 behoben (Status für Rollenwechsel, wenn Typ Nummer ist).

### 0.0.33
* (Sebastian Bormann) WINDOW_OPENING_REPORTING wurde zu Thermostat und Homematik-Thermostat hinzugefügt.
* (Sebastian Bormann) Festzelt wurde nicht immer richtig gestartet. Dieser Fehler wurde behoben.

### 0.0.32
* (Sebastian Bormann) Batterie hinzugefügt.
* (Sebastian Bormann) Heizungen werden als inaktiv angezeigt, wenn der eingestellte Wert minimal ist.
* (Sebastian Bormann) Das meta.user-Objekt wurde hinzugefügt, um die Sicherung von vom Benutzer hochgeladenen Dateien über die iobroker-Sicherung zu ermöglichen.
* (Sebastian Bormann) Überprüfung auf Vorhandensein von common.role vor dem Rendern der Ansicht hinzugefügt.

### 0.0.31
* (Sebastian Bormann) Einige Tippfehler wurden behoben.
* (Sebastian Bormann) Verbesserte Farbmischung von Licht mit separaten Helligkeitsdatenpunkten für Farbe und Weiß.
* (Sebastian Bormann) Überarbeitete Darstellung der Ansicht als Vorbereitung für weitere Verbesserungen.
* (Sebastian Bormann) Umgeschriebenes Rendern des Dialogs als Vorbereitung für weitere Verbesserungen.
* (Sebastian Bormann) Option zum Färben von Gerätetexten hinzugefügt.

### 0.0.30
* (Sebastian Bormann) io-package.json behoben

### 0.0.29
* (Sebastian Bormann) hat Teile des Codes so geändert, dass sie mit älteren Browsern wie z. B. 11 abwärtskompatibel sind.
* (Sebastian Bormann) Jetzt ist es möglich, eine Werteliste für einen Datenpunkt unter .native.states zu definieren, die eine höhere Priorität hat als eine Werteliste unter .common.states.
* (Sebastian Bormann) Die Abhängigkeit für Axios wurde auf 0.0.19 aktualisiert, um ein Sicherheitsproblem zu beheben.

### 0.0.28
* (Sebastian Bormann) Datenpunkt POWER für Schalter, Lüfter und Licht hinzugefügt.
* (Sebastian Bormann) Festzelt für kleine Infotexte in der oberen rechten Ecke bei großen Bildschirmgrößen behoben.
* (Sebastian Bormann) Weitere Optionen zum Konfigurieren von Header- und Gerätefarben (experimenteller Status) hinzugefügt. Die Textfarbe ist noch nicht konfigurierbar.

### 0.0.27
* (Sebastian Bormann) Festzelt (Bildlauftext) für lange Status und Gerätenamen hinzugefügt (kann in Optionen konfiguriert werden).
* (Sebastian Bormann) Weitere Symbolleistenoptionen hinzugefügt.
* (Sebastian Bormann) Verbesserter Umgang mit Wertelisten.
* (Sebastian Bormann) Wischen deaktiviert, wenn der Dialog geöffnet wird.

### 0.0.26
* (Sebastian Bormann) Dem Bewegungssensor wurde Helligkeit hinzugefügt.
* (Sebastian Bormann) Registerkarte "Optionen" hinzugefügt. Sie können jetzt die Farben der Symbolleiste konfigurieren.
* (Sebastian Bormann) Das Rendern von Konstanten wurde korrigiert.
* (Sebastian Bormann) Die Größe der Demo-Hintergrundbilder wurde geändert, um das Laden zu beschleunigen.

### 0.0.25
* (Sebastian Bormann) Bewegungssensor hinzugefügt.
* (Sebastian Bormann) Beschreibung hinzugefügt, wie das Frontend funktioniert: [Funktionsprinzip des Frontends] (Funktionsprinzip% 20Principle% 20of% 20Frontend.md).
* (Sebastian Bormann) Dialog zum Bearbeiten von Konstanten wie SET_VALUE, URL oder HTML hinzugefügt.
* (Sebastian Bormann) Die Art und Weise, wie Arrays gespeichert werden, wurde geändert.
* (Sebastian Bormann) Submit-Button für Werte vom Typ String hinzugefügt.
* (Sebastian Bormann) Farbton-Lichter wurden gesättigt.
* (Sebastian Bormann) Bessere Symbole für Farbtemperatur- und Helligkeitssensor.

### 0.0.24
* (Sebastian Bormann) Jitter auf Safari beim Scrollen behoben (war mit Pull2Refresh verwandt).
* (Sebastian Bormann) Die Systemsprache von iobroker wird geladen und verwendet.

### 0.0.23
* (Sebastian Bormann) Umgeschrieben, wie konstante Werte (anstelle von linkedStates) behandelt werden - dies ist eine Voraussetzung für die weitere Entwicklung.
* (Sebastian Bormann) Pull2Refresh auf Android-Geräten / Chrome behoben.
* (Sebastian Bormann) Externe Links hinzugefügt
* (Sebastian Bormann) Popups mit Iframes hinzugefügt

### 0.0.22
* (watcherkb) Verbesserte deutsche Übersetzung.
* (BramTown) Verbesserte deutsche Übersetzung.
* (Sebastian Bormann) Kurz nach einem weiteren Kommen werden Wiederverbindungsereignisse (<5s) jetzt ignoriert.

### 0.0.21
* (Sebastian Bormann) Pull2Refresh auf Mobilgeräten hinzugefügt - Lädt die gesamte Seite neu, wenn die Homepage heruntergezogen wird, andernfalls wird nur die aktuelle Ansicht neu geladen.
* (Sebastian Bormann) Verbessertes Nachladen beim erneuten Verbinden verbessert (hoffentlich, damit es unter iOS 12.2 endlich gut funktioniert).

### 0.0.20
* (Sebastian Bormann) Neue Testversion, damit es in iOS 12.2 funktioniert.

### 0.0.19
* (Sebastian Bormann) Verbessertes Neuladen der Seite im neuen PWA-Modus von iOS 12.2.

### 0.0.18
* (Sebastian Bormann) Verbessertes Abrufen von VALVE_STATES.
* (Sebastian Bormann) Geändertes Button-Symbol.
* (Sebastian Bormann) Loading-Spinner hinzugefügt, wenn nicht verbunden.
* (Sebastian Bormann) Aufgrund des neuen iOS 12.2 PWA-Modus wurden Sichtbarkeitsprüfung und Konnektivitätsprüfung hinzugefügt.
* (Sebastian Bormann) Im Dialogfeld "Gerät bearbeiten" wurden Rollensymbole zur Rollenauswahlbox hinzugefügt.
* (Sebastian Bormann) Fehlende Werteliste für Zustände der Typzeichenfolge behoben.

### 0.0.17
* (Sebastian Bormann) Geänderte Beschreibung des Schiebereglers (Stufe / Dimmer / Wert / Höhe).

### 0.0.16
* (Sebastian Bormann) Die Rolle des Geräts wird in der Gerätetabelle angezeigt.
* (Sebastian Bormann) VALVE_STATES kann jetzt über die GUI bearbeitet werden (Öffnung der mit einem Thermostat verbundenen Ventile in Prozent anzeigen).
* (Sebastian Bormann) Rolle 'Button' hinzugefügt: Sie können eine Konstante SET_VALUE definieren, die in die ID geschrieben wird, die mit STATE verknüpft ist, wenn die Taste gedrückt wird.
* (Sebastian Bormann) Teile des Frontends wurden neu geschrieben, um eine bessere Kompatibilität zu gewährleisten. Der Boost-Modus für Homematik-Thermostat sollte jetzt funktionieren.
* (Sebastian Bormann) Status BOOST_STATE für Homematik-Thermostat hinzugefügt - Fähigkeit, die verbleibende Boost-Zeit anzuzeigen, wenn im Boost-Modus.
* (Sebastian Bormann) Beschreibung der Rollen und der entsprechenden Zustände hinzugefügt.
* (Sebastian Bormann) Temperatur- und Feuchtigkeitssensoren können jetzt einen ZUSTAND am unteren Rand des Geräts anzeigen und sowohl TEMPERATUR als auch FEUCHTIGKEIT in der oberen rechten Ecke klein.
* (Sebastian Bormann) Bessere Handhabung der automatischen Erstellung von Temperatur- und Feuchtigkeitssensoren.
* (Sebastian Bormann) Deutsche Übersetzung: 'kleine' Kleinbuchstaben.
* (Sebastian Bormann) ZigBee-Luftfeuchtigkeit und Temperatur werden zur automatischen Erstellung hinzugefügt.
* (Sebastian Bormann) Nicht scrollbares Auswahlfeld auf der Registerkarte Geräte behoben.

### 0.0.15
* (Sebastian Bormann) Verbesserte Überprüfung des Werttyps von Zuständen.
* (Sebastian Bormann) Verbesserter Slider-Tooltip zur Verringerung der Schriftgröße bei großen Zahlen.

### 0.0 14
* (Sebastian Bormann) Wenn die Rolle des Staates nicht weiter spezifiziert ist, prüfen Sie, ob das übergeordnete Objekt eine Rolle spielt.

### 0.0.13
* (Sebastian Bormann) Türen und Fenster erzwingen jetzt, dass wahr / falsch in geöffnet / geschlossen übersetzt wird.
* (Sebastian Bormann) Doppelte Einträge auf WelcomeScreen / Übersicht entfernt.
* (Sebastian Bormann) Zustände werden jetzt mit dem richtigen Werttyp gesetzt.
* (Sebastian Bormann) Die Erkennung von Staatstypen wurde geändert. Ich hoffe es gibt jetzt keine neuen Bugs!

### 0.0.12
* (Sebastian Bormann) Überprüfen Sie die Objektnamen auf nicht zulässige Zeichen.
* (Sebastian Bormann) Überprüfen Sie die Ansichtsnamen auf Duplikate.
* (Sebastian Bormann) Level löst einen Schieberegler im Dialog aus - auch wenn er eine Statusliste hat (wieder HUE :)).
* (Sebastian Bormann) Blinds (Homematic) hinzugefügt - bitte testen Sie es, ich habe keine zu testen.

### 0.0.11
* (Sebastian Bormann) Kompatibilität für Edge und Firefox hinzugefügt.
* (Sebastian Bormann) Wieder Hue Bugfixes.
* (Sebastian Bormann) Tooltip aus der Symbolleiste entfernt.

### 0.0.10
* (Sebastian Bormann) ColorTemperature hinzugefügt. Hoepfully HUE funktioniert jetzt? Kann nicht testen ist, weil ich keine Farbtonlampe besitze :)

### 0.0.9
* (Sebastian Bormann) Philips HUE wurde zur automatischen Erstellung hinzugefügt (Colortemp funktioniert noch nicht!).
* (Sebastian Bormann) LinkedView funktioniert jetzt auch mit Fenstern, Türen und Feuersensoren.
* (Sebastian Bormann) Übersetzung hinzugefügt (danke ldittmar!).

### 0.0.8
* (Sebastian Bormann) Symbole zu Bildauswahlfeldern hinzugefügt.

### 0.0.7
* (Sebastian Bormann) Die Reihenfolge der Registerkarten wurde geändert
* (Sebastian Bormann) Autocreate für Shelly sollte jetzt funktionieren (ich hoffe es, kann es hier nicht testen)

### 0.0.6
* (Sebastian Bormann) Verbesserte Geschwindigkeit beim Auswählen der ID und beim automatischen Erstellen
* (Sebastian Bormann) Setzt den Filter beim automatischen Erstellen auf Kanal

### 0.0.5
* (Sebastian Bormann) Bugfix: Die Erstellung vieler Geräte sollte jetzt funktionieren

### 0.0.4
* (Sebastian Bormann) Bugfix: Kopiergerät hat nur einen Verweis auf altes Objekt erstellt
* (Sebastian Bormann) Fügt Symbolleisten-Symbole hinzu

### 0.0.3
* (Sebastian Bormann) verschiedene Bugfixes

### 0.0.2
* (Sebastian Bormann) erste teilweise laufende Version

### 0.0.1
* (Sebastian Bormann) Erstveröffentlichung

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