'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var assign = require('object-assign');

var _orders = [];

function getStoreOrders(data) {
    _orders = data.sort(function (a, b) {
        return b.id - a.id
    });
}

function removeStoreOrder(data) {
    for (var index = 0; index < _orders.length; index++) {
        if (_orders[index].id === data.id) {
            _orders.splice(index, 1);
            break;
        }
    }
}

var StoreOrderStore = assign({}, EventEmitter.prototype, {
    getStoreOrders: function () {
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
        case ActionTypes.GET_STORE_ORDERS_SUCCESS:
            getStoreOrders(action.data);
            break;
        case ActionTypes.REMOVE_STORE_ORDER_SUCCESS:
            alert('REMOVE_STORE_ORDER_SUCCESS');
            removeStoreOrder(action.data);
            break;
        default:
            return true;
    }
    StoreOrderStore.emitChange();
    return true;
});

module.exports = StoreOrderStore;