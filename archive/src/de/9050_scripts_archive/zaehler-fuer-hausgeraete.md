# Zähler für Hausgeräte

Zählen von Schaltvorgängen und Darstellung in Perioden


## Script

<pre class="codecontent">/* /* Küche Spülmaschine Zaehler
Skript zum Überwachen des Status der Spülmaschine (Variable in Status_Geraete.js)
Skript zählt das Umschalten des Status auf "in Betrieb" und damit die Anzahl der Waschvorgänge

Variable Anpassung an verschiedene Geräte (für jedes Gerät ein eigenes Skript verwenden)

01.01.2016 erstellt von Pix für Spülmaschine
02.01.2016 Manuelles Addieren/Subtrahieren hinzugefügt
*/
var name_geraet = 'Spuelmaschine', // zB Waschmaschine (Achtung keine Umlaute)
    beschreibung = 'Spülvorgänge'; // zB Waschvorgänge oder Spülvorgänge oder Einschaltvorgänge, Umlaute erlaubt

// Manuell anpassen (wegen der flüssigen Sprache :] )
createState('Optin.Kueche.Spuelmaschine.Zaehler.Push', true, {
    name: 'Optin Anzahl der Spülvorgänge der Spülmaschine melden',
    desc: 'Soll gemeldet werden, wie oft die Spülmaschine gestartet wurde?',
    type: 'boolean', 
    read: true,
    write: true
});

var beschreibung_log = 'Anzahl Spülvorgänge',
    optin_beschreibung = 'Anzahl Spülvorgäng der Spülmaschine',
    idOptinPush = "javascript.0.Optin.Kueche.Spuelmaschine.Zaehler.Push";

// Diese Variable wird überwacht auf Änderung nach true
var idStatus = "javascript.0.Status.Spuelmaschine"/*Status Spuelmaschine*/; // aus Status_Geraete.js

// Zählerstände bei Reset mitloggen?
var logging = true;

// +++++ Ab hier keine Änderungen vornehmen +++++

//Variablen anlegen
    createState('Status.' + name_geraet + '.Zaehler.Tag', 0, {
        read: true,
        write: true,
        type: 'number',
        name: name_geraet + ' - Anzahl ' + beschreibung + ' heute'
    });
    createState('Status.' + name_geraet + '.Zaehler.Woche', 0, {
        read: true,
        write: true,
        type: 'number',
        name: name_geraet + ' - Anzahl ' + beschreibung + ' diese Woche'
    });
    createState('Status.' + name_geraet + '.Zaehler.Monat', 0, {
        read: true,
        write: true,
        type: 'number',
        name: name_geraet + ' - Anzahl ' + beschreibung + ' diesen Monat'
    });
    createState('Status.' + name_geraet + '.Zaehler.Quartal', 0, {
        read: true,
        write: true,
        type: 'number',
        name: name_geraet + ' - Anzahl ' + beschreibung + ' dieses Quartal'
    });
    createState('Status.' + name_geraet + '.Zaehler.Jahr', 0, {
        read: true,
        write: true,
        type: 'number',
        name: name_geraet + ' - Anzahl ' + beschreibung + ' dieses Jahr'
    }); 

    createState('Status.' + name_geraet + '.Zaehler.addieren', false, {
        read: true,
        write: true,
        type: 'booelan',
        name: name_geraet + ' - Zähler um eins erhöhen'
    });
    createState('Status.' + name_geraet + '.Zaehler.subtrahieren', false, {
        read: true,
        write: true,
        type: 'boolean',
        name: name_geraet + ' - Zähler um eins vermindern'
    });

var idZaehler_addieren =     'javascript.0.Status.' + name_geraet + '.Zaehler.addieren',
    idZaehler_subtrahieren = 'javascript.0.Status.' + name_geraet + '.Zaehler.subtrahieren';

var idZaehlerTag =     'javascript.0.Status.' + name_geraet + '.Zaehler.Tag',
    idZaehlerWoche =   'javascript.0.Status.' + name_geraet + '.Zaehler.Woche',
    idZaehlerMonat =   'javascript.0.Status.' + name_geraet + '.Zaehler.Monat',
    idZaehlerQuartal = 'javascript.0.Status.' + name_geraet + '.Zaehler.Quartal',
    idZaehlerJahr =    'javascript.0.Status.' + name_geraet + '.Zaehler.Jahr';

// Statusvariable überwachen und Ausgabe veranlassen
on({
    id: idStatus,
    change: 'ne'
}, function (data) {
    if (data.newState.val === 1 ) { // eingeschaltet
        // hochzählen
        hochzaehlen();
    }
});

