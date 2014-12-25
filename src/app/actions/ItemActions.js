'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var ItemApi = require('../utils/ItemApi');

var ItemActions = {
    getItems: function () {
        ItemApi.getItems();
    },
    receiveItems: function (data) {
        AppDispatcher.handleApiAction({
            actionType: ActionTypes.RECEIVE_ITEMS_SUCCESS,
            data: data
        })
    }
};

module.exports = ItemActions;
