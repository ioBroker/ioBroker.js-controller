# ioBroker, Cloud-Adapter und Alexa - smartName

Manchmal kann es notwendig sein, einen ioBroker-Datenpunkt zum Cloud-Adapter (also zu Alexa) hinzu zu fügen, 
der sich über die Admin-Seite des Cloud-Adapters nicht hinzufügen lässt. 
Dies muss man dann manuell machen.

### <span style="color: #ff0000;">**<u>Warnhinweis !!!</u>**</span>

<span style="color: #ff0000;">Dieser Eingriff in das Datenmodel von ioBroker ist wie ein 
Operation am offenen Herzen.</span> <span style="color: #ff0000;">Überlege gut, 
was Du tust und klicke notfalls auf „Abbrechen“, wenn Du Dir unsicher bist !</span>

### **<u>Manuelle Definition oder Änderung des smartName-Eintrages</u>**

Wechsele auf der Admin-Seite vom ioBroker auf den Reiter „Objekte“ und manövriere zu dem Datenpunkt, 
der manuell hinzugefügt werden soll. 

![](img/alexa-and-iobroker-fast-start_alexa_100_smartname_01.jpg)

Klicke anschließend auf das Bleistift-Symbol am Ende der entsprechenden Zeile. 
Es öffnet sich nun der Edit-Modus für diesen Datenpunkt – ab hier wird es „gefährlich“ 

![](img/alexa-and-iobroker-fast-start_alexa_100_smartname_02.jpg)

Wechsele auf den Reiter „raw(nur Experten)“ und suche im Abschnitt „common“ nach dem Eintrag „name“. 
Dieser spiegelt den Originalnamen es Datenpunktes wieder. 

Füge hier eine neue Zeile ein: 
“smartName“: “_[sprechender Name, der nach Alexa übertragen werden soll]_“ 

Beispiel  : “smartName“: “Wohnzimmer Licht“ Achte hierbei unbedingt auf die entsprechende Syntax, 
wie Groß-/Kleinschreibung und die JSON-Trennungen mit Komma, usw. 
Klicke anschließend unten auf „Speichern“. Der Datenpunkt wird im Cloud-Adapter angezeigt und auch nach Alexa übertragen.