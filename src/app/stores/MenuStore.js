'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var assign = require('object-assign');

var _state = [];

function getState(data) {
    _state = data;
}

var MenuStore = assign({}, EventEmitter.prototype, {
    getState: function () {
        return _state;
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
        case ActionTypes.CHANGE_STATE_SUCCESS:
            getState(action.data);
            break;
        default:
            return true;
    }
    MenuStore.emitChange();
    return true;
});

module.exports = MenuStore;