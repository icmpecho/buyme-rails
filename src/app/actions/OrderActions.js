'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var OrderApi = require('../utils/OrderApi');

var OrderActions = {
    getMyOrders: function (pending) {
        console.log('getMyOrders');
        OrderApi.getMyOrders(pending).end(function (error, res) {
            if (!!error) {
                return console.log(error);
            }
            AppDispatcher.handleApiAction({
                actionType: !!pending ? ActionTypes.GET_MY_ORDERS_SUCCESS : ActionTypes.GET_MY_OLD_ORDERS_SUCCESS,
                data: res.body
            })
        });
    },
    addMyOrder: function (itemId, itemName, storeIds) {
        AppDispatcher.handleApiAction({
            actionType: ActionTypes.ADD_MY_ORDER_SUCCESS,
            data: {}
        });
        //OrderApi.addOrder(itemId, itemName, storeIds).end(function (error, res) {
        //    if (!!error) {
        //        return console.log(error);
        //    }
        //    AppDispatcher.handleApiAction({
        //        actionType: ActionTypes.ADD_ORDER_SUCCESS,
        //        data: res.body
        //    })
        //});
    },
    removeMyOrder: function (pending) {
        AppDispatcher.handleApiAction({
            actionType: !!pending ? ActionTypes.REMOVE_MY_ORDER_SUCCESS : ActionTypes.REMOVE_MY_OLD_ORDER_SUCCESS,
            data: {}
        });
    },
    getShopOrders: function () {
        OrderApi.getShopOrders().end(function (error, res) {
            if (!!error) {
                return console.log(error);
            }
            AppDispatcher.handleApiAction({
                actionType: ActionTypes.GET_SHOP_ORDERS_SUCCESS,
                data: res.body
            })
        });
    }
};

module.exports = OrderActions;
