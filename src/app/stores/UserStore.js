'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/ActionTypes');
var assign = require('object-assign');

var _user;

function receiveUser(data) {
    _user = data;
}

var UserStore = assign({}, EventEmitter.prototype, {
    getUser: function () {
        console.log('_user = ' + _user);
        return _user;
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
        case ActionTypes.USER_LOGIN_SUCCESS:
            receiveUser(action.data);
            break;
        default:
            return true;
    }
    UserStore.emitChange();
    return true;
});


module.exports = UserStore;