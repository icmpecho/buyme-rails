'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var OrderApi = require('../utils/OrderApi');

var OrderActions = {
    getOrders: function () {
        OrderApi.getOrders(true).end(function (error, res) {
            if (!!error) {
                return console.log(error);
            }
            if (res.status === 200) {
                AppDispatcher.handleApiAction({
                    actionType: ActionTypes.GET_ORDERS_SUCCESS,
                    data: res.body
                })
            }
        });
    },
    getMyOrders: function () {
        OrderApi.getMyOrders(true).end(function (error, res) {
            if (!!error) {
                return console.log(error);
            }
            if (res.status === 200) {
                AppDispatcher.handleApiAction({
                    actionType: ActionTypes.GET_MY_ORDERS_SUCCESS,
                    data: res.body
                })
            }
        });
    },
    getMyOldOrders: function () {
        OrderApi.getMyOrders(false).end(function (error, res) {
            if (!!error) {
                return console.log(error);
            }
            if (res.status === 200) {
                AppDispatcher.handleApiAction({
                    actionType: ActionTypes.GET_MY_OLD_ORDERS_SUCCESS,
                    data: res.body
                })
            }
        });
    },
    addMyOrders: function (itemName, quantity, storeIds) {
        OrderApi.addMyOrders(itemName, quantity, storeIds).end(function (error, res) {
            if (!!error) {
                return console.log(error);
            }
            if (res.status === 200) {
                AppDispatcher.handleApiAction({
                    actionType: ActionTypes.ADD_MY_ORDER_SUCCESS,
                    data: res.body
                })
            }
        });
    },
    readMyAddedOrder: function () {
        AppDispatcher.handleApiAction({
            actionType: ActionTypes.READ_MY_ADDED_ORDER_SUCCESS,
            data: {}
        })
    },
    cancelMyOrder: function (id) {
        OrderApi.cancelMyOrder(id).end(function (error, res) {
            if (!!error) {
                return console.log(error);
            }
            if (res.status === 200) {
                AppDispatcher.handleApiAction({
                    actionType: ActionTypes.CANCEL_MY_ORDER_SUCCESS,
                    data: {
                        id: id
                    }
                });
            }
        });
    },
    removeMyOldOrder: function (id) {
        OrderApi.removeMyOrder(id).end(function (error, res) {
            if (!!error) {
                return console.log(error);
            }
            if (res.status === 204) {
                AppDispatcher.handleApiAction({
                    actionType: ActionTypes.REMOVE_MY_OLD_ORDER_SUCCESS,
                    data: {
                        id: id
                    }
                });
            }
        });
    },
    removeStoreOrder: function (id) {
        OrderApi.removeStoreOrder(id).end(function (error, res) {
            if (!!error) {
                return console.log(error);
            }
            if (res.status === 200) {
                AppDispatcher.handleApiAction({
                    actionType: ActionTypes.REMOVE_STORE_ORDER_SUCCESS,
                    data: {
                        id: id
                    }
                });
            }
        });
    }
};

module.exports = OrderActions;
