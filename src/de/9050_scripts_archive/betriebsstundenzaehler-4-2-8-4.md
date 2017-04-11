# Fronius Symo Hybrid über Javaskript auslesen (Json)

Auslesen des PV Wechselrichter Fronius Symo hybrid


## Script

<pre class="codecontent ">var request = require("request");

var myJson = {};

var pfad = "Fronius_Symo_Hybrid.";

var idDAY_ENERGY        = pfad + "ENERGY_DAY";
var idPAC               = pfad + "PAC";
var idYEAR_ENERGY       = pfad + "ENERGY_YEAR";
var idTOTAL_ENERGY      = pfad + "ENERGY_TOTAL";

createState(idDAY_ENERGY, 0, {
    name: 'Energie Tag',
    desc: 'Energie Tag',
    type: 'number',
    role: 'value',
    unit: 'Wh'
});

createState(idPAC, 0, {
    name: 'Leistung',
    desc: 'Leistung',
    type: 'number',
    role: 'value',
    unit: 'W'
});

createState(idYEAR_ENERGY, 0, {
    name: 'Energie Jahr',
    desc: 'Leistung',
    type: 'Energie Jahr',
    role: 'value',
    unit: 'Wh'
});

createState(idTOTAL_ENERGY, 0, {
    name: 'Energie Total',
    desc: 'Leistung',
    type: 'Energie total',
    role: 'value',
    unit: 'Wh'
});

function parseJson(text) {
    if (text === "") return {};
    try {
        json = JSON.parse(text);
    } catch (ex) {
        json = {};
    }
    if(!json) json = {};
    return json;
}

function readJson(url, callback) {
    request(url, function (err, state, body){
        if (body) {
            var json = parseJson(body);
            callback(null, json);
        } else {
            var error = "(" + err + ") ERROR bei Abfrage von: " + url;
            log(error, "warn");  
            callback(error, null);
        }
    });
}

var url = 'http://10.0.0.6/solar_api/v1/GetInverterRealtimeData.cgi?Scope=System';

function main() {
    readJson(url, function(err,json) {
        if(!err) {
            myJson = json;
            log("DAY_ENERGY: "      + myJson.Body.Data.DAY_ENERGY.Values[1],"info");
            log("PAC: "             + myJson.Body.Data.PAC.Values[1],"info");
            log("YEAR_ENERGY: "     + myJson.Body.Data.YEAR_ENERGY.Values[1],"info");
            log("TOTAL_ENERGY: "    + myJson.Body.Data.TOTAL_ENERGY.Values[1],"info");
            setState(idDAY_ENERGY   ,myJson.Body.Data.DAY_ENERGY.Values[1]);
            setState(idPAC          ,myJson.Body.Data.PAC.Values[1]);
            setState(idYEAR_ENERGY  ,myJson.Body.Data.YEAR_ENERGY.Values[1]);
            setState(idTOTAL_ENERGY ,myJson.Body.Data.TOTAL_ENERGY.Values[1]);
        } else {
            log("Fehler beim Auslesen des JSON. Keine Daten erhalten.","warn");
            myJson = {};
        }
    });
}

schedule("*/10 * * * *", function () { // alle 10 Minuten die Werte abfragen
    main();
});

// Beim Skriptstart die Werte abfragen
setTimeout(main,500);</pre>