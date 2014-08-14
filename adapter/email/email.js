/**
 *
 *      ioBroker email Adapter
 *
 *      (c) 2014 bluefox
 *
 *      MIT License
 *
 */

var nodemailer;

var adapter = require(__dirname + '/../../lib/adapter.js')({

    name:           'email',

    objectChange: function (id, obj) {

    },

    stateChange: function (id, state) {
        
    },

    unload: function (callback) {
        try {
            adapter.log.info('terminating');
            callback();
        } catch (e) {
            callback();
        }
    },

    ready: function () {
        main();
    },
    
    // New message arrived. obj is array with current messages
    message: function (obj) {
        if (obj && obj.command == "send") processMessage(obj.message);
        processMessages();
        return true;
    }

});

var stopTimer = null;
var emailTransport;

// Terminate adapter after 30 seconds idle
function stop() {
    if (stopTimer) {
        clearTimeout(stopTimer);
    }
    stopTimer = setTimeout(function() { 
        stopTimer = null;
        adapter.stop(); 
    }, 300000);
}

function processMessage(message) {
    if (stopTimer) {
        clearTimeout(stopTimer);
    }

    sendEmail(message);

    stop();
}

function processMessages() {
    adapter.getMessage(function (err, obj) {
        if (obj) {
            processMessage(obj);
            processMessages();
        }
    });
}

function main() {
    // Adapter is started only if some one writes into "system.adapter.email.X.messagebox" new value
    processMessages();
    stop();
}

function sendEmail(message) {
    if (!emailTransport) {
        emailTransport = require("nodemailer").createTransport(adapter.config.transport, adapter.config.transportOptions);
    }

    if (typeof message != "object") {
        message = {text: message};
    }
    var msg = {
        from:    message.from    || adapter.config.defaults.from,
        to:      message.to      || adapter.config.defaults.to,
        subject: message.subject || adapter.config.defaults.subject,
        text:    message.text    || adapter.config.defaults.text
    };
    
    emailTransport.sendMail(msg, function(error, response){
        if (error) {
            adapter.log.error("Error " + JSON.stringify(error))
        } else {
            adapter.log.info("sent to " + msg.to);
        }
        stop();
    });
}
