'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var assign = require('object-assign');

var _orders = [];
var _oldOrders = [];
var _hasOrderAdded = false;

function getMyOrders(data) {
    _orders = data.sort(function (a, b) {
        return b.id - a.id
    });
}

function getMyOldOrders(data) {
    _oldOrders = data.sort(function (a, b) {
        return b.id - a.id
    });
}

function addMyOrder(data) {
    _orders.unshift(data);
    _hasOrderAdded = true;
}

function readMyAddedOrder(data) {
    _hasOrderAdded = false;
}

function removeMyOrder(data) {
    for (var index = 0; index < _orders.length; index++) {
        if (_orders[index].id === data.id) {
            _orders.splice(index, 1);
            break;
        }
    }
}

function removeMyOldOrder(data) {
    for (var index = 0; index < _oldOrders.length; index++) {
        if (_oldOrders[index].id === data.id) {
            _oldOrders.splice(index, 1);
            break;
        }
    }
}

var MyOrderStore = assign({}, EventEmitter.prototype, {
    getMyOrders: function () {
        return _orders;
    },
    getMyOldOrders: function () {
        return _oldOrders;
    },
    hasOrderAdded: function () {
        return _hasOrderAdded;
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

MyOrderStore.dispatchToken = AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case ActionTypes.GET_MY_ORDERS_SUCCESS:
            getMyOrders(action.data);
            break;
        case ActionTypes.GET_MY_OLD_ORDERS_SUCCESS:
            getMyOldOrders(action.data);
            break;
        case ActionTypes.ADD_MY_ORDER_SUCCESS:
            addMyOrder(action.data);
            break;
        case ActionTypes.READ_MY_ADDED_ORDER_SUCCESS:
            readMyAddedOrder();
            break;
        case ActionTypes.REMOVE_MY_ORDER_SUCCESS:
            removeMyOrder(action.data);
            break;
        case ActionTypes.REMOVE_MY_OLD_ORDER_SUCCESS:
            removeMyOldOrder(action.data);
            break;
        default:
            return true;
    }
    MyOrderStore.emitChange();
    return true;
});

module.exports = MyOrderStore;