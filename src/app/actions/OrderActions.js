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
            var OrderActions = require('../actions/OrderActions');
            AppDispatcher.handleApiAction({
                actionType: ActionTypes.RECEIVE_ORDERS_SUCCESS,
                data: res.body
            })
        });
    }
};

module.exports = OrderActions;
