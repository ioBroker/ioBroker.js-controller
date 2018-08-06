# Stromverbrauch erfassen

Erfassen des Stromverbrauchs pro Zeitraum. Es können mehrere Geräte geloggt werden. Perioden sind: Tag, Woche, Monat, Quartal und Jahr


## Script

<pre class="lang:js decode:true codecontent  ">/* Strom Zaehlerstaende, Verbrauch und Kosten

Skript dient zur Ermittlung des Stromverbrauchs bei Geräten, 
die mit den Homematic Zwischenstecker-Schaltaktor mit Leistungsmessung oder den FS20 EM1000 verbunden sind

Zählerstände werden gespeichert jeweils
-jeden Tag
-jede Woche Montag
-jeden Monatsersten
-jeden Quartalsersten
-jedes Neujahr
wenn ein neuer Wert reinkommt.

Der Strompreis wird in die Variable "Strompreis_aktuell" geschrieben. 
Änderungen des Strompreispreises müssen rechtzeitig per Cronjob programmiert werden.

Die Stromkosten (Verbrauch * Preis) werden ebenso
-jeden Tag
-jede Woche Montag
-jeden Monatsersten
-jeden Quartalsersten
-jedes Neujahr

genullt und bis dahin durch die Berechnung (der Differenz des aktuellen Zählerstandes - Zählerstand Beginn des Zeitraums) * Strompreis ermittelt

Der kumulierte Zählerstand berücksichtigt evtl. Resets und Überläufe der realen Zählerstände der Geräte.

Todo: Wenn aktueller Zählerstand < letzter Zählerstand, dann push und korrektur 
wie hier: http://homematic-forum.de/forum/viewtopic.php?f=27&t=23688&p=201954&hilit=HM+ES+PMSw1+Pl+Zähler#p201959

erstellt: 09.02.2016 von pix auf Basis des alten Skriptes
01.03.2016 Leerzeichen werden aus Gerätenamen gelöscht
*/

var logging = false;
var instanz = 'javascript.2';  instanz = instanz + '.';
var pfad =     'Strom.';                                                   // Pfad innerhalb der Instanz
var blacklist= [' Strommessung', ' Küche'];                                     // persönliche Blacklist: Diese Teile werden aus den Homematic Gerätenamen entfernt

// Variablen erstellen, Zählerstände einlesen und Stromkosten errechnen (pro Gerät)
// Strompreis
createState(pfad + 'Preis.aktuell.Arbeitspreis', 0.2495, {
    name: 'Strompreis - aktueller Arbeitspreis (brutto)',
    unit: '€/kWh'
});
createState(pfad + 'Preis.aktuell.Grundpreis', 3.95, {                           // wird noch nicht eingerechnet
    name: 'Strompreis - aktueller Grundpreis (brutto)',
    unit: '€/Monat'
});

var idStrompreis = instanz + pfad + 'Preis.aktuell.Arbeitspreis';

