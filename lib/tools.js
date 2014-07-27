var os = require('os');
var fs = require('fs');


function rmdirRecursiveSync(path) {
    if (fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function (file, index){
            var curPath = path + '/' + file;
            if(fs.statSync(curPath).isDirectory()) {
                // recurse
                rmdirRecursiveSync(curPath);
            } else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        // delete (hopefully) empty folder
        fs.rmdirSync(path);
    }
}

function findIPs() {


    var ifaces = os.networkInterfaces();
    var ipArr = [];
    for (var dev in ifaces) {
        ifaces[dev].forEach(function (details) {
            if (!details.internal) ipArr.push(details.address);
        });
    }
    return ipArr;
}



module.exports.findIPs =               findIPs;
module.exports.rmdirRecursiveSync =    rmdirRecursiveSync;