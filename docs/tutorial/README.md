
# Adapter

## Was ist ein Adapter?
Über sogenannte Adapter kommuniziert ioBroker mit unterschiedlichsten Systemen, aus 
dem Bereich Smart Home z.B. mit HomeMatic, KNX, FS20 und EnOcean, aus dem Bereich 
Home Entertainment mit Sonos-Systemen, Dreamboxen, diversen AV-Receivern und SmartTVs, 
mit unterschiedlichsten Webservices und diverser Software wie z.B. MySQL oder Graphite.

Es sind sozusagen weitere kleine Programme, die es euch ermöglichen, mit euren 
unterschiedlichen Smarthome Geräten zu kommunizieren. Wenn ihr hier keinen passenden 
Adapter findet, ist es erst einmal auch nicht so ohne weiteres möglich, mit den von 
euch gewünschten Geräten zu kommunizieren. 

In diesem Fall müsstet ihr entweder selbst einen Adapter schreiben oder den Vorschlag
im ioBroker Forum bringen und hoffen, dass jemand anderes einen Adapter dafür schreibt 
und diesen dann in ioBroker implementiert. Im nächsten Beitrag gehe ich aber noch mal 
etwas detaillierter auf die Adapter ein, und erkläre euch welche ihr benötigt und wie 
ihr sie einrichtet.


## Welche Adapter gibt es?
Für die meisten und geläufigen Dinge gibt es aber Adapter. Um einige davon zu nennen 
wären da: Logitech Harmony, Philips Hue, Homematic, Neato Botvac und viele mehr. 
Die vollständige Liste aller Adapter findet ihr hier.

In der offiziellen [Adapterliste](http://download.iobroker.net/list.html) werden 
mittlerweile 200 Adapter aufgeführt.

Einige sind noch nicht in dem stable Repository enthalten. Daher kann die 
Anzahl verfügbarer Adapter bei Usern die das stable (default) Repository nutzen niedriger sein.


