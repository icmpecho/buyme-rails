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
            var StoreActions = require('../actions/StoreActions');
            AppDispatcher.handleApiAction({
                actionType: ActionTypes.RECEIVE_STORE_SUCCESS,
                data: res.body
            })
        });
    }
};

module.exports = StoreActions;
