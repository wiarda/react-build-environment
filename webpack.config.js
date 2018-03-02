var HTMLWebpackPlugin =  require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
   template: __dirname + '/app/index.html'
  ,filename: 'index.html'
  ,inject: 'head'
  })
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var ExtractTextPluginConfig = new ExtractTextPlugin('styles.css')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var OptimizeCssAssetsConfig = new OptimizeCssAssetsPlugin({
  assetNameRegExp: /.css$/,
  cssProcessor: require('cssnano'),
  cssProcessorOptions: { discardComments: {removeAll: true } },
  canPrint: true
  })
// var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
// var UglifyJSConfig = new UglifyJSPlugin({
//                           // sourceMap: true,
//                           uglifyOptions: {dead_code: true}
//                         })
// var ExtractSCSS = new ExtractTextPlugin('style.css')

module.exports = {
   mode: 'production'

  ,entry: __dirname + '/app/index.jsx'

  ,module: {
    rules: [
      { test: /\.jsx$/
        ,exclude: /node_modules/
        ,loader: 'babel-loader'
        ,query: {presets: ['env', 'react']}
      }

      //process css
      ,{ test: /\.css$/
        ,use: ExtractTextPlugin.extract({fallback: 'style-loader', use:'css-loader'})
      }

      //scss for bootstrap
      ,{ test: /\.(scss)$/
        ,use: ExtractTextPlugin.extract({
          fallback: 'style-loader' // inject CSS to page
          ,use: [
                  {loader: 'css-loader'} // translates CSS into CommonJS modules
                  ,{loader: 'postcss-loader' // Run post css actions
                    ,options: {
                      plugins: function () { // post css plugins, can be exported to postcss.config.js
                        return [
                          require('precss'),
                          require('autoprefixer')
                        ];
                      }
                    }
                  }
                  ,{loader: 'sass-loader'} // compiles Sass to CSS
              ]
            })
        }

    ] // end rules array
  } //end module object

  ,output: {
     filename: 'index.js'
    ,path: __dirname + '/build'
    }

  ,plugins: [
     HTMLWebpackPluginConfig
    ,ExtractTextPluginConfig
    ,OptimizeCssAssetsConfig
  ]

}
