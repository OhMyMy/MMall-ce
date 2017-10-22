/*
* @Author: Administrator
* @Date:   2017-09-23 17:22:38
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-22 23:28:16
*/
require('./index.css');

require('page/common/nav/index.js');

require('page/common/header/index.js');

require('util/slider/index.js');

var templateBanner = require('./banner.string');

var navSide = require('page/common/nav-side/index.js');;

var _mm = require('util/mm.js');


$(function() {
    /*轮播初始化*/
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

    /*菜单*/
    var $menuItems = $('.keyword-item'),
        $subList  = $('.sub-list'),
        $catePart = $('.cate-part'),
        $menu     = $('.menu');
    $menuItems.each(function(){
        var m = $menuItems.index(this);
        $(this).attr('data-index',m);
    });

    $menuItems.mouseover(function(){
        $subList.removeClass('hide');
        var curIndex = $(this).attr('data-index');

        $catePart.css('display','none');
        $menuItems.removeClass('active');

        $catePart.eq(curIndex).css('display','block');
        $menuItems.eq(curIndex).addClass('active');
    });
    //隐藏
    $subList.hover(function(){
        $(this).attr('class','sub-list');
    },function(){
        $(this).attr('class','sub-list hide');
    });

    $('.keyword-list').mouseleave(function(){
        $subList.attr('class','sub-list hide');
    });

});


