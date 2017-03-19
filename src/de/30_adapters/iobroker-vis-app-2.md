WEB-Visualisierung für ioBroker Plattform als Android-App. Diese App ist konzipiert für Smartphone und Tablet. Das Vis-Projekt und alle Bilder werden auf dem Smartphone gespeichert um den mobilen Datenverkehr zu verringern.

## Verwendung

Diese App benötigt einen installierten, aktivierten Web-Adapter oder socket-io-Adapter und einen installierten vis-Adapter. Bei aktiviertem Web-Server, muss das interne Socket-IO-Interface aktiviert sein. In Vis sollte ein Projekt vorhanden sein, z.B. "Main". Die Ports und der ioBroker Server muss vom Mobiltelefon erreichbar sein. Installiert wird die App über den App Store. Nachdem die Anwendung zum ersten Mal startet, sollte der Einstellungsdialog automatisch geöffnet werden. Um die Arbeit mit der App zu starten öffne die Einstellungen. Um die Einstellungen anzuzeigen, drücke die halbtransparenten Schaltfläche in der linken oberen Ecke.

## Einstellungen

Fast alle Einstellungen sind optional mit Ausnahme von "WIFI Socket" und "Projekt".

### Buttons

*   *Neu laden* - Lädt die Web-Engine neu, als würde man die Schaltfläche "Aktualisieren" im Browser drücken.
*   *Re-Sync* - Wenn einige Änderungen an dem Vis-Projekt vorgenommen wurden, wird es **nicht** automatisch in die App geladen. Dazu, muss die "Re-Sync" Taste gedrückt werden. Alle Projektdateien und Bilder werden auf dem Smartphone neu geladen. Das wird gemacht, um den mobilen Datenverkehr zu verringern und den Start der Anwendung zu beschleunigen. Das Lesen der Dateien von der internen SD-Card ist viel schneller, als vom ioBroker Server. Wenn die Option *Schlafen, falls inaktiv* aktiviert ist, darf während der Synchronisation das Telefon nicht inaktiv werden, da ansonsten die Socket.io-Verbindung unterbrochen und die Synchronisation abgebrochen wird.
*   *OK* - Alle Änderungen speichern und die WEB-Engine neu starten. Es wird keine Synchronisation durchgeführt, wenn das Projekt noch nicht definiert wurde. Um Änderungen vom ioBroker Vis-Projekt neu zu laden benutzen Sie die "Re-Sync" -Taste.
*   *Abbrechen* - Alle Änderungen verwerfen und Dialog schließen.

### Konnektivität

Die App kann über den SSID-Namen erkennen, ob das Smartphone im Heimnetzwerk oder außerhalb des Heimnetzwerkes ist und benutzt für das Heimnetzwerk und für Außerhalb verschiedenen Socket-URLs und Login-Daten. Normalerweise gibt es im Heimnetzwerk keine Authentifizierung und die Verbindung läuft über HTTP (unsicher). Im externen Netzwerk geht die Verbindung über https (verschlüsselt) und mit Login / Passwort.

*   *Verbunden* - zeigt an, ob die App mit ioBroker Server verbunden ist. WiFi Verbindung
*   *SSID Name* - Der oder die Namen (geteilt durch Komma) der Heimnetzwerk SSID. Es wird für die Verbindung die Anmeldeinformationen und die Home-URL des Heimnetzwerks verwendet.
*   *Socket URL* - URL wie z.B. `http://192.168.0.5:8082`. Es ist wichtig, http oder https zu Beginn zu haben, dadurch kann die App zwischen sicheren und unsicheren Verbindungen unterscheiden. Der Port ist auch wichtig. Normalerweise 8082 für *Web* oder 8084 für *socketio*.
*   *Anwender* - Wenn für die Socket-Kommunikation die Authentifizierung aktiviert ist, tragen Sie hier den Benutzernamen von iobroker ein. Benutzer müssen zunächst über die "admin" Schnittstelle erstellt werden. Der Benutzer "admin" existiert immer und kann nicht gelöscht werden.
*   *Kennwort* - Benutzer-Passwort, wie in ioBroker gesetzt
*   *Kennwort-Wiederholung* - Wiederholung des Benutzer-Passworts

