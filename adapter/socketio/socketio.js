/* jshint -W097 */// jshint strict:false
/*jslint node: true */
"use strict";


var adapter = require(__dirname + '/../../lib/adapter.js')({

    name:           'socketio',

    objectChange: function (id, obj) {

    },

    stateChange: function (id, state) {


    },

    unload: function (callback) {
        callback();
    },


    ready: function () {
        main();
    }

});

function main() {



}
