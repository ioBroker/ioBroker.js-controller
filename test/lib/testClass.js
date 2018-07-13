// Warning! This test should only be run on NodeJS 6+

'use strict';

const wrapES6Class = require('../../lib/tools').wrapES6Class;

class TestClass {

	constructor(arg1, arg2) {
		if (arg1 && arg2) {
			this.test = arg1 + arg2;
		} else {
			this.test = "ok";
		}
		
	}

}

module.exports = wrapES6Class(TestClass);