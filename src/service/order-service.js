/*
* @Author: Administrator
* @Date:   2017-10-13 11:17:25
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-17 17:43:44
*/
var _mm = require('util/mm.js');
var _order = {
    //获取商品列表
    getProductList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    }, 
    //提交订单
    createOrder : function(orderInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/create.do'),
            data    : orderInfo,
            success : resolve,
            error   : reject
        });
    }, 
    //获取订单列表  
    getOrderList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },  
    //订单详情
    getDetail : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/detail.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    }, 
    //取消订单
    cancelOrder : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/cancel.do'),
            data    : {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _order; 