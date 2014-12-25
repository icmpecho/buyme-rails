'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var StoreApi = require('../utils/StoreApi');

var StoreActions = {
    getStores: function () {
        StoreApi.getStores();
    },
    receiveStores: function (data) {
        AppDispatcher.handleApiAction({
            actionType: ActionTypes.RECEIVE_STORE_SUCCESS,
            data: data
        })
    }
};

module.exports = StoreActions;
