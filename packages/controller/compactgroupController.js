/**
 *      Controller process for Compact Groups
 *
 *      Copyright 2018-2020 bluefox <dogafox@gmail.com>,
 *      MIT License
 *
 */
const controller = require('./main');

const compactGroup = parseInt(process.argv[2], 10);
if (isNaN(compactGroup) || compactGroup < 1) {
    console.log('Invalid compact group (' + compactGroup + ') as first parameter. Exit.');
    process.exit();
}

controller.init(compactGroup);
