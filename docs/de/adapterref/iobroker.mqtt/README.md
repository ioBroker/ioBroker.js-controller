---
BADGE-Number of Installations: http://iobroker.live/badges/mqtt-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.mqtt.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.mqtt.svg
BADGE-Tests: https://travis-ci.org/ioBroker/ioBroker.mqtt.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.mqtt.png?downloads=true
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mqtt/README.md
title: MQTT-Server und -Client
hash: PbGM2rozhJS0bXlZoofD+4U/t2XSm4gwwAoilEvHfAk=
---
![](../../../en/adapterref/iobroker.mqtt/MQTT)

# MQTT Server und Client
## Beschreibung
[MQTT](http://mqtt.org/) (Message Queue Telemetry Transport) ist ein Protokoll für die Kommunikation zwischen Geräten (M2M - Machine-to-Machine).
Es verwendet einen Modell-Publisher-Abonnenten, um Nachrichten über das TCP / IP-Protokoll zu senden.
Der zentrale Teil des Protokolls ist der MQTT-Server oder Broker, der Zugriff auf den Herausgeber und den Abonnenten hat. Dieses Protokoll ist sehr primitiv: Ein kurzer Titel ohne Integrität (weshalb die Übertragung zusätzlich zu TCP implementiert wird) enthält keine Einschränkungen für Struktur, Codierung oder Datenbankschema. Einzige Voraussetzung für die Daten in jedem Paket - sie müssen vom Identifier-Informationskanal begleitet werden. Diese Bezeichner-Spezifikation wurde als Themenname bezeichnet.

Das MQTT-Protokoll erfordert einen Datenbroker. Dies ist die zentrale Idee der Technologie. Alle Geräte senden Daten nur an den Broker und erhalten Daten auch nur von ihm. Nach dem Empfang des Pakets sendet der Broker dieses gemäß seinem Abonnement an alle Geräte im Netzwerk. Damit das Gerät vom Broker etwas erhält, muss es ein Thema abonnieren. Themen werden dynamisch beim Abonnement oder bei Ankunft des Pakets mit diesem Thema erstellt. Wenn Sie ein Thema abonnieren, können Sie aufgeben. Daher sind Themen ein praktischer Mechanismus zum Organisieren verschiedener Arten von Beziehungen: Eins-zu-Viele, Viele-Zu-Eins und Viele-Zu-Viele.

**Wichtige Punkte:**

* Die Geräte selbst stellen die Kommunikation mit dem Broker her, sie befinden sich möglicherweise hinter einem NAT und haben keine statischen IP-Adressen.
* Sie können SSL verwenden, um den Datenverkehr zu verschlüsseln.
* MQTT-Broker ermöglichen es Ihnen, eine Verbindung über das WebSocket-Protokoll an Port 80 herzustellen.
* Verschiedene Broker können miteinander verbunden werden, indem Nachrichten voneinander abonniert werden.

## Installation
Die Installation erfolgt auf der Registerkarte **Treiber** des [Verwaltungssystem](http://www.iobroker.net/?page_id=4179&lang=en).
Suchen Sie in der Treibergruppe **Network** eine Zeile mit dem Namen **MQTT Adapter** und drücken Sie die Taste mit dem Plussymbol auf der rechten Seite der Zeile.

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_1.png)

Sie sehen eine Popup-Treiberinstallation, die nach der Installation automatisch geschlossen wird.

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_2.png)

Wenn alles gut geht, erscheint auf der Registerkarte **Einstellungen Treiber** die installierte Instanz des Treibers **mqtt.0**

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_3.png)

## Einstellung
Wie oben erwähnt, impliziert das MQTT-Protokoll einen Broker und Clients. Der ioBroker-Server kann als Broker und Client fungieren.
Einstellung zum Festlegen des Betriebsmodus - Typ (Server / Broker oder Kunde / Abonnent) Berücksichtigen Sie jede Option.

### IoBroker arbeitet als MQTT-Broker
Die Grundeinstellungen für die Verwendung des Servers / Brokers sind im Bild dargestellt:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_4.png)

* **WebSockets verwenden** - Wenn WEB-Sockets für die Verbindung verwendet werden müssen, müssen Sie diese Option installieren. Der TCP-Server wird parallel zum WebSocket-Server ausgeführt.
* **Port** - Der Port für die Verbindung über TCP (Standard ist 1883), ein WebSocket-Server (siehe Option oben) wird an Port +1 (Standard: 1884) ausgeführt.
* **SSL** - Diese Option wird verwendet, wenn der gesamte Datenverkehr (TCP oder WebSocket) verschlüsselt werden soll. Daher müssen Zertifikate angegeben werden. Wählen Sie einfach aus einer Liste von Voreinstellungen (in den Systemeinstellungen angegeben, siehe die [Beschreibung des Systemverwaltungstreibers] (http://www.iobroker.net/?page_id=4179&lang=de)),
* **Authentifizierungseinstellungen** (Benutzername und Kennwort) - Geben Sie ggf. eine bestimmte Benutzerauthentifizierung an. Diese Einstellung wird immer in Verbindung mit der SSL-Verschlüsselungsoption verwendet (um Passwörter nicht im Klartext über eine unsichere Verbindung zu übertragen).
* **Private Werte maskieren** - Die Vorlage (oder mehrere durch Kommas getrennte) zum Filtern der Variablen ioBroker, die an den Client gesendet werden. Sie können Sonderzeichen verwenden, um eine Gruppe von Nachrichten anzugeben (z. B. `memRSS, mqtt.) .0` - können alle Variablenspeicherstatus aller Treiber und aller **mqtt.0-Treiber** Instanzvariablen übertragen werden),
* **Um nur Änderungen zu senden** - Das Senden von Daten an den Client wird nur bei Änderung einer Variablen durchgeführt (wenn der Status einfach aktualisiert wird - der Wert wird nicht geändert, die Kundennachricht wird nicht gesendet) vom Client wird jede Nachricht akzeptiert, auch wenn sich der Wert nicht geändert hat,
* **Um private Werte beim Start anzugeben** - Für jede erfolgreiche Client-Verbindung werden alle bekannten Status (durch den Maskierungsstatus definiert) übertragen -, um dem Client den aktuellen Status des ioBroker mitzuteilen.
* **Beitragsstatus abonniert** - Unmittelbar nach dem Abonnement wird an den Kundenwert der Variable gesendet, auf der es signiert ist (beim ersten Start oder Neustart erhält der Client die Werte der Variablen, auf die er signiert ist, können) zum Initialisieren von Variablen verwendet werden),
* **Das Präfix für alle Werte** - Wenn der angegebene Wert angegeben ist, wird er jedem gesendeten Thema als Präfix hinzugefügt. Wenn Sie beispielsweise iobroker / angeben, werden alle Themen in den folgenden Zeilen gesendet: `iobroker / mqtt / 0 / verbunden ",
* **Ausgabeprotokoll für jede Änderung** - In der Protokolldatei werden Debugging-Informationen für jede Änderung angezeigt.
* **Um nicht nur Befehle, sondern auch den Status zu senden (ack = true)** - Wenn diese Option nicht aktiviert ist, sendet der Client nur Variablen / Befehle mit ack = false. Wenn das Flag gesetzt ist, werden Variablen verwendet unabhängig vom ack-Zustand übertragen werden (false / true),
* **Die maximale Länge des Namens eines Themas** - Die maximale Anzahl von Zeichen für die Beschreibung des Themas einschließlich des Dienstes.

Als ein Beispiel wird der Datenaustausch zwischen dem Client auf der Grundlage von [Arduino-Board](https://www.arduino.cc/) betrachtet, und der Broker ist eine Instanz des mqtt.0-Treibersystems ioBroker.

* - der Kunde - die Gebühr für die Entwicklung von [arduino UNO] (https://www.arduino.cc/de/Main/ArduinoBoardUno) + [Ethernet-Schild] (https://store.arduino.cc/product/A000072) basierend auf W5100-Chip,
* - Für die Arbeit mit dem Ethernet-Board wird der Standard [library] (https://www.arduino.cc/de/Reference/Ethernet) zum Arbeiten mit der MQTT-Bibliothek [Pubsubclient] (https://github.com/knolleary/) verwendet. pubsubclient),
* - der an pin_8 angeschlossene Sensor AM2302 (Temperatur und Luftfeuchtigkeit) für die Umfrage verwendete Bibliothek mit DHTlib mit [DHTlib] (https://github.com/RobTillaart/Arduino/tree/master/libraries/DHTlib), Ressource github.com,
* - led **led_green** ist an pin_9 angeschlossen, Steuerung im diskreten Modus ein / aus
* - Broker - ioBroker-Systemtreiber mqtt.

Themen des Datenaustauschs formatieren:

* `example1 / send_interval` - signierter Client zur Änderung des Übertragungsintervalls der Temperaturwerte und der Luftfeuchtigkeit (int-Wert in Sekunden),
* `example1 / temp` - Client veröffentlicht ein bestimmtes Temperaturintervall mit dem DHT22-Sensor (Float-Typ).
* `example1 / hum` - Client veröffentlicht einen bestimmten Feuchtewertintervall mit dem DHT22-Sensor (Float-Typ).
* `example1 / led` - Der Client ist für die Statusänderung der LED (der Text ein / aus oder 0/1 oder wahr / falsch) abonniert.

Treibereinstellungen sind wie folgt:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_5.png)

Verbindung über TCP (WebSocket ist nicht erforderlich), Standardport 1883 \. Der Client innerhalb des lokalen Netzwerks, also den Datenverkehr zu verschlüsseln und den Benutzer zu authentifizieren, ist nicht erforderlich. Wir senden nur die Änderungen, da der Client sich im Sendeintervall angemeldet hat und Statusinformationen erhalten hat, um Informationen über die Aktualisierung (ohne Änderung des Werts) auf eine Variable zu erhalten, macht keinen Sinn. Um das Abonnement zu veröffentlichen, beachten Sie diese Option. Wenn Sie zum ersten Mal eine Verbindung zum Client herstellen (oder eine Verbindung herstellen), muss er den Status der Variablen kennen, für die er signiert ist (ein aktuelles Sendeintervall und ob die LED angezeigt werden soll) eingeschaltet). Die Einstellung zum Senden der Variablen ack = true oder false ist ebenfalls erwähnenswert, da eine Variable (die den Client signiert hat) jeden Treiber / Skript / VIS ändern kann und alle Änderungen an den Client gesendet werden sollten. Der vollständige Code für das Arduino-Board sieht folgendermaßen aus:

<pre> // Bibliotheken verbinden

#umfassen
#umfassen
#include //https://github.com/knolleary/pubsubclient
#include //https://github.com/RobTillaart/Arduino/tree/master/libraries/DHTlib // Einstellungen eines Netzwerkbytes mac [] = {0xAB, 0xBC, 0xCD, 0xDE, 0xEF, 0x31}; Byte ip [] = {192, 168, 69, 31}; // arduino board IP-Adressbyte mqttserver [] = {192, 168, 69, 51}; // IP-Adresse des ioBroker-Servers
EthernetClient ethClient; void callback (char *topic, byte* payload, vorzeichenlose Länge); PubSubClient-Client (mqttserver, 1883, Rückruf, ethClient);

//Globale Variablen

#define LED_pin 9 unsigned int send_interval = 10; // das Sendeintervall der Meldungen an den Server, standardmäßig 10 Sekunden ohne Vorzeichen long last_time = 0; // die aktuelle Uhrzeit für den Timer dht DHT;
#define DHT22_PIN 8 Char Buff [20];
// Die Verarbeitungsfunktion für eingehende Verbindungen - Empfang von Daten in einem Abonnement void Callback (Char * Topic, Byte * Payload, unsigned int length) {Serial.println (""); Serial.println ("-------"); Serial.println ("Neuer Rückruf von MQTT-Broker"); // Lassen Sie uns ein Thema (Thema) und einen Wert (Payload) in eine Zeile Payload umwandeln [length] = '\ 0'; String strTopic = String (Thema); String strPayload = String ((char *) Nutzlast); // Untersuchung, die vom Server in einem Abonnement "angekommen" ist: // Änderung eines Abfrageintervalls if (strTopic == "example1 / send_interval") {int tmp = strPayload.toInt (); if (tmp == 0) {send_interval = 10; } else {send_interval = strPayload.toInt (); }} // Steuerung einer LED if (strTopic == "example1 / led") {if (strPayload == "off" || strPayload == "0" || strPayload == "false") digitalWrite (LED_pin, LOW.) ); if (strPayload == "on" || strPayload == "1" || strPayload == "true") digitalWrite (LED_pin, HIGH); } Serial.print (strTopic); Serialdruck (""); Serial.println (strPayload); Serial.println ("-------"); Serial.println (""); }

void setup () {Serial.begin (9600); Serial.println ("Start ..."); // Netzwerkverbindung starten Ethernet.begin (mac, ip); Serial.print ("IP:"); Serial.println (Ethernet.localIP ()); // Eingabe- / Ausgabeports initialisieren, Startwerte registrieren pinMode (LED_pin, OUTPUT); digitalWrite (LED_pin, LOW); // wenn die LED aus ist}

void loop () {// Wenn die MQTT-Verbindung inaktiv ist, versuchen wir, sie einzustellen und zu veröffentlichen / abonnieren. if (! client.connected ()) {Serial.print ("Verbindung zu MQTT-boker ..."); // Verbinden und veröffentlichen / abonnieren if (client.connect ("example1")) {Serial.println ("success"); // Wert von Sensoren if (DHT.read22 (DHT22_PIN) == DHTLIB_OK) {dtostrf (DHT.humidity, 5, 2, buff); client.publish ("example1 / hum", Buff); dtostrf (DHT.temperatur, 5, 2, Buff); client.publish ("example1 / temp", Buff); } // Abonnieren eines Abfrageintervalls client.subscribe ("example1 / send_interval"); // Abonniere die LED-Steuervariable client.subscribe ("example1 / led"); } else {// Wenn keine Verbindung bestand, warten wir 10 Sekunden und versuchen es erneut. Serial.print ("Failed, rc ="); Serial.print (client.state ()); Serial.println ("In 10 Sekunden erneut versuchen"); Verzögerung (10000); } // Wenn die Verbindung aktiv ist, werden die Daten mit dem angegebenen Zeitintervall an den Server gesendet.} Else {if (millis () & gt; (last_time + send_interval * 1000)) {last_time = millis (); if (DHT.read22 (DHT22_PIN) == DHTLIB_OK) {dtostrf (DHT.humidity, 5, 2, buff); client.publish ("example1 / hum", Buff); dtostrf (DHT.temperatur, 5, 2, Buff); client.publish ("example1 / temp", Buff); }}} // Prüfung eingehender Verbindungen in einem Abonnement client.loop (); } </ pre>

Das Ergebnis des Teils des Brokers (Temperatur- und Luftfeuchtigkeitsdaten werden mit dem voreingestellten Zeitraum aktualisiert):

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_6.png)

Das Ergebnis der Client-Seite (eingehende Datensubskriptionsausgabe an die Konsole zum Debuggen):

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_server4.jpg)

### IoBroker arbeitet als MQTT-Client
Für einen als Client / Abonnent erworbenen Instanz-MQTT-Treiber müssen Sie den geeigneten Konfigurationstyp auswählen.
In diesem Satz von Optionen werden sich geringfügig ändern:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_4.png)

* **Verbindungseinstellungen** - gibt die URL und den Port des Brokers an (wenn Sie den Datenverkehr verschlüsseln möchten, geben Sie SSL an) - Einstellungen, um eine Verbindung zum Broker herzustellen,
* **Authentifizierungseinstellungen** - Benutzername und Kennwort, wenn der Broker eine Authentifizierung erfordert (SSL sollte verwendet werden, um die Übertragung des Kennworts im Klartext zu vermeiden),
* **Patterns** - Eine Maske für Variablen, für die der Kunde abonniert (Variablenbroker). Die Werte werden durch Kommas getrennt aufgeführt. Das # (Pfund) wird zur Angabe der Menge verwendet.
* **Private Werte maskieren** - Filtervariablen, die veröffentlicht werden sollen (Clientvariablen), deren Werte durch Kommas getrennt aufgeführt werden, um ein Set anzuzeigen, verwenden Sie das Symbol * (Sternchen).
* **Um nur Änderungen zu senden** - Der Client veröffentlicht nur die Variablen, deren Wert geändert wurde (gemäß Maske).
* **Um private Werte beim Start anzugeben** - Wenn diese Option aktiviert ist, werden bei <span id="result_box" lang="en"><span title="Alle Zustände beim Start veröffentlichen - Veröffentlichen Sie alle Zustände (durch Zustandsmaske definiert) bei jedem Verbindungsaufbau, um die eigenen verfügbaren Zustände und ihre Werte anzuzeigen.">jedem Verbindungsaufbau alle Zustände (nach Maske) veröffentlicht, um die verfügbaren Variablen und ihre Werte zu deklarieren.</span></span>
* **Das Präfix für alle Werte** - Wenn der angegebene Wert zu jedem veröffentlichten Thema als Präfix hinzugefügt wird. Wenn Sie beispielsweise client1 / angeben, werden alle Themen in den folgenden Zeilen veröffentlicht: `client1 / javascript / 0 / cubietruck`,
* **Ausgabeprotokoll für jede Änderung** - In der Protokolldatei werden Debugging-Informationen für jede Änderung angezeigt.
* **Um nicht nur das Team zu senden, sondern auch den Status (ack = true).** - Wenn diese Option nicht aktiviert ist, hat der Broker nur Variablen / Befehle mit ack = false gesendet, wenn die Option zur Kenntnisnahme gesendet wird auf alle Daten, unabhängig von ack = true oder ack = false,
* **Die maximale Länge eines Themas** - Die maximale Anzahl von Zeichen für die Beschreibung des Themas einschließlich des Dienstes.

Beispiele zum Setzen der Variablen der Subskriptionsmaske (Muster). Betrachten Sie Themen:

*   "Sport"
* "Sport / Tennis"
* "Sport / Basketball"
* "Sport / Schwimmen"
* "Sport / Tennis / Finale"
* "Sport / Basketball / Finale"
* "Sport / Schwimmen / Finale"

Wenn Sie eine bestimmte Gruppe von Themen abonnieren möchten, können Sie die Zeichen # (Nummernzeichen) oder + (Pluszeichen) verwenden.

* "Sport / Tennis / #" (Abonnement nur "Sport / Tennis" und "Sport / Tennis / Finale")
* "Sport / Tennis / +" (Abonnement nur "Sport / Tennis / Finale", aber nicht "Sport / Tennis")

Wenn Sie für JMS-Themen alle Themen "Finals" abonnieren möchten, können Sie die Zeichen # (Rautezeichen) oder + (Pluszeichen) verwenden.

* "Sport / # / Finale"
* "Sport / + / Finale"

Wenn Sie für MQTT-Themen alle Themen "Finals" abonnieren möchten, können Sie das Pluszeichen (Pluszeichen) verwenden.

* "Sport / + / Finale"

Als Beispiel betrachten Sie den Datenaustausch zwischen den beiden Systemen ioBroker. Es gibt ein funktionierendes System ioBroker für BananaPi-Board (IP-Adresse 192.168.69.51), das den MQTT-Treiber im Server / Broker-Modus aus dem obigen Beispiel gestartet hat.
Mit dem Server wird ein Client verbunden, der Daten vom Sensor DHT22 veröffentlicht - Temperatur und Luftfeuchtigkeit sowie vorzeichenbehaftete Variablen der Intervallmessübertragung und die Status-LED (Aktivieren / Deaktivieren) - im obigen Beispiel.
Das zweite Betriebssystem ioBroker auf dem Board Cubietruck, wird den MQTT-Treiber im Client / Subscriber-Modus ausführen.
Er meldet sich für die Variablen Temperatur und Luftfeuchtigkeit des Brokers an (die wiederum von einem anderen Client empfangen wird) und veröffentlicht alle Skriptvariablen - [der Zustand der Batterie](http://www.iobroker.net/?page_id=4268&lang=ru#_Li-polLi-ion) Board (nur die Änderungen). Die Client-Konfiguration sieht etwa wie folgt aus:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_7.png)

Verbindungstyp - Der Kunde / Teilnehmer gibt die IP-Adresse des Brokers und den Port an (Standard 1883).
Die Verschlüsselung und Authentifizierung des Datenverkehrs ist nicht erforderlich.

Maske für die Abonnements (Muster) - `mqtt/0/example1/hum,mqtt/0/example1/temp` - Der Client wird nur für Temperatur und Luftfeuchtigkeit abonniert (Werte werden durch Komma ohne Leerzeichen getrennt).

Daten zur Veröffentlichung maskieren - `javascript.0.cubietruck.battery.*` - Alle Skriptvariablen `cubietruck` in der Gruppe `battery` Treiber `javascript.0` veröffentlichen.

Um nur die Änderungen zu senden, senden Sie die Zustandsvariablen batterien (das Senden ist nicht sinnvoll, wenn sich der Wert nicht geändert hat). Um private Werte beim Start anzugeben - beim Starten des Treibers gibt der Client sofort alle Variablen entsprechend der Maske frei - selbst wenn sie null oder leer sind, um Variablen im Broker zu erstellen.

Um Daten mit "ack = false" zu senden, arbeiten die Variablen in der Batterie aktualisiert, sodass sie immer "ack = false" sind. Das Ergebnis der Arbeit auf Kundenseite (Temperatur- und Feuchtedaten eines anderen Kunden - siehe obiges Beispiel):

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_9.png)

Das Ergebnis des Brokers (Statusdaten des Batterieclients):

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_11.png)

## Anwendung - MQTT-Gateway-Protokolle - ModBus RTU
Driver MQTT kann als Gateway für verschiedene Protokolle verwendet werden, um neue Geräte mit dem System-ioBroker oder einem anderen zu verbinden. Eine universelle Basis für die Entwicklung solcher Lösungen sind Arduino-Boards. In einem Netzwerk viele Beispiele, Bibliotheken und Best Practices. Eine große Community arbeitet mit diesen Controllern, und das System integrierte eine Vielzahl von Geräten / Geräten / Geräten.

Betrachten Sie beispielsweise das gängige Industrieprotokoll ModBus. In ioBroker hat das System einen Treiber für die Arbeit - Version ModBus TCP (über Ethernet). Eine Reihe von Sensoren, Controllern und Stellgliedern arbeitet physikalisch mit dem RS-485 Network / 232- und ModBus RTU-Protokoll.
Um sie zu integrieren, kann MQTT Gateway - ModBus RTU basierend auf der Arduino-Plattform verwendet werden. Betrachten Sie ein Beispiel.

<span style="text-decoration: underline;">** Es gibt einen Temperatur- und Feuchtigkeitssensor **</span> (für den Test auf Basis des Arduino Pro Mini Board DHT22-Sensors), der Daten über ModBUS RTU ausgibt:

* Port UART (Sie können den MAX485-Chip zum Konvertieren der RS-485-Schnittstelle verwenden) läuft bei 9600 mit Optionen 8E1 (1 Startbit, 8 Datenbits, 1 Bit mit gerader Parität, 1 Stoppbit),
* die Adresse des ModBus - 10,
* Temperaturadresse 0 der mit 10 multiplizierte Wert (Lesefunktion 3),
* Luftfeuchtigkeit - Wert der Adresse 1 multipliziert mit 10 (Funktion 3 lesen),
* PWM LED-Adresse 2 Wert 0 ... 1023 zur Überprüfung der Aufnahmefunktion (Schreibfunktion 6).

Verbindungsschema:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-modbus1.jpg) von Fritzing

Der Code für den Arduino Pro Mini Controller erzeugt Folgendes:

<pre>

#include //https://github.com/RobTillaart/Arduino/tree/master/libraries/DHTlib
#include //https://code.google.com/archive/p/simple-modbus/
#include //https://github.com/PaulStoffregen/MsTimer2 // Modbus Register enum {TEMP, HUM, PWM, TEST, HOLDING_REGS_SIZE};
#define ID_MODBUS 10 // Modbus-Adresse des Slave-Geräts unsigned int holdingRegs [HOLDING_REGS_SIZE]; // Modbus Register Array // Temperatur- und Feuchtigkeitssensor DHT22 dht DHT;
#define DHT22_PIN 2
#define LED 9 // LED ist mit dem PWM-Pin-9-Void-Setup () {verbunden. // Konfigurieren Sie den Modbus modbus_configure (& Serial, 9600, SERIAL_8E1, ID_MODBUS, 0, HOLDING_REGS_SIZE, holdingRegs); holdingRegs [TEST] = -157; // für den Test der negativen Werte // einen Timer für 2 Sekunden initialisieren, Daten in Temperatur- und Feuchtigkeitsregistern aktualisieren MsTimer2 :: set (2000, read_sensors); MsTimer2 :: start (); // Zeitgeber ausführen pinMode (LED, OUTPUT); // LED-Portinitialisierung} // Die Funktion wird alle 2 Sekunden vom Timer gestartet im Register der FeuchtigkeitsholdingRegs [HUM] = 10 *DHT.feuchte; // wir schreiben einen ganzzahligen Wert in das Register der Temperature HoldingRegs [TEMP] = 10* DHT.temperature; } else {// Wenn es nicht erfolgreich war, Daten vom Sensor DHT22 zu lesen, schreiben wir Null in die Register holdingRegs [HUM] = 0; holdingRegs [TEMP] = 0; }} void loop () {modbus_update (); // Modbus-Datenaktualisierung // Daten vom LED-Steuerregister zum PWM übertragen (Bitverschiebung um 2 Bit) analogWrite (LED, holdingRegs [PWM] >> 2); } </ pre>
Um den Betriebscode und das Schema zu testen, können Sie eine Verbindung zu einer seriellen Anschlusskarte (z. B. mithilfe eines USB-UART-Konverters) und ein spezielles Programm für ein Interview herstellen, das den Temperatursensor und die Luftfeuchtigkeit mit der ModBus RTU-Schnittstelle erstellt.
Für die Umfrage kann beispielsweise [qmodbus](http://qmodbus.sourceforge.net/) oder ein beliebiges anderes Programm verwendet werden.

Die Einstellungen:

- Port (Wählen Sie aus der Liste aus, welcher Port mit den seriellen Arduino-Boards verbunden ist).
- Geschwindigkeit und andere Parameter - 9600 8E1;
- Slave-ID: 10, Lesen: Funktion Nr. 3 Lesen der Halteregister, Startadresse: 0, Anzahl der Register: 3,
- Slave-ID: 10, Datensatz: Funktion Nr. 6 Einzelregister-Startadresse schreiben: 2,

Die Antwort im Programm sollte beim Lesen ungefähr die folgende sein:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-modbus2.jpg)

Die Antwort im Programm bei der Aufnahme:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-modbus3.jpg)

<span style="text-decoration: underline;">** Konfigurieren Sie nun das Gateway selbst und verbinden Sie es mit dem Iobroker. **</span>

Das Gateway basiert auf der Plattform Arduino MEGA 2560 mit Ethernet Shield - Client MQTT, Broker - einem Instanz-Mqtt.0-ioBroker-Systemtreiber.
Die Wahl des MEGA 2560 aufgrund der Tatsache, dass auf dieser Platine mehr als ein UART-Port jeweils Null (Serial0 (Pin_0 (RX) und Pin_1 (TX))) oder einfach Serial ist - zur Ausgabe von Debug-Meldungen und Serial1 (Pin_19 (RX) ) und pin_18 (TX)) - für Slave über ModBus.

* der Kunde - die Gebühr für die Entwicklung des Arduino MEGA 2560 + Ethernet Shield basierend auf W5100-Chip;
* für die Arbeit mit dem Ethernet-Board wird die [Standardbibliothek] verwendet (https://www.arduino.cc/de/Reference/Ethernet)

  für das Arbeiten mit der MQTT-Bibliothek [Pubsubclient](https://github.com/knolleary/pubsubclient);

* für die Umfrage zur Modbus-Verwendungsbibliothek [SimpleModbus] (https://code.google.com/archive/p/simple-modbus/) Versionsmaster;
* Vermessung am UART-Port (verbinden Sie einfach den RX-Port-Master, den TX-Port-Slave bzw. den TX-Port-Master und den RX-Port-Slave), der Übertragungssteuerungs-Port wird nicht verwendet (dies gilt für RS-485);
* Porteinstellungen: Geschwindigkeit 9600, 8 81;
* die Adresse des Slave-Geräts 10, eine Funktion des Lesens der Nummer 3 (Lesehalteregister), Aufzeichnungsfunktionsnr. 6 (Einzelregister schreiben);
* Broker - ioBroker-Systemtreiber mqtt.

Themen des Datenaustauschs formatieren:

* `modbusgateway / send_interval` - signierter Client zur Änderung des Übertragungsintervalls der Temperaturwerte und der Luftfeuchtigkeit (int-Wert in Sekunden),
* "modbusgateway / temp" - Client veröffentlicht mit einem bestimmten Intervall den Wert des Temperatursensors DHT22 (Typ Float),
* "modbusgateway / hum" - der Client veröffentlicht in einem bestimmten Intervall den Wert des Feuchtesensors DHT22 (Typ Float),
* `modbusgateway / led` - Der Client ist für die Zustandsänderung der LED (PWM-Steuerwert 0 ... 1024) abonniert.

Das Verbindungsdiagramm sieht ungefähr so aus:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-modbus6.jpg)

Für das Test-Slave-Gerät, das vom Master-Gerät gespeist wird. Der Master arbeitet wiederum über den USB-Port, der gerade debuggt wird (Serial0).
Treibereinstellungen sind wie folgt:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_14.png)

Verbindung über TCP (WebSocket ist nicht erforderlich), Standardport 1883 \. Der Client innerhalb des lokalen Netzwerks, also den Datenverkehr zu verschlüsseln und den Benutzer zu authentifizieren, ist nicht erforderlich. Wir senden nur die Änderungen, da der Client sich im Sendeintervall angemeldet hat und Statusinformationen erhalten hat, um Informationen über die Aktualisierung (ohne Änderung des Werts) auf eine Variable zu erhalten, macht keinen Sinn. Um das Abonnement zu veröffentlichen, beachten Sie diese Option. Wenn Sie zum ersten Mal eine Verbindung zum Client herstellen (oder eine Verbindung herstellen), muss er den Status der Variablen kennen, für die er signiert ist (ein aktuelles Sendeintervall und ob die LED angezeigt werden soll) eingeschaltet). Die Einstellung zum Senden der Variablen ack = true oder false ist ebenfalls erwähnenswert, da eine Variable (die den Client signiert hat) jeden Treiber / Skript / VIS ändern kann und alle Änderungen an den Client gesendet werden sollten. Der vollständige Code für das Arduino-Board sieht folgendermaßen aus:

<pre class=""> // Bibliotheken verbinden

#umfassen
#umfassen
#include //https://github.com/knolleary/pubsubclient
#include //https://github.com/RobTillaart/Arduino/tree/master/libraries/DHTlib
// Einstellungen eines Netzwerkbytes mac [] = {0xAB, 0xBC, 0xCD, 0xDE, 0xEF, 0x31}; Byte ip [] = {192, 168, 69, 31}; // arduino board IP-Adressbyte mqttserver [] = {192, 168, 69, 51}; // ioBroker Server IP-Adresse EthernetClient ethClient; void callback (char *topic, byte* payload, vorzeichenlose Länge); PubSubClient-Client (mqttserver, 1884, Rückruf, ethClient); // Globale Variablen ohne Vorzeichen int send_interval = 10; // das Sendeintervall der Meldungen an den Server, standardmäßig 10 Sekunden ohne Vorzeichen long last_time = 0; // die aktuelle Uhrzeit für den Timer dht DHT;

#define DHT22_PIN 8 Char Buff [20];
// Die Verarbeitungsfunktion für eingehende Verbindungen - Empfang von Daten in einem Abonnement void Callback (Char * Topic, Byte * Payload, unsigned int length) {Serial.println (""); Serial.println ("-------"); Serial.println ("Neuer Rückruf von MQTT-Broker"); // Lassen Sie uns ein Thema (Thema) und einen Wert (Payload) in eine Zeile Payload umwandeln [length] = '\ 0'; String strTopic = String (Thema); String strPayload = String ((char *) Nutzlast); // Recherchiere, dass der Server bei einem Abonnement "angekommen" ist: // Änderung eines Abfrageintervalls if (strTopic == "example2 / send_interval") {int tmp = strPayload.toInt (); if (tmp == 0) {send_interval = 10; } else {send_interval = strPayload.toInt (); }} Serial.print (strTopic); Serialdruck (""); Serial.println (strPayload); Serial.println ("-------"); Serial.println (""); }

void setup () {Serial.begin (9600); Serial.println ("Start ..."); // Netzwerkverbindung starten Ethernet.begin (mac, ip); Serial.print ("IP:"); Serial.println (Ethernet.localIP ()); // Eingabe- / Ausgabeports initialisieren, Startwerte registrieren}

void loop () {// Wenn die MQTT-Verbindung inaktiv ist, versuchen wir, sie einzustellen und zu veröffentlichen / abonnieren. if (! client.connected ()) {Serial.print ("Verbindung zu MQTT-boker ..."); // Verbinden und veröffentlichen / abonnieren if (client.connect ("example2")) {Serial.println ("success"); // Wert von Sensoren if (DHT.read22 (DHT22_PIN) == DHTLIB_OK) {dtostrf (DHT.humidity, 5, 2, buff); client.publish ("example2 / hum", Buff); dtostrf (DHT.temperatur, 5, 2, Buff); client.publish ("example2 / temp", Buff); } // Abonnieren Sie ein Abfrageintervall client.subscribe ("example2 / send_interval"); } else {// Wenn keine Verbindung bestand, warten wir 10 Sekunden und versuchen es erneut. Serial.print ("Failed, rc ="); Serial.print (client.state ()); Serial.println ("In 10 Sekunden erneut versuchen"); Verzögerung (10000); } // Wenn die Verbindung aktiv ist, werden die Daten mit dem angegebenen Zeitintervall an den Server gesendet.} Else {if (millis () & gt; (last_time + send_interval * 1000)) {last_time = millis (); if (DHT.read22 (DHT22_PIN) == DHTLIB_OK) {dtostrf (DHT.humidity, 5, 2, buff); client.publish ("example2 / hum", Buff); dtostrf (DHT.temperatur, 5, 2, Buff); client.publish ("example2 / temp", Buff); }}} // Prüfung eingehender Verbindungen in einem Abonnement client.loop (); } </ pre>

Diese Lösung kann als Prototyp (Beispiel) eines ModBus-Netzwerks in Ihrem Automatisierungssystem verwendet werden. Die Daten vom Slave werden mit dem gewünschten Abstand im ioBroker übertragen.

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_10.png)

Vom MQTT-Client signierte Variablen und Umleitungen, die in Slave-Geräten im ModBus-Netzwerk benötigt werden.

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-modbus5.jpg)

## Application - mobile Clients verbinden
Kürzlich wurde das MQTT-Protokoll aufgrund der Einfachheit, Wirtschaftlichkeit des Verkehrs und der Erstellung guter Bibliotheken für verschiedene Plattformen sehr verbreitet.
Es gibt viele Programme, um mit MQTT auf mobilen Geräten zu arbeiten, zum Beispiel [IoT MQTT Dashboard](https://play.google.com/store/apps/details?id=com.thn.iotmqttdashboard&hl=en).
Mit diesem Programm können Sie eine Verbindung zum MQTT-Broker in einem lokalen Netzwerk oder über das Internet herstellen.

Als ein Beispiel sei in der Rolle des Brokers das ioBroker-System genannt, mit dem MQTT zur Verbindung der Clientanwendung IoT MQTT Dashboard verwendet wird.

In diesem Beispiel steuern wir den Lichtregler [MegaD-328](http://www.ab-log.ru/smart-house/ethernet/megad-328), der mit dem ioBroker mit dem Treiber [MegaD](http://www.iobroker.net/?page_id=4052&lang=en) verbunden ist.
Steuert Relais (MegaD-Port **P7** in der Lobby, ein spezielles Skript, das durch den Status der Port-Schaltfläche **P0** und den Status der MQTT-Variablen **mqtt.0.remotectrl.light signiert ist .hall** der den mobilen Client veröffentlicht.
Dieses Skript schaltet den Status des an den Switch gebundenen Ports (Port P7) um, dh invertiert ihn.

Es stellt sich heraus, dass jedes Mal, wenn Sie die Taste drücken, die elektrisch mit dem Port **P0** verbunden ist (den Status **true** erfasst), und jedes Mal, wenn Sie die Variablen **mqtt.0.remotectrl.light.hall** veröffentlichen als **true** muss der Port **P7** das Licht ein- oder ausschalten.
Der Text des Skripts wird wie folgt aussehen:

<pre> // Steuerung der Beleuchtung in der Halle mit der Taste p0 des MegaD-Controllers der Treiberinstanz megad.0 ein ({id: &#39;megad.0.p0_P0&#39;, change: &#39;any&#39;}, Funktion (obj) { if (obj.newState.val! = = &#39;&#39; || typeof obj.newState.val! = = &quot;undefined&quot;) {if (obj.newState.val == = true) {if (getState (&#39;megad.0.) p7_P7 &#39;). val == = true) {setState (&#39; megad.0.p7_P7 &#39;, false);} else {setState (&#39; megad.0.p7_P7 &#39;, true);}}}}; // Die Steuerung der Beleuchtung in der Halle ist auf MQTT entfernt ein Thema &quot;mqtt.0.remotectrl.light.hall&quot; ein ({id: &#39;mqtt.0.remotectrl.light.hall&#39;, change: &#39;any&#39;}, Funktion (obj) {if (obj.newState.val! = = &#39;&#39; || typeof obj.newState.val! = = &quot;undefined&quot;) {if (obj.newState.val == = true) {if (getState (&#39; megad.0.p7_P7 &#39;). val == = true) {setState (&#39; megad.0.p7_P7 &#39;, false);} else {setState (&#39; megad.0.p7_P7 &#39;, true);}}}}); </pre>

Schließen Sie die Tasten und Glühlampen an den MegaD-Controller an:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_mobile1.jpg)

MQTT-Treibereinstellungen:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_14.png)

Der mobile Client kann Daten in der Variablen mqtt.0.remotectrl.light.hall veröffentlichen und meldet sich für einen realen Portstatus MegaD - megad.0.p7_P7 an.

Das Konfigurieren von Veröffentlichungen und Abonnements:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-mobile3.png)

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-mobile4.png)

Insgesamt für eine Kanallichtsteuerung drehen Sie das Steuerungsfenster (Publizieren) und das Abonnementfenster ist ein echtes Zustandslichtrelais (für Rückmeldungen):

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-mobile5.png)

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-mobile6.png)

## Application - Arbeiten mit Cloud-Servern
Das oben beschriebene Beispiel hat mehrere Nachteile. Erstens ist es nicht immer der mobile Client, der sich in demselben lokalen Netzwerk befindet wie der Server-ioBroker, und zweitens können Sie, selbst wenn Sie Portweiterleitung im Internet implementieren und zum Schutz der Verbindung nicht immer den Server selbst, eingehende Verbindungen akzeptieren ( hinter einem NAT, das keinen Zugriff auf Einstellungen hat). Im globalen Netzwerk gibt es viele verschiedene Dienste, die MQTT unterstützen - bezahlt und kostenlos, beispielsweise das Senden von Wetterdaten, die Standortbestimmung usw. Einige Dienste können als MQTT-Protokollbroker fungieren und als Gateway (Bridge) zur Ausgabe von Daten vom ioBroker the global verwendet werden Netzwerk, oder um Daten in ioBroker zu erhalten. Betrachten Sie als Beispiel die Arbeit der Bundles:

* Server / Broker - Service [cloudmqtt.com] (https://www.cloudmqtt.com/) (es gibt einen kostenlosen Tarif),
* Kunde / Abonnent - das ioBroker-System mit Zugang zum Internet, veröffentlicht Daten zu Temperatur und Luftfeuchtigkeit (siehe [Beispiel oben] (http://www.iobroker.net/?page_id=6435&lang=de#ioBroker_working_as_MQTT-broker)), veröffentlicht den realen Status der Ports ** P7-P13 ** (Relaistreiber MegaD ** Megad.0 ** - Lichtsteuerung) und abonniert Eigenschaften der Fernlichtsteuerung (eine Instanz des Treibers mqtt ** mqtt.0 * *),
* Kunde / Abonnent - die Anwendung von [IoT MQTT Dashboard] (https://play.google.com/store/apps/details?id=com.thn.iotmqttdashboard&hl=de) für die Fernarbeit - Sensordaten der Temperatur abonnieren und Feuchte, Abonnement des realen Status der Ports **P7-P13** (Relaistreiber MegaD **Megad.0** , Veröffentlichung von Variablen einer Fernsteuerungslampe (Treiberinstanz **mqtt.0** .

Das Ergebnis ist die folgende Struktur:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_cloud1.jpg)

Bundle-Treiber **mqtt.1** (Broker) - Arduino UNO + Ethernet + DHT22 (Client) wie in [das obige Beispiel](http://www.iobroker.net/?page_id=6435&lang=en#ioBroker_working_as_MQTT-broker) mit einigen Änderungen.
Konfigurieren einer Instanz des mqtt **-Treibers.1**

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_14.png)

Code für die Arduino-Plattform:

<pre class=""> // Bibliotheken verbinden

#umfassen
#umfassen
#include //https://github.com/knolleary/pubsubclient
#include //https://github.com/RobTillaart/Arduino/tree/master/libraries/DHTlib
// Einstellungen eines Netzwerkbytes mac [] = {0xAB, 0xBC, 0xCD, 0xDE, 0xEF, 0x31}; Byte ip [] = {192, 168, 69, 31}; // arduino board IP-Adressbyte mqttserver [] = {192, 168, 69, 51}; // ioBroker Server IP-Adresse EthernetClient ethClient; void callback (char *topic, byte* payload, vorzeichenlose Länge); PubSubClient-Client (mqttserver, 1884, Rückruf, ethClient); // Globale Variablen ohne Vorzeichen int send_interval = 10; // das Sendeintervall der Meldungen an den Server, standardmäßig 10 Sekunden ohne Vorzeichen long last_time = 0; // die aktuelle Uhrzeit für den Timer dht DHT;

#define DHT22_PIN 8 Char Buff [20]; // Die Verarbeitungsfunktion für eingehende Verbindungen - Empfang von Daten in einem Abonnement void Callback (Char * Topic, Byte * Payload, unsigned int length) {Serial.println (""); Serial.println ("-------"); Serial.println ("Neuer Rückruf von MQTT-Broker"); // Lassen Sie uns ein Thema (Thema) und einen Wert (Payload) in eine Zeile Payload umwandeln [length] = '\ 0'; String strTopic = String (Thema); String strPayload = String ((char *) Nutzlast); // Recherchiere, dass der Server bei einem Abonnement "angekommen" ist: // Änderung eines Abfrageintervalls if (strTopic == "example2 / send_interval") {int tmp = strPayload.toInt (); if (tmp == 0) {send_interval = 10; } else {send_interval = strPayload.toInt (); }} Serial.print (strTopic); Serialdruck (""); Serial.println (strPayload); Serial.println ("-------"); Serial.println (""); }
void setup () {Serial.begin (9600); Serial.println ("Start ..."); // Netzwerkverbindung starten Ethernet.begin (mac, ip); Serial.print ("IP:"); Serial.println (Ethernet.localIP ()); // Eingabe- / Ausgabeports initialisieren, Startwerte registrieren}

void loop () {// Wenn die MQTT-Verbindung inaktiv ist, versuchen wir, sie einzustellen und zu veröffentlichen / abonnieren. if (! client.connected ()) {Serial.print ("Verbindung zu MQTT-boker ..."); // Verbinden und veröffentlichen / abonnieren if (client.connect ("example2")) {Serial.println ("success"); // Wert von Sensoren if (DHT.read22 (DHT22_PIN) == DHTLIB_OK) {dtostrf (DHT.humidity, 5, 2, buff); client.publish ("example2 / hum", Buff); dtostrf (DHT.temperatur, 5, 2, Buff); client.publish ("example2 / temp", Buff); } // Abonnieren Sie ein Abfrageintervall client.subscribe ("example2 / send_interval"); } else {// Wenn keine Verbindung bestand, warten wir 10 Sekunden und versuchen es erneut. Serial.print ("Failed, rc ="); Serial.print (client.state ()); Serial.println ("In 10 Sekunden erneut versuchen"); Verzögerung (10000); } // Wenn die Verbindung aktiv ist, werden die Daten mit dem angegebenen Zeitintervall an den Server gesendet.} Else {if (millis () & gt; (last_time + send_interval * 1000)) {last_time = millis (); if (DHT.read22 (DHT22_PIN) == DHTLIB_OK) {dtostrf (DHT.humidity, 5, 2, buff); client.publish ("example2 / hum", Buff); dtostrf (DHT.temperatur, 5, 2, Buff); client.publish ("example2 / temp", Buff); }}} // Prüfung eingehender Verbindungen in einem Abonnement client.loop (); } </ pre>

Das Ergebnis der Arbeit - **mqtt.1** Treiberobjekte:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_12.png)

Lassen Sie uns nun Publish / Subscribe-Daten für die Cloud einrichten. Registrieren Sie sich zunächst auf der Website [cloudmqtt.com](https://www.cloudmqtt.com/), wählen Sie die gewünschte Rate aus, erstellen Sie Instanz, holen Sie Einstellungen:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud4.jpg)

Zur Erhöhung der Sicherheit ist es besser, einen separaten Benutzer anzulegen. Es wird davon ausgegangen, dass es sich um Benutzer **iobroker** mit dem Kennwort **1234** handelt.
Erlauben Sie dem Benutzer, zu einem beliebigen Thema zu lesen und zu schreiben:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud5.jpg)

Legen Sie als Nächstes die Instanz des mqtt **driver.0** fest, um eine Verbindung als Client / Abonnenten-Cloud-Broker herzustellen, und eine Liste von Publikationen / Abonnements:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_8.png)

* Verbindungstyp - der Kunde / Teilnehmer,
* Verbindungseinstellungen - geben Sie die URL an, die in der Systemsteuerung [cloudmqtt.com] (https://www.cloudmqtt.com/) ausgegeben wird. Der Port verwendet **22809** die mit **SSL** funktioniert.
* Geben Sie in den Authentifizierungsoptionen den Benutzernamen und das Kennwort an.
* Muster - Unser Client ioBroker wird für alle Themen in der Cloud signiert. Sie können hier das Nummernzeichen (** # **) angeben. Sie können eine Maske verwenden, um das Abonnement selektiv zu abonnieren
* Die Maske des Eigenwert-Clients wird auf dem Server **Temperatur / Luftfeuchtigkeit** und den Status aller Ports megaD (Ports mit Relais P7-P13) veröffentlichen. Dieses durch Komma getrennte Feld gibt die erforderlichen Variablen an: **mqtt.1 Beispiel2.hum, mqtt.1.example2.temp, megad.0.p7_P7, megad.0.p8_P8, megad.0.p9_P9, megad.0.p10_P10, megad.0.p11_P11, megad.0.p12_P12, megad .0.p13_P13**
* nur Änderungen senden - setzen Sie ein Häkchen, veröffentlichen nur die Änderungen,
* um Ihre eigenen Werte am Anfang anzugeben - geben Sie einfach an, um Themen zu erstellen,
* um nicht nur Befehle zu senden, sondern auch den Status (ack = true) - es sollte beachtet werden, dass sowohl der Temperatur- als auch der Feuchtigkeits-Treiber mqtt (ack = true) aktualisiert wurden.

Gespeicherte Einstellungen, stellen Sie sicher, dass die Verbindung hergestellt ist (auf dem Bedienfeld [cloudmqtt.com](https://www.cloudmqtt.com/) Protokollserver beobachten).
Nach einiger Zeit werden Daten angezeigt (im Panel-Link **WebsocketUI** :

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud7.jpg)

Am Ende bleibt nur noch die Konfiguration eines mobilen Clients, beispielsweise [IoT MQTT Dashboard](https://play.google.com/store/apps/details?id=com.thn.iotmqttdashboard&hl=en).
Erstellen Sie eine neue Verbindung:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud8.png)

Erstellen Sie Themen für die Veröffentlichung (z. B. Beleuchtung der Halle - Anschluss **P7** MegaD):

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud9.png)

Dann erstellen Sie ein Abonnement für die Themen (Temperatur, Luftfeuchtigkeit, Hallenlicht am Port **P7** MegaD):

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud10.png)

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud11.png)

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud12.png)

Am Ende könnte Ihr Dashboard ungefähr so aussehen:

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud13.png)

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_example-cloud14.png)

Nach der Erstellung der Veröffentlichungen auf einem mobilen Gerät sollte in der Treiberinstanz **mqtt.0** das System ioBroker als variable Lichtsteuerung erscheinen, die im Skript für die Lichtsteuerung verwendet werden sollte (siehe [Beispiel oben](http://www.iobroker.net/?page_id=6435&lang=en#Application_8211_connecting_mobile_clients)):

![](../../../en/adapterref/iobroker.mqtt/img/mqtt_13.png)

Herzliche Glückwünsche! Jetzt können Sie das System ioBroker steuern und Daten über einen Cloud-Service empfangen!

## Changelog
### 2.0.6 (2019-01-16)
* (SchumyHao) Add Chinese support

### 2.0.5 (2019-01-12)
* (simatec) Support for Compact mode

### 2.0.4 (2018-12-01)
* (Apollon77) Subscribe to topics after connect

### 2.0.3 (2018-08-11)
* (bluefox) Prefix in server was corrected

### 2.0.2 (2018-08-09)
* (bluefox) Behaviour of "set" topics was changed

### 2.0.1 (2018-07-06)
* (bluefox) Double prefix by client was fixed

### 2.0.0 (2018-03-05)
* (bluefox) broke node.js 4 support
* (bluefox) remove mqtt-stream-server
* (bluefox) partial mqtt5 support

### 1.5.0 (2018-03-05)
* (bluefox) The patch for wifi-iot removed
* (bluefox) the mqtt library updated
* (bluefox) implement QoS>0

### 1.4.2 (2018-01-30)
* (bluefox) Admin3 settings are corrected

### 1.4.1 (2018-01-13)
* (bluefox) Convert error is caught
* (bluefox) Ready for admin3

### 1.3.3 (2017-10-15)
* (bluefox) Fix sending of QOS=2 if server

### 1.3.2 (2017-02-08)
* (bluefox) Fix convert of UTF8 payloads
* (bluefox) optional fix for chunking problem

### 1.3.1 (2017-02-02)
* (bluefox) Update mqtt packages
* (bluefox) add Interval before send topics by connection ans send interval settings
* (bluefox) reorganise configuration dialog

### 1.3.0 (2017-01-07)
* (bluefox) Update mqtt packages
* (bluefox) configurable client ID

### 1.2.5 (2016-11-24)
* (bluefox) Fix server publishing

### 1.2.4 (2016-11-13)
* (bluefox) additional debug output

### 1.2.1 (2016-11-06)
* (bluefox) fix publish on start

### 1.2.0 (2016-09-27)
* (bluefox) implementation of LWT for server
* (bluefox) update mqtt package version

### 1.1.2 (2016-09-13)
* (bluefox) fix authentication in server

### 1.1.1 (2016-09-12)
* (bluefox) do not parse JSON states, that do not have attribute "val" to support other systems

### 1.1.0 (2016-07-23)
* (bluefox) add new setting: Use different topic names for set and get

### 1.0.4 (2016-07-19)
* (bluefox) convert values like "+58,890" into numbers too

### 1.0.3 (2016-05-14)
* (cdjm) change client protocolID

### 1.0.2 (2016-04-26)
* (bluefox) update mqtt module

### 1.0.1 (2016-04-25)
* (bluefox) Fix translations in admin

### 1.0.0 (2016-04-22)
* (bluefox) Fix error with direct publish in server

### 0.5.0 (2016-03-15)
* (bluefox) fix web sockets
* (bluefox) fix SSL

### 0.4.2 (2016-02-10)
* (bluefox) create object "info.connection"
* (bluefox) add reconnection tests

### 0.4.1 (2016-02-04)
* (bluefox) fix error with states creation

### 0.4.0 (2016-01-27)
* (bluefox) add tests
* (bluefox) client and server run

### 0.3.1 (2016-01-14)
* (bluefox) change creation of states by client

### 0.3.0 (2016-01-13)
* (bluefox) try to fix event emitter

### 0.2.15 (2015-11-23)
* (Pmant) fix publish on subscribe

### 0.2.14 (2015-11-21)
* (bluefox) fix error with wrong variable names 

### 0.2.13 (2015-11-20)
* (Pmant) fix error with wrong variable name 

### 0.2.12 (2015-11-14)
* (Pmant) send last known value on subscription (server)

### 0.2.11 (2015-10-17)
* (bluefox) set maximal length of topic name
* (bluefox) convert "true" and "false" to boolean values

### 0.2.10 (2015-09-16)
* (bluefox) protect against empty topics

### 0.2.8 (2015-05-17)
* (bluefox) do not ty to parse JSON objects

### 0.2.7 (2015-05-16)
* (bluefox) fix test button

### 0.2.6 (2015-05-16)
* (bluefox) fix names if from mqtt adapter

### 0.2.5 (2015-05-15)
* (bluefox) subscribe to all states if no mask defined

### 0.2.4 (2015-05-14)
* (bluefox) add state "clients" to server with the list of clients

### 0.2.3 (2015-05-14)
* (bluefox) fix some errors

### 0.2.2 (2015-05-13)
* (bluefox) fix some errors with sendOnStart and fix flag sendAckToo

### 0.2.0 (2015-05-13)
* (bluefox) translations and rename config sendNoAck=>sendAckToo
* (bluefox) lets create server not only on localhost

### 0.1.8 (2015-05-13)
* (bluefox) fix topic names in server mode
* (bluefox) implement subscribe
* (bluefox) update mqtt package

### 0.1.7 (2015-03-24)
* (bluefox) create objects if new state received
* (bluefox) update mqtt library

### 0.1.6 (2015-03-04)
* (bluefox) just update index.html

### 0.1.5 (2015-01-02)
* (bluefox) fix error if state deleted

### 0.1.4 (2015-01-02)
* (bluefox) support of npm install

### 0.1.2 (2014-11-28)
* (bluefox) support of npm install

### 0.1.1 (2014-11-22)
* (bluefox) support of new naming concept

### 0.1.0 (2014-10-23)
* (bluefox) Update readme
* (bluefox) Support of authentication for server and client
* (bluefox) Support of prefix for own topics

### 0.0.2 (2014-10-19)
* (bluefox) support of server (actual no authentication)

## License

The MIT License (MIT)

Copyright (c) 2014-2019, bluefox<dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.