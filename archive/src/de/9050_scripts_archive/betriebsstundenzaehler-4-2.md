# Zählen von Fenstern

Script zählt die Fenster in allen Räumen und meldet die offenen Fenster namentlich Datenpunkte: _zählen_Fenster.anzahlFenster_ -- Anzahl aller Fenster (Number) _zählen_Fenster.anzahlFensterauf_ -- Anzahl aller geöffneten Fenster (Number) _zählen_Fenster.textFensterauf_ -- Namen der geöffneten Fenster (kommasepariert, String) _zählen_Fenster.textFensteraufAnsage_ -- Namen der geöffneten Fenster (aufbereitet für die Sprachansage) bzw. "Alle Fenster sind verschlossen" Das Skript läuft auf der _Javascript Instanz 0_. Es unterscheidet zwischen Tür-Fenster-Kontakten bzw. RotateHandleSensors RHS Fensterdrehgriffkontakten, wenn der Sensor entweder "TFK" oder "RHS" im Namen trägt. Die Sensoren müssen dem Gewerk "Fenster" zugeordnet sein.


## Script

<div class="postbody">

<pre class="lang:js decode:true codecontent">/* System Zahl Fenster

zählt die Fenster in allen Räumen und meldet die offenen Fenster namentlich
Daten kommen vom Gewerk 'Fenster'

erstellt: 17.06.2015 nach diesem Vorbild: http://forum.iobroker.net/viewtopic.php?f=21&t=869&sid=f9ba5657489ff431a1990884f90779c1#p6564
05.08.2015 STATE aus der Ausgabe entfernt nach Idee von stephan61 http://forum.iobroker.org/viewtopic.php?f=21&t=473&start=20#p9267
02.12.2015 Fehler beseitigt bei Anzahl Fenster, wenn offen (Unterscheidung RHS und TFK)
           Überprüfung des Zustandes (function fensterstatus) und Übergabe an Text
25.01.2016 Fenster Nummer in Log korrigiert (+1)
02.03.2016 Ansage für TTS aufbereitet
02.07.2016 Regulärer Ausdruck (gierig) bei Aufbereitung für Ansage
*/

function fensterstatus(zustand) {
    var meldung;
    switch (zustand) {
        case 1:
            meldung = 'RHS gekippt';
        break;
        case 2:
            meldung = 'RHS offen';
        break;
        case true:
            meldung = 'TFK offen';
        break;
        default:
            meldung = 'geschlossen';
        break;
    }
    return(meldung);
}

createState('zählen_Fenster.anzahlFenster', {     // wenn benötigt: Anzahl der vorhandenen Fenster
    type: 'number',
    min: 0,
    def: 0,
    role: 'value'
});
createState('zählen_Fenster.anzahlFensterauf', {  // Anzahl der Fenster, die auf sind als Variable unter Javascript.0 anlegen
    type: 'number',
    min: 0,
    def: 0,
    role: 'value'
});
createState('zählen_Fenster.textFensterauf', {      // Anzahl der offenen Fenster und deren Namen als Variable unter Javascript.0 anlegen
    type: 'string',
    def: ' ',
    role: 'value'
});    

var cacheSelectorState  = $('channel[state.id=*.STATE](functions="Fenster")');

function countFenster(obj) {
     // Setzt die Zähler vor dem Durchlauf aller Elemente *.STATE im Gewerk Fenster auf 0
    var anzahlFenster = 0;
    var anzahlFensterauf = 0;
    var textFensterauf = [];

    log('Auslösender Aktor: ' + obj.id + ': ' + obj.newState.val);              // Info im Log, welcher Zustand sich geändert hat

    cacheSelectorState.each(function (id, i) {                                  // Schleife für jedes gefundenen Element *.STATE im Gewerk Fenster
        var status = getState(id).val;                                          // Zustand *.STATE abfragen (jedes Element)
        var obj    = getObject(id);
        var name = getObject(id).common.name;
        var devicename = name.substring(0, name.indexOf(".STATE"));             //.state aus Text entfernen
        if (status /*TFK*/ || status === 1 || status === 2 /*RHS*/) {  // wenn Zustand offen, dann wird die Anzahl der Fenster hochgezählt
             ++anzahlFensterauf;
             textFensterauf.push(devicename + ' (' + fensterstatus(status) + ')');  // Name und Zustand zum Array hinzufügen
        }                
        log('Fenster #' + (i+1) + ': ' + devicename + ' ' + fensterstatus(status)/* + ' (' + status + ' / ' + typeof status + ')'*/);
        ++anzahlFenster;                                                        // Zählt die Anzahl der vorhandenen Fenster unabhängig vom Status
    }); 

    // Schleife ist durchlaufen. Im Log wird der aktuelle Status (Anzahl, davon an) ausgegeben
        log("Text: " + textFensterauf);
        log("Anzahl Fenster: " + anzahlFenster + " - davon Fenster auf: " +  anzahlFensterauf);

    // die ermittelten Werte werden als javascript.0\. Variable in ioBroker gespeichert (z.B. für die Verarbeitung in VIS)
    setState("zählen_Fenster.textFensterauf", textFensterauf.join(',<br>'));    // Schreibt die aktuelle Namen der offenen Fenster
    setState("zählen_Fenster.anzahlFensterauf", textFensterauf.length);         // Schreibt die aktuelle Anzahl der offenen Fenster
    setState("zählen_Fenster.anzahlFenster", anzahlFenster);                    // Schreibt die aktuelle Anzahl der vorhandene Elemente im Gewerk Fenster
}

cacheSelectorState.on(function(obj) {    // bei Zustandänderung *. STATE im Gewerk Fenster
    countFenster(obj);
});

// Variable für Ansage aufbereiten
createState('zählen_Fenster.textFensteraufAnsage', {
    type: 'string',
    def: ' ',
    role: 'value'
});  
// Anzahl der Fenster, die auf sind, für Ansage aufbereitet
var idQuelle = 'javascript.0.zählen_Fenster.textFensterauf',
    idAnsage = 'javascript.0.zählen_Fenster.textFensteraufAnsage';

on(idQuelle, function (obj) {
    var text = obj.state.val;
    text = text.replace(/RHS/g, 'Drehgriff');
    text = text.replace(/TFK/g, 'Reedkontakt');
    text = (text.length > 1) ? 'Geöffnete Fenster: ' + text : 'Alle Fenster sind verschlossen';
    setState(idAnsage, text);
});</pre>

</div>