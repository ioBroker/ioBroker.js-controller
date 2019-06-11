---
lastChanged: "06.06.2019"
---

# States und Datenpunkte

Ein **Datenpunkt** besteht aus einem statischen Objekt vom Typ "state" und aus einem dynamischen Zustand (state).

Eigenschaften eines Zustands sind
 * val - aktueller Wert
 * ack - Flag, das die Bestätigung des Wertes durch das Zielsystem anzeigt
 * ts  - Unix Zeitstempel der letzten Aktualisierung des Zustands (in Millisekunden)
 * lc  - Unix Zeitstempel der letzten Wertänderung  (in Millisekunden)
 * q - [Qualität](../dev/objectsschema.md#states)
 * from - (optional) Quelle(Adapter Instanz) der letzten Aktualisierung
 * user - (optional) Anwendername, wer als letzter den Wert geschrieben hat.
 * c - (optional) Kommentar
 * expire - (optional) Zeit in Sekunden, wann der Wert auf `null` resetet wird.
  

?> ***Dies ist ein Platzhalter***.
   <br><br>
   Hilf mit bei ioBroker und erweitere diesen Artikel.  
   Bitte beachte den [ioBroker Style Guide](community/styleguidedoc), 
   damit die Änderungen einfacher übernommen werden können.
