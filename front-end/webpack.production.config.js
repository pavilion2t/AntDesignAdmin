var webpack=require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = {
   entry: {bundle:'./src/main.js',
           common:["react","react-dom","react-router","recharts"]
      },//定义入口文件
	//devtool: 'source-map',
   output: {
      path: __dirname + '/dist',//定义构建后的文件的输出路径
      publicPath:"../",
      filename: 'js/[name].js',//构建文件名
   },
//关于模块的加载相关
   module: {
      loaders: [
//babel转码
      {
         test: /\.jsx?$/,
         exclude: /node_modules/,
	   loader: 'babel-loader'
         
      },
//css样式加载模块
      {
         test:/\.(css|less)$/,
         loader:ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
         })
      },
//图片加载模块
      {
         test: /\.(png|jpg|jpeg|svg|gif)$/,
         loader: 'url-loader?limit=10240&name=img/[name].[ext]',
      },
      {
         test: /\.(woff|svg|eot|ttf|woff2)$/,
         loader: 'file-loader?name=font/[name].[ext]',
      },
      ]
   },
//避免这些类库的源码被构建到bundle.js，增加编译速度
//    externals: {
//          'react': 'React',
//          'react-dom': 'ReactDOM',
//          'router':'ReactRouter',
//          'recharts':'Recharts',
//       //    'antd':"antd"
//     },
//webpack在构建包的时候会按目录的进行文件的查找，resolve属性中的extensions数组中用于配置程序可以自行补全哪些文件后缀：
    resolve:{
      extensions:['.js','.json']
   },

   plugins: [
      new webpack.optimize.CommonsChunkPlugin({
         names: ['common','mainfest']
      })
      ,
      new ExtractTextPlugin("css/styles.css"),
      new HtmlWebpackPlugin({filename:"index.html",title:"react-test",inject:false,template:"./template.html"})
   ]


}

module.exports = config;
