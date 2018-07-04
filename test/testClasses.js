// @ts-check
'use strict';

var expect = require('chai').expect;

let nodeVersion;
try {
	nodeVersion = parseInt(process.versions.node.split(".")[0]);
} catch (e) {
	// nothing to do, skip test
}

// This test should only be run on NodeJS 6+
if (nodeVersion && nodeVersion >= 6) {
	describe(`Test ES6 class interoperability`, () => {
		const TestClass = require("./lib/testClass");

		it(`TestClass should be defined`, () => {
			expect(TestClass).to.not.be.undefined;
		});

		it(`TestClass should be creatable with "new"`, () => {
			const instance = new TestClass();
			expect(instance).to.be.an.instanceof(TestClass);
			expect(instance.test).to.equal("ok");
		});

		it(`TestClass should be creatable without "new"`, () => {
			const instance = TestClass();
			expect(instance).to.be.an.instanceof(TestClass);
			expect(instance.test).to.equal("ok");
		});

		it(`The constructor args should be passed in both cases`, () => {
			let instance = new TestClass("a", "b");
			expect(instance).to.be.an.instanceof(TestClass);
			expect(instance.test).to.equal("ab");

			instance = TestClass("c", "d");
			expect(instance).to.be.an.instanceof(TestClass);
			expect(instance.test).to.equal("cd");
		});
	});	
}
