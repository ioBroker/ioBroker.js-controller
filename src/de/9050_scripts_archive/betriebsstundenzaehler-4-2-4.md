# Stiebel Eltron ISG auslesen

Auslesen der Daten der Wärmepumpe Stiebel Eltron ISG


## Script

<pre class="codecontent">var http = require('http');
var xpath = require('xpath');
var dom = require('xmldom').DOMParser;

var stiebeleltronIP = '192.168.2.26';

createState('stiebeleltron.prozess.RUECKLAUFTEMPERATUR');
createState('stiebeleltron.prozess.RUECKLAUFTEMPERATUR');
createState('stiebeleltron.prozess.VORLAUFTEMPERATUR');
createState('stiebeleltron.prozess.FROSTSCHUTZTEMPERATUR');
createState('stiebeleltron.prozess.AUSSENTEMPERATUR');        
createState('stiebeleltron.prozess.VERDAMPFERTEMPERATUR');
createState('stiebeleltron.prozess.REKUPERATORTEMPERATUR');
createState('stiebeleltron.prozess.ZWISCHENEINSPRITZUNGSTEMP');
createState('stiebeleltron.prozess.HEISSGASTEMPERATUR');
createState('stiebeleltron.prozess.NIEDERDRUCK');
createState('stiebeleltron.prozess.HOCHDRUCK');

createState('stiebeleltron.laufzeit.HEIZEN');
createState('stiebeleltron.laufzeit.WARMWASSER');
createState('stiebeleltron.laufzeit.ABTAUEN');
createState('stiebeleltron.laufzeit.NHZ_1');
createState('stiebeleltron.laufzeit.NHZ_2');
createState('stiebeleltron.laufzeit.NHZ_1_2');
createState('stiebeleltron.laufzeit.NHZ_GESAMT');

createState('stiebeleltron.waermemenge.HEIZEN_TAG');
createState('stiebeleltron.waermemenge.HEIZEN_SUMME');
createState('stiebeleltron.waermemenge.WARMWASSER_TAG');
createState('stiebeleltron.waermemenge.WARMWASSER_SUMME');
createState('stiebeleltron.waermemenge.NHZ_HEIZEN_SUMME');
createState('stiebeleltron.waermemenge.NHZ_WW_SUMME');

createState('stiebeleltron.verbrauch.HEIZEN_TAG');
createState('stiebeleltron.verbrauch.HEIZEN_SUMME');
createState('stiebeleltron.verbrauch.WARMWASSER_TAG');        
createState('stiebeleltron.verbrauch.WARMWASSER_SUMME');
createState('stiebeleltron.verbrauch.GESAMT_TAG');
createState('stiebeleltron.verbrauch.GESAMT_SUMME');

createState('stiebeleltron.anlage.RAUM_SOLLTEMPERATUR');
createState('stiebeleltron.anlage.WARMWASSER_SOLLTEMPERATUR');
createState('stiebeleltron.anlage.WARMWASSER_ISTTEMPERATUR');
createState('stiebeleltron.anlage.HEIZEN_BIVALENZTEMPERATUR');
createState('stiebeleltron.anlage.HEIZEN_EINSATZGRENZE');
createState('stiebeleltron.anlage.WARMWASSER_BIVALENZTEMPERATUR');
createState('stiebeleltron.anlage.WARMWASSER_EINSATZGRENZE');
createState('stiebeleltron.anlage.AUSSENTEMPERATUR');
createState('stiebeleltron.anlage.HEIZEN_SOLLTEMPERATUR');
createState('stiebeleltron.anlage.HEIZEN_ISTTEMPERATUR');
createState('stiebeleltron.anlage.VORLAUF_ISTEMPERATUR');
createState('stiebeleltron.anlage.FESTWERT_SOLLTEMPERATUR');
createState('stiebeleltron.anlage.PUFFERSOLLTEMPERATUR');
createState('stiebeleltron.anlage.STATUS');

schedule("*/10 * * * *", function () {
    pollStiebelEltron();
});

// call once after script restart
pollStiebelEltron();

