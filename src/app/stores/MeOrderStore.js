'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var assign = require('object-assign');

var _orders = [];

function getOrders(data) {
    _orders = data;
}

function addOrder(data) {
    _orders.push(data);
}

var MeOrderStore = assign({}, EventEmitter.prototype, {
    getOrders: function () {
        return _orders;
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
        case ActionTypes.GET_ORDERS_SUCCESS:
            getOrders(action.data);
            break;
        case ActionTypes.ADD_ORDER_SUCCESS:
            addOrder(action.data);
            break;
        default:
            return true;
    }
    MeOrderStore.emitChange();
    return true;
});

module.exports = MeOrderStore;