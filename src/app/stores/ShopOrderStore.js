'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var assign = require('object-assign');

var _orders = [];

function getShopOrders(data) {
    _orders = data;
}

function removeShopOrder(data) {
    for (var index = 0; index < _orders.length; index++) {
        if (_orders[index].id = data.id) {
            _orders = _orders.splice(index, 1);
            break;
        }
    }
}

var ShopOrderStore = assign({}, EventEmitter.prototype, {
    getShopOrders: function () {
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
        case ActionTypes.GET_SHOP_ORDERS_SUCCESS:
            getShopOrders(action.data);
            break;
        case ActionTypes.REMOVE_SHOP_ORDER_SUCCESS:
            removeShopOrder(action.data);
            break;
        default:
            return true;
    }
    ShopOrderStore.emitChange();
    return true;
});

module.exports = ShopOrderStore;