// Frage stiebeleltron ein Mal und speichere die Antwort in CCU.IO Datenpunkten
function pollStiebelEltron() {
    log("polling stiebel eltron adapter");

    http.get("http://" + stiebeleltronIP + "/?s=0", function (http_res) {

        // initialize the container for our data
        var data = "";

        // this event fires many times, each time collecting another piece of the response
        http_res.on("data", function (chunk) {
            // append this chunk to our growing `data` var
            data += chunk;
        });

        // this event fires *one* time, after all the `data` events/chunks have been gathered
        http_res.on("end", function () {

            try {// the website has some </divs> without starttags, they must be removed to use dom 
                var newdata = data.replace(/<\/div>\s<\/div>\s<\/div>\s<\/div>\s/gmi, "<\/div>\r\n<\/div>");
                var doc = new dom().parseFromString(newdata);
                var nodes = xpath.select("//*[@id=\"box_start_status_system\"]", doc);

                // since i dont get xpath queries work right, i do it the hard way of accessing the childnodes directly
                // Tabelle Prozessdaten
                var status = nodes[0].childNodes[1].childNodes[2].childNodes[0].data;
                setState('javascript.0.stiebeleltron.anlage.STATUS', status);
            }
            catch (e) {
                log("stiebeleltron: Cannot set Website 1 data:" + e, 'error');
            }
        });
    });

    http.get("http://" + stiebeleltronIP + "/?s=1,0", function (http_res) {
        // initialize the container for our data
        var data = "";

        // this event fires many times, each time collecting another piece of the response
        http_res.on("data", function (chunk) {
            // append this chunk to our growing `data` var
            data += chunk;
        });

        // this event fires *one* time, after all the `data` events/chunks have been gathered
        http_res.on("end", function () {

            try {// the website has some </divs> without starttags, they must be removed to use dom 
                var newdata = data.replace(/<\/div>\s<\/div>\s<\/div>\s<\/div>\s/gmi, "<\/div>\r\n<\/div>");
                var doc = new dom().parseFromString(newdata);
                var nodes = xpath.select("//*[@id=\"content\"]", doc);

                // since i dont get xpath queries work right, i do it the hard way of accessing the childnodes directly
                // Tabelle Raumtemperatur //*[@id="content"]/div[1]/table/tbody/tr[2]/td[2]
                var test = Object("");
                var raumsoll = removeDegreeUnit(nodes[0].childNodes[1].childNodes[0].childNodes[2].childNodes[3].childNodes[0].data, test);
                setState('javascript.0.stiebeleltron.anlage.RAUM_SOLLTEMPERATUR', raumsoll);

                // Tabelle Heizung //*[@id="content"]/div[3]/table/tbody/tr[2]/td[2]
                var aussentemp = removeDegreeUnit(nodes[0].childNodes[2].childNodes[0].childNodes[2].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.anlage.AUSSENTEMPERATUR', aussentemp);

                var isttemphk1 = removeDegreeUnit(nodes[0].childNodes[2].childNodes[0].childNodes[4].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.anlage.HEIZEN_ISTTEMPERATUR', isttemphk1);

                var solltemphk1 = removeDegreeUnit(nodes[0].childNodes[2].childNodes[0].childNodes[6].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.anlage.HEIZEN_SOLLTEMPERATUR', solltemphk1);

                var vorlauftemp = removeDegreeUnit(nodes[0].childNodes[2].childNodes[0].childNodes[8].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.anlage.VORLAUF_ISTEMPERATUR', vorlauftemp);

                var festwertsoll = checkFalseBool(nodes[0].childNodes[2].childNodes[0].childNodes[10].childNodes[3].childNodes[0].data, "AUS ");
                setState('javascript.0.stiebeleltron.anlage.FESTWERT_SOLLTEMPERATUR', festwertsoll);

                var puffersoll = removeDegreeUnit(nodes[0].childNodes[2].childNodes[0].childNodes[12].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.anlage.PUFFERSOLLTEMPERATUR', puffersoll);

                // Tabelle Warmwasser
                var wwist = removeDegreeUnit(nodes[0].childNodes[3].childNodes[0].childNodes[2].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.anlage.WARMWASSER_ISTTEMPERATUR', wwist);

                var wwsoll = removeDegreeUnit(nodes[0].childNodes[3].childNodes[0].childNodes[4].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.anlage.WARMWASSER_SOLLTEMPERATUR', wwsoll);

                // Tabelle elektr. nachwaermung
                var bivalenzheizung = removeDegreeUnit(nodes[0].childNodes[4].childNodes[0].childNodes[2].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.anlage.HEIZEN_BIVALENZTEMPERATUR', bivalenzheizung);

                var einsatzgrenzeheizung = removeDegreeUnit(nodes[0].childNodes[4].childNodes[0].childNodes[4].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.anlage.HEIZEN_EINSATZGRENZE', einsatzgrenzeheizung);

                var bivalenzww = removeDegreeUnit(nodes[0].childNodes[4].childNodes[0].childNodes[6].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.anlage.WARMWASSER_BIVALENZTEMPERATUR', bivalenzww);

                var einsatzgrenzeww = removeDegreeUnit(nodes[0].childNodes[4].childNodes[0].childNodes[8].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.anlage.WARMWASSER_EINSATZGRENZE', einsatzgrenzeww);
            }
            catch (e) {
                log("stiebeleltron: Cannot set Website 10 data:" + e, 'error');
            }
        });
    });

    http.get("http://" + stiebeleltronIP + "/?s=1,1", function (http_res) {
        // initialize the container for our data
        var data = "";

        // this event fires many times, each time collecting another piece of the response
        http_res.on("data", function (chunk) {
            // append this chunk to our growing `data` var
            data += chunk;
        });

        // this event fires *one* time, after all the `data` events/chunks have been gathered
        http_res.on("end", function () {
            try {
                // the website has some </divs> without starttags, they must be removed to use dom 
                var newdata = data.replace(/<\/div>\s<\/div>\s<\/div>\s<\/div>\s/gmi, "<\/div>\r\n<\/div>");
                var doc = new dom().parseFromString(newdata);
                var nodes = xpath.select("//*[@id=\"content\"]", doc);

                // since i dont get xpath queries work right, i do it the hard way of accessing the childnodes directly
                // Tabelle Prozessdaten
                var ruecklauftemp = removeDegreeUnit(nodes[0].childNodes[1].childNodes[0].childNodes[2].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.prozess.RUECKLAUFTEMPERATUR', ruecklauftemp);

                var vorlauftemp = removeDegreeUnit(nodes[0].childNodes[1].childNodes[0].childNodes[4].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.prozess.VORLAUFTEMPERATUR', vorlauftemp);

                var frostschutztemp = removeDegreeUnit(nodes[0].childNodes[1].childNodes[0].childNodes[6].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.prozess.FROSTSCHUTZTEMPERATUR', frostschutztemp);

                var aussentemp = removeDegreeUnit(nodes[0].childNodes[1].childNodes[0].childNodes[8].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.prozess.AUSSENTEMPERATUR', aussentemp);

                var verdampfertemp = removeDegreeUnit(nodes[0].childNodes[1].childNodes[0].childNodes[10].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.prozess.VERDAMPFERTEMPERATUR', verdampfertemp);

                var rekuperatortemp = removeDegreeUnit(nodes[0].childNodes[1].childNodes[0].childNodes[12].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.prozess.REKUPERATORTEMPERATUR', rekuperatortemp);

                var zwischeneinspritztemp = removeDegreeUnit(nodes[0].childNodes[1].childNodes[0].childNodes[14].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.prozess.ZWISCHENEINSPRITZUNGSTEMP', zwischeneinspritztemp);

                var heissgastemp = removeDegreeUnit(nodes[0].childNodes[1].childNodes[0].childNodes[16].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.prozess.HEISSGASTEMPERATUR', heissgastemp);

                var niederdruck = removePressureUnit(nodes[0].childNodes[1].childNodes[0].childNodes[18].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.prozess.NIEDERDRUCK', niederdruck);

                var hochdruck = removePressureUnit(nodes[0].childNodes[1].childNodes[0].childNodes[20].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.prozess.HOCHDRUCK', hochdruck);

                // Tabelle Wärmemenge
                var outHeizenTag = removePowerUnit(nodes[0].childNodes[2].childNodes[0].childNodes[2].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.waermemenge.HEIZEN_TAG', outHeizenTag);

                var outHeizenSumme = removePowerUnit(nodes[0].childNodes[2].childNodes[0].childNodes[4].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.waermemenge.HEIZEN_SUMME', outHeizenSumme);

                var outwarmwasserTag = removePowerUnit(nodes[0].childNodes[2].childNodes[0].childNodes[6].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.waermemenge.WARMWASSER_TAG', outwarmwasserTag);

                var outwarmwasserSumme = removePowerUnit(nodes[0].childNodes[2].childNodes[0].childNodes[8].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.waermemenge.WARMWASSER_SUMME', outwarmwasserSumme);

                var outNHZHeizenSumme = removePowerUnit(nodes[0].childNodes[2].childNodes[0].childNodes[10].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.waermemenge.NHZ_HEIZEN_SUMME', outNHZHeizenSumme);

                var outNHZWarmwasserSumme = removePowerUnit(nodes[0].childNodes[2].childNodes[0].childNodes[12].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.waermemenge.NHZ_WW_SUMME', outNHZWarmwasserSumme);

                // Tabelle Leistungsaufnahme
                var heizenTag = removePowerUnit(nodes[0].childNodes[3].childNodes[0].childNodes[2].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.verbrauch.HEIZEN_TAG', heizenTag);

                var heizenSumme = removePowerUnit(nodes[0].childNodes[3].childNodes[0].childNodes[4].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.verbrauch.HEIZEN_SUMME', heizenSumme);

                var warmwasserTag = removePowerUnit(nodes[0].childNodes[3].childNodes[0].childNodes[6].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.verbrauch.WARMWASSER_TAG', warmwasserTag);

                var warmwasserSumme = removePowerUnit(nodes[0].childNodes[3].childNodes[0].childNodes[8].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.verbrauch.WARMWASSER_SUMME', warmwasserSumme);

                setState('javascript.0.stiebeleltron.verbrauch.GESAMT_TAG', heizenTag + warmwasserTag);
                setState('javascript.0.stiebeleltron.verbrauch.GESAMT_SUMME', heizenSumme + warmwasserSumme);

                // Tabelle Laufzeit
                var laufzeitHeizen = removeHourUnit(nodes[0].childNodes[4].childNodes[0].childNodes[2].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.laufzeit.HEIZEN', laufzeitHeizen);

                var laufzeitWarmwasser = removeHourUnit(nodes[0].childNodes[4].childNodes[0].childNodes[4].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.laufzeit.WARMWASSER', laufzeitWarmwasser);

                var laufzeitAbtauen = removeHourUnit(nodes[0].childNodes[4].childNodes[0].childNodes[6].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.laufzeit.ABTAUEN', laufzeitAbtauen);

                var laufzeitNhz1 = removeHourUnit(nodes[0].childNodes[4].childNodes[0].childNodes[8].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.laufzeit.NHZ_1', laufzeitNhz1);

                var laufzeitNhz2 = removeHourUnit(nodes[0].childNodes[4].childNodes[0].childNodes[10].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.laufzeit.NHZ_2', laufzeitNhz2);

                var laufzeitNhz1u2 = removeHourUnit(nodes[0].childNodes[4].childNodes[0].childNodes[12].childNodes[3].childNodes[0].data);
                setState('javascript.0.stiebeleltron.laufzeit.NHZ_1_2', laufzeitNhz1u2);

                setState('javascript.0.stiebeleltron.laufzeit.NHZ_GESAMT', laufzeitNhz1 + laufzeitNhz2 + laufzeitNhz1u2);
            }
            catch (e) {
                log("stiebeleltron: Cannot set Website 11 data:" + e, 'error');
            }
        });
    });
}

function checkFalseBool(input, checkvalue) {
    var result = (input != checkvalue);
    return Boolean(result);
}

function checkTrueBool(input, checkvalue) {
    var result = input == checkvalue;
    return Boolean(result);
}

function removeUnit(input, unitLength, unit) {
    if (unit)
        unit.valueOf = unit.toSource = unit.toString = input.substring(input.length - unitLength, input.length);
    var value = input.substring(0, input.length - unitLength);
    value = value.replace(/,/, ".");
    return parseFloat(value);
}

function removeHourUnit(input, unit) {
    return removeUnit(input, 2, unit);
}

function removePowerUnit(input, unit) {
    return removeUnit(input, 4);
}

function removePressureUnit(input, unit) {
    return removeUnit(input, 4);
}

function removeDegreeUnit(input, unit) {
    return removeUnit(input, 2, unit);
}</pre>