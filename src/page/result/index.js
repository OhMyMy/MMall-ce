/*
* @Author: Administrator
* @Date:   2017-09-26 23:43:18
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-27 00:16:18
*/
require('./index.css');

require('page/common/nav-simple/index.js');;

var __mm = require('util/mm.js');

$(function(){
    var type = __mm.getUrlParam('type') || 'defult',
        $element = $('.' + type + '-success').show();
})