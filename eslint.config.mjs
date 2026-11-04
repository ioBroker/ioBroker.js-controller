import config, { esmConfig } from '@iobroker/eslint-config';

export default [
    {
        ignores: ['**/build/*', 'packages/adapter/register-test.mjs'],
    },
    ...config,
    ...esmConfig,
    {
        files: ['**/*.test-d.ts'],
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-base-to-string': 'off',
            // type-only assertion files are never executed
            '@typescript-eslint/no-floating-promises': 'off',
        },
    },
    {
        // test code uses the callback-style APIs and intentional fire-and-forget setup
        files: ['**/test/**/*.ts'],
        rules: {
            '@typescript-eslint/no-floating-promises': 'off',
        },
    },
];
