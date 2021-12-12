module.exports = {
    env: {
        es6: true,
        node: true
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    plugins: [],
    ignorePatterns: ['**/doc', '**/build'],
    reportUnusedDisableDirectives: true,
    rules: {
        /* pretier takes care of these two rules
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        'array-element-newline': [
            'error',
            {
                ArrayExpression: 'consistent',
                ArrayPattern: { minItems: 3 }
            }
        ],*/
        curly: 'error',
        'brace-style': 'error',
        'arrow-parens': ['error', 'as-needed'],
        'no-console': 'off',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrors: 'all' }],
        'no-useless-escape': 'warn',
        'no-constant-condition': 'off',
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
        'no-var': 'error',
        'prefer-const': 'error',
        'no-throw-literal': 'error',
        'prefer-promise-reject-errors': 'error',
        'require-await': 'error',
        'no-return-await': 'error',
        eqeqeq: ['error', 'always'],
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        semi: ['error', 'always'],
        'comma-dangle': [
            'error',
            {
                arrays: 'never',
                objects: 'never',
                imports: 'never',
                exports: 'never',
                functions: 'ignore'
            }
        ],
        'no-trailing-spaces': 'error',
        'prettier/prettier': 'error',
        'no-nested-ternary': 'off', // maybe turn this on later
        'no-unneeded-ternary': 'error'
    },
    parserOptions: {
        ecmaVersion: 2019
    },
    overrides: [
        // we need ts parser for ts files
        {
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 2019,
                sourceType: 'module',
                project: './tsconfig.json'
            },
            files: ['**/*.ts', '**/*.tsx'],
            extends: ['plugin:@typescript-eslint/recommended'],
            rules: {
                '@typescript-eslint/no-parameter-properties': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-use-before-define': [
                    'error',
                    {
                        functions: false,
                        typedefs: false,
                        classes: false
                    }
                ],
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    {
                        ignoreRestSiblings: true,
                        argsIgnorePattern: '^_'
                    }
                ],
                '@typescript-eslint/no-object-literal-type-assertion': 'off',
                '@typescript-eslint/interface-name-prefix': 'off',
                '@typescript-eslint/no-non-null-assertion': 'off', // This is necessary for Map.has()/get()!
                '@typescript-eslint/no-inferrable-types': [
                    'error',
                    {
                        ignoreProperties: true,
                        ignoreParameters: true
                    }
                ],
                '@typescript-eslint/ban-ts-comment': [
                    'error',
                    {
                        'ts-expect-error': false,
                        'ts-ignore': true,
                        'ts-nocheck': true,
                        'ts-check': false
                    }
                ],
                '@typescript-eslint/restrict-template-expressions': [
                    'error',
                    {
                        allowNumber: true,
                        allowBoolean: true,
                        // This is necessary to log errors
                        // TODO: Consider switching to false when we may annotate catch clauses
                        allowAny: true,
                        allowNullish: true
                    }
                ],
                '@typescript-eslint/no-misused-promises': [
                    'error',
                    {
                        checksVoidReturn: false
                    }
                ],
                // We can turn this on from time to time but in general these rules
                // make our lives harder instead of easier
                '@typescript-eslint/no-unsafe-argument': 'off',
                '@typescript-eslint/no-unsafe-assignment': 'off',
                '@typescript-eslint/no-unsafe-member-access': 'off',
                '@typescript-eslint/no-unsafe-return': 'off',
                '@typescript-eslint/no-unsafe-call': 'off',

                // Although this rule makes sense, it takes about a second to execute (and we don't need it)
                '@typescript-eslint/no-implied-eval': 'off',

                '@typescript-eslint/explicit-module-boundary-types': [
                    'warn',
                    { allowArgumentsExplicitlyTypedAsAny: true }
                ],
                '@typescript-eslint/no-this-alias': 'off',

                // Prefer simple property access and declaration without quotes
                'dot-notation': 'off',
                '@typescript-eslint/dot-notation': [
                    'error',
                    {
                        allowPrivateClassPropertyAccess: true,
                        allowProtectedClassPropertyAccess: true
                    }
                ],
                'quote-props': ['error', 'as-needed']
            }
        }
    ]
};
