var merge = require('deepmerge');

var base = {
    plugins: [
        // ES2015
        'transform-es2015-destructuring',
        'transform-es2015-parameters',
        'transform-es2015-sticky-regex',
        'transform-es2015-unicode-regex',
        'transform-es2015-function-name',
        'transform-es2015-shorthand-properties',
        'transform-es2015-modules-commonjs',
        // Stage-0
        'transform-do-expressions',
        'transform-function-bind',
        'transform-class-constructor-call',
        'transform-class-properties',
        'transform-export-extensions',
        'syntax-trailing-function-commas',
        'transform-object-rest-spread',
        'transform-async-to-generator',
        'transform-exponentiation-operator',
        // Legacy
        'transform-decorators-legacy',
        // Clear
        'conditional-compile'
    ]
};

var app = merge(base, {
    presets: ['react']
});

module.exports = {
    client: merge(app, {
        presets: [
            'react-hmre'
        ],
        plugins: [
            'transform-es2015-template-literals',
            'transform-es2015-literals',
            'transform-es2015-arrow-functions',
            'transform-es2015-block-scoped-functions',
            'transform-es2015-classes',
            'transform-es2015-object-super',
            'transform-es2015-computed-properties',
            'transform-es2015-for-of',
            'check-es2015-constants',
            'transform-es2015-spread',
            'transform-es2015-block-scoping',
            'transform-es2015-typeof-symbol',
            ['transform-regenerator', { async: false, asyncGenerators: false }]
        ]
    }),
    server: merge(app, {
    }),
    tasks: merge(base, {
    })
};