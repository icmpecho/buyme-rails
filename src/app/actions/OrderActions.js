'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var OrderApi = require('../utils/OrderApi');

var OrderActions = {
    getOrders: function () {
        OrderApi.getOrders();
    },
    receiveOrders: function (data) {
        AppDispatcher.handleApiAction({
            actionType: ActionTypes.RECEIVE_ORDERS_SUCCESS,
            data: data
        })
    }
};

module.exports = OrderActions;
