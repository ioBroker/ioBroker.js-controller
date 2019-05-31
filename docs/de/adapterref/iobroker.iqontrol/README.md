---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iqontrol/README.md
title: kein Titel
hash: 7pR92s+CFBEhp650wrHpmMzulu2u6AostexQBUBBzOw=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.iqontrol.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.iqontrol.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/sbormann/iobroker.iqontrol.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/sbormann/ioBroker.iqontrol/badge.svg)
![NPM](https://nodei.co/npm/iobroker.iqontrol.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/sbormann/ioBroker.iqontrol/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/sbormann/ioBroker.iqontrol?branch=master&svg=true)

<h1><img src="admin/iqontrol.png" width="64"/> ioBroker.iqontrol </h1>

## Iqontrol Adapter für ioBroker
Schnelle Web-App zur Visualisierung.

![Beispiel](img/screenshot1.jpg) ![Beispiel](../../../en/adapterref/iobroker.iqontrol/img/screenshot2.jpg)

Läuft in jedem Browser.
Sie können es als Web-App auf iOS-Homescreen speichern und es sieht aus und fühlt sich an wie eine native App.
Es ist vollständig anpassbar.

## Du brauchst...
* Nodejs 8 oder höher
* socketIO muss im Web-Adapter aktiviert sein

## Wie benutzt man
* Starten Sie die Erstellung von Ansichten.

Sie können Ansichten als Seiten betrachten.

* Erstellen Sie dann Geräte in diesen Ansichten.

Geräte haben eine Rolle, die die Funktion des Geräts festlegt, welche Symbole verwendet werden und so weiter.
Abhängig von dieser Rolle können Sie mehrere Status mit dem Gerät verknüpfen. Dadurch erhält das Gerät seine Funktionalität.
Wenn Sie als Rolle "Mit anderer Ansicht verknüpfen" auswählen, können Sie Verknüpfungen zu anderen Ansichten erstellen. Ich schlage vor, Verknüpfungen zu anderen Ansichten mit demselben Hintergrund wie die verknüpfte Ansicht zu erstellen.
Sie können auch versuchen, die Autocreate-Funktion zu verwenden, um ein vorhandenes Gerät aus dem iobroker-Objektbaum auszuwählen. Autocreate versucht, die Rolle herauszufinden und so viele Status wie möglich zuzuordnen.

* Anschließend können Sie eine Symbolleiste erstellen, die als Fußzeile angezeigt wird.

Toolbar-Einträge sind Links zu Views.
Der erste Toolbar-Eintrag ist Ihre 'Home-View', mit der beim Start geladen wird.

* Um allem einen ausgefallenen Stil zu verleihen, können Sie Ihre eigenen Bilder hochladen.

Sie können Ihre Bilder als Hintergrundbilder für Ansichten oder für Geräte verwenden.
Die kostenlosen eingebauten Demotapeten sind von www.pexels.com.

## Bekannte Probleme
Dies ist das erste Alpha-Release, daher kann es zu vielen Fehlern kommen. Aber für mich läuft es völlig stabil.
Es gibt jedoch einige Einschränkungen:

- Das Hochladen von Bildern (als Hintergrundbild oder zum Skinnen von Gerätetasten) funktioniert, aber das Umbenennen und Löschen funktioniert nicht
- Das Erstellen und Löschen von Unterverzeichnissen funktioniert ebenfalls nicht.

Sie können diese Operationen manuell über ftp unter iobroker / iobroker-data / files / iqontrol / userimages ausführen

Bitte zögern Sie nicht zu kommentieren und lassen Sie mich wissen, wie Sie diese Probleme beheben können!

Besuchen Sie [iobroker forum](https://forum.iobroker.net/topic/22039/neuer-adapter-visualisierung-iqontrol).

## Beschreibung der Rollen und zugehörigen Zustände
Jedes Gerät hat eine Rolle, die die Funktion des Geräts definiert. Jede Rolle generiert eine Reihe von Status, die mit einem entsprechenden io-Broker-Status verknüpft werden können.
Wenn Sie die Auto-Create-Funktion verwenden, können Sie ein vorhandenes Gerät aus dem io-Broker-Objektbaum auswählen. Autocreate versucht, die Rolle herauszufinden und so viele Status wie möglich zuzuordnen.
Dies funktioniert nur bei bekannten Geräten. Bei unbekannten Geräten können Sie Geräte manuell über die (+) - Taste hinzufügen oder die von Autocreate erstellten Geräte bearbeiten, um erweiterte Funktionen zu erhalten.
Um die Rolle und den Status eines Geräts zu bearbeiten, klicken Sie auf den Stift hinter dem Gerät. Nachfolgend finden Sie eine kurze Beschreibung der Rollen und der verwendeten Zustände:

### Allgemeine Zustände:
Jede Rolle hat die folgenden drei Zustände:

* BATTERY: Boolean - Wenn true, wird ein kleines Batterie-Leer-Symbol angezeigt
* ERROR: boolean - wenn true, wird ein kleines Ausrufezeichen angezeigt
* UNREACH: Boolean - Wenn true, wird ein kleines WLAN-Symbol angezeigt

Fast alle Rollen haben einen STATE- und / oder einen LEVEL-Status. In den meisten Fällen ist dies die Hauptfunktion des Geräts. Sie können ihm io-Broker-Status der folgenden Typen zuweisen:

* boolean - wenn möglich, wird es in einen sinnvollen Text wie 'ein / aus', 'geöffnet / geschlossen' oder ähnliches übersetzt. Wenn Sie auf das Symbol einer Kachel klicken, wird versucht, den Booleschen Wert umzuschalten (z. B. um ein Licht ein- oder auszuschalten). Wenn es nicht schreibgeschützt ist, wird im Dialogfeld ein Kippschalter generiert.
* Zahl - wird mit der entsprechenden Einheit angezeigt und erzeugt einen Schieberegler im Dialog.
* string - ein anzuzeigender Text
* Werteliste - der ausgewählte Wert wird angezeigt. Wenn es nicht schreibgeschützt ist, wird im Dialogfeld ein Dropdown-Menü erstellt. Technisch gesehen ist eine Werteliste eine Zahl mit einer entsprechenden Übersetzungsliste, die in der Eigenschaft 'native.states' definiert ist.

Allerdings ist nicht jeder Typ für jede Rolle sinnvoll. So ist beispielsweise der Status eines Switches in den meisten Fällen ein Boolescher Wert, um zwischen Ein und Aus umschalten zu können. Möglicherweise wird eine Zeichenfolge angezeigt, der Schalter ist jedoch nicht funktionsfähig.

### Link zu anderer Ansicht:
* Hat keine weiteren Zustände, berücksichtigt aber die Eigenschaft der verknüpften Ansicht

### <img src="img/icons/switch_on.png" width="32"> Schalter, <img src="img/icons/fan_on.png" width="32"> Ventilator:
* STATE: Boolean - Anzeigen und Ein- / Ausschalten
* POWER: number - Stromverbrauch, der in der oberen rechten Ecke klein angezeigt wird

### <img src="img/icons/light_on.png" width="32"> Licht:
Jedes Licht kann einen oder beide der folgenden Zustände haben:

* STATE: Boolean - Anzeigen und Ein- / Ausschalten
* LEVEL: number - Zeigt die eingestellte Lichtstärke an

Optional können Sie folgende Zustände definieren:

* HUE: Nummer - Farbe des Lichts
* CT: Zahl - Farbtemperatur des Lichts
* POWER: Zahl - Stromverbrauch, der in der oberen rechten Ecke klein angezeigt wird - aber nur, wenn CT nicht angegeben ist (ansonsten wird CT angezeigt und POWER wird ignoriert)

### <img src="img/icons/radiator.png" width="32"> Thermostat:
* SET_TEMPERATURE: Zahl - Zieltemperatur
* TEMPERATUR: Zahl - Die tatsächliche Temperatur, die in der oberen rechten Ecke angezeigt werden soll
* FEUCHTIGKEIT: Zahl - Die tatsächliche Luftfeuchtigkeit wird in der oberen rechten Ecke klein angezeigt
* CONTROL_MODE: Werteliste - Anzeige und Einstellung des Thermostatmodus
* VALVE_STATES: Array mit Namen und Nummern - Zeigt die Öffnung in Prozent der dem Thermostat zugeordneten Ventile an

### <img src="img/icons/radiator.png" width="32"> Homematic-Thermostat:
Zusätzlich zum normalen Thermostat können Sie Folgendes definieren:

* PARTY_TEMPERATURE: string - speziell formatierter String zur Definition des Party- oder Urlaubsmodus von Homematic-Thermostaten
* BOOST_STATE: number - zeigt die verbleibende Boost-Zeit von Homematic-Thermostaten an

### <img src="img/icons/temperature.png" width="32"> Temperatursensor, <img src="img/icons/humidity.png" width="32"> Feuchte-Sensor:
* STATE: number - Temperatur oder Luftfeuchtigkeit, die im unteren Teil des Geräts angezeigt wird
* TEMPERATUR: Zahl - Temperatur, die in der oberen rechten Ecke klein angezeigt wird
* FEUCHTIGKEIT: Zahl - Luftfeuchtigkeit, die in der oberen rechten Ecke klein angezeigt wird
* Respektiert die Eigenschaft "Verknüpfte Ansicht"

### <img src="img/icons/brightness_light.png" width="32"> Helligkeitssensor:
* STATE: number - Helligkeit, die im unteren Teil des Geräts angezeigt wird
* HELLIGKEIT: Zahl - Helligkeit, die in der oberen rechten Ecke klein angezeigt wird
* Respektiert die Eigenschaft "Verknüpfte Ansicht"

### <img src="img/icons/motion_on.png" width="32"> Bewegungssensor:
* STATE: Boolean - Zeigt an, ob eine Bewegung erkannt wurde oder nicht
* Respektiert die Eigenschaft "Verknüpfte Ansicht"

### <img src="img/icons/door_closed.png" width="32"> Tür, <img src="img/icons/window_closed.png" width="32"> Fenster:
* STATE: Boolean - Zeigt an, ob die Tür oder das Fenster geöffnet oder geschlossen ist.
    * Alternativ können Sie eine Werteliste vergeben, um zusätzliche Zustände wie 'Tilted' anzuzeigen.
    * Sie können auch eine Zeichenfolge zuweisen, um einen beliebigen Text wie "3 Fenster geöffnet" oder "Alle geschlossen" anzuzeigen.
* Respektiere die Eigenschaft der verknüpften Ansicht

### <img src="img/icons/door_locked.png" width="32"> Tür mit Schloss:
* STATE: Boolean - Anzeige, ob die Tür geöffnet oder geschlossen ist.
* LOCK_STATE: Boolean - Zeigt an, ob die Tür verriegelt oder entriegelt ist
* LOCK_STATE_UNCERTAIN: boolean - der STATE wird in Kursivschrift angezeigt, wenn true, um anzuzeigen, dass die genaue Position des Schlosses unbekannt ist
* LOCK_OPEN: Boolean - Wenn der Wert auf true gesetzt ist, wird die Tür vollständig geöffnet

### <img src="img/icons/blind_middle.png" width="32"> Blind:
* LEVEL: number - Höhe des Blinds in Prozent
* RICHTUNG: Werteliste - kann Stop, Up und Down sein
* STOP: Boolescher Wert - Wenn der Wert auf true gesetzt ist, stoppt der Blind

### <img src="img/icons/fire_on.png" width="32"> Feuersensor:
* STATE: Boolean - Wenn true, wird der Sensor als ausgelöst angezeigt
    * Alternativ können Sie eine Werteliste zuweisen, um zusätzliche Zustände wie "manipuliert" anzuzeigen.
    * Sie können auch eine Zeichenfolge zuweisen, um Text wie "Feuer im Obergeschoss" anzuzeigen.
* Respektiert die Eigenschaft "Verknüpfte Ansicht"

### <img src="img/icons/alarm_on.png" width="32"> Alarm:
* STATE: Boolean - Wenn true, wird der Sensor als ausgelöst angezeigt
    * Alternativ können Sie eine Werteliste zuweisen, um zusätzliche Zustände wie "manipuliert" anzuzeigen.
    * Sie können auch eine Zeichenfolge zuweisen, um Text wie "Feuer im Obergeschoss" anzuzeigen.

### <img src="img/icons/value_on.png" width="32"> Wert:
* STATE: jeder gültige Zustand, der angezeigt werden soll (siehe Abschnitt "Allgemeine Zustände")
* LEVEL: number - Erzeugt einen Schieberegler im Dialog

### <img src="img/icons/play_on.png" width="32"> Programm:
* STATE: boolean - wenn auf true gesetzt, wird das Programm gestartet

### <img src="img/icons/play.png" width="32"> Szene:
* STATE: Boolean - Zeigt an, ob die Szene aktiv ist. Bei true wird die Szene gestartet

### <img src="img/icons/button.png" width="32"> Taste:
* STATE: any - jede gewünschte Art von Staat
* SET_VALUE: CONSTANT string - Dies ist eine Konstante (kein verknüpfter io-Broker-Status!), Die dem STATE zugewiesen wird, wenn der Schalter gedrückt wird

### <img src="img/icons/popup.png" width="32"> Pop-up:
* STATE: any - kann zur Anzeige weiterer Informationen verwendet werden
* URL: CONSTANT string - Diese URL wird als iframe in Popup geöffnet
* HTML: CONSTANT string - Dieses Markup wird im Popup angezeigt, wenn keine URL angegeben ist

### <img src="img/icons/link.png" width="32"> Externer Link:
* STATE: any - kann zur Anzeige weiterer Informationen verwendet werden
* URL: CONSTANT string - Diese URL wird geöffnet

## Entwickeln
* Siehe [Funktionsweise des Frontends] (Funktionsweise von% 20Principle% 20of% 20Frontend.md)

## Changelog

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

Copyright (c) 2019 Sebastian Bormann

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