Folgende Einstellungen sind nur aktiv, wenn einige SSID angegeben sind und das Gerät sich derzeit außerhalb dieser SSID befindet. Mobile Verbindung

*   *Socket URL* - Das Gleiche wie *WIFI Socket*, wird aber außerhalb des Heimnetzes verwendet.
*   *Anwender* - Das Gleiche wie *WIFI Anwender*, wird aber außerhalb des Heimnetzes verwendet.
*   *Kennwort* - Das Gleiche wie *WIFI Password*, wird aber außerhalb des Heimnetzes verwendet.
*   *Kennwort-Wiederholung* - das gleiche wie *WIFI Kennwort wiederholen*, wird aber außerhalb des Heimnetzes verwendet.

### Projektname und Spracheinstellungen

*   *Language/Sprache* - Sprache des Einstellungs-Dialogs. Englisch, Deutsch und Russisch werden unterstützt. Um die Änderungen zu aktivieren, * OK * Taste drücken.
*   *Projekt* - Projektname von ioBroker. Wenn kein Projektname angezeigt wird, besteht keine Verbindung mit iobroker oder es existiert kein Projekt.

### Andere Einstellungen

*   *Ersatz URL* - Wenn Ihr vis Projekt Links für Bilder aus einer lokalen Netzwerk URL verwendet (die von der ioBroker URL abweicht), können Sie hier diese URL angeben und alle Bilder die im Vis-Projekt verwendet werden, werden von diesem Server auf das Smartphone geladen.
*   *Instanz* - Eindeutige Instanz-ID dieses VIS. Diese ist erforderlich um gezielt Befehle nur zu dieser Vis Instanz zu senden. (Siehe [Control interface](#control-interface) für weitere Details)
*   *Schlafen im Hintergrund* - Wenn die Vis App nicht angezeigt wird (aber im Hintergrund läuft), kann die Kommunikation zum iobroker Server gestoppt werden. In diesem Fall werden die Statusaktualisierungen und Befehle von ioBroker nicht zur App übertragen, auch wenn die App im Hintergrund läuft.

### Spracherkennung

Sie können die Spracherkennung in der Anwendung aktivieren. Wenn diese Option aktiviert ist, wird von der App kontinuierlich versucht Befehle zu erkennen. Um festzustellen, ob Sie mit der App oder mit jemand anderem sprechen, kann ein Schlüsselwort festgelegt werden. Bitte wählen Sie ein Wort, das gut erkannt werden kann und nicht im täglichen Gebrauch verwendet wird. Zur Erkennung von Befehlen im erkannten Text wird der text2command Adapter verwendet. Bitte lesen Sie die Beschreibungen dieses Adapters auf [github](https://github.com/ioBroker/ioBroker.text2command) oder [iobroker.net](http://iobroker.net). Natürlich muss eine Instanz des text2command Adapters installiert werden. *Hinweis*: In diesem Fall werden alle Stimmen auf die Google-Server gesendet, wenn keine Offline-Spracherkennung aktiviert ist. Aktivierungsanweisung finden Sie [hier](http://stackandroid.com/tutorial/how-to-enable-offline-speech-to-text-in-android/). *Hinweis*: Im Erkennungsmodus "Piept" Android alle 10-15 Sekunden. Zur Unterdrückung wird die Lautstärke auf 0 gesetzt. Sie können trotzdem "Text2Speech" benutzen, um Befehle und Sätze zu sprechen oder die Audio Wiedergabe zu starten.

*   *Spracherkennung aktiv* - Spracherkennung aktivieren oder deaktivieren.
*   *Stichwort* - Wenn im erkannten Satz dieses Wort (oder Satz) gefunden wird, wird dieser Text auf die "text2command" Instanz geschickt. Es ist nicht erforderlich das Schlüsselwort am Anfang des Satzes zu verwenden. Wird auf das Schlüsselwort verzichtet, werden alle Wörter an die text2command Instanz gesendet.
*   *Text2command Instanz* - Zahl der text2command Instanz. Normalerweise 0.
*   *Lautstärke* - Lautstärke für die Antworten und für die Text-to-Speech-Befehle. Ansonsten wird die Lautstärke auf 0 gesetzt.
*   *Standard-Raum* - Wenn Ihr mobiles Gerät in einem bestimmten Raum befestigt ist, z.B. im Schlafzimmer ist es nicht notwendig, jedes Mal "Schalte das Licht im Schlafzimmer an" zu sagen. Es sollte reichen "" das Licht einschalten " zu sagen. Um das zu aktivieren kann ein Standart Raum Name definiert werden. Wenn text2command keinen Raumnamen in dem Satz findet, wird für die Befehlsausführung der Standardraumnamen verwendet.
*   *Antwort über TTS* - Wenn aktiviert, werden die Antworten von text2command über die Text-to-Speech-Engine ausgegeben. Natürlich muss eine TTS-Engine auf dem Android-Gerät installiert und aktiviert werden.

### Batterie und Standort

Es gibt eine Möglichkeit, dem Server die Position und den Batteriestatus zu melden. - _Gerätename_ - Der Gerätename wird verwendet, um den Status auf dem Server zu erzeugen (siehe unten). - _Melde Batteriestatus_ - Angabe, ob der Batteriestatus an den Server gemeldet werden soll, oder nicht. Nur Änderungen des Batteriestandes oder der angeschlossene Zustand der Batterie werden gemeldet; keine zyklische Aktualisierung. - _Sendeintervall der Position (in Sekunden)_ - Angabe, ob die Postion an den Server gemeldet werden soll. Die Position wird sowohl nach einer Änderung als auch zyklisch übertragen. Um die Meldung der Position zu beenden, setze das Intervall auf Null (z.B. aus Energiespargründen). - _Postion mit hoher Genauigkeit_ - Angabe, ob die Position mit hoher Genauigkeit erfolgen muss, oder nicht. Eine hohe Genauigkeit führt zu einem erhöhten Energieverbrauch. Die folgenden Zustände werden erzeugt, wenn eine Meldung des Batteriestatus aktiviert ist: - _vis.0.<Gerätename>.battery.**level**_ - Batterieladezustand in Prozent. - _vis.0.<Gerätename>.battery.**isPlugged**_ - Angabe als boolscher Wert, ob das Gerät mit dem Stromnetz verbunden ist. Der Batteriezustand wird aktualisiert, wenn sich der Ladezustand der Batterie um mindestens 1 % verändert oder wenn das Gerät angeschlossen oder abgesteckt wurde. Die folgenden Zustände werden erzeugt, wenn das Sendeintervall der Position nicht Null beträgt: - _vis.0.<Gerätename>.coords.**latitude**_ - Breitengrad als Dezimalwert. - _vis.0.<Gerätename>.coords.**longitude**_ - Längengrad als Dezimalwert. - _vis.0.<Gerätename>.coords.**accuracy**_ - Grad der Genauigkeit für Breiten- und Längengrad in Metern. Die folgenden Zustände sind nicht auf allen Geräten verfügbar: - _vis.0.<Gerätename>.coords.**altitude**_ - Höhe der Position über dem Referenzellipsoid in Metern. - _vis.0.<Gerätename>.coords.**altitudeAccuracy**_ - Genauigkeit der Höhe in Metern. - _vis.0.<Gerätename>.coords.**heading**_ - Bewegungsrichtung im Uhrzeigersinn bezogen auf den geographischen Norden in Grad. - _vis.0.<Gerätename>.coords.**spee**d_ - aktuelle Geschwindigkeit des Geräts in m/s. - _vis.0.<Gerätename>.coords.**speedKm**_ - aktuelle Geschwindigkeit des Geräts in km/h.

### Visualisierung und Verhalten

*   *Ausrichtung* - Ausrichtung des Views: **auto**, **landscape** oder **portrait**. Wenn **auto** ausgewählt ist, wird die Ausrichtung automatisch erkannt.
*   *Verhindere Schlafmodus* - Wenn aktiviert, wird das Gerät nie in den Ruhemodus versetzt und das Display bleibt immer an. (Funktioniert nicht auf allen Geräten)
*   *Erlaube Fenster Verschiebung* - Wenn aktiviert, ist Schwenken und Zoomen auf den Views erlaubt.
*   *Vollbild* - Verwenden Sie den Vollbildmodus auf Geräten mit Software-Tasten (Home, Einstellungen, Zurück).
*   *Zoom Stufe Portrait* - Zoom in Prozent im Portrait-Modus. Nicht zu gering einstellen, sonst kann der Einstellungsdialog nicht mehr aufgerufen werden. Die Standardeinstellung ist 100% und kann nicht unter 20% festgelegt werden.
*   *Zoom Stufe Landscape* - Das Gleiche wie *Zoom Stufe Portrait*, für die Landscape Ansicht.

### Zugriff auf Bilder und andere Ressourcen

Die App kopiert bei der Synchronisation die Views des ausgewählten Projekts und alle darin referenzierten Bilder lokal auf das Mobiltelefon (Gerätespeicher). Folgende Inhalte werden kopiert: - Alle Dateien im ausgewählten Projektverzeichnis mit den Dateiendungen `.png .jpg .jpeg .gif` - Alle Bilder mit den Dateiendungen `.png .jpg .jpeg .gif` sowie Dateien mit der Endung `.wav .mp3 .bmp .svg`, welche sich ein einem Adapterverzeichnis unter [iobroker-Datenverzeichnis]/files/ befinden und im View angegeben sind und bei denen im ersten Unterverzeichnis unter [iobroker-Datenverzeichnis]/files/ ein "." im Verzeichnisnamen ist. Damit die App die Pfade richtig ersetzt, müssen die Dateien mit einem absoluten lokalen Pfad angegeben werden (z.B. /vis.0/main/img/test.png). Relative Pfadangaben werden nicht unterstützt. Wenn Pfade in den Widgets in HTML eingebettet ist, muss die Schreibweise genau dem folgenden Muster entsprechen `... src='/vis.0/main...'` oder `... src="/vis.0/main..."`. Andere Schreibweisen werden nicht erkannt. Zusätzlich kann in den Einstellungen eine *Substitution URL* angegeben werden. Hierbei handelt es sich um die externe URL des Webservers von VIS. Alle URL, die mit der angegebenen Zeichenfolge anfangen, werden ebenfalls so behandelt, als ob es lokale Dateien sind (z.B. `https://[meine Domain]/visweb`). Die Ersetzung von Pfaden zur Laufzeit beschränkt sich zurzeit auf die folgenden Widgets:

*   basic string (unescaped)
*   basic string src
*   basic json table

Da die Werte erst zur Laufzeit übermittelt werden, sind die Dateien nur dann lokal vorhanden, falls sie sich im Projektverzeichnis befinden oder bereits durch ein statisch konfiguriertes Widget referenziert wurden. Es findet kein Nachladen fehlender Bilder statt. Die als separate Adapter angebotenen Icon-Sammlungen sind kein Bestandteil der App, aber die werden auch mit kopiert, wenn die Dateien in den View referenziert werden. Auf andere Ressourcen kann innerhalb der App zugegriffen werden, wenn diese in den Views mit einem vollständigen Pfad beginnend mit http:// oder https:// angegeben werden. Diese Dateien werden nicht bei der Synchronsitation lokal auf das Gerät geladen, sondern erst bei der Anzeige der Views direkt vom jeweiligen Server. Sollte der Zugriff auf die Datei mittels http-Authentifizierung gesichert sein, so können die Credentials in der folgenden Form in der URL eingebettet werden: `https://[username]:[password]@[meine Domain]/vis.0/main/...`

### Verwendung von Web-Modulen anderer Adapter als VIS

Auch andere Adapter als VIS können Web-Inhalte bereitstellen. Diese Inhalte können innerhalb der VIS-Views in iFrames angezeigt werden. Dies trifft insbesondere auf die beiden Adapter Flot und Rickshaw Charts zu. Zurzeit sind nur die Client-Bestandteile der folgenden Adapter in die App integriert:

*   Flot
*   Rickshaw

Um die lokale Version von Flot nutzen zu können, muss die Quelle des iFrame mit `/flot/index.html?` beginnen. Andere Inhalte und auch die Inhalte anderer Server wie z.B. Webcams können ebenfalls angezeigt werden, wenn hierfür eine vollständige URL zum entsprechenden Server verwendet wird.

### Beenden der App

Die App kann wie bei Android üblich über die Home-Taste verlassen werden. In diesem Fall läuft sie jedoch im Hintergrund weiter und verbraucht weiterhin Datenvolumen und Akku. Durch die Option *Schlafen, falls inaktiv* kann der Verbrauch reduziert werden. In diesem Fall wird die Socket.io-Verbindung jedoch jedes mal unterbrochen, wenn die App inaktiv wird. Die App kann auch durch zweimaliges schnelles Drücken auf die Zurücktaste geschlossen werden. In diesem Fall wird die App vollständig geschlossen. Zusätzlich bietet die App eine Möglichkeit, diese vollständig zu beenden. Hierfür ist in den Views ein basic static link-Widget einzufügen, welches als Link den folgenden Text enthält: `javascript:logout ()` Nachfolgend befindet sich ein entsprechendes Widget zum Import in VIS: `[{"tpl":"tplIconLink","data":{"href":"javascript:logout ();","target":"_self","text":"","views":null,"src":"/icons-material-png/action/ic_exit_to_app_black_48dp.png","name":"","class":""},"style":{"left":"10px","top":"10px","z-index":"106","background":"none","border-style":"none","color":"#000000","font-family":"Arial, Helvetica, sans-serif","font-size":"large","letter-spacing":"","font-weight":"bold","width":"34px","height":"32px"},"widgetSet":"jqui"}]` oder mit vis > 0.10.6 `[{"tpl":"tplHtmlLogout","data":{"html":"<button>Schließen</button>","in_app_close":true},"style":{"left":"10px","top":"10px"},"widgetSet":"basic"}]`

## Benutzerspezifische Anpassungen der App

Die in diesem Abschnitt beschriebenen Änderungen sind nur für fortgeschrittene Benutzer gedacht, die diese Änderungen auf eigene Gefahr durchführen. Die Änderungen erfolgen ausschließlich über Javascript oder Anpassungen in der Projektdatei in VIS. Sollte die App aufgrund fehlerhafter Änderungen nicht mehr funktionieren, so können die lokalen Projektdateien durch Löschen der Anwendungsdaten in den Android Systemeinstellungen gelöscht und die Anwendung hierdurch wieder zurückgesetzt werden.

### Ausblenden des Menü-Button

Die App blendet oben links einen transparenten Schalter mit drei Punkten ein, um auf die Einstellungsseite zu gelangen. Wenn die folgenden Zeilen im VIS-Editor unter **Skripte** eingetragen wird, wird die Fläche ausgeblendet, sobald die Views in der App geladen wurden: `// Menu ausblenden if (typeof app !== 'undefined') $('#cordova_menu').hide();` Um auf die Einstellungsseite zu gelangen, muss das Drücken des Schalters nun direkt nach dem Start der App erfolgen, solange der Schalter angezeigt wird. Alternativ kann ein eigenes Widget zum Aufruf der Einstellungsseite in den Views platziert werden.

### Eigener Menü-Button

Das folgende Widget ruft die Einstellungsseite auf, wenn der View innerhalb der App angezeigt wird: `[{"tpl":"tplIconLink","data":{"href":"javascript:$('#cordova_menu').trigger('click');","target":"_self","text":"","src":"/icons-material-svg/action/ic_build_48px.svg","name":"","gestures-swiping-delta":"-1","class":""},"style":{"left":"1087px","top":"761px","z-index":"106","background":"none","border-style":"none","color":"#000000","font-family":"Arial, Helvetica, sans-serif","font-size":"large","letter-spacing":"","font-weight":"bold","width":"29px","height":"28px"},"widgetSet":"jqui"}]`

### View-Wechsel durch horizontales Streichen über den aktuellen View (swipe)

Das nachfolgende Javascript ist im VIS-Editor unter **Skripte** eingetragen und im Array die eigenen Views in der Reihenfolge einzutragen, in der der Wechsel erfolgen soll. Eine Streichbewegung über den View von rechts nach links wechselt zu dem View, der im Array hinter dem aktuellen View steht. Eine Streichbewegung über den View von links nach rechts wechselt zu dem View, der im Array vor dem aktuellen View steht. Wenn das Array-Ende bzw. der Anfang erreicht ist, wird wieder mit dem ersten bzw. letzen Eintrag fortgefahren.

<pre class="lang:js decode:true ">var viewOrder = ['View 1','View 2','View 3','View 4','View 5','View 6'];

$(document).on('swipe', function (event){

event.preventDefault();
if (event.originalEvent.touch.delta.x < -200 && event.originalEvent.touch.delta.y > -30 && event.originalEvent.touch.delta.y < 30) {
if (viewOrder.indexOf(vis.activeView) < viewOrder.length - 2)
vis.changeView(viewOrder[viewOrder.indexOf(vis.activeView) + 1]);
else
vis.changeView(viewOrder[0]);
} else
if (event.originalEvent.touch.delta.x > 200 && event.originalEvent.touch.delta.y > -30 && event.originalEvent.touch.delta.y < 30) {
if (viewOrder.indexOf(vis.activeView) > 0)
vis.changeView(viewOrder[viewOrder.indexOf(vis.activeView) - 1]);
else
vis.changeView(viewOrder[viewOrder.length - 1]);
}
});</pre>

Wichtig ist, mit der Streichbewegung nicht auf einem Widget sondern möglichst auf dem Hintergrund zu starten, um nicht versehentlich eine Änderung auszulösen.

## Steuerschnittstelle

Vis erstellt 3 Variablen:

*   Control.instance - Hier wird die Browser-Instanz geschrieben oder FFFFFFFF wenn jeder Browser gesteuert werden soll.
*   Control.data - Parameter für den Befehl. Siehe spezielle Befehlsbeschreibung.
*   Control.command - Befehlsname. Wird diese Variable geschrieben, wird der Befehl ausgelöst. Das bedeutet, bevor der Befehl geschrieben wird, müssen "Instanz" und "Daten" mit Daten gefüllt werden.

Befehle:

*   Alarm - Zeigt ein Alarmfenster in Vis. "Control.data" hat folgendes Format "Meldung, Titel, jquery-Symbol". Titel und jquery-Symbol sind optional. Den Icon-Namen finden Sie [hier] (http://jqueryui.com/themeroller/). Um ein Symbol anzuzeigen "ui-icon-info" schreibe `Message;;info` .
*   Change - Umschalten auf das gewünschte View. In "Control.data" muß der Name des Views stehen. Sie können den Projektname auch als "Projekt / View" festlegen. Standardprojekt ist "main".
*   Refresh - Vis neu laden, zum Beispiel nachdem das Projekt geändert wurde.
*   Reload - Das Gleiche wie Refresh.
*   Dialog - Dialogfenster anzeigen. Dialog muss im View existieren. Ein Dialog von z.B.:
*   "static - HTML - Dialog",
*   "static - Icon - Dialog",
*   "container - HTML - view in jqui Dialog",
*   "container - ext cmd - view in jqui Dialog",
*   "container - Icon - view in jqui Dialog",
*   "container - Button - view in jqui Dialog"."Control.data" muss die ID des Dialog-Widgets haben, z.B. "W00056".
*   Popup - Öffnet ein neues Browserfenster. Der Link muss in "control.data" angegeben werden, zum Beispiel http://google.com
*   Playsound - Spiele Sounddatei ab. Der Link zur Datei wird in "control.data" angegeben, z.B. http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3

Sie können Ihre eigene Datei in Vis laden und dann abspielen zum Beispiel "/vis.0/main/img/myFile.mp3".

*   Tts - Text 2 Speech * Daten * - bestehender Ausdruck, der gesprochen werden soll.

Wenn der Benutzer das View ändert oder beim Start werden die Variablen durch Vis gefüllt

*   "Control.instance": Browser-Instanz und ack = true
*   "Control.data": Projekt und Anzeigename in Form "Projekt / View", z.B. "Main / view" (und ack = true)
*   "Control.command": "changedView" und ack = true

Sie können die JSON-String oder ein Objekt in control.command als `{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}` schreiben. In diesem Fall werden die Instanz und die Daten vom JSON Objekt genommen. Mit einem Befehl im Javascript-Adapter können Sie die Text-to-Speech-Engine von Android aktivieren: `SetState ( 'vis.0.control.command', '{" Beispiel ":" * "," Daten ":" etwas sagen "," Befehl ":" tts "}');`