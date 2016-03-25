var base = {
    presets: ['stage-0'],
    plugins: [
        'transform-es2015-destructuring',
        'transform-es2015-parameters',
        'transform-es2015-sticky-regex',
        'transform-es2015-unicode-regex',
        'transform-es2015-function-name',
        'transform-es2015-shorthand-properties'
    ]
};

var app = Object.assign(base, {
    plugins: ['react']
});

module.exports = {
    client: Object.assign(app, {
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
    server: Object.assign(app, {
    }),
    tasks: Object.assign(base, {
        plugins: ['transform-es2015-modules-commonjs']
    })
};