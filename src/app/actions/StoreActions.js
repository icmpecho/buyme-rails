'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var StoreApi = require('../utils/StoreApi');

var StoreActions = {
    getStores: function () {
        StoreApi.getStores().end(function (error, res) {
            if (!!error) {
                return console.log(error);
            }
            if (res.status === 200) {
                AppDispatcher.handleApiAction({
                    actionType: ActionTypes.GET_STORES_SUCCESS,
                    data: res.body
                });
            }
        });
    },
    getStoreOrders: function (id) {
        StoreApi.getStoreOrders(id).end(function (error, res) {
            if (!!error) {
                return console.log(error);
            }
            if (res.status === 200) {
                AppDispatcher.handleApiAction({
                    actionType: ActionTypes.GET_STORE_ORDERS_SUCCESS,
                    data: res.body.orders
                });
            }
        });
    }
};

module.exports = StoreActions;
