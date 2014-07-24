var adapter = require(__dirname + '/../../modules/adapter.js')({

    name:           'scripts',

    // is called if a subscribed object changes
    objectChange: function (id, obj) {

    },

    stateChange: function (id, state) {
        adapter.log.info('stateChange ' + id + ' ' + JSON.stringify(state));

    },

    // is called when adapter shuts down - callback has to be called under any circumstances!
    unload: function (callback) {
        try {
            adapter.log.info('cleaned everything up...');
            callback();
        } catch (e) {
            callback();
        }
    },

    ready: function () {
        main();
    }

});

function main() {



}
