# Bluetooth LE Scanner für den Raspberry Pi 3

1.) Nutzung zur Anwesenheitserkennung über Bluetooth "Tags" oder anderen Geräte, die dauerhaft Bluetooth Funkfeuer aussenden.. 2.) Geräteüberwachung per Bluetooth als Alternative zum Ping. 3.) Als Bluetooth Scanner 4.) Für Indoor Ortung


## Script

<pre class="codecontent ">// =============================================================================
// Bluetooth Scanner für Raspberry Pi 3   (oder andere kompatible Geräte mit BT)
// =============================================================================
//
// Verwendet das integrierte Bluetooth Modul des Raspberry Pi 3
//
// startet beim ersten Scriptstart automatisch den BluetoothScan
// jeder weitere Start über den Switch, im Standard:
// javascript.0.Bluetooth.Scan.scan (true: Scan starten, false: Scan beenden)
// 
// Version: 0.4.0
// Datum:   17.04.2016
// Autor:   ruhr70
//
//
// !!! Das Skript kann ohne Änderung am Skript genutzt werden !!!
// !!! Anpassung nur für Experten notwendig                   !!!
//
//
// Voraussetzungen:
//------------------------------------------------------------------------------
// muss:
// - benötigt mind. die Version 2.x des Javascript-Adapters
// - benötigt das node module "noble" (im Javascript Adapter eintragen)
// - globale Funktion logs() muss vorhanden sein
//
// kann (Komfort und Zusatzinfos):
// - setObject muss in der Javascript-Instanz freigeschaltet sein
//   (für die Channelnamen)
// - Internetzugang, wenn die Herstellernamen anhand der Mac ermittelt werden sollen
// 
//
// verwendete globale Funktionen   (müssen als globale Funktion vorhanden sein)
// -----------------------------------------------------------------------------
// 
// logs()                   // für individuelle Loglevel innerhalb des Scripts
//
// Die globalen Funktionen können auch lokal in den Bereich "Funktionen" 
// reinkopiert werden.
//
//
// Kalibrierung der Entfernungsmessung vom Host zum Device (.Distanz)
// -----------------------------------------------------------------------------
// Zur Kalibrierung der Distanz das Bluetooth Gerät in einen Meter Entfernung
// zum Host positionieren und dann den Wert aus .rssi unter .details.txPower 
// beim Device eintragen (direkt in den Objecten im ioBroker Admin 
// oder im Skript in der Liste: bluetoothDevices)
//
// todos:
//------------------------------------------------------------------------------
//
// - Blacklistbehandlung (löschen von Channels/Datenpunkte, die nachträglich auf die Blacklist gekommen sind)
//   erst am Ende des Scans und nicht on the fly
//
// - zum Scriptstart: Testen ob identische Element in Black und Whitelist -> Warnung
//
// - konfigurierbar machen: nur bekannte Devices Scannen
//
// - whitelist: Info, wenn whitelistgeäte noch nie gescannt wurden
//
// - Ereignisliste der letzten (10 (konfigurierbar)) gefundenen Devices
//
// - Internetabfrage Hersteller / Mac nach Zeitintervall wiederholen 
//
// - per DP wählbar: Scan alles, Scan whiteliste, Scan angelegte Devices (mit Anzeige, welcher Modus aktiv ist)
//
// - im SKript konfigurierbar machen: Dauer eines Scanvorgangs inkl. Fehler abfangen (Minimum Zeit)
//
// - .lastStateDelta neu (Delta als lesbare Zeit ausgeben)
//
// - minRssi über Datenpunkte konfigurierbar machen
//
// =============================================================================
// Einstellungen Skriptverhalten (Expertenmodus)
// =============================================================================

// Das Skript ist so geschrieben, dass es komplett ohne Anpassungen des Users
// funktionieren sollte (Automatikmodus).

// Parameter, die nur beim ERSTEN Start des Skripts berücksichtigt werden und danach über Datenpunkte gesteuert werden
// -------------------------------------------------------------------------------------------------------------------

var automaticOn             = true;     // Automatikmodus true/false. true: Es wird solange alle Geräte gescannt, bis die Anzahl Geräte in atomaticMaxDevice gefunden und angelegt wurde.
var automaticMaxDevice      =  10;      // maximale Devices, die als Datenpunkte im Automatikmodus angelegt werden

// Parameter, die nur im Skript eingestellt werden können (Expertenmodus)
// ----------------------------------------------------------------------

var loglevel                = "debug2";                 // logs() - Loglevel des Scriptes (debug2, debug1, debug, info, warn, error) // benötigt den loglevel info beim Javascript Adapter
var dpPfad                  = "Bluetooth" + ".";        // In welchem Pfad sollen die Datenpunkte angelegt werden. String mit "." am Ende.

 // serviceUUIDs = whitelist. Wenn hier MACs/IDs eingetragen sind, werden nur noch diese gescannt / [] = leere Liste: alles wird gescannt
var serviceUUIDs            = [];           // default: [] => all // ["", ...] // schränkt ein, welche Devices gescannt werden sollen
var allowDuplicates         = false;        // default: false // true erzeugt eine erheblich größere Last, da alle Devices ständig aktualisiert wedrden

var minRssi                 = -100;         // default: -100 // Mindestsignalstärke zur Weiterverarbeitung (schon eingetragene Devices werden trotzdem verarbeitet)
var txPowerDefault          = -68;          // (zwischen -75 und -55) Sendeleistung txPower (rssi) vom Gerät. Defaultwert für die Entfernungsberechnung, wenn die Devices nicht kalibriert sind

var scandauer               = 10000;        // default: 10000 (10 Sek.) Dauer eines Scandurchgangs (1\. Test mit 10000 (10 Sekunden), OK. Kleinster Wert im Skript zugelassen: 3000)

var blockSpam               = true;         // "Spam", block Devices ohne Informationen (kein: Mac, Manufacture Data, uid, service)

var durchlaufLogStop        = true;         // true: begrenzt die Detailausgabe im Log nach Anzahl X Durchläufe
var durchlaufLogStopAnzahl  = 2;            // Anzahl der Durchläufe, für die Detaillogs ausgegeben werden

// Sonstige Parameter zum Skriptverhalten
// --------------------------------------
var delay                   = 200;          // Delay in ms, wenn Datenpunkte verzögert geschriebenwerden, um ggf. Fehler zu vermeiden

// ---------------------------------------------------
// Blacklist anhand der MAC-Adresse
// ---------------------------------------------------
    // Hex- Wert (a-f, 0-9) * als Joker am Ende
var bluetoothBlacklistMac = [                   // Bluetooth IDs/Mac-Adressen, die nicht verarbeitet werden (Blacklist), Joker am Ende möglich
    "badefeebadef",
    "affeaffeaffe"
    ]; 

// ---------------------------------------------------
// Blacklist anhand des local Name (Name vom Gerät)
// ---------------------------------------------------
var bluetoothBlacklistLocalName = [             // Bluetooth "local name" (Namen, die vom Gerät übertragen werden), die nicht verarbeitet werden (Blacklist)
    "Apple Pencil"
    ]; 

// ---------------------------------------------------
// Blacklist anhand Manufacturrer Data
// ---------------------------------------------------
    // Hex- Wert (a-f, 0-9) * als Joker am Ende
    // Aufbau der Meldungen bei Beacons: https://developer.mbed.org/blog/entry/BLE-Beacons-URIBeacon-AltBeacons-iBeacon/
    // ersten zwei Bytes = Herstellerkennung, siehe https://www.bluetooth.com/specifications/assigned-numbers/company-Identifiers
    // 4c00 = Apple, 0075 = Samsung, 8700 = Garmin, 8a00 = Jawbone, ... 
    // 3\. Byte = Type: 02 = iBeacon
var bluetoothBlacklistManufacturerData = [     // Bluetooth manufacturerData, welche nicht verarbeitet werden (Blacklist), Joker "*" am Ende mäglich
    "4c000c0e00*",
    "4c000b03*",
    "4c00051200000000000000000*"
    ]; 

// ---------------------------------------------------
// eigene bekannte Bluetooth Geräte
// ---------------------------------------------------
var bluetoothDevices = {
// name:    Selbstvergebener Name zum Gerät
// person:  nur Info: Freitext, Person der das Gerät zugeordnet ist    
// txPower: rssi Wert, wenn das Gerät eine Entfernung von einem Meter zum Host hat. Wichtg für die Kalebrierung der Entfernung (Distanz) je Gerät)

    "0024e4185fa3":
    {
        "name":         "Withings_Aura",
        "person":       "keine"
    },
    "f75e39e1eeca":
    {
        "name":         "Fitbit_One",
        "person":       "Michael",
        "txPower":      -68
    },
    "001a7dda7113":
        {
        "name":         "iBeacon_Arbeitszimmer",
        "person":       "keine"
    },
    "7c2f80adc68f":
        {
        "name":         "G-Tag_Schlüsselbund_Michael",
        "person":       "Michael",
        "txPower":      -70
    },
    "244b03eefea7":
        {
        "name":         "Samsung_TV_Nachbarn",
        "person":       ""
    },
    "4b475e4c5236":
        {
        "name":         "MacBook_Pro_Retina",
        "person":       "Michael"
    },
    "b0b448bda804":
        {
        "name":         "Ti_CC2650STK_SensorTag",
        "person":       ""
    }
};

// ##########################################################################################################################
// AB HIER KEINE ÄNDERUNGEN AM SKRIPT VORNEHMEN      (keine Einstellungen nötig)
// ##########################################################################################################################

// (es sei denn, die Datenpunktnamen sollen geändert werden)

// ---------------------------------------------------
// Im Datenpunktpfad werden die Devices unter ... angelegt:
// ---------------------------------------------------
var devicePfad                  = dpPfad + "Device.";

var idScan                      = dpPfad + 'Control_ScanOn';                    // schaltet den Scan per Datenpunkt ein oder aus (true/false)
var idScanFirst                 = dpPfad + 'onlyScript.scanFirst';              // Info für das Script, wurde das Script zum aller ersten mal gestartet

