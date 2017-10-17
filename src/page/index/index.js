/*
* @Author: Administrator
* @Date:   2017-09-23 17:22:38
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-05 00:11:44
*/
require('./index.css');

require('page/common/nav/index.js');

require('page/common/header/index.js');

require('util/slider/index.js');

var templateBanner = require('./banner.string');

var navSide = require('page/common/nav-side/index.js');;

var _mm = require('util/mm.js');

/*轮播初始化*/
$(function() {
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    $('.banner').unslider({
        dots: true
    });
    // 前一张和后一张操作的事件绑定
     var unslider = $('.banner').unslider();
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        unslider.data('unslider')[forward]();
    });
});
/*navSide.init({
    name : 'order-list'
});*/