// Einlesen der aktuellen Daten vom Zähler
on({id: /\.METER|\.ENERGY_COUNTER$/
}, function(obj) {

    var idbyname = getIdByName(obj.common.name, true);
    if (logging) {   
        log('-------- Strommesser ---------');
        log('RegExp-Funktion ausgelöst');
        log('Gewerk:       ' + obj.role);   // undefined
        log('Beschreibung: ' + obj.desc);   // undefined
        log('id:           ' + obj.id);
        log('Name:         ' + obj.common.name);   // Waschmaschine Küche:2.ENERGY_COUNTER !!!!! Mac mini Strommessung.METER
        log('channel ID:   ' + obj.channelId);     // hm-rpc.0.MEQ0170864.2
        log('channel Name: ' + obj.channelName);   // Waschmaschine Küche:2
        log('device ID:    ' + obj.deviceId);      // hm-rpc.0.MEQ0170864
        log('device name:  ' + obj.deviceName);    // Küche Waschmaschine
        log('neuer Wert:   ' + obj.newState.val);  // 16499.699982
        log('alter Wert:   ' + obj.oldState.val);  // 16499.699982
        log('Einheit:      ' + obj.common.unit);   // Wh
        log('IDbyNameFunktion: ' + idbyname[0]); // hm-rpc.0.MEQ0170864.2.ENERGY_COUNTER
    }
    // Gerätenamen erstellen
    var geraetename = entferneDatenpunkt(obj.common.name);
    geraetename = geraetename.replace(/\s/g, ""); // per Regexp Leerzeichen entfernen
    if (logging) log('Gerätename: ' + geraetename); 

    // States erstellen (CreateStates für dieses Gerät)
    erstelleStates (geraetename);

    // prüfe eingehende Daten
      // nicht nötig, da subscribe eh nur anspringt, wenn gelieferte Daten = oder > sind als alte (gt)
      // zweiter subscribe übernimmt das

    // prüfe und schreibe Daten  
    var idKumuliert =  instanz + pfad + geraetename + '.Zaehlerstand.kumuliert',
        idBackup =     instanz + pfad + geraetename + '.Zaehlerstand.Backup';

    if (obj.newState.val >= obj.oldState.val) {                                     // neuer Wert größer alter wert -> alles gut
        setState(idKumuliert, obj.newState.val + getState(idBackup).val);           // Kumulierten Wert mit Ist-Wert (inkl. Backup) synchronisieren
    } else {                                                                        // neuer Wert kleiner als alter Wert -> Achtung Zähler im Gerät übergelaufen oder genullt
        var differenz = obj.oldState.val - obj.newState.val;                        // Differenz berechnen
        setState(idBackup, getState(idBackup).val + differenz);                     // und Differenz und Backup addieren "und den Werteabriss ausgleichen"
        setState(idKumuliert, data.newState.val + getState(idBackup).val);          // damit neuer kumulierter Wert stetig weiter wächst
        meldung = 'Achtung!\n\n' 
                + 'Der Stromzählerstand (' + geraetename + ') ist übergelaufen oder gelöscht worden (ggf. Stromausfall).\n'
                + 'Der letzte Zählerstand vor dem Reset wird nun zum Neuen addiert. Bitte unbedingt die Werte prüfen. \n\n '
                + 'ioBroker';
        betreff = 'ioBroker Meldung';
        prio = getState(OptinPushPrio).val;
        meldung_push(meldung, betreff, prio);
        log('Zählerstand (' + geraetename + ') übergelaufen oder genullt. Backup wird ab jetzt verwendet.', 'error');
    }

    // aktualisiere den Verbrauch und die Kosten
    berechneVerbrauchKosten(geraetename, (getState(idKumuliert).val / 1000).toFixed(3), getState(idStrompreis).val); // in kWh

    // ETAPPENWERTE SPEICHERN und RESETS DER WERTE #################################
    // Verzögerungen eingebaut. Resets, wenn die ersten Werte der neuen Etappe reinkommen
    if ( zeit(obj.oldState.ts).Stunde > zeit(obj.newState.ts).Stunde ) { // neue Stunde kleiner als alte Stunde (Mitternacht)
        setTimeout(function() {
            resetKostenVerbrauch(geraetename, 'Tag');
        }, 1000);
        setTimeout(function() {
            schreibeZaehlerstand(geraetename, 'Tag');
        }, 1500);
    }  
    if ( zeit(obj.oldState.ts).Wochentag ===  0 && zeit(obj.newState.ts).Wochentag === 1) { // So auf Mo
        setTimeout(function() {
            resetKostenVerbrauch(geraetename, 'Woche');
        }, 2000);
        setTimeout(function() {
            schreibeZaehlerstand(geraetename, 'Woche');
        }, 2500);
    }   
    if ( zeit(obj.oldState.ts).Tag > zeit(obj.newState.ts).Tag ) { // wenn alter Tag größer als neuer Tag (am 1\. eines Monats)   
        setTimeout(function() {
            resetKostenVerbrauch(geraetename, 'Monat');
        }, 3000);
        setTimeout(function() {
            schreibeZaehlerstand(geraetename, 'Monat');
        }, 3500);
    }    
    var old_month = parseInt(zeit(obj.oldState.ts).Monat,10);
    var new_month = parseInt(zeit(obj.state.ts).Monat, 10);
    // wenn obj.oldState.ts im März [3] und obj.newState.ts im April [4] oder
    //      obj.oldState.ts im Juni [6] und obj.newState.ts im Juli [7] oder
    //      obj.oldState.ts im Sept [9] und obj.newState.ts im Okt [10] oder
    //      obj.oldState.ts im Dez [12] und obj.newState.ts im Jan [1], dann Quartal
    //log('Monat (alt): ' + old_month);
    //log('Monat (neu): ' + new_month);
    if ( (old_month === 3 && new_month === 4)  || (old_month === 6 && new_month === 7)  || (old_month === 9 && new_month === 10)  || (old_month === 12 && new_month === 1) ) {
        setTimeout(function() {
            resetKostenVerbrauch(geraetename, 'Quartal');
        }, 4000);
        setTimeout(function() {
            schreibeZaehlerstand(geraetename, 'Quartal');
        }, 4500);
    }
    // wenn obj.oldState.ts im alten Jahr liegt, dann Jahr
    if (zeit(obj.oldState.ts).Jahr < zeit(jetzt).Jahr) {
        setTimeout(function() {
            resetKostenVerbrauch(geraetename, 'Jahr');
        }, 5000);
        setTimeout(function() {
            schreibeZaehlerstand(geraetename, 'Jahr');
        }, 5500);
    }
    if (logging) log('------------ ENDE ------------');
});

