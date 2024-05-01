import { getCronExpression } from '@/lib/utils.js';
import { expect } from 'chai';

describe('test internal helpers', () => {
    it('getCronExpression', () => {
        const cronWithoutSeconds = '15 * * * *';
        const cronWithSeconds = '3 15 * * * *';

        const cronSecondsAdded = getCronExpression('15 * * * *');
        expect(cronSecondsAdded).to.be.not.equal(cronWithoutSeconds);
        expect(cronSecondsAdded.split(' ').length).to.be.equal(6);

        const cronNothingAdded = getCronExpression(cronWithSeconds);
        expect(cronNothingAdded).to.be.equal(cronWithSeconds);
    });
});
