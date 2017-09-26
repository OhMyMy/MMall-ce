/*
* @Author: Administrator
* @Date:   2017-09-23 17:28:17
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-26 23:52:14
*/

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

//单独打包css
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//环境变量的配置 dev / online(区分开发和线上环境)
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

// 获取HtmlWebpackPlugin参数的方法 生成多个html
var getHtmlConfig = function(name,title){
    return {
         //目标文件
        template : './src/view/'+ name + '.html',
        //生成的文件
        filename : 'view/'+ name + '.html',
        title : title,
        inject : true,
        hash : true,
        //thunk注入到页面
        chunks : ['common',name]
    }
}
var configs = {
    entry: {
        'common' : './src/page/common/index.js',
        'index' : './src/page/index/index.js',
        'login' : './src/page/login/index.js',
        'result' : './src/page/result/index.js',
    },
    output: {
        path: __dirname + '/dist', 
        publicPath : '/dist',//浏览器访问文件路径 
        filename: 'js/[name].js',
    },
    //全局Jq引用 将html打包生成的文件引用原html的Jq文件引入
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader:  ExtractTextPlugin.extract("style-loader","css-loader")
            },
            {
                test : /\.(png|jpg|gif|svg|woff|eot|ttf|woff2)$/i,
                loader : 'url-loader?limit=100&name=resource/[name].[ext]',
            },
            //string
            {
                test : /\.string$/,
                loader : 'html-loader',
            },
            //font-awesome-webpack
            { 
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "url-loader?limit=10000&mimetype=application/font-woff" 
            },
            {   test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "file-loader" 
            }
       ]
    },
     //文件路径的便捷配置
    resolve : {
        alias : {
            node_modules : __dirname + '/node_modules',
            util         : __dirname + '/src/util',
            page         : __dirname + '/src/page',
            service      : __dirname + '/src/service',
            image        : __dirname + '/src/image'
        }
    },
    plugins: [
        //独立通过模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',         
            filename : 'js/base.js'//路径基于dist
        }),
        //css单独打包到文件
        new ExtractTextPlugin("css/[name].css"),
        // html模板处理-
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作成功')),
    ]
};
module.exports = configs;

if( 'dev' === WEBPACK_ENV ){
    config.common.push('webpack-dev-server/client?http://loacalhost:8888/');
}