'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var MenuActions = {
    changeState: function (state) {
        AppDispatcher.handleApiAction({
            actionType: ActionTypes.CHANGE_STATE_SUCCESS,
            data: state
        });
    }
};

module.exports = MenuActions;
