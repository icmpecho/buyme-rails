'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var ToastActions = {
    showToast: function (type, message) {
        AppDispatcher.handleApiAction({
            actionType: ActionTypes.SHOW_TOAST_SUCCESS,
            data: {
                type: type,
                message: message
            }
        });
    },
    hideToast: function () {
        AppDispatcher.handleApiAction({
            actionType: ActionTypes.HIDE_TOAST_SUCCESS,
            data: {}
        });
    }
};

module.exports = ToastActions;
