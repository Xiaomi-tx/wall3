const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const resolve = (targetPath) => {
  return path.resolve(__dirname, targetPath);
}

const {merge} = require("webpack-merge")
const htmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const dev = require("./webpack.dev")
const prod = require("./webpack.prod")

const getFiles = require("../src/index");

let File = getFiles();
console.log(File);


const commenConfig = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            }
          },
        ]
      }
    ]
  },  
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          filename: "js/[id]_vendors.js",
          priority: -10
        },
        // bar: {
        //   test: /bar_/,
        //   filename: "[id]_bar.js"
        // }
        default: {
          minChunks: 2,
          filename: "common_[id].js",
          priority: -20
        }
      }
    }
  },
  resolve: {
    alias: {
      "home": resolve('.././src/home'),
      "login": resolve('.././src/login'),
      "lovewall": resolve('.././src/lovewall'),
      "vote": resolve('.././src/vote'),
    }
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./index.html"
    }),
    new CopyPlugin({
      patterns: File
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ]
}
let config = null;
module.exports = function (env) {
  console.log(env);
  
  if (env.production) {
    config = prod;
  } else {
    config = dev;
  }
 
  return merge(commenConfig, config)
} 