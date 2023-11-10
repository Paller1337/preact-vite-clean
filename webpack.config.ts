module.exports = {
    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader',   // translates CSS into CommonJS
                    'sass-loader'   // compiles Sass to CSS
                ],
            },
        ],
    },
    resolve: {
        alias: {
            'react': 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat',
            'react/jsx-runtime': 'preact/jsx-runtime'
        }
    }
};
``
