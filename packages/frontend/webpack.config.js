const path = require('path');

const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const assetPath = process.env.ASSET_PATH || '/';

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index',
        output: {
            path: path.join(__dirname, '../../dist'),
            filename: '[name].bundle.js',
            chunkFilename: '[name].bundle.js',
            publicPath: assetPath,
        },
        target: 'web',
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: require('./.babelrc.js'),
                    },
                },
                {
                    test: /\.(jpg|png|svg|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 20000,
                            outputPath: 'assets',
                            name: '[name].[hash:8].[ext]',
                        },
                    },
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'assets/fonts/',
                            },
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                disable: !isProduction,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin({
                eslint: {
                    files: './src/**/*.{ts,tsx,js,jsx}',
                },
            }),
            new Dotenv(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
        ],
        devtool: isProduction ? false : 'inline-source-map',
        devServer: {
            hot: true,
            open: true,
            historyApiFallback: true,
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
    };
};