var idControlAutomaticOn        = dpPfad + 'Control_Script.Automatik_Modus_An'; // schaltet den den Automatikmodus ein oder aus (max. Anzahl der Geräte, die als Datenpunkte angelegt werden)
var idControlAutomaticMax       = dpPfad + 'Control_Script.Automatik_Modus_Max_Geräte'; // Wieviele Geräte sollen max. im Automatikmodus gefunden werden?

var idNewDevice                 = dpPfad + 'InfoDevices.newDevice';             // Mac eines neu gefundenen Bluetooth Device wird hier abgelegt (für Histroy)
var idNewDeviceMoreInfo         = dpPfad + 'InfoDevices.newDeviceMoreInfo';     // Mac und lokaler Name eines neu gefundenen Bluetooth Device wird hier abgelegt (für Histroy)
var idNewDeviceBlocked          = dpPfad + 'InfoDevices.newDeviceBlocked';      // id des zulezt gescannten Devices, welches geblcokt wurde

var idDevicesListAll            = dpPfad + 'InfoDevices.ListAll';               // Liste aller schon erfassten Devices (in allen Starts des Skripts)
var idDevicesOffline            = dpPfad + 'InfoDevices.ListOffline';           // Liste aller schon erfassten Devices, die nicht erreichbar sind (ohne Geräte auf der Blacklsit)
var idDevicesOnline             = dpPfad + 'InfoDevices.ListOnline';            // Liste aller schon erfassten Devices, die gerade erreichbar sind  (ohne Geräte auf der Blacklsit)
var idDevicesList24blocked      = dpPfad + 'InfoDevices.Blacklist.List_24h_blocked';// Liste aller geblockten Bluetooth IDs der letzten 24h
var idDevicesBlacklistDel       = dpPfad + 'InfoDevices.Blacklist.Deleted_Devices'; // List der Geräte, die manuell gelsöcht wurden
var idDevicesBlacklistMac       = dpPfad + 'InfoDevices.Blacklist.Mac';         // Geräte, die auf der Blacklist stehen (Mac-Adresse)
var idDevicesBlacklistLN        = dpPfad + 'InfoDevices.Blacklist.LocalName';   // Geräte, die auf der Blacklist stehen (Local Name)
var idDevicesBlacklistMD        = dpPfad + 'InfoDevices.Blacklist.ManufacturerData';   // Geräte, die auf der Blacklist stehen (Manufacturer Data)
var idDevicesBlacklistMacOnline = dpPfad + 'InfoDevices.Blacklist.ListBlacklistMacOnline';   // Liste aller schon erfassten Devices, die gerade erreichbar sind und auf einer Blacklist stehen
var idDevicesCountAll           = dpPfad + 'InfoDevices.CountAll';              // Anzahl aller bekannten Devices
var idDevicesCountOffline       = dpPfad + 'InfoDevices.CountOffline';          // Anzahl Devices nicht erreichbar
var idDevicesCountOnline        = dpPfad + 'InfoDevices.CountOnline';           // Anzahl Devices online
var idInfoCount24blockSpam      = dpPfad + 'InfoDevices.Count_24h.blocked_Spam';                // Counter 24h geblockte Scanvorgänge Geräte ohne Information 
var idInfoCount24blockBLMac     = dpPfad + 'InfoDevices.Count_24h.blocked_Blacklist_Mac';       // Counter 24h geblockte Scanvorgänge Geräte Blacklist Mac 
var idInfoCount24blockBLLN      = dpPfad + 'InfoDevices.Count_24h.blocked_Blacklist_LocalName'; // Counter 24h geblockte Scanvorgänge Geräte Blacklist Local Name
var idInfoCount24blockBLMD      = dpPfad + 'InfoDevices.Count_24h.blocked_Blacklist_ManufactureData'; // Counter 24h geblockte Scanvorgänge Geräte Blacklist Manufacture Data
var idInfoCount24blockRssiLow   = dpPfad + 'InfoDevices.Count_24h.blocked_rssi_low';            // Counter 24h geblockte Scanvorgänge Geräte rssi zu schwach
var idInfoCount24blockAutoMax   = dpPfad + 'InfoDevices.Count_24h.blocked_Auto_Max';            // Counter 24h geblockte Scanvorgänge Geräte da im AUtomatikmodus die maximale Anzahl anzulegender Geräte erreicht wurde.
var idInfoCount24blockDelDev    = dpPfad + 'InfoDevices.Count_24h.blocked_Deleted_Devices';     // Counter 24h geblockte Scanvorgänge Geräte die auf der Liste der manuell gelöschten Devices stehen

var idNobleStatus               = dpPfad + 'InfoSkript.Status_noble';           // Status des noble modules
var idInfoScanModus             = dpPfad + 'InfoSkript.Status_ScanModus';       // Scanmodus (alle oder nur bestimmte Devices)
var idInfoScanStatus            = dpPfad + 'InfoSkript.Status_Scan';            // Scan Status
var idInfoSetObject             = dpPfad + 'InfoSkript.setObjectEnabled';       // Ist setObjects für die Instanz freigeschaltet? Wenn nein, werden die Gerätenamen nciht im Channel angezeigt.
var idInfoScriptUptime          = dpPfad + 'InfoSkript.Time_UptimeScript';      // Zeit, die das Skript aktiv ist
var idInfoScanDuration          = dpPfad + 'InfoSkript.Time_ScanDuration';      // Zeit, die der Scan aktiv war
var idInfoCountScans            = dpPfad + 'InfoSkript.CountScans';             // Anzanhl der Scandurchläufer

// =============================================================================
// Variablen für das Skript (Skript intern, KEINE Konfiguration für den Anwender)
// =============================================================================

var noble   = require('noble');     // Node.js BLE (Bluetooth Low Energy) central module
var request = require("request");   // zur Abfrage des Herstellers anhand der Mac-Adresse

var anzahlBluetoothDevices          = 0;        // zählt die gescannten Bluetooth Devices je Durchlauf
var anzahlBluetoothDevicesNeu       = 0;        // zählt die neuen Bluetooth Devices je Durchlauf
var durchlauf                       = 0;        // Zählt die Bluetooth Scandurchläufe nach Scriptstart
var bekannteDevicesNichtErreichbar  = [];       // enthält zu Beginn des Durchlaufs alle bekannten Devices,
                                                // jedes erreichte Device wird entfernt. Die übrigen Devices werden auf nicht erreichbar gesetzt
var bekannteDevicesErreichbar       = [];       // zählt beim Durchlauf alle erreichbaren Devices (ohne Geräte, die auf der Blacklist stehen)
var blacklistDevicesErreichbar      = [];       // zählt beim Durchlauf alle erreichbaren Devices, die auf einer Blacklist stehen

var colorTrue                       = '<span style="color: green;">true</span>';
var colorFalse                      = '<span style="color: red;">false</span>';

var timeInSecScriptStart            = dateSecNow();
var timeInSecScan                   = 0;

var noerror = true;

var instanz                 = "javascript." + instance + ".";

logs('**--== ' + name + ' ==--** gestartet. Instanz: "' + instanz + '", Loglevel: ' + loglevel,"info","darkgreen");
logs('Vars, Loglevel und Scriptname gesetzt','debug2');

// =============================================================================
// Datenpunkte anlegen
// =============================================================================

