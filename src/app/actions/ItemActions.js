'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var ItemActions = {
    receiveItems: function (data) {
        AppDispatcher.handleApiAction({
            actionType: ActionTypes.RECEIVE_ITEMS_SUCCESS,
            data: data
        })
    }
};

module.exports = ItemActions;
