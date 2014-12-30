'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var AppActions = {
    changeState: function (state) {
        AppDispatcher.handleApiAction({
            actionType: ActionTypes.CHANGE_STATE_SUCCESS,
            data: state
        });
    },
    openAddDialog: function () {
        AppDispatcher.handleApiAction({
            actionType: ActionTypes.OPEN_ADD_DIALOG_SUCCESS,
            data: {}
        });
    },
    closeAddDialog: function () {
        AppDispatcher.handleApiAction({
            actionType: ActionTypes.ClOSE_ADD_DIALOG_SUCCESS,
            data: {}
        });
    }
};

module.exports = AppActions;