function schreibeZaehlerstand(geraet, zeitraum) { 
    var idKumuliert =    instanz + pfad + geraet + '.Zaehlerstand.kumuliert',
        idZaehlerstand = instanz + pfad + geraet + '.Zaehlerstand.' + zeitraum;
                                                                                  // Zählerstand für übergebene Zeitraum und das Gerät in Wh auslesen 
        setState(idZaehlerstand, parseFloat( (getState(idKumuliert).val / 1000).toFixed(3)) );  // und in kWh (mit drei Dezimalstellen) speichern (also durch 1000)

        // hier externe Protokollierung in Datei einbauen

        log('Zählerstände für das Gerät ' + geraet + ' (' + zeitraum + ') gespeichert');
} 

function resetKostenVerbrauch(geraet, zeitraum) { 
    setState(instanz + pfad + geraet + '.Kosten.' + zeitraum, 0);        // Reset der Stromkosten für den übergebenen Zeitraum
    setState(instanz + pfad + geraet + '.Verbrauch.' + zeitraum, 0);     // Reset des Stromverbrauchs für den übergebenen Zeitraum 
    log('Stromkosten und Stromverbrauch für das Gerät ' + geraet + ' (' + zeitraum + ') zurückgesetzt');
} 

function zeit (time) {
    jetzt = new Date(formatDate(time,"JJJJ.MM.TT SS:mm:ss"));
    var jahr       = jetzt.getFullYear();
    var monat      = (jetzt.getMonth()+1 < 10) ? '0' + (jetzt.getMonth()+1) : jetzt.getMonth()+1;
    var tag        = (jetzt.getDate() < 10) ? '0' + jetzt.getDate() : jetzt.getDate();
    var wochentag  = jetzt.getDay(); // startet am Sonntag mit 0
    var stunde     = (jetzt.getHours() < 10) ? '0' + jetzt.getHours() : jetzt.getHours();
    var minute     = (jetzt.getMinutes() < 10) ? '0' + jetzt.getMinutes() : jetzt.getMinutes();
    var sekunde    = (jetzt.getSeconds() < 10) ? '0' + jetzt.getSeconds() : jetzt.getSeconds();
    return {
        'Jahr'      : jahr,
        'Monat'     : monat,
        'Tag'       : tag,
        'Wochentag' : wochentag,
        'Stunde'    : stunde,
        'Minute'    : minute,
        'Sekunde'   : sekunde
    };
}

