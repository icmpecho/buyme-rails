'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var OrderApi = require('../utils/OrderApi');

var OrderActions = {
    getOrders: function () {
        OrderApi.getOrders().end(function (error, res) {
            if (!!error) {
                return console.log(error);
            }
            AppDispatcher.handleApiAction({
                actionType: ActionTypes.GET_ORDERS_SUCCESS,
                data: res.body
            })
        });
    },
    addOrder: function (itemId, itemName, storeIds) {
        AppDispatcher.handleApiAction({
            actionType: ActionTypes.ADD_ORDER_SUCCESS,
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
    }
};

module.exports = OrderActions;
