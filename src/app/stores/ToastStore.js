'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var assign = require('object-assign');

var _toastType = 'toast-hide';
var _toastMessage = undefined;
var _toastCount = 0;

function showToast(data) {
    _toastType = 'toast toast-' + data.type;
    _toastMessage = data.message;
    _toastCount = _toastCount + 1;
}

function hideToast() {
    _toastType = 'toast-hide';
    _toastMessage = undefined;
    _toastCount = _toastCount - 1;
    if (_toastCount <= 0) {
        _toastCount = 0;
    }
}

var ToastStore = assign({}, EventEmitter.prototype, {
    getToastType: function () {
        return _toastType;
    },
    getToastMessage: function () {
        return _toastMessage;
    },
    getToastCount: function () {
        return _toastCount;
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
        case ActionTypes.SHOW_TOAST_SUCCESS:
            showToast(action.data);
            break;
        case ActionTypes.HIDE_TOAST_SUCCESS:
            hideToast();
            break;
        default:
            return true;
    }
    ToastStore.emitChange();
    return true;
});

module.exports = ToastStore;