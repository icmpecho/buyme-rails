'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var assign = require('object-assign');

var _stores = [];

function receiveStores(data) {
    _stores = data;
}

var StoreStore = assign({}, EventEmitter.prototype, {
    getStores: function () {
        return _stores;
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
        case ActionTypes.RECEIVE_STORE_SUCCESS:
            receiveStores(action.data);
            break;
        default:
            return true;
    }
    StoreStore.emitChange();
    return true;
});

module.exports = StoreStore;