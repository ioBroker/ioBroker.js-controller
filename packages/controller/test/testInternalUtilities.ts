import { getCronExpression } from '../src/lib/utils.js';
import { expect } from 'chai';

describe('test internal helpers', () => {
    it('getCronExpression', () => {
        const cronWithoutSeconds = '15 * * * *';
        const cronWithSeconds = '3 15 * * * *';

        const cronSecondsAdded = getCronExpression({ cronExpression: cronWithoutSeconds, connectionType: 'cloud' });
        expect(cronSecondsAdded).to.be.not.equal(cronWithoutSeconds);
        expect(cronSecondsAdded.split(' ').length).to.be.equal(6);

        const cronNothingAdded = getCronExpression({ cronExpression: cronWithSeconds, connectionType: 'cloud' });
        expect(cronNothingAdded).to.be.equal(cronWithSeconds);

        // no delay for connection types different from cloud
        const cronSecondsWrongConnectionType = getCronExpression({
            cronExpression: cronWithoutSeconds,
            connectionType: 'local'
        });
        expect(cronSecondsWrongConnectionType).to.be.equal(cronWithoutSeconds);
    });
});
