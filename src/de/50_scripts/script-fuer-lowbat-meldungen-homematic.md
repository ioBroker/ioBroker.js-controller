# LOWBAT-Meldungen

Mit Hilfe dieses Scriptes werden LOWBAT Meldungen aus der Homematic Zentrale ausgewertete. Es wir die Anzahl der vorhanden Meldungen, die Geräte und ie maximale Anzahl an Meldungen ermittelt.


## Script

<pre class="height-set:true lang:js decode:true ">createState('zählenLowbat.möglicheLOWBAT', 0);   // wenn benötigt: Anzahl der vorhandenen LOWBAT
createState('zählenLowbat.anzahlLOWBAT', 0);     // wenn benötigt: Anzahl der vorhandenen LOWBAT
createState('zählenLowbat.textLOWBAT', " ");     // Anzahl LOWBAT, die an sind als Variable unter Javascript.0 anlegen

var cacheSelectorLOWBAT  = $('channel[state.id=*.LOWBAT]');

function countLowbat(obj) {
   // Setzt die Zähler vor dem Durchlauf aller Elemente *.LOWBAT auf 0
   var moeglicheLOWBAT = 0;
   var anzahlLOWBAT    = 0;
   var textLOWBAT      = [];

   if (obj) {
      log('Auslösender Aktor: ' + obj.id + ': ' + obj.newState.val);  // Info im Log, welcher Zustand sich geändert hat
   } else {
      log('Ausgelöst bei Timer'); 
   } 

   cacheSelectorLOWBAT.each(function (id, i) {                         // Schleife für jedes gefundenen Element *.LOWBAT
      var status = getState(id).val;                                  // Zustand *.LOWBAT abfragen (jedes Element)
      var obj    = getObject(id);
      if (status === true) {                                          // wenn Zustand = true, dann wird die Anzahl der Geräte hochgezählt
         textLOWBAT.push(obj.common.name);                           // Zu Array hinzufügen
      }                
      log("Geräte Nr. " + i + ": " + getObject(id).common.name + ": " + status);
      ++anzahlLOWBAT;                                                 // Zählt die Anzahl der vorhandenen Geräte unabhängig vom Status
   }); 

   // Schleife ist durchlaufen. Im Log wird der aktuelle Status (Anzahl, davon LOWBAT zutreffend) ausgegeben
   log("Text: " + textLOWBAT);
   log("Anzahl Geräte: " + moeglicheLOWBAT + " # davon LOWBAT erkannt: " +  anzahlLOWBAT);

   // die ermittelten Werte werden als javascript.0\. Variable in ioBroker gespeichert (z.B. für die Verarbeitung in VIS)
   setState("zählenLowbat.textLOWBAT",     textLOWBAT.join(',<br>')); // Schreibt die aktuelle Namen der Geräte mit LOWBAT Meldung
   setState("zählenLowbat.anzahlLOWBAT",   textLOWBAT.length);        // Schreibt die aktuelle Anzahl der Geräte im System
   setState("zählenLowbat.möglicheLOWBAT", moeglicheLOWBAT);          // Schreibt die aktuelle Anzahl der vorhandene Geräte 
}

cacheSelectorLOWBAT.on(function(obj) {    // bei Zustandänderung *. LOWBAT in allen Gewerken
   countLowbat(obj);
});
schedule("*/60 * * * *", function () {                                  //oder!! soll entweder ausgelöst werden alle 10 Minuten
   log("===>Will be triggered every 60 minutes!"); 
   countLowbat();
});</pre>