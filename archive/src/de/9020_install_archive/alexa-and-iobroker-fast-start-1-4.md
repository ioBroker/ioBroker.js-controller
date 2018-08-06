# Szenen aus dem Szenen-Adapter mit Alexa steuern / aufrufen

In dieser Doku wird beschrieben, wie man Szenen, die mittels 
des Szenen-Adapters erstellt wurden, mit Alexa aufrufen kann. 

Voraussetzungen:

*   Alexa-Einbindung funktioniert
*   Szenen-Adapter installiert und Konfiguriert (siehe [hier](http://www.iobroker.net/?page_id=1950&lang=de))

Als erstes benötigt man einen Star, den mal in Alexa einfügen kann. 
Dafür eignet sich der Javascipt-Adapter am besten (viele benötigte States kann man mit ihm erzeigen). 
Dazu legt man im Admin, Reiter "Objekte" den Datenbaum des Javascript-Adapters aus. 
Evtl. legt man sich noch einen sep. Ordner an (der Übersichtlichkeit wegen). 
Dann legt man sich unterhalb von Javascript einen neuen State an (oben auf das kleine + klicken und dann die Maske entsprechend ausfüllen): 

![](img/alexa-and-iobroker-fast-start-1-4_alexa_szenen_001.png)   

Als nächstes wird in der Szene selber der Trigger auf den eben erzeugten State gestellt. 

![](img/alexa-and-iobroker-fast-start-1-4_alexa_szenen_002.png)   

Nun wird der Datenpunkt "Kino" im Cloud-Adapter angelegt. 

![](img/alexa-and-iobroker-fast-start-1-4_alexa_szenen_003.png) 

Sollte der Eintrag nicht direkt angezeigt werden, auf den Reiter "Smart Aufzählungen" wechseln 
und dann wieder zurück auf "Smart Geräte" 

![](img/alexa-and-iobroker-fast-start-1-4_alexa_szenen_004.png)   

Nun noch in Alexa nach SmartHome Geräten suchen. Dann sollte das Gerät "Kino" 
auch in Alexa zu sehen sein. 

![](img/alexa-and-iobroker-fast-start-1-4_alexa_szenen_005.png)   

Nun kann man mit "Alexa, schalte Kino ein / aus" diese Szene triggern.   

Screenshots: Dank an "<span class="responsive-hide">OstfrieseUnterwegs"</span>