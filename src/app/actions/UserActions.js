'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');
var UserApi = require('../utils/UserApi');

var UserActions = {
    login: function (data) {
        var user = UserApi.login(data);
        AppDispatcher.handleViewAction({
            actionType: ActionTypes.USER_LOGIN_SUCCESS,
            data: {}
        })
    }
};

module.exports = UserActions;
