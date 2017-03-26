# Wie funktioniert ioBroker und Alexa eigentlich?

Mit Einführung von ALexa hat sich eine ungeahnte Welt an Möglichkeiten aufgetan. 
Natürlich sollte der ioBroker da nicht außen vor bleioben und so hat 
Bluefox sich hingesetzt und einen ioBroker-Skill für Alexa geschrieben (und den notwendigen Cloud-Adapter entsprechend angepasst). 
Doch wie funktioniert das Ganze eigentlich? 

![](img/alexa-and-iobroker-fast-start-1-2_alexa_function.png)

1.  Der Anwender sagt: "Alexa schalte das Licht im Wonhzimmer an". Amazon echo erkennt "Alexa".
2.  und schick dann den aufgenommenen Sound zum Amazon Alexa Service. Der Sound wird in einen Text konvertiert und es wird versucht die Schlüsselworte zu erkennen (schalte, mache, ...). Daraus wird dann ein JSON-Objekt zu erzeugen, welches kein Text beinhaltet, sondern nur einen Befehl "turnON" und die ID vom Gerät ("hm-rpc.0.ABC8979.1.STATE") beinhaltet. Dabei werden die Gerätenamen als Ganzes gehandelt "Lampe im Wohnzimmer", "Licht im Bad". (d.h. "Wohnzimmerlampe" wird somit nicht gehen)
3.  Da der Anwender den Home-Skill „ioBroker“ freigegeben hat, wird das JSON-Objekt an den „AWS Lambda Service“ geschickt.
4.  Der AWS Lambda Service versucht sich mittels OAuth2 bei der ioBorker-Cloud zu authentifizieren und sendet dann das JSON-Objekt an die ioBroker-Cloud.
5.  Die ioBroker-Cloud erkennt, anhand des mitgelieferten Tokens, die ioBroker-Cloud Instanz und schickt es dann zum lokalen ioBroker.
6.  Die lokale ioBroker-Instanz schaltet dann das betreffende Gerät an.
7.  und kann auch (optional) über sayIt eine Benachrichtigung ausgeben.
8.  Die lokale ioBroker-Instanz sendet dann die JSON-Rückmeldung „no error“ an die ioBroker-Cloud.
9.  Diese Info geht dann von der ioBroker-Cloud zurück an AWS Lambda Service.
10.  Der AWS Lambda Service leitet diese an den Alexa-Service.
11.  Der Alexa-Service sendet dies dann an das Echo-Gerät.
12.  Welches das dann mit der Sprachausgabe „Ok“ bestätigt.