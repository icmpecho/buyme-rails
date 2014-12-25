'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var assign = require('object-assign');

var _orders = [];
var _historyOrders = [];

function getMyOrders(data, pending) {
    if (!!pending) {
        _orders = data;
        return;
    }
    _historyOrders = data;
}

function addOrder(data) {
    _orders.push(data);
}

var MyOrderStore = assign({}, EventEmitter.prototype, {
    getMyOrders: function (pending) {
        if (!!pending) {
            return _orders;
        }
        return _historyOrders;
    },
    emitChange: function () {
        this.emit('change');
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        //case ActionTypes.GET_ORDERS_SUCCESS:
        //    getOrders(action.data);
        //    break;
        case ActionTypes.GET_MY_ORDERS_SUCCESS:
            getMyOrders(action.data, true);
            break;
        case ActionTypes.GET_MY_HISTORY_ORDERS_SUCCESS:
            getMyOrders(action.data, false);
            break;
        case ActionTypes.ADD_ORDER_SUCCESS:
            addOrder(action.data);
            break;
        default:
            return true;
    }
    MyOrderStore.emitChange();
    return true;
});

module.exports = MyOrderStore;