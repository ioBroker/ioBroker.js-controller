var srcDir   = __dirname + "/../";

module.exports = {
    all: {
        src: [
                srcDir + "*.js",
                srcDir + "lib/*.js",
                srcDir + "adapter/**/*.js",
                '!' + srcDir + 'node_modules/**/*.js',
                '!' + srcDir + 'adapter/admin/www/lib/**/*.js',
                '!' + srcDir + 'adapter/*/node_modules/**/*.js'
        ],
        options: {
            force: true,
            "requireCurlyBraces": ["else", "for", "while", "do", "try", "catch"], /*"if",*/
            "requireSpaceAfterKeywords": ["if", "else", "for", "while", "do", "switch", "return", "try", "catch"],
            "requireSpaceBeforeBlockStatements": true,
            "requireParenthesesAroundIIFE": true,
            "requireSpacesInFunctionExpression": {"beforeOpeningCurlyBrace": true},
            "requireSpacesInAnonymousFunctionExpression": {"beforeOpeningRoundBrace": true, "beforeOpeningCurlyBrace": true},
            "requireSpacesInNamedFunctionExpression": {"beforeOpeningCurlyBrace": true},
            "requireSpacesInFunctionDeclaration": {"beforeOpeningCurlyBrace": true},
            "disallowMultipleVarDecl": true,
            "requireBlocksOnNewline": true,
            "disallowEmptyBlocks": true,
            "disallowSpacesInsideObjectBrackets": true,
            "disallowSpacesInsideArrayBrackets": true,
            "disallowSpaceAfterObjectKeys": true,
            "disallowSpacesInsideParentheses": true,
            "requireCommaBeforeLineBreak": true,
            //"requireAlignedObjectValues": "all",
            "requireOperatorBeforeLineBreak": ["?", "+", "-", "/", "*", "=", "==", "===", "!=", "!==", ">", ">=", "<", "<="],
//            "disallowLeftStickedOperators": ["?", "+", "/", "*", "=", "==", "===", "!=", "!==", ">", ">=", "<", "<="],
//                    "requireRightStickedOperators": ["!"],
//                    "requireSpaceAfterBinaryOperators": ["?", "+", "/", "*", ":", "=", "==", "===", "!=", "!==", ">", ">=", "<", "<="],
            //"disallowSpaceAfterBinaryOperators": [","],
            "disallowSpaceAfterPrefixUnaryOperators": ["++", "--", "+", "-", "~", "!"],
            "disallowSpaceBeforePostfixUnaryOperators": ["++", "--"],
            "requireSpaceBeforeBinaryOperators": ["+", "-", "/", "*", "=", "==", "===", "!=", "!=="],
            "requireSpaceAfterBinaryOperators": ["?", ">", ",", ">=", "<=", "<", "+", "-", "/", "*", "=", "==", "===", "!=", "!=="],
            //"validateIndentation": 4,
            //"validateQuoteMarks": { "mark": "\"", "escape": true },
            "disallowMixedSpacesAndTabs": true,
            "disallowKeywordsOnNewLine": ["else", "catch"]

        }
    }
};