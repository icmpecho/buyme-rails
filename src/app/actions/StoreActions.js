'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var StoreApi = require('../utils/StoreApi');

var StoreActions = {
    getStores: function () {
        StoreApi.getStores().end(function (error, res) {
            if (!!error) {
                return console.log(error);
            }
            AppDispatcher.handleApiAction({
                actionType: ActionTypes.GET_STORE_SUCCESS,
                data: res.body
            })
        });
    }
};

module.exports = StoreActions;
