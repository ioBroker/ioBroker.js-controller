import config, { esmConfig } from '@iobroker/eslint-config';

export default [
    ...config,
    ...esmConfig,
    {
        files: ['**/*.test-d.ts'],
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-base-to-string': 'off'
        }
    }
];
