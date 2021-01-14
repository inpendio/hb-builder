let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');


module.exports={
    mode: process.env.NODE_ENV === 'production'?'production':'development',
    target: ['web', 'es5'],
    entry: {
        app:['./index.js'],
        // prebid:['prebid.js']
    },
    output:{
        filename: 'js/[name].js',
    },
    module: {
        rules: [
          
          // this rule can be excluded if you don't require babel-loader for your other application files
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            }
          },
          {
            test: /.js$/,
            include: new RegExp(`\\${path.sep}prebid\\.js`),
            use: {
              loader: 'babel-loader',
              // presets and plugins for Prebid.js must be manually specified separate from your other babel rule.
              // this can be accomplished by requiring prebid's .babelrc.js file (requires Babel 7 and Node v8.9.0+)
              options: require('prebid.js/.babelrc.js')
            }
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: path.resolve(__dirname,'./dist'),
                },
              },
              'css-loader',
              'sass-loader',
            ],
          },
          
          // this separate rule is required to make sure that the Prebid.js files are babel-ified.  this rule will
          // override the regular exclusion from above (for being inside node_modules).
        //   {
        //     test: /.js$/,
        //     include: new RegExp(`\\${path.sep}prebid\\.js`),
        //     use: {
        //       loader: 'babel-loader',
        //       // presets and plugins for Prebid.js must be manually specified separate from your other babel rule.
        //       // this can be accomplished by requiring prebid's .babelrc.js file (requires Babel 7 and Node v8.9.0+)
        //       options: require('prebid.js/.babelrc.js')
        //     }
        //   }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
            __DEV__: process.env.NODE_ENV !== 'production',
          }),
        new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        inject: 'head',
        // inject:false,
        // scriptLoading: 'defer',
        title: 'Custom template',
            // Load a custom template (lodash by default)
            template: 'index.html',
            xhtml:true
        
      }),
      new BundleAnalyzerPlugin({
        generateStatsFile:true,
        analyzerMode:'disabled' //process.env.NODE_ENV === 'production' ?'server':'disabled'
      })
    ],
    optimization: {
        minimize: true,
        // minimizer: [
        //     (compiler) => {
        //         console.log(compiler);
        //       const TerserPlugin = require('terser-webpack-plugin');
        //       new TerserPlugin({ /* your config */ }).apply(compiler);
        //     }
        //   ],
        // splitChunks:true
      },
    // optimization: {
    //     runtimeChunk: 'single',
    //       splitChunks: {
    //         chunks: 'all',
    //         maxInitialRequests: Infinity,
    //         minSize: 0,
    //         cacheGroups: {
    //           prebidVendor: {
    //             test: /[\\/]node_modules[\\/](prebid)[\\/]/,
    //             name: "prebidVendor"
    //           },
              
    //         },
    //       },
    //     },
    devServer:{
        port: 4456,
        open: false,
        hot: true,
        // compress: true,
        stats: 'errors-only',
        contentBase: './build',
        publicPath: '/',
      },
}
