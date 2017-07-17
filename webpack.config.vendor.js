const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    const extractCSS = new ExtractTextPlugin('vendor.css');

    const extractSass = new ExtractTextPlugin({
        filename: "vendor.css",
        disable: true
    });

    const sharedConfig = {
        stats: { modules: false },
        resolve: { extensions: ['.js'] },
        module: {
            rules: [
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' }
            ]
        },
        entry: {
            vendor: [
                '@angular/animations',
                '@angular/common',
                '@angular/compiler',
                '@angular/core',
                '@angular/forms',
                '@angular/http',
                '@angular/platform-browser',
                '@angular/platform-browser-dynamic',
                '@angular/platform-browser/animations',
                '@angular/router',
                // 'bootstrap',
                // 'bootstrap/dist/css/bootstrap.css',
                'es6-shim',
                'es6-promise',
                'event-source-polyfill',
                'jquery',
                'zone.js',
                '@angular/material',
                '@angular/cdk',
                '@angular/material/prebuilt-themes/indigo-pink.css',
                './Styles/main.scss'
            ]
        },
        output: {
            publicPath: '/dist/',
            filename: '[name].js',
            library: '[name]_[hash]'
        },
        plugins: [
            // new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
            new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, path.join(__dirname, './ClientApp')), // Workaround for https://github.com/angular/angular/issues/11580
            new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.join(__dirname, './ClientApp')), // Workaround for https://github.com/angular/angular/issues/14898
            new webpack.IgnorePlugin(/^vertx$/) // Workaround for https://github.com/stefanpenner/es6-promise/issues/100
        ]
    };

    // const clientBundleConfig = merge(sharedConfig, {
    //     output: { path: path.join(__dirname, 'wwwroot', 'dist') },
    //     module: {
    //         rules: [
    //             { test: /\.css(\?|$)/, use: extractCSS.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }) }
    //         ]
    //     },
    //     plugins: [
    //         extractCSS,
    //         new webpack.DllPlugin({
    //             path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
    //             name: '[name]_[hash]'
    //         })
    //     ].concat(isDevBuild ? [] : [
    //         new webpack.optimize.UglifyJsPlugin()
    //     ])
    // });

    // const serverBundleConfig = merge(sharedConfig, {
    //     target: 'node',
    //     resolve: { mainFields: ['main'] },
    //     output: {
    //         path: path.join(__dirname, 'ClientApp', 'dist'),
    //         libraryTarget: 'commonjs2',
    //     },
    //     module: {
    //         rules: [{ test: /\.css(\?|$)/, use: ['to-string-loader', isDevBuild ? 'css-loader' : 'css-loader?minimize'] }]
    //     },
    //     entry: { vendor: ['aspnet-prerendering'] },
    //     plugins: [
    //         new webpack.DllPlugin({
    //             path: path.join(__dirname, 'ClientApp', 'dist', '[name]-manifest.json'),
    //             name: '[name]_[hash]'
    //         })
    //     ]
    // });


    //SASS
    const clientBundleConfig = merge(sharedConfig, {
        output: { path: path.join(__dirname, 'wwwroot', 'dist') },
        module: {
            rules: [
                {
                    test: /\.(css|scss)(\?|$)/, use: extractCSS.extract({
                        use: [
                            {
                                loader: 'raw-loader'
                            },
                            {
                                loader: "sass-loader"
                            }
                        ],
                        // use style-loader in development
                        fallback: "style-loader"
                    })
                },
                // { test: /\.css(\?|$)/, use: extractCSS.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize'} )}
            ]
        },
        plugins: [
            extractSass,
            // extractCSS,
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    });

    const serverBundleConfig = merge(sharedConfig, {
        target: 'node',
        resolve: { mainFields: ['main'] },
        output: {
            path: path.join(__dirname, 'ClientApp', 'dist'),
            libraryTarget: 'commonjs2',
        },
        module: {
            rules: [
                { test: /\.(css|scss)(\?|$)/, use: ['raw-loader', 'sass-loader'] },
                // { test: /\.css(\?|$)/, use: ['to-string-loader', isDevBuild ? 'css-loader' : 'css-loader?minimize'] }
            ]
        },
        entry: { vendor: ['aspnet-prerendering'] },
        plugins: [
            new webpack.DllPlugin({
                path: path.join(__dirname, 'ClientApp', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ]
    });

    return [clientBundleConfig, serverBundleConfig];
}
