# ioBroker, Cloud-Adapter und Alexa - Raumnamen

Es kann vorkommen, das die Raumnamen (im Admin unter dem Reiter "Aufzählungen", Objektbaum "enum.rooms"), 
wie man so schön sagt, "vermurkst" dargestellt werden, obwohl sie in der CCU richtig eingepflegt wurden. 

![](img/alexa-and-iobroker-fast-start-1-3_alexa_rooms_mismatch1.jpg) 

Dies macht im "normalen" ioBroker-Leben möglicherweise keinerlei Probleme, 
in der Kombination mit Alexa ist es aber unschon. Die automatischen Namen werden ja aus "enum.rooms" 
und "enum.functions" gebildet uns genau so an Alexa übertragen. Ein Gerätename "roomBathroom Licht" 
in Alexa ist sicherlich nicht gewollt und fördert den WAF (Women acceptance factor) auch nicht wirklich, 
wenn es eigentlich "Badezimmer Licht" heißen soll.   

Hierzu wurde vom User "<span class="responsive-hide">Zippolighter</span>" eine Lösung gefunden:

> Einmal auf der CCU die Räume aufrufen und editieren und wieder abspeichern (es reicht der "Edit mode"). 
Nach dem Neustart der Adapter "hm-rpc"  und "hm-rega" sind die Namen alle in deutsch und in korrekter Schreibweise vorhanden.