// Manuelles hochzaehlen
on(idZaehler_addieren, function (obj) {
    if (!obj.newState.ack && obj.newState.val) {
        hochzaehlen();
    }
});
// Manuelles runterzaehlen
on(idZaehler_subtrahieren, function (obj) {
    if (!obj.newState.ack && obj.newState.val) {
        runterzaehlen();
    }
});

// Aktionen
function hochzaehlen() {
    setState(idZaehlerTag, ++getState(idZaehlerTag).val);
    setState(idZaehlerWoche, ++getState(idZaehlerWoche).val);
    setState(idZaehlerMonat, ++getState(idZaehlerMonat).val);
    setState(idZaehlerQuartal, ++getState(idZaehlerQuartal).val);
    setState(idZaehlerJahr, ++getState(idZaehlerJahr).val);
}

function runterzaehlen() {
    setState(idZaehlerTag, --getState(idZaehlerTag).val);
    setState(idZaehlerWoche, --getState(idZaehlerWoche).val);
    setState(idZaehlerMonat, --getState(idZaehlerMonat).val);
    setState(idZaehlerQuartal, --getState(idZaehlerQuartal).val);
    setState(idZaehlerJahr, --getState(idZaehlerJahr).val);
}

function zaehlerstand_reset(zeitraum) {
    switch(zeitraum) {
        case 'Tag':
            var tag_meldung = beschreibung_log + ' gestern: ' + getState(idZaehlerTag).val;
            if (logging) log(tag_meldung);
            meldung_push(tag_meldung, 'Betreff', 0);
            setState(idZaehlerTag, 0);
            log(beschreibung_log + ' aktueller Tag zurückgesetzt');
            break;

        case 'Woche':
            var woche_meldung = beschreibung_log + ' vergangene Woche: ' + getState(idZaehlerWoche).val;
            if (logging) log(woche_meldung);
            setState(idZaehlerWoche, 0);
            log(beschreibung_log + ' aktuelle Woche zurückgesetzt');
            break;

        case 'Monat':
            var monat_meldung = beschreibung_log + ' verganener Monat: ' + getState(idZaehlerMonat).val;
            if (logging) log(monat_meldung);
            setState(idZaehlerMonat, 0);
            log(beschreibung_log + ' aktueller Monat zurückgesetzt');
            break;

        case 'Quartal':
            var quartal_meldung = beschreibung_log + ' vergangenes Quartal: ' + getState(idZaehlerQuartal).val;
            if (logging) log(quartal_meldung);
            setState(idZaehlerQuartal, 0);
            log(beschreibung_log + ' aktuelles Quartal zurückgesetzt');
            break;

        case 'Jahr':
            var jahr_meldung = beschreibung_log + ' vergangenes Jahr: ' + getState(idZaehlerJahr).val;
            if (logging) log(jahr_meldung);
            setState(idZaehlerJahr, 0);
            log(beschreibung_log + ' aktuelles Jahr zurückgesetzt');
            break;

        default:
            log('Fehler/Error beim Reset der Datenpunkte!');

    }
} 

// RESETS DER WERTE #################################
// Täglich um 0 Uhr ausführen
schedule("0 0 * * *", function() {
    zaehlerstand_reset('Tag');
});

// Montags um 0 Uhr ausführen
schedule("0 0 * * 1", function() {
    zaehlerstand_reset('Woche');
});

// Monatsersten um 0 Uhr ausführen
schedule("0 0 1 * *", function() {
    zaehlerstand_reset('Monat');
});

// Quartalsersten (Jan,Apr,Jul,Okt) um 0 Uhr ausführen
schedule("0 0 1 1 *", function() {
    zaehlerstand_reset('Quartal');
});

schedule("0 0 1 4 *", function() {
    zaehlerstand_reset('Quartal');
});

schedule("0 0 1 7 *", function() {
    zaehlerstand_reset('Quartal');
});

schedule("0 0 1 10 *", function() {
    zaehlerstand_reset('Quartal');
});

// Neujahr um 0 Uhr ausführen
schedule("0 0 1 1 *", function() {
    zaehlerstand_reset('Jahr');
});

// Pushmeldung
function meldung_push (text, titel, prio) {
    var optin_push = getState(idOptinPush).val;
    if (optin_push) { // wenn Optin
        sendTo("pushover", {
            message: text,
            title: titel,
            priority: prio
        });
    } // Ende Optin
}

// Opt In setzen - Logging
on( { 
    id: idOptinPush,
    change: 'ne'
}, function (obj) {
    log('Opt in Variable <' + optin_beschreibung + ' Push> auf <' + obj.newState.val + '> gesetzt ', 'info');
});</pre>