'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var assign = require('object-assign');

var _state = undefined;
var _isShowAddDialog = false;

function getState(data) {
    _state = data;
}

function showAddDialog(isShow) {
    _isShowAddDialog = isShow;
}

var AppStore = assign({}, EventEmitter.prototype, {
    getState: function () {
        var state = _state;
        getState();
        return state;
    },
    isShowAddDialog: function () {
        return _isShowAddDialog;
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
        case ActionTypes.OPEN_ADD_DIALOG_SUCCESS:
            showAddDialog(true);
            break;
        case ActionTypes.ClOSE_ADD_DIALOG_SUCCESS:
            showAddDialog(false);
            break;
        default:
            return true;
    }
    AppStore.emitChange();
    return true;
});

module.exports = AppStore;