function berechneVerbrauchKosten(geraet, zaehler, preis) {                      // bei jedem eingehenden Wert pro Gerät
    // Tag [Verbrauchskosten = (Zähler_ist - Zähler_Tagesbeginn) * Preis ] --- zaehler muss immer größer sein als Tages, Wochen, etc.-Wert
    setState(instanz + pfad + geraet + '.Verbrauch.Tag',     (zaehler - getState(instanz + pfad + geraet + '.Zaehlerstand.Tag').val).toFixed(3));           // Verbrauch an diesem Tag in kWh
    setState(instanz + pfad + geraet + '.Kosten.Tag',       ((zaehler - getState(instanz + pfad + geraet + '.Zaehlerstand.Tag').val) * preis).toFixed(3));  // Kosten an diesem Tag in €
    // Woche    
    setState(instanz + pfad + geraet + '.Verbrauch.Woche',   (zaehler - getState(instanz + pfad + geraet + '.Zaehlerstand.Woche').val).toFixed(3));
    setState(instanz + pfad + geraet + '.Kosten.Woche',     ((zaehler - getState(instanz + pfad + geraet + '.Zaehlerstand.Woche').val) * preis).toFixed(3));
    // Monat    
    setState(instanz + pfad + geraet + '.Verbrauch.Monat',   (zaehler - getState(instanz + pfad + geraet + '.Zaehlerstand.Monat').val).toFixed(3));
    setState(instanz + pfad + geraet + '.Kosten.Monat',     ((zaehler - getState(instanz + pfad + geraet + '.Zaehlerstand.Monat').val) * preis).toFixed(3));
    // Quartal    
    setState(instanz + pfad + geraet + '.Verbrauch.Quartal', (zaehler - getState(instanz + pfad + geraet + '.Zaehlerstand.Quartal').val).toFixed(3));
    setState(instanz + pfad + geraet + '.Kosten.Quartal',   ((zaehler - getState(instanz + pfad + geraet + '.Zaehlerstand.Quartal').val) * preis).toFixed(3));
    // Jahr    
    setState(instanz + pfad + geraet + '.Verbrauch.Jahr',    (zaehler - getState(instanz + pfad + geraet + '.Zaehlerstand.Jahr').val).toFixed(3));
    setState(instanz + pfad + geraet + '.Kosten.Jahr',      ((zaehler - getState(instanz + pfad + geraet + '.Zaehlerstand.Jahr').val) * preis).toFixed(3));  
    if (logging) log('Stromverbrauch und -kosten (' + geraet + ') aktualisiert', 'info');
}

