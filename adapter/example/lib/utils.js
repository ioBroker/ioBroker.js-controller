var controllerDir;

// Get js-controller directory to load libs
function getControllerDir() {
    var fs = require('fs');
    // Find the js-controller location
    var controllerDir = __dirname.replace(/\\/g, '/');
    controllerDir = controllerDir.split('/');

    if (controllerDir[controllerDir.length - 3] == 'adapter') {
        controllerDir.splice(controllerDir.length - 3, 3);
        controllerDir = controllerDir.join('/');
    } else
    if (controllerDir[controllerDir.length - 3] == 'node_modules') {
        controllerDir.splice(controllerDir.length - 3, 3);
        controllerDir = controllerDir.join('/');
        if (fs.existsSync(controllerDir + '/node_modules/iobroker.js-controller')) {
            controllerDir += '/node_modules/iobroker.js-controller';
        } else
        if (fs.existsSync(controllerDir + '/node_modules/ioBroker.js-controller')) {
            controllerDir += '/node_modules/ioBroker.js-controller';
        } else
        if (!fs.existsSync(controllerDir + '/controller.js')) {
            console.log('Cannot find js-controller');
            process.exit(10);
        } 
    } else {
        console.log('Cannot find js-controller');
        process.exit(10);
    }
    return controllerDir;
}

// Read controller configuration file
function getConfig() {
    var fs = require('fs');
    var configFile = controllerDir.splice('/');

    // If installed with npm
    if (fs.existsSync(controllerDir + '/../../node_modules/iobroker.js-controller') ||
        fs.existsSync(controllerDir + '/../../node_modules/ioBroker.js-controller')) {
        // remove /node_modules/ioBroker.js-controller
        configFile.splice(configFile.length - 2, 2);
        configFile = configFile.join('/');
        return configFile + '/iobroker-data/iobroker.json';
    } else {
        if (fs.existsSync(controllerDir + '/conf/iobroker.json')) {
            configFile = controllerDir + '/conf/iobroker.json';
        } else {
            configFile = controllerDir + '/data/iobroker.json';
        }
    }

    return JSON.parse(fs.readFileSync(configFile));
}
// Cache controller dir
controllerDir = getControllerDir();

exports.controllerDir = controllerDir;
exports.getConfig =     getConfig;
exports.adapter =       require(controllerDir + '/lib/adapter.js');
