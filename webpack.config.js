var HTMLWebpackPlugin =  require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
   template: __dirname + '/app/index.html'
  ,filename: 'index.html'
  ,inject: 'head'
  })

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
      //css for loading in bootstrap's min.css
      ,{ test:/\.css$/
        ,use:['style-loader', 'css-loader']}
    ]
  }
  ,output: {
     filename: 'index.jsx'
    ,path: __dirname + '/build'
    }
  ,plugins: [HTMLWebpackPluginConfig]

}
