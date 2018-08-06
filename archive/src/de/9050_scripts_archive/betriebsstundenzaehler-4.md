# Zählen von States

Script um States zu zahlen [lowbat, dimmer, shutter, chromecast, etc]


## Script

<pre class="lang:js decode:true codecontent">//Add device rules
addDeviceCounter("lowbat",         $('channel[state.id=*.LOWBAT]'),                      true);
addDeviceCounter("sticky_unreach", $('channel[state.id=*.STICKY_UNREACH]'),              true);
addDeviceCounter("unreach",        $('channel[state.id=*.UNREACH]'),                     true);
addDeviceCounter("config_pending", $('channel[state.id=*.CONFIG_PENDING]'),              true);
addDeviceCounter("open_windows",   $('channel{TYPE=SHUTTER_CONTACT}[state.id=*.STATE]'), true);
addDeviceCounter("on_lights",      $('channel{TYPE=DIMMER}[state.id=*.LEVEL]'),          function(state){return state>0;});
addDeviceCounter("open_shutters",  $('channel{TYPE=BLIND}[state.id=*.LEVEL]'),           function(state){return state>0;});
addDeviceCounter("playing_music",  $('channel[state.id=*audio-*.playing]'),              true);

/******************************************
 * Code - do not change anything bellow this line *
 ******************************************/

function addDeviceCounter(name, selector, val_to_count) {

    //Total amount of devices found by selector
    var state_total = 'deviceCounter.' + name + '.total';
    createState(state_total, 0);
    //List of devices that match condition
    var state_list = 'deviceCounter.' + name + '.list';
    createState(state_list, "");
    //Number of devices that match condition
    var state_counter = 'deviceCounter.' + name + '.counter';
    createState(state_counter, 0);

    function countDevs(obj) {
        var d_count = 0;
        var d_list  = [];

        selector.each(function (id, i) {
            var status = getState(id).val;
            var obj    = getObject(id);
            if ((typeof val_to_count === 'function' && val_to_count(status)) ||
                (typeof val_to_count === 'boolean'  && val_to_count == status)) {
                //Get parent object
                var parentChannelId = id.slice(id.lastIndexOf("."));
                var parentDevicelId = id.split(".").slice(0,-2).join(".");
                var deviceObject = getObject(parentDevicelId);
                //remember device name
                d_list.push(deviceObject.common.name);
            }                
            ++d_count;                                                 // Zählt die Anzahl der vorhandenen Geräte unabhängig vom Status
        }); 

        log(name + "(" + d_count + "): " + d_list);

        setState(state_list,     d_list.join('<br>'));
        setState(state_counter,  d_list.length);
        setState(state_total,    d_count);
    }

    //Re-evaluate when a device status changes
    selector.on(function(obj) {    // bei Zustandänderung *. LOWBAT in allen Gewerken
        countDevs(obj);
    });

    //Re-evaluate each hour
    schedule("*/60 * * * *", countDevs);

    //Evaluate for the first time
    countDevs();
}</pre>