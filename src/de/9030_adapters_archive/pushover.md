
# Adapter - Pushover

<span style="line-height: 1.5;">Der Pushover Adapter erlaubt es, Pushnachrichten mit ioBroker an Android- und iOS-Geräte, sowie an "Pushover for Desktop" Mac OS X und einen Browser-Client versenden. Der Nachrichtendienst pushover.net stellt dazu eine derzeit kostenlose Platform dar. Die Empfangssoftware für Endgeräte ist z.T. kostenpflichtig.</span> <span style="line-height: 1.5;"></span>


## **Einrichtung pushover.net:**

Zur Verwendung des Adapters benötigt man einen Account bei pushover.net. Nach dem Login erhält man einen persönlichen User-Key aus 30 Zeichen. Danach erstellt man eine Application ("Register an Application" z.B. mit dem Namen "ioBroker Mitteilung") und erhält daraufhin für diese Application einen Token (ebenfalls 30 Zeichen).

Schließlich muss man noch ein Empfangsgerät registrieren, auf dem die Nachrichten ankommen sollen ("Your Devices"). Es später möglich, unterschiedliche Nachrichten an unterschiedliche Geräte zu senden.

## **Konfiguration:**

[
![](img/pushover_pushover-konfig.png)


**Group Key:** Hier wird der User-Key (30 Zeichen) eingetragen. Er legt fest, an wen die Nachricht verschickt wird.

**Token:** Hier wird der Token (30 Zeichen) eingetragen. Er legt fest, welche Pushover-Application die Nachricht abschickt.

**Titel:** Standard Betreff einer Pushover Nachricht

**Klang:** Eine Auswahl von Klingeltönen. "Default" nutzt die auf pushover.net für eine Application festgelegten Töne.

**Vorrang:** Prioritätenwahl: Die Auswahl erlaubt "still", "Voreinstellung" und "Hoch-Priorität"

## [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-pushover#nutzung)**Bedienung:**

Der Adapter lässt sich aus dem Javascript-Editor ansprechen. Mit den Zeilen

`sendTo("pushover", { message: text, title: titel, priority: prio });`

wird eine Nachricht als Zeichenkette (text), mit Betreff als Zeichenkette (titel, überschreibt Adaptervoreinstellung) und Priorität als Ganzzahl von -2 bis 2 (prio, 5 Stufen von niedrig bis hoch) verschickt.

Beispiel im Javascript:

<pre class="">var idStatusBriefkasten = "javascript.0.Status_Briefkasten"/*Status_Briefkasten*/; // ioBroker Variable mit dem Status leer/0, voll/1 

function meldung_push (text, titel, prio) {
    sendTo("pushover", { 
        message: text, 
        title: titel, 
        priority: prio 
    }); 
} 

on({ 
    id: idStatusBriefkasten,
    change: 'ne' 
}, function (data) { // Status Briefkasten ändert sich 
    var status = 'Briefkasten',
        betreff = 'ioBroker Meldung'; 
    if (data.state.val === 0) { // leer
        status = status + ' wurde geleert';
        meldung_push(status, betreff, -2); 
    } else if (data.state.val === 1) { // voll 
        status = status + ' ist voll';
        meldung_push(status, betreff, 1);
    }
});</pre>

  
![Pushover App unter iOS 9](img/pushover_screenshot-Pushover-577x1024.png)
