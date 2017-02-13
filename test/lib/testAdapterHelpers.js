function register(it, expect, context) {
    // formatValue
    it('Test ' + context.adapterShortName + ' adapter: Check formatValue', function (done) {
        this.timeout(1000);
        var testValue, testValue2;

        // Test with number
        testValue = context.adapter.formatValue(1000,'.,');
        expect(testValue).to.be.a('string');
        expect(testValue).to.equal('1.000,00');

        // Test against rounding errors
        testValue = context.adapter.formatValue(1000.1994, 3, '.,');
        expect(testValue).to.equal('1.000,199');
        testValue = context.adapter.formatValue(1000.1996, 3,'.,');
        expect(testValue).to.equal('1.000,200');

        // Test with string
        testValue = context.adapter.formatValue('1000', '.,');
        expect(testValue).to.be.a('string');
        expect(testValue).to.equal('1.000,00');

        // Test with an empty format pattern
        testValue = context.adapter.formatValue('1000', ''); //1.000,00
        testValue2 = context.adapter.formatValue('1000', (context.adapter.isFloatComma === undefined) ? '.,' : ((context.adapter.isFloatComma) ? '.,' : ',.')); //1.000,00
        expect(testValue).to.equal(testValue2);

        testValue = context.adapter.formatValue(undefined, '.,');
        expect(testValue).to.be.empty;
        done();
    });

    // formatDate
    it('Test ' + context.adapterShortName + ' adapter: Check formatDate', function (done) {
        this.timeout(1000);
        var testDate = new Date(0);
        var testStringDate, testStringDate2;

        expect(context.adapter.formatDate(new Date())).to.be.a('string');

        testStringDate = context.adapter.formatDate(testDate, 'YYYY-MM-DD');
        expect(testStringDate).to.be.a('string');
        expect(testStringDate).to.equal('1970-01-01');

        // expect 1 hour as output
        testStringDate = context.adapter.formatDate(1 * 3600000 + 1 * 60000 + 42000 + 1, 'duration', 'hh.mm.ss.sss');
        expect(testStringDate).to.be.a('string');
        expect(testStringDate).to.equal('01.01.42.001'); // 1 hour, 1 minute, 42 seconds, 1 milliseconds

        // positive test with "Februar"
        testStringDate = context.adapter.formatDate('23 Februar 2014', 'YYYY.MM.DD');
        expect(testStringDate).to.be.a('string');
        expect(testStringDate).to.contain('2014.02.23');

        // negative test, give the wrong date "Fabruar"
        testStringDate = context.adapter.formatDate('23 Fabruar 2014', 'YYYY.MM.DD');
        expect(testStringDate).to.be.a('string');
        expect(testStringDate).to.contain('NaN'); // NaN.NaN.NaN

        testStringDate = context.adapter.formatDate(undefined, 'YYYY.MM.DD');
        expect(testStringDate).to.be.empty;
        done();
    });

    // idToDCS
    // _DCS2ID

}


module.exports.register = register;