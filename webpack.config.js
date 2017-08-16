const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  return {
    entry: {
      index: "./test/index.js"
    },
    devServer: {
      port: 8081,
      contentBase: path.join(__dirname, "test"),
      proxy: {
        "/chuck": {
          "changeOrigin": true,
          target: "https://api.chucknorris.io",
          pathRewrite: {"^/chuck" : ""}
        }
      }
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Caching',
        //template: './webpack/static/index.ejs'
      }),
    ]
    //module: mods,
  }
}
