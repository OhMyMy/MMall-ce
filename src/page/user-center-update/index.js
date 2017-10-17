/*
* @Author: Administrator
* @Date:   2017-10-02 00:02:10
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-05 12:13:07
*/
require('./index.css');
require('page/common/nav/index.js');

require('page/common/header/index.js');

var navSide = require('page/common/nav-side/index.js');

var _mm = require('util/mm.js');

var _user = require('service/user-service.js');

var teplateIndex = require('./index.string');

var page = {
    init :function(){
        this.onLoad();
        this.bindEvent();
    }, 
    onLoad : function(){
        //初始化左侧菜单
        navSide.init({
            name : 'user-center'
        })
        //加载用户信息
        this.loadUserInfo();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                phone : $.trim($('#phone').val()),
                email : $.trim($('#email').val()),
                question : $.trim($('#question').val()),
                answer : $.trim($('#answer').val())
            },
            validateResult = _this.validateFrom(userInfo);
            if(validateResult.status){
                _user.updateUserInfo(userInfo, function(res, msg){
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    validateFrom : function(formData){
        var result = {
            status : false,
            msg    : ''
        };
        if(!_mm.validate(formData.phone,'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        if(!_mm.validate(formData.email,'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        if(!_mm.validate(formData.question,'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if(!_mm.validate(formData.answer,'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        //通过验证 提示
        result.status = true;
        result.msg    = '提交成功';
        return result;
    },
    //加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(teplateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    },

  
};

$(function(){
    page.init();
});