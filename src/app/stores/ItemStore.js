'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var assign = require('object-assign');

var _items = [];

function getItems(data) {
    _items = data;
}

var ItemStore = assign({}, EventEmitter.prototype, {
    getItems: function () {
        return _items;
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
        case ActionTypes.GET_ITEMS_SUCCESS:
            getItems(action.data);
            break;
        default:
            return true;
    }
    ItemStore.emitChange();
    return true;
});

module.exports = ItemStore;