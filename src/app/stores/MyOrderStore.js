'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var assign = require('object-assign');

var _orders = [];
var _oldOrders = [];
var _hasOrderAdded = false;
var _hasMoreHistory = true;
var _currentHistoryPage = 0;

function getMyOrders(data) {
    _orders = data
}

function getMyOldOrders(data) {
    _currentHistoryPage = data.page;
    if (data.orders.length === 0) {
        _hasMoreHistory = false;
    }
    else {
        _oldOrders = _oldOrders.concat(data.orders);
        _hasMoreHistory = true;
    }
}

function resetMyOldOrders() {
    _oldOrders = [];
    _hasMoreHistory = true;
    _currentHistoryPage = 0;
}

function addMyOrders(data) {
    _orders = _orders.concat(data);
    _hasOrderAdded = true;
}

function readMyAddedOrder() {
    _hasOrderAdded = false;
}

function removeMyOrder(data) {
    for (var index = 0; index < _orders.length; index++) {
        if (_orders[index].id === data.id) {
            _oldOrders.unshift(_orders.splice(index, 1)[0]);
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
    getCurrentHistoryPage: function () {
        return _currentHistoryPage;
    },
    hasMoreHistory: function () {
        return _hasMoreHistory;
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
        case ActionTypes.RESET_MY_OLD_ORDERS_SUCCESS:
            resetMyOldOrders();
            break;
        case ActionTypes.ADD_MY_ORDER_SUCCESS:
        case ActionTypes.PLUS_ONE_ORDER_SUCCESS:
            addMyOrders(action.data);
            break;
        case ActionTypes.ADD_MY_ORDER_FAILURE:
        case ActionTypes.PLUS_ONE_ORDER_FAILURE:
            break;
        case ActionTypes.READ_MY_ADDED_ORDER_SUCCESS:
            readMyAddedOrder();
            break;
        case ActionTypes.CANCEL_MY_ORDER_SUCCESS:
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