function erstelleStates (geraet) {
    // Kumulierter Zählerstand (wird nie kleiner)
    createState(pfad + geraet + '.Zaehlerstand.kumuliert', 0, {name: 'Kumulierter Zählerstand (' + geraet + ') inkl. Backups', type: 'number', unit:'Wh'});

    // Zählerstand
    createState(pfad + geraet + '.Zaehlerstand.Tag',     0, {name: 'Zählerstand Tagesbeginn ('       + geraet + ')', type: 'number', unit:'kWh'});
    createState(pfad + geraet + '.Zaehlerstand.Woche',   0, {name: 'Zählerstand Wochenbeginn ('      + geraet + ')', type: 'number', unit:'kWh'});
    createState(pfad + geraet + '.Zaehlerstand.Monat',   0, {name: 'Zählerstand Monatsbeginn ('      + geraet + ')', type: 'number', unit:'kWh'});
    createState(pfad + geraet + '.Zaehlerstand.Quartal', 0, {name: 'Zählerstand Quartalsbeginn ('    + geraet + ')', type: 'number', unit:'kWh'});
    createState(pfad + geraet + '.Zaehlerstand.Jahr',    0, {name: 'Zählerstand Jahresbeginn ('      + geraet + ')', type: 'number', unit:'kWh'});

    // Backup Zählerstand
    createState(pfad + geraet + '.Zaehlerstand.Backup',  0, {
        name: 'Zählerstand Backup ('+ geraet + '), Differenz aus altem und neuem Wert nach Überlauf oder Reset',
        desc: 'wird beim Umspringen des Original-Zählerstandes (' + geraet + ') zu diesem addiert',
        type: 'number',
        unit: 'Wh'});

    // Verbrauch 
    createState(pfad + geraet + '.Verbrauch.Tag',        0, {name: 'Verbrauch seit Tagesbeginn ('    + geraet + ')', type: 'number', unit:'kWh'});
    createState(pfad + geraet + '.Verbrauch.Woche',      0, {name: 'Verbrauch seit Wochenbeginn ('   + geraet + ')', type: 'number', unit:'kWh'});
    createState(pfad + geraet + '.Verbrauch.Monat',      0, {name: 'Verbrauch seit Monatsbeginn ('   + geraet + ')', type: 'number', unit:'kWh'});
    createState(pfad + geraet + '.Verbrauch.Quartal',    0, {name: 'Verbrauch seit Quartalsbeginn (' + geraet + ')', type: 'number', unit:'kWh'});
    createState(pfad + geraet + '.Verbrauch.Jahr',       0, {name: 'Verbrauch seit Jahresbeginn ('   + geraet + ')', type: 'number', unit:'kWh'});

    // Stromkosten
    createState(pfad + geraet + '.Kosten.Tag',           0, {name: 'Stromkosten heute ('             + geraet + ')', type: 'number', unit:'€'  });
    createState(pfad + geraet + '.Kosten.Woche',         0, {name: 'Stromkosten Woche ('             + geraet + ')', type: 'number', unit:'€'  });
    createState(pfad + geraet + '.Kosten.Monat',         0, {name: 'Stromkosten Monat ('             + geraet + ')', type: 'number', unit:'€'  });
    createState(pfad + geraet + '.Kosten.Monat',         0, {name: 'Stromkosten Monat ('             + geraet + ')', type: 'number', unit:'€'  });
    createState(pfad + geraet + '.Kosten.Quartal',       0, {name: 'Stromkosten Quartal ('           + geraet + ')', type: 'number', unit:'€'  });
    createState(pfad + geraet + '.Kosten.Jahr',          0, {name: 'Stromkosten Jahr ('              + geraet + ')', type: 'number', unit:'€'  });

    if (logging) log('States in der Instanz ' + instanz + pfad + ' erstellt');   
}

function checkBlacklist (name) {                                                // Unterfunktion von entferneDatenpukt
    for(var i = 0; i < blacklist.length; i++) {                                 // Blacklist durchgehen
        if (name.indexOf(blacklist[i]) != -1) {                                 // wenn vorhanden (nicht nicht vorhanden)
            return( name.substring(0, name.indexOf(blacklist[i])) );            // Zeichenketten aus der Blacklist löschen
        } 
    }  
}

function entferneDatenpunkt(geraet) {
    var rueckgabe;
    if (geraet.indexOf(":2.ENERGY_COUNTER") != -1) {
        rueckgabe = geraet.substring(0, geraet.indexOf(":2.ENERGY_COUNTER"));
    } else 
    if (geraet.indexOf(".METER") != -1) {
        rueckgabe = geraet.substring(0, geraet.indexOf(".METER"));
    }
    // Rückgabe sollte keine Sonderzeichen oder Leerzeichen enthalten. Wenn doch, werden die entfernt oder ersetzt
    // todo
    rueckgabe = checkBlacklist(rueckgabe);                                      // Wenn man keine Blacklist braucht, kann man diesen Teil auskommentieren
    return rueckgabe;
}</pre>