function dpAnlegen() {

    createState(idScan, false, {
        name: 'Switch Bluetooth Scanner ein/aus',
        desc: 'Schaltet den Bluetoothscanner ein und aus',
        type: 'boolean',
        role: 'input'
    });

    createState(idControlAutomaticOn, automaticOn, {
        name: 'Control Script Automatik Modus ein/aus',
        desc: 'Control Script Automatik Modus ein/aus. Max. Anzahl von Geräten, für die Datenpunkte angelegt werden',
        type: 'boolean',
        role: 'input'
    });

    createState(idControlAutomaticMax, automaticMaxDevice, {
        name: 'Control Script Automatik Modus maximale Anzahl Geräte',
        desc: 'Control Script Automatik Modus maximale Anzahl Geräte die als Datenpunkt angelegt werden',
        type: 'number',
        role: 'input'
    });

    createState(idScanFirst, false, {
        name: 'Bluetooth Scan schon einmal gelaufen',
        desc: 'Startet beim ersten Skriptstart den Bluetooth Scan. Wird nur einmal benötigt.',
        type: 'boolean',
        role: 'system'
    });

    createState(idNewDevice, "", {
        name: 'last new Bluetooth Devices',
        desc: 'Die Mac Adresse des zuletzt gefundenen Bluetooth Device (für History und Ereignislisten)',
        type: 'string',
        role: 'value'
    });

    createState(idNewDeviceMoreInfo, "", {
        name: 'last new Bluetooth Devices, mac und name',
        desc: 'Die Mac Adresse und der locale Name des zuletzt gefundenen Bluetooth Device (für History und Ereignislisten)',
        type: 'string',
        role: 'value'
    });

    createState(idNewDeviceBlocked, "", {
        name: 'id des zuletzt geblockten Device 24h',
        desc: 'id des zuletzt geblockten Device 24h',
        type: 'string',
        role: 'value'
    });

    createState(idDevicesListAll, "", {
        name: 'Liste aller als DP angelegten Bluetooth Devices',
        desc: 'Liste aller bisher gefundenen und als Datenpunkt angelegten Bluetooth Devices',
        type: 'string',
        role: 'list'
    });

    createState(idDevicesOffline, "", {
        name: 'Liste der angelegten Geräte, die nicht erreichbar sind',
        desc: 'Liste der als Datenpunkt angelegten Geräte, die nicht erreichbar sind',
        type: 'string',
        role: 'list'
    });

    createState(idDevicesOnline, "", {
        name: 'Liste der angelegten Geräte die erreichbar sind (ohne geblockte Geräte)',
        desc: 'Liste der angelegten Geräte die erreichbar sind (ohne geblockte Geräte)',
        type: 'string',
        role: 'list'
    });

    createState(idDevicesList24blocked, "", {
        name: 'Liste der IDs, die die letzten 24h geblockt wurden',
        desc: 'Liste der IDs, die die letzten 24h geblockt wurden',
        type: 'string',
        role: 'list'
    });

    createState(idDevicesBlacklistDel, "", {
        name: 'Bluetooth Devices, die manuell gelöscht wurden ',
        desc: 'Bluetooth Devices, die manuell gelöscht wurden',
        type: 'string',
        role: 'list'
    });

    createState(idDevicesBlacklistMac, "", {
        name: 'Bluetooth Devices auf Blacklist nach Mac/ID',
        desc: 'Bluetooth Devices auf Blacklist nach Mac/ID',
        type: 'string',
        role: 'list'
    });

    createState(idDevicesBlacklistLN, "", {
        name: 'Bluetooth Devices auf Blacklist nach local Name',
        desc: 'Bluetooth Devices auf Blacklist nach local Name (wird vom Gerät gesendet)',
        type: 'string',
        role: 'list'
    });    

    createState(idDevicesBlacklistMD, "", {
        name: 'Bluetooth Devices auf Blacklist nach Manufacturer Data',
        desc: 'Bluetooth Devices auf Blacklist nach Manufacturer Data (wird vom Gerät gesendet)',
        type: 'string',
        role: 'list'
    });    

    createState(idDevicesBlacklistMacOnline, "", {
        name: 'Bluetooth Devices Blacklist online',
        desc: 'Liste Bluetooth Devices von der Blacklist, die erreichbar sind',
        type: 'string',
        role: 'list'
    });

    createState(idDevicesCountAll, 0, {
        name: 'Anzahl bekannter Bluetooth Devices',
        desc: 'Anzahl bekannte Bluetooth Devices (ohne Blacklist Devices)',
        type: 'number',
        role: 'counter'
    });

    createState(idDevicesCountOffline, 0, {
        name: 'Anzahl bekannter Bluetooth Devices nicht erreichbar',
        desc: 'Anzahl bekannter Bluetooth Devices nicht erreichbar (ohne Blacklist Devices)',
        type: 'number',
        role: 'counter'
    });

    createState(idDevicesCountOnline, 0, {
        name: 'Anzahl bekannter Bluetooth Devices online',
        desc: 'Anzahl bekannter Bluetooth Devices online (ohne Blacklist Devices)',
        type: 'number',
        role: 'counter'
    });

    createState(idNobleStatus, noble.state, {
        name: 'Status des noble moduls',
        desc: 'Status des noble moduls',
        type: 'string',
        role: 'info'
    });

    createState(idInfoScanModus, "", {
        name: 'Info Scanmodus, welche Devices werden gesscannt',
        desc: 'Info Scanmodus, welche Devices werden gesscannt',
        type: 'string',
        role: 'info'
    });

    createState(idInfoSetObject, "", {
        name: 'setObject() für die Instanz freigeschaltet?',
        desc: 'setObject() für die Instanz freigeschaltet? Wenn nein, werden weniger Informationen angezeigt.',
        type: 'string',
        role: 'info'
    });

    createState(idInfoCount24blockSpam, 0, {
        name: '24h Zähler: Scan geblockt Gerät ohne Informationen (Spam)',
        desc: '24h Zähler: Scan geblockt Gerät ohne Informationen (Spam)',
        type: 'number',
        role: 'counter'
    });

    createState(idInfoCount24blockBLMac, 0, {
        name: '24h Zähler: Scan geblockt wg. Blacklist Mac',
        desc: '24h Zähler: Scan geblockt wg. Blacklist Mac',
        type: 'number',
        role: 'counter'
    });

    createState(idInfoCount24blockBLLN, 0, {
        name: '24h Zähler: Scan geblockt wg. Blacklist local name',
        desc: '24h Zähler: Scan geblockt wg. Blacklist local name',
        type: 'number',
        role: 'counter'
    });

    createState(idInfoCount24blockBLMD, 0, {
        name: '24h Zähler: Scan geblockt wg. Blacklist Manufacture Data',
        desc: '24h Zähler: Scan geblockt wg. Blacklist Manufacture Data',
        type: 'number',
        role: 'counter'
    });

    createState(idInfoCount24blockRssiLow, 0, {
        name: '24h Zähler: Scan geblockt wg. rssi low',
        desc: '24h Zähler: Scan geblockt wg. Signal (rssi) zu schwach.',
        type: 'number',
        role: 'counter'
    });

    createState(idInfoCount24blockAutoMax, 0, {
        name: '24h Zähler: Scan geblockt wg. max. Anzahl Geräte im Automatikmodus',
        desc: '24h Zähler: Scan geblockt wg. max. Anzahl Geräte im Automatikmodus',
        type: 'number',
        role: 'counter'
    });

    createState(idInfoCount24blockDelDev, 0, {
        name: '24h Zähler: Scan geblockt wg. manuell gelöschtes Gerät erkannt',
        desc: '24h Zähler: Scan geblockt wg. manuell gelöschtes Gerät erkannt',
        type: 'number',
        role: 'counter'
    });

    createState(idInfoScriptUptime, "-", {
        name: 'Uptime des Skripts',
        desc: 'Uptime des Skripts. Zeit, seitdem das Skript gestartet wurde.',
        type: 'string',
        role: 'uptime'
    });

    createState(idInfoScanDuration, "-", {
        name: 'Zeit, die der Scan aktiv war',
        desc: 'Zeit, die der Scan aktiv war',
        type: 'string',
        role: 'info.counter'
    });

    createState(idInfoCountScans, 0, {
        name: 'Anzahl der Scandurchläufe seit Skriptstart',
        desc: 'Anzahl der Scandurchläufe seit Skriptstart',
        type: 'number',
        role: 'info'
    });

    createState(idInfoScanStatus, "aus", {
        name: 'Scan Status',
        desc: 'Scan Status',
        type: 'string',
        role: 'info'
    });

    // einfach angelegte Datenpunkte
    // -----------------------------
    //createState(dpPfad + 'datenpunktName',"Test");

    // ausführlich beschriebene Datenpunkte
    // ------------------------------------
    /*
    createState(dpPfad + 'datenpunktName', 0, { // Datenpunktname ohne Leerzeichen und Sonderzeichen, wie er in den Objekten angelegt wird
        name: 'Name des Datenpunkts',           // Lesbarer Name des Datenpunkts
        desc: 'Beschreibung des Datenpunkts',   // Beschreibung des Datenpunkts
        type: 'number',                         // Bescreibung des Typ, wie: number, string, boolean
        unit: '°C'                              // Einheit, wenn benötigt 
    });
    */

    logs("dpAnlegen() - Datenpunkte angelegt (createState) in " + instanz + dpPfad,'debug2');
}

// =============================================================================
// Unterdatenpunkte der Bluetooth Devices, die automatisch je gefundenem Device angelegt werden
// =============================================================================

var deviceDatenpunkte = {
    "Name_localName" : {
        "init": "",
        "dp": {
            "name": 'Bluetooth local Name',
            "desc": 'local Name vom Device über Bluetooth',
            "type": 'string',
            "role": 'value'
        }
    },
    "Name" : {
        "init": "",
        "dp": {
            "name": 'selbstvergebender Name, z.B. aus JSON',
            "desc": 'selbstvergebender Name des Bluetooth Devices, z.B. aus JSON',
            "type": 'string',
            "role": 'input.value'
        }
    },
    "lastState" : {
        "init": false,
        "dp": {
            "name": 'Bluetooth Device erreichbar',
            "desc": 'Bluetooth Device wurde im letzten Scan erreicht',
            "type": 'boolean',
            "role": 'indicator.reachable'
        }
    },
    "lastStateDate" : {
        "init": "",
        "dp": {
            "name": 'Bluetooth Datum letzte Statusänderung',
            "desc": 'Bluetooth Datum letzte Statusänderung',
            "type": 'string',
            "role": 'date'
        }
    },
    "lastStateCount" : {
        "init": 0,
        "dp": {
            "name": 'Anzahl erreichbar (+)/ nicht erreichbar (-) in Folge',
            "desc": 'Bluetooth Anzahl erreichbar (+)/ nicht erreichbar (-) in Folge',
            "type": 'number',
            "role": 'counter'
        }
    },
    "Person" : {
        "init": "",
        "dp": {
            "name": 'Bluetooth Device Personenzuordnung',
            "desc": 'Bluetooth Device gehört zur Person',
            "type": 'string',
            "role": 'input.value.persons'
        }
    },
    "rssi" : {
        "init": 0,
        "dp": {
            "name": 'Bluetooth Device rssi',
            "desc": 'Bluetooth Device rssi Signalsärke',
            "type": 'number',
            "unit": 'dB' ,
            "role": 'value.rssi'
        }
    },
    "Distanz" : {
        "init": 0,
        "dp": {
            "name": 'Bluetooth Device Distanz',
            "desc": 'Bluetooth Device errechnete Entfernung',
            "type": 'float',
            "unit": 'm',
            "role": 'value' 

        }
    },
    "Hersteller" : {
        "init": "",
        "dp": {
            "name": 'Bluetooth Device Hersteller anhand MAC',
            "desc": 'Bluetooth Device Herstellerinfo vom Device ermittelt über die MAC',
            "type": 'string',
            "role": 'value'
        }
    },
    "details.uuid" : {
        "init": "",
        "dp": {
            "name": 'Bluetooth Device uuid',
            "desc": 'Bluetooth Device uuid',
            "type": 'string',
            "role": 'value'
        }
    },
    "details.service" : {
        "init": "",
        "dp": {
            "name": 'Bluetooth Device Service',
            "desc": 'Bluetooth Device Service',
            "type": 'string',
            "role": 'value'
        }
    },
    "details.txPower" : {
        "init": 0,
        "dp": {
            "name": 'Bluetooth Device txPower in 1m Entfernung',
            "desc": 'im Bluetooth Device eingetragenen Sendeleistung (txPower)',
            "type": 'number',
            "unit": 'dB',
            "role": 'input.value' 
        }
    },
    "details.address" : {
        "init": "",
        "dp": {
            "name": 'Bluetooth Device address',
            "desc": 'Bluetooth Device address (MAC-Adresse)',
            "type": 'string',
            "role": 'value'
        }
    },
    "details.addressType" : {
        "init": "",
        "dp": {
            "name": 'Bluetooth Device addressType',
            "desc": 'Bluetooth Device addressType (public, random), or "unknown" if not known',
            "type": 'string',
            "role": 'value'
        }
    },
    "details.connectable" : {
        "init": false,
        "dp": {
            "name": 'Bluetooth Device connectable',
            "desc": 'Bluetooth Device connectable (true or false), or undefined if not known',
            "type": 'boolean',
            "role": 'value'
        }
    },
    "details.manufacturerData" : {
        "init": "",
        "dp": {
            "name": 'Bluetooth Device manufacturerData',
            "desc": 'Bluetooth Device manufacturerData - Herstellerdaten',
            "type": 'string',
            "role": 'value'
        }
    },
    "Control.Delete_Device" : {
        "init": false,
        "dp": {
            "name": 'ACHTUNG: (true) löscht das Gerät und setzt es auf die Blacklist',
            "desc": 'ACHTUNG: true löscht das Gerät vor dem nächsten Durchlauf und setzt es auf die Blacklist',
            "type": 'boolean',
            "role": 'input'
        }
    }
};

