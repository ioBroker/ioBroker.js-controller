var tools = require(__dirname + '/tools.js');
tools.getRepositoryFile('https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json', function (err, data) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    var output = false;
    for (var a = 0; a < process.argv.length; a++) {
        if (process.argv[a] == '--file' && process.argv[a + 1]) {
            require('fs').writeFileSync(process.argv[a + 1], JSON.stringify(data, null, 2));
            output = true;
        }
        if (process.argv[a] == '--json') {
            console.log(JSON.stringify(data, null, 2));
            output = true;
        }
        if (process.argv[a] == '--versions') {
            for (var a in data) {
                console.log(count + '. ' + a + ': ' + data[a].version);
            }
            output = true;
        }
        if (process.argv[a] == '--list') {
            var count = 1;
            for (var a in data) {
                if (typeof data[a].desc == 'object') {
                    console.log(count + '. ' + a + ': ' + data[a].desc.en);
                } else
                    console.log(count + '. ' + a + ': ' + data[a].desc);

                count++;
            }
            output = true;
        }
        if (process.argv[a] == '--shortlist') {
            for (var a in data) {
                console.log(a);
            }
            output = true;
        }
    }
    if (!output) console.log(JSON.stringify(data, null, 2));
    process.exit();
});