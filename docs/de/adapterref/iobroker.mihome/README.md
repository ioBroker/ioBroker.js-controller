---
local: true
---
![Logo](media/mihome.png)
# ioBroker Mi Home Adapter
Mit dem Mi Home Adapter wird ein Mi Control Hub (Gateway) in ein ioBroker System  
eingebunden und ermöglicht so die Kommunikation verschiedener Xiaomi Sensoren,  
Schalter etc. mit ioBroker.

Über ioBroker kann z.B. die Beleuchtung und der Lautsprecher des Gateways gesteuert  
werden.

## Voraussetzungen
* Mi Home App auf Android oder iOS Gerät und frei geschaltete lokale Netzwerk Funktion
* Angeschlossenes Mi Home Gateway
* Betriebsbereites ioBroker System

### Installation der Mi Home App und freischalten der lokalen Netzwerk Funktion
#### Android

* [Android App](https://play.google.com/store/apps/details?id=com.xiaomi.smarthome) auf einem Android Gerät herunterladen, installieren, öffnen und
den Geschäftsbedingungen zustimmen.
* Als Land *Festland-China* auswählen 
* Über *Anmelden* ein Konto erstellen
* Nach der erfolgreichen Anmeldung über `+` ein Gerät hinzufügen
* Unter *Haushaltssicherheit* den `MI Control Hub` auswählen und den Anweisungen   
folgen
* Nach erfolgreichem einbinden des Gateways die 3 Punkte am oberen rechten Bildschirm   
und danach *About* betätigen
* Den Text *Plug-in version* unten 10mal tippen
* Nun ist der Entwickler Modus eingeschaltet und es sollten nach einer gewissen Zeit   
2 weitere Menüpunkte erscheinen   
> Falls nicht, wiederholt versuchen
* Den Menüpunkt `Wireless communication protocol` auswählen
* Den Schiebeschalter oben einschalten, das Passwort notieren und mit `OK` bestätigen.  
> Das Passwort wird später bei der ioBroker Installation benötigt.

Nun können weitere Geräte über das `+` Zeichen angelernt werden.

#### iOS
* [iOS App](https://itunes.apple.com/de/app/mi-home-xiaomi-smarthome/id957323480?mt=8) auf einem iOS Gerät herunterladen, installieren, öffnen und der
Datenschutzerklärung zustimmen
* Über Profil/Einstellungen/Ländereinstellungen das Land *Festland* auswählen. 
* Über *Anmelden* ein Konto erstellen
* Nach der erfolgreichen Anmeldung über `+` ein Gerät hinzufügen
* Unter *Haushalt Sicherheit* den `MI Control Hub` auswählen und den Anweisungen   
folgen
* Nach erfolgreichem einbinden des Gateways die 3 Punkte am oberen rechten Bildschirm   
betätigen und *About* betätigen
* Wiederholt im leeren unteren Bereich tippen 
* Nun ist der Entwickler Modus eingeschaltet und es sollten nach einer gewissen Zeit   
weitere Menüpunkte erscheinen   
> Falls es nicht gleich klappt, die Schritte wiederholen
* Den 4. Menüpunkt auswählen
* Den Schiebeschalter oben einschalten, das Passwort notieren und mit `OK` bestätigen.  
> Das Passwort wird später bei der ioBroker Installation benötigt.

Nun können weitere Geräte über das `+` Zeichen angelernt werden.

### Einstellung am Router
Unter About/Hub info kann im Text nach _localip_ die vom Gateway verwendete IP Adresse   
des Gateways ermittelt werden. Im verwendeten Router sollte diese IP dem Gateway fest   
zugewiesen werden.  
Falls die Bedienung der angelernten Geräte über die App nicht mehr gewollt ist, kann nach   
dem anlernen aller Geräte im Router auch der Internet Zugriff des Gateways abgeschaltet   
werden.


### Unterstützte Geräte
Die folgende Aufstellung erhebt keinen Anspruch auf Vollständigkeit:
- gateway -           Xiaomi RGB Gateway
- sensor_ht -         Xiaomi Temperature/Humidity
- weather.v1 -        Xiaomi Temperature/Humidity/Pressure
- switch -            Xiaomi Wireless Switch
- sensor_switch.aq2 - Xiaomi Aqara Wireless Switch Sensor
- sensor_switch.aq3 - Xiaomi Aqara Wireless Switch Sensor
- plug -              Xiaomi Smart Plug
- 86plug -            Xiaomi Smart Wall Plug
- 86sw2 -             Xiaomi Wireless Dual Wall Switch
- 86sw1 -             Xiaomi Wireless Single Wall Switch
- natgas -            Xiaomi Mijia Honeywell Gas Alarm Detector
- smoke -             Xiaomi Mijia Honeywell Fire Alarm Detector
- ctrl_ln1 -          Xiaomi Aqara 86 Fire Wall Switch One Button
- ctrl_ln1.aq1 -      Xiaomi Aqara Wall Switch LN
- ctrl_ln2 -          Xiaomi 86 zero fire wall switch double key
- ctrl_ln2.aq1 -      Xiaomi Aqara Wall Switch LN double key
- ctrl_neutral2 -     Xiaomi Wired Dual Wall Switch
- ctrl_neutral1 -     Xiaomi Wired Single Wall Switch
- cube -              Xiaomi Cube
- sensor_cube.aqgl01 - Xiaomi Cube
- magnet -            Xiaomi Door Sensor
- sensor_magnet.aq2 - Xiaomi Aqara Door Sensor
- curtain -           Xiaomi Aqara Smart Curtain
- motion -            Xiaomi Motion Sensor
- sensor_motion.aq2 - Xiaomi Aqara Motion Sensor
- sensor_wleak.aq1 -  Xiaomi Aqara water sensor
- ctrl_ln2.aq1 -      Xiaomi Aqara Wall Switch LN (Double)
- remote.b286acn01 -  Xiaomi Aqara Wireless Remote Switch (Double Rocker)
- remote.b1acn01 -    Xiaomi Aqara Wireless Remote Switch
- vibration -         Xiaomi vibration Sensor
- wleak1 -            Xiaomi Aqara Water Sensor
- lock_aq1 -          Xiaomi Lock

## ioBroker Mi Home Adapter Installation
Weitere Einstellungen erfolgen nur noch über die ioBroker Admin-Oberfläche.  
Den Adapter im Bereich *Adapter* suchen und über das `+` Zeichen installieren.

![Logo](media/Adapter.png)

Es öffnet sich dann folgendes Konfigurationsfenster:

![Logo](media/Adapterconfig1.PNG)

Unter `Default Gateway Key` das oben ermittelte Passwort eintragen und mit *speichern*  
*und schließen* das Fenster schließen. Der laufende Adapter sollte danach unter   
*Instanzen* grün angezeigt werden:

![Logo](media/Instanz.PNG)

Unter *Objekte* wird nun das Gateway und seine angelernten Geräte angezeigt:

![Logo](media/Objekte.PNG)

Die Anleitung wurde nach besten Wissen und Gewissen erstellt.

## Changelog

### 1.3.0 (2020-01-16)
* (algar42) Ability to add devices with missing model by their SID ([e.g. for Aqara two-channel relay](https://github.com/algar42/ioBroker.mihome#usage))

### 1.2.9 (2019-11-15)
* (Diginix) Fixed pressure range and values of Aqara weather sensor

### 1.2.8 (2019-07-18)
* (SchumyHao) Change curtain and gateway light role that making them can be detected by type-detector

### 1.2.7 (2019-06-25)
* (SchumyHao) Add several devices support for protocol 2.0.x

### 1.2.6 (2019-03-04)
- (Diginix) Improved calculation for sensor's battery percentage

### 1.2.5 (2019-01-24)
- (Vanwards) Added long click for Aquara wall switch

### 1.2.4 (2019-01-15)
- (SchumyHao) Add Chinese support

### 1.2.3 (2018-10-23)
- (goohnie) New wall switch was added

### 1.2.0 (2018-10-12)
- (bluefox) refactoring

### 1.1.2 (2018-10-08)
- (bluefox) New button switch was added

### 1.1.1 (2018-09-23)
- (bluefox) Fixed the creation of new devices

### 1.1.0 (2018-09-13)
- (bluefox) New devices added:  sensor_switch.aq3, ctrl_ln1.aq1, ctrl_ln2.aq1, sensor_cube.aqgl01, remote.b286acn01, vibration, wleak1, lock_aq1
- (bluefox) Names will be taken from gateway

### 1.0.7 (2018-06-25)
- (bluefox) The heartbeat timeout and the re-connection interval settings were added

### 1.0.6 (2018-05-26)
- (bluefox) Added new Aqara cube sensor

### 1.0.5 (2018-03-05)
- (bluefox) Xiaomi Aqara Wall Switch LN Double was added

### 1.0.4 (2018-01-21)
- (bluefox) The alarm state was fixed.

### 1.0.3 (2018-01-21)
- (bluefox) Invalid temperature values will be ignored

### 1.0.2 (2018-01-14)
- (bluefox) Ignore unknown state of sensors

### 1.0.0 (2018-01-05)
- (bluefox) Do not overwrite the names
- (bluefox) Ready for Admin3

### 0.3.3 (2017-11-26)
- (bluefox) Allow multiple mihome gateways

### 0.2.4 (2017-11-04)
- (bluefox) Add aqara water sensor

### 0.2.3 (2017-09-22)
- (bluefox) Remove "." from id of the device

### 0.2.2 (2017-08-01)
- (bluefox) Set after 300ms doublePress to false by Temperature Sensor\nAllow control of Plug

### 0.2.1 (2017-07-29)
- (bluefox) Implement double click on temperature sensor

### 0.2.0 (2017-07-18)
- (bluefox) fix battery level

### 0.1.4 (2017-06-09)
- (bluefox) add cube
- (bluefox) remove voltage by gateway

### 0.1.1 (2017-06-06)
- (bluefox) Initial commit

## License

MIT

Copyright (c) 2017-2020 bluefox <dogafox@gmail.com>