// =============================================================================
// Daten
// =============================================================================
    // 4c00 = Apple, 0075 = Samsung, 8700 = Garmin, 8a00 = Jawbone, ... 
    // ersten zwei Bytes = Herstellerkennung, siehe https://www.bluetooth.com/specifications/assigned-numbers/company-Identifiers
    // erst das upper Byte, dann das lower Byte

var btCompanyIdentifiers = {
    "4c00": { "company": "Apple"            },
    "6b00": { "company": "POLAR"            },
    "8700": { "company": "Garmin"           },
    "0087": { "company": "Garmin"           }, // Garmin Geräte sowohl mit 0087, als auch mit 8700 empfangen (lower upper Byte vertauscht)
    "8a00": { "company": "Jawbone"          },
    "7500": { "company": "Samsung"          },
    "8001": { "company": "Gigaset"          }
};

// =============================================================================
// Autokorrekturen & Prüfung auf gültige Daten
// =============================================================================

function autokorrekturen() {

    if (typeof noble == "undefined") {
        noerror = false;
        log('node.js Module "noble" steht nicht zur Verfügung',"error");
        log('Voraussetzung für noble: <span style="color: blue;">[https://github.com/sandeepmistry/noble#prerequisites](https://github.com/sandeepmistry/noble#prerequisites)</span>',"error");
    }
    if (typeof request == "undefined") {
        noerror = false;
        log('node.js Module "request" steht nicht zur Verfügung',"error");
    }

    if (scandauer < 3000) { logs("scandauer nicht kleiner als 3000 -> auf 3000 angepasst","warn");
        scandauer = 3000;
    }

    checkData(bluetoothBlacklistManufacturerData,"bluetoothBlacklistManufacturerData");
    checkData(bluetoothBlacklistMac             ,"bluetoothBlacklistMac");
}

// =============================================================================
// Funktionen                                                         Funktionen
// =============================================================================

// ------------------------------
// Datenverarbeitung
// ------------------------------

// Hersteller anhand der MAC-Adresse ermitteln (über einen Webservice)
function readVendor(id,callback) {
    var url = 'http://api.macvendors.com/' + id;
    request(url, function (err, state, body){
        if (body) {
            var vendor = body;
            callback(null, vendor, id);
        } else {
            var error = "Bluetooth id: " + id + " Kein vendor ermittelt (" + err + ")";
            logs(error, "info");  
            callback(error, null, id);
        }
    });
}

function mdVendor(md) {
    //btCompanyIdentifiers
    if(btCompanyIdentifiers && checkHexWithJoker(md)) {
        for (var identifier in btCompanyIdentifiers) {
            if (md.substr(0,4) == identifier.substr(0,4)) {
                logs("Hersteller: "+ btCompanyIdentifiers[identifier].company + " über Manufacture Data identifiziert.")
                return btCompanyIdentifiers[identifier].company;
            }
            logs("ohne Ergebnis: versucht Hersteller über Manufacture Data zu identifizieren. " + md.substr(0,4) + "  " + identifier.substr(0,4),"debug");
        }
        return "";
    }
}

function calculateDistance(rssi,txPower) {
    if (typeof txPower == 'undefined') {
        txPower = txPowerDefault; //hard coded power value. Usually ranges between -59 to -65 (mit dem Pi 3 ist -70 näher dran)
    }
    if ((txPower < -75) || (txPower > -55)) {
        txPower = txPowerDefault; //hard coded power value. Usually ranges between -59 to -65 (mit dem Pi 3 ist -70 näher dran)
    }
    if (rssi == 0) {
        return -1.0; 
    }
    var ratio = rssi*1.0/txPower;
    if (ratio < 1.0) {
        return Math.pow(ratio,10);
    }
    else {
        var distance =  (0.89976)*Math.pow(ratio,7.7095) + 0.111;
        return distance;
    }
} 

function datum(){
    return formatDate(new Date(), "YYYY-MM-DD,SS:mm");
}

function secForm(duration) {
// Dauer in Sekunden formatiert zu einer lesbaren Zeit:

    var durationMin = Math.floor(parseInt(duration) / 60 );
    var durationSek = parseInt(duration) % 60;
    var durationStd = Math.floor(durationMin  / 60);
    var durationTag = Math.floor(durationStd  / 24);
    durationMin %= 60; // Rest bei Division durch 60
    durationStd %= 24;

    if (duration ===   0) return "";
    if (duration <    60) return durationSek + "s";
    if (duration <  3600) return durationMin + "min " + durationSek + "s";
    if (duration < 86400) return durationStd + "h " + durationMin + "min " + durationSek + "s"; return durationTag + "d " + durationStd + "h " + durationMin + "min " + durationSek + "s"; } function dateSecNow() { var now = new Date(); now = Math.floor(Date.parse(now)/1000); // aktuelle Zeit in Sekunden return now; } function clear24() { setState(idInfoCount24blockSpam ,0); setState(idInfoCount24blockBLMac ,0); setState(idInfoCount24blockBLLN ,0); setState(idInfoCount24blockBLMD ,0); setState(idInfoCount24blockDelDev ,0); setState(idInfoCount24blockRssiLow ,0); setState(idInfoCount24blockAutoMax ,0); var list = []; list.length = 0; writeList(list,idDevicesList24blocked); logs("24h Zähler wurden zurückgesetzt","info"); } // ------------------------------ // Array Listen Verarbeitung // ------------------------------ function readList(dp) { // lese ein JSON aus einem Datenpunkt var json = getState(dp).val; if (json === "") return []; try { list = JSON.parse(json); } catch (ex) { list = []; } if(!list) list = []; return list; } function writeList(list,dp) { // schreibt ein JSON in einen Datenpunkt setState(dp, JSON.stringify(list)); } // löscht ein element aus einem array function delElement(element,arr){ var elementPos = findElement(element,arr); if (elementPos > -1) { 
        return arr.splice(elementPos, 1);
    }
    return arr;
}
// Position eines elements in einem array
function findElement(element,arr){
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === element) {
            return i;
        }
    }
    return -1;
}

// ------------------------------
// Checks
// ------------------------------

// prüft ob das gefundene Gerät in der Blacklist ist (liefert true/false)
function inBlacklist (mac) {  
    if(bluetoothBlacklistMac) {
        var blacklistStr = "";
        for (var i=0; i<bluetoothBlacklistMac.length; i++) {
            blacklistStr = bluetoothBlacklistMac[i];
            if (mac == blacklistStr) return true;
            if (checkJoker(blacklistStr)) {
                if (mac.substr(0,blacklistStr.length-1) == blacklistStr.substr(0,blacklistStr.length-1)) return true;
            }
        }
    }
    return false;  
}

function inBlacklistLN (localName) {  
    if(bluetoothBlacklistLocalName) {
        for (var i=0; i<bluetoothBlacklistLocalName.length; i++) {
            if (localName == bluetoothBlacklistLocalName[i]) return true;
        }
    }
    return false;  
}

function inBlacklistDD(id) {
    var bluetoothBlacklistDeletedDevices = readList(idDevicesBlacklistDel);
    if(bluetoothBlacklistDeletedDevices) {
        for (var i=0; i<bluetoothBlacklistDeletedDevices.length; i++) {
            if (id == bluetoothBlacklistDeletedDevices[i]) return true;
        }
    }
    return false;  
}

function inBlacklistMD (manufacturerData) {  
    if(bluetoothBlacklistManufacturerData) {
        var blacklistStr = "";
        for (var i=0; i<bluetoothBlacklistManufacturerData.length; i++) { blacklistStr = bluetoothBlacklistManufacturerData[i]; if (manufacturerData == blacklistStr) return true; // TDOD Prüfung auf * am Ende testen (löschen on the fly sorgt für Fehler am Scanende?) if (checkJoker(blacklistStr)) { if (manufacturerData.substr(0,blacklistStr.length-1) == blacklistStr.substr(0,blacklistStr.length-1)) return true; } } } return false; } // prüft ob die MAC/ID ein bekanntes Gerät ist (Vergleich mit der Liste "eigene bekannte Bluetooth Geräte", bluetoothDevices) function inBluetoothDevices (mac) { // TODO: nicht die ganze Liste durchgehen, sondern direkt das Element abfragen (Javascript Optimierung) if(bluetoothDevices) { // hat die Liste "eigene bekannte Bluetooth Geräte" einen Inhalt? for (var device in bluetoothDevices) { if (mac == device) return true; } } return false; } function detailLogAkiv() { return (!(durchlaufLogStop && (durchlauf > durchlaufLogStopAnzahl)));
}

// prüft ob das gefundene Gerät schon bekannt ist auf der übergebende Liste (ID des Datenpunks mit der Liste)
function knownDevice(mac,iDList) {  
    var devices = readList(iDList);
    if(devices) {
        for (var i=0; i<devices.length; i++) {
            if (mac == devices[i]) return true;
        }
    }
    return false;  
}

function checkEnableSetObject() { // prüft ob setObjects() für die Instanz zur Verfügung steht (true/false)
    var enableSetObject = getObject("system.adapter.javascript." + instance).native.enableSetObject;
    return enableSetObject;
}

function getScanmodus() {
    var scanmodus = serviceUUIDs;
    automaticMaxDevice = getState(idControlAutomaticMax).val;
    var anzahlIst = readList(idDevicesListAll).length;
    if (scanmodus.length == 0) {
        if (!automaticOn) {
        scanmodus = 'alle'; 
        } else {
            if (anzahlIst < automaticMaxDevice) { scanmodus = 'alle > ' + anzahlIst + ' von max. ' + automaticMaxDevice + " gefundene Geräte (Automatikmodus ein)";
            } else {
                scanmodus = 'Automatik: Max. Anzahl ' + anzahlIst + ' von ' + automaticMaxDevice + 
                ' Geräten erreicht. Nur schon angelegte oder eigene Geräte werden gescannt.';
                // TODO: die Logik auch erweitern, dass nur noch bekannte Geräte im Scan eingetragen sind                
            }
        }
    }
    if (!getState(idScan).val)  scanmodus = 'aus';
    if (noble.state != 'poweredOn') scanmodus = 'aus - noble module nicht aktiv';
    writeList(scanmodus,idInfoScanModus);
}

function checkHexWithJoker(data) {                // prüft Manufactura Data oder ID (MAC ohne Doppelpunkte) auf Gültigkeit. Ein * als Joker am Ende ist erlaubt.
    var regex = /^([a-f0-9]+)(\*{0,1})$/i;         // https://regex101.com/#javascript
    if (data.match(regex)) return true;
    //logs('Data "' + data + '": ungültiges Format (a-f, 0-9 sind erlaubt und * am Ende als Wildcard)',"warn");
    return false;   
}

function checkJoker(str) {
    if (str) {
        var joker = str.substr(str.length - 1,str.length);
        return (joker == "*" ? true : false);
    }
    return false;
}

function checkData (list,listName) {    // prüft ob in den Blacklists nur gültige Hexwerte 
                                        // (kleine Buchstaben von a-f und Ziffern von 0-9) eingegeben wurden
                                        //  und lLternativ ein  * als Joker am Ende
                                        // Länge wird nicht geprüft!
    if(list) {
        var data = "";
        for (var i=0; i<list.length; i++) {
            data = list[i];
            if (!checkHexWithJoker(data)) {
                logs('ungültige Daten in ' + listName + ': "' + data + '" (a-f, 0-9 sind erlaubt und * am Ende als Joker)','warn');
            }
            //if(checkJoker(data)) logs(listName + ": " + data + " enthält Joker: " + colorTrue,"debug2");
        }
        logs("Liste " + listName + " auf gültige Werte geprüft. Anzahl Einträge: " + i,"info");
    }
}

    // zum löschen markierte Geräte löschen
function delDelDevices() {
    var list = readList(idDevicesListAll); // Liest die Liste aller als Datenpunkte angelegter Geräte ein.
    for (var i=0; i<list.length; i++) { var id = list[i]; var del = getState(devicePfad + id + ".Control.Delete_Device").val; if(del) { deviceDpDelete(id); // alle Datenpunkte des Device löschen delDevice(id,idDevicesListAll); // aus der Liste bekannte Geräte entfernen addDevice(id,idDevicesBlacklistDel); // ID auf die Blacklist der manuell gelöschten Geräte setzen // Infoeintrag elöschtes Gerät var localName = getState(devicePfad + id + ".Name_localName").val; var manufacturerData = getState(devicePfad + id + ".details.manufacturerData").val; setState(idNewDeviceBlocked ,id + "," + "Device_Deleted" + "," + datum() + "," + localName + "," + manufacturerData); logs("Bluetooth Gerät: " + id + ", gelöscht.","info","darkorange"); if(getState(idControlAutomaticOn).val) { // Automatikmodus an? var maxDevice = getState(idControlAutomaticMax).val; var anzDevice = readList(idDevicesListAll).length + 1; logs("maxDevice = " + maxDevice + ", anzDevice = " + anzDevice,"debug","red"); if(anzDevice == maxDevice) { // Liste Maximum erreicht? setState(idControlAutomaticMax, maxDevice-1); // dann Maximum um eins reduzieren logs("Bluetooth Gerät gelöscht. Maximale Anzahl anzulegender Devices um eins reduziert.","info"); } } } } } // ------------------------------ // Verwaltung Listen // ------------------------------ function addDevice(id,idList) { // Liste der bekannten Devices (ohne Blacklist) in einem Datenpunkt pflegen .-> neues Device hinzufügen
    var devices = readList(idList);
    devices.push(id);
    writeList(devices,idList);
    if(idList == idDevicesListAll) {
        logs("Device: " + id + ", zu den bekannten Devices hinzugefügt","info","darkmagenta");
        anzahlBluetoothDevicesNeu = anzahlBluetoothDevicesNeu + 1;
    }
}

function delDevice(id,idList) {                  // Liste der bekannten Devices (ohne Blacklist) in einem Datenpunkt pflegen .-> Device aus Liste löschen
    var devices = readList(idList);
    delElement(id,devices);
    writeList(devices,idList);
    if(idList == idDevicesListAll) {
        logs("Device: " + id + ", von den bekannten Devices gelöscht","info","darkmagenta");
        anzahlBluetoothDevicesNeu = anzahlBluetoothDevicesNeu + 1;
    }
}

// ------------------------------
// Verwaltung Datenpunkte
// ------------------------------

function deviceDpAnlegen(id){
    if(checkEnableSetObject()) { // wenn setObject nicht in der Instanz freigeschaltet ist, wird der Channel nicht angelegt
    // CHANNEL anlegen
        setObject(instanz + devicePfad + id, {
            common: {
                name: id
            },
            type: 'channel'
        }, function(err) {
            if (err) logs('Cannot write object: ' + err,"error");
        });
    }
    // Datenpunkte anlegen
    //for (var datenpunkt in deviceDatenpunkte) {
    //    createState(devicePfad + id + "." + datenpunkt, deviceDatenpunkte[datenpunkt].init, deviceDatenpunkte[datenpunkt].dp);
    //    logs("neuer DP Bluetooth Device: " + devicePfad + id + "." + datenpunkt,"debug","gold");
    //}
}

function deviceDpDelete(id){
    // Datenpunkte löschen
    for (var datenpunkt in deviceDatenpunkte) {
        deleteState(devicePfad + id + "." + datenpunkt);
        logs("DP Bluetooth Device gelöscht: " + devicePfad + id + "." + datenpunkt,"info","darkorange");
    }
}

function trenner(str) {
    var space = "";
    if (str.length > 0) space = " / ";
    return space;
}

function setChannelName(id,localName,vendor,manufacturerData,name){
    if(!checkEnableSetObject()) return; // wenn setObject nicht verfügbar ist, steht die Funktion nicht zur Verfügung
    // CHANNEL anpassen
    //var chName = id;
    var chName  = "";
    var ownName = "";

    if (localName)   {
        if (localName.length > 2)   chName = localName;
    }
    if (vendor)                     chName  = chName + trenner(chName) + vendor;
    if (manufacturerData)           chName  = chName + trenner(chName) + manufacturerData;

    // eigenes Gerät mit eigenem Namen: dann wird der eigene Name als Channelname gesetzt
    if (inBluetoothDevices(id))     ownName = bluetoothDevices[id].name; // eigener vergebener Name in bekannten Bluetooth Devices vergeben?
    if (ownName)                    chName  = ownName;

    if (name)                       chName = name;

    setObject(instanz + devicePfad + id, {
        common: {
            name: chName
        },
        type: 'channel'
    }, function(err) {
        if (err) logs('setChannelName() Cannot write object: ' + err,"error");
    });
}

function nichtErreichbar() {
    for (var i=0; i<bekannteDevicesNichtErreichbar.length; i++) {
        var id = bekannteDevicesNichtErreichbar[i];
         if(!inBlacklist(id)) {
            setState(devicePfad + id + ".lastState"             ,false);
            setState(devicePfad + id + ".lastStateCount"   ,getState(devicePfad + id + ".lastStateCount").val - 1);
         }
    }
}

function getBlacklist(idDP,blacklist) {
    if(bluetoothBlacklistMac) { // wenn die Blacklist mit den MAC Adressen nicht leer ist
        //var list = readList(idDP); // wenn sich die Liste zur Laufzeit ändern soll (dann muss noch zusätzlich das Ergebnis mit der Liste im Script verglichen werden)
        var list = [];
        for (var i=0; i<blacklist.length; i++) {
            list.push(blacklist[i]);
        }
       writeList(list,idDP); 
    }
}

function incDpCounter(dp, incVal, id,localName,manufacturerData,reason) {  // erhöht einen Datenpunkt um einen Wert (ohne Angabe +1)
    if (!knownDevice(id,idDevicesList24blocked)) {
        addDevice(id,idDevicesList24blocked);
        if (typeof incVal == 'undefinied') incVal = 1;
        var val = getState(dp).val;
        val = val + incVal;
        setState(dp,val);
        setState(idNewDeviceBlocked         ,id + "," + reason + "," + datum() + "," + localName + "," + manufacturerData);
    }
}

function setUptime() {
    // setzt den Datenpunkt für Skript-Uptime als formatierte Zeit und gibt die Uptime in Sekunden zurück
    var uptime = dateSecNow()-timeInSecScriptStart;
    setState(idInfoScriptUptime,secForm(uptime));
    return uptime;
}

function setAutomaticMaxDevice(wert) { // setzt einen gültigen Wert für die max. Anzahl der anzulegenden Devices im Automatikmodus
    var min         =  1;
    var max         = 10;
    var defaultMax  = 10;
    var autoMax;

    if (typeof wert != "undefined") {
        autoMax = wert;
    } else {
        autoMax = defaultMax;
    }

    //TODO wert & autoMax prüfen auf:
    // ist Number

    if (autoMax < min) { logs("automaticMaxDevice nicht kleiner als 1 -> auf 1 angepasst","warn");
        autoMax = min;
    }
    if (autoMax > max) {
        logs("automaticMaxDevice nicht größer als 50 -> auf 50 angepasst","warn");
        autoMax = max;
    }
    automaticMaxDevice = autoMax;
    setState(idControlAutomaticMax,autoMax);
}

function scanEndeVerarbeiten() {
    if (durchlauf > 0) { 

        var devicesCount        = readList(idDevicesListAll).length;
        var devicesCountNe      = bekannteDevicesNichtErreichbar.length;

        logs("Bluetooth Scan "+ durchlauf + " OK. Devices gescannt: " 
         + anzahlBluetoothDevices + ", davon neu: " + anzahlBluetoothDevicesNeu 
         + " / Devices in DB: " + devicesCount
         + ", davon nicht erreichbar: " + devicesCountNe,"debug2","gray");
//        if (detailLogAkiv()) logs("Devices in Datenbank: " + JSON.parse(getState(idDevicesListAll).val),"debug");
        if (detailLogAkiv()) logs("Devices in Datenbank: " + readList(idDevicesListAll),"debug2");
        nichtErreichbar(); // nicht erreichbare Devices als "Nicht Erreichbar kennzeichnen";

        setState(idDevicesCountAll      ,devicesCount);
        setState(idDevicesCountOffline  ,devicesCountNe);
        setState(idDevicesCountOnline   ,(devicesCount - devicesCountNe));
        setState(idInfoCountScans       ,durchlauf);

        writeList(bekannteDevicesNichtErreichbar    ,idDevicesOffline);
        writeList(bekannteDevicesErreichbar         ,idDevicesOnline);
        writeList(blacklistDevicesErreichbar        ,idDevicesBlacklistMacOnline);
    }

    anzahlBluetoothDevices      = 0;
    anzahlBluetoothDevicesNeu   = 0;

}

// ------------------------------
// SCAN
// ------------------------------

//  #### START SCAN ####        #### START SCAN ####

function startScan() {                                                          // #### START SCAN ####
    var scan = getState(idScan).val;    // Abfrage ob Scanner ein- (true) oder ausgeschaltet (false) ist
    if (!scan) return;                  // ist der Scanner eingeschaltet? Nein, return

    durchlauf = durchlauf + 1;

    setUptime();                                                    // Laufzeit des Skripts aktualisieren
    setState    (idInfoScanStatus       ,"Scan läuft");

    bekannteDevicesNichtErreichbar = readList(idDevicesListAll);    // zum Start des Durchlaufs alle bekannten Devices übernehmen und mit jedem Treffer um eins reduziren
    bekannteDevicesErreichbar = [];                                 // zum Start des Durchlaufs die Liste zurücksetzen und dann um jedes gefundene Gerät ergänzen
    blacklistDevicesErreichbar = [];                                // zum Start des Durchlaufs die erreichbaren Devices der Blacklist zurücksetzen. Errecihbare Blacklistgeräte werden während des Durchlaufs hinzugefügt.

    noble.startScanning(serviceUUIDs, allowDuplicates);
    //noble.on('discover', onDiscover);
    //noble.startScanning(serviceUUIDs, allowDuplicates[, callback(error)]); // particular UUID's
    //noble.startScanning([],true);
    if (detailLogAkiv()) logs("####### start scanning - Durchlauf (" + durchlauf + ") #######","debug1");
    setTimeout(stopScan, scandauer);
    setTimeout( function () {
        timeInSecScan = timeInSecScan + scandauer/1000;
        setState(idInfoScanDuration,secForm(timeInSecScan));            // Zeit, die bisher gescannt wurde als Info setzen
        setState(idInfoScanStatus       ,"Scan Durchlauf beendet");
    }, scandauer-100);
}

//  #### STOP SCAN ####         #### STOP SCAN ####

function stopScan() {                                                           // #### STOP SCAN ####
    //noble.removeListener('discover', onDiscover);
    noble.stopScanning();

   if (durchlauf > 0) { 

        var devicesCount        = readList(idDevicesListAll).length;
        var devicesCountNe      = bekannteDevicesNichtErreichbar.length;

        logs("Bluetooth Scan "+ durchlauf + " OK. Devices gescannt: " 
         + anzahlBluetoothDevices + ", davon neu: " + anzahlBluetoothDevicesNeu 
         + " / Devices in DB: " + devicesCount
         + ", davon nicht erreichbar: " + devicesCountNe,"debug2","gray");
//        if (detailLogAkiv()) logs("Devices in Datenbank: " + JSON.parse(getState(idDevicesListAll).val),"debug");
        if (detailLogAkiv()) logs("Devices in Datenbank: " + readList(idDevicesListAll),"debug2");
        nichtErreichbar(); // nicht erreichbare Devices als "Nicht Erreichbar kennzeichnen";

        setState(idDevicesCountAll      ,devicesCount);
        setState(idDevicesCountOffline  ,devicesCountNe);
        setState(idDevicesCountOnline   ,(devicesCount - devicesCountNe));
        setState(idInfoCountScans       ,durchlauf);

        writeList(bekannteDevicesNichtErreichbar    ,idDevicesOffline);
        writeList(bekannteDevicesErreichbar         ,idDevicesOnline);
        writeList(blacklistDevicesErreichbar        ,idDevicesBlacklistMacOnline);
    }

    anzahlBluetoothDevices      = 0;
    anzahlBluetoothDevicesNeu   = 0;
    //scanEndeVerarbeiten();
    //setTimeout(delDelDevices, 1000); // zu löschende Geräte aufräumen

//    delDelDevices( function(){
//        scanEndeVerarbeiten(); // TODO: Start verhindern, bis die Funktion durchgelaufen ist
//    });

//    scanEndeVerarbeiten( function(){
//        delDelDevices(); // TODO: Start verhindern, bis die Funktion durchgelaufen ist
//    });

    startScan(); // nach dem Durchlauf des Scans (Ablauf Scandauer), Scan neu starten
}

//  #### DISCOVER ####          #### DISCOVER ####

function onDiscover (peripheral){                                               // #### DISCOVER ####

    var gescanteMacAuswerten    = true; // Anmerkung: wird bei vorzeitigem Verlassen der Funktion mit return nicht benötigt
    var advertisement           = peripheral.advertisement;

//    var macAddress          = peripheral.uuid;
    var id                      = peripheral.id; // gibt als id die mac-Adresse raus, ohne Doppelpunkte (wie bei uuid auch)
    var rssi                    = peripheral.rssi;
    var addressType             = peripheral.addressType;
    var address                 = peripheral.address;
    var connectable             = peripheral.connectable;

    var localName               = advertisement.localName;
    if (typeof localName != "undefined") {
        localName = localName.replace(/\u0000/g, '');          // entfernt null bytes (z.B. vom Apple Pencil)
    }
    if (!localName) localName = "";

    var serviceData             = advertisement.serviceData; 
    var txPl                    = advertisement.txPowerLevel;
    var serviceUuids            = advertisement.serviceUuids;
    var herstellerBuffer        = advertisement.manufacturerData;
    var manufacturerData        = '';
    if (typeof herstellerBuffer != "undefined") {
        manufacturerData = herstellerBuffer.toString('hex');
        //manufacturerData = herstellerBuffer.toString('hex').match(/.{2}/g).join("");
    } else {manufacturerData = ""}

    var knowDevice = knownDevice(id,idDevicesListAll);

    // Blacklist
    // ----------------------------------
    var blacklist = false;
    if (inBlacklist(id)) {
        incDpCounter (idInfoCount24blockBLMac   ,1,id,localName,manufacturerData,"Blacklist_Mac");
        blacklist = true;
    }
    if (inBlacklistLN(localName)) {
        incDpCounter (idInfoCount24blockBLLN    ,1,id,localName,manufacturerData,"Blacklist_Local_Name");
        blacklist = true;
    }
    if (inBlacklistMD(manufacturerData)) {
        incDpCounter (idInfoCount24blockBLMD    ,1,id,localName,manufacturerData,"Blacklist_manufacturer_Data");
        blacklist = true;
    }
    if (inBlacklistDD(id)) {
        incDpCounter (idInfoCount24blockDelDev  ,1,id,localName,manufacturerData,"Blacklist_Deleted_Devices");
        blacklist = true;
    }

    if (blacklist) {
        gescanteMacAuswerten = false;
        blacklistDevicesErreichbar.push(id);
        // TODO: wird nicht benötigt, wenn neue Blacklistdevices bei Scriptstart und bei Änderung zur Laufzeit behandelt werden
        if (knowDevice) {   // wenn es ein bekannts Gerät ist: Datenpunkte löschen und aus der Liste bekannter Geräte entfernen
            deviceDpDelete(id); // Datenpunkte löschen
            delDevice(id,idDevicesListAll);      // aus der Liste bekannte Geräte entfernen
            logs("id: " + id +", aus den Datenpunkten gelöscht (Blacklist)","warn");
        }
        return;
    }

    // Automatikmodus: nicht auswerten, wenn maximal Anzahl Geräte erreicht ist
    // -------------------------------------------------------------------------------------
    // erst nach den anderen Checks. Meldung kommt dann nur, wenn alle anderen Prüfungen schon erfolgt sind
    automaticMaxDevice = getState(idControlAutomaticMax).val;
    var deviceNumber = readList(idDevicesListAll).length;
    var maxOK = ((automaticMaxDevice > deviceNumber) ? true : false);
    if(automaticOn) { // Automatik aktiv 
        if (!maxOK) { // wenn max. nicht größer als die schon angelegten Geräte ist, weiter verarbeiten
            if (knowDevice) {  // ist es schon ein bekanntes Gerät oder ein noch nicht angelegtes Gerät von der Liste eigener Geräte
                if (deviceNumber > automaticMaxDevice) {
                    var newMax = automaticMaxDevice +1;
                    logs("Automatikmodus: Bekanntes Gerät (" + id + ") bei max. zulässiger Anzahl (" + automaticMaxDevice + ") Geräte gefunden. Maximum wird auf " + newMax + " erhöht.","debug2","darkorange");
                    setAutomaticMaxDevice(newMax);
                } else {
                    // nichts tun
                }
                // Maximum noch nicht erreicht, tue nichts. Gerät wird angelegt.
            } else { // kein schon angelegte Gerät 
                if (deviceNumber >= automaticMaxDevice) {
                    if (bluetoothDevices[id]) {
                        var newMax = automaticMaxDevice +1;
                        logs("Automatikmodus: Eigenes Gerät (" + id + ") bei max. zulässiger Anzahl (" + automaticMaxDevice + ") Geräte gefunden. Maximum wird auf " + newMax + " erhöht.","debug2","darkorange");
                        setAutomaticMaxDevice(newMax);
                    } else {
                        if (!knownDevice(id,idDevicesList24blocked)) {
                            logs("Automatikmodus: max. Anzahl anzulegender Geräte erreicht: " + automaticMaxDevice,"info","darkorange");
                            logs("Automatikmodus: gescannte ID: "+ id + " wird nicht verarbeitet.","info","darkorange");
                        }
                        incDpCounter (idInfoCount24blockAutoMax, 1,id,localName,manufacturerData,"Automatik_Maximum_erreicht");
                        gescanteMacAuswerten = false;
                        return;
                    }
                } else {
                    if (deviceNumber >= automaticMaxDevice) { // maximum erreicht, kein neues Gerät wird angelegt.
                        if (!knownDevice(id,idDevicesList24blocked)) {
                            logs("Automatikmodus: max. Anzahl anzulegender Geräte erreicht: " + automaticMaxDevice,"debug2","darkorange");
                            logs("Automatikmodus: Gefundene  ID: "+ id + " wird nicht verarbeitet.","debug2","darkorange");
                        }
                        incDpCounter (idInfoCount24blockAutoMax, 1,id,localName,manufacturerData,"Automatik_Maximum_erreicht");
                        gescanteMacAuswerten = false;
                        return;
                    } // Maximum noch nicht erreicht, tue nichts. Gerät wird angelegt.
                }
            }
        } // wenn max. Anzahl anzulegender Geräte nicht erreicht ist, tue nichts
    } // Automatic nicht aktiv: tue nichts

    // "Spamcheck"
    // ----------------------------------
    if (blockSpam && (addressType == "random") && !localName && !service && !uuid  && (manufacturerData == "")) {
        incDpCounter (idInfoCount24blockSpam, 1,id,localName,manufacturerData,"Spam");
        gescanteMacAuswerten = false;
        logs ("Spam: " + id + ", localName: " + localName + ", service: " + service + ", uuid: " + uuid,"debug","darkorange");
        return;
    }

    // nicht auswerten, wenn das Signal (rssi)zu schwach ist und das Gerät nicht bekannt ist
    // -------------------------------------------------------------------------------------
    if ((rssi < minRssi) && !(knowDevice && !bluetoothDevices[id])) { // Wenn die Signalstärke zu klein ist und es ein unbekanntes Device ist, dieses Device gnorieren
        logs("Device: " + id + ", Signalstärke (rssi): " + rssi + ", < eingestellte Mindest-rssi: " + minRssi + " / Daten nicht verarbeitet","debug","darkorange");
        incDpCounter (idInfoCount24blockRssiLow, 1,id,localName,manufacturerData,"rssi_low");

        gescanteMacAuswerten = false;
        return;
    } 

    // gefundenens Device auswerten
    // ===================================
    if (gescanteMacAuswerten) {

        anzahlBluetoothDevices      = anzahlBluetoothDevices + 1;

        delElement(id,bekannteDevicesNichtErreichbar);      // MAC-Adresse aus dem Array: "bekannteDevicesNichtErreichbar" löschen. Verbliebene MAC-Adressen werden nach dem Durchlauf auf nicht erreichbar gesetzt
        bekannteDevicesErreichbar.push(id);                 // MAC-Adresse zum Array Devices die online sind hinzufügen

        var distanz = calculateDistance(rssi);
        distanz     = Math.round(distanz*100)/100;

        //if (distanz <1) distanz = 0.00; var uuid = ""; var uuidData = ""; if (serviceData && serviceData.length) { for (var k in serviceData) { //log(' ' + k + ": uuid: " + JSON.stringify(serviceData[k].uuid) + ', data: ' + JSON.stringify(serviceData[k].data.toString('hex'))); uuid = uuid + k + ": uuid: " + JSON.stringify(serviceData[k].uuid) + ', data: ' + JSON.stringify(serviceData[k].data.toString('hex')) + ","; } } var service = ""; for (var j in serviceUuids) { //log(' ' + j + ': serviceUuids: ' + serviceUuids[j]); service = service + j + ': serviceUuids: ' + serviceUuids[j] + ","; } service = service.substr(0, service.length-1); // letztes Komma in der Liste löschen uuid = uuid.substr(0, uuid.length-1); // letztes Komma in der Liste löschen // Detail-Log gefundener Geräte // wird nur begrenzte Durchläufe ausgegeben, wenn konfiguriert if (detailLogAkiv()) { logs("---=== Durchlauf: "+ durchlauf + " ===---         ---=== Device Nr.: " + anzahlBluetoothDevices + " ===---", "debug1"); logs('id: ' + id, "debug1","gray"); logs('MAC-Address: ' + address, "debug1","gray"); logs('localName: ' + localName, "debug1","gray"); logs('rssi: ' + rssi + " dB", "debug1","gray"); logs('txPower: ' + txPl + " dB", "debug1","gray"); logs('Distanz: ' + distanz + " m", "debug1","gray"); logs('manufacturerData: ' + manufacturerData, "debug1","gray"); logs('service: ' + service, "debug1","gray"); logs('uuid: ' + uuid, "debug1","gray"); } else { //logs("Detailausgabe Device: konfigurierte Grenze erreicht (im Script konfigurierbar)", "debug2"); } getScanmodus(); var name = ""; if (!knowDevice) { // -------------------------------------------------------------------- // Device wurde das erste mal gefunden: Ale Parameter verzögert anlegen // -------------------------------------------------------------------- addDevice(id,idDevicesListAll); // MAC/ID in der Liste bekannte Geräte hinzufügen deviceDpAnlegen(id); // Channel anlegen (Datenpunkte werden nicht mehr über die Funktion angelegt) createState(devicePfad + id + ".Control.Delete_Device" ,false ,deviceDatenpunkte["Control.Delete_Device"].dp); createState(devicePfad + id + ".Name_localName" ,localName ,deviceDatenpunkte["Name_localName"].dp); createState(devicePfad + id + ".rssi" ,rssi ,deviceDatenpunkte["rssi"].dp); createState(devicePfad + id + ".lastState" ,true ,deviceDatenpunkte["lastState"].dp); createState(devicePfad + id + ".lastStateDate" ,datum() ,deviceDatenpunkte["lastStateDate"].dp); createState(devicePfad + id + ".lastStateCount" ,0 ,deviceDatenpunkte["lastStateCount"].dp); createState(devicePfad + id + ".Distanz" ,distanz ,deviceDatenpunkte["Distanz"].dp); createState(devicePfad + id + ".details.uuid" ,uuid ,deviceDatenpunkte["details.uuid"].dp); createState(devicePfad + id + ".details.service" ,service ,deviceDatenpunkte["details.service"].dp); //createState(devicePfad + id + ".details.txPower" ,txPl ,deviceDatenpunkte["details.txPower"].dp); createState(devicePfad + id + ".details.address" ,address ,deviceDatenpunkte["details.address"].dp); createState(devicePfad + id + ".details.addressType" ,addressType ,deviceDatenpunkte["details.addressType"].dp); createState(devicePfad + id + ".details.connectable" ,connectable ,deviceDatenpunkte["details.connectable"].dp); createState(devicePfad + id + ".details.manufacturerData" ,manufacturerData ,deviceDatenpunkte["details.manufacturerData"].dp); var person = ""; var txPower = txPl; if(inBluetoothDevices(id)) { // bekannte Geräte (in der Liste bluetoothDevices) Parameter eintragen logs("### Datenpunkt für ein bekanntes Gerät angelegt ### >> "  + bluetoothDevices[id].name,"info","green");
                if (typeof bluetoothDevices[id].txPower != 'undefined') txPower = bluetoothDevices[id].txPower
                if (typeof bluetoothDevices[id].name    != 'undefined') name    = bluetoothDevices[id].name;
                if (typeof bluetoothDevices[id].person  != 'undefined') person  = bluetoothDevices[id].person;
            }
            createState(devicePfad + id + ".details.txPower"   ,txPower   ,deviceDatenpunkte["details.txPower"].dp);    
            createState(devicePfad + id + ".Name"              ,name      ,deviceDatenpunkte["Name"].dp);    // selbst vergebener Name aus der Liste bluetoothDevices
            createState(devicePfad + id + ".Person"            ,person    ,deviceDatenpunkte["Person"].dp);

            // Herstellernamen anhand der mac-Adresse ermitteln, Channelnamen setzen, Detailinformationen letztes gefundenes Device           
            //if (addressType == "public") {
            readVendor(id, function(err,vendor,id) {
                if(!vendor) vendor = mdVendor(manufacturerData); // wenn anhand der Mac-Adresse kein Hersteller ermittelt wurde, versuche aus den Manufacture Data den Hersteller zu ermitteln
                if(!vendor) vendor = "";
                createState(devicePfad + id + ".Hersteller" ,vendor ,deviceDatenpunkte["Hersteller"].dp);
                setState(idNewDeviceMoreInfo         ,id + "," + localName + "," + vendor                            + "," + datum());

                setChannelName(id,localName,vendor,manufacturerData);     
                setState(idNewDevice                 ,id);
            });

        } else {
            // --------------------------------------------------------------------
            // bei schon angelegten Devices die veränderbaren Parameter eintragen
            // --------------------------------------------------------------------

            // in jedem Durchlauf die Namen prüfen (z.B. bei Skriptrestart und selbst eingetragenen Devices in der Whitelist
            var vendor  = getState(devicePfad + id + ".Hersteller").val;
            name        = getState(devicePfad + id + ".Name").val;
            setChannelName(id,localName,vendor,manufacturerData,name); // local name des Gerätes könnte sich verändert haben   

            var lastStateCount = getState(devicePfad + id + ".lastStateCount" ).val;
            if(lastStateCount < 0) { lastStateCount = 0; } else { lastStateCount = lastStateCount + 1; } if((lastStateCount == 0) || (durchlauf == 1)) { // Datum letzte Statusänderung neu setzen, beim 1\. Scandurchlauf nach Skriptstart oder bei Stusänderung setStateDelayed(devicePfad + id + ".lastStateDate" ,datum() ,false,delay); lastStateCount = 0; // im 1\. Durchlauf den Counter auch zurücksetzen } setStateDelayed(devicePfad + id + ".Name_localName" ,localName ,false,delay); setStateDelayed(devicePfad + id + ".rssi" ,rssi ,false,delay); setStateDelayed(devicePfad + id + ".lastState" ,true ,false,delay); setStateDelayed(devicePfad + id + ".lastStateCount" ,lastStateCount ,false,delay); setStateDelayed(devicePfad + id + ".Distanz" ,distanz ,false,delay); setStateDelayed(devicePfad + id + ".details.manufacturerData" ,manufacturerData ,false,delay); setStateDelayed(devicePfad + id + ".details.uuid" ,uuid ,false,delay); setStateDelayed(devicePfad + id + ".details.service" ,service ,false,delay); setStateDelayed(devicePfad + id + ".details.address" ,address ,false,delay); setStateDelayed(devicePfad + id + ".details.addressType" ,addressType ,false,delay); } } } // ============================================================================= // Schedule Schedule // ============================================================================= function onAnlegen() { // Schedules und Subscriptons (on) werden über die Funktion onAnlegen() verzögert eingerichtet, damit alle neuen Datenpunkte verfügbar sind // wird um 00:00 ausgeführt // 24h Tageszähler löschen schedule({hour: 0, minute: 0}, function (){ logs("Bluetooth Scanner: 24h Zähler um Mitternacht gelöscht.","debug"); clear24(); }); schedule("*/5 * * * * *", function () { // alle 5 Sekunden die Uptime aktualisieren setUptime(); }); // ============================================================================= // ON ON // ============================================================================= // Scanner Start / Stop über Datenpunkt on({id: instanz + idScan ,change:'any'}, function (obj) { logs("Kommando Bluetooth Scanner an: " + (obj.state.val ? colorTrue : colorFalse),"info","black"); getScanmodus(); if (obj.state.val) { startScan(); } else { if (obj.oldState.val) setState(idInfoScanStatus ,"Scan wird beendet");; stopScan(); } }); // Automatikmodus an/aus über Datenpunkt on({id: instanz + idControlAutomaticOn ,change:'any'}, function (obj) { automaticMaxDevice = getState(idControlAutomaticMax).val; if (obj.state.val) { logs('Automatikmodus eingeschaltet ("' + idControlAutomaticOn + '": ' + colorTrue + ')',"info","gray"); clear24(); } else { logs('Automatikmodus ausgeschaltet ("' + idControlAutomaticOn + '": ' + colorFalse + ')',"info","gray"); } automaticOn = obj.state.val; if (obj.state.val && (readList(idDevicesListAll).length >= automaticMaxDevice)) {
            logs("Max. Anzahl an automatisch anzulegenden DP erreicht. Nur noch eigene Geräte werden neu angelegt.","info","darkorange");
        }
        getScanmodus();
    });

    // Automatikmodus Maximalwert anzulegender Gerätes über Datenpunkt eingestellt
    on({id: instanz + idControlAutomaticMax ,change:'ne'}, function (obj) {
        automaticMaxDevice = obj.state.val;
        if (readList(idDevicesListAll).length > automaticMaxDevice) {
            var newMax = readList(idDevicesListAll).length;
            logs("Es gibt mehr angelegte Geräte, als max. eingestellt sind. Maximalwert auf " + newMax + " erhöht.","info","darkorange");
            setAutomaticMaxDevice(newMax);
        } else {
            logs('Automatikmodus. Neuer Wert max. anzulegende Geräte: ' + obj.state.val,"info","gray");
        }
        getScanmodus();
    });

    noble.on('stateChange', function(state){
        logs('noble new state: ' + state,"warn");
        setState(idNobleStatus,state);
        if (state === 'poweredOn') {
            setState(idScan,true);      // Scan starten 
        } else {
            setState(idScan,false);     // Scan stoppen 
        }
    });

    noble.on('disconnect', function() {
        logs('noble try to reconnect',"warn");
        //noble.startScanning([], false); // Try to reconnect, if connection broke
        setState(idScan,true);          // Scan im Zustand, wie im Datenpunkt 
    });

    noble.on('discover', onDiscover);

//printSubs(name,loglevel);  // globale Funktion. listet die Subscription im Script im Log auf.
}

// =============================================================================
// Datenpunkte aktualisieren (wird vor main() ausgeführt
// =============================================================================

function refreshDp () {

    setState    (idNobleStatus          ,noble.state);                          // Status des noble Moduls in den Datenpunkt schreiben
    setState    (idInfoCountScans       ,0);                                    // Scandurchläufe auf 0 setzen
    setState    (idInfoScanStatus       ,"aus");                                // Status des Scans "aus"
    setState    (idInfoScanDuration     ,"-");

    automaticOn         = getState(idControlAutomaticOn).val;

    getBlacklist(idDevicesBlacklistMac  ,bluetoothBlacklistMac);                // Blacklist MAC-Adressen in den Datenpunkt schreiben
    getBlacklist(idDevicesBlacklistLN   ,bluetoothBlacklistLocalName);          // Blacklist LocalName in den Datenpunkt schreiben
    getBlacklist(idDevicesBlacklistMD   ,bluetoothBlacklistManufacturerData);   // Blacklist LocalName in den Datenpunkt schreiben

    setUptime();
    getScanmodus();

}

// =============================================================================
// main - Hauptprogramm                                                     main
// =============================================================================
function main() {

    // Hauptprogramm nach Timeout (damit neu angelegte Datenpunkte vorhanden sind)
    // Im Hauptprogramm weiter:

    setState(idNewDevice            ,"Script_Start"                     ,false); //TODO: Wird beim erneuten Scriptstart nicht geschrieben. Warum???
    setState(idNewDeviceMoreInfo    ,"Script_Start" + ",,," + datum()   ,false);

    // setState(idScan,true);                   // schaltet den Scanner ein

    if (!getState(idScanFirst).val) {
        setState(idScan,true);                  // Scan beim ersten Scriptstart automatisch starten
        setState(idScanFirst,true);             // beim nächsten Start nicht mehr automatisch
        logs("======================================================================================"   ,"info","limegreen");
        logs("Script wurde das erste Mal gestartet - Scanner eingeschaltet -"                           ,"info","limegreen");
        logs("Scanstart und ein-/ausschalten in Zukunft in Abhängigkeit: " + instanz + idScan           ,"info","limegreen");
        logs("======================================================================================"   ,"info","limegreen");
        logs("Zur Kalibrierung der Distanz das Bluetooth Gerät in einen Meter Entfernung zum Host"      ,"info");
        logs("positionieren und dann den Wert aus .rssi unter .details.txPower beim Device eintragen"   ,"info");
        logs("(oder im Script in der Liste der bekannten Devices: bluetoothDevices)"                     ,"info");
        logs("--------------------------------------------------------------------------------------"   ,"info");

    } else {
        setState(idScan,getState(idScan).val);  // Sonst: Scan im Zustand an/aus, wie im Datenpunkt gespeichert 
    }

    if(!checkEnableSetObject())  {
        logs("setObject() ist in der Konfig der Javascript-Adapterinstanz nicht eingeschatet"           ,"info","darkorange");
        logs("setObject() Skript wird mir weniger Komfort ausgeführt"                                   ,"info","darkorange");
        setState(idInfoSetObject,   'setObject() ist für die Instanz nicht aktiviert. Es werden weniger Informationen angezeigt.');
    } else {
        setState(idInfoSetObject,   'OK');
    }
}

// =============================================================================
// Scriptstart
// =============================================================================

autokorrekturen();                          // Korrektur und Prüfung von Variablen, die als Parameter im Skript dienen

if(noerror) {
    dpAnlegen();                            // erst die notwendigen Datenpunkte anlegen
    noble.removeAllListeners('discover');   // alle Listeners 'discover' löschen, falls noch ein discover aktiv war und das Skript währenddessen neu gestartet wurde (Probleme bei einem Adapter, wenn zwei Instanzen gewünscht sind?)
    noble.stopScanning();                   // eventuell bestehenden Scan stoppen

    setTimeout(onAnlegen,    500);          // dann die Subscriptions und Schedules setzen
    setTimeout(refreshDp,    500);          // und die Datenpunkte aktualisieren (Zustandsanzeige per Datenpunkt)

    setTimeout(main,        1000);          // dann das "Hauptprogramm" starten

} else {
    logs("Das Skript wurde nicht gestartet. Siehe Fehlermeldungen.","warn");